/**
 * Hinter der Deckung – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Vier Deckungen (Kästen und Wände) stehen an wechselnden Plätzen auf der Bühne. Hinter einer
 * Kante schiebt sich kurz ein Kreis hervor und verschwindet wieder; man tippt ihn an. Die Stufe regelt,
 * wie lange er zu sehen ist und wie oft der Ort wechselt (statt am selben Platz wieder aufzutauchen).
 * Alle paar Ziele wird die Anordnung der Deckungen neu gewürfelt.
 */
import type { Rng } from '../../core/rng';
import { clamp, easeInOut, median } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 14;
/** Dauer des Hervorschiebens bzw. Zurückziehens (weich, mindestens 100 ms) */
export const SLIDE_MS = 200;
/** Kürzeste Gesamtdauer eines Ziels: je 200 ms Hervorschieben und Zurückziehen + 120 ms voll sichtbar */
export const MIN_VISIBLE_MS = 520;
/** So viele Ziele, dann wird die Anordnung der Deckungen neu gewürfelt */
export const ROUND_LEN = 6;
/** Tipps früher als das (ms nach Beginn) sind geraten und zählen nicht */
export const MIN_RT_MS = 120;
export const COVERS = 4;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Sichtzeit in ms: 1,6 s auf Stufe 1, 0,52 s auf Stufe 14 (geometrisch) */
export function visibleMs(level: number): number {
  const l = levelOf(level);
  return clamp(Math.round(1600 * Math.pow(MIN_VISIBLE_MS / 1600, (l - MIN_LEVEL) / (MAX_LEVEL - MIN_LEVEL))), MIN_VISIBLE_MS, 1600);
}

/** Wahrscheinlichkeit, dass das nächste Ziel an einem anderen Ort auftaucht: 25 % auf Stufe 1, 90 % auf Stufe 14 */
export function switchProb(level: number): number {
  return clamp(0.25 + 0.05 * (levelOf(level) - MIN_LEVEL), 0.25, 0.9);
}

/** Pause vor dem nächsten Ziel (ms): zufällig 700–1300 → der Zeitpunkt lässt sich nicht erraten */
export function gapMs(rng: Pick<Rng, 'range'>): number {
  return rng.range(700, 1300);
}

/** Weiches Hervorschieben (0 = ganz verdeckt, 1 = voll herausgeschoben): je ≥ 100 ms Übergang */
export function peekProgress(age: number, life: number, slide = SLIDE_MS): number {
  if (age < 0 || age >= life) return 0;
  return Math.min(easeInOut(age / slide), easeInOut((life - age) / slide));
}

/** Deckkraft des Ziels: blendet beim Hervorschieben weich ein (voll ab 40 % des Weges) */
export const peekAlpha = (progress: number): number => clamp(progress * 2.5, 0, 1);

export type CoverKind = 'box' | 'wall';
export type Side = 'L' | 'R' | 'T';

