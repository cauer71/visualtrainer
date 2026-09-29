import { useEffect, useRef } from 'preact/hooks';
import { Runner } from '../../core/runner';
import { silentSfx } from '../../core/sound';
import type { ExerciseDefinition } from '../../core/types';
import type { Lang } from '../../i18n/lang';

/**
 * Intro-Film: Die echte Übung läuft im Demo-Modus, eine animierte Hand macht vor,
 * was zu tun ist. Läuft in Schleife und pausiert, wenn sie nicht sichtbar ist.
 */
export function DemoPlayer({ def, lang, label }: { def: ExerciseDefinition; lang: Lang; label: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let runner: Runner | null = null;
    let restartTimer = 0;
    let safetyTimer = 0;
    let visible = true;
    let loop = 0;
    let stopped = false;

    const schedule = (ms: number) => {
      window.clearTimeout(restartTimer);
      restartTimer = window.setTimeout(run, ms);
    };

    const run = () => {
      if (stopped) return;
      runner?.destroy();
      window.clearTimeout(safetyTimer);
      runner = new Runner({
        host: el,
        def,
        mode: 'demo',
        lang,
        startLevel: null,
        seed: 1234 + loop * 97,
        sfx: silentSfx,
        onFinish: () => schedule(1100),
        onError: () => schedule(3000),
      });
      loop++;
      runner.start();
      if (!visible || document.hidden) runner.pause();
      // Sicherheitsnetz, falls eine Demo nicht von selbst endet
      safetyTimer = window.setTimeout(() => schedule(0), 30000);
    };

    run();

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible && !document.hidden) runner?.resume();
            else runner?.pause();
          })
        : null;
    io?.observe(el);
    const onVis = () => {
      if (document.hidden) runner?.pause();
      else if (visible) runner?.resume();
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stopped = true;
      window.clearTimeout(restartTimer);
      window.clearTimeout(safetyTimer);
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      runner?.destroy();
    };
  }, [def, lang]);

  return <div class="demo-stage" ref={host} role="img" aria-label={label} />;
}
