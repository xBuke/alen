"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/media/motion-reveal";
import { cn } from "@/lib/utils";

type AnatomyPart = {
  id: string;
  label: string;
  description: string;
};

type OrganAnatomyProps = {
  title: string;
  parts: readonly AnatomyPart[];
};

type HotspotConfig = {
  cx: number;
  cy: number;
  r: number;
};

const hotspots: Record<string, HotspotConfig> = {
  facade: { cx: 200, cy: 120, r: 70 },
  pipes: { cx: 200, cy: 75, r: 45 },
  console: { cx: 90, cy: 290, r: 40 },
  keyboards: { cx: 140, cy: 305, r: 30 },
  stops: { cx: 55, cy: 265, r: 25 },
  wind: { cx: 295, cy: 240, r: 32 },
  action: { cx: 200, cy: 210, r: 38 },
};

function OrganIllustration({
  parts,
  activeId,
  onSelect,
  groupId,
}: {
  parts: readonly AnatomyPart[];
  activeId: string;
  onSelect: (id: string) => void;
  groupId: string;
}) {
  return (
    <svg
      viewBox="0 0 400 360"
      className="mx-auto w-full max-w-md text-text-muted"
      role="img"
      aria-labelledby={`${groupId}-title`}
    >
      <title id={`${groupId}-title`}>
        Shema orgulja — interaktivna ilustracija
      </title>

      <g aria-hidden="true">
        <path
          d="M90,210 L310,210 L290,35 L110,35 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-border-dark"
        />
        {[120, 150, 180, 210, 240, 270].map((x) => (
          <rect
            key={x}
            x={x}
            y={45}
            width={12}
            height={160}
            rx={2}
            fill="currentColor"
            className="text-surface-elevated"
          />
        ))}
        <rect
          x={40}
          y={260}
          width={100}
          height={60}
          rx={3}
          fill="currentColor"
          className="text-surface"
        />
        <rect
          x={250}
          y={220}
          width={80}
          height={40}
          rx={2}
          fill="currentColor"
          className="text-surface-elevated"
        />
        <line
          x1={140}
          y1={290}
          x2={200}
          y2={220}
          stroke="currentColor"
          strokeWidth="1"
          className="text-gold/30"
          strokeDasharray="4 3"
        />
        <line
          x1={200}
          y1={220}
          x2={280}
          y2={240}
          stroke="currentColor"
          strokeWidth="1"
          className="text-gold/30"
          strokeDasharray="4 3"
        />
      </g>

      {parts.map((part) => {
        const spot = hotspots[part.id];
        if (!spot) return null;
        const isActive = activeId === part.id;

        return (
          <circle
            key={part.id}
            cx={spot.cx}
            cy={spot.cy}
            r={spot.r}
            fill={isActive ? "rgba(179,138,90,0.22)" : "rgba(255,255,255,0.02)"}
            stroke={isActive ? "#b38a5a" : "rgba(179,138,90,0.2)"}
            strokeWidth={isActive ? 2 : 1}
            aria-hidden="true"
            className="pointer-events-auto cursor-pointer"
            onClick={() => onSelect(part.id)}
            onMouseEnter={() => onSelect(part.id)}
          />
        );
      })}
    </svg>
  );
}

