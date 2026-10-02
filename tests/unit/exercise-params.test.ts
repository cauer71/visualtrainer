/**
 * Einstellungen je Übung (`params`): Bereinigung, Variantenschlüssel, Kurzfassung, Speicherung.
 */
import { describe, expect, it } from 'vitest';
import { createFormatter } from '../../src/core/format';
import {
  decimalsOf,
  defaultParams,
  formatNumberParam,
  isDefaultParams,
  numParam,
  paramsOf,
  sanitizeParams,
  snapNumber,
  summarizeParams,
  variantKey,
} from '../../src/core/params';
import { currentVariant, getExerciseParams, getSettings, hasCustomParams, resetExerciseParams, setExerciseParam, updateSettings } from '../../src/core/storage';
import type { NumberParamDef, ParamDef, ParamTexts, ParamUnit } from '../../src/core/types';
import { PARAMS } from '../../src/exercises/labor-spot-touch/logic';
import { de as spotDe } from '../../src/exercises/labor-spot-touch/texts';

const DEFS: ParamDef[] = [
  { key: 'size', type: 'number', unit: 'cm', min: 1, max: 15, step: 0.5, default: 5, summary: true },
  { key: 'time', type: 'number', unit: 's', min: 0.3, max: 10, step: 0.1, default: 1.5, summary: true },
  { key: 'n', type: 'number', unit: 'count', min: 1, max: 5, step: 1, default: 1, summary: true },
  { key: 'odd', type: 'number', min: 0, max: 10, step: 3, default: 0 },
  { key: 'zone', type: 'select', default: 'all', options: ['all', 'edge'] },
  { key: 'sound', type: 'select', default: 'no', options: ['no', 'yes'], neutral: true },
];
const num = (k: string) => DEFS.find((d) => d.key === k) as NumberParamDef;

describe('Einstellungen bereinigen (ctx.params)', () => {
  it('Standardwerte', () => {
    expect(defaultParams(DEFS)).toEqual({ size: 5, time: 1.5, n: 1, odd: 0, zone: 'all', sound: 'no' });
    expect(defaultParams(undefined)).toEqual({});
  });

  it('gültige Werte bleiben, Zahlen werden auf min/max geklemmt', () => {
    const v = sanitizeParams(DEFS, { size: 7, time: 99, n: -4 });
    expect(v.size).toBe(7);
    expect(v.time).toBe(10);
    expect(v.n).toBe(1);
  });

  it('Zahlen werden auf das Raster min + k · step gerundet, ohne Gleitkomma-Reste', () => {
    expect(sanitizeParams(DEFS, { size: 5.3 }).size).toBe(5.5);
    expect(sanitizeParams(DEFS, { size: 5.2 }).size).toBe(5);
    expect(sanitizeParams(DEFS, { time: 1.34 }).time).toBe(1.3);
    expect(sanitizeParams(DEFS, { time: 0.9000000000000001 }).time).toBe(0.9);
    // Raster beginnt bei min (0,3): 0,3 + k · 0,1
    expect(sanitizeParams(DEFS, { time: 0.34 }).time).toBe(0.3);
    expect(sanitizeParams(DEFS, { n: 2.6 }).n).toBe(3);
  });

  it('liegt das Maximum nicht auf dem Raster, wird eine Stufe zurückgegangen', () => {
    // min 0, step 3, max 10 → Raster 0,3,6,9
    expect(sanitizeParams(DEFS, { odd: 10 }).odd).toBe(9);
    expect(sanitizeParams(DEFS, { odd: 99 }).odd).toBe(9);
    expect(sanitizeParams(DEFS, { odd: 4.4 }).odd).toBe(3);
  });

  it('Zahlen als Text werden gelesen; Unsinn fällt auf den Standard zurück', () => {
    expect(sanitizeParams(DEFS, { size: '8' }).size).toBe(8);
    expect(sanitizeParams(DEFS, { size: 'abc' }).size).toBe(5);
    expect(sanitizeParams(DEFS, { size: '' }).size).toBe(5);
    expect(sanitizeParams(DEFS, { size: NaN }).size).toBe(5);
    expect(sanitizeParams(DEFS, { size: Infinity }).size).toBe(5);
    expect(sanitizeParams(DEFS, { size: null }).size).toBe(5);
    expect(sanitizeParams(DEFS, { size: {} }).size).toBe(5);
  });

  it('Auswahl: nur erlaubte Werte, sonst Standard', () => {
    expect(sanitizeParams(DEFS, { zone: 'edge' }).zone).toBe('edge');
    expect(sanitizeParams(DEFS, { zone: 'quatsch' }).zone).toBe('all');
    expect(sanitizeParams(DEFS, { zone: 3 }).zone).toBe('all');
    expect(sanitizeParams(DEFS, { sound: 'yes' }).sound).toBe('yes');
  });

  it('unbekannte Schlüssel entfallen; ohne Eingabe gilt der Standard', () => {
    expect(sanitizeParams(DEFS, { fremd: 1 })).toEqual(defaultParams(DEFS));
    expect(sanitizeParams(DEFS, undefined)).toEqual(defaultParams(DEFS));
    expect(sanitizeParams(DEFS, null)).toEqual(defaultParams(DEFS));
    expect(sanitizeParams(undefined, { a: 1 })).toEqual({});
  });

  it('Hilfsfunktionen: Nachkommastellen, Raster, Lesen, Standard-Vergleich', () => {
    expect(decimalsOf(0.5)).toBe(1);
    expect(decimalsOf(0.05)).toBe(2);
    expect(decimalsOf(5)).toBe(0);
    expect(snapNumber({ min: 0, max: 1, step: 0.25 }, 0.6)).toBe(0.5);
    expect(numParam({ size: 'x' }, num('size'))).toBe(5);
    expect(numParam({ size: 7 }, num('size'))).toBe(7);
    expect(isDefaultParams(DEFS, {})).toBe(true);
    expect(isDefaultParams(DEFS, { size: 5.1 })).toBe(true); // wird auf 5 gerundet
    expect(isDefaultParams(DEFS, { size: 6 })).toBe(false);
    expect(isDefaultParams(DEFS, { sound: 'yes' })).toBe(false);
    expect(paramsOf({}, DEFS)).toEqual(defaultParams(DEFS));
    expect(paramsOf({ params: { size: 9 } }, DEFS)).toEqual({ size: 9 });
  });
});

