/**
 * Zahlenjagd – Zahlen der Reihe nach antippen (Prinzip der Schulte-Tafel, verbessert).
 *
 * Umsetzung nach docs/wissenschaft/04-konzentration-und-denken.md, Abschnitt 4:
 * - Raster 3×3 → 7×7, jede Tafel neu gemischt. Aufeinanderfolgende Einträge liegen nie direkt
 *   nebeneinander (bis 4×4 nicht Kante an Kante, ab 5×5 auch nicht über Eck) – so lässt sich der
 *   Weg nicht „erraten“, man muss wirklich suchen.
 * - Zellen ≥ 12 mm (≈ 63 CSS-px) auf dem Tablet, nie unter ≈ 9 mm (50 px): Auf schmalen Bühnen
 *   (Handy) wird 7×7 zu 6×6. Ziffernhöhe ≈ 0,42 × Zelle (Tablet ≥ 1°, keine 12-px-Schrift).
 * - Vorbild-Fehler behoben: Gefundene Zahlen werden NICHT ausgegraut. Sie bleiben gleich sichtbar
 *   (nur ein kleiner Punkt in der Ecke) – die Suchmenge bleibt gleich groß, die Suche wird nicht mit
 *   jeder Zahl leichter. Oben steht, was als Nächstes kommt; auf der Profi-Stufe fehlen Punkt und
 *   Anzeige (Reihenfolge im Kopf behalten).
 * - Wechselpfad (Prinzip von Trail Making B): 1 – A – 2 – B – 3 – C … Zahlen stehen in Kreisen,
 *   Buchstaben in Quadraten – Unterscheidung über die Form, nicht über Farbe. Buchstaben nur A–L
 *   (in DE und IT gleich).
 * - Adaptiv je Tafel: Zeitziel = Felder × (0,30 s + 0,028 s × Felder), beim Wechselpfad × 1,4.
 *   Im Zeitziel und mit wenigen Fehlern → nächste Stufe; deutlich langsamer (> 1,6 × Ziel) oder
 *   viele Fehler → leichter. Stufenfolge: 3×3, 4×4, 5×5, 4×4 Wechsel, 6×6, 5×5 Wechsel, 7×7,
 *   5×5 Wechsel Profi.
 * - Sitzung ≈ 60 s: Eine angefangene Tafel wird immer fertig gespielt (höchstens 20 s Überzug,
 *   eine Tafel, die das sprengen würde, wird nicht mehr begonnen). Kein Zeitbonus.
 * - Falscher Tipp: Zelle wackelt kurz (bei „Bewegung reduzieren“ roter Rahmen), keine Zeitstrafe,
 *   zählt als Fehler. Tipps auf schon gefundene Zahlen werden ignoriert.
 * - Hauptwert: erreichte Stufe (höchste fertig gespielte Tafel); dazu Zeit pro Zahl (Median der
 *   Abstände zwischen richtigen Tipps), Tafeln und Fehler.
 */
import { background, C, fillRR, font, glow, ring, rrPath, text, withAlpha } from '../../core/draw';
import { clamp, easeOut, median } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import { de, it } from './texts';

const SESSION_MS = 60_000;
const QUICK_SESSION_MS = 8_000;
/** So weit darf die letzte Tafel die Sitzung überziehen */
const OVERRUN_MS = 20_000;
/** Notbremse (z. B. Tablet weggelegt): danach endet die Sitzung auch mitten in der Tafel */
const HARD_CAP_MS = 160_000;
const CLEAR_MS = 1200;
const FOUND_MS = 320;
const WRONG_MS = 450;
const DOUBLE_TAP_MS = 150;
const DEMO_END_MS = 1500;
const DEMO_CLEAR_MS = 950;
/** Kleinste Zelle in px (≈ 9 mm); darunter wird das Raster verkleinert */
const MIN_CELL = 50;
const ACCENT = '#7A5195';
const MARK = '#C9A6E4';

