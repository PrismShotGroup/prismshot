import type { MetadataRoute } from "next";

import { isPreviewBuild, siteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const preview = isPreviewBuild();

  return {
    rules: {
      userAgent: "*",
      ...(preview ? { disallow: "/" } : { allow: "/" }),
    },
    sitemap: preview ? undefined : new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl.origin,
  };
}
