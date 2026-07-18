import { HomeAbout } from "@/components/sections/home/home-about";
import { HomeContactCta } from "@/components/sections/home/home-contact-cta";
import { HomeHero } from "@/components/sections/home/home-hero";
import { HomeIntro } from "@/components/sections/home/home-intro";
import { HomeProcess } from "@/components/sections/home/home-process";
import { HomeQuote } from "@/components/sections/home/home-quote";
import { HomeServices } from "@/components/sections/home/home-services";
import { HomeUsedOrgans } from "@/components/sections/home/home-used-organs";
import { HomeWorkAreas } from "@/components/sections/home/home-work-areas";
import { homePageMetadata } from "@/lib/page-metadata";

export const metadata = homePageMetadata;

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <HomeServices />
      <HomeAbout />
      <HomeWorkAreas />
      <HomeProcess />
      <HomeUsedOrgans />
      <HomeQuote />
      <HomeContactCta />
    </>
  );
}
