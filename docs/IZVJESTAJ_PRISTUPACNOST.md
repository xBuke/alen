# Izvještaj o reviziji pristupačnosti — orguljarstvo-kvaternik.hr

**Datum revizije:** 20. studenoga 2026.
**Izradio:** MangAI (Marko Škorić), izrađivač i održavatelj stranice
**Mjerilo:** WCAG 2.1, razine A i AA (EN 301 549 v3.2.1, poglavlje 9 — mrežne stranice)
**Vrsta procjene:** samoprocjena (automatski alati + ručna provjera)
**Interni dokument** — ne objavljuje se na stranici. Javna izjava: `/izjava-o-pristupacnosti` i `/en/accessibility-statement`.

---

## 1. Sažetak

| | Prije | Poslije |
|---|---|---|
| axe-core — povrede WCAG 2.0/2.1 A+AA (22 stranice × 2 prikaza) | povrede na svih 44 kombinacija (5 vrsta WCAG pravila + `heading-order` iz best-practice) | **0** (24 stranice × 2 prikaza) |
| Lighthouse — pristupačnost | 92–100 | **100 na svim stranicama** (mobitel i desktop) |
| Lighthouse — najbolje prakse / SEO | 100 / 92–100 | **100 / 100** |
| Lighthouse — performanse, desktop | 94–99 | **94–100** |
| Lighthouse — performanse, mobitel | 72–89 | **72–89** (vidi točku 6 — nije postignut cilj ≥ 90) |

Ručnom provjerom pronađeni su i ozbiljniji problemi koje automatski alati ne vide (nečitljiv tekst
na svijetlim sekcijama, svirale koje se ne mogu koristiti tipkovnicom, beskonačne animacije bez
zaustavljanja, neopisne fotografije u galeriji, slab kontrast rubova polja obrasca). Svi pronađeni
problemi su popravljeni. Na temelju ove procjene stranica zadovoljava WCAG 2.1 razinu AA;
preporuka je da se prije navođenja reference u javnoj nabavi napravi i kratka provjera čitačem
zaslona (točka 7).

## 2. Opseg

Obje jezične inačice, sve vrste stranica:

| HR | EN |
|---|---|
| `/` (naslovnica) | `/en` |
| `/o-nama` | `/en/about` |
| `/orgulje` | `/en/organs` |
| `/polovne-orgulje` | `/en/used-organs` |
| `/usluge` | `/en/services` |
| `/galerija` (popis albuma, album, preglednik fotografija) | `/en/gallery` |
| `/blog` | `/en/blog` |
| `/blog/kako-rade-orgulje` (predložak članka) | `/en/blog/how-organs-work` |
| `/kontakt` (obrazac, uključujući stanje s greškama) | `/en/contact` |
| `/pravila-privatnosti` | `/en/privacy-policy` |
| `/impressum` | `/en/imprint` |
| `/izjava-o-pristupacnosti` (nova) | `/en/accessibility-statement` (nova) |

Prikazi: desktop 1350 px, mobitel 390 px, reflow 320 px, povećanje 200 % (640 CSS px).
Stanja: otvoren mobilni izbornik, otvoren album, otvoren preglednik fotografija, obrazac s
pogreškama, otvoren padajući izbornik, postavka „smanjeno kretanje” uključena i isključena.

## 3. Alati i metoda

