import { describe, expect, it } from 'vitest';
import { sanitizeParams, variantKey } from '../../src/core/params';
import { fusionLayout } from '../../src/exercises/labor-fusion/layout';
import {
  directionOrder,
  fusionParams,
  FusionSession,
  HARD_MAX_PD,
  LIVE_MAX_JUMP_PD,
  PARAMS,
  pointsFor,
  READY_MS,
  summarize,
  tipFor,
  type FusionParams,
  type FusionTrial,
} from '../../src/exercises/labor-fusion/logic';
import { laborFusion } from '../../src/exercises/labor-fusion';

const params = (over: Record<string, unknown> = {}): FusionParams => fusionParams(sanitizeParams(PARAMS, over));

/** Zeit in Schritten von 1/60 s fortschreiben; gibt die neue Zeit zurück */
function advance(s: FusionSession, from: number, ms: number): number {
  let t = from;
  const end = from + ms;
  while (t < end) {
    t += 1000 / 60;
    s.update(t);
  }
  return t;
}

/** Bis zum Ende der Ruhezeit laufen lassen: danach ist die Phase „up“ */
function toUp(s: FusionSession, t: number): number {
  return advance(s, t, READY_MS + 200);
}

function make(over: Record<string, unknown> = {}, trainerAvailable = true): { s: FusionSession; t: number } {
  const s = new FusionSession(params(over), { trainerAvailable });
  s.start(0);
  return { s, t: 0 };
}

describe('Einstellungen', () => {
  it('Standard: Richtung im Wechsel, automatisch, 1,5 Δ/s, Start 0, Obergrenze 25 Δ, 3 Wiederholungen, Ziel 6 cm, Prüfbild Schritt für Schritt', () => {
    const p = params();
    expect(p).toMatchObject({ direction: 'both', control: 'auto', rampPdPerS: 1.5, startPd: 0, maxPd: 25, repeats: 3, targetCm: 6, leftLens: 'red', tones: 'redgreen', redLevel: 100, secondLevel: 100, glassesCheck: 'steps' });
  });

  it('Grenzen: Obergrenze höchstens 40 Δ, Änderung 0,5–6 Δ/s, Wiederholungen 1–6, Ziel 2–14 cm; ungültige Werte → Standard bzw. begrenzt', () => {
    expect(params({ maxPd: 99 }).maxPd).toBe(HARD_MAX_PD);
    expect(HARD_MAX_PD).toBe(40);
    expect(params({ maxPd: 1 }).maxPd).toBe(5);
    expect(params({ rampPdPerS: 99 }).rampPdPerS).toBe(6);
    expect(params({ repeats: 0 }).repeats).toBe(1);
    expect(params({ targetCm: 100 }).targetCm).toBe(14);
    expect(params({ direction: 'bogus', control: 'x' })).toMatchObject({ direction: 'both', control: 'auto' });
    expect(fusionParams({})).toMatchObject({ maxPd: 25, repeats: 3 });
    // Startversatz nie über der Obergrenze
    expect(params({ startPd: 10, maxPd: 5 }).startPd).toBe(5);
  });

  it('Variantenschlüssel: Startwert und Steuerungsart gehören dazu, Prüfbild-Ansicht nicht', () => {
    const key = (o: Record<string, unknown>) => variantKey(PARAMS, sanitizeParams(PARAMS, o));
    expect(key({ control: 'trainer' })).not.toBe(key({}));
    expect(key({ startPd: 2 })).not.toBe(key({}));
    expect(key({ maxPd: 30 })).not.toBe(key({}));
    expect(key({ direction: 'convergence' })).not.toBe(key({}));
    expect(key({ glassesCheck: 'simple' })).toBe(key({}));
    expect(key({ control: 'trainer' })).toContain('control=trainer');
    expect(key({ startPd: 2 })).toContain('startPd=2');
  });

  it('Reihenfolge der Richtungen', () => {
    expect(directionOrder('both', 2)).toEqual(['convergence', 'divergence', 'convergence', 'divergence']);
    expect(directionOrder('divergence', 3)).toEqual(['divergence', 'divergence', 'divergence']);
    expect(directionOrder('convergence', 1)).toEqual(['convergence']);
  });
});

