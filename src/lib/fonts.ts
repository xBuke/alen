import { Fraunces, Instrument_Sans } from "next/font/google";

/** Display: Fraunces — "old style" serif s modernim varijabilnim osima. */
export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});

/** Tekst: Instrument Sans. */
export const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument",
  display: "swap",
});

/** Zadržano radi postojećih importa. */
export const montserrat = instrumentSans;
export const playfair = fraunces;

export const fontVariables = `${fraunces.variable} ${instrumentSans.variable}`;
