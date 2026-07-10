import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { LEGAL_REVIEW_REQUIRED } from "@/data/legal";

const isDevelopment = process.env.NODE_ENV === "development";

type LegalReviewBadgeProps = {
  className?: string;
};

export function LegalReviewBadge({ className }: LegalReviewBadgeProps) {
  if (!isDevelopment || !LEGAL_REVIEW_REQUIRED) {
    return null;
  }

  return (
    <p
      className={cn(
        "mb-8 inline-block rounded-sm border border-gold/30 bg-gold/10 px-3 py-1.5 font-body text-xs uppercase tracking-[0.12em] text-gold",
        className,
      )}
    >
      Potreban pravni pregled prije produkcijske objave
    </p>
  );
}

type LegalContentProps = {
  children: ReactNode;
  className?: string;
};

export function LegalContent({ children, className }: LegalContentProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-[52rem] space-y-12 font-body text-base leading-relaxed text-text-muted",
        className,
      )}
    >
      {children}
    </div>
  );
}

type LegalSectionProps = {
  id?: string;
  number?: number;
  title: string;
  children: ReactNode;
};

export function LegalSection({
  id,
  number,
  title,
  children,
}: LegalSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-nav border-t border-border-dark pt-10 first:border-t-0 first:pt-0"
    >
      <h2 className="text-balance text-2xl text-text-light md:text-3xl">
        {number ? (
          <span className="mr-3 font-body text-sm font-medium tracking-[0.2em] text-gold">
            {String(number).padStart(2, "0")}
          </span>
        ) : null}
        {title}
      </h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}