describe('Ablauf automatisch: Doppelt, Wieder einfach', () => {
  it('erst ruhiges einfaches Bild (Versatz 0), dann wächst der Versatz mit Δ pro Sekunde', () => {
    const { s, t } = make({ repeats: 1, direction: 'convergence' });
    expect(s.phase).toBe('ready');
    expect(s.shift).toBe(0);
    let tt = advance(s, t, READY_MS - 200);
    expect(s.phase).toBe('ready');
    expect(s.shift).toBe(0);
    tt = advance(s, tt, 400);
    expect(s.phase).toBe('up');
    const at = s.shift;
    tt = advance(s, tt, 2000);
    expect(s.shift - at).toBeCloseTo(3, 1);
  });

  it('„Doppelt“ speichert den angezeigten Wert, danach schrumpft er; „Wieder einfach“ speichert ihn und beendet den Durchgang', () => {
    const { s, t } = make({ repeats: 1, direction: 'convergence', rampPdPerS: 2 });
    let tt = toUp(s, t);
    tt = advance(s, tt, 2500);
    const shown = s.shift;
    expect(shown).toBeGreaterThan(4);
    const r = s.reportDouble(tt);
    expect(r?.pd).toBeCloseTo(shown, 6);
    expect(s.phase).toBe('down');
    tt = advance(s, tt, 1500);
    expect(s.shift).toBeLessThan(shown - 2);
    const back = s.shift;
    expect(s.reportSingle(tt)?.pd).toBeCloseTo(back, 6);
    expect(s.trials).toHaveLength(1);
    const tr = s.trials[0];
    expect(tr.breakPd).toBeCloseTo(shown, 1);
    expect(tr.recoveryPd).toBeCloseTo(back, 1);
    expect(tr.recoveryPd!).toBeLessThan(tr.breakPd);
    expect(tr.capped).toBe(false);
    expect(tr.noRecovery).toBe(false);
    expect(s.finished).toBe(true);
    expect(s.phase).toBe('done');
  });

  it('Meldungen in der falschen Phase werden nicht angenommen', () => {
    const { s, t } = make({ repeats: 1, direction: 'convergence' });
    expect(s.reportDouble(t)).toBeNull(); // noch in der Ruhezeit
    expect(s.reportSingle(t)).toBeNull();
    const tt = toUp(s, t);
    expect(s.reportSingle(tt)).toBeNull(); // „Wieder einfach“ erst nach „Doppelt“
    expect(s.reportDouble(tt)).not.toBeNull();
    expect(s.reportDouble(tt)).toBeNull(); // nur einmal
  });

  it('Obergrenze erreicht, ohne „Doppelt“: Durchgang gilt als „bis zur Obergrenze“, der Versatz geht zurück; bei 0 ohne „Wieder einfach“: „ohne Erholung“', () => {
    const { s, t } = make({ repeats: 1, direction: 'divergence', maxPd: 5, rampPdPerS: 6 });
    let tt = toUp(s, t);
    tt = advance(s, tt, 2000);
    expect(s.phase === 'down' || s.finished).toBe(true);
    tt = advance(s, tt, 2000);
    expect(s.finished).toBe(true);
    const tr = s.trials[0];
    expect(tr.capped).toBe(true);
    expect(tr.breakPd).toBe(5);
    expect(tr.noRecovery).toBe(true);
    expect(tr.recoveryPd).toBeNull();
  });

  it('Durchgang für Durchgang: jeder beginnt wieder bei 0 und in der Reihenfolge der Richtungen', () => {
    const { s, t } = make({ repeats: 2, direction: 'both', rampPdPerS: 6 });
    let tt = t;
    const dirs: string[] = [];
    for (let i = 0; i < 4; i++) {
      expect(s.shift).toBeLessThan(0.01);
      tt = toUp(s, tt);
      dirs.push(s.dir);
      tt = advance(s, tt, 600);
      s.reportDouble(tt);
      tt = advance(s, tt, 300);
      s.reportSingle(tt);
    }
    expect(dirs).toEqual(['convergence', 'divergence', 'convergence', 'divergence']);
    expect(s.finished).toBe(true);
    expect(s.trials.map((x) => x.nr)).toEqual([1, 2, 3, 4]);
  });

  it('Startversatz: jeder Durchgang beginnt dort', () => {
    const { s } = make({ startPd: 3, repeats: 1 });
    expect(s.shift).toBe(3);
  });

  it('Kontrollstriche: nur während der Durchgänge, je Farbe gezählt, mehrfach möglich', () => {
    const { s, t } = make({ repeats: 1, direction: 'convergence', rampPdPerS: 6 });
    expect(s.reportMissing('a')).toBe(true);
    const tt = toUp(s, t);
    s.reportMissing('b');
    s.reportMissing('b');
    s.reportDouble(tt);
    s.reportSingle(tt + 100);
    expect(s.trials[0]).toMatchObject({ missA: 1, missB: 2 });
    expect(s.reportMissing('a')).toBe(false); // nach dem Ende
    expect(s.summary()).toMatchObject({ missA: 1, missB: 2 });
  });
});

