/*
 * Postavke izbornika pristupačnosti. Spremaju se u localStorage samo u
 * posjetiteljevu pregledniku i primjenjuju kao klase na <html>.
 */

export const A11Y_STORAGE_KEY = "kvaternik-a11y";

export const textScaleSteps = [100, 112, 125, 140, 160] as const;

export type A11ySettings = {
  /** Indeks u textScaleSteps. */
  textScale: number;
  contrast: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
  spacing: boolean;
  noMotion: boolean;
  bigCursor: boolean;
  focusHighlight: boolean;
};

export type A11yToggle = Exclude<keyof A11ySettings, "textScale">;

export const a11yToggles: readonly A11yToggle[] = [
  "contrast",
  "underlineLinks",
  "readableFont",
  "spacing",
  "noMotion",
  "bigCursor",
  "focusHighlight",
];

export const defaultA11ySettings: A11ySettings = {
  textScale: 0,
  contrast: false,
  underlineLinks: false,
  readableFont: false,
  spacing: false,
  noMotion: false,
  bigCursor: false,
  focusHighlight: false,
};

const toggleClass: Record<A11yToggle, string> = {
  contrast: "a11y-contrast",
  underlineLinks: "a11y-underline",
  readableFont: "a11y-readable",
  spacing: "a11y-spacing",
  noMotion: "a11y-no-motion",
  bigCursor: "a11y-cursor",
  focusHighlight: "a11y-focus",
};

export function readA11ySettings(): A11ySettings {
  try {
    const raw = window.localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return defaultA11ySettings;
    const parsed = JSON.parse(raw) as Partial<A11ySettings>;
    return { ...defaultA11ySettings, ...parsed };
  } catch {
    return defaultA11ySettings;
  }
}

export function applyA11ySettings(settings: A11ySettings) {
  const root = document.documentElement;
  for (const key of a11yToggles) {
    root.classList.toggle(toggleClass[key], settings[key]);
  }
  const scale = textScaleSteps[settings.textScale] ?? 100;
  root.classList.toggle("a11y-scaled", scale !== 100);
  if (scale === 100) {
    root.style.removeProperty("font-size");
    root.style.removeProperty("--a11y-scale");
  } else {
    root.style.fontSize = `${scale}%`;
    root.style.setProperty("--a11y-scale", String(scale / 100));
  }
}

export function saveA11ySettings(settings: A11ySettings) {
  try {
    const isDefault = JSON.stringify(settings) === JSON.stringify(defaultA11ySettings);
    if (isDefault) {
      window.localStorage.removeItem(A11Y_STORAGE_KEY);
    } else {
      window.localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
    }
  } catch {
    // Spremanje nije dostupno (npr. privatni način): postavka vrijedi do osvježavanja.
  }
}

/**
 * Isti posao kao readA11ySettings + applyA11ySettings, kao mala skripta u <head>
 * da se postavke primijene prije prvog iscrtavanja (bez treptanja).
 */
export const a11yBootScript = `(function(){try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(
  A11Y_STORAGE_KEY,
)})||"null");if(!s)return;var r=document.documentElement,m=${JSON.stringify(
  toggleClass,
)};for(var k in m){if(s[k])r.classList.add(m[k]);}var st=${JSON.stringify(
  textScaleSteps,
)},v=st[s.textScale|0];if(v&&v!==100){r.style.fontSize=v+"%";r.style.setProperty("--a11y-scale",String(v/100));r.classList.add("a11y-scaled");}}catch(e){}})();`;
