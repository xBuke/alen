import { notFound } from "next/navigation";

/** Hvata nepoznate putanje kako bi se prikazala stilizirana 404 stranica. */
export default function CatchAllPage() {
  notFound();
}
