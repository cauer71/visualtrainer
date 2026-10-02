/* Adaptives Stufenverfahren („2 richtig → schwerer, 1 falsch → leichter“) zur Schwellenbestimmung, z. B. der Anzeigedauer. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('./core.js') : root.VT;
  const api = factory(VT);
  VT.makeStaircase = api.makeStaircase;
  if (isNode) module.exports = api;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  /**
   * o: { start, min, max, factorHarder (<1), factorEasier (>1), needCorrect (Standard 2) }
   * Größerer Wert = leichter (z. B. längere Anzeigedauer).
   */
  function makeStaircase(o) {
    let value = o.start;
    const need = o.needCorrect || 2;
    let streak = 0, lastDir = 0;
    const reversals = [];
    const history = [];
    function clamp(v) { return Math.min(o.max, Math.max(o.min, v)); }
    return {
      value: function () { return value; },
      record: function (correct) {
        history.push({ value: value, correct: !!correct });
        let dir = 0;
        if (correct) {
          streak++;
          if (streak >= need) { streak = 0; dir = -1; }
        } else {
          streak = 0;
          dir = 1;
        }
        if (dir !== 0) {
          if (lastDir !== 0 && dir !== lastDir) reversals.push(value);
          lastDir = dir;
          const next = Math.round(dir < 0 ? value * o.factorHarder : value * o.factorEasier);
          value = clamp(next === value ? value + dir : next);
        }
        return value;
      },
      reversals: function () { return reversals.slice(); },
      history: function () { return history.slice(); },
      /** Mittel der letzten n Umkehrpunkte (Standard 4); null, wenn weniger als 2 vorliegen. */
      threshold: function (n) {
        if (reversals.length < 2) return null;
        return VT.mean(reversals.slice(-(n || 4)));
      }
    };
  }

  return { makeStaircase: makeStaircase };
}));