describe('Variantenschlüssel (Vergleichbarkeit)', () => {
  it('ohne params oder ohne Einstellungen: leer', () => {
    expect(variantKey(undefined, { a: 1 })).toBe('');
    expect(variantKey([], {})).toBe('');
  });

  it('stabil: gleiche Werte → gleicher Schlüssel, unabhängig von der Reihenfolge der Eingabe', () => {
    const a = variantKey(DEFS, { size: 6, zone: 'edge', time: 2 });
    const b = variantKey(DEFS, { time: 2, zone: 'edge', size: 6 });
    expect(a).toBe(b);
    expect(a).toBe(variantKey(DEFS, { size: '6', zone: 'edge', time: 2.04 })); // bereinigt: 6, 'edge', 2
    expect(a).toContain('size=6');
    expect(a).toContain('zone=edge');
  });

  it('jede nicht neutrale Einstellung ändert den Schlüssel, Ton (neutral) nicht', () => {
    const base = variantKey(DEFS, {});
    for (const [k, v] of [['size', 6], ['time', 2], ['n', 2], ['odd', 3], ['zone', 'edge']] as const) {
      expect(variantKey(DEFS, { [k]: v }), k).not.toBe(base);
    }
    expect(variantKey(DEFS, { sound: 'yes' })).toBe(base);
  });

  it('Schlüssel ist von der Reihenfolge der Definitionen unabhängig (nach Namen sortiert)', () => {
    const rev = [...DEFS].reverse();
    expect(variantKey(rev, { size: 6 })).toBe(variantKey(DEFS, { size: 6 }));
  });

  it('Spot-Touch: Dauer, Größe, Sichtbarkeit, Anzahl, Pause, Bereich, Kreuz zählen; Ton nicht', () => {
    const base = variantKey(PARAMS, {});
    for (const [k, v] of [['durationS', 30], ['diameterCm', 7], ['persistenceS', 1], ['simultaneous', 2], ['gapMs', 0], ['zone', 'periphery'], ['fixation', 'yes']] as const) {
      expect(variantKey(PARAMS, { [k]: v }), k).not.toBe(base);
    }
    expect(variantKey(PARAMS, { sound: 'yes' })).toBe(base);
  });
});

