/**
 * Spiel „Ziehen & Ablegen“ (zwei Farben): Querformat. Der Ball gehört einem Auge (Rot oder Zweitfarbe), der wandernde
 * Ring dem anderen – nur beide Augen zusammen erkennen, ob der Ball im Ring liegt. Rahmen, Level und Hinweise sind
 * grau. Logik: logic.ts (Spielkern ohne DOM). Farben nur über `vision/color.ts`, Feedback nur grau, Ton, Vibration.
 *
 * Steuerung: Touch/Stift und Maus (Taste gedrückt halten): irgendwo berühren → der Ball erscheint versetzt über dem
 * Finger (relative Steuerung, der Finger verdeckt ihn nie), in den Ring ziehen, loslassen. Tastatur: Pfeiltasten bewegen
 * den Ball, Leertaste/Eingabe legt ihn ab.
 */
import { t } from '../../texts';
import type { Item } from '../../vision/renderer';
import { capturePointer, flashItem, makeRng, randomSeed, Stage } from '../common';
import type { GameContext, GameInstance, GameModule, GameSnapshot, GameSummary } from '../types';
import { eyeClassesFor, FB_MS, H, redClassOf, RING_STROKE, W, ZaCore, type ZaEvent } from './logic';
import { DEFAULT_ZA, normalizeZa, type ZaSettings } from './settings';

const MAX_STEP_MS = 50;

