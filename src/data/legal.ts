// TODO: Potvrditi pravni temelj, konkretne rokove čuvanja, Resend/hosting prijenose i potpune podatke društva prije produkcijske objave.

export const LEGAL_REVIEW_REQUIRED = true;

export const privacyPolicy = {
  metadata: {
    title: "Pravila privatnosti",
    description:
      "Informacije o obradi osobnih podataka putem web-stranice i kontaktne forme Orguljarstva Kvaternik.",
    canonical: "/pravila-privatnosti",
  },
  lastUpdated: "10. srpnja 2026.",
  breadcrumbLabel: "Pravila privatnosti",
  sections: [
    {
      id: "voditelj-obrade",
      title: "Voditelj obrade",
    },
    {
      id: "prikupljeni-podatci",
      title: "Koje podatke prikupljamo",
      intro:
        "Putem kontaktne forme mogu se prikupljati sljedeći podatci:",
      bullets: [
        "ime i prezime",
        "e-pošta",
        "telefon, ako je unesen",
        "vrsta upita",
        "lokacija instrumenta, ako je unesena",
        "sadržaj poruke",
        "osnovni tehnički podatci potrebni za sigurnost i sprečavanje zlouporabe",
      ],
    },
    {
      id: "svrha-obrade",
      title: "Svrha obrade",
      intro: "Osobni podatci obrađuju se radi:",
      bullets: [
        "odgovora na poslani upit",
        "početne poslovne komunikacije",
        "procjene vrste traženog zahvata",
        "zaštite kontaktne forme od zlouporabe",
      ],
    },
    {
      id: "pravni-temelj",
      title: "Pravni temelj",
      content: [
        "Podatci poslani putem kontaktne forme obrađuju se radi odgovora na Vaš upit i poduzimanja radnji na Vaš zahtjev prije mogućeg sklapanja poslovnog odnosa. Za sigurnost obrasca i sprečavanje zlouporabe može se primjenjivati legitimni interes voditelja obrade.",
      ],
      // TODO: Pravna osoba mora potvrditi konačnu formulaciju pravnog temelja.
    },
    {
      id: "primatelji",
      title: "Primatelji i izvršitelji obrade",
      intro:
        "Vašim podatcima mogu pristupati ili ih obrađivati:",
      bullets: [
        "ovlaštene osobe Orguljarstva Kvaternik",
        "pružatelj hostinga web-stranice",
        "Resend kao tehnički pružatelj slanja e-pošte",
        "drugi tehnički pružatelji samo ako su potrebni za rad i sigurnost stranice",
      ],
    },
    {
      id: "prijenosi",
      title: "Prijenosi izvan EGP-a",
      content: [
        "Pojedini tehnički pružatelji mogu obrađivati podatke izvan Europskoga gospodarskog prostora. U takvim slučajevima potrebno je osigurati odgovarajući pravni mehanizam zaštite podataka, poput standardnih ugovornih klauzula ili drugog važećeg mehanizma.",
      ],
      // TODO: Potvrditi stvarnu produkcijsku konfiguraciju Resenda i hostinga.
    },
    {
      id: "cuvanje",
      title: "Razdoblje čuvanja",
      content: [
        "Podatci iz upita čuvaju se onoliko dugo koliko je potrebno za odgovor, nastavak poslovne komunikacije, zaštitu pravnih interesa i ispunjavanje mogućih zakonskih obveza. Kada podatci više nisu potrebni za te svrhe, brišu se ili se njihova obrada ograničava.",
      ],
      // TODO: Alen ili pravna osoba trebaju potvrditi konkretan interni rok čuvanja.
    },
    {
      id: "prava",
      title: "Prava korisnika",
      intro:
        "Kada su primjenjiva, imate sljedeća prava:",
      bullets: [
        "pravo na pristup",
        "pravo na ispravak",
        "pravo na brisanje",
        "pravo na ograničenje obrade",
        "pravo na prigovor",
        "pravo na prenosivost kada su ispunjeni uvjeti",
        "pravo podnošenja pritužbe Agenciji za zaštitu osobnih podataka",
      ],
      outro:
        "Za ostvarivanje prava možete nam se obratiti na alen.kvaternik@gmail.com.",
    },
    {
      id: "automatizirano",
      title: "Automatizirano odlučivanje",
      content: [
        "Podatci poslani putem kontaktne forme ne koriste se za automatizirano donošenje odluka ni izradu profila.",
      ],
    },
    {
      id: "kolacici",
      title: "Kolačići i analitika",
      content: [
        "Web-stranica trenutačno ne koristi marketinške ni analitičke kolačiće koje postavlja samo Orguljarstvo Kvaternik. Ako se u budućnosti uvedu analitika ili druge neobavezne tehnologije, ova pravila i mehanizam privole bit će odgovarajuće ažurirani.",
      ],
    },
    {
      id: "izmjene",
      title: "Izmjene pravila",
      content: [
        "Pravila privatnosti mogu se povremeno ažurirati radi usklađenja sa stvarnom obradom podataka i promjenama na web-stranici.",
      ],
    },
  ],
} as const;

export const impressum = {
  metadata: {
    title: "Impressum",
    description:
      "Poslovni i kontaktni podatci društva ORGULJARSTVO KVATERNIK d.o.o.",
    canonical: "/impressum",
  },
  breadcrumbLabel: "Impressum",
  // TODO: Pravna provjera Impressuma i dopuna zakonski potrebnih registarskih podataka prije produkcijske objave.
  fields: [
    { label: "Pravni naziv", value: "ORGULJARSTVO KVATERNIK d.o.o." },
    { label: "Sjedište", value: "Rudarska ulica 1, 48000 Draganovec" },
    { label: "OIB", value: "76874004422" },
    { label: "Telefon", value: "098 777 988", href: "tel:+38598777988" },
    {
      label: "E-pošta",
      value: "alen.kvaternik@gmail.com",
      href: "mailto:alen.kvaternik@gmail.com",
    },
    {
      label: "Web",
      value: "orguljarstvo-kvaternik.hr",
      href: "https://orguljarstvo-kvaternik.hr",
    },
  ],
} as const;
