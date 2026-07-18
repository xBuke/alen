"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";

import { GalleryAlbumCard } from "@/components/gallery/gallery-album-card";
import { GalleryAlbumFilter } from "@/components/gallery/gallery-album-filter";
import { GalleryItemCard } from "@/components/gallery/gallery-item";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { Button } from "@/components/ui/button";
import { galleryAlbumFilters } from "@/data/gallery";
import type { GalleryAlbum, GalleryItem } from "@/types";
import { cn } from "@/lib/utils";

const ImageLightbox = dynamic(
  () =>
    import("@/components/gallery/image-lightbox").then(
      (mod) => mod.ImageLightbox,
    ),
  { ssr: false },
);

const INITIAL_VISIBLE = 12;
const LOAD_MORE_STEP = 12;

type GalleryGridProps = {
  albums: GalleryAlbum[];
  className?: string;
};

export function GalleryGrid({ albums, className }: GalleryGridProps) {
  const [activeAlbum, setActiveAlbum] = useState<string>("sve");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterOptions = useMemo(() => galleryAlbumFilters, []);

  const selectedAlbum = useMemo(
    () => albums.find((album) => album.slug === activeAlbum) ?? null,
    [albums, activeAlbum],
  );

  const albumItems: GalleryItem[] = useMemo(
    () => selectedAlbum?.items ?? [],
    [selectedAlbum],
  );

  const visibleItems = useMemo(
    () => albumItems.slice(0, visibleCount),
    [albumItems, visibleCount],
  );

  const hasMore = albumItems.length > visibleCount;

  const handleAlbumChange = useCallback((id: string) => {
    setActiveAlbum(id);
    setVisibleCount(INITIAL_VISIBLE);
    setLightboxIndex(null);
  }, []);

  const handleOpen = useCallback(
    (item: GalleryItem) => {
      const index = albumItems.findIndex((entry) => entry.id === item.id);
      if (index !== -1) {
        setLightboxIndex(index);
      }
    },
    [albumItems],
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
        <GalleryAlbumFilter
          options={filterOptions}
          activeId={activeAlbum}
          onChange={handleAlbumChange}
          className="mb-10 md:mb-12"
        />
      </MotionReveal>

      {activeAlbum === "sve" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {albums.map((album, index) => (
            <MotionReveal key={album.slug} delay={index * 0.04}>
              <GalleryAlbumCard
                album={album}
                onSelect={handleAlbumChange}
                priority={index < 3}
              />
            </MotionReveal>
          ))}
        </div>
      ) : albumItems.length === 0 ? (
        <p className="text-center text-text-muted">
          Nema fotografija u odabranom albumu.
        </p>
      ) : (
        <>
          <MotionReveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl">{selectedAlbum?.title}</h2>
                {selectedAlbum?.location ? (
                  <p className="mt-2 font-body text-sm text-text-muted">
                    {selectedAlbum.location}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => handleAlbumChange("sve")}
                className="font-body text-xs uppercase tracking-[0.14em] text-gold transition-colors hover:text-text-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Svi albumi
              </button>
            </div>
          </MotionReveal>

          <div
            className={cn(
              "columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-6",
              "[&>*]:mb-4 lg:[&>*]:mb-6",
            )}
          >
            {visibleItems.map((item, index) => (
              <MotionReveal key={item.id} delay={index * 0.03}>
                <GalleryItemCard
                  item={item}
                  onOpen={handleOpen}
                  className="break-inside-avoid"
                  priority={index < 2}
                />
              </MotionReveal>
            ))}
          </div>

          {hasMore ? (
            <div className="mt-10 flex justify-center">
              <Button
                type="button"
                variant="secondary"
                className="rounded-sm"
                onClick={() =>
                  setVisibleCount((count) => count + LOAD_MORE_STEP)
                }
              >
                Prikaži još
              </Button>
            </div>
          ) : null}
        </>
      )}

      {lightboxIndex !== null && albumItems.length > 0 ? (
        <ImageLightbox
          items={albumItems}
          activeIndex={lightboxIndex}
          onClose={handleClose}
          onNavigate={handleNavigate}
        />
      ) : null}
    </div>
  );
}

export function GalleryGridSection({ albums }: { albums: GalleryAlbum[] }) {
  return (
    <section className="section-padding">
      <Container>
        <GalleryGrid albums={albums} />
      </Container>
    </section>
  );
}
