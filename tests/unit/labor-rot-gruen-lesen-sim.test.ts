/**
 * Rot-Grün-Lesen (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche)
 * sowie Prüfung der Anordnung, der Texte (DE/IT gleiche Schlüssel, Sicherheitshinweise, Rechtsregeln), der Quellen und
 * der Registrierung.
 */
import { describe, expect, it } from 'vitest';
import { laborRotGruenLesen } from '../../src/exercises/labor-rot-gruen-lesen';
import { MIN_KEY_PX, rgLayout } from '../../src/exercises/labor-rot-gruen-lesen/layout';
import { keysFor, PARAMS, PITCH, QUICK_TRIALS, UNSURE } from '../../src/exercises/labor-rot-gruen-lesen/logic';
import { science } from '../../src/exercises/labor-rot-gruen-lesen/science';
import { de, it as itTexts } from '../../src/exercises/labor-rot-gruen-lesen/texts';
import { getExercise, EXERCISES } from '../../src/exercises/registry';
import { SCIENCE } from '../../src/content/science';
import { leaves, legalProblems, simulate as sim, type SimOpts } from './_labor-sim';

const simulate = (o: SimOpts = {}) => sim(laborRotGruenLesen, o);

const METRIC_KEYS = ['accuracy', 'correct', 'symbol_accuracy', 'err_red', 'err_second', 'err_left', 'err_right', 'entry_mean', 'chars', 'size', 'shown'];

describe('Definition und Registrierung', () => {
  it('Kennung, Kategorie, Marke labor, Kalibrierung, keine Stufen, Einstellungen, ≈ 2 Minuten', () => {
    expect(laborRotGruenLesen.id).toBe('labor-rot-gruen-lesen');
    expect(laborRotGruenLesen.category).toBe('wahrnehmung');
    expect(laborRotGruenLesen.tags).toEqual(['labor']);
    expect(laborRotGruenLesen.usesCalibration).toBe(true);
    expect(laborRotGruenLesen.showsLevel).toBe(false);
    expect(laborRotGruenLesen.params).toBe(PARAMS);
    expect(laborRotGruenLesen.minutes).toBe(2);
    expect(laborRotGruenLesen.icon.length).toBeGreaterThan(20);
    expect(laborRotGruenLesen.colorCheck).toBeTypeOf('function');
    // kein Blitz-/Flackerhinweis nötig: ruhige Anzeige ohne schnelle Wechsel
    expect(laborRotGruenLesen.warning).toBeUndefined();
  });

  it('steht am Ende der Labor-Gruppe in der Registry und hat einen Hintergrundtext', () => {
    expect(getExercise('labor-rot-gruen-lesen')).toBe(laborRotGruenLesen);
    expect(EXERCISES[EXERCISES.length - 1].id).toBe('labor-rot-gruen-lesen');
    expect(SCIENCE['labor-rot-gruen-lesen']).toBe(science);
  });

  it('Prüfbild: zwei Flächen in den eingestellten Farben, beschriftet, ohne Wertung', () => {
    const info = laborRotGruenLesen.colorCheck!({ tones: 'redgreen', brightness: 100 }, de);
    expect(info.panels.map((p) => p.color)).toEqual(['rgb(255,0,0)', 'rgb(0,255,0)']);
    expect(info.panels.map((p) => p.label)).toEqual(['Rot', 'Grün']);
    expect(info.text).toMatch(/roten Glas vor dem Auge sollte die grüne/);
    expect(info.text).toMatch(/Helligkeit und Brille prüfen/);
    const cy = laborRotGruenLesen.colorCheck!({ tones: 'redcyan', brightness: 80 }, itTexts);
    expect(cy.panels.map((p) => p.color)).toEqual(['rgb(204,0,0)', 'rgb(0,204,204)']);
    expect(cy.panels[1].label).toBe('Ciano');
    expect(JSON.stringify(info)).not.toMatch(/Test|Befund:|Diagnose/);
  });
});

