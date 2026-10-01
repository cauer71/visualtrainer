/**
 * Zahlen-Buchstaben-Wirbel – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Zahlen und Buchstaben treiben langsam über die Fläche. Man tippt sie abwechselnd in aufsteigender
 * Folge an: 1 – A – 2 – B – 3 – C … (Zahl n gehört zum n-ten Buchstaben).
 *
 * Grundlagen (für die Kommentare; Quellen sind im Katalog / in science.ts geprüft):
 * - Wechsel zwischen zwei Folgen (Zahl ↔ Buchstabe) ist das Prinzip des Trail Making Test B
 *   (Reitan, 1958). Die B-Zeit hängt nach Sánchez-Cubillo et al. (2009) vor allem am
 *   Arbeitsgedächtnis und erst danach am Aufgabenwechsel, Teil A vor allem an der Wahrnehmung;
 *   nach Salthouse (2011) spiegelt Trail Making vor allem Verarbeitungstempo wider.
 * - Bewegung und Überlappung der Zeichen erschweren die visuelle Suche (Verdeckung, Crowding:
 *   Whitney & Levi, 2011). Die Dichte ist deshalb ein eigener Schwierigkeitsregler: mit der Stufe
 *   wird die Spielfläche kleiner, der Mindestabstand zwischen den Zeichen kleiner, und immer mehr
 *   Zeichen wandern in Paaren, die sich dauerhaft teilweise überdecken (wie im Vorlagevideo, wo
 *   dieselben Paare – „13“ über „10“, „G“ und „O“ – über viele Bilder übereinander blieben).
 * - Bei Trail-Making-Aufgaben ist die Dauer die übliche Messgröße. Wir nennen keine Normen:
 *   Hauptwert ist die Stufe; die Zeit je Zeichen taugt nur zum Vergleich mit früher auf demselben
 *   Gerät (Übungseffekte sind groß: Buck et al., 2008).
 *
 * ANNAHME (Hypothese): Die Vorlage – ein Video einer Trainingssoftware – zeigt nur treibende Zahlen
 * (5–14) und Buchstaben (E–P) ohne Antippen und ohne Regel. Dass hier die Folge Zahl–Buchstabe
 * abwechselnd (5–E–6–F …) gefragt ist, ist unsere Vermutung in Anlehnung an Trail Making B.
 *
 * Alle Zufälle laufen über den übergebenen Rng, alle Bewegungen sind mit dt gerechnet.
 */
import type { Rng } from '../../core/rng';
import { clamp, median } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 12;

/** Farben (hell wie im Vorlagevideo, Zeichen dunkelgrau); Kontraste sind im Test gemessen */
export const PALETTE = {
  /** Grund in der Mitte / am Rand */
  bgCenter: '#F6F8FA',
  bgEdge: '#D3D9E2',
  /** Zeichen */
  ink: '#262B33',
  /** Akzent (Anzeige „Als Nächstes“, Punkt an getippten Zeichen) */
  accent: '#6D4C8C',
  /** Beschriftung auf der weißen Anzeige */
  label: '#374151',
  ok: '#15803D',
  bad: '#B45309',
} as const;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

// ---------------------------------------------------------------------------
// Stufen

/** Anzahl Paare (Zahl + Buchstabe) je Stufe: 3 → 9, also 6 → 18 Zeichen */
const PAIRS = [3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9] as const;
/** Buchstaben der Folge: A–I sind im deutschen und im italienischen Alphabet gleich */
export const LETTERS = 'ABCDEFGHI';
export const MAX_PAIRS = LETTERS.length;

export const pairsFor = (level: number): number => PAIRS[levelOf(level) - 1];
export const charsFor = (level: number): number => 2 * pairsFor(level);

/**
 * Drifttempo in u/s (1 u = 1 % der kürzeren Bühnenseite, also % der Seitenlänge je Sekunde):
 * Stufe 1–2 stehend, Stufe 3 → 3 %/s, Stufe 12 → 9 %/s.
 */
export function speedFor(level: number): number {
  const L = levelOf(level);
  return L <= 2 ? 0 : 3 + ((L - 3) * 6) / 9;
}

