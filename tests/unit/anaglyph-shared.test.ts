import { describe, expect, it } from 'vitest';
import { hasLiveControls, liveKeyDelta, nudgeValue } from '../../src/core/live';
import { createFormatter } from '../../src/core/format';
import { EXERCISES } from '../../src/exercises/registry';
import {
  anaglyphColorCheck,
  arcsecToCm,
  arcsecToPx,
  clock,
  cmToArcsec,
  cmToPd,
  colorNameOf,
  colorOffsets,
  cssOf,
  eyeColors,
  lensNameOf,
  LiveValue,
  liveDetail,
  liveSummary,
  pdToCm,
  pixelArcsec,
  pxToPd,
  readAnaglyph,
  shiftPx,
  toneCss,
  visualAngleDeg,
  P_BRIGHTNESS,
  P_RED_LEVEL,
  P_TONES,
} from '../../src/exercises/_shared/anaglyph';
import { anaglyphFeedbackDe, anaglyphFeedbackIt, anaglyphParamsDe, anaglyphParamsIt } from '../../src/exercises/_shared/anaglyph-texts';
import { laborFusion } from '../../src/exercises/labor-fusion';
import { laborRotGruenLesen } from '../../src/exercises/labor-rot-gruen-lesen';
import * as rgLogic from '../../src/exercises/labor-rot-gruen-lesen/logic';
import { laborStereo } from '../../src/exercises/labor-stereo';
import { leaves } from './_labor-sim';

describe('Umrechnung Δ ↔ cm ↔ Pixel ↔ Winkelsekunden', () => {
  it('1 Δ = 1 cm auf 1 m: Versatz in cm wächst mit der Sehentfernung, Umkehrung stimmt', () => {
    expect(pdToCm(1, 100)).toBeCloseTo(1, 10);
    expect(pdToCm(6, 40)).toBeCloseTo(2.4, 10);
    expect(pdToCm(6, 60)).toBeCloseTo(3.6, 10);
    for (const d of [30, 40, 65, 100]) for (const pd of [0.5, 3, 12, 40]) expect(cmToPd(pdToCm(pd, d), d)).toBeCloseTo(pd, 9);
  });

  it('Pixel: 6 Δ bei 40 cm und 38 px/cm = 91,2 px; Umkehrung', () => {
    expect(shiftPx(6, 40, 38)).toBeCloseTo(91.2, 6);
    expect(pxToPd(shiftPx(6, 40, 38), 40, 38)).toBeCloseTo(6, 9);
    expect(shiftPx(0, 40, 38)).toBe(0);
  });

  it('Winkelsekunden: Umkehrung, Näherung für kleine Winkel, monoton', () => {
    expect(cmToArcsec(arcsecToCm(600, 40), 40)).toBeCloseTo(600, 6);
    // 1 Δ ≈ 0,573 Grad ≈ 2063 ″
    expect(cmToArcsec(1, 100)).toBeCloseTo(2062.6, 0);
    expect(arcsecToCm(1200, 40)).toBeGreaterThan(arcsecToCm(600, 40));
    expect(arcsecToCm(600, 80)).toBeCloseTo(2 * arcsecToCm(600, 40), 6);
    expect(arcsecToPx(600, 40, 38)).toBeCloseTo(arcsecToCm(600, 40) * 38, 9);
  });

  it('feinste Stufe des Bildschirms: ein Pixel in Winkelsekunden, wächst mit größeren Pixeln und kleinerem Abstand', () => {
    expect(pixelArcsec(40, 38)).toBeCloseTo(135.7, 1);
    expect(pixelArcsec(40, 76)).toBeLessThan(pixelArcsec(40, 38));
    expect(pixelArcsec(80, 38)).toBeLessThan(pixelArcsec(40, 38));
  });

  it('Sehwinkel in Grad', () => {
    expect(visualAngleDeg(1.2, 40)).toBeCloseTo(1.72, 2);
  });
});

