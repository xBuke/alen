import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { getHome } from "@/content";
import type { Locale } from "@/i18n/config";

export function HomeProcess({ locale = "hr" }: { locale?: Locale }) {
  const homeProcess = getHome(locale).process;

  return (
    <section className="section-padding bg-ivory">
      <Container>
        <MotionReveal>
          <div className="mb-12 max-w-3xl md:mb-16">
            <p className="eyebrow mb-5 text-bronze">{homeProcess.eyebrow}</p>
            <h2 className="text-balance text-3xl text-text-dark md:text-5xl">
              {homeProcess.title}
            </h2>
          </div>
        </MotionReveal>

        <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {homeProcess.steps.map((step, index) => (
            <MotionReveal key={step.number} delay={index * 0.06}>
              <li className="border-t border-text-dark/25 pt-6">
                <span className="font-heading text-5xl italic text-bronze">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl text-text-dark md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-text-dark/70 md:text-base">
                  {step.description}
                </p>
              </li>
            </MotionReveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
