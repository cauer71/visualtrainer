(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('balancetouch', {
    purpose: 'Du löst Spot-Touch im Stand, zum Beispiel beidbeinig, einbeinig, im Tandemstand oder auf einer instabilen Fläche. Eine Hilfsperson zählt jeden Verlust des Gleichgewichts. So siehst du, wie sich die Touch-Leistung und die Standfestigkeit gegenseitig beeinflussen (Doppelaufgabe aus Haltung und Sehen).',
    setup: [
      'Kalibrierung durchführen, damit der Punktdurchmesser in Zentimetern stimmt.',
      'Stelle den Bildschirm so, dass du im Stand bequem jeden Punkt erreichst, ohne dich zu verrenken. Ein Tablet auf einem Ständer in Brusthöhe eignet sich.',
      'Sorge für Sicherheit: Haltegriff, Wand oder Hilfsperson in Reichweite, rutschfeste Unterlage, sicheres Schuhwerk.',
      'Eine Hilfsperson drückt die Taste B oder den Knopf links unten bei jedem Verlust des Gleichgewichts (Absetzen, Abstützen, Ausfallschritt, Festhalten).',
      'Lege vorher fest, was als Verlust zählt, und halte diese Regel bei Wiederholungen ein.'
    ],
    steps: [
      'Standposition und Dauer wählen. Starte mit beidbeinigem Stand und 60 Sekunden.',
      '„Start“ drücken, in Position gehen und das Fixationskreuz im Blick halten.',
      'Berühre jeden erscheinenden Punkt so schnell wie möglich. Verschwindet er vorher, zählt er als verpasst.',
      'Die Hilfsperson drückt bei jedem Verlust des Gleichgewichts „Gleichgewicht verloren“ (Taste B).',
      'Nach Ablauf der Zeit erscheinen Touch-Kennzahlen und die Zahl der Verluste, auch pro Minute.'
    ],
    tips: [
      'Mache zuerst einen Durchlauf im festen Stand als Vergleichswert und wechsle erst dann zu instabileren Positionen.',
      'Atme gleichmäßig und stütze dich nicht auf den Bildschirm.',
      'Berühre die Punkte mit der Fingerspitze und führe die Hand ruhig; hektische Armbewegungen stören die Balance.',
      'Mit Fixationskreuz bleibt der Blick in der Mitte, die Punkte werden nur aus dem Augenwinkel wahrgenommen. Das macht die Aufgabe deutlich schwerer.',
      'Notiere die Standposition zu jedem Durchlauf; sie wird in den Einzelwerten mitgespeichert.'
    ],
    progression: [
      'Leichter: großer Stand, große Punkte (7 bis 9 cm), lange Sichtbarkeit (3 bis 4 s), Fixationskreuz aus.',
      'Schwerer: Tandemstand oder Einbeinstand, kleinere Punkte (3 bis 4 cm), kurze Sichtbarkeit (1 bis 1,5 s), Zone „Nur Peripherie“, Fixationskreuz an.',
      'Mit instabiler Fläche zunächst nur kurze Durchläufe (20 bis 30 Sekunden).',
      'Ziel: Weniger Verluste pro Minute bei gleicher Trefferquote.'
    ],
    cautions: [
      'Einbeinstand, Tandemstand und instabile Flächen bergen Sturzgefahr. Sicherung und Aufsicht sind Pflicht.',
      'Bei Schwindel, Unsicherheit oder Schmerzen sofort abbrechen.',
      'Personen mit Gleichgewichtsstörungen, Gelenkbeschwerden oder nach Verletzungen nur nach Absprache mit der behandelnden Fachperson.',
      'Die App misst die Standfestigkeit nicht selbst; die Zahl der Verluste hängt von der Aufmerksamkeit der Hilfsperson ab.'
    ],
    background: 'Gleichgewicht ist keine rein automatische Leistung: Wer gleichzeitig eine Aufgabe lösen muss, hat weniger Aufmerksamkeit für die Haltungskontrolle, und umgekehrt leidet die Aufgabe, wenn die Haltung viel Aufmerksamkeit braucht. Dieser Effekt wird in Studien zu Doppelaufgaben und Sturzrisiko genutzt. Die Übung bildet das nach: Die Touch-Aufgabe ist die zweite Aufgabe, die Verluste des Gleichgewichts zeigen, wie viel Haltungskontrolle verloren geht.',
    references: ['Woollacott, M., & Shumway-Cook, A. (2002). Attention and the control of posture and gait: a review of an emerging area of research. Gait & Posture, 16, 1–14.'],
    params: {
      stance: 'Standposition zur Dokumentation (beidbeinig, instabile Fläche, einbeinig, Tandemstand). Sie wird nur gespeichert und beeinflusst die Übung nicht.',
      durationS: 'Dauer des Durchlaufs in Sekunden. Für die Verluste pro Minute sind mindestens 30 bis 60 Sekunden sinnvoll.',
      diameterCm: 'Durchmesser der Punkte in Zentimetern. Größere Punkte sind leichter zu treffen.',
      persistenceS: 'Wie lange ein Punkt sichtbar bleibt, bevor er als verpasst gilt.',
      gapMs: 'Pause in Millisekunden zwischen einem Treffer und dem nächsten Punkt.',
      zone: '„Gesamte Fläche“, „Nur Peripherie“ oder „Nur Zentrum“. Die Peripherie ist besonders anspruchsvoll im Stand.',
      fixation: 'Zeigt ein Kreuz in der Mitte und hält die Punkte davon fern. Der Blick soll dort bleiben.'
    },
    metrics: {
      hits: 'Anzahl der rechtzeitig getroffenen Punkte.',
      misses: 'Punkte, die verschwunden sind, bevor sie berührt wurden.',
      stray: 'Berührungen, die keinen Punkt getroffen haben.',
      accuracy: 'Anteil der getroffenen an allen gezeigten Punkten.',
      rt_mean: 'Mittlere Zeit vom Erscheinen eines Punktes bis zur Berührung, nur für Treffer.',
      losses: 'Wie oft die Hilfsperson einen Verlust des Gleichgewichts gemeldet hat.',
      losses_per_min: 'Verluste des Gleichgewichts pro Minute, vergleichbar zwischen Durchläufen unterschiedlicher Dauer.'
    }
  });
}));
