(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('vertical', {
    purpose: 'Messung der subjektiven visuellen Vertikalen für Fachpersonen. Eine helle Linie auf dunklem Grund wird so eingestellt, dass sie senkrecht erscheint. Entweder dreht sich die Linie langsam und wird gestoppt, oder sie wird mit Tasten verstellt. Die Starts wechseln zwischen rechts und links geneigt. Die App berechnet die Abweichung von der echten Senkrechten.',
    setup: [
      'Das Gerät steht gerade und fest, am besten auf einem Ständer. Prüfe mit einer Wasserwaage, dass der Bildschirmrand wirklich senkrecht ist: Eine schiefe Aufstellung verfälscht die Messung direkt.',
      'Der Raum ist so dunkel wie möglich. Rahmen, Möbelkanten und Fensterkreuze sind sichtbare Hinweise auf die Senkrechte und stören die Messung.',
      'Die Person sitzt aufrecht, der Kopf ist gerade und ruhig, Blick auf die Mitte des Bildschirms. Keine Kopfneigung.',
      'Sehhilfe nur tragen, wenn sie für den Abstand nötig ist. Eine Brille mit schief sitzendem Gestell kann ebenfalls verfälschen.',
      'Kalibrierung ist für die Länge der Linie wichtig; die Winkelmessung selbst hängt davon nicht ab.'
    ],
    steps: [
      'Verfahren, Anzahl der Einstellungen und Startneigung einstellen. Standard: Drehen und stoppen, 8 Einstellungen, 25 Grad größte Startneigung.',
      '„Start“ drücken. Die Linie erscheint geneigt und ändert bei „Drehen“ langsam ihre Neigung auf die Senkrechte zu.',
      'Verfahren „Drehen“: Sobald die Linie senkrecht erscheint, „Senkrecht“ oder die Leertaste drücken. Die Linie dreht sonst weiter über die Senkrechte hinaus und kehrt bei 45 Grad um.',
      'Verfahren „Einstellen“: Mit den Schaltflächen (−2°, −0,5°, +0,5°, +2°) oder den Pfeiltasten die Linie senkrecht einstellen und dann bestätigen.',
      'Jede zweite Einstellung beginnt von der anderen Seite. Nach allen Einstellungen erscheinen Mittelwert, Betrag, Streuung und der Unterschied je nach Startseite.'
    ],
    tips: [
      'Beurteile die Linie, nicht den Bildschirmrand: Bei schmalen Bildschirmen den Raum so einrichten, dass der Rand nicht stört.',
      'Beim Verfahren „Drehen“ wirken Reaktionszeit und Drehgeschwindigkeit zusammen: Langsamer drehen verringert den Überschwung. Für feine Messungen 0,5 bis 1,5 Grad pro Sekunde wählen.',
      'Nicht zu lange auf die Linie starren; nach einigen Sekunden verändert sich der Eindruck. Entscheide zügig nach dem ersten Eindruck.',
      'Mindestens 8 Einstellungen, besser 10 bis 12, damit Streuung und Mittelwert aussagekräftig sind.',
      'Unterschiede zwischen den Startseiten (Hysterese) sind normal; sie werden gesondert angegeben.'
    ],
    progression: [
      'Gröber: größere Startneigung (30 bis 40 Grad) und schnelleres Drehen.',
      'Genauer: kleinere Startneigung (10 bis 15 Grad), langsames Drehen (0,5 bis 1 Grad pro Sekunde) und mehr Einstellungen (12 bis 20).',
      'Das Verfahren „Einstellen“ ist unabhängig von der Reaktionszeit und daher meist genauer, braucht aber mehr Zeit.',
      'Der Test ist ein Messverfahren und wird nicht trainiert.'
    ],
    cautions: [
      'Das Ergebnis ist ein Hilfsmittel für Fachpersonen und kein Befund. Die Deutung gehört in die Hand von Fachpersonal (Augenheilkunde, Neurologie, HNO).',
      'Ohne gerade Aufstellung und ohne abgedunkelten Raum ist das Ergebnis nicht verwertbar.',
      'Bei Schwindel, Übelkeit oder Kopfschmerz nach der Messung eine Pause einlegen und bei anhaltenden Beschwerden ärztlichen Rat suchen.',
      'Die App gibt keine Normbereiche an. Je nach Verfahren und Gerät fallen sie unterschiedlich aus.'
    ],
    background: 'Die subjektive visuelle Vertikale ist die Richtung, die eine Person im Dunkeln als senkrecht empfindet. Sie hängt vom Zusammenspiel von Gleichgewichtsorgan, Sehsystem und Körperwahrnehmung ab und weicht bei bestimmten Störungen des Gleichgewichtssystems von der echten Senkrechten ab. Gemessen wird üblicherweise in abgedunkeltem Raum mit einer leuchtenden Linie. Hier wird die Abweichung in Grad angegeben: Positive Werte bedeuten eine Neigung im Uhrzeigersinn, negative gegen den Uhrzeigersinn. Die Streuung zeigt, wie sicher die Einstellungen sind.',
    references: ['Böhmer, A., & Rickenmann, J. (1995). The subjective visual vertical as a clinical parameter of vestibular function in peripheral vestibular diseases. Journal of Vestibular Research, 5, 35–46.'],
    params: {
      trials: 'Anzahl der Einstellungen. Die Startseite wechselt von Einstellung zu Einstellung. Mindestens 8 sind sinnvoll.',
      method: '„Drehen und stoppen“: Die Linie dreht sich langsam und wird gestoppt. „Mit Tasten einstellen“: Die Linie wird mit Schaltflächen oder Pfeiltasten verstellt.',
      speedDegS: 'Drehgeschwindigkeit in Grad pro Sekunde (nur Verfahren „Drehen“). Langsamer ist genauer.',
      startMaxDeg: 'Größte Anfangsneigung in Grad. Jeder Start liegt zufällig zwischen 60 und 100 Prozent dieses Wertes.',
      lineCm: 'Länge der Linie in Zentimetern. Längere Linien erlauben eine feinere Beurteilung der Neigung.'
    },
    metrics: {
      n: 'Anzahl der abgeschlossenen Einstellungen.',
      dev_mean: 'Mittlere Abweichung von der Senkrechten in Grad. Positiv bedeutet im Uhrzeigersinn geneigt, negativ gegen den Uhrzeigersinn.',
      dev_abs: 'Mittlerer Betrag der Abweichung, unabhängig von der Richtung.',
      dev_sd: 'Streuung der Einstellungen in Grad. Kleine Werte bedeuten sichere, wiederholbare Einstellungen.',
      hysteresis: 'Mittelwert der Einstellungen mit Start rechts geneigt minus Mittelwert mit Start links geneigt. Große Werte zeigen eine Abhängigkeit von der Startseite.'
    }
  });
}));
