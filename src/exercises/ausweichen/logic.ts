/**
 * Ausweichen – reine Logik (ohne Canvas, damit testbar).
 *
 * Eine Figur wird mit dem Finger bewegt (sie sitzt über dem Finger) und weicht langsamen Hindernissen
 * (Kugeln und Quader) aus. Die Hindernisse fliegen geradlinig mit gleichmäßigem Tempo – alles ist
 * vorhersehbar. Tempo in px/s wird aus u/s gerechnet; Bewegung mit dt.
 *
 * - Kollision wird entlang der Strecke zwischen zwei Bildern geprüft (auch wenn der Finger weit springt).
 * - Die Schwierigkeit (Stufe) bestimmt Zahl und Tempo der Hindernisse.
 * - `chooseDodge` ist die einfache Vorausschau für den Intro-Film und den Autoplay.
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 20;

export interface Pt {
  x: number;
  y: number;
}

export interface Rect {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export type ObKind = 'ball' | 'box';

export interface Ob {
  kind: ObKind;
  x: number;
  y: number;
  /** px/s */
  vx: number;
  vy: number;
  /** Kugel: Radius; Quader: halbe Kantenlängen */
  r: number;
  hw: number;
  hh: number;
  /** Einblend-/Ausblendwert 0..1 (nur Darstellung) */
  alpha: number;
  /** wird gerade weich ausgeblendet (nach einer Berührung) */
  dying: boolean;
}

export const levelInt = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Wie viele Hindernisse gleichzeitig unterwegs sind: 2 (Stufe 1–3) bis 7 (ab Stufe 15) */
export function countFor(level: number): number {
  return Math.min(7, 2 + Math.floor((levelInt(level) - 1) / 3));
}

/** Tempo der Hindernisse in u pro Sekunde: 11 → ≈ 25 */
export function speedUFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return 11 * Math.pow(1.042, lv - 1);
}

/** Radius der Kugeln (und Bezugsgröße der Quader) in u: 3,4 → 4,3 */
export function sizeUFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return 3.4 + 0.05 * (lv - 1);
}

/** Anteil der Hindernisse, die auf die Stelle der Figur beim Erscheinen zielen */
export const AIMED_SHARE = 0.5;

/** Figur (sichtbar) in u und der etwas kleinere Kollisionsradius */
export const FIGURE_R_U = 2.1;
export const FIGURE_HIT = 0.85;

/** Versatz der Figur nach oben über dem Finger (px): ≈ 8 u, mindestens 50 px */
export function fingerOffsetPx(u: number): number {
  return Math.max(8 * u, 50);
}

/** Radius um die Stelle unter der Figur, in dem der Finger aufsetzen darf (px, mindestens 34) */
export function grabRadiusPx(u: number): number {
  return Math.max(34, 6 * u);
}

/** Punkte für einen Abschnitt: mit der Stufe mehr, jede Berührung kostet etwas */
export function pointsFor(level: number, touches: number): number {
  return Math.max(0, 10 + 3 * (levelInt(level) - 1) - 4 * touches);
}

/** Begrenzt die Figur auf das Feld (Mittelpunkt) */
export function clampFigure(p: Pt, f: Rect): Pt {
  return { x: clamp(p.x, f.minX, Math.max(f.minX, f.maxX)), y: clamp(p.y, f.minY, Math.max(f.minY, f.maxY)) };
}

/** Kreis um die Hindernismitte, der das ganze Hindernis sicher umschließt (für Vorausschau und Abstand) */
export function obRadius(o: Ob): number {
  return o.kind === 'ball' ? o.r : Math.hypot(o.hw, o.hh) * 0.92;
}

/** Abstand eines Punkts zur (achsenparallelen) Kante des Quaders; 0, wenn er darin liegt */
function distToBox(px: number, py: number, o: Ob): number {
  const dx = Math.max(Math.abs(px - o.x) - o.hw, 0);
  const dy = Math.max(Math.abs(py - o.y) - o.hh, 0);
  return Math.hypot(dx, dy);
}