/**
 * Mindestabstand zwischen zwei Zeichen als Anteil der Zeichengröße: ≥ 1 heißt „berühren sich nie“,
 * darunter dürfen sie sich überlappen (0,45 = höchstens etwa die Hälfte).
 */
const SEP = [1.3, 1.3, 1.0, 1.0, 1.0, 0.85, 0.75, 0.65, 0.58, 0.52, 0.48, 0.45] as const;
export const separationFor = (level: number): number => SEP[levelOf(level) - 1];

/**
 * Spielfläche je Zeichen in Vielfachen von F² (F = Schriftgröße): je kleiner, desto dichter.
 * Gemessen an der Zeichengröße, damit Handy und Tablet gleich eng werden (nicht gleich viel Prozent
 * der Bühne). Auf dem Tablet quer entspricht das 100 % der Spielfläche bei Stufe 1 und 50 % bei Stufe 12.
 */
const AREA_PER_CHAR = [58, 44, 41.5, 31.5, 30, 23.5, 22, 17.5, 16.5, 13.5, 12, 9.7] as const;
export const areaPerCharFor = (level: number): number => AREA_PER_CHAR[levelOf(level) - 1];

/** Anteil des Spielfelds, auf dem sich die Zeichen bewegen (0,3–1), bei `area` px² je F² und Zeichen */
export function arenaFraction(area: number, chars: number, F: number, fieldArea: number): number {
  return clamp((area * chars * F * F) / Math.max(1, fieldArea), 0.3, 1);
}
export const arenaFractionFor = (level: number, F: number, fieldArea: number): number => arenaFraction(areaPerCharFor(level), charsFor(level), F, fieldArea);

/** Anzahl Paare, die dauerhaft teilweise übereinander wandern (ab Stufe 6) */
const BONDS = [0, 0, 0, 0, 0, 1, 1, 2, 3, 3, 4, 5] as const;
export const bondsFor = (level: number): number => BONDS[levelOf(level) - 1];

/**
 * Versatz eines überdeckten Paares in x als Anteil der Summe der halben Zeichenbreiten:
 * 1 = berühren sich gerade, kleiner = stärkere Überdeckung. Mindestens 0,45, damit beide Zeichen
 * noch zur Hälfte lesbar bleiben.
 */
const BOND_DEPTH = [1, 1, 1, 1, 1, 0.85, 0.8, 0.75, 0.7, 0.62, 0.55, 0.5] as const;
export const bondDepthFor = (level: number): number => BOND_DEPTH[levelOf(level) - 1];

/** Zeit je Zeichen in ms, bis zu der eine Runde als geschafft zählt: 3,6 s − 0,15 s · Stufe, mindestens 1,8 s */
export const limitPerCharMs = (level: number): number => Math.max(1800, 3600 - 150 * levelOf(level));

/** Geschafft = höchstens ein Fehltipp und im Zeitrahmen. Alles andere macht die nächste Runde leichter. */
export function roundSuccess(errors: number, totalMs: number, chars: number, level: number): boolean {
  return errors <= 1 && totalMs / Math.max(1, chars) <= limitPerCharMs(level);
}

// ---------------------------------------------------------------------------
// Folge

/** Beschriftung an Position k der Folge: 0 → „1“, 1 → „A“, 2 → „2“, 3 → „B“ … */
export function labelAt(k: number): string {
  return k % 2 === 0 ? String(k / 2 + 1) : LETTERS[(k - 1) / 2];
}

export const isLetterAt = (k: number): boolean => k % 2 === 1;

export function sequence(pairs: number): string[] {
  const n = clamp(Math.round(pairs), 1, MAX_PAIRS);
  return Array.from({ length: 2 * n }, (_, k) => labelAt(k));
}

// ---------------------------------------------------------------------------
// Geometrie

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Schriftgröße der Zeichen in px: mindestens 34 px (Handy), auf dem Tablet ≈ 50 px – die Ziffernhöhe
 * liegt damit bei etwa 1° aus 40 cm (Empfehlung im Dokument zur Zahlenjagd: ≥ 1°).
 */
