/**
 * Suchbild – visuelle Suche: ein Zielzeichen zwischen vielen ähnlichen finden.
 *
 * Verbesserungen gegenüber dem Vorbild (feste 96 Felder, keine Anpassung):
 * - Die bekannten Stellschrauben der Suchschwierigkeit passen sich an:
 *   Anzahl der Zeichen (12 → 56), Ähnlichkeit von Ziel und Ablenkern und der Abstand
 *   (Mitte zu Mitte 2,0 → 1,3 × Elementhöhe, Touch-Zelle aber immer ≥ 48 px).
 * - Suchasymmetrie genutzt: C zwischen O ist die leichte Richtung (Lücke = zusätzliches Merkmal),
 *   O zwischen C die schwere. C und O werden als Ringe gezeichnet (Strich 1/6 des Durchmessers),
 *   damit die Lückengröße (30 % → 20 % → 12 %) steuerbar ist.
 * - Erfolg = gefunden innerhalb von 1,2 s + 75 ms pro Zeichen; 2-down/1-up-Treppe (≈ 71 %).
 * - Buchstaben werden nach ihrer sichtbaren „Tinte“ zentriert und um diese Mitte gedreht:
 *   b/d/p/q verraten sich nicht durch Ober- oder Unterlängen.
 * - Doppel-Tipps (< 150 ms) werden ignoriert; Fehltipps kosten nichts, werden aber gezählt.
 */
import { background, C, fillRR, font, glow, ring, rrPath, text, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut, mean, median } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo, ToastKind } from '../../core/types';
import { de, it } from './texts';

const SESSION_MS = 50_000;
const QUICK_SESSION_MS = 10_000;
const TIMEOUT_MS = 12_000;
const FOUND_MS = 350;
const REVEAL_MS = 1300;
const WRONG_MS = 420;
const DOUBLE_TAP_MS = 150;
const DEMO_END_MS = 2300;
const MAX_LEVEL = 12;
/** Höchstens dieser Anteil der Rasterzellen wird belegt */
const MAX_FILL = 0.8;
const WEIGHT = 800;

/** Ein Suchzeichen: Buchstabe/Ziffer aus der Schrift oder selbst gezeichneter Ring (O bzw. C mit Lücke) */
type Shape = { kind: 'char'; ch: string } | { kind: 'ring'; gap: number };
/** Drehung: keine, Vierteldrehungen (0/90/180/270°) oder beliebig (Lückenrichtung der C) */
type Turn = 'none' | 'quarter' | 'free';

interface SearchSet {
  /** Anzahl Zeichen (Set-Size) */
  n: number;
  target: Shape;
  distract: readonly Shape[];
  turn: Turn;
  /** Mittenabstand der Rasterzellen in Elementhöhen */
  spacing: number;
}

const ch = (c: string): Shape => ({ kind: 'char', ch: c });
const O: Shape = { kind: 'ring', gap: 0 };
/** C als Ring; Lücke als Anteil des Durchmessers */
const ringC = (gap: number): Shape => ({ kind: 'ring', gap });

/** Abstand: Stufe 1 → 2,0 × Elementhöhe, Stufe 12 → 1,3 × */
const spacingFor = (level: number): number => 2.0 - (0.7 * (level - 1)) / (MAX_LEVEL - 1);

/** Stufe 1–12: mehr Zeichen, ähnlichere Ablenker, engere Abstände */
const LEVELS: readonly SearchSet[] = (
  [
    { n: 12, target: ch('X'), distract: [O], turn: 'none' },
    { n: 16, target: ch('T'), distract: [O], turn: 'none' },
    { n: 20, target: ringC(0.3), distract: [O], turn: 'free' },
    { n: 24, target: ringC(0.2), distract: [O], turn: 'free' },
    { n: 28, target: ringC(0.12), distract: [O], turn: 'free' },
    // Umkehrung: O zwischen C – dem Ziel fehlt ein Merkmal → deutlich schwerer
    { n: 32, target: O, distract: [ringC(0.2)], turn: 'free' },
    { n: 36, target: ch('E'), distract: [ch('F')], turn: 'none' },
    { n: 40, target: ch('P'), distract: [ch('R'), ch('B')], turn: 'none' },
    { n: 44, target: ch('T'), distract: [ch('L')], turn: 'quarter' },
    { n: 48, target: ch('2'), distract: [ch('5')], turn: 'quarter' },
    { n: 52, target: ch('b'), distract: [ch('d'), ch('p'), ch('q')], turn: 'none' },
    // gemischte Ablenker
    { n: 56, target: ch('T'), distract: [ch('L'), ch('I')], turn: 'quarter' },
  ] as Array<Omit<SearchSet, 'spacing'>>
).map((s, i) => ({ ...s, spacing: spacingFor(i + 1) }));

