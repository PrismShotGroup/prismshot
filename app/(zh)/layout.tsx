import type { ReactNode } from "react";
import type { Viewport } from "next";

import { fontVariables } from "@/app/fonts";
import { createRootMetadata } from "@/lib/metadata";

import "../globals.css";

export const metadata = createRootMetadata("zh");

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#050609",
};

export default function ChineseRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={fontVariables}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
