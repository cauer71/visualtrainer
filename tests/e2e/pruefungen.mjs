// Rundum-Test für die sechs Funktionsübungen (Hess-Schirm, Worth-Vier-Punkte, Schober, Diplopie-Karte, Subjektive Vertikale,
// Orts-Projektion) auf drei Bühnen (Tablet quer 1180×820, Tablet hoch 820×1180, Handy 390×844), Deutsch und Italienisch:
// Intro öffnet und der Film läuft (Canvas nicht leer), Prüfbild Schritt für Schritt (bei den Brillen-Übungen: fünf Schritte, Knöpfe
// ≥ 56 px, Helligkeit und Glas verstellbar), Start, Autoplay bis zum Ergebnis, Ergebnis mit „Übungswerte“, keine Konsolenfehler,
// kein horizontales Scrollen (Intro, Übung, Ergebnis). Bei Schober muss der Satz „Vorzeichenregeln nur hergeleitet, nicht gegen
// ein Messgerät geprüft“ im Ergebnis stehen. Danach die Sichtbarkeit: Trainer- und Entwickler-Ansicht sehen die Übungen auf der
// Startseite (Filter „Labor“), auf der Trainer-Seite (Auswahlliste) und im Hintergrund; Direktaufrufe laufen durch; Benutzer-
// Ansicht ohne Auswahl sieht sie nicht; im Tagestraining kommen sie nie vor.
// Optional: SHOTS=<Ordner> speichert Bilder, ONLY=<Kennung[,Kennung]> beschränkt die Übungen.
//
// Aufruf: npm run build && npx vite preview --port 4173 &  →  node tests/e2e/pruefungen.mjs [baseUrl]
// (Konsolenfehler „cloudflareinsights“ gibt es nur live, nicht lokal.)
import fs from 'node:fs';
import { chromium } from 'playwright';

const base = process.argv[2] || 'http://localhost:4173/';
const storageKey = 'blickfit:v1';
const shots = process.env.SHOTS || '';
const only = (process.env.ONLY || '').split(',').filter(Boolean);
if (shots) fs.mkdirSync(shots, { recursive: true });
const viewports = [
  { name: 'tablet-quer', width: 1180, height: 820 },
  { name: 'tablet-hoch', width: 820, height: 1180 },
  { name: 'handy', width: 390, height: 844 },
];
const SIGN_DE = 'Vorzeichenregeln nur hergeleitet, nicht gegen ein Messgerät geprüft';
const SIGN_IT = 'Regole dei segni solo derivate, non verificate con uno strumento di misura';

const all = [
  { id: 'labor-hess', title: { de: 'Hess-Schirm', it: 'Schermo di Hess' }, glasses: true },
  { id: 'labor-worth', title: { de: 'Worth-Vier-Punkte', it: 'Quattro punti di Worth' }, glasses: true },
  { id: 'labor-schober', title: { de: 'Schober-Kreuz im Ring', it: 'Croce e anello di Schober' }, glasses: true },
  { id: 'labor-diplopie', title: { de: 'Diplopie-Karte', it: 'Mappa della visione doppia' }, glasses: true },
  { id: 'labor-vertikale', title: { de: 'Subjektive Vertikale', it: 'Verticale soggettiva' }, glasses: false },
  { id: 'labor-projektion', title: { de: 'Orts-Projektion', it: 'Proiezione della posizione' }, glasses: false },
];
const exercises = only.length ? all.filter((e) => only.includes(e.id)) : all;

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

const smallestCheckButton = (page) =>
  page.evaluate(() => {
    const bs = [...document.querySelectorAll('.colorcheck button')];
    return bs.length ? Math.min(...bs.map((b) => b.getBoundingClientRect().height)) : 0;
  });

const browser = await chromium.launch();
const failures = [];
const note = (label, e) => {
  failures.push(`${label}: ${e.message.split('\n')[0]}`);
  console.log(`✗ ${label}: ${e.message.split('\n')[0]}`);
};

