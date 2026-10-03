/* Übung „Richtungsentscheidung“: Ein Pfeil zeigt in eine von 4 oder 8 Richtungen. Man gibt die Richtung des Pfeils (oder die Gegenrichtung) an.
 * Zwei Eingabearten: per Berührung auf einem Richtungsfeld oder mit Hilfsperson (die Person neigt z. B. eine Plattform oder zeigt die Richtung mit dem Körper,
 * die Hilfsperson bestätigt „richtig“/„falsch“). Die App kann die Plattform nicht auslesen. Trainiert schnelle Richtungszuordnung. Eigene Implementierung. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) require('../lib/draw.js');
  const choice = isNode ? require('./choice.js') : VT.get('choice');
  const ex = factory(VT, choice);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT, choice) {
  'use strict';

  const params = [
    { key: 'trials', label: 'Anzahl der Pfeile', type: 'number', min: 10, max: 120, step: 2, default: 32 },
    { key: 'directions', label: 'Richtungen', type: 'select', default: '4', options: [{ value: '4', label: '4 (oben, rechts, unten, links)' }, { value: '8', label: '8 (mit Diagonalen)' }] },
    { key: 'rule', label: 'Aufgabe', type: 'select', default: 'same', options: [{ value: 'same', label: 'In Pfeilrichtung' }, { value: 'opposite', label: 'In Gegenrichtung' }] },
    { key: 'input', label: 'Eingabe', type: 'select', default: 'touch', options: [{ value: 'touch', label: 'Berührung auf dem Richtungsfeld' }, { value: 'helper', label: 'Hilfsperson bestätigt' }] },
    { key: 'stimulusMs', label: 'Antwortzeit je Pfeil (ms)', type: 'number', min: 500, max: 8000, step: 100, default: 2500 },
    { key: 'waitMinMs', label: 'Wartezeit mindestens (ms)', type: 'number', min: 300, max: 3000, step: 100, default: 800 },
    { key: 'waitMaxMs', label: 'Wartezeit höchstens (ms)', type: 'number', min: 300, max: 5000, step: 100, default: 2000 },
    { key: 'sizeCm', label: 'Pfeilgröße (cm)', type: 'number', min: 3, max: 16, step: 0.5, default: 8 },
    { key: 'sound', label: 'Ton bei Antwort', type: 'select', default: 'no', options: [{ value: 'no', label: 'Aus' }, { value: 'yes', label: 'An' }] }
  ];

  /** Wie die Wahlreaktion, aber mit Richtungsabbildung (gleich oder entgegengesetzt). Richtung 0 = oben, im Uhrzeigersinn. */
  class DirectionSession extends choice.ChoiceSession {
    constructor(p, env) {
      const n = Number(p.directions);
      super({ trials: p.trials, options: n, waitMinMs: p.waitMinMs, waitMaxMs: p.waitMaxMs, stimulusMs: p.stimulusMs }, env);
      this.pp = p;
      this.n = n;
    }
    expectedFor(stim) { return this.pp.rule === 'opposite' ? (stim + this.n / 2) % this.n : stim; }
    wrongFor(stim) { return (stim + 1) % this.n; }
    respondDir(option, now) {
      const stim = this.current();
      if (stim == null) return this.respond(0, now);
      return this.respond(option === this.expectedFor(stim) ? stim : this.wrongFor(stim), now);
    }
    respondHelper(correct, now) {
      const stim = this.current();
      if (stim == null) return this.respond(0, now);
      return this.respond(correct ? stim : this.wrongFor(stim), now);
    }
  }

  function drawArrow(ctx, cx, cy, size, angleRad, color) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angleRad);
    ctx.fillStyle = color;
    ctx.beginPath();
    const s = size / 2;
    ctx.moveTo(0, -s); ctx.lineTo(s * 0.7, -s * 0.1); ctx.lineTo(s * 0.28, -s * 0.1); ctx.lineTo(s * 0.28, s); ctx.lineTo(-s * 0.28, s); ctx.lineTo(-s * 0.28, -s * 0.1); ctx.lineTo(-s * 0.7, -s * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new DirectionSession(p, { rng: env.rng });
    const n = session.n;
    const pad = { cx: W / 2, cy: H * 0.72, R: Math.min(H * 0.17, W * 0.2) };
    const bs = Math.max(44, Math.min(90, pad.R * 0.75));
    const padBtns = [];
    for (let i = 0; i < n; i++) {
      const a = i * 2 * Math.PI / n - Math.PI / 2;
      padBtns.push({ x: pad.cx + Math.cos(a) * pad.R - bs / 2, y: pad.cy + Math.sin(a) * pad.R - bs / 2, w: bs, h: bs });
    }
    const hb = Math.min(300, (W - 60) / 2);
    const okBtn = { x: W / 2 - hb - 10, y: H - 110, w: hb, h: 70 }, badBtn = { x: W / 2 + 10, y: H - 110, w: hb, h: 70 };
    let raf = 0, stopped = false, press = null;

    function feedback(res, now) {
      if (!res) return;
      press = { ok: res.type === 'correct', until: now + 200 };
      if (p.sound === 'yes') env.audio.beep(res.type === 'correct' ? 1100 : 200, 50, 0.12);
    }
    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev), now = env.now();
      if (p.input === 'helper') {
        if (D.inRect(okBtn, pt.x, pt.y)) feedback(session.respondHelper(true, now), now);
        else if (D.inRect(badBtn, pt.x, pt.y)) feedback(session.respondHelper(false, now), now);
        return;
      }
      for (let i = 0; i < padBtns.length; i++) if (D.inRect(padBtns[i], pt.x, pt.y)) { feedback(session.respondDir(i, now), now); return; }
    }
    function onKey(ev) {
      if (p.input !== 'helper') return;
      const now = env.now();
      if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); feedback(session.respondHelper(true, now), now); }
      else if (ev.key === 'x' || ev.key === 'X' || ev.key === 'Backspace') { ev.preventDefault(); feedback(session.respondHelper(false, now), now); }
    }
    function stop() {
      stopped = true; cancelAnimationFrame(raf);
      env.canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    }
    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now);
      D.clear(env, press && now < press.until ? (press.ok ? '#10201b' : '#2a1519') : null);
      const cur = session.current();
      const cx = W / 2, cy = H * 0.3;
      if (cur != null) drawArrow(ctx, cx, cy, p.sizeCm * px, cur * 2 * Math.PI / n, '#f2f5f7');
      else { ctx.strokeStyle = D.theme.muted; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - 14, cy); ctx.lineTo(cx + 14, cy); ctx.moveTo(cx, cy - 14); ctx.lineTo(cx, cy + 14); ctx.stroke(); }
      D.text(ctx, p.rule === 'opposite' ? 'Gegenrichtung des Pfeils' : 'Richtung des Pfeils', W / 2, 40, { size: 22, align: 'center', color: D.theme.muted });
      if (p.input === 'helper') {
        D.button(ctx, okBtn, 'Richtig (Leertaste)', { size: 20, fill: D.theme.panelHi });
        D.button(ctx, badBtn, 'Falsch (X)', { size: 20 });
      } else {
        padBtns.forEach(function (r, i) {
          D.button(ctx, r, '', { fill: D.theme.panel });
          drawArrow(ctx, r.x + r.w / 2, r.y + r.h / 2, r.w * 0.55, i * 2 * Math.PI / n, '#9aa7b4');
        });
      }
      D.hud(env, (session.idx + (session.state === 'show' ? 1 : 0)) + ' / ' + p.trials);
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'directions', title: 'Richtungsentscheidung', group: 'Gleichgewicht und Körper (ohne Sensor)',
    summary: 'Pfeilrichtung (oder Gegenrichtung) angeben, per Berührung oder mit Bestätigung durch eine Hilfsperson.',
    headline: ['accuracy', 'rt_mean'],
    metricKeys: ['correct', 'wrong', 'omissions', 'early', 'accuracy', 'rt_mean', 'rt_median', 'rt_sd'],
    params: params,
    createSession: function (p, env) { return new DirectionSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, DirectionSession: DirectionSession
  });
}));
