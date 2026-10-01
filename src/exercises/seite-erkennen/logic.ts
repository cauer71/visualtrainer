/**
 * Welche Seite? – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Kernaufgabe: Ein Körperteil (Hand, Fuß, Unterarm mit Hand) erscheint, eventuell gedreht; man tippt
 * LINKS oder RECHTS. Das ist die klassische Aufgabe der „mentalen Drehung von Körperteilen“
 * (Cooper & Shepard 1975; Sekiyama 1982; Parsons 1987): Die Antwortzeit wächst mit dem Drehwinkel und ist
 * für körperlich unbequeme Drehrichtungen länger. Die Drehung ändert NIE die Seite (Drehung ≠ Spiegelung);
 * nur Ansicht (Handfläche/Handrücken, Sohle/Fußrücken) und Seite entscheiden.
 *
 * Stufenplan (Staircase 3-down/1-up, Stufe 1–12). Gegenüber dem Intro-Video wissenschaftlich begründet
 * geändert: Die Drehwinkel wachsen in der Reihenfolge, in der auch die Antwortzeiten wachsen
 * (0° → 45° → 90° → 135° → 180°), statt 180° vor ±90° anzubieten:
 *  1–3   Hand, Fuß und Unterarm gemischt, aufrecht und leicht schräg (bis ±45°), zwei Felder, LINKS links, RECHTS rechts
 *  4–6   ±90° (Stufe 5), ±135° (Stufe 6), Felder weiter kompatibel
 *  7–9   die zwei Felder vertauschen zufällig ihre Seiten (Wort lesen nötig), 180° ab Stufe 8
 *  10–12 vier Felder (OBEN/UNTEN nie richtig, Wörter gemischt), Antwortfrist weich 5,0 → 3,5 s
 */
import type { Rng } from '../../core/rng';
import { clamp, median } from '../../core/stats';

export type Part = 'hand' | 'foot' | 'forearm';
/** volar = Handfläche / Fußsohle (Unterarm: Innenseite), dorsal = Handrücken / Fußrücken (Unterarm: Außenseite) */
export type View = 'volar' | 'dorsal';
export type Side = 'left' | 'right';
/** Wort auf einem Antwortfeld: nur 'left' und 'right' sind je richtig */
export type Word = 'left' | 'right' | 'up' | 'down';

export const PARTS: readonly Part[] = ['hand', 'foot', 'forearm'];
export const VIEWS: readonly View[] = ['volar', 'dorsal'];
export const SIDES: readonly Side[] = ['left', 'right'];

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 12;
/** Durchgänge je Runde (Schnelltest: kürzer, aber gerade, damit links/rechts gleich oft vorkommen) */
export const TRIALS = 20;
export const QUICK_TRIALS = 4;
/** Antworten schneller als das nach Reizbeginn zählen nicht (Vorwegnehmen, kein Erkennen) */
export const MIN_RT_MS = 150;
/** Nach einer Antwort werden weitere Taps (Doppeltipp) so lange ignoriert */
export const DOUBLE_TAP_MS = 350;
/** Kleinste Maße der Antwortfelder in px (Touch-Ziel) */
export const MIN_FIELD_H = 72;
export const MIN_FIELD_W = 56;
/** Schriftgröße der Wörter auf den Feldern (px, fett) */
export const FIELD_FONT_PX = 30;
/** Höchstens so viele gleiche Seiten (oder gleiche Feldanordnungen) hintereinander */
export const MAX_RUN = 3;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

// ---------------------------------------------------------------------------
// Stufenfunktionen

/** Körperteile: von Anfang an gemischt – Hand, Fuß und Unterarm (wie im Vorlagevideo); die Stufe steigert Drehung und Felder */
export function partsFor(_level: number): Part[] {
  return ['hand', 'foot', 'forearm'];
}

