// EYE-EXPERIMENT: Testumgebung für die Blickschätzung (Phase 1). Reine Nutzerin der Tracker-API (tracker.ts);
// enthält kein Spiel. Alle Messungen laufen im Gerät, es wird nichts gesendet.
import { getSettings } from '../core/storage';
import { detectLang } from '../i18n/lang';
import {
  heatmapGrid,
  jitterStats,
  mean,
  median,
  screenGeometry,
  summarizeAccuracy,
  verdictFor,
  type AccuracySummary,
  type ScreenGeometry,
} from './accuracy';
import { CHECK_POINTS, isStale, type GazeModel } from './calibration';
import { buildExport } from './exportData';
import { cornerTarget, DwellDetector, QUADRANTS, quadrantOf, type DwellArrival } from './quadrants';
import { dominantQuadrant, makeSequence, QuadrantTestCounter, spreadStats, transitionTime, type PromptOutcome } from './quarterTest';
import { drawOverlay, Stage, viewportSize } from './stage';
import { loadSessionCalibration, loadSettings, saveSessionCalibration, saveSettings } from './store';
import { eyeTexts } from './texts';
import { EyeTracker, isAbort, sleep, type CameraResolution, type Delegate, type FrameInfo, type TimedGaze, type TrackerError } from './tracker';
import type { Pt, Quadrant } from './types';
import './eye.css';

const lang = detectLang(getSettings().lang);
const t = eyeTexts[lang];
const T = t.lab;
document.documentElement.lang = lang;
document.title = t.pageTitleLab;

const app = document.getElementById('eye-app');
if (!app) throw new Error('#eye-app fehlt');

const params = new URLSearchParams(location.search);
const testMode = params.get('test') === '1';
const delegateParam = params.get('delegate');
const settings = loadSettings();
const locale = lang === 'de' ? 'de-DE' : 'it-IT';
const num = (n: number | null | undefined, d = 0): string =>
  n === null || n === undefined || !Number.isFinite(n) ? '–' : n.toLocaleString(locale, { minimumFractionDigits: d, maximumFractionDigits: d });
const list = (xs: string[]) => `<ul>${xs.map((x) => `<li>${x}</li>`).join('')}</ul>`;
const other = lang === 'de' ? '<a href="?lang=it">IT</a>' : '<a href="?lang=de">DE</a>';

const startDelegate: Delegate = delegateParam === 'cpu' ? 'CPU' : delegateParam === 'gpu' ? 'GPU' : settings.delegate;

// Modelle/WASM liegen unter /eye-models/ (relativ zur Seite, funktioniert auch in Unterordnern)
const modelBase = new URL('../../eye-models/', location.href).href;
const tracker = new EyeTracker({ modelBase, viewport: viewportSize, delegate: startDelegate, smoothing: settings.smoothing, resolution: settings.resolution });

