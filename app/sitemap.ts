import type { MetadataRoute } from "next";

import { getPageHref, locales, pageKeys } from "@/lib/i18n";
import { siteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    pageKeys.map((page) => ({
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
