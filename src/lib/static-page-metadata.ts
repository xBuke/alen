import type { Metadata } from "next";

import {
  getAboutPage,
  getContactPage,
  getImpressum,
  getOrgansPage,
  getPrivacyPolicy,
  getServicesPage,
} from "@/content";
import type { Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";
import { createPageMetadata } from "@/lib/page-metadata";

export type StaticPageKey =
  | "about"
  | "organs"
  | "usedOrgans"
  | "services"
  | "gallery"
  | "blog"
  | "contact"
  | "privacy"
  | "imprint";

/** Metapodatci statičkih stranica; `path` je uvijek hrvatska putanja. */
export function getStaticPageMetadata(
  key: StaticPageKey,
  locale: Locale,
): Metadata {
  const t = getUi(locale);

  const entries: Record<
    StaticPageKey,
    { title: string; description: string; path: string }
  > = {
    about: { ...getAboutPage(locale).metadata, path: "/o-nama" },
    organs: { ...getOrgansPage(locale).metadata, path: "/orgulje" },
    usedOrgans: {
      title: t.usedOrgans.metaTitle,
      description: t.usedOrgans.metaDescription,
      path: "/polovne-orgulje",
    },
    services: { ...getServicesPage(locale).metadata, path: "/usluge" },
    gallery: {
      title: t.gallery.metaTitle,
      description: t.gallery.metaDescription,
      path: "/galerija",
    },
    blog: {
      title: t.blogPage.metaTitle,
      description: t.blogPage.metaDescription,
      path: "/blog",
    },
    contact: {
      title: getContactPage(locale).metadata.title,
      description: getContactPage(locale).metadata.description,
      path: "/kontakt",
    },
    privacy: {
      title: getPrivacyPolicy(locale).metadata.title,
      description: getPrivacyPolicy(locale).metadata.description,
      path: "/pravila-privatnosti",
    },
    imprint: {
      title: getImpressum(locale).metadata.title,
      description: getImpressum(locale).metadata.description,
      path: "/impressum",
    },
  };

  const entry = entries[key];
  return createPageMetadata({ ...entry, locale });
}
