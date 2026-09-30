/**
 * Kleine Zeichen-Helfer für weiche Rückmeldungen (✗ / ✓) und die Bildunterschrift im Intro-Film.
 * Kein Blitz, kein Vollflächeneffekt: ein kleines Symbol am Ort, das langsam verblasst.
 */
import type { StageInfo } from '../../core/types';
import { clamp } from '../../core/stats';

type G = CanvasRenderingContext2D;

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
export function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

/** Deckkraft eines Zeichens: weiches Einblenden (in ms), dann langsames Verblassen bis `life` */
export function markAlpha(age: number, life: number, fadeIn = 110): number {
  if (age < 0 || age >= life) return 0;
  const k = age / life;
  return Math.min(1, age / fadeIn) * (1 - k * k);
}

/** ✗ an (x, y): dunkle Kontur + warmes Gelb (Form, nicht nur Farbe), Größe s = halbe Kantenlänge */
export function drawSoftCross(g: G, x: number, y: number, s: number, alpha: number, color = '#FBBF24'): void {
  if (alpha <= 0.01) return;
  const lw = Math.max(3.5, s * 0.34);
  g.save();
  g.globalAlpha = alpha;
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(x - s, y - s);
  g.lineTo(x + s, y + s);
  g.moveTo(x + s, y - s);
  g.lineTo(x - s, y + s);
  g.strokeStyle = 'rgba(5,10,20,0.75)';
  g.lineWidth = lw + 3;
  g.stroke();
  g.strokeStyle = color;
  g.lineWidth = lw;
  g.stroke();
  g.restore();
}

/** ✓ an (x, y), gleiche Bauart wie das ✗ */
export function drawSoftCheck(g: G, x: number, y: number, s: number, alpha: number, color = '#86EFAC'): void {
  if (alpha <= 0.01) return;
  const lw = Math.max(3.5, s * 0.34);
  g.save();
  g.globalAlpha = alpha;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(x - s * 0.95, y + s * 0.05);
  g.lineTo(x - s * 0.3, y + s * 0.7);
  g.lineTo(x + s * 1.0, y - s * 0.75);
  g.strokeStyle = 'rgba(5,10,20,0.75)';
  g.lineWidth = lw + 3;
  g.stroke();
  g.strokeStyle = color;
  g.lineWidth = lw;
  g.stroke();
  g.restore();
}
