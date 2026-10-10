/**
 * Spiel „Farbwechsel-Pong“: Hochformat, eigener Schläger unten, Gegner oben (Computer oder zweite Person). Der Ball
 * wechselt zwischen Rot und Zweitfarbe. Logik: logic.ts (fester Zeitschritt 120 Hz). Farben nur über
 * `vision/color.ts`, Feedback nur grau, Ton, Vibration.
 *
 * Steuerung: Touch/Stift relativ (der Schläger folgt der waagerechten Bewegung mit Verstärkungsfaktor, der Finger kann
 * irgendwo wischen), Maus absolut, Pfeiltasten (unten) bzw. A/D (oben, Zwei-Spieler-Modus). Zwei-Spieler-Modus: obere
 * und untere Bildschirmhälfte steuern je einen Schläger; jede Zeiger-ID wird getrennt verwaltet (Mehrfachtouch).
 */
import { t } from '../../texts';
import type { Item } from '../../vision/renderer';
import { capturePointer, flashItem, makeRng, randomSeed, Stage } from '../common';
import type { GameInstance, GameModule, GameSnapshot, GameSummary, GameContext } from '../types';
import { BOTTOM_Y, H, newPong, PADDLE_H, setPaddle, STEP_S, stepPong, TOP_Y, W, type PongEvent, type PongState, type Side } from './logic';
import { DEFAULT_PONG, normalizePong, type PongSettings } from './settings';

interface Pointer {
  role: Side;
  type: string;
  lastX: number;
}

/** höchstens so viele Physikschritte je Bild (nach langen Pausen kein „Aufholen“) */
const MAX_STEPS = 12;

