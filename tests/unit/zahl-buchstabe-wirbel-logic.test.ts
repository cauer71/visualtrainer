import { describe, expect, it } from 'vitest';
import { createFormatter } from '../../src/core/format';
import { createRng } from '../../src/core/rng';
import type { Exercise, ExerciseContext, ExerciseResult, PointerInfo } from '../../src/core/types';
import { zahlBuchstabeWirbel } from '../../src/exercises/zahl-buchstabe-wirbel';
import { de, it as itTexts } from '../../src/exercises/zahl-buchstabe-wirbel/texts';
import * as L from '../../src/exercises/zahl-buchstabe-wirbel/logic';

/** Bühnen der drei Prüf-Bildschirme (Höhe = Fenster minus Kopfleiste) */
const STAGES = {
  quer: { w: 1180, h: 750 },
  hoch: { w: 820, h: 1110 },
  handy: { w: 390, h: 781 },
} as const;

interface Setup {
  orbits: L.Orbit[];
  halves: L.Half[];
  arena: L.Rect;
  F: number;
  u: number;
}

function setup(level: number, w: number, h: number, seed: number, opt: L.OrbitOptions = {}, lang = 'de'): Setup {
  const rng = createRng(seed);
  const u = Math.min(w, h) / 100;
  const F = L.glyphPx(u);
  const geom = L.fieldGeometry(w, h, u, h - 8);
  const arena = L.arenaRect(geom.field, L.arenaFractionFor(level, F, geom.field.w * geom.field.h));
  const halves = L.sequence(L.pairsFor(level), L.lettersFor(lang)).map((lab) => L.visibleHalf(lab, F));
  const orbits = L.buildOrbits(halves, level, arena, rng, opt);
  return { orbits, halves, arena, F, u };
}

const center = (a: L.Rect) => ({ x: a.x + a.w / 2, y: a.y + a.h / 2 });

/** Anzahl Zeichenpaare, deren sichtbare Kästen sich beim Drehwinkel θ überdecken */
function overlappingPairs(s: Setup, theta: number): number {
  const pts = s.orbits.map((o) => L.orbitPos(o, theta));
  let n = 0;
  for (let a = 0; a < pts.length; a++) {
    for (let b = a + 1; b < pts.length; b++) {
      const ox = s.halves[a].hw + s.halves[b].hw - Math.abs(pts[a].x - pts[b].x);
      const oy = s.halves[a].hh + s.halves[b].hh - Math.abs(pts[a].y - pts[b].y);
      if (ox > 0 && oy > 0) n++;
    }
  }
  return n;
}

/** Ein voller Umlauf in `n` gleichen Winkelschritten */
const sweep = (n: number): number[] => Array.from({ length: n }, (_, k) => (2 * Math.PI * k) / n);

describe('Stufen', () => {
  it('Paare 3 → 15 (höchstens 15 auf Stufe 12), Zeichen 6 → 30, nie fallend', () => {
    expect(L.pairsFor(1)).toBe(3);
    expect(L.pairsFor(12)).toBe(15);
    expect(Array.from({ length: 12 }, (_, i) => L.pairsFor(i + 1))).toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15]);
    expect(L.charsFor(1)).toBe(6);
    expect(L.charsFor(12)).toBe(30);
    for (let l = 2; l <= 12; l++) expect(L.pairsFor(l)).toBeGreaterThanOrEqual(L.pairsFor(l - 1));
    expect(L.pairsFor(12)).toBeLessThanOrEqual(L.MAX_PAIRS);
  });

  it('Drehung: eine Umdrehung in 60 s (Stufe 1, sehr langsam) bis 20 s (Stufe 12), ω wächst mit der Stufe', () => {
    expect(L.periodFor(1)).toBeCloseTo(60, 9);
    expect(L.periodFor(12)).toBeCloseTo(20, 9);
    expect(L.omegaFor(1)).toBeCloseTo((2 * Math.PI) / 60, 9);
    expect(L.omegaFor(12)).toBeCloseTo((2 * Math.PI) / 20, 9);
    expect(L.periodFor(2)).toBeGreaterThan(55);
    for (let l = 2; l <= 12; l++) {
      expect(L.omegaFor(l)).toBeGreaterThan(L.omegaFor(l - 1));
      expect(L.periodFor(l)).toBeGreaterThanOrEqual(20);
      expect(L.periodFor(l)).toBeLessThanOrEqual(60);
    }
    expect(L.thetaAt(L.omegaFor(12), 20_000)).toBeCloseTo(2 * Math.PI, 9);
  });

  it('Versatz der Drehmittelpunkte: Stufe 1 → ±3 %, Stufe 12 → ±28 %, streng steigend', () => {
    expect(L.offsetFracFor(1)).toBeCloseTo(0.03, 9);
    expect(L.offsetFracFor(12)).toBeCloseTo(0.28, 9);
    for (let l = 2; l <= 12; l++) expect(L.offsetFracFor(l)).toBeGreaterThan(L.offsetFracFor(l - 1));
  });

  it('Ellipsenanteil steigt von 30 % (Stufe 1) auf 70 % (Stufe 12)', () => {
    expect(L.ellipseFracFor(1)).toBeCloseTo(0.3, 9);
    expect(L.ellipseFracFor(12)).toBeCloseTo(0.7, 9);
    for (let l = 2; l <= 12; l++) expect(L.ellipseFracFor(l)).toBeGreaterThan(L.ellipseFracFor(l - 1));
  });

  it('Gegenrichtung: Stufe 1–2 keine, Stufe 3 → 10 %, Stufe 12 → 50 %, danach steigend', () => {
    expect(L.reverseFracFor(1)).toBe(0);
    expect(L.reverseFracFor(2)).toBe(0);
    expect(L.reverseFracFor(3)).toBeCloseTo(0.1, 9);
    expect(L.reverseFracFor(12)).toBeCloseTo(0.5, 9);
    for (let l = 4; l <= 12; l++) expect(L.reverseFracFor(l)).toBeGreaterThan(L.reverseFracFor(l - 1));
  });

  it('Dichte steigt: Spielfläche je Zeichen und Mindestabstand fallen', () => {
    for (let l = 2; l <= 12; l++) {
      expect(L.areaPerCharFor(l)).toBeLessThan(L.areaPerCharFor(l - 1));
      expect(L.separationFor(l)).toBeLessThanOrEqual(L.separationFor(l - 1));
    }
    // bis Stufe 5 berühren sich Zeichen nie, ab Stufe 6 darf teilweise überlappt werden
    for (let l = 1; l <= 5; l++) expect(L.separationFor(l)).toBeGreaterThanOrEqual(1);
    expect(L.separationFor(6)).toBeLessThan(1);
    // nie so tief, dass ein Zeichen unlesbar wird
    expect(L.separationFor(12)).toBeGreaterThanOrEqual(0.4);
  });

  it('Zeit je Zeichen: 3,6 s − 0,15 s · Stufe (mind. 1,8 s) plus 30 ms je Zeichen über 6', () => {
    expect(L.limitPerCharMs(1)).toBe(3450);
    expect(L.limitPerCharMs(6)).toBe(2700 + 30 * 10); // 16 Zeichen
    expect(L.limitPerCharMs(12)).toBe(1800 + 30 * 24);
    expect(L.limitPerCharMs(40)).toBe(L.limitPerCharMs(12));
    // Stufe 12 (30 Zeichen) bleibt gut tippbar: mindestens 2,5 s je Zeichen
    expect(L.limitPerCharMs(12)).toBeGreaterThanOrEqual(2500);
    for (let l = 2; l <= 12; l++) expect(L.limitPerCharMs(l)).toBeLessThan(L.limitPerCharMs(l - 1));
  });

  it('Runde geschafft: höchstens 1 Fehltipp und im Zeitrahmen', () => {
    const lim = L.limitPerCharMs(5) * 10;
    expect(L.roundSuccess(0, lim, 10, 5)).toBe(true);
    expect(L.roundSuccess(1, lim, 10, 5)).toBe(true);
    expect(L.roundSuccess(2, lim, 10, 5)).toBe(false);
    expect(L.roundSuccess(0, lim + 10, 10, 5)).toBe(false);
  });

  it('Stufe wird begrenzt', () => {
    expect(L.levelOf(0)).toBe(1);
    expect(L.levelOf(5.9)).toBe(5);
    expect(L.levelOf(99)).toBe(12);
  });
});

