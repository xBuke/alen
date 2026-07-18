"use client";

import { SiteImage } from "@/components/media/site-image";
import type { GalleryAlbum } from "@/types";
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
        aria-label={`Otvori album: ${album.title}`}
      >
        <div className="relative aspect-[4/3]">
          <SiteImage
            image={album.coverImage}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="absolute inset-0"
            imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            showTemporaryBadge={false}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
            <h3 className="font-display text-lg text-text-light md:text-xl">
              {album.title}
            </h3>
            <p className="mt-1 font-body text-xs uppercase tracking-[0.14em] text-gold">
              {album.photoCount}{" "}
              {album.photoCount === 1
                ? "fotografija"
                : album.photoCount < 5
                  ? "fotografije"
                  : "fotografija"}
            </p>
          </div>
        </div>
      </button>
    </article>
  );
}
