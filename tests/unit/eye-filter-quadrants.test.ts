// EYE-EXPERIMENT: One-Euro-Filter, Viertel und Dwell-Erkennung.
import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { GazeFilter, OneEuroFilter, smoothingToParams } from '../../src/eye/filters';
import { cornerTarget, DwellDetector, quadrantCenter, quadrantOf, QUADRANTS } from '../../src/eye/quadrants';

const DT = 1000 / 30;
const sd = (xs: number[]) => {
  const m = xs.reduce((s, x) => s + x, 0) / xs.length;
  return Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / xs.length);
};

describe('One-Euro-Filter', () => {
  it('der erste Wert wird unverändert durchgereicht', () => {
    const f = new OneEuroFilter(smoothingToParams(0.5));
    expect(f.filter(0.3, 0)).toBe(0.3);
  });

  it('beruhigt Rauschen in Ruhe deutlich, bleibt dabei mittelwerttreu', () => {
    const rng = createRng(1);
    const f = new GazeFilter(0.5);
    const out: number[] = [];
    const inp: number[] = [];
    for (let i = 0; i < 300; i++) {
      const x = 0.5 + 0.02 * rng.normal();
      inp.push(x);
      out.push(f.filter(x, 0.5, i * DT).x);
    }
    expect(sd(out.slice(30))).toBeLessThan(0.7 * sd(inp.slice(30)));
    const mean = out.slice(30).reduce((s, x) => s + x, 0) / (out.length - 30);
    expect(mean).toBeCloseTo(0.5, 2);
  });

  it('stärkere Glättung = ruhiger, aber langsamer bei einem Sprung (Verzögerung vs. Ruhe)', () => {
    function run(s: number) {
      const rng = createRng(2);
      const f = new GazeFilter(s);
      const quiet: number[] = [];
      for (let i = 0; i < 150; i++) quiet.push(f.filter(0.2 + 0.02 * rng.normal(), 0.5, i * DT).x);
      // Sprung 0,2 → 0,8
      let t90 = -1;
      for (let i = 0; i < 90; i++) {
        const v = f.filter(0.8, 0.5, (150 + i) * DT).x;
        if (t90 < 0 && v >= 0.2 + 0.9 * 0.6) t90 = i * DT;
      }
      return { jitter: sd(quiet.slice(30)), t90 };
    }
    const light = run(0);
    const mid = run(0.5);
    const heavy = run(1);
    expect(light.jitter).toBeGreaterThan(mid.jitter);
    expect(mid.jitter).toBeGreaterThan(heavy.jitter);
    expect(light.t90).toBeGreaterThanOrEqual(0);
    expect(light.t90).toBeLessThan(mid.t90);
    expect(mid.t90).toBeLessThan(heavy.t90);
    expect(light.t90).toBeLessThan(100); // geringe Verzögerung bei schwacher Glättung
    expect(mid.t90).toBeLessThan(400);
  });

  it('kommt mit unregelmäßigen Zeitstempeln zurecht und konvergiert gegen den Zielwert', () => {
    const f = new OneEuroFilter(smoothingToParams(0.5));
    let t = 0;
    let v = 0;
    const rng = createRng(4);
    for (let i = 0; i < 200; i++) {
      t += 20 + rng.range(0, 40);
      v = f.filter(1, t);
    }
    expect(v).toBeCloseTo(1, 3);
    f.filter(1, t); // gleicher Zeitstempel darf nicht zu NaN führen
    expect(Number.isFinite(f.filter(1, t))).toBe(true);
  });

  it('reset beginnt neu am nächsten Messwert', () => {
    const f = new GazeFilter(1);
    f.filter(0, 0, 0);
    f.filter(0, 0, 33);
    f.reset();
    expect(f.filter(0.9, 0.9, 5000)).toEqual({ x: 0.9, y: 0.9 });
  });
});

