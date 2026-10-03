(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  factory(VT, isNode ? require('./common.js') : VT.helpText);
}(typeof self !== 'undefined' ? self : this, function (VT, T) {
  'use strict';
  VT.addHelp('fusion', {
    purpose: 'Du trainierst und misst, wie weit deine Augen zwei leicht verschobene Bilder zu einem einzigen verschmelzen können (Fusionsbreite). Ein Ziel wird jedem Auge in einer eigenen Farbe gezeigt. Der Versatz der Bilder wächst langsam, bis du Doppelbilder siehst (Bruchpunkt). Danach schrumpft er, bis das Bild wieder einfach wird (Erholungspunkt). Die Werte stehen in Prismendioptrien (Δ).',
    setup: [
      T.glassesSetup,
      T.darkRoom,
      'Kalibrierung gewissenhaft durchführen und den echten Abstand zum Bildschirm eintragen: Die Prismendioptrien werden aus Bildversatz und Abstand berechnet.',
      'Sitz aufrecht, Kopf gerade und ruhig, Blick auf die Mitte des Ziels. Eine Kinnstütze verbessert die Wiederholbarkeit.'
    ],
    steps: [
      'Richtung, Geschwindigkeit und Zahl der Wiederholungen einstellen. Starte mit Konvergenz und Divergenz im Wechsel, 1,5 Δ pro Sekunde.',
      'Brillentest durchführen und mit „Weiter“ bestätigen.',
      'Zu Beginn jedes Durchgangs siehst du ein einfaches Bild. Halte es ruhig im Blick.',
      'Der Versatz wächst langsam. Sobald das Bild doppelt wird oder auseinanderfällt, drückst du „Doppelt“ oder die Leertaste.',
      'Nun schrumpft der Versatz wieder. Sobald das Bild wieder zu einem verschmilzt, drückst du „Wieder einfach“.',
      'Fehlt dir einer der beiden kleinen Kontrollstriche (rot oben, blau unten), drückst du „Ein Strich fehlt“. Nach allen Durchgängen erscheinen die Kennzahlen.'
    ],
    tips: [
      'Entspannt schauen, nicht anstrengen: Zu viel Anstrengung verändert die Werte und ermüdet schnell.',
      'Drücke ehrlich beim ersten Anzeichen von Doppelbildern, nicht erst, wenn sie deutlich auseinanderliegen.',
      'Konvergenz (Bild rückt näher, Augen drehen nach innen) und Divergenz (Bild rückt weg, Augen drehen nach außen) fallen oft unterschiedlich aus. Das ist normal.',
      'Mache zwischen den Durchgängen kurze Pausen und blinzle, damit die Augen nicht austrocknen.',
      'Mehrere Wiederholungen mitteln Zufall heraus. Für einen Verlaufsvergleich immer gleiche Einstellungen und gleichen Abstand benutzen.'
    ],
    progression: [
      'Leichter: langsamere Änderung (0,5 bis 1 Δ pro Sekunde), große Ziele (8 bis 10 cm), nur eine Richtung.',
      'Schwerer: schnellere Änderung (3 bis 5 Δ pro Sekunde), kleines Ziel (3 bis 4 cm), beide Richtungen im Wechsel, mehr Wiederholungen.',
      'Als Trainingsziel gilt ein größerer Bruchpunkt bei gleichbleibend guter Erholung; die Erholung liegt typischerweise unter dem Bruchpunkt.',
      'Wenn Bruch und Erholung über die Wochen näher an die Obergrenze rücken, erhöhe die Obergrenze (Standard 25 Δ).'
    ],
    cautions: [
      T.notMedical,
      'Wer wegen Schielen, Doppelbildern oder Kopfschmerzen behandelt wird, trainiert nur nach Absprache mit der behandelnden Fachperson.',
      'Bei anhaltenden Doppelbildern, Schwindel oder Kopfschmerz nach dem Training sofort aufhören und ärztlich abklären lassen.',
      'Der Versatz ist durch die Bildschirmauflösung begrenzt und bei kleinen Werten nur grob einstellbar.'
    ],
    background: 'Beide Augen sehen leicht unterschiedliche Bilder. Das Gehirn verschmilzt sie zu einem Bild (Fusion), solange der Versatz innerhalb der Fusionsbreite liegt. Wird der Versatz größer, bricht die Fusion zusammen und es entstehen Doppelbilder. Die Fusionsbreite wird in der Orthoptik und Optometrie als Bruch- und Erholungspunkt in Prismendioptrien gemessen: 1 Δ entspricht 1 cm Ablenkung auf 1 m Entfernung. Hier wird der Versatz nicht durch Prismen, sondern durch verschobene Bilder erzeugt, die je Auge in Rot und Blau getrennt sind. Die Werte sind deshalb Vergleichswerte und kein Ersatz für eine Prismenmessung.',
    references: ['Scheiman, M., & Wick, B. Clinical Management of Binocular Vision: Heterophoric, Accommodative, and Eye Movement Disorders. Lippincott Williams & Wilkins.'],
    params: {
      mode: '„Konvergenz“: Das Bild rückt scheinbar näher (die Augen müssen nach innen drehen). „Divergenz“: Das Bild rückt scheinbar weg (die Augen müssen nach außen drehen). „Im Wechsel“ misst beide nacheinander.',
      rampPdPerS: 'Wie schnell der Versatz wächst und schrumpft, in Prismendioptrien pro Sekunde. Langsamere Änderung ist genauer, schnellere trainiert die Anpassungsfähigkeit.',
      maxPd: 'Größter Versatz in Prismendioptrien. Wird er erreicht, ohne dass das Bild bricht, wird das als Obergrenze gewertet und der Versatz geht wieder zurück.',
      repeats: 'Wie oft jede Richtung wiederholt wird. Mehr Wiederholungen ergeben zuverlässigere Mittelwerte, verlängern aber die Übung.',
      targetCm: 'Durchmesser des Ziels in Zentimetern. Größere Ziele sind leichter zu fusionieren.',
      redEye: T.redEye,
      glassesCheck: T.glassesCheck
    },
    metrics: {
      trials: 'Anzahl der abgeschlossenen Durchgänge (Bruch und Erholung gemeldet oder bis zur Grenze gelaufen).',
      break_conv: 'Mittlerer Versatz in Prismendioptrien, bei dem das Bild bei Konvergenz doppelt wurde (Bruchpunkt). Größer bedeutet größere Fusionsbreite.',
      rec_conv: 'Mittlerer Versatz, bei dem das Bild bei Konvergenz nach dem Bruch wieder einfach wurde (Erholungspunkt). Liegt normalerweise unter dem Bruchpunkt.',
      break_div: 'Mittlerer Versatz in Prismendioptrien, bei dem das Bild bei Divergenz doppelt wurde. Die Divergenzbreite ist meist kleiner als die Konvergenzbreite.',
      rec_div: 'Mittlerer Versatz, bei dem das Bild bei Divergenz wieder einfach wurde.',
      capped: 'Anzahl der Durchgänge, in denen das Bild bis zur eingestellten Obergrenze nicht brach. Die Bruchwerte sind dann nach oben abgeschnitten.',
      no_recovery: 'Anzahl der Durchgänge, in denen das Bild auch bei Versatz null nicht wieder einfach wurde. Das kann auf Unterdrückung, Ermüdung oder falsche Bedienung hindeuten.',
      suppression: 'Wie oft du gemeldet hast, dass ein Kontrollstrich fehlt. Fehlt regelmäßig derselbe Strich, kann ein Auge das Bild unterdrücken; bitte fachlich abklären lassen.'
    }
  });
}));
