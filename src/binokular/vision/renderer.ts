/**
 * Canvas-2D-Renderer der dichoptischen Darstellung.
 *
 * Er bekommt eine Szene (Felder + GameObjects mit eyeVisibility/contrast) und die Seh-Einstellungen und entscheidet
 * allein, welche Farbe gezeichnet wird (`resolveColor`). Reihenfolge:
 *  1. schwarzer Hintergrund,
 *  2. neutrale Ebene (BOTH): Fels, Erde, Leitern, Lampen – normal deckend,
 *  3. Augen-Ebenen (AMBLYOPIC, FELLOW) – ADDITIV (`lighter`), damit z. B. ein Kristall über grauer Erde für das
 *     andere Auge unsichtbar bleibt (das Grau ändert sich in dessen Kanal nicht).
 * Formen sind flach; Details entstehen nur über Helligkeitsstufen derselben Farbe, nie über Schwarz.
 *
 * Debug-Ansichten (Entwicklermodus, Tasten 1–5): nur amblyopes Auge, nur dominantes Auge, Gesamtbild,
 * Anaglyphen-Simulation (was jedes Auge durch einen idealen Filter sieht, nebeneinander), Objektklassifikation.
 */
import type { GameObject, Scene } from '../game/types';
import { eyeOf, filterCss, filterOf, resolveColor, rgbCss, type Eye, type EyeVisibility, type VisionSettings } from './color';

export type DebugView = 'BINOCULAR' | 'AMBLYOPIC_ONLY' | 'FELLOW_ONLY' | 'ANAGLYPH_SIM' | 'CLASSES';
/** Tasten 1–5 → Ansicht */
export const DEBUG_KEYS: Record<string, DebugView> = { '1': 'AMBLYOPIC_ONLY', '2': 'FELLOW_ONLY', '3': 'BINOCULAR', '4': 'ANAGLYPH_SIM', '5': 'CLASSES' };

export interface Layout {
  /** Feldgröße in CSS-Pixeln */
  cell: number;
  ox: number;
  oy: number;
  width: number;
  height: number;
  /** Kamera aktiv: Das Raster ist größer als die Fläche (nur ein Ausschnitt sichtbar) */
  scrollX: boolean;
  scrollY: boolean;
}

/** kleinste Feldgröße (= Trefferfläche) in CSS-Pixeln; darunter zeigt die Kamera nur einen Ausschnitt */
export const MIN_CELL = 48;

/**
 * Feldgröße und Versatz. Passt das ganze Raster mit Feldern ≥ `MIN_CELL` in die Fläche, wird es zentriert
 * (wie bisher). Sonst bleibt die Feldgröße bei `MIN_CELL` und die Kamera zeigt einen Ausschnitt um `center`
 * (in Feldern), an den Rändern des Rasters begrenzt – Trefferflächen bleiben so immer mindestens 48 px groß.
 */
export function fitLayout(cols: number, rows: number, width: number, height: number, center?: { x: number; y: number }): Layout {
  const fit = Math.floor(Math.min(width / cols, height / rows));
  const cell = Math.max(8, fit >= MIN_CELL ? fit : Math.min(MIN_CELL, Math.floor(Math.min(width, height) / 2)));
  const axis = (n: number, size: number, c: number | undefined): { o: number; scroll: boolean } => {
    const total = n * cell;
    if (total <= size) return { o: Math.floor((size - total) / 2), scroll: false };
    const want = Math.round(size / 2 - ((c ?? (n - 1) / 2) + 0.5) * cell);
    return { o: Math.min(0, Math.max(size - total, want)), scroll: true };
  };
  const ax = axis(cols, width, center?.x);
  const ay = axis(rows, height, center?.y);
  return { cell, ox: ax.o, oy: ay.o, width, height, scrollX: ax.scroll, scrollY: ay.scroll };
}

/** sichtbarer Ausschnitt in Feldern (für die Kamera) */
export function visibleCells(l: Layout): { x0: number; y0: number; x1: number; y1: number } {
  return { x0: -l.ox / l.cell, y0: -l.oy / l.cell, x1: (l.width - l.ox) / l.cell, y1: (l.height - l.oy) / l.cell };
}

