import type { Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";

/**
 * Active nav matching that keeps sibling routes independent
 * (e.g. /orgulje vs /polovne-orgulje).
 */
export function isNavHrefActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  if (pathname === href) {
    return true;
  }

  return pathname.startsWith(`${href}/`);
}

export function getDesktopNavItems(locale: Locale) {
  return getUi(locale).nav.main.filter((item) => item.href !== "/");
}

export function getMobileNavItems(locale: Locale) {
  return getUi(locale).nav.main.map((item, index) => ({
    ...item,
    number: String(index + 1).padStart(2, "0"),
  }));
}
