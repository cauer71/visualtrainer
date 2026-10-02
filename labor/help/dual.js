(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('dual', {
    purpose: 'Du trainierst geteilte Aufmerksamkeit. In der Mitte läuft eine Folge von Zahlen; sobald die Zielzahl erscheint, berührst du die Mitte. Gleichzeitig tauchen am Rand Punkte auf, die du ebenfalls berührst, ohne den Blick von der Mitte zu lösen. Mit den Modi „Nur Mitte“ und „Nur Rand“ kannst du außerdem messen, wie viel Leistung durch die zweite Aufgabe verloren geht.',
    setup: [
      'Kalibrierung durchführen, damit die Punktgröße am Rand stimmt.',
      'Sitz etwa 50 bis 60 cm vom Bildschirm entfernt. Der Blick bleibt in der Mitte; die Hand wechselt zwischen Mitte und Rand.',
      'Plane einen ersten Durchlauf in jedem der drei Modi ein, um eine Vergleichsbasis zu haben.'
    ],
    steps: [
      'Modus und Zielzahl wählen. Standard: beide Aufgaben gleichzeitig, Zielzahl 7, Wechsel alle 900 ms.',
      '„Start“ drücken. In der Mitte erscheinen Zahlen im Wechsel; rundherum liegt ein Kreis.',
      'Erscheint die Zielzahl, berührst du innerhalb ihrer Anzeigezeit den Kreis in der Mitte. Andere Zahlen berührst du nicht.',
      'Gleichzeitig erscheinen am Rand farbige Punkte. Berühre sie, während du die Mitte im Blick behältst.',
      'Nach der Zeit erscheinen die Kennzahlen für beide Aufgaben getrennt.'
    ],
    tips: [
      'Der Blick bleibt in der Mitte. Wer zu den Randpunkten schaut, verpasst Zielzahlen.',
      'Die Hand wartet über der Mitte; für Randpunkte kurze, direkte Bewegungen.',
      'Du musst nicht alles schaffen. Zuerst die Mitte sichern, dann so viele Randpunkte wie möglich.',
      'Wenn sich beide Aufgaben gegenseitig stören, trainiere erst „Nur Mitte“ und „Nur Rand“, dann kombiniert.',
      'Mit der Zeit werden Teilbewegungen automatischer; das ist das Ziel des Trainings.'
    ],
    progression: [
      'Leichter: Zahlenwechsel langsamer (1.200 bis 1.800 ms), seltene Zielzahlen (10 bis 15 %), große Randpunkte (7 bis 9 cm), lange Sichtbarkeit.',
      'Schwerer: Zahlenwechsel schneller (500 bis 700 ms), häufigere Zielzahlen (30 bis 40 %), kleinere Randpunkte (3 bis 4 cm), kurze Sichtbarkeit, kurze Pause.',
      'Messe die „Kosten“ der Doppelaufgabe: Vergleiche die Ergebnisse von „Beide“ mit „Nur Mitte“ bzw. „Nur Rand“ bei sonst gleichen Einstellungen. Je kleiner der Unterschied, desto besser gelingt die Aufteilung.',
      'Wenn die Mitte zu leicht ist, erhöhe das Tempo oder die Häufigkeit der Zielzahl.'
    ],
    cautions: [
      'Die Zahlen wechseln schnell, die Punkte erscheinen plötzlich. Bei Lichtempfindlichkeit vorher ärztlichen Rat einholen.',
      'Die Doppelaufgabe ist anstrengend; maximal 10 Minuten am Stück.',
      'Bei Schwindel oder Augenbeschwerden abbrechen.'
    ],
    background: 'Wenn zwei Aufgaben gleichzeitig bearbeitet werden, sinkt die Leistung meist in mindestens einer, weil sie um dieselben Kapazitäten (Aufmerksamkeit, Antwortauswahl) konkurrieren. Dieser Doppelaufgaben-Effekt ist ein Standardmaß für Aufmerksamkeitskapazität. Die Randpunkte in dieser Übung nutzen die Wahrnehmung im Gesichtsfeldrand, während die Mitte das Fixieren fordert. Die App kann nicht prüfen, ob der Blick wirklich in der Mitte bleibt.',
    references: ['Pashler, H. (1994). Dual-task interference in simple tasks: Data and theory. Psychological Bulletin, 116, 220–244.'],
    params: {
      mode: '„Beide gleichzeitig“ ist die Doppelaufgabe. „Nur Mitte“ und „Nur Rand“ messen jede Aufgabe einzeln als Vergleichsbasis.',
      durationS: 'Dauer des Durchlaufs in Sekunden.',
      intervalMs: 'Alle wie viele Millisekunden die Zahl in der Mitte wechselt. Kürzere Zeiten verlangen schnelleres Erkennen.',
      targetDigit: 'Die Zahl, bei der die Mitte berührt werden soll.',
      targetRate: 'Anteil der Zahlen, die Zielzahlen sind. Höhere Anteile erhöhen die Zahl der nötigen Reaktionen.',
      spotCm: 'Durchmesser der Randpunkte in Zentimetern.',
      persistenceS: 'Wie lange ein Randpunkt sichtbar bleibt.',
      gapMs: 'Pause zwischen zwei Randpunkten.',
      sound: 'Kurzer Ton bei Treffer (hoch) und Fehlberührung (tief).'
    },
    metrics: {
      c_hits: 'Zielzahlen, bei denen du die Mitte rechtzeitig berührt hast.',
      c_misses: 'Zielzahlen, bei denen du nicht reagiert hast, solange sie sichtbar war.',
      c_false: 'Berührungen der Mitte, obwohl keine Zielzahl zu sehen war oder obwohl du bereits reagiert hattest.',
      c_rt: 'Mittlere Zeit vom Erscheinen einer Zielzahl bis zur Berührung der Mitte.',
      p_hits: 'Randpunkte, die du rechtzeitig berührt hast.',
      p_misses: 'Randpunkte, die verschwunden sind, bevor du sie berührt hast.',
      p_stray: 'Berührungen, die weder die Mitte noch einen Randpunkt getroffen haben.',
      p_rt: 'Mittlere Zeit vom Erscheinen eines Randpunktes bis zur Berührung.'
    }
  });
}));
