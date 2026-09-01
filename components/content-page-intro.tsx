import type { ReactNode } from "react";

import { getSiteContent } from "@/content/site";
import type { ContentPageKey, Locale } from "@/lib/i18n";

import styles from "./content-page-intro.module.css";

interface ContentPageIntroProps {
  locale: Locale;
  page: ContentPageKey;
  children?: ReactNode;
}

export function ContentPageIntro({
  locale,
  page,
  children,
}: ContentPageIntroProps) {
  const hero = getSiteContent(locale).pages[page].hero;

  if (!hero) {
    return null;
  }

  return (
    <main className={styles.pageShell} id="main">
      <div className={styles.contentWrap}>
        <section className={styles.pageHero}>
          <div>
            <div className={styles.eyebrow}>{hero.eyebrow}</div>
            <h1 className={styles.pageTitle}>
              {hero.title}
              <br />
              <span>{hero.ghostTitle}</span>
            </h1>
          </div>
          <div className={styles.pageHeroAside}>
            <strong>{hero.statement}</strong>
            <p>{hero.description}</p>
          </div>
        </section>
        {children}
      </div>
    </main>
  );
}