// --- 1. Durchläufe: Übung × Sprache × Bühne ---------------------------------------------------------------------------------
// ROLES_ONLY=1 überspringt die Durchläufe und prüft nur die Sichtbarkeit nach Ansicht
for (const ex of process.env.ROLES_ONLY === '1' ? [] : exercises) {
  for (const lang of ['de', 'it']) {
    for (const vp of viewports) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, hasTouch: true, locale: lang === 'it' ? 'it-IT' : 'de-DE' });
      const page = await ctx.newPage();
      const errors = [];
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text());
      });
      page.on('pageerror', (e) => errors.push(e.message));
      const label = `${ex.id}/${lang}/${vp.name}`;
      const tag = `${ex.id}-${lang}-${vp.name}`;
      try {
        await page.goto(`${base}?quick=1&autoplay=1&lang=${lang}#/uebung/${ex.id}`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1800);
        if (!(await page.locator('h1').first().innerText()).includes(ex.title[lang])) throw new Error(`Intro zeigt nicht „${ex.title[lang]}“`);
        if (!(await canvasHasContent(page, '.demo-stage canvas'))) throw new Error('Intro-Film zeigt nichts');
        if (!(await noHScroll(page))) throw new Error('Intro: horizontales Scrollen');
        const hasCheck = (await page.locator('.colorcheck').count()) > 0;
        if (hasCheck !== ex.glasses) throw new Error(`Prüfbild ${hasCheck ? 'vorhanden' : 'fehlt'}, erwartet: ${ex.glasses ? 'ja' : 'nein'}`);
        if (ex.glasses) {
          // Prüfbild Schritt für Schritt: fünf Schritte, Glas wählen, Helligkeit je Farbe mit Tasten (≥ 56 px)
          const nSteps = await page.locator('.colorcheck-steps li').count();
          if (nSteps !== 5) throw new Error(`Prüfbild: ${nSteps} statt 5 Schritte`);
          if ((await smallestCheckButton(page)) < 55.5) throw new Error('Prüfbild: Knopf kleiner als 56 px');
          const swatch = () => page.locator('.colorcheck-swatch').first().evaluate((e) => getComputedStyle(e).backgroundColor);
          if ((await swatch()) !== 'rgb(255, 0, 0)') throw new Error(`Rotfläche vorher ${await swatch()}`);
          await page.locator('.colorcheck-level button').first().click();
          if ((await swatch()) !== 'rgb(230, 0, 0)') throw new Error(`Rotfläche nach „dunkler“: ${await swatch()}`);
          await page.locator('.colorcheck-level button').nth(1).click();
          if ((await swatch()) !== 'rgb(255, 0, 0)') throw new Error('Rotfläche nach „heller“ nicht wieder voll');
          await page.locator('.colorcheck .option-choice').nth(1).click();
          await page.locator('.colorcheck .option-choice').nth(0).click();
          if (!(await noHScroll(page))) throw new Error('Prüfbild: horizontales Scrollen');
        }
        // Einstellungen (einklappbar) vorhanden und ohne horizontales Scrollen
        await page.locator('details.params > summary').click();
        if (!(await noHScroll(page))) throw new Error('Einstellungen: horizontales Scrollen');
        if (shots) await page.screenshot({ path: `${shots}/${tag}-intro.png`, fullPage: true });
        await page.locator('details.params > summary').click();
        await page.click('.intro .btn-primary');
        await page.waitForTimeout(5200);
        if (!(await noHScroll(page))) throw new Error('Übung: horizontales Scrollen');
        if (shots) await page.screenshot({ path: `${shots}/${tag}-run.png` });
        await page.waitForSelector('.result-card', { timeout: 150000 });
        const value = await page.textContent('.result-value');
        if (!value || !/\d/.test(value)) throw new Error(`Ergebnis ohne Zahl: "${value}"`);
        if (!(await noHScroll(page))) throw new Error('Ergebnis: horizontales Scrollen');
        const text = await page.locator('.session').innerText();
        if (!/Übungswerte|Valori dell’esercizio/.test(text)) throw new Error('Ergebnis ohne „Übungswerte“');
        if (/Befund:|Diagnose|Normwert|valori normali/i.test(text)) throw new Error('Ergebnis mit verbotenem Wort');
        if (ex.id === 'labor-schober' && !text.includes(lang === 'de' ? SIGN_DE : SIGN_IT)) throw new Error('Schober-Ergebnis ohne den Satz zu den Vorzeichenregeln');
        if (/\{[a-zA-Z0-9]+\}|NaN|undefined/.test(text)) throw new Error('Ergebnis mit Platzhalter oder NaN');
        if (shots) await page.screenshot({ path: `${shots}/${tag}-result.png`, fullPage: true });
        if (errors.length) throw new Error(`Konsolenfehler: ${errors.join(' | ')}`);
        console.log(`✓ ${label}  →  ${value.replace(/\s+/g, ' ').trim()}`);
      } catch (e) {
        note(label, e);
      }
      await ctx.close();
    }
  }
}

