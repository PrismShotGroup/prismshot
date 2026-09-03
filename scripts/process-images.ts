import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

import { photoAssets, responsivePhotoWidths } from "../content/photo-assets";
import {
  findPhotoSourceFiles,
  resolvePhotoSourcePath,
} from "./photo-source-files";

const sourceDirectory = path.join(process.cwd(), "assets/source/photos");
const outputDirectory = path.join(process.cwd(), "public/generated/photos");

async function needsBuild(sourcePath: string, outputPath: string) {
  try {
    const [sourceStat, outputStat] = await Promise.all([
      stat(sourcePath),
      stat(outputPath),
    ]);
    return outputStat.mtimeMs < sourceStat.mtimeMs;
  } catch {
    return true;
  }
}

await mkdir(outputDirectory, { recursive: true });

const sourceFiles = await findPhotoSourceFiles(sourceDirectory);
const assets = Object.values(photoAssets);
const configuredSources = new Set<string>(assets.map((asset) => asset.source));
const unexpectedSources = sourceFiles.filter(
  (sourceFile) => !configuredSources.has(sourceFile.relativePath),
);

if (unexpectedSources.length > 0) {
  throw new Error(
    `[images] source files are not registered in content/photo-assets.ts: ${unexpectedSources.map((file) => file.relativePath).join(", ")}`,
  );
}

const duplicateSources = assets
  .map((asset) => asset.source)
  .filter((source, index, sources) => sources.indexOf(source) !== index);
if (duplicateSources.length > 0) {
  throw new Error(
    `[images] source paths must be unique: ${[...new Set(duplicateSources)].join(", ")}`,
  );
}

for (const asset of assets) {
  const sourceFile = sourceFiles.find(
    (candidate) => candidate.relativePath === asset.source,
  );
  if (!sourceFile) {
    throw new Error(
      `[images] ${asset.key} source is missing: ${asset.source}`,
    );
  }

  const sourcePath = resolvePhotoSourcePath(sourceDirectory, asset.source);
  const metadata = await sharp(sourcePath).metadata();
  const orientedSize = metadata.autoOrient ?? metadata;

  if (orientedSize.width !== asset.width || orientedSize.height !== asset.height) {
    throw new Error(
      `[images] ${sourceFile.relativePath} is ${orientedSize.width}×${orientedSize.height} after EXIF orientation, but its asset record says ${asset.width}×${asset.height}`,
    );
  }

  const largestOutputWidth = responsivePhotoWidths.at(-1);
  if (!largestOutputWidth || asset.width < largestOutputWidth) {
    throw new Error(
      `[images] ${sourceFile.relativePath} is ${asset.width}px wide; responsive sources require at least ${largestOutputWidth}px`,
    );
  }

  const jobs = [];
  for (const width of responsivePhotoWidths) {
    const webpPath = path.join(outputDirectory, `${asset.key}-${width}.webp`);
    const avifPath = path.join(outputDirectory, `${asset.key}-${width}.avif`);

    if (await needsBuild(sourcePath, webpPath)) {
      jobs.push(
        sharp(sourcePath)
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: width === 480 ? 76 : 82, effort: 4 })
          .toFile(webpPath),
      );
    }
    if (await needsBuild(sourcePath, avifPath)) {
      jobs.push(
        sharp(sourcePath)
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .avif({ quality: width === 480 ? 48 : 56, effort: 3 })
          .toFile(avifPath),
      );
    }
  }

  await Promise.all(jobs);
}

console.log(
  `[images] ensured ${assets.length * responsivePhotoWidths.length * 2} responsive files from ${assets.length} registered sources`,
);