describe('Folge', () => {
  it('wechselt Zahl und Buchstabe: 1 – A – 2 – B – 3 – C …', () => {
    expect(L.sequence(3)).toEqual(['1', 'A', '2', 'B', '3', 'C']);
    expect(L.sequence(3, L.lettersFor('it'))).toEqual(['1', 'A', '2', 'B', '3', 'C']);
  });

  it('Deutsch: A–O (15 Buchstaben); Zahl n gehört zum n-ten Buchstaben', () => {
    expect(L.LETTERS_DE).toBe('ABCDEFGHIJKLMNO');
    expect(L.lettersFor('de')).toBe(L.LETTERS_DE);
    const seq = L.sequence(15, L.LETTERS_DE);
    expect(seq.length).toBe(30);
    expect(seq.slice(-4)).toEqual(['14', 'N', '15', 'O']);
    for (let n = 1; n <= 15; n++) {
      expect(L.labelAt(2 * (n - 1))).toBe(String(n));
      expect(L.labelAt(2 * (n - 1) + 1)).toBe(String.fromCharCode(64 + n));
    }
  });

  it('Italienisch: 15 Buchstaben des italienischen Alphabets ohne J und K (A B C D E F G H I L M N O P Q)', () => {
    expect(L.LETTERS_IT).toBe('ABCDEFGHILMNOPQ');
    expect(L.LETTERS_IT.length).toBe(15);
    expect(L.LETTERS_IT).not.toContain('J');
    expect(L.LETTERS_IT).not.toContain('K');
    expect(L.lettersFor('it')).toBe(L.LETTERS_IT);
    const seq = L.sequence(15, L.LETTERS_IT);
    expect(seq.length).toBe(30);
    expect(seq.slice(-4)).toEqual(['14', 'P', '15', 'Q']);
    expect(seq.slice(16, 20)).toEqual(['9', 'I', '10', 'L']); // nach I kommt L
  });

  it('ungerade Positionen sind Buchstaben, gerade Zahlen; Beschriftungen sind in beiden Sprachen eindeutig', () => {
    for (const letters of [L.LETTERS_DE, L.LETTERS_IT]) {
      const seq = L.sequence(L.MAX_PAIRS, letters);
      expect(new Set(seq).size).toBe(seq.length);
      seq.forEach((lab, k) => {
        expect(L.isLetterAt(k)).toBe(k % 2 === 1);
        expect(/^[A-Z]$/.test(lab)).toBe(L.isLetterAt(k));
      });
    }
    expect(L.MAX_PAIRS).toBe(15);
  });

  it('mehr Paare als Buchstaben gibt es nicht', () => {
    expect(L.sequence(99).length).toBe(30);
    expect(L.sequence(99, L.LETTERS_IT).length).toBe(30);
  });
});

describe('Größen und Trefferflächen', () => {
  it('Schrift ≥ 34 px, Trefferfläche ≥ 56 px breit und hoch', () => {
    for (const u of [2.5, 3.9, 5, 7.5, 8.2, 12, 20]) {
      const F = L.glyphPx(u);
      expect(F).toBeGreaterThanOrEqual(34);
      for (const lab of L.sequence(L.MAX_PAIRS).concat(['10', '14'])) {
        const hit = L.hitHalf(L.visibleHalf(lab, F));
        expect(hit.hx * 2).toBeGreaterThanOrEqual(56);
        expect(hit.hy * 2).toBeGreaterThanOrEqual(56);
      }
    }
  });

  it('Trefferfläche ist größer als das sichtbare Zeichen', () => {
    const F = L.glyphPx(8);
    const v = L.visibleHalf('B', F);
    const h = L.hitHalf(v);
    expect(h.hx).toBeGreaterThan(v.hw);
    expect(h.hy).toBeGreaterThan(v.hh);
  });

  it('Spielfeld liegt auf allen Bühnen ganz innerhalb, unter der Anzeige', () => {
    for (const { w, h } of Object.values(STAGES)) {
      const u = Math.min(w, h) / 100;
      const g = L.fieldGeometry(w, h, u, h - Math.max(8, u * 1.6));
      expect(g.pill.y).toBeGreaterThanOrEqual(0);
      expect(g.pill.h).toBeGreaterThanOrEqual(54);
      expect(g.field.y).toBeGreaterThan(g.pill.y + g.pill.h);
      expect(g.field.x).toBeGreaterThanOrEqual(0);
      expect(g.field.x + g.field.w).toBeLessThanOrEqual(w);
      expect(g.field.y + g.field.h).toBeLessThanOrEqual(h);
      expect(g.field.h).toBeGreaterThan(g.field.w * 0.3);
    }
  });

  it('Intro-Film: Spielfeld endet über dem Platz für Hand und Bildunterschrift', () => {
    const w = 560;
    const h = 385;
    const u = Math.min(w, h) / 100;
    const g = L.fieldGeometry(w, h, u, 270);
    expect(g.field.y + g.field.h).toBeLessThanOrEqual(270);
    expect(g.field.h).toBeGreaterThan(100);
  });

  it('Spielfläche liegt mittig im Spielfeld, Fläche = Anteil', () => {
    const field = { x: 10, y: 80, w: 1000, h: 600 };
    const a = L.arenaRect(field, 0.25);
    expect(a.w).toBeCloseTo(500, 6);
    expect(a.h).toBeCloseTo(300, 6);
    expect(a.x + a.w / 2).toBeCloseTo(field.x + field.w / 2, 6);
    expect(a.y + a.h / 2).toBeCloseTo(field.y + field.h / 2, 6);
    expect(L.arenaRect(field, 1)).toEqual(field);
  });

  it('Dichte (Fläche je Zeichen in Zeichengrößen) ist auf Handy und Tablet gleich – außer das Spielfeld ist schon voll genutzt', () => {
    const dens = (level: number, w: number, h: number) => {
      const u = Math.min(w, h) / 100;
      const F = L.glyphPx(u);
      const f = L.fieldGeometry(w, h, u, h - 8).field;
      const frac = L.arenaFractionFor(level, F, f.w * f.h);
      const a = L.arenaRect(f, frac);
      return { k: (a.w * a.h) / (L.charsFor(level) * F * F), frac };
    };
    for (let level = 1; level <= 12; level++) {
      const quer = dens(level, STAGES.quer.w, STAGES.quer.h);
      for (const st of [STAGES.hoch, STAGES.handy]) {
        const d = dens(level, st.w, st.h);
        if (d.frac < 1 && quer.frac < 1) expect(Math.abs(d.k - quer.k) / quer.k).toBeLessThan(0.06);
        else expect(d.frac).toBeLessThanOrEqual(1);
      }
    }
    // auf dem Tablet quer ist die Spielfläche bei Stufe 12 kleiner als das Spielfeld
    const u = 7.5;
    const f = L.fieldGeometry(1180, 750, u, 742).field;
    expect(L.arenaFractionFor(12, L.glyphPx(u), f.w * f.h)).toBeLessThan(0.9);
  });
});

describe('Farben (Kontrast ≥ 4,5 : 1)', () => {
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const lum = (hex: string) => {
    const n = parseInt(hex.slice(1), 16);
    return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  };
  const contrast = (a: string, b: string) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  };

  it('Zeichen auf hellem und grauem Grund', () => {
    expect(contrast(L.PALETTE.ink, L.PALETTE.bgCenter)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(L.PALETTE.ink, L.PALETTE.bgEdge)).toBeGreaterThanOrEqual(4.5);
  });

  it('Anzeige: Beschriftung auf Weiß, weiße Schrift auf Akzent und Grün', () => {
    expect(contrast(L.PALETTE.label, '#FFFFFF')).toBeGreaterThanOrEqual(4.5);
    expect(contrast('#FFFFFF', L.PALETTE.accent)).toBeGreaterThanOrEqual(4.5);
    expect(contrast('#FFFFFF', L.PALETTE.ok)).toBeGreaterThanOrEqual(4.5);
  });
});

