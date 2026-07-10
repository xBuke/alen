import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { Container } from "@/components/layout/container";
import {
  LegalContent,
  LegalReviewBadge,
  LegalSection,
} from "@/components/legal/legal-page";
import { PageHero } from "@/components/sections/page/page-hero";
import { impressum } from "@/data/legal";

export const metadata: Metadata = {
  title: impressum.metadata.title,
  description: impressum.metadata.description,
  alternates: {
    canonical: impressum.metadata.canonical,
  },
  openGraph: {
    title: `${impressum.metadata.title} | Orguljarstvo Kvaternik`,
    description: impressum.metadata.description,
  },
};

export default function ImpressumPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Početna", href: "/" },
          { label: "Impressum", href: "/impressum" },
        ]}
      />

      <PageHero
        title={impressum.metadata.title}
        breadcrumbLabel={impressum.breadcrumbLabel}
      />

      <section className="section-padding border-t border-border-dark bg-background">
        <Container>
          <LegalReviewBadge />

          <LegalContent>
            <LegalSection title="Podatci o društvu">
              <dl className="space-y-5">
                {impressum.fields.map((field) => (
                  <div
                    key={field.label}
                    className="border-b border-border-dark pb-5 last:border-b-0 last:pb-0"
                  >
                    <dt className="font-body text-xs uppercase tracking-[0.15em] text-gold">
                      {field.label}
                    </dt>
                    <dd className="mt-2 text-text-light">
                      {"href" in field && field.href ? (
                        <a
                          href={field.href}
                          className="break-all text-text-light transition-colors hover:text-gold"
                          {...(field.label === "Web"
                            ? {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                            : {})}
                        >
                          {field.value}
                        </a>
                      ) : (
                        field.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </LegalSection>
          </LegalContent>
        </Container>
      </section>
    </>
  );
}
