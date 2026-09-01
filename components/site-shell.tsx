import type { ReactNode } from "react";

import type { Locale, PageKey } from "@/lib/i18n";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import styles from "./site-shell.module.css";

interface SiteShellProps {
  locale: Locale;
  currentPage: PageKey;
  skipLinkLabel: string;
  children: ReactNode;
}

export function SiteShell({
  locale,
  currentPage,
  skipLinkLabel,
  children,
}: SiteShellProps) {
  const isHome = currentPage === "home";

  return (
    <>
      <a className={styles.skipLink} href="#main">
        {skipLinkLabel}
      </a>
      <SiteHeader
        locale={locale}
        currentPage={currentPage}
        isHome={isHome}
      />
      {children}
      {!isHome && (
        <SiteFooter locale={locale} currentPage={currentPage} />
      )}
    </>
  );
}
