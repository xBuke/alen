import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { Container } from "@/components/layout/container";
import {
  LegalContent,
  LegalReviewBadge,
  LegalSection,
} from "@/components/legal/legal-page";
import { PageHero } from "@/components/sections/page/page-hero";
import { getImpressum } from "@/content";
import type { Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";

export function ImprintView({ locale }: { locale: Locale }) {
  const t = getUi(locale);
  const impressum = getImpressum(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: t.homeLabel, href: "/" },
          { label: impressum.breadcrumbLabel, href: "/impressum" },
        ]}
        locale={locale}
      />

      <PageHero
        title={impressum.metadata.title}
        breadcrumbLabel={impressum.breadcrumbLabel}
        locale={locale}
      />

      <section className="section-padding border-t border-border-dark bg-background">
        <Container>
          <LegalReviewBadge locale={locale} />

          <LegalContent>
            <LegalSection title={t.legal.companyData}>
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
                          {...(field.value === "orguljarstvo-kvaternik.hr"
                            ? {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                            : {})}
                        >
                          {field.value}
                          {field.value === "orguljarstvo-kvaternik.hr" ? (
                            <span className="sr-only"> {t.newWindow}</span>
                          ) : null}
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
