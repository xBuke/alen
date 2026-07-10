import type { ImageAsset } from "@/types";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { SiteImage } from "@/components/media/site-image";
import { cn } from "@/lib/utils";

type SplitContentProps = {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  image: ImageAsset;
  reverse?: boolean;
  dark?: boolean;
  imageObjectPosition?: string;
  className?: string;
};

export function SplitContent({
  title,
  eyebrow,
  children,
  image,
  reverse = false,
  dark = false,
  imageObjectPosition,
  className,
}: SplitContentProps) {
  return (
    <section
      className={cn(
        "section-padding",
        dark ? "bg-ivory" : "bg-background",
        className,
      )}
    >
      <Container>
        <div
          className={cn(
            "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
            reverse && "lg:[&>*:first-child]:order-2",
          )}
        >
          <MotionReveal>
            <div className="relative aspect-[4/3] overflow-hidden">
              <SiteImage
                image={image}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0"
                objectPosition={imageObjectPosition}
              />
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div>
              {eyebrow ? (
                <p
                  className={cn("eyebrow mb-4", dark && "text-bronze")}
                >
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2
                  className={cn(
                    "text-balance text-3xl md:text-4xl",
                    dark ? "text-text-dark" : "text-text-light",
                  )}
                >
                  {title}
                </h2>
              ) : null}
              <div
                className={cn(
                  "space-y-4 text-base md:text-lg",
                  title ? "mt-6" : "",
                  dark ? "text-text-dark/80" : "text-text-muted",
                )}
              >
                {children}
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
