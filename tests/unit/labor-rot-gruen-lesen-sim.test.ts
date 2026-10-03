/**
 * Rot-Grün-Lesen (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche)
 * sowie Prüfung der Anordnung, der Texte (DE/IT gleiche Schlüssel, Sicherheitshinweise, Rechtsregeln), der Quellen und
 * der Registrierung.
 */
import { describe, expect, it } from 'vitest';
import { laborRotGruenLesen } from '../../src/exercises/labor-rot-gruen-lesen';
import { charPitch, MIN_KEY_PX, rgLayout } from '../../src/exercises/labor-rot-gruen-lesen/layout';
import { colorOffsets, GLYPH_W, keysFor, PARAMS, PITCH, QUICK_TRIALS, shiftPx, UNSURE } from '../../src/exercises/labor-rot-gruen-lesen/logic';
import { science } from '../../src/exercises/labor-rot-gruen-lesen/science';
import { de, it as itTexts } from '../../src/exercises/labor-rot-gruen-lesen/texts';
import { getExercise, EXERCISES } from '../../src/exercises/registry';
import { SCIENCE } from '../../src/content/science';
import { fakeG, leaves, legalProblems, simulate as sim, type SimOpts } from './_labor-sim';

const simulate = (o: SimOpts = {}) => sim(laborRotGruenLesen, o);

