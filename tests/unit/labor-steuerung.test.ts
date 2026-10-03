/**
 * Seitliche Steuerung (Slalom, Invasoren): Zeiger, Pfeiltasten, Gerätekippen mit Erlaubnis (iOS), Drehung des Bildschirms,
 * Rückfall; Startbildschirm „Gerät kippen“ (`TiltGate`). Alles ohne Browser mit Attrappen für Fenster und Sensor.
 */
import { describe, expect, it } from 'vitest';
import {
  angleDiff,
  applySteering,
  axisFromKeys,
  axisFromTilt,
  screenTiltDeg,
  Steering,
  TILT_DEAD_DEG,
  TILT_FULL_DEG,
  type EventTargetLike,
} from '../../src/exercises/_shared/labor-steuerung';
import { TILT_COUNTDOWN_MS, TILT_LISTEN_MS, TiltGate, type TiltGateTexts } from '../../src/exercises/_shared/labor-steuerung-ui';
import type { Hud, StageInfo } from '../../src/core/types';

class FakeTarget implements EventTargetLike {
  l: Record<string, Array<(ev: unknown) => void>> = {};
  addEventListener(type: string, fn: (ev: unknown) => void): void {
    (this.l[type] = this.l[type] ?? []).push(fn);
  }
  removeEventListener(type: string, fn: (ev: unknown) => void): void {
    this.l[type] = (this.l[type] ?? []).filter((f) => f !== fn);
  }
  fire(type: string, ev: unknown = {}): void {
    for (const f of (this.l[type] ?? []).slice()) f(ev);
  }
  count(type: string): number {
    return (this.l[type] ?? []).length;
  }
}

const flush = async (): Promise<void> => {
  for (let i = 0; i < 5; i++) await Promise.resolve();
};

describe('Achsen aus Tasten und Kippwinkel', () => {
  it('Tasten', () => {
    expect(axisFromKeys({ left: false, right: false })).toBe(0);
    expect(axisFromKeys({ left: true, right: false })).toBe(-1);
    expect(axisFromKeys({ left: false, right: true })).toBe(1);
    expect(axisFromKeys({ left: true, right: true })).toBe(0);
  });

  it('Kippwinkel: Totzone, Vollausschlag, Vorzeichen, ungültige Werte', () => {
    expect(axisFromTilt(0)).toBe(0);
    expect(axisFromTilt(TILT_DEAD_DEG - 0.1)).toBe(0);
    expect(axisFromTilt(TILT_FULL_DEG)).toBe(1);
    expect(axisFromTilt(-60)).toBe(-1);
    const mid = axisFromTilt(10);
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(1);
    expect(axisFromTilt(-10)).toBeCloseTo(-mid, 9);
    expect(axisFromTilt(NaN)).toBe(0);
    expect(axisFromTilt(undefined)).toBe(0);
    expect(axisFromTilt(null)).toBe(0);
  });

  it('Neigung der Bildschirmfläche aus Lagewinkeln und Bildschirmdrehung', () => {
    expect(screenTiltDeg(30, 12, 0)).toBe(12);
    expect(screenTiltDeg(30, 12, 90)).toBe(30);
    expect(screenTiltDeg(30, 12, 180)).toBe(-12);
    expect(screenTiltDeg(30, 12, 270)).toBe(-30);
    expect(screenTiltDeg(30, 12, -90)).toBe(-30); // −90 ≙ 270
    expect(screenTiltDeg(30, 12, 360)).toBe(12);
    expect(screenTiltDeg(30, 12, 88)).toBe(30); // auf 90 gerundet
  });

  it('kleinste Winkeldifferenz', () => {
    expect(angleDiff(10, 350)).toBe(20);
    expect(angleDiff(350, 10)).toBe(-20);
    expect(angleDiff(5, 5)).toBe(0);
  });
});