/** Bildschirmpunkt → Feld (oder null außerhalb) */
export function cellAt(l: Layout, cols: number, rows: number, px: number, py: number): { x: number; y: number } | null {
  const x = Math.floor((px - l.ox) / l.cell);
  const y = Math.floor((py - l.oy) / l.cell);
  return x >= 0 && y >= 0 && x < cols && y < rows ? { x, y } : null;
}

type Ctx = CanvasRenderingContext2D;

function visibleIn(view: DebugView, v: EyeVisibility): boolean {
  if (view === 'AMBLYOPIC_ONLY') return v !== 'FELLOW';
  if (view === 'FELLOW_ONLY') return v !== 'AMBLYOPIC';
  return true;
}

export interface RenderOptions {
  view: DebugView;
  /** Zusatzobjekte über der Szene (z. B. Symbol der Suppressions-Kontrolle) */
  overlay?: GameObject[];
}

/** Zeichnet die Szene (ohne Anaglyphen-Simulation – die setzt `renderAnaglyphSim` darauf auf) */
export function renderScene(g: Ctx, scene: Scene, vis: VisionSettings, l: Layout, opts: RenderOptions): void {
  g.save();
  g.globalCompositeOperation = 'source-over';
  g.globalAlpha = 1;
  g.fillStyle = '#000';
  g.fillRect(0, 0, l.width, l.height);
  drawTiles(g, scene, vis, l);
  const layers = [scene.objects, opts.overlay ?? []].map((list) => list.filter((o) => visibleIn(opts.view, o.eyeVisibility)));
  for (const list of layers) {
    // neutrale Objekte deckend
    g.globalCompositeOperation = 'source-over';
    for (const o of list) if (o.eyeVisibility === 'BOTH') drawObject(g, o, vis, l);
    // Augenobjekte additiv
    g.globalCompositeOperation = 'lighter';
    for (const o of list) if (o.eyeVisibility !== 'BOTH') drawObject(g, o, vis, l);
  }
  g.globalCompositeOperation = 'source-over';
  g.globalAlpha = 1;
  if (opts.view === 'CLASSES') drawClasses(g, layers.flat(), l);
  drawEdgeHints(g, scene, vis, l);
  g.restore();
}

/** Kamera: dezente neutrale Pfeile an Rändern, hinter denen das Raster weitergeht */
function drawEdgeHints(g: Ctx, scene: Scene, vis: VisionSettings, l: Layout): void {
  if (!l.scrollX && !l.scrollY) return;
  const c = l.cell;
  g.fillStyle = grey(vis, 0.55);
  const tri = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => {
    g.beginPath();
    g.moveTo(x1, y1);
    g.lineTo(x2, y2);
    g.lineTo(x3, y3);
    g.closePath();
    g.fill();
  };
  const s = Math.max(8, c * 0.22);
  if (l.ox < -1) tri(4, l.height / 2, 4 + s, l.height / 2 - s, 4 + s, l.height / 2 + s);
  if (l.ox + scene.cols * c > l.width + 1) tri(l.width - 4, l.height / 2, l.width - 4 - s, l.height / 2 - s, l.width - 4 - s, l.height / 2 + s);
  if (l.oy < -1) tri(l.width / 2, 4, l.width / 2 - s, 4 + s, l.width / 2 + s, 4 + s);
  if (l.oy + scene.rows * c > l.height + 1) tri(l.width / 2, l.height - 4, l.width / 2 - s, l.height - 4 - s, l.width / 2 + s, l.height - 4 - s);
}

/**
 * Anaglyphen-Simulation: das fertige Bild (`src`) zweimal verkleinert nebeneinander, jeweils mit idealem Filter
 * multipliziert (Rot lässt nur R durch, Cyan G+B, Grün G). Links: linkes Auge, rechts: rechtes Auge.
 */
export function renderAnaglyphSim(g: Ctx, src: CanvasImageSource, srcW: number, srcH: number, vis: VisionSettings, l: Layout, labels: { left: string; right: string }): void {
  g.save();
  g.fillStyle = '#000';
  g.fillRect(0, 0, l.width, l.height);
  const halfW = l.width / 2;
  const scale = Math.min((halfW - 12) / srcW, (l.height - 36) / srcH);
  const w = srcW * scale;
  const h = srcH * scale;
  const eyes: Eye[] = ['LEFT', 'RIGHT'];
  eyes.forEach((eye, i) => {
    const x = i * halfW + (halfW - w) / 2;
    const y = 28 + (l.height - 28 - h) / 2;
    g.globalCompositeOperation = 'source-over';
    g.drawImage(src, x, y, w, h);
    g.globalCompositeOperation = 'multiply';
    g.fillStyle = filterCss(filterOf(eye, vis));
    g.fillRect(x, y, w, h);
    g.globalCompositeOperation = 'source-over';
    g.fillStyle = '#ddd';
    g.font = '600 14px system-ui, sans-serif';
    g.textAlign = 'center';
    g.fillText(i === 0 ? labels.left : labels.right, i * halfW + halfW / 2, 18);
  });
  g.restore();
}

