import Link from "next/link";

import { localizePath, type Locale } from "@/i18n/config";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  locale?: Locale;
};

export function Breadcrumbs({
  items,
  className,
  locale = "hr",
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-xs tracking-wide text-text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-text-muted/50">
                  /
                </span>
              ) : null}
              {isLast || !item.href ? (
                <span aria-current="page" className="text-text-muted/80">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={localizePath(item.href, locale)}
                  className="transition-colors hover:text-gold focus-visible:text-gold"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
