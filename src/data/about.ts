import { officialImages } from "@/data/site";
import { services } from "@/data/services";
import type { ProcessStep } from "@/data/home";

export const aboutPage = {
  metadata: {
    title: "O nama",
    description:
      "Upoznajte pristup radu Orguljarstva Kvaternik — gradnju novih orgulja, servis, restauraciju, trakturu i intonaciju instrumenata.",
  },
  hero: {
    eyebrow: "ORGULJARSTVO KVATERNIK",
    title:
      "Poštovanje instrumenta. Preciznost izvedbe. Odgovornost prema zvuku.",
    description:
      "Orguljarstvo povezuje glazbu, mehaniku, materijale, arhitekturu i prostor u jedinstvenu cjelinu.",
    image: officialImages.construction,
    breadcrumbLabel: "O nama",
  },
  workshop: {
    eyebrow: "O RADIONICI",
    title: "Instrument promatramo kao cjelinu.",
    paragraphs: [
      "Orgulje nisu zbir odvojenih dijelova. Njihov zvuk i pouzdanost ovise o međusobnom odnosu cijevi, zračnog sustava, mehanike, sviraonika, kućišta i akustike prostora.",
      "Zato svakom instrumentu pristupamo individualno. Prije prijedloga radova potrebno je razumjeti njegovo stanje, konstrukciju, promjene koje je tijekom vremena doživio i ulogu koju danas treba imati.",
      "Cilj nije samo riješiti pojedini tehnički problem, nego pronaći rješenje koje je funkcionalno, smisleno i primjereno instrumentu.",
    ],
  },
  workAreas: {
    eyebrow: "PODRUČJA RADA",
    title: "Potvrđena područja rada",
    items: services.map((service, index) => ({
      number: String(index + 1).padStart(2, "0"),
      title: service.title,
      description: service.description,
      href: `/usluge#${service.slug}`,
    })),
  },
  values: {
    eyebrow: "VRIJEDNOSTI",
    title: "Vrijednosti rada",
    items: [
      {
        title: "Individualan pristup",
        description:
          "Svaki instrument i svaki prostor zahtijevaju vlastitu analizu i vlastito rješenje.",
      },
      {
        title: "Preciznost",
        description:
          "Pouzdanost instrumenta ovisi o pažljivoj izvedbi i međusobnom odnosu njegovih dijelova.",
      },
      {
        title: "Odnos prema prostoru",
        description:
          "Zvuk orgulja mora biti promišljen u odnosu na akustiku i namjenu prostora.",
      },
      {
        title: "Dugoročna funkcionalnost",
        description:
          "Predloženi zahvati trebaju imati smisla za daljnju uporabu i održavanje instrumenta.",
      },
    ],
  },
  profile: {
    eyebrow: "OSOBA IZA RADIONICE",
    title: "Alen Kvaternik",
    role: "Orguljarstvo Kvaternik",
    paragraphs: [
      "Alen Kvaternik stoji iza Orguljarstva Kvaternik i kontakta za nove projekte, servis i restauraciju orgulja.",
      "U radu je naglasak na razumijevanju instrumenta kao cjeline, preciznoj izvedbi i usklađivanju tehničkog rješenja sa zvukom i prostorom.",
    ],
    image: officialImages.service,
  },
  process: {
    eyebrow: "NAČIN RADA",
    title: "Način rada",
    steps: [
      {
        number: "01",
        title: "Početne informacije",
        description:
          "Razgovor o instrumentu, prostoru, potrebama i cilju mogućeg zahvata.",
      },
      {
        number: "02",
        title: "Pregled",
        description:
          "Sagledavanje zatečenog stanja i relevantnih dijelova instrumenta.",
      },
      {
        number: "03",
        title: "Prijedlog",
        description:
          "Oblikovanje prijedloga radova primjerenog konkretnom instrumentu.",
      },
      {
        number: "04",
        title: "Izvedba i provjera",
        description:
          "Izvođenje dogovorenih radova i završna provjera funkcionalnosti i zvuka.",
      },
    ] satisfies ProcessStep[],
  },
} as const;