const DEMO_SETS: readonly SearchSet[] = [
  { n: 12, target: ch('X'), distract: [O], turn: 'none', spacing: 2 },
  { n: 12, target: ringC(0.3), distract: [O], turn: 'free', spacing: 2 },
];

/** Zeitgrenze für einen „Erfolg“ (ms): 1,2 s + 75 ms pro Zeichen */
function successLimit(n: number): number {
  return 1200 + 75 * n;
}

function shapeKey(s: Shape): string {
  return s.kind === 'char' ? s.ch : `ring${s.gap}`;
}

/** Hängt das Aussehen des Ziels von der Drehung ab? (dann Dreh-Hinweis in der Anzeige) */
function targetTurns(set: SearchSet): boolean {
  if (set.turn === 'none') return false;
  return set.target.kind === 'char' || set.target.gap > 0;
}

interface Item {
  shape: Shape;
  /** Drehwinkel (rad) */
  angle: number;
  target: boolean;
  /** Index der Rasterzelle (Zeile · Spalten + Spalte) */
  cell: number;
  /** Verwacklung −1..1, wird mit der Zellgröße skaliert (übersteht Größenwechsel) */
  jx: number;
  jy: number;
  /** Zeitpunkt des letzten Fehltipps auf dieses Zeichen */
  wrongT: number;
}

interface Layout {
  pillCy: number;
  pillH: number;
  /** Elementhöhe der Zielanzeige */
  pillE: number;
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
  ox: number;
  oy: number;
  jitX: number;
  jitY: number;
  /** Elementhöhe (Versalhöhe bzw. Ringdurchmesser) */
  elem: number;
  hitR: number;
}

type Phase = 'search' | 'found' | 'reveal' | 'end' | 'done';

// ---------------------------------------------------------------------------
// Zeichen-Helfer

interface Ink {
  /** Mitte der sichtbaren Tinte relativ zum Textanker (links, Grundlinie) */
  cx: number;
  cy: number;
  /** Höhe der Tinte */
  h: number;
}

const inkCache = new Map<string, Ink>();

function ink(g: CanvasRenderingContext2D, c: string, px: number): Ink {
  const key = `${c}|${px}`;
  let m = inkCache.get(key);
  if (!m) {
    g.save();
    g.font = font(px, WEIGHT);
    const tm = g.measureText(c);
    g.restore();
    const l = tm.actualBoundingBoxLeft;
    const r = tm.actualBoundingBoxRight;
    const a = tm.actualBoundingBoxAscent;
    const d = tm.actualBoundingBoxDescent;
    m = [l, r, a, d].every((v) => Number.isFinite(v))
      ? { cx: (r - l) / 2, cy: (d - a) / 2, h: a + d }
      : { cx: tm.width / 2, cy: -px * 0.36, h: px * 0.72 };
    if (inkCache.size > 300) inkCache.clear();
    inkCache.set(key, m);
  }
  return m;
}

/** Schriftgröße, bei der Großbuchstaben die gewünschte Höhe haben */
function charPx(g: CanvasRenderingContext2D, elem: number): number {
  const ratio = clamp(ink(g, 'X', 100).h / 100, 0.6, 0.85);
  return Math.max(8, Math.round(elem / ratio));
}

/** Fettes Zeichen, nach seiner Tinte zentriert und um diese Mitte gedreht */
function drawChar(g: CanvasRenderingContext2D, c: string, x: number, y: number, px: number, angle: number, color: string, alpha: number): void {
  const m = ink(g, c, px);
  g.save();
  g.translate(x, y);
  if (angle) g.rotate(angle);
  text(g, c, -m.cx, -m.cy, px, color, { weight: WEIGHT, align: 'left', baseline: 'alphabetic', alpha });
  g.restore();
}

