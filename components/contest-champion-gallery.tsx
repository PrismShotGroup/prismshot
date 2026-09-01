"use client";

import { useCallback, useState } from "react";

import type { ContestChampion } from "@/content/contests";
import { localize } from "@/content/types";
import type { PhotoViewerItem } from "@/content/types";
import type { Locale } from "@/lib/i18n";

import { PhotoLightbox } from "./photo-lightbox";
import { ResponsivePhoto } from "./responsive-photo";
import styles from "./contest-content.module.css";

interface ContestChampionGalleryProps {
  champions: readonly ContestChampion[];
  championLabel: string;
  locale: Locale;
  photographyBy: string;
}

function displayAuthor(author: string, locale: Locale): string {
  if (author === "anonymous") return locale === "zh" ? "匿名" : "Anonymous";
  if (author === "unknown") return locale === "zh" ? "未知" : "Unknown";
  return author;
}

function toViewerItem(champion: ContestChampion): PhotoViewerItem {
  const author = {
    zh: displayAuthor(champion.author, "zh"),
    en: displayAuthor(champion.author, "en"),
  };

  return {
    id: champion.id,
    asset: champion.image,
    title: champion.theme,
    details: [
      { zh: `第 ${champion.issue} 期`, en: `Issue ${champion.issue}` },
      { zh: `摄影 · ${author.zh}`, en: `Photography · ${author.en}` },
    ],
  };
}

export function ContestChampionGallery({
  champions,
  championLabel,
  locale,
  photographyBy,
}: ContestChampionGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const viewerItems = champions.map(toViewerItem);

  return (
    <>
      <div className={styles.championsGrid}>
        {champions.map((champion, index) => (
          <article className={styles.championCard} key={champion.id}>
            <button
              className={styles.championImage}
              type="button"
              aria-label={localize(champion.theme, locale)}
              onClick={() => setLightboxIndex(index)}
              style={{ aspectRatio: `${champion.image.width} / ${champion.image.height}` }}
            >
              <ResponsivePhoto
                photo={champion.image}
                alt={localize(champion.image.alt, locale)}
                sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 33vw"
              />
            </button>
            <div className={styles.championMeta}>
              <span>ISSUE {champion.issue} · {championLabel}</span>
              <h3>「{localize(champion.theme, locale)}」</h3>
              <p>{photographyBy} · {displayAuthor(champion.author, locale)}</p>
            </div>
          </article>
        ))}
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          items={viewerItems}
          initialIndex={lightboxIndex}
          locale={locale}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
