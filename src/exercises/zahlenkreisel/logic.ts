/**
 * Zahlenkreisel – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Die Zahlen 1 … N (Standard 40) stehen auf mehreren gemeinsamen Kreisringen um die Mitte des Felds.
 * Jeder Ring dreht sich langsam starr um die Mitte; benachbarte Ringe drehen gegeneinander (abwechselnd im
 * und gegen den Uhrzeigersinn) und unterschiedlich schnell. Die Ziffern selbst drehen nicht mit dem Ring
 * mit – sie bleiben aufrecht und schaukeln nur leicht um die eigene Achse (Pendel, eigene Phase je Zahl).
 * Man tippt die Zahlen in aufsteigender Folge an.
 *
 * Geometrie (keine Überlappung zu keinem Zeitpunkt):
 * - Jede Zahl wird durch ihren Hüllkreis (Radius rb) beschrieben; er enthält die Zahl in jeder Schräglage.
 * - Mittenabstand („Teilung“ p) ≥ 2·rb + Luft und ≥ 50 px (≈ 9 mm, wie die kleinste Zelle der Zahlenjagd);
 *   die Trefferfläche ist ein Kreis mit Radius p/2, Trefferflächen überlappen sich also nie.
 * - Ringe liegen radial genau p auseinander. Weil sich benachbarte Ringe gegeneinander drehen, kann jede
 *   Winkelstellung vorkommen – der radiale Abstand allein garantiert den Mindestabstand über Ringe hinweg.
 * - Innerhalb eines Rings stehen die n Zahlen in gleichen Winkelabständen; die Sehne 2·r·sin(π/n) ≥ p. Da
 *   der Ring starr dreht, bleibt dieser Abstand immer gleich.
 * - Reicht der Platz nicht (Handy), werden zuerst die Schrift und dann die Teilung verkleinert, nie unter
 *   44 px (Mindestgröße für Touch-Ziele).
 *
 * Bewegung: Winkel eines Platzes θ(t) = φ₀ + 2πj/n + ω_k·t (ω_k mit Vorzeichen = Richtung). Die
 * Bahngeschwindigkeit wächst mit der Wurzel des Radius (innen dreht der Ring im Winkel etwas schneller,
 * bewegt sich aber langsamer), die Stufe bestimmt das Grundtempo am äußeren Ring in u/s (u = 1 % der
 * kürzeren Bühnenseite) und wie verschieden die Ringe laufen. Schaukeln: Neigung α(t) = A·sin(2πf·t + ψ),
 * |α| ≤ A ≤ 18°. Alles ist eine reine Funktion der Zeit (bildratenunabhängig, für jeden Zeitpunkt exakt);
 * Zufall nur über den übergebenen Rng. Bei „Bewegung reduzieren“ stehen Ringe und Ziffern still.
 *
 * Grundlagen (Quellen in science.ts und im Katalog-Eintrag 935): Zahlen der Reihe nach suchen ist das
 * Prinzip der Zahlentafel nach Schulte bzw. von Trail Making A (Reitan, 1958; Salthouse, 2011); visuelle
 * Suche wird mit Zahl und Ähnlichkeit der Ablenker langsamer (Treisman & Gelade, 1980; Duncan & Humphreys,
 * 1989). Bewegte Ziele erkennen ist dynamische Sehschärfe (Ludvigh & Miller, 1958); enge Abstände erschweren
 * das Erkennen (Crowding; Whitney & Levi, 2011), deshalb der feste Mindestabstand.
 */
import type { Rng } from '../../core/rng';
import { sanitizeParams } from '../../core/params';
import type { ExerciseParams, ParamDef } from '../../core/types';
import { clamp, median } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 8;
export const levelOf = (level: number): number => clamp(Math.floor((Number.isFinite(level) ? level : MIN_LEVEL) + 1e-9), MIN_LEVEL, MAX_LEVEL);

// ---------------------------------------------------------------------------
// Stufen

export interface LevelSpec {
  /** Bahngeschwindigkeit am äußeren Ring in u/s (u = 1 % der kürzeren Bühnenseite) */
  speedU: number;
  /** Unterschied der Ringe: Tempo je Ring = Grundtempo · (1 ± ringVar) */
  ringVar: number;
  /** Größte Neigung beim Schaukeln in Grad (bei Einstellung „Normal“) */
  swayDeg: number;
  /** Mittlere Schaukelfrequenz in Hz */
  swayHz: number;
}

