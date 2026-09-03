import type { MetadataRoute } from "next";

import { getPageHref, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/metadata";
import { getEnabledPageKeys } from "@/lib/site-features";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const enabledPageKeys = getEnabledPageKeys();

  return locales.flatMap((locale) =>
    enabledPageKeys.map((page) => ({
      url: new URL(getPageHref(locale, page), siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: page === "home" ? "weekly" : "monthly",
      priority: page === "home" ? 1 : page === "gallery" ? 0.9 : 0.8,
      alternates: {
        languages: {
          "zh-CN": new URL(getPageHref("zh", page), siteUrl).toString(),
          en: new URL(getPageHref("en", page), siteUrl).toString(),
        },
      },
    })),
  );
}
