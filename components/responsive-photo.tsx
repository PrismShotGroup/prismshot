import Image from "next/image";

import type { PhotoContent } from "@/content/types";

import styles from "./responsive-photo.module.css";

interface ResponsivePhotoProps {
  photo: Pick<PhotoContent, "src">;
  alt: string;
  sizes: string;
  imageClassName?: string;
}

const widths = [480, 960, 1600] as const;

export function ResponsivePhoto({
  photo,
  alt,
  sizes,
  imageClassName,
}: ResponsivePhotoProps) {
  const match = photo.src.match(/^(.*)-1600\.webp$/);

  if (!match) {
    return (
      <Image
        className={imageClassName}
        src={photo.src}
        alt={alt}
        fill
        sizes={sizes}
      />
    );
  }

  const basePath = match[1];
  const sourceSet = (format: "avif" | "webp") =>
    widths.map((width) => `${basePath}-${width}.${format} ${width}w`).join(", ");

  return (
    <picture className={styles.picture}>
      <source type="image/avif" srcSet={sourceSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={sourceSet("webp")} sizes={sizes} />
      <Image
        className={imageClassName}
        src={photo.src}
        alt={alt}
        fill
        sizes={sizes}
        unoptimized
      />
    </picture>
  );
}