describe('Farben und Auge', () => {
  it('reines Rot, reines Grün, Cyan, Blau; Helligkeit gemeinsam und je Farbe getrennt', () => {
    expect(toneCss('redgreen')).toMatchObject({ a: 'rgb(255,0,0)', b: 'rgb(0,255,0)' });
    expect(toneCss('redcyan').b).toBe('rgb(0,255,255)');
    expect(toneCss('redblue').b).toBe('rgb(0,160,255)');
    expect(toneCss('redgreen', 80).a).toBe('rgb(204,0,0)');
    expect(toneCss('redblue', 100, 60, 80)).toMatchObject({ a: 'rgb(153,0,0)', b: 'rgb(0,128,204)' });
    expect(cssOf({ tones: 'redgreen', brightness: 100, redLevel: 100, secondLevel: 100 })).toEqual(toneCss('redgreen'));
  });

  it('welche Farbe sieht welches Auge', () => {
    expect(eyeColors('red')).toEqual({ left: 'a', right: 'b' });
    expect(eyeColors('green')).toEqual({ left: 'b', right: 'a' });
  });

  it('Vorzeichen des Versatzes: Konvergenz = Bild des linken Auges nach rechts; Divergenz kehrt um; Summe der Abstände = Versatz', () => {
    const conv = colorOffsets('red', 'convergence', 10);
    expect(conv).toEqual({ a: 5, b: -5 });
    expect(colorOffsets('red', 'divergence', 10)).toEqual({ a: -5, b: 5 });
    expect(colorOffsets('green', 'convergence', 10)).toEqual({ a: -5, b: 5 });
    expect(colorOffsets('green', 'divergence', 10)).toEqual({ a: 5, b: -5 });
    for (const lens of ['red', 'green'] as const) for (const dir of ['convergence', 'divergence'] as const) {
      const o = colorOffsets(lens, dir, 7);
      expect(Math.abs(o.a - o.b)).toBeCloseTo(7, 10);
      expect(o.a + o.b).toBeCloseTo(0, 10);
      const left = eyeColors(lens).left;
      // Das linke Auge sieht sein Bild bei Konvergenz rechts vom Bild des rechten Auges
      expect(o[left] > o[left === 'a' ? 'b' : 'a']).toBe(dir === 'convergence');
    }
  });
});

describe('gemeinsame Einstellungen', () => {
  it('readAnaglyph: Standardwerte, fehlende oder ungültige Werte → Standard, Helligkeit nur bei Bedarf', () => {
    expect(readAnaglyph({})).toEqual({ tones: 'redgreen', leftLens: 'red', brightness: 100, redLevel: 100, secondLevel: 100, glassesCheck: 'steps' });
    expect(readAnaglyph({ tones: 'bogus', redLevel: 'x' as unknown as number, brightness: 90 })).toMatchObject({ tones: 'redgreen', redLevel: 100, brightness: 90 });
    expect(readAnaglyph({ brightness: 90 }, false).brightness).toBe(100);
    expect(readAnaglyph({ leftLens: 'green', tones: 'redblue', redLevel: 60, secondLevel: 40, glassesCheck: 'simple' })).toMatchObject({
      leftLens: 'green',
      tones: 'redblue',
      redLevel: 60,
      secondLevel: 40,
      glassesCheck: 'simple',
    });
  });

  it('Grenzen der Helligkeit je Farbe: 30–100 %, Schritte von 10 %; gemeinsame Helligkeit 80–100 %', () => {
    expect([P_RED_LEVEL.min, P_RED_LEVEL.max, P_RED_LEVEL.step]).toEqual([30, 100, 10]);
    expect([P_BRIGHTNESS.min, P_BRIGHTNESS.max]).toEqual([80, 100]);
    expect(P_TONES.options).toEqual(['redgreen', 'redcyan', 'redblue']);
  });

  it('alle drei Übungen nutzen dieselben gemeinsamen Einstellungen (Farbpaar, Helligkeit je Farbe, Brille, Prüfbild)', () => {
    for (const def of [laborRotGruenLesen, laborFusion, laborStereo]) {
      const keys = (def.params ?? []).map((p) => p.key);
      for (const k of ['tones', 'leftLens', 'redLevel', 'secondLevel', 'glassesCheck']) expect(keys, `${def.id} ${k}`).toContain(k);
      const check = (def.params ?? []).find((p) => p.key === 'glassesCheck')!;
      expect(check.neutral).toBe(true);
    }
  });

  it('Rot-Grün-Lesen nutzt die gemeinsamen Bausteine (gleiche Funktionen, kein Verhaltensunterschied)', () => {
    expect(rgLogic.pdToCm).toBe(pdToCm);
    expect(rgLogic.shiftPx).toBe(shiftPx);
    expect(rgLogic.colorOffsets).toBe(colorOffsets);
    expect(rgLogic.eyeColors).toBe(eyeColors);
    expect(rgLogic.toneCss).toBe(toneCss);
    expect(rgLogic.visualAngleDeg).toBe(visualAngleDeg);
    expect(rgLogic.PARAMS.map((p) => p.key)).toEqual([
      'symbols', 'length', 'sizeCm', 'mix', 'leftLens', 'showFor', 'trials', 'tones', 'brightness', 'redLevel', 'secondLevel', 'glassesCheck', 'controlMarks', 'shiftPd', 'shiftDir', 'rampDurchgaenge',
    ]);
  });
});

