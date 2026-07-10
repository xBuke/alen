import type { MetadataRoute } from "next";

import { getPublishedProjectSlugs } from "@/lib/projects";
import { getAbsoluteUrl } from "@/lib/site-url";

const staticRoutes = [
  "/",
  "/o-nama",
  "/orgulje",
  "/usluge",
  "/projekti",
  "/galerija",
  "/kontakt",
  "/pravila-privatnosti",
  "/impressum",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: getAbsoluteUrl(route),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = getPublishedProjectSlugs().map(
    (slug) => ({
      url: getAbsoluteUrl(`/projekti/${slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }),
  );

  return [...staticEntries, ...projectEntries];
}
