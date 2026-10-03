/**
 * Rot-Grün-Lesen (Labor): reine Logik – Folgenerzeugung (Farbverteilung, Zeichenart, keine Wiederholung), Bewertung je Zeichen,
 * Auswertung nach Farbe und Auge (Schwelle ≥ 20 Zeichen je Farbe), Ablauf der Sitzung, Tipps, Einstellungen.
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import {
  colorPattern,
  DIGITS,
  eyeColors,
  keysFor,
  LETTERS,
  makeSequence,
  MIN_PER_COLOR,
  minPerColor,
  MIXED,
  PARAMS,
  pickChars,
  pointsFor,
  poolFor,
  rgParams,
  RgSession,
  scoreEntry,
  showMs,
  summarize,
  tipFor,
  toneCss,
  UNSURE,
  visualAngleDeg,
  type Cell,
  type ColorId,
  type RgParams,
  type RgTrial,
} from '../../src/exercises/labor-rot-gruen-lesen/logic';

const base = (over: Partial<RgParams> = {}): RgParams => rgParams({ ...defaultParams(PARAMS), ...over });

describe('Einstellungen', () => {
  it('Standardwerte laut Auftrag', () => {
    const p = base();
    expect(p).toEqual({ symbols: 'digits', length: 6, sizeCm: 1.2, mix: 'alternate', leftLens: 'red', showFor: 'unlimited', trials: 10, tones: 'redgreen', brightness: 100 });
  });

  it('Grenzen: Länge 4–12, Folgen 6–20, Helligkeit 80–100, Größe in cm; ungültige Werte werden bereinigt', () => {
    const num = (k: string) => PARAMS.find((d) => d.key === k) as { min: number; max: number };
    expect([num('length').min, num('length').max]).toEqual([4, 12]);
    expect([num('trials').min, num('trials').max]).toEqual([6, 20]);
    expect([num('brightness').min, num('brightness').max]).toEqual([80, 100]);
    const s = sanitizeParams(PARAMS, { length: 99, trials: 1, brightness: 10, symbols: 'x', showFor: '3', tones: 'blau', leftLens: 'gelb', mix: 'nix' });
    expect(s.length).toBe(12);
    expect(s.trials).toBe(6);
    expect(s.brightness).toBe(80);
    expect(s.symbols).toBe('digits');
    expect(s.showFor).toBe('unlimited');
    expect(s.tones).toBe('redgreen');
    expect(s.leftLens).toBe('red');
    expect(s.mix).toBe('alternate');
  });

  it('rgParams fällt bei fehlenden oder falschen Werten auf den Standard zurück', () => {
    expect(rgParams({})).toEqual(base());
    expect(rgParams({ length: 'viel', symbols: 7 } as never)).toEqual(base());
  });

  it('Anzeigedauer: unbegrenzt oder 8 / 4 / 2 s', () => {
    expect(showMs(base())).toBeNull();
    expect(showMs(base({ showFor: '8' }))).toBe(8000);
    expect(showMs(base({ showFor: '4' }))).toBe(4000);
    expect(showMs(base({ showFor: '2' }))).toBe(2000);
  });

  it('Variantenschlüssel: jede Einstellung gehört dazu (keine ist „neutral“)', () => {
    expect(PARAMS.every((d) => !d.neutral)).toBe(true);
    expect(PARAMS.filter((d) => d.summary).length).toBeGreaterThanOrEqual(2);
    expect(PARAMS.filter((d) => d.summary).length).toBeLessThanOrEqual(3);
  });
});

describe('Farben', () => {
  it('reines Rot, Grün und Cyan bei voller Helligkeit', () => {
    expect(toneCss('redgreen', 100)).toMatchObject({ a: 'rgb(255,0,0)', b: 'rgb(0,255,0)' });
    expect(toneCss('redcyan', 100)).toMatchObject({ a: 'rgb(255,0,0)', b: 'rgb(0,255,255)' });
  });

  it('Helligkeit skaliert die Farben, ohne die jeweils anderen Kanäle zu füllen', () => {
    expect(toneCss('redgreen', 80)).toMatchObject({ a: 'rgb(204,0,0)', b: 'rgb(0,204,0)' });
    expect(toneCss('redcyan', 90).b).toBe('rgb(0,230,230)');
    // Rahmen und Kreuz sind neutral grau: gleiche Anteile in allen Kanälen
    const n = toneCss('redgreen', 100).neutral.match(/\d+/g)!;
    expect(new Set(n).size).toBe(1);
  });

  it('Zuordnung der Farbe zum Auge: Rot-Glas links → linkes Auge sieht Rot', () => {
    expect(eyeColors('red')).toEqual({ left: 'a', right: 'b' });
    expect(eyeColors('green')).toEqual({ left: 'b', right: 'a' });
  });
});

describe('Folgenerzeugung', () => {
  it('Vorräte: Ziffern, Buchstaben ohne leicht Verwechselbare, gemischt; Tasten enden mit „?“', () => {
    expect(DIGITS.length).toBe(10);
    for (const bad of 'BCGIJOQSVWXY') expect(LETTERS).not.toContain(bad);
    for (const bad of '018Z') expect(MIXED).not.toContain(bad);
    expect(MIXED.some((c) => /\d/.test(c)) && MIXED.some((c) => /[A-Z]/.test(c))).toBe(true);
    expect(poolFor('digits')).toBe(DIGITS);
    expect(poolFor('letters')).toBe(LETTERS);
    expect(poolFor('mixed')).toBe(MIXED);
    for (const s of ['digits', 'letters', 'mixed'] as const) {
      const k = keysFor(s);
      expect(k[k.length - 1]).toBe(UNSURE);
      expect(k.length).toBe(poolFor(s).length + 1);
    }
  });

  it('abwechselnd: Farben wechseln sich ab, beide Farben kommen als Anfang vor', () => {
    const starts = new Set<ColorId>();
    for (let seed = 1; seed <= 40; seed++) {
      const rng = createRng(seed);
      for (let len = 4; len <= 12; len++) {
        const c = colorPattern(rng, len, 'alternate');
        expect(c.length).toBe(len);
        for (let i = 1; i < len; i++) expect(c[i]).not.toBe(c[i - 1]);
        if (len === 4) starts.add(c[0]);
      }
    }
    expect(starts.size).toBe(2);
  });

  it('zufällig gemischt: mindestens ein Drittel je Farbe, Längen 4–12', () => {
    for (let seed = 1; seed <= 60; seed++) {
      const rng = createRng(seed);
      for (let len = 4; len <= 12; len++) {
        const c = colorPattern(rng, len, 'random');
        const a = c.filter((x) => x === 'a').length;
        const b = len - a;
        expect(c.length).toBe(len);
        expect(a, `${len}:${a}/${b}`).toBeGreaterThanOrEqual(minPerColor(len));
        expect(b, `${len}:${a}/${b}`).toBeGreaterThanOrEqual(minPerColor(len));
        expect(a * 3).toBeGreaterThanOrEqual(len);
        expect(b * 3).toBeGreaterThanOrEqual(len);
      }
    }
  });

  it('zufällig gemischt: die Verteilung schwankt tatsächlich (nicht immer halbe-halbe)', () => {
    const rng = createRng(3);
    const counts = new Set<number>();
    for (let i = 0; i < 200; i++) counts.add(colorPattern(rng, 9, 'random').filter((x) => x === 'a').length);
    expect(counts.size).toBeGreaterThanOrEqual(3);
    expect(Math.min(...counts)).toBeGreaterThanOrEqual(3);
    expect(Math.max(...counts)).toBeLessThanOrEqual(6);
  });

  it('Zeichen: alle verschieden, solange der Vorrat reicht; sonst nie dasselbe Zeichen direkt hintereinander', () => {
    const rng = createRng(11);
    for (let i = 0; i < 100; i++) {
      const u = pickChars(rng, DIGITS, 10);
      expect(new Set(u).size).toBe(10);
      const long = pickChars(rng, DIGITS, 12);
      expect(long.length).toBe(12);
      for (let k = 1; k < long.length; k++) expect(long[k]).not.toBe(long[k - 1]);
    }
  });

  for (const symbols of ['digits', 'letters', 'mixed'] as const) {
    it(`Zeichenart ${symbols}: Länge und Vorrat wie eingestellt, nie dieselbe Folge zweimal hintereinander`, () => {
      const rng = createRng(5);
      let prev: string | null = null;
      for (let i = 0; i < 300; i++) {
        const len = 4 + (i % 9);
        const seq = makeSequence(rng, { symbols, length: len, mix: i % 2 ? 'random' : 'alternate' }, prev);
        expect(seq.length).toBe(len);
        const chars = seq.map((c) => c.ch);
        for (const ch of chars) expect(poolFor(symbols)).toContain(ch);
        const joined = chars.join('');
        expect(joined).not.toBe(prev);
        prev = joined;
      }
    });
  }

  it('Folgen enthalten bei jeder Länge beide Farben', () => {
    const rng = createRng(21);
    for (let i = 0; i < 200; i++) {
      const seq = makeSequence(rng, { symbols: 'digits', length: 4 + (i % 9), mix: i % 2 ? 'random' : 'alternate' }, null);
      expect(new Set(seq.map((c) => c.color)).size).toBe(2);
    }
  });
});

describe('Bewertung je Zeichen', () => {
  const target: Cell[] = [
    { ch: '1', color: 'a' },
    { ch: '2', color: 'b' },
    { ch: '3', color: 'a' },
    { ch: '4', color: 'b' },
  ];

  it('richtig, verwechselt, fehlend („?“ oder nicht eingegeben)', () => {
    expect(scoreEntry(target, ['1', '2', '3', '4'])).toEqual(['ok', 'ok', 'ok', 'ok']);
    expect(scoreEntry(target, ['1', '9', '?', '4'])).toEqual(['ok', 'wrong', 'missing', 'ok']);
    expect(scoreEntry(target, ['1', '2'])).toEqual(['ok', 'ok', 'missing', 'missing']);
    expect(scoreEntry(target, [])).toEqual(['missing', 'missing', 'missing', 'missing']);
  });

  it('Reihenfolge zählt: richtige Zeichen an falscher Stelle sind verwechselt', () => {
    expect(scoreEntry(target, ['2', '1', '4', '3'])).toEqual(['wrong', 'wrong', 'wrong', 'wrong']);
  });
});

/** Gewertete Folge aus Farbmuster und Marken bauen (für die Auswertung) */
function trial(colors: string, marks: Array<'ok' | 'wrong' | 'missing'>, entryMs = 5000): RgTrial {
  return {
    nr: 1,
    chars: '0'.repeat(colors.length),
    colors,
    answer: marks.map((m) => (m === 'ok' ? '0' : m === 'missing' ? UNSURE : '9')),
    marks,
    correct: marks.every((m) => m === 'ok'),
    symbolsOk: marks.filter((m) => m === 'ok').length,
    entryMs,
  };
}

