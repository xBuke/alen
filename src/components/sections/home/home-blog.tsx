import Link from "next/link";

import { BlogCard } from "@/components/blog/blog-card";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/content";
import { localizePath, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";

export function HomeBlog({ locale = "hr" }: { locale?: Locale }) {
  const posts = getPosts(locale).slice(0, 3);
  const t = getUi(locale);

  return (
    <section className="section-padding border-t border-border-dark bg-surface">
      <Container>
        <MotionReveal>
          <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">{t.home.blogEyebrow}</p>
              <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
                {t.home.blogTitle}
              </h2>
              <p className="mt-4 text-base text-text-muted md:text-lg">
                {t.home.blogDescription}
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href={localizePath("/blog", locale)}>{t.blog.allPosts}</Link>
            </Button>
          </div>
        </MotionReveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <MotionReveal key={post.slug} delay={index * 0.05}>
              <BlogCard post={post} className="h-full" locale={locale} />
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
