import type { Metadata } from "next";

import { siteConfig } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { getRootSiteMetadata } from "@/lib/page-metadata";
import { getSiteUrl } from "@/lib/site-url";

export function createRootMetadata(locale: Locale): Metadata {
  const root = getRootSiteMetadata(locale);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: root.defaultTitle,
      template: root.template,
    },
    description: root.description,
    openGraph: {
      type: "website",
      locale: root.ogLocale,
      siteName: siteConfig.name,
      title: root.defaultTitle,
      description: root.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
