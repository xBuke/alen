import type { ReactNode } from "react";

import { A11yMenu } from "@/components/a11y/a11y-menu";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import type { Locale } from "@/i18n/config";

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
      <A11yMenu />
    </>
  );
}
