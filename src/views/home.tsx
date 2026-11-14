import { HomeAbout } from "@/components/sections/home/home-about";
import { HomeBlog } from "@/components/sections/home/home-blog";
import { HomeContactCta } from "@/components/sections/home/home-contact-cta";
import { HomeHero } from "@/components/sections/home/home-hero";
import { HomeIntro } from "@/components/sections/home/home-intro";
import { HomeProcess } from "@/components/sections/home/home-process";
import { HomeQuote } from "@/components/sections/home/home-quote";
import { HomeServices } from "@/components/sections/home/home-services";
import { HomeUsedOrgans } from "@/components/sections/home/home-used-organs";
import { HomeWorkAreas } from "@/components/sections/home/home-work-areas";
import type { Locale } from "@/i18n/config";

export function HomeView({ locale }: { locale: Locale }) {
  return (
    <>
      <HomeHero locale={locale} />
      <HomeIntro locale={locale} />
      <HomeServices locale={locale} />
      <HomeAbout locale={locale} />
      <HomeWorkAreas locale={locale} />
      <HomeProcess locale={locale} />
      <HomeBlog locale={locale} />
      <HomeUsedOrgans locale={locale} />
      <HomeQuote locale={locale} />
      <HomeContactCta locale={locale} />
    </>
  );
}
