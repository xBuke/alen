import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { GalleryGridSection } from "@/components/gallery/gallery-grid";
import { PageContactCta } from "@/components/sections/page/page-contact-cta";
import { PageHero } from "@/components/sections/page/page-hero";
import { galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Galerija",
  description:
    "Vizualni detalji orgulja, sviraonika, cijevi i sakralnih prostora korišteni kao privremeni materijal stranice.",
  alternates: {
    canonical: "/galerija",
  },
  openGraph: {
    title: "Galerija | Orguljarstvo Kvaternik",
    description:
      "Vizualni detalji orgulja, sviraonika, cijevi i sakralnih prostora korišteni kao privremeni materijal stranice.",
  },
};

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
        title="Detalji instrumenta i prostora."
        description="Privremeni vizualni materijal prikazuje orgulje, sviraonike, cijevi i sakralne prostore. Fotografije izvedenih radova bit će dodane nakon njihove potvrde."
        breadcrumbLabel="Galerija"
      />

      <GalleryGridSection items={galleryItems} />

      <PageContactCta />
    </>
  );
}
