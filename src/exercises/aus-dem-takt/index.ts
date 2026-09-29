/**
 * Aus dem Takt – welches Feld pulsiert in einem anderen Tempo?
 *
 * Verbesserungen gegenüber dem Vorbild:
 * - Alle Felder gleich hell und gleich stark: Das Feld ist nur über den Rhythmus zu finden
 *   (im Vorbild pulsierte es zusätzlich doppelt so hell).
 * - Zufällige Phase pro Feld: kein Gleichtakt der normalen Felder als Hinweis.
 * - Grundtempo pro Durchgang zufällig (1,0–1,8 Hz), Abweichung zufällig schneller oder langsamer –
 *   ein festes Tempo kann man sich nicht merken.
 * - Adaptiver Unterschied: 2-down/1-up (≈ 71 % richtig), Δ = 40 % … 4,3 % (Schrittfaktor 1,25).
 * - Antwort erst nach 2 s Zuschauen (der Vergleich braucht mehrere Pulse; Raten lohnt nicht).
 *
 * Sicherheit (Photosensitivität – bewusst strenger als WCAG 2.3.1, siehe docs/wissenschaft/03, 4.7):
 * - höchstens 2,5 Hz, Sinus in linearer Leuchtdichte, weiches Ein- und Ausblenden
 * - Hub nur sRGB-Grau 30 ↔ 60 (ΔL ≈ 0,032 < 0,033) auf dunklem Grund ≈ 20, kein Rot als Pulsfarbe
 * - pulsierende Fläche ≤ 22 % der Bühne; Pulsieren höchstens ≈ 9 s, danach ≥ 2 s Standbild
 * - Rückmeldung als statische Rahmen (kein Blinken)
 */
import { background, C, circle, fillRR, rrPath } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeInOut, mean } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, Metric, PointerInfo } from '../../core/types';
import { de, it } from './texts';

// ---------------------------------------------------------------------------
// Parameter

const GRID = 4;
const TRIALS = 12;
const TRIALS_QUICK = 2;
const LEVEL_MIN = 1;
const LEVEL_MAX = 11;
/** Unterschied: Δ(L) = 0,40 / 1,25^(L−1) → L1 40 %, L6 13 %, L11 4,3 % */
const DELTA_START = 0.4;
const DELTA_STEP = 1.25;
/** Grundtempo pro Durchgang (Hz) */
const F0_MIN = 1.0;
const F0_MAX = 1.8;
/** Harte Obergrenze (Hz) – darüber wird die langsamere Variante genommen */
const MAX_HZ = 2.5;

const MS = {
  /** Standbild vor dem Pulsieren */
  rest: 1000,
  /** Pulsieren sanft einblenden */
  rampIn: 500,
  /** frühestens dann zählt ein Tipp */
  minWatch: 2000,
  /** danach wird die Lösung gezeigt */
  limit: 9000,
  /** Pulsieren sanft ausblenden (Teil der Rückmeldung) */
  rampOut: 250,
  /** Rückmeldung; zusammen mit `rest` ≥ 2 s Standbild */
  feedback: 1300,
  /** Mindestabstand zwischen zwei „Erst kurz zuschauen“-Hinweisen */
  earlyHint: 700,
};
/** Falsche Antwort in so kurzer Zeit gilt als „zu schnell getippt“ */
const FAST_WRONG_MS = 2800;
/** Anteil der Bühne, den die pulsierenden Felder höchstens bedecken */
const AREA_MAX = 0.22;
const MIN_CELL = 60;
const MIN_GAP = 18;

/** Intro-Film: 3 × 3, deutlicher Unterschied (40 % schneller) */
const DEMO = { grid: 3, f0: 1.2, delta: 0.4, wait: [2600, 2400], trials: 2 };

const TAU = Math.PI * 2;

// ---------------------------------------------------------------------------
// Farben: Grau 30 ↔ 60 (leicht kühl getönt), in linearer Leuchtdichte interpoliert

const PULSE_LO = [30, 30, 34] as const;
const PULSE_HI = [60, 60, 66] as const;
const PANEL = 'rgb(20,21,26)';
const EDGE = 'rgb(82,88,102)';

function toLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function toSrgb(l: number): number {
  const s = l <= 0.0031308 ? l * 12.92 : 1.055 * l ** (1 / 2.4) - 0.055;
  return Math.round(clamp(s, 0, 1) * 255);
}

