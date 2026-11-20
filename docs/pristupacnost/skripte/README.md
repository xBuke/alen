# Skripte za provjeru pristupačnosti

Skripte korištene u reviziji od 20. studenoga 2026. (vidi `docs/IZVJESTAJ_PRISTUPACNOST.md`).
Nisu dio aplikacije i ne objavljuju se na stranici.

## Priprema

```bash
mkdir -p /tmp/a11y && cp docs/pristupacnost/skripte/* /tmp/a11y/ && cd /tmp/a11y
npm init -y
npm i lighthouse@12 axe-core @axe-core/puppeteer puppeteer-core pngjs
```

Skripte očekuju Chrome na `/usr/bin/google-chrome` (promijeniti `executablePath` po potrebi)
i pokrenutu produkcijsku verziju stranice (`npm run build && npm run start`).

`build.sh` i `fonts.local.ts` služe samo za build u okruženju bez pristupa Google Fontsima:
privremeno zamjenjuju `src/lib/fonts.ts` lokalnim kopijama istih fontova i nakon builda ga vraćaju.
U normalnom okruženju nisu potrebni. Putanje u `build.sh` treba prilagoditi.

## Pokretanje

| Skripta | Što radi |
|---|---|
| `node axe.mjs http://localhost:3000 axe.json` | axe-core (WCAG 2.0/2.1 A i AA + best-practice), sve stranice iz `urls.txt`, desktop 1350 px i mobitel 390 px |
| `node lh.mjs http://localhost:3000 lighthouse` | Lighthouse 12, sve kategorije, mobitel i desktop; sprema JSON i HTML izvještaje |
| `node manual.mjs http://localhost:3000 rucno.txt` | tipkovnica (redoslijed i vidljivost fokusa, zamke), skip link, mobilni izbornik, galerija i lightbox, obrazac s greškama, svirale, anatomija, smanjeno kretanje, reflow 320 px i 640 px (200 %), razmak teksta |
| `node imgcontrast.mjs http://localhost:3000 kontrast.json` | kontrast teksta preko fotografija i gradijenata (slučajevi koje axe označi kao „incomplete”), mjerenjem piksela pozadine |
| `node labels.mjs` | kontrast oznaka „Prije/Poslije” koje imaju vlastitu poluprozirnu podlogu |
| `node structure.mjs http://localhost:3000 struktura.json` | naslovi stranica, `lang`, `hreflang`, orijentiri, hijerarhija naslova, alt tekstovi, poveznice u novom prozoru |
| `contrast.mjs` | pomoćne funkcije za omjer kontrasta (WCAG formula) |

Automatski alati ne zamjenjuju provjeru čitačem zaslona (NVDA, VoiceOver, TalkBack).
