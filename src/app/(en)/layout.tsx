import type { Metadata } from "next";

import { RootDocument } from "@/components/layout/root-document";
import { createRootMetadata } from "@/lib/root-metadata";

import "../globals.css";

export const metadata: Metadata = createRootMetadata("en");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
