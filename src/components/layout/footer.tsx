import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { footerContent, navigation, siteConfig } from "@/data/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-dark bg-surface">
      <Container className="section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-2">
            <Logo />
            <p className="max-w-md text-sm leading-relaxed text-text-muted">
              {footerContent.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-body text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Navigacija
            </h3>
            <ul className="space-y-2">
              {footerContent.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-body text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Kontakt
            </h3>
            <ul className="space-y-2 font-body text-sm text-text-muted">
              <li>
                <a href={siteConfig.phoneHref} className="hover:text-gold">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-gold"
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
                  className="hover:text-gold"
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
                className="font-body text-xs text-text-muted transition-colors hover:text-gold"
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
