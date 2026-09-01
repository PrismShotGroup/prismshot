import { getSiteContent } from "@/content/site";
import type { Locale } from "@/lib/i18n";

import { HomeFoundation } from "./home-foundation";
import { SiteShell } from "./site-shell";

interface HomeRouteProps {
  locale: Locale;
}

export function HomeRoute({ locale }: HomeRouteProps) {
  const content = getSiteContent(locale);

  return (
    <SiteShell
      locale={locale}
      currentPage="home"
      skipLinkLabel={content.skipLinkLabel}
    >
      <HomeFoundation locale={locale} />
    </SiteShell>
  );
}
