import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Stranica nije pronađena",
  description:
    "Tražena stranica ne postoji ili još nije objavljena na web-stranici Orguljarstva Kvaternik.",
  path: "/404",
});

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="flex min-h-[calc(100svh-4rem)] flex-col"
      >
        <Container className="flex flex-1 flex-col items-center justify-center py-24 pt-32 text-center md:pt-36">
          <p className="eyebrow mb-4">404</p>
          <h1 className="text-balance text-3xl sm:text-4xl md:text-5xl">
            Stranica nije pronađena
          </h1>
          <p className="mt-4 max-w-md text-base text-text-muted">
            Tražena stranica ne postoji ili još nije objavljena.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button asChild size="lg" className="min-h-11 rounded-sm">
              <Link href="/">Povratak na početnu</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="min-h-11 rounded-sm"
            >
              <Link href="/kontakt">Kontakt</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="min-h-11 rounded-sm"
            >
              <Link href="/usluge">Usluge</Link>
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
