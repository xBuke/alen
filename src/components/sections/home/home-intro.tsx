import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { homeIntro } from "@/data/home";

export function HomeIntro() {
  return (
    <section className="section-padding bg-background">
      <Container>
        <MotionReveal>
          <div className="max-w-4xl">
            <p className="eyebrow mb-6">{homeIntro.eyebrow}</p>
            <div className="mb-8 h-px w-16 bg-gold/60" aria-hidden="true" />
            <h2 className="max-w-full text-balance text-3xl leading-[1.15] md:max-w-[66%] md:text-4xl lg:text-5xl xl:max-w-[70%]">
              {homeIntro.title}
            </h2>
            <p className="mt-8 max-w-2xl text-base md:text-lg">
              {homeIntro.description}
            </p>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