/** Deckung in Feldkoordinaten 0..1 (Mitte und Größe) */
export interface Cover {
  nx: number;
  ny: number;
  nw: number;
  nh: number;
  kind: CoverKind;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Spot {
  cover: number;
  side: Side;
  /** Lage an der Kante 0..1 (von oben bzw. links) */
  anchor: number;
}

/** Kästen (niedrig, breit) lassen das Ziel links, rechts oder oben hervor, Wände (hoch, schmal) nur seitlich */
export const sidesOf = (kind: CoverKind): Side[] => (kind === 'box' ? ['L', 'R', 'T'] : ['L', 'R']);

/** Abstand zweier Rechtecke entlang der Achsen: max(Lücke in x, Lücke in y), negativ bei Überlappung beider */
export function rectGap(a: Rect, b: Rect): number {
  const dx = Math.max(a.x - (b.x + b.w), b.x - (a.x + a.w));
  const dy = Math.max(a.y - (b.y + b.h), b.y - (a.y + a.h));
  return Math.max(dx, dy);
}

export function coverRect(c: Cover, fw: number, fh: number): Rect {
  const w = c.nw * fw;
  const h = c.nh * fh;
  return { x: c.nx * fw - w / 2, y: c.ny * fh - h / 2, w, h };
}

const toCover = (r: Rect, kind: CoverKind, fw: number, fh: number): Cover => ({
  nx: (r.x + r.w / 2) / fw,
  ny: (r.y + r.h / 2) / fh,
  nw: r.w / fw,
  nh: r.h / fh,
  kind,
});

/** Mindestlücke zwischen zwei Deckungen, damit ein hervorschauendes Ziel nie in die Nachbarin ragt */
export const minGap = (r: number): number => 3 * r;
/** Randabstand der Deckungen zum Feld: Platz zum Hervorschauen auf jeder Seite */
export const fieldMargin = (r: number): number => 2.4 * r;

/**
 * Anordnung würfeln: `count` Deckungen (Kasten oder Wand) ohne Überlappung, mit Mindestlücke
 * und Randabstand, in Feldgröße fw × fh px; r = Radius des Ziels in px. Passt das nicht, werden die
 * Deckungen kleiner (bis 80 %); hilft das nicht, gibt es ein festes Raster.
 */
export function layoutCovers(rng: Pick<Rng, 'range' | 'chance'>, fw: number, fh: number, r: number, count = COVERS): Cover[] {
  const m = fieldMargin(r);
  const g = minGap(r);
  const ax = m;
  const ay = m;
  const aw = Math.max(1, fw - 2 * m);
  const ah = Math.max(1, fh - 2 * m);
  const placed: Array<{ rect: Rect; kind: CoverKind }> = [];
  for (let attempt = 0; attempt < 400 && placed.length < count; attempt++) {
    const sc = 1 - 0.2 * Math.min(1, attempt / 300);
    const kind: CoverKind = rng.chance(0.5) ? 'box' : 'wall';
    const w = Math.min(aw, (kind === 'box' ? rng.range(4.2, 6) : rng.range(3, 3.8)) * r * sc);
    const h = Math.min(ah, (kind === 'box' ? rng.range(3.2, 4.4) : rng.range(5.5, 8)) * r * sc);
    const rect = { x: rng.range(ax, ax + aw - w), y: rng.range(ay, ay + ah - h), w, h };
    if (placed.every((p) => rectGap(rect, p.rect) >= g)) placed.push({ rect, kind });
  }
  if (placed.length >= Math.min(3, count)) return placed.map((p) => toCover(p.rect, p.kind, fw, fh));
  return gridCovers(fw, fh, r, count);
}

/** Notlösung für sehr kleine Felder: gleichmäßiges Raster aus gleich großen Kästen */
export function gridCovers(fw: number, fh: number, r: number, count = COVERS): Cover[] {
  const m = fieldMargin(r);
  const g = minGap(r);
  const cols = fw >= fh * 1.2 ? count : 2;
  const rows = Math.ceil(count / cols);
  const cw = Math.max(r * 2.4, (fw - 2 * m - (cols - 1) * g) / cols);
  const ch = Math.max(r * 2.4, (fh - 2 * m - (rows - 1) * g) / rows);
  const out: Cover[] = [];
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const w = Math.min(cw, r * 5);
    const h = Math.min(ch, r * 4);
    const cx = m + col * (cw + g) + cw / 2;
    const cy = m + row * (ch + g) + ch / 2;
    out.push(toCover({ x: cx - w / 2, y: cy - h / 2, w, h }, 'box', fw, fh));
  }
  return out;
}

export interface SpotPick {
  spot: Spot;
  /** first = erstes Ziel der Anordnung, same = gleicher Ort wie zuvor, new = anderer Ort */
  change: 'first' | 'same' | 'new';
}

/**
 * Nächster Ort: mit Wahrscheinlichkeit `switchP` bei einer anderen Deckung (Kante zufällig), sonst an
 * derselben Kante derselben Deckung (nur die Höhe bzw. Lage an der Kante ändert sich leicht).
 */
