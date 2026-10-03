/**
 * Pendelball – reine Logik (ohne Canvas und DOM, damit per Unit-Test prüfbar).
 *
 * Eine Kugel pendelt in festen Bahnformen, man folgt ihr nur mit den Augen und erkennt einen Buchstaben auf ihr.
 * Neu gegenüber den Einzelbahn-Übungen ist die Bahnfolge in einer Sitzung: waagrecht → senkrecht → schräg
 * (links unten ↔ rechts oben) → schräg (links oben ↔ rechts unten) → Kreis im Uhrzeigersinn → Kreis gegen den
 * Uhrzeigersinn. Jede Bahn ist ein Block von etwa 12–15 s, dazwischen eine ruhige Pause.
 *
 * Bewegung: gleichmäßige Sinusbewegung (bei den Kreisen gleichmäßige Winkelgeschwindigkeit), als geschlossene
 * Formel der Zeit – keine Bildzahl, keine Sprünge. Zu Beginn eines Blocks wächst die Auslenkung in `RAMP_S`
 * Sekunden weich von 0 (Kugel in der Mitte) auf die volle Weite und am Ende wieder auf 0 (glatte Hüllkurve).
 *
 * ---------------------------------------------------------------------------------------------------------
 * STUFENTABELLE (25 Stufen; jeder Schritt ändert genau EINEN Parameter, in `STEPS` in dieser Reihenfolge)
 *
 *   Parameter          Start → Ende              Schritte  Einheit
 *   period             4,0 → 2,2                 6         s je Pendelschlag hin und zurück bzw. je Kreisumlauf
 *   ampFrac            0,20 → 0,30               3         halbe Bahnweite als Anteil der Bühnenbreite (≤ 0,30 = 60 %)
 *   letterU            7,0 → 2,8                 5         Buchstabenhöhe in u (1 u = 1 % der kürzeren Seite)
 *   exposureMs         1100 → 600                5         Anzeigedauer des Buchstabens inkl. beider Blenden
 *   letterSet          0 → 2                     2         0 sehr verschieden · 1 teils ähnlich · 2 ähnlich
 *   mixed              fest → gemischt           1         Reihenfolge der Bahnen (ab Stufe 12)
 *   ballK              0,95 → 0,80               2         Kugelradius = ballK × Buchstabenhöhe
 *
 *   Stufe  Änderung                    Stufe  Änderung
 *    2     period 3,7                   14     exposureMs 800
 *    3     letterU 6,0                  15     period 2,8
 *    4     ampFrac 0,24                 16     ballK 0,88
 *    5     exposureMs 1000              17     letterSet 2
 *    6     period 3,4                   18     exposureMs 700
 *    7     letterU 5,0                  19     period 2,5
 *    8     letterSet 1                  20     letterU 3,2
 *    9     exposureMs 900               21     ampFrac 0,30
 *   10     period 3,1                   22     exposureMs 600
 *   11     ampFrac 0,27                 23     period 2,2
 *   12     mixed (Bahnfolge gemischt)   24     ballK 0,80
 *   13     letterU 4,0                  25     letterU 2,8
 *
 * Randbedingungen (per Test geprüft):
 *  - Der Buchstabe erscheint nur im geraden, gleichmäßigen Teil eines Schlags (Tempo ≥ 50 % des Höchsttempos,
 *    also ± 60° um den Mitteldurchgang): dazu muss auf jeder Stufe `exposureMs ≤ period/3 − 120 ms` gelten.
 *  - Spitzengeschwindigkeit der Kugel höchstens 24°/s (Obergrenze 25°/s) bei 40 cm Abstand und 0,23° je u.
 *  - Bahnweite höchstens 60 % der Bühnenbreite; Buchstabe nie kleiner als ≈ 0,35° (18 px bei ≤ 51 px/°).
 *
 * Anpassung nach jedem Block: ≥ 85 % richtig → eine Stufe schwerer (zu Beginn bis zur ersten Umkehr zwei Stufen,
 * wie `Staircase`), < 65 % → eine Stufe leichter, dazwischen gleich. Hauptwert = höchste Stufe, auf der ein Block
 * zu mindestens 65 % richtig war.
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';
import { MAX_TRACK_WIDTH } from '../_shared/pursuit-logic';

// ---------------------------------------------------------------------------
// Bahnformen

export type Shape = 'horizontal' | 'vertical' | 'diagUp' | 'diagDown' | 'circleCw' | 'circleCcw';

/** Feste Reihenfolge einer Sitzung (auf niedrigen Stufen); ab Stufe `MIXED_FROM_LEVEL` gemischt */
export const SHAPES: readonly Shape[] = ['horizontal', 'vertical', 'diagUp', 'diagDown', 'circleCw', 'circleCcw'];

