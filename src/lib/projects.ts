import { projects } from "@/data/projects";
import type { Project } from "@/types";

const isDevelopment = process.env.NODE_ENV === "development";

export function getPublishedProjects(): Project[] {
  return projects.filter((project) => !project.draft);
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
