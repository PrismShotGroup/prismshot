"use client";

import type { PointerEventHandler, ReactNode } from "react";
import { useEffect, useRef } from "react";

interface HomeMotionProps {
  className: string;
  children: ReactNode;
}

export function HomeMotion({ className, children }: HomeMotionProps) {
  const animationFrameRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    },
    [],
  );

  const handlePointerMove: PointerEventHandler<HTMLElement> = (event) => {
    if (
      animationFrameRef.current !== null ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const element = event.currentTarget;
    const x = event.clientX / Math.max(window.innerWidth, 1);
    const y = event.clientY / Math.max(window.innerHeight, 1);

    animationFrameRef.current = window.requestAnimationFrame(() => {
      const offsetX = x - 0.5;
      const offsetY = y - 0.5;

      element.style.setProperty("--mx", `${Math.round(x * 100)}%`);
      element.style.setProperty("--my", `${Math.round(y * 100)}%`);
      element.style.setProperty(
        "--crystal-left-x",
        `${(offsetX * 18).toFixed(2)}px`,
      );
      element.style.setProperty(
        "--crystal-left-y",
        `${(offsetY * 12).toFixed(2)}px`,
      );
      element.style.setProperty(
        "--crystal-right-x",
        `${(offsetX * -20).toFixed(2)}px`,
      );
      element.style.setProperty(
        "--crystal-right-y",
        `${(offsetY * -14).toFixed(2)}px`,
      );
      animationFrameRef.current = null;
    });
  };

  const resetPointerPosition: PointerEventHandler<HTMLElement> = (event) => {
    event.currentTarget.style.setProperty("--mx", "50%");
    event.currentTarget.style.setProperty("--my", "42%");
    event.currentTarget.style.setProperty("--crystal-left-x", "0px");
    event.currentTarget.style.setProperty("--crystal-left-y", "0px");
    event.currentTarget.style.setProperty("--crystal-right-x", "0px");
    event.currentTarget.style.setProperty("--crystal-right-y", "0px");
  };

  return (
    <main
      className={className}
      id="main"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointerPosition}
    >
      {children}
    </main>
  );
}
