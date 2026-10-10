import { describe, expect, it } from 'vitest';
import { adviceFor, checkShows, EMPTY_RESULTS, isComplete, normalizeCalibration } from '../../src/binokular/calibration/calibration';
import { paletteOf, START_PROFILES, startProfileFor } from '../../src/binokular/calibration/profiles';
import { visionOf, DEFAULT_SETTINGS } from '../../src/binokular/data/settings';
import {
  colorKind,
  deltaOf,
  eyeContrast,
  eyeOf,
  filterOf,
  isSecondColor,
  linearToSrgb,
  mixLinear,
  NEUTRAL_LEVEL,
  NEUTRAL_MIN,
  normalizeRgb,
  parseHex,
  resolveColor,
  srgbToLinear,
  throughFilter,
  toHex,
  type RGB,
  type VisionSettings,
} from '../../src/binokular/vision/color';
import { itemColor, renderItems, shapeBounds, type Item } from '../../src/binokular/vision/renderer';

const RC = paletteOf(startProfileFor('RED_CYAN'));
const RG = paletteOf(startProfileFor('RED_GREEN'));
const base: VisionSettings = {
  amblyopicEye: 'LEFT',
  glasses: 'RED_CYAN',
  leftLens: 'RED',
  amblyopicContrast: 100,
  fellowEyeContrast: 20,
  palette: RC,
};
const lum = (c: RGB) => srgbToLinear(c.r) + srgbToLinear(c.g) + srgbToLinear(c.b);