// --- Felder -----------------------------------------------------------------------------------

function grey(vis: VisionSettings, k: number): string {
  return rgbCss(resolveColor('BOTH', k, vis));
}

function drawTiles(g: Ctx, scene: Scene, vis: VisionSettings, l: Layout): void {
  const c = l.cell;
  const rock = grey(vis, 0.16);
  const rockEdge = grey(vis, 0.42);
  const dirt = grey(vis, 0.3);
  const dirtDot = grey(vis, 0.5);
  for (let y = 0; y < scene.rows; y++) {
    for (let x = 0; x < scene.cols; x++) {
      const t = scene.tiles[y][x];
      const px = l.ox + x * c;
      const py = l.oy + y * c;
      if (t === 'rock') {
        g.fillStyle = rock;
        g.fillRect(px, py, c, c);
        // Kante zum Gang hin (Höhlenstruktur, neutral)
        g.fillStyle = rockEdge;
        const air = (dx: number, dy: number) => scene.tiles[y + dy]?.[x + dx] === 'air';
        const e = Math.max(2, Math.round(c * 0.05));
        if (air(0, -1)) g.fillRect(px, py, c, e);
        if (air(0, 1)) g.fillRect(px, py + c - e, c, e);
        if (air(-1, 0)) g.fillRect(px, py, e, c);
        if (air(1, 0)) g.fillRect(px + c - e, py, e, c);
      } else if (t === 'dirt') {
        g.fillStyle = dirt;
        g.fillRect(px + 1, py + 1, c - 2, c - 2);
        g.fillStyle = dirtDot;
        const r = Math.max(1.5, c * 0.04);
        for (const [fx, fy] of [[0.2, 0.25], [0.6, 0.2], [0.4, 0.55], [0.8, 0.6], [0.25, 0.8], [0.65, 0.85]]) {
          g.beginPath();
          g.arc(px + fx * c, py + fy * c, r, 0, Math.PI * 2);
          g.fill();
        }
      }
    }
  }
}

// --- Objekte ----------------------------------------------------------------------------------

