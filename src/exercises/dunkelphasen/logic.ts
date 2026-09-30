/**
 * Dunkelphasen – reine Logik (Stufenfunktionen, sichere Ein-/Ausblendung, Dunkel-Takt), ohne Canvas und DOM.
 *
 * SICHERE Fassung des Stroboskop-Originals (Katalog 409). Das Original lässt das Ziel im festen Takt
 * hart blinken (je nach Gerät bis zu ≈ 7 Blitze/s, mit „Random Speed“ bis ≈ 12) – das ist hier
 * ausdrücklich NICHT der Fall:
 *
 * - Das Ziel blendet SINUSFÖRMIG aus und wieder ein: Die Deckkraft folgt einer halben Kosinuswelle
 *   (`0,5 + 0,5·cos`). Jede Halbwelle dauert mindestens `MIN_FADE_MS` = 200 ms (Halbwertszeit ≥ 200 ms,
 *   gleichwertig einer Sinusschwingung von höchstens 2,5 Hz).
 * - Eine Dunkelphase beginnt höchstens alle `MIN_PERIOD_MS` = 2000 ms, also mit höchstens
 *   `MAX_DARK_RATE_HZ` = 0,5 Hz – niemals schneller. `DarkCycle` setzt das hart durch: Eine zu frühe
 *   Anforderung wird schlicht abgelehnt, egal was die Übung plant.
 * - Die Bewegung läuft im Dunkeln unsichtbar weiter; danach erscheint ein Zeichen (Vorhersage!).
 *
 * Stufen (1–20), höher = schwerer:
 * - Dunkel: Ein-/Ausblenden 330 → 200 ms je Richtung, volle Dunkelheit 200 → 730 ms dazwischen
 * - Zeit vom Wiederauftauchen bis zum Zeichen: 700 → 280 ms
 * - Tempo 12 → ≈ 33 u/s (1 u = 1 % der kürzeren Seite; Tablet ≈ 3 → 8°/s bei 40 cm)
 * - Einstiegshilfe: schwacher Umriss im Dunkeln auf den Stufen 1–3, danach bis Stufe 8 ausgeblendet
 * - Zeichen: kleiner und kürzer sichtbar
 */
import { clamp } from '../../core/stats';
import { SIGN_MAX_LEVEL, SIGN_MIN_LEVEL } from '../_shared/zeichenaufgabe';

export const MIN_LEVEL = SIGN_MIN_LEVEL;
export const MAX_LEVEL = SIGN_MAX_LEVEL;

export const levelOf = (level: number): number => clamp(level, MIN_LEVEL, MAX_LEVEL);

/** Kürzeste Dauer der Aus- bzw. Einblendung in ms (Halbwertszeit der Sinuskurve ≥ 200 ms) – hart */
export const MIN_FADE_MS = 200;
/** Kürzester Abstand zwischen den Anfängen zweier Dunkelphasen in ms – hart (≤ 1 pro 2 s) */
export const MIN_PERIOD_MS = 2000;
/** Höchste Häufigkeit von Dunkelphasen in Hz – ergibt sich aus `MIN_PERIOD_MS` */
export const MAX_DARK_RATE_HZ = 1000 / MIN_PERIOD_MS;

/** Dauer des Ausblendens bzw. Einblendens in ms (nie unter `MIN_FADE_MS`) */
export function fadeMsFor(level: number): number {
  return Math.max(MIN_FADE_MS, Math.round(330 - 7 * (levelOf(level) - 1)));
}

/** Zeit völliger Dunkelheit zwischen Aus- und Einblenden in ms */
export function holdMsFor(level: number): number {
  return Math.round(200 + 28 * (levelOf(level) - 1));
}

/** Gesamtdauer einer Dunkelphase (Ausblenden + Dunkel + Einblenden) in ms */
export function darkTotalMs(fadeMs: number, holdMs: number): number {
  return 2 * Math.max(MIN_FADE_MS, fadeMs) + Math.max(0, holdMs);
}

