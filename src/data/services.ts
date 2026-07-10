import { officialImages } from "@/data/site";
import type { Service } from "@/types";

export const servicesPage = {
  metadata: {
    title: "Usluge",
    description:
      "Izrada novih orgulja, servis, restauracija, digitalna elektromagnetska traktura i intonacija instrumenata.",
  },
  hero: {
    eyebrow: "NAŠE USLUGE",
    title: "Od početne ideje do funkcionalnosti i zvuka instrumenta.",
    description:
      "Opseg rada određuje se prema instrumentu, prostoru i cilju projekta.",
    breadcrumbLabel: "Usluge",
  },
} as const;

export const services: Service[] = [
  {
    slug: "izrada-novih-orgulja",
    title: "Izrada novih orgulja",
    description:
      "Gradimo nove orgulje s klasičnom mehaničkom trakturom, prilagođene prostoru, namjeni i zvukovnoj koncepciji instrumenta.",
    verifiedFromOfficialSite: true,
    image: officialImages.construction,
    pageDetail: {
      additionalText:
        "Svaki novi instrument treba povezati tehničku pouzdanost, glazbenu namjenu i odnos s arhitekturom prostora.",
      cta: { label: "Pošaljite upit za novi instrument", href: "/kontakt" },
    },
  },
  {
    slug: "servis-orgulja",
    title: "Servis",
    description:
      "Pregledi, regulacija, popravci i radovi potrebni za pouzdan rad postojećeg instrumenta.",
    verifiedFromOfficialSite: false,
    // needsCopyConfirmation: detaljan opis servisa potvrditi s Alenom
    needsCopyConfirmation: true,
    image: officialImages.service,
    pageDetail: {
      note: "Točan opseg rada utvrđuje se prema stanju konkretnog instrumenta.",
      cta: { label: "Dogovorite početni razgovor", href: "/kontakt" },
    },
  },
  {
    slug: "restauracija",
    title: "Restauracija",
    description:
      "Radovi na postojećim instrumentima uz pažljivo sagledavanje njihove konstrukcije, zvuka i sačuvanih elemenata.",
    verifiedFromOfficialSite: true,
    needsCopyConfirmation: true,
    image: officialImages.restoration,
    pageDetail: {
      additionalText:
        "Prijedlog zahvata oblikuje se prema stanju instrumenta i cilju projekta.",
      cta: { label: "Pošaljite informacije o instrumentu", href: "/kontakt" },
    },
  },
  {
    slug: "digitalna-elektromagnetska-traktura",
    title: "Digitalna elektromagnetska traktura",
    description:
      "U nove i postojeće orgulje ugrađujemo digitalnu elektromagnetsku trakturu.",
    verifiedFromOfficialSite: true,
    image: officialImages.service,
    pageDetail: {
      additionalText:
        "Traktura prenosi radnju sa sviraonika prema dijelovima instrumenta, povezujući sviraonik s mehanikom i cijevima.",
      cta: { label: "Razgovarajmo o tehničkom rješenju", href: "/kontakt" },
    },
  },
  {
    slug: "intonacija",
    title: "Intonacija",
    description:
      "Posebnu pozornost posvećujemo intonaciji kako bi se instrument zvukovno što prirodnije uklopio u prostor kojemu je namijenjen.",
    verifiedFromOfficialSite: true,
    image: officialImages.construction,
    pageDetail: {
      additionalText:
        "Akustika i namjena prostora važan su dio promišljanja zvukovnog karaktera instrumenta.",
      cta: { label: "Pošaljite upit", href: "/kontakt" },
    },
  },
];
