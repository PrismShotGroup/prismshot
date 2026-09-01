import { ContentRoute } from "@/components/content-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("en", "about");

export default function EnglishAboutPage() {
  return <ContentRoute locale="en" page="about" />;
}
