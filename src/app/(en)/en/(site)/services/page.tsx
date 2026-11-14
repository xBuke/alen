import { getStaticPageMetadata } from "@/lib/static-page-metadata";
import { ServicesView } from "@/views/services";

export const metadata = getStaticPageMetadata("services", "en");

export default function Page() {
  return <ServicesView locale="en" />;
}
