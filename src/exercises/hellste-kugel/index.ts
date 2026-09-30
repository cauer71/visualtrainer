/**
 * Hellste Kugel – in einem Cluster aus grauen Kugeln die hellste finden und antippen.
 *
 * Gegenüber dem Vorbild („Zielerfassung“: Fadenkreuz mit Maus, Helligkeit als Deckkraft auf
 * Schwarz, Reihenfolge-Combo, roter Fehlerblitz):
 * - Tippen statt Maus; nur Graustufen auf mittelgrauem Grund – keine Farbunterscheidung nötig.
 * - Der Unterschied ist ein Weber-Kontrast in Leuchtdichte (sRGB-Kurve, nicht linear in Grauwerten),
 *   von 45 % bis 3 % in 20 Stufen; nie zwei gleich helle Kugeln, die hellste ist eindeutig.
 * - Mit der Stufe wächst auch der Cluster (6 → 16 Kugeln). Zielposition zufällig, nicht neben dem
 *   letzten Ziel.
 * - Adaptive Treppe (2-down/1-up ≈ 71 %); feste Zahl Durchgänge. Die Kugeln bleiben bis zur
 *   Antwort sichtbar, die Zeit wird nur protokolliert (Median der richtigen Antworten).
 * - Rückmeldung weich über Form (Ring, ✓, ✗, gestrichelter Ring), kein Blitz, kein Wackeln.
 * - Hinweis: Bildschirme zeigen Grautöne unterschiedlich (Gamma, Helligkeit, Spiegelungen) –
 *   die Stufen sind nur ein Vergleich mit sich selbst auf diesem Gerät, kein Sehtest.
 */
import { background, C, circle, fillRR, ring } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, median } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import {
  BASE_GRAY,
  clusterSizeFor,
  contrastFor,
  MAX_LEVEL,
  MIN_LEVEL,
  PANEL_GRAY,
  pickBall,
  pickTargetIndex,
  placeCluster,
  pointsFor,
  probCorrect,
  targetGray,
  type Pt,
} from './logic';
import { de, it } from './texts';

const TRIALS = 20;
const QUICK_TRIALS = 4;
/** Nach sehr langer Wartezeit wird die hellste Kugel gezeigt */
const TIMEOUT_MS = 30_000;
const GAP_MS = 260;
const FB_OK_MS = 850;
const FB_WRONG_MS = 1300;
const DEMO_END_MS = 1500;
const DOUBLE_TAP_MS = 150;

/** Intro-Film: zwei leichte Durchgänge, der zweite schon feiner */
const DEMO_TRIALS = [
  { n: 6, contrast: 0.45, tapAt: 1300 },
  { n: 8, contrast: 0.28, tapAt: 1000 },
];

const gray = (v: number): string => `rgb(${v},${v},${v})`;

type Phase = 'gap' | 'trial' | 'fb' | 'end' | 'done';
type Outcome = 'ok' | 'wrong' | 'timeout';

interface Layout {
  panel: { x: number; y: number; w: number; h: number };
  r: number;
  hitR: number;
  cx: number;
  cy: number;
  ax: number;
  ay: number;
}

/** Platz, den die Bildunterschrift im Intro-Film unten braucht (wie im Runner berechnet) */
function captionReserve(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
}

