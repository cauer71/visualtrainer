/**
 * Prozedurale Strichzeichnungen von Hand, Fuß und Unterarm mit Hand – ohne Bilddateien.
 *
 * Aufbau: Jede Zeichnung ist zuerst ein reines Datenmodell (`FigureModel`: Körperformen, Detaillinien,
 * Nägel, Daumen-/Großzehenspitze, Blickrichtung der Finger), das ohne Canvas prüfbar ist. `drawFigure`
 * zeichnet das Modell in eigenen Koordinaten (Finger/Zehen nach oben, y nach unten) und dreht dann mit
 * `ctx.rotate` – so bleibt die Zeichnung in jeder Drehung gleich sauber, und die Drehung kann die
 * Händigkeit nie ändern (Drehung ≠ Spiegelung).
 *
 * Chiralität (verbindlich, Bildkoordinaten x nach rechts, Finger/Zehen oben, 0°):
 *  - Hand, Handfläche zugewandt:  Daumen rechts im Bild = RECHTE Hand, Daumen links = linke Hand
 *  - Hand, Handrücken zugewandt:  Daumen links im Bild  = RECHTE Hand, Daumen rechts = linke Hand
 *  - Fuß, von oben (Fußrücken):   große Zehe links = RECHTER Fuß, rechts = linker Fuß
 *  - Fuß, Sohle zugewandt:        große Zehe rechts = RECHTER Fuß, links = linker Fuß
 *  - Unterarm mit Hand: die Hand hängt mit den Fingern nach unten (Ellbogen oben), ist aber dieselbe
 *    Hand, nur um 180° gedreht; der Unterarm selbst trägt keine Seiteninformation.
 * Drehungs-unabhängige Fassung (so urteilt man bei jedem Winkel): Blickt man entlang der Finger/Zehen
 * (Richtung `dir`), liegt der Daumen / die große Zehe bei „Fläche zugewandt“ (volar) für die rechte Seite
 * RECHTS von dieser Blickrichtung, bei „Rücken zugewandt“ (dorsal) LINKS davon (siehe `thumbIsRightOfDir`).
 *
 * Wichtig für die Erkennbarkeit: Daumen/große Zehe sind deutlich dicker und abgesetzt; Handfläche zeigt
 * Beugefalten und Fingergelenklinien, Handrücken Fingernägel, Knöchel und Sehnenlinien; Fußsohle zeigt Ballen,
 * Gewölbe und Fersenpolster, Fußrücken Zehennägel, Sehnen und eine Knöchelfalte.
 */
import type { Part, Side, View } from './logic';

type G = CanvasRenderingContext2D;

export interface Pt {
  x: number;
  y: number;
}

/** Körperform: verjüngte Kapsel (Finger, Zehen, Unterarm) oder abgerundetes Vieleck (Handfläche, Fußballen) */
export type BodyShape = { k: 'cap'; a: Pt; ra: number; b: Pt; rb: number } | { k: 'poly'; pts: Pt[]; r: number };

export interface DetailLine {
  pts: Pt[];
  closed?: boolean;
  /** relative Strichstärke (1 = Standard) */
  w?: number;
}

export interface Nail {
  pts: Pt[];
  r: number;
}

export interface FigureModel {
  part: Part;
  view: View;
  side: Side;
  body: BodyShape[];
  lines: DetailLine[];
  nails: Nail[];
  /** Spitze von Daumen bzw. großer Zehe */
  marker: Pt;
  /** Wurzel von Daumen bzw. großer Zehe */
  markerBase: Pt;
  /** Einheitsvektor Handgelenk → Fingerspitzen (Fuß: Ferse → Zehen) */
  dir: Pt;
  /** Mitte von Handfläche bzw. Fuß */
  center: Pt;
  /** Radius des Kreises um den Ursprung, der alle Körperformen enthält */
  radius: number;
}

export interface FigureStyle {
  ink: string;
  fill: string;
  nailFill: string;
}

export const FIGURE_STYLE: FigureStyle = { ink: '#1B2A41', fill: '#FBFCFE', nailFill: '#E6ECF4' };

const P = (x: number, y: number): Pt => ({ x, y });

// ---------------------------------------------------------------------------
// Hilfen für Modelle (rein)

type Raw = Omit<FigureModel, 'part' | 'view' | 'side' | 'radius'>;

