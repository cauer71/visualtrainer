import { useEffect, useState } from 'preact/hooks';
import {
  CARD_LONG_CM,
  CARD_SHORT_CM,
  cmToDeg,
  DEFAULT_PX_PER_CM,
  DEFAULT_VIEW_DISTANCE_CM,
  pxPerCmFromRef,
  VIEW_DISTANCE_MAX_CM,
  VIEW_DISTANCE_MIN_CM,
} from '../../core/calib';
import { createFormatter } from '../../core/format';
import { getCalibSettings, resetCalibSettings, setCalibSettings } from '../../core/storage';
import { useApp } from '../app-context';
import { Icon } from '../components/Icon';
import { Stepper } from '../components/Stepper';
import { go } from '../router';

type Side = 'long' | 'short';

/** Seitenrand + Innenabstand der Karte um das Rechteck: so viel Breite geht vom Fenster ab */
const CHROME_PX = 84;

/** Zu schmaler Bildschirm für die lange Kartenseite? (grobe Schätzung mit 38 px/cm) */
function defaultSide(pxPerCm: number): Side {
  return window.innerWidth < CARD_LONG_CM * pxPerCm + CHROME_PX ? 'short' : 'long';
}

/**
 * Kalibrierung: Rechteck per Schieberegler/Plus-Minus auf die Breite einer Bankkarte stellen → Pixel pro cm;
 * Sehentfernung (30–100 cm); Prüfzeile (5-cm-Quadrat). Gespeichert wird lokal beim Tippen auf „Speichern“.
 * Ohne Kalibrierung laufen alle Übungen mit einer Schätzung (38 px/cm) weiter.
 */
