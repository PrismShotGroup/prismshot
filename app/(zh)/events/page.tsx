import { EventsRoute } from "@/components/events-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("zh", "events");

export default function EventsPage() {
  return <EventsRoute locale="zh" />;
}
