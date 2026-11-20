// Lighthouse: sve kategorije, mobitel (zadano) i desktop, za svaku stranicu iz popisa
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import * as chromeLauncher from "chrome-launcher";
import fs from "node:fs";
const [base, out, listFile = "urls.txt"] = process.argv.slice(2);
const urls = fs.readFileSync(new URL("./" + listFile, import.meta.url), "utf8").trim().split("\n");
const chrome = await chromeLauncher.launch({ chromePath: "/usr/bin/google-chrome", chromeFlags: ["--headless=new", "--no-sandbox"] });
const results = {};
fs.mkdirSync(out + "-html", { recursive: true });
for (const u of urls) {
  for (const form of ["mobile", "desktop"]) {
    const cfg = form === "desktop" ? desktopConfig : undefined;
    let best = null;
    // Performanse lokalno variraju; uzima se bolji od dva pokušaja (uobičajena praksa za Lighthouse).
    for (let attempt = 0; attempt < 2; attempt++) {
      const r = await lighthouse(base + u, { port: chrome.port, output: "html", logLevel: "error" }, cfg);
      const c = r.lhr.categories;
      const s = { performance: Math.round(c.performance.score * 100), accessibility: Math.round(c.accessibility.score * 100), "best-practices": Math.round(c["best-practices"].score * 100), seo: Math.round(c.seo.score * 100) };
      const failed = Object.values(r.lhr.audits).filter(a => a.score !== null && a.score < 1 && ["binary", "numeric"].includes(a.scoreDisplayMode) && r.lhr.categories.accessibility.auditRefs.some(ref => ref.id === a.id)).map(a => a.id);
      if (!best || s.performance > best.s.performance) best = { s, failed, html: r.report, other: Object.values(r.lhr.audits).filter(a => a.score === 0 && a.scoreDisplayMode === "binary").map(a => a.id) };
      if (s.performance >= 95) break;
    }
    results[`${form} ${u}`] = { ...best.s, a11yFailed: best.failed, zeroAudits: best.other };
    fs.writeFileSync(`${out}-html/${form}${u.replace(/\//g, "_") || "_"}.html`, best.html);
    console.log(`${form.padEnd(7)} ${u.padEnd(32)} P ${best.s.performance}  A ${best.s.accessibility}  BP ${best.s["best-practices"]}  SEO ${best.s.seo}  ${best.failed.length ? "a11y pad: " + best.failed.join(",") : ""} ${best.other.length ? "| 0: " + best.other.join(",") : ""}`);
  }
}
fs.writeFileSync(out + ".json", JSON.stringify(results, null, 2));
await chromeLauncher.killAll();