app.innerHTML = `
<header class="eye-head"><a href="../${lang === 'it' ? '?lang=it' : ''}">← ${t.backHome}</a><span class="eye-badge">${t.experiment}</span><span>${other}</span></header>
<main class="eye-main" id="main">
  <h1>${T.h1}</h1>
  <p class="eye-lead">${T.lead}</p>
  <div class="eye-banner" id="banner" role="status" hidden></div>
  <div class="eye-grid">
    <section class="eye-card" id="sec-start" aria-labelledby="h-start">
      <h2 id="h-start">${T.s1}</h2>
      <p>${T.s1Purpose}</p>
      ${list(T.s1Privacy)}
      ${list(T.s1Setup)}
      <label class="eye-check"><input type="checkbox" id="consent" /><span>${T.s1Consent}</span></label>
      <div class="eye-actions">
        <button type="button" class="eye-btn eye-btn-primary" id="btn-start" disabled>${T.s1Start}</button>
        ${testMode ? `<button type="button" class="eye-btn" id="btn-start-synth">${T.s1StartSynthetic}</button>` : ''}
      </div>
      <progress class="eye-progress" id="prog" max="100" value="0" hidden></progress>
      <p class="eye-status" id="status" role="status"></p>
      <div class="eye-error" id="error" role="alert" hidden></div>
    </section>

    <section class="eye-card" id="sec-live" aria-labelledby="h-live">
      <h2 id="h-live">${T.s2}</h2>
      <p class="eye-note">${T.s2Lead}</p>
      <div class="eye-live">
        <div class="eye-preview" id="preview"><div class="eye-preview-inner" id="preview-inner"><canvas id="overlay" width="640" height="480"></canvas></div><div class="eye-preview-empty" id="preview-empty">${T.s1Stopped}</div></div>
        <dl class="eye-metrics" id="metrics">
          <dt>${T.faceFound}</dt><dd id="m-face">–</dd>
          <dt>${T.camFps}</dt><dd id="m-cam">–</dd>
          <dt>${T.evalFps}</dt><dd id="m-eval">–</dd>
          <dt>${T.procTime}</dt><dd id="m-proc">–</dd>
          <dt>${T.headYaw}</dt><dd id="m-yaw">–</dd>
          <dt>${T.headPitch}</dt><dd id="m-pitch">–</dd>
          <dt>${T.distance}</dt><dd id="m-dist" title="${T.distanceNote}">–</dd>
          <dt>${T.resolution}</dt><dd id="m-res">–</dd>
          <dt>${T.engine}</dt><dd id="m-engine">–</dd>
        </dl>
      </div>
      <ul class="eye-tips" id="tips"></ul>
    </section>

    <section class="eye-card" id="sec-cal" aria-labelledby="h-cal">
      <h2 id="h-cal">${T.s3}</h2>
      <p>${T.s3Lead}</p>
      <div class="eye-actions"><button type="button" class="eye-btn eye-btn-primary" id="btn-cal" disabled>${T.s3Start}</button><button type="button" class="eye-btn" id="btn-cal-forget" disabled>${T.s3Forget}</button></div>
      <label class="eye-check"><input type="checkbox" id="cal-remember" /><span>${T.s3Remember}</span></label>
      <p class="eye-locked-hint" id="lock-cal"></p>
      <p id="cal-result" role="status"></p>
    </section>

    <section class="eye-card" id="sec-acc" aria-labelledby="h-acc">
      <h2 id="h-acc">${T.s4}</h2>
      <p>${T.s4Lead}</p>
      <div class="eye-field"><label for="distance" id="distance-label"></label><input type="range" id="distance" min="30" max="70" step="1" /></div>
      <div class="eye-field"><label for="inch">${T.s4Inch}</label><input type="number" id="inch" min="4" max="32" step="0.1" inputmode="decimal" placeholder="${T.s4InchHint}" /></div>
      <p class="eye-note" id="assumption"></p>
      <div class="eye-actions"><button type="button" class="eye-btn eye-btn-primary" id="btn-acc" disabled>${T.s4Start}</button></div>
      <p class="eye-locked-hint" id="lock-acc"></p>
      <div id="acc-result" role="status"></div>
      <h3>${T.s4Jitter}</h3>
      <p class="eye-note">${T.s4JitterHint}</p>
      <div class="eye-actions"><button type="button" class="eye-btn" id="btn-jit" disabled>${T.s4JitterStart}</button></div>
      <p id="jit-result" role="status"></p>
    </section>

    <section class="eye-card" id="sec-quarter" aria-labelledby="h-q">
      <h2 id="h-q">${T.s5}</h2>
      <p>${T.s5Lead}</p>
      <p><strong>${T.s5Disclaimer}</strong></p>
      <div class="eye-actions"><button type="button" class="eye-btn eye-btn-primary" id="btn-q" disabled>${T.s5Start}</button></div>
      <p class="eye-locked-hint" id="lock-q"></p>
      <div id="q-result" role="status"></div>
    </section>

    <section class="eye-card" id="sec-gaze" aria-labelledby="h-gaze">
      <h2 id="h-gaze">${T.s6}</h2>
      <p>${T.s6Lead}</p>
      <div class="eye-actions"><button type="button" class="eye-btn eye-btn-primary" id="btn-gaze" disabled>${T.s6Open}</button></div>
      <p class="eye-locked-hint" id="lock-gaze"></p>
    </section>

    <section class="eye-card" id="sec-switch" aria-labelledby="h-sw">
      <h2 id="h-sw">${T.s7}</h2>
      <p>${T.s7Lead}</p>
      <div class="eye-field"><label for="sw-pair">${T.s7Pair}</label><select id="sw-pair"><option value="H">${T.s7PairH}</option><option value="D">${T.s7PairD}</option><option value="V">${T.s7PairV}</option></select></div>
      <div class="eye-actions"><button type="button" class="eye-btn eye-btn-primary" id="btn-sw" disabled>${T.s7Start}</button></div>
      <p class="eye-locked-hint" id="lock-sw"></p>
      <div id="sw-result" role="status"></div>
    </section>

    <section class="eye-card" id="sec-export" aria-labelledby="h-ex">
      <h2 id="h-ex">${T.s8}</h2>
      <p>${T.s8Lead}</p>
      <div class="eye-actions"><button type="button" class="eye-btn eye-btn-primary" id="btn-copy">${T.s8Copy}</button></div>
      <p id="copy-status" role="status"></p>
      <details id="export-details"><summary>${T.s8Show}</summary><textarea class="eye-json" id="export-json" readonly></textarea></details>
    </section>

    <section class="eye-card" id="sec-camera" aria-labelledby="h-cam">
      <h2 id="h-cam">${T.s9}</h2>
      <div class="eye-field"><label for="cam-select">${T.s9Cameras}</label><select id="cam-select" disabled></select></div>
      <div class="eye-field"><label for="res-select">${T.s9Res}</label><select id="res-select"><option value="low">${T.s9ResLow}</option><option value="hd">${T.s9ResHd}</option><option value="fullhd">${T.s9ResFull}</option><option value="max">${T.s9ResMax}</option></select></div>
      <p class="eye-note">${T.s9ResHint}</p>
      <div class="eye-actions"><button type="button" class="eye-btn" id="btn-cam-switch" disabled>${T.s9Switch}</button></div>
      <p class="eye-note" id="cam-note"></p>
      <div class="eye-field"><label for="engine-select">${T.s9Engine}</label><select id="engine-select"><option value="auto">${T.s9EngineAuto}</option><option value="CPU">${T.s9EngineCpu}</option><option value="GPU">${T.s9EngineGpu}</option></select></div>
      <p class="eye-note">${T.s9EngineHint}</p>
      <div class="eye-actions"><button type="button" class="eye-btn" id="btn-stop" disabled>${T.s9Stop}</button></div>
    </section>
  </div>
  <p class="eye-foot">${T.legalFoot.join('<br />')}</p>
</main>`;

const $ = <E extends HTMLElement>(id: string): E => document.getElementById(id) as E;

// ---------- gemeinsamer Zustand ----------

interface LabState {
  /** aktueller Zielort in Fenster-Pixeln (für den Test-Hook, der synthetischen Blick darauf lenkt) */
  currentTarget: Pt | null;
  stage: string | null;
}
const lab: LabState = { currentTarget: null, stage: null };

interface Results {
  calibration: Record<string, unknown> | null;
  accuracy: (Record<string, unknown> & { summary?: AccuracySummary }) | null;
  jitter: Record<string, unknown> | null;
  quarterTest: Record<string, unknown> | null;
  switchTest: Record<string, unknown> | null;
}
const results: Results = { calibration: null, accuracy: null, jitter: null, quarterTest: null, switchTest: null };

let busy = false;
let latestFrame: FrameInfo | null = null;
let cameras: { deviceId: string; label: string }[] = [];
let synthetic = false;

const sel = <E extends HTMLElement>(s: string): E | null => app.querySelector<E>(s);

// ---------- Einstellungen: Abstand, Zoll, Annahmen ----------

const distanceEl = $<HTMLInputElement>('distance');
const inchEl = $<HTMLInputElement>('inch');
distanceEl.value = String(settings.distanceCm);
inchEl.value = settings.diagonalInch ? String(settings.diagonalInch) : '';

function geometry(): { geo: ScreenGeometry; distanceCm: number } {
  const inch = inchEl.value.trim() === '' ? null : Number(inchEl.value.replace(',', '.'));
  return { geo: screenGeometry(viewportSize(), inch), distanceCm: Number(distanceEl.value) || 45 };
}

