// Poluautomatizirane ručne provjere interaktivnih stanja (tipkovnica, fokus, dijalozi, obrazac, reflow, kretanje)
import puppeteer from "puppeteer-core";
import { AxePuppeteer } from "@axe-core/puppeteer";
import fs from "node:fs";
const base = process.argv[2] || "http://localhost:3100";
const log = []; const P = (...a) => { const s = a.join(" "); log.push(s); console.log(s); };
const browser = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function axeState(page, label) {
  const r = await new AxePuppeteer(page).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
  P(`  axe [${label}]: ${r.violations.length} povreda ${r.violations.map(v => v.id + "(" + v.nodes.length + ")").join(", ")}`);
  return r.violations;
}
const focusInfo = page => page.evaluate(() => {
  const el = document.activeElement; if (!el || el === document.body) return { tag: "BODY" };
  const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
  const name = (el.getAttribute("aria-label") || el.innerText || el.getAttribute("alt") || "").trim().replace(/\s+/g, " ").slice(0, 50);
  const visibleIndicator = (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || (cs.boxShadow && cs.boxShadow !== "none");
  const inViewport = r.bottom > 0 && r.top < innerHeight && r.width > 0 && r.height > 0;
  const header = document.querySelector("header"); const hb = header ? header.getBoundingClientRect().bottom : 0;
  return { tag: el.tagName, name, visibleIndicator, inViewport, hidden: r.width === 0 || r.height === 0, underHeader: r.bottom <= hb && el.closest("header") === null, outline: cs.outlineColor + " " + cs.outlineWidth, shadow: cs.boxShadow.slice(0, 40) };
});

// 1) Tipkovnica: redoslijed fokusa i vidljivost na svim stranicama (desktop)
const urls = fs.readFileSync(new URL("./urls.txt", import.meta.url), "utf8").trim().split("\n");
for (const u of urls) {
  const page = await browser.newPage(); await page.setViewport({ width: 1350, height: 900 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(base + u, { waitUntil: "networkidle0" });
  const seq = []; let problems = []; let reachedFooter = false;
  for (let i = 0; i < 160; i++) {
    await page.keyboard.press("Tab"); await sleep(30);
    const f = await focusInfo(page);
    if (f.tag === "BODY") break;
    seq.push(f.name);
    if (!f.visibleIndicator) problems.push("bez vidljivog fokusa: " + f.tag + " '" + f.name + "'");
    if (f.hidden || !f.inViewport) problems.push("fokus izvan vidljivog: " + f.tag + " '" + f.name + "'");
    if (f.underHeader) problems.push("fokus ispod zaglavlja: '" + f.name + "'");
    if (await page.evaluate(() => !!document.activeElement.closest("footer"))) reachedFooter = true;
    if (seq.length > 3 && seq.slice(-1)[0] === seq[0] && i > 5) break;
  }
  P(`${u}: ${seq.length} tab-koraka, prvi='${seq[0]}', podnožje dosegnuto=${reachedFooter}${problems.length ? "\n   PROBLEMI: " + [...new Set(problems)].join(" | ") : ""}`);
  await page.close();
}

// 2) Skip link
{
  const page = await browser.newPage(); await page.setViewport({ width: 1350, height: 900 });
  await page.goto(base + "/o-nama", { waitUntil: "networkidle0" });
  await page.keyboard.press("Tab"); const f = await focusInfo(page);
  const vis = await page.evaluate(() => { const r = document.activeElement.getBoundingClientRect(); return r.width > 20 && r.height > 10; });
  await page.keyboard.press("Enter"); await sleep(300);
  const hash = await page.evaluate(() => location.hash);
  await page.keyboard.press("Tab"); const after = await focusInfo(page);
  P(`Skip link: prvi fokus='${f.name}', vidljiv=${vis}, nakon Enter hash=${hash}, sljedeći fokus='${after.name}' (treba biti u <main>)`);
  P("  sljedeći fokus u main:", await page.evaluate(() => !!document.activeElement.closest("main")));
  await page.close();
}

// 3) Mobilni izbornik
for (const u of ["/", "/en/about"]) {
  const page = await browser.newPage(); await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(base + u, { waitUntil: "networkidle0" });
  const btn = await page.$('button[aria-label="Otvori izbornik"], button[aria-label="Open menu"]');
  await btn.focus(); const expBefore = await page.evaluate(b => b.getAttribute("aria-expanded"), btn);
  await page.keyboard.press("Enter"); await sleep(600);
  const st = await page.evaluate(() => { const d = document.querySelector('[role=dialog]'); return { open: !!d, modal: d?.getAttribute("aria-modal"), label: d && (d.getAttribute("aria-labelledby") ? document.getElementById(d.getAttribute("aria-labelledby"))?.textContent : d.getAttribute("aria-label")), focusInside: d?.contains(document.activeElement), focused: document.activeElement?.innerText?.trim() || document.activeElement?.getAttribute("aria-label") }; });
  const expAfter = await page.evaluate(b => b.getAttribute("aria-expanded"), btn);
  // zamka fokusa: 40 tabova ostaje u dijalogu
  let escaped = false; for (let i = 0; i < 40; i++) { await page.keyboard.press("Tab"); if (!(await page.evaluate(() => document.querySelector('[role=dialog]')?.contains(document.activeElement)))) escaped = true; }
  const closeName = await page.evaluate(() => [...document.querySelectorAll('[role=dialog] button')].map(b => b.innerText.trim() || b.getAttribute("aria-label")).join(" / "));
  await axeState(page, "mobilni izbornik otvoren " + u);
  await page.keyboard.press("Escape"); await sleep(500);
  const back = await page.evaluate(b => document.activeElement === b, btn);
  P(`Mobilni izbornik ${u}: aria-expanded ${expBefore}->${expAfter}, otvoren=${st.open}, aria-modal=${st.modal}, naslov='${st.label}', fokus unutra=${st.focusInside} ('${st.focused}'), fokus ostaje u dijalogu=${!escaped}, gumbi='${closeName}', Esc vraća fokus na gumb=${back}`);
  await page.close();
}

// 4) Galerija + lightbox (tipkovnica)
for (const u of ["/galerija", "/en/gallery"]) {
  const page = await browser.newPage(); await page.setViewport({ width: 1350, height: 900 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(base + u, { waitUntil: "networkidle0" });
  const card = (await page.$$("main article button"))[1];
  const cardName = await page.evaluate(b => b.innerText.replace(/\s+/g, " "), card);
  await card.focus(); await page.keyboard.press("Enter"); await sleep(500);
  const afterAlbum = await focusInfo(page);
  P(`${u}: kartica albuma '${cardName}' -> nakon Enter fokus na ${afterAlbum.tag} '${afterAlbum.name}'`);
  // pronađi prvu fotografiju
  let f; for (let i = 0; i < 15; i++) { await page.keyboard.press("Tab"); f = await focusInfo(page); if (/Otvori fotografiju|Open photo/.test(f.name) || (await page.evaluate(() => document.activeElement.closest("figure") !== null))) break; }
  const photoName = await page.evaluate(() => { const e = document.activeElement; return e.textContent.trim() + " | img alt: " + e.querySelector("img")?.alt; });
  P(`  fokus na fotografiji: ${photoName}`);
  await page.keyboard.press("Enter"); await sleep(800);
  const lb = await page.evaluate(() => { const d = document.querySelector('[role=dialog]'); const ids = d?.getAttribute("aria-labelledby")?.split(" ") || []; return { open: !!d, name: ids.map(i => document.getElementById(i)?.textContent).join(" "), focus: document.activeElement.getAttribute("aria-label") }; });
  P(`  lightbox: otvoren=${lb.open}, naziv='${lb.name}', fokus='${lb.focus}'`);
  await axeState(page, "lightbox " + u);
  await page.keyboard.press("ArrowRight"); await sleep(300);
  const name2 = await page.evaluate(() => { const d = document.querySelector('[role=dialog]'); return d.getAttribute("aria-labelledby").split(" ").map(i => document.getElementById(i)?.textContent).join(" "); });
  let escaped = false; for (let i = 0; i < 10; i++) { await page.keyboard.press("Tab"); if (!(await page.evaluate(() => document.querySelector('[role=dialog]')?.contains(document.activeElement)))) escaped = true; }
  // idi na kraj albuma strelicama, zatim provjeri da fokus nije izgubljen kad nestane gumb "sljedeća"
  const nextBtn = await page.$('[role=dialog] button[aria-label="Sljedeća fotografija"], [role=dialog] button[aria-label="Next photo"]');
  await nextBtn.focus(); for (let i = 0; i < 30; i++) { await page.keyboard.press("Enter"); await sleep(60); }
  const atEnd = await page.evaluate(() => ({ inDialog: document.querySelector('[role=dialog]')?.contains(document.activeElement), focus: document.activeElement.getAttribute("aria-label") }));
  await page.keyboard.press("Escape"); await sleep(400);
  const ret = await focusInfo(page);
  P(`  ArrowRight -> '${name2}'; zamka fokusa drži=${!escaped}; na zadnjoj fotografiji fokus u dijalogu=${atEnd.inDialog} ('${atEnd.focus}'); Esc -> fokus vraćen na ${ret.tag} '${ret.name}'`);
  await page.close();
}

// 5) Obrazac: slanje praznog obrasca
for (const u of ["/kontakt", "/en/contact"]) {
  const page = await browser.newPage(); await page.setViewport({ width: 1350, height: 900 });
  await page.goto(base + u, { waitUntil: "networkidle0" });
  const labels = await page.evaluate(() => [...document.querySelectorAll("form input:not([tabindex='-1']), form textarea, form button[role=combobox], form button[role=checkbox]")].map(e => { const lab = e.labels?.[0]?.innerText || (e.id && document.querySelector(`label[for=${e.id}]`)?.innerText); return `${e.id}:label='${(lab || "").replace(/\s+/g, " ").slice(0, 40)}' req=${e.getAttribute("aria-required")} ac=${e.getAttribute("autocomplete")}`; }));
  P(`${u} polja: ${labels.join(" ; ")}`);
  const hp = await page.evaluate(() => document.getElementById("companyWebsite")?.closest("[aria-hidden]")?.getAttribute("aria-hidden"));
  P(`  honeypot aria-hidden=${hp}`);
  await page.click('form button[type=submit]'); await sleep(600);
  const st = await page.evaluate(() => ({ focus: document.activeElement.id, invalid: [...document.querySelectorAll('[aria-invalid=true]')].map(e => e.id + "->" + e.getAttribute("aria-describedby")), errors: [...document.querySelectorAll('[role=alert]')].map(e => e.textContent.trim()) }));
  P(`  nakon slanja praznog: fokus=${st.focus}, aria-invalid=${st.invalid.join(", ")}\n  poruke: ${st.errors.join(" | ")}`);
  await axeState(page, "obrazac s greškama " + u);
  // e-pošta neispravna
  await page.type("#email", "nije-email"); await page.keyboard.press("Tab"); await sleep(300);
  P("  neispravna e-pošta:", await page.evaluate(() => document.getElementById("email-error")?.textContent));
  // select tipkovnicom
  await page.focus("#inquiryType"); await page.keyboard.press("Enter"); await sleep(400);
  const lb = await page.evaluate(() => ({ role: document.querySelector('[role=listbox]') ? "listbox" : "-", opts: document.querySelectorAll('[role=option]').length, focus: document.activeElement.getAttribute("role") }));
  await page.keyboard.press("ArrowDown"); await page.keyboard.press("Enter"); await sleep(300);
  P(`  padajući izbornik tipkovnicom: ${lb.role} s ${lb.opts} opcija, fokus na ${lb.focus}; odabrano='${await page.evaluate(() => document.getElementById("inquiryType").innerText)}', fokus vraćen na okidač=${await page.evaluate(() => document.activeElement.id)}`);
  await page.close();
}

// 6) Svirale tipkovnicom + anatomija
{
  const page = await browser.newPage(); await page.setViewport({ width: 1350, height: 900 });
  await page.goto(base + "/", { waitUntil: "networkidle0" });
  const pipe = await page.$("[data-pipe='5']"); await pipe.focus();
  const n1 = await page.evaluate(() => document.activeElement.getAttribute("aria-label") + " / grupa: " + document.activeElement.closest("[role=group]")?.getAttribute("aria-label"));
  await page.keyboard.press("ArrowRight"); const n2 = await page.evaluate(() => document.activeElement.getAttribute("aria-label") + " tabindex=" + document.activeElement.tabIndex);
  await page.keyboard.press("Enter"); await sleep(100);
  const sounding = await page.evaluate(() => document.activeElement.classList.contains("is-sounding"));
  const tabStops = await page.evaluate(() => [...document.querySelectorAll("[data-pipe]")].filter(b => b.tabIndex === 0).length);
  P(`Svirale: ${n1}; ArrowRight -> ${n2}; Enter svira=${sounding}; svirala u tab-redoslijedu=${tabStops}`);
  await page.close();
}
{
  const page = await browser.newPage(); await page.setViewport({ width: 1350, height: 900 });
  await page.goto(base + "/orgulje", { waitUntil: "networkidle0" });
  const res = await page.evaluate(() => { const btn = [...document.querySelectorAll("button")].find(x => /Zaustavi animaciju/.test(x.textContent) && x.offsetParent); btn.click(); return new Promise(r => setTimeout(() => { const sec = btn.closest("section"); const w = sec.querySelector(".anatomy-wind"); r({ cls: sec.classList.contains("anatomy-paused"), state: getComputedStyle(w).animationPlayState, label: btn.textContent.trim() }); }, 200)); });
  P(`Anatomija: nakon klika paused=${res.cls}, animation-play-state=${res.state}, gumb sad='${res.label}'`);
  // tabovi
  const tab = await page.$("[role=tab][aria-selected=true]"); await tab.focus(); await page.keyboard.press("ArrowRight"); await sleep(100);
  P("  tablist ArrowRight ->", await page.evaluate(() => document.activeElement.textContent.trim() + " selected=" + document.activeElement.getAttribute("aria-selected") + " panel='" + document.querySelector("[role=tabpanel] h3").textContent + "'"));
  await page.close();
}

// 7) Smanjeno kretanje
{
  const page = await browser.newPage(); await page.setViewport({ width: 1350, height: 900 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(base + "/orgulje", { waitUntil: "networkidle0" });
  const r = await page.evaluate(() => { const w = document.querySelector(".anatomy-wind"); const cs = getComputedStyle(w); const rev = document.querySelector(".reveal"); return { dur: cs.animationDuration, it: cs.animationIterationCount, revealOpacity: getComputedStyle(rev).opacity, toggleVisible: [...document.querySelectorAll("button")].some(x => /Zaustavi animaciju/.test(x.textContent) && x.offsetParent) }; });
  P(`Reduced motion /orgulje: anatomy animacija ${r.dur} x${r.it}, .reveal opacity=${r.revealOpacity}, gumb pauze vidljiv=${r.toggleVisible}`);
  await page.goto(base + "/", { waitUntil: "networkidle0" }); await sleep(3500);
  const h = await page.evaluate(() => ({ sounding: document.querySelectorAll(".pipe.is-sounding").length, pipeAnim: getComputedStyle(document.querySelector(".pipe-body")).animationDuration, hintDot: getComputedStyle(document.querySelector(".prospect-hint-dot"), "::after").animationDuration, scroll: getComputedStyle(document.documentElement).scrollBehavior }));
  P(`Reduced motion /: val svirala aktivan=${h.sounding > 0}, pipe-rise ${h.pipeAnim}, pulsiranje ${h.hintDot}, scroll-behavior=${h.scroll}`);
  await page.close();
  // bez reduced motion: val samo jednom
  const p2 = await browser.newPage(); await p2.setViewport({ width: 1350, height: 900 });
  await p2.goto(base + "/", { waitUntil: "networkidle0" });
  let waves = 0, prev = false; const t0 = Date.now();
  while (Date.now() - t0 < 14000) { const s = await p2.evaluate(() => document.querySelectorAll(".pipe.is-sounding").length > 0); if (s && !prev) waves++; prev = s; await sleep(100); }
  const lastMove = await p2.evaluate(() => [...document.getAnimations()].filter(a => a.playState === "running").map(a => a.animationName || "?").join(","));
  P(`Bez reduced motion: broj valova u 14 s = ${waves}; animacije koje još traju na naslovnici nakon 14 s: [${lastMove}]`);
  await p2.close();
}

// 8) Reflow 320 px i zoom 200 % (1280 px pri 200 % = 640 CSS px)
for (const vp of [{ width: 320, height: 640 }, { width: 640, height: 400 }]) {
  const bad = [];
  for (const u of urls) {
    const page = await browser.newPage(); await page.setViewport(vp);
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto(base + u, { waitUntil: "networkidle0" });
    const o = await page.evaluate(() => { const w = document.documentElement.clientWidth; const off = [...document.querySelectorAll("main *, header *, footer *")].filter(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.right > w + 1 && cs.position !== "fixed" && !e.closest(".sr-only") && !e.closest("[aria-hidden=true]") && e.className !== "sr-only"; }).map(e => e.tagName + "." + String(e.className).slice(0, 40) + " right=" + Math.round(e.getBoundingClientRect().right)); return { sw: document.documentElement.scrollWidth, w, off: off.slice(0, 4) }; });
    if (o.sw > o.w || o.off.length) bad.push(`${u} scrollWidth=${o.sw}/${o.w} ${o.off.join("; ")}`);
    await page.close();
  }
  P(`Reflow ${vp.width}px: ${bad.length ? "PROBLEMI:\n   " + bad.join("\n   ") : "bez vodoravnog pomicanja na svih " + urls.length + " stranica"}`);
}

// 9) Razmak teksta (WCAG 1.4.12)
{
  const bad = [];
  for (const u of urls) {
    const page = await browser.newPage(); await page.setViewport({ width: 390, height: 844 });
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto(base + u, { waitUntil: "networkidle0" });
    await page.addStyleTag({ content: "*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}" });
    await sleep(200);
    const clipped = await page.evaluate(() => [...document.querySelectorAll("a,button,p,h1,h2,h3,span,label,li,dt,dd")].filter(e => { if (e.closest("[aria-hidden=true]") || e.classList.contains("sr-only") || e.closest(".sr-only")) return false; const cs = getComputedStyle(e); if (!(cs.overflow === "hidden" || cs.overflowX === "hidden" || cs.textOverflow === "ellipsis" || cs.webkitLineClamp !== "none")) return false; return e.scrollWidth > e.clientWidth + 2 || e.scrollHeight > e.clientHeight + 2; }).map(e => e.tagName + " '" + e.textContent.trim().slice(0, 30) + "'").slice(0, 5));
    if (clipped.length) bad.push(`${u}: ${clipped.join("; ")}`);
    await page.close();
  }
  P(`Razmak teksta 1.4.12: ${bad.length ? "MOGUĆE ODREZANO:\n   " + bad.join("\n   ") : "nema odrezanog teksta"}`);
}
fs.writeFileSync(process.argv[3] || "manual-results.txt", log.join("\n"));
await browser.close();
