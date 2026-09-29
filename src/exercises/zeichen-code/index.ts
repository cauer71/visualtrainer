/**
 * Zeichen-Code – Zeichen in Zahlen übersetzen (Prinzip der Symbol-Zahl-Zuordnung, eigene Umsetzung).
 *
 * Umsetzung nach docs/wissenschaft/04-konzentration-und-denken.md, Abschnitt 5:
 * - Oben steht der Schlüssel (Zeichen über Zahl), in der Mitte das gesuchte Zeichen, unten die
 *   Zahlentasten 1 … n in fester Reihenfolge (Querformat als Reihe, schmale Bühne als 3er-Raster).
 * - Vorbild-Fehler behoben: Die Paare im Schlüssel stehen in zufälliger Reihenfolge, die nie der
 *   Tastenreihenfolge entspricht (Derangement) – die Aufgabe ist nicht rein räumlich lösbar,
 *   man muss die Zahl wirklich ablesen.
 * - Der Schlüssel wird jede Sitzung (und bei jedem Stufenwechsel) neu gemischt: neue Zeichen aus
 *   einem Vorrat von 22 eigenen, abstrakten Formen (höchstens eine je Formfamilie) und neue
 *   Zuordnung – so kann man nichts über Sitzungen hinweg auswendig lernen (Pham et al., 2021).
 * - Stufen 3 → 6 → 9 Paare (mehr Möglichkeiten = längere Entscheidung, Hick-Prinzip). Gewertet in
 *   Blöcken zu 8 Zeichen: ≥ 7 richtig → nächste Stufe (neuer Schlüssel), ≤ 4 richtig → leichter.
 *   In den letzten 20 s ändert sich die Stufe nicht mehr, damit die Hauptzahl auf genug Daten beruht.
 * - Feste Sitzungsdauer 75 s ohne Zeitbonus. Hauptwert: richtige Zuordnungen pro Minute auf der
 *   Stufe, auf der die Sitzung endet (so verfälschen die leichten Einstiegsstufen den Vergleich nicht).
 *   Dazu Treffsicherheit und Median-Zeit pro Zeichen (nur richtige Antworten).
 * - Reizbeginn = erster Frame, in dem das Zeichen gezeichnet wird; Antwortzeit = p.t. Keine
 *   Wiederholung desselben Zeichens direkt hintereinander; Zeichen werden gleichmäßig gezogen.
 * - Falsche Zahl: Taste kurz rot mit Kreuz, richtige Taste und Paar im Schlüssel werden kurz
 *   markiert, dann folgt das nächste Zeichen (keine Zeitstrafe außer der kurzen Anzeige).
 * - Tastatur: Ziffern 1–9.
 */
import { background, button, C, fillRR, glow, hit, rrPath, text, withAlpha } from '../../core/draw';
import type { Rect } from '../../core/draw';
import { clamp, easeOut, median } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import { drawSymbol, pickSymbols } from './symbols';
import { de, it } from './texts';

const SESSION_MS = 75_000;
const QUICK_SESSION_MS = 10_000;
const PAIRS = [3, 6, 9] as const;
const MAX_LEVEL = PAIRS.length;
const BLOCK = 8;
const PROMOTE_MIN = 7;
const DEMOTE_MAX = 4;
/** In den letzten … ms keine Stufenwechsel mehr */
const LOCK_MS = 20_000;
const WRONG_MS = 700;
const NEWKEY_MS = 1500;
const FLASH_MS = 200;
const DOUBLE_TAP_MS = 120;
const HINT_MS = 7000;
const DEMO_TARGETS = 4;
const DEMO_NEWKEY_MS = 2600;
const ACCENT = '#7A5195';
const DIGIT_COLOR = '#E9D8F7';

type Phase = 'show' | 'wrong' | 'newkey' | 'done';

