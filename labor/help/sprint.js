(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('sprint', {
    purpose: 'Du trennst Reaktion und Bewegung: Zuerst hältst du den Finger auf einer Startfläche. Sobald das Ziel aufleuchtet, löst du den Finger so schnell wie möglich (Reaktionszeit) und berührst das Ziel (Bewegungszeit). So siehst du getrennt, wie schnell du startest und wie schnell du ankommst.',
    setup: [
      'Kalibrierung durchführen, damit Abstand und Zielgröße in Zentimetern stimmen.',
      'Der Bildschirm liegt entweder flach oder steht leicht geneigt; die Startfläche befindet sich unten in der Mitte, das Ziel darüber.',
      'Stütze die Hand so, dass der Zeigefinger mühelos auf der Startfläche ruht, ohne dass Druck entsteht.',
      'Für Vergleiche immer dieselbe Hand und dieselbe Haltung benutzen.'
    ],
    steps: [
      'Anzahl der Durchgänge, Wartezeit, Abstand und Zielgröße einstellen. Standard: 15 Durchgänge, 1–3,5 s Wartezeit, 20 cm Abstand.',
      '„Start“ drücken und den Finger auf die runde Startfläche legen und halten. Die Fläche färbt sich grün.',
      'Warte ruhig. Nach einer zufälligen Zeit leuchtet das gelbe Ziel auf.',
      'Löse den Finger sofort von der Startfläche und berühre das Ziel.',
      'Lässt du zu früh los (bevor das Ziel erscheint), ist das ein Fehlstart und der Durchgang beginnt neu. Nach dem letzten Durchgang erscheinen die Kennzahlen.'
    ],
    tips: [
      'Warte nicht auf das Ziel „mit angespanntem Finger“. Entspannt halten, dann reagieren.',
      'Berühre das Ziel in der Mitte. Das spart die Korrektur am Ende.',
      'Nach einem Fehlstart kurz durchatmen und mit ruhigem Finger erneut beginnen.',
      'Reaktionszeit und Bewegungszeit sind getrennte Fähigkeiten. Eine schnelle Reaktion bringt wenig, wenn der Weg zum Ziel lang dauert und umgekehrt.'
    ],
    progression: [
      'Leichter: großes Ziel (6 bis 8 cm), kürzerer Abstand (10 bis 15 cm), Ziel immer oben.',
      'Schwerer: kleines Ziel (2 bis 3 cm), größerer Abstand (25 bis 35 cm), Zielposition zufällig im Halbkreis.',
      'Variiere die Wartezeit zwischen 1 und 5 s, damit du dich nicht auf einen Rhythmus einstellst.',
      'Ziel: Reaktionszeit stabil senken und die Bewegungszeit bei gleicher Genauigkeit verkürzen.'
    ],
    cautions: [
      'Schnelle, kurze Bewegungen: Handgelenk und Finger regelmäßig lockern.',
      'Bei Lichtempfindlichkeit beachten: Das Ziel leuchtet plötzlich auf.',
      'Bei Beschwerden in Hand oder Arm abbrechen.'
    ],
    background: 'Die Reaktionszeit beschreibt die Zeitspanne vom Reiz bis zum Beginn der Bewegung. Die Bewegungszeit hängt nach dem Fittsschen Gesetz von Entfernung und Zielgröße ab: Je weiter und kleiner das Ziel, desto länger dauert die Bewegung. Die Trennung beider Anteile ist aus der Sportwissenschaft bekannt. Die App misst die Reaktion über das Loslassen der Startfläche; die Verzögerung von Touch-Sensor und Bildschirm ist darin enthalten.',
    references: ['Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology, 47, 381–391.'],
    params: {
      trials: 'Anzahl der Durchgänge. Für aussagekräftige Mittelwerte mindestens 10 bis 15.',
      minDelayMs: 'Kürzeste Wartezeit zwischen Halten der Startfläche und Aufleuchten des Ziels.',
      maxDelayMs: 'Längste Wartezeit. Die tatsächliche Wartezeit liegt zufällig dazwischen, damit der Zeitpunkt nicht erraten werden kann.',
      distanceCm: 'Abstand zwischen Startfläche und Ziel. Größere Abstände verlängern die Bewegungszeit.',
      targetCm: 'Durchmesser des Ziels. Kleinere Ziele verlangen genaueres Zielen.',
      target: '„Immer oben“: das Ziel liegt senkrecht über der Startfläche. „Zufällig im Halbkreis“: Richtung wechselt bis etwa 60 Grad nach links oder rechts.',
      sound: 'Kurzer Ton, wenn das Ziel aufleuchtet, und bei Treffern bzw. Fehlern.'
    },
    metrics: {
      hits: 'Anzahl erfolgreicher Durchgänge (Ziel berührt).',
      false_starts: 'Wie oft du die Startfläche vor dem Aufleuchten losgelassen hast. Hohe Werte zeigen Ungeduld oder Anspannung.',
      error_taps: 'Berührungen neben das Ziel, nachdem du die Startfläche losgelassen hattest.',
      rt_mean: 'Mittlere Zeit vom Aufleuchten bis zum Loslassen der Startfläche. Enthält die Verzögerung des Geräts.',
      rt_median: 'Mittlere Zeit nach Sortierung der Einzelwerte, weniger empfindlich gegen Ausreißer.',
      rt_sd: 'Streuung der Reaktionszeiten. Kleinere Werte bedeuten gleichmäßigeres Reagieren.',
      mt_mean: 'Mittlere Zeit vom Loslassen bis zur Berührung des Ziels. Hängt von Abstand und Zielgröße ab.'
    }
  });
}));