describe('Prüfbild (gemeinsam)', () => {
  const tx = laborFusion.texts.de;
  it('einfach: zwei beschriftete Flächen; Schritt für Schritt: fünf Schritte, Glas wählen, Helligkeit je Farbe', () => {
    const simple = anaglyphColorCheck(readAnaglyph({ glassesCheck: 'simple' }), tx);
    expect(simple.panels.map((p) => p.label)).toEqual(['Rot', 'Grün']);
    expect(simple.steps).toBeUndefined();
    const steps = anaglyphColorCheck(readAnaglyph({ tones: 'redblue' }), tx);
    expect(steps.panels.map((p) => p.label)).toEqual(['Rot', 'Blau']);
    expect(steps.panels[1].color).toBe('rgb(0,160,255)');
    expect(steps.steps).toHaveLength(5);
    expect(steps.steps![3].adjust?.[0]).toMatchObject({ kind: 'choice', key: 'leftLens' });
    expect(steps.steps![4].adjust).toHaveLength(2);
    expect(steps.note).toBe(tx.feedback.checkGhost);
  });

  it('Namen der Farben und Gläser folgen dem Farbpaar, in beiden Sprachen', () => {
    for (const def of [laborFusion, laborStereo, laborRotGruenLesen]) {
      for (const lang of ['de', 'it'] as const) {
        const t = def.texts[lang];
        expect(colorNameOf(t, 'redgreen', 'a')).toBe(lang === 'de' ? 'Rot' : 'Rosso');
        expect(colorNameOf(t, 'redcyan', 'b')).toBe(lang === 'de' ? 'Cyan' : 'Ciano');
        expect(colorNameOf(t, 'redblue', 'b')).toBe(lang === 'de' ? 'Blau' : 'Blu');
        expect(lensNameOf(t, 'redgreen', 'b')).toBe(lang === 'de' ? 'grün' : 'verde');
      }
    }
  });

  it('gemeinsame Texte: DE und IT haben dieselben Schlüssel', () => {
    expect(Object.keys(anaglyphFeedbackIt).sort()).toEqual(Object.keys(anaglyphFeedbackDe).sort());
    expect(leaves(anaglyphParamsIt).sort()).toEqual(leaves(anaglyphParamsDe).sort());
    // jede Übung bindet sie in feedback ein
    for (const def of [laborFusion, laborStereo, laborRotGruenLesen]) {
      for (const lang of ['de', 'it'] as const) for (const k of Object.keys(anaglyphFeedbackDe)) expect(def.texts[lang].feedback[k], `${def.id} ${lang} ${k}`).toBeTruthy();
    }
  });
});

