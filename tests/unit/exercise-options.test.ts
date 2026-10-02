import { describe, expect, it } from 'vitest';
import { getExerciseOption, getExerciseOptions, getSettings, setExerciseOption, updateSettings } from '../../src/core/storage';
import type { ExerciseOptionDef } from '../../src/core/types';
import { vierZieleWechsel } from '../../src/exercises/vier-ziele-wechsel';

const metronome: ExerciseOptionDef = { key: 'metronome', choices: ['slow', 'medium', 'fast'], defaultChoice: 'medium' };

describe('Übungs-Optionen (Takt vor dem Start): Speicherung', () => {
  it('Standard: aus, Wahl „mittel“ – auch ohne jede gespeicherte Einstellung (ältere Datenstände)', () => {
    expect(getSettings().exerciseOptions).toBeUndefined();
    expect(getExerciseOption('vier-ziele-wechsel', metronome)).toEqual({ on: false, choice: 'medium' });
    expect(getExerciseOptions('vier-ziele-wechsel', vierZieleWechsel.options)).toEqual({ metronome: { on: false, choice: 'medium' } });
  });

  it('Übung ohne Optionen: keine Optionen im Kontext', () => {
    expect(getExerciseOptions('blitzreaktion', undefined)).toBeUndefined();
    expect(getExerciseOptions('blitzreaktion', [])).toBeUndefined();
  });

  it('gespeicherte Auswahl bleibt erhalten (Schalter und Tempo), je Übung getrennt', () => {
    setExerciseOption('vier-ziele-wechsel', 'metronome', { on: true, choice: 'fast' });
    expect(getExerciseOption('vier-ziele-wechsel', metronome)).toEqual({ on: true, choice: 'fast' });
    expect(getExerciseOptions('vier-ziele-wechsel', vierZieleWechsel.options)).toEqual({ metronome: { on: true, choice: 'fast' } });
    expect(getExerciseOption('andere-uebung', metronome)).toEqual({ on: false, choice: 'medium' });
    // Ausschalten merkt sich das Tempo
    setExerciseOption('vier-ziele-wechsel', 'metronome', { on: false, choice: 'fast' });
    expect(getExerciseOption('vier-ziele-wechsel', metronome)).toEqual({ on: false, choice: 'fast' });
    setExerciseOption('vier-ziele-wechsel', 'metronome', { on: true, choice: 'slow' });
    expect(getExerciseOption('vier-ziele-wechsel', metronome)).toEqual({ on: true, choice: 'slow' });
  });

  it('andere Einstellungen (Ton, Sprache) bleiben unberührt, die Optionen auch bei anderen Änderungen', () => {
    const before = getSettings();
    setExerciseOption('vier-ziele-wechsel', 'metronome', { on: true, choice: 'medium' });
    expect(getSettings().sound).toBe(before.sound);
    expect(getSettings().lang).toBe(before.lang);
    updateSettings({ sound: false });
    expect(getExerciseOption('vier-ziele-wechsel', metronome)).toEqual({ on: true, choice: 'medium' });
    updateSettings({ sound: true });
  });

  it('ungültige gespeicherte Wahl fällt auf den Standard zurück, der Schalter bleibt', () => {
    updateSettings({ exerciseOptions: { x: { metronome: { on: true, choice: 'turbo' } } } });
    expect(getExerciseOption('x', metronome)).toEqual({ on: true, choice: 'medium' });
    updateSettings({ exerciseOptions: { x: { metronome: { on: 'ja' as unknown as boolean, choice: 'fast' } } } });
    expect(getExerciseOption('x', metronome)).toEqual({ on: false, choice: 'fast' });
  });
});
