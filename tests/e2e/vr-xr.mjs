// WebXR-Durchlauf mit emulierter Brille (IWER): Sitzung starten, Controller auf Kugeln/Knöpfe richten, Abzug drücken.
import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.env.BASE ?? 'http://localhost:4173/';
const out = process.env.OUT ?? '/tmp/vr-shots';
fs.mkdirSync(out, { recursive: true });
const iwer = fs.readFileSync('node_modules/iwer/build/iwer.min.js', 'utf8');
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const errs = [];
const p = await (await b.newContext({ viewport: { width: 1400, height: 800 } })).newPage();
p.on('pageerror', (e) => errs.push('pageerror ' + e.message));
p.on('console', (m) => m.type() === 'error' && errs.push('console ' + m.text()));
await p.addInitScript(iwer);
await p.addInitScript(() => {
  const dev = new window.IWER.XRDevice(window.IWER.metaQuest2);
  dev.installRuntime({ forceInstall: true });
  dev.position.set(0.3, 1.4, 0.2);
  window.__dev = dev;
});
await p.goto(`${base}vr/?test=1&fast=8`, { waitUntil: 'networkidle' });
console.log('status:', await p.locator('#vr-status').innerText(), '| Knopf aktiv:', await p.locator('#vr-enter').isEnabled());
await p.screenshot({ path: `${out}/xr-0-landing.png` });
await p.click('#vr-enter');
await p.waitForFunction(() => window.__vr && window.__vr.debug().xr && window.__vr.debug().placed, null, { timeout: 15000 });
console.log('XR aktiv, Würfel platziert');
console.log('Augen:', JSON.stringify(await p.evaluate(() => { const d = window.__vr.debug(); return { eyes: d.eyes, abstand_m: +d.eyeSeparation.toFixed(3) }; })));
const dbg = () => p.evaluate(() => { const d = window.__vr.debug(); return { phase: d.phase, trial: d.trial, targets: d.targets, picks: d.picks, stereoOnly: d.stereoOnly }; });
const wait = (phase, to = 40000) => p.waitForFunction((ph) => window.__vr.debug().phase === ph, phase, { timeout: to });
// Controller auf einen Weltpunkt richten und Abzug drücken
const aimAndClick = async (pt) => {
  await p.evaluate(async (t) => {
    const c = window.__dev.controllers.right;
    const o = { x: 0.3 + 0.25, y: 1.4 - 0.25, z: 0.2 - 0.1 };
    c.position.set(o.x, o.y, o.z);
    const dx = t[0] - o.x, dy = t[1] - o.y, dz = t[2] - o.z;
    const l = Math.hypot(dx, dy, dz);
    // Quaternion, die -Z auf die Zielrichtung dreht
    const from = [0, 0, -1], to = [dx / l, dy / l, dz / l];
    const dot = from[0] * to[0] + from[1] * to[1] + from[2] * to[2];
    const ax = [from[1] * to[2] - from[2] * to[1], from[2] * to[0] - from[0] * to[2], from[0] * to[1] - from[1] * to[0]];
    const w = 1 + dot; const n = Math.hypot(ax[0], ax[1], ax[2], w) || 1;
    c.quaternion.set(ax[0] / n, ax[1] / n, ax[2] / n, w / n);
    await new Promise((r) => setTimeout(r, 120));
    c.updateButtonValue('trigger', 1);
    await new Promise((r) => setTimeout(r, 80));
    c.updateButtonValue('trigger', 0);
    await new Promise((r) => setTimeout(r, 80));
  }, pt);
};
await wait('menu');
await p.waitForTimeout(300);
await p.screenshot({ path: `${out}/xr-1-menu.png` });
console.log('Menü-Knöpfe:', JSON.stringify(await p.evaluate(() => ['start','stereo','recenter','exit'].map((i) => [i, !!window.__vr.debug().buttonWorld(i)]))));
await aimAndClick(await p.evaluate(() => window.__vr.debug().buttonWorld('start')));
await wait('cue');
await p.waitForTimeout(300);
await p.screenshot({ path: `${out}/xr-2-cue-stereo.png` });
for (let n = 0; n < 2; n++) {
  await wait('pick');
  if (n === 0) await p.screenshot({ path: `${out}/xr-3-pick.png` });
  const s = await dbg();
  for (const i of s.targets) await aimAndClick(await p.evaluate((k) => window.__vr.debug().ballWorld(k), i));
  await wait('feedback');
  const r = await p.evaluate(() => window.__vr.debug().results.at(-1));
  console.log('XR-Durchgang', n + 1, JSON.stringify(r));
}
console.log('Fehler:', errs.length ? errs : 'keine');
await b.close();
process.exit(errs.length ? 1 : 0);
