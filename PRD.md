# ORGULJARSTVO KVATERNIK — PRODUCT REQUIREMENTS DOCUMENT

**Status:** radna verzija za izradu u Cursoru  
**Namjena:** moderna web-stranica za Orguljarstvo Kvaternik  
**Jezik:** hrvatski  
**Napomena:** sve činjenice o povijesti obrta, godinama rada, lokacijama projekata, kvalifikacijama i kontaktima moraju se potvrditi s Alenom prije javne objave.

---

## 1. Sažetak proizvoda

Potrebno je izraditi premium, responzivnu i sadržajno bogatu web-stranicu za **Orguljarstvo Kvaternik**. Fokus je na obrtu, uslugama, projektima i stručnom pristupu orguljarstvu. Alen Kvaternik pojavljuje se kao osoba iza radionice, ali stranica ne smije izgledati kao osobni portfolio.

Stranica mora spojiti:

- tradiciju orguljarstva
- preciznu ručnu izradu
- očuvanje glazbene i sakralne baštine
- ozbiljnost i povjerenje
- moderan digitalni doživljaj
- jednostavan kontakt i slanje upita

Vizualni identitet treba pratiti odobreni koncept: tamna, elegantna podloga, topli tonovi drva, zlatno-brončani detalji, velike fotografije orgulja i mirna editorial tipografija.

---

## 2. Glavni ciljevi

1. Predstaviti Orguljarstvo Kvaternik kao ozbiljnu, stručnu i pouzdanu radionicu.
2. Jasno objasniti usluge: izrada, obnova/restauracija, održavanje/servis i savjetovanje.
3. Omogućiti pregled stvarnih projekata kroz fotografije i projektne kartice.
4. Omogućiti jednostavno slanje upita putem funkcionalne kontakt-forme.
5. Omogućiti jednostavno naknadno uređivanje sadržaja i zamjenu fotografija.
6. Osigurati kvalitetan prikaz na mobitelu, tabletu i računalu.
7. Pripremiti tehničku osnovu za SEO, društveno dijeljenje i buduće proširenje.

---

## 3. Što nije cilj prve verzije

Prva verzija ne treba sadržavati:

- online trgovinu
- korisničke račune
- javni CMS panel
- rezervacijski sustav
- cjenik s fiksnim iznosima
- blog, osim ako se kasnije posebno zatraži
- višejezičnost u prvoj fazi

Arhitektura treba omogućiti kasnije dodavanje engleskog ili njemačkog jezika bez potpunog redizajna.

---

## 4. Ciljne skupine

### Primarna publika

- župe i crkvene zajednice
- biskupije i druge crkvene ustanove
- kulturne i javne ustanove
- konzervatori i stručnjaci za kulturnu baštinu
- glazbene škole i akademije
- orguljaši i glazbeni voditelji
- vlasnici povijesnih ili privatnih instrumenata

### Sekundarna publika

- ljubitelji orgulja
- arhitekti i projektanti
- mediji
- budući suradnici
- posjetitelji koji traže informacije o radionici

---

## 5. Pozicioniranje brenda

### Ključna poruka

**Orgulje koje stvaraju dušu prostora.**

### Podržavajuća poruka

**Izrada, obnova i održavanje orgulja uz poštovanje instrumenta, prostora i glazbene baštine.**

### Osobnost brenda

- smirena
- stručna
- precizna
- tradicionalna, ali ne zastarjela
- pouzdana
- nenametljivo luksuzna
- kulturno osviještena

### Ton komunikacije

- standardni hrvatski jezik
- kratke i jasne rečenice
- bez pretjeranih marketinških obećanja
- bez generičkih fraza poput “najbolji na tržištu”
- autoritativno, ali pristupačno
- obraćanje s “Vi” gdje je prikladno

---

## 6. Informacijska arhitektura

### Glavna navigacija

1. Početna
2. O nama
3. Orgulje
4. Usluge
5. Projekti
6. Galerija
7. Kontakt

### Predložene rute

```txt
/
 /o-nama
 /orgulje
 /usluge
 /projekti
 /projekti/[slug]
 /galerija
 /kontakt
 /pravila-privatnosti
 /impressum
```

### Glavni CTA

**Pošaljite upit**

Sekundarni CTA:

**Pogledajte projekte**

---

## 7. UX načela

### 7.1. Fotografije su glavni dokaz kvalitete

Fotografije orgulja, radionice, detalja mehanike, cijevi i rada rukama moraju imati veću važnost od dekorativnih grafika.

### 7.2. Sadržaj se otkriva postupno

Početna stranica treba brzo objasniti:

- tko je tvrtka
- što radi
- zašto joj vjerovati
- kako vidjeti radove
- kako poslati upit

Detaljne informacije ostaju na unutarnjim stranicama.

### 7.3. Jednostavan put do kontakta

