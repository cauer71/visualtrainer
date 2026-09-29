/**
 * Blitzreaktion – einfache visuelle Reaktionszeit, in der Mitte und am Rand.
 *
 * Umsetzung nach docs/wissenschaft/01-reaktion-und-impulskontrolle.md (Abschnitt 1.4):
 * - "Nicht alternde" Wartezeit: 1 s + exponentieller Anteil (Mittel 1 s). Ist der Anteil > 3 s,
 *   wird es ein Durchgang ohne Licht (≈ 5 %) – Tippen dort zählt als "zu früh".
 * - Tippen vor dem Licht oder < 100 ms danach = "zu früh" (Antizipation), zählt nicht.
 * - Der Reiz ist immer gleich und bleibt bis zur Antwort (max. 1,5 s) → saubere, vergleichbare Messung.
 * - Auswertung: Median (robust), Schwankung (Interquartilsabstand), Mitte und Rand getrennt.
 * - Tippen irgendwo: gemessen wird das Erkennen, nicht das Zielen.
 * - Trainingsreiz: ein persönliches Zeitziel, das sich anpasst (gewichtetes Up-Down, Ziel ≈ 80 %):
 *   Treffer im Zeitziel → 10 ms strenger, sonst 40 ms lockerer (250–1500 ms). Das Zeitziel
 *   bestimmt nur Punkte und Rückmeldung – nicht den Reiz.
 */
import { background, C, orb } from '../../core/draw';
import { clamp, median, quantile } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { de, it } from './texts';

const WARMUP = 2;
const COUNTED = 24;
const ANTICIPATION_MS = 100;
const LAPSE_MS = 1500;
const FEEDBACK_MS = 650;
const CATCH_MS = 4000;
const GOAL_START = 800;
const GOAL_MIN = 250;
const GOAL_MAX = 1500;

type Phase = 'wait' | 'stim' | 'feedback' | 'done';
interface Trial {
  /** Exzentrizität 0 (Mitte) … 1 (Rand) */
  ecc: number;
  angle: number;
  warmup: boolean;
}
type DemoStep = 'center' | 'edge' | 'early' | 'center2';

class Blitzreaktion implements Exercise {
  private phase: Phase = 'wait';
  private phaseT = 0;
  private fp = 1200;
  private catchTrial = false;
  private onset = 0;
  private idx = 0;
  private plan: Trial[] = [];
  private rts: Array<{ rt: number; edge: boolean }> = [];
  private early = 0;
  private missed = 0;
  private goal: number;
  private score = 0;
  private flashUntil = 0;
  private flashColor: string = C.good;
  private demoSteps: DemoStep[] = ['center', 'edge', 'early', 'center2'];
  private demoTapPlanned = false;

  constructor(private ctx: ExerciseContext) {
    this.goal = clamp(ctx.startLevel ?? GOAL_START, GOAL_MIN, GOAL_MAX);
  }

  private get total(): number {
    return this.plan.length;
  }

  start(t: number): void {
    const { rng } = this.ctx;
    if (this.ctx.mode === 'demo') {
      this.plan = [
        { ecc: 0, angle: 0, warmup: false },
        { ecc: 0.9, angle: -0.6, warmup: false },
        { ecc: 0, angle: 0, warmup: false },
        { ecc: 0.55, angle: 2.5, warmup: false },
      ];
    } else if (this.ctx.quick) {
      this.plan = [
        { ecc: 0, angle: 0, warmup: false },
        { ecc: 0.5, angle: 0.8, warmup: false },
        { ecc: 0.9, angle: 3.9, warmup: false },
      ];
    } else {
      // 8 × Mitte, 8 × mittlerer Ring, 8 × äußerer Ring – je Ring alle 8 Richtungen einmal
      const counted: Trial[] = [];
      for (let i = 0; i < 8; i++) counted.push({ ecc: 0, angle: 0, warmup: false });
      for (const ecc of [0.5, 0.9]) {
        const offset = rng.range(0, Math.PI / 4);
        for (let k = 0; k < 8; k++) counted.push({ ecc, angle: offset + (k * Math.PI) / 4, warmup: false });
      }
      rng.shuffle(counted);
      const warm = Array.from({ length: WARMUP }, () => ({ ecc: 0, angle: 0, warmup: true }));
      this.plan = [...warm, ...counted.slice(0, COUNTED)];
    }
    this.newWait(t);
    this.ctx.hud.setScore(0);
    this.updateHud();
    if (this.ctx.mode === 'demo') this.ctx.hud.caption(this.ctx.texts.captions.look);
  }

