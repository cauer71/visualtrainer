/**
 * Sprossen-Leiter – Felder einer Leiter im Zickzack im Takt antippen
 * (Katalog 807, „Koordinationsleiter“ – hier als ehrliche Touch-Übung am Bildschirm, keine Beinarbeit).
 *
 * Das Original ist ein Maus-Spiel (Leitern scrollen abwärts, Zeiger im Wechsel links/rechts, Tempo in Pixeln pro Bild,
 * ohne Obergrenze, roter Blitz, Wackeln). Hier:
 * - Eine Leiter aus 4–7 Feldern (links/rechts im Zickzack, unten beginnend). Ein Taktgeber (Kreis oben) schwingt sanft;
 *   die Sprosse, die dran ist, „atmet“ im gleichen Takt, ein Ring schrumpft zum Schlag hin. Alles weich, höchstens 2 Hz.
 * - Zur k-ten Sprosse gehört der k-te Schlag. Der erste Tipp im Fenster ±½ Takt zählt: richtige Sprosse = Treffer mit
 *   Abweichung in ms (− zu früh, + zu spät), andere Sprosse oder kein Tipp = Fehler (weiches ✗). Antippzeit = Ereigniszeit
 *   des Fingers (virtuelle Zeit), nicht die Frame-Zeit. Die Geräteverzögerung des Touchscreens steckt in den ms.
 * - Stufe (Staircase 2-down/1-up): Takt 1,0 s → 0,5 s, Toleranz 30 % des Takts, 4 → 7 Sprossen. Eine Leiter gelingt, wenn
 *   mindestens 75 % der Sprossen im Takt getroffen sind. Feste Zahl von Leitern, keine Zeitstrafe, kein Bonus für Tempo.
 *   Hauptwert = Stufe; Zusatz: mittlere Abweichung (ms), Tendenz (früh/spät), Fehler.
 * - Kein Rot, kein Blitz, kein Wackeln. ✓/✗ und Zahlen statt Farbe allein; Felder tragen ihre Nummer.
 *
 * Geister-Hand (Film/Autoplay): Die Übung führt selbst eine virtuelle Hand, die zeitgenau zum Schlag tippt.
 */
