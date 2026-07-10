const PRODUCTION_SITE_URL = "https://orguljarstvo-kvaternik.hr";
const DEVELOPMENT_SITE_URL = "http://localhost:3000";

function resolveRawSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  return process.env.NODE_ENV === "development"
    ? DEVELOPMENT_SITE_URL
    : PRODUCTION_SITE_URL;
}

/**
 * Returns the public site origin without a trailing slash.
 * Validates that the URL uses http: or https:.
 */
export function getSiteUrl(): string {
  const parsed = new URL(resolveRawSiteUrl());

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Site URL must use http or https protocol.");
  }

  return `${parsed.protocol}//${parsed.host}`;
}

/**
 * Builds an absolute URL for a site path using the centralized site origin.
 */
export function getAbsoluteUrl(path: string = "/"): string {
  const base = getSiteUrl();

  if (path === "/" || path === "") {
    return base;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

/** Alias used by origin checks and email links. */
export function getSiteOrigin(): string {
  return getSiteUrl();
}