describe('Kreisbewegung um versetzte Mittelpunkte: Formel', () => {
  const o: L.Orbit = { cx: 100, cy: 200, bx: 130, by: 200 };

  it('p(t) = c + Rot(ωt)·(b − c): Start bei b, Viertelumdrehung im Uhrzeigersinn, halbe Umdrehung gegenüber', () => {
    const p0 = L.orbitPos(o, 0);
    expect(p0.x).toBeCloseTo(130, 9);
    expect(p0.y).toBeCloseTo(200, 9);
    const p1 = L.orbitPos(o, Math.PI / 2); // y zeigt nach unten: rechts → unten = Uhrzeigersinn
    expect(p1.x).toBeCloseTo(100, 9);
    expect(p1.y).toBeCloseTo(230, 9);
    const p2 = L.orbitPos(o, Math.PI);
    expect(p2.x).toBeCloseTo(70, 9);
    expect(p2.y).toBeCloseTo(200, 9);
    const p4 = L.orbitPos(o, 2 * Math.PI);
    expect(p4.x).toBeCloseTo(130, 9);
    expect(p4.y).toBeCloseTo(200, 9);
  });

  it('Abstand zum eigenen Mittelpunkt bleibt zu jedem Zeitpunkt gleich', () => {
    const q: L.Orbit = { cx: 310, cy: 95, bx: 280, by: 170 };
    for (const th of sweep(97)) {
      const p = L.orbitPos(q, th);
      expect(Math.hypot(p.x - q.cx, p.y - q.cy)).toBeCloseTo(L.orbitRadius(q), 9);
    }
  });

  it('Winkel = ω · Zeit: nach T Sekunden wieder am Start, nach T/2 gegenüber', () => {
    const omega = L.omegaFor(6);
    const T = L.periodFor(6) * 1000;
    const a = L.orbitPos(o, L.thetaAt(omega, T));
    expect(a.x).toBeCloseTo(130, 6);
    expect(a.y).toBeCloseTo(200, 6);
    const b = L.orbitPos(o, L.thetaAt(omega, T / 2));
    expect(b.x).toBeCloseTo(70, 6);
  });

  it('Ellipse: Halbachsen im Verhältnis k : 1, Start bei b, Viertelumdrehung auf der y-Halbachse', () => {
    const e: L.Orbit = { cx: 500, cy: 300, bx: 800, by: 300, k: 3, dir: 1, ell: true }; // Halbachsen 300 × 100
    expect(L.orbitRadius(e)).toBeCloseTo(100, 9);
    expect(L.orbitExtent(e).rx).toBeCloseTo(300, 9);
    expect(L.orbitExtent(e).ry).toBeCloseTo(100, 9);
    const p0 = L.orbitPos(e, 0);
    expect(p0.x).toBeCloseTo(800, 9);
    expect(p0.y).toBeCloseTo(300, 9);
    const p1 = L.orbitPos(e, Math.PI / 2);
    expect(p1.x).toBeCloseTo(500, 9);
    expect(p1.y).toBeCloseTo(400, 9); // Uhrzeigersinn: rechts → unten
    for (const th of sweep(73)) {
      const p = L.orbitPos(e, th);
      expect(((p.x - 500) / 300) ** 2 + ((p.y - 300) / 100) ** 2).toBeCloseTo(1, 9);
    }
  });

  it('Gegenrichtung: dir = −1 läuft gegen den Uhrzeigersinn, gleiche Bahn, gleiche Geschwindigkeit', () => {
    const cw: L.Orbit = { cx: 100, cy: 200, bx: 130, by: 200, dir: 1 };
    const ccw: L.Orbit = { ...cw, dir: -1 };
    expect(L.orbitPos(ccw, Math.PI / 2).y).toBeCloseTo(170, 9); // rechts → oben
    expect(L.orbitPos(ccw, Math.PI / 2).x).toBeCloseTo(100, 9);
    for (const th of sweep(37)) {
      const a = L.orbitPos(cw, th);
      const b = L.orbitPos(ccw, -th);
      expect(a.x).toBeCloseTo(b.x, 9);
      expect(a.y).toBeCloseTo(b.y, 9);
    }
  });

  it('alle Zeichen drehen mit derselben Winkelgeschwindigkeit; die Richtung ist je Zeichen +1 oder −1', () => {
    const s = setup(12, 1180, 750, 5);
    const t0 = 0.4;
    const dTheta = 0.9;
    let reversed = 0;
    s.orbits.forEach((q) => {
      if (L.orbitRadius(q) < 5) return;
      const k = q.k ?? 1;
      const a = L.orbitPos(q, t0);
      const b = L.orbitPos(q, t0 + dTheta);
      // Winkel im normierten Raum (x durch k geteilt): Ellipsen drehen dort wie Kreise
      let d = Math.atan2(b.y - q.cy, (b.x - q.cx) / k) - Math.atan2(a.y - q.cy, (a.x - q.cx) / k);
      d = Math.atan2(Math.sin(d), Math.cos(d));
      expect(d).toBeCloseTo((q.dir ?? 1) * dTheta, 9);
      if (q.dir === -1) reversed++;
    });
    expect(reversed).toBeGreaterThan(0);
    expect(reversed).toBeLessThan(s.orbits.length);
  });

  it('starre Drehung bei Versatz 0 (nur Kreise, alle gleich herum): alle Abstände zwischen den Zeichen bleiben konstant', () => {
    for (const { w, h } of Object.values(STAGES)) {
      for (const level of [1, 6, 12]) {
        const s = setup(level, w, h, 3, { offsetFrac: 0, ellipseFrac: 0, reverseFrac: 0 });
        const c = center(s.arena);
        for (const q of s.orbits) {
          expect(q.cx).toBeCloseTo(c.x, 9);
          expect(q.cy).toBeCloseTo(c.y, 9);
        }
        const dist = (th: number) => {
          const ps = s.orbits.map((q) => L.orbitPos(q, th));
          const out: number[] = [];
          for (let a = 0; a < ps.length; a++) for (let b = a + 1; b < ps.length; b++) out.push(Math.hypot(ps[a].x - ps[b].x, ps[a].y - ps[b].y));
          return out;
        };
        const d0 = dist(0);
        for (const th of sweep(40)) dist(th).forEach((d, i) => expect(d).toBeCloseTo(d0[i], 6));
      }
    }
  });

  it('mit Versatz ändern sich die Abstände: je größer der Versatz, desto stärker', () => {
    // Schwankung des Abstands zweier Zeichen über eine Umdrehung, gemittelt über alle Paare
    const swing = (level: number): number => {
      let sum = 0;
      let n = 0;
      for (let seed = 1; seed <= 6; seed++) {
        const s = setup(level, 1180, 750, seed, { ellipseFrac: 0, reverseFrac: 0 });
        for (let a = 0; a < s.orbits.length; a++) {
          for (let b = a + 1; b < s.orbits.length; b++) {
            const ds = sweep(36).map((th) => {
              const pa = L.orbitPos(s.orbits[a], th);
              const pb = L.orbitPos(s.orbits[b], th);
              return Math.hypot(pa.x - pb.x, pa.y - pb.y);
            });
            sum += (Math.max(...ds) - Math.min(...ds)) / s.F;
            n++;
          }
        }
      }
      return sum / n;
    };
    const s1 = swing(1);
    const s6 = swing(6);
    const s12 = swing(12);
    expect(s6).toBeGreaterThan(s1 * 1.5);
    expect(s12).toBeGreaterThan(s6);
  });
});

