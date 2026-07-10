import { officialImages } from "@/data/site";
import type { ImageAsset } from "@/types";

export const homeIntro = {
  eyebrow: "ORGULJARSKI ZANAT",
  title: "Drvo, metal, zrak i glazba povezani u jedinstven instrument.",
  description:
    "Orgulje su istodobno glazbeni instrument, složen mehanički sustav i dio arhitekture prostora. Svaki zahvat zato zahtijeva individualan pristup, preciznost i razumijevanje cjeline.",
} as const;

export const homeServicesSection = {
  eyebrow: "NAŠE USLUGE",
  title: "Znanje u službi instrumenta",
  description:
    "Od izrade novih orgulja do zahvata na postojećim instrumentima, svakom projektu pristupamo prema njegovim stvarnim potrebama i prostoru kojemu pripada.",
} as const;

export const homeAbout = {
  eyebrow: "ORGULJARSTVO KVATERNIK",
  title: "Instrument promatramo kao cjelinu.",
  description:
    "Orguljarstvo Kvaternik bavi se gradnjom novih orgulja, servisom i restauracijom postojećih instrumenata. Rad obuhvaća klasične mehaničke sustave, digitalnu elektromagnetsku trakturu i pažljivo zvukovno oblikovanje instrumenta.",
  cta: { label: "Više o radionici", href: "/o-nama" },
  image: officialImages.construction,
} as const;

export type WorkArea = {
  number: string;
  title: string;
  description: string;
  image: ImageAsset;
  href: string;
};

export const homeWorkAreas: WorkArea[] = [
  {
    number: "01",
    title: "Nove orgulje",
    description:
      "Gradnja novih instrumenata prilagođenih prostoru, namjeni i zvukovnoj koncepciji.",
    image: officialImages.construction,
    href: "/usluge#izrada-novih-orgulja",
  },
  {
    number: "02",
    title: "Postojeći instrumenti",
    description:
      "Servis i restauracija uz pažljivo sagledavanje konstrukcije i sačuvanih elemenata.",
    image: officialImages.restoration,
    href: "/usluge#servis-orgulja",
  },
  {
    number: "03",
    title: "Traktura i mehanika",
    description:
      "Klasični mehanički sustavi i digitalna elektromagnetska traktura za nove i postojeće orgulje.",
    image: officialImages.service,
    href: "/usluge#digitalna-elektromagnetska-traktura",
  },
  {
    number: "04",
    title: "Intonacija i zvuk",
    description:
      "Zvukovno oblikovanje instrumenta kako bi se prirodno uklopio u prostor kojemu je namijenjen.",
    image: officialImages.service,
    href: "/usluge#intonacija",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const homeProcess = {
  eyebrow: "NAČIN RADA",
  title: "Od prvog razgovora do završne provjere",
  steps: [
    {
      number: "01",
      title: "Razgovor i početne informacije",
      description:
        "Upoznajemo instrument, prostor, potrebe korisnika i cilj predloženog zahvata.",
    },
    {
      number: "02",
      title: "Pregled instrumenta i prostora",
      description:
        "Sagledavamo postojeće stanje, konstrukciju instrumenta i uvjete prostora.",
    },
    {
      number: "03",
      title: "Prijedlog zahvata",
      description:
        "Na temelju pregleda oblikuje se jasan prijedlog potrebnih radova.",
    },
    {
      number: "04",
      title: "Izvedba i završna provjera",
      description:
        "Radovi se izvode prema dogovorenom opsegu, nakon čega slijedi provjera funkcionalnosti i zvuka.",
    },
  ] satisfies ProcessStep[],
} as const;

export const homeQuote = {
  text: "Glazba je dah prostora, a orgulje njegov glas.",
} as const;

export const homeContactCta = {
  title: "Razgovarajmo o Vašem instrumentu.",
  description:
    "Za novi projekt, servis ili restauraciju pošaljite osnovne informacije o instrumentu i prostoru.",
  cta: { label: "Pošaljite upit", href: "/kontakt" },
  image: officialImages.contactBackground,
} as const;