interface Board {
  n: number;
  alt: boolean;
  /** Profi: keine Markierung, keine Anzeige der nächsten Zahl */
  pro?: boolean;
}

const LEVELS: readonly Board[] = [
  { n: 3, alt: false },
  { n: 4, alt: false },
  { n: 5, alt: false },
  { n: 4, alt: true },
  { n: 6, alt: false },
  { n: 5, alt: true },
  { n: 7, alt: false },
  { n: 5, alt: true, pro: true },
];
const MAX_LEVEL = LEVELS.length;
const DEMO_BOARDS: readonly Board[] = [
  { n: 3, alt: false },
  { n: 3, alt: true },
];
/** Im Film tippt die Hand beim Wechselpfad nur die ersten … Einträge */
const DEMO_ALT_TAPS = 5;

/** Zeitziel einer Tafel in ms */
function targetMs(b: Board, n: number): number {
  const cells = n * n;
  return cells * (300 + 28 * cells) * (b.alt ? 1.4 : 1) * (b.pro ? 1.1 : 1);
}

type Phase = 'play' | 'clear' | 'end' | 'done';

interface Item {
  label: string;
  /** Position im Pfad (0 = zuerst) */
  order: number;
  shape: 'plain' | 'circle' | 'square';
  foundT: number;
  wrongT: number;
}

interface Layout {
  pillCy: number;
  pillH: number;
  gx: number;
  gy: number;
  cell: number;
  gap: number;
}

/** Platz, den die Bildunterschrift im Intro-Film unten braucht (wie im Runner berechnet) */
function captionReserve(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
}

function pathLabel(k: number, alt: boolean): string {
  if (!alt) return String(k + 1);
  return k % 2 === 0 ? String(k / 2 + 1) : String.fromCharCode(65 + (k - 1) / 2);
}

class Zahlenjagd implements Exercise {
  private level = 1;
  private board: Board = LEVELS[0];
  /** tatsächliche Rastergröße (kann auf dem Handy kleiner sein als in der Stufe) */
  private n = 3;
  /** Einträge je Zelle (Index = Zeile · n + Spalte) */
  private cells: Item[] = [];
  /** Zelle je Pfadposition */
  private pathCell: number[] = [];
  private next = 0;
  private phase: Phase = 'play';
  private phaseT = 0;
  private onset = -1;
  private lastOkT = 0;
  private sessionT0 = 0;
  private lay: Layout | null = null;
  private lastTap = { cell: -1, t: -1e9 };
  private boardErrors = 0;
  private boardPopT = -1e9;
  private pillFlashT = -1e9;
  // Auswertung
  private boards = 0;
  private errors = 0;
  private intervals: number[] = [];
  private points = 0;
  private bestLevel = 0;
  private altBoards = 0;
  private altFails = 0;
  private slowBoards = 0;
  // Demo / Autoplay
  private demoStep = 0;
  private plannedFor = -1;

