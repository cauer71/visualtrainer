/**
 * Ziele erwischen – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * 2–5 Kreise wandern gleichzeitig auf geraden Bahnen über die Bühne, prallen am Rand weich ab
 * (die Richtung dreht sich in einem Bogen auf die gespiegelte Richtung, kein Knick) und werden dabei
 * rhythmisch größer und kleiner. Man tippt sie an; ein getroffener Kreis wird nach kurzer Pause
 * durch einen neuen ersetzt. Die Stufe regelt Tempo, Größe und Anzahl.
 */
import type { Rng } from '../../core/rng';
import { clamp, median } from '../../core/stats';

/** Erlaubter Bereich für den Mittelpunkt eines Kreises */
export interface Field {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/** Feld mit mindestens einem Punkt Ausdehnung (kleine Bühnen) */
export function makeField(minX: number, maxX: number, minY: number, maxY: number): Field {
  if (maxX < minX) minX = maxX = (minX + maxX) / 2;
  if (maxY < minY) minY = maxY = (minY + maxY) / 2;
  return { minX, maxX, minY, maxY };
}

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 16;
/** Dauer der Sitzung in ms (fest, keine Zeitgutschrift) */
export const SESSION_MS = 45_000;
export const QUICK_SESSION_MS = 8_000;
/** Schwankung der Größe: Radius = Basis × (1 ± SIZE_AMP), langsam (0,3–0,55 Hz, also weit unter 3 Hz) */
export const SIZE_AMP = 0.25;
export const SIZE_FREQ_MIN = 0.3;
export const SIZE_FREQ_MAX = 0.55;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Gleichzeitige Kreise: Stufe 1–4 → 2, 5–8 → 3, 9–12 → 4, ab 13 → 5 */
export function countFor(level: number): number {
  return clamp(2 + Math.floor((levelOf(level) - 1) / 4), 2, 5);
}

/** Tempo in u/s (1 u = 1 % der kürzeren Bühnenseite): 5 → ≈ 17 */
export function speedU(level: number): number {
  return 5 * Math.pow(1.085, levelOf(level) - 1);
}

/** Mittlerer Radius in u: 6,4 → 3,6 */
export function baseRadiusU(level: number): number {
  return clamp(6.4 - 0.19 * (levelOf(level) - 1), 3.6, 6.4);
}

/** Mittlerer Radius in px; nie unter 24 px, damit auch der kleinste Kreis (−25 %) noch ≥ 18 px hat */
export const baseRadiusPx = (level: number, u: number): number => Math.max(24, baseRadiusU(level) * u);

/** Radius zum Zeitpunkt t (ms) für einen Kreis mit Basisradius rb, Phase (rad) und Frequenz (Hz) */
export function radiusAt(rb: number, phase: number, freq: number, tMs: number): number {
  return rb * (1 + SIZE_AMP * Math.sin(2 * Math.PI * freq * (tMs / 1000) + phase));
}

/** Trefferfläche: größer als der sichtbare Kreis (Fingerbreite), nie unter 28 px */
export const hitRadiusPx = (r: number): number => Math.max(r + 10, 28);

/** Pause bis zum Ersatz-Kreis (ms) */
export function respawnGapMs(rng: Pick<Rng, 'range'>): number {
  return rng.range(350, 650);
}

export interface Pt {
  x: number;
  y: number;
}

/**
 * Startort eines neuen Kreises im Feld: weit von den anderen Kreisen und vom zuletzt getippten
 * Punkt (dort liegt noch der Finger). Nimmt den ersten passenden Kandidaten, sonst den besten.
 */
export function pickSpawn(
  rng: Pick<Rng, 'range'>,
  f: Field,
  others: readonly Pt[],
  avoid: Pt | null,
  minDist: number,
  avoidDist: number,
  tries = 40,
): Pt {
  let best: Pt = { x: (f.minX + f.maxX) / 2, y: (f.minY + f.maxY) / 2 };
  let bestScore = -Infinity;
  for (let i = 0; i < tries; i++) {
    const c = { x: rng.range(f.minX, f.maxX), y: rng.range(f.minY, f.maxY) };
    let dOthers = Infinity;
    for (const o of others) dOthers = Math.min(dOthers, Math.hypot(c.x - o.x, c.y - o.y));
    const dAvoid = avoid ? Math.hypot(c.x - avoid.x, c.y - avoid.y) : Infinity;
    if (dOthers >= minDist && dAvoid >= avoidDist) return c;
    const score = Math.min(dOthers / Math.max(1, minDist), dAvoid / Math.max(1, avoidDist));
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }
  return best;
}

// ---------------------------------------------------------------------------
// Bewegung

/** Drehrate beim Abprallen in rad/s: eine Kehrtwende (180°) dauert ≈ 0,45 s */
export const BOUNCE_RATE = Math.PI / 0.45;
const TWO_PI = Math.PI * 2;

function wrap(a: number): number {
  let r = (a + Math.PI) % TWO_PI;
  if (r < 0) r += TWO_PI;
  return r - Math.PI;
}

/**
 * Kreis auf gerader Bahn mit weichem Abprallen. Läuft er in die Randzone, dreht sich seine Richtung
 * mit konstanter Drehrate auf die gespiegelte Richtung (Bogen mit Radius Tempo ÷ Drehrate); die
 * Randzone ist so tief, dass die Kehrtwende vor dem Rand fertig ist. Mit dt gerechnet, in kleinen
 * Teilschritten, also unabhängig von der Bildrate. Ein Sicherheitsnetz spiegelt hart, falls das Feld
 * für Tempo und Bogen zu klein ist.
 */
export class Mover {
  x = 0;
  y = 0;
  /** Richtung in Radiant (0 = rechts, π/2 = unten) */
  theta = 0;
  /** Laufende Kehrtwende: Zielrichtung und Drehsinn (+1/−1), sonst null */
  private goal: number | null = null;
  private dir: 1 | -1 = 1;

