import { officialImages } from "@/data/site";
import type { GalleryCategory, GalleryItem } from "@/types";

export const galleryCategories: { id: GalleryCategory | "sve"; label: string }[] =
  [
    { id: "sve", label: "Sve" },
    { id: "orgulje", label: "Orgulje" },
    { id: "sviraonik", label: "Sviraonik" },
    { id: "cijevi", label: "Cijevi" },
    { id: "prostor", label: "Prostor" },
  ];

export const galleryItems: GalleryItem[] = [
  {
    id: "hero-organ",
    image: officialImages.hero,
    category: "orgulje",
    title: "Orgulje u sakralnom prostoru",
    alt: "Orgulje u sakralnom prostoru",
    caption: "Pogled na orgulje u crkvenom prostoru",
    verifiedAsKvaternikProject: false,
  },
  {
    id: "construction-console",
    image: officialImages.construction,
    category: "sviraonik",
    title: "Drveni sviraonik",
    alt: "Drveni sviraonik orgulja s više manuala i registrima",
    caption: "Manuali i registri na drvenom sviraoniku",
    verifiedAsKvaternikProject: false,
  },
  {
    id: "service-pipes",
    image: officialImages.service,
    category: "cijevi",
    title: "Detalj orguljskih cijevi",
    alt: "Detalj metalnih orguljskih cijevi",
    caption: "Metalne cijevi orguljskog instrumenta",
    verifiedAsKvaternikProject: false,
  },
  {
    id: "restoration-keyboard",
    image: officialImages.restoration,
    category: "sviraonik",
    title: "Manuali i registri",
    alt: "Manuali drvenog orguljskog sviraonika",
    caption: "Pogled na manualne tipke i registre",
    verifiedAsKvaternikProject: false,
  },
  {
    id: "contact-sacral",
    image: officialImages.contactBackground,
    category: "prostor",
    title: "Unutrašnjost sakralnog prostora",
    alt: "Unutrašnjost sakralnog prostora",
    caption: "Arhitektura i prostor sakralne građevine",
    verifiedAsKvaternikProject: false,
  },
];
