(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('sequence', {
    purpose: 'Du trainierst das visuell-räumliche Arbeitsgedächtnis. Felder eines Rasters leuchten nacheinander auf, du merkst dir die Folge und tippst sie in derselben Reihenfolge an. Die Folge wird mit jeder richtigen Wiederholung länger; gemessen wird, wie viele Felder du dir merken kannst.',
    setup: [
      'Sitz bequem vor dem Bildschirm. Der Kopf bleibt ruhig; die Aufgabe braucht keine Eile, aber Konzentration.',
      'Störungen ausschalten: Benachrichtigungen aus, keine Gespräche im Raum.',
      'Kalibrierung ist hier nur für die Anzeige wichtig, die Aufgabe selbst hängt nicht von Zentimetern ab.'
    ],
    steps: [
      'Raster (Zeilen × Spalten) und Startlänge wählen. Die Standardwerte (3×3, Startlänge 2) sind für den Einstieg geeignet.',
      '„Start“ drücken. Nach einer kurzen Pause leuchten die Felder der Folge nacheinander gelb auf. Schau zu, ohne mitzutippen.',
      'Sobald „Du bist dran“ erscheint, tippst du die Felder in derselben Reihenfolge an. Richtige Eingaben leuchten grün.',
      'Bei jeder richtig wiederholten Folge geht es mit einer längeren weiter (je nach Einstellung wird dieselbe Folge um ein Feld verlängert oder eine ganz neue gezeigt).',
      'Bei einem Fehler wird das richtige Feld blau markiert und es geht gemäß der gewählten Fehlerregel weiter. Die Übung endet nach der festgelegten Zahl Fehler, bei der Zielänge oder nach dem Zeitlimit.'
    ],
    tips: [
      'Bilde Gruppen („Ecke – Mitte – Rand“) oder Wege (eine Linie, ein Dreieck). Gliedern hilft mehr als bloßes Wiederholen.',
      'Sprich die Positionen leise mit („links oben, Mitte, rechts unten“), wenn dir das hilft.',
      'Schau beim Zeigen ruhig auf die Mitte des Rasters und lass die Felder in der Peripherie erscheinen, statt jedes Feld einzeln anzustarren.',
      'Nicht raten: Bei Unsicherheit lieber kurz nachdenken. Es gibt kein Zeitlimit für die Eingabe, außer du stellst eines ein.',
      'Ausgeruht trainieren. Müdigkeit senkt die Merkspanne deutlich.'
    ],
    progression: [
      'Leichter: kleineres Raster (2×3 oder 3×3), längere Anzeige (900 bis 1.200 ms), Fehlerregel „Eine Länge kürzer“.',
      'Schwerer: größeres Raster (4×4 oder 5×5), kürzere Anzeige (300 bis 500 ms), kürzere Pausen, „Komplett neue Folge“, Fehlerregel „Von vorn beginnen“.',
      'Als Ziel eignet sich die Merkspanne: Viele Erwachsene erreichen in einfachen Rastern etwa 5 bis 7 Felder, mit Übung und Gruppierung oft mehr.',
      'Wenn du über 90 % richtige Eingaben hast, erhöhe das Raster oder verkürze die Anzeige.'
    ],
    cautions: [
      'Die Übung blinkt in Gelb; die Felder wechseln aber langsam. Bei Lichtempfindlichkeit vorher ärztlichen Rat einholen.',
      'Bei Kopfschmerz oder Augenbeschwerden abbrechen.',
      'Frust vermeiden: Wenn du mehrere Fehler in Folge machst, mache eine Pause oder wähle eine leichtere Einstellung.'
    ],
    background: 'Die Aufgabe ähnelt dem bekannten Blockspannen-Test (Corsi). Er misst, wie viele räumliche Positionen man gleichzeitig im Arbeitsgedächtnis halten und in der Reihenfolge wiedergeben kann. Die Kapazität des Arbeitsgedächtnisses ist begrenzt; klassische Angaben liegen bei etwa sieben (Miller), neuere Schätzungen eher bei vier Einheiten, wenn Gruppieren und Wiederholen verhindert werden (Cowan). Gruppieren („Chunking“) erhöht die effektive Spanne.',
    references: [
      'Milner, B. (1971). Interhemispheric differences in the localization of psychological processes in man. British Medical Bulletin, 27, 272–277.',
      'Miller, G. A. (1956). The magical number seven, plus or minus two. Psychological Review, 63, 81–97.',
      'Cowan, N. (2001). The magical number 4 in short-term memory. Behavioral and Brain Sciences, 24, 87–114.'
    ],
    params: {
      rows: 'Zahl der Zeilen im Raster. Mehr Felder erschweren die Aufgabe.',
      cols: 'Zahl der Spalten im Raster.',
      startLength: 'Länge der ersten Folge. Wähle 2 für den Einstieg, größere Werte für Fortgeschrittene.',
      showMs: 'Wie lange jedes Feld aufleuchtet. Kürzere Zeiten sind schwerer.',
      gapMs: 'Pause zwischen zwei aufleuchtenden Feldern. Kürzere Pausen erschweren das Verfolgen.',
      growth: '„Alte Folge plus ein Feld“ verlängert dieselbe Folge (du kannst auf Bekanntes aufbauen). „Komplett neue Folge“ erzeugt jedes Mal eine neue und prüft die reine Merkleistung.',
      onError: 'Was nach einem Fehler passiert: gleiche Länge mit neuer Folge, eine Länge kürzer oder von vorn mit der Startlänge.',
      maxErrors: 'Nach wie vielen Fehlern die Übung endet. 0 bedeutet unbegrenzt (dann endet sie bei der Zielänge, dem Zeitlimit oder durch Abbrechen).',
      maxLength: 'Bei dieser Länge der richtig wiederholten Folge endet die Übung als bestanden.',
      durationS: 'Optionales Zeitlimit für die gesamte Übung in Sekunden. 0 bedeutet kein Zeitlimit.'
    },
    metrics: {
      span: 'Länge der längsten Folge, die du vollständig richtig wiederholt hast. Das ist die wichtigste Kennzahl (Merkspanne).',
      rounds: 'Wie viele Folgen insgesamt richtig wiederholt wurden.',
      errors: 'Zahl der Fehler. Jede falsche Eingabe beendet die aktuelle Runde.',
      accuracy: 'Anteil richtiger Eingaben an allen Eingaben.',
      rt_mean: 'Mittlere Zeit zwischen zwei richtigen Eingaben. Lange Zeiten zeigen Unsicherheit, sehr kurze Zeiten ein sicheres Abrufen.',
      total: 'Gesamtdauer der Übung in Sekunden.'
    }
  });
}));
