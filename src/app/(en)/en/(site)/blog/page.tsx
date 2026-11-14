import { getStaticPageMetadata } from "@/lib/static-page-metadata";
import { BlogListView } from "@/views/blog-list";

export const metadata = getStaticPageMetadata("blog", "en");

export default function Page() {
  return <BlogListView locale="en" />;
}