function drawObject(g: Ctx, o: GameObject, vis: VisionSettings, l: Layout): void {
  const c = l.cell;
  const cx = l.ox + (o.x + 0.5) * c;
  const cy = l.oy + (o.y + 0.5) * c;
  const s = c * o.size;
  const col = (tone = 1) => rgbCss(resolveColor(o.eyeVisibility, o.contrast, vis, tone));
  g.globalAlpha = Math.max(0, Math.min(1, o.alpha));
  g.lineJoin = 'round';
  g.lineCap = 'round';
  switch (o.kind) {
    case 'ladder':
      drawLadder(g, l.ox + o.x * c, l.oy + o.y * c, c, col);
      break;
    case 'lamp':
      drawLamp(g, cx, l.oy + o.y * c, c, col);
      break;
    case 'pebble':
      g.fillStyle = col(1);
      g.beginPath();
      g.ellipse(cx + c * 0.12, cy + c * 0.1, s * 0.5, s * 0.32, 0.3, 0, Math.PI * 2);
      g.fill();
      break;
    case 'robot':
      drawRobot(g, cx, cy, s, col, o.flags?.selected === true, Number(o.flags?.label ?? 0));
      break;
    case 'key':
      drawKey(g, cx, cy, s, col, Number(o.flags?.mark ?? 0));
      break;
    case 'door':
      drawDoor(g, l.ox + o.x * c, l.oy + o.y * c, c, col, o.flags?.open === true, Number(o.flags?.mark ?? 0));
      break;
    case 'plate':
      drawPlate(g, cx, l.oy + (o.y + 1) * c, s, col, o.flags?.pressed === true);
      break;
    case 'decoy':
      drawDecoy(g, cx, cy, s, col);
      break;
    case 'rail':
      drawRail(g, l.ox + o.x * c, l.oy + (o.y + 1) * c, c, col);
      break;
    case 'switch':
      drawSwitch(g, cx, l.oy + (o.y + 1) * c, s, col, o.flags?.on === true);
      break;
    case 'platform':
      drawPlatform(g, l.ox + o.x * c, l.oy + o.y * c, c, o.w, col);
      break;
    case 'crystal':
      drawCrystal(g, cx, cy, s * (o.flags?.carried ? 1 : 0.8), col, o.flags?.buried === true);
      break;
    case 'base':
      drawBase(g, cx, l.oy + (o.y + 1) * c, s, col, Number(o.flags?.delivered ?? 0), Number(o.flags?.required ?? 0));
      break;
    case 'hazard':
      if (o.flags?.mobile) drawEmber(g, cx, cy, s, col);
      else drawHazard(g, cx, cy, s, col);
      break;
    case 'marker':
      g.strokeStyle = col(0.7);
      g.lineWidth = Math.max(2, c * 0.05);
      g.beginPath();
      g.arc(cx, l.oy + (o.y + 0.9) * c, c * 0.18, 0, Math.PI * 2);
      g.stroke();
      break;
    case 'probe':
      if (o.eyeVisibility === 'BOTH') {
        // neutraler Rahmen der Kontrollaufgabe: schwarze Fläche, graue Kante (für beide Augen gleich)
        g.fillStyle = '#000';
        g.fillRect(cx - s * 0.75, cy - s * 0.75, s * 1.5, s * 1.5);
        g.strokeStyle = col(0.5);
        g.lineWidth = Math.max(2, c * 0.04);
        g.strokeRect(cx - s * 0.75, cy - s * 0.75, s * 1.5, s * 1.5);
      } else drawProbe(g, cx, cy, s, col, String(o.flags?.shape ?? 'circle'));
      break;
  }
  g.globalAlpha = 1;
}

type Col = (tone?: number) => string;

function drawLadder(g: Ctx, x: number, y: number, c: number, col: Col): void {
  g.strokeStyle = col(0.55);
  g.lineWidth = Math.max(2, c * 0.06);
  g.beginPath();
  g.moveTo(x + c * 0.28, y);
  g.lineTo(x + c * 0.28, y + c);
  g.moveTo(x + c * 0.72, y);
  g.lineTo(x + c * 0.72, y + c);
  for (const f of [0.2, 0.5, 0.8]) {
    g.moveTo(x + c * 0.28, y + c * f);
    g.lineTo(x + c * 0.72, y + c * f);
  }
  g.stroke();
}

function drawLamp(g: Ctx, cx: number, top: number, c: number, col: Col): void {
  g.strokeStyle = col(0.5);
  g.lineWidth = Math.max(1.5, c * 0.03);
  g.beginPath();
  g.moveTo(cx, top);
  g.lineTo(cx, top + c * 0.22);
  g.stroke();
  g.fillStyle = col(0.75);
  g.beginPath();
  g.moveTo(cx - c * 0.14, top + c * 0.36);
  g.lineTo(cx - c * 0.07, top + c * 0.22);
  g.lineTo(cx + c * 0.07, top + c * 0.22);
  g.lineTo(cx + c * 0.14, top + c * 0.36);
  g.closePath();
  g.fill();
}

