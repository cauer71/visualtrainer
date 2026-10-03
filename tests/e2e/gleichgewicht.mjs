// Rundum-Test für die fünf Gleichgewichts-Übungen (labor-richtungen, labor-orientierung, labor-balance-touch, labor-slalom,
// labor-invasoren) auf drei Bühnen (Tablet quer 1180×820, Tablet hoch 820×1180, Handy 390×844) in Deutsch und Italienisch:
// Intro öffnet und der Film läuft (Canvas nicht leer), „Gut zu wissen“ enthält die Sicherheitshinweise, Start, Autoplay bis zum
// Ergebnis, keine Konsolenfehler, kein horizontales Scrollen (Intro, Übung, Ergebnis). Läufe: Standard, je eine Einstellungs-
// Variante (nur Deutsch) und für Slalom/Invasoren der Startbildschirm „Gerät kippen“ (ohne Autoplay: „Stattdessen mit dem Finger
// steuern“ antippen, dann mit der Maus steuern). Optional: SHOTS=<Ordner> speichert Bilder, VP=<Name,…> und ONLY=<Kennung,…> filtern.
//
// Aufruf: npm run build && npx vite preview --port 4173 &  →  node tests/e2e/gleichgewicht.mjs [baseUrl]
// (Konsolenfehler „cloudflareinsights“ gibt es nur live, nicht lokal.)
import fs from 'node:fs';
import { chromium } from 'playwright';

const base = process.argv[2] || 'http://localhost:4173/';
const storageKey = 'blickfit:v1';
const shots = process.env.SHOTS || '';
if (shots) fs.mkdirSync(shots, { recursive: true });
const allViewports = [
  { name: 'tablet-quer', width: 1180, height: 820 },
  { name: 'tablet-hoch', width: 820, height: 1180 },
  { name: 'handy', width: 390, height: 844 },
];
const viewports = process.env.VP ? allViewports.filter((v) => process.env.VP.split(',').includes(v.name)) : allViewports;
const only = process.env.ONLY ? process.env.ONLY.split(',') : null;

// Sicherheitswörter, die im „Gut zu wissen“ jeder Übung stehen müssen (DE, IT)
const SAFETY = { de: /Sturzgefahr/, it: /[Rr]ischio di caduta/ };

// Läufe je Übung: Name, gespeicherte Einstellungen, nur Deutsch?, interaktiver Lauf über den Startbildschirm „Kippen“?
const scenarios = [
  { id: 'labor-richtungen', name: 'standard', params: {} },
  { id: 'labor-richtungen', name: 'hilfsperson-8', params: { input: 'helper', directions: '8', rule: 'opposite' }, deOnly: true },
  { id: 'labor-orientierung', name: 'standard', params: {} },
  { id: 'labor-orientierung', name: 'ohne-rueckkehr-8', params: { returnToCenter: 'no', directions: '8', timeoutS: 5 }, deOnly: true },
  { id: 'labor-balance-touch', name: 'standard', params: {} },
  { id: 'labor-balance-touch', name: 'einbeinig-rand', params: { stance: 'single', zone: 'periphery', diameterCm: 9 }, deOnly: true },
  { id: 'labor-slalom', name: 'standard', params: {} },
  { id: 'labor-slalom', name: 'tasten', params: { control: 'keys', gapCm: 20 }, deOnly: true },
  { id: 'labor-slalom', name: 'kippen-startbildschirm', params: { control: 'tilt' }, tiltGate: true },
  { id: 'labor-invasoren', name: 'standard', params: {} },
  { id: 'labor-invasoren', name: 'tasten', params: { control: 'keys', toleranceCm: 4 }, deOnly: true },
  { id: 'labor-invasoren', name: 'kippen-startbildschirm', params: { control: 'tilt' }, tiltGate: true },
].filter((s) => !only || only.includes(s.id));

async function canvasHasContent(page, selector) {
  return page.evaluate((sel) => {
    const c = document.querySelector(sel);
    if (!c || !c.width || !c.height) return false;
    const tmp = document.createElement('canvas');
    tmp.width = 64;
    tmp.height = 64;
    const g = tmp.getContext('2d');
    g.drawImage(c, 0, 0, 64, 64);
    const d = g.getImageData(0, 0, 64, 64).data;
    let min = 255;
    let max = 0;
    for (let i = 0; i < d.length; i += 4) {
      const v = d[i] + d[i + 1] + d[i + 2];
      if (v < min) min = v;
      if (v > max) max = v;
    }
    return max - min > 30;
  }, selector);
}

const noHScroll = (page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1 && document.body.scrollWidth <= window.innerWidth + 1);

const browser = await chromium.launch();
const failures = [];

