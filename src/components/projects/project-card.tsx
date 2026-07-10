import Link from "next/link";

import { SiteImage } from "@/components/media/site-image";
import { getCategoryLabel } from "@/lib/projects";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  showDraftBadge?: boolean;
  className?: string;
};

export function ProjectCard({
  project,
  showDraftBadge = false,
  className,
}: ProjectCardProps) {
  const categoryLabel = getCategoryLabel(project.category);
  const metaParts = [
    project.location,
    project.year,
    categoryLabel,
  ].filter(Boolean);

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-sm border border-border-dark bg-background transition-colors hover:border-gold/30",
        className,
      )}
    >
      {showDraftBadge ? (
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-1">
          <span className="inline-block rounded-sm bg-gold px-2 py-0.5 font-body text-[0.65rem] font-semibold uppercase tracking-wider text-background">
            DRAFT
          </span>
        </div>
      ) : null}

      <Link
        href={`/projekti/${project.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <SiteImage
            image={project.coverImage}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="absolute inset-0"
            imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            showTemporaryBadge={false}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="border-t border-border-dark p-5 md:p-6">
          {metaParts.length > 0 ? (
            <p className="font-body text-xs uppercase tracking-[0.15em] text-gold">
              {metaParts.join(" · ")}
            </p>
          ) : (
            <p className="font-body text-xs uppercase tracking-[0.15em] text-gold">
              {categoryLabel}
            </p>
          )}

          <h3 className="mt-2 text-xl md:text-2xl">{project.title}</h3>

          <p className="mt-3 text-sm text-text-muted md:text-base">
            {project.summary}
          </p>

          {showDraftBadge ? (
            <p className="mt-3 text-xs italic text-text-muted/80">
              Razvojni sadržaj — nije potvrđeni projekt.
            </p>
          ) : null}

          <span className="mt-4 inline-block font-body text-xs font-medium uppercase tracking-[0.15em] text-gold transition-colors group-hover:text-text-light">
            Pogledajte detalje
          </span>
        </div>
      </Link>
    </article>
  );
}
