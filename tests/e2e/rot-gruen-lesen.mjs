// Rundum-Test nur für „Rot-Grün-Lesen“ auf drei Bühnen (Tablet quer 1180×820, Tablet hoch 820×1180, Handy 390×844):
// Intro öffnet und der Film läuft (Canvas nicht leer), Start, Autoplay bis zum Ergebnis, keine Konsolenfehler,
// kein horizontales Scrollen (Intro, Übung, Ergebnis). Läufe: Standard, mit Kontrollstrichen (und Prüfbild Schritt für
// Schritt, dessen Tasten „heller/dunkler“ geprüft werden), mit Versatz 6 Δ. Optional: SHOTS=<Ordner> speichert Bilder.
//
// Aufruf: npm run build && npx vite preview --port 4173 &  →  node tests/e2e/rot-gruen-lesen.mjs [baseUrl]
// (Konsolenfehler „cloudflareinsights“ gibt es nur live, nicht lokal.)
import fs from 'node:fs';
import { chromium } from 'playwright';

const base = process.argv[2] || 'http://localhost:4173/';
const id = 'labor-rot-gruen-lesen';
const storageKey = 'blickfit:v1';
const shots = process.env.SHOTS || '';
if (shots) fs.mkdirSync(shots, { recursive: true });
const viewports = [
  { name: 'tablet-quer', width: 1180, height: 820 },
  { name: 'tablet-hoch', width: 820, height: 1180 },
  { name: 'handy', width: 390, height: 844 },
];

// Läufe: Name, gespeicherte Einstellungen, ob das Prüfbild „Schritt für Schritt“ bedient wird
const scenarios = [
  { name: 'standard', params: {}, steps: false },
  { name: 'striche', params: { controlMarks: 'on', glassesCheck: 'steps', tones: 'redblue' }, steps: true },
  { name: 'versatz6', params: { shiftPd: 6, shiftDir: 'convergence' }, steps: false },
];

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

/** Kleinste Höhe und Breite aller Knöpfe im Prüfbild (px) */
const smallestCheckButton = (page) =>
  page.evaluate(() => {
    const bs = [...document.querySelectorAll('.colorcheck button')];
    return bs.length ? Math.min(...bs.map((b) => Math.min(b.getBoundingClientRect().height))) : 0;
  });

const browser = await chromium.launch();
const failures = [];

