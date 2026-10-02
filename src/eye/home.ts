// EYE-EXPERIMENT: Startseite des Experiments (/eye/): Erklärung, Link zur Testumgebung, Platzhalter für das Spiel (Phase 2).
import { getSettings } from '../core/storage';
import { detectLang } from '../i18n/lang';
import { eyeTexts } from './texts';
import './eye.css';

const lang = detectLang(getSettings().lang);
const t = eyeTexts[lang];
const H = t.home;
document.documentElement.lang = lang;
document.title = t.pageTitleHome;

const app = document.getElementById('eye-app');
if (!app) throw new Error('#eye-app fehlt');

const list = (xs: string[]) => `<ul>${xs.map((x) => `<li>${x}</li>`).join('')}</ul>`;
const other = lang === 'de' ? '<a href="?lang=it">IT</a>' : '<a href="?lang=de">DE</a>';
const langQ = new URLSearchParams(location.search).get('lang');
const q = langQ === 'de' || langQ === 'it' ? `?lang=${langQ}` : '';

app.innerHTML = `
<header class="eye-head"><a href="../">← ${t.backApp}</a><span class="eye-badge">${t.experiment}</span><span>${other}</span></header>
<main class="eye-main eye-main-narrow" id="main">
  <h1>${H.h1}</h1>
  <p class="eye-lead">${H.lead}</p>
  <div class="eye-home-cards">
    <section class="eye-card" aria-labelledby="eye-lab-h">
      <h2 id="eye-lab-h">${H.labTitle}</h2>
      <p>${H.labText}</p>
      <div class="eye-actions"><a class="eye-btn eye-btn-primary" id="eye-lab-link" href="labor/${q}">${H.labOpen}</a></div>
    </section>
    <section class="eye-card eye-card-soon" aria-labelledby="eye-game-h">
      <h2 id="eye-game-h">${H.gameTitle}</h2>
      <p>${H.gameText}</p>
      <div class="eye-actions"><span class="eye-btn" id="eye-game-soon" role="link" aria-disabled="true">${H.gameSoon}</span></div>
    </section>
  </div>
  <section class="eye-card"><h2>${H.howTitle}</h2>${list(H.how)}</section>
  <section class="eye-card"><h2>${H.privacyTitle}</h2>${list(H.privacy)}</section>
  <section class="eye-card"><h2>${H.limitsTitle}</h2>${list(H.limits)}</section>
  <section class="eye-card eye-warn"><h2>${H.legalTitle}</h2>${list(H.legal)}</section>
</main>`;