export const glyphPx = (u: number): number => clamp(6.2 * u, 34, 72);

/** Mindest-Halbmaß der Trefferfläche: 30 px → mindestens 60 × 60 px (gefordert ≥ 56 px) */
export const HIT_MIN = 30;
const HIT_PAD = 14;

export interface Half {
  hw: number;
  hh: number;
}

/** Sichtbares Halbmaß eines Zeichens (Näherung für fette Systemschrift) in px */
export function visibleHalf(label: string, F: number): Half {
  const n = label.length;
  const letter = /^[A-Z]$/.test(label);
  return { hw: F * (letter ? 0.36 : n === 1 ? 0.3 : 0.3 * n - 0.02), hh: F * 0.38 };
}

/** Halbmaß der Trefferfläche: etwas größer als das Zeichen, nie unter HIT_MIN */
export function hitHalf(vis: Half): { hx: number; hy: number } {
  return { hx: Math.max(HIT_MIN, vis.hw + HIT_PAD), hy: Math.max(HIT_MIN, vis.hh + HIT_PAD) };
}

export interface FieldGeom {
  /** Platz der Anzeige „Als Nächstes“ */
  pill: Rect;
  /** Spielfeld darunter */
  field: Rect;
}

/**
 * Aufteilung der Bühne: oben die Anzeige, darunter das Spielfeld. `bottom` ist die Unterkante des
 * Spielfelds (im Intro-Film bleibt unten Platz für Hand und Bildunterschrift).
 */
export function fieldGeometry(w: number, h: number, u: number, bottom: number): FieldGeom {
  const m = Math.max(8, u * 1.6);
  const pillH = Math.max(54, u * 8);
  const top = m + pillH + Math.max(8, u * 1.4);
  return {
    pill: { x: m, y: m, w: Math.max(40, w - 2 * m), h: pillH },
    field: { x: m, y: top, w: Math.max(40, w - 2 * m), h: Math.max(40, Math.min(h - m, bottom) - top) },
  };
}

/** Spielfläche der Zeichen: um die Mitte des Spielfelds verkleinert (Fläche = Anteil · Spielfeld) */
export function arenaRect(field: Rect, fraction: number): Rect {
  const s = Math.sqrt(clamp(fraction, 0.05, 1));
  const w = field.w * s;
  const h = field.h * s;
  return { x: field.x + (field.w - w) / 2, y: field.y + (field.h - h) / 2, w, h };
}

// ---------------------------------------------------------------------------
// Bewegung

export interface Mover {
  x: number;
  y: number;
  /** Bewegungsrichtung in rad */
  ang: number;
  /** Drehrate in rad/s (langsam schwankend → weiche Kurven) */
  turn: number;
  /** Tempo in px/s (0 = stehend) */
  v: number;
  hw: number;
  hh: number;
}

/** Wie schnell sich überlappende Zeichen weich auseinanderschieben dürfen (px/s) */
export const PUSH_PX_S = 120;
const TURN_TAU = 1.6;
const TURN_SIGMA = 0.22;
const TURN_MAX = 0.8;
const BOUNCE_JITTER = 0.17;

type R = Pick<Rng, 'next' | 'range' | 'normal' | 'shuffle'>;

/** Bereich, in dem die Mitte eines Zeichens liegen darf (Zeichen bleibt ganz in der Spielfläche) */
export function centerRange(a: Rect, m: Pick<Mover, 'hw' | 'hh'>): { minX: number; maxX: number; minY: number; maxY: number } {
  let minX = a.x + m.hw;
  let maxX = a.x + a.w - m.hw;
  let minY = a.y + m.hh;
  let maxY = a.y + a.h - m.hh;
  if (maxX < minX) minX = maxX = a.x + a.w / 2;
  if (maxY < minY) minY = maxY = a.y + a.h / 2;
  return { minX, maxX, minY, maxY };
}

function clampInto(a: Rect, m: Mover): void {
  const r = centerRange(a, m);
  m.x = clamp(m.x, r.minX, r.maxX);
  m.y = clamp(m.y, r.minY, r.maxY);
}

