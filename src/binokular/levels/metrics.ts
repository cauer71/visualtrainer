/**
 * Nachrechenbare Schwierigkeitswerte eines Levels (Tests prüfen, dass die Angaben in `difficulty` stimmen):
 *  - Objektanzahl: Roboter, Kristalle, Schlüssel, Türen, Schalter, Druckplatten, Plattformen, Gefahren
 *    (ohne Basis, Lampen, Leitern und Deko).
 *  - Paarabstand: Mittelwert der Manhattan-Abstände (Felder) von Schlüssel ↔ zugehöriger Tür und
 *    Schalter/Druckplatte ↔ nächstem Feld der zugehörigen Plattform (ausgefahrene Lage), gerundet.
 */
import type { LevelDef, LevelObjectDef } from './types';

const COUNTED = new Set(['robot', 'crystal', 'key', 'door', 'switch', 'plate', 'platform', 'hazard']);

export function objectCountOf(level: LevelDef): number {
  return level.objects.filter((o) => COUNTED.has(o.kind)).length;
}

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

function platformCells(p: LevelObjectDef): { x: number; y: number }[] {
  const x0 = p.toX ?? p.x;
  const y0 = p.toY ?? p.y;
  return Array.from({ length: p.w ?? 1 }, (_, i) => ({ x: x0 + i, y: y0 }));
}

/** einzelne Paarabstände (für Doku und Tests) */
export function pairDistances(level: LevelDef): number[] {
  const out: number[] = [];
  const objs = level.objects;
  for (const k of objs.filter((o) => o.kind === 'key')) {
    for (const d of objs.filter((o) => o.kind === 'door' && (!o.group || !k.group || o.group === k.group))) out.push(dist(k, d));
  }
  for (const s of objs.filter((o) => o.kind === 'switch' || o.kind === 'plate')) {
    for (const p of objs.filter((o) => o.kind === 'platform' && (!s.group || o.group === s.group))) {
      out.push(Math.min(...platformCells(p).map((c) => dist(s, c))));
    }
  }
  return out;
}

export function pairDistanceOf(level: LevelDef): number {
  const d = pairDistances(level);
  return d.length ? Math.round(d.reduce((a, b) => a + b, 0) / d.length) : 0;
}
