import { GalleryRoute } from "@/components/gallery-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("zh", "gallery");

export default function GalleryPage() {
  return <GalleryRoute locale="zh" />;
}
