import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Ziele erwischen',
  tagline: 'Mehrere Kreise sind unterwegs – tippe sie an, bevor sie weiterziehen.',
  steps: [
    'Mehrere Kreise wandern über den Bildschirm.',
    'Tippe sie an – sie werden dabei größer und kleiner.',
    'Je besser du bist, desto flinker und kleiner werden sie.',
  ],
  why:
    'Beim Fangen, Ballspielen oder auf dem Tablet bewegt sich vieles gleichzeitig. Hier folgen mehrere Kreise geraden Bahnen und prallen weich am Rand ab; du tippst dorthin, wo ein Kreis gleich ist, nicht dorthin, wo er war. Gemessen wird nur dein Tippen, nicht dein Blick. Ob sich das auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Bewegtes antippen', 'Mehreres im Blick behalten', 'Spielen'],
  captions: {
    watch: 'Die Kreise sind unterwegs',
    size: 'Sie werden größer und kleiner',
    tap: 'Tippe dorthin, wo sie gleich sind',
  },
  metrics: {
    level: 'Stufe',
    hits: 'Treffer',
    hitRate: 'Trefferquote',
    perHit: 'Zeit zwischen Treffern (Median)',
  },
  tips: {
    miss: 'Du tippst öfter neben die Kreise. Ziele ein Stück voraus – dorthin, wo der Kreis gleich ist.',
    slow: 'Zwischen deinen Treffern vergeht etwas Zeit. Such dir gleich den nächsten Kreis und tippe ohne Zögern.',
    great: 'Stark! Du triffst die wandernden Kreise gut. Bleib locker – dann klappt es auch mit mehr und flinkeren Kreisen.',
  },
  feedback: {
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Colpisci i bersagli',
  tagline: 'Più cerchi sono in movimento – toccali prima che se ne vadano.',
  steps: [
    'Più cerchi vagano sullo schermo.',
    'Toccali – nel frattempo diventano più grandi e più piccoli.',
    'Più sei bravo, più veloci e piccoli diventano.',
  ],
  why:
    'Nel gioco della palla, nell’acchiappare o sul tablet molte cose si muovono insieme. Qui più cerchi seguono traiettorie dritte e rimbalzano dolcemente sul bordo; tocchi dove un cerchio sarà tra poco, non dove era. Si misura solo il tuo tocco, non lo sguardo. Non è dimostrato che questo si trasferisca allo sport o alla vita di tutti i giorni.',
  goodFor: ['Toccare ciò che si muove', 'Tenere d’occhio più cose', 'Giocare'],
  captions: {
    watch: 'I cerchi sono in movimento',
    size: 'Diventano più grandi e più piccoli',
    tap: 'Tocca dove saranno tra poco',
  },
  metrics: {
    level: 'Livello',
    hits: 'Colpiti',
    hitRate: 'Percentuale di colpi',
    perHit: 'Tempo tra i colpi (mediana)',
  },
  tips: {
    miss: 'Tocchi spesso accanto ai cerchi. Mira un po’ più avanti – dove il cerchio sarà tra poco.',
    slow: 'Tra un colpo e l’altro passa un po’ di tempo. Cerca subito il cerchio successivo e toccalo senza esitare.',
    great: 'Ottimo! Colpisci bene i cerchi in movimento. Resta rilassato – così funziona anche con più cerchi e più veloci.',
  },
  feedback: {
    level: 'Livello',
  },
};