function renderAssumption(): void {
  const { geo, distanceCm } = geometry();
  $('distance-label').textContent = T.s4Distance(distanceCm);
  const src = geo.source === 'diagonal-input' ? T.srcInput : geo.source === 'tablet-guess' ? T.srcGuessTablet : T.srcGuessPhone;
  $('assumption').textContent = T.s4Assumption(num(geo.diagonalInch, 1), src, distanceCm);
}
renderAssumption();
distanceEl.addEventListener('input', () => {
  renderAssumption();
  saveSettings({ distanceCm: Number(distanceEl.value) });
});
inchEl.addEventListener('input', () => {
  renderAssumption();
  const v = Number(inchEl.value.replace(',', '.'));
  saveSettings({ diagonalInch: inchEl.value.trim() && v > 3 && v < 40 ? v : null });
});
window.addEventListener('resize', () => {
  renderAssumption();
  updateLocks();
});

// ---------- Hinweisband und Sperren ----------

function updateBanner(): void {
  const b = $('banner');
  let msg = '';
  if (tracker.isRunning && tracker.status === 'no-face') msg = T.faceLost;
  else if (tracker.isCalibrated && tracker.isStale()) msg = T.stale;
  b.textContent = msg;
  b.hidden = !msg;
}

function updateLocks(): void {
  const run = tracker.isRunning;
  const cal = tracker.isCalibrated && !tracker.isStale();
  const ctrl = (id: string, on: boolean) => ($<HTMLButtonElement>(id).disabled = !on || busy);
  ctrl('btn-cal', run);
  ctrl('btn-cal-forget', tracker.isCalibrated);
  for (const id of ['btn-acc', 'btn-jit', 'btn-q', 'btn-gaze', 'btn-sw']) ctrl(id, cal);
  const hint = run ? (tracker.isCalibrated && tracker.isStale() ? T.stale : T.s4NeedCal) : T.needStart;
  $('lock-cal').textContent = run ? '' : T.needStart;
  for (const id of ['lock-acc', 'lock-q', 'lock-gaze', 'lock-sw']) $(id).textContent = cal ? '' : hint;
  ctrl('btn-stop', run);
  const multi = cameras.length > 1;
  $<HTMLSelectElement>('cam-select').disabled = !run || synthetic || !multi;
  $<HTMLButtonElement>('btn-cam-switch').disabled = !run || synthetic || busy;
  $('cam-note').textContent = run && !synthetic && !multi ? T.s9OneCamera : '';
  $<HTMLButtonElement>('btn-start').disabled = !$<HTMLInputElement>('consent').checked || run || busy;
  updateBanner();
}

tracker.onStatus((s) => {
  if (s === 'running' || s === 'no-face') updateBanner();
  else updateLocks();
});

// ---------- 1 · Einwilligung & Start ----------

const consentEl = $<HTMLInputElement>('consent');
consentEl.addEventListener('change', updateLocks);

function showError(e: TrackerError): void {
  const info = T.errors[e.code] ?? T.errors.unknown;
  const box = $('error');
  box.hidden = false;
  box.innerHTML = `<strong>${info.title}</strong><span>${info.help}</span><div class="eye-actions"><a class="eye-btn" href="../../${lang === 'it' ? '?lang=it' : ''}">${t.backNoCamera}</a></div>`;
  $('status').textContent = '';
  $<HTMLProgressElement>('prog').hidden = true;
}

async function startTracker(o: { synthetic?: boolean; deviceId?: string } = {}): Promise<void> {
  if (busy || tracker.isRunning) return;
  busy = true;
  synthetic = !!o.synthetic;
  $('error').hidden = true;
  const prog = $<HTMLProgressElement>('prog');
  prog.hidden = false;
  prog.value = 0;
  $('status').textContent = T.s1Starting;
  updateLocks();
  try {
    await tracker.start({
      ...o,
      onProgress: (p) => {
        if (p.phase === 'camera') {
          $('status').textContent = T.s1Camera;
          prog.value = 5 * p.ratio;
        } else if (p.phase === 'model') {
          $('status').textContent = T.s1Model(Math.round(p.ratio * 100));
          prog.value = 5 + 80 * p.ratio;
        } else {
          $('status').textContent = T.s1Engine;
          prog.value = 85 + 15 * p.ratio;
        }
      },
    });
  } catch (e) {
    busy = false;
    synthetic = false;
    showError(e as TrackerError);
    updateLocks();
    return;
  }
  busy = false;
  prog.hidden = true;
  $('status').textContent = T.s1Running;
  attachPreview();
  void refreshCameras();
  const stored = loadSessionCalibration();
  if (stored && !tracker.isCalibrated && !isStale(stored.viewport, viewportSize())) {
    tracker.setCalibration(stored);
    $('cal-result').textContent = T.s3Restored;
    $<HTMLInputElement>('cal-remember').checked = true;
  }
  updateLocks();
}

$('btn-start').addEventListener('click', () => void startTracker());
sel('#btn-start-synth')?.addEventListener('click', () => void startTracker({ synthetic: true }));

// ---------- 2 · Live-Ansicht ----------

function attachPreview(): void {
  const inner = $('preview-inner');
  const v = tracker.video;
  if (!synthetic && v.parentElement !== inner) {
    v.className = 'eye-video';
    inner.insertBefore(v, inner.firstChild);
  }
  $('preview-empty').hidden = !synthetic;
  if (synthetic) $('preview-empty').textContent = T.synthNote;
}

tracker.onFrame((f) => {
  latestFrame = f;
});

const overlay = $<HTMLCanvasElement>('overlay');
let drawnFrame: FrameInfo | null = null;
function drawLoop(): void {
  if (latestFrame !== drawnFrame && tracker.isRunning) {
    drawnFrame = latestFrame;
    drawOverlay(overlay, latestFrame);
  } else if (!tracker.isRunning && drawnFrame) {
    drawnFrame = null;
    drawOverlay(overlay, null);
  }
  requestAnimationFrame(drawLoop);
}
requestAnimationFrame(drawLoop);