function drawRobot(g: Ctx, cx: number, cy: number, s: number, col: Col, selected: boolean, label: number): void {
  const w = s * 0.62;
  const h = s * 0.46;
  const bx = cx - w / 2;
  const by = cy - h * 0.25;
  // Körper (Füllung mit Aussparungen für die Augen → nur Helligkeitsstufen, kein Schwarz)
  g.fillStyle = col(0.6);
  g.beginPath();
  roundRect(g, bx, by, w, h, s * 0.08);
  for (const ex of [cx - w * 0.2, cx + w * 0.2]) {
    g.moveTo(ex + s * 0.07, by + h * 0.42);
    g.arc(ex, by + h * 0.42, s * 0.07, 0, Math.PI * 2, true);
  }
  g.fill('evenodd');
  g.strokeStyle = col(1);
  g.lineWidth = Math.max(2, s * 0.05);
  g.beginPath();
  roundRect(g, bx, by, w, h, s * 0.08);
  g.stroke();
  // Antenne
  g.beginPath();
  g.moveTo(cx, by);
  g.lineTo(cx, by - s * 0.16);
  g.stroke();
  g.fillStyle = col(1);
  g.beginPath();
  g.arc(cx, by - s * 0.2, s * 0.05, 0, Math.PI * 2);
  g.fill();
  // Ketten
  g.beginPath();
  roundRect(g, bx - s * 0.03, by + h + s * 0.03, w + s * 0.06, s * 0.13, s * 0.06);
  g.stroke();
  // Nummer bei mehreren Robotern: Punkte neben der Antenne (Roboter 2 → 2 Punkte), gleiche Farbe
  if (label >= 2) {
    g.fillStyle = col(1);
    for (let i = 0; i < Math.min(3, label); i++) {
      g.beginPath();
      g.arc(cx + s * 0.12 + i * s * 0.09, by - s * 0.08, s * 0.03, 0, Math.PI * 2);
      g.fill();
    }
  }
  if (selected) {
    g.lineWidth = Math.max(2, s * 0.04);
    g.strokeStyle = col(0.85);
    g.beginPath();
    g.ellipse(cx, cy + s * 0.02, s * 0.58, s * 0.56, 0, 0, Math.PI * 2);
    g.stroke();
  }
}

function drawKey(g: Ctx, cx: number, cy: number, s: number, col: Col, mark: number): void {
  g.strokeStyle = col(1);
  g.lineWidth = Math.max(2.5, s * 0.09);
  g.beginPath();
  g.arc(cx - s * 0.2, cy, s * 0.16, 0, Math.PI * 2);
  g.moveTo(cx - s * 0.04, cy);
  g.lineTo(cx + s * 0.34, cy);
  g.moveTo(cx + s * 0.2, cy);
  g.lineTo(cx + s * 0.2, cy + s * 0.14);
  g.moveTo(cx + s * 0.32, cy);
  g.lineTo(cx + s * 0.32, cy + s * 0.12);
  g.stroke();
  // Kennzeichen: Punkte über dem Schlüssel (1–3), passend zu den Punkten an der Tür
  drawMarkDots(g, cx - s * 0.2, cy - s * 0.3, s * 0.055, mark, col);
}

/** 1–3 kleine Punkte nebeneinander um (cx, cy) – Kennzeichen von Schlüssel und Tür (Form, keine Farbe) */
function drawMarkDots(g: Ctx, cx: number, cy: number, r: number, mark: number, col: Col): void {
  if (mark <= 0) return;
  const m = Math.min(3, mark);
  g.fillStyle = col(1);
  for (let i = 0; i < m; i++) {
    g.beginPath();
    g.arc(cx + (i - (m - 1) / 2) * r * 2.6, cy, Math.max(1.5, r), 0, Math.PI * 2);
    g.fill();
  }
}

function drawDoor(g: Ctx, x: number, y: number, c: number, col: Col, open: boolean, mark: number): void {
  const m = c * 0.1;
  g.lineWidth = Math.max(2, c * 0.05);
  if (open) {
    g.strokeStyle = col(0.45);
    g.strokeRect(x + m, y + m, c - 2 * m, c - m);
    drawMarkDots(g, x + c * 0.5, y + c * 0.27, c * 0.045, mark, () => col(0.45));
    return;
  }
  g.fillStyle = col(0.45);
  g.fillRect(x + m, y + m, c - 2 * m, c - m);
  g.strokeStyle = col(1);
  g.strokeRect(x + m, y + m, c - 2 * m, c - m);
  g.beginPath();
  for (const f of [0.38, 0.62]) {
    g.moveTo(x + c * f, y + m);
    g.lineTo(x + c * f, y + c);
  }
  g.stroke();
  // Schlüsselloch
  g.fillStyle = col(1);
  g.beginPath();
  g.arc(x + c * 0.5, y + c * 0.5, c * 0.07, 0, Math.PI * 2);
  g.fill();
  // Kennzeichen oberhalb des Schlüssellochs
  drawMarkDots(g, x + c * 0.5, y + c * 0.27, c * 0.045, mark, col);
}

