import { getHomePageMetadata } from "@/lib/page-metadata";
import { HomeView } from "@/views/home";

export const metadata = getHomePageMetadata("en");

export default function HomePage() {
  return <HomeView locale="en" />;
}
