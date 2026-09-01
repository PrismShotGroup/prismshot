import { getSiteContent } from "@/content/site";
import type { Locale } from "@/lib/i18n";

import { ContentPageIntro } from "./content-page-intro";
import { ContestContent } from "./contest-content";
import { SiteShell } from "./site-shell";

interface ContestsRouteProps {
  locale: Locale;
}

export function ContestsRoute({ locale }: ContestsRouteProps) {
  const content = getSiteContent(locale);

  return (
    <SiteShell locale={locale} currentPage="contests" skipLinkLabel={content.skipLinkLabel}>
      <ContentPageIntro locale={locale} page="contests">
        <ContestContent locale={locale} />
      </ContentPageIntro>
    </SiteShell>
  );
}
