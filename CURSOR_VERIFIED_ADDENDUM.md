# CURSOR DODATAK — KORIŠTENJE PROVJERENIH ALENOVIH IZVORA

Prije izmjene stranice pročitaj:

- `ALEN_MEDIA_RESEARCH.md`
- `OFFICIAL_ASSET_MANIFEST.md`
- `siteContent.ts`

## Pravila

1. Službene poslovne podatke uzmi iz `siteContent.ts`.
2. U Impressumu prikaži pravni naziv, adresu i OIB.
3. U kontaktu prikaži telefon, e-poštu i adresu.
4. Koristi slike iz `officialImages` prije generičkih Wikimedia slika.
5. Fotografije označene `verifiedAsKvaternikProject: false` ne prikazuj pod nazivom izmišljene crkve ili projekta.
6. Ne prikazuj tuđi ili AI portret kao Alena.
7. Ako je `alenProfile.portrait === null`, prikaži:
   - tekstualni editorial blok,
   - monogram AK,
   - neutralni detalj orgulja,
   bez lažnog portreta.
8. Sekciju “Mediji i intervjui” prikaži samo ako `mediaAppearances.length > 0`.
9. U uslugama istakni potvrđene posebnosti:
   - nove orgulje s klasičnom mehaničkom trakturom
   - digitalna elektromagnetska traktura za nove i postojeće orgulje
   - intonacija prilagođena crkvi ili drugom prostoru
10. U footeru linkaj postojeću domenu `https://orguljarstvo-kvaternik.hr/`.

## Vizualna raspodjela službenih fotografija

- Hero: `officialImages.hero`
- Izrada: `officialImages.construction`
- Servis / cijevi: `officialImages.service`
- Restauracija: `officialImages.restoration`
- Kontakt CTA: `officialImages.contactBackground`

## Development badge

U development modu možeš prikazati mali badge:

`Privremena fotografija sa postojeće službene stranice`

U production modu badge sakrij, ali zadrži podatke o izvoru u kodu.
