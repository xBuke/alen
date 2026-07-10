import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { SiteImage } from "@/components/media/site-image";
import { PageContactCta } from "@/components/sections/page/page-contact-cta";
import { siteConfig } from "@/data/site";
import {
  getAdjacentPublishedProjects,
  getCategoryLabel,
  getProjectBySlug,
  getPublishedProjectSlugs,
  isDraftContentVisible,
} from "@/lib/projects";
import { getAbsoluteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projekt nije pronađen",
    };
  }

  const titleParts = [project.title];
  if (project.location) {
    titleParts.push(project.location);
  }

  const isDraft = project.draft === true;

  return {
    title: titleParts.join(" — "),
    description: project.summary,
    alternates: {
      canonical: `/projekti/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.summary,
      url: getAbsoluteUrl(`/projekti/${project.slug}`),
      type: "website",
    },
    ...(isDraft && isDraftContentVisible()
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isDraft = project.draft === true;
  const showDraftBanner = isDraft && isDraftContentVisible();
  const { previous, next } = getAdjacentPublishedProjects(slug);
  const categoryLabel = getCategoryLabel(project.category);
  const facts = [
    project.location ? { label: "Lokacija", value: project.location } : null,
    project.year ? { label: "Godina", value: project.year } : null,
    { label: "Kategorija", value: categoryLabel },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Početna", href: "/" },
          { label: "Projekti", href: "/projekti" },
          { label: project.title, href: `/projekti/${project.slug}` },
        ]}
      />

      {showDraftBanner ? (
        <div
          role="status"
          className="border-b border-gold/40 bg-gold/10 px-4 py-3 text-center font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm"
        >
          RAZVOJNI PREGLED — OVAJ PROJEKT NIJE POTVRĐEN ZA OBJAVU
        </div>
      ) : null}

      <section className="section-padding pb-0 pt-28 md:pt-32">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Početna", href: "/" },
              { label: "Projekti", href: "/projekti" },
              { label: project.title },
            ]}
            className="mb-8"
          />

          <MotionReveal>
            <p className="eyebrow mb-4">{categoryLabel}</p>
            <h1 className="max-w-4xl text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            {project.summary ? (
              <p className="mt-5 max-w-2xl text-base text-text-muted md:text-lg">
                {project.summary}
              </p>
            ) : null}
          </MotionReveal>
        </Container>
      </section>

      <section className="section-padding pt-10 md:pt-12">
        <Container>
          <MotionReveal>
            <div className="relative aspect-[16/9] max-h-[32rem] overflow-hidden rounded-sm">
              <SiteImage
                image={project.coverImage}
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="absolute inset-0"
                showTemporaryBadge={false}
              />
            </div>
          </MotionReveal>
        </Container>
      </section>

      {facts.length > 0 ? (
        <section className="border-y border-border-dark bg-surface py-10 md:py-12">
          <Container>
            <dl className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-body text-xs uppercase tracking-[0.15em] text-gold">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-lg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      ) : null}

      {project.gallery.length > 0 ? (
        <section className="section-padding">
          <Container>
            <h2 className="mb-8 text-2xl md:text-3xl">Galerija projekta</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="relative aspect-[4/3] overflow-hidden rounded-sm"
                >
                  <SiteImage
                    image={image}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="absolute inset-0"
                    showTemporaryBadge={false}
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {(previous || next) && !isDraft ? (
        <section className="border-t border-border-dark py-10 md:py-12">
          <Container>
            <nav
              aria-label="Navigacija između projekata"
              className="grid gap-6 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={`/projekti/${previous.slug}`}
                  className={cn(
                    "group rounded-sm border border-border-dark p-5 transition-colors hover:border-gold/30 md:p-6",
                    !next && "sm:col-span-1",
                  )}
                >
                  <span className="font-body text-xs uppercase tracking-[0.15em] text-text-muted">
                    Prethodni projekt
                  </span>
                  <span className="mt-2 block font-heading text-lg transition-colors group-hover:text-gold md:text-xl">
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <div aria-hidden="true" />
              )}
              {next ? (
                <Link
                  href={`/projekti/${next.slug}`}
                  className="group rounded-sm border border-border-dark p-5 text-right transition-colors hover:border-gold/30 md:p-6"
                >
                  <span className="font-body text-xs uppercase tracking-[0.15em] text-text-muted">
                    Sljedeći projekt
                  </span>
                  <span className="mt-2 block font-heading text-lg transition-colors group-hover:text-gold md:text-xl">
                    {next.title}
                  </span>
                </Link>
              ) : null}
            </nav>
          </Container>
        </section>
      ) : null}

      <PageContactCta
        title="Zainteresirani ste za sličan zahvat?"
        description="Pošaljite osnovne informacije o instrumentu i prostoru kako bismo mogli započeti razgovor."
        cta={{ label: "Pošaljite upit", href: "/kontakt" }}
      />
    </>
  );
}
