import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Vergleiche mit anderen. Es ist eine Touch-Übung am Bildschirm, keine Beinarbeit.

export const de: ExerciseTexts = {
  title: 'Sprossen-Leiter',
  tagline: 'Tippe die Felder der Leiter von unten nach oben – genau im Takt.',
  steps: [
    'Der Kreis oben gibt den Takt vor. Die nächste Sprosse atmet im selben Takt.',
    'Tippe sie genau im Schlag an, dann die nächste – im Zickzack nach oben.',
    'Danach siehst du bei jedem Feld, wie viele Millisekunden du daneben lagst.',
  ],
  why:
    'Bei dieser Übung tippst du mit dem Finger auf Felder am Bildschirm; Beine und Gleichgewicht spielen keine Rolle. Du übst, eine Reihenfolge von Orten in einem festen Rhythmus zu treffen – ähnlich wie Stufen in gleichmäßigem Schritt. Gemessen wird die Zeit zwischen Berührung und Taktschlag auf diesem Gerät; ein Teil davon ist die Verzögerung des Touchscreens. Es ist kein Reaktionstest, und der Vergleich gilt nur mit dir selbst. Ein Nutzen für Sport, Beweglichkeit oder den Alltag ist nicht belegt.',
  goodFor: ['Rhythmus halten', 'Reihenfolgen treffen', 'Finger und Blick abstimmen'],
  captions: {
    beat: 'Der Kreis gibt den Takt vor',
    tap: 'Tippe die Sprosse im Takt',
    up: 'Dann immer eine Sprosse höher',
    check: 'So nah am Takt warst du',
  },
  metrics: {
    level: 'Stufe',
    meanDev: 'Mittlere Abweichung',
    bias: 'Tendenz (− früh, + spät)',
    errors: 'Fehler',
  },
  tips: {
    count: 'Lass dich vom Kreis tragen: Tippe erst, wenn er am hellsten ist – nicht früher.',
    late: 'Du tippst meist etwas nach dem Schlag. Versuch es beim nächsten Mal einen Tick früher.',
    early: 'Du tippst meist etwas vor dem Schlag. Warte beim nächsten Mal einen Tick länger.',
    great: 'Schön im Takt! Beim nächsten Mal startest du etwas schneller.',
  },
  feedback: {
    level: 'Stufe',
    inBeat: 'im Takt',
    beat: 'Takt',
  },
};

export const it: ExerciseTexts = {
  title: 'Scala a pioli',
  tagline: 'Tocca i riquadri della scala dal basso verso l’alto – esattamente a tempo.',
  steps: [
    'Il cerchio in alto dà il ritmo. Il prossimo piolo «respira» allo stesso ritmo.',
    'Toccalo proprio sul battito, poi il successivo – a zigzag verso l’alto.',
    'Poi vedi per ogni riquadro di quanti millisecondi sei stato fuori tempo.',
  ],
  why:
    'In questo esercizio tocchi con il dito dei riquadri sullo schermo; gambe ed equilibrio non c’entrano. Eserciti a centrare una serie di punti con un ritmo fisso – un po’ come i gradini a passo regolare. Si misura il tempo tra il tocco e il battito su questo dispositivo; una parte è il ritardo dello schermo tattile. Non è un test di reazione e il confronto vale solo con te stesso. Un beneficio per sport, mobilità o vita quotidiana non è dimostrato.',
  goodFor: ['Mantenere il ritmo', 'Centrare una sequenza', 'Coordinare dito e sguardo'],
  captions: {
    beat: 'Il cerchio dà il ritmo',
    tap: 'Tocca il piolo a tempo',
    up: 'Poi sempre un piolo più su',
    check: 'Ecco quanto eri vicino al tempo',
  },
  metrics: {
    level: 'Livello',
    meanDev: 'Scostamento medio',
    bias: 'Tendenza (− presto, + tardi)',
    errors: 'Errori',
  },
  tips: {
    count: 'Lasciati guidare dal cerchio: tocca solo quando è più luminoso – non prima.',
    late: 'Tocchi di solito un po’ dopo il battito. La prossima volta prova un attimo prima.',
    early: 'Tocchi di solito un po’ prima del battito. La prossima volta aspetta un attimo in più.',
    great: 'Bene a tempo! La prossima volta parti un po’ più veloce.',
  },
  feedback: {
    level: 'Livello',
    inBeat: 'a tempo',
    beat: 'Ritmo',
  },
};
