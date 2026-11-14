import { alenPortrait, officialImages, siteConfig } from "@/data/site";
import { photosEn } from "@/data/en/photos";
import type { ImageAsset } from "@/types";

export const siteConfigEn = {
  ...siteConfig,
  tagline: "Organs that give a space its soul.",
  description:
    "Orguljarstvo Kvaternik — building new organs, servicing, restoration, digital electromagnetic action and voicing of instruments.",
} as const;

export const officialImagesEn = {
  hero: { ...officialImages.hero, alt: "Organ facade with pipes and a wooden case" },
  construction: {
    ...officialImages.construction,
    alt: "Organ in a light wooden case with a carved facade",
  },
  service: {
    ...officialImages.service,
    alt: "Detail of metal pipes inside an organ",
  },
  restoration: {
    ...officialImages.restoration,
    alt: "Organ pipes after repair",
  },
  contactBackground: {
    ...officialImages.contactBackground,
    alt: "Organ in a church choir loft",
  },
} satisfies Record<string, ImageAsset>;

export const alenPortraitEn: ImageAsset = {
  ...alenPortrait,
  alt: "Alen Kvaternik in the workshop among organ pipes",
  credit: "Photo: Ivan Balija / ePodravina.hr",
};

export const alenProfileEn = {
  name: "Alen Kvaternik",
  role: "Organ builder",
  portrait: alenPortraitEn as ImageAsset | null,
  shortBio:
    "Alen has worked with organs since 2001. In his workshop in Draganovec near Koprivnica he builds new instruments, restores old ones and makes sure that the organs in our churches sound the way they should.",
} as const;

export const heroContentEn = {
  eyebrow: "ORGANS MADE TO MEASURE",
  title: "Organs that give a space its soul.",
  description:
    "Building new organs, servicing and restoring existing instruments, with particular attention to the mechanics, the voicing and the relationship between the instrument and its space.",
  primaryCta: { label: "Send an inquiry", href: "/kontakt" },
  secondaryCta: { label: "Discover our services", href: "/usluge" },
  image: officialImagesEn.hero,
} as const;

export { photosEn };
