import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { GalleryGridSection } from "@/components/gallery/gallery-grid";
import { PageContactCta } from "@/components/sections/page/page-contact-cta";
import { PageHero } from "@/components/sections/page/page-hero";
import { galleryAlbums } from "@/data/gallery";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Galerija",
  description:
    "Fotografska dokumentacija orgulja i projekata Orguljarstva Kvaternik, organizirana u albume po lokacijama.",
  path: "/galerija",
});

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Početna", href: "/" },
          { label: "Galerija", href: "/galerija" },
        ]}
      />

      <PageHero
        eyebrow="GALERIJA"
        title="Instrumenti i prostori u fotografijama."
        description="Odabrani albumi fotografske dokumentacije po lokacijama. Za detalje o pojedinim zahvatima stojimo na raspolaganju putem kontaktne forme."
        breadcrumbLabel="Galerija"
      />

      <GalleryGridSection albums={galleryAlbums} />

      <PageContactCta />
    </>
  );
}
