import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Winkel halten',
  tagline: 'Ruhig in der Mitte warten – und erst tippen, wenn das Ziel am Rand auftaucht.',
  steps: ['Warte in der Mitte, der Finger bleibt ruhig.', 'Links oder rechts taucht im Durchgang ein Ziel auf.', 'Tippe es an – aber nicht vorher!'],
  why:
    'Im Alltag wartest du oft auf etwas, das plötzlich an einer bestimmten Stelle auftaucht – und reagierst erst dann. Hier übst du dieses ruhige Abwarten: Wann das Ziel kommt, lässt sich nicht erraten. Wer zu früh tippt, bekommt einen Frühstart angezeigt. Gemessen wird nur die Zeit bis zu deinem Tipp, nicht wohin du schaust. Ob sich das Üben auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Geduldig warten', 'Schnell reagieren', 'Ballspiele'],
  captions: {
    wait: 'Warte ruhig in der Mitte',
    tap: 'Da! Tippe das Ziel an',
    early: 'Zu früh getippt? Das zählt als Frühstart',
    both: 'Mal links, mal rechts – nicht raten',
  },
  metrics: {
    level: 'Stufe',
    medianTime: 'Mittlere Zeit (Median)',
    early: 'Frühstarts',
    accuracy: 'Trefferquote',
    hits: 'Getroffen',
  },
  tips: {
    early: 'Du hast öfter zu früh getippt. Warte wirklich, bis das Ziel da ist – Raten bringt nichts, denn die Wartezeit ist jedes Mal anders.',
    wrong: 'Du tippst öfter daneben. Schau erst hin, wo das Ziel ist, dann tippe – ein Augenblick mehr hilft oft beim Treffen.',
    slow: 'Einige Ziele waren weg, bevor du getippt hast. Tippe gleich, wenn du es siehst – nicht erst überlegen.',
    side: 'Auf einer Seite bist du langsamer. Lass den Blick locker über beide Durchgänge wandern, nicht nur auf eine Seite.',
    great: 'Stark! Du wartest ruhig und reagierst dann schnell. Bleib locker – dann klappt es auch bei kleineren Zielen.',
  },
  feedback: {
    level: 'Stufe',
    gone: 'Weg',
    wrong: 'Daneben',
    early: 'Zu früh!',
  },
};

export const it: ExerciseTexts = {
  title: 'Angolo fisso',
  tagline: 'Aspetta al centro – e tocca solo quando il bersaglio compare.',
  steps: ['Aspetta al centro, con il dito fermo.', 'A sinistra o a destra compare un bersaglio nel passaggio.', 'Toccalo – ma non prima!'],
  why:
    'Nella vita di tutti i giorni spesso aspetti qualcosa che compare all’improvviso in un punto preciso – e reagisci solo allora. Qui ti eserciti in questa attesa tranquilla: quando arriva il bersaglio non si può indovinare. Se tocchi troppo presto, viene mostrata una falsa partenza. Viene misurato solo il tempo fino al tuo tocco, non dove guardi. Non è dimostrato che questo esercizio si trasferisca allo sport o alla vita di tutti i giorni.',
  goodFor: ['Aspettare con pazienza', 'Reagire in fretta', 'Giochi con la palla'],
  captions: {
    wait: 'Aspetta tranquillo al centro',
    tap: 'Eccolo! Tocca il bersaglio',
    early: 'Troppo presto? È una falsa partenza',
    both: 'Una volta a sinistra, una a destra',
  },
  metrics: {
    level: 'Livello',
    medianTime: 'Tempo medio (mediana)',
    early: 'False partenze',
    accuracy: 'Percentuale di colpi',
    hits: 'Colpiti',
  },
  tips: {
    early: 'Hai toccato spesso troppo presto. Aspetta davvero che il bersaglio sia lì – indovinare non serve, perché l’attesa è ogni volta diversa.',
    wrong: 'Tocchi spesso accanto. Guarda prima dov’è il bersaglio, poi tocca – un attimo in più spesso aiuta a colpire.',
    slow: 'Alcuni bersagli erano già spariti quando hai toccato. Tocca subito appena lo vedi – senza pensarci troppo.',
    side: 'Da un lato sei più lento. Lascia vagare lo sguardo su entrambi i passaggi, non solo su un lato.',
    great: 'Ottimo! Aspetti con calma e reagisci in fretta. Resta rilassato – così funziona anche con bersagli più piccoli.',
  },
  feedback: {
    level: 'Livello',
    gone: 'Sparito',
    wrong: 'Accanto',
    early: 'Troppo presto!',
  },
};
