/**
 * Kern „Nachführen mit dem Finger“ – gemeinsamer Baustein für Übungen, bei denen eine Zielmarke nach einer Regel läuft
 * und der Finger eine Zeiger-Marke (mit Versatz nach oben, damit die Hand nichts verdeckt) im Toleranzband hält.
 *
 * ============================================================================================================
 * SCHNITTSTELLE (stabil halten; neue Übungen ergänzen nur Regel + Texte + science + Icon)
 * ============================================================================================================
 *
 *   // src/exercises/<id>/index.ts
 *   import { nachfuehren } from '../_shared/nachfuehren';
 *   import { myRule } from './logic';
 *   export const meineUebung: ExerciseDefinition = {
 *     id: '<id>', category: 'bewegung', minutes: 2, color: '#…', showsLevel: true, icon: '…', texts: { de, it },
 *     create: nachfuehren({ axes: 'xy', makeRule: myRule }),
 *   };
 *
 * 1. Bewegungsregel (`TrackRule`, Typen in `nachfuehren-logic.ts`) – pro Durchgang einmal gebaut von
 *      makeRule(setup: RuleSetup): TrackRule
 *    setup = { level (ganzzahlig 1…12), rng (ctx.rng – nie Math.random), hw/hh (halbe nutzbare Felddimension in u),
 *              seconds (Dauer der Wertung), demo (Intro-Film) }.
 *    Die Regel liefert rein funktional (nur aus der Durchgangszeit s in Sekunden, nie aus Bildzahlen):
 *      target(s): Vec            Ort der Zielmarke (u, Feldmitte = 0/0, y nach unten), s ∈ [0, seconds], stetig, im Feld
 *      disturbance?(s): Vec      optionale UNSICHTBARE Störverschiebung (u), wird zur Zeigermarke addiert (Wind, Drift);
 *                                der Finger muss sie ausgleichen; sollte bei s = 0 bei 0 beginnen und stetig sein
 *      hint?(s): Vec             optionaler Anzeige-Pfeil neben der Marke (Einheitsvektor), wirkt nicht auf die Wertung
 *    Für sanften Start gibt es `rampTime`, `smoothstep`, `Wobble` (weiches Schwanken) in `nachfuehren-logic.ts`.
 *    Der Kern ruft target/disturbance für s < 0 (Einlaufzeit) mit s = 0 auf; die Bahn steht also zu Beginn am Startpunkt.
 *    Die Stufe (Tempo, Bahnschwierigkeit, Störstärke) rechnet die Regel selbst aus `setup.level`.
 *
 * 2. Konfiguration (`NachfuehrenConfig`):
 *      axes        'x' | 'y' | 'xy'  – welche Achsen der Finger steuert; auf gesperrten Achsen liegt die Marke auf der
 *                  Zielmarke (Schiene) und der Finger darf dort beliebig liegen. Bei 'y'/'xy' sitzt die Marke ≈ 6 u über
 *                  dem Finger; bei 'x' steuert nur die waagerechte Fingerposition.
 *      makeRule    siehe oben
 *      bandFor?    halbe Breite des Toleranzbands (u) je Stufe (Standard `defaultBandU`: 5,0 → ≈ 3,35 u)
 *      previewSeconds? Vorschau der Bahn in Sekunden je Stufe (gestrichelte Linie voraus; Standard 0 = keine)
 *      startLevel? (3), demoLevel? (2), rounds? (5), segmentSeconds? (11), passFraction? (0,6), accent? (Blau), tipKeys?
 *
 * 3. Wertung (vom Kern, nicht von der Regel): Gemessen wird nur bei Fingerkontakt und nur im Bereich s ∈ [0, seconds].
 *    Zeit im Band (% der Wertungszeit; Band = Kreis mit Radius bandFor(level) um die Zielmarke) und mittlerer Abstand
 *    (in % des Bandradius). Ein Durchgang gilt als gelungen bei ≥ passFraction im Band → Staircase 2-down/1-up über
 *    die Stufe. Abheben = Pause (die Bahnzeit läuft nur bei aufliegendem Finger); jeder Durchgang dauert damit
 *    fest `seconds` Sekunden Fingerkontakt; Zeit läuft mit dt (bildratenunabhängig).
 *    Ergebnis: primary level (ganzzahlig, höher = besser); secondary inBand (%), deviation (%), passed (Anzahl);
 *    score; level (nächste Startstufe); tip ∈ tipKeys.
 *
 * 4. Erwartete Texte (ExerciseTexts), Schlüssel wie bei „Spur folgen“:
 *      captions: touch (Anfang: Finger auflegen), follow (nach dem Auflegen), band (Filmmitte, optional), goal (Filmende)
 *      metrics:  level, inBand, deviation, passed
 *      feedback: level ("Stufe"), inBand ("im Band"), start (Hinweis vor dem ersten Auflegen)
 *      tips:     ahead, calm, great (oder eigene über tipKeys: { low, mid, high })
 *
 * 5. Intro-Film/Autoplay: Der Kern führt selbst einen „virtuellen Finger“ (Hand wird im Canvas gezeichnet, die Engine-Hand
 *    wird verborgen) mit kleiner Verzögerung und Rauschen, im Film leicht, im Spiel-Autoplay mit gelegentlichem Aussetzer.
 *    Nach dem Film/der Sitzung wird `ctx.finish` gerufen.
 *
 * Auslöser für Erweiterungen des Kerns (abwärtskompatibel halten): Felder der Config nur mit Standardwert hinzufügen.
 */
