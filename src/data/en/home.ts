import { photosEn as photos } from "@/data/en/photos";
import type { WorkArea } from "@/data/home";

export const homeIntroEn = {
  eyebrow: "THE ORGAN BUILDER'S CRAFT",
  title: "Wood, metal, air and music joined into a single instrument.",
  description:
    "An organ is at once a musical instrument, a complex mechanical system and part of a building's architecture. Every project therefore calls for an individual approach, precision and an understanding of the whole.",
} as const;

export const homeServicesSectionEn = {
  eyebrow: "OUR SERVICES",
  title: "Knowledge in the service of the instrument",
  description:
    "From building new organs to work on existing instruments, we approach every project according to its real needs and the space it belongs to.",
} as const;

export const homeAboutEn = {
  eyebrow: "ORGULJARSTVO KVATERNIK",
  title: "We see the instrument as a whole.",
  description:
    "Orguljarstvo Kvaternik builds new organs and services and restores existing instruments. Our work covers classical mechanical systems, digital electromagnetic action and careful tonal shaping of the instrument.",
  cta: { label: "More about the workshop", href: "/o-nama" },
  image: photos.donjaVelika,
} as const;

export const homeWorkAreasEn: WorkArea[] = [
  {
    number: "01",
    title: "New organs",
    description:
      "Building new instruments adapted to the space, its purpose and the tonal concept.",
    image: photos.pozitiv,
    href: "/usluge#izrada-novih-orgulja",
  },
  {
    number: "02",
    title: "Existing instruments",
    description:
      "Servicing and restoration with careful attention to the construction and the surviving elements.",
    image: photos.legradProspect,
    href: "/usluge#servis-orgulja",
  },
  {
    number: "03",
    title: "Action and mechanics",
    description:
      "Classical mechanical systems and digital electromagnetic action for new and existing organs.",
    image: photos.knezijaMagnets,
    href: "/usluge#digitalna-elektromagnetska-traktura",
  },
  {
    number: "04",
    title: "Voicing and sound",
    description:
      "Tonal shaping of the instrument so that it blends naturally into the space it is intended for.",
    image: photos.knezijaPipesTop,
    href: "/usluge#intonacija",
  },
];

export const homeProcessEn = {
  eyebrow: "HOW WE WORK",
  title: "From the first conversation to the final check",
  steps: [
    {
      number: "01",
      title: "Conversation and initial information",
      description:
        "We get to know the instrument, the space, the needs of its users and the goal of the proposed work.",
    },
    {
      number: "02",
      title: "Inspection of the instrument and space",
      description:
        "We assess the current condition, the construction of the instrument and the conditions in the space.",
    },
    {
      number: "03",
      title: "Proposal of work",
      description:
        "Based on the inspection, a clear proposal of the necessary work is drawn up.",
    },
    {
      number: "04",
      title: "Execution and final check",
      description:
        "The work is carried out as agreed, followed by a check of the instrument's function and sound.",
    },
  ],
} as const;

export const homeQuoteEn = {
  text: "Music is the breath of a space, and the organ is its voice.",
} as const;

export const homeContactCtaEn = {
  title: "Let's talk about your instrument.",
  description:
    "For a new project, service or restoration, send us basic information about the instrument and the space.",
  cta: { label: "Send an inquiry", href: "/kontakt" },
  image: photos.mace,
} as const;
