import { siteConfig } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: getSiteUrl(),
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rudarska ulica 1",
      addressLocality: "Draganovec",
      postalCode: "48000",
      addressCountry: "HR",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
