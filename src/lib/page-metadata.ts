import type { Metadata } from "next";

import { siteConfig } from "@/data/site";
import { getAbsoluteUrl } from "@/lib/site-url";

const GLOBAL_DESCRIPTION =
  "Orguljarstvo Kvaternik — gradnja novih orgulja, servis, restauracija, digitalna elektromagnetska traktura i intonacija instrumenata.";

const HOME_TITLE_ABSOLUTE = `${siteConfig.name} | Izrada, servis i restauracija orgulja`;

export function createPageMetadata({
  title,
  description,
  path,
  robots,
}: {
  title: string;
  description: string;
  path: string;
  robots?: Metadata["robots"];
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: getAbsoluteUrl(path),
      type: "website",
    },
    ...(robots ? { robots } : {}),
  };
}

export const rootSiteMetadata = {
  defaultTitle: HOME_TITLE_ABSOLUTE,
  template: `%s | ${siteConfig.name}`,
  description: GLOBAL_DESCRIPTION,
} as const;

export const homePageMetadata: Metadata = {
  title: {
    absolute: HOME_TITLE_ABSOLUTE,
  },
  description: GLOBAL_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: HOME_TITLE_ABSOLUTE,
    description: GLOBAL_DESCRIPTION,
    url: getAbsoluteUrl("/"),
    type: "website",
  },
};
