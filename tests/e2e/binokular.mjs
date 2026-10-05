// E2E „Binocular Mine“ (/binokular/): Start → Kalibrierung → Augen/Farben → Level mit ?autoplay=1 bis zum Abschluss →
// Session-Ende → Verlauf (+ CSV) → Therapeutenbereich mit PIN. Zusätzlich (Desktop): Debug-Ansichten, Kontrollaufgabe,
// Beschwerden-Knopf. Drei Querformat-Größen, keine Konsolenfehler, kein waagrechtes Scrollen.
// Voraussetzung: `npm run build && npx vite preview` (Port 4173). Aufruf: node tests/e2e/binokular.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.env.BASE ?? 'http://localhost:4173/';
const out = process.env.OUT ?? '/tmp/binokular-shots';
fs.mkdirSync(out, { recursive: true });

const SAFETY =
  'Diese Software ist ein Forschungs-/Trainingsprototyp. Sie ersetzt keine augenärztliche oder optometrische Untersuchung und ist nicht als eigenständige Behandlung von Amblyopie validiert.';

const sizes = [
  { name: 'tablet', width: 1180, height: 820 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'phone', width: 844, height: 390 },
];

const errs = [];
const problems = [];
const check = (ok, msg) => {
  if (!ok) problems.push(msg);
  console.log(`${ok ? 'ok  ' : 'FEHL'} ${msg}`);
};

const b = await chromium.launch();

async function noHScroll(p, where) {
  const r = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, w: window.innerWidth }));
  check(r.sw <= r.w, `${where}: kein waagrechtes Scrollen (${r.sw} ≤ ${r.w})`);
}