describe('Auswertung', () => {
  const trial = (o: Partial<FusionTrial>): FusionTrial => ({ nr: 1, direction: 'convergence', breakPd: 10, recoveryPd: 6, capped: false, noRecovery: false, missA: 0, missB: 0, liveChanges: 0, ...o });

  it('Mittel je Richtung; Durchgänge bis zur Obergrenze und ohne Erholung zählen nicht in die Mittelwerte, werden aber gezählt', () => {
    const sum = summarize([
      trial({ breakPd: 8, recoveryPd: 4 }),
      trial({ breakPd: 12, recoveryPd: 8 }),
      trial({ breakPd: 25, recoveryPd: null, capped: true, noRecovery: true }),
      trial({ direction: 'divergence', breakPd: 6, recoveryPd: 3 }),
    ]);
    expect(sum.n).toBe(4);
    expect(sum.conv).toMatchObject({ n: 3, breakMean: 10, recoveryMean: 6, capped: 1, noRecovery: 1 });
    expect(sum.div).toMatchObject({ n: 1, breakMean: 6, recoveryMean: 3 });
    expect(sum.breakMean).toBeCloseTo(8.7, 1);
    expect(sum.capped).toBe(1);
    expect(sum.noRecovery).toBe(1);
  });

  it('leer oder nur Obergrenze: keine Mittelwerte statt NaN', () => {
    const empty = summarize([]);
    expect(empty).toMatchObject({ n: 0, breakMean: null, capped: 0 });
    expect(empty.conv.breakMean).toBeNull();
    const capped = summarize([trial({ capped: true, noRecovery: true, recoveryPd: null })]);
    expect(capped.breakMean).toBeNull();
    expect(capped.conv.breakMean).toBeNull();
    expect(capped.conv.recoveryMean).toBeNull();
  });

  it('Striche und Regleränderungen werden summiert', () => {
    const sum = summarize([trial({ missA: 1, liveChanges: 2 }), trial({ missA: 2, missB: 1, liveChanges: 1 })]);
    expect(sum).toMatchObject({ missA: 3, missB: 1, liveChanges: 3 });
  });

  it('Tipps nach den eigenen Faustregeln und Punkte', () => {
    expect(tipFor(summarize([]))).toBe('few');
    expect(tipFor(summarize([trial({ noRecovery: true, recoveryPd: null }), trial({ noRecovery: true, recoveryPd: null })]))).toBe('noRecovery');
    expect(tipFor(summarize([trial({ capped: true }), trial({ capped: true })]))).toBe('capped');
    expect(tipFor(summarize([trial({ missB: 1 }), trial({})]))).toBe('strokes');
    expect(tipFor(summarize([trial({}), trial({})]))).toBe('compare');
    expect(pointsFor(3)).toBe(30);
    expect(pointsFor(-1)).toBe(0);
  });
});

