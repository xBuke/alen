import { navigation } from "@/data/site";

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

export function getMobileNavItems() {
  return navigation.main.map((item, index) => ({
    ...item,
    number: String(index + 1).padStart(2, "0"),
  }));
}
