import { getStaticPageMetadata } from "@/lib/static-page-metadata";
import { UsedOrgansView } from "@/views/used-organs";

export const metadata = getStaticPageMetadata("usedOrgans", "en");

export default function Page() {
  return <UsedOrgansView locale="en" />;
}