/**
 * Stufen 1–8. Je Stufe wird alles etwas schneller und unruhiger; die Zahl der Zahlen bestimmt die Einstellung
 * (Standard 40). Das Tempo bleibt langsam: Stufe 8 entspricht am Tablet (u ≈ 8 px, 40 cm) etwa 1,8°/s am äußeren
 * Ring, mit Drehtempo 150 % höchstens etwa 3,6°/s für den schnellsten Ring.
 */
export const LEVELS: readonly LevelSpec[] = [
  { speedU: 2.0, ringVar: 0.0, swayDeg: 4, swayHz: 0.25 },
  { speedU: 2.8, ringVar: 0.05, swayDeg: 5, swayHz: 0.27 },
  { speedU: 3.6, ringVar: 0.1, swayDeg: 6, swayHz: 0.29 },
  { speedU: 4.4, ringVar: 0.15, swayDeg: 7, swayHz: 0.31 },
  { speedU: 5.2, ringVar: 0.2, swayDeg: 8, swayHz: 0.33 },
  { speedU: 6.0, ringVar: 0.25, swayDeg: 9, swayHz: 0.35 },
  { speedU: 7.0, ringVar: 0.3, swayDeg: 10, swayHz: 0.38 },
  { speedU: 8.0, ringVar: 0.35, swayDeg: 12, swayHz: 0.4 },
];

export const levelSpec = (level: number): LevelSpec => LEVELS[levelOf(level) - 1];

// ---------------------------------------------------------------------------
// Einstellungen (Trainer / Intro)

export const COUNT_MIN = 20;
export const COUNT_MAX = 40;
export const SWAY_FACTOR = { off: 0, light: 0.5, normal: 1, strong: 1.5 } as const;
export type SwayChoice = keyof typeof SWAY_FACTOR;
/** Obergrenze der Neigung in Grad (Stufe 8 · „Stark“) */
export const MAX_TILT_DEG = 18;

export const PARAM_DEFS: readonly ParamDef[] = [
  { key: 'count', type: 'number', default: 40, min: COUNT_MIN, max: COUNT_MAX, step: 5, unit: 'count', summary: true },
  { key: 'tempo', type: 'number', default: 100, min: 50, max: 150, step: 25, unit: 'percent' },
  { key: 'counter', type: 'select', default: 'on', options: ['on', 'off'] },
  { key: 'sway', type: 'select', default: 'normal', options: ['off', 'light', 'normal', 'strong'] },
];

export interface Settings {
  /** Anzahl Zahlen 20–40 */
  count: number;
  /** Faktor auf das Drehtempo der Stufe (0,5–1,5) */
  tempo: number;
  /** Benachbarte Ringe gegenläufig */
  counter: boolean;
  /** Faktor auf die Schaukel-Neigung der Stufe (0 = aus) */
  sway: number;
}

/** Einstellungen bereinigen (Zahlen geklemmt und gerundet, unbekannte Auswahl → Standard) */
export function settingsFrom(values: ExerciseParams | Readonly<Record<string, unknown>> | null | undefined): Settings {
  const v = sanitizeParams(PARAM_DEFS, values ?? {});
  return {
    count: Number(v.count),
    tempo: Number(v.tempo) / 100,
    counter: v.counter === 'on',
    sway: SWAY_FACTOR[v.sway as SwayChoice] ?? 1,
  };
}

// ---------------------------------------------------------------------------
// Zahlen und Geometrie

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Schriftgröße der Zahlen in px aus u: am Tablet ≈ 44–48 px (Ziffernhöhe ≈ 0,7 F ≈ 1° aus 40 cm), nie über 60 px; so passen am Tablet vier Ringe */
export const glyphPx = (u: number): number => clamp(5.8 * u, 30, 60);
/** Kleinste Schrift, auf die bei Platzmangel verkleinert wird */
export const MIN_FONT = 22;

/** Sichtbares Halbmaß einer Zahl (Näherung für fette Systemschrift, wie im Zahlen-Buchstaben-Wirbel) */
export function visibleHalf(label: string, F: number): { hw: number; hh: number } {
  const n = label.length;
  return { hw: F * (n === 1 ? 0.3 : 0.3 * n - 0.02), hh: F * 0.38 };
}

