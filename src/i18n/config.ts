export const locales = ["hr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "hr";

/** Hrvatska putanja -> engleska putanja (bez prefiksa /en). */
const routeMap: Record<string, string> = {
  "/": "/",
  "/o-nama": "/about",
  "/orgulje": "/organs",
  "/polovne-orgulje": "/used-organs",
  "/usluge": "/services",
  "/galerija": "/gallery",
  "/blog": "/blog",
  "/kontakt": "/contact",
  "/pravila-privatnosti": "/privacy-policy",
  "/impressum": "/imprint",
  "/izjava-o-pristupacnosti": "/accessibility-statement",
};

/** Hrvatski slug članka -> engleski slug. */
export const blogSlugMap: Record<string, string> = {
  "vjetroorgulje-na-trovru": "wind-organ-on-trovro",
  "kako-rade-orgulje": "how-organs-work",
  "restauracija-orgulja-prije-i-poslije": "organ-restoration-before-and-after",
  "mehanicka-pneumatska-elektricna-traktura":
    "mechanical-pneumatic-electric-action",
  "odrzavanje-orgulja-savjeti-za-zupe": "organ-care-tips-for-parishes",
};

/** Hrvatska sidra na stranici -> engleska. */
const hashMap: Record<string, string> = {
  "izrada-novih-orgulja": "new-organs",
  "servis-orgulja": "service",
  restauracija: "restoration",
  "digitalna-elektromagnetska-traktura": "digital-electromagnetic-action",
  intonacija: "voicing",
  "o-meni": "about-alen",
  "prije-i-poslije": "before-and-after",
};

const reverseRouteMap = Object.fromEntries(
  Object.entries(routeMap).map(([hr, en]) => [en, hr]),
);
const reverseBlogSlugMap = Object.fromEntries(
  Object.entries(blogSlugMap).map(([hr, en]) => [en, hr]),
);
const reverseHashMap = Object.fromEntries(
  Object.entries(hashMap).map(([hr, en]) => [en, hr]),
);

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "hr";
}

function splitHref(href: string) {
  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex + 1) : "";
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const queryIndex = withoutHash.indexOf("?");
  const query = queryIndex >= 0 ? withoutHash.slice(queryIndex + 1) : "";
  const path = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  return { path: path || "/", query, hash };
}

function joinHref(path: string, query: string, hash: string) {
  return `${path}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
}

/** Pretvara HRVATSKU putanju (kakva je u podatcima) u putanju za zadani jezik. */
export function localizePath(href: string, locale: Locale): string {
  if (locale === "hr" || /^(https?:|mailto:|tel:|#)/.test(href)) {
    return href;
  }

  const { path, query, hash } = splitHref(href);
  const normalized = path.length > 1 ? path.replace(/\/$/, "") : path;

  let enPath: string;
  if (normalized.startsWith("/blog/")) {
    const slug = normalized.slice("/blog/".length);
    enPath = `/blog/${blogSlugMap[slug] ?? slug}`;
  } else {
    enPath = routeMap[normalized] ?? normalized;
  }

  const fullPath = enPath === "/" ? "/en" : `/en${enPath}`;
  return joinHref(fullPath, query, hash ? (hashMap[hash] ?? hash) : "");
}

/** Pretvara putanju bilo kojeg jezika u HRVATSKU (kanonski ključ). */
export function toHrPath(pathname: string): string {
  if (!(pathname === "/en" || pathname.startsWith("/en/"))) {
    return pathname;
  }
  const rest = pathname.slice("/en".length).replace(/\/$/, "") || "/";
  if (rest.startsWith("/blog/")) {
    const slug = rest.slice("/blog/".length);
    return `/blog/${reverseBlogSlugMap[slug] ?? slug}`;
  }
  return reverseRouteMap[rest] ?? rest;
}

/** Putanja iste stranice u drugom jeziku (za prekidač jezika i hreflang). */
export function getAlternatePath(
  pathname: string,
  target: Locale,
  hash = "",
): string {
  const hrPath = toHrPath(pathname);
  const href = hash ? `${hrPath}#${hash}` : hrPath;
  return localizePath(href, target);
}

export function localizeHash(hash: string, locale: Locale): string {
  return locale === "en" ? (hashMap[hash] ?? hash) : hash;
}

export { reverseHashMap };