/** Druckplatte: flache Platte am Boden mit Pfeil nach unten („draufstellen“); gedrückt flacher */
function drawPlate(g: Ctx, cx: number, floor: number, s: number, col: Col, pressed: boolean): void {
  const w = s * 0.7;
  const h = pressed ? s * 0.06 : s * 0.12;
  g.fillStyle = col(0.55);
  g.strokeStyle = col(1);
  g.lineWidth = Math.max(2, s * 0.05);
  g.beginPath();
  roundRect(g, cx - w / 2, floor - h - s * 0.04, w, h + s * 0.04, s * 0.03);
  g.fill();
  g.stroke();
  g.beginPath();
  g.moveTo(cx, floor - h - s * 0.42);
  g.lineTo(cx, floor - h - s * 0.14);
  g.moveTo(cx - s * 0.1, floor - h - s * 0.24);
  g.lineTo(cx, floor - h - s * 0.14);
  g.lineTo(cx + s * 0.1, floor - h - s * 0.24);
  g.stroke();
}

/** neutraler Ablenker: unregelmäßiger Erzbrocken (kristallähnlich, aber stumpf) */
function drawDecoy(g: Ctx, cx: number, cy: number, s: number, col: Col): void {
  const pts: [number, number][] = [
    [-0.28, 0.32],
    [-0.33, 0.02],
    [-0.12, -0.24],
    [0.14, -0.2],
    [0.32, 0.06],
    [0.24, 0.32],
  ];
  const by = cy + s * 0.08;
  g.fillStyle = col(0.45);
  g.strokeStyle = col(0.8);
  g.lineWidth = Math.max(1.5, s * 0.04);
  g.beginPath();
  pts.forEach(([px, py], i) => (i ? g.lineTo(cx + px * s, by + py * s) : g.moveTo(cx + px * s, by + py * s)));
  g.closePath();
  g.fill();
  g.stroke();
}

/** Bahn der wandernden Gefahr: gestrichelte Linie knapp über dem Boden */
function drawRail(g: Ctx, x: number, floor: number, c: number, col: Col): void {
  g.strokeStyle = col(1);
  g.lineWidth = Math.max(2, c * 0.04);
  g.setLineDash([c * 0.12, c * 0.1]);
  g.beginPath();
  g.moveTo(x, floor - c * 0.06);
  g.lineTo(x + c, floor - c * 0.06);
  g.stroke();
  g.setLineDash([]);
}

/** wandernde Glut: runder Glutball mit Strahlen (die Form bleibt ruhig, nur die Lage gleitet) */
function drawEmber(g: Ctx, cx: number, cy: number, s: number, col: Col): void {
  const r = s * 0.24;
  const by = cy + s * 0.1;
  g.fillStyle = col(0.6);
  g.strokeStyle = col(1);
  g.lineWidth = Math.max(2, s * 0.05);
  g.beginPath();
  g.arc(cx, by, r, 0, Math.PI * 2);
  g.fill();
  g.stroke();
  g.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    g.moveTo(cx + Math.cos(a) * r * 1.25, by + Math.sin(a) * r * 1.25);
    g.lineTo(cx + Math.cos(a) * r * 1.6, by + Math.sin(a) * r * 1.6);
  }
  g.stroke();
}

function drawSwitch(g: Ctx, cx: number, floor: number, s: number, col: Col, on: boolean): void {
  g.fillStyle = col(0.55);
  g.strokeStyle = col(1);
  g.lineWidth = Math.max(2, s * 0.05);
  g.beginPath();
  roundRect(g, cx - s * 0.3, floor - s * 0.18, s * 0.6, s * 0.18, s * 0.04);
  g.fill();
  g.stroke();
  const a = on ? Math.PI * 0.3 : -Math.PI * 0.3;
  const len = s * 0.5;
  g.lineWidth = Math.max(3, s * 0.08);
  g.beginPath();
  g.moveTo(cx, floor - s * 0.18);
  const ex = cx + Math.sin(a) * len;
  const ey = floor - s * 0.18 - Math.cos(a) * len;
  g.lineTo(ex, ey);
  g.stroke();
  g.fillStyle = col(1);
  g.beginPath();
  g.arc(ex, ey, s * 0.09, 0, Math.PI * 2);
  g.fill();
}

