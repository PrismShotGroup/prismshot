import Image from "next/image";

import { getPhotoSource, responsivePhotoWidths } from "@/content/photo-assets";
import type { PhotoAsset } from "@/content/types";

import styles from "./responsive-photo.module.css";

interface ResponsivePhotoProps {
  photo: PhotoAsset;
  alt: string;
  sizes: string;
  imageClassName?: string;
}

export function ResponsivePhoto({
  photo,
  alt,
  sizes,
  imageClassName,
}: ResponsivePhotoProps) {
  const sourceSet = (format: "avif" | "webp") =>
    responsivePhotoWidths
      .map((width) => `${getPhotoSource(photo, width, format)} ${width}w`)
      .join(", ");

  return (
    <picture className={styles.picture}>
      <source type="image/avif" srcSet={sourceSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={sourceSet("webp")} sizes={sizes} />
      <Image
        className={imageClassName}
        src={getPhotoSource(photo)}
        alt={alt}
        fill
        sizes={sizes}
        style={photo.focalPoint
          ? { objectPosition: `${photo.focalPoint.x}% ${photo.focalPoint.y}%` }
          : undefined}
        unoptimized
      />
    </picture>
  );
}
