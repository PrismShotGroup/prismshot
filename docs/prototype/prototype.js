(function () {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  function setMenu(open) {
    if (!menuButton || !mobileMenu) return;
    const wasOpen = menuButton.getAttribute("aria-expanded") === "true";
    const focusWasInside = mobileMenu.contains(document.activeElement);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    mobileMenu.inert = !open;
    body.classList.toggle("menu-open", open);

    if (open) {
      const firstLink = mobileMenu.querySelector("a");
      window.setTimeout(() => firstLink && firstLink.focus(), 120);
    } else if (wasOpen && focusWasInside) {
      menuButton.focus();
    }
  }

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6%" }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  let pointerFrame = 0;
  document.addEventListener("pointermove", (event) => {
    if (pointerFrame) return;
    pointerFrame = window.requestAnimationFrame(() => {
      const x = event.clientX / Math.max(window.innerWidth, 1);
      const y = event.clientY / Math.max(window.innerHeight, 1);
      root.style.setProperty("--mx", `${Math.round(x * 100)}%`);
      root.style.setProperty("--my", `${Math.round(y * 100)}%`);

      if (!reduceMotion && document.querySelector(".home-main")) {
        const offsetX = x - 0.5;
        const offsetY = y - 0.5;
        root.style.setProperty("--px", offsetX.toFixed(3));
        root.style.setProperty("--py", offsetY.toFixed(3));
        root.style.setProperty("--crystal-left-x", `${(offsetX * 18).toFixed(2)}px`);
        root.style.setProperty("--crystal-left-y", `${(offsetY * 12).toFixed(2)}px`);
        root.style.setProperty("--crystal-right-x", `${(offsetX * -20).toFixed(2)}px`);
        root.style.setProperty("--crystal-right-y", `${(offsetY * -14).toFixed(2)}px`);
      }
      pointerFrame = 0;
    });
  });

  const toast = document.querySelector(".toast");
  let toastTimer = 0;

  function showToast(message) {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-toast]");
    if (!target) return;
    if (target.getAttribute("href") === "#") event.preventDefault();
    showToast(target.dataset.toast || "此功能将在正式版中开放。");
  });

  const lightbox = document.querySelector(".lightbox");
  let lightboxItems = [];
  let lightboxIndex = 0;
  let lightboxReturnFocus = null;
  let touchStartX = 0;

  function refreshLightboxItems() {
    lightboxItems = Array.from(document.querySelectorAll(".js-lightbox-trigger:not([hidden])"));
  }

  function renderLightbox() {
    const item = lightboxItems[lightboxIndex];
    if (!item || !lightbox) return;

    const source = item.dataset.image || item.querySelector("img")?.currentSrc || item.querySelector("img")?.src;
    const image = lightbox.querySelector(".lightbox__image");
    const title = lightbox.querySelector(".lightbox__title");
    const caption = lightbox.querySelector(".lightbox__caption");
    const meta = lightbox.querySelector(".lightbox__meta");
    const counter = lightbox.querySelector(".lightbox__counter");

    image.src = source || "";
    image.alt = item.dataset.alt || item.querySelector("img")?.alt || "大图预览";
    title.textContent = item.dataset.title || "未命名作品";
    caption.textContent = item.dataset.caption || "";
    caption.hidden = !item.dataset.caption;
    meta.textContent = [item.dataset.author || "作者未知", item.dataset.date || "日期未知"].join(" · ");
    counter.textContent = `${String(lightboxIndex + 1).padStart(2, "0")} / ${String(lightboxItems.length).padStart(2, "0")}`;
  }

  function openLightbox(trigger) {
    if (!lightbox) return;
    refreshLightboxItems();
    const nextIndex = lightboxItems.indexOf(trigger);
    if (nextIndex < 0) return;
    lightboxIndex = nextIndex;
    lightboxReturnFocus = trigger;
    renderLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    body.classList.add("menu-open");
    window.setTimeout(() => lightbox.querySelector(".lightbox__close")?.focus(), 100);
  }

  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    body.classList.remove("menu-open");
    lightboxReturnFocus?.focus();
  }

  function stepLightbox(direction) {
    if (!lightboxItems.length) return;
    lightboxIndex = (lightboxIndex + direction + lightboxItems.length) % lightboxItems.length;
    renderLightbox();
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".js-lightbox-trigger");
    if (trigger) {
      event.preventDefault();
      openLightbox(trigger);
    }
  });

  if (lightbox) {
    lightbox.querySelector(".lightbox__close")?.addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox__prev")?.addEventListener("click", () => stepLightbox(-1));
    lightbox.querySelector(".lightbox__next")?.addEventListener("click", () => stepLightbox(1));
    lightbox.querySelector(".lightbox__stage")?.addEventListener("click", (event) => {
      if (event.target.classList.contains("lightbox__stage")) closeLightbox();
    });
    lightbox.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0]?.screenX || 0;
    }, { passive: true });
    lightbox.addEventListener("touchend", (event) => {
      const delta = (event.changedTouches[0]?.screenX || 0) - touchStartX;
      if (Math.abs(delta) > 55) stepLightbox(delta > 0 ? -1 : 1);
    }, { passive: true });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (lightbox?.classList.contains("is-open")) closeLightbox();
      else setMenu(false);
    }

    if (!lightbox?.classList.contains("is-open")) return;
    if (event.key === "ArrowLeft") stepLightbox(-1);
    if (event.key === "ArrowRight") stepLightbox(1);

    if (event.key === "Tab") {
      const focusable = Array.from(lightbox.querySelectorAll("button:not([disabled])"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.PrismShotProto = {
    showToast,
    refreshLightboxItems
  };
})();