/** Beträge der Drehwinkel je Stufe (0 und 180 nur einmal, alle anderen ±) */
const ANGLE_MAGNITUDES: readonly (readonly number[])[] = [
  [0, 15], // 1  aufrecht, leicht schräg
  [0, 15, 30], // 2
  [0, 15, 30, 45], // 3
  [0, 15, 45], // 4  neue Körperteile
  [0, 15, 45, 90], // 5  Vierteldrehung
  [0, 15, 45, 90, 135], // 6
  [0, 15, 45, 90, 135], // 7  Felder vertauscht
  [0, 15, 45, 90, 135, 180], // 8  auf den Kopf gestellt
  [0, 45, 90, 135, 180], // 9  kaum noch aufrecht
  [0, 45, 90, 135, 180], // 10 vier Felder
  [0, 45, 90, 135, 180], // 11
  [0, 45, 90, 135, 180], // 12
];

/** Alle Drehwinkel (Grad, Uhrzeigersinn positiv), die auf dieser Stufe vorkommen */
export function anglesFor(level: number): number[] {
  const out: number[] = [];
  for (const m of ANGLE_MAGNITUDES[levelOf(level) - 1]) {
    if (m === 0 || m === 180) out.push(m);
    else out.push(m, -m);
  }
  return out;
}

/** Anzahl der Antwortfelder: zwei bis Stufe 9, vier ab Stufe 10 */
export function fieldCountFor(level: number): 2 | 4 {
  return levelOf(level) >= 10 ? 4 : 2;
}

/** Ab dieser Stufe vertauschen die beiden Felder zufällig ihre Seiten */
export const SWAP_FROM = 7;
export const swapFor = (level: number): boolean => levelOf(level) >= SWAP_FROM && fieldCountFor(level) === 2;

/** Ob sich die Wörter von Durchgang zu Durchgang ändern (dann erscheinen sie erst mit dem Bild) */
export const arrangementVaries = (level: number): boolean => levelOf(level) >= SWAP_FROM;

/** Weiche Antwortfrist: 6,0 s bis Stufe 9, dann 5,0 / 4,2 / 3,5 s. Überschreiten = „zu langsam“ ohne Punktabzug. */
export function deadlineMs(level: number): number {
  const l = levelOf(level);
  return l <= 9 ? 6000 : l === 10 ? 5000 : l === 11 ? 4200 : 3500;
}

/** Aufrecht: höchstens 15° von der Senkrechten entfernt */
export const isUpright = (angle: number): boolean => Math.abs(normAngle(angle)) <= 15;
/** Deutlich gedreht: mindestens 90° */
export const isTurned = (angle: number): boolean => Math.abs(normAngle(angle)) >= 90;

/** Winkel in den Bereich (−180, 180] bringen */
export function normAngle(a: number): number {
  let r = ((a % 360) + 360) % 360;
  if (r > 180) r -= 360;
  return r;
}

// ---------------------------------------------------------------------------
// Durchgänge

/** Gleichmäßig verteilte Wahrheitswerte (genau n/2 mal true), nie mehr als maxRun gleiche hintereinander. */
export function balancedFlags(rng: Pick<Rng, 'next' | 'chance'>, n: number, maxRun: number = MAX_RUN): boolean[] {
  const total = Math.max(0, Math.floor(n));
  let remT = Math.floor(total / 2) + (total % 2 === 1 && rng.chance(0.5) ? 1 : 0);
  let remF = total - remT;
  const memo = new Map<string, boolean>();
  const feasible = (t: number, f: number, last: boolean | null, run: number): boolean => {
    if (t + f === 0) return true;
    const key = `${t}|${f}|${last}|${run}`;
    const hit = memo.get(key);
    if (hit !== undefined) return hit;
    let ok = false;
    for (const v of [true, false]) {
      if ((v ? t : f) <= 0) continue;
      const same = v === last;
      if (same && run >= maxRun) continue;
      if (feasible(v ? t - 1 : t, v ? f : f - 1, v, same ? run + 1 : 1)) {
        ok = true;
        break;
      }
    }
    memo.set(key, ok);
    return ok;
  };
  const out: boolean[] = [];
  let last: boolean | null = null;
  let run = 0;
  for (let i = 0; i < total; i++) {
    const allowed: boolean[] = [];
    for (const v of [true, false]) {
      if ((v ? remT : remF) <= 0) continue;
      const same = v === last;
      if (same && run >= maxRun) continue;
      if (feasible(v ? remT - 1 : remT, v ? remF : remF - 1, v, same ? run + 1 : 1)) allowed.push(v);
    }
    let v: boolean;
    if (allowed.length === 0) v = remT >= remF; // praktisch nie (nur bei maxRun < 1)
    else if (allowed.length === 1) v = allowed[0];
    else v = rng.next() < remT / (remT + remF);
    out.push(v);
    if (v) remT--;
    else remF--;
    run = v === last ? run + 1 : 1;
    last = v;
  }
  return out;
}

