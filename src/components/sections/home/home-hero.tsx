import Link from "next/link";
import { preload } from "react-dom";

import { Container } from "@/components/layout/container";
import { PipeProspect } from "@/components/sections/home/pipe-prospect";
import { Button } from "@/components/ui/button";
import { heroContent } from "@/data/site";

export function HomeHero() {
  preload(heroContent.image.src, { as: "image", fetchPriority: "high" });

  return (
    <section className="hero relative overflow-hidden bg-background">
      <Container className="relative z-10 grid min-h-[100svh] items-end gap-10 pb-0 pt-28 lg:grid-cols-12 lg:gap-8 lg:pt-24">
        <div className="hero-copy self-center lg:col-span-5 lg:pb-24">
          <p className="eyebrow mb-6">{heroContent.eyebrow}</p>
          <h1 className="text-balance text-[2.75rem] leading-[1.02] sm:text-6xl xl:text-7xl">
            {heroContent.title}
          </h1>
          <p className="mt-6 max-w-md text-base text-text-muted md:text-lg">
            {heroContent.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg">
              <Link href={heroContent.primaryCta.href}>
                {heroContent.primaryCta.label}
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={heroContent.secondaryCta.href}>
                {heroContent.secondaryCta.label}
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative h-[46svh] min-h-[280px] lg:col-span-7 lg:h-[80svh]">
          <PipeProspect image={heroContent.image.src} />
          <p className="hero-hint pointer-events-none absolute -top-7 right-0 font-heading text-sm italic text-text-muted">
            Dotaknite svirale.
          </p>
        </div>
      </Container>
      <div className="hero-chest" aria-hidden="true" />
    </section>
  );
}