const mapPt = (p: Pt, f: (q: Pt) => Pt): Pt => f(p);
const unit = (v: Pt): Pt => {
  const L = Math.hypot(v.x, v.y) || 1;
  return P(v.x / L, v.y / L);
};

function mapRaw(raw: Raw, f: (p: Pt) => Pt, k: number): Raw {
  return {
    body: raw.body.map((s) => (s.k === 'cap' ? { k: 'cap', a: f(s.a), ra: s.ra * k, b: f(s.b), rb: s.rb * k } : { k: 'poly', pts: s.pts.map(f), r: s.r * k })),
    lines: raw.lines.map((l) => ({ ...l, pts: l.pts.map(f) })),
    nails: raw.nails.map((n) => ({ pts: n.pts.map(f), r: n.r * k })),
    marker: mapPt(raw.marker, f),
    markerBase: mapPt(raw.markerBase, f),
    dir: unit(P(f(P(raw.dir.x, raw.dir.y)).x - f(P(0, 0)).x, f(P(raw.dir.x, raw.dir.y)).y - f(P(0, 0)).y)),
    center: f(raw.center),
  };
}

const mirrorRaw = (raw: Raw): Raw => mapRaw(raw, (p) => P(-p.x, p.y), 1);

/** Achsparallele Hülle der Körperformen */
function bounds(body: readonly BodyShape[]): { x0: number; x1: number; y0: number; y1: number } {
  let x0 = Infinity;
  let x1 = -Infinity;
  let y0 = Infinity;
  let y1 = -Infinity;
  const add = (p: Pt, r: number) => {
    x0 = Math.min(x0, p.x - r);
    x1 = Math.max(x1, p.x + r);
    y0 = Math.min(y0, p.y - r);
    y1 = Math.max(y1, p.y + r);
  };
  for (const s of body) {
    if (s.k === 'cap') {
      add(s.a, s.ra);
      add(s.b, s.rb);
    } else for (const p of s.pts) add(p, 0);
  }
  return { x0, x1, y0, y1 };
}

/** Mittelpunkt der Hülle in den Ursprung legen (Drehung um die Mitte hält die Zeichnung im Kreis) und Radius berechnen */
function finish(part: Part, view: View, side: Side, raw: Raw): FigureModel {
  const b = bounds(raw.body);
  const cx = (b.x0 + b.x1) / 2;
  const cy = (b.y0 + b.y1) / 2;
  const centered = mapRaw(raw, (p) => P(p.x - cx, p.y - cy), 1);
  let radius = 0;
  for (const s of centered.body) {
    if (s.k === 'cap') radius = Math.max(radius, Math.hypot(s.a.x, s.a.y) + s.ra, Math.hypot(s.b.x, s.b.y) + s.rb);
    else for (const p of s.pts) radius = Math.max(radius, Math.hypot(p.x, p.y));
  }
  return { part, view, side, ...centered, radius };
}

/** Punkt entlang einer Kapselachse (t = 0 bei a, 1 bei b) und der zugehörige Radius */
function along(a: Pt, ra: number, b: Pt, rb: number, t: number): { p: Pt; r: number } {
  return { p: P(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t), r: ra + (rb - ra) * t };
}

/** Querstrich über einer Kapsel bei Anteil t, Halbbreite = f · Radius */
function crossLine(a: Pt, ra: number, b: Pt, rb: number, t: number, f: number): DetailLine {
  const { p, r } = along(a, ra, b, rb, t);
  const L = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const px = -(b.y - a.y) / L;
  const py = (b.x - a.x) / L;
  return { pts: [P(p.x - px * r * f, p.y - py * r * f), P(p.x + px * r * f, p.y + py * r * f)], w: 0.85 };
}

/** Nagel nahe der Spitze einer Kapsel (Viereck, später abgerundet gezeichnet) */
function nailOn(a: Pt, _ra: number, b: Pt, rb: number, width = 0.62, length = 1.35): Nail {
  const L = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const ux = (b.x - a.x) / L;
  const uy = (b.y - a.y) / L;
  const px = -uy;
  const py = ux;
  // Nagelmitte: etwas hinter der Spitzenmitte, damit der freie Rand knapp vor dem Umriss endet
  const back = rb * 0.12;
  const cx = b.x - ux * back;
  const cy = b.y - uy * back;
  const hl = rb * length * 0.5;
  const hw = rb * width;
  return {
    pts: [
      P(cx - ux * hl - px * hw, cy - uy * hl - py * hw),
      P(cx + ux * hl - px * hw * 0.92, cy + uy * hl - py * hw * 0.92),
      P(cx + ux * hl + px * hw * 0.92, cy + uy * hl + py * hw * 0.92),
      P(cx - ux * hl + px * hw, cy - uy * hl + py * hw),
    ],
    r: rb * 0.38,
  };
}