/** Seitenfolge einer Runde: links/rechts gleich oft, höchstens drei gleiche hintereinander */
export function planSides(rng: Pick<Rng, 'next' | 'chance'>, n: number): Side[] {
  return balancedFlags(rng, n, MAX_RUN).map((f) => (f ? 'right' : 'left'));
}

/** Zeichnung eines Durchgangs: Körperteil, Ansicht, Seite und Drehwinkel */
export interface Figure {
  part: Part;
  view: View;
  side: Side;
  /** Drehwinkel in Grad (Uhrzeigersinn positiv); ändert die Seite nie */
  angle: number;
}

export const sameDrawing = (a: Figure, b: Figure): boolean => a.part === b.part && a.view === b.view && a.side === b.side;

const countBy = <T>(items: readonly T[], pred: (x: T) => boolean): number => items.reduce((n, x) => (pred(x) ? n + 1 : n), 0);

/**
 * Wählt Körperteil, Ansicht und Drehwinkel für die vorgegebene Seite.
 * Gleich häufig: (Körperteil, Ansicht)-Paare und Winkel werden nach Häufigkeit in `history` (bisherige
 * Durchgänge der Runde) so gewählt, dass die am seltensten gezeigten zuerst drankommen; Gleichstand
 * entscheidet `rng`. Dieselbe Zeichnung (Teil + Ansicht + Seite) nie zweimal hintereinander.
 */
export function pickFigure(rng: Pick<Rng, 'int'>, level: number, side: Side, history: readonly Figure[]): Figure {
  const parts = partsFor(level);
  const angles = anglesFor(level);
  const last = history[history.length - 1];
  const combos: Array<{ part: Part; view: View }> = [];
  for (const part of parts) for (const view of VIEWS) combos.push({ part, view });

  const pickMin = <T>(items: readonly T[], score: (x: T) => [number, number]): T => {
    let best: T[] = [];
    let bestScore: [number, number] | null = null;
    for (const it of items) {
      const s = score(it);
      if (!bestScore || s[0] < bestScore[0] || (s[0] === bestScore[0] && s[1] < bestScore[1])) {
        best = [it];
        bestScore = s;
      } else if (s[0] === bestScore[0] && s[1] === bestScore[1]) best.push(it);
    }
    return best[rng.int(best.length)];
  };

  // Teil + Ansicht: nie dieselbe Zeichnung wie zuletzt; bevorzugt andere Kombination als zuletzt
  let allowed = combos.filter((c) => !(last && sameDrawing({ ...c, side, angle: 0 }, last)));
  if (!allowed.length) allowed = combos;
  const combo = pickMin(allowed, (c) => [
    countBy(history, (h) => h.part === c.part && h.view === c.view),
    countBy(history, (h) => h.part === c.part && h.view === c.view && h.side === side),
  ]);

  // Winkel: gleichmäßig; bevorzugt anderen Winkel als zuletzt
  let angleChoices = angles.filter((a) => !last || a !== last.angle);
  if (!angleChoices.length) angleChoices = angles;
  const angle = pickMin(angleChoices, (a) => [countBy(history, (h) => h.angle === a), countBy(history, (h) => h.angle === a && h.side === side)]);

  return { part: combo.part, view: combo.view, side, angle };
}

// ---------------------------------------------------------------------------
// Antwortfelder

/** Wörter in Zellenreihenfolge (Index = Zelle). Zwei Felder: [links, rechts]; vier: 2×2-Raster von links oben nach rechts unten. */
export type Arrangement = Word[];

export const REFERENCE_2: readonly Word[] = ['left', 'right'];
export const REFERENCE_4: readonly Word[] = ['left', 'right', 'up', 'down'];

