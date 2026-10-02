// EYE-EXPERIMENT: Vollfenster-Bühne für Kalibrierung und Messungen (Koordinaten = Fenster der Seite) und Overlay-Zeichnung.
import { LM } from './features';
import type { FrameInfo } from './tracker';
import type { Pt, Size } from './types';

/** Größe des sichtbaren Fensters ohne Bildlaufleiste – dieselbe Fläche, die `position: fixed; inset: 0` abdeckt. */
export function viewportSize(): Size {
  return { w: document.documentElement.clientWidth, h: document.documentElement.clientHeight };
}

export interface StageOptions {
  theme: 'light' | 'dark';
  cancelLabel: string;
  ariaLabel: string;
  onCancel: () => void;
}

export class Stage {
  readonly el: HTMLDivElement;
  private title: HTMLDivElement;
  private prevOverflow: string;
  private keyHandler: (e: KeyboardEvent) => void;
  private closed = false;

  constructor(opts: StageOptions) {
    this.el = document.createElement('div');
    this.el.className = `eye-stage eye-stage-${opts.theme}`;
    this.el.setAttribute('role', 'dialog');
    this.el.setAttribute('aria-label', opts.ariaLabel);
    const bar = document.createElement('div');
    bar.className = 'eye-stage-bar';
    this.title = document.createElement('div');
    this.title.className = 'eye-stage-title';
    this.title.setAttribute('role', 'status');
    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'eye-btn eye-stage-cancel';
    cancel.textContent = opts.cancelLabel;
    cancel.addEventListener('click', () => opts.onCancel());
    bar.append(this.title, cancel);
    this.el.append(bar);
    document.body.append(this.el);
    this.prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.keyHandler = (e) => {
      if (e.key === 'Escape') opts.onCancel();
    };
    window.addEventListener('keydown', this.keyHandler);
    cancel.focus({ preventScroll: true });
  }

  size(): Size {
    return viewportSize();
  }

  setTitle(text: string): void {
    this.title.textContent = text;
  }

  add<T extends HTMLElement>(el: T): T {
    this.el.append(el);
    return el;
  }

  /** Runder Zielpunkt, mittig auf (x, y) in Fenster-Pixeln. */
  dot(cls = ''): HTMLDivElement {
    const d = document.createElement('div');
    d.className = `eye-dot ${cls}`.trim();
    d.innerHTML = '<span class="eye-dot-ring"></span><span class="eye-dot-core"></span>';
    return this.add(d);
  }

  static place(el: HTMLElement, p: Pt): void {
    el.style.transform = `translate(${p.x}px, ${p.y}px)`;
  }

  close(): void {
    if (this.closed) return;
    this.closed = true;
    window.removeEventListener('keydown', this.keyHandler);
    document.body.style.overflow = this.prevOverflow;
    this.el.remove();
  }
}

/** Gesichtsrahmen sowie Augen- und Iris-Punkte auf das Overlay zeichnen (Canvas hat die Größe des Kamerabilds). */
export function drawOverlay(canvas: HTMLCanvasElement, f: FrameInfo | null): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = f?.imgSize.w || canvas.width;
  const h = f?.imgSize.h || canvas.height;
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  ctx.clearRect(0, 0, w, h);
  if (!f?.metrics) return;
  const b = f.metrics.faceBox;
  ctx.lineWidth = Math.max(2, w / 200);
  ctx.strokeStyle = '#79ac2b';
  ctx.strokeRect(b.x0 * w, b.y0 * h, (b.x1 - b.x0) * w, (b.y1 - b.y0) * h);
  const lm = f.landmarks;
  if (!lm) return;
  const r = Math.max(2, w / 160);
  const dot = (i: number, color: string, rad = r) => {
    const p = lm[i];
    if (!p) return;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x * w, p.y * h, rad, 0, Math.PI * 2);
    ctx.fill();
  };
  for (const e of [LM.eyeA, LM.eyeB]) {
    for (const i of [e.left, e.right, e.upper, e.lower]) dot(i, '#ffffff', r * 0.8);
    for (const i of e.ring) dot(i, '#4fc3f7', r * 0.7);
    dot(e.iris, '#ffb300', r * 1.3);
  }
}
