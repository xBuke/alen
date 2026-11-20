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
const STATEMENT_DATE_ISO = "2026-11-20";
const STATEMENT_DATE = { hr: "20. studenoga 2026.", en: "20 November 2026" };
const REVIEW_DATE_ISO = "2026-11-20";
const REVIEW_DATE = { hr: "20. studenoga 2026.", en: "20 November 2026" };

const linkClass =
  "text-gold underline decoration-gold/60 underline-offset-4 hover:decoration-gold";

export const accessibilityMetadata = {
  hr: {
    title: "Izjava o pristupačnosti",
    description:
      "Izjava o pristupačnosti mrežne stranice Orguljarstva Kvaternik: status usklađenosti s WCAG 2.1 razina AA (EN 301 549), način procjene i kontakt za povratne informacije.",
  },
  en: {
    title: "Accessibility statement",
    description:
      "Accessibility statement for the Orguljarstvo Kvaternik website: conformance with WCAG 2.1 level AA (EN 301 549), how it was assessed and how to send feedback.",
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
                  (v3.2.1), odnosno Smjernice za pristupačnost web-sadržaja
                  (WCAG) 2.1 na razini AA.
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
                  stranice, odnosno sa svim kriterijima uspjeha WCAG 2.1 razine A
                  i AA.
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
                    automatska testiranja alatima axe-core (pravila WCAG 2.0 i
                    2.1, razine A i AA) i Google Lighthouse, na prikazu za
                    stolno računalo i za mobitel;
                  </li>
                  <li>
                    ručnu provjeru: rad samo tipkovnicom (redoslijed i
                    vidljivost fokusa, izostanak zamki), izbornik na mobitelu,
                    galeriju i preglednik fotografija, obrazac (oznake, poruke o
                    pogreškama, automatsko popunjavanje), kontrast teksta i
                    elemenata sučelja, alternativne tekstove slika, strukturu
                    naslova i orijentira, oznake jezika, povećanje na 200 % i
                    prikaz na širini od 320 piksela, poštivanje postavke
                    smanjenog kretanja te naslove stranica.
                  </li>
                </ul>
                <p>
                  Izjava je posljednji put preispitana{" "}
                  <time dateTime={REVIEW_DATE_ISO}>{REVIEW_DATE.hr}</time>.
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
                  We use the European standard EN 301 549 (v3.2.1), that is,
                  the Web Content Accessibility Guidelines (WCAG) 2.1 at level
                  AA, as our benchmark.
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
                  with the requirements of EN 301 549 that apply to websites,
                  that is, with all WCAG 2.1 level A and AA success criteria.
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
                    automated testing with axe-core (WCAG 2.0 and 2.1 rules,
                    levels A and AA) and Google Lighthouse, in desktop and
                    mobile views;
                  </li>
                  <li>
                    manual checks: keyboard-only use (focus order and
                    visibility, no keyboard traps), the mobile menu, the gallery
                    and photo viewer, the form (labels, error messages,
                    autocomplete), contrast of text and interface elements, text
                    alternatives for images, heading and landmark structure,
                    language markup, 200% zoom and display at a width of 320
                    pixels, respect for the reduced motion setting, and page
                    titles.
                  </li>
                </ul>
                <p>
                  The statement was last reviewed on{" "}
                  <time dateTime={REVIEW_DATE_ISO}>{REVIEW_DATE.en}</time>.
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
