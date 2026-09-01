import { ContentRoute } from "@/components/content-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("en", "events");

export default function EnglishEventsPage() {
  return <ContentRoute locale="en" page="events" />;
}