/** Überdeckung zweier Zeichen in x und y (positiv = die um `sep` skalierten Kästen überlappen) */
export function overlapOf(a: Mover, b: Mover, sep: number): { ox: number; oy: number } {
  return {
    ox: (a.hw + b.hw) * sep - Math.abs(b.x - a.x),
    oy: (a.hh + b.hh) * sep - Math.abs(b.y - a.y),
  };
}

/** Weniger als `sep` voneinander entfernt? Dann: harte Trennung (nur für die Startaufstellung) */
function relaxHard(items: Mover[], arena: Rect, sep: number, rounds = 90): void {
  for (let it = 0; it < rounds; it++) {
    let moved = false;
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i];
        const b = items[j];
        const { ox, oy } = overlapOf(a, b, sep);
        if (ox <= 0 || oy <= 0) continue;
        moved = true;
        if (ox <= oy) {
          const s = (b.x >= a.x ? 1 : -1) * (ox / 2 + 0.01);
          a.x -= s;
          b.x += s;
        } else {
          const s = (b.y >= a.y ? 1 : -1) * (oy / 2 + 0.01);
          a.y -= s;
          b.y += s;
        }
      }
    }
    for (const m of items) clampInto(arena, m);
    if (!moved) return;
  }
}

/**
 * Startaufstellung: gleichmäßig über die Spielfläche verteilt (Raster mit zufälliger Zuordnung und
 * Versatz), danach so weit auseinandergeschoben, wie es der Mindestabstand der Stufe verlangt.
 * Die Richtungen sind gleichmäßig über den Kreis verteilt und zufällig zugeordnet.
 */
export function placeItems(items: Mover[], arena: Rect, sep: number, rng: R): void {
  const n = items.length;
  if (!n) return;
  const aspect = arena.w / Math.max(1, arena.h);
  const cols = Math.max(1, Math.round(Math.sqrt(n * aspect)));
  const rows = Math.max(1, Math.ceil(n / cols));
  const cells = rng.shuffle(Array.from({ length: cols * rows }, (_, i) => i)).slice(0, n);
  const cw = arena.w / cols;
  const ch = arena.h / rows;
  const dirs = rng.shuffle(Array.from({ length: n }, (_, i) => (i / n) * Math.PI * 2));
  const phase = rng.range(0, Math.PI * 2);
  items.forEach((m, i) => {
    const c = cells[i];
    m.x = arena.x + ((c % cols) + 0.5 + rng.range(-0.38, 0.38)) * cw;
    m.y = arena.y + (Math.floor(c / cols) + 0.5 + rng.range(-0.38, 0.38)) * ch;
    m.ang = dirs[i] + phase + rng.range(-0.25, 0.25);
    m.turn = 0;
    clampInto(arena, m);
  });
  relaxHard(items, arena, sep);
}

// ---------------------------------------------------------------------------
// Körper: einzelne Zeichen oder Paare, die sich als Ganzes bewegen

/** Wo ein Zeichen im Körper sitzt (Versatz zur Körpermitte in px) */
export interface Member {
  body: number;
  ox: number;
  oy: number;
}

/**
 * Teilt Zeichen in Körper auf: `bonds` zufällige Paare sitzen teilweise übereinander (Versatz in x =
 * depthX · Summe der halben Breiten, in y 25–95 % der Summe der halben Höhen) und bewegen sich wie
 * ein Stück, die übrigen Zeichen sind einzeln. Rückgabe: Körper (Tempo noch 0) und je Zeichen sein Sitz.
 */