describe('Kurzfassung für die Ergebnisseite', () => {
  const fmt = createFormatter('de');
  const unit = (u: ParamUnit) => ({ cm: 'cm', s: 's', ms: 'ms', bpm: 'bpm', count: '', deg: '°', percent: '%' })[u];
  const tx: Record<string, ParamTexts> = {
    size: { label: 'Größe' },
    n: { label: 'Anzahl', short: '{v} Punkt|{v} Punkte' },
    zone: { label: 'Bereich', options: { all: 'Alles', edge: 'Rand' } },
  };

  it('Standard: nur die mit summary markierten, mit Einheit und Sprachformat', () => {
    expect(summarizeParams(DEFS, tx, {}, fmt, unit)).toEqual(['5 cm', '1,5 s', '1 Punkt']);
  });

  it('Einzahl/Mehrzahl über die Vorlage', () => {
    expect(summarizeParams(DEFS, tx, { n: 3 }, fmt, unit)[2]).toBe('3 Punkte');
  });

  it('abweichende Einstellungen kommen dazu (Auswahl mit Name), neutrale nie', () => {
    const s = summarizeParams(DEFS, tx, { zone: 'edge', odd: 3, sound: 'yes' }, fmt, unit);
    expect(s).toEqual(['5 cm', '1,5 s', '1 Punkt', '3', 'Bereich: Rand']);
  });

  it('Spot-Touch (Deutsch): „5 cm · 1,5 s · 1 Punkt“ im Standard', () => {
    expect(summarizeParams(PARAMS, spotDe.params, {}, fmt, unit)).toEqual(['5 cm', '1,5 s', '1 Punkt']);
    expect(summarizeParams(PARAMS, spotDe.params, { simultaneous: 3, fixation: 'yes' }, fmt, unit)).toEqual(['5 cm', '1,5 s', '3 Punkte', 'Kreuz in der Mitte: Ja']);
  });

  it('Zahl-Format richtet sich nach der Schrittweite', () => {
    expect(formatNumberParam(num('time'), 1.5, fmt)).toBe('1,5');
    expect(formatNumberParam(num('n'), 2, fmt)).toBe('2');
  });
});

describe('Einstellungen speichern (je Übung, lokal)', () => {
  it('ohne gespeicherte Werte: Standard; ältere Datenstände haben kein exerciseParams', () => {
    expect(getSettings().exerciseParams).toBeUndefined();
    expect(getExerciseParams('u1', DEFS)).toEqual(defaultParams(DEFS));
    expect(hasCustomParams('u1', DEFS)).toBe(false);
    expect(currentVariant('u1', DEFS)).toBe(variantKey(DEFS, {}));
    expect(getExerciseParams('u1', undefined)).toEqual({});
  });

  it('Änderung wird bereinigt gespeichert, je Übung getrennt, andere Einstellungen bleiben', () => {
    const before = getSettings();
    const next = setExerciseParam('u1', DEFS, 'size', 7.3);
    expect(next.size).toBe(7.5);
    expect(getExerciseParams('u1', DEFS).size).toBe(7.5);
    expect(getExerciseParams('u2', DEFS).size).toBe(5);
    expect(hasCustomParams('u1', DEFS)).toBe(true);
    expect(getSettings().sound).toBe(before.sound);
    setExerciseParam('u1', DEFS, 'zone', 'edge');
    expect(getExerciseParams('u1', DEFS)).toMatchObject({ size: 7.5, zone: 'edge' });
    setExerciseParam('u1', DEFS, 'zone', 'quatsch');
    expect(getExerciseParams('u1', DEFS).zone).toBe('all');
  });

  it('„Standard wiederherstellen“ entfernt nur die Einstellungen dieser Übung', () => {
    setExerciseParam('u2', DEFS, 'size', 9);
    resetExerciseParams('u1', DEFS);
    expect(hasCustomParams('u1', DEFS)).toBe(false);
    expect(getExerciseParams('u1', DEFS)).toEqual(defaultParams(DEFS));
    expect(getExerciseParams('u2', DEFS).size).toBe(9);
  });

  it('beschädigte gespeicherte Werte werden beim Lesen bereinigt', () => {
    updateSettings({ exerciseParams: { u3: { size: 999, zone: 'x', n: 'drei' } } });
    expect(getExerciseParams('u3', DEFS)).toEqual({ ...defaultParams(DEFS), size: 15 });
  });
});
