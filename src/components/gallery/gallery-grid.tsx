"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";

import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { GalleryFilter } from "@/components/gallery/gallery-filter";
import { GalleryItemCard } from "@/components/gallery/gallery-item";
import type { GalleryCategory, GalleryItem } from "@/types";
import { cn } from "@/lib/utils";

const ImageLightbox = dynamic(
  () =>
    import("@/components/gallery/image-lightbox").then(
      (mod) => mod.ImageLightbox,
    ),
  { ssr: false },
);

type GalleryGridProps = {
  items: GalleryItem[];
  className?: string;
};

export function GalleryGrid({ items, className }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "sve">(
    "sve",
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "sve") {
      return items;
    }

    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const handleOpen = useCallback(
    (item: GalleryItem) => {
      const index = filteredItems.findIndex((entry) => entry.id === item.id);
      if (index !== -1) {
        setLightboxIndex(index);
      }
    },
    [filteredItems],
  );

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handleNavigate = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <div className={className}>
      <MotionReveal>
        <GalleryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          className="mb-10 md:mb-12"
        />
      </MotionReveal>

      {filteredItems.length === 0 ? (
        <p className="text-center text-text-muted">
          Nema fotografija u odabranoj kategoriji.
        </p>
      ) : (
        <div
          className={cn(
            "columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-6",
            "[&>*]:mb-4 lg:[&>*]:mb-6",
          )}
        >
          {filteredItems.map((item, index) => (
            <MotionReveal key={item.id} delay={index * 0.04}>
              <GalleryItemCard
                item={item}
                onOpen={handleOpen}
                className="break-inside-avoid"
              />
            </MotionReveal>
          ))}
        </div>
      )}

      {lightboxIndex !== null ? (
        <ImageLightbox
          items={filteredItems}
          activeIndex={lightboxIndex}
          onClose={handleClose}
          onNavigate={handleNavigate}
        />
      ) : null}
    </div>
  );
}

export function GalleryGridSection({ items }: GalleryGridProps) {
  return (
    <section className="section-padding">
      <Container>
        <GalleryGrid items={items} />
      </Container>
    </section>
  );
}