/** 256 Helligkeitsstufen (0 = dunkel, 255 = hell) als fertige Farbwerte */
const PULSE_LUT: string[] = Array.from({ length: 256 }, (_, i) => {
  const k = i / 255;
  const ch = (j: number) => toSrgb(toLinear(PULSE_LO[j]) + (toLinear(PULSE_HI[j]) - toLinear(PULSE_LO[j])) * k);
  return `rgb(${ch(0)},${ch(1)},${ch(2)})`;
});

// ---------------------------------------------------------------------------
// Helfer

function fill(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''));
}

/** Platz, den die Bildunterschrift im Intro-Film unten belegt (wie im Runner berechnet) */
function captionSpace(h: number, u: number): number {
  return h * 0.05 + clamp(u * 4.6, 14, 30) * 2.1 + Math.max(6, u);
}

function deltaFor(level: number): number {
  return DELTA_START / Math.pow(DELTA_STEP, level - 1);
}

function checkMark(g: CanvasRenderingContext2D, x: number, y: number, s: number, color: string, lw: number): void {
  g.save();
  g.strokeStyle = color;
  g.lineWidth = lw;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(x - s * 0.44, y + s * 0.02);
  g.lineTo(x - s * 0.14, y + s * 0.32);
  g.lineTo(x + s * 0.46, y - s * 0.3);
  g.stroke();
  g.restore();
}

function crossMark(g: CanvasRenderingContext2D, x: number, y: number, s: number, color: string, lw: number): void {
  g.save();
  g.strokeStyle = color;
  g.lineWidth = lw;
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(x - s * 0.3, y - s * 0.3);
  g.lineTo(x + s * 0.3, y + s * 0.3);
  g.moveTo(x + s * 0.3, y - s * 0.3);
  g.lineTo(x - s * 0.3, y + s * 0.3);
  g.stroke();
  g.restore();
}

// ---------------------------------------------------------------------------

interface Layout {
  n: number;
  x0: number;
  y0: number;
  cell: number;
  gap: number;
  side: number;
  rad: number;
}

interface Trial {
  odd: number;
  f0: number;
  delta: number;
  level: number;
  faster: boolean;
  freq: number[];
  phi: number[];
  /** Beginn des Pulsierens (ms) */
  onset: number;
  tapped: number | null;
  rt: number | null;
  correct: boolean;
  timeout: boolean;
  /** Tipps vor Ablauf der Mindest-Zuschauzeit */
  early: number;
}

type Phase = 'rest' | 'pulse' | 'feedback' | 'done';

class AusDemTakt implements Exercise {
  private readonly demo: boolean;
  private readonly n: number;
  private readonly total: number;
  private readonly stair: Staircase;
  private phase: Phase = 'rest';
  private phaseT = 0;
  private idx = 0;
  private trial: Trial | null = null;
  private results: Trial[] = [];
  private lastOdd = -1;
  private correct = 0;
  private score = 0;
  private lastHint = -1e9;

  constructor(private ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.n = this.demo ? DEMO.grid : GRID;
    this.total = this.demo ? DEMO.trials : ctx.quick ? TRIALS_QUICK : TRIALS;
    this.stair = new Staircase({ start: ctx.startLevel ?? 1, min: LEVEL_MIN, max: LEVEL_MAX, down: 2, up: 1 });
  }

  start(t: number): void {
    const { hud, texts } = this.ctx;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.newTrial(t);
    if (this.demo) {
      hud.caption(texts.captions.find);
      this.park(0, 500);
    }
  }

  // --- Layout ---------------------------------------------------------------

  private layout(): Layout {
    const { w, h, u } = this.ctx.stage;
    const n = this.n;
    const m = Math.max(12, u * 3);
    const bottom = this.demo ? captionSpace(h, u) : m;
    const availW = Math.max(0, w - 2 * m);
    const availH = Math.max(0, h - m - bottom);
    const S = Math.min(availW, availH);
    // Größte Feldgröße, die ins Quadrat passt (Lücke = max(18 px, 20 % der Feldgröße)) …
    let fitCell = S / (n + 0.2 * (n - 1));
    if (fitCell * 0.2 < MIN_GAP) fitCell = (S - MIN_GAP * (n - 1)) / n;
    // … aber die pulsierende Fläche bleibt klein; Touch-Mindestgröße 60 px
    const areaCell = Math.sqrt(AREA_MAX * w * h) / n;
    const cell = Math.max(MIN_CELL, Math.min(fitCell, areaCell));
    const gap = Math.max(MIN_GAP, cell * 0.2);
    const side = n * cell + (n - 1) * gap;
    return { n, x0: (w - side) / 2, y0: m + (availH - side) / 2, cell, gap, side, rad: cell * 0.16 };
  }

