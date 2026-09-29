// Screenshots für die visuelle Prüfung (Tablet quer/hoch, Handy).
// Aufruf: node tests/e2e/shots.mjs <baseUrl> <outDir> [route ...]
import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.argv[2] || 'http://localhost:4173/';
const out = process.argv[3] || 'shots';
const routes = process.argv.slice(4);
fs.mkdirSync(out, { recursive: true });

const viewports = {
  land: { width: 1180, height: 820 },
  port: { width: 820, height: 1180 },
  phone: { width: 390, height: 844 },
};
const which = (process.env.VP || 'land').split(',');

const browser = await chromium.launch();
const errors = [];
for (const vpName of which) {
  const ctx = await browser.newContext({ viewport: viewports[vpName], deviceScaleFactor: 1, hasTouch: true, isMobile: vpName === 'phone', locale: 'de-DE' });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`${vpName} console: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`${vpName} pageerror: ${e.message}`));
  for (const r of routes.length ? routes : ['#/']) {
    const [hash, waitMs = '1500', fullPage = '1'] = r.split('|');
    await page.goto(base + hash, { waitUntil: 'networkidle' });
    await page.waitForTimeout(Number(waitMs));
    const name = `${vpName}_${hash.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'home'}_${waitMs}.png`;
    await page.screenshot({ path: `${out}/${name}`, fullPage: fullPage === '1' });
    console.log('shot', name);
  }
  await ctx.close();
}
await browser.close();
if (errors.length) { console.log('ERRORS:\n' + errors.join('\n')); process.exitCode = 1; }