describe('Farbzuordnung je Auge (vision/color)', () => {
  it('Glas je Auge folgt der Zuordnung', () => {
    expect(filterOf('LEFT', base)).toBe('RED');
    expect(filterOf('RIGHT', base)).toBe('CYAN');
    expect(filterOf('LEFT', { ...base, leftLens: 'OTHER' })).toBe('CYAN');
    expect(filterOf('RIGHT', { ...base, leftLens: 'OTHER' })).toBe('RED');
    expect(filterOf('RIGHT', { ...base, glasses: 'RED_GREEN' })).toBe('GREEN');
  });
  it('AMBLYOPIC → amblyopes Auge, FELLOW → anderes Auge, BOTH → keines', () => {
    expect(eyeOf('AMBLYOPIC', base)).toBe('LEFT');
    expect(eyeOf('FELLOW', base)).toBe('RIGHT');
    expect(eyeOf('BOTH', base)).toBeNull();
    expect(eyeOf('AMBLYOPIC', { ...base, amblyopicEye: 'RIGHT' })).toBe('RIGHT');
  });
  it('Startwerte laut Vorgabe: Rot-Cyan #FF0000 / #0000FF (reines Blau) / #160000, Rot-Grün #FF0000 / #009600 / #210000', () => {
    expect([toHex(RC.red), toHex(RC.second), toHex(RC.background)]).toEqual(['#FF0000', '#0000FF', '#160000']);
    expect([toHex(RG.red), toHex(RG.second), toHex(RG.background)]).toEqual(['#FF0000', '#009600', '#210000']);
    expect(START_PROFILES.map((p) => p.mode)).toEqual(['RED_CYAN', 'RED_GREEN']);
  });
  it('volle Augenobjekte haben genau die Profilfarbe (amblyop rot, führend in der Zweitfarbe)', () => {
    expect(resolveColor('AMBLYOPIC', 1, base)).toEqual(RC.red);
    expect(resolveColor('FELLOW', 1, { ...base, fellowEyeContrast: 100 })).toEqual(RC.second);
    const rg: VisionSettings = { ...base, glasses: 'RED_GREEN', palette: RG, fellowEyeContrast: 100 };
    expect(resolveColor('FELLOW', 1, rg)).toEqual(RG.second);
    const swapped: VisionSettings = { ...base, leftLens: 'OTHER' };
    expect(resolveColor('AMBLYOPIC', 1, swapped)).toEqual(RC.second);
  });
  it('Kontrast = Mischung zwischen Hintergrund und Vollfarbe in linearem Licht', () => {
    const bg = RC.background;
    // Kontrast 0: Objekt verschwindet im Hintergrund (für beide Augen)
    expect(resolveColor('FELLOW', 1, { ...base, fellowEyeContrast: 0 })).toEqual(bg);
    expect(resolveColor('AMBLYOPIC', 0, base)).toEqual(bg);
    // 20 % führendes Auge: linearer Blauanteil 0,2, Rot geht von Hintergrund-Rot Richtung 0
    const c = resolveColor('FELLOW', 1, base);
    expect(srgbToLinear(c.b)).toBeCloseTo(0.2, 2);
    expect(srgbToLinear(c.r)).toBeCloseTo(0.8 * srgbToLinear(bg.r), 3);
    expect(c.g).toBe(0);
    // Augenkontrast × Objektkontrast
    const half = resolveColor('AMBLYOPIC', 0.5, { ...base, amblyopicContrast: 50 });
    expect(srgbToLinear(half.r)).toBeCloseTo(srgbToLinear(bg.r) + 0.25 * (1 - srgbToLinear(bg.r)), 2);
    expect(eyeContrast('AMBLYOPIC', { amblyopicContrast: 140, fellowEyeContrast: 20 })).toBe(100);
    expect(eyeContrast('FELLOW', { amblyopicContrast: 100, fellowEyeContrast: -5 })).toBe(0);
  });
  it('BOTH neutral grau #777–#888 bei vollem Kontrast, nie heller; Abstufungen gehen zum Hintergrund', () => {
    const full = resolveColor('BOTH', 1, base);
    expect(full).toEqual({ r: NEUTRAL_LEVEL, g: NEUTRAL_LEVEL, b: NEUTRAL_LEVEL });
    expect(NEUTRAL_LEVEL).toBeGreaterThanOrEqual(NEUTRAL_MIN);
    expect(toHex(full)).toBe('#888888');
    for (const k of [0, 0.16, 0.3, 0.5, 0.8, 1]) {
      const c = resolveColor('BOTH', k, base);
      expect(Math.max(c.r, c.g, c.b)).toBeLessThanOrEqual(NEUTRAL_LEVEL);
      expect(c.r).toBeGreaterThanOrEqual(RC.background.r);
    }
    expect(resolveColor('BOTH', 0, base)).toEqual(RC.background);
    expect(lum(throughFilter(full, 'RED'))).toBeGreaterThan(0);
    expect(lum(throughFilter(full, 'CYAN'))).toBeGreaterThan(0);
  });
  it('Farben kommen nur aus der Palette (anderes Profil → andere Farben)', () => {
    const custom: VisionSettings = { ...base, palette: { red: { r: 230, g: 0, b: 0 }, second: { r: 0, g: 64, b: 255 }, background: { r: 25, g: 0, b: 51 } } };
    expect(resolveColor('AMBLYOPIC', 1, custom)).toEqual({ r: 230, g: 0, b: 0 });
    expect(resolveColor('FELLOW', 1, { ...custom, fellowEyeContrast: 100 })).toEqual({ r: 0, g: 64, b: 255 });
    expect(resolveColor('BOTH', 0, custom)).toEqual({ r: 25, g: 0, b: 51 });
  });
  it('visionOf: Brillentyp und Palette aus dem aktiven Profil', () => {
    const v = visionOf(DEFAULT_SETTINGS, startProfileFor('RED_GREEN'));
    expect(v.glasses).toBe('RED_GREEN');
    expect(v.palette).toEqual(RG);
  });
  it('Zweitfarbe erkannt (für Mindest-Linienbreite)', () => {
    expect(isSecondColor('AMBLYOPIC', base)).toBe(false);
    expect(isSecondColor('FELLOW', base)).toBe(true);
    expect(isSecondColor('BOTH', base)).toBe(false);
    expect(isSecondColor('AMBLYOPIC', { ...base, leftLens: 'OTHER' })).toBe(true);
  });
});

