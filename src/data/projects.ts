import { generatedProjects } from "@/data/generated/projects-generated";
import type { Project } from "@/types";

/**
 * Public projects from curated local photography.
 * Generic stock draft cards have been removed.
 */
export const projects: Project[] = generatedProjects.map((project) => ({
  slug: project.slug,
  title: project.title,
  location: project.location,
  category: project.category,
  summary: project.summary,
  featured: project.featured,
  draft: project.draft,
  coverImage: project.coverImage,
  gallery: project.gallery,
}));
