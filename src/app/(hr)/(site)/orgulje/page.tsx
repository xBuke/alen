import { getStaticPageMetadata } from "@/lib/static-page-metadata";
import { OrgansView } from "@/views/organs";

export const metadata = getStaticPageMetadata("organs", "hr");

export default function Page() {
  return <OrgansView locale="hr" />;
}
