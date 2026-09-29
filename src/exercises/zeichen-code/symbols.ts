/**
 * Eigene, abstrakte Zeichen für den Zeichen-Code.
 *
 * - Selbst gezeichnet (keine Schrift, keine Buchstaben, Ziffern oder Pfeile) → sieht auf jedem Gerät
 *   gleich aus und misst in DE und IT identisch.
 * - Jede Form gehört zu einer „Familie“ (Quadrate, Kreise, Linien …). Pro Schlüssel wird höchstens
 *   ein Zeichen je Familie gewählt – so bleiben die Zeichen im Schlüssel gut unterscheidbar.
 * - Keine Spiegel- oder Drehpaare im Vorrat (z. B. nur eine Treppe, nur ein Dreieck nach oben).
 */
import type { Rng } from '../../core/rng';

type G = CanvasRenderingContext2D;

interface SymbolDef {
  fam: string;
  /** Zeichnet in ein Kästchen von −0,5 … 0,5 (Linienbreite und Farbe sind gesetzt) */
  draw: (g: G) => void;
}

const TAU = Math.PI * 2;

function line(g: G, x1: number, y1: number, x2: number, y2: number): void {
  g.beginPath();
  g.moveTo(x1, y1);
  g.lineTo(x2, y2);
  g.stroke();
}

function path(g: G, pts: ReadonlyArray<readonly [number, number]>, close: boolean): void {
  g.beginPath();
  pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  if (close) g.closePath();
}

function dot(g: G, x: number, y: number, r: number): void {
  g.beginPath();
  g.arc(x, y, r, 0, TAU);
  g.fill();
}

function ringP(g: G, x: number, y: number, r: number): void {
  g.beginPath();
  g.arc(x, y, r, 0, TAU);
  g.stroke();
}

const SQ = 0.4;

