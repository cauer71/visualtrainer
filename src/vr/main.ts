import { getSettings } from '../core/storage';
import { detectLang } from '../i18n/lang';
import { Game } from './game';
import { vrTexts } from './texts';
import './vr.css';

const lang = detectLang(getSettings().lang);
const t = vrTexts[lang];
document.documentElement.lang = lang;
document.title = t.pageTitle;

const app = document.getElementById('vr-app');
if (!app) throw new Error('#vr-app fehlt');

const list = (xs: string[]) => `<ul>${xs.map((x) => `<li>${x}</li>`).join('')}</ul>`;

app.innerHTML = `
<header class="vr-head"><a class="vr-back" href="../">← ${t.back}</a>
  <span class="vr-lang">${lang === 'de' ? '<a href="?lang=it">IT</a>' : '<a href="?lang=de">DE</a>'}</span></header>
<main class="vr-main" id="main">
  <h1>${t.h1}</h1>
  <p class="vr-lead">${t.lead}</p>
  <section class="vr-card vr-start" aria-labelledby="vr-status">
    <p id="vr-status" class="vr-status" role="status">${t.checking}</p>
    <div class="vr-actions">
      <button id="vr-enter" class="vr-btn vr-btn-primary" disabled>${t.enterVr}</button>
      <button id="vr-preview" class="vr-btn">${t.preview}</button>
    </div>
    <p class="vr-hint">${t.previewHint}</p>
  </section>
  <div id="vr-stage" class="vr-stage" hidden>
    <div id="vr-host" class="vr-host"></div>
    <button id="vr-stop" class="vr-btn vr-stop">${t.stopPreview}</button>
  </div>
  <section class="vr-card"><h2>${t.howTitle}</h2>${list(t.how)}</section>
  <section class="vr-card vr-warn"><h2>${t.safetyTitle}</h2>${list(t.safety)}</section>
  <section class="vr-card"><h2>${t.deviceTitle}</h2>${list([t.deviceQuest, t.deviceRift, t.deviceOther])}</section>
  <section class="vr-card"><h2>${t.backgroundTitle}</h2>${list(t.background)}</section>
  <section class="vr-card"><h2>${t.limitsTitle}</h2>${list(t.limits)}</section>
</main>`;

const $ = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;
const status = $('vr-status');
const enterBtn = $<HTMLButtonElement>('vr-enter');
const previewBtn = $<HTMLButtonElement>('vr-preview');
const stage = $('vr-stage');
const host = $('vr-host');
const stopBtn = $('vr-stop');

const params = new URLSearchParams(location.search);
const fast = Math.min(10, Math.max(1, Number(params.get('fast')) || 1));

let game: Game | null = null;

function closeGame(): void {
  if (!game) return;
  const g = game;
  game = null;
  g.dispose();
  stage.hidden = true;
  (window as unknown as { __vr?: Game }).__vr = undefined;
}

function makeGame(): Game {
  closeGame();
  const g = new Game({ host, t, timeScale: fast, onExit: closeGame });
  game = g;
  if (params.get('test') === '1') (window as unknown as { __vr?: Game }).__vr = g;
  return g;
}

async function detect(): Promise<void> {
  const xr = (navigator as Navigator & { xr?: XRSystem }).xr;
  if (!window.isSecureContext) {
    status.textContent = t.xrNeedsHttps;
    return;
  }
  if (!xr) {
    status.textContent = t.xrNoApi;
    return;
  }
  try {
    const ok = await xr.isSessionSupported('immersive-vr');
    status.textContent = ok ? t.xrYes : t.xrNo;
    enterBtn.disabled = !ok;
  } catch {
    status.textContent = t.xrNo;
  }
}

enterBtn.addEventListener('click', () => {
  const g = makeGame();
  g.enterVR().catch((e: unknown) => {
    closeGame();
    status.textContent = `${t.xrNo} (${e instanceof Error ? e.message : String(e)})`;
  });
});

previewBtn.addEventListener('click', () => {
  stage.hidden = false;
  const g = makeGame();
  g.startPreview();
  stage.scrollIntoView({ block: 'center' });
});

stopBtn.addEventListener('click', closeGame);

void detect();
