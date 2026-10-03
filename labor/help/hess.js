(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  factory(VT, isNode ? require('./common.js') : VT.helpText);
}(typeof self !== 'undefined' ? self : this, function (VT, T) {
  'use strict';
  VT.addHelp('hess', {
    purpose: 'Digitale Form des Hess-Schirms für Fachpersonen. Jedes Auge sieht ein eigenes Zeichen: ein Auge nur den Zielpunkt eines Rasters, das andere nur einen Zeiger. Die Person setzt den Zeiger dorthin, wo er aus ihrer Sicht auf dem Ziel liegt. Danach tauschen die Augen die Rollen. Das Ergebnis zeigt, wie stark und in welche Richtung die Augen in verschiedenen Blickrichtungen voneinander abweichen.',
    setup: [
      T.glassesSetup,
      T.darkRoom,
      'Kalibrierung gewissenhaft durchführen: Bildschirmbreite und Abstand bestimmen, wie die Blickwinkel in Bildschirmorte umgerechnet werden. Üblich ist ein Abstand von 50 cm.',
      'Der Kopf muss während der gesamten Messung ruhig und mittig vor dem Raster bleiben, am besten mit Kinn- und Stirnstütze. Es dürfen sich nur die Augen bewegen.',
      'Der Bildschirm steht senkrecht und auf Augenhöhe. Für große Blickwinkel (30 Grad und mehr) ist ein breiter Bildschirm nötig; auf kleinen Bildschirmen wird das Raster automatisch verkleinert und die Kennzahlen nennen den tatsächlichen Winkel.',
      'Zeigegerät: Eine Maus oder ein Stift ist genauer als der Finger, der den Zeiger verdeckt.'
    ],
    steps: [
      'Größten Blickwinkel, Raster (voll mit 25 Punkten oder nur innen mit 9) und Durchgänge einstellen. Standard: 20 Grad, voll, beide Durchgänge.',
      'Brillentest durchführen. Beim Zuhalten eines Auges darf nur das Zeichen der anderen Farbe sichtbar sein.',
      'Durchgang A: Das Auge hinter dem roten Glas sieht den roten Zielpunkt und fixiert ihn. Das andere Auge sieht nur den blauen Zeiger.',
      'Setze den Zeiger durch Ziehen oder Tippen dorthin, wo er genau auf dem roten Ziel zu liegen scheint, und drücke „OK“ (Enter). Der Zeiger beginnt jeweils in der Mitte.',
      'Nach allen Punkten folgt Durchgang B mit vertauschten Rollen (blaues Ziel, roter Zeiger). Bei „Nur ein Durchgang“ entfällt er.',
      'Zum Schluss zeigt die Karte den Soll-Umriss (grau) und die gesetzten Umrisse von A (rot) und B (blau). Mit „Weiter“ erscheinen die Kennzahlen.'
    ],
    tips: [
      'Fixiere das Ziel, nicht den Zeiger. Der Zeiger wird nur mit dem anderen Auge wahrgenommen und muss im Kopf auf das Ziel gelegt werden.',
      'Setze zügig, nicht grübelnd. Es zählt der erste Eindruck der Deckung.',
      'Wiederhole bei Unsicherheit einzelne Punkte nicht, sondern schließe den Durchgang ab und wiederhole bei Bedarf den ganzen Test.',
      'Beide Durchgänge unter gleichen Bedingungen (Licht, Abstand, Kopfhaltung) durchführen.',
      'Plane Pausen ein: Das volle Raster mit zwei Durchgängen dauert etwa 10 Minuten und ist anstrengend.'
    ],
    progression: [
      'Einfacher: nur das innere Raster (9 Punkte), ein Durchgang, kleinerer Blickwinkel (10 bis 15 Grad).',
      'Genauer: volles Raster, beide Durchgänge, 30 Grad (setzt einen breiten Bildschirm voraus), kleine Ziel- und Zeigergröße.',
      'Für Verlaufskontrollen immer dieselben Einstellungen, denselben Abstand und dieselbe Kopfhaltung verwenden.',
      'Die Übung ist ein Messverfahren und wird nicht „trainiert“.'
    ],
    cautions: [
      T.notMedical,
      'Das Verfahren ist eine Näherung an den klassischen Hess-Lancaster-Test: Rot-Blau statt Rot-Grün, Zeigen mit Finger oder Maus statt mit Lichtzeiger, Projektion auf eine ebene Fläche. Die Werte sind nicht mit Werten des klassischen Verfahrens austauschbar.',
      'Bei Doppelbildern, Kopfschmerz oder Schwindel die Messung abbrechen. Pausen einlegen.',
      'Wer neu aufgetretene Doppelbilder hat, braucht ärztliche Abklärung vor jedem Training und diese Messung ersetzt sie nicht.',
      'Kleine Bildschirme verkleinern das Raster; die Winkel in den Kennzahlen beachten.'
    ],
    background: 'Der Hess-Schirm (nach Hess, Lancaster) dient dazu, Augenbewegungsstörungen zu erkennen und nach Augenmuskeln zuzuordnen. Mit einer Rot-Grün-Brille sieht ein Auge nur das Zielraster, das andere nur den Lichtzeiger; das Raster hat 25 Punkte in zwei Ringen (innen 15, außen 30 Grad). Die Person legt den Zeiger auf die wahrgenommenen Zielpunkte. Die Abweichungen ergeben je Auge ein Bild, das kleiner oder verzerrt ist, wenn ein Muskel nicht richtig arbeitet. Hier wird das Raster auf eine ebene Fläche projiziert (Ort = Abstand mal Tangens des Winkels). Die App berechnet Abweichungen in Grad und die Fläche des Randumrisses im Verhältnis zum Sollwert und vergleicht beide Durchgänge. Die Deutung nach Muskeln gehört in die Hand von Fachpersonal und wird von der App nicht vorgenommen.',
    references: ['von Noorden, G. K., & Campos, E. C. Binocular Vision and Ocular Motility: Theory and Management of Strabismus. Mosby.'],
    params: {
      maxDeg: 'Größter Blickwinkel in Grad (äußerer Ring). Der innere Ring liegt bei der Hälfte. Ist der Bildschirm zu klein, wird das Raster verkleinert.',
      grid: '„Voll“: 25 Punkte (9 innen, 16 außen). „Nur innen“: nur die 9 inneren Punkte, kürzer und für kleine Bildschirme geeignet.',
      passes: '„Beide Augen als Fixierauge“: zwei Durchgänge mit vertauschten Rollen. „Nur ein Durchgang“: nur das Auge hinter dem roten Glas fixiert.',
      targetCm: 'Durchmesser des Zielpunkts in Zentimetern. Kleine Ziele erhöhen die Genauigkeit der Platzierung.',
      markerCm: 'Durchmesser des Zeigers in Zentimetern.',
      redEye: T.redEye,
      glassesCheck: T.glassesCheck
    },
    metrics: {
      placed: 'Anzahl der gesetzten Punkte insgesamt (Punkte je Durchgang mal Durchgänge).',
      dev_a: 'Mittlere Abweichung zwischen gesetztem und echtem Ziel in Grad im Durchgang A (Fixierauge hinter dem roten Glas). Größere Werte bedeuten stärkere Abweichung.',
      dev_b: 'Mittlere Abweichung in Grad im Durchgang B (Fixierauge hinter dem blauen Glas).',
      area_a: 'Fläche des Umrisses der äußeren Punkte von Durchgang A im Verhältnis zum Sollwert. Unter 100 Prozent bedeutet ein kleineres, über 100 Prozent ein größeres gesetztes Feld.',
      area_b: 'Dasselbe für Durchgang B.',
      area_ratio: 'Verhältnis der Flächen A zu B. Deutliche Abweichungen von 1 bedeuten Seitenunterschiede zwischen den beiden Fixierungen; die Deutung gehört in Fachhand.',
      eff_deg: 'Tatsächlicher größter Blickwinkel des Rasters. Kleiner als eingestellt, wenn der Bildschirm das Raster nicht aufnehmen konnte.',
      clamped: '1, wenn das Raster wegen eines zu kleinen Bildschirms verkleinert wurde, sonst 0.'
    }
  });
}));