function drawPlatform(g: Ctx, x: number, y: number, c: number, w: number, col: Col): void {
  // flache Hebebühne: Platte mit Querstreben und Nieten (bewusst ohne Zacken – nicht mit Gefahren verwechseln)
  const h = c * 0.34;
  const x0 = x + 2;
  const x1 = x + w * c - 2;
  g.fillStyle = col(0.5);
  g.fillRect(x0, y, x1 - x0, h);
  g.strokeStyle = col(1);
  g.lineWidth = Math.max(2, c * 0.05);
  g.strokeRect(x0, y, x1 - x0, h);
  g.beginPath();
  for (let i = 1; i < w * 2; i++) {
    const sx = x + i * (c / 2);
    g.moveTo(sx, y);
    g.lineTo(sx, y + h);
  }
  g.stroke();
  g.fillStyle = col(1);
  for (let i = 0; i < w * 2; i++) {
    g.beginPath();
    g.arc(x + (i + 0.5) * (c / 2), y + h / 2, Math.max(1.5, c * 0.03), 0, Math.PI * 2);
    g.fill();
  }
}

function drawCrystal(g: Ctx, cx: number, cy: number, s: number, col: Col, buried: boolean): void {
  const pts: [number, number][] = [
    [0, -0.42],
    [0.3, -0.12],
    [0.18, 0.4],
    [-0.18, 0.4],
    [-0.3, -0.12],
  ];
  g.fillStyle = col(buried ? 0.4 : 0.7);
  g.beginPath();
  pts.forEach(([px, py], i) => (i ? g.lineTo(cx + px * s, cy + py * s) : g.moveTo(cx + px * s, cy + py * s)));
  g.closePath();
  g.fill();
  g.strokeStyle = col(buried ? 0.75 : 1);
  g.lineWidth = Math.max(2, s * 0.06);
  g.stroke();
  g.beginPath();
  g.moveTo(cx - 0.3 * s, cy - 0.12 * s);
  g.lineTo(cx + 0.3 * s, cy - 0.12 * s);
  g.moveTo(cx, cy - 0.42 * s);
  g.lineTo(cx, cy + 0.4 * s);
  g.stroke();
}

function drawBase(g: Ctx, cx: number, floor: number, s: number, col: Col, delivered: number, required: number): void {
  const w = s * 0.8;
  const h = s * 0.5;
  g.fillStyle = col(0.5);
  g.strokeStyle = col(1);
  g.lineWidth = Math.max(2, s * 0.05);
  g.beginPath();
  g.moveTo(cx - w / 2, floor);
  g.lineTo(cx - w / 2, floor - h);
  g.lineTo(cx, floor - h - s * 0.22);
  g.lineTo(cx + w / 2, floor - h);
  g.lineTo(cx + w / 2, floor);
  g.closePath();
  g.fill();
  g.stroke();
  // Fahne
  g.beginPath();
  g.moveTo(cx, floor - h - s * 0.22);
  g.lineTo(cx, floor - h - s * 0.45);
  g.lineTo(cx + s * 0.18, floor - h - s * 0.38);
  g.lineTo(cx, floor - h - s * 0.31);
  g.stroke();
  // abgelieferte Kristalle als Punkte
  const n = Math.max(required, delivered);
  for (let i = 0; i < n; i++) {
    const px = cx + (i - (n - 1) / 2) * s * 0.2;
    g.beginPath();
    g.arc(px, floor - h * 0.45, s * 0.065, 0, Math.PI * 2);
    if (i < delivered) {
      g.fillStyle = col(1);
      g.fill();
    } else {
      g.lineWidth = Math.max(1.5, s * 0.03);
      g.stroke();
    }
  }
}

function drawHazard(g: Ctx, cx: number, cy: number, s: number, col: Col): void {
  const spikes = 7;
  const r1 = s * 0.38;
  const r2 = s * 0.2;
  const by = cy + s * 0.12;
  g.fillStyle = col(0.6);
  g.beginPath();
  for (let i = 0; i <= spikes * 2; i++) {
    const a = Math.PI + (i / (spikes * 2)) * Math.PI;
    const r = i % 2 ? r1 : r2;
    const px = cx + Math.cos(a) * r;
    const py = by + Math.sin(a) * r;
    i ? g.lineTo(px, py) : g.moveTo(px, py);
  }
  g.closePath();
  g.fill();
  g.strokeStyle = col(1);
  g.lineWidth = Math.max(2, s * 0.05);
  g.stroke();
  g.beginPath();
  g.moveTo(cx - s * 0.4, by + s * 0.02);
  g.lineTo(cx + s * 0.4, by + s * 0.02);
  g.stroke();
}

