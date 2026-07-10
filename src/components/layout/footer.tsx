import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { footerContent, navigation, siteConfig } from "@/data/site";
import { services } from "@/data/services";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-dark bg-surface">
      <Container className="section-padding">
        <p className="mb-12 max-w-4xl font-heading text-2xl font-medium leading-snug tracking-tight text-text-light md:text-3xl lg:text-4xl">
          {footerContent.statement}
        </p>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-4 lg:col-span-4">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-text-muted">
              {footerContent.description}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 font-body text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Navigacija
            </h3>
            <ul className="space-y-2">
              {footerContent.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-text-muted transition-colors hover:text-gold focus-visible:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 font-body text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Usluge
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/usluge#${service.slug}`}
                    className="font-body text-sm text-text-muted transition-colors hover:text-gold focus-visible:text-gold"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 font-body text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Kontakt
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
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border-dark pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-xs text-text-muted">
            © {currentYear} {siteConfig.name}. Sva prava pridržana.
          </p>
          <div className="flex flex-wrap gap-4">
            {navigation.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-xs text-text-muted transition-colors hover:text-gold focus-visible:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
