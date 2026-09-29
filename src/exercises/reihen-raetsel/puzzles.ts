/**
 * Aufgaben-Generator für das Reihen-Rätsel.
 *
 * Jede Regel („Baustein“) gehört zu einer Schwierigkeitsstufe 1–8 und liefert eine Reihe, die richtige
 * Fortsetzung und Ablenker in der Reihenfolge ihrer Plausibilität (typische Fehler: Richtung vertauscht,
 * um eins daneben, gleichen Abstand statt wachsendem angenommen, die andere von zwei verschränkten
 * Reihen fortgesetzt, Form oder Anzahl übersehen …). Fehlende Ablenker werden sinnvoll aufgefüllt.
 */
import type { Rng } from '../../core/rng';

export type Shape = 'circle' | 'triangle' | 'square' | 'star' | 'diamond';
export const SHAPES: readonly Shape[] = ['circle', 'triangle', 'square', 'star', 'diamond'];

/** n = Zahl, l = Buchstabe (0 = A), s = Form × Anzahl, a = Pfeil (Drehung in Achteln, 0 = oben) */
export type Item = { t: 'n'; v: number } | { t: 'l'; v: number } | { t: 's'; s: Shape; n: number } | { t: 'a'; r: number };

/** Familie – für den persönlichen Tipp am Ende */
export type Family = 'diff' | 'mult' | 'two' | 'letter' | 'shape';

/** Erklärung: Textschlüssel + Werte; Werte mit „@“ verweisen auf einen weiteren Textschlüssel */
export interface Why {
  key: string;
  vars?: Record<string, string | number>;
}

export interface Puzzle {
  id: string;
  level: number;
  family: Family;
  seq: Item[];
  answer: Item;
  options: Item[];
  why: Why;
}

interface Raw {
  seq: Item[];
  answer: Item;
  distract: Item[];
  why: Why;
}

interface Gen {
  id: string;
  level: number;
  family: Family;
  make(r: Rng): Raw;
}

export const MAX_LEVEL = 8;

export function itemKey(it: Item): string {
  switch (it.t) {
    case 'n':
      return `n${it.v}`;
    case 'l':
      return `l${it.v}`;
    case 's':
      return `s${it.s}${it.n}`;
    default:
      return `a${((it.r % 8) + 8) % 8}`;
  }
}

export function letter(v: number): string {
  return String.fromCharCode(65 + v);
}

const N = (v: number): Item => ({ t: 'n', v });
const Lt = (v: number): Item => ({ t: 'l', v });
const S = (s: Shape, n = 1): Item => ({ t: 's', s, n });
const A = (r: number): Item => ({ t: 'a', r: ((r % 8) + 8) % 8 });
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const nums = (xs: number[]) => xs.map(N);
const list = (xs: Array<string | number>) => `${xs.join(', ')} …`;
const chain = (xs: number[]) => `${xs.map(letter).join(' → ')} …`;

function numRaw(seq: number[], ans: number, distract: number[], why: Why): Raw {
  return { seq: nums(seq), answer: N(ans), distract: nums(distract), why };
}

function shapesExcept(r: Rng, ...not: Shape[]): Shape[] {
  return r.shuffle(SHAPES.filter((s) => !not.includes(s)));
}