export function buildBodies(halves: readonly Half[], bonds: number, depthX: number, rng: R): { bodies: Mover[]; members: Member[] } {
  const n = halves.length;
  const order = rng.shuffle(Array.from({ length: n }, (_, i) => i));
  const nb = clamp(Math.floor(bonds), 0, Math.floor(n / 2));
  const bodies: Mover[] = [];
  const members: Member[] = new Array(n);
  const mk = (hw: number, hh: number): Mover => ({ x: 0, y: 0, ang: 0, turn: 0, v: 0, hw, hh });
  for (let b = 0; b < nb; b++) {
    const i = order[2 * b];
    const j = order[2 * b + 1];
    const A = halves[i];
    const B = halves[j];
    const dx = (rng.next() < 0.5 ? -1 : 1) * depthX * (A.hw + B.hw);
    const dy = (rng.next() < 0.5 ? -1 : 1) * rng.range(0.25, 0.95) * (A.hh + B.hh);
    // Körpermitte = Mitte des gemeinsamen Kastens
    const minX = Math.min(-dx / 2 - A.hw, dx / 2 - B.hw);
    const maxX = Math.max(-dx / 2 + A.hw, dx / 2 + B.hw);
    const minY = Math.min(-dy / 2 - A.hh, dy / 2 - B.hh);
    const maxY = Math.max(-dy / 2 + A.hh, dy / 2 + B.hh);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    members[i] = { body: bodies.length, ox: -dx / 2 - cx, oy: -dy / 2 - cy };
    members[j] = { body: bodies.length, ox: dx / 2 - cx, oy: dy / 2 - cy };
    bodies.push(mk((maxX - minX) / 2, (maxY - minY) / 2));
  }
  for (let q = 2 * nb; q < n; q++) {
    const i = order[q];
    members[i] = { body: bodies.length, ox: 0, oy: 0 };
    bodies.push(mk(halves[i].hw, halves[i].hh));
  }
  return { bodies, members };
}

/** Mitte des Zeichens, das auf `m` sitzt, wenn der Körper bei (x, y) steht */
export const seatAt = (m: Member, x: number, y: number): { x: number; y: number } => ({ x: x + m.ox, y: y + m.oy });

/** Dreieckswelle: bildet einen geradlinig weitergedachten Weg zwischen zwei Wänden ab */
export function fold(p: number, lo: number, hi: number): number {
  if (hi <= lo) return lo;
  const span = hi - lo;
  let q = (p - lo) % (2 * span);
  if (q < 0) q += 2 * span;
  return lo + (q <= span ? q : 2 * span - q);
}

/** Wo das Zeichen nach `seconds` steht, wenn es geradeaus weiterwandert und an den Wänden abprallt */
export function predict(m: Mover, arena: Rect, seconds: number): { x: number; y: number } {
  const r = centerRange(arena, m);
  return {
    x: fold(m.x + Math.cos(m.ang) * m.v * seconds, r.minX, r.maxX),
    y: fold(m.y + Math.sin(m.ang) * m.v * seconds, r.minY, r.maxY),
  };
}

function wallBounce(m: Mover, arena: Rect, rng: R): void {
  const r = centerRange(arena, m);
  let vx = Math.cos(m.ang);
  let vy = Math.sin(m.ang);
  let hit = false;
  if (m.x < r.minX) {
    m.x = Math.min(r.maxX, 2 * r.minX - m.x);
    vx = Math.abs(vx);
    hit = true;
  } else if (m.x > r.maxX) {
    m.x = Math.max(r.minX, 2 * r.maxX - m.x);
    vx = -Math.abs(vx);
    hit = true;
  }
  if (m.y < r.minY) {
    m.y = Math.min(r.maxY, 2 * r.minY - m.y);
    vy = Math.abs(vy);
    hit = true;
  } else if (m.y > r.maxY) {
    m.y = Math.max(r.minY, 2 * r.maxY - m.y);
    vy = -Math.abs(vy);
    hit = true;
  }
  if (!hit) return;
  // Abprall mit leichter Richtungsänderung, aber immer von der Wand weg
  let a = Math.atan2(vy, vx) + rng.range(-BOUNCE_JITTER, BOUNCE_JITTER);
  let cx = Math.cos(a);
  let cy = Math.sin(a);
  if (m.x <= r.minX + 0.5) cx = Math.abs(cx);
  if (m.x >= r.maxX - 0.5) cx = -Math.abs(cx);
  if (m.y <= r.minY + 0.5) cy = Math.abs(cy);
  if (m.y >= r.maxY - 0.5) cy = -Math.abs(cy);
  a = Math.atan2(cy, cx);
  m.ang = a;
  m.turn = -m.turn * 0.5;
}