describe('Anordnung', () => {
  const inputs = (w: number, h: number, over: Partial<Parameters<typeof rgLayout>[0]> = {}) => ({
    w,
    h,
    u: Math.min(w, h) / 100,
    captionReserve: 0,
    demo: false,
    wantGlyphPx: 1.2 * 38,
    length: 6,
    keyCount: keysFor('digits').length,
    ...over,
  });

  for (const [name, w, h] of [
    ['Tablet quer', 1180, 820],
    ['Tablet hoch', 820, 1180],
    ['Handy', 390, 844],
  ] as const) {
    for (const symbols of ['digits', 'letters', 'mixed'] as const) {
      for (const length of [4, 6, 12]) {
        it(`${name}, ${symbols}, ${length} Zeichen: alles auf der Bühne, Tasten ≥ 56 px, nichts überlappt`, () => {
          const keyCount = keysFor(symbols).length;
          const L = rgLayout(inputs(w, h, { keyCount, length, wantGlyphPx: 4 * 38 }));
          expect(L.keys.length).toBe(keyCount);
          for (const r of [...L.keys, L.back, L.done]) {
            expect(r.x).toBeGreaterThanOrEqual(-0.01);
            expect(r.y).toBeGreaterThanOrEqual(0);
            expect(r.x + r.w).toBeLessThanOrEqual(w + 0.01);
            expect(r.y + r.h).toBeLessThanOrEqual(h + 0.01);
            expect(r.h).toBeGreaterThanOrEqual(MIN_KEY_PX - 0.01);
            expect(r.w).toBeGreaterThanOrEqual(MIN_KEY_PX - 0.5);
          }
          const rects = [...L.keys, L.back, L.done];
          for (let a = 0; a < rects.length; a++) {
            for (let b = a + 1; b < rects.length; b++) {
              const p = rects[a];
              const q = rects[b];
              const overlap = p.x < q.x + q.w - 0.01 && q.x < p.x + p.w - 0.01 && p.y < q.y + q.h - 0.01 && q.y < p.y + p.h - 0.01;
              expect(overlap, `${a}/${b}`).toBe(false);
            }
          }
          // Löschen/Fertig über dem Tastenfeld; Eingabefeld darüber; Rahmen mit Folge ganz oben
          const keysTop = Math.min(...L.keys.map((k) => k.y));
          expect(L.back.y + L.back.h).toBeLessThanOrEqual(keysTop + 0.01);
          expect(L.entryY + L.entrySize * 0.62).toBeLessThanOrEqual(L.back.y + 0.01);
          expect(L.frame.y + L.frame.h).toBeLessThanOrEqual(L.entryY - L.entrySize);
          // Rahmen passt in die Breite und auf die Bühne, jedes Zeichen liegt im Rahmen
          expect(L.frame.x).toBeGreaterThanOrEqual(-0.01);
          expect(L.frame.x + L.frame.w).toBeLessThanOrEqual(w + 0.01);
          expect(L.frame.y).toBeGreaterThanOrEqual(0);
          expect(L.chars.length).toBe(length);
          for (const c of L.chars) {
            expect(c.x - L.glyph / 2).toBeGreaterThanOrEqual(L.frame.x);
            expect(c.x + L.glyph / 2).toBeLessThanOrEqual(L.frame.x + L.frame.w);
            expect(c.y - L.glyph / 2).toBeGreaterThanOrEqual(L.frame.y);
            expect(c.y + L.glyph / 2 + L.glyph * 0.3).toBeLessThanOrEqual(L.frame.y + L.frame.h);
          }
          // Eingabefeld: alle Plätze auf der Bühne
          expect(length * PITCH * L.entrySize).toBeLessThanOrEqual(w * 0.95);
          // Kreuz im Rahmen oben
          expect(L.crossY).toBeGreaterThan(L.frame.y);
          expect(L.crossY).toBeLessThan(L.chars[0].y - L.glyph / 2);
        });
      }
    }
  }

  it('Zeichengröße folgt der Einstellung, wird aber auf der Bühne begrenzt; lange Folgen brechen um', () => {
    const small = rgLayout(inputs(1180, 820, { length: 6, wantGlyphPx: 1.2 * 38 }));
    expect(small.glyph).toBeCloseTo(1.2 * 38, 6);
    expect(small.rows).toBe(1);
    const big = rgLayout(inputs(390, 844, { length: 12, wantGlyphPx: 4 * 38 }));
    expect(big.glyph).toBeLessThan(4 * 38);
    expect(big.rows).toBeGreaterThan(1);
    const phone = rgLayout(inputs(390, 844, { length: 12, wantGlyphPx: 1.2 * 38 }));
    expect(phone.rows).toBeGreaterThan(1);
  });

  it('Film: kleine Bühne mit Platz für die Bildunterschrift, Tasten dürfen schrumpfen', () => {
    const L = rgLayout(inputs(520, 358, { demo: true, captionReserve: 60, length: 4, wantGlyphPx: 40 }));
    for (const r of [...L.keys, L.back, L.done]) {
      expect(r.y + r.h).toBeLessThanOrEqual(358 - 60 + 0.01);
      expect(r.w).toBeGreaterThan(20);
    }
    expect(L.frame.y).toBeGreaterThanOrEqual(0);
    expect(L.frame.h).toBeGreaterThan(40);
  });
});