describe('Trainer-Regler: Wert (LiveValue)', () => {
  const make = () => new LiveValue({ start: 0, min: -10, max: 10, maxJump: 2 });

  it('Start = Startwert; Grenzen und Sprung je Änderung (höchstens 2): größere Wünsche werden begrenzt', () => {
    const v = new LiveValue({ start: 3, min: 0, max: 10, maxJump: 2 });
    expect(v.target).toBe(3);
    expect(v.shown).toBe(3);
    expect(v.set(9, 1000, 1)).toBe(5);
    expect(v.set(5, 1100, 1)).toBeNull();
    expect(v.set(-9, 1200, 1)).toBe(3);
    // nie unter min, nie über max
    for (let i = 0; i < 10; i++) v.set(v.target + 2, 2000 + i, 1);
    expect(v.target).toBe(10);
    for (let i = 0; i < 10; i++) v.set(v.target - 2, 3000 + i, 1);
    expect(v.target).toBe(0);
  });

  it('nie ein Sprung über 2 pro Aufruf, auch bei beliebigen Wünschen', () => {
    const v = make();
    let prev = v.target;
    for (const want of [100, -100, 1.3, 0.2, 55, -7, 3]) {
      v.set(want, 1, 1);
      expect(Math.abs(v.target - prev)).toBeLessThanOrEqual(2 + 1e-9);
      prev = v.target;
    }
  });

  it('ungültige Werte werden ignoriert', () => {
    const v = make();
    expect(v.set(Number.NaN, 1, 1)).toBeNull();
    expect(v.set(Infinity, 1, 1)).toBeNull();
    expect(v.target).toBe(0);
    expect(v.log).toHaveLength(0);
  });

  it('Anzeige gleitet: ein Sprung von 2 dauert mindestens 150 ms, nie schneller; erreicht das Ziel, ohne zu überschwingen', () => {
    const v = make();
    v.set(2, 0, 1);
    expect(v.shown).toBe(0);
    expect(v.settled).toBe(false);
    let t = 0;
    let prev = v.shown;
    while (!v.settled && t < 5000) {
      v.update(1 / 60);
      t += 1000 / 60;
      expect(v.shown).toBeGreaterThanOrEqual(prev);
      expect(v.shown).toBeLessThanOrEqual(2 + 1e-9);
      prev = v.shown;
    }
    expect(t).toBeGreaterThanOrEqual(150);
    expect(t).toBeLessThanOrEqual(400);
    expect(v.shown).toBe(2);
    expect(v.settled).toBe(true);
  });

  it('Gleitdauer lässt sich nicht unter 150 ms stellen', () => {
    const v = new LiveValue({ start: 0, min: 0, max: 10, maxJump: 2, glideMs: 10 });
    v.set(2, 0, 1);
    v.update(0.1);
    expect(v.settled).toBe(false);
  });

  it('Protokoll: Zeitpunkt, Wert, Durchgang und Gesamtwert; unveränderte Wünsche zählen nicht; aim/jump protokollieren nicht', () => {
    const v = make();
    v.set(1, 1234.4, 2, (x) => x + 10);
    v.set(1, 1300, 2);
    v.set(2.5, 2000, 3);
    expect(v.log).toEqual([
      { t: 1234, value: 1, trial: 2, total: 11 },
      { t: 2000, value: 2.5, trial: 3, total: 2.5 },
    ]);
    v.aim(0);
    v.jump(5);
    expect(v.log).toHaveLength(2);
    expect(v.shown).toBe(5);
    expect(liveSummary(v.log).n).toBe(2);
    expect(liveSummary(v.log).last?.value).toBe(2.5);
    expect(liveSummary([]).last).toBeNull();
  });

  it('Zeitanzeige m:ss', () => {
    expect(clock(0)).toBe('0:00');
    expect(clock(61_400)).toBe('1:01');
    expect(clock(-5)).toBe('0:00');
  });
});

