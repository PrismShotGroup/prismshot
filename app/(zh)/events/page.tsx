import { ContentRoute } from "@/components/content-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("zh", "events");

export default function EventsPage() {
  return <ContentRoute locale="zh" page="events" />;
}
