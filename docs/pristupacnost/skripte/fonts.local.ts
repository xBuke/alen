import localFont from "next/font/local";
export const fraunces = localFont({
  src: [
    { path: "./__localfonts/fraunces-latin-full-normal.woff2", style: "normal", weight: "100 900" },
    { path: "./__localfonts/fraunces-latin-full-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});
export const instrumentSans = localFont({
  src: [{ path: "./__localfonts/instrument-sans-latin-standard-normal.woff2", style: "normal", weight: "400 700" }],
  variable: "--font-instrument",
  display: "swap",
});
export const montserrat = instrumentSans;
export const playfair = fraunces;
export const fontVariables = `${fraunces.variable} ${instrumentSans.variable}`;
