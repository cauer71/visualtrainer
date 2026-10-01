import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { seiteErkennen, FIELD_FILL, FIELD_INK } from '../../src/exercises/seite-erkennen';
import {
  buildFigure,
  drawFigure,
  FIGURE_STYLE,
  markerRightInBase,
  rotatePoint,
  thumbIsRightOfDir,
  type FigureModel,
  type Pt,
} from '../../src/exercises/seite-erkennen/koerperteile';
import {
  anglesFor,
  arrangementFor,
  arrangementVaries,
  balancedFlags,
  cellIsLeft,
  computeStats,
  correctCell,
  deadlineMs,
  fieldCountFor,
  FIELD_FONT_PX,
  isTurned,
  isUpright,
  judge,
  layoutFor,
  levelOf,
  MAX_LEVEL,
  MAX_RUN,
  MIN_FIELD_H,
  MIN_FIELD_W,
  normAngle,
  partsFor,
  pickFigure,
  planSides,
  pointsFor,
  REFERENCE_4,
  sameDrawing,
  swapFor,
  tipFor,
  VIEWS,
  PARTS,
  type Figure,
  type Part,
  type Side,
  type TrialRecord,
  type View,
  type Word,
} from '../../src/exercises/seite-erkennen/logic';
import { de, it as itTexts } from '../../src/exercises/seite-erkennen/texts';

// ---------------------------------------------------------------------------
// Chiralität: unabhängige Tabelle aus dem Auftrag (Bildkoordinaten x nach rechts, Finger/Zehen oben, 0°)
// [Körperteil, Ansicht, Seite im Bild, auf der der Daumen/die große Zehe liegt, Antwort]

type ImgSide = 'left' | 'right';
const TABLE: Array<[Part, View, ImgSide, Side]> = [
  // Hand, Handfläche zugewandt: Daumen rechts im Bild = rechte Hand, Daumen links = linke Hand
  ['hand', 'volar', 'right', 'right'],
  ['hand', 'volar', 'left', 'left'],
  // Hand, Handrücken zugewandt: Daumen links im Bild = rechte Hand, Daumen rechts = linke Hand
  ['hand', 'dorsal', 'left', 'right'],
  ['hand', 'dorsal', 'right', 'left'],
  // Fuß von oben (Fußrücken), Zehen oben: große Zehe links = rechter Fuß, rechts = linker Fuß
  ['foot', 'dorsal', 'left', 'right'],
  ['foot', 'dorsal', 'right', 'left'],
  // Fußsohle zugewandt, Zehen oben: große Zehe rechts = rechter Fuß, links = linker Fuß
  ['foot', 'volar', 'right', 'right'],
  ['foot', 'volar', 'left', 'left'],
  // Unterarm mit Hand: dieselbe Hand, nur um 180° gedreht (Finger unten, Ellbogen oben) → Daumen auf der anderen Bildseite
  ['forearm', 'volar', 'left', 'right'],
  ['forearm', 'volar', 'right', 'left'],
  ['forearm', 'dorsal', 'right', 'right'],
  ['forearm', 'dorsal', 'left', 'left'],
];

const markerSideInImage = (fig: FigureModel, angle: number): ImgSide => {
  const c = rotatePoint(fig.center, angle);
  const m = rotatePoint(fig.marker, angle);
  return m.x > c.x ? 'right' : 'left';
};

const ANGLES = [0, 15, -15, 30, -30, 45, -45, 90, -90, 135, -135, 180, 270];