// ---------------------------------------------------------------------------
// Hand (Basis: Daumen rechts im Bild, Finger oben)

interface FingerDef {
  bx: number;
  by: number;
  ang: number;
  len: number;
  r0: number;
  r1: number;
}

const FINGERS: readonly FingerDef[] = [
  { bx: -21, by: -9, ang: -11, len: 29, r0: 5.7, r1: 4.8 }, // kleiner Finger
  { bx: -7, by: -12, ang: -4, len: 41, r0: 6.2, r1: 5.1 }, // Ringfinger
  { bx: 7.5, by: -13, ang: 3, len: 45, r0: 6.5, r1: 5.3 }, // Mittelfinger
  { bx: 21, by: -10, ang: 10, len: 38, r0: 6.3, r1: 5.2 }, // Zeigefinger
];

const fingerTip = (f: FingerDef): Pt => P(f.bx + Math.sin((f.ang * Math.PI) / 180) * f.len, f.by - Math.cos((f.ang * Math.PI) / 180) * f.len);

/** Hand mit Daumen rechts (Fläche zugewandt: rechte Hand; Rücken zugewandt: linke Hand). `stub` = kurzes Handgelenk. */
function handBasis(view: View, stub: boolean): Raw {
  const body: BodyShape[] = [];
  const lines: DetailLine[] = [];
  const nails: Nail[] = [];
  body.push({ k: 'poly', pts: [P(-28, -8), P(28, -8), P(27, 24), P(19, 52), P(-19, 52), P(-27, 24)], r: 12 });
  if (stub) body.push({ k: 'poly', pts: [P(-18, 46), P(18, 46), P(17, 68), P(-17, 68)], r: 8 });
  const tips = FINGERS.map(fingerTip);
  FINGERS.forEach((f, i) => body.push({ k: 'cap', a: P(f.bx, f.by), ra: f.r0, b: tips[i], rb: f.r1 }));
  // Daumen: deutlich dicker, schräg abgesetzt
  const thumbA = P(20, 32);
  const thumbB = P(53, 0);
  const thumbRa = 9.4;
  const thumbRb = 6.9;
  body.push({ k: 'cap', a: thumbA, ra: thumbRa, b: thumbB, rb: thumbRb });

  if (view === 'volar') {
    // Handfläche: Herzlinie, Kopflinie, Lebenslinie um den Daumenballen, Fingergelenkfalten
    lines.push({ pts: [P(-26, 4), P(-12, -1), P(6, 1), P(18, 9)] });
    lines.push({ pts: [P(24, 13), P(8, 17), P(-9, 22), P(-25, 29)] });
    lines.push({ pts: [P(22, 12), P(8, 21), P(3, 35), P(9, 50)] });
    FINGERS.forEach((f, i) => {
      const a = P(f.bx, f.by);
      lines.push(crossLine(a, f.r0, tips[i], f.r1, 0.34, 0.62));
      lines.push(crossLine(a, f.r0, tips[i], f.r1, 0.66, 0.6));
    });
    lines.push(crossLine(thumbA, thumbRa, thumbB, thumbRb, 0.55, 0.62));
    lines.push({ pts: [P(-14, 47), P(0, 50), P(14, 47)], w: 0.8 });
  } else {
    // Handrücken: Fingernägel (auch am Daumen), Knöchel, Sehnenlinien
    FINGERS.forEach((f, i) => {
      nails.push(nailOn(P(f.bx, f.by), f.r0, tips[i], f.r1));
      lines.push({ pts: [P(f.bx - f.r0 * 0.85, f.by + 3.5), P(f.bx, f.by + 0.4), P(f.bx + f.r0 * 0.85, f.by + 3.5)], w: 0.9 });
    });
    nails.push(nailOn(thumbA, thumbRa, thumbB, thumbRb, 0.6, 1.3));
    [-18, -6, 6, 18].forEach((x) => lines.push({ pts: [P(x, 4), P(x * 0.72, 24), P(x * 0.42, 46)], w: 0.8 }));
    lines.push({ pts: [P(26, 24), P(20, 30), P(14, 40)], w: 0.7 });
  }
  return {
    body,
    lines,
    nails,
    marker: thumbB,
    markerBase: thumbA,
    dir: P(0, -1),
    center: P(0, 20),
  };
}

