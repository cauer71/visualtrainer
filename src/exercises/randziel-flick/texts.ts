import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Randziel-Flick',
  tagline: 'Von der Mitte zum Rand: tippe das Ziel, sobald es auftaucht.',
  steps: ['Tippe auf die Marke in der Mitte.', 'Gleich erscheint links oder rechts am Rand ein Ziel.', 'Tippe es an – dann geht es von der Mitte aus weiter.'],
  why:
    'Im Alltag liegt vieles am Rand deines Blickfelds, und dort taucht auch mal etwas Neues auf. Hier übst du einen langen, immer gleichen Weg: von der Mitte zu einem Ziel ganz links oder ganz rechts. Gemessen wird nur die Zeit bis zu deinem Tipp – nicht, wohin du schaust. Ob sich das Üben auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Weite Wege', 'Umschauen', 'Ballspiele'],
  captions: {
    start: 'Tippe auf die Marke in der Mitte',
    tap: 'Da! Tippe das Ziel am Rand an',
    again: 'Wieder zurück zur Mitte',
    other: 'Mal links, mal rechts',
  },
  metrics: {
    level: 'Stufe',
    medianTime: 'Zeit Mitte → Ziel (Median)',
    accuracy: 'Trefferquote',
    hits: 'Getroffen',
    wrong: 'Daneben getippt',
  },
  tips: {
    wrong: 'Du tippst öfter daneben. Schau erst hin, wo das Ziel ist, dann tippe – ein Augenblick mehr hilft oft beim Treffen.',
    slow: 'Einige Ziele waren weg, bevor du getippt hast. Tippe gleich, wenn du es siehst – nicht erst überlegen.',
    side: 'Eine Seite fällt dir leichter als die andere. Lass die Augen locker über die ganze Breite wandern, nicht nur auf deine starke Seite.',
    great: 'Stark! Der weite Weg klappt zuverlässig. Bleib locker – dann geht es auch bei kleineren Zielen.',
  },
  feedback: {
    level: 'Stufe',
    gone: 'Weg',
    wrong: 'Daneben',
  },
};

export const it: ExerciseTexts = {
  title: 'Bersaglio sul bordo',
  tagline: 'Dal centro al bordo: tocca il bersaglio appena compare.',
  steps: ['Tocca il segno al centro.', 'Subito dopo compare un bersaglio a sinistra o a destra.', 'Toccalo – poi si riparte dal centro.'],
  why:
    'Nella vita di tutti i giorni molte cose stanno ai margini del campo visivo, ed è lì che può comparire qualcosa di nuovo. Qui ti eserciti su un percorso lungo e sempre uguale: dal centro a un bersaglio tutto a sinistra o tutto a destra. Viene misurato solo il tempo fino al tuo tocco – non dove guardi. Non è dimostrato che questo esercizio si trasferisca allo sport o alla vita di tutti i giorni.',
  goodFor: ['Percorsi lunghi', 'Guardarsi intorno', 'Giochi con la palla'],
  captions: {
    start: 'Tocca il segno al centro',
    tap: 'Eccolo! Tocca il bersaglio sul bordo',
    again: 'Di nuovo al centro',
    other: 'Una volta a sinistra, una a destra',
  },
  metrics: {
    level: 'Livello',
    medianTime: 'Tempo centro → bersaglio (mediana)',
    accuracy: 'Percentuale di colpi',
    hits: 'Colpiti',
    wrong: 'Toccato accanto',
  },
  tips: {
    wrong: 'Tocchi spesso accanto. Guarda prima dov’è il bersaglio, poi tocca – un attimo in più spesso aiuta a colpire.',
    slow: 'Alcuni bersagli erano già spariti quando hai toccato. Tocca subito appena lo vedi – senza pensarci troppo.',
    side: 'Un lato ti riesce meglio dell’altro. Lascia vagare lo sguardo su tutta la larghezza, non solo sul tuo lato forte.',
    great: 'Ottimo! Il percorso lungo riesce in modo affidabile. Resta rilassato – così funziona anche con bersagli più piccoli.',
  },
  feedback: {
    level: 'Livello',
    gone: 'Sparito',
    wrong: 'Accanto',
  },
};
