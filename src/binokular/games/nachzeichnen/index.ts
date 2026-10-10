/**
 * Spiel „Nachzeichnen“: Ein Pfad wechselt ständig zwischen Rot und Zweitfarbe; die Person zeichnet ihn mit dem Finger
 * (graue Linie, für beide Augen sichtbar) von Start bis Ziel nach. Logik: path.ts, colorSchedule.ts, trace.ts.
 * Farben nur über `vision/color.ts` (Augenklasse AMBLYOPIC/FELLOW des Pfads), Feedback nur grau, Ton, Vibration.
 */
import { t } from '../../texts';
import type { Item } from '../../vision/renderer';
import { capturePointer, flashItem, makeRng, randomSeed, Stage } from '../common';
import type { GameCard, GameContext, GameInstance, GameModule, GameSnapshot, GameSummary, LevelStat } from '../types';
import { colorK, newSchedule, stepSchedule, type ScheduleConfig, type ScheduleState } from './colorSchedule';
import { buildLevelPath, clampLevel, MAX_LEVEL, type Complexity } from './levels';
import { FIELD_H, FIELD_W, type TracePath } from './path';
import { DEFAULT_NACH, GOAL_RADIUS, normalizeNach, RESUME_RADIUS, START_RADIUS, type NachSettings } from './settings';
import { accuracyOf, avgDeviationOf, clearLine, newTrace, penDown, penMove, penUp, toleranceOf, type TraceConfig, type TraceEvent, type TraceState } from './trace';

/** Breite der grauen Spielerlinie (px) */
const LINE_W = 6;
const HINT_MS = 2200;

/** mm:ss */
const clock = (ms: number): string => `${String(Math.floor(ms / 60000)).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`;

export function scheduleConfigOf(s: NachSettings): ScheduleConfig {
  return { intervalMs: s.intervalS * 1000, distancePx: s.distancePx, onlyDistance: s.onlyDistance, mode: s.changeMode, fadeMs: s.fadeS * 1000 };
}

export function traceConfigOf(s: NachSettings): TraceConfig {
  return { pathWidth: s.pathWidth, errorDist: s.errorDist, errorLimit: s.errorLimit };
}

/** Zähler über alle Runden einer Session (bei „Neuer Pfad“ werden die Werte der alten Runde übernommen) */
interface Carry {
  errors: number;
  samples: number;
  inTolerance: number;
  devSum: number;
  changes: number;
  paths: number;
}

