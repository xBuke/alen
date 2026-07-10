"use client";

import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SiteImage } from "@/components/media/site-image";
import { Button } from "@/components/ui/button";
import { heroContent } from "@/data/site";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

export function HomeHero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <SiteImage
        image={heroContent.image}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0"
        imageClassName="scale-105"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-background/40"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex flex-1 flex-col justify-center pb-24 pt-28 md:pb-28 md:pt-32 lg:pt-36">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[1000px]"
        >
          <motion.p variants={itemVariants} className="eyebrow mb-5 md:mb-6">
            {heroContent.eyebrow}
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className={cn(
              "hero-title text-balance text-text-light",
              "text-4xl leading-[1.08] sm:text-5xl md:text-6xl xl:text-[5.5rem] xl:leading-[1.05]",
            )}
          >
            {heroContent.title}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-2xl text-base text-text-muted md:mt-6 md:text-lg"
          >
            {heroContent.description}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <Button asChild size="lg" className="rounded-sm">
              <Link href={heroContent.primaryCta.href}>
                {heroContent.primaryCta.label}
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="rounded-sm"
            >
              <Link href={heroContent.secondaryCta.href}>
                {heroContent.secondaryCta.label}
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <div className="mt-auto flex items-end justify-between pt-12">
          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="h-12 w-px bg-gold/50" />
            <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
              Draganovec, Hrvatska
            </span>
          </div>

          <div
            className="hidden flex-col items-center gap-2 md:flex"
            aria-hidden="true"
          >
            <span className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-text-muted">
              Scroll
            </span>
            <span className="h-10 w-px bg-gradient-to-b from-gold/80 to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  );
}
