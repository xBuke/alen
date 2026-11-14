import { getHomePageMetadata } from "@/lib/page-metadata";
import { HomeView } from "@/views/home";

export const metadata = getHomePageMetadata("hr");

export default function HomePage() {
  return <HomeView locale="hr" />;
}
