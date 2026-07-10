import type { MetadataRoute } from "next";

import { getPublishedProjectSlugs } from "@/lib/projects";

const staticRoutes = [
  "/",
  "/o-nama",
  "/orgulje",
  "/usluge",
  "/projekti",
  "/galerija",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://orguljarstvo-kvaternik.hr";

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route === "/" ? "" : route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = getPublishedProjectSlugs().map(
    (slug) => ({
      url: `${baseUrl}/projekti/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }),
  );

  return [...staticEntries, ...projectEntries];
}
