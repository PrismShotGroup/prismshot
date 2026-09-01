import { GalleryRoute } from "@/components/gallery-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("en", "gallery");

export default function EnglishGalleryPage() {
  return <GalleryRoute locale="en" />;
}
