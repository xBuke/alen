import type { ImageAsset } from "@/types";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; image: ImageAsset; caption?: string }
  | { type: "beforeAfter"; pairId: string };

export type BlogSource = { label: string; url: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO datum objave */
  date: string;
  category: string;
  readingMinutes: number;
  cover: ImageAsset;
  featured?: boolean;
  blocks: BlogBlock[];
  sources?: BlogSource[];
};

const img = (
  src: string,
  alt: string,
  width: number,
  height: number,
): ImageAsset => ({
  src,
  alt,
  width,
  height,
  status: "verified-original",
  temporary: false,
});

const ref = "/images/orguljarstvo/reference";
const pp = "/images/orguljarstvo/prije-poslije";

export const blogPosts: BlogPost[] = [
  {
    slug: "vjetroorgulje-na-trovru",
    title: "Vjetroorgulje na Trovru: instrument na kojem svira vjetar",
    excerpt:
      "Na brdu iznad Rogotina, kraj Ploča, stoje prve vjetroorgulje na svijetu. Sviraju ih bura, jugo i maestral, a svirale za njih nastale su u našoj radionici.",
    date: "2026-11-13",
    category: "Projekti",
    readingMinutes: 5,
    featured: true,
    cover: img(
      "/images/orguljarstvo/galerija/pula-sv-anton/01-p1310157.webp",
      "Velike metalne svirale snimljene izbliza",
      2400,
      1800,
    ),
    blocks: [
      {
        type: "p",
        text: "U više od dva desetljeća rada na orguljama gotovo je svaki posao imao isti okvir: crkva, kor, instrument i orguljaš. Onda je stigao poziv iz doline Neretve. Trebalo je napraviti svirale za orgulje koje neće stajati ni u jednoj crkvi i na kojima neće svirati čovjek, nego vjetar.",
      },
      { type: "h2", text: "Ideja Željka Škorića" },
      {
        type: "p",
        text: "Vjetroorgulje je zamislio Željko Škorić, građevinski inženjer iz Ploča. Ideju je nosio godinama. Od prve zamisli do trenutka kad su orgulje prvi put zasvirale prošlo je desetak godina, a lokalni portal Rogotin.hr sačuvao je i staru fotografiju na kojoj se, još davno prije gradilišta, penje na Trovro provjeriti može li se ondje uopće graditi.",
      },
      {
        type: "p",
        text: "Projekt je 2017. prijavljen u sklopu županijskog programa Promicanje održivog razvoja prirodne baštine doline Neretve, koji je većim dijelom financiran europskim novcem. Nositelj je bila Dubrovačko-neretvanska županija, a uz Grad Ploče u priču je bilo uključeno puno ljudi. Bez upornosti čovjeka koji je sve osmislio, ne bi bilo ničega.",
      },
      { type: "h2", text: "Gdje se nalaze" },
      {
        type: "p",
        text: "Trovro je brdo visoko 114 metara iznad Rogotina, malog mjesta između Ploča i Metkovića. S vrha se vidi ušće Neretve, delta, okolna brda i Pelješac. Do gore vodi oko 900 metara duga kamenom popločena staza, a uz orgulje su uređeni vidikovac i plato u suhozidu.",
      },
      { type: "h2", text: "Kako su građene" },
      {
        type: "list",
        items: [
          "Tri betonske konstrukcije, svaka duga 15,5 metara, okrenute su prema trima vjetrovima: buri, jugu i maestralu.",
          "U svakoj je sedam svirala, ukupno 21.",
          "Svirale su od nehrđajućeg čelika 316, koji podnosi sol i vremenske uvjete uz more.",
          "Svirale su zatvorene (poklopljene) i ugođene tako da sedam tonova zajedno daje ugodan sklad, a ne slučajnu buku.",
          "Zaklopke ograničavaju protok zraka da orgulje pri jakom vjetru ne zavijaju.",
        ],
      },
      {
        type: "p",
        text: "Betonske radove izvela je dubrovačka tvrtka Trag, a položaj je odabran uz podatke o vjetru na toj lokaciji. Glazbeni dio, dakle svirale, izrađen je u našoj radionici kraj Koprivnice. Na izradu je otišlo oko pola godine, a u travnju 2020. dopremili smo ih na gradilište i ugradili. U projektu je sudjelovao i slovenski graditelj orgulja Škrabl.",
      },
      { type: "h2", text: "Zašto je to drukčije od crkvenih orgulja" },
      {
        type: "p",
        text: "Načelo je isto kao kod svake svirale: što je dulja, ton je dublji, a što je kraća, ton je viši. Sve ostalo je drukčije. U crkvi mijeh daje miran i stalan tlak zraka, pa svirala svaki put progovori jednako. Na brdu tlak određuje vjetar, a on se mijenja iz sekunde u sekundu. Zato se ovdje ništa nije moglo prepisati iz postojećih instrumenata. Takav posao dotad nismo radili i u njega smo uložili sve što znamo o sviralama.",
      },
      {
        type: "p",
        text: "Prema HRT-ovu prilogu, orgulje se oglase već kad vjetar puše oko 2,7 metara u sekundi. Kako se smjer i jačina vjetra stalno mijenjaju, glazba se nikad ne ponavlja.",
      },
      { type: "h2", text: "Jedinstvene u svijetu" },
      {
        type: "p",
        text: "Inspiracija su bile zadarske Morske orgulje, na kojima svira more. Ovdje svira vjetar, i to na tri strane svijeta. Vjetroorgulje na Trovru prve su i jedinstvene u svijetu, a prikazane su i u međunarodnoj televizijskoj razmjeni. Nama je to projekt na koji smo posebno ponosni i drago nam je da na njemu stoji i naš potpis.",
      },
      {
        type: "p",
        text: "Ako vas put nanese u dolinu Neretve, popnite se na Trovro. Najbolje kad puše.",
      },
    ],
    sources: [
      {
        label: "Rogotin.hr: Vjetroorgulje na Trovru, ovako je počelo",
        url: "https://www.rogotin.hr/2021/04/01/vjetroorgulje-na-trovru-ovako-je-pocelo",
      },
      {
        label: "Rogotin.hr: Ugrađuje se prva tuba u vjetroorgulje u Rogotinu",
        url: "https://www.rogotin.hr/2020/04/06/ugraduje-se-prva-tuba-u-vjetro-orgulje-u-rogotinu/",
      },
      {
        label: "Rogotin.hr: Pri kraju izgradnja vjetroorgulja kraj Ploča (prilog HTV-a)",
        url: "https://www.rogotin.hr/2020/04/21/pri-kraju-izgradnja-vjetroorgulja-kraj-ploca-prilog-htv/",
      },
      {
        label: "Punkufer: Jedinstvena atrakcija kad nad Neretvom zasvira vjetar",
        url: "https://punkufer.dnevnik.hr/clanak/putovanja/vjetrorgulje-u-dolini-neretve---960543.html",
      },
      {
        label: "Croatia Week: Unique wind organ above Rogotin nears completion",
        url: "https://www.croatiaweek.com/video-unique-wind-organ-above-rogotin-nears-completion/",
      },
    ],
  },
  {
    slug: "kako-rade-orgulje",
    title: "Kako zapravo rade orgulje?",
    excerpt:
      "Tisuće svirala, jedan mijeh i mehanika koja sve to povezuje s prstima orguljaša. Kratak vodič kroz unutrašnjost kraljice instrumenata.",
    date: "2026-11-06",
    category: "O orguljama",
    readingMinutes: 5,
    cover: img(
      `${ref}/bistra.webp`,
      "Orgulje na oslikanom koru crkve",
      1200,
      1800,
    ),
    blocks: [
      {
        type: "p",
        text: "Kad stojite u crkvi i gledate prema koru, vidite samo prospekt: red sjajnih svirala u ukrašenom kućištu. Iza njega se krije instrument koji i u manjoj župnoj crkvi ima nekoliko stotina svirala, a u katedralama nekoliko tisuća. Evo što se događa od trenutka kad orguljaš pritisne tipku.",
      },
      { type: "h2", text: "Zrak: motor, mijeh i kanali" },
      {
        type: "p",
        text: "Orgulje su puhački instrument. Nekad je zrak nogama ili rukama pumpao pomoćnik, kalkant. Danas to radi tihi električni ventilator. Zrak iz njega ulazi u mijeh, koji ima jednu jedinu zadaću: držati tlak mirnim. Ako tlak pleše, pleše i ton. Iz mijeha zrak drvenim kanalima putuje do zračnica.",
      },
      {
        type: "image",
        image: img(
          `${pp}/mjeh-nakon-restauracije.webp`,
          "Obnovljeni mijeh orgulja u radionici",
          1350,
          1800,
        ),
        caption: "Mijeh nakon restauracije u našoj radionici.",
      },
      { type: "h2", text: "Zračnica: srce instrumenta" },
      {
        type: "p",
        text: "Zračnica je drvena kutija na kojoj stoje svirale. U njoj su ventili koji odlučuju koja će svirala dobiti zrak. Jedan sustav bira ton, odnosno tipku, a drugi registar, odnosno niz svirala iste boje zvuka. Svirala progovori tek kad su otvorena oba.",
      },
      { type: "h2", text: "Svirale: labijalne i jezične" },
      {
        type: "list",
        items: [
          "Labijalne svirale rade kao blok-flauta. Zrak udara u rub usne i zatitra stup zraka u cijevi. Takvih je u orguljama velika većina.",
          "Jezične svirale imaju metalni jezičac koji titra, slično klarinetu. Daju prodorne boje poput trube ili oboe.",
          "Svirale su od legure kositra i olova ili od drva. Materijal, širina i oblik određuju boju tona, a duljina visinu.",
        ],
      },
      {
        type: "p",
        text: "Oznake na registrima, poput 8′ ili 4′, govore o duljini najdublje svirale u stopama. Registar 8′ zvuči kako je napisano u notama, 4′ oktavu više, a 16′ oktavu niže.",
      },
      {
        type: "image",
        image: img(
          `${ref}/ploce-registri.webp`,
          "Registarski potezi na sviraoniku orgulja",
          1200,
          1800,
        ),
        caption: "Registarski potezi: svaki uključuje jedan niz svirala.",
      },
      { type: "h2", text: "Sviraonik i traktura" },
      {
        type: "p",
        text: "Sviraonik je radno mjesto orguljaša: jedan ili više manuala za ruke, pedal za noge i registarski potezi. Veza između tipke i ventila zove se traktura. Može biti mehanička, pneumatska ili električna, a o razlikama pišemo u zasebnom članku.",
      },
      { type: "h2", text: "Zašto su svake orgulje drukčije" },
      {
        type: "p",
        text: "Orgulje se ne proizvode serijski. Grade se za određeni prostor, prema njegovoj veličini i akustici. Zadnji i najosjetljiviji korak je intonacija: svaka se svirala pojedinačno dotjeruje dok ne zazvuči kako treba baš u toj crkvi. Zato isti instrument u drugom prostoru nikad ne bi zvučao jednako.",
      },
    ],
  },
  {
    slug: "restauracija-orgulja-prije-i-poslije",
    title: "Restauracija orgulja: što se zapravo radi i kako izgleda prije i poslije",
    excerpt:
      "Stari mijeh koji propušta, svirale pune prašine, crvotočno drvo. Pokazujemo na vlastitim primjerima što restauracija znači u praksi.",
    date: "2026-10-30",
    category: "Restauracija",
    readingMinutes: 5,
    cover: img(
      `${pp}/fonicki-fundus-poslije-popravka.webp`,
      "Svirale orgulja nakon popravka",
      1800,
      1350,
    ),
    blocks: [
      {
        type: "p",
        text: "Orgulje su građene da traju stoljećima, ali ne bez pomoći. Koža na mijehu s godinama se osuši i popuca, prašina se slegne u svirale, drvo napadne crvotočina, a ponegdje je netko prije nas popravljao kako je znao i umio. Restauracija znači vratiti instrumentu ono što je imao, a ne napraviti od njega nešto drugo.",
      },
      { type: "h2", text: "Prvo pregled, pa tek onda alat" },
      {
        type: "p",
        text: "Svaki posao počinje pregledom. Popisujemo registre, provjeravamo mijeh, zračnice, trakturu i svirale, tražimo crvotočinu i tragove vlage. Tek kad znamo što je izvorno, a što kasnije dodano, možemo predložiti zahvat. Kod orgulja koje su zaštićeno kulturno dobro, radovi se dogovaraju s nadležnim konzervatorima.",
      },
      { type: "h2", text: "Mijeh" },
      {
        type: "p",
        text: "Mijeh je pluća orgulja. Kad koža popusti, zrak bježi, ventilator radi bez prestanka, a ton podrhtava. Mijeh rastavljamo, čistimo drvo, mijenjamo kožu i ponovno ga zatvaramo.",
      },
      { type: "beforeAfter", pairId: "mijeh" },
      { type: "h2", text: "Svirale" },
      {
        type: "p",
        text: "Fonički fundus, dakle sve svirale u instrumentu, vadimo red po red. Svaka se svirala čisti, ravna i po potrebi lemi. Na fotografijama se vidi razlika između zatečenog stanja i svirala vraćenih na zračnicu nakon popravka.",
      },
      { type: "beforeAfter", pairId: "fundus" },
      {
        type: "p",
        text: "Drvene svirale koje je crvotočina previše oštetila ne mogu se spasiti. Tada izrađujemo nove po mjerama starih, od iste vrste drva, tako da se u zvuku ne čuje gdje prestaje staro, a počinje novo.",
      },
      { type: "beforeAfter", pairId: "svirale" },
      { type: "h2", text: "Intonacija i ugađanje na kraju" },
      {
        type: "p",
        text: "Kad je sve vraćeno na mjesto, slijedi posao koji se ne vidi, ali se čuje. Svaku sviralu ponovno intoniramo i ugađamo u prostoru crkve. Tek tada je restauracija gotova.",
      },
      { type: "h2", text: "Koliko to traje?" },
      {
        type: "p",
        text: "Ovisi o veličini instrumenta i stanju u kojem ga zateknemo. Manji zahvat može biti gotov za nekoliko tjedana, a temeljita obnova većih orgulja traje mjesecima. Točnu procjenu možemo dati tek nakon pregleda.",
      },
    ],
  },
  {
    slug: "mehanicka-pneumatska-elektricna-traktura",
    title: "Mehanička, pneumatska ili električna traktura: u čemu je razlika?",
    excerpt:
      "Traktura je veza između tipke i svirale. O njoj ovisi kako orgulje reagiraju pod prstima, koliko su pouzdane i kako se održavaju.",
    date: "2026-10-23",
    category: "O orguljama",
    readingMinutes: 4,
    cover: img(
      "/images/orguljarstvo/galerija/knezija-zagreb/11-img-1355.webp",
      "Elektromagneti trakture u orguljama",
      2400,
      1600,
    ),
    blocks: [
      {
        type: "p",
        text: "Kad orguljaš pritisne tipku, negdje u instrumentu, ponekad i desetak metara dalje, mora se otvoriti ventil ispod prave svirale. Sustav koji prenosi taj pokret zove se traktura. Postoje tri osnovne vrste.",
      },
      { type: "h2", text: "Mehanička traktura" },
      {
        type: "p",
        text: "Najstariji i najizravniji sustav. Tipka je tankim drvenim letvicama (apstraktima), kutnicima i osovinama fizički povezana s ventilom. Orguljaš pod prstom osjeća trenutak kad se ventil otvara i može utjecati na to kako svirala progovara. Dobro izrađena mehanika traje stoljećima i može se popraviti običnim stolarskim alatom. Zato nove orgulje gradimo upravo po klasičnom mehaničkom sustavu.",
      },
      { type: "h2", text: "Pneumatska traktura" },
      {
        type: "p",
        text: "Krajem 19. stoljeća mehaniku su zamijenile tanke olovne cjevčice. Pritisak tipke šalje zračni impuls koji na drugom kraju pokreće mali mjehurić i otvara ventil. Tipke su lagane, a sviraonik se može postaviti dalje od svirala. Mana je kašnjenje tona i velik broj kožnih dijelova koji stare. Mnoge orgulje u našim crkvama s kraja 19. i početka 20. stoljeća imaju upravo takav sustav.",
      },
      { type: "h2", text: "Električna i elektromagnetska traktura" },
      {
        type: "p",
        text: "Ovdje tipka zatvara električni kontakt, a ventil otvara elektromagnet. Nema kašnjenja zbog udaljenosti, pa sviraonik može stajati bilo gdje u crkvi. Suvremena digitalna izvedba signal prenosi jednim kabelom i omogućuje pamćenje kombinacija registara.",
      },
      {
        type: "image",
        image: img(
          `${ref}/ploce-elektromagneti.webp`,
          "Elektromagneti koji otvaraju ventile u orguljama",
          1350,
          1800,
        ),
        caption: "Elektromagneti i upravljačka elektronika u unutrašnjosti orgulja.",
      },
      { type: "h2", text: "Što je bolje?" },
      {
        type: "list",
        items: [
          "Za nove orgulje manje i srednje veličine mehanička traktura je najtrajnije rješenje.",
          "Povijesne pneumatske orgulje u pravilu vrijedi obnoviti u izvornom sustavu.",
          "Digitalna elektromagnetska traktura dobar je izbor kad je stari sustav nepopravljivo dotrajao, kad sviraonik mora biti odvojen od orgulja ili kad se instrument proširuje.",
        ],
      },
      {
        type: "p",
        text: "Digitalnu elektromagnetsku trakturu ugrađujemo i u nove i u postojeće orgulje. Koje je rješenje pravo za vaš instrument, najbolje je procijeniti na licu mjesta.",
      },
    ],
  },
  {
    slug: "odrzavanje-orgulja-savjeti-za-zupe",
    title: "Kako čuvati orgulje: sedam savjeta za župe",
    excerpt:
      "Većinu ozbiljnih kvarova na orguljama ne uzrokuje sviranje, nego grijanje, vlaga, prašina i godine bez pregleda. Evo na što treba paziti.",
    date: "2026-10-16",
    category: "Održavanje",
    readingMinutes: 4,
    cover: img(
      `${ref}/sigetec.webp`,
      "Neogotičko kućište orgulja na koru",
      1800,
      1200,
    ),
    blocks: [
      {
        type: "p",
        text: "Orgulje su najskuplji i najsloženiji predmet u većini crkava, a često se sjetimo da postoje tek kad zašute pred Božić. Uz malo pažnje tijekom godine, velikih popravaka može biti puno manje.",
      },
      { type: "h2", text: "1. Grijte polako" },
      {
        type: "p",
        text: "Naglo zagrijavanje hladne crkve isušuje zrak, pa drvo puca, a zračnice počnu propuštati. Ako se crkva grije, neka temperatura raste postupno i neka topli zrak ne puše izravno prema orguljama.",
      },
      { type: "h2", text: "2. Pazite na vlagu" },
      {
        type: "p",
        text: "Drvu i koži odgovara umjerena i stalna vlažnost zraka, otprilike između 50 i 70 posto. Presuh zrak donosi pukotine, a prevlažan plijesan i koroziju. Jednostavan vlagomjer na koru košta malo, a puno govori.",
      },
      { type: "h2", text: "3. Svirajte redovito" },
      {
        type: "p",
        text: "Orgulje koje se ne koriste propadaju brže od onih na kojima se svira. Redovito sviranje pokreće mehaniku i provjetrava svirale. Povremeno treba uključiti i registre koji se rijetko koriste.",
      },
      { type: "h2", text: "4. Radovi u crkvi? Prvo zaštitite orgulje" },
      {
        type: "p",
        text: "Ličenje, brušenje i žbukanje za orgulje su najveća opasnost. Fina prašina ulazi u svirale i ventile i poslije se može ukloniti samo rastavljanjem instrumenta. Prije bilo kakvih radova orgulje treba stručno zatvoriti, a nas slobodno nazovite za savjet.",
      },
      { type: "h2", text: "5. Crvotočina i glodavci" },
      {
        type: "p",
        text: "Sitna drvena prašina ispod kućišta ili svirala znak je crvotočine. Miševi pak rado grizu kožu i filc. Što se ranije primijeti, to je popravak manji.",
      },
      { type: "h2", text: "6. Ne popravljajte sami" },
      {
        type: "p",
        text: "Svirala koja ne svira ili ton koji ne prestaje često su sitnica, ali savijanje svirala, ljepljiva traka i ulje na mehanici redovito naprave veću štetu od samog kvara. Zapišite koji ton i koji registar stvaraju problem i javite orguljaru.",
      },
      { type: "h2", text: "7. Redovit pregled i ugađanje" },
      {
        type: "p",
        text: "Jedan pregled s ugađanjem godišnje dovoljan je većini instrumenata. Jezične registre, koji su osjetljiviji na temperaturu, ponekad treba ugoditi i češće. Redovitim pregledom sitni se problemi riješe prije nego što postanu skupi.",
      },
      {
        type: "p",
        text: "Imate pitanje o svojim orguljama? Pošaljite nam poruku s nekoliko fotografija i kratkim opisom, pa ćemo vam reći što bi bilo dobro napraviti.",
      },
    ],
  },
];

export function getBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(iso: string): string {
  return new Intl.DateTimeFormat("hr-HR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Zagreb",
  }).format(new Date(`${iso}T12:00:00Z`));
}
