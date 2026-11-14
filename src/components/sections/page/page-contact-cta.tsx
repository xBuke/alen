import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { SiteImage } from "@/components/media/site-image";
import { Button } from "@/components/ui/button";
import { getHome } from "@/content";
import { localizePath, type Locale } from "@/i18n/config";
import type { ImageAsset } from "@/types";

type PageContactCtaProps = {
  title?: string;
  description?: string;
  cta?: { label: string; href: string };
  image?: ImageAsset;
  locale?: Locale;
};

export function PageContactCta({
  locale = "hr",
  ...overrides
}: PageContactCtaProps = {}) {
  const defaults = getHome(locale).contactCta;
  const {
    title = defaults.title,
    description = defaults.description,
    cta = defaults.cta,
    image = defaults.image,
  } = overrides;

  return (
    <section className="relative min-h-[28rem] overflow-hidden">
      <SiteImage
        image={image}
        fill
        sizes="100vw"
        className="absolute inset-0"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-background/50"
        aria-hidden="true"
      />

      <Container className="relative z-10 section-padding">
        <MotionReveal>
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-5 text-base md:text-lg">
              {description}
            </p>
            <Button asChild size="lg" className="mt-8 ">
              <Link href={localizePath(cta.href, locale)}>
                {cta.label}
              </Link>
            </Button>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
