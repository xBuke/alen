import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { SiteImage } from "@/components/media/site-image";
import { getHome } from "@/content";
import { localizePath, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";

/** Četiri visoke pločice, proporcijama nalik sviralama u prospektu. */
export function HomeWorkAreas({ locale = "hr" }: { locale?: Locale }) {
  const homeWorkAreas = getHome(locale).workAreas;
  const t = getUi(locale);

  return (
    <section className="section-padding bg-surface">
      <Container>
        <MotionReveal>
          <h2 className="mb-12 max-w-2xl text-balance text-3xl md:mb-16 md:text-5xl">
            {t.home.workAreasTitle}
          </h2>
        </MotionReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
          {homeWorkAreas.map((area, index) => (
            <MotionReveal
              key={area.number}
              delay={index * 0.06}
              className={index % 2 === 1 ? "lg:pb-10" : undefined}
            >
              <Link
                href={localizePath(area.href, locale)}
                className="group relative block aspect-[3/4] overflow-hidden rounded-t-[999px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:aspect-[9/16]"
              >
                <SiteImage
                  image={area.image}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="absolute inset-0"
                  imageClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105 motion-reduce:transform-none"
                  showTemporaryBadge={false}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-2xl text-text-light">{area.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">
                    {area.description}
                  </p>
                  <span
                    className="mt-4 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-full"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
