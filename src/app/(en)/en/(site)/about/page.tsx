import { getStaticPageMetadata } from "@/lib/static-page-metadata";
import { AboutView } from "@/views/about";

export const metadata = getStaticPageMetadata("about", "en");

export default function Page() {
  return <AboutView locale="en" />;
}