import { background, C, circle, fillRR, rrPath, text, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { captionTopY, handSize, restSpot, softBadge, VirtualHand } from '../_shared/koerper-b';
import {
  beatPhase,
  beatPulse,
  LadderRun,
  LEAD_BEATS,
  MAX_LEVEL,
  meanAbs,
  meanSigned,
  MIN_LEVEL,
  periodMsFor,
  planTaps,
  type PlannedTap,
  pointsFor,
  rungAt,
  rungCountFor,
  rungPositions,
  toleranceMsFor,
  type Rung,
} from './logic';
import { de, it } from './texts';

const ROUNDS = 8;
const QUICK_ROUNDS = 2;
const FB_MS = 1500;
const END_MS = 1300;
const PRE_MS = 500;
const START_LEVEL = 2;
const DEMO_LEVEL = 2;
const DEMO_PERIOD = 1100;
const MIN_PU = 6;

const SKY = '#7DD3FC';
const FIELD = '#15294A';

type Phase = 'play' | 'fb' | 'end' | 'done';

interface Geo {
  key: string;
  n: number;
  rungs: Rung[];
  fw: number;
  fh: number;
  cx: number;
  top: number;
  bottom: number;
  mx: number;
  my: number;
  mr: number;
  pad: number;
}

class SprossenLeiter implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private phase: Phase = 'play';
  private phaseT = 0;
  private geo: Geo | null = null;
  // Durchgang
  private level = MIN_LEVEL;
  private period = 1000;
  private tol = 300;
  private n = 4;
  private run!: LadderRun;
  private T0 = 0;
  private nextTick = -LEAD_BEATS;
  private marks: number[] = [];
  private wrongTaps: Array<{ rung: number; t: number }> = [];
  private lastPass = false;
  // Auswertung
  private rounds = 0;
  private passed = 0;
  private devs: number[] = [];
  private errors = 0;
  private points = 0;
  // virtuelle Hand
  private readonly vh = new VirtualHand();
  private plan: PlannedTap[] = [];
  private planIdx = 0;
  private prevTapAt = 0;
  private glideStarted = -1;
  private captioned = 0;

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

  private layout(): Geo {
    const { w, h, u } = this.ctx.stage;
    const key = `${w}x${h}:${this.demo ? 1 : 0}:${this.n}`;
    if (this.geo && this.geo.key === key) return this.geo;
    const pu = Math.max(u, MIN_PU);
    const top = this.demo ? 4 * pu : 12 * pu;
    const bottom = this.demo ? captionTopY(this.ctx.stage) - 1.5 * pu : h - 3 * pu;
    const mr = clamp(pu * 3, 18, 34);
    const my = top + mr;
    const ladderTop = my + mr + 2.5 * pu;
    const avail = Math.max(60, bottom - ladderTop);
    const fh = clamp((avail / (this.n + 0.6)) * 0.86, 44, pu * 9.5);
    const fw = clamp(w * 0.3, 90, pu * 34);
    const cx = w / 2;
    const dx = fw * 0.62;
    this.geo = {
      key,
      n: this.n,
      rungs: rungPositions(this.n, { cx, top: ladderTop + fh / 2, bottom: bottom - fh / 2, dx }),
      fw,
      fh,
      cx,
      top: ladderTop,
      bottom,
      mx: cx,
      my,
      mr,
      pad: Math.max(8, pu),
    };
    return this.geo;
  }

  resize(): void {
    this.geo = null;
    this.layout();
    const rp = restSpot(this.ctx.stage, this.demo);
    if (!this.vh.gliding) this.vh.snap(rp.x, rp.y);
  }

  // ------------------------------------------------------------------ Ablauf

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    if (this.ctx.autoplay) ghost.hide();
    const rp = restSpot(this.ctx.stage, this.demo);
    this.vh.snap(rp.x, rp.y);
    this.newRound(t);
  }

  private newRound(t: number): void {
    const { hud, texts, rng } = this.ctx;
    this.level = this.demo ? DEMO_LEVEL : Math.floor(this.stair.level + 1e-9);
    this.period = this.demo ? DEMO_PERIOD : periodMsFor(this.level);
    this.tol = this.demo ? 0.3 * DEMO_PERIOD : toleranceMsFor(this.level);
    this.n = rungCountFor(this.level);
    if (this.demo) this.n = 4;
    this.geo = null;
    this.layout();
    this.run = new LadderRun(this.n, this.period, this.tol);
    this.T0 = t + PRE_MS + LEAD_BEATS * this.period;
    this.nextTick = -LEAD_BEATS;
    this.marks = new Array(this.n).fill(-1e9);
    this.wrongTaps = [];
    this.phase = 'play';
    this.phaseT = t;
    this.captioned = 0;
    if (this.ctx.autoplay) {
      this.plan = planTaps(rng, this.n, this.level, this.demo ? [-18, 12, -8, 16] : undefined);
      this.planIdx = 0;
      this.prevTapAt = t;
      this.glideStarted = -1;
    }
    if (this.demo) hud.caption(texts.captions.beat);
    else hud.setLabel(`${texts.feedback.level} ${this.level} · ${Math.min(this.rounds + 1, this.total)}/${this.total}`);
  }

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    const { ctx } = this;
    this.vh.update(t);
    if (this.phase === 'play') {
      const rel = t - this.T0;
      // Taktschläge hörbar (im Film stumm)
      while (this.nextTick < this.n && rel >= this.nextTick * this.period) {
        if (this.nextTick <= this.n - 1) ctx.sfx.tick();
        this.nextTick++;
      }
      if (this.demo && rel >= -this.period * 0.3 && this.captioned < 1) {
        this.captioned = 1;
        ctx.hud.caption(ctx.texts.captions.tap);
      }
      for (const k of this.run.sweep(rel)) {
        this.marks[k] = t;
        ctx.sfx.bad();
      }
      if (ctx.autoplay) this.autoUpdate(t);
      if (this.run.done) this.finishRound(t);
    }
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
    this.phase = 'fb';
    this.phaseT = t;
    const on = this.run.onTimeCount;
    this.lastPass = this.run.passed;
    if (!this.demo) {
      this.rounds++;
      if (this.lastPass) this.passed++;
      this.devs.push(...this.run.devs);
      this.errors += this.run.errorCount;
      this.points += pointsFor(this.level, on);
      this.stair.update(this.lastPass);
      ctx.hud.setScore(this.points);
      ctx.hud.setProgress(this.rounds / this.total);
    }
    if (this.lastPass) ctx.sfx.good();
    else ctx.sfx.tap();
    const ma = meanAbs(this.run.devs);
    const size = clamp(ctx.stage.u * 4.4, 17, 32);
    const label = `${this.lastPass ? '✓' : '•'} ${on}/${this.n} ${ctx.texts.feedback.inBeat}${Number.isFinite(ma) ? ` · Ø ${ctx.fmt.ms(Math.round(ma))}` : ''}`;
    const G = this.layout();
    ctx.hud.toast(label, this.lastPass ? 'good' : 'info', { x: ctx.stage.w / 2, y: Math.max(size * 1.4, G.my + G.mr + size * 1.6), ms: FB_MS - 200, size });
    if (this.demo) ctx.hud.caption(ctx.texts.captions.check);
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'play') return;
    const G = this.layout();
    const rung = rungAt(p.x, p.y, G.rungs, G.fw, G.fh, G.pad);
    if (rung < 0) return;
    const rep = this.run.tap(p.t - this.T0, rung);
    if (rep.kind === 'hit') {
      this.marks[rep.k] = p.t;
      this.ctx.sfx.tap();
      if (this.demo && rep.k >= 1 && this.captioned < 2) {
        this.captioned = 2;
        this.ctx.hud.caption(this.ctx.texts.captions.up);
      }
    } else if (rep.kind === 'wrong') {
      this.marks[rep.k] = p.t;
      this.wrongTaps.push({ rung, t: p.t });
      this.ctx.sfx.bad();
    }
  }

  // ------------------------------------------------------------------ virtuelle Hand

  private autoUpdate(t: number): void {
    const G = this.layout();
    const i = this.planIdx;
    if (i >= this.plan.length) return;
    const pl = this.plan[i];
    const at = this.T0 + pl.rel;
    // Ziel der Hand: die geplante Sprosse (bei ausgelassenem Tipp bleibt sie dort, wo sie ist)
    const target = pl.rung >= 0 ? G.rungs[pl.rung] : null;
    if (this.glideStarted !== i) {
      const begin = Math.max(t, i === 0 ? this.T0 - 900 : this.prevTapAt + 140);
      if (t >= begin) {
        this.glideStarted = i;
        if (target) this.vh.glide(target.x, target.y, t, Math.max(120, at - t - 10));
      }
    }
    if (t >= at) {
      if (target) {
        this.vh.snap(target.x, target.y);
        this.vh.press(at);
        this.pointerDown({ id: -2, x: target.x, y: target.y, t: at, type: 'ghost' });
      }
      this.prevTapAt = at;
      this.planIdx++;
    }
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    const G = this.layout();
    background(g, w, h, dpr);
    const rel = t - this.T0;
    this.drawMetronome(g, G, rel);
    this.drawLadder(g, G, rel, t);
    if (this.ctx.autoplay) this.vh.render(g, t, handSize(this.ctx.stage));
  }

  private drawMetronome(g: CanvasRenderingContext2D, G: Geo, rel: number): void {
    const p = this.phase === 'play' && rel >= -LEAD_BEATS * this.period - 200 && rel < (this.n - 1) * this.period + this.period * 0.6 ? beatPulse(rel, this.period) : 0;
    g.save();
    // Schiene mit Takt-Punkten (Zahl der Sprossen), damit der Fortschritt auch ohne Farbe lesbar ist
    const r = G.mr;
    const sc = this.ctx.reducedMotion ? 1 : 1 + 0.16 * p;
    ring2(g, G.mx, G.my, r * sc, withAlpha(SKY, 0.35 + 0.5 * p));
    circle(g, G.mx, G.my, r * 0.62 * sc, withAlpha(SKY, 0.14 + 0.7 * p));
    g.restore();
    const size = clamp(G.mr * 0.6, 11, 20);
    text(g, this.ctx.texts.feedback.beat, G.mx + r * 1.6, G.my, size, C.dim, { align: 'left', weight: 700 });
  }

  private drawLadder(g: CanvasRenderingContext2D, G: Geo, rel: number, t: number): void {
    const { u } = this.ctx.stage;
    // Holme
    const left = G.cx - G.fw * 0.62 - G.fw / 2 - 10;
    const right = G.cx + G.fw * 0.62 + G.fw / 2 + 10;
    g.save();
    g.strokeStyle = 'rgba(232,238,247,0.16)';
    g.lineWidth = Math.max(3, u * 0.6);
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(left, G.top);
    g.lineTo(left, G.bottom);
    g.moveTo(right, G.top);
    g.lineTo(right, G.bottom);
    g.stroke();
    g.restore();
    const next = this.phase === 'play' ? this.run.next : this.n;
    for (let k = 0; k < G.rungs.length; k++) this.drawRung(g, G, k, next, rel, t);
    // zusätzliche Fehl-Tipps (falsche Sprosse)
    for (const w of this.wrongTaps) {
      const a = clamp(1 - (t - w.t) / 900, 0, 1);
      if (a <= 0) continue;
      const r = G.rungs[w.rung];
      softBadge2(g, r.x + G.fw * 0.5 - 6, r.y - G.fh * 0.5 + 2, clamp(G.fh * 0.28, 11, 18), a);
    }
  }

  private drawRung(g: CanvasRenderingContext2D, G: Geo, k: number, next: number, rel: number, t: number): void {
    const r = G.rungs[k];
    const res = this.run.results[k];
    const isNext = this.phase === 'play' && k === next;
    const pulse = isNext ? beatPulse(rel - k * this.period, this.period) : 0;
    const sc = isNext && !this.ctx.reducedMotion ? 1 + 0.07 * pulse : 1;
    const fw = G.fw * sc;
    const fh = G.fh * sc;
    const x = r.x - fw / 2;
    const y = r.y - fh / 2;
    const rad = Math.min(fh * 0.3, 16);
    let fill: string = FIELD;
    let edge = 'rgba(232,238,247,0.3)';
    let edgeW = 2;
    if (isNext) {
      fill = `rgba(125,211,252,${0.12 + 0.3 * pulse})`;
      edge = `rgba(125,211,252,${0.7 + 0.3 * pulse})`;
      edgeW = 3 + pulse * 1.5;
    } else if (res.state === 'hit') {
      fill = res.onTime ? 'rgba(45,212,191,0.28)' : 'rgba(232,238,247,0.14)';
      edge = res.onTime ? 'rgba(94,234,212,0.9)' : 'rgba(232,238,247,0.55)';
      edgeW = 2.5;
    } else if (res.state === 'wrong' || res.state === 'miss') {
      fill = 'rgba(148,163,184,0.12)';
      edge = 'rgba(148,163,184,0.6)';
    }
    fillRR(g, x, y, fw, fh, rad, fill);
    g.save();
    rrPath(g, x, y, fw, fh, rad);
    g.strokeStyle = edge;
    g.lineWidth = edgeW;
    if (res.state === 'miss' || res.state === 'wrong') g.setLineDash([6, 5]);
    g.stroke();
    g.restore();
    // Anflug-Ring: schrumpft zum Schlag hin (nur bei voller Bewegung)
    if (isNext && !this.ctx.reducedMotion) {
      const ph = beatPhase(rel - k * this.period, this.period);
      const e = ph * ph;
      const grow = 1 + 0.5 * (1 - e);
      g.save();
      g.globalAlpha = 0.6 * e;
      rrPath(g, r.x - (G.fw * grow) / 2, r.y - (G.fh * grow) / 2, G.fw * grow, G.fh * grow, rad * grow);
      g.strokeStyle = SKY;
      g.lineWidth = 2.5;
      g.stroke();
      g.restore();
    }
    // Nummer
    const size = clamp(G.fh * 0.46, 16, 34);
    text(g, String(k + 1), r.x - G.fw * 0.34, r.y, size, isNext ? C.white : 'rgba(232,238,247,0.75)', { weight: 800 });
    // Ergebnis: ✓ mit Abweichung oder ✗
    const since = t - this.marks[k];
    if (res.state !== 'pending' && this.marks[k] > -1e8) {
      const br = clamp(G.fh * 0.3, 12, 20);
      const a = this.ctx.reducedMotion ? 1 : clamp(since / 150, 0, 1);
      g.save();
      g.globalAlpha = a;
      softBadge(g, r.x + G.fw * 0.28, r.y, br, res.state === 'hit' ? 'ok' : 'bad');
      g.restore();
      if (res.state === 'hit') {
        const ts = clamp(G.fh * 0.3, 12, 20);
        text(g, this.ctx.fmt.msSigned(Math.round(res.dev)), r.x + G.fw * 0.28 + br * 1.3, r.y, ts, res.onTime ? '#99F6E4' : C.fg, { align: 'left', weight: 700, alpha: a });
      }
    }
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.hud.setProgress(1);
    ctx.sfx.done();
    const thr = this.stair.threshold();
    const ma = meanAbs(this.devs);
    const bias = meanSigned(this.devs);
    let tip = 'great';
    if (this.errors >= Math.max(3, this.rounds)) tip = 'count';
    else if (Number.isFinite(bias) && bias > 25) tip = 'late';
    else if (Number.isFinite(bias) && bias < -25) tip = 'early';
    ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary: [
        ...(Number.isFinite(ma) ? [{ key: 'meanDev', value: Math.round(ma), unit: 'ms' as const }] : []),
        ...(Number.isFinite(bias) ? [{ key: 'bias', value: Math.round(bias), unit: 'msSigned' as const }] : []),
        { key: 'errors', value: this.errors, unit: 'count' as const },
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip,
    });
  }
}