describe('Auswertung nach Farbe und Auge', () => {
  it('leer: keine NaN, keine Aussage', () => {
    const s = summarize([], 'red');
    expect(s.n).toBe(0);
    expect(s.accuracy).toBeNull();
    expect(s.symbolAccuracy).toBeNull();
    expect(s.entryMean).toBeNull();
    expect(s.errA).toBeNull();
    expect(s.errB).toBeNull();
    expect(s.enough).toBe(false);
    expect(s.hint).toBe('none');
    expect(s.moreOftenEye).toBeNull();
    expect(tipFor(s)).toBe('few');
  });

  it('zählt fehlende und verwechselte Zeichen je Farbe', () => {
    const t = [
      trial('abab', ['ok', 'missing', 'ok', 'wrong']),
      trial('baba', ['missing', 'ok', 'wrong', 'ok']),
    ];
    const s = summarize(t, 'red');
    expect(s.n).toBe(2);
    expect(s.correct).toBe(0);
    expect(s.accuracy).toBe(0);
    expect(s.symbolsTotal).toBe(8);
    expect(s.symbolsOk).toBe(4);
    expect(s.symbolAccuracy).toBe(50);
    // Rot (a): Folge 1 Plätze 0 und 2 (ok, ok); Folge 2 Plätze 1 und 3 (ok, ok) → keine Fehler
    expect(s.byColor.a).toEqual({ shown: 4, ok: 4, missing: 0, wrong: 0 });
    // zweite Farbe (b): Folge 1 Plätze 1 und 3 (missing, wrong); Folge 2 Plätze 0 und 2 (missing, wrong)
    expect(s.byColor.b).toEqual({ shown: 4, ok: 0, missing: 2, wrong: 2 });
    expect(s.errA).toBe(0);
    expect(s.errB).toBe(100);
    expect(s.entryMean).toBe(5000);
  });

  it('Schwelle: Farbvergleich erst ab 20 Zeichen je Farbe', () => {
    expect(MIN_PER_COLOR).toBe(20);
    // 19 Zeichen je Farbe → keine Aussage, auch bei großem Unterschied
    const few = Array.from({ length: 19 }, () => trial('ab', ['missing', 'ok']));
    const sFew = summarize(few, 'red');
    expect(sFew.byColor.a.shown).toBe(19);
    expect(sFew.enough).toBe(false);
    expect(sFew.hint).toBe('none');
    expect(sFew.oneColorGone).toBeNull();
    expect(sFew.moreOftenEye).toBeNull();
    expect(tipFor(sFew)).toBe('notEnough');
    // 20 Zeichen je Farbe → Aussage
    const enough = Array.from({ length: 20 }, () => trial('ab', ['missing', 'ok']));
    const sEnough = summarize(enough, 'red');
    expect(sEnough.enough).toBe(true);
    expect(sEnough.hint).toBe('a');
    // eine Farbe fehlt, die andere ist ok: genug Zeichen nur auf einer Seite zählt nicht
    const oneSide = Array.from({ length: 30 }, () => trial('aaa', ['ok', 'ok', 'ok']));
    expect(summarize(oneSide, 'red').enough).toBe(false);
  });

  it('Hinweis „öfter fehlend“: erst ab 10 Prozentpunkten Unterschied, sonst „gleich“', () => {
    // 20 Zeichen je Farbe; Rot 2 von 20 falsch (10 %), zweite Farbe 0 von 20 → Unterschied 10 Punkte → Hinweis
    const mk = (errA: number, errB: number): RgTrial[] => {
      const t: RgTrial[] = [];
      for (let i = 0; i < 20; i++) t.push(trial('ab', [i < errA ? 'wrong' : 'ok', i < errB ? 'wrong' : 'ok']));
      return t;
    };
    expect(summarize(mk(2, 0), 'red').hint).toBe('a');
    expect(summarize(mk(0, 2), 'red').hint).toBe('b');
    expect(summarize(mk(1, 0), 'red').hint).toBe('even');
    expect(summarize(mk(5, 5), 'red').hint).toBe('even');
    expect(summarize(mk(5, 5), 'red').moreOftenEye).toBeNull();
  });

  it('nach Auge: Rot-Glas links → Rot läuft über das linke Auge; Grün-Glas links → umgekehrt', () => {
    const t = Array.from({ length: 20 }, () => trial('ab', ['missing', 'ok'])); // Rot fehlt immer
    const red = summarize(t, 'red');
    expect(red.byEye.left.color).toBe('a');
    expect(red.byEye.left.missing).toBe(20);
    expect(red.byEye.right.ok).toBe(20);
    expect(red.moreOftenEye).toBe('left');
    const green = summarize(t, 'green');
    expect(green.byEye.left.color).toBe('b');
    expect(green.byEye.left.ok).toBe(20);
    expect(green.byEye.right.missing).toBe(20);
    expect(green.moreOftenEye).toBe('right');
  });

  it('eine Farbe fast immer vollständig weg → Tipp „oneColor“ (abklären lassen); gemischte Fehler nicht', () => {
    const gone = Array.from({ length: 20 }, () => trial('ab', ['ok', 'missing']));
    const s = summarize(gone, 'red');
    expect(s.oneColorGone).toBe('b');
    expect(tipFor(s)).toBe('oneColor');
    // Verwechslungen (falsches Zeichen) zählen nicht als „fehlt vollständig“
    const wrong = Array.from({ length: 20 }, () => trial('ab', ['ok', 'wrong']));
    expect(summarize(wrong, 'red').oneColorGone).toBeNull();
    // beide Farben fehlen fast immer → keine „eine Farbe“-Aussage (z. B. Brille falsch herum)
    const both = Array.from({ length: 20 }, () => trial('ab', ['missing', 'missing']));
    expect(summarize(both, 'red').oneColorGone).toBeNull();
  });

  it('Tipps: wenige richtig, Farbhinweis, leichter, schwerer, vergleichen', () => {
    const rows = (n: number, marks: Array<'ok' | 'wrong' | 'missing'>, colors = 'abab') => Array.from({ length: n }, () => trial(colors, marks));
    expect(tipFor(summarize(rows(5, ['wrong', 'wrong', 'wrong', 'wrong']), 'red'))).toBe('few');
    // genug Zeichen (10 Folgen × 6), alle ganz richtig → schwerer
    expect(tipFor(summarize(rows(10, ['ok', 'ok', 'ok', 'ok', 'ok', 'ok'], 'ababab'), 'red'))).toBe('harder');
    const ok6 = ['ok', 'ok', 'ok', 'ok', 'ok', 'ok'] as const;
    const bad6 = ['wrong', 'wrong', 'ok', 'ok', 'ok', 'ok'] as const; // je Farbe gleich viele Fehler
    const mixed = (good: number, total: number) => [...rows(good, [...ok6], 'ababab'), ...rows(total - good, [...bad6], 'ababab')];
    // 60 % ganz richtig, Farben gleich → vergleichen; 40 % → leichter
    expect(tipFor(summarize(mixed(6, 10), 'red'))).toBe('compare');
    expect(tipFor(summarize(mixed(4, 10), 'red'))).toBe('easier');
    // Farbunterschied
    expect(tipFor(summarize(rows(10, ['wrong', 'ok', 'wrong', 'ok', 'wrong', 'ok'], 'ababab'), 'red'))).toBe('colorMore');
  });
});

