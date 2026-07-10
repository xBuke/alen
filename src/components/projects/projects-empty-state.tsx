import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { Button } from "@/components/ui/button";
import { projectsEmptyState } from "@/data/site";

function EmptyStateVisual() {
  return (
    <div
      className="relative mx-auto mb-10 aspect-[16/10] max-w-lg overflow-hidden rounded-sm border border-border-dark bg-surface"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(179,138,90,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(179,138,90,0.08)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
      <div className="absolute inset-0 flex items-end justify-center gap-3 px-8 pb-8">
        {[0.4, 0.65, 0.85, 0.55, 0.75, 0.45, 0.7].map((height, index) => (
          <div
            key={index}
            className="w-3 rounded-t-sm bg-gradient-to-t from-gold/30 to-gold/10"
            style={{ height: `${height * 100}%` }}
          />
        ))}
      </div>
      <div className="absolute left-6 top-6 font-body text-[0.65rem] uppercase tracking-[0.25em] text-gold/60">
        01 — 04
      </div>
    </div>
  );
}

export function ProjectsEmptyState() {
  return (
    <Container>
      <MotionReveal>
        <div className="mx-auto max-w-2xl text-center">
          <EmptyStateVisual />

          <h2 className="text-balance text-2xl md:text-3xl lg:text-4xl">
            {projectsEmptyState.title}
          </h2>

          <p className="mt-5 text-base text-text-muted md:text-lg">
            Radove Orguljarstva Kvaternik objavit ćemo nakon potvrde podataka i
            fotografija za svaki pojedini instrument.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-sm">
              <Link href="/usluge">Upoznajte područja našeg rada</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="rounded-sm">
              <Link href="/kontakt">Pošaljite upit</Link>
            </Button>
          </div>
        </div>
      </MotionReveal>
    </Container>
  );
}
