import { photos } from "@/data/photos";
import type { ImageAsset } from "@/types";

const alt: Record<keyof typeof photos, string> = {
  legradProspect: "Facade of a historic organ in the choir loft",
  legradConsole: "Organ console with keys and stop knobs",
  knezijaMagnets: "Electromagnets of the action inside an organ",
  jeronimProspect: "Organ facade in the choir loft of St Jerome's church in Zagreb",
  jeronimPipes: "Metal pipes on a wind chest",
  knezijaPipesTop: "Organ pipes seen from above",
  zeelinaWiring: "Wiring of the electric action inside an organ",
  knezijaPipeRows: "Rows of pipes on a wind chest",
  knezijaBigPipes: "Close-up of large metal pipes",
  zeelinaPipes: "Close-up of metal pipes",
  ploceProspekt: "Organ facade with pipes and a wooden case",
  ploceSvirale: "Detail of metal pipes inside an organ",
  ploceMagneti: "Electromagnets and electronics of the action",
  ploceRegistri: "Stop knobs on the console",
  donjaVelika: "Organ in a light wooden case with a carved facade",
  pozitiv: "Positive organ from the Kvaternik workshop",
  stepinac: "Two-manual organ with pedal in an oak case",
  drnje: "Small organ with a console in the case",
  donjaVisnjica: "Baroque organ with gilded carvings",
  vukovina: "Baroque organ facade in the choir loft",
  mace: "Organ in a church choir loft",
  sigetec: "Neo-Gothic organ case in the choir loft",
  bistra: "Organ in a painted church choir loft",
  fundusPoslije: "Organ pipes after repair",
  mijehPoslije: "Restored organ bellows",
};

export const photosEn = Object.fromEntries(
  (Object.keys(photos) as (keyof typeof photos)[]).map((key) => [
    key,
    { ...photos[key], alt: alt[key] } satisfies ImageAsset,
  ]),
) as { [K in keyof typeof photos]: ImageAsset };