/** Hüllkreis einer (höchstens zweistelligen) Zahl: enthält sie in jeder Neigung */
export function boundRadius(F: number): number {
  const { hw, hh } = visibleHalf('40', F);
  return Math.hypot(hw, hh);
}

/** Luft zwischen zwei Hüllkreisen in px */
export const airFor = (F: number): number => Math.max(6, F * 0.22);

/** Gewünschte kleinste Teilung (≈ 9 mm, kleinste Zelle der Zahlenjagd) und absolute Untergrenze (Touch) */
export const TARGET_PITCH = 50;
export const MIN_PITCH = 44;

/** Wie viele Zahlen passen auf einen Ring mit Radius r bei Teilung p (Sehne 2r·sin(π/n) ≥ p) */
export function ringCapacity(r: number, pitch: number): number {
  if (r <= 1e-6) return 1;
  const s = pitch / (2 * r);
  if (s >= 1) return 1;
  // kleine Reserve gegen Rundung, damit die Sehne sicher ≥ p bleibt
  return Math.max(1, Math.floor(Math.PI / Math.asin(s) + 1e-9));
}

/**
 * Radien der Ringe von außen nach innen: äußerer Ring so, dass Hüllkreis und Trefferfläche im Feld bleiben,
 * dann jeweils eine Teilung weiter innen, solange r ≥ p (der Innerste hat damit sicher Abstand zur Mitte).
 * Die Mitte (r = 0) ist ein möglicher Platz für genau eine Zahl.
 */
export function ringRadii(R: number, pitch: number, rb: number): number[] {
  const out: number[] = [];
  let r = R - Math.max(rb, pitch / 2);
  while (r >= pitch - 1e-9 && out.length < 12) {
    out.push(r);
    r -= pitch;
  }
  return out;
}

export interface RingPlan {
  /** Schriftgröße in px */
  F: number;
  /** Hüllkreis-Radius einer Zahl */
  rb: number;
  /** Mittenabstand (Teilung) und Radius der Trefferfläche (= p/2) */
  pitch: number;
  hitR: number;
  /** Radien (außen → innen; ein letzter Eintrag 0 = Platz in der Mitte) */
  radii: number[];
  /** Zahlen je Ring (gleiche Reihenfolge) */
  counts: number[];
  /** `false`, wenn selbst mit kleinster Schrift und Teilung nicht alle Zahlen Platz haben */
  fits: boolean;
}

/** Kapazität je Ring (inklusive Mitte am Ende) */
export function capacities(radii: readonly number[], pitch: number): number[] {
  return [...radii.map((r) => ringCapacity(r, pitch)), 1];
}

/**
 * Verteilt N Zahlen auf die Ringe: anteilig zur Kapazität (außen mehr, wie bei einer Zahlenscheibe), höchstens
 * die Kapazität je Ring; die Mitte wird nur belegt, wenn die Ringe nicht reichen.
 */
export function distribute(caps: readonly number[], N: number): number[] {
  const ringCaps = caps.slice(0, -1);
  const total = ringCaps.reduce((s, c) => s + c, 0);
  const counts = new Array<number>(caps.length).fill(0);
  if (total >= N && total > 0) {
    const share = ringCaps.map((c) => (c * N) / total);
    ringCaps.forEach((c, i) => (counts[i] = Math.min(c, Math.floor(share[i]))));
    let rest = N - counts.reduce((s, c) => s + c, 0);
    const order = ringCaps.map((_, i) => i).sort((a, b) => share[b] - Math.floor(share[b]) - (share[a] - Math.floor(share[a])) || a - b);
    while (rest > 0) {
      let placed = false;
      for (const i of order) {
        if (rest <= 0) break;
        if (counts[i] < ringCaps[i]) {
          counts[i]++;
          rest--;
          placed = true;
        }
      }
      if (!placed) break;
    }
    // Ein Ring mit einer einzelnen Zahl wirkt verloren: an den Nachbarring abgeben, wenn dort Platz ist
    for (let i = ringCaps.length - 1; i > 0; i--) {
      if (counts[i] === 1 && counts[i - 1] < ringCaps[i - 1]) {
        counts[i - 1]++;
        counts[i] = 0;
      }
    }
    return counts;
  }
  ringCaps.forEach((c, i) => (counts[i] = c));
  counts[counts.length - 1] = Math.min(1, Math.max(0, N - total));
  return counts;
}

