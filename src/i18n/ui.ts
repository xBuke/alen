import type { Locale } from "@/i18n/config";

/** Tekstovi sučelja koji nisu dio sadržaja stranica. */
const hr = {
  skipLink: "Preskoči na sadržaj",
  newWindow: "(otvara se u novom prozoru)",
  homeLabel: "Početna",
  sendInquiry: "Pošaljite upit",
  nav: {
    main: [
      { label: "Početna", href: "/" },
      { label: "O nama", href: "/o-nama" },
      { label: "Orgulje", href: "/orgulje" },
      { label: "Polovne orgulje", href: "/polovne-orgulje" },
      { label: "Usluge", href: "/usluge" },
      { label: "Galerija", href: "/galerija" },
      { label: "Blog", href: "/blog" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    legal: [
      { label: "Pravila privatnosti", href: "/pravila-privatnosti" },
      { label: "Impressum", href: "/impressum" },
      { label: "Izjava o pristupačnosti", href: "/izjava-o-pristupacnosti" },
    ],
    mainAria: "Glavna navigacija",
    mobileAria: "Mobilna navigacija",
    openMenu: "Otvori izbornik",
    menuTitle: "Navigacija",
    homeAria: "početna stranica",
    closeMenu: "Zatvori izbornik",
    breadcrumbAria: "Navigacijski put",
  },
  language: {
    label: "Jezik",
    switchTo: "Switch to English",
    code: "EN",
    full: "English",
    current: "HR",
    currentFull: "hrvatski (trenutačni jezik)",
  },
  footer: {
    statement: "Orgulje koje stvaraju dušu prostora.",
    description:
      "Gradnja novih orgulja, servis i restauracija postojećih instrumenata, digitalna elektromagnetska traktura i intonacija prilagođena prostoru.",
    navigation: "Navigacija",
    services: "Usluge",
    contact: "Kontakt",
    quickLinks: [
      { label: "O nama", href: "/o-nama" },
      { label: "Usluge", href: "/usluge" },
      { label: "Galerija", href: "/galerija" },
      { label: "Blog", href: "/blog" },
      { label: "Polovne orgulje", href: "/polovne-orgulje" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    rights: "Sva prava pridržana.",
    madeBy: "Izrada web-stranice i dizajn",
    designRights: "Dizajn i kod ©",
  },
  logoLocation: "Draganovec",
  notFound: {
    title: "Stranica nije pronađena",
    metaDescription:
      "Tražena stranica ne postoji ili još nije objavljena na web-stranici Orguljarstva Kvaternik.",
    description: "Tražena stranica ne postoji ili još nije objavljena.",
    backHome: "Povratak na početnu",
    contact: "Kontakt",
    services: "Usluge",
  },
  blog: {
    readArticle: "Pročitajte članak",
    minRead: "min čitanja",
    min: "min",
    sources: "Izvori",
    readAlso: "Pročitajte i ovo",
    blog: "Blog",
    allPosts: "Svi članci",
  },
  home: {
    blogEyebrow: "BLOG",
    blogTitle: "Od crkvenog kora do brda na kojem svira vjetar.",
    blogDescription:
      "Pišemo o tome kako orgulje rade, kako ih čuvati i o projektima poput vjetroorgulja na Trovru iznad Rogotina.",
    workAreasTitle: "Područja našeg rada",
    usedEyebrow: "PONUDA",
    usedTitle: "Polovne orgulje",
    usedDescription:
      "Informacije o dostupnim polovnim orguljama možete zatražiti putem kontaktne forme.",
    moreAboutAlen: "Više o Alenu",
    prospectTouch: "Dotaknite svirale i zasvirajte",
    prospectMouse: "Prijeđite mišem i zasvirajte",
    prospectGroup:
      "Svirale orgulja: odaberite sviralu strelicama lijevo i desno, a zasvirajte tipkom Enter ili razmaknicom",
    prospectPipe: "Svirala",
    prospectOf: "od",
  },
  usedOrgans: {
    metaTitle: "Polovne orgulje",
    metaDescription:
      "Pregled polovnih orgulja dostupnih za upit putem Orguljarstva Kvaternik.",
    eyebrow: "PONUDA",
    title: "Polovne orgulje",
    emptyTitle: "Ponuda polovnih orgulja uskoro će biti objavljena.",
    emptyDescription:
      "Za informacije o trenutačno dostupnim instrumentima obratite nam se putem kontaktne forme.",
  },
  gallery: {
    metaTitle: "Galerija",
    metaDescription:
      "Fotografska dokumentacija orgulja i projekata Orguljarstva Kvaternik, organizirana u albume po lokacijama.",
    eyebrow: "GALERIJA",
    title: "Instrumenti i prostori u fotografijama.",
    description:
      "Odabrani albumi fotografske dokumentacije po lokacijama. Za detalje o pojedinim zahvatima stojimo na raspolaganju putem kontaktne forme.",
    breadcrumb: "Galerija",
    beforeAfterEyebrow: "PRIJE I POSLIJE",
    beforeAfterTitle: "Što restauracija znači u praksi.",
    beforeAfterDescription:
      "Isti dijelovi instrumenta kako smo ih zatekli i kako su izgledali kad su se vratili u orgulje.",
    allAlbums: "Svi albumi",
    albumsHeading: "Albumi",
    filterAria: "Filtriraj galeriju po albumu",
    openAlbum: "Otvori album",
    openPhoto: "Otvori fotografiju",
    noPhotos: "Nema fotografija u odabranom albumu.",
    showMore: "Prikaži još",
    closeGallery: "Zatvori galeriju",
    previousPhoto: "Prethodna fotografija",
    nextPhoto: "Sljedeća fotografija",
    photoOne: "fotografija",
    photoFew: "fotografije",
    photoMany: "fotografija",
    before: "Prije",
    after: "Poslije",
    both: "Novo i staro",
  },
  blogPage: {
    metaTitle: "Blog",
    metaDescription:
      "Članci o orguljama iz radionice Orguljarstva Kvaternik: kako orgulje rade, restauracija, traktura, održavanje i vjetroorgulje na Trovru.",
    eyebrow: "BLOG",
    title: "O orguljama, iz radionice.",
    description:
      "Kako orgulje rade, kako ih čuvati i što smo naučili na instrumentima koje smo gradili i obnavljali.",
    breadcrumb: "Blog",
  },
  organs: {
    partsAria: "Dijelovi orgulja",
    pauseAnimation: "Zaustavi animaciju",
    playAnimation: "Pokreni animaciju",
    diagramTitle:
      "Pojednostavljeni presjek orgulja: kućište, svirale, zračnica, zračni sustav, traktura i sviraonik",
  },
  contact: {
    direct: "Izravni kontakt",
    phone: "Telefon",
    email: "E-pošta",
    sendTitle: "Pošaljite upit",
    sendIntro:
      "Ispunite nekoliko polja i pošaljite nam upit. Javljamo se u najkraćem mogućem roku.",
    loadingForm: "Učitavanje obrasca…",
  },
  legal: {
    reviewBadge: "Potreban pravni pregled prije produkcijske objave",
    toc: "Sadržaj",
    tocAria: "Sadržaj pravila privatnosti",
    controller: "Voditelj obrade",
    email: "E-pošta",
    phone: "Telefon",
    rightsOutro: "Za ostvarivanje prava možete nam se obratiti na",
    lastChange: "Zadnja izmjena",
    companyData: "Podatci o društvu",
  },
  a11y: {
    open: "Izbornik pristupačnosti",
    title: "Pristupačnost",
    description: "Prilagodite prikaz stranice. Postavke se pamte u ovom pregledniku.",
    close: "Zatvori izbornik pristupačnosti",
    textSize: "Veličina teksta",
    textSizeHelp: "Povećava sav tekst na stranici.",
    smaller: "Smanji tekst",
    larger: "Povećaj tekst",
    reset: "Vrati zadano",
    statement: "Izjava o pristupačnosti",
    options: {
      contrast: {
        label: "Pojačani kontrast",
        help: "Svjetliji tekst i jasniji rubovi.",
      },
      underlineLinks: {
        label: "Podcrtaj poveznice",
        help: "Sve poveznice su podcrtane i lakše se uočavaju.",
      },
      readableFont: {
        label: "Čitljivije pismo",
        help: "Jednostavno pismo bez serifa i za naslove.",
      },
      spacing: {
        label: "Veći razmaci",
        help: "Više prostora između redaka, riječi i slova.",
      },
      noMotion: {
        label: "Zaustavi animacije",
        help: "Isključuje pokrete i prijelaze na stranici.",
      },
      bigCursor: {
        label: "Veliki pokazivač",
        help: "Veći pokazivač miša.",
      },
      focusHighlight: {
        label: "Istakni fokus",
        help: "Jasan okvir oko elementa na kojem je tipkovnica.",
      },
    },
  },
  form: {
    fullName: "Ime i prezime",
    email: "E-pošta",
    phone: "Telefon",
    contactHint: "Dovoljno je ostaviti e-poštu ili telefon.",
    inquiryType: "Vrsta upita",
    inquiryPlaceholder: "Odaberite vrstu upita",
    instrumentLocation: "Lokacija instrumenta",
    instrumentLocationHelp: "Mjesto, župa, crkva ili drugi prostor, ako je poznato.",
    message: "Poruka",
    messageHelp:
      "Opišite instrument, trenutačno stanje i vrstu zahvata koja Vas zanima.",
    requiredNote: "Polja označena zvjezdicom (*) su obavezna.",
    optional: "(neobavezno)",
    messageNearLimit: "Približavate se maksimalnoj duljini poruke.",
    submit: "Pošaljite upit",
    submitting: "Slanje…",
    sendWhatsapp: "Pošaljite na WhatsApp",
    sendWhatsappNote: "(otvara WhatsApp u novom prozoru)",
    howItWorks:
      "Upit stiže izravno Orguljarstvu Kvaternik i odgovaramo na Vašu e-poštu ili telefon. Ako Vam je draže, isti upit možete poslati i na WhatsApp.",
    howItWorksMailto:
      "Upit se automatski složi u poruku i otvori u Vašoj aplikaciji za e-poštu ili na WhatsAppu, pa ga samo pošaljete.",
    privacyBefore: "Više o obradi podataka u",
    privacyLink: "Pravilima privatnosti",
    privacyAfter: ".",
    sentTitle: "Hvala, upit je poslan.",
    sentText: "Javit ćemo Vam se u najkraćem mogućem roku.",
    sendFailed: "Upit trenutačno nije moguće poslati.",
    sendFailedEmail: "Pošaljite ga e-poštom",
    sendFailedOr: "ili nazovite",
    okTitle: "Upit je spreman.",
    okEmail:
      "Otvorila Vam se e-pošta s gotovom porukom. Pregledajte je i pritisnite Pošalji.",
    okWhatsapp:
      "Otvorio Vam se WhatsApp s gotovom porukom. Pregledajte je i pritisnite Pošalji.",
    okRetry: "Nije se ništa otvorilo? Pokušajte ponovno",
    okFallback: "ili nam pišite izravno na",
    okNew: "Novi upit",
    msgHello: "Poštovani,",
    msgIntro: "šaljem upit putem web-stranice.",
    msgSubject: "Upit",
    msgBye: "Lijep pozdrav,",
    checkData: "Provjerite unesene podatke.",
  },
} as const;

type DeepString<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DeepString<U>[]
    : { [K in keyof T]: DeepString<T[K]> };

export type UiStrings = DeepString<typeof hr>;

const en: UiStrings = {
  skipLink: "Skip to content",
  newWindow: "(opens in a new window)",
  homeLabel: "Home",
  sendInquiry: "Send an inquiry",
  nav: {
    main: [
      { label: "Home", href: "/" },
      { label: "About", href: "/o-nama" },
      { label: "Organs", href: "/orgulje" },
      { label: "Used organs", href: "/polovne-orgulje" },
      { label: "Services", href: "/usluge" },
      { label: "Gallery", href: "/galerija" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/kontakt" },
    ],
    legal: [
      { label: "Privacy policy", href: "/pravila-privatnosti" },
      { label: "Imprint", href: "/impressum" },
      { label: "Accessibility statement", href: "/izjava-o-pristupacnosti" },
    ],
    mainAria: "Main navigation",
    mobileAria: "Mobile navigation",
    openMenu: "Open menu",
    menuTitle: "Navigation",
    homeAria: "home page",
    closeMenu: "Close menu",
    breadcrumbAria: "Breadcrumb",
  },
  language: {
    label: "Language",
    switchTo: "Prebaci na hrvatski",
    code: "HR",
    full: "Hrvatski",
    current: "EN",
    currentFull: "English (current language)",
  },
  footer: {
    statement: "Organs that give a space its soul.",
    description:
      "Building new organs, servicing and restoring existing instruments, digital electromagnetic action and voicing tailored to the space.",
    navigation: "Navigation",
    services: "Services",
    contact: "Contact",
    quickLinks: [
      { label: "About", href: "/o-nama" },
      { label: "Services", href: "/usluge" },
      { label: "Gallery", href: "/galerija" },
      { label: "Blog", href: "/blog" },
      { label: "Used organs", href: "/polovne-orgulje" },
      { label: "Contact", href: "/kontakt" },
    ],
    rights: "All rights reserved.",
    madeBy: "Website development and design",
    designRights: "Design and code ©",
  },
  logoLocation: "Draganovec",
  notFound: {
    title: "Page not found",
    metaDescription:
      "The page you are looking for does not exist or has not been published yet on the Orguljarstvo Kvaternik website.",
    description:
      "The page you are looking for does not exist or has not been published yet.",
    backHome: "Back to home",
    contact: "Contact",
    services: "Services",
  },
  blog: {
    readArticle: "Read the article",
    minRead: "min read",
    min: "min",
    sources: "Sources",
    readAlso: "Read next",
    blog: "Blog",
    allPosts: "All articles",
  },
  home: {
    blogEyebrow: "BLOG",
    blogTitle: "From the church choir loft to a hill where the wind plays.",
    blogDescription:
      "We write about how organs work, how to care for them, and about projects such as the wind organ on Trovro above Rogotin.",
    workAreasTitle: "Our areas of work",
    usedEyebrow: "OFFER",
    usedTitle: "Used organs",
    usedDescription:
      "You can request information about available used organs through the contact form.",
    moreAboutAlen: "More about Alen",
    prospectTouch: "Touch the pipes and play",
    prospectMouse: "Move your mouse over the pipes and play",
    prospectGroup:
      "Organ pipes: choose a pipe with the left and right arrow keys and play it with Enter or Space",
    prospectPipe: "Pipe",
    prospectOf: "of",
  },
  usedOrgans: {
    metaTitle: "Used organs",
    metaDescription:
      "Overview of used organs available on request through Orguljarstvo Kvaternik.",
    eyebrow: "OFFER",
    title: "Used organs",
    emptyTitle: "The selection of used organs will be published soon.",
    emptyDescription:
      "For information about currently available instruments, please get in touch through the contact form.",
  },
  gallery: {
    metaTitle: "Gallery",
    metaDescription:
      "Photographic documentation of organs and projects by Orguljarstvo Kvaternik, organised into albums by location.",
    eyebrow: "GALLERY",
    title: "Instruments and spaces in photographs.",
    description:
      "Selected albums of photographic documentation by location. For details about individual projects, get in touch through the contact form.",
    breadcrumb: "Gallery",
    beforeAfterEyebrow: "BEFORE AND AFTER",
    beforeAfterTitle: "What restoration means in practice.",
    beforeAfterDescription:
      "The same parts of an instrument as we found them and as they looked when they went back into the organ.",
    allAlbums: "All albums",
    albumsHeading: "Albums",
    filterAria: "Filter the gallery by album",
    openAlbum: "Open album",
    openPhoto: "Open photo",
    noPhotos: "There are no photos in the selected album.",
    showMore: "Show more",
    closeGallery: "Close gallery",
    previousPhoto: "Previous photo",
    nextPhoto: "Next photo",
    photoOne: "photo",
    photoFew: "photos",
    photoMany: "photos",
    before: "Before",
    after: "After",
    both: "New and old",
  },
  blogPage: {
    metaTitle: "Blog",
    metaDescription:
      "Articles about organs from the Orguljarstvo Kvaternik workshop: how organs work, restoration, action, maintenance and the wind organ on Trovro.",
    eyebrow: "BLOG",
    title: "About organs, from the workshop.",
    description:
      "How organs work, how to look after them, and what we have learned on the instruments we have built and restored.",
    breadcrumb: "Blog",
  },
  organs: {
    partsAria: "Parts of the organ",
    pauseAnimation: "Pause animation",
    playAnimation: "Play animation",
    diagramTitle:
      "Simplified cross-section of an organ: case, pipes, wind chest, wind system, action and console",
  },
  contact: {
    direct: "Direct contact",
    phone: "Phone",
    email: "E-mail",
    sendTitle: "Send an inquiry",
    sendIntro:
      "Fill in a few fields and send us your inquiry. We will get back to you as soon as possible.",
    loadingForm: "Loading form…",
  },
  legal: {
    reviewBadge: "Legal review required before production release",
    toc: "Contents",
    tocAria: "Privacy policy contents",
    controller: "Data controller",
    email: "E-mail",
    phone: "Phone",
    rightsOutro: "To exercise your rights, you can contact us at",
    lastChange: "Last updated",
    companyData: "Company details",
  },
  a11y: {
    open: "Accessibility menu",
    title: "Accessibility",
    description: "Adjust how the site is displayed. Your settings are kept in this browser.",
    close: "Close accessibility menu",
    textSize: "Text size",
    textSizeHelp: "Makes all text on the site larger.",
    smaller: "Smaller text",
    larger: "Larger text",
    reset: "Reset to default",
    statement: "Accessibility statement",
    options: {
      contrast: {
        label: "Higher contrast",
        help: "Brighter text and clearer borders.",
      },
      underlineLinks: {
        label: "Underline links",
        help: "All links are underlined and easier to spot.",
      },
      readableFont: {
        label: "More readable font",
        help: "A simple sans-serif font, headings included.",
      },
      spacing: {
        label: "More spacing",
        help: "More space between lines, words and letters.",
      },
      noMotion: {
        label: "Stop animations",
        help: "Turns off movement and transitions on the site.",
      },
      bigCursor: {
        label: "Large cursor",
        help: "A bigger mouse pointer.",
      },
      focusHighlight: {
        label: "Highlight focus",
        help: "A clear outline around the element the keyboard is on.",
      },
    },
  },
  form: {
    fullName: "Full name",
    email: "E-mail",
    phone: "Phone",
    contactHint: "An e-mail address or a phone number is enough.",
    inquiryType: "Type of inquiry",
    inquiryPlaceholder: "Select the type of inquiry",
    instrumentLocation: "Location of the instrument",
    instrumentLocationHelp: "Town, parish, church or other space, if known.",
    message: "Message",
    messageHelp:
      "Describe the instrument, its current condition and the type of work you are interested in.",
    requiredNote: "Fields marked with an asterisk (*) are required.",
    optional: "(optional)",
    messageNearLimit: "You are approaching the maximum message length.",
    submit: "Send inquiry",
    submitting: "Sending…",
    sendWhatsapp: "Send via WhatsApp",
    sendWhatsappNote: "(opens WhatsApp in a new window)",
    howItWorks:
      "Your inquiry goes straight to Orguljarstvo Kvaternik and we reply to your e-mail or phone. If you prefer, you can send the same inquiry via WhatsApp.",
    howItWorksMailto:
      "Your inquiry is put together into a ready message that opens in your e-mail app or in WhatsApp, so all you have to do is send it.",
    privacyBefore: "More about data processing in the",
    privacyLink: "Privacy policy",
    privacyAfter: ".",
    sentTitle: "Thank you, your inquiry has been sent.",
    sentText: "We will get back to you as soon as possible.",
    sendFailed: "We could not send your inquiry right now.",
    sendFailedEmail: "Send it by e-mail",
    sendFailedOr: "or call",
    okTitle: "Your inquiry is ready.",
    okEmail:
      "Your e-mail app has opened with the message ready. Check it and press Send.",
    okWhatsapp:
      "WhatsApp has opened with the message ready. Check it and press Send.",
    okRetry: "Nothing opened? Try again",
    okFallback: "or write to us directly at",
    okNew: "New inquiry",
    msgHello: "Hello,",
    msgIntro: "I am sending an inquiry through your website.",
    msgSubject: "Inquiry",
    msgBye: "Kind regards,",
    checkData: "Please check the data you entered.",
  },
};

export const ui: Record<Locale, UiStrings> = { hr, en };

export function getUi(locale: Locale): UiStrings {
  return ui[locale];
}
