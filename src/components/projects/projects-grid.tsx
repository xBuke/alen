import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

type ProjectsGridProps = {
  projects: Project[];
  showDraftBadge?: boolean;
  className?: string;
};

export function ProjectsGrid({
  projects,
  showDraftBadge = false,
  className,
}: ProjectsGridProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8",
        className,
      )}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          showDraftBadge={showDraftBadge}
        />
      ))}
    </div>
  );
}
