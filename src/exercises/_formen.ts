/**
 * Gemeinsame, gut unterscheidbare Formen für die Gedächtnis-Übungen (Rückblick, Wo war es?).
 *
 * Die Formen unterscheiden sich im Umriss – Farbe ist nur ein Zusatz (Rot-Grün-Schwäche!).
 * Alle Formen haben ungefähr dieselbe „Masse“ und passen in einen Kreis vom Radius r.
 */
import { rrPath, star, type G } from '../core/draw';

export const FORM_COUNT = 10;

/** Zusatzfarben (Okabe-Ito-ähnlich, auf dunklem Grund gut sichtbar); nie die einzige Information */
export const FORM_COLORS: readonly string[] = [
  '#F2B134', // Kreis
  '#56B4E9', // Ring
  '#7FD18B', // Quadrat
  '#F08A5D', // Dreieck
  '#C99BE8', // Raute
  '#F5E663', // Stern
  '#7AA9F0', // Kreuz
  '#5FD0C2', // Sechseck
  '#F39AB8', // Herz
  '#E8EEF7', // Mond
];

/** Zeichnet Form `id` (0 … FORM_COUNT-1) mit Mittelpunkt (cx, cy) und „Radius“ r. */
export function drawForm(g: G, id: number, cx: number, cy: number, r: number, color: string): void {
  g.save();
  g.fillStyle = color;
  g.strokeStyle = color;
  g.lineJoin = 'round';
  switch (((id % FORM_COUNT) + FORM_COUNT) % FORM_COUNT) {
    case 0: // Kreis
      g.beginPath();
      g.arc(cx, cy, r * 0.9, 0, Math.PI * 2);
      g.fill();
      break;
    case 1: // Ring
      g.beginPath();
      g.arc(cx, cy, r * 0.74, 0, Math.PI * 2);
      g.lineWidth = r * 0.36;
      g.stroke();
      break;
    case 2: // Quadrat
      rrPath(g, cx - r * 0.8, cy - r * 0.8, r * 1.6, r * 1.6, r * 0.16);
      g.fill();
      break;
    case 3: // Dreieck
      g.beginPath();
      g.moveTo(cx, cy - r * 0.98);
      g.lineTo(cx + r * 1.0, cy + r * 0.78);
      g.lineTo(cx - r * 1.0, cy + r * 0.78);
      g.closePath();
      g.fill();
      break;
    case 4: // Raute
      g.beginPath();
      g.moveTo(cx, cy - r * 1.05);
      g.lineTo(cx + r * 0.78, cy);
      g.lineTo(cx, cy + r * 1.05);
      g.lineTo(cx - r * 0.78, cy);
      g.closePath();
      g.fill();
      break;
    case 5: // Stern
      star(g, cx, cy + r * 0.05, r * 1.08, color, 5);
      break;
    case 6: {
      // Kreuz (Plus)
      const a = r * 0.34;
      const b = r * 1.0;
      g.beginPath();
      g.rect(cx - a, cy - b, a * 2, b * 2);
      g.rect(cx - b, cy - a, b * 2, a * 2);
      g.fill();
      break;
    }
    case 7: // Sechseck
      g.beginPath();
      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI) / 3;
        const px = cx + Math.cos(ang) * r * 1.0;
        const py = cy + Math.sin(ang) * r * 1.0;
        if (i === 0) g.moveTo(px, py);
        else g.lineTo(px, py);
      }
      g.closePath();
      g.fill();
      break;
    case 8: // Herz
      g.beginPath();
      g.moveTo(cx, cy + r * 0.92);
      g.bezierCurveTo(cx - r * 1.35, cy + r * 0.12, cx - r * 1.0, cy - r * 0.9, cx, cy - r * 0.32);
      g.bezierCurveTo(cx + r * 1.0, cy - r * 0.9, cx + r * 1.35, cy + r * 0.12, cx, cy + r * 0.92);
      g.closePath();
      g.fill();
      break;
    default: {
      // Mond (Sichel, nach rechts offen)
      const R = r * 0.98;
      const ri = R * 0.8;
      const dx = R * 0.5;
      const xi = (R * R - ri * ri + dx * dx) / (2 * dx);
      const yi = Math.sqrt(Math.max(0, R * R - xi * xi));
      const ox = cx - r * 0.12;
      const alpha = Math.atan2(yi, xi);
      const beta = Math.atan2(-yi, xi - dx);
      const beta2 = Math.atan2(yi, xi - dx);
      g.beginPath();
      g.arc(ox, cy, R, alpha, Math.PI * 2 - alpha, false);
      g.arc(ox + dx, cy, ri, beta, beta2, true);
      g.closePath();
      g.fill();
      break;
    }
  }
  g.restore();
}
