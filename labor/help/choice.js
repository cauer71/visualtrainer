(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('choice', {
    purpose: 'Du trainierst, einen Reiz schnell zu erkennen und die passende Antwort zu wählen. In der Mitte erscheint eine Farbe oder Form, unten drückst du die Schaltfläche mit derselben Farbe oder Form. Die Übung misst, wie schnell und wie genau du unter Zeitdruck zwischen mehreren Möglichkeiten entscheidest.',
    setup: [
      'Sitz bequem, der Zeigefinger der dominanten Hand schwebt über der Mitte der Schaltflächen.',
      'Prüfe, dass du alle Farben gut unterscheiden kannst. Bei Farbsehschwäche die Reizart „Formen“ wählen.',
      'Die Einstellung „Reizgröße“ hängt von der Kalibrierung ab; sonst ist keine besondere Vorbereitung nötig.'
    ],
    steps: [
      'Anzahl der Reize, Antwortmöglichkeiten und Reizart einstellen. Der Einstieg gelingt mit 4 Farben und 40 Reizen.',
      '„Start“ drücken. In der Mitte steht zunächst ein kleines Kreuz.',
      'Nach einer zufälligen Wartezeit erscheint ein Reiz. Drücke so schnell wie möglich die passende Schaltfläche.',
      'Wartest du zu lange, verschwindet der Reiz und zählt als „keine Antwort“. Drückst du bevor ein Reiz erscheint, zählt das als „zu früh“.',
      'Nach dem letzten Reiz erscheinen Genauigkeit und Reaktionszeiten.'
    ],
    tips: [
      'Schau auf die Mitte, nicht auf die Schaltflächen. Die Position der Schaltflächen lernst du nach wenigen Durchgängen.',
      'Nicht vorher raten und drücken: Zu frühe Antworten werden gezählt, aber nicht gewertet.',
      'Bleib mit dem Finger nahe an der Mitte der Schaltflächenreihe, damit alle Wege gleich kurz sind.',
      'Wenn du viele Fehler machst, lass dir mehr Zeit. Wenn du fast keine machst, kannst du schneller werden.'
    ],
    progression: [
      'Leichter: 2 oder 3 Antwortmöglichkeiten, lange Antwortzeit (1.500 ms und mehr), Farben.',
      'Schwerer: 5 oder 6 Möglichkeiten, kürzere Antwortzeit (600 bis 900 ms), Formen, kürzere und stärker schwankende Wartezeiten.',
      'Die Reaktionszeit steigt mit der Zahl der Möglichkeiten; das ist normal und kein Zeichen von Verschlechterung.',
      'Ziel: Genauigkeit über 95 % halten und dabei die Reaktionszeit senken.'
    ],
    cautions: [
      'Die Übung zeigt abrupt wechselnde Farben. Bei Lichtempfindlichkeit vorher ärztlichen Rat einholen.',
      'Bei Ermüdung oder Konzentrationsabfall abbrechen; die Werte werden dann unzuverlässig.'
    ],
    background: 'Je mehr Antwortmöglichkeiten es gibt, desto länger dauert die Entscheidung. Dieser Zusammenhang wird als Hick-Hyman-Gesetz beschrieben: Die Reaktionszeit wächst etwa mit dem Logarithmus der Zahl gleich wahrscheinlicher Möglichkeiten. Zusätzlich gibt es einen Austausch zwischen Tempo und Genauigkeit: Wer schneller antwortet, macht mehr Fehler. Deshalb werden beide Kennzahlen zusammen ausgewertet.',
    references: [
      'Hick, W. E. (1952). On the rate of gain of information. Quarterly Journal of Experimental Psychology, 4, 11–26.',
      'Hyman, R. (1953). Stimulus information as a determinant of reaction time. Journal of Experimental Psychology, 45, 188–196.'
    ],
    params: {
      trials: 'Anzahl der Reize im Durchlauf. Die Reize sind gleichmäßig auf die Möglichkeiten verteilt.',
      options: 'Anzahl der Farben beziehungsweise Formen und damit der Schaltflächen. Mehr Möglichkeiten verlangen längere Entscheidungen.',
      stimulus: '„Farben“: ein farbiger Kreis, passende Farb-Schaltfläche drücken. „Formen“: eine weiße Form, die Schaltfläche mit derselben Form drücken.',
      stimulusMs: 'Wie lange du für die Antwort Zeit hast, bevor sie als fehlend gewertet wird.',
      waitMinMs: 'Kürzeste Wartezeit zwischen zwei Reizen.',
      waitMaxMs: 'Längste Wartezeit zwischen zwei Reizen. Die tatsächliche Wartezeit liegt zufällig zwischen Minimum und Maximum, damit du den Zeitpunkt nicht erraten kannst.',
      sizeCm: 'Größe des Reizes in Zentimetern.',
      sound: 'Kurzer Ton bei jeder Antwort (hoch bei richtig, tief sonst).'
    },
    metrics: {
      correct: 'Anzahl der richtigen Antworten.',
      wrong: 'Antworten mit der falschen Schaltfläche.',
      omissions: 'Reize, bei denen du innerhalb der Antwortzeit nichts gedrückt hast.',
      early: 'Schaltflächen, die vor Erscheinen eines Reizes gedrückt wurden. Nicht in der Wertung.',
      accuracy: 'Anteil richtiger Antworten an allen Reizen.',
      rt_mean: 'Mittlere Zeit vom Erscheinen des Reizes bis zur richtigen Antwort. Enthält die Verzögerung von Bildschirm und Touch.',
      rt_median: 'Mittlere Zeit nach Sortierung der Einzelwerte, weniger empfindlich gegen Ausreißer.',
      rt_sd: 'Streuung der Reaktionszeiten. Kleinere Werte bedeuten gleichmäßigeres Reagieren.'
    }
  });
}));