class ZaInstance implements GameInstance {
  private readonly stage: Stage;
  private readonly core: ZaCore;
  private readonly seed: number;
  private readonly redClass: 'AMBLYOPIC' | 'FELLOW';
  private pointerId: number | null = null;
  private keys = { l: false, r: false, u: false, d: false };
  private flashAt = -1e9;
  private done = false;
  private readonly onDown = (e: PointerEvent) => this.down(e);
  private readonly onMove = (e: PointerEvent) => this.move(e);
  private readonly onUp = (e: PointerEvent) => this.up(e);
  private readonly onCancel = (e: PointerEvent) => this.lost(e);
  private readonly onKeyDown = (e: KeyboardEvent) => this.key(e, true);
  private readonly onKeyUp = (e: KeyboardEvent) => this.key(e, false);
  readonly actions = [];

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: GameContext,
    cfg: ZaSettings,
  ) {
    this.seed = ctx.seed ?? randomSeed();
    this.core = new ZaCore(cfg, makeRng(this.seed));
    this.redClass = redClassOf(ctx.vision);
    this.stage = new Stage(
      canvas,
      { w: W, h: H },
      { frame: (dt) => this.frame(dt), items: (now) => this.items(now) },
      ctx.vision,
      () => ctx.view(),
      { left: t.simLeft, right: t.simRight, filter: t.filterName },
    );
    canvas.addEventListener('pointerdown', this.onDown);
    canvas.addEventListener('pointermove', this.onMove);
    canvas.addEventListener('pointerup', this.onUp);
    canvas.addEventListener('pointercancel', this.onCancel);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  start(): void {
    this.stage.start();
  }
  pause(): void {
    this.stage.pause();
    this.releasePointer();
    this.keys = { l: false, r: false, u: false, d: false };
  }
  resume(): void {
    this.stage.resume();
  }
  destroy(): void {
    this.stage.destroy();
    this.canvas.removeEventListener('pointerdown', this.onDown);
    this.canvas.removeEventListener('pointermove', this.onMove);
    this.canvas.removeEventListener('pointerup', this.onUp);
    this.canvas.removeEventListener('pointercancel', this.onCancel);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  private releasePointer(): void {
    this.pointerId = null;
    this.core.cancelDrag();
  }

  // --- Eingabe ---

  private down(e: PointerEvent): void {
    if (this.done || !this.stage.running || (e.pointerType === 'mouse' && e.button !== 0)) return;
    if (this.pointerId !== null) return;
    e.preventDefault();
    const p = this.stage.toInternal(e.clientX, e.clientY);
    const ev = this.core.pointerDown(p.x, p.y);
    if (ev.length === 0) return;
    this.pointerId = e.pointerId;
    capturePointer(this.canvas, e.pointerId);
    this.handle(ev);
  }

  private move(e: PointerEvent): void {
    if (e.pointerId !== this.pointerId || this.done || !this.stage.running) return;
    e.preventDefault();
    const p = this.stage.toInternal(e.clientX, e.clientY);
    this.core.pointerMove(p.x, p.y);
  }

  private up(e: PointerEvent): void {
    if (e.pointerId !== this.pointerId) return;
    this.pointerId = null;
    if (this.done || !this.stage.running) return;
    const p = this.stage.toInternal(e.clientX, e.clientY);
    this.handle(this.core.pointerUp(p.x, p.y));
  }

  private lost(e: PointerEvent): void {
    if (e.pointerId !== this.pointerId) return;
    this.releasePointer();
  }

  private key(e: KeyboardEvent, down: boolean): void {
    const tag = (e.target as HTMLElement | null)?.tagName;
    if (tag === 'BUTTON' || tag === 'INPUT' || tag === 'SELECT' || tag === 'A' || tag === 'TEXTAREA') return;
    const k = e.key;
    if (k === 'ArrowLeft') this.keys.l = down;
    else if (k === 'ArrowRight') this.keys.r = down;
    else if (k === 'ArrowUp') this.keys.u = down;
    else if (k === 'ArrowDown') this.keys.d = down;
    else if ((k === ' ' || k === 'Enter') && down && !e.repeat) {
      if (!this.done && this.stage.running) this.handle(this.core.keyDrop());
      e.preventDefault();
      return;
    } else return;
    e.preventDefault();
  }

  // --- Schleife ---

  private frame(dtMs: number): void {
    if (this.done) return;
    const dt = Math.min(MAX_STEP_MS, dtMs);
    this.core.keyMove((this.keys.r ? 1 : 0) - (this.keys.l ? 1 : 0), (this.keys.d ? 1 : 0) - (this.keys.u ? 1 : 0), dt / 1000);
    let left = dtMs;
    while (left > 0 && !this.done) {
      const d = Math.min(MAX_STEP_MS, left);
      left -= d;
      this.handle(this.core.step(d));
    }
  }

  private handle(events: ZaEvent[]): void {
    for (const e of events) {
      if (e.type === 'touch') this.ctx.play('select');
      else if (e.type === 'hit') {
        this.flashAt = performance.now();
        this.ctx.play('hit');
        this.ctx.vibrate(18);
      } else if (e.type === 'miss' || e.type === 'late') {
        this.flashAt = performance.now();
        this.ctx.play('error');
        this.ctx.vibrate(60);
      } else if (e.type === 'swap') this.ctx.play('colorChange');
      else if (e.type === 'end') {
        this.done = true;
        this.stage.pause();
        this.ctx.finish('goal');
      }
    }
  }

  // --- Zeichnen ---

  private items(now: number): Item[] {
    const c = this.core;
    const cls = eyeClassesFor(c.role, this.redClass);
    const out: Item[] = [];
    // Rahmen des Spielfelds: grau (BOTH)
    out.push({ shape: { t: 'frame', x: 0, y: 0, w: W, h: H, lw: 4 }, eye: 'BOTH', k: 0.5, layer: 0 });
    // Ring: dicke Linie im Auge der Ringrolle
    out.push({ shape: { t: 'ring', x: c.ring.x, y: c.ring.y, r: c.geo.R, w: RING_STROKE }, eye: cls.ring, k: 1, layer: 1 });
    // Ball: gefüllte Scheibe im anderen Auge
    const b = c.ball;
    out.push({ shape: { t: 'disc', x: b.x, y: b.y, r: c.geo.ballR }, eye: cls.ball, k: 1, layer: 2 });
    const f = flashItem(now - this.flashAt, W, H);
    if (f) out.push(f);
    return out;
  }

  snapshot(): GameSnapshot {
    const c = this.core;
    let message = '';
    if (c.phase === 'fb') message = c.outcome === 'hit' ? t.za.fbHit : c.outcome === 'late' ? t.za.fbLate : t.za.fbMiss;
    else if (c.rounds === 0 && c.phase !== 'drag') message = `${t.za.hintStart} ${t.za.hintKeys}`;
    return {
      hud: [
        { id: 'level', label: t.za.hudLevel, value: String(c.phase === 'fb' ? c.roundLevelNow : c.level) },
        { id: 'hits', label: t.za.hudHits, value: String(c.hits) },
        { id: 'misses', label: t.za.hudMisses, value: String(c.misses) },
        { id: 'round', label: t.za.hudRound, value: c.total > 0 ? `${Math.min(c.roundNo, c.total)}/${c.total}` : String(c.roundNo) },
      ],
      message,
    };
  }

  summary(): GameSummary {
    return this.core.summary();
  }

  runAction(): void {}

  debugState(): Record<string, unknown> {
    const c = this.core;
    const cls = eyeClassesFor(c.role, this.redClass);
    return {
      game: 'ziehen-ablegen',
      seed: this.seed,
      phase: c.phase,
      outcome: c.outcome,
      ring: { x: c.ring.x, y: c.ring.y, R: c.geo.R, stroke: RING_STROKE },
      ball: { ...c.ball, r: c.geo.ballR },
      offset: c.geo.offset,
      roles: { ball: cls.ball, ring: cls.ring },
      role: c.role,
      redClass: this.redClass,
      level: c.level,
      roundLevel: c.roundLevelNow,
      hits: c.hits,
      misses: c.misses,
      late: c.late,
      rounds: c.rounds,
      total: c.total,
      points: c.points,
      roleSwaps: c.roleSwaps,
      limitMs: c.geo.limitMs,
      elapsedMs: c.elapsedMs,
      fbMs: FB_MS,
      running: this.stage.running,
    };
  }

  /** nur Tests: Ring und Ruheplatz des Balls setzen, Ring anhalten (`speed: 0`) */
  debugSet(p: Record<string, unknown>): void {
    const patch = p as { ring?: { x?: number; y?: number }; rest?: { x?: number; y?: number }; speed?: number; elapsedMs?: number };
    const c = this.core;
    if (patch.ring) Object.assign(c.ring, patch.ring);
    if (patch.rest) Object.assign(c.rest, patch.rest);
    if (patch.speed !== undefined) c.geo.speed = patch.speed;
    if (patch.elapsedMs !== undefined) c.elapsedMs = patch.elapsedMs;
  }

  toClient(x: number, y: number): { x: number; y: number } {
    return this.stage.toClient(x, y);
  }
}

export const ziehenAblegen: GameModule<ZaSettings> = {
  id: 'ziehen-ablegen',
  title: t.za.title,
  description: t.za.description,
  design: { w: W, h: H },
  defaults: DEFAULT_ZA,
  normalize: normalizeZa,
  create: (canvas, ctx, settings) => new ZaInstance(canvas, ctx, settings),
  rows: (sum) => {
    const d = sum.details;
    const n = (v: number, digits = 0) => v.toLocaleString('de-DE', { minimumFractionDigits: digits, maximumFractionDigits: digits });
    return [
      { label: t.za.sumPoints, value: String(sum.points) },
      { label: t.za.sumRounds, value: String(d.rounds ?? 0) },
      { label: t.za.sumHits, value: String(d.hits ?? 0) },
      { label: t.za.sumMisses, value: String(sum.errors) },
      { label: t.za.sumMaxLevel, value: String(d.maxLevel ?? 1) },
      { label: t.za.sumAvgTime, value: `${n((d.avgRoundMs ?? 0) / 1000, 1)} s` },
      { label: t.za.sumSwaps, value: String(d.roleSwaps ?? 0) },
    ];
  },
};
