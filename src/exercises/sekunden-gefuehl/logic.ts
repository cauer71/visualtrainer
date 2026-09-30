/**
 * Sekunden-Gefühl – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Aufgabe: Eine Zielzeit wird genannt; nach „Los“ tippt man, wenn man glaubt, dass sie um ist.
 * Die Zielzeiten laufen in einer festen, aufsteigenden Folge von 1 bis 8 s – so bleibt der
 * Hauptwert (mittlere Abweichung in ms) von Sitzung zu Sitzung vergleichbar. Die Stufe steuert
 * nur die Hilfe (Hilfsring auf Stufe 1) und wie eng das Toleranzfenster ist.
 */
import { clamp, mean } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 6;

/** Zielzeiten einer Sitzung (ms), aufsteigend */
export const LADDER_MS = [1000, 2000, 3000, 4000, 5000, 6000, 8000] as const;

/** Toleranz relativ zur Zielzeit je Stufe 1…6 (Weber-artig: längere Zeiten streuen mehr) */
const REL_TOL = [0.22, 0.17, 0.13, 0.1, 0.075, 0.055];
/** Untergrenze der Toleranz in ms (Geräteverzögerung, Tippstreuung) */
const MIN_TOL_MS = 100;
/** Tipps in den ersten 200 ms nach „Los“ sind meist ein Doppeltipp und zählen nicht */
const ACCIDENTAL_MS = 200;

/** Zielzeiten für `count` Durchgänge: die ganze Leiter, bei weniger Durchgängen gleichmäßig ausgewählt */
export function targetSeries(count: number): number[] {
  const n = Math.max(1, Math.floor(count));
  if (n >= LADDER_MS.length) return [...LADDER_MS];
  if (n === 1) return [LADDER_MS[0]];
  const out: number[] = [];
  for (let i = 0; i < n; i++) out.push(LADDER_MS[Math.round((i * (LADDER_MS.length - 1)) / (n - 1))]);
  return out;
}

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Toleranzfenster (±ms) für eine Zielzeit auf einer Stufe */
export function toleranceMs(level: number, targetMs: number): number {
  return Math.max(MIN_TOL_MS, REL_TOL[levelOf(level) - 1] * targetMs);
}

/** Hilfsring nur auf Stufe 1 */
export function showHelpRing(level: number): boolean {
  return levelOf(level) <= 1;
}

/** Füllstand des Hilfsrings 0..1 */
export function ringFraction(elapsedMs: number, targetMs: number): number {
  return targetMs > 0 ? clamp(elapsedMs / targetMs, 0, 1) : 0;
}

/** Abweichung in ms: negativ = zu früh, positiv = zu spät */
export function deviationMs(tapT: number, startT: number, targetMs: number): number {
  return tapT - startT - targetMs;
}

/** Spätester Zeitpunkt (ms nach „Los“), bis zu dem noch auf einen Tipp gewartet wird */
export function timeoutMs(targetMs: number): number {
  return targetMs + Math.max(2500, targetMs * 0.75);
}

export function isAccidentalTap(elapsedMs: number): boolean {
  return elapsedMs < ACCIDENTAL_MS;
}

export type Rating = 'exact' | 'good' | 'near' | 'early' | 'late';

/** exact ≤ ¼ Toleranz, good ≤ ½, near ≤ Toleranz, darüber früh/spät nach Vorzeichen */
export function rate(dev: number, tol: number): Rating {
  const a = Math.abs(dev);
  if (a <= tol * 0.25) return 'exact';
  if (a <= tol * 0.5) return 'good';
  if (a <= tol) return 'near';
  return dev < 0 ? 'early' : 'late';
}

/** Zählt als Erfolg für die Treppe: Abweichung innerhalb des Toleranzfensters */
export function isSuccess(dev: number, tol: number): boolean {
  return Math.abs(dev) <= tol;
}

/** Punkte: 100 / 70 / 40 / 10 (bis 2 × Toleranz), mit 10 % Zuschlag je Stufe */
export function trialPoints(dev: number, tol: number, level: number): number {
  const a = Math.abs(dev);
  let base = 0;
  if (a <= tol * 0.25) base = 100;
  else if (a <= tol * 0.5) base = 70;
  else if (a <= tol) base = 40;
  else if (a <= tol * 2) base = 10;
  return Math.round(base * (1 + 0.1 * (levelOf(level) - 1)));
}

export interface Summary {
  /** mittlere Abweichung (Betrag) in ms */
  meanAbs: number;
  /** mittlere Abweichung mit Vorzeichen in ms (− zu früh, + zu spät) */
  bias: number;
  /** mittlere relative Abweichung mit Vorzeichen (Anteil der Zielzeit) */
  relBias: number;
  /** Durchgänge innerhalb der Toleranz */
  hits: number;
  count: number;
}

/** Kennzahlen aus Abweichungen, Toleranzen und Zielzeiten (Zielzeiten nur für die relative Tendenz) */
export function summarize(devs: readonly number[], tols: readonly number[], targets: readonly number[]): Summary {
  const n = devs.length;
  if (!n) return { meanAbs: NaN, bias: NaN, relBias: NaN, hits: 0, count: 0 };
  const hits = devs.filter((d, i) => isSuccess(d, tols[i] ?? MIN_TOL_MS)).length;
  const rel = targets.length === n ? devs.map((d, i) => d / targets[i]) : devs.map(() => 0);
  return {
    meanAbs: mean(devs.map((d) => Math.abs(d))),
    bias: mean(devs),
    relBias: mean(rel),
    hits,
    count: n,
  };
}

/** Schlüssel in texts.tips: early | late | long | great */
export function tipFor(devs: readonly number[], targets: readonly number[]): string {
  if (devs.length < 2 || devs.length !== targets.length) return 'great';
  const rel = devs.map((d, i) => d / targets[i]);
  const relBias = mean(rel);
  if (relBias < -0.05) return 'early';
  if (relBias > 0.05) return 'late';
  const short = rel.filter((_, i) => targets[i] < 4000).map(Math.abs);
  const long = rel.filter((_, i) => targets[i] >= 4000).map(Math.abs);
  if (short.length && long.length && mean(long) > 1.5 * mean(short) && mean(long) > 0.06) return 'long';
  return 'great';
}
