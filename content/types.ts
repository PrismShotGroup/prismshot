import type { Locale } from "@/lib/i18n";

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface PhotoAsset {
  key: string;
  width: number;
  height: number;
  alt: LocalizedText;
  focalPoint?: {
    x: number;
    y: number;
  };
}

export interface PhotoContent {
  id: string;
  asset: PhotoAsset;
  author: string;
  date: string;
  title: LocalizedText;
  caption?: LocalizedText;
}

export function localize(value: LocalizedText, locale: Locale): string {
  return value[locale];
}
