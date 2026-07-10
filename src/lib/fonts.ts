import { Playfair_Display, Montserrat } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
});

export const fontVariables = `${playfair.variable} ${montserrat.variable}`;
