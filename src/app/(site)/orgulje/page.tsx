import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { MotionReveal } from "@/components/media/motion-reveal";
import { SiteImage } from "@/components/media/site-image";
import { OrganAnatomy } from "@/components/sections/organs/organ-anatomy";
import { PageContactCta } from "@/components/sections/page/page-contact-cta";
import { PageHero } from "@/components/sections/page/page-hero";
import { SplitContent } from "@/components/sections/page/split-content";
import { organsPage } from "@/data/organs";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: organsPage.metadata.title,
  description: organsPage.metadata.description,
  path: "/orgulje",
});

export default function OrgansPage() {
  const {
    hero,
    instrumentWhole,
    anatomy,
    newOrgans,
    existingInstruments,
    tracture,
    intonation,
  } = organsPage;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Početna", href: "/" },
          { label: "Orgulje", href: "/orgulje" },
        ]}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image={hero.image}
        breadcrumbLabel={hero.breadcrumbLabel}
      />

      <SplitContent
        title={instrumentWhole.title}
        image={instrumentWhole.image}
        imageObjectPosition="center 40%"
      >
        {instrumentWhole.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </SplitContent>

      <OrganAnatomy title={anatomy.title} parts={anatomy.parts} />

      <SplitContent
        title={newOrgans.title}
        image={newOrgans.image}
        reverse
        dark
      >
        {newOrgans.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
        <p className="border-l-2 border-gold/60 pl-4 font-heading text-lg text-text-dark md:text-xl">
          {newOrgans.highlight}
        </p>
      </SplitContent>

      <SplitContent
        title={existingInstruments.title}
        image={existingInstruments.image}
        imageObjectPosition="center 50%"
      >
        {existingInstruments.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </SplitContent>

      <SplitContent
        title={tracture.title}
        image={tracture.image}
        reverse
        dark
      >
        <p className="font-heading text-lg text-text-dark md:text-xl">
          {tracture.confirmed}
        </p>
        <p>{tracture.explanation}</p>
      </SplitContent>

      <section className="section-padding bg-background">
        <div className="container-site">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <MotionReveal>
              <div className="max-w-xl">
                <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
                  {intonation.title}
                </h2>
                <p className="mt-6 text-lg md:mt-8 md:text-xl lg:text-2xl">
                  {intonation.confirmed}
                </p>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <SiteImage
                  image={intonation.image}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="absolute inset-0"
                  objectPosition="center 35%"
                />
                <div
                  className="absolute bottom-0 left-0 h-1 w-24 bg-gold"
                  aria-hidden="true"
                />
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      <PageContactCta />
    </>
  );
}