// ---------------------------------------------------------------------------
// Fuß (Basis: große Zehe rechts im Bild, Zehen oben)

interface ToeDef {
  a: Pt;
  ra: number;
  b: Pt;
  rb: number;
}

/** Zehen von der großen Zehe (rechts) bis zum kleinen Zeh (links): kleine Lücken, damit Trennlinien sichtbar bleiben */
const TOES: readonly ToeDef[] = [
  { a: P(15, -12), ra: 10.5, b: P(16, -33), rb: 9.6 }, // große Zehe
  { a: P(0.3, -13), ra: 5.6, b: P(0.1, -31), rb: 5.0 },
  { a: P(-10, -11), ra: 5.1, b: P(-10.7, -27), rb: 4.5 },
  { a: P(-19.6, -8), ra: 4.5, b: P(-20.5, -22), rb: 4.0 },
  { a: P(-28, -3), ra: 4.0, b: P(-29.4, -17), rb: 3.6 },
];

/** Fuß mit großer Zehe rechts (Sohle zugewandt: rechter Fuß; Fußrücken zugewandt: linker Fuß) */
function footBasis(view: View): Raw {
  const body: BodyShape[] = [];
  const lines: DetailLine[] = [];
  const nails: Nail[] = [];
  body.push({
    k: 'poly',
    pts: [P(-31, -9), P(25, -16), P(28, 0), P(23, 14), P(17, 26), P(16, 38), P(11, 50), P(0, 57), P(-12, 53), P(-18, 41), P(-23, 22), P(-31, 3)],
    r: 9,
  });
  for (const t of TOES) body.push({ k: 'cap', a: t.a, ra: t.ra, b: t.b, rb: t.rb });
  const hallux = TOES[0];

  if (view === 'volar') {
    // Fußsohle: Ballenlinie, Fußgewölbe (innen), Fersenpolster
    lines.push({ pts: [P(-27, -3), P(-10, -8), P(10, -9), P(26, -2)] });
    lines.push({ pts: [P(23, 10), P(7, 19), P(3, 31), P(12, 41)] });
    lines.push({ pts: [P(-13, 43), P(-3, 37), P(5, 38)], w: 0.9 });
    // kleine Polster unter den Zehen
    TOES.forEach((t) => {
      const c = P(t.a.x, t.a.y - t.ra * 0.1);
      lines.push({ pts: [P(c.x - t.ra * 0.55, c.y + 0.8), P(c.x, c.y + 2.4), P(c.x + t.ra * 0.55, c.y + 0.8)], w: 0.7 });
    });
  } else {
    // Fußrücken: Zehennägel, Sehnenlinien, Knöchelfalte, Unterschenkel
    body.push({ k: 'poly', pts: [P(-15, 40), P(15, 40), P(13, 78), P(-13, 78)], r: 7 });
    TOES.forEach((t, i) => nails.push(nailOn(t.a, t.ra, t.b, t.rb, i === 0 ? 0.68 : 0.62, i === 0 ? 1.15 : 1.25)));
    lines.push({ pts: [P(14, -8), P(11, 12), P(5, 40)], w: 0.8 });
    lines.push({ pts: [P(0, -9), P(0, 12), P(0, 40)], w: 0.8 });
    lines.push({ pts: [P(-10, -7), P(-7, 12), P(-5, 40)], w: 0.8 });
    lines.push({ pts: [P(-19, -3), P(-14, 14), P(-9, 38)], w: 0.8 });
    lines.push({ pts: [P(-13, 46), P(0, 50), P(13, 46)], w: 0.9 });
  }
  return {
    body,
    lines,
    nails,
    marker: hallux.b,
    markerBase: hallux.a,
    dir: P(0, -1),
    center: P(0, 8),
  };
}

// ---------------------------------------------------------------------------
// Unterarm mit Hand (Ellbogen oben, Hand unten)

