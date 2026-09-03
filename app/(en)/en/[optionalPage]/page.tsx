import { notFound } from "next/navigation";

import { AnniversaryRoute } from "@/components/anniversary-route";
import { getPageSegment } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { isAnniversaryEnabled } from "@/lib/site-features";

interface OptionalEnglishPageProps {
  params: Promise<{ optionalPage: string }>;
}

export const dynamicParams = false;
export const metadata = createPageMetadata("en", "anniversary");

export function generateStaticParams() {
  return [{ optionalPage: getPageSegment("anniversary") }];
}

export default async function OptionalEnglishPage({
  params,
}: OptionalEnglishPageProps) {
  const { optionalPage } = await params;

  if (
    !isAnniversaryEnabled() ||
    optionalPage !== getPageSegment("anniversary")
  ) {
    notFound();
  }

  return <AnniversaryRoute locale="en" />;
}
