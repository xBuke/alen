"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { SiteImage } from "@/components/media/site-image";
import type { GalleryItem } from "@/types";
import { cn } from "@/lib/utils";

type ImageLightboxProps = {
  items: GalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function ImageLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const item = items[activeIndex];
  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex < items.length - 1;

  useEffect(() => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, []);

  const trapFocus = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      FOCUSABLE_SELECTOR,
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      trapFocus(event);

      switch (event.key) {
        case "Escape":
          event.preventDefault();
          onClose();
          break;
        case "ArrowLeft":
          if (hasPrevious) {
            event.preventDefault();
            onNavigate(activeIndex - 1);
          }
          break;
        case "ArrowRight":
          if (hasNext) {
            event.preventDefault();
            onNavigate(activeIndex + 1);
          }
          break;
        default:
          break;
      }
    },
    [trapFocus, onClose, onNavigate, activeIndex, hasPrevious, hasNext],
  );

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      const startX = touchStartX.current;
      const endX = event.changedTouches[0]?.clientX;
      touchStartX.current = null;

      if (startX === null || endX === undefined) return;

      const delta = endX - startX;
      const threshold = 50;

      if (delta > threshold && hasPrevious) {
        onNavigate(activeIndex - 1);
      } else if (delta < -threshold && hasNext) {
        onNavigate(activeIndex + 1);
      }
    },
    [activeIndex, hasPrevious, hasNext, onNavigate],
  );

  if (!item) return null;

  const titleId = "lightbox-title";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm motion-reduce:backdrop-blur-none md:p-8"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-full w-full max-w-5xl flex-col outline-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <p
            id={titleId}
            className="font-body text-xs uppercase tracking-[0.15em] text-text-muted"
          >
            {activeIndex + 1} / {items.length}
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border-dark text-text-light transition-colors hover:border-gold hover:text-gold",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            aria-label="Zatvori galeriju"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative aspect-[4/3] max-h-[70vh] w-full overflow-hidden rounded-sm bg-surface">
          <SiteImage
            image={item.image}
            fill
            sizes="100vw"
            className="absolute inset-0"
            imageClassName="object-contain"
            showTemporaryBadge={false}
          />
        </div>

        <div className="mt-4 space-y-2">
          <p className="font-heading text-lg md:text-xl">{item.title}</p>
          {item.caption ? (
            <p className="text-sm text-text-muted md:text-base">
              {item.caption}
            </p>
          ) : null}
          <p className="sr-only">{item.alt}</p>
        </div>

        {hasPrevious ? (
          <button
            type="button"
            onClick={() => onNavigate(activeIndex - 1)}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 rounded-sm border border-border-dark bg-background/80 p-2 text-text-light backdrop-blur-sm transition-colors hover:border-gold hover:text-gold md:left-4 md:p-3",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            aria-label="Prethodna fotografija"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
          </button>
        ) : null}

        {hasNext ? (
          <button
            type="button"
            onClick={() => onNavigate(activeIndex + 1)}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 rounded-sm border border-border-dark bg-background/80 p-2 text-text-light backdrop-blur-sm transition-colors hover:border-gold hover:text-gold md:right-4 md:p-3",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            aria-label="Sljedeća fotografija"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
