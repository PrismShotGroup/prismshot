"use client";

import { useCallback, useState } from "react";

import type { ContestChampion } from "@/content/contests";
import { getPhotoAlt, getPhotoMetadataLabel, localize } from "@/content/types";
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

function toViewerItem(champion: ContestChampion): PhotoViewerItem {
  const authorValue = champion.author;
  const author = authorValue
    ? {
        zh: getPhotoMetadataLabel(authorValue, "zh")!,
        en: getPhotoMetadataLabel(authorValue, "en")!,
      }
    : undefined;

  return {
    id: champion.id,
    asset: champion.image,
    title: champion.theme,
    details: [
      { zh: `第 ${champion.issue} 期`, en: `Issue ${champion.issue}` },
      ...(author
        ? [{ zh: `摄影 · ${author.zh}`, en: `Photography · ${author.en}` }]
        : []),
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
        {champions.map((champion, index) => {
          const author = getPhotoMetadataLabel(champion.author, locale);
          return (
            <article className={styles.championCard} key={champion.id}>
              <button
                className={styles.championImage}
                type="button"
                aria-label={champion.theme
                  ? localize(champion.theme, locale)
                  : getPhotoAlt(champion.image, locale)}
                onClick={() => setLightboxIndex(index)}
              >
                <ResponsivePhoto
                  photo={champion.image}
                  alt={getPhotoAlt(champion.image, locale)}
                  sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 33vw"
                />
              </button>
              <div className={styles.championMeta}>
                <span>ISSUE {champion.issue} · {championLabel}</span>
                {champion.theme && <h3>「{localize(champion.theme, locale)}」</h3>}
                {author && <p>{photographyBy} · {author}</p>}
              </div>
            </article>
          );
        })}
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
