import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Fünf Türen',
  tagline: 'Hinter welcher Tür taucht er auf? Tippe schneller als er verschwindet.',
  steps: ['Fünf Türen stehen nebeneinander.', 'In einer erscheint kurz ein Stern – tippe die Tür an.', 'Je besser du bist, desto kürzer ist er zu sehen.'],
  why:
    'Im Alltag taucht etwas oft plötzlich an einer von mehreren möglichen Stellen auf – zum Beispiel beim Umschauen oder im Ballspiel. Hier übst du, den Stern an einer von fünf Türen zu entdecken und die richtige Tür zu treffen, bevor er wieder weg ist. Ob sich das Üben am Bildschirm auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Umschauen', 'Ballspiele', 'Schnell entscheiden'],
  captions: {
    watch: 'Achte auf die Türen',
    tap: 'Da! Tippe die Tür an',
    gone: 'Weg? Das ist nicht schlimm',
  },
  metrics: {
    level: 'Stufe',
    accuracy: 'Trefferquote',
    medianTime: 'Mittlere Zeit (Median)',
    hits: 'Getroffen',
  },
  tips: {
    wrong: 'Du tippst öfter die falsche Tür. Schau kurz hin, in welcher Tür der Stern ist, dann tippe – ein Augenblick genügt.',
    slow: 'Einige Sterne waren weg, bevor du getippt hast. Tippe gleich, wenn du ihn siehst – nicht erst überlegen.',
    outer: 'An den äußeren Türen brauchst du länger. Lass den Blick locker über die ganze Reihe wandern – nicht nur auf die Mitte.',
    great: 'Stark! Du findest die Tür schnell. Bleib locker – dann klappt es auch, wenn der Stern kürzer zu sehen ist.',
  },
  feedback: {
    level: 'Stufe',
    gone: 'Weg',
    wrong: 'Falsche Tür',
    door: 'Tür',
  },
};

export const it: ExerciseTexts = {
  title: 'Cinque porte',
  tagline: 'Da quale porta spunta? Tocca prima che sparisca.',
  steps: ['Cinque porte sono una accanto all’altra.', 'In una compare un attimo una stella – tocca la porta.', 'Più sei bravo, meno a lungo si vede.'],
  why:
    'Nella vita di tutti i giorni qualcosa compare spesso all’improvviso in uno dei tanti punti possibili – per esempio quando ti guardi intorno o giochi a palla. Qui ti eserciti a scoprire la stella in una di cinque porte e a toccare quella giusta prima che sparisca. Non è dimostrato che allenarsi allo schermo si trasferisca allo sport o alla vita di tutti i giorni.',
  goodFor: ['Guardarsi intorno', 'Giochi con la palla', 'Decidere in fretta'],
  captions: {
    watch: 'Osserva le porte',
    tap: 'Eccola! Tocca la porta',
    gone: 'Sparita? Nessun problema',
  },
  metrics: {
    level: 'Livello',
    accuracy: 'Percentuale di colpi',
    medianTime: 'Tempo medio (mediana)',
    hits: 'Colpiti',
  },
  tips: {
    wrong: 'Tocchi spesso la porta sbagliata. Guarda un attimo in quale porta c’è la stella, poi tocca – basta un istante.',
    slow: 'Alcune stelle erano già sparite quando hai toccato. Tocca subito appena la vedi – senza pensarci troppo.',
    outer: 'Alle porte esterne ti serve più tempo. Lascia vagare lo sguardo sull’intera fila – non solo sul centro.',
    great: 'Ottimo! Trovi la porta in fretta. Resta rilassato – così funziona anche quando la stella si vede per meno tempo.',
  },
  feedback: {
    level: 'Livello',
    gone: 'Sparita',
    wrong: 'Porta sbagliata',
    door: 'Porta',
  },
};
