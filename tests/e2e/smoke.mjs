// Rundum-Test: jede Übung im Schnell-/Autoplay-Modus komplett durchspielen.
// Prüft: Intro-Film läuft (Canvas nicht leer), Übung endet mit Ergebnis, keine Konsolenfehler.
//
// Aufruf: npm run build && npx vite preview --port 4173 &  →  node tests/e2e/smoke.mjs [baseUrl]
import { chromium } from 'playwright';

const base = process.argv[2] || 'http://localhost:4173/';
const viewports = [
  { name: 'tablet-quer', width: 1180, height: 820 },
  { name: 'tablet-hoch', width: 820, height: 1180 },
  { name: 'handy', width: 390, height: 844 },
];
const onlyVp = process.env.VP ? viewports.filter((v) => process.env.VP.split(',').includes(v.name)) : viewports;

const browser = await chromium.launch();
const failures = [];

async function canvasHasContent(page, selector) {
  return page.evaluate((sel) => {
    const c = document.querySelector(sel);
    if (!c) return false;
    const w = c.width;
    const h = c.height;
    if (!w || !h) return false;
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

// IDs aus der Startseite lesen
const ctx0 = await browser.newContext({ viewport: { width: 1180, height: 820 } });
const p0 = await ctx0.newPage();
await p0.goto(base + '?quick=1', { waitUntil: 'networkidle' }); // ?quick → Optiker-Ansicht: alle Übungen
const ids = await p0.$$eval('a.ex-card', (as) => as.map((a) => a.getAttribute('href').split('/').pop()));
await ctx0.close();
console.log(`Übungen: ${ids.join(', ')}`);

for (const vp of onlyVp) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, hasTouch: true, locale: 'de-DE' });
  for (const id of ids) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    page.on('pageerror', (e) => errors.push(e.message));
    const label = `${vp.name}/${id}`;
    try {
      await page.goto(`${base}?quick=1&autoplay=1#/uebung/${id}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1800);
      if (!(await canvasHasContent(page, '.demo-stage canvas'))) throw new Error('Intro-Film zeigt nichts');
      await page.click('.intro .btn-primary');
      await page.waitForSelector('.result-card', { timeout: 60000 });
      const value = await page.textContent('.result-value');
      if (!value || !/\d/.test(value)) throw new Error(`Ergebnis ohne Zahl: "${value}"`);
      if (errors.length) throw new Error(`Konsolenfehler: ${errors.join(' | ')}`);
      console.log(`✓ ${label}  →  ${value.replace(/\s+/g, ' ').trim()}`);
    } catch (e) {
      failures.push(`${label}: ${e.message.split('\n')[0]}`);
      console.log(`✗ ${label}: ${e.message.split('\n')[0]}`);
    }
    await page.close();
  }
  await ctx.close();
}

await browser.close();
if (failures.length) {
  console.log(`\n${failures.length} Fehler:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log('\nAlle Übungen ok.');