/** Ring (O) bzw. Ring mit Lücke (C): Strich 1/6 des Durchmessers, Lücke als Anteil des Durchmessers */
function drawRing(g: CanvasRenderingContext2D, x: number, y: number, d: number, gap: number, angle: number, color: string, alpha: number): void {
  const stroke = d / 6;
  const rm = d / 2 - stroke / 2;
  g.save();
  g.globalAlpha = alpha;
  g.strokeStyle = color;
  g.lineWidth = stroke;
  g.lineCap = 'butt';
  g.beginPath();
  if (gap > 0) {
    const half = Math.asin(Math.min(1, (gap * d) / 2 / rm));
    g.arc(x, y, rm, angle + half, angle + Math.PI * 2 - half);
  } else {
    g.arc(x, y, rm, 0, Math.PI * 2);
  }
  g.stroke();
  g.restore();
}

function drawShape(g: CanvasRenderingContext2D, s: Shape, x: number, y: number, elem: number, angle: number, color: string, alpha = 1): void {
  if (s.kind === 'ring') drawRing(g, x, y, elem, s.gap, angle, color, alpha);
  else drawChar(g, s.ch, x, y, charPx(g, elem), angle, color, alpha);
}

/** Kleiner Dreh-Pfeil: „Zeichen kann gedreht sein“ */
function turnIcon(g: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string): void {
  const r = size * 0.34;
  const a1 = Math.PI * 1.15;
  g.save();
  g.strokeStyle = color;
  g.fillStyle = color;
  g.lineWidth = Math.max(2, size * 0.11);
  g.lineCap = 'round';
  g.beginPath();
  g.arc(cx, cy, r, -Math.PI * 0.3, a1);
  g.stroke();
  const ex = cx + Math.cos(a1) * r;
  const ey = cy + Math.sin(a1) * r;
  const dx = -Math.sin(a1);
  const dy = Math.cos(a1);
  const nx = Math.cos(a1);
  const ny = Math.sin(a1);
  const hs = size * 0.22;
  g.beginPath();
  g.moveTo(ex + dx * hs, ey + dy * hs);
  g.lineTo(ex + nx * hs * 0.75 - dx * hs * 0.25, ey + ny * hs * 0.75 - dy * hs * 0.25);
  g.lineTo(ex - nx * hs * 0.75 - dx * hs * 0.25, ey - ny * hs * 0.75 - dy * hs * 0.25);
  g.closePath();
  g.fill();
  g.restore();
}

let measureG: CanvasRenderingContext2D | null = null;

function textWidth(s: string, size: number, weight = 800): number {
  if (!measureG) measureG = document.createElement('canvas').getContext('2d');
  if (!measureG) return s.length * size * 0.6;
  measureG.font = font(size, weight);
  return measureG.measureText(s).width;
}

/** Platz, den die Bildunterschrift im Intro-Film unten braucht (wie im Runner berechnet) */
function captionReserve(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
}

// ---------------------------------------------------------------------------

class Suchbild implements Exercise {
  private readonly stair: Staircase;
  private lay: Layout | null = null;
  private set: SearchSet = LEVELS[0];
  private level = 1;
  private items: Item[] = [];
  private phase: Phase = 'search';
  private phaseT = 0;
  private onset = 0;
  private sessionT0 = 0;
  private points = 0;
  private found = 0;
  private timeouts = 0;
  private wrong = 0;
  private times: number[] = [];
  /** Suchzeit pro Zeichen (ms) je Fund – interner Effizienzwert */
  private perItem: number[] = [];
  private lastTarget: { x: number; y: number } | null = null;
  private lastTapT = -1e9;
  private setKey = '';
  private popT = -1e9;
  private badSfxT = -1e9;
  // Demo
  private demoStep = 0;
  /** Zeichen in der Zeile, die die Hand im Film „abliest“ */
  private rowPath: number[] = [];

