import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { findPost, getPostSlugs } from "@/content";
import { createPageMetadata } from "@/lib/page-metadata";
import { BlogPostView } from "@/views/blog-post";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug, "hr");
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = findPost(slug, "hr");
  if (!post) notFound();

  return <BlogPostView post={post} locale="hr" />;
}
