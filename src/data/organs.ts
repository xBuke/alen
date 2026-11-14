import { photos } from "@/data/photos";

export const organsPage = {
  metadata: {
    title: "Orgulje",
    description:
      "Upoznajte orgulje kao spoj svirala, zraka, mehanike, sviraonika, intonacije i arhitekture prostora.",
  },
  hero: {
    eyebrow: "INSTRUMENT I PROSTOR",
    title: "Zvuk, konstrukcija i arhitektura povezani u cjelinu.",
    description:
      "Svaki instrument ima vlastiti karakter koji oblikuju materijali, konstrukcija, mehanika, intonacija i prostor u kojem se nalazi.",
    image: photos.vukovina,
    breadcrumbLabel: "Orgulje",
  },
  instrumentWhole: {
    title: "Složeni instrument iza vidljivog pročelja",
    paragraphs: [
      "Orgulje proizvode zvuk prolaskom zraka kroz svirale različitih oblika, dimenzija i materijala. Orguljaš instrumentom upravlja putem sviraonika, manuala, pedala i registara.",
      "Iza pročelja nalazi se sustav čiji dijelovi moraju djelovati povezano i pouzdano. Zbog toga se pojedini zahvat uvijek treba sagledati u odnosu na cjelinu instrumenta.",
    ],
    image: photos.knezijaPipeRows,
  },
  anatomy: {
    title: "Anatomija orgulja",
    parts: [
      {
        id: "facade",
        label: "Kućište i pročelje",
        description:
          "Drveno kućište nosi i štiti instrument, a ujedno usmjerava zvuk prema prostoru. Prednja strana sa sviralama zove se pročelje ili prospekt i jedini je dio koji se vidi iz crkve.",
      },
      {
        id: "pipes",
        label: "Svirale",
        description:
          "Svaka svirala daje jedan ton. Dulja svirala zvuči dublje, kraća više. Izrađuju se od legure kositra i olova ili od drva, a niz svirala iste boje zvuka čini jedan registar.",
      },
      {
        id: "chest",
        label: "Zračnica",
        description:
          "Drvena kutija na kojoj stoje svirale. U njoj su ventili koji propuštaju zrak samo u svirale onog tona i onog registra koje je orguljaš odabrao.",
      },
      {
        id: "wind",
        label: "Motor, mijeh i kanali",
        description:
          "Električni ventilator daje zrak, mijeh ga sprema i drži pod stalnim tlakom, a kanali ga vode do zračnice. O mirnom tlaku ovisi miran ton.",
      },
      {
        id: "action",
        label: "Traktura",
        description:
          "Veza između tipke i ventila u zračnici. Kod mehaničke trakture to su tanke drvene letvice (apstrakti) i kutnici, a kod elektromagnetske električni kontakt i magnet.",
      },
      {
        id: "console",
        label: "Sviraonik",
        description:
          "Mjesto s kojeg orguljaš upravlja instrumentom. Može biti ugrađen u kućište ili stajati odvojeno od orgulja.",
      },
      {
        id: "keyboards",
        label: "Manuali i pedal",
        description:
          "Manuali su tipkovnice za ruke, a pedal tipkovnica za noge. Svaki manual upravlja svojim dijelom instrumenta.",
      },
      {
        id: "stops",
        label: "Registri",
        description:
          "Registarskim potezima orguljaš uključuje i isključuje nizove svirala i tako slaže boju i jačinu zvuka.",
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
    image: photos.stepinac,
  },
  existingInstruments: {
    title: "Razumjeti postojeće stanje prije zahvata",
    paragraphs: [
      "Postojeći instrument može sadržavati dijelove, popravke i preinake iz različitih razdoblja. Prije prijedloga većeg zahvata potrebno je sagledati što je sačuvano, što je mijenjano i koje probleme treba riješiti.",
    ],
    image: photos.donjaVisnjica,
  },
  tracture: {
    title: "Veza između sviraonika i instrumenta",
    confirmed:
      "U nove i postojeće orgulje ugrađujemo digitalnu elektromagnetsku trakturu.",
    explanation:
      "Traktura prenosi radnju sa sviraonika prema dijelovima instrumenta, povezujući tipke s ventilima ispod svirala.",
    image: photos.legradConsole,
  },
  intonation: {
    title: "Zvuk usklađen s prostorom",
    confirmed:
      "Posebnu pozornost posvećujemo intonaciji kako bi se instrument zvukovno što prirodnije uklopio u prostor kojemu je namijenjen.",
    image: photos.jeronimPipes,
  },
} as const;
