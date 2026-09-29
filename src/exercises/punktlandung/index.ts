/**
 * Punktlandung – den Moment treffen, in dem eine herankommende Kugel ankommt
 * (Zeit bis zum Kontakt, vorausschauendes Timing).
 *
 * Umsetzung nach docs/wissenschaft/03-wahrnehmen-und-erfassen.md (Abschnitt 1.4):
 * - Echte perspektivische Annäherung mit konstanter Geschwindigkeit: 1/r sinkt linear,
 *   1/r(t) = 1/r0 − (1/r0 − 1/R)·t/T (gleichbedeutend: r = R/z, z läuft linear von R/r0 auf 1).
 *   Die Kugel wird daher zum Schluss immer schneller größer – wie ein echter Ball
 *   (statt linear zu wachsen, was einem abbremsenden Objekt entspräche).
 * - Startgröße, Flugzeit und Vorlauf zufällig → weder Größe noch Rhythmus verraten den Moment.
 * - Verdeckung als Schwierigkeit (0 → 200 → … → 1.200 ms vor dem Ring unsichtbar, immer
 *   mindestens 600 ms sichtbar). Toleranzen wachsen mit der Verdeckung (6 % bzw. 12 %).
 * - Rückmeldung nach jedem Tipp in Millisekunden (zu früh / zu spät) mit Zeitbalken.
 * - Ankunftszeit analytisch, Tippzeit aus event.timeStamp.
 * - Es geht um Timing – nicht um räumliches Sehen (am flachen Bildschirm nicht möglich).
 */
import { background, C, circle, font, glow, ring, rrPath, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut, mean } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, Metric, PointerInfo } from '../../core/types';
import { de, it } from './texts';

const TRIALS = 14;
const QUICK_TRIALS = 2;
/** Nach dem Kontakt wächst die Kugel noch kurz weiter, höchstens bis 1,3 × Ring */
const MAX_SIZE = 1.3;
const PASS_GROW = 100;
const PASS_FADE = 200;
const MISS_AFTER = 500;
const FEEDBACK_MS = 1200;
const DEMO_FEEDBACK_MS = 1450;
const OCC_FADE = 80;
const APPEAR_FADE = 90;
/** So schnell kann niemand auf das Erscheinen reagieren → Tipp gehört noch zur Pause */
const APPEAR_GRACE = 150;
/** Die Kugel ist immer mindestens so lange sichtbar (sonst wird die Verdeckung gekürzt) */
const MIN_VISIBLE = 600;
/** Verdeckung in ms für Stufe 1…7, ab Stufe 8 bleibt es bei 1.200 ms */
const OCC_STEPS = [0, 0, 200, 400, 600, 900, 1200];
const BAR_RANGE = 300;
const LEVEL_MIN = 1;
const LEVEL_MAX = 12;
const GLOW_REF = 40;
const GLOW_COLOR = '#A3E635';

type Phase = 'pre' | 'fly' | 'feedback' | 'done';
type Rating = 'perfect' | 'super' | 'good' | 'early' | 'late' | 'missed';

interface Tolerance {
  /** „Punktlandung“ */
  perfect: number;
  /** „Super“ – zählt als Erfolg für die Stufe */
  good: number;
}

interface Trial {
  level: number;
  /** Verdeckung vor dem Kontakt (ms, schon auf die Mindest-Sichtzeit gekürzt) */
  occ: number;
  /** Flugzeit bis zum Ring (ms) */
  dur: number;
  /** Vorlauf – nur Tunnel und Ring (ms) */
  pre: number;
  /** Start-„Entfernung“ R / r0 (Kontakt bei z = 1) */
  z0: number;
  tol: Tolerance;
}

interface Outcome {
  rating: Rating;
  err: number | null;
  /** Kugelgröße zum Tippzeitpunkt relativ zum Ring (1 = genau am Ring) */
  size: number;
  t0: number;
  tol: Tolerance;
}

interface DemoTrial {
  occ: number;
  dur: number;
  pre: number;
  z0: number;
  /** gezeigte Abweichung des Tipps (ms) */
  err: number;
  caption: 'tap' | 'hidden';
}

