import type { ImageAsset } from "@/types";

export type BeforeAfterPair = {
  id: string;
  title: string;
  description: string;
  /** Jedna fotografija koja prikazuje staro i novo jedno uz drugo. */
  combined?: ImageAsset;
  before?: ImageAsset;
  after?: ImageAsset;
};

const base = "/images/orguljarstvo/prije-poslije";

const photo = (
  file: string,
  alt: string,
  width: number,
  height: number,
): ImageAsset => ({
  src: `${base}/${file}`,
  alt,
  width,
  height,
  status: "verified-original",
  temporary: false,
  verifiedAsKvaternikProject: true,
});

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "mijeh",
    title: "Mijeh",
    description:
      "Dotrajala koža i oštećeni rubovi zamijenjeni su novima, a drvo je očišćeno i zaštićeno.",
    before: photo(
      "mijeh-prije-uredivanja.webp",
      "Mijeh orgulja prije uređivanja, s popucalom kožom",
      1350,
      1800,
    ),
    after: photo(
      "mjeh-nakon-restauracije.webp",
      "Mijeh orgulja nakon restauracije",
      1350,
      1800,
    ),
  },
  {
    id: "fundus",
    title: "Fonički fundus",
    description:
      "Svirale su izvađene, očišćene, poravnane i vraćene na zračnicu.",
    before: photo(
      "fonicki-fundus-prije-popravka.webp",
      "Svirale orgulja prije popravka",
      1800,
      1350,
    ),
    after: photo(
      "fonicki-fundus-poslije-popravka.webp",
      "Svirale orgulja poslije popravka",
      1800,
      1350,
    ),
  },
  {
    id: "svirale",
    title: "Drvene svirale",
    description:
      "Nove drvene svirale (lijevo) izrađene su po mjerama starih, crvotočinom oštećenih svirala (desno).",
    combined: photo(
      "stare-i-nove-drvene-svirale.webp",
      "Nove i stare drvene svirale položene jedne uz druge",
      1350,
      1800,
    ),
  },
];

export function getBeforeAfterPair(id: string): BeforeAfterPair | undefined {
  return beforeAfterPairs.find((pair) => pair.id === id);
}