| Alat | Verzija | Namjena |
|---|---|---|
| axe-core (preko @axe-core/puppeteer) | 4.14.1 | pravila `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `best-practice` |
| Google Lighthouse | 12.8.2 | sve četiri kategorije, mobitel (zadana simulacija) i desktop |
| Chrome (headless) | 153 | izvođenje testova |
| Vlastite skripte (Puppeteer) | — | tipkovnica, fokus, dijalozi, obrazac, reflow, razmak teksta, smanjeno kretanje, kontrast teksta preko fotografija mjerenjem piksela |
| Ručni pregled koda i snimki zaslona | — | semantika, alt tekstovi, jezik, animacije, dizajn prije/poslije |

Skripte su u `docs/pristupacnost/skripte/`, sirovi rezultati u `docs/pristupacnost/rezultati/`
(`*-prije.*` i `*-poslije.*`).

**Uvjeti mjerenja.** Testovi su izvedeni na produkcijskom buildu (`next build` + `next start`) istog
koda, lokalno. Iz radnog okruženja nije bilo moguće pristupiti živoj domeni ni Google Fontsima, pa su
za build korištene lokalne kopije istih fontova (Fraunces i Instrument Sans s paketa @fontsource);
ta zamjena nije dio commita. Na pristupačnost to ne utječe; na brojke performansi utječe (točka 6).

## 4. Pronađeni problemi i popravci

Oznake: **K** = kritično (sadržaj ili funkcija nedostupni), **V** = visoko, **S** = srednje.

| # | WCAG | Problem | Gdje | Oz. | Popravak |
|---|---|---|---|---|---|
| 1 | 1.4.3 | Odlomci bez vlastite klase dobivali su svijetlu boju iz baznog stila na **svijetloj** podlozi — tekst praktički nevidljiv (1.49:1). | Orgulje (2 sekcije), EN isto | K | `SplitContent`/`EditorialIntro`: tamna boja za odlomke na ivory podlozi (7.7:1). |
| 2 | 1.4.3 | Obrubni gumb sa svijetlim tekstom na svijetloj podlozi — gumb nevidljiv (1.02:1). | Usluge (Servis, Digitalna traktura) | K | Nova varijanta `secondaryOnLight` (tamni tekst i rub). |
| 3 | 2.1.1 | Svirale na naslovnici nisu se mogle koristiti tipkovnicom (`tabIndex=-1`, `aria-hidden`). | Naslovnica | V | Grupa s opisom; jedno mjesto u redoslijedu tabulatora, strelice biraju sviralu, Enter/razmaknica sviraju; svaka svirala ima naziv („Svirala 6 od 11”). |
| 4 | 2.2.2 | „Val” svirala ponavljao se svakih 6 s bez kraja; pulsirajuća točka beskonačno. | Naslovnica | V | Val se izvodi jednom, točka dva puta — sav automatski pokret završava prije 5 s. |
| 5 | 2.2.2 | Beskonačne animacije u dijagramu anatomije (zrak, tipka, mijeh) bez mogućnosti zaustavljanja. | Orgulje | V | Gumb „Zaustavi / Pokreni animaciju” (skriven kad je uključeno smanjeno kretanje, jer se tada animacije ionako ne izvode). |
| 6 | 1.1.1 | 321 fotografija u albumima galerije imala je alternativni tekst bez opisa („Legrad — fotografija 5”). | Galerija | V | Svaka fotografija pregledana i opisana na HR i EN (`src/data/gallery-alt.ts`), npr. „Registarski potezi s natpisima uz sviraonik — Sveta Mati Slobode”. |
| 7 | 1.4.11 | Rubovi polja obrasca 1.3:1 prema pozadini; rub kvačice 1.9:1; prsten fokusa polja 1.6:1. | Kontakt | V | Rub polja 3.8:1, rub kvačice 4.4:1, prsten fokusa 6.3:1. |
| 8 | 3.3.2 | Obvezna polja nisu bila označena; nije navedena minimalna duljina poruke. | Kontakt | V | Napomena „Sva polja su obavezna osim označenih kao neobavezna”, oznaka „(neobavezno)”, `aria-required`, uputa „najmanje 20 znakova”. |
| 9 | 1.4.3 | Brončani tekst (nadnaslovi, brojevi) na ivory podlozi 4.21:1. | Naslovnica, O nama, Usluge | S | Nijansa bronze minimalno zatamnjena: `#8b6f47` → `#84693f` (4.62:1). |
| 10 | 1.4.3 | Hover stanje glavnog gumba: tamni tekst na bronzi 4.18:1. | Svi gumbi | S | U hover stanju svijetli tekst (4.74:1). |
| 11 | 1.4.3 | Napomena na Uslugama (`text-dark/60`) 4.11:1. | Usluge | S | `text-dark/70` (5.61:1). |
| 12 | 1.4.3 | Redni brojevi u mobilnom izborniku 3.59:1. | Mobilni izbornik | S | Puna zlatna boja (6.28:1). |
| 13 | 1.4.3 | Broj fotografija na karticama albuma preko svijetlih dijelova fotografije 2.8–4.4:1. | Galerija | S | Jači tamni prijelaz pri dnu kartice (sada ≥ 4.5:1 na svim karticama, izmjereno pikselima). |
| 14 | 1.4.11 / 2.4.7 | Zlatni obrub fokusa na ivory sekcijama 2.81:1. | Sekcije sa svijetlom podlogom | S | Na ivory podlozi obrub fokusa u tamnoj boji (14:1). |
| 15 | 1.4.1 | Linkovi u tekstu razlikovali su se samo bojom (1.87:1 prema okolnom tekstu). | Kontakt (privola), Pravila privatnosti | S | Linkovi trajno podcrtani. |
| 16 | 2.5.3 | Naziv linka logotipa nije sadržavao vidljivi tekst („Draganovec”); kartice albuma imale `aria-label` drukčiji od vidljivog teksta; prekidač jezika „EN” s nazivom „English”. | Sve stranice, Galerija | S | Nazivi počinju vidljivim tekstom, dopuna kroz `sr-only`. |
| 17 | 1.3.1 | `<ol>`/`<ul>` s `<div>` omotačima oko `<li>` (neispravne liste). | Naslovnica, O nama | S | `MotionReveal` se može renderirati kao `<li>`. Postojeći izgled crta zadržan. |
| 18 | 1.3.1 | Preskakanje razine naslova (h1 → h3) na popisu albuma i bloga; `<h3>` unutar `<button>`. | Galerija, Blog | S | Naslov kartice albuma više nije naslov unutar gumba; dodan skriveni h2 „Albumi”; kartice bloga na popisu su h2. |
| 19 | 2.4.3 | Nakon otvaranja/zatvaranja albuma fokus se gubio (gumb nestaje iz DOM-a). | Galerija | S | Fokus prelazi na naslov novog prikaza. |
| 20 | 2.4.3 | U pregledniku fotografija fokus se gubio kad na prvoj/zadnjoj fotografiji nestane gumb „Prethodna/Sljedeća”. | Galerija | S | Fokus prelazi na preostali gumb. |
| 21 | 4.1.2 / 1.1.1 | Naziv dijaloga preglednika bio je samo „3 / 24”; alt tekst čitan dvaput; svi gumbi fotografija imali isti naziv. | Galerija | S | Naziv = naslov + brojač (brojač se najavljuje pri listanju); gumb fotografije nosi alt opis. |
| 22 | 3.1.1 / 3.1.2 | Gumb za zatvaranje mobilnog izbornika i oznaka „Breadcrumb” uvijek na jednom jeziku; engleski naslov izvora na HR članku bez `lang`. | EN stranice, članak o Trovru | S | Prevedeno po jeziku stranice; `lang="en"` na izvoru. |
| 23 | 1.4.10 | Na 320 px engleska stranica Usluge imala je vodoravno pomicanje (gumb bez prijeloma); dugi naziv u filtru galerije izlazio je iz okvira. | `/en/services`, Galerija | S | Prijelom teksta gumba i filtra. |
| 24 | 3.3.3 | Poruka o neispravnoj e-pošti bez primjera. | Kontakt | S | „Unesite valjanu adresu e-pošte, npr. ime@primjer.hr.” |
| 25 | 1.3.1 | Zamka za botove u obrascu bila je dostupna čitačima zaslona (`aria-hidden="false"`). | Kontakt | S | `aria-hidden="true"`. |
| 26 | 1.4.11 | Dijelovi dijagrama anatomije 2.92:1. | Orgulje | S | 3.61:1. |
| 27 | — (dobra praksa) | Poveznice koje se otvaraju u novom prozoru bez najave; `aria-current` na aktivnoj stavci izbornika; brojevi naslova u Pravilima privatnosti čitani spojeno („01Voditelj”). | Podnožje, izvori na blogu, Impressum, izbornik | — | Dodana skrivena najava „(otvara se u novom prozoru)”, `aria-current="page"`, razmak u nazivu. |
| 28 | — | Na uskom prikazu prelazak mišem preko dijagrama otvarao je i zatvarao harmoniku. | Orgulje (mobilni/zoom) | — | Na uskom prikazu samo klik. |

