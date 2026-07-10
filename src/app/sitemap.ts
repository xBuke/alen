import type { MetadataRoute } from "next";

import { navigation } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://orguljarstvo-kvaternik.hr";

  const routes = [
  ...navigation.main.map((item) => item.href),
  ...navigation.legal.map((item) => item.href),
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