export const SYMBOLS: readonly SymbolDef[] = [
  // Quadrate
  {
    fam: 'sq',
    draw: (g) => {
      g.strokeRect(-SQ, -SQ, 2 * SQ, 2 * SQ);
      line(g, 0, -SQ, 0, SQ);
      line(g, -SQ, 0, SQ, 0);
    },
  },
  {
    fam: 'sq',
    draw: (g) => {
      g.strokeRect(-SQ, -SQ, 2 * SQ, 2 * SQ);
      line(g, -SQ, -SQ, SQ, SQ);
      dot(g, 0.17, -0.17, 0.09);
    },
  },
  {
    fam: 'sq',
    draw: (g) => {
      g.strokeRect(-SQ, -SQ, 2 * SQ, 2 * SQ);
      g.fillRect(-0.16, -0.16, 0.32, 0.32);
    },
  },
  // Kreise
  {
    fam: 'ci',
    draw: (g) => {
      ringP(g, 0, 0, 0.4);
      dot(g, 0, 0, 0.13);
    },
  },
  {
    fam: 'ci',
    draw: (g) => {
      ringP(g, 0, 0, 0.4);
      g.beginPath();
      g.arc(0, 0, 0.4, Math.PI / 2, Math.PI * 1.5);
      g.closePath();
      g.fill();
    },
  },
  {
    fam: 'ci',
    draw: (g) => {
      dot(g, 0, 0, 0.17);
      for (let i = 0; i < 8; i++) {
        const a = (i * TAU) / 8;
        line(g, Math.cos(a) * 0.3, Math.sin(a) * 0.3, Math.cos(a) * 0.46, Math.sin(a) * 0.46);
      }
    },
  },
  // Linien
  {
    fam: 'ln',
    draw: (g) => {
      line(g, -0.42, -0.3, 0.42, -0.3);
      line(g, -0.18, 0, 0.18, 0);
      line(g, -0.42, 0.3, 0.42, 0.3);
    },
  },
  {
    fam: 'ln',
    draw: (g) => {
      for (const oy of [-0.16, 0.16]) {
        g.beginPath();
        for (let i = 0; i <= 32; i++) {
          const k = i / 32;
          const x = -0.44 + 0.88 * k;
          const y = oy + 0.11 * Math.sin(k * TAU * 1.5);
          if (i) g.lineTo(x, y);
          else g.moveTo(x, y);
        }
        g.stroke();
      }
    },
  },
  {
    fam: 'ln',
    draw: (g) => {
      path(
        g,
        [
          [-0.42, 0.42],
          [-0.42, 0.14],
          [-0.14, 0.14],
          [-0.14, -0.14],
          [0.14, -0.14],
          [0.14, -0.42],
          [0.42, -0.42],
        ],
        false,
      );
      g.stroke();
    },
  },
  {
    fam: 'ln',
    draw: (g) => {
      line(g, -0.24, -0.44, -0.24, 0.44);
      line(g, 0.24, -0.44, 0.24, 0.44);
      for (const y of [-0.24, 0, 0.24]) line(g, -0.24, y, 0.24, y);
    },
  },
  // Vielecke
  {
    fam: 'po',
    draw: (g) => {
      path(
        g,
        [
          [0, -0.46],
          [0.4, 0],
          [0, 0.46],
          [-0.4, 0],
        ],
        true,
      );
      g.stroke();
      path(
        g,
        [
          [0, -0.17],
          [0.15, 0],
          [0, 0.17],
          [-0.15, 0],
        ],
        true,
      );
      g.fill();
    },
  },
  {
    fam: 'po',
    draw: (g) => {
      const pts: Array<[number, number]> = [];
      for (let i = 0; i < 6; i++) pts.push([Math.cos((i * TAU) / 6) * 0.45, Math.sin((i * TAU) / 6) * 0.45]);
      path(g, pts, true);
      g.stroke();
      line(g, -0.45, 0, 0.45, 0);
    },
  },
  // Dreiecke
  {
    fam: 'tr',
    draw: (g) => {
      path(
        g,
        [
          [0, -0.42],
          [0.45, 0.36],
          [-0.45, 0.36],
        ],
        true,
      );
      g.stroke();
      dot(g, 0, 0.1, 0.1);
    },
  },
  {
    fam: 'tr',
    draw: (g) => {
      path(
        g,
        [
          [-0.34, -0.43],
          [0.34, -0.43],
          [-0.34, 0.43],
          [0.34, 0.43],
        ],
        true,
      );
      g.stroke();
      path(
        g,
        [
          [0, 0.02],
          [0.3, 0.41],
          [-0.3, 0.41],
        ],
        true,
      );
      g.fill();
    },
  },
  {
    fam: 'tr',
    draw: (g) => {
      path(
        g,
        [
          [-0.38, -0.02],
          [0, -0.38],
          [0.38, -0.02],
        ],
        false,
      );
      g.stroke();
      path(
        g,
        [
          [-0.38, 0.38],
          [0, 0.02],
          [0.38, 0.38],
        ],
        false,
      );
      g.stroke();
    },
  },
  // Einzelstücke
  {
    fam: 'bolt',
    draw: (g) => {
      path(
        g,
        [
          [0.14, -0.48],
          [-0.3, 0.06],
          [-0.02, 0.06],
          [-0.14, 0.48],
          [0.3, -0.06],
          [0.02, -0.06],
        ],
        true,
      );
      g.fill();
    },
  },
  {
    fam: 'ast',
    draw: (g) => {
      for (const a of [Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6]) {
        line(g, Math.cos(a) * 0.46, Math.sin(a) * 0.46, -Math.cos(a) * 0.46, -Math.sin(a) * 0.46);
      }
    },
  },
  {
    fam: 'cross',
    draw: (g) => {
      line(g, 0, -0.4, 0, 0.4);
      line(g, -0.4, 0, 0.4, 0);
      line(g, -0.13, -0.4, 0.13, -0.4);
      line(g, -0.13, 0.4, 0.13, 0.4);
      line(g, -0.4, -0.13, -0.4, 0.13);
      line(g, 0.4, -0.13, 0.4, 0.13);
    },
  },
  {
    fam: 'dumb',
    draw: (g) => {
      line(g, -0.27, 0.27, 0.27, -0.27);
      dot(g, -0.29, 0.29, 0.15);
      dot(g, 0.29, -0.29, 0.15);
    },
  },
  {
    fam: 'dots',
    draw: (g) => {
      for (const x of [-0.25, 0.25]) for (const y of [-0.25, 0.25]) dot(g, x, y, 0.13);
    },
  },
  {
    fam: 'dome',
    draw: (g) => {
      g.beginPath();
      g.arc(0, 0.16, 0.44, Math.PI, TAU);
      g.closePath();
      g.stroke();
      line(g, 0, 0.16, 0, -0.08);
    },
  },
  {
    fam: 'spiral',
    draw: (g) => {
      g.beginPath();
      const turns = 2.1;
      for (let i = 0; i <= 80; i++) {
        const k = i / 80;
        const a = k * turns * TAU;
        const r = 0.04 + 0.4 * k;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i) g.lineTo(x, y);
        else g.moveTo(x, y);
      }
      g.stroke();
    },
  },
];

/** Zeichen in ein Quadrat der Kantenlänge `size` um (cx, cy) zeichnen */
export function drawSymbol(g: G, id: number, cx: number, cy: number, size: number, color: string, alpha = 1): void {
  const def = SYMBOLS[id];
  if (!def) return;
  g.save();
  g.translate(cx, cy);
  g.scale(size, size);
  g.globalAlpha *= alpha;
  g.strokeStyle = color;
  g.fillStyle = color;
  g.lineWidth = 0.095;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  def.draw(g);
  g.restore();
}

/** n Zeichen wählen – höchstens eines je Familie, nicht dieselben wie `avoid` (wenn möglich) */
export function pickSymbols(n: number, rng: Rng, avoid: readonly number[] = []): number[] {
  const fams = rng.shuffle([...new Set(SYMBOLS.map((s) => s.fam))]);
  const out: number[] = [];
  for (const f of fams) {
    if (out.length >= n) break;
    const members = SYMBOLS.map((s, i) => (s.fam === f ? i : -1)).filter((i) => i >= 0);
    const fresh = members.filter((i) => !avoid.includes(i));
    out.push(rng.pick(fresh.length ? fresh : members));
  }
  return out;
}
