import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

import { photoAssets, responsivePhotoWidths } from "../content/photo-assets";

const sourceDirectory = path.join(process.cwd(), "assets/source/photos");
const outputDirectory = path.join(process.cwd(), "public/generated/photos");
const supportedSourcePattern = /\.(jpe?g|png)$/i;

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

const sourceFiles = (await readdir(sourceDirectory))
  .filter((file) => supportedSourcePattern.test(file))
  .sort();

const assets = Object.values(photoAssets);
const configuredKeys = new Set<string>(assets.map((asset) => asset.key));
const unexpectedSources = sourceFiles.filter(
  (sourceFile) => !configuredKeys.has(path.parse(sourceFile).name),
);

if (unexpectedSources.length > 0) {
  throw new Error(
    `[images] source files are not registered in content/photo-assets.ts: ${unexpectedSources.join(", ")}`,
  );
}

for (const asset of assets) {
  const matchingSources = sourceFiles.filter(
    (sourceFile) => path.parse(sourceFile).name === asset.key,
  );

  if (matchingSources.length !== 1) {
    throw new Error(
      `[images] ${asset.key} requires exactly one JPG, JPEG, or PNG source; found ${matchingSources.length}`,
    );
  }

  const sourceFile = matchingSources[0];
  const sourcePath = path.join(sourceDirectory, sourceFile);
  const metadata = await sharp(sourcePath).metadata();
  const orientedSize = metadata.autoOrient ?? metadata;

  if (orientedSize.width !== asset.width || orientedSize.height !== asset.height) {
    throw new Error(
      `[images] ${sourceFile} is ${orientedSize.width}×${orientedSize.height} after EXIF orientation, but its asset record says ${asset.width}×${asset.height}`,
    );
  }

  const largestOutputWidth = responsivePhotoWidths.at(-1);
  if (!largestOutputWidth || asset.width < largestOutputWidth) {
    throw new Error(
      `[images] ${sourceFile} is ${asset.width}px wide; responsive sources require at least ${largestOutputWidth}px`,
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