const DEMO: DemoTrial[] = [
  { occ: 0, dur: 2000, pre: 1000, z0: 6, err: 6, caption: 'tap' },
  { occ: 500, dur: 2000, pre: 800, z0: 6, err: 46, caption: 'hidden' },
];

/** Verdeckung laut Stufe (ms vor dem Kontakt) */
export function occlusionMs(level: number): number {
  const L = Math.max(1, Math.floor(level + 1e-9));
  return OCC_STEPS[Math.min(L, OCC_STEPS.length) - 1];
}

/** Flugzeit-Bereich (ms): Einstieg 1,2–2,5 s, ab Stufe 6 0,8–3,5 s */
export function durationRange(level: number): [number, number] {
  return Math.floor(level + 1e-9) >= 6 ? [800, 3500] : [1200, 2500];
}

/**
 * Startgröße r0 / R: am Anfang sanft (0,22–0,30), später auch „von weit her“ (ab 0,10).
 * Ab Stufe 9 – die Verdeckung ist dann ausgereizt – kommt die Kugel immer öfter von weit:
 * sie wächst im sichtbaren Teil weniger, der Moment ist schwerer abzuschätzen.
 */
export function startSizeRange(level: number): [number, number] {
  const L = Math.floor(level + 1e-9);
  if (L <= 2) return [0.22, 0.3];
  if (L <= 5) return [0.15, 0.3];
  if (L <= 8) return [0.1, 0.3];
  return [0.1, Math.max(0.12, 0.3 - (L - 8) * 0.045)];
}

/** Toleranzen wachsen mit der Verdeckung: max(30 ms; 6 %) bzw. max(60 ms; 12 %) */
export function tolerance(occ: number): Tolerance {
  return { perfect: Math.max(30, occ * 0.06), good: Math.max(60, occ * 0.12) };
}

function rate(err: number, tol: Tolerance): Rating {
  const a = Math.abs(err);
  if (a <= tol.perfect) return 'perfect';
  if (a <= tol.good) return 'super';
  if (a <= tol.good * 2) return 'good';
  return err < 0 ? 'early' : 'late';
}

/** Punkte: 100 / 60 / 30 / 10 (bei 60 ms-Toleranz: ≤ 30 / 60 / 120 / 200 ms) */
function basePoints(absErr: number, tol: Tolerance): number {
  if (absErr <= tol.perfect) return 100;
  if (absErr <= tol.good) return 60;
  if (absErr <= tol.good * 2) return 30;
  if (absErr <= (tol.good * 10) / 3) return 10;
  return 0;
}

function ratingColor(r: Rating): string {
  if (r === 'perfect' || r === 'super') return '#4ADE80';
  if (r === 'good') return C.fg;
  // Keine gesättigt roten Fehlermeldungen (Sicherheitsvorgabe) → Bernstein / Orange
  if (r === 'missed') return '#FB923C';
  return '#FBBF24';
}

// ---------------------------------------------------------------------------
// Zeichnen

/** Schattierte Kugel (Tennisball) mit Naht – die Naht macht das Größerwerden noch deutlicher */
function drawBall(g: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number): void {
  if (alpha <= 0.001 || r < 0.5) return;
  // Leuchten: ein fester Sprite, skaliert → kein neuer Sprite für jede Größe
  g.save();
  g.translate(x, y);
  g.scale(r / GLOW_REF, r / GLOW_REF);
  glow(g, 0, 0, GLOW_REF, GLOW_COLOR, 0.45 * alpha);
  g.restore();

  g.save();
  g.globalAlpha = alpha;
  const grad = g.createRadialGradient(x - r * 0.38, y - r * 0.42, r * 0.04, x - r * 0.12, y - r * 0.12, r * 1.18);
  grad.addColorStop(0, '#F7FEE7');
  grad.addColorStop(0.28, '#D9F99D');
  grad.addColorStop(0.8, '#84CC16');
  grad.addColorStop(1, '#5B8C12');
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fillStyle = grad;
  g.fill();
  if (r > 5) {
    g.save();
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.clip();
    g.translate(x, y);
    g.rotate(-0.5);
    g.beginPath();
    g.arc(-1.32 * r, 0, 0.98 * r, -1, 1);
    g.moveTo(1.32 * r + 0.98 * r * Math.cos(Math.PI - 1), 0.98 * r * Math.sin(Math.PI - 1));
    g.arc(1.32 * r, 0, 0.98 * r, Math.PI - 1, Math.PI + 1);
    g.strokeStyle = 'rgba(255,255,255,0.8)';
    g.lineWidth = Math.max(1, r * 0.075);
    g.stroke();
    g.restore();
  }
  g.restore();
}