/**
 * Ringplan für N Zahlen in einem Kreis mit Radius R: Schrift aus u; passt es nicht, erst Schrift (bis 22 px),
 * dann Teilung (bis 44 px) verkleinern.
 */
export function planRings(R: number, u: number, N: number): RingPlan {
  let F = glyphPx(u);
  let pitchFloor = TARGET_PITCH;
  let best: RingPlan | null = null;
  for (let guard = 0; guard < 80; guard++) {
    const rb = boundRadius(F);
    const pitch = Math.max(pitchFloor, 2 * rb + airFor(F));
    const radii = ringRadii(R, pitch, rb);
    const caps = capacities(radii, pitch);
    const cap = caps.reduce((s, c) => s + c, 0);
    const counts = distribute(caps, N);
    const plan: RingPlan = { F, rb, pitch, hitR: pitch / 2, radii: [...radii, 0], counts, fits: cap >= N };
    if (plan.fits) return trimEmpty(plan);
    best = plan;
    if (2 * rb + airFor(F) > pitchFloor && F > MIN_FONT) F = Math.max(MIN_FONT, F * 0.95);
    else if (pitchFloor > MIN_PITCH) {
      pitchFloor = Math.max(MIN_PITCH, pitchFloor - 2);
      // Schrift so weit verkleinern, dass sie in die neue Teilung passt
      while (F > MIN_FONT && 2 * boundRadius(F) + airFor(F) > pitchFloor) F = Math.max(MIN_FONT, F * 0.97);
    } else break;
  }
  return trimEmpty(best!);
}

/** Leere Ringe (Zählung 0) entfernen */
function trimEmpty(p: RingPlan): RingPlan {
  const keep = p.counts.map((c, i) => (c > 0 ? i : -1)).filter((i) => i >= 0);
  return { ...p, radii: keep.map((i) => p.radii[i]), counts: keep.map((i) => p.counts[i]) };
}

/**
 * Aufteilung der Bühne: Anzeige („Gesucht“ und Uhr) und rundes Feld. `top`: Anzeige oben, Feld darunter
 * (Standard). `side`: Anzeige links neben dem Feld, das Feld nutzt die volle Höhe (breite, niedrige Bühnen,
 * z. B. Handy quer). `pill` ist der Bereich, in dem die Anzeige mittig gezeichnet wird.
 */
export interface FieldGeom {
  pill: Rect;
  cx: number;
  cy: number;
  /** Radius des Felds */
  R: number;
  mode: 'top' | 'side';
}

export const pillHeight = (u: number): number => Math.max(52, u * 7.5);
/** Mindestbreite der Anzeige neben dem Feld */
export const SIDE_PILL_MIN = 200;

export function fieldGeometry(w: number, h: number, u: number, bottom: number, mode: 'top' | 'side' = 'top'): FieldGeom {
  const m = Math.max(8, u * 1.6);
  const pillH = pillHeight(u);
  if (mode === 'side') {
    const fh = Math.max(40, Math.min(h - m, bottom) - m);
    const R = Math.max(20, Math.min(fh / 2, (w - 3 * m - SIDE_PILL_MIN) / 2));
    const cx = w - m - R;
    const cy = m + fh / 2;
    return { pill: { x: m, y: cy - pillH / 2, w: Math.max(40, cx - R - 2 * m), h: pillH }, cx, cy, R, mode };
  }
  const top = m + pillH + Math.max(8, u * 1.4);
  const fw = Math.max(40, w - 2 * m);
  const fh = Math.max(40, Math.min(h - m, bottom) - top);
  const R = Math.min(fw, fh) / 2;
  return { pill: { x: m, y: m, w: fw, h: pillH }, cx: w / 2, cy: top + fh / 2, R, mode };
}

/**
 * Feld und Ringplan für N Zahlen: Anzeige oben; passen die Zahlen so nicht (z. B. Handy quer), steht die Anzeige
 * links neben dem Feld, wenn das Feld dadurch größer wird.
 */
