import type { PhotoAsset } from "./types";

export const photoAssets = {
    photoCoaching01: {
        key: "photo-coaching-01",
        source: "events/photo-coaching-01.jpg",
    },
    photoCoaching02: {
        key: "photo-coaching-02",
        source: "events/photo-coaching-02.jpg",
    },
    photoCoaching03: {
        key: "photo-coaching-03",
        source: "events/photo-coaching-03.png",
    },
    photoCoaching04: {
        key: "photo-coaching-04",
        source: "events/photo-coaching-04.png",
    },
    framePartners01: {
        key: "frame-partners-01",
        source: "events/frame-partners-01.png",
    },
    framePartners02: {
        key: "frame-partners-02",
        source: "events/frame-partners-02.jpeg",
    },
    framePartners03: {
        key: "frame-partners-03",
        source: "events/frame-partners-03.png",
    },
    framePartners04: {
        key: "frame-partners-04",
        source: "events/frame-partners-04.jpeg",
    },
    togetherOneFrame01: {
        key: "together-one-frame-01",
        source: "events/together-one-frame-01.jpeg",
    },
    togetherOneFrame02: {
        key: "together-one-frame-02",
        source: "events/together-one-frame-02.jpeg",
    },
    togetherOneFrame03: {
        key: "together-one-frame-03",
        source: "events/together-one-frame-03.png",
    },
    togetherOneFrame04: {
        key: "together-one-frame-04",
        source: "events/together-one-frame-04.png",
    },
    issue2: {
        key: "issue2",
        source: "contests/issue2.jpeg",
    },
    issue3: {
        key: "issue3",
        source: "contests/issue3.jpeg",
    },
    issue4: {
        key: "issue4",
        source: "contests/issue4.jpeg",
    },
    issue5: {
        key: "issue5",
        source: "contests/issue5.png",
    },
    issue6: {
        key: "issue6",
        source: "contests/issue6.jpeg",
    },
    issue7: {
        key: "issue7",
        source: "contests/issue7.png",
    },
    issue8: {
        key: "issue8",
        source: "contests/issue8.jpeg",
    },
    issue9: {
        key: "issue9",
        source: "contests/issue9.png",
    },
    issue10: {
        key: "issue10",
        source: "contests/issue10.jpeg",
    },
    issue11: {
        key: "issue11",
        source: "contests/issue11.jpeg",
    },
    issue12: {
        key: "issue12",
        source: "contests/issue12.png",
    },
    issue13: {
        key: "issue13",
        source: "contests/issue13.jpeg",
    },
    gallery1: {
        key: "2025-12-13-0",
        source: "gallery/2025-12-13-0.jpeg",
    },
    gallery2: {
        key: "2025-12-13-1",
        source: "gallery/2025-12-13-1.jpeg",
    },
    gallery3: {
        key: "2026-1-17",
        source: "gallery/2026-1-17.jpeg",
    },
    gallery4: {
        key: "2026-02-07-0",
        source: "gallery/2026-02-07-0.png",
    },
    gallery5: {
        key: "2026-02-07-1",
        source: "gallery/2026-02-07-1.png",
    },
    gallery6: {
        key: "2026-02-27",
        source: "gallery/2026-02-27.png",
    },
    gallery7: {
        key: "2026-03-20-0",
        source: "gallery/2026-03-20-0.png",
    },
    gallery8: {
        key: "2026-03-20-1",
        source: "gallery/2026-03-20-1.png",
    },
    gallery9: {
        key: "2026-04-10",
        source: "gallery/2026-04-10.png",
    },
    gallery10: {
        key: "2026-05-02",
        source: "gallery/2026-05-02.png",
    },
    gallery11: {
        key: "2026-06-05",
        source: "gallery/2026-06-05.png",
    },
    gallery12: {
        key: "2026-06-26",
        source: "gallery/2026-06-26.png",
    },
    gallery13: {
        key: "2026-07-11",
        source: "gallery/2026-07-11.png",
    },
    gallery14: {
        key: "2026-07-18",
        source: "gallery/2026-07-18.jpeg",
    },
    gallery15: {
        key: "2026-08-07",
        source: "gallery/2026-08-07.jpeg",
    },
    gallery16: {
        key: "2026-08-28",
        source: "gallery/2026-08-28.jpeg",
    },
} as const satisfies Record<string, PhotoAsset>;

export const responsivePhotoWidths = [480, 960, 1600] as const;

export function getPhotoSource(
    asset: Pick<PhotoAsset, "key">,
    width: (typeof responsivePhotoWidths)[number] = 1600,
    format: "avif" | "webp" = "webp",
): string {
    return `/generated/photos/${asset.key}-${width}.${format}`;
}