import { background, C, circle, glow, hand, ring, text, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeInOut, lerp } from '../../core/stats';
import type { Exercise, ExerciseContext, PointerInfo, StageInfo } from '../../core/types';
import {
  type Axes,
  defaultBandU,
  deviationPercent,
  dist,
  fingerOffsetPx,
  freeDisturbance,
  LEAD_S,
  markerFrom,
  MAX_LEVEL,
  MIN_LEVEL,
  PASS_FRACTION,
  pointsFor,
  type RuleSetup,
  SEGMENT_S,
  segmentSeconds,
  TrackStats,
  Trail,
  type TrackRule,
  type Vec,
} from './nachfuehren-logic';

export * from './nachfuehren-logic';

export interface NachfuehrenConfig {
  axes: Axes;
  makeRule(setup: RuleSetup): TrackRule;
  bandFor?(level: number): number;
  previewSeconds?(level: number): number;
  startLevel?: number;
  demoLevel?: number;
  rounds?: number;
  segmentSeconds?: number;
  passFraction?: number;
  accent?: string;
  tipKeys?: { low: string; mid: string; high: string };
}

const QUICK_ROUNDS = 2;
const FB_MS = 1500;
const END_MS = 1300;
const VF_ID = -2;
const MIN_PU = 7.4;
/** Rand im Feld, den Ziele nicht erreichen sollen (u): größtes Band + Markenradius */
const FIELD_PAD_U = 7;

const MARK = '#FDE68A';
const LINE = '#7DD3FC';

type Phase = 'play' | 'fb' | 'end' | 'done';

interface Auto {
  st: 'idle' | 'approach' | 'carry' | 'after';
  t0: number;
  from: Vec;
  to: Vec;
  dur: number;
  noise: Vec;
  lapseAt: number;
  lapseDir: Vec;
  captioned: number;
}

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

