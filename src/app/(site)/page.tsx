import type { Metadata } from "next";

import { HomeAbout } from "@/components/sections/home/home-about";
import { HomeContactCta } from "@/components/sections/home/home-contact-cta";
import { HomeHero } from "@/components/sections/home/home-hero";
import { HomeIntro } from "@/components/sections/home/home-intro";
import { HomeProcess } from "@/components/sections/home/home-process";
import { HomeQuote } from "@/components/sections/home/home-quote";
import { HomeServices } from "@/components/sections/home/home-services";
import { HomeWorkAreas } from "@/components/sections/home/home-work-areas";

export const metadata: Metadata = {
  title: "Orguljarstvo Kvaternik | Izrada, servis i restauracija orgulja",
  description:
    "Orguljarstvo Kvaternik — gradnja novih orgulja, servis, restauracija, digitalna elektromagnetska traktura i intonacija instrumenata.",
  openGraph: {
    title: "Orguljarstvo Kvaternik | Izrada, servis i restauracija orgulja",
    description:
      "Orguljarstvo Kvaternik — gradnja novih orgulja, servis, restauracija, digitalna elektromagnetska traktura i intonacija instrumenata.",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <HomeServices />
      <HomeAbout />
      <HomeWorkAreas />
      <HomeProcess />
      <HomeQuote />
      <HomeContactCta />
    </>
  );
}
