/**
 * Tipp-Tempo – so schnell wie möglich auf eine große Kugel tippen, in drei kurzen Runden mit Pausen.
 *
 * Abgrenzung zu den Zielübungen: Hier wird nicht gezielt, sondern nur das Tipp-Tempo gezählt. Die Kugel
 * ist groß und schrumpft nie; ein Tipp daneben kostet nichts (er zählt nur nicht).
 *
 * - 3 Runden à 20 s, dazwischen 20 s Pause (mit 3-2-1 vor der nächsten Runde). Schnelles Tippen ermüdet
 *   schon nach wenigen Sekunden; darum Runden statt Dauerbelastung, und der Abfall wird offen gezeigt.
 * - Nur ein Finger zählt: Ein Tipp zählt nur, wenn kein anderer Finger (Pointer-ID) aufliegt. Zusätzliche
 *   Finger werden nicht gewertet (mit Hinweis). Tastatur: Leertaste = ein Tipp.
 * - Hauptwert: Tipps pro Runde (Durchschnitt; ÷ 20 = Tipps pro Sekunde). Live und in den Pausen wird
 *   die Rate in Tipps pro Sekunde gezeigt. Zusatz: beste Runde, Abfall erste → letzte Runde in %.
 * - Nur Vergleich mit sich selbst auf diesem Gerät; keine Gesundheitsversprechen, keine Normwerte.
 */
import { background, circle, orb, text } from '../../core/draw';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import {
  type Plan,
  type Timeline,
  DEMO_PLAN,
  HIT_FACTOR,
  PLAN,
  QUICK_PLAN,
  TapGate,
  computeStats,
  liveRate,
  rateHz,
  timelineAt,
  tipFor,
  totalMs,
} from './logic';
import { de, it } from './texts';

const BUMP_MS = 110;
const ORB = '#F59E42';
const ORB_DIM = '#B98255';
const RING_HI = 'rgba(253,230,200,0.9)';
const RING_REST = 'rgba(148,197,245,0.85)';