class NachInstance implements GameInstance {
  private readonly stage: Stage;
  private readonly rng: () => number;
  private readonly cfg: ScheduleConfig;
  private readonly tcfg: TraceConfig;
  private path!: TracePath;
  private level: number;
  private maxReached: number;
  private complexity!: Complexity;
  private curls = 0;
  /** Spielzeit der laufenden Runde (ms, ohne Pausen und ohne Wartezeit auf die Karte) */
  private roundMs = 0;
  private roundLogged = false;
  private levelStats: LevelStat[] = [];
  /** Runde zu Ende, die Karte wartet auf eine Wahl */
  private awaiting: null | 'goal' | 'limit' = null;
  private trace: TraceState = newTrace();
  private sched!: ScheduleState;
  private carry: Carry = { errors: 0, samples: 0, inTolerance: 0, devSum: 0, changes: 0, paths: 0 };
  private flashAt = -1e9;
  private hint = '';
  private hintUntil = 0;
  private lastDrawn = 0;
  private pointerId: number | null = null;
  private done = false;
  private readonly seed: number;
  private readonly onDown = (e: PointerEvent) => this.down(e);
  private readonly onMove = (e: PointerEvent) => this.move(e);
  private readonly onUp = (e: PointerEvent) => this.up(e);
  readonly actions = [
    { id: 'newPath', label: t.nach.newPath },
    { id: 'clear', label: t.nach.clearLine },
  ];

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: GameContext,
    private readonly s: NachSettings,
  ) {
    this.seed = ctx.seed ?? randomSeed();
    this.rng = makeRng(this.seed);
    this.cfg = scheduleConfigOf(s);
    this.tcfg = traceConfigOf(s);
    this.level = clampLevel(s.startLevel);
    this.maxReached = this.level;
    this.newRound();
    this.stage = new Stage(
      canvas,
      { w: FIELD_W, h: FIELD_H },
      { frame: (dt) => this.frame(dt), items: (now) => this.items(now) },
      ctx.vision,
      () => ctx.view(),
      { left: t.simLeft, right: t.simRight, filter: t.filterName },
    );
    canvas.addEventListener('pointerdown', this.onDown);
    canvas.addEventListener('pointermove', this.onMove);
    canvas.addEventListener('pointerup', this.onUp);
    canvas.addEventListener('pointercancel', this.onUp);
  }

  private newRound(): void {
    const lp = buildLevelPath(this.rng, this.level, {
      pathWidth: this.s.pathWidth,
      errorDist: this.s.errorDist,
      pointsDelta: this.s.curvePoints - DEFAULT_NACH.curvePoints,
      spreadScale: this.s.curveSpread / DEFAULT_NACH.curveSpread,
    });
    this.path = lp.path;
    this.complexity = lp.complexity;
    this.curls = lp.curls;
    this.roundMs = 0;
    this.roundLogged = false;
    this.trace = newTrace();
    this.sched = newSchedule(this.rng() < 0.5 ? 'AMBLYOPIC' : 'FELLOW');
    this.lastDrawn = 0;
  }

  /** Werte der laufenden Runde in die Sessionzähler übernehmen (vor „Neuer Pfad“) */
  private bank(): void {
    const tr = this.trace;
    this.carry.errors += tr.errors;
    this.carry.samples += tr.samples;
    this.carry.inTolerance += tr.inTolerance;
    this.carry.devSum += tr.devSum;
  }

  private totals() {
    const tr = this.trace;
    return {
      errors: this.carry.errors + tr.errors,
      samples: this.carry.samples + tr.samples,
      inTolerance: this.carry.inTolerance + tr.inTolerance,
      devSum: this.carry.devSum + tr.devSum,
    };
  }

  start(): void {
    this.stage.start();
  }
  pause(): void {
    this.stage.pause();
    this.releasePen();
  }
  resume(): void {
    this.stage.resume();
  }
  destroy(): void {
    this.stage.destroy();
    this.canvas.removeEventListener('pointerdown', this.onDown);
    this.canvas.removeEventListener('pointermove', this.onMove);
    this.canvas.removeEventListener('pointerup', this.onUp);
    this.canvas.removeEventListener('pointercancel', this.onUp);
  }

  private releasePen(): void {
    penUp(this.trace);
    this.pointerId = null;
  }

  private say(text: string): void {
    this.hint = text;
    this.hintUntil = performance.now() + HINT_MS;
  }

  private handle(events: TraceEvent[]): void {
    for (const e of events) {
      if (e.type === 'error') {
        this.flashAt = performance.now();
        this.ctx.play('error');
        this.ctx.vibrate(60);
        this.say(t.nach.hintReturn);
      } else if (e.type === 'hint') {
        this.say(e.key === 'start' ? t.nach.hintStart : t.nach.hintResume);
      } else if (e.type === 'goal') {
        this.carry.paths++;
        this.ctx.play('goal');
        this.logRound(true);
        this.awaiting = 'goal';
        this.releasePen();
      } else if (e.type === 'limit') {
        this.logRound(false);
        this.awaiting = 'limit';
        this.releasePen();
      }
    }
  }

  /** Ergebnis der laufenden Runde in die Levelliste der Session schreiben (einmal je Runde) */
  private logRound(completed: boolean): void {
    if (this.roundLogged) return;
    this.roundLogged = true;
    this.levelStats.push(this.currentStat(completed));
  }

  private currentStat(completed: boolean): LevelStat {
    return { level: this.level, ms: Math.round(this.roundMs), errors: this.trace.errors, accuracy: Math.round(accuracyOf(this.trace) * 10) / 10, completed };
  }

  private finish(reason: 'goal' | 'limit'): void {
    if (this.done) return;
    this.done = true;
    this.stage.pause();
    this.ctx.finish(reason);
  }

  private down(e: PointerEvent): void {
    if (this.done || this.awaiting || !this.stage.running || (e.pointerType === 'mouse' && e.button !== 0)) return;
    if (this.pointerId !== null) return;
    e.preventDefault();
    this.pointerId = e.pointerId;
    capturePointer(this.canvas, e.pointerId);
    this.handle(penDown(this.trace, this.path, this.tcfg, this.stage.toInternal(e.clientX, e.clientY)));
  }

  private move(e: PointerEvent): void {
    if (e.pointerId !== this.pointerId || this.done || this.awaiting || !this.stage.running) return;
    e.preventDefault();
    this.handle(penMove(this.trace, this.path, this.tcfg, this.stage.toInternal(e.clientX, e.clientY)));
  }

  private up(e: PointerEvent): void {
    if (e.pointerId !== this.pointerId) return;
    this.releasePen();
  }

  private frame(dtMs: number): void {
    const tr = this.trace;
    if (tr.status === 'ready' || this.done || this.awaiting) return;
    this.roundMs += dtMs;
    const drawn = tr.drawnPx - this.lastDrawn;
    this.lastDrawn = tr.drawnPx;
    const r = stepSchedule(this.sched, this.cfg, dtMs, drawn);
    this.sched = r.state;
    if (r.changed > 0) {
      this.carry.changes += r.changed;
      this.ctx.play('colorChange');
    }
  }

  private items(now: number): Item[] {
    const out: Item[] = [];
    const k = colorK(this.sched, this.cfg);
    // Grundpfad: genau ein Auge sichtbar (k = 0 im Fade zwischen den Farben)
    out.push({ shape: { t: 'poly', pts: this.path.pts, w: this.s.pathWidth }, eye: this.sched.eye, k, layer: 0 });
    // Markierungen und Linie des Spielers: grau, für beide Augen
    const st = this.path.start;
    const go = this.path.goal;
    out.push({ shape: { t: 'disc', x: st.x, y: st.y, r: 13 }, eye: 'BOTH', k: 1, layer: 1 });
    out.push({ shape: { t: 'ring', x: st.x, y: st.y, r: START_RADIUS, w: 3 }, eye: 'BOTH', k: 0.55, layer: 1 });
    out.push({ shape: { t: 'ring', x: go.x, y: go.y, r: GOAL_RADIUS - 4, w: 7 }, eye: 'BOTH', k: 1, layer: 1 });
    for (const stroke of this.trace.strokes) if (stroke.length) out.push({ shape: { t: 'poly', pts: stroke, w: LINE_W }, eye: 'BOTH', k: 1, layer: 2 });
    const lv = this.trace.lastValid;
    if (lv && (this.trace.status === 'error' || this.trace.status === 'lifted')) {
      out.push({ shape: { t: 'ring', x: lv.x, y: lv.y, r: RESUME_RADIUS, w: 3 }, eye: 'BOTH', k: 0.7, layer: 3 });
      out.push({ shape: { t: 'disc', x: lv.x, y: lv.y, r: 6 }, eye: 'BOTH', k: 1, layer: 3 });
    }
    const f = flashItem(now - this.flashAt, FIELD_W, FIELD_H);
    if (f) out.push(f);
    return out;
  }

  snapshot(): GameSnapshot {
    const tot = this.totals();
    const acc = tot.samples === 0 ? 100 : (tot.inTolerance / tot.samples) * 100;
    const dev = tot.samples === 0 ? 0 : tot.devSum / tot.samples;
    const n = (v: number, d = 0) => v.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });
    let message = performance.now() < this.hintUntil ? this.hint : '';
    if (!message) {
      if (this.trace.status === 'ready') message = t.nach.hintBegin;
      else if (this.trace.status === 'error') message = t.nach.hintReturn;
    }
    return {
      hud: [
        { id: 'level', label: t.nach.hudLevel, value: String(this.level) },
        { id: 'accuracy', label: t.nach.hudAccuracy, value: `${n(acc)} %` },
        { id: 'deviation', label: t.nach.hudDeviation, value: `${n(dev, 1)} px` },
        { id: 'errors', label: t.nach.hudErrors, value: String(tot.errors) },
        { id: 'changes', label: t.nach.hudChanges, value: String(this.carry.changes) },
      ],
      message: this.awaiting ? '' : message,
      card: this.card(),
    };
  }

  private card(): GameCard | null {
    if (!this.awaiting) return null;
    const stat = this.levelStats[this.levelStats.length - 1];
    const lines = stat ? [t.nach.cardStats(stat.level, clock(stat.ms), stat.errors, stat.accuracy.toLocaleString('de-DE'))] : [];
    if (this.awaiting === 'goal') {
      const up = this.s.autoLevel && this.level < MAX_LEVEL;
      return {
        id: 'goal',
        title: up ? t.nach.cardNext(this.level + 1) : t.nach.cardDone,
        lines: up ? lines : [...lines, t.nach.cardSameLevel(this.level)],
        buttons: [
          { id: 'next', label: t.nach.cardContinue, primary: true },
          { id: 'quit', label: t.endGame },
        ],
      };
    }
    return {
      id: 'limit',
      title: t.nach.cardLimit,
      lines: [...lines, t.nach.cardSameLevel(this.level)],
      buttons: [
        { id: 'retry', label: t.nach.cardRetry, primary: true },
        { id: 'quit', label: t.endGame },
      ],
    };
  }

  summary(): GameSummary {
    const tot = this.totals();
    const acc = tot.samples === 0 ? 100 : (tot.inTolerance / tot.samples) * 100;
    const dev = tot.samples === 0 ? 0 : tot.devSum / tot.samples;
    return {
      points: this.carry.paths,
      errors: tot.errors,
      colorChanges: this.carry.changes,
      details: { accuracy: Math.round(acc * 10) / 10, avgDeviation: Math.round(dev * 10) / 10, paths: this.carry.paths, level: this.level, maxLevel: this.maxReached },
      completed: this.carry.paths > 0,
      levels: this.allStats(),
    };
  }

  /** Liste der Runden: abgeschlossene plus die laufende, falls schon gezeichnet wurde */
  private allStats(): LevelStat[] {
    const out = this.levelStats.map((l) => ({ ...l }));
    if (!this.roundLogged && this.trace.samples > 0) out.push(this.currentStat(false));
    return out;
  }

  /** Neue Runde (Pfad) im aktuellen Level; die alte wird, falls angefangen, in die Liste übernommen */
  private nextRound(): void {
    if (!this.roundLogged && this.trace.samples > 0) this.logRound(false);
    this.bank();
    this.newRound();
  }

  runAction(id: string): void {
    if (this.done) return;
    if (this.awaiting) {
      const was = this.awaiting;
      if (id === 'quit') this.finish(was);
      else if ((id === 'next' && was === 'goal') || (id === 'retry' && was === 'limit')) {
        if (was === 'goal' && this.s.autoLevel && this.level < MAX_LEVEL) {
          this.level++;
          this.maxReached = Math.max(this.maxReached, this.level);
        }
        this.awaiting = null;
        this.nextRound();
        this.ctx.play('select');
      }
      return;
    }
    this.releasePen();
    if (id === 'newPath') {
      this.nextRound();
    } else if (id === 'clear') {
      clearLine(this.trace);
      this.lastDrawn = this.trace.drawnPx;
    }
  }

  debugState(): Record<string, unknown> {
    const tr = this.trace;
    const tot = this.totals();
    return {
      game: 'nachzeichnen',
      seed: this.seed,
      level: this.level,
      maxLevel: this.maxReached,
      complexity: { ...this.complexity },
      curls: this.curls,
      awaiting: this.awaiting,
      roundMs: Math.round(this.roundMs),
      levels: this.allStats(),
      ctrl: this.path.ctrl.map((p) => [Math.round(p.x), Math.round(p.y)]),
      pathLength: this.path.length,
      width: this.s.pathWidth,
      path: this.path.pts.map((p) => [Math.round(p.x * 10) / 10, Math.round(p.y * 10) / 10]),
      start: this.path.start,
      goal: this.path.goal,
      status: tr.status,
      progress: tr.progress,
      length: this.path.pts.length,
      errors: tot.errors,
      roundErrors: tr.errors,
      samples: tot.samples,
      accuracy: accuracyOf(tot),
      avgDeviation: avgDeviationOf(tot),
      changes: this.carry.changes,
      eye: this.sched.eye,
      phase: this.sched.phase,
      k: colorK(this.sched, this.cfg),
      elapsedMs: this.sched.elapsedMs,
      drawnPx: this.sched.drawnPx,
      tolerance: toleranceOf(this.s.pathWidth),
      errorDist: this.s.errorDist,
      lastValid: tr.lastValid,
      finished: tr.finished,
      running: this.stage.running,
    };
  }

  toClient(x: number, y: number): { x: number; y: number } {
    return this.stage.toClient(x, y);
  }
}

export const nachzeichnen: GameModule<NachSettings> = {
  id: 'nachzeichnen',
  title: t.nach.title,
  description: t.nach.description,
  design: { w: FIELD_W, h: FIELD_H },
  defaults: DEFAULT_NACH,
  normalize: normalizeNach,
  create: (canvas, ctx, settings) => new NachInstance(canvas, ctx, settings),
  rows: (sum) => [
    { label: t.nach.sumLevel, value: String(sum.details.maxLevel ?? 1) },
    { label: t.nach.sumPaths, value: String(sum.details.paths ?? 0) },
    { label: t.nach.hudAccuracy, value: `${(sum.details.accuracy ?? 0).toLocaleString('de-DE')} %` },
    { label: t.nach.hudDeviation, value: `${(sum.details.avgDeviation ?? 0).toLocaleString('de-DE')} px` },
    { label: t.nach.hudErrors, value: String(sum.errors) },
    { label: t.nach.hudChanges, value: String(sum.colorChanges) },
  ],
};

