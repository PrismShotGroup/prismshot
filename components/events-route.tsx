import { getSiteContent } from "@/content/site";
import type { Locale } from "@/lib/i18n";

import { ContentPageIntro } from "./content-page-intro";
import { EventsContent } from "./events-content";
import { SiteShell } from "./site-shell";

interface EventsRouteProps {
  locale: Locale;
}

export function EventsRoute({ locale }: EventsRouteProps) {
  const content = getSiteContent(locale);

  return (
    <SiteShell locale={locale} currentPage="events" skipLinkLabel={content.skipLinkLabel}>
      <ContentPageIntro locale={locale} page="events">
        <EventsContent locale={locale} />
      </ContentPageIntro>
    </SiteShell>
  );
}
