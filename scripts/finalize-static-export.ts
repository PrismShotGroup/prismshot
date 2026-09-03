import { access, readFile, rm } from "node:fs/promises";
import path from "node:path";

import { isAnniversaryEnabled } from "../lib/site-features";

const outputRoot = path.join(process.cwd(), "out");
const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prismshot.top",
);
const anniversaryOutputs = [
  path.join(outputRoot, "anniversary.html"),
  path.join(outputRoot, "anniversary.txt"),
  path.join(outputRoot, "anniversary"),
  path.join(outputRoot, "en", "anniversary.html"),
  path.join(outputRoot, "en", "anniversary.txt"),
  path.join(outputRoot, "en", "anniversary"),
] as const;

async function exists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function check(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

const enabled = isAnniversaryEnabled();

if (!enabled) {
  await Promise.all(
    anniversaryOutputs.map((outputPath) =>
      rm(outputPath, { recursive: true, force: true }),
    ),
  );
}

const [zhPageExists, , , enPageExists] = await Promise.all(
  anniversaryOutputs.map(exists),
);
const [zhHome, enHome, sitemap] = await Promise.all([
  readFile(path.join(outputRoot, "index.html"), "utf8"),
  readFile(path.join(outputRoot, "en.html"), "utf8"),
  readFile(path.join(outputRoot, "sitemap.xml"), "utf8"),
]);

const zhNavPresent = zhHome.includes('href="/anniversary"');
const enNavPresent = enHome.includes('href="/en/anniversary"');
const zhSitemapPresent = sitemap.includes(
  new URL("/anniversary", siteUrl).toString(),
);
const enSitemapPresent = sitemap.includes(
  new URL("/en/anniversary", siteUrl).toString(),
);

check(zhPageExists === enabled, "Chinese anniversary output does not match the feature flag");
check(enPageExists === enabled, "English anniversary output does not match the feature flag");
check(zhNavPresent === enabled, "Chinese anniversary navigation does not match the feature flag");
check(enNavPresent === enabled, "English anniversary navigation does not match the feature flag");
check(zhSitemapPresent === enabled, "Chinese anniversary sitemap entry does not match the feature flag");
check(enSitemapPresent === enabled, "English anniversary sitemap entry does not match the feature flag");

if (enabled) {
  const [zhAnniversary, enAnniversary] = await Promise.all([
    readFile(path.join(outputRoot, "anniversary.html"), "utf8"),
    readFile(path.join(outputRoot, "en", "anniversary.html"), "utf8"),
  ]);

  check(
    zhAnniversary.includes("一周年摄影赛") &&
      zhAnniversary.includes("敬请期待"),
    "Chinese anniversary page is missing confirmed copy",
  );
  check(
    enAnniversary.includes("Anniversary Photo Contest") &&
      enAnniversary.includes("Coming soon"),
    "English anniversary page is missing confirmed copy",
  );
}

console.log(
  `[export] anniversary page ${enabled ? "enabled" : "disabled"}; routes, navigation, and sitemap verified`,
);
