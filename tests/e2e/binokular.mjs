// E2E „Binokular – Sehspiele“ (/binokular/): Startbildschirm mit drei Spielkarten (keine Reste des früheren Spiels),
// Tipp auf eine Karte startet das Spiel sofort (nie automatisch Kalibrierung) → Kalibrierung nur per Knopf (Messbild,
// zwei synthetische Fotos, Regler, Profil speichern, Kontrolle; nur in der ersten Größe) → Therapeutenbereich: amblyopes
// Auge → „Nachzeichnen“ (Pfad über den Testzugriff `window.__binokular`: Start, Ziehen entlang des Pfads, Farbwechsel,
// genau EIN Fehler je Ausflug, Rückkehrradius, graues Aufblitzen, Ziel → Karte „Geschafft – weiter zu Level 2“ → Enter →
// anderer, komplexerer Pfad, Level 2 geschafft → Beenden → Zusammenfassung mit Levelliste) → „Farbwechsel-Pong“ (Ball bewegt sich, relative Touch-Steuerung mit Verstärkung per CDP-Touch,
// Maus absolut, Pfeiltasten, Farbwechsel beim Schlägerkontakt, Pause bei Wechsel der Sichtbarkeit, Wake Lock) →
// Therapeutenbereich (PIN 726: Spieleinstellungen ändern, Export) → Nachzeichnen mit Fade (nie zwei Farben zugleich,
// Zähler stehen) und Fehlerlimit („Nochmal“ bleibt im Level, „Beenden“) → Pong mit Zwei-Spieler-Modus (zwei gleichzeitige
// Touchpunkte), Farbwechsel im Flug (null bis zwei Linien je Flug), Spielende nach Punkten → Level 4 mit Schleifen ohne
// Level-Automatik → Verlauf (Tabelle, CSV).
// Pixelprüfungen: Hintergrund = Profilhintergrund, Pfad/Ball = Profilfarbe des Auges, Rückmeldung und Linie grau.
// Größen: Tablet quer, Tablet hoch, Handy quer, Handy hoch. Keine Konsolenfehler, kein waagrechtes Scrollen.
// Voraussetzung: `npm run build && npx vite preview` (Port 4173). Aufruf: node tests/e2e/binokular.mjs
// Optional: BASE=http://localhost:4319/ OUT=/tmp/shots SIZES=tablet,phoneP
import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.env.BASE ?? 'http://localhost:4173/';
const out = process.env.OUT ?? '/tmp/binokular-shots';
fs.mkdirSync(out, { recursive: true });

const SAFETY =
  'Diese Software ist ein Forschungs-/Trainingsprototyp. Sie ersetzt keine augenärztliche oder optometrische Untersuchung und ist nicht als eigenständige Behandlung von Amblyopie validiert.';

const allSizes = [
  { name: 'tablet', width: 1180, height: 820 },
  { name: 'tabletP', width: 820, height: 1180 },
  { name: 'phone', width: 844, height: 390 },
  { name: 'phoneP', width: 390, height: 844 },
];
const sizes = process.env.SIZES ? allSizes.filter((s) => process.env.SIZES.split(',').includes(s.name)) : allSizes;

const errs = [];
const problems = [];
const check = (ok, msg) => {
  if (!ok) problems.push(msg);
  console.log(`${ok ? 'ok  ' : 'FEHL'} ${msg}`);
};

// Web-Audio-Töne zählen und Wake Lock nachbilden (zählt Anforderungen, Freigabe auslösbar)
const initScript = () => {
  window.__osc = 0;
  const C = window.AudioContext;
  if (C) {
    window.AudioContext = class extends C {
      createOscillator() {
        window.__osc++;
        return super.createOscillator();
      }
    };
  }
  window.__wl = 0;
  window.__wlRelease = [];
  Object.defineProperty(navigator, 'wakeLock', {
    configurable: true,
    value: {
      request: async () => {
        window.__wl++;
        const listeners = [];
        window.__wlRelease.push(() => listeners.forEach((f) => f()));
        return { release: async () => undefined, addEventListener: (_t, f) => listeners.push(f) };
      },
    },
  });
};

const b = await chromium.launch();

async function noHScroll(p, where) {
  const r = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, w: window.innerWidth }));
  check(r.sw <= r.w, `${where}: kein waagrechtes Scrollen (${r.sw} ≤ ${r.w})`);
}

// --- Kalibrierung (aus der bisherigen Fassung, unverändert in der Wirkung) ---
const PHOTO_W = 1000;
const PHOTO_H = 400;
const FIELD_CENTERS = [0, 1, 2, 3, 4].map((i) => [125 + i * 190, 200]);
const RED_FIELDS = [[190, 20, 20], [180, 5, 5], [80, 12, 10], [25, 5, 10], [4, 4, 4]];
const CYAN_FIELDS = [[20, 200, 210], [6, 8, 8], [10, 170, 90], [8, 60, 200], [4, 4, 4]];

async function photoPng(p, fields) {
  const url = await p.evaluate(
    ({ fields, w, h, centers }) => {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const g = c.getContext('2d');
      g.fillStyle = 'rgb(2,2,2)';
      g.fillRect(0, 0, w, h);
      fields.forEach(([r, gg, bb], i) => {
        g.fillStyle = `rgb(${r},${gg},${bb})`;
        g.fillRect(centers[i][0] - 75, centers[i][1] - 75, 150, 150);
      });
      return c.toDataURL('image/png');
    },
    { fields, w: PHOTO_W, h: PHOTO_H, centers: FIELD_CENTERS },
  );
  return Buffer.from(url.split(',')[1], 'base64');
}

async function tapFields(p, id) {
  await p.locator(`#${id}-canvas`).scrollIntoViewIfNeeded();
  const box = await p.locator(`#${id}-canvas`).boundingBox();
  for (const [x, y] of FIELD_CENTERS) await p.mouse.click(box.x + (x / PHOTO_W) * box.width, box.y + (y / PHOTO_H) * box.height);
}

