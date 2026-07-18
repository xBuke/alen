"use client";

import { cn } from "@/lib/utils";

export type AlbumFilterOption = {
  id: string;
  label: string;
};

type GalleryAlbumFilterProps = {
  options: AlbumFilterOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
};

export function GalleryAlbumFilter({
  options,
  activeId,
  onChange,
  className,
}: GalleryAlbumFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filtriraj galeriju po albumu"
      className={cn(
        "flex max-w-full flex-wrap gap-x-5 gap-y-2 overflow-x-auto pb-1",
        className,
      )}
    >
      {options.map((option) => {
        const isActive = activeId === option.id;

        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative inline-flex min-h-11 shrink-0 items-center pb-2 font-body text-xs uppercase tracking-[0.12em] transition-colors motion-reduce:transition-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "text-gold after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-gold"
                : "text-text-muted hover:text-text-light",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
