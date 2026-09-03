import { access } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

import { socialPlatforms, teamMembers } from "../content/about";
import { currentContest, contestChampions } from "../content/contests";
import { activities, calendarEvents, configuredEventMonths } from "../content/events";
import { galleryPhotos } from "../content/gallery";
import { photoAssets, responsivePhotoWidths } from "../content/photo-assets";
import { releaseReadiness } from "../content/readiness";
import { homeBackgroundSrc, homeSocialLinks, siteContent } from "../content/site";
import { getPhotoDimensions } from "../content/types";
import type { PhotoAsset } from "../content/types";
import { pageKeys } from "../lib/i18n";
import { getResponsivePhotoVariants } from "../lib/responsive-photo-variants";
import {
  findPhotoSourceFiles,
  resolvePhotoSourcePath,
} from "./photo-source-files";

const errors: string[] = [];
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function requireUnique(values: readonly string[], label: string) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length > 0) errors.push(`${label} contains duplicate IDs: ${[...new Set(duplicates)].join(", ")}`);
}

for (const locale of ["zh", "en"] as const) {
  const site = siteContent[locale];
  for (const page of pageKeys) {
    const copy = site.pages[page];
    if (!copy.navLabel || !copy.metaTitle || !copy.metaDescription) {
      errors.push(`${locale}.${page} is missing navigation or SEO copy`);
    }
  }
}

requireUnique(calendarEvents.map((event) => event.id), "calendar events");
requireUnique(activities.map((activity) => activity.id), "activities");
requireUnique(galleryPhotos.map((photo) => photo.id), "gallery photos");
requireUnique(contestChampions.map((champion) => champion.id), "contest champions");
requireUnique(teamMembers.map((member) => member.id), "team members");

for (const champion of contestChampions) {
  if (champion.theme && (!champion.theme.zh.trim() || !champion.theme.en.trim())) {
    errors.push(`${champion.id} has an incomplete bilingual theme`);
  }
}

const activityPhotos = activities.flatMap((activity) => activity.photos);
requireUnique(
  [...activityPhotos, ...galleryPhotos].map((photo) => photo.id),
  "photographs across events and gallery",
);

const registeredAssets: readonly PhotoAsset[] = Object.values(photoAssets);
requireUnique(registeredAssets.map((asset) => asset.key), "photo assets");
requireUnique(registeredAssets.map((asset) => asset.source), "photo asset sources");

const referencedAssets = [
  ...activityPhotos.map((photo) => ({ label: photo.id, asset: photo.asset })),
  ...galleryPhotos.map((photo) => ({ label: photo.id, asset: photo.asset })),
  { label: `contest-${currentContest.issue}`, asset: currentContest.visual },
  ...contestChampions.map((champion) => ({ label: champion.id, asset: champion.image })),
];
const registeredAssetsByKey = new Map<string, (typeof registeredAssets)[number]>(
  registeredAssets.map((asset) => [asset.key, asset]),
);

for (const reference of referencedAssets) {
  if (registeredAssetsByKey.get(reference.asset.key) !== reference.asset) {
    errors.push(`${reference.label} must reference a registered photo asset`);
  }
}

for (const activity of activities) {
  if (activity.photos.length < 1 || activity.photos.length > 6) {
    errors.push(`${activity.id} must contain 1–6 photographs`);
  }
}

for (const event of calendarEvents) {
  if (!datePattern.test(event.date)) errors.push(`${event.id} has an invalid date`);
}

for (let index = 1; index < configuredEventMonths.length; index += 1) {
  const previous = configuredEventMonths[index - 1];
  const current = configuredEventMonths[index];
  if (current.year * 12 + current.month <= previous.year * 12 + previous.month) {
    errors.push("configured event months must be strictly chronological");
  }
}

if (new Date(currentContest.submissionStart) >= new Date(currentContest.voteStart)) {
  errors.push("contest submission start must precede the direct voting boundary");
}
if (new Date(currentContest.voteStart) >= new Date(currentContest.voteEnd)) {
  errors.push("contest voting boundary must precede vote end");
}

let encounteredUnknownDate = false;
for (const photo of galleryPhotos) {
  if (!photo.date || photo.date === "unknown") encounteredUnknownDate = true;
  else {
    if (!datePattern.test(photo.date)) errors.push(`${photo.id} has an invalid date`);
    if (encounteredUnknownDate) errors.push(`${photo.id} appears after an unknown-date photograph`);
  }
}

for (const platform of [...homeSocialLinks, ...socialPlatforms]) {
  try {
    const url = new URL(platform.href);
    if (url.protocol !== "https:") errors.push(`${platform.name} must use HTTPS`);
  } catch {
    errors.push(`${platform.name} has an invalid URL`);
  }
}

