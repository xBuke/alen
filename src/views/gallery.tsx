import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { GalleryGridSection } from "@/components/gallery/gallery-grid";
import { PageContactCta } from "@/components/sections/page/page-contact-cta";
import { PageHero } from "@/components/sections/page/page-hero";
import { BeforeAfter } from "@/components/gallery/before-after";
import { Container } from "@/components/layout/container";
import { getBeforeAfterPairs, getGalleryAlbums } from "@/content";
import { localizeHash, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";

export function GalleryView({ locale }: { locale: Locale }) {
  const t = getUi(locale);
  const g = t.gallery;
  const galleryAlbums = getGalleryAlbums(locale);
  const beforeAfterPairs = getBeforeAfterPairs(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: t.homeLabel, href: "/" },
          { label: g.breadcrumb, href: "/galerija" },
        ]}
        locale={locale}
      />

      <PageHero
        eyebrow={g.eyebrow}
        title={g.title}
        description={g.description}
        breadcrumbLabel={g.breadcrumb}
        locale={locale}
      />

      <GalleryGridSection albums={galleryAlbums} />

      <section
        id={localizeHash("prije-i-poslije", locale)}
        className="section-padding scroll-mt-20 border-t border-border-dark bg-surface"
      >
        <Container>
          <div className="mb-10 max-w-3xl md:mb-14">
            <p className="eyebrow mb-4">{g.beforeAfterEyebrow}</p>
            <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
              {g.beforeAfterTitle}
            </h2>
            <p className="mt-4 text-base text-text-muted md:text-lg">
              {g.beforeAfterDescription}
            </p>
          </div>
          <div className="grid gap-10 lg:grid-cols-3">
            {beforeAfterPairs.map((pair) => (
              <BeforeAfter key={pair.id} pair={pair} locale={locale} />
            ))}
          </div>
        </Container>
      </section>

      <PageContactCta locale={locale} />
    </>
  );
}
