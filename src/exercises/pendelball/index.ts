/**
 * Pendelball – einer pendelnden Kugel nur mit den Augen folgen und einen Buchstaben auf ihr erkennen (Katalog 906).
 *
 * Praxisform der funktionellen Optometrie, hier als Übungsform ohne Wirkversprechen: Eine Kugel pendelt in festen
 * Bahnformen, man folgt ihr bei möglichst ruhigem Kopf mit den Augen und erkennt einen Buchstaben auf ihr. Neu gegenüber
 * den Einzelbahn-Übungen ist die Bahnfolge in einer Sitzung (waagrecht → senkrecht → schräg ↗ → schräg ↘ → Kreis im
 * Uhrzeigersinn → Kreis dagegen), je Bahn ein Block von etwa 12–15 s mit ruhiger Pause dazwischen.
 *
 * - Bewegung: gleichmäßige Sinusbewegung bzw. gleichmäßige Winkelgeschwindigkeit, als Formel der Zeit (`logic.ts`);
 *   weiches Ein- und Ausschwingen der Auslenkung, keine Sprünge, kein Blitzen. Zufall nur über `ctx.rng`.
 * - Buchstabe: weich ein- und ausgeblendet (je 160 ms), nur im geraden, gleichmäßigen Teil eines Schlags (nie in der
 *   Umkehr) und auf Kreisen nie in den ersten 2 s eines Blocks. Antwort: vier große Buttons (≥ 72 px) mit je einem
 *   Buchstaben, eine richtige Antwort, drei Ablenker, Frist 2,5 s nach Ende der Anzeige, danach Auslassung.
 * - Stufen (25, je Schritt genau ein Parameter, Tabelle im Kopf von `logic.ts`): Tempo, Weite, Buchstabengröße,
 *   Anzeigedauer, Buchstabenmenge, Bahnfolge, Kugelgröße. Anpassung nach jedem Block (≥ 85 % schwerer, < 65 % leichter).
 * - Ehrlich: Gemessen wird nur, ob der Buchstabe erkannt wird – nicht der Blick und nicht die Kopfhaltung.
 */
import { background, button, type ButtonState, C, circle, font, glow, rrPath, text } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp } from '../../core/stats';
import type {
  Exercise,
  ExerciseContext,
  ExerciseDefinition,
  ExerciseResult,
  PointerInfo,
  ResultDetailRow,
  ResultDetailTable,
} from '../../core/types';
import { barLayout, type BarLayout, BALL, INK } from '../_shared/zeichenaufgabe';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  amplitudePx,
  ANSWER_MS,
  autoAccuracy,
  ballRadiusFor,
  type BlockRec,
  blockVerdict,
  DEMO_PARAMS,
  envelope,
  letterAlpha,
  type LetterTrial,
  letterPxFor,
  levelIndex,
  type LevelParams,
  makeLetterTrial,
  MAX_LEVEL,
  MIN_BALL_K,
  MIN_LEVEL,
  nextSignOnset,
  offsetAt,
  paramsFor,
  pickNextShape,
  RAMP_S,
  reachedLevel,
  type Shape,
  SHAPES,
  smoothstep,
  lineDir,
  circleSign,
  isCircle,
  type Vec,
} from './logic';
import { de, it } from './texts';

interface Cfg {
  /** Blöcke (Bahnen) je Sitzung */
  blocks: number;
  /** Buchstaben je Block */
  perBlock: number;
  /** kürzeste Blockdauer (s) */
  minBlockS: number;
  /** längste Blockdauer (s), danach endet der Block auch mit weniger Buchstaben */
  maxBlockS: number;
  /** Pause mit ruhender Kugel zwischen zwei Blöcken (s) */
  restS: number;
  /** Pause vor dem ersten Block (s) */
  firstRestS: number;
  /** Dauer des Ein- und Ausschwingens (s) */
  ramp: number;
  /** Abstand nach einer Antwort bis zum nächsten Buchstaben (s) */
  gapS: number;
  endDelayMs: number;
}