export class NachfuehrenExercise implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private readonly axes: Axes;
  private readonly passFrac: number;
  private readonly accent: string;
  private phase: Phase = 'play';
  private phaseT = 0;
  // Geometrie (px bzw. u)
  private pu = MIN_PU;
  private cx = 0;
  private cy = 0;
  private fhw = 30; // halbe Felddimension in u
  private fhh = 20;
  private off = 46;
  private markR = 11;
  // Durchgang
  private level = MIN_LEVEL;
  private band = 4;
  private preview = 0;
  private seconds = 11;
  private rule!: TrackRule;
  private s = -LEAD_S; // Bahnzeit (s); läuft nur bei Fingerkontakt
  private finger: { id: number } | null = null;
  private fingerPx: Vec = { x: 0, y: 0 };
  private fm: Vec = { x: 0, y: 0 }; // gemerkte Fingerposition (u)
  private started = false;
  private tgt: Vec = { x: 0, y: 0 };
  private mk: Vec = { x: 0, y: 0 };
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
  private vf: Vec = { x: 0, y: 0 };
  private auto: Auto = {
    st: 'idle',
    t0: 0,
    from: { x: 0, y: 0 },
    to: { x: 0, y: 0 },
    dur: 700,
    noise: { x: 0, y: 0 },
    lapseAt: -1,
    lapseDir: { x: 0, y: 1 },
    captioned: 0,
  };

  constructor(
    private readonly ctx: ExerciseContext,
    private readonly cfg: NachfuehrenConfig,
  ) {
    const fallback = cfg.startLevel ?? 3;
    const s = Math.round(ctx.startLevel ?? fallback);
    const start = clamp(Number.isFinite(s) ? s : fallback, MIN_LEVEL, MAX_LEVEL);
    this.stair = new Staircase({ start, min: MIN_LEVEL, max: MAX_LEVEL, down: 2, up: 1 });
    const rounds = cfg.rounds ?? 5;
    this.total = ctx.mode === 'demo' ? 1 : ctx.quick ? Math.min(rounds, QUICK_ROUNDS) : rounds;
    this.axes = cfg.axes;
    this.passFrac = cfg.passFraction ?? PASS_FRACTION;
    this.accent = cfg.accent ?? '#38A3DC';
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
    const top = this.demo ? 5 * this.pu : 13 * this.pu;
    const bottom = (this.demo ? captionTop(this.ctx.stage) - 2 * this.pu : h - 3 * this.pu) - this.off;
    const left = 4 * this.pu;
    const right = w - 4 * this.pu;
    this.cx = (left + right) / 2;
    this.cy = (top + bottom) / 2;
    this.fhw = Math.max(6, (right - left) / 2 / this.pu);
    this.fhh = Math.max(6, (bottom - top) / 2 / this.pu);
  }

  private px(p: Vec): Vec {
    return { x: this.cx + p.x * this.pu, y: this.cy + p.y * this.pu };
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

  private cap(key: string): void {
    const c = this.ctx.texts.captions[key];
    if (c) this.ctx.hud.caption(c);
  }

  private buildRule(): void {
    const { rng } = this.ctx;
    this.level = this.demo ? (this.cfg.demoLevel ?? 2) : Math.floor(this.stair.level + 1e-9);
    this.band = (this.cfg.bandFor ?? defaultBandU)(this.level);
    this.preview = this.cfg.previewSeconds ? this.cfg.previewSeconds(this.level) : 0;
    this.seconds = segmentSeconds({ demo: this.demo, quick: this.ctx.quick }, this.cfg.segmentSeconds ?? SEGMENT_S);
    this.rule = this.cfg.makeRule({
      level: this.level,
      rng,
      hw: Math.max(4, this.fhw - FIELD_PAD_U),
      hh: Math.max(4, this.fhh - FIELD_PAD_U),
      seconds: this.seconds,
      demo: this.demo,
    });
  }

  private resetRoundState(): void {
    this.s = -LEAD_S;
    this.finger = null;
    this.started = false;
    this.stats = new TrackStats();
    this.trail.clear();
    this.blend = 0;
    const tg = this.rule.target(0);
    const d = freeDisturbance(this.rule.disturbance?.(0), this.axes);
    this.fm = { x: tg.x - d.x, y: tg.y - d.y };
    this.frame();
  }

  private newRound(t: number): void {
    const { hud, texts } = this.ctx;
    this.geometry();
    this.buildRule();
    this.resetRoundState();
    this.phase = 'play';
    this.phaseT = t;
    this.auto = { ...this.auto, st: 'idle', noise: { x: 0, y: 0 }, lapseAt: -1, captioned: 0 };
    if (this.demo) this.cap('touch');
    else hud.setLabel(`${texts.feedback.level} ${this.level} · ${Math.min(this.rounds + 1, this.total)}/${this.total}`);
  }

  /** Ziel und Marke für die aktuelle Bahnzeit berechnen */
  private frame(): void {
    const s = clamp(this.s, 0, this.seconds);
    this.tgt = this.rule.target(s);
    this.mk = markerFrom(this.fm, this.axes, this.tgt, this.rule.disturbance?.(s), this.fhw, this.fhh);
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    const { ctx } = this;
    if (this.phase === 'play' && this.finger) {
      // Bahnzeit läuft nur, solange der Finger am Glas liegt (Abheben = Pause)
      const s0 = this.s;
      this.s += dt;
      this.frame();
      const a = Math.max(s0, 0);
      const b = Math.min(this.s, this.seconds);
      const err = dist(this.mk, this.tgt);
      if (b > a) this.stats.add(b - a, err, this.band);
      this.trail.add(dt, this.mk);
      // weiche Hervorhebung: gleitender Übergang statt Hin- und Herspringen
      const inBand = err <= this.band ? 1 : 0;
      this.blend += (inBand - this.blend) * (1 - Math.exp(-dt * 6));
      if (!this.demo) ctx.hud.setProgress((this.rounds + clamp(this.s / this.seconds, 0, 1)) / this.total);
      if (this.s >= this.seconds) this.finishRound(t);
    } else if (this.phase === 'play') {
      this.frame();
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
    this.lastPass = this.stats.fraction >= this.passFrac;
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
    if (this.demo) this.cap('goal');
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'play' || this.finger) return;
    this.finger = { id: p.id };
    this.fingerPx = { x: p.x, y: p.y };
    this.setFinger(p);
    this.started = true;
    this.ctx.sfx.tap();
    if (this.demo && this.auto.captioned < 1) {
      this.auto.captioned = 1;
      this.cap('follow');
    }
  }

  pointerMove(p: PointerInfo): void {
    const f = this.finger;
    if (!f || p.id !== f.id || this.phase !== 'play') return;
    this.fingerPx = { x: p.x, y: p.y };
    this.setFinger(p);
  }

  pointerUp(p: PointerInfo): void {
    const f = this.finger;
    if (!f || p.id !== f.id) return;
    this.finger = null;
  }

  /** Fingerposition (px) → gemerkte Zeiger-Position (u); die Marke sitzt über dem Finger */
  private setFinger(p: { x: number; y: number }): void {
    this.fm = {
      x: clamp((p.x - this.cx) / this.pu, -(this.fhw + 2), this.fhw + 2),
      y: clamp((p.y - this.off - this.cy) / this.pu, -(this.fhh + 2), this.fhh + 2),
    };
    this.frame();
  }

  // ------------------------------------------------------------------ virtueller Finger (Film / Autoplay)

  private restPoint(): Vec {
    const { w, h } = this.ctx.stage;
    const hs = clamp(this.ctx.stage.u * 13, 48, 110);
    return { x: w - hs * 0.75, y: this.demo ? captionTop(this.ctx.stage) - hs * 0.95 : h - hs * 0.7 };
  }

  /** Fingerort (px), bei dem die Marke auf der Position `aim` (u) sitzt */
  private fingerFor(aim: Vec, anchor: Vec): Vec {
    const { w, h } = this.ctx.stage;
    const bx = this.cx + anchor.x * this.pu;
    const by = this.cy + anchor.y * this.pu;
    let x = this.cx + aim.x * this.pu;
    let y = this.cy + aim.y * this.pu + this.off;
    if (this.axes === 'y') x = bx - 10 * this.pu; // Finger links von der Marke
    if (this.axes === 'x') y = by + this.off + 2 * this.pu; // Finger unter der Schiene
    return { x: clamp(x, 8, w - 8), y: clamp(y, 2, h - 2) };
  }

  private autoUpdate(dt: number, t: number): void {
    const { rng, hud } = this.ctx;
    const A = this.auto;
    const demo = this.demo;
    const info = (p: Vec): PointerInfo => ({ id: VF_ID, x: p.x, y: p.y, t, type: 'ghost' });
    if (A.st === 'idle' && this.phase === 'play') {
      const react = demo ? 900 : rng.range(400, 800);
      if (t - this.phaseT >= react) {
        A.st = 'approach';
        A.t0 = t;
        A.from = { ...this.vf };
        const t0 = this.rule.target(0);
        const d0 = freeDisturbance(this.rule.disturbance?.(0), this.axes);
        A.to = this.fingerFor({ x: t0.x - d0.x, y: t0.y - d0.y }, t0);
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
        A.noise = { x: 0, y: 0 };
        // Gelegentlich ein Aussetzer (nur im Spielmodus)
        A.lapseAt = !demo && rng.chance(0.25 + 0.03 * this.level) ? rng.range(0.15, 0.8) * this.seconds : -1;
        const ang = rng.range(0, Math.PI * 2);
        A.lapseDir = { x: Math.cos(ang), y: Math.sin(ang) };
      }
      return;
    }
    if (A.st === 'carry') {
      if (this.phase !== 'play' || !this.finger) {
        A.st = 'after';
        return;
      }
      // Sollort: Ziel mit kleiner Verzögerung (Sehen → Hand), Störung mit gleicher Verzögerung ausgeglichen, plus Rauschen
      const lag = demo ? 0.06 : 0.11 + 0.02 * rng.normal();
      const sim = clamp(this.s - lag, 0, this.seconds);
      const tg = this.rule.target(sim);
      const d = freeDisturbance(this.rule.disturbance?.(sim), this.axes);
      const sigma = (demo ? 0.3 : 0.55) * this.band;
      const k = 3 * dt;
      const q = Math.sqrt(dt) * 2.4;
      A.noise = { x: A.noise.x - A.noise.x * k + rng.normal() * sigma * q, y: A.noise.y - A.noise.y * k + rng.normal() * sigma * q };
      const aim = { x: tg.x - d.x + A.noise.x, y: tg.y - d.y + A.noise.y };
      if (A.lapseAt >= 0) {
        const el = this.s - A.lapseAt;
        if (el > 0 && el < 0.9) {
          const bump = 2 * this.band * Math.sin((Math.PI * el) / 0.9);
          aim.x += A.lapseDir.x * bump;
          aim.y += A.lapseDir.y * bump;
        }
      }
      const target = this.fingerFor(aim, tg);
      const qq = 1 - Math.exp(-dt * (demo ? 14 : 11));
      this.vf = { x: lerp(this.vf.x, target.x, qq), y: clamp(lerp(this.vf.y, target.y, qq), 2, this.ctx.stage.h - 2) };
      this.pointerMove(info(this.vf));
      if (demo && A.captioned < 2 && this.s > this.seconds * 0.35 && this.ctx.texts.captions.band) {
        A.captioned = 2;
        hud.caption(this.ctx.texts.captions.band);
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
    this.buildRule();
    this.resetRoundState();
    this.vf = this.restPoint();
    this.auto.st = 'idle';
    if (wasFb) this.phase = 'play';
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr, 'grid');
    this.drawRail(g);
    this.drawPreview(g);
    this.drawTrail(g);
    this.drawTarget(g);
    this.drawMarker(g);
    this.drawFeedback(g, t);
    if (!this.started && !this.demo && this.phase === 'play') {
      const size = clamp(u * 3.6, 14, 24);
      text(g, this.ctx.texts.feedback.start, w / 2, h - Math.max(14, u * 3) - size * 0.5, size, C.fg, { weight: 700 });
    }
    if (this.ctx.autoplay) hand(g, this.vf.x, this.vf.y, clamp(u * 13, 48, 110), !!this.finger);
  }

  /** Schiene bei gesperrter Achse (dünne Führungslinie) */
  private drawRail(g: CanvasRenderingContext2D): void {
    if (this.axes === 'xy') return;
    const { h } = this.ctx.stage;
    const c = this.px(this.tgt);
    g.save();
    g.strokeStyle = 'rgba(255,255,255,0.12)';
    g.lineWidth = Math.max(2, this.pu * 0.3);
    g.setLineDash([5, 9]);
    g.beginPath();
    if (this.axes === 'x') {
      g.moveTo(this.cx - this.fhw * this.pu, c.y);
      g.lineTo(this.cx + this.fhw * this.pu, c.y);
    } else {
      g.moveTo(c.x, Math.max(0, this.cy - this.fhh * this.pu));
      g.lineTo(c.x, Math.min(h, this.cy + this.fhh * this.pu));
    }
    g.stroke();
    g.restore();
  }

  private drawPreview(g: CanvasRenderingContext2D): void {
    if (this.preview <= 0) return;
    const s = clamp(this.s, 0, this.seconds);
    const end = Math.min(this.seconds, s + this.preview);
    if (end - s < 0.05) return;
    const n = 36;
    g.save();
    g.lineJoin = 'round';
    g.lineCap = 'round';
    g.lineWidth = Math.max(2.5, this.pu * 0.4);
    g.setLineDash([4, 9]);
    g.strokeStyle = withAlpha(LINE, 0.4);
    g.beginPath();
    for (let i = 0; i <= n; i++) {
      const p = this.px(this.rule.target(lerp(s, end, i / n)));
      if (i) g.lineTo(p.x, p.y);
      else g.moveTo(p.x, p.y);
    }
    g.stroke();
    g.restore();
  }

  private drawTrail(g: CanvasRenderingContext2D): void {
    if (this.trail.length < 2) return;
    g.save();
    g.beginPath();
    for (let i = 0; i < this.trail.length; i++) {
      const p = this.px(this.trail.at(i));
      if (i) g.lineTo(p.x, p.y);
      else g.moveTo(p.x, p.y);
    }
    g.lineWidth = Math.max(2, this.pu * 0.3);
    g.setLineDash([5, 6]);
    g.strokeStyle = 'rgba(253,230,138,0.45)';
    g.stroke();
    g.restore();
  }

  private drawTarget(g: CanvasRenderingContext2D): void {
    const c = this.px(this.tgt);
    const br = this.band * this.pu;
    const b = this.blend;
    circle(g, c.x, c.y, br, withAlpha(this.accent, 0.13 + 0.12 * b));
    // Bandrand: bei „im Band“ kräftiger (weicher Übergang, die Form bleibt gleich)
    ring(g, c.x, c.y, br, withAlpha(this.accent, 0.55 + 0.4 * b), Math.max(2, this.pu * (0.25 + 0.2 * b)));
    // Kreuz in der Mitte: Zielpunkt (Form, nicht nur Farbe)
    const arm = Math.max(7, this.pu * 1.4);
    g.save();
    g.strokeStyle = C.white;
    g.globalAlpha = 0.9;
    g.lineWidth = Math.max(2.5, this.pu * 0.35);
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(c.x - arm, c.y);
    g.lineTo(c.x + arm, c.y);
    g.moveTo(c.x, c.y - arm);
    g.lineTo(c.x, c.y + arm);
    g.stroke();
    g.restore();
  }

  private drawMarker(g: CanvasRenderingContext2D): void {
    const r = this.markR;
    const m = this.px(this.mk);
    const f = this.finger;
    if (f) {
      // Faden und Ring zeigen die Fingerposition (der Finger liegt unter der Marke)
      g.save();
      g.strokeStyle = 'rgba(255,255,255,0.3)';
      g.lineWidth = Math.max(2, this.ctx.stage.u * 0.3);
      g.setLineDash([6, 6]);
      g.beginPath();
      g.moveTo(this.fingerPx.x, this.fingerPx.y);
      g.lineTo(m.x, m.y + r);
      g.stroke();
      g.restore();
      ring(g, this.fingerPx.x, this.fingerPx.y, Math.max(10, this.ctx.stage.u * 1.6), 'rgba(255,255,255,0.55)', 2.5);
    }
    glow(g, m.x, m.y, r, MARK, 0.5);
    circle(g, m.x, m.y, r, MARK);
    g.save();
    g.globalAlpha = 0.35;
    circle(g, m.x - r * 0.3, m.y - r * 0.32, r * 0.32, '#ffffff');
    g.restore();
    // Anzeige-Pfeil (nur wenn die Regel einen liefert)
    const hv = this.rule.hint?.(clamp(this.s, 0, this.seconds));
    const len = hv ? Math.hypot(hv.x, hv.y) : 0;
    if (hv && len > 0.05) {
      const dx = hv.x / len;
      const dy = hv.y / len;
      const r0 = r + this.pu * 1.2;
      const r1 = r0 + this.pu * 3;
      const ax = m.x + dx * r1;
      const ay = m.y + dy * r1;
      const hs = this.pu * 1.1;
      g.save();
      g.strokeStyle = 'rgba(255,255,255,0.75)';
      g.lineWidth = Math.max(2.5, this.pu * 0.35);
      g.lineCap = 'round';
      g.lineJoin = 'round';
      g.beginPath();
      g.moveTo(m.x + dx * r0, m.y + dy * r0);
      g.lineTo(ax, ay);
      g.moveTo(ax - dx * hs + dy * hs * 0.8, ay - dy * hs - dx * hs * 0.8);
      g.lineTo(ax, ay);
      g.lineTo(ax - dx * hs - dy * hs * 0.8, ay - dy * hs + dx * hs * 0.8);
      g.stroke();
      g.restore();
    }
  }

  private drawFeedback(g: CanvasRenderingContext2D, t: number): void {
    if (this.phase !== 'fb' && this.phase !== 'end') return;
    const a = this.ctx.reducedMotion ? 1 : clamp((t - this.phaseT) / 250, 0, 1);
    const size = this.pu * 4.4;
    const x = this.cx + this.fhw * this.pu * 0.72;
    const y = this.cy - this.fhh * this.pu * 0.75;
    g.save();
    g.globalAlpha = a;
    circle(g, x, y, size * 0.75, this.lastPass ? withAlpha(this.accent, 0.95) : 'rgba(255,255,255,0.22)');
    g.restore();
    text(g, this.lastPass ? '✓' : '•', x, y + 1, size, C.white, { weight: 800, alpha: a });
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.hud.setProgress(1);
    ctx.sfx.done();
    const thr = this.stair.threshold();
    const frac = this.all.fraction * 100;
    const k = this.cfg.tipKeys ?? { low: 'ahead', mid: 'calm', high: 'great' };
    let tip = k.high;
    if (frac < 55) tip = k.low;
    else if (frac < 80) tip = k.mid;
    ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'inBand', value: Math.round(frac), unit: 'percent' },
        { key: 'deviation', value: deviationPercent(this.all.meanRelative), unit: 'percent' },
        { key: 'passed', value: this.passedRounds, unit: 'count' },
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip,
    });
  }
}

/** Fabrik für `ExerciseDefinition.create`: `create: nachfuehren({ axes: 'xy', makeRule })` */
export function nachfuehren(cfg: NachfuehrenConfig): (ctx: ExerciseContext) => Exercise {
  return (ctx) => new NachfuehrenExercise(ctx, cfg);
}
