import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { cn } from "@/lib/utils";

type EditorialIntroProps = {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
};

export function EditorialIntro({
  eyebrow,
  title,
  children,
  className,
  dark = false,
}: EditorialIntroProps) {
  return (
    <section
      className={cn(
        "section-padding",
        dark ? "bg-ivory" : "bg-background",
        className,
      )}
    >
      <Container>
        <MotionReveal>
          <div className="mx-auto max-w-3xl">
            {eyebrow ? (
              <p
                className={cn("eyebrow mb-4", dark && "text-bronze")}
              >
                {eyebrow}
              </p>
            ) : null}
            <h2
              className={cn(
                "text-balance text-3xl md:text-4xl lg:text-5xl",
                dark ? "text-text-dark" : "text-text-light",
              )}
            >
              {title}
            </h2>
            <div
              className={cn(
                "mt-6 space-y-4 text-base md:mt-8 md:text-lg",
                dark ? "text-text-dark/80" : "text-text-muted",
              )}
            >
              {children}
            </div>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
