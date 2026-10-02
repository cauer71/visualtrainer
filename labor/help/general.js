/* Allgemeine Anleitung: Aufbau, Kalibrierung, Ablauf, Training planen, Ergebnisse lesen, Sicherheit, Datenschutz, Glossar. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  factory(VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  VT.setGeneralHelp({
    title: 'Allgemeine Anleitung',
    sections: [
      {
        id: 'zweck', title: 'Wofür die Übungen gedacht sind – und wofür nicht',
        paragraphs: [
          'Das Visual Trainer Labor ist ein Trainings- und Messwerkzeug für Wahrnehmung, Aufmerksamkeit, Blicksteuerung, Reaktion und Arbeitsgedächtnis. Es zeigt dir, wie du bei bestimmten Aufgaben abschneidest und wie sich das über die Zeit verändert.',
          'Es ist kein Medizinprodukt und stellt keine Diagnose. Die Ergebnisse ersetzen keine Untersuchung beim Augenarzt, Optometristen oder Orthoptisten. Wenn du Beschwerden hast (verschwommenes Sehen, Doppelbilder, häufige Kopfschmerzen beim Lesen, Schielen), lass sie fachlich abklären, bevor du trainierst.',
          'Wie stark sich ein Training auf Alltagsleistungen überträgt (Lesen, Sport, Konzentration), ist je nach Übung unterschiedlich gut belegt. Sicher messbar ist vor allem, dass man in genau der geübten Aufgabe besser wird. Erwarte deshalb keine Wunder und bewerte Fortschritte vor allem anhand deiner eigenen Kennzahlen.'
        ]
      },
      {
        id: 'aufbau', title: 'Aufbau: Gerät, Abstand, Licht, Haltung',
        list: [
          'Gerät: Ein Touchscreen (Tablet, Laptop mit Touch, Touch-Monitor) eignet sich am besten. Mit Maus funktionieren die Übungen auch, die Zeiten sind dann aber nicht mit Touch-Messungen vergleichbar.',
          'Abstand: Sitze etwa 50 bis 70 cm vom Bildschirm entfernt, so dass du den ganzen Bildschirm ohne Kopfbewegung überblickst und mit dem Arm gut jede Stelle erreichst. Trage den tatsächlichen Abstand in der Kalibrierung ein (Standard: 60 cm).',
          'Bildschirm: Stelle ihn so auf, dass der Blick leicht nach unten geht und der Bildschirm senkrecht zur Blickrichtung steht. Nutze eine mittlere bis hohe Helligkeit und schalte Bildschirmschoner, Nachtmodus und Farbfilter aus, weil sie Kontraste verändern.',
          'Raum: Gleichmäßiges Licht ohne Spiegelungen oder Blendung auf dem Bildschirm. Kein helles Fenster im Hintergrund.',
          'Haltung: Aufrecht sitzen, Füße flach am Boden, Unterarm nicht aufstützen, wenn schnelle Berührungen verlangt werden. Der Kopf bleibt ruhig, wenn die Aufgabe nur Augenbewegungen verlangt.',
          'Sehhilfen: Trage deine gewohnte Brille oder Kontaktlinsen. Für Vergleiche immer unter denselben Bedingungen trainieren (mit oder ohne Sehhilfe, gleiches Gerät, gleicher Abstand).',
          'Störungen vermeiden: Benachrichtigungen und Hintergrundprogramme ausschalten. Laptop am Strom betreiben, weil der Energiesparmodus die Zeitmessung verschlechtern kann.'
        ]
      },
      {
        id: 'kalibrierung', title: 'Kalibrierung: warum Zentimeter wichtig sind',
        paragraphs: [
          'Alle Größen und Abstände der Übungen sind in Zentimetern angegeben, nicht in Pixeln. Nur so bedeutet „5 cm großer Punkt“ auf jedem Gerät dasselbe, und nur so lassen sich Größen in Sehwinkel umrechnen. Dafür muss die App wissen, wie viele Pixel pro Zentimeter dein Bildschirm hat.',
          'Öffne dazu den Bereich „Kalibrierung“. Es gibt zwei Wege, die sich gegenseitig abgleichen: Entweder misst du die Breite der Anzeigefläche (nur das leuchtende Bild, ohne Rahmen) mit einem Lineal und trägst sie ein, oder du hältst eine Bankkarte an den Bildschirm und ziehst den Regler, bis das Rechteck genauso groß ist wie die Karte. Das zweite Verfahren ist meist genauer, weil Karten genormt sind (85,6 × 54,0 mm).',
          'Trage außerdem den Abstand zwischen Auge und Bildschirm ein. Daraus berechnet die App Sehwinkel: Bei 60 cm Abstand entspricht ein Grad etwa 1,05 cm auf dem Bildschirm. Ein Daumen bei ausgestrecktem Arm deckt ungefähr 2 Grad ab.',
          'Eine falsche Kalibrierung verfälscht alle Größen und Winkelangaben, aber nicht die Reaktionszeiten. Kalibriere neu, sobald du das Gerät, die Bildschirmeinstellung (Skalierung, Auflösung) oder deinen Sitzabstand deutlich änderst.'
        ]
      },
      {
        id: 'ablauf', title: 'So läuft eine Übung ab',
        list: [
          'Im Menü eine Übung wählen. Dort stehen Anleitung, Einstellungen und – nach dem Training – die Bedeutung der Kennzahlen.',
          'Einstellungen anpassen. Jede Einstellung hat einen kurzen Hilfetext. Für den ersten Durchlauf genügen die Standardwerte.',
          '„Start“ drücken. Es folgt ein Countdown von drei Sekunden, dabei wird (wenn möglich) in den Vollbildmodus gewechselt. Nutze die Zeit, um Haltung und Abstand zu prüfen.',
          'Übung ausführen. Mit „Abbrechen“ oben rechts kannst du jederzeit zurück zu den Einstellungen; ein abgebrochener Durchlauf wird nicht gespeichert.',
          'Ergebnis ansehen. Die Kennzahlen werden mit Erklärung angezeigt und automatisch lokal gespeichert. Du kannst die Einzelwerte als CSV-Datei exportieren (Semikolon-getrennt, öffnet sich direkt in Excel).',
          '„Nochmal“ startet mit denselben Einstellungen. Für Vergleiche über mehrere Tage die Einstellungen nicht ändern.'
        ]
      },
      {
        id: 'training', title: 'Training planen und steigern',
        list: [
          'Häufigkeit und Dauer: Besser kurz und regelmäßig als lang und selten. Bewährt haben sich 2 bis 4 Einheiten pro Woche mit 10 bis 20 Minuten, verteilt auf zwei bis vier Übungen.',
          'Aufwärmen: Beginne mit einer leichten Übung (z. B. große Ziele, lange Sichtbarkeit), bevor du zu schwierigen Einstellungen wechselst.',
          'Steigerungsregel: Liegt die Trefferquote in drei Durchläufen hintereinander über etwa 90 %, mache eine Stufe schwerer (kleiner, schneller, kürzer, mehr gleichzeitig). Liegt sie unter etwa 70 %, mache es leichter. Verändere immer nur einen Parameter auf einmal, sonst weißt du nicht, was die Veränderung bewirkt hat.',
          'Abwechslung: Kombiniere Übungsgruppen (Reaktion, Blicksteuerung, Gedächtnis, Peripherie). Eine einzelne Aufgabe kann man mit der Zeit „auswendig“, ohne dass sich die zugrunde liegende Fähigkeit verbessert.',
          'Protokoll: Die App speichert die letzten 100 Durchläufe. Notiere zusätzlich Tageszeit, Müdigkeit und Besonderheiten, wenn du Unterschiede erklären willst.',
          'Pausen: Mache nach etwa 15 bis 20 Minuten Bildschirmarbeit eine Pause und schaue 20 Sekunden lang in die Ferne (mindestens 6 m). Beende das Training, wenn du müde wirst: Dann sinken Genauigkeit und Tempo und die Werte sind nicht mehr aussagekräftig.'
        ]
      },
      {
        id: 'ergebnisse', title: 'Ergebnisse richtig lesen',
        list: [
          'Mittelwert und Median: Der Mittelwert wird von einzelnen Ausreißern (zum Beispiel einer Ablenkung) nach oben gezogen, der Median nicht. Weichen beide stark voneinander ab, gab es Ausreißer.',
          'Streuung: Sie zeigt, wie gleichmäßig du reagierst. Kleinere Streuung bei gleichem Mittelwert bedeutet stabilere Leistung.',
          'Trefferquote und Tempo gehören zusammen: Wer schneller wird und dabei mehr Fehler macht, hat nur ein anderes Verhältnis gewählt, nicht unbedingt besser geworden. Beurteile beides gemeinsam.',
          'Schwankungen: Einzelne Durchläufe schwanken natürlich um einige Prozent. Vergleiche Durchschnitte aus mindestens drei Durchläufen und achte auf einen Trend über mehrere Wochen.',
          'Lerneffekt: Die ersten Durchläufe einer neuen Übung verbessern sich oft schnell, weil du die Aufgabe kennenlernst, nicht weil sich das Sehen verbessert. Beginne mit der Auswertung erst nach zwei bis drei Probeläufen.',
          'Gerätevergleich: Reaktionszeiten enthalten die Verzögerung von Bildschirm, Touch-Sensor und Browser. Sie sind nur auf demselben Gerät miteinander vergleichbar und keine absoluten Werte.'
        ]
      },
      {
        id: 'messgenauigkeit', title: 'Messgenauigkeit und Grenzen der Technik',
        list: [
          'Bildwiederholrate: Ein 60-Hz-Bildschirm aktualisiert das Bild etwa alle 16,7 ms. Anzeigedauern werden deshalb in Vielfachen dieses Rasters dargestellt; sehr kurze Zeiten (unter 50 ms) sind nur grob einstellbar.',
          'Zeitmessung: Die Zeitpunkte stammen vom Browser-Zeitgeber. Reaktionszeiten sind daher auf wenige Millisekunden genau, aber um die Eingabeverzögerung des Geräts verschoben.',
          'Metronom: Der Ton wird im Bildtakt ausgelöst und kann um bis zu etwa 16 ms abweichen. Für das Training des Rhythmus reicht das, für Messungen im Millisekundenbereich nicht.',
          'Farben: Bildschirme geben Farben unterschiedlich wieder. Die Übungen verlassen sich deshalb nicht auf feine Farbunterschiede.',
          'Eingabe: Mehrfachberührung wird in dieser Version nicht ausgewertet; es zählt jeweils eine Berührung.'
        ]
      },
      {
        id: 'sicherheit', title: 'Sicherheit und Hinweise',
        list: [
          'Lichtempfindlichkeit: Einige Übungen zeigen kurze Einblendungen und schnelle Wechsel (z. B. Blitz-Erkennung, Peripheres Erkennen, Takt-Sakkaden). Wenn bei dir oder in deiner Familie Anfälle durch Licht oder Muster aufgetreten sind, sprich vorher mit einem Arzt und trainiere nur mit ärztlicher Freigabe.',
          'Abbrechen bei Beschwerden: Brich sofort ab bei Schwindel, Übelkeit, Kopfschmerz, Augenschmerz, Flimmern oder Doppelbildern, die nicht schnell verschwinden. Wenn sie wiederkehren, lass dich untersuchen.',
          'Augenbelastung: Häufiges Blinzeln, genügend Pausen und eine ruhige Umgebung beugen trockenen, müden Augen vor.',
          'Kinder: Nur mit Aufsicht und kürzeren Einheiten (5 bis 10 Minuten). Schwierigkeit so wählen, dass Erfolgserlebnisse überwiegen.',
          'Hände und Handgelenke: Schnelle Berührungsübungen belasten die Sehnen. Lockere Haltung, Pausen und Wechsel der Hand.',
          'Keine Leistungsversprechen: Die App gibt keine Normwerte vor und bewertet nicht, ob ein Wert „gut“ oder „schlecht“ ist. Maßstab bist du selbst im Zeitverlauf.'
        ]
      },
      {
        id: 'datenschutz', title: 'Datenschutz',
        paragraphs: [
          'Alle Ergebnisse werden ausschließlich im Browser deines Geräts gespeichert (lokaler Speicher). Es gibt keine Anmeldung, keine Übertragung ins Internet und keine Nachverfolgung; die Seite kann Netzwerkverbindungen technisch gar nicht aufbauen.',
          'Die gespeicherten Daten bleiben, bis du sie unter „Ergebnisse“ löscht oder die Websitedaten des Browsers entfernst. Auf gemeinsam genutzten Geräten solltest du Ergebnisse nach dem Training löschen oder exportieren. Exportierte CSV-Dateien liegen im Download-Ordner und können Rückschlüsse auf deine Leistung zulassen; gehe damit sorgfältig um.'
        ]
      },
      {
        id: 'glossar', title: 'Glossar',
        glossary: [
          ['Sehwinkel', 'Größe eines Objekts, gemessen als Winkel am Auge. Ein Objekt von 1,05 cm Größe hat in 60 cm Abstand etwa 1 Grad. Sehwinkel machen Größen unabhängig vom Abstand vergleichbar.'],
          ['Fixation', 'Ruhiges Halten des Blicks auf einen Punkt.'],
          ['Sakkade', 'Schneller Blicksprung von einem Punkt zum nächsten, beim Lesen etwa alle Viertelsekunde.'],
          ['Gleitende Augenfolgebewegung', 'Langsame, flüssige Augenbewegung, mit der ein bewegtes Ziel verfolgt wird.'],
          ['Peripherie / Gesichtsfeldrand', 'Bereich des Sehens außerhalb des Blickzentrums. Dort sind Schärfe und Farbwahrnehmung geringer, Bewegung wird aber gut bemerkt.'],
          ['Crowding (Gedränge)', 'Zeichen am Rand oder dicht nebeneinander sind schwerer zu erkennen, als wenn sie allein stehen.'],
          ['Reaktionszeit', 'Zeit von Erscheinen eines Reizes bis zur Reaktion.'],
          ['Wahlreaktion', 'Reaktion, bei der zwischen mehreren Antworten gewählt werden muss; dauert länger als eine einfache Reaktion.'],
          ['Schwelle', 'Geringste Reizstärke (hier: kürzeste Anzeigedauer), bei der du noch zuverlässig richtig antwortest.'],
          ['Arbeitsgedächtnis', 'Kurzzeitiger Speicher, in dem Information gehalten und bearbeitet wird; die Kapazität ist begrenzt (oft um 4 bis 7 Elemente).'],
          ['Maske', 'Reiz, der unmittelbar nach einer kurzen Einblendung gezeigt wird und das Nachwirken des Bildes im Auge unterbindet.'],
          ['Persistenz', 'Wie lange ein Reiz sichtbar bleibt.'],
          ['Adaptives Verfahren', 'Die Schwierigkeit passt sich automatisch an deine Antworten an, bis sich ein stabiler Schwellenwert ergibt.']
        ]
      }
    ]
  });
}));
