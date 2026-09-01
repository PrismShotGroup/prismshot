import type { ReactNode } from "react";
import type { Viewport } from "next";

import { fontVariables } from "@/app/fonts";
import { createRootMetadata } from "@/lib/metadata";

import "../globals.css";

export const metadata = createRootMetadata("en");

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#050609",
};

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