Dodatno (bez vizualne promjene): logotip se poslužuje kao WebP od 14 KB umjesto PNG-a od 70 KB.

**Nova stranica:** Izjava o pristupačnosti (HR) i Accessibility statement (EN), u obliku oglednog
obrasca iz Provedbene odluke (EU) 2018/1523 i čl. 9. Zakona (NN 17/19): status usklađenosti,
nepristupačni sadržaj, datum i metoda (samoprocjena), povratne informacije (e-pošta, telefon,
obrazac; rok odgovora 15 dana), postupak praćenja (Povjerenik za informiranje). Poveznica u
podnožju obje jezične inačice. Navedeno je i da Orguljarstvo Kvaternik d.o.o. nije tijelo javnog
sektora, pa je izjava dobrovoljna, a nadležnost Povjerenika formalno se odnosi na tijela javnog sektora.

## 5. Ručne provjere — rezultat (stanje poslije)

| Provjera | Rezultat |
|---|---|
| Samo tipkovnica, sve stranice | Svi interaktivni elementi dostupni; podnožje dosegnuto na svim stranicama; svaki fokusirani element ima vidljiv indikator; nema zamki. |
| Skip link | Prvi element na stranici, vidljiv kod fokusa, vodi u `<main>`. |
| Mobilni izbornik | `aria-expanded`, fokus ulazi u izbornik i ostaje u njemu, Esc zatvara i vraća fokus; naziv i gumb na jeziku stranice. |
| Galerija i preglednik | Album se otvara tipkovnicom, fokus na naslov albuma; preglednik: fokus na „Zatvori”, strelice listaju, fokus zarobljen u dijalogu, Esc vraća fokus na fotografiju. axe u otvorenom pregledniku: 0. |
| Obrazac | Svako polje ima oznaku; `autocomplete` za ime, e-poštu i telefon; nakon slanja praznog obrasca fokus na prvo neispravno polje, `aria-invalid` i `aria-describedby` na poruku; padajući izbornik radi strelicama. axe u stanju s greškama: 0. |
| Kontrast | Sav tekst ≥ 4.5:1 (veliki ≥ 3:1), elementi sučelja i fokus ≥ 3:1. Tekst preko fotografija izmjeren pikselima na svih 24 stranica u oba prikaza. |
| Alt tekstovi | Smisleni na HR i EN; slike unutar linkova/gumba s istim tekstom dekorativne (`alt=""`); svirale, crte svirala i ikone skrivene od čitača. |
| Naslovi i orijentiri | Jedan h1 po stranici, bez preskakanja razina; `header`, `nav` (s nazivom), `main`, `footer`. |
| Jezik | `lang="hr"` / `lang="en"` na `<html>`; `lang` na prekidaču jezika, hrvatskim nazivima u EN izjavi i engleskom izvoru na HR članku; `hreflang` (hr, en, x-default) na svim stranicama i u sitemapu. |
| Naslovi stranica | Jedinstveni i opisni na obje inačice. |
| Reflow 320 px i zoom 200 % | Bez vodoravnog pomicanja na svih 24 stranica. |
| Razmak teksta (1.4.12) | Bez odrezanog teksta. |
| Smanjeno kretanje | Sve animacije (uključujući svirale, anatomiju, reveal i glatko pomicanje) isključene. Bez te postavke automatski pokret na naslovnici traje kraće od 5 s, a animacije anatomije mogu se zaustaviti. |