interface Layout {
  keys: Rect[];
  /** Paare pro Zeile im Schlüssel */
  perRow: number;
  keyPx: number;
  legend: Rect;
  /** Zellen im Schlüssel (Index = Position in der Anzeige) */
  cells: Rect[];
  sym: number;
  digitPx: number;
  tx: number;
  ty: number;
  tsize: number;
  card: Rect;
}

interface Segment {
  level: number;
  t0: number;
  t1: number;
  correct: number;
}

/** Platz, den die Bildunterschrift im Intro-Film unten braucht (wie im Runner berechnet) */
function captionReserve(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
}

class ZeichenCode implements Exercise {
  private level = 1;
  private n: number = PAIRS[0];
  /** Zeichen je Ziffer: sym[d − 1] */
  private sym: number[] = [];
  /** Reihenfolge der Ziffern im Schlüssel */
  private legendOrder: number[] = [];
  private bag: number[] = [];
  private target = 1;
  private phase: Phase = 'show';
  private phaseT = 0;
  /** Reizbeginn; −1 = wird im nächsten Frame gesetzt (erstes Zeichnen) */
  private onset = -1;
  private sessionT0 = 0;
  private lastAnsT = -1e9;
  private lay: Layout | null = null;
  // Rückmeldung
  private flashKey = 0;
  private flashT = -1e9;
  private flashGood = true;
  private keyPopT = -1e9;
  // Auswertung
  private answers = 0;
  private correct = 0;
  private wrong = 0;
  private rts: number[] = [];
  private points = 0;
  private block: boolean[] = [];
  private segs: Segment[] = [];
  private startLevel = 1;
  private hinted = false;
  // Autoplay / Demo
  private planned = false;
  private demoCount = 0;
  private captionAt: Array<{ t: number; key: string }> = [];

