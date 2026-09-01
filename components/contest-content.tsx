import Image from "next/image";

import {
  contestChampions,
  contestPageCopy,
  currentContest,
  getContestStatus,
} from "@/content/contests";
import { localize } from "@/content/types";
import type { Locale } from "@/lib/i18n";

import { ContestStatusBadge } from "./contest-status-badge";
import { EditorialSectionHeading } from "./editorial-section-heading";
import styles from "./contest-content.module.css";

interface ContestContentProps {
  locale: Locale;
}

export function ContestContent({ locale }: ContestContentProps) {
  const copy = contestPageCopy[locale];
  const serverStatus = getContestStatus(currentContest, new Date());
  const anonymous = locale === "zh" ? "匿名" : "Anonymous";

  return (
    <>
      <section className={styles.section} aria-labelledby="current-contest-title">
        <EditorialSectionHeading
          {...copy.currentSection}
          id="current-contest-title"
        />

        <article className={`${styles.current} ${styles.surface}`}>
          <div className={styles.currentCopy}>
            <div>
              <div className={styles.currentTopline}>
                <span className={styles.issue}>PRISM THEME · {currentContest.issue}</span>
                <ContestStatusBadge
                  contest={currentContest}
                  labels={copy.status}
                  locale={locale}
                  serverStatus={serverStatus}
                />
              </div>
              <h3 className={styles.theme}>
                {localize(currentContest.theme, locale)}
                <small>{currentContest.themeEn}</small>
              </h3>
              <p className={styles.summary}>{localize(currentContest.summary, locale)}</p>
            </div>
            <div className={styles.buttonRow}>
              {currentContest.submissionUrl && (
                <a className={`${styles.button} ${styles.primaryButton}`} href={currentContest.submissionUrl} target="_blank" rel="noopener noreferrer">
                  {copy.submissionLink}
                </a>
              )}
              {currentContest.votingUrl && (
                <a className={`${styles.button} ${styles.primaryButton}`} href={currentContest.votingUrl} target="_blank" rel="noopener noreferrer">
                  {copy.votingLink}
                </a>
              )}
              <a className={styles.button} href="#contest-rules">{copy.rulesLink}</a>
            </div>
          </div>
          <div className={styles.currentVisual}>
            <Image
              src={currentContest.visualSrc}
              alt={localize(currentContest.visualAlt, locale)}
              fill
              sizes="(max-width: 820px) 100vw, 48vw"
            />
          </div>
        </article>
      </section>

      <section className={`${styles.section} ${styles.tightSection}`} id="contest-rules" aria-labelledby="rules-title">
        <EditorialSectionHeading {...copy.rulesSection} id="rules-title" />
        <div className={styles.rulesLayout}>
          <div>
            <div className={styles.callout}>{copy.callout}</div>
            <dl className={styles.rules}>
              {copy.rules.map((rule) => (
                <div className={styles.rule} key={rule.label}>
                  <dt>{rule.label}</dt>
                  <dd>{rule.body}{rule.restriction && <> <span>{rule.restriction}</span></>}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <div className={styles.dates}>
              <div className={styles.date}>
                <span>{copy.submissionPeriod}</span>
                <strong>{currentContest.submissionDisplay}</strong>
              </div>
              <div className={styles.date}>
                <span>{copy.votingPeriod}</span>
                <strong>{currentContest.voteDisplay}</strong>
              </div>
            </div>
            <p className={styles.scheduleNote}>{copy.scheduleNote}</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLine}`} aria-labelledby="champions-title">
        <EditorialSectionHeading {...copy.archiveSection} id="champions-title" />
        <div className={styles.championsGrid}>
          {contestChampions.map((champion) => (
            <article className={styles.championCard} key={champion.id}>
              <div className={styles.championImage}>
                <Image
                  src={champion.imageSrc}
                  alt={localize(champion.imageAlt, locale)}
                  fill
                  sizes="(max-width: 820px) 100vw, 33vw"
                />
                <div className={styles.championMeta}>
                  <span>ISSUE {champion.issue} · {copy.championLabel}</span>
                  <h3>「{localize(champion.theme, locale)}」</h3>
                  <p>{copy.photographyBy} · {champion.author === "anonymous" ? anonymous : champion.author}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
