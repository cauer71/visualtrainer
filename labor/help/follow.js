(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('follow', {
    purpose: 'Du hältst den Finger auf einem gleichmäßig bewegten Ziel. Die Übung trainiert das gleitende Verfolgen mit den Augen und die gleichzeitige Führung der Hand (Augen-Hand-Verfolgung) und zeigt, wie lange und wie genau du das Ziel hältst.',
    setup: [
      'Kalibrierung durchführen, damit Größe und Geschwindigkeit in Zentimetern stimmen.',
      'Sitz etwa 50 bis 60 cm vom Bildschirm entfernt; der Arm ist so entspannt, dass die ganze Bahn erreichbar ist.',
      'Der Bildschirm sollte sauber sein, weil der Finger darüber gleitet.',
      'Lege die Hand nicht auf den Rahmen auf; sie soll frei beweglich bleiben.'
    ],
    steps: [
      'Bahn, Geschwindigkeit und Zielgröße einstellen. Einstieg: Ellipse, 8 cm/s, 3 cm Durchmesser, 30 s.',
      '„Start“ drücken. Das gelbe Ziel setzt sich in Bewegung.',
      'Setze den Finger auf das Ziel und gleite mit, ohne abzusetzen. Wenn du das Ziel triffst, färbt es sich grün.',
      'Verlierst du das Ziel, setze den Finger wieder an und hole auf.',
      'Nach der Zeit erscheinen die Kennzahlen.'
    ],
    tips: [
      'Folge dem Ziel mit den Augen und führe die Hand nach; Blick und Finger bleiben beieinander.',
      'Bewege dich mit dem ganzen Arm, nicht nur mit dem Finger. Das macht die Bewegung flüssiger.',
      'Wenn du das Ziel verloren hast, springe nicht hektisch hinterher, sondern fange es gezielt wieder ein.',
      'Wähle bei Anfängern die sichtbare Bahn. Ohne Bahn musst du die Bewegung vorhersagen.',
      'Lockere die Schulter und atme gleichmäßig.'
    ],
    progression: [
      'Leichter: Ellipse, langsame Geschwindigkeit (3 bis 6 cm/s), großes Ziel (4 bis 6 cm), größere Toleranz (1 cm).',
      'Schwerer: Liegende Acht oder verschlungene Kurve, höhere Geschwindigkeit (12 bis 25 cm/s), kleineres Ziel (1,5 bis 2 cm), geringe Toleranz, Bahn ausblenden.',
      'Wechsle die Hand und vergleiche die Ergebnisse.',
      'Ziel: Anteil der Zeit auf dem Ziel steigern, bei gleichzeitig höherer Geschwindigkeit.'
    ],
    cautions: [
      'Gleitende Augenbewegungen über längere Zeit sind ermüdend. Halte die Einheiten kurz (10 Minuten).',
      'Bei Schwindel, Übelkeit oder Augenbrennen sofort abbrechen.',
      'Schnelle Armbewegungen belasten Schulter und Ellenbogen. Pausen einlegen.'
    ],
    background: 'Beim gleitenden Verfolgen (Smooth Pursuit) folgen die Augen einem bewegten Ziel ohne Sprünge. Bei höheren Geschwindigkeiten oder unvorhersehbaren Bewegungen schalten die Augen auf kleine Aufholsprünge (Sakkaden) um. Die gemeinsame Führung von Auge und Hand ist eine zusammengesetzte Fähigkeit. Die App misst nur die Handführung; was die Augen tun, kann sie nicht erfassen.',
    references: [],
    params: {
      durationS: 'Dauer des Durchlaufs in Sekunden.',
      path: '„Ellipse“ ist gleichmäßig und vorhersehbar. „Liegende Acht“ und „Verschlungene Kurve“ haben wechselnde Krümmungen und sind schwerer.',
      speedCmS: 'Geschwindigkeit des Ziels in Zentimetern pro Sekunde (gleichmäßig, unabhängig von der Kurvenform).',
      diameterCm: 'Durchmesser des Ziels. Kleinere Ziele verlangen mehr Genauigkeit.',
      toleranceCm: 'Zusätzlicher Spielraum um das Ziel, der noch als „auf dem Ziel“ zählt, damit der Finger nicht pixelgenau sein muss.',
      showTrail: 'Zeigt die Bahn als dünne Linie. Ohne Bahn musst du die Bewegung vorhersagen.'
    },
    metrics: {
      on_pct: 'Anteil der Zeit, in der der Finger auf dem Ziel war (bezogen auf die gesamte Zeit, auch die ohne Finger).',
      on_s: 'Dieselbe Zeit in Sekunden.',
      mean_dist: 'Mittlerer Abstand zwischen Finger und Zielmitte, solange der Finger auf dem Bildschirm war. Kleinere Werte bedeuten genaueres Führen.',
      best_run: 'Längste Zeitspanne ohne Unterbrechung auf dem Ziel.',
      losses: 'Wie oft du das Ziel verloren hast, nachdem du es erreicht hattest.',
      touch_pct: 'Anteil der Zeit, in der der Finger den Bildschirm berührt hat, egal wo.'
    }
  });
}));
