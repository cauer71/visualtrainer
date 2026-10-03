(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('projection', {
    purpose: 'Du prüfst, wie genau du einen gesehenen Ort in eine Zeigebewegung übersetzt. Ein Punkt blitzt kurz auf, während du die Mitte fixierst, und verschwindet. Nach einer einstellbaren Wartezeit tippst du auf die Stelle, wo er war. Die App berechnet den Fehler, die systematische Verschiebung (Bias) und die Streuung deiner Antworten.',
    setup: [
      'Kalibrierung durchführen, damit Abweichungen in Zentimetern und Grad stimmen.',
      'Sitz etwa 50 bis 60 cm vom Bildschirm entfernt, Kopf ruhig und mittig. Der Zeigefinger der dominanten Hand liegt locker in der Nähe der Mitte.',
      'Sorge für gleichmäßiges Licht. Spiegelungen auf dem Bildschirm verändern die Wahrnehmung des Ortes.',
      'Für Vergleiche immer dieselbe Hand, denselben Abstand und dasselbe Gerät benutzen.'
    ],
    steps: [
      'Anzahl der Punkte, Anzeigedauer und Wartezeit einstellen. Standard: 20 Punkte, 300 ms Anzeige, keine Wartezeit.',
      '„Start“ drücken. In der Mitte erscheint ein kleines Kreuz; dort bleibt der Blick.',
      'Ein Punkt blitzt kurz an einer Stelle auf und verschwindet.',
      'Sobald „Tippe dorthin, wo der Punkt war“ erscheint, tippst du auf die Stelle, wo du ihn gesehen hast.',
      'Bei eingeschalteter Rückmeldung siehst du kurz den echten Ort und deine Antwort. Nach allen Punkten erscheinen die Kennzahlen.'
    ],
    tips: [
      'Bleibe wirklich mit dem Blick auf dem Kreuz, auch wenn der Punkt am Rand erscheint.',
      'Tippe gleich nach dem Aufleuchten, ohne lange zu überlegen. Der erste Eindruck ist meist der genaueste.',
      'Mit Wartezeit prüfst du zusätzlich das räumliche Gedächtnis: Bei längeren Wartezeiten wird die Abweichung oft größer.',
      'Die Rückmeldung zeigt dir, in welche Richtung du systematisch abweichst. Nutze das zum Lernen oder schalte sie für reine Messungen aus.',
      'Mehr Punkte (30 bis 40) liefern zuverlässigere Mittelwerte für die Verschiebung.'
    ],
    progression: [
      'Leichter: lange Anzeige (500 bis 1.000 ms), keine Wartezeit, ganze Fläche, Rückmeldung an.',
      'Schwerer: kurze Anzeige (100 bis 150 ms), Wartezeit (2.000 bis 5.000 ms), Zone „Nur Peripherie“, Rückmeldung aus.',
      'Als Messung eignet sich ein fester Satz (zum Beispiel 30 Punkte, 300 ms, ohne Wartezeit), der regelmäßig wiederholt wird.',
      'Ziel beim Training: kleinere mittlere Abweichung und kleinere Streuung.'
    ],
    cautions: [
      'Das Ergebnis ist ein Hilfsmittel und kein Diagnoseverfahren. Auffällige systematische Verschiebungen können von Gerät, Haltung oder Aufmerksamkeit abhängen.',
      'Bei Lichtempfindlichkeit beachten: Der Punkt blitzt kurz auf.',
      'Bei Schwindel oder Augenbeschwerden pausieren.',
      'Die App kann nicht prüfen, ob der Blick in der Mitte geblieben ist.'
    ],
    background: 'Wenn wir nach einem gesehenen Ort greifen oder zeigen, muss das Gehirn den Ort im Blickfeld in eine Handbewegung übersetzen (Auge-Hand-Projektion). Dabei können systematische Verschiebungen entstehen, etwa wenn Reiz und Zeigebewegung nicht in derselben Blickrichtung liegen, bei Müdigkeit oder durch Schiefhaltung des Kopfes. Der Mittelwert der Fehlervektoren (Bias) zeigt eine solche Verschiebung, die Streuung die Unsicherheit der Antworten. Wartezeiten prüfen zusätzlich das kurzfristige räumliche Gedächtnis.',
    references: [],
    params: {
      trials: 'Anzahl der Punkte im Durchlauf. Mehr Punkte ergeben zuverlässigere Mittelwerte.',
      flashMs: 'Wie lange der Punkt sichtbar ist, in Millisekunden. Kurze Zeiten sind anspruchsvoller.',
      delayMs: 'Wartezeit in Millisekunden zwischen Verschwinden des Punktes und Freigabe der Antwort. Längere Zeiten beanspruchen das räumliche Gedächtnis.',
      zone: '„Gesamte Fläche“: überall. „Nur Peripherie“: nur im äußeren Bereich weit weg von der Mitte.',
      feedback: 'Bei „Ja“ wird nach der Antwort kurz der echte Ort mit deiner Antwort gezeigt. Das hilft beim Lernen, ist für reine Messungen aber nicht nötig.',
      sizeCm: 'Durchmesser des Punktes in Zentimetern.'
    },
    metrics: {
      n: 'Anzahl der beantworteten Punkte.',
      err_mean: 'Mittlerer Abstand zwischen Antwort und echtem Ort in Zentimetern.',
      err_deg: 'Mittlerer Abstand als Sehwinkel in Grad, berechnet über den eingestellten Abstand.',
      bias_x: 'Mittlere seitliche Verschiebung der Antworten in Zentimetern. Positiv bedeutet nach rechts verschoben.',
      bias_y: 'Mittlere senkrechte Verschiebung der Antworten in Zentimetern. Positiv bedeutet nach oben verschoben.',
      scatter: 'Streuung der Antworten um ihren eigenen Mittelpunkt in Zentimetern. Kleine Werte bedeuten sichere, wiederholbare Antworten.',
      rt_mean: 'Mittlere Zeit von der Freigabe der Antwort bis zum Tippen.'
    }
  });
}));
