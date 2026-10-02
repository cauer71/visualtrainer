(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('periphery', {
    purpose: 'Du trainierst und misst das Erkennen am Rand des Gesichtsfelds. Der Blick bleibt auf einer wechselnden Zahl in der Mitte. Kurz blitzt am Rand ein Buchstabe auf, den du danach aus mehreren Möglichkeiten auswählst. Abstand und Anzeigedauer sind einstellbar; mit der automatischen Anpassung ermittelt die App die kürzeste Dauer, bei der du noch zuverlässig antwortest.',
    setup: [
      'Kalibrierung unbedingt gewissenhaft durchführen: Der Abstand von der Mitte wird in Sehwinkelgrad angegeben und hängt vom eingetragenen Sitzabstand ab.',
      'Sitz in dem eingetragenen Abstand (Standard 60 cm), den Kopf mittig vor dem Bildschirm. Bei einem kleinen Bildschirm kann der gewünschte Winkel nicht erreicht werden; die App begrenzt ihn und zeigt in den Kennzahlen den tatsächlichen Abstand.',
      'Halte den Kopf ruhig und die Augen in der Mitte. Eine Kopfstütze (Kinnstütze) verbessert die Messung.',
      'Wähle ein Umfeld ohne Ablenkung, weil die Aufgabe hohe Konzentration verlangt.'
    ],
    steps: [
      'Abstand, Richtungen und Dauer einstellen. Beginne mit 10 Grad, links und rechts, 150 ms.',
      '„Start“ drücken. In der Mitte wechseln Zahlen im Takt; dort bleibt dein Blick die ganze Zeit.',
      'Nach einer zufälligen Zeit blitzt am Rand ein Buchstabe auf. Schau nicht hin, sondern nimm ihn aus dem Augenwinkel wahr.',
      'Wähle danach aus den Antwortfeldern den Buchstaben, den du gesehen hast. Raten ist erlaubt.',
      'Du erfährst kurz das Ergebnis. Nach allen Durchgängen erscheinen die Kennzahlen mit Zufallsniveau zum Vergleich.'
    ],
    tips: [
      'Wenn du merkst, dass du zum Rand geschaut hast, ist der Durchgang eigentlich ungültig. Die App kann die Blickrichtung nicht prüfen; sei ehrlich zu dir selbst.',
      'Konzentriere dich auf die Zahlen in der Mitte. Das hilft, die Augen dort zu halten.',
      'Die Wahrnehmung am Rand funktioniert eher als Gesamteindruck. Achte auf die Form des Buchstabens, nicht auf Einzelheiten.',
      'Lass dich nicht von der Quote entmutigen: In größerer Entfernung ist sie normalerweise deutlich niedriger.'
    ],
    progression: [
      'Leichter: geringer Abstand (4 bis 8 Grad), lange Dauer (200 bis 400 ms), große Buchstaben (4 bis 5 cm), nur links/rechts, 3 Antwortmöglichkeiten.',
      'Schwerer: größerer Abstand (12 bis 25 Grad), kurze Dauer (50 bis 100 ms), kleine Buchstaben, alle vier Richtungen, mehr Antwortmöglichkeiten.',
      'Nutze die adaptive Dauer, um die Schwelle bei einem bestimmten Abstand zu bestimmen und über Wochen zu vergleichen.',
      'Vergleiche nur Durchläufe mit gleichem Abstand, gleicher Größe und gleichem Sitzabstand.'
    ],
    cautions: [
      'Kurze Einblendungen können bei Lichtempfindlichkeit problematisch sein. Vorher ärztlichen Rat einholen.',
      'Die Übung ist anstrengend für die Augen. Nach 10 Minuten pausieren.',
      'Schwindel, Flimmern oder Kopfschmerzen sind ein Grund zum sofortigen Abbruch.',
      'Die Übung ist kein Gesichtsfeldtest und ersetzt keine augenärztliche Untersuchung.'
    ],
    background: 'Zum Rand des Gesichtsfelds nehmen Schärfe und Erkennungsleistung stark ab. Wie weit man in einem kurzen Blick mit Aufmerksamkeit erfassen kann, wird als „nützliches Sehfeld“ (Useful Field of View) beschrieben und ist unter anderem für Verkehr und Sport relevant. Die Dauer wird mit demselben adaptiven Verfahren bestimmt wie bei der Blitz-Erkennung. Als Zufallsniveau gilt 100 % geteilt durch die Zahl der Antwortmöglichkeiten.',
    references: [
      'Ball, K., Beard, B., Roenker, D., Miller, R., & Griggs, D. (1988). Age and visual search: Expanding the useful field of view. Journal of the Optical Society of America A, 5, 2210–2219.',
      'Levitt, H. (1971). Transformed up-down methods in psychoacoustics. Journal of the Acoustical Society of America, 49, 467–477.'
    ],
    params: {
      trials: 'Anzahl der Durchgänge. Für eine Schwellenschätzung mindestens 24.',
      eccentricityDeg: 'Abstand des Buchstabens von der Mitte als Sehwinkel in Grad, berechnet über den eingestellten Sitzabstand. Größere Winkel sind schwerer.',
      directions: '„Links und rechts“ oder zusätzlich „oben und unten“. Die Wahrnehmung ist in den Richtungen nicht gleich gut; die Kennzahlen trennen sie.',
      durationMs: 'Dauer der Einblendung in Millisekunden. Bei automatischer Anpassung ist das der Startwert.',
      adaptive: 'Bei „Ja“ verkürzt sich die Dauer nach zwei richtigen Antworten in Folge und verlängert sich nach jedem Fehler. So wird die Schwelle bestimmt.',
      sizeCm: 'Höhe des Buchstabens in Zentimetern. Je weiter außen, desto größer sollte er sein.',
      choices: 'Anzahl der Antwortmöglichkeiten. Mehr Möglichkeiten senken die Trefferchance durch Raten.'
    },
    metrics: {
      correct: 'Anzahl richtig erkannter Buchstaben.',
      accuracy: 'Anteil richtiger Antworten. Vergleiche ihn mit dem Zufallsniveau.',
      chance: 'Trefferquote, die du durch reines Raten erwarten würdest.',
      acc_horizontal: 'Quote bei Buchstaben links oder rechts.',
      acc_vertical: 'Quote bei Buchstaben oben oder unten (nur wenn alle vier Richtungen eingestellt waren).',
      ecc: 'Tatsächlicher mittlerer Abstand von der Mitte in Grad. Kann kleiner als eingestellt sein, wenn der Bildschirm nicht groß genug ist.',
      rt_mean: 'Mittlere Zeit vom Erscheinen der Antwortfelder bis zur Wahl.',
      threshold: 'Geschätzte kürzeste Anzeigedauer, bei der du noch zuverlässig antwortest (Mittel der letzten Umkehrpunkte). Nur bei automatischer Anpassung und wenn genug Umkehrpunkte vorliegen.',
      duration: 'Die fest eingestellte Anzeigedauer.'
    }
  });
}));
