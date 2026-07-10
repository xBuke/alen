import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { SiteImage } from "@/components/media/site-image";
import { Button } from "@/components/ui/button";
import { homeContactCta } from "@/data/home";

export function PageContactCta() {
  return (
    <section className="relative min-h-[28rem] overflow-hidden">
      <SiteImage
        image={homeContactCta.image}
        fill
        sizes="100vw"
        className="absolute inset-0"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-background/50"
        aria-hidden="true"
      />

      <Container className="relative z-10 section-padding">
        <MotionReveal>
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
              {homeContactCta.title}
            </h2>
            <p className="mt-5 text-base md:text-lg">
              {homeContactCta.description}
            </p>
            <Button asChild size="lg" className="mt-8 rounded-sm">
              <Link href={homeContactCta.cta.href}>
                {homeContactCta.cta.label}
              </Link>
            </Button>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