/** Hand (schon mit richtiger Seite) kopfüber an einen Unterarm hängen – nur Drehung um 180°, daher keine Spiegelung */
function forearmFrom(hand: Raw, view: View): Raw {
  const k = 0.8;
  const T = P(0, 62);
  const rot180 = (p: Pt): Pt => P(T.x - p.x * k, T.y - p.y * k);
  const h = mapRaw(hand, rot180, k);
  const body: BodyShape[] = [{ k: 'cap', a: P(0, -56), ra: 15, b: P(0, 21), rb: 11.5 }, ...h.body];
  const lines: DetailLine[] = [...h.lines];
  if (view === 'volar') {
    // Innenseite: Ellenbeuge
    lines.push({ pts: [P(-9.5, -44), P(0, -40.5), P(9.5, -44)], w: 0.9 });
  } else {
    // Außenseite: Ellbogenspitze
    lines.push({ pts: [P(-10, -49), P(-6, -57), P(0, -60), P(6, -57), P(10, -49)], w: 0.9 });
  }
  return { ...h, body, lines };
}

// ---------------------------------------------------------------------------
// Öffentlich: Modell bauen (mit Zwischenspeicher)

/**
 * Steht der Daumen (bzw. die große Zehe) im Grundzustand „Finger/Zehen oben“ rechts im Bild?
 * Hand und Fuß: Fläche zugewandt (volar) → rechte Seite = rechts; Rücken zugewandt (dorsal) → rechte Seite = links.
 * Unterarm mit Hand: hängt kopfüber → Daumen auf der entgegengesetzten Bildseite wie bei der Hand.
 */
export function markerRightInBase(part: Part, view: View, side: Side): boolean {
  const handFrameRight = (view === 'volar') === (side === 'right');
  return part === 'forearm' ? !handFrameRight : handFrameRight;
}

const cache = new Map<string, FigureModel>();

export function buildFigure(part: Part, view: View, side: Side): FigureModel {
  const key = `${part}|${view}|${side}`;
  const hit = cache.get(key);
  if (hit) return hit;
  // Seite der Hand im „Finger-oben“-System: Daumen rechts ↔ (volar und rechte Hand) oder (dorsal und linke Hand)
  const thumbRightInHandFrame = (view === 'volar') === (side === 'right');
  let raw: Raw;
  if (part === 'hand' || part === 'forearm') {
    const basis = handBasis(view, part === 'hand');
    const hand = thumbRightInHandFrame ? basis : mirrorRaw(basis);
    raw = part === 'hand' ? hand : forearmFrom(hand, view);
  } else {
    const basis = footBasis(view);
    raw = thumbRightInHandFrame ? basis : mirrorRaw(basis);
  }
  const model = finish(part, view, side, raw);
  cache.set(key, model);
  return model;
}

/**
 * Drehungs-unabhängige Lesart: Liegt der Daumen / die große Zehe (von der Mitte der Hand / des Fußes aus
 * gesehen) rechts von der Blickrichtung entlang der Finger / Zehen? (Kreuzprodukt in Bildkoordinaten, y nach
 * unten.) Gilt bei jedem Drehwinkel gleich.
 */
export function thumbIsRightOfDir(dir: Pt, center: Pt, marker: Pt): boolean {
  const tx = marker.x - center.x;
  const ty = marker.y - center.y;
  // In Bildkoordinaten (y nach unten) ist „rechts von der Blickrichtung“ das positive Kreuzprodukt dir × t
  return dir.x * ty - dir.y * tx > 0;
}

/** Punkt (x, y) um den Ursprung um `deg` Grad drehen – wie ctx.rotate (Uhrzeigersinn auf dem Bildschirm) */
export function rotatePoint(p: Pt, deg: number): Pt {
  const a = (deg * Math.PI) / 180;
  return P(p.x * Math.cos(a) - p.y * Math.sin(a), p.x * Math.sin(a) + p.y * Math.cos(a));
}

// ---------------------------------------------------------------------------
// Zeichnen

