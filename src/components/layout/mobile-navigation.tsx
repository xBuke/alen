"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useMemo, useState } from "react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { getSiteConfig } from "@/content";
import { localizePath, toHrPath } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-context";
import { getUi } from "@/i18n/ui";
import { getMobileNavItems, isNavHrefActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type MobileNavigationProps = {
  transparent?: boolean;
};

export function MobileNavigation({ transparent = false }: MobileNavigationProps) {
  const pathname = usePathname() ?? "/";
  const locale = useLocale();
  const t = getUi(locale);
  const siteConfig = getSiteConfig(locale);
  const hrPathname = toHrPath(pathname);
  const [open, setOpen] = useState(false);
  const items = useMemo(() => getMobileNavItems(locale), [locale]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "min-h-11 min-w-11 lg:hidden",
            transparent
              ? "text-text-light hover:bg-white/10 hover:text-text-light"
              : "text-text-muted hover:text-text-light",
          )}
          aria-label={t.nav.openMenu}
          aria-expanded={open}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col border-border-dark bg-background p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border-dark px-6 py-6 text-left">
          <SheetTitle className="sr-only">{t.nav.menuTitle}</SheetTitle>
          <Logo showLocation={false} locale={locale} />
        </SheetHeader>

        <nav
          className="flex flex-1 flex-col overflow-y-auto px-6 py-8"
          aria-label={t.nav.mobileAria}
        >
          {items.map((item) => {
            const isActive = isNavHrefActive(hrPathname, item.href);

            return (
              <SheetClose key={item.href} asChild>
                <Link
                  href={localizePath(item.href, locale)}
                  className={cn(
                    "group flex items-baseline gap-4 border-b border-border-dark py-5 transition-colors",
                    isActive ? "text-gold" : "text-text-light hover:text-gold",
                  )}
                >
                  <span
                    className="font-body text-xs font-medium tracking-[0.2em] text-gold/70"
                    aria-hidden="true"
                  >
                    {item.number}
                  </span>
                  <span className="font-heading text-2xl font-medium tracking-tight">
                    {item.label}
                  </span>
                </Link>
              </SheetClose>
            );
          })}
        </nav>

        <div className="mt-auto space-y-6 border-t border-border-dark px-6 py-8">
          <SheetClose asChild>
            <Button asChild className="w-full ">
              <Link href={localizePath("/kontakt", locale)}>{t.sendInquiry}</Link>
            </Button>
          </SheetClose>
          <LanguageSwitcher />
          <div className="space-y-2 font-body text-sm text-text-muted">
            <a
              href={siteConfig.phoneHref}
              className="block transition-colors hover:text-gold focus-visible:text-gold"
            >
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block break-all transition-colors hover:text-gold focus-visible:text-gold"
            >
              {siteConfig.email}
            </a>
            <p>{siteConfig.address}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
