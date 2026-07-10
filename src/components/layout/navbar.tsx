"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Button } from "@/components/ui/button";
import { navigation } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isScrolled
          ? "border-b border-border-dark bg-background/90 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Glavna navigacija"
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
                  "relative font-body text-sm font-medium tracking-wide text-text-muted transition-colors hover:text-text-light",
                  isActive && "text-text-light",
                )}
              >
                {item.label}
                {isActive ? (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-gold" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/kontakt">Pošaljite upit</Link>
          </Button>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
