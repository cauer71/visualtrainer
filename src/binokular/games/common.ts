/**
 * Gemeinsame Bausteine der Spiele: Zufall mit Seed, Bühne (Canvas-Skalierung mit devicePixelRatio, Letterbox,
 * Schleife, Debug-Ansichten), Zeigerabsicherung und das neutrale graue Aufblitz-Feedback.
 */
import { filterOf } from '../vision/color';
import type { VisionSettings } from '../vision/color';
import { renderAnaglyphSim, renderItems, type DebugView, type Item } from '../vision/renderer';

// --- Zufall -------------------------------------------------------------------------------------

/** Kleiner, schneller Zufallsgenerator (mulberry32): gleicher Seed → gleiche Folge */
export type Rng = () => number;

export function makeRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** zufälliger Seed (für Spiele ohne `?seed=N`) */
export function randomSeed(): number {
  try {
    const a = new Uint32Array(1);
    crypto.getRandomValues(a);
    return a[0];
  } catch {
    return Math.floor(Math.random() * 4294967296);
  }
}

export const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

// --- Feedback (nur neutral grau, nie Rot oder Zweitfarbe) --------------------------------------

/** Dauer des grauen Aufblitz-Rahmens */
export const FLASH_MS = 280;

/**
 * Grauer Rahmen am Spielfeldrand: ein BOTH-Objekt (für beide Augen sichtbar) in vollem Grau (R = G = B), dessen
 * Rand zum Ende hin schmaler wird (Teilkontraste würden den leicht getönten Hintergrund durchscheinen lassen).
 * `age` = ms seit dem Ereignis; danach `null`.
 */
export function flashItem(age: number, w: number, h: number, width = 16): Item | null {
  if (age < 0 || age >= FLASH_MS) return null;
  return { shape: { t: 'frame', x: 0, y: 0, w, h, lw: Math.max(4, width * (1 - 0.6 * (age / FLASH_MS))) }, eye: 'BOTH', k: 1, layer: 9 };
}

// --- Zeiger und Bühne -----------------------------------------------------------------------------

/**
 * Canvas gegen Scrollen, Zoomen, Textmarkierung und Kontextmenü absichern (Zeigerereignisse gehören dem Spiel).
 * Gibt eine Aufräumfunktion zurück.
 */
export function lockCanvas(canvas: HTMLCanvasElement): () => void {
  canvas.style.touchAction = 'none';
  canvas.style.userSelect = 'none';
  (canvas.style as unknown as Record<string, string>).webkitUserSelect = 'none';
  (canvas.style as unknown as Record<string, string>).webkitTouchCallout = 'none';
  const stop = (e: Event) => e.preventDefault();
  const opts: AddEventListenerOptions = { passive: false };
  const events = ['contextmenu', 'gesturestart', 'gesturechange', 'gestureend', 'dblclick', 'selectstart', 'dragstart'];
  for (const ev of events) canvas.addEventListener(ev, stop, opts);
  canvas.addEventListener('touchmove', stop, opts);
  canvas.addEventListener('wheel', stop, opts);
  return () => {
    for (const ev of events) canvas.removeEventListener(ev, stop);
    canvas.removeEventListener('touchmove', stop);
    canvas.removeEventListener('wheel', stop);
  };
}

export function capturePointer(canvas: HTMLCanvasElement, id: number): void {
  try {
    canvas.setPointerCapture(id);
  } catch {
    // nicht überall verfügbar (z. B. synthetische Ereignisse) – dann läuft es ohne
  }
}

export interface StageHooks {
  /** Spielschritt (nur wenn die Bühne läuft), `dtMs` begrenzt auf 100 ms */
  frame(dtMs: number, nowMs: number): void;
  /** Zeichenobjekte des aktuellen Zustands */
  items(nowMs: number): Item[];
}

/**
 * Bühne: füllt den Elternknoten, skaliert das feste Spielfeld (Innenkoordinaten) eingepasst und zentriert
 * (Letterbox, Rand in Profil-Hintergrundfarbe), Auflösung mit devicePixelRatio (höchstens 2).
 */
