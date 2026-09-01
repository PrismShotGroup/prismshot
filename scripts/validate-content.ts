import { access } from "node:fs/promises";
import path from "node:path";

import { socialPlatforms } from "../content/about";
import { activities, calendarEvents, configuredEventMonths } from "../content/events";
import { galleryPhotos } from "../content/gallery";
import { releaseReadiness } from "../content/readiness";
import { homeBackgroundSrc, homeSocialLinks, siteContent } from "../content/site";
import { currentContest } from "../content/contests";
import { pageKeys } from "../lib/i18n";

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

if (galleryPhotos.length < 48) errors.push("gallery requires at least 48 photographs");
let encounteredUnknownDate = false;
for (const photo of galleryPhotos) {
  if (photo.date === "unknown") encounteredUnknownDate = true;
  else {
    if (!datePattern.test(photo.date)) errors.push(`${photo.id} has an invalid date`);
    if (encounteredUnknownDate) errors.push(`${photo.id} appears after an unknown-date photograph`);
  }
  if (!photo.asset.alt.zh || !photo.asset.alt.en || !photo.author) {
    errors.push(`${photo.id} is missing required bilingual metadata`);
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

for (const photo of activities.flatMap((activity) => activity.photos)) {
  try {
    await access(path.join(process.cwd(), "assets/source/photos", `${photo.asset.key}.jpg`));
  } catch {
    errors.push(`${photo.id} is missing its source image`);
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
