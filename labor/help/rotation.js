(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('rotation', {
    purpose: 'Du trainierst räumliches Vorstellungsvermögen. Zwei Figuren aus Quadraten stehen nebeneinander; die rechte ist gedreht und entweder dieselbe Figur oder ihr Spiegelbild. Du entscheidest, ob sie „gleich (gedreht)“ oder „gespiegelt“ ist. Die Übung zeigt außerdem, wie stark die Antwortzeit mit dem Drehwinkel zunimmt.',
    setup: [
      'Kalibrierung ist hier nur für die Figurengröße wichtig.',
      'Sitz bequem; du brauchst Ruhe und Konzentration, keine schnelle Hand.',
      'Der Kopf bleibt gerade, damit du die Drehung nicht durch Kopfneigung „löst“.'
    ],
    steps: [
      'Anzahl der Aufgaben, Quadrate pro Figur und Drehwinkel einstellen. Einstieg: 24 Aufgaben, 6 Quadrate, Drehung in 90°-Schritten.',
      '„Start“ drücken. Links steht die Vorlage in Blau, rechts die Vergleichsfigur in Gelb.',
      'Stelle dir vor, du drehst die Vergleichsfigur zurück. Liegt sie danach genau auf der Vorlage, drücke „Gleich (gedreht)“.',
      'Ergibt die Drehung nie die Vorlage, weil sie spiegelverkehrt ist, drücke „Gespiegelt“.',
      'Nach der letzten Aufgabe erscheinen Genauigkeit, Antwortzeiten und der Anstieg der Antwortzeit je 90° Drehung.'
    ],
    tips: [
      'Orientiere dich an Merkmalen wie einem Ausläufer, einer Ecke oder einem Loch und verfolge, wo sie nach der Drehung landen müssten.',
      'Wenn du die Figur mit den Händen „mitdrehst“, ist das erlaubt; es hilft vielen Menschen.',
      'Nicht zu schnell antworten: Bei Unsicherheit lieber kurz länger überlegen, damit die Genauigkeit stimmt.',
      'Der Drehwinkel verlängert die Antwort. Das ist normal.'
    ],
    progression: [
      'Leichter: 4 bis 5 Quadrate pro Figur, nur Vielfache von 90°, größere Quadrate.',
      'Schwerer: 7 bis 9 Quadrate, Vielfache von 45°, Zeitlimit je Aufgabe (zum Beispiel 10 s).',
      'Ziel: Genauigkeit über 90 % und kleinerer Anstieg der Antwortzeit je 90° (Hinweis auf effizientere mentale Drehung).'
    ],
    cautions: [
      'Bei Kopfschmerz oder Schwindel abbrechen.',
      'Frustrierend schwere Einstellungen vermeiden; Erfolgsquote nicht zu weit unter 70 % fallen lassen.',
      'Die Figuren sind bewusst nicht symmetrisch, damit die Aufgabe eindeutig lösbar ist.'
    ],
    background: 'Die Aufgabe geht auf klassische Versuche zur mentalen Rotation zurück: Versuchspersonen entscheiden, ob zwei gedrehte Figuren gleich oder spiegelbildlich sind. Die Antwortzeit steigt dabei annähernd linear mit dem Drehwinkel, als würde man das Objekt gedanklich drehen. Der Anstieg ist ein Maß für die Geschwindigkeit der mentalen Rotation. Die Kennzahl „Anstieg je 90°“ wird aus den richtigen Antworten berechnet (Winkel von 0 bis 180°, falls größer als 180° wird der kürzere Weg gewertet).',
    references: ['Shepard, R. N., & Metzler, J. (1971). Mental rotation of three-dimensional objects. Science, 171, 701–703.'],
    params: {
      trials: 'Anzahl der Aufgaben. Für einen aussagekräftigen Anstieg mindestens 20.',
      cells: 'Wie viele Quadrate jede Figur hat. Mehr Quadrate sind schwerer.',
      angles: 'Drehwinkel der Vergleichsfigur: nur Vielfache von 90° oder auch von 45°. 45°-Schritte sind schwerer.',
      cellCm: 'Kantenlänge eines Quadrates in Zentimetern.',
      timeoutS: 'Optionales Zeitlimit je Aufgabe. 0 bedeutet kein Limit. Bei Überschreitung zählt die Aufgabe als falsch.'
    },
    metrics: {
      correct: 'Richtige Entscheidungen.',
      accuracy: 'Anteil richtiger Entscheidungen. 50 % wäre Raten.',
      rt_mean: 'Mittlere Antwortzeit bei richtigen Antworten.',
      rt_median: 'Mittlere Antwortzeit nach Sortierung, weniger empfindlich gegen Ausreißer.',
      slope: 'Um wie viele Millisekunden die Antwortzeit pro 90° Drehung zunimmt (lineare Regression über richtige Antworten). Kleinere Werte bedeuten schnellere mentale Drehung. Nur bei mindestens drei richtigen Antworten mit verschiedenen Winkeln.'
    }
  });
}));