class HellsteKugel implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private phase: Phase = 'gap';
  private phaseT = 0;
  private lay: Layout | null = null;
  // aktueller Durchgang
  private level = MIN_LEVEL;
  private n = 6;
  private contrast = 0.45;
  private tGray = BASE_GRAY + 20;
  private pts: Pt[] = [];
  private target = 0;
  private tapped = -1;
  private outcome: Outcome = 'ok';
  /** Zeitpunkt, an dem der Reiz zum ersten Mal gezeichnet wurde (−1 = noch nicht) */
  private onset = -1;
  private lastTapT = -1e9;
  private lastTarget: Pt | null = null;
  // Auswertung
  private done = 0;
  private correct = 0;
  private points = 0;
  private times: number[] = [];
  private demoStep = 0;

  constructor(private readonly ctx: ExerciseContext) {
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 2, up: 1 });
    this.total = ctx.mode === 'demo' ? DEMO_TRIALS.length : ctx.quick ? QUICK_TRIALS : TRIALS;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    if (this.ctx.autoplay) {
      const rest = this.restPoint();
      ghost.moveTo(rest.x, rest.y, { move: 0 });
    }
    if (this.demo) hud.caption(texts.captions.find);
    this.newTrial(t);
  }

  // ------------------------------------------------------------------ Layout

  private computeLayout(n: number): Layout {
    const { w, h, u } = this.ctx.stage;
    const m = Math.max(8, u * 1.5);
    const bottom = this.demo ? captionReserve(this.ctx.stage) : m;
    const panel = { x: m, y: m, w: Math.max(40, w - 2 * m), h: Math.max(40, h - m - bottom) };
    const r = clamp(u * 4, 22, 40);
    const base = Math.sqrt(n) * r * 1.9;
    return {
      panel,
      r,
      hitR: Math.max(24, r * 1.3),
      cx: panel.x + panel.w / 2,
      cy: panel.y + panel.h / 2,
      ax: Math.max(r, Math.min(base * 1.3, panel.w / 2 - r - 4)),
      ay: Math.max(r, Math.min(base, panel.h / 2 - r - 4)),
    };
  }

  private place(keepTarget: boolean): void {
    const { rng } = this.ctx;
    const L = this.lay!;
    const { points } = placeCluster(() => rng.next(), this.n, { cx: L.cx, cy: L.cy, ax: L.ax, ay: L.ay }, 2.5 * L.r);
    this.pts = points;
    if (!keepTarget) this.target = pickTargetIndex(() => rng.next(), points, this.lastTarget, 4 * L.r);
    this.lastTarget = points[this.target];
  }

  // ------------------------------------------------------------------ Durchgänge

  private newTrial(t: number): void {
    const { hud, texts } = this.ctx;
    if (this.demo) {
      const d = DEMO_TRIALS[Math.min(this.demoStep, DEMO_TRIALS.length - 1)];
      this.level = MIN_LEVEL;
      this.n = d.n;
      this.contrast = d.contrast;
      hud.caption(this.demoStep === 0 ? texts.captions.find : texts.captions.finer);
    } else {
      this.level = this.stair.level;
      this.n = clusterSizeFor(this.level);
      this.contrast = contrastFor(this.level);
      hud.setLabel(`${texts.feedback.level} ${Math.floor(this.level + 1e-9)} · ${Math.min(this.done + 1, this.total)}/${this.total}`);
    }
    this.tGray = targetGray(BASE_GRAY, this.contrast);
    this.lay = this.computeLayout(this.n);
    this.place(false);
    this.phase = 'trial';
    this.phaseT = t;
    this.onset = -1;
    this.tapped = -1;
    if (this.ctx.autoplay) this.planGhost();
  }

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    if (!this.demo) this.ctx.hud.setProgress(this.done / this.total);
    switch (this.phase) {
      case 'gap':
        if (t - this.phaseT >= GAP_MS) this.newTrial(t);
        break;
      case 'trial':
        if (!this.demo && this.onset >= 0 && t - this.onset >= TIMEOUT_MS) this.onTimeout(t);
        break;
      case 'fb':
        if (t - this.phaseT >= (this.outcome === 'ok' ? FB_OK_MS : FB_WRONG_MS) + (this.demo ? 250 : 0)) this.afterFeedback(t);
        break;
      case 'end':
        if (t - this.phaseT >= DEMO_END_MS) {
          this.phase = 'done';
          this.ctx.finish({ primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: MIN_LEVEL });
        }
        break;
      default:
        break;
    }
  }

  private afterFeedback(t: number): void {
    if (this.demo) {
      if (this.demoStep + 1 < DEMO_TRIALS.length) {
        this.demoStep++;
        this.phase = 'gap';
        this.phaseT = t;
      } else {
        this.phase = 'end';
        this.phaseT = t;
      }
      return;
    }
    if (this.done >= this.total) {
      this.finish();
      return;
    }
    this.phase = 'gap';
    this.phaseT = t;
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'trial' || !this.lay || this.onset < 0 || p.t < this.onset) return;
    // Doppel-Tipp oder zweiter Finger kurz danach: nur die erste Antwort zählt
    if (p.t - this.lastTapT < DOUBLE_TAP_MS) return;
    const i = pickBall(this.pts, p.x, p.y, this.lay.hitR);
    // Tipp ins Leere: ignorieren
    if (i < 0) return;
    this.lastTapT = p.t;
    this.answer(i, p.t);
  }

  private answer(i: number, tp: number): void {
    const { ctx } = this;
    const ok = i === this.target;
    const rt = Math.max(0, tp - this.onset);
    this.tapped = i;
    this.outcome = ok ? 'ok' : 'wrong';
    this.phase = 'fb';
    this.phaseT = tp;
    ctx.ghost.clear();
    if (ok) ctx.sfx.good();
    else ctx.sfx.tap();
    if (!this.demo) {
      this.done++;
      if (ok) {
        this.correct++;
        this.points += pointsFor(this.level);
        this.times.push(rt);
      }
      this.stair.update(ok);
      ctx.hud.setScore(this.points);
    }
    this.toast(ok ? ctx.texts.feedback.correct : ctx.texts.feedback.wrong, ok ? 'good' : 'info');
    if (this.demo) {
      const rest = this.restPoint();
      ctx.ghost.moveTo(rest.x, rest.y, { delay: 450, move: 600 });
    }
  }

  private onTimeout(t: number): void {
    this.outcome = 'timeout';
    this.tapped = -1;
    this.phase = 'fb';
    this.phaseT = t;
    this.done++;
    this.stair.update(false);
    this.ctx.ghost.clear();
    this.ctx.sfx.tap();
    this.toast(this.ctx.texts.feedback.here, 'info');
  }

  private toast(text: string, kind: 'good' | 'info'): void {
    const { u } = this.ctx.stage;
    const L = this.lay!;
    const size = clamp(u * 4.6, 18, 34);
    this.ctx.hud.toast(text, kind, { x: L.cx, y: L.panel.y + size * 1.2, ms: 900, size });
  }

  // ------------------------------------------------------------------ Geister-Hand

  private restPoint(): Pt {
    const { w, h, u } = this.ctx.stage;
    const hs = clamp(u * 13, 48, 110);
    return { x: w - hs * 0.75, y: this.demo ? h - captionReserve(this.ctx.stage) - hs * 0.4 : h - hs * 0.7 };
  }

  private planGhost(): void {
    const { ghost, rng } = this.ctx;
    ghost.clear();
    const tp = this.pts[this.target];
    if (this.demo) {
      const d = DEMO_TRIALS[Math.min(this.demoStep, DEMO_TRIALS.length - 1)];
      ghost.tap(tp.x, tp.y, { delay: d.tapAt, move: 750 });
      return;
    }
    // Test-Autoplay: Trefferchance nach psychometrischer Kurve, sonst eine andere Kugel
    const search = (350 + 45 * this.n) * rng.range(0.8, 1.3);
    if (rng.chance(probCorrect(this.contrast, this.n))) {
      ghost.tap(tp.x, tp.y, { delay: search, move: 380 });
    } else {
      const others = this.pts.filter((_, i) => i !== this.target);
      const o = rng.pick(others);
      ghost.tap(o.x, o.y, { delay: search, move: 380 });
    }
  }

  resize(): void {
    if (!this.lay) return;
    // Bühne hat sich geändert (Tablet gedreht): Kugeln neu verteilen, der Durchgang beginnt neu
    this.lay = this.computeLayout(this.n);
    this.place(true);
    if (this.phase === 'trial') {
      this.onset = -1;
      if (this.ctx.autoplay) this.planGhost();
    }
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const L = this.lay;
    if (!L) return;
    // Spielfeld: mittelgrau
    fillRR(g, L.panel.x, L.panel.y, L.panel.w, L.panel.h, Math.min(28, L.r), gray(PANEL_GRAY));
    // In der kurzen Pause zwischen zwei Durchgängen bleibt nur das Spielfeld
    if (this.phase === 'gap') return;
    // Reizbeginn = Bild, in dem die Kugeln zum ersten Mal gezeichnet werden
    if (this.phase === 'trial' && this.onset < 0) this.onset = t;
    const fb = this.phase !== 'trial';
    this.pts.forEach((p, i) => {
      circle(g, p.x, p.y, L.r, gray(i === this.target ? this.tGray : BASE_GRAY));
    });
    if (!fb) return;
    const tp = this.pts[this.target];
    const lw = Math.max(3, L.r * 0.14);
    if (this.outcome === 'ok') {
      ring(g, tp.x, tp.y, L.r + lw * 1.6, C.white, lw);
      check(g, tp.x, tp.y, L.r, '#1F2937');
    } else {
      // Die hellste Kugel zeigen (gestrichelter Ring), falsche Wahl mit ✗ kennzeichnen
      ring(g, tp.x, tp.y, L.r + lw * 1.6, C.white, lw, [Math.max(6, L.r * 0.3), Math.max(5, L.r * 0.22)]);
      if (this.tapped >= 0) cross(g, this.pts[this.tapped].x, this.pts[this.tapped].y, L.r, '#1F2937');
    }
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.ghost.clear();
    ctx.hud.setProgress(1);
    ctx.sfx.done();
    const thr = this.stair.threshold();
    const acc = this.done ? (100 * this.correct) / this.done : 0;
    const tip = acc < 60 ? 'compare' : 'great';
    ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'accuracy', value: Math.round(acc), unit: 'percent' },
        ...(this.times.length ? [{ key: 'medTime', value: Math.round(median(this.times)), unit: 'time' as const }] : []),
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip,
    });
  }
}

