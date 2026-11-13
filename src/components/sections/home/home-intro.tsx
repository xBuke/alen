import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { PipeRule } from "@/components/media/pipe-rule";
import { homeIntro } from "@/data/home";

export function HomeIntro() {
  return (
    <section className="section-padding bg-background">
      <Container>
        <MotionReveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <PipeRule count={13} />
            </div>
            <div className="lg:col-span-9">
              <h2 className="text-balance text-3xl leading-[1.12] md:text-5xl xl:text-6xl">
                {homeIntro.title}
              </h2>
              <p className="mt-8 max-w-2xl text-base md:text-lg">
                {homeIntro.description}
              </p>
            </div>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