describe('Bahnen und Aufstellung', () => {
  it('ist mit gleichem Startwert gleich, mit anderem verschieden', () => {
    const a = setup(9, 1180, 750, 7);
    const b = setup(9, 1180, 750, 7);
    const c = setup(9, 1180, 750, 8);
    expect(a.orbits).toEqual(b.orbits);
    expect(a.orbits.map((q) => q.cx)).not.toEqual(c.orbits.map((q) => q.cx));
  });

  it('Anteil Ellipsen und Gegenläufer ist je Stufe fest (Zufall nur bei der Auswahl); Ellipsen haben das Halbachsenverhältnis der Fläche', () => {
    for (const { w, h } of Object.values(STAGES)) {
      for (let level = 1; level <= 12; level++) {
        for (let seed = 1; seed <= 5; seed++) {
          const s = setup(level, w, h, seed);
          const n = s.orbits.length;
          const nEll = s.orbits.filter((q) => q.ell).length;
          const nRev = s.orbits.filter((q) => q.dir === -1).length;
          expect(nEll, `Ellipsen Stufe ${level}`).toBe(Math.max(1, Math.round(L.ellipseFracFor(level) * n)));
          expect(nRev, `Gegenläufer Stufe ${level}`).toBe(Math.round(L.reverseFracFor(level) * n));
          s.orbits.forEach((q, i) => {
            if (!q.ell) {
              expect(q.k).toBe(1);
              return;
            }
            const r = L.centerRange(s.arena, s.halves[i]);
            expect(q.k).toBeCloseTo((r.maxX - r.minX) / (r.maxY - r.minY), 9);
          });
        }
      }
    }
    // Stufe 1–2: alle gleich herum; die Auswahl hängt vom Startwert ab
    for (let seed = 1; seed <= 5; seed++) {
      for (const level of [1, 2]) expect(setup(level, 1180, 750, seed).orbits.every((q) => q.dir === 1)).toBe(true);
    }
    expect(setup(9, 1180, 750, 1).orbits.map((q) => q.ell)).not.toEqual(setup(9, 1180, 750, 2).orbits.map((q) => q.ell));
    expect(setup(9, 1180, 750, 1).orbits.map((q) => q.dir)).not.toEqual(setup(9, 1180, 750, 2).orbits.map((q) => q.dir));
  });

  it('die Fläche wird ausgefüllt: auf Stufe 1–6 belegen die Bahnen mindestens 70 % der Breite und Höhe (quer, hoch, Handy)', () => {
    for (const { w, h } of Object.values(STAGES)) {
      for (let level = 1; level <= 6; level++) {
        for (let seed = 1; seed <= 8; seed++) {
          const s = setup(level, w, h, seed);
          let minX = Infinity;
          let maxX = -Infinity;
          let minY = Infinity;
          let maxY = -Infinity;
          for (const th of sweep(180)) {
            s.orbits.forEach((q, i) => {
              const p = L.orbitPos(q, th);
              minX = Math.min(minX, p.x - s.halves[i].hw);
              maxX = Math.max(maxX, p.x + s.halves[i].hw);
              minY = Math.min(minY, p.y - s.halves[i].hh);
              maxY = Math.max(maxY, p.y + s.halves[i].hh);
            });
          }
          expect((maxX - minX) / s.arena.w, `Breite, Stufe ${level}, ${w}×${h}, Startwert ${seed}`).toBeGreaterThanOrEqual(0.7);
          expect((maxY - minY) / s.arena.h, `Höhe, Stufe ${level}, ${w}×${h}, Startwert ${seed}`).toBeGreaterThanOrEqual(0.7);
        }
      }
    }
  });

  it('reine Kreise füllen die Fläche deutlich schlechter als die Mischung (Querformat, Stufe 3)', () => {
    const cover = (opt: L.OrbitOptions) => {
      let sum = 0;
      for (let seed = 1; seed <= 8; seed++) {
        const s = setup(3, 1180, 750, seed, opt);
        const xs = s.orbits.flatMap((q) => sweep(90).map((th) => L.orbitPos(q, th).x));
        sum += (Math.max(...xs) - Math.min(...xs)) / s.arena.w;
      }
      return sum / 8;
    };
    expect(cover({ ellipseFrac: 0 })).toBeLessThan(0.7);
    expect(cover({})).toBeGreaterThan(0.85);
  });

  it('Mindestabstand stimmt für jede Kombination (Kreis/Ellipse, gleich/gegensinnig): Abtastung findet jede Begegnung', () => {
    const half = { hw: 20, hh: 20 };
    // gleichsinnig: konstanter Abstand 141 px → nie eng
    const a: L.Orbit = { cx: 0, cy: 0, bx: 100, by: 0, dir: 1 };
    const sameB: L.Orbit = { cx: 0, cy: 0, bx: 0, by: 100, dir: 1 };
    expect(L.pairViolation(a, half, sameB, half, 1)).toBe(0);
    // gegensinnig, gleiche Startpunkte: sie begegnen sich nach einem Achtel der Umdrehung
    expect(L.pairViolation(a, half, { ...sameB, dir: -1 }, half, 1)).toBeGreaterThan(20);
    // Ellipse gegen Kreis, gegensinnig, weit entfernte Mittelpunkte: keine Begegnung möglich
    const e: L.Orbit = { cx: 0, cy: 0, bx: 300, by: 0, k: 3, dir: -1, ell: true };
    expect(L.pairViolation(e, half, { cx: 900, cy: 0, bx: 950, by: 0 }, half, 1)).toBe(0);
    // zufällige Paare aller Kombinationen: die schnelle Prüfung verpasst nie eine tiefe Überdeckung
    const rng = createRng(77);
    let deep = 0;
    for (let i = 0; i < 400; i++) {
      const mk = (): L.Orbit => {
        const ell = rng.chance(0.5);
        return { cx: rng.range(0, 400), cy: rng.range(0, 250), bx: rng.range(0, 800), by: rng.range(0, 500), k: ell ? rng.range(1.2, 3) : 1, ell, dir: rng.chance(0.5) ? 1 : -1 };
      };
      const p = mk();
      const q = mk();
      // Referenz: sehr feine Abtastung mit orbitPos
      let ref = 0;
      for (const th of sweep(1440)) {
        const A = L.orbitPos(p, th);
        const B = L.orbitPos(q, th);
        const ox = half.hw * 2 - Math.abs(A.x - B.x);
        const oy = half.hh * 2 - Math.abs(A.y - B.y);
        if (ox > 0 && oy > 0) ref = Math.max(ref, Math.min(ox, oy));
      }
      const fast = L.pairViolation(p, half, q, half, 1);
      if (ref > 8) {
        deep++;
        expect(fast).toBeGreaterThan(0);
      }
      expect(Math.abs(fast - ref)).toBeLessThan(12);
    }
    expect(deep).toBeGreaterThan(10);
  });

  it('die Zeichen bleiben zu jedem Zeitpunkt vollständig in der Spielfläche (alle Stufen, alle Bühnen)', () => {
    for (const { w, h } of Object.values(STAGES)) {
      for (let level = 1; level <= 12; level++) {
        for (let seed = 1; seed <= 4; seed++) {
          const s = setup(level, w, h, seed);
          let outside = 0;
          let unfit = 0;
          s.orbits.forEach((q, i) => {
            const r = L.centerRange(s.arena, s.halves[i]);
            if (!L.orbitFits(q, s.arena, s.halves[i])) unfit++;
            // über eine volle Umdrehung nachgemessen (nicht nur über die Kreisformel); Kasten des Zeichens inklusive
            for (const th of sweep(180)) {
              const p = L.orbitPos(q, th);
              if (p.x < r.minX - 1e-6 || p.x > r.maxX + 1e-6 || p.y < r.minY - 1e-6 || p.y > r.maxY + 1e-6) outside++;
              const hw = s.halves[i].hw;
              const hh = s.halves[i].hh;
              if (p.x - hw < s.arena.x - 1e-6 || p.x + hw > s.arena.x + s.arena.w + 1e-6 || p.y - hh < s.arena.y - 1e-6 || p.y + hh > s.arena.y + s.arena.h + 1e-6) outside++;
            }
          });
          expect({ unfit, outside }, `Stufe ${level}, ${w}×${h}, Startwert ${seed}`).toEqual({ unfit: 0, outside: 0 });
        }
      }
    }
  });

  it('die Spielfläche liegt in der Bühne: Zeichen sind nie abgeschnitten', () => {
    for (const { w, h } of Object.values(STAGES)) {
      const u = Math.min(w, h) / 100;
      const geom = L.fieldGeometry(w, h, u, h - Math.max(8, u * 1.6));
      for (let level = 1; level <= 12; level++) {
        const s = setup(level, w, h, 2);
        expect(s.arena.x).toBeGreaterThanOrEqual(geom.field.x - 1e-6);
        expect(s.arena.x + s.arena.w).toBeLessThanOrEqual(geom.field.x + geom.field.w + 1e-6);
        expect(s.arena.y).toBeGreaterThanOrEqual(geom.pill.y + geom.pill.h);
        expect(s.arena.y + s.arena.h).toBeLessThanOrEqual(h);
      }
    }
  });

  it('Versatz steigt mit der Stufe, für x und y getrennt (Anteil an Breite bzw. Höhe der Spielfläche)', () => {
    const stat = (level: number, w: number, h: number) => {
      let sx = 0;
      let sy = 0;
      let n = 0;
      let mx = 0;
      let my = 0;
      for (let seed = 1; seed <= 12; seed++) {
        const s = setup(level, w, h, seed);
        const c = center(s.arena);
        for (const q of s.orbits) {
          const ax = Math.abs(q.cx - c.x) / s.arena.w;
          const ay = Math.abs(q.cy - c.y) / s.arena.h;
          sx += ax;
          sy += ay;
          mx = Math.max(mx, ax);
          my = Math.max(my, ay);
          n++;
        }
      }
      return { x: sx / n, y: sy / n, maxX: mx, maxY: my };
    };
    for (const { w, h } of Object.values(STAGES)) {
      const st = Array.from({ length: 12 }, (_, i) => stat(i + 1, w, h));
      for (let l = 1; l <= 12; l++) {
        const f = L.offsetFracFor(l);
        // nie über dem Rechteck ±(Versatz_x, Versatz_y) der Stufe, getrennt nach x und y
        expect(st[l - 1].maxX).toBeLessThanOrEqual(f + 1e-9);
        expect(st[l - 1].maxY).toBeLessThanOrEqual(f + 1e-9);
      }
      // steigt über die Stufen (in Gruppen, damit der Zufall nicht stört) – in x und in y
      for (const k of ['x', 'y'] as const) {
        const avg = (a: number, b: number) => st.slice(a - 1, b).reduce((s, v) => s + v[k], 0) / (b - a + 1);
        expect(avg(4, 6)).toBeGreaterThan(avg(1, 3));
        expect(avg(7, 9)).toBeGreaterThan(avg(4, 6));
        expect(avg(10, 12)).toBeGreaterThan(avg(7, 9));
        expect(st[11][k]).toBeGreaterThan(st[0][k] * 3);
      }
      // Stufe 1 klein (≤ 3 %), Stufe 12 groß (der Versatz wird in beiden Richtungen ausgeschöpft)
      expect(st[0].maxX).toBeLessThanOrEqual(0.03 + 1e-9);
      expect(st[0].maxY).toBeLessThanOrEqual(0.03 + 1e-9);
      expect(st[11].maxX).toBeGreaterThan(0.18);
      expect(st[11].maxY).toBeGreaterThan(0.18);
      expect(st[11].maxX).toBeLessThanOrEqual(0.28 + 1e-9);
    }
  });

  it('Versatz in Pixeln: x und y getrennt skaliert (Querformat: x-Versatz größer als y-Versatz)', () => {
    const s = setup(12, 1180, 750, 4);
    const f = L.offsetFracFor(12);
    expect(f * s.arena.w).toBeGreaterThan(f * s.arena.h * 1.3);
    const r = setup(12, 820, 1110, 4);
    expect(f * r.arena.h).toBeGreaterThan(f * r.arena.w * 1.0);
  });

  it('Stufe 1–5: Zeichen berühren sich zu keinem Zeitpunkt der Umdrehung (Kreise, Ellipsen, gegensinnig), auf Tablet quer, hoch und Handy', () => {
    for (const { w, h } of Object.values(STAGES)) {
      for (let level = 1; level <= 5; level++) {
        for (let seed = 1; seed <= 12; seed++) {
          const s = setup(level, w, h, seed);
          // Stufe 1–3 strikt, Stufe 4–5 (bis 14 Zeichen) höchstens 3 px Berührung der großzügig gerechneten Kästen
          expect(L.worstViolation(s.orbits, s.halves, 1, 0, 720), `Stufe ${level}, ${w}×${h}, Startwert ${seed}`).toBeLessThan(level <= 3 ? 1e-9 : 3);
        }
      }
    }
  });

  it('ab Stufe 6 nie tiefer überdeckt als der Mindestabstand der Stufe erlaubt (bis auf wenige px)', () => {
    for (const { w, h } of Object.values(STAGES)) {
      for (let level = 6; level <= 12; level++) {
        for (let seed = 1; seed <= 4; seed++) {
          const s = setup(level, w, h, seed);
          expect(L.worstViolation(s.orbits, s.halves, L.separationFor(level), 0, 720), `Stufe ${level}`).toBeLessThan(6);
        }
      }
    }
  });

  it('Überlappung ergibt sich aus der Geometrie und nimmt mit der Stufe zu', () => {
    const mean = (level: number, w: number, h: number) => {
      let sum = 0;
      let n = 0;
      for (let seed = 1; seed <= 6; seed++) {
        const s = setup(level, w, h, seed);
        for (const th of sweep(90)) {
          sum += overlappingPairs(s, th);
          n++;
        }
      }
      return sum / n;
    };
    for (const { w, h } of Object.values(STAGES)) {
      const m3 = mean(3, w, h);
      const m6 = mean(6, w, h);
      const m9 = mean(9, w, h);
      const m12 = mean(12, w, h);
      expect(m3).toBe(0);
      expect(m6).toBeLessThan(0.5);
      expect(m9).toBeGreaterThan(m6);
      expect(m12).toBeGreaterThan(m9);
      expect(m12).toBeGreaterThan(1);
    }
  });

  it('Totalverdeckung ausgeschlossen: kein Zeichen wird von einem anderen zu mehr als etwa der Hälfte überdeckt (Stufe 12, alle Bühnen)', () => {
    for (const { w, h } of Object.values(STAGES)) {
      for (let seed = 1; seed <= 4; seed++) {
        const s = setup(12, w, h, seed);
        let worst = 0;
        for (const th of sweep(360)) {
          const ps = s.orbits.map((q) => L.orbitPos(q, th));
          for (let a = 0; a < ps.length; a++) {
            for (let b = a + 1; b < ps.length; b++) {
              const ox = Math.min(s.halves[a].hw, s.halves[b].hw) * 2 - Math.abs(ps[a].x - ps[b].x);
              const oy = Math.min(s.halves[a].hh, s.halves[b].hh) * 2 - Math.abs(ps[a].y - ps[b].y);
              if (ox > 0 && oy > 0) worst = Math.max(worst, (ox * oy) / (Math.min(s.halves[a].hw, s.halves[b].hw) * 2 * Math.min(s.halves[a].hh, s.halves[b].hh) * 2));
            }
          }
        }
        // Anteil der Fläche des kleineren Kastens, der vom anderen bedeckt wird (nie ganz)
        expect(worst, `${w}×${h}, Startwert ${seed}`).toBeLessThan(0.75);
      }
    }
  });

  it('gleichmäßig verteilt: die Zeichen belegen die Spielfläche (nicht alle auf einem Haufen)', () => {
    for (const { w, h } of Object.values(STAGES)) {
      for (let seed = 1; seed <= 6; seed++) {
        const s = setup(2, w, h, seed);
        const pts = s.orbits.map((q) => ({ x: q.bx, y: q.by }));
        const xs = pts.map((p) => p.x);
        const ys = pts.map((p) => p.y);
        const span = Math.min(s.arena.w, s.arena.h);
        expect(Math.max(...xs) - Math.min(...xs) + Math.max(...ys) - Math.min(...ys)).toBeGreaterThan(span * 0.7);
      }
    }
  });

  it('keine Sprünge: je Bild höchstens ω · Reichweite · dt; bildratenunabhängig (gleiche Stelle zur gleichen Zeit)', () => {
    for (const level of [1, 6, 12]) {
      const s = setup(level, 1180, 750, 21);
      const omega = L.omegaFor(level);
      for (const dt of [1 / 30, 1 / 60, 1 / 120]) {
        for (const q of s.orbits) {
          let prev = L.orbitPos(q, 0);
          for (let k = 1; k <= Math.round(10 / dt); k++) {
            const p = L.orbitPos(q, L.thetaAt(omega, k * dt * 1000));
            expect(Math.hypot(p.x - prev.x, p.y - prev.y)).toBeLessThanOrEqual(omega * L.orbitRadius(q) * Math.max(1, q.k ?? 1) * dt + 1e-6);
            prev = p;
          }
        }
      }
      // nach 10 s dieselbe Stelle, egal wie fein die Zeit zerlegt wurde
      const at = (dt: number, q: L.Orbit) => L.orbitPos(q, L.thetaAt(omega, Math.round(10 / dt) * dt * 1000));
      for (const q of s.orbits) {
        expect(at(1 / 30, q).x).toBeCloseTo(at(1 / 120, q).x, 6);
        expect(at(1 / 30, q).y).toBeCloseTo(at(1 / 120, q).y, 6);
      }
    }
  });

  it('Bahn einpassen: ein Kreis, der überragt, rückt zum Start; ein passender bleibt unverändert', () => {
    const arena = { x: 0, y: 0, w: 400, h: 300 };
    const half = { hw: 20, hh: 20 };
    const ok: L.Orbit = { cx: 200, cy: 150, bx: 260, by: 150 };
    expect(L.fitOrbit(ok, arena, half)).toEqual(ok);
    const wide: L.Orbit = { cx: 300, cy: 150, bx: 100, by: 150 }; // Radius 200 ragt weit hinaus
    const f = L.fitOrbit(wide, arena, half);
    expect(L.orbitFits(f, arena, half)).toBe(true);
    expect(f.bx).toBeCloseTo(100, 9);
    expect(f.by).toBeCloseTo(150, 9);
    // Ellipse (Halbachsen 3 : 1) und Gegenrichtung bleiben beim Einpassen erhalten
    const el = L.fitOrbit({ cx: 200, cy: 150, bx: 700, by: 150, k: 3, dir: -1, ell: true }, arena, half);
    expect(L.orbitFits(el, arena, half)).toBe(true);
    expect(el.k).toBe(3);
    expect(el.dir).toBe(-1);
    // Start außerhalb wird hineingeschoben
    const out = L.fitOrbit({ cx: 50, cy: 50, bx: -30, by: 500 }, arena, half);
    expect(L.orbitFits(out, arena, half)).toBe(true);
    expect(out.bx).toBeGreaterThanOrEqual(20);
    expect(out.by).toBeLessThanOrEqual(280);
  });

  it('Bühne drehen: Bahnen werden neu eingepasst, die Zeichen bleiben an ihrer Stelle (anteilig)', () => {
    const from = { x: 10, y: 80, w: 1100, h: 600 };
    const to = { x: 10, y: 80, w: 780, h: 1000 };
    const s = setup(9, 1180, 750, 3);
    const halves = s.halves;
    const orbits = L.buildOrbits(halves, 9, from, createRng(3));
    const out = L.resizeOrbits(orbits, 1.2, from, to, halves);
    out.forEach((q, i) => {
      expect(L.orbitFits(q, to, halves[i])).toBe(true);
      for (const th of sweep(60)) {
        const p = L.orbitPos(q, th);
        const r = L.centerRange(to, halves[i]);
        expect(p.x).toBeGreaterThanOrEqual(r.minX - 1e-6);
        expect(p.x).toBeLessThanOrEqual(r.maxX + 1e-6);
        expect(p.y).toBeGreaterThanOrEqual(r.minY - 1e-6);
        expect(p.y).toBeLessThanOrEqual(r.maxY + 1e-6);
      }
    });
  });
});

