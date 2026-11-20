import Link from "next/link";

import { localizePath, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
  showLocation?: boolean;
  locale?: Locale;
};

function OrganMark({
  className,
  isLight,
}: {
  className?: string;
  isLight: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      // Umanjena WebP inačica (14 KB umjesto 70 KB PNG-a); prikazuje se na najviše 64 px širine.
      src={
        isLight
          ? "/brand/logo-mark-light-224.webp"
          : "/brand/logo-mark-dark-224.webp"
      }
      alt=""
      width={224}
      height={160}
      className={cn("shrink-0 object-contain", className)}
      aria-hidden="true"
    />
  );
}

export function Logo({
  className,
  variant = "light",
  showLocation = true,
  locale = "hr",
}: LogoProps) {
  const isLight = variant === "light";
  const t = getUi(locale);

  return (
    <Link
      href={localizePath("/", locale)}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <OrganMark
        isLight={isLight}
        className="h-10 w-14 transition-opacity group-hover:opacity-80 md:h-12 md:w-16"
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
            {t.logoLocation}
          </span>
        ) : null}
        {/* Vidljivi tekst ostaje početak naziva linka (WCAG 2.5.3). */}
        <span className="sr-only">, {t.nav.homeAria}</span>
      </span>
    </Link>
  );
}
