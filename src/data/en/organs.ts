import { photosEn as photos } from "@/data/en/photos";

export const organsPageEn = {
  metadata: {
    title: "Organs",
    description:
      "Get to know the organ as a combination of pipes, air, action, console, voicing and the architecture of the space.",
  },
  hero: {
    eyebrow: "INSTRUMENT AND SPACE",
    title: "Sound, construction and architecture joined into a whole.",
    description:
      "Every instrument has its own character, shaped by its materials, construction, mechanics, voicing and the space it stands in.",
    image: photos.vukovina,
    breadcrumbLabel: "Organs",
  },
  instrumentWhole: {
    title: "A complex instrument behind the visible facade",
    paragraphs: [
      "An organ produces sound by passing air through pipes of different shapes, sizes and materials. The organist controls the instrument from the console, using manuals, pedals and stops.",
      "Behind the facade is a system whose parts must work together reliably. That is why any work must always be considered in relation to the whole instrument.",
    ],
    image: photos.knezijaPipeRows,
  },
  anatomy: {
    title: "Anatomy of an organ",
    parts: [
      {
        id: "facade",
        label: "Case and facade",
        description:
          "The wooden case carries and protects the instrument and also directs the sound into the space. The front with the pipes is called the facade, or prospect, and is the only part visible from the church.",
      },
      {
        id: "pipes",
        label: "Pipes",
        description:
          "Each pipe produces a single note. A longer pipe sounds lower, a shorter one higher. They are made of a tin and lead alloy or of wood, and a row of pipes with the same tone colour forms one stop.",
      },
      {
        id: "chest",
        label: "Wind chest",
        description:
          "A wooden box on which the pipes stand. It contains valves that let air into only those pipes of the note and the stop the organist has chosen.",
      },
      {
        id: "wind",
        label: "Blower, bellows and wind trunks",
        description:
          "An electric blower supplies the air, the bellows store it and keep it at a steady pressure, and the wind trunks carry it to the wind chest. A steady tone depends on steady pressure.",
      },
      {
        id: "action",
        label: "Action",
        description:
          "The link between a key and a valve in the wind chest. In mechanical action this is made of thin wooden strips (trackers) and rollerboard arms; in electromagnetic action it is an electrical contact and a magnet.",
      },
      {
        id: "console",
        label: "Console",
        description:
          "The place from which the organist controls the instrument. It can be built into the case or stand separately from the organ.",
      },
      {
        id: "keyboards",
        label: "Manuals and pedalboard",
        description:
          "Manuals are keyboards for the hands, the pedalboard a keyboard for the feet. Each manual controls its own part of the instrument.",
      },
      {
        id: "stops",
        label: "Stops",
        description:
          "With the stop knobs the organist switches rows of pipes on and off, and so shapes the tone colour and volume.",
      },
    ],
  },
  newOrgans: {
    title: "An instrument shaped for a specific space",
    paragraphs: [
      "With a new instrument, the starting point is the space, its acoustics, architecture and musical purpose. The concept brings together the sound, the mechanics, the appearance and the practical needs of the users.",
    ],
    highlight: "Building new organs with classical mechanical action.",
    image: photos.stepinac,
  },
  existingInstruments: {
    title: "Understanding the existing condition before any work",
    paragraphs: [
      "An existing instrument may contain parts, repairs and alterations from different periods. Before proposing major work, it is necessary to see what has survived, what has been changed and which problems need to be solved.",
    ],
    image: photos.donjaVisnjica,
  },
  tracture: {
    title: "The link between the console and the instrument",
    confirmed:
      "We install digital electromagnetic action in new and existing organs.",
    explanation:
      "The action carries the movement from the console to the parts of the instrument, connecting the keys with the valves beneath the pipes.",
    image: photos.legradConsole,
  },
  intonation: {
    title: "Sound matched to the space",
    confirmed:
      "We pay particular attention to voicing so that the instrument blends as naturally as possible, in sound, into the space it is intended for.",
    image: photos.jeronimPipes,
  },
} as const;
