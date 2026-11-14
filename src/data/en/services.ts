import { photosEn as photos } from "@/data/en/photos";
import type { Service } from "@/types";

export const servicesPageEn = {
  metadata: {
    title: "Services",
    description:
      "Building new organs, servicing, restoration, digital electromagnetic action and voicing of instruments.",
  },
  hero: {
    eyebrow: "OUR SERVICES",
    title: "From the first idea to the function and sound of the instrument.",
    description:
      "The scope of work is determined by the instrument, the space and the goal of the project.",
    breadcrumbLabel: "Services",
  },
} as const;

/** Slug ostaje hrvatski (ključ); sidra se prevode pri renderu. */
export const servicesEn: Service[] = [
  {
    slug: "izrada-novih-orgulja",
    title: "Building new organs",
    description:
      "We build new organs with classical mechanical action, adapted to the space, its purpose and the tonal concept of the instrument.",
    verifiedFromOfficialSite: true,
    image: photos.drnje,
    pageDetail: {
      additionalText:
        "Every new instrument must combine technical reliability, musical purpose and a relationship with the architecture of the space.",
      cta: { label: "Send an inquiry about a new instrument", href: "/kontakt" },
    },
  },
  {
    slug: "servis-orgulja",
    title: "Service",
    description:
      "Inspections, regulation, repairs and the work needed for an existing instrument to run reliably.",
    verifiedFromOfficialSite: false,
    needsCopyConfirmation: true,
    image: photos.ploceSvirale,
    pageDetail: {
      note: "The exact scope of work is determined by the condition of the specific instrument.",
      cta: { label: "Arrange an initial conversation", href: "/kontakt" },
    },
  },
  {
    slug: "restauracija",
    title: "Restoration",
    description:
      "Work on existing instruments with careful attention to their construction, sound and surviving elements.",
    verifiedFromOfficialSite: true,
    needsCopyConfirmation: true,
    image: photos.mijehPoslije,
    pageDetail: {
      additionalText:
        "The proposal for the work is drawn up according to the condition of the instrument and the goal of the project.",
      cta: { label: "Send information about the instrument", href: "/kontakt" },
    },
  },
  {
    slug: "digitalna-elektromagnetska-traktura",
    title: "Digital electromagnetic action",
    description:
      "We install digital electromagnetic action in new and existing organs.",
    verifiedFromOfficialSite: true,
    image: photos.zeelinaWiring,
    pageDetail: {
      additionalText:
        "The action carries the movement from the console to the parts of the instrument, connecting the keys with the valves beneath the pipes.",
      cta: { label: "Let's talk about the technical solution", href: "/kontakt" },
    },
  },
  {
    slug: "intonacija",
    title: "Voicing",
    description:
      "We pay particular attention to voicing so that the instrument blends as naturally as possible, in sound, into the space it is intended for.",
    verifiedFromOfficialSite: true,
    image: photos.zeelinaPipes,
    pageDetail: {
      additionalText:
        "The acoustics and purpose of the space are an important part of deciding on the tonal character of the instrument.",
      cta: { label: "Send an inquiry", href: "/kontakt" },
    },
  },
];
