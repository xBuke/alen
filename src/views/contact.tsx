import { Suspense } from "react";

import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page/page-hero";
import { getContactPage, getSiteConfig } from "@/content";
import type { Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";

export function ContactView({ locale }: { locale: Locale }) {
  const t = getUi(locale);
  const siteConfig = getSiteConfig(locale);
  const { hero, directContact } = getContactPage(locale);
  const addressLines = siteConfig.address.split(", ");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: t.homeLabel, href: "/" },
          { label: hero.breadcrumbLabel, href: "/kontakt" },
        ]}
        locale={locale}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbLabel={hero.breadcrumbLabel}
        locale={locale}
      />

      <section className="section-padding border-t border-border-dark bg-background">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <div>
              <h2 className="text-2xl md:text-3xl">{t.contact.direct}</h2>

              <address className="mt-6 space-y-1 not-italic font-body text-base text-text-light">
                <p className="font-medium">{siteConfig.legalName}</p>
                <p>{addressLines[0]}</p>
                <p>{addressLines[1]}</p>
              </address>

              <dl className="mt-8 space-y-4 font-body text-base">
                <div>
                  <dt className="text-xs uppercase tracking-[0.15em] text-gold">
                    {t.contact.phone}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={siteConfig.phoneHref}
                      className="text-text-light transition-colors hover:text-gold"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.15em] text-gold">
                    {t.contact.email}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="break-all text-text-light transition-colors hover:text-gold"
                    >
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
              </dl>

              <p className="mt-8 max-w-md text-sm leading-relaxed text-text-muted md:text-base">
                {directContact.hint}
              </p>
            </div>

            <div className="border-t border-border-dark pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0 xl:pl-16">
              <h2 className="text-2xl md:text-3xl">{t.contact.sendTitle}</h2>
              <p className="mt-3 max-w-lg text-sm text-text-muted md:text-base">
                {t.contact.sendIntro}
              </p>
              <div className="mt-8">
                <Suspense
                  fallback={
                    <p className="text-sm text-text-muted">
                      {t.contact.loadingForm}
                    </p>
                  }
                >
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
