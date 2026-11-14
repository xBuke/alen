import { SiteShell } from "@/components/layout/site-shell";

export default function EnSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
