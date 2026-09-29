/**
 * Blitzreaktion – einfache visuelle Reaktionszeit, zentral und peripher.
 *
 * Verbesserungen gegenüber dem Vorbild:
 * - "Nicht alternde" Wartezeiten (Sockel + Exponentialverteilung) → der Zeitpunkt
 *   ist nicht vorhersagbar, Raten lohnt sich nicht.
 * - Antworten < 100 ms gelten als Antizipation ("zu früh"), nicht als Treffer.
 * - Auswertung über den Median (robust gegen Ausreißer), getrennt nach Mitte/Rand.
 * - Tippen irgendwo auf dem Bildschirm: gemessen wird das Erkennen, nicht das Zielen.
 * - Lichter auch in der Peripherie (Blick bleibt in der Mitte).
 */
import { background, C, orb } from '../../core/draw';
import { median, sd } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { de, it } from './texts';

const TRIALS = 20;
const ANTICIPATION_MS = 100;
const LAPSE_MS = 1500;
const FEEDBACK_MS = 650;

type Phase = 'wait' | 'stim' | 'feedback' | 'done';
interface Trial {
  /** Exzentrizität 0 (Mitte) … 1 (Rand) */
  ecc: number;
  angle: number;
}
type DemoStep = 'center' | 'edge' | 'early' | 'center2';

function foreperiod(ctx: ExerciseContext): number {
  // 900 ms Sockel + exponentiell (Mittel 900 ms), gekappt → Gesamt 0,9–3,5 s
  return 900 + Math.min(2600, ctx.rng.exp(900));
}

class Blitzreaktion implements Exercise {
  private phase: Phase = 'wait';
  private phaseT = 0;
  private fp = 1200;
  private onset = 0;
  private idx = 0;
  private plan: Trial[] = [];
  private rts: Array<{ rt: number; edge: boolean }> = [];
  private early = 0;
  private lapses = 0;
  private flashUntil = 0;
  // Demo
  private demoSteps: DemoStep[] = ['center', 'edge', 'early', 'center2'];
  private demoTapPlanned = false;

  constructor(private ctx: ExerciseContext) {}

  private get total(): number {
    if (this.ctx.mode === 'demo') return this.demoSteps.length;
    return this.ctx.quick ? 3 : TRIALS;
  }

  start(t: number): void {
    const { rng } = this.ctx;
    if (this.ctx.mode === 'demo') {
      this.plan = [
        { ecc: 0, angle: 0 },
        { ecc: 0.9, angle: -0.6 },
        { ecc: 0, angle: 0 },
        { ecc: 0.6, angle: 2.5 },
      ];
    } else {
      // 8 × Mitte, 6 × mittlerer Ring, 6 × äußerer Ring; die ersten 3 immer in der Mitte (Aufwärmen)
      const n = this.total;
      const rest: Trial[] = [];
      const nCenter = Math.max(0, Math.round(n * 0.4) - 3);
      const nEdge = n - 3 - nCenter;
      for (let i = 0; i < nCenter; i++) rest.push({ ecc: 0, angle: 0 });
      for (let i = 0; i < nEdge; i++) rest.push({ ecc: i % 2 ? 0.95 : 0.55, angle: rng.range(0, Math.PI * 2) });
      rng.shuffle(rest);
      this.plan = [...Array.from({ length: Math.min(3, n) }, () => ({ ecc: 0, angle: 0 })), ...rest].slice(0, n);
    }
    this.newWait(t);
    this.ctx.hud.setScore(null);
    this.updateHud();
    if (this.ctx.mode === 'demo') this.ctx.hud.caption(this.ctx.texts.captions.look);
  }

  private newWait(t: number, extra = 0): void {
    this.phase = 'wait';
    this.phaseT = t;
    this.fp = (this.ctx.mode === 'demo' ? 1100 + this.ctx.rng.range(0, 500) : foreperiod(this.ctx)) + extra;
    this.demoTapPlanned = false;
  }

  private updateHud(): void {
    this.ctx.hud.setProgress(this.idx / this.total);
    this.ctx.hud.setLabel(`${Math.min(this.idx + 1, this.total)} / ${this.total}`);
  }

  private pos(): { x: number; y: number; r: number } {
    const { w, h, u } = this.ctx.stage;
    const r = Math.max(18, u * 5.5);
    const tr = this.plan[this.idx] ?? { ecc: 0, angle: 0 };
    const rx = w / 2 - r - u * 4;
    const ry = h / 2 - r - u * 4;
    return { x: w / 2 + Math.cos(tr.angle) * rx * tr.ecc, y: h / 2 + Math.sin(tr.angle) * ry * tr.ecc, r };
  }

  update(_dt: number, t: number): void {
    if (this.phase === 'wait' && t - this.phaseT >= this.fp) {
      this.phase = 'stim';
      this.onset = t;
      this.phaseT = t;
      if (this.ctx.mode === 'demo') {
        const step = this.demoSteps[this.idx];
        this.ctx.hud.caption(step === 'edge' ? this.ctx.texts.captions.edge : this.ctx.texts.captions.tap);
      }
    } else if (this.phase === 'stim' && t - this.onset >= LAPSE_MS) {
      this.lapses++;
      this.ctx.sfx.bad();
      this.ctx.hud.toast(this.ctx.texts.feedback.missed, 'bad');
      this.toFeedback(t);
    } else if (this.phase === 'feedback' && t - this.phaseT >= FEEDBACK_MS) {
      this.idx++;
      this.updateHud();
      if (this.idx >= this.total) {
        this.phase = 'done';
        this.finish();
        return;
      }
      this.newWait(t);
      if (this.ctx.mode === 'demo') {
        const step = this.demoSteps[this.idx];
        this.ctx.hud.caption(step === 'early' ? this.ctx.texts.captions.early : this.ctx.texts.captions.look);
      }
    }
    if (this.ctx.autoplay) this.autoplay(t);
  }

