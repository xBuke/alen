import { getStaticPageMetadata } from "@/lib/static-page-metadata";
import { ImprintView } from "@/views/imprint";

export const metadata = getStaticPageMetadata("imprint", "hr");

export default function Page() {
  return <ImprintView locale="hr" />;
}
