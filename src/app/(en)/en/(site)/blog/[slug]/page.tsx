import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { findPost, getPostSlugs } from "@/content";
import { blogSlugMap } from "@/i18n/config";
import { createPageMetadata } from "@/lib/page-metadata";
import { BlogPostView } from "@/views/blog-post";

type PageProps = { params: Promise<{ slug: string }> };

const hrSlugByEnSlug = Object.fromEntries(
  Object.entries(blogSlugMap).map(([hr, en]) => [en, hr]),
);

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug: blogSlugMap[slug] ?? slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(hrSlugByEnSlug[slug] ?? "", "en");
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    locale: "en",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = findPost(hrSlugByEnSlug[slug] ?? "", "en");
  if (!post) notFound();

  return <BlogPostView post={post} locale="en" />;
}
