import { getStaticPageMetadata } from "@/lib/static-page-metadata";
import { PrivacyView } from "@/views/privacy";

export const metadata = getStaticPageMetadata("privacy", "en");

export default function Page() {
  return <PrivacyView locale="en" />;
}
