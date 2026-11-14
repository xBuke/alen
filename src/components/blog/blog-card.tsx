import Link from "next/link";

import { SiteImage } from "@/components/media/site-image";
import { formatBlogDate } from "@/content";
import type { BlogPost } from "@/data/blog";
import { localizePath, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";
import { cn } from "@/lib/utils";

export function BlogCard({
  post,
  className,
  locale = "hr",
}: {
  post: BlogPost;
  className?: string;
  locale?: Locale;
}) {
  const t = getUi(locale);

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-sm border border-border-dark bg-background transition-colors hover:border-gold/30",
        className,
      )}
    >
      <Link
        href={localizePath(`/blog/${post.slug}`, locale)}
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <SiteImage
            image={post.cover}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="absolute inset-0"
            imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
            showTemporaryBadge={false}
          />
        </div>
        <div className="flex flex-1 flex-col border-t border-border-dark p-5 md:p-6">
          <p className="font-body text-xs uppercase tracking-[0.15em] text-gold">
            {post.category} · {formatBlogDate(post.date, locale)}
          </p>
          <h3 className="mt-2 text-balance text-xl md:text-2xl">{post.title}</h3>
          <p className="mt-3 flex-1 text-sm text-text-muted md:text-base">
            {post.excerpt}
          </p>
          <span className="mt-4 inline-block font-body text-xs font-medium uppercase tracking-[0.15em] text-gold transition-colors group-hover:text-text-light">
            {t.blog.readArticle} · {post.readingMinutes} {t.blog.min}
          </span>
        </div>
      </Link>
    </article>
  );
}