describe('Antippen (pickTap)', () => {
  const g = (k: number, x: number, y: number, done = false): L.Hittable => ({ x, y, hx: 30, hy: 30, done, k });

  it('trifft das gesuchte Zeichen', () => {
    const items = [g(0, 100, 100), g(1, 300, 100)];
    expect(L.pickTap(items, 105, 95, 0)).toEqual({ kind: 'target', i: 0 });
  });

  it('falsches Zeichen = Fehltipp', () => {
    const items = [g(0, 100, 100), g(1, 300, 100)];
    expect(L.pickTap(items, 300, 110, 0)).toEqual({ kind: 'wrong', i: 1 });
  });

  it('bei Überlappung hat das gesuchte Zeichen Vorrang, egal in welcher Reihenfolge', () => {
    const a = [g(3, 100, 100), g(2, 120, 105)];
    expect(L.pickTap(a, 110, 100, 2)).toEqual({ kind: 'target', i: 1 });
    const b = [g(2, 100, 100), g(3, 120, 105)];
    expect(L.pickTap(b, 110, 100, 2)).toEqual({ kind: 'target', i: 0 });
  });

  it('liegt das gesuchte nicht unter dem Finger, zählt das nächste ungetippte', () => {
    const items = [g(5, 100, 100), g(7, 150, 100), g(0, 600, 600)];
    // näher an 7 (150) als an 5 (100)
    expect(L.pickTap(items, 135, 100, 0)).toEqual({ kind: 'wrong', i: 1 });
    expect(L.pickTap(items, 112, 100, 0)).toEqual({ kind: 'wrong', i: 0 });
  });

  it('getippte Zeichen werden ignoriert, auch wenn sie das gesuchte überdecken', () => {
    const items = [g(0, 100, 100, true), g(1, 400, 400)];
    expect(L.pickTap(items, 100, 100, 1)).toEqual({ kind: 'old', i: 0 });
    const both = [g(0, 100, 100, true), g(1, 120, 110)];
    expect(L.pickTap(both, 110, 105, 1)).toEqual({ kind: 'target', i: 1 });
  });

  it('daneben = none', () => {
    const items = [g(0, 100, 100)];
    expect(L.pickTap(items, 400, 400, 0)).toEqual({ kind: 'none' });
    expect(L.pickTap(items, 100 + 31, 100, 0)).toEqual({ kind: 'none' });
  });

  it('Trefferfläche ist rechteckig (breiter bei zweistelligen Zahlen)', () => {
    const wide: L.Hittable = { x: 100, y: 100, hx: 45, hy: 30, done: false, k: 0 };
    expect(L.pickTap([wide], 140, 100, 0).kind).toBe('target');
    expect(L.pickTap([wide], 100, 135, 0).kind).toBe('none');
  });
});

