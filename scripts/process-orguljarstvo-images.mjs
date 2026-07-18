/**
 * Process curated Orguljarstvo photos → public WebP + TS manifests.
 * Source folder is never modified. PDF/docs are never opened.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "Orguljarstvo slike");
const OUT_GALLERY = path.join(ROOT, "public", "images", "orguljarstvo", "galerija");
const OUT_PROJECTS = path.join(ROOT, "public", "images", "orguljarstvo", "projekti");
const GEN_DIR = path.join(ROOT, "src", "data", "generated");

const IMAGE_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".tif",
  ".tiff",
]);

const DUMP_HINTS = [/kamera/i, /download/i, /whatsapp/i, /screenshot/i, /message contents/i];

const MAX_ALBUM_PHOTOS = 24;
const MAX_PROJECT_PHOTOS = 12;
const MAX_LONG_EDGE = 2400;
const WEBP_QUALITY = 85;
const MIN_LONG_EDGE = 900;
const MIN_BYTES = 80_000;

/** @type {Array<{ folder: string; slug: string; title: string; location?: string }>} */
const ALBUMS = [
  { folder: "Varaždin katedrala", slug: "varazdin-katedrala", title: "Varaždin — katedrala", location: "Varaždin" },
  { folder: "Požega katedrala", slug: "pozega-katedrala", title: "Požega — katedrala", location: "Požega" },
  { folder: "Pula sv. Anton", slug: "pula-sv-anton", title: "Pula — sv. Anton", location: "Pula" },
  { folder: "Knežija Zagreb", slug: "knezija-zagreb", title: "Zagreb — Knežija", location: "Zagreb" },
  { folder: "Sv. Jeronim Zagreb", slug: "sv-jeronim-zagreb", title: "Zagreb — sv. Jeronim", location: "Zagreb" },
  { folder: "Sveta mati slobode", slug: "sveta-mati-slobode", title: "Sveta Mati Slobode", location: "Zagreb" },
  { folder: "Sveti Ivan Zeelina", slug: "sveti-ivan-zeelina", title: "Sveti Ivan Zelina", location: "Sveti Ivan Zelina" },
  { folder: "Banja Luka- katedrala", slug: "banja-luka-katedrala", title: "Banja Luka — katedrala", location: "Banja Luka" },
  { folder: "Banja Luka -Trapisti", slug: "banja-luka-trapisti", title: "Banja Luka — Trapisti", location: "Banja Luka" },
  { folder: "Banja Luka-župna crkva", slug: "banja-luka-zupna-crkva", title: "Banja Luka — župna crkva", location: "Banja Luka" },
  { folder: "Virje", slug: "virje", title: "Virje", location: "Virje" },
  { folder: "Legrad", slug: "legrad", title: "Legrad", location: "Legrad" },
  { folder: "Ludbreg", slug: "ludbreg", title: "Ludbreg", location: "Ludbreg" },
  { folder: "Vivodina", slug: "vivodina", title: "Vivodina", location: "Vivodina" },
  { folder: "Volovsko", slug: "volovsko", title: "Volovsko", location: "Volovsko" },
  { folder: "Tomašica", slug: "tomasica", title: "Tomašica", location: "Tomašica" },
  { folder: "Orgulje Vinica", slug: "orgulje-vinica", title: "Vinica", location: "Vinica" },
  { folder: "orgulje samobor", slug: "orgulje-samobor", title: "Samobor", location: "Samobor" },
];

/** Published projects (subset of albums). */
const PROJECTS = [
  { albumSlug: "varazdin-katedrala", slug: "varazdin-katedrala", title: "Varaždin — katedrala", location: "Varaždin" },
  { albumSlug: "pula-sv-anton", slug: "pula-sv-anton", title: "Pula — sv. Anton", location: "Pula" },
  { albumSlug: "knezija-zagreb", slug: "knezija-zagreb", title: "Zagreb — Knežija", location: "Zagreb" },
  { albumSlug: "pozega-katedrala", slug: "pozega-katedrala", title: "Požega — katedrala", location: "Požega" },
  { albumSlug: "sveta-mati-slobode", slug: "sveta-mati-slobode", title: "Sveta Mati Slobode", location: "Zagreb" },
];

const SAFE_SUMMARY =
  "Fotografska dokumentacija projekta. Dodatne informacije o instrumentu i izvedenim radovima dostupne su na upit.";

function walkImages(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    const rel = path.relative(SOURCE, full);
    if (name.isDirectory()) {
      if (DUMP_HINTS.some((re) => re.test(name.name))) continue;
      out.push(...walkImages(full));
    } else if (name.isFile()) {
      const ext = path.extname(name.name).toLowerCase();
      if (!IMAGE_EXT.has(ext)) continue;
      if (DUMP_HINTS.some((re) => re.test(rel))) continue;
      out.push(full);
    }
  }
  return out;
}

