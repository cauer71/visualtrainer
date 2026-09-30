/**
 * Präzisions-Flick – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Ein ruhendes Ziel erscheint und schrumpft gleichmäßig (Radius linear in der Zeit) bis zu einem
 * Mindestradius, dann ist es weg. Man tippt es an: möglichst schnell (solange es noch groß ist)
 * und möglichst mittig. Gewertet werden der Abstand des Tipps von der Mitte in % des gerade
 * sichtbaren Radius und die Zeit vom Erscheinen bis zum Tipp. Die Stufe regelt Startgröße und
 * Schrumpftempo.
 */
import type { Rng } from '../../core/rng';
import { clamp, median } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 14;
/** Durchgänge je Sitzung (feste Anzahl, keine Zeitgutschrift) */
export const TRIALS = 20;
export const QUICK_TRIALS = 4;
/** Das Ziel ist weg, sobald sein Radius diesen Anteil des Startradius erreicht */
export const VANISH_FRAC = 0.25;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Startradius in u (1 % der kürzeren Bühnenseite): 8,6 → 4,7 */
export function startRadiusU(level: number): number {
  return clamp(8.6 - 0.3 * (levelOf(level) - 1), 4.6, 8.6);
}

/** Startradius in px; nie unter 20 px */
export const startRadiusPx = (level: number, u: number): number => Math.max(20, startRadiusU(level) * u);

/** Dauer in ms vom Erscheinen bis zum Verschwinden: 3,4 s auf Stufe 1, 1,1 s auf Stufe 14 */
export function lifeMs(level: number): number {
  const l = levelOf(level);
  return clamp(Math.round(3400 * Math.pow(1100 / 3400, (l - 1) / (MAX_LEVEL - 1))), 1100, 3400);
}

/** Schrumpftempo in % des Startradius je Sekunde (nur zur Anzeige in Tests/Beschreibung) */
export const shrinkPerSecond = (level: number): number => ((1 - VANISH_FRAC) * 100) / (lifeMs(level) / 1000);

/** Sichtbarer Radius nach `ageMs` (linear, nie unter dem Mindestradius) */
export function radiusAt(r0: number, ageMs: number, life: number): number {
  const k = life > 0 ? clamp(ageMs / life, 0, 1) : 1;
  return r0 * (1 - (1 - VANISH_FRAC) * k);
}

/** Anteil der Zeit, der noch übrig ist (1 = gerade erschienen, 0 = weg) */
export const timeLeftFrac = (ageMs: number, life: number): number => clamp(1 - ageMs / life, 0, 1);

/** Trefferfläche: etwas größer als das sichtbare Ziel, nie unter 24 px Radius */
export const hitRadiusPx = (r: number): number => Math.max(r * 1.3, 24);

/** Mittigkeit in %: 100 = genau in der Mitte, 0 = am Rand der sichtbaren Scheibe oder außerhalb */
export function centering(distPx: number, r: number): number {
  if (r <= 0) return 0;
  return clamp(Math.round(100 * (1 - distPx / r)), 0, 100);
}

export type TapKind = 'hit' | 'near' | 'far';

/** hit = in der sichtbaren Scheibe, near = knapp daneben (noch in der Trefferfläche), far = Fehltipp */
export function classifyTap(distPx: number, r: number): TapKind {
  if (distPx <= r) return 'hit';
  return distPx <= hitRadiusPx(r) ? 'near' : 'far';
}

export interface Norm {
  nx: number;
  ny: number;
}

/**
 * Neuer Ort in normierten Feldkoordinaten (0..1) mit Abstand zum Rand und – falls angegeben –
 * mit Mindestabstand zum zuletzt getippten Punkt (dort liegt noch der Finger). Findet sich nach
 * `tries` Versuchen nichts Passendes, gewinnt der Kandidat mit dem größten Abstand.
 */
export function pickSpot(
  rng: Pick<Rng, 'range'>,
  fw: number,
  fh: number,
  r: number,
  avoid: { x: number; y: number } | null,
  avoidDist: number,
  tries = 40,
): Norm {
  const m = r * 1.4;
  const x0 = Math.min(m, fw / 2);
  const x1 = Math.max(fw - m, fw / 2);
  const y0 = Math.min(m, fh / 2);
  const y1 = Math.max(fh - m, fh / 2);
  let best: Norm = { nx: 0.5, ny: 0.5 };
  let bestD = -1;
  for (let i = 0; i < tries; i++) {
    const px = rng.range(x0, x1);
    const py = rng.range(y0, y1);
    const d = avoid ? Math.hypot(px - avoid.x, py - avoid.y) : Infinity;
    if (d > bestD) {
      bestD = d;
      best = { nx: fw > 0 ? px / fw : 0.5, ny: fh > 0 ? py / fh : 0.5 };
    }
    if (d >= avoidDist) break;
  }
  return best;
}

/** Pause bis zum nächsten Ziel in ms: 450–800, damit der Zeitpunkt nicht vorhersagbar ist */
export function gapMs(rng: Pick<Rng, 'range'>): number {
  return rng.range(450, 800);
}

/** Punkte je Durchgang: Grundwert steigt mit der Stufe; Mittigkeit und übrige Zeit bringen mehr */
export function pointsFor(level: number, centeringPct: number, leftFrac: number): number {
  return 10 + 2 * (levelOf(level) - 1) + Math.round(clamp(centeringPct, 0, 100) / 10) + Math.round(clamp(leftFrac, 0, 1) * 5);
}

export interface Stats {
  /** Durchgänge mit Tipp in der sichtbaren Scheibe */
  hits: number;
  /** Durchgänge, in denen das Ziel verschwand */
  gone: number;
  /** Fehltipps (weit neben dem Ziel) */
  wrong: number;
  /** Mittlere Mittigkeit über alle getippten Ziele in % (NaN ohne Tipp) */
  centering: number;
  /** Median der Zeit bis zum Tipp in ms (NaN ohne Tipp) */
  medianMs: number;
}

export function computeStats(hits: number, gone: number, wrong: number, centerings: readonly number[], times: readonly number[]): Stats {
  return {
    hits,
    gone,
    wrong,
    centering: centerings.length ? centerings.reduce((a, b) => a + b, 0) / centerings.length : NaN,
    medianMs: times.length ? median(times) : NaN,
  };
}

/** Schlüssel in texts.tips: gone | wrong | center | great */
export function tipFor(s: Stats): string {
  if (s.gone >= 3 && s.gone >= s.wrong) return 'gone';
  if (s.wrong >= 3) return 'wrong';
  if (Number.isFinite(s.centering) && s.centering < 50) return 'center';
  return 'great';
}