describe('Intro-Film (Demo)', () => {
  for (const [name, w, h] of [
    ['16:11', 1040, 715],
    ['Hochformat', 360, 640],
    ['klein', 520, 358],
  ] as const) {
    it(`${name}: endet nach 8–14 s mit ctx.finish, Hand tippt die Folge ein, Bildunterschriften ≤ 42 Zeichen`, () => {
      const s = simulate({ mode: 'demo', w, h, maxSeconds: 40 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeGreaterThanOrEqual(8);
      expect(s.seconds).toBeLessThanOrEqual(14.2);
      expect(s.ghostTaps).toBe(10); // zweimal vier Zeichen und „Fertig“
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      for (const k of ['look', 'read', 'enter', 'unsure', 'done']) expect(s.captions, k).toContain(de.captions[k]);
      // erste Folge ganz richtig, in der zweiten ist ein Zeichen „nicht gesehen“
      expect(s.result!.primary.value).toBe(50);
      expect(s.sounds).toEqual([]); // der Film ist stumm
    });
  }

  it('Die Hand trifft Tasten (Mitte der Tasten, auf der Bühne)', () => {
    const s = simulate({ mode: 'demo', w: 1040, h: 715, maxSeconds: 40 });
    for (const p of s.ghost.tapPoints) {
      expect(p.x).toBeGreaterThan(0);
      expect(p.x).toBeLessThan(1040);
      expect(p.y).toBeGreaterThan(300);
    }
  });

  it('ist mit gleichem Startwert reproduzierbar; Einstellungen des Nutzers ändern den Film nicht', () => {
    const a = simulate({ mode: 'demo', seed: 3 });
    const b = simulate({ mode: 'demo', seed: 3 });
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
    const c = simulate({ mode: 'demo', seed: 3, params: { sizeCm: 4, length: 12, symbols: 'letters', showFor: '2', trials: 20, tones: 'redcyan', brightness: 80 } });
    expect(JSON.stringify(c.result)).toBe(JSON.stringify(a.result));
    expect(c.seconds).toBeCloseTo(a.seconds, 6);
  });
});

describe('Autoplay im Spielmodus', () => {
  it('?quick=1: endet nach wenigen Folgen mit einem vollständigen Ergebnis', () => {
    const s = simulate({ quick: true, maxSeconds: 80 });
    expect(s.result).not.toBeNull();
    expect(s.seconds).toBeLessThanOrEqual(40);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'accuracy', unit: 'percent', better: 'higher' });
    expect(r.primary.value).toBeGreaterThanOrEqual(0);
    expect(r.primary.value).toBeLessThanOrEqual(100);
    expect(r.level).toBe(1);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['symbol_accuracy', 'entry_mean']));
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(r.details?.length).toBeGreaterThanOrEqual(2);
    expect(r.details![0].title).toBe(de.feedback.colorTitle);
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.sounds[s.sounds.length - 1]).toBe('done');
    expect(QUICK_TRIALS).toBe(2);
    expect(s.labels).toContain('1 / 2');
    expect(s.labels).toContain('2 / 2');
    expect(s.ghostTaps).toBeGreaterThanOrEqual(2 * (6 + 1));
  });

  it('volle Länge (10 Folgen, 6 Zeichen): Farbvergleich und Auswertung nach Auge sind vorhanden', () => {
    const s = simulate({ maxSeconds: 400, seed: 4 });
    const r = s.result!;
    expect(r).not.toBeNull();
    expect(s.labels).toContain('10 / 10');
    expect(r.secondary.map((m) => m.key)).toEqual(['symbol_accuracy', 'err_red', 'err_second', 'entry_mean']);
    for (const m of r.secondary) expect(Number.isFinite(m.value), m.key).toBe(true);
    expect(r.details!.map((d) => d.title)).toEqual([de.feedback.colorTitle, de.feedback.eyeTitle, de.feedback.moreTitle]);
    const eye = r.details![1];
    expect(eye.rows[0].label).toBe('Linkes Auge (rot)');
    expect(eye.rows[1].label).toBe('Rechtes Auge (grün)');
    expect(eye.note).toMatch(/kein Befund/);
    // Zeichen je Farbe: 10 × 6 = 60, je 30
    const colors = r.details![0].rows;
    expect(colors[0].value).toMatch(/ von 30$/);
    expect(colors[1].value).toMatch(/ von 30$/);
    expect(r.score % 10).toBe(0);
  });

  it('Linkes Glas Grün (Rot-Cyan-Töne): Beschriftung der Zeilen folgt den Einstellungen', () => {
    const s = simulate({ maxSeconds: 400, seed: 4, params: { leftLens: 'green', tones: 'redcyan' } });
    const eye = s.result!.details![1];
    expect(eye.rows[0].label).toBe('Linkes Auge (cyan)');
    expect(eye.rows[1].label).toBe('Rechtes Auge (rot)');
    expect(s.result!.details![0].rows[1].label).toBe('Cyan');
  });

  it('zu wenige Zeichen je Farbe: kein Farb- und Augenvergleich, dafür Hinweis auf die Mindestzahl', () => {
    const s = simulate({ maxSeconds: 400, seed: 4, params: { length: 4, trials: 6 } });
    const r = s.result!;
    expect(r.secondary.map((m) => m.key)).toEqual(['symbol_accuracy', 'correct', 'entry_mean']);
    expect(r.details!.map((d) => d.title)).toEqual([de.feedback.colorTitle, de.feedback.moreTitle]);
    expect(r.details![0].note).toMatch(/mindestens 20 Zeichen je Farbe/);
  });

  it('läuft mit allen Einstellungs-Varianten sauber durch (keine NaN, Tipp vorhanden)', () => {
    for (const p of [
      { symbols: 'letters', length: 12 },
      { symbols: 'mixed', length: 8, mix: 'random' },
      { length: 4, sizeCm: 0.6 },
      { sizeCm: 4, length: 12 },
      { showFor: '8' },
      { showFor: '4', mix: 'random' },
      { showFor: '2', symbols: 'letters' },
      { tones: 'redcyan', brightness: 80 },
      { leftLens: 'green' },
      { trials: 6 },
    ]) {
      const s = simulate({ quick: true, params: p, maxSeconds: 200, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
      for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
      for (const d of s.result!.details ?? []) for (const row of d.rows) expect(`${row.label} ${row.value} ${row.text ?? ''}`).not.toMatch(/NaN|undefined|\{/);
      expect(de.tips[s.result!.tip ?? 'compare']).toBeTruthy();
    }
  });

  it('begrenzte Anzeige: Eingabe erst nach der Anzeigedauer, danach ist die Folge ausgeblendet', () => {
    const rec: Array<{ t: number; texts: string[] }> = [];
    let tappedEarly = 0;
    const s = simulate({
      quick: true,
      autoplay: false,
      recordText: true,
      params: { showFor: '2', length: 4 },
      maxSeconds: 8,
      onFrame: (ex, now) => {
        // in der Anzeigephase (0,5 s Vorlauf + 0,9 s Lead + 2 s Anzeige) wild tippen: ohne Wirkung
        if (now > 1500 && now < 3300 && Math.round(now) % 100 === 0) {
          ex.pointerDown?.({ id: 1, x: 100, y: 780, t: now, type: 'touch' });
          tappedEarly++;
        }
        rec.push({ t: now, texts: [] });
      },
    });
    expect(tappedEarly).toBeGreaterThan(0);
    expect(s.result).toBeNull(); // niemand hat „Fertig“ gedrückt
    expect(s.sounds).not.toContain('tap');
  });

  it('Handy hochkant und Tablet: läuft sauber durch, Tipps der Hand liegen auf der Bühne', () => {
    for (const [w, h] of [
      [390, 700],
      [820, 1180],
      [1180, 820],
    ] as const) {
      const s = simulate({ quick: true, w, h, params: { symbols: 'mixed', length: 9 }, maxSeconds: 120 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
      for (const p of s.ghost.tapPoints) {
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.x).toBeLessThanOrEqual(w);
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeLessThanOrEqual(h);
      }
    }
  });

  it('Drehen des Tablets mitten im Lauf: kein Fehler, Lauf endet, Hand plant neu', () => {
    for (const at of [2500, 3300, 4100]) {
      const s = simulate({ quick: true, w: 1180, h: 820, resizeAt: { t: at, w: 820, h: 1180 }, maxSeconds: 120 });
      expect(s.result, `Drehen bei ${at}`).not.toBeNull();
    }
  });

  it('reduzierte Bewegung und ältere Attrappen-Kontexte ohne params/calib laufen ebenfalls', () => {
    expect(simulate({ quick: true, reducedMotion: true, maxSeconds: 120 }).result).not.toBeNull();
    expect(simulate({ quick: true, noCtxParams: true, maxSeconds: 120 }).result).not.toBeNull();
  });

  it('Italienisch: Ergebnis und Texte vorhanden', () => {
    const s = simulate({ quick: true, lang: 'it', maxSeconds: 120 });
    expect(s.result).not.toBeNull();
    expect(s.toasts.every((t) => !/undefined/.test(t))).toBe(true);
    expect(s.labels.every((t) => !/undefined|\{/.test(t))).toBe(true);
    for (const d of s.result!.details ?? []) {
      expect(d.title).toBeTruthy();
      for (const row of d.rows) expect(`${row.label} ${row.value}`).not.toMatch(/undefined|\{/);
    }
  });

  it('Zeichnen: Folge, Tasten, Löschen und Fertig werden beschriftet, „?“ ist eine Taste', () => {
    const s = simulate({ quick: true, recordText: true, maxSeconds: 120 });
    for (const d of '0123456789') expect(s.texts).toContain(d);
    expect(s.texts).toContain(UNSURE);
    expect(s.texts).toContain(de.feedback.erase);
    expect(s.texts).toContain(de.feedback.done);
  });
});

describe('Zeichnen: Farben', () => {
  it('Folge in reinem Rot und reinem Grün, Bedienung und Eingabe in neutralem Hell (ohne Farbträger)', () => {
    const s = simulate({ quick: true, recordText: true, maxSeconds: 120, seed: 2 });
    const digits = s.textFills.filter((x) => /^\d$/.test(x.s));
    const fills = new Set(digits.map((x) => x.fill));
    expect(fills.has('rgb(255,0,0)')).toBe(true);
    expect(fills.has('rgb(0,255,0)')).toBe(true);
    // Tastenbeschriftungen („?“, Löschen, Fertig) nie in Rot oder Grün
    for (const label of [UNSURE, de.feedback.erase, de.feedback.done]) {
      const f = s.textFills.filter((x) => x.s === label).map((x) => x.fill);
      expect(f.length).toBeGreaterThan(0);
      for (const c of f) expect(c).not.toMatch(/^rgb\((255,0,0|0,255,0)\)$/);
    }
  });

  it('Rot und Cyan mit 80 % Helligkeit: die Folge nutzt genau diese Farben', () => {
    const s = simulate({ quick: true, recordText: true, maxSeconds: 120, seed: 2, params: { tones: 'redcyan', brightness: 80 } });
    const fills = new Set(s.textFills.filter((x) => /^\d$/.test(x.s)).map((x) => x.fill));
    expect(fills.has('rgb(204,0,0)')).toBe(true);
    expect(fills.has('rgb(0,204,204)')).toBe(true);
  });
});

describe('Tastatur', () => {
  it('Ziffern, Rücktaste, „?“ und Enter wirken in der Eingabephase', () => {
    let exRef: { session: { target: Array<{ ch: string }>; entry: string[]; trials: Array<{ correct: boolean; answer: string[] }> } } | null = null;
    const s = simulate({
      autoplay: false,
      params: { length: 4, trials: 6 },
      maxSeconds: 30,
      onFrame: (ex, now) => {
        const x = ex as unknown as NonNullable<typeof exRef>;
        exRef = x;
        const ss = x.session;
        if (ss.trials.length >= 2) return;
        // sobald die Eingabe offen ist (nach ≈ 1,4 s je Folge), nach Plan tippen
        const phase = (ex as unknown as { session: { phase: string } }).session.phase;
        if (phase !== 'input' || ss.entry.length > 0) return;
        const t = ss.target.map((c) => c.ch);
        if (ss.trials.length === 0) {
          // 1. Folge: falsches Zeichen, löschen, richtig eingeben
          ex.keyDown?.('Backspace', now); // ohne Eingabe: ohne Wirkung
          ex.keyDown?.(t[0] === '5' ? '6' : '5', now);
          ex.keyDown?.('Backspace', now);
          for (const c of t) ex.keyDown?.(c, now);
          ex.keyDown?.('Enter', now);
        } else {
          // 2. Folge: zweites Zeichen „nicht gesehen“
          ex.keyDown?.(t[0], now);
          ex.keyDown?.('?', now);
          ex.keyDown?.(t[2], now);
          ex.keyDown?.(t[3], now);
          ex.keyDown?.('Enter', now);
        }
      },
    });
    expect(exRef).not.toBeNull();
    expect(s.result).toBeNull(); // nach zwei Folgen weiter wartend: das Spiel hat 6 Folgen
    const ss = exRef!.session;
    expect(ss.trials.length).toBeGreaterThanOrEqual(2);
    expect(ss.trials[0].correct).toBe(true);
    expect(ss.trials[1].correct).toBe(false);
    expect(ss.trials[1].answer[1]).toBe(UNSURE);
  });

  it('Buchstaben (Klein- und Großschreibung) werden bei Buchstaben-Folgen angenommen', () => {
    let result: boolean | null = null;
    simulate({
      quick: true,
      autoplay: false,
      params: { symbols: 'letters', length: 4 },
      maxSeconds: 12,
      onFrame: (ex, now) => {
        const ss = (ex as unknown as { session: { phase: string; entry: string[]; target: Array<{ ch: string }>; trials: Array<{ correct: boolean }> } }).session;
        if (ss.phase === 'input' && ss.entry.length === 0 && ss.trials.length === 0) {
          ss.target.forEach((c, i) => ex.keyDown?.(i % 2 ? c.ch.toLowerCase() : c.ch, now));
          ex.keyDown?.('Enter', now);
        }
        if (ss.trials.length === 1) result = ss.trials[0].correct;
      },
    });
    expect(result).toBe(true);
  });
});

describe('Texte', () => {
  it('DE und IT haben dieselben Schlüssel (auch in params, metricHints; Listen gleich lang)', () => {
    expect(leaves(itTexts).sort()).toEqual(leaves(de).sort());
    expect(itTexts.progression?.length).toBe(de.progression?.length);
    expect(itTexts.cautions?.length).toBe(de.cautions?.length);
    expect(itTexts.steps.length).toBe(de.steps.length);
  });

  it('alle Kennzahlen sind in metrics und metricHints erklärt', () => {
    for (const t of [de, itTexts]) {
      for (const k of METRIC_KEYS) {
        expect(t.metrics[k], k).toBeTruthy();
        expect(t.metricHints?.[k]?.length, k).toBeGreaterThan(20);
      }
      expect(Object.keys(t.metricHints ?? {}).sort()).toEqual([...METRIC_KEYS].sort());
      expect(Object.keys(t.metrics).sort()).toEqual([...METRIC_KEYS].sort());
    }
  });

  it('jede Einstellung hat Beschriftung und Erklärung, jede Auswahl Namen für alle Werte', () => {
    for (const t of [de, itTexts]) {
      for (const d of PARAMS) {
        const p = t.params?.[d.key];
        expect(p?.label, d.key).toBeTruthy();
        expect(p?.hint?.length, d.key).toBeGreaterThan(20);
        if (d.type === 'select') for (const o of d.options) expect(p?.options?.[o], `${d.key}.${o}`).toBeTruthy();
      }
      expect(Object.keys(t.params ?? {}).sort()).toEqual(PARAMS.map((d) => d.key).sort());
    }
  });

  it('alle Tipps, die tipFor liefern kann, sind vorhanden', () => {
    for (const t of [de, itTexts]) for (const k of ['few', 'oneColor', 'colorMore', 'notEnough', 'easier', 'harder', 'compare']) expect(t.tips[k]?.length, k).toBeGreaterThan(20);
  });

  it('Rechtsregeln: why endet mit „nicht belegt“, keine Wirk-/Heil-/Sicherheitsversprechen, kein Test/Befundwort', () => {
    expect(de.why.trim()).toMatch(/nicht belegt\.$/);
    expect(itTexts.why.trim()).toMatch(/non è dimostrato che .*\.$/i);
    expect(legalProblems(de, 'de')).toEqual([]);
    expect(legalProblems(itTexts, 'it')).toEqual([]);
    for (const lang of ['de', 'it'] as const) {
      const all = JSON.stringify(lang === 'de' ? de : itTexts).toLowerCase();
      expect(all).not.toMatch(/unterdrück|schwächer|sopprim|più debole/);
      expect(all).not.toMatch(/vtc|corso|mirante|unicista|istituto|\bkurs\b|folie|prototyp|original|website|vorlage/);
    }
  });

  it('Sicherheitshinweise in „Gut zu wissen“: Farbsehschwäche (Birch), Doppelbilder/Schwindel (Muchnick), Abklären, Pausen, Abstand', () => {
    const all = de.cautions!.join(' ');
    expect(de.cautions![0]).toMatch(/Rot-Grün-Farbsehschwäche/);
    expect(de.cautions![0]).toMatch(/8 von 100 Männern/);
    expect(de.cautions![0]).toMatch(/4 von 1000 Frauen/);
    expect(de.cautions![0]).toMatch(/Birch, 2012/);
    expect(de.cautions![0]).toMatch(/nicht geeignet/);
    expect(de.cautions![1]).toMatch(/Doppelbilder, Schielen, Schwindel, Kopfschmerz oder Augenschmerz: sofort aufhören/);
    expect(de.cautions![1]).toMatch(/Muchnick, 2008, S\. 6 und 28/);
    expect(all).toMatch(/nicht allein weiterüben, sondern bei deiner Optikerin, deinem Optiker oder bei einer Augenärztin, einem Augenarzt abklären lassen/);
    expect(all).toMatch(/Pausen/);
    expect(all).toMatch(/Ermüdung/);
    expect(all).toMatch(/40 cm/);
    expect(all).toMatch(/kein Flackern und keine schnellen Wechsel/);
    expect(all).toMatch(/kommt ohne Farbe aus/);
    expect(all).toMatch(/Prüfbild/);
    const it2 = itTexts.cautions!.join(' ');
    expect(itTexts.cautions![0]).toMatch(/Birch, 2012/);
    expect(itTexts.cautions![0]).toMatch(/8 uomini su 100/);
    expect(itTexts.cautions![1]).toMatch(/Muchnick, 2008, p\. 6 e 28/);
    expect(itTexts.cautions![1]).toMatch(/smetti subito/);
    expect(it2).toMatch(/non esercitarti da solo, fai chiarire la cosa dal tuo ottico o dall’oculista/);
    expect(it2).toMatch(/40 cm/);
  });

  it('ehrlich: kein Befund, nur Hinweis; Brille/Bildschirmfarben/Helligkeit spielen eine Rolle; Blick wird nicht gemessen', () => {
    const all = JSON.stringify(de);
    expect(all).toMatch(/kein Befund/);
    expect(all).toMatch(/Brille, Bildschirmfarben und Helligkeit spielen eine Rolle/);
    expect(all).toMatch(/nicht prüfen, ob du die Brille trägst oder wohin du schaust/);
    expect(all).toMatch(/unsere Faustregel/);
    const it2 = JSON.stringify(itTexts);
    expect(it2).toMatch(/non un referto|non è un referto/);
    expect(it2).toMatch(/occhiali, colori dello schermo e luminosità/);
    expect(it2).toMatch(/non può controllare se porti gli occhiali o dove guardi/);
  });

  it('Bildunterschriften, Schritte und Zeilenlängen sind kurz', () => {
    for (const t of [de, itTexts]) {
      for (const c of Object.values(t.captions)) expect(c.length).toBeLessThanOrEqual(42);
      for (const s of t.steps) expect(s.length).toBeLessThanOrEqual(60);
      expect(t.tagline.length).toBeLessThanOrEqual(80);
      expect(t.steps.length).toBeGreaterThanOrEqual(2);
      expect(t.steps.length).toBeLessThanOrEqual(3);
    }
  });

  it('Platzhalter der Rückmeldung sind vorhanden und werden im Ergebnis ersetzt', () => {
    for (const t of [de, itTexts]) {
      expect(t.feedback.trial).toContain('{n}');
      expect(t.feedback.trial).toContain('{total}');
      expect(t.feedback.partial).toContain('{k}');
      expect(t.feedback.colorRow).toContain('{bad}');
      expect(t.feedback.colorRow).toContain('{n}');
      for (const k of ['{p}', '{miss}', '{wrong}']) expect(t.feedback.colorDetail).toContain(k);
      expect(t.feedback.sizeDetail).toContain('{deg}');
      expect(t.feedback.eyeLeft).toContain('{lens}');
      expect(t.feedback.colorFew).toContain('{min}');
    }
  });

  it('Ergebnis zeigt die Zeichengröße mit Sehwinkel; begrenzt auf kleinen Bühnen mit Hinweis', () => {
    const s = simulate({ quick: true, w: 1180, h: 820, params: { sizeCm: 1.2 }, pxPerCm: 38, maxSeconds: 120 });
    const rows = s.result!.details![s.result!.details!.length - 1].rows;
    const size = rows.find((r) => r.label === de.metrics.size)!;
    expect(size.value).toBe('1,2 cm');
    expect(size.text).toBe('etwa 1,7° bei 40 cm');
    const t = simulate({ quick: true, w: 390, h: 844, params: { sizeCm: 4, length: 12 }, pxPerCm: 38, maxSeconds: 120 });
    const rows2 = t.result!.details![t.result!.details!.length - 1].rows;
    const size2 = rows2.find((r) => r.label === de.metrics.size)!;
    expect(size2.text).toMatch(new RegExp(`${de.feedback.limited}$`));
    // nicht kalibriert: Schätzung kenntlich machen
    const u = simulate({ quick: true, w: 1180, h: 820, maxSeconds: 120 });
    const size3 = u.result!.details![u.result!.details!.length - 1].rows.find((r) => r.label === de.metrics.size)!;
    expect(size3.text).toMatch(new RegExp(`${de.feedback.notCalibrated}$`));
  });
});

describe('science.ts', () => {
  it('Eintrag stimmt mit der Übung überein, ≥ 3 Quellen mit doi.org- oder openlibrary-Link, Texte in beiden Sprachen', () => {
    expect(science.id).toBe('labor-rot-gruen-lesen');
    expect(science.evidence).toBe('weak');
    expect(science.sources.length).toBeGreaterThanOrEqual(3);
    const urls = new Set<string>();
    for (const s of science.sources) {
      expect(s.url).toMatch(/^https:\/\/(doi\.org\/10\.\d{4,9}\/\S+|openlibrary\.org\/isbn\/\d{10,13})$/);
      expect(s.label.length).toBeGreaterThan(20);
      expect(urls.has(s.url), s.url).toBe(false);
      urls.add(s.url);
    }
    for (const lang of ['de', 'it'] as const) for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(science.texts[lang][k].length).toBeGreaterThan(20);
  });

  it('nur bestätigte Quellen (Crossref und PubMed-Abstract, 03.10.2026)', () => {
    const verified = [
      '10.1097/OPX.0b013e3181ea18e9', // Hess, Mansouri & Thompson 2010
      '10.1016/j.cub.2013.01.059', // Li et al. 2013
      '10.1001/jamaophthalmol.2016.4262', // Holmes et al. 2016
      '10.1167/iovs.15-16583', // Tsirlin et al. 2015
      '10.1016/j.visres.2015.01.002', // Levi, Knill & Bavelier 2015
      '10.1364/JOSAA.29.000313', // Birch 2012
    ];
    const doi = science.sources.filter((s) => s.url.startsWith('https://doi.org/')).map((s) => s.url.replace('https://doi.org/', ''));
    expect(doi.sort()).toEqual([...verified].sort());
    expect(science.sources.some((s) => s.url === 'https://openlibrary.org/isbn/9780323029612')).toBe(true);
  });

  it('ehrliche Einordnung: Amblyopie-Forschung mit gemischten Ergebnissen, kein belegter Nutzen bei gesunder Binokularfunktion, keine Tiefe am 2D-Bildschirm', () => {
    const de2 = science.texts.de;
    expect(de2.daily).toMatch(/nicht belegt\.$/);
    expect(science.texts.it.daily).toMatch(/non è dimostrato\.$/);
    expect(de2.research).toMatch(/Amblyopie/);
    expect(de2.research).toMatch(/gemischt/);
    expect(de2.research).toMatch(/Für Menschen mit gesunder Binokularfunktion gibt es keinen belegten Nutzen/);
    expect(de2.research).toMatch(/keine räumliche Tiefe/);
    expect(de2.research).toMatch(/nicht durch Studien belegt/);
    expect(de2.research).toMatch(/Für genau diese Übung gibt es keine Studie/);
    expect(de2.research).toMatch(/nicht belegt\.$/);
    expect(science.texts.it.research).toMatch(/non esiste un’utilità dimostrata/);
    expect(science.texts.it.research).toMatch(/non è dimostrata\.$/);
    for (const lang of ['de', 'it'] as const) {
      const all = JSON.stringify(science.texts[lang]).toLowerCase();
      expect(all).not.toMatch(/sicherer im|più sicuro|besseres sehen|diagnos|heilt|guarisce/);
      expect(all).not.toMatch(/vtc|corso|mirante|unicista|istituto|\bkurs\b|folie|prototyp|original|website|vorlage/);
    }
  });
});
