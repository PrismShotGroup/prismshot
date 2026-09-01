import type { Locale } from "@/lib/i18n";

import { photoAssets } from "./photo-assets";
import type { PhotoAsset, PhotoContent } from "./types";

interface GallerySeed {
  asset: PhotoAsset;
}

const gallerySeeds: readonly GallerySeed[] = [
  { asset: photoAssets.event01 },
  { asset: photoAssets.event02 },
  { asset: photoAssets.event03 },
  { asset: photoAssets.event04 },
  { asset: photoAssets.event05 },
  { asset: photoAssets.event06 },
  { asset: photoAssets.event07 },
  { asset: photoAssets.event08 },
  { asset: photoAssets.event09 },
  { asset: photoAssets.event10 },
  { asset: photoAssets.event11 },
  { asset: photoAssets.event12 },
];

const authors = ["Rin", "Mori", "Kite", "Aki", "Yu", "Nanami", "PrismShot", "unknown"] as const;
const baseDate = Date.UTC(2026, 7, 30);

export const galleryPhotos: readonly PhotoContent[] = Array.from(
  { length: 48 },
  (_, index) => {
    const seed = gallerySeeds[index % gallerySeeds.length];
    const sequence = String(index + 1).padStart(2, "0");
    const date =
      index >= 45
        ? "unknown"
        : new Date(baseDate - index * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);

    return {
      id: `gallery-archive-${sequence}`,
      asset: seed.asset,
      author: authors[index % authors.length],
      date,
      title: {
        zh: `活动档案 · ${sequence}`,
        en: `Event Archive · ${sequence}`,
      },
      caption:
        index % 3 === 0
          ? {
              zh: "社团活动中被定格的一瞬。",
              en: "A moment captured during a club event.",
            }
          : undefined,
    };
  },
);

export const galleryPageCopy: Record<Locale, {
  section: { number: string; title: string; accent: string; note: string };
  showing: string;
  of: string;
  photographs: string;
  sorted: string;
  loadMore: string;
  allLoaded: string;
  unknown: string;
  photographyBy: string;
}> = {
  zh: {
    section: {
      number: "01 / Collection",
      title: "那些值得被",
      accent: "再次看见",
      note: "",
    },
    showing: "正在展示",
    of: "/",
    photographs: "张活动照片",
    sorted: "按拍摄日期 · 新 → 旧",
    loadMore: "加载更多 24 张",
    allLoaded: "已展示全部照片",
    unknown: "未知",
    photographyBy: "摄影",
  },
  en: {
    section: {
      number: "01 / Collection",
      title: "Moments worth",
      accent: "seeing again",
      note: "",
    },
    showing: "Showing",
    of: "/",
    photographs: "event photographs",
    sorted: "Capture date · New → Old",
    loadMore: "Load 24 more",
    allLoaded: "All photographs shown",
    unknown: "Unknown",
    photographyBy: "Photography",
  },
};