const METRIC_KEYS = ['accuracy', 'correct', 'symbol_accuracy', 'err_red', 'err_second', 'err_left', 'err_right', 'entry_mean', 'chars', 'size', 'shown', 'shift'];

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
    // einfache Ansicht ist der Standard: keine Schritte, keine Einstellungen im Prüfbild
    expect(info.steps).toBeUndefined();
    expect(info.note).toBeUndefined();
  });

  it('Prüfbild Rot–Blau: Blau rgb(0,160,255), beschriftet; je Farbe getrennte Helligkeit färbt die Flächen', () => {
    const info = laborRotGruenLesen.colorCheck!({ tones: 'redblue', brightness: 100, redLevel: 100, secondLevel: 100 }, de);
    expect(info.panels.map((p) => p.color)).toEqual(['rgb(255,0,0)', 'rgb(0,160,255)']);
    expect(info.panels.map((p) => p.label)).toEqual(['Rot', 'Blau']);
    expect(info.text).toMatch(/bei Rot–Blau: blaue/);
    const dim = laborRotGruenLesen.colorCheck!({ tones: 'redblue', brightness: 100, redLevel: 50, secondLevel: 70 }, itTexts);
    expect(dim.panels.map((p) => p.color)).toEqual(['rgb(128,0,0)', 'rgb(0,112,179)']);
    expect(dim.panels.map((p) => p.label)).toEqual(['Rosso', 'Blu']);
  });

  describe('Prüfbild Schritt für Schritt', () => {
    const steps = (over: Record<string, string | number> = {}, tx = de) => laborRotGruenLesen.colorCheck!({ glassesCheck: 'steps', ...over }, tx);

    it('Reihenfolge: Brille aufsetzen, linkes Auge zuhalten, rechtes Auge zuhalten, Glas wählen, Helligkeit je Farbe, Geisterbild-Satz', () => {
      const info = steps();
      expect(info.steps!.length).toBe(5);
      const t = info.steps!.map((x) => x.text);
      expect(t[0]).toMatch(/Setze die Brille auf/);
      expect(t[0]).toMatch(/Überbrille/);
      // Rot-Glas links: Linkes Auge zu → das rechte Auge sieht nur Grün; rechtes Auge zu → nur Rot
      expect(t[1]).toMatch(/linke Auge zu/);
      expect(t[1]).toMatch(/nur die grüne Fläche sehen, die andere muss fast verschwinden/);
      expect(t[2]).toMatch(/rechte Auge zu/);
      expect(t[2]).toMatch(/nur die rote Fläche sehen/);
      expect(t[3]).toMatch(/welches Glas vor deinem linken Auge sitzt/);
      expect(t[4]).toMatch(/Helligkeit jeder Farbe/);
      expect(info.note).toMatch(/Geisterbild/);
      expect(info.note).toMatch(/Raumlicht und Spiegelungen/);
      expect(info.note).toMatch(/Bildschirmhelligkeit/);
      expect(info.text).toMatch(/bewertet nichts/);
      // Panels bleiben beschriftet
      expect(info.panels.map((p) => p.label)).toEqual(['Rot', 'Grün']);
    });

    it('Linkes Glas Grün: die Schritte tauschen die Farben; Rot–Blau und Rot–Cyan nennen Blau bzw. Cyan', () => {
      const t = steps({ leftLens: 'green' }).steps!.map((x) => x.text);
      expect(t[1]).toMatch(/nur die rote Fläche/);
      expect(t[2]).toMatch(/nur die grüne Fläche/);
      expect(steps({ tones: 'redblue' }).steps![1].text).toMatch(/nur die blaue Fläche/);
      expect(steps({ tones: 'redcyan' }).steps![1].text).toMatch(/nur die cyanfarbene Fläche/);
      expect(steps({ tones: 'redblue' }, itTexts).steps![1].text).toMatch(/solo la superficie blu/);
    });

    it('Glas wählen: zwei beschriftete Optionen, gespeichert wird der Parameter „Linkes Glas“', () => {
      const adj = steps({ leftLens: 'green', tones: 'redblue' }).steps![3].adjust!;
      expect(adj.length).toBe(1);
      const a = adj[0];
      expect(a.kind).toBe('choice');
      if (a.kind !== 'choice') throw new Error('Auswahl erwartet');
      expect(a.key).toBe('leftLens');
      expect(a.value).toBe('green');
      expect(a.options).toEqual([
        { value: 'red', label: 'Linkes Glas: rot' },
        { value: 'green', label: 'Linkes Glas: blau' },
      ]);
      expect(PARAMS.find((d) => d.key === a.key && d.type === 'select' && a.options.every((o) => d.options.includes(o.value)))).toBeTruthy();
    });

    it('Helligkeit je Farbe: 30–100 %, Schritte von 10 %, Tasten „dunkler“/„heller“ mit Farbnamen, Werte aus den Einstellungen', () => {
      const adj = steps({ redLevel: 60, secondLevel: 100 }).steps![4].adjust!;
      expect(adj.map((a) => a.kind)).toEqual(['level', 'level']);
      const [r, g] = adj;
      if (r.kind !== 'level' || g.kind !== 'level') throw new Error('Stufe erwartet');
      expect([r.key, r.min, r.max, r.step, r.value]).toEqual(['redLevel', 30, 100, 10, 60]);
      expect([g.key, g.min, g.max, g.step, g.value]).toEqual(['secondLevel', 30, 100, 10, 100]);
      expect(r.valueText).toBe('Rot: 60 %');
      expect(r.downLabel).toBe('Rot dunkler');
      expect(r.upLabel).toBe('Rot heller');
      expect(g.downLabel).toBe('Grün dunkler');
      expect(g.upLabel).toBe('Grün heller');
      const it2 = steps({ tones: 'redcyan' }, itTexts).steps![4].adjust!;
      if (it2[1].kind !== 'level') throw new Error('Stufe erwartet');
      expect(it2[1].downLabel).toBe('Ciano più scuro');
      expect(it2[1].upLabel).toBe('Ciano più chiaro');
      // die Parameter dazu haben genau diese Grenzen
      for (const d of PARAMS.filter((x) => x.key === 'redLevel' || x.key === 'secondLevel')) expect(d).toMatchObject({ min: 30, max: 100, step: 10 });
    });

    it('keine Wertung, kein „Test“, keine Diagnose; Texte vollständig in DE und IT', () => {
      for (const tx of [de, itTexts]) {
        const info = steps({}, tx);
        const all = [info.title, info.text, info.note, ...info.steps!.map((x) => x.text)].join(' ');
        expect(all).not.toMatch(/\btest\b|diagnos|undefined|\{/i);
        for (const st of info.steps!) expect(st.text.length).toBeGreaterThan(20);
        expect(info.note!.length).toBeGreaterThan(40);
      }
    });
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
    controlMarks: false,
    shiftPx: 0,
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

describe('Anordnung mit Versatz und Kontrollstrichen', () => {
  const stages = [
    ['Tablet quer', 1180, 820],
    ['Tablet hoch', 820, 1180],
    ['Handy', 390, 844],
  ] as const;
  const input = (w: number, h: number, over: Partial<Parameters<typeof rgLayout>[0]> = {}) => ({
    w,
    h,
    u: Math.min(w, h) / 100,
    captionReserve: 0,
    demo: false,
    wantGlyphPx: 1.2 * 38,
    length: 6,
    keyCount: keysFor('digits').length,
    controlMarks: false,
    shiftPx: 0,
    ...over,
  });

  it('Mindestabstand ≥ Zeichenbreite + Versatz; ohne Versatz der übliche Abstand', () => {
    expect(charPitch(40, 0)).toBeCloseTo(PITCH * 40, 9);
    expect(charPitch(40, 100)).toBeCloseTo(GLYPH_W * 40 + 100, 9);
    expect(charPitch(40, 5)).toBeCloseTo(PITCH * 40, 9); // kleiner Versatz passt in den üblichen Abstand
    for (const g of [12, 40, 90]) for (const sh of [0, 10, 80, 300]) expect(charPitch(g, sh)).toBeGreaterThanOrEqual(GLYPH_W * g + sh - 1e-9);
  });

  for (const [name, w, h] of stages) {
    it(`${name}: versetzte Zeichen überlappen nie (jede Farbfolge, beide Richtungen), alles im Rahmen, Rahmen auf der Bühne`, () => {
      let capped = 0;
      for (const length of [4, 6, 12]) {
        for (const pd of [0, 2, 6, 12]) {
          for (const dist of [30, 40, 60, 100]) {
            for (const pxPerCm of [38, 70]) {
              for (const sizeCm of [0.6, 1.2, 2.4]) {
                for (const controlMarks of [false, true]) {
                  const want = shiftPx(pd, dist, pxPerCm);
                  const L = rgLayout(input(w, h, { length, controlMarks, shiftPx: want, wantGlyphPx: Math.min(sizeCm * pxPerCm, 0.9 * Math.min(w, h)) }));
                  const tag = `${length} Z., ${pd} Δ, ${dist} cm, ${pxPerCm} px/cm, ${sizeCm} cm, Striche ${controlMarks}`;
                  expect(L.shiftMaxPx, tag).toBeGreaterThanOrEqual(0);
                  expect(L.shiftMaxPx, tag).toBeLessThanOrEqual(want + 1e-6);
                  if (L.shiftMaxPx < want - 0.5) capped++;
                  if (want === 0) expect(L.shiftMaxPx, tag).toBe(0);
                  const sh = L.shiftMaxPx;
                  const gw = GLYPH_W * L.glyph;
                  // Frame auf der Bühne
                  expect(L.frame.x, tag).toBeGreaterThanOrEqual(-0.01);
                  expect(L.frame.x + L.frame.w, tag).toBeLessThanOrEqual(w + 0.01);
                  expect(L.frame.y, tag).toBeGreaterThanOrEqual(-0.01);
                  // Zeichen: Nachbarn in der Zeile haben Mindestabstand Breite + Versatz, auch wenn sie gegenläufig versetzt sind
                  for (let i = 1; i < length; i++) {
                    const a = L.chars[i - 1];
                    const b = L.chars[i];
                    if (Math.abs(a.y - b.y) < 1) {
                      for (const dir of ['convergence', 'divergence'] as const) {
                        for (const lens of ['red', 'green'] as const) {
                          const o = colorOffsets(lens, dir, sh);
                          for (const ca of ['a', 'b'] as const) {
                            for (const cb of ['a', 'b'] as const) {
                              const gap = b.x + o[cb] - (a.x + o[ca]);
                              expect(gap, `${tag} ${dir} ${lens} ${ca}${cb}`).toBeGreaterThanOrEqual(gw - 0.01);
                            }
                          }
                        }
                      }
                    }
                  }
                  // jedes Zeichen samt Versatz liegt im Rahmen
                  for (const c of L.chars) {
                    expect(c.x - L.glyph / 2 - sh / 2, tag).toBeGreaterThanOrEqual(L.frame.x - 0.01);
                    expect(c.x + L.glyph / 2 + sh / 2, tag).toBeLessThanOrEqual(L.frame.x + L.frame.w + 0.01);
                  }
                  // mit Versatz: Zeichen höchstens auf die Hälfte der gewünschten Größe verkleinert
                  if (sh > 0) expect(L.glyph, tag).toBeGreaterThanOrEqual(Math.max(10, Math.min(sizeCm * pxPerCm, 0.9 * Math.min(w, h)) * 0.5) - 0.01);
                  // Striche
                  if (controlMarks) {
                    const st = L.strokes!;
                    expect(st, tag).not.toBeNull();
                    expect(st.yA, tag).toBeGreaterThan(L.crossY);
                    expect(st.yA, tag).toBeLessThan(L.chars[0].y - L.glyph / 2);
                    expect(st.yB, tag).toBeGreaterThan(L.chars[length - 1].y + L.markDy);
                    expect(st.yB + st.thick / 2, tag).toBeLessThanOrEqual(L.frame.y + L.frame.h + 0.01);
                    expect(st.x - st.len / 2 - sh / 2, tag).toBeGreaterThanOrEqual(L.frame.x - 0.01);
                    expect(st.x + st.len / 2 + sh / 2, tag).toBeLessThanOrEqual(L.frame.x + L.frame.w + 0.01);
                  } else {
                    expect(L.strokes, tag).toBeNull();
                    expect(L.missA, tag).toBeNull();
                  }
                }
              }
            }
          }
        }
      }
      // enge Bühnen begrenzen den Versatz, weite nicht immer
      if (name === 'Handy') expect(capped).toBeGreaterThan(0);
    });
  }

  it('Tablet quer, 6 Zeichen, 6 Δ bei 40 cm: der gewünschte Versatz wird voll erreicht, Zeichen behalten ihre Größe', () => {
    const want = shiftPx(6, 40, 38);
    const L = rgLayout(input(1180, 820, { shiftPx: want }));
    expect(L.shiftMaxPx).toBeCloseTo(want, 6);
    expect(L.glyph).toBeCloseTo(1.2 * 38, 6);
    expect(L.pitch).toBeCloseTo(charPitch(L.glyph, want), 6);
  });

  it('Handy, 12 Zeichen, 12 Δ bei 100 cm: Versatz wird begrenzt, die Folge passt trotzdem auf die Bühne', () => {
    const want = shiftPx(12, 100, 38);
    const L = rgLayout(input(390, 844, { length: 12, shiftPx: want }));
    expect(L.shiftMaxPx).toBeLessThan(want);
    expect(L.shiftMaxPx).toBeGreaterThanOrEqual(0);
    expect(L.frame.x + L.frame.w).toBeLessThanOrEqual(390.01);
    expect(L.frame.y + L.frame.h).toBeLessThanOrEqual(L.entryY - L.entrySize);
  });

  for (const [name, w, h] of stages) {
    for (const symbols of ['digits', 'letters', 'mixed'] as const) {
      it(`${name}, ${symbols}: Tasten „Strich fehlt“ ≥ 56 px, auf der Bühne, überlappen nichts, zwischen Eingabefeld und „Löschen/Fertig“`, () => {
        const keyCount = keysFor(symbols).length;
        const L = rgLayout(input(w, h, { keyCount, controlMarks: true, length: 8, shiftPx: shiftPx(6, 40, 38), wantGlyphPx: 2 * 38 }));
        const miss = [L.missA!, L.missB!];
        expect(miss[0] && miss[1]).toBeTruthy();
        for (const r of miss) {
          expect(r.h).toBeGreaterThanOrEqual(MIN_KEY_PX - 0.01);
          expect(r.w).toBeGreaterThanOrEqual(MIN_KEY_PX - 0.01);
          expect(r.x).toBeGreaterThanOrEqual(-0.01);
          expect(r.x + r.w).toBeLessThanOrEqual(w + 0.01);
          expect(r.y + r.h).toBeLessThanOrEqual(L.back.y + 0.01);
          // Eingabefeld und Hinweiszeile liegen darüber
          expect(L.entryY + L.entrySize * 0.62).toBeLessThanOrEqual(r.y + 0.01);
        }
        const rects = [...L.keys, L.back, L.done, ...miss];
        for (let a = 0; a < rects.length; a++) {
          for (let b = a + 1; b < rects.length; b++) {
            const p = rects[a];
            const q = rects[b];
            const overlap = p.x < q.x + q.w - 0.01 && q.x < p.x + p.w - 0.01 && p.y < q.y + q.h - 0.01 && q.y < p.y + p.h - 0.01;
            expect(overlap, `${a}/${b}`).toBe(false);
          }
        }
        // links der obere (rote), rechts der untere Strich
        expect(L.missA!.x).toBeLessThan(L.missB!.x);
        // der Rahmen reicht nicht in die Tasten
        expect(L.frame.y + L.frame.h).toBeLessThanOrEqual(L.entryY - L.entrySize);
      });
    }
  }

  it('ohne Kontrollstriche und ohne Versatz bleibt die Anordnung wie zuvor (Rahmenhöhe ohne Strichbänder)', () => {
    const plain = rgLayout(input(1180, 820));
    const marks = rgLayout(input(1180, 820, { controlMarks: true }));
    expect(marks.frame.h).toBeGreaterThan(plain.frame.h);
    expect(plain.shiftMaxPx).toBe(0);
    expect(plain.missA).toBeNull();
    expect(plain.pitch).toBeCloseTo(PITCH * plain.glyph, 9);
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
    const c = simulate({
      mode: 'demo',
      seed: 3,
      params: {
        sizeCm: 4,
        length: 12,
        symbols: 'letters',
        showFor: '2',
        trials: 20,
        tones: 'redcyan',
        brightness: 80,
        redLevel: 40,
        secondLevel: 40,
        controlMarks: 'on',
        shiftPd: 12,
        shiftDir: 'divergence',
        rampDurchgaenge: 6,
        glassesCheck: 'steps',
      },
    });
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
      { tones: 'redblue', redLevel: 50, secondLevel: 70 },
      { leftLens: 'green' },
      { trials: 6 },
      { controlMarks: 'on' },
      { controlMarks: 'on', showFor: '2', symbols: 'letters' },
      { shiftPd: 6 },
      { shiftPd: 12, shiftDir: 'divergence', length: 12, sizeCm: 2 },
      { shiftPd: 8, rampDurchgaenge: 5, controlMarks: 'on', leftLens: 'green', tones: 'redblue' },
      { shiftPd: 4.5, showFor: '4', mix: 'random', symbols: 'mixed' },
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
      for (const k of ['{k}', '{n}']) expect(t.feedback.strokeValue).toContain(k);
      expect(t.feedback.strokeRow).toContain('{c}');
      for (const k of ['{pd}', '{dir}']) expect(t.feedback.shiftValue).toContain(k);
      for (const k of ['{cm}', '{px}', '{d}']) expect(t.feedback.shiftDetail).toContain(k);
      expect(t.feedback.shiftRamp).toContain('{n}');
      expect(t.feedback.shiftLimited).toContain('{pd}');
      for (const k of ['checkStepLeft', 'checkStepRight']) expect(t.feedback[k]).toContain('{c}');
      expect(t.feedback.checkLensIs).toContain('{c}');
      for (const k of ['checkLevelValue', 'checkLevelDown', 'checkLevelUp']) expect(t.feedback[k]).toContain('{c}');
      expect(t.feedback.checkLevelValue).toContain('{v}');
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

describe('Kontrollstriche im Spiel', () => {
  it('Tasten „Strich fehlt“ nur mit Einstellung: Hand tippt sie, Ergebnis enthält die Tabelle nach Farbe (Hinweis, kein Befund)', () => {
    const s = simulate({ maxSeconds: 400, seed: 4, params: { controlMarks: 'on' }, recordText: true });
    const r = s.result!;
    expect(r).not.toBeNull();
    const t = r.details!.find((d) => d.title === de.feedback.strokeTitle)!;
    expect(t, 'Tabelle Kontrollstriche').toBeTruthy();
    expect(t.rows.map((x) => x.label)).toEqual(['Strich in Rot fehlte', 'Strich in Grün fehlte']);
    for (const row of t.rows) expect(row.value).toMatch(/^\d+ von 10 Folgen$/);
    expect(t.note).toMatch(/kein Befund/);
    expect(t.note).toMatch(/Brille, Bildschirmfarben und Helligkeit spielen eine Rolle/);
    // Reihenfolge der Tabellen: Farbe, Auge, Kontrollstriche, Weitere Werte
    expect(r.details!.map((d) => d.title)).toEqual([de.feedback.colorTitle, de.feedback.eyeTitle, de.feedback.strokeTitle, de.feedback.moreTitle]);
    // beschriftete Tasten (mit Pfeil), nie nur Farbe
    expect(s.texts).toContain(`↑ ${de.feedback.missRed}`);
    expect(s.texts).toContain(`↓ ${de.feedback.missGreen}`);
    // Zählung stimmt mit den Meldungen der Hand überein und bleibt im Rahmen
    const sum = (k: number) => Number(t.rows[k].value.split(' ')[0]);
    expect(sum(0)).toBeGreaterThanOrEqual(0);
    expect(sum(0)).toBeLessThanOrEqual(10);
    expect(sum(0) + sum(1)).toBeGreaterThan(0); // mit Startwert 4: die Hand meldet gelegentlich
    // Hand tippt zusätzlich zu den Zeichen, Löschen, Fertig auch die Strich-Tasten
    expect(s.ghostTaps).toBeGreaterThan(10 * 7);
  });

  it('ohne Einstellung: keine Tasten, keine Tabelle (bisheriges Verhalten)', () => {
    const s = simulate({ quick: true, recordText: true, maxSeconds: 120, seed: 4 });
    expect(s.texts.some((x) => /Strich fehlt/.test(x))).toBe(false);
    expect(s.result!.details!.some((d) => d.title === de.feedback.strokeTitle)).toBe(false);
  });

  it('Farbpaar Rot–Blau und Rot–Cyan: Tasten und Tabelle nennen die Farben', () => {
    const b = simulate({ maxSeconds: 400, seed: 4, params: { controlMarks: 'on', tones: 'redblue' }, recordText: true });
    expect(b.texts).toContain(`↓ ${de.feedback.missBlue}`);
    expect(b.result!.details!.find((d) => d.title === de.feedback.strokeTitle)!.rows[1].label).toBe('Strich in Blau fehlte');
    const c = simulate({ maxSeconds: 400, seed: 4, params: { controlMarks: 'on', tones: 'redcyan' }, recordText: true, lang: 'it' });
    expect(c.texts).toContain(`↓ ${itTexts.feedback.missCyan}`);
    expect(c.result!.details!.find((d) => d.title === itTexts.feedback.strokeTitle)!.rows[1].label).toBe('Trattino mancante: Ciano');
  });

  /** Mitte der Taste „Strich fehlt“ aus der Anordnung der laufenden Übung */
  const center = (ex: unknown, which: 'missA' | 'missB') => {
    const L = (ex as { layout(): { missA: { x: number; y: number; w: number; h: number }; missB: { x: number; y: number; w: number; h: number } } }).layout();
    const r = L[which];
    return { x: r.x + r.w / 2, y: r.y + r.h / 2 };
  };

  it('Antippen (Touch) meldet und nimmt zurück; auch in der Anzeigephase bei begrenzter Dauer; Fingerabstand: Trefferfläche ≥ 56 px', () => {
    const seen: Array<{ phase: string; missing: { a: boolean; b: boolean } }> = [];
    let stage = 0;
    const s = simulate({
      autoplay: false,
      params: { controlMarks: 'on', showFor: '2', length: 4, trials: 6 },
      maxSeconds: 8,
      onFrame: (ex, now) => {
        const ss = (ex as unknown as { session: { phase: string; missing: { a: boolean; b: boolean } } }).session;
        if (ss.phase === 'show' && stage === 0) {
          stage = 1;
          const a = center(ex, 'missA');
          ex.pointerDown?.({ id: 1, x: a.x, y: a.y, t: now, type: 'touch' });
          seen.push({ phase: ss.phase, missing: { ...ss.missing } });
          const b = center(ex, 'missB');
          ex.pointerDown?.({ id: 1, x: b.x, y: b.y, t: now, type: 'touch' });
          ex.pointerDown?.({ id: 1, x: b.x, y: b.y, t: now, type: 'touch' }); // zweiter Druck: zurück
          seen.push({ phase: ss.phase, missing: { ...ss.missing } });
        }
        if (ss.phase === 'input' && stage === 1) {
          stage = 2;
          seen.push({ phase: ss.phase, missing: { ...ss.missing } }); // Meldung bleibt bis „Fertig“
        }
      },
    });
    expect(s.result).toBeNull();
    expect(seen[0]).toEqual({ phase: 'show', missing: { a: true, b: false } });
    expect(seen[1]).toEqual({ phase: 'show', missing: { a: true, b: false } });
    expect(seen[2]).toEqual({ phase: 'input', missing: { a: true, b: false } });
  });

  it('Tastatur: Pfeil hoch = oberer (roter) Strich fehlt, Pfeil runter = unterer; ohne Einstellung ohne Wirkung; Buchstaben kollidieren nicht', () => {
    let miss: { a: boolean; b: boolean } | null = null;
    simulate({
      autoplay: false,
      params: { controlMarks: 'on', symbols: 'letters', length: 4, trials: 6 },
      maxSeconds: 4,
      onFrame: (ex, now) => {
        const ss = (ex as unknown as { session: { phase: string; missing: { a: boolean; b: boolean }; entry: string[] } }).session;
        if (ss.phase === 'input' && miss === null) {
          ex.keyDown?.('ArrowUp', now);
          ex.keyDown?.('ArrowDown', now);
          ex.keyDown?.('ArrowDown', now);
          expect(ss.entry).toEqual([]); // Pfeile sind keine Zeichen
          miss = { ...ss.missing };
        }
      },
    });
    expect(miss).toEqual({ a: true, b: false });
    let off: { a: boolean; b: boolean } | null = null;
    simulate({
      autoplay: false,
      params: { length: 4, trials: 6 },
      maxSeconds: 4,
      onFrame: (ex, now) => {
        const ss = (ex as unknown as { session: { phase: string; missing: { a: boolean; b: boolean } } }).session;
        if (ss.phase === 'input' && off === null) {
          ex.keyDown?.('ArrowUp', now);
          off = { ...ss.missing };
        }
      },
    });
    expect(off).toEqual({ a: false, b: false });
  });

  it('Zeichnen: oben ein kurzer roter Strich, unten einer in der zweiten Farbe, nur wenn die Folge sichtbar ist', () => {
    const fills: string[][] = [];
    const calls: Array<{ fill: string; x: number; y: number; w: number; h: number }> = [];
    const g = new Proxy(fakeG() as object, {
      get: (t, k: string, r) => {
        if (k === 'fillRect')
          return (x: number, y: number, w: number, h: number) => calls.push({ fill: String(Reflect.get(t, 'fillStyle', r)), x, y, w, h });
        return Reflect.get(t, k, r);
      },
      set: (t, k: string, v) => Reflect.set(t, k, v),
    }) as unknown as CanvasRenderingContext2D;
    let shown: typeof calls = [];
    let hidden: typeof calls | null = null;
    simulate({
      autoplay: false,
      params: { controlMarks: 'on', showFor: '2', length: 4, trials: 6 },
      maxSeconds: 5,
      afterFrame: (ex, now) => {
        const ss = (ex as unknown as { session: { phase: string } }).session;
        if (ss.phase === 'show' && !shown.length) {
          calls.length = 0;
          ex.render(g, now);
          shown = calls.filter((c) => c.fill === 'rgb(255,0,0)' || c.fill === 'rgb(0,255,0)');
        }
        if (ss.phase === 'input' && hidden === null) {
          calls.length = 0;
          ex.render(g, now);
          hidden = calls.filter((c) => c.fill === 'rgb(255,0,0)' || c.fill === 'rgb(0,255,0)');
        }
      },
    });
    fills.push(shown.map((c) => c.fill));
    expect(shown.length).toBe(2);
    expect(shown[0].fill).toBe('rgb(255,0,0)');
    expect(shown[1].fill).toBe('rgb(0,255,0)');
    expect(shown[0].y).toBeLessThan(shown[1].y); // rot oben, zweite Farbe unten
    expect(shown[0].w).toBeGreaterThan(shown[0].h * 2); // kurzer Strich: breiter als dick
    expect(hidden).toEqual([]); // nach der Anzeigedauer verschwinden die Striche mit der Folge
  });
});

describe('Versatz im Spiel', () => {
  /** Zeichnet in der Eingabephase des Durchgangs `idx` einmal in eine Zeichenfläche, die Zeichen mit Füllfarbe und x mitschneidet */
  function capture(idx: number, params: Record<string, unknown>, o: Parameters<typeof simulate>[0] = {}) {
    const rec: Array<{ s: string; x: number; fill: string }> = [];
    const g = new Proxy(fakeG() as object, {
      get: (t, k: string, r) => {
        if (k === 'fillText') return (s: string, x: number) => rec.push({ s: String(s), x, fill: String(Reflect.get(t, 'fillStyle', r)) });
        return Reflect.get(t, k, r);
      },
      set: (t, k: string, v) => Reflect.set(t, k, v),
    }) as unknown as CanvasRenderingContext2D;
    let out: { chars: Array<{ s: string; x: number; fill: string }>; base: number[]; colors: string; layout: { glyph: number; pitch: number; shiftMaxPx: number } } | null = null;
    simulate({
      autoplay: false,
      pxPerCm: 38,
      params,
      maxSeconds: 3 + 4 * idx,
      ...o,
      onFrame: (ex, now) => {
        const x = ex as unknown as {
          session: { phase: string; idx: number; target: Array<{ color: string }>; entry: string[]; press(k: string): boolean; submit(n: number): unknown; keys: string[] };
          layout(): { chars: Array<{ x: number }>; glyph: number; pitch: number; shiftMaxPx: number };
        };
        const ss = x.session;
        if (ss.phase !== 'input') return;
        if (ss.idx === idx && out === null) {
          rec.length = 0;
          ex.render(g, now);
          const L = x.layout();
          out = { chars: rec.filter((r) => r.fill === 'rgb(255,0,0)' || r.fill === 'rgb(0,255,0)'), base: L.chars.map((c) => c.x), colors: ss.target.map((c) => c.color).join(''), layout: L };
        }
        if (ss.idx < idx) {
          // den Durchgang zügig abschließen
          ss.press(ss.keys[0]);
          ss.submit(now);
        }
      },
    });
    return out!;
  }

  it('Standard (Versatz 0): alle Zeichen genau auf ihren Plätzen', () => {
    const c = capture(1, {});
    expect(c.chars.length).toBe(6);
    c.chars.forEach((ch, i) => expect(ch.x).toBeCloseTo(c.base[i], 6));
  });

  it('6 Δ bei 40 cm, 38 px/cm: erster Durchgang ohne Versatz, danach Rot +45,6 px und die zweite Farbe −45,6 px (Rot-Glas links, Konvergenz)', () => {
    const first = capture(0, { shiftPd: 6 });
    first.chars.forEach((ch, i) => expect(ch.x).toBeCloseTo(first.base[i], 6));
    const c = capture(1, { shiftPd: 6 });
    const half = shiftPx(6, 40, 38) / 2;
    expect(half).toBeCloseTo(45.6, 6);
    c.chars.forEach((ch, i) => {
      const red = ch.fill === 'rgb(255,0,0)';
      expect(red).toBe(c.colors[i] === 'a');
      expect(ch.x - c.base[i], `Zeichen ${i}`).toBeCloseTo(red ? half : -half, 6);
    });
    expect(c.layout.shiftMaxPx).toBeCloseTo(2 * half, 6);
  });

  it('Divergenz und Grün-Glas links kehren das Vorzeichen um (je Kombination)', () => {
    const half = shiftPx(6, 40, 38) / 2;
    for (const [lens, dir, redSign] of [
      ['red', 'convergence', +1],
      ['red', 'divergence', -1],
      ['green', 'convergence', -1],
      ['green', 'divergence', +1],
    ] as const) {
      const c = capture(1, { shiftPd: 6, shiftDir: dir, leftLens: lens });
      c.chars.forEach((ch, i) => {
        const red = ch.fill === 'rgb(255,0,0)';
        expect(ch.x - c.base[i], `${lens} ${dir} Zeichen ${i}`).toBeCloseTo((red ? redSign : -redSign) * half, 6);
      });
    }
  });

  it('Sehentfernung aus der Kalibrierung: bei 60 cm 1,5-mal so viel Versatz in Pixeln wie bei 40 cm', () => {
    const at = (d: number) => {
      const c = capture(1, { shiftPd: 4 }, { viewDistanceCm: d });
      const i = c.chars.findIndex((ch) => ch.fill === 'rgb(255,0,0)');
      return c.chars[i].x - c.base[i];
    };
    expect(at(40)).toBeCloseTo(shiftPx(4, 40, 38) / 2, 6);
    expect(at(60)).toBeCloseTo(shiftPx(4, 60, 38) / 2, 6);
    expect(at(60) / at(40)).toBeCloseTo(1.5, 6);
  });

  it('langsamer Aufbau: Versatz je Durchgang wächst 0, 1,5, 3, 4,5, 6 Δ (px aus der Kalibrierung), danach bleibt er', () => {
    const half = (pd: number) => shiftPx(pd, 40, 38) / 2;
    for (const [idx, pd] of [
      [0, 0],
      [1, 1.5],
      [2, 3],
      [3, 4.5],
      [4, 6],
      [5, 6],
    ] as const) {
      const c = capture(idx, { shiftPd: 6, rampDurchgaenge: 4, trials: 8 });
      const i = c.chars.findIndex((ch) => ch.fill === 'rgb(255,0,0)');
      expect(c.chars[i].x - c.base[i], `Durchgang ${idx}`).toBeCloseTo(half(pd), 6);
    }
  });

  it('enge Bühne: der Versatz wird begrenzt (Zeichen überlappen nie), das Ergebnis vermerkt die Begrenzung', () => {
    const c = capture(1, { shiftPd: 12, length: 12, sizeCm: 2 }, { w: 390, h: 700, viewDistanceCm: 100 });
    const want = shiftPx(12, 100, 38);
    expect(c.layout.shiftMaxPx).toBeLessThan(want);
    // gegenläufig versetzte Nachbarn in derselben Zeile haben immer mindestens die Zeichenbreite Abstand
    const gw = GLYPH_W * c.layout.glyph;
    const pitch = c.layout.pitch;
    expect(pitch - c.layout.shiftMaxPx).toBeGreaterThanOrEqual(gw - 0.01);
    const full = simulate({ quick: true, maxSeconds: 200, seed: 5, w: 390, h: 700, viewDistanceCm: 100, pxPerCm: 38, params: { shiftPd: 12, length: 12, sizeCm: 2, trials: 6 } });
    const row = full.result!.details![full.result!.details!.length - 1].rows.find((x) => x.label === de.metrics.shift)!;
    expect(row.text).toMatch(/auf diesem Bildschirm auf [\d,]+ Δ begrenzt/);
  });

  it('Ergebnis: Versatz und Richtung in „Weitere Werte“, Umrechnung in cm und px, Aufwärm-Hinweis; kein Messwert', () => {
    const s = simulate({ quick: true, maxSeconds: 120, seed: 5, pxPerCm: 38, params: { shiftPd: 6 } });
    const more = s.result!.details![s.result!.details!.length - 1];
    const row = more.rows.find((x) => x.label === de.metrics.shift)!;
    expect(row.value).toBe('6,0 Δ · Konvergenz (gekreuzt)');
    expect(row.text).toBe('etwa 2,4 cm (≈ 91 px) zwischen Rot und der zweiten Farbe bei 40 cm Abstand · der erste Durchgang hatte Versatz 0');
    expect(more.note).toMatch(/keine Prismenmessung und kein Ersatz für eine Untersuchung/);
    const div = simulate({ quick: true, maxSeconds: 120, seed: 5, pxPerCm: 38, viewDistanceCm: 60, params: { shiftPd: 3, shiftDir: 'divergence', rampDurchgaenge: 4, trials: 6 } });
    const row2 = div.result!.details![div.result!.details!.length - 1].rows.find((x) => x.label === de.metrics.shift)!;
    expect(row2.value).toBe('3,0 Δ · Divergenz');
    expect(row2.text).toMatch(/^etwa 1,8 cm \(≈ 68 px\) .* bei 60 cm Abstand · wuchs über 4 Durchgänge von 0 auf diesen Wert/);
    // Ohne Kalibrierung mit Hinweis (Schätzung)
    const uncal = simulate({ quick: true, maxSeconds: 120, seed: 5, params: { shiftPd: 6 } });
    const row3 = uncal.result!.details![uncal.result!.details!.length - 1].rows.find((x) => x.label === de.metrics.shift)!;
    expect(row3.text).toMatch(new RegExp(`${de.feedback.notCalibrated}$`));
    // ohne Versatz keine Zeile
    const none = simulate({ quick: true, maxSeconds: 120, seed: 5 });
    expect(none.result!.details![none.result!.details!.length - 1].rows.some((x) => x.label === de.metrics.shift)).toBe(false);
    expect(none.result!.details![none.result!.details!.length - 1].note).toBe(de.feedback.moreNote);
    // Italienisch
    const it2 = simulate({ quick: true, maxSeconds: 120, seed: 5, lang: 'it', pxPerCm: 38, params: { shiftPd: 6 } });
    const rowIt = it2.result!.details![it2.result!.details!.length - 1].rows.find((x) => x.label === itTexts.metrics.shift)!;
    expect(rowIt.value).toBe('6,0 Δ · Convergenza (incrociata)');
  });

  it('Kennzahlen und Zeichenwertung bleiben vom Versatz unberührt: gleiche Zufallsfolge, gleiche Auswertung der Eingabe', () => {
    const a = simulate({ quick: true, maxSeconds: 120, seed: 8, pxPerCm: 38 });
    const b = simulate({ quick: true, maxSeconds: 120, seed: 8, pxPerCm: 38, params: { shiftPd: 6 } });
    expect(b.result!.primary.key).toBe(a.result!.primary.key);
    expect(b.result!.secondary.map((m) => m.key)).toEqual(a.result!.secondary.map((m) => m.key));
  });
});

describe('Helligkeit je Farbe im Spiel', () => {
  it('Zeichenfarben folgen Farbpaar und Stufen: Rot–Blau mit 60 % und 80 %', () => {
    const s = simulate({ quick: true, recordText: true, maxSeconds: 120, seed: 2, params: { tones: 'redblue', redLevel: 60, secondLevel: 80 } });
    const fills = new Set(s.textFills.filter((x) => /^\d$/.test(x.s)).map((x) => x.fill));
    expect(fills.has('rgb(153,0,0)')).toBe(true);
    expect(fills.has('rgb(0,128,204)')).toBe(true);
    // Bedienung bleibt neutral: Beschriftung der Tasten nie in den Farben der Aufgabe
    for (const label of [UNSURE, de.feedback.erase, de.feedback.done]) for (const f of s.textFills.filter((x) => x.s === label).map((x) => x.fill)) expect(f).not.toMatch(/^rgb\((153,0,0|0,128,204|255,0,0|0,255,0)\)$/);
  });
});

describe('Texte der Ergänzungen', () => {
  it('Versatz: Δ, Konvergenz/Divergenz, dunkler Raum, Überbrille, Fachperson, Muchnick; keine Prismenmessung, kein Ersatz für eine Untersuchung', () => {
    const all = de.cautions!.join(' ') + JSON.stringify(de.params!.shiftPd) + JSON.stringify(de.params!.shiftDir);
    expect(all).toMatch(/1 Δ \(Prismendioptrie\) lenkt auf 1 m Entfernung um 1 cm ab/);
    expect(all).toMatch(/Konvergenz heißt, das Bild rückt scheinbar näher/);
    expect(all).toMatch(/Divergenz heißt, es rückt scheinbar weg/);
    expect(all).toMatch(/Dunkler Raum und Überbrille/);
    expect(all).toMatch(/Schielen, Doppelbildern, Schwindel oder Kopfschmerz: Versatz nur nach Absprache mit der behandelnden Fachperson oder gar nicht/);
    expect(all).toMatch(/sofort aufhören \(Muchnick, 2008, S\. 6 und 28\)/);
    expect(all).toMatch(/keine Prismenmessung und kein Ersatz für eine Untersuchung/);
    expect(de.params!.shiftPd.hint).toMatch(/Der erste Durchgang hat immer Versatz 0/);
    expect(de.params!.shiftPd.hint).toMatch(/ohne Kalibrierung nur eine Schätzung/);
    const it2 = itTexts.cautions!.join(' ') + JSON.stringify(itTexts.params!.shiftPd);
    expect(it2).toMatch(/1 Δ \(diottria prismatica\) devia di 1 cm a 1 m di distanza/);
    expect(it2).toMatch(/Muchnick, 2008, p\. 6 e 28/);
    expect(it2).toMatch(/non una misurazione prismatica e non sostituisce una visita/);
    // Rot-Cyan-Brillen funktionieren mit dem Farbpaar Rot–Blau: nur als Hinweis, nie als Produktbezeichnung
    expect(de.params!.tones.hint).toMatch(/Rot-Cyan-Brillen funktionieren mit dem Farbpaar Rot–Blau/);
    for (const t of [de, itTexts]) expect(JSON.stringify(t)).not.toMatch(/Rot-Blau-Brille|occhiali rosso-blu|prototip|prototyp/i);
  });

  it('keine Normwerte, kein Wirk-/Heilversprechen, kein „Test“ in den Texten der Ergänzungen (Texte als Ganzes bereits geprüft)', () => {
    for (const [t, lang] of [
      [de, 'de'],
      [itTexts, 'it'],
    ] as const) {
      expect(legalProblems(t, lang)).toEqual([]);
      const all = JSON.stringify(t).toLowerCase();
      expect(all).not.toMatch(/unterdrück|schwächer|sopprim|più debole|normbereich/);
    }
  });

  it('neue Einstellungen haben DE und IT Beschriftung, Erklärung und Namen aller Werte; „short“ nennt den Wert', () => {
    for (const t of [de, itTexts]) {
      for (const k of ['redLevel', 'secondLevel', 'glassesCheck', 'controlMarks', 'shiftPd', 'shiftDir', 'rampDurchgaenge']) {
        expect(t.params![k].label.length, k).toBeGreaterThan(5);
        expect(t.params![k].hint!.length, k).toBeGreaterThan(40);
      }
      expect(t.params!.shiftPd.short).toContain('Δ');
      expect(t.params!.redLevel.short).toContain('{v}');
      expect(t.params!.tones.options!.redblue.length).toBeGreaterThan(3);
    }
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
      '10.1001/archopht.126.10.1336', // Convergence Insufficiency Treatment Trial Study Group 2008 (Crossref + PubMed: 126(10), 1336–1349)
      '10.1097/01.opx.0000171331.36871.2f', // Scheiman et al. 2005 (Crossref + PubMed: 82(7), 583–595)
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
