// E2E „Binocular Mine“ (/binokular/): Start (Ton-Einstellung) → Kalibrierung (Messbild, zwei synthetische Fotos
// mit je fünf angetippten Feldern, Berechnung = reines Blau, Regler der Feinabstimmung, Profil speichern, Kontrolle)
// → Augen/Farben mit Profilauswahl → Levelauswahl →
// Level 1 mit ?autoplay=1 bis zum Abschluss → „Nächstes Level“ (Session läuft weiter) → Level 2 → Session-Ende →
// Verlauf (+ CSV) → Therapeutenbereich mit PIN (alle Level freischalten, Ton-Voreinstellung) → Levelauswahl.
// Danach je Level ?autoplay=1&level=N&sound=1 bis zum Abschluss (alle 10, mit Ton). Zusätzlich (Desktop):
// Debug-Ansichten, Kontrollaufgabe, Beschwerden-Knopf; (Handy) Kamera in der großen Mine.
// Drei Querformat-Größen, keine Konsolenfehler, kein waagrechtes Scrollen, Felder ≥ 48 px, Spielfeld-Hintergrund =
// Hintergrund des gespeicherten Profils, Texte im Spiel grau.
// Voraussetzung: `npm run build && npx vite preview` (Port 4173). Aufruf: node tests/e2e/binokular.mjs
// Optional: BASE=http://localhost:4319/ OUT=/tmp/shots LEVELS=1,6,9 SIZES=tablet
import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.env.BASE ?? 'http://localhost:4173/';
const out = process.env.OUT ?? '/tmp/binokular-shots';
const onlyLevels = process.env.LEVELS ? process.env.LEVELS.split(',').map(Number) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
fs.mkdirSync(out, { recursive: true });

const SAFETY =
  'Diese Software ist ein Forschungs-/Trainingsprototyp. Sie ersetzt keine augenärztliche oder optometrische Untersuchung und ist nicht als eigenständige Behandlung von Amblyopie validiert.';

const allSizes = [
  { name: 'tablet', width: 1180, height: 820 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'phone', width: 844, height: 390 },
];
const sizes = process.env.SIZES ? allSizes.filter((s) => process.env.SIZES.split(',').includes(s.name)) : allSizes;

const errs = [];
const problems = [];
const check = (ok, msg) => {
  if (!ok) problems.push(msg);
  console.log(`${ok ? 'ok  ' : 'FEHL'} ${msg}`);
};

// zählt erzeugte Töne (Web Audio), ohne den Klang zu verändern
const countOscillators = () => {
  window.__osc = 0;
  const C = window.AudioContext;
  if (!C) return;
  window.AudioContext = class extends C {
    createOscillator() {
      window.__osc++;
      return super.createOscillator();
    }
  };
};

const b = await chromium.launch();

async function noHScroll(p, where) {
  const r = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, w: window.innerWidth }));
  check(r.sw <= r.w, `${where}: kein waagrechtes Scrollen (${r.sw} ≤ ${r.w})`);
}

async function calibrateIfAsked(p) {
  await p.waitForSelector('#cal-play-defaults, #setup-summary');
  if (await p.locator('#cal-play-defaults').count()) await p.click('#cal-play-defaults');
  await p.waitForSelector('#setup-summary');
}

