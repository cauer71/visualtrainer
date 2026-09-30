import { it } from 'vitest';
import { zielKlicken as praezisionsFlick } from '../../src/exercises/ziel-klicken/index';
import { simulate } from './_sim-w08-w09';
it('dbg', () => {
  const d = simulate({ def: praezisionsFlick, mode: 'demo', maxSeconds: 40 });
  console.log('DEMO', d.seconds, d.toasts, d.captions, d.taps);
  const p = simulate({ def: praezisionsFlick, mode: 'play', maxSeconds: 300 });
  console.log('PLAY', p.seconds, JSON.stringify(p.result), p.toasts.length, p.labels.slice(-2));
});
