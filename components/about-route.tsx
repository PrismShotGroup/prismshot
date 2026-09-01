import { getSiteContent } from "@/content/site";
import type { Locale } from "@/lib/i18n";

import { AboutContent } from "./about-content";
import { ContentPageIntro } from "./content-page-intro";
import { SiteShell } from "./site-shell";

interface AboutRouteProps {
  locale: Locale;
}

export function AboutRoute({ locale }: AboutRouteProps) {
  const content = getSiteContent(locale);

  return (
    <SiteShell locale={locale} currentPage="about" skipLinkLabel={content.skipLinkLabel}>
      <ContentPageIntro locale={locale} page="about">
        <AboutContent locale={locale} />
      </ContentPageIntro>
    </SiteShell>
  );
}
