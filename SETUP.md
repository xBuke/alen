# Postavljanje projekta — Orguljarstvo Kvaternik

## Lokalno pokretanje

```bash
npm install
npm run dev
```

Aplikacija je dostupna na `http://localhost:3000`.

Build i prikaz stranice rade i bez `.env.local`. Kontaktna forma bez konfiguriranog Resenda vraća kontroliranu grešku pri slanju.

## Potrebne env varijable

Stvarne vrijednosti postavite u `.env.local` ili u hosting secrets. Datoteka `.env.local` se ne smije commitati.

| Varijabla | Opis |
|-----------|------|
| `NEXT_PUBLIC_SITE_URL` | Javni URL produkcijske stranice (npr. `https://orguljarstvo-kvaternik.hr`). Koristi se za canonical URL-ove, sitemap i provjeru Origin headera. |
| `RESEND_API_KEY` | API ključ za Resend. Koristi se isključivo na serveru. |
| `CONTACT_TO_EMAIL` | Adresa na koju stižu upiti s kontaktne forme. Preporučena vrijednost: `alen.kvaternik@gmail.com`. |
| `CONTACT_FROM_EMAIL` | Pošiljatelj e-pošte s **verificirane Resend domene**, npr. `Orguljarstvo Kvaternik <web@orguljarstvo-kvaternik.hr>`. Bez verificirane domene slanje neće raditi u produkciji. |
| `UPSTASH_REDIS_REST_URL` | REST URL Upstash Redis baze za perzistentni rate limit u produkciji. |
| `UPSTASH_REDIS_REST_TOKEN` | REST token Upstash Redis baze. Koristi se isključivo na serveru. |
| `RATE_LIMIT_SALT` | Duga nasumična tajna za HMAC hashiranje IP adresa pri rate limitu. **Potrebna je u produkciji** za konzistentan limit između više instanci. Bez nje svaka instanca koristi vlastiti procesni salt. Ne dijelite je javno. |

Za lokalni razvoj dovoljno je `NEXT_PUBLIC_SITE_URL=http://localhost:3000` ako testirate Origin provjeru.

## Resend setup

1. Otvorite račun na [resend.com](https://resend.com).
2. Verificirajte domenu za slanje e-pošte (npr. `orguljarstvo-kvaternik.hr`).
3. Kreirajte API ključ i postavite `RESEND_API_KEY`.
4. Postavite `CONTACT_FROM_EMAIL` na adresu s verificirane domene.
5. Postavite `CONTACT_TO_EMAIL` na adresu koja prima upite.
6. Testirajte kontakt formu lokalno ili na staging okruženju.

Napomena: domena još nije nužno verificirana u vašem Resend računu — to morate dovršiti prije produkcijskog slanja.

## Upstash setup

Serverless produkcija treba perzistentni rate limiter (Upstash ili ekvivalent). Bez toga koristi se ograničeni in-memory fallback koji nije pouzdan na više instanci.

1. Kreirajte Redis bazu na [upstash.com](https://upstash.com).
2. Kopirajte REST URL i token u `UPSTASH_REDIS_REST_URL` i `UPSTASH_REDIS_REST_TOKEN`.
3. Generirajte dugu nasumičnu vrijednost za `RATE_LIMIT_SALT`.
4. Testirajte slanjem više od tri zahtjeva u 15 minuta s iste IP adrese.

Pravilo: **3 zahtjeva po 15 minuta** po HMAC hashiranom identifikatoru (ne pohranjuje se puni IP).

Ako su Upstash varijable postavljene, ali Redis privremeno ne odgovara, API koristi privremeni memory fallback za taj zahtjev i ponovno pokušava Upstash na sljedećem zahtjevu.

## Preview okruženja

Za preview deployment koji ne smije biti indeksiran, postavite `X-Robots-Tag: noindex, nofollow` na razini hostinga ili koristite zasebnu preview domenu. Ne postavljajte preview URL kao produkcijsku `NEXT_PUBLIC_SITE_URL` vrijednost. Detalji su u `PRODUCTION_CHECKLIST.md`.

## Testiranje bez Resenda

- `npm run build` prolazi bez env varijabli.
- Kontakt stranica se normalno renderira.
- Submit forme bez `RESEND_API_KEY` i `CONTACT_FROM_EMAIL` vraća HTTP `503` i korisniku prikazuje generičku poruku o grešci.
- U development modu server bilježi upozorenje o nedostajućoj konfiguraciji (bez osobnih podataka).

## Pravna provjera

Prije produkcijske objave potvrdite:

- [ ] pravni temelj obrade u Pravilima privatnosti
- [ ] konkretne interne rokove čuvanja podataka
- [ ] hosting pružatelja i lokaciju obrade
- [ ] Resend ugovorne i prijenosne mehanizme izvan EGP-a
- [ ] dopunu Impressuma zakonski potrebnim registarskim podacima
- [ ] konačan tekst Pravila privatnosti

Stranice Pravila privatnosti i Impressum prikazuju development badge dok je `LEGAL_REVIEW_REQUIRED = true`.