/** Zeichen, die sich zu nah kommen, weich (mit höchstens PUSH_PX_S) auseinanderschieben und abprallen lassen */
function pushApart(items: Mover[], sep: number, dt: number, arena: Rect): void {
  const maxStep = PUSH_PX_S * dt;
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i];
      const b = items[j];
      const { ox, oy } = overlapOf(a, b, sep);
      if (ox <= 0 || oy <= 0) continue;
      const alongX = ox <= oy;
      const d = alongX ? b.x - a.x : b.y - a.y;
      const sgn = d > 0 ? 1 : d < 0 ? -1 : (i + j) % 2 === 0 ? 1 : -1;
      const step = Math.min(alongX ? ox : oy, maxStep) / 2;
      if (alongX) {
        a.x -= sgn * step;
        b.x += sgn * step;
      } else {
        a.y -= sgn * step;
        b.y += sgn * step;
      }
      // Bewegen sie sich aufeinander zu, tauschen sie die Geschwindigkeitsanteile entlang der Achse
      const avx = Math.cos(a.ang) * a.v;
      const avy = Math.sin(a.ang) * a.v;
      const bvx = Math.cos(b.ang) * b.v;
      const bvy = Math.sin(b.ang) * b.v;
      if (alongX ? (avx - bvx) * sgn > 0 : (avy - bvy) * sgn > 0) {
        if (alongX) {
          if (a.v > 0) a.ang = Math.atan2(avy, bvx);
          if (b.v > 0) b.ang = Math.atan2(bvy, avx);
        } else {
          if (a.v > 0) a.ang = Math.atan2(bvy, avx);
          if (b.v > 0) b.ang = Math.atan2(avy, bvx);
        }
      }
    }
  }
  for (const m of items) clampInto(arena, m);
}

/**
 * Ein Zeitschritt der Drift. Stehende Zeichen (v = 0) bleiben unverändert. Alles mit dt gerechnet,
 * also gleich schnell auf 60- und 120-Hz-Geräten.
 */
export function stepDrift(items: Mover[], dt: number, arena: Rect, sep: number, rng: R): void {
  let moving = false;
  for (const m of items) {
    if (m.v <= 0) continue;
    moving = true;
    m.turn += (-m.turn / TURN_TAU) * dt + TURN_SIGMA * Math.sqrt((2 / TURN_TAU) * dt) * rng.normal();
    m.turn = clamp(m.turn, -TURN_MAX, TURN_MAX);
    m.ang += m.turn * dt;
    m.x += Math.cos(m.ang) * m.v * dt;
    m.y += Math.sin(m.ang) * m.v * dt;
    wallBounce(m, arena, rng);
  }
  if (moving) pushApart(items, sep, dt, arena);
}

// ---------------------------------------------------------------------------
// Antippen

export interface Hittable {
  x: number;
  y: number;
  hx: number;
  hy: number;
  done: boolean;
  /** Position in der Folge */
  k: number;
}

export type TapResult = { kind: 'target'; i: number } | { kind: 'wrong'; i: number } | { kind: 'old'; i: number } | { kind: 'none' };

/**
 * Welches Zeichen ist gemeint? Liegen mehrere unter dem Finger, hat das gesuchte Vorrang
 * (Fairness bei Überlappung); sonst zählt das nächste ungetippte, das den Punkt trifft.
 * Schon getippte Zeichen werden ignoriert („old“); daneben = „none“.
 */
export function pickTap(items: readonly Hittable[], px: number, py: number, next: number): TapResult {
  let wrong = -1;
  let wrongD = Infinity;
  let old = -1;
  for (let i = 0; i < items.length; i++) {
    const m = items[i];
    const dx = px - m.x;
    const dy = py - m.y;
    if (Math.abs(dx) > m.hx || Math.abs(dy) > m.hy) continue;
    if (m.done) {
      old = i;
      continue;
    }
    if (m.k === next) return { kind: 'target', i };
    const d = (dx / m.hx) ** 2 + (dy / m.hy) ** 2;
    if (d < wrongD) {
      wrongD = d;
      wrong = i;
    }
  }
  if (wrong >= 0) return { kind: 'wrong', i: wrong };
  if (old >= 0) return { kind: 'old', i: old };
  return { kind: 'none' };
}

