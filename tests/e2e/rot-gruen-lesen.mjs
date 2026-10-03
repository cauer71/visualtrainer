// Rundum-Test nur für „Rot-Grün-Lesen“ auf drei Bühnen (Tablet quer 1180×820, Tablet hoch 820×1180, Handy 390×844):
// Intro öffnet und der Film läuft (Canvas nicht leer), Start, Autoplay bis zum Ergebnis, keine Konsolenfehler,
// kein horizontales Scrollen (Intro, Übung, Ergebnis). Optional: SHOTS=<Ordner> speichert Bilder.
//
// Aufruf: npm run build && npx vite preview --port 4173 &  →  node tests/e2e/rot-gruen-lesen.mjs [baseUrl]
import fs from 'node:fs';
import { chromium } from 'playwright';

const base = process.argv[2] || 'http://localhost:4173/';
const id = 'labor-rot-gruen-lesen';
const shots = process.env.SHOTS || '';
if (shots) fs.mkdirSync(shots, { recursive: true });
const viewports = [
  { name: 'tablet-quer', width: 1180, height: 820 },
  { name: 'tablet-hoch', width: 820, height: 1180 },
  { name: 'handy', width: 390, height: 844 },
];

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

const browser = await chromium.launch();
const failures = [];

for (const lang of ['de', 'it']) {
  for (const vp of viewports) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, hasTouch: true, locale: lang === 'it' ? 'it-IT' : 'de-DE' });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    page.on('pageerror', (e) => errors.push(e.message));
    const label = `${lang}/${vp.name}`;
    try {
      await page.goto(`${base}?quick=1&autoplay=1&lang=${lang}#/uebung/${id}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1800);
      if (!(await canvasHasContent(page, '.demo-stage canvas'))) throw new Error('Intro-Film zeigt nichts');
      if (!(await noHScroll(page))) throw new Error('Intro: horizontales Scrollen');
      if (shots) await page.screenshot({ path: `${shots}/${lang}-${vp.name}-intro.png`, fullPage: true });
      await page.click('.intro .btn-primary');
      await page.waitForTimeout(6500);
      if (!(await noHScroll(page))) throw new Error('Übung: horizontales Scrollen');
      if (shots) await page.screenshot({ path: `${shots}/${lang}-${vp.name}-run.png` });
      await page.waitForSelector('.result-card', { timeout: 90000 });
      const value = await page.textContent('.result-value');
      if (!value || !/\d/.test(value)) throw new Error(`Ergebnis ohne Zahl: "${value}"`);
      if (!(await noHScroll(page))) throw new Error('Ergebnis: horizontales Scrollen');
      if (shots) await page.screenshot({ path: `${shots}/${lang}-${vp.name}-result.png`, fullPage: true });
      if (errors.length) throw new Error(`Konsolenfehler: ${errors.join(' | ')}`);
      console.log(`✓ ${label}  →  ${value.replace(/\s+/g, ' ').trim()}`);
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
console.log('\nRot-Grün-Lesen ok.');
