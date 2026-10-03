/**
 * Die sechs Funktionsübungen (Hess-Schirm, Worth-Vier-Punkte, Schober, Diplopie-Karte, Subjektive Vertikale, Orts-Projektion):
 * Definition und Registrierung, Texte (DE/IT, Sicherheitshinweise, Rechtswörter, Pflichtsatz bei Schober), Quellen, Durchläufe
 * ohne Browser (Intro-Film, Autoplay, alle Einstellungen, Hochformat, Drehen) und Bedienung von Hand.
 */
import { describe, expect, it } from 'vitest';
import { SCIENCE } from '../../src/content/science';
import { dailySet, EXERCISES, byTag, getExercise, hasTag, matchesTagFilter, TAG_LABOR } from '../../src/exercises/registry';
import { defaultParams } from '../../src/core/params';
import type { ExerciseDefinition, ExerciseResult, ParamDef } from '../../src/core/types';
import { laborDiplopie } from '../../src/exercises/labor-diplopie';
import { laborHess } from '../../src/exercises/labor-hess';
import { laborProjektion } from '../../src/exercises/labor-projektion';
import { laborSchober } from '../../src/exercises/labor-schober';
import { laborVertikale } from '../../src/exercises/labor-vertikale';
import { laborWorth } from '../../src/exercises/labor-worth';
import { science as scienceHess } from '../../src/exercises/labor-hess/science';
import { legalProblems, leaves, simulate, type SimOpts } from './_labor-sim';

const ALL: ExerciseDefinition[] = [laborHess, laborWorth, laborSchober, laborDiplopie, laborVertikale, laborProjektion];
const GLASSES = [laborHess, laborWorth, laborSchober, laborDiplopie];
const LANGS = ['de', 'it'] as const;
const STAGES = [
  ['Tablet quer', 1180, 820],
  ['Tablet hoch', 820, 1180],
  ['Handy', 390, 844],
] as const;

// Quelltexte der Übungen (ohne Tests) für die Prüfung auf verbotene Bezeichnungen
const raw = (m: Record<string, unknown>) => m as Record<string, string>;
const sources = raw(
  import.meta.glob(['../../src/exercises/labor-{hess,worth,schober,diplopie,vertikale,projektion}/*.ts', '../../src/exercises/_shared/pruefung-*.ts'], {
    query: '?raw',
    import: 'default',
    eager: true,
  }),
);

const resultTexts = (r: ExerciseResult): string[] => [
  ...(r.details ?? []).flatMap((t) => [t.title, t.note ?? '', ...t.rows.flatMap((x) => [x.label, x.value, x.text ?? ''])]),
];