describe('Zeichnen als Abweichung vom Hintergrund (Deltas)', () => {
  /** Simulation der Canvas-Verrechnung je Kanal: erst `difference` (minus), dann `lighter` (plus) */
  const compose = (under: RGB, d: { plus: RGB; minus: RGB }): RGB => {
    const ch = (u: number, m: number, p: number) => Math.min(255, Math.abs(u - m) + p);
    return { r: ch(under.r, d.minus.r, d.plus.r), g: ch(under.g, d.minus.g, d.plus.g), b: ch(under.b, d.minus.b, d.plus.b) };
  };
  const cases: VisionSettings[] = [
    base,
    { ...base, fellowEyeContrast: 100 },
    { ...base, amblyopicEye: 'RIGHT' },
    { ...base, glasses: 'RED_GREEN', palette: RG },
    { ...base, palette: { red: { r: 240, g: 0, b: 0 }, second: { r: 0, g: 64, b: 255 }, background: { r: 30, g: 0, b: 40 } } },
    { ...base, glasses: 'RED_GREEN', palette: { red: { r: 255, g: 0, b: 0 }, second: { r: 0, g: 140, b: 0 }, background: { r: 45, g: 30, b: 0 } } },
  ];
  it('auf dem Hintergrund ergibt sich genau die Objektfarbe', () => {
    for (const s of cases) {
      for (const v of ['AMBLYOPIC', 'FELLOW'] as const) {
        for (const k of [0.2, 0.5, 1]) {
          const c = resolveColor(v, k, s);
          expect(compose(s.palette.background, deltaOf(c, s.palette.background))).toEqual(c);
        }
      }
    }
  });
  it('je Kanal nur plus ODER minus; minus nie größer als der Hintergrund bzw. graue Felder (Subtraktion gültig)', () => {
    for (const s of cases) {
      const bg = s.palette.background;
      for (const v of ['AMBLYOPIC', 'FELLOW'] as const) {
        const d = deltaOf(resolveColor(v, 1, s), bg);
        for (const k of ['r', 'g', 'b'] as const) {
          expect(d.plus[k] === 0 || d.minus[k] === 0).toBe(true);
          expect(d.minus[k]).toBeLessThanOrEqual(bg[k]);
          for (const tone of [0.16, 0.3, 0.5, 1]) expect(d.minus[k]).toBeLessThanOrEqual(resolveColor('BOTH', tone, s)[k]);
        }
      }
    }
  });
  it('über Grau ändert ein Objekt nur die Kanäle, in denen es vom Hintergrund abweicht (kein Loch im Grau)', () => {
    const s = { ...base, fellowEyeContrast: 100 };
    const grey = resolveColor('BOTH', 0.3, s);
    // reines Blau auf #160000: nur R sinkt um den Hintergrund-Rotanteil, B steigt; G (unbeteiligt) bleibt
    const blue = compose(grey, deltaOf(resolveColor('FELLOW', 1, s), s.palette.background));
    expect(blue.g).toBe(grey.g);
    expect(blue.r).toBe(grey.r - s.palette.background.r);
    expect(blue.b).toBeGreaterThan(grey.b);
    // rotes Objekt über Grau: G und B bleiben (Hintergrund hat dort 0) → durch das zweite Glas unverändert
    const red = compose(grey, deltaOf(resolveColor('AMBLYOPIC', 1, s), s.palette.background));
    expect([red.g, red.b]).toEqual([grey.g, grey.b]);
    expect(red.r).toBeGreaterThan(grey.r);
  });
});

