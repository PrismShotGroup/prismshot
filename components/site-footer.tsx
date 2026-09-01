import Link from "next/link";

import { getSiteContent } from "@/content/site";
import {
  getAlternateLocale,
  getHtmlLang,
  getPageHref,
  type Locale,
  type PageKey,
} from "@/lib/i18n";

import styles from "./site-footer.module.css";

interface SiteFooterProps {
  locale: Locale;
  currentPage: PageKey;
}

export function SiteFooter({ locale, currentPage }: SiteFooterProps) {
  const content = getSiteContent(locale);
  const alternateLocale = getAlternateLocale(locale);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>© {new Date().getFullYear()} PrismShot 棱镜定格</span>
        <div className={styles.links}>
          <Link href={`${getPageHref(locale, "about")}#privacy`}>
            {content.privacyLabel}
          </Link>
          <Link href={getPageHref(locale, "home")}>
            {content.backHomeLabel}
          </Link>
          <Link
            href={getPageHref(alternateLocale, currentPage)}
            hrefLang={getHtmlLang(alternateLocale)}
            lang={getHtmlLang(alternateLocale)}
            aria-label={content.languageSwitchLabel}
          >
            {content.footerLocaleLabel} / {content.alternateLanguageName}
          </Link>
        </div>
      </div>
    </footer>
  );
}
