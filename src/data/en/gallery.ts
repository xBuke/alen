import { galleryAlbums, galleryItems } from "@/data/gallery";
import { beforeAfterPairs, type BeforeAfterPair } from "@/data/before-after";
import type { GalleryAlbum } from "@/types";

/** Nazivi albuma koji sadrže hrvatske riječi (ostali su vlastita imena). */
const albumTitles: Record<string, string> = {
  "knezija-zagreb": "Zagreb — Knežija",
  "sv-jeronim-zagreb": "Zagreb — St Jerome",
  "sveta-mati-slobode": "Our Lady of Freedom (Sveta Mati Slobode)",
  "sveti-ivan-zeelina": "Sveti Ivan Zelina",
  "banja-luka-katedrala": "Banja Luka — Cathedral",
  "banja-luka-trapisti": "Banja Luka — Trappists",
  "banja-luka-zupna-crkva": "Banja Luka — parish church",
};

const referenceTitles: Record<string, string> = {
  "Kapela (harmonij)": "Chapel (harmonium)",
  "Koprivnica, bl. Alojzije Stepinac": "Koprivnica, Blessed Alojzije Stepinac",
  Portativ: "Portative organ",
  "Pozitiv Kvaternik": "Kvaternik positive organ",
  "Sveta Mati Slobode": "Our Lady of Freedom",
  "Sveti Petar": "Saint Peter",
};

function translateAlbum(album: GalleryAlbum): GalleryAlbum {
  const isReference = album.slug === "reference";
  const albumTitle = isReference
    ? "References"
    : (albumTitles[album.slug] ?? album.title);

  const items = album.items.map((item, index) => {
    const title = isReference
      ? (referenceTitles[item.title] ?? item.title)
      : `${albumTitle} — photo ${index + 1}`;
    const alt = isReference ? `Organ — ${title}` : `${albumTitle} — photo ${index + 1}`;
    return {
      ...item,
      title,
      alt,
      caption: isReference
        ? title
        : album.location
          ? `${albumTitle} — ${album.location}`
          : albumTitle,
      image: { ...item.image, alt },
    };
  });

  return {
    ...album,
    title: albumTitle,
    description: isReference
      ? "One photograph from each location where we have worked."
      : album.description,
    coverImage: { ...album.coverImage, alt: items[0]?.alt ?? album.coverImage.alt },
    items,
  };
}

export const galleryAlbumsEn: GalleryAlbum[] = galleryAlbums.map(translateAlbum);

export const galleryItemsEn = galleryAlbumsEn.flatMap((album) => album.items);

export const galleryAlbumFiltersEn = [
  { id: "sve" as const, label: "All albums" },
  ...galleryAlbumsEn.map((album) => ({ id: album.slug, label: album.title })),
];

const beforeAfterText: Record<string, { title: string; description: string; alts: Record<string, string> }> = {
  mijeh: {
    title: "Bellows",
    description:
      "The worn leather and damaged edges were replaced with new ones, and the wood was cleaned and protected.",
    alts: {
      before: "Organ bellows before restoration, with cracked leather",
      after: "Organ bellows after restoration",
    },
  },
  fundus: {
    title: "Pipework",
    description:
      "The pipes were removed, cleaned, straightened and returned to the wind chest.",
    alts: {
      before: "Organ pipes before repair",
      after: "Organ pipes after repair",
    },
  },
  svirale: {
    title: "Wooden pipes",
    description:
      "The new wooden pipes (left) were made to the measurements of the old, woodworm-damaged pipes (right).",
    alts: {
      combined: "New and old wooden pipes laid side by side",
    },
  },
};

export const beforeAfterPairsEn: BeforeAfterPair[] = beforeAfterPairs.map(
  (pair) => {
    const text = beforeAfterText[pair.id];
    if (!text) return pair;
    return {
      ...pair,
      title: text.title,
      description: text.description,
      combined: pair.combined
        ? { ...pair.combined, alt: text.alts.combined ?? pair.combined.alt }
        : undefined,
      before: pair.before
        ? { ...pair.before, alt: text.alts.before ?? pair.before.alt }
        : undefined,
      after: pair.after
        ? { ...pair.after, alt: text.alts.after ?? pair.after.alt }
        : undefined,
    };
  },
);

export function getBeforeAfterPairEn(id: string): BeforeAfterPair | undefined {
  return beforeAfterPairsEn.find((pair) => pair.id === id);
}

export { galleryItems };