describe('Trainer-Regler: automatisch (Versatz = automatischer Wert + Zusatz)', () => {
  it('der Zusatz wirkt sofort auf den angezeigten Versatz und gleitet weich; höchstens 2 Δ je Änderung', () => {
    const { s, t } = make({ repeats: 1, direction: 'convergence', rampPdPerS: 1 });
    let tt = toUp(s, t);
    tt = advance(s, tt, 500);
    const before = s.shift;
    expect(s.setLive(10, tt)).toBe(2); // gewünscht 10, begrenzt auf +2
    expect(s.live.target).toBe(2);
    // Anzeige gleitet: nach 50 ms erst ein Teil, nach 250 ms komplett
    tt = advance(s, tt, 50);
    expect(s.shift - before).toBeGreaterThan(0);
    expect(s.shift - before).toBeLessThan(1.6);
    tt = advance(s, tt, 250);
    expect(s.shift - before).toBeGreaterThan(1.9);
    expect(s.shift - before).toBeLessThan(2.4);
  });

  it('kein Sprung über 2 Δ pro Anzeigebild: Anzeige springt nie', () => {
    const { s, t } = make({ repeats: 1, direction: 'convergence', rampPdPerS: 1 });
    let tt = toUp(s, t);
    s.setLive(2, tt);
    let prev = s.shift;
    let steps = 0;
    while (!s.live.settled && steps++ < 600) {
      tt += 1000 / 60;
      s.update(tt);
      expect(Math.abs(s.shift - prev)).toBeLessThan(0.5);
      prev = s.shift;
    }
    expect(steps * (1000 / 60)).toBeGreaterThanOrEqual(150);
  });

  it('„Doppelt“ speichert den angezeigten Wert samt Zusatz', () => {
    const { s, t } = make({ repeats: 1, direction: 'convergence', rampPdPerS: 1 });
    let tt = toUp(s, t);
    s.setLive(2, tt);
    tt = advance(s, tt, 400);
    const shown = s.shift;
    expect(shown).toBeGreaterThanOrEqual(2);
    s.reportDouble(tt);
    expect(s.trials.length).toBe(0);
    s.reportSingle(tt);
    expect(s.trials[0].breakPd).toBeCloseTo(shown, 1);
    expect(s.trials[0].liveChanges).toBe(1);
  });

  it('negativer Zusatz senkt den Versatz, aber nie unter 0; die Obergrenze gilt weiter', () => {
    const { s, t } = make({ repeats: 1, maxPd: 5, rampPdPerS: 1, direction: 'convergence' });
    let tt = toUp(s, t);
    for (let i = 0; i < 6; i++) {
      s.setLive(s.live.target - 2, tt);
      tt = advance(s, tt, 300);
    }
    expect(s.shift).toBeGreaterThanOrEqual(0);
    expect(s.shift).toBeLessThan(0.05);
    // Zusatz nach oben: Versatz nie über der Obergrenze
    for (let i = 0; i < 10; i++) {
      s.setLive(s.live.target + 2, tt);
      tt = advance(s, tt, 300);
      expect(s.shift).toBeLessThanOrEqual(5 + 1e-9);
      if (s.phase !== 'up') break;
    }
  });

  it('der Zusatz beginnt in jedem Durchgang wieder bei 0 (Versatz zu Beginn ist einfach)', () => {
    const { s, t } = make({ repeats: 2, direction: 'convergence', rampPdPerS: 6 });
    let tt = toUp(s, t);
    s.setLive(2, tt);
    tt = advance(s, tt, 300);
    s.reportDouble(tt);
    tt = advance(s, tt, 200);
    s.reportSingle(tt);
    expect(s.idx).toBe(1);
    expect(s.live.target).toBe(0);
    tt = advance(s, tt, 600);
    expect(s.shift).toBeLessThan(0.1);
    expect(s.phase).toBe('ready');
  });

  it('Protokoll mit Zeitpunkt, Wert, Durchgang und Gesamtwert', () => {
    const { s, t } = make({ repeats: 2, direction: 'convergence', rampPdPerS: 1 });
    const tt = toUp(s, t);
    s.setLive(1, tt);
    s.setLive(1.5, tt + 500);
    s.setLive(1.5, tt + 600); // keine Änderung → kein Eintrag
    expect(s.live.log).toHaveLength(2);
    expect(s.live.log[0]).toMatchObject({ value: 1, trial: 1 });
    expect(s.live.log[0].t).toBe(Math.round(tt));
    expect(s.live.log[1].value).toBe(1.5);
    expect(s.live.log[1].total).toBeGreaterThan(1.5);
  });

  it('vor dem Start und nach dem Ende wirkt der Regler nicht', () => {
    const s = new FusionSession(params({ repeats: 1 }), { trainerAvailable: true });
    expect(s.setLive(1, 0)).toBeNull();
    s.start(0);
    expect(s.setLive(1, 0)).toBe(1);
  });

  it('die Obergrenze des Bildschirms (limitPd) begrenzt den angezeigten Versatz und löst „bis zur Obergrenze“ aus', () => {
    const { s, t } = make({ repeats: 1, direction: 'convergence', maxPd: 25, rampPdPerS: 6 });
    s.limitPd = 4;
    expect(s.capPd).toBe(4);
    let tt = toUp(s, t);
    tt = advance(s, tt, 1500);
    expect(s.shift).toBeLessThanOrEqual(4 + 1e-9);
    advance(s, tt, 2000);
    expect(s.trials[0].capped).toBe(true);
    expect(s.trials[0].breakPd).toBe(4);
  });
});

