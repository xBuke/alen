// Ručna/poluautomatska provjera strukture: naslov, lang, hreflang, landmarkovi, naslovi, alt, novi prozor
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const base = process.argv[2] || "http://localhost:3100";
const urls = fs.readFileSync(new URL("./urls.txt", import.meta.url), "utf8").trim().split("\n");
const browser = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const out = {};
for (const u of urls) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1350, height: 900 });
  await page.goto(base + u, { waitUntil: "networkidle0" });
  const info = await page.evaluate(() => {
    const vis = el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    return {
      title: document.title,
      lang: document.documentElement.lang,
      hreflang: [...document.querySelectorAll('link[rel=alternate][hreflang]')].map(l => l.hreflang + "=" + l.getAttribute("href")),
      landmarks: [...document.querySelectorAll("header,nav,main,footer,aside,[role=banner],[role=navigation],[role=main],[role=contentinfo]")].map(e => e.tagName.toLowerCase() + (e.getAttribute("aria-label") ? `[${e.getAttribute("aria-label")}]` : "")),
      headings: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter(vis).map(h => h.tagName + " " + h.textContent.trim().slice(0, 50)),
      imgs: [...document.querySelectorAll("img")].map(i => ({ alt: i.getAttribute("alt"), src: i.getAttribute("src")?.slice(0, 70), hidden: !!i.closest("[aria-hidden=true]") })),
      blank: [...document.querySelectorAll("a[target=_blank]")].map(a => a.textContent.trim() + " | " + (a.getAttribute("aria-label") || "")),
      svgs: [...document.querySelectorAll("svg")].filter(s => !s.closest("[aria-hidden=true]") && s.getAttribute("aria-hidden") !== "true" && !s.getAttribute("role")).length,
      langParts: [...document.querySelectorAll("body [lang]")].map(e => e.lang + ":" + e.textContent.trim().slice(0, 30)),
    };
  });
  out[u] = info;
  await page.close();
}
fs.writeFileSync(process.argv[3] || "structure.json", JSON.stringify(out, null, 2));
for (const [u, i] of Object.entries(out)) {
  console.log(`\n## ${u}  lang=${i.lang}  title="${i.title}"`);
  console.log("hreflang:", i.hreflang.join(" "));
  console.log("landmarks:", i.landmarks.join(", "));
  console.log("headings:", i.headings.join(" | "));
  console.log("imgs alt:", i.imgs.filter(x => !x.hidden).map(x => JSON.stringify(x.alt)).join(", ").slice(0, 900));
  console.log("blank:", i.blank.join(" ; "), " svg-no-role:", i.svgs, " lang-parts:", i.langParts.join(" ; "));
}
await browser.close();