describe('Trainer-Regler: Ergebnistabelle', () => {
  const fmt = createFormatter('de');
  const f = laborFusion.texts.de.feedback;
  it('ohne Änderung keine Tabelle; sonst Anzahl, zuletzt, erste Änderungen mit Zeitpunkt; höchstens 10 Zeilen', () => {
    expect(liveDetail([], f, fmt, 'Δ', 1, true)).toBeNull();
    const log = Array.from({ length: 13 }, (_, i) => ({ t: 1000 * (i + 1), value: 0.5 * (i + 1), trial: 1 + (i % 3), total: 1 + i }));
    const t = liveDetail(log, f, fmt, 'Δ', 1, true)!;
    expect(t.title).toBe(f.liveTitle);
    expect(t.rows[0].label).toBe('Versatz vom Trainer verändert');
    expect(t.rows[0].value).toContain('13-mal');
    expect(t.rows[0].value).toContain('+6,5 Δ');
    expect(t.rows).toHaveLength(1 + 10 + 1);
    expect(t.rows[1].label).toContain('0:01');
    expect(t.rows[11].label).toContain('3 weitere');
    expect(t.note).toBeTruthy();
    // ohne Zusatz keine Vorzeichen
    const abs = liveDetail([{ t: 5000, value: 7.5, trial: 1, total: 7.5 }], f, fmt, 'Δ', 1, false)!;
    expect(abs.rows[0].value).toContain('zuletzt 7,5 Δ');
  });
});

describe('Trainer-Regler: Hilfen (nur Trainer-Ansicht, Tasten)', () => {
  it('Regler nur in der Trainer- und Entwickler-Ansicht und nur bei Übungen mit liveControls', () => {
    for (const def of [laborRotGruenLesen, laborFusion, laborStereo]) {
      expect(hasLiveControls(def, true), def.id).toBe(true);
      expect(hasLiveControls(def, false), def.id).toBe(false);
    }
    expect(hasLiveControls({}, true)).toBe(false);
    expect(hasLiveControls({ liveControls: [] }, true)).toBe(false);
  });

  it('Tasten: + und − kleiner Schritt, Bild auf/ab grober Schritt, alle anderen ohne Wirkung', () => {
    const s = { step: 0.5, coarseStep: 2 };
    expect(liveKeyDelta('+', s)).toBe(0.5);
    expect(liveKeyDelta('=', s)).toBe(0.5);
    expect(liveKeyDelta('-', s)).toBe(-0.5);
    expect(liveKeyDelta('_', s)).toBe(-0.5);
    expect(liveKeyDelta('PageUp', s)).toBe(2);
    expect(liveKeyDelta('PageDown', s)).toBe(-2);
    for (const k of [' ', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', '0', '5', 'a', '?', 'Backspace']) expect(liveKeyDelta(k, s), k).toBe(0);
  });

  it('Schritt auf den Wert: auf Min/Max begrenzt', () => {
    expect(nudgeValue({ value: 1, min: 0, max: 5 }, 0.5)).toBe(1.5);
    expect(nudgeValue({ value: 5, min: 0, max: 5 }, 2)).toBe(5);
    expect(nudgeValue({ value: 0.5, min: 0, max: 5 }, -2)).toBe(0);
  });

  it('Standardwerte der Übungen: Regler beschrieben (Schritt, grober Schritt, Einheit), Beschriftung in DE und IT', () => {
    for (const def of [laborRotGruenLesen, laborFusion, laborStereo]) {
      expect(def.liveControls?.length, def.id).toBe(1);
      const c = def.liveControls![0];
      expect(c.step).toBeGreaterThan(0);
      expect(c.coarseStep).toBeGreaterThan(c.step);
      expect(c.max).toBeGreaterThan(c.min);
      for (const lang of ['de', 'it'] as const) expect(def.texts[lang].liveLabels?.[c.key], `${def.id} ${lang}`).toBeTruthy();
    }
    expect(laborRotGruenLesen.liveControls![0]).toMatchObject({ key: 'shiftPd', unit: 'Δ', step: 0.5, coarseStep: 2 });
    expect(laborFusion.liveControls![0]).toMatchObject({ key: 'shiftPd', unit: 'Δ', step: 0.5, coarseStep: 2 });
    // Fusion: nie mehr als 40 Δ
    expect(laborFusion.liveControls![0].max).toBeLessThanOrEqual(40);
  });

  it('Übungen ohne Regler bleiben unverändert: nur diese drei haben liveControls', () => {
    const withLive = EXERCISES.filter((e) => e.liveControls?.length).map((e) => e.id).sort();
    expect(withLive).toEqual(['labor-fusion', 'labor-rot-gruen-lesen', 'labor-stereo']);
  });
});