export function chooseLayout(w: number, h: number, u: number, bottom: number, N: number): { geom: FieldGeom; plan: RingPlan } {
  const geom = fieldGeometry(w, h, u, bottom, 'top');
  const plan = planRings(geom.R, u, N);
  if (plan.fits && plan.pitch >= TARGET_PITCH) return { geom, plan };
  const side = fieldGeometry(w, h, u, bottom, 'side');
  if (side.R <= geom.R + 1) return { geom, plan };
  const sidePlan = planRings(side.R, u, N);
  const better = (sidePlan.fits && !plan.fits) || (sidePlan.fits === plan.fits && sidePlan.pitch > plan.pitch);
  return better ? { geom: side, plan: sidePlan } : { geom, plan };
}

// ---------------------------------------------------------------------------
// Bewegung

export interface RingMotion {
  r: number;
  n: number;
  /** Winkelgeschwindigkeit mit Vorzeichen (rad/s; > 0 = im Uhrzeigersinn, y zeigt nach unten) */
  omega: number;
  /** Startwinkel */
  phase0: number;
}

type R = Pick<Rng, 'next' | 'range' | 'shuffle'>;

/**
 * Bewegung der Ringe: Grundtempo v₀ = speedU · u · tempo am äußeren Ring; Ring k mit Radius r läuft mit
 * v₀ · √(r/r_außen) · (1 ± ringVar), Richtung abwechselnd (außen im Uhrzeigersinn), bei `counter = false`
 * alle gleich herum. Die Mitte steht.
 */
export function ringMotions(plan: Pick<RingPlan, 'radii' | 'counts'>, spec: LevelSpec, s: Pick<Settings, 'tempo' | 'counter'>, u: number, rng: R): RingMotion[] {
  const rOut = Math.max(1, plan.radii[0] ?? 1);
  const v0 = spec.speedU * u * s.tempo;
  let k = 0;
  return plan.radii.map((r, i) => {
    const n = plan.counts[i];
    const phase0 = rng.range(0, 2 * Math.PI);
    if (r <= 1e-6) return { r: 0, n, omega: 0, phase0 };
    const dir = s.counter && k % 2 === 1 ? -1 : 1;
    k++;
    const vary = 1 + spec.ringVar * rng.range(-1, 1);
    const v = v0 * Math.sqrt(r / rOut) * vary;
    return { r, n, omega: (dir * v) / r, phase0 };
  });
}

/** Größte Bahngeschwindigkeit (px/s) aller Ringe */
export const peakSpeed = (motions: readonly RingMotion[]): number => Math.max(0, ...motions.map((m) => Math.abs(m.omega) * m.r));

export interface Slot {
  ring: number;
  j: number;
}

/** Plätze in fester Reihenfolge (Ring für Ring, außen zuerst) */
export function slotsOf(counts: readonly number[]): Slot[] {
  const out: Slot[] = [];
  counts.forEach((n, ring) => {
    for (let j = 0; j < n; j++) out.push({ ring, j });
  });
  return out;
}

/** Winkel eines Platzes zur Zeit tSec (Sekunden seit Rundenbeginn) */
export function slotAngle(m: RingMotion, j: number, tSec: number): number {
  return m.phase0 + (2 * Math.PI * j) / Math.max(1, m.n) + m.omega * tSec;
}

export function slotPos(cx: number, cy: number, m: RingMotion, j: number, tSec: number): { x: number; y: number } {
  if (m.r <= 1e-6) return { x: cx, y: cy };
  const a = slotAngle(m, j, tSec);
  return { x: cx + m.r * Math.cos(a), y: cy + m.r * Math.sin(a) };
}

export interface Sway {
  /** Größte Neigung in rad */
  amp: number;
  hz: number;
  psi: number;
}

/** Schaukeln je Zahl: Neigung der Stufe · Faktor der Einstellung, Frequenz ±20 % um den Stufenwert, eigene Phase */
export function makeSway(spec: LevelSpec, factor: number, rng: R): Sway {
  const deg = Math.min(MAX_TILT_DEG, spec.swayDeg * Math.max(0, factor));
  return { amp: (deg * Math.PI) / 180, hz: spec.swayHz * rng.range(0.8, 1.2), psi: rng.range(0, 2 * Math.PI) };
}

/** Neigung in rad zur Zeit tSec – unabhängig vom Drehwinkel des Rings (die Ziffer bleibt aufrecht) */
export function tiltAt(s: Sway, tSec: number): number {
  return s.amp > 0 ? s.amp * Math.sin(2 * Math.PI * s.hz * tSec + s.psi) : 0;
}

