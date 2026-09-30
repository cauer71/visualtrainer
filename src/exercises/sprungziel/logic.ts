/**
 * Sprungziel – reine Logik (Stufenfunktionen, Ein-/Ausblenden), ohne Canvas und DOM.
 *
 * Das Ziel läuft gleichmäßig; dann blendet es weich aus, taucht an einem neuen Ort weich wieder auf
 * und läuft mit gleicher Richtung und gleichem Tempo weiter. Kurz nach dem Auftauchen erscheint ein
 * Landolt-Ring – erkennbar nur, wenn der Blick das Ziel neu gefunden hat. Kein Blitzen: das Ziel
 * wird nur sinusförmig aus- und eingeblendet (je ≥ 150 ms).
 *
 * Stufen (1–20):
 * - Sprungweite: 16 → 77 u (1 u = 1 % der kürzeren Seite; Tablet ≈ 3,5 → 17° bei 40 cm)
 * - Zeit nach dem Sprung bis zum Zeichen: 700 → 280 ms
 * - Tempo: 10 → ≈ 43 u/s
 * - Zeichen: kleiner und kürzer sichtbar
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';
import { SIGN_MAX_LEVEL, SIGN_MIN_LEVEL } from '../_shared/zeichenaufgabe';

export const MIN_LEVEL = SIGN_MIN_LEVEL;
export const MAX_LEVEL = SIGN_MAX_LEVEL;

/** Dauer des Ausblendens bzw. Einblendens in ms – nie unter 150 (kein Blitzen) */
export const FADE_MS = 170;
/** Zeit im unsichtbaren Zustand zwischen Aus- und Einblenden (ms) */
export const DARK_MS = 60;

export const levelOf = (level: number): number => clamp(level, MIN_LEVEL, MAX_LEVEL);

/** Tempo in u/s */
export function speedFor(level: number): number {
  return 10 * Math.pow(1.08, levelOf(level) - 1);
}

/** Sprungweite in u */
export function jumpFor(level: number): number {
  return 16 + 3.2 * (levelOf(level) - 1);
}

/** Zeit vom Beginn des Einblendens bis zum Zeichen in ms */
export function signDelayFor(level: number): number {
  return Math.round(700 - 22 * (levelOf(level) - 1));
}

/** Anzeigedauer des Zeichens in ms */
export function exposureFor(level: number): number {
  return Math.max(340, Math.round(620 - 12 * (levelOf(level) - 1)));
}

/** Zeit gleichmäßigen Laufens vor dem nächsten Sprung in ms (unregelmäßig) */
export function drawRunMs(rng: Rng): number {
  return Math.round(rng.range(800, 1700));
}

/** Sichtbarkeit (0..1) des Ziels zu einem Zeitpunkt des Sprungs; s = ms seit Beginn des Ausblendens */
export function jumpAlpha(s: number): number {
  if (s < 0) return 1;
  if (s < FADE_MS) return 0.5 + 0.5 * Math.cos((Math.PI * s) / FADE_MS);
  if (s < FADE_MS + DARK_MS) return 0;
  const k = s - FADE_MS - DARK_MS;
  if (k < FADE_MS) return 0.5 - 0.5 * Math.cos((Math.PI * k) / FADE_MS);
  return 1;
}

/** Gesamtdauer des Sprungs (Aus- und Einblenden) in ms */
export const JUMP_TOTAL_MS = 2 * FADE_MS + DARK_MS;
/** Zeitpunkt (ms seit Beginn des Ausblendens), zu dem das Ziel den Ort wechselt (mitten im Dunkel) */
export const JUMP_AT_MS = FADE_MS + DARK_MS / 2;
/** Zeitpunkt (ms seit Beginn des Ausblendens), ab dem das Einblenden läuft */
export const FADE_IN_AT_MS = FADE_MS + DARK_MS;
