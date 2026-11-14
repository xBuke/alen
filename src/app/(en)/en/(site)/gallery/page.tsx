import { getStaticPageMetadata } from "@/lib/static-page-metadata";
import { GalleryView } from "@/views/gallery";

export const metadata = getStaticPageMetadata("gallery", "en");

export default function Page() {
  return <GalleryView locale="en" />;
}
