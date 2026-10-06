/**
 * Wiedergabe der Effekte mit der Web Audio API (synthetisiert, keine Dateien, kein Netz).
 *
 *  - Der AudioContext entsteht erst bei `unlock()` – das ruft die Oberfläche bei der ersten Nutzergeste auf
 *    (Pflicht in iOS/Safari und Chrome). Vorher erzeugt `play()` nichts.
 *  - Ohne Web-Audio-Unterstützung (oder in Tests ohne Browser) passiert einfach nichts – keine Fehler.
 *  - Lautstärke in drei Stufen, nach oben begrenzt (`MAX_GAIN`); höchstens `MAX_VOICES` Töne gleichzeitig.
 *  - Weiche Hüllkurve je Ton (Einschwingen 15 ms, exponentielles Ausklingen) – keine Knackser, keine Dauertöne.
 */
import { soundNotes, type SoundEvent } from './sounds';

export type Volume = 'LOW' | 'MEDIUM' | 'HIGH';

export interface AudioPrefs {
  on: boolean;
  volume: Volume;
}

export const DEFAULT_AUDIO: AudioPrefs = { on: true, volume: 'MEDIUM' };

/** Gesamtlautstärke je Stufe (Faktor auf die relative Lautstärke der Töne) */
export const VOLUME_GAIN: Record<Volume, number> = { LOW: 0.05, MEDIUM: 0.1, HIGH: 0.16 };
/** Obergrenze für die Lautstärke eines einzelnen Tons */
export const MAX_GAIN = 0.18;
export const MAX_VOICES = 8;
const ATTACK_S = 0.015;

/** Der Teil der Web-Audio-API, den der Player nutzt (für eine Attrappe in Tests) */
export interface AudioParamLike {
  value: number;
  setValueAtTime(v: number, t: number): unknown;
  linearRampToValueAtTime(v: number, t: number): unknown;
  exponentialRampToValueAtTime(v: number, t: number): unknown;
}
export interface OscillatorLike {
  type: string;
  frequency: AudioParamLike;
  connect(n: unknown): unknown;
  start(t: number): void;
  stop(t: number): void;
  onended: (() => void) | null;
}
export interface GainLike {
  gain: AudioParamLike;
  connect(n: unknown): unknown;
}
export interface AudioContextLike {
  currentTime: number;
  state: string;
  destination: unknown;
  resume(): Promise<void>;
  createOscillator(): OscillatorLike;
  createGain(): GainLike;
}

type Factory = () => AudioContextLike | null;

/** Standard: echter AudioContext, falls der Browser ihn kennt */
export const browserAudioFactory: Factory = () => {
  try {
    const w = (typeof window !== 'undefined' ? window : undefined) as unknown as { AudioContext?: unknown; webkitAudioContext?: unknown } | undefined;
    const Ctor = (w?.AudioContext ?? w?.webkitAudioContext) as (new () => AudioContextLike) | undefined;
    return Ctor ? new Ctor() : null;
  } catch {
    return null;
  }
};

export class SoundPlayer {
  private ctx: AudioContextLike | null = null;
  private voices = 0;
  private prefs: AudioPrefs = { ...DEFAULT_AUDIO };
  /** zusätzlich stumm (z. B. Automatik ohne `?sound=1`) */
  muted = false;

  constructor(private readonly factory: Factory = browserAudioFactory) {}

  get unlocked(): boolean {
    return this.ctx !== null;
  }

  setPrefs(p: AudioPrefs): void {
    this.prefs = { ...p };
  }

  getPrefs(): AudioPrefs {
    return { ...this.prefs };
  }

  /** Bei einer Nutzergeste aufrufen: legt den AudioContext an bzw. weckt ihn auf */
  unlock(): void {
    try {
      if (!this.ctx) this.ctx = this.factory();
      if (this.ctx && this.ctx.state === 'suspended') void this.ctx.resume().catch(() => undefined);
    } catch {
      this.ctx = null;
    }
  }

  /** Effekt abspielen; gibt die Zahl der erzeugten Töne zurück (0 = stumm, nicht freigeschaltet, nicht unterstützt) */
  play(ev: SoundEvent, opts: { stars?: number } = {}): number {
    const ctx = this.ctx;
    if (!ctx || !this.prefs.on || this.muted) return 0;
    const master = Math.min(MAX_GAIN, VOLUME_GAIN[this.prefs.volume] ?? VOLUME_GAIN.MEDIUM);
    let made = 0;
    try {
      const t0 = ctx.currentTime + 0.01;
      for (const note of soundNotes(ev, opts.stars ?? 0)) {
        if (this.voices >= MAX_VOICES) break;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = note.type;
        const start = t0 + note.t;
        const end = start + note.d;
        osc.frequency.setValueAtTime(note.f, start);
        if (note.f2) osc.frequency.exponentialRampToValueAtTime(note.f2, end);
        const peak = Math.min(MAX_GAIN, master * Math.max(0, Math.min(1, note.g)));
        g.gain.setValueAtTime(0.0001, start);
        g.gain.linearRampToValueAtTime(peak, start + ATTACK_S);
        g.gain.exponentialRampToValueAtTime(0.0001, end);
        osc.connect(g);
        g.connect(ctx.destination);
        this.voices++;
        osc.onended = () => {
          this.voices = Math.max(0, this.voices - 1);
        };
        osc.start(start);
        osc.stop(end + 0.02);
        made++;
      }
    } catch {
      // Audio ist ein Zusatz: Fehler dürfen das Spiel nie stören
    }
    return made;
  }
}
