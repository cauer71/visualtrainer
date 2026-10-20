// Rundum-Test nur für „Zahlenkreisel“ auf vier Bühnen (Tablet quer 1180×820, Tablet hoch 820×1180, Handy 390×844,
// Handy quer 844×390), Deutsch und Italienisch:
//  1. Intro öffnet und der Film läuft (Canvas nicht leer), kein horizontales Scrollen.
//  2. Echtes Antippen (Touch): ein Fehltipp auf eine falsche Zahl, dann 1, 2, 3 … der Reihe nach. Die Plätze kommen aus
//     dem Test-Zugang `window.__zahlenkreisel` (nur mit ?e2e=1). Ergebnis mit Stufe, Gesamtzeit und genau 1 Fehltipp.
//  3. Autoplay bis zum Ergebnis. Keine Konsolenfehler. Optional: SHOTS=<Ordner> speichert Bilder.
//
// Aufruf: npm run build && npx vite preview --port 4173 &  →  node tests/e2e/zahlenkreisel.mjs [baseUrl]
import fs from 'node:fs';
import { chromium } from 'playwright';

const base = process.argv[2] || 'http://localhost:4173/';
const id = 'zahlenkreisel';
const shots = process.env.SHOTS || '';
if (shots) fs.mkdirSync(shots, { recursive: true });
const viewports = [
  { name: 'tablet-quer', width: 1180, height: 820 },
  { name: 'tablet-hoch', width: 820, height: 1180 },
  { name: 'handy', width: 390, height: 844 },
  { name: 'handy-quer', width: 844, height: 390 },
];
const ERRORS_LABEL = { de: 'Fehltipps', it: 'Tocchi sbagliati' };
const TOTAL_LABEL = { de: 'Gesamtzeit', it: 'Tempo totale' };

async function canvasHasContent(page, selector) {
  return page.evaluate((sel) => {
    const c = document.querySelector(sel);
    if (!c || !c.width || !c.height) return false;
    const tmp = document.createElement('canvas');
    tmp.width = 64;
    tmp.height = 64;
    const g = tmp.getContext('2d');
    g.drawImage(c, 0, 0, 64, 64);
    const d = g.getImageData(0, 0, 64, 64).data;
    let min = 255;
    let max = 0;
    for (let i = 0; i < d.length; i += 4) {
      const v = d[i] + d[i + 1] + d[i + 2];
      if (v < min) min = v;
      if (v > max) max = v;
    }
    return max - min > 30;
  }, selector);
}

const noHScroll = (page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1 && document.body.scrollWidth <= window.innerWidth + 1);

/** Aktuelle Plätze aus dem Test-Zugang, umgerechnet in Seitenkoordinaten */
async function view(page) {
  return page.evaluate(() => {
    const v = window.__zahlenkreisel?.();
    const c = document.querySelector('.session canvas.stage-canvas');
    if (!v || !c) return null;
    const r = c.getBoundingClientRect();
    const sx = r.width / v.canvasSize.w;
    const sy = r.height / v.canvasSize.h;
    return { ...v, items: v.items.map((it) => ({ ...it, px: r.left + it.x * sx, py: r.top + it.y * sy })) };
  });
}

async function statValue(page, label) {
  return page.evaluate((lab) => {
    for (const s of document.querySelectorAll('.result-stats .stat')) {
      if (s.querySelector('.stat-label')?.textContent?.trim() === lab) return s.querySelector('.stat-value')?.textContent?.trim() ?? null;
    }
    return null;
  }, label);
}

const browser = await chromium.launch();
const failures = [];

