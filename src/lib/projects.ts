import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";

const isDevelopment = process.env.NODE_ENV === "development";

const categoryLabels: Record<ProjectCategory, string> = {
  izrada: "Izrada",
  servis: "Servis",
  restauracija: "Restauracija",
  odrzavanje: "Održavanje",
  dokumentacija: "Dokumentacija",
};

export function getCategoryLabel(category: ProjectCategory): string {
  return categoryLabels[category];
}

export function getPublishedProjects(): Project[] {
  return projects.filter((project) => !project.draft);
}

export function getDraftProjects(): Project[] {
  return projects.filter((project) => project.draft);
}

export function getVisibleProjects(): Project[] {
  if (isDevelopment) {
    return projects;
  }

  return getPublishedProjects();
}

export function getFeaturedProjects(): Project[] {
  return getVisibleProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return undefined;
  }

  if (!isDevelopment && project.draft) {
    return undefined;
  }

  return project;
}

export function hasPublishedProjects(): boolean {
  return getPublishedProjects().length > 0;
}

export function isDraftContentVisible(): boolean {
  return isDevelopment;
}

export function getPublishedProjectSlugs(): string[] {
  return getPublishedProjects().map((project) => project.slug);
}

export function getAdjacentPublishedProjects(slug: string): {
  previous: Project | null;
  next: Project | null;
} {
  const published = getPublishedProjects();
  const index = published.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? published[index - 1] : null,
    next: index < published.length - 1 ? published[index + 1] : null,
  };
}
