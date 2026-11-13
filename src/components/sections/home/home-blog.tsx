import Link from "next/link";

import { BlogCard } from "@/components/blog/blog-card";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/data/blog";

export function HomeBlog() {
  const posts = getBlogPosts().slice(0, 3);

  return (
    <section className="section-padding border-t border-border-dark bg-surface">
      <Container>
        <MotionReveal>
          <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">BLOG</p>
              <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
                Od crkvenog kora do brda na kojem svira vjetar.
              </h2>
              <p className="mt-4 text-base text-text-muted md:text-lg">
                Pišemo o tome kako orgulje rade, kako ih čuvati i o projektima
                poput vjetroorgulja na Trovru iznad Rogotina.
              </p>
            </div>
            <Button asChild variant="secondary" className="rounded-sm">
              <Link href="/blog">Svi članci</Link>
            </Button>
          </div>
        </MotionReveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <MotionReveal key={post.slug} delay={index * 0.05}>
              <BlogCard post={post} className="h-full" />
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
