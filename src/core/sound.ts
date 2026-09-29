/**
 * Dezente Soundeffekte per WebAudio (keine Audiodateien nötig).
 * Der AudioContext wird erst beim Start-Tippen erzeugt (Browser-Vorgabe).
 */
import type { Sfx } from './types';

let ctx: AudioContext | null = null;
let enabled = true;

export function setSoundEnabled(on: boolean): void {
  enabled = on;
}

export function isSoundEnabled(): boolean {
  return enabled;
}

/** Muss innerhalb einer Nutzer-Geste aufgerufen werden (z. B. Start-Button). */
export function unlockAudio(): void {
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') void ctx.resume();
  } catch {
    ctx = null;
  }
}

interface ToneOpts {
  freq: number;
  to?: number;
  dur: number;
  type?: OscillatorType;
  gain?: number;
  delay?: number;
}

function tone({ freq, to, dur, type = 'sine', gain = 0.12, delay = 0 }: ToneOpts): void {
  if (!enabled || !ctx || ctx.state !== 'running') return;
  const t0 = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(Math.min(0.2, gain), t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

export const sfx: Sfx = {
  tick: () => tone({ freq: 520, dur: 0.08, gain: 0.08 }),
  go: () => tone({ freq: 660, to: 990, dur: 0.16, type: 'triangle', gain: 0.12 }),
  good: () => tone({ freq: 880, to: 1320, dur: 0.1, gain: 0.1 }),
  bad: () => {
    tone({ freq: 240, dur: 0.09, type: 'triangle', gain: 0.09 });
    tone({ freq: 180, dur: 0.1, type: 'triangle', gain: 0.08, delay: 0.07 });
  },
  tap: () => tone({ freq: 700, dur: 0.05, gain: 0.05 }),
  done: () => {
    tone({ freq: 523.25, dur: 0.22, gain: 0.1 });
    tone({ freq: 659.25, dur: 0.22, gain: 0.1, delay: 0.09 });
    tone({ freq: 783.99, dur: 0.22, gain: 0.1, delay: 0.18 });
    tone({ freq: 1046.5, dur: 0.45, gain: 0.11, delay: 0.27 });
  },
};

export const silentSfx: Sfx = {
  tick: () => {},
  go: () => {},
  good: () => {},
  bad: () => {},
  tap: () => {},
  done: () => {},
};
