import { photosEn as photos } from "@/data/en/photos";
import { alenPortraitEn } from "@/data/en/site";
import { servicesEn } from "@/data/en/services";

export const aboutPageEn = {
  metadata: {
    title: "About us",
    description:
      "Get to know the approach of Orguljarstvo Kvaternik: building new organs, servicing, restoration, action and voicing of instruments.",
  },
  hero: {
    eyebrow: "ORGULJARSTVO KVATERNIK",
    title: "Respect for the instrument. Precision in execution. Responsibility for the sound.",
    description:
      "Organ building brings together music, mechanics, materials, architecture and space into a single whole.",
    image: photos.jeronimProspect,
    breadcrumbLabel: "About us",
  },
  workshop: {
    eyebrow: "ABOUT THE WORKSHOP",
    title: "We see the instrument as a whole.",
    paragraphs: [
      "An organ is not a sum of separate parts. Its sound and reliability depend on the relationship between the pipes, the wind system, the action, the console, the case and the acoustics of the space.",
      "That is why we approach every instrument individually. Before proposing any work, we need to understand its condition, its construction, the changes it has undergone over time and the role it should play today.",
      "The goal is not only to solve a particular technical problem, but to find a solution that is functional, sensible and appropriate for the instrument.",
    ],
  },
  workAreas: {
    eyebrow: "AREAS OF WORK",
    title: "Our confirmed areas of work",
    items: servicesEn.map((service, index) => ({
      number: String(index + 1).padStart(2, "0"),
      title: service.title,
      description: service.description,
      href: `/usluge#${service.slug}`,
    })),
  },
  values: {
    eyebrow: "VALUES",
    title: "The values behind our work",
    items: [
      {
        title: "An individual approach",
        description:
          "Every instrument and every space calls for its own analysis and its own solution.",
      },
      {
        title: "Precision",
        description:
          "The reliability of an instrument depends on careful execution and on how its parts relate to each other.",
      },
      {
        title: "Relationship to the space",
        description:
          "The sound of an organ must be considered in relation to the acoustics and purpose of the space.",
      },
      {
        title: "Long-term function",
        description:
          "The proposed work should make sense for the continued use and maintenance of the instrument.",
      },
    ],
  },
  profile: {
    eyebrow: "ORGAN BUILDER",
    title: "Alen Kvaternik",
    role: "Orguljarstvo Kvaternik, Draganovec",
    paragraphs: [
      "Alen Kvaternik is an organ builder from Draganovec near Koprivnica. He has worked with organs since 2001, that is for 25 years, and today he runs the Orguljarstvo Kvaternik workshop.",
      "In the workshop he builds new organs with classical mechanical action, restores old instruments and installs digital electromagnetic action. He has worked on organs in parish churches, chapels and cathedrals across Croatia and in neighbouring countries.",
      "Alongside church organs, he has also worked on a very different instrument. The pipes for the wind organ on Trovro hill above Rogotin, the first and only of its kind in the world, were made in his workshop. The instrument was conceived by engineer Željko Škorić from Ploče.",
    ],
    image: alenPortraitEn,
    link: {
      label: "The story of the wind organ",
      href: "/blog/vjetroorgulje-na-trovru",
    },
  },
  process: {
    eyebrow: "HOW WE WORK",
    title: "How we work",
    steps: [
      {
        number: "01",
        title: "Initial information",
        description:
          "A conversation about the instrument, the space, the needs and the goal of the possible work.",
      },
      {
        number: "02",
        title: "Inspection",
        description:
          "Assessing the existing condition and the relevant parts of the instrument.",
      },
      {
        number: "03",
        title: "Proposal",
        description:
          "Drawing up a proposal of work suited to the specific instrument.",
      },
      {
        number: "04",
        title: "Execution and check",
        description:
          "Carrying out the agreed work and a final check of function and sound.",
      },
    ],
  },
} as const;
