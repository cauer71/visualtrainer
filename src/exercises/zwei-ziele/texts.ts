import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Zwei Ziele',
  tagline: 'Blick in der Mitte lassen und merken, wo links oder rechts etwas stockt.',
  steps: [
    'Schau auf das Kreuz in der Mitte.',
    'Links und rechts schweben Kugeln.',
    'Stockt eine? Tippe auf ihre Seite.',
  ],
  why:
    'Beim Autofahren oder im Gedränge schaust du nach vorn und bemerkst links und rechts trotzdem, wenn sich etwas ändert. Hier bleibt dein Blick auf dem Kreuz, und du meldest, auf welcher Seite eine Kugel kurz stockt – die Übung ersetzt weder Brille noch Augenuntersuchung. Ob dein Blick wirklich in der Mitte bleibt, wird nicht gemessen, und ein Nutzen für den Alltag ist nicht belegt.',
  goodFor: ['Aus dem Augenwinkel bemerken', 'Im Verkehr nach vorn schauen', 'Überblick im Gedränge'],
  captions: {
    fix: 'Blick bleibt auf dem Kreuz',
    stop: 'Eine Kugel stockt – welche Seite?',
  },
  metrics: {
    level: 'Stufe',
    accuracy: 'Treffsicherheit',
    maxLevel: 'Höchste Stufe',
    rt: 'Reaktionszeit',
    falseAlarms: 'Tipps ohne Stopp',
  },
  tips: {
    center: 'Halte den Blick auf dem Kreuz – Bewegung bemerkst du auch aus dem Augenwinkel.',
    calm: 'Tippe nur, wenn eine Kugel wirklich stockt – sonst einfach ruhig weiterschauen.',
    quick: 'Tippe gleich, wenn etwas stockt – die Seite siehst du meist sofort.',
    great: 'Sehr gut! Du bemerkst auch kurze Stopps auf beiden Seiten. Beim nächsten Mal startest du etwas höher.',
  },
  feedback: {
    late: 'Verpasst',
    level: 'Stufe',
    left: 'Links',
    right: 'Rechts',
  },
};

export const it: ExerciseTexts = {
  title: 'Due bersagli',
  tagline: 'Tieni lo sguardo al centro e nota dove a sinistra o a destra qualcosa si ferma.',
  steps: [
    'Guarda la croce al centro.',
    'A sinistra e a destra ci sono sfere.',
    'Una si ferma? Tocca il suo lato.',
  ],
  why:
    'Quando guidi o sei in mezzo alla folla guardi avanti e noti comunque, a sinistra e a destra, quando qualcosa cambia. Qui il tuo sguardo resta sulla croce e segnali su quale lato una sfera si ferma per un attimo – l’esercizio non sostituisce né gli occhiali né una visita oculistica. Non viene misurato se il tuo sguardo resta davvero al centro, e un beneficio per la vita quotidiana non è dimostrato.',
  goodFor: ['Notare con la coda dell’occhio', 'Guardare avanti nel traffico', 'Visione d’insieme nella folla'],
  captions: {
    fix: 'Lo sguardo resta sulla croce',
    stop: 'Una sfera si ferma – quale lato?',
  },
  metrics: {
    level: 'Livello',
    accuracy: 'Precisione',
    maxLevel: 'Livello massimo',
    rt: 'Tempo di reazione',
    falseAlarms: 'Tocchi senza arresto',
  },
  tips: {
    center: 'Tieni lo sguardo sulla croce – il movimento lo noti anche con la coda dell’occhio.',
    calm: 'Tocca solo quando una sfera si ferma davvero – altrimenti continua a guardare con calma.',
    quick: 'Tocca subito quando qualcosa si ferma – il lato lo vedi quasi sempre subito.',
    great: 'Molto bene! Noti anche brevi arresti su entrambi i lati. La prossima volta parti un po’ più in alto.',
  },
  feedback: {
    late: 'Mancato',
    level: 'Livello',
    left: 'Sinistra',
    right: 'Destra',
  },
};
