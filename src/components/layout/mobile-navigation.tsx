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
import { navigation, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type MobileNavigationProps = {
  transparent?: boolean;
};

type MobileNavEntry =
  | { kind: "link"; label: string; href: string; number: string }
  | {
      kind: "group";
      label: string;
      children: Array<{ label: string; href: string; number: string }>;
    };

function buildMobileEntries(): MobileNavEntry[] {
  const entries: MobileNavEntry[] = [];
  let index = 0;

  for (const item of navigation.main) {
    if ("children" in item && item.children) {
      entries.push({
        kind: "group",
        label: item.label,
        children: item.children.map((child) => {
          index += 1;
          return {
            label: child.label,
            href: child.href,
            number: String(index).padStart(2, "0"),
          };
        }),
      });
      continue;
    }

    index += 1;
    entries.push({
      kind: "link",
      label: item.label,
      href: item.href,
      number: String(index).padStart(2, "0"),
    });
  }

  return entries;
}

export function MobileNavigation({ transparent = false }: MobileNavigationProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const entries = useMemo(() => buildMobileEntries(), []);

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
          aria-label="Otvori izbornik"
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
          <SheetTitle className="sr-only">Navigacija</SheetTitle>
          <Logo showLocation={false} />
        </SheetHeader>

        <nav
          className="flex flex-1 flex-col overflow-y-auto px-6 py-8"
          aria-label="Mobilna navigacija"
        >
          {entries.map((entry) => {
            if (entry.kind === "group") {
              return (
                <div
                  key={entry.label}
                  className="border-b border-border-dark py-5"
                >
                  <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.2em] text-gold/70">
                    {entry.label}
                  </p>
                  <div className="space-y-3 pl-1">
                    {entry.children.map((child) => {
                      const isActive = pathname.startsWith(child.href);
                      return (
                        <SheetClose key={child.href} asChild>
                          <Link
                            href={child.href}
                            className={cn(
                              "flex items-baseline gap-4 transition-colors",
                              isActive
                                ? "text-gold"
                                : "text-text-light hover:text-gold",
                            )}
                          >
                            <span
                              className="font-body text-xs font-medium tracking-[0.2em] text-gold/70"
                              aria-hidden="true"
                            >
                              {child.number}
                            </span>
                            <span className="font-heading text-xl font-medium tracking-tight">
                              {child.label}
                            </span>
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const isActive =
              entry.href === "/"
                ? pathname === "/"
                : pathname.startsWith(entry.href);

            return (
              <SheetClose key={entry.href} asChild>
                <Link
                  href={entry.href}
                  className={cn(
                    "group flex items-baseline gap-4 border-b border-border-dark py-5 transition-colors",
                    isActive ? "text-gold" : "text-text-light hover:text-gold",
                  )}
                >
                  <span
                    className="font-body text-xs font-medium tracking-[0.2em] text-gold/70"
                    aria-hidden="true"
                  >
                    {entry.number}
                  </span>
                  <span className="font-heading text-2xl font-medium tracking-tight">
                    {entry.label}
                  </span>
                </Link>
              </SheetClose>
            );
          })}
        </nav>

        <div className="mt-auto space-y-6 border-t border-border-dark px-6 py-8">
          <SheetClose asChild>
            <Button asChild className="w-full rounded-sm">
              <Link href="/kontakt">Pošaljite upit</Link>
            </Button>
          </SheetClose>
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