  constructor(private readonly ctx: ExerciseContext) {
    this.stair = new Staircase({ start: ctx.startLevel ?? 1, min: 1, max: MAX_LEVEL, down: 2, up: 1 });
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  private get duration(): number {
    return this.ctx.quick ? QUICK_SESSION_MS : SESSION_MS;
  }

  /** Suchzeit pro Zeichen (Median, ms) – intern, z. B. für spätere Auswertungen */
  get msPerItem(): number {
    return this.perItem.length ? median(this.perItem) : NaN;
  }

  start(t: number): void {
    this.sessionT0 = t;
    this.ctx.hud.setScore(this.demo ? null : 0);
    this.ctx.hud.setProgress(0);
    this.newTrial(t);
  }

  // ------------------------------------------------------------------ Layout

  private computeLayout(set: SearchSet): Layout {
    const { w, h, u } = this.ctx.stage;
    const side = Math.max(12, u * 3);
    const top = Math.max(8, u * 2);
    // Elementhöhe: mind. 26 px (≈ 0,7° bei 40 cm), bevorzugt 36 px
    const elem = clamp(u * 5, 26, 36);
    let pillH = Math.max(44, u * 9);
    const pillE = Math.max(pillH * 0.56, elem * 1.12);
    pillH = Math.max(pillH, pillE / 0.64);
    const fieldTop = top + pillH + Math.max(8, u * 2);
    const bottom = this.demo ? captionReserve(this.ctx.stage) : Math.max(10, u * 2.5);
    const fieldW = Math.max(1, w - 2 * side);
    const fieldH = Math.max(1, h - bottom - fieldTop);
    // Mittenabstand je nach Stufe, Touch-Zelle aber immer ≥ 48 px
    const minCell = Math.max(48, elem * set.spacing);
    const cols = Math.max(1, Math.floor(fieldW / minCell));
    const rows = Math.max(1, Math.floor(fieldH / minCell));
    const cellW = fieldW / cols;
    const cellH = fieldH / rows;
    // Zufallsversatz bis ±20 % der Zelle, Abstand aber nie unter 1,15 × Elementhöhe
    const jit = (cell: number) => Math.max(0, Math.min(cell * 0.2, (cell - elem * 1.15) / 2));
    return {
      pillCy: top + pillH / 2,
      pillH,
      pillE,
      cols,
      rows,
      cellW,
      cellH,
      ox: side,
      oy: fieldTop,
      jitX: jit(cellW),
      jitY: jit(cellH),
      elem,
      hitR: Math.max(26, Math.min(cellW, cellH) * 0.6),
    };
  }

  private capacity(): number {
    const L = this.lay!;
    const cells = L.cols * L.rows;
    return Math.min(cells, Math.max(2, Math.floor(cells * MAX_FILL)));
  }

  private pos(it: Item): { x: number; y: number } {
    const L = this.lay!;
    const col = it.cell % L.cols;
    const row = Math.floor(it.cell / L.cols);
    return { x: L.ox + (col + 0.5) * L.cellW + it.jx * L.jitX, y: L.oy + (row + 0.5) * L.cellH + it.jy * L.jitY };
  }

  resize(): void {
    if (!this.lay) return;
    const old = this.lay;
    this.lay = this.computeLayout(this.set);
    // Gleiches Raster → Positionen skalieren automatisch mit
    if (old.cols === this.lay.cols && old.rows === this.lay.rows) return;
    // Raster hat sich geändert (Tablet gedreht) → Zeichen neu verteilen, Suche beginnt neu
    const cap = this.capacity();
    if (this.items.length > cap) this.items = this.items.slice(0, cap);
    this.lastTarget = null;
    if (this.demo) this.placeDemo();
    else this.placeRandom();
    if (this.phase === 'search') {
      this.onset = this.ctx.now();
      this.phaseT = this.onset;
      if (this.ctx.autoplay) this.planGhost();
    }
  }

  // ------------------------------------------------------------------ Durchgänge

  private newTrial(t: number): void {
    const { ctx } = this;
    if (this.demo) {
      this.set = DEMO_SETS[Math.min(this.demoStep, DEMO_SETS.length - 1)];
      this.level = 1;
    } else {
      this.level = clamp(Math.floor(this.stair.level + 1e-9), 1, MAX_LEVEL);
      this.set = LEVELS[this.level - 1];
    }
    const key = `${shapeKey(this.set.target)}:${this.set.distract.map(shapeKey).join(',')}:${this.set.turn}`;
    if (key !== this.setKey) {
      // Neues Zielzeichen → Anzeige kurz hervorheben, damit der Wechsel auffällt
      this.setKey = key;
      this.popT = t;
    }
    this.lay = this.computeLayout(this.set);
    this.items = this.makeItems(this.set);
    if (this.demo) this.placeDemo();
    else this.placeRandom();
    this.phase = 'search';
    this.phaseT = t;
    this.onset = t;
    if (this.demo) ctx.hud.caption(this.demoStep === 0 ? ctx.texts.captions.find : ctx.texts.captions.next);
    else ctx.hud.setLabel(`${ctx.texts.feedback.level} ${this.level}`);
    if (ctx.autoplay) this.planGhost();
  }

  private makeItems(set: SearchSet): Item[] {
    const { rng } = this.ctx;
    const n = Math.max(1, Math.min(set.n, this.capacity()));
    const angle = () => (set.turn === 'quarter' ? (rng.int(4) * Math.PI) / 2 : set.turn === 'free' ? rng.range(0, Math.PI * 2) : 0);
    const make = (shape: Shape, target: boolean): Item => ({ shape, angle: angle(), target, cell: 0, jx: 0, jy: 0, wrongT: -1e9 });
    const items: Item[] = [make(set.target, true)];
    // Ablenker-Sorten gleichmäßig verteilen
    const kinds = rng.shuffle([...set.distract]);
    for (let i = 1; i < n; i++) items.push(make(kinds[(i - 1) % kinds.length], false));
    return items;
  }

  private placeRandom(): void {
    const L = this.lay!;
    const { rng } = this.ctx;
    const cells = rng.shuffle(Array.from({ length: L.cols * L.rows }, (_, i) => i));
    const center = (c: number) => ({ x: L.ox + ((c % L.cols) + 0.5) * L.cellW, y: L.oy + (Math.floor(c / L.cols) + 0.5) * L.cellH });
    // Ziel nicht gleich neben das letzte Ziel legen (dort ist der Blick noch)
    let ti = 0;
    const lt = this.lastTarget;
    if (lt) {
      const minD = 2 * Math.max(L.cellW, L.cellH);
      const far = cells.findIndex((c) => {
        const q = center(c);
        return Math.hypot(q.x - lt.x, q.y - lt.y) >= minD;
      });
      if (far >= 0) ti = far;
    }
    const tcell = cells.splice(ti, 1)[0];
    this.items.forEach((it, i) => {
      it.cell = it.target ? tcell : cells[i - 1];
      it.jx = rng.range(-1, 1);
      it.jy = rng.range(-1, 1);
    });
    this.lastTarget = center(tcell);
  }

  /** Film: Ziel rechts in einer Zeile, links davon Ablenker, die die Hand „abliest“ */
  private placeDemo(): void {
    const L = this.lay!;
    const { rng } = this.ctx;
    const { cols, rows } = L;
    const idx = (c: number, r: number) => r * cols + c;
    const first = this.demoStep === 0;
    const mid = Math.floor(rows / 2);
    const row = first ? mid : Math.max(0, mid - 1);
    const tcol = first ? Math.max(0, cols - 2 - rng.int(2)) : clamp(Math.floor(cols * 0.6) + rng.int(2), 0, cols - 1);
    const left = rng
      .shuffle(Array.from({ length: tcol }, (_, i) => i))
      .slice(0, first ? 3 : 2)
      .sort((a, b) => a - b);
    const others = rng.shuffle(Array.from({ length: cols * rows }, (_, i) => i).filter((c) => Math.floor(c / cols) !== row));
    const target = this.items[0];
    target.cell = idx(tcol, row);
    target.jx = rng.range(-0.5, 0.5);
    target.jy = rng.range(-0.4, 0.4);
    this.rowPath = [];
    const keep: Item[] = [target];
    for (let i = 1; i < this.items.length; i++) {
      const it = this.items[i];
      const k = i - 1;
      if (k < left.length) {
        it.cell = idx(left[k], row);
        it.jy = rng.range(-0.4, 0.4);
        this.rowPath.push(keep.length);
      } else {
        const c = others[k - left.length];
        if (c === undefined) continue;
        it.cell = c;
        it.jy = rng.range(-1, 1);
      }
      it.jx = rng.range(-1, 1);
      keep.push(it);
    }
    this.items = keep;
  }

  private planGhost(): void {
    const { ghost, rng, stage } = this.ctx;
    ghost.clear();
    const tp = this.pos(this.items[0]);
    if (this.demo) {
      const L = this.lay!;
      const first = this.demoStep === 0;
      // Fingerspitze knapp unter die Zeichen, damit man sie beim „Ablesen“ noch sieht
      const below = Math.min(L.cellH * 0.45, L.elem * 1.3);
      this.rowPath.forEach((i, k) => {
        const p = this.pos(this.items[i]);
        ghost.moveTo(p.x, p.y + below, { delay: k === 0 ? (first ? 900 : 600) : 150, move: k === 0 ? 650 : 420 });
      });
      ghost.tap(tp.x, tp.y, { delay: 200, move: 420 });
      if (!first) ghost.moveTo(stage.w * 0.9, stage.h - captionReserve(stage) * 0.8, { delay: 450, move: 650 });
      return;
    }
    // Spielmodus (nur Tests): meist richtig, manchmal ein Fehltipp, selten „nicht gefunden“
    const n = this.items.length;
    const search = (300 + 45 * n) * rng.range(0.7, 1.35);
    const r = rng.next();
    if (!this.ctx.quick && r < 0.05) return;
    if (r < 0.16 && n > 1) {
      const d = this.pos(this.items[1 + rng.int(n - 1)]);
      ghost.tap(d.x, d.y, { delay: search * 0.45, move: 320 });
      ghost.tap(tp.x, tp.y, { delay: search * 0.35, move: 320 });
    } else {
      ghost.tap(tp.x, tp.y, { delay: search, move: 320 });
    }
  }

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    if (!this.demo) {
      const el = t - this.sessionT0;
      this.ctx.hud.setProgress(el / this.duration);
      if (el >= this.duration) {
        this.finish();
        return;
      }
    }
    switch (this.phase) {
      case 'search':
        if (t - this.onset >= TIMEOUT_MS) this.onTimeout(t);
        break;
      case 'found':
        if (t - this.phaseT >= FOUND_MS) {
          if (!this.demo) this.newTrial(t);
          else if (this.demoStep + 1 < DEMO_SETS.length) {
            this.demoStep++;
            this.newTrial(t);
          } else {
            this.phase = 'end';
            this.phaseT = t;
          }
        }
        break;
      case 'reveal':
        if (t - this.phaseT >= REVEAL_MS) this.newTrial(t);
        break;
      case 'end':
        if (t - this.phaseT >= DEMO_END_MS) {
          this.phase = 'done';
          this.ctx.finish({ primary: { key: 'points', value: 20, unit: 'points', better: 'higher' }, secondary: [], score: 20, level: 1 });
        }
        break;
      default:
        break;
    }
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'search' || !this.lay) return;
    // Doppel-Tipp oder zweiter Finger kurz danach: ignorieren
    if (p.t - this.lastTapT < DOUBLE_TAP_MS) return;
    let best: Item | null = null;
    let bestD = Infinity;
    for (const it of this.items) {
      const q = this.pos(it);
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < bestD) {
        bestD = d;
        best = it;
      }
    }
    // Tipp ins Leere: einfach ignorieren
    if (!best || bestD > this.lay.hitR) return;
    this.lastTapT = p.t;
    if (best.target) this.onFound(p.t, best);
    else this.onWrong(p.t, best);
  }

  private onFound(tp: number, it: Item): void {
    const { ctx } = this;
    const rt = Math.max(0, tp - this.onset);
    const pts = 10 + 3 * (this.level - 1);
    this.phase = 'found';
    this.phaseT = tp;
    ctx.sfx.good();
    if (!this.demo) {
      const n = this.items.length;
      this.found++;
      this.points += pts;
      this.times.push(rt);
      this.perItem.push(rt / n);
      this.stair.update(rt <= successLimit(n));
      ctx.hud.setScore(this.points);
    }
    this.toastAt(`+${pts} · ${ctx.fmt.time(rt)}`, 'good', this.pos(it), 800);
  }

  private onWrong(tp: number, it: Item): void {
    it.wrongT = tp;
    if (!this.demo) this.wrong++;
    if (tp - this.badSfxT > 250) {
      this.badSfxT = tp;
      this.ctx.sfx.bad();
    }
  }

  private onTimeout(t: number): void {
    this.phase = 'reveal';
    this.phaseT = t;
    this.ctx.ghost.clear();
    if (!this.demo) {
      this.timeouts++;
      this.stair.update(false);
    }
    this.ctx.sfx.tap();
    this.toastAt(this.ctx.texts.feedback.here, 'info', this.pos(this.items[0]), REVEAL_MS);
  }

  private toastAt(s: string, kind: ToastKind, q: { x: number; y: number }, ms: number): void {
    const { w, u } = this.ctx.stage;
    const L = this.lay!;
    const size = clamp(u * 4.2, 16, 34);
    const half = (textWidth(s, size) + size * 0.5) / 2;
    const x = clamp(q.x, half + 6, Math.max(half + 6, w - half - 6));
    const off = Math.max(L.hitR, L.elem * 0.9) + size * 0.5;
    let y = q.y - off;
    if (y - size * 0.6 < L.pillCy + L.pillH / 2) y = q.y + off + size * 0.3;
    this.ctx.hud.toast(s, kind, { x, y, ms, size });
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    if (!this.lay || !this.items.length) return;
    this.drawField(g, t);
    this.drawPill(g, t);
  }

  private drawField(g: CanvasRenderingContext2D, t: number): void {
    const L = this.lay!;
    const { u } = this.ctx.stage;
    const still = this.ctx.reducedMotion;
    const ph = this.phase;
    const showFound = ph === 'found' || ph === 'end' || (ph === 'done' && this.demo);
    const kFound = ph === 'found' && !still ? clamp((t - this.phaseT) / FOUND_MS, 0, 1) : 1;
    const lw = Math.max(3, u * 0.55);
    let others = 1;
    if (showFound) others = 1 - 0.62 * easeOut(kFound * 1.6);
    else if (ph === 'reveal') others = 1 - 0.7 * easeOut((t - this.phaseT) / 260);

    const target = this.items[0];
    const tq = this.pos(target);
    if (showFound) glow(g, tq.x, tq.y, L.elem * 0.75, C.good, 0.9);
    else if (ph === 'reveal') glow(g, tq.x, tq.y, L.elem * 0.75, C.light, 0.8 * clamp((t - this.phaseT) / 260, 0, 1));

    for (const it of this.items) {
      const q = it === target ? tq : this.pos(it);
      let color: string = C.fg;
      let alpha = 1;
      let dx = 0;
      if (it.target && showFound) color = C.good;
      else if (it.target && ph === 'reveal') color = C.light;
      else {
        alpha = others;
        const dt = t - it.wrongT;
        if (dt >= 0 && dt < WRONG_MS) {
          // kurz rot + leichtes Wackeln (nur dieses Zeichen); ohne Bewegung: dünner roter Ring als Formsignal
          const k = dt / WRONG_MS;
          if (still) ring(g, q.x, q.y, L.elem * 0.62, withAlpha(C.bad, 1 - k), Math.max(2, lw * 0.6));
          else dx = Math.sin(k * Math.PI * 5) * (1 - k) * L.elem * 0.2;
          if (k < 0.8) color = C.bad;
        }
      }
      drawShape(g, it.shape, q.x + dx, q.y, L.elem, it.angle, color, alpha);
    }

    if (showFound) {
      ring(g, tq.x, tq.y, L.hitR * (1.28 - 0.3 * easeOut(kFound)), C.good, lw);
    } else if (ph === 'reveal') {
      const dt = t - this.phaseT;
      const a = clamp(dt / 260, 0, 1);
      // sanftes Pulsieren (1,4 Hz, sinusförmig) – bei „Bewegung reduzieren“ ruhig
      const pulse = still ? 1 : 1 + 0.07 * Math.sin((dt / 1000) * Math.PI * 2 * 1.4);
      ring(g, tq.x, tq.y, L.hitR * 0.98 * pulse, withAlpha(C.light, a), lw);
    }
  }

  private drawPill(g: CanvasRenderingContext2D, t: number): void {
    const L = this.lay!;
    const { w } = this.ctx.stage;
    const H = L.pillH;
    const label = this.ctx.texts.feedback.find;
    const labelPx = Math.round(H * 0.34);
    g.save();
    g.font = font(labelPx, 700);
    const lw = g.measureText(label).width;
    g.restore();
    const padL = H * 0.46;
    const padR = H * 0.4;
    const gap = H * 0.24;
    const box = L.pillE * 1.25;
    const turns = targetTurns(this.set);
    const icon = turns ? H * 0.46 : 0;
    const pw = padL + lw + gap + box + (icon ? gap * 0.5 + icon : 0) + padR;
    const cx = w / 2;
    const cy = L.pillCy;
    const x0 = cx - pw / 2;
    const gx = x0 + padL + lw + gap + box / 2;
    // Neues Zielzeichen: kurz größer + Leuchten (bei „Bewegung reduzieren“ nur Leuchten)
    const k = clamp((t - this.popT) / 550, 0, 1);
    const pop = this.ctx.reducedMotion ? 1 : 1 + 0.16 * (1 - easeOut(k));
    g.save();
    g.translate(cx, cy);
    g.scale(pop, pop);
    g.translate(-cx, -cy);
    if (k < 1) glow(g, gx, cy, box * 0.5, C.light, 0.9 * (1 - k));
    fillRR(g, x0, cy - H / 2, pw, H, H / 2, 'rgba(255,255,255,0.10)');
    rrPath(g, x0 + 0.75, cy - H / 2 + 0.75, pw - 1.5, H - 1.5, H / 2);
    g.strokeStyle = 'rgba(255,255,255,0.24)';
    g.lineWidth = 1.5;
    g.stroke();
    text(g, label, x0 + padL, cy + 1, labelPx, C.dim, { align: 'left', weight: 700 });
    // Ziel aufrecht zeigen (C öffnet nach rechts wie ein Buchstabe)
    drawShape(g, this.set.target, gx, cy, L.pillE, 0, C.white);
    if (icon) turnIcon(g, gx + box / 2 + gap * 0.5 + icon / 2, cy, icon, C.dim);
    g.restore();
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.ghost.clear();
    const thr = this.stair.threshold();
    const trials = this.found + this.timeouts;
    let tip = 'great';
    if (this.timeouts >= 2 && this.timeouts >= trials * 0.2) tip = 'system';
    else if (this.wrong >= 3 && this.wrong >= Math.max(1, trials) * 0.3) tip = 'look';
    ctx.sfx.done();
    ctx.finish({
      primary: { key: 'points', value: this.points, unit: 'points', better: 'higher' },
      secondary: [
        { key: 'found', value: this.found, unit: 'count' },
        ...(this.times.length ? [{ key: 'avgTime', value: Math.round(mean(this.times)), unit: 'time' as const }] : []),
        { key: 'level', value: clamp(Math.round(thr), 1, MAX_LEVEL), unit: 'level' },
      ],
      score: this.points,
      level: nextStartLevel(thr, 1, MAX_LEVEL),
      tip,
    });
  }
}

export const suchbild: ExerciseDefinition = {
  id: 'suchbild',
  category: 'wahrnehmung',
  minutes: 1,
  color: '#8C6D4A',
  showsLevel: true,
  icon:
    '<g fill="currentColor" opacity=".45"><circle cx="7" cy="7" r="3"/><circle cx="41" cy="8" r="3"/><circle cx="7" cy="41" r="3"/><circle cx="42" cy="23" r="3"/><circle cx="23" cy="42" r="3"/></g><circle cx="21" cy="21" r="11.5" fill="none" stroke="currentColor" stroke-width="4"/><path d="M29.8 29.8 40.5 40.5" stroke="currentColor" stroke-width="5.5" stroke-linecap="round"/><path d="M17 17l8 8M25 17l-8 8" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>',
  texts: { de, it },
  create: (ctx) => new Suchbild(ctx),
};
