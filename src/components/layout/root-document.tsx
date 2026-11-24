import type { ReactNode } from "react";

import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { a11yBootScript } from "@/lib/a11y-settings";
import { fontVariables, montserrat } from "@/lib/fonts";
import { LocaleProvider } from "@/i18n/locale-context";
import { getUi } from "@/i18n/ui";
import type { Locale } from "@/i18n/config";

/** Zajednički <html>/<body> za oba jezika (svaki jezik ima vlastiti root layout). */
export function RootDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      {/* App Router: <head> u root layoutu je ispravan (pravilo je za Pages Router). */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* Postavke izbornika pristupačnosti prije prvog iscrtavanja. */}
        <script dangerouslySetInnerHTML={{ __html: a11yBootScript }} />
      </head>
      <body className={`${montserrat.className} min-h-screen bg-background`}>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <OrganizationJsonLd />
        <a href="#main-content" className="skip-link">
          {getUi(locale).skipLink}
        </a>
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
