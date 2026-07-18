import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { Button } from "@/components/ui/button";

export function HomeUsedOrgans() {
  return (
    <section className="section-padding border-t border-border-dark bg-background">
      <Container>
        <MotionReveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gold">
              PONUDA
            </p>
            <h2 className="mt-4 text-balance text-3xl md:text-4xl">
              Polovne orgulje
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-text-muted md:text-base">
              Informacije o dostupnim polovnim orguljama možete zatražiti putem
              kontaktne forme.
            </p>
            <Button asChild className="mt-8 rounded-sm">
              <Link href="/kontakt?vrsta=polovne-orgulje">Pošaljite upit</Link>
            </Button>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
