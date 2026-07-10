import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { Container } from "@/components/layout/container";
import {
  LegalContent,
  LegalReviewBadge,
  LegalSection,
} from "@/components/legal/legal-page";
import { PageHero } from "@/components/sections/page/page-hero";
import { privacyPolicy } from "@/data/legal";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: privacyPolicy.metadata.title,
  description: privacyPolicy.metadata.description,
  alternates: {
    canonical: privacyPolicy.metadata.canonical,
  },
  openGraph: {
    title: `${privacyPolicy.metadata.title} | Orguljarstvo Kvaternik`,
    description: privacyPolicy.metadata.description,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Početna", href: "/" },
          {
            label: "Pravila privatnosti",
            href: "/pravila-privatnosti",
          },
        ]}
      />

      <PageHero
        title={privacyPolicy.metadata.title}
        breadcrumbLabel={privacyPolicy.breadcrumbLabel}
      />

      <section className="section-padding border-t border-border-dark bg-background">
        <Container>
          <LegalReviewBadge />

          <nav
            aria-label="Sadržaj pravila privatnosti"
            className="mx-auto mb-10 max-w-[52rem] border border-border-dark p-4 md:hidden"
          >
            <p className="mb-3 font-body text-xs uppercase tracking-[0.15em] text-gold">
              Sadržaj
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
                        Za ostvarivanje prava možete nam se obratiti na{" "}
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

                {section.id === "voditelj-obrade" ? (
                  <address className="not-italic">
                    <p>ORGULJARSTVO KVATERNIK d.o.o.</p>
                    <p>Rudarska ulica 1, 48000 Draganovec</p>
                    <p>
                      E-pošta:{" "}
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="break-all text-gold underline-offset-4 hover:underline"
                      >
                        {siteConfig.email}
                      </a>
                    </p>
                    <p>
                      Telefon:{" "}
                      <a
                        href={siteConfig.phoneHref}
                        className="text-gold underline-offset-4 hover:underline"
                      >
                        {siteConfig.phoneDisplay}
                      </a>
                    </p>
                  </address>
                ) : null}

                {section.id === "izmjene" ? (
                  <p>
                    Zadnja izmjena:{" "}
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
