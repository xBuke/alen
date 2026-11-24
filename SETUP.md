# Postavljanje projekta — Orguljarstvo Kvaternik

## Lokalno pokretanje

```bash
npm install
npm run dev
```

Aplikacija je dostupna na `http://localhost:3000`.

Stranica ne treba nikakve tajne ključeve. Jedina env varijabla je `NEXT_PUBLIC_SITE_URL`.

## Env varijable

| Varijabla | Opis |
|-----------|------|
| `NEXT_PUBLIC_SITE_URL` | Javni URL produkcijske stranice (npr. `https://orguljarstvo-kvaternik.hr`). Koristi se za canonical URL-ove i sitemap. |

## Kontaktni obrazac (upiti)

Radi kao na vinagovorko.hr, bez servera i bez ključeva (`src/components/forms/contact-form.tsx`):

- posjetitelj ispuni polja (ime, e-pošta ili telefon, vrsta upita, lokacija, poruka)
- obrazac složi poruku na jeziku stranice (HR/EN)
- „E-pošte” otvara posjetiteljevu aplikaciju za e-poštu (`mailto:`) s gotovom porukom na `siteConfig.contactRecipient`
- „WhatsAppa” otvara `wa.me/<siteConfig.whatsapp>` s gotovom porukom
- posjetitelj poruku samo pošalje; stranica ništa ne sprema

Adresa i broj mijenjaju se u `src/data/site.ts` (`contactRecipient`, `whatsapp`).

## Preview okruženja

Za preview deployment koji ne smije biti indeksiran, postavite `X-Robots-Tag: noindex, nofollow` na razini hostinga ili koristite zasebnu preview domenu. Ne postavljajte preview URL kao produkcijsku `NEXT_PUBLIC_SITE_URL` vrijednost. Detalji su u `PRODUCTION_CHECKLIST.md`.

## Pravna provjera

Prije produkcijske objave potvrdite:

- [ ] pravni temelj obrade u Pravilima privatnosti
- [ ] konkretne interne rokove čuvanja podataka
- [ ] hosting pružatelja i lokaciju obrade
- [ ] dopunu Impressuma zakonski potrebnim registarskim podacima
- [ ] konačan tekst Pravila privatnosti

Stranice Pravila privatnosti i Impressum prikazuju development badge dok je `LEGAL_REVIEW_REQUIRED = true`.
