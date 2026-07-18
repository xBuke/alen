import { generatedGalleryAlbums } from "@/data/generated/gallery-generated";
import type { GalleryAlbum, GalleryItem } from "@/types";

export const galleryAlbums: GalleryAlbum[] = generatedGalleryAlbums.map(
  (album) => {
    const items: GalleryItem[] = album.images.map((image) => ({
      id: image.id,
      albumSlug: album.slug,
      category: "orgulje",
      title: image.title,
      alt: image.alt,
      caption: album.location
        ? `${album.title} — ${album.location}`
        : album.title,
      verifiedAsKvaternikProject: false,
      image: {
        src: image.src,
        alt: image.alt,
        width: image.width,
        height: image.height,
        status: "verified-original",
        temporary: false,
        verifiedAsKvaternikProject: false,
      },
    }));

    return {
      slug: album.slug,
      title: album.title,
      location: album.location,
      coverImage: album.coverImage,
      photoCount: album.photoCount,
      items,
    };
  },
);

/** Flat list for lightbox / legacy helpers. */
export const galleryItems: GalleryItem[] = galleryAlbums.flatMap(
  (album) => album.items,
);

export function getGalleryAlbumBySlug(slug: string): GalleryAlbum | undefined {
  return galleryAlbums.find((album) => album.slug === slug);
}

export const galleryAlbumFilters = [
  { id: "sve" as const, label: "Svi albumi" },
  ...galleryAlbums.map((album) => ({
    id: album.slug,
    label: album.title,
  })),
];
