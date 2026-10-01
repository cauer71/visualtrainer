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
  rng: ReturnType<typeof createRng>;
  bodies: L.Mover[];
  members: L.Member[];
  halves: L.Half[];
  arena: L.Rect;
  F: number;
  u: number;
}

function setup(level: number, w: number, h: number, seed: number): Setup {
  const rng = createRng(seed);
  const u = Math.min(w, h) / 100;
  const F = L.glyphPx(u);
  const geom = L.fieldGeometry(w, h, u, h - 8);
  const arena = L.arenaRect(geom.field, L.arenaFractionFor(level, F, geom.field.w * geom.field.h));
  const labels = L.sequence(L.pairsFor(level));
  const halves = labels.map((lab) => L.visibleHalf(lab, F));
  const { bodies, members } = L.buildBodies(halves, L.bondsFor(level), L.bondDepthFor(level), rng);
  for (const b of bodies) b.v = L.speedFor(level) * u * rng.range(0.75, 1.25);
  L.placeItems(bodies, arena, L.separationFor(level), rng);
  return { rng, bodies, members, halves, arena, F, u };
}

/** Anzahl Zeichenpaare, deren sichtbare Kästen sich überdecken */
function overlappingPairs(s: Setup): number {
  const pts = s.members.map((m) => L.seatAt(m, s.bodies[m.body].x, s.bodies[m.body].y));
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

/** Stub-Zufall: nie Drehung, Prüfung der geraden Bewegung */
const calm = { next: () => 0.5, range: (a: number, b: number) => (a + b) / 2, normal: () => 0, shuffle: <T>(x: T[]) => x };

describe('Stufen', () => {
  it('Paare 3 → 9, Zeichen 6 → 18, nie fallend', () => {
    expect(L.pairsFor(1)).toBe(3);
    expect(L.pairsFor(12)).toBe(9);
    expect(L.charsFor(1)).toBe(6);
    expect(L.charsFor(12)).toBe(18);
    for (let l = 2; l <= 12; l++) expect(L.pairsFor(l)).toBeGreaterThanOrEqual(L.pairsFor(l - 1));
    expect(L.pairsFor(12)).toBeLessThanOrEqual(L.MAX_PAIRS);
  });

  it('Tempo: Stufe 1–2 stehend, Stufe 3 → 3 %/s, Stufe 12 → 9 %/s, steigend', () => {
    expect(L.speedFor(1)).toBe(0);
    expect(L.speedFor(2)).toBe(0);
    expect(L.speedFor(3)).toBeCloseTo(3, 9);
    expect(L.speedFor(12)).toBeCloseTo(9, 9);
    for (let l = 4; l <= 12; l++) expect(L.speedFor(l)).toBeGreaterThan(L.speedFor(l - 1));
  });

  it('Dichte steigt: Spielfläche je Zeichen und Mindestabstand fallen, Überdeckungen nehmen zu', () => {
    for (let l = 2; l <= 12; l++) {
      expect(L.areaPerCharFor(l)).toBeLessThan(L.areaPerCharFor(l - 1));
      expect(L.separationFor(l)).toBeLessThanOrEqual(L.separationFor(l - 1));
      expect(L.bondsFor(l)).toBeGreaterThanOrEqual(L.bondsFor(l - 1));
      expect(L.bondDepthFor(l)).toBeLessThanOrEqual(L.bondDepthFor(l - 1));
    }
    for (let l = 1; l <= 5; l++) {
      expect(L.bondsFor(l)).toBe(0);
      expect(L.separationFor(l)).toBeGreaterThanOrEqual(1);
    }
    expect(L.bondsFor(6)).toBeGreaterThan(0);
    // Überdeckung nie so tief, dass ein Zeichen unlesbar wird
    expect(L.bondDepthFor(12)).toBeGreaterThanOrEqual(0.45);
  });

  it('Zeit je Zeichen: 3,6 s − 0,15 s · Stufe, mindestens 1,8 s', () => {
    expect(L.limitPerCharMs(1)).toBe(3450);
    expect(L.limitPerCharMs(6)).toBe(2700);
    expect(L.limitPerCharMs(12)).toBe(1800);
    expect(L.limitPerCharMs(40)).toBe(1800);
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
    expect(L.sequence(9).slice(-4)).toEqual(['8', 'H', '9', 'I']);
  });

  it('Zahl n gehört zum n-ten Buchstaben; ungerade Positionen sind Buchstaben', () => {
    for (let n = 1; n <= L.MAX_PAIRS; n++) {
      expect(L.labelAt(2 * (n - 1))).toBe(String(n));
      expect(L.labelAt(2 * (n - 1) + 1)).toBe(String.fromCharCode(64 + n));
      expect(L.isLetterAt(2 * (n - 1))).toBe(false);
      expect(L.isLetterAt(2 * (n - 1) + 1)).toBe(true);
    }
  });

  it('Beschriftungen sind eindeutig; Buchstaben nur A–I (in DE und IT gleich)', () => {
    const seq = L.sequence(L.MAX_PAIRS);
    expect(new Set(seq).size).toBe(seq.length);
    expect(L.LETTERS).toBe('ABCDEFGHI');
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
    // auf dem Handy ist die Spielfläche bei Stufe 12 deutlich kleiner als das Spielfeld
    const u = 3.9;
    const f = L.fieldGeometry(390, 781, u, 773).field;
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

describe('Aufstellung', () => {
  it('ist mit gleichem Startwert gleich, mit anderem verschieden', () => {
    const a = setup(9, 1180, 750, 7);
    const b = setup(9, 1180, 750, 7);
    const c = setup(9, 1180, 750, 8);
    expect(a.bodies.map((m) => [m.x, m.y, m.ang])).toEqual(b.bodies.map((m) => [m.x, m.y, m.ang]));
    expect(a.bodies.map((m) => m.x)).not.toEqual(c.bodies.map((m) => m.x));
  });

  it('alle Zeichen liegen ganz in der Spielfläche', () => {
    for (const { w, h } of Object.values(STAGES)) {
      for (let level = 1; level <= 12; level++) {
        for (let seed = 1; seed <= 4; seed++) {
          const s = setup(level, w, h, seed);
          for (const b of s.bodies) {
            const r = L.centerRange(s.arena, b);
            expect(b.x).toBeGreaterThanOrEqual(r.minX - 1e-6);
            expect(b.x).toBeLessThanOrEqual(r.maxX + 1e-6);
            expect(b.y).toBeGreaterThanOrEqual(r.minY - 1e-6);
            expect(b.y).toBeLessThanOrEqual(r.maxY + 1e-6);
          }
        }
      }
    }
  });

  it('jedes Zeichen sitzt in genau einem Körper; Paare teilen sich einen Körper', () => {
    for (let level = 1; level <= 12; level++) {
      const s = setup(level, 1180, 750, 3);
      expect(s.members.length).toBe(L.charsFor(level));
      const per = new Map<number, number>();
      for (const m of s.members) per.set(m.body, (per.get(m.body) ?? 0) + 1);
      const pairBodies = [...per.values()].filter((n) => n === 2).length;
      expect(pairBodies).toBe(Math.min(L.bondsFor(level), L.pairsFor(level)));
      expect([...per.values()].every((n) => n === 1 || n === 2)).toBe(true);
      expect(s.bodies.length).toBe(per.size);
    }
  });

  it('überdeckte Paare: teilweise übereinander, aber beide noch zur Hälfte sichtbar', () => {
    for (let level = 6; level <= 12; level++) {
      const s = setup(level, 1180, 750, 5);
      const byBody = new Map<number, number[]>();
      s.members.forEach((m, i) => byBody.set(m.body, [...(byBody.get(m.body) ?? []), i]));
      for (const idx of byBody.values()) {
        if (idx.length !== 2) continue;
        const [i, j] = idx;
        const A = s.halves[i];
        const B = s.halves[j];
        const dx = Math.abs(s.members[i].ox - s.members[j].ox);
        const dy = Math.abs(s.members[i].oy - s.members[j].oy);
        // sie überdecken sich …
        expect(dx).toBeLessThan(A.hw + B.hw);
        expect(dy).toBeLessThan(A.hh + B.hh);
        // … aber nie tiefer als die Stufe erlaubt
        expect(dx).toBeGreaterThanOrEqual(L.bondDepthFor(level) * (A.hw + B.hw) - 1e-6);
        // der Körper umfasst beide Zeichen
        const body = s.bodies[s.members[i].body];
        for (const k of [i, j]) {
          expect(Math.abs(s.members[k].ox) + s.halves[k].hw).toBeLessThanOrEqual(body.hw + 1e-6);
          expect(Math.abs(s.members[k].oy) + s.halves[k].hh).toBeLessThanOrEqual(body.hh + 1e-6);
        }
      }
    }
  });

  it('Stufe 1–5: keine Überdeckung am Start, auf Tablet quer, hoch und Handy', () => {
    for (const { w, h } of Object.values(STAGES)) {
      for (let level = 1; level <= 5; level++) {
        for (let seed = 1; seed <= 12; seed++) {
          const s = setup(level, w, h, seed);
          expect(overlappingPairs(s), `Stufe ${level}, Startwert ${seed}`).toBe(0);
        }
      }
    }
  });

  it('gleichmäßig verteilt: in jeder Hälfte der Spielfläche liegen Zeichen (auch im Hochformat)', () => {
    for (const { w, h } of [STAGES.hoch, STAGES.handy]) {
      for (let seed = 1; seed <= 8; seed++) {
        const s = setup(1, w, h, seed);
        const midY = s.arena.y + s.arena.h / 2;
        const top = s.bodies.filter((b) => b.y < midY).length;
        expect(top).toBeGreaterThanOrEqual(1);
        expect(s.bodies.length - top).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('Richtungen sind verschieden (nicht alle in dieselbe Richtung)', () => {
    const s = setup(6, 1180, 750, 4);
    const sx = s.bodies.reduce((a, b) => a + Math.cos(b.ang), 0);
    const sy = s.bodies.reduce((a, b) => a + Math.sin(b.ang), 0);
    expect(Math.hypot(sx, sy)).toBeLessThan(s.bodies.length * 0.5);
  });
});

describe('Drift', () => {
  it('Stufe 1–2: Zeichen stehen', () => {
    for (const level of [1, 2]) {
      const s = setup(level, 1180, 750, 2);
      const before = s.bodies.map((b) => [b.x, b.y]);
      for (let i = 0; i < 600; i++) L.stepDrift(s.bodies, 1 / 60, s.arena, L.separationFor(level), s.rng);
      expect(s.bodies.map((b) => [b.x, b.y])).toEqual(before);
    }
  });

  it('bleibt über 60 s bei 30, 60 und 120 Hz sowie dt = 0,05 in der Spielfläche', () => {
    for (const { w, h } of Object.values(STAGES)) {
      for (const level of [3, 9, 12]) {
        for (const dt of [1 / 30, 1 / 60, 1 / 120, 0.05]) {
          const s = setup(level, w, h, 11);
          const steps = Math.round(60 / dt);
          for (let i = 0; i < steps; i++) {
            L.stepDrift(s.bodies, dt, s.arena, L.separationFor(level), s.rng);
            for (const b of s.bodies) {
              const r = L.centerRange(s.arena, b);
              if (b.x < r.minX - 1e-6 || b.x > r.maxX + 1e-6 || b.y < r.minY - 1e-6 || b.y > r.maxY + 1e-6) {
                throw new Error(`außerhalb: Stufe ${level} dt ${dt} Schritt ${i}`);
              }
            }
          }
        }
      }
    }
  });

  it('keine Sprünge: je Schritt höchstens Tempo + weiches Auseinanderschieben', () => {
    for (const level of [3, 9, 12]) {
      const s = setup(level, 1180, 750, 21);
      const dt = 1 / 60;
      for (let i = 0; i < 60 * 40; i++) {
        const before = s.bodies.map((b) => [b.x, b.y]);
        L.stepDrift(s.bodies, dt, s.arena, L.separationFor(level), s.rng);
        s.bodies.forEach((b, k) => {
          const d = Math.hypot(b.x - before[k][0], b.y - before[k][1]);
          expect(d).toBeLessThanOrEqual((b.v + L.PUSH_PX_S) * dt + 1e-6);
        });
      }
    }
  });

  it('bildratenunabhängig: ohne Hindernis dieselbe Strecke bei 30, 60 und 120 Hz', () => {
    const arena = { x: 0, y: 0, w: 2000, h: 2000 };
    const dist = (dt: number) => {
      const m: L.Mover = { x: 1000, y: 1000, ang: 0.7, turn: 0, v: 80, hw: 10, hh: 10 };
      const n = Math.round(2 / dt);
      for (let i = 0; i < n; i++) L.stepDrift([m], dt, arena, 1, calm);
      return Math.hypot(m.x - 1000, m.y - 1000);
    };
    expect(dist(1 / 30)).toBeCloseTo(160, 3);
    expect(dist(1 / 60)).toBeCloseTo(160, 3);
    expect(dist(1 / 120)).toBeCloseTo(160, 3);
  });

  it('prallt an der Wand ab, mit leichter Richtungsänderung und von der Wand weg', () => {
    const arena = { x: 0, y: 0, w: 400, h: 300 };
    const m: L.Mover = { x: 380, y: 150, ang: 0, turn: 0, v: 200, hw: 10, hh: 10 };
    for (let i = 0; i < 20; i++) L.stepDrift([m], 1 / 60, arena, 1, calm);
    expect(Math.cos(m.ang)).toBeLessThan(0);
    expect(m.x).toBeLessThanOrEqual(390);
  });

  it('Zeichen mit Mindestabstand ≥ 1 (Stufe 3–5) berühren sich beim Treiben kaum', () => {
    for (const level of [3, 4, 5]) {
      const s = setup(level, 820, 1110, 31);
      let worst = 0;
      for (let i = 0; i < 60 * 40; i++) {
        L.stepDrift(s.bodies, 1 / 60, s.arena, L.separationFor(level), s.rng);
        for (let a = 0; a < s.bodies.length; a++) {
          for (let b = a + 1; b < s.bodies.length; b++) {
            const o = L.overlapOf(s.bodies[a], s.bodies[b], 1);
            if (o.ox > 0 && o.oy > 0) worst = Math.max(worst, Math.min(o.ox, o.oy));
          }
        }
      }
      expect(worst).toBeLessThan(6);
    }
  });

  it('Überlappung nimmt mit der Stufe zu: Stufe 9 deutlich mehr als Stufe 6, Stufe 3 kaum', () => {
    const mean = (level: number) => {
      let sum = 0;
      let n = 0;
      for (let seed = 1; seed <= 4; seed++) {
        const s = setup(level, 1180, 750, seed);
        for (let i = 0; i < 60 * 20; i++) {
          L.stepDrift(s.bodies, 1 / 60, s.arena, L.separationFor(level), s.rng);
          if (i % 30 === 0) {
            sum += overlappingPairs(s);
            n++;
          }
        }
      }
      return sum / n;
    };
    const m3 = mean(3);
    const m6 = mean(6);
    const m9 = mean(9);
    const m12 = mean(12);
    expect(m3).toBeLessThan(0.3);
    expect(m6).toBeGreaterThan(0.5);
    expect(m9).toBeGreaterThan(2);
    expect(m9).toBeGreaterThan(m6 * 1.5);
    expect(m12).toBeGreaterThan(m9);
  });

  it('Vorhersage: geradeaus und mit Abprall (Dreieckswelle)', () => {
    expect(L.fold(5, 0, 10)).toBe(5);
    expect(L.fold(12, 0, 10)).toBe(8);
    expect(L.fold(-3, 0, 10)).toBe(3);
    expect(L.fold(25, 0, 10)).toBe(5);
    const arena = { x: 0, y: 0, w: 100, h: 100 };
    const m: L.Mover = { x: 50, y: 50, ang: 0, turn: 0, v: 10, hw: 5, hh: 5 };
    expect(L.predict(m, arena, 2).x).toBeCloseTo(70, 9);
    // läuft nach rechts gegen die Wand bei x = 95 und zurück
    expect(L.predict(m, arena, 6).x).toBeCloseTo(95 - (50 + 60 - 95), 9);
    expect(L.predict(m, arena, 0).y).toBeCloseTo(50, 9);
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
    const lim = L.limitPerCharMs(4);
    const s = L.summarize([round(4, lim * 10 + 1, 0, [], false), round(4, lim * 10 - 1, 0, [], true)]);
    expect(s.slowRounds).toBe(1);
  });

  it('Tipp: Fehler, Buchstaben, Tempo, sonst Lob', () => {
    expect(L.tipFor(L.summarize([round(4, 20000, 4, [], false)]))).toBe('errors');
    expect(L.tipFor(L.summarize([round(9, 30000, 0, steps(14, 800, 1400)), round(9, 30000, 0, steps(14, 800, 1400))]))).toBe('letters');
    const slow = L.limitPerCharMs(4) * 10 + 5000;
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

  it('Der Text kennzeichnet die Anlehnung an Trail Making B ehrlich', () => {
    expect(de.why).toContain('angelehnt');
    expect(de.why).toContain('nicht eigens untersucht');
  });
});

// ---------------------------------------------------------------------------
// Die ganze Übung ohne Canvas durchspielen (virtuelle Zeit, Stub-Kontext)

interface Peek {
  glyphs: Array<{ k: number; x: number; y: number; hx: number; hy: number; done: boolean }>;
  next: number;
  phase: string;
  arena: L.Rect;
  geom: L.FieldGeom;
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

function harness(o: { mode?: 'play' | 'demo'; quick?: boolean; reduced?: boolean; startLevel?: number | null; seed?: number; autoplay?: boolean; w?: number; h?: number } = {}): Harness {
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
    lang: 'de',
    texts: de,
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
    const hn = harness({ seed: 8, quick: true, startLevel: 6 });
    bot(hn, { think: 3000 }); // 3 s je Zeichen: über der Grenze von Stufe 6 (2,7 s)
    const r = hn.finished[0];
    expect(r.primary.value).toBe(5);
    expect(r.level).toBe(5);
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

  it('Zeichen bewegen sich ab Stufe 3, bei 60 und 120 Hz in gleicher Größenordnung', () => {
    const travel = (hz: number) => {
      const hn = harness({ seed: 6, startLevel: 9 });
      const a = hn.peek().glyphs.map((g) => [g.x, g.y]);
      for (let i = 0; i < hz * 3; i++) hn.step(1 / hz);
      const b = hn.peek().glyphs;
      return b.reduce((s, g, i) => s + Math.hypot(g.x - a[i][0], g.y - a[i][1]), 0) / b.length;
    };
    const d60 = travel(60);
    const d120 = travel(120);
    expect(d60).toBeGreaterThan(10);
    expect(Math.abs(d60 - d120) / d60).toBeLessThan(0.35); // verschiedene Zufallswege, aber gleiche Größenordnung
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
    for (let i = 0; i < 120; i++) hn.step(1 / 60);
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