describe('Auswertung', () => {
  const round = (level: number, ms: number, errors: number, steps: number[], success = true): L.RoundRecord => ({
    level,
    pairs: L.pairsFor(level),
    chars: L.charsFor(level),
    ms,
    errors,
    success,
    steps,
  });
  const steps = (n: number, num: number, letter: number, first = 3000): number[] => Array.from({ length: n }, (_, k) => (k === 0 ? first : k % 2 === 1 ? letter : num));

  it('ohne Runde: Stufe 1, nichts Undefiniertes im Hauptwert', () => {
    const s = L.summarize([]);
    expect(s.rounds).toBe(0);
    expect(Number.isNaN(s.perCharMs)).toBe(true);
    expect(L.primaryLevel(s)).toBe(1);
    expect(s.lastPairs).toBe(0);
  });

  it('Hauptwert: höchste Stufe mit geschaffter Runde', () => {
    const s = L.summarize([round(3, 20000, 0, [], true), round(5, 30000, 0, [], true), round(6, 60000, 3, [], false), round(5, 28000, 1, [], true)]);
    expect(s.bestLevel).toBe(5);
    expect(L.primaryLevel(s)).toBe(5);
    expect(L.nextLevel(s)).toBe(5);
    expect(s.lastPairs).toBe(L.pairsFor(5));
    expect(s.errors).toBe(4);
  });

  it('ohne geschaffte Runde: eine unter der niedrigsten gespielten Stufe, nie unter 1', () => {
    expect(L.primaryLevel(L.summarize([round(4, 99999, 3, [], false), round(3, 99999, 2, [], false)]))).toBe(2);
    expect(L.primaryLevel(L.summarize([round(1, 99999, 3, [], false)]))).toBe(1);
  });

  it('Zeit je Zeichen: Summe der Zeiten durch Summe der Zeichen', () => {
    const s = L.summarize([round(1, 12000, 0, []), round(2, 16000, 0, [])]);
    expect(s.perCharMs).toBeCloseTo(28000 / (6 + 8), 9);
  });

  it('Mehrzeit für Buchstaben: Median Buchstaben minus Median Zahlen, erste Suche zählt nicht', () => {
    const s = L.summarize([round(9, 30000, 0, steps(14, 800, 1100, 9999)), round(9, 30000, 0, steps(14, 820, 1120, 9999))]);
    expect(s.letterGapMs).toBeCloseTo(300, 6);
    const none = L.summarize([round(1, 9000, 0, steps(6, 800, 1100))]);
    expect(Number.isNaN(none.letterGapMs)).toBe(true); // zu wenige Werte
  });

  it('Mehrzeit kann auch negativ sein', () => {
    const s = L.summarize([round(9, 30000, 0, steps(14, 1200, 900)), round(9, 30000, 0, steps(14, 1200, 900))]);
    expect(s.letterGapMs).toBeCloseTo(-300, 6);
  });

  it('zählt langsame Runden (Zeit je Zeichen über der Grenze)', () => {
    const lim = L.limitPerCharMs(4) * L.charsFor(4);
    const s = L.summarize([round(4, lim + 1, 0, [], false), round(4, lim - 1, 0, [], true)]);
    expect(s.slowRounds).toBe(1);
  });

  it('Tipp: Fehler, Buchstaben, Tempo, sonst Lob', () => {
    expect(L.tipFor(L.summarize([round(4, 20000, 4, [], false)]))).toBe('errors');
    expect(L.tipFor(L.summarize([round(9, 30000, 0, steps(14, 800, 1400)), round(9, 30000, 0, steps(14, 800, 1400))]))).toBe('letters');
    const slow = L.limitPerCharMs(4) * L.charsFor(4) + 5000;
    expect(L.tipFor(L.summarize([round(4, slow, 0, [], false), round(4, slow, 1, [], false)]))).toBe('slow');
    expect(L.tipFor(L.summarize([round(4, 20000, 0, [], true), round(4, 20000, 0, [], true)]))).toBe('great');
  });

  it('Punkte', () => {
    expect(L.tapPoints(1)).toBe(3);
    expect(L.tapPoints(12)).toBe(14);
    expect(L.roundBonus(5, true)).toBe(50);
    expect(L.roundBonus(5, false)).toBe(0);
  });
});

describe('Texte', () => {
  it('Deutsch und Italienisch haben dieselben Schlüssel', () => {
    for (const key of ['captions', 'metrics', 'tips', 'feedback'] as const) {
      expect(Object.keys(itTexts[key]).sort()).toEqual(Object.keys(de[key]).sort());
    }
    expect(itTexts.steps.length).toBe(de.steps.length);
    expect(itTexts.goodFor.length).toBe(de.goodFor.length);
  });

  it('Längen nach den Vorgaben: Tagline ≤ 80, Schritte ≤ 60, Bildunterschriften ≤ 40 Zeichen', () => {
    for (const t of [de, itTexts]) {
      expect(t.tagline.length).toBeLessThanOrEqual(80);
      for (const s of t.steps) expect(s.length).toBeLessThanOrEqual(60);
      for (const c of Object.values(t.captions)) expect(c.length).toBeLessThanOrEqual(40);
    }
  });

  it('„Für Neugierige“ endet mit einem Hinweis „nicht belegt“ und nennt kein Wirkversprechen', () => {
    expect(de.why.trim().endsWith('nicht belegt.')).toBe(true);
    expect(itTexts.why.trim().endsWith('non è dimostrato.')).toBe(true);
    for (const t of [de, itTexts]) {
      const all = JSON.stringify(t).toLowerCase();
      for (const bad of ['test', 'diagnose', 'norm', 'krank', 'patholog', 'heil']) {
        // „Trail Making B“ ist ein Name; das Wort „test“ steht nur in „Test“-freien Texten
        if (bad === 'test') continue;
        expect(all.includes(bad), bad).toBe(false);
      }
    }
  });

  it('Der Intro-Text beschreibt die Drehung um versetzte Mittelpunkte (nicht „treiben“)', () => {
    expect(JSON.stringify(de)).toContain('versetzte Mittelpunkte');
    expect(JSON.stringify(de)).toContain('Ellipsen');
    expect(JSON.stringify(itTexts)).toContain('ellissi');
    expect(JSON.stringify(itTexts)).toContain('centri sfalsati');
    for (const t of [de, itTexts]) {
      const all = JSON.stringify(t).toLowerCase();
      for (const old of ['treib', 'vagan', 'abprall']) expect(all.includes(old), old).toBe(false);
    }
  });

  it('Der Text kennzeichnet die Anlehnung an Trail Making B ehrlich', () => {
    expect(de.why).toContain('angelehnt');
    expect(de.why).toContain('nicht eigens untersucht');
  });
});

// ---------------------------------------------------------------------------
// Die ganze Übung ohne Canvas durchspielen (virtuelle Zeit, Stub-Kontext)

interface Peek {
  glyphs: Array<{ k: number; label: string; x: number; y: number; hx: number; hy: number; hw: number; hh: number; done: boolean; orbit: L.Orbit }>;
  next: number;
  phase: string;
  arena: L.Rect;
  geom: L.FieldGeom;
  cur: { omega: number };
  rotT0: number;
}

/** Anzahl Zeichen, deren Kasten über die Spielfläche hinausragt */
function countOutside(pk: Peek): number {
  const a = pk.arena;
  return pk.glyphs.filter((g) => g.x - g.hw < a.x - 1e-6 || g.x + g.hw > a.x + a.w + 1e-6 || g.y - g.hh < a.y - 1e-6 || g.y + g.hh > a.y + a.h + 1e-6).length;
}

interface Harness {
  ex: Exercise;
  ctx: ExerciseContext;
  peek: () => Peek;
  finished: ExerciseResult[];
  calls: { bad: number; good: number; tap: number; ghostTaps: number; captions: string[]; labels: string[] };
  t: number;
  /** Ein Bild weiterschalten (dt in Sekunden) */
  step: (dt: number) => void;
  down: (x: number, y: number) => void;
}

