import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { Container } from "@/components/layout/container";
import {
  LegalContent,
  LegalReviewBadge,
  LegalSection,
} from "@/components/legal/legal-page";
import { PageHero } from "@/components/sections/page/page-hero";
import { getPrivacyPolicy, getSiteConfig } from "@/content";
import type { Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";

export function PrivacyView({ locale }: { locale: Locale }) {
  const t = getUi(locale);
  const siteConfig = getSiteConfig(locale);
  const privacyPolicy = getPrivacyPolicy(locale);
  const lastIndex = privacyPolicy.sections.length - 1;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: t.homeLabel, href: "/" },
          {
            label: privacyPolicy.breadcrumbLabel,
            href: "/pravila-privatnosti",
          },
        ]}
        locale={locale}
      />

      <PageHero
        title={privacyPolicy.metadata.title}
        breadcrumbLabel={privacyPolicy.breadcrumbLabel}
        locale={locale}
      />

      <section className="section-padding border-t border-border-dark bg-background">
        <Container>
          <LegalReviewBadge locale={locale} />

          <nav
            aria-label={t.legal.tocAria}
            className="mx-auto mb-10 max-w-[52rem] border border-border-dark p-4 md:hidden"
          >
            <p className="mb-3 font-body text-xs uppercase tracking-[0.15em] text-gold">
              {t.legal.toc}
            </p>
            <ol className="space-y-2 font-body text-sm">
              {privacyPolicy.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-text-muted transition-colors hover:text-gold"
                  >
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <LegalContent>
            {privacyPolicy.sections.map((section, index) => (
              <LegalSection
                key={section.id}
                id={section.id}
                number={index + 1}
                title={section.title}
              >
                {"content" in section && section.content
                  ? section.content.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))
                  : null}

                {"intro" in section && section.intro ? (
                  <p>{section.intro}</p>
                ) : null}

                {"bullets" in section && section.bullets ? (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}

                {"outro" in section && section.outro ? (
                  <p>
                    {section.outro.includes("alen.kvaternik@gmail.com") ? (
                      <>
                        {t.legal.rightsOutro}{" "}
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="break-all text-gold underline-offset-4 hover:underline"
                        >
                          {siteConfig.email}
                        </a>
                        .
                      </>
                    ) : (
                      section.outro
                    )}
                  </p>
                ) : null}

                {index === 0 ? (
                  <address className="not-italic">
                    <p>{siteConfig.legalName}</p>
                    <p>{siteConfig.address}</p>
                    <p>
                      {t.legal.email}:{" "}
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="break-all text-gold underline-offset-4 hover:underline"
                      >
                        {siteConfig.email}
                      </a>
                    </p>
                    <p>
                      {t.legal.phone}:{" "}
                      <a
                        href={siteConfig.phoneHref}
                        className="text-gold underline-offset-4 hover:underline"
                      >
                        {siteConfig.phoneDisplay}
                      </a>
                    </p>
                  </address>
                ) : null}

                {index === lastIndex ? (
                  <p>
                    {t.legal.lastChange}:{" "}
                    <time dateTime="2026-07-10">
                      {privacyPolicy.lastUpdated}
                    </time>
                  </p>
                ) : null}
              </LegalSection>
            ))}
          </LegalContent>
        </Container>
      </section>
    </>
  );
}
