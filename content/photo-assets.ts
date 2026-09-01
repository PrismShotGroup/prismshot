import type { PhotoAsset } from "./types";

export const photoAssets = {
  event01: { key: "event-01", width: 1600, height: 1068, alt: { zh: "夜间活动中的人群与灯光", en: "A crowd gathered under night-time lights" } },
  event02: { key: "event-02", width: 1600, height: 1067, alt: { zh: "蓝紫灯光下的活动现场", en: "An event scene under blue and violet light" } },
  event03: { key: "event-03", width: 1600, height: 1067, alt: { zh: "聚会现场的合照时刻", en: "A group-photo moment at the gathering" } },
  event04: { key: "event-04", width: 1600, height: 1200, alt: { zh: "彩色灯光下的活动参与者", en: "Event participants under colourful lights" } },
  event05: { key: "event-05", width: 1600, height: 1067, alt: { zh: "蓝色舞台灯光与人物剪影", en: "Silhouettes under blue stage lights" } },
  event06: { key: "event-06", width: 1600, height: 1068, alt: { zh: "舞台灯光中的创作现场", en: "A creative session under stage lights" } },
  event07: { key: "event-07", width: 1600, height: 1067, alt: { zh: "电子屏幕环绕的活动现场", en: "An event space surrounded by digital screens" } },
  event08: { key: "event-08", width: 1600, height: 1600, alt: { zh: "活动灯光下的团队", en: "A team gathered under event lights" } },
  event09: { key: "event-09", width: 1600, height: 2000, alt: { zh: "手持相机进行拍摄教学", en: "A hands-on camera lesson" } },
  event10: { key: "event-10", width: 1600, height: 2400, alt: { zh: "旷野景观中的构图练习", en: "A composition exercise in an open landscape" } },
  event11: { key: "event-11", width: 1600, height: 1067, alt: { zh: "山谷间的自然光线", en: "Natural light crossing a mountain valley" } },
  event12: { key: "event-12", width: 1600, height: 2400, alt: { zh: "自然场景中的摄影作品", en: "A photographic study in a natural setting" } },
} as const satisfies Record<string, PhotoAsset>;

export const responsivePhotoWidths = [480, 960, 1600] as const;

export function getPhotoSource(
  asset: Pick<PhotoAsset, "key">,
  width: (typeof responsivePhotoWidths)[number] = 1600,
  format: "avif" | "webp" = "webp",
): string {
  return `/generated/photos/${asset.key}-${width}.${format}`;
}
