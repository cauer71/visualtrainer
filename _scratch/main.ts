import { createRng } from '../src/core/rng';
import { createFormatter } from '../src/core/format';
import { hand } from '../src/core/draw';
import type { Exercise, ExerciseContext, ExerciseDefinition } from '../src/core/types';
import { zieleAbraeumen } from '../src/exercises/ziele-abraeumen';
import { pendelFang } from '../src/exercises/pendel-fang';
import { hinterDerDeckung } from '../src/exercises/hinter-der-deckung';

const defs: Record<string, ExerciseDefinition> = { 'ziele-abraeumen': zieleAbraeumen, 'pendel-fang': pendelFang, 'hinter-der-deckung': hinterDerDeckung };

(window as any).shot = (id: string, mode: 'play' | 'demo', w: number, h: number, times: number[], seed = 7) => {
  const cv = document.getElementById('c') as HTMLCanvasElement;
  cv.width = w; cv.height = h; cv.style.width = w + 'px'; cv.style.height = h + 'px';
  const g = cv.getContext('2d')!;
  const def = defs[id];
  let now = 0;
  const noop = () => {};
  let caption = '';
  const toasts: Array<{ text: string; t0: number; x?: number; y?: number; ms: number }> = [];
  const queue: any[] = [];
  let cur: any = null;
  let gx = w * 0.78, gy = h * 0.86, pressT = -1e9;
  const u = Math.min(w, h) / 100;
  let ex!: Exercise;
  const ctx: ExerciseContext = {
    mode, autoplay: true, quick: false, reducedMotion: false, startLevel: null, lang: 'de', texts: def.texts.de,
    rng: createRng(seed),
    sfx: { tick: noop, go: noop, good: noop, bad: noop, tap: noop, done: noop },
    hud: { setProgress: noop, setScore: noop, setLabel: noop, toast: (t, _k, o) => toasts.push({ text: t, t0: now, x: o?.x, y: o?.y, ms: o?.ms ?? 800 }), caption: (t) => { caption = t ?? ''; } },
    ghost: {
      tap: (x, y, o) => queue.push({ kind: 'tap', x, y, delay: o?.delay ?? 0, move: o?.move ?? 380 }),
      moveTo: (x, y, o) => queue.push({ kind: 'move', x, y, delay: o?.delay ?? 0, move: o?.move ?? 450 }),
      clear: () => { queue.length = 0; cur = null; }, show: noop, hide: noop,
      get idle() { return !cur && queue.length === 0; },
    },
    stage: { w, h, u, dpr: 1 }, fmt: createFormatter('de'), now: () => now, finish: () => {},
  };
  ex = def.create(ctx);
  ex.start(0);
  const out: string[] = [];
  const dt = 1 / 60;
  const ease = (k: number) => (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2);
  for (const T of times) {
    while (now < T) {
      now += dt * 1000;
      if (!cur && queue.length) cur = { ...queue.shift(), phase: 'wait', t0: now, fx: gx, fy: gy };
      if (cur) {
        if (cur.phase === 'wait' && now - cur.t0 >= cur.delay) { cur.phase = 'move'; cur.t0 = now; cur.fx = gx; cur.fy = gy; }
        if (cur.phase === 'move') {
          const k = cur.move <= 0 ? 1 : Math.min(1, (now - cur.t0) / cur.move);
          gx = cur.fx + (cur.x - cur.fx) * ease(k); gy = cur.fy + (cur.y - cur.fy) * ease(k);
          if (k >= 1) { if (cur.kind === 'tap') { cur.phase = 'press'; cur.t0 = now; pressT = now; ex.pointerDown?.({ id: -1, x: cur.x, y: cur.y, t: now, type: 'ghost' }); } else cur = null; }
        } else if (cur.phase === 'press' && now - cur.t0 >= 170) cur = null;
      }
      ex.update(dt, now);
    }
    g.clearRect(0, 0, w, h);
    ex.render(g, now);
    for (const t of toasts) if (now - t.t0 < t.ms) { g.font = '800 ' + Math.round(u * 4) + 'px sans-serif'; g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText(t.text, t.x ?? w / 2, t.y ?? h * 0.2); }
    if (mode === 'demo' && caption) { g.font = '700 ' + Math.round(u * 4.6) + 'px sans-serif'; g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText(caption, w / 2, h - h * 0.08); }
    if (ctx.autoplay) hand(g, gx, gy, Math.max(48, Math.min(110, u * 13)), now - pressT < 170);
    out.push(cv.toDataURL('image/png'));
  }
  return out;
};