  constructor(private readonly ctx: ExerciseContext) {
    const s = Math.round(ctx.startLevel ?? 1);
    this.level = clamp(Number.isFinite(s) ? s : 1, 1, MAX_LEVEL);
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  private get duration(): number {
    return this.ctx.quick ? QUICK_SESSION_MS : SESSION_MS;
  }

  start(t: number): void {
    this.sessionT0 = t;
    this.ctx.hud.setScore(this.demo ? null : 0);
    this.ctx.hud.setProgress(0);
    this.newBoard(t);
  }

  // ------------------------------------------------------------------ Tafeln

  /** Größtes Raster, das mit Zellen ≥ MIN_CELL auf die Bühne passt */
  private maxN(): number {
    const { w, h, u } = this.ctx.stage;
    const side = Math.max(12, u * 3);
    const pillH = Math.max(44, u * 8);
    const bottom = this.demo ? captionReserve(this.ctx.stage) : Math.max(12, u * 3);
    const avail = Math.min(w - 2 * side, h - (Math.max(8, u * 2) + pillH + Math.max(8, u * 2)) - bottom);
    // Mittenabstand = Zelle + Lücke (10 %)
    return Math.max(3, Math.floor(avail / (MIN_CELL / 0.9)));
  }

  private newBoard(t: number): void {
    const { ctx } = this;
    this.board = this.demo ? DEMO_BOARDS[Math.min(this.demoStep, DEMO_BOARDS.length - 1)] : LEVELS[this.level - 1];
    let n = Math.min(this.board.n, this.maxN());
    if (ctx.quick && !this.demo) n = Math.min(n, 4);
    this.n = n;
    const N = n * n;
    this.pathCell = this.arrange(n);
    this.cells = new Array(N);
    this.pathCell.forEach((c, k) => {
      this.cells[c] = {
        label: pathLabel(k, this.board.alt),
        order: k,
        shape: this.board.alt ? (k % 2 === 0 ? 'circle' : 'square') : 'plain',
        foundT: -1,
        wrongT: -1e9,
      };
    });
    this.next = 0;
    this.boardErrors = 0;
    this.phase = 'play';
    this.phaseT = t;
    this.onset = -1;
    this.boardPopT = t;
    this.plannedFor = -1;
    this.lay = this.computeLayout();
    if (this.demo) {
      ctx.hud.caption(this.demoStep === 0 ? ctx.texts.captions.order : ctx.texts.captions.alt);
    } else {
      ctx.hud.setLabel(`${ctx.texts.feedback.level} ${this.level}`);
    }
  }

  /**
   * Zufällige Anordnung, bei der aufeinanderfolgende Einträge nicht benachbart sind
   * (bis 4×4: nicht Kante an Kante; ab 5×5: auch nicht über Eck).
   */
  private arrange(n: number): number[] {
    const { rng } = this.ctx;
    const N = n * n;
    const diag = n >= 5;
    const near = (a: number, b: number) => {
      const dr = Math.abs(Math.floor(a / n) - Math.floor(b / n));
      const dc = Math.abs((a % n) - (b % n));
      return diag ? Math.max(dr, dc) <= 1 : dr + dc <= 1;
    };
    for (let attempt = 0; attempt < 400; attempt++) {
      const free = rng.shuffle(Array.from({ length: N }, (_, i) => i));
      const path: number[] = [];
      let ok = true;
      for (let k = 0; k < N; k++) {
        const prev = path[k - 1];
        const idx = prev === undefined ? 0 : free.findIndex((c) => !near(c, prev));
        if (idx < 0) {
          ok = false;
          break;
        }
        path.push(free.splice(idx, 1)[0]);
      }
      if (ok) return path;
    }
    return rng.shuffle(Array.from({ length: N }, (_, i) => i));
  }

  // ------------------------------------------------------------------ Layout

  private computeLayout(): Layout {
    const { w, h, u } = this.ctx.stage;
    const side = Math.max(12, u * 3);
    const top = Math.max(8, u * 2);
    const pillH = Math.max(44, u * 8);
    const bottom = this.demo ? captionReserve(this.ctx.stage) : Math.max(12, u * 3);
    const fieldTop = top + pillH + Math.max(8, u * 2);
    const availW = Math.max(1, w - 2 * side);
    const availH = Math.max(1, h - fieldTop - bottom);
    const n = this.n;
    const pitch = Math.min(availW, availH) / n;
    // Große Tafeln nicht unnötig aufblähen: höchstens 120 px pro Zelle
    const p = Math.min(pitch, 120);
    const gap = Math.max(4, p * 0.1);
    const size = p * n;
    // Anzeige „Nächste“ direkt über dem Raster, beides zusammen senkrecht mittig
    const spare = Math.max(0, availH - size);
    const shift = spare * 0.5;
    return {
      pillCy: top + shift + pillH / 2,
      pillH,
      gx: (w - size) / 2 + gap / 2,
      gy: fieldTop + shift + gap / 2,
      cell: p - gap,
      gap,
    };
  }

  private cellRect(i: number): { x: number; y: number; s: number; cx: number; cy: number } {
    const L = this.lay!;
    const p = L.cell + L.gap;
    const x = L.gx + (i % this.n) * p;
    const y = L.gy + Math.floor(i / this.n) * p;
    return { x, y, s: L.cell, cx: x + L.cell / 2, cy: y + L.cell / 2 };
  }

  resize(): void {
    if (!this.lay) return;
    // Passt das Raster nach dem Drehen nicht mehr, bleibt es trotzdem (Zellen werden nur kleiner) –
    // die angefangene Tafel wird nicht neu gemischt.
    this.lay = this.computeLayout();
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.plannedFor = -1;
    }
  }