describe('Steuerung anwenden', () => {
  it('Position (Anteil), Achse, Begrenzung, Rand', () => {
    expect(applySteering(10, { mode: 'position', x: 0.25 }, 0.016, 50, 60)).toBe(15);
    expect(applySteering(10, { mode: 'axis', a: 1 }, 0.1, 50, 60)).toBe(15);
    expect(applySteering(10, { mode: 'axis', a: -1 }, 1, 50, 60)).toBe(0);
    expect(applySteering(55, { mode: 'axis', a: 1 }, 1, 50, 60)).toBe(60);
    expect(applySteering(10, null, 0.1, 50, 60)).toBe(10);
    expect(applySteering(10, { mode: 'position', x: 2 }, 0.1, 50, 60)).toBe(60); // wird begrenzt
    expect(applySteering(10, { mode: 'position', x: -1 }, 0.1, 50, 60)).toBe(0);
    // Rand: die Figur bleibt ganz im Feld
    expect(applySteering(10, { mode: 'position', x: 0 }, 0.1, 50, 60, 2)).toBe(2);
    expect(applySteering(10, { mode: 'position', x: 1 }, 0.1, 50, 60, 2)).toBe(58);
    expect(applySteering(10, { mode: 'position', x: 0.5 }, 0.1, 50, 60, 2)).toBe(30);
    expect(applySteering(10, { mode: 'axis', a: -1 }, 5, 50, 60, 2)).toBe(2);
    expect(applySteering(10, { mode: 'position', x: 0.5 }, 0.1, 50, 3, 5)).toBe(1.5); // Feld kleiner als die Figur: Mitte
    expect(applySteering(10, { mode: 'position', x: NaN }, 0.1, 50, 60)).toBe(10);
    expect(applySteering(10, { mode: 'axis', a: 99 }, 0.1, 50, 60)).toBe(15); // Achse auf ±1 begrenzt
  });
});

describe('Zeiger und Tasten', () => {
  it('Zeiger: ohne Berührung keine Eingabe; danach die Position als Anteil', () => {
    const s = new Steering({ kinds: ['pointer'] });
    expect(s.read()).toBeNull();
    s.pointer(0.25);
    expect(s.read()).toEqual({ mode: 'position', x: 0.25 });
    s.pointer(7);
    expect(s.read()).toEqual({ mode: 'position', x: 1 });
    s.pointer(NaN);
    expect(s.read()).toEqual({ mode: 'position', x: 1 });
  });

  it('Tasten: Pfeile und A/D, beide gedrückt heben sich auf, andere Tasten nichts, Aufräumen', () => {
    const w = new FakeTarget();
    const s = new Steering({ kinds: ['keys'], target: w });
    expect(s.read()).toBeNull();
    let prevented = 0;
    const ev = (key: string) => ({ key, preventDefault: () => prevented++ });
    w.fire('keydown', ev('ArrowRight'));
    expect(s.read()).toEqual({ mode: 'axis', a: 1 });
    w.fire('keydown', ev('a'));
    expect(s.read()).toBeNull(); // beide: Achse 0 → keine Eingabe
    w.fire('keyup', ev('ArrowRight'));
    expect(s.read()).toEqual({ mode: 'axis', a: -1 });
    w.fire('keyup', ev('A'));
    expect(s.read()).toBeNull();
    w.fire('keydown', ev('x'));
    w.fire('keydown', ev(' '));
    expect(s.read()).toBeNull();
    expect(prevented).toBe(4);
    s.dispose();
    expect(w.count('keydown')).toBe(0);
    expect(w.count('keyup')).toBe(0);
  });

  it('nur die gewählte Steuerung gilt: Tasten wirken nicht im Zeiger-Modus und umgekehrt', () => {
    const w = new FakeTarget();
    const s = new Steering({ kinds: ['pointer'], target: w });
    w.fire('keydown', { key: 'ArrowLeft' });
    expect(s.read()).toBeNull();
    const k = new Steering({ kinds: ['keys'], target: w });
    k.pointer(0.9);
    expect(k.read()).toBeNull();
  });

  it('beim Wechsel auf Zeiger und Tasten übernimmt der Zeiger erst wieder, wenn er sich bewegt', () => {
    const w = new FakeTarget();
    const s = new Steering({ kinds: ['pointer', 'keys'], target: w });
    s.pointer(0.3);
    expect(s.read()).toEqual({ mode: 'position', x: 0.3 });
    w.fire('keydown', { key: 'ArrowRight' });
    expect(s.read()).toEqual({ mode: 'axis', a: 1 });
    w.fire('keyup', { key: 'ArrowRight' });
    expect(s.read()).toBeNull(); // kein Zurückspringen auf die alte Zeigerposition
    s.pointer(0.8);
    expect(s.read()).toEqual({ mode: 'position', x: 0.8 });
  });
});

