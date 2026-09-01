import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const sourceDirectory = path.join(process.cwd(), "assets/source/events");
const outputDirectory = path.join(process.cwd(), "public/generated/events");
const widths = [480, 960, 1600] as const;

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
  .filter((file) => /\.(jpe?g|png)$/i.test(file))
  .sort();

for (const sourceFile of sourceFiles) {
  const sourcePath = path.join(sourceDirectory, sourceFile);
  const basename = path.parse(sourceFile).name;

  const jobs = [];
  for (const width of widths) {
    const webpPath = path.join(outputDirectory, `${basename}-${width}.webp`);
    const avifPath = path.join(outputDirectory, `${basename}-${width}.avif`);

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
  `[images] ensured ${sourceFiles.length * widths.length * 2} responsive files from ${sourceFiles.length} sources`,
);
