import { ContentRoute } from "@/components/content-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("zh", "gallery");

export default function GalleryPage() {
  return <ContentRoute locale="zh" page="gallery" />;
}
