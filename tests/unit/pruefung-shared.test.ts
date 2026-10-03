/**
 * Gemeinsame Bausteine der Funktionsübungen (Hess-Schirm, Worth-Vier-Punkte, Schober, Diplopie-Karte, Subjektive Vertikale,
 * Orts-Projektion): Blickraster, Brillen-/Farbhilfen mit Prüfbild, Anordnung und Tasten.
 */
import { describe, expect, it } from 'vitest';
import type { ExerciseTexts, StageInfo } from '../../src/core/types';
import { ANA_PARAMS, anaColorCheck, anaCss, anaEyeColors, anaEyeOf, anaParams, cmToPd, pdToCm } from '../../src/exercises/_shared/pruefung-anaglyph';
import { fitGrid, hessGrid, nineGrid, polygonArea, project, unproject } from '../../src/exercises/_shared/pruefung-blick';
import { ANA_FEEDBACK, ANA_PARAM_TEXTS, COMMON } from '../../src/exercises/_shared/pruefung-texte';
import { MIN_BTN_PX, MIN_BTN_PX_DEMO, pruefLayout, splitRow, wrapLines } from '../../src/exercises/_shared/pruefung-ui';
import { sanitizeParams } from '../../src/core/params';
import { fakeG, leaves } from './_labor-sim';

const stageOf = (w: number, h: number): StageInfo => ({ w, h, u: Math.min(w, h) / 100, dpr: 1 });

describe('Blickraster', () => {
  it('Hess-Raster: 25 Punkte, 9 innen und 16 außen, Winkel ±max und ±max/2', () => {
    const g = hessGrid(20);
    expect(g).toHaveLength(25);
    expect(g.filter((p) => p.ring === 'inner')).toHaveLength(9);
    expect(g.filter((p) => p.ring === 'outer')).toHaveLength(16);
    expect(new Set(g.map((p) => p.id)).size).toBe(25);
    expect(Math.max(...g.map((p) => p.hx))).toBe(20);
    expect(Math.max(...g.filter((p) => p.ring === 'inner').map((p) => Math.abs(p.hx)))).toBe(10);
    // oben links zuerst, y wächst nach oben
    expect(g[0]).toMatchObject({ hx: -20, vy: 20, id: 1 });
    expect(g[24]).toMatchObject({ hx: 20, vy: -20, id: 25 });
  });

  it('Neun Richtungen: Mitte und acht Randpunkte', () => {
    const g = nineGrid(15);
    expect(g).toHaveLength(9);
    expect(g.filter((p) => p.ring === 'center')).toHaveLength(1);
    expect(g.find((p) => p.ring === 'center')).toMatchObject({ hx: 0, vy: 0, id: 5 });
    expect(g[0]).toMatchObject({ hx: -15, vy: 15 });
    expect(g[8]).toMatchObject({ hx: 15, vy: -15 });
  });

  it('Projektion auf eine ebene Fläche: Abstand · tan(Winkel), Umkehrung ergibt den Winkel zurück', () => {
    const q = project(50, 20, -10);
    expect(q.x).toBeCloseTo(50 * Math.tan((20 * Math.PI) / 180), 9);
    expect(q.y).toBeCloseTo(50 * Math.tan((-10 * Math.PI) / 180), 9);
    const back = unproject(50, q.x, q.y);
    expect(back.hx).toBeCloseTo(20, 9);
    expect(back.vy).toBeCloseTo(-10, 9);
    expect(project(40, 0, 0)).toEqual({ x: 0, y: 0 });
  });

  it('Anpassung an das Feld: passt immer hinein, behält die Winkel-Verhältnisse, meldet das Verkleinern', () => {
    const grid = hessGrid(20);
    const big = fitGrid(40, grid, 60, 60, 1.5);
    expect(big.clamped).toBe(false);
    expect(big.scale).toBe(1);
    expect(big.effMaxDeg).toBeCloseTo(20, 9);
    for (const [w, h] of [
      [10, 10],
      [20, 12],
      [30, 14],
      [9.8, 18],
    ]) {
      const f = fitGrid(40, grid, w, h, 1.5);
      expect(f.clamped).toBe(true);
      expect(f.scale).toBeLessThan(1);
      expect(f.scale).toBeGreaterThan(0);
      for (const p of f.points) {
        expect(Math.abs(p.x)).toBeLessThanOrEqual(w / 2 - 1.5 + 1e-6);
        expect(Math.abs(p.y)).toBeLessThanOrEqual(h / 2 - 1.5 + 1e-6);
        // der Ort gehört zum (verkleinerten) Winkel
        const q = project(40, p.hx, p.vy);
        expect(p.x).toBeCloseTo(q.x, 9);
        expect(p.y).toBeCloseTo(q.y, 9);
      }
      expect(f.effMaxDeg).toBeCloseTo(20 * f.scale, 9);
      // knapp: ein etwas größerer Faktor würde nicht mehr passen
      const worst = Math.max(...f.points.map((p) => Math.max(Math.abs(p.x) / (w / 2 - 1.5), Math.abs(p.y) / (h / 2 - 1.5))));
      expect(worst).toBeGreaterThan(0.999);
    }
  });

  it('Fläche eines Vielecks (Schnürsenkelformel)', () => {
    expect(polygonArea([{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 3 }, { x: 0, y: 3 }])).toBe(12);
    expect(polygonArea([{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 0, y: 3 }])).toBe(6);
    expect(polygonArea([{ x: 1, y: 1 }])).toBe(0);
    expect(polygonArea([])).toBe(0);
  });
});

