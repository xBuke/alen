# Postavljanje projekta — Orguljarstvo Kvaternik

## Lokalno pokretanje

```bash
npm install
npm run dev
```

Aplikacija je dostupna na `http://localhost:3000`.

## Env varijable

| Varijabla | Opis |
|-----------|------|
| `NEXT_PUBLIC_SITE_URL` | Javni URL produkcijske stranice (npr. `https://orguljarstvo-kvaternik.hr`). Koristi se za canonical URL-ove i sitemap. |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms ključ za kontaktni obrazac. Javni je (smije biti u kodu preglednika). Nakon postavljanja na Vercelu treba redeploy. |

## Kontaktni obrazac (upiti)

`src/components/forms/contact-form.tsx`:

- **Pošaljite upit** šalje upit automatski preko [Web3Forms](https://web3forms.com) na adresu za koju je ključ izdan (alen.kvaternik@gmail.com). "Odgovori" u mailu ide posjetitelju.
- **Pošaljite na WhatsApp** otvara `wa.me/<siteConfig.whatsapp>` s gotovom porukom.
- Dok ključ nije postavljen (ili ako Web3Forms ne odgovori), poruka se otvori u posjetiteljevoj e-pošti (`mailto:`), kao na vinagovorko.hr.
- Besplatni plan: 250 upita mjesečno.

Ključ: na web3forms.com upisati alen.kvaternik@gmail.com; ključ stiže na tu adresu. Broj za WhatsApp je u `src/data/site.ts` (`whatsapp`).

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