/** Kreisring (nur Linie) */
function ring2(g: CanvasRenderingContext2D, x: number, y: number, r: number, color: string): void {
  g.save();
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.lineWidth = Math.max(2.5, r * 0.12);
  g.strokeStyle = color;
  g.stroke();
  g.restore();
}

/** Kleines ✗-Abzeichen mit Deckkraft a */
function softBadge2(g: CanvasRenderingContext2D, x: number, y: number, r: number, a: number): void {
  g.save();
  g.globalAlpha = a;
  softBadge(g, x, y, r, 'bad');
  g.restore();
}

export const sprossenLeiter: ExerciseDefinition = {
  id: 'sprossen-leiter',
  category: 'bewegung',
  minutes: 1,
  color: '#3B82B8',
  showsLevel: true,
  icon:
    '<path d="M14 6v36M34 6v36" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".45"/><rect x="6" y="31" width="18" height="8" rx="3" fill="currentColor"/><rect x="24" y="20" width="18" height="8" rx="3" fill="none" stroke="currentColor" stroke-width="2.8"/><rect x="6" y="9" width="18" height="8" rx="3" fill="none" stroke="currentColor" stroke-width="2.8" stroke-dasharray="3.4 3"/>',
  texts: { de, it },
  create: (ctx) => new SprossenLeiter(ctx),
};
