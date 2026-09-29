import type { ExerciseTexts } from '../../core/types';

/*
 * Platzhalter in feedback-Texten: {n} = Zahl.
 */

export const de: ExerciseTexts = {
  title: 'Aus dem Takt',
  tagline: 'Finde das Feld, das aus dem Takt pulsiert.',
  steps: [
    'Alle Felder pulsieren ruhig im gleichen Tempo.',
    'Eines ist schneller oder langsamer – finde es!',
    'Schau kurz zu, dann tippe es an.',
  ],
  why:
    'Alle Felder pulsieren gleich hell – nur eines hat ein anderes Tempo. Du übst, genau hinzuschauen und Rhythmen zu vergleichen; klappt es gut, wird der Unterschied kleiner. Ob sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Blinker im Verkehr', 'Warnlichter', 'Tanzen in der Gruppe'],
  captions: {
    find: 'Ein Feld pulsiert schneller – finde es!',
    good: 'Richtig!',
    again: 'Nochmal: Welches ist aus dem Takt?',
  },
  metrics: {
    level: 'Feingefühl',
    accuracy: 'Treffsicherheit',
    smallest: 'Kleinster Unterschied',
    time: 'Ø Zeit bis zum Tippen',
  },
  tips: {
    watch: 'Nicht zu schnell tippen: Schau dir 2–3 Pulse an, dann fällt das Feld aus dem Takt auf.',
    soft: 'Lass den Blick weich über alle Felder gleiten, statt eines anzustarren.',
    great: 'Sehr fein! Bleib locker – je ruhiger dein Blick, desto eher fällt dir der Unterschied auf.',
  },
  feedback: {
    level: 'Stufe {n}',
    timeout: 'Hier war es!',
    early: 'Erst kurz zuschauen …',
  },
};

export const it: ExerciseTexts = {
  title: 'Fuori tempo',
  tagline: 'Trova il riquadro che pulsa fuori tempo.',
  steps: [
    'Tutti i riquadri pulsano piano, allo stesso ritmo.',
    'Uno è più veloce o più lento – trovalo!',
    'Osserva un attimo, poi toccalo.',
  ],
  why:
    'Tutti i riquadri pulsano con la stessa luminosità – solo uno ha un ritmo diverso. Ti eserciti a guardare con attenzione e a confrontare i ritmi; se va bene, la differenza diventa più piccola. Che questo serva anche nella vita di tutti i giorni, non è dimostrato.',
  goodFor: ['Frecce nel traffico', 'Spie luminose', 'Ballare in gruppo'],
  captions: {
    find: 'Un riquadro pulsa più veloce – trovalo!',
    good: 'Giusto!',
    again: 'Ancora: quale va fuori tempo?',
  },
  metrics: {
    level: 'Sensibilità',
    accuracy: 'Risposte giuste',
    smallest: 'Differenza più piccola',
    time: 'Tempo medio per decidere',
  },
  tips: {
    watch: 'Non toccare troppo in fretta: osserva 2–3 pulsazioni, poi il riquadro fuori tempo salta all’occhio.',
    soft: 'Lascia scorrere lo sguardo, morbido, su tutti i riquadri, invece di fissarne uno.',
    great: 'Molto bene! Resta rilassato – più lo sguardo è calmo, prima noti la differenza.',
  },
  feedback: {
    level: 'Livello {n}',
    timeout: 'Era qui!',
    early: 'Osserva ancora un attimo …',
  },
};