describe('Brille, Farben und Umrechnung', () => {
  it('Einstellungen: Standard Rot/Grün, Linkes Glas rot, Helligkeit 100 %, Prüfbild Schritt für Schritt (neutral)', () => {
    const p = anaParams(sanitizeParams(ANA_PARAMS, {}));
    expect(p).toEqual({ leftLens: 'red', tones: 'redgreen', redLevel: 100, secondLevel: 100, glassesCheck: 'steps' });
    expect(ANA_PARAMS.find((d) => d.key === 'glassesCheck')!.neutral).toBe(true);
    // ungültige Werte → Standard, Helligkeit geklemmt
    expect(anaParams({ leftLens: 'x', tones: 'y', redLevel: 5, secondLevel: 500, glassesCheck: 'z' })).toEqual({ leftLens: 'red', tones: 'redgreen', redLevel: 30, secondLevel: 100, glassesCheck: 'steps' });
    expect(anaParams({ leftLens: 'green', tones: 'redblue' }).leftLens).toBe('green');
  });

  it('Farbpaare: reines Rot, reines Grün, Cyan, Blau (0,160,255); Helligkeit je Farbe getrennt', () => {
    expect(anaCss({ tones: 'redgreen', redLevel: 100, secondLevel: 100 })).toMatchObject({ a: 'rgb(255,0,0)', b: 'rgb(0,255,0)' });
    expect(anaCss({ tones: 'redcyan', redLevel: 100, secondLevel: 100 }).b).toBe('rgb(0,255,255)');
    expect(anaCss({ tones: 'redblue', redLevel: 100, secondLevel: 100 }).b).toBe('rgb(0,160,255)');
    const c = anaCss({ tones: 'redblue', redLevel: 50, secondLevel: 30 });
    expect(c.a).toBe('rgb(128,0,0)');
    expect(c.b).toBe('rgb(0,48,77)');
    expect(c.neutral).toBe('rgb(200,200,200)');
  });

  it('Welches Auge sieht welche Farbe: Rotglas links → links Rot; sonst umgekehrt', () => {
    expect(anaEyeColors('red')).toEqual({ left: 'a', right: 'b' });
    expect(anaEyeColors('green')).toEqual({ left: 'b', right: 'a' });
    expect(anaEyeOf('red', 'a')).toBe('left');
    expect(anaEyeOf('red', 'b')).toBe('right');
    expect(anaEyeOf('green', 'a')).toBe('right');
    expect(anaEyeOf('green', 'b')).toBe('left');
  });

  it('Prismendioptrien: 1 Δ = 1 cm auf 1 m, Umkehrung', () => {
    expect(pdToCm(1, 100)).toBe(1);
    expect(pdToCm(6, 40)).toBeCloseTo(2.4, 12);
    expect(pdToCm(0.5, 60)).toBeCloseTo(0.3, 12);
    expect(cmToPd(2.4, 40)).toBeCloseTo(6, 12);
    for (const pd of [0.25, 1, 7.5, 12]) for (const d of [30, 40, 100]) expect(cmToPd(pdToCm(pd, d), d)).toBeCloseTo(pd, 12);
  });

  const defs = ANA_PARAMS;
  const tx = (lang: 'de' | 'it'): ExerciseTexts => ({ title: '', tagline: '', steps: [], why: '', goodFor: [], captions: {}, metrics: {}, tips: {}, feedback: ANA_FEEDBACK[lang], params: ANA_PARAM_TEXTS[lang] });

  it('Prüfbild einfach: zwei beschriftete Flächen in den eingestellten Farben, keine Schritte', () => {
    const info = anaColorCheck({ glassesCheck: 'simple', tones: 'redcyan', redLevel: 100, secondLevel: 100 }, tx('de'), defs);
    expect(info.panels.map((p) => p.color)).toEqual(['rgb(255,0,0)', 'rgb(0,255,255)']);
    expect(info.panels.map((p) => p.label)).toEqual(['Rot', 'Cyan']);
    expect(info.steps).toBeUndefined();
    expect(info.text).toMatch(/roten Glas vor dem Auge sollte die grüne/);
  });

  it('Prüfbild Schritt für Schritt: fünf Schritte (Brille, linkes Auge zu, rechtes Auge zu, Glas, Helligkeit je Farbe), Geisterbild-Hinweis', () => {
    for (const lang of ['de', 'it'] as const) {
      const info = anaColorCheck({ glassesCheck: 'steps', tones: 'redblue', leftLens: 'red', redLevel: 80, secondLevel: 60 }, tx(lang), defs);
      expect(info.steps).toHaveLength(5);
      expect(info.note).toBe(ANA_FEEDBACK[lang].checkGhost);
      // Linkes Auge zugehalten → das rechte Auge sieht nur die Farbe seines Glases (Blau); umgekehrt Rot
      expect(info.steps![1].text).toContain(ANA_FEEDBACK[lang].adjBlue);
      expect(info.steps![2].text).toContain(ANA_FEEDBACK[lang].adjRed);
      const lens = info.steps![3].adjust![0];
      expect(lens.kind).toBe('choice');
      if (lens.kind === 'choice') {
        expect(lens.key).toBe('leftLens');
        expect(lens.options.map((o) => o.value)).toEqual(['red', 'green']);
        expect(lens.value).toBe('red');
      }
      const levels = info.steps![4].adjust!;
      expect(levels).toHaveLength(2);
      for (const l of levels) {
        expect(l.kind).toBe('level');
        if (l.kind === 'level') {
          expect([l.min, l.max, l.step]).toEqual([30, 100, 10]);
          expect(l.downLabel).toMatch(/dunkler|più scuro/);
          expect(l.upLabel).toMatch(/heller|più chiaro/);
        }
      }
      expect(levels.map((l) => l.key)).toEqual(['redLevel', 'secondLevel']);
      expect(levels[0].kind === 'level' && levels[0].value).toBe(80);
      expect(levels[1].kind === 'level' && levels[1].value).toBe(60);
    }
  });

  it('Texte für Farben und Einstellungen: DE und IT mit gleichen Schlüsseln und ohne Rechtswörter', () => {
    expect(leaves(ANA_FEEDBACK.it).sort()).toEqual(leaves(ANA_FEEDBACK.de).sort());
    expect(leaves(ANA_PARAM_TEXTS.it).sort()).toEqual(leaves(ANA_PARAM_TEXTS.de).sort());
    expect(Object.keys(ANA_PARAM_TEXTS.de).sort()).toEqual(ANA_PARAMS.map((d) => d.key).sort());
    expect(leaves(COMMON.it).sort()).toEqual(leaves(COMMON.de).sort());
    // Pflichtinhalte der Sicherheitshinweise
    expect(COMMON.de.warn).toMatch(/Schielen/);
    expect(COMMON.de.warn).toMatch(/Sehverlust/);
    expect(COMMON.de.warn).toMatch(/Kopfschmerz/);
    expect(COMMON.de.warn).toMatch(/Schwindel/);
    expect(COMMON.de.warn).toMatch(/Muchnick/);
    expect(COMMON.de.epilepsy).toMatch(/photosensitiver Epilepsie/);
    expect(COMMON.de.epilepsy).toMatch(/Rücksprache/);
    expect(COMMON.de.principle).toMatch(/kein Ersatz für die Untersuchung/);
    for (const k of ['Augenärztin', 'Orthoptistin', 'Optometrist']) expect(COMMON.de.principle).toContain(k);
    expect(COMMON.it.warn).toMatch(/strabismo/);
    expect(COMMON.it.epilepsy).toMatch(/epilessia fotosensibile/);
    expect(COMMON.it.principle).toMatch(/non sostituisce la visita/);
    expect(COMMON.de.colorBlind).toMatch(/8 %/);
    expect(COMMON.de.colorBlind).toMatch(/Birch/);
  });
});

