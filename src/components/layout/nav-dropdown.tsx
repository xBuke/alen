"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type NavChild = {
  label: string;
  href: string;
};

type NavDropdownProps = {
  label: string;
  items: readonly NavChild[];
  solid: boolean;
};

export function NavDropdown({ label, items, solid }: NavDropdownProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const isActive = items.some((child) => pathname.startsWith(child.href));

  useEffect(() => {
    if (!open) return;

    const handlePointer = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={cn(
          "relative inline-flex min-h-11 items-center gap-1 py-1 font-body text-sm font-medium tracking-wide transition-colors hover:text-text-light",
          solid ? "text-text-muted" : "text-text-light/90",
          (isActive || open) && "text-text-light",
        )}
      >
        {label}
        <span aria-hidden="true" className="text-[0.65rem]">
          ▾
        </span>
        <span
          className={cn(
            "absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300",
            isActive ? "w-full opacity-100" : "w-0 opacity-0",
          )}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 min-w-[12rem] border border-border-dark bg-background/95 py-2 shadow-subtle backdrop-blur-md"
        >
          {items.map((child) => {
            const childActive = pathname.startsWith(child.href);
            return (
              <Link
                key={child.href}
                href={child.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-4 py-2.5 font-body text-sm transition-colors hover:bg-surface hover:text-text-light",
                  childActive ? "text-gold" : "text-text-muted",
                )}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
