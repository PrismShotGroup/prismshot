import { AboutRoute } from "@/components/about-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("zh", "about");

export default function AboutPage() {
  return <AboutRoute locale="zh" />;
}
