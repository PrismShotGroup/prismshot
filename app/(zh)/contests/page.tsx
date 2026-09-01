import { ContentRoute } from "@/components/content-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("zh", "contests");

export default function ContestsPage() {
  return <ContentRoute locale="zh" page="contests" />;
}
