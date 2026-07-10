"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

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

export function MobileNavigation({ transparent = false }: MobileNavigationProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "lg:hidden",
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
          className="flex flex-1 flex-col px-6 py-8"
          aria-label="Mobilna navigacija"
        >
          {navigation.main.map((item, index) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const number = String(index + 1).padStart(2, "0");

            return (
              <SheetClose key={item.href} asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-baseline gap-4 border-b border-border-dark py-5 transition-colors",
                    isActive ? "text-gold" : "text-text-light hover:text-gold",
                  )}
                >
                  <span
                    className="font-body text-xs font-medium tracking-[0.2em] text-gold/70"
                    aria-hidden="true"
                  >
                    {number}
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