async function setRange(p, sel, v) {
  await p.locator(sel).evaluate((el, val) => {
    el.value = String(val);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, v);
}

const hexOf = (d) => `#${[d[0], d[1], d[2]].map((v) => v.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
const canvasPixel = (p, sel, x, y) =>
  p.locator(sel).evaluate(
    (c, [x, y]) => Array.from(c.getContext('2d').getImageData(Math.round(x * (c.width / c.clientWidth)), Math.round(y * (c.height / c.clientHeight)), 1, 1).data),
    [x, y],
  );

/** komplette Kalibrierung mit synthetischen Fotos; liefert das gespeicherte Profil */
async function fullCalibration(p, tag, shot) {
  await p.waitForSelector('#cal-profiles');
  check((await p.locator('#cal-profile option').count()) === 2, tag('Kalibrierung: zwei Startprofile'));
  check(await p.locator('#cal-delete').isDisabled(), tag('Startprofil nicht löschbar'));
  check((await p.locator('#cal-step').getAttribute('data-step')) === 'prep', tag('Schritt 0 Vorbereitung'));
  await noHScroll(p, tag('Kalibrierung'));
  await p.click('#cal-next');
  await p.click('#cal-pattern-open');
  await p.waitForSelector('#cal-pattern');
  const fields = await p.locator('#cal-pattern .bm-pattern-field').evaluateAll((els) => els.map((e) => getComputedStyle(e).backgroundColor));
  check(fields.join('|') === 'rgb(255, 255, 255)|rgb(255, 0, 0)|rgb(0, 255, 0)|rgb(0, 0, 255)|rgb(0, 0, 0)', tag('Messbild: fünf Felder'));
  await p.keyboard.press('Escape');
  await p.waitForSelector('#cal-pattern', { state: 'detached' });
  await p.click('#cal-next');
  await p.setInputFiles('#photo-red-file', { name: 'IMG_0001.HEIC', mimeType: 'image/heic', buffer: Buffer.from('....ftypheic0000') });
  await p.waitForSelector('#photo-red-error');
  check((await p.locator('#photo-red-error').innerText()).includes('HEIC'), tag('HEIC-Foto: verständliche Meldung'));
  await p.setInputFiles('#photo-red-file', { name: 'rotes-glas.png', mimeType: 'image/png', buffer: await photoPng(p, RED_FIELDS) });
  await p.waitForSelector('#photo-red-canvas');
  await tapFields(p, 'photo-red');
  await p.waitForSelector('#photo-red-result');
  await p.click('#cal-next');
  await p.setInputFiles('#photo-second-file', { name: 'cyanes-glas.png', mimeType: 'image/png', buffer: await photoPng(p, CYAN_FIELDS) });
  await p.waitForSelector('#photo-second-canvas');
  await tapFields(p, 'photo-second');
  await p.waitForSelector('#photo-second-result');
  await p.click('#cal-next');
  await p.waitForSelector('#cal-candidates');
  const second = await p.locator('#cal-res-second').getAttribute('data-hex');
  const calcBg = await p.locator('#cal-res-bg').getAttribute('data-hex');
  check(second === '#0000FF', tag(`Berechnung: Zweitfarbe ${second} (reines Blau)`));
  await p.click('#cal-apply');
  await p.waitForSelector('#fine-preview');
  check((await p.locator('#fine-res-bg').getAttribute('data-hex')) === calcBg, tag('Feinabstimmung startet mit den berechneten Werten'));
  await setRange(p, '#fine-bg-red', 30);
  await setRange(p, '#fine-bg-second', 20);
  const fineBg = await p.locator('#fine-res-bg').getAttribute('data-hex');
  check(fineBg === '#1E0014', tag(`Regler: Hintergrund → ${fineBg}`));
  await p.waitForTimeout(150);
  const prevPx = hexOf(await canvasPixel(p, '#fine-preview', 2, 2));
  check(prevPx === fineBg, tag(`Vorschau (mit Pfad wie im Spiel): Hintergrund ${prevPx}`));
  await shot('cal-feinabstimmung');
  await p.fill('#fine-name', 'E2E Brille');
  await p.click('#fine-save');
  await p.waitForSelector('#cal-question');
  const st0 = await p.evaluate(() => JSON.parse(localStorage.getItem('binokular:v1')));
  const saved = st0.profiles.find((x) => x.name === 'E2E Brille');
  check(saved && st0.activeProfileId === saved.id && saved.background.r === 30 && saved.background.b === 20, tag('Profil gespeichert und aktiv'));
  for (const a of ['left', 'right', 'both']) await p.click(`.bm-cal-step button[data-answer="${a}"]`);
  await p.waitForSelector('#cal-done');
  await p.click('#cal-continue');
  return saved;
}

// --- Hilfen für die Spiele ---
const store = (p) => p.evaluate(() => JSON.parse(localStorage.getItem('binokular:v1')));
const S = (p) => p.evaluate(() => window.__binokular.state());

const lin = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const srgb = (l) => {
  const s = l <= 0.0031308 ? l * 12.92 : 1.055 * l ** (1 / 2.4) - 0.055;
  return Math.round(Math.min(1, Math.max(0, s)) * 255);
};
const mix = (a, c, k) => ['r', 'g', 'b'].map((ch) => srgb(lin(a[ch]) + k * (lin(c[ch]) - lin(a[ch]))));
/** erwartete Farbe eines Augenobjekts (Klasse AMBLYOPIC/FELLOW) aus gespeichertem Profil und Einstellungen */
function expectedColor(st, slot, k = 1) {
  const prof = st.profiles.find((x) => x.id === st.activeProfileId);
  const amb = st.settings.amblyopicEye;
  const eye = slot === 'AMBLYOPIC' ? amb : amb === 'LEFT' ? 'RIGHT' : 'LEFT';
  const leftRed = st.settings.leftLens === 'RED';
  const isRed = eye === 'LEFT' ? leftRed : !leftRed;
  const full = isRed ? prof.red : prof.second;
  const c = (slot === 'AMBLYOPIC' ? st.settings.amblyopicContrast : st.settings.fellowEyeContrast) / 100;
  return mix(prof.background, full, c * k);
}
const bgOf = (st) => {
  const prof = st.profiles.find((x) => x.id === st.activeProfileId);
  return [prof.background.r, prof.background.g, prof.background.b];
};
const near = (a, c, tol = 4) => a.slice(0, 3).every((v, i) => Math.abs(v - c[i]) <= tol);

/** Pixel des Spielfelds an Client-Koordinaten */
const pixelAt = (p, clientX, clientY) =>
  p.evaluate(
    ([x, y]) => {
      const c = document.querySelector('#bm-canvas');
      const r = c.getBoundingClientRect();
      const px = Math.round(((x - r.left) / r.width) * c.width);
      const py = Math.round(((y - r.top) / r.height) * c.height);
      return Array.from(c.getContext('2d').getImageData(px, py, 1, 1).data);
    },
    [clientX, clientY],
  );

/** Abbildung Spielkoordinaten → Client-Koordinaten (linear) */
async function mapper(p, w, h) {
  const [c0, c1] = await p.evaluate(([w, h]) => [window.__binokular.toClient(0, 0), window.__binokular.toClient(w, h)], [w, h]);
  const sx = (c1.x - c0.x) / w;
  const sy = (c1.y - c0.y) / h;
  const m = (x, y) => ({ x: c0.x + x * sx, y: c0.y + y * sy });
  m.scale = sx;
  return m;
}

/** vom Startbildschirm in ein Spiel: ein Tipp auf die Karte startet sofort (keine Kalibrierung, kein Zwischenschritt) */
async function openGame(p, id, tag) {
  await p.click(`#bm-game-${id}`);
  await p.waitForSelector(`.bm-game[data-game="${id}"]`);
  check((await p.locator('#cal-profiles').count()) === 0, tag(`${id}: Kartentipp startet das Spiel ohne Kalibrierung`));
  await p.waitForFunction(() => window.__binokular && window.__binokular.state().game);
  // Leiste ist vollständig (Live-Anzeige, Knöpfe) und die Bühne hat ihre endgültige Größe
  await p.waitForSelector('.bm-hud-item[id^="hud-"]:not(#hud-time)');
  await p.waitForTimeout(450);
}

async function toStart(p) {
  await p.click('#bm-to-start');
  await p.waitForSelector('#game-cards');
}

/** Pfad (Spielkoordinaten) entlang ziehen: von Index a bis b in Schritten */
async function dragAlong(p, m, path, a, b, step = 4) {
  for (let i = a; i <= b; i += step) {
    const c = m(path[i][0], path[i][1]);
    await p.mouse.move(c.x, c.y);
  }
  const c = m(path[b][0], path[b][1]);
  await p.mouse.move(c.x, c.y);
}

/** Pixel wiederholt lesen (Bild für Bild), bis eine Bedingung erfüllt ist (für kurze Aufblitz-Rahmen) */
const waitPixel = (p, x, y, pred, ms = 600) =>
  p.evaluate(
    async ([x, y, src, ms]) => {
      const f = new Function('d', `return (${src})(d)`);
      const c = document.querySelector('#bm-canvas');
      const r = c.getBoundingClientRect();
      const px = Math.round(((x - r.left) / r.width) * c.width);
      const py = Math.round(((y - r.top) / r.height) * c.height);
      const t0 = performance.now();
      let last = null;
      while (performance.now() - t0 < ms) {
        last = Array.from(c.getContext('2d').getImageData(px, py, 1, 1).data);
        if (f(last)) return { ok: true, px: last };
        await new Promise((res) => requestAnimationFrame(res));
      }
      return { ok: false, px: last };
    },
    [x, y, pred.toString(), ms],
  );

const isGray = (d) => Math.abs(d[0] - d[1]) <= 2 && Math.abs(d[1] - d[2]) <= 2 && d[0] >= 0x70 && d[0] <= 0x90;

