import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { cn } from "@/lib/utils";

export const projectsWorkAreas = [
  {
    number: "01",
    title: "Nove orgulje",
    href: "/usluge#izrada-novih-orgulja",
  },
  {
    number: "02",
    title: "Servis postojećih instrumenata",
    href: "/usluge#servis-orgulja",
  },
  {
    number: "03",
    title: "Restauracija",
    href: "/usluge#restauracija",
  },
  {
    number: "04",
    title: "Traktura i intonacija",
    href: "/usluge#digitalna-elektromagnetska-traktura",
  },
] as const;

export function ProjectsWorkAreas() {
  return (
    <section className="section-padding border-t border-border-dark bg-surface">
      <Container>
        <MotionReveal>
          <h2 className="mb-10 max-w-xl text-balance text-2xl md:mb-12 md:text-3xl lg:text-4xl">
            Područja našeg rada
          </h2>
        </MotionReveal>

        <div className="grid gap-0 border border-border-dark sm:grid-cols-2">
          {projectsWorkAreas.map((area, index) => (
            <MotionReveal key={area.number} delay={index * 0.05}>
              <Link
                href={area.href}
                className={cn(
                  "group flex items-start gap-5 border-border-dark p-6 transition-colors hover:bg-background md:p-8",
                  index % 2 === 0 && "sm:border-r",
                  index < 2 && "border-b sm:border-b",
                )}
              >
                <span className="font-body text-xs font-medium tracking-[0.2em] text-gold">
                  {area.number}
                </span>
                <span className="flex-1">
                  <span className="block font-heading text-lg md:text-xl">
                    {area.title}
                  </span>
                  <span className="mt-2 inline-block font-body text-xs uppercase tracking-[0.15em] text-gold transition-colors group-hover:text-text-light">
                    Saznajte više
                  </span>
                </span>
              </Link>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
