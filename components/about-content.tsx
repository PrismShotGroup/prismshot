import Image from "next/image";
import QRCode from "qrcode";

import { aboutPageCopy, socialPlatforms } from "@/content/about";
import { localize } from "@/content/types";
import type { Locale } from "@/lib/i18n";

import { EditorialSectionHeading } from "./editorial-section-heading";
import styles from "./about-content.module.css";

interface AboutContentProps {
  locale: Locale;
}

export async function AboutContent({ locale }: AboutContentProps) {
  const copy = aboutPageCopy[locale];
  const qrCodes = await Promise.all(
    socialPlatforms.map((platform) =>
      QRCode.toDataURL(platform.href, {
        width: 420,
        margin: 2,
        errorCorrectionLevel: "M",
        color: { dark: "#050609", light: "#ffffff" },
      }),
    ),
  );

  return (
    <>
      <section className={styles.section} aria-labelledby="about-title">
        <EditorialSectionHeading {...copy.manifestoSection} id="about-title" />
        <div className={styles.manifesto}>
          <div className={styles.markWrap}>
            <Image
              src="/images/brand/prismshot-mark.png"
              alt={copy.logoAlt}
              width={2000}
              height={2000}
              sizes="(max-width: 820px) 80vw, 28vw"
            />
          </div>
          <div className={styles.aboutCopy}>
            <span className={styles.tag}>{copy.placeholderTag}</span>
            <p className={styles.lead}>{copy.lead}</p>
            <div className={styles.bodyCopy}>
              {copy.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLine}`} aria-labelledby="connect-title">
        <EditorialSectionHeading {...copy.connectSection} id="connect-title" />
        <div className={styles.platformGrid}>
          {socialPlatforms.map((platform, index) => (
            <a
              className={styles.platformCard}
              key={platform.id}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.platformTop}>
                <span className={styles.platformIcon} aria-hidden="true">
                  <Image src={platform.iconSrc} width={20} height={20} alt="" />
                </span>
                <span className={styles.platformArrow} aria-hidden="true">↗</span>
              </div>
              <h3>{platform.name}</h3>
              <p>{platform.account}<br />{localize(platform.linkNote, locale)}</p>
              <span className={styles.qr}>
                <Image
                  src={qrCodes[index]}
                  alt={localize(platform.qrAlt, locale)}
                  width={420}
                  height={420}
                  unoptimized
                />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.privacy} id="privacy" aria-labelledby="privacy-title">
        <h2 id="privacy-title">{copy.privacyTitle}</h2>
        <p>{copy.privacyBody}</p>
      </section>
    </>
  );
}
