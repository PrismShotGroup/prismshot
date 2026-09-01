import type { Locale } from "@/lib/i18n";

import type { LocalizedText, PhotoContent } from "./types";

interface GallerySeed {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
}

const gallerySeeds: readonly GallerySeed[] = [
  { src: "/generated/events/event-01-1600.webp", width: 1600, height: 1068, alt: { zh: "夜间活动中的人群与灯光", en: "A crowd gathered under night-time lights" } },
  { src: "/generated/events/event-02-1600.webp", width: 1600, height: 1067, alt: { zh: "蓝紫灯光下的活动现场", en: "An event under blue and violet light" } },
  { src: "/generated/events/event-03-1600.webp", width: 1600, height: 1067, alt: { zh: "聚会现场的合照时刻", en: "A group-photo moment at a gathering" } },
  { src: "/generated/events/event-04-1600.webp", width: 1600, height: 1200, alt: { zh: "彩色灯光下的活动参与者", en: "Participants under colourful event lights" } },
  { src: "/generated/events/event-05-1600.webp", width: 1600, height: 1067, alt: { zh: "蓝色舞台灯光与人物剪影", en: "Silhouettes under blue stage lights" } },
  { src: "/generated/events/event-06-1600.webp", width: 1600, height: 1068, alt: { zh: "舞台灯光中的创作现场", en: "A creative session under stage lights" } },
  { src: "/generated/events/event-07-1600.webp", width: 1600, height: 1067, alt: { zh: "电子屏幕环绕的活动现场", en: "An event surrounded by digital screens" } },
  { src: "/generated/events/event-08-1600.webp", width: 1600, height: 1600, alt: { zh: "活动灯光下的团队", en: "A team gathered under event lights" } },
  { src: "/generated/events/event-09-1600.webp", width: 1600, height: 2000, alt: { zh: "手持相机进行拍摄教学", en: "A hands-on camera lesson" } },
  { src: "/generated/events/event-10-1600.webp", width: 1600, height: 2400, alt: { zh: "旷野景观中的构图练习", en: "A composition exercise in an open landscape" } },
  { src: "/generated/events/event-11-1600.webp", width: 1600, height: 1067, alt: { zh: "山谷间的自然光线", en: "Natural light crossing a mountain valley" } },
  { src: "/generated/events/event-12-1600.webp", width: 1600, height: 2400, alt: { zh: "自然场景中的摄影作品", en: "A photographic study in a natural setting" } },
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
      src: seed.src,
      width: seed.width,
      height: seed.height,
      alt: seed.alt,
      author: authors[index % authors.length],
      date,
      title: {
        zh: `活动档案 · ${sequence}`,
        en: `Event Archive · ${sequence}`,
      },
      caption:
        index % 3 === 0
          ? {
              zh: "社团活动中被定格的一瞬；当前图片为可替换占位素材。",
              en: "A moment held during a club event; this image is a replaceable placeholder.",
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
      note: "当前使用可替换摄影素材验证瀑布流与大图查看体验；正式发布前将由社团活动作品替换。",
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
      note: "Replaceable photography currently validates the masonry layout and viewer. Club event work will replace it before release.",
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
