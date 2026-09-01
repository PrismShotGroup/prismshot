import { HomeRoute } from "@/components/home-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("en", "home");

export default function EnglishHomePage() {
  return <HomeRoute locale="en" />;
}