  constructor(private readonly ctx: ExerciseContext) {
    const start = Math.round(ctx.startLevel ?? 1);
    this.level = ctx.mode === 'demo' ? 1 : clamp(Number.isFinite(start) ? start : 1, 1, MAX_LEVEL);
    this.startLevel = this.level;
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
    this.makeKey(this.level);
    this.nextTarget(t);
    if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.look);
  }

  // ------------------------------------------------------------------ Schlüssel

  private makeKey(level: number): void {
    const { rng } = this.ctx;
    this.level = level;
    this.n = PAIRS[level - 1];
    this.sym = rng.shuffle(pickSymbols(this.n, rng, this.sym));
    // Anzeige-Reihenfolge: zufällig, aber keine Ziffer an „ihrer“ Tastenposition
    const digits = Array.from({ length: this.n }, (_, i) => i + 1);
    let order = rng.shuffle([...digits]);
    for (let k = 0; k < 200 && order.some((d, i) => d === i + 1); k++) order = rng.shuffle([...digits]);
    this.legendOrder = order;
    this.bag = [];
    this.block = [];
    this.lay = this.computeLayout();
    if (!this.demo) this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${level}`);
  }

  private draw(): number {
    const { rng } = this.ctx;
    if (!this.bag.length) {
      this.bag = rng.shuffle(Array.from({ length: this.n }, (_, i) => i + 1));
      // keine direkte Wiederholung über die Beutel-Grenze hinweg
      if (this.bag[this.bag.length - 1] === this.target && this.bag.length > 1) {
        const j = rng.int(this.bag.length - 1);
        [this.bag[j], this.bag[this.bag.length - 1]] = [this.bag[this.bag.length - 1], this.bag[j]];
      }
    }
    return this.bag.pop()!;
  }

  private nextTarget(t: number): void {
    this.target = this.draw();
    this.phase = 'show';
    this.phaseT = t;
    this.onset = -1;
    this.planned = false;
    this.hinted = false;
  }

  // ------------------------------------------------------------------ Layout

  private computeLayout(): Layout {
    const { w, h, u } = this.ctx.stage;
    const n = this.n;
    const m = Math.max(14, u * 3);
    const top = Math.max(10, u * 2.2);
    const bottom = this.demo ? captionReserve(this.ctx.stage) : Math.max(14, u * 3);
    const availW = Math.max(1, w - 2 * m);
    const gap = clamp(u * 1.6, 8, 16);

    // Zahlentasten: Reihe, wenn jede Taste ≥ 72 px breit wird, sonst 3er-Raster wie am Telefon
    const rowKw = (availW - (n - 1) * gap) / n;
    const row = n <= 3 || rowKw >= 72;
    const cols = row ? n : 3;
    const rows = Math.ceil(n / cols);
    const kw = Math.max(64, Math.min(row ? 112 : 132, row ? rowKw : (availW - 2 * gap) / 3));
    const kh = clamp(Math.min(kw * 0.9, u * 11), 64, 96);
    const padW = cols * kw + (cols - 1) * gap;
    const padH = rows * kh + (rows - 1) * gap;
    const px0 = (w - padW) / 2;
    const py0 = h - bottom - padH;
    const keys: Rect[] = [];
    for (let i = 0; i < n; i++) {
      keys.push({ x: px0 + (i % cols) * (kw + gap), y: py0 + Math.floor(i / cols) * (kh + gap), w: kw, h: kh });
    }

    // Schlüssel: eine Reihe, bei wenig Platz zwei
    const maxLegW = Math.min(availW, 1040);
    let perRow = n;
    let cw = maxLegW / n;
    if (cw < 78 && n > 3) {
      perRow = Math.ceil(n / 2);
      cw = maxLegW / perRow;
    }
    cw = Math.min(cw, 124);
    const lrows = Math.ceil(n / perRow);
    let sym = clamp(cw * 0.56, 30, 64);
    const cellHFor = (sz: number) => sz * 2.2;
    const budget = Math.max(80, (h - top - bottom - padH) * 0.4);
    if (lrows * cellHFor(sym) > budget) sym = Math.max(26, budget / lrows / 2.2);
    const cellH = cellHFor(sym);
    const legW = perRow * cw;
    const legH = lrows * cellH;

    // Zielzeichen in der Mitte; bei viel Platz rücken Schlüssel und Tasten zusammen (kürzere Wege)
    let a0 = top + legH + gap * 1.5;
    let a1 = py0 - gap * 1.5;
    const areaH = Math.max(40, a1 - a0);
    const tsize = clamp(Math.min(areaH * 0.62, w * 0.34), 48, 180);
    const want = tsize * 1.5 + gap * 8;
    const shift = areaH > want ? (areaH - want) / 2 : 0;
    a0 += shift;
    a1 -= shift;
    for (const k of keys) k.y -= shift;
    const legend: Rect = { x: (w - legW) / 2, y: top + shift, w: legW, h: legH };
    const cells: Rect[] = [];
    for (let i = 0; i < n; i++) {
      const r = Math.floor(i / perRow);
      const inRow = Math.min(perRow, n - r * perRow);
      const off = ((perRow - inRow) * cw) / 2;
      cells.push({ x: legend.x + off + (i % perRow) * cw, y: legend.y + r * cellH, w: cw, h: cellH });
    }
    const cs = Math.min(a1 - a0, tsize * 1.5);
    const ty = (a0 + a1) / 2;
    const tx = w / 2;
    return {
      keys,
      perRow,
      keyPx: clamp(kh * 0.5, 26, 44),
      legend,
      cells,
      sym,
      digitPx: sym * 0.66,
      tx,
      ty,
      tsize,
      card: { x: tx - cs / 2, y: ty - cs / 2, w: cs, h: cs },
    };
  }

  resize(): void {
    this.lay = this.computeLayout();
    // Die Hand plant ihre Wege neu (Tasten liegen woanders)
    if (this.ctx.autoplay && this.phase === 'show') {
      this.ctx.ghost.clear();
      this.planned = false;
    }
  }

  // ------------------------------------------------------------------ Ablauf

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    const { ctx } = this;
    if (this.phase === 'show' && this.onset < 0) {
      this.onset = t;
      if (!this.demo && !this.segs.length) this.segs.push({ level: this.level, t0: t, t1: t, correct: 0 });
      else if (!this.demo && this.segs[this.segs.length - 1].level !== this.level) this.segs.push({ level: this.level, t0: t, t1: t, correct: 0 });
    }
    if (this.demo) {
      this.updateCaptions(t);
    } else {
      const el = t - this.sessionT0;
      ctx.hud.setProgress(el / this.duration);
      if (el >= this.duration) {
        this.finish(t);
        return;
      }
    }
    switch (this.phase) {
      case 'show':
        if (!this.hinted && this.onset >= 0 && t - this.onset > HINT_MS) {
          this.hinted = true;
          const L = this.lay!;
          ctx.hud.toast(ctx.texts.feedback.hint, 'info', { x: L.tx, y: L.card.y + L.card.h + 4, ms: 1800, size: clamp(ctx.stage.u * 3.6, 15, 26) });
        }
        if (ctx.autoplay && this.onset >= 0 && !this.planned) this.planGhost();
        break;
      case 'wrong':
        if (t - this.phaseT >= WRONG_MS) this.afterAnswer(t);
        break;
      case 'newkey':
        if (this.demo) {
          if (t - this.phaseT >= DEMO_NEWKEY_MS) {
            this.phase = 'done';
            ctx.finish({ primary: { key: 'perMin', value: 30, unit: 'count', better: 'higher' }, secondary: [], score: 0, level: 1 });
          }
        } else if (t - this.phaseT >= NEWKEY_MS) {
          this.nextTarget(t);
        }
        break;
      default:
        break;
    }
  }

  private updateCaptions(t: number): void {
    while (this.captionAt.length && t >= this.captionAt[0].t) {
      const c = this.captionAt.shift()!;
      this.ctx.hud.caption(this.ctx.texts.captions[c.key] ?? null);
    }
  }

  /** Geister-Hand: im Film erst zum Schlüssel zeigen, dann die Zahl tippen; im Test plausibel mitspielen */
  private planGhost(): void {
    const { ghost, rng } = this.ctx;
    const L = this.lay!;
    this.planned = true;
    const key = L.keys[this.target - 1];
    if (this.demo) {
      const k = this.demoCount;
      const slot = this.legendOrder.indexOf(this.target);
      const cell = L.cells[slot];
      const first = k === 0;
      const d1 = first ? 900 : 350;
      const m1 = first ? 750 : 550;
      const d2 = first ? 600 : 300;
      const m2 = first ? 650 : 520;
      // Fingerspitze knapp unter die Zahl im Schlüssel – Zeichen und Zahl bleiben sichtbar
      ghost.moveTo(cell.x + cell.w / 2, cell.y + cell.h + 4, { delay: d1, move: m1 });
      ghost.tap(key.x + key.w / 2, key.y + key.h * 0.45, { delay: d2, move: m2 });
      const now = this.onset;
      if (first) this.captionAt.push({ t: now + d1 + m1 + 100, key: 'tap' });
      else if (k === 1) this.captionAt.push({ t: now + 200, key: 'fast' });
      return;
    }
    // Spielmodus (nur Tests): meist richtig, manchmal daneben
    const think = (380 + 70 * this.n) * rng.range(0.75, 1.5);
    let d = this.target;
    if (rng.chance(0.08)) d = 1 + ((this.target + rng.int(this.n - 1)) % this.n);
    const r = L.keys[d - 1];
    ghost.tap(r.x + r.w * rng.range(0.3, 0.7), r.y + r.h * rng.range(0.3, 0.7), { delay: think, move: 220 });
  }

  // ------------------------------------------------------------------ Eingabe

  keyDown(key: string, t: number): void {
    const d = Number(key);
    if (!Number.isInteger(d) || d < 1 || d > this.n) return;
    this.answer(d, t);
  }

  pointerDown(p: PointerInfo): void {
    const L = this.lay;
    if (!L) return;
    const pad = Math.max(0, Math.min(8, this.ctx.stage.u));
    const i = L.keys.findIndex((r) => hit(r, p.x, p.y, pad));
    if (i >= 0) this.answer(i + 1, p.t);
  }

  private answer(d: number, t: number): void {
    if (this.phase !== 'show' || this.onset < 0 || t < this.onset) return;
    if (t - this.lastAnsT < DOUBLE_TAP_MS) return;
    this.lastAnsT = t;
    const { ctx } = this;
    const ok = d === this.target;
    const rt = t - this.onset;
    this.flashKey = d;
    this.flashT = t;
    this.flashGood = ok;
    if (!this.demo) {
      this.answers++;
      this.block.push(ok);
      if (ok) {
        this.correct++;
        this.rts.push(rt);
        this.points += 10 + 5 * (this.level - 1);
        const seg = this.segs[this.segs.length - 1];
        if (seg) seg.correct++;
        ctx.hud.setScore(this.points);
      } else {
        this.wrong++;
      }
    }
    if (ok) {
      ctx.sfx.good();
      if (this.demo) this.demoCount++;
      this.afterAnswer(t);
    } else {
      ctx.sfx.bad();
      ctx.ghost.clear();
      this.phase = 'wrong';
      this.phaseT = t;
    }
  }

  /** Nach einer Antwort: Stufe prüfen, dann nächstes Zeichen (oder neuer Schlüssel) */
  private afterAnswer(t: number): void {
    if (this.demo) {
      if (this.demoCount >= DEMO_TARGETS) {
        this.startNewKey(t, 2);
        this.ctx.hud.caption(this.ctx.texts.captions.shuffle);
        const { stage, ghost } = this.ctx;
        ghost.moveTo(stage.w * 0.93, this.lay!.ty, { delay: 250, move: 700 });
        return;
      }
      this.nextTarget(t);
      return;
    }
    if (this.block.length >= BLOCK) {
      const good = this.block.filter(Boolean).length;
      this.block = [];
      const remaining = this.duration - (t - this.sessionT0);
      const allowed = this.ctx.quick || remaining >= LOCK_MS;
      let next = this.level;
      if (allowed && good >= PROMOTE_MIN && this.level < MAX_LEVEL) next = this.level + 1;
      else if (allowed && good <= DEMOTE_MAX && this.level > 1) next = this.level - 1;
      if (next !== this.level) {
        const seg = this.segs[this.segs.length - 1];
        if (seg) seg.t1 = t;
        this.startNewKey(t, next);
        return;
      }
    }
    this.nextTarget(t);
  }

  private startNewKey(t: number, level: number): void {
    const { ctx } = this;
    this.makeKey(level);
    this.phase = 'newkey';
    this.phaseT = t;
    this.keyPopT = t;
    this.onset = -1;
    ctx.sfx.tap();
    ctx.ghost.clear();
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    if (!this.lay) return;
    this.drawLegend(g, t);
    this.drawTarget(g, t);
    this.drawKeys(g, t);
  }

  private drawLegend(g: CanvasRenderingContext2D, t: number): void {
    const L = this.lay!;
    const { u } = this.ctx.stage;
    const k = clamp((t - this.keyPopT) / 700, 0, 1);
    const lg = L.legend;
    if (k < 1) glow(g, lg.x + lg.w / 2, lg.y + lg.h / 2, Math.min(lg.w, lg.h * 2) * 0.35, ACCENT, 0.9 * (1 - k));
    fillRR(g, lg.x, lg.y, lg.w, lg.h, Math.min(18, u * 2.5), 'rgba(255,255,255,0.07)');
    g.save();
    rrPath(g, lg.x + 0.75, lg.y + 0.75, lg.w - 1.5, lg.h - 1.5, Math.min(18, u * 2.5));
    g.strokeStyle = k < 1 ? withAlpha('#C9A6E4', 0.35 + 0.5 * (1 - k)) : 'rgba(255,255,255,0.2)';
    g.lineWidth = 1.5;
    g.stroke();
    g.restore();
    const wrongShow = this.phase === 'wrong';
    const fade = this.ctx.reducedMotion ? 1 : easeOut(k * 1.4);
    this.legendOrder.forEach((d, i) => {
      const c = L.cells[i];
      const cx = c.x + c.w / 2;
      const symY = c.y + c.h * 0.34;
      const digY = c.y + c.h * 0.77;
      if (wrongShow && d === this.target) {
        fillRR(g, c.x + 4, c.y + 4, c.w - 8, c.h - 8, Math.min(14, u * 2), withAlpha(C.light, 0.16));
        g.save();
        rrPath(g, c.x + 4, c.y + 4, c.w - 8, c.h - 8, Math.min(14, u * 2));
        g.strokeStyle = C.light;
        g.lineWidth = Math.max(2, u * 0.4);
        g.stroke();
        g.restore();
      }
      // feine Trennlinien zwischen den Paaren
      if (i % L.perRow !== 0) {
        g.fillStyle = 'rgba(255,255,255,0.1)';
        g.fillRect(Math.round(c.x), c.y + c.h * 0.14, 1, c.h * 0.72);
      }
      g.fillStyle = 'rgba(255,255,255,0.14)';
      g.fillRect(cx - c.w * 0.22, c.y + c.h * 0.585, c.w * 0.44, 1.5);
      drawSymbol(g, this.sym[d - 1], cx, symY, L.sym, C.white, fade);
      text(g, String(d), cx, digY, L.digitPx, DIGIT_COLOR, { weight: 800, alpha: fade });
    });
  }

  private drawTarget(g: CanvasRenderingContext2D, t: number): void {
    const L = this.lay!;
    const { u } = this.ctx.stage;
    const c = L.card;
    const r = Math.min(28, c.w * 0.16);
    if (this.phase === 'newkey') {
      fillRR(g, c.x, c.y, c.w, c.h, r, 'rgba(255,255,255,0.04)');
      const size = clamp(L.tsize * 0.22, 17, 34);
      text(g, this.ctx.texts.feedback.newKey, L.tx, L.ty - size * 0.7, size, C.fg, { weight: 800 });
      text(g, `${this.n} ${this.ctx.texts.feedback.signs}`, L.tx, L.ty + size * 0.75, size * 0.85, C.dim, { weight: 700 });
      return;
    }
    fillRR(g, c.x, c.y, c.w, c.h, r, 'rgba(255,255,255,0.10)');
    g.save();
    rrPath(g, c.x + 0.75, c.y + 0.75, c.w - 1.5, c.h - 1.5, r);
    g.strokeStyle = this.phase === 'wrong' ? withAlpha(C.bad, 0.8) : 'rgba(255,255,255,0.24)';
    g.lineWidth = this.phase === 'wrong' ? Math.max(2.5, u * 0.45) : 1.5;
    g.stroke();
    g.restore();
    let dx = 0;
    if (this.phase === 'wrong' && !this.ctx.reducedMotion) {
      const k = clamp((t - this.phaseT) / 380, 0, 1);
      dx = Math.sin(k * Math.PI * 5) * (1 - k) * L.tsize * 0.06;
    }
    drawSymbol(g, this.sym[this.target - 1], L.tx + dx, L.ty, L.tsize, C.white);
  }

  private drawKeys(g: CanvasRenderingContext2D, t: number): void {
    const L = this.lay!;
    const { u } = this.ctx.stage;
    const newkey = this.phase === 'newkey';
    const wrongShow = this.phase === 'wrong';
    L.keys.forEach((r, i) => {
      const d = i + 1;
      const flashing = d === this.flashKey && t - this.flashT < (this.flashGood ? FLASH_MS : WRONG_MS);
      const state = newkey ? 'disabled' : flashing ? (this.flashGood ? 'good' : 'bad') : 'normal';
      button(g, r, state, Math.min(18, r.h * 0.24));
      const cx = r.x + r.w / 2;
      const cy = r.y + r.h / 2;
      text(g, String(d), cx, cy + 1, L.keyPx, newkey ? C.faint : C.white, { weight: 800 });
      if (flashing && !this.flashGood) {
        // Kreuz als Formsignal (nicht nur Farbe)
        const s = r.h * 0.14;
        const ox = r.x + r.w - s * 1.8;
        const oy = r.y + s * 1.8;
        g.save();
        g.strokeStyle = C.white;
        g.lineWidth = Math.max(2, s * 0.35);
        g.lineCap = 'round';
        g.beginPath();
        g.moveTo(ox - s * 0.6, oy - s * 0.6);
        g.lineTo(ox + s * 0.6, oy + s * 0.6);
        g.moveTo(ox + s * 0.6, oy - s * 0.6);
        g.lineTo(ox - s * 0.6, oy + s * 0.6);
        g.stroke();
        g.restore();
      }
      if (wrongShow && d === this.target) {
        g.save();
        rrPath(g, r.x - 3, r.y - 3, r.w + 6, r.h + 6, Math.min(20, r.h * 0.26));
        g.strokeStyle = C.light;
        g.lineWidth = Math.max(3, u * 0.55);
        g.stroke();
        g.restore();
      }
    });
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(t: number): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.ghost.clear();
    // Hauptwert: Tempo auf der Stufe, auf der die Sitzung endet
    const seg = this.segs[this.segs.length - 1];
    if (seg && (seg.level === this.level || seg.t1 <= seg.t0)) seg.t1 = t;
    const dur = seg ? Math.max(1000, seg.t1 - seg.t0) : this.duration;
    const perMin = seg ? (seg.correct * 60_000) / dur : 0;
    const acc = this.answers ? (100 * this.correct) / this.answers : 0;
    const med = this.rts.length ? median(this.rts) : NaN;
    let tip = 'great';
    if (this.answers >= 6 && acc < 85) tip = 'careful';
    else if (this.level > this.startLevel) tip = 'up';
    else if (Number.isFinite(med) && med > 1500) tip = 'learn';
    ctx.sfx.done();
    ctx.finish({
      primary: { key: 'perMin', value: Math.round(perMin), unit: 'count', better: 'higher' },
      secondary: [
        { key: 'accuracy', value: Math.round(acc), unit: 'percent' },
        ...(Number.isFinite(med) ? [{ key: 'medianTime', value: Math.round(med), unit: 'time' as const }] : []),
        { key: 'correct', value: this.correct, unit: 'count' },
        { key: 'level', value: this.level, unit: 'level' },
      ],
      score: this.points,
      level: this.level,
      tip,
    });
  }
}

export const zeichenCode: ExerciseDefinition = {
  id: 'zeichen-code',
  category: 'konzentration',
  minutes: 1,
  color: ACCENT,
  showsLevel: true,
  icon:
    '<rect x="4" y="4" width="40" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="3"/><path d="M11 8.5v7M7.5 12h7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><circle cx="24" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="m33 8.5 3.5 7h-7z" fill="currentColor"/><path d="M24 23.5v6M20.5 26.5 24 30l3.5-3.5" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="5" y="33" width="11" height="11" rx="3" fill="currentColor" opacity=".45"/><rect x="18.5" y="33" width="11" height="11" rx="3" fill="currentColor"/><rect x="32" y="33" width="11" height="11" rx="3" fill="currentColor" opacity=".45"/>',
  texts: { de, it },
  create: (ctx) => new ZeichenCode(ctx),
};
