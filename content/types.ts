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
  alt?: LocalizedText;
  focalPoint?: {
    x: number;
    y: number;
  };
}

export interface PhotoContent {
  id: string;
  asset: PhotoAsset;
  author?: string;
  date?: string;
  title?: LocalizedText;
  caption?: LocalizedText;
}

export interface PhotoViewerItem {
  id: string;
  asset: PhotoAsset;
  title?: LocalizedText;
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
    details: [photo.author, photo.date]
      .filter((value): value is string => Boolean(value))
      .map(localizePhotoMetadata),
  };
}

export function localize(value: LocalizedText, locale: Locale): string {
  return value[locale];
}

export function getPhotoAlt(asset: PhotoAsset, locale: Locale): string {
  return asset.alt
    ? localize(asset.alt, locale)
    : locale === "zh"
      ? "摄影作品"
      : "Photograph";
}

export function getPhotoLabel(photo: PhotoContent, locale: Locale): string {
  return photo.title
    ? localize(photo.title, locale)
    : getPhotoAlt(photo.asset, locale);
}

export function getPhotoMetadataLabel(
  value: string | undefined,
  locale: Locale,
): string | undefined {
  return value ? localize(localizePhotoMetadata(value), locale) : undefined;
}