  private newWait(t: number, extra = 0): void {
    this.phase = 'wait';
    this.phaseT = t;
    this.demoTapPlanned = false;
    if (this.ctx.mode === 'demo') {
      this.catchTrial = false;
      this.fp = 1100 + this.ctx.rng.range(0, 500) + extra;
      return;
    }
    // Nicht alternde Vorperiode (konstante "Überraschung")
    const add = this.ctx.rng.exp(1000);
    this.catchTrial = add > 3000 && !this.plan[this.idx]?.warmup;
    this.fp = (this.catchTrial ? CATCH_MS : 1000 + add) + extra;
  }

  private updateHud(): void {
    const counted = this.plan.filter((p) => !p.warmup).length;
    const done = this.plan.slice(0, this.idx).filter((p) => !p.warmup).length;
    this.ctx.hud.setProgress(counted ? done / counted : 0);
    const cur = this.plan[this.idx];
    this.ctx.hud.setLabel(cur?.warmup ? this.ctx.texts.feedback.warmup : `${Math.min(done + 1, counted)} / ${counted}`);
  }

  private pos(): { x: number; y: number; r: number } {
    const { w, h, u } = this.ctx.stage;
    // Durchmesser mindestens ≈ 1 cm (≈ 52 CSS-px auf dem iPad)
    const r = Math.max(26, u * 5.5);
    const tr = this.plan[this.idx] ?? { ecc: 0, angle: 0 };
    const rx = w / 2 - r - u * 4;
    const ry = h / 2 - r - u * 4;
    return { x: w / 2 + Math.cos(tr.angle) * rx * tr.ecc, y: h / 2 + Math.sin(tr.angle) * ry * tr.ecc, r };
  }

