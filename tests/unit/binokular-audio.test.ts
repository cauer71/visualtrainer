/**
 * Audio-Effekte von „Binokular – Sehspiele“: Ereignis → Klang, stumm erzeugt nichts, Lautstärkegrenze, Start erst nach
 * einer Nutzergeste, keine Fehler ohne Audio-Unterstützung. Mit einer kleinen AudioContext-Attrappe.
 */
import { describe, expect, it } from 'vitest';
import { MAX_GAIN, SOUND_EVENTS, soundDuration, soundNotes, SoundPlayer, VOLUME_GAIN } from '../../src/binokular/audio';
import type { AudioContextLike, AudioParamLike } from '../../src/binokular/audio/player';

class FakeParam implements AudioParamLike {
  value = 0;
  log: [string, number, number][] = [];
  setValueAtTime(v: number, at: number) {
    this.log.push(['set', v, at]);
  }
  linearRampToValueAtTime(v: number, at: number) {
    this.log.push(['lin', v, at]);
  }
  exponentialRampToValueAtTime(v: number, at: number) {
    this.log.push(['exp', v, at]);
  }
}

class FakeCtx implements AudioContextLike {
  currentTime = 1;
  state = 'suspended';
  destination = {};
  resumed = 0;
  oscs: { type: string; frequency: FakeParam; started: number; stopped: number; onended: (() => void) | null }[] = [];
  gains: FakeParam[] = [];
  resume() {
    this.resumed++;
    this.state = 'running';
    return Promise.resolve();
  }
  createOscillator() {
    const o = {
      type: 'sine',
      frequency: new FakeParam(),
      started: -1,
      stopped: -1,
      onended: null as (() => void) | null,
      connect: () => undefined,
      start(at: number) {
        o.started = at;
      },
      stop(at: number) {
        o.stopped = at;
      },
    };
    this.oscs.push(o);
    return o;
  }
  createGain() {
    const g = { gain: new FakeParam(), connect: () => undefined };
    this.gains.push(g.gain);
    return g;
  }
}

function setup() {
  const ctx = new FakeCtx();
  let made = 0;
  const p = new SoundPlayer(() => {
    made++;
    return ctx;
  });
  return { ctx, p, made: () => made };
}

const peak = (g: FakeParam) => Math.max(...g.log.map((x) => x[1]));

describe('Ereignis → Klang', () => {
  it('alle Ereignisse der Spiele haben einen Effekt', () => {
    for (const ev of ['hit', 'error', 'colorChange', 'goal', 'wall', 'point', 'gameEnd', 'select', 'pause', 'resume'] as const) expect(SOUND_EVENTS).toContain(ev);
    expect(new Set(SOUND_EVENTS).size).toBe(SOUND_EVENTS.length);
  });
  it('jeder Effekt: kurze, warme Töne (Sinus/Dreieck), keine Dauertöne, nichts Schrilles', () => {
    for (const ev of SOUND_EVENTS) {
      const notes = soundNotes(ev);
      expect(notes.length, ev).toBeGreaterThan(0);
      expect(soundDuration(notes), ev).toBeLessThanOrEqual(1.4);
      for (const n of notes) {
        expect(['sine', 'triangle']).toContain(n.type);
        expect(n.d).toBeLessThanOrEqual(0.6);
        expect(n.f).toBeGreaterThanOrEqual(140);
        expect(n.f).toBeLessThanOrEqual(1400);
        if (n.f2) expect(n.f2 >= 140 && n.f2 <= 1400).toBe(true);
        expect(n.g > 0 && n.g <= 1).toBe(true);
      }
    }
  });
  it('Fehlerton ist weich: tief, kurz, nach unten gleitend', () => {
    const [n] = soundNotes('error');
    expect(n.f2).toBeLessThan(n.f);
    expect(n.f).toBeLessThanOrEqual(300);
  });
});

describe('Wiedergabe', () => {
  it('Start erst nach Geste: vor unlock() kein AudioContext und kein Ton; danach geweckt', () => {
    const { ctx, p, made } = setup();
    expect(p.play('select')).toBe(0);
    expect(made()).toBe(0);
    expect(p.unlocked).toBe(false);
    p.unlock();
    p.unlock();
    expect(made()).toBe(1);
    expect(ctx.resumed).toBe(1);
    expect(p.play('select')).toBe(1);
    expect(ctx.oscs[0].started).toBeGreaterThanOrEqual(ctx.currentTime);
    expect(ctx.oscs[0].stopped).toBeGreaterThan(ctx.oscs[0].started);
  });
  it('stumm geschaltet (Einstellung aus oder Automatik) erzeugt nichts', () => {
    const { ctx, p } = setup();
    p.unlock();
    p.setPrefs({ on: false, volume: 'HIGH' });
    expect(p.play('goal')).toBe(0);
    p.setPrefs({ on: true, volume: 'HIGH' });
    p.muted = true;
    expect(p.play('goal')).toBe(0);
    expect(ctx.oscs).toHaveLength(0);
  });
  it('Lautstärke in drei Stufen, nach oben begrenzt; weiche Hüllkurve (leise rein, leise raus)', () => {
    const peaks: number[] = [];
    for (const v of ['LOW', 'MEDIUM', 'HIGH'] as const) {
      const { ctx, p } = setup();
      p.unlock();
      p.setPrefs({ on: true, volume: v });
      for (const ev of SOUND_EVENTS) p.play(ev);
      const all = ctx.gains.map(peak);
      expect(Math.max(...all)).toBeLessThanOrEqual(MAX_GAIN);
      peaks.push(Math.max(...all));
      for (const g of ctx.gains) {
        expect(g.log[0]).toEqual(['set', 0.0001, expect.any(Number)]);
        expect(g.log[g.log.length - 1][0]).toBe('exp');
        expect(g.log[g.log.length - 1][1]).toBeLessThanOrEqual(0.001);
      }
    }
    expect(peaks[0]).toBeLessThan(peaks[1]);
    expect(peaks[1]).toBeLessThan(peaks[2]);
    expect(VOLUME_GAIN.HIGH).toBeLessThanOrEqual(MAX_GAIN);
  });
  it('höchstens 8 Töne gleichzeitig; nach dem Ausklingen wieder frei', () => {
    const { ctx, p } = setup();
    p.unlock();
    for (let i = 0; i < 10; i++) p.play('goal');
    expect(ctx.oscs).toHaveLength(8);
    for (const o of ctx.oscs) o.onended?.();
    expect(p.play('select')).toBe(1);
  });
  it('ohne Audio-Unterstützung oder bei Fehlern: kein Ton, keine Ausnahme', () => {
    const none = new SoundPlayer(() => null);
    none.unlock();
    expect(none.play('select')).toBe(0);
    const broken = new SoundPlayer(() => {
      throw new Error('kein Audio');
    });
    expect(() => broken.unlock()).not.toThrow();
    expect(broken.play('error')).toBe(0);
    const failing = new SoundPlayer(() => ({ ...new FakeCtx(), createOscillator: () => { throw new Error('x'); } }) as unknown as AudioContextLike);
    failing.unlock();
    expect(() => failing.play('hit')).not.toThrow();
    // im Test läuft kein Browser: der Standard-Player bleibt einfach stumm
    const def = new SoundPlayer();
    def.unlock();
    expect(def.play('select')).toBe(0);
  });
});
