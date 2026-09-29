/** Kleiner, deterministischer Zufallsgenerator (mulberry32). */
export interface Rng {
  /** Gleichverteilt in [0, 1) */
  next(): number;
  /** Gleichverteilt in [a, b) */
  range(a: number, b: number): number;
  /** Ganze Zahl in [0, n) */
  int(n: number): number;
  /** true mit Wahrscheinlichkeit p */
  chance(p: number): boolean;
  pick<T>(arr: readonly T[]): T;
  shuffle<T>(arr: T[]): T[];
  /** Standardnormalverteilt */
  normal(): number;
  /** Exponentialverteilt mit Mittelwert mean */
  exp(mean: number): number;
}

export function createRng(seed?: number): Rng {
  let s = (seed ?? Math.floor(Math.random() * 2 ** 31)) >>> 0;
  const next = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const rng: Rng = {
    next,
    range: (a, b) => a + (b - a) * next(),
    int: (n) => Math.floor(next() * n),
    chance: (p) => next() < p,
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    shuffle: (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },
    normal: () => {
      const u = Math.max(1e-12, next());
      const v = next();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    },
    exp: (mean) => -mean * Math.log(1 - next()),
  };
  return rng;
}
