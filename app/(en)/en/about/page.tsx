import { AboutRoute } from "@/components/about-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("en", "about");

export default function EnglishAboutPage() {
  return <AboutRoute locale="en" />;
}