for (const sz of sizes) {
  const first = sz === sizes[0];
  const ctx = await b.newContext({ viewport: { width: sz.width, height: sz.height }, acceptDownloads: true, hasTouch: true, isMobile: sz.name.startsWith('phone') });
  await ctx.addInitScript(initScript);
  const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p);
  const touch = (type, pts) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: pts.map(([id, x, y]) => ({ id, x, y })) });
  const tag = (s) => `${sz.name} ${s}`;
  p.on('pageerror', (e) => errs.push(`${sz.name} pageerror ${e.message}`));
  p.on('console', (m) => m.type() === 'error' && errs.push(`${sz.name} console ${m.text()}`));
  const shot = async (n) => {
    await p.waitForTimeout(250);
    await p.screenshot({ path: `${out}/${sz.name}-${n}.png` });
  };
  const SEED = 7;
  const url = `${base}binokular/?debug=1&seed=${SEED}`;

  // ============ 1 Startbildschirm ============
  await p.goto(url, { waitUntil: 'networkidle' });
  check((await p.locator('[data-testid="safety-notice"]').first().innerText()).trim() === SAFETY, tag('Start: Sicherheitshinweis im Wortlaut'));
  check((await p.title()) === 'Binokular – Sehspiele', tag('Seitentitel „Binokular – Sehspiele“'));
  check((await p.locator('h1').first().innerText()).trim() === 'Binokular – Sehspiele', tag('Start: Produktname'));
  check((await p.locator('#game-cards .bm-gamecard').count()) === 3, tag('Start: drei Spielkarten'));
  const cardTexts = await p.locator('#game-cards .bm-gamecard-title').allInnerTexts();
  check(cardTexts.join('|') === 'Nachzeichnen|Farbwechsel-Pong|Ziehen & Ablegen', tag(`Start: Karten ${cardTexts.join(', ')}`));
  check((await p.locator('#bm-game-ziehen-ablegen .bm-gamecard-text').innerText()).includes('Ball in den wandernden Ring ziehen'), tag('Start: Karte Ziehen & Ablegen mit Kurztext'));
  const body = await p.locator('body').innerText();
  check(!/Level|Kristall|Roboter|Binocular Mine|Mine\b|Schlüssel/i.test(body), tag('Start: keine Reste des früheren Spiels'));
  check((await p.locator('#bm-calibrate, #bm-history, #bm-therapist').count()) === 3, tag('Start: Kalibrierung, Verlauf, Therapeutenbereich'));
  const hint0 = await p.locator('#start-hint').innerText();
  check(hint0.includes('Startwerte Rot-Cyan') && hint0.includes('Kalibrierung per Taste'), tag(`Start: graue Zeile mit Profil und Hinweis „${hint0}“`));
  check((await p.locator('#bm-calibrate').innerText()) === 'Kalibrierung' && (await p.locator('#setup-summary, #bm-play').count()) === 0, tag('Start: Kalibrierung nur per Knopf, kein Zwischenbildschirm'));
  check((await p.locator('#sound-controls input[name="bm-volume"]').count()) === 3 && (await p.locator('#bm-sound-on').isChecked()), tag('Start: Ton an, drei Lautstärken'));
  await p.click('#sound-controls label:has(input[value="LOW"])');
  check((await store(p)).audio?.volume === 'LOW', tag('Start: Lautstärke gespeichert'));
  const cardBox = await p.locator('#bm-game-nachzeichnen').boundingBox();
  check(cardBox.height >= 120 && cardBox.width >= 200, tag(`Start: große Karten (${Math.round(cardBox.width)}×${Math.round(cardBox.height)})`));
  await noHScroll(p, tag('Start'));
  await shot('01-start');

  // Spielstart ohne jede Kalibrierung (frischer Speicher): Karte → Spiel; ohne Beenden wird keine Session gespeichert
  await openGame(p, 'nachzeichnen', tag);
  check((await store(p)).sessions.length === 0, tag('Start ohne Kalibrierung: Spiel läuft mit dem aktiven Profil'));
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForSelector('#game-cards');

  // Kalibrierung nur auf Knopfdruck (erste Größe), danach zurück zum Start
  if (first) {
    await p.click('#bm-calibrate');
    await fullCalibration(p, tag, shot);
    await p.waitForSelector('#game-cards');
    check((await p.locator('#start-hint').innerText()).includes('E2E Brille'), tag('Start: neues Profil in der grauen Zeile'));
  }
  // Therapeutenbereich: amblyopes Auge rechts (Profil, Auge und Zuordnung sind dort wählbar)
  await p.click('#bm-therapist');
  await p.fill('#bm-pin-input', '726');
  await p.click('#bm-pin-ok');
  await p.waitForSelector('#therapist-form');
  check((await p.locator('#t-profile-info').count()) === 1 && (await p.locator('input[name="t-profile"]').count()) >= 2 && (await p.locator('input[name="t-lens"]').count()) === 2, tag('Therapeutenbereich: Profil, Auge, Zuordnung wählbar'));
  await p.click('label.bm-chip:has(input[name="t-amb"][value="RIGHT"])');
  check((await p.locator('#t-summary').innerText()).includes('amblyope Auge (rechts)'), tag('Therapeutenbereich: amblyopes Auge rechts'));
  check((await p.locator('#n-maxlevel').innerText()).includes('Level 1 von 12'), tag('Therapeutenbereich: höchstes Level 1'));
  await p.click('.bm-head .bm-btn-ghost');
  await p.waitForSelector('#game-cards');

  // ============ 2 Nachzeichnen (hart) ============
  await openGame(p, 'nachzeichnen', tag);
  let st = await store(p);
  const fineBg = bgOf(st);
  await p.waitForTimeout(300);
  await noHScroll(p, tag('Nachzeichnen'));
  const cv = p.locator('#bm-canvas');
  const css = await cv.evaluate((c) => ({ ta: getComputedStyle(c).touchAction, us: getComputedStyle(c).userSelect }));
  check(css.ta === 'none' && css.us === 'none', tag(`Canvas: touch-action ${css.ta}, user-select ${css.us}`));
  check(await cv.evaluate((c) => !c.dispatchEvent(new MouseEvent('contextmenu', { cancelable: true, bubbles: true }))), tag('Canvas: Kontextmenü unterdrückt'));
  check(await p.evaluate(() => window.__wl) >= 1, tag('Wake Lock angefordert'));
  const stageH = await p.locator('.bm-stage').evaluate((e) => e.clientHeight);
  check(stageH >= 150, tag(`Bühne hoch genug (${stageH} px)`));
  const bgPx = await pixelAt(p, (await cv.boundingBox()).x + 2, (await cv.boundingBox()).y + 2);
  check(near(bgPx, fineBg, 1), tag(`Hintergrund-Pixel ${hexOf(bgPx)} = Profilhintergrund ${hexOf(fineBg)}`));
  const hudColor = await p.locator('#hud-time').evaluate((el) => getComputedStyle(el).color);
  check(hudColor === 'rgb(136, 136, 136)', tag(`Live-Anzeige grau (${hudColor})`));
  check((await p.locator('#hud-accuracy').innerText()).includes('100 %') && (await p.locator('#hud-errors').innerText()).includes('0'), tag('Live-Anzeige: Genauigkeit, Fehler'));
  check((await p.locator('#hud-deviation').count()) === 1 && (await p.locator('#hud-changes').count()) === 1, tag('Live-Anzeige: Abweichung, Farbwechsel'));
  check((await p.locator('button[data-action="newPath"]').innerText()) === 'Neuer Pfad' && (await p.locator('button[data-action="clear"]').innerText()) === 'Linie löschen', tag('Knöpfe „Neuer Pfad“, „Linie löschen“'));
  check((await p.locator('#bm-msg').innerText()).includes('Startpunkt'), tag('Hinweis zu Beginn (grau)'));
  await shot('02-nachzeichnen');

  let s = await S(p);
  check(s.game === 'nachzeichnen' && s.seed === SEED && s.path.length > 200 && s.status === 'ready' && s.width === 16 && s.level === 1 && s.curls === 0, tag(`Pfad aus Seed ${SEED}: ${s.path.length} Punkte, Breite ${s.width}, Level ${s.level}`));
  check((await p.locator('#hud-level').innerText()).includes('1'), tag('Live-Anzeige: Level 1 (grau)'));
  const P = s.path;
  const m = await mapper(p, 1280, 720);
  check(P[0][0] < P[P.length - 1][0] && P[0][0] < 200 && P[P.length - 1][0] > 1080, tag('Pfad von links nach rechts'));
  // Pfadfarbe: Profilfarbe des Auges, Hintergrund außerhalb des Pfads
  const farIdx = P.length - 60;
  const farC = m(P[farIdx][0], P[farIdx][1]);
  const pathPx = await pixelAt(p, farC.x, farC.y);
  check(near(pathPx, expectedColor(st, s.eye), 6), tag(`Pfad-Pixel ${hexOf(pathPx)} = Farbe des Auges ${s.eye} ${hexOf(expectedColor(st, s.eye))}`));
  // falsch angesetzt: Hinweis, kein Zeichnen
  const off = m(640, 640);
  await p.mouse.move(off.x, off.y);
  await p.mouse.down();
  await p.mouse.move(off.x + 20, off.y);
  await p.mouse.up();
  s = await S(p);
  check(s.status === 'ready', tag('Zeichnen nur ab dem Startpunkt'));
  check((await p.locator('#bm-msg').innerText()).includes('Startpunkt'), tag('Hinweis „am Startpunkt ansetzen“'));
  // Start und Ziehen
  const eye0 = s.eye;
  const sc = m(P[0][0], P[0][1]);
  await p.mouse.move(sc.x, sc.y);
  await p.mouse.down();
  const mid = Math.floor(P.length * 0.45);
  await dragAlong(p, m, P, 4, mid);
  s = await S(p);
  check(s.status === 'drawing' && s.errors === 0 && s.progress > mid - 15, tag(`Ziehen: Fortschritt ${s.progress}/${s.length}, keine Fehler`));
  check(s.changes >= 2, tag(`Farbwechsel durch Strecke/Zeit: ${s.changes}`));
  check(s.eye === (s.changes % 2 ? (eye0 === 'AMBLYOPIC' ? 'FELLOW' : 'AMBLYOPIC') : eye0), tag('Wechsel zwischen den beiden Augenfarben'));
  await p.waitForTimeout(350);
  check((await p.locator('#hud-changes').innerText()).includes(String((await S(p)).changes)), tag('Live-Anzeige zählt die Farbwechsel'));
  const lastP = s.lastValid;
  const lc = m(lastP.x, lastP.y);
  await p.waitForTimeout(80);
  let linePx = await pixelAt(p, lc.x, lc.y);
  if (m.scale < 0.6) {
    // kleine Bühne: die Linie ist nur ein bis zwei Pixel breit – im Umkreis von 1,5 px den grauesten Punkt nehmen
    for (const [dx, dy2] of [[1.5, 0], [-1.5, 0], [0, 1.5], [0, -1.5], [1, 1], [-1, -1]]) {
      const c = await pixelAt(p, lc.x + dx, lc.y + dy2);
      if (c[1] > linePx[1]) linePx = c;
    }
  }
  check(m.scale >= 0.6 ? isGray(linePx) : linePx[1] >= 0x50 && linePx[2] >= 0x50, tag(`gezeichnete Linie grau (${hexOf(linePx)})`));
  // Ausflug: weit weg vom Pfad → genau EIN Fehler
  const dy = lastP.y > 360 ? -130 : 130;
  const away = (k) => m(lastP.x + k * 2, lastP.y + dy);
  for (let k = 1; k <= 6; k++) {
    const c = m(lastP.x, lastP.y + (dy * k) / 6);
    await p.mouse.move(c.x, c.y);
  }
  const edgeC = m(5, 360);
  const flash = await waitPixel(p, edgeC.x, edgeC.y, (d) => Math.abs(d[0] - d[1]) <= 2 && Math.abs(d[1] - d[2]) <= 2 && d[0] >= 0x70 && d[0] <= 0x90, 700);
  check(flash.ok, tag(`Fehler: grauer Aufblitz-Rahmen (${hexOf(flash.px)})`));
  s = await S(p);
  check(s.errors === 1 && s.status === 'error', tag(`Fehler gezählt: ${s.errors}, Zustand ${s.status}`));
  const samples0 = s.samples;
  for (let k = 0; k < 12; k++) {
    const c = away(k);
    await p.mouse.move(c.x, c.y);
  }
  s = await S(p);
  check(s.errors === 1 && s.samples === samples0, tag('außerhalb: weiterhin 1 Fehler, Punkte außerhalb nicht gewertet'));
  check((await p.locator('#bm-msg').innerText()).includes('Ende der Linie'), tag('Hinweis: zurück zum Ende der Linie'));
  // auf den Pfad weit weg vom Linienende: kein Weiterzeichnen
  const farOn = m(P[Math.min(P.length - 1, s.progress + 60)][0], P[Math.min(P.length - 1, s.progress + 60)][1]);
  await p.mouse.move(farOn.x, farOn.y);
  s = await S(p);
  check(s.status === 'error' && s.errors === 1, tag('Rückkehr nur im Radius um das Linienende'));
  // zurück zum Linienende → weiter
  // 20 px vom Linienende entfernt (im Rückkehrradius), zum Pfad hin
  const back = m(s.lastValid.x, s.lastValid.y - Math.sign(dy) * 20);
  await p.mouse.move(back.x, back.y);
  s = await S(p);
  check(s.status === 'drawing' && s.errors === 1, tag(`Rückkehrradius: zeichnet weiter, Fehler bleiben ${s.errors}`));
  // bis zum Ziel
  await dragAlong(p, m, P, Math.max(0, s.progress), P.length - 1);
  await p.waitForSelector('#game-card[data-card="goal"]', { timeout: 5000 });
  await p.mouse.up();
  const cardTitle = await p.locator('#game-card-title').innerText();
  check(cardTitle === 'Geschafft – weiter zu Level 2', tag(`Ziel erreicht → Karte „${cardTitle}“ (die Sitzung läuft weiter)`));
  check((await p.locator('#bm-card-next').innerText()) === 'Weiter' && (await p.locator('#bm-card-quit').innerText()) === 'Beenden', tag('Karte: „Weiter“ und „Beenden“'));
  check((await p.locator('#end-facts').count()) === 0 && (await p.locator('#game-card .bm-modal-card').evaluate((el) => getComputedStyle(el).color)) === 'rgb(136, 136, 136)', tag('Karte grau, kein Spielende'));
  await shot('03-nachzeichnen-karte');
  const lvl1 = await S(p);
  check(lvl1.awaiting === 'goal' && lvl1.level === 1 && lvl1.levels.length === 1 && lvl1.levels[0].completed, tag('Zustand: Level 1 geschafft, wartet auf Weiter'));
  // Enter (Tastatur) geht weiter: Level 2, anderer Pfad, mehr Stützpunkte
  await p.keyboard.press('Enter');
  await p.waitForFunction(() => window.__binokular.state().level === 2, null, { timeout: 3000 });
  const lvl2 = await S(p);
  check(JSON.stringify(lvl2.path) !== JSON.stringify(lvl1.path) && lvl2.complexity.points > lvl1.complexity.points && lvl2.ctrl.length > lvl1.ctrl.length && lvl2.awaiting === null && lvl2.status === 'ready', tag(`Level 2: anderer Pfad, ${lvl2.complexity.points} statt ${lvl1.complexity.points} Stützpunkte`));
  check((await p.locator('#hud-level').innerText()).includes('2') && (await p.locator('#game-card').count()) === 0, tag('Live-Anzeige: Level 2, Karte weg'));
  check(lvl2.errors === 1 && lvl2.maxLevel === 2, tag('Werte der Sitzung laufen weiter (Fehler 1), höchstes Level 2'));
  await shot('03-nachzeichnen-level2');
  // Level 2 fehlerfrei zeichnen, dann „Beenden“ auf der Karte
  const P2a = lvl2.path;
  const sc2a = m(P2a[0][0], P2a[0][1]);
  await p.mouse.move(sc2a.x, sc2a.y);
  await p.mouse.down();
  await dragAlong(p, m, P2a, 4, P2a.length - 1);
  await p.waitForSelector('#game-card[data-card="goal"]', { timeout: 5000 });
  await p.mouse.up();
  check((await p.locator('#game-card-title').innerText()) === 'Geschafft – weiter zu Level 3', tag('Level 2 geschafft → Karte „weiter zu Level 3“'));
  await p.click('#bm-card-quit');
  await p.waitForSelector('#end-facts', { timeout: 5000 });
  check((await p.locator('h1').first().innerText()) === 'Spiel beendet', tag('Beenden auf der Karte → Zusammenfassung'));
  const facts = await p.locator('#end-facts').innerText();
  check(/Nachzeichnen/.test(facts) && /Höchstes Level\s*2/.test(facts) && /Geschaffte Pfade\s*2/.test(facts) && /Fehler\s*1/.test(facts) && /Genauigkeit/.test(facts) && /Abweichung/.test(facts) && /Farbwechsel/.test(facts) && /Spielzeit/.test(facts), tag(`Zusammenfassung: ${facts.replace(/\s+/g, ' ').slice(0, 120)}`));
  const levelRows = await p.locator('#end-levels tbody tr').allInnerTexts();
  check(levelRows.length === 2 && /^1\s/.test(levelRows[0]) && /^2\s/.test(levelRows[1]) && levelRows.every((r) => r.includes('geschafft')), tag(`Zusammenfassung: Levelliste (${levelRows.map((r) => r.replace(/\s+/g, ' ')).join(' | ')})`));
  await shot('03-nachzeichnen-ende');
  await noHScroll(p, tag('Zusammenfassung'));
  st = await store(p);
  const n1 = st.sessions[st.sessions.length - 1];
  check(st.sessions.length === 1 && n1.gameId === 'nachzeichnen' && n1.endReason === 'goal' && n1.points === 2 && n1.errors === 1 && n1.colorChanges >= 2 && n1.details.accuracy > 0 && n1.levels.length === 2 && n1.details.maxLevel === 2, tag(`Session gespeichert: ${JSON.stringify(n1.details)}`));
  check(st.nachMaxLevel === 2, tag(`Höchstes Level gespeichert: ${st.nachMaxLevel}`));
  await toStart(p);

  // ============ 3 Pong (Grundstufe) ============
  await openGame(p, 'pong', tag);
  await noHScroll(p, tag('Pong'));
  check((await p.locator('.bm-game').getAttribute('data-game')) === 'pong', tag('Pong gestartet'));
  const pc = await mapper(p, 720, 1280);
  await p.keyboard.press('Escape'); // Zustand einfrieren: Ball ruht in der Mitte (Anspielphase)
  await p.waitForSelector('#pause-overlay');
  let q = await S(p);
  check(q.phase === 'serve' && q.radius * 2 >= 24 && q.score.top === 0, tag(`Pong: Anspielphase, Ball ${q.radius * 2} px groß`));
  check(q.eye === 'AMBLYOPIC' || q.eye === 'FELLOW', tag(`Pong: Startfarbe ${q.eye} (aus Seed ${SEED})`));
  await p.click('#bm-resume');
  await p.keyboard.press('Escape');
  await p.waitForSelector('#pause-overlay');
  await p.click('#bm-resume');
  // Pixel: Hintergrund, Ball in Augenfarbe (neben der Mittellinie), Schläger und Mittellinie grau
  await p.keyboard.press('Escape');
  await p.waitForSelector('#pause-overlay');
  await p.evaluate(() => window.__binokular.set({ ball: { x: 360, y: 640, vx: 0, vy: 0 } }));
  await p.waitForTimeout(150);
  q = await S(p);
  const pbox = await cv.boundingBox();
  const pbg = await pixelAt(p, pbox.x + 1, pbox.y + 1);
  st = await store(p);
  check(near(pbg, bgOf(st), 1), tag(`Pong: Hintergrund-Pixel ${hexOf(pbg)}`));
  const ballC = pc(360, 640 - q.radius * 0.5);
  const ballPx = await pixelAt(p, ballC.x, ballC.y);
  check(near(ballPx, expectedColor(st, q.eye), 8), tag(`Pong: Ball-Pixel ${hexOf(ballPx)} = Farbe des Auges ${q.eye} ${hexOf(expectedColor(st, q.eye))}`));
  const padC = pc(q.bottom, 1190);
  const padPx = await pixelAt(p, padC.x, padC.y);
  check(isGray(padPx), tag(`Pong: Schläger grau (${hexOf(padPx)})`));
  await shot('04-pong');
  await p.click('#bm-resume');

  // Ball bewegt sich
  await p.waitForFunction(() => window.__binokular.state().phase === 'play', null, { timeout: 4000 });
  const b0 = (await S(p)).ball;
  await p.waitForTimeout(300);
  const b1 = (await S(p)).ball;
  check(Math.hypot(b1.x - b0.x, b1.y - b0.y) > 20, tag(`Ball bewegt sich (${Math.round(Math.hypot(b1.x - b0.x, b1.y - b0.y))} px in 0,3 s)`));
  // relative Touch-Steuerung mit Verstärkung 1,3: der Finger wischt irgendwo (hier oben, nicht auf dem Schläger)
  const x0 = pbox.x + pbox.width / 2;
  const yTouch = pbox.y + pbox.height * 0.25;
  const bottom0 = (await S(p)).bottom;
  await touch('touchStart', [[1, x0, yTouch]]);
  const dxCss = Math.min(60, pbox.width * 0.12, (100 * pc.scale) / 1.3);
  for (let k = 1; k <= 6; k++) await touch('touchMove', [[1, x0 + (dxCss * k) / 6, yTouch]]);
  await p.waitForTimeout(60);
  const bottom1 = (await S(p)).bottom;
  const expectDx = (dxCss / pc.scale) * 1.3;
  check(Math.abs(bottom1 - bottom0 - expectDx) < 6, tag(`Touch relativ mit Verstärkung 1,3: Schläger +${Math.round(bottom1 - bottom0)} (erwartet ${Math.round(expectDx)})`));
  for (let k = 1; k <= 6; k++) await touch('touchMove', [[1, x0 + dxCss - (dxCss * k) / 6, yTouch]]);
  await touch('touchEnd', []);
  await p.waitForTimeout(60);
  const bottom2 = (await S(p)).bottom;
  check(Math.abs(bottom2 - bottom0) < 8, tag('Touch: Rückwärtswischen bringt den Schläger zurück'));
  check((await S(p)).pointers === 0, tag('Touch beendet: Zeiger freigegeben'));
  // Maus: absolut
  const mt = pc(520, 900);
  await p.mouse.move(mt.x, mt.y);
  await p.waitForTimeout(60);
  check(Math.abs((await S(p)).bottom - 520) < 4, tag('Maus: Schläger folgt direkt der Mausposition'));
  // Tastatur
  const bk0 = (await S(p)).bottom;
  await p.keyboard.down('ArrowLeft');
  await p.waitForTimeout(250);
  await p.keyboard.up('ArrowLeft');
  check((await S(p)).bottom < bk0 - 80, tag('Pfeiltaste links bewegt den Schläger'));
  // Farbwechsel bei Schlägerkontakt: genau ein Wechsel (Flugwechsel sind standardmäßig an: Linien noch nicht gekreuzt)
  await p.keyboard.press('Escape');
  await p.waitForSelector('#pause-overlay');
  await p.evaluate(() => window.__binokular.set({ bottom: 360, ball: { x: 380, y: 1060, vx: 0, vy: 500 }, speed: 520 }));
  const pre = await S(p);
  await p.click('#bm-resume');
  await p.waitForFunction((h) => window.__binokular.state().hits > h, pre.hits, { timeout: 4000 });
  const post = await S(p);
  check(post.colorChanges === pre.colorChanges + 1 && post.eye !== pre.eye && post.flightYs.length <= 2 && post.flightYs.every((y) => y > 300 && y < 980), tag(`Schlägerkontakt: Farbe ${pre.eye} → ${post.eye}, genau 1 Wechsel, ${post.flightYs.length} Flugwechsel geplant`));
  check(post.speed > 520 && post.speed <= 520 * 1.04 + 0.01, tag(`Geschwindigkeit nach dem Schlag ${Math.round(post.speed)} (×1,04)`));
  await p.waitForTimeout(350);
  check((await p.locator('#hud-changes').innerText()).includes(String((await S(p)).colorChanges)) && (await p.locator('#hud-hits').innerText()).includes('1'), tag('Live-Anzeige: Schläge, Farbwechsel'));
  // Pause bei Wechsel der Sichtbarkeit; Wake Lock wird danach erneut angefordert
  const wl0 = await p.evaluate(() => window.__wl);
  await p.evaluate(() => window.__wlRelease.forEach((f) => f()));
  await p.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await p.waitForSelector('#pause-overlay');
  check((await S(p)).running === false && (await p.locator('.bm-game').getAttribute('data-phase')) === 'paused', tag('Pause bei visibilitychange (Spiel angehalten)'));
  check((await p.locator('#pause-overlay').innerText()).includes('angehalten'), tag('Pause-Hinweis „Fenster nicht mehr im Vordergrund“'));
  const bp0 = (await S(p)).ball;
  await p.waitForTimeout(400);
  const bp1 = (await S(p)).ball;
  check(bp0.x === bp1.x && bp0.y === bp1.y, tag('Ball steht während der Pause'));
  await p.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await p.waitForTimeout(150);
  check((await p.evaluate(() => window.__wl)) > wl0, tag('Wake Lock nach Rückkehr erneut angefordert'));
  check((await p.locator('#bm-resume').innerText()) === 'Weiter' && (await p.locator('#bm-end').innerText()) === 'Beenden', tag('Pause: „Weiter“ / „Beenden“'));
  await shot('05-pause');
  await p.click('#bm-resume');
  await p.waitForTimeout(300);
  check((await S(p)).running === true, tag('Weiter: Spiel läuft'));
  // Vollbild-Knopf vorhanden und ohne Fehler bedienbar
  check(await p.locator('#bm-fullscreen').isVisible(), tag('Vollbild-Knopf sichtbar'));
  await p.click('#bm-fullscreen');
  await p.waitForTimeout(150);
  // Beenden über die Pause
  await p.keyboard.press('Escape');
  await p.waitForSelector('#pause-overlay');
  await p.click('#bm-end');
  await p.waitForSelector('#end-facts');
  const pf = await p.locator('#end-facts').innerText();
  check(/Farbwechsel-Pong/.test(pf) && /Punkte \(du : Gegner\)/.test(pf) && /Schläge/.test(pf), tag('Pong-Zusammenfassung'));
  st = await store(p);
  const n2 = st.sessions[st.sessions.length - 1];
  check(st.sessions.length === 2 && n2.gameId === 'pong' && n2.endReason === 'user' && n2.colorChanges >= 1, tag('Pong-Session gespeichert (beendet)'));
  await toStart(p);

  // ============ 4 Therapeutenbereich: Spieleinstellungen ============
  await p.click('#bm-therapist');
  await p.fill('#bm-pin-input', '000');
  await p.click('#bm-pin-ok');
  check(await p.locator('.bm-error').isVisible(), tag('falsche PIN abgewiesen'));
  await p.fill('#bm-pin-input', '726');
  await p.click('#bm-pin-ok');
  await p.waitForSelector('#therapist-form');
  check((await p.locator('[data-testid="safety-notice"]').first().innerText()).trim() === SAFETY, tag('Therapeutenbereich: Sicherheitshinweis'));
  check((await p.locator('#sec-nach').count()) === 1 && (await p.locator('#sec-pong').count()) === 1, tag('Therapeutenbereich: Abschnitte beider Spiele'));
  check((await p.locator('#f-ac').inputValue()) === '100' && (await p.locator('#f-fc').inputValue()) === '20', tag('Therapeutenbereich: Kontrast 100 / 20'));
  const setNum = async (sel, v) => {
    await p.fill(sel, String(v));
    await p.locator(sel).blur();
  };
  await setNum('#n-width', 999);
  check((await store(p)).games.nachzeichnen.pathWidth === 40, tag('Eingabe 999 wird auf 40 begrenzt'));
  await setNum('#n-width', 24);
  await p.click('#sec-nach label.bm-chip:has(input[name="n-mode"][value="FADE"])');
  await setNum('#n-fade', 0.6);
  await setNum('#n-errlimit', 1);
  await setNum('#n-startlevel', 99);
  check((await store(p)).games.nachzeichnen.startLevel === 12, tag('Startlevel 99 wird auf 12 begrenzt'));
  await setNum('#n-startlevel', 3);
  check(await p.locator('#n-auto').isChecked(), tag('Level steigen automatisch: Standard an'));
  await setNum('#p-gain', 99);
  check((await store(p)).games.pong.gain === 3, tag('Verstärkung 99 wird auf 3 begrenzt'));
  await setNum('#p-gain', 2);
  await setNum('#p-target', 2);
  await p.click('#p-two');
  check(await p.locator('input[name="p-flight"][value="normal"]').isChecked(), tag('Pong: Farbwechsel im Flug standardmäßig „normal“'));
  await p.click('label.bm-chip:has(input[name="p-flight"][value="OFF"])');
  check((await store(p)).games.pong.flightChange === false, tag('Pong: Farbwechsel im Flug „aus“ gespeichert'));
  await p.click('label.bm-chip:has(input[name="p-flight"][value="often"])');
  st = await store(p);
  check(
    st.games.nachzeichnen.pathWidth === 24 && st.games.nachzeichnen.changeMode === 'FADE' && st.games.nachzeichnen.fadeS === 0.6 && st.games.nachzeichnen.errorLimit === 1 && st.games.pong.gain === 2 && st.games.pong.targetScore === 2 && st.games.pong.twoPlayer && st.games.pong.flightChange && st.games.pong.flightFreq === 'often' && st.games.nachzeichnen.startLevel === 3,
    tag(`Spieleinstellungen gespeichert: ${JSON.stringify(st.games.nachzeichnen)}`),
  );
  await shot('06-therapeut');
  await noHScroll(p, tag('Therapeutenbereich'));
  const [jdl] = await Promise.all([p.waitForEvent('download'), p.click('#bm-export-json')]);
  const json = JSON.parse(fs.readFileSync(await jdl.path(), 'utf8'));
  check(json.format === 'binokular-einstellungen' && json.games.pong.gain === 2 && json.games.nachzeichnen.pathWidth === 24 && !JSON.stringify(json).includes('"726"'), tag('JSON-Export enthält Spieleinstellungen, keine PIN'));
  await p.click('.bm-head .bm-btn-ghost');
  await p.waitForSelector('#game-cards');

  // ============ 5 Nachzeichnen mit Fade und Fehlerlimit ============
  await openGame(p, 'nachzeichnen', tag);
  s = await S(p);
  check(s.width === 24, tag(`Spiel nutzt die Therapeuten-Einstellung: Pfadbreite ${s.width}`));
  const P2 = s.path;
  const m2 = await mapper(p, 1280, 720);
  const sc2 = m2(P2[0][0], P2[0][1]);
  await p.mouse.move(sc2.x, sc2.y);
  await p.mouse.down();
  // Stift am Start gehalten: Zeitintervall (2 s) löst Fades aus; jedes Bild wird protokolliert
  const far2 = m2(P2[P2.length - 60][0], P2[P2.length - 60][1]);
  const dev = (await cv.boundingBox());
  const res = await p.evaluate(
    async ([cx, cy, ms]) => {
      const c = document.querySelector('#bm-canvas');
      const r = c.getBoundingClientRect();
      const px = Math.round(((cx - r.left) / r.width) * c.width);
      const py = Math.round(((cy - r.top) / r.height) * c.height);
      const g = c.getContext('2d');
      const rows = [];
      const t0 = performance.now();
      while (performance.now() - t0 < ms) {
        const s = window.__binokular.state();
        rows.push({ phase: s.phase, k: s.k, eye: s.eye, e: s.elapsedMs, d: s.drawnPx, ch: s.changes, px: Array.from(g.getImageData(px, py, 1, 1).data) });
        await new Promise((res) => requestAnimationFrame(res));
      }
      return rows;
    },
    [far2.x, far2.y, 6500],
  );
  const phases = new Set(res.map((r) => r.phase));
  check(phases.has('fadeOut') && phases.has('fadeIn') && phases.has('steady'), tag(`Fade: Phasen ${[...phases].join(', ')}`));
  const flips = res.filter((r, i) => i > 0 && r.eye !== res[i - 1].eye);
  check(flips.length >= 2 && flips.every((r) => r.k <= 0.3), tag(`Fade: ${flips.length} Wechsel, Farbe wechselt nur bei k ≈ 0`));
  const minK = Math.min(...res.map((r) => r.k));
  check(minK < 0.15 && res.every((r) => r.k >= 0 && r.k <= 1), tag(`Fade: k reicht von 1 bis ${minK.toFixed(2)}`));
  st = await store(p);
  const bg2 = bgOf(st);
  const exA = expectedColor(st, 'AMBLYOPIC');
  const exF = expectedColor(st, 'FELLOW');
  // nie beide Farben zugleich: Kanäle beider Farben dürfen nicht gleichzeitig über dem Hintergrund liegen
  const chanA = exA.map((v, i) => v - bg2[i]);
  const chanF = exF.map((v, i) => v - bg2[i]);
  const both = res.filter((r) => r.px.slice(0, 3).some((v, i) => chanA[i] > 20 && v - bg2[i] > 12) && r.px.slice(0, 3).some((v, i) => chanF[i] > 20 && v - bg2[i] > 12));
  check(both.length === 0, tag(`Fade: nie beide Farben zugleich sichtbar (${res.length} Bilder geprüft)`));
  const atZero = res.filter((r) => r.k < 0.02);
  check(atZero.length > 0 && atZero.every((r) => near(r.px, bg2, 10)), tag(`Fade: bei k ≈ 0 ist der Pfad im Hintergrund verschwunden (${atZero.length} Bilder)`));
  const fadeRows = res.filter((r) => r.phase !== 'steady');
  let frozen = true;
  for (let i = 1; i < fadeRows.length; i++) {
    const a = fadeRows[i - 1];
    const c = fadeRows[i];
    if (a.ch === c.ch || a.phase === c.phase) if (a.phase !== 'steady' && c.phase !== 'steady' && (a.e !== c.e || a.d !== c.d)) frozen = false;
  }
  check(frozen, tag('Fade: Wechsel-Zähler stehen während des Fades'));
  // Fehlerlimit 1: ein Ausflug beendet die Runde → Karte „Nochmal“ / „Beenden“ (Level bleibt gleich)
  const provoke = async (PP, mm) => {
    await dragAlong(p, mm, PP, 4, 60);
    const sx = await S(p);
    const lp = sx.lastValid;
    for (let k = 1; k <= 8; k++) {
      const c = mm(lp.x, lp.y + (lp.y > 360 ? -1 : 1) * (k * 20));
      await p.mouse.move(c.x, c.y);
    }
    await p.waitForSelector('#game-card[data-card="limit"]', { timeout: 4000 });
    await p.mouse.up();
  };
  check(s.level === 3 && s.complexity.curls === 0, tag(`Startlevel 3 aus dem Therapeutenbereich (Level ${s.level})`));
  await provoke(P2, m2);
  check((await p.locator('#game-card-title').innerText()) === 'Fehlerlimit erreicht' && (await p.locator('#bm-card-retry').innerText()) === 'Nochmal' && (await p.locator('#bm-card-quit').innerText()) === 'Beenden', tag('Fehlerlimit: Karte „Nochmal“ / „Beenden“'));
  const lim1 = await S(p);
  check(lim1.awaiting === 'limit' && lim1.level === 3 && lim1.errors === 1 && lim1.levels.length === 1 && !lim1.levels[0].completed, tag('Fehlerlimit: Runde zu Ende, Level 3 bleibt'));
  await p.click('#bm-card-retry');
  await p.waitForFunction(() => window.__binokular.state().awaiting === null, null, { timeout: 3000 });
  const retry = await S(p);
  check(retry.level === 3 && JSON.stringify(retry.path) !== JSON.stringify(lim1.path) && retry.status === 'ready' && retry.errors === 1, tag('Nochmal: gleiches Level, neuer Pfad, Fehler der Sitzung bleiben'));
  const P3 = retry.path;
  const m3 = await mapper(p, 1280, 720);
  const sc3 = m3(P3[0][0], P3[0][1]);
  await p.mouse.move(sc3.x, sc3.y);
  await p.mouse.down();
  await provoke(P3, m3);
  await p.click('#bm-card-quit');
  await p.waitForSelector('#end-facts', { timeout: 4000 });
  check(/Fehler\s*2/.test(await p.locator('#end-facts').innerText()), tag('Fehlerlimit: Beenden → Zusammenfassung mit 2 Fehlern'));
  st = await store(p);
  const n3 = st.sessions[st.sessions.length - 1];
  check(n3.gameId === 'nachzeichnen' && n3.endReason === 'limit' && n3.points === 0 && n3.colorChanges >= 2 && n3.errors === 2 && n3.levels.length === 2 && n3.details.level === 3 && !n3.completed, tag('Session gespeichert: Fehlerlimit'));
  await toStart(p);

  // ============ 6 Pong: Zwei-Spieler-Modus, Flugwechsel, Spielende ============
  await openGame(p, 'pong', tag);
  const pc2 = await mapper(p, 720, 1280);
  await p.keyboard.press('Escape');
  await p.waitForSelector('#pause-overlay');
  q = await S(p);
  check(q.twoPlayer === true && q.gain === 2, tag('Pong nutzt Therapeuten-Einstellungen (Zwei-Spieler, Verstärkung 2)'));
  await p.click('#bm-resume');
  await p.waitForFunction(() => window.__binokular.state().phase === 'play', null, { timeout: 4000 });
  await p.waitForTimeout(500);
  const top0 = (await S(p)).top;
  check(Math.abs(top0 - 360) < 1, tag('Zwei Spieler: kein Computergegner (oberer Schläger steht)'));
  // zwei gleichzeitige Touchpunkte: obere Hälfte steuert oben, untere unten (jeweils relativ, Verstärkung 2)
  const box2 = await cv.boundingBox();
  const cx = box2.x + box2.width / 2;
  const yT = box2.y + box2.height * 0.25;
  const yB = box2.y + box2.height * 0.75;
  const mv = Math.min(50, box2.width * 0.1, (100 * pc2.scale) / 2);
  const t0 = await S(p);
  await touch('touchStart', [[1, cx, yT], [2, cx, yB]]);
  await p.waitForTimeout(40);
  check((await S(p)).pointers === 2, tag('Zwei Zeiger getrennt verwaltet'));
  for (let k = 1; k <= 5; k++) await touch('touchMove', [[1, cx + (mv * k) / 5, yT], [2, cx - (mv * k) / 5, yB]]);
  await p.waitForTimeout(60);
  const t1 = await S(p);
  const exp2 = (mv / pc2.scale) * 2;
  check(Math.abs(t1.top - t0.top - exp2) < 8 && Math.abs(t1.bottom - t0.bottom + exp2) < 8, tag(`Zwei Touchpunkte: oben +${Math.round(t1.top - t0.top)}, unten ${Math.round(t1.bottom - t0.bottom)} (erwartet ±${Math.round(exp2)})`));
  await touch('touchEnd', []);
  await shot('07-pong-zwei-spieler');
  // Farbwechsel im Flug: Kontakt + genau ein Wechsel beim Überqueren der geplanten Linie
  await p.keyboard.press('Escape');
  await p.waitForSelector('#pause-overlay');
  await p.evaluate(() => window.__binokular.set({ bottom: 360, ball: { x: 370, y: 1060, vx: 0, vy: 500 }, speed: 520 }));
  const pre2 = await S(p);
  await p.click('#bm-resume');
  await p.waitForFunction((h) => window.__binokular.state().hits > h, pre2.hits, { timeout: 4000 });
  const afterHit = await S(p);
  check(afterHit.colorChanges === pre2.colorChanges + 1 && afterHit.flightYs.length <= 2 && afterHit.flightYs.every((y) => y > 300 && y < 980), tag(`Kontakt: Wechsel + ${afterHit.flightYs.length} Flugpositionen (${afterHit.flightYs.map(Math.round)}) geplant`));
  // zwei Linien erzwingen: jede wechselt beim Überqueren genau einmal
  await p.evaluate(() => window.__binokular.set({ flightYs: [880, 620] }));
  await p.waitForFunction(() => window.__binokular.state().flightYs.length === 0, null, { timeout: 4000 });
  const afterFlight = await S(p);
  check(afterFlight.colorChanges === afterHit.colorChanges + 2 && afterFlight.eye === afterHit.eye, tag('Flug: zwei Linien → genau zwei zusätzliche Wechsel (je Linie einmal)'));
  // Spielende nach Punkten (Ziel 2): oberer Schläger weg, Ball nach oben
  for (let i = 0; i < 2; i++) {
    await p.waitForFunction(() => !window.__binokular || window.__binokular.state().phase === 'play' || window.__binokular.state().phase === 'over', null, { timeout: 5000 });
    if (!(await p.evaluate(() => !!window.__binokular)) || (await S(p)).phase === 'over') break;
    await p.evaluate(() => window.__binokular.set({ top: 60, ball: { x: 600, y: 420, vx: 0, vy: -800 }, speed: 600 }));
    const sc0 = (await S(p)).score.bottom;
    await p.waitForFunction((n) => !window.__binokular || window.__binokular.state().score.bottom > n || document.querySelector('#end-facts'), sc0, { timeout: 4000 });
  }
  await p.waitForSelector('#end-facts', { timeout: 6000 });
  const pf2 = await p.locator('#end-facts').innerText();
  check(/Punkte \(du : Gegner\)\s*2 : \d/.test(pf2), tag(`Spielende bei 2 Punkten: ${pf2.replace(/\s+/g, ' ').slice(0, 90)}`));
  st = await store(p);
  const n4 = st.sessions[st.sessions.length - 1];
  check(n4.gameId === 'pong' && n4.endReason === 'score' && n4.completed && n4.points === 2 && n4.details.twoPlayer === 1 && n4.colorChanges >= 2, tag('Pong-Session gespeichert (Spielende)'));
  await shot('08-pong-ende');

  // ============ 7 Beschwerden-Knopf, Verlauf ============
  await p.click('#bm-again');
  await p.waitForSelector('.bm-game[data-game="pong"]');
  await p.click('#bm-complaints');
  await p.waitForSelector('#end-complaints');
  check((await store(p)).sessions.at(-1).endReason === 'complaints', tag('Beschwerden-Knopf beendet die Session mit Hinweis'));
  await p.click('#bm-to-history');
  await p.waitForSelector('#history-charts');
  st = await store(p);
  const rows = await p.locator('#history-table tbody tr').count();
  check(rows === st.sessions.length && rows === 5, tag(`Verlauf: ${rows} Sessions in der Tabelle`));
  const games = await p.locator('#history-table tbody tr td:nth-child(3)').allInnerTexts();
  check(games.includes('Nachzeichnen') && games.includes('Farbwechsel-Pong'), tag(`Verlauf: beide Spiele (${[...new Set(games)].join(', ')})`));
  check((await p.locator('#history-charts svg').count()) >= 3, tag('Verlauf: Diagramme'));
  await shot('09-verlauf');
  await noHScroll(p, tag('Verlauf'));
  const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#bm-csv')]);
  const csvPath = `${out}/${sz.name}-sessions.csv`;
  await dl.saveAs(csvPath);
  const csv = fs.readFileSync(csvPath, 'utf8');
  check(csv.split('\r\n').filter(Boolean).length === 6 && csv.includes('Farbwechsel') && csv.includes('Nachzeichnen') && csv.includes('accuracy='), tag('CSV-Export: Kopf + 5 Sessions'));

  // ============ 7b Level 4 (Schleife) ohne Level-Automatik ============
  await p.evaluate(() => {
    const x = JSON.parse(localStorage.getItem('binokular:v1'));
    Object.assign(x.games.nachzeichnen, { startLevel: 4, autoLevel: false, errorLimit: 0, pathWidth: 16, changeMode: 'HARD' });
    localStorage.setItem('binokular:v1', JSON.stringify(x));
  });
  await p.goto(`${base}binokular/?game=nachzeichnen&debug=1&seed=11`, { waitUntil: 'networkidle' });
  await p.waitForFunction(() => window.__binokular && window.__binokular.state().game);
  await p.waitForTimeout(450);
  const l4 = await S(p);
  const crossings = (pts) => {
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      for (let j = i + 20; j < pts.length - 1; j++) {
        const [a, b2, c, d] = [pts[i], pts[i + 1], pts[j], pts[j + 1]];
        const den = (b2[0] - a[0]) * (d[1] - c[1]) - (b2[1] - a[1]) * (d[0] - c[0]);
        if (Math.abs(den) < 1e-12) continue;
        const t = ((c[0] - a[0]) * (d[1] - c[1]) - (c[1] - a[1]) * (d[0] - c[0])) / den;
        const u = ((c[0] - a[0]) * (b2[1] - a[1]) - (c[1] - a[1]) * (b2[0] - a[0])) / den;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
          const x = a[0] + (b2[0] - a[0]) * t;
          const y = a[1] + (b2[1] - a[1]) * t;
          if (!out.some((o) => Math.hypot(o[0] - x, o[1] - y) < 12)) out.push([x, y]);
        }
      }
    }
    return out;
  };
  check(l4.level === 4 && l4.complexity.curls === 1 && l4.curls === 1 && crossings(l4.path).length === 1, tag(`Level 4: Pfad mit einer Schleife (${crossings(l4.path).length} Selbstkreuzung)`));
  await shot('10-level4-schleife');
  const m4 = await mapper(p, 1280, 720);
  const sc4 = m4(l4.path[0][0], l4.path[0][1]);
  await p.mouse.move(sc4.x, sc4.y);
  await p.mouse.down();
  await dragAlong(p, m4, l4.path, 4, l4.path.length - 1);
  await p.waitForSelector('#game-card[data-card="goal"]', { timeout: 6000 });
  await p.mouse.up();
  const g4 = await S(p);
  check(g4.errors === 0 && g4.levels[0].completed, tag('Level 4: ganze Schleife nachgezeichnet, kein Fehler (Fortschritt springt an der Kreuzung nicht)'));
  check((await p.locator('#game-card-title').innerText()) === 'Geschafft' && (await p.locator('#game-card').innerText()).includes('neuen Pfad in Level 4'), tag('ohne Automatik: „Geschafft“, neuer Pfad im selben Level'));
  await p.click('#bm-card-next');
  await p.waitForFunction(() => window.__binokular.state().awaiting === null, null, { timeout: 3000 });
  const n4b = await S(p);
  check(n4b.level === 4 && JSON.stringify(n4b.path) !== JSON.stringify(l4.path), tag('Weiter ohne Automatik: Level 4 bleibt, neuer Pfad'));
  await p.click('button[data-action="newPath"]');
  const n4c = await S(p);
  check(n4c.level === 4 && JSON.stringify(n4c.path) !== JSON.stringify(n4b.path), tag('„Neuer Pfad“: neuer Pfad desselben Levels'));
  await p.keyboard.press('Escape');
  await p.waitForSelector('#pause-overlay');
  await p.click('#bm-end');
  await p.waitForSelector('#end-levels');
  const rows4 = await p.locator('#end-levels tbody tr').allInnerTexts();
  check(rows4.length === 1 && /^4\s/.test(rows4[0]), tag(`Levelliste: ${rows4.map((r) => r.replace(/\s+/g, ' ')).join(' | ')}`));
  check((await store(p)).nachMaxLevel === 4, tag('Höchstes Level 4 gespeichert'));

  // ============ 9 Ziehen & Ablegen (zwei Farben) ============
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.click('#bm-therapist');
  await p.fill('#bm-pin-input', '726');
  await p.click('#bm-pin-ok');
  await p.waitForSelector('#therapist-form');
  check((await p.locator('#sec-za').count()) === 1, tag('Therapeutenbereich: Abschnitt „Ziehen & Ablegen“'));
  check((await store(p)).games['ziehen-ablegen'].rounds === 20 && (await store(p)).games['ziehen-ablegen'].roles === 'ALTERNATE', tag('Standard: 20 Runden, Rollen wechselnd'));
  await p.fill('#z-ring', '999');
  await p.locator('#z-ring').blur();
  check((await store(p)).games['ziehen-ablegen'].ringScale === 150, tag('Ringgröße 999 % wird auf 150 begrenzt'));
  await p.fill('#z-ring', '100');
  await p.locator('#z-ring').blur();
  await p.fill('#z-rounds', '4');
  await p.locator('#z-rounds').blur();
  check((await store(p)).games['ziehen-ablegen'].rounds === 4 && (await store(p)).games['ziehen-ablegen'].ringScale === 100, tag('Runden pro Sitzung: 4'));
  await p.click('.bm-head .bm-btn-ghost');
  await p.waitForSelector('#game-cards');
  await openGame(p, 'ziehen-ablegen', tag);
  await noHScroll(p, tag('Ziehen & Ablegen'));
  st = await store(p);
  let z = await S(p);
  const zm = await mapper(p, 1280, 720);
  const zcv = p.locator('#bm-canvas');
  check(z.game === 'ziehen-ablegen' && z.seed === SEED && z.phase === 'wait' && z.level === 1 && z.total === 4, tag(`Ziehen & Ablegen: Level ${z.level}, Seed ${z.seed}`));
  check(z.ball.r >= 22 && z.ring.stroke >= 8 && z.offset > z.ball.r, tag(`Maße: Ball ${z.ball.r} px, Ringlinie ${z.ring.stroke} px, Offset ${z.offset} px`));
  check(z.roles.ball !== z.roles.ring && ['AMBLYOPIC', 'FELLOW'].includes(z.roles.ball) && ['AMBLYOPIC', 'FELLOW'].includes(z.roles.ring), tag(`Ball (${z.roles.ball}) und Ring (${z.roles.ring}) in verschiedenen Augenfarben`));
  check((await p.locator('#hud-level').innerText()).includes('1') && (await p.locator('#hud-hits').count()) === 1 && (await p.locator('#hud-misses').count()) === 1 && (await p.locator('#hud-round').innerText()).includes('1/4'), tag('Live-Anzeige: Level, Treffer, Fehler, Runde'));
  const zhud = await p.locator('#hud-level').evaluate((el) => getComputedStyle(el).color);
  check(zhud === 'rgb(136, 136, 136)', tag(`Level-Anzeige grau (${zhud})`));
  check((await p.locator('#bm-msg').innerText()).includes('Bildschirm berühren'), tag('Hinweis zu Beginn (grau)'));
  // Pixel: Ball und Ring in den Profilfarben ihrer Augenklassen (Spiel kurz anhalten, Positionen setzen)
  await p.keyboard.press('Escape');
  await p.waitForSelector('#pause-overlay');
  await p.evaluate(() => window.__binokular.set({ ring: { x: 640, y: 330 }, rest: { x: 220, y: 520 }, speed: 0 }));
  await p.waitForTimeout(200);
  z = await S(p);
  const ballPix = zm(z.ball.x, z.ball.y);
  const ringPix = zm(z.ring.x + z.ring.R, z.ring.y);
  const zbox = await zcv.boundingBox();
  const zbg = await pixelAt(p, zbox.x + 1, zbox.y + 1);
  const zBallPx = await pixelAt(p, ballPix.x, ballPix.y);
  const zRingPx = await pixelAt(p, ringPix.x, ringPix.y);
  check(near(zbg, bgOf(st), 1), tag(`Hintergrund-Pixel ${hexOf(zbg)}`));
  check(near(zBallPx, expectedColor(st, z.roles.ball), 8), tag(`Ball-Pixel ${hexOf(zBallPx)} = Farbe ${z.roles.ball} ${hexOf(expectedColor(st, z.roles.ball))}`));
  check(near(zRingPx, expectedColor(st, z.roles.ring), 8), tag(`Ring-Pixel ${hexOf(zRingPx)} = Farbe ${z.roles.ring} ${hexOf(expectedColor(st, z.roles.ring))}`));
  check(!near(zBallPx, zRingPx, 20), tag('Ball und Ring haben verschiedene Farben'));
  await shot('10-ziehen-ablegen');
  await p.click('#bm-resume');
  await p.waitForTimeout(100);

  const gx = async (tx, ty, mode) => {
    // Finger so setzen, dass die Ballmitte bei (tx, ty) liegt: Finger = Ball + Offset nach unten
    const off = (await S(p)).offset;
    const a = zm(tx - 160, ty + off + 20);
    const bb = zm(tx, ty + off);
    if (mode === 'mouse') {
      await p.mouse.move(a.x, a.y);
      await p.mouse.down();
      await p.mouse.move((a.x + bb.x) / 2, (a.y + bb.y) / 2);
      await p.mouse.move(bb.x, bb.y);
      await p.waitForTimeout(60);
      await p.mouse.up();
    } else {
      await touch('touchStart', [[1, a.x, a.y]]);
      await touch('touchMove', [[1, (a.x + bb.x) / 2, (a.y + bb.y) / 2]]);
      await touch('touchMove', [[1, bb.x, bb.y]]);
      await p.waitForTimeout(60);
      await touch('touchEnd', []);
    }
  };
  const nextRound = (n) => p.waitForFunction((n) => window.__binokular.state().phase === 'wait' && window.__binokular.state().rounds === n, n, { timeout: 4000 });
  const freeze = async (x = 640, y = 330) => {
    await p.evaluate(([x, y]) => window.__binokular.set({ ring: { x, y }, speed: 0 }), [x, y]);
  };
  const role0 = z.roles.ball;

  // Runde 1: Treffer mit der Maus (Ball folgt dem Finger mit Versatz nach oben)
  await freeze();
  const f0 = zm(300, 600);
  await p.mouse.move(f0.x, f0.y);
  await p.mouse.down();
  z = await S(p);
  check(z.phase === 'drag' && Math.abs(z.ball.x - 300) < 1.5 && Math.abs(z.ball.y - (600 - z.offset)) < 1.5, tag(`Ball erscheint ${z.offset} px über dem Finger`));
  const f1 = zm(520, 600);
  const f2 = zm(640, 330 + z.offset);
  await p.mouse.move(f1.x, f1.y);
  await p.mouse.move(f2.x, f2.y);
  await p.waitForTimeout(260);
  await p.mouse.up();
  z = await S(p);
  check(z.phase === 'fb' && z.rounds === 1 && z.hits === 1 && z.outcome === 'hit' && z.points > 0, tag(`Treffer gezählt (Punkte ${z.points})`));
  const edge = zm(5, 360);
  const gray = (d) => Math.abs(d[0] - d[1]) <= 2 && Math.abs(d[1] - d[2]) <= 2 && d[0] >= 0x70 && d[0] <= 0x90;
  const zflash = await waitPixel(p, edge.x, edge.y, gray, 700);
  check(zflash.ok, tag(`Treffer: grauer Rahmen (${hexOf(zflash.px)})`));
  await p.waitForTimeout(400);
  check((await p.locator('#hud-hits').innerText()).includes('1'), tag('Live-Anzeige: Treffer 1'));
  await nextRound(1);
  z = await S(p);
  check(z.roleSwaps === 1 && z.roles.ball !== role0, tag(`Rollenwechsel nach der Runde: Ball ${role0} → ${z.roles.ball}`));
  check(z.level === 1 && z.phase === 'wait', tag('nächste Runde bereit, Level 1'));

  // Runde 2: daneben (Maus)
  await freeze();
  await gx(1100, 560, 'mouse');
  z = await S(p);
  check(z.rounds === 2 && z.misses === 1 && z.outcome === 'miss' && z.hits === 1, tag('Fehlwurf: Fehler gezählt'));
  const mflash = await waitPixel(p, edge.x, edge.y, gray, 700);
  check(mflash.ok, tag(`Fehler: grauer Rahmen (${hexOf(mflash.px)})`));
  const dm = await p.waitForFunction(() => (document.querySelector('#bm-msg')?.textContent ?? '').includes('Daneben'), null, { timeout: 1500 }).then(() => true, () => false);
  check(dm, tag('Hinweis „Daneben“ (grau)'));
  await nextRound(2);
  z = await S(p);
  check(z.roleSwaps === 2 && z.roles.ball === role0, tag('zweiter Rollenwechsel: wieder die Ausgangsrolle'));

  // Runde 3: zu spät
  await freeze();
  await p.evaluate(() => window.__binokular.set({ elapsedMs: window.__binokular.state().limitMs - 30 }));
  await p.waitForFunction(() => window.__binokular.state().rounds === 3, null, { timeout: 3000 });
  z = await S(p);
  check(z.outcome === 'late' && z.misses === 2 && z.late === 1, tag('Zeitfenster überschritten: Fehler „zu spät“'));
  await nextRound(3);

  // Runde 4: Treffer per Touch (CDP) → Spielende nach 4 Runden
  await freeze(700, 300);
  await gx(700, 300, 'touch');
  await p.waitForSelector('#end-facts', { timeout: 6000 });
  const zf = await p.locator('#end-facts').innerText();
  check(/Ziehen & Ablegen/.test(zf) && /Runden\s*4/.test(zf) && /Treffer\s*2/.test(zf) && /Höchstes Level\s*1/.test(zf) && /Rollenwechsel\s*3/.test(zf) && /Mittlere Zeit/.test(zf), tag(`Zusammenfassung: ${zf.replace(/\s+/g, ' ').slice(0, 160)}`));
  st = await store(p);
  const nz = st.sessions[st.sessions.length - 1];
  check(nz.gameId === 'ziehen-ablegen' && nz.endReason === 'goal' && nz.completed && nz.errors === 2 && nz.points > 0 && nz.details.hits === 2 && nz.details.rounds === 4 && nz.details.late === 1 && nz.details.roleSwaps === 3 && nz.colorChanges === 3, tag(`Session gespeichert: ${JSON.stringify(nz.details)}`));
  await shot('11-ziehen-ablegen-ende');
  await noHScroll(p, tag('Zusammenfassung Ziehen & Ablegen'));
  await p.click('#bm-to-history');
  await p.waitForSelector('#history-table');
  const gz = await p.locator('#history-table tbody tr td:nth-child(3)').allInnerTexts();
  check(gz.includes('Ziehen & Ablegen'), tag('Verlauf: Ziehen & Ablegen'));
  const [dl2] = await Promise.all([p.waitForEvent('download'), p.click('#bm-csv')]);
  await dl2.saveAs(`${out}/${sz.name}-sessions2.csv`);
  const csv2 = fs.readFileSync(`${out}/${sz.name}-sessions2.csv`, 'utf8');
  check(csv2.includes('Ziehen & Ablegen') && csv2.includes('maxLevel=1'), tag('CSV: Ziehen & Ablegen mit Spielwerten'));

  // ============ 8 Auflösung: devicePixelRatio höchstens 2 ============
  if (first) {
    const hc = await b.newContext({ viewport: { width: sz.width, height: sz.height }, deviceScaleFactor: 3, hasTouch: true });
    const hp = await hc.newPage();
    await hp.goto(`${base}binokular/?game=pong&debug=1&seed=3`, { waitUntil: 'networkidle' });
    await hp.waitForSelector('.bm-game');
    const ratio = await hp.locator('#bm-canvas').evaluate((c) => c.width / c.clientWidth);
    check(ratio <= 2.01 && ratio > 1.9, tag(`devicePixelRatio 3 → Canvas-Auflösung ×${ratio.toFixed(2)} (höchstens 2)`));
    await hc.close();
  }
  await ctx.close();
}

await b.close();
console.log('Konsolenfehler:', errs.length ? errs : 'keine');
console.log(problems.length ? `${problems.length} Probleme` : 'alles in Ordnung');
process.exit(errs.length || problems.length ? 1 : 0);