for (const sc of scenarios) {
  for (const lang of ['de', 'it']) {
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
          [storageKey, id, sc.params],
        );
      }
      const page = await ctx.newPage();
      const errors = [];
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text());
      });
      page.on('pageerror', (e) => errors.push(e.message));
      const label = `${sc.name}/${lang}/${vp.name}`;
      const tag = `${sc.name}-${lang}-${vp.name}`;
      try {
        await page.goto(`${base}?quick=1&autoplay=1&lang=${lang}#/uebung/${id}`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1800);
        if (!(await canvasHasContent(page, '.demo-stage canvas'))) throw new Error('Intro-Film zeigt nichts');
        if (!(await noHScroll(page))) throw new Error('Intro: horizontales Scrollen');
        if (sc.steps) {
          // Prüfbild Schritt für Schritt: Schritte, Glas wählen, Helligkeit je Farbe mit Tasten (≥ 56 px)
          const nSteps = await page.locator('.colorcheck-steps li').count();
          if (nSteps !== 5) throw new Error(`Prüfbild: ${nSteps} statt 5 Schritte`);
          if ((await smallestCheckButton(page)) < 55.5) throw new Error('Prüfbild: Knopf kleiner als 56 px');
          const swatch = () => page.locator('.colorcheck-swatch').first().evaluate((e) => getComputedStyle(e).backgroundColor);
          const before = await swatch();
          if (before !== 'rgb(255, 0, 0)') throw new Error(`Rotfläche vorher ${before}`);
          // erster Knopf in der Helligkeitszeile = „Rot dunkler“
          await page.locator('.colorcheck-level button').first().click();
          const after = await swatch();
          if (after !== 'rgb(230, 0, 0)') throw new Error(`Rotfläche nach „dunkler“: ${after}`);
          const val = await page.locator('.colorcheck-value').first().textContent();
          if (!/90 %/.test(val || '')) throw new Error(`Wertanzeige: ${val}`);
          // Einstellung in der Liste folgt (Stepper „Helligkeit Rot“)
          await page.locator('details.params > summary').click();
          const stepper = await page.locator(`section[aria-labelledby="param-${id}-redLevel"] .stepper-value`).textContent();
          if (!/90/.test(stepper || '')) throw new Error(`Einstellung zeigt ${stepper}`);
          await page.locator('details.params > summary').click();
          // Glas wählen: „Linkes Glas“ umschalten und zurück
          await page.locator('.colorcheck .option-choice').nth(1).click();
          const on = await page.locator('.colorcheck .option-choice.is-on').textContent();
          if (!/grün|verde|blau|blu|cyan|ciano/i.test(on || '')) throw new Error(`Glas-Auswahl: ${on}`);
          await page.locator('.colorcheck .option-choice').nth(0).click();
          // zurück auf volle Helligkeit
          await page.locator('.colorcheck-level button').nth(1).click();
          if ((await swatch()) !== 'rgb(255, 0, 0)') throw new Error('Rotfläche nach „heller“ nicht wieder voll');
          if (shots) await page.locator('.colorcheck').scrollIntoViewIfNeeded();
          if (!(await noHScroll(page))) throw new Error('Prüfbild: horizontales Scrollen');
        }
        if (shots) await page.screenshot({ path: `${shots}/${tag}-intro.png`, fullPage: true });
        await page.click('.intro .btn-primary');
        // Folge 2 abwarten (bei Versatz ist erst dort ein Versatz zu sehen), dann kurz danach ein Bild machen
        await page.waitForFunction(() => /2\s*\/\s*2/.test(document.body.innerText), null, { timeout: 30000 }).catch(() => {});
        await page.waitForTimeout(1900);
        if (!(await noHScroll(page))) throw new Error('Übung: horizontales Scrollen');
        if (shots) await page.screenshot({ path: `${shots}/${tag}-run.png` });
        if (sc.name === 'versatz6') {
          // Trainer-Regler (Trainer-Ansicht): Leiste vorhanden, „+“ legt einen Zusatz auf den Versatz
          if ((await page.locator('.live-bar').count()) !== 1) throw new Error('keine Regler-Leiste');
          await page.locator('.live-btn').nth(2).click();
          await page.waitForTimeout(300);
          const v = await page.locator('.live-value').textContent();
          if (!/\+0,5|\+0\.5/.test(v || '')) throw new Error(`Regler-Wert nach „+“: ${v}`);
        }
        await page.waitForSelector('.result-card', { timeout: 90000 });
        const value = await page.textContent('.result-value');
        if (!value || !/\d/.test(value)) throw new Error(`Ergebnis ohne Zahl: "${value}"`);
        if (!(await noHScroll(page))) throw new Error('Ergebnis: horizontales Scrollen');
        const text = await page.locator('body').innerText();
        if (sc.name === 'striche' && !/Kontrollstriche|Trattini di controllo/.test(text)) throw new Error('Ergebnis ohne Tabelle „Kontrollstriche“');
        if (sc.name === 'versatz6' && !/Versatz der Bilder|Spostamento delle immagini/.test(text)) throw new Error('Ergebnis ohne Zeile „Versatz“');
        if (sc.name === 'versatz6' && !/6,0 Δ/.test(text)) throw new Error('Ergebnis ohne „6,0 Δ“');
        if (sc.name === 'versatz6' && !/Trainer-Regler \(während der Übung\)|Regolatore del trainer \(durante l’esercizio\)/.test(text)) throw new Error('Ergebnis ohne Tabelle „Trainer-Regler“');
        if (sc.name === 'standard' && /Trainer-Regler \(während der Übung\)|Regolatore del trainer \(durante l’esercizio\)/.test(text)) throw new Error('Standard: Tabelle „Trainer-Regler“ ohne Bedienung');
        if (sc.name === 'standard' && /Kontrollstriche|Trattini di controllo|Versatz der Bilder|Spostamento delle immagini/.test(text)) throw new Error('Standard: unerwartete Zeilen zu Strichen oder Versatz');
        if (shots) await page.screenshot({ path: `${shots}/${tag}-result.png`, fullPage: true });
        if (errors.length) throw new Error(`Konsolenfehler: ${errors.join(' | ')}`);
        console.log(`✓ ${label}  →  ${value.replace(/\s+/g, ' ').trim()}`);
      } catch (e) {
        failures.push(`${label}: ${e.message.split('\n')[0]}`);
        console.log(`✗ ${label}: ${e.message.split('\n')[0]}`);
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
console.log('\nRot-Grün-Lesen ok.');
