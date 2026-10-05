import { t } from '../texts';
import { SafetyNotice } from './common';

export function StartScreen(props: { calibratedAt: string | null; onStart: () => void; onCalibrate: () => void; onHistory: () => void; onTherapist: () => void }) {
  const cal = props.calibratedAt ? new Date(props.calibratedAt).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' }) : null;
  return (
    <div class="bm-screen bm-start">
      <header class="bm-hero">
        <svg class="bm-logo" viewBox="0 0 64 64" aria-hidden="true">
          <polygon points="32,6 50,24 42,56 22,56 14,24" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
          <path d="M14 24 H50 M32 6 V56" stroke="currentColor" stroke-width="3" />
        </svg>
        <div>
          <h1>{t.appName}</h1>
          <p class="bm-sub">{t.subtitle}</p>
        </div>
      </header>
      <SafetyNotice />
      <div class="bm-actions">
        <button class="bm-btn bm-btn-primary" id="bm-start" onClick={props.onStart}>
          {t.startTraining}
        </button>
        <button class="bm-btn" id="bm-calibrate" onClick={props.onCalibrate}>
          {t.calibrate}
        </button>
        <button class="bm-btn" id="bm-history" onClick={props.onHistory}>
          {t.history}
        </button>
        <button class="bm-btn" id="bm-therapist" onClick={props.onTherapist}>
          {t.therapist}
        </button>
      </div>
      <p class="bm-muted">{cal ? t.lastCalibration(cal) : t.notCalibrated}</p>
      <section class="bm-card">
        <h2>{t.howTitle}</h2>
        <ul>
          {t.how.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <p class="bm-muted">{t.glassesHint}</p>
      </section>
    </div>
  );
}
