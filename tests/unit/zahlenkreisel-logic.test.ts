import { describe, expect, it } from 'vitest';
import { createFormatter } from '../../src/core/format';
import { createRng } from '../../src/core/rng';
import { sanitizeParams, variantKey } from '../../src/core/params';
import type { Exercise, ExerciseContext, ExerciseResult, PointerInfo } from '../../src/core/types';
import { zahlenkreisel } from '../../src/exercises/zahlenkreisel';
import { de, it as itTexts } from '../../src/exercises/zahlenkreisel/texts';
import * as L from '../../src/exercises/zahlenkreisel/logic';

/** Bühnen: Rohmaße (Handy 390×844, Tablet 1180×820 / 820×1180) und Bühnen ohne Kopfleiste */
const SIZES: Array<[string, number, number]> = [
  ['handy', 390, 844],
  ['handy-buehne', 390, 781],
  ['handy-klein', 360, 740],
  ['tablet-quer', 1180, 820],
  ['tablet-quer-buehne', 1180, 750],
  ['tablet-hoch', 820, 1180],
  ['handy-quer', 844, 390],
];

interface Board {
  geom: L.FieldGeom;
  plan: L.RingPlan;
  motions: L.RingMotion[];
  slots: L.Slot[];
  u: number;
}

function board(w: number, h: number, N: number, seed: number, level = 8, s: Partial<L.Settings> = {}): Board {
  const u = Math.min(w, h) / 100;
  const rng = createRng(seed);
  const { geom, plan } = L.chooseLayout(w, h, u, h - 8, N);
  const settings: L.Settings = { count: N, tempo: 1.5, counter: true, sway: 1.5, ...s };
  const motions = L.ringMotions(plan, L.levelSpec(level), settings, u, rng);
  return { geom, plan, motions, slots: L.slotsOf(plan.counts), u };
}

const positions = (b: Board, tSec: number) => b.slots.map((s) => L.slotPos(b.geom.cx, b.geom.cy, b.motions[s.ring], s.j, tSec));

describe('Stufen und Einstellungen', () => {
  it('Stufen 1–8: Tempo, Unterschied der Ringe und Schaukeln steigen, Neigung nie über 18°', () => {
    expect(L.LEVELS.length).toBe(L.MAX_LEVEL);
    for (let l = 2; l <= L.MAX_LEVEL; l++) {
      const a = L.levelSpec(l - 1);
      const b = L.levelSpec(l);
      expect(b.speedU).toBeGreaterThan(a.speedU);
      expect(b.ringVar).toBeGreaterThanOrEqual(a.ringVar);
      expect(b.swayDeg).toBeGreaterThan(a.swayDeg);
    }
    for (const s of L.LEVELS) expect(s.swayDeg * L.SWAY_FACTOR.strong).toBeLessThanOrEqual(L.MAX_TILT_DEG);
    expect(L.levelOf(0)).toBe(1);
    expect(L.levelOf(4.9)).toBe(4);
    expect(L.levelOf(99)).toBe(8);
    expect(L.levelOf(Number.NaN)).toBe(1);
  });

  it('Einstellungen werden bereinigt: Standard 40 Zahlen, 100 %, gegenläufig, normales Schaukeln', () => {
    expect(L.settingsFrom({})).toEqual({ count: 40, tempo: 1, counter: true, sway: 1 });
    expect(L.settingsFrom({ count: 7, tempo: 999, counter: 'off', sway: 'strong' })).toEqual({ count: 20, tempo: 1.5, counter: false, sway: 1.5 });
    expect(L.settingsFrom({ count: 33, tempo: 60, sway: 'quatsch' })).toEqual({ count: 35, tempo: 0.5, counter: true, sway: 1 });
    expect(L.settingsFrom({ count: '25', sway: 'off' }).count).toBe(25);
    expect(L.settingsFrom({ sway: 'off' }).sway).toBe(0);
    expect(L.settingsFrom(null).count).toBe(40);
    // jede Einstellung gehört zum Variantenschlüssel (Vergleich nur mit gleichen Einstellungen)
    expect(variantKey(L.PARAM_DEFS, {})).toBe('count=40|counter=on|sway=normal|tempo=100');
    expect(variantKey(L.PARAM_DEFS, { count: 20 })).not.toBe(variantKey(L.PARAM_DEFS, {}));
  });
});

