import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { Button } from "@/components/ui/button";
import { localizePath, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";

export function HomeUsedOrgans({ locale = "hr" }: { locale?: Locale }) {
  const t = getUi(locale);

  return (
    <section className="section-padding border-t border-border-dark bg-background">
      <Container>
        <MotionReveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gold">
              {t.home.usedEyebrow}
            </p>
            <h2 className="mt-4 text-balance text-3xl md:text-4xl">
              {t.home.usedTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-text-muted md:text-base">
              {t.home.usedDescription}
            </p>
            <Button asChild className="mt-8 ">
              <Link href={localizePath("/kontakt?vrsta=polovne-orgulje", locale)}>
                {t.sendInquiry}
              </Link>
            </Button>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
