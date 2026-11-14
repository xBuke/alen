import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld";
import { Container } from "@/components/layout/container";
import { PageContactCta } from "@/components/sections/page/page-contact-cta";
import { PageHero } from "@/components/sections/page/page-hero";
import { UsedOrgansEmptyState } from "@/components/used-organs/used-organs-empty-state";
import { hasPublishedUsedOrgans } from "@/lib/used-organs";
import { type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";

export function UsedOrgansView({ locale }: { locale: Locale }) {
  const t = getUi(locale);
  const hasItems = hasPublishedUsedOrgans();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: t.homeLabel, href: "/" },
          { label: t.usedOrgans.title, href: "/polovne-orgulje" },
        ]}
        locale={locale}
      />

      <PageHero
        eyebrow={t.usedOrgans.eyebrow}
        title={t.usedOrgans.title}
        description={t.usedOrgans.metaDescription}
        breadcrumbLabel={t.usedOrgans.title}
        locale={locale}
      />

      <section className="section-padding">
        <Container>
          {hasItems ? null : <UsedOrgansEmptyState locale={locale} />}
        </Container>
      </section>

      <PageContactCta locale={locale} />
    </>
  );
}