describe('Anordnung auf Ringen', () => {
  it('20/30/40 Zahlen passen auf Handy und Tablet; Trefferflächen ≥ 44 px (Tablet deutlich größer), Ziffern ≥ 22 px', () => {
    for (const [name, w, h] of SIZES) {
      for (const N of [20, 30, 40]) {
        const b = board(w, h, N, 1);
        expect(b.plan.fits, `${name} N=${N}`).toBe(true);
        expect(b.plan.counts.reduce((s, c) => s + c, 0)).toBe(N);
        expect(2 * b.plan.hitR).toBeGreaterThanOrEqual(L.MIN_PITCH);
        expect(b.plan.F).toBeGreaterThanOrEqual(L.MIN_FONT);
        // Hüllkreis + Luft passt in die Teilung
        expect(2 * b.plan.rb).toBeLessThan(b.plan.pitch);
      }
    }
    const tab = board(1180, 820, 40, 1);
    expect(2 * tab.plan.hitR).toBeGreaterThanOrEqual(64);
    expect(tab.plan.F).toBeGreaterThanOrEqual(40);
    const phone = board(390, 844, 40, 1);
    expect(2 * phone.plan.hitR).toBeGreaterThanOrEqual(L.TARGET_PITCH);
  });

  it('mehrere Ringe, außen mehr Zahlen als innen; Ringe liegen eine Teilung auseinander', () => {
    for (const [name, w, h] of SIZES) {
      const b = board(w, h, 40, 2);
      const rings = b.plan.radii.filter((r) => r > 0);
      expect(rings.length, name).toBeGreaterThanOrEqual(3);
      for (let i = 1; i < b.plan.radii.length; i++) {
        expect(b.plan.radii[i - 1] - b.plan.radii[i]).toBeGreaterThanOrEqual(b.plan.pitch - 1e-6);
        expect(b.plan.counts[i]).toBeLessThanOrEqual(b.plan.counts[i - 1]);
      }
      for (let i = 0; i < b.plan.radii.length; i++) expect(b.plan.counts[i]).toBeLessThanOrEqual(L.ringCapacity(b.plan.radii[i], b.plan.pitch));
    }
  });

  it('keine Überlappung zu keinem Zeitpunkt (viele Zufallsläufe, gegenläufige Ringe, volle Umdrehung abgetastet)', () => {
    for (const [name, w, h] of SIZES) {
      for (const N of [20, 30, 40]) {
        for (let seed = 1; seed <= 4; seed++) {
          const b = board(w, h, N, seed);
          const minD = 2 * b.plan.hitR - 1e-6;
          const { cx, cy, R } = b.geom;
          // 0–120 s in 0,4-s-Schritten (die Geometrie garantiert den Abstand; die Abtastung prüft sie nach)
          for (let t = 0; t <= 120; t += 0.4) {
            const p = positions(b, t);
            for (let i = 0; i < p.length; i++) {
              const d0 = Math.hypot(p[i].x - cx, p[i].y - cy);
              // Hüllkreis und Trefferfläche bleiben im runden Feld
              expect(d0 + Math.max(b.plan.rb, b.plan.hitR)).toBeLessThanOrEqual(R + 1e-6);
              for (let j = i + 1; j < p.length; j++) {
                const d = Math.hypot(p[i].x - p[j].x, p[i].y - p[j].y);
                if (d < minD) throw new Error(`${name} N=${N} seed=${seed} t=${t}: Abstand ${d.toFixed(1)} < ${minD.toFixed(1)}`);
              }
            }
          }
        }
      }
    }
  }, 120_000);

  it('Teilung reicht für die Hüllkreise: zwei Zahlen in beliebiger Schräglage berühren sich nie', () => {
    for (const [, w, h] of SIZES) {
      const b = board(w, h, 40, 3);
      expect(b.plan.pitch).toBeGreaterThanOrEqual(2 * b.plan.rb + 6 - 1e-9);
    }
    // Hüllkreis enthält jede Ecke der Zahl bei jeder Drehung
    const F = 40;
    const { hw, hh } = L.visibleHalf('38', F);
    expect(Math.hypot(hw, hh)).toBeLessThanOrEqual(L.boundRadius(F) + 1e-9);
  });

  it('Ringkapazität: Sehne 2r·sin(π/n) ≥ Teilung', () => {
    for (const r of [50, 62, 100, 162, 300]) {
      for (const p of [44, 50, 74]) {
        const n = L.ringCapacity(r, p);
        if (n > 1) expect(2 * r * Math.sin(Math.PI / n)).toBeGreaterThanOrEqual(p - 1e-6);
        expect(2 * r * Math.sin(Math.PI / (n + 1))).toBeLessThan(p);
      }
    }
    expect(L.ringCapacity(0, 50)).toBe(1);
  });

  it('Verteilung: Summe stimmt, Mitte nur bei Bedarf, nie über der Kapazität', () => {
    expect(L.distribute([20, 13, 7, 1], 40)).toEqual([20, 13, 7, 0]);
    expect(L.distribute([20, 13, 7, 1], 41)).toEqual([20, 13, 7, 1]);
    const d = L.distribute([24, 18, 12, 5, 1], 40);
    expect(d.reduce((s, c) => s + c, 0)).toBe(40);
    expect(d[4]).toBe(0);
    d.forEach((c, i) => expect(c).toBeLessThanOrEqual([24, 18, 12, 5, 1][i]));
    expect(d[0]).toBeGreaterThan(d[3]);
  });
});

