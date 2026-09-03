import Image from "next/image";

import { getPhotoSource, responsivePhotoWidths } from "@/content/photo-assets";
import { getPhotoDimensions } from "@/content/types";
import type { PhotoAsset } from "@/content/types";
import { getResponsivePhotoVariants } from "@/lib/responsive-photo-variants";

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
  const variants = getResponsivePhotoVariants(
    getPhotoDimensions(photo).width,
    responsivePhotoWidths,
  );
  const fallbackVariant = variants.at(-1)!;
  const sourceSet = (format: "avif" | "webp") =>
    variants
      .map(
        (variant) =>
          `${getPhotoSource(photo, variant.fileWidth, format)} ${variant.outputWidth}w`,
      )
      .join(", ");

  return (
    <picture className={styles.picture}>
      <source type="image/avif" srcSet={sourceSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={sourceSet("webp")} sizes={sizes} />
      <Image
        className={imageClassName}
        src={getPhotoSource(photo, fallbackVariant.fileWidth)}
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