  // ------------------------------------------------------------------ Ablauf

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    const { ctx } = this;
    if (this.phase === 'play' && this.onset < 0) {
      this.onset = t;
      this.lastOkT = t;
    }
    if (!this.demo) {
      const el = t - this.sessionT0;
      ctx.hud.setProgress(Math.min(1, el / this.duration));
      if (el >= HARD_CAP_MS) {
        this.finish();
        return;
      }
    }
    switch (this.phase) {
      case 'play':
        if (ctx.autoplay && this.onset >= 0 && this.plannedFor !== this.next) this.planGhost();
        break;
      case 'clear':
        if (t - this.phaseT >= (this.demo ? DEMO_CLEAR_MS : CLEAR_MS)) this.afterBoard(t);
        break;
      case 'end':
        if (t - this.phaseT >= DEMO_END_MS) {
          this.phase = 'done';
          ctx.finish({ primary: { key: 'level', value: 1, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: 1 });
        }
        break;
      default:
        break;
    }
  }

  private planGhost(): void {
    const { ghost, rng, stage } = this.ctx;
    this.plannedFor = this.next;
    const N = this.n * this.n;
    const target = this.cellRect(this.pathCell[this.next]);
    if (this.demo) {
      if (this.demoStep === 1 && this.next === DEMO_ALT_TAPS) {
        // Film: nach „1 – A – 2 – B – 3“ aufhören, Hand zur Seite
        ghost.moveTo(stage.w * 0.93, stage.h * 0.55, { delay: 250, move: 600 });
        this.phase = 'end';
        this.phaseT = this.ctx.now();
        return;
      }
      const first = this.next === 0;
      ghost.tap(target.cx, target.cy + target.s * 0.12, { delay: first ? (this.demoStep === 0 ? 700 : 400) : 120, move: first ? 550 : 300 });
      if (this.demoStep === 0 && this.next === 4) this.ctx.hud.caption(this.ctx.texts.captions.eyes);
      return;
    }
    // Spielmodus (nur Tests): Suchzeit wächst mit der Tafel, ab und zu ein Fehltipp
    const search = (220 + 20 * N) * rng.range(0.6, 1.4) * (this.board.alt ? 1.25 : 1);
    if (rng.chance(0.05) && N > 4) {
      const c = rng.int(N);
      if (c !== this.pathCell[this.next]) {
        const r = this.cellRect(c);
        ghost.tap(r.cx, r.cy, { delay: search * 0.5, move: 260 });
      }
    }
    ghost.tap(target.cx + rng.range(-0.2, 0.2) * target.s, target.cy + rng.range(-0.2, 0.2) * target.s, { delay: search, move: 260 });
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'play' || this.onset < 0 || !this.lay) return;
    const L = this.lay;
    const pitch = L.cell + L.gap;
    const col = Math.floor((p.x - L.gx + L.gap / 2) / pitch);
    const row = Math.floor((p.y - L.gy + L.gap / 2) / pitch);
    if (col < 0 || row < 0 || col >= this.n || row >= this.n) return;
    const i = row * this.n + col;
    // Doppel-Tipp auf dieselbe Zelle ignorieren
    if (i === this.lastTap.cell && p.t - this.lastTap.t < DOUBLE_TAP_MS) return;
    this.lastTap = { cell: i, t: p.t };
    const it = this.cells[i];
    if (!it || it.foundT >= 0) return;
    if (it.order === this.next) this.onCorrect(it, p.t);
    else this.onWrong(it, p.t);
  }

  private onCorrect(it: Item, t: number): void {
    const { ctx } = this;
    it.foundT = t;
    if (!this.demo) {
      this.intervals.push(Math.max(0, t - this.lastOkT));
      this.points += 2 + this.level;
      ctx.hud.setScore(this.points);
    }
    this.lastOkT = t;
    this.next++;
    ctx.sfx.tap();
    if (this.next >= this.n * this.n) this.onBoardDone(t);
  }

  private onWrong(it: Item, t: number): void {
    it.wrongT = t;
    this.pillFlashT = t;
    if (!this.demo) {
      this.errors++;
      this.boardErrors++;
    }
    this.ctx.sfx.bad();
  }

  private onBoardDone(t: number): void {
    const { ctx } = this;
    const time = t - this.onset;
    this.phase = 'clear';
    this.phaseT = t;
    ctx.ghost.clear();
    ctx.sfx.good();
    const L = this.lay!;
    const toastY = L.pillCy;
    if (this.demo) {
      ctx.hud.toast(ctx.texts.feedback.done, 'good', { y: toastY, ms: CLEAR_MS });
      return;
    }
    const N = this.n * this.n;
    const goal = targetMs(this.board, this.n);
    const maxErr = Math.max(1, Math.round(N * 0.08));
    const success = time <= goal && this.boardErrors <= maxErr;
    const fail = time > 1.6 * goal || this.boardErrors > Math.max(3, Math.round(N * 0.2));
    this.boards++;
    this.bestLevel = Math.max(this.bestLevel, this.level);
    if (this.board.alt) {
      this.altBoards++;
      if (fail) this.altFails++;
    }
    if (time > goal) this.slowBoards++;
    this.points += 10 * this.level + (success ? 10 * this.level : 0);
    ctx.hud.setScore(this.points);
    const prev = this.level;
    if (success) this.level = Math.min(MAX_LEVEL, this.level + 1);
    else if (fail) this.level = Math.max(1, this.level - 1);
    const extra = this.level > prev ? ` · ${ctx.texts.feedback.up}` : '';
    ctx.hud.toast(`${ctx.fmt.time(time, 1)}${extra}`, success ? 'good' : 'info', { y: toastY, ms: CLEAR_MS });
  }

  private afterBoard(t: number): void {
    if (this.demo) {
      this.demoStep++;
      this.newBoard(t);
      return;
    }
    const el = t - this.sessionT0;
    if (el >= this.duration) {
      this.finish();
      return;
    }
    const nb = LEVELS[this.level - 1];
    const n = Math.min(nb.n, this.maxN());
    if (!this.ctx.quick && el + 0.8 * targetMs(nb, n) > this.duration + OVERRUN_MS) {
      this.finish();
      return;
    }
    this.newBoard(t);
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    if (!this.lay || !this.cells.length) return;
    this.drawGrid(g, t);
    this.drawPill(g, t);
  }

  private drawGrid(g: CanvasRenderingContext2D, t: number): void {
    const L = this.lay!;
    const still = this.ctx.reducedMotion;
    const alt = this.board.alt;
    const marks = !this.board.pro;
    const clear = this.phase === 'clear' || this.phase === 'end';
    const kClear = clear ? clamp((t - this.phaseT) / 500, 0, 1) : 0;
    const appear = still ? 1 : easeOut(clamp((t - this.boardPopT) / 220, 0, 1));
    const r = L.cell * 0.18;
    // Zweistellige Zahlen etwas kleiner, damit genug Abstand zwischen den Ziffern bleibt
    const twoDigit = this.cells.length >= (alt ? 19 : 10);
    const fontPx = L.cell * (alt ? (twoDigit ? 0.36 : 0.42) : twoDigit ? 0.44 : 0.52);
    const lw = Math.max(2, L.cell * 0.045);
    g.save();
    g.globalAlpha = appear;
    for (let i = 0; i < this.cells.length; i++) {
      const it = this.cells[i];
      const q = this.cellRect(i);
      let dx = 0;
      const dtw = t - it.wrongT;
      const wrong = dtw >= 0 && dtw < WRONG_MS;
      if (wrong && !still) dx = Math.sin((dtw / WRONG_MS) * Math.PI * 5) * (1 - dtw / WRONG_MS) * q.s * 0.07;
      const x = q.x + dx;
      fillRR(g, x, q.y, q.s, q.s, r, wrong ? withAlpha(C.bad, 0.32) : alt ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.10)');
      if (clear) {
        g.save();
        g.globalAlpha = appear * 0.5 * (1 - kClear * 0.6);
        rrPath(g, x + 1, q.y + 1, q.s - 2, q.s - 2, r);
        g.strokeStyle = C.good;
        g.lineWidth = lw;
        g.stroke();
        g.restore();
      }
      if (wrong && still) {
        g.save();
        rrPath(g, x + 1.5, q.y + 1.5, q.s - 3, q.s - 3, r);
        g.strokeStyle = C.bad;
        g.lineWidth = lw * 1.3;
        g.stroke();
        g.restore();
      }
      // Form: Kreis (Zahl) bzw. Quadrat (Buchstabe) im Wechselpfad
      const cx = x + q.s / 2;
      const cy = q.cy;
      if (it.shape === 'circle') ring(g, cx, cy, q.s * 0.35, 'rgba(232,238,247,0.75)', lw);
      else if (it.shape === 'square') {
        const s2 = q.s * 0.6;
        g.save();
        g.strokeStyle = 'rgba(232,238,247,0.75)';
        g.lineWidth = lw;
        g.strokeRect(cx - s2 / 2, cy - s2 / 2, s2, s2);
        g.restore();
      }
      text(g, it.label, cx, cy + fontPx * 0.04, fontPx, C.fg, { weight: 800 });
      if (it.foundT >= 0) {
        // Dezente Markierung: kleiner Punkt in der Ecke – die Zahl selbst bleibt unverändert
        if (marks) {
          const d = Math.max(3, q.s * 0.065);
          g.save();
          g.fillStyle = MARK;
          g.beginPath();
          g.arc(x + q.s - d * 2.1, q.y + d * 2.1, d, 0, Math.PI * 2);
          g.fill();
          g.restore();
        }
        const k = (t - it.foundT) / FOUND_MS;
        if (k >= 0 && k < 1) {
          g.save();
          g.globalAlpha = appear * (1 - k);
          const grow = still ? 0 : 0.12 * easeOut(k);
          const ex = q.s * grow;
          rrPath(g, x - ex / 2, q.y - ex / 2, q.s + ex, q.s + ex, r);
          g.strokeStyle = C.good;
          g.lineWidth = lw * 1.4;
          g.stroke();
          g.restore();
        }
      }
    }
    g.restore();
  }

  private drawPill(g: CanvasRenderingContext2D, t: number): void {
    const L = this.lay!;
    const { w } = this.ctx.stage;
    const H = L.pillH;
    const cy = L.pillCy;
    const done = this.next >= this.n * this.n;
    if (this.board.pro && !this.demo) {
      // Profi: keine Anzeige, nur der Hinweis „im Kopf behalten“
      text(g, this.ctx.texts.feedback.proHint, w / 2, cy, H * 0.34, C.dim, { weight: 700 });
      return;
    }
    const label = this.ctx.texts.feedback.next;
    const labelPx = Math.round(H * 0.34);
    const nextLabel = done ? '✓' : pathLabel(this.next, this.board.alt);
    const box = H * 0.72;
    const g0 = H * 0.24;
    const lw = textWidth(g, label, labelPx);
    const pw = H * 0.46 + lw + g0 + box + H * 0.34;
    const x0 = w / 2 - pw / 2;
    const bx = x0 + H * 0.46 + lw + g0 + box / 2;
    const flash = clamp(1 - (t - this.pillFlashT) / 600, 0, 1);
    if (flash > 0) glow(g, bx, cy, box * 0.55, C.light, flash);
    fillRR(g, x0, cy - H / 2, pw, H, H / 2, 'rgba(255,255,255,0.10)');
    g.save();
    rrPath(g, x0 + 0.75, cy - H / 2 + 0.75, pw - 1.5, H - 1.5, H / 2);
    g.strokeStyle = flash > 0 ? withAlpha(C.light, 0.3 + 0.6 * flash) : 'rgba(255,255,255,0.24)';
    g.lineWidth = 1.5;
    g.stroke();
    g.restore();
    text(g, label, x0 + H * 0.46, cy + 1, labelPx, C.dim, { align: 'left', weight: 700 });
    const shape = done ? 'plain' : this.board.alt ? (this.next % 2 === 0 ? 'circle' : 'square') : 'plain';
    const lwS = Math.max(2, H * 0.045);
    if (shape === 'circle') ring(g, bx, cy, box * 0.46, C.fg, lwS);
    else if (shape === 'square') {
      g.save();
      g.strokeStyle = C.fg;
      g.lineWidth = lwS;
      g.strokeRect(bx - box * 0.42, cy - box * 0.42, box * 0.84, box * 0.84);
      g.restore();
    } else fillRR(g, bx - box / 2, cy - box / 2, box, box, box * 0.28, withAlpha(ACCENT, 0.55));
    text(g, nextLabel, bx, cy + 1, box * 0.56, done ? C.good : C.white, { weight: 800 });
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.ghost.clear();
    const primary = this.bestLevel || Math.max(1, this.level - 1);
    let tip = 'great';
    if (this.errors >= 4 && this.errors >= this.boards * 2) tip = 'errors';
    else if (this.altBoards && this.altFails) tip = 'alt';
    else if (this.boards && this.slowBoards >= Math.ceil(this.boards / 2)) tip = 'system';
    ctx.sfx.done();
    ctx.finish({
      primary: { key: 'level', value: primary, unit: 'level', better: 'higher' },
      secondary: [
        ...(this.intervals.length ? [{ key: 'perItem', value: Math.round(median(this.intervals)), unit: 'time' as const }] : []),
        { key: 'boards', value: this.boards, unit: 'count' },
        { key: 'errors', value: this.errors, unit: 'count' },
      ],
      score: this.points,
      level: this.level,
      tip,
    });
  }
}

function textWidth(g: CanvasRenderingContext2D, s: string, px: number): number {
  g.save();
  g.font = font(px, 700);
  const w = g.measureText(s).width;
  g.restore();
  return w;
}

export const zahlenjagd: ExerciseDefinition = {
  id: 'zahlenjagd',
  category: 'konzentration',
  minutes: 1,
  color: ACCENT,
  showsLevel: true,
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.6"><rect x="4" y="4" width="12" height="12" rx="3"/><rect x="18" y="4" width="12" height="12" rx="3"/><rect x="32" y="4" width="12" height="12" rx="3"/><rect x="4" y="18" width="12" height="12" rx="3"/><rect x="32" y="18" width="12" height="12" rx="3"/><rect x="4" y="32" width="12" height="12" rx="3"/><rect x="18" y="32" width="12" height="12" rx="3"/><rect x="32" y="32" width="12" height="12" rx="3"/></g><rect x="18" y="18" width="12" height="12" rx="3" fill="currentColor"/><path d="M10 10 38 24 24 38" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 4.5" opacity=".7"/>',
  texts: { de, it },
  create: (ctx) => new Zahlenjagd(ctx),
};