  place(x: number, y: number, theta: number): void {
    this.x = x;
    this.y = y;
    this.theta = wrap(theta);
    this.goal = null;
  }

  /** dt Sekunden mit Tempo speed (px/s) weiterlaufen */
  step(dt: number, speed: number, f: Field): void {
    if (dt <= 0) return;
    const n = Math.max(1, Math.ceil(dt / 0.01));
    const h = dt / n;
    for (let i = 0; i < n; i++) this.sub(h, speed, f);
  }

  private sub(h: number, speed: number, f: Field): void {
    const rho = speed / BOUNCE_RATE;
    const zone = rho * 1.3 + speed * h * 2 + 1;
    if (this.goal === null) {
      const vx = Math.cos(this.theta);
      const vy = Math.sin(this.theta);
      const nearX = (this.x < f.minX + zone && vx < 0) || (this.x > f.maxX - zone && vx > 0);
      const nearY = (this.y < f.minY + zone && vy < 0) || (this.y > f.maxY - zone && vy > 0);
      if (nearX || nearY) {
        // bei Ecken: beide Wände spiegeln (Richtung um 180° drehen)
        const goal = nearX && nearY ? this.theta + Math.PI : nearX ? Math.PI - this.theta : -this.theta;
        const err = wrap(goal - this.theta);
        if (Math.abs(err) > Math.PI - 0.25) {
          // fast frontal: zur Seite drehen, auf der mehr Platz zur Feldmitte liegt
          const along = nearX && !nearY ? 'y' : 'x';
          const toward = along === 'y' ? (f.minY + f.maxY) / 2 - this.y : (f.minX + f.maxX) / 2 - this.x;
          const side = (s: number): number => (along === 'y' ? Math.sin(this.theta + s * 0.5) : Math.cos(this.theta + s * 0.5));
          this.dir = Math.sign(toward) * (side(1) - side(-1)) >= 0 ? 1 : -1;
        } else this.dir = err >= 0 ? 1 : -1;
        this.goal = goal;
      }
    }
    if (this.goal !== null) {
      const remain = this.dir * wrap(this.goal - this.theta);
      // Restwinkel in Drehrichtung (0..2π); fast fertig oder knapp überdreht → einrasten
      const left = remain < -0.05 ? remain + TWO_PI : remain;
      const stepA = BOUNCE_RATE * h;
      if (left <= stepA) {
        this.theta = wrap(this.goal);
        this.goal = null;
      } else this.theta = wrap(this.theta + this.dir * stepA);
    }
    this.x += Math.cos(this.theta) * speed * h;
    this.y += Math.sin(this.theta) * speed * h;
    // Sicherheitsnetz: nie aus dem Feld (nur bei zu kleinem Feld für Tempo und Bogen)
    if (this.x < f.minX || this.x > f.maxX) {
      this.x = clamp(this.x, f.minX, f.maxX);
      this.theta = wrap(Math.PI - this.theta);
      this.goal = null;
    }
    if (this.y < f.minY || this.y > f.maxY) {
      this.y = clamp(this.y, f.minY, f.maxY);
      this.theta = wrap(-this.theta);
      this.goal = null;
    }
  }
}

/** Ort eines Kreises nach `secs` Sekunden (für die Geister-Hand und Tests); verändert den Kreis nicht */
export function predictPos(f: Field, from: Pt, theta: number, speedPx: number, secs: number): Pt {
  const m = new Mover();
  m.place(from.x, from.y, theta);
  m.step(secs, speedPx, f);
  return { x: m.x, y: m.y };
}

export interface Stats {
  hits: number;
  misses: number;
  /** Treffer in % aller Tipps (Treffer + Fehltipps); 0 ohne Tipps */
  hitRate: number;
  /** Median der Zeit zwischen zwei Treffern in ms (NaN bei weniger als 2 Werten) */
  medianMs: number;
}

/** Abstände zwischen zwei Treffern über dieser Grenze (Pause, Suchen) zählen nicht */
export const MAX_GAP_MS = 4000;

export function computeStats(hits: number, misses: number, gaps: readonly number[]): Stats {
  const tips = hits + misses;
  return {
    hits,
    misses,
    hitRate: tips ? (100 * hits) / tips : 0,
    medianMs: gaps.length >= 2 ? median(gaps) : NaN,
  };
}

/** Punkte je Treffer: Grundwert steigt mit der Stufe */
export const pointsFor = (level: number): number => 10 + 2 * (levelOf(level) - 1);

/** Schlüssel in texts.tips: miss | slow | great */
export function tipFor(s: Stats): string {
  if (s.misses >= 4 && s.hitRate < 70) return 'miss';
  if (Number.isFinite(s.medianMs) && s.medianMs > 2200) return 'slow';
  return 'great';
}
