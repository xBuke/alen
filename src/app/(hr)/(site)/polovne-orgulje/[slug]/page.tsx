import { notFound } from "next/navigation";

import {
  getPublishedUsedOrganSlugs,
  getUsedOrganBySlug,
} from "@/lib/used-organs";
import { createPageMetadata } from "@/lib/page-metadata";

type UsedOrganDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedUsedOrganSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: UsedOrganDetailPageProps) {
  const { slug } = await params;
  const organ = getUsedOrganBySlug(slug);

  if (!organ) {
    return createPageMetadata({
      title: "Polovne orgulje",
      description:
        "Pregled polovnih orgulja dostupnih za upit putem Orguljarstva Kvaternik.",
      path: "/polovne-orgulje",
    });
  }

  return createPageMetadata({
    title: organ.title,
    description:
      organ.description ??
      "Polovna orgulja dostupna za upit putem Orguljarstva Kvaternik.",
    path: `/polovne-orgulje/${organ.slug}`,
  });
}

export default async function UsedOrganDetailPage({
  params,
}: UsedOrganDetailPageProps) {
  const { slug } = await params;
  const organ = getUsedOrganBySlug(slug);

  if (!organ) {
    notFound();
  }

  // Detail UI will be implemented when articles are published.
  notFound();
}
