/**
 * Richtung & Wort – oben ein Richtungszeichen, unten vier grüne Felder in Kreuzanordnung mit je einem
 * Wort (OBEN, RECHTS, UNTEN, LINKS). Man tippt das Feld, dessen WORT die Richtung nennt – die Wörter
 * stehen nicht immer an der passenden Lage, man muss also lesen statt nach Lage zu antworten.
 *
 * Vorbild: Touch-Übung einer Reha-/Neuro-Trainingssoftware (Videobeobachtung des Auftraggebers; weder
 * Zeichen noch Ablauf sind kopiert – alles hier ist selbst gezeichnet und selbst gebaut).
 *
 * Gegenüber dem Video geändert (wissenschaftlich begründet, Einzelheiten und Quellen in logic.ts):
 * - Stufe 1 ist der Einstieg mit allen Wörtern an der Lage, ab Stufe 2 sind sie gemischt (wie im Video);
 *   danach kommen Zeichenvielfalt und eine weiche Antwortfrist.
 *   Fitts & Seeger (1953): Kompatibilität bestimmt die Zeit; Stroop (1935), MacLeod (1991): Lesen
 *   läuft automatisch mit; Lu & Proctor (1995): räumlicher Konflikt zwischen Lage und Bedeutung.
 * - Hauptwert ist die Stufe (Staircase 3-down/1-up ≈ 79 % richtig). Zusatzwerte nur im Vergleich mit
 *   sich selbst: Treffer, „Lage-Kosten“ (Mehrzeit bei vertauschtem Wort), Lage- und Achsenfehler.
 * - Fehler: kleines ✗/✓ am Feld und gestrichelter Rahmen – kein Rotblitz, keine Zeitstrafe.
 *
 * Ablauf je Durchgang: Felder leer → Zeichen und Wörter erscheinen gemeinsam (neue Anordnung wird nie
 * als Bewegung gezeigt) → ein Tipp → kurze Rückmeldung → Pause 1,0–1,5 s. Tipps < 150 ms nach Reizbeginn
 * zählen nicht; Doppeltipps (< 350 ms) werden ignoriert. Zeit = Reizbeginn (erster gezeichneter Frame)
 * bis Tipp (Ereigniszeit); auf Touchscreens wird 30–130 ms zu lang gemessen (Pronk et al., 2020).
 * Tastatur optional: Pfeiltasten tippen das Feld an dieser Lage.
 */
import { background, circle, fillRR, font, rrPath } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, Metric, PointerInfo } from '../../core/types';
import { captionTop, drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  axisOf,
  computeStats,
  diagAngleDeg,
  dirAngleDeg,
  DOUBLE_TAP_MS,
  DOWN,
  evaluateTap,
  FIELD_GREEN,
  FIELD_INK,
  type Geometry,
  geometry,
  hitSlot,
  IDLE_CAP_MS,
  LEFT,
  levelOf,
  MAX_LEVEL,
  MIN_LEVEL,
  MIN_RT_MS,
  pointsFor,
  QUICK_TRIALS,
  RIGHT,
  type Sign,
  specFor,
  tipFor,
  type Trial,
  type TrialLog,
  TrialPlanner,
  TRIALS,
  UP,
  type Words,
} from './logic';
import { de, it } from './texts';

const DEMO_ITI_MS = 800;
const FB_OK_MS = 500;
const FB_BAD_MS = 1100;
const WORD_FADE_MS = 220;
const SIGN_FADE_MS = 160;
const FLASH_MS = 1000;
const MARK_MS = 900;
const DEMO_DEADLINE_MS = 9000;

const PLATE = '#D5DDE8';
const FIELD_EDGE = '#2F8F3A';

interface DemoStep {
  sign: Sign;
  words: Words;
  caption: string;
}

const NONE = { dark: false, square: false, down: false };
/**
 * Intro-Film: (1) Pfeil nach oben bei passender Anordnung, (2) ein Paar vertauscht (LINKS steht rechts),
 * (3) Schrägpfeil bei gemischter Anordnung (nur links/rechts zählt), (4) Kurve nach rechts.
 */
const DEMO_STEPS: DemoStep[] = [
  { sign: { kind: 'box', answer: UP, ...NONE, dark: true }, words: [UP, RIGHT, DOWN, LEFT], caption: 'up' },
  { sign: { kind: 'box', answer: LEFT, ...NONE, square: true }, words: [UP, LEFT, DOWN, RIGHT], caption: 'swap' },
  { sign: { kind: 'disc', answer: LEFT, ...NONE, down: true }, words: [DOWN, UP, LEFT, RIGHT], caption: 'diag' },
  { sign: { kind: 'curve', answer: RIGHT, ...NONE }, words: [LEFT, DOWN, UP, RIGHT], caption: 'curve' },
];

