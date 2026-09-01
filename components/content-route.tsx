import { getSiteContent } from "@/content/site";
import type { ContentPageKey, Locale } from "@/lib/i18n";

import { ContentPageIntro } from "./content-page-intro";
import { SiteShell } from "./site-shell";

interface ContentRouteProps {
  locale: Locale;
  page: ContentPageKey;
}

export function ContentRoute({ locale, page }: ContentRouteProps) {
  const content = getSiteContent(locale);

  return (
    <SiteShell
      locale={locale}
      currentPage={page}
      skipLinkLabel={content.skipLinkLabel}
    >
      <ContentPageIntro locale={locale} page={page} />
    </SiteShell>
  );
}
