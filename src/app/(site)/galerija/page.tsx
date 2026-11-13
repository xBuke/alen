import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { GalleryGridSection } from "@/components/gallery/gallery-grid";
import { PageContactCta } from "@/components/sections/page/page-contact-cta";
import { PageHero } from "@/components/sections/page/page-hero";
import { BeforeAfter } from "@/components/gallery/before-after";
import { Container } from "@/components/layout/container";
import { beforeAfterPairs } from "@/data/before-after";
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

      <section
        id="prije-i-poslije"
        className="section-padding scroll-mt-20 border-t border-border-dark bg-surface"
      >
        <Container>
          <div className="mb-10 max-w-3xl md:mb-14">
            <p className="eyebrow mb-4">PRIJE I POSLIJE</p>
            <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
              Što restauracija znači u praksi.
            </h2>
            <p className="mt-4 text-base text-text-muted md:text-lg">
              Isti dijelovi instrumenta kako smo ih zatekli i kako su izgledali
              kad su se vratili u orgulje.
            </p>
          </div>
          <div className="grid gap-10 lg:grid-cols-3">
            {beforeAfterPairs.map((pair) => (
              <BeforeAfter key={pair.id} pair={pair} />
            ))}
          </div>
        </Container>
      </section>

      <PageContactCta />
    </>
  );
}
