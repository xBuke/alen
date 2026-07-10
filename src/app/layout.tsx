import type { Metadata } from "next";

import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { rootSiteMetadata } from "@/lib/page-metadata";
import { fontVariables, montserrat } from "@/lib/fonts";
import { getSiteUrl } from "@/lib/site-url";
import { siteConfig } from "@/data/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: rootSiteMetadata.defaultTitle,
    template: rootSiteMetadata.template,
  },
  description: rootSiteMetadata.description,
  openGraph: {
    type: "website",
    locale: "hr_HR",
    siteName: siteConfig.name,
    title: rootSiteMetadata.defaultTitle,
    description: rootSiteMetadata.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className={fontVariables}>
      <body className={`${montserrat.className} min-h-screen bg-background`}>
        <OrganizationJsonLd />
        <a href="#main-content" className="skip-link">
          Preskoči na sadržaj
        </a>
        {children}
      </body>
    </html>
  );
}
