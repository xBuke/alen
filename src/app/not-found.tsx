import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="text-4xl">Stranica nije pronađena</h1>
      <p className="mt-4 max-w-md text-text-muted">
        Tražena stranica ne postoji ili još nije objavljena.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Povratak na početnu</Link>
      </Button>
    </Container>
  );
}
