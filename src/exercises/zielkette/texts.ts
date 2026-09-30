import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Zielkette',
  tagline: 'Tippe die Kreise der Reihe nach an – von Ziel zu Ziel.',
  steps: [
    'Mehrere Kreise liegen da, nur der nächste ist markiert.',
    'Tippe ihn an – ein Pfeil zeigt dir dann den folgenden.',
    'Jede Kette ist neu – mit der Stufe wird sie länger.',
  ],
  why:
    'Vieles im Alltag besteht aus Wechseln von einem Ziel zum nächsten: Tasten auf dem Handy, Felder auf dem Tablet, Schalter am Herd. Hier wechselst du Kreis für Kreis, ohne etwas suchen oder dir etwas merken zu müssen; der Pfeil zeigt dir immer den nächsten. Gemessen wird nur dein Tippen, nicht dein Blick. Ob sich das auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Zügig von Ziel zu Ziel', 'Kleine Felder treffen', 'Ruhig und zielsicher tippen'],
  captions: {
    watch: 'Gleich erscheint eine Kette',
    next: 'Tippe das markierte Ziel an',
    arrow: 'Der Pfeil zeigt dir das nächste',
    new: 'Jede Kette sieht anders aus',
  },
  metrics: {
    level: 'Stufe',
    chains: 'Ketten geschafft',
    perChain: 'Zeit je Kette (Median)',
    wrong: 'Daneben getippt',
  },
  tips: {
    late: 'Bei einigen Ketten ist die Zeit abgelaufen. Schau schon aufs nächste Ziel, während du tippst – dann wechselst du flüssiger.',
    wrong: 'Du tippst öfter neben das markierte Ziel. Nimm dir einen Moment mehr Zeit und tippe mitten hinein.',
    great: 'Stark! Du wechselst flüssig von Ziel zu Ziel. Bleib locker – dann klappen auch längere Ketten mit kleineren Kreisen.',
  },
  feedback: {
    level: 'Stufe',
    late: 'Zeit um',
  },
};

export const it: ExerciseTexts = {
  title: 'Catena di bersagli',
  tagline: 'Tocca i cerchi uno dopo l’altro – da bersaglio a bersaglio.',
  steps: [
    'Più cerchi sullo schermo, solo il prossimo è evidenziato.',
    'Toccalo – una freccia ti mostra poi il successivo.',
    'Ogni catena è nuova – con il livello si allunga.',
  ],
  why:
    'Molte cose nella vita di tutti i giorni consistono nel passare da un bersaglio al successivo: tasti sul cellulare, campi sul tablet, interruttori sui fornelli. Qui passi da cerchio a cerchio, senza dover cercare né ricordare nulla; la freccia ti indica sempre il prossimo. Si misura solo il tuo tocco, non lo sguardo. Non è dimostrato che questo si trasferisca allo sport o alla vita di tutti i giorni.',
  goodFor: ['Passare in fretta da bersaglio a bersaglio', 'Colpire piccoli campi', 'Toccare con calma e precisione'],
  captions: {
    watch: 'Tra poco appare una catena',
    next: 'Tocca il bersaglio evidenziato',
    arrow: 'La freccia mostra il prossimo',
    new: 'Ogni catena è diversa',
  },
  metrics: {
    level: 'Livello',
    chains: 'Catene completate',
    perChain: 'Tempo per catena (mediana)',
    wrong: 'Toccati accanto',
  },
  tips: {
    late: 'In alcune catene il tempo è scaduto. Guarda già il bersaglio successivo mentre tocchi – così passi più fluido.',
    wrong: 'Tocchi spesso accanto al bersaglio evidenziato. Prenditi un attimo in più e tocca proprio al centro.',
    great: 'Ottimo! Passi fluido da bersaglio a bersaglio. Resta rilassato – così riescono anche catene più lunghe con cerchi più piccoli.',
  },
  feedback: {
    level: 'Livello',
    late: 'Tempo scaduto',
  },
};
