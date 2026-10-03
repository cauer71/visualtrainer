(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  factory(VT, isNode ? require('./common.js') : VT.helpText);
}(typeof self !== 'undefined' ? self : this, function (VT, T) {
  'use strict';
  VT.addHelp('stereo', {
    purpose: 'Du trainierst und misst das Tiefensehen mit Zufallspunkten. In einem Feld aus Punkten schwebt ein Quadrat vor oder hinter der Fläche; du gibst an, wo es liegt (oben, unten, links, rechts). Mit der automatischen Anpassung verringert die App den Tiefenunterschied, bis deine persönliche Schwelle in Winkelsekunden ermittelt ist.',
    setup: [
      T.glassesSetup,
      T.darkRoom,
      'Kalibrierung gewissenhaft durchführen und den echten Abstand zum Bildschirm eintragen: Die Disparität wird in Winkelsekunden aus Abstand und Bildversatz berechnet.',
      'Kopf ruhig halten, Blick auf die Mitte des Punktfeldes. Eine Kinnstütze verbessert die Messung.',
      'Wähle ein Gerät mit hoher Auflösung. Der kleinste einstellbare Versatz entspricht etwa einem Pixel (wird in den Kennzahlen angegeben).'
    ],
    steps: [
      'Anzahl der Durchgänge und Startwert einstellen. Beginne mit der automatischen Anpassung und 600 Winkelsekunden.',
      'Brillentest durchführen und „Weiter“ drücken.',
      'Du siehst ein Feld aus roten und blauen Punkten. In einem der vier Bereiche schwebt ein Quadrat deutlich vor oder hinter dem Rest.',
      'Tippe die Schaltfläche, die zur Lage des Quadrats passt: Oben, Unten, Links oder Rechts. Raten ist erlaubt.',
      'Du erfährst kurz, ob es richtig war. Nach allen Durchgängen erscheinen Trefferquote und geschätzte Schwelle.'
    ],
    tips: [
      'Lass den Blick weich werden und schau auf das ganze Feld statt auf einzelne Punkte. Tiefe zeigt sich eher als Gesamteindruck.',
      'Wenn du nichts siehst, rate und mache weiter. Ein zu langes Starren erzeugt keine Tiefe, sondern Ermüdung.',
      'Prüfe vor der ersten Messung im Brillentest, dass kein Geisterbild entsteht (durch ein Auge nur eine Farbe).',
      'Bei vielen Wiederholungen sind Pausen alle 5 Minuten sinnvoll.',
      'Vergleiche Werte nur bei gleicher Brille, gleichem Gerät und gleichem Abstand.'
    ],
    progression: [
      'Leichter: größere Start-Disparität (1.000 bis 2.000 Winkelsekunden), größeres Quadrat (7 bis 10 cm), mehr Punkte.',
      'Schwerer: kleinere Start-Disparität (100 bis 300 Winkelsekunden), kleineres Quadrat (3 cm), Rauschen im Hintergrund an.',
      'Mit der automatischen Anpassung wird die Disparität nach zwei richtigen Antworten kleiner und nach jedem Fehler größer. Die Schwelle ist der Wert, bei dem du etwa 70 Prozent richtig hast.',
      'Als Trainingsziel gilt eine sinkende Schwelle über Wochen bei gleichen Einstellungen.'
    ],
    cautions: [
      T.notMedical,
      'Rot-Blau-Darstellung hat technische Grenzen: Es bleiben Farbsäume sichtbar und der Bildschirm löst nur etwa ein Pixel auf. Die Schwelle ist für klinische Stereotests (etwa 40 Winkelsekunden und kleiner) nicht aussagekräftig.',
      'Schwindel, Kopfschmerz oder Augenbrennen sind ein Grund, sofort zu pausieren.',
      'Bei Verdacht auf fehlendes Tiefensehen (zum Beispiel nach Schielen) fachlich abklären lassen, statt zu trainieren.'
    ],
    background: 'Weil die Augen etwa sechs Zentimeter auseinander stehen, sehen sie jeden Punkt der Umgebung unter leicht verschiedenem Winkel. Der Unterschied (Disparität) wird vom Gehirn als Tiefe gedeutet (Stereopsis). Zufallspunkt-Bilder (nach Julesz) enthalten Tiefe nur im Unterschied beider Augenbilder und keine Hinweise für ein einzelnes Auge. Hier wird jedes Augenbild in einer Farbe gezeichnet, die nur das passende Auge durch seinen Filter sieht. Die Disparität wird in Winkelsekunden angegeben (eine Winkelsekunde ist der 3.600ste Teil eines Grades) und aus Bildversatz und Abstand berechnet.',
    references: ['Julesz, B. (1960). Binocular depth perception of computer-generated patterns. Bell System Technical Journal, 39, 1125–1162.'],
    params: {
      trials: 'Anzahl der Durchgänge. Für eine zuverlässige Schwelle sollten es mindestens 30 sein.',
      startArcsec: 'Anfängliche Disparität in Winkelsekunden. Bei fester Disparität wird immer dieser Wert benutzt.',
      adaptive: 'Bei „Ja“ wird die Disparität nach zwei richtigen Antworten kleiner und nach jedem Fehler größer. So ermittelt die App deine Schwelle.',
      fieldCm: 'Kantenlänge des quadratischen Punktfeldes in Zentimetern. Ein größeres Feld ist leichter zu überblicken.',
      regionCm: 'Kantenlänge des schwebenden Quadrats in Zentimetern. Kleinere Quadrate sind schwerer.',
      dots: 'Anzahl der Punkte im Feld. Mehr Punkte liefern mehr Tiefeninformation, wirken aber auch dichter.',
      dotCm: 'Durchmesser der einzelnen Punkte in Zentimetern. Kleinere Punkte erlauben feinere Disparität, sind aber schwerer zu sehen.',
      noise: 'Bei „Ja“ bekommen die Punkte außerhalb des Quadrats zufällige, größere Tiefenunterschiede. Das verdeckt Hinweise, die man ohne Tiefensehen erkennen könnte, macht die Aufgabe aber schwerer.',
      redEye: T.redEye,
      glassesCheck: T.glassesCheck
    },
    metrics: {
      correct: 'Anzahl der Durchgänge, in denen du die Lage des Quadrats richtig angegeben hast.',
      accuracy: 'Anteil richtiger Antworten an allen Durchgängen.',
      chance: 'Trefferquote, die du durch reines Raten erwarten würdest (vier Möglichkeiten: 25 Prozent).',
      rt_mean: 'Mittlere Zeit vom Erscheinen des Feldes bis zur Antwort.',
      px_arcsec: 'Disparität, die einem einzelnen Pixel entspricht. Schwellen unterhalb dieses Wertes sind technisch nicht zuverlässig.',
      threshold: 'Geschätzte Schwelle in Winkelsekunden: Mittel der letzten Umkehrpunkte der automatischen Anpassung. Nur bei automatischer Anpassung und wenn genug Umkehrpunkte vorliegen.',
      final_arcsec: 'Disparität, mit der der letzte Durchgang gezeigt wurde.',
      fixed_arcsec: 'Die fest eingestellte Disparität (nur ohne automatische Anpassung).'
    }
  });
}));
