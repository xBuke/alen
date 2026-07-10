import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { homeProcess } from "@/data/home";

export function HomeProcess() {
  return (
    <section className="section-padding bg-ivory">
      <Container>
        <MotionReveal>
          <div className="mb-12 max-w-3xl md:mb-16">
            <p className="eyebrow mb-4 text-bronze">{homeProcess.eyebrow}</p>
            <h2 className="text-balance text-3xl text-text-dark md:text-4xl lg:text-5xl">
              {homeProcess.title}
            </h2>
          </div>
        </MotionReveal>

        <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-4">
          {homeProcess.steps.map((step, index) => (
            <MotionReveal key={step.number} delay={index * 0.06}>
              <article
                className="border-t border-border-light py-8 first:border-t-0 md:py-10 lg:border-l lg:border-t-0 lg:px-8 lg:py-0 lg:first:border-l-0 lg:first:pl-0"
              >
                <span className="font-body text-xs font-medium tracking-[0.2em] text-bronze">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl text-text-dark md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-text-dark/70 md:text-base">
                  {step.description}
                </p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