Kontaktni CTA mora biti vidljiv:

- u navigaciji
- u hero dijelu
- nakon usluga
- na kraju svake unutarnje stranice
- u footeru

### 7.4. Miran i dostojanstven doživljaj

Animacije trebaju biti spore i suptilne. Ne koristiti:

- agresivne parallax efekte
- automatske karusele
- jarke gradijente
- velike animirane brojke bez stvarnih podataka
- zvuk koji se automatski pokreće

---

## 8. Vizualni sustav

### Boje

```txt
Background:          #0B0B0C
Surface:             #151515
Surface elevated:    #1B1B1B
Ivory:               #F5F2ED
Ivory muted:         #E9E3DA
Gold:                #B38A5A
Bronze:              #8B6F47
Text light:          #F8F5F0
Text muted dark:     #CFC7BC
Text dark:           #25211D
Border dark:         rgba(255,255,255,0.12)
Border light:        rgba(36,29,22,0.12)
```

### Tipografija

- naslovi: Playfair Display
- tekst i navigacija: Montserrat
- brojčani i tehnički detalji: Montserrat
- opcionalni potpis “Alen Kvaternik”: elegantan script font samo ako izgleda ozbiljno i čitljivo

### Tipografske veličine

```txt
Hero H1 desktop: clamp(3.5rem, 7vw, 7rem)
Hero H1 mobile: 2.6rem–3.6rem
Page H1: clamp(2.8rem, 5vw, 5.5rem)
Section H2: clamp(2rem, 3.2vw, 3.75rem)
Body large: 1.125rem–1.25rem
Body: 1rem
Small label: 0.72rem–0.8rem, uppercase, tracking
```

### Razmaci

- sadržaj desktop: max-width 1280–1440 px
- bočni padding desktop: 64–96 px
- tablet: 32–48 px
- mobitel: 20–24 px
- vertikalni razmak sekcija: 96–160 px desktop, 72–96 px mobile

### Rubovi i sjene

- mali border radius: 4–10 px
- bez “bubble” kartica
- sjene vrlo suptilne
- koristiti tanke zlatne ili neutralne linije

---

## 9. Specifikacija stranica

## 9.1. Početna

### A. Navigacija

- transparentna preko hero fotografije
- nakon scrolla tamna poluprozirna pozadina s blur efektom
- logo lijevo
- linkovi desno
- zlatni CTA
- aktivna stranica označena diskretnom linijom
- mobilni menu u full-screen sheet prikazu

### B. Hero

Sadržaj:

- eyebrow: “TRADICIJA. ZNANJE. STRAST.”
- H1: “Orgulje koje stvaraju dušu prostora.”
- tekst od maksimalno dvije rečenice
- CTA “Saznajte više”
- CTA “Pošaljite upit”
- pozadinska fotografija orgulja
- tamni lijevi gradient overlay radi čitljivosti
- diskretni scroll indicator

### C. Usluge

Svijetla ivory pozadina. Četiri stavke:

1. Izrada orgulja
2. Obnova i restauracija
3. Održavanje i servis
4. Stručno savjetovanje

Svaka kartica s:

- line ikonom
- nazivom
- kratkim opisom
- linkom na detaljnu stranicu

### D. O nama

Split layout:

- fotografija radionice ili ruku u radu
- kratka priča o obrtu
- manji odlomak o Alenu
- potpis ili ime
- CTA “Više o nama”

### E. Izdvojeni projekti

- četiri projekta
- fotografija
- vrsta rada
- naziv
- lokacija
- godina, samo ako je potvrđena
- hover zoom
- cijela kartica klikabilna

### F. Proces rada

Predložena četiri koraka:

1. Razgovor i pregled
2. Analiza i prijedlog
3. Izvedba radova
4. Predaja i daljnja briga

Ne prikazivati vremenske rokove dok ih Alen ne potvrdi.

### G. Završni CTA

- tamna sekcija
- velika rečenica
- CTA kontakt
- opcionalno telefon i email

---

## 9.2. O nama

Sekcije:

1. page hero
2. priča radionice
3. vrijednosti
4. manji profil Alena Kvaternika
5. način rada
6. galerija radionice
7. CTA

Ne navoditi:

- godine iskustva
- školovanje
- certifikate
- broj projekata
- generacijsku tradiciju

dok se ne potvrde.

---

## 9.3. Orgulje

Svrha stranice je objasniti korisniku da su orgulje spoj:

- glazbenog instrumenta
- arhitekture
- mehanike
- akustike
- ručnog zanata

Predložene sekcije:

1. uvod
2. nove orgulje
3. obnova i restauracija
4. održavanje i ugađanje
5. dijelovi instrumenta
6. CTA

Moguća interaktivna komponenta:

