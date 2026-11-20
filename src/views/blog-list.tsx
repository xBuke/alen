import { BlogCard } from "@/components/blog/blog-card";
import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { PageContactCta } from "@/components/sections/page/page-contact-cta";
import { PageHero } from "@/components/sections/page/page-hero";
import { getPosts } from "@/content";
import type { Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";

export function BlogListView({ locale }: { locale: Locale }) {
  const t = getUi(locale);
  const posts = getPosts(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: t.homeLabel, href: "/" },
          { label: t.blogPage.breadcrumb, href: "/blog" },
        ]}
        locale={locale}
      />

      <PageHero
        eyebrow={t.blogPage.eyebrow}
        title={t.blogPage.title}
        description={t.blogPage.description}
        breadcrumbLabel={t.blogPage.breadcrumb}
        locale={locale}
      />

      <section className="section-padding">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <MotionReveal key={post.slug} delay={index * 0.05}>
                <BlogCard
                  post={post}
                  className="h-full"
                  locale={locale}
                  headingLevel={2}
                />
              </MotionReveal>
            ))}
          </div>
        </Container>
      </section>

      <PageContactCta locale={locale} />
    </>
  );
}
