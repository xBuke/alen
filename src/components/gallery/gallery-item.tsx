"use client";

import { useState } from "react";

import { SiteImage } from "@/components/media/site-image";
import type { GalleryItem } from "@/types";
import { cn } from "@/lib/utils";

type GalleryItemCardProps = {
  item: GalleryItem;
  onOpen: (item: GalleryItem) => void;
  className?: string;
  priority?: boolean;
};

export function GalleryItemCard({
  item,
  onOpen,
  className,
  priority = false,
}: GalleryItemCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const aspectRatio =
    item.image.width && item.image.height
      ? item.image.width / item.image.height
      : 4 / 3;

  if (imageFailed) {
    return (
      <figure
        className={cn(
          "overflow-hidden rounded-sm border border-border-dark bg-surface",
          className,
        )}
        style={{ aspectRatio }}
      >
        <div className="flex h-full w-full items-center justify-center p-4">
          <figcaption className="text-center text-sm text-text-muted">
            {item.title}
          </figcaption>
        </div>
      </figure>
    );
  }

  return (
    <figure className={cn("group", className)}>
      <button
        type="button"
        onClick={() => onOpen(item)}
        className={cn(
          "relative block w-full overflow-hidden rounded-sm border border-border-dark bg-surface text-left",
          "transition-colors hover:border-gold/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
        style={{ aspectRatio }}
        aria-label={`Otvori fotografiju: ${item.title}`}
      >
        <SiteImage
          image={item.image}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="absolute inset-0"
          imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          showTemporaryBadge={false}
          onError={() => setImageFailed(true)}
        />
        <span className="sr-only">{item.alt}</span>
      </button>
      {(item.caption || item.title) && (
        <figcaption className="mt-3 text-sm text-text-muted">
          {item.caption ?? item.title}
        </figcaption>
      )}
    </figure>
  );
}