describe('Bewegung', () => {
  it('benachbarte Ringe drehen abwechselnd gegeneinander; „Gegenläufig aus“: alle gleich herum', () => {
    for (let seed = 1; seed <= 20; seed++) {
      const b = board(1180, 820, 40, seed, 5, { counter: true });
      const rot = b.motions.filter((m) => m.r > 0);
      expect(rot[0].omega).toBeGreaterThan(0);
      for (let i = 1; i < rot.length; i++) expect(Math.sign(rot[i].omega)).toBe(-Math.sign(rot[i - 1].omega));
      const same = board(1180, 820, 40, seed, 5, { counter: false }).motions.filter((m) => m.r > 0);
      for (const m of same) expect(m.omega).toBeGreaterThan(0);
    }
  });

  it('Tempo: langsam, mit der Stufe steigend, nach oben begrenzt; die Mitte steht', () => {
    for (let l = 1; l <= L.MAX_LEVEL; l++) {
      const spec = L.levelSpec(l);
      for (let seed = 1; seed <= 10; seed++) {
        const b = board(1180, 820, 41, seed, l, { tempo: 1.5 });
        const peak = L.peakSpeed(b.motions);
        expect(peak).toBeLessThanOrEqual(spec.speedU * b.u * 1.5 * (1 + spec.ringVar) + 1e-6);
        for (const m of b.motions) if (m.r === 0) expect(m.omega).toBe(0);
      }
    }
    // Stufe 8 · 150 %: höchstens ≈ 16,2 u/s (am Tablet ≈ 3,7°/s bei 0,23° je u)
    expect(L.levelSpec(8).speedU * 1.5 * (1 + L.levelSpec(8).ringVar) * 0.23).toBeLessThan(4);
    const slow = L.peakSpeed(board(1180, 820, 40, 4, 1, { tempo: 1 }).motions);
    const fast = L.peakSpeed(board(1180, 820, 40, 4, 8, { tempo: 1 }).motions);
    expect(fast).toBeGreaterThan(2.5 * slow);
  });

  it('Position ist eine reine Funktion der Zeit; Ringe drehen starr (Abstände im Ring bleiben gleich)', () => {
    const b = board(1180, 820, 40, 7);
    const a1 = positions(b, 12.345);
    const a2 = positions(b, 12.345);
    expect(a1).toEqual(a2);
    const ringIdx = b.slots.map((s, i) => (s.ring === 0 ? i : -1)).filter((i) => i >= 0);
    const d = (p: ReturnType<typeof positions>) => Math.hypot(p[ringIdx[0]].x - p[ringIdx[1]].x, p[ringIdx[0]].y - p[ringIdx[1]].y);
    expect(d(positions(b, 0))).toBeCloseTo(d(positions(b, 33)), 6);
  });

  it('Schaukeln: aufrecht, |Neigung| ≤ Amplitude ≤ 18°, eigene Phase je Zahl, unabhängig vom Ringwinkel', () => {
    const rng = createRng(5);
    const sways = Array.from({ length: 40 }, () => L.makeSway(L.levelSpec(8), L.SWAY_FACTOR.strong, rng));
    const maxRad = (L.MAX_TILT_DEG * Math.PI) / 180;
    for (const s of sways) {
      expect(s.amp).toBeLessThanOrEqual(maxRad + 1e-12);
      expect(s.hz).toBeGreaterThan(0.2);
      expect(s.hz).toBeLessThan(0.6);
      let peak = 0;
      for (let t = 0; t < 30; t += 0.01) {
        const a = Math.abs(L.tiltAt(s, t));
        expect(a).toBeLessThanOrEqual(s.amp + 1e-12);
        peak = Math.max(peak, a);
      }
      expect(peak).toBeGreaterThan(0.95 * s.amp);
    }
    expect(new Set(sways.map((s) => s.psi.toFixed(4))).size).toBe(40);
    // Normal: Stufe 5 → 8°, Stufe 8 → 12°; aus → 0
    expect(L.makeSway(L.levelSpec(5), 1, rng).amp).toBeCloseTo((8 * Math.PI) / 180, 9);
    expect(L.makeSway(L.levelSpec(8), 1, rng).amp).toBeCloseTo((12 * Math.PI) / 180, 9);
    const off = L.makeSway(L.levelSpec(8), 0, rng);
    expect(L.tiltAt(off, 3.3)).toBe(0);
  });
});

