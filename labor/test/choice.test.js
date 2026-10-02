const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const choice = require('../ex/choice.js');
const { ChoiceSession } = choice;

function make(over, seed) {
  const p = VT.sanitizeParams(choice, Object.assign(VT.defaultsOf(choice), over || {}));
  return new ChoiceSession(p, { rng: VT.makeRng(seed || 1) });
}

test('Reize sind gleichmäßig verteilt', function () {
  const s = make({ trials: 40, options: 4 });
  const cnt = [0, 0, 0, 0];
  s.stimuli.forEach(function (x) { cnt[x]++; });
  assert.deepEqual(cnt, [10, 10, 10, 10]);
  const t = make({ trials: 10, options: 4 });
  const c2 = [0, 0, 0, 0];
  t.stimuli.forEach(function (x) { c2[x]++; });
  assert.equal(t.stimuli.length, 10);
  assert.ok(Math.max.apply(null, c2) - Math.min.apply(null, c2) <= 1);
});

test('Ablauf: Wartezeit, Anzeige, richtige und falsche Antwort', function () {
  const s = make({ trials: 10, options: 3, waitMinMs: 600, waitMaxMs: 600, stimulusMs: 1000 });
  s.start(0);
  assert.equal(s.state, 'wait');
  s.update(599);
  assert.equal(s.state, 'wait');
  s.update(600);
  assert.equal(s.state, 'show');
  const stim = s.current();
  assert.ok(stim >= 0 && stim < 3);
  const r = s.respond(stim, 950);
  assert.deepEqual([r.type, r.rt], ['correct', 350]);
  assert.equal(s.state, 'wait');
  s.update(1550); // zweite Anzeige beginnt (950 + 600)
  assert.equal(s.state, 'show');
  const wrong = (s.current() + 1) % 3;
  assert.equal(s.respond(wrong, 1700).type, 'wrong');
  assert.equal(s.trials.length, 2);
  assert.equal(s.trials[1].outcome, 'wrong');
});

test('Zu früh gedrückt zählt nicht als Durchgang', function () {
  const s = make({ trials: 10, waitMinMs: 1000, waitMaxMs: 1000 });
  s.start(0);
  assert.equal(s.respond(0, 300).type, 'early');
  assert.equal(s.early, 1);
  assert.equal(s.trials.length, 0);
});

test('Keine Antwort: nach Ablauf der Antwortzeit', function () {
  const s = make({ trials: 10, waitMinMs: 300, waitMaxMs: 300, stimulusMs: 500 });
  s.start(0);
  s.update(300);
  assert.equal(s.state, 'show');
  s.update(799);
  assert.equal(s.state, 'show');
  s.update(800);
  assert.equal(s.trials[0].outcome, 'omission');
  assert.equal(s.state, 'wait');
});

test('Ende nach allen Durchgängen; Kennzahlen', function () {
  const s = make({ trials: 10, options: 2, waitMinMs: 300, waitMaxMs: 300, stimulusMs: 1000 }, 4);
  s.start(0);
  let t = 0;
  for (let i = 0; i < 10; i++) {
    t += 300; s.update(t);
    if (i < 6) { s.respond(s.current(), t + 400); t += 400; }          // 6 richtig, je 400 ms
    else if (i < 8) { s.respond((s.current() + 1) % 2, t + 500); t += 500; } // 2 falsch
    else { t += 1000; s.update(t); }                                    // 2 ohne Antwort
  }
  assert.ok(s.finished);
  const sum = s.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('correct'), 6);
  assert.equal(get('wrong'), 2);
  assert.equal(get('omissions'), 2);
  assert.equal(get('accuracy'), 60);
  assert.equal(get('rt_mean'), 400);
  assert.equal(get('rt_sd'), 0);
  sum.metrics.forEach(function (m) { assert.ok(choice.metricKeys.indexOf(m.key) >= 0, m.key); });
});

test('Wartezeit-Maximum unter dem Minimum wird angehoben', function () {
  const s = make({ waitMinMs: 2000, waitMaxMs: 500 });
  s.start(0);
  assert.equal(s.onsetAt, 2000);
});
