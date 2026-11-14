import { NotFoundView } from "@/components/layout/not-found-view";
import { createPageMetadata } from "@/lib/page-metadata";
import { getUi } from "@/i18n/ui";

const t = getUi("en");

export const metadata = createPageMetadata({
  title: t.notFound.title,
  description: t.notFound.metaDescription,
  path: "/404",
  locale: "en",
});

export default function NotFound() {
  return <NotFoundView locale="en" />;
}