  /** Geister-Hand: tippt "in place" unten rechts, wie ein ruhender Finger. */
  private autoplay(t: number): void {
    const { ghost, stage, rng, mode } = this.ctx;
    const restX = stage.w * 0.84;
    const restY = stage.h * 0.62;
    if (this.phase === 'wait' && !this.demoTapPlanned) {
      this.demoTapPlanned = true;
      if (ghost.idle) ghost.moveTo(restX, restY, { move: 400 });
      const step = mode === 'demo' ? this.demoSteps[this.idx] : null;
      const earlyTap = step === 'early' || (mode === 'play' && rng.chance(0.08));
      if (earlyTap) ghost.tap(restX, restY, { delay: Math.max(200, this.fp * 0.55), move: 0 });
    }
    if (this.phase === 'stim' && t === this.onset) {
      ghost.tap(restX, restY, { delay: mode === 'demo' ? 280 : rng.range(230, 420), move: 0 });
    }
  }

  private toFeedback(t: number): void {
    this.phase = 'feedback';
    this.phaseT = t;
  }

  pointerDown(p: PointerInfo): void {
    const { sfx, hud, texts, fmt } = this.ctx;
    if (this.phase === 'wait' || (this.phase === 'stim' && p.t - this.onset < ANTICIPATION_MS)) {
      // Zu früh: Versuch neu starten (mit etwas Extra-Pause)
      this.early++;
      sfx.bad();
      hud.toast(texts.feedback.early, 'bad');
      this.ctx.ghost.clear();
      this.newWait(p.t, 400);
      if (this.ctx.mode === 'demo') {
        // Demo: nach dem gezeigten Fehlstart als normalen Versuch fortsetzen
        this.demoSteps[this.idx] = 'center2';
        this.demoTapPlanned = true;
      }
      return;
    }
    if (this.phase !== 'stim') return;
    const rt = p.t - this.onset;
    const tr = this.plan[this.idx];
    this.rts.push({ rt, edge: tr.ecc > 0 });
    sfx.good();
    const { x, y, r } = this.pos();
    hud.toast(fmt.time(rt), 'good', { x, y: y - r * 1.9, ms: FEEDBACK_MS + 150 });
    this.flashUntil = p.t + 120;
    this.toFeedback(p.t);
  }

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    // Fixationskreuz
    const cx = w / 2;
    const cy = h / 2;
    const arm = Math.max(10, u * 2.4);
    g.save();
    g.strokeStyle = C.fg;
    g.globalAlpha = 0.85;
    g.lineWidth = Math.max(2, u * 0.5);
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(cx - arm, cy);
    g.lineTo(cx + arm, cy);
    g.moveTo(cx, cy - arm);
    g.lineTo(cx, cy + arm);
    g.stroke();
    g.restore();

    if (this.phase === 'stim') {
      const { x, y, r } = this.pos();
      orb(g, x, y, r, C.light, { glow: 1 });
    } else if (this.phase === 'feedback' && t < this.flashUntil) {
      const { x, y, r } = this.pos();
      g.save();
      g.globalAlpha = Math.max(0, (this.flashUntil - t) / 120);
      orb(g, x, y, r, C.good, { glow: 0.8 });
      g.restore();
    }
  }

  private finish(): void {
    const all = this.rts.map((r) => r.rt);
    const center = this.rts.filter((r) => !r.edge).map((r) => r.rt);
    const edge = this.rts.filter((r) => r.edge).map((r) => r.rt);
    const med = all.length ? median(all) : LAPSE_MS;
    const medC = center.length ? median(center) : NaN;
    const medE = edge.length ? median(edge) : NaN;
    let tip = 'relaxed';
    if (this.early >= 3) tip = 'early';
    else if (this.lapses >= 2) tip = 'focus';
    else if (medE - medC > 90) tip = 'edge';
    else if (all.length > 4 && sd(all) / med > 0.25) tip = 'steady';
    const score = Math.round(all.reduce((s, rt) => s + Math.max(0, 1000 - rt), 0) / 10);
    const secondary = [
      ...(Number.isFinite(medC) ? [{ key: 'center', value: medC, unit: 'time' as const }] : []),
      ...(Number.isFinite(medE) ? [{ key: 'edge', value: medE, unit: 'time' as const }] : []),
      { key: 'early', value: this.early, unit: 'count' as const },
      { key: 'missed', value: this.lapses, unit: 'count' as const },
    ];
    this.ctx.sfx.done();
    this.ctx.finish({
      primary: { key: 'median', value: Math.round(med), unit: 'time', better: 'lower' },
      secondary,
      score,
      level: 1,
      tip,
    });
  }
}

export const blitzreaktion: ExerciseDefinition = {
  id: 'blitzreaktion',
  category: 'reaktion',
  minutes: 1,
  color: '#C8641E',
  icon:
    '<circle cx="24" cy="24" r="8.5" fill="currentColor"/><g stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M24 4.5v6M24 37.5v6M4.5 24h6M37.5 24h6M10.2 10.2l4.3 4.3M33.5 33.5l4.3 4.3M10.2 37.8l4.3-4.3M33.5 14.5l4.3-4.3"/></g>',
  texts: { de, it },
  create: (ctx) => new Blitzreaktion(ctx),
};
