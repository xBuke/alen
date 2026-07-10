"use client";

import type { GalleryCategory } from "@/types";
import { galleryCategories } from "@/data/gallery";
import { cn } from "@/lib/utils";

type GalleryFilterProps = {
  activeCategory: GalleryCategory | "sve";
  onCategoryChange: (category: GalleryCategory | "sve") => void;
  className?: string;
};

export function GalleryFilter({
  activeCategory,
  onCategoryChange,
  className,
}: GalleryFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filtriraj galeriju po kategoriji"
      className={cn("flex flex-wrap gap-x-6 gap-y-2", className)}
    >
      {galleryCategories.map((category) => {
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "relative pb-2 font-body text-xs uppercase tracking-[0.15em] transition-colors motion-reduce:transition-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "text-gold after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-gold"
                : "text-text-muted hover:text-text-light",
            )}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
