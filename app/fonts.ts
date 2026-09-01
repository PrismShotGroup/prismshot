import { Bebas_Neue, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";

const displayFont = Bebas_Neue({
  variable: "--font-display-face",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
});

const bodyFont = Noto_Sans_SC({
  variable: "--font-body-face",
  weight: "variable",
  display: "swap",
  preload: false,
  fallback: ["Microsoft YaHei", "sans-serif"],
});

const serifFont = Noto_Serif_SC({
  variable: "--font-serif-face",
  weight: "variable",
  display: "swap",
  preload: false,
  fallback: ["Songti SC", "serif"],
});

export const fontVariables = `${displayFont.variable} ${bodyFont.variable} ${serifFont.variable}`;
