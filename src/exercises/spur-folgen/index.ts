/**
 * Spur folgen – eine laufende Wellenlinie mit dem Finger nachfahren (Katalog 707, „Pfad nachfahren“).
 *
 * Reine Einzelaufgabe (anders als „Doppelt gefordert“, wo das Nachführen mit einer zweiten Aufgabe kombiniert ist):
 * Die Linie scrollt von rechts nach links, eine Zielmarke (Ring) läuft auf ihr, eine Zeiger-Marke (gefüllter Kreis)
 * folgt der Fingerhöhe. Ziel: die Zeiger-Marke im hellen Toleranzband um die Zielmarke halten.
 *
 * Gegenüber dem Vorbild (Maus mit Pointer Lock, Tempo „pro Bild“, unsichtbares Band, roter Vollbild-Blitz, Bonus fürs
 * Verlassen und Wiedereintreten, immer gleicher Pfad):
 * - Zeit statt Bildzahl: Die Linie läuft in u/s (dt), auf 60- und 120-Hz-Geräten gleich schnell.
 * - Das Toleranzband (± 3,6 u ≈ 5 mm) ist sichtbar und senkrecht gemessen; kein Bonus fürs Wiedereintreten, kein Rot,
 *   kein Blitz – die Band-Hervorhebung blendet weich (keine Sprünge).
 * - Für den Finger: Die Marke sitzt ≈ 6 u über dem Finger (Finger verdeckt nichts); der Finger darf links von der Marke
 *   irgendwo liegen, nur seine Höhe zählt. Abheben = Pause (Linie bleibt stehen, keine Wertung).
 * - Jeder Durchgang hat eine neue Welle (zufällige Phase), Durchgänge à 11 s mit ruhiger Einlaufstrecke.
 * - Stufe (Staircase 2-down/1-up): Tempo, Wellenhöhe und Frequenz steigen gemeinsam; ein Durchgang gilt als gelungen,
 *   wenn die Marke mindestens 60 % der Zeit im Band war. Hauptwert = Stufe; Zusatz: Zeit im Band (%), mittlere
 *   Abweichung (in % der Bandbreite, geräteunabhängig), gelungene Durchgänge.
 * - Gemessen wird Fingerhöhe gegen Linie – keine Aussage über den Blick (kein Eye-Tracker) oder über Zittern.
 *
 * Geister-Hand (Film/Autoplay): Die Engine kann nur Tipps simulieren. Für das Nachführen führt die Übung selbst einen
 * „virtuellen Finger“ und zeichnet die Hand.
 */