for (const member of teamMembers) {
  if (!member.name || !member.role.zh || !member.role.en) {
    errors.push(`${member.id} is missing required bilingual team metadata`);
  }
  if (!member.portraitAlt.zh || !member.portraitAlt.en) {
    errors.push(`${member.id} is missing bilingual portrait alt text`);
  }
  if (member.portraitSrc) {
    if (!member.portraitSrc.startsWith("/images/about/")) {
      errors.push(`${member.id} portrait must be a local /images/about/ asset`);
    } else {
      try {
        await access(path.join(process.cwd(), "public", member.portraitSrc));
      } catch {
        errors.push(`${member.id} portrait is missing: ${member.portraitSrc}`);
      }
    }
  }
}

if (homeBackgroundSrc) {
  if (!homeBackgroundSrc.startsWith("/images/home/")) {
    errors.push("home background must be a local /images/home/ asset");
  } else {
    try {
      await access(path.join(process.cwd(), "public", homeBackgroundSrc));
    } catch {
      errors.push(`home background is missing: ${homeBackgroundSrc}`);
    }
  }
}

const sourceDirectory = path.join(process.cwd(), "assets/source/photos");
const generatedDirectory = path.join(process.cwd(), "public/generated/photos");
const sourceFiles = await findPhotoSourceFiles(sourceDirectory);
const configuredAssetSources = new Set<string>(
  registeredAssets.map((asset) => asset.source),
);

for (const sourceFile of sourceFiles) {
  if (!configuredAssetSources.has(sourceFile.relativePath)) {
    errors.push(`${sourceFile.relativePath} is not registered in content/photo-assets.ts`);
  }
}

for (const asset of registeredAssets) {
  let sourcePath: string;
  try {
    sourcePath = resolvePhotoSourcePath(sourceDirectory, asset.source);
  } catch (error) {
    errors.push(`${asset.key} has an invalid source path: ${(error as Error).message}`);
    continue;
  }

  const sourceFile = sourceFiles.find(
    (candidate) => candidate.relativePath === asset.source,
  );
  if (!sourceFile) {
    errors.push(`${asset.key} source is missing: ${asset.source}`);
    continue;
  }

  const sourceMetadata = await sharp(sourcePath).metadata();
  const orientedSize = sourceMetadata.autoOrient ?? sourceMetadata;
  const dimensions = getPhotoDimensions(asset);

  if (orientedSize.width !== dimensions.width || orientedSize.height !== dimensions.height) {
    errors.push(
      `${asset.key} generated dimensions are stale; run npm run images:build`,
    );
  }
  if (asset.alt && (!asset.alt.zh || !asset.alt.en)) {
    errors.push(`${asset.key} has incomplete bilingual alt text`);
  }
  if (
    asset.focalPoint &&
    (asset.focalPoint.x < 0 ||
      asset.focalPoint.x > 100 ||
      asset.focalPoint.y < 0 ||
      asset.focalPoint.y > 100)
  ) {
    errors.push(`${asset.key} focal point must use percentages from 0 to 100`);
  }

  const variants = getResponsivePhotoVariants(
    dimensions.width,
    responsivePhotoWidths,
  );
  for (const variant of variants) {
    const expectedHeight = Math.round(
      (dimensions.height / dimensions.width) * variant.outputWidth,
    );
    for (const format of ["webp", "avif"] as const) {
      const outputPath = path.join(
        generatedDirectory,
        `${asset.key}-${variant.fileWidth}.${format}`,
      );
      try {
        const outputMetadata = await sharp(outputPath).metadata();
        if (
          outputMetadata.width !== variant.outputWidth ||
          outputMetadata.height !== expectedHeight
        ) {
          errors.push(
            `${asset.key}-${variant.fileWidth}.${format} is ${outputMetadata.width}×${outputMetadata.height}; expected ${variant.outputWidth}×${expectedHeight}`,
          );
        }
      } catch {
        errors.push(`${asset.key} is missing its ${variant.outputWidth}px ${format.toUpperCase()} variant`);
      }
    }
  }
}

if (process.env.PRISMSHOT_RELEASE === "1") {
  const blockers = Object.entries(releaseReadiness)
    .filter(([, ready]) => !ready)
    .map(([name]) => name);
  if (blockers.length > 0) errors.push(`release placeholders remain: ${blockers.join(", ")}`);
} else {
  console.log("[content] preview mode: release placeholder gate is not enforced");
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("[content] validation passed");
}