export interface Vec {
  x: number;
  y: number;
}

export function isCircle(shape: Shape): boolean {
  return shape === 'circleCw' || shape === 'circleCcw';
}

/** Richtung der Pendelgeraden als Einheitsvektor (y wächst nach unten); Kreise: null */
export function lineDir(shape: Shape): Vec | null {
  const r = Math.SQRT1_2;
  switch (shape) {
    case 'horizontal':
      return { x: 1, y: 0 };
    case 'vertical':
      return { x: 0, y: 1 };
    case 'diagUp': // links unten ↔ rechts oben
      return { x: r, y: -r };
    case 'diagDown': // links oben ↔ rechts unten
      return { x: r, y: r };
    default:
      return null;
  }
}

/** +1 = im Uhrzeigersinn (auf dem Bildschirm, y nach unten), −1 = dagegen, 0 = Gerade */
export function circleSign(shape: Shape): 1 | -1 | 0 {
  return shape === 'circleCw' ? 1 : shape === 'circleCcw' ? -1 : 0;
}

// ---------------------------------------------------------------------------
// Stufen

export interface LevelParams {
  /** Periode in s (ein Hin-und-zurück bzw. ein Kreisumlauf) */
  period: number;
  /** halbe Bahnweite (Pendelweite von der Mitte) als Anteil der Bühnenbreite */
  ampFrac: number;
  /** Buchstabenhöhe in u */
  letterU: number;
  /** Anzeigedauer des Buchstabens in ms (inkl. Ein- und Ausblenden) */
  exposureMs: number;
  /** Buchstabenmenge: 0 sehr verschieden, 1 teils ähnlich, 2 ähnlich */
  letterSet: 0 | 1 | 2;
  /** Bahnfolge gemischt (sonst fest) */
  mixed: boolean;
  /** Kugelradius = ballK × Buchstabenhöhe */
  ballK: number;
}

export type ParamKey = keyof LevelParams;

export const BASE_PARAMS: Readonly<LevelParams> = {
  period: 4.0,
  ampFrac: 0.2,
  letterU: 7.0,
  exposureMs: 1100,
  letterSet: 0,
  mixed: false,
  ballK: 0.95,
};

/** Reihenfolge der Änderungen: Stufe n + 1 entsteht aus Stufe n durch genau diesen einen Schritt */
export const STEPS: ReadonlyArray<readonly [ParamKey, number | boolean]> = [
  ['period', 3.7],
  ['letterU', 6.0],
  ['ampFrac', 0.24],
  ['exposureMs', 1000],
  ['period', 3.4],
  ['letterU', 5.0],
  ['letterSet', 1],
  ['exposureMs', 900],
  ['period', 3.1],
  ['ampFrac', 0.27],
  ['mixed', true],
  ['letterU', 4.0],
  ['exposureMs', 800],
  ['period', 2.8],
  ['ballK', 0.88],
  ['letterSet', 2],
  ['exposureMs', 700],
  ['period', 2.5],
  ['letterU', 3.2],
  ['ampFrac', 0.3],
  ['exposureMs', 600],
  ['period', 2.2],
  ['ballK', 0.8],
  ['letterU', 2.8],
];

export const MIN_LEVEL = 1;
export const MAX_LEVEL = STEPS.length + 1;
/** ab dieser Stufe ist die Bahnfolge gemischt (der Schritt „mixed“ in `STEPS` ergibt Stufe 12) */
export const MIXED_FROM_LEVEL = 12;

function buildLevels(): LevelParams[] {
  const out: LevelParams[] = [{ ...BASE_PARAMS }];
  for (const [key, value] of STEPS) {
    const next = { ...out[out.length - 1] } as Record<ParamKey, number | boolean>;
    next[key] = value;
    out.push(next as unknown as LevelParams);
  }
  return out;
}

export const LEVELS: readonly LevelParams[] = buildLevels();

/** Stufe (auch Kommazahl) auf eine ganze Stufe 1…MAX_LEVEL abbilden */
export function levelIndex(level: number): number {
  return clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);
}

export function paramsFor(level: number): LevelParams {
  return LEVELS[levelIndex(level) - 1];
}

// ---------------------------------------------------------------------------
// Maße

