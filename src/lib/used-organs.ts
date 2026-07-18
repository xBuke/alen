import { usedOrgans } from "@/data/used-organs";
import type { UsedOrgan } from "@/types";

export function getPublishedUsedOrgans(): UsedOrgan[] {
  return usedOrgans.filter((item) => item.published);
}

export function getUsedOrganBySlug(slug: string): UsedOrgan | undefined {
  return getPublishedUsedOrgans().find((item) => item.slug === slug);
}

export function getPublishedUsedOrganSlugs(): string[] {
  return getPublishedUsedOrgans().map((item) => item.slug);
}

export function hasPublishedUsedOrgans(): boolean {
  return getPublishedUsedOrgans().length > 0;
}

export function getFeaturedUsedOrgans(): UsedOrgan[] {
  return getPublishedUsedOrgans().filter((item) => item.featured);
}
