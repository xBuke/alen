/**
 * Audit local "Orguljarstvo slike" folder.
 * Image formats only — never opens PDF/DOC/etc.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "Orguljarstvo slike");
const OUT = path.join(ROOT, "ORGULJARSTVO_SLIKE_AUDIT.md");

const IMAGE_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".tif",
  ".tiff",
]);

const SKIP_DETAILED = new Set(["polovne orgulje"]);

const EXCLUDED_PATTERNS = [
  /^harmonij/i,
  /^klavir/i,
  /^slike za letak/i,
  /^portativ/i,
  /^wili peter/i,
  /^koln/i,
  /^kehl/i,
  /^marijan ostruh/i,
  /^majstorski ispit/i,
  /^polovne orgulje/i,
];

const DUMP_PATH_HINTS = [
  /kamera/i,
  /download/i,
  /whatsapp/i,
  /screenshot/i,
  /message contents/i,
];

function walk(dir) {
  const entries = [];
  if (!fs.existsSync(dir)) return entries;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) {
      entries.push(...walk(full));
    } else if (name.isFile()) {
      entries.push(full);
    }
  }
  return entries;
}

function rel(p) {
  return path.relative(SOURCE, p).split(path.sep).join("/");
}

function topFolder(relPath) {
  const parts = relPath.split("/");
  return parts[0] || "(root)";
}

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error("Source folder not found:", SOURCE);
    process.exit(1);
  }

  const allFiles = walk(SOURCE);
  const images = [];
  const nonImages = [];

  for (const file of allFiles) {
    const ext = path.extname(file).toLowerCase();
    if (IMAGE_EXT.has(ext)) images.push(file);
    else nonImages.push({ file, ext });
  }

  const byExtNon = {};
  for (const n of nonImages) {
    byExtNon[n.ext || "(none)"] = (byExtNon[n.ext || "(none)"] || 0) + 1;
  }

  const topDirs = fs
    .readdirSync(SOURCE, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b, "hr"));

  const folderStats = new Map();
  for (const dir of topDirs) {
    folderStats.set(dir, {
      name: dir,
      imageCount: 0,
      formats: {},
      sampleSizes: [],
      hasDumpPaths: false,
      skippedDetailed: SKIP_DETAILED.has(dir.toLowerCase()),
    });
  }
  folderStats.set("(root)", {
    name: "(root)",
    imageCount: 0,
    formats: {},
    sampleSizes: [],
    hasDumpPaths: false,
    skippedDetailed: false,
  });

  let smallOrUnusable = 0;
  let duplicateCandidates = 0;
  const sizeBuckets = new Map();
  const nameBuckets = new Map();

  // Sample metadata: up to 3 images per top folder (skip Polovne detailed)
  const sampledPerFolder = new Map();

  for (const file of images) {
    const r = rel(file);
    const top = topFolder(r);
    const ext = path.extname(file).toLowerCase();
    const stat = folderStats.get(top) || {
      name: top,
      imageCount: 0,
      formats: {},
      sampleSizes: [],
      hasDumpPaths: false,
      skippedDetailed: SKIP_DETAILED.has(top.toLowerCase()),
    };
    stat.imageCount += 1;
    stat.formats[ext] = (stat.formats[ext] || 0) + 1;
    if (DUMP_PATH_HINTS.some((re) => re.test(r))) stat.hasDumpPaths = true;
    folderStats.set(top, stat);

    const base = path.basename(file).toLowerCase();
    nameBuckets.set(base, (nameBuckets.get(base) || 0) + 1);

    const bytes = fs.statSync(file).size;
    const sizeKey = `${base}:${bytes}`;
    sizeBuckets.set(sizeKey, (sizeBuckets.get(sizeKey) || 0) + 1);

    if (stat.skippedDetailed) continue;

    const sampled = sampledPerFolder.get(top) || 0;
    if (sampled < 4) {
      try {
        const meta = await sharp(file, { failOn: "none" }).metadata();
        const w = meta.width || 0;
        const h = meta.height || 0;
        const long = Math.max(w, h);
        if (long > 0 && long < 800) smallOrUnusable += 1;
        if (bytes < 40_000 && long < 1200) smallOrUnusable += 1;
        stat.sampleSizes.push({ w, h, bytes, file: r });
        sampledPerFolder.set(top, sampled + 1);
      } catch {
        smallOrUnusable += 1;
      }
    }
  }

  for (const count of nameBuckets.values()) {
    if (count > 1) duplicateCandidates += count - 1;
  }
  let exactSizeDupes = 0;
  for (const count of sizeBuckets.values()) {
    if (count > 1) exactSizeDupes += count - 1;
  }

  const excludedFolders = [];
  const referenceish = [];
  const albumCandidates = [];

  for (const [name, s] of folderStats) {
    if (name === "(root)") continue;
    const excluded = EXCLUDED_PATTERNS.some((re) => re.test(name));
    if (excluded || s.skippedDetailed) {
      excludedFolders.push({
        name,
        count: s.imageCount,
        reason: s.skippedDetailed
          ? "Polovne orgulje — evidentirano, ne koristi se u ovoj fazi"
          : "Referenca / marketing / nejasno / isključeno po pravilima",
      });
      if (!s.skippedDetailed) referenceish.push(name);
      continue;
    }
    if (s.imageCount === 0) {
      excludedFolders.push({ name, count: 0, reason: "Prazan folder (nema slika)" });
      continue;
    }
    if (s.hasDumpPaths && s.imageCount > 200) {
      excludedFolders.push({
        name,
        count: s.imageCount,
        reason: "Veliki dump (Kamera/Download) — samo eventualni mali kurirani izbor",
      });
      continue;
    }
    if (s.imageCount >= 3) {
      albumCandidates.push({
        name,
        count: s.imageCount,
        slug: slugify(name),
      });
    }
  }

  albumCandidates.sort((a, b) => b.count - a.count);

  // Curated public selection (quality over quantity)
  const curatedAlbumNames = [
    "Varaždin katedrala",
    "Požega katedrala",
    "Pula sv. Anton",
    "Knežija Zagreb",
    "Sv. Jeronim Zagreb",
    "Sveta mati slobode",
    "Sveti Ivan Zeelina",
    "Banja Luka- katedrala",
    "Banja Luka -Trapisti",
    "Banja Luka-župna crkva",
    "Virje",
    "Legrad",
    "Ludbreg",
    "Vivodina",
    "Volovsko",
    "Tomašica",
    "Orgulje Vinica",
    "orgulje samobor",
  ];

  const curatedProjectNames = [
    "Varaždin katedrala",
    "Pula sv. Anton",
    "Knežija Zagreb",
    "Požega katedrala",
    "Sveta mati slobode",
  ];

  const mergeProposals = [
    {
      sources: ["Sv. obitelj Zagreb", "Sveta Obitelj Zagreb"],
      canonical: "Sveta Obitelj Zagreb",
      reason:
        "Isti toponim (Sveta Obitelj, Zagreb); različito pisanje. Spajanje samo u review ako vizualno potvrđeno — u ovoj fazi NIJE objavljeno kao album (kapacitet 18 albuma već popunjen jačim kandidatima).",
      mergedInThisPhase: false,
    },
    {
      sources: ["zapresic", "zapresic 2"],
      canonical: "Zaprešić",
      reason:
        "Slični nazivi; spajanje samo nakon vizualne potvrde istog instrumenta. U ovoj fazi nije uključeno.",
      mergedInThisPhase: false,
    },
    {
      sources: ["orgulje cirkovljan", "Orgulje VZ biskupije/.../CIRKOVLJAN"],
      canonical: "Cirkovljan",
      reason:
        "Mogući overlap VZ nested vs top-level. Ne spajati automatski; VZ dump nije kuriran kao album u ovoj fazi.",
      mergedInThisPhase: false,
    },
  ];

  const lines = [];
  lines.push("# ORGULJARSTVO_SLIKE_AUDIT");
  lines.push("");
  lines.push(`Datum audita: ${new Date().toISOString().slice(0, 10)}`);
  lines.push("");
  lines.push("## Lokacija");
  lines.push("");
  lines.push(`\`${SOURCE}\``);
  lines.push("");
  lines.push("## Sažetak");
  lines.push("");
  lines.push(`- Top-level podfoldera: **${topDirs.length}**`);
  lines.push(`- Ukupno slikovnih datoteka: **${images.length}**`);
  lines.push(
    `- Ignorirane neslikovne datoteke: **${nonImages.length}** (${Object.entries(byExtNon)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ")})`,
  );
  lines.push(
    `- PDF-ova: **${byExtNon[".pdf"] || 0}** — nisu otvarani, čitani, OCR-ani ni kopirani`,
  );
  lines.push(
    `- Kandidati duplikata po istom imenu datoteke: **${duplicateCandidates}**`,
  );
  lines.push(
    `- Exact size+name duplikati: **${exactSizeDupes}**`,
  );
  lines.push(
    `- Premale / problematične (uzorkovanje po folderu, grubi prag): **~${smallOrUnusable}** (procjena iz uzorka, ne potpuni scan svih ${images.length} datoteka)`,
  );
  lines.push("");
  lines.push("## Polovne orgulje");
  lines.push("");
  lines.push(
    "Folder **Polovne orgulje** je pronađen. Fotografije u njemu nisu detaljno analizirane, neće biti procesirane, kopirane, niti korištene u Galeriji, Projektima ili kao artikli u ovoj fazi.",
  );
  lines.push("");
  lines.push("## Predloženi galerijski albumi (ova faza: max 15–20)");
  lines.push("");
  for (const name of curatedAlbumNames) {
    const s = folderStats.get(name);
    lines.push(
      `- **${name}** — ${s ? s.imageCount : "?"} slika u izvoru → javno max 20–25 kuriranih`,
    );
  }
  lines.push("");
  lines.push("## Predloženi javni projekti (ova faza: 3–6)");
  lines.push("");
  for (const name of curatedProjectNames) {
    lines.push(
      `- **${name}** — kandidat ` +
        "`draft: false`" +
        ` nakon QC covera (max 12 fotografija)`,
    );
  }
  lines.push("");
  lines.push("## Isključeni / neobjavljeni folderi (izbor)");
  lines.push("");
  for (const e of excludedFolders.sort((a, b) => a.name.localeCompare(b.name, "hr"))) {
    lines.push(`- **${e.name}** (${e.count}): ${e.reason}`);
  }
  lines.push("");
  lines.push("## Reference / marketing / nejasno");
  lines.push("");
  for (const n of referenceish.sort((a, b) => a.localeCompare(b, "hr"))) {
    lines.push(`- ${n}`);
  }
  lines.push("");
  lines.push("## Prijedlozi spajanja (evidentirano; većina nije spojena u ovoj fazi)");
  lines.push("");
  for (const m of mergeProposals) {
    lines.push(`### ${m.canonical}`);
    lines.push(`- Izvori: ${m.sources.map((s) => `\`${s}\``).join(", ")}`);
    lines.push(`- Razlog: ${m.reason}`);
    lines.push(`- Spojeno u ovoj fazi: **${m.mergedInThisPhase ? "da" : "ne"}**`);
    lines.push("");
  }
  lines.push("## Broj slika po top-level folderu");
  lines.push("");
  lines.push("| Folder | Slike | Dump putanje |");
  lines.push("|--------|------:|:------------:|");
  const sorted = [...folderStats.values()]
    .filter((s) => s.name !== "(root)" || s.imageCount > 0)
    .sort((a, b) => b.imageCount - a.imageCount);
  for (const s of sorted) {
    lines.push(
      `| ${s.name} | ${s.imageCount} | ${s.hasDumpPaths ? "da" : ""} |`,
    );
  }
  lines.push("");
  lines.push("## Napomene za processing");
  lines.push("");
  lines.push("- Objaviti najviše 15–20 albuma, 20–25 foto/album, 3–6 projekata, 12 foto/projekt.");
  lines.push("- Ne procesirati Polovne orgulje.");
  lines.push("- Ne čitati PDF/DOC/XLS/MP4/DWG.");
  lines.push("- Izvorni folder ostaje netaknut i u `.gitignore`.");
  lines.push("");

  fs.writeFileSync(OUT, lines.join("\n"), "utf8");
  console.log("Wrote", OUT);
  console.log({
    folders: topDirs.length,
    images: images.length,
    nonImages: nonImages.length,
    pdfs: byExtNon[".pdf"] || 0,
    curatedAlbums: curatedAlbumNames.length,
    curatedProjects: curatedProjectNames.length,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
