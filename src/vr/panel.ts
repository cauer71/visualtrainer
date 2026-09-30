/**
 * Bedienfläche im Raum: eine Fläche mit Text und Knöpfen, die auf eine
 * Canvas-Textur gezeichnet wird. Treffer werden über die UV-Koordinate geprüft –
 * dieselbe Logik gilt für Controller-Strahl und Mausklick.
 */
import * as THREE from 'three';

export interface PanelButton {
  id: string;
  label: string;
  primary?: boolean;
}

export interface PanelSpec {
  title?: string;
  lines?: string[];
  buttons?: PanelButton[];
  /** kleinere Schrift (Anzeige-Streifen) */
  compact?: boolean;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
}

const C = {
  bg: 'rgba(11,20,36,0.92)',
  edge: 'rgba(255,255,255,0.22)',
  text: '#f3f6fb',
  dim: '#b9c6d8',
  btn: '#22324d',
  btnHover: '#2f4770',
  primary: '#5a7f20',
  primaryHover: '#6d9a27',
};

export class Panel {
  readonly mesh: THREE.Mesh;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly tex: THREE.CanvasTexture;
  private rects: Rect[] = [];
  private spec: PanelSpec = {};
  private hover: string | null = null;

  /** widthM × heightM: Größe in Metern; px: Auflösung der Breite */
  constructor(readonly widthM: number, readonly heightM: number, px = 1024) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = px;
    this.canvas.height = Math.round((px * heightM) / widthM);
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('2D-Canvas nicht verfügbar');
    this.ctx = ctx;
    this.tex = new THREE.CanvasTexture(this.canvas);
    this.tex.colorSpace = THREE.SRGBColorSpace;
    this.tex.anisotropy = 4;
    const mat = new THREE.MeshBasicMaterial({ map: this.tex, transparent: true, toneMapped: false });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(widthM, heightM), mat);
  }

  set(spec: PanelSpec): void {
    this.spec = spec;
    this.draw();
  }

  get visible(): boolean {
    return this.mesh.visible;
  }

  set visible(v: boolean) {
    this.mesh.visible = v;
  }

  /** Knopf unter UV-Koordinate (0..1, Ursprung unten links) oder null */
  buttonAt(uv: THREE.Vector2): string | null {
    const x = uv.x * this.canvas.width;
    const y = (1 - uv.y) * this.canvas.height;
    for (const r of this.rects) if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) return r.id;
    return null;
  }

  setHover(id: string | null): void {
    if (id === this.hover) return;
    this.hover = id;
    this.draw();
  }

  /** Mittelpunkt eines Knopfes in UV (für Tests/Fehlersuche) */
  buttonUv(id: string): THREE.Vector2 | null {
    const r = this.rects.find((q) => q.id === id);
    if (!r) return null;
    return new THREE.Vector2((r.x + r.w / 2) / this.canvas.width, 1 - (r.y + r.h / 2) / this.canvas.height);
  }

  private draw(): void {
    const { ctx, canvas } = this;
    const W = canvas.width;
    const H = canvas.height;
    const s = this.spec;
    const k = W / 1024; // Skalierung
    ctx.clearRect(0, 0, W, H);
    const r = 34 * k;
    ctx.fillStyle = C.bg;
    roundRect(ctx, 0, 0, W, H, r);
    ctx.fill();
    ctx.strokeStyle = C.edge;
    ctx.lineWidth = 3 * k;
    roundRect(ctx, 1.5 * k, 1.5 * k, W - 3 * k, H - 3 * k, r);
    ctx.stroke();

    const font = 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
    const pad = (s.compact ? 30 : 48) * k;
    let y = pad;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    if (s.title) {
      const fs = (s.compact ? 38 : 64) * k;
      ctx.fillStyle = C.text;
      ctx.font = `700 ${fs}px ${font}`;
      y += wrap(ctx, s.title, W / 2, y, W - 2 * pad, fs * 1.15);
      y += 14 * k;
    }
    if (s.lines) {
      const fs = (s.compact ? 40 : 44) * k;
      ctx.fillStyle = C.dim;
      ctx.font = `500 ${fs}px ${font}`;
      for (const line of s.lines) y += wrap(ctx, line, W / 2, y, W - 2 * pad, fs * 1.28) + 8 * k;
    }
    this.rects = [];
    const bs = s.buttons ?? [];
    if (bs.length) {
      const bh = 96 * k;
      const gap = 24 * k;
      const cols = bs.length <= 2 ? bs.length : 2;
      const rows = Math.ceil(bs.length / cols);
      const bw = (W - 2 * pad - gap * (cols - 1)) / cols;
      const top = H - pad - rows * bh - (rows - 1) * gap;
      bs.forEach((b, i) => {
        const cx = i % cols;
        const cy = Math.floor(i / cols);
        // letzte Zeile mit einzelnem Knopf zentrieren
        const inRow = cy === rows - 1 ? bs.length - cy * cols : cols;
        const rowW = inRow * bw + (inRow - 1) * gap;
        const x0 = (W - rowW) / 2 + cx * (bw + gap);
        const rect: Rect = { x: x0, y: top + cy * (bh + gap), w: bw, h: bh, id: b.id };
        this.rects.push(rect);
        const hov = this.hover === b.id;
        ctx.fillStyle = b.primary ? (hov ? C.primaryHover : C.primary) : hov ? C.btnHover : C.btn;
        roundRect(ctx, rect.x, rect.y, rect.w, rect.h, 26 * k);
        ctx.fill();
        if (hov) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 5 * k;
          roundRect(ctx, rect.x, rect.y, rect.w, rect.h, 26 * k);
          ctx.stroke();
        }
        ctx.fillStyle = '#ffffff';
        ctx.font = `700 ${42 * k}px ${font}`;
        ctx.textBaseline = 'middle';
        ctx.fillText(b.label, rect.x + rect.w / 2, rect.y + rect.h / 2 + 2 * k, rect.w - 24 * k);
        ctx.textBaseline = 'top';
      });
    }
    this.tex.needsUpdate = true;
  }

  dispose(): void {
    this.tex.dispose();
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.Material).dispose();
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Zeichnet Text mit Zeilenumbruch, gibt die belegte Höhe zurück. */
function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number): number {
  const words = text.split(' ');
  let line = '';
  let yy = y;
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (ctx.measureText(t).width > maxW && line) {
      ctx.fillText(line, x, yy);
      line = w;
      yy += lh;
    } else line = t;
  }
  if (line) {
    ctx.fillText(line, x, yy);
    yy += lh;
  }
  return yy - y;
}
