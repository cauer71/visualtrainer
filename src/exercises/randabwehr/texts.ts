import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Aussagen über das Gesichtsfeld, keine Gewalt-Begriffe.

export const de: ExerciseTexts = {
  title: 'Rand im Blick',
  tagline: 'Punkte gleiten vom Rand zur Mitte – fang sie ab, bevor sie dort sind.',
  steps: [
    'Schau auf das Kreuz in der Mitte.',
    'Vom Rand gleiten Punkte auf die Mitte zu.',
    'Tippe jeden Punkt an, bevor er die Mitte erreicht.',
  ],
  why:
    'Im Alltag bemerkst du oft etwas „aus dem Augenwinkel“, während du geradeaus schaust – etwa ein Kind, das von der Seite ins Bild läuft. Hier bleibt die Mitte dein Fixpunkt, und du beachtest, was vom Rand kommt. Mit deinem Erfolg werden die Punkte schneller und zahlreicher. Ob dein Blick wirklich in der Mitte bleibt, wird nicht gemessen, und ob sich die Übung auf Alltag, Sport oder Verkehr überträgt, ist nicht belegt.',
  goodFor: ['Den Rand im Blick behalten', 'Ballspiele', 'Spielen mit Kindern'],
  captions: {
    edge: 'Vom Rand kommen Punkte',
    tap: 'Antippen, bevor sie in der Mitte sind',
    fix: 'Die Mitte bleibt dein Blickpunkt',
  },
  metrics: {
    level: 'Deine Stufe',
    caught: 'Abgefangen',
    passed: 'Durchgelassen',
    count: 'Anzahl Punkte',
  },
  tips: {
    many: 'Einige Punkte sind durchgerutscht. Tippe früher – schon kurz nachdem ein Punkt auftaucht, darfst du ihn antippen.',
    late: 'Du fängst die Punkte meist erst kurz vor der Mitte. Tippe früher – dann bleibt Zeit für den nächsten.',
    great: 'Stark! Du behältst den Rand gut im Blick. Bleib locker – dann klappt es auch bei mehr Tempo.',
  },
  feedback: {
    level: 'Stufe',
    passed: 'Durchgelassen',
  },
};

export const it: ExerciseTexts = {
  title: 'Sguardo ai bordi',
  tagline: 'I punti scivolano dal bordo al centro – intercettali prima che arrivino.',
  steps: [
    'Guarda la croce al centro.',
    'Dal bordo scivolano dei punti verso il centro.',
    'Tocca ogni punto prima che raggiunga il centro.',
  ],
  why:
    'Nella vita di tutti i giorni noti spesso qualcosa “con la coda dell’occhio” mentre guardi avanti – per esempio un bambino che entra nell’immagine da un lato. Qui il centro resta il tuo punto fisso e tu fai attenzione a ciò che arriva dal bordo. Con il tuo successo i punti diventano più veloci e più numerosi. Se lo sguardo resta davvero al centro non viene misurato, e non è dimostrato che l’esercizio si trasferisca alla vita quotidiana, allo sport o al traffico.',
  goodFor: ['Tenere d’occhio i bordi', 'Giochi con la palla', 'Giocare con i bambini'],
  captions: {
    edge: 'Dal bordo arrivano dei punti',
    tap: 'Tocca prima che siano al centro',
    fix: 'Il centro resta il tuo punto fisso',
  },
  metrics: {
    level: 'Il tuo livello',
    caught: 'Intercettati',
    passed: 'Lasciati passare',
    count: 'Numero di punti',
  },
  tips: {
    many: 'Alcuni punti sono passati. Tocca prima – puoi toccare un punto subito dopo che compare.',
    late: 'Di solito intercetti i punti solo poco prima del centro. Tocca prima – così resta tempo per il prossimo.',
    great: 'Ottimo! Tieni bene d’occhio i bordi. Resta rilassato – così ce la fai anche a velocità più alte.',
  },
  feedback: {
    level: 'Livello',
    passed: 'Passato',
  },
};