describe('Zuordnung der Zahlen', () => {
  it('jede Zahl genau einmal, neu gemischt je Lauf, aufeinanderfolgende nie direkt nebeneinander im Ring', () => {
    const seen = new Set<string>();
    for (const [, w, h] of SIZES) {
      for (const N of [20, 30, 40]) {
        for (let seed = 1; seed <= 15; seed++) {
          const b = board(w, h, N, seed);
          const numberAt = L.assignNumbers(b.slots, b.plan.counts, createRng(seed * 31));
          expect(numberAt.slice().sort((a, c) => a - c)).toEqual(Array.from({ length: N }, (_, i) => i + 1));
          const slotOf = new Map<number, L.Slot>();
          numberAt.forEach((n, i) => slotOf.set(n, b.slots[i]));
          for (let n = 2; n <= N; n++) expect(L.adjacent(slotOf.get(n - 1)!, slotOf.get(n)!, b.plan.counts)).toBe(false);
          seen.add(numberAt.join(','));
        }
      }
    }
    // je Anzahl und Startwert eine andere Folge (gleiche Startwerte auf verschiedenen Bühnen dürfen sich gleichen)
    expect(seen.size).toBeGreaterThanOrEqual(3 * 15);
  });
});

describe('Antippen und Ablauf', () => {
  const items: L.Hittable[] = [
    { x: 100, y: 100, r: 25, num: 1, done: false },
    { x: 160, y: 100, r: 25, num: 2, done: false },
    { x: 220, y: 100, r: 25, num: 3, done: true },
  ];

  it('pickTap: gesuchte, falsche, schon gefundene, daneben', () => {
    expect(L.pickTap(items, 105, 98, 1)).toEqual({ kind: 'target', i: 0 });
    expect(L.pickTap(items, 160, 110, 1)).toEqual({ kind: 'wrong', i: 1 });
    expect(L.pickTap(items, 220, 100, 1)).toEqual({ kind: 'old', i: 2 });
    expect(L.pickTap(items, 130, 140, 1)).toEqual({ kind: 'none' });
  });

  it('Zustand: richtige Folge, Fehltipps zählen, schon gefundene und daneben zählen nicht', () => {
    const s = L.newRun(4, 1000);
    expect(L.registerTap(s, 2, 1500)).toBe('wrong');
    expect(s.errors).toBe(1);
    expect(L.registerTap(s, 1, 2000)).toBe('target');
    expect(L.registerTap(s, 1, 2100)).toBe('old');
    expect(L.registerTap(s, null, 2200)).toBe('none');
    expect(L.registerTap(s, 2, 2600)).toBe('target');
    expect(L.registerTap(s, 4, 2700)).toBe('wrong');
    expect(L.registerTap(s, 3, 3600)).toBe('target');
    expect(L.isDone(s)).toBe(false);
    expect(L.registerTap(s, 4, 4000)).toBe('target');
    expect(L.isDone(s)).toBe(true);
    expect(L.registerTap(s, 1, 4100)).toBe('none');
    expect(s.errors).toBe(2);
    expect(s.intervals).toEqual([1000, 600, 1000, 400]);
  });

  it('Bewertung: Zeitrahmen, Fehlergrenze, Stufenwechsel, Hauptwert', () => {
    expect(L.limitPerNumberMs(40, 1)).toBeCloseTo(1600 * 1.3, 9);
    expect(L.limitPerNumberMs(40, 8)).toBeCloseTo(1600 * 1.02, 9);
    expect(L.limitPerNumberMs(20, 1)).toBeCloseTo(1100 * 1.3, 9);
    for (let l = 2; l <= 8; l++) expect(L.limitPerNumberMs(40, l)).toBeLessThan(L.limitPerNumberMs(40, l - 1));
    const lim = L.limitPerNumberMs(40, 3) * 40;
    expect(L.maxErrorsFor(40)).toBe(2);
    expect(L.judge(40, 3, lim, 2)).toBe('success');
    expect(L.judge(40, 3, lim, 3)).toBe('same');
    expect(L.judge(40, 3, lim + 1, 0)).toBe('same');
    expect(L.judge(40, 3, lim * 1.6, 0)).toBe('fail');
    expect(L.judge(40, 3, lim, 7)).toBe('fail');
    expect(L.judge(40, 3, lim, 0, false)).toBe('fail');
    expect(L.nextLevelAfter(3, 'success')).toBe(4);
    expect(L.nextLevelAfter(3, 'same')).toBe(3);
    expect(L.nextLevelAfter(3, 'fail')).toBe(2);
    expect(L.nextLevelAfter(8, 'success')).toBe(8);
    expect(L.nextLevelAfter(1, 'fail')).toBe(1);
    expect(L.primaryLevel(3, 'success')).toBe(3);
    expect(L.primaryLevel(3, 'same')).toBe(2);
    expect(L.primaryLevel(1, 'fail')).toBe(1);
  });

  it('Kennwerte: Zehnerblöcke, Zeit pro Zahl (ohne die erste), Stoppuhr, Tipps', () => {
    const iv = [3000, ...Array.from({ length: 24 }, () => 1000)];
    expect(L.blockTimes(iv)).toEqual([
      { from: 1, to: 10, ms: 12000 },
      { from: 11, to: 20, ms: 10000 },
      { from: 21, to: 25, ms: 5000 },
    ]);
    expect(L.perNumberMs(iv)).toBe(1000);
    expect(L.perNumberMs([])).toBeNaN();
    expect(L.stopwatch(0)).toBe('00:00,00');
    expect(L.stopwatch(72_345)).toBe('01:12,34');
    expect(L.stopwatch(605_999)).toBe('10:05,99');
    const base = { N: 30, level: 2, errors: 0, complete: true };
    expect(L.tipFor({ ...base, totalMs: 30_000, intervals: Array(30).fill(1000) })).toBe('great');
    expect(L.tipFor({ ...base, totalMs: 30_000, errors: 4, intervals: Array(30).fill(1000) })).toBe('errors');
    expect(L.tipFor({ ...base, totalMs: 40_000, intervals: [...Array(20).fill(1000), ...Array(10).fill(2000)] })).toBe('late');
    expect(L.tipFor({ ...base, totalMs: 120_000, intervals: Array(30).fill(4000) })).toBe('system');
    for (const k of ['great', 'errors', 'late', 'system']) {
      expect(de.tips[k]).toBeTruthy();
      expect(itTexts.tips[k]).toBeTruthy();
    }
  });
});

