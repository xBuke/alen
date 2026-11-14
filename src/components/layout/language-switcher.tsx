"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getAlternatePath, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-context";
import { getUi } from "@/i18n/ui";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
  /** Prikaz kao HR | EN (zadano) ili samo drugi jezik. */
  variant?: "pair" | "single";
};

const order: Locale[] = ["hr", "en"];

export function LanguageSwitcher({
  className,
  variant = "pair",
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const target: Locale = locale === "hr" ? "en" : "hr";
  const t = getUi(locale);

  if (variant === "single") {
    return (
      <Link
        href={getAlternatePath(pathname, target)}
        hrefLang={target}
        lang={target}
        className={className}
      >
        {t.language.full}
      </Link>
    );
  }

  return (
    <div
      className={cn("flex items-center gap-1 font-body text-xs", className)}
      role="group"
      aria-label={t.language.label}
    >
      {order.map((code, index) => {
        const isCurrent = code === locale;

        return (
          <span key={code} className="flex items-center gap-1">
            {index > 0 ? (
              <span aria-hidden="true" className="text-text-muted/50">
                |
              </span>
            ) : null}
            {isCurrent ? (
              <span
                aria-current="true"
                className="font-medium tracking-[0.12em] text-gold"
              >
                {code.toUpperCase()}
              </span>
            ) : (
              <Link
                href={getAlternatePath(pathname, code)}
                hrefLang={code}
                lang={code}
                aria-label={getUi(code).language.full}
                className="tracking-[0.12em] text-text-muted transition-colors hover:text-text-light focus-visible:text-text-light"
              >
                {code.toUpperCase()}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
