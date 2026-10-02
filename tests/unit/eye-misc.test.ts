// EYE-EXPERIMENT: Helligkeit, Zähler, Export und Auslieferungsdateien.
import { describe, expect, it } from 'vitest';
import { buildExport, roundDeep } from '../../src/eye/exportData';
import { shouldBlock } from '../../src/eye/netguard';
import { brightnessAdvice, lumaStats, reflectionLikely } from '../../src/eye/luma';
import { RateMeter, RollingStats } from '../../src/eye/meters';

function image(w: number, h: number, fill: (x: number, y: number) => [number, number, number]): Uint8ClampedArray {
  const d = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const [r, g, b] = fill(x, y);
      d.set([r, g, b, 255], (y * w + x) * 4);
    }
  return d;
}

describe('Helligkeitsprüfung', () => {
  it('mittleres Grau', () => {
    const s = lumaStats(image(8, 8, () => [100, 100, 100]), 8, 8);
    expect(s.mean).toBeCloseTo(100, 6);
    expect(s.brightFrac).toBe(0);
    expect(s.darkFrac).toBe(0);
  });

  it('Rechteck: nur der Ausschnitt zählt', () => {
    const img = image(10, 10, (x) => (x < 5 ? [255, 255, 255] : [0, 0, 0]));
    expect(lumaStats(img, 10, 10, { x0: 0, y0: 0, x1: 0.5, y1: 1 }).brightFrac).toBe(1);
    expect(lumaStats(img, 10, 10, { x0: 0.5, y0: 0, x1: 1, y1: 1 }).darkFrac).toBe(1);
    expect(lumaStats(img, 10, 10).brightFrac).toBe(0.5);
  });

  it('Hinweise: zu dunkel, überstrahlt, in Ordnung', () => {
    expect(brightnessAdvice({ mean: 40, brightFrac: 0, darkFrac: 0.5 })).toBe('dark');
    expect(brightnessAdvice({ mean: 215, brightFrac: 0.1, darkFrac: 0 })).toBe('bright');
    expect(brightnessAdvice({ mean: 150, brightFrac: 0.3, darkFrac: 0 })).toBe('bright');
    expect(brightnessAdvice({ mean: 130, brightFrac: 0.02, darkFrac: 0.01 })).toBe('ok');
    expect(brightnessAdvice({ mean: NaN, brightFrac: 0, darkFrac: 0 })).toBe('ok');
  });

  it('Spiegelungshinweis erst bei vielen fast weißen Pixeln in den Augenrechtecken', () => {
    expect(reflectionLikely([{ mean: 90, brightFrac: 0.01, darkFrac: 0 }, { mean: 90, brightFrac: 0.02, darkFrac: 0 }])).toBe(false);
    expect(reflectionLikely([{ mean: 90, brightFrac: 0.01, darkFrac: 0 }, { mean: 90, brightFrac: 0.08, darkFrac: 0 }])).toBe(true);
  });
});

describe('Zähler', () => {
  it('Bildrate: 30 Bilder pro Sekunde', () => {
    const m = new RateMeter(1000);
    for (let i = 0; i <= 45; i++) m.tick(i * (1000 / 30));
    expect(m.rate(45 * (1000 / 30))).toBeCloseTo(30, 0);
    expect(m.rate(45 * (1000 / 30) + 5000)).toBe(0); // lange nichts mehr gekommen
  });

  it('Mittel und Maximum über die letzten n Werte', () => {
    const s = new RollingStats(3);
    [1, 2, 3, 10].forEach((v) => s.push(v));
    expect(s.count).toBe(3);
    expect(s.mean).toBe(5);
    expect(s.max).toBe(10);
  });
});

