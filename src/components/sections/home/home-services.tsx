import type { ReactNode } from "react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { MotionReveal } from "@/components/media/motion-reveal";
import { SiteImage } from "@/components/media/site-image";
import { homeServicesSection } from "@/data/home";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

function ServiceLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group block transition-colors focus-visible:outline-none",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function HomeServices() {
  const [featured, ...rest] = services;

  return (
    <section className="section-padding bg-ivory">
      <Container>
        <MotionReveal>
          <SectionHeading
            dark
            eyebrow={homeServicesSection.eyebrow}
            title={homeServicesSection.title}
            description={homeServicesSection.description}
            className="mb-12 md:mb-16"
          />
        </MotionReveal>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Featured service */}
          <MotionReveal className="lg:col-span-7" delay={0.05}>
            <ServiceLink href={`/usluge#${featured.slug}`}>
              <article className="overflow-hidden rounded-sm border border-border-light bg-ivory">
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-[16/9]">
                  <SiteImage
                    image={featured.image}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="absolute inset-0"
                    imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    fallbackClassName="bg-ivory-muted"
                  />
                </div>
                <div className="border-t border-border-light p-6 md:p-8">
                  <div className="mb-4 flex items-center gap-4">
                    <span className="font-body text-xs font-medium tracking-[0.2em] text-bronze">
                      01
                    </span>
                    <span
                      className="h-px flex-1 bg-border-light"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-2xl text-text-dark md:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-3 text-sm text-text-dark/70 md:text-base">
                    {featured.description}
                  </p>
                </div>
              </article>
            </ServiceLink>
          </MotionReveal>

          {/* Remaining services */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {rest.slice(0, 2).map((service, index) => (
              <MotionReveal key={service.slug} delay={0.1 + index * 0.05}>
                <ServiceLink href={`/usluge#${service.slug}`}>
                  <article className="flex h-full flex-col overflow-hidden rounded-sm border border-border-light">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <SiteImage
                        image={service.image}
                        fill
                        sizes="(max-width: 1024px) 50vw, 30vw"
                        className="absolute inset-0"
                        imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        fallbackClassName="bg-ivory-muted"
                      />
                    </div>
                    <div className="flex flex-1 flex-col border-t border-border-light p-5">
                      <span className="mb-3 font-body text-xs font-medium tracking-[0.2em] text-bronze">
                        {String(index + 2).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl text-text-dark">{service.title}</h3>
                      <p className="mt-2 text-sm text-text-dark/70">
                        {service.description}
                      </p>
                    </div>
                  </article>
                </ServiceLink>
              </MotionReveal>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:mt-8">
          {rest.slice(2).map((service, index) => (
            <MotionReveal key={service.slug} delay={0.15 + index * 0.05}>
              <ServiceLink href={`/usluge#${service.slug}`}>
                <article className="flex h-full flex-col overflow-hidden rounded-sm border border-border-light sm:flex-row">
                  <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:min-h-[12rem] sm:w-2/5">
                    <SiteImage
                      image={service.image}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="absolute inset-0"
                      imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      fallbackClassName="bg-ivory-muted"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center border-t border-border-light p-5 sm:border-l sm:border-t-0 sm:p-6">
                    <span className="mb-3 font-body text-xs font-medium tracking-[0.2em] text-bronze">
                      {String(index + 4).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl text-text-dark">{service.title}</h3>
                    <p className="mt-2 text-sm text-text-dark/70">
                      {service.description}
                    </p>
                  </div>
                </article>
              </ServiceLink>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