export function pickSpot(rng: Pick<Rng, 'range' | 'chance' | 'int'>, covers: readonly Cover[], last: Spot | null, switchP: number): SpotPick {
  const anchor = rng.range(0.3, 0.7);
  const n = covers.length;
  if (n === 0) return { spot: { cover: 0, side: 'L', anchor }, change: 'first' };
  if (!last || last.cover >= n) {
    const cover = rng.int(n);
    const sides = sidesOf(covers[cover].kind);
    return { spot: { cover, side: sides[rng.int(sides.length)], anchor }, change: 'first' };
  }
  if (n > 1 && rng.chance(switchP)) {
    let cover = rng.int(n - 1);
    if (cover >= last.cover) cover++;
    const sides = sidesOf(covers[cover].kind);
    return { spot: { cover, side: sides[rng.int(sides.length)], anchor }, change: 'new' };
  }
  return { spot: { cover: last.cover, side: last.side, anchor }, change: 'same' };
}

export interface PeekPoints {
  /** Mittelpunkt ganz verdeckt */
  hidden: { x: number; y: number };
  /** Mittelpunkt herausgeschoben (≈ 70 % des Kreises sichtbar) */
  shown: { x: number; y: number };
}

/** Wege des Ziels an einer Kante der Deckung `rect` (r = Radius des Ziels, Lage `anchor` 0..1 entlang der Kante) */
export function peekPoints(rect: Rect, side: Side, anchor: number, r: number): PeekPoints {
  const inward = r * 1.05;
  const outward = r * 0.55;
  if (side === 'T') {
    const x = rect.x + clamp(anchor * rect.w, Math.min(r, rect.w / 2), Math.max(rect.w - r, rect.w / 2));
    return { hidden: { x, y: rect.y + inward }, shown: { x, y: rect.y - outward } };
  }
  const y = rect.y + clamp(anchor * rect.h, Math.min(r, rect.h / 2), Math.max(rect.h - r, rect.h / 2));
  if (side === 'L') return { hidden: { x: rect.x + inward, y }, shown: { x: rect.x - outward, y } };
  return { hidden: { x: rect.x + rect.w - inward, y }, shown: { x: rect.x + rect.w + outward, y } };
}

/** Trefferradius in px: größer als das sichtbare Ziel, nie unter 24 px */
export const hitRadiusPx = (r: number): number => Math.max(r * 1.25, 24);

/** Punkte je Treffer: Grundwert steigt mit der Stufe, Bonus für schnelles Tippen */
export function pointsFor(level: number, ms: number, life: number): number {
  return 10 + 2 * (levelOf(level) - 1) + Math.round(clamp(1 - ms / life, 0, 1) * 10);
}

export interface HitSample {
  ms: number;
  /** true: anderer Ort als beim Ziel davor; false: gleicher Ort */
  changed: boolean;
}

export interface Stats {
  medianMs: number;
  /** Median bei Ortswechsel bzw. gleichem Ort; NaN, wenn weniger als `minPerGroup` Werte */
  medianChanged: number;
  medianSame: number;
  hits: number;
  wrong: number;
  missed: number;
  /** Trefferquote in % (0 ohne Ziele) */
  accuracy: number;
}

export function computeStats(hits: readonly HitSample[], wrong: number, missed: number, minPerGroup = 3): Stats {
  const ch = hits.filter((h) => h.changed).map((h) => h.ms);
  const same = hits.filter((h) => !h.changed).map((h) => h.ms);
  const total = hits.length + wrong + missed;
  return {
    medianMs: median(hits.map((h) => h.ms)),
    medianChanged: ch.length >= minPerGroup ? median(ch) : NaN,
    medianSame: same.length >= minPerGroup ? median(same) : NaN,
    hits: hits.length,
    wrong,
    missed,
    accuracy: total ? (100 * hits.length) / total : 0,
  };
}

/** Ab diesem Unterschied (ms) lohnt der Hinweis „bei neuem Ort langsamer“ */
export const CHANGE_TIP_MS = 120;

/** Schlüssel in texts.tips: wrong | slow | change | great */
export function tipFor(s: Stats): string {
  if (s.wrong >= 3 && s.wrong >= s.missed) return 'wrong';
  if (s.missed >= 3) return 'slow';
  if (Number.isFinite(s.medianChanged) && Number.isFinite(s.medianSame) && s.medianChanged - s.medianSame > CHANGE_TIP_MS) return 'change';
  return 'great';
}
