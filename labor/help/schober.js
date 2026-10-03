(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  factory(VT, isNode ? require('./common.js') : VT.helpText);
}(typeof self !== 'undefined' ? self : this, function (VT, T) {
  'use strict';
  VT.addHelp('schober', {
    purpose: 'Digitale Form des Schober-Tests für Fachpersonen (Phorie-Messung mit getrennten Bildern). Ein Auge sieht nur ein Kreuz, das andere nur einen Ring. Die Person verschiebt das Kreuz in kleinen Schritten, bis es mittig im Ring erscheint. Der nötige Versatz in Prismendioptrien ist ein Maß für die Ruhelage der Augen (Eso- oder Exophorie, Höhenabweichung).',
    setup: [
      T.glassesSetup,
      T.darkRoom,
      'Kalibrierung gewissenhaft durchführen und den echten Abstand zum Bildschirm eintragen. Der Versatz wird aus Bildversatz und Abstand in Prismendioptrien umgerechnet.',
      'Die Person sitzt aufrecht, der Kopf ist gerade und ruhig, der Blick geht auf die Mitte des Rings. Eine Kinnstütze erhöht die Wiederholbarkeit.',
      'Der Bildschirm muss gerade stehen (Wasserwaage), sonst verfälscht eine Schräglage die senkrechte Messung.',
      'Für Vergleiche immer dieselbe Brille, denselben Abstand und dieselbe Farbzuordnung (welches Auge das Kreuz sieht) verwenden.'
    ],
    steps: [
      'Richtungen, Schrittweite und Startversatz einstellen. Standard: waagerecht und senkrecht, 0,5 Δ Schritt, 6 Δ Start.',
      'Brillentest durchführen. Beim Zuhalten eines Auges darf nur das Zeichen der anderen Farbe zu sehen sein.',
      'Das Kreuz erscheint zunächst deutlich neben der Mitte des Rings. Die Person verschiebt es mit den Pfeilen (kleiner und großer Schritt), bis es genau mittig liegt.',
      'Bei Mitte „Mittig“ (Enter) drücken. Die Messung wiederholt sich von der anderen Seite (Start links statt rechts oder oben statt unten).',
      'Bei „Waagerecht und senkrecht“ folgen zwei weitere Messungen für die senkrechte Richtung. Danach erscheinen die Kennzahlen.'
    ],
    tips: [
      'Immer von beiden Seiten messen: Wer nur von einer Seite kommt, stoppt oft zu früh. Der Unterschied beider Messungen ist selbst ein Maß für die Sicherheit der Einstellung.',
      'Die Person soll auf den Ring schauen und das Kreuz nur „mitwahrnehmen“, nicht fixieren und nicht wandern lassen.',
      'Bei feinen Einstellungen kleine Schritte benutzen und zwischendurch blinzeln.',
      'Zeit lassen: Das Bild kann kurz schwanken, bevor sich eine Lage einstellt.',
      'Die Messung nicht an einem Tag mit starker Ermüdung der Augen durchführen.'
    ],
    progression: [
      'Gröber: Schrittweite 1 oder 2 Δ, größerer Ring.',
      'Genauer: Schrittweite 0,25 Δ, mehrere Messungen an verschiedenen Tagen.',
      'Zur Verlaufskontrolle immer dieselben Einstellungen verwenden.',
      'Der Test ist ein Messverfahren und wird nicht trainiert.'
    ],
    cautions: [
      T.notMedical,
      'Vorzeichen und Umrechnung sind aus dem Prinzip hergeleitet (siehe unten) und müssen vor klinischer Nutzung gegen ein bekanntes Messverfahren oder einen Prismenkompensator geprüft werden.',
      'Die Bildschirmauflösung begrenzt die Feineinstellung; sehr kleine Werte sind nicht zuverlässig.',
      'Bei Doppelbildern, die nicht beseitigt werden können, oder bei Beschwerden die Messung abbrechen und ärztlich abklären lassen.'
    ],
    background: 'Beim Schober-Test werden die Bilder beider Augen getrennt (hier durch Rot-Blau-Filter), so dass die Augen nicht mehr durch das gemeinsame Bild zusammengehalten werden. Sie nehmen ihre Ruhelage (Phorie) ein. Sieht das rechte Auge das Kreuz und ist esophor (Auge nach innen), erscheint das Kreuz rechts vom Ring und wird zum Ausgleich nach links geschoben. Die App wertet das so aus: Waagerecht bedeutet ein Pluswert Esophorie, ein Minuswert Exophorie. Senkrecht bedeutet ein Pluswert rechts höher (rechts hyper), ein Minuswert links höher. Beim linken Auge ist es spiegelbildlich; die App berücksichtigt, welches Auge das Kreuz sieht. Ein Prismendioptrie entspricht 1 cm Versatz auf 1 m Entfernung.',
    references: ['von Noorden, G. K., & Campos, E. C. Binocular Vision and Ocular Motility: Theory and Management of Strabismus. Mosby.'],
    params: {
      axes: '„Waagerecht und senkrecht“ misst beide Richtungen nacheinander, je zweimal von entgegengesetzten Startseiten.',
      stepPd: 'Schrittweite beim Verschieben in Prismendioptrien. Kleinere Schritte erlauben feinere Einstellung. Der große Schritt ist das Vierfache.',
      startPd: 'Anfangsversatz des Kreuzes in Prismendioptrien. Er wird einmal nach der einen und einmal nach der anderen Seite gesetzt.',
      crossColor: 'Welches Auge das Kreuz sieht: Bei „rot“ das Auge hinter dem roten Glas, bei „blau“ das Auge hinter dem blauen Glas. Der Ring wird dem anderen Auge gezeigt.',
      sizeCm: 'Durchmesser des Rings in Zentimetern.',
      redEye: T.redEye,
      glassesCheck: T.glassesCheck
    },
    metrics: {
      runs: 'Anzahl der abgeschlossenen Messungen.',
      h_phoria: 'Mittlere waagerechte Abweichung in Prismendioptrien: positiv bedeutet Esophorie, negativ Exophorie (nach der in dieser Anleitung beschriebenen Herleitung).',
      h_sd: 'Unterschied der beiden waagerechten Messungen (von beiden Startseiten). Kleinere Werte bedeuten sicherere Einstellung.',
      v_phoria: 'Mittlere senkrechte Abweichung in Prismendioptrien: positiv bedeutet rechts höher, negativ links höher.',
      v_sd: 'Unterschied der beiden senkrechten Messungen. Kleinere Werte bedeuten sicherere Einstellung.'
    }
  });
}));
