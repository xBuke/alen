# Ponovna provjera pristupačnosti — orguljarstvo-kvaternik.hr

**Datum:** 28. studenoga 2026. · **Izradio:** MangAI (Marko Škorić) · **Mjerilo:** WCAG 2.1, razine A i AA
**Povod:** stranica se navodi kao višejezična referenca usklađena s WCAG 2.1 AA (MUO, JN 57/2026).
Nastavak na reviziju od 20. 11. 2026. (`docs/IZVJESTAJ_PRISTUPACNOST.md`). Interni dokument.

## Što je provjereno

Produkcijski build commita `07eb25e` (isti koji je objavljen na Vercelu kao produkcija), obje jezične inačice.

| Provjera | Opseg | Rezultat |
|---|---|---|
| axe-core 4.14.1 (WCAG 2.0/2.1 A i AA + najbolje prakse) | svih 24 stranice (12 HR + 12 EN), računalo 1350 px i mobitel 390 px = 48 provjera | **0 prekršaja** |
| axe-core s otvorenim sučeljima | mobilni izbornik, preglednik fotografija, obrazac s greškama, izbornik pristupačnosti (i sa svih 7 postavki uključeno) | **0 prekršaja** |
| Lighthouse 13.6 — pristupačnost | naslovnica, Usluge, Galerija, Kontakt na HR i EN, mobitel i računalo = 16 mjerenja | **100 / 100 na svima** |
| Tipkovnica | redoslijed fokusa na svim stranicama, „Preskoči na sadržaj” (prvi Tab, vidljiv iznad zaglavlja, Enter vodi u sadržaj), mobilni izbornik, galerija i preglednik (strelice, Esc, povrat fokusa), padajući izbornik, svirale | prolazi |
| Obrasci | vidljivi nazivi polja, `autocomplete`, poruke grešaka povezane s poljem (`aria-invalid`, `aria-describedby`), fokus na prvo neispravno polje, HR i EN | prolazi |
| Kontrast | axe (0 prekršaja) + mjerenje teksta preko fotografija i gradijenata (najniži izmjereni omjer 6,07 : 1) | prolazi |
| Alternativni tekstovi i struktura | alt tekstovi fotografija na oba jezika, jedan H1, hijerarhija naslova, `lang`, `hreflang`, orijentiri | prolazi |
| Prelamanje i smanjeno kretanje | 320 px i 640 px (zum 200 %) bez vodoravnog pomicanja na 24 stranice; `prefers-reduced-motion` gasi animacije | prolazi |

## Što je nađeno

Ništa što bi bio prekršaj WCAG 2.1 AA. Dvije dojave skripte za ručne provjere su lažno pozitivne i provjerene su posebno:
- „fokus ispod zaglavlja: Preskoči na sadržaj” — poveznica se u fokusu namjerno prikazuje **iznad** zaglavlja (z-index 100) i potpuno je vidljiva (snimka zaslona, provjera `elementFromPoint`);
- „razmak teksta: moguće odrezano” za istu poveznicu — odnosi se na stanje dok je skrivena izvan zaslona; u fokusu se tekst s povećanim razmacima (1.4.12) ne reže.

## Što je popravljeno

Ništa nije trebalo mijenjati u kodu. Popravci iz revizije od 20. 11. i izbornik pristupačnosti od 24. 11. su na mjestu.

## Što ostaje

- **Čitači zaslona:** nije testirano sa stvarnim čitačima (NVDA, VoiceOver, TalkBack); provjereni su nazivi, uloge i stanja. Preporuka ostaje: naslovnica, galerija i obrazac, oko 30 minuta.
- **Živa domena:** alati su pokrenuti na lokalnom buildu istog commita (domena nije dostupna iz radnog okruženja), sa zamjenskim kopijama istih fontova.
- **Performanse na mobitelu** (Lighthouse 67–98 u ovom mjerenju) nisu dio WCAG-a; vidi točku 6 izvještaja od 20. 11.
- Ovo je samoprocjena, ne certifikat treće strane.

## Zaključak

Na temelju automatske i ručne provjere stranica zadovoljava WCAG 2.1 razinu AA na obje jezične inačice. Rezultati: `docs/pristupacnost/rezultati-2026-11-28/`.