- klikabilna ilustracija orgulja
- oznake: pročelje, cijevi, sviraonik, manuali, pedali, registri, mjehovi, traktura

Komponentu izraditi tako da se kasnije mogu dodati stvarne fotografije.

---

## 9.4. Usluge

Svaka usluga dobiva zaseban detaljan blok:

### Izrada novih orgulja

- razumijevanje prostora i namjene
- oblikovanje koncepcije
- konstrukcija i izrada
- postavljanje
- intonacija i završno usklađivanje

### Obnova i restauracija

- pregled postojećeg stanja
- dokumentiranje
- prijedlog zahvata
- očuvanje izvornog materijala gdje je moguće
- obnova funkcionalnosti i zvuka

### Održavanje i servis

- periodični pregled
- čišćenje
- otklanjanje kvarova
- ugađanje prema potrebi
- savjetovanje o uvjetima čuvanja

### Stručno savjetovanje

- procjena stanja
- mišljenje prije ulaganja
- pomoć u pripremi projekta
- suradnja s naručiteljem i drugim stručnjacima

Svi navodi trebaju biti predstavljeni kao opis usluge, ne kao konzervatorska ili zakonska obećanja.

---

## 9.5. Projekti

### Filteri

- Sve
- Izrada
- Obnova
- Restauracija
- Održavanje

Filtre prikazati samo ako postoji dovoljno projekata po kategoriji.

### Projektna kartica

- naslovna fotografija
- naziv projekta
- mjesto
- kategorija
- godina
- sažetak

### Detalj projekta

- hero fotografija
- naziv i mjesto
- tip zahvata
- kratki pregled
- izazov
- pristup radu
- izvedeni radovi
- galerija
- tehnički podatci, samo ako su potvrđeni
- sljedeći projekt / prethodni projekt

Za početnu verziju koristiti neutralne placeholder projekte, bez izmišljenih crkava ili lokacija.

---

## 9.6. Galerija

- masonry ili uravnoteženi CSS grid
- filtriranje: orgulje / radionica / detalji / projekti
- lightbox
- keyboard navigation
- swipe na mobitelu
- alt tekstovi
- lazy loading

---

## 9.7. Kontakt

### Podatci

- telefon
- email
- adresa
- radno vrijeme, ako postoji
- karta samo nakon potvrđene lokacije

### Forma

Polja:

- ime i prezime, obavezno
- email, obavezno
- telefon, opcionalno
- vrsta upita, obavezno
- lokacija instrumenta, opcionalno
- poruka, obavezno
- privola, obavezno
- honeypot skriveno polje

Vrste upita:

- izrada novih orgulja
- obnova ili restauracija
- održavanje ili servis
- stručni pregled i savjetovanje
- drugo

### Stanja forme

- početno
- validacijska pogreška
- slanje
- uspjeh
- greška servera
- rate limit

Poruka uspjeha:

**Hvala na upitu. Vaša poruka je uspješno poslana. Javit ćemo Vam se u najkraćem mogućem roku.**

Poruka greške:

**Poruku trenutačno nije moguće poslati. Molimo pokušajte ponovno ili nam se javite izravno putem telefona ili e-pošte.**

---

## 10. Komponente

```txt
Navbar
MobileNavigation
Footer
Logo
Hero
PageHero
SectionHeading
ServiceCard
ProjectCard
ProjectGrid
ProjectFilter
ProjectGallery
ImageLightbox
AboutSplit
ValuesGrid
ProcessTimeline
QuoteBlock
ContactCTA
ContactForm
ContactDetails
ConsentField
Breadcrumbs
SocialLinks
RichText
Container
Button
ImageWithReveal
```

---

## 11. Model sadržaja

Sadržaj držati u odvojenim TypeScript datotekama:

```txt
src/data/site.ts
src/data/navigation.ts
src/data/services.ts
src/data/projects.ts
src/data/gallery.ts
src/data/pages.ts
```

Svaka fotografija treba imati:

```ts
type ImageAsset = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  credit?: string;
  licenseUrl?: string;
  temporary?: boolean;
};
```

Svaki projekt:

```ts
type Project = {
  slug: string;
  title: string;
  location?: string;
  year?: string;
  category: "izrada" | "obnova" | "restauracija" | "odrzavanje";
  summary: string;
  coverImage: ImageAsset;
  gallery: ImageAsset[];
  featured?: boolean;
  draft?: boolean;
};
```

---

## 12. Tehnička arhitektura

### Stack

- Next.js, App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Hook Form
- Zod
- Resend
- Lucide React
- next/font
- next/image

### Preporučena struktura

