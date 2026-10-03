(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  factory(VT, isNode ? require('./common.js') : VT.helpText);
}(typeof self !== 'undefined' ? self : this, function (VT, T) {
  'use strict';
  VT.addHelp('diplopia', {
    purpose: 'Digitale Diplopie-Karte für Fachpersonen. In neun Blickrichtungen (Mitte und acht Randpunkte) erscheint ein Ziel; ein Auge sieht es rot, das andere blau. Die Person gibt an, ob sie ein Bild oder zwei sieht. Bei zwei Bildern schiebt sie das blaue auf das rote; der nötige Versatz in Prismendioptrien ist das Maß der Abweichung in dieser Blickrichtung. Am Ende zeigt eine Karte, wo Doppelbilder auftreten.',
    setup: [
      T.glassesSetup,
      T.darkRoom,
      'Kalibrierung gewissenhaft durchführen und den echten Abstand zum Bildschirm eintragen (üblich 50 cm). Der Blickwinkel der Randpunkte hängt davon und von der Bildschirmgröße ab; auf kleinen Bildschirmen wird er verkleinert und in den Kennzahlen genannt.',
      'Der Kopf bleibt ruhig und mittig vor dem Bildschirm, am besten mit Kinn- und Stirnstütze. Es bewegen sich nur die Augen.',
      'Zeigegerät: Maus oder Stift sind genauer als der Finger.',
      'Wer Doppelbilder hat, sollte vorher wissen, dass die Messung diese bewusst auslöst; sie kann kurz unangenehm sein.'
    ],
    steps: [
      'Blickwinkel einstellen (Standard 15 Grad) und Brillentest durchführen.',
      'In der ersten Blickrichtung erscheint ein Ziel. Die Person richtet den Blick darauf und gibt an, ob sie „Ein Bild“ oder „Zwei Bilder“ sieht.',
      'Bei „Zwei Bilder“ erscheint zusätzlich ein blaues Bild neben dem roten. Die Person schiebt das blaue durch Ziehen oder Tippen auf das rote, bis sie nur noch eines sieht, und drückt „Deckungsgleich“.',
      'Bei „Ein Bild“ geht es sofort zur nächsten Richtung. Die Reihenfolge der neun Richtungen ist zufällig.',
      'Zum Schluss zeigt eine Karte alle Richtungen: grün (einfach) oder rot (doppelt) mit einer Linie für den Versatz. Mit „Weiter“ erscheinen die Kennzahlen.'
    ],
    tips: [
      'Kopf ruhig halten und den Blick wirklich auf das Ziel richten, nicht auf den Zeiger.',
      'Bei nur ganz leichtem Doppelbild genau hinschauen: Ein kleiner Versatz wird leicht übersehen.',
      'Eine Pause zwischen den Richtungen hilft den Augen, wenn die Doppelbilder anstrengen.',
      'Die Messung kann nicht erkennen, ob die Person tatsächlich in die Richtung blickt; Anleitung und Kontrolle durch die Fachperson sind wichtig.',
      'Für Verlaufskontrollen immer denselben Blickwinkel und Abstand verwenden.'
    ],
    progression: [
      'Gröber: kleiner Blickwinkel (10 Grad) oder größere Ziele.',
      'Umfassender: größerer Blickwinkel (25 bis 30 Grad, setzt einen breiten Bildschirm voraus) und kleines Ziel.',
      'Der Test ist ein Messverfahren und wird nicht trainiert.'
    ],
    cautions: [
      T.notMedical,
      'Das Verfahren ist eine Näherung: Rot-Blau-Trennung, Projektion auf eine ebene Fläche und Einstellen per Zeigegerät. Die Werte sind nicht mit denen anderer Verfahren austauschbar.',
      'Bei Beschwerden, plötzlichen neuen Doppelbildern oder Kopfschmerz abbrechen und ärztlich abklären lassen.',
      'Kleine Bildschirme verkleinern den Blickwinkel; die Kennzahl „Tatsächlicher Blickwinkel“ beachten.'
    ],
    background: 'Bei Störungen der Augenbewegung treten Doppelbilder oft nur in bestimmten Blickrichtungen auf. Eine Diplopie-Karte hält fest, in welchen der neun Hauptblickrichtungen Doppelbilder bestehen und wie groß der Versatz ist. Hier wird der Versatz gemessen, indem die Person das Bild des einen Auges auf das des anderen schiebt: Die nötige Verschiebung entspricht der Abweichung der Augen. Der Versatz wird in Prismendioptrien angegeben (1 Δ entspricht 1 cm auf 1 m Abstand). Positive waagerechte Werte bedeuten, dass das blaue Bild nach rechts geschoben wurde, positive senkrechte Werte nach oben.',
    references: ['von Noorden, G. K., & Campos, E. C. Binocular Vision and Ocular Motility: Theory and Management of Strabismus. Mosby.'],
    params: {
      gazeDeg: 'Blickwinkel der acht Randpunkte in Grad. Die Mitte hat immer 0 Grad. Auf kleinen Bildschirmen wird der Winkel verkleinert.',
      targetCm: 'Durchmesser des Ziels in Zentimetern.',
      redEye: T.redEye,
      glassesCheck: T.glassesCheck
    },
    metrics: {
      positions: 'Anzahl der geprüften Blickrichtungen (höchstens neun).',
      double: 'Anzahl der Blickrichtungen, in denen Doppelbilder gemeldet wurden.',
      double_pct: 'Anteil der Richtungen mit Doppelbildern an allen geprüften Richtungen.',
      sep_mean: 'Mittlerer Versatz in Prismendioptrien über alle Richtungen mit Doppelbildern (Betrag aus waagerecht und senkrecht).',
      sep_max: 'Größter Versatz in Prismendioptrien in einer einzelnen Richtung.',
      center_double: '1, wenn bereits in der Mitte Doppelbilder gemeldet wurden, 0, wenn nicht. Fehlt der Wert, wurde die Mitte nicht geprüft.',
      eff_deg: 'Tatsächlicher Blickwinkel der Randpunkte. Kleiner als eingestellt, wenn der Bildschirm das Raster nicht aufnehmen konnte.'
    }
  });
}));
