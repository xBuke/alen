import { generatedGalleryAlbums } from "@/data/generated/gallery-generated";
import { referencePhotos } from "@/data/reference-album";
import type { GalleryAlbum, GalleryItem } from "@/types";

const referenceAlbum: GalleryAlbum = (() => {
  const items: GalleryItem[] = referencePhotos.map((photo, index) => ({
    id: `reference-${index + 1}`,
    albumSlug: "reference",
    category: "orgulje",
    title: photo.title,
    alt: `Orgulje — ${photo.title}`,
    caption: photo.title,
    verifiedAsKvaternikProject: true,
    image: {
      src: photo.src,
      alt: `Orgulje — ${photo.title}`,
      width: photo.width,
      height: photo.height,
      status: "verified-original",
      temporary: false,
      verifiedAsKvaternikProject: true,
    },
  }));

  return {
    slug: "reference",
    title: "Reference",
    description: "Po jedna fotografija s lokacija na kojima smo radili.",
    coverImage: items[0].image,
    photoCount: items.length,
    items,
  };
})();

const locationAlbums: GalleryAlbum[] = generatedGalleryAlbums.map(
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

export const galleryAlbums: GalleryAlbum[] = [
  referenceAlbum,
  ...locationAlbums,
];

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
