export type AssetStatus =
  | "official-site-stock"
  | "verified-original"
  | "pending-verification";

export type ImageAsset = {
  src: string;
  alt: string;
  sourcePage?: string;
  credit?: string;
  licenseUrl?: string;
  status: AssetStatus;
  usedOnCurrentOfficialSite?: boolean;
  verifiedAsKvaternikProject?: boolean;
  temporary?: boolean;
  width?: number;
  height?: number;
};

export type ProjectCategory =
  | "izrada"
  | "servis"
  | "restauracija"
  | "odrzavanje"
  | "dokumentacija";

export type Project = {
  slug: string;
  title: string;
  location?: string;
  year?: string;
  category: ProjectCategory;
  summary: string;
  coverImage: ImageAsset;
  gallery: ImageAsset[];
  featured?: boolean;
  draft?: boolean;
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  verifiedFromOfficialSite: boolean;
  needsCopyConfirmation?: boolean;
  image: ImageAsset;
  pageDetail?: {
    additionalText?: string;
    note?: string;
    cta: { label: string; href: string };
  };
};

export type MediaAppearance = {
  title: string;
  outlet: string;
  url: string;
  date?: string;
  thumbnail?: ImageAsset;
  verified: boolean;
};

export type GalleryCategory =
  | "orgulje"
  | "sviraonik"
  | "cijevi"
  | "prostor";

export type GalleryItem = {
  id: string;
  image: ImageAsset;
  category: GalleryCategory;
  title: string;
  alt: string;
  caption?: string;
  verifiedAsKvaternikProject: boolean;
  albumSlug?: string;
};

export type GalleryAlbum = {
  slug: string;
  title: string;
  location?: string;
  description?: string;
  coverImage: ImageAsset;
  photoCount: number;
  items: GalleryItem[];
};

export type UsedOrganStatus =
  | "available"
  | "reserved"
  | "sold"
  | "coming-soon";

export type UsedOrgan = {
  slug: string;
  title: string;
  manufacturer?: string;
  model?: string;
  year?: string;
  location?: string;
  manuals?: string;
  registers?: string;
  dimensions?: string;
  condition?: string;
  description?: string;
  price?: string;
  priceOnRequest?: boolean;
  status: UsedOrganStatus;
  coverImage: ImageAsset;
  gallery: ImageAsset[];
  published: boolean;
  featured?: boolean;
};
