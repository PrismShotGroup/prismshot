import { getSiteContent } from "@/content/site";
import type { Locale } from "@/lib/i18n";

import styles from "./anniversary-content.module.css";

interface AnniversaryContentProps {
  locale: Locale;
}

export function AnniversaryContent({ locale }: AnniversaryContentProps) {
  const hero = getSiteContent(locale).pages.anniversary.hero;

  if (!hero) {
    return null;
  }

  return (
    <main className={styles.page} id="main">
      <section className={styles.poster} aria-labelledby="anniversary-title">
        <div className={styles.grid} aria-hidden="true" />

        <div className={styles.masthead}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <div
            className={styles.wordmark}
            data-anniversary-wordmark="one-year"
            aria-hidden="true"
          >
            <span>{hero.title}</span>
            <span>{hero.ghostTitle}</span>
          </div>
        </div>

        <div
          className={styles.prismStage}
          data-anniversary-prism="one"
          aria-hidden="true"
        >
          <span className={`${styles.orbit} ${styles.orbitOuter}`} />
          <span className={`${styles.orbit} ${styles.orbitInner}`} />
          <span className={styles.lightBeam} />
          <span className={styles.oneGlow}>1</span>
          <span className={styles.oneOutline}>1</span>
          <span className={`${styles.facet} ${styles.facetCyan}`} />
          <span className={`${styles.facet} ${styles.facetMagenta}`} />
          <span className={`${styles.facet} ${styles.facetAmber}`} />
          <span className={styles.axis} />
        </div>

        <div className={styles.announcement}>
          <span className={styles.brandLabel}>PrismShot</span>
          <h1 id="anniversary-title">{hero.statement}</h1>
          <p>{hero.description}</p>
        </div>

        <div className={styles.rail} aria-hidden="true">
          <span>PrismShot</span>
          <span>{hero.title} / {hero.ghostTitle}</span>
          <span>{hero.statement}</span>
          <span>{hero.description}</span>
        </div>
      </section>
    </main>
  );
}