export function Calibrate() {
  const { ui, lang, isOptician } = useApp();
  const c = ui.calib;
  const fmt = createFormatter(lang);
  const [saved, setSaved] = useState(() => getCalibSettings());
  const startPx = saved.pxPerCm ?? DEFAULT_PX_PER_CM;
  const [side, setSide] = useState<Side>(() => defaultSide(startPx));
  const [widthPx, setWidthPx] = useState(() => Math.round(startPx * (defaultSide(startPx) === 'long' ? CARD_LONG_CM : CARD_SHORT_CM)));
  const [dist, setDist] = useState(saved.viewDistanceCm);
  const [msg, setMsg] = useState('');
  const [maxW, setMaxW] = useState(() => Math.min(1600, window.innerWidth - CHROME_PX));

  useEffect(() => {
    window.scrollTo(0, 0);
    const on = () => setMaxW(Math.min(1600, window.innerWidth - CHROME_PX));
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);

  const refCm = side === 'long' ? CARD_LONG_CM : CARD_SHORT_CM;
  const pxPerCm = pxPerCmFromRef(widthPx, refCm);
  const aspect = side === 'long' ? CARD_SHORT_CM / CARD_LONG_CM : CARD_LONG_CM / CARD_SHORT_CM;
  const calibrated = saved.pxPerCm !== null;
  const dirty = Math.abs((saved.pxPerCm ?? -1) - pxPerCm) > 0.005 || saved.viewDistanceCm !== dist;
  const widthMax = Math.max(widthPx, maxW);

  const changeSide = (s: Side) => {
    setSide(s);
    setWidthPx(Math.round(pxPerCm * (s === 'long' ? CARD_LONG_CM : CARD_SHORT_CM)));
    setMsg('');
  };
  const save = () => {
    setSaved(setCalibSettings({ pxPerCm, viewDistanceCm: dist }));
    setMsg(c.saved);
  };
  const reset = () => {
    const r = resetCalibSettings();
    setSaved(r);
    setDist(r.viewDistanceCm || DEFAULT_VIEW_DISTANCE_CM);
    setWidthPx(Math.round(DEFAULT_PX_PER_CM * refCm));
    setMsg(c.resetDone);
  };
  const back = () => {
    if (window.history.length > 1) window.history.back();
    else go(isOptician ? '/optiker' : '/');
  };
  const live = (v: number) => fmt.num(v, 1);

  return (
    <main class="container calibrate" id="main">
      <button type="button" class="back-link back-btn" onClick={back}>
        <Icon name="back" size={20} /> {c.back}
      </button>
      <h1>{c.title}</h1>
      <p class="lead">{c.lead}</p>
      <p class={`chip ${calibrated ? 'chip-good' : 'chip-new'}`} role="status">
        {calibrated ? '✓ ' : ''}
        {calibrated ? c.statusDone(live(saved.pxPerCm ?? 0)) : c.statusNone(live(DEFAULT_PX_PER_CM))}
      </p>

      <section class="calib-step" aria-labelledby="calib-card">
        <h2 id="calib-card">{c.stepCard}</h2>
        <p>{c.cardText}</p>
        <div class="option-choices" role="radiogroup" aria-label={c.cardSideLabel}>
          {(['long', 'short'] as const).map((s) => (
            <button key={s} type="button" role="radio" aria-checked={side === s} class={`option-choice${side === s ? ' is-on' : ''}`} onClick={() => changeSide(s)}>
              {side === s ? '✓ ' : ''}
              {s === 'long' ? c.cardLong : c.cardShort}
            </button>
          ))}
        </div>
        <p class="param-hint">{c.cardHint}</p>
        <div class="calib-card-wrap">
          <div class="calib-card" style={{ width: `${widthPx}px`, height: `${Math.round(widthPx * aspect)}px` }} role="img" aria-label={`${c.width}: ${widthPx} ${c.pxUnit}`}>
            <span class="calib-card-text">{side === 'long' ? '85,6 mm' : '54 mm'}</span>
          </div>
        </div>
        <Stepper
          value={widthPx}
          min={60}
          max={widthMax}
          step={1}
          format={(v) => fmt.num(v, 0)}
          unit={c.pxUnit}
          label={c.width}
          lessLabel={`${c.width}: −`}
          moreLabel={`${c.width}: +`}
          onChange={(v) => {
            setWidthPx(v);
            setMsg('');
          }}
        />
        <p class="calib-result">{c.widthResult(live(pxPerCm))}</p>
      </section>

      <section class="calib-step" aria-labelledby="calib-dist">
        <h2 id="calib-dist">{c.stepDistance}</h2>
        <p>{c.distanceText}</p>
        <Stepper
          value={dist}
          min={VIEW_DISTANCE_MIN_CM}
          max={VIEW_DISTANCE_MAX_CM}
          step={1}
          format={(v) => fmt.num(v, 0)}
          unit="cm"
          label={c.distanceLabel}
          lessLabel={`${c.distanceLabel}: −`}
          moreLabel={`${c.distanceLabel}: +`}
          onChange={(v) => {
            setDist(v);
            setMsg('');
          }}
        />
      </section>

      <section class="calib-step" aria-labelledby="calib-check">
        <h2 id="calib-check">{c.stepCheck}</h2>
        <p>{c.checkText}</p>
        <div class="calib-square" style={{ width: `${5 * pxPerCm}px`, height: `${5 * pxPerCm}px` }} role="img" aria-label={c.checkLabel}>
          <span class="calib-card-text">{c.checkLabel}</span>
        </div>
        <p class="param-hint">{c.checkAngle(fmt.num(dist, 0), fmt.num(cmToDeg(5, dist), 1))}</p>
      </section>

      <div class="calib-actions">
        <button type="button" class="btn btn-primary btn-xl" onClick={save}>
          <Icon name="check" size={20} stroke={3} /> {c.save}
        </button>
        <button type="button" class="btn btn-ghost" onClick={reset}>
          <Icon name="refresh" size={18} /> {c.reset}
        </button>
        <span class="footer-msg" role="status">
          {msg || (dirty ? c.unsaved : '')}
        </span>
      </div>
    </main>
  );
}
