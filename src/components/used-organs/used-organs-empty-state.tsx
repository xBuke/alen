import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UsedOrgansEmptyStateProps = {
  className?: string;
};

export function UsedOrgansEmptyState({ className }: UsedOrgansEmptyStateProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-2xl border border-border-dark bg-surface px-8 py-14 text-center md:px-12 md:py-16",
        className,
      )}
    >
      <h2 className="text-balance text-2xl md:text-3xl">
        Ponuda polovnih orgulja uskoro će biti objavljena.
      </h2>
      <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-text-muted md:text-base">
        Za informacije o trenutačno dostupnim instrumentima obratite nam se
        putem kontaktne forme.
      </p>
      <Button asChild className="mt-8 rounded-sm">
        <Link href="/kontakt?vrsta=polovne-orgulje">Pošaljite upit</Link>
      </Button>
    </div>
  );
}
