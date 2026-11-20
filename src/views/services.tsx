import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { MotionReveal } from "@/components/media/motion-reveal";
import { SiteImage } from "@/components/media/site-image";
import { PageContactCta } from "@/components/sections/page/page-contact-cta";
import { PageHero } from "@/components/sections/page/page-hero";
import { Button } from "@/components/ui/button";
import { getServices, getServicesPage } from "@/content";
import { localizeHash, localizePath, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";
import { cn } from "@/lib/utils";

export function ServicesView({ locale }: { locale: Locale }) {
  const t = getUi(locale);
  const services = getServices(locale);
  const { hero } = getServicesPage(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: t.homeLabel, href: "/" },
          { label: hero.breadcrumbLabel, href: "/usluge" },
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

      {services.map((service, index) => {
        const isEven = index % 2 === 0;
        const detail = service.pageDetail;
        const number = String(index + 1).padStart(2, "0");

        return (
          <section
            key={service.slug}
            id={localizeHash(service.slug, locale)}
            className={cn(
              "section-padding scroll-mt-20",
              isEven ? "bg-background" : "bg-ivory",
            )}
          >
            <div className="container-site">
              <div
                className={cn(
                  "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
                  !isEven && "lg:[&>*:first-child]:order-2",
                )}
              >
                <MotionReveal>
                  <div
                    className={cn(
                      "relative aspect-[4/3] overflow-hidden",
                      !isEven && "lg:order-1",
                    )}
                  >
                    <SiteImage
                      image={service.image}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="absolute inset-0"
                    />
                  </div>
                </MotionReveal>

                <MotionReveal delay={0.1}>
                  <div>
                    <div className="mb-6 flex items-center gap-4">
                      <span
                        className={cn(
                          "font-body text-sm font-medium tracking-[0.2em]",
                          isEven ? "text-gold" : "text-bronze",
                        )}
                      >
                        {number}
                      </span>
                      <span
                        className={cn(
                          "h-px flex-1",
                          isEven ? "bg-gold/40" : "bg-border-light",
                        )}
                        aria-hidden="true"
                      />
                    </div>

                    <h2
                      className={cn(
                        "text-balance text-2xl sm:text-3xl md:text-4xl",
                        !isEven && "text-text-dark",
                      )}
                    >
                      {service.title}
                    </h2>

                    <p
                      className={cn(
                        "mt-6 text-base md:text-lg",
                        !isEven ? "text-text-dark/80" : "text-text-muted",
                      )}
                    >
                      {service.description}
                    </p>

                    {detail?.additionalText ? (
                      <p
                        className={cn(
                          "mt-4 text-base md:text-lg",
                          !isEven ? "text-text-dark/70" : "text-text-muted",
                        )}
                      >
                        {detail.additionalText}
                      </p>
                    ) : null}

                    {detail?.note ? (
                      <p
                        className={cn(
                          "mt-4 text-sm italic md:text-base",
                          !isEven ? "text-text-dark/70" : "text-text-muted/80",
                        )}
                      >
                        {detail.note}
                      </p>
                    ) : null}

                    {detail?.cta ? (
                      <Button
                        asChild
                        variant={isEven ? "default" : "secondaryOnLight"}
                        // Duže oznake (EN) smiju se prelomiti na 320 px (WCAG 1.4.10).
                        className="mt-8 h-auto min-h-11 whitespace-normal py-2 text-center"
                      >
                        <Link href={localizePath(detail.cta.href, locale)}>
                          {detail.cta.label}
                        </Link>
                      </Button>
                    ) : null}
                  </div>
                </MotionReveal>
              </div>
            </div>
          </section>
        );
      })}

      <PageContactCta locale={locale} />
    </>
  );
}