Lažno pozitivni nalazi alata (provjereno i obrazloženo): brojevi 1–8 na dijagramu anatomije
(u okvir mjerenja ulazi zlatni obrub kružića; stvarni kontrast 5.83:1, a oznake su dekorativne i
skrivene od čitača); oznake „Prije/Poslije” (imaju vlastitu tamnu podlogu; izmjereno 14–17:1 i 6.28:1,
`rezultati/kontrast-oznake-prije-poslije.txt`); natpis „Dotaknite svirale” izmjeren usred animacije
pojavljivanja.

## 6. Lighthouse — završni rezultati po stranici

P = performanse, A = pristupačnost, BP = najbolje prakse, SEO.

| Stranica | Mobitel P / A / BP / SEO | Desktop P / A / BP / SEO | Pristupačnost prije (mob. / desk.) |
|---|---|---|---|
| `/` | 74 / **100** / 100 / 100 | 95 / **100** / 100 / 100 | 92 / 92 |
| `/o-nama` | 82 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 92 / 92 |
| `/orgulje` | 80 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 100 / 100 |
| `/polovne-orgulje` | 82 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 100 / 100 |
| `/usluge` | 73 / **100** / 100 / 100 | 94 / **100** / 100 / 100 | 100 / 100 |
| `/galerija` | 77 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 98 / 98 |
| `/blog` | 72 / **100** / 100 / 100 | 94 / **100** / 100 / 100 | 98 / 98 |
| `/blog/kako-rade-orgulje` | 80 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 100 / 100 |
| `/kontakt` | 78 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 97 / 97 |
| `/pravila-privatnosti` | 82 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 96 / 96 |
| `/impressum` | 86 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 100 / 100 |
| `/en` | 77 / **100** / 100 / 100 | 95 / **100** / 100 / 100 | 92 / 92 |
| `/en/about` | 83 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 92 / 92 |
| `/en/organs` | 81 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 100 / 100 |
| `/en/used-organs` | 81 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 100 / 100 |
| `/en/services` | 77 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 100 / 100 |
| `/en/gallery` | 81 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 98 / 98 |
| `/en/blog` | 76 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 98 / 98 |
| `/en/blog/how-organs-work` | 89 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 100 / 100 |
| `/en/contact` | 81 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | 97 / 97 |
| `/en/privacy-policy` | 84 / **100** / 100 / 100 | 100 / **100** / 100 / 100 | 96 / 96 |
| `/en/imprint` | 84 / **100** / 100 / 100 | 100 / **100** / 100 / 100 | 100 / 100 |
| `/izjava-o-pristupacnosti` | 84 / **100** / 100 / 100 | 99 / **100** / 100 / 100 | — (nova) |
| `/en/accessibility-statement` | 84 / **100** / 100 / 100 | 100 / **100** / 100 / 100 | — (nova) |