  private cellXY(L: Layout, i: number): { x: number; y: number } {
    return { x: L.x0 + (i % L.n) * (L.cell + L.gap), y: L.y0 + Math.floor(i / L.n) * (L.cell + L.gap) };
  }

  private center(L: Layout, i: number): { x: number; y: number } {
    const p = this.cellXY(L, i);
    return { x: p.x + L.cell / 2, y: p.y + L.cell / 2 };
  }

  /** Feld unter dem Finger (Lücken zählen zum nächsten Feld) */
  private cellAt(x: number, y: number): number | null {
    const L = this.layout();
    const step = L.cell + L.gap;
    const cx = Math.floor((x - L.x0 + L.gap / 2) / step);
    const cy = Math.floor((y - L.y0 + L.gap / 2) / step);
    if (cx < 0 || cy < 0 || cx >= L.n || cy >= L.n) return null;
    return cy * L.n + cx;
  }

  // --- Ablauf ---------------------------------------------------------------

  private newTrial(t: number): void {
    const { rng, hud, texts } = this.ctx;
    const cells = this.n * this.n;
    const level = this.demo ? LEVEL_MIN : this.stair.level;
    const delta = this.demo ? DEMO.delta : deltaFor(level);
    const f0 = this.demo ? DEMO.f0 : rng.range(F0_MIN, F0_MAX);
    let faster = this.demo ? true : rng.chance(0.5);
    if (f0 * (1 + delta) > MAX_HZ) faster = false;
    const f1 = Math.min(MAX_HZ, faster ? f0 * (1 + delta) : f0 * (1 - delta));
    let odd = rng.int(cells);
    if (odd === this.lastOdd && cells > 1) odd = (odd + 1 + rng.int(cells - 1)) % cells;
    this.lastOdd = odd;
    this.trial = {
      odd,
      f0,
      delta,
      level,
      faster,
      freq: Array.from({ length: cells }, (_, i) => (i === odd ? f1 : f0)),
      phi: Array.from({ length: cells }, () => rng.range(0, TAU)),
      onset: 0,
      tapped: null,
      rt: null,
      correct: false,
      timeout: false,
      early: 0,
    };
    this.phase = 'rest';
    this.phaseT = t;
    if (!this.demo) hud.setLabel(fill(texts.feedback.level, { n: Math.floor(level) }));
  }

  update(_dt: number, t: number): void {
    const tr = this.trial;
    if (!tr) return;
    if (this.phase === 'rest') {
      if (t - this.phaseT >= MS.rest) {
        this.phase = 'pulse';
        this.phaseT = t;
        tr.onset = t;
        this.onOnset();
      }
    } else if (this.phase === 'pulse') {
      if (t - tr.onset >= MS.limit) this.answer(null, t);
    } else if (this.phase === 'feedback') {
      if (t - this.phaseT >= MS.feedback) this.next(t);
    }
  }

  private answer(cell: number | null, t: number): void {
    const tr = this.trial;
    if (!tr) return;
    const { sfx, hud, texts } = this.ctx;
    tr.tapped = cell;
    tr.timeout = cell === null;
    tr.correct = cell === tr.odd;
    tr.rt = cell === null ? null : Math.max(0, t - tr.onset);
    this.phase = 'feedback';
    this.phaseT = t;
    if (tr.correct) sfx.good();
    else sfx.bad();
    if (tr.timeout) {
      const c = this.center(this.layout(), tr.odd);
      hud.toast(texts.feedback.timeout, 'info', { x: c.x, y: c.y, ms: 1200 });
    }
    if (this.demo) {
      hud.caption(texts.captions.good);
      this.park(350, 600);
      return;
    }
    this.results.push(tr);
    if (tr.correct) {
      this.correct++;
      this.score += Math.round(10 * Math.pow(DELTA_STEP, tr.level - 1));
    }
    this.stair.update(tr.correct);
    hud.setScore(this.correct);
    hud.setProgress(this.results.length / this.total);
  }

