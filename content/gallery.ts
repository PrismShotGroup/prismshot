import type { Locale } from "@/lib/i18n";

import { photoAssets } from "./photo-assets";
import type { PhotoContent } from "./types";

export const galleryPhotos: readonly PhotoContent[] = [
    {
        id: "gallery-2026-08-28",
        asset: photoAssets.gallery16,
        author: "PrismShot",
        date: "2026-08-28",
    },
    {
        id: "gallery-2026-08-07",
        asset: photoAssets.gallery15,
        author: "PrismShot",
        date: "2026-08-07",
    },
    {
        id: "gallery-2026-07-18",
        asset: photoAssets.gallery14,
        author: "PrismShot",
        date: "2026-07-18",
    },
    {
        id: "gallery-2026-07-11",
        asset: photoAssets.gallery13,
        author: "PrismShot",
        date: "2026-07-11",
    },
    {
        id: "gallery-2026-06-26",
        asset: photoAssets.gallery12,
        author: "PrismShot",
        date: "2026-06-26",
    },
    {
        id: "gallery-2026-06-05",
        asset: photoAssets.gallery11,
        author: "PrismShot",
        date: "2026-06-05",
    },
    {
        id: "gallery-2026-05-02",
        asset: photoAssets.gallery10,
        author: "PrismShot",
        date: "2026-05-02",
    },
    {
        id: "gallery-2026-04-10",
        asset: photoAssets.gallery9,
        author: "PrismShot",
        date: "2026-04-10",
    },
    {
        id: "gallery-2026-03-20-1",
        asset: photoAssets.gallery8,
        author: "PrismShot",
        date: "2026-03-20",
    },
    {
        id: "gallery-2026-03-20-0",
        asset: photoAssets.gallery7,
        author: "PrismShot",
        date: "2026-03-20",
    },
    {
        id: "gallery-2026-02-27",
        asset: photoAssets.gallery6,
        author: "PrismShot",
        date: "2026-02-27",
    },
    {
        id: "gallery-2026-02-07-1",
        asset: photoAssets.gallery5,
        author: "PrismShot",
        date: "2026-02-07",
    },
    {
        id: "gallery-2026-02-07-0",
        asset: photoAssets.gallery4,
        author: "PrismShot",
        date: "2026-02-07",
    },
    {
        id: "gallery-2026-01-17",
        asset: photoAssets.gallery3,
        author: "PrismShot",
        date: "2026-01-17",
    },
    {
        id: "gallery-2025-12-13-1",
        asset: photoAssets.gallery2,
        author: "PrismShot",
        date: "2025-12-13",
    },
    {
        id: "gallery-2025-12-13-0",
        asset: photoAssets.gallery1,
        author: "PrismShot",
        date: "2025-12-13",
    },
];

export const galleryPageCopy: Record<
    Locale,
    {
        section: {
            number: string;
            title: string;
            accent: string;
            note: string;
        };
        showing: string;
        of: string;
        photographs: string;
        sorted: string;
        loadMore: string;
        allLoaded: string;
        photographyBy: string;
    }
> = {
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
        photographyBy: "Photography",
    },
};