describe('Gerätekippen', () => {
  it('ohne Erlaubnis-Abfrage (Android, Rechner): erst nach requestTilt() wird gelesen; erste Lage = Mitte; relative Neigung', async () => {
    const w = new FakeTarget();
    const s = new Steering({ kinds: ['tilt'], target: w, requestPermission: null, tiltAvailable: true, screenAngle: () => 0 });
    expect(s.status).toBe('idle');
    expect(w.count('deviceorientation')).toBe(0); // nichts gelesen, bevor die Person es einschaltet
    expect(await s.requestTilt()).toBe('listening');
    expect(s.status).toBe('listening');
    expect(w.count('deviceorientation')).toBe(1);
    expect(s.read()).toBeNull();
    w.fire('deviceorientation', { beta: 40, gamma: 7 });
    expect(s.status).toBe('ready');
    expect(s.tiltDeg).toBe(0); // die erste Lage ist die Mitte
    expect(s.read()).toEqual({ mode: 'axis', a: 0 });
    w.fire('deviceorientation', { beta: 40, gamma: 7 + TILT_FULL_DEG });
    expect(s.read()).toEqual({ mode: 'axis', a: 1 });
    w.fire('deviceorientation', { beta: 40, gamma: 7 - 10 });
    const a = (s.read() as { a: number }).a;
    expect(a).toBeLessThan(0);
    expect(a).toBeGreaterThan(-1);
    s.recenter();
    expect(s.read()).toEqual({ mode: 'axis', a: 0 });
    s.dispose();
    expect(w.count('deviceorientation')).toBe(0);
  });

  it('leere Werte (Rechner ohne Sensor) werden ignoriert: Status bleibt „listening“', async () => {
    const w = new FakeTarget();
    const s = new Steering({ kinds: ['tilt'], target: w, requestPermission: null, tiltAvailable: true });
    await s.requestTilt();
    w.fire('deviceorientation', { beta: null, gamma: null });
    w.fire('deviceorientation', { beta: undefined, gamma: 3 });
    w.fire('deviceorientation', { beta: NaN, gamma: 3 });
    expect(s.status).toBe('listening');
    expect(s.read()).toBeNull();
  });

  it('Querformat: Drehung 90 liest beta, 270 liest −beta', async () => {
    for (const [angle, sign] of [
      [90, 1],
      [270, -1],
    ] as const) {
      const w = new FakeTarget();
      const s = new Steering({ kinds: ['tilt'], target: w, requestPermission: null, tiltAvailable: true, screenAngle: () => angle });
      await s.requestTilt();
      w.fire('deviceorientation', { beta: 30, gamma: 50 }); // Mitte
      w.fire('deviceorientation', { beta: 30 + TILT_FULL_DEG, gamma: 50 });
      expect((s.read() as { a: number }).a).toBe(sign);
      w.fire('deviceorientation', { beta: 30, gamma: 50 + 40 }); // Neigung zum Nutzer (gamma): keine Wirkung
      expect((s.read() as { a: number }).a).toBe(0);
    }
  });

  it('iOS: die Erlaubnis wird erst bei requestTilt() abgefragt; „granted“ → hören, „denied“ → abgelehnt', async () => {
    let asked = 0;
    const w = new FakeTarget();
    const ok = new Steering({ kinds: ['tilt'], target: w, tiltAvailable: true, requestPermission: async () => (asked++, 'granted') });
    expect(asked).toBe(0);
    expect(await ok.requestTilt()).toBe('listening');
    expect(asked).toBe(1);
    expect(w.count('deviceorientation')).toBe(1);
    const w2 = new FakeTarget();
    const no = new Steering({ kinds: ['tilt'], target: w2, tiltAvailable: true, requestPermission: async () => 'denied' });
    expect(await no.requestTilt()).toBe('denied');
    expect(no.status).toBe('denied');
    expect(w2.count('deviceorientation')).toBe(0); // bei Ablehnung wird nichts gelesen
  });

  it('iOS: NotAllowedError (Anfrage nicht aus einer Berührung) → „retry“, später erneut versuchbar; anderer Fehler → nicht unterstützt', async () => {
    const w = new FakeTarget();
    let n = 0;
    const s = new Steering({
      kinds: ['tilt'],
      target: w,
      tiltAvailable: true,
      requestPermission: async () => {
        if (n++ === 0) throw Object.assign(new Error('x'), { name: 'NotAllowedError' });
        return 'granted';
      },
    });
    expect(await s.requestTilt()).toBe('retry');
    expect(s.status).toBe('idle');
    expect(await s.requestTilt()).toBe('listening');
    const bad = new Steering({ kinds: ['tilt'], target: new FakeTarget(), tiltAvailable: true, requestPermission: async () => { throw new Error('kaputt'); } });
    expect(await bad.requestTilt()).toBe('unsupported');
  });

  it('kein Sensor/Fenster oder Kippen nicht gewählt: „unsupported“, nichts abonniert', async () => {
    expect(await new Steering({ kinds: ['tilt'], target: null, requestPermission: null }).requestTilt()).toBe('unsupported');
    const w = new FakeTarget();
    expect(await new Steering({ kinds: ['tilt'], target: w, tiltAvailable: false, requestPermission: null }).requestTilt()).toBe('unsupported');
    expect(w.count('deviceorientation')).toBe(0);
    const p = new Steering({ kinds: ['pointer'], target: w, tiltAvailable: true });
    expect(p.status).toBe('off');
    expect(await p.requestTilt()).toBe('unsupported');
  });
});