export class Stage {
  cssW = 0;
  cssH = 0;
  dpr = 1;
  scale = 1;
  ox = 0;
  oy = 0;
  running = false;
  private raf = 0;
  private last = 0;
  private off: HTMLCanvasElement | null = null;
  private unlock: () => void;
  private ro: ResizeObserver | null = null;
  private dead = false;

  constructor(
    readonly canvas: HTMLCanvasElement,
    readonly design: { w: number; h: number },
    private readonly hooks: StageHooks,
    private readonly vision: VisionSettings,
    private readonly view: () => DebugView,
    private readonly labels: { left: (f: string) => string; right: (f: string) => string; filter: Record<string, string> },
  ) {
    this.unlock = lockCanvas(canvas);
    this.resize();
    try {
      this.ro = new ResizeObserver(() => this.resize());
      if (canvas.parentElement) this.ro.observe(canvas.parentElement);
    } catch {
      window.addEventListener('resize', this.onResize);
    }
  }

  private onResize = () => this.resize();

  resize(): void {
    const parent = this.canvas.parentElement;
    const w = Math.max(1, parent ? parent.clientWidth : window.innerWidth);
    const h = Math.max(1, parent ? parent.clientHeight : window.innerHeight);
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.cssW = w;
    this.cssH = h;
    this.dpr = dpr;
    this.scale = Math.min(w / this.design.w, h / this.design.h);
    this.ox = (w - this.design.w * this.scale) / 2;
    this.oy = (h - this.design.h * this.scale) / 2;
    const pw = Math.round(w * dpr);
    const ph = Math.round(h * dpr);
    if (this.canvas.width !== pw || this.canvas.height !== ph) {
      this.canvas.width = pw;
      this.canvas.height = ph;
    }
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
  }

  /** Client-Koordinaten → Spielkoordinaten (nicht begrenzt) */
  toInternal(clientX: number, clientY: number): { x: number; y: number } {
    const r = this.canvas.getBoundingClientRect();
    return { x: (clientX - r.left - this.ox) / this.scale, y: (clientY - r.top - this.oy) / this.scale };
  }

  toClient(x: number, y: number): { x: number; y: number } {
    const r = this.canvas.getBoundingClientRect();
    return { x: r.left + this.ox + x * this.scale, y: r.top + this.oy + y * this.scale };
  }

  start(): void {
    if (this.dead || this.raf) return;
    this.running = true;
    this.last = performance.now();
    const loop = (now: number) => {
      if (this.dead) return;
      const dt = Math.min(100, Math.max(0, now - this.last));
      this.last = now;
      if (this.running) this.hooks.frame(dt, now);
      this.draw(now);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  pause(): void {
    this.running = false;
  }

  resume(): void {
    this.last = performance.now();
    this.running = true;
  }

  draw(now: number): void {
    const g = this.canvas.getContext('2d');
    if (!g) return;
    const items = this.hooks.items(now);
    const view = this.view();
    const { dpr } = this;
    if (view === 'ANAGLYPH_SIM') {
      if (!this.off) this.off = document.createElement('canvas');
      const off = this.off;
      off.width = this.canvas.width;
      off.height = this.canvas.height;
      const og = off.getContext('2d');
      if (!og) return;
      og.setTransform(dpr * this.scale, 0, 0, dpr * this.scale, dpr * this.ox, dpr * this.oy);
      renderItems(og, items, this.vision, { view: 'BINOCULAR' });
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderAnaglyphSim(g, off, this.cssW, this.cssH, this.vision, this.cssW, this.cssH, {
        left: this.labels.left(this.labels.filter[filterOf('LEFT', this.vision)]),
        right: this.labels.right(this.labels.filter[filterOf('RIGHT', this.vision)]),
      });
      return;
    }
    g.setTransform(dpr * this.scale, 0, 0, dpr * this.scale, dpr * this.ox, dpr * this.oy);
    renderItems(g, items, this.vision, { view });
  }

  destroy(): void {
    this.dead = true;
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.unlock();
    this.ro?.disconnect();
    window.removeEventListener('resize', this.onResize);
  }
}