const sameArrangement = (a: readonly Word[], b: readonly Word[] | undefined): boolean => !!b && a.length === b.length && a.every((w, i) => w === b[i]);

/**
 * Anordnung der Wörter für einen Durchgang.
 * - zwei Felder: kompatibel (LINKS links, RECHTS rechts) oder vertauscht (`swapped`)
 * - vier Felder: zufällig gemischt, nie wie die Grundanordnung und nie wie im Durchgang davor
 */
export function arrangementFor(rng: Pick<Rng, 'shuffle'>, fields: 2 | 4, swapped: boolean, prev?: readonly Word[]): Arrangement {
  if (fields === 2) return swapped ? ['right', 'left'] : ['left', 'right'];
  for (let i = 0; i < 40; i++) {
    const order = rng.shuffle([...REFERENCE_4]) as Word[];
    if (!sameArrangement(order, REFERENCE_4) && !sameArrangement(order, prev)) return order;
  }
  return ['right', 'left', 'down', 'up'];
}

export const wordOfSide = (side: Side): Word => side;

/** Zelle, die das richtige Wort trägt */
export function correctCell(arr: readonly Word[], side: Side): number {
  return arr.indexOf(wordOfSide(side));
}

/** Liegt das richtige Wort links (Zelle in der linken Spalte)? Für die Auswertung der Lage. */
export const cellIsLeft = (cell: number): boolean => cell % 2 === 0;

// ---------------------------------------------------------------------------
// Auswertung einer Antwort

export type Outcome = 'hit' | 'wrong' | 'slow';

export interface TrialRecord {
  angle: number;
  outcome: Outcome;
  /** Antwortzeit in ms (bei „slow“ die Frist) */
  rt: number;
  /** Falsch und das Wort der anderen Seite getippt (LINKS ↔ RECHTS) */
  swap: boolean;
}

/** Ergebnis eines Tipps auf das Feld mit dem Wort `tapped` bei richtiger Seite `side` */
export function judge(tapped: Word, side: Side): { outcome: 'hit' | 'wrong'; swap: boolean } {
  if (tapped === wordOfSide(side)) return { outcome: 'hit', swap: false };
  const other: Word = side === 'left' ? 'right' : 'left';
  return { outcome: 'wrong', swap: tapped === other };
}

/** Punkte je richtiger Antwort: Grundwert steigt mit der Stufe, Bonus für schnelle Antwort (nur Motivation) */
export function pointsFor(level: number, rtMs: number, deadline: number): number {
  const frac = deadline > 0 ? clamp(1 - rtMs / deadline, 0, 1) : 0;
  return 10 + 2 * (levelOf(level) - 1) + Math.round(frac * 10);
}

/** Pause nach dem Durchgang (ms): Rückmeldung bleibt kurz stehen, bei Fehlern etwas länger */
export function feedbackMs(outcome: Outcome): number {
  return outcome === 'hit' ? 800 : 1300;
}

/** Leere Pause vor dem nächsten Bild in ms (zufällig, damit der Takt nicht erratbar ist) */
export function gapMs(rng: Pick<Rng, 'range'>): number {
  return Math.round(rng.range(350, 650));
}

export interface Stats {
  trials: number;
  hits: number;
  wrong: number;
  slow: number;
  swaps: number;
  /** Anteil richtiger Antworten in % */
  accuracy: number;
  /** Median der Zeiten richtiger Antworten in ms (NaN ohne Treffer) */
  medianMs: number;
  /** Median bei aufrechten Bildern (≤ 15°) / bei gedrehten (≥ 90°); NaN bei weniger als 3 richtigen Antworten */
  uprightMs: number;
  turnedMs: number;
  /**
   * „Dreh-Aufschlag“: Median gedreht minus Median aufrecht in ms. Nur im Vergleich mit früher auf diesem Gerät
   * sinnvoll; null, wenn eine der beiden Gruppen weniger als 3 richtige Antworten hat.
   */
  rotationCostMs: number | null;
}

const MIN_GROUP = 3;

