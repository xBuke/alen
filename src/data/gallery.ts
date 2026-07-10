import { officialImages } from "@/data/site";
import type { GalleryCategory, GalleryItem } from "@/types";

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "orgulje", label: "Orgulje" },
  { id: "radionica", label: "Radionica" },
  { id: "mehanika", label: "Mehanika" },
  { id: "cijevi", label: "Cijevi" },
  { id: "sviraonik", label: "Sviraonik" },
  { id: "prije-i-poslije", label: "Prije i poslije" },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "hero-organ",
    image: officialImages.hero,
    category: "orgulje",
    caption: "Orgulje u sakralnom prostoru",
  },
  {
    id: "construction-console",
    image: officialImages.construction,
    category: "sviraonik",
    caption: "Drveni sviraonik s manualima i registrima",
  },
  {
    id: "service-pipes",
    image: officialImages.service,
    category: "cijevi",
    caption: "Detalj metalnih orguljskih cijevi",
  },
  {
    id: "restoration-keyboard",
    image: officialImages.restoration,
    category: "mehanika",
    caption: "Manuali drvenog orguljskog sviraonika",
  },
  {
    id: "contact-sacral",
    image: officialImages.contactBackground,
    category: "orgulje",
    caption: "Unutrašnjost sakralnog prostora",
  },
];
