(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('orient', {
    purpose: 'Du übst die gezielte Orientierung des Körpers nach einem visuellen Reiz. Ein Punkt leuchtet in einer von vier oder acht Richtungen auf; du bewegst deinen Körper in diese Richtung, zum Beispiel durch Neigen einer Balance-Plattform. Eine Hilfsperson bestätigt, wann die Richtung erreicht ist, und die App misst die Zeit bis zur Bestätigung. Optional folgt die Rückkehr zur Mitte.',
    setup: [
      'Kalibrierung durchführen, damit die Punktgröße in Zentimetern stimmt.',
      'Die Person steht oder sitzt auf der Plattform mit Haltegriff, Sicherung oder Geländer in Reichweite. Eine Hilfsperson sitzt am Bildschirm und sieht die Plattform.',
      'Die App kann die Plattform nicht auslesen. Die Hilfsperson bestätigt „Erreicht“ per Leertaste oder Knopf und „Falsche Richtung“ per Taste X. Ein USB-Fußschalter, der Tastendrücke sendet, funktioniert als Eingabe.',
      'Vereinbart vorher, welche Neigung zu welcher Richtung gehört (zum Beispiel Neigung nach vorn für oben) und ab welcher Lage „Erreicht“ gilt.',
      'Der Bildschirm sollte auf Augenhöhe stehen, damit die Person den Kopf nicht neigen muss.'
    ],
    steps: [
      'Anzahl der Ziele, Richtungen, Rückkehr zur Mitte und Zeitlimit einstellen. Starte mit 4 Richtungen und Rückkehr zur Mitte.',
      '„Start“ drücken. Die Person steht ruhig in der Mitte.',
      'Nach der Pause leuchtet ein gelber Punkt in einer Richtung auf. Die Person orientiert sich dorthin.',
      'Sobald die Richtung erreicht ist, drückt die Hilfsperson „Erreicht“. Wurde eine falsche Richtung eingenommen, drückt sie „Falsche Richtung“.',
      'Bei aktivierter Rückkehr färbt sich die Mitte; die Person kehrt zurück, die Hilfsperson bestätigt erneut. Nach dem letzten Ziel erscheinen die Kennzahlen.'
    ],
    tips: [
      'Die Hilfsperson sollte stets nach derselben Regel bestätigen, damit die Zeiten vergleichbar bleiben.',
      'Die Person soll ruhig und kontrolliert bewegen. Schnelles Ausschlagen mit anschließendem Wackeln ist kein Erfolg.',
      'Zur Auswertung die Zeiten je Richtung betrachten: Auffällige Unterschiede zwischen Richtungen sind ein Hinweis auf Schwächen oder Gewohnheiten.',
      'Kurze Pausen zwischen Durchgängen verhindern Ermüdung der Beine.',
      'Beim Umstieg auf 8 Richtungen zuerst die Diagonalen separat üben.'
    ],
    progression: [
      'Leichter: 4 Richtungen, lange Pause und Zeitlimit (10 bis 20 Sekunden), große Punkte, Rückkehr zur Mitte an.',
      'Schwerer: 8 Richtungen, kurzes Zeitlimit (3 bis 5 Sekunden), kleine Punkte, kürzere Pausen, instabilere Standfläche.',
      'Ohne Rückkehr zur Mitte werden Richtungswechsel direkt trainiert, das ist anspruchsvoller.',
      'Ziel: Zeit bis zum Ziel verkürzen, ohne dass Fehler zunehmen.'
    ],
    cautions: [
      'Plattformen bergen Sturzgefahr. Sicherung, Haltegriff und Aufsicht sind Pflicht. Bei Schwindel, Unsicherheit oder Schmerzen sofort abbrechen.',
      'Nicht in Socken auf glatten Böden üben. Sicheres Schuhwerk oder rutschfeste Unterlage verwenden.',
      'Personen mit Gleichgewichtsstörungen, Gelenkproblemen oder nach Operationen trainieren nur nach Absprache mit der behandelnden Fachperson.',
      'Die Zeit enthält die Reaktion der Hilfsperson und ist nur zwischen gleichen Hilfspersonen und Aufbauten vergleichbar.'
    ],
    background: 'Gleichgewichts- und Orientierungstraining mit visuellem Ziel koppelt Wahrnehmung und Körperbewegung: Der Reiz wird gesehen, die Zielrichtung bestimmt und eine kontrollierte Bewegung ausgeführt. Ohne Sensor misst die App nur die Zeit bis zur Bestätigung durch eine Person; Qualität der Bewegung, Ausschlag und Schwankung werden nicht erfasst. Wer solche Größen braucht, benötigt eine Plattform mit Messwertausgabe.',
    references: [],
    params: {
      trials: 'Anzahl der Ziele im Durchlauf. Die Richtungen sind gleichmäßig verteilt.',
      directions: '4 Richtungen oder 8 Richtungen (mit Diagonalen). Mehr Richtungen sind anspruchsvoller.',
      returnToCenter: 'Bei „Ja“ muss die Person nach jedem Ziel zur Mitte zurückkehren, was ebenfalls bestätigt und gemessen wird.',
      waitMs: 'Pause in Millisekunden zwischen Bestätigung und nächstem Ziel.',
      timeoutS: 'Zeitlimit je Ziel in Sekunden. Nach Ablauf wird es als „Zeitlimit überschritten“ gewertet. 0 bedeutet kein Limit.',
      sizeCm: 'Durchmesser der Punkte in Zentimetern.',
      sound: 'Kurzer Ton, wenn ein Ziel erscheint, und bei Bestätigung.'
    },
    metrics: {
      reached: 'Anzahl der Ziele, die als erreicht bestätigt wurden.',
      wrong: 'Ziele, bei denen die falsche Richtung eingenommen wurde.',
      timeouts: 'Ziele, die das Zeitlimit überschritten haben.',
      t_mean: 'Mittlere Zeit vom Aufleuchten bis zur Bestätigung bei erreichten Zielen. Enthält die Reaktion der Hilfsperson.',
      t_median: 'Mittlere Zeit nach Sortierung der Einzelwerte, weniger empfindlich gegen Ausreißer.',
      t_sd: 'Streuung der Zeiten bis zum Ziel. Kleinere Werte bedeuten gleichmäßigere Ausführung.',
      return_mean: 'Mittlere Zeit für die Rückkehr zur Mitte (nur mit Rückkehr).'
    }
  });
}));
