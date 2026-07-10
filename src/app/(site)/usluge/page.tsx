import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { MotionReveal } from "@/components/media/motion-reveal";
import { SiteImage } from "@/components/media/site-image";
import { PageContactCta } from "@/components/sections/page/page-contact-cta";
import { PageHero } from "@/components/sections/page/page-hero";
import { Button } from "@/components/ui/button";
import { services, servicesPage } from "@/data/services";
import { createPageMetadata } from "@/lib/page-metadata";
import { cn } from "@/lib/utils";

export const metadata = createPageMetadata({
  title: servicesPage.metadata.title,
  description: servicesPage.metadata.description,
  path: "/usluge",
});

export default function ServicesPage() {
  const { hero } = servicesPage;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Početna", href: "/" },
          { label: "Usluge", href: "/usluge" },
        ]}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbLabel={hero.breadcrumbLabel}
      />

      {services.map((service, index) => {
        const isEven = index % 2 === 0;
        const detail = service.pageDetail;
        const number = String(index + 1).padStart(2, "0");

        return (
          <section
            key={service.slug}
            id={service.slug}
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
                          !isEven ? "text-text-dark/60" : "text-text-muted/80",
                        )}
                      >
                        {detail.note}
                      </p>
                    ) : null}

                    {detail?.cta ? (
                      <Button
                        asChild
                        variant={isEven ? "default" : "secondary"}
                        className="mt-8 rounded-sm"
                      >
                        <Link href={detail.cta.href}>{detail.cta.label}</Link>
                      </Button>
                    ) : null}
                  </div>
                </MotionReveal>
              </div>
            </div>
          </section>
        );
      })}

      <PageContactCta />
    </>
  );
}
