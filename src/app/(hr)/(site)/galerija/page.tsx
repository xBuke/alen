import { getStaticPageMetadata } from "@/lib/static-page-metadata";
import { GalleryView } from "@/views/gallery";

export const metadata = getStaticPageMetadata("gallery", "hr");

export default function Page() {
  return <GalleryView locale="hr" />;
}
