import type { MetadataRoute } from "next";

import { blogPosts } from "@/data/blog";
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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: getAbsoluteUrl(route),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: getAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: post.date,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
