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
import { useLocale } from "@/i18n/locale-context";
import { getUi } from "@/i18n/ui";
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

const PIPES = [
  { x: 236, h: 118 },
  { x: 256, h: 142 },
  { x: 276, h: 166 },
  { x: 296, h: 188 },
  { x: 316, h: 206 },
  { x: 336, h: 188 },
  { x: 356, h: 166 },
  { x: 376, h: 142 },
  { x: 396, h: 118 },
];

const CHEST_TOP = 250;

function Marker({
  x,
  y,
  number,
  active,
}: {
  x: number;
  y: number;
  number: number;
  active: boolean;
}) {
  return (
    <g aria-hidden="true">
      <circle
        cx={x}
        cy={y}
        r={10}
        fill={active ? "#b38a5a" : "#151515"}
        stroke="#b38a5a"
        strokeWidth={1}
      />
      <text
        x={x}
        y={y + 3.5}
        textAnchor="middle"
        fontSize={10}
        fontWeight={600}
        fill={active ? "#0b0b0c" : "#b38a5a"}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {number}
      </text>
    </g>
  );
}

/**
 * Pojednostavljeni presjek orgulja s mehaničkom trakturom:
 * motor i mijeh daju zrak -> kanal -> zračnica -> svirale;
 * tipka preko apstrakta i kutnika otvara ventil u zračnici.
 */
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
  const diagramTitle = getUi(useLocale()).organs.diagramTitle;
  const numberOf = (id: string) => parts.findIndex((p) => p.id === id) + 1;

  const part = (id: string) => ({
    className: cn("anatomy-part", activeId === id && "is-active"),
    onClick: () => onSelect(id),
    onMouseEnter: () => onSelect(id),
  });

  return (
    <svg
      viewBox="0 0 480 430"
      className="mx-auto w-full max-w-xl"
      role="img"
      aria-labelledby={`${groupId}-title`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title id={`${groupId}-title`}>
        {diagramTitle}
      </title>

      {/* Pod */}
      <line x1={10} y1={408} x2={470} y2={408} stroke="rgba(255,255,255,0.14)" />

      {/* 1 Kućište i pročelje */}
      <g {...part("facade")}>
        <path
          d="M206 408 V40 L316 14 L426 40 V408"
          stroke="currentColor"
          strokeWidth={1.6}
        />
        <path d="M206 40 H426" stroke="currentColor" strokeWidth={1} />
        <path d="M206 300 H426" stroke="currentColor" strokeWidth={1} />
        <rect x={206} y={40} width={220} height={368} fill="transparent" />
      </g>

      {/* 2 Svirale */}
      <g {...part("pipes")}>
        {PIPES.map((pipe) => {
          const top = CHEST_TOP - pipe.h;
          return (
            <g key={pipe.x}>
              <path
                d={`M${pipe.x - 7} ${top} H${pipe.x + 7} V${CHEST_TOP - 16} L${pipe.x + 2.5} ${CHEST_TOP} H${pipe.x - 2.5} L${pipe.x - 7} ${CHEST_TOP - 16} Z`}
                stroke="currentColor"
                strokeWidth={1.3}
                fill="rgba(255,255,255,0.03)"
              />
              {/* usna svirale */}
              <path
                d={`M${pipe.x - 4.5} ${CHEST_TOP - 22} Q${pipe.x} ${CHEST_TOP - 29} ${pipe.x + 4.5} ${CHEST_TOP - 22}`}
                stroke="currentColor"
                strokeWidth={1.1}
              />
            </g>
          );
        })}
      </g>

      {/* 3 Zračnica */}
      <g {...part("chest")}>
        <rect
          x={216}
          y={CHEST_TOP}
          width={200}
          height={34}
          stroke="currentColor"
          strokeWidth={1.5}
          fill="rgba(255,255,255,0.03)"
        />
        <line
          x1={216}
          y1={CHEST_TOP + 12}
          x2={416}
          y2={CHEST_TOP + 12}
          stroke="currentColor"
          strokeWidth={0.8}
        />
        {/* ventili */}
        {PIPES.map((pipe) => (
          <line
            key={pipe.x}
            x1={pipe.x - 6}
            y1={CHEST_TOP + 20}
            x2={pipe.x + 6}
            y2={CHEST_TOP + 20}
            stroke="currentColor"
            strokeWidth={2}
          />
        ))}
      </g>

      {/* 4 Zračni sustav: motor, mijeh, kanal */}
      <g {...part("wind")}>
        <circle cx={398} cy={382} r={15} stroke="currentColor" strokeWidth={1.4} />
        <path
          d="M398 372 V392 M388 382 H408 M391 375 L405 389 M405 375 L391 389"
          stroke="currentColor"
          strokeWidth={0.9}
        />
        <g className="anatomy-bellows">
          <path
            d="M300 398 H366 V352 L300 340 Z"
            stroke="currentColor"
            strokeWidth={1.4}
            fill="rgba(255,255,255,0.03)"
          />
          <path
            d="M300 369 L366 375 M300 355 L366 364 M300 384 L366 387"
            stroke="currentColor"
            strokeWidth={0.8}
          />
        </g>
        <path d="M383 386 H366" stroke="currentColor" strokeWidth={1.4} />
        {/* kanal od mijeha do zračnice */}
        <path
          d="M320 340 V284"
          stroke="currentColor"
          strokeWidth={5}
          opacity={0.25}
        />
        <path
          className="anatomy-wind"
          d="M383 386 H366 M320 344 V286"
          stroke="currentColor"
          strokeWidth={1.6}
        />
        {/* strujanje u svirale */}
        <path
          className="anatomy-wind"
          d="M316 248 V60"
          stroke="currentColor"
          strokeWidth={1.2}
          opacity={0.7}
        />
      </g>

      {/* 5 Traktura */}
      <g {...part("action")}>
        <path
          d="M150 296 H190 M190 296 L196 302 M196 302 V330 H256 V272"
          stroke="currentColor"
          strokeWidth={1.3}
        />
        <path
          d="M190 290 L202 302 L190 302 Z"
          stroke="currentColor"
          strokeWidth={1.1}
        />
        <circle cx={256} cy={330} r={2.4} fill="currentColor" />
        <path
          d="M130 396 H184 V344 H276 V272"
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="2 4"
        />
      </g>

      {/* 6 Sviraonik */}
      <g {...part("console")}>
        <path
          d="M150 408 V236 H206"
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <path d="M150 306 H206" stroke="currentColor" strokeWidth={1} />
        {/* notni stalak */}
        <path d="M162 250 L176 274 H200" stroke="currentColor" strokeWidth={1} />
        {/* klupa */}
        <path
          d="M52 352 H112 M60 352 V408 M104 352 V408"
          stroke="currentColor"
          strokeWidth={1.4}
        />
        <rect x={40} y={236} width={166} height={172} fill="transparent" />
      </g>

      {/* 7 Manuali i pedal */}
      <g {...part("keyboards")}>
        <rect
          className="anatomy-key"
          x={112}
          y={293}
          width={40}
          height={6}
          stroke="currentColor"
          strokeWidth={1.3}
          fill="rgba(255,255,255,0.05)"
        />
        <rect
          x={122}
          y={281}
          width={30}
          height={6}
          stroke="currentColor"
          strokeWidth={1.3}
          fill="rgba(255,255,255,0.05)"
        />
        <path
          d="M72 400 L150 392 V400 Z"
          stroke="currentColor"
          strokeWidth={1.3}
          fill="rgba(255,255,255,0.05)"
        />
      </g>

      {/* 8 Registri */}
      <g {...part("stops")}>
        {[250, 262, 274].map((y) => (
          <g key={y}>
            <line x1={150} y1={y} x2={140} y2={y} stroke="currentColor" strokeWidth={1.2} />
            <circle cx={136} cy={y} r={3.6} stroke="currentColor" strokeWidth={1.2} fill="#151515" />
          </g>
        ))}
        <path
          d="M150 250 H168 V256 H216"
          stroke="currentColor"
          strokeWidth={0.9}
          strokeDasharray="1 4"
        />
      </g>

      <Marker x={438} y={120} number={numberOf("facade")} active={activeId === "facade"} />
      <Marker x={316} y={84} number={numberOf("pipes")} active={activeId === "pipes"} />
      <Marker x={438} y={CHEST_TOP + 17} number={numberOf("chest")} active={activeId === "chest"} />
      <Marker x={438} y={382} number={numberOf("wind")} active={activeId === "wind"} />
      <Marker x={228} y={330} number={numberOf("action")} active={activeId === "action"} />
      <Marker x={176} y={222} number={numberOf("console")} active={activeId === "console"} />
      <Marker x={94} y={296} number={numberOf("keyboards")} active={activeId === "keyboards"} />
      <Marker x={116} y={262} number={numberOf("stops")} active={activeId === "stops"} />
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
  const partsAria = getUi(useLocale()).organs.partsAria;
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

        <div className="hidden lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
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
                aria-label={partsAria}
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
                      <span className="mr-1.5 opacity-70">{index + 1}</span>
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
          <div className="mb-8">
            <OrganIllustration
              parts={parts}
              activeId={mobileOpenId ?? ""}
              onSelect={handleMobileToggle}
              groupId={`${baseId}-m`}
            />
          </div>
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
