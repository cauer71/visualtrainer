/**
 * Variantenbewusste Ergebnisvergleiche: Verlauf, Bestwert und „Letztes Mal“ gelten nur innerhalb gleicher
 * Einstellungen (Variantenschlüssel); Übungen ohne Einstellungen verhalten sich unverändert (Variante leer).
 */
import { describe, expect, it } from 'vitest';
import { variantKey } from '../../src/core/params';
import { bestFor, clearAll, entryVariant, getRecord, saveResult } from '../../src/core/storage';
import { PARAMS } from '../../src/exercises/labor-spot-touch/logic';

const e = (primary: number) => ({ primary, score: primary * 10, level: 1 });

describe('ohne Einstellungen (alle bisherigen Übungen): Verhalten unverändert', () => {
  it('Vergleich mit dem letzten Lauf, Bestwert, Verlauf wie bisher', () => {
    clearAll();
    const a = saveResult('alt-1', e(10), 'count', 'higher');
    expect(a.variant).toBe('');
    expect(a.previous).toBeNull();
    expect(a.previousBest).toBeNull();
    expect(a.isBest).toBe(false); // erster Lauf: kein „neuer Bestwert“
    expect(a.onlyOtherVariants).toBe(false);
    expect(a.history.map((h) => h.p)).toEqual([10]);
    const b = saveResult('alt-1', e(12), 'count', 'higher');
    expect(b.previous?.p).toBe(10);
    expect(b.previousBest).toBe(10);
    expect(b.isBest).toBe(true);
    const c = saveResult('alt-1', e(8), 'count', 'higher');
    expect(c.previous?.p).toBe(12);
    expect(c.previousBest).toBe(12);
    expect(c.isBest).toBe(false);
    expect(c.history.map((h) => h.p)).toEqual([10, 12, 8]);
    const rec = getRecord('alt-1');
    expect(rec.best).toBe(12);
    expect(rec.bv).toBeUndefined();
    expect(rec.history.every((h) => h.v === undefined)).toBe(true);
    expect(rec.level).toBe(1);
  });

  it('„niedriger ist besser“ (Zeiten) wie bisher', () => {
    saveResult('alt-2', e(500), 'ms', 'lower');
    const r = saveResult('alt-2', e(450), 'ms', 'lower');
    expect(r.isBest).toBe(true);
    expect(getRecord('alt-2').best).toBe(450);
  });

  it('Datenstand von früher (Einträge ohne v, kein bv) bleibt gültig', () => {
    expect(entryVariant({ d: 1, p: 1, s: 1, l: 1 })).toBe('');
    expect(bestFor({ level: 1, best: 7, history: [] }, '')).toBe(7);
    expect(bestFor({ level: 1, best: 7, history: [] }, 'x=1')).toBeNull();
  });
});

describe('mit Einstellungen: nur gleiche Einstellungen werden verglichen', () => {
  const v5 = variantKey(PARAMS, { diameterCm: 5 });
  const v3 = variantKey(PARAMS, { diameterCm: 3 });

  it('Variantenschlüssel getrennt: Bestwert, Letztes Mal, Verlauf', () => {
    clearAll();
    const a1 = saveResult('lab-1', e(20), 'count', 'higher', v5);
    expect(a1.previous).toBeNull();
    expect(a1.onlyOtherVariants).toBe(false);
    // andere Einstellungen: kein Vergleich mit dem Lauf von eben, auch wenn er besser/schlechter wäre
    const b1 = saveResult('lab-1', e(5), 'count', 'higher', v3);
    expect(b1.previous).toBeNull();
    expect(b1.previousBest).toBeNull();
    expect(b1.isBest).toBe(false);
    expect(b1.onlyOtherVariants).toBe(true);
    expect(b1.history.map((h) => h.p)).toEqual([5]);
    // zurück zu den ersten Einstellungen: Vergleich mit 20, nicht mit 5
    const a2 = saveResult('lab-1', e(25), 'count', 'higher', v5);
    expect(a2.previous?.p).toBe(20);
    expect(a2.previousBest).toBe(20);
    expect(a2.isBest).toBe(true);
    expect(a2.history.map((h) => h.p)).toEqual([20, 25]);
    // und die zweite Variante behält ihren eigenen Bestwert
    const b2 = saveResult('lab-1', e(6), 'count', 'higher', v3);
    expect(b2.previous?.p).toBe(5);
    expect(b2.previousBest).toBe(5);
    expect(b2.isBest).toBe(true);
    const rec = getRecord('lab-1');
    expect(bestFor(rec, v5)).toBe(25);
    expect(bestFor(rec, v3)).toBe(6);
    expect(rec.best).toBeNull(); // der Bestwert der leeren Variante bleibt leer
    expect(rec.history.length).toBe(4);
    expect(rec.history.map(entryVariant)).toEqual([v5, v3, v5, v3]);
  });

  it('kleinere Werte sind bei „lower“ je Variante besser', () => {
    saveResult('lab-2', e(400), 'ms', 'lower', 'k=a');
    saveResult('lab-2', e(300), 'ms', 'lower', 'k=b');
    const r = saveResult('lab-2', e(380), 'ms', 'lower', 'k=a');
    expect(r.previousBest).toBe(400);
    expect(r.isBest).toBe(true);
    expect(bestFor(getRecord('lab-2'), 'k=b')).toBe(300);
  });

  it('Ton (neutral) macht keine neue Variante', () => {
    const quiet = variantKey(PARAMS, { sound: 'no' });
    const loud = variantKey(PARAMS, { sound: 'yes' });
    expect(quiet).toBe(loud);
    saveResult('lab-3', e(10), 'count', 'higher', quiet);
    const r = saveResult('lab-3', e(12), 'count', 'higher', loud);
    expect(r.previous?.p).toBe(10);
    expect(r.isBest).toBe(true);
  });

  it('Bestwerte je Variante bleiben erhalten, auch wenn der Verlauf (40 Einträge) überläuft', () => {
    saveResult('lab-4', e(99), 'count', 'higher', 'k=alt');
    for (let i = 0; i < 45; i++) saveResult('lab-4', e(i), 'count', 'higher', 'k=neu');
    const rec = getRecord('lab-4');
    expect(rec.history.length).toBe(40);
    expect(rec.history.some((h) => entryVariant(h) === 'k=alt')).toBe(false); // der alte Eintrag ist aus dem Verlauf gefallen
    expect(bestFor(rec, 'k=alt')).toBe(99); // der Bestwert nicht
    const again = saveResult('lab-4', e(50), 'count', 'higher', 'k=alt');
    expect(again.previousBest).toBe(99);
    expect(again.isBest).toBe(false);
  });

  it('die Zahl der gemerkten Varianten ist begrenzt (die ältesten fallen weg)', () => {
    for (let i = 0; i < 60; i++) saveResult('lab-5', e(1), 'count', 'higher', `k=${i}`);
    const bv = getRecord('lab-5').bv ?? {};
    expect(Object.keys(bv).length).toBe(40);
    expect(bv['k=59']).toBe(1);
    expect(bv['k=0']).toBeUndefined();
  });

  it('eine Übung, die später Einstellungen bekommt, behält ihre alten Ergebnisse als leere Variante', () => {
    saveResult('lab-6', e(10), 'count', 'higher'); // früher: ohne Einstellungen
    const r = saveResult('lab-6', e(4), 'count', 'higher', 'k=1');
    expect(r.previous).toBeNull();
    expect(r.onlyOtherVariants).toBe(true);
    expect(getRecord('lab-6').best).toBe(10);
    expect(bestFor(getRecord('lab-6'), 'k=1')).toBe(4);
  });
});