// ---------------------------------------------------------------------------
// Übung ohne Canvas

interface Peek {
  phase: string;
  items: Array<{ num: number; x: number; y: number; tilt: number; done: boolean }>;
  run: L.RunState;
  plan: L.RingPlan;
}

interface Harness {
  ex: Exercise;
  peek: () => Peek;
  finished: ExerciseResult[];
  calls: { bad: number; tap: number; captions: string[] };
  t: number;
  step: (dt: number) => void;
  down: (x: number, y: number) => void;
}

function harness(o: { mode?: 'play' | 'demo'; quick?: boolean; reduced?: boolean; startLevel?: number | null; seed?: number; autoplay?: boolean; w?: number; h?: number; params?: Record<string, unknown> } = {}): Harness {
  const finished: ExerciseResult[] = [];
  const calls = { bad: 0, tap: 0, captions: [] as string[] };
  const w = o.w ?? 1180;
  const h = o.h ?? 750;
  const stage = { w, h, u: Math.min(w, h) / 100, dpr: 1 };
  let now = 0;
  let pending: { x: number; y: number; due: number } | null = null;
  let busyUntil = 0;
  const ghost = {
    tap: (x: number, y: number, opt: { delay?: number; move?: number } = {}) => {
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
    params: o.params ? sanitizeParams(L.PARAM_DEFS, o.params) : undefined,
    lang: 'de',
    texts: de,
    rng: createRng(o.seed ?? 1),
    sfx: { tick() {}, go() {}, good() {}, bad: () => calls.bad++, tap: () => calls.tap++, done() {} },
    hud: { setProgress() {}, setScore() {}, setLabel() {}, toast() {}, caption: (t: string | null) => t && calls.captions.push(t) },
    ghost,
    stage,
    fmt: createFormatter('de'),
    now: () => now,
    finish: (r: ExerciseResult) => finished.push(r),
  } as unknown as ExerciseContext;
  const ex = zahlenkreisel.create(ctx);
  ex.start(0);
  return {
    ex,
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
}

/** Spieler: tippt die gesuchte Zahl nach `think` ms; `wrongEvery` > 0: jedes n-te Mal erst eine falsche */
function bot(hn: Harness, o: { think?: number; wrongEvery?: number; emptyEvery?: number; maxMs?: number } = {}): void {
  const think = o.think ?? 600;
  let since = 0;
  let count = 0;
  const maxMs = o.maxMs ?? 400_000;
  while (hn.finished.length === 0 && hn.t < maxMs) {
    hn.step(1 / 60);
    const pk = hn.peek();
    if (pk.phase !== 'play') continue;
    since += 1000 / 60;
    if (since < think) continue;
    since = 0;
    count++;
    const g = pk.items.find((q) => q.num === pk.run.next);
    if (!g) continue;
    if (o.emptyEvery && count % o.emptyEvery === 0) {
      hn.down(2, 2); // daneben (außerhalb des runden Felds)
      continue;
    }
    if (o.wrongEvery && count % o.wrongEvery === 0) {
      const w = pk.items.find((q) => !q.done && q.num !== pk.run.next);
      if (w) hn.down(w.x, w.y);
    }
    hn.down(g.x, g.y);
  }
}

describe('Übung ohne Canvas durchgespielt', () => {
  it('Standard: 40 Zahlen; fehlerfreier zügiger Spieler schafft die Stufe, Ergebnis vollständig', () => {
    const hn = harness({ seed: 3, startLevel: 2 });
    expect(hn.peek().items.length).toBe(40);
    bot(hn, { think: 900 });
    expect(hn.finished.length).toBe(1);
    const r = hn.finished[0];
    expect(r.primary).toMatchObject({ key: 'level', unit: 'level', better: 'higher', value: 2 });
    expect(r.level).toBe(3);
    const keys = r.secondary.map((m) => m.key);
    expect(keys).toEqual(['total', 'perNumber', 'errors']);
    const total = r.secondary.find((m) => m.key === 'total')!;
    expect(total.unit).toBe('time');
    expect(total.value).toBeGreaterThan(35_000);
    expect(total.value).toBeLessThan(40_000);
    expect(r.secondary.find((m) => m.key === 'perNumber')!.value).toBeGreaterThan(850);
    expect(r.secondary.find((m) => m.key === 'errors')!.value).toBe(0);
    expect(r.details?.[0].rows.length).toBe(4);
    expect(r.details?.[0].rows[0].label).toBe('1–10');
    expect(r.score).toBeGreaterThan(0);
    for (const m of [r.primary, ...r.secondary]) {
      expect(de.metrics[m.key]).toBeTruthy();
      expect(itTexts.metrics[m.key]).toBeTruthy();
    }
    expect(de.tips[r.tip ?? 'great']).toBeTruthy();
    expect(hn.calls.tap).toBe(40);
  });

  it('Fehltipps zählen (mit Ton), Tipps ins Leere und auf gefundene Zahlen nicht', () => {
    const hn = harness({ seed: 5, params: { count: 20 } });
    bot(hn, { think: 500, emptyEvery: 3 });
    expect(hn.finished[0].secondary.find((m) => m.key === 'errors')!.value).toBe(0);
    expect(hn.calls.bad).toBe(0);

    const hw = harness({ seed: 5, params: { count: 20 } });
    bot(hw, { think: 500, wrongEvery: 4 });
    const errs = hw.finished[0].secondary.find((m) => m.key === 'errors')!.value;
    expect(errs).toBeGreaterThan(2);
    expect(hw.calls.bad).toBe(errs);
    // viele Fehltipps → nicht geschafft
    expect(hw.finished[0].primary.value).toBe(1);
  });

  it('zu langsam → nächste Sitzung leichter', () => {
    const hn = harness({ seed: 8, startLevel: 4, params: { count: 20 } });
    bot(hn, { think: 3000 });
    const r = hn.finished[0];
    expect(r.primary.value).toBe(3);
    expect(r.level).toBe(3);
    expect(r.tip).toBe('system');
  });

  it('Einstellungen wirken: Anzahl, Gegenlauf aus, Schaukeln aus', () => {
    const hn = harness({ seed: 2, params: { count: 25, counter: 'off', sway: 'off' } });
    hn.step(1 / 60);
    const pk = hn.peek();
    expect(pk.items.length).toBe(25);
    const motions = (hn.ex as unknown as { motions: L.RingMotion[] }).motions.filter((m) => m.r > 0);
    for (const m of motions) expect(m.omega).toBeGreaterThan(0);
    for (let k = 0; k < 120; k++) hn.step(1 / 60);
    for (const q of hn.peek().items) expect(q.tilt).toBe(0);
  });

  it('Bewegung reduzieren: Ringe und Ziffern stehen still', () => {
    const hn = harness({ seed: 4, reduced: true });
    hn.step(1 / 60);
    const before = hn.peek().items.map((q) => ({ x: q.x, y: q.y }));
    for (let k = 0; k < 600; k++) hn.step(1 / 60);
    const after = hn.peek().items;
    after.forEach((q, i) => {
      expect(q.x).toBeCloseTo(before[i].x, 9);
      expect(q.y).toBeCloseTo(before[i].y, 9);
      expect(q.tilt).toBe(0);
    });
  });

  it('Bewegung: Zahlen wandern, Ziffern neigen sich nur im erlaubten Rahmen', () => {
    const hn = harness({ seed: 4, startLevel: 8 });
    hn.step(1 / 60);
    const before = hn.peek().items.map((q) => ({ x: q.x, y: q.y }));
    let maxTilt = 0;
    for (let k = 0; k < 600; k++) {
      hn.step(1 / 60);
      for (const q of hn.peek().items) maxTilt = Math.max(maxTilt, Math.abs(q.tilt));
    }
    const moved = hn.peek().items.filter((q, i) => Math.hypot(q.x - before[i].x, q.y - before[i].y) > 5).length;
    expect(moved).toBeGreaterThan(30);
    expect(maxTilt).toBeLessThanOrEqual((12 * Math.PI) / 180 + 1e-9);
    expect(maxTilt).toBeGreaterThan((6 * Math.PI) / 180);
  });

  it('Handy (390×781): 40 Zahlen, Autoplay spielt bis zum Ergebnis', () => {
    const hn = harness({ seed: 9, autoplay: true, w: 390, h: 781 });
    expect(hn.peek().items.length).toBe(40);
    while (!hn.finished.length && hn.t < 400_000) hn.step(1 / 60);
    expect(hn.finished.length).toBe(1);
    expect(hn.finished[0].secondary.map((m) => m.key)).toContain('total');
  });

  it('Schnellmodus: höchstens 10 Zahlen; Notbremse beendet eine liegen gelassene Runde', () => {
    const hq = harness({ seed: 1, quick: true });
    expect(hq.peek().items.length).toBe(10);
    while (!hq.finished.length && hq.t < 60_000) hq.step(1 / 30);
    const r = hq.finished[0];
    expect(r.secondary.map((m) => m.key)).toEqual(['found', 'errors']);
    expect(r.primary.value).toBe(1);
    expect(r.tip).toBe('system');
  });

  it('Intro-Film: Hand tippt die ersten Zahlen, Bildunterschriften wechseln, Film endet', () => {
    const hn = harness({ mode: 'demo', seed: 2, w: 480, h: 360 });
    expect(hn.peek().items.length).toBe(12);
    while (!hn.finished.length && hn.t < 30_000) hn.step(1 / 60);
    expect(hn.finished.length).toBe(1);
    expect(hn.t).toBeLessThan(16_000);
    expect(hn.peek().run.next).toBe(6);
    expect(hn.peek().run.errors).toBe(0);
    expect(new Set(hn.calls.captions).size).toBeGreaterThanOrEqual(5);
    for (const k of Object.keys(de.captions)) expect(hn.calls.captions).toContain(de.captions[k]);
  });

  it('Drehen des Geräts: Runde läuft weiter, gefundene bleiben gefunden, keine Überlappung', () => {
    const hn = harness({ seed: 6, w: 1180, h: 750 });
    bot(hn, { think: 400, maxMs: 4000 });
    const found = hn.peek().items.filter((q) => q.done).map((q) => q.num).sort((a, b) => a - b);
    expect(found.length).toBeGreaterThan(3);
    const stage = (hn.ex as unknown as { ctx: { stage: { w: number; h: number; u: number } } }).ctx.stage;
    stage.w = 390;
    stage.h = 781;
    stage.u = 3.9;
    hn.ex.resize?.(390, 781);
    hn.step(1 / 60);
    const pk = hn.peek();
    expect(pk.items.filter((q) => q.done).map((q) => q.num).sort((a, b) => a - b)).toEqual(found);
    for (let i = 0; i < pk.items.length; i++)
      for (let j = i + 1; j < pk.items.length; j++) expect(Math.hypot(pk.items[i].x - pk.items[j].x, pk.items[i].y - pk.items[j].y)).toBeGreaterThanOrEqual(2 * pk.plan.hitR - 1e-6);
    bot(hn, { think: 400 });
    expect(hn.finished.length).toBe(1);
  });
});

describe('Texte', () => {
  it('Einstellungen, Kennzahlen und Rückmeldungen haben Texte in beiden Sprachen', () => {
    for (const t of [de, itTexts]) {
      for (const d of L.PARAM_DEFS) {
        expect(t.params?.[d.key]?.label).toBeTruthy();
        if (d.type === 'select') for (const o of d.options) expect(t.params?.[d.key]?.options?.[o]).toBeTruthy();
      }
      for (const k of ['level', 'total', 'found', 'perNumber', 'errors']) expect(t.metricHints?.[k]).toBeTruthy();
      for (const k of ['search', 'level', 'up', 'done', 'demoEnd', 'blocks', 'blocksNote', 'perNumber']) expect(t.feedback[k]).toBeTruthy();
      expect(t.why).toMatch(/nicht belegt|non è dimostrato/);
    }
  });
});