describe('seite-erkennen: Chiralität der Zeichnungen (Unit-Tests gegen die Tabelle aus dem Auftrag)', () => {
  it('Tabelle: bei 0° liegt Daumen/große Zehe auf der geforderten Bildseite', () => {
    for (const [part, view, imgSide, side] of TABLE) {
      const fig = buildFigure(part, view, side);
      expect(markerSideInImage(fig, 0), `${part} ${view} ${side}`).toBe(imgSide);
      // das Modell selbst und die Hilfsfunktion sagen dasselbe
      expect(markerRightInBase(part, view, side), `${part} ${view} ${side}`).toBe(imgSide === 'right');
    }
    expect(TABLE).toHaveLength(12);
  });

  it('jede der 12 Kombinationen (Teil × Ansicht × Seite) kommt genau einmal in der Tabelle vor', () => {
    const keys = new Set(TABLE.map(([p, v, , s]) => `${p}|${v}|${s}`));
    expect(keys.size).toBe(12);
  });

  it('Finger/Zehen zeigen im Grundzustand nach oben (Hand, Fuß), beim Unterarm die Finger nach unten', () => {
    for (const part of PARTS) {
      for (const view of VIEWS) {
        for (const side of ['left', 'right'] as Side[]) {
          const f = buildFigure(part, view, side);
          expect(Math.abs(f.dir.x), `${part}`).toBeLessThan(1e-9);
          expect(f.dir.y, `${part}`).toBeCloseTo(part === 'forearm' ? 1 : -1, 9);
        }
      }
    }
  });

  it('Drehung ändert die Seite nie: bei jedem Winkel liefert die drehungsfreie Lesart die richtige Seite', () => {
    for (const [part, view, , side] of TABLE) {
      const fig = buildFigure(part, view, side);
      for (const a of ANGLES) {
        const dir = rotatePoint(fig.dir, a);
        const c = rotatePoint(fig.center, a);
        const m = rotatePoint(fig.marker, a);
        const right = thumbIsRightOfDir(dir, c, m);
        // Fläche zugewandt: rechts von der Blickrichtung = rechte Seite; Rücken zugewandt: umgekehrt
        const inferred: Side = (view === 'volar') === right ? 'right' : 'left';
        expect(inferred, `${part} ${view} ${side} ${a}°`).toBe(side);
      }
    }
  });

  it('Drehung ist keine Spiegelung: gedrehte Zeichnung = Grundzeichnung mit positiver Determinante', () => {
    for (const a of ANGLES) {
      const r = rotatePoint({ x: 1, y: 0 }, a);
      const s = rotatePoint({ x: 0, y: 1 }, a);
      expect(r.x * s.y - r.y * s.x).toBeCloseTo(1, 9);
    }
  });

  it('linke und rechte Seite derselben Ansicht sind genau gespiegelt (nur x kippt)', () => {
    for (const part of PARTS) {
      for (const view of VIEWS) {
        const R = buildFigure(part, view, 'right');
        const L = buildFigure(part, view, 'left');
        // Spiegelung um die Hüllenmitte: Marker, Mitte, Richtung
        expect(L.marker.x).toBeCloseTo(-R.marker.x, 6);
        expect(L.marker.y).toBeCloseTo(R.marker.y, 6);
        expect(L.center.x).toBeCloseTo(-R.center.x, 6);
        expect(L.center.y).toBeCloseTo(R.center.y, 6);
        expect(L.radius).toBeCloseTo(R.radius, 6);
      }
    }
  });

  it('Daumen / große Zehe sind deutlich dicker als die übrigen Finger / Zehen', () => {
    for (const part of ['hand', 'foot'] as Part[]) {
      const fig = buildFigure(part, 'volar', 'right');
      const caps = fig.body.filter((s): s is Extract<typeof s, { k: 'cap' }> => s.k === 'cap');
      const widths = caps.map((c) => Math.max(c.ra, c.rb));
      const biggest = Math.max(...widths);
      const idx = widths.indexOf(biggest);
      // die dickste Kapsel ist die mit dem Marker (Daumen / große Zehe) …
      const thumb = caps[idx];
      expect(Math.hypot(thumb.b.x - fig.marker.x, thumb.b.y - fig.marker.y)).toBeLessThan(1e-9);
      // … und mindestens 1,4-mal so dick wie die zweitdickste
      const rest = widths.filter((_, i) => i !== idx);
      expect(biggest).toBeGreaterThanOrEqual(1.4 * Math.max(...rest));
    }
  });

  it('Handfläche und Handrücken sind an den Merkmalen unterscheidbar (Falten vs. Nägel)', () => {
    for (const part of ['hand', 'forearm'] as Part[]) {
      const volar = buildFigure(part, 'volar', 'right');
      const dorsal = buildFigure(part, 'dorsal', 'right');
      expect(volar.nails.length).toBe(0);
      expect(dorsal.nails.length).toBe(5); // vier Finger und Daumen
      expect(volar.lines.length).toBeGreaterThan(8); // Beugefalten und Fingergelenke
    }
    const sole = buildFigure('foot', 'volar', 'right');
    const instep = buildFigure('foot', 'dorsal', 'right');
    expect(sole.nails.length).toBe(0);
    expect(instep.nails.length).toBe(5); // fünf Zehennägel
    expect(instep.body.length).toBe(sole.body.length + 1); // Unterschenkel
  });

  it('Zeichnung passt in jeder Drehung in den Kreis (Radius um den Ursprung)', () => {
    for (const part of PARTS) {
      for (const view of VIEWS) {
        const fig = buildFigure(part, view, 'left');
        let maxR = 0;
        for (const s of fig.body) {
          if (s.k === 'cap') maxR = Math.max(maxR, Math.hypot(s.a.x, s.a.y) + s.ra, Math.hypot(s.b.x, s.b.y) + s.rb);
          else for (const p of s.pts) maxR = Math.max(maxR, Math.hypot(p.x, p.y));
        }
        expect(maxR).toBeLessThanOrEqual(fig.radius + 1e-9);
        expect(fig.radius).toBeGreaterThan(30);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Zeichenprüfung mit aufzeichnendem Canvas-Ersatz: Der Renderer darf nichts spiegeln

class RecCtx {
  m = [1, 0, 0, 1, 0, 0];
  private stack: number[][] = [];
  private path: Pt[] = [];
  fillStyle = '';
  strokeStyle = '';
  lineWidth = 1;
  lineJoin = 'miter';
  lineCap = 'butt';
  ops: Array<{ kind: 'fill' | 'stroke'; style: string; det: number; pts: Pt[] }> = [];
  private tp(x: number, y: number): Pt {
    const [a, b, c, d, e, f] = this.m;
    return { x: a * x + c * y + e, y: b * x + d * y + f };
  }
  save(): void {
    this.stack.push([...this.m]);
  }
  restore(): void {
    this.m = this.stack.pop() ?? [1, 0, 0, 1, 0, 0];
  }
  translate(tx: number, ty: number): void {
    const [a, b, c, d, e, f] = this.m;
    this.m = [a, b, c, d, a * tx + c * ty + e, b * tx + d * ty + f];
  }
  rotate(t: number): void {
    const [a, b, c, d, e, f] = this.m;
    const co = Math.cos(t);
    const si = Math.sin(t);
    this.m = [a * co + c * si, b * co + d * si, -a * si + c * co, -b * si + d * co, e, f];
  }
  scale(sx: number, sy: number): void {
    const [a, b, c, d, e, f] = this.m;
    this.m = [a * sx, b * sx, c * sy, d * sy, e, f];
  }
  beginPath(): void {
    this.path = [];
  }
  closePath(): void {}
  moveTo(x: number, y: number): void {
    this.path.push(this.tp(x, y));
  }
  lineTo(x: number, y: number): void {
    this.path.push(this.tp(x, y));
  }
  /** Ankerpunkte: Kreismittelpunkt (Bogen), Ecke (arcTo), Kontrollpunkt und Ende (Kurve) */
  arc(x: number, y: number): void {
    this.path.push(this.tp(x, y));
  }
  arcTo(x1: number, y1: number): void {
    this.path.push(this.tp(x1, y1));
  }
  quadraticCurveTo(cx: number, cy: number, x: number, y: number): void {
    this.path.push(this.tp(cx, cy), this.tp(x, y));
  }
  private rec(kind: 'fill' | 'stroke'): void {
    const [a, b, c, d] = this.m;
    this.ops.push({ kind, style: kind === 'fill' ? this.fillStyle : this.strokeStyle, det: a * d - b * c, pts: [...this.path] });
  }
  fill(): void {
    this.rec('fill');
  }
  stroke(): void {
    this.rec('stroke');
  }
}

const num = (v: number): string => (Math.round(v * 100) / 100 + 0).toFixed(2).replace(/^-0\.00$/, '0.00');
const key = (p: Pt): string => `${num(p.x)},${num(p.y)}`;

function render(part: Part, view: View, side: Side, angle: number, cx = 0, cy = 0, size = 100): RecCtx {
  const g = new RecCtx();
  drawFigure(g as unknown as CanvasRenderingContext2D, buildFigure(part, view, side), cx, cy, size, angle);
  return g;
}

/** Ankerpunkte aller Körperflächen (Füllung in Körperfarbe) */
const bodyAnchors = (g: RecCtx): string[] =>
  g.ops
    .filter((o) => o.kind === 'fill' && o.style === FIGURE_STYLE.fill)
    .flatMap((o) => o.pts.map(key))
    .sort();
const allAnchors = (g: RecCtx): string[] => g.ops.flatMap((o) => o.pts.map(key)).sort();
const mirrorKey = (k: string): string => {
  const [x, y] = k.split(',').map(Number);
  return key({ x: -x + 0, y });
};

describe('seite-erkennen: gezeichnete Figur (aufzeichnender Canvas-Ersatz)', () => {
  it('der Renderer zeichnet nie gespiegelt (Transformation hat immer positive Determinante)', () => {
    for (const [part, view, , side] of TABLE) {
      for (const a of [0, 90, 180, -90, 15]) {
        const g = render(part, view, side, a);
        expect(g.ops.length).toBeGreaterThan(10);
        for (const o of g.ops) expect(o.det, `${part} ${view} ${side} ${a}`).toBeGreaterThan(0);
      }
    }
  });

  it('links = Spiegelbild von rechts (alle Körperpunkte und Linien, gleiche Ansicht)', () => {
    for (const part of PARTS) {
      for (const view of VIEWS) {
        const R = allAnchors(render(part, view, 'right', 0)).map(mirrorKey).sort();
        const L = allAnchors(render(part, view, 'left', 0));
        expect(L, `${part} ${view}`).toEqual(R);
      }
    }
  });

  it('Hand: Umriss der rechten Handfläche = Umriss des linken Handrückens (gleiche Gestalt, nur andere Innenzeichnung)', () => {
    for (const part of ['hand', 'forearm'] as Part[]) {
      expect(bodyAnchors(render(part, 'volar', 'right', 0))).toEqual(bodyAnchors(render(part, 'dorsal', 'left', 0)));
      expect(bodyAnchors(render(part, 'volar', 'left', 0))).toEqual(bodyAnchors(render(part, 'dorsal', 'right', 0)));
    }
    // aber die Innenzeichnung unterscheidet sich
    expect(allAnchors(render('hand', 'volar', 'right', 0))).not.toEqual(allAnchors(render('hand', 'dorsal', 'left', 0)));
  });

  it('Drehung dreht nur: alle Punkte bei θ = Drehung der Punkte bei 0° um den Mittelpunkt', () => {
    for (const [part, view, , side] of TABLE) {
      const base = render(part, view, side, 0, 200, 150, 80);
      for (const a of [90, 180, -90, 45]) {
        const turned = render(part, view, side, a, 200, 150, 80);
        const expected = base.ops
          .flatMap((o) => o.pts)
          .map((p) => {
            const r = rotatePoint({ x: p.x - 200, y: p.y - 150 }, a);
            return key({ x: r.x + 200, y: r.y + 150 });
          })
          .sort();
        expect(allAnchors(turned), `${part} ${view} ${side} ${a}`).toEqual(expected);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Stufen

describe('seite-erkennen: Stufenfunktionen', () => {
  it('Körperteile: von Stufe 1 an Hand, Fuß und Unterarm gemischt', () => {
    for (let l = 1; l <= MAX_LEVEL; l++) expect(partsFor(l)).toEqual(['hand', 'foot', 'forearm']);
    expect(levelOf(0)).toBe(1);
    expect(levelOf(99)).toBe(12);
    expect(levelOf(5.9)).toBe(5);
  });

  it('Drehwinkel: erst aufrecht und schräg, Winkelbetrag wächst nie wieder zurück, 180° erst ab Stufe 8', () => {
    expect(anglesFor(1).sort((a, b) => a - b)).toEqual([-15, 0, 15]);
    let maxAbs = 0;
    for (let l = 1; l <= MAX_LEVEL; l++) {
      const a = anglesFor(l);
      expect(new Set(a).size).toBe(a.length);
      expect(a).toContain(0);
      const m = Math.max(...a.map((x) => Math.abs(x)));
      // der größte vorkommende Winkel sinkt nie (Schwierigkeit nach Antwortzeit-Reihenfolge)
      expect(m).toBeGreaterThanOrEqual(maxAbs);
      maxAbs = m;
      if (l <= 7) expect(a).not.toContain(180);
      if (l >= 8) expect(a).toContain(180);
      if (l < 5) expect(a.every((x) => Math.abs(x) < 90)).toBe(true);
      if (l >= 5) expect(a).toContain(90);
      if (l >= 5) expect(a).toContain(-90);
    }
    // ±90° kommt vor 180° (Antwortzeit wächst mit dem Winkel bis 180°)
    const first90 = [...Array(MAX_LEVEL)].findIndex((_, i) => anglesFor(i + 1).includes(90));
    const first180 = [...Array(MAX_LEVEL)].findIndex((_, i) => anglesFor(i + 1).includes(180));
    expect(first90).toBeLessThan(first180);
  });

  it('Felder: zwei bis Stufe 9 (ab 7 vertauscht), vier ab Stufe 10; Wörter erscheinen ab Stufe 7 erst mit dem Bild', () => {
    for (let l = 1; l <= 9; l++) expect(fieldCountFor(l)).toBe(2);
    for (let l = 10; l <= 12; l++) expect(fieldCountFor(l)).toBe(4);
    for (let l = 1; l <= 6; l++) {
      expect(swapFor(l)).toBe(false);
      expect(arrangementVaries(l)).toBe(false);
    }
    for (let l = 7; l <= 9; l++) {
      expect(swapFor(l)).toBe(true);
      expect(arrangementVaries(l)).toBe(true);
    }
    for (let l = 10; l <= 12; l++) {
      expect(swapFor(l)).toBe(false); // vier Felder: gemischt statt vertauscht
      expect(arrangementVaries(l)).toBe(true);
    }
  });

  it('Antwortfrist weich: 6 s bis Stufe 9, dann 5 → 3,5 s, nie steigend', () => {
    for (let l = 1; l <= 9; l++) expect(deadlineMs(l)).toBe(6000);
    expect(deadlineMs(10)).toBe(5000);
    expect(deadlineMs(12)).toBe(3500);
    for (let l = 2; l <= 12; l++) expect(deadlineMs(l)).toBeLessThanOrEqual(deadlineMs(l - 1));
  });

  it('Winkel-Gruppen: aufrecht ≤ 15°, gedreht ≥ 90°, dazwischen keins', () => {
    expect(normAngle(270)).toBe(-90);
    expect(normAngle(-180)).toBe(180);
    expect(isUpright(0) && isUpright(15) && isUpright(-15) && isUpright(360)).toBe(true);
    expect(isUpright(30)).toBe(false);
    expect(isTurned(90) && isTurned(-90) && isTurned(180) && isTurned(135)).toBe(true);
    expect(isTurned(45)).toBe(false);
    for (let l = 1; l <= MAX_LEVEL; l++) for (const a of anglesFor(l)) expect(isUpright(a) && isTurned(a)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Durchgänge: Gleichverteilung

describe('seite-erkennen: Seitenfolge und Zeichnungswahl', () => {
  it('balancedFlags: genau halb/halb, nie mehr als 3 gleiche hintereinander (viele Seeds)', () => {
    for (let seed = 1; seed <= 300; seed++) {
      const rng = createRng(seed);
      for (const n of [4, 6, 20]) {
        const f = balancedFlags(rng, n, MAX_RUN);
        expect(f).toHaveLength(n);
        expect(f.filter(Boolean).length).toBe(n / 2);
        let run = 1;
        for (let i = 1; i < n; i++) {
          run = f[i] === f[i - 1] ? run + 1 : 1;
          expect(run).toBeLessThanOrEqual(MAX_RUN);
        }
      }
    }
  });

  it('planSides: 10 links, 10 rechts; Folge ist deterministisch mit festem Seed und ändert sich mit anderem Seed', () => {
    const a = planSides(createRng(7), 20);
    const b = planSides(createRng(7), 20);
    const c = planSides(createRng(8), 20);
    expect(a).toEqual(b);
    expect(a).not.toEqual(c);
    expect(a.filter((s) => s === 'left').length).toBe(10);
  });

  /** Eine ganze Runde auf fester Stufe */
  function round(seed: number, level: number, n = 20): Figure[] {
    const rng = createRng(seed);
    const sides = planSides(rng, n);
    const figs: Figure[] = [];
    for (let i = 0; i < n; i++) figs.push(pickFigure(rng, level, sides[i], figs));
    return figs;
  }

  it('Runde: Seiten gleich oft, Körperteil × Ansicht gleich oft, Winkel gleichmäßig, nie dieselbe Zeichnung zweimal in Folge', () => {
    for (const level of [1, 3, 4, 6, 8, 12]) {
      for (let seed = 1; seed <= 120; seed++) {
        const figs = round(seed, level);
        // Seiten
        expect(figs.filter((f) => f.side === 'left').length, `L${level} s${seed}`).toBe(10);
        // höchstens drei gleiche Seiten hintereinander
        let run = 1;
        for (let i = 1; i < figs.length; i++) {
          run = figs[i].side === figs[i - 1].side ? run + 1 : 1;
          expect(run).toBeLessThanOrEqual(MAX_RUN);
          // keine Wiederholung derselben Zeichnung
          expect(sameDrawing(figs[i], figs[i - 1]), `L${level} s${seed} i${i}`).toBe(false);
        }
        // Körperteil × Ansicht
        const combos = new Map<string, number>();
        for (const f of figs) combos.set(`${f.part}|${f.view}`, (combos.get(`${f.part}|${f.view}`) ?? 0) + 1);
        const nCombos = partsFor(level).length * VIEWS.length;
        expect(combos.size, `L${level}`).toBe(nCombos);
        const cs = [...combos.values()];
        expect(Math.max(...cs) - Math.min(...cs), `L${level} s${seed} combos ${cs}`).toBeLessThanOrEqual(1);
        // Winkel: jeder kommt vor, Häufigkeiten unterscheiden sich um höchstens 2
        const angs = new Map<number, number>();
        for (const f of figs) angs.set(f.angle, (angs.get(f.angle) ?? 0) + 1);
        expect(angs.size, `L${level}`).toBe(anglesFor(level).length);
        const as = [...angs.values()];
        expect(Math.max(...as) - Math.min(...as), `L${level} s${seed} angles ${as}`).toBeLessThanOrEqual(2);
        // nur erlaubte Werte
        for (const f of figs) {
          expect(partsFor(level)).toContain(f.part);
          expect(anglesFor(level)).toContain(f.angle);
        }
      }
    }
  });

  it('Runde: jede Seite sieht jede Ansicht (links/rechts nicht mit der Ansicht vermischt)', () => {
    for (let seed = 1; seed <= 60; seed++) {
      const figs = round(seed, 6);
      for (const side of ['left', 'right'] as Side[]) {
        for (const view of VIEWS) expect(figs.some((f) => f.side === side && f.view === view), `s${seed}`).toBe(true);
      }
    }
  });

  it('Runde ist mit festem Seed reproduzierbar', () => {
    expect(round(42, 9)).toEqual(round(42, 9));
    expect(round(42, 9)).not.toEqual(round(43, 9));
  });
});

// ---------------------------------------------------------------------------
// Antwortfelder

describe('seite-erkennen: Feldanordnung und Wertung', () => {
  it('zwei Felder: kompatibel LINKS links, RECHTS rechts; vertauscht umgekehrt', () => {
    const rng = createRng(1);
    expect(arrangementFor(rng, 2, false)).toEqual(['left', 'right']);
    expect(arrangementFor(rng, 2, true)).toEqual(['right', 'left']);
  });

  it('vier Felder: jedes Wort genau einmal, nie die Grundanordnung, nie wie im Durchgang davor', () => {
    const rng = createRng(5);
    let prev: Word[] | undefined;
    const seen = new Set<string>();
    for (let i = 0; i < 400; i++) {
      const arr = arrangementFor(rng, 4, false, prev);
      expect([...arr].sort()).toEqual(['down', 'left', 'right', 'up']);
      expect(arr).not.toEqual([...REFERENCE_4]);
      if (prev) expect(arr).not.toEqual(prev);
      seen.add(arr.join());
      prev = arr;
    }
    expect(seen.size).toBeGreaterThan(15); // wirklich gemischt
  });

  it('vier Felder: LINKS liegt etwa gleich oft links wie rechts (Wort lesen statt Lage)', () => {
    const rng = createRng(11);
    let leftCol = 0;
    const n = 2000;
    for (let i = 0; i < n; i++) {
      const arr = arrangementFor(rng, 4, false);
      if (cellIsLeft(arr.indexOf('left'))) leftCol++;
    }
    expect(leftCol / n).toBeGreaterThan(0.42);
    expect(leftCol / n).toBeLessThan(0.58);
  });

  it('richtiges Feld trägt das Wort der Seite; OBEN/UNTEN sind nie richtig', () => {
    const rng = createRng(3);
    for (let i = 0; i < 100; i++) {
      for (const fields of [2, 4] as const) {
        const arr = arrangementFor(rng, fields, rng.chance(0.5));
        for (const side of ['left', 'right'] as Side[]) {
          const c = correctCell(arr, side);
          expect(c).toBeGreaterThanOrEqual(0);
          expect(arr[c]).toBe(side);
          expect(judge(arr[c], side)).toEqual({ outcome: 'hit', swap: false });
        }
      }
    }
    expect(judge('up', 'left')).toEqual({ outcome: 'wrong', swap: false });
    expect(judge('down', 'right')).toEqual({ outcome: 'wrong', swap: false });
    expect(judge('right', 'left')).toEqual({ outcome: 'wrong', swap: true });
    expect(judge('left', 'right')).toEqual({ outcome: 'wrong', swap: true });
  });

  it('Punkte steigen mit der Stufe und sinken mit der Zeit', () => {
    expect(pointsFor(5, 500, 6000)).toBeGreaterThan(pointsFor(1, 500, 6000));
    expect(pointsFor(3, 500, 6000)).toBeGreaterThan(pointsFor(3, 5500, 6000));
    expect(pointsFor(1, 99999, 6000)).toBe(10);
  });
});

// ---------------------------------------------------------------------------
// Auswertung

describe('seite-erkennen: Auswertung', () => {
  const rec = (angle: number, rt: number, outcome: TrialRecord['outcome'] = 'hit', swap = false): TrialRecord => ({ angle, outcome, rt, swap });

  it('Treffer %, Median, Seitenverwechslungen', () => {
    const s = computeStats([rec(0, 1000), rec(0, 1200), rec(90, 2500), rec(90, 0, 'wrong', true), rec(180, 0, 'wrong', false), rec(0, 6000, 'slow')]);
    expect(s.trials).toBe(6);
    expect(s.hits).toBe(3);
    expect(s.wrong).toBe(2);
    expect(s.slow).toBe(1);
    expect(s.swaps).toBe(1);
    expect(s.accuracy).toBeCloseTo(50, 9);
    expect(s.medianMs).toBe(1200);
  });

  it('Dreh-Aufschlag = Median gedreht (≥ 90°) minus Median aufrecht (≤ 15°), erst ab 3 richtigen je Gruppe', () => {
    const up = [rec(0, 900), rec(15, 1000), rec(-15, 1100)];
    const turned = [rec(90, 1900), rec(-90, 2000), rec(180, 2600)];
    const s = computeStats([...up, ...turned, rec(45, 5000)]);
    expect(s.uprightMs).toBe(1000);
    expect(s.turnedMs).toBe(2000);
    expect(s.rotationCostMs).toBe(1000);
    // zu wenig Durchgänge in einer Gruppe → kein Wert
    expect(computeStats([...up, rec(90, 2000), rec(180, 2200)]).rotationCostMs).toBeNull();
    expect(computeStats([]).rotationCostMs).toBeNull();
    // Fehler und „zu langsam“ zählen nicht in die Zeiten
    expect(computeStats([...up, ...turned, rec(90, 9999, 'wrong'), rec(90, 6000, 'slow')]).turnedMs).toBe(2000);
  });

  it('Tipps: swap, slow, turn, great', () => {
    const base = { trials: 20, hits: 10, wrong: 0, slow: 0, swaps: 0, accuracy: 50, medianMs: 1000, uprightMs: 1000, turnedMs: 1200, rotationCostMs: 200 };
    expect(tipFor({ ...base, swaps: 3 })).toBe('swap');
    expect(tipFor({ ...base, slow: 3 })).toBe('slow');
    expect(tipFor({ ...base, rotationCostMs: 900 })).toBe('turn');
    expect(tipFor(base)).toBe('great');
    expect(tipFor({ ...base, rotationCostMs: null })).toBe('great');
    // alle Tipps existieren in beiden Sprachen
    for (const k of ['swap', 'slow', 'turn', 'great']) {
      expect(de.tips[k]?.length).toBeGreaterThan(20);
      expect(itTexts.tips[k]?.length).toBeGreaterThan(20);
    }
  });
});

// ---------------------------------------------------------------------------
// Anordnung auf der Bühne

describe('seite-erkennen: Bühnen-Anordnung (Tablet quer/hoch, Handy)', () => {
  // Bühnengrößen wie in der App: Tablet quer 1180×820, hoch 820×1180, Handy 390×844 (abzüglich Kopfzeile ≈ 68 px)
  const STAGES: Array<[string, number, number]> = [
    ['tablet quer', 1180, 752],
    ['tablet hoch', 820, 1112],
    ['handy', 390, 776],
    ['kleines Handy', 320, 480],
  ];
  const overlap = (a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }) =>
    a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

  it('Felder ≥ 72 px hoch und ≥ 56 px breit, innerhalb der Bühne, ohne Überlappung, Schrift ≥ 30 px', () => {
    for (const [name, w, h] of STAGES) {
      for (const fields of [2, 4] as const) {
        const u = Math.min(w, h) / 100;
        const L = layoutFor(fields, w, h, u);
        expect(L.fields, name).toHaveLength(fields);
        for (const r of L.fields) {
          expect(r.h, `${name} ${fields}`).toBeGreaterThanOrEqual(MIN_FIELD_H);
          expect(r.w, `${name} ${fields}`).toBeGreaterThanOrEqual(MIN_FIELD_W);
          expect(r.x, name).toBeGreaterThanOrEqual(0);
          expect(r.x + r.w, name).toBeLessThanOrEqual(w);
          expect(r.y, name).toBeGreaterThan(0);
          expect(r.y + r.h, name).toBeLessThanOrEqual(h);
        }
        for (let i = 0; i < L.fields.length; i++) for (let j = i + 1; j < L.fields.length; j++) expect(overlap(L.fields[i], L.fields[j]), name).toBe(false);
        // zwei Felder: links und rechts nebeneinander
        if (fields === 2) expect(L.fields[0].x).toBeLessThan(L.fields[1].x);
        expect(L.fontPx).toBeGreaterThanOrEqual(FIELD_FONT_PX);
        // Abstand zwischen den Feldern mindestens 10 px (Fehltipps vermeiden)
        expect(L.gap).toBeGreaterThanOrEqual(10);
      }
    }
  });

  it('Kreis liegt auf der Bühne, über den Feldern und lässt Platz für die Rückmeldezeile; Hochformat nicht abgeschnitten', () => {
    for (const [name, w, h] of STAGES) {
      for (const fields of [2, 4] as const) {
        const L = layoutFor(fields, w, h, Math.min(w, h) / 100);
        const { cx, cy, r } = L.disc;
        expect(cx - r, name).toBeGreaterThanOrEqual(0);
        expect(cx + r, name).toBeLessThanOrEqual(w);
        expect(cy - r, name).toBeGreaterThanOrEqual(0);
        const top = Math.min(...L.fields.map((f) => f.y));
        expect(cy + r, `${name} ${fields}`).toBeLessThan(top);
        expect(L.labelY, name).toBeGreaterThan(cy + r);
        expect(L.labelY, name).toBeLessThan(top);
        expect(r, `${name} ${fields}`).toBeGreaterThanOrEqual(90);
      }
    }
  });

  it('Intro-Film (kompakt, kleine Bühne 16:11 mit Bildunterschrift): Kreis und Felder passen', () => {
    const w = 358;
    const h = 246;
    const L = layoutFor(2, w, h, h / 100, { compact: true, bottomReserve: 60 });
    expect(L.fields[0].y + L.fields[0].h).toBeLessThanOrEqual(h - 59);
    expect(L.disc.r).toBeGreaterThanOrEqual(34);
    expect(L.disc.cy + L.disc.r).toBeLessThan(L.fields[0].y);
    expect(L.disc.cy - L.disc.r).toBeGreaterThanOrEqual(0);
  });

  it('Feldfarben: dunkle Schrift auf Grün mit Kontrast ≥ 4,5 : 1 (gemessen nach WCAG)', () => {
    const lin = (c: number) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    const lum = (hex: string) => {
      const n = parseInt(hex.slice(1), 16);
      return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
    };
    const ratio = (a: string, b: string) => {
      const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
      return (hi + 0.05) / (lo + 0.05);
    };
    expect(ratio(FIELD_INK, FIELD_FILL)).toBeGreaterThanOrEqual(4.5);
    // Zeichnung auf hellem Kreis
    expect(ratio(FIGURE_STYLE.ink, '#E4EAF2')).toBeGreaterThanOrEqual(7);
  });
});

// ---------------------------------------------------------------------------
// Texte und Definition

describe('seite-erkennen: Texte und Definition', () => {
  it('Definition: Kennung, Kategorie, Stufenanzeige, Texte in beiden Sprachen mit gleichen Schlüsseln', () => {
    expect(seiteErkennen.id).toBe('seite-erkennen');
    expect(seiteErkennen.category).toBe('wahrnehmung');
    expect(seiteErkennen.showsLevel).toBe(true);
    expect(seiteErkennen.icon.length).toBeGreaterThan(40);
    for (const key of ['captions', 'metrics', 'tips', 'feedback'] as const) {
      expect(Object.keys(itTexts[key]).sort()).toEqual(Object.keys(de[key]).sort());
    }
    expect(de.steps.length).toBe(itTexts.steps.length);
    for (const t of [de, itTexts]) {
      expect(t.tagline.length).toBeLessThanOrEqual(80);
      for (const s of t.steps) expect(s.length).toBeLessThanOrEqual(60);
      for (const c of Object.values(t.captions)) expect(c.length).toBeLessThanOrEqual(40);
    }
  });

  it('Wörter auf den Feldern: DE LINKS/RECHTS/OBEN/UNTEN, IT SINISTRA/DESTRA/ALTO/BASSO', () => {
    expect([de.feedback.left, de.feedback.right, de.feedback.up, de.feedback.down]).toEqual(['LINKS', 'RECHTS', 'OBEN', 'UNTEN']);
    expect([itTexts.feedback.left, itTexts.feedback.right, itTexts.feedback.up, itTexts.feedback.down]).toEqual(['SINISTRA', 'DESTRA', 'ALTO', 'BASSO']);
  });

  it('Benennungen für alle Kombinationen vorhanden', () => {
    for (const t of [de, itTexts]) {
      for (const part of PARTS) {
        for (const side of ['left', 'right']) expect(t.feedback[`${part}_${side}`]?.length, `${part}_${side}`).toBeGreaterThan(3);
        for (const view of VIEWS) expect(t.feedback[`${view}_${part}`]?.length, `${view}_${part}`).toBeGreaterThan(3);
      }
    }
  });

  it('Neutral: keine Diagnose, kein „Test“, keine Normwerte; why endet mit „nicht belegt“ / „non è dimostrato“', () => {
    const forbidden = /\b(test|diagnos|normwert|valori normali|krank|malat|pathologi|patolog|therapi|terapi|heil|guarig|trainiert dein)/i;
    for (const t of [de, itTexts]) {
      const all = [t.title, t.tagline, ...t.steps, t.why, ...t.goodFor, ...Object.values(t.captions), ...Object.values(t.metrics), ...Object.values(t.tips)].join(' | ');
      expect(all.match(forbidden), all.match(forbidden)?.[0]).toBeNull();
    }
    expect(de.why.trim().endsWith('nicht belegt.')).toBe(true);
    expect(itTexts.why.trim().endsWith('non è dimostrato.')).toBe(true);
  });
});
