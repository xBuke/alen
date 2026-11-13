import { cn } from "@/lib/utils";

const HEIGHTS = [
  30, 42, 54, 66, 78, 90, 100, 90, 78, 66, 54, 42, 30, 38, 50, 62, 74, 86, 74,
  62, 50, 38,
];

/**
 * Dekorativni motiv: niz svirala različitih visina, kao prospekt orgulja
 * sveden na linije. Koristi se kao tihi potpis stranice.
 */
export function PipeRule({
  className,
  count = HEIGHTS.length,
}: {
  className?: string;
  count?: number;
}) {
  return (
    <div
      className={cn("pipe-rule", className)}
      aria-hidden="true"
    >
      {HEIGHTS.slice(0, count).map((height, index) => (
        <span key={index} style={{ height: `${height}%` }} />
      ))}
    </div>
  );
}