// ---------------------------------------------------------------------------
// Zuordnung Zahl → Platz

/** Liegen zwei Plätze im selben Ring direkt nebeneinander? */
export function adjacent(a: Slot, b: Slot, counts: readonly number[]): boolean {
  if (a.ring !== b.ring) return false;
  const n = counts[a.ring];
  if (n < 3) return n === 2;
  const d = Math.abs(a.j - b.j) % n;
  return d === 1 || d === n - 1;
}

/**
 * Zufällige Zuordnung: `numberAt[slotIndex]` = Zahl 1 … N. Aufeinanderfolgende Zahlen stehen nie direkt
 * nebeneinander im selben Ring (der Weg lässt sich nicht „entlanghangeln“ – wie bei der Zahlenjagd).
 */
export function assignNumbers(slots: readonly Slot[], counts: readonly number[], rng: R): number[] {
  const N = slots.length;
  for (let attempt = 0; attempt < 300; attempt++) {
    const order = rng.shuffle(Array.from({ length: N }, (_, i) => i));
    let ok = true;
    for (let k = 1; k < N && ok; k++) if (adjacent(slots[order[k - 1]], slots[order[k]], counts)) ok = false;
    if (ok) return toNumberAt(order);
  }
  // Rückfall: gierig eine Folge ohne Nachbarschaft bauen
  const free = rng.shuffle(Array.from({ length: N }, (_, i) => i));
  const path: number[] = [free.shift()!];
  while (free.length) {
    const prev = slots[path[path.length - 1]];
    const idx = free.findIndex((s) => !adjacent(prev, slots[s], counts));
    path.push(free.splice(idx < 0 ? 0 : idx, 1)[0]);
  }
  return toNumberAt(path);
}

function toNumberAt(order: readonly number[]): number[] {
  const numberAt = new Array<number>(order.length);
  order.forEach((slot, k) => (numberAt[slot] = k + 1));
  return numberAt;
}

// ---------------------------------------------------------------------------
// Antippen

export interface Hittable {
  x: number;
  y: number;
  /** Radius der Trefferfläche */
  r: number;
  num: number;
  done: boolean;
}

export type TapResult = { kind: 'target'; i: number } | { kind: 'wrong'; i: number } | { kind: 'old'; i: number } | { kind: 'none' };

/**
 * Welche Zahl ist gemeint? Die nächste Mitte, deren Trefferkreis den Punkt enthält (die Kreise überlappen sich
 * nicht; liegt die gesuchte trotzdem darunter, hat sie Vorrang). Schon gefundene → „old“ (ignorieren),
 * daneben → „none“ (zählt nicht).
 */
