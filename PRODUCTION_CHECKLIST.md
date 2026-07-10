# Production checklist — Orguljarstvo Kvaternik

Koristite ovaj popis prije javne objave. Ne označavajte stavke kao dovršene dok nisu stvarno provjerene.

## Sadržaj

- [ ] potvrditi konačan opis Servisa
- [ ] dobiti stvarne fotografije radionice
- [ ] dobiti potvrđeni portret Alena, ako ga želi prikazati
- [ ] dobiti podatke o stvarnim projektima
- [ ] provjeriti licence privremenih fotografija
- [ ] ukloniti ili zamijeniti privremene stock fotografije

## Kontakt

- [ ] verificirati domenu u Resendu
- [ ] postaviti `RESEND_API_KEY`
- [ ] postaviti `CONTACT_FROM_EMAIL`
- [ ] potvrditi `CONTACT_TO_EMAIL`
- [ ] testirati stvarno slanje
- [ ] testirati reply-to

## Rate limit

- [ ] kreirati Upstash Redis
- [ ] postaviti URL i token
- [ ] generirati trajni `RATE_LIMIT_SALT`
- [ ] testirati 429

## Pravno

- [ ] pravni pregled Pravila privatnosti
- [ ] potvrditi pravni temelj
- [ ] potvrditi rokove čuvanja
- [ ] potvrditi hosting i prijenose podataka
- [ ] dopuniti Impressum
- [ ] ukloniti legal-review status tek nakon odobrenja

## Domena i objava

- [ ] postaviti produkcijske env varijable
- [ ] spojiti domenu
- [ ] provjeriti HTTPS
- [ ] provjeriti www/non-www redirect
- [ ] provjeriti sitemap
- [ ] provjeriti robots.txt
- [ ] provjeriti Open Graph preview
- [ ] provjeriti favicon
- [ ] testirati kontakt-formu na produkcijskoj domeni

## Preview okruženja (noindex)

Za staging ili preview deployment koji ne smije biti indeksiran:

- postavite `NEXT_PUBLIC_SITE_URL` na preview URL samo za to okruženje
- u hosting postavkama dodajte `X-Robots-Tag: noindex, nofollow` header za preview domenu, ili
- na Vercelu koristite Environment Variables za Preview i postavite zaseban layout/metadata override ako je potrebno

Ne postavljajte preview URL kao produkcijsku `NEXT_PUBLIC_SITE_URL` vrijednost.
