import { ContestsRoute } from "@/components/contests-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("en", "contests");

export default function EnglishContestsPage() {
  return <ContestsRoute locale="en" />;
}