describe('Anordnung und Tasten', () => {
  const stages = [
    ['Tablet quer', 1180, 820],
    ['Tablet hoch', 820, 1180],
    ['Handy', 390, 844],
    ['Handy quer', 844, 390],
  ] as const;

  for (const [name, w, h] of stages) {
    for (const rows of [0, 1, 2]) {
      it(`${name}, ${rows} Tastenzeilen im Spiel: Tasten ≥ 56 px, alles auf der Bühne, Feld und Tasten überlappen nicht`, () => {
        const s = stageOf(w, h);
        const L = pruefLayout(s, false, rows);
        expect(L.rows).toHaveLength(rows);
        expect(L.btnH).toBeGreaterThanOrEqual(MIN_BTN_PX);
        for (const r of L.rows) {
          expect(r.h).toBeGreaterThanOrEqual(MIN_BTN_PX - 0.01);
          expect(r.x).toBeGreaterThanOrEqual(0);
          expect(r.x + r.w).toBeLessThanOrEqual(w + 0.01);
          expect(r.y + r.h).toBeLessThanOrEqual(h + 0.01);
          expect(L.field.y + L.field.h).toBeLessThanOrEqual(r.y + 0.01);
        }
        for (let i = 1; i < L.rows.length; i++) expect(L.rows[i].y).toBeGreaterThanOrEqual(L.rows[i - 1].y + L.rows[i - 1].h);
        expect(L.field.y).toBeGreaterThanOrEqual(L.hintTop + L.hintH - 0.01);
        expect(L.field.w).toBeGreaterThan(40);
        expect(L.field.h).toBeGreaterThan(40);
        expect(L.field.x + L.field.w).toBeLessThanOrEqual(w + 0.01);
      });
    }
  }

  it('Intro-Film: unten bleibt Platz für Hand und Bildunterschrift, Tasten dürfen auf ≥ 34 px schrumpfen', () => {
    for (const [w, h] of [
      [1040, 715],
      [520, 358],
      [360, 640],
    ]) {
      const s = stageOf(w, h);
      const play = pruefLayout(s, false, 2);
      const demo = pruefLayout(s, true, 2);
      expect(demo.rows[1].y + demo.rows[1].h).toBeLessThan(play.rows[1].y + play.rows[1].h);
      for (const r of demo.rows) expect(r.h).toBeGreaterThanOrEqual(MIN_BTN_PX_DEMO - 0.01);
      expect(demo.field.h).toBeGreaterThan(40);
    }
  });

  it('Tastenzeile teilen: Breiten im Verhältnis der Gewichte, Abstand dazwischen, nichts ragt heraus', () => {
    const row = { x: 10, y: 700, w: 370, h: 64 };
    const parts = splitRow(row, [1, 1, 1, 1, 1.7], 8);
    expect(parts).toHaveLength(5);
    expect(parts[0].x).toBe(10);
    const last = parts[4];
    expect(last.x + last.w).toBeCloseTo(10 + 370, 9);
    for (let i = 1; i < parts.length; i++) expect(parts[i].x - (parts[i - 1].x + parts[i - 1].w)).toBeCloseTo(8, 9);
    expect(parts[4].w / parts[0].w).toBeCloseTo(1.7, 9);
    for (const p of parts) expect(p.h).toBe(64);
    // Handy: fünf Tasten ≥ 56 px breit
    const phone = pruefLayout(stageOf(390, 844), false, 1);
    for (const p of splitRow(phone.rows[0], [1, 1, 1, 1, 1.7], phone.gap)) expect(p.w).toBeGreaterThanOrEqual(MIN_BTN_PX - 0.01);
  });

  it('Textumbruch: höchstens so viele Zeilen wie erlaubt, kein Wort geht verloren', () => {
    const g = fakeG();
    const msg = 'Durchgang A: Fixiere das Ziel. Lege den Zeiger dorthin, wo er auf dem Ziel zu liegen scheint (ziehen oder tippen), dann „OK“.';
    const lines = wrapLines(g, msg, 300, 2);
    expect(lines.length).toBeLessThanOrEqual(2);
    expect(lines.join(' ').split(/\s+/)).toEqual(msg.split(/\s+/));
    expect(wrapLines(g, 'kurz', 300, 2)).toEqual(['kurz']);
    expect(wrapLines(g, '', 300, 2)).toEqual([]);
  });
});
