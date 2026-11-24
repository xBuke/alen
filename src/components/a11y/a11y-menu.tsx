"use client";

/*
 * Izbornik pristupačnosti (ikona čovječuljka). Vlastita komponenta, bez
 * vanjskih skripti ("overlaya"): ne mijenja sadržaj ni semantiku stranice,
 * samo dodaje korisničke postavke prikaza preko klasa na <html>
 * (vidi src/lib/a11y-settings.ts i "Izbornik pristupačnosti" u globals.css).
 */

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { Minus, Plus, RotateCcw, X } from "lucide-react";
import { useState } from "react";

import { localizePath } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-context";
import { getUi } from "@/i18n/ui";
import {
  a11yToggles,
  applyA11ySettings,
  defaultA11ySettings,
  readA11ySettings,
  saveA11ySettings,
  textScaleSteps,
  type A11ySettings,
  type A11yToggle,
} from "@/lib/a11y-settings";
import { cn } from "@/lib/utils";

/** Međunarodni simbol pristupačnosti (čovječuljak raširenih ruku u krugu). */
function AccessIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10.25" />
      <circle cx="12" cy="6.6" r="1.5" fill="currentColor" stroke="none" />
      <path d="M6.5 9.4c1.9.55 3.7.85 5.5.85s3.6-.3 5.5-.85" />
      <path d="M12 10.3v3.6m0 0-2.4 4.9m2.4-4.9 2.4 4.9" />
    </svg>
  );
}

function Switch({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <p id={`${id}-label`} className="font-body text-sm font-medium text-text-light">
          {label}
        </p>
        <p id={`${id}-desc`} className="mt-0.5 font-body text-xs leading-relaxed text-text-muted">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-desc`}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative mt-0.5 inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          checked
            ? "border-gold bg-gold"
            : "border-border-input bg-background",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "inline-block h-5 w-5 rounded-full transition-transform",
            checked ? "translate-x-6 bg-background" : "translate-x-1 bg-text-muted",
          )}
        />
      </button>
    </div>
  );
}

export function A11yMenu() {
  const locale = useLocale();
  const t = getUi(locale).a11y;
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(defaultA11ySettings);

  function update(next: A11ySettings) {
    setSettings(next);
    applyA11ySettings(next);
    saveA11ySettings(next);
  }

  function setToggle(key: A11yToggle, value: boolean) {
    update({ ...settings, [key]: value });
  }

  function changeScale(delta: number) {
    const next = Math.min(
      textScaleSteps.length - 1,
      Math.max(0, settings.textScale + delta),
    );
    update({ ...settings, textScale: next });
  }

  const scale = textScaleSteps[settings.textScale] ?? 100;
  const active =
    JSON.stringify(settings) !== JSON.stringify(defaultA11ySettings);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        // Postavke se čitaju pri otvaranju, ne pri učitavanju stranice:
        // tako nema razlike između HTML-a sa servera i preglednika.
        if (next) setSettings(readA11ySettings());
        setOpen(next);
      }}
    >
      <Dialog.Trigger asChild>
        <button
          type="button"
          data-floating
          className="a11y-trigger fixed bottom-4 left-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/70 bg-background text-gold shadow-elevated transition-colors hover:bg-gold hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background print:hidden md:bottom-6 md:left-6"
        >
          <AccessIcon className="h-7 w-7" />
          <span className="sr-only">{t.open}</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-background/40" />
        <Dialog.Content
          className="a11y-panel fixed bottom-0 left-0 z-[61] flex max-h-[100dvh] w-full flex-col border-t border-border-dark bg-surface shadow-elevated focus:outline-none sm:bottom-6 sm:left-6 sm:max-h-[calc(100dvh-3rem)] sm:w-[26rem] sm:rounded-lg sm:border"
          aria-describedby="a11y-panel-desc"
        >
          <div className="flex items-start justify-between gap-4 border-b border-border-dark px-5 py-4">
            <div className="flex items-center gap-3">
              <AccessIcon className="h-7 w-7 shrink-0 text-gold" />
              <div>
                <Dialog.Title className="font-heading text-xl text-text-light">
                  {t.title}
                </Dialog.Title>
                <Dialog.Description
                  id="a11y-panel-desc"
                  className="font-body text-xs text-text-muted"
                >
                  {t.description}
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm text-text-muted hover:bg-surface-elevated hover:text-text-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <X className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">{t.close}</span>
              </button>
            </Dialog.Close>
          </div>

          <div className="overflow-y-auto px-5 py-2">
            <div
              role="group"
              aria-labelledby="a11y-text-size"
              className="flex items-center justify-between gap-4 border-b border-border-dark py-3"
            >
              <div>
                <p id="a11y-text-size" className="font-body text-sm font-medium text-text-light">
                  {t.textSize}
                </p>
                <p className="mt-0.5 font-body text-xs text-text-muted">
                  {t.textSizeHelp}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => changeScale(-1)}
                  disabled={settings.textScale === 0}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border-input text-text-light hover:border-gold disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{t.smaller}</span>
                </button>
                <output
                  aria-live="polite"
                  className="w-14 text-center font-body text-sm tabular-nums text-text-light"
                >
                  {scale}%
                </output>
                <button
                  type="button"
                  onClick={() => changeScale(1)}
                  disabled={settings.textScale === textScaleSteps.length - 1}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border-input text-text-light hover:border-gold disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{t.larger}</span>
                </button>
              </div>
            </div>

            <div className="divide-y divide-border-dark">
              {a11yToggles.map((key) => (
                <Switch
                  key={key}
                  id={`a11y-${key}`}
                  label={t.options[key].label}
                  description={t.options[key].help}
                  checked={settings[key]}
                  onChange={(value) => setToggle(key, value)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-border-dark px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => update(defaultA11ySettings)}
              disabled={!active}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-border-input px-4 font-body text-sm text-text-light hover:border-gold disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {t.reset}
            </button>
            <Link
              href={localizePath("/izjava-o-pristupacnosti", locale)}
              onClick={() => setOpen(false)}
              className="inline-flex min-h-11 items-center font-body text-sm text-gold underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
            >
              {t.statement}
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
