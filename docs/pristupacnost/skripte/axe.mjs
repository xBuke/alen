// axe-core audit: WCAG 2.0/2.1 A+AA, desktop (1350px) i mobitel (390px)
import puppeteer from "puppeteer-core";
import { AxePuppeteer } from "@axe-core/puppeteer";
import fs from "node:fs";
const base = process.argv[2] || "http://localhost:3100";
const out = process.argv[3] || "axe-results.json";
const urls = fs.readFileSync(new URL("./urls.txt", import.meta.url), "utf8").trim().split("\n");
const browser = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const results = {};
for (const vp of [{ name: "desktop", width: 1350, height: 900 }, { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }]) {
  for (const u of urls) {
    const page = await browser.newPage();
    await page.setViewport(vp);
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto(base + u, { waitUntil: "networkidle0" });
    // pomakni do dna da se učitaju lazy elementi i reveal animacije
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); } window.scrollTo(0, 0); });
    await new Promise(r => setTimeout(r, 800));
    const r = await new AxePuppeteer(page).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]).analyze();
    results[`${vp.name} ${u}`] = {
      violations: r.violations.map(v => ({ id: v.id, impact: v.impact, tags: v.tags.filter(t => t.startsWith("wcag")), help: v.help, nodes: v.nodes.map(n => ({ target: n.target.join(" "), summary: n.failureSummary?.slice(0, 300) })) })),
      incomplete: r.incomplete.map(v => ({ id: v.id, n: v.nodes.length })),
      passes: r.passes.length,
      axeVersion: r.testEngine.version,
    };
    const wc = r.violations.filter(v => v.tags.some(t => /^wcag2/.test(t)));
    console.log(`${vp.name.padEnd(7)} ${u.padEnd(32)} WCAG povrede: ${wc.length}  best-practice: ${r.violations.length - wc.length}  ${r.violations.map(v => v.id + "(" + v.nodes.length + ")").join(", ")}`);
    await page.close();
  }
}
fs.writeFileSync(out, JSON.stringify(results, null, 2));
await browser.close();