/** 1 u (1 % der kürzeren Seite) ≈ 0,23° bei 40 cm (iPad 11″: 8,2 px bei 36 px/°; siehe docs/wissenschaft/02) */
export const DEG_PER_U = 0.23;
/** Obergrenze der Spitzengeschwindigkeit, die die Stufen einhalten (°/s) */
export const PEAK_CAP_DEG_S = 24;
/** Die Spitzengeschwindigkeit darf nie über diesem Wert liegen (°/s bei 40 cm) */
export const PEAK_LIMIT_DEG_S = 25;
/** kleinster Buchstabe in px: ≥ 0,35° solange ein Grad mindestens 18/0,35 ≈ 51 px misst (Tablet ≈ 36, Handy ≈ 45 px/°) */
export const MIN_LETTER_PX = 18;
export const MAX_LETTER_PX = 72;
/** Für Buchstaben- und Kugelgröße wird u nach unten begrenzt (Handy: 1 % von 390 px wäre nur 3,9 px) */
export const U_MIN_FOR_SIGN = 6.5;
/** Das Verhältnis Kugelradius zu Buchstabenhöhe bleibt so groß, dass der Buchstabe sicher in die Kugel passt */
export const MIN_BALL_K = 0.72;

/** Buchstabenhöhe (Versalhöhe) in px für eine Parameter-Zeile */
export function letterPxFor(p: LevelParams, u: number): number {
  return clamp(p.letterU * Math.max(u, U_MIN_FOR_SIGN), MIN_LETTER_PX, MAX_LETTER_PX);
}

/** Radius der Kugel in px für eine Parameter-Zeile */
export function ballRadiusFor(p: LevelParams, u: number): number {
  return letterPxFor(p, u) * p.ballK;
}

/** Buchstabenhöhe (Versalhöhe) in px auf einer Stufe */
export function letterPx(level: number, u: number): number {
  return letterPxFor(paramsFor(level), u);
}

/** Radius der Kugel in px auf einer Stufe */
export function ballRadiusPx(level: number, u: number): number {
  return ballRadiusFor(paramsFor(level), u);
}

/** Spitzengeschwindigkeit in px/s bei Auslenkung amp (px) und Periode (s): v = amp · 2π / T */
export function peakSpeedPx(amp: number, period: number): number {
  return (amp * 2 * Math.PI) / period;
}

/** px/s → °/s bei 40 cm (über u) */
export function pxPerSecToDegPerSec(v: number, u: number): number {
  return (v / Math.max(1e-9, u)) * DEG_PER_U;
}

export interface Room {
  /** Bühnenbreite in px */
  w: number;
  /** 1 u in px (1 % der kürzeren Seite) */
  u: number;
  /** größte erlaubte Auslenkung nach oben/unten in px (halbe Höhe des Feldes abzüglich Kugelradius und Rand) */
  halfH: number;
}

/**
 * Halbe Bahnweite (Auslenkung von der Mitte) in px: die Stufe bestimmt `ampFrac · Breite`; begrenzt durch
 * 60 % der Bühnenbreite für die ganze Bahn, die Spitzengeschwindigkeit (≤ 24°/s) und die Höhe des Feldes.
 */
export function amplitudePx(p: LevelParams, room: Room): number {
  const byStep = p.ampFrac * room.w;
  const byWidth = (MAX_TRACK_WIDTH * room.w) / 2;
  const bySpeed = ((PEAK_CAP_DEG_S / DEG_PER_U) * room.u * p.period) / (2 * Math.PI);
  return Math.max(4, Math.min(byStep, byWidth, bySpeed, room.halfH));
}

// ---------------------------------------------------------------------------
// Bewegung

/** Dauer des weichen Einblendens/Ausblendens der Auslenkung in s */
export const RAMP_S = 1.5;

export function smoothstep(k: number): number {
  const x = clamp(k, 0, 1);
  return x * x * (3 - 2 * x);
}

/**
 * Hüllkurve der Auslenkung 0…1: wächst in `ramp` s weich von 0 auf 1; ab `sEnd` fällt sie in `ramp` s wieder auf 0.
 * Stetig und stetig differenzierbar (kein Sprung der Geschwindigkeit).
 */
export function envelope(s: number, ramp: number, sEnd = Infinity): number {
  const up = ramp > 0 ? smoothstep(s / ramp) : s >= 0 ? 1 : 0;
  const down = s <= sEnd ? 1 : ramp > 0 ? 1 - smoothstep((s - sEnd) / ramp) : 0;
  return up * down;
}

