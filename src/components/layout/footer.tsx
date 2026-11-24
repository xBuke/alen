import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { MangaiIcon, MangaiWordmark } from "@/components/layout/mangai-logo";
import { PipeRule } from "@/components/media/pipe-rule";
import { getServices, getSiteConfig } from "@/content";
import { localizePath, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";

export function Footer({ locale = "hr" }: { locale?: Locale }) {
  const currentYear = new Date().getFullYear();
  const t = getUi(locale);
  const siteConfig = getSiteConfig(locale);
  const services = getServices(locale);

  return (
    <footer className="border-t border-border-dark bg-surface">
      <Container className="section-padding">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-3xl text-balance font-heading text-3xl italic leading-tight text-text-light md:text-5xl">
            {t.footer.statement}
          </p>
          <PipeRule className="h-20 shrink-0" />
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-4 lg:col-span-4">
            <Logo locale={locale} />
            <p className="max-w-sm text-sm leading-relaxed text-text-muted">
              {t.footer.description}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 font-heading text-base italic text-gold">
              {t.footer.navigation}
            </h3>
            <ul className="space-y-2">
              {t.footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizePath(link.href, locale)}
                    className="font-body text-sm text-text-muted transition-colors hover:text-gold focus-visible:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 font-heading text-base italic text-gold">
              {t.footer.services}
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={localizePath(`/usluge#${service.slug}`, locale)}
                    className="block text-balance font-body text-sm text-text-muted transition-colors hover:text-gold focus-visible:text-gold"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 font-heading text-base italic text-gold">
              {t.footer.contact}
            </h3>
            <ul className="space-y-2 font-body text-sm text-text-muted">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="transition-colors hover:text-gold focus-visible:text-gold"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all transition-colors hover:text-gold focus-visible:text-gold"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.address}</li>
              <li>
                <a
                  href={siteConfig.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold focus-visible:text-gold"
                >
                  orguljarstvo-kvaternik.hr
                  <span className="sr-only"> {t.newWindow}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border-dark pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-xs text-text-muted">
            © {currentYear} {siteConfig.name}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap gap-4">
            {t.nav.legal.map((link) => (
              <Link
                key={link.href}
                href={localizePath(link.href, locale)}
                className="font-body text-xs text-text-muted transition-colors hover:text-gold focus-visible:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-border-dark bg-background">
        <Container className="flex flex-col items-center gap-2 py-8 text-center">
          <p className="font-body text-sm text-text-muted">
            {t.footer.madeBy}
          </p>
          <a
            href="https://mangai.hr"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-3 rounded-sm px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <MangaiIcon className="h-8 w-8" />
            <MangaiWordmark className="h-8 transition-opacity group-hover:opacity-80" />
            <span className="sr-only">
              MangAI.hr {t.newWindow}
            </span>
          </a>
          <p className="mt-2 font-body text-xs text-text-muted">
            {t.footer.designRights} {currentYear} MangAI.hr. {t.footer.rights}
          </p>
        </Container>
      </div>
    </footer>
  );
}