const GENS: Gen[] = [
  // ---------------------------------------------------------------- Stufe 1
  {
    id: 'add1',
    level: 1,
    family: 'diff',
    make(r) {
      const k = r.pick([1, 2, 5, 10]);
      const a = k >= 5 ? k * (1 + r.int(4)) : 1 + r.int(9);
      const seq = range(5).map((i) => a + i * k);
      const ans = a + 5 * k;
      return numRaw(seq, ans, [ans + 1, ans - 1, ans + k, seq[4]], { key: 'r_add', vars: { k } });
    },
  },
  {
    id: 'patAB',
    level: 1,
    family: 'shape',
    make(r) {
      const [a, b, c, d] = r.shuffle([...SHAPES]);
      return { seq: [S(a), S(b), S(a), S(b), S(a)], answer: S(b), distract: [S(a), S(c), S(d)], why: { key: 'r_patAB' } };
    },
  },
  {
    id: 'count',
    level: 1,
    family: 'shape',
    make(r) {
      const [a, b] = r.shuffle([...SHAPES]);
      const n0 = 1 + r.int(2);
      return {
        seq: range(4).map((i) => S(a, n0 + i)),
        answer: S(a, n0 + 4),
        distract: [S(a, n0 + 3), S(a, n0 + 5), S(b, n0 + 4)],
        why: { key: 'r_count' },
      };
    },
  },
  // ---------------------------------------------------------------- Stufe 2
  {
    id: 'sub',
    level: 2,
    family: 'diff',
    make(r) {
      const k = r.pick([2, 3, 4, 5]);
      const ans = 1 + r.int(8);
      const a = ans + 5 * k;
      const seq = range(5).map((i) => a - i * k);
      return numRaw(seq, ans, [seq[4] + k, ans + 1, ans - 1, seq[4]], { key: 'r_sub', vars: { k } });
    },
  },
  {
    id: 'add2',
    level: 2,
    family: 'diff',
    make(r) {
      const k = r.pick([3, 4, 6, 7, 8, 9]);
      const a = 1 + r.int(12);
      const seq = range(5).map((i) => a + i * k);
      const ans = a + 5 * k;
      return numRaw(seq, ans, [ans + 1, ans - 1, ans + k, seq[4] + 1], { key: 'r_add', vars: { k } });
    },
  },
  {
    id: 'let2',
    level: 2,
    family: 'letter',
    make(r) {
      const s = r.int(9);
      const seq = range(4).map((i) => s + 2 * i);
      const ans = s + 8;
      return { seq: seq.map(Lt), answer: Lt(ans), distract: [Lt(ans - 1), Lt(ans + 1), Lt(ans + 2)], why: { key: 'r_letters', vars: { k: 2, s: chain(seq.slice(0, 3)) } } };
    },
  },
  {
    id: 'patABC',
    level: 2,
    family: 'shape',
    make(r) {
      const [a, b, c, d] = r.shuffle([...SHAPES]);
      return { seq: [S(a), S(b), S(c), S(a), S(b)], answer: S(c), distract: [S(a), S(b), S(d)], why: { key: 'r_patABC' } };
    },
  },
  // ---------------------------------------------------------------- Stufe 3
  {
    id: 'double',
    level: 3,
    family: 'mult',
    make(r) {
      const a = 1 + r.int(6);
      const seq = [a, 2 * a, 4 * a, 8 * a];
      const ans = 16 * a;
      return numRaw(seq, ans, [12 * a, 24 * a, ans + 2, ans - 2], { key: 'r_double' });
    },
  },
  {
    id: 'rot',
    level: 3,
    family: 'shape',
    make(r) {
      const step = r.pick([1, 2]);
      const dir = r.pick([1, -1]);
      const r0 = r.int(8);
      const seq = range(5).map((i) => r0 + i * step * dir);
      const last = seq[4];
      return {
        seq: seq.map(A),
        answer: A(last + step * dir),
        distract: [A(last), A(last - step * dir), A(last + 2 * step * dir)],
        why: { key: 'r_rot', vars: { part: step === 1 ? '@part1' : '@part2', dir: dir === 1 ? '@cw' : '@ccw' } },
      };
    },
  },
  {
    id: 'let3',
    level: 3,
    family: 'letter',
    make(r) {
      const s = r.int(7);
      const seq = range(4).map((i) => s + 3 * i);
      const ans = s + 12;
      return { seq: seq.map(Lt), answer: Lt(ans), distract: [Lt(ans - 1), Lt(ans + 1), Lt(ans - 2)], why: { key: 'r_letters', vars: { k: 3, s: chain(seq.slice(0, 3)) } } };
    },
  },
  {
    id: 'patAAB',
    level: 3,
    family: 'shape',
    make(r) {
      const [a, b, c, d] = r.shuffle([...SHAPES]);
      return { seq: [S(a), S(a), S(b), S(a), S(a)], answer: S(b), distract: [S(a), S(c), S(d)], why: { key: 'r_patAAB' } };
    },
  },
  // ---------------------------------------------------------------- Stufe 4
  {
    id: 'alt',
    level: 4,
    family: 'diff',
    make(r) {
      const [a, b] = r.shuffle([1, 2, 3, 4, 5, 6]);
      const x0 = 1 + r.int(9);
      const seq = [x0];
      for (let i = 0; i < 5; i++) seq.push(seq[i] + (i % 2 === 0 ? a : b));
      const last = seq[5];
      const ans = last + b;
      return numRaw(seq, ans, [last + a, ans + 1, ans - 1, last + a + b], { key: 'r_alt', vars: { a, b } });
    },
  },
  {
    id: 'countAlt',
    level: 4,
    family: 'shape',
    make(r) {
      const [a, b] = r.shuffle([...SHAPES]);
      return {
        seq: [S(a, 1), S(b, 2), S(a, 3), S(b, 4)],
        answer: S(a, 5),
        distract: [S(b, 5), S(a, 4), S(b, 4)],
        why: { key: 'r_countAlt' },
      };
    },
  },
  {
    id: 'letBack',
    level: 4,
    family: 'letter',
    make(r) {
      const k = r.pick([1, 2]);
      const s = 25 - r.int(5);
      const seq = range(5).map((i) => s - i * k);
      const ans = s - 5 * k;
      return {
        seq: seq.map(Lt),
        answer: Lt(ans),
        distract: [Lt(seq[4] + k), Lt(ans - 1), Lt(k === 1 ? ans + 2 : ans + 1)],
        why: { key: 'r_lettersBack', vars: { k, s: chain(seq.slice(0, 3)) } },
      };
    },
  },
  // ---------------------------------------------------------------- Stufe 5
  {
    id: 'inter',
    level: 5,
    family: 'two',
    make(r) {
      const p = r.pick([1, 2]);
      const q = r.pick([10, 5]);
      const a = 1 + r.int(4);
      const b = q === 10 ? 10 * (1 + r.int(3)) : 5 * (3 + r.int(4));
      const s1 = range(4).map((i) => a + i * p);
      const s2 = range(4).map((i) => b + i * q);
      const seq = [s1[0], s2[0], s1[1], s2[1], s1[2], s2[2]];
      return numRaw(seq, s1[3], [s2[3], s1[3] + 1, s1[3] + p, s1[3] - 1], { key: 'r_inter', vars: { s1: list(s1.slice(0, 3)), s2: list(s2.slice(0, 3)) } });
    },
  },
  {
    id: 'grow',
    level: 5,
    family: 'diff',
    make(r) {
      const a = 1 + r.int(6);
      const d0 = 1 + r.int(2);
      const seq = [a];
      for (let i = 0; i < 4; i++) seq.push(seq[i] + d0 + i);
      const last = seq[4];
      const ans = last + d0 + 4;
      return numRaw(seq, ans, [last + d0 + 3, last + d0 + 5, ans - 2, ans + 2], { key: 'r_grow', vars: { s: range(5).map((i) => `+${d0 + i}`).join(', ') } });
    },
  },
  {
    id: 'interLet',
    level: 5,
    family: 'two',
    make(r) {
      const f = r.int(5);
      const b = 25 - r.int(4);
      const seq = [f, b, f + 1, b - 1, f + 2, b - 2];
      return {
        seq: seq.map(Lt),
        answer: Lt(f + 3),
        distract: [Lt(b - 3), Lt(f + 4), Lt(f + 2)],
        why: { key: 'r_inter', vars: { s1: list([f, f + 1, f + 2].map(letter)), s2: list([b, b - 1, b - 2].map(letter)) } },
      };
    },
  },
  // ---------------------------------------------------------------- Stufe 6
  {
    id: 'triple',
    level: 6,
    family: 'mult',
    make(r) {
      const a = 1 + r.int(3);
      const seq = [a, 3 * a, 9 * a, 27 * a];
      const ans = 81 * a;
      return numRaw(seq, ans, [45 * a, 54 * a, ans + 3, ans - 3], { key: 'r_triple' });
    },
  },
  {
    id: 'altMul',
    level: 6,
    family: 'mult',
    make(r) {
      const a = 1 + r.int(3);
      const x0 = 1 + r.int(3);
      const seq = [x0];
      for (let i = 0; i < 5; i++) seq.push(i % 2 === 0 ? seq[i] + a : seq[i] * 2);
      const last = seq[5];
      const ans = last * 2;
      return numRaw(seq, ans, [last + a, ans + 1, ans - 1, ans + a], { key: 'r_altMul', vars: { a } });
    },
  },
  {
    id: 'interSub',
    level: 6,
    family: 'two',
    make(r) {
      const p = r.pick([2, 3]);
      const q = r.pick([3, 4, 5]);
      const a = 1 + r.int(4);
      const b = 22 + r.int(8);
      const s1 = range(4).map((i) => a + i * p);
      const s2 = range(4).map((i) => b - i * q);
      const seq = [s1[0], s2[0], s1[1], s2[1], s1[2], s2[2]];
      return numRaw(seq, s1[3], [s2[3], s1[3] + 1, s1[3] - 1, s1[3] + p], { key: 'r_inter', vars: { s1: list(s1.slice(0, 3)), s2: list(s2.slice(0, 3)) } });
    },
  },
  // ---------------------------------------------------------------- Stufe 7
  {
    id: 'fib',
    level: 7,
    family: 'diff',
    make(r) {
      const [x0, x1] = r.pick([
        [1, 1],
        [1, 2],
        [2, 3],
        [1, 3],
        [2, 2],
        [3, 4],
      ]);
      const seq = [x0, x1];
      for (let i = 2; i < 6; i++) seq.push(seq[i - 1] + seq[i - 2]);
      const last = seq[5];
      const prev = seq[4];
      const ans = last + prev;
      return numRaw(seq, ans, [last + (last - prev), last * 2, ans + 1, ans - 1], { key: 'r_fib' });
    },
  },
  {
    id: 'growDouble',
    level: 7,
    family: 'diff',
    make(r) {
      const a = 1 + r.int(4);
      const seq = [a];
      for (let i = 0; i < 4; i++) seq.push(seq[i] + 2 ** i);
      const last = seq[4];
      return numRaw(seq, last + 16, [last + 8, last * 2, last + 12, last + 15], { key: 'r_growDouble', vars: { s: '+1, +2, +4, +8, +16' } });
    },
  },
  {
    id: 'interMix',
    level: 7,
    family: 'two',
    make(r) {
      const p = r.pick([2, 3, 4]);
      const a = 2 + r.int(4);
      const b = r.pick([1, 2, 3]);
      const s1 = range(4).map((i) => a + i * p);
      const s2 = range(4).map((i) => b * 2 ** i);
      const seq = [s1[0], s2[0], s1[1], s2[1], s1[2], s2[2]];
      return numRaw(seq, s1[3], [s2[3], s1[3] + 1, s1[3] - 1, s1[2] * 2], { key: 'r_inter', vars: { s1: list(s1.slice(0, 3)), s2: list(s2.slice(0, 3)) } });
    },
  },
  // ---------------------------------------------------------------- Stufe 8
  {
    id: 'squares',
    level: 8,
    family: 'mult',
    make(r) {
      const n0 = 1 + r.int(3);
      const seq = range(5).map((i) => (n0 + i) ** 2);
      const last = seq[4];
      const ans = (n0 + 5) ** 2;
      return numRaw(seq, ans, [last + (last - seq[3]), ans + 1, ans - 1, ans + 2], {
        key: 'r_squares',
        vars: { s: list(range(3).map((i) => `${n0 + i}×${n0 + i}`)) },
      });
    },
  },
  {
    id: 'mulAdd',
    level: 8,
    family: 'mult',
    make(r) {
      const x0 = 1 + r.int(3);
      const seq = [x0];
      for (let i = 0; i < 4; i++) seq.push(seq[i] * 2 + 1);
      const last = seq[4];
      const ans = last * 2 + 1;
      return numRaw(seq, ans, [last * 2, last + (last - seq[3]), ans + 2, ans - 2], { key: 'r_mulAdd' });
    },
  },
  {
    id: 'cyc3',
    level: 8,
    family: 'diff',
    make(r) {
      const [a, b, c] = r.shuffle([1, 2, 3, 4, 5]);
      const x0 = 1 + r.int(6);
      const st = [a, b, c];
      const seq = [x0];
      for (let i = 0; i < 6; i++) seq.push(seq[i] + st[i % 3]);
      const last = seq[6];
      return numRaw(seq, last + a, [last + b, last + c, last + a + 1, last + a - 1], { key: 'r_cyc', vars: { a, b, c } });
    },
  },
];

