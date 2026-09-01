import { EventsRoute } from "@/components/events-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("en", "events");

export default function EnglishEventsPage() {
  return <EventsRoute locale="en" />;
}