for (const lang of ['de', 'it']) {
  for (const vp of viewports) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, hasTouch: true, isMobile: vp.name.startsWith('handy'), locale: lang === 'it' ? 'it-IT' : 'de-DE' });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    page.on('pageerror', (e) => errors.push(e.message));
    const label = `${lang}/${vp.name}`;
    try {
      // --- 1 + 2: Intro, dann echtes Antippen
      await page.goto(`${base}?quick=1&e2e=1&lang=${lang}#/uebung/${id}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1800);
      if (!(await canvasHasContent(page, '.demo-stage canvas'))) throw new Error('Intro-Film zeigt nichts');
      if (!(await noHScroll(page))) throw new Error('Intro: horizontales Scrollen');
      if (shots) await page.screenshot({ path: `${shots}/${lang}-${vp.name}-intro.png`, fullPage: true });
      await page.click('.intro .btn-primary');
      await page.waitForFunction(() => typeof window.__zahlenkreisel === 'function', null, { timeout: 15000 });
      await page.waitForTimeout(800);
      let v = await view(page);
      if (!v || v.total < 5) throw new Error('Test-Zugang liefert keine Zahlen');
      if (!(await canvasHasContent(page, '.session canvas.stage-canvas'))) throw new Error('Übung zeigt nichts');
      if (!(await noHScroll(page))) throw new Error('Übung: horizontales Scrollen');
      // Trefferflächen: mindestens 44 px, alle Zahlen im Bild
      for (const it of v.items) {
        if (2 * it.r < 44) throw new Error(`Trefferfläche zu klein: ${(2 * it.r).toFixed(0)} px`);
        if (it.px < 0 || it.py < 0 || it.px > vp.width || it.py > vp.height) throw new Error(`Zahl ${it.num} außerhalb des Bildes`);
      }
      // ein Fehltipp: eine Zahl, die (noch) nicht gesucht ist
      const wrong = v.items.find((it) => it.num === v.total);
      await page.touchscreen.tap(wrong.px, wrong.py);
      await page.waitForTimeout(200);
      if (shots) await page.screenshot({ path: `${shots}/${lang}-${vp.name}-fehltipp.png` });
      for (let n = 1; n <= v.total; n++) {
        const cur = await view(page);
        if (!cur || cur.next !== n) throw new Error(`gesucht wäre ${n}, Anzeige sagt ${cur?.next}`);
        const it = cur.items.find((q) => q.num === n);
        await page.touchscreen.tap(it.px, it.py);
        await page.waitForTimeout(90);
        if (shots && n === Math.ceil(v.total / 2)) await page.screenshot({ path: `${shots}/${lang}-${vp.name}-run.png` });
      }
      await page.waitForSelector('.result-card', { timeout: 20000 });
      const value = await page.textContent('.result-value');
      if (!value || !/\d/.test(value)) throw new Error(`Ergebnis ohne Zahl: "${value}"`);
      const errs = await statValue(page, ERRORS_LABEL[lang]);
      if (errs !== '1') throw new Error(`Fehltipps sollten 1 sein, sind "${errs}"`);
      const total = await statValue(page, TOTAL_LABEL[lang]);
      if (!total || !/\d/.test(total)) throw new Error(`Gesamtzeit fehlt: "${total}"`);
      if (!(await noHScroll(page))) throw new Error('Ergebnis: horizontales Scrollen');
      if (shots) await page.screenshot({ path: `${shots}/${lang}-${vp.name}-result.png`, fullPage: true });

      // --- 3: Autoplay
      await page.goto(`${base}?quick=1&autoplay=1&lang=${lang}#/uebung/${id}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(800);
      await page.click('.intro .btn-primary');
      await page.waitForSelector('.result-card', { timeout: 90000 });
      const auto = await page.textContent('.result-value');
      if (!auto || !/\d/.test(auto)) throw new Error(`Autoplay: Ergebnis ohne Zahl: "${auto}"`);

      if (errors.length) throw new Error(`Konsolenfehler: ${errors.join(' | ')}`);
      console.log(`✓ ${label}  →  ${value.replace(/\s+/g, ' ').trim()} · ${total} · Fehltipps ${errs}`);
    } catch (e) {
      failures.push(`${label}: ${e.message.split('\n')[0]}`);
      console.log(`✗ ${label}: ${e.message.split('\n')[0]}`);
    }
    await ctx.close();
  }
}

await browser.close();
if (failures.length) {
  console.log(`\n${failures.length} Fehler:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log('\nZahlenkreisel ok.');
