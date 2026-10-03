/* Steuerung für Übungen mit seitlicher Bewegung: Zeiger (Maus/Touch), Pfeiltasten oder Gerätekippen (falls vom Gerät unterstützt).
 * Die Plattform selbst wird nicht ausgelesen. Keine Netzwerkzugriffe. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('./core.js') : root.VT;
  const api = factory();
  VT.input = api;
  if (isNode) module.exports = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /** Pfeiltasten (und A/D) → Achse -1, 0 oder 1. */
  function axisFromKeys(down) { return (down.right ? 1 : 0) - (down.left ? 1 : 0); }
  /** Kippwinkel gamma (Grad, links negativ) → Achse -1..1; ±25° ergeben Vollausschlag, kleine Winkel werden ausgeblendet. */
  function axisFromGamma(gamma) {
    if (typeof gamma !== 'number' || !isFinite(gamma)) return 0;
    const dead = 2;
    if (Math.abs(gamma) < dead) return 0;
    const v = (Math.abs(gamma) - dead) / (25 - dead);
    return Math.max(-1, Math.min(1, Math.sign(gamma) * v));
  }

  /**
   * Wendet eine Eingabe auf die Position x (cm) an.
   * input: { mode: 'position', x: Anteil 0..1 } oder { mode: 'axis', a: -1..1 }; maxSpeed in cm/s, dt in s, W Feldbreite in cm.
   */
  function applySteering(x, input, dt, maxSpeed, W) {
    let nx = x;
    if (input && input.mode === 'position' && typeof input.x === 'number') nx = input.x * W;
    else if (input && input.mode === 'axis') nx = x + input.a * maxSpeed * dt;
    return Math.max(0, Math.min(W, nx));
  }

  /**
   * Erzeugt eine Steuerung. kind: 'pointer' | 'keys' | 'tilt'. canvas nimmt Zeiger-Ereignisse, win Tasten- und Kippereignisse.
   * read() liefert die aktuelle Eingabe, dispose() entfernt alle Handler.
   */
  function createSteering(kind, canvas, win) {
    const state = { frac: 0.5, down: { left: false, right: false }, gamma: 0 };
    const subs = [];
    function on(target, type, fn) { target.addEventListener(type, fn); subs.push(function () { target.removeEventListener(type, fn); }); }
    if (kind === 'pointer') {
      const move = function (ev) {
        const b = canvas.getBoundingClientRect();
        if (b.width > 0) state.frac = Math.max(0, Math.min(1, (ev.clientX - b.left) / b.width));
      };
      on(canvas, 'pointerdown', move); on(canvas, 'pointermove', move);
    } else if (kind === 'keys') {
      const set = function (ev, v) {
        const k = ev.key;
        if (k === 'ArrowLeft' || k === 'a' || k === 'A') { state.down.left = v; if (ev.preventDefault) ev.preventDefault(); }
        if (k === 'ArrowRight' || k === 'd' || k === 'D') { state.down.right = v; if (ev.preventDefault) ev.preventDefault(); }
      };
      on(win, 'keydown', function (ev) { set(ev, true); }); on(win, 'keyup', function (ev) { set(ev, false); });
    } else if (kind === 'tilt') {
      on(win, 'deviceorientation', function (ev) { state.gamma = ev.gamma; });
    }
    return {
      kind: kind,
      read: function () {
        if (kind === 'pointer') return { mode: 'position', x: state.frac };
        if (kind === 'keys') return { mode: 'axis', a: axisFromKeys(state.down) };
        return { mode: 'axis', a: axisFromGamma(state.gamma) };
      },
      dispose: function () { subs.forEach(function (f) { f(); }); subs.length = 0; }
    };
  }

  return { axisFromKeys: axisFromKeys, axisFromGamma: axisFromGamma, applySteering: applySteering, createSteering: createSteering };
}));