// --- 2. Sichtbarkeit nach Ansicht -----------------------------------------------------------------------------------------------
const seedRole = (role) => async (ctx) =>
  ctx.addInitScript(
    ([key, r]) => {
      try {
        window.localStorage.setItem(key, JSON.stringify({ v: 1, exercises: {}, days: [], settings: { role: r, lang: 'de', customerIds: ['blitzreaktion', 'kugel-detektiv', 'suchbild'] } }));
      } catch {
        /* ignorieren */
      }
    },
    [storageKey, role],
  );

for (const role of ['optiker', 'entwickler', 'kunde']) {
  const ctx = await browser.newContext({ viewport: { width: 1180, height: 820 }, hasTouch: true, locale: 'de-DE' });
  await seedRole(role)(ctx);
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(e.message));
  const label = `Ansicht ${role}`;
  try {
    const visible = role !== 'kunde';
    // Startseite mit Filter „Labor“
    await page.goto(`${base}?lang=de#/?tag=labor`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const cards = (await page.locator('.ex-card-title').allInnerTexts()).join(' | ');
    for (const ex of exercises) {
      const has = cards.includes(ex.title.de);
      if (has !== visible) throw new Error(`Startseite: „${ex.title.de}“ ${has ? 'sichtbar' : 'fehlt'} (Ansicht ${role})`);
    }
    // Tagestraining enthält keine dieser Übungen
    const daily = (await page.locator('.daily-name').allInnerTexts()).join(' | ');
    for (const ex of exercises) if (daily.includes(ex.title.de)) throw new Error(`Tagestraining enthält „${ex.title.de}“`);
    // Trainer-Seite (Auswahlliste für Benutzer) nur für Trainer und Entwickler
    if (visible) {
      await page.goto(`${base}?lang=de#/optiker`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);
      const picks = (await page.locator('.pick-text strong').allInnerTexts()).join(' | ');
      for (const ex of exercises) if (!picks.includes(ex.title.de)) throw new Error(`Trainer-Seite: „${ex.title.de}“ fehlt in der Auswahlliste`);
      // Hintergrund
      await page.goto(`${base}?lang=de#/hintergrund/${exercises[0].id}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);
      if ((await page.locator(`#sci-${exercises[0].id}`).count()) !== 1) throw new Error('Hintergrund: Eintrag fehlt');
    }
    // Direktaufrufe
    for (const ex of exercises) {
      await page.goto(`${base}?lang=de#/uebung/${ex.id}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      const h1 = (await page.locator('h1').first().innerText()).trim();
      const opens = h1.includes(ex.title.de);
      if (opens !== visible) throw new Error(`Direktaufruf ${ex.id}: ${opens ? 'läuft durch' : 'öffnet nicht'} (Ansicht ${role})`);
    }
    if (errors.length) throw new Error(`Konsolenfehler: ${errors.join(' | ')}`);
    console.log(`✓ ${label}: ${visible ? 'Übungen sichtbar, Direktaufrufe laufen durch' : 'Übungen nicht sichtbar (Benutzer-Ansicht ohne Auswahl)'}`);
  } catch (e) {
    note(label, e);
  }
  await ctx.close();
}

await browser.close();
if (failures.length) {
  console.log(`\n${failures.length} Fehler:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log('\nFunktionsübungen ok.');