/** Zeit vom Ende des Einblendens bis zum Zeichen in ms */
export function signDelayFor(level: number): number {
  return Math.round(700 - 22 * (levelOf(level) - 1));
}

/** Anzeigedauer des Zeichens in ms */
export function exposureFor(level: number): number {
  return Math.max(340, Math.round(620 - 12 * (levelOf(level) - 1)));
}

/** Tempo in u/s */
export function speedFor(level: number): number {
  return 12 * Math.pow(1.055, levelOf(level) - 1);
}

/** Deckkraft des schwachen Umrisses im Dunkeln (Einstiegshilfe): Stufen 1–3 sichtbar, bis Stufe 8 ausgeblendet */
export function ringHelpFor(level: number): number {
  return 0.22 * clamp((8 - levelOf(level)) / 5, 0, 1);
}

/** Zeit bis zur nächsten Dunkelphase nach einem Durchgang in ms (Wunsch; `DarkCycle` hält die 2 s ein) */
export function drawWaitMs(u01: number): number {
  return Math.round(300 + 600 * clamp(u01, 0, 1));
}

/**
 * Sichtbarkeit (0..1) des Ziels; s = ms seit Beginn des Ausblendens.
 * 1 → (halbe Kosinuswelle) → 0 → Dunkel → (halbe Kosinuswelle) → 1; überall stetig, am Anfang und Ende
 * jeder Blende mit Steigung 0.
 */
export function darkAlpha(s: number, fadeMs: number, holdMs: number): number {
  const fade = Math.max(MIN_FADE_MS, fadeMs);
  const hold = Math.max(0, holdMs);
  if (s < 0) return 1;
  if (s < fade) return 0.5 + 0.5 * Math.cos((Math.PI * s) / fade);
  if (s < fade + hold) return 0;
  const k = s - fade - hold;
  if (k < fade) return 0.5 - 0.5 * Math.cos((Math.PI * k) / fade);
  return 1;
}

/**
 * Takt der Dunkelphasen mit hartem Limit: `start` lehnt ab, wenn noch eine Dunkelphase läuft oder der
 * letzte Beginn weniger als `MIN_PERIOD_MS` zurückliegt; Ein-/Ausblenden werden auf mindestens
 * `MIN_FADE_MS` gesetzt. So kann keine Stufe und kein Fehler in der Planung schneller blenden.
 */
export class DarkCycle {
  private startT = -Infinity;
  private fade = MIN_FADE_MS;
  private hold = 0;
  /** Zahl der bisher begonnenen Dunkelphasen */
  count = 0;

  get fadeMs(): number {
    return this.fade;
  }

  get holdMs(): number {
    return this.hold;
  }

  get totalMs(): number {
    return darkTotalMs(this.fade, this.hold);
  }

  /** Beginn der letzten Dunkelphase (−∞ vor der ersten) */
  get lastStart(): number {
    return this.startT;
  }

  isActive(t: number): boolean {
    return Number.isFinite(this.startT) && t - this.startT < this.totalMs;
  }

  canStart(t: number): boolean {
    return !this.isActive(t) && t - this.startT >= MIN_PERIOD_MS;
  }

  /** Dunkelphase beginnen, falls erlaubt; liefert, ob sie begonnen hat */
  start(t: number, fadeMs: number, holdMs: number): boolean {
    if (!this.canStart(t)) return false;
    this.fade = Math.max(MIN_FADE_MS, fadeMs);
    this.hold = Math.max(0, holdMs);
    this.startT = t;
    this.count++;
    return true;
  }

  /** Sichtbarkeit zum Zeitpunkt t (vor der ersten Dunkelphase 1) */
  alpha(t: number): number {
    if (!Number.isFinite(this.startT)) return 1;
    return darkAlpha(t - this.startT, this.fade, this.hold);
  }
}