class PongInstance implements GameInstance {
  private readonly stage: Stage;
  private readonly rng: () => number;
  private s: PongState;
  private acc = 0;
  private flashAt = -1e9;
  private pointers = new Map<number, Pointer>();
  private keys = { left: false, right: false, a: false, d: false };
  private done = false;
  private readonly seed: number;
  private readonly onDown = (e: PointerEvent) => this.down(e);
  private readonly onMove = (e: PointerEvent) => this.move(e);
  private readonly onUp = (e: PointerEvent) => this.up(e);
  private readonly onKeyDown = (e: KeyboardEvent) => this.key(e, true);
  private readonly onKeyUp = (e: KeyboardEvent) => this.key(e, false);
  readonly actions = [];

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: GameContext,
    private readonly cfg: PongSettings,
  ) {
    this.seed = ctx.seed ?? randomSeed();
    this.rng = makeRng(this.seed);
    this.s = newPong(this.rng);
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
    canvas.addEventListener('pointercancel', this.onUp);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  start(): void {
    this.stage.start();
  }
  pause(): void {
    this.stage.pause();
    this.pointers.clear();
    this.keys = { left: false, right: false, a: false, d: false };
  }
  resume(): void {
    this.acc = 0;
    this.stage.resume();
  }
  destroy(): void {
    this.stage.destroy();
    this.canvas.removeEventListener('pointerdown', this.onDown);
    this.canvas.removeEventListener('pointermove', this.onMove);
    this.canvas.removeEventListener('pointerup', this.onUp);
    this.canvas.removeEventListener('pointercancel', this.onUp);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  // --- Eingabe ---

  private down(e: PointerEvent): void {
    if (this.done || !this.stage.running) return;
    e.preventDefault();
    capturePointer(this.canvas, e.pointerId);
    const p = this.stage.toInternal(e.clientX, e.clientY);
    const mouse = e.pointerType === 'mouse';
    // Zwei-Spieler-Modus: Hälfte des Bildschirms bestimmt den Schläger (Maus steuert nur den unteren)
    const role: Side = this.cfg.twoPlayer && !mouse && p.y < H / 2 ? 'top' : 'bottom';
    this.pointers.set(e.pointerId, { role, type: e.pointerType, lastX: p.x });
    if (mouse) setPaddle(this.s, this.cfg, 'bottom', p.x);
  }

  private move(e: PointerEvent): void {
    if (this.done || !this.stage.running) return;
    const p = this.stage.toInternal(e.clientX, e.clientY);
    if (e.pointerType === 'mouse') {
      // Maus: Schläger folgt direkt der Mausposition
      setPaddle(this.s, this.cfg, 'bottom', p.x);
      return;
    }
    const ptr = this.pointers.get(e.pointerId);
    if (!ptr) return;
    e.preventDefault();
    const dx = (p.x - ptr.lastX) * this.cfg.gain;
    ptr.lastX = p.x;
    setPaddle(this.s, this.cfg, ptr.role, (ptr.role === 'top' ? this.s.top : this.s.bottom) + dx);
  }

  private up(e: PointerEvent): void {
    this.pointers.delete(e.pointerId);
  }

  private key(e: KeyboardEvent, down: boolean): void {
    const k = e.key;
    if (k === 'ArrowLeft') this.keys.left = down;
    else if (k === 'ArrowRight') this.keys.right = down;
    else if (k === 'a' || k === 'A') this.keys.a = down;
    else if (k === 'd' || k === 'D') this.keys.d = down;
    else return;
    if (k.startsWith('Arrow')) e.preventDefault();
  }

  // --- Schleife ---

  private frame(dtMs: number): void {
    if (this.done) return;
    this.acc += dtMs / 1000;
    let n = 0;
    const input = { keys: { bottom: (this.keys.right ? 1 : 0) - (this.keys.left ? 1 : 0), top: (this.keys.d ? 1 : 0) - (this.keys.a ? 1 : 0) } };
    while (this.acc >= STEP_S && n < MAX_STEPS && !this.done) {
      this.acc -= STEP_S;
      n++;
      this.handle(stepPong(this.s, this.cfg, input, this.rng));
    }
    if (n >= MAX_STEPS) this.acc = 0;
  }

  private handle(events: PongEvent[]): void {
    for (const e of events) {
      if (e.type === 'bounce') this.ctx.play('wall');
      else if (e.type === 'hit') {
        this.ctx.play('hit');
        if (e.side === 'bottom') this.ctx.vibrate(12);
      } else if (e.type === 'colorChange') {
        if (e.cause === 'flight') this.ctx.play('colorChange');
      } else if (e.type === 'point') {
        this.flashAt = performance.now();
        if (e.scorer === 'bottom' || this.cfg.twoPlayer) this.ctx.play('point');
        else {
          this.ctx.play('error');
          this.ctx.vibrate(60);
        }
      } else if (e.type === 'over') {
        this.done = true;
        this.stage.pause();
        this.ctx.finish('score');
      }
    }
  }

  private items(now: number): Item[] {
    const s = this.s;
    const out: Item[] = [];
    const pw = this.cfg.paddleWidth;
    // Mittellinie, Schläger, Punktestand: grau (BOTH)
    out.push({ shape: { t: 'line', x1: 0, y1: H / 2, x2: W, y2: H / 2, w: 4, dash: [26, 22] }, eye: 'BOTH', k: 0.5, layer: 0 });
    out.push({ shape: { t: 'rect', x: s.top - pw / 2, y: TOP_Y - PADDLE_H / 2, w: pw, h: PADDLE_H }, eye: 'BOTH', k: 0.95, layer: 0 });
    out.push({ shape: { t: 'rect', x: s.bottom - pw / 2, y: BOTTOM_Y - PADDLE_H / 2, w: pw, h: PADDLE_H }, eye: 'BOTH', k: 0.95, layer: 0 });
    out.push({ shape: { t: 'text', x: 36, y: H / 2 - 28, text: String(s.score.top), size: 64 }, eye: 'BOTH', k: 0.7, layer: 0 });
    out.push({ shape: { t: 'text', x: 36, y: H / 2 + 84, text: String(s.score.bottom), size: 64 }, eye: 'BOTH', k: 0.7, layer: 0 });
    // Ball: großer gefüllter Kreis, gehört genau einem Auge
    out.push({ shape: { t: 'disc', x: s.ball.x, y: s.ball.y, r: this.cfg.ballRadius }, eye: s.eye, k: 1, layer: 1 });
    const f = flashItem(now - this.flashAt, W, H);
    if (f) out.push(f);
    return out;
  }

  snapshot(): GameSnapshot {
    const s = this.s;
    return {
      hud: [
        { id: 'score', label: t.pong.hudScore, value: `${s.score.bottom} : ${s.score.top}` },
        { id: 'hits', label: t.pong.hudHits, value: String(s.hits) },
        { id: 'changes', label: t.pong.hudChanges, value: String(s.colorChanges) },
      ],
      message: s.hits === 0 && s.score.bottom + s.score.top === 0 ? (this.cfg.twoPlayer ? t.pong.hintTwo : t.pong.hintControl) : '',
    };
  }

  summary(): GameSummary {
    const s = this.s;
    return {
      points: s.score.bottom,
      errors: s.score.top,
      colorChanges: s.colorChanges,
      details: { opponent: s.score.top, hits: s.hits, maxRally: s.maxRally, won: s.winner === 'bottom' ? 1 : 0, target: this.cfg.targetScore, twoPlayer: this.cfg.twoPlayer ? 1 : 0 },
      completed: s.phase === 'over',
    };
  }

  runAction(): void {}

  debugState(): Record<string, unknown> {
    const s = this.s;
    return {
      game: 'pong',
      seed: this.seed,
      ball: { ...s.ball },
      radius: this.cfg.ballRadius,
      speed: s.speed,
      eye: s.eye,
      top: s.top,
      bottom: s.bottom,
      paddleWidth: this.cfg.paddleWidth,
      score: { ...s.score },
      phase: s.phase,
      colorChanges: s.colorChanges,
      hits: s.hits,
      flightY: s.flightY,
      winner: s.winner,
      gain: this.cfg.gain,
      twoPlayer: this.cfg.twoPlayer,
      running: this.stage.running,
      pointers: this.pointers.size,
    };
  }

  /** nur für Tests: Ball und Schläger direkt setzen (z. B. Ball vor den Schläger legen) */
  debugSet(p: Record<string, unknown>): void {
    const patch = p as { ball?: Partial<PongState['ball']>; speed?: number; bottom?: number; top?: number };
    if (patch.ball) Object.assign(this.s.ball, patch.ball);
    if (patch.speed !== undefined) this.s.speed = patch.speed;
    if (patch.bottom !== undefined) this.s.bottom = patch.bottom;
    if (patch.top !== undefined) this.s.top = patch.top;
  }

  toClient(x: number, y: number): { x: number; y: number } {
    return this.stage.toClient(x, y);
  }
}

export const pong: GameModule<PongSettings> = {
  id: 'pong',
  title: t.pong.title,
  description: t.pong.description,
  design: { w: W, h: H },
  defaults: DEFAULT_PONG,
  normalize: normalizePong,
  create: (canvas, ctx, settings) => new PongInstance(canvas, ctx, settings),
  rows: (sum) => [
    { label: t.pong.sumScore, value: `${sum.points} : ${sum.details.opponent ?? 0}` },
    { label: t.pong.hudHits, value: String(sum.details.hits ?? 0) },
    { label: t.pong.sumRally, value: String(sum.details.maxRally ?? 0) },
    { label: t.pong.hudChanges, value: String(sum.colorChanges) },
  ],
};
