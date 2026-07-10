"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigation, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Otvori izbornik"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="border-b border-border-dark pb-6 text-left">
          <SheetTitle className="sr-only">Navigacija</SheetTitle>
          <Logo />
        </SheetHeader>

        <nav
          className="flex flex-1 flex-col gap-1 py-8"
          aria-label="Mobilna navigacija"
        >
          {navigation.main.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-3 font-body text-lg font-medium transition-colors hover:bg-surface-elevated hover:text-gold",
                  isActive ? "text-gold" : "text-text-light",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-4 border-t border-border-dark pt-6">
          <Button asChild className="w-full">
            <Link href="/kontakt">Pošaljite upit</Link>
          </Button>
          <div className="space-y-1 font-body text-sm text-text-muted">
            <a href={siteConfig.phoneHref} className="block hover:text-gold">
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block hover:text-gold"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