/**
 * Versatz der Kugel von der Bahnmitte (px) zur Zeit s (s) nach Blockbeginn.
 * Gerade: x(s) = amp · env · sin(2π s / T) in Richtung der Geraden. Kreis: amp · env · (cos θ, sin θ), θ = ± 2π s / T
 * (gleichmäßige Winkelgeschwindigkeit; + = im Uhrzeigersinn, weil y nach unten wächst).
 */
export function offsetAt(shape: Shape, s: number, period: number, amp: number, env: number): Vec {
  const w = (2 * Math.PI) / period;
  const d = lineDir(shape);
  if (d) {
    const v = amp * env * Math.sin(w * s);
    return { x: d.x * v, y: d.y * v };
  }
  const th = circleSign(shape) * w * s;
  return { x: amp * env * Math.cos(th), y: amp * env * Math.sin(th) };
}

/** Tempo der Kugel relativ zum Höchsttempo (0…1) im gleichmäßigen Lauf; Kreis: immer 1 */
export function speedRatio(shape: Shape, s: number, period: number): number {
  if (isCircle(shape)) return 1;
  return Math.abs(Math.cos((2 * Math.PI * s) / period));
}

/** Mindest-Tempo (relativ zum Höchsttempo), unter dem eine Strecke als Umkehr zählt: ±60° um den Mitteldurchgang */
export const UNIFORM_MIN_SPEED_RATIO = 0.5;

/** Ist die Kugel von `onsetS` bis `onsetS + exposureS` im geraden, gleichmäßigen Teil (bei Kreisen immer)? */
export function windowIsUniform(shape: Shape, period: number, onsetS: number, exposureS: number, tol = 1e-9): boolean {
  if (isCircle(shape)) return true;
  const w = (2 * Math.PI) / period;
  const a = w * onsetS;
  const b = w * (onsetS + exposureS);
  const k = Math.round((a + b) / 2 / Math.PI);
  const lim = Math.acos(UNIFORM_MIN_SPEED_RATIO) + tol * w;
  return Math.abs(a - k * Math.PI) <= lim && Math.abs(b - k * Math.PI) <= lim;
}

/** frühester Beginn eines Buchstabens nach Blockbeginn (s): Auslenkung steht, bei Kreisen mindestens 2 s */
export function minSignStartS(shape: Shape, ramp: number): number {
  return isCircle(shape) ? Math.max(2.0, ramp + 0.1) : ramp + 0.1;
}

/**
 * Beginn des nächsten Buchstabens (s nach Blockbeginn), frühestens `fromS`: Auf Geraden mittig um den nächsten
 * Mitteldurchgang (dort ist die Strecke am geradesten und schnellsten), auf Kreisen sofort.
 */
export function nextSignOnset(shape: Shape, period: number, exposureS: number, fromS: number, ramp: number): number {
  const from = Math.max(fromS, minSignStartS(shape, ramp));
  if (isCircle(shape)) return from;
  const half = period / 2;
  const k = Math.max(0, Math.ceil((from + exposureS / 2) / half - 1e-9));
  return k * half - exposureS / 2;
}

// ---------------------------------------------------------------------------
// Buchstaben

/** Weiche Blende des Buchstabens in ms je Übergang (≥ 150 ms) */
export const FADE_MS = 160;
/** Antwortfrist nach dem Ende der Anzeige in ms (≥ 2,5 s) */
export const ANSWER_MS = 2500;

/** Stufe-0-Menge: sehr deutlich verschiedene Großbuchstaben */
export const LETTERS_DISTINCT: readonly string[] = ['A', 'H', 'L', 'O', 'T', 'X'];
/** Ähnliche Buchstaben in Vierergruppen (Stufen 1 und 2) */
export const LETTER_GROUPS: readonly (readonly string[])[] = [
  ['B', 'D', 'P', 'R'],
  ['E', 'F', 'L', 'T'],
  ['C', 'G', 'O', 'Q'],
];

/** Sichtbarkeit des Buchstabens 0…1 zum Zeitpunkt age (ms nach Beginn): weich ein und aus, je `FADE_MS` */
export function letterAlpha(ageMs: number, exposureMs: number, fadeMs = FADE_MS): number {
  if (ageMs <= 0 || ageMs >= exposureMs) return 0;
  return smoothstep(Math.min(ageMs, exposureMs - ageMs) / fadeMs);
}

