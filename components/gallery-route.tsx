import { getSiteContent } from "@/content/site";
import type { Locale } from "@/lib/i18n";

import { ContentPageIntro } from "./content-page-intro";
import { GalleryContent } from "./gallery-content";
import { SiteShell } from "./site-shell";

interface GalleryRouteProps {
  locale: Locale;
}

export function GalleryRoute({ locale }: GalleryRouteProps) {
  const content = getSiteContent(locale);

  return (
    <SiteShell locale={locale} currentPage="gallery" skipLinkLabel={content.skipLinkLabel}>
      <ContentPageIntro locale={locale} page="gallery">
        <GalleryContent locale={locale} />
      </ContentPageIntro>
    </SiteShell>
  );
}