**Performanse na mobitelu (72–89) ne dosežu cilj ≥ 90.** Nisu se pogoršale u odnosu na stanje prije
(i tada 72–89). Uzrok je kasni LCP (4–6 s) u Lighthouseovoj simulaciji spore mreže i 4× sporijeg
procesora: „render delay” faza čeka preuzimanje web-fontova (~320 KB: Fraunces normal i kurziv te
Instrument Sans, svi preloadani) i izvršavanje JavaScripta. Ovo mjerenje je lokalno i s
**zamjenskim** fontovima (puni varijabilni fontovi s @fontsource), pa nije pouzdano za živu stranicu,
koja fontove dobiva iz Google Fontsa. Poboljšanje bi zahtijevalo promjenu načina učitavanja fontova
(npr. bez preloada kurziva ili `font-display: optional`), što može utjecati na izgled pri prvom
učitavanju — zato nije rađeno bez dogovora. Preporuka: izmjeriti živu stranicu u PageSpeed Insightsu
i na temelju toga odlučiti.

## 7. Ograničenja procjene i preporuke

- **Čitači zaslona.** Nije provedeno testiranje sa stvarnim čitačima zaslona (NVDA, JAWS, VoiceOver,
  TalkBack); provjereni su nazivi, uloge i stanja u stablu pristupačnosti preglednika. Preporuka:
  prije navođenja reference proći naslovnicu, galeriju (preglednik) i obrazac s NVDA (Windows) i
  VoiceOverom (iPhone) — oko 30 minuta.
- **Živa stranica.** Testovi su na produkcijskom buildu istog koda; nakon objave provjereno je da je
  živa stranica ažurirana, ali alati nisu pokrenuti izravno na domeni (nedostupna iz radnog okruženja).
- **Slanje obrasca.** Provjerena je validacija i stanje s greškama; stvarno slanje poruke nije
  testirano kako se ne bi slali lažni upiti.
- **Održavanje.** Novi sadržaj (fotografije, članci) treba imati smislene alt tekstove na oba jezika.
  Nove fotografije galerije dodaju se u `src/data/gallery-alt.ts`; bez unosa koristi se generički tekst,
  što bi ponovno bilo neusklađeno s 1.1.1. Izjavu treba preispitati pri većim izmjenama, a najmanje
  jednom godišnje (datumi su na vrhu `src/views/accessibility.tsx`).
- **Pravni status.** Zakon NN 17/19 obvezuje tijela javnog sektora; za ovu stranicu izjava je
  dobrovoljna. Navod „usklađena s WCAG 2.1 AA” u ponudama temelji se na ovoj samoprocjeni, ne na
  certifikaciji treće strane.
