import { getSiteContent } from "@/content/site";
import type { Locale } from "@/lib/i18n";

import { AnniversaryContent } from "./anniversary-content";
import { SiteShell } from "./site-shell";

interface AnniversaryRouteProps {
  locale: Locale;
}

export function AnniversaryRoute({ locale }: AnniversaryRouteProps) {
  const content = getSiteContent(locale);

  return (
    <SiteShell
      locale={locale}
      currentPage="anniversary"
      skipLinkLabel={content.skipLinkLabel}
    >
      <AnniversaryContent locale={locale} />
    </SiteShell>
  );
}
