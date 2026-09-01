import { ContestsRoute } from "@/components/contests-route";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("zh", "contests");

export default function ContestsPage() {
  return <ContestsRoute locale="zh" />;
}