describe('Trainer-Regler: Modus „Trainer“ (nur der Regler bestimmt den Versatz)', () => {
  it('Start = Startversatz; ohne Reglerbewegung ändert sich der Versatz nicht', () => {
    const { s, t } = make({ control: 'trainer', startPd: 2, repeats: 1, direction: 'convergence' });
    expect(s.trainerMode).toBe(true);
    let tt = toUp(s, t);
    expect(s.phase).toBe('up');
    expect(s.shift).toBe(2);
    tt = advance(s, tt, 3000);
    expect(s.shift).toBe(2);
    expect(s.phase).toBe('up');
  });

  it('Der Regler führt den Versatz; „Doppelt“ und „Wieder einfach“ speichern den dann angezeigten Wert', () => {
    const { s, t } = make({ control: 'trainer', startPd: 0, repeats: 1, direction: 'divergence' });
    let tt = toUp(s, t);
    for (let i = 0; i < 4; i++) {
      s.setLive(s.live.target + 2, tt);
      tt = advance(s, tt, 400);
    }
    expect(s.shift).toBeCloseTo(8, 1);
    s.reportDouble(tt);
    expect(s.phase).toBe('down');
    for (let i = 0; i < 2; i++) {
      s.setLive(s.live.target - 2, tt);
      tt = advance(s, tt, 400);
    }
    expect(s.shift).toBeCloseTo(4, 1);
    s.reportSingle(tt);
    const tr = s.trials[0];
    expect(tr.breakPd).toBeCloseTo(8, 1);
    expect(tr.recoveryPd).toBeCloseTo(4, 1);
    expect(tr.liveChanges).toBe(6);
  });

  it('Gleiten: bei Meldung während des Gleitens zählt der Wert der Anzeige, nicht das Ziel', () => {
    const { s, t } = make({ control: 'trainer', startPd: 0, repeats: 1 });
    let tt = toUp(s, t);
    s.setLive(2, tt);
    tt = advance(s, tt, 60);
    const mid = s.shift;
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(2);
    s.reportDouble(tt);
    expect(s.phase).toBe('down');
  });

  it('Obergrenze: der Regler kommt nie über maxPd, dann „bis zur Obergrenze“', () => {
    const { s, t } = make({ control: 'trainer', maxPd: 5, repeats: 1, direction: 'convergence' });
    let tt = toUp(s, t);
    for (let i = 0; i < 6; i++) {
      s.setLive(s.live.target + 2, tt);
      tt = advance(s, tt, 400);
    }
    expect(s.live.target).toBe(5);
    expect(s.shift).toBeLessThanOrEqual(5);
    expect(s.phase).toBe('down');
    expect(s.trials.length === 0).toBe(true);
    // Regler zurück auf 0: Durchgang endet ohne Erholung
    for (let i = 0; i < 4; i++) {
      s.setLive(s.live.target - 2, tt);
      tt = advance(s, tt, 400);
    }
    expect(s.finished).toBe(true);
    expect(s.trials[0]).toMatchObject({ capped: true, noRecovery: true, breakPd: 5 });
  });

  it('ohne verfügbaren Regler läuft „Trainer“ automatisch (kein Stillstand)', () => {
    const { s, t } = make({ control: 'trainer', repeats: 1, direction: 'convergence', rampPdPerS: 2 }, false);
    expect(s.trainerMode).toBe(false);
    let tt = toUp(s, t);
    tt = advance(s, tt, 1500);
    expect(s.shift).toBeGreaterThan(2);
  });

  it('kein Sprung über 2 Δ je Tastendruck auch im Modus „Trainer“', () => {
    const { s, t } = make({ control: 'trainer', repeats: 1 });
    const tt = toUp(s, t);
    s.setLive(30, tt);
    expect(s.live.target).toBe(LIVE_MAX_JUMP_PD);
    s.setLive(30, tt);
    expect(s.live.target).toBe(2 * LIVE_MAX_JUMP_PD);
  });
});

