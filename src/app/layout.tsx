import type { Metadata } from "next";

import { fontVariables, montserrat } from "@/lib/fonts";
import { siteConfig } from "@/data/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://orguljarstvo-kvaternik.hr",
  ),
  title: {
    default: `${siteConfig.name} | Izrada, obnova i održavanje orgulja`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "hr_HR",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Izrada, obnova i održavanje orgulja`,
    description: siteConfig.description,
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
        <a href="#main-content" className="skip-link">
          Preskoči na sadržaj
        </a>
        {children}
      </body>
    </html>
  );
}
