import type { Locale } from "@/lib/i18n";

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface PhotoAsset {
  key: string;
  source: string;
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

export interface PhotoViewerItem {
  id: string;
  asset: PhotoAsset;
  title: LocalizedText;
  caption?: LocalizedText;
  details?: readonly LocalizedText[];
}

function localizePhotoMetadata(value: string): LocalizedText {
  if (value === "anonymous") return { zh: "匿名", en: "Anonymous" };
  if (value === "unknown") return { zh: "未知", en: "Unknown" };
  return { zh: value, en: value };
}

export function toPhotoViewerItem(photo: PhotoContent): PhotoViewerItem {
  return {
    id: photo.id,
    asset: photo.asset,
    title: photo.title,
    caption: photo.caption,
    details: [
      localizePhotoMetadata(photo.author),
      localizePhotoMetadata(photo.date),
    ],
  };
}

export function localize(value: LocalizedText, locale: Locale): string {
  return value[locale];
}
