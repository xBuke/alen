import { getStaticPageMetadata } from "@/lib/static-page-metadata";
import { ContactView } from "@/views/contact";

export const metadata = getStaticPageMetadata("contact", "hr");

export default function Page() {
  return <ContactView locale="hr" />;
}