function updateMetrics(): void {
  const run = tracker.isRunning;
  const st = tracker.stats();
  const m = run ? tracker.lastMetrics : null;
  const face = run && !!m && tracker.status !== 'no-face';
  $('m-face').textContent = run ? (face ? T.faceYes : T.faceNo) : '–';
  $('m-cam').textContent = run && !synthetic ? `${num(st.camFps, 0)} fps` : '–';
  $('m-eval').textContent = run ? `${num(st.evalFps, 0)} fps` : '–';
  $('m-proc').textContent = run && st.procMsMean > 0 ? `${num(st.procMsMean, 1)} / ${num(st.procMsMax, 1)} ms` : '–';
  $('m-yaw').textContent = face && m?.hasPose ? `${num(Math.abs(m.yawDeg), 0)}°` : '–';
  $('m-pitch').textContent = face && m?.hasPose ? `${num(Math.abs(m.pitchDeg), 0)}°` : '–';
  $('m-dist').textContent = face && m?.distanceCm ? `≈ ${num(Math.round(m.distanceCm / 5) * 5, 0)} cm` : '–';
  $('m-res').textContent = run && st.camera.width ? `${st.camera.width}×${st.camera.height}${st.camera.frameRateSetting ? ` @ ${num(st.camera.frameRateSetting, 0)}` : ''}` : '–';
  $('m-engine').textContent = !run ? '–' : st.delegate === 'GPU' ? T.engineGpu : st.delegate === 'CPU' ? T.engineCpu : st.delegate === 'synthetic' ? T.engineSynthetic : '–';
  const tips: string[] = [];
  if (run && !synthetic) {
    if (!face) tips.push(T.noFaceTip);
    const img = latestFrame?.image;
    if (face && img) {
      if (img.advice === 'dark') tips.push(T.brightnessDark);
      if (img.advice === 'bright') tips.push(T.brightnessBright);
      if (img.reflection) tips.push(T.reflectionTip);
    }
    if (face && m?.hasPose && (Math.abs(m.yawDeg) > 25 || Math.abs(m.pitchDeg) > 20)) tips.push(T.headTurnTip);
  }
  $('tips').innerHTML = tips.map((x) => `<li>${x}</li>`).join('');
}
setInterval(updateMetrics, 250);

// ---------- 9 · Kamera ----------

async function refreshCameras(): Promise<void> {
  if (synthetic) cameras = [];
  else cameras = await tracker.listCameras();
  const s = $<HTMLSelectElement>('cam-select');
  const cur = tracker.stats().camera.deviceId;
  s.innerHTML = cameras.map((c) => `<option value="${c.deviceId}"${c.deviceId === cur ? ' selected' : ''}>${c.label.replace(/</g, '&lt;')}</option>`).join('');
  updateLocks();
}

$('btn-cam-switch').addEventListener('click', async () => {
  const id = $<HTMLSelectElement>('cam-select').value || undefined;
  tracker.stop();
  tracker.setCalibration(null);
  saveSessionCalibration(null);
  $('cal-result').textContent = '';
  await startTracker({ deviceId: id });
});

const resEl = $<HTMLSelectElement>('res-select');
resEl.value = settings.resolution;
resEl.addEventListener('change', () => {
  tracker.opts.resolution = resEl.value as CameraResolution;
  saveSettings({ resolution: resEl.value as CameraResolution });
});

const engineEl = $<HTMLSelectElement>('engine-select');
engineEl.value = startDelegate;
engineEl.addEventListener('change', () => {
  tracker.opts.delegate = engineEl.value as Delegate;
  saveSettings({ delegate: engineEl.value as Delegate });
});

$('btn-stop').addEventListener('click', () => {
  tracker.stop();
  latestFrame = null;
  synthetic = false;
  cameras = [];
  $('status').textContent = T.s1Stopped;
  $('preview-empty').hidden = false;
  $('preview-empty').textContent = T.s9Stopped;
  updateLocks();
  updateMetrics();
});

// ---------- gemeinsame Hilfen für Bühnen ----------

/** Fußzeile der Bühne: Hinweis, bei Gesichtsverlust die Warnung. Gibt die Abmeldefunktion zurück. */
function stageFoot(stage: Stage, hint: string): () => void {
  const foot = stage.add(document.createElement('div'));
  foot.className = 'eye-stage-foot';
  const render = () => (foot.textContent = tracker.isRunning && tracker.status === 'no-face' ? T.faceLost : hint);
  render();
  return tracker.onStatus(render);
}

function beginStage(name: string, theme: 'light' | 'dark', label: string, ctrl: AbortController): Stage {
  busy = true;
  lab.stage = name;
  updateLocks();
  return new Stage({ theme, cancelLabel: T.cancel, ariaLabel: label, onCancel: () => ctrl.abort() });
}

function endStage(stage: Stage): void {
  stage.close();
  lab.currentTarget = null;
  lab.stage = null;
  busy = false;
  updateLocks();
}

// ---------- 3 · Kalibrierung ----------

const rememberEl = $<HTMLInputElement>('cal-remember');
rememberEl.addEventListener('change', () => saveSessionCalibration(rememberEl.checked ? tracker.calibration : null));

async function runCalibration(): Promise<void> {
  if (busy || !tracker.isRunning) return;
  const ctrl = new AbortController();
  const stage = beginStage('calibration', 'light', T.s3, ctrl);
  const dot = stage.dot();
  const bar = stage.add(document.createElement('div'));
  bar.className = 'eye-bar';
  const offFoot = stageFoot(stage, T.s3Hint);
  const out = await tracker.calibrate({
    viewport: stage.size(),
    signal: ctrl.signal,
    onPoint: (p) => {
      if (p.phase === 'start') {
        Stage.place(dot, p.target);
        lab.currentTarget = p.target;
        stage.setTitle(T.s3Running(p.index + 1, p.total));
        bar.style.width = `${(p.index / p.total) * 100}%`;
      } else {
        bar.style.width = `${((p.index + 1) / p.total) * 100}%`;
      }
    },
  });
  offFoot();
  endStage(stage);
  const res = $('cal-result');
  if (!out.ok) {
    res.textContent = T.calFail[out.reason] ?? T.calFail.numeric;
    results.calibration = { ok: false, reason: out.reason };
    updateLocks();
    return;
  }
  const m = out.model;
  const loo = `${num(m.loo.meanPx, 0)} px`;
  res.textContent = `${T.s3Done} ${T.s3Result(loo, m.specId, out.pointsUsed, 9)}`;
  results.calibration = {
    ok: true,
    model: m.specId,
    degree: m.degree,
    lambda: m.ridge.lambda,
    pointsUsed: out.pointsUsed,
    viewport: m.viewport,
    looMeanPx: m.loo.meanPx,
    looMedianPx: m.loo.medianPx,
    looMaxPx: m.loo.maxPx,
    at: new Date(m.createdAt).toISOString(),
  };
  saveSettings({ lastCalibration: { at: m.createdAt, looMeanPx: m.loo.meanPx, viewport: m.viewport, model: m.specId } });
  if (rememberEl.checked) saveSessionCalibration(m);
  updateLocks();
}

