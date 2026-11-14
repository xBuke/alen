import type { MetadataRoute } from "next";

import { blogPosts } from "@/data/blog";
import { localizePath } from "@/i18n/config";
import { getAbsoluteUrl } from "@/lib/site-url";

const staticRoutes = [
  "/",
  "/o-nama",
  "/orgulje",
  "/polovne-orgulje",
  "/usluge",
  "/galerija",
  "/blog",
  "/kontakt",
  "/pravila-privatnosti",
  "/impressum",
] as const;

function languageAlternates(hrPath: string) {
  return {
    languages: {
      hr: getAbsoluteUrl(localizePath(hrPath, "hr")),
      en: getAbsoluteUrl(localizePath(hrPath, "en")),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    (["hr", "en"] as const).map((locale) => ({
      url: getAbsoluteUrl(localizePath(route, locale)),
      changeFrequency: route === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "/" ? 1 : 0.7,
      alternates: languageAlternates(route),
    })),
  );

  const blogEntries: MetadataRoute.Sitemap = blogPosts.flatMap((post) =>
    (["hr", "en"] as const).map((locale) => ({
      url: getAbsoluteUrl(localizePath(`/blog/${post.slug}`, locale)),
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      alternates: languageAlternates(`/blog/${post.slug}`),
    })),
  );

  return [...staticEntries, ...blogEntries];
}
