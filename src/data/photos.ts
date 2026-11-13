import type { ImageAsset } from "@/types";

const own = (
  src: string,
  alt: string,
  width: number,
  height: number,
): ImageAsset => ({
  src,
  alt,
  width,
  height,
  status: "verified-original",
  temporary: false,
});

const ref = "/images/orguljarstvo/reference";
const pp = "/images/orguljarstvo/prije-poslije";

/**
 * Fotografije iz vlastite arhive. Svaka se na stranici koristi na jednom
 * mjestu kako se isti motiv ne bi ponavljao.
 */
export const photos = {
  legradProspect: own("/images/orguljarstvo/galerija/legrad/01-img-0092.webp", "Pročelje povijesnih orgulja na koru", 2400, 1600),
  legradConsole: own("/images/orguljarstvo/galerija/legrad/08-img-0100.webp", "Sviraonik orgulja s tipkama i registrima", 2400, 1600),
  knezijaMagnets: own("/images/orguljarstvo/galerija/knezija-zagreb/11-img-1355.webp", "Elektromagneti trakture u orguljama", 2400, 1600),
  varazdinWide: own("/images/orguljarstvo/galerija/varazdin-katedrala/01-img-0752.webp", "Orgulje na koru katedrale", 2400, 1600),
  varazdinPipes: own("/images/orguljarstvo/galerija/varazdin-katedrala/02-img-0734.webp", "Metalne svirale snimljene izbliza", 2400, 1600),
  varazdinTop: own("/images/orguljarstvo/galerija/varazdin-katedrala/11-img-0732.webp", "Svirale orgulja gledane odozgo", 2400, 1600),
  varazdinMagnets: own("/images/orguljarstvo/galerija/varazdin-katedrala/05-img-0719.webp", "Elektromagneti i priključna pločica trakture", 2400, 1600),
  pulaPipes: own("/images/orguljarstvo/galerija/pula-sv-anton/02-p1310135-kopija-kopija.webp", "Redovi svirala na zračnici", 2400, 1800),
  pulaBig: own("/images/orguljarstvo/galerija/pula-sv-anton/01-p1310157.webp", "Velike metalne svirale izbliza", 2400, 1800),
  pulaWindow: own("/images/orguljarstvo/galerija/pula-sv-anton/06-p1310156.webp", "Svirale u unutrašnjosti orgulja ispred prozora", 2400, 1800),
  ploceProspekt: own(`${ref}/ploce-prospekt.webp`, "Prospekt orgulja sa sviralama i drvenim kućištem", 1800, 1200),
  ploceSvirale: own(`${ref}/ploce-svirale.webp`, "Detalj metalnih svirala u unutrašnjosti orgulja", 1800, 1200),
  ploceMagneti: own(`${ref}/ploce-elektromagneti.webp`, "Elektromagneti i elektronika trakture", 1350, 1800),
  ploceRegistri: own(`${ref}/ploce-registri.webp`, "Registarski potezi na sviraoniku", 1200, 1800),
  donjaVelika: own(`${ref}/donja-velika.webp`, "Orgulje u svijetlom drvenom kućištu s rezbarenim prospektom", 1350, 1800),
  pozitiv: own(`${ref}/pozitiv-kvaternik.webp`, "Pozitiv iz radionice Kvaternik", 811, 1800),
  stepinac: own(`${ref}/koprivnica-bl-a-stepinac.webp`, "Orgulje s dva manuala i pedalom u hrastovu kućištu", 1200, 1600),
  drnje: own(`${ref}/drnje.webp`, "Manje orgulje sa sviraonikom u kućištu", 1350, 1800),
  donjaVisnjica: own(`${ref}/donja-visnjica.webp`, "Barokne orgulje s pozlaćenim rezbarijama", 1200, 1800),
  vukovina: own(`${ref}/vukovina.webp`, "Barokno pročelje orgulja na koru", 1200, 1800),
  mace: own(`${ref}/mace.webp`, "Orgulje na koru crkve", 1800, 1200),
  sigetec: own(`${ref}/sigetec.webp`, "Neogotičko kućište orgulja na koru", 1800, 1200),
  bistra: own(`${ref}/bistra.webp`, "Orgulje na oslikanom koru crkve", 1200, 1800),
  fundusPoslije: own(`${pp}/fonicki-fundus-poslije-popravka.webp`, "Svirale orgulja nakon popravka", 1800, 1350),
  mijehPoslije: own(`${pp}/mjeh-nakon-restauracije.webp`, "Obnovljeni mijeh orgulja", 1350, 1800),
} satisfies Record<string, ImageAsset>;
