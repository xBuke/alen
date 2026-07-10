import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { homeQuote } from "@/data/home";

export function HomeQuote() {
  return (
    <section className="border-y border-border-dark bg-background py-20 md:py-28">
      <Container>
        <MotionReveal>
          <blockquote className="mx-auto max-w-4xl text-center">
            <p className="font-heading text-2xl font-medium leading-snug tracking-tight text-text-light md:text-3xl lg:text-4xl">
              {homeQuote.text}
            </p>
          </blockquote>
        </MotionReveal>
      </Container>
    </section>
  );
}