/** Abstand eines Punkts von der Strecke ab */
function distToSegment(p: Pt, a: Pt, b: Pt): number {
  const vx = b.x - a.x;
  const vy = b.y - a.y;
  const l2 = vx * vx + vy * vy;
  const t = l2 > 1e-9 ? clamp(((p.x - a.x) * vx + (p.y - a.y) * vy) / l2, 0, 1) : 0;
  return Math.hypot(p.x - (a.x + t * vx), p.y - (a.y + t * vy));
}

/**
 * Berührt die Figur (Radius figR) auf ihrem Weg von a nach b das Hindernis?
 * Kugeln exakt, Quader in Schritten von höchstens ¼ Figurradius (kein Durchspringen).
 */
export function segmentTouches(a: Pt, b: Pt, figR: number, o: Ob): boolean {
  if (o.kind === 'ball') return distToSegment({ x: o.x, y: o.y }, a, b) <= figR + o.r;
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const steps = Math.max(1, Math.ceil(len / Math.max(1, figR * 0.25)));
  for (let i = 0; i <= steps; i++) {
    const k = i / steps;
    if (distToBox(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k, o) <= figR) return true;
  }
  return false;
}

/** Hindernis um dt Sekunden weiterbewegen */
export function stepOb(o: Ob, dt: number): void {
  o.x += o.vx * dt;
  o.y += o.vy * dt;
}

/** Hindernis ist weit genug hinter der Bühne und fliegt weiter weg */
export function isGone(o: Ob, w: number, h: number, pad: number): boolean {
  const r = obRadius(o);
  const out = o.x < -r - pad || o.x > w + r + pad || o.y < -r - pad || o.y > h + r + pad;
  if (!out) return false;
  const awayX = (o.x < 0 && o.vx <= 0) || (o.x > w && o.vx >= 0);
  const awayY = (o.y < 0 && o.vy <= 0) || (o.y > h && o.vy >= 0);
  return awayX || awayY;
}

export interface SpawnParams {
  /** Bühne (px) und Figurenfeld */
  w: number;
  h: number;
  field: Rect;
  u: number;
  level: number;
  /** Stelle der Figur beim Erscheinen */
  fig: Pt;
}

/**
 * Neues Hindernis: kommt von links, rechts oder oben (nicht von unten, dort liegt der Finger), gleitet
 * geradlinig über das Feld. Die Hälfte zielt auf die Stelle der Figur beim Erscheinen, die anderen auf
 * einen Punkt im Feld – man kann den Weg also von Anfang an abschätzen.
 */
export function makeOb(p: SpawnParams, rng: Rng, opts: { kind?: ObKind; from?: 'L' | 'R' | 'T'; aimed?: boolean } = {}): Ob {
  const { w, field, u } = p;
  const size = sizeUFor(p.level) * u;
  const kind: ObKind = opts.kind ?? (rng.chance(0.5) ? 'ball' : 'box');
  const ar = rng.range(0.85, 1.3);
  const hw = size * 0.9 * ar;
  const hh = (size * 0.9) / ar;
  const r = size;
  const rad = kind === 'ball' ? r : Math.hypot(hw, hh) * 0.92;
  // Seite: links/rechts je 40 %, oben 20 %
  const side = opts.from ?? (() => {
    const q = rng.next();
    return q < 0.4 ? 'L' : q < 0.8 ? 'R' : 'T';
  })();
  let x: number;
  let y: number;
  if (side === 'L') {
    x = -rad - 2;
    y = rng.range(field.minY, Math.max(field.minY + 1, field.maxY));
  } else if (side === 'R') {
    x = w + rad + 2;
    y = rng.range(field.minY, Math.max(field.minY + 1, field.maxY));
  } else {
    x = rng.range(field.minX, Math.max(field.minX + 1, field.maxX));
    y = -rad - 2;
  }
  const aimed = opts.aimed ?? rng.chance(AIMED_SHARE);
  const tx = aimed ? p.fig.x + rng.range(-1.5, 1.5) * u : rng.range(field.minX + (field.maxX - field.minX) * 0.15, field.maxX - (field.maxX - field.minX) * 0.15);
  const ty = aimed ? p.fig.y + rng.range(-1.5, 1.5) * u : rng.range(field.minY + (field.maxY - field.minY) * 0.15, field.maxY - (field.maxY - field.minY) * 0.15);
  const d = Math.max(1, Math.hypot(tx - x, ty - y));
  const sp = speedUFor(p.level) * u * rng.range(0.92, 1.08);
  return { kind, x, y, vx: ((tx - x) / d) * sp, vy: ((ty - y) / d) * sp, r, hw, hh, alpha: 0, dying: false };
}

