"use client";

import { useCallback, useState } from "react";

import { galleryPageCopy, galleryPhotos } from "@/content/gallery";
import { localize, toPhotoViewerItem } from "@/content/types";
import type { Locale } from "@/lib/i18n";

import { EditorialSectionHeading } from "./editorial-section-heading";
import { PhotoLightbox } from "./photo-lightbox";
import { ResponsivePhoto } from "./responsive-photo";
import styles from "./gallery-content.module.css";

interface GalleryContentProps {
  locale: Locale;
}

const pageSize = 24;

export function GalleryContent({ locale }: GalleryContentProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const copy = galleryPageCopy[locale];
  const visiblePhotos = galleryPhotos.slice(0, visibleCount);
  const viewerItems = visiblePhotos.map(toPhotoViewerItem);
  const hasMore = visibleCount < galleryPhotos.length;

  return (
    <section className={styles.section} aria-labelledby="gallery-title">
      <EditorialSectionHeading {...copy.section} id="gallery-title" />
      <div className={styles.toolbar}>
        <span className={styles.count}>
          {copy.showing} <strong>{String(visiblePhotos.length).padStart(2, "0")}</strong> {copy.of} {galleryPhotos.length} {copy.photographs}
        </span>
        <span>{copy.sorted}</span>
      </div>

      <div className={styles.masonry}>
        {visiblePhotos.map((photo, index) => {
          const author = photo.author === "unknown" ? copy.unknown : photo.author;
          const date = photo.date === "unknown" ? copy.unknown : photo.date;

          return (
            <button
              className={styles.item}
              key={photo.id}
              type="button"
              aria-label={localize(photo.title, locale)}
              onClick={() => setLightboxIndex(index)}
              style={{ aspectRatio: `${photo.asset.width} / ${photo.asset.height}` }}
            >
              <ResponsivePhoto
                photo={photo.asset}
                alt={localize(photo.asset.alt, locale)}
                sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 33vw"
              />
              <span className={styles.itemMeta}>
                <strong>{localize(photo.title, locale)}</strong>
                <small>{copy.photographyBy} · {author} · {date}</small>
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.loadMoreWrap}>
        {hasMore ? (
          <button
            className={styles.loadMore}
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + pageSize, galleryPhotos.length))}
          >
            {copy.loadMore}
          </button>
        ) : (
          <span className={styles.allLoaded}>{copy.allLoaded}</span>
        )}
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          items={viewerItems}
          initialIndex={lightboxIndex}
          locale={locale}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}