describe('sRGB, Hex und Prüfung', () => {
  it('exakte sRGB-Formel, Rundreise', () => {
    expect(srgbToLinear(0)).toBe(0);
    expect(srgbToLinear(255)).toBe(1);
    expect(srgbToLinear(10)).toBeCloseTo(10 / 255 / 12.92, 8);
    for (const v of [0, 1, 10, 22, 100, 150, 200, 255]) expect(Math.round(linearToSrgb(srgbToLinear(v)))).toBe(v);
    expect(Math.round(linearToSrgb(0.3))).toBe(149);
    expect(mixLinear({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }, 0.5).r).toBe(188);
  });
  it('Hex lesen/schreiben, RGB streng prüfen', () => {
    expect(toHex({ r: 22, g: 0, b: 0 })).toBe('#160000');
    expect(parseHex('#009600')).toEqual({ r: 0, g: 150, b: 0 });
    expect(parseHex('#abc')).toEqual({ r: 170, g: 187, b: 204 });
    expect(parseHex('rot')).toBeNull();
    expect(normalizeRgb({ r: 300, g: -4, b: 12.6 }, { r: 1, g: 2, b: 3 })).toEqual({ r: 255, g: 0, b: 13 });
    expect(normalizeRgb({ r: 'x', g: 0, b: 0 }, { r: 1, g: 2, b: 3 })).toEqual({ r: 1, g: 2, b: 3 });
    expect(normalizeRgb('#0000ff', { r: 1, g: 2, b: 3 })).toEqual({ r: 0, g: 0, b: 255 });
    expect(colorKind({ r: 0, g: 0, b: 255 })).toBe('BLUE');
    expect(colorKind({ r: 0, g: 150, b: 0 })).toBe('GREEN');
    expect(colorKind({ r: 0, g: 255, b: 255 })).toBe('CYAN');
    expect(colorKind({ r: 255, g: 0, b: 0 })).toBe('RED');
  });
});

describe('Kontrolle der Zuordnung', () => {
  it('Schritte: linkes Auge, rechtes Auge, gemeinsames Objekt', () => {
    expect(checkShows('leftEye')).toBe('LEFT');
    expect(checkShows('rightEye')).toBe('RIGHT');
    expect(checkShows('commonObject')).toBe('BOTH');
  });
  it('Hinweise aus den Antworten (keine Bewertung der Person)', () => {
    const ok = { leftEye: 'left', rightEye: 'right', commonObject: 'both' } as const;
    expect(isComplete(ok)).toBe(true);
    expect(isComplete(EMPTY_RESULTS)).toBe(false);
    expect(adviceFor(ok)).toBe('ok');
    expect(adviceFor({ ...ok, leftEye: 'right', rightEye: 'left' })).toBe('swapLenses');
    expect(adviceFor({ ...ok, rightEye: 'both' })).toBe('crosstalk');
    expect(adviceFor({ ...ok, commonObject: 'none' })).toBe('notVisible');
  });
  it('alte Kalibrierung: Grundfarben verworfen, Augenantworten bleiben, alter Abschluss zählt nicht', () => {
    const c = normalizeCalibration({ colors: { red: { r: 230, g: 0, b: 30 } }, results: { objectA: 'seen', leftEye: 'left', rightEye: 'quatsch' }, completedAt: '2026-10-05T10:00:00.000Z' });
    expect(c).toEqual({ results: { leftEye: 'left', rightEye: null, commonObject: null }, completedAt: null, startValuesAccepted: false });
    const n = normalizeCalibration({ results: {}, completedAt: '2026-10-08T10:00:00.000Z', startValuesAccepted: true });
    expect(n.completedAt).toBe('2026-10-08T10:00:00.000Z');
    expect(n.startValuesAccepted).toBe(true);
    expect(normalizeCalibration({ completedAt: 'kein Datum' }).completedAt).toBeNull();
  });
});