describe('Definition und Registrierung', () => {
  it('sechs Übungen der Marke Labor, Kategorie Wahrnehmung, ohne Stufen, mit Kalibrierung, in der Registry und im Hintergrund', () => {
    expect(ALL.map((d) => d.id)).toEqual(['labor-hess', 'labor-worth', 'labor-schober', 'labor-diplopie', 'labor-vertikale', 'labor-projektion']);
    for (const d of ALL) {
      expect(getExercise(d.id), d.id).toBe(d);
      expect(d.category, d.id).toBe('wahrnehmung');
      expect(d.tags, d.id).toEqual(['labor']);
      expect(hasTag(d, TAG_LABOR)).toBe(true);
      expect(d.showsLevel, d.id).toBe(false);
      expect(d.usesCalibration, d.id).toBe(true);
      expect(d.id).toMatch(/^[a-z0-9-]+$/);
      expect(d.minutes).toBeGreaterThanOrEqual(1);
      expect(d.icon.length).toBeGreaterThan(20);
      expect(SCIENCE[d.id], d.id).toBeTruthy();
      expect(SCIENCE[d.id].id).toBe(d.id);
      expect(SCIENCE[d.id].evidence).toBe('weak');
      // nach den portierten Labor-Übungen, in der Reihenfolge der Registrierung
    }
    const ids = EXERCISES.map((e) => e.id);
    const first = ids.indexOf('labor-hess');
    expect(first).toBeGreaterThan(ids.indexOf('labor-mentale-rotation'));
    expect(ids.slice(first, first + 6)).toEqual(ALL.map((d) => d.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('wie alle Labor-Übungen: im Filter „Labor“ (nicht in „Ohne Labor“), über byTag, nie im Tagestraining', () => {
    for (const d of ALL) {
      expect(matchesTagFilter(d, 'labor')).toBe(true);
      expect(matchesTagFilter(d, 'nolabor')).toBe(false);
      expect(matchesTagFilter(d, 'all')).toBe(true);
      expect(byTag('labor').map((e) => e.id)).toContain(d.id);
    }
    const ids = new Set(ALL.map((d) => d.id));
    for (let i = 0; i < 400; i++) for (const id of dailySet(new Date(2026, 0, 1 + i))) expect(ids.has(id)).toBe(false);
  });

  it('Prüfbild nur bei den Übungen mit Brille; Warnhinweis „kurze Einblendung“ nur bei der Projektion', () => {
    for (const d of GLASSES) expect(d.colorCheck, d.id).toBeTypeOf('function');
    expect(laborVertikale.colorCheck).toBeUndefined();
    expect(laborProjektion.colorCheck).toBeUndefined();
    expect(laborProjektion.warning).toBe('flash');
    for (const d of [laborHess, laborWorth, laborSchober, laborDiplopie, laborVertikale]) expect(d.warning).toBeUndefined();
  });

  it('Einstellungen: Texte in DE und IT, Auswahlnamen, Kurzfassung bei Zahlen, nur „Prüfbild im Intro“ neutral', () => {
    for (const d of ALL) {
      const defs = d.params!;
      expect(defs.length).toBeGreaterThanOrEqual(5);
      for (const lang of LANGS) {
        const pt = d.texts[lang].params!;
        expect(Object.keys(pt).sort(), `${d.id} ${lang}`).toEqual(defs.map((p) => p.key).sort());
        for (const p of defs as readonly ParamDef[]) {
          const t = pt[p.key];
          expect(t.label.length, `${d.id}.${p.key}`).toBeGreaterThan(2);
          expect(t.hint?.length ?? 0, `${d.id}.${p.key}`).toBeGreaterThan(10);
          if (p.type === 'select') for (const o of p.options) expect(t.options?.[o], `${d.id}.${p.key}.${o}`).toBeTruthy();
          else if (p.summary) expect(t.short, `${d.id}.${p.key}`).toBeTruthy();
          if (t.short) expect(t.short).toContain('{v}');
        }
      }
      const neutral = defs.filter((p) => p.neutral).map((p) => p.key);
      expect(neutral, d.id).toEqual(GLASSES.includes(d) ? ['glassesCheck'] : []);
      // Standardwerte liegen im erlaubten Bereich
      for (const p of defs) {
        if (p.type === 'number') {
          expect(p.default).toBeGreaterThanOrEqual(p.min);
          expect(p.default).toBeLessThanOrEqual(p.max);
        } else expect(p.options).toContain(p.default);
      }
      expect(defs.filter((p) => p.summary).length).toBeGreaterThanOrEqual(2);
      expect(defs.filter((p) => p.summary).length).toBeLessThanOrEqual(3);
    }
  });
});

describe('Texte', () => {
  it('gleiche Schlüssel in DE und IT, vollständig', () => {
    for (const d of ALL) {
      const de = d.texts.de;
      const it = d.texts.it;
      expect(leaves(it.captions).sort(), d.id).toEqual(leaves(de.captions).sort());
      expect(leaves(it.metrics).sort(), d.id).toEqual(leaves(de.metrics).sort());
      expect(leaves(it.metricHints).sort(), d.id).toEqual(leaves(de.metricHints).sort());
      expect(leaves(it.tips).sort(), d.id).toEqual(leaves(de.tips).sort());
      expect(leaves(it.feedback).sort(), d.id).toEqual(leaves(de.feedback).sort());
      expect(it.steps).toHaveLength(de.steps.length);
      expect(it.goodFor).toHaveLength(de.goodFor.length);
      expect(it.progression).toHaveLength(de.progression!.length);
      expect(it.cautions).toHaveLength(de.cautions!.length);
      expect(leaves(it.params).sort(), d.id).toEqual(leaves(de.params).sort());
    }
  });

  it('Längen: 2–3 Schritte ≤ 60 Zeichen, Einzeiler ≤ 80, Bildunterschriften ≤ 42, Hinweise vorhanden', () => {
    for (const d of ALL) {
      for (const lang of LANGS) {
        const t = d.texts[lang];
        expect(t.steps.length, d.id).toBeGreaterThanOrEqual(2);
        expect(t.steps.length, d.id).toBeLessThanOrEqual(3);
        for (const s of t.steps) expect(s.length, `${d.id} ${lang}: ${s}`).toBeLessThanOrEqual(60);
        expect(t.tagline.length, `${d.id} ${lang}`).toBeLessThanOrEqual(80);
        expect(t.title.length).toBeLessThanOrEqual(40);
        for (const [k, c] of Object.entries(t.captions)) expect(c.length, `${d.id} ${lang} ${k}`).toBeLessThanOrEqual(42);
        expect(t.progression!.length).toBeGreaterThanOrEqual(3);
        expect(t.cautions!.length).toBeGreaterThanOrEqual(5);
        expect(t.goodFor.length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it('„Für Neugierige“ endet ehrlich: „… ist nicht belegt“ bzw. „… non è dimostrato“; du-Form', () => {
    for (const d of ALL) {
      expect(d.texts.de.why, d.id).toMatch(/ist nicht belegt\.$/);
      expect(d.texts.it.why, d.id).toMatch(/non è dimostrato\.$/);
      expect(d.texts.de.why).not.toMatch(/\bIhre[mnrs]?\b|\bIhnen\b|\bSie (sollten|können|müssen|werden)\b/);
    }
  });

  it('keine Rechtswörter (Befund, Diagnose, Normwert, Wirk- und Heilversprechen, „Test“) in den Übungstexten', () => {
    for (const d of ALL) for (const lang of LANGS) expect(legalProblems(d.texts[lang], lang), `${d.id} ${lang}`).toEqual([]);
  });

  it('Funktionsübung nach dem Prinzip des klassischen Verfahrens, kein Ersatz für die Untersuchung (Augenärztin/Augenarzt, Orthoptistin, Optometrist)', () => {
    for (const d of ALL) {
      const de = d.texts.de.cautions!.join(' ');
      expect(de, d.id).toMatch(/Funktionsübung nach dem Prinzip/);
      expect(de, d.id).toMatch(/kein Ersatz für die Untersuchung bei Augenärztin, Augenarzt, Orthoptistin oder Optometrist/);
      const it = d.texts.it.cautions!.join(' ');
      expect(it, d.id).toMatch(/esercizio funzionale secondo il principio/);
      expect(it, d.id).toMatch(/non sostituisce la visita/);
    }
  });

  it('Sicherheitshinweise in jeder Übung: Warnzeichen, Abbruch bei Beschwerden, photosensitive Epilepsie, Pausen; Rot-Grün-Schwäche bei den Brillen-Übungen', () => {
    for (const d of ALL) {
      for (const lang of LANGS) {
        const c = d.texts[lang].cautions!.join(' ');
        if (lang === 'de') {
          for (const w of ['Schielen', 'Sehverlust', 'Kopfschmerz', 'Schwindel', 'Muchnick', 'photosensitiver Epilepsie', 'Pausen']) expect(c, `${d.id}: ${w}`).toContain(w);
          expect(c).toMatch(/Flackern/);
          expect(c).toMatch(/sofort aufhören/);
        } else {
          for (const w of ['strabismo', 'epilessia fotosensibile', 'pause', 'Muchnick']) expect(c, `${d.id}: ${w}`).toContain(w);
          expect(c).toMatch(/sfarfallio/);
        }
      }
    }
    for (const d of GLASSES) {
      expect(d.texts.de.cautions!.join(' '), d.id).toMatch(/Rot-Grün-Farbsehschwäche[\s\S]*8 %[\s\S]*Birch/);
      expect(d.texts.it.cautions!.join(' '), d.id).toMatch(/rosso-verde[\s\S]*8 %[\s\S]*Birch/);
    }
  });

  it('Schober: der Satz „Vorzeichenregeln nur hergeleitet, nicht gegen ein Messgerät geprüft“ steht in den Hinweisen, im Text und im Ergebnis', () => {
    const sentence = 'Vorzeichenregeln nur hergeleitet, nicht gegen ein Messgerät geprüft';
    const it = 'Regole dei segni solo derivate, non verificate con uno strumento di misura';
    const d = laborSchober.texts.de;
    expect(d.cautions![0]).toContain(sentence);
    expect(d.why).toContain(sentence);
    expect(d.feedback.signNote).toContain(sentence);
    expect(d.feedback.valuesNote).toContain(sentence);
    const t = laborSchober.texts.it;
    expect(t.cautions![0]).toContain(it);
    expect(t.why).toContain(it);
    expect(t.feedback.signNote).toContain(it);
    // tatsächlich im Ergebnis
    for (const lang of LANGS) {
      const r = simulate(laborSchober, { lang, quick: true, maxSeconds: 120 }).result!;
      const all = resultTexts(r).join(' ');
      expect(all).toContain(lang === 'de' ? sentence : it);
      const sign = r.details!.find((x) => x.title === laborSchober.texts[lang].feedback.signTitle)!;
      expect(sign.note).toContain(lang === 'de' ? sentence : it);
    }
    // und im Hintergrundtext
    expect(SCIENCE['labor-schober'].texts.de.research).toMatch(/nur hergeleitet und nicht gegen ein Messgerät geprüft/);
    expect(SCIENCE['labor-schober'].texts.de.improved).toMatch(/nur hergeleitet, nicht gegen ein Messgerät geprüft/);
  });

  it('keine verbotenen Bezeichnungen in den Quelltexten (Prototyp, Website, Kurs, Folie, Original, Mirante, Corso, Istituto, VTC, Auftraggeber …)', () => {
    const forbidden: Array<[string, RegExp]> = [
      ['VTC', /\bVTC\b/],
      ['Corso', /\bCorso\b/],
      ['Mirante', /Mirante/i],
      ['Optometria Unicista', /Optometria Unicista/i],
      ['Istituto', /Istituto/i],
      ['Kurs', /\bKurs/i],
      ['Folie', /\bFolie/i],
      ['Original', /\boriginal\w*\b/i],
      ['Prototyp', /prototyp|prototipo/i],
      ['Website', /\bwebsite\b|\bwebseite\b|\bsito web\b/i],
      ['Auftraggeber', /auftraggeber/i],
      ['Seitennamen', /skilldrills|aim ?lab|lumosity|youtube|whatsapp/i],
    ];
    const files = Object.entries(sources);
    expect(files.length).toBeGreaterThanOrEqual(6 * 4 + 4);
    for (const [f, src] of files) for (const [what, re] of forbidden) expect(re.test(src), `${what} in ${f}`).toBe(false);
  });
});

describe('Quellen und Hintergrund', () => {
  it('je Übung mindestens 3 Quellen, nur doi.org oder openlibrary.org/isbn, Birch/Muchnick wo nötig, keine doppelten', () => {
    for (const d of ALL) {
      const e = SCIENCE[d.id];
      expect(e.sources.length, d.id).toBeGreaterThanOrEqual(3);
      expect(new Set(e.sources.map((s) => s.url)).size).toBe(e.sources.length);
      for (const s of e.sources) {
        expect(s.url, `${d.id} ${s.label}`).toMatch(/^https:\/\/(doi\.org\/10\.\d{4,9}\/\S+|openlibrary\.org\/isbn\/\d{10,13})$/);
        expect(s.label.length).toBeGreaterThan(20);
      }
      const urls = e.sources.map((s) => s.url);
      expect(urls, d.id).toContain('https://openlibrary.org/isbn/9780323029612');
      if (GLASSES.includes(d)) expect(urls, d.id).toContain('https://doi.org/10.1364/JOSAA.29.000313');
      for (const lang of LANGS) for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(e.texts[lang][k].length, `${d.id} ${lang} ${k}`).toBeGreaterThan(60);
    }
  });

  it('die Quellen sind die geprüften (Crossref/PubMed, 03.10.2026)', () => {
    const doi = (id: string) => SCIENCE[id].sources.map((s) => s.url.replace('https://doi.org/', '').toLowerCase());
    expect(doi('labor-hess')).toEqual(expect.arrayContaining(['10.3368/aoj.56.1.166', '10.3368/aoj.56.1.157', '10.1177/112067210801800217']));
    expect(doi('labor-worth')).toEqual(expect.arrayContaining(['10.3368/aoj.54.1.112', '10.1016/s0161-6420(96)30516-2']));
    expect(doi('labor-schober')).toEqual(expect.arrayContaining(['10.1016/j.optom.2020.05.007', '10.1097/opx.0000000000000638', '10.3368/aoj.56.1.157']));
    expect(doi('labor-diplopie')).toEqual(expect.arrayContaining(['10.1016/s0161-6420(87)33247-6', '10.1016/s0161-6420(90)32631-3']));
    expect(doi('labor-vertikale')).toEqual(expect.arrayContaining(['10.3233/ves-1995-5104', '10.1002/ana.410330311', '10.1186/s40463-020-0402-3', '10.1097/mao.0000000000002944']));
    expect(doi('labor-projektion')).toEqual(expect.arrayContaining(['10.1523/jneurosci.18-04-01583.1998', '10.1080/00222890209601927', '10.1007/s002210000422']));
    expect(scienceHess.sources).toBe(SCIENCE['labor-hess'].sources);
  });

  it('Hintergrundtexte: ehrlich, ohne Wirk- oder Befundversprechen, mit Hinweis auf fehlende Studie', () => {
    for (const d of ALL) {
      const e = SCIENCE[d.id];
      for (const lang of LANGS) {
        const all = JSON.stringify(e.texts[lang]).toLowerCase();
        const bad = lang === 'de' ? ['diagnos', 'normwert', 'heilt', 'heilung', 'sehkraft'] : ['diagnos', 'valori normali', 'valore normale', 'guarisce'];
        expect(bad.filter((b) => all.includes(b)), `${d.id} ${lang}`).toEqual([]);
      }
      expect(e.texts.de.research, d.id).toMatch(/gibt es keine Studie/);
      expect(e.texts.it.research, d.id).toMatch(/non esiste uno studio/);
      expect(e.texts.de.research, d.id).toMatch(/nicht belegt/);
    }
  });
});

describe('Intro-Film (Demo)', () => {
  const sizes = [
    ['16:11', 1040, 715],
    ['Hochformat', 360, 640],
    ['klein', 520, 358],
  ] as const;
  for (const def of ALL) {
    for (const [name, w, h] of sizes) {
      it(`${def.id}, ${name}: endet nach 8–14 s mit ctx.finish, stumm, Hand tippt auf der Bühne, Bildunterschriften ≤ 42 Zeichen`, () => {
        for (const lang of LANGS) {
          const s = simulate(def, { mode: 'demo', w, h, lang, maxSeconds: 40, recordText: false });
          expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
          expect(s.seconds).toBeGreaterThanOrEqual(8);
          expect(s.seconds).toBeLessThanOrEqual(14.2);
          expect(s.sounds).toEqual([]);
          expect(s.ghostTaps).toBeGreaterThanOrEqual(2);
          for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
          for (const p of s.ghost.tapPoints) {
            expect(p.x).toBeGreaterThan(0);
            expect(p.x).toBeLessThan(w);
            expect(p.y).toBeGreaterThan(0);
            expect(p.y).toBeLessThan(h);
          }
          const keys = Object.keys(def.texts[lang].captions);
          const seen = keys.filter((k) => s.captions.includes(def.texts[lang].captions[k]));
          // jede Bildunterschrift des Films kommt vor (außer denen, die zu einem nicht gezeigten Schritt gehören)
          expect(seen.length, `${def.id} ${lang} ${s.captions.join(' | ')}`).toBeGreaterThanOrEqual(keys.length - 1);
        }
      });
    }
  }
});

describe('Durchläufe mit Autoplay', () => {
  for (const def of ALL) {
    for (const [name, w, h] of STAGES) {
      for (const lang of LANGS) {
        it(`${def.id}, ${name}, ${lang}: Schnelllauf endet mit Ergebnis (Hauptwert eine Zahl, Tabellen ohne Platzhalter, Tipp vorhanden)`, () => {
          const s = simulate(def, { w, h, lang, quick: true, maxSeconds: 200 });
          const r = s.result!;
          expect(r, 'finish wurde nicht gerufen').not.toBeNull();
          expect(s.seconds).toBeLessThanOrEqual(30);
          const tx = def.texts[lang];
          expect(r.primary.unit).toBe('count');
          expect(r.primary.better).toBe('higher');
          expect(Number.isFinite(r.primary.value)).toBe(true);
          expect(r.primary.value).toBeGreaterThanOrEqual(1);
          expect(r.level).toBe(1);
          expect(Number.isFinite(r.score)).toBe(true);
          for (const m of [r.primary, ...r.secondary]) {
            expect(Number.isFinite(m.value), `${def.id} ${m.key}`).toBe(true);
            expect(tx.metrics[m.key], `${def.id} ${m.key}`).toBeTruthy();
            expect(tx.metricHints![m.key], `${def.id} ${m.key}`).toBeTruthy();
          }
          expect(r.secondary.length).toBeLessThanOrEqual(4);
          expect(r.tip && tx.tips[r.tip], `${def.id} Tipp ${r.tip}`).toBeTruthy();
          expect(r.details!.length).toBeGreaterThanOrEqual(2);
          for (const t of resultTexts(r)) {
            expect(t).not.toMatch(/\{[a-zA-Z0-9]+\}/);
            expect(t).not.toMatch(/NaN|undefined|null|Infinity/);
          }
          for (const t of r.details!) {
            expect(t.title.length).toBeGreaterThan(3);
            expect(t.rows.length).toBeGreaterThanOrEqual(1);
            for (const row of t.rows) {
              expect(row.label.length).toBeGreaterThan(2);
              expect(row.value.length).toBeGreaterThan(0);
            }
          }
          // keine Rechtswörter im Ergebnis
          expect(legalProblems(resultTexts(r), lang), `${def.id} ${lang}`).toEqual([]);
        });
      }
    }
  }

  for (const def of ALL) {
    it(`${def.id}: voller Durchlauf mit Standardeinstellungen endet ruhig (virtuelle Uhr, Zufall nur über ctx.rng); gleiche Anfangszahl gleicher Verlauf`, () => {
      const a = simulate(def, { maxSeconds: 900, seed: 21 });
      const b = simulate(def, { maxSeconds: 900, seed: 21 });
      expect(a.result).not.toBeNull();
      expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
      expect(a.seconds).toBe(b.seconds);
      // ruhig: Fortschritt steigt, endet bei 1
      expect(a.progress[a.progress.length - 1]).toBe(1);
      for (let i = 1; i < a.progress.length; i++) expect(a.progress[i]).toBeGreaterThanOrEqual(a.progress[i - 1] - 1e-9);
      // die Punkte des Hauptwerts stimmen mit den Punkten der Ergebnisseite überein
      expect(a.result!.score).toBe(a.result!.primary.value);
      // Töne nur Tippen und Ende, nie Fehlerton (kein Rotblitz, keine harte Rückmeldung)
      expect(a.sounds.filter((x) => x === 'bad' || x === 'good')).toEqual([]);
      expect(a.sounds[a.sounds.length - 1]).toBe('done');
    });

    it(`${def.id}: andere Zufallsfolge, anderes Ergebnis möglich, aber immer ein vollständiger Durchlauf`, () => {
      for (const seed of [1, 2, 3]) {
        const s = simulate(def, { quick: true, seed, maxSeconds: 200 });
        expect(s.result, `${def.id} seed ${seed}`).not.toBeNull();
      }
    });
  }
});

/** Alle Werte einer Einstellung durchgehen (Auswahl: jede Möglichkeit; Zahl: Mindest-, Standard- und Höchstwert) */
function variants(def: ExerciseDefinition): Array<{ key: string; value: string | number }> {
  const out: Array<{ key: string; value: string | number }> = [];
  for (const p of def.params!) {
    if (p.type === 'select') for (const o of p.options) out.push({ key: p.key, value: o });
    else for (const v of new Set([p.min, p.default, p.max])) out.push({ key: p.key, value: v });
  }
  return out;
}

describe('Alle Einstellungen', () => {
  for (const def of ALL) {
    it(`${def.id}: jede Einstellung (alle Auswahlen, Mindest-, Standard-, Höchstwert) läuft bis zum Ergebnis, auch im Hochformat`, () => {
      for (const v of variants(def)) {
        for (const [w, h] of [
          [1040, 715],
          [390, 844],
        ]) {
          const s = simulate(def, { w, h, quick: true, params: { [v.key]: v.value }, maxSeconds: 300 });
          expect(s.result, `${def.id} ${v.key}=${v.value} ${w}×${h}`).not.toBeNull();
          expect(Number.isFinite(s.result!.primary.value)).toBe(true);
          for (const t of resultTexts(s.result!)) expect(t, `${def.id} ${v.key}=${v.value}`).not.toMatch(/\{[a-zA-Z0-9]+\}|NaN|undefined/);
        }
      }
    });

    it(`${def.id}: Drehen mitten im Lauf (Quer → Hoch → Quer) bricht nichts ab; ohne ctx.params/ctx.calib gelten Standard und Schätzung`, () => {
      for (const [w0, h0, w1, h1] of [
        [1180, 820, 820, 1180],
        [820, 1180, 1180, 820],
        [390, 844, 844, 390],
      ]) {
        const s = simulate(def, { w: w0, h: h0, quick: true, maxSeconds: 300, resizeAt: { t: 2500, w: w1, h: h1 } });
        expect(s.result, `${def.id} ${w0}×${h0}→${w1}×${h1}`).not.toBeNull();
      }
      const s = simulate(def, { quick: true, noCtxParams: true, maxSeconds: 300 });
      expect(s.result).not.toBeNull();
    });

    it(`${def.id}: reduzierte Bewegung und Ruckler (ausgelassene Bilder) ändern nichts am Ablauf`, () => {
      const a = simulate(def, { quick: true, reducedMotion: true, maxSeconds: 300 });
      expect(a.result).not.toBeNull();
      const b = simulate(def, { quick: true, skipFramesAt: [1500, 3000, 4500], maxSeconds: 300 });
      expect(b.result).not.toBeNull();
    });
  }

  it('Variantenschlüssel: alle Einstellungen außer „Prüfbild im Intro“ gehören dazu', async () => {
    const { variantKey } = await import('../../src/core/params');
    for (const def of ALL) {
      const base = variantKey(def.params, {});
      expect(base).not.toBe('');
      for (const p of def.params!) {
        const other = p.type === 'select' ? p.options.find((o) => o !== p.default)! : p.max !== p.default ? p.max : p.min;
        const key = variantKey(def.params, { [p.key]: other });
        if (p.neutral) expect(key, `${def.id}.${p.key}`).toBe(base);
        else expect(key, `${def.id}.${p.key}`).not.toBe(base);
      }
    }
  });
});

describe('Darstellung', () => {
  for (const def of ALL) {
    it(`${def.id}: Hinweistext und Tastenbeschriftungen werden gezeichnet (DE und IT), nichts Leeres`, () => {
      for (const lang of LANGS) {
        const s = simulate(def, { lang, quick: true, recordText: true, maxSeconds: 200 });
        expect(s.texts.length).toBeGreaterThan(5);
        for (const t of s.texts) expect(t).not.toMatch(/\{[a-zA-Z0-9]+\}|undefined|NaN/);
        const f = def.texts[lang].feedback;
        // mindestens ein Hinweis aus den Texten der Übung kommt auf die Bühne
        const hints = Object.entries(f).filter(([k]) => /^(hint|ask|alignHint|hintPlace|hintRotate|hintAdjust|chartHint)$/.test(k)).map(([, v]) => v);
        expect(hints.length).toBeGreaterThan(0);
        const drawn = s.texts.join(' ');
        const firstWords = hints.map((h) => h.replace(/\{[a-z]+\}/g, '').trim().split(/\s+/).slice(0, 2).join(' '));
        expect(firstWords.some((w) => drawn.includes(w)), `${def.id} ${lang}: ${firstWords.join(' | ')}`).toBe(true);
      }
    });
  }

  it('Farbe nie allein: Bedienung und Beschriftung in neutralem Hellgrau/Weiß (Brillen-Übungen), die Aufgabenfarben nur für die Reize', () => {
    for (const def of GLASSES) {
      const s = simulate(def, { quick: true, recordText: true, maxSeconds: 200 });
      // Texte auf der Bühne (Hinweise, Tasten) nicht in Rot oder Grün
      for (const { s: txt, fill } of s.textFills) {
        const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(fill) ?? [];
        if (m.length) {
          const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
          expect(Math.abs(r - g) <= 40 && Math.abs(g - b) <= 60, `${def.id}: „${txt}“ in ${fill}`).toBe(true);
        }
      }
    }
  });
});

describe('Bedienung von Hand', () => {
  const manual = (def: ExerciseDefinition, o: SimOpts = {}) => simulate(def, { autoplay: false, maxSeconds: 120, ...o });

  it('Worth: Tasten 2, 3, 4, 5 und „?“ beantworten der Reihe nach; Ergebnis zählt sie', () => {
    const answers = ['4', '2', '3', '5', '?', '4'];
    let k = 0;
    let last = -1;
    const s = manual(laborWorth, {
      params: { repeats: 6 },
      onFrame: (ex, now) => {
        if (now > 800 && Math.floor(now / 500) !== last && k < answers.length) {
          last = Math.floor(now / 500);
          ex.keyDown!(answers[k++], now);
        }
      },
    });
    const r = s.result!;
    expect(r).not.toBeNull();
    expect(r.primary.value).toBe(6);
    const sec = (key: string) => r.secondary.find((m) => m.key === key)!.value;
    expect([sec('lights4'), sec('lights2'), sec('lights3'), sec('lights5')]).toEqual([2, 1, 1, 1]);
  });

  it('Schober: Pfeiltasten schieben das Kreuz, Eingabe bestätigt; Schritte entsprechen der Schrittweite', () => {
    let phase = 0;
    let count = 0;
    const seen: number[] = [];
    const s = manual(laborSchober, {
      params: { axes: 'horizontal', stepPd: 1, startPd: 4 },
      onFrame: (ex, now) => {
        if (now < 800 || now % 100 > 17) return;
        if (phase === 0) {
          ex.keyDown!('ArrowRight', now);
          if (++count >= 8) {
            phase = 1;
            count = 0;
          }
        } else if (phase === 1) {
          ex.keyDown!('Enter', now);
          phase = 2;
        } else if (phase === 2) {
          ex.keyDown!(' ', now);
          phase = 3;
        }
        seen.push(phase);
      },
    });
    expect(s.result).not.toBeNull();
    expect(s.result!.primary.value).toBe(2);
    expect(s.sounds.filter((x) => x === 'tap').length).toBeGreaterThanOrEqual(2);
  });

  it('Diplopie: „1“ = ein Bild, „2“ = zwei Bilder, Ausgleich per Tipp und Eingabe, Karte per Eingabe schließen', () => {
    let step = 0;
    const s = manual(laborDiplopie, {
      onFrame: (ex, now, ctx) => {
        if (now < 800 || now % 200 > 17) return;
        const w = ctx.stage.w;
        const h = ctx.stage.h;
        if (step < 8) {
          ex.keyDown!('1', now);
          step++;
        } else if (step === 8) {
          ex.keyDown!('2', now);
          step++;
        } else if (step === 9) {
          ex.pointerDown!({ id: 1, x: w / 2 + 40, y: h / 2 - 20, t: now, type: 'mouse' });
          ex.pointerMove!({ id: 1, x: w / 2 + 60, y: h / 2 - 30, t: now, type: 'mouse' });
          ex.pointerUp!({ id: 1, x: w / 2 + 60, y: h / 2 - 30, t: now, type: 'mouse' });
          step++;
        } else if (step === 10) {
          ex.keyDown!('Enter', now);
          step++;
        } else if (step === 11) {
          ex.keyDown!('Enter', now);
          step++;
        }
      },
    });
    const r = s.result!;
    expect(r).not.toBeNull();
    expect(r.primary.value).toBe(9);
    expect(r.secondary.find((m) => m.key === 'double')!.value).toBe(1);
  });

  it('Hess: Ziehen (Zeiger bewegen), „OK“ per Eingabe, Karte per Eingabe; ohne Bewegung zählt „OK“ nicht', () => {
    let n = 0;
    const s = manual(laborHess, {
      params: { grid: 'inner', passes: 'one', maxDeg: 10 },
      onFrame: (ex, now, ctx) => {
        if (now < 800 || now % 150 > 17 || n > 40) return;
        const w = ctx.stage.w;
        const h = ctx.stage.h;
        n++;
        if (n % 3 === 1) ex.keyDown!('Enter', now); // zählt nicht: Zeiger nicht bewegt (oder Karte)
        else if (n % 3 === 2) {
          ex.pointerDown!({ id: 1, x: w / 2, y: h / 2, t: now, type: 'touch' });
          ex.pointerMove!({ id: 1, x: w / 2 + 20, y: h / 2 + 10, t: now, type: 'touch' });
          ex.pointerUp!({ id: 1, x: w / 2 + 20, y: h / 2 + 10, t: now, type: 'touch' });
        } else ex.keyDown!('Enter', now);
      },
    });
    const r = s.result!;
    expect(r).not.toBeNull();
    expect(r.primary.value).toBe(9);
  });

  it('Vertikale (Einstellen): Pfeiltasten verstellen, Leertaste bestätigt; Linie dreht nicht von allein', () => {
    let n = 0;
    const s = manual(laborVertikale, {
      params: { method: 'adjust', trials: 4 },
      onFrame: (ex, now) => {
        if (now < 1000 || now % 100 > 17 || n >= 4) return;
        for (let i = 0; i < 6; i++) ex.keyDown!(i % 2 ? 'ArrowLeft' : 'ArrowRight', now);
        ex.keyDown!(' ', now);
        n++;
      },
    });
    expect(s.result).not.toBeNull();
    expect(s.result!.primary.value).toBe(4);
  });

  it('Projektion: Tippen vor der Antwortphase zählt nicht, danach ja', () => {
    let early = 0;
    let n = 0;
    const s = manual(laborProjektion, {
      params: { trials: 6 },
      onFrame: (ex, now, ctx) => {
        // sofort nach dem Start: Tipp während Kreuz/Punkt (zählt nicht)
        if (now > 700 && now < 800 && early === 0) {
          early = 1;
          ex.pointerDown!({ id: 1, x: ctx.stage.w / 2, y: ctx.stage.h / 2, t: now, type: 'touch' });
        }
        if (now > 900 && now % 100 < 17) {
          ex.pointerDown!({ id: 1, x: ctx.stage.w / 2 + 30, y: ctx.stage.h / 2 + 30, t: now, type: 'touch' });
          n++;
        }
      },
    });
    const r = s.result!;
    expect(r).not.toBeNull();
    expect(r.primary.value).toBe(6);
  });

  it('Übungen ignorieren fremde Tasten und Berührungen vor dem Start ohne Fehler', () => {
    for (const def of ALL) {
      const s = simulate(def, {
        autoplay: true,
        quick: true,
        maxSeconds: 200,
        onFrame: (ex, now) => {
          if (now < 400) {
            ex.keyDown?.('x', now);
            ex.keyDown?.('Backspace', now);
            ex.pointerDown?.({ id: 5, x: -10, y: -10, t: now, type: 'touch' });
            ex.pointerMove?.({ id: 5, x: 99999, y: 99999, t: now, type: 'touch' });
            ex.pointerUp?.({ id: 5, x: 0, y: 0, t: now, type: 'touch' });
          }
        },
      });
      expect(s.result, def.id).not.toBeNull();
    }
  });
});

describe('Standardwerte', () => {
  it('Standardeinstellungen entsprechen den Vorgaben der Übungen', () => {
    expect(defaultParams(laborHess.params)).toMatchObject({ maxDeg: 20, grid: 'both', passes: 'both', targetCm: 0.8, markerCm: 0.8 });
    expect(defaultParams(laborWorth.params)).toMatchObject({ repeats: 4, dotCm: 1.2, varySize: 'yes' });
    expect(defaultParams(laborSchober.params)).toMatchObject({ axes: 'both', stepPd: 0.5, startPd: 6, crossColor: 'red', sizeCm: 5 });
    expect(defaultParams(laborDiplopie.params)).toMatchObject({ gazeDeg: 15, targetCm: 1 });
    expect(defaultParams(laborVertikale.params)).toMatchObject({ trials: 8, method: 'rotating', speedDegS: 1.5, startMaxDeg: 25, lineCm: 16 });
    expect(defaultParams(laborProjektion.params)).toMatchObject({ trials: 20, flashMs: 300, delayMs: 0, zone: 'all', showTarget: 'yes', sizeCm: 1 });
    for (const d of GLASSES) expect(defaultParams(d.params)).toMatchObject({ leftLens: 'red', tones: 'redgreen', redLevel: 100, secondLevel: 100, glassesCheck: 'steps' });
  });
});
