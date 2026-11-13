import { alenPortrait, officialImages } from "@/data/site";
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
    image: officialImages.hero,
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
    eyebrow: "O MENI",
    title: "Alen Kvaternik",
    role: "Graditelj orgulja · Orguljarstvo Kvaternik",
    paragraphs: [
      "Zovem se Alen Kvaternik i gradim orgulje. Tim se poslom bavim od 2001. godine, a danas vodim Orguljarstvo Kvaternik u Draganovcu kraj Koprivnice.",
      "U radionici gradimo nove orgulje po klasičnom mehaničkom sustavu, obnavljamo stare instrumente i ugrađujemo digitalnu elektromagnetsku trakturu. Radili smo na orguljama u župnim crkvama, kapelama i katedralama diljem Hrvatske i u susjednim zemljama.",
      "Najviše volim trenutak na kraju posla, kad se instrument prvi put oglasi u prostoru za koji je građen. Tada se vidi je li sve prije toga, od mijeha do zadnje svirale, napravljeno kako treba.",
      "Osim crkvenih orgulja, radio sam i na jednom posve drukčijem instrumentu. U našoj su radionici izrađene svirale za vjetroorgulje na brdu Trovro iznad Rogotina, koje je zamislio inženjer Željko Škorić iz Ploča.",
    ],
    image: alenPortrait,
    link: {
      label: "Priča o vjetroorguljama",
      href: "/blog/vjetroorgulje-na-trovru",
    },
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
