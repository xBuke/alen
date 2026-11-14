import Link from "next/link";

import { Button } from "@/components/ui/button";
import { localizePath, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";
import { cn } from "@/lib/utils";

type UsedOrgansEmptyStateProps = {
  className?: string;
  locale?: Locale;
};

export function UsedOrgansEmptyState({
  className,
  locale = "hr",
}: UsedOrgansEmptyStateProps) {
  const t = getUi(locale);

  return (
    <div
      className={cn(
        "mx-auto max-w-2xl border border-border-dark bg-surface px-8 py-14 text-center md:px-12 md:py-16",
        className,
      )}
    >
      <h2 className="text-balance text-2xl md:text-3xl">
        {t.usedOrgans.emptyTitle}
      </h2>
      <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-text-muted md:text-base">
        {t.usedOrgans.emptyDescription}
      </p>
      <Button asChild className="mt-8 ">
        <Link href={localizePath("/kontakt?vrsta=polovne-orgulje", locale)}>
          {t.sendInquiry}
        </Link>
      </Button>
    </div>
  );
}
