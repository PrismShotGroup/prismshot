import type { Locale } from "@/lib/i18n";

import { photoAssets } from "./photo-assets";
import type { LocalizedText, PhotoContent } from "./types";

const archiveCaption: LocalizedText = {
  zh: "社团活动中被定格的一瞬。",
  en: "A moment captured during a club event.",
};

function archiveTitle(sequence: string): LocalizedText {
  return {
    zh: `活动档案 · ${sequence}`,
    en: `Event Archive · ${sequence}`,
  };
}

export const galleryPhotos = [
  { id: "gallery-archive-01", asset: photoAssets.event01, author: "Rin", date: "2026-08-30", title: archiveTitle("01"), caption: archiveCaption },
  { id: "gallery-archive-02", asset: photoAssets.event02, author: "Mori", date: "2026-08-29", title: archiveTitle("02") },
  { id: "gallery-archive-03", asset: photoAssets.event03, author: "Kite", date: "2026-08-28", title: archiveTitle("03") },
  { id: "gallery-archive-04", asset: photoAssets.event04, author: "Aki", date: "2026-08-27", title: archiveTitle("04"), caption: archiveCaption },
  { id: "gallery-archive-05", asset: photoAssets.event05, author: "Yu", date: "2026-08-26", title: archiveTitle("05") },
  { id: "gallery-archive-06", asset: photoAssets.event06, author: "Nanami", date: "2026-08-25", title: archiveTitle("06") },
  { id: "gallery-archive-07", asset: photoAssets.event07, author: "PrismShot", date: "2026-08-24", title: archiveTitle("07"), caption: archiveCaption },
  { id: "gallery-archive-08", asset: photoAssets.event08, author: "unknown", date: "2026-08-23", title: archiveTitle("08") },
  { id: "gallery-archive-09", asset: photoAssets.event09, author: "Rin", date: "2026-08-22", title: archiveTitle("09") },
  { id: "gallery-archive-10", asset: photoAssets.event10, author: "Mori", date: "2026-08-21", title: archiveTitle("10"), caption: archiveCaption },
  { id: "gallery-archive-11", asset: photoAssets.event11, author: "Kite", date: "2026-08-20", title: archiveTitle("11") },
  { id: "gallery-archive-12", asset: photoAssets.event12, author: "Aki", date: "2026-08-19", title: archiveTitle("12") },
  { id: "gallery-archive-13", asset: photoAssets.event01, author: "Yu", date: "2026-08-18", title: archiveTitle("13"), caption: archiveCaption },
  { id: "gallery-archive-14", asset: photoAssets.event02, author: "Nanami", date: "2026-08-17", title: archiveTitle("14") },
  { id: "gallery-archive-15", asset: photoAssets.event03, author: "PrismShot", date: "2026-08-16", title: archiveTitle("15") },
  { id: "gallery-archive-16", asset: photoAssets.event04, author: "unknown", date: "2026-08-15", title: archiveTitle("16"), caption: archiveCaption },
  { id: "gallery-archive-17", asset: photoAssets.event05, author: "Rin", date: "2026-08-14", title: archiveTitle("17") },
  { id: "gallery-archive-18", asset: photoAssets.event06, author: "Mori", date: "2026-08-13", title: archiveTitle("18") },
  { id: "gallery-archive-19", asset: photoAssets.event07, author: "Kite", date: "2026-08-12", title: archiveTitle("19"), caption: archiveCaption },
  { id: "gallery-archive-20", asset: photoAssets.event08, author: "Aki", date: "2026-08-11", title: archiveTitle("20") },
  { id: "gallery-archive-21", asset: photoAssets.event09, author: "Yu", date: "2026-08-10", title: archiveTitle("21") },
  { id: "gallery-archive-22", asset: photoAssets.event10, author: "Nanami", date: "2026-08-09", title: archiveTitle("22"), caption: archiveCaption },
  { id: "gallery-archive-23", asset: photoAssets.event11, author: "PrismShot", date: "2026-08-08", title: archiveTitle("23") },
  { id: "gallery-archive-24", asset: photoAssets.event12, author: "unknown", date: "2026-08-07", title: archiveTitle("24") },
  { id: "gallery-archive-25", asset: photoAssets.event01, author: "Rin", date: "2026-08-06", title: archiveTitle("25"), caption: archiveCaption },
  { id: "gallery-archive-26", asset: photoAssets.event02, author: "Mori", date: "2026-08-05", title: archiveTitle("26") },
  { id: "gallery-archive-27", asset: photoAssets.event03, author: "Kite", date: "2026-08-04", title: archiveTitle("27") },
  { id: "gallery-archive-28", asset: photoAssets.event04, author: "Aki", date: "2026-08-03", title: archiveTitle("28"), caption: archiveCaption },
  { id: "gallery-archive-29", asset: photoAssets.event05, author: "Yu", date: "2026-08-02", title: archiveTitle("29") },
  { id: "gallery-archive-30", asset: photoAssets.event06, author: "Nanami", date: "2026-08-01", title: archiveTitle("30") },
  { id: "gallery-archive-31", asset: photoAssets.event07, author: "PrismShot", date: "2026-07-31", title: archiveTitle("31"), caption: archiveCaption },
  { id: "gallery-archive-32", asset: photoAssets.event08, author: "unknown", date: "2026-07-30", title: archiveTitle("32") },
  { id: "gallery-archive-33", asset: photoAssets.event09, author: "Rin", date: "2026-07-29", title: archiveTitle("33") },
  { id: "gallery-archive-34", asset: photoAssets.event10, author: "Mori", date: "2026-07-28", title: archiveTitle("34"), caption: archiveCaption },
  { id: "gallery-archive-35", asset: photoAssets.event11, author: "Kite", date: "2026-07-27", title: archiveTitle("35") },
  { id: "gallery-archive-36", asset: photoAssets.event12, author: "Aki", date: "2026-07-26", title: archiveTitle("36") },
  { id: "gallery-archive-37", asset: photoAssets.event01, author: "Yu", date: "2026-07-25", title: archiveTitle("37"), caption: archiveCaption },
  { id: "gallery-archive-38", asset: photoAssets.event02, author: "Nanami", date: "2026-07-24", title: archiveTitle("38") },
  { id: "gallery-archive-39", asset: photoAssets.event03, author: "PrismShot", date: "2026-07-23", title: archiveTitle("39") },
  { id: "gallery-archive-40", asset: photoAssets.event04, author: "unknown", date: "2026-07-22", title: archiveTitle("40"), caption: archiveCaption },
  { id: "gallery-archive-41", asset: photoAssets.event05, author: "Rin", date: "2026-07-21", title: archiveTitle("41") },
  { id: "gallery-archive-42", asset: photoAssets.event06, author: "Mori", date: "2026-07-20", title: archiveTitle("42") },
  { id: "gallery-archive-43", asset: photoAssets.event07, author: "Kite", date: "2026-07-19", title: archiveTitle("43"), caption: archiveCaption },
  { id: "gallery-archive-44", asset: photoAssets.event08, author: "Aki", date: "2026-07-18", title: archiveTitle("44") },
  { id: "gallery-archive-45", asset: photoAssets.event09, author: "Yu", date: "2026-07-17", title: archiveTitle("45") },
  { id: "gallery-archive-46", asset: photoAssets.event10, author: "Nanami", date: "unknown", title: archiveTitle("46"), caption: archiveCaption },
  { id: "gallery-archive-47", asset: photoAssets.event11, author: "PrismShot", date: "unknown", title: archiveTitle("47") },
  { id: "gallery-archive-48", asset: photoAssets.event12, author: "unknown", date: "unknown", title: archiveTitle("48") },
] as const satisfies readonly PhotoContent[];

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