function harness(o: { mode?: 'play' | 'demo'; quick?: boolean; reduced?: boolean; startLevel?: number | null; seed?: number; autoplay?: boolean; w?: number; h?: number; lang?: 'de' | 'it' } = {}): Harness {
  const finished: ExerciseResult[] = [];
  const calls = { bad: 0, good: 0, tap: 0, ghostTaps: 0, captions: [] as string[], labels: [] as string[] };
  const w = o.w ?? 1180;
  const h = o.h ?? 750;
  const stage = { w, h, u: Math.min(w, h) / 100, dpr: 1 };
  let now = 0;
  // Geister-Hand wie im Runner: Verzögerung + Fahrzeit, dann Tipp, danach 170 ms „gedrückt“
  let pending: { x: number; y: number; due: number } | null = null;
  let busyUntil = 0;
  const ghost = {
    tap: (x: number, y: number, opt: { delay?: number; move?: number } = {}) => {
      calls.ghostTaps++;
      pending = { x, y, due: now + (opt.delay ?? 0) + (opt.move ?? 380) };
    },
    moveTo: () => {},
    clear: () => {
      pending = null;
    },
    show: () => {},
    hide: () => {},
    get idle() {
      return !pending && now >= busyUntil;
    },
  };
  const ctx = {
    mode: o.mode ?? 'play',
    autoplay: !!o.autoplay || o.mode === 'demo',
    quick: !!o.quick,
    reducedMotion: !!o.reduced,
    startLevel: o.startLevel ?? null,
    lang: o.lang ?? 'de',
    texts: o.lang === 'it' ? itTexts : de,
    rng: createRng(o.seed ?? 1),
    sfx: { tick() {}, go() {}, good: () => calls.good++, bad: () => calls.bad++, tap: () => calls.tap++, done() {} },
    hud: {
      setProgress() {},
      setScore() {},
      setLabel: (t: string | null) => t && calls.labels.push(t),
      toast() {},
      caption: (t: string | null) => t && calls.captions.push(t),
    },
    ghost,
    stage,
    fmt: createFormatter('de'),
    now: () => now,
    finish: (r: ExerciseResult) => finished.push(r),
  } as unknown as ExerciseContext;
  const ex = zahlBuchstabeWirbel.create(ctx);
  ex.start(0);
  const hn: Harness = {
    ex,
    ctx,
    peek: () => ex as unknown as Peek,
    finished,
    calls,
    get t() {
      return now;
    },
    set t(v: number) {
      now = v;
    },
    down: (x: number, y: number) => ex.pointerDown?.({ id: 1, x, y, t: now, type: 'touch' } as PointerInfo),
    step: (dt: number) => {
      now += dt * 1000;
      if (pending && now >= pending.due) {
        const p = pending;
        pending = null;
        busyUntil = now + 170;
        ex.pointerDown?.({ id: -1, x: p.x, y: p.y, t: now, type: 'ghost' } as PointerInfo);
      }
      ex.update(dt, now);
    },
  };
  return hn;
}

/** Ein Spieler: tippt das gesuchte Zeichen nach `think` ms; `wrongEvery` > 0: jedes n-te Mal erst ein falsches */
function bot(hn: Harness, o: { think?: number; wrongEvery?: number; emptyEvery?: number; maxMs?: number } = {}): void {
  const think = o.think ?? 700;
  let since = 0;
  let count = 0;
  const maxMs = o.maxMs ?? 400_000;
  while (hn.finished.length === 0 && hn.t < maxMs) {
    hn.step(1 / 60);
    const pk = hn.peek();
    if (pk.phase !== 'play') {
      since = 0;
      continue;
    }
    since += 1000 / 60;
    if (since < think) continue;
    since = 0;
    count++;
    const g = pk.glyphs.find((q) => q.k === pk.next);
    if (!g) continue;
    if (o.emptyEvery && count % o.emptyEvery === 0) {
      hn.down(pk.arena.x - 5, pk.arena.y - 5); // daneben (außerhalb der Spielfläche, nicht auf einem Zeichen)
      continue;
    }
    if (o.wrongEvery && count % o.wrongEvery === 0) {
      const w = pk.glyphs.find((q) => !q.done && q.k !== pk.next && Math.abs(q.x - g.x) > g.hx + q.hx && Math.abs(q.y - g.y) > g.hy + q.hy);
      if (w) hn.down(w.x, w.y);
    }
    hn.down(g.x, g.y);
  }
}

