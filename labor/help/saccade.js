(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('saccade', {
    purpose: 'Du übst schnelle, rhythmische Blickwechsel. Ein Zeichen springt im Takt eines Metronoms zwischen festen Punkten, du folgst ihm mit den Augen und liest es laut vor. Das schult präzise Blicksprünge (Sakkaden), das Halten eines Rhythmus und das schnelle Erfassen eines Zeichens nach dem Sprung.',
    setup: [
      'Kalibrierung durchführen, damit die Blicksprung-Strecke in Zentimetern und Grad stimmt.',
      'Sitz bequem etwa 50 bis 60 cm vor dem Bildschirm. Der Kopf bleibt ruhig; nur die Augen bewegen sich.',
      'Ton einschalten, damit du den Takt hörst. Bei lauter Umgebung Kopfhörer benutzen.',
      'Für den Berührungsmodus die dominante Hand bereit halten; sonst reicht lautes Lesen.'
    ],
    steps: [
      'Takt, Anordnung und Zeichenart wählen. Beginne mit 60 Schlägen pro Minute und den vier Ecken.',
      '„Start“ drücken. Nach dem Countdown folgt ein Vorlauf von einer Taktlänge.',
      'Bei jedem Schlag erscheint ein Zeichen an einem der Punkte. Schau sofort hin und sprich es laut aus, bevor der nächste Schlag kommt.',
      'Im Berührungsmodus tippst du das Zeichen zusätzlich noch während es sichtbar ist an. Nicht berührte Zeichen zählen als verpasst.',
      'Nach der letzten Wiederholung erscheinen die Kennzahlen.'
    ],
    tips: [
      'Bewege die Augen, nicht den Kopf. Schiebe das Kinn nicht mit.',
      'Lies jedes Zeichen vollständig laut, auch wenn es leicht erscheint. Das Sprechen zwingt dazu, wirklich zu fixieren.',
      'Wenn du den Takt verlierst, steige beim nächsten Schlag wieder ein, statt hinterherzuhetzen.',
      'Entspannte Schultern und ruhige Atmung erleichtern den Rhythmus.',
      'Starte mit sehr langsamem Takt, wenn du unsicher bist. Genauigkeit vor Tempo.'
    ],
    progression: [
      'Leichter: langsamerer Takt (30 bis 50 Schläge), Muster „Links und rechts“, größere Zeichen, Ziffern, Reihenfolge „Der Reihe nach“.',
      'Schwerer: schnellerer Takt (80 bis 120 Schläge), Raster 3×3, kleinere Zeichen, Silben oder Buchstaben, Reihenfolge „Zufällig“.',
      'Mit Berührung ist die Aufgabe deutlich anspruchsvoller; starte dort mit 40 bis 60 Schlägen.',
      'Wenn du dich sicher fühlst, vergrößere die Strecke der Blicksprünge (kleinere Zeichen erlauben weitere Positionen im Feld).'
    ],
    cautions: [
      'Das Zeichen wechselt im Takt; bei Lichtempfindlichkeit vorher ärztlichen Rat einholen und mit langsamem Takt beginnen.',
      'Wenn die Augen brennen oder Kopfschmerz entsteht, sofort pausieren. Blinzle bewusst.',
      'Bei Schwindel oder Übelkeit abbrechen.'
    ],
    background: 'Beim Lesen und Suchen springen die Augen in kurzen, ruckartigen Bewegungen (Sakkaden) von Punkt zu Punkt; erst in der Ruhe dazwischen (Fixation) wird Information aufgenommen. Die Übung nutzt einen äußeren Takt, um Sprünge gleichmäßig und zielgenau zu machen. Ein Zeichen nach dem Sprung sofort laut zu benennen, stellt sicher, dass der Blick tatsächlich dort angekommen ist. Die App kann die Blickbewegung selbst nicht messen: Im Berührungsmodus wird nur die Hand-Antwort erfasst, ansonsten beruht die Kontrolle auf dir.',
    references: [],
    params: {
      bpm: 'Schläge pro Minute. 60 entspricht einem Schlag pro Sekunde. Höhere Werte verlangen schnellere Blicksprünge.',
      durationS: 'Dauer des Durchlaufs in Sekunden. Daraus ergibt sich die Zahl der Schläge (Dauer × Takt ÷ 60).',
      sizeCm: 'Höhe der Zeichen in Zentimetern. Kleinere Zeichen sind schwerer zu erkennen und verlangen genaueres Fixieren.',
      pattern: 'Wo die Zeichen erscheinen: vier Ecken, vier Ecken plus Mitte, links und rechts, oben und unten oder ein Raster aus 3×3 Punkten.',
      order: '„Der Reihe nach“ läuft die Punkte in fester Reihenfolge ab (vorhersehbar). „Zufällig“ wählt den nächsten Punkt zufällig, nie zweimal denselben hintereinander.',
      symbols: 'Ziffern 1 bis 9, Buchstaben oder zufällige Silben aus Konsonant und Vokal. Silben sind am anspruchsvollsten.',
      touch: 'Bei „Ja“ muss das Zeichen im Takt berührt werden. Das misst zusätzlich Trefferquote und Verzögerung.',
      sound: 'Metronom-Ton bei jedem Schlag. Wird empfohlen, weil der Takt die Aufgabe trägt.'
    },
    metrics: {
      beats: 'Anzahl der gezeigten Zeichen im Durchlauf.',
      bpm: 'Der eingestellte Takt zum Dokumentieren des Durchlaufs.',
      amp_cm: 'Größte Entfernung zwischen zwei Punkten des gewählten Musters in Zentimetern. Zeigt, wie weit der Blick maximal springen musste.',
      amp_deg: 'Dieselbe Strecke als Sehwinkel in Grad, berechnet aus dem eingestellten Abstand. Größere Winkel bedeuten größere Sprünge.',
      hits: 'Nur im Berührungsmodus: Zeichen, die innerhalb ihres Schlags berührt wurden.',
      misses: 'Nur im Berührungsmodus: Zeichen, die nicht berührt wurden, bevor das nächste kam.',
      stray: 'Nur im Berührungsmodus: Berührungen neben dem Zeichen oder doppelte Berührungen.',
      accuracy: 'Nur im Berührungsmodus: Anteil der berührten an allen gezeigten Zeichen.',
      lat_mean: 'Nur im Berührungsmodus: mittlere Zeit vom Schlag bis zur Berührung. Kleinere Werte bedeuten schnelleres Erfassen und Greifen.',
      lat_sd: 'Nur im Berührungsmodus: Streuung dieser Zeiten. Kleinere Werte zeigen einen gleichmäßigeren Rhythmus.'
    }
  });
}));
