/* Gemeinsame Textbausteine für Übungen mit Rot-Blau-Brille. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  const api = factory();
  VT.helpText = api;
  if (isNode) module.exports = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  return {
    redEye: 'Auf welcher Seite das rote Glas der Brille sitzt. Meist ist es das linke, bei manchen Brillen das rechte. Im Brillentest siehst du, ob die Einstellung stimmt: Beim Zuhalten eines Auges darf nur ein Quadrat sichtbar sein.',
    glassesCheck: 'Zeigt vor dem Start ein rotes und ein blaues Quadrat, damit du Brillenseite und Helligkeit prüfen kannst. Bei „Nein“ startet die Übung sofort mit den eingestellten Werten.',
    glassesSetup: 'Rot-Blau-Brille (Rot-Cyan) aufsetzen; mit Korrekturbrille am besten eine Überbrille verwenden oder die Brille über der Sehhilfe tragen.',
    darkRoom: 'Raum abdunkeln und die Bildschirmhelligkeit hoch einstellen, damit die Farben sauber getrennt werden (rot nur für ein Auge, blau nur für das andere).',
    ghosting: 'Wenn du durch ein Auge beide Farben siehst (Geisterbild), Rot oder Blau im Brillentest dunkler stellen und Raumlicht und Spiegelungen verringern.',
    notMedical: 'Das Ergebnis ist ein Hilfsmittel für Fachpersonen und kein Befund. Die Deutung gehört in die Hand von Augenärztin, Augenarzt, Orthoptistin oder Optometrist.'
  };
}));
