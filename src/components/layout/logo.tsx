import Link from "next/link";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
  showLocation?: boolean;
};

function OrganMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <rect x="1" y="10" width="3.5" height="26" rx="0.5" fill="currentColor" />
      <rect x="7" y="6" width="3.5" height="30" rx="0.5" fill="currentColor" />
      <rect x="13" y="14" width="3.5" height="22" rx="0.5" fill="currentColor" />
      <rect x="19" y="2" width="3.5" height="34" rx="0.5" fill="currentColor" />
      <rect x="25" y="8" width="2" height="28" rx="0.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function Logo({
  className,
  variant = "light",
  showLocation = true,
}: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${siteConfig.name} — početna stranica`}
    >
      <OrganMark
        className={cn(
          "h-9 w-7 transition-colors md:h-10 md:w-8",
          isLight
            ? "text-gold group-hover:text-text-light"
            : "text-bronze group-hover:text-text-dark",
        )}
      />
      <span className="flex flex-col gap-0.5">
        <span
          className={cn(
            "font-heading text-base font-medium leading-tight tracking-wide transition-colors md:text-lg",
            isLight
              ? "text-text-light group-hover:text-gold"
              : "text-text-dark group-hover:text-bronze",
          )}
        >
          Orguljarstvo Kvaternik
        </span>
        {showLocation ? (
          <span
            className={cn(
              "font-body text-[0.6rem] font-medium uppercase tracking-[0.2em] transition-colors md:text-[0.65rem]",
              isLight ? "text-text-muted" : "text-text-dark/60",
            )}
          >
            Draganovec
          </span>
        ) : null}
      </span>
    </Link>
  );
}
