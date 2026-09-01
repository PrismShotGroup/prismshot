"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { getSiteContent } from "@/content/site";
import {
  getAlternateLocale,
  getHtmlLang,
  getPageHref,
  pageKeys,
  type Locale,
  type PageKey,
} from "@/lib/i18n";

import styles from "./site-header.module.css";

interface SiteHeaderProps {
  locale: Locale;
  currentPage: PageKey;
  isHome?: boolean;
}

const menuId = "mobile-menu";

export function SiteHeader({
  locale,
  currentPage,
  isHome = false,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const content = getSiteContent(locale);
  const alternateLocale = getAlternateLocale(locale);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const menu = menuRef.current;

    document.body.classList.add("menu-open");

    const animationFrame = window.requestAnimationFrame(() => {
      const currentLink = menu?.querySelector<HTMLElement>(
        '[aria-current="page"]',
      );
      const firstLink = menu?.querySelector<HTMLElement>("a");
      (currentLink ?? firstLink)?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const menuLinks = Array.from(
        menu?.querySelectorAll<HTMLElement>("a[href]") ?? [],
      );
      const focusableElements = [toggleRef.current, ...menuLinks].filter(
        (element): element is HTMLElement => element !== null,
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("menu-open");
      previouslyFocused?.focus();
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 1121px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    };

    desktopMedia.addEventListener("change", closeOnDesktop);
    return () => desktopMedia.removeEventListener("change", closeOnDesktop);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`${styles.header} ${isHome ? styles.homeHeader : ""}`}
      >
        <Link
          className={styles.brand}
          href={getPageHref(locale, "home")}
          aria-label={content.brandHomeLabel}
        >
          <Image
            className={styles.brandMark}
            src="/images/brand/prismshot-mark.webp"
            width={48}
            height={48}
            alt=""
            preload={isHome}
          />
          <span className={styles.brandCopy}>
            <span className={styles.brandName}>Prism Shot</span>
            <span className={styles.brandSub}>Photography Club</span>
          </span>
        </Link>

        <nav
          className={styles.desktopNav}
          aria-label={content.primaryNavigationLabel}
        >
          {pageKeys.map((page) => (
            <Link
              key={page}
              href={getPageHref(locale, page)}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {content.pages[page].navLabel}
            </Link>
          ))}
        </nav>

        <div className={styles.headerTools}>
          <span className={styles.headerMeta} aria-hidden="true">
            {content.pages[currentPage].headerMeta}
          </span>
          <Link
            className={styles.languageSwitch}
            href={getPageHref(alternateLocale, currentPage)}
            hrefLang={getHtmlLang(alternateLocale)}
            lang={getHtmlLang(alternateLocale)}
            aria-label={content.languageSwitchLabel}
          >
            {content.alternateLanguageName}
          </Link>
        </div>

        <button
          ref={toggleRef}
          className={styles.menuToggle}
          type="button"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? content.closeMenuLabel : content.openMenuLabel}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
        </button>
      </header>

      <div
        ref={menuRef}
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        id={menuId}
        role="dialog"
        aria-modal={menuOpen ? true : undefined}
        aria-label={content.mobileNavigationLabel}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className={styles.mobileMenuInner}>
          <nav aria-label={content.mobileNavigationLabel}>
            {pageKeys.map((page, index) => (
              <Link
                key={page}
                href={getPageHref(locale, page)}
                aria-current={currentPage === page ? "page" : undefined}
                onClick={closeMenu}
              >
                {content.pages[page].navLabel}
                <span>{String(index + 1).padStart(2, "0")}</span>
              </Link>
            ))}
          </nav>

          <Link
            className={styles.mobileLanguageSwitch}
            href={getPageHref(alternateLocale, currentPage)}
            hrefLang={getHtmlLang(alternateLocale)}
            lang={getHtmlLang(alternateLocale)}
            aria-label={content.languageSwitchLabel}
            onClick={closeMenu}
          >
            <span>{content.languageName}</span>
            <strong>{content.alternateLanguageName}</strong>
          </Link>
        </div>
      </div>
    </>
  );
}
