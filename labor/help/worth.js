(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  factory(VT, isNode ? require('./common.js') : VT.helpText);
}(typeof self !== 'undefined' ? self : this, function (VT, T) {
  'use strict';
  VT.addHelp('worth', {
    purpose: 'Digitale Form des Worth-Vierpunkttests für Fachpersonen. Vier Lichter stehen in Rautenform: oben ein rotes, links und rechts je ein blaues, unten ein weißes. Jedes Auge sieht durch sein Farbglas nur Teile davon. Die Person gibt an, wie viele Lichter sie sieht. Die Zahl zeigt, ob beide Augen zusammenarbeiten, ob ein Auge unterdrückt wird oder ob Doppelbilder bestehen.',
    setup: [
      T.glassesSetup,
      'Raum deutlich abdunkeln: Der Test arbeitet mit leuchtenden Punkten auf dunklem Grund. Raumlicht verändert das Ergebnis.',
      'Kalibrierung durchführen und den Abstand zum Bildschirm eintragen. Der Test wird üblicherweise in der Nähe (etwa 33 cm) und in der Ferne (etwa 6 m) mit unterschiedlicher Lichtgröße durchgeführt; hier steht dafür die wechselnde Lichtgröße (klein und 2,5-fach groß).',
      'Die Person sitzt ruhig mit geradem Kopf, Blick auf die Mitte der Raute. Die Brille muss richtig herum aufgesetzt sein; im Brillentest prüfen.',
      'Der Befund ist nur aussagekräftig, wenn die Person weder rät noch durch Zudrücken der Augen etwas verändert.'
    ],
    steps: [
      'Anzahl der Darbietungen, Lichtgröße und Größenwechsel einstellen. Standard: 4 Darbietungen, 1,2 cm, Größe wechselt.',
      'Brillentest durchführen und „Weiter“ drücken.',
      'Die Person betrachtet die vier Lichter und zählt, wie viele sie sieht. Es sind nur die Lichter, nicht die Farben zu zählen.',
      'Antwort per Schaltfläche eingeben: 2, 3, 4, 5 oder „Unklar“ (wenn die Zahl wechselt oder nicht bestimmbar ist).',
      'Nach allen Darbietungen erscheinen die Zählung je Kategorie und die Übereinstimmung der Antworten.'
    ],
    tips: [
      'Frage nach der Anzahl der Lichter, nicht nach Farben. Suggestive Fragen vermeiden.',
      'Lasse bei Unsicherheit die Person kurz das Auge wechseln (zudecken), um die Brille zu prüfen, und beginne danach neu.',
      'Verändere die Lichtgröße (klein und groß), um zu sehen, ob sich das Ergebnis mit der Fixationsgröße ändert.',
      'Dokumentiere, ob das Ergebnis stabil oder wechselnd ist. Wechselnde Antworten sind selbst eine Information.',
      'Teste in ruhiger Umgebung ohne Zeitdruck.'
    ],
    progression: [
      'Einfacher: große Lichter (2 bis 4 cm).',
      'Genauer: kleine Lichter (0,5 bis 1 cm) und mehr Darbietungen (8 bis 12), damit sich Muster zeigen.',
      'Zur Verlaufskontrolle immer dieselbe Lichtgröße, denselben Abstand und dasselbe Raumlicht verwenden.',
      'Der Test ist ein Messverfahren und wird nicht trainiert.'
    ],
    cautions: [
      T.notMedical,
      'Die Zuordnung der Lichterzahl zu Kategorien setzt eine Brille mit Rot- und Blauglas und die richtige Brillenseite voraus. Falsch eingestellte Seite vertauscht die Aussagen zu Rot und Blau.',
      'Antworten wie 2 oder 3 Lichter sprechen für Unterdrückung oder einseitiges Sehen unter diesen Testbedingungen, nicht automatisch für eine Erkrankung.',
      'Neu aufgetretene Doppelbilder immer ärztlich abklären lassen.'
    ],
    background: 'Der Test geht auf Claude Worth zurück. Vor ein Auge kommt ein Rotfilter, vor das andere ein Grün- (hier Blau-) Filter. Das rote Licht sieht nur das Auge hinter dem Rotfilter, die beiden grünen (hier blauen) Lichter nur das andere, das weiße Licht sehen beide Augen (es erscheint in der Farbe des jeweiligen Filters). Arbeiten beide Augen zusammen, entstehen vier Lichter. Sieht nur das Auge hinter dem Rotfilter etwas, sind es zwei, sieht nur das andere, sind es drei. Fünf Lichter entsprechen Doppelbildern. Die App ordnet die Zahlen diesen Kategorien zu; die Interpretation gehört in Fachhand.',
    references: ['von Noorden, G. K., & Campos, E. C. Binocular Vision and Ocular Motility: Theory and Management of Strabismus. Mosby.'],
    params: {
      repeats: 'Anzahl der Darbietungen. Mehr Darbietungen zeigen, ob die Antwort stabil ist.',
      dotCm: 'Durchmesser der Lichter in Zentimetern. Größere Lichter entsprechen einer Fixation in der Nähe.',
      varySize: 'Bei „Ja“ wechseln kleine und 2,5-fach große Lichter ab, um den Einfluss der Lichtgröße zu zeigen.',
      redEye: T.redEye,
      glassesCheck: T.glassesCheck
    },
    metrics: {
      trials: 'Anzahl der Darbietungen mit Antwort.',
      fusion: 'Antworten mit vier Lichtern: Hinweis auf Zusammenarbeit beider Augen unter diesen Bedingungen.',
      red_only: 'Antworten mit zwei Lichtern: Es trägt nur das Auge hinter dem roten Glas bei, das andere Auge wird unterdrückt oder ausgeblendet.',
      blue_only: 'Antworten mit drei Lichtern: Es trägt nur das Auge hinter dem blauen Glas bei, das Auge hinter Rot wird unterdrückt oder ausgeblendet.',
      diplopia: 'Antworten mit fünf Lichtern: Doppelbilder.',
      unclear: 'Antworten „unklar“ oder mit einer anderen Zahl.',
      consistency: 'Anteil der häufigsten Antwort an allen Antworten. Niedrige Werte bedeuten wechselnde Antworten.'
    }
  });
}));
