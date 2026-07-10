import { officialImages } from "@/data/site";

export const organsPage = {
  metadata: {
    title: "Orgulje",
    description:
      "Upoznajte orgulje kao spoj cijevi, zraka, mehanike, sviraonika, intonacije i arhitekture prostora.",
  },
  hero: {
    eyebrow: "INSTRUMENT I PROSTOR",
    title: "Zvuk, konstrukcija i arhitektura povezani u cjelinu.",
    description:
      "Svaki instrument ima vlastiti karakter koji oblikuju materijali, konstrukcija, mehanika, intonacija i prostor u kojem se nalazi.",
    image: officialImages.hero,
    breadcrumbLabel: "Orgulje",
  },
  instrumentWhole: {
    title: "Složeni instrument iza vidljivog pročelja",
    paragraphs: [
      "Orgulje proizvode zvuk prolaskom zraka kroz cijevi različitih oblika, dimenzija i materijala. Orguljaš instrumentom upravlja putem sviraonika, manuala, pedala i registara.",
      "Iza pročelja nalazi se sustav čiji dijelovi moraju djelovati povezano i pouzdano. Zbog toga se pojedini zahvat uvijek treba sagledati u odnosu na cjelinu instrumenta.",
    ],
    image: officialImages.construction,
  },
  anatomy: {
    title: "Anatomija orgulja",
    parts: [
      {
        id: "facade",
        label: "Pročelje i kućište",
        description:
          "Vanjski oblik instrumenta koji oblikuje vizualni odnos prema prostoru i sadrži glavne dijelove vidljive iz crkve ili dvorane.",
      },
      {
        id: "pipes",
        label: "Cijevi",
        description:
          "Metalne ili drvene cijevi različitih dimenzija i oblika kroz koje zrak stvara zvuk instrumenta.",
      },
      {
        id: "console",
        label: "Sviraonik",
        description:
          "Mjesto s kojeg orguljaš upravlja instrumentom putem manuala, pedala i registara.",
      },
      {
        id: "keyboards",
        label: "Manuali i pedal",
        description:
          "Tipkovnice i pedal preko kojih se prenosi radnja sviraonika prema mehanici i trakturi.",
      },
      {
        id: "stops",
        label: "Registri",
        description:
          "Registri odabiru i kombiniraju glasove instrumenta, omogućujući različite zvučne karakteristike.",
      },
      {
        id: "wind",
        label: "Zračni sustav",
        description:
          "Sustav koji opskrbljuje instrument zrakom potrebnim za rad cijevi i stabilnost zvuka.",
      },
      {
        id: "action",
        label: "Traktura i mehanika",
        description:
          "Mehanički sustav koji prenosi radnju sa sviraonika prema ventilima i cijevima instrumenta.",
      },
    ],
  },
  newOrgans: {
    title: "Instrument oblikovan za konkretan prostor",
    paragraphs: [
      "Kod novog instrumenta polazi se od prostora, njegove akustike, arhitekture i glazbene namjene. Koncepcija povezuje zvukovnu sliku, mehaniku, izgled i praktične potrebe korisnika.",
    ],
    highlight:
      "Gradnja novih orgulja s klasičnom mehaničkom trakturom.",
    image: officialImages.construction,
  },
  existingInstruments: {
    title: "Razumjeti postojeće stanje prije zahvata",
    paragraphs: [
      "Postojeći instrument može sadržavati dijelove, popravke i preinake iz različitih razdoblja. Prije prijedloga većeg zahvata potrebno je sagledati što je sačuvano, što je mijenjano i koje probleme treba riješiti.",
    ],
    image: officialImages.restoration,
  },
  tracture: {
    title: "Veza između sviraonika i instrumenta",
    confirmed:
      "U nove i postojeće orgulje ugrađujemo digitalnu elektromagnetsku trakturu.",
    explanation:
      "Traktura prenosi radnju sa sviraonika prema dijelovima instrumenta, povezujući sviraonik s mehanikom i cijevima.",
    image: officialImages.service,
  },
  intonation: {
    title: "Zvuk usklađen s prostorom",
    confirmed:
      "Posebnu pozornost posvećujemo intonaciji kako bi se instrument zvukovno što prirodnije uklopio u prostor kojemu je namijenjen.",
    image: officialImages.service,
  },
} as const;
