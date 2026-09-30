/**
 * Kleine Helfer für die Touch-Fassungen der „Körper & Reflexe“-Übungen (Katalog 806–811):
 * sprung-abfangen, sprossen-leiter, diagonal-korridor, muster-nachzeichnen, raster-ausweichen.
 *
 * - `VirtualHand`: eigene „Geister-Hand“ für Film und Autoplay. Die Engine-Hand kann nur Tipps mit Wartezeiten
 *   in der Warteschlange; diese Übungen brauchen zeitgenaue Tipps (Rhythmus) und Ziehbewegungen. Die Übung ruft
 *   dann selbst `pointerDown/Move/Up` mit virtueller Zeit auf und zeichnet diese Hand.
 * - `softBadge`: weißes Abzeichen mit ✓ oder ✗ in ruhigen Farben (kein Rot).
 * - `softWave`: sanfte (sinusförmige) Schwankung mit höchstens 2 Hz.
 */
import { C, circle, hand, ring } from '../../core/draw';
import { clamp, easeInOut, lerp } from '../../core/stats';
import type { StageInfo } from '../../core/types';

/** Oberkante der Bildunterschrift unten im Intro-Film (gleiche Formel wie im Runner) */
export function captionTopY(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

/** Ruheplatz der virtuellen Hand (rechts unten, über der Bildunterschrift im Film) */
export function restSpot(s: StageInfo, demo: boolean): { x: number; y: number } {
  const hs = clamp(s.u * 13, 48, 110);
  return { x: s.w - hs * 0.75, y: demo ? captionTopY(s) - hs * 0.95 : s.h - hs * 0.7 };
}

/** Größe der gezeichneten Hand */
export function handSize(s: StageInfo): number {
  return clamp(s.u * 13, 48, 110);
}

/** Sanftes Pulsieren 0..1 (Kosinus), Frequenz höchstens 2 Hz; bei reduzierter Bewegung konstant 0,5 */
export function softWave(tMs: number, hz: number, reduced: boolean): number {
  if (reduced) return 0.5;
  const f = clamp(hz, 0.05, 2);
  return 0.5 - 0.5 * Math.cos(2 * Math.PI * f * (tMs / 1000));
}

/** Weißes Abzeichen mit ✓ (dunkles Blaugrün) oder ✗ (dunkles Blaugrau) – nie Rot */
export function softBadge(g: CanvasRenderingContext2D, cx: number, cy: number, rad: number, kind: 'ok' | 'bad'): void {
  circle(g, cx, cy, rad, '#FFFFFF');
  g.save();
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.lineWidth = Math.max(2, rad * 0.3);
  g.strokeStyle = kind === 'ok' ? '#0F766E' : '#334155';
  g.beginPath();
  if (kind === 'ok') {
    g.moveTo(cx - rad * 0.45, cy + rad * 0.02);
    g.lineTo(cx - rad * 0.1, cy + rad * 0.38);
    g.lineTo(cx + rad * 0.48, cy - rad * 0.36);
  } else {
    const q = rad * 0.38;
    g.moveTo(cx - q, cy - q);
    g.lineTo(cx + q, cy + q);
    g.moveTo(cx + q, cy - q);
    g.lineTo(cx - q, cy + q);
  }
  g.stroke();
  g.restore();
}

/** Virtuelle Hand: gleitet zu Zielen, „drückt“ kurz und zeichnet sich selbst */
export class VirtualHand {
  x = 0;
  y = 0;
  visible = true;
  private pressT = -1e9;
  private from = { x: 0, y: 0 };
  private to = { x: 0, y: 0 };
  private t0 = 0;
  private dur = 0;

  /** sofort an eine Stelle setzen */
  snap(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.dur = 0;
  }

  /** in `dur` ms zum Ziel gleiten (sanft anfahren und abbremsen) */
  glide(x: number, y: number, t: number, dur: number): void {
    this.from = { x: this.x, y: this.y };
    this.to = { x, y };
    this.t0 = t;
    this.dur = Math.max(0, dur);
    if (this.dur === 0) this.snap(x, y);
  }

  /** gleitet die Hand noch? */
  get gliding(): boolean {
    return this.dur > 0;
  }

  update(t: number): void {
    if (this.dur <= 0) return;
    const k = clamp((t - this.t0) / this.dur, 0, 1);
    const e = easeInOut(k);
    this.x = lerp(this.from.x, this.to.x, e);
    this.y = lerp(this.from.y, this.to.y, e);
    if (k >= 1) this.dur = 0;
  }

  /** Antippen anzeigen (Druck-Animation und Kreis) */
  press(t: number): void {
    this.pressT = t;
  }

  /** Dauerhaft gedrückt anzeigen (Ziehen) */
  holding = false;

  render(g: CanvasRenderingContext2D, t: number, size: number): void {
    if (!this.visible) return;
    const since = t - this.pressT;
    if (since >= 0 && since < 480) {
      const k = since / 480;
      g.save();
      g.globalAlpha = 0.7 * (1 - k);
      ring(g, this.x, this.y, 6 + k * 30, C.white, 3);
      g.restore();
    }
    hand(g, this.x, this.y, size, this.holding || (since >= 0 && since < 170));
  }
}