/** ✓ auf der Kugel */
function check(g: CanvasRenderingContext2D, x: number, y: number, r: number, color: string): void {
  g.save();
  g.strokeStyle = color;
  g.lineWidth = Math.max(3, r * 0.2);
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(x - r * 0.42, y + r * 0.02);
  g.lineTo(x - r * 0.12, y + r * 0.32);
  g.lineTo(x + r * 0.46, y - r * 0.3);
  g.stroke();
  g.restore();
}

/** ✗ auf der Kugel */
function cross(g: CanvasRenderingContext2D, x: number, y: number, r: number, color: string): void {
  g.save();
  g.strokeStyle = color;
  g.lineWidth = Math.max(3, r * 0.2);
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(x - r * 0.34, y - r * 0.34);
  g.lineTo(x + r * 0.34, y + r * 0.34);
  g.moveTo(x + r * 0.34, y - r * 0.34);
  g.lineTo(x - r * 0.34, y + r * 0.34);
  g.stroke();
  g.restore();
}

export const hellsteKugel: ExerciseDefinition = {
  id: 'hellste-kugel',
  category: 'wahrnehmung',
  minutes: 2,
  color: '#8C6D4A',
  showsLevel: true,
  icon:
    '<g fill="currentColor" opacity=".38"><circle cx="11" cy="13" r="6"/><circle cx="31" cy="9.5" r="5"/><circle cx="39" cy="28" r="6"/><circle cx="10" cy="33" r="5.5"/><circle cx="25" cy="41" r="4.8"/></g><circle cx="23" cy="24" r="8.5" fill="currentColor"/><circle cx="20" cy="21" r="2.8" fill="#fff" opacity=".55"/>',
  texts: { de, it },
  create: (ctx) => new HellsteKugel(ctx),
};