describe('Viertel', () => {
  const size = { w: 1000, h: 600 };

  it('ordnet Punkte den vier Vierteln zu, außerhalb = null', () => {
    expect(quadrantOf({ x: 10, y: 10 }, size)).toBe('tl');
    expect(quadrantOf({ x: 990, y: 10 }, size)).toBe('tr');
    expect(quadrantOf({ x: 10, y: 590 }, size)).toBe('bl');
    expect(quadrantOf({ x: 990, y: 590 }, size)).toBe('br');
    expect(quadrantOf({ x: 500, y: 300 }, size)).toBe('br'); // Grenze gehört nach rechts/unten
    expect(quadrantOf({ x: -1, y: 10 }, size)).toBeNull();
    expect(quadrantOf({ x: 10, y: 601 }, size)).toBeNull();
  });

  it('Mittelpunkt und Eckziel liegen im jeweiligen Viertel', () => {
    for (const q of QUADRANTS) {
      expect(quadrantOf(quadrantCenter(q, size), size)).toBe(q);
      expect(quadrantOf(cornerTarget(q, size, 0.1), size)).toBe(q);
    }
    expect(cornerTarget('tl', size, 0.1)).toEqual({ x: 100, y: 60 });
    expect(cornerTarget('br', size, 0.1)).toEqual({ x: 900, y: 540 });
  });
});

describe('Dwell („Blick angekommen“)', () => {
  /** Füttert den Detektor mit einer Bildfolge (30 fps) und gibt die Ankunft zurück. */
  function run(seq: ('tl' | 'tr' | null)[], opts?: ConstructorParameters<typeof DwellDetector>[1]) {
    const d = new DwellDetector('tl', opts);
    for (let i = 0; i < seq.length; i++) {
      const r = d.push(1000 + i * DT, seq[i]);
      if (r) return { ...r, index: i };
    }
    return null;
  }

  it('meldet erst nach ≥ 150 ms (und ≥ 4 Bildern) im Zielviertel, Ankunft = erstes Bild der Serie', () => {
    const seq = [...Array(3).fill('tr'), ...Array(10).fill('tl')] as ('tl' | 'tr')[];
    const r = run(seq)!;
    expect(r.arrivedAt).toBeCloseTo(1000 + 3 * DT, 6);
    expect(r.confirmedAt - r.arrivedAt).toBeGreaterThanOrEqual(150);
    expect(r.frames).toBeGreaterThanOrEqual(4);
    expect(r.index).toBe(3 + 5); // 6 Bilder (bei 30 fps ist ab dem 6. Bild ≥ 150 ms vergangen)
  });

  it('zu kurzer Aufenthalt (4 Bilder = 100 ms) reicht nicht', () => {
    const seq = [...Array(4).fill('tl'), ...Array(5).fill('tr')] as ('tl' | 'tr')[];
    expect(run(seq)).toBeNull();
  });

  it('toleriert einen einzelnen Aussetzer/Ausreißer, aber nicht zwei in Folge', () => {
    const one = ['tl', 'tl', null, 'tl', 'tl', 'tl', 'tl', 'tl', 'tl'] as ('tl' | null)[];
    expect(run(one)).not.toBeNull();
    expect(run(one)!.arrivedAt).toBeCloseTo(1000, 6);
    const two = ['tl', 'tl', null, null, 'tl', 'tl', 'tl', 'tl', 'tl', 'tl', 'tl'] as ('tl' | null)[];
    const r = run(two);
    expect(r).not.toBeNull();
    expect(r!.arrivedAt).toBeCloseTo(1000 + 4 * DT, 6); // neue Serie nach der Lücke
    const noTol = run(one, { gapFrames: 0 });
    expect(noTol!.arrivedAt).toBeCloseTo(1000 + 3 * DT, 6);
  });

  it('meldet nur einmal; reset erlaubt neues Ziel', () => {
    const d = new DwellDetector('tl');
    let n = 0;
    for (let i = 0; i < 20; i++) if (d.push(i * DT, 'tl')) n++;
    expect(n).toBe(1);
    expect(d.arrived).toBe(true);
    d.reset('tr');
    expect(d.arrived).toBe(false);
    let m = 0;
    for (let i = 0; i < 20; i++) if (d.push(1000 + i * DT, 'tr')) m++;
    expect(m).toBe(1);
  });

  it('niedrige Bildrate: 4 Bilder mit je 60 ms reichen (240 ms ≥ 150 ms)', () => {
    const d = new DwellDetector('tl');
    const r = [0, 60, 120, 180, 240].map((t) => d.push(t, 'tl')).find(Boolean);
    expect(r).toBeTruthy();
  });
});
