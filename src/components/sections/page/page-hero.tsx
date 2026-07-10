import type { ImageAsset } from "@/types";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { SiteImage } from "@/components/media/site-image";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: ImageAsset;
  breadcrumbLabel: string;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumbLabel,
  className,
}: PageHeroProps) {
  const hasImage = Boolean(image);

  return (
    <section
      className={cn(
        "relative flex min-h-[45svh] flex-col overflow-hidden md:min-h-[55svh]",
        className,
      )}
    >
      {hasImage && image ? (
        <>
          <SiteImage
            image={image}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-background/50"
            aria-hidden="true"
          />
        </>
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-surface via-background to-surface-elevated"
          aria-hidden="true"
        />
      )}

      <Container className="relative z-10 flex flex-1 flex-col justify-end pb-12 pt-28 md:pb-16 md:pt-32">
        <Breadcrumbs
          items={[
            { label: "Početna", href: "/" },
            { label: breadcrumbLabel },
          ]}
          className="mb-6 md:mb-8"
        />

        {eyebrow ? <p className="eyebrow mb-4 md:mb-5">{eyebrow}</p> : null}

        <h1
          className={cn(
            "max-w-4xl text-balance",
            "text-3xl leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl",
          )}
        >
          {title}
        </h1>

        {description ? (
          <p className="mt-4 max-w-2xl text-base text-text-muted md:mt-6 md:text-lg">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