interface Flash {
  t0: number;
  kind: 'good' | 'bad' | 'hint';
}
interface Mark {
  slot: number;
  t0: number;
  kind: 'good' | 'bad';
}

class RichtungWort implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private readonly planner: TrialPlanner;
  private readonly wordEm: number;
  private geoCache: { key: string; geo: Geometry } | null = null;

  private next: Trial | null = null;
  private nextLevel = MIN_LEVEL;
  private cur: Trial | null = null;
  private curLevel = MIN_LEVEL;
  private stimOn = false;
  private onset = NaN;
  private deadline = IDLE_CAP_MS;
  private showBar = false;
  private planned = false;
  private nextStimAt = 0;
  /** Wie oft ein Tipp vor dem Reiz den nächsten Reiz in diesem Durchgang schon verschoben hat (höchstens 2) */
  private pushes = 0;
  /** Durchgänge in Folge ganz ohne Tipp (wer weggegangen ist, beendet die Runde, statt minutenlang zu warten) */
  private noReply = 0;
  private lastRespT = -1e9;
  private resolvedAt = -1e9;
  private fbMs = FB_OK_MS;
  private trialsDone = 0;
  private endAt = Infinity;
  private endT = Infinity;
  private done = false;

  private flashes: Array<Flash | null> = [null, null, null, null];
  private marks: Mark[] = [];

  private log: TrialLog[] = [];
  private early = 0;
  private points = 0;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? DEMO_STEPS.length : ctx.quick ? QUICK_TRIALS : TRIALS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
    this.planner = new TrialPlanner(ctx.rng);
    this.wordEm = measureWordEm(this.words());
  }

  // --- Wörter und Geometrie ---

  private words(): string[] {
    const f = this.ctx.texts.feedback;
    return [f.wordUp, f.wordRight, f.wordDown, f.wordLeft];
  }

  private geo(): Geometry {
    const s = this.ctx.stage;
    const key = `${s.w}x${s.h}`;
    if (!this.geoCache || this.geoCache.key !== key) {
      const bottomReserve = this.demo ? s.h - (captionTop(s) - 10) : Math.max(14, s.u * 3);
      this.geoCache = { key, geo: geometry({ w: s.w, h: s.h, u: s.u, bottomReserve, wordEm: this.wordEm }) };
    }
    return this.geoCache.geo;
  }

  resize(): void {
    this.geoCache = null;
  }

  private level(): number {
    return this.demo ? MIN_LEVEL : levelOf(this.stair.level);
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud } = this.ctx;
    this.prepare();
    this.nextStimAt = t + (this.demo ? 1400 : 1200);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
  }

  /** Nächsten Durchgang schon in der Pause festlegen */
  private prepare(): void {
    if (this.demo) {
      const step = DEMO_STEPS[Math.min(this.trialsDone, DEMO_STEPS.length - 1)];
      const target = step.words.indexOf(step.sign.answer) as Trial['targetSlot'];
      this.next = { sign: step.sign, words: step.words, targetSlot: target, compat: target === step.sign.answer, newLayout: true };
      this.nextLevel = MIN_LEVEL;
      return;
    }
    this.nextLevel = this.level();
    this.next = this.planner.next(this.nextLevel);
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    if (t >= this.endAt) {
      this.finishSession(t);
      return;
    }
    if (!this.stimOn && this.trialsDone < this.total && t >= this.nextStimAt) this.showStimulus();
    if (this.stimOn && !Number.isNaN(this.onset) && t - this.onset >= this.deadline) this.resolve(t, 'slow', -1, this.deadline);
    if (this.ctx.autoplay && this.stimOn && !Number.isNaN(this.onset)) this.autoUpdate();
    this.prune(t);
  }

  private showStimulus(): void {
    if (!this.next) return;
    this.cur = this.next;
    this.curLevel = this.nextLevel;
    this.stimOn = true;
    this.onset = NaN; // wird im ersten gezeichneten Frame gesetzt (render)
    this.planned = false;
    const spec = specFor(this.curLevel);
    this.showBar = !this.demo && spec.deadlineMs !== null;
    this.deadline = this.demo ? DEMO_DEADLINE_MS : (spec.deadlineMs ?? IDLE_CAP_MS);
    if (this.demo) {
      const step = DEMO_STEPS[Math.min(this.trialsDone, DEMO_STEPS.length - 1)];
      this.ctx.hud.caption(this.ctx.texts.captions[step.caption]);
    }
  }

  // --- Autoplay / Intro-Film: die Geister-Hand tippt ein Feld ---

  private autoUpdate(): void {
    const { ghost, rng } = this.ctx;
    if (this.planned || !ghost.idle || !this.cur) return;
    this.planned = true;
    let slot: number = this.cur.targetSlot;
    if (!this.demo) {
      if (this.showBar && rng.chance(0.06)) return; // ausgelassen: die Frist läuft ab (nur bei Frist)
      if (rng.chance(0.1)) slot = (slot + 1 + rng.int(3)) % 4; // absichtlich daneben
    }
    const f = this.geo().fields[slot];
    const jit = this.demo ? 0 : Math.min(f.w, f.h) * 0.06;
    ghost.tap(f.x + f.w / 2 + rng.normal() * jit, f.y + f.h / 2 + rng.normal() * jit, {
      delay: this.demo ? 700 : rng.range(500, 1200),
      move: this.demo ? 700 : rng.range(300, 450),
    });
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done || p.t - this.lastRespT < DOUBLE_TAP_MS) return;
    const slot = hitSlot(this.geo(), p.x, p.y);
    if (slot < 0) return;
    this.answer(slot, p.t);
  }

  keyDown(key: string, t: number): void {
    if (this.done || t - this.lastRespT < DOUBLE_TAP_MS) return;
    const slot = key === 'ArrowUp' ? 0 : key === 'ArrowRight' ? 1 : key === 'ArrowDown' ? 2 : key === 'ArrowLeft' ? 3 : -1;
    if (slot >= 0) this.answer(slot, t);
  }

  private answer(slot: number, t: number): void {
    if (!this.stimOn || Number.isNaN(this.onset) || t - this.onset < MIN_RT_MS) {
      this.tooEarly(t);
      return;
    }
    this.resolve(t, evaluateTap(this.cur as Trial, slot).correct ? 'hit' : 'wrong', slot, t - this.onset);
  }

  /**
   * Vor dem Reiz (oder < 150 ms danach) getippt: zählt nicht als Antwort. Kommt der Reiz gleich, wird er
   * etwas verschoben – höchstens zweimal je Durchgang, damit Dauertippen den Reiz nicht aufhält.
   */
  private tooEarly(t: number): void {
    if (this.demo) return;
    this.early++;
    this.lastRespT = t - DOUBLE_TAP_MS + 150;
    if (!this.stimOn && this.pushes < 2 && this.nextStimAt - t < 700) {
      this.nextStimAt = t + 700;
      this.pushes++;
    }
    this.ctx.sfx.tick();
  }

  private resolve(t: number, kind: 'hit' | 'wrong' | 'slow', tapped: number, rt: number): void {
    const { sfx, hud, rng } = this.ctx;
    const cur = this.cur as Trial;
    this.stimOn = false;
    this.lastRespT = t;
    this.resolvedAt = t;
    if (kind === 'hit') {
      this.log.push({ ok: true, slow: false, rt, compat: cur.compat, positionError: false, axisError: false });
      this.points += pointsFor(this.curLevel, rt);
      this.flashes[tapped] = { t0: t, kind: 'good' };
      this.marks.push({ slot: tapped, t0: t, kind: 'good' });
      sfx.good();
      if (!this.demo) this.stair.update(true);
    } else if (kind === 'wrong') {
      const ev = evaluateTap(cur, tapped);
      this.log.push({ ok: false, slow: false, rt, compat: cur.compat, positionError: ev.positionError, axisError: ev.axisError });
      this.flashes[tapped] = { t0: t, kind: 'bad' };
      this.flashes[cur.targetSlot] = { t0: t, kind: 'hint' };
      this.marks.push({ slot: tapped, t0: t, kind: 'bad' }, { slot: cur.targetSlot, t0: t, kind: 'good' });
      sfx.bad();
      if (!this.demo) this.stair.update(false);
    } else {
      // zu langsam: ohne ✗ und ohne Punktabzug, nur der richtige Platz wird gezeigt; zählt für die Stufe als nicht geschafft
      this.log.push({ ok: false, slow: true, rt, compat: cur.compat, positionError: false, axisError: false });
      this.flashes[cur.targetSlot] = { t0: t, kind: 'hint' };
      if (!this.demo) this.stair.update(false);
    }
    this.fbMs = kind === 'hit' ? FB_OK_MS : FB_BAD_MS;
    this.noReply = kind === 'slow' ? this.noReply + 1 : 0;
    this.pushes = 0;
    this.trialsDone++;
    hud.setProgress(clamp(this.trialsDone / this.total, 0, 1));
    hud.setScore(this.demo ? null : this.points);
    this.updateLabel();
    if (this.trialsDone >= this.total || (!this.demo && this.noReply >= 3)) {
      this.endAt = t + this.fbMs + 150;
      return;
    }
    const pause = this.demo ? DEMO_ITI_MS : rng.range(1000, 1500);
    this.nextStimAt = t + Math.max(this.fbMs + WORD_FADE_MS + 200, this.demo ? this.fbMs + DEMO_ITI_MS : pause);
    this.prepare();
  }

  private updateLabel(): void {
    if (this.demo) return;
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${this.level()}`);
  }

  private prune(t: number): void {
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
    for (let i = 0; i < this.flashes.length; i++) {
      const f = this.flashes[i];
      if (f && t - f.t0 > FLASH_MS) this.flashes[i] = null;
    }
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.done = true;
    this.endT = t;
    this.ctx.hud.setProgress(1);
    const s = computeStats(this.log, this.early);
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'accuracy', value: Math.round(s.accuracy), unit: 'percent' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    this.ctx.sfx.done();
    const thr = this.stair.threshold();
    const secondary: Metric[] = [{ key: 'accuracy', value: Math.round(s.accuracy), unit: 'percent' }];
    if (Number.isFinite(s.positionCost)) secondary.push({ key: 'posCost', value: Math.round(s.positionCost), unit: 'msSigned' });
    else if (Number.isFinite(s.meanRt)) secondary.push({ key: 'meanRt', value: Math.round(s.meanRt), unit: 'time' });
    secondary.push({ key: 'posErrors', value: s.positionErrors, unit: 'count' }, { key: 'axisErrors', value: s.axisErrors, unit: 'count' });
    this.ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary,
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip: tipFor(s),
    });
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    // Reizbeginn = erster gezeichneter Frame
    if (this.stimOn && Number.isNaN(this.onset)) this.onset = t;

    const geo = this.geo();
    // Zeichenfläche und Zeichen
    fillRR(g, geo.plate.x, geo.plate.y, geo.plate.w, geo.plate.h, Math.min(22, geo.plate.h * 0.08), PLATE);
    if (this.cur) {
      const a = this.stimOn ? 1 : 1 - clamp((t - this.resolvedAt) / SIGN_FADE_MS, 0, 1);
      if (a > 0.01) {
        g.save();
        g.globalAlpha = a;
        drawSign(g, this.cur.sign, geo.plate.x + geo.plate.w / 2, geo.plate.y + geo.plate.h / 2, geo.signSize);
        g.restore();
      }
    }
    if (this.showBar && this.stimOn && !Number.isNaN(this.onset)) this.drawBar(g, geo, clamp(1 - (t - this.onset) / this.deadline, 0, 1));

    // Felder mit Wörtern
    const wordAlpha = this.stimOn ? 1 : 1 - clamp((t - (this.resolvedAt + this.fbMs)) / WORD_FADE_MS, 0, 1);
    const words = this.words();
    for (let slot = 0; slot < 4; slot++) this.drawField(g, geo, slot, this.cur && wordAlpha > 0.01 ? words[this.cur.words[slot]] : null, wordAlpha, t);
    for (const m of this.marks) {
      const f = geo.fields[m.slot];
      const a = markAlpha(t - m.t0, MARK_MS);
      const s = clamp(f.h * 0.12, 7, 13);
      const x = f.x + clamp(f.h * 0.27, 14, 34);
      const y = f.y + clamp(f.h * 0.27, 14, 34);
      if (m.kind === 'bad') drawSoftCross(g, x, y, s, a);
      else drawSoftCheck(g, x, y, s * 1.1, a);
    }
  }

  private drawBar(g: CanvasRenderingContext2D, geo: Geometry, frac: number): void {
    const p = geo.plate;
    const bw = p.w * 0.5;
    const bh = clamp(p.h * 0.025, 5, 8);
    const x = p.x + (p.w - bw) / 2;
    const y = p.y + p.h - bh - clamp(p.h * 0.05, 8, 18);
    fillRR(g, x, y, bw, bh, bh / 2, 'rgba(71,85,105,0.25)');
    if (frac > 0.01) fillRR(g, x, y, bw * frac, bh, bh / 2, '#64748B');
  }

  private drawField(g: CanvasRenderingContext2D, geo: Geometry, slot: number, word: string | null, wordAlpha: number, t: number): void {
    const f = geo.fields[slot];
    const r = Math.min(14, f.h * 0.14);
    const fl = this.flashes[slot];
    const fk = fl ? flashAlpha(t - fl.t0) : 0;
    fillRR(g, f.x, f.y, f.w, f.h, r, FIELD_GREEN);
    rrPath(g, f.x + 1.25, f.y + 1.25, f.w - 2.5, f.h - 2.5, r);
    g.strokeStyle = FIELD_EDGE;
    g.lineWidth = 2.5;
    g.stroke();
    if (word) {
      g.save();
      g.globalAlpha = wordAlpha;
      g.font = font(geo.wordPx, 800);
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillStyle = FIELD_INK;
      g.fillText(word, f.x + f.w / 2, f.y + f.h / 2 + geo.wordPx * 0.04, f.w - 6);
      g.restore();
    }
    if (fl && fk > 0.01) {
      g.save();
      if (fl.kind === 'bad') {
        // getipptes falsches Feld: gestrichelter dunkler Rahmen (Form, nicht nur Farbe)
        rrPath(g, f.x + 5, f.y + 5, f.w - 10, f.h - 10, Math.max(4, r - 4));
        g.setLineDash([9, 7]);
        g.strokeStyle = `rgba(11,31,14,${0.75 * fk})`;
        g.lineWidth = 3;
        g.stroke();
      } else {
        // richtiges Feld: kräftiger heller Rahmen (bei „hint“ zusätzlich gestrichelt abgesetzt)
        rrPath(g, f.x - 3, f.y - 3, f.w + 6, f.h + 6, r + 3);
        g.strokeStyle = `rgba(255,255,255,${0.95 * fk})`;
        g.lineWidth = 4;
        if (fl.kind === 'hint') g.setLineDash([12, 6]);
        g.stroke();
      }
      g.restore();
    }
  }
}

/** Rahmen bleiben gut sichtbar stehen und blenden erst im letzten Drittel aus */
function flashAlpha(age: number): number {
  const k = clamp(age / FLASH_MS, 0, 1);
  return k < 0.6 ? 1 : 1 - (k - 0.6) / 0.4;
}

/** Breite des längsten Worts in em (Fettschrift) – für die Feldbreite; ohne Canvas Schätzwert */
function measureWordEm(words: string[]): number {
  try {
    const c = document.createElement('canvas').getContext('2d');
    if (!c) return 5.4;
    c.font = font(100, 800);
    return Math.max(...words.map((wd) => c.measureText(wd).width)) / 100;
  } catch {
    return 5.4;
  }
}

// ---------------------------------------------------------------------------
// Zeichen (alle selbst gezeichnet; s = Kantenlänge des Quadrats, in das das Zeichen passt)

type G = CanvasRenderingContext2D;

/** Blockpfeil, nach oben zeigend, um den Ursprung zentriert */
function arrowPath(g: G, len: number, headW: number, shaftW: number, headLen: number): void {
  const top = -len / 2;
  const base = top + headLen;
  g.beginPath();
  g.moveTo(0, top);
  g.lineTo(headW / 2, base);
  g.lineTo(shaftW / 2, base);
  g.lineTo(shaftW / 2, len / 2);
  g.lineTo(-shaftW / 2, len / 2);
  g.lineTo(-shaftW / 2, base);
  g.lineTo(-headW / 2, base);
  g.closePath();
}

function drawSign(g: G, sign: Sign, cx: number, cy: number, s: number): void {
  if (sign.kind === 'box') drawBoxSign(g, sign, cx, cy, s);
  else if (sign.kind === 'disc') drawDiscSign(g, sign, cx, cy, s);
  else drawCurveSign(g, sign, cx, cy, s);
}

/** Pfeil im Kasten (hell oder dunkel, lang gestreckt oder quadratisch) */
function drawBoxSign(g: G, sign: Sign, cx: number, cy: number, s: number): void {
  const horizontal = axisOf(sign.answer) === 'h';
  const bw = sign.square ? 0.66 * s : horizontal ? 0.92 * s : 0.46 * s;
  const bh = sign.square ? 0.66 * s : horizontal ? 0.46 * s : 0.92 * s;
  const dark = sign.dark;
  g.save();
  g.translate(cx, cy);
  rrPath(g, -bw / 2, -bh / 2, bw, bh, 0.07 * s);
  g.fillStyle = dark ? '#10151C' : '#FAFBFD';
  g.fill();
  g.lineWidth = Math.max(2.5, 0.024 * s);
  g.strokeStyle = dark ? '#0B0F14' : '#475569';
  g.stroke();
  if (dark) {
    const inset = 0.03 * s;
    rrPath(g, -bw / 2 + inset, -bh / 2 + inset, bw - 2 * inset, bh - 2 * inset, 0.05 * s);
    g.lineWidth = Math.max(1.5, 0.012 * s);
    g.strokeStyle = 'rgba(226,232,240,0.9)';
    g.stroke();
  }
  const along = horizontal ? bw : bh;
  const short = Math.min(bw, bh);
  const len = along * 0.72;
  const headW = short * 0.64;
  g.rotate((dirAngleDeg(sign.answer) * Math.PI) / 180);
  arrowPath(g, len, headW, short * 0.24, Math.min(len * 0.48, headW * 0.85));
  g.fillStyle = dark ? '#FFFFFF' : '#1E293B';
  g.lineJoin = 'round';
  g.fill();
  g.restore();
}

/** Blaue Scheibe mit weißem Schrägpfeil (zählt nur links/rechts) */
function drawDiscSign(g: G, sign: Sign, cx: number, cy: number, s: number): void {
  const r = 0.47 * s;
  circle(g, cx, cy, r, '#FFFFFF');
  g.beginPath();
  g.arc(cx, cy, r, 0, Math.PI * 2);
  g.lineWidth = 1.5;
  g.strokeStyle = '#94A3B8';
  g.stroke();
  circle(g, cx, cy, r * 0.9, '#1D63CF');
  g.save();
  g.translate(cx, cy);
  g.rotate((diagAngleDeg(sign) * Math.PI) / 180);
  arrowPath(g, 0.68 * s, 0.38 * s, 0.15 * s, 0.3 * s);
  g.fillStyle = '#FFFFFF';
  g.lineJoin = 'round';
  g.fill();
  g.restore();
}

/** Dreieck mit Kurve nach links oder rechts (Kurvenrichtung = Antwort) */
function drawCurveSign(g: G, sign: Sign, cx: number, cy: number, s: number): void {
  const flip = sign.answer === LEFT ? -1 : 1;
  g.save();
  g.translate(cx, cy);
  g.lineJoin = 'round';
  g.lineCap = 'round';
  // Dreieck
  g.beginPath();
  g.moveTo(0, -0.5 * s);
  g.lineTo(0.54 * s, 0.44 * s);
  g.lineTo(-0.54 * s, 0.44 * s);
  g.closePath();
  g.fillStyle = '#FFFFFF';
  g.fill();
  g.lineWidth = 0.085 * s;
  g.strokeStyle = '#C2410C';
  g.stroke();
  // Kurve mit Pfeilspitze (an der senkrechten Achse gespiegelt für „links“)
  g.scale(flip, 1);
  g.beginPath();
  g.moveTo(-0.12 * s, 0.34 * s);
  g.lineTo(-0.12 * s, 0.22 * s);
  g.arc(0, 0.22 * s, 0.12 * s, Math.PI, 1.5 * Math.PI, false);
  g.lineTo(0.14 * s, 0.1 * s);
  g.lineWidth = 0.085 * s;
  g.strokeStyle = '#1E293B';
  g.stroke();
  g.beginPath();
  g.moveTo(0.26 * s, 0.1 * s);
  g.lineTo(0.12 * s, 0.1 * s - 0.115 * s);
  g.lineTo(0.12 * s, 0.1 * s + 0.115 * s);
  g.closePath();
  g.fillStyle = '#1E293B';
  g.fill();
  g.restore();
}

export const richtungWort: ExerciseDefinition = {
  id: 'richtung-wort',
  category: 'konzentration',
  minutes: 2,
  color: '#7A5195',
  icon:
    '<path d="M24 4v11M19 9l5-5 5 5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="16" y="20" width="16" height="7" rx="2.5" fill="currentColor"/><rect x="3" y="29" width="16" height="7" rx="2.5" fill="currentColor" opacity=".55"/><rect x="29" y="29" width="16" height="7" rx="2.5" fill="currentColor" opacity=".55"/><rect x="16" y="38" width="16" height="7" rx="2.5" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new RichtungWort(ctx),
};
