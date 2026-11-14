import { SiteImage } from "@/components/media/site-image";
import type { BeforeAfterPair } from "@/data/before-after";
import type { ImageAsset } from "@/types";
import { getUi } from "@/i18n/ui";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

function Frame({
  image,
  label,
  tone,
}: {
  image: ImageAsset;
  label: string;
  tone: "before" | "after" | "both";
}) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border-dark bg-surface">
      <SiteImage
        image={image}
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className="absolute inset-0"
        showTemporaryBadge={false}
      />
      <span
        className={cn(
          "absolute left-3 top-3 rounded-sm px-2.5 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-[0.18em]",
          tone === "after"
            ? "bg-gold text-background"
            : "bg-background/85 text-text-light backdrop-blur-sm",
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function BeforeAfter({
  pair,
  className,
  locale = "hr",
}: {
  pair: BeforeAfterPair;
  className?: string;
  locale?: Locale;
}) {
  const t = getUi(locale).gallery;

  return (
    <figure className={cn("not-prose", className)}>
      {pair.combined ? (
        <div className="mx-auto max-w-md">
          <Frame image={pair.combined} label={t.both} tone="both" />
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {pair.before ? (
            <Frame image={pair.before} label={t.before} tone="before" />
          ) : null}
          {pair.after ? (
            <Frame image={pair.after} label={t.after} tone="after" />
          ) : null}
        </div>
      )}
      <figcaption className="mt-3 text-sm text-text-muted">
        <span className="font-medium text-text-light">{pair.title}.</span>{" "}
        {pair.description}
      </figcaption>
    </figure>
  );
}
