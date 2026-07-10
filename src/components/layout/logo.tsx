import Link from "next/link";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function Logo({ className, variant = "light" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex flex-col gap-0.5", className)}
      aria-label={`${siteConfig.name} — početna stranica`}
    >
      <span
        className={cn(
          "font-heading text-lg font-medium leading-none tracking-wide transition-colors md:text-xl",
          variant === "light"
            ? "text-text-light group-hover:text-gold"
            : "text-text-dark group-hover:text-bronze",
        )}
      >
        Orguljarstvo
      </span>
      <span
        className={cn(
          "font-body text-[0.65rem] font-medium uppercase tracking-[0.25em] transition-colors md:text-xs",
          variant === "light" ? "text-gold" : "text-bronze",
        )}
      >
        Kvaternik
      </span>
    </Link>
  );
}
