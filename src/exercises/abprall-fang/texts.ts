import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Vergleiche mit anderen.

export const de: ExerciseTexts = {
  title: 'Abprall-Fang',
  tagline: 'Sieh voraus, wo der Punkt am Rand abprallt – und tippe dorthin.',
  steps: [
    'Ein Punkt gleitet durchs Feld und prallt am Rahmen ab.',
    'Überlege, wo er den Rand berühren wird.',
    'Tippe auf diese Stelle, bevor er dort ankommt.',
  ],
  why:
    'Bälle prallen ab, Autos biegen um die Ecke: Im Alltag schätzt du oft, wohin sich etwas bewegt, bevor es dort ist. Hier siehst du den Punkt die ganze Zeit und sagst die Stelle am Rand voraus – später sogar erst den übernächsten Abprall. Danach siehst du, wie nah du dran warst. Wohin dein Blick dabei wirklich geht, wird nicht gemessen, und ob sich das auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Bahnen vorausahnen', 'Ballspiele', 'Bewegungen einschätzen'],
  captions: {
    watch: 'Schau, wie der Punkt gleitet',
    tap: 'Tippe dorthin, wo er abprallt',
    check: 'So nah warst du dran',
  },
  metrics: {
    level: 'Deine Stufe',
    meanError: 'Mittlere Abweichung',
    accuracy: 'Trefferquote',
    maxLevel: 'Höchste Stufe',
    hits: 'Treffer',
  },
  tips: {
    far: 'Achte auf die Richtung, in die der Punkt gleitet – der Rand gibt den Abprall vor: Der Winkel bleibt gleich, nur gespiegelt.',
    late: 'Du tippst oft erst, wenn der Punkt schon abgeprallt ist. Tippe lieber früh – du darfst sofort loslegen.',
    great: 'Stark! Du sagst die Bahn gut voraus. Beim nächsten Mal startest du etwas höher.',
  },
  feedback: {
    level: 'Stufe',
    second: '2. Abprall',
    late: 'Zu spät',
    ask1: 'Wo prallt er ab?',
    ask2: 'Wo prallt er zum zweiten Mal ab?',
    secondHint: 'Jetzt zählt der zweite Abprall',
  },
};

export const it: ExerciseTexts = {
  title: 'Rimbalzo',
  tagline: 'Prevedi dove il punto rimbalza sul bordo – e tocca proprio lì.',
  steps: [
    'Un punto scivola nel campo e rimbalza sulla cornice.',
    'Pensa dove toccherà il bordo.',
    'Tocca quel punto prima che ci arrivi.',
  ],
  why:
    'Le palle rimbalzano, le auto girano l’angolo: nella vita di tutti i giorni stimi spesso dove andrà qualcosa prima che ci sia. Qui vedi il punto per tutto il tempo e prevedi il punto sul bordo – più avanti perfino solo il secondo rimbalzo. Poi vedi quanto ci sei andato vicino. Dove guardi davvero con gli occhi non viene misurato, e non è dimostrato che questo si trasferisca allo sport o alla vita quotidiana.',
  goodFor: ['Prevedere traiettorie', 'Giochi con la palla', 'Stimare i movimenti'],
  captions: {
    watch: 'Guarda come scivola il punto',
    tap: 'Tocca dove rimbalza',
    check: 'Quanto ci sei andato vicino',
  },
  metrics: {
    level: 'Il tuo livello',
    meanError: 'Scarto medio',
    accuracy: 'Percentuale di colpi',
    maxLevel: 'Livello più alto',
    hits: 'Colpi',
  },
  tips: {
    far: 'Osserva la direzione in cui scivola il punto – il bordo decide il rimbalzo: l’angolo resta uguale, solo speculare.',
    late: 'Spesso tocchi solo quando il punto ha già rimbalzato. Tocca prima – puoi iniziare subito.',
    great: 'Ottimo! Prevedi bene la traiettoria. La prossima volta parti un po’ più in alto.',
  },
  feedback: {
    level: 'Livello',
    second: '2° rimbalzo',
    late: 'Troppo tardi',
    ask1: 'Dove rimbalza?',
    ask2: 'Dove rimbalza la seconda volta?',
    secondHint: 'Ora conta il secondo rimbalzo',
  },
};
