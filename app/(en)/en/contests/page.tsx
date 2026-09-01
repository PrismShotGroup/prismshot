import { ContentRoute } from "@/components/content-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("en", "contests");

export default function EnglishContestsPage() {
  return <ContentRoute locale="en" page="contests" />;
}