function MobileAccordion({
  parts,
  openId,
  onToggle,
}: {
  parts: readonly AnatomyPart[];
  openId: string | null;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="space-y-0">
      {parts.map((part, index) => {
        const isOpen = openId === part.id;
        const panelId = `anatomy-panel-${part.id}`;
        const buttonId = `anatomy-button-${part.id}`;

        return (
          <div
            key={part.id}
            className="border-t border-border-dark first:border-t-0"
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onToggle(part.id)}
              className="flex w-full items-start gap-4 py-5 text-left transition-colors hover:text-gold focus-visible:text-gold"
            >
              <span className="mt-0.5 font-body text-xs font-medium tracking-[0.2em] text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-heading text-lg text-text-light">
                {part.label}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "mt-1 text-gold transition-transform duration-300 motion-reduce:transition-none",
                  isOpen && "rotate-45",
                )}
              >
                +
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 pl-10"
            >
              <p className="text-sm text-text-muted md:text-base">
                {part.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function OrganAnatomy({ title, parts }: OrganAnatomyProps) {
  const baseId = useId();
  const tabListRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(parts[0]?.id ?? "");
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(
    parts[0]?.id ?? null,
  );

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleMobileToggle = useCallback((id: string) => {
    setMobileOpenId((current) => (current === id ? null : id));
  }, []);

  const activePart = parts.find((p) => p.id === activeId) ?? parts[0];
  const activeIndex = parts.findIndex((p) => p.id === activeId);

  const focusTab = useCallback((index: number) => {
    const tabList = tabListRef.current;
    if (!tabList) return;

    const tabs = tabList.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    const tab = tabs[index];
    if (tab) {
      tab.focus();
    }
  }, []);

  const handleTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex: number | null = null;

      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          nextIndex = (index + 1) % parts.length;
          break;
        case "ArrowLeft":
          event.preventDefault();
          nextIndex = (index - 1 + parts.length) % parts.length;
          break;
        case "Home":
          event.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          event.preventDefault();
          nextIndex = parts.length - 1;
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          handleSelect(parts[index].id);
          return;
        default:
          return;
      }

      if (nextIndex !== null) {
        const nextPart = parts[nextIndex];
        handleSelect(nextPart.id);
        focusTab(nextIndex);
      }
    },
    [parts, handleSelect, focusTab],
  );

  const tabPanelId = `${baseId}-tabpanel`;

  return (
    <section className="section-padding bg-surface">
      <Container>
        <MotionReveal>
          <h2 className="mb-10 text-balance text-3xl md:mb-14 md:text-4xl lg:text-5xl">
            {title}
          </h2>
        </MotionReveal>

        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16">
          <MotionReveal>
            <OrganIllustration
              parts={parts}
              activeId={activeId}
              onSelect={handleSelect}
              groupId={baseId}
            />
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div className="flex flex-col justify-center">
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px flex-1 bg-gold/40" aria-hidden="true" />
                <span className="font-body text-xs uppercase tracking-[0.2em] text-gold">
                  {activeIndex + 1} / {parts.length}
                </span>
              </div>

              <div
                ref={tabListRef}
                role="tablist"
                aria-label="Dijelovi orgulja"
                className="flex flex-wrap gap-2"
              >
                {parts.map((part, index) => {
                  const isSelected = activeId === part.id;
                  const tabId = `${baseId}-tab-${part.id}`;

                  return (
                    <button
                      key={part.id}
                      type="button"
                      id={tabId}
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls={tabPanelId}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => handleSelect(part.id)}
                      onKeyDown={(event) => handleTabKeyDown(event, index)}
                      className={cn(
                        "rounded-sm border px-3 py-1.5 font-body text-xs transition-colors motion-reduce:transition-none",
                        isSelected
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-border-dark text-text-muted hover:border-gold/50 hover:text-text-light",
                      )}
                    >
                      {part.label}
                    </button>
                  );
                })}
              </div>

              <div
                id={tabPanelId}
                role="tabpanel"
                aria-labelledby={`${baseId}-tab-${activePart.id}`}
                tabIndex={0}
                className="mt-8 outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <h3 className="text-2xl md:text-3xl">{activePart.label}</h3>
                <p className="mt-4 text-base md:text-lg">
                  {activePart.description}
                </p>
              </div>
            </div>
          </MotionReveal>
        </div>

        <div className="lg:hidden">
          <MotionReveal>
            <MobileAccordion
              parts={parts}
              openId={mobileOpenId}
              onToggle={handleMobileToggle}
            />
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
