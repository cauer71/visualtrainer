import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Hellste Kugel',
  tagline: 'Finde die hellste Kugel – ganz ohne Zeitdruck.',
  steps: [
    'Mehrere graue Kugeln liegen beieinander.',
    'Eine davon ist ein kleines bisschen heller.',
    'Tippe sie an. Nimm dir so viel Zeit, wie du brauchst.',
  ],
  why:
    'Beim genauen Hinschauen vergleichst du Helligkeiten – zum Beispiel beim Sortieren von Fotos. Hier übst du das mit grauen Kugeln; der Unterschied wird mit deinem Erfolg feiner. Das ist kein Sehtest und kein Kontrastsehtest: Bildschirme zeigen Grautöne unterschiedlich, darum zählt nur der Vergleich mit dir selbst auf diesem Gerät. Ob die Übung im Alltag etwas bringt, ist nicht belegt.',
  goodFor: ['Fotos sortieren', 'Genau hinschauen', 'Helligkeiten vergleichen'],
  captions: {
    find: 'Tippe die hellste Kugel an',
    finer: 'Später wird der Unterschied feiner',
  },
  metrics: {
    level: 'Deine Stufe',
    accuracy: 'Richtig getippt',
    medTime: 'Mittlere Zeit',
  },
  tips: {
    compare: 'Geh die Kugeln in Ruhe durch und vergleiche sie miteinander. Sitz so, dass sich nichts im Bildschirm spiegelt.',
    great: 'Gut gemacht! Hier zählt genaues Hinschauen, nicht Tempo – nimm dir ruhig weiter Zeit.',
  },
  feedback: {
    level: 'Stufe',
    correct: 'Richtig',
    wrong: 'Nicht ganz',
    here: 'Hier war sie',
  },
};

export const it: ExerciseTexts = {
  title: 'La pallina più luminosa',
  tagline: 'Trova la pallina più luminosa – senza fretta.',
  steps: [
    'Diverse palline grigie stanno vicine.',
    'Una di loro è appena un po’ più chiara.',
    'Toccala. Prenditi tutto il tempo che ti serve.',
  ],
  why:
    'Quando guardi con attenzione confronti luminosità – per esempio quando ordini le foto. Qui lo eserciti con palline grigie; con il tuo successo la differenza diventa più sottile. Non è un test della vista né un test di sensibilità al contrasto: gli schermi mostrano i grigi in modo diverso, quindi conta solo il confronto con te stesso su questo dispositivo. Non è dimostrato che l’esercizio serva nella vita di tutti i giorni.',
  goodFor: ['Ordinare foto', 'Guardare con attenzione', 'Confrontare luminosità'],
  captions: {
    find: 'Tocca la pallina più luminosa',
    finer: 'Più avanti la differenza è più sottile',
  },
  metrics: {
    level: 'Il tuo livello',
    accuracy: 'Toccate giuste',
    medTime: 'Tempo medio',
  },
  tips: {
    compare: 'Passa in rassegna le palline con calma e confrontale tra loro. Siediti in modo che nulla si rifletta sullo schermo.',
    great: 'Ben fatto! Conta guardare con precisione, non la velocità – continua a prenderti il tuo tempo.',
  },
  feedback: {
    level: 'Livello',
    correct: 'Giusto',
    wrong: 'Non proprio',
    here: 'Era questa',
  },
};
