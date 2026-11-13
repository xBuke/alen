import type { ImageAsset } from "@/types";

const officialSource = "https://orguljarstvo-kvaternik.hr/";

export const siteConfig = {
  name: "Orguljarstvo Kvaternik",
  legalName: "ORGULJARSTVO KVATERNIK d.o.o.",
  tagline: "Orgulje koje stvaraju dušu prostora.",
  description:
    "Orguljarstvo Kvaternik — gradnja novih orgulja, servis, restauracija, digitalna elektromagnetska traktura i intonacija instrumenata.",
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

/**
 * Fotografije iz arhive Orguljarstva Kvaternik (mapa "slike za letak" i
 * "Orguljarstvo slike"). Zamijenile su ranije privremene stock fotografije.
 * Naziv `officialImages` zadržan je radi postojećih importa.
 */
export const officialImages = {
  hero: {
    src: "/images/orguljarstvo/reference/ploce-prospekt.webp",
    alt: "Prospekt orgulja sa sviralama i drvenim kućištem",
    status: "verified-original",
    temporary: false,
    width: 1800,
    height: 1200,
  },
  construction: {
    src: "/images/orguljarstvo/reference/donja-velika.webp",
    alt: "Orgulje u svijetlom drvenom kućištu s rezbarenim prospektom",
    status: "verified-original",
    temporary: false,
    width: 1350,
    height: 1800,
  },
  service: {
    src: "/images/orguljarstvo/reference/ploce-svirale.webp",
    alt: "Detalj metalnih svirala u unutrašnjosti orgulja",
    status: "verified-original",
    temporary: false,
    width: 1800,
    height: 1200,
  },
  restoration: {
    src: "/images/orguljarstvo/prije-poslije/fonicki-fundus-poslije-popravka.webp",
    alt: "Svirale orgulja nakon popravka i čišćenja",
    status: "verified-original",
    temporary: false,
    width: 1800,
    height: 1350,
  },
  contactBackground: {
    src: "/images/orguljarstvo/reference/mace.webp",
    alt: "Orgulje na koru crkve",
    status: "verified-original",
    temporary: false,
    width: 1800,
    height: 1200,
  },
} satisfies Record<string, ImageAsset>;

export const alenPortrait: ImageAsset = {
  src: "/images/orguljarstvo/alen/alen-kvaternik.webp",
  alt: "Alen Kvaternik u radionici među orguljskim sviralama",
  credit: "Foto: Ivan Balija / ePodravina.hr",
  sourcePage: "https://epodravina.hr/",
  status: "pending-verification",
  temporary: false,
  width: 1620,
  height: 1080,
};

export const alenProfile = {
  name: "Alen Kvaternik",
  role: "Graditelj orgulja",
  portrait: alenPortrait as ImageAsset | null,
  shortBio:
    "Orguljama se bavim od 2001. godine. U radionici u Draganovcu kraj Koprivnice gradim nove instrumente, obnavljam stare i brinem se da orgulje po našim crkvama sviraju onako kako trebaju.",
} as const;

export const navigation = {
  main: [
    { label: "Početna", href: "/" },
    { label: "O nama", href: "/o-nama" },
    { label: "Orgulje", href: "/orgulje" },
    { label: "Polovne orgulje", href: "/polovne-orgulje" },
    { label: "Usluge", href: "/usluge" },
    { label: "Projekti", href: "/projekti" },
    { label: "Galerija", href: "/galerija" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  legal: [
    { label: "Pravila privatnosti", href: "/pravila-privatnosti" },
    { label: "Impressum", href: "/impressum" },
  ],
} as const;

/** Desktop nav omits Početna — logo already links home. */
export const desktopNavigation = navigation.main.filter(
  (item) => item.href !== "/",
);

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
  statement: "Orgulje koje stvaraju dušu prostora.",
  description:
    "Gradnja novih orgulja, servis i restauracija postojećih instrumenata, digitalna elektromagnetska traktura i intonacija prilagođena prostoru.",
  quickLinks: [
    { label: "O nama", href: "/o-nama" },
    { label: "Usluge", href: "/usluge" },
    { label: "Projekti", href: "/projekti" },
    { label: "Galerija", href: "/galerija" },
    { label: "Blog", href: "/blog" },
    { label: "Polovne orgulje", href: "/polovne-orgulje" },
    { label: "Kontakt", href: "/kontakt" },
  ],
} as const;

export const projectsEmptyState = {
  title: "Odabrani projekti uskoro će biti predstavljeni.",
  description:
    "Radovi Orguljarstva Kvaternik bit će objavljeni nakon potvrde podataka i fotografija.",
} as const;
