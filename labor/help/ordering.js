(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('ordering', {
    purpose: 'Zahlen, Buchstaben, Wörter oder Rechenaufgaben bewegen sich über den Bildschirm. Du berührst sie in der richtigen Reihenfolge (zum Beispiel von klein nach groß oder nach Alphabet). Die Übung verbindet Verfolgen bewegter Ziele, Suchen und gedankliches Ordnen unter Zeitdruck.',
    setup: [
      'Kalibrierung durchführen, damit die Zeichenhöhe in Zentimetern stimmt.',
      'Sitz etwa 50 bis 60 cm vom Bildschirm entfernt, Hand frei beweglich über dem Bildschirm.',
      'Für Wörter und Rechenaufgaben ausreichend Zeichenhöhe (3 cm und mehr) wählen, damit Texte schon im Bewegungsmoment gelesen werden können.'
    ],
    steps: [
      'Inhalt, Anzahl und Bewegungsart wählen. Beginne zum Beispiel mit 8 Zahlen, geradliniger Bewegung und 6 cm/s.',
      '„Start“ drücken. Die Ziele beginnen sich zu bewegen. Oben links steht die Aufgabe, zum Beispiel „Zahlen von klein nach groß“.',
      'Finde das nächste Ziel in der Reihenfolge (zum Beispiel die 1) und berühre es. Berührte Ziele verschwinden.',
      'Berührst du ein falsches Ziel, zählt das als Fehler und es passiert nichts weiter. Berührungen neben ein Ziel zählen als „Danebengetippt“.',
      'Sind alle Ziele berührt, endet die Übung und zeigt Gesamtzeit und Fehler. Mit Zeitlimit endet sie nach Ablauf der Zeit.'
    ],
    tips: [
      'Lege dir die Reihenfolge schon vor dem Start im Kopf zurecht (bei Wörtern: Anfangsbuchstaben vergleichen). Dann suchst du nur noch das nächste Ziel.',
      'Beobachte das gesuchte Ziel zuerst und berühre es dort, wo es in einem Moment sein wird, nicht dort, wo es gerade ist (vorausschauend zielen).',
      'Bei Kreisbahnen warte einfach auf das gesuchte Ziel; die Bahn ist vorhersehbar.',
      'Bei Rechenaufgaben die Ergebnisse im Kopf rechnen und das niedrigste zuerst suchen. Das fordert das Arbeitsgedächtnis besonders.',
      'Falsche Berührungen kosten Zeit; lieber einen Moment länger suchen.'
    ],
    progression: [
      'Leichter: weniger Ziele (3 bis 6), niedrige Geschwindigkeit (2 bis 4 cm/s), Zahlen aufsteigend, größere Zeichen.',
      'Schwerer: mehr Ziele (10 bis 15), höhere Geschwindigkeit (8 bis 15 cm/s), Wörter oder Rechenaufgaben, absteigende Zahlen, kleinere Zeichen.',
      'Bewegungsarten: Kreis- und Ellipsenbahn sind gleichmäßig und vorhersehbar, die geradlinige Bewegung mit Abprallen ist unregelmäßiger.',
      'Ziel: Gesamtzeit senken, ohne Fehler zu erhöhen.'
    ],
    cautions: [
      'Bewegte Schrift kann bei längerem Betrachten die Augen belasten. Alle 5 bis 10 Minuten pausieren.',
      'Bei Schwindel oder Übelkeit abbrechen; langsamere Bewegung wählen.',
      'Bei Lichtempfindlichkeit vorher ärztlichen Rat einholen.'
    ],
    background: 'Das Ordnen von Zahlen und Buchstaben gleicht klassischen Verbindungsaufgaben der Neuropsychologie (Trail Making), die Aufmerksamkeit, Suchgeschwindigkeit und das Wechseln zwischen Regeln messen. Hier kommen bewegte Ziele hinzu, was das Vorausschätzen von Bewegungen verlangt. Die Zeit pro Ziel steigt typischerweise mit der Zahl der Ziele und der Geschwindigkeit.',
    references: ['Reitan, R. M. (1958). Validity of the Trail Making Test as an indicator of organic brain damage. Perceptual and Motor Skills, 8, 271–276.'],
    params: {
      content: 'Was geordnet wird: Zahlen auf- oder absteigend, Buchstaben oder Wörter alphabetisch, Summen oder Produkte nach dem Ergebnis (kleinstes zuerst).',
      count: 'Anzahl der Ziele. Mehr Ziele machen die Aufgabe länger und schwerer.',
      motion: '„Geradlinig“: Ziele bewegen sich geradeaus und prallen am Rand ab. „Kreisbahn“ und „Ellipsenbahn“: Ziele laufen gleichmäßig verteilt auf einer Bahn.',
      speedCmS: 'Geschwindigkeit in Zentimetern pro Sekunde (bei Bahnen als Bahngeschwindigkeit). Höhere Werte erschweren das Treffen.',
      sizeCm: 'Zeichenhöhe in Zentimetern. Die Kästchen werden bei Wörtern entsprechend breiter.',
      direction: 'Nur bei Kreis- und Ellipsenbahn: Umlaufrichtung im oder gegen den Uhrzeigersinn.',
      timeLimitS: 'Optionales Zeitlimit in Sekunden. 0 bedeutet kein Zeitlimit.',
      sound: 'Kurzer Ton bei richtiger (hoch) und falscher (tief) Berührung.'
    },
    metrics: {
      solved: 'Anzahl der Ziele, die du in der richtigen Reihenfolge berührt hast.',
      total: 'Gesamtzeit vom Start bis zum letzten Ziel (oder bis zum Zeitlimit).',
      wrong: 'Wie oft du ein Ziel berührt hast, das nicht an der Reihe war.',
      stray: 'Berührungen, die kein Ziel getroffen haben.',
      t_mean: 'Mittlere Zeit zwischen zwei richtigen Berührungen. Enthält Suchen und Treffen.',
      t_sd: 'Streuung dieser Zeiten. Hohe Werte deuten auf einzelne schwer zu findende Ziele hin.'
    }
  });
}));
