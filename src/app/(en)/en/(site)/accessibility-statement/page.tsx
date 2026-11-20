import { getStaticPageMetadata } from "@/lib/static-page-metadata";
import { AccessibilityView } from "@/views/accessibility";

export const metadata = getStaticPageMetadata("accessibility", "en");

export default function Page() {
  return <AccessibilityView locale="en" />;
}
