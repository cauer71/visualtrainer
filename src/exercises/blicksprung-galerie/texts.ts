import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.
// Es wird keine Augenbewegung gemessen – nur die Zeit bis zum Tipp.

export const de: ExerciseTexts = {
  title: 'Blicksprung-Galerie',
  tagline: 'Spring mit dem Blick zum Ziel – und tippe es an.',
  steps: ['Ein Punkt taucht irgendwo im Raster auf.', 'Spring mit dem Blick hin und tippe ihn an.', 'Mit der Zeit wird das Raster größer und schneller.'],
  why:
    'Beim Lesen, Umschauen oder Ballspielen springt dein Blick ständig von Punkt zu Punkt – und die Hand folgt. Hier übst du genau das: ein Ziel finden, hinschauen, antippen. Ob sich das Üben am Bildschirm auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Umschauen', 'Ballspiele', 'Auge-Hand-Spiele'],
  captions: {
    watch: 'Ein Punkt taucht im Raster auf',
    tap: 'Schau hin und tippe ihn an',
    jump: 'Gleich springt er woanders hin',
  },
  metrics: {
    level: 'Stufe',
    medianTime: 'Mittlere Zeit (Median)',
    accuracy: 'Treffsicherheit',
    hits: 'Getroffen',
  },
  tips: {
    wrong: 'Du tippst öfter in eine falsche Zelle. Schau erst genau hin, dann tippe – ein kurzer Moment reicht.',
    slow: 'Einige Ziele waren weg, bevor du getippt hast. Tippe gleich, wenn du das Ziel siehst – nicht erst nachprüfen.',
    far: 'Weite Sprünge brauchen bei dir länger. Lass den Blick locker über das ganze Raster wandern, statt an einer Stelle zu kleben.',
    great: 'Schöne Sprünge! Blick und Hand arbeiten gut zusammen. Bleib locker – dann klappt es auch mit größerem Raster.',
  },
  feedback: {
    level: 'Stufe',
    gone: 'Weg',
    wrong: 'Falsche Zelle',
  },
};

export const it: ExerciseTexts = {
  title: 'Galleria di sguardi',
  tagline: 'Salta con lo sguardo al bersaglio – e toccalo.',
  steps: ['Un punto compare da qualche parte nella griglia.', 'Salta con lo sguardo e toccalo.', 'Col tempo la griglia diventa più grande e veloce.'],
  why:
    'Quando leggi, ti guardi intorno o giochi a palla, lo sguardo salta di continuo da un punto all’altro – e la mano segue. Qui alleni proprio questo: trovare un bersaglio, guardarlo, toccarlo. Non è dimostrato che allenarsi allo schermo si trasferisca allo sport o alla vita di tutti i giorni.',
  goodFor: ['Guardarsi intorno', 'Giochi con la palla', 'Giochi occhio-mano'],
  captions: {
    watch: 'Un punto compare nella griglia',
    tap: 'Guarda e toccalo',
    jump: 'Tra poco salta da un’altra parte',
  },
  metrics: {
    level: 'Livello',
    medianTime: 'Tempo medio (mediana)',
    accuracy: 'Precisione',
    hits: 'Colpiti',
  },
  tips: {
    wrong: 'Tocchi spesso la cella sbagliata. Prima guarda bene, poi tocca – basta un attimo.',
    slow: 'Alcuni bersagli erano già spariti quando hai toccato. Tocca subito appena lo vedi – senza ricontrollare.',
    far: 'I salti lunghi ti richiedono più tempo. Lascia vagare lo sguardo sull’intera griglia, invece di restare fermo in un punto.',
    great: 'Bei salti! Sguardo e mano lavorano bene insieme. Resta rilassato – così funziona anche con la griglia più grande.',
  },
  feedback: {
    level: 'Livello',
    gone: 'Sparito',
    wrong: 'Cella sbagliata',
  },
};