$('btn-cal').addEventListener('click', () => void runCalibration());
$('btn-cal-forget').addEventListener('click', () => {
  tracker.setCalibration(null);
  saveSessionCalibration(null);
  results.calibration = null;
  $('cal-result').textContent = '';
  updateLocks();
});

// ---------- 4 · Genauigkeitsprüfung und Jitter ----------

function verdictChip(v: 'good' | 'ok' | 'poor'): string {
  return `<span class="eye-chip${v === 'ok' ? ' eye-chip-ok' : v === 'poor' ? ' eye-chip-poor' : ''}">${T.s4Verdict[v]}</span>`;
}

async function runAccuracy(): Promise<void> {
  if (busy || !tracker.isCalibrated) return;
  const ctrl = new AbortController();
  const stage = beginStage('accuracy', 'light', T.s4, ctrl);
  const dot = stage.dot('eye-dot-small');
  const offFoot = stageFoot(stage, T.s3Hint);
  const vp = stage.size();
  const cols = await tracker.collectGaze(CHECK_POINTS, {
    viewport: vp,
    signal: ctrl.signal,
    onPoint: (p) => {
      if (p.phase === 'start') {
        Stage.place(dot, p.target);
        lab.currentTarget = p.target;
        stage.setTitle(T.s4Running(p.index + 1, p.total));
      }
    },
  });
  offFoot();
  endStage(stage);
  if (!cols) return;
  const { geo, distanceCm } = geometry();
  const summary = summarizeAccuracy(
    cols.map((c) => ({ target: c.target, samples: c.samples.map((s) => ({ x: s.x, y: s.y })) })),
    geo,
    distanceCm,
  );
  if (!summary.n) {
    $('acc-result').textContent = T.faceLost;
    return;
  }
  const verdict = verdictFor(summary.meanPx, summary.p95Px, vp);
  const grid = heatmapGrid(summary.perPoint, vp, 3, 3);
  const ref = Math.min(vp.w, vp.h) / 4;
  const cells = grid
    .flat()
    .map((c) => {
      if (c.meanPx === null) return '<div class="eye-heat-cell">–</div>';
      const p = Math.round(Math.min(1, c.meanPx / (ref * 1.6)) * 100);
      const dark = p > 55;
      return `<div class="eye-heat-cell" style="background: color-mix(in srgb, #b45309 ${p}%, #e7f3d3); color: ${dark ? '#fff' : '#0f172a'}">${num(c.meanPx, 0)}</div>`;
    })
    .join('');
  const bias = mean(summary.perPoint.map((p) => p.biasPx).filter(Number.isFinite));
  const spread = mean(summary.perPoint.map((p) => p.spreadPx).filter(Number.isFinite));
  $('acc-result').innerHTML = `
    <table class="eye-table"><thead><tr><th>${T.colMetric}</th><th>${T.colPx}</th><th>${T.colDeg}</th></tr></thead><tbody>
      <tr><td>${T.s4Mean}</td><td>${num(summary.meanPx, 0)} px</td><td>${num(summary.meanDeg, 1)}°</td></tr>
      <tr><td>${T.s4Median}</td><td>${num(summary.medianPx, 0)} px</td><td>${num(summary.medianDeg, 1)}°</td></tr>
      <tr><td>${T.s4P95}</td><td>${num(summary.p95Px, 0)} px</td><td>${num(summary.p95Deg, 1)}°</td></tr>
    </tbody></table>
    <p>${verdictChip(verdict)}</p>
    <p class="eye-note">${T.s4VerdictNote}</p>
    <p class="eye-note">${T.s4BiasSpread(`${num(bias, 0)} px`, `${num(spread, 0)} px`)}</p>
    <h3>${T.s4Heat}</h3><div class="eye-heat" id="acc-heat">${cells}</div><p class="eye-note">${T.s4HeatNote}</p>`;
  results.accuracy = {
    at: new Date().toISOString(),
    n: summary.n,
    meanPx: summary.meanPx,
    medianPx: summary.medianPx,
    p95Px: summary.p95Px,
    meanDeg: summary.meanDeg,
    medianDeg: summary.medianDeg,
    p95Deg: summary.p95Deg,
    verdict,
    viewport: vp,
    distanceCm,
    diagonalInch: geo.diagonalInch,
    screenSource: geo.source,
    perPoint: summary.perPoint.map((p) => ({ target: p.target, n: p.n, biasPx: p.biasPx, spreadPx: p.spreadPx, meanPx: p.meanPx })),
    gridMeanPx: grid.map((r) => r.map((c) => c.meanPx)),
    summary,
  };
}

async function runJitter(): Promise<void> {
  if (busy || !tracker.isCalibrated) return;
  const ctrl = new AbortController();
  const stage = beginStage('jitter', 'light', T.s4Jitter, ctrl);
  const dot = stage.dot('eye-dot-small');
  const offFoot = stageFoot(stage, T.s4JitterHint);
  const vp = stage.size();
  const cols = await tracker.collectGaze([{ x: 0.5, y: 0.5 }], {
    viewport: vp,
    signal: ctrl.signal,
    settleMs: 600,
    collectMs: 5000,
    onPoint: (p) => {
      Stage.place(dot, p.target);
      lab.currentTarget = p.target;
      stage.setTitle(T.s4JitterStart);
    },
  });
  offFoot();
  endStage(stage);
  if (!cols || !cols[0].samples.length) return;
  const { geo, distanceCm } = geometry();
  const j = jitterStats(
    cols[0].samples.map((s) => ({ x: s.x, y: s.y })),
    geo,
    distanceCm,
  );
  $('jit-result').textContent = T.s4JitterResult(`${num(j.sdPx, 1)} px`, `${num(j.sdDeg, 2)}°`, `${num(j.sdXPx, 1)} px`, `${num(j.sdYPx, 1)} px`, j.n);
  results.jitter = { at: new Date().toISOString(), ...j, distanceCm, smoothing: tracker.opts.smoothing };
}