```txt
src/
  app/
    (site)/
      page.tsx
      o-nama/page.tsx
      orgulje/page.tsx
      usluge/page.tsx
      projekti/page.tsx
      projekti/[slug]/page.tsx
      galerija/page.tsx
      kontakt/page.tsx
      pravila-privatnosti/page.tsx
      impressum/page.tsx
    api/contact/route.ts
    layout.tsx
    sitemap.ts
    robots.ts
    globals.css
  components/
    layout/
    sections/
    cards/
    forms/
    ui/
  data/
  lib/
  emails/
  types/
public/
  images/
```

---

## 13. Kontakt-forma: tehnički zahtjevi

### Server-side validacija

Nikada ne oslanjati se samo na klijentsku validaciju.

### Resend

Env varijable:

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

### Zaštita

- honeypot
- limit duljine poruke
- sanitizacija vrijednosti
- osnovni rate limiting po IP adresi
- ne prikazivati tehničke detalje greške korisniku
- zapisati server-side grešku bez osobnih podataka gdje je moguće

### Email sadržaj

Subject:

```txt
Novi upit — Orguljarstvo Kvaternik — {vrstaUpita}
```

Email treba sadržavati:

- ime i prezime
- email
- telefon
- vrstu upita
- lokaciju instrumenta
- poruku
- datum i vrijeme
- reply-to korisnikov email

### Opcionalno

Poslati automatsku potvrdu korisniku tek nakon odobrenja teksta od strane Alena.

---

## 14. SEO

### Metadata

Predloženi title:

```txt
Orguljarstvo Kvaternik | Izrada, obnova i održavanje orgulja
```

Predloženi description:

```txt
Orguljarstvo Kvaternik pruža usluge izrade, obnove, restauracije i održavanja orgulja uz individualan pristup svakom instrumentu i prostoru.
```

Tekst se mora doraditi kada se potvrde lokacija i područje djelovanja.

### Obavezno

- metadata na svakoj stranici
- Open Graph
- sitemap
- robots
- canonical URL
- favicon
- OG cover
- Organization ili LocalBusiness JSON-LD
- BreadcrumbList za unutarnje stranice
- Project/CreativeWork schema samo ako podatci imaju smisla

Ne unositi lažnu adresu, radno vrijeme ili ocjene u strukturirane podatke.

---

## 15. Pristupačnost

- WCAG AA kontrast
- vidljiv focus state
- skip-to-content
- semantički heading redoslijed
- forma s povezanim labelama
- aria-live za status slanja
- mobilni menu dostupan tipkovnicom
- lightbox dostupan tipkovnicom
- reduced-motion podrška
- svi alt tekstovi smisleni

---

## 16. Performance

Ciljevi:

- Lighthouse Performance 90+
- Accessibility 95+
- Best Practices 95+
- SEO 95+

Zahtjevi:

- next/image
- AVIF/WebP gdje je moguće
- hero image priority
- ostale slike lazy
- precizne image dimensions
- bez layout shiftova
- minimalan broj client components
- dinamički import lightboxa
- lokalno učitavanje fontova preko next/font

---

## 17. Analitika i privatnost

Prva verzija može raditi bez analitike.

Ako se doda analitika:

- koristiti privacy-friendly rješenje gdje je moguće
- ne učitavati nepotrebne trackere
- cookie banner prikazati samo ako su kolačići stvarno potrebni

Kontakt-forma mora imati jasnu privolu i link na pravila privatnosti.

---

## 18. Placeholder fotografije

Za razvoj se koriste privremene fotografije s Wikimedia Commonsa. One moraju biti označene s `temporary: true`.

Prije javne objave:

1. provjeriti licencu svake fotografije
2. dodati autora i izvor gdje je potrebno
3. zamijeniti ih Alenovim fotografijama
4. ukloniti lažne ili generičke projektne opise
5. potvrditi sve lokacije i godine

---

## 19. Prihvatni kriteriji

Projekt je spreman za pregled kada:

- sve navedene rute postoje
- nema 404 linkova u navigaciji
- kontakt-forma šalje testni email
- validacija radi na klijentu i serveru
- sve fotografije imaju alt tekst
- mobile menu radi
- projektni filteri rade
- lightbox radi tipkovnicom
- nema horizontalnog scrolla
- metadata postoji na svim stranicama
- sitemap i robots rade
- stranica prolazi `npm run build`
- placeholder podatci su centralizirani
- nema izmišljenih biografskih ili poslovnih činjenica prikazanih kao potvrđenih

---

## 20. Redoslijed implementacije u Cursoru

### Faza 1

- postavljanje Next.js projekta
- fontovi, boje, layout, navbar, footer
- data datoteke
- početna stranica

### Faza 2

- unutarnje stranice
- projekti i dinamičke rute
- galerija i lightbox

### Faza 3

- kontakt-forma
- Resend
- rate limit i error states

### Faza 4

- SEO
- accessibility
- performance
- responsive polish

### Faza 5

- zamjena sadržaja i fotografija stvarnim materijalima
- finalni pregled s Alenom
