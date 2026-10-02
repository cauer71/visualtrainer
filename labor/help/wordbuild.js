(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('wordbuild', {
    purpose: 'Du setzt durcheinandergewürfelte Buchstaben zu einem Wort zusammen. Die Übung trainiert das Wortbild, die Reihenfolge der Buchstaben und schnelles Umordnen im Kopf.',
    setup: [
      'Kalibrierung ist hier nur für die Kachelgröße wichtig.',
      'Sitz bequem; die Hand tippt auf die Kacheln, der Blick wandert zwischen Kacheln und Feldern.',
      'Wörter stammen aus einer kleinen eigenen Liste häufiger deutscher Substantive.'
    ],
    steps: [
      'Wortlänge und Anzahl der Wörter einstellen. Für den Einstieg: Länge 5, 8 Wörter.',
      '„Start“ drücken. Unten liegen die Buchstabenkacheln, oben die leeren Felder.',
      'Tippe die Kacheln in der Reihenfolge an, in der sie das Wort ergeben. Sie wandern in die Felder.',
      'Mit „Zurück“ oder durch Antippen des letzten gefüllten Feldes nimmst du den letzten Buchstaben zurück.',
      'Ist das letzte Feld gefüllt, wird automatisch geprüft. Ein falsches Wort wird verworfen (Fehler), die Kacheln gehen zurück. Ein richtiges Wort zeigt direkt das nächste.'
    ],
    tips: [
      'Suche zuerst den Anfang und das Ende des Wortes: Viele Wörter beginnen mit Konsonanten und enden auf -e, -er oder -en.',
      'Achte auf typische Buchstabenfolgen (sch, ch, ei, au, st).',
      'Nicht probieren, bis es klappt: Jeder falsche Versuch zählt als Fehler.',
      'Das Wort darf auch eine andere Lösung sein, wenn die Buchstaben ein anderes Wort der Liste ergeben (Anagramm).'
    ],
    progression: [
      'Leichter: kurze Wörter (3 bis 4 Buchstaben), große Kacheln.',
      'Schwerer: längere Wörter (6 bis 8 Buchstaben), mehr Wörter am Stück.',
      'Ziel: Zeit pro Wort senken und Fehler vermeiden.'
    ],
    cautions: [
      'Bei Lese-Rechtschreib-Schwierigkeiten Erfolgserlebnisse sichern: kurze Wörter, wenige Wörter, Pausen.',
      'Kinder: nur mit Begleitung. Kürzere Einheiten.',
      'Bei Kopfschmerzen oder Augenbrennen abbrechen.'
    ],
    background: 'Das Umordnen von Buchstaben (Anagramme) beansprucht das Arbeitsgedächtnis und den Zugriff auf das innere Wortlexikon. Wer häufig vorkommende Buchstabengruppen als Einheit erkennt, löst schneller. Die Wortliste ist klein; bei häufigem Training wiederholen sich Wörter, was den Übungseffekt auf das Wort statt auf die Fähigkeit verschieben kann.',
    references: [],
    params: {
      wordLength: 'Anzahl der Buchstaben je Wort. Für jede Länge gibt es mehrere Wörter.',
      words: 'Wie viele Wörter pro Durchlauf gelöst werden müssen.',
      tileCm: 'Größe der Kacheln in Zentimetern. Passt sich bei schmalem Bildschirm an.',
      sound: 'Ton bei Eingaben und bei Fehlern.'
    },
    metrics: {
      solved: 'Anzahl der gelösten Wörter.',
      errors: 'Wie oft ein Wort falsch zusammengesetzt wurde.',
      t_mean: 'Mittlere Zeit pro Wort.',
      t_median: 'Mittlere Zeit nach Sortierung, weniger empfindlich gegen einzelne schwere Wörter.',
      total: 'Gesamtzeit vom Start bis zum letzten gelösten Wort, in Sekunden.',
      lpm: 'Gelöste Buchstaben pro Minute, ein Maß für das Gesamttempo.'
    }
  });
}));
