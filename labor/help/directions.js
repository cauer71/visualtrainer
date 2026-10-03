(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('directions', {
    purpose: 'Du trainierst, die Richtung eines Pfeils schnell und sicher zuzuordnen. Ein Pfeil zeigt in eine von vier oder acht Richtungen; du gibst entweder dieselbe Richtung oder die Gegenrichtung an. Die Eingabe erfolgt per Berührung auf einem Richtungsfeld oder mit einer Hilfsperson, die bestätigt, ob du die Richtung mit dem Körper (zum Beispiel mit einer Balance-Plattform) richtig ausgeführt hast.',
    setup: [
      'Kalibrierung durchführen, damit die Pfeilgröße in Zentimetern stimmt.',
      'Berührungsmodus: Sitz oder stehe so, dass du das Richtungsfeld unten sicher erreichst.',
      'Modus mit Hilfsperson: Die Person steht stabil, zum Beispiel auf einer Plattform, mit Haltegriff oder einer Sicherung in Reichweite. Die Hilfsperson sitzt am Bildschirm und sieht die Bewegung.',
      'Die App kann keine Plattform auslesen. Die Hilfsperson bestätigt jede Antwort mit „Richtig“ (Leertaste) oder „Falsch“ (Taste X).',
      'Zeige und vereinbare vorher, welche Körperbewegung zu welcher Richtung gehört (zum Beispiel Neigen nach vorn für oben).'
    ],
    steps: [
      'Anzahl der Pfeile, Richtungen, Aufgabe und Eingabeart einstellen. Beginne mit 4 Richtungen, „In Pfeilrichtung“ und Berührung.',
      '„Start“ drücken. In der Mitte steht zunächst ein kleines Kreuz.',
      'Nach einer zufälligen Wartezeit erscheint ein Pfeil. Gib die Richtung an: im Berührungsmodus auf das passende Feld tippen, mit Hilfsperson die Bewegung ausführen und bestätigen lassen.',
      'Bei „In Gegenrichtung“ gilt die entgegengesetzte Richtung als richtig (Pfeil nach oben bedeutet unten).',
      'Wird die Antwortzeit überschritten, zählt der Pfeil als „keine Antwort“. Nach dem letzten Pfeil erscheinen die Kennzahlen.'
    ],
    tips: [
      'Beginne mit der Pfeilrichtung und wechsle erst bei sicherer Ausführung zur Gegenrichtung. Sie ist deutlich anspruchsvoller, weil die automatische Zuordnung unterdrückt werden muss.',
      'Schau in die Mitte und lasse den Pfeil kommen, statt die Richtungsfelder abzusuchen.',
      'Antworte so schnell, wie es sicher geht. Ein falscher Treffer kostet mehr als ein paar Millisekunden.',
      'Die Hilfsperson sollte ehrlich und gleichmäßig bestätigen; schwankende Strenge verfälscht die Zeiten.',
      'Wechsle nach der Hälfte die Aufgabe und vergleiche die Genauigkeit.'
    ],
    progression: [
      'Leichter: 4 Richtungen, In Pfeilrichtung, lange Antwortzeit (3.000 ms und mehr), große Pfeile.',
      'Schwerer: 8 Richtungen, In Gegenrichtung, kurze Antwortzeit (1.000 bis 1.500 ms), kürzere und schwankendere Wartezeiten.',
      'Mit Plattform: erst im Sitzen oder bei stabiler Standfläche, dann schrittweise instabiler.',
      'Ziel: Genauigkeit über 95 Prozent halten und dabei die Reaktionszeit senken.'
    ],
    cautions: [
      'Auf Plattformen und instabilen Flächen besteht Sturzgefahr. Sicherung, Haltegriff und Aufsicht sind Pflicht; bei Schwindel oder Unsicherheit sofort abbrechen.',
      'Nicht barfuß oder in Socken auf glatten Flächen üben, wenn eine Plattform benutzt wird.',
      'Bei Lichtempfindlichkeit beachten: Die Pfeile wechseln abrupt.',
      'Die App misst die Körperbewegung nicht. Die Zeit enthält die Reaktion der Hilfsperson.'
    ],
    background: 'Die Zuordnung eines Reizes zu einer Antwort ist am schnellsten, wenn Reiz und Antwort räumlich übereinstimmen (Reiz-Reaktions-Kompatibilität). Die Gegenrichtung ist inkompatibel: Die naheliegende Reaktion muss unterdrückt und die andere gewählt werden, das verlängert die Reaktionszeit und erhöht die Fehlerquote. Mit acht Richtungen steigt außerdem die Zahl der Alternativen. Die Übung trainiert diese schnelle Zuordnung, optional mit einer Körperbewegung als Antwort.',
    references: [
      'Fitts, P. M., & Seeger, C. M. (1953). S-R compatibility: Spatial characteristics of stimulus and response codes. Journal of Experimental Psychology, 46, 199–210.',
      'Simon, J. R. (1969). Reactions toward the source of stimulation. Journal of Experimental Psychology, 81, 174–176.'
    ],
    params: {
      trials: 'Anzahl der Pfeile im Durchlauf. Die Richtungen sind gleichmäßig verteilt.',
      directions: '4 Richtungen (oben, rechts, unten, links) oder 8 Richtungen (zusätzlich die Diagonalen). Mehr Richtungen sind schwerer.',
      rule: '„In Pfeilrichtung“: Die Antwort entspricht dem Pfeil. „In Gegenrichtung“: Die entgegengesetzte Richtung ist richtig.',
      input: '„Berührung auf dem Richtungsfeld“: Du tippst die Richtung selbst an. „Hilfsperson bestätigt“: Du führst die Richtung mit dem Körper aus, die Hilfsperson drückt Richtig oder Falsch.',
      stimulusMs: 'Wie lange nach dem Erscheinen des Pfeils geantwortet werden darf. Danach zählt der Pfeil als keine Antwort.',
      waitMinMs: 'Kürzeste Wartezeit zwischen zwei Pfeilen.',
      waitMaxMs: 'Längste Wartezeit. Die tatsächliche Zeit liegt zufällig dazwischen, damit der Zeitpunkt nicht erraten werden kann.',
      sizeCm: 'Größe des Pfeils in Zentimetern.',
      sound: 'Kurzer Ton bei Antwort (hoch bei richtig, tief bei falsch).'
    },
    metrics: {
      correct: 'Anzahl der richtigen Antworten.',
      wrong: 'Antworten mit falscher Richtung (bei Hilfsperson: als Falsch bestätigt).',
      omissions: 'Pfeile, auf die innerhalb der Antwortzeit nicht geantwortet wurde.',
      early: 'Antworten, die gegeben wurden, bevor ein Pfeil erschien. Sie zählen nicht in der Wertung.',
      accuracy: 'Anteil richtiger Antworten an allen Pfeilen.',
      rt_mean: 'Mittlere Zeit vom Erscheinen des Pfeils bis zur richtigen Antwort. Mit Hilfsperson enthält sie deren Reaktionszeit.',
      rt_median: 'Mittlere Zeit nach Sortierung der Einzelwerte, weniger empfindlich gegen Ausreißer.',
      rt_sd: 'Streuung der Reaktionszeiten. Kleinere Werte bedeuten gleichmäßigeres Reagieren.'
    }
  });
}));
