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
};

export type ProjectCategory =
  | "izrada"
  | "servis"
  | "restauracija"
  | "odrzavanje";

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

const officialSource = "https://orguljarstvo-kvaternik.hr/";

export const siteConfig = {
  name: "Orguljarstvo Kvaternik",
  legalName: "ORGULJARSTVO KVATERNIK d.o.o.",
  tagline: "Orgulje koje stvaraju dušu prostora.",
  description:
    "Izrada novih orgulja, servis, restauracija, digitalna elektromagnetska traktura i intonacija instrumenata.",
  website: officialSource,
  phoneDisplay: "098 777 988",
  phoneHref: "tel:+38598777988",
  email: "alen.kvaternik@gmail.com",
  address: "Rudarska ulica 1, 48000 Draganovec",
  oib: "76874004422",
  contactRecipient: "alen.kvaternik@gmail.com",
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
  },
};

export const officialImages = {
  hero: {
    src: "https://orguljarstvo-kvaternik.hr/wp-content/uploads/2025/03/mark-foster-_TWQ7o8v4zU-unsplash-Copy.jpg",
    alt: "Orgulje u sakralnom prostoru",
    sourcePage: officialSource,
    status: "official-site-stock",
    usedOnCurrentOfficialSite: true,
    verifiedAsKvaternikProject: false,
    temporary: true,
  },
  construction: {
    src: "https://orguljarstvo-kvaternik.hr/wp-content/uploads/2025/03/pipe-organ-669589_1280-1024x678.jpg",
    alt: "Drveni sviraonik orgulja s više manuala i registrima",
    sourcePage: officialSource,
    status: "official-site-stock",
    usedOnCurrentOfficialSite: true,
    verifiedAsKvaternikProject: false,
    temporary: true,
  },
  service: {
    src: "https://orguljarstvo-kvaternik.hr/wp-content/uploads/2025/03/pipe-organ-2297819_1280-1024x768.jpg",
    alt: "Detalj metalnih orguljskih cijevi",
    sourcePage: officialSource,
    status: "official-site-stock",
    usedOnCurrentOfficialSite: true,
    verifiedAsKvaternikProject: false,
    temporary: true,
  },
  restoration: {
    src: "https://orguljarstvo-kvaternik.hr/wp-content/uploads/2025/03/denny-muller-zBRE_VEnY_E-unsplash-300x200.jpg",
    alt: "Manuali drvenog orguljskog sviraonika",
    sourcePage: officialSource,
    status: "official-site-stock",
    usedOnCurrentOfficialSite: true,
    verifiedAsKvaternikProject: false,
    temporary: true,
  },
  contactBackground: {
    src: "https://orguljarstvo-kvaternik.hr/wp-content/uploads/2025/03/josh-applegate-0FtwZMrMJAo-unsplash.jpg",
    alt: "Unutrašnjost sakralnog prostora",
    sourcePage: officialSource,
    status: "official-site-stock",
    usedOnCurrentOfficialSite: true,
    verifiedAsKvaternikProject: false,
    temporary: true,
  },
} satisfies Record<string, ImageAsset>;

export const alenProfile = {
  name: "Alen Kvaternik",
  role: "Orguljarstvo Kvaternik",
  portrait: null as ImageAsset | null,
  shortBio:
    "Alen Kvaternik stoji iza Orguljarstva Kvaternik i kontakta za nove projekte, servis i restauraciju orgulja.",
  verificationNote:
    "Biografske podatke, obrazovanje i stručni put potrebno je potvrditi prije objave.",
};

export const services = [
  {
    slug: "izrada-novih-orgulja",
    title: "Izrada novih orgulja",
    description:
      "Gradimo nove orgulje s klasičnom mehaničkom trakturom, prilagođene prostoru, namjeni i zvukovnoj koncepciji instrumenta.",
    verifiedFromOfficialSite: true,
    image: officialImages.construction,
  },
  {
    slug: "servis-orgulja",
    title: "Servis",
    description:
      "Pregledi, regulacija, popravci i radovi potrebni za pouzdan rad postojećeg instrumenta.",
    verifiedFromOfficialSite: false,
    needsCopyConfirmation: true,
    image: officialImages.service,
  },
  {
    slug: "restauracija",
    title: "Restauracija",
    description:
      "Radovi na postojećim instrumentima uz pažljivo sagledavanje njihove konstrukcije, zvuka i sačuvanih elemenata.",
    verifiedFromOfficialSite: true,
    needsCopyConfirmation: true,
    image: officialImages.restoration,
  },
  {
    slug: "digitalna-elektromagnetska-traktura",
    title: "Digitalna elektromagnetska traktura",
    description:
      "U nove i postojeće orgulje ugrađujemo digitalnu elektromagnetsku trakturu.",
    verifiedFromOfficialSite: true,
    image: officialImages.service,
  },
  {
    slug: "intonacija",
    title: "Intonacija",
    description:
      "Posebnu pozornost posvećujemo intonaciji kako bi se instrument zvukovno što prirodnije uklopio u prostor kojemu je namijenjen.",
    verifiedFromOfficialSite: true,
    image: officialImages.construction,
  },
];

export const mediaAppearances: Array<{
  title: string;
  outlet: string;
  url: string;
  date?: string;
  thumbnail?: ImageAsset;
  verified: boolean;
}> = [];

// Sekciju “Mediji i intervjui” prikazati samo kada mediaAppearances.length > 0.

export const projects: Project[] = [
  {
    slug: "izrada-novih-orgulja",
    title: "Izrada novih orgulja",
    category: "izrada",
    summary:
      "Razvojna kartica za uslugu izrade. Zamijeniti stvarnim projektom kada Alen dostavi lokaciju, fotografije i podatke.",
    coverImage: officialImages.construction,
    gallery: [],
    featured: true,
    draft: true,
  },
  {
    slug: "servis-orgulja",
    title: "Servis orgulja",
    category: "servis",
    summary:
      "Razvojna kartica za servis. Ne prikazivati kao pojedinačnu realizaciju bez potvrđenih podataka.",
    coverImage: officialImages.service,
    gallery: [],
    featured: true,
    draft: true,
  },
  {
    slug: "restauracija-orgulja",
    title: "Restauracija orgulja",
    category: "restauracija",
    summary:
      "Razvojna kartica za restauraciju. Ne pripisivati fotografiju Orguljarstvu Kvaternik kao projekt.",
    coverImage: officialImages.restoration,
    gallery: [],
    featured: true,
    draft: true,
  },
];
