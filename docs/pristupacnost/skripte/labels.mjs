import puppeteer from "puppeteer-core";
import { PNG } from "pngjs";
const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const browser = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"] });
for (const vp of [{ width: 1350, height: 900 }, { width: 390, height: 844 }]) for (const u of ["/galerija", "/en/gallery"]) {
  const page = await browser.newPage(); await page.setViewport(vp);
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto("http://localhost:3100" + u, { waitUntil: "networkidle0" });
  const spans = await page.$$("#prije-i-poslije span.absolute, #before-and-after span.absolute");
  const out = [];
  for (const sp of spans) {
    const info = await page.evaluate(e => { e.scrollIntoView({ block: "center" }); document.querySelector("header").style.visibility = "hidden"; const cv = document.createElement("canvas").getContext("2d"); cv.fillStyle = getComputedStyle(e).color; cv.fillRect(0,0,1,1); const d = cv.getImageData(0,0,1,1).data; e.style.setProperty("color", "transparent", "important"); const r = e.getBoundingClientRect(); return { fg: [d[0], d[1], d[2]], r: { x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height }, t: e.textContent }; }, sp);
    await new Promise(r => setTimeout(r, 300));
    const png = PNG.sync.read(await page.screenshot({ clip: info.r }));
    const v = []; for (let i = 0; i < png.data.length; i += 4) v.push(ratio(info.fg, [png.data[i], png.data[i + 1], png.data[i + 2]]));
    v.sort((a, b) => a - b); out.push(`${info.t} ${v[Math.floor(v.length * 0.02)].toFixed(2)}`);
  }
  console.log(vp.width, u, out.join(" | "));
  await page.close();
}
await browser.close();
