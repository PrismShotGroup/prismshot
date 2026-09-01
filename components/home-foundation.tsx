import { getSiteContent } from "@/content/site";
import type { Locale } from "@/lib/i18n";

import styles from "./home-foundation.module.css";

interface HomeFoundationProps {
  locale: Locale;
}

export function HomeFoundation({ locale }: HomeFoundationProps) {
  const home = getSiteContent(locale).home;

  return (
    <main className={styles.main} id="main">
      <div className={styles.axis} aria-hidden="true" />
      <section className={styles.stage} aria-labelledby="home-title">
        <p className={styles.kicker}>{home.kicker}</p>
        <h1
          className={styles.wordmark}
          id="home-title"
          data-text={home.title}
        >
          {home.title}
        </h1>
        <p className={styles.subtitle}>{home.subtitle}</p>
        <span className={styles.divider} aria-hidden="true" />
        <p className={styles.intro}>{home.intro}</p>
      </section>
      <p className={styles.note} aria-hidden="true">
        {home.note}
      </p>
    </main>
  );
}