export function computeStats(records: readonly TrialRecord[]): Stats {
  const hitsRec = records.filter((r) => r.outcome === 'hit');
  const wrong = countBy(records, (r) => r.outcome === 'wrong');
  const slow = countBy(records, (r) => r.outcome === 'slow');
  const swaps = countBy(records, (r) => r.swap);
  const med = (arr: TrialRecord[]): number => (arr.length >= MIN_GROUP ? median(arr.map((r) => r.rt)) : NaN);
  const uprightMs = med(hitsRec.filter((r) => isUpright(r.angle)));
  const turnedMs = med(hitsRec.filter((r) => isTurned(r.angle)));
  const cost = Number.isFinite(uprightMs) && Number.isFinite(turnedMs) ? turnedMs - uprightMs : null;
  return {
    trials: records.length,
    hits: hitsRec.length,
    wrong,
    slow,
    swaps,
    accuracy: records.length ? (100 * hitsRec.length) / records.length : 0,
    medianMs: hitsRec.length ? median(hitsRec.map((r) => r.rt)) : NaN,
    uprightMs,
    turnedMs,
    rotationCostMs: cost,
  };
}

/** Schlüssel in texts.tips: swap | slow | turn | great */
export function tipFor(s: Stats): string {
  if (s.swaps >= 3 && s.swaps >= s.slow) return 'swap';
  if (s.slow >= 3) return 'slow';
  if (s.rotationCostMs !== null && s.rotationCostMs >= 600) return 'turn';
  return 'great';
}

// ---------------------------------------------------------------------------
// Anordnung auf der Bühne

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Layout {
  disc: { cx: number; cy: number; r: number };
  /** Antwortfelder (Index = Zelle) */
  fields: Rect[];
  /** Mitte der Rückmeldezeile zwischen Kreis und Feldern (0, wenn keine vorgesehen ist) */
  labelY: number;
  /** Wortgröße in den Feldern (px) */
  fontPx: number;
  gap: number;
}

export interface LayoutOptions {
  /** Platz unter den Feldern (Intro-Film: Bildunterschrift) */
  bottomReserve?: number;
  /** Intro-Film: kleinere Felder, keine Rückmeldezeile (die Bühne ist dort nur etwa 16:11 groß) */
  compact?: boolean;
}

/**
 * Kreis oben, Antwortfelder unten (zwei nebeneinander oder vier im 2×2-Raster). Felder mindestens
 * 72 px hoch und 56 px breit (außer im Intro-Film), Kreis so groß wie der freie Platz erlaubt.
 */
export function layoutFor(fields: 2 | 4, w: number, h: number, u: number, opts: LayoutOptions = {}): Layout {
  const compact = !!opts.compact;
  const gap = compact ? 8 : clamp(u * 2.2, 10, 22);
  const bottom = opts.bottomReserve ?? Math.max(14, u * 3);
  const rows = fields === 4 ? 2 : 1;
  const fieldH = compact ? clamp(h * 0.15, 38, 90) : clamp(h * (rows === 2 ? 0.085 : 0.1), MIN_FIELD_H, 120);
  const fieldW = Math.max(MIN_FIELD_W, Math.min((w * 0.95 - gap) / 2, compact ? w * 0.44 : 400));
  const rowsH = rows * fieldH + (rows - 1) * gap;
  const top0 = h - bottom - rowsH;
  const x0 = (w - (2 * fieldW + gap)) / 2;
  const rects: Rect[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < 2; col++) rects.push({ x: x0 + col * (fieldW + gap), y: top0 + row * (fieldH + gap), w: fieldW, h: fieldH });
  }
  const labelH = compact ? 0 : 44;
  const discTop = compact ? 6 : Math.max(12, u * 2.5);
  const discBottom = top0 - (compact ? gap : gap * 1.2) - labelH;
  const avail = Math.max(60, discBottom - discTop);
  const r = clamp(Math.min(avail / 2, w * 0.47, 290), 34, 290);
  const cy = discTop + avail / 2;
  const fontPx = compact ? clamp(fieldH * 0.42, 14, 34) : FIELD_FONT_PX;
  return {
    disc: { cx: w / 2, cy, r },
    fields: rects,
    labelY: compact ? 0 : (cy + r + top0) / 2,
    fontPx,
    gap,
  };
}