// ---------------------------------------------------------------------------
// Auswertung

export interface RoundRecord {
  level: number;
  pairs: number;
  chars: number;
  /** Dauer von der Anzeige bis zum letzten richtigen Tipp (ms) */
  ms: number;
  errors: number;
  success: boolean;
  /** Zeit je richtigem Tipp (ms) in Reihenfolge der Folge; Index k = Zeit bis zum k-ten Zeichen */
  steps: number[];
}

export interface Summary {
  rounds: number;
  errors: number;
  /** Ø Zeit je Zeichen über alle Runden in ms (NaN ohne Runde) */
  perCharMs: number;
  /** Höchste Stufe mit geschaffter Runde (0 = keine) */
  bestLevel: number;
  /** Paare der letzten Runde (0 = keine) */
  lastPairs: number;
  /** Mehrzeit für Buchstaben: Median Zeit zum Buchstaben minus Median Zeit zur Zahl in ms (NaN bei zu wenig Werten) */
  letterGapMs: number;
  /** Runden, in denen die Zeit je Zeichen über der Grenze lag */
  slowRounds: number;
  /** Niedrigste gespielte Stufe */
  minLevel: number;
}

/** Mindestanzahl Zeiten je Gruppe, damit die Mehrzeit für Buchstaben angezeigt wird */
export const MIN_GAP_SAMPLES = 5;

export function summarize(rounds: readonly RoundRecord[]): Summary {
  const chars = rounds.reduce((s, r) => s + r.chars, 0);
  const ms = rounds.reduce((s, r) => s + r.ms, 0);
  const letters: number[] = [];
  const numbers: number[] = [];
  for (const r of rounds) {
    r.steps.forEach((t, k) => {
      if (k === 0) return; // die Suche nach der „1“ enthält das erste Orientieren
      (isLetterAt(k) ? letters : numbers).push(t);
    });
  }
  const gap = letters.length >= MIN_GAP_SAMPLES && numbers.length >= MIN_GAP_SAMPLES ? median(letters) - median(numbers) : NaN;
  const ok = rounds.filter((r) => r.success);
  return {
    rounds: rounds.length,
    errors: rounds.reduce((s, r) => s + r.errors, 0),
    perCharMs: chars > 0 ? ms / chars : NaN,
    bestLevel: ok.length ? Math.max(...ok.map((r) => r.level)) : 0,
    lastPairs: rounds.length ? rounds[rounds.length - 1].pairs : 0,
    letterGapMs: gap,
    slowRounds: rounds.filter((r) => r.ms / Math.max(1, r.chars) > limitPerCharMs(r.level)).length,
    minLevel: rounds.length ? Math.min(...rounds.map((r) => r.level)) : MIN_LEVEL,
  };
}

/** Hauptwert: höchste Stufe mit geschaffter Runde; ohne geschaffte Runde eine unter der niedrigsten gespielten */
export function primaryLevel(s: Summary): number {
  return s.bestLevel > 0 ? s.bestLevel : clamp(s.minLevel - 1, MIN_LEVEL, MAX_LEVEL);
}

/** Startstufe der nächsten Sitzung: dort, wo man zuletzt eine Runde geschafft hat */
export const nextLevel = primaryLevel;

/** Schlüssel in texts.tips: errors | letters | slow | great */
export function tipFor(s: Summary): string {
  if (s.errors >= 3 && s.errors >= 1.5 * s.rounds) return 'errors';
  if (Number.isFinite(s.letterGapMs) && s.letterGapMs > 500) return 'letters';
  if (s.rounds >= 1 && s.slowRounds >= Math.ceil(s.rounds / 2)) return 'slow';
  return 'great';
}

/** Punkte für ein richtig getipptes Zeichen */
export const tapPoints = (level: number): number => 2 + levelOf(level);
/** Bonus für eine geschaffte Runde */
export const roundBonus = (level: number, success: boolean): number => (success ? 10 * levelOf(level) : 0);