describe('Startbildschirm „Gerät kippen“', () => {
  const stage: StageInfo = { w: 820, h: 1180, u: 8.2, dpr: 1 };
  const texts: TiltGateTexts = { title: 'T', body: 'B', enable: 'E', usePointer: 'P', asking: 'A', waiting: 'W', hold: 'H {n}', fallback: 'F' };
  const hud = () => {
    const toasts: string[] = [];
    const h = { toast: (s: string) => toasts.push(s) } as unknown as Hud;
    return { h, toasts };
  };
  const make = (perm: (() => Promise<string>) | null, tiltAvailable = true) => {
    const w = new FakeTarget();
    const st = new Steering({ kinds: ['tilt'], target: w, requestPermission: perm, tiltAvailable, screenAngle: () => 0 });
    const { h, toasts } = hud();
    const gate = new TiltGate(st, stage, texts, h, w);
    return { w, st, gate, toasts };
  };
  const centerOf = (r: { x: number; y: number; w: number; h: number }) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });

  it('Tasten sind mindestens 56 px hoch und liegen auf der Bühne (auch auf dem Handy)', () => {
    for (const [w, h] of [
      [390, 844],
      [320, 560],
      [820, 1180],
      [1180, 820],
    ]) {
      const { st } = make(null);
      const g = new TiltGate(st, { w, h, u: Math.min(w, h) / 100, dpr: 1 }, texts, hud().h);
      const b = g.buttons();
      for (const r of [b.enable, b.pointer]) {
        expect(r.h).toBeGreaterThanOrEqual(56);
        expect(r.w).toBeGreaterThanOrEqual(120);
        expect(r.x).toBeGreaterThanOrEqual(0);
        expect(r.x + r.w).toBeLessThanOrEqual(w);
        expect(r.y + r.h).toBeLessThanOrEqual(h);
      }
      expect(b.pointer.y).toBeGreaterThan(b.enable.y + b.enable.h);
    }
  });

  it('Ablauf ohne Erlaubnis-Abfrage: Tippen → Loslassen → hören → Sensorwert → Countdown → fertig; Mitte = Haltung am Ende', async () => {
    const { w, st, gate } = make(null);
    expect(gate.active).toBe(true);
    expect(gate.phase).toBe('choose');
    const c = centerOf(gate.buttons().enable);
    gate.update(0);
    gate.activate(); // ohne vorheriges Tippen auf die Taste: nichts
    expect(gate.phase).toBe('choose');
    w.fire('pointerup');
    expect(gate.phase).toBe('choose');
    gate.pointerDown(c.x, c.y, 100);
    expect(st.status).toBe('idle'); // noch keine Anfrage: erst beim Loslassen
    w.fire('pointerup');
    await flush();
    expect(gate.phase).toBe('listening');
    expect(st.status).toBe('listening');
    gate.update(500);
    expect(gate.phase).toBe('listening');
    w.fire('deviceorientation', { beta: 40, gamma: 10 });
    gate.update(600);
    expect(gate.phase).toBe('countdown');
    w.fire('deviceorientation', { beta: 40, gamma: 14 }); // die Person bewegt das Gerät noch
    gate.update(600 + TILT_COUNTDOWN_MS - 1);
    expect(gate.phase).toBe('countdown');
    gate.update(600 + TILT_COUNTDOWN_MS);
    expect(gate.phase).toBe('done');
    expect(gate.active).toBe(false);
    expect(gate.usedFallback).toBe(false);
    expect(st.tiltDeg).toBe(0); // Haltung beim Start = Mitte
    w.fire('deviceorientation', { beta: 40, gamma: 14 + TILT_FULL_DEG });
    expect(st.read()).toEqual({ mode: 'axis', a: 1 });
    gate.destroy();
    expect(w.count('pointerup')).toBe(0);
    expect(w.count('touchend')).toBe(0);
    expect(w.count('click')).toBe(0);
  });

  it('die Anfrage geht auch bei touchend oder click hinaus (nicht nur pointerup)', async () => {
    for (const type of ['touchend', 'click']) {
      const { w, gate } = make(null);
      const c = centerOf(gate.buttons().enable);
      gate.pointerDown(c.x, c.y, 10);
      w.fire(type);
      await flush();
      expect(gate.phase, type).toBe('listening');
    }
  });

  it('Erlaubnis abgelehnt → Rückfall auf Zeiger und Tasten mit Hinweis; Lauf kann beginnen', async () => {
    const { w, st, gate, toasts } = make(async () => 'denied');
    const c = centerOf(gate.buttons().enable);
    gate.pointerDown(c.x, c.y, 10);
    w.fire('pointerup');
    await flush();
    expect(gate.phase).toBe('done');
    expect(gate.usedFallback).toBe(true);
    expect(st.active).toEqual(['pointer', 'keys']);
    expect(toasts).toEqual(['F']);
    st.pointer(0.4);
    expect(st.read()).toEqual({ mode: 'position', x: 0.4 });
  });

  it('kein Sensor-Wert innerhalb von 1,8 s nach der Erlaubnis → Rückfall mit Hinweis', async () => {
    const { w, st, gate, toasts } = make(async () => 'granted');
    const c = centerOf(gate.buttons().enable);
    gate.update(1000);
    gate.pointerDown(c.x, c.y, 1000);
    w.fire('pointerup');
    await flush();
    expect(gate.phase).toBe('listening');
    gate.update(1000 + TILT_LISTEN_MS);
    expect(gate.phase).toBe('listening');
    gate.update(1000 + TILT_LISTEN_MS + 1);
    expect(gate.phase).toBe('done');
    expect(gate.usedFallback).toBe(true);
    expect(toasts).toEqual(['F']);
    expect(st.active).toEqual(['pointer', 'keys']);
  });

  it('Browser lehnt die Anfrage ab (keine Berührung erkannt): bleibt auf dem Startbildschirm, die nächste Berührung versucht es erneut', async () => {
    let n = 0;
    const { w, gate } = make(async () => {
      if (n++ === 0) throw Object.assign(new Error('x'), { name: 'NotAllowedError' });
      return 'granted';
    });
    const c = centerOf(gate.buttons().enable);
    gate.pointerDown(c.x, c.y, 10);
    w.fire('pointerup'); // erste Berührungsart: abgelehnt
    await flush();
    expect(gate.phase).toBe('choose');
    w.fire('touchend'); // zweite Berührungsart: klappt
    await flush();
    expect(gate.phase).toBe('listening');
  });

  it('Kein Sensor/Fenster: sofort Rückfall; „Stattdessen mit dem Finger“ ohne Hinweis', async () => {
    const a = make(null, false);
    const ca = centerOf(a.gate.buttons().enable);
    a.gate.pointerDown(ca.x, ca.y, 5);
    a.w.fire('pointerup');
    await flush();
    expect(a.gate.phase).toBe('done');
    expect(a.gate.usedFallback).toBe(true);
    expect(a.toasts).toEqual(['F']);
    const b = make(null);
    const cb = centerOf(b.gate.buttons().pointer);
    b.gate.pointerDown(cb.x, cb.y, 5);
    expect(b.gate.phase).toBe('done');
    expect(b.gate.usedFallback).toBe(true);
    expect(b.toasts).toEqual([]); // freiwillig gewählt: kein Hinweis nötig
    expect(b.st.active).toEqual(['pointer', 'keys']);
  });

  it('Berührungen außerhalb der Tasten tun nichts; nach dem Ende ebenfalls nicht', () => {
    const { gate } = make(null);
    gate.pointerDown(5, 5, 1);
    expect(gate.phase).toBe('choose');
    const c = centerOf(gate.buttons().pointer);
    gate.pointerDown(c.x, c.y, 2);
    expect(gate.phase).toBe('done');
    gate.pointerDown(c.x, c.y, 3);
    gate.activate();
    expect(gate.phase).toBe('done');
  });

  it('Zeichnen: Texte aller Phasen erscheinen, auch bei sehr kleiner Bühne, ohne Fehler', () => {
    const drawn: string[] = [];
    const g = new Proxy({} as Record<string, unknown>, {
      get: (t, k: string) => {
        if (k === 'measureText') return (s: string) => ({ width: String(s).length * 9 });
        if (k === 'fillText') return (s: string) => drawn.push(String(s));
        return k in t ? t[k] : () => undefined;
      },
      set: (t, k: string, v) => ((t[k] = v), true),
    }) as unknown as CanvasRenderingContext2D;
    for (const s of [stage, { w: 200, h: 220, u: 2.2, dpr: 1 }]) {
      const st = new Steering({ kinds: ['tilt'], target: new FakeTarget(), requestPermission: null, tiltAvailable: true });
      const gate = new TiltGate(st, s, texts, hud().h);
      gate.render(g, 0);
      expect(drawn).toEqual(expect.arrayContaining(['E', 'P']));
      expect(drawn.join(' ')).toContain('T');
    }
  });
});