describe('Netzwächter', () => {
  const origin = 'https://visual.auer.page';
  it('blockiert Fremd-Anfragen (z. B. MediaPipe-Statistik), erlaubt eigene, blob und data', () => {
    expect(shouldBlock('https://odml.pa.googleapis.com/v1/log', origin)).toBe(true);
    expect(shouldBlock('http://visual.auer.page/x', origin)).toBe(true); // anderes Protokoll = andere Herkunft
    expect(shouldBlock('https://visual.auer.page/eye-models/face_landmarker.task', origin)).toBe(false);
    expect(shouldBlock('../../eye-models/vision_wasm_internal.wasm', origin)).toBe(false);
    expect(shouldBlock('blob:https://visual.auer.page/abc', origin)).toBe(false);
    expect(shouldBlock('data:application/octet-stream;base64,AA==', origin)).toBe(false);
  });
});

describe('Export', () => {
  it('rundet verschachtelt und macht NaN/Infinity zu null', () => {
    expect(roundDeep({ a: 1.23456, b: [0.1 + 0.2, NaN], c: { d: Infinity, e: 'x' } }, 2)).toEqual({ a: 1.23, b: [0.3, null], c: { d: null, e: 'x' } });
  });

  it('buildExport enthält Schema, Hinweis und alle Teile', () => {
    const e = buildExport({
      generatedAt: '2026-01-01T00:00:00Z',
      device: { ua: 'x' },
      camera: { w: 640 },
      assumptions: { distanceCm: 45 },
      timing: { procMsMean: 12.3456 },
      calibration: null,
      accuracy: { meanPx: 33.3333 },
      jitter: null,
      quarterTest: null,
      switchTest: null,
    });
    expect(e.schema).toBe('blickfit-eye-labor/1');
    expect(String(e.hinweis)).toContain('keine Diagnose');
    expect((e.timing as { procMsMean: number }).procMsMean).toBe(12.35);
    expect((e.accuracy as { meanPx: number }).meanPx).toBe(33.33);
    expect(JSON.parse(JSON.stringify(e))).toEqual(e);
  });
});

// Node-Module über Variablen laden, damit die Typprüfung ohne @types/node auskommt (der Test läuft in Node)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeModule = (name: string): Promise<any> => import(/* @vite-ignore */ name);

describe('Ausgelieferte Modelldateien (public/eye-models)', () => {
  const dir = 'public/eye-models/';

  async function io() {
    const fs = await nodeModule('node:fs');
    const crypto = await nodeModule('node:crypto');
    return {
      existsSync: fs.existsSync as (p: string) => boolean,
      readFileSync: fs.readFileSync as (p: string) => Uint8Array,
      statSync: fs.statSync as (p: string) => { size: number },
      sha: (p: string): string => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'),
    };
  }

  it('Modell und WASM liegen da und sind nicht leer', async () => {
    const { existsSync, statSync } = await io();
    for (const f of ['face_landmarker.task', 'vision_wasm_internal.js', 'vision_wasm_internal.wasm']) {
      expect(existsSync(dir + f), f).toBe(true);
      expect(statSync(dir + f).size).toBeGreaterThan(100_000);
    }
    expect(statSync(dir + 'face_landmarker.task').size).toBe(3758596);
  });

  it('WASM-Dateien stimmen mit dem installierten npm-Paket überein (gleiche Version)', async () => {
    const { existsSync, sha } = await io();
    const pkg = 'node_modules/@mediapipe/tasks-vision/wasm/';
    if (!existsSync(pkg)) return; // Paket nicht installiert (z. B. nach dem Entfernen des Experiments)
    for (const f of ['vision_wasm_internal.js', 'vision_wasm_internal.wasm']) expect(sha(dir + f), f).toBe(sha(pkg + f));
  });

  it('WASM beginnt mit der WebAssembly-Kennung', async () => {
    const { readFileSync } = await io();
    const head = readFileSync(dir + 'vision_wasm_internal.wasm').subarray(0, 4);
    expect([...head]).toEqual([0x00, 0x61, 0x73, 0x6d]);
  });
});