describe('Anordnung', () => {
  const stages = [
    { name: 'Tablet quer', w: 1180, h: 770 },
    { name: 'Tablet hoch', w: 820, h: 1120 },
    { name: 'Handy', w: 390, h: 640 },
    { name: 'Handy quer', w: 780, h: 290 },
  ];
  for (const st of stages) {
    for (const maxPd of [5, 25, 40]) {
      it(`${st.name}, bis ${maxPd} Δ: Tasten ≥ 56 px, alles auf der Bühne, nichts überlappt, beide Zielbilder bleiben am größten Versatz auf der Bühne`, () => {
        const u = Math.min(st.w, st.h) / 100;
        const need = (maxPd * 40 * 38) / 100;
        const L = fusionLayout({ w: st.w, h: st.h, u, captionReserve: 0, demo: false, wantDiameterPx: 6 * 38, needShiftPx: need });
        for (const r of [L.main, L.missA, L.missB]) {
          expect(r.w).toBeGreaterThanOrEqual(56);
          expect(r.h).toBeGreaterThanOrEqual(56);
          expect(r.x).toBeGreaterThanOrEqual(0);
          expect(r.x + r.w).toBeLessThanOrEqual(st.w + 0.5);
          expect(r.y + r.h).toBeLessThanOrEqual(st.h + 0.5);
        }
        expect(L.main.y + L.main.h).toBeLessThanOrEqual(L.missA.y + 0.5);
        expect(L.missA.x + L.missA.w).toBeLessThanOrEqual(L.missB.x + 0.5);
        // Ziel samt Kontrollstrichen zwischen Hinweiszeile und großer Taste
        const top = L.cy - L.r * 1.9;
        const bottom = L.cy + L.r * 1.9;
        expect(top).toBeGreaterThanOrEqual(L.msgY);
        expect(bottom).toBeLessThanOrEqual(L.main.y + 0.5);
        // größter Versatz: beide Bilder inklusive Randstriche auf der Bühne
        expect(L.maxShiftPx).toBeLessThanOrEqual(need + 1e-6);
        expect(L.cx - L.maxShiftPx / 2 - 1.28 * L.r).toBeGreaterThanOrEqual(-0.5);
        expect(L.cx + L.maxShiftPx / 2 + 1.28 * L.r).toBeLessThanOrEqual(st.w + 0.5);
        expect(L.r).toBeGreaterThan(0);
      });
    }
  }

  it('Tablet quer: der gewünschte Versatz bis 25 Δ passt voll, das Ziel behält seine Größe', () => {
    const L = fusionLayout({ w: 1180, h: 770, u: 7.7, captionReserve: 0, demo: false, wantDiameterPx: 6 * 38, needShiftPx: (25 * 40 * 38) / 100 });
    expect(L.maxShiftPx).toBeCloseTo((25 * 40 * 38) / 100, 6);
    expect(L.r).toBeGreaterThan(100);
  });

  it('Handy: bei 40 Δ wird erst das Ziel kleiner, dann der Versatz begrenzt (Ziel bleibt sichtbar)', () => {
    const need = (40 * 40 * 38) / 100;
    const L = fusionLayout({ w: 390, h: 640, u: 3.9, captionReserve: 0, demo: false, wantDiameterPx: 6 * 38, needShiftPx: need });
    expect(L.maxShiftPx).toBeLessThan(need);
    expect(L.r).toBeGreaterThanOrEqual(10);
    expect(L.r).toBeLessThan(6 * 38 / 2);
  });

  it('Zielgröße folgt dem Wunsch, bleibt aber in der Höhe der Bühne', () => {
    const big = fusionLayout({ w: 1180, h: 400, u: 4, captionReserve: 0, demo: false, wantDiameterPx: 600, needShiftPx: 0 });
    expect(big.cy + big.r * 1.9).toBeLessThanOrEqual(big.main.y + 0.5);
  });

  it('Film: kleine Bühne mit Platz für die Bildunterschrift, Tasten dürfen schrumpfen', () => {
    const L = fusionLayout({ w: 520, h: 300, u: 3, captionReserve: 70, demo: true, wantDiameterPx: 3.6 * 23, needShiftPx: (14 * 40 * 23) / 100 });
    expect(L.missA.y + L.missA.h).toBeLessThanOrEqual(300 - 70 + 0.5);
    expect(L.main.h).toBeGreaterThan(0);
    expect(L.cy - L.r * 1.9).toBeGreaterThanOrEqual(0);
  });
});

describe('Definition', () => {
  it('Kennung, Kategorie, Marke labor, Kalibrierung, keine Stufen, 3 Minuten', () => {
    expect(laborFusion).toMatchObject({ id: 'labor-fusion', category: 'wahrnehmung', tags: ['labor'], showsLevel: false, usesCalibration: true });
    expect(laborFusion.minutes).toBeGreaterThanOrEqual(2);
    expect(typeof laborFusion.colorCheck).toBe('function');
    expect(laborFusion.liveControls).toHaveLength(1);
  });
});
