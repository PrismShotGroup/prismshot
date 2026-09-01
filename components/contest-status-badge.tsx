"use client";

import { useSyncExternalStore } from "react";

import {
  getContestStatus,
  type ContestRound,
  type ContestStatus,
} from "@/content/contests";
import type { Locale } from "@/lib/i18n";

import styles from "./contest-status-badge.module.css";

interface ContestStatusBadgeProps {
  contest: ContestRound;
  labels: Record<ContestStatus, string>;
  locale: Locale;
  serverStatus: ContestStatus;
}

function subscribeToStatus(callback: () => void) {
  const interval = window.setInterval(callback, 60_000);
  return () => window.clearInterval(interval);
}

export function ContestStatusBadge({
  contest,
  labels,
  locale,
  serverStatus,
}: ContestStatusBadgeProps) {
  const status = useSyncExternalStore(
    subscribeToStatus,
    () => getContestStatus(contest, new Date()),
    () => serverStatus,
  );
  const isLive = status === "submitting" || status === "voting";

  return (
    <span
      className={`${styles.status} ${isLive ? styles.live : styles.inactive}`}
      lang={locale === "zh" ? "zh-CN" : "en"}
    >
      {labels[status]}
    </span>
  );
}