/** Ablenker eindeutig machen und bei Bedarf sinnvoll auffüllen */
function finalize(raw: Raw, r: Rng): Item[] {
  const ans = raw.answer;
  const seen = new Set([itemKey(ans)]);
  const out: Item[] = [];
  const valid = (it: Item) => (it.t === 'n' ? it.v >= 0 && Number.isInteger(it.v) : it.t === 'l' ? it.v >= 0 && it.v <= 25 : it.t === 's' ? it.n >= 1 && it.n <= 9 : true);
  const add = (it: Item) => {
    const k = itemKey(it);
    if (out.length < 3 && valid(it) && !seen.has(k)) {
      seen.add(k);
      out.push(it);
    }
  };
  raw.distract.forEach(add);
  for (let d = 1; out.length < 3 && d < 40; d++) {
    if (ans.t === 'n') {
      add(N(ans.v + d));
      add(N(ans.v - d));
    } else if (ans.t === 'l') {
      add(Lt(ans.v + d));
      add(Lt(ans.v - d));
    } else if (ans.t === 's') {
      for (const s of shapesExcept(r, ans.s)) add(S(s, ans.n));
      add(S(ans.s, ans.n + d));
    } else {
      add(A(ans.r + d));
      add(A(ans.r - d));
    }
  }
  return r.shuffle([ans, ...out]);
}