/**
 * Einfache Vorausschau (Film/Autoplay): wählt die Richtung, in der die Figur in der nächsten Zeit am
 * weitesten von allen Hindernissen entfernt bleibt. Gibt einen Einheitsvektor oder (0, 0) für „stehen bleiben“ zurück.
 */
export function chooseDodge(fig: Pt, figR: number, obs: readonly Ob[], field: Rect, speed: number, horizon = 1.6, pull?: Pt): Pt {
  const live = obs.filter((o) => !o.dying);
  if (!live.length) return { x: 0, y: 0 };
  const safe = figR * 4;
  const score = (dx: number, dy: number): number => {
    let min = Infinity;
    let pos = { ...fig };
    const step = 0.1;
    for (let t = step; t <= horizon + 1e-9; t += step) {
      pos = clampFigure({ x: pos.x + dx * speed * step, y: pos.y + dy * speed * step }, field);
      for (const o of live) {
        const ox = o.x + o.vx * t;
        const oy = o.y + o.vy * t;
        const d = Math.hypot(pos.x - ox, pos.y - oy) - obRadius(o) - figR;
        if (d < min) min = d;
      }
    }
    let s = Math.min(min, safe);
    // ohne Gefahr leicht zur Mitte des Felds zurück
    if (pull) s += (-Math.hypot(pos.x - pull.x, pos.y - pull.y) / 2000) * (min > safe ? 1 : 0);
    return s;
  };
  let best = { x: 0, y: 0 };
  let bestS = score(0, 0) + figR * 0.6;
  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2;
    const dx = Math.cos(a);
    const dy = Math.sin(a);
    const s = score(dx, dy);
    if (s > bestS) {
      bestS = s;
      best = { x: dx, y: dy };
    }
  }
  return best;
}

/** Überlebenszeit-Anteil in %: Zeit bis zur ersten Berührung je Abschnitt (oder der ganze Abschnitt) */
export function survivalPct(survived: number, total: number): number {
  return total > 0 ? Math.round((100 * clamp(survived, 0, total)) / total) : 100;
}

export interface DemoSpec {
  kind: ObKind;
  /** Richtung, aus der das Hindernis kommt, in Grad (0 = von rechts, 90 = von unten, 180 = von links, 270 = von oben) */
  fromDeg: number;
  /** Abstand zur Figur beim Erscheinen in u */
  distU: number;
  /** Tempo in u/s */
  speedU: number;
}

/** Festes Hindernis für den Intro-Film: gleitet geradlinig auf die Stelle der Figur zu */
export function makeDemoOb(fig: Pt, u: number, s: DemoSpec): Ob {
  const a = (s.fromDeg * Math.PI) / 180;
  const dx = Math.cos(a);
  const dy = Math.sin(a);
  const size = sizeUFor(1) * u;
  const ar = s.kind === 'box' ? 1.15 : 1;
  return {
    kind: s.kind,
    x: fig.x + dx * s.distU * u,
    y: fig.y + dy * s.distU * u,
    vx: -dx * s.speedU * u,
    vy: -dy * s.speedU * u,
    r: size,
    hw: size * 0.9 * ar,
    hh: (size * 0.9) / ar,
    alpha: 0,
    dying: false,
  };
}
