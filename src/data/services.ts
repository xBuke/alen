import { officialImages } from "@/data/site";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "izrada-novih-orgulja",
    title: "Izrada novih orgulja",
    description:
      "Gradimo nove orgulje s klasičnom mehaničkom trakturom, prilagođene prostoru, namjeni i zvukovnoj koncepciji instrumenta.",
    verifiedFromOfficialSite: true,
    image: officialImages.construction,
  },
  {
    slug: "servis-orgulja",
    title: "Servis",
    description:
      "Pregledi, regulacija, popravci i radovi potrebni za pouzdan rad postojećeg instrumenta.",
    verifiedFromOfficialSite: false,
    needsCopyConfirmation: true,
    image: officialImages.service,
  },
  {
    slug: "restauracija",
    title: "Restauracija",
    description:
      "Radovi na postojećim instrumentima uz pažljivo sagledavanje njihove konstrukcije, zvuka i sačuvanih elemenata.",
    verifiedFromOfficialSite: true,
    needsCopyConfirmation: true,
    image: officialImages.restoration,
  },
  {
    slug: "digitalna-elektromagnetska-traktura",
    title: "Digitalna elektromagnetska traktura",
    description:
      "U nove i postojeće orgulje ugrađujemo digitalnu elektromagnetsku trakturu.",
    verifiedFromOfficialSite: true,
    image: officialImages.service,
  },
  {
    slug: "intonacija",
    title: "Intonacija",
    description:
      "Posebnu pozornost posvećujemo intonaciji kako bi se instrument zvukovno što prirodnije uklopio u prostor kojemu je namijenjen.",
    verifiedFromOfficialSite: true,
    image: officialImages.construction,
  },
];
