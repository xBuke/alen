import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { Container } from "@/components/layout/container";
import { PageContactCta } from "@/components/sections/page/page-contact-cta";
import { PageHero } from "@/components/sections/page/page-hero";
import { UsedOrgansEmptyState } from "@/components/used-organs/used-organs-empty-state";
import { createPageMetadata } from "@/lib/page-metadata";
import { hasPublishedUsedOrgans } from "@/lib/used-organs";

export const metadata = createPageMetadata({
  title: "Polovne orgulje",
  description:
    "Pregled polovnih orgulja dostupnih za upit putem Orguljarstva Kvaternik.",
  path: "/polovne-orgulje",
});

export default function UsedOrgansPage() {
  const hasItems = hasPublishedUsedOrgans();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Početna", href: "/" },
          { label: "Polovne orgulje", href: "/polovne-orgulje" },
        ]}
      />

      <PageHero
        eyebrow="PONUDA"
        title="Polovne orgulje"
        description="Pregled polovnih orgulja dostupnih za upit putem Orguljarstva Kvaternik."
        breadcrumbLabel="Polovne orgulje"
      />

      <section className="section-padding">
        <Container>
          {hasItems ? null : <UsedOrgansEmptyState />}
        </Container>
      </section>

      <PageContactCta />
    </>
  );
}
