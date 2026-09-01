import type { Metadata } from "next";

import { getSiteContent } from "@/content/site";
import {
  getAlternateLocale,
  getHtmlLang,
  getPageHref,
  type Locale,
  type PageKey,
} from "@/lib/i18n";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prismshot.top",
);

function absolutePageUrl(locale: Locale, page: PageKey): string {
  return new URL(getPageHref(locale, page), siteUrl).toString();
}

export function createRootMetadata(locale: Locale): Metadata {
  const content = getSiteContent(locale);
  const home = content.pages.home;

  return {
    metadataBase: siteUrl,
    applicationName: "PrismShot",
    title: {
      default: home.metaTitle,
      template: locale === "zh" ? "%s｜PrismShot" : "%s | PrismShot",
    },
    description: home.metaDescription,
    icons: {
      icon: "/images/brand/prismshot-mark.png",
      apple: "/images/brand/prismshot-mark.png",
    },
  };
}

export function createPageMetadata(
  locale: Locale,
  page: PageKey,
): Metadata {
  const content = getSiteContent(locale);
  const pageCopy = content.pages[page];
  const alternateLocale = getAlternateLocale(locale);
  const canonical = absolutePageUrl(locale, page);

  return {
    title: { absolute: pageCopy.metaTitle },
    description: pageCopy.metaDescription,
    alternates: {
      canonical,
      languages: {
        "zh-CN": absolutePageUrl("zh", page),
        en: absolutePageUrl("en", page),
        "x-default": absolutePageUrl("zh", page),
      },
    },
    openGraph: {
      type: "website",
      siteName: "PrismShot",
      title: pageCopy.metaTitle,
      description: pageCopy.metaDescription,
      url: canonical,
      locale: getHtmlLang(locale).replace("-", "_"),
      alternateLocale: getHtmlLang(alternateLocale).replace("-", "_"),
    },
  };
}