  update(_dt: number, t: number): void {
    if (this.phase === 'wait' && t - this.phaseT >= this.fp) {
      if (this.catchTrial) {
        // Durchgang ohne Licht überstanden → neue Wartezeit, derselbe Reiz folgt
        this.newWait(t);
      } else {
        this.phase = 'stim';
        this.onset = t;
        this.phaseT = t;
        if (this.ctx.mode === 'demo') {
          const step = this.demoSteps[this.idx];
          this.ctx.hud.caption(step === 'edge' ? this.ctx.texts.captions.edge : this.ctx.texts.captions.tap);
        }
      }
    } else if (this.phase === 'stim' && t - this.onset >= LAPSE_MS) {
      if (!this.plan[this.idx].warmup) this.missed++;
      this.adaptGoal(false);
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

  /** Geister-Hand: tippt "an Ort und Stelle" – wie ein ruhender Finger. */
  private autoplay(t: number): void {
    const { ghost, stage, rng, mode } = this.ctx;
    const restX = stage.w * 0.84;
    const restY = stage.h * 0.62;
    if (this.phase === 'wait' && !this.demoTapPlanned) {
      this.demoTapPlanned = true;
      if (ghost.idle) ghost.moveTo(restX, restY, { move: 400 });
      const step = mode === 'demo' ? this.demoSteps[this.idx] : null;
      const earlyTap = step === 'early' || (mode === 'play' && rng.chance(0.06));
      if (earlyTap) ghost.tap(restX, restY, { delay: Math.max(250, Math.min(this.fp, 1500) * 0.55), move: 0 });
    }
    if (this.phase === 'stim' && t === this.onset) {
      ghost.tap(restX, restY, { delay: mode === 'demo' ? 280 : rng.range(240, 460), move: 0 });
    }
  }

  private toFeedback(t: number): void {
    this.phase = 'feedback';
    this.phaseT = t;
  }

  /** Gewichtetes Up-Down (Kaernbach 1991): −10 ms nach Treffer im Zeitziel, +40 ms sonst → ≈ 80 %. */
  private adaptGoal(success: boolean): void {
    if (this.ctx.mode === 'demo') return;
    this.goal = clamp(this.goal + (success ? -10 : 40), GOAL_MIN, GOAL_MAX);
  }

  /** Tastatur: Leertaste/Enter wirkt wie ein Tipp (Computer ohne Touch). */
  keyDown(key: string, t: number): void {
    if (key !== ' ' && key !== 'Enter') return;
    const { w, h } = this.ctx.stage;
    this.pointerDown({ id: -2, x: w / 2, y: h / 2, t, type: 'mouse' });
  }

  pointerDown(p: PointerInfo): void {
    const { sfx, hud, texts, fmt } = this.ctx;
    if (this.phase === 'wait' || (this.phase === 'stim' && p.t - this.onset < ANTICIPATION_MS)) {
      // Zu früh: gleicher Durchgang mit neuer Wartezeit (plus kurze Extrapause)
      if (!this.plan[this.idx]?.warmup) this.early++;
      this.adaptGoal(false);
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
    const hitGoal = rt <= this.goal;
    if (!tr.warmup) {
      this.rts.push({ rt, edge: tr.ecc > 0 });
      if (hitGoal) {
        this.score += 10 + Math.max(0, Math.round((GOAL_START - this.goal) / 25));
        hud.setScore(this.score);
      }
    }
    this.adaptGoal(hitGoal);
    sfx.good();
    const { x, y, r } = this.pos();
    hud.toast(fmt.time(rt), hitGoal ? 'good' : 'info', { x, y: y - r * 1.9, ms: FEEDBACK_MS + 150 });
    this.flashUntil = p.t + 140;
    this.flashColor = hitGoal ? C.good : C.warn;
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
      g.globalAlpha = Math.max(0, (this.flashUntil - t) / 140);
      orb(g, x, y, r, this.flashColor, { glow: 0.6 });
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
    const iqr = all.length >= 4 ? quantile(all, 0.75) - quantile(all, 0.25) : NaN;
    // "Aussetzer": deutlich langsamer als üblich (> 2 × Sitzungsmedian) oder verpasst
    const slow = all.filter((rt) => rt > 2 * med).length + this.missed;
    let tip = 'relaxed';
    if (this.early >= 3) tip = 'early';
    else if (slow >= 3) tip = 'focus';
    else if (medE - medC > 60) tip = 'edge';
    else if (Number.isFinite(iqr) && iqr / med > 0.3) tip = 'steady';
    const secondary = [
      ...(Number.isFinite(medC) ? [{ key: 'center', value: medC, unit: 'time' as const }] : []),
      ...(Number.isFinite(medE) ? [{ key: 'edge', value: medE, unit: 'time' as const }] : []),
      ...(Number.isFinite(iqr) ? [{ key: 'spread', value: iqr, unit: 'ms' as const }] : []),
      { key: 'early', value: this.early, unit: 'count' as const },
      { key: 'missed', value: this.missed, unit: 'count' as const },
    ];
    this.ctx.sfx.done();
    this.ctx.finish({
      primary: { key: 'median', value: Math.round(med), unit: 'time', better: 'lower' },
      secondary,
      score: this.score,
      // Gespeichert wird das persönliche Zeitziel (Start fürs nächste Mal, etwas lockerer)
      level: clamp(Math.round(this.goal + 30), GOAL_MIN, GOAL_MAX),
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
