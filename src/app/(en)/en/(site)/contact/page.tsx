import { getStaticPageMetadata } from "@/lib/static-page-metadata";
import { ContactView } from "@/views/contact";

export const metadata = getStaticPageMetadata("contact", "en");

export default function Page() {
  return <ContactView locale="en" />;
}