for (const sz of sizes) {
  const ctx = await b.newContext({ viewport: { width: sz.width, height: sz.height }, acceptDownloads: true, hasTouch: sz.name !== 'desktop' });
  const p = await ctx.newPage();
  const tag = (s) => `${sz.name} ${s}`;
  p.on('pageerror', (e) => errs.push(`${sz.name} pageerror ${e.message}`));
  p.on('console', (m) => m.type() === 'error' && errs.push(`${sz.name} console ${m.text()}`));
  const shot = async (n) => {
    await p.waitForTimeout(300); // weiche Einblendungen abwarten
    await p.screenshot({ path: `${out}/${sz.name}-${n}.png` });
  };

  // 1 Start
  await p.goto(`${base}binokular/?autoplay=1`, { waitUntil: 'networkidle' });
  check((await p.locator('[data-testid="safety-notice"]').first().innerText()).trim() === SAFETY, tag('Start: Sicherheitshinweis im Wortlaut'));
  await noHScroll(p, tag('Start'));
  await shot('1-start');

  // 2 Kalibrierung (beim ersten Start automatisch)
  await p.click('#bm-start');
  await p.waitForSelector('#cal-question');
  await shot('2-kalibrierung');
  await noHScroll(p, tag('Kalibrierung'));
  for (const a of ['seen', 'seen', 'both', 'left', 'right', 'both']) {
    await p.click(`.bm-cal-step button[data-answer="${a}"]`);
  }
  await p.waitForSelector('#cal-done');
  // Feineinstellung öffnen (Darstellung prüfen)
  await p.click('.bm-fine summary');
  await shot('3-kalibrierung-fertig');
  await noHScroll(p, tag('Kalibrierung fertig'));
  await p.click('#cal-continue');

  // 3 Augen/Farben: amblyopes Auge rechts
  await p.waitForSelector('#setup-summary');
  await p.click('label.bm-chip:has(input[name="amb-eye"][value="RIGHT"])');
  const summary = await p.locator('#setup-summary').innerText();
  check(/amblyope Auge \(rechts\) sieht die cyanfarbenen/.test(summary), tag(`Setup-Zusammenfassung: ${summary}`));
  await shot('4-setup');
  await noHScroll(p, tag('Setup'));
  await p.click('#bm-play');

  // 4 Spiel mit Automatik bis zum Abschluss
  await p.waitForSelector('.bm-game');
  await p.waitForTimeout(2500);
  await shot('5-spiel');
  await noHScroll(p, tag('Spiel'));
  check(await p.locator('#bm-complaints').isVisible(), tag('Beschwerden-Knopf sichtbar'));
  const hud = await p.locator('#hud-session').innerText();
  check(/Session \d\d:\d\d \/ 30:00/.test(hud), tag(`HUD „${hud}“`));
  await p.waitForSelector('#level-end', { timeout: 90000 });
  await p.waitForTimeout(300);
  const stars = Number(await p.locator('.bm-stars').getAttribute('data-stars'));
  check(stars === 3, tag(`Level abgeschlossen mit ${stars} Sternen`));
  await shot('6-level-ende');
  await noHScroll(p, tag('Level-Ende'));

  // 5 Session-Ende
  await p.click('#bm-end');
  await p.waitForSelector('#end-facts');
  const facts = await p.locator('#end-facts').innerText();
  check(/1 gespielt, 1 geschafft/.test(facts) && /22 %/.test(facts), tag('Session-Ende: Level und Kontrast 20 → 22 %'));
  await shot('7-session-ende');
  await noHScroll(p, tag('Session-Ende'));

  // 6 Verlauf mit Diagrammen und CSV
  await p.click('#bm-to-history');
  await p.waitForSelector('#history-charts');
  check((await p.locator('#history-charts svg').count()) >= 3, tag('Verlauf: Diagramme vorhanden'));
  await shot('8-verlauf');
  await noHScroll(p, tag('Verlauf'));
  const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#bm-csv')]);
  const csvPath = `${out}/${sz.name}-sessions.csv`;
  await dl.saveAs(csvPath);
  const csv = fs.readFileSync(csvPath, 'utf8');
  check(csv.split('\r\n').filter(Boolean).length === 2 && csv.includes('Kontrastverlauf'), tag('CSV-Export: Kopf + 1 Session'));
  await p.click('.bm-head .bm-btn-ghost');

  // 7 Therapeutenbereich mit PIN
  await p.click('#bm-therapist');
  await p.fill('#bm-pin-input', '000');
  await p.click('#bm-pin-ok');
  check(await p.locator('.bm-error').isVisible(), tag('falsche PIN abgewiesen'));
  await p.fill('#bm-pin-input', '726');
  await p.click('#bm-pin-ok');
  await p.waitForSelector('#therapist-form');
  check((await p.locator('[data-testid="safety-notice"]').first().innerText()).trim() === SAFETY, tag('Therapeutenbereich: Sicherheitshinweis'));
  check((await p.locator('#f-fc').inputValue()) === '22', tag('Therapeutenbereich: fellowEyeContrast 22'));
  await shot('9-therapeut');
  await noHScroll(p, tag('Therapeutenbereich'));
  const [jdl] = await Promise.all([p.waitForEvent('download'), p.click('#bm-export-json')]);
  const json = JSON.parse(fs.readFileSync(await jdl.path(), 'utf8'));
  check(json.format === 'binokular-einstellungen' && json.settings.amblyopicEye === 'RIGHT', tag('JSON-Export der Einstellungen'));

  if (sz.name === 'desktop') {
    // Debug-Ansichten (Tasten 1–5)
    await p.goto(`${base}binokular/?debug=1&checkIn=3`, { waitUntil: 'networkidle' });
    await p.click('#bm-start');
    await p.click('#bm-play');
    await p.waitForSelector('.bm-debugbar');
    for (const [k, n] of [['1', 'amblyop'], ['2', 'dominant'], ['4', 'filter-sim'], ['5', 'klassen']]) {
      await p.keyboard.press(k);
      await p.waitForTimeout(250);
      await shot(`10-debug-${k}-${n}`);
    }
    await p.keyboard.press('3');
    // Spieler tippt: Roboter A auswählen (Feldmitte aus dem Layout berechnet)
    const box = await p.locator('.bm-canvas').boundingBox();
    const cell = Math.floor(Math.min(box.width / 16, box.height / 7));
    const ox = box.x + Math.floor((box.width - cell * 16) / 2);
    const oy = box.y + Math.floor((box.height - cell * 7) / 2);
    await p.mouse.click(ox + 3.5 * cell, oy + 1.5 * cell);
    await p.waitForTimeout(200);
    check((await p.locator('#bm-msg').innerText()).includes('Roboter ausgewählt'), 'desktop Klick wählt Roboter');
    await p.mouse.click(ox + 5.5 * cell, oy + 3.5 * cell);
    // Kontrollaufgabe nach 3 s (sobald kein Roboter läuft)
    await p.waitForSelector('.bm-check', { timeout: 15000 });
    await p.waitForTimeout(500);
    await shot('11-kontrollaufgabe');
    await p.click('.bm-check button[data-shape="none"]');
    check((await p.locator('.bm-game').getAttribute('data-phase')) === 'playing', 'desktop Kontrollaufgabe beantwortet, Spiel läuft weiter');
    // Beschwerden → Session-Ende mit Hinweis
    await p.click('#bm-complaints');
    await p.waitForSelector('#end-complaints');
    await shot('12-beschwerden');
    const stored = await p.evaluate(() => JSON.parse(localStorage.getItem('binokular:v1')));
    const lastS = stored.sessions[stored.sessions.length - 1];
    check(stored.sessions.length === 2 && lastS.endReason === 'complaints' && lastS.suppressionChecks.length === 1, 'desktop zweite Session gespeichert (Beschwerden, 1 Kontrolle)');
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
