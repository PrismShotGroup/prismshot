import { pageKeys, type PageKey } from "./i18n";

export function isAnniversaryEnabled(): boolean {
  return process.env.PRISMSHOT_ANNIVERSARY === "1";
}

export function getEnabledPageKeys(): readonly PageKey[] {
  if (isAnniversaryEnabled()) {
    return pageKeys;
  }

  return pageKeys.filter((page) => page !== "anniversary");
}
