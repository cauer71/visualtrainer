/**
 * Gemeinsame Prüfungen für Übungen auf dem Kern „Nachführen mit dem Finger“ (Texte, science, Film, Autoplay).
 * Wird von tests/unit/<id>-logic.test.ts der vier Übungen genutzt (Datei ohne eigene Tests).
 */
import { describe, expect, it } from 'vitest';
import type { ScienceEntry } from '../../src/content/science';
import type { ExerciseDefinition } from '../../src/core/types';
import { simulate } from './_sim-w08-w09';

export function checkNachfuehrenExercise(def: ExerciseDefinition, science: ScienceEntry, opts: { axesNote?: string } = {}): void {
  void opts;
  describe(`${def.id}: Definition, Texte, science`, () => {
    it('Kategorie bewegung, Farbe, Icon, Stufe wird angezeigt', () => {
      expect(def.category).toBe('bewegung');
      expect(def.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(def.icon.length).toBeGreaterThan(40);
      expect(def.showsLevel).toBe(true);
      expect(def.minutes).toBeGreaterThan(0);
    });

    it('Texte DE/IT: gleiche Schlüssel, Längen, du-Form, Schlusssatz „nicht belegt“', () => {
      const { de, it: itx } = def.texts;
      for (const k of ['captions', 'metrics', 'tips', 'feedback'] as const) {
        expect(Object.keys(itx[k]).sort()).toEqual(Object.keys(de[k]).sort());
      }
      expect(itx.steps.length).toBe(de.steps.length);
      expect(itx.goodFor.length).toBe(de.goodFor.length);
      for (const t of [de, itx]) {
        expect(t.title.split(' ').length).toBeLessThanOrEqual(4);
        expect(t.tagline.length).toBeLessThanOrEqual(80);
        expect(t.steps.length).toBeGreaterThanOrEqual(2);
        expect(t.steps.length).toBeLessThanOrEqual(3);
        for (const s of t.steps) expect(s.length).toBeLessThanOrEqual(62);
        for (const c of Object.values(t.captions)) expect(c.length).toBeLessThanOrEqual(42);
        for (const k of ['touch', 'follow', 'goal']) expect(t.captions[k]).toBeTruthy();
        for (const k of ['level', 'inBand', 'deviation', 'passed']) expect(t.metrics[k]).toBeTruthy();
        for (const k of ['ahead', 'calm', 'great']) expect(t.tips[k]).toBeTruthy();
        for (const k of ['level', 'inBand', 'start']) expect(t.feedback[k]).toBeTruthy();
        const all = JSON.stringify(t).toLowerCase();
        for (const bad of ['diagnos', 'normwert', 'heil', 'schuss', 'waffe', 'kill', 'bedrohung', 'sicherer im verkehr', 'sehkraft', 'besser sehen']) {
          expect(all).not.toContain(bad);
        }
        expect(all).not.toMatch(/\btest\b/);
      }
      expect(de.why.trim()).toMatch(/ist nicht belegt\.$/);
      expect(itx.why.trim()).toMatch(/non è dimostrato[^.]*\.$/i);
      expect(de.steps.join(' ')).toMatch(/pausieren/);
    });

    it('science: passende Kennung, ≥ 3 Quellen mit DOI-Link, vollständige Texte in DE/IT, ehrliche Schlussaussage', () => {
      expect(science.id).toBe(def.id);
      expect(['strong', 'medium', 'weak']).toContain(science.evidence);
      expect(science.sources.length).toBeGreaterThanOrEqual(3);
      for (const s of science.sources) {
        expect(s.url).toMatch(/^https:\/\/doi\.org\/10\./);
        expect(s.label.length).toBeGreaterThan(20);
      }
      expect(new Set(science.sources.map((s) => s.url)).size).toBe(science.sources.length);
      for (const l of ['de', 'it'] as const) {
        const t = science.texts[l];
        for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(t[k].length).toBeGreaterThan(40);
      }
      expect(science.texts.de.research).toMatch(/nicht belegt/);
      expect(science.texts.it.research).toMatch(/non è dimostrato/i);
    });
  });

  describe(`${def.id}: Durchlauf`, () => {
    it('Intro-Film: endet mit finish nach 8–14 s, Engine-Hand verborgen, Bildunterschriften', () => {
      const r = simulate({ def, mode: 'demo', seed: 2, renderEvery: 3, maxSeconds: 40 });
      expect(r.result).not.toBeNull();
      expect(r.seconds).toBeGreaterThanOrEqual(8);
      expect(r.seconds).toBeLessThanOrEqual(14);
      expect(r.hiddenGhost).toBe(true);
      expect(r.captions.length).toBeGreaterThanOrEqual(3);
      expect(r.captions[0]).toBe(def.texts.de.captions.touch);
    });

    it('Autoplay im Spielmodus (Kurzmodus): endet sauber, gültiges Ergebnis, Schlüssel passen zu den Texten', () => {
      for (const lang of ['de', 'it'] as const) {
        const r = simulate({ def, lang, quick: true, seed: 5, renderEvery: 2, maxSeconds: 120 });
        expect(r.result).not.toBeNull();
        const res = r.result!;
        expect(res.primary.key).toBe('level');
        expect(Number.isInteger(res.primary.value)).toBe(true);
        expect(res.primary.value).toBeGreaterThanOrEqual(1);
        expect(res.primary.value).toBeLessThanOrEqual(12);
        expect(res.secondary.length).toBe(3);
        for (const m of [res.primary, ...res.secondary]) expect(def.texts[lang].metrics[m.key]).toBeTruthy();
        expect(res.secondary[0].value).toBeGreaterThan(30);
        expect(res.secondary[0].value).toBeLessThanOrEqual(100);
        expect(def.texts[lang].tips[res.tip!]).toBeTruthy();
        expect(res.score).toBeGreaterThanOrEqual(0);
        expect(r.seconds).toBeLessThan(40);
      }
    });

    it('bildratenunabhängig: 60 Hz und 120 Hz – gleiche Dauer, ähnliche Wertung', () => {
      const a = simulate({ def, quick: true, seed: 9, fps: 60, maxSeconds: 120 });
      const b = simulate({ def, quick: true, seed: 9, fps: 120, maxSeconds: 120 });
      expect(Math.abs(a.seconds - b.seconds)).toBeLessThan(0.6);
      expect(Math.abs(a.result!.secondary[0].value - b.result!.secondary[0].value)).toBeLessThan(30);
    });

    it('Hochformat (Handy) und reduzierte Bewegung laufen sauber durch', () => {
      const r = simulate({ def, quick: true, w: 480, h: 860, seed: 6, reducedMotion: true, renderEvery: 2, maxSeconds: 120 });
      expect(r.result).not.toBeNull();
    });

    it('Finger-Eingabe von Hand: Abheben ist Pause, danach geht es weiter; Ergebnis nach festen Durchgängen', () => {
      let lifted = false;
      let sAtLift = NaN;
      let sAfter = NaN;
      const r = simulate({
        def,
        quick: true,
        autoplay: false,
        seed: 4,
        maxSeconds: 80,
        onFrame: (ex, t) => {
          const e = ex as unknown as Record<string, any>;
          const play = e.phase === 'play';
          const tg = e.tgt;
          const want = { x: e.cx + (tg.x - (e.rule.disturbance?.(Math.max(0, e.s))?.x ?? 0)) * e.pu, y: e.cy + (tg.y - (e.rule.disturbance?.(Math.max(0, e.s))?.y ?? 0)) * e.pu + e.off };
          if (t > 2500 && t < 4500 && e.finger && play) {
            e.pointerUp({ id: 1, x: 0, y: 0, t, type: 'touch' });
            lifted = true;
            sAtLift = e.s;
          } else if (play && !e.finger && !(t > 2500 && t < 4500)) {
            if (lifted && Number.isNaN(sAfter)) sAfter = e.s;
            e.pointerDown({ id: 1, x: want.x, y: want.y, t, type: 'touch' });
          } else if (play && e.finger) {
            e.pointerMove({ id: 1, ...want, t, type: 'touch' });
          }
        },
      });
      expect(lifted).toBe(true);
      expect(sAfter).toBeCloseTo(sAtLift, 6);
      expect(r.result).not.toBeNull();
      expect(r.result!.secondary[0].value).toBeGreaterThan(60);
    });
  });
}
