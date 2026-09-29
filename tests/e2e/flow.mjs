// Ablauf-Test: Intro → Start → (Autoplay) → Ergebnis. Macht Screenshots unterwegs.
// Aufruf: node tests/e2e/flow.mjs <baseUrl> <outDir> <exerciseId> [shotTimesMs,...]
import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.argv[2] || 'http://localhost:4173/';
const out = process.argv[3] || 'shots';
const id = process.argv[4] || 'blitzreaktion';
const times = (process.argv[5] || '3500,6000').split(',').map(Number);
const vp = process.env.VP === 'port' ? { width: 820, height: 1180 } : process.env.VP === 'phone' ? { width: 390, height: 844 } : { width: 1180, height: 820 };
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: vp, hasTouch: true, locale: 'de-DE' });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
const q = process.env.NOQUICK ? '?autoplay=1' : '?quick=1&autoplay=1';
await page.goto(`${base}${q}#/uebung/${id}`, { waitUntil: 'networkidle' });
await page.click('.intro .btn-primary');
const t0 = Date.now();
for (const t of times) {
  const wait = t - (Date.now() - t0);
  if (wait > 0) await page.waitForTimeout(wait);
  await page.screenshot({ path: `${out}/${id}_run_${t}.png` });
  console.log('shot', `${id}_run_${t}.png`);
}
try {
  await page.waitForSelector('.result-card', { timeout: Number(process.env.RESULT_TIMEOUT || 90000) });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/${id}_result.png`, fullPage: true });
  console.log('result ok');
} catch (e) {
  errors.push('Kein Ergebnis-Bildschirm: ' + e.message.split('\n')[0]);
  await page.screenshot({ path: `${out}/${id}_timeout.png` });
}
await browser.close();
if (errors.length) { console.log('ERRORS:\n' + errors.join('\n')); process.exitCode = 1; }
