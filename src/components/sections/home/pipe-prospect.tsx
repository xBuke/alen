"use client";

import { useCallback, useRef, type CSSProperties } from "react";

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

export function PipeProspect({ image }: { image: string }) {
  const contextRef = useRef<AudioContext | null>(null);

  const sound = useCallback((index: number, element: HTMLElement) => {
    element.classList.remove("is-sounding");
    // Ponovno pokretanje CSS animacije.
    void element.offsetWidth;
    element.classList.add("is-sounding");

    try {
      const AudioCtor =
        window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
      if (!AudioCtor) return;

      const context = contextRef.current ?? new AudioCtor();
      contextRef.current = context;
      if (context.state === "suspended") void context.resume();

      const now = context.currentTime;
      const master = context.createGain();
      master.gain.setValueAtTime(0, now);
      master.gain.linearRampToValueAtTime(0.11, now + 0.06);
      master.gain.setValueAtTime(0.11, now + 0.5);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 1.7);
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
        oscillator.stop(now + 1.8);
      });
    } catch {
      // Zvuk je dodatak; bez njega prospekt i dalje radi.
    }
  }, []);

  return (
    <div
      className="prospect"
      style={
        {
          "--n": HEIGHTS.length,
          "--hero-image": `url(${image})`,
        } as CSSProperties
      }
    >
      {HEIGHTS.map((height, index) => (
        <button
          key={index}
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="pipe"
          style={{ "--i": index, "--h": `${height}%` } as CSSProperties}
          onPointerDown={(event) => sound(index, event.currentTarget)}
        >
          <span className="pipe-body">
            <i />
          </span>
        </button>
      ))}
    </div>
  );
}
