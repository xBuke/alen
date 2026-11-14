import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { localizePath, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";

export function NotFoundView({ locale }: { locale: Locale }) {
  const t = getUi(locale);

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
            {t.notFound.title}
          </h1>
          <p className="mt-4 max-w-md text-base text-text-muted">
            {t.notFound.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button asChild size="lg" className="min-h-11 ">
              <Link href={localizePath("/", locale)}>{t.notFound.backHome}</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="min-h-11 "
            >
              <Link href={localizePath("/kontakt", locale)}>
                {t.notFound.contact}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="min-h-11 ">
              <Link href={localizePath("/usluge", locale)}>
                {t.notFound.services}
              </Link>
            </Button>
          </div>
        </Container>
      </main>
      <Footer locale={locale} />
    </>
  );
}
