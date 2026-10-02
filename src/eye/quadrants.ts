// EYE-EXPERIMENT: Viertel (Quadranten) und Dwell-Erkennung („Blick angekommen“) – rein.
import type { Pt, Quadrant, Size } from './types';

export const QUADRANTS: readonly Quadrant[] = ['tl', 'tr', 'bl', 'br'];

/** Viertel eines Punkts (Fenster-Pixel); null außerhalb des Fensters. */
export function quadrantOf(p: Pt, size: Size): Quadrant | null {
  if (!(p.x >= 0 && p.y >= 0 && p.x <= size.w && p.y <= size.h)) return null;
  const right = p.x >= size.w / 2;
  const bottom = p.y >= size.h / 2;
  return bottom ? (right ? 'br' : 'bl') : right ? 'tr' : 'tl';
}

/** Mittelpunkt eines Viertels in Pixeln. */
export function quadrantCenter(q: Quadrant, size: Size): Pt {
  return { x: q === 'tl' || q === 'bl' ? size.w / 4 : (size.w * 3) / 4, y: q === 'tl' || q === 'tr' ? size.h / 4 : (size.h * 3) / 4 };
}

/** Ziel-Position in der Ecke eines Viertels (Abstand `inset` vom Fensterrand, in Bruchteilen). */
export function cornerTarget(q: Quadrant, size: Size, inset = 0.1): Pt {
  const left = q === 'tl' || q === 'bl';
  const top = q === 'tl' || q === 'tr';
  return { x: size.w * (left ? inset : 1 - inset), y: size.h * (top ? inset : 1 - inset) };
}

export interface DwellOptions {
  /** Mindestdauer im Zielviertel (ms), Standard 150 */
  minMs: number;
  /** Mindestzahl Bilder im Zielviertel, Standard 4 */
  minFrames: number;
  /** so viele einzelne Ausreißer-/Aussetzer-Bilder in Folge werden toleriert (zählen aber nicht mit), Standard 1 */
  gapFrames: number;
}
export const DEFAULT_DWELL: DwellOptions = { minMs: 150, minFrames: 4, gapFrames: 1 };

export interface DwellArrival {
  /** Zeitpunkt des ersten Bildes der erfolgreichen Serie im Zielviertel („Blick betritt das Viertel“) */
  arrivedAt: number;
  /** Zeitpunkt, an dem das Kriterium erfüllt war (Bestätigung) */
  confirmedAt: number;
  frames: number;
}

/**
 * Meldet genau einmal, wenn der Blick lange genug im Zielviertel lag. Aussetzer (null = kein Gesicht/ungültig)
 * und einzelne Ausreißer setzen die Serie nicht zurück, solange nicht mehr als `gapFrames` Bilder in Folge fehlen.
 */
export class DwellDetector {
  private runStart: number | null = null;
  private frames = 0;
  private gap = 0;
  private done = false;
  private opts: DwellOptions;

  constructor(
    public target: Quadrant,
    opts: Partial<DwellOptions> = {},
  ) {
    this.opts = { ...DEFAULT_DWELL, ...opts };
  }

  reset(target?: Quadrant): void {
    if (target) this.target = target;
    this.runStart = null;
    this.frames = 0;
    this.gap = 0;
    this.done = false;
  }

  get arrived(): boolean {
    return this.done;
  }

  push(tMs: number, q: Quadrant | null): DwellArrival | null {
    if (this.done) return null;
    if (q === this.target) {
      if (this.runStart === null) {
        this.runStart = tMs;
        this.frames = 0;
      }
      this.frames++;
      this.gap = 0;
      if (this.frames >= this.opts.minFrames && tMs - this.runStart >= this.opts.minMs) {
        this.done = true;
        return { arrivedAt: this.runStart, confirmedAt: tMs, frames: this.frames };
      }
    } else if (this.runStart !== null) {
      this.gap++;
      if (this.gap > this.opts.gapFrames) {
        this.runStart = null;
        this.frames = 0;
        this.gap = 0;
      }
    }
    return null;
  }
}
