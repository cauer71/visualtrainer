(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('findchars', {
    purpose: 'Du suchst in einem Raster ähnlicher Zeichen alle Exemplare eines Zielzeichens und tippst sie an. Die Übung trainiert genaues Unterscheiden ähnlicher Zeichen (zum Beispiel b, d, p, q), systematisches Absuchen und Aufmerksamkeit.',
    setup: [
      'Kalibrierung durchführen, damit die Feldgröße in Zentimetern stimmt.',
      'Sitz etwa 50 bis 60 cm vom Bildschirm entfernt; der Kopf bleibt ruhig.',
      'Das Zielzeichen steht oben groß in Grün; die gesuchten Zeichen sind genau dieses Zeichen, nicht Spiegelungen davon.'
    ],
    steps: [
      'Zeichenvorrat, Rastergröße und Anteil der Zielzeichen einstellen. Für den Einstieg: b d p q, 5×8, 20 %.',
      '„Start“ drücken. Oben steht das Zielzeichen, darunter das Raster.',
      'Tippe jedes Exemplar des Zielzeichens an. Richtige werden grün markiert, falsche rot.',
      'Sobald alle gefunden sind, kommt automatisch die nächste Tafel. Wenn du sicher bist, alle gefunden zu haben, oder aufgeben möchtest, drückst du „Fertig“. Übersehene Zeichen zählen als verpasst.',
      'Nach der letzten Tafel erscheinen die Kennzahlen.'
    ],
    tips: [
      'Suche systematisch, zum Beispiel Zeile für Zeile von links nach rechts. Wer wild springt, übersieht mehr.',
      'Achte auf das Merkmal, das das Zeichen von den ähnlichen unterscheidet: Bei b und d ist es die Seite des Bogens, bei p und q die Richtung des Striches.',
      'Hake gedanklich ab, welche Zeilen du schon geprüft hast.',
      'Tippe nur, wenn du sicher bist. Falsche Zeichen senken die Genauigkeit.',
      'Bei Zeichenverwechslungen eine Pause einlegen und die Tafelgröße verringern.'
    ],
    progression: [
      'Leichter: weniger Felder (4×6), höherer Anteil an Zielzeichen (30 bis 40 %), größere Felder, Zeichenvorrat „Ziffern“.',
      'Schwerer: mehr Felder (8×12), geringer Anteil (10 %), kleinere Felder (1,5 bis 2 cm), Vorrat „b d p q“ oder „Gemischt“.',
      'Wechsle zwischen den Zeichenvorräten, damit sich keine Gewöhnung einstellt.',
      'Ziel: Genauigkeit über 95 % und kürzere Zeit pro gefundenem Zeichen.'
    ],
    cautions: [
      'Ähnliche Zeichen sind anstrengend für die Augen. Nach 10 Minuten pausieren.',
      'Wenn Buchstaben bei dir häufig gespiegelt oder vertauscht erscheinen, dies fachlich abklären lassen.',
      'Kinder: kleine Tafeln und Erfolgserlebnisse. Nicht unter Zeitdruck setzen.'
    ],
    background: 'Aufgaben, in denen Zielzeichen aus ähnlichen Zeichen herausgesucht werden, gehören zu den visuellen Such- und Streichungsaufgaben. Sie verlangen Selektion nach Merkmalen und systematisches Absuchen. Verwechslungen von Zeichen, die sich nur durch Spiegelung oder Drehung unterscheiden (b/d, p/q), sind in der Lesentwicklung häufig und werden hier gezielt geübt. Ein aussagekräftiges Maß ist die Zeit pro gefundenem Zeichen zusammen mit der Genauigkeit.',
    references: [],
    params: {
      set: '„b d p q“: spiegelähnliche Buchstaben. „Ziffern“: 1 7 4 9 6 2 5 3. „Ähnliche Buchstaben“: O Q C G D U E F. „Gemischt“: eine Auswahl aus allen.',
      rows: 'Zeilen des Rasters. Mehr Zeilen bedeuten mehr Felder und eine längere Suche.',
      cols: 'Spalten des Rasters. Mehr Spalten bedeuten mehr Felder und eine längere Suche.',
      density: 'Anteil der Felder, die das Zielzeichen enthalten. Weniger Zielzeichen erschweren die Suche.',
      cellCm: 'Kantenlänge eines Feldes in Zentimetern. Passt sich an, wenn das Raster nicht in den Bildschirm passt.',
      rounds: 'Anzahl der Tafeln im Durchlauf. Das Zielzeichen wechselt von Tafel zu Tafel.'
    },
    metrics: {
      found: 'Anzahl der gefundenen Zielzeichen im ganzen Durchlauf.',
      missed: 'Zielzeichen, die bei „Fertig“ noch nicht gefunden waren.',
      false_taps: 'Angetippte Zeichen, die nicht das Zielzeichen waren.',
      accuracy: 'Gefundene geteilt durch (gefundene + übersehene + falsche). Je näher an 100 %, desto besser.',
      per_target: 'Gesamtzeit aller Tafeln geteilt durch die Zahl der gefundenen Zeichen.',
      total: 'Gesamtzeit des Durchlaufs.'
    }
  });
}));