function capsulePath(g: G, s: { a: Pt; ra: number; b: Pt; rb: number }): void {
  const dx = s.b.x - s.a.x;
  const dy = s.b.y - s.a.y;
  const L = Math.hypot(dx, dy);
  g.beginPath();
  if (L <= Math.abs(s.ra - s.rb) + 1e-6) {
    const big = s.ra >= s.rb ? { p: s.a, r: s.ra } : { p: s.b, r: s.rb };
    g.arc(big.p.x, big.p.y, big.r, 0, Math.PI * 2);
    return;
  }
  const th = Math.atan2(dy, dx);
  const al = Math.acos((s.ra - s.rb) / L);
  g.arc(s.a.x, s.a.y, s.ra, th + al, th - al + Math.PI * 2, false);
  g.arc(s.b.x, s.b.y, s.rb, th - al, th + al, false);
  g.closePath();
}

function roundedPolyPath(g: G, pts: readonly Pt[], r: number): void {
  const n = pts.length;
  const mid = (a: Pt, b: Pt): Pt => P((a.x + b.x) / 2, (a.y + b.y) / 2);
  g.beginPath();
  const m0 = mid(pts[n - 1], pts[0]);
  g.moveTo(m0.x, m0.y);
  for (let i = 0; i < n; i++) {
    const m = mid(pts[i], pts[(i + 1) % n]);
    g.arcTo(pts[i].x, pts[i].y, m.x, m.y, r);
  }
  g.closePath();
}

function linePath(g: G, l: DetailLine): void {
  const pts = l.pts;
  const n = pts.length;
  const mid = (a: Pt, b: Pt): Pt => P((a.x + b.x) / 2, (a.y + b.y) / 2);
  g.beginPath();
  if (l.closed && n >= 3) {
    const m0 = mid(pts[n - 1], pts[0]);
    g.moveTo(m0.x, m0.y);
    for (let i = 0; i < n; i++) {
      const m = mid(pts[i], pts[(i + 1) % n]);
      g.quadraticCurveTo(pts[i].x, pts[i].y, m.x, m.y);
    }
    g.closePath();
    return;
  }
  g.moveTo(pts[0].x, pts[0].y);
  if (n === 2) g.lineTo(pts[1].x, pts[1].y);
  else if (n === 3) g.quadraticCurveTo(pts[1].x, pts[1].y, pts[2].x, pts[2].y);
  else {
    for (let i = 1; i < n - 1; i++) {
      const m = mid(pts[i], pts[i + 1]);
      g.quadraticCurveTo(pts[i].x, pts[i].y, i === n - 2 ? pts[n - 1].x : m.x, i === n - 2 ? pts[n - 1].y : m.y);
    }
  }
}

function bodyPath(g: G, s: BodyShape): void {
  if (s.k === 'cap') capsulePath(g, s);
  else roundedPolyPath(g, s.pts, s.r);
}

/**
 * Zeichnet die Figur mit Mittelpunkt (cx, cy). `size` = Radius des Kreises (px), in den die Figur passt;
 * `angleDeg` dreht im Uhrzeigersinn. Die Körperformen werden als Vereinigung gezeichnet (erst alle
 * Konturen dick, dann alle Füllungen), damit nur der Außenumriss und die engen Fingerlücken als Linie bleiben.
 */
export function drawFigure(g: G, fig: FigureModel, cx: number, cy: number, size: number, angleDeg: number, style: FigureStyle = FIGURE_STYLE): void {
  const s = size / fig.radius;
  const outline = Math.min(6, Math.max(2.4, size * 0.024)) / s;
  g.save();
  g.translate(cx, cy);
  g.rotate((angleDeg * Math.PI) / 180);
  g.scale(s, s);
  g.lineJoin = 'round';
  g.lineCap = 'round';
  g.strokeStyle = style.ink;
  g.lineWidth = outline * 2;
  for (const sh of fig.body) {
    bodyPath(g, sh);
    g.stroke();
  }
  g.fillStyle = style.fill;
  for (const sh of fig.body) {
    bodyPath(g, sh);
    g.fill();
  }
  // Detaillinien (dünner als der Umriss)
  g.strokeStyle = style.ink;
  for (const l of fig.lines) {
    g.lineWidth = outline * 0.62 * (l.w ?? 1);
    linePath(g, l);
    g.stroke();
  }
  // Nägel
  g.lineWidth = outline * 0.55;
  g.fillStyle = style.nailFill;
  for (const n of fig.nails) {
    roundedPolyPath(g, n.pts, n.r);
    g.fill();
    g.stroke();
  }
  g.restore();
}
