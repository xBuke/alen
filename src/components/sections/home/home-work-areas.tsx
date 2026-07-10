import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { SiteImage } from "@/components/media/site-image";
import { homeWorkAreas } from "@/data/home";

export function HomeWorkAreas() {
  return (
    <section className="section-padding bg-surface">
      <Container>
        <MotionReveal>
          <h2 className="mb-12 max-w-2xl text-balance text-3xl md:mb-16 md:text-4xl lg:text-5xl">
            Područja našeg rada
          </h2>
        </MotionReveal>

        <div className="grid gap-8 md:grid-cols-2">
          {homeWorkAreas.map((area, index) => (
            <MotionReveal key={area.number} delay={index * 0.06}>
              <Link
                href={area.href}
                className="group block focus-visible:outline-none"
              >
                <article className="overflow-hidden rounded-sm border border-border-dark bg-background transition-colors hover:border-gold/30">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <SiteImage
                      image={area.image}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="absolute inset-0"
                      imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute left-5 top-5 font-body text-xs font-medium tracking-[0.2em] text-gold">
                      {area.number}
                    </span>
                  </div>
                  <div className="border-t border-border-dark p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl">{area.title}</h3>
                    <p className="mt-3 text-sm md:text-base">
                      {area.description}
                    </p>
                    <span className="mt-4 inline-block font-body text-xs font-medium uppercase tracking-[0.15em] text-gold transition-colors group-hover:text-text-light">
                      Saznajte više
                    </span>
                  </div>
                </article>
              </Link>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
