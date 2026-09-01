export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

export const pageKeys = [
  "home",
  "events",
  "contests",
  "gallery",
  "about",
] as const;

export type PageKey = (typeof pageKeys)[number];
export type ContentPageKey = Exclude<PageKey, "home">;

const pageSegments: Record<PageKey, string> = {
  home: "",
  events: "events",
  contests: "contests",
  gallery: "gallery",
  about: "about",
};

export function getPageHref(locale: Locale, page: PageKey): string {
  const localePrefix = locale === "en" ? "/en" : "";
  const segment = pageSegments[page];

  if (!segment) {
    return localePrefix || "/";
  }

  return `${localePrefix}/${segment}`;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "zh" ? "en" : "zh";
}

export function getHtmlLang(locale: Locale): "zh-CN" | "en" {
  return locale === "zh" ? "zh-CN" : "en";
}