describe('Renderer: Zeichenobjekte und Farben', () => {
  /** Attrappe eines 2D-Kontexts: protokolliert Füllfarben und Zeichenoperationen */
  function fakeCtx() {
    const log: { op: string; style: string; comp: string }[] = [];
    const g = {
      canvas: { width: 100, height: 100 },
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 1,
      lineJoin: '',
      lineCap: '',
      globalAlpha: 1,
      globalCompositeOperation: 'source-over',
      font: '',
      textAlign: '',
      textBaseline: '',
      save() {},
      restore() {},
      beginPath() {},
      moveTo() {},
      lineTo() {},
      arc() {},
      closePath() {},
      setLineDash() {},
      getTransform: () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }),
      setTransform() {},
      clearRect() {},
      drawImage() {},
      fillRect() {
        log.push({ op: 'fillRect', style: String(g.fillStyle), comp: g.globalCompositeOperation });
      },
      strokeRect() {
        log.push({ op: 'strokeRect', style: String(g.strokeStyle), comp: g.globalCompositeOperation });
      },
      fill() {
        log.push({ op: 'fill', style: String(g.fillStyle), comp: g.globalCompositeOperation });
      },
      stroke() {
        log.push({ op: 'stroke', style: String(g.strokeStyle), comp: g.globalCompositeOperation });
      },
      fillText() {
        log.push({ op: 'fillText', style: String(g.fillStyle), comp: g.globalCompositeOperation });
      },
    };
    return { g: g as unknown as CanvasRenderingContext2D, log };
  }
  const css = (c: RGB) => `rgb(${c.r},${c.g},${c.b})`;
  const items: Item[] = [
    { shape: { t: 'poly', pts: [{ x: 1, y: 1 }, { x: 50, y: 20 }], w: 16 }, eye: 'AMBLYOPIC', k: 1 },
    { shape: { t: 'disc', x: 20, y: 20, r: 12 }, eye: 'FELLOW', k: 1, layer: 1 },
    { shape: { t: 'frame', x: 0, y: 0, w: 100, h: 100, lw: 10 }, eye: 'BOTH', k: 0.8, layer: 9 },
  ];
  it('Hintergrund = Profilhintergrund (ganze Fläche), nie fest codiert', () => {
    for (const palette of [RC, RG]) {
      const { g, log } = fakeCtx();
      renderItems(g, [], { ...base, palette }, { view: 'BINOCULAR' });
      expect(log[0]).toEqual({ op: 'fillRect', style: css(palette.background), comp: 'source-over' });
    }
  });
  it('Augenobjekte nur als Abweichung vom Hintergrund (difference/lighter), Rückmeldung grau', () => {
    const { g, log } = fakeCtx();
    renderItems(g, items, base, { view: 'BINOCULAR' });
    // BOTH-Rahmen: grau (R = G = B) und deckend
    const frame = log.find((l) => l.op === 'strokeRect');
    expect(frame).toBeDefined();
    const m = /rgb\((\d+),(\d+),(\d+)\)/.exec(frame!.style)!;
    expect(m[1]).toBe(m[2]);
    expect(m[2]).toBe(m[3]);
    expect(Number(m[1])).toBeLessThanOrEqual(NEUTRAL_LEVEL);
    expect(frame!.comp).toBe('source-over');
    // Augenobjekte nur mit difference/lighter, nie deckend
    const eyeOps = log.filter((l) => l.op === 'stroke' || l.op === 'fill').filter((l) => l.comp !== 'source-over');
    expect(eyeOps.length).toBeGreaterThan(0);
    for (const l of eyeOps) expect(['difference', 'lighter']).toContain(l.comp);
  });
  it('Objektfarben stammen aus dem Profil: amblyop rot, dominant Zweitfarbe, beide grau', () => {
    expect(itemColor(items[0], base)).toEqual(resolveColor('AMBLYOPIC', 1, base));
    expect(itemColor(items[0], { ...base, amblyopicContrast: 100 })).toEqual(RC.red);
    expect(itemColor({ ...items[1], k: 1 }, { ...base, fellowEyeContrast: 100 })).toEqual(RC.second);
    const grey = itemColor(items[2], base);
    expect(grey.r === grey.g && grey.g === grey.b).toBe(true);
  });
  it('Debug-Ansichten blenden die Klassen aus', () => {
    const count = (view: 'AMBLYOPIC_ONLY' | 'FELLOW_ONLY') => {
      const { g, log } = fakeCtx();
      renderItems(g, items, base, { view });
      return log.filter((l) => l.comp !== 'source-over').length;
    };
    expect(count('AMBLYOPIC_ONLY')).toBeGreaterThan(0);
    expect(count('FELLOW_ONLY')).toBeGreaterThan(0);
  });
  it('Zweitfarbe: Linien mindestens 4 px; Begrenzungsrahmen enthält die Form', () => {
    const b = shapeBounds({ t: 'disc', x: 10, y: 10, r: 5 });
    expect(b.x0).toBeLessThan(5);
    expect(b.x1).toBeGreaterThan(15);
    expect(isSecondColor('FELLOW', base)).toBe(true);
    expect(isSecondColor('AMBLYOPIC', base)).toBe(false);
  });
});
