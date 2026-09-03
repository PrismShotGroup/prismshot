import Image from "next/image";
import QRCode from "qrcode";

import { aboutPageCopy, socialPlatforms, teamMembers } from "@/content/about";
import { localize } from "@/content/types";
import type { Locale } from "@/lib/i18n";

import { EditorialSectionHeading } from "./editorial-section-heading";
import styles from "./about-content.module.css";

interface AboutContentProps {
  locale: Locale;
}

export async function AboutContent({ locale }: AboutContentProps) {
  const copy = aboutPageCopy[locale];
  const qqPlatform = socialPlatforms.find((platform) => platform.id === "qq");
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
              src="/images/brand/prismshot-mark.webp"
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
              <div className={styles.platformCopy}>
                <h3>{platform.name}</h3>
                <p>{platform.account}<br />{localize(platform.linkNote, locale)}</p>
              </div>
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

      <section className={`${styles.section} ${styles.sectionLine}`} aria-labelledby="support-title">
        <EditorialSectionHeading {...copy.supportSection} id="support-title" />
        <div className={styles.supportLayout}>
          <div className={styles.supportIntro}>
            {copy.supportIntro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className={styles.supportUsesBlock}>
            <h3 className={styles.supportUsesTitle}>{copy.supportUsesLabel}</h3>
            <ol className={styles.supportUses}>
              {copy.supportUses.map((use, index) => (
                <li key={use}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <p>{use}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        {qqPlatform && (
          <a
            className={styles.supportContact}
            href={qqPlatform.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{copy.supportContact}</span>
            <strong>{copy.supportContactLabel}<i aria-hidden="true">↗</i></strong>
          </a>
        )}
      </section>

      <section className={`${styles.section} ${styles.sectionLine}`} aria-labelledby="team-title">
        <EditorialSectionHeading {...copy.teamSection} id="team-title" />
        <p className={styles.teamIntro}>{copy.teamIntro}</p>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <article className={styles.teamCard} key={member.id}>
              <div className={styles.portrait}>
                {member.portraitSrc ? (
                  <Image
                    src={member.portraitSrc}
                    alt={localize(member.portraitAlt, locale)}
                    fill
                    sizes="(max-width: 560px) 50vw, (max-width: 1120px) 45vw, 25vw"
                  />
                ) : (
                  <div className={styles.portraitPlaceholder}>
                    <span className={styles.memberMonogram} aria-hidden="true">{member.monogram}</span>
                    <span>{copy.portraitPendingLabel}</span>
                  </div>
                )}
                <span className={styles.memberIndex} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className={styles.memberCopy}>
                <h3>{member.name}</h3>
                <p>{localize(member.role, locale)}</p>
              </div>
            </article>
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