/** Symbol der Suppressions-Kontrolle (Kreis, Dreieck, Quadrat, Stern) – flächig, gut erkennbar */
export function drawProbe(g: Ctx, cx: number, cy: number, s: number, col: Col, shape: string): void {
  g.fillStyle = col(1);
  g.beginPath();
  const r = s * 0.45;
  if (shape === 'circle') g.arc(cx, cy, r, 0, Math.PI * 2);
  else if (shape === 'square') g.rect(cx - r * 0.85, cy - r * 0.85, r * 1.7, r * 1.7);
  else if (shape === 'triangle') {
    g.moveTo(cx, cy - r);
    g.lineTo(cx + r * 0.95, cy + r * 0.7);
    g.lineTo(cx - r * 0.95, cy + r * 0.7);
    g.closePath();
  } else {
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 ? r * 0.45 : r;
      i ? g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) : g.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
    }
    g.closePath();
  }
  g.fill();
}

function roundRect(g: Ctx, x: number, y: number, w: number, h: number, r: number): void {
  const rr = Math.min(r, w / 2, h / 2);
  g.moveTo(x + rr, y);
  g.arcTo(x + w, y, x + w, y + h, rr);
  g.arcTo(x + w, y + h, x, y + h, rr);
  g.arcTo(x, y + h, x, y, rr);
  g.arcTo(x, y, x + w, y, rr);
  g.closePath();
}

const CLASS_LABEL: Record<EyeVisibility, string> = { AMBLYOPIC: 'A', FELLOW: 'F', BOTH: 'B' };

export interface ClassMark {
  id: string;
  /** Klasse A/F/B */
  label: string;
  /** Rahmen (Spielobjekte) oder nur kleiner Buchstabe (Leitern, Bahn, Deko-Steine, Ablenker – sonst zu unruhig) */
  frame: boolean;
}

/** Objekte, die in der Klassenansicht nur einen kleinen Buchstaben bekommen (kein Rahmen) */
const SMALL_MARK = new Set(['pebble', 'ladder', 'rail', 'decoy']);

/** Objektklassifikation: JEDES Objekt der Szene bekommt eine Klasse (geprüft in Tests für alle Level) */
export function classMarks(objs: readonly GameObject[]): ClassMark[] {
  return objs.map((o) => ({ id: o.id, label: CLASS_LABEL[o.eyeVisibility], frame: !SMALL_MARK.has(o.kind) }));
}

/** Objektklassifikation: Umrandung (durchgezogen/gestrichelt/gepunktet) und Buchstabe je Klasse, neutral weiß */
function drawClasses(g: Ctx, objs: GameObject[], l: Layout): void {
  const c = l.cell;
  const marks = classMarks(objs);
  g.save();
  g.textAlign = 'left';
  g.textBaseline = 'top';
  objs.forEach((o, i) => {
    const m = marks[i];
    const x = l.ox + o.x * c + 2;
    const y = l.oy + o.y * c + 2;
    if (!m.frame) {
      g.font = `700 ${Math.max(9, Math.round(c * 0.16))}px system-ui, sans-serif`;
      g.fillStyle = 'rgba(0,0,0,0.7)';
      g.fillRect(x + c * 0.72 - 2, y + c * 0.7 - 2, c * 0.2, c * 0.2);
      g.fillStyle = '#d0d0d0';
      g.fillText(m.label, x + c * 0.72, y + c * 0.7);
      return;
    }
    g.font = `700 ${Math.max(11, Math.round(c * 0.22))}px system-ui, sans-serif`;
    g.strokeStyle = '#ffffff';
    g.lineWidth = 2;
    g.setLineDash(o.eyeVisibility === 'AMBLYOPIC' ? [] : o.eyeVisibility === 'FELLOW' ? [6, 4] : [2, 4]);
    g.strokeRect(x, y, o.w * c - 4, c - 4);
    g.setLineDash([]);
    g.fillStyle = 'rgba(0,0,0,0.75)';
    g.fillRect(x, y, c * 0.3, c * 0.28);
    g.fillStyle = '#ffffff';
    g.fillText(m.label, x + 3, y + 2);
  });
  g.restore();
}

/** Für Tests/Debug: welches Auge (links/rechts) sieht ein Objekt dieser Klasse? */
export function eyeLabel(v: EyeVisibility, vis: VisionSettings): Eye | 'BOTH' {
  return eyeOf(v, vis) ?? 'BOTH';
}