const PLAY: Cfg = { blocks: 6, perBlock: 3, minBlockS: 12, maxBlockS: 20, restS: 2.2, firstRestS: 2.0, ramp: RAMP_S, gapS: 0.7, endDelayMs: 900 };
/** Schnelltest (?quick=1): drei Bahnen mit je einem Buchstaben */
const QUICK: Cfg = { blocks: 3, perBlock: 1, minBlockS: 3.5, maxBlockS: 10, restS: 1.0, firstRestS: 0.6, ramp: 1.0, gapS: 0.5, endDelayMs: 600 };
/** Intro-Film: zwei Bahnen mit je einem Buchstaben, insgesamt etwa 10–11 s */
const DEMO: Cfg = { blocks: 2, perBlock: 1, minBlockS: 3.0, maxBlockS: 8, restS: 1.6, firstRestS: 0.5, ramp: 1.0, gapS: 0.5, endDelayMs: 500 };

const FEEDBACK_MS = 900;
/** Abstand der Marken-Verblassung (ms) */
const MARK_LIFE_MS = 900;
const POINTS_BASE = 10;

const SHAPE_KEY: Record<Shape, string> = {
  horizontal: 'shapeH',
  vertical: 'shapeV',
  diagUp: 'shapeD1',
  diagDown: 'shapeD2',
  circleCw: 'shapeCw',
  circleCcw: 'shapeCcw',
};

type Phase = 'rest' | 'run' | 'down' | 'tail' | 'done';
type LPhase = 'none' | 'show' | 'answer';

interface Trial {
  shape: Shape;
  level: number;
  ok: boolean;
  late: boolean;
  /** Antwortzeit ab Beginn des Buchstabens (ms), nur bei Antworten */
  rtMs: number;
}

interface Feedback {
  chosen: number;
  correct: number;
  ok: boolean;
  t0: number;
}

function tpl(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (_m, k: string) => String(vars[k] ?? ''));
}

export class PendelballExercise implements Exercise {
  private readonly cfg: Cfg;
  private readonly demo: boolean;
  private readonly stair: Staircase;
  private phase: Phase = 'rest';
  private lphase: LPhase = 'none';
  private lay: BarLayout | null = null;

  // Sitzung
  private blockIdx = 0;
  private readonly remaining: Shape[] = [...SHAPES];
  private shape: Shape = 'horizontal';
  private upcoming: Shape = 'horizontal';
  private prevShape: Shape | null = null;
  private params: LevelParams = DEMO_PARAMS;
  private blockLevel = 1;
  private restUntil = 0;
  private tailUntil = 0;
  private endT = Infinity;

  // Block
  private blockT0 = 0;
  private sEnd = Infinity;
  private downT0 = 0;
  private onsetS: number | null = null;
  private trialsInBlock = 0;
  private blockHits = 0;

  // Buchstabe
  private lt: LetterTrial | null = null;
  private onsetT = 0;
  private answerFrom = 0;
  private lastLetter: string | undefined;
  private fb: Feedback | null = null;

  // Bilanz
  private readonly trials: Trial[] = [];
  private readonly blocks: BlockRec[] = [];
  private correct = 0;
  private late = 0;
  private points = 0;

