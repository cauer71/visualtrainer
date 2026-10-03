// Gemeinsamer Rundum-Test für die Anaglyphen-Übungen mit Trainer-Regler (Fusion, Tiefe sehen, Rot-Grün-Lesen) auf drei Bühnen
// (Tablet quer 1180×820, Tablet hoch 820×1180, Handy 390×844), Deutsch und Italienisch:
// - Trainer-Ansicht: Intro-Film läuft, Start (Autoplay ohne ?quick), Regler-Leiste sichtbar (Tasten ≥ 56 px, kein Überlappen mit der Bühne), Klick auf
//   „+“ ändert den Wert, Taste „+“ (Tastatur) wirkt, kein horizontales Scrollen, Autoplay bis zum Ergebnis, Tabelle „Trainer-Regler“
//   im Ergebnis, keine Konsolenfehler.
// - Benutzer-Ansicht (Kunde): keine Regler-Leiste, keine Tabelle „Trainer-Regler“ im Ergebnis.
// Aufruf siehe fusion.mjs / stereo.mjs (Konsolenfehler „cloudflareinsights“ gibt es nur live, nicht lokal).
import fs from 'node:fs';
import { chromium } from 'playwright';

const storageKey = 'blickfit:v1';

export const viewports = [
  { name: 'tablet-quer', width: 1180, height: 820 },
  { name: 'tablet-hoch', width: 820, height: 1180 },
  { name: 'handy', width: 390, height: 844 },
];

