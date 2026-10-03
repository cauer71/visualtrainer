(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('slalom', {
    purpose: 'Du steuerst eine Kugel seitlich durch Tore, die von oben nach unten laufen. Die Übung trainiert vorausschauendes, gleichmäßiges Steuern und das Einschätzen der Torlücke. Gesteuert wird mit Zeiger, Pfeiltasten oder durch Kippen des Geräts. Eine Balance-Plattform wird nicht ausgelesen.',
    setup: [
      'Kalibrierung durchführen, damit Torweite und Abstände in Zentimetern stimmen.',
      'Zeiger: Mit Maus oder Finger folgt die Kugel der waagerechten Position. Das ist die einfachste Steuerung und eignet sich zum Ausprobieren.',
      'Pfeiltasten: Links und rechts steuern die Kugel; auch A und D funktionieren. Ein Gerät, das Tastendrücke sendet (etwa eine Plattform mit Tastaturausgabe), lässt sich so einbinden.',
      'Kippen: Das Gerät selbst wird nach links oder rechts geneigt. Das setzt ein Gerät mit Neigungssensor voraus (Tablet oder Handy) und funktioniert nicht in jedem Browser; bei Fehlschlag auf Zeiger wechseln.',
      'Wenn du auf einer Plattform übst, brauchst du eine Sicherung und eine Hilfsperson, die die Übung bedient.'
    ],
    steps: [
      'Dauer, Torweite und Geschwindigkeit einstellen. Starte mit 60 Sekunden, 12 cm Lücke, 14 cm pro Sekunde.',
      'Steuerung wählen und „Start“ drücken. Die Kugel sitzt unten, Tore laufen von oben herab.',
      'Steuere die Kugel durch die Lücke jedes Tores, ohne die Stangen (blaue Balken) zu berühren.',
      'Berührst du eine Stange, blitzt der Bildschirm kurz rot und die Serie bricht ab.',
      'Mit der Zeit werden die Tore schneller (Beschleunigung). Nach der Dauer erscheinen die Kennzahlen.'
    ],
    tips: [
      'Schau auf das übernächste Tor, nicht auf die Kugel. Wer vorausschaut, steuert ruhiger.',
      'Kleine, früh begonnene Bewegungen sind besser als große, späte Korrekturen.',
      'Bei Pfeiltasten und Kippen ruhig halten: ständiges Hin- und Herwackeln ist anstrengender als eine geglättete Linie.',
      'Die Mitte der Lücke zählt: Die Kennzahl „Abweichung von der Torlückenmitte“ zeigt, wie sauber du fährst.',
      'Beginne mit weiten Toren und langsamer Geschwindigkeit, bis du den Rhythmus spürst.'
    ],
    progression: [
      'Leichter: weite Lücke (16 bis 20 cm), langsame Geschwindigkeit (6 bis 10 cm/s), keine Beschleunigung.',
      'Schwerer: enge Lücke (6 bis 8 cm), hohe Geschwindigkeit (20 bis 30 cm/s), 40 bis 80 Prozent Beschleunigung pro Minute, kleiner Abstand zwischen den Toren.',
      'Mit Pfeiltasten oder Kippen ist die Aufgabe schwerer als mit Zeiger, weil die Kugel nicht augenblicklich folgt.',
      'Ziel: Mehr Tore in Folge ohne Fehler und kleinere Abweichung von der Mitte.'
    ],
    cautions: [
      'Bei Lichtempfindlichkeit beachten: Der Bildschirm blitzt bei Fehlern kurz rot und die Szene bewegt sich schnell.',
      'Beim Kippen des Geräts auf sicheren Stand und feste Haltung achten, damit es nicht herunterfällt.',
      'Auf Plattformen besteht Sturzgefahr; Sicherung und Aufsicht sind Pflicht.',
      'Bei Schwindel oder Übelkeit sofort abbrechen; Bewegung im Bildschirm kann Reisekrankheit auslösen.'
    ],
    background: 'Das Steuern durch Hindernisse verlangt Vorausschau, Abschätzen von Abständen und feine, rechtzeitig dosierte Bewegungen. Wie bei vielen Fahr- und Ausweichaufgaben gilt: Wer weiter vorausschaut, korrigiert weniger. Die Aufgabe ähnelt Slalom-Übungen auf einer Balance-Plattform, nutzt aber nur Eingaben, die ein gewöhnlicher Browser liefern kann (Zeiger, Tasten, Gerätekippen). Eine Plattform mit eigenem Messwert-Ausgang ist dazu nicht eingebunden.',
    references: [],
    params: {
      durationS: 'Dauer des Durchlaufs in Sekunden.',
      gapCm: 'Weite der Lücke zwischen den Stangen eines Tores in Zentimetern. Enge Lücken verlangen genaueres Steuern.',
      speedCmS: 'Anfangsgeschwindigkeit, mit der die Tore herabkommen, in Zentimetern pro Sekunde.',
      speedUpPct: 'Um wie viel Prozent die Geschwindigkeit pro Minute zunimmt. 0 hält sie gleich.',
      spacingCm: 'Abstand zwischen zwei aufeinanderfolgenden Toren in Zentimetern. Kleinere Abstände lassen weniger Zeit zum Umsteuern.',
      control: '„Zeiger“: Die Kugel folgt der waagerechten Position von Maus oder Finger. „Pfeiltasten“: Links und rechts steuern die Kugel. „Gerät kippen“: Neigung nach links und rechts, nur mit passendem Gerät.'
    },
    metrics: {
      passed: 'Anzahl der Tore, durch deren Lücke die Kugel gefahren ist.',
      hits: 'Wie oft die Kugel eine Stange berührt hat.',
      accuracy: 'Anteil der durchfahrenen an allen gewerteten Toren.',
      streak: 'Längste Serie hintereinander durchfahrener Tore ohne Fehler.',
      center_dev: 'Mittlerer seitlicher Abstand der Kugel von der Mitte der Torlücke beim Durchfahren, nur für geschaffte Tore. Kleiner bedeutet sauberer gefahren.'
    }
  });
}));