  private next(t: number): void {
    this.idx++;
    if (this.idx >= this.total) {
      this.phase = 'done';
      this.finish();
      return;
    }
    this.newTrial(t);
    if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.again);
  }

  pointerDown(p: PointerInfo): void {
    const tr = this.trial;
    if (this.phase !== 'pulse' || !tr) return;
    const cell = this.cellAt(p.x, p.y);
    if (cell === null) return;
    if (p.t - tr.onset < MS.minWatch) {
      // Zu früh: noch nicht werten, freundlich ans Zuschauen erinnern
      tr.early++;
      if (p.t - this.lastHint >= MS.earlyHint) {
        this.lastHint = p.t;
        const L = this.layout();
        const y = Math.max(28, (L.y0 - L.gap) / 2);
        this.ctx.hud.toast(this.ctx.texts.feedback.early, 'info', { x: this.ctx.stage.w / 2, y, ms: 1100 });
      }
      return;
    }
    // Nur die erste gültige Antwort pro Durchgang zählt (Phase wechselt sofort)
    this.answer(cell, p.t);
  }

  // --- Geister-Hand ---------------------------------------------------------

  /** Hand rechts neben dem Raster parken (nicht über den Feldern) */
  private park(delay: number, move: number): void {
    const { w, u } = this.ctx.stage;
    const L = this.layout();
    const size = clamp(u * 13, 48, 110);
    const right = L.x0 + L.side + L.gap;
    const x = Math.min(w - size * 0.6, right + Math.max(size * 0.4, (w - right) * 0.3));
    this.ctx.ghost.moveTo(x, L.y0 + L.side * 0.45, { delay, move });
  }

  private onOnset(): void {
    const { ghost, rng, autoplay } = this.ctx;
    const tr = this.trial;
    if (!autoplay || !tr) return;
    const L = this.layout();
    if (this.demo) {
      const c = this.center(L, tr.odd);
      const wait = DEMO.wait[this.idx] ?? 2500;
      ghost.tap(c.x, c.y, { delay: wait - 750, move: 750 });
      return;
    }
    // Test-Autoplay: bei großem Unterschied fast immer richtig, bei kleinem öfter falsch
    if (rng.chance(0.05)) return; // Zeit ablaufen lassen
    const cells = L.n * L.n;
    const pOk = clamp(0.3 + 2.2 * tr.delta, 0.3, 0.97);
    const cell = rng.chance(pOk) ? tr.odd : (tr.odd + 1 + rng.int(cells - 1)) % cells;
    const c = this.center(L, cell);
    const rt = rng.range(MS.minWatch + 300, 5200);
    ghost.tap(c.x, c.y, { delay: rt - 420, move: 420 });
  }

  // --- Zeichnen -------------------------------------------------------------

  /** Pulsstärke 0..1: sanft ein, nach der Antwort sanft aus, sonst Standbild */
  private amp(t: number): number {
    const tr = this.trial;
    if (!tr) return 0;
    const inK = easeInOut((t - tr.onset) / MS.rampIn);
    if (this.phase === 'pulse') return inK;
    if (this.phase === 'feedback') return Math.min(inK, 1 - easeInOut((t - this.phaseT) / MS.rampOut));
    return 0;
  }

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const L = this.layout();
    // dunkler, ruhiger Grund hinter dem Raster (≈ sRGB 20)
    fillRR(g, L.x0 - L.gap, L.y0 - L.gap, L.side + 2 * L.gap, L.side + 2 * L.gap, L.rad + L.gap * 0.7, PANEL);
    const tr = this.trial;
    const a = this.amp(t);
    const tau = tr ? (t - tr.onset) / 1000 : 0;
    const edge = Math.max(1.5, L.cell * 0.016);
    for (let i = 0; i < L.n * L.n; i++) {
      const { x, y } = this.cellXY(L, i);
      const b = tr && a > 0 ? 0.5 + 0.5 * a * Math.sin(TAU * tr.freq[i] * tau + tr.phi[i]) : 0.5;
      fillRR(g, x, y, L.cell, L.cell, L.rad, PULSE_LUT[Math.round(clamp(b, 0, 1) * 255)]);
      // feine, statische Kontur: Felder bleiben auch im dunklen Moment klar erkennbar
      rrPath(g, x + edge / 2, y + edge / 2, L.cell - edge, L.cell - edge, Math.max(0, L.rad - edge / 2));
      g.strokeStyle = EDGE;
      g.lineWidth = edge;
      g.stroke();
    }
    if (tr && (this.phase === 'feedback' || this.phase === 'done')) this.drawFeedback(g, t, L, tr);
  }

  /** Statische Rahmen + Symbol (✓ / ✗), kurz eingeblendet – kein Blinken */
  private drawFeedback(g: CanvasRenderingContext2D, t: number, L: Layout, tr: Trial): void {
    const lw = Math.max(3, L.cell * 0.06);
    const R = Math.max(14, L.cell * 0.2);
    g.save();
    g.globalAlpha = clamp((t - this.phaseT) / 120, 0, 1);
    const frame = (i: number, color: string) => {
      const { x, y } = this.cellXY(L, i);
      rrPath(g, x + lw / 2, y + lw / 2, L.cell - lw, L.cell - lw, Math.max(0, L.rad - lw / 2));
      g.strokeStyle = color;
      g.lineWidth = lw;
      g.stroke();
    };
    const badge = (i: number, color: string, ok: boolean) => {
      const c = this.center(L, i);
      circle(g, c.x, c.y, R + Math.max(2, R * 0.12), 'rgba(5,10,20,0.6)');
      circle(g, c.x, c.y, R, color);
      if (ok) checkMark(g, c.x, c.y, R * 1.15, '#FFFFFF', Math.max(3, R * 0.24));
      else crossMark(g, c.x, c.y, R * 1.15, '#FFFFFF', Math.max(3, R * 0.24));
    };
    if (tr.correct) {
      frame(tr.odd, C.good);
      badge(tr.odd, C.good, true);
    } else {
      if (tr.tapped !== null) {
        frame(tr.tapped, C.bad);
        badge(tr.tapped, C.bad, false);
      }
      frame(tr.odd, C.good);
      // Zeit abgelaufen: nur Rahmen + „Hier war es!“; sonst zusätzlich ✓ am richtigen Feld
      if (!tr.timeout) badge(tr.odd, C.good, true);
    }
    g.restore();
  }

  // --- Ergebnis -------------------------------------------------------------

  private finish(): void {
    const { ctx } = this;
    if (this.demo) {
      ctx.finish({ primary: { key: 'level', value: 1, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: 1 });
      return;
    }
    const thr = this.stair.threshold();
    const n = this.results.length;
    const ok = this.results.filter((r) => r.correct);
    const accuracy = n ? (ok.length / n) * 100 : 0;
    const times = this.results.filter((r) => r.rt !== null).map((r) => r.rt as number);
    const fastWrong = this.results.filter((r) => !r.correct && r.rt !== null && r.rt < FAST_WRONG_MS).length;
    const rushed = this.results.filter((r) => r.early > 0).length;
    const timeouts = this.results.filter((r) => r.timeout).length;
    let tip = 'great';
    if (fastWrong >= 2 || rushed >= 3) tip = 'watch';
    else if (accuracy < 60 || timeouts >= 2) tip = 'soft';
    const secondary: Metric[] = [{ key: 'accuracy', value: Math.round(accuracy), unit: 'percent' }];
    if (ok.length) {
      secondary.push({ key: 'smallest', value: Math.round(Math.min(...ok.map((r) => r.delta)) * 1000) / 10, unit: 'percent' });
    }
    if (times.length) secondary.push({ key: 'time', value: Math.round(mean(times)), unit: 'time' });
    ctx.hud.setProgress(1);
    ctx.sfx.done();
    ctx.finish({
      primary: { key: 'level', value: Math.round(thr), unit: 'level', better: 'higher' },
      secondary,
      score: this.score,
      level: nextStartLevel(thr, LEVEL_MIN, LEVEL_MAX),
      tip,
    });
  }
}

export const ausDemTakt: ExerciseDefinition = {
  id: 'aus-dem-takt',
  category: 'wahrnehmung',
  minutes: 1,
  color: '#8C6D4A',
  icon:
    '<g fill="currentColor"><rect x="5" y="5" width="10" height="10" rx="2.5" opacity=".4"/><rect x="19" y="5" width="10" height="10" rx="2.5" opacity=".4"/><rect x="33" y="5" width="10" height="10" rx="2.5" opacity=".4"/><rect x="5" y="19" width="10" height="10" rx="2.5" opacity=".4"/><rect x="19" y="19" width="10" height="10" rx="2.5" opacity=".4"/><rect x="33" y="19" width="10" height="10" rx="2.5"/><rect x="5" y="33" width="10" height="10" rx="2.5" opacity=".4"/><rect x="19" y="33" width="10" height="10" rx="2.5" opacity=".4"/><rect x="33" y="33" width="10" height="10" rx="2.5" opacity=".4"/></g><rect x="30" y="16" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" stroke-width="2"/>',
  texts: { de, it },
  warning: 'flicker',
  showsLevel: true,
  create: (ctx) => new AusDemTakt(ctx),
};
