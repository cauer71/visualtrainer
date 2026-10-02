(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('chart', {
    purpose: 'Du liest eine Tafel aus Zeichengruppen Schritt für Schritt. Eine Markierung zeigt das jeweils nächste Zeichen, du sprichst es laut aus. Selbst getaktet misst die App deinen Lesefluss; im Metronom-Takt trainierst du gleichmäßiges Tempo. Die Übung schult Blicksprünge, Lesefluss und das Erkennen von Zeichen im Gedränge.',
    setup: [
      'Kalibrierung durchführen, damit Zeichen- und Abstandsgrößen stimmen.',
      'Sitz etwa 50 bis 60 cm vor dem Bildschirm; der Kopf bleibt ruhig, nur die Augen wandern.',
      'Wähle einen Raum, in dem du laut sprechen kannst. Wer nicht laut sprechen kann, liest leise innerlich mit, das Training ist dann aber weniger kontrolliert.'
    ],
    steps: [
      'Tafelgröße, Zeichen je Gruppe und Abstände einstellen. Für den Einstieg: 4×4 Gruppen mit je 3 Buchstaben.',
      'Tempo wählen: „Selbst bestimmt“ (Tippen = weiter) oder „Metronom-Takt“.',
      'Selbst bestimmt: Tippe oder drücke die Leertaste zum Starten. Das erste Zeichen wird markiert. Lies es laut und tippe anschließend, damit die Markierung zum nächsten springt.',
      'Metronom: Nach einer Taktlänge springt die Markierung im Takt von selbst weiter. Lies jedes markierte Zeichen laut, bevor der nächste Schlag kommt.',
      'Nach dem letzten Zeichen erscheinen die Kennzahlen.'
    ],
    tips: [
      'Schau in die Mitte des markierten Zeichens und lies es vollständig. Nicht schon zum nächsten schielen.',
      'Beim Tippen im Selbsttempo nicht hetzen: Ein gleichmäßiger Rhythmus ist wertvoller als einzelne schnelle Schritte.',
      'Bei Leseordnung „Erst alle ersten Zeichen, dann alle zweiten“ zwingt die Tafel zu größeren Sprüngen und stärkerem Gedränge; sie ist anspruchsvoller als „Gruppe für Gruppe“.',
      'Vergleiche Durchläufe nur bei gleicher Tafel und gleichem Abstand.',
      'Zu enge Zeichen: Ein größerer Abstand zwischen den Zeichen erleichtert das Erkennen (weniger Gedränge).'
    ],
    progression: [
      'Leichter: weniger Gruppen (3×3), nur 1 oder 2 Zeichen je Gruppe, größere Zeichen (3 cm), größere Abstände, „Gruppe für Gruppe“, Selbsttempo oder langsamer Takt (40 bis 50).',
      'Schwerer: größere Tafel (5×6), 4 bis 5 Zeichen je Gruppe, kleinere Zeichen (1 bis 1,5 cm), kleine Abstände zwischen den Zeichen (Gedränge), „Erst alle ersten …“, schneller Takt (70 bis 100).',
      'Wenn die Tafel nicht ins Feld passt, wird sie automatisch verkleinert; das erkennst du am Hinweis unten.',
      'Ziel: Gesamtzeit verkürzen und die Gleichmäßigkeit verbessern (kleinerer Wert bei „Streuung / Mittel“).'
    ],
    cautions: [
      'Bei Augenermüdung, Brennen oder Kopfschmerz sofort pausieren.',
      'Bei sehr kleinen Zeichen nicht zusammenkneifen; lieber die Zeichen vergrößern.',
      'Wenn Doppelbilder auftreten, abbrechen und fachlich abklären lassen.'
    ],
    background: 'Das Lesen von Zeichentafeln in fester Reihenfolge ist ein klassisches Verfahren, um Blicksprünge und Lesefluss zu üben und zu vergleichen. Zeichen, die dicht nebeneinander stehen, sind schwerer zu erkennen als einzelne (Crowding). Dieser Effekt nimmt mit dem Abstand von der Blickmitte zu, deshalb wirkt die Tafel besonders, wenn man die Zeichen im Augenwinkel „mitnimmt“. Die Gleichmäßigkeit des Tempos (Streuung geteilt durch Mittel) ist eine einfache Kennzahl für flüssiges Lesen.',
    references: [],
    params: {
      rows: 'Zeilen mit Zeichengruppen.',
      cols: 'Spalten mit Zeichengruppen.',
      groupSize: 'Zeichen je Gruppe. Mehr Zeichen verlängern die Tafel und verstärken das Gedränge.',
      symbols: 'Buchstaben oder Ziffern 1 bis 9. Innerhalb einer Gruppe kommt jedes Zeichen nur einmal vor.',
      sizeCm: 'Zeichenhöhe in Zentimetern.',
      letterGapCm: 'Abstand zwischen den Zeichen einer Gruppe. Kleinere Abstände verstärken das Gedränge (Crowding).',
      groupGapCm: 'Abstand zwischen den Gruppen. Größere Abstände verlangen größere Blicksprünge.',
      order: '„Gruppe für Gruppe“: erst alle Zeichen der ersten Gruppe, dann der zweiten und so weiter. „Erst alle ersten Zeichen, dann alle zweiten …“: pro Durchgang durch die Tafel jeweils eine Position jeder Gruppe.',
      pace: '„Selbst bestimmt“: du tippst, wenn du ein Zeichen gelesen hast. „Metronom-Takt“: die Markierung springt im eingestellten Takt.',
      bpm: 'Schläge pro Minute beim Metronom-Takt. Nur wirksam bei „Metronom-Takt“.'
    },
    metrics: {
      symbols: 'Anzahl der gelesenen Zeichen auf der Tafel.',
      total: 'Gesamtzeit vom ersten bis zum letzten Zeichen.',
      per_min: 'Gelesene Zeichen pro Minute (Lesegeschwindigkeit).',
      step_mean: 'Nur Selbsttempo: mittlere Zeit pro Zeichen.',
      step_sd: 'Nur Selbsttempo: Streuung der Zeit pro Zeichen.',
      step_cv: 'Nur Selbsttempo: Streuung geteilt durch Mittelwert in Prozent. Kleinere Werte bedeuten gleichmäßigeres Lesen.',
      bpm: 'Nur Metronom-Takt: der eingestellte Takt.'
    }
  });
}));
