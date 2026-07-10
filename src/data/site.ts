import type { ImageAsset } from "@/types";

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
} as const;

export const officialImages = {
  hero: {
    src: "https://orguljarstvo-kvaternik.hr/wp-content/uploads/2025/03/mark-foster-_TWQ7o8v4zU-unsplash-Copy.jpg",
    alt: "Orgulje u sakralnom prostoru",
    sourcePage: officialSource,
    status: "official-site-stock",
    usedOnCurrentOfficialSite: true,
    verifiedAsKvaternikProject: false,
    temporary: true,
    width: 1920,
    height: 1080,
  },
  construction: {
    src: "https://orguljarstvo-kvaternik.hr/wp-content/uploads/2025/03/pipe-organ-669589_1280-1024x678.jpg",
    alt: "Drveni sviraonik orgulja s više manuala i registrima",
    sourcePage: officialSource,
    status: "official-site-stock",
    usedOnCurrentOfficialSite: true,
    verifiedAsKvaternikProject: false,
    temporary: true,
    width: 1024,
    height: 678,
  },
  service: {
    src: "https://orguljarstvo-kvaternik.hr/wp-content/uploads/2025/03/pipe-organ-2297819_1280-1024x768.jpg",
    alt: "Detalj metalnih orguljskih cijevi",
    sourcePage: officialSource,
    status: "official-site-stock",
    usedOnCurrentOfficialSite: true,
    verifiedAsKvaternikProject: false,
    temporary: true,
    width: 1024,
    height: 768,
  },
  restoration: {
    src: "https://orguljarstvo-kvaternik.hr/wp-content/uploads/2025/03/denny-muller-zBRE_VEnY_E-unsplash-300x200.jpg",
    alt: "Manuali drvenog orguljskog sviraonika",
    sourcePage: officialSource,
    status: "official-site-stock",
    usedOnCurrentOfficialSite: true,
    verifiedAsKvaternikProject: false,
    temporary: true,
    width: 300,
    height: 200,
  },
  contactBackground: {
    src: "https://orguljarstvo-kvaternik.hr/wp-content/uploads/2025/03/josh-applegate-0FtwZMrMJAo-unsplash.jpg",
    alt: "Unutrašnjost sakralnog prostora",
    sourcePage: officialSource,
    status: "official-site-stock",
    usedOnCurrentOfficialSite: true,
    verifiedAsKvaternikProject: false,
    temporary: true,
    width: 1920,
    height: 1080,
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
} as const;

export const navigation = {
  main: [
    { label: "Početna", href: "/" },
    { label: "O nama", href: "/o-nama" },
    { label: "Orgulje", href: "/orgulje" },
    { label: "Usluge", href: "/usluge" },
    { label: "Projekti", href: "/projekti" },
    { label: "Galerija", href: "/galerija" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  legal: [
    { label: "Pravila privatnosti", href: "/pravila-privatnosti" },
    { label: "Impressum", href: "/impressum" },
  ],
} as const;

export const heroContent = {
  eyebrow: "ORGULJE PO MJERI",
  title: "Orgulje koje stvaraju dušu prostora.",
  description:
    "Gradnja novih orgulja, servis i restauracija uz posebnu pozornost prema mehanici, intonaciji i odnosu instrumenta s prostorom.",
  primaryCta: { label: "Pošaljite upit", href: "/kontakt" },
  secondaryCta: { label: "Upoznajte naše usluge", href: "/usluge" },
  image: officialImages.hero,
} as const;

export const footerContent = {
  description:
    "Izrada, obnova, održavanje i stručno savjetovanje za orgulje i orguljske projekte.",
  quickLinks: [
    { label: "O nama", href: "/o-nama" },
    { label: "Usluge", href: "/usluge" },
    { label: "Projekti", href: "/projekti" },
    { label: "Galerija", href: "/galerija" },
    { label: "Kontakt", href: "/kontakt" },
  ],
} as const;

export const projectsEmptyState = {
  title: "Odabrani projekti uskoro će biti predstavljeni.",
  description:
    "Radovi Orguljarstva Kvaternik bit će objavljeni nakon potvrde podataka i fotografija.",
} as const;
