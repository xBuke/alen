import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { BeforeAfter } from "@/components/gallery/before-after";
import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { Container } from "@/components/layout/container";
import { SiteImage } from "@/components/media/site-image";
import { PageContactCta } from "@/components/sections/page/page-contact-cta";
import { getBeforeAfterPair } from "@/data/before-after";
import {
  blogPosts,
  formatBlogDate,
  getBlogPostBySlug,
  getBlogPosts,
  type BlogBlock,
} from "@/data/blog";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/page-metadata";
import { getAbsoluteUrl } from "@/lib/site-url";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 text-balance text-2xl md:text-3xl">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="mt-5 text-base leading-relaxed text-text-muted md:text-lg">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="mt-5 space-y-3 text-base leading-relaxed text-text-muted md:text-lg">
          {block.items.map((item) => (
            <li key={item.slice(0, 40)} className="flex gap-3">
              <span
                className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure className="mt-8">
          <SiteImage
            image={block.image}
            sizes="(max-width: 768px) 100vw, 768px"
            className="mx-auto max-h-[75svh] w-full max-w-xl rounded-sm border border-border-dark"
            imageClassName="h-full w-full"
            showTemporaryBadge={false}
          />
          {block.caption ? (
            <figcaption className="mt-3 text-center text-sm text-text-muted">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    case "beforeAfter": {
      const pair = getBeforeAfterPair(block.pairId);
      return pair ? <BeforeAfter pair={pair} className="mt-8" /> : null;
    }
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const others = getBlogPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: "hr",
    image: getAbsoluteUrl(post.cover.src),
    mainEntityOfPage: getAbsoluteUrl(`/blog/${post.slug}`),
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Početna", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article>
        <header className="relative overflow-hidden">
          <div className="absolute inset-0">
            <SiteImage
              image={post.cover}
              fill
              priority
              sizes="100vw"
              className="absolute inset-0"
              showTemporaryBadge={false}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60"
              aria-hidden="true"
            />
          </div>
          <Container className="relative z-10 pb-12 pt-36 md:pb-16 md:pt-44">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/blog"
                className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gold transition-colors hover:text-text-light"
              >
                ← Blog
              </Link>
              <p className="mt-6 font-body text-xs uppercase tracking-[0.18em] text-text-muted">
                {post.category} · {formatBlogDate(post.date)} ·{" "}
                {post.readingMinutes} min čitanja
              </p>
              <h1 className="mt-4 text-balance text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-lg text-text-light/90 md:text-xl">
                {post.excerpt}
              </p>
            </div>
          </Container>
        </header>

        <Container className="pb-20 md:pb-28">
          <div className="mx-auto max-w-3xl">
            {post.blocks.map((block, index) => (
              <Block key={`${block.type}-${index}`} block={block} />
            ))}

            {post.sources?.length ? (
              <aside className="mt-14 border-t border-border-dark pt-8">
                <h2 className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gold">
                  Izvori
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-text-muted">
                  {post.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
        </Container>
      </article>

      {others.length > 0 ? (
        <section className="section-padding border-t border-border-dark bg-surface">
          <Container>
            <h2 className="mb-10 text-2xl md:text-3xl">Pročitajte i ovo</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {others.map((item) => (
                <BlogCard key={item.slug} post={item} className="h-full" />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <PageContactCta />
    </>
  );
}
