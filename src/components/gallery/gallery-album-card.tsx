"use client";

import { SiteImage } from "@/components/media/site-image";
import type { GalleryAlbum } from "@/types";
import { useLocale } from "@/i18n/locale-context";
import { getUi } from "@/i18n/ui";
import { cn } from "@/lib/utils";

type GalleryAlbumCardProps = {
  album: GalleryAlbum;
  onSelect: (slug: string) => void;
  className?: string;
  priority?: boolean;
};

export function GalleryAlbumCard({
  album,
  onSelect,
  className,
  priority = false,
}: GalleryAlbumCardProps) {
  const t = getUi(useLocale()).gallery;

  return (
    <article className={cn("group", className)}>
      <button
        type="button"
        onClick={() => onSelect(album.slug)}
        className={cn(
          "relative block w-full overflow-hidden rounded-sm border border-border-dark bg-surface text-left",
          "transition-colors hover:border-gold/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        {/* Naziv gumba počinje vidljivim nazivom albuma (WCAG 2.5.3). */}
        <div className="relative aspect-[4/3]">
          <SiteImage
            image={album.coverImage}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="absolute inset-0"
            imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            showTemporaryBadge={false}
            decorative
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-background from-10% via-background/60 via-45% to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
            <span className="heading-face block text-lg leading-snug text-text-light md:text-xl">
              {album.title}
            </span>
            <span className="mt-1 block font-body text-xs uppercase tracking-[0.14em] text-gold">
              {album.photoCount}{" "}
              {album.photoCount === 1
                ? t.photoOne
                : album.photoCount < 5
                  ? t.photoFew
                  : t.photoMany}
              <span className="sr-only"> – {t.openAlbum}</span>
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}
