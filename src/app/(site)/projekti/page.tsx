import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { ProjectsEmptyState } from "@/components/projects/projects-empty-state";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { ProjectsWorkAreas } from "@/components/projects/projects-work-areas";
import { PageContactCta } from "@/components/sections/page/page-contact-cta";
import { PageHero } from "@/components/sections/page/page-hero";
import {
  getDraftProjects,
  getPublishedProjects,
  hasPublishedProjects,
  isDraftContentVisible,
} from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projekti",
  description:
    "Pregled projekata Orguljarstva Kvaternik bit će objavljen nakon potvrde podataka i fotografija izvedenih radova.",
  alternates: {
    canonical: "/projekti",
  },
  openGraph: {
    title: "Projekti | Orguljarstvo Kvaternik",
    description:
      "Pregled projekata Orguljarstva Kvaternik bit će objavljen nakon potvrde podataka i fotografija izvedenih radova.",
  },
};

export default function ProjectsPage() {
  const publishedProjects = getPublishedProjects();
  const showPublished = hasPublishedProjects();
  const showDraftSection = isDraftContentVisible();
  const draftProjects = showDraftSection ? getDraftProjects() : [];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Početna", href: "/" },
          { label: "Projekti", href: "/projekti" },
        ]}
      />

      <PageHero
        eyebrow="PROJEKTI"
        title="Svaki instrument zahtijeva vlastiti pristup."
        description="Projekte predstavljamo tek nakon potvrde podataka, lokacije, opsega radova i pripadajućih fotografija."
        breadcrumbLabel="Projekti"
      />

      <section className="section-padding">
        {showPublished ? (
          <Container>
            <MotionReveal>
              <ProjectsGrid projects={publishedProjects} />
            </MotionReveal>
          </Container>
        ) : (
          <ProjectsEmptyState />
        )}
      </section>

      {!showPublished ? <ProjectsWorkAreas /> : null}

      {showDraftSection && draftProjects.length > 0 ? (
        <section className="section-padding border-t border-gold/20 bg-surface">
          <Container>
            <MotionReveal>
              <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Razvojni pregled — nije za javnu objavu
              </p>
              <h2 className="mb-8 text-xl text-text-muted md:text-2xl">
                Kartice u pripremi
              </h2>
            </MotionReveal>
            <ProjectsGrid projects={draftProjects} showDraftBadge />
          </Container>
        </section>
      ) : null}

      <PageContactCta />
    </>
  );
}
