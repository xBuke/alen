import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { PipeRule } from "@/components/media/pipe-rule";
import { footerContent, navigation, siteConfig } from "@/data/site";
import { services } from "@/data/services";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-dark bg-surface">
      <Container className="section-padding">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-3xl text-balance font-heading text-3xl italic leading-tight text-text-light md:text-5xl">
            {footerContent.statement}
          </p>
          <PipeRule className="h-20 shrink-0" />
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-4 lg:col-span-4">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-text-muted">
              {footerContent.description}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 font-heading text-base italic text-gold">
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
            <h3 className="mb-4 font-heading text-base italic text-gold">
              Usluge
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/usluge#${service.slug}`}
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
          <div className="space-y-1 font-body text-xs text-text-muted">
            <p>
              © {currentYear} {siteConfig.name}. Sva prava pridržana.
            </p>
            <p>
              Izrada i održavanje stranice:{" "}
              <a
                href="https://mangai.hr"
                target="_blank"
                rel="noopener"
                className="text-text-light underline decoration-gold/50 underline-offset-4 transition-colors hover:text-gold focus-visible:text-gold"
              >
                mangai.hr
              </a>
              . Dizajn i kod © {currentYear} Mangai. Sva prava pridržana.
            </p>
          </div>
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