describe('Sitzung', () => {
  const session = (over: Partial<RgParams> = {}, seed = 1) => new RgSession(base({ trials: 6, ...over }), { rng: createRng(seed) });

  it('unbegrenzt: nach der Vorlaufzeit sofort Eingabe, Folge dabei sichtbar', () => {
    const s = session();
    s.start(0);
    expect(s.phase).toBe('lead');
    expect(s.visible).toBe(false);
    expect(s.canEnter).toBe(false);
    s.update(500);
    expect(s.phase).toBe('lead');
    s.update(900);
    expect(s.phase).toBe('input');
    expect(s.visible).toBe(true);
    expect(s.canEnter).toBe(true);
  });

  it('begrenzt: erst Anzeige ohne Eingabe, dann ausgeblendet mit Eingabe', () => {
    const s = session({ showFor: '2' });
    s.start(0);
    s.update(900);
    expect(s.phase).toBe('show');
    expect(s.visible).toBe(true);
    expect(s.canEnter).toBe(false);
    expect(s.press('1')).toBe(false);
    s.update(900 + 1999);
    expect(s.phase).toBe('show');
    s.update(900 + 2000);
    expect(s.phase).toBe('input');
    expect(s.visible).toBe(false);
    expect(s.canEnter).toBe(true);
  });

  it('Eingabe: Tasten, „?“, Löschen, Maximum, „Fertig“ erst nach dem ersten Zeichen; Eingabezeit ab Eingabebeginn', () => {
    const s = session({ length: 4 });
    s.start(0);
    s.update(900);
    expect(s.canSubmit).toBe(false);
    expect(s.submit(1000)).toBeNull();
    const t = s.target.map((c) => c.ch);
    expect(s.press('X')).toBe(false); // nicht im Vorrat
    expect(s.press(t[0])).toBe(true);
    expect(s.press(UNSURE)).toBe(true);
    expect(s.back()).toBe(true);
    expect(s.entry).toEqual([t[0]]);
    expect(s.press(t[1])).toBe(true);
    expect(s.press(t[2])).toBe(true);
    expect(s.press(t[3])).toBe(true);
    expect(s.press(t[3])).toBe(false); // voll
    expect(s.canSubmit).toBe(true);
    const tr = s.submit(900 + 4200)!;
    expect(tr.correct).toBe(true);
    expect(tr.entryMs).toBe(4200);
    expect(tr.symbolsOk).toBe(4);
    expect(s.phase).toBe('feedback');
    expect(s.visible).toBe(true);
    expect(s.canEnter).toBe(false);
    expect(s.press(t[0])).toBe(false);
    expect(s.submit(9999)).toBeNull();
  });

  it('kürzere Eingabe wird mit „?“ aufgefüllt und zählt als fehlend; Farben der Folge bleiben erhalten', () => {
    const s = session({ length: 5, mix: 'random' });
    s.start(0);
    s.update(900);
    s.press(s.target[0].ch);
    const tr = s.submit(2000)!;
    expect(tr.answer.length).toBe(5);
    expect(tr.answer.slice(1)).toEqual([UNSURE, UNSURE, UNSURE, UNSURE]);
    expect(tr.marks).toEqual(['ok', 'missing', 'missing', 'missing', 'missing']);
    expect(tr.correct).toBe(false);
    expect(tr.colors).toBe(s.target.map((c) => c.color).join(''));
  });

  it('läuft über alle Folgen, endet mit finished, keine gleiche Folge hintereinander, Zeit nur über übergebene Zeit', () => {
    const s = new RgSession(base({ trials: 8, length: 4 }), { rng: createRng(9) });
    s.start(0);
    let now = 0;
    let guard = 0;
    while (!s.finished && guard++ < 2000) {
      now += 100;
      s.update(now);
      if (s.phase === 'input') {
        for (const c of s.target) s.press(c.ch);
        s.submit(now);
      }
    }
    expect(s.finished).toBe(true);
    expect(s.phase).toBe('done');
    expect(s.trials.length).toBe(8);
    for (let i = 1; i < s.trials.length; i++) expect(s.trials[i].chars).not.toBe(s.trials[i - 1].chars);
    const sum = s.summary();
    expect(sum.accuracy).toBe(100);
    expect(sum.symbolAccuracy).toBe(100);
    expect(sum.byColor.a.shown + sum.byColor.b.shown).toBe(32);
    expect(Number.isFinite(sum.entryMean!)).toBe(true);
  });

  it('Rückmeldung dauert FEEDBACK_MS, danach beginnt die nächste Folge', () => {
    const s = session();
    s.start(0);
    s.update(900);
    s.press(s.target[0].ch);
    s.submit(1000);
    s.update(1000 + 1499);
    expect(s.phase).toBe('feedback');
    s.update(1000 + 1500);
    expect(s.phase).toBe('lead');
    expect(s.idx).toBe(1);
    expect(s.entry).toEqual([]);
  });

  it('Punkte: 10 je ganz richtiger Folge', () => {
    expect(pointsFor(0)).toBe(0);
    expect(pointsFor(7)).toBe(70);
    expect(pointsFor(-3)).toBe(0);
  });
});

describe('Sehwinkel', () => {
  it('1,2 cm bei 40 cm sind etwa 1,7 Grad; wächst mit der Größe, sinkt mit dem Abstand', () => {
    expect(visualAngleDeg(1.2, 40)).toBeCloseTo(1.718, 2);
    expect(visualAngleDeg(2.4, 40)).toBeGreaterThan(visualAngleDeg(1.2, 40));
    expect(visualAngleDeg(1.2, 80)).toBeLessThan(visualAngleDeg(1.2, 40));
  });
});