function slugifyBase(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "slika";
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function emptyDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
  ensureDir(dir);
}

function fileHash(buf) {
  return crypto.createHash("sha1").update(buf).digest("hex");
}

async function scoreImage(file) {
  const buf = fs.readFileSync(file);
  const meta = await sharp(buf, { failOn: "none" }).rotate().metadata();
  const w = meta.width || 0;
  const h = meta.height || 0;
  const long = Math.max(w, h);
  const short = Math.min(w, h);
  const bytes = buf.length;
  if (long < MIN_LONG_EDGE && bytes < MIN_BYTES) {
    return null;
  }
  // Prefer larger, sharper-looking files; slight boost for landscape covers
  const landscapeBoost = w >= h ? 1.15 : 1;
  const score = long * Math.sqrt(bytes) * landscapeBoost;
  return { file, buf, w, h, long, short, bytes, score, hash: fileHash(buf) };
}

async function selectBest(files, limit) {
  const scored = [];
  const seenHash = new Set();
  for (const file of files) {
    try {
      const item = await scoreImage(file);
      if (!item) continue;
      if (seenHash.has(item.hash)) continue;
      seenHash.add(item.hash);
      scored.push(item);
    } catch {
      // skip unreadable
    }
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

async function writeWebp(item, destPath) {
  const pipeline = sharp(item.buf, { failOn: "none" }).rotate();
  const meta = await pipeline.metadata();
  let w = meta.width || item.w;
  let h = meta.height || item.h;
  const long = Math.max(w, h);
  let resize;
  if (long > MAX_LONG_EDGE) {
    resize = w >= h ? { width: MAX_LONG_EDGE } : { height: MAX_LONG_EDGE };
  }
  const out = await sharp(item.buf, { failOn: "none" })
    .rotate()
    .resize(resize)
    .webp({ quality: WEBP_QUALITY })
    .toBuffer({ resolveWithObject: true });

  fs.writeFileSync(destPath, out.data);
  return { width: out.info.width, height: out.info.height };
}

function tsString(s) {
  return JSON.stringify(s);
}

async function processAlbum(album) {
  const folderPath = path.join(SOURCE, album.folder);
  if (!fs.existsSync(folderPath)) {
    console.warn("Missing folder:", album.folder);
    return null;
  }
  const files = walkImages(folderPath);
  const selected = await selectBest(files, MAX_ALBUM_PHOTOS);
  if (selected.length < 3) {
    console.warn("Not enough usable images:", album.folder, selected.length);
    return null;
  }

  const albumOut = path.join(OUT_GALLERY, album.slug);
  emptyDir(albumOut);

  const usedNames = new Set();
  const images = [];
  for (let i = 0; i < selected.length; i++) {
    const item = selected[i];
    let base = slugifyBase(path.basename(item.file));
    let name = base;
    let n = 2;
    while (usedNames.has(name)) {
      name = `${base}-${n}`;
      n += 1;
    }
    usedNames.add(name);
    const destName = `${String(i + 1).padStart(2, "0")}-${name}.webp`;
    const dest = path.join(albumOut, destName);
    const dims = await writeWebp(item, dest);
    const publicSrc = `/images/orguljarstvo/galerija/${album.slug}/${destName}`;
    images.push({
      id: `${album.slug}-${i + 1}`,
      src: publicSrc,
      width: dims.width,
      height: dims.height,
      alt: `${album.title} — fotografija ${i + 1}`,
      title: `${album.title}`,
    });
  }

  // Cover = first (highest score, landscape-preferred)
  return {
    ...album,
    cover: images[0],
    images,
    photoCount: images.length,
  };
}

async function processProject(project, albumResult) {
  const subset = albumResult.images.slice(0, MAX_PROJECT_PHOTOS);
  const projOut = path.join(OUT_PROJECTS, project.slug);
  emptyDir(projOut);

  // Copy/re-encode from already written gallery files for stable project paths
  const images = [];
  for (let i = 0; i < subset.length; i++) {
    const srcPath = path.join(ROOT, "public", subset[i].src.replace(/^\//, "").split("/").join(path.sep));
    const destName = `${String(i + 1).padStart(2, "0")}.webp`;
    const dest = path.join(projOut, destName);
    fs.copyFileSync(srcPath, dest);
    const meta = await sharp(dest).metadata();
    images.push({
      src: `/images/orguljarstvo/projekti/${project.slug}/${destName}`,
      width: meta.width,
      height: meta.height,
      alt: `${project.title} — fotografija ${i + 1}`,
    });
  }

  return {
    slug: project.slug,
    title: project.title,
    location: project.location,
    category: "dokumentacija",
    summary: SAFE_SUMMARY,
    cover: images[0],
    gallery: images.slice(1),
    featured: true,
    draft: false,
  };
}

function emitGalleryTs(albums) {
  const body = albums
    .map((a) => {
      const items = a.images
        .map(
          (img) => `    {
      id: ${tsString(img.id)},
      src: ${tsString(img.src)},
      width: ${img.width},
      height: ${img.height},
      alt: ${tsString(img.alt)},
      title: ${tsString(img.title)},
    }`,
        )
        .join(",\n");
      return `  {
    slug: ${tsString(a.slug)},
    title: ${tsString(a.title)},
    location: ${a.location ? tsString(a.location) : "undefined"},
    sourceFolder: ${tsString(a.folder)},
    coverImage: {
      src: ${tsString(a.cover.src)},
      alt: ${tsString(a.cover.alt)},
      width: ${a.cover.width},
      height: ${a.cover.height},
      status: "verified-original" as const,
      temporary: false,
      verifiedAsKvaternikProject: false,
    },
    photoCount: ${a.photoCount},
    images: [
${items}
    ],
  }`;
    })
    .join(",\n");

  return `// AUTO-GENERATED by scripts/process-orguljarstvo-images.mjs — do not edit by hand.
export type GeneratedGalleryImage = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
};

export type GeneratedGalleryAlbum = {
  slug: string;
  title: string;
  location?: string;
  sourceFolder: string;
  coverImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
    status: "verified-original";
    temporary: false;
    verifiedAsKvaternikProject: false;
  };
  photoCount: number;
  images: GeneratedGalleryImage[];
};

export const generatedGalleryAlbums: GeneratedGalleryAlbum[] = [
${body}
];
`;
}

function emitProjectsTs(projects) {
  const body = projects
    .map((p) => {
      const gallery = p.gallery
        .map(
          (img) => `      {
        src: ${tsString(img.src)},
        alt: ${tsString(img.alt)},
        width: ${img.width},
        height: ${img.height},
        status: "verified-original" as const,
        temporary: false,
        verifiedAsKvaternikProject: true,
      }`,
        )
        .join(",\n");
      return `  {
    slug: ${tsString(p.slug)},
    title: ${tsString(p.title)},
    location: ${tsString(p.location)},
    category: "dokumentacija" as const,
    summary: ${tsString(p.summary)},
    featured: true,
    draft: false,
    coverImage: {
      src: ${tsString(p.cover.src)},
      alt: ${tsString(p.cover.alt)},
      width: ${p.cover.width},
      height: ${p.cover.height},
      status: "verified-original" as const,
      temporary: false,
      verifiedAsKvaternikProject: true,
    },
    gallery: [
${gallery}
    ],
  }`;
    })
    .join(",\n");

  return `// AUTO-GENERATED by scripts/process-orguljarstvo-images.mjs — do not edit by hand.
export type GeneratedProject = {
  slug: string;
  title: string;
  location?: string;
  category: "dokumentacija";
  summary: string;
  featured: boolean;
  draft: boolean;
  coverImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
    status: "verified-original";
    temporary: false;
    verifiedAsKvaternikProject: true;
  };
  gallery: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
    status: "verified-original";
    temporary: false;
    verifiedAsKvaternikProject: true;
  }>;
};

export const generatedProjects: GeneratedProject[] = [
${body}
];
`;
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error("Source missing:", SOURCE);
    process.exit(1);
  }

  emptyDir(OUT_GALLERY);
  emptyDir(OUT_PROJECTS);
  ensureDir(GEN_DIR);

  const albumResults = [];
  for (const album of ALBUMS) {
    console.log("Album:", album.folder);
    const result = await processAlbum(album);
    if (result) albumResults.push(result);
  }

  const projectResults = [];
  for (const project of PROJECTS) {
    const album = albumResults.find((a) => a.slug === project.albumSlug);
    if (!album) {
      console.warn("Skip project, album missing:", project.slug);
      continue;
    }
    console.log("Project:", project.slug);
    projectResults.push(await processProject(project, album));
  }

  fs.writeFileSync(path.join(GEN_DIR, "gallery-generated.ts"), emitGalleryTs(albumResults), "utf8");
  fs.writeFileSync(path.join(GEN_DIR, "projects-generated.ts"), emitProjectsTs(projectResults), "utf8");

  const totalGallery = albumResults.reduce((n, a) => n + a.photoCount, 0);
  const totalProject = projectResults.reduce((n, p) => n + 1 + p.gallery.length, 0);

  console.log(
    JSON.stringify(
      {
        albums: albumResults.length,
        projects: projectResults.length,
        galleryPhotos: totalGallery,
        projectPhotos: totalProject,
        albumCounts: Object.fromEntries(albumResults.map((a) => [a.slug, a.photoCount])),
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
