import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { SiteImage } from "@/components/media/site-image";
import { Button } from "@/components/ui/button";
import { homeAbout } from "@/data/home";
import { alenProfile } from "@/data/site";

export function HomeAbout() {
  return (
    <section className="section-padding bg-background">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <MotionReveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <SiteImage
                image={homeAbout.image}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0"
                imageClassName="transition-transform duration-700 ease-out hover:scale-[1.02]"
              />
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div>
              <p className="eyebrow mb-4">{homeAbout.eyebrow}</p>
              <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
                {homeAbout.title}
              </h2>
              <p className="mt-6 text-base md:text-lg">
                {homeAbout.description}
              </p>
              <Button asChild variant="secondary" className="mt-8 ">
                <Link href={homeAbout.cta.href}>{homeAbout.cta.label}</Link>
              </Button>
            </div>
          </MotionReveal>
        </div>

        <MotionReveal delay={0.15} className="mt-16 md:mt-20">
          <div className="flex flex-col gap-6 border-t border-border-dark pt-12 md:flex-row md:items-center md:gap-10">
            <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-sm border border-gold/30">
              {alenProfile.portrait ? (
                <SiteImage
                  image={alenProfile.portrait}
                  fill
                  sizes="160px"
                  className="absolute inset-0"
                  showTemporaryBadge={false}
                />
              ) : null}
            </div>
            <div className="max-w-2xl">
              <p className="font-heading text-xl font-medium text-text-light md:text-2xl">
                {alenProfile.name}
              </p>
              <p className="mt-1 font-body text-sm uppercase tracking-[0.15em] text-gold">
                {alenProfile.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed md:text-base">
                {alenProfile.shortBio}
              </p>
              <Link
                href="/o-nama#o-meni"
                className="mt-4 inline-block font-body text-xs font-medium uppercase tracking-[0.15em] text-gold transition-colors hover:text-text-light"
              >
                Više o Alenu
              </Link>
            </div>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