describe('Übung ohne Canvas durchgespielt', () => {
  it('fehlerfreier Spieler: Sitzung endet, Stufe steigt, Zusatzwerte vollständig', () => {
    const hn = harness({ seed: 3 });
    bot(hn, { think: 700 });
    expect(hn.finished.length).toBe(1);
    const r = hn.finished[0];
    expect(r.primary.key).toBe('level');
    expect(r.primary.unit).toBe('level');
    expect(r.primary.better).toBe('higher');
    expect(Number.isInteger(r.primary.value)).toBe(true);
    expect(r.primary.value).toBeGreaterThan(2);
    const keys = r.secondary.map((m) => m.key);
    expect(keys).toEqual(expect.arrayContaining(['perChar', 'errors', 'pairs']));
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary.find((m) => m.key === 'errors')!.value).toBe(0);
    const per = r.secondary.find((m) => m.key === 'perChar')!;
    expect(per.unit).toBe('time');
    expect(per.value).toBeGreaterThan(600);
    expect(per.value).toBeLessThan(900);
    expect(r.level).toBe(r.primary.value);
    expect(r.score).toBeGreaterThan(0);
    // alle Metrik-Schlüssel haben Texte
    for (const m of [r.primary, ...r.secondary]) expect(de.metrics[m.key]).toBeTruthy();
    expect(de.tips[r.tip ?? 'great']).toBeTruthy();
    // Sitzung dauert etwa 100 s, überzieht höchstens um eine Runde
    expect(hn.t).toBeGreaterThan(95_000);
    expect(hn.t).toBeLessThan(100_000 + 25_000 + 1500);
  });

  it('Fehltipps auf falsche Zeichen zählen, Tipps ins Leere nicht', () => {
    const hn = harness({ seed: 5, quick: true, startLevel: 4 });
    bot(hn, { think: 600, emptyEvery: 2 });
    const r = hn.finished[0];
    expect(r.secondary.find((m) => m.key === 'errors')!.value).toBe(0);
    expect(hn.calls.bad).toBe(0);

    const hw = harness({ seed: 5, quick: true, startLevel: 4 });
    bot(hw, { think: 600, wrongEvery: 3 });
    const rw = hw.finished[0];
    const errs = rw.secondary.find((m) => m.key === 'errors')!.value;
    expect(errs).toBeGreaterThan(0);
    expect(hw.calls.bad).toBe(errs);
  });

  it('zu langsam → leichtere Stufe; Hauptwert ohne Erfolg liegt unter der gespielten Stufe', () => {
    const hn = harness({ seed: 8, quick: true, startLevel: 3 });
    bot(hn, { think: 3500 }); // 3,5 s je Zeichen: über der Grenze von Stufe 3 (3,27 s)
    const r = hn.finished[0];
    expect(r.primary.value).toBe(2);
    expect(r.level).toBe(2);
    expect(r.tip).toBe('slow');
  });

  it('Stufe 1 ist der Boden: erfolglos auf Stufe 1 bleibt Stufe 1', () => {
    const hn = harness({ seed: 2, quick: true, startLevel: 1 });
    bot(hn, { think: 6000 });
    expect(hn.finished[0].primary.value).toBe(1);
  });

  it('Kurzmodus: endet nach kurzer Zeit; gespeicherte Stufe wird übernommen', () => {
    const hn = harness({ seed: 9, quick: true, startLevel: 7 });
    expect(hn.peek().glyphs.length).toBe(L.charsFor(7));
    bot(hn, { think: 400 });
    expect(hn.finished.length).toBe(1);
    expect(hn.t).toBeLessThan(45_000);
  });

  it('Start auf Stufe aus dem Speicher; Kommazahlen und Unsinn werden bereinigt', () => {
    expect(harness({ startLevel: 4.6 }).peek().glyphs.length).toBe(L.charsFor(5));
    expect(harness({ startLevel: 99 }).peek().glyphs.length).toBe(L.charsFor(12));
    expect(harness({ startLevel: -3 }).peek().glyphs.length).toBe(L.charsFor(1));
    expect(harness({ startLevel: Number.NaN }).peek().glyphs.length).toBe(L.charsFor(1));
  });

  it('gleicher Startwert → gleicher Ablauf (Zufall nur über ctx.rng)', () => {
    const run = () => {
      const hn = harness({ seed: 42, quick: true, startLevel: 5 });
      bot(hn, { think: 800, wrongEvery: 4 });
      return JSON.stringify([hn.finished[0], hn.t]);
    };
    expect(run()).toBe(run());
  });

  it('„Bewegung reduzieren“: die Zeichen stehen still', () => {
    const hn = harness({ seed: 4, reduced: true, startLevel: 12 });
    const before = hn.peek().glyphs.map((g) => [g.x, g.y]);
    for (let i = 0; i < 60 * 10; i++) hn.step(1 / 60);
    expect(hn.peek().glyphs.map((g) => [g.x, g.y])).toEqual(before);
  });

  it('Zeichen drehen sich ab Stufe 1 sichtbar auf ihren Bahnen; bei 30, 60 und 120 Hz exakt dieselbe Stelle zur selben Zeit', () => {
    const at = (hz: number, level: number) => {
      const hn = harness({ seed: 6, startLevel: level });
      const a = hn.peek().glyphs.map((g) => [g.x, g.y]);
      for (let i = 0; i < hz * 6; i++) hn.step(1 / hz);
      const b = hn.peek().glyphs;
      return { a, b: b.map((g) => [g.x, g.y]), travel: b.reduce((s, g, i) => s + Math.hypot(g.x - a[i][0], g.y - a[i][1]), 0) / b.length };
    };
    for (const level of [1, 6, 12]) {
      const r60 = at(60, level);
      const r120 = at(120, level);
      const r30 = at(30, level);
      expect(r60.travel, `Stufe ${level}`).toBeGreaterThan(level === 1 ? 5 : 15);
      r60.b.forEach((p, i) => {
        expect(r120.b[i][0]).toBeCloseTo(p[0], 6);
        expect(r120.b[i][1]).toBeCloseTo(p[1], 6);
        expect(r30.b[i][0]).toBeCloseTo(p[0], 6);
      });
    }
  });

  it('die Position folgt der Formel: p(t) = c + Rot(ω·(t − t0))·(b − c)', () => {
    const hn = harness({ seed: 14, startLevel: 8 });
    for (let i = 0; i < 60 * 7; i++) hn.step(1 / 60);
    const pk = hn.peek();
    const theta = L.thetaAt(pk.cur.omega, hn.t - pk.rotT0);
    expect(theta).toBeGreaterThan(0.5);
    for (const g of pk.glyphs) {
      const p = L.orbitPos(g.orbit, theta);
      expect(g.x).toBeCloseTo(p.x, 6);
      expect(g.y).toBeCloseTo(p.y, 6);
    }
  });

  it('die Zeichen bleiben während der ganzen Sitzung vollständig in der Spielfläche (alle Bühnen, Stufe 1/6/12)', () => {
    for (const { w, h } of Object.values(STAGES)) {
      for (const level of [1, 6, 12]) {
        const hn = harness({ seed: 3, startLevel: level, w, h, autoplay: true });
        let outside = 0;
        for (let i = 0; i < 60 * 45; i++) {
          hn.step(1 / 60);
          outside += countOutside(hn.peek());
          if (hn.finished.length) break;
        }
        expect(outside, `Stufe ${level}, ${w}×${h}`).toBe(0);
      }
    }
  });

  it('Bot sagt die Bewegung voraus: zielt 350 ms voraus (Formel statt Abprall-Vorhersage) und trifft jedes Mal', () => {
    for (const level of [3, 12]) {
      const hn = harness({ seed: 9, quick: true, startLevel: level });
      const lead = 350;
      let pending: { x: number; y: number; due: number; k: number } | null = null;
      let since = 0;
      let taps = 0;
      while (hn.finished.length === 0 && hn.t < 60_000) {
        hn.step(1 / 60);
        const pk = hn.peek();
        if (pk.phase !== 'play') {
          pending = null;
          since = 0;
          continue;
        }
        if (pending && hn.t >= pending.due) {
          hn.down(pending.x, pending.y);
          taps++;
          pending = null;
          since = 0;
          continue;
        }
        since += 1000 / 60;
        if (!pending && since >= 600) {
          const g = pk.glyphs.find((q) => q.k === pk.next)!;
          const due = hn.t + lead;
          const p = L.orbitPos(g.orbit, L.thetaAt(pk.cur.omega, due - pk.rotT0));
          pending = { x: p.x, y: p.y, due, k: g.k };
        }
      }
      expect(hn.finished.length).toBe(1);
      expect(taps).toBeGreaterThanOrEqual(8);
      expect(hn.calls.bad, `Stufe ${level}`).toBe(0);
      expect(hn.finished[0].secondary.find((m) => m.key === 'errors')!.value).toBe(0);
    }
  });

  it('Drehen des Tablets: Zeichen bleiben in der neuen Spielfläche, Trefferflächen passen sich an', () => {
    const hn = harness({ seed: 10, startLevel: 9, w: 1180, h: 750 });
    for (let i = 0; i < 120; i++) hn.step(1 / 60);
    const st = hn.ctx.stage as unknown as { w: number; h: number; u: number };
    st.w = 820;
    st.h = 1110;
    st.u = 8.2;
    hn.ex.resize?.(820, 1110);
    const pk = hn.peek();
    for (const g of pk.glyphs) {
      expect(g.x).toBeGreaterThanOrEqual(pk.arena.x - 1);
      expect(g.x).toBeLessThanOrEqual(pk.arena.x + pk.arena.w + 1);
      expect(g.y).toBeGreaterThanOrEqual(pk.arena.y - 1);
      expect(g.y).toBeLessThanOrEqual(pk.arena.y + pk.arena.h + 1);
      expect(g.hx * 2).toBeGreaterThanOrEqual(56);
    }
    expect(pk.arena.y + pk.arena.h).toBeLessThanOrEqual(1110);
    // die Bahnen passen in die neue Fläche, und die Zeichen bleiben beim Weiterdrehen darin
    let outside = 0;
    for (let i = 0; i < 60 * 25; i++) {
      hn.step(1 / 60);
      outside += countOutside(hn.peek());
    }
    expect(outside).toBe(0);
  });

  it('Intro-Film: Hand tippt 1 – A – 2 – B … ohne Fehltipp, endet nach 8–14 s, Bildunterschriften ≤ 40 Zeichen', () => {
    for (const seed of [1, 2, 3, 4, 5, 6]) {
      const hn = harness({ mode: 'demo', seed, w: 628, h: 432 });
      let guard = 0;
      while (hn.finished.length === 0 && guard++ < 60 * 40) hn.step(1 / 60);
      expect(hn.finished.length, `Startwert ${seed}`).toBe(1);
      expect(hn.calls.bad, `Fehltipp im Film, Startwert ${seed}`).toBe(0);
      expect(hn.calls.tap).toBe(8);
      const pk = hn.peek();
      expect(pk.glyphs.every((g) => g.done)).toBe(true);
      expect(hn.t).toBeGreaterThanOrEqual(8000);
      expect(hn.t).toBeLessThanOrEqual(14_000);
      for (const c of hn.calls.captions) expect(c.length).toBeLessThanOrEqual(40);
      expect(new Set(hn.calls.captions).size).toBeGreaterThanOrEqual(4);
    }
  });

  it('Intro-Film auf kleiner und hoher Bühne läuft ebenfalls fehlerfrei durch', () => {
    for (const [w, h] of [
      [358, 305],
      [820, 600],
    ]) {
      const hn = harness({ mode: 'demo', seed: 7, w, h });
      let guard = 0;
      while (hn.finished.length === 0 && guard++ < 60 * 40) hn.step(1 / 60);
      expect(hn.finished.length).toBe(1);
      expect(hn.calls.bad).toBe(0);
    }
  });

  it('Autoplay im Spielmodus: Sitzung endet sauber, meist richtig', () => {
    for (const quick of [true, false]) {
      const hn = harness({ seed: 12, autoplay: true, quick });
      let guard = 0;
      while (hn.finished.length === 0 && guard++ < 60 * 400) hn.step(1 / 60);
      expect(hn.finished.length, quick ? 'kurz' : 'lang').toBe(1);
      const r = hn.finished[0];
      expect(r.primary.value).toBeGreaterThanOrEqual(1);
      expect(hn.calls.ghostTaps).toBeGreaterThan(5);
      // meist richtig: höchstens jeder fünfte Tipp falsch
      expect(hn.calls.bad).toBeLessThan(hn.calls.tap * 0.2 + 2);
    }
  });

  it('Beschriftungen je Sprache: DE A–O, IT ohne J und K; 15 Paare auf Stufe 12 (30 Zeichen)', () => {
    for (const lang of ['de', 'it'] as const) {
      const hn = harness({ seed: 2, startLevel: 12, lang });
      const labels = hn.peek().glyphs.map((g) => g.label);
      expect(labels.length).toBe(30);
      expect(labels).toEqual(L.sequence(15, L.lettersFor(lang)));
      const letters = labels.filter((_, k) => k % 2 === 1).join('');
      expect(letters).toBe(lang === 'it' ? 'ABCDEFGHILMNOPQ' : 'ABCDEFGHIJKLMNO');
    }
  });

  it('Italienisch: die Folge lässt sich bis zum Ende durchspielen (… 9 – I – 10 – L … 15 – Q)', () => {
    const hn = harness({ seed: 5, quick: true, startLevel: 12, lang: 'it' });
    const first = hn.peek().glyphs.map((g) => g.label);
    expect(first.slice(16, 20)).toEqual(['9', 'I', '10', 'L']);
    bot(hn, { think: 500 });
    expect(hn.finished.length).toBe(1);
    expect(hn.finished[0].secondary.find((m) => m.key === 'errors')!.value).toBe(0);
    expect(hn.peek().glyphs.map((g) => g.label).slice(-2)).toEqual(['15', 'Q']);
  });

  it('30 Zeichen bleiben auf allen Bühnen tippbar: Trefferflächen ≥ 56 px, Schrift ≥ 34 px, nie ganz verdeckt', () => {
    for (const { w, h } of Object.values(STAGES)) {
      const hn = harness({ w, h, startLevel: 12, seed: 3 });
      const pk = hn.peek();
      expect(pk.glyphs.length).toBe(30);
      for (const g of pk.glyphs) {
        expect(g.hx * 2).toBeGreaterThanOrEqual(56);
        expect(g.hy * 2).toBeGreaterThanOrEqual(56);
        expect(g.hh).toBeGreaterThanOrEqual(34 * 0.38 - 1e-9); // Schrift mindestens 34 px
      }
    }
  });

  it('Trefferflächen: mindestens 56 px in jeder Richtung auf allen Bühnen', () => {
    for (const { w, h } of Object.values(STAGES)) {
      const hn = harness({ w, h, startLevel: 12 });
      for (const g of hn.peek().glyphs) {
        expect(g.hx * 2).toBeGreaterThanOrEqual(56);
        expect(g.hy * 2).toBeGreaterThanOrEqual(56);
      }
    }
  });
});
