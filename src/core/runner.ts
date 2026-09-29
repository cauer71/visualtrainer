/**
 * Runner: führt eine Übung auf einer Canvas-Bühne aus.
 *
 * - Pixeldichte (devicePixelRatio) und Größenänderungen (Tablet drehen)
 * - Zeitschleife mit dt in Sekunden (unabhängig von 60/120-Hz-Displays)
 * - virtuelle Uhr, die während einer Pause stillsteht
 * - präzise Eingabezeiten über event.timeStamp
 * - Geister-Hand + Erklärtexte für die Intro-Filme
 */
import type { Lang } from '../i18n/lang';
import { font, hand, ring, rrPath } from './draw';
import { createFormatter } from './format';
import { createRng } from './rng';
import { silentSfx } from './sound';
import { clamp, easeInOut, lerp } from './stats';
import type {
  Exercise,
  ExerciseContext,
  ExerciseDefinition,
  ExerciseResult,
  Ghost,
  GhostTapOptions,
  Hud,
  Mode,
  PointerInfo,
  Sfx,
  StageInfo,
  ToastKind,
} from './types';

// ---------------------------------------------------------------------------

function prefersReducedMotion(): boolean {
  try {
    return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

export class Stage implements StageInfo {
  readonly canvas: HTMLCanvasElement;
  readonly g: CanvasRenderingContext2D;
  w = 0;
  h = 0;
  dpr = 1;
  u = 1;
  onResize?: (w: number, h: number) => void;
  private ro: ResizeObserver | null = null;

  constructor(private host: HTMLElement) {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'stage-canvas';
    this.canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(this.canvas);
    const g = this.canvas.getContext('2d', { alpha: false });
    if (!g) throw new Error('Canvas 2D wird nicht unterstützt');
    this.g = g;
    if (typeof ResizeObserver !== 'undefined') {
      this.ro = new ResizeObserver(() => this.measure());
      this.ro.observe(host);
    } else {
      window.addEventListener('resize', this.measure);
    }
    this.measure();
  }

  measure = (): void => {
    const r = this.host.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width));
    const h = Math.max(1, Math.round(r.height));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (w === this.w && h === this.h && dpr === this.dpr) return;
    this.w = w;
    this.h = h;
    this.dpr = dpr;
    this.u = Math.min(w, h) / 100;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.onResize?.(w, h);
  };

  begin(): void {
    this.g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  destroy(): void {
    this.ro?.disconnect();
    window.removeEventListener('resize', this.measure);
    this.canvas.remove();
  }
}

// ---------------------------------------------------------------------------

interface GhostAction {
  kind: 'tap' | 'move';
  x: number;
  y: number;
  delay: number;
  move: number;
}

interface GhostCurrent extends GhostAction {
  phase: 'wait' | 'move' | 'press';
  t0: number;
  fx: number;
  fy: number;
}

class GhostHand implements Ghost {
  x: number;
  y: number;
  private visible = true;
  private queue: GhostAction[] = [];
  private cur: GhostCurrent | null = null;
  private pressT = -1e9;

  constructor(
    private stage: StageInfo,
    private onTap: (x: number, y: number, t: number) => void,
    private readonly enabled: boolean,
  ) {
    this.x = stage.w * 0.78;
    this.y = stage.h * 0.86;
  }

  get idle(): boolean {
    return !this.cur && this.queue.length === 0;
  }

  tap(x: number, y: number, o: GhostTapOptions = {}): void {
    if (!this.enabled) return;
    this.queue.push({ kind: 'tap', x, y, delay: o.delay ?? 0, move: o.move ?? 380 });
  }

  moveTo(x: number, y: number, o: GhostTapOptions = {}): void {
    if (!this.enabled) return;
    this.queue.push({ kind: 'move', x, y, delay: o.delay ?? 0, move: o.move ?? 450 });
  }

  clear(): void {
    this.queue = [];
    this.cur = null;
  }

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  update(t: number): void {
    if (!this.enabled) return;
    if (!this.cur && this.queue.length) {
      const a = this.queue.shift()!;
      this.cur = { ...a, phase: 'wait', t0: t, fx: this.x, fy: this.y };
    }
    const c = this.cur;
    if (!c) return;
    if (c.phase === 'wait') {
      if (t - c.t0 < c.delay) return;
      c.phase = 'move';
      c.t0 = t;
      c.fx = this.x;
      c.fy = this.y;
    }
    if (c.phase === 'move') {
      const k = c.move <= 0 ? 1 : Math.min(1, (t - c.t0) / c.move);
      const e = easeInOut(k);
      this.x = lerp(c.fx, c.x, e);
      this.y = lerp(c.fy, c.y, e);
      if (k >= 1) {
        if (c.kind === 'tap') {
          c.phase = 'press';
          c.t0 = t;
          this.pressT = t;
          this.onTap(c.x, c.y, t);
        } else {
          this.cur = null;
        }
      }
      return;
    }
    if (c.phase === 'press' && t - c.t0 >= 170) this.cur = null;
  }

  render(g: CanvasRenderingContext2D, t: number): void {
    if (!this.enabled || !this.visible) return;
    const since = t - this.pressT;
    if (since >= 0 && since < 480) {
      const k = since / 480;
      g.save();
      g.globalAlpha = 0.7 * (1 - k);
      ring(g, this.x, this.y, 6 + k * 30, '#ffffff', 3);
      g.restore();
    }
    const size = clamp(this.stage.u * 13, 48, 110);
    hand(g, this.x, this.y, size, since >= 0 && since < 170);
  }
}

const noopGhost: Ghost = {
  tap: () => {},
  moveTo: () => {},
  clear: () => {},
  show: () => {},
  hide: () => {},
  get idle() {
    return true;
  },
};

// ---------------------------------------------------------------------------

interface ToastItem {
  text: string;
  kind: ToastKind;
  t0: number;
  ms: number;
  x?: number;
  y?: number;
  size?: number;
}

export interface DomHud {
  progress?: HTMLElement | null;
  score?: HTMLElement | null;
  label?: HTMLElement | null;
}

export interface RunnerOptions {
  host: HTMLElement;
  def: ExerciseDefinition;
  mode: Mode;
  lang: Lang;
  /** Im Spielmodus automatisch spielen (für Tests) */
  autoplay?: boolean;
  quick?: boolean;
  startLevel: number | null;
  seed?: number;
  sfx: Sfx;
  domHud?: DomHud;
  onFinish: (r: ExerciseResult) => void;
  onError?: (e: unknown) => void;
}

export class Runner {
  readonly stage: Stage;
  private ex: Exercise;
  private ctx: ExerciseContext;
  private ghost: GhostHand;
  private raf = 0;
  private started = false;
  private finished = false;
  private destroyed = false;
  private paused = false;
  private pauseStart = 0;
  private pauseTotal = 0;
  private lastT = 0;
  private toasts: ToastItem[] = [];
  private captionText: string | null = null;
  private captionPos: 'top' | 'bottom' = 'bottom';
  private captionSince = 0;
  private cleanup: Array<() => void> = [];

  constructor(private o: RunnerOptions) {
    this.stage = new Stage(o.host);
    const autoplay = o.mode === 'demo' || !!o.autoplay;
    this.ghost = new GhostHand(this.stage, (x, y, t) => this.dispatchDown({ id: -1, x, y, t, type: 'ghost' }), autoplay);
    const fmt = createFormatter(o.lang);
    this.ctx = {
      mode: o.mode,
      autoplay,
      quick: !!o.quick,
      reducedMotion: prefersReducedMotion(),
      startLevel: o.startLevel,
      lang: o.lang,
      texts: o.def.texts[o.lang],
      rng: createRng(o.seed),
      sfx: o.mode === 'demo' ? silentSfx : o.sfx,
      hud: this.makeHud(o.domHud, fmt.num),
      ghost: autoplay ? this.ghost : noopGhost,
      stage: this.stage,
      fmt,
      now: () => this.now(),
      finish: (r) => this.finish(r),
    };
    this.ex = o.def.create(this.ctx);
    this.stage.onResize = (w, h) => {
      try {
        this.ex.resize?.(w, h);
      } catch (e) {
        this.fail(e);
      }
    };
    if (!autoplay) this.attachInput();
  }

  /** Virtuelle Zeit in ms (steht während der Pause still) */
  now(): number {
    return (this.paused ? this.pauseStart : performance.now()) - this.pauseTotal;
  }

  get isPaused(): boolean {
    return this.paused;
  }

  get isFinished(): boolean {
    return this.finished;
  }

  start(): void {
    if (this.started || this.destroyed) return;
    this.started = true;
    const t = this.now();
    this.lastT = t;
    try {
      this.ex.start(t);
    } catch (e) {
      this.fail(e);
      return;
    }
    this.raf = requestAnimationFrame(this.frame);
  }

  pause(): void {
    if (this.paused || !this.started || this.finished || this.destroyed) return;
    this.paused = true;
    this.pauseStart = performance.now();
  }

  resume(): void {
    if (!this.paused) return;
    this.pauseTotal += performance.now() - this.pauseStart;
    this.paused = false;
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
    for (const c of this.cleanup) c();
    this.cleanup = [];
    try {
      this.ex.destroy?.();
    } catch {
      /* ignorieren */
    }
    this.stage.destroy();
  }

  private frame = (ts: number): void => {
    if (this.destroyed) return;
    this.raf = requestAnimationFrame(this.frame);
    if (this.paused) return;
    let t = ts - this.pauseTotal;
    if (t < this.lastT) t = this.lastT;
    const dt = Math.min(0.05, Math.max(0, (t - this.lastT) / 1000));
    this.lastT = t;
    try {
      this.ghost.update(t);
      if (!this.finished) this.ex.update(dt, t);
      this.draw(t);
    } catch (e) {
      this.fail(e);
    }
  };

  private draw(t: number): void {
    const g = this.stage.g;
    this.stage.begin();
    g.globalAlpha = 1;
    this.ex.render(g, t);
    this.drawToasts(g, t);
    if (this.o.mode === 'demo') this.drawCaption(g, t);
    if (this.ctx.autoplay) this.ghost.render(g, t);
  }

  private finish(r: ExerciseResult): void {
    if (this.finished) return;
    this.finished = true;
    queueMicrotask(() => {
      if (!this.destroyed) this.o.onFinish(r);
    });
  }

  private fail(e: unknown): void {
    console.error('[Blickfit] Fehler in der Übung', e);
    this.finished = true;
    cancelAnimationFrame(this.raf);
    this.o.onError?.(e);
  }

  private dispatchDown(p: PointerInfo): void {
    if (this.paused || this.finished || !this.started) return;
    try {
      this.ex.pointerDown?.(p);
    } catch (e) {
      this.fail(e);
    }
  }

  private attachInput(): void {
    const el = this.stage.canvas;
    const toInfo = (e: PointerEvent): PointerInfo => {
      const r = el.getBoundingClientRect();
      const sx = r.width > 0 ? this.stage.w / r.width : 1;
      const sy = r.height > 0 ? this.stage.h / r.height : 1;
      const pn = performance.now();
      let ts = e.timeStamp;
      // Ältere Browser liefern Epoch-Zeitstempel → dann "jetzt" verwenden
      if (!(ts > 0) || ts > pn + 50 || pn - ts > 3000) ts = pn;
      const type = e.pointerType === 'touch' || e.pointerType === 'pen' ? e.pointerType : 'mouse';
      return { id: e.pointerId, x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy, t: ts - this.pauseTotal, type };
    };
    const down = (e: PointerEvent) => {
      if (e.cancelable) e.preventDefault();
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* ignorieren */
      }
      this.dispatchDown(toInfo(e));
    };
    const move = (e: PointerEvent) => {
      if (this.paused || this.finished || !this.started) return;
      try {
        this.ex.pointerMove?.(toInfo(e));
      } catch (err) {
        this.fail(err);
      }
    };
    const up = (e: PointerEvent) => {
      if (this.paused || this.finished || !this.started) return;
      try {
        this.ex.pointerUp?.(toInfo(e));
      } catch (err) {
        this.fail(err);
      }
    };
    const block = (e: Event) => {
      if (e.cancelable) e.preventDefault();
    };
    const KEYS = [' ', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    const key = (e: KeyboardEvent) => {
      if (!this.ex.keyDown || e.repeat || e.altKey || e.ctrlKey || e.metaKey || !KEYS.includes(e.key)) return;
      e.preventDefault();
      if (this.paused || this.finished || !this.started) return;
      const pn = performance.now();
      let ts = e.timeStamp;
      if (!(ts > 0) || ts > pn + 50 || pn - ts > 3000) ts = pn;
      try {
        this.ex.keyDown(e.key, ts - this.pauseTotal);
      } catch (err) {
        this.fail(err);
      }
    };
    window.addEventListener('keydown', key);
    el.addEventListener('pointerdown', down, { passive: false });
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('touchstart', block, { passive: false });
    el.addEventListener('contextmenu', block);
    this.cleanup.push(() => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('touchstart', block);
      el.removeEventListener('contextmenu', block);
      window.removeEventListener('keydown', key);
    });
  }

  private makeHud(dom: DomHud | undefined, num: (v: number, d?: number) => string): Hud {
    let lastProg = -1;
    let lastScore: string | undefined;
    let lastLabel: string | undefined;
    return {
      setProgress: (f) => {
        const el = dom?.progress;
        if (!el) return;
        const v = Math.round(clamp(f, 0, 1) * 500) / 500;
        if (v === lastProg) return;
        lastProg = v;
        el.style.transform = `scaleX(${v})`;
      },
      setScore: (v) => {
        const el = dom?.score;
        if (!el) return;
        const s = v === null ? '' : num(v);
        if (s === lastScore) return;
        lastScore = s;
        el.textContent = s;
        el.hidden = v === null;
      },
      setLabel: (text) => {
        const el = dom?.label;
        if (!el) return;
        const s = text ?? '';
        if (s === lastLabel) return;
        lastLabel = s;
        el.textContent = s;
        el.hidden = !text;
      },
      toast: (text, kind = 'info', opts = {}) => {
        this.toasts.push({ text, kind, t0: this.now(), ms: opts.ms ?? 800, x: opts.x, y: opts.y, size: opts.size });
        if (this.toasts.length > 12) this.toasts.shift();
      },
      caption: (text, pos = 'bottom') => {
        if (text === this.captionText && pos === this.captionPos) return;
        this.captionText = text;
        this.captionPos = pos;
        this.captionSince = this.now();
      },
    };
  }

  private drawToasts(g: CanvasRenderingContext2D, t: number): void {
    if (!this.toasts.length) return;
    const { w, h, u } = this.stage;
    this.toasts = this.toasts.filter((it) => t - it.t0 < it.ms);
    for (const it of this.toasts) {
      const k = (t - it.t0) / it.ms;
      const alpha = Math.min(1, (t - it.t0) / 90) * (k > 0.7 ? 1 - (k - 0.7) / 0.3 : 1);
      const size = it.size ?? clamp(u * (it.kind === 'big' ? 8 : 5), 18, it.kind === 'big' ? 72 : 44);
      const x = it.x ?? w / 2;
      const y = (it.y ?? h * 0.2) - k * size * 0.5;
      const color = it.kind === 'good' ? '#4ADE80' : it.kind === 'bad' ? '#F87171' : '#FFFFFF';
      g.save();
      g.globalAlpha = Math.max(0, alpha);
      g.font = font(size, 800);
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.lineJoin = 'round';
      g.lineWidth = Math.max(3, size * 0.16);
      g.strokeStyle = 'rgba(5,10,20,0.75)';
      g.strokeText(it.text, x, y);
      g.fillStyle = color;
      g.fillText(it.text, x, y);
      g.restore();
    }
  }

  private drawCaption(g: CanvasRenderingContext2D, t: number): void {
    const text = this.captionText;
    if (!text) return;
    const { w, h, u } = this.stage;
    const size = clamp(u * 4.6, 14, 30);
    g.save();
    g.font = font(size, 700);
    const tw = Math.min(w * 0.92, g.measureText(text).width);
    const padX = size * 0.9;
    const bw = tw + padX * 2;
    const bh = size * 2.1;
    const x = (w - bw) / 2;
    const y = this.captionPos === 'top' ? h * 0.05 : h - bh - h * 0.05;
    const a = Math.min(1, (t - this.captionSince) / 220);
    g.globalAlpha = a;
    g.translate(0, (1 - a) * 8);
    rrPath(g, x, y, bw, bh, bh / 2);
    g.fillStyle = 'rgba(255,255,255,0.94)';
    g.fill();
    g.fillStyle = '#0F172A';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(text, w / 2, y + bh / 2 + 1, w * 0.9);
    g.restore();
  }
}