$('btn-acc').addEventListener('click', () => void runAccuracy());
$('btn-jit').addEventListener('click', () => void runJitter());

// ---------- 5 · Viertel-Test ----------

const PROMPTS = 20;
const PROMPT_TIMEOUT_MS = 3000;

async function runQuarterTest(): Promise<void> {
  if (busy || !tracker.isCalibrated) return;
  const ctrl = new AbortController();
  const stage = beginStage('quarter', 'light', T.s5, ctrl);
  const vp = stage.size();
  const tints = {} as Record<Quadrant, HTMLDivElement>;
  const corners = {} as Record<Quadrant, HTMLDivElement>;
  for (const q of QUADRANTS) {
    const tint = stage.add(document.createElement('div'));
    tint.className = 'eye-q';
    tint.style.left = q === 'tl' || q === 'bl' ? '0' : '50%';
    tint.style.top = q === 'tl' || q === 'tr' ? '0' : '50%';
    tints[q] = tint;
    const c = stage.add(document.createElement('div'));
    c.className = 'eye-corner';
    c.innerHTML = '<span></span>';
    Stage.place(c, cornerTarget(q, vp, 0.1));
    corners[q] = c;
  }
  const center = stage.add(document.createElement('div'));
  center.className = 'eye-stage-center';
  const detEl = document.createElement('div');
  const subEl = document.createElement('div');
  subEl.className = 'eye-stage-sub';
  center.append(detEl, subEl);
  const setDetected = (q: Quadrant | null) => {
    detEl.textContent = q ? T.s5Detected(T.quadrant[q]) : T.s5DetectedNone;
    for (const k of QUADRANTS) tints[k].classList.toggle('is-on', k === q);
  };
  setDetected(null);
  const seq = makeSequence(PROMPTS, Math.random);
  const counter = new QuadrantTestCounter();
  let aborted = false;
  try {
    for (let i = 0; i < seq.length; i++) {
      const target = seq[i];
      stage.setTitle(T.s5Prompt(i + 1, seq.length));
      lab.currentTarget = cornerTarget(target, vp, 0.1);
      corners[target].classList.add('is-active');
      const tCue = performance.now();
      const dwell = new DwellDetector(target);
      const qs: (Quadrant | null)[] = [];
      let arrival: DwellArrival | null = null;
      const off = tracker.onGaze((g) => {
        if (g.t < tCue) return; // Bild stammt aus der Zeit vor der Aufforderung
        qs.push(g.quadrant);
        setDetected(g.quadrant);
        const r = dwell.push(g.t, g.quadrant);
        if (r && !arrival) arrival = r;
      });
      let active = 0;
      try {
        while (!arrival && active < PROMPT_TIMEOUT_MS) {
          await sleep(50, ctrl.signal);
          if (tracker.status === 'no-face') subEl.textContent = T.s5NoFace;
          else {
            subEl.textContent = '';
            active += 50;
          }
        }
        if (arrival) await sleep(300, ctrl.signal);
      } finally {
        off();
      }
      const a = arrival as DwellArrival | null;
      const outcome: PromptOutcome = { target, hit: !!a, arrivalMs: a ? Math.max(0, a.arrivedAt - tCue) : null, dominant: dominantQuadrant(qs) };
      counter.add(outcome);
      corners[target].classList.remove('is-active');
      lab.currentTarget = null;
      await sleep(700, ctrl.signal);
    }
  } catch (e) {
    if (!isAbort(e)) throw e;
    aborted = true;
  }
  endStage(stage);
  if (aborted) return;
  const s = counter.summary();
  const rows = QUADRANTS.map((q) => {
    const c = s.perCorner[q];
    return `<tr><td>${T.quadrant[q]}</td><td>${c.hits} / ${c.n}</td><td>${num(c.rate * 100, 0)} %</td><td>${c.meanArrivalMs === null ? '–' : `${num(c.meanArrivalMs, 0)} ms`}</td></tr>`;
  }).join('');
  const conf = QUADRANTS.map((q) => `<tr><td>${T.quadrant[q]}</td>${QUADRANTS.map((k) => `<td>${s.confusion[q][k]}</td>`).join('')}<td>${s.confusion[q].none}</td></tr>`).join('');
  $('q-result').innerHTML = `
    <p><strong>${T.s5Total(s.total.hits, s.total.n)}</strong> (${num(s.total.rate * 100, 0)} %)</p>
    <table class="eye-table" id="q-table"><thead><tr><th>${T.s5ColCorner}</th><th>${T.s5ColHits}</th><th>%</th><th>${T.s5ColArrival}</th></tr></thead><tbody>${rows}</tbody></table>
    <h3>${T.s5Confusion}</h3>
    <table class="eye-table"><thead><tr><th></th>${QUADRANTS.map((q) => `<th>${T.quadrant[q]}</th>`).join('')}<th>–</th></tr></thead><tbody>${conf}</tbody></table>
    <p class="eye-note">${T.s5ConfusionNote}</p><p class="eye-note">${T.s5Disclaimer}</p>`;
  results.quarterTest = { at: new Date().toISOString(), prompts: s.total.n, hits: s.total.hits, hitRate: s.total.rate, perCorner: s.perCorner, confusion: s.confusion, dwellMs: 150, timeoutMs: PROMPT_TIMEOUT_MS };
}
$('btn-q').addEventListener('click', () => void runQuarterTest());

// ---------- 6 · Blickpunkt-Ansicht ----------