export interface LetterTrial {
  /** die vier Buchstaben der Buttons, von links nach rechts */
  options: string[];
  /** Index des richtigen Buttons */
  correctIndex: number;
  /** der Buchstabe auf der Kugel */
  correct: string;
}

/** Vierergruppe, zu der ein Buchstabe gehört (erste Gruppe, die ihn enthält), sonst −1 */
export function groupOf(letter: string): number {
  return LETTER_GROUPS.findIndex((g) => g.includes(letter));
}

/**
 * Buchstaben eines Durchgangs: eine richtige Antwort (der Buchstabe auf der Kugel), drei Ablenker, Position zufällig.
 * Menge 0: alle sechs verschiedene Großbuchstaben; Menge 1: zwei Ablenker aus derselben Gruppe, einer aus einer anderen;
 * Menge 2: alle vier aus derselben Gruppe. `avoid` = zuletzt gezeigter Buchstabe (wird nicht sofort wiederholt).
 */
export function makeLetterTrial(rng: Rng, letterSet: 0 | 1 | 2, avoid?: string): LetterTrial {
  let options: string[];
  let correct: string;
  if (letterSet === 0) {
    const pool = LETTERS_DISTINCT.filter((l) => l !== avoid);
    correct = rng.pick(pool);
    const others = rng.shuffle(LETTERS_DISTINCT.filter((l) => l !== correct)).slice(0, 3);
    options = [correct, ...others];
  } else {
    const all = LETTER_GROUPS.flat().filter((l, i, a) => a.indexOf(l) === i);
    const pool = all.filter((l) => l !== avoid);
    correct = rng.pick(pool);
    const g = LETTER_GROUPS[groupOf(correct)];
    if (letterSet === 2) {
      options = [...g];
    } else {
      const same = rng.shuffle(g.filter((l) => l !== correct)).slice(0, 2);
      const far = rng.pick(all.filter((l) => !g.includes(l) && l !== correct && !same.includes(l)));
      options = [correct, ...same, far];
    }
  }
  options = rng.shuffle([...options]);
  return { options, correct, correctIndex: options.indexOf(correct) };
}

// ---------------------------------------------------------------------------
// Bahnfolge

/**
 * Nächste Bahn: aus den noch nicht gespielten (in fester Reihenfolge) die erste, bei gemischter Folge eine zufällige;
 * nie dieselbe wie die vorige. Jede Bahn kommt je Sitzung höchstens einmal vor.
 */
export function pickNextShape(rng: Rng, remaining: readonly Shape[], prev: Shape | null, mixed: boolean): Shape {
  const cand = remaining.filter((s) => s !== prev);
  const pool = cand.length ? cand : [...remaining];
  return mixed ? pool[rng.int(pool.length)] : pool[0];
}

// ---------------------------------------------------------------------------
// Anpassung und Ergebnis

/** ≥ 85 % richtig → schwerer */
export const UP_AT = 0.85;
/** < 65 % richtig → leichter; ab 65 % gilt der Block als bestanden */
export const DOWN_BELOW = 0.65;

export type Verdict = 'harder' | 'easier' | 'same';

export function blockVerdict(hits: number, n: number): Verdict {
  if (n <= 0) return 'same';
  const acc = hits / n;
  if (acc >= UP_AT - 1e-9) return 'harder';
  if (acc < DOWN_BELOW - 1e-9) return 'easier';
  return 'same';
}

export interface BlockRec {
  shape: Shape;
  level: number;
  hits: number;
  n: number;
}

/** Hauptwert: höchste Stufe, auf der ein Block zu mindestens 65 % richtig war (mindestens Stufe 1) */
export function reachedLevel(blocks: readonly BlockRec[]): number {
  let best = MIN_LEVEL;
  for (const b of blocks) {
    if (b.n > 0 && b.hits / b.n >= DOWN_BELOW - 1e-9) best = Math.max(best, levelIndex(b.level));
  }
  return best;
}

/** Wahrscheinlichkeit einer richtigen Antwort der Geister-Hand im Autoplay (sinkt mit der Stufe) */
export function autoAccuracy(level: number): number {
  return clamp(0.97 - 0.03 * (levelIndex(level) - 1), 0.45, 0.97);
}

/** Leichte feste Einstellung für den Intro-Film (Stufen-unabhängig; erfüllt dieselben Randbedingungen) */
export const DEMO_PARAMS: Readonly<LevelParams> = {
  period: 3.0,
  ampFrac: 0.22,
  letterU: 7.0,
  exposureMs: 800,
  letterSet: 0,
  mixed: false,
  ballK: 0.95,
};
