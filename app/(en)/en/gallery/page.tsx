import { ContentRoute } from "@/components/content-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("en", "gallery");

export default function EnglishGalleryPage() {
  return <ContentRoute locale="en" page="gallery" />;
}