export function pickTap(items: readonly Hittable[], px: number, py: number, next: number): TapResult {
  let best = -1;
  let bestD = Infinity;
  for (let i = 0; i < items.length; i++) {
    const m = items[i];
    const d = Math.hypot(px - m.x, py - m.y);
    if (d > m.r) continue;
    if (!m.done && m.num === next) return { kind: 'target', i };
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  if (best < 0) return { kind: 'none' };
  return items[best].done ? { kind: 'old', i: best } : { kind: 'wrong', i: best };
}

/** Ablauf einer Runde: gesuchte Zahl, Fehltipps, Zeitpunkte der richtigen Tipps */
export interface RunState {
  total: number;
  /** gesuchte Zahl (1 … total; total + 1 = fertig) */
  next: number;
  errors: number;
  /** Zeit von Rundenbeginn bzw. vom vorigen richtigen Tipp bis zu diesem (ms), Index = Zahl − 1 */
  intervals: number[];
  t0: number;
  lastT: number;
}

export const newRun = (total: number, t0: number): RunState => ({ total, next: 1, errors: 0, intervals: [], t0, lastT: t0 });
export const isDone = (s: RunState): boolean => s.next > s.total;

/** Tipp auf Zahl `num` (null = daneben) zur Zeit t; schon gefundene Zahlen zählen nicht */
export function registerTap(s: RunState, num: number | null, t: number): 'target' | 'wrong' | 'old' | 'none' {
  if (isDone(s) || num === null) return 'none';
  if (num < s.next) return 'old';
  if (num === s.next) {
    s.intervals.push(Math.max(0, t - s.lastT));
    s.lastT = t;
    s.next++;
    return 'target';
  }
  s.errors++;
  return 'wrong';
}

// ---------------------------------------------------------------------------
// Bewertung und Anpassung

/**
 * Zeitrahmen je Zahl in ms: (600 + 25 · N) ms (bei konstanter Suchmenge wächst die Suchzeit je Zahl mit N),
 * mit Zuschlag 30 % auf Stufe 1, der je Stufe um 4 Prozentpunkte sinkt (Stufe 8: + 2 %).
 * Beispiel 40 Zahlen: Stufe 1 ≈ 2,1 s je Zahl (83 s), Stufe 8 ≈ 1,6 s je Zahl (65 s).
 */
export function limitPerNumberMs(N: number, level: number): number {
  return (600 + 25 * N) * (1.3 - 0.04 * (levelOf(level) - 1));
}

export const maxErrorsFor = (N: number): number => Math.max(1, Math.round(N * 0.05));
const failErrorsFor = (N: number): number => Math.max(3, Math.round(N * 0.15));

export type Verdict = 'success' | 'same' | 'fail';

/** Geschafft: im Zeitrahmen und höchstens 5 % Fehltipps. Deutlich zu langsam (> 1,5 ×) oder viele Fehltipps: leichter. */
export function judge(N: number, level: number, totalMs: number, errors: number, complete = true): Verdict {
  if (!complete) return 'fail';
  const per = totalMs / Math.max(1, N);
  const lim = limitPerNumberMs(N, level);
  if (per <= lim && errors <= maxErrorsFor(N)) return 'success';
  if (per > 1.5 * lim || errors > failErrorsFor(N)) return 'fail';
  return 'same';
}

export function nextLevelAfter(level: number, v: Verdict): number {
  const L = levelOf(level);
  return levelOf(v === 'success' ? L + 1 : v === 'fail' ? L - 1 : L);
}

/** Hauptwert: geschaffte Stufe; sonst eine darunter (mindestens 1) */
export const primaryLevel = (level: number, v: Verdict): number => (v === 'success' ? levelOf(level) : levelOf(level - 1));

/** Zeiten je Zehnerblock: Summe der Intervalle der Zahlen 1–10, 11–20 … */
export function blockTimes(intervals: readonly number[], size = 10): Array<{ from: number; to: number; ms: number }> {
  const out: Array<{ from: number; to: number; ms: number }> = [];
  for (let i = 0; i < intervals.length; i += size) {
    const part = intervals.slice(i, i + size);
    out.push({ from: i + 1, to: i + part.length, ms: part.reduce((s, v) => s + v, 0) });
  }
  return out;
}

/** Zeit pro Zahl: Median der Abstände ohne die erste Zahl (die enthält das erste Orientieren) */
export function perNumberMs(intervals: readonly number[]): number {
  const xs = intervals.length > 1 ? intervals.slice(1) : intervals;
  return xs.length ? median(xs) : NaN;
}

/** Schlüssel in texts.tips: errors | late | system | great */
export function tipFor(o: { N: number; level: number; totalMs: number; errors: number; intervals: readonly number[]; complete: boolean }): string {
  if (o.errors >= Math.max(3, maxErrorsFor(o.N) + 1)) return 'errors';
  const blocks = blockTimes(o.intervals);
  if (o.complete && blocks.length >= 3) {
    const first = blocks[1].ms / Math.max(1, blocks[1].to - blocks[1].from + 1);
    const last = blocks[blocks.length - 1].ms / Math.max(1, blocks[blocks.length - 1].to - blocks[blocks.length - 1].from + 1);
    if (last > 1.4 * first) return 'late';
  }
  if (!o.complete || o.totalMs / Math.max(1, o.N) > limitPerNumberMs(o.N, o.level)) return 'system';
  return 'great';
}

export const tapPoints = (level: number): number => 2 + levelOf(level);
export const roundBonus = (level: number, v: Verdict): number => (v === 'success' ? 10 * levelOf(level) : 0);

/** Stoppuhr „mm:ss,hh“ (Minuten, Sekunden, Hundertstel; Komma in DE und IT) */
export function stopwatch(ms: number): string {
  const cs = Math.max(0, Math.floor(ms / 10));
  const m = Math.floor(cs / 6000);
  const s = Math.floor((cs % 6000) / 100);
  const h = cs % 100;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(h).padStart(2, '0')}`;
}
