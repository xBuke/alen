import type { ImageAsset } from "@/types";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { PipeRule } from "@/components/media/pipe-rule";
import { SiteImage } from "@/components/media/site-image";
import { getUi } from "@/i18n/ui";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: ImageAsset;
  breadcrumbLabel: string;
  className?: string;
  locale?: Locale;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumbLabel,
  className,
  locale = "hr",
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
            { label: getUi(locale).homeLabel, href: "/" },
            { label: breadcrumbLabel },
          ]}
          className="mb-6 md:mb-8"
          locale={locale}
        />

        {eyebrow ? <p className="eyebrow mb-4 md:mb-5">{eyebrow}</p> : null}

        <h1
          className={cn(
            "max-w-4xl text-balance",
            "text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl",
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
      <PipeRule className="pointer-events-none absolute bottom-0 right-[max(1.25rem,6vw)] z-10 hidden h-28 md:flex" />
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-px bg-gold/40"
        aria-hidden="true"
      />
    </section>
  );
}
