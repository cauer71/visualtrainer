(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('flash', {
    purpose: 'Du trainierst und misst, wie viel du mit einem sehr kurzen Blick erfassen kannst. Ziffern oder Buchstaben erscheinen für Bruchteile einer Sekunde in der Mitte; danach tippst du sie über ein Tastenfeld ein. Mit der automatischen Anpassung ermittelt die App deine persönliche Schwelle der Anzeigedauer.',
    setup: [
      'Kalibrierung durchführen, damit die Zeichenhöhe stimmt.',
      'Sitz etwa 50 bis 60 cm vom Bildschirm entfernt und halte den Blick ruhig auf die Mitte.',
      'Die Anzeigezeit ist auf die Bildwiederholrate des Bildschirms gerundet (bei 60 Hz in Schritten von etwa 17 ms). Wähle für aussagekräftige Messungen Zeiten über 50 ms.',
      'Raum abdunkeln oder zumindest Spiegelungen vermeiden, weil kurze Einblendungen davon besonders beeinträchtigt werden.'
    ],
    steps: [
      'Zeichenart, Anzahl der Zeichen und Anzeigedauer wählen. Starte zum Beispiel mit 3 Ziffern und 200 ms.',
      '„Start“ drücken. In der Mitte erscheint kurz ein Fixationskreuz, dort bleibt dein Blick.',
      'Dann blitzen die Zeichen für die eingestellte Dauer auf. Optional folgt eine Maske, die das Nachbild löscht.',
      'Tippe die Zeichen in der gezeigten Reihenfolge über das Tastenfeld. Mit „Löschen“ korrigierst du. Nach der letzten Taste wird automatisch ausgewertet.',
      'Du siehst kurz, ob die Antwort richtig war und was gezeigt wurde. Nach allen Durchgängen erscheinen die Kennzahlen.'
    ],
    tips: [
      'Nicht suchen: Der Blick bleibt in der Mitte. Wer erst zu den Zeichen springen will, verpasst sie.',
      'Fasse die Zeichen als Ganzes auf, wie ein Wort oder eine Zahl, statt sie einzeln abzulesen.',
      'Rate, wenn du unsicher bist, aber mit Verstand: ein Teil richtig zählt für die Zeichenquote.',
      'Die ersten Durchgänge dienen zum Eingewöhnen; lass sie nicht in die Bewertung einfließen.',
      'Mache regelmäßig Pausen, weil die Konzentration schnell nachlässt.'
    ],
    progression: [
      'Leichter: weniger Zeichen (2 bis 3), längere Dauer (300 bis 500 ms), Ziffern, mit Maske aus.',
      'Schwerer: mehr Zeichen (4 bis 6), kürzere Dauer (50 bis 120 ms), Buchstaben, Maske ein.',
      'Mit „Dauer automatisch anpassen“ wird die Dauer nach zwei richtigen Antworten kürzer und nach jedem Fehler länger. Die geschätzte Schwelle gibt die Dauer an, bei der du ungefähr 70 % der Durchgänge richtig löst.',
      'Ziel: Schwelle über Wochen senken oder bei gleicher Dauer mehr Zeichen sicher erfassen.'
    ],
    cautions: [
      'Sehr kurze Einblendungen und die Maske erzeugen schnelle Helligkeitswechsel. Bei Lichtempfindlichkeit vorher ärztlichen Rat einholen.',
      'Bei Kopfschmerz, Flimmern oder Augenschmerz abbrechen.',
      'Die Übung ist anstrengend. Halte die Einheit kurz (maximal 10 Minuten).'
    ],
    background: 'Kurze Einblendungen mit anschließender Abfrage (Tachistoskop-Prinzip) zeigen, wie viel visuelle Information in einem Blick erfasst und kurz gespeichert wird. Klassische Versuche zeigten, dass man mehr sieht, als man danach berichten kann (Sperling). Das adaptive Verfahren folgt dem bekannten „2-aufwärts-1-abwärts“-Prinzip und konvergiert auf eine Schwelle von etwa 71 % richtiger Antworten (Levitt). Die Genauigkeit der gemessenen Schwelle hängt von der Zahl der Umkehrpunkte ab; mindestens 20 Durchgänge sind sinnvoll.',
    references: [
      'Sperling, G. (1960). The information available in brief visual presentations. Psychological Monographs, 74 (11).',
      'Levitt, H. (1971). Transformed up-down methods in psychoacoustics. Journal of the Acoustical Society of America, 49, 467–477.'
    ],
    params: {
      trials: 'Anzahl der Durchgänge. Für eine zuverlässige Schwellenschätzung mindestens 20.',
      symbols: 'Ziffern oder Buchstaben. Innerhalb eines Durchgangs wiederholt sich kein Zeichen.',
      length: 'Wie viele Zeichen pro Durchgang gezeigt werden. Mehr Zeichen sind schwerer.',
      durationMs: 'Anzeigedauer in Millisekunden. Bei automatischer Anpassung ist das der Startwert.',
      adaptive: 'Bei „Ja“ verkürzt sich die Dauer nach zwei richtigen Durchgängen in Folge und verlängert sich nach jedem Fehler. So findet die App deine Schwelle.',
      mask: 'Eine Fläche aus Balken direkt nach der Anzeige löscht das Nachbild im Auge. Ohne Maske sehen die Zeichen länger nach als sie gezeigt werden.',
      sizeCm: 'Höhe der Zeichen in Zentimetern. Bei sehr kurzen Zeiten helfen größere Zeichen.'
    },
    metrics: {
      correct: 'Durchgänge, bei denen alle Zeichen an der richtigen Stelle eingegeben wurden.',
      accuracy: 'Anteil vollständig richtiger Durchgänge an allen Durchgängen.',
      symbol_accuracy: 'Anteil der Zeichen, die an der richtigen Stelle eingegeben wurden. Milder als die Gesamtquote.',
      entry_mean: 'Mittlere Zeit für die Eingabe, vom Tastenfeld bis zur letzten Taste.',
      threshold: 'Geschätzte kürzeste Anzeigedauer, bei der du noch etwa 70 % richtig löst (Mittel der letzten Umkehrpunkte). Nur bei automatischer Anpassung und wenn genug Umkehrpunkte vorliegen.',
      final_duration: 'Die Anzeigedauer des letzten Durchgangs. Hinweis auf die Leistung zum Ende.',
      duration: 'Die fest eingestellte Anzeigedauer.'
    }
  });
}));
