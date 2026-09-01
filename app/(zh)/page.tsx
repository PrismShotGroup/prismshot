import { HomeRoute } from "@/components/home-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("zh", "home");

export default function HomePage() {
  return <HomeRoute locale="zh" />;
}