class TippTempo implements Exercise {
  private readonly demo: boolean;
  private readonly plan: Plan;
  private readonly total: number;
  private readonly gate = new TapGate();
  private t0 = 0;
  private counts: number[];
  private taps: number[] = [];
  private points = 0;
  private ignored = 0;
  private ignoredBlock = 0;
  private outsideBlock = 0;
  private lastBump = -1e9;
  private prev: { phase: string; block: number; countdown: number } = { phase: '', block: -1, countdown: 0 };
  /** Geschwindigkeit der letzten beendeten Runde (für die Pausenanzeige) */
  private lastRate = 0;
  private finished = false;
  private handBack = false;
  private slowerShown = false;
  private atCenter = false;
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.plan = this.demo ? DEMO_PLAN : ctx.quick ? QUICK_PLAN : PLAN;
    this.total = totalMs(this.plan);
    this.counts = new Array<number>(this.plan.blocks).fill(0);
  }

  // --- Anordnung: immer live aus der Bühne ---

  private geo(): { cx: number; cy: number; r: number } {
    const s = this.ctx.stage;
    const bottom = this.demo ? captionTop(s) - 10 : s.h;
    const r = Math.max(40, Math.min(s.w, bottom) * 0.2);
    return { cx: s.w / 2, cy: bottom / 2, r };
  }

  private restPoint(): { x: number; y: number } {
    const { w, u } = this.ctx.stage;
    const hs = clamp(u * 13, 48, 110);
    return { x: w - hs * 0.75, y: captionTop(this.ctx.stage) - hs * 0.95 };
  }

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.t0 = t;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    if (this.demo) {
      hud.caption(texts.captions.tap);
      const r = this.restPoint();
      ghost.moveTo(r.x, r.y, { move: 0 });
      const c = this.geo();
      ghost.moveTo(c.cx, c.cy, { delay: 100, move: 900 });
      this.atCenter = true;
    }
  }

  update(_dt: number, t: number): void {
    if (this.finished) return;
    const { hud } = this.ctx;
    const elapsed = t - this.t0;
    const tl = timelineAt(elapsed, this.plan);
    this.onTransitions(tl);
    hud.setProgress(elapsed / this.total);
    if (tl.phase === 'done') {
      this.finishSession(t);
      return;
    }
    if (this.demo) this.demoUpdate(tl);
    else if (this.ctx.autoplay) this.autoUpdate(tl);
  }

  /** Phasenwechsel: Ton, Beschriftung, Zähler zurücksetzen */
  private onTransitions(tl: Timeline): void {
    const { sfx, hud, texts } = this.ctx;
    const changed = tl.phase !== this.prev.phase || tl.block !== this.prev.block;
    if (changed) {
      if (tl.phase === 'block') {
        this.taps = [];
        this.gate.reset();
        this.ignoredBlock = 0;
        this.outsideBlock = 0;
        sfx.go();
        hud.setLabel(`${texts.feedback.block} ${tl.block + 1}/${this.plan.blocks}`);
        if (this.demo && tl.block === 1) hud.caption(texts.captions.again);
      } else if (tl.phase === 'rest') {
        this.lastRate = rateHz(this.counts[tl.block], this.plan.blockMs);
        sfx.good();
        hud.setLabel(texts.feedback.rest);
        this.handBack = false;
        if (this.demo) {
          hud.caption(texts.captions.rest);
          this.ctx.ghost.clear();
          const r = this.restPoint();
          this.ctx.ghost.moveTo(r.x, r.y, { delay: 150, move: 600 });
          this.atCenter = false;
        }
      } else if (tl.phase === 'end') {
        this.lastRate = rateHz(this.counts[tl.block], this.plan.blockMs);
        sfx.done();
        hud.setLabel(null);
        if (this.demo) this.ctx.ghost.clear();
      } else if (tl.phase === 'lead') {
        hud.setLabel(`${texts.feedback.block} 1/${this.plan.blocks}`);
      }
    }
    // Countdown 3-2-1: bei jeder neuen Ziffer ein leises Ticken
    if (tl.countdown > 0 && tl.countdown !== this.prev.countdown) sfx.tick();
    this.prev = { phase: tl.phase, block: tl.block, countdown: tl.countdown };
  }

  // -------------------------------------------------------------------------
  // Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.finished) return;
    const tl = timelineAt(p.t - this.t0, this.plan);
    if (tl.phase !== 'block') return;
    // Erst den Finger anmelden (auch bei Tipp neben die Kugel), dann prüfen, ob er zählt
    const first = this.gate.press(p.id, p.t);
    const c = this.geo();
    if (Math.hypot(p.x - c.cx, p.y - c.cy) > c.r * HIT_FACTOR) {
      this.outsideBlock++;
      if (this.outsideBlock === 3) this.note(this.ctx.texts.feedback.aim);
      return;
    }
    if (!first) {
      this.ignored++;
      this.ignoredBlock++;
      if (this.ignoredBlock === 2) this.note(this.ctx.texts.feedback.oneFinger);
      return;
    }
    this.count(tl.block, p.t);
  }

  pointerUp(p: PointerInfo): void {
    this.gate.release(p.id);
  }

  /** Tastatur: Leertaste = ein Tipp */
  keyDown(key: string, t: number): void {
    if (this.finished || key !== ' ') return;
    const tl = timelineAt(t - this.t0, this.plan);
    if (tl.phase === 'block') this.count(tl.block, t);
  }

  private count(block: number, t: number): void {
    this.counts[block]++;
    this.taps.push(t);
    this.points++;
    this.lastBump = t;
    this.ctx.sfx.tap();
    if (!this.demo) this.ctx.hud.setScore(this.points);
  }

  private note(msg: string): void {
    const { w, u } = this.ctx.stage;
    this.ctx.hud.toast(msg, 'info', { x: w / 2, y: Math.max(u * 6, 36), ms: 1600, size: clamp(u * 3.8, 15, 28) });
  }

  // -------------------------------------------------------------------------
  // Geister-Hand

  /** Autoplay (Tests): tippt gleichmäßig mit leichter Ermüdung – die Hand bleibt auf der Kugel */
  private autoUpdate(tl: Timeline): void {
    const { ghost, rng } = this.ctx;
    if (tl.phase !== 'block' || tl.left < 120 || !ghost.idle) return;
    const c = this.geo();
    const first = !this.atCenter;
    this.atCenter = true;
    ghost.tap(c.cx + rng.normal() * c.r * 0.12, c.cy + rng.normal() * c.r * 0.12, {
      move: first ? 420 : 0,
      delay: 35 + 25 * tl.block + rng.range(0, 50),
    });
  }

  /** Intro-Film: Runde 1 zügig, Runde 2 etwas langsamer (so sieht man, wie es mit der Zeit nachlässt) */
  private demoUpdate(tl: Timeline): void {
    const { ghost, hud, texts } = this.ctx;
    const c = this.geo();
    if (tl.phase === 'rest' && tl.left < 1500 && !this.handBack) {
      this.handBack = true;
      ghost.moveTo(c.cx, c.cy, { move: 800 });
      this.atCenter = true;
    }
    if (tl.phase !== 'block') return;
    if (tl.block === 1 && tl.into > 1800 && !this.slowerShown) {
      this.slowerShown = true;
      hud.caption(texts.captions.slower);
    }
    if (tl.left < 250 || !ghost.idle) return;
    ghost.tap(c.cx, c.cy, { move: 0, delay: tl.block === 0 ? 40 : 110 });
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.finished = true;
    this.endT = t;
    const stats = computeStats(this.counts, this.plan.blockMs);
    this.ctx.finish({
      primary: { key: 'tapsPerBlock', value: Math.round(stats.mean), unit: 'count', better: 'higher' },
      secondary: [
        { key: 'bestBlock', value: stats.best, unit: 'count' },
        { key: 'drop', value: Math.round(stats.dropPct), unit: 'percent' },
      ],
      score: this.points,
      level: 1,
      tip: this.demo ? undefined : tipFor(stats, this.ignored),
    });
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, u, dpr } = this.ctx.stage;
    const { texts, fmt } = this.ctx;
    const f = texts.feedback;
    background(g, w, h, dpr);
    const tl = timelineAt(t - this.t0, this.plan);
    const c = this.geo();
    const blocks = this.plan.blocks;
    const active = tl.phase === 'block';
    const big = clamp(u * 9, 30, 92);
    const mid = clamp(u * 4.6, 15, 34);
    const small = clamp(u * 3.6, 13, 26);
    const above = c.cy - c.r - Math.max(u * 6, mid * 1.6);
    const below = c.cy + c.r + Math.max(u * 6, mid * 1.6);

    // Kugel: bleibt immer gleich groß; beim Tippen ein kleiner Größensprung (nicht bei „Bewegung reduzieren“)
    let scale = 1;
    if (active && !this.ctx.reducedMotion) {
      const k = clamp((t - this.lastBump) / BUMP_MS, 0, 1);
      scale = 1 + 0.045 * (1 - easeOut(k));
    }
    const dim = !active;
    orb(g, c.cx, c.cy, c.r * scale, dim ? ORB_DIM : ORB, { glow: dim ? 0.25 : 0.6 });
    if (dim) {
      g.save();
      g.globalAlpha = 0.35;
      circle(g, c.cx, c.cy, c.r, '#0B1424');
      g.restore();
    }

    // Zeitring um die Kugel: die Länge des Bogens zeigt die Restzeit der Runde bzw. der Pause
    const ringR = c.r + Math.max(10, u * 2.2);
    const lw = Math.max(4, u * 0.9);
    if (tl.phase === 'block' || tl.phase === 'rest') {
      const total = tl.phase === 'block' ? this.plan.blockMs : this.plan.restMs;
      const frac = clamp(tl.left / total, 0, 1);
      g.save();
      g.lineCap = 'round';
      g.lineWidth = lw;
      g.beginPath();
      g.arc(c.cx, c.cy, ringR, 0, Math.PI * 2);
      g.strokeStyle = 'rgba(255,255,255,0.12)';
      g.stroke();
      if (frac > 0.003) {
        g.beginPath();
        g.arc(c.cx, c.cy, ringR, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2);
        g.strokeStyle = tl.phase === 'block' ? RING_HI : RING_REST;
        g.stroke();
      }
      g.restore();
    }

    if (tl.phase === 'lead') {
      if (tl.countdown > 0) text(g, String(tl.countdown), c.cx, c.cy, big * 1.4, '#FFFFFF');
      this.fit(g, `${f.block} 1 ${f.of} ${blocks}`, c.cx, above, mid, '#FFFFFF', w * 0.92);
      this.fit(g, f.ready, c.cx, below, small, 'rgba(232,238,247,0.8)', w * 0.92);
    } else if (tl.phase === 'block') {
      const elapsed = tl.into;
      const rate = liveRate(this.taps, t, elapsed);
      this.fit(g, `${f.block} ${tl.block + 1} ${f.of} ${blocks}`, c.cx, above - mid * 1.3, small, 'rgba(232,238,247,0.75)', w * 0.92);
      this.fit(g, `${f.taps}: ${fmt.num(this.counts[tl.block])}`, c.cx, above, mid * 1.25, '#FFFFFF', w * 0.92);
      this.fit(g, `${fmt.num(rate, 1)} ${f.perSecond}`, c.cx, below, mid, '#FFFFFF', w * 0.92);
      this.fit(g, f.oneFinger, c.cx, below + mid * 1.5, small, 'rgba(232,238,247,0.55)', w * 0.92);
    } else if (tl.phase === 'rest') {
      const secs = Math.max(1, Math.ceil(tl.left / 1000));
      text(g, String(tl.countdown > 0 ? tl.countdown : secs), c.cx, c.cy, big * (tl.countdown > 0 ? 1.4 : 1), '#FFFFFF');
      this.fit(g, f.rest, c.cx, above - mid * 1.3, mid * 1.25, '#FFFFFF', w * 0.92);
      this.fit(g, `${f.block} ${tl.block + 1}: ${fmt.num(this.lastRate, 1)} ${f.perSecond}`, c.cx, above, mid, 'rgba(232,238,247,0.9)', w * 0.92);
      this.fit(g, f.relax, c.cx, below, small, 'rgba(232,238,247,0.8)', w * 0.92);
      this.fit(g, `${f.block} ${tl.block + 2} ${f.of} ${blocks}`, c.cx, below + mid * 1.5, small, 'rgba(232,238,247,0.6)', w * 0.92);
    } else {
      this.fit(g, f.done, c.cx, c.cy, mid * 1.5, '#FFFFFF', w * 0.9);
    }
  }

  /** Text, der bei Bedarf verkleinert wird, damit er nie über den Rand ragt */
  private fit(g: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, color: string, maxW: number): void {
    g.save();
    g.font = `700 ${Math.round(size)}px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    const tw = g.measureText(s).width;
    g.restore();
    const k = tw > maxW ? maxW / tw : 1;
    text(g, s, x, y, size * k, color);
  }
}

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

export const tippTempo: ExerciseDefinition = {
  id: 'tipp-tempo',
  category: 'reaktion',
  minutes: 2,
  color: '#C8641E',
  icon:
    '<circle cx="24" cy="26" r="14" fill="currentColor" opacity=".9"/><circle cx="19.5" cy="21" r="4.2" fill="#fff" opacity=".4"/><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M24 4.5v6.5"/><path d="M11.5 9l3.6 5.3"/><path d="M36.5 9l-3.6 5.3"/></g>',
  texts: { de, it },
  create: (ctx) => new TippTempo(ctx),
};
