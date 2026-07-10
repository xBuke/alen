import { officialImages } from "@/data/site";
import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "izrada-novih-orgulja",
    title: "Izrada novih orgulja",
    category: "izrada",
    summary:
      "Razvojna kartica za uslugu izrade. Zamijeniti stvarnim projektom kada Alen dostavi lokaciju, fotografije i podatke.",
    coverImage: officialImages.construction,
    gallery: [],
    featured: true,
    draft: true,
  },
  {
    slug: "servis-orgulja",
    title: "Servis orgulja",
    category: "servis",
    summary:
      "Razvojna kartica za servis. Ne prikazivati kao pojedinačnu realizaciju bez potvrđenih podataka.",
    coverImage: officialImages.service,
    gallery: [],
    featured: true,
    draft: true,
  },
  {
    slug: "restauracija-orgulja",
    title: "Restauracija orgulja",
    category: "restauracija",
    summary:
      "Razvojna kartica za restauraciju. Ne pripisivati fotografiju Orguljarstvu Kvaternik kao projekt.",
    coverImage: officialImages.restoration,
    gallery: [],
    featured: true,
    draft: true,
  },
];
