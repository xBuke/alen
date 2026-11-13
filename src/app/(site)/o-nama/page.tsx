import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { ContentSection } from "@/components/sections/page/content-section";
import { EditorialIntro } from "@/components/sections/page/editorial-intro";
import { PageContactCta } from "@/components/sections/page/page-contact-cta";
import { PageHero } from "@/components/sections/page/page-hero";
import { MotionReveal } from "@/components/media/motion-reveal";
import { SiteImage } from "@/components/media/site-image";
import { aboutPage } from "@/data/about";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: aboutPage.metadata.title,
  description: aboutPage.metadata.description,
  path: "/o-nama",
});

export default function AboutPage() {
  const { hero, workshop, workAreas, values, profile, process } = aboutPage;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Početna", href: "/" },
          { label: "O nama", href: "/o-nama" },
        ]}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image={hero.image}
        breadcrumbLabel={hero.breadcrumbLabel}
      />

      <EditorialIntro eyebrow={workshop.eyebrow} title={workshop.title}>
        {workshop.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </EditorialIntro>

      <ContentSection dark>
        <MotionReveal>
          <div className="mb-12 max-w-3xl md:mb-16">
            <p className="eyebrow mb-4 text-bronze">{workAreas.eyebrow}</p>
            <h2 className="text-balance text-3xl text-text-dark md:text-4xl lg:text-5xl">
              {workAreas.title}
            </h2>
          </div>
        </MotionReveal>

        <ol className="space-y-0">
          {workAreas.items.map((item, index) => (
            <MotionReveal key={item.href} delay={index * 0.05}>
              <li className="border-t border-border-light py-8 first:border-t-0 md:py-10">
                <Link
                  href={item.href}
                  className="group grid gap-4 md:grid-cols-[4rem_1fr] md:gap-8"
                >
                  <span className="font-body text-sm font-medium tracking-[0.2em] text-bronze">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="text-xl text-text-dark transition-colors group-hover:text-bronze md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-text-dark/70 md:text-base">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </li>
            </MotionReveal>
          ))}
        </ol>
      </ContentSection>

      <ContentSection>
        <MotionReveal>
          <div className="mb-12 max-w-3xl md:mb-16">
            <p className="eyebrow mb-4">{values.eyebrow}</p>
            <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
              {values.title}
            </h2>
          </div>
        </MotionReveal>

        <div className="grid gap-0 md:grid-cols-2">
          {values.items.map((value, index) => (
            <MotionReveal key={value.title} delay={index * 0.05}>
              <article className="border-t border-border-dark py-8 md:py-10 lg:px-8 lg:first:pl-0">
                <h3 className="text-xl md:text-2xl">{value.title}</h3>
                <p className="mt-3 text-sm md:text-base">{value.description}</p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </ContentSection>

      <section
        id="o-meni"
        className="section-padding scroll-mt-20 bg-surface"
      >
        <div className="container-site">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <MotionReveal>
              <figure>
                <div className="relative aspect-[3/2] overflow-hidden rounded-sm border border-border-dark">
                  <SiteImage
                    image={profile.image}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="absolute inset-0"
                    showTemporaryBadge={false}
                  />
                </div>
                {profile.image.credit ? (
                  <figcaption className="mt-2 font-body text-xs text-text-muted/80">
                    {profile.image.credit}
                  </figcaption>
                ) : null}
              </figure>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <div className="border-l border-gold/40 pl-8 md:pl-12">
                <p className="eyebrow mb-4">{profile.eyebrow}</p>
                <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
                  {profile.title}
                </h2>
                <p className="mt-2 font-body text-sm uppercase tracking-[0.15em] text-gold">
                  {profile.role}
                </p>
                <div className="mt-6 space-y-4 text-base text-text-muted md:mt-8 md:text-lg">
                  {profile.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
                <Link
                  href={profile.link.href}
                  className="mt-6 inline-block font-body text-xs font-medium uppercase tracking-[0.15em] text-gold transition-colors hover:text-text-light"
                >
                  {profile.link.label} →
                </Link>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      <ContentSection dark>
        <MotionReveal>
          <div className="mb-12 max-w-3xl md:mb-16">
            <p className="eyebrow mb-4 text-bronze">{process.eyebrow}</p>
            <h2 className="text-balance text-3xl text-text-dark md:text-4xl lg:text-5xl">
              {process.title}
            </h2>
          </div>
        </MotionReveal>

        <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, index) => (
            <MotionReveal key={step.number} delay={index * 0.06}>
              <article className="border-t border-border-light py-8 md:py-10 lg:border-l lg:border-t-0 lg:px-8 lg:py-0 lg:first:border-l-0 lg:first:pl-0">
                <span className="font-body text-xs font-medium tracking-[0.2em] text-bronze">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl text-text-dark md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-text-dark/70 md:text-base">
                  {step.description}
                </p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </ContentSection>

      <PageContactCta />
    </>
  );
}