/** Text mit dunkler Kontur (gut lesbar auch über der Kugel) */
function outlinedText(g: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, color: string, maxW: number): void {
  g.save();
  g.font = font(size, 800);
  const tw = g.measureText(s).width;
  if (tw > maxW) {
    size = Math.max(14, (size * maxW) / tw);
    g.font = font(size, 800);
  }
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.lineJoin = 'round';
  g.lineWidth = Math.max(3, size * 0.16);
  g.strokeStyle = 'rgba(5,10,20,0.8)';
  g.strokeText(s, x, y);
  g.fillStyle = color;
  g.fillText(s, x, y);
  g.restore();
}

// ---------------------------------------------------------------------------

class Punktlandung implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private phase: Phase = 'pre';
  private phaseT = 0;
  private idx = 0;
  private trial: Trial = { level: 1, occ: 0, dur: 1500, pre: 800, z0: 4, tol: tolerance(0) };
  private tStart = 0;
  private tContact = 0;
  private outcome: Outcome | null = null;
  private waitToastShown = false;
  private finished = false;
  private frameMs = 1000 / 60;
  // Auswertung
  private errors: number[] = [];
  private hits = 0;
  private misses = 0;
  private points = 0;

  constructor(private ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? DEMO.length : ctx.quick ? QUICK_TRIALS : TRIALS;
    this.stair = new Staircase({ start: ctx.startLevel ?? 1, min: LEVEL_MIN, max: LEVEL_MAX, down: 3, up: 1 });
  }

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    hud.setScore(this.demo ? null : 0);
    this.newTrial(t);
    this.updateHud();
    if (this.ctx.autoplay) {
      const rest = this.restPos();
      ghost.moveTo(rest.x, rest.y, { move: 500 });
    }
  }

  // --- Geometrie (immer live aus der Bühne → robust bei Drehen/Größenwechsel) ---

  private layout(): { w: number; h: number; u: number; cx: number; cy: number; R: number } {
    const { w, h, u } = this.ctx.stage;
    return { w, h, u, cx: w / 2, cy: h / 2, R: 0.28 * Math.min(w, h) };
  }

  /** Ruheposition der Geister-Hand: rechts unten neben dem Ring */
  private restPos(): { x: number; y: number } {
    const { w, h, cx, cy, R } = this.layout();
    return { x: Math.min(w * 0.88, cx + R + Math.max(w * 0.1, 30)), y: Math.min(h * 0.8, cy + R * 0.85) };
  }

  private barY(): number {
    const { h, u, cy, R } = this.layout();
    return Math.min(cy + R + Math.max(34, u * 7), h - Math.max(30, u * 6));
  }

  // --- Ablauf ---

  private newTrial(t: number): void {
    const { rng } = this.ctx;
    if (this.demo) {
      const d = DEMO[this.idx];
      this.trial = { level: 1, occ: d.occ, dur: d.dur, pre: d.pre, z0: d.z0, tol: tolerance(d.occ) };
      this.ctx.hud.caption(this.ctx.texts.captions[d.caption], 'top');
    } else {
      const level = this.stair.level;
      const [lo, hi] = durationRange(level);
      const dur = rng.range(lo, hi);
      // Mindest-Sichtzeit wahren; sehr kurze Rest-Verdeckungen weglassen
      let occ = Math.min(occlusionMs(level), dur - MIN_VISIBLE);
      if (occ < 150) occ = 0;
      const [s0, s1] = startSizeRange(level);
      const z0 = 1 / rng.range(s0, s1);
      this.trial = { level, occ, dur, pre: rng.range(600, 1500), z0, tol: tolerance(occ) };
    }
    this.phase = 'pre';
    this.phaseT = t;
    this.outcome = null;
    this.waitToastShown = false;
  }

  private updateHud(): void {
    const { hud, texts } = this.ctx;
    const doneTrials = this.idx + (this.phase === 'feedback' || this.phase === 'done' ? 1 : 0);
    hud.setProgress(Math.min(1, doneTrials / this.total));
    if (this.demo) return;
    hud.setScore(this.points);
    hud.setLabel(`${texts.feedback.level} ${Math.max(1, Math.floor(this.stair.level + 1e-9))}`);
  }

  /** „Entfernung“ der Kugel: läuft mit konstanter Geschwindigkeit von z0 auf 1 (Ring) */
  private zAt(t: number): number {
    const { z0, dur } = this.trial;
    return z0 - ((z0 - 1) * (t - this.tStart)) / dur;
  }

  /** Bildgröße relativ zum Ring: r / R = 1 / z (nach dem Kontakt höchstens 1,3) */
  private sizeAt(t: number): number {
    return Math.min(MAX_SIZE, 1 / Math.max(1e-6, this.zAt(t)));
  }

  private ballAlpha(t: number): number {
    let a = clamp((t - this.tStart) / APPEAR_FADE, 0, 1);
    if (this.trial.occ > 0) a *= 1 - clamp((t - (this.tContact - this.trial.occ)) / OCC_FADE, 0, 1);
    else a *= 1 - clamp((t - this.tContact - PASS_GROW) / PASS_FADE, 0, 1);
    return a;
  }

  update(dt: number, t: number): void {
    if (dt > 0) this.frameMs = this.frameMs * 0.9 + dt * 1000 * 0.1;
    if (this.phase === 'pre') {
      if (t - this.phaseT >= this.trial.pre) this.launch(t);
    } else if (this.phase === 'fly') {
      if (t >= this.tContact + MISS_AFTER) this.resolve(null, t);
    } else if (this.phase === 'feedback') {
      if (t - this.phaseT >= (this.demo ? DEMO_FEEDBACK_MS : FEEDBACK_MS)) {
        this.idx++;
        if (this.idx >= this.total) {
          this.phase = 'done';
          this.phaseT = t;
        } else {
          this.newTrial(t);
        }
        this.updateHud();
      }
    } else if (this.phase === 'done' && !this.finished && t - this.phaseT >= 150) {
      this.finish();
    }
  }

  /** Die Kugel erscheint (dieser Frame ist ihr erster sichtbarer) */
  private launch(t: number): void {
    this.phase = 'fly';
    this.phaseT = t;
    this.tStart = t;
    this.tContact = t + this.trial.dur;
    if (this.ctx.autoplay) this.planGhost(t);
  }

  /**
   * Geister-Hand: Tipp so planen, dass der Finger im gewünschten Moment ankommt.
   * Die Hand startet einen Frame später und rastet auf Frames ein → ca. 2 Frames vorhalten.
   */
  private planGhost(t: number): void {
    const { ghost, rng } = this.ctx;
    let err: number;
    if (this.demo) {
      err = DEMO[this.idx].err;
    } else {
      if (rng.chance(0.04)) return; // ab und zu verpasst
      err = 10 + rng.normal() * (35 + this.trial.occ * 0.08);
    }
    const move = 250;
    const rest = this.restPos();
    const { w, h } = this.layout();
    const delay = Math.max(0, this.tContact + err - t - move - 2 * this.frameMs);
    ghost.tap(rest.x - w * 0.035, rest.y - h * 0.05, { delay, move });
    ghost.moveTo(rest.x, rest.y, { delay: 380, move: 420 });
  }

  pointerDown(p: PointerInfo): void {
    if (this.phase === 'pre' || (this.phase === 'fly' && p.t - this.tStart < APPEAR_GRACE)) {
      // Noch keine Kugel (bzw. gerade erst erschienen) → ignorieren, einmal freundlich Bescheid geben
      if (!this.waitToastShown) {
        this.waitToastShown = true;
        const { cy, R, u } = this.layout();
        this.ctx.hud.toast(this.ctx.texts.feedback.wait, 'info', { y: Math.max(u * 7, cy - R - u * 6), ms: 900, size: clamp(u * 3.8, 16, 30) });
      }
      return;
    }
    if (this.phase !== 'fly') return; // nur der erste Tipp pro Durchgang zählt
    let err = p.t - this.tContact;
    // Intro-Film: gezeigte Abweichung unabhängig vom Bildraster des Browsers
    if (this.demo && p.type === 'ghost') err = DEMO[this.idx].err;
    this.resolve(err, this.tContact + err);
  }

  /** Durchgang auswerten; err = null → verpasst */
  private resolve(err: number | null, t: number): void {
    const { sfx } = this.ctx;
    const tol = this.trial.tol;
    let rating: Rating;
    if (err === null) {
      rating = 'missed';
      this.misses++;
      this.stair.update(false);
      sfx.bad();
    } else {
      rating = rate(err, tol);
      const abs = Math.abs(err);
      this.errors.push(err);
      const success = abs <= tol.good;
      if (success) this.hits++;
      const lvl = Math.floor(this.trial.level + 1e-9);
      this.points += Math.round(basePoints(abs, tol) * (1 + 0.1 * (lvl - 1)));
      this.stair.update(success);
      if (abs <= tol.good * 2) sfx.good();
      else sfx.bad();
    }
    this.outcome = { rating, err, size: err === null ? 0 : this.sizeAt(t), t0: t, tol };
    this.phase = 'feedback';
    this.phaseT = t;
    this.updateHud();
  }

  // --- Zeichnen ---

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, u, cx, cy, R } = this.layout();
    background(g, w, h, this.ctx.stage.dpr);
    this.drawTunnel(g);

    if (this.phase === 'pre') {
      g.save();
      g.globalAlpha = 0.55;
      circle(g, cx, cy, Math.max(2.5, u * 0.55), C.fg);
      g.restore();
    } else if (this.phase === 'fly') {
      drawBall(g, cx, cy, R * this.sizeAt(t), this.ballAlpha(t));
    } else if (this.phase === 'feedback' && this.outcome && this.outcome.err !== null) {
      // Kugel in der Größe zum Tippzeitpunkt, halb durchsichtig (auch wenn sie verdeckt war)
      drawBall(g, cx, cy, R * this.outcome.size, 0.45 * this.feedbackAlpha(t));
    }

    this.drawRing(g, t);
    if (this.phase === 'feedback' && this.outcome) this.drawFeedback(g, t, this.outcome);
  }

  /** Dezenter Tunnel: abgerundete Rahmen in zunehmender Tiefe + Linien zum Fluchtpunkt */
  private drawTunnel(g: CanvasRenderingContext2D): void {
    const { w, h, u, cx, cy } = this.layout();
    const hw = w / 2;
    const hh = h / 2;
    const rad = Math.min(w, h) * 0.09;
    const depths = [1.28, 1.65, 2.1, 2.7, 3.45, 4.4, 5.6, 7.1, 9];
    const far = depths[depths.length - 1];
    g.save();
    g.lineCap = 'round';
    // Linien durch die Mitte der abgerundeten Ecken (liegen für alle Tiefen auf einer Geraden)
    const ox = hw - rad * (1 - Math.SQRT1_2);
    const oy = hh - rad * (1 - Math.SQRT1_2);
    g.strokeStyle = 'rgba(150,180,230,0.075)';
    g.lineWidth = Math.max(1, u * 0.2);
    g.beginPath();
    for (const [sx, sy] of [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ]) {
      g.moveTo(cx + sx * ox, cy + sy * oy);
      g.lineTo(cx + (sx * ox) / far, cy + (sy * oy) / far);
    }
    g.stroke();
    for (const z of depths) {
      const a = 0.05 + 0.07 * (1 - (z - 1) / (far - 1));
      g.strokeStyle = `rgba(150,180,230,${a.toFixed(3)})`;
      g.lineWidth = Math.max(1, (u * 0.34) / Math.sqrt(z));
      rrPath(g, cx - hw / z, cy - hh / z, (2 * hw) / z, (2 * hh) / z, rad / z);
      g.stroke();
    }
    g.restore();
  }

  /** Zielring: gestrichelt, hell, immer über der Kugel */
  private drawRing(g: CanvasRenderingContext2D, t: number): void {
    const { u, cx, cy, R } = this.layout();
    const lw = Math.max(2.5, u * 0.55);
    const n = Math.max(12, Math.round((2 * Math.PI * R) / Math.max(14, u * 3.2)));
    const seg = (2 * Math.PI * R) / n;
    ring(g, cx, cy, R, 'rgba(255,255,255,0.12)', lw * 2.8);
    ring(g, cx, cy, R, 'rgba(255,255,255,0.92)', lw, [seg * 0.62, seg * 0.38]);
    // Nach dem Tipp leuchtet der Ring kurz in der Farbe der Bewertung (dezent, kein Blitz)
    const o = this.outcome;
    if (this.phase === 'feedback' && o && o.rating !== 'missed') {
      const k = clamp((t - o.t0) / 650, 0, 1);
      if (k < 1) {
        g.save();
        g.globalAlpha = 0.7 * (1 - k);
        ring(g, cx, cy, R * (1 + 0.06 * easeOut(k)), ratingColor(o.rating), lw * 1.6);
        g.restore();
      }
    }
  }

  private feedbackAlpha(t: number): number {
    const o = this.outcome;
    if (!o) return 0;
    const dur = this.demo ? DEMO_FEEDBACK_MS : FEEDBACK_MS;
    const k = (t - o.t0) / dur;
    return clamp(Math.min((t - o.t0) / 90, k > 0.82 ? 1 - (k - 0.82) / 0.18 : 1), 0, 1);
  }

  private drawFeedback(g: CanvasRenderingContext2D, t: number, o: Outcome): void {
    const { u, cx, cy, R } = this.layout();
    const { texts, fmt } = this.ctx;
    const alpha = this.feedbackAlpha(t);
    if (alpha <= 0) return;
    const age = t - o.t0;
    const color = ratingColor(o.rating);
    const title = texts.feedback[o.rating];
    const big = o.rating === 'perfect';
    const fsT = clamp(u * (big ? 7.6 : 6.6), 24, big ? 66 : 58);
    const fsM = clamp(u * 3.9, 15, 30);
    const pop = 0.86 + 0.14 * easeOut(age / 180);
    const hasMs = o.err !== null;
    const blockH = fsT + (hasMs ? fsM * 1.35 : 0);
    const yT = cy - blockH / 2 + fsT / 2;
    g.save();
    g.globalAlpha = alpha;
    g.translate(cx, yT);
    g.scale(pop, pop);
    outlinedText(g, title, 0, 0, fsT, color, R * 1.85);
    g.restore();
    if (o.err !== null) {
      g.save();
      g.globalAlpha = alpha;
      outlinedText(g, fmt.msSigned(o.err), cx, yT + fsT * 0.55 + fsM * 0.85, fsM, C.fg, R * 1.6);
      g.restore();
      this.drawBar(g, o.err, o.tol, color, alpha, age);
    }
  }

  /** Zeitbalken: früh ← | → spät (±300 ms), grüne Zonen = Toleranzen, mit Markierung */
  private drawBar(g: CanvasRenderingContext2D, err: number, tol: Tolerance, color: string, alpha: number, age: number): void {
    const { w, u, cx, R } = this.layout();
    const { texts } = this.ctx;
    const bw = Math.min(w * 0.84, Math.max(220, R * 2.2));
    const th = Math.max(6, u * 1.1);
    const y = this.barY();
    const x0 = cx - bw / 2;
    const X = (ms: number) => cx + (clamp(ms, -BAR_RANGE, BAR_RANGE) / BAR_RANGE) * (bw / 2);
    g.save();
    g.globalAlpha = alpha;
    rrPath(g, x0, y - th / 2, bw, th, th / 2);
    g.fillStyle = 'rgba(255,255,255,0.13)';
    g.fill();
    const zone = (ms: number, fill: string) => {
      const a = X(-ms);
      rrPath(g, a, y - th / 2, X(ms) - a, th, th / 2);
      g.fillStyle = fill;
      g.fill();
    };
    zone(tol.good * 2, 'rgba(255,255,255,0.14)');
    zone(tol.good, withAlpha(C.good, 0.4));
    zone(tol.perfect, withAlpha(C.good, 0.85));
    g.fillStyle = '#FFFFFF';
    g.fillRect(Math.round(cx) - 1, y - th * 1.5, 2, th * 3);
    // Beschriftung
    const fsL = clamp(u * 2.4, 12, 18);
    g.font = font(fsL, 700);
    g.fillStyle = C.dim;
    g.textBaseline = 'top';
    g.textAlign = 'left';
    g.fillText(`← ${texts.feedback.earlyShort}`, x0, y + th * 0.9 + 4);
    g.textAlign = 'right';
    g.fillText(`${texts.feedback.lateShort} →`, x0 + bw, y + th * 0.9 + 4);
    // Markierung gleitet von der Mitte an ihren Platz
    const mx = cx + (X(err) - cx) * easeOut(age / 240);
    const s = Math.max(6, th * 0.95);
    g.beginPath();
    g.moveTo(mx - s, y - th / 2 - s * 1.9);
    g.lineTo(mx + s, y - th / 2 - s * 1.9);
    g.lineTo(mx, y - th / 2 - s * 0.35);
    g.closePath();
    g.fillStyle = color;
    g.fill();
    g.lineWidth = 2;
    g.strokeStyle = 'rgba(5,10,20,0.7)';
    g.stroke();
    circle(g, mx, y, th * 0.75 + 2, 'rgba(5,10,20,0.7)');
    circle(g, mx, y, th * 0.75, color);
    g.restore();
  }

  // --- Ergebnis ---

  private finish(): void {
    this.finished = true;
    const errs = this.errors;
    const meanErr = errs.length ? mean(errs.map((e) => Math.abs(e))) : NaN;
    const bias = errs.length ? mean(errs) : NaN;
    const threshold = this.stair.threshold();
    let tip = 'watch';
    if (errs.length) {
      if (bias < -40) tip = 'early';
      else if (bias > 40) tip = 'late';
      else if (meanErr <= 60) tip = 'great';
    }
    const secondary: Metric[] = [
      ...(errs.length
        ? [
            { key: 'meanError', value: Math.round(meanErr) || 0, unit: 'ms' as const },
            { key: 'bias', value: Math.round(bias) || 0, unit: 'ms' as const },
          ]
        : []),
      { key: 'perfect', value: this.hits, unit: 'count' },
      { key: 'level', value: Math.max(LEVEL_MIN, Math.round(threshold)), unit: 'level' },
    ];
    this.ctx.sfx.done();
    this.ctx.finish({
      primary: { key: 'points', value: this.points, unit: 'points', better: 'higher' },
      secondary,
      score: this.points,
      level: nextStartLevel(threshold, LEVEL_MIN, LEVEL_MAX),
      tip,
    });
  }
}

export const punktlandung: ExerciseDefinition = {
  id: 'punktlandung',
  category: 'wahrnehmung',
  minutes: 1,
  color: '#8C6D4A',
  showsLevel: true,
  icon:
    '<g fill="none" stroke="currentColor" stroke-linecap="round"><circle cx="24" cy="24" r="16.5" stroke-width="3" stroke-dasharray="5.6 3.04"/><path d="M4.5 4.5l6 6M43.5 4.5l-6 6M4.5 43.5l6-6M43.5 43.5l-6-6" stroke-width="2.6" opacity=".55"/></g><circle cx="24" cy="24" r="9.5" fill="currentColor"/>',
  texts: { de, it },
  create: (ctx) => new Punktlandung(ctx),
};
