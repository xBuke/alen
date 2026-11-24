import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { Container } from "@/components/layout/container";
import { LegalContent, LegalSection } from "@/components/legal/legal-page";
import { PageHero } from "@/components/sections/page/page-hero";
import { getSiteConfig } from "@/content";
import { localizePath, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";

/**
 * Izjava o pristupačnosti u obliku oglednog obrasca iz Provedbene odluke
 * Komisije (EU) 2018/1523 i čl. 9. Zakona o pristupačnosti mrežnih stranica
 * (NN 17/19). Podatci o reviziji: docs/IZVJESTAJ_PRISTUPACNOST.md.
 *
 * Pri svakoj novoj procjeni ažurirati datume ispod.
 */
const STATEMENT_DATE_ISO = "2026-11-24";
const STATEMENT_DATE = { hr: "24. studenoga 2026.", en: "24 November 2026" };
const REVIEW_DATE_ISO = "2026-11-24";
const REVIEW_DATE = { hr: "24. studenoga 2026.", en: "24 November 2026" };

const linkClass =
  "text-gold underline decoration-gold/60 underline-offset-4 hover:decoration-gold";

export const accessibilityMetadata = {
  hr: {
    title: "Izjava o pristupačnosti",
    description:
      "Izjava o pristupačnosti mrežne stranice Orguljarstva Kvaternik: status usklađenosti s WCAG 2.2 razina AA i EN 301 549, način procjene i kontakt za povratne informacije.",
  },
  en: {
    title: "Accessibility statement",
    description:
      "Accessibility statement for the Orguljarstvo Kvaternik website: conformance with WCAG 2.2 level AA and EN 301 549, how it was assessed and how to send feedback.",
  },
} as const;

export function AccessibilityView({ locale }: { locale: Locale }) {
  const t = getUi(locale);
  const siteConfig = getSiteConfig(locale);
  const meta = accessibilityMetadata[locale];
  const contactHref = localizePath("/kontakt?vrsta=drugo", locale);
  const email = (
    <a href={`mailto:${siteConfig.email}`} className={`break-all ${linkClass}`}>
      {siteConfig.email}
    </a>
  );
  const phone = (
    <a href={siteConfig.phoneHref} className={linkClass}>
      {siteConfig.phoneDisplay}
    </a>
  );
  const commissionerEmail = (
    <a href="mailto:pristupacnost@pristupinfo.hr" className={`break-all ${linkClass}`}>
      pristupacnost@pristupinfo.hr
    </a>
  );
  const commissionerSite = (
    <a href="https://pristupinfo.hr/" className={linkClass}>
      pristupinfo.hr
    </a>
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: t.homeLabel, href: "/" },
          { label: meta.title, href: "/izjava-o-pristupacnosti" },
        ]}
        locale={locale}
      />

      <PageHero title={meta.title} breadcrumbLabel={meta.title} locale={locale} />

      <section className="section-padding border-t border-border-dark bg-background">
        <Container>
          {locale === "hr" ? (
            <LegalContent>
              <LegalSection title="Na što se izjava odnosi">
                <p>
                  {siteConfig.legalName} nastoji svoju mrežnu stranicu učiniti
                  pristupačnom svim korisnicima, uključujući osobe s
                  invaliditetom. Kao mjerilo koristimo europsku normu EN 301 549
                  (v3.2.1), koja se poziva na Smjernice za pristupačnost
                  web-sadržaja (WCAG) 2.1 na razini AA, te noviju inačicu WCAG
                  2.2 na razini AA, koja uključuje sve kriterije inačice 2.1.
                </p>
                <p>
                  Izjava je sastavljena prema obliku propisanom Zakonom o
                  pristupačnosti mrežnih stranica i programskih rješenja za
                  pokretne uređaje tijela javnog sektora (Narodne novine, broj
                  17/19) i Provedbenom odlukom Komisije (EU) 2018/1523 o oglednom
                  obrascu izjave o pristupačnosti. {siteConfig.legalName} nije
                  tijelo javnog sektora, pa ovu izjavu objavljujemo dobrovoljno.
                </p>
                <p>
                  Izjava se primjenjuje na mrežnu stranicu{" "}
                  <span className="break-all">https://orguljarstvo-kvaternik.hr</span>{" "}
                  i obuhvaća hrvatsku i englesku inačicu stranice.
                </p>
              </LegalSection>

              <LegalSection title="Status usklađenosti">
                <p>
                  Ova mrežna stranica <strong className="font-medium text-text-light">u potpunosti je usklađena</strong>{" "}
                  sa zahtjevima norme EN 301 549 koji se odnose na mrežne
                  stranice te sa svim kriterijima uspjeha WCAG 2.2 razine A i AA
                  (a time i WCAG 2.1 razine A i AA).
                </p>
              </LegalSection>

              <LegalSection title="Nepristupačni sadržaj">
                <p>
                  Procjenom nije utvrđen sadržaj koji ne zadovoljava zahtjeve
                  pristupačnosti.
                </p>
                <p>
                  Izjava se ne odnosi na vanjske mrežne stranice na koje
                  poveznice vode (primjerice izvore navedene u člancima na
                  blogu), jer na njihov sadržaj ne možemo utjecati.
                </p>
                <p>
                  Na naslovnici se svirale orgulja mogu „svirati” mišem, dodirom
                  ili tipkovnicom (strelice za odabir svirale, Enter ili
                  razmaknica za ton). Kratki tonovi oglašavaju se samo kao
                  odgovor na radnju korisnika i ne nose informaciju koja nije
                  dostupna i u tekstu stranice.
                </p>
              </LegalSection>

              <LegalSection title="Priprema ove izjave">
                <p>
                  Izjava je sastavljena{" "}
                  <time dateTime={STATEMENT_DATE_ISO}>{STATEMENT_DATE.hr}</time>{" "}
                  na temelju samoprocjene koju je proveo izrađivač i održavatelj
                  stranice (MangAI). Procjena je obuhvatila sve vrste stranica na
                  obje jezične inačice i uključivala je:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    automatska testiranja alatima axe-core 4.14 (pravila WCAG
                    2.0, 2.1 i 2.2, razine A i AA) i Google Lighthouse, na
                    prikazu za stolno računalo i za mobitel;
                  </li>
                  <li>
                    ručnu provjeru: rad samo tipkovnicom (redoslijed i
                    vidljivost fokusa, izostanak zamki), izbornik na mobitelu,
                    galeriju i preglednik fotografija, obrazac (oznake, poruke o
                    pogreškama, automatsko popunjavanje), kontrast teksta i
                    elemenata sučelja, alternativne tekstove slika, strukturu
                    naslova i orijentira, oznake jezika, povećanje na 200 % i
                    prikaz na širini od 320 piksela, poštivanje postavke
                    smanjenog kretanja te naslove stranica;
                  </li>
                  <li>
                    provjeru kriterija dodanih u WCAG 2.2: fokus tipkovnice
                    nije skriven ispod fiksnog zaglavlja ni plutajućeg gumba
                    (2.4.11), nijedna radnja ne zahtijeva povlačenje (2.5.7),
                    interaktivni elementi imaju najmanje 24 × 24 piksela ili
                    dovoljan razmak (2.5.8), kontakt je na istom mjestu na svim
                    stranicama (3.2.6), obrazac ne traži iste podatke dvaput
                    (3.3.7), a za slanje upita nije potrebna prijava (3.3.8);
                  </li>
                  <li>
                    provjeru izbornika pristupačnosti: rad tipkovnicom i
                    čitačem zaslona te prikaz svih stranica bez vodoravnog
                    pomicanja uz povećan tekst (do 160 %) i veće razmake, na
                    širinama od 320 do 1280 piksela.
                  </li>
                </ul>
                <p>
                  Izjava je posljednji put preispitana{" "}
                  <time dateTime={REVIEW_DATE_ISO}>{REVIEW_DATE.hr}</time>.
                </p>
              </LegalSection>

              <LegalSection title="Prilagodba prikaza">
                <p>
                  Gumb sa simbolom pristupačnosti u donjem lijevom kutu svake
                  stranice otvara izbornik u kojem možete povećati tekst,
                  pojačati kontrast, podcrtati poveznice, uključiti čitljivije
                  pismo i veće razmake, zaustaviti animacije, povećati
                  pokazivač miša i istaknuti fokus tipkovnice. Postavke se
                  pamte samo u Vašem pregledniku.
                </p>
                <p>
                  Izbornik je dio same stranice, a ne vanjski dodatak. Stranica
                  je pristupačna i bez njega, a izbornik ne zamjenjuje
                  postavke Vašeg preglednika, sustava ni pomoćne tehnologije
                  (npr. čitača zaslona).
                </p>
              </LegalSection>

              <LegalSection title="Povratne informacije i podatci za kontakt">
                <p>
                  Ako uočite sadržaj koji Vam nije pristupačan, želite prijaviti
                  neusklađenost ili zatražiti informacije sa stranice u drugom,
                  pristupačnom obliku, javite nam se:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>e-poštom: {email}</li>
                  <li>telefonom: {phone}</li>
                  <li>
                    putem{" "}
                    <Link href={contactHref} className={linkClass}>
                      kontaktnog obrasca
                    </Link>{" "}
                    (vrsta upita „Drugo”)
                  </li>
                </ul>
                <p>
                  Na obavijest ili zahtjev odgovorit ćemo najkasnije u roku od 15
                  dana od dana primitka.
                </p>
              </LegalSection>

              <LegalSection title="Postupak praćenja provedbe propisa">
                <p>
                  Nadzor nad provedbom Zakona o pristupačnosti mrežnih stranica i
                  programskih rješenja za pokretne uređaje tijela javnog sektora
                  provodi Povjerenik za informiranje Republike Hrvatske. Njegova
                  je nadležnost propisana za tijela javnog sektora; kako{" "}
                  {siteConfig.legalName} nije takvo tijelo, za sva pitanja o
                  pristupačnosti ove stranice najprije se obratite nama.
                </p>
                <p>
                  Povjerenik za informiranje, Trg žrtava fašizma 3, 10000 Zagreb;
                  e-pošta: {commissionerEmail}; mrežna stranica:{" "}
                  {commissionerSite}.
                </p>
              </LegalSection>
            </LegalContent>
          ) : (
            <LegalContent>
              <LegalSection title="Scope of this statement">
                <p>
                  {siteConfig.legalName} is committed to making its website
                  accessible to all users, including people with disabilities.
                  We use the European standard EN 301 549 (v3.2.1), which
                  refers to the Web Content Accessibility Guidelines (WCAG) 2.1
                  at level AA, and the newer WCAG 2.2 at level AA, which
                  includes all version 2.1 criteria, as our benchmark.
                </p>
                <p>
                  This statement follows the form prescribed by the Croatian Act
                  on the Accessibility of Websites and Mobile Applications of
                  Public Sector Bodies (
                  <span lang="hr">
                    Zakon o pristupačnosti mrežnih stranica i programskih
                    rješenja za pokretne uređaje tijela javnog sektora
                  </span>
                  , Official Gazette No. 17/19) and Commission Implementing
                  Decision (EU) 2018/1523 establishing a model accessibility
                  statement. {siteConfig.legalName} is not a public sector body,
                  so we publish this statement voluntarily.
                </p>
                <p>
                  This statement applies to the website{" "}
                  <span className="break-all">https://orguljarstvo-kvaternik.hr</span>{" "}
                  and covers both its Croatian and English versions.
                </p>
              </LegalSection>

              <LegalSection title="Compliance status">
                <p>
                  This website is{" "}
                  <strong className="font-medium text-text-light">fully compliant</strong>{" "}
                  with the requirements of EN 301 549 that apply to websites and
                  with all WCAG 2.2 level A and AA success criteria (and
                  therefore also WCAG 2.1 levels A and AA).
                </p>
              </LegalSection>

              <LegalSection title="Non-accessible content">
                <p>
                  The assessment did not identify any content that fails to
                  meet the accessibility requirements.
                </p>
                <p>
                  This statement does not cover external websites that we link
                  to (for example, the sources listed in blog articles), because
                  we cannot control their content.
                </p>
                <p>
                  On the home page, the organ pipes can be “played” with a
                  mouse, by touch or with the keyboard (arrow keys to choose a
                  pipe, Enter or Space to sound it). The short tones play only
                  in response to a user action and carry no information that is
                  not also available in the text of the page.
                </p>
              </LegalSection>

              <LegalSection title="Preparation of this statement">
                <p>
                  This statement was prepared on{" "}
                  <time dateTime={STATEMENT_DATE_ISO}>{STATEMENT_DATE.en}</time>{" "}
                  based on a self-assessment carried out by the developer and
                  maintainer of the website (MangAI). The assessment covered
                  every type of page in both language versions and included:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    automated testing with axe-core 4.14 (WCAG 2.0, 2.1 and 2.2
                    rules, levels A and AA) and Google Lighthouse, in desktop
                    and mobile views;
                  </li>
                  <li>
                    manual checks: keyboard-only use (focus order and
                    visibility, no keyboard traps), the mobile menu, the gallery
                    and photo viewer, the form (labels, error messages,
                    autocomplete), contrast of text and interface elements, text
                    alternatives for images, heading and landmark structure,
                    language markup, 200% zoom and display at a width of 320
                    pixels, respect for the reduced motion setting, and page
                    titles;
                  </li>
                  <li>
                    checks of the criteria added in WCAG 2.2: keyboard focus is
                    not hidden under the fixed header or the floating button
                    (2.4.11), no action requires dragging (2.5.7), interactive
                    elements are at least 24 × 24 pixels or have enough spacing
                    (2.5.8), contact details are in the same place on every
                    page (3.2.6), the form never asks for the same information
                    twice (3.3.7), and sending an inquiry requires no login
                    (3.3.8);
                  </li>
                  <li>
                    checks of the accessibility menu: keyboard and screen
                    reader use, and display of every page without horizontal
                    scrolling with enlarged text (up to 160%) and extra
                    spacing, at widths from 320 to 1280 pixels.
                  </li>
                </ul>
                <p>
                  The statement was last reviewed on{" "}
                  <time dateTime={REVIEW_DATE_ISO}>{REVIEW_DATE.en}</time>.
                </p>
              </LegalSection>

              <LegalSection title="Display settings">
                <p>
                  The button with the accessibility symbol in the bottom left
                  corner of every page opens a menu where you can enlarge text,
                  increase contrast, underline links, switch to a more readable
                  font and extra spacing, stop animations, enlarge the mouse
                  pointer and highlight keyboard focus. Your settings are kept
                  only in your browser.
                </p>
                <p>
                  The menu is part of the website itself, not an external
                  add-on. The website is accessible without it, and the menu
                  does not replace the settings of your browser, operating
                  system or assistive technology (such as a screen reader).
                </p>
              </LegalSection>

              <LegalSection title="Feedback and contact information">
                <p>
                  If you come across content that is not accessible to you,
                  want to report a compliance issue, or need information from
                  the website in another, accessible format, please contact us:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>by e-mail: {email}</li>
                  <li>by phone: {phone}</li>
                  <li>
                    through the{" "}
                    <Link href={contactHref} className={linkClass}>
                      contact form
                    </Link>{" "}
                    (inquiry type “Other”)
                  </li>
                </ul>
                <p>
                  We will reply within 15 days of receiving your notice or
                  request at the latest.
                </p>
              </LegalSection>

              <LegalSection title="Enforcement procedure">
                <p>
                  Compliance with the Croatian accessibility act is supervised
                  by the Information Commissioner of the Republic of Croatia (
                  <span lang="hr">Povjerenik za informiranje</span>). The
                  Commissioner’s remit covers public sector bodies; as{" "}
                  {siteConfig.legalName} is not such a body, please contact us
                  first with any question about the accessibility of this
                  website.
                </p>
                <p>
                  <span lang="hr">
                    Povjerenik za informiranje, Trg žrtava fašizma 3, 10000
                    Zagreb
                  </span>
                  ; e-mail: {commissionerEmail}; website: {commissionerSite}.
                </p>
              </LegalSection>
            </LegalContent>
          )}
        </Container>
      </section>
    </>
  );
}
