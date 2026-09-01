import { ContentRoute } from "@/components/content-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("zh", "about");

export default function AboutPage() {
  return <ContentRoute locale="zh" page="about" />;
}
