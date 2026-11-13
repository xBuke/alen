import { BlogCard } from "@/components/blog/blog-card";
import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { PageContactCta } from "@/components/sections/page/page-contact-cta";
import { PageHero } from "@/components/sections/page/page-hero";
import { getBlogPosts } from "@/data/blog";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Članci o orguljama iz radionice Orguljarstva Kvaternik: kako orgulje rade, restauracija, traktura, održavanje i vjetroorgulje na Trovru.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Početna", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      <PageHero
        eyebrow="BLOG"
        title="O orguljama, iz radionice."
        description="Kako orgulje rade, kako ih čuvati i što smo naučili na instrumentima koje smo gradili i obnavljali."
        breadcrumbLabel="Blog"
      />

      <section className="section-padding">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <MotionReveal key={post.slug} delay={index * 0.05}>
                <BlogCard post={post} className="h-full" />
              </MotionReveal>
            ))}
          </div>
        </Container>
      </section>

      <PageContactCta />
    </>
  );
}