async function runGazeView(): Promise<void> {
  if (busy || !tracker.isCalibrated) return;
  const ctrl = new AbortController();
  const stage = beginStage('gaze', 'dark', T.s6, ctrl);
  stage.setTitle(T.s6);
  const canvas = stage.add(document.createElement('canvas'));
  canvas.className = 'eye-gaze-canvas';
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const vp = stage.size();
  canvas.width = Math.round(vp.w * dpr);
  canvas.height = Math.round(vp.h * dpr);
  const ctx = canvas.getContext('2d');
  const foot = stage.add(document.createElement('div'));
  foot.className = 'eye-stage-foot';
  foot.innerHTML = `<label for="gv-smooth"><strong>${T.s6Smooth}</strong>: <span id="gv-less">${T.s6Less}</span> – <span id="gv-more">${T.s6More}</span></label><input type="range" id="gv-smooth" min="0" max="100" step="1" /><div class="eye-stage-sub">${T.s6SmoothHint}</div><div class="eye-stage-sub" id="gv-face"></div>`;
  const slider = foot.querySelector<HTMLInputElement>('#gv-smooth') as HTMLInputElement;
  slider.value = String(Math.round(tracker.opts.smoothing * 100));
  slider.addEventListener('input', () => {
    tracker.setSmoothing(Number(slider.value) / 100);
    saveSettings({ smoothing: Number(slider.value) / 100 });
  });
  const trail: { t: number; x: number; y: number }[] = [];
  const off = tracker.onGaze((g) => {
    trail.push({ t: g.t, x: g.x, y: g.y });
    while (trail.length && g.t - trail[0].t > 2000) trail.shift();
  });
  let raf = 0;
  const draw = () => {
    if (!ctx) return;
    const now = performance.now();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, vp.w, vp.h);
    ctx.strokeStyle = 'rgba(148,163,184,0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(vp.w / 2, 0);
    ctx.lineTo(vp.w / 2, vp.h);
    ctx.moveTo(0, vp.h / 2);
    ctx.lineTo(vp.w, vp.h / 2);
    ctx.stroke();
    while (trail.length && now - trail[0].t > 2300) trail.shift();
    for (let i = 1; i < trail.length; i++) {
      const age = (now - trail[i].t) / 2000;
      const a = Math.max(0, 1 - age);
      ctx.strokeStyle = `rgba(121,172,43,${0.8 * a})`;
      ctx.lineWidth = 2 + 4 * a;
      ctx.beginPath();
      ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
      ctx.lineTo(trail[i].x, trail[i].y);
      ctx.stroke();
    }
    const last = trail[trail.length - 1];
    const faceEl = foot.querySelector('#gv-face');
    if (faceEl) faceEl.textContent = tracker.status === 'no-face' ? T.faceLost : '';
    if (last && now - last.t < 600) {
      ctx.fillStyle = '#ffb300';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(last.x, last.y, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    raf = requestAnimationFrame(draw);
  };
  raf = requestAnimationFrame(draw);
  await new Promise<void>((resolve) => ctrl.signal.addEventListener('abort', () => resolve(), { once: true }));
  cancelAnimationFrame(raf);
  off();
  endStage(stage);
}
$('btn-gaze').addEventListener('click', () => void runGazeView());

// ---------- 7 · Zeitverhalten ----------

const SWITCHES = 12;
const HOLD_MS = 2200;
const PAIRS: Record<string, [Quadrant, Quadrant]> = { H: ['tl', 'tr'], D: ['tl', 'br'], V: ['tl', 'bl'] };

async function runSwitchTest(): Promise<void> {
  if (busy || !tracker.isCalibrated) return;
  const pairId = $<HTMLSelectElement>('sw-pair').value in PAIRS ? $<HTMLSelectElement>('sw-pair').value : 'H';
  const pair = PAIRS[pairId];
  const ctrl = new AbortController();
  const stage = beginStage('switch', 'light', T.s7, ctrl);
  const vp = stage.size();
  const corners = {} as Record<Quadrant, HTMLDivElement>;
  for (const q of pair) {
    const c = stage.add(document.createElement('div'));
    c.className = 'eye-corner';
    c.innerHTML = '<span></span>';
    Stage.place(c, cornerTarget(q, vp, 0.1));
    corners[q] = c;
  }
  const posA = cornerTarget(pair[0], vp, 0.1);
  const posB = cornerTarget(pair[1], vp, 0.1);
  const holds: { q: Quadrant; tCue: number; samples: TimedGaze[] }[] = [];
  let cur: (typeof holds)[number] | null = null;
  const off = tracker.onGaze((g) => {
    if (cur && g.t >= cur.tCue) cur.samples.push({ t: g.t, x: g.x, y: g.y });
  });
  let aborted = false;
  try {
    for (let k = 0; k <= SWITCHES; k++) {
      const q = pair[k % 2];
      for (const o of pair) corners[o].classList.toggle('is-active', o === q);
      lab.currentTarget = q === pair[0] ? posA : posB;
      stage.setTitle(k === 0 ? T.s7Switch(0, SWITCHES) : T.s7Switch(k, SWITCHES));
      cur = { q, tCue: performance.now(), samples: [] };
      holds.push(cur);
      await sleep(HOLD_MS, ctrl.signal);
    }
  } catch (e) {
    if (!isAbort(e)) throw e;
    aborted = true;
  } finally {
    off();
  }
  endStage(stage);
  if (aborted) return;
  const tail = (h: (typeof holds)[number], ms: number) => h.samples.filter((s) => s.t >= h.tCue + HOLD_MS - ms);
  const med = (ss: TimedGaze[]): Pt | null => (ss.length >= 3 ? { x: median(ss.map((s) => s.x)), y: median(ss.map((s) => s.y)) } : null);
  const sep = Math.hypot(posB.x - posA.x, posB.y - posA.y);
  const trans: number[] = [];
  const arrivals: number[] = [];
  for (let k = 1; k < holds.length; k++) {
    const prev = holds[k - 1];
    const h = holds[k];
    const from = med(tail(prev, 700));
    const to = med(tail(h, 700));
    const dw = new DwellDetector(h.q);
    let arr: DwellArrival | null = null;
    for (const s of h.samples) {
      const r = dw.push(s.t, quadrantOf(s, vp));
      if (r) {
        arr = r;
        break;
      }
    }
    if (arr) arrivals.push(Math.max(0, arr.arrivedAt - h.tCue));
    if (!from || !to || Math.hypot(to.x - from.x, to.y - from.y) < 0.35 * sep) continue;
    const ctx = [...tail(prev, 300), ...h.samples];
    const r = transitionTime(ctx, from, to);
    if (r) trans.push(r.durationMs);
  }
  const st = tracker.stats();
  const frameMs = st.evalFps > 0 ? 1000 / st.evalFps : NaN;
  const tr = spreadStats(trans);
  const ar = spreadStats(arrivals);
  const line = (s: ReturnType<typeof spreadStats>) => (s.n ? `${num(s.mean, 0)} ms ± ${num(s.sd, 0)} (${T.medianWord} ${num(s.median, 0)} ms; ${num(s.min, 0)}–${num(s.max, 0)} ms)` : '–');
  $('sw-result').innerHTML = `
    <h3>${T.s7Result}</h3>
    <table class="eye-table"><tbody>
      <tr><td>${T.s7Transition}</td><td id="sw-trans">${line(tr)}</td></tr>
      <tr><td>${T.s7Arrival}</td><td>${line(ar)}</td></tr>
    </tbody></table>
    <p class="eye-note">${T.s7Valid(tr.n, SWITCHES)}. ${T.s7Frame(num(frameMs, 0))}</p>
    <p class="eye-note">${T.s7Note}</p>`;
  results.switchTest = {
    at: new Date().toISOString(),
    pair: pairId,
    switches: SWITCHES,
    holdMs: HOLD_MS,
    transitionMs: tr,
    arrivalMs: ar,
    frameIntervalMs: frameMs,
    smoothing: tracker.opts.smoothing,
    note: 'Eigenschaft der Schätzung (Bildrate + Glättung), keine Messung der Augenbewegung; Ankunft enthält die Reaktionszeit der Person',
  };
}
$('btn-sw').addEventListener('click', () => void runSwitchTest());

// ---------- 8 · Export ----------

function collectExport(): Record<string, unknown> {
  const st = tracker.stats();
  const { geo, distanceCm } = geometry();
  const cal: GazeModel | null = tracker.calibration;
  const acc = results.accuracy ? { ...results.accuracy } : null;
  if (acc) delete acc.summary;
  const scr = window.screen;
  return buildExport({
    generatedAt: new Date().toISOString(),
    device: {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      devicePixelRatio: window.devicePixelRatio,
      screen: { w: scr?.width ?? null, h: scr?.height ?? null },
      window: viewportSize(),
      orientation: scr?.orientation?.type ?? null,
      maxTouchPoints: navigator.maxTouchPoints,
    },
    camera: {
      label: st.camera.label,
      width: st.camera.width,
      height: st.camera.height,
      frameRateSetting: st.camera.frameRateSetting,
      cameraCount: cameras.length,
      engine: st.delegate,
      engineSetting: tracker.opts.delegate,
      synthetic,
    },
    assumptions: { distanceCm, diagonalInch: geo.diagonalInch, screenSource: geo.source, mmPerPx: geo.mmPerPx, smoothing: tracker.opts.smoothing },
    timing: { camFps: st.camFps, evalFps: st.evalFps, procMsMean: st.procMsMean, procMsMax: st.procMsMax, frames: st.frames },
    calibration: cal
      ? {
          model: cal.specId,
          degree: cal.degree,
          lambda: cal.ridge.lambda,
          pointsUsed: cal.nPoints,
          viewport: cal.viewport,
          looMeanPx: cal.loo.meanPx,
          looMedianPx: cal.loo.medianPx,
          looMaxPx: cal.loo.maxPx,
          ageSeconds: Math.round((Date.now() - cal.createdAt) / 1000),
          stale: tracker.isStale(),
        }
      : null,
    accuracy: acc,
    jitter: results.jitter,
    quarterTest: results.quarterTest,
    switchTest: results.switchTest,
  });
}

$('btn-copy').addEventListener('click', async () => {
  const json = JSON.stringify(collectExport(), null, 2);
  const ta = $<HTMLTextAreaElement>('export-json');
  ta.value = json;
  const status = $('copy-status');
  try {
    await navigator.clipboard.writeText(json);
    status.textContent = T.s8Copied;
  } catch {
    $<HTMLDetailsElement>('export-details').open = true;
    ta.focus();
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    status.textContent = ok ? T.s8Copied : T.s8CopyFailed;
  }
});

// ---------- Test-Hook (?test=1): synthetische Blickpunkte, nur für automatische Tests ----------

if (testMode) {
  const hook = {
    tracker,
    lab,
    results,
    /** wahrer Blickpunkt in Fenster-Pixeln (oder null = kein Gesicht) */
    truth: null as Pt | null,
    gone: false,
    startSynthetic: () => startTracker({ synthetic: true }),
    /**
     * Lässt den synthetischen Blick dem aktuellen Ziel (lab.currentTarget) folgen: mit Reaktionsverzögerung und Rauschen in Pixeln.
     * Ohne Ziel schaut der „Blick“ in die Mitte. Rückgabe: Funktion zum Beenden.
     */
    follow: (o: { noisePx?: number; reactionMs?: number; biasPx?: Pt } = {}) => {
      const noise = o.noisePx ?? 12;
      const reaction = o.reactionMs ?? 200;
      const hist: { t: number; p: Pt }[] = [];
      const gauss = () => Math.sqrt(-2 * Math.log(Math.max(1e-9, Math.random()))) * Math.cos(2 * Math.PI * Math.random());
      const id = setInterval(() => {
        const vp = viewportSize();
        const now = performance.now();
        hist.push({ t: now, p: lab.currentTarget ?? { x: vp.w / 2, y: vp.h / 2 } });
        while (hist.length > 2 && hist[1].t <= now - reaction) hist.shift();
      }, 10);
      tracker.setSyntheticTruth(() => {
        if (hook.gone) return null;
        const vp = viewportSize();
        const p = hook.truth ?? hist[0]?.p ?? { x: vp.w / 2, y: vp.h / 2 };
        return { x: (p.x + (o.biasPx?.x ?? 0) + noise * gauss()) / vp.w, y: (p.y + (o.biasPx?.y ?? 0) + noise * gauss()) / vp.h };
      });
      return () => {
        clearInterval(id);
        tracker.setSyntheticTruth(null);
      };
    },
    /** Gesicht „verschwinden“ lassen (true) oder zurückholen (false) */
    faceGone: (gone: boolean) => {
      hook.gone = gone;
    },
    busy: () => busy,
  };
  (window as unknown as { __eye: typeof hook }).__eye = hook;
}

updateLocks();
updateMetrics();
