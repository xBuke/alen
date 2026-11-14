import { aboutPage } from "@/data/about";
import { beforeAfterPairs, getBeforeAfterPair } from "@/data/before-after";
import {
  blogPosts,
  formatBlogDate as formatBlogDateHr,
  getBlogPostBySlug,
  getBlogPosts,
  type BlogPost,
} from "@/data/blog";
import { contactPage } from "@/data/contact";
import { galleryAlbumFilters, galleryAlbums } from "@/data/gallery";
import {
  homeAbout,
  homeContactCta,
  homeIntro,
  homeProcess,
  homeQuote,
  homeServicesSection,
  homeWorkAreas,
} from "@/data/home";
import { impressum, privacyPolicy } from "@/data/legal";
import { organsPage } from "@/data/organs";
import { services, servicesPage } from "@/data/services";
import { alenProfile, heroContent, siteConfig } from "@/data/site";

import { aboutPageEn } from "@/data/en/about";
import {
  blogPostsEn,
  getBlogPostBySlugEn,
  getBlogPostsEn,
} from "@/data/en/blog";
import { contactPageEn } from "@/data/en/contact";
import {
  beforeAfterPairsEn,
  galleryAlbumFiltersEn,
  galleryAlbumsEn,
  getBeforeAfterPairEn,
} from "@/data/en/gallery";
import {
  homeAboutEn,
  homeContactCtaEn,
  homeIntroEn,
  homeProcessEn,
  homeQuoteEn,
  homeServicesSectionEn,
  homeWorkAreasEn,
} from "@/data/en/home";
import { imprintEn, privacyPolicyEn } from "@/data/en/legal";
import { organsPageEn } from "@/data/en/organs";
import { servicesEn, servicesPageEn } from "@/data/en/services";
import { alenProfileEn, heroContentEn, siteConfigEn } from "@/data/en/site";
import type { Locale } from "@/i18n/config";

export function getSiteConfig(locale: Locale) {
  return locale === "en" ? siteConfigEn : siteConfig;
}

export function getAlenProfile(locale: Locale) {
  return locale === "en" ? alenProfileEn : alenProfile;
}

export function getHeroContent(locale: Locale) {
  return locale === "en" ? heroContentEn : heroContent;
}

export function getHome(locale: Locale) {
  return locale === "en"
    ? {
        intro: homeIntroEn,
        servicesSection: homeServicesSectionEn,
        about: homeAboutEn,
        workAreas: homeWorkAreasEn,
        process: homeProcessEn,
        quote: homeQuoteEn,
        contactCta: homeContactCtaEn,
      }
    : {
        intro: homeIntro,
        servicesSection: homeServicesSection,
        about: homeAbout,
        workAreas: homeWorkAreas,
        process: homeProcess,
        quote: homeQuote,
        contactCta: homeContactCta,
      };
}

export function getServices(locale: Locale) {
  return locale === "en" ? servicesEn : services;
}

export function getServicesPage(locale: Locale) {
  return locale === "en" ? servicesPageEn : servicesPage;
}

export function getAboutPage(locale: Locale) {
  return locale === "en" ? aboutPageEn : aboutPage;
}

export function getOrgansPage(locale: Locale) {
  return locale === "en" ? organsPageEn : organsPage;
}

export function getContactPage(locale: Locale) {
  return locale === "en" ? contactPageEn : contactPage;
}

export function getPrivacyPolicy(locale: Locale) {
  return locale === "en" ? privacyPolicyEn : privacyPolicy;
}

export function getImpressum(locale: Locale) {
  return locale === "en" ? imprintEn : impressum;
}

export function getGalleryAlbums(locale: Locale) {
  return locale === "en" ? galleryAlbumsEn : galleryAlbums;
}

export function getGalleryFilters(locale: Locale) {
  return locale === "en" ? galleryAlbumFiltersEn : galleryAlbumFilters;
}

export function getBeforeAfterPairs(locale: Locale) {
  return locale === "en" ? beforeAfterPairsEn : beforeAfterPairs;
}

export function findBeforeAfterPair(id: string, locale: Locale) {
  return locale === "en" ? getBeforeAfterPairEn(id) : getBeforeAfterPair(id);
}

export function getPosts(locale: Locale): BlogPost[] {
  return locale === "en" ? getBlogPostsEn() : getBlogPosts();
}

/** `slug` je uvijek hrvatski ključ članka. */
export function findPost(slug: string, locale: Locale): BlogPost | undefined {
  return locale === "en" ? getBlogPostBySlugEn(slug) : getBlogPostBySlug(slug);
}

export function getPostSlugs(): string[] {
  return (blogPosts.length ? blogPosts : blogPostsEn).map((post) => post.slug);
}

export function formatBlogDate(iso: string, locale: Locale): string {
  if (locale === "hr") return formatBlogDateHr(iso);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Zagreb",
  }).format(new Date(`${iso}T12:00:00Z`));
}
