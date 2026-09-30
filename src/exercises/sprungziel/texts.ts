import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Sprungziel',
  tagline: 'Finde die Kugel nach ihrem Sprung schnell wieder und erkenne ein Zeichen.',
  steps: [
    'Folge der Kugel. Sie blendet aus und taucht woanders auf.',
    'Finde sie schnell wieder – kurz zeigt sie ein „C“.',
    'Tippe unten, wohin die Öffnung zeigt.',
  ],
  why:
    'Im Alltag springt der Blick ständig: vom Schild zur Straße, vom Bildschirm zur Tür. Dabei musst du etwas Bewegtes an neuer Stelle wiederfinden. Hier blendet die Kugel weich aus und taucht an einem anderen Ort wieder auf, und das kleine Zeichen siehst du nur, wenn du sie rechtzeitig gefunden hast. Die Übung ersetzt weder Brille noch Augenuntersuchung. Ob dein Blick wirklich springt, wird nicht gemessen, und ob sich die Übung auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Etwas schnell wiederfinden', 'Blick gezielt versetzen', 'Orientierung nach einer Unterbrechung'],
  captions: {
    follow: 'Folge der Kugel – sie springt gleich',
    where: 'Wohin zeigt die Öffnung?',
  },
  metrics: {
    level: 'Sprung-Stufe',
    accuracy: 'Treffsicherheit',
    maxLevel: 'Höchste Stufe',
    correct: 'Richtig erkannt',
  },
  tips: {
    eyes: 'Such die Kugel gleich nach dem Auftauchen, statt auf das Zeichen zu warten – dann bist du rechtzeitig da.',
    decide: 'Lieber schnell entscheiden – der erste Eindruck stimmt oft.',
    great: 'Sehr gut! Du findest die Kugel auch nach weiten Sprüngen schnell. Beim nächsten Mal startest du etwas höher.',
  },
  feedback: {
    late: 'Zu spät',
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Bersaglio a salti',
  tagline: 'Ritrova in fretta la sfera dopo il suo salto e riconosci un segno.',
  steps: [
    'Segui la sfera. Sfuma e riappare altrove.',
    'Ritrovala in fretta – per un attimo mostra una «C».',
    'Tocca in basso dove punta l’apertura.',
  ],
  why:
    'Nella vita di tutti i giorni lo sguardo salta di continuo: dal cartello alla strada, dallo schermo alla porta. Così devi ritrovare in un altro punto qualcosa che si muove. Qui la sfera sfuma piano e riappare in un altro posto, e il piccolo segno lo vedi solo se l’hai trovata in tempo. L’esercizio non sostituisce né gli occhiali né una visita oculistica. Non viene misurato se il tuo sguardo salta davvero, e non è dimostrato che l’esercizio si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Ritrovare qualcosa in fretta', 'Spostare lo sguardo con precisione', 'Orientarsi dopo un’interruzione'],
  captions: {
    follow: 'Segui la sfera – tra poco salta',
    where: 'Dove punta l’apertura?',
  },
  metrics: {
    level: 'Livello di salto',
    accuracy: 'Precisione',
    maxLevel: 'Livello massimo',
    correct: 'Riconosciuti',
  },
  tips: {
    eyes: 'Cerca la sfera subito dopo che riappare, invece di aspettare il segno – così arrivi in tempo.',
    decide: 'Meglio decidere in fretta – spesso la prima impressione è quella giusta.',
    great: 'Molto bene! Ritrovi la sfera in fretta anche dopo salti lunghi. La prossima volta parti un po’ più in alto.',
  },
  feedback: {
    late: 'Troppo tardi',
    level: 'Livello',
  },
};
