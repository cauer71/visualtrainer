// EYE-EXPERIMENT: End-to-End-Test der Testumgebung /eye/labor/ mit Fake-Kamera und synthetischem Blick (?test=1).
//
// Voraussetzung: gebaute Seite (npx vite build --outDir /tmp/dist-eye). Der Test startet selbst einen kleinen Server, der
// public/_headers wie Cloudflare anwendet (tests/e2e/eye-server.mjs) – also mit den echten Produktions-Headern (CSP, Kamera-Policy).
//   DIST=/tmp/dist-eye OUT=/tmp/eye-shots node tests/e2e/eye-labor.mjs
//   BASE=http://127.0.0.1:8787/ …            gegen einen anderen Server (z. B. wrangler dev)
//   EYE_FAKE_VIDEO=/pfad/gesicht.y4m …        zusätzlich Gesichtserkennung mit einem Video, das ein Gesicht zeigt (nicht im Repo)
//   VP=tablet-quer,tablet-hoch,handy …        nur diese Fenstergrößen
//
// Prüft: Header, Seite lädt ohne Konsolen-/CSP-Fehler, Modell+WASM über 'self', Kamerafreigabe, „kein Gesicht“, Fehlerfälle,
// Kamera beenden, dann mit synthetischem Blick: Kalibrierung, Genauigkeit, Jitter, Viertel-Test, Blickpunkt-Ansicht,
// Zeittest, Export, veraltete Kalibrierung bei Drehung. Screenshots in OUT (Tablet quer 1180×820, hoch 820×1180, Handy 390×844).
import fs from 'node:fs';
import { chromium } from 'playwright';
import { startEyeServer } from './eye-server.mjs';

const dist = process.env.DIST ?? 'dist';
const out = process.env.OUT ?? '/tmp/eye-shots';
const fakeVideo = process.env.EYE_FAKE_VIDEO;
fs.mkdirSync(out, { recursive: true });

let server = null;
let base = process.env.BASE;
if (!base) {
  const s = await startEyeServer({ dir: dist, headersFile: 'public/_headers' });
  server = s.server;
  base = `http://127.0.0.1:${s.port}/`;
}

const viewports = [
  { name: 'tablet-quer', width: 1180, height: 820, full: true },
  { name: 'tablet-hoch', width: 820, height: 1180, full: true },
  { name: 'handy', width: 390, height: 844, full: false },
];
const only = process.env.VP ? process.env.VP.split(',') : null;

