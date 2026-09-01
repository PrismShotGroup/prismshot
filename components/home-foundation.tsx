import Image from "next/image";

import { getSiteContent, homeBackgroundSrc, homeSocialLinks } from "@/content/site";
import type { Locale } from "@/lib/i18n";

import { HomeMotion } from "./home-motion";
import styles from "./home-foundation.module.css";

interface HomeFoundationProps {
  locale: Locale;
}

export function HomeFoundation({ locale }: HomeFoundationProps) {
  const home = getSiteContent(locale).home;

  return (
    <HomeMotion className={styles.main}>
      {homeBackgroundSrc ? (
        <div className={styles.background} aria-hidden="true">
          <Image
            className={styles.backgroundImage}
            src={homeBackgroundSrc}
            alt=""
            fill
            sizes="100vw"
            preload
          />
        </div>
      ) : null}
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.axis} aria-hidden="true" />
      <div className={styles.figure} aria-hidden="true" />

      <div className={`${styles.crystal} ${styles.crystalLeft}`} aria-hidden="true">
        <Image
          src="/images/home/crystal-left.webp"
          alt=""
          width={940}
          height={1672}
          sizes="(max-width: 820px) 68vw, 42vw"
          loading="eager"
        />
      </div>
      <div className={`${styles.crystal} ${styles.crystalRight}`} aria-hidden="true">
        <Image
          src="/images/home/crystal-right.webp"
          alt=""
          width={941}
          height={1672}
          sizes="(max-width: 820px) 68vw, 42vw"
          loading="eager"
        />
      </div>

      <section className={styles.stage} aria-labelledby="home-title">
        <p className={styles.kicker}>{home.kicker}</p>
        <h1 className={styles.wordmark} id="home-title" aria-label={home.title}>
          <span className={styles.wordmarkCrop} aria-hidden="true">
            <Image
              src="/images/brand/prismshot-wordmark.webp"
              alt=""
              width={3822}
              height={1321}
              sizes="(max-width: 820px) 100vw, 61vw"
              preload
            />
          </span>
          <span className={styles.wordmarkRefraction} aria-hidden="true">
            <Image
              src="/images/brand/prismshot-wordmark.webp"
              alt=""
              width={3822}
              height={1321}
              sizes="(max-width: 820px) 100vw, 61vw"
            />
          </span>
        </h1>
        <p className={styles.subtitle}>
          {home.subtitle} <span>{home.subtitleDetail}</span>
        </p>
        <span className={styles.divider} aria-hidden="true" />
        <p className={styles.intro}>{home.intro}</p>
      </section>

      <aside className={styles.socialRail} aria-label="Social platforms">
        {homeSocialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
          >
            <span className={styles.socialLabel} aria-hidden="true">
              {social.name}
            </span>
            <Image src={social.iconSrc} width={18} height={18} alt="" />
          </a>
        ))}
      </aside>

      <p className={styles.note} aria-hidden="true">
        {home.note}
      </p>
    </HomeMotion>
  );
}