for (const sc of scenarios) {
  for (const lang of sc.deOnly ? ['de'] : ['de', 'it']) {
    for (const vp of viewports) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, hasTouch: true, locale: lang === 'it' ? 'it-IT' : 'de-DE' });
      if (Object.keys(sc.params).length) {
        await ctx.addInitScript(
          ([key, ex, params]) => {
            try {
              if (!window.localStorage.getItem(key)) {
                window.localStorage.setItem(key, JSON.stringify({ v: 1, exercises: {}, days: [], settings: { exerciseParams: { [ex]: params } } }));
              }
            } catch {
              /* ignorieren */
            }
          },
          [storageKey, sc.id, sc.params],
        );
      }
      const page = await ctx.newPage();
      const errors = [];
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text());
      });
      page.on('pageerror', (e) => errors.push(e.message));
      const label = `${sc.id}/${sc.name}/${lang}/${vp.name}`;
      const tag = `${sc.id}-${sc.name}-${lang}-${vp.name}`;
      try {
        const autoplay = sc.tiltGate ? '' : '&autoplay=1';
        await page.goto(`${base}?quick=1${autoplay}&lang=${lang}#/uebung/${sc.id}`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1800);
        if (!(await canvasHasContent(page, '.demo-stage canvas'))) throw new Error('Intro-Film zeigt nichts');
        if (!(await noHScroll(page))) throw new Error('Intro: horizontales Scrollen');
        const cautions = await page.locator('details.curious-list').evaluateAll((els) => els.map((e) => e.textContent || '').join(' '));
        if (!SAFETY[lang].test(cautions)) throw new Error('Intro: „Gut zu wissen“ ohne Sicherheitshinweis (Sturzgefahr)');
        if (!/Muchnick/.test(cautions)) throw new Error('Intro: „Gut zu wissen“ ohne Quelle der Warnzeichen');
        if (shots) await page.screenshot({ path: `${shots}/${tag}-intro.png`, fullPage: true });
        await page.click('.intro .btn-primary');
        if (sc.tiltGate) {
          // Startbildschirm „Gerät kippen“: Bühne abwarten (Countdown), Bild, dann „Stattdessen mit dem Finger steuern“
          await page.waitForSelector('.stage canvas', { timeout: 15000 });
          await page.waitForTimeout(4200);
          const box = await page.locator('.stage canvas').boundingBox();
          if (!box) throw new Error('Bühne nicht gefunden');
          if (!(await canvasHasContent(page, '.stage canvas'))) throw new Error('Startbildschirm Kippen zeigt nichts');
          if (shots) await page.screenshot({ path: `${shots}/${tag}-kippen.png` });
          if (!(await noHScroll(page))) throw new Error('Startbildschirm Kippen: horizontales Scrollen');
          const u = Math.min(box.width, box.height) / 100;
          const bh = Math.max(64, Math.min(96, u * 10));
          const y0 = box.height * 0.5;
          const py = y0 + bh + Math.max(12, u * 2);
          const ph = Math.max(56, Math.min(72, u * 8));
          await page.mouse.click(box.x + box.width / 2, box.y + py + ph / 2);
          // ohne Kippen weiter: mit der Maus steuern, bis das Ergebnis da ist
          const t0 = Date.now();
          let shotDone = false;
          while (Date.now() - t0 < 60000 && !(await page.locator('.result-card').count())) {
            const k = (Date.now() - t0) / 700;
            await page.mouse.move(box.x + box.width / 2 + Math.sin(k) * box.width * 0.35, box.y + box.height * 0.6);
            if (shots && !shotDone && Date.now() - t0 > 4000) {
              shotDone = true;
              await page.screenshot({ path: `${shots}/${tag}-run.png` });
            }
            await page.waitForTimeout(60);
          }
        } else {
          // Mitte des Laufs ein Bild (Hilfsperson-Tasten, Punkte, Tore, Schiffe)
          await page.waitForSelector('.stage canvas', { timeout: 15000 });
          await page.waitForTimeout(sc.id === 'labor-orientierung' ? 6000 : 4500);
          if (!(await noHScroll(page))) throw new Error('Übung: horizontales Scrollen');
          if (shots) await page.screenshot({ path: `${shots}/${tag}-run.png` });
          if (sc.params.control === 'keys') {
            await page.keyboard.down('ArrowLeft');
            await page.waitForTimeout(150);
            await page.keyboard.up('ArrowLeft');
          }
        }
        await page.waitForSelector('.result-card', { timeout: 120000 });
        const value = await page.textContent('.result-value');
        if (!value || !/\d/.test(value)) throw new Error(`Ergebnis ohne Zahl: "${value}"`);
        if (!(await noHScroll(page))) throw new Error('Ergebnis: horizontales Scrollen');
        const text = await page.locator('body').innerText();
        if (/NaN|undefined|null/.test(text)) throw new Error('Ergebnis enthält NaN/undefined/null');
        if (shots) await page.screenshot({ path: `${shots}/${tag}-result.png`, fullPage: true });
        if (errors.length) throw new Error(`Konsolenfehler: ${errors.join(' | ')}`);
        console.log(`✓ ${label}  →  ${value.replace(/\s+/g, ' ').trim()}`);
      } catch (e) {
        failures.push(`${label}: ${e.message.split('\n')[0]}`);
        console.log(`✗ ${label}: ${e.message.split('\n')[0]}`);
        if (shots) await page.screenshot({ path: `${shots}/${tag}-FEHLER.png` }).catch(() => {});
      }
      await ctx.close();
    }
  }
}

await browser.close();
if (failures.length) {
  console.log(`\n${failures.length} Fehler:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log('\nGleichgewichts-Übungen ok.');
