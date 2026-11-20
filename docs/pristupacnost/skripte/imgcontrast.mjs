// Kontrast teksta preko slika/gradijenata: axe ih vraća kao "incomplete"; mjerimo piksele pozadine.
import puppeteer from "puppeteer-core";
import { AxePuppeteer } from "@axe-core/puppeteer";
import fs from "node:fs";
import { PNG } from "pngjs";
const base = process.argv[2] || "http://localhost:3100";
const urls = fs.readFileSync(new URL("./urls.txt", import.meta.url), "utf8").trim().split("\n");
const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const browser = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const results = [];
for (const vp of [{ name: "desktop", width: 1350, height: 900 }, { name: "mobile", width: 390, height: 844, deviceScaleFactor: 1 }]) {
  for (const u of urls) {
    const page = await browser.newPage(); await page.setViewport(vp);
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto(base + u, { waitUntil: "networkidle0" });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 30)); } window.scrollTo(0, 0); });
    await new Promise(r => setTimeout(r, 600));
    const r = await new AxePuppeteer(page).withRules(["color-contrast"]).analyze();
    const targets = (r.incomplete.find(i => i.id === "color-contrast")?.nodes || []).map(n => n.target[0]);
    let worst = null; let fails = [];
    for (const sel of targets) {
      const info = await page.evaluate(sel => {
        const el = document.querySelector(sel); if (!el || el.closest(".sr-only") || el.closest("[aria-hidden=true] svg")) return null;
        const inFixed = !!el.closest("header");
        if (!inFixed) { el.scrollIntoView({ block: "center" }); document.querySelector("header").style.visibility = "hidden"; }
        else { window.scrollTo(0, 0); document.querySelector("header").style.visibility = ""; }
        const cs = getComputedStyle(el);
        // pretvorba bilo kojeg CSS formata boje (oklab, color-mix...) u RGBA preko canvasa
        const cv = document.createElement("canvas"); cv.width = cv.height = 1; const cx = cv.getContext("2d");
        cx.fillStyle = cs.color; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data;
        const m = [d[0], d[1], d[2], d[3] / 255];
        const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
        const large = size >= 24 || (bold && size >= 18.66);
        el.style.setProperty("visibility", "hidden", "important");
        // samo površina vidljivog teksta (bez sr-only potomaka)
        const rects = []; const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) { const tn = walker.currentNode; if (!tn.textContent.trim() || tn.parentElement.closest(".sr-only")) continue; const rg = document.createRange(); rg.selectNodeContents(tn); for (const q of rg.getClientRects()) rects.push(q); }
        if (!rects.length) return null;
        const rc = { x: Math.min(...rects.map(q => q.x)), y: Math.min(...rects.map(q => q.y)), right: Math.max(...rects.map(q => q.right)), bottom: Math.max(...rects.map(q => q.bottom)) };
        rc.width = rc.right - rc.x; rc.height = rc.bottom - rc.y;
        return { fg: m.slice(0, 3), a: m[3] ?? 1, large, rect: { x: rc.x, y: rc.y, width: rc.width, height: rc.height }, sx: inFixed ? 0 : scrollX, sy: inFixed ? 0 : scrollY, text: el.textContent.trim().slice(0, 40) };
      }, sel);
      if (!info || info.rect.width < 2 || info.rect.height < 2) continue;
      await new Promise(r => setTimeout(r, 50));
      const clip = { x: Math.max(0, info.rect.x), y: Math.max(0, info.rect.y), width: Math.min(info.rect.width, vp.width - Math.max(0, info.rect.x)), height: Math.min(info.rect.height, vp.height - Math.max(0, info.rect.y)) };
      if (clip.width < 2 || clip.height < 2) continue;
      const buf = await page.screenshot({ clip: { ...clip, x: clip.x + info.sx, y: clip.y + info.sy }, encoding: "binary" });
      await page.evaluate(sel => { const el = document.querySelector(sel); el.style.removeProperty("visibility"); }, sel);
      const png = PNG.sync.read(buf); const vals = [];
      for (let i = 0; i < png.data.length; i += 4) {
        const bg = [png.data[i], png.data[i + 1], png.data[i + 2]];
        const fg = info.fg.map((c, k) => c * info.a + bg[k] * (1 - info.a));
        vals.push(ratio(fg, bg));
      }
      vals.sort((a, b) => a - b);
      const p2 = vals[Math.floor(vals.length * 0.02)]; // 2. percentil (zanemaruje šum)
      const need = info.large ? 3 : 4.5;
      if (!worst || p2 < worst.p2) worst = { p2, sel, text: info.text, need };
      if (p2 < need) { fails.push(`'${info.text}' ${p2.toFixed(2)}<${need}`); if (process.env.DBG) { fs.writeFileSync(`dbg-${fails.length}.png`, buf); console.log('DBG', sel, JSON.stringify(info), JSON.stringify(clip)); } }
    }
    results.push({ vp: vp.name, u, n: targets.length, worst, fails });
    console.log(`${vp.name.padEnd(7)} ${u.padEnd(30)} izmjereno ${String(targets.length).padStart(3)}  najlošije ${worst ? worst.p2.toFixed(2) + " ('" + worst.text + "')" : "-"}  ${fails.length ? "PAD: " + fails.join("; ") : "OK"}`);
    await page.close();
  }
}
fs.writeFileSync(process.argv[3] || "imgcontrast.json", JSON.stringify(results, null, 2));
await browser.close();
