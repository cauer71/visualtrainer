(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('spots', {
    purpose: 'Du trainierst, wie schnell du auf plötzlich auftauchende Ziele reagierst und sie mit der Hand erreichst (Auge-Hand-Koordination). Mit Fixationskreuz und der Zone „Nur Peripherie“ übst du zusätzlich, Reize im Augenwinkel wahrzunehmen, ohne hinzuschauen.',
    setup: [
      'Kalibrierung durchführen (Bildschirmbreite und Abstand), damit der Punktdurchmesser in Zentimetern stimmt.',
      'Sitz etwa 50 bis 60 cm vom Bildschirm entfernt, so dass du jede Stelle mit dem Zeigefinger bequem erreichst, ohne dich zu verrenken.',
      'Hand locker über der Fläche halten und nicht aufstützen, damit du in alle Richtungen schnell ausholen kannst.',
      'Für Vergleiche immer dieselbe Hand, denselben Abstand und dasselbe Gerät benutzen. Trainiere gelegentlich auch mit der anderen Hand.'
    ],
    steps: [
      'Einstellungen wählen; für den ersten Durchlauf genügen die Standardwerte (60 s, 5 cm, 1,5 s Sichtbarkeit).',
      '„Start“ drücken und den Countdown abwarten.',
      'Sobald ein Punkt erscheint, berührst du ihn so schnell wie möglich mit der Fingerspitze. Der Punkt verschwindet beim Treffer und nach einer kurzen Pause erscheint der nächste.',
      'Wird ein Punkt nicht innerhalb der Sichtbarkeitszeit berührt, verschwindet er und zählt als verpasst. Berührungen neben einem Punkt zählen als Fehltipp.',
      'Mit Fixationskreuz: Der Blick bleibt die ganze Zeit auf dem Kreuz in der Mitte. Du nimmst die Punkte aus dem Augenwinkel wahr und berührst sie, ohne den Blick zu verlagern.',
      'Nach Ablauf der Zeit erscheinen die Kennzahlen. „Nochmal“ wiederholt mit denselben Einstellungen.'
    ],
    tips: [
      'Zuerst Treffsicherheit, dann Tempo: Wer hastig tippt, produziert Fehltipps und verliert Zeit.',
      'Berühre die Mitte des Punktes. Ein Treffer am Rand wird zwar noch gezählt (kleine Toleranz), aber genaues Zielen schult die Koordination.',
      'Bleib locker und atme ruhig. Verspannte Schultern machen die Bewegung langsamer.',
      'Vergleiche Durchläufe nur bei gleichen Einstellungen; ändere immer nur eine Einstellung auf einmal.',
      'Bei der Peripherie-Variante ist es normal, dass die Quote anfangs deutlich sinkt. Nimm größere Punkte oder mehr Sichtbarkeit, bis du sicher triffst.'
    ],
    progression: [
      'Leichter: größere Punkte (7 bis 9 cm), längere Sichtbarkeit (2 bis 3 s), ein einzelner Punkt, ganze Fläche, längere Pause zwischen den Punkten.',
      'Schwerer: kleinere Punkte (3 bis 4 cm), kürzere Sichtbarkeit (0,8 bis 1,0 s), mehrere gleichzeitige Punkte, kurze oder keine Pause.',
      'Peripherie: erst „Gesamte Fläche“ mit Fixationskreuz, dann „Nur Peripherie“. Erhöhe die Schwierigkeit erst, wenn die Quote über etwa 90 % liegt.',
      'Faustregel: Über 90 % Treffer in drei Läufen hintereinander → eine Stufe schwerer. Unter 70 % → eine Stufe leichter.'
    ],
    cautions: [
      'Die Übung blinkt nicht, zeigt aber plötzliche Wechsel. Bei Lichtempfindlichkeit vorher ärztlichen Rat einholen.',
      'Handgelenk und Finger schonen: alle 5 bis 10 Minuten kurz lockern, Hand wechseln.',
      'Bei Schwindel oder Augenbeschwerden abbrechen und pausieren.'
    ],
    background: 'Die Reaktionszeit setzt sich aus Wahrnehmen, Entscheiden und Bewegen zusammen. Die Bewegungszeit hängt nach dem Fittsschen Gesetz vom Abstand und von der Zielgröße ab: kleinere und weiter entfernte Ziele dauern länger. Zum Rand des Gesichtsfelds nehmen Schärfe und Kontrastempfinden ab, deshalb müssen Ziele in der Peripherie größer oder länger sichtbar sein. Die gemessene Zeit enthält auch die Verzögerung von Bildschirm und Touch-Sensor (typisch einige zehn Millisekunden) und ist daher nur auf demselben Gerät vergleichbar.',
    references: ['Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology, 47, 381–391.'],
    params: {
      durationS: 'Wie lange der Durchlauf dauert. 30 bis 60 Sekunden eignen sich zum Testen, 2 bis 5 Minuten zum Trainieren. Bei langen Läufen sinkt die Leistung durch Ermüdung.',
      diameterCm: 'Durchmesser der Punkte in Zentimetern. Kleinere Punkte verlangen genaueres Zielen und sind schwerer. 5 cm ist ein guter Startwert.',
      persistenceS: 'Wie lange ein Punkt sichtbar bleibt, bevor er als verpasst gilt. Kürzere Zeiten erhöhen den Zeitdruck.',
      simultaneous: 'Wie viele Punkte gleichzeitig sichtbar sind. Bei mehreren musst du entscheiden, welchen du zuerst nimmst; das erschwert die Aufgabe deutlich.',
      gapMs: 'Pause in Millisekunden zwischen einem Treffer und dem nächsten Punkt. Eine kurze Pause erhöht das Tempo, eine längere gibt Zeit zum Zurückführen der Hand.',
      zone: '„Gesamte Fläche“: überall. „Nur Peripherie“: nur im äußeren Bereich, weit weg von der Mitte. „Nur Zentrum“: nur im mittleren Bereich. Die Peripherie-Zone ist besonders sinnvoll mit Fixationskreuz.',
      fixation: 'Zeigt ein kleines Kreuz in der Mitte und hält die Punkte davon fern. Der Blick soll auf dem Kreuz bleiben, die Punkte werden aus dem Augenwinkel wahrgenommen.',
      sound: 'Kurzer Ton bei einem Treffer (hoch) und bei einem Fehltipp (tief). Hilft beim Lernen; für reine Messungen kann er ausgeschaltet bleiben.'
    },
    metrics: {
      hits: 'Anzahl der Punkte, die du rechtzeitig getroffen hast. Je höher, desto besser; hängt von Tempo und Einstellungen ab.',
      misses: 'Punkte, die verschwunden sind, bevor du sie berührt hast. Hohe Werte sprechen für zu wenig Zeit oder zu hohes Tempo der Einstellung.',
      stray: 'Berührungen, die keinen Punkt getroffen haben. Viele Fehltipps deuten auf hastiges oder ungenaues Zielen hin.',
      accuracy: 'Anteil der getroffenen an allen gezeigten Punkten (Treffer plus verpasste). Fehltipps sind hier nicht enthalten.',
      rt_mean: 'Mittlere Zeit vom Erscheinen eines Punktes bis zur Berührung, nur für Treffer. Enthält die Verzögerung des Geräts; nur auf demselben Gerät vergleichen.',
      rt_median: 'Mittlere Zeit nach Sortierung der Einzelwerte. Weniger empfindlich gegen Ausreißer als der Mittelwert.',
      rt_sd: 'Streuung der Reaktionszeiten. Kleinere Werte bedeuten gleichmäßigeres Reagieren.',
      rate: 'Getroffene Punkte pro Minute. Berücksichtigt auch die Pausen, vergleichbar nur bei gleicher Pausen- und Sichtbarkeitseinstellung.'
    }
  });
}));
