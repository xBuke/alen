import type { Metadata } from "next";

import { getSiteConfig } from "@/content";
import { siteConfig } from "@/data/site";
import { localizePath, type Locale } from "@/i18n/config";
import { getAbsoluteUrl } from "@/lib/site-url";

const GLOBAL_DESCRIPTION = {
  hr: "Orguljarstvo Kvaternik — gradnja novih orgulja, servis, restauracija, digitalna elektromagnetska traktura i intonacija instrumenata.",
  en: "Orguljarstvo Kvaternik — building new organs, servicing, restoration, digital electromagnetic action and voicing of instruments.",
} as const;

const HOME_TITLE_ABSOLUTE = {
  hr: `${siteConfig.name} | Izrada, servis i restauracija orgulja`,
  en: `${siteConfig.name} | Organ building, servicing and restoration`,
} as const;

const OG_LOCALE = { hr: "hr_HR", en: "en_GB" } as const;

/** Alternativni jezici (hreflang) za HRVATSKU putanju. */
export function buildAlternates(hrPath: string, locale: Locale) {
  return {
    canonical: localizePath(hrPath, locale),
    languages: {
      hr: getAbsoluteUrl(localizePath(hrPath, "hr")),
      en: getAbsoluteUrl(localizePath(hrPath, "en")),
      "x-default": getAbsoluteUrl(localizePath(hrPath, "hr")),
    },
  };
}

/**
 * `path` je uvijek HRVATSKA putanja (ključ stranice); za engleski se
 * automatski preslikava u /en/... putanju.
 */
export function createPageMetadata({
  title,
  description,
  path,
  robots,
  locale = "hr",
}: {
  title: string;
  description: string;
  path: string;
  robots?: Metadata["robots"];
  locale?: Locale;
}): Metadata {
  const siteName = getSiteConfig(locale).name;

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: getAbsoluteUrl(localizePath(path, locale)),
      type: "website",
      locale: OG_LOCALE[locale],
    },
    ...(robots ? { robots } : {}),
  };
}

export function getRootSiteMetadata(locale: Locale) {
  return {
    defaultTitle: HOME_TITLE_ABSOLUTE[locale],
    template: `%s | ${siteConfig.name}`,
    description: GLOBAL_DESCRIPTION[locale],
    ogLocale: OG_LOCALE[locale],
  } as const;
}

/** Zadržano radi postojećih importa (hrvatska verzija). */
export const rootSiteMetadata = getRootSiteMetadata("hr");

export function getHomePageMetadata(locale: Locale): Metadata {
  return {
    title: { absolute: HOME_TITLE_ABSOLUTE[locale] },
    description: GLOBAL_DESCRIPTION[locale],
    alternates: buildAlternates("/", locale),
    openGraph: {
      title: HOME_TITLE_ABSOLUTE[locale],
      description: GLOBAL_DESCRIPTION[locale],
      url: getAbsoluteUrl(localizePath("/", locale)),
      type: "website",
      locale: OG_LOCALE[locale],
    },
  };
}

export const homePageMetadata: Metadata = getHomePageMetadata("hr");