// synthetisches Foto des Messbilds (PNG, im Browser erzeugt): fünf Felder Weiß, Rot, Grün, Blau, Schwarz.
// Kamerafarben einer typischen Rot-Cyan-Brille: Rotglas lässt viel Grün durch, Cyanglas Blau gut.
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
      fields.forEach(([r, gg, b], i) => {
        g.fillStyle = `rgb(${r},${gg},${b})`;
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

for (const sz of sizes) {
  const ctx = await b.newContext({ viewport: { width: sz.width, height: sz.height }, acceptDownloads: true, hasTouch: sz.name !== 'desktop' });
  await ctx.addInitScript(countOscillators);
  const p = await ctx.newPage();
  const tag = (s) => `${sz.name} ${s}`;
  p.on('pageerror', (e) => errs.push(`${sz.name} pageerror ${e.message}`));
  p.on('console', (m) => m.type() === 'error' && errs.push(`${sz.name} console ${m.text()}`));
  const shot = async (n) => {
    await p.waitForTimeout(300); // weiche Einblendungen abwarten
    await p.screenshot({ path: `${out}/${sz.name}-${n}.png` });
  };

  // 1 Start mit Ton-Einstellung
  await p.goto(`${base}binokular/?autoplay=1`, { waitUntil: 'networkidle' });
  check((await p.locator('[data-testid="safety-notice"]').first().innerText()).trim() === SAFETY, tag('Start: Sicherheitshinweis im Wortlaut'));
  check((await p.locator('#sound-controls input[name="bm-volume"]').count()) === 3 && (await p.locator('#bm-sound-on').isChecked()), tag('Start: Ton an, drei Lautstärken'));
  await p.click('#sound-controls label:has(input[value="LOW"])');
  check(await p.locator('#sound-controls label:has(input[value="LOW"])').evaluate((el) => el.classList.contains('is-on')), tag('Start: Lautstärke „leise“ gewählt'));
  await noHScroll(p, tag('Start'));
  await shot('01-start');

  // 2 Kalibrierung (beim ersten Start automatisch): Schritte 0–6 mit synthetischen Fotos
  await p.click('#bm-start');
  await p.waitForSelector('#cal-profiles');
  check((await p.locator('#cal-profile option').count()) === 2, tag('Kalibrierung: zwei Startprofile'));
  check(await p.locator('#cal-delete').isDisabled(), tag('Startprofil nicht löschbar'));
  check((await p.locator('#cal-step').getAttribute('data-step')) === 'prep', tag('Schritt 0 Vorbereitung'));
  await shot('02-kalibrierung');
  await noHScroll(p, tag('Kalibrierung'));
  await p.click('#cal-next');
  await p.click('#cal-pattern-open');
  await p.waitForSelector('#cal-pattern');
  const fields = await p.locator('#cal-pattern .bm-pattern-field').evaluateAll((els) => els.map((e) => getComputedStyle(e).backgroundColor));
  check(fields.join('|') === 'rgb(255, 255, 255)|rgb(255, 0, 0)|rgb(0, 255, 0)|rgb(0, 0, 255)|rgb(0, 0, 0)', tag(`Messbild: fünf Felder (${fields.join(' ')})`));
  await shot('02b-messbild');
  await p.keyboard.press('Escape');
  await p.waitForSelector('#cal-pattern', { state: 'detached' });
  // Schritt 2: HEIC wird verständlich abgewiesen, dann das Foto durch das rote Glas
  await p.click('#cal-next');
  await p.setInputFiles('#photo-red-file', { name: 'IMG_0001.HEIC', mimeType: 'image/heic', buffer: Buffer.from('....ftypheic0000') });
  await p.waitForSelector('#photo-red-error');
  check((await p.locator('#photo-red-error').innerText()).includes('HEIC'), tag('HEIC-Foto: verständliche Meldung'));
  await p.setInputFiles('#photo-red-file', { name: 'rotes-glas.png', mimeType: 'image/png', buffer: await photoPng(p, RED_FIELDS) });
  await p.waitForSelector('#photo-red-canvas');
  await tapFields(p, 'photo-red');
  check((await p.locator('#photo-red-table tbody tr').count()) === 5, tag('rotes Glas: fünf Felder ausgewertet'));
  await p.click('#photo-red-reset');
  check((await p.locator('#photo-red-table').count()) === 0, tag('Zurücksetzen löscht die Markierungen'));
  await tapFields(p, 'photo-red');
  await p.waitForSelector('#photo-red-result');
  await shot('03-foto-rot');
  await noHScroll(p, tag('Foto rotes Glas'));
  // Schritt 3: Foto durch das cyane Glas
  await p.click('#cal-next');
  await p.setInputFiles('#photo-second-file', { name: 'cyanes-glas.png', mimeType: 'image/png', buffer: await photoPng(p, CYAN_FIELDS) });
  await p.waitForSelector('#photo-second-canvas');
  await tapFields(p, 'photo-second');
  await p.waitForSelector('#photo-second-result');
  // Schritt 4: Berechnung → reines Blau
  await p.click('#cal-next');
  await p.waitForSelector('#cal-candidates');
  const second = await p.locator('#cal-res-second').getAttribute('data-hex');
  const calcBg = await p.locator('#cal-res-bg').getAttribute('data-hex');
  check(second === '#0000FF', tag(`Berechnung: Zweitfarbe ${second} (reines Blau)`));
  check(/^#[0-9A-F]{2}00[0-9A-F]{2}$/.test(calcBg) && calcBg !== '#000000', tag(`Berechnung: kompensierter Hintergrund ${calcBg}`));
  check((await p.locator('#cal-candidates tr[data-chosen]').count()) === 1 && (await p.locator('#cal-crosstalk li').count()) === 3, tag('Kandidaten mit Auswahl, Übersprechen (3 Werte)'));
  await shot('04-berechnung');
  await noHScroll(p, tag('Berechnung'));
  // Schritt 5: Feinabstimmung mit Reglern
  await p.click('#cal-apply');
  await p.waitForSelector('#fine-preview');
  check((await p.locator('#fine-res-bg').getAttribute('data-hex')) === calcBg, tag('Feinabstimmung startet mit den berechneten Werten'));
  await setRange(p, '#fine-bg-red', 30);
  await setRange(p, '#fine-bg-second', 20);
  const fineBg = await p.locator('#fine-res-bg').getAttribute('data-hex');
  check(fineBg === '#1E0014', tag(`Regler: Hintergrund rot 30, Zweitfarbe 20 → ${fineBg}`));
  await setRange(p, '#fine-second', 80);
  const fineSecond = await p.locator('#fine-res-second').getAttribute('data-hex');
  check(fineSecond !== '#0000FF' && /^#0000[0-9A-F]{2}$/.test(fineSecond), tag(`Regler: Helligkeit der Zweitfarbe → ${fineSecond}`));
  await p.waitForTimeout(100);
  const prevPx = hexOf(await canvasPixel(p, '#fine-preview', 2, 2));
  check(prevPx === fineBg, tag(`Vorschau: Hintergrund ${prevPx}`));
  await p.click('#fine-reset');
  check((await p.locator('#fine-res-bg').getAttribute('data-hex')) === calcBg, tag('„Startwerte“ setzt auf die Berechnung zurück'));
  await setRange(p, '#fine-bg-red', 30);
  await setRange(p, '#fine-bg-second', 20);
  await shot('05-feinabstimmung');
  await noHScroll(p, tag('Feinabstimmung'));
  await p.fill('#fine-name', 'E2E Brille');
  await p.click('#fine-save');
  await p.waitForSelector('#cal-question');
  check((await p.locator('#cal-note').innerText()).includes('E2E Brille'), tag('Profil gespeichert'));
  const st0 = await p.evaluate(() => JSON.parse(localStorage.getItem('binokular:v1')));
  const saved = st0.profiles.find((x) => x.name === 'E2E Brille');
  check(saved && st0.activeProfileId === saved.id && saved.source === 'photo' && saved.measurement && saved.background.r === 30 && saved.background.b === 20, tag('gespeichert: Profil mit Messwerten, aktiv'));
  // Kontrolle der Zuordnung (Profilfarben auf Profilhintergrund)
  const chkPx = hexOf(await canvasPixel(p, '[data-testid="cal-canvas"]', 2, 2));
  check(chkPx === fineBg, tag(`Kontrolle: Hintergrund ${chkPx}`));
  for (const a of ['left', 'right', 'both']) await p.click(`.bm-cal-step button[data-answer="${a}"]`);
  await p.waitForSelector('#cal-done');
  await shot('06-kontrolle');
  await p.click('#cal-continue');

  // 3 Augen/Farben: Profilauswahl beim Spielstart, amblyopes Auge rechts
  await p.waitForSelector('#setup-summary');
  check((await p.locator('#setup-profile-list .bm-profile').count()) === 3, tag('Setup: drei Profile zur Auswahl'));
  check((await p.locator('#setup-profile-list .bm-profile.is-on').innerText()).includes('E2E Brille'), tag('Setup: gespeichertes Profil aktiv'));
  await p.click('#setup-profile-list label:has(input[value="start-red-green"])');
  check((await p.locator('#setup-summary').innerText()).includes('grünen'), tag('Setup: Startprofil Rot-Grün wählbar'));
  await p.click(`#setup-profile-list label:has(input[value="${saved.id}"])`);
  await p.click('label.bm-chip:has(input[name="amb-eye"][value="RIGHT"])');
  const summary = await p.locator('#setup-summary').innerText();
  check(/amblyope Auge \(rechts\) sieht die blauen/.test(summary), tag(`Setup-Zusammenfassung: ${summary}`));
  await shot('04-setup');
  await noHScroll(p, tag('Setup'));
  await p.click('#bm-play');

  // 4 Levelauswahl: 10 Level, nur Level 1 frei
  await p.waitForSelector('#level-grid');
  const cards = await p.locator('#level-grid .bm-level').count();
  const locked = await p.locator('#level-grid .bm-level:disabled').count();
  check(cards === 10 && locked === 9, tag(`Levelauswahl: ${cards} Level, ${locked} gesperrt`));
  await shot('05-levelauswahl');
  await noHScroll(p, tag('Levelauswahl'));
  await p.click('#bm-play-level');

  // 5 Level 1 mit Automatik bis zum Abschluss
  await p.waitForSelector('.bm-game');
  await p.waitForTimeout(2500);
  await shot('06-spiel');
  await noHScroll(p, tag('Spiel'));
  check(await p.locator('#bm-complaints').isVisible(), tag('Beschwerden-Knopf sichtbar'));
  check(await p.locator('#bm-sound').isVisible(), tag('Ton-Knopf im Spiel sichtbar'));
  const hud = await p.locator('#hud-session').innerText();
  check(/Session \d\d:\d\d \/ 30:00/.test(hud), tag(`HUD „${hud}“`));
  check(Number(await p.locator('.bm-stage').getAttribute('data-cell')) >= 48, tag('Level 1: Felder ≥ 48 px'));
  check((await p.locator('.bm-game').getAttribute('data-profile')) === saved.id, tag('Spiel nutzt das gewählte Profil'));
  const gamePx = hexOf(await canvasPixel(p, '.bm-canvas', 1, 1));
  check(gamePx === fineBg, tag(`Spielfeld-Hintergrund ${gamePx} = Profil ${fineBg}`));
  const hudColor = await p.locator('#hud-session').evaluate((el) => getComputedStyle(el).color);
  check(hudColor === 'rgb(136, 136, 136)', tag(`HUD-Text grau (${hudColor})`));
  await p.waitForSelector('#level-end', { timeout: 90000 });
  await p.waitForTimeout(300);
  let stars = Number(await p.locator('.bm-stars').getAttribute('data-stars'));
  check(stars === 3, tag(`Level 1 abgeschlossen mit ${stars} Sternen`));
  check((await p.locator('#bm-next').innerText()).includes('Nächstes Level'), tag('Knopf „Nächstes Level“'));
  await shot('07-level-ende');
  await noHScroll(p, tag('Level-Ende'));

  // 6 Nächstes Level: Session läuft weiter
  const before = await p.locator('#hud-session').innerText();
  await p.click('#bm-next');
  await p.waitForSelector('.bm-game[data-level="2"][data-phase="playing"]');
  check((await p.locator('#hud-session').innerText()) >= before, tag('Session läuft über den Levelwechsel weiter'));
  await p.waitForSelector('#level-end', { timeout: 90000 });
  stars = Number(await p.locator('.bm-stars').getAttribute('data-stars'));
  check(stars === 3, tag(`Level 2 abgeschlossen mit ${stars} Sternen`));
  await p.click('#bm-choose');
  await p.waitForSelector('#choose-level');
  check((await p.locator('#choose-level .bm-level:disabled').count()) === 7, tag('Levelauswahl im Spiel: Level 1–3 frei'));
  await shot('08-levelauswahl-im-spiel');
  await p.click('#choose-level .bm-actions .bm-btn');

  // 7 Session-Ende
  await p.click('#bm-end');
  await p.waitForSelector('#end-facts');
  const facts = await p.locator('#end-facts').innerText();
  check(/2 gespielt, 2 geschafft \(höchstes: 2\)/.test(facts) && /24,2 %/.test(facts), tag('Session-Ende: 2 Level, Kontrast 20 → 22 → 24,2 %'));
  await shot('09-session-ende');
  await noHScroll(p, tag('Session-Ende'));

  // 8 Verlauf mit Diagrammen, Levelspalte und CSV
  await p.click('#bm-to-history');
  await p.waitForSelector('#history-charts');
  check((await p.locator('#history-charts svg').count()) >= 3, tag('Verlauf: Diagramme vorhanden'));
  check((await p.locator('.bm-levelcell').first().innerText()).includes('1 ★★★ · 2 ★★★'), tag('Verlauf: Level mit Sternen'));
  await shot('10-verlauf');
  await noHScroll(p, tag('Verlauf'));
  const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#bm-csv')]);
  const csvPath = `${out}/${sz.name}-sessions.csv`;
  await dl.saveAs(csvPath);
  const csv = fs.readFileSync(csvPath, 'utf8');
  check(csv.split('\r\n').filter(Boolean).length === 2 && csv.includes('Level-Details') && csv.includes('L2 geschafft, 3 Sterne'), tag('CSV-Export: Kopf + 1 Session mit Level-Details'));
  await p.click('.bm-head .bm-btn-ghost');

  // 9 Therapeutenbereich mit PIN
  await p.click('#bm-therapist');
  await p.fill('#bm-pin-input', '000');
  await p.click('#bm-pin-ok');
  check(await p.locator('.bm-error').isVisible(), tag('falsche PIN abgewiesen'));
  await p.fill('#bm-pin-input', '726');
  await p.click('#bm-pin-ok');
  await p.waitForSelector('#therapist-form');
  check((await p.locator('[data-testid="safety-notice"]').first().innerText()).trim() === SAFETY, tag('Therapeutenbereich: Sicherheitshinweis'));
  check((await p.locator('#f-fc').inputValue()) === '24.2', tag('Therapeutenbereich: fellowEyeContrast 24,2'));
  check((await p.locator('#unlocked-info').innerText()).includes('1–3'), tag('Therapeutenbereich: Level 1–3 frei'));
  await p.click('#bm-unlock-all');
  check((await p.locator('#unlocked-info').innerText()).includes('Alle Level'), tag('Therapeutenbereich: alle Level freigeschaltet'));
  await p.click('label.bm-chip:has(input[name="t-volume"][value="HIGH"])');
  await shot('11-therapeut');
  await noHScroll(p, tag('Therapeutenbereich'));
  const [jdl] = await Promise.all([p.waitForEvent('download'), p.click('#bm-export-json')]);
  const json = JSON.parse(fs.readFileSync(await jdl.path(), 'utf8'));
  check(json.format === 'binokular-einstellungen' && json.version === 2 && json.settings.amblyopicEye === 'RIGHT' && json.settings.soundVolume === 'HIGH', tag('JSON-Export der Einstellungen (mit Ton-Voreinstellung)'));
  check(json.activeProfileId === saved.id && json.profiles.length === 1 && json.profiles[0].name === 'E2E Brille', tag('JSON-Export enthält das eigene Profil'));
  check((await p.locator('#t-profile-info').innerText()).includes('E2E Brille'), tag('Therapeutenbereich: aktives Profil angezeigt'));
  const stored = await p.evaluate(() => JSON.parse(localStorage.getItem('binokular:v1')));
  check(stored.progress.unlocked === 10 && stored.audio === null && stored.settings.soundVolume === 'HIGH', tag('gespeichert: alle frei, Ton-Voreinstellung gilt'));
  await p.click('.bm-head .bm-btn-ghost');
  await p.click('#bm-start');
  await p.click('#bm-play');
  await p.waitForSelector('#level-grid');
  check((await p.locator('#level-grid .bm-level:disabled').count()) === 0, tag('Levelauswahl: alle Level wählbar'));

  // 10 jedes Level mit Automatik (und Ton) bis zum Abschluss
  for (const n of onlyLevels) {
    await p.goto(`${base}binokular/?autoplay=1&sound=1&level=${n}`, { waitUntil: 'networkidle' });
    await p.click('#bm-start');
    await calibrateIfAsked(p);
    await p.click('#bm-play');
    await p.waitForSelector(`.bm-game[data-level="${n}"]`);
    await p.waitForTimeout(1500);
    await shot(`L${String(n).padStart(2, '0')}-spiel`);
    const cell = Number(await p.locator('.bm-stage').getAttribute('data-cell'));
    check(cell >= 48, tag(`Level ${n}: Felder ${cell} px ≥ 48`));
    await noHScroll(p, tag(`Level ${n}`));
    const t0 = Date.now();
    await p.waitForSelector('#level-end', { timeout: 180000 });
    const st = Number(await p.locator('.bm-stars').getAttribute('data-stars'));
    check(st === 3, tag(`Level ${n} mit Automatik abgeschlossen: ${st} Sterne (${Math.round((Date.now() - t0) / 1000)} s)`));
    await shot(`L${String(n).padStart(2, '0')}-ende`);
    await p.click('#bm-end');
    await p.waitForSelector('#end-facts');
  }
  const osc = await p.evaluate(() => window.__osc ?? 0);
  check(osc > 0, tag(`Ton an: ${osc} Töne erzeugt, keine Fehler`));

  if (sz.name === 'desktop') {
    // Debug-Ansichten (Tasten 1–5) in Level 10, Klassenansicht mit allen neuen Objekten
    await p.goto(`${base}binokular/?debug=1&checkIn=8&level=10`, { waitUntil: 'networkidle' });
    await p.click('#bm-start');
    await calibrateIfAsked(p);
    await p.click('#bm-play');
    await p.waitForSelector('.bm-debugbar');
    for (const [k, n] of [['1', 'amblyop'], ['2', 'dominant'], ['4', 'filter-sim'], ['5', 'klassen']]) {
      await p.keyboard.press(k);
      await p.waitForTimeout(250);
      await shot(`12-debug-${k}-${n}`);
    }
    await p.keyboard.press('3');
    // Spieler tippt: Roboter 1 auswählen (Feldmitte aus dem Layout berechnet), Ton beim Auswählen
    const box = await p.locator('.bm-canvas').boundingBox();
    const [ox, oy] = (await p.locator('.bm-stage').getAttribute('data-cam')).split(',').map(Number);
    const cell = Number(await p.locator('.bm-stage').getAttribute('data-cell'));
    const o0 = await p.evaluate(() => window.__osc);
    await p.mouse.click(box.x + ox + 3.5 * cell, box.y + oy + 1.5 * cell);
    await p.waitForTimeout(200);
    check((await p.locator('#bm-msg').innerText()).includes('Roboter ausgewählt'), 'desktop Klick wählt Roboter');
    check((await p.evaluate(() => window.__osc)) > o0, 'desktop Auswahl erzeugt einen Ton');
    await p.mouse.click(box.x + ox + 4.5 * cell, box.y + oy + 1.5 * cell);
    // Kontrollaufgabe nach 8 s (sobald kein Roboter läuft), mit Hinweiston
    await p.waitForSelector('.bm-check', { timeout: 15000 });
    await p.waitForTimeout(500);
    await shot('13-kontrollaufgabe');
    await p.click('.bm-check button[data-shape="none"]');
    check((await p.locator('.bm-game').getAttribute('data-phase')) === 'playing', 'desktop Kontrollaufgabe beantwortet, Spiel läuft weiter');
    // Ton-Knopf im Spiel schaltet die Stufen durch und speichert
    await p.click('#bm-sound');
    const a1 = await p.evaluate(() => JSON.parse(localStorage.getItem('binokular:v1')).audio);
    check(a1 && a1.on === false, `desktop Ton-Knopf: aus (${JSON.stringify(a1)})`);
    await p.click('#bm-sound');
    // Beschwerden → Session-Ende mit Hinweis
    await p.click('#bm-complaints');
    await p.waitForSelector('#end-complaints');
    await shot('14-beschwerden');
    const st2 = await p.evaluate(() => JSON.parse(localStorage.getItem('binokular:v1')));
    const lastS = st2.sessions[st2.sessions.length - 1];
    check(lastS.endReason === 'complaints' && lastS.suppressionChecks.length === 1 && lastS.attempts[0].levelNumber === 10, 'desktop Session gespeichert (Beschwerden, 1 Kontrolle, Level 10)');
  }

  if (sz.name === 'phone') {
    // große Mine: Kamera-Ausschnitt, Ziehen verschiebt, Felder bleiben 48 px
    await p.goto(`${base}binokular/?level=9`, { waitUntil: 'networkidle' });
    await p.click('#bm-start');
    await calibrateIfAsked(p);
    await p.click('#bm-play');
    await p.waitForSelector('.bm-game[data-level="9"]');
    await p.waitForTimeout(600);
    const cam0 = await p.locator('.bm-stage').getAttribute('data-cam');
    const box = await p.locator('.bm-canvas').boundingBox();
    await p.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.5);
    await p.mouse.down();
    await p.mouse.move(box.x + box.width * 0.4, box.y + box.height * 0.3, { steps: 8 });
    await p.mouse.up();
    await p.waitForTimeout(300);
    const cam1 = await p.locator('.bm-stage').getAttribute('data-cam');
    check(cam0 !== cam1 && Number(cam1.split(',')[0]) < Number(cam0.split(',')[0]), `phone Kamera verschoben (${cam0} → ${cam1})`);
    check(Number(await p.locator('.bm-stage').getAttribute('data-cell')) === 48, 'phone große Mine: Felder 48 px');
    await shot('15-kamera-gezogen');
  }
  await ctx.close();
}

// Hochformat-Hinweis
const pc = await b.newContext({ viewport: { width: 820, height: 1180 } });
const pp = await pc.newPage();
await pp.goto(`${base}binokular/`, { waitUntil: 'networkidle' });
check(await pp.locator('.bm-rotate').isVisible(), 'Hochformat: Hinweis „bitte quer halten“');
await pp.screenshot({ path: `${out}/portrait.png` });
await pc.close();

await b.close();
console.log('Konsolenfehler:', errs.length ? errs : 'keine');
console.log(problems.length ? `${problems.length} Probleme` : 'alles in Ordnung');
process.exit(errs.length || problems.length ? 1 : 0);
