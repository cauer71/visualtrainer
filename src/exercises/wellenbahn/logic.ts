/**
 * Wellenbahn – Bahnberechnung (rein, ohne Canvas).
 *
 * Räumliche Sinuswelle y = A · sin(2π · N · x / W) über die Breite W (höchstens 60 % der Bühne).
 * Das Ziel läuft mit gleichmäßigem Tempo entlang der Kurve (Bogenlänge, nicht x-Tempo) von links
 * nach rechts und wieder zurück; an den Enden bremst es weich ab und kehrt um (kein harter Knick).
 *
 * Mit der Stufe steigen Amplitude A und Anzahl der Wellen N. Bei Stufenwechsel wird die Form
 * über ca. 0,7 s weich nachgeführt – das Ziel springt nie.
 */
import {
  approach,
  type Bounds,
  clampWidth,
  pingPong01,
  pingPongCycle,
  type Point,
  type PursuitTrack,
  pursuitSpeed,
} from '../_shared/pursuit-logic';
import { clamp } from '../../core/stats';

/** Tempo in u/s: Stufe 1 ≈ 3,7°/s, Stufe 20 ≈ 19°/s – die Kurven kommen als Schwierigkeit dazu */
export const speedFor = (level: number): number => pursuitSpeed(level, 16, 1.09);

/** Zahl der Wellen über die Bahnbreite: 1 → 3,5 */
export const wavesFor = (level: number): number => 1 + 0.13 * (level - 1);

/** Amplitude in u: 4 → 11 (wird zusätzlich auf das Feld begrenzt) */
export const amplitudeFor = (level: number): number => 4 + 0.37 * (level - 1);

/** Anteil der Bahnlänge, über den das Tempo an den Enden auf 0 abfällt */
export const TURN_FRACTION = 0.08;
const SAMPLES = 260;
/** Zeitkonstante für das Nachführen der Bahnform (s) */
const MORPH_TAU = 0.7;

/** Höhe der Welle an der Stelle x (psi = Phasenversatz, damit die Form beim Nachführen nicht springt) */
export function wavePoint(x: number, width: number, amp: number, waves: number, psi = 0): number {
  return amp * Math.sin((2 * Math.PI * waves * x) / width + psi);
}

export class WaveTrack implements PursuitTrack {
  private pts: Point[] = [];
  /** Phase eines Hin-und-zurück-Zyklus (Position in x, nicht Bogenlänge – springt bei Formänderung nie) */
  private phase = 0;
  private width = 100;
  private left = 0;
  private cy = 0;
  private halfH = 10;
  private u = 8;
  private level = 1;
  private amp = 10;
  private waves = 1;
  private psi = 0;
  private speedNow = 1;
  private current: Point = { x: 0, y: 0 };

  get pos(): Point {
    return this.current;
  }

  layout(area: Bounds, stageW: number, u: number): void {
    this.u = u;
    this.width = clampWidth(stageW, area);
    this.left = (area.minX + area.maxX) / 2 - this.width / 2;
    this.cy = (area.minY + area.maxY) / 2;
    this.halfH = Math.max(2, (area.maxY - area.minY) / 2);
    this.snap();
  }

  setLevel(level: number): void {
    this.level = level;
  }

  /** Form sofort auf die Stufe setzen (Start, Größenänderung) */
  snap(): void {
    this.amp = this.targetAmp();
    this.waves = wavesFor(this.level);
    this.rebuild();
  }

  begin(r: number, dir: 1 | -1): void {
    // Start nahe dem linken oder rechten Ende, dann geht es in Laufrichtung los
    const k = r - Math.floor(r);
    this.phase = dir === 1 ? k * 0.25 : 0.5 + k * 0.25;
    this.psi = 0;
    this.snap();
  }

  step(dt: number, speed: number): void {
    const target = this.targetAmp();
    const wantWaves = wavesFor(this.level);
    if (Math.abs(target - this.amp) > 1e-4 || Math.abs(wantWaves - this.waves) > 1e-5) {
      // Die Welle „dreht“ sich um das Ziel: Wellenzahl ändern, ohne dass dessen Höhe springt
      const x = pingPong01(this.phase, TURN_FRACTION).pos * this.width;
      const theta = (2 * Math.PI * this.waves * x) / this.width + this.psi;
      this.amp = approach(this.amp, target, dt, MORPH_TAU);
      this.waves = approach(this.waves, wantWaves, dt, MORPH_TAU);
      this.psi = theta - (2 * Math.PI * this.waves * x) / this.width;
      this.rebuildOutline();
    }
    // Tempo entlang der Kurve konstant: x-Tempo = v · g' / √(1 + y'²) (Mittelpunktsverfahren)
    const cycle = pingPongCycle(this.width, TURN_FRACTION);
    const rate = (ph: number): number => {
      const pp = pingPong01(ph, TURN_FRACTION);
      const x = pp.pos * this.width;
      const slope = ((this.amp * 2 * Math.PI * this.waves) / this.width) * Math.cos((2 * Math.PI * this.waves * x) / this.width + this.psi);
      return 1 / (cycle * Math.sqrt(1 + slope * slope));
    };
    const k1 = rate(this.phase);
    const k2 = rate(this.phase + 0.5 * speed * dt * k1);
    this.phase += speed * dt * k2;
    this.phase -= Math.floor(this.phase);
    this.place();
  }

  cruise(): number {
    return this.speedNow;
  }

  outline(): readonly Point[] {
    return this.pts;
  }

  private targetAmp(): number {
    return clamp(amplitudeFor(this.level) * this.u, 2, this.halfH);
  }

  private rebuild(): void {
    this.rebuildOutline();
    this.place();
  }

  private rebuildOutline(): void {
    const pts: Point[] = [];
    for (let i = 0; i <= SAMPLES; i++) {
      const x = (i / SAMPLES) * this.width;
      pts.push({ x: this.left + x, y: this.cy + wavePoint(x, this.width, this.amp, this.waves, this.psi) });
    }
    this.pts = pts;
  }

  private place(): void {
    const pp = pingPong01(this.phase, TURN_FRACTION);
    this.speedNow = pp.speed;
    const x = pp.pos * this.width;
    this.current = { x: this.left + x, y: this.cy + wavePoint(x, this.width, this.amp, this.waves, this.psi) };
  }
}