export async function canvasHasContent(page, selector) {
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

/**
 * @param {{ id: string, base: string, scenarios: Array<{name: string, params: object, view: 'trainer'|'kunde', resultMust?: RegExp[], resultMustNot?: RegExp[]}>, shots?: string }} o
 */
export async function runLaborScenarios(o) {
  const { id, base, scenarios } = o;
  const shots = o.shots || process.env.SHOTS || '';
  if (shots) fs.mkdirSync(shots, { recursive: true });
  const browser = await chromium.launch();
  const failures = [];
  // Einschränken für schnelle Läufe: SCEN=name1,name2  LANGS=de  VPS=handy,tablet-quer
  const pick = (v) => (v ? v.split(',') : null);
  const onlyScen = pick(process.env.SCEN);
  const onlyLangs = pick(process.env.LANGS);
  const onlyVps = pick(process.env.VPS);
  for (const sc of scenarios) {
    if (onlyScen && !onlyScen.includes(sc.name)) continue;
    for (const lang of ['de', 'it']) {
      if (onlyLangs && !onlyLangs.includes(lang)) continue;
      for (const vp of viewports) {
        if (onlyVps && !onlyVps.includes(vp.name)) continue;
        const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, hasTouch: true, locale: lang === 'it' ? 'it-IT' : 'de-DE' });
        await ctx.addInitScript(
          ([key, ex, params, view]) => {
            try {
              if (!window.localStorage.getItem(key)) {
                const settings = { exerciseParams: { [ex]: params } };
                if (view === 'kunde') {
                  settings.role = 'kunde';
                  settings.customerIds = [ex];
                }
                window.localStorage.setItem(key, JSON.stringify({ v: 1, exercises: {}, days: [], settings }));
              }
            } catch {
              /* ignorieren */
            }
          },
          [storageKey, id, sc.params, sc.view],
        );
        const page = await ctx.newPage();
        const errors = [];
        page.on('console', (m) => {
          if (m.type() === 'error') errors.push(m.text());
        });
        page.on('pageerror', (e) => errors.push(e.message));
        const label = `${sc.name}/${lang}/${vp.name}`;
        const tag = `${sc.name}-${lang}-${vp.name}`;
        try {
          await page.goto(`${base}?autoplay=1&lang=${lang}#/uebung/${id}`, { waitUntil: 'networkidle' });
          await page.waitForTimeout(1800);
          if (!(await canvasHasContent(page, '.demo-stage canvas'))) throw new Error('Intro-Film zeigt nichts');
          if (!(await noHScroll(page))) throw new Error('Intro: horizontales Scrollen');
          if (shots) await page.screenshot({ path: `${shots}/${tag}-intro.png`, fullPage: true });
          await page.click('.intro .btn-primary');
          await page.waitForSelector('.stage canvas', { timeout: 10000 });
          await page.waitForTimeout(3200); // Countdown, Übung läuft
          if (!(await noHScroll(page))) throw new Error('Übung: horizontales Scrollen');
          const bar = page.locator('.live-bar');
          if (sc.view === 'kunde') {
            if ((await bar.count()) !== 0) throw new Error('Benutzer-Ansicht: Regler-Leiste sichtbar');
          } else {
            if ((await bar.count()) !== 1) throw new Error('Trainer-Ansicht: keine Regler-Leiste');
            await page.waitForFunction(() => {
              const v = document.querySelector('.live-value');
              return !!v && /\d/.test(v.textContent || '');
            }, null, { timeout: 15000 });
            // Tasten ≥ 56 px
            const sizes = await page.$$eval('.live-btn', (bs) => bs.map((b) => [b.getBoundingClientRect().width, b.getBoundingClientRect().height]));
            if (sizes.length !== 4) throw new Error(`${sizes.length} statt 4 Tasten`);
            for (const [w, h] of sizes) if (w < 55.5 || h < 55.5) throw new Error(`Regler-Taste ${Math.round(w)}×${Math.round(h)} px < 56`);
            // Leiste überlappt die Bühne nicht (daneben oder darunter)
            const rects = await page.evaluate(() => {
              const b = document.querySelector('.live-bar').getBoundingClientRect();
              const s = document.querySelector('.stage').getBoundingClientRect();
              return { b: [b.left, b.top, b.right, b.bottom], s: [s.left, s.top, s.right, s.bottom], vw: innerWidth, vh: innerHeight };
            });
            const sep = rects.b[0] >= rects.s[2] - 1 || rects.b[1] >= rects.s[3] - 1;
            if (!sep) throw new Error(`Leiste überlappt die Bühne: ${JSON.stringify(rects)}`);
            if (rects.b[2] > rects.vw + 1 || rects.b[3] > rects.vh + 1) throw new Error('Leiste ragt über den Bildschirm');
            // Klick auf „+“ und Taste „+“ verändern den Wert; „−“ nimmt zurück
            const val = () => page.locator('.live-value').textContent();
            const v0 = await val();
            await page.locator('.live-btn').nth(2).click();
            await page.waitForTimeout(250);
            const v1 = await val();
            if (v1 === v0) throw new Error(`Wert unverändert nach „+“: ${v0}`);
            await page.keyboard.press('+');
            await page.waitForTimeout(250);
            const v2 = await val();
            if (v2 === v1) throw new Error(`Wert unverändert nach Taste „+“: ${v1}`);
            await page.locator('.live-btn').nth(1).click();
            await page.waitForTimeout(250);
            if (shots) await page.screenshot({ path: `${shots}/${tag}-run.png` });
            // Einklappen und wieder öffnen
            await page.locator('.live-toggle').click();
            if ((await page.locator('.live-btn').count()) !== 0) throw new Error('Leiste lässt sich nicht einklappen');
            await page.locator('.live-toggle').click();
            if ((await page.locator('.live-btn').count()) !== 4) throw new Error('Leiste lässt sich nicht öffnen');
          }
          if (shots && sc.view === 'kunde') await page.screenshot({ path: `${shots}/${tag}-run.png` });
          await page.waitForSelector('.result-card', { timeout: 120000 });
          const value = await page.textContent('.result-value');
          if (!value || !/\d/.test(value)) throw new Error(`Ergebnis ohne Zahl: "${value}"`);
          if (!(await noHScroll(page))) throw new Error('Ergebnis: horizontales Scrollen');
          const text = await page.locator('body').innerText();
          const live = /Trainer-Regler \(während der Übung\)|Regolatore del trainer \(durante l’esercizio\)/.test(text);
          if (sc.view === 'trainer' && !live) throw new Error('Ergebnis ohne Tabelle „Trainer-Regler“');
          if (sc.view === 'kunde' && live) throw new Error('Benutzer-Ansicht: Tabelle „Trainer-Regler“ im Ergebnis');
          for (const re of sc.resultMust || []) if (!re.test(text)) throw new Error(`Ergebnis ohne ${re}`);
          for (const re of sc.resultMustNot || []) if (re.test(text)) throw new Error(`Ergebnis mit unerwartetem ${re}`);
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
  console.log('\nAlle Läufe bestanden.');
}
