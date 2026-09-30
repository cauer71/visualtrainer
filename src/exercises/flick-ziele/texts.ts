import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Flick-Ziele',
  tagline: 'Ein Ziel taucht auf – tippe es an, bevor es wieder weg ist.',
  steps: ['Irgendwo auf dem Bildschirm erscheint ein Ziel.', 'Tippe es so schnell und so genau wie möglich an.', 'Je besser du bist, desto kleiner und kürzer ist es zu sehen.'],
  why:
    'Im Alltag taucht etwas oft plötzlich an einer unerwarteten Stelle auf, und Blick und Hand müssen schnell dorthin. Hier übst du genau diese Bewegung auf dem Tablet: Ziel entdecken, Finger hinführen, treffen. Wie schnell du bist, hängt auch vom Gerät ab – vergleiche dich nur mit dir selbst. Ob sich das Üben auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Schnell hinlangen', 'Ballspiele', 'Umschauen'],
  captions: {
    watch: 'Achte auf den ganzen Bildschirm',
    tap: 'Da! Tippe das Ziel an',
    gone: 'Weg? Das ist nicht schlimm',
  },
  metrics: {
    level: 'Stufe',
    hits: 'Getroffen',
    medianTime: 'Mittlere Zeit (Median)',
    wrong: 'Daneben getippt',
    missed: 'Weg, bevor du tippen konntest',
  },
  tips: {
    wrong: 'Du tippst öfter daneben. Schau erst hin, wo das Ziel ist, dann tippe – ein Augenblick mehr macht dich treffsicherer.',
    slow: 'Einige Ziele waren weg, bevor du getippt hast. Tippe gleich, wenn du es siehst – nicht erst überlegen.',
    far: 'Bei weiten Wegen brauchst du deutlich länger. Lass den Blick zuerst zum Ziel springen und bring dann den Finger hin.',
    great: 'Stark! Du findest die Ziele schnell und triffst sie. Bleib locker – dann klappt es auch bei kleineren Zielen.',
  },
  feedback: {
    level: 'Stufe',
    gone: 'Weg',
    wrong: 'Daneben',
  },
};

export const it: ExerciseTexts = {
  title: 'Bersagli lampo',
  tagline: 'Compare un bersaglio – toccalo prima che sparisca.',
  steps: ['In un punto qualsiasi dello schermo compare un bersaglio.', 'Toccalo il più in fretta e con la massima precisione possibile.', 'Più sei bravo, più è piccolo e meno a lungo si vede.'],
  why:
    'Nella vita di tutti i giorni qualcosa compare spesso all’improvviso in un punto inaspettato, e sguardo e mano devono arrivarci in fretta. Qui ti eserciti proprio in questo movimento sul tablet: scoprire il bersaglio, portare il dito, colpire. La velocità dipende anche dal dispositivo – confrontati solo con te stesso. Non è dimostrato che questo esercizio si trasferisca allo sport o alla vita di tutti i giorni.',
  goodFor: ['Afferrare in fretta', 'Giochi con la palla', 'Guardarsi intorno'],
  captions: {
    watch: 'Osserva tutto lo schermo',
    tap: 'Eccolo! Tocca il bersaglio',
    gone: 'Sparito? Nessun problema',
  },
  metrics: {
    level: 'Livello',
    hits: 'Colpiti',
    medianTime: 'Tempo medio (mediana)',
    wrong: 'Toccato accanto',
    missed: 'Sparito prima del tocco',
  },
  tips: {
    wrong: 'Tocchi spesso accanto. Guarda prima dov’è il bersaglio, poi tocca – un attimo in più ti rende più preciso.',
    slow: 'Alcuni bersagli erano già spariti quando hai toccato. Tocca subito appena lo vedi – senza pensarci troppo.',
    far: 'Per i percorsi lunghi ti serve molto più tempo. Lascia prima saltare lo sguardo sul bersaglio, poi porta il dito.',
    great: 'Ottimo! Trovi i bersagli in fretta e li colpisci. Resta rilassato – così funziona anche con i bersagli più piccoli.',
  },
  feedback: {
    level: 'Livello',
    gone: 'Sparito',
    wrong: 'Accanto',
  },
};
