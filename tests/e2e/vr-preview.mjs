// Flache Vorschau des VR-Labors: ganzer Durchlauf mit Zeitraffer (?fast=8), Klicks auf echte Bildschirmpositionen.
import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.env.BASE ?? 'http://localhost:4173/';
const out = process.env.OUT ?? '/tmp/vr-shots';
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const errs = [];
const p = await (await b.newContext({ viewport: { width: 1180, height: 900 } })).newPage();
p.on('pageerror', (e) => errs.push('pageerror ' + e.message));
p.on('console', (m) => m.type() === 'error' && errs.push('console ' + m.text()));
await p.goto(`${base}vr/?test=1&fast=8`, { waitUntil: 'networkidle' });
await p.screenshot({ path: `${out}/1-landing.png`, fullPage: true });
console.log('xr status:', await p.locator('#vr-status').innerText());
await p.click('#vr-preview');
await p.waitForFunction(() => window.__vr);
const st = () => p.evaluate(() => { const d = window.__vr.debug(); return { phase: d.phase, trial: d.trial, level: d.level, picks: d.picks, targets: d.targets, panel: d.panelVisible }; });
const wait = (phase, to = 30000) => p.waitForFunction((ph) => window.__vr.debug().phase === ph, phase, { timeout: to });
await p.mouse.move(300, 300);
await wait('menu');
await p.waitForTimeout(300);
await p.screenshot({ path: `${out}/2-menu.png` });
const clickBtn = async (id) => { const pt = await p.evaluate((i) => window.__vr.debug().buttonScreen(i), id); await p.mouse.move(pt.x, pt.y); await p.waitForTimeout(80); await p.mouse.click(pt.x, pt.y); };
await clickBtn('start');
await wait('cue');
await p.waitForTimeout(200);
await p.screenshot({ path: `${out}/3-cue.png` });
let shot = 0;
for (let n = 0; n < 10; n++) {
  await wait('pick');
  if (n === 0) { await p.waitForTimeout(150); await p.screenshot({ path: `${out}/4-pick.png` }); }
  const s = await st();
  // Trial 3 absichtlich falsch: zwei Nicht-Ziele + zwei Ziele wählen
  const all = [0, 1, 2, 3, 4, 5, 6, 7];
  let choose = s.targets;
  if (n === 2) choose = [s.targets[0], s.targets[1], ...all.filter((i) => !s.targets.includes(i)).slice(0, 2)];
  for (const i of choose) {
    const pt = await p.evaluate((k) => window.__vr.debug().ballScreen(k), i);
    await p.mouse.move(pt.x, pt.y); await p.waitForTimeout(60); await p.mouse.click(pt.x, pt.y);
    await p.waitForTimeout(60);
  }
  await wait('feedback');
  if (n === 2 && !shot++) await p.screenshot({ path: `${out}/5-feedback-wrong.png` });
  const r = await p.evaluate(() => window.__vr.debug().results.at(-1));
  console.log('Durchgang', n + 1, JSON.stringify(r));
}
await wait('summary', 40000);
await p.waitForTimeout(300);
await p.screenshot({ path: `${out}/6-summary.png` });
const d = await p.evaluate(() => { const x = window.__vr.debug(); return { trial: x.trial, results: x.results }; });
console.log('Durchgänge:', d.trial, 'perfekt:', d.results.filter((r) => r.perfect).length, 'Stufen:', d.results.map((r) => r.level).join(','));
await clickBtn('exit');
await p.waitForTimeout(300);
console.log('Bühne nach Beenden versteckt:', await p.locator('#vr-stage').isHidden());
console.log('Fehler:', errs.length ? errs : 'keine');
await b.close();
process.exit(errs.length ? 1 : 0);
