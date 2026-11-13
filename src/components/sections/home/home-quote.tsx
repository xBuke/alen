import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { PipeRule } from "@/components/media/pipe-rule";
import { homeQuote } from "@/data/home";

export function HomeQuote() {
  return (
    <section className="bg-background py-24 md:py-36">
      <Container>
        <MotionReveal>
          <blockquote className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <PipeRule count={13} className="mb-10" />
            <p className="text-balance font-heading text-3xl italic leading-tight text-text-light md:text-5xl lg:text-6xl">
              {homeQuote.text}
            </p>
          </blockquote>
        </MotionReveal>
      </Container>
    </section>
  );
}