/** Neue Aufgabe der Stufe; die zuletzt gestellten Regeln werden möglichst nicht wiederholt. */
export function makePuzzle(level: number, r: Rng, recent: readonly string[] = [], recentFamilies: readonly Family[] = []): Puzzle {
  const lv = Math.max(1, Math.min(MAX_LEVEL, Math.floor(level + 1e-9)));
  let cands = GENS.filter((g) => g.level === lv && !recent.includes(g.id));
  const lastFam = recentFamilies[recentFamilies.length - 1];
  const other = cands.filter((g) => g.family !== lastFam);
  if (other.length) cands = other;
  if (!cands.length) cands = GENS.filter((g) => g.level === lv);
  const g = r.pick(cands);
  const raw = g.make(r);
  return { id: g.id, level: lv, family: g.family, seq: raw.seq, answer: raw.answer, options: finalize(raw, r), why: raw.why };
}

/** Alle Regeln (für Tests) */
export const GENERATORS: ReadonlyArray<{ id: string; level: number; family: Family }> = GENS;

/** Feste Aufgaben für den Intro-Film */
export function demoPuzzles(): Puzzle[] {
  return [
    {
      id: 'demo1',
      level: 1,
      family: 'diff',
      seq: nums([3, 6, 9, 12, 15]),
      answer: N(18),
      options: nums([16, 18, 21, 15]),
      why: { key: 'r_add', vars: { k: 3 } },
    },
    {
      id: 'demo2',
      level: 2,
      family: 'shape',
      seq: [S('circle'), S('triangle'), S('square'), S('circle'), S('triangle')],
      answer: S('square'),
      options: [S('triangle'), S('star'), S('square'), S('circle')],
      why: { key: 'r_patABC' },
    },
  ];
}
