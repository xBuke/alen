import { generatedGalleryAlbums } from "@/data/generated/gallery-generated";
import { galleryAltText } from "@/data/gallery-alt";
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
    const items: GalleryItem[] = album.images.map((image) => {
      // Opis sadržaja fotografije + album (WCAG 1.1.1); rezerva je generički tekst.
      const description = galleryAltText[image.id]?.[0];
      const alt = description ? `${description} — ${album.title}` : image.alt;
      return {
      id: image.id,
      albumSlug: album.slug,
      category: "orgulje",
      title: image.title,
      alt,
      caption: album.location
        ? `${album.title} — ${album.location}`
        : album.title,
      verifiedAsKvaternikProject: false,
      image: {
        src: image.src,
        alt,
        width: image.width,
        height: image.height,
        status: "verified-original",
        temporary: false,
        verifiedAsKvaternikProject: false,
      },
    };
    });

    return {
      slug: album.slug,
      title: album.title,
      location: album.location,
      coverImage: { ...album.coverImage, alt: items[0]?.alt ?? album.coverImage.alt },
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