const failures = [];
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? ' – ' + detail : ''}`);
  if (!ok) failures.push(name + (detail ? ': ' + detail : ''));
};

// MediaPipe schreibt Info-/Warnmeldungen über console.error; die zählen nicht als Fehler.
const harmless = /^INFO:|XNNPACK|GL Driver|GroupMarkerNotSet|Graph successfully|face_landmarker_graph|gl_context|inference_feedback|Created TensorFlow/;

async function newPage(browser, vp, label) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, permissions: ['camera'] });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push('pageerror ' + e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' && !harmless.test(m.text())) errs.push('console ' + m.text());
  });
  page.on('requestfailed', (r) => errs.push('requestfailed ' + r.url()));
  await page.addInitScript(() => {
    window.__csp = [];
    document.addEventListener('securitypolicyviolation', (e) => window.__csp.push(`${e.violatedDirective} ${e.blockedURI}`));
  });
  page.__errs = errs;
  page.__label = label;
  return page;
}

async function finish(page, what) {
  const csp = await page.evaluate(() => window.__csp).catch(() => []);
  check(`${page.__label}: keine CSP-Verletzung (${what})`, csp.length === 0, csp.join('; '));
  check(`${page.__label}: keine Konsolen-/Seitenfehler (${what})`, page.__errs.length === 0, page.__errs.join(' | '));
  page.__errs.length = 0;
}

const shot = (page, name, full = false) => page.screenshot({ path: `${out}/${page.__label}-${name}.png`, fullPage: full });
const overflowX = (page) => page.evaluate(() => document.scrollingElement.scrollWidth - window.innerWidth);

// ---------- A: Header ----------
{
  const get = async (p) => (await fetch(base + p, { headers: { 'sec-fetch-mode': 'navigate' }, redirect: 'manual' })).headers;
  const main = await get('');
  const lab = await get('eye/labor/');
  const home = await get('eye/');
  const vr = await get('vr/');
  const wasm = await fetch(base + 'eye-models/vision_wasm_internal.wasm', { method: 'HEAD' });
  const task = await fetch(base + 'eye-models/face_landmarker.task', { method: 'HEAD' });
  const csp = lab.get('content-security-policy') ?? '';
  check('Header: Hauptseite behält camera=() und strenge CSP', main.get('permissions-policy')?.startsWith('camera=()') && !(main.get('content-security-policy') ?? '').includes('wasm-unsafe-eval'));
  check('Header: /vr/ unverändert streng', vr.get('permissions-policy')?.startsWith('camera=()'));
  check('Header: /eye/labor/ camera=(self)', lab.get('permissions-policy')?.startsWith('camera=(self)'), lab.get('permissions-policy') ?? '');
  check('Header: /eye/ camera=(self)', home.get('permissions-policy')?.startsWith('camera=(self)'));
  check('Header: genau eine CSP auf /eye/labor/ (global abgelöst)', !csp.includes(','), csp);
  for (const part of ["script-src 'self' 'wasm-unsafe-eval'", "worker-src 'self' blob:", "connect-src 'self' blob: data:", "media-src 'self' blob:"]) check(`Header: CSP enthält ${part}`, csp.includes(part));
  check('Header: kein unsafe-eval', !csp.includes("'unsafe-eval'"));
  check('MIME: .wasm = application/wasm', wasm.headers.get('content-type') === 'application/wasm', wasm.headers.get('content-type') ?? '');
  check('Modell erreichbar (200)', task.status === 200 && Number(task.headers.get('content-length') ?? 3758596) > 3_000_000);
}

const camArgs = ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'];
if (fakeVideo) camArgs.push(`--use-file-for-fake-video-capture=${fakeVideo}`);
const browser = await chromium.launch({ args: camArgs });

// ---------- B: Startseite /eye/ ----------
for (const lang of ['de', 'it']) {
  const page = await newPage(browser, viewports[0], `home-${lang}`);
  await page.goto(`${base}eye/?lang=${lang}`, { waitUntil: 'networkidle' });
  const link = await page.locator('#eye-lab-link').getAttribute('href');
  check(`Startseite ${lang}: Link zur Testumgebung`, !!link && link.startsWith('labor/'), link ?? '');
  check(`Startseite ${lang}: Spiel-Platzhalter nicht klickbar`, (await page.locator('#eye-game-soon').getAttribute('aria-disabled')) === 'true' && (await page.locator('#eye-game-soon').evaluate((e) => e.tagName)) === 'SPAN');
  check(`Startseite ${lang}: kein Seitenüberlauf`, (await overflowX(page)) <= 1);
  await shot(page, 'start', true);
  await finish(page, 'Startseite');
  await page.context().close();
}

// ---------- C: echte (Fake-)Kamera, echtes Modell ----------
{
  const page = await newPage(browser, viewports[0], 'kamera');
  const models = [];
  page.on('request', (r) => r.url().includes('/eye-models/') && models.push(new URL(r.url()).pathname));
  await page.goto(`${base}eye/labor/?test=1&delegate=cpu`, { waitUntil: 'networkidle' });
  check('Kamera: Start-Knopf gesperrt ohne Einwilligung', await page.locator('#btn-start').isDisabled());
  await page.check('#consent');
  check('Kamera: Start-Knopf frei nach Einwilligung', await page.locator('#btn-start').isEnabled());
  check('Kamera: vor dem Start wurde nichts vom Modell geladen (Einwilligung zuerst)', models.length === 0, models.join(','));
  await page.click('#btn-start');
  await page.waitForFunction(() => window.__eye.tracker.isRunning || !document.querySelector('#error').hidden, null, { timeout: 120000 });
  check('Kamera: läuft ohne Fehler', await page.evaluate(() => window.__eye.tracker.isRunning), await page.locator('#error').innerText());
  check('Kamera: Modell und WASM kamen von /eye-models/ (self)', models.some((m) => m.endsWith('face_landmarker.task')) && models.some((m) => m.endsWith('vision_wasm_internal.wasm')), models.join(','));
  await page.waitForTimeout(3000);
  const st = await page.evaluate(() => window.__eye.tracker.stats());
  check('Kamera: Bildrate und Auflösung werden gemessen', st.camFps > 5 && st.camera.width === 640, `${st.camFps.toFixed(1)} fps, ${st.camera.width}×${st.camera.height}`);
  check('Kamera: Auswertung über CPU (?delegate=cpu)', st.delegate === 'CPU');
  if (!fakeVideo) {
    check('Kamera: Testbild ohne Gesicht → „Gesicht erkannt: nein“ und Hinweis', (await page.locator('#m-face').innerText()) === 'nein' && (await page.locator('#tips').innerText()).includes('Kein Gesicht'));
    check('Kamera: Status „no-face“ und Hinweisband', (await page.evaluate(() => window.__eye.tracker.status)) === 'no-face' && (await page.locator('#banner').isVisible()));
  } else {
    check('Kamera: Gesicht erkannt (Video mit Gesicht)', (await page.locator('#m-face').innerText()) === 'ja');
    const m = await page.evaluate(() => {
      const f = window.__eye.tracker.lastMetrics;
      return f && { feat: f.features, dist: f.distanceCm, ipd: f.ipdPx, pose: f.hasPose, open: f.eyeOpen };
    });
    check('Kamera: Merkmale und Kopfhaltung vorhanden', !!m && m.pose && m.feat.every(Number.isFinite), JSON.stringify(m));
    check('Kamera: Abstand plausibel (30–120 cm)', !!m && m.dist > 30 && m.dist < 120, String(m?.dist));
    // Overlay enthält Pixel
    const painted = await page.evaluate(() => {
      const c = document.getElementById('overlay');
      const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
      let n = 0;
      for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++;
      return n;
    });
    check('Kamera: Overlay (Gesichtsrahmen, Augen, Iris) wird gezeichnet', painted > 200, String(painted));
    // Standbild: Kalibrierung muss „keine Augenbewegung“ melden
    await page.click('#btn-cal');
    await page.waitForFunction(() => window.__eye.results.calibration, null, { timeout: 40000 });
    check('Kamera: Kalibrierung mit Standbild → „keine Augenbewegung erkannt“', (await page.locator('#cal-result').innerText()).includes('keine Augenbewegung'), await page.locator('#cal-result').innerText());
  }
  await shot(page, 'live', true);
  const tracksBefore = await page.evaluate(() => window.__eye.tracker.video.srcObject?.getTracks().map((t) => t.readyState));
  await page.click('#btn-stop');
  const after = await page.evaluate(() => ({ src: window.__eye.tracker.video.srcObject, status: window.__eye.tracker.status, running: window.__eye.tracker.isRunning }));
  check('Kamera beenden: Videostrom wirklich gestoppt', tracksBefore?.includes('live') && after.src === null && after.status === 'stopped' && !after.running, JSON.stringify({ tracksBefore, after }));
  check('Kamera beenden: Messbereiche wieder gesperrt', await page.locator('#btn-cal').isDisabled());
  await finish(page, 'echte Kamera');
  await page.context().close();
}

// ---------- D: Fehlerfälle (Kamera verweigert / nicht vorhanden) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1180, height: 820 }, permissions: ['camera'] });
  const page = await ctx.newPage();
  page.__label = 'verweigert';
  page.__errs = [];
  // Nutzerin lehnt die Kamera-Anfrage ab
  await page.addInitScript(() => {
    navigator.mediaDevices.getUserMedia = () => Promise.reject(new DOMException('Permission denied', 'NotAllowedError'));
  });
  await page.goto(`${base}eye/labor/?test=1`, { waitUntil: 'networkidle' });
  await page.check('#consent');
  await page.click('#btn-start');
  await page.waitForFunction(() => !document.querySelector('#error').hidden, null, { timeout: 30000 });
  const txt = await page.locator('#error').innerText();
  check('Fehler: verweigerte Kamera wird freundlich erklärt, mit Rückweg ohne Kamera', txt.includes('Kamera nicht erlaubt') && txt.includes('Zurück zu den Übungen ohne Kamera'), txt.replace(/\n/g, ' | '));
  check('Fehler: Rückweg-Link führt zur Hauptseite', (await page.locator('#error a').getAttribute('href')).startsWith('../../'));
  check('Fehler: Start danach wieder möglich', await page.locator('#btn-start').isEnabled());
  check('Fehler: Messbereiche bleiben gesperrt', await page.locator('#btn-cal').isDisabled());
  await shot(page, 'fehler');
  await ctx.close();
  const b3 = await chromium.launch(); // gar keine Kamera
  const ctx3 = await b3.newContext({ viewport: { width: 1180, height: 820 }, permissions: ['camera'] });
  const p3 = await ctx3.newPage();
  await p3.goto(`${base}eye/labor/?test=1&lang=it`, { waitUntil: 'networkidle' });
  await p3.check('#consent');
  await p3.click('#btn-start');
  await p3.waitForFunction(() => !document.querySelector('#error').hidden, null, { timeout: 30000 });
  const t3 = await p3.locator('#error').innerText();
  check('Fehler (IT): keine Kamera → verständlicher Text und Rückweg', /Nessuna fotocamera|non consentita|occupata/.test(t3) && t3.includes('Torna agli esercizi senza fotocamera'), t3.replace(/\n/g, ' | '));
  await b3.close();
}

// ---------- E: synthetischer Blick, alle Bereiche ----------
async function waitStage(page, name, timeout = 30000) {
  await page.waitForFunction((n) => window.__eye.lab.stage === n, name, { timeout });
}
async function waitIdle(page, timeout = 120000) {
  await page.waitForFunction(() => window.__eye.lab.stage === null && !window.__eye.busy(), null, { timeout });
}

for (const vp of viewports.filter((v) => !only || only.includes(v.name))) {
  const page = await newPage(browser, vp, vp.name);
  await page.goto(`${base}eye/labor/?test=1`, { waitUntil: 'networkidle' });
  check(`${vp.name}: kein Seitenüberlauf`, (await overflowX(page)) <= 1, String(await overflowX(page)));
  await shot(page, '01-start', true);
  await page.evaluate(() => window.__eye.startSynthetic());
  await page.waitForFunction(() => window.__eye.tracker.isRunning);
  await page.evaluate(() => window.__eye.follow({ noisePx: 12, reactionMs: 200 }));
  await page.waitForTimeout(600);
  check(`${vp.name}: Messbereiche vor der Kalibrierung gesperrt`, (await page.locator('#btn-acc').isDisabled()) && (await page.locator('#btn-q').isDisabled()) && (await page.locator('#btn-cal').isEnabled()));
  check(`${vp.name}: Testmodus zeigt Gesicht erkannt`, (await page.locator('#m-face').innerText()) === 'ja');
  await shot(page, '02-laeuft', true);

  // Kalibrierung
  await page.click('#btn-cal');
  await waitStage(page, 'calibration');
  await page.waitForFunction(() => document.querySelector('.eye-stage-title')?.textContent?.includes('4'), null, { timeout: 15000 });
  await page.waitForTimeout(500);
  await shot(page, '03-kalibrierung');
  check(`${vp.name}: Kalibrierpunkt liegt im Fenster`, await page.evaluate(() => {
    const t = window.__eye.lab.currentTarget;
    return t && t.x > 0 && t.x < innerWidth && t.y > 0 && t.y < innerHeight;
  }));
  await waitIdle(page);
  const cal = await page.evaluate(() => window.__eye.results.calibration);
  check(`${vp.name}: Kalibrierung erfolgreich (9 Punkte)`, cal?.ok && cal.pointsUsed === 9, JSON.stringify(cal));
  check(`${vp.name}: Leave-one-out-Fehler klein (< 40 px)`, cal?.ok && cal.looMeanPx < 40, String(cal?.looMeanPx));
  check(`${vp.name}: Messbereiche nach Kalibrierung frei`, await page.locator('#btn-acc').isEnabled());

  // Stage abbrechen: Esc
  await page.click('#btn-cal');
  await waitStage(page, 'calibration');
  await page.keyboard.press('Escape');
  await waitIdle(page);
  check(`${vp.name}: Kalibrierung per Esc abbrechbar, alte Kalibrierung bleibt`, (await page.evaluate(() => window.__eye.tracker.isCalibrated)) && (await page.locator('#cal-result').innerText()).includes('abgebrochen'));
  await page.evaluate(() => window.__eye.tracker.setCalibration(null));
  // erneut sauber kalibrieren
  await page.click('#btn-cal');
  await waitStage(page, 'calibration');
  await waitIdle(page);
  check(`${vp.name}: erneut kalibrierbar`, await page.evaluate(() => window.__eye.tracker.isCalibrated));
  await shot(page, '04-kalibriert', true);

  if (vp.full) {
    // Genauigkeit
    await page.fill('#inch', '10.9');
    await page.click('#btn-acc');
    await waitStage(page, 'accuracy');
    await page.waitForFunction(() => document.querySelector('.eye-stage-title')?.textContent?.includes('3'), null, { timeout: 20000 });
    await shot(page, '05-genauigkeit-lauf');
    await waitIdle(page);
    const acc = await page.evaluate(() => {
      const a = window.__eye.results.accuracy;
      return a && { n: a.n, meanPx: a.meanPx, p95Px: a.p95Px, meanDeg: a.meanDeg, verdict: a.verdict, grid: a.gridMeanPx, src: a.screenSource };
    });
    check(`${vp.name}: Genauigkeit gemessen (mittlere Abw. < 40 px, gut)`, acc && acc.meanPx < 40 && acc.verdict === 'good' && acc.n > 100, JSON.stringify(acc));
    check(`${vp.name}: Heatmap 3×3 mit 9 Feldern`, (await page.locator('#acc-heat .eye-heat-cell').count()) === 9 && acc.grid.flat().every((v) => v !== null));
    check(`${vp.name}: Zoll-Eingabe wird als Eingabe gekennzeichnet`, acc.src === 'diagonal-input' && (await page.locator('#assumption').innerText()).includes('Ihre Eingabe'));
    await page.locator('#acc-result').scrollIntoViewIfNeeded();
    await shot(page, '06-genauigkeit-ergebnis');

    // Jitter
    await page.click('#btn-jit');
    await waitStage(page, 'jitter');
    await waitIdle(page);
    const jit = await page.evaluate(() => window.__eye.results.jitter);
    check(`${vp.name}: Jitter gemessen (≈ 150 Bilder, Streuung < 30 px)`, jit && jit.n > 100 && jit.sdPx < 30, JSON.stringify(jit));

    // Viertel-Test
    await page.click('#btn-q');
    await waitStage(page, 'quarter');
    await page.waitForFunction(() => document.querySelector('.eye-stage-center')?.textContent?.includes('erkannt: oben') || document.querySelector('.eye-stage-center')?.textContent?.includes('erkannt: unten'), null, { timeout: 20000 });
    await page.waitForTimeout(400);
    await shot(page, '07-viertel-lauf');
    // Gesicht kurz weg → Test wartet, Hinweis
    await page.evaluate(() => window.__eye.faceGone(true));
    await page.waitForFunction(() => document.querySelector('.eye-stage-center')?.textContent?.includes('Kein Gesicht'), null, { timeout: 8000 });
    check(`${vp.name}: Viertel-Test: Gesichtsverlust → Hinweis und Wartezustand`, true);
    await shot(page, '08-viertel-kein-gesicht');
    await page.evaluate(() => window.__eye.faceGone(false));
    await waitIdle(page, 180000);
    const q = await page.evaluate(() => window.__eye.results.quarterTest);
    check(`${vp.name}: Viertel-Test: 20 Aufforderungen, ≥ 18 Treffer`, q && q.prompts === 20 && q.hits >= 18, JSON.stringify(q && { n: q.prompts, hits: q.hits }));
    check(`${vp.name}: Viertel-Test: je Ecke 5 Aufforderungen`, q && ['tl', 'tr', 'bl', 'br'].every((k) => q.perCorner[k].n === 5));
    check(`${vp.name}: Viertel-Test: Ankunftszeit plausibel (100–1500 ms)`, q && ['tl', 'tr', 'bl', 'br'].every((k) => q.perCorner[k].meanArrivalMs > 100 && q.perCorner[k].meanArrivalMs < 1500), JSON.stringify(q && Object.values(q.perCorner).map((c) => c.meanArrivalMs)));
    await page.locator('#q-result').scrollIntoViewIfNeeded();
    await shot(page, '09-viertel-ergebnis');

    // Blickpunkt-Ansicht
    await page.click('#btn-gaze');
    await waitStage(page, 'gaze');
    await page.waitForTimeout(1500);
    await shot(page, '10-blickpunkt');
    const before = await page.evaluate(() => window.__eye.tracker.opts.smoothing);
    await page.locator('#gv-smooth').fill('90');
    check(`${vp.name}: Glättungsregler wirkt auf den Tracker`, (await page.evaluate(() => window.__eye.tracker.opts.smoothing)) !== before && (await page.evaluate(() => window.__eye.tracker.opts.smoothing)) > 0.85);
    await page.locator('#gv-smooth').fill('50');
    await page.click('.eye-stage-cancel');
    await waitIdle(page);

    // Zeittest
    await page.selectOption('#sw-pair', 'D');
    await page.click('#btn-sw');
    await waitStage(page, 'switch');
    await page.waitForTimeout(2600);
    await shot(page, '11-zeittest-lauf');
    await waitIdle(page, 120000);
    const sw = await page.evaluate(() => window.__eye.results.switchTest);
    check(`${vp.name}: Zeittest: ≥ 8 von 12 Wechseln auswertbar`, sw && sw.transitionMs.n >= 8, JSON.stringify(sw?.transitionMs));
    check(`${vp.name}: Zeittest: Übergangszeit plausibel (20–800 ms)`, sw && sw.transitionMs.mean > 20 && sw.transitionMs.mean < 800, String(sw?.transitionMs?.mean));
    await page.locator('#sw-result').scrollIntoViewIfNeeded();
    await shot(page, '12-zeittest-ergebnis');

    // Export
    await page.evaluate(() => navigator.clipboard.writeText('').catch(() => {}));
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.click('#btn-copy');
    await page.waitForFunction(() => document.getElementById('copy-status').textContent.length > 0);
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    let ex = null;
    try {
      ex = JSON.parse(clip);
    } catch {
      /* unten geprüft */
    }
    check(`${vp.name}: Export: JSON in der Zwischenablage mit Gerät, Kamera, Kalibrierung, Genauigkeit, Viertel, Zeittest`, !!ex && ex.schema === 'blickfit-eye-labor/1' && ex.device.userAgent && ex.device.window.w === vp.width && ex.calibration?.model && ex.accuracy?.meanPx > 0 && ex.quarterTest?.hits >= 0 && ex.switchTest?.transitionMs, clip.slice(0, 200));
    check(`${vp.name}: Export enthält Annahmen und Verarbeitungszeiten`, !!ex && ex.assumptions.distanceCm === 45 && ex.timing && 'procMsMean' in ex.timing && !JSON.stringify(ex).includes('deviceId'));
  }

  // Drehung → Kalibrierung veraltet
  await page.setViewportSize({ width: vp.height, height: vp.width });
  await page.waitForFunction(() => window.__eye.tracker.isStale());
  await page.waitForTimeout(100);
  check(`${vp.name}: nach Drehung: Hinweisband „neu kalibrieren“, Messknöpfe gesperrt`, (await page.locator('#banner').isVisible()) && (await page.locator('#banner').innerText()).includes('neu kalibrieren') && (await page.locator('#btn-q').isDisabled()));
  await shot(page, '13-gedreht-veraltet');
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.waitForFunction(() => !window.__eye.tracker.isStale());
  await page.waitForFunction(() => !document.getElementById('btn-cal-forget').disabled && !document.getElementById('banner').offsetParent, null, { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(150);
  check(`${vp.name}: zurückgedreht: Hinweisband weg, Messknöpfe wieder frei`, !(await page.locator('#banner').isVisible()) && (await page.locator('#btn-q').isEnabled()));

  // Sitzungs-Merken
  await page.check('#cal-remember');
  const stored = await page.evaluate(() => sessionStorage.getItem('blickfit.eye:v1:calibration'));
  check(`${vp.name}: „für diese Sitzung merken“ legt Kalibrierung in sessionStorage ab`, !!stored && JSON.parse(stored).version === 1);

  check(`${vp.name}: am Ende kein Seitenüberlauf`, (await overflowX(page)) <= 1);
  await finish(page, 'synthetischer Durchlauf');
  await page.context().close();
}

await browser.close();
server?.close();
console.log(failures.length ? `\n${failures.length} Fehler:\n- ${failures.join('\n- ')}` : '\nalle Prüfungen bestanden');
process.exit(failures.length ? 1 : 0);
