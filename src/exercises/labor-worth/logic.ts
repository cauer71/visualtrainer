/**
 * Worth-Vier-Punkte (Labor) – reine Logik. Funktionsübung nach dem Prinzip des klassischen Worth-Vier-Punkte-Verfahrens: Vier Lichter
 * stehen in Rautenform – oben ein rotes, links und rechts je ein grünes (oder cyan/blaues), unten ein weißes. Mit einer
 * Rot-Grün-Brille sieht jedes Auge durch sein Glas nur Teile davon; das weiße Licht sehen beide Augen. Du zählst, wie viele Lichter
 * du siehst, und tippst die Zahl (2, 3, 4, 5 oder „Unklar“).
 *
 * Gespeichert werden Übungswerte: wie oft du welche Zahl gemeldet hast und wie einheitlich deine Antworten waren. Die App deutet
 * die Zahl nicht (das gehört in Fachhand) und nennt keine Richtwerte. Zeit in ms (virtuelle Uhr), keine Zufallswerte nötig.
 */
import { mean } from '../../core/stats';
import type { ExerciseParams, ParamDef } from '../../core/types';
import { ANA_PARAMS, anaParams, type AnaParams } from '../_shared/pruefung-anaglyph';

export const PARAMS: readonly ParamDef[] = [
  { key: 'repeats', type: 'number', unit: 'count', min: 2, max: 12, step: 1, default: 4, summary: true },
  { key: 'dotCm', type: 'number', unit: 'cm', min: 0.3, max: 4, step: 0.1, default: 1.2, summary: true },
  { key: 'varySize', type: 'select', default: 'yes', options: ['yes', 'no'] },
  ...ANA_PARAMS,
];

export interface WorthParams extends AnaParams {
  repeats: number;
  dotCm: number;
  varySize: boolean;
}

export function worthParams(p: ExerciseParams): WorthParams {
  const num = (key: string): number => {
    const d = PARAMS.find((x) => x.key === key)!;
    const v = p[key];
    return typeof v === 'number' && Number.isFinite(v) ? v : (d.default as number);
  };
  return { ...anaParams(p), repeats: Math.round(num('repeats')), dotCm: num('dotCm'), varySize: p.varySize !== 'no' };
}

/** Faktor für das große Licht gegenüber dem kleinen */
export const BIG_FACTOR = 2.5;
/** Antworten: Zahl der gezählten Lichter oder „unklar“ */
export type WorthAnswer = 2 | 3 | 4 | 5 | 'unclear';
export const ANSWERS: readonly WorthAnswer[] = [2, 3, 4, 5, 'unclear'];

/** Größen der Darbietungen in cm: bei „Größe wechseln“ klein und groß im Wechsel (die zweite ist groß) */
export function sizesFor(p: Pick<WorthParams, 'repeats' | 'dotCm' | 'varySize'>): number[] {
  return Array.from({ length: p.repeats }, (_, i) => (p.varySize && i % 2 === 1 ? p.dotCm * BIG_FACTOR : p.dotCm));
}

export interface WorthTrial {
  nr: number;
  /** eingestellte Größe (cm) und tatsächlich gezeichnete (auf kleinen Bildschirmen begrenzt) */
  dotCm: number;
  dotCmEff: number;
  count: number | null;
  ms: number;
}

export interface WorthSummary {
  answered: number;
  /** Anzahl der Antworten je Zahl */
  n2: number;
  n3: number;
  n4: number;
  n5: number;
  unclear: number;
  /** Anteil der häufigsten Antwort an allen Antworten in % */
  sameShare: number | null;
  msMean: number | null;
}

export class WorthSession {
  readonly sizes: number[];
  idx = 0;
  trials: WorthTrial[] = [];
  finished = false;
  private shownAt = 0;

  constructor(p: Pick<WorthParams, 'repeats' | 'dotCm' | 'varySize'>) {
    this.sizes = sizesFor(p);
  }

  start(now: number): void {
    this.shownAt = now;
  }

  get currentSize(): number {
    return this.sizes[Math.min(this.idx, this.sizes.length - 1)];
  }

  /** Antwort für die laufende Darbietung; `dotCmEff` = tatsächlich gezeichnete Größe in cm */
  answer(a: WorthAnswer, now: number, dotCmEff = this.currentSize): boolean {
    if (this.finished) return false;
    this.trials.push({
      nr: this.idx + 1,
      dotCm: Math.round(this.currentSize * 100) / 100,
      dotCmEff: Math.round(dotCmEff * 100) / 100,
      count: a === 'unclear' ? null : a,
      ms: Math.round(now - this.shownAt),
    });
    this.idx++;
    this.shownAt = now;
    if (this.idx >= this.sizes.length) this.finished = true;
    return true;
  }

  summary(): WorthSummary {
    const cnt = (n: number | null): number => this.trials.filter((t) => t.count === n).length;
    const counts = [cnt(2), cnt(3), cnt(4), cnt(5), cnt(null)];
    const top = Math.max(...counts);
    return {
      answered: this.trials.length,
      n2: counts[0],
      n3: counts[1],
      n4: counts[2],
      n5: counts[3],
      unclear: counts[4],
      sameShare: this.trials.length ? Math.round((100 * top) / this.trials.length) : null,
      msMean: this.trials.length ? Math.round(mean(this.trials.map((t) => t.ms))) : null,
    };
  }
}

/** Tipp nach dem Durchlauf (Schlüssel in `texts.tips`) */
export function tipFor(sum: WorthSummary): string {
  return sum.unclear > 0 ? 'unclear' : 'calm';
}
