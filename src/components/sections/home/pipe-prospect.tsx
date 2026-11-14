"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent,
} from "react";

import { getUi } from "@/i18n/ui";

/** Visine svirala u postotku: najviša u sredini, kao na prospektu. */
const HEIGHTS = [48, 58, 68, 78, 89, 100, 89, 78, 68, 58, 48];

/** C-dur pentatonika od C3: što je svirala dulja, ton je dublji. */
const SCALE = [
  130.81, 146.83, 164.81, 196.0, 220.0, 261.63, 293.66, 329.63, 392.0, 440.0,
  523.25,
];

/** Redoslijed svirala od najdulje (sredina) prema najkraćima (rubovi). */
const ORDER = [5, 4, 6, 3, 7, 2, 8, 1, 9, 0, 10];
const FREQUENCY = HEIGHTS.map((_, index) => SCALE[ORDER.indexOf(index)]);

type AudioWindow = Window &
  typeof globalThis & { webkitAudioContext?: typeof AudioContext };

export function PipeProspect({
  image,
  locale = "hr",
}: {
  image: string;
  locale?: "hr" | "en";
}) {
  const hint = getUi(locale).home;
  const contextRef = useRef<AudioContext | null>(null);
  const touchRef = useRef(false);
  const lastTouchedRef = useRef<Element | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [played, setPlayed] = useState(false);

  /** Stvara (po potrebi) i budi AudioContext. Smije se zvati bilo kada. */
  const wake = useCallback(() => {
    try {
      const AudioCtor =
        window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
      if (!AudioCtor) return null;

      const context = contextRef.current ?? new AudioCtor();
      contextRef.current = context;
      if (context.state !== "running") void context.resume();
      return context;
    } catch {
      return null;
    }
  }, []);

  // Preglednici dopuštaju zvuk tek nakon prvog klika, dodira ili tipke.
  // Prvu takvu radnju bilo gdje na stranici koristimo da "otključamo" zvuk,
  // pa nakon toga svirale sviraju i na sam prelazak mišem.
  useEffect(() => {
    // Pripremi AudioContext odmah pri učitavanju. Ako je korisnik već bio
    // aktivan na stranici (npr. došao je klikom), zvuk je odmah spreman.
    wake();

    const unlock = () => wake();
    const events = ["pointerdown", "touchend", "click", "keydown"] as const;
    events.forEach((name) =>
      window.addEventListener(name, unlock, { passive: true }),
    );
    return () =>
      events.forEach((name) => window.removeEventListener(name, unlock));
  }, [wake]);

  // Dok nitko nije zasvirao, svirale se povremeno tiho zanjišu u valu
  // kako bi bilo jasno da se s njima može nešto raditi.
  useEffect(() => {
    if (played) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: number[] = [];
    const wave = () => {
      const pipes = rootRef.current?.querySelectorAll("[data-pipe]");
      pipes?.forEach((pipe, index) => {
        timers.push(
          window.setTimeout(() => {
            pipe.classList.remove("is-sounding");
            void (pipe as HTMLElement).offsetWidth;
            pipe.classList.add("is-sounding");
          }, index * 70),
        );
      });
    };

    const first = window.setTimeout(wave, 2600);
    const loop = window.setInterval(wave, 6000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(loop);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [played]);

  const sound = useCallback(
    (index: number, element: Element) => {
      setPlayed(true);
      element.classList.remove("is-sounding");
      // Ponovno pokretanje CSS animacije.
      void (element as HTMLElement).offsetWidth;
      element.classList.add("is-sounding");

      const context = wake();
      if (!context) return;

      const play = () => {
        try {
          const now = context.currentTime;
          const master = context.createGain();
          master.gain.setValueAtTime(0, now);
          master.gain.linearRampToValueAtTime(0.09, now + 0.06);
          master.gain.setValueAtTime(0.09, now + 0.45);
          master.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
          master.connect(context.destination);

          // Nekoliko harmonika daje boju nalik principalu.
          [1, 2, 3, 4].forEach((harmonic, position) => {
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            oscillator.type = "sine";
            oscillator.frequency.value = FREQUENCY[index] * harmonic;
            gain.gain.value = [1, 0.45, 0.22, 0.1][position];
            oscillator.connect(gain).connect(master);
            oscillator.start(now);
            oscillator.stop(now + 1.7);
          });
        } catch {
          // Zvuk je dodatak; bez njega prospekt i dalje radi.
        }
      };

      if (context.state === "running") {
        play();
        return;
      }

      // Kontekst se još budi: čim se probudi, odsviraj ton umjesto da ga
      // preskočimo (prije je prvih nekoliko svirala ostajalo nijemo).
      // Ako preglednik još ne dopušta zvuk (nije bilo klika), ništa se ne čuje.
      void context
        .resume()
        .then(() => {
          if (context.state === "running") play();
        })
        .catch(() => {});
    },
    [wake],
  );

  /** Mobitel: povlačenje prsta preko svirala svira jednu za drugom. */
  const handleTouchMove = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const touch = event.touches[0];
      if (!touch) return;

      const pipe = document
        .elementFromPoint(touch.clientX, touch.clientY)
        ?.closest("[data-pipe]");
      if (!pipe || pipe === lastTouchedRef.current) return;

      lastTouchedRef.current = pipe;
      sound(Number(pipe.getAttribute("data-pipe")), pipe);
    },
    [sound],
  );

  return (
    <div
      ref={rootRef}
      className="prospect"
      onTouchMove={handleTouchMove}
      onTouchEnd={() => {
        lastTouchedRef.current = null;
      }}
      style={
        {
          "--n": HEIGHTS.length,
        } as CSSProperties
      }
    >
      {HEIGHTS.map((height, index) => (
        <button
          key={index}
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          data-pipe={index}
          className="pipe"
          style={
            { "--i": index, "--h": `${height}%`, "--hn": height } as CSSProperties
          }
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") {
              sound(index, event.currentTarget);
            }
          }}
          onPointerDown={(event) => {
            touchRef.current = event.pointerType !== "mouse";
            if (!touchRef.current) sound(index, event.currentTarget);
          }}
          onClick={(event) => {
            // Dodir: sviramo na "click" jer ga iOS priznaje kao radnju
            // korisnika i tek tada dopušta zvuk.
            if (touchRef.current) {
              touchRef.current = false;
              if (lastTouchedRef.current !== event.currentTarget) {
                sound(index, event.currentTarget);
              }
            }
          }}
        >
          <span className="pipe-body">
            {/* Ista fotografija u svakoj svirali, pomaknuta tako da se
                svirale zajedno slože u jednu sliku. Preglednik je preuzima
                samo jednom. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" draggable={false} decoding="async" />
          </span>
        </button>
      ))}
      <p
        className={played ? "prospect-hint is-done" : "prospect-hint"}
        aria-hidden="true"
      >
        <span className="prospect-hint-dot" />
        <span className="prospect-hint-touch">
          {hint.prospectTouch}
        </span>
        <span className="prospect-hint-mouse">
          {hint.prospectMouse}
        </span>
      </p>
    </div>
  );
}