import { background, C, circle, glow, hand, ring, text, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeInOut, lerp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import {
  BAND_U,
  deviationPercent,
  fingerOffsetPx,
  LEAD_U,
  MAX_LEVEL,
  MIN_LEVEL,
  pointsFor,
  segmentSeconds,
  speedFor,
  TrackStats,
  Trail,
  Wave,
} from './logic';
import { de, it } from './texts';

const ROUNDS = 5;
const QUICK_ROUNDS = 2;
const FB_MS = 1500;
const END_MS = 1300;
const START_LEVEL = 3;
const DEMO_LEVEL = 2;
const VF_ID = -2;
const MIN_PU = 7.4;

const BLUE = '#38A3DC';
const LINE = '#7DD3FC';
const MARK = '#FDE68A';

type Phase = 'play' | 'fb' | 'end' | 'done';

interface Finger {
  id: number;
  x: number;
  y: number;
}

interface Auto {
  st: 'idle' | 'approach' | 'carry' | 'after';
  t0: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  dur: number;
  noise: number;
  lapseAt: number;
  lapseSign: number;
  captioned: number;
}

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

class SpurFolgen implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private phase: Phase = 'play';
  private phaseT = 0;
  // Geometrie
  private pu = MIN_PU;
  private tx = 0;
  private y0 = 0;
  private maxAmp = 14;
  private halfU = 30;
  private off = 46;
  private markR = 11;
  // Durchgang
  private level = MIN_LEVEL;
  private wave!: Wave;
  private speed = 8;
  private segS = 11;
  private sNow = -LEAD_U;
  private finger: Finger | null = null;
  private mk = 0;
  private started = false;
  private stats = new TrackStats();
  private trail = new Trail();
  private blend = 0;
  private lastFrac = 0;
  private lastPass = false;
  // Auswertung
  private rounds = 0;
  private passedRounds = 0;
  private all = new TrackStats();
  private points = 0;
  // virtueller Finger (Film / Autoplay)
  private vf = { x: 0, y: 0 };
  private auto: Auto = { st: 'idle', t0: 0, from: { x: 0, y: 0 }, to: { x: 0, y: 0 }, dur: 700, noise: 0, lapseAt: -1, lapseSign: 1, captioned: 0 };

  constructor(private readonly ctx: ExerciseContext) {
    const s = Math.round(ctx.startLevel ?? START_LEVEL);
    const start = clamp(Number.isFinite(s) ? s : START_LEVEL, MIN_LEVEL, MAX_LEVEL);
    this.stair = new Staircase({ start, min: MIN_LEVEL, max: MAX_LEVEL, down: 2, up: 1 });
    this.total = ctx.mode === 'demo' ? 1 : ctx.quick ? QUICK_ROUNDS : ROUNDS;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  // ------------------------------------------------------------------ Geometrie

  private geometry(): void {
    const { w, h, u } = this.ctx.stage;
    this.pu = Math.max(u, MIN_PU);
    this.markR = Math.max(10, 1.5 * this.pu);
    this.off = fingerOffsetPx(u, this.markR);
    this.tx = clamp(w * 0.3, 12 * this.pu, w * 0.45);
    const top = this.demo ? 5 * this.pu : 13 * this.pu;
    const bottom = (this.demo ? captionTop(this.ctx.stage) - 2 * this.pu : h - 3 * this.pu) - this.off;
    this.y0 = (top + bottom) / 2;
    this.halfU = (bottom - top) / 2 / this.pu;
    this.maxAmp = Math.max(2, this.halfU - BAND_U - 1.5);
  }

  private yPx(u: number): number {
    return this.y0 + u * this.pu;
  }

  private xPx(s: number): number {
    return this.tx + (s - this.sNow) * this.pu;
  }

  // ------------------------------------------------------------------ Ablauf

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.geometry();
    this.vf = this.restPoint();
    if (this.ctx.autoplay) ghost.hide(); // die Hand zeichnet diese Übung selbst
    this.newRound(t);
  }

  private newRound(t: number): void {
    const { rng, hud, texts } = this.ctx;
    this.level = this.demo ? DEMO_LEVEL : Math.floor(this.stair.level + 1e-9);
    this.geometry();
    this.speed = speedFor(this.level);
    this.segS = segmentSeconds({ demo: this.demo, quick: this.ctx.quick });
    this.wave = new Wave(rng, this.level, this.speed * this.segS, this.maxAmp);
    this.sNow = -LEAD_U;
    this.finger = null;
    this.mk = 0;
    this.started = false;
    this.stats = new TrackStats();
    this.trail.clear();
    this.blend = 0;
    this.phase = 'play';
    this.phaseT = t;
    this.auto = { ...this.auto, st: 'idle', noise: 0, lapseAt: -1, captioned: 0 };
    if (this.demo) hud.caption(texts.captions.touch);
    else hud.setLabel(`${texts.feedback.level} ${this.level} · ${Math.min(this.rounds + 1, this.total)}/${this.total}`);
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    const { ctx } = this;
    if (this.phase === 'play' && this.finger) {
      // Linie läuft nur, solange der Finger am Glas liegt (Abheben = Pause)
      this.sNow += this.speed * dt;
      const err = this.mk - this.wave.y(this.sNow);
      if (this.sNow >= 0 && this.sNow <= this.wave.length) this.stats.add(dt, err);
      this.trail.add(this.sNow, this.mk);
      // weiche Hervorhebung: kein Hin- und Herspringen, sondern gleitender Übergang
      const inBand = Math.abs(err) <= BAND_U ? 1 : 0;
      this.blend += (inBand - this.blend) * (1 - Math.exp(-dt * 6));
      if (!this.demo) ctx.hud.setProgress((this.rounds + clamp(this.sNow / this.wave.length, 0, 1)) / this.total);
      if (this.sNow >= this.wave.length) this.finishRound(t);
    }
    if (ctx.autoplay) this.autoUpdate(dt, t);
    if (this.phase === 'fb' && t - this.phaseT >= FB_MS) this.afterFeedback(t);
    if (this.phase === 'end' && t - this.phaseT >= END_MS) {
      this.phase = 'done';
      ctx.hud.caption(null);
      ctx.finish({ primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: MIN_LEVEL });
    }
  }

  private afterFeedback(t: number): void {
    if (this.demo) {
      this.phase = 'end';
      this.phaseT = t;
      return;
    }
    if (this.rounds >= this.total) this.finish();
    else this.newRound(t);
  }

  private finishRound(t: number): void {
    const { ctx } = this;
    this.finger = null;
    this.lastFrac = this.stats.fraction;
    this.lastPass = this.stats.passed;
    this.phase = 'fb';
    this.phaseT = t;
    if (!this.demo) {
      this.rounds++;
      this.all.merge(this.stats);
      this.points += pointsFor(this.level, this.lastFrac);
      if (this.lastPass) this.passedRounds++;
      this.stair.update(this.lastPass);
      ctx.hud.setScore(this.points);
      ctx.hud.setProgress(this.rounds / this.total);
    }
    const f = ctx.texts.feedback;
    if (this.lastPass) ctx.sfx.good();
    else ctx.sfx.tap();
    const size = clamp(ctx.stage.u * 4.6, 18, 34);
    ctx.hud.toast(`${ctx.fmt.pct(this.lastFrac * 100)} ${f.inBand}`, this.lastPass ? 'good' : 'info', { x: ctx.stage.w / 2, y: size * 3.2, ms: FB_MS - 200, size });
    if (this.demo) ctx.hud.caption(ctx.texts.captions.goal);
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'play' || this.finger) return;
    this.finger = { id: p.id, x: p.x, y: p.y };
    this.setMarker(p.y);
    this.started = true;
    this.ctx.sfx.tap();
    if (this.demo && this.auto.captioned < 1) {
      this.auto.captioned = 1;
      this.ctx.hud.caption(this.ctx.texts.captions.follow);
    }
  }

  pointerMove(p: PointerInfo): void {
    const f = this.finger;
    if (!f || p.id !== f.id || this.phase !== 'play') return;
    f.x = p.x;
    f.y = p.y;
    this.setMarker(p.y);
  }

  pointerUp(p: PointerInfo): void {
    const f = this.finger;
    if (!f || p.id !== f.id) return;
    this.finger = null;
  }

  /** Höhe der Zeiger-Marke aus der Fingerhöhe (Marke sitzt über dem Finger) */
  private setMarker(fingerY: number): void {
    this.mk = clamp((fingerY - this.off - this.y0) / this.pu, -(this.halfU + 2), this.halfU + 2);
  }

  // ------------------------------------------------------------------ virtueller Finger (Film / Autoplay)

  private restPoint(): { x: number; y: number } {
    const { w, h } = this.ctx.stage;
    const hs = clamp(this.ctx.stage.u * 13, 48, 110);
    return { x: w - hs * 0.75, y: this.demo ? captionTop(this.ctx.stage) - hs * 0.95 : h - hs * 0.7 };
  }

  private autoUpdate(dt: number, t: number): void {
    const { rng, texts, hud } = this.ctx;
    const A = this.auto;
    const demo = this.demo;
    const info = (p: { x: number; y: number }): PointerInfo => ({ id: VF_ID, x: p.x, y: p.y, t, type: 'ghost' });
    const fx = this.tx - 10 * this.pu; // Finger links von der Marke
    if (A.st === 'idle' && this.phase === 'play') {
      const react = demo ? 900 : rng.range(400, 800);
      if (t - this.phaseT >= react) {
        A.st = 'approach';
        A.t0 = t;
        A.from = { ...this.vf };
        A.to = { x: Math.max(8, fx), y: this.yPx(0) + this.off };
        A.dur = demo ? 800 : rng.range(450, 700);
      }
      return;
    }
    if (A.st === 'approach') {
      const k = clamp((t - A.t0) / A.dur, 0, 1);
      const e = easeInOut(k);
      this.vf = { x: lerp(A.from.x, A.to.x, e), y: lerp(A.from.y, A.to.y, e) };
      if (k >= 1) {
        this.pointerDown(info(this.vf));
        A.st = 'carry';
        A.noise = 0;
        // Gelegentlich ein Aussetzer (nur im Spielmodus)
        A.lapseAt = !demo && rng.chance(0.25 + 0.03 * this.level) ? rng.range(0.15, 0.8) * this.segS : -1;
        A.lapseSign = rng.chance(0.5) ? 1 : -1;
      }
      return;
    }
    if (A.st === 'carry') {
      if (this.phase !== 'play' || !this.finger) {
        A.st = 'after';
        return;
      }
      // Sollhöhe: Linie mit kleiner Verzögerung und leichtem Rauschen
      const lag = demo ? 0.06 : 0.11 + 0.02 * rng.normal();
      const sim = this.sNow - lag * this.speed;
      let aim = this.wave.y(sim);
      const sigma = (demo ? 0.3 : 0.8) * BAND_U;
      A.noise += -A.noise * 3 * dt + rng.normal() * sigma * Math.sqrt(dt) * 2.4;
      aim += A.noise;
      if (A.lapseAt >= 0) {
        const el = this.sNow / this.speed - A.lapseAt;
        if (el > 0 && el < 0.9) aim += A.lapseSign * 2 * BAND_U * Math.sin((Math.PI * el) / 0.9);
      }
      const target = { x: Math.max(8, fx), y: this.yPx(aim) + this.off };
      const q = 1 - Math.exp(-dt * (demo ? 14 : 11));
      this.vf = { x: lerp(this.vf.x, target.x, q), y: clamp(lerp(this.vf.y, target.y, q), 2, this.ctx.stage.h - 2) };
      this.pointerMove(info(this.vf));
      if (demo && A.captioned < 2 && this.sNow > this.wave.length * 0.35) {
        A.captioned = 2;
        hud.caption(texts.captions.band);
      }
      return;
    }
    if (A.st === 'after' && this.phase !== 'play') {
      const rp = this.restPoint();
      const q = 1 - Math.exp(-dt * 3);
      this.vf = { x: lerp(this.vf.x, rp.x, q), y: lerp(this.vf.y, rp.y, q) };
    }
  }

  // ------------------------------------------------------------------ Größenänderung

  resize(): void {
    if (this.phase !== 'play' && this.phase !== 'fb') return;
    // Neu anordnen; der Durchgang beginnt von vorn (ohne Wertung)
    const wasFb = this.phase === 'fb';
    this.geometry();
    this.wave = new Wave(this.ctx.rng, this.level, this.speed * this.segS, this.maxAmp);
    this.sNow = -LEAD_U;
    this.finger = null;
    this.mk = 0;
    this.stats = new TrackStats();
    this.trail.clear();
    this.vf = this.restPoint();
    this.auto.st = 'idle';
    if (wasFb) this.phase = 'play';
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr, 'grid');
    this.drawWave(g);
    this.drawMarks(g, t);
    if (!this.started && !this.demo && this.phase === 'play') {
      const size = clamp(u * 3.6, 14, 24);
      text(g, this.ctx.texts.feedback.start, w / 2, h - Math.max(14, u * 3) - size * 0.5, size, C.fg, { weight: 700 });
    }
    if (this.ctx.autoplay) hand(g, this.vf.x, this.vf.y, clamp(u * 13, 48, 110), !!this.finger);
  }

  private drawWave(g: CanvasRenderingContext2D): void {
    const { w } = this.ctx.stage;
    const s0 = this.sNow - this.tx / this.pu - 2;
    const s1 = this.sNow + (w - this.tx) / this.pu + 2;
    const step = 0.8;
    const pts: { x: number; y: number }[] = [];
    for (let s = Math.floor(s0 / step) * step; s <= s1; s += step) pts.push({ x: this.xPx(s), y: this.yPx(this.wave.y(s)) });
    const path = (list: { x: number; y: number }[]) => {
      g.beginPath();
      list.forEach((p, i) => (i ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y)));
    };
    const behind = pts.filter((p) => p.x <= this.tx + 1);
    const ahead = pts.filter((p) => p.x >= this.tx - 1);
    g.save();
    g.lineJoin = 'round';
    g.lineCap = 'round';
    // Toleranzband (sichtbar, halbtransparent)
    g.lineWidth = 2 * BAND_U * this.pu;
    g.strokeStyle = withAlpha(BLUE, 0.17);
    path(ahead);
    g.stroke();
    g.strokeStyle = withAlpha(BLUE, 0.07);
    path(behind);
    g.stroke();
    // Linie: voraus hell, dahinter gedämpft
    g.lineWidth = Math.max(3, this.pu * 0.5);
    g.strokeStyle = LINE;
    path(ahead);
    g.stroke();
    g.strokeStyle = withAlpha(LINE, 0.4);
    path(behind);
    g.stroke();
    g.restore();
    // Spur der Zeiger-Marke hinter ihr
    if (this.trail.length > 1) {
      g.save();
      g.beginPath();
      let first = true;
      for (let i = 0; i < this.trail.length; i++) {
        const p = this.trail.at(i);
        const x = this.xPx(p.s);
        if (x < -10 || x > this.tx) continue;
        if (first) g.moveTo(x, this.yPx(p.y));
        else g.lineTo(x, this.yPx(p.y));
        first = false;
      }
      g.lineWidth = Math.max(2, this.pu * 0.3);
      g.setLineDash([5, 6]);
      g.strokeStyle = 'rgba(253,230,138,0.6)';
      g.stroke();
      g.restore();
    }
    // senkrechte Hilfslinie an der Zielstelle
    g.save();
    g.strokeStyle = 'rgba(255,255,255,0.10)';
    g.lineWidth = 1.5;
    g.setLineDash([4, 8]);
    g.beginPath();
    g.moveTo(this.tx, 0);
    g.lineTo(this.tx, this.ctx.stage.h);
    g.stroke();
    g.restore();
  }

  private drawMarks(g: CanvasRenderingContext2D, t: number): void {
    const r = this.markR;
    const ty = this.yPx(this.wave.y(this.sNow));
    const my = this.yPx(this.mk);
    const f = this.finger;
    if (f) {
      // Faden und Ring zeigen die Fingerposition (der Finger liegt unter der Marke)
      g.save();
      g.strokeStyle = 'rgba(255,255,255,0.3)';
      g.lineWidth = Math.max(2, this.ctx.stage.u * 0.3);
      g.setLineDash([6, 6]);
      g.beginPath();
      g.moveTo(f.x, f.y);
      g.lineTo(this.tx, my + r);
      g.stroke();
      g.restore();
      ring(g, f.x, f.y, Math.max(10, this.ctx.stage.u * 1.6), 'rgba(255,255,255,0.55)', 2.5);
    }
    // Zielmarke: Ring, bei „im Band“ etwas kräftiger (weicher Übergang, Form bleibt gleich)
    const b = this.blend;
    g.save();
    g.globalAlpha = 0.5 + 0.5 * b;
    ring(g, this.tx, ty, r * 1.65, C.white, Math.max(3, r * (0.22 + 0.2 * b)));
    g.restore();
    circle(g, this.tx, ty, Math.max(2.5, r * 0.22), C.white);
    // Zeiger-Marke
    glow(g, this.tx, my, r, MARK, 0.5);
    circle(g, this.tx, my, r, MARK);
    g.save();
    g.globalAlpha = 0.35;
    circle(g, this.tx - r * 0.3, my - r * 0.32, r * 0.32, '#ffffff');
    g.restore();
    if (this.phase === 'fb' || this.phase === 'end') {
      const a = clamp((t - this.phaseT) / 250, 0, 1);
      const size = this.pu * 4.4;
      g.save();
      g.globalAlpha = a;
      circle(g, this.tx + this.pu * 9, this.y0 - this.halfU * this.pu * 0.6, size * 0.75, this.lastPass ? withAlpha(BLUE, 0.95) : 'rgba(255,255,255,0.22)');
      g.restore();
      text(g, this.lastPass ? '✓' : '•', this.tx + this.pu * 9, this.y0 - this.halfU * this.pu * 0.6 + 1, size, C.white, { weight: 800, alpha: a });
    }
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.hud.setProgress(1);
    ctx.sfx.done();
    const thr = this.stair.threshold();
    const frac = this.all.fraction * 100;
    let tip = 'great';
    if (frac < 55) tip = 'ahead';
    else if (frac < 80) tip = 'calm';
    ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'inBand', value: Math.round(frac), unit: 'percent' },
        { key: 'deviation', value: deviationPercent(this.all.meanDeviation), unit: 'percent' },
        { key: 'passed', value: this.passedRounds, unit: 'count' },
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip,
    });
  }
}

export const spurFolgen: ExerciseDefinition = {
  id: 'spur-folgen',
  category: 'bewegung',
  minutes: 2,
  color: '#3568B0',
  showsLevel: true,
  icon:
    '<path d="M2 28c5-16 10-16 15 0s10 16 15 0c2-6 5-8 8-7" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" opacity=".25"/><path d="M2 28c5-16 10-16 15 0s10 16 15 0c2-6 5-8 8-7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="28" r="5.2" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="32" cy="28" r="2.2" fill="currentColor"/>',
  texts: { de, it },
  create: (ctx) => new SpurFolgen(ctx),
};
