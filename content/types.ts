import type { Locale } from "@/lib/i18n";

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface PhotoContent {
  id: string;
  src: string;
  alt: LocalizedText;
  author: string;
  date: string;
  title: LocalizedText;
  caption?: LocalizedText;
}

export function localize(value: LocalizedText, locale: Locale): string {
  return value[locale];
}