  // Darstellung
  private ball: Vec = { x: 0, y: 0 };
  private rNow = 30;
  private rTarget = 30;
  private letterH = 40;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.cfg = this.demo ? DEMO : ctx.quick ? QUICK : PLAY;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 1, up: 1 });
  }

  // ---- Hilfen ----------------------------------------------------------

  private get level(): number {
    return levelIndex(this.stair.level);
  }

  private layout(): BarLayout {
    const { w, h } = this.ctx.stage;
    const key = `${w}x${h}:${this.demo ? 1 : 0}`;
    if (this.lay && this.lay.key === key) return this.lay;
    this.lay = barLayout(this.ctx.stage, this.demo);
    return this.lay;
  }

  /** Mitte der Bahn, Auslenkung und Kugelradius für die Parameter p */
  private geom(p: LevelParams): { cx: number; cy: number; amp: number; r: number } {
    const { w, u } = this.ctx.stage;
    const L = this.layout();
    const r = ballRadiusFor(p, u);
    const cy = (L.world.y0 + L.world.y1) / 2;
    const halfH = Math.max(4, (L.world.y1 - L.world.y0) / 2 - r - 6);
    return { cx: w / 2, cy, amp: amplitudePx(p, { w, u, halfH }), r };
  }

  private shapeName(s: Shape): string {
    return this.ctx.texts.feedback[SHAPE_KEY[s]] ?? '';
  }

  private pickShape(): Shape {
    const mixed = this.demo ? false : paramsFor(this.level).mixed;
    const s = pickNextShape(this.ctx.rng, this.remaining, this.prevShape, mixed);
    this.remaining.splice(this.remaining.indexOf(s), 1);
    this.prevShape = s;
    return s;
  }

  // ---- Exercise --------------------------------------------------------

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    const L = this.layout();
    this.upcoming = this.pickShape();
    const p = this.demo ? DEMO_PARAMS : paramsFor(this.level);
    const g = this.geom(p);
    this.rNow = this.rTarget = g.r;
    this.ball = { x: g.cx, y: g.cy };
    this.phase = 'rest';
    this.restUntil = t + this.cfg.firstRestS * 1000;
    this.updateHud(this.demo ? 1 : this.level);
    if (this.demo) {
      hud.caption(texts.captions.follow, 'top');
      ghost.moveTo(L.rest.x, L.rest.y, { move: 0 });
    }
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    const p = this.phase === 'rest' ? (this.demo ? DEMO_PARAMS : paramsFor(this.level)) : this.params;
    const g = this.geom(p);
    // Kugelgröße gleitet bei Stufenwechsel weich (unabhängig von der Bildrate)
    this.rTarget = g.r;
    this.rNow += (this.rTarget - this.rNow) * (1 - Math.exp(-dt / 0.4));

    if (this.phase === 'rest') {
      this.ball = { x: g.cx, y: g.cy };
      if (t >= this.restUntil) this.startBlock(t);
      return;
    }
    if (this.phase === 'tail') {
      this.ball = { x: g.cx, y: g.cy };
      if (t >= this.tailUntil) this.end();
      return;
    }

    const s = (t - this.blockT0) / 1000;
    const env = envelope(s, this.cfg.ramp, this.sEnd);
    const off = offsetAt(this.shape, s, this.params.period, g.amp, env);
    this.ball = { x: g.cx + off.x, y: g.cy + off.y };

    if (this.phase === 'down') {
      if (s >= this.sEnd + this.cfg.ramp) this.afterDown(t);
      return;
    }

    // phase === 'run'
    if (this.lphase === 'show') {
      if (t - this.onsetT >= this.params.exposureMs) {
        this.lphase = 'answer';
        this.answerFrom = t;
        if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.tap, 'top');
      }
    } else if (this.lphase === 'answer') {
      if (t - this.answerFrom >= ANSWER_MS) this.timeout(t);
    } else {
      const full = this.trialsInBlock >= this.cfg.perBlock;
      if ((full && s >= this.cfg.minBlockS) || s >= this.cfg.maxBlockS) this.endBlock(t, s);
      else if (!full && this.onsetS !== null && s >= this.onsetS) this.beginLetter(t);
    }
  }

  // ---- Blöcke ----------------------------------------------------------

  private startBlock(t: number): void {
    const { hud, texts } = this.ctx;
    this.shape = this.upcoming;
    this.blockLevel = this.demo ? 1 : this.level;
    this.params = this.demo ? DEMO_PARAMS : paramsFor(this.blockLevel);
    this.blockT0 = t;
    this.sEnd = Infinity;
    this.trialsInBlock = 0;
    this.blockHits = 0;
    this.lphase = 'none';
    this.lt = null;
    this.phase = 'run';
    this.letterH = letterPxFor(this.params, this.ctx.stage.u);
    this.onsetS = this.scheduleOnset(0);
    this.updateHud(this.blockLevel);
    if (this.demo && this.blockIdx > 0) hud.caption(texts.captions.follow, 'top');
  }

  /** Beginn des nächsten Buchstabens (s nach Blockbeginn), frühestens fromS */
  private scheduleOnset(fromS: number): number {
    return nextSignOnset(this.shape, this.params.period, this.params.exposureMs / 1000, fromS, this.cfg.ramp);
  }

  private endBlock(t: number, s: number): void {
    const n = this.trialsInBlock;
    this.blocks.push({ shape: this.shape, level: this.blockLevel, hits: this.blockHits, n });
    if (!this.demo) {
      const v = blockVerdict(this.blockHits, n);
      if (v === 'harder') this.stair.update(true);
      else if (v === 'easier') this.stair.update(false);
    }
    if (this.blockIdx + 1 < this.cfg.blocks) this.upcoming = this.pickShape();
    this.phase = 'down';
    this.sEnd = s;
    this.downT0 = t;
    if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.next, 'top');
    this.updateHud(this.demo ? 1 : this.level);
  }

  private afterDown(t: number): void {
    this.blockIdx++;
    this.lphase = 'none';
    if (this.blockIdx >= this.cfg.blocks) {
      this.phase = 'tail';
      this.tailUntil = t + this.cfg.endDelayMs;
      this.ctx.hud.setProgress(1);
      return;
    }
    this.phase = 'rest';
    this.restUntil = t + this.cfg.restS * 1000;
    this.updateHud(this.demo ? 1 : this.level);
  }

  // ---- Buchstaben ------------------------------------------------------

  private beginLetter(t: number): void {
    const { rng, hud, texts } = this.ctx;
    this.lt = makeLetterTrial(rng, this.params.letterSet, this.lastLetter);
    this.lastLetter = this.lt.correct;
    this.onsetT = t;
    this.lphase = 'show';
    this.fb = null;
    if (this.demo) {
      hud.caption(texts.captions.letter, 'top');
      this.demoPlan();
    } else if (this.ctx.autoplay) {
      this.autoPlan();
    }
  }

  /** Tastatur: Ziffern 1–4 wählen den Button von links nach rechts */
  keyDown(key: string, t: number): void {
    if (key < '1' || key > '4' || key.length !== 1) return;
    if (this.lphase === 'none' || t < this.onsetT) return;
    this.respond(Number(key) - 1, t);
  }

  pointerDown(p: PointerInfo): void {
    // Nur die erste Antwort je Buchstabe zählt (danach ist `lphase` 'none'); auch während der Anzeige darf geantwortet werden
    if (this.phase !== 'run' || this.lphase === 'none' || p.t < this.onsetT) return;
    const L = this.layout();
    if (p.y < L.barTop) return;
    for (let i = 0; i < L.btns.length; i++) {
      const R = L.btns[i];
      if (p.x >= R.x - L.gap / 2 && p.x <= R.x + R.w + L.gap / 2) {
        this.respond(i, p.t);
        return;
      }
    }
  }

  resize(): void {
    this.lay = null;
    this.layout();
  }

  private respond(btn: number, t: number): void {
    const lt = this.lt;
    if (!lt || this.lphase === 'none') return;
    const ok = btn === lt.correctIndex;
    if (ok) {
      this.correct++;
      this.blockHits++;
      this.points += POINTS_BASE + 2 * (this.blockLevel - 1);
      this.ctx.sfx.good();
    } else {
      this.ctx.sfx.bad();
    }
    this.fb = { chosen: btn, correct: lt.correctIndex, ok, t0: t };
    this.finishTrial(t, ok, false, Math.max(0, t - this.onsetT));
  }

  private timeout(t: number): void {
    const lt = this.lt;
    if (!lt) return;
    this.late++;
    this.ctx.sfx.bad();
    const { w, u } = this.ctx.stage;
    const size = clamp(u * 5, 18, 34);
    this.ctx.hud.toast(this.ctx.texts.feedback.late, 'info', { x: w / 2, y: Math.max(size * 1.2, this.geom(this.params).cy - this.rNow * 2.4), ms: 800, size });
    this.fb = { chosen: -1, correct: lt.correctIndex, ok: false, t0: t };
    this.finishTrial(t, false, true, 0);
  }

  private finishTrial(t: number, ok: boolean, late: boolean, rtMs: number): void {
    this.trials.push({ shape: this.shape, level: this.blockLevel, ok, late, rtMs });
    this.trialsInBlock++;
    this.lphase = 'none';
    const s = (t - this.blockT0) / 1000;
    this.onsetS = this.scheduleOnset(s + this.cfg.gapS);
    this.updateHud(this.blockLevel);
    if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.follow, 'top');
  }

  private updateHud(level: number): void {
    const { hud, texts } = this.ctx;
    hud.setProgress(clamp((this.blockIdx + this.trialsInBlock / this.cfg.perBlock) / this.cfg.blocks, 0, 1));
    hud.setScore(this.correct);
    hud.setLabel(`${texts.feedback.level} ${level} · ${Math.min(this.blockIdx + 1, this.cfg.blocks)}/${this.cfg.blocks}`);
  }

  // ---- Geister-Hand ----------------------------------------------------

  /** Autoplay (Tests): meist richtig, manchmal falsch, selten gar nicht */
  private autoPlan(): void {
    const { ghost, rng } = this.ctx;
    const lt = this.lt;
    if (!lt) return;
    ghost.clear();
    if (rng.chance(0.05)) return;
    const L = this.layout();
    const btn = rng.chance(autoAccuracy(this.blockLevel)) ? lt.correctIndex : (lt.correctIndex + 1 + rng.int(3)) % 4;
    const R = L.btns[btn];
    const move = rng.range(320, 460);
    const at = this.params.exposureMs + rng.range(200, 750);
    ghost.tap(R.x + R.w * rng.range(0.35, 0.65), R.y + R.h * rng.range(0.4, 0.65), { delay: Math.max(0, at - move), move });
    ghost.moveTo(L.rest.x, L.rest.y, { delay: 300, move: 450 });
  }

  /** Intro-Film: Hand tippt kurz nach dem Ende der Anzeige den richtigen Button und parkt dann wieder */
  private demoPlan(): void {
    const { ghost } = this.ctx;
    const lt = this.lt;
    if (!lt) return;
    ghost.clear();
    const L = this.layout();
    const R = L.btns[lt.correctIndex];
    const move = 480;
    ghost.tap(R.x + R.w / 2, R.y + R.h * 0.5, { delay: Math.max(0, this.params.exposureMs + 250 - move), move });
    ghost.moveTo(L.rest.x, L.rest.y, { delay: 420, move: 520 });
  }

  // ---- Ende ------------------------------------------------------------

  private end(): void {
    this.phase = 'done';
    this.endT = this.ctx.now();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: 1, unit: 'level', better: 'higher' },
        secondary: [{ key: 'accuracy', value: 100, unit: 'percent' }, { key: 'mistakes', value: 0, unit: 'count' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    this.ctx.sfx.done();
    this.ctx.finish(this.buildResult());
  }

  private buildResult(): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const fb = texts.feedback;
    const n = this.trials.length;
    const hits = this.trials.filter((x) => x.ok).length;
    const wrong = n - hits - this.late;
    const acc = n ? (100 * hits) / n : 0;
    const reached = reachedLevel(this.blocks);
    const rts = this.trials.filter((x) => x.ok).map((x) => x.rtMs);
    const meanRt = rts.length ? rts.reduce((a, b) => a + b, 0) / rts.length : 0;

    const secondary: ExerciseResult['secondary'] = [{ key: 'accuracy', value: Math.round(acc), unit: 'percent' }];
    if (rts.length) secondary.push({ key: 'rt', value: Math.round(meanRt), unit: 'time' });
    secondary.push({ key: 'mistakes', value: wrong + this.late, unit: 'count' });

    const rows: ResultDetailRow[] = [];
    for (const shape of SHAPES) {
      const own = this.trials.filter((x) => x.shape === shape);
      if (!own.length) continue;
      const h = own.filter((x) => x.ok);
      const avg = h.length ? h.reduce((a, x) => a + x.rtMs, 0) / h.length : NaN;
      rows.push({
        label: this.shapeName(shape),
        value: tpl(fb.hitsOf, { a: h.length, b: own.length }),
        text: Number.isFinite(avg) ? tpl(fb.avg, { t: fmt.time(avg) }) : undefined,
      });
    }
    const details: ResultDetailTable[] = [{ title: fb.tableTitle, rows, note: fb.note }];

    const manyLate = this.late >= Math.max(2, Math.ceil(n * 0.2));
    let tip = 'great';
    if (manyLate && this.late >= wrong) tip = 'decide';
    else if (acc < 60) tip = 'eyes';
    else if (manyLate) tip = 'decide';

    return {
      primary: { key: 'level', value: reached, unit: 'level', better: 'higher' },
      secondary,
      details,
      score: this.points,
      level: nextStartLevel(reached, MIN_LEVEL, MAX_LEVEL),
      tip,
    };
  }

  // ---- Zeichnen --------------------------------------------------------

  render(g: CanvasRenderingContext2D, now: number): void {
    const { w, h, dpr } = this.ctx.stage;
    const L = this.layout();
    const t = Math.min(now, this.endT);
    background(g, w, h, dpr);
    // Antwortleiste
    g.fillStyle = 'rgba(3,8,18,0.4)';
    g.fillRect(0, L.barTop, w, h - L.barTop);
    g.fillStyle = 'rgba(255,255,255,0.09)';
    g.fillRect(0, Math.round(L.barTop), w, 1);

    const p = this.phase === 'rest' ? (this.demo ? DEMO_PARAMS : paramsFor(this.level)) : this.params;
    const gm = this.geom(p);
    this.drawAnnounce(g, gm.cx, gm.cy, t);

    // Kugel
    const r = Math.max(4, this.rNow);
    glow(g, this.ball.x, this.ball.y, r, BALL, 0.35);
    circle(g, this.ball.x, this.ball.y, r, BALL);
    if (this.lphase === 'show' && this.lt) {
      const a = letterAlpha(t - this.onsetT, this.params.exposureMs);
      if (a > 0.003) {
        const H = Math.min(this.letterH, (r / MIN_BALL_K) * 1);
        g.save();
        g.globalAlpha = a;
        g.font = font(H / 0.72, 800);
        g.fillStyle = INK;
        g.textAlign = 'center';
        g.textBaseline = 'alphabetic';
        g.fillText(this.lt.correct, this.ball.x, this.ball.y + H / 2);
        g.restore();
      }
    }
    this.drawButtons(g, L, t);
  }

  /** Pause: Name der nächsten Bahn als Text, dazu ein kleines Bahnbild; blendet beim Start des Blocks aus */
  private drawAnnounce(g: CanvasRenderingContext2D, cx: number, cy: number, t: number): void {
    let a = 0;
    if (this.phase === 'rest' || this.phase === 'tail') a = this.phase === 'rest' ? 1 : 0;
    else if (this.phase === 'down') a = this.blockIdx + 1 < this.cfg.blocks ? smoothstep((t - this.downT0) / 1000 / Math.max(0.1, this.cfg.ramp)) : 0;
    else if (this.phase === 'run') a = 1 - smoothstep((t - this.blockT0) / 500);
    if (a <= 0.01) return;
    const { w, u } = this.ctx.stage;
    const L = this.layout();
    const worldH = L.world.y1 - L.world.y0;
    const S = clamp(Math.min(w * 0.15, worldH * 0.17), 36, 120);
    const size = clamp(u * 4.4, 15, 28);
    const fbT = this.ctx.texts.feedback;
    const shape = this.phase === 'run' ? this.shape : this.upcoming;
    const first = this.blockIdx === 0 && this.phase !== 'down';
    this.drawShapeIcon(g, shape, cx, cy, S, a * 0.55);
    text(g, first ? fbT.first : fbT.next, cx, cy - S - size * 1.7, size * 0.8, C.dim, { weight: 600, alpha: a });
    text(g, this.shapeName(shape), cx, cy + S + size * 1.6, size, C.fg, { weight: 700, alpha: a });
  }

  private drawShapeIcon(g: CanvasRenderingContext2D, shape: Shape, cx: number, cy: number, S: number, alpha: number): void {
    const d = lineDir(shape);
    g.save();
    g.globalAlpha = alpha;
    g.strokeStyle = C.fg;
    g.fillStyle = C.fg;
    g.lineWidth = 3;
    g.lineCap = 'round';
    g.setLineDash([6, 9]);
    g.beginPath();
    if (d) {
      g.moveTo(cx - d.x * S, cy - d.y * S);
      g.lineTo(cx + d.x * S, cy + d.y * S);
    } else {
      g.arc(cx, cy, S, 0, Math.PI * 2);
    }
    g.stroke();
    g.setLineDash([]);
    const head = (x: number, y: number, ang: number) => {
      const k = Math.max(7, S * 0.18);
      g.beginPath();
      g.moveTo(x + Math.cos(ang) * k, y + Math.sin(ang) * k);
      g.lineTo(x + Math.cos(ang + 2.5) * k, y + Math.sin(ang + 2.5) * k);
      g.lineTo(x + Math.cos(ang - 2.5) * k, y + Math.sin(ang - 2.5) * k);
      g.closePath();
      g.fill();
    };
    if (d) {
      const ang = Math.atan2(d.y, d.x);
      head(cx + d.x * S, cy + d.y * S, ang);
      head(cx - d.x * S, cy - d.y * S, ang + Math.PI);
    } else if (isCircle(shape)) {
      const sg = circleSign(shape);
      // Pfeilspitze rechts auf dem Kreis, Richtung der Bewegung (y nach unten: + = im Uhrzeigersinn)
      head(cx + S, cy, Math.atan2(sg, 0));
    }
    g.restore();
  }

  private drawButtons(g: CanvasRenderingContext2D, L: BarLayout, t: number): void {
    const fb = this.fb && t < this.fb.t0 + FEEDBACK_MS ? this.fb : null;
    const active = this.phase === 'run' && this.lphase !== 'none';
    const lt = this.lt;
    const showLetters = !!lt && (active || !!fb);
    for (let i = 0; i < L.btns.length; i++) {
      const R = L.btns[i];
      const isChosen = !!fb && i === fb.chosen;
      const isCorrect = !!fb && i === fb.correct;
      const state: ButtonState = isChosen ? 'active' : active ? 'normal' : 'disabled';
      button(g, R, state);
      if (fb && !fb.ok && isCorrect) {
        // richtige Antwort umrahmt (Form, nicht nur Farbe)
        g.save();
        rrPath(g, R.x - 2.5, R.y - 2.5, R.w + 5, R.h + 5, Math.min(R.w, R.h) * 0.22 + 2.5);
        g.strokeStyle = C.good;
        g.lineWidth = 3.5;
        g.stroke();
        g.restore();
      }
      const s = Math.min(R.w, R.h);
      if (showLetters && lt) {
        const ink = active || isChosen || isCorrect ? C.fg : 'rgba(232,238,247,0.34)';
        text(g, lt.options[i], R.x + R.w / 2, R.y + R.h / 2, s * 0.56, ink, { weight: 800 });
      }
      if (fb) {
        const m = clamp(s * 0.13, 8, 14);
        const a = markAlpha(t - fb.t0, MARK_LIFE_MS);
        const mx = R.x + R.w - m * 1.7;
        const my = R.y + m * 1.7;
        if (isChosen && fb.ok) drawSoftCheck(g, mx, my, m, a);
        else if (isChosen) drawSoftCross(g, mx, my, m, a);
        else if (isCorrect) drawSoftCheck(g, mx, my, m, a);
      }
    }
  }
}

export const pendelball: ExerciseDefinition = {
  id: 'pendelball',
  category: 'bewegung',
  minutes: 2,
  color: '#2B7A9B',
  icon:
    '<line x1="24" y1="5" x2="35" y2="31" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M7 38c11 9 23 9 34 0" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 6"/><circle cx="35" cy="32" r="6.5" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new PendelballExercise(ctx),
};
