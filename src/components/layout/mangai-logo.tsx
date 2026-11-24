/*
 * Potpis MangAI.hr u podnožju (isti logo kao na vinagovorko.hr):
 * pikselna ikona + natpis MANGAI u fontu Jersey 10 (public/fonts, OFL).
 */
import { cn } from "@/lib/utils";

export function MangaiIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={cn("shrink-0", className)}
    >
      <rect width="16" height="16" rx="3" fill="#0D1514" /><rect x="10" y="1" width="2" height="1" fill="#8FD16A" /><rect x="8" y="2" width="3" height="1" fill="#8FD16A" /><rect x="11" y="2" width="1" height="1" fill="#5FA544" /><rect x="8" y="3" width="2" height="1" fill="#8FD16A" /><rect x="10" y="3" width="1" height="1" fill="#5FA544" /><rect x="6" y="4" width="3" height="1" fill="#FFC93C" /><rect x="9" y="4" width="1" height="1" fill="#0D1514" /><rect x="4" y="5" width="8" height="1" fill="#FFC93C" /><rect x="3" y="6" width="1" height="1" fill="#FFC93C" /><rect x="4" y="6" width="2" height="1" fill="#FFF1C2" /><rect x="6" y="6" width="7" height="1" fill="#FFC93C" /><rect x="3" y="7" width="1" height="1" fill="#FFC93C" /><rect x="4" y="7" width="1" height="1" fill="#FFF1C2" /><rect x="5" y="7" width="8" height="1" fill="#FFC93C" /><rect x="13" y="7" width="1" height="1" fill="#F08A2C" /><rect x="2" y="8" width="11" height="1" fill="#FFC93C" /><rect x="13" y="8" width="1" height="1" fill="#F08A2C" /><rect x="2" y="9" width="10" height="1" fill="#FFC93C" /><rect x="12" y="9" width="2" height="1" fill="#F08A2C" /><rect x="2" y="10" width="1" height="1" fill="#F08A2C" /><rect x="3" y="10" width="8" height="1" fill="#FFC93C" /><rect x="11" y="10" width="3" height="1" fill="#F08A2C" /><rect x="3" y="11" width="1" height="1" fill="#F08A2C" /><rect x="4" y="11" width="6" height="1" fill="#FFC93C" /><rect x="10" y="11" width="3" height="1" fill="#F08A2C" /><rect x="13" y="11" width="1" height="1" fill="#D96E12" /><rect x="3" y="12" width="3" height="1" fill="#F08A2C" /><rect x="6" y="12" width="2" height="1" fill="#FFC93C" /><rect x="8" y="12" width="4" height="1" fill="#F08A2C" /><rect x="12" y="12" width="1" height="1" fill="#D96E12" /><rect x="4" y="13" width="1" height="1" fill="#D96E12" /><rect x="5" y="13" width="6" height="1" fill="#F08A2C" /><rect x="11" y="13" width="1" height="1" fill="#D96E12" /><rect x="6" y="14" width="4" height="1" fill="#D96E12" />
    </svg>
  );
}

export function MangaiWordmark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 62 22"
      className={cn("w-auto overflow-visible", className)}
    >
      <text
        x="0"
        y="18"
        fontSize="24"
        className="fill-text-light"
        style={{ fontFamily: '"Jersey 10", monospace' }}
      >
        MANG<tspan fill="#EE7A12">AI</tspan>
      </text>
    </svg>
  );
}
