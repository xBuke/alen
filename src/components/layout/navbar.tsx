"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Button } from "@/components/ui/button";
import { desktopNavigation } from "@/data/site";
import { isNavHrefActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 32;

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrollY, setScrollY] = useState(0);

  const showSolidNav = !isHome || scrollY > SCROLL_THRESHOLD;

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
        showSolidNav
          ? "border-b border-border-dark bg-background/90 shadow-subtle backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between gap-4 transition-all duration-500 lg:gap-6",
          showSolidNav ? "h-16" : "h-20",
        )}
      >
        <Logo />

        <nav
          className="hidden items-center gap-4 lg:flex xl:gap-6 2xl:gap-7"
          aria-label="Glavna navigacija"
        >
          {desktopNavigation.map((item) => {
            const isActive = isNavHrefActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap py-1 font-body text-sm font-medium tracking-wide transition-colors hover:text-text-light",
                  showSolidNav ? "text-text-muted" : "text-text-light/90",
                  isActive && "text-text-light",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300",
                    isActive ? "w-full opacity-100" : "w-0 opacity-0",
                  )}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden rounded-sm sm:inline-flex"
            size="default"
          >
            <Link href="/kontakt">Pošaljite upit</Link>
          </Button>
          <MobileNavigation
            key={pathname}
            transparent={!showSolidNav}
          />
        </div>
      </Container>
    </header>
  );
}
