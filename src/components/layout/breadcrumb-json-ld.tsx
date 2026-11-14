import { localizePath, type Locale } from "@/i18n/config";
import { getAbsoluteUrl } from "@/lib/site-url";

type BreadcrumbJsonLdProps = {
  items: { label: string; href: string }[];
  locale?: Locale;
};

export function BreadcrumbJsonLd({
  items,
  locale = "hr",
}: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: getAbsoluteUrl(localizePath(item.href, locale)),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
