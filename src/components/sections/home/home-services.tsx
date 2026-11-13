import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { SiteImage } from "@/components/media/site-image";
import { homeServicesSection } from "@/data/home";
import { services } from "@/data/services";

export function HomeServices() {
  return (
    <section className="section-padding bg-ivory">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <MotionReveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow mb-5 text-bronze">
                {homeServicesSection.eyebrow}
              </p>
              <h2 className="text-balance text-3xl text-text-dark md:text-5xl">
                {homeServicesSection.title}
              </h2>
              <p className="mt-6 max-w-sm text-base text-text-dark/70">
                {homeServicesSection.description}
              </p>
            </div>
          </MotionReveal>

          <ul className="lg:col-span-8">
            {services.map((service, index) => (
              <MotionReveal key={service.slug} delay={index * 0.04}>
                <li className="border-t border-border-light last:border-b">
                  <Link
                    href={`/usluge#${service.slug}`}
                    className="group grid grid-cols-[1fr_auto] items-center gap-6 py-7 text-text-dark transition-colors hover:text-bronze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze md:py-9"
                  >
                    <div>
                      <h3 className="text-2xl text-current transition-transform duration-500 ease-out group-hover:translate-x-2 motion-reduce:transform-none md:text-4xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm text-text-dark/70 md:text-base">
                        {service.description}
                      </p>
                    </div>
                    <div className="relative h-24 w-16 overflow-hidden rounded-t-full md:h-36 md:w-24">
                      <SiteImage
                        image={service.image}
                        fill
                        sizes="96px"
                        className="absolute inset-0"
                        imageClassName="transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transform-none"
                        fallbackClassName="bg-ivory-muted"
                        showTemporaryBadge={false}
                      />
                    </div>
                  </Link>
                </li>
              </MotionReveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
