import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { MotionReveal } from "@/components/media/motion-reveal";
import { SiteImage } from "@/components/media/site-image";
import { Button } from "@/components/ui/button";
import { heroContent } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[85vh] items-end overflow-hidden">
        <SiteImage
          image={heroContent.image}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0"
          imageClassName="scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <Container className="relative z-10 pb-20 pt-32">
          <MotionReveal>
            <p className="eyebrow mb-6">{heroContent.eyebrow}</p>
            <h1 className="max-w-4xl text-balance">{heroContent.title}</h1>
            <p className="mt-6 max-w-2xl text-lg text-text-muted">
              {heroContent.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
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
          </MotionReveal>
        </Container>
      </section>

      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading
            dark
            eyebrow="U pripremi"
            title="Faza 1 — tehnički temelj"
            description="Osnovna infrastruktura, dizajn sustav i podatkovni sloj su postavljeni. Kompletne stranice dolaze u sljedećim fazama."
            align="center"
          />
        </Container>
      </section>
    </>
  );
}
