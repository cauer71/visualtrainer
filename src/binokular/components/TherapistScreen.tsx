/** Geschützter Therapeutenbereich: Parameter, PIN, Reset, Export (CSV/JSON), Import (JSON) */
import { useState } from 'preact/hooks';
import type { Volume } from '../audio';
import { sessionsToCsv } from '../data/csv';
import { chooseLevel, defaultProgress, unlockAll } from '../data/progress';
import { cleanPatientId, type Settings } from '../data/settings';
import { LEVELS } from '../levels';
import { activeProfile, type Store } from '../data/storage';
import { mergeProfiles } from '../calibration/profiles';
import { secondFilter } from '../vision/color';
import { ProfilePicker } from './ProfilePicker';
import { exportSettings, importSettings } from '../data/transfer';
import { changePin, checkPin } from '../therapy/pin';
import { t } from '../texts';
import { Choice, download, NumberField, SafetyNotice, Screen, Toggle } from './common';

type Props = {
  store: Store;
  update: (fn: (s: Store) => Store) => void;
  onBack: () => void;
  onHistory: () => void;
};

export function TherapistScreen({ store, update, onBack, onHistory }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [note, setNote] = useState('');
  const [newPin, setNewPin] = useState('');
  const [repeat, setRepeat] = useState('');
  const s = store.settings;
  const set = (patch: Partial<Settings>) => {
    update((st) => ({ ...st, settings: { ...st.settings, ...patch } }));
    setNote(t.saved);
  };
  const profile = activeProfile(store);
  const otherName = t.filterName[secondFilter(profile.mode)];

  if (!unlocked) {
    return (
      <Screen title={t.pinTitle} onBack={onBack}>
        <form
          class="bm-card bm-pin"
          onSubmit={(e) => {
            e.preventDefault();
            if (checkPin(pin, store.pin)) {
              setUnlocked(true);
              setPinError(false);
            } else setPinError(true);
          }}
        >
          <label class="bm-field" for="bm-pin-input">
            <span>{t.pinLabel}</span>
            <input id="bm-pin-input" type="password" inputMode="numeric" autoComplete="off" maxLength={8} value={pin} onInput={(e) => setPin((e.currentTarget as HTMLInputElement).value)} />
          </label>
          <button class="bm-btn bm-btn-primary" type="submit" id="bm-pin-ok">
            {t.pinEnter}
          </button>
          {pinError && (
            <p class="bm-error" role="alert">
              {t.pinWrong}
            </p>
          )}
          <p class="bm-muted">{t.pinHint}</p>
        </form>
        <SafetyNotice />
      </Screen>
    );
  }

  return (
    <Screen
      title={t.therapistTitle}
      onBack={onBack}
      wide
      aside={
        <button class="bm-btn" onClick={onHistory}>
          {t.history}
        </button>
      }
    >
      <SafetyNotice />
      <p class="bm-note" role="status" aria-live="polite">
        {note}
      </p>
      <div class="bm-form" id="therapist-form">
        <section class="bm-card">
          <h2>{t.secPatient}</h2>
          <label class="bm-field" for="f-pid">
            <span>{t.patientId}</span>
            <input id="f-pid" type="text" maxLength={32} value={s.patientId} onChange={(e) => set({ patientId: cleanPatientId((e.currentTarget as HTMLInputElement).value) })} />
          </label>
          <p class="bm-muted">{t.patientIdHint}</p>
          <label class="bm-field" for="f-age">
            <span>{t.age}</span>
            <input
              id="f-age"
              type="number"
              min={1}
              max={120}
              value={s.age ?? ''}
              onChange={(e) => {
                const v = (e.currentTarget as HTMLInputElement).value;
                set({ age: v === '' ? null : Math.min(120, Math.max(1, Math.round(Number(v)))) });
              }}
            />
          </label>
        </section>
        <section class="bm-card">
          <h2>{t.secVision}</h2>
          <Choice
            name="t-amb"
            label={t.amblyopicEye}
            value={s.amblyopicEye}
            options={[
              { value: 'LEFT', label: t.leftCap },
              { value: 'RIGHT', label: t.rightCap },
            ]}
            onChange={(v) => set({ amblyopicEye: v })}
          />
          <ProfilePicker
            name="t-profile"
            profiles={store.profiles}
            activeId={profile.id}
            onPick={(id) => {
              update((st) => ({ ...st, activeProfileId: id }));
              setNote(t.saved);
            }}
          />
          <p class="bm-muted" id="t-profile-info">
            {t.profileInfo(profile.name)}
          </p>
          <Choice
            name="t-lens"
            label={t.mapping}
            value={s.leftLens}
            options={[
              { value: 'RED', label: t.lensLeftRed(otherName) },
              { value: 'OTHER', label: t.lensLeftOther(otherName) },
            ]}
            onChange={(v) => set({ leftLens: v })}
          />
        </section>
        <section class="bm-card">
          <h2>{t.secContrast}</h2>
          <NumberField id="f-ac" label={t.amblyopicContrast} value={s.amblyopicContrast} min={0} max={100} step={0.1} onChange={(v) => set({ amblyopicContrast: v })} />
          <NumberField id="f-fc" label={t.fellowEyeContrast} value={s.fellowEyeContrast} min={0} max={100} step={0.1} onChange={(v) => set({ fellowEyeContrast: v })} />
          <NumberField id="f-sfc" label={t.startFellowEyeContrast} value={s.startFellowEyeContrast} min={0} max={100} step={0.1} onChange={(v) => set({ startFellowEyeContrast: v })} />
          <Toggle id="f-adaptive" label={t.adaptiveContrast} checked={s.adaptiveContrast} onChange={(v) => set({ adaptiveContrast: v })} />
          <Choice
            name="t-mode"
            label={t.contrastMode}
            value={s.contrastMode}
            options={(['PERCENTUAL', 'LINEAR', 'MANUAL'] as const).map((m) => ({ value: m, label: t.modes[m] }))}
            onChange={(v) => set({ contrastMode: v })}
          />
          <p class="bm-muted">{t.adaptiveHint}</p>
        </section>
        <section class="bm-card">
          <h2>{t.secSession}</h2>
          <NumberField id="f-sm" label={t.sessionMinutes} value={s.sessionMinutes} min={5} max={90} onChange={(v) => set({ sessionMinutes: Math.round(v) })} />
          <NumberField id="f-lm" label={t.maxLevelMinutes} value={s.maxLevelMinutes} min={2} max={15} onChange={(v) => set({ maxLevelMinutes: Math.round(v) })} />
          <NumberField id="f-os" label={t.objectSize} value={s.objectSizePercent} min={50} max={150} step={5} onChange={(v) => set({ objectSizePercent: Math.round(v / 5) * 5 })} />
          <Choice
            name="t-diff"
            label={t.difficulty}
            value={s.difficulty}
            options={(['EASY', 'MEDIUM', 'HARD'] as const).map((d) => ({ value: d, label: t.difficulties[d] }))}
            onChange={(v) => set({ difficulty: v })}
          />
          <p class="bm-muted">{t.difficultyHint}</p>
          <Toggle id="f-pause" label={t.pauseOffer} checked={s.pauseOffer} onChange={(v) => set({ pauseOffer: v })} />
          <Toggle id="f-supp" label={t.suppressionChecks} checked={s.suppressionChecks} onChange={(v) => set({ suppressionChecks: v })} />
          <Toggle id="f-red" label={t.reduceFellow} checked={s.reduceFellowOnSuppression} onChange={(v) => set({ reduceFellowOnSuppression: v })} />
          <Toggle id="f-debug" label={t.debugMode} checked={s.debugMode} onChange={(v) => set({ debugMode: v })} />
        </section>
        <section class="bm-card">
          <h2>{t.secLevels}</h2>
          <p class="bm-muted" id="unlocked-info">
            {store.progress.unlocked >= LEVELS.length ? t.allUnlocked : t.unlockedInfo(store.progress.unlocked, LEVELS.length)}
          </p>
          <Choice
            name="t-start-level"
            label={t.startLevel}
            value={String(store.progress.level)}
            options={LEVELS.map((lv) => ({ value: String(lv.number), label: String(lv.number) }))}
            onChange={(v) => {
              update((st) => ({ ...st, progress: chooseLevel(st.progress, Number(v), LEVELS.length, true) }));
              setNote(t.saved);
            }}
          />
          <button
            class="bm-btn"
            id="bm-unlock-all"
            disabled={store.progress.unlocked >= LEVELS.length}
            onClick={() => {
              update((st) => ({ ...st, progress: unlockAll(st.progress, LEVELS.length) }));
              setNote(t.allUnlocked);
            }}
          >
            {t.unlockAll}
          </button>
        </section>
        <section class="bm-card">
          <h2>{t.secSound}</h2>
          <Toggle
            id="f-sound"
            label={t.soundPreset}
            checked={s.soundOn}
            onChange={(v) => {
              update((st) => ({ ...st, audio: null, settings: { ...st.settings, soundOn: v } }));
              setNote(t.saved);
            }}
          />
          <Choice
            name="t-volume"
            label={t.volume}
            value={s.soundVolume}
            options={(['LOW', 'MEDIUM', 'HIGH'] as Volume[]).map((v) => ({ value: v, label: t.volumes[v] }))}
            onChange={(v) => {
              update((st) => ({ ...st, audio: null, settings: { ...st.settings, soundVolume: v } }));
              setNote(t.saved);
            }}
          />
          <p class="bm-muted">{t.soundPresetHint}</p>
        </section>
        <section class="bm-card">
          <h2>{t.secData}</h2>
          <p class="bm-muted">{t.sessionsStored(store.sessions.length)}</p>
          <div class="bm-actions bm-actions-col">
            <button class="bm-btn" id="bm-export-csv" onClick={() => download(`binokular-sessions-${new Date().toISOString().slice(0, 10)}.csv`, sessionsToCsv(store.sessions), 'text/csv;charset=utf-8')}>
              {t.exportCsv}
            </button>
            <button class="bm-btn" id="bm-export-json" onClick={() => download('binokular-einstellungen.json', exportSettings({ settings: store.settings, calibration: store.calibration, profiles: store.profiles, activeProfileId: store.activeProfileId }), 'application/json')}>
              {t.exportJson}
            </button>
            <label class="bm-btn bm-file">
              {t.importJson}
              <input
                type="file"
                accept="application/json,.json"
                id="bm-import"
                onChange={async (e) => {
                  const input = e.currentTarget as HTMLInputElement;
                  const f = input.files?.[0];
                  if (!f) return;
                  const r = importSettings(await f.text());
                  input.value = '';
                  if (!r.ok) {
                    setNote(t.importError[r.error]);
                    return;
                  }
                  update((st) => {
                    const profiles = mergeProfiles(st.profiles, r.profiles);
                    return { ...st, settings: r.settings, calibration: r.calibration, profiles, activeProfileId: profiles.some((x) => x.id === r.activeProfileId) ? r.activeProfileId : st.activeProfileId };
                  });
                  setNote(t.imported);
                }}
              />
            </label>
            <button
              class="bm-btn bm-btn-stop"
              id="bm-reset"
              onClick={() => {
                if (!window.confirm(t.resetConfirm)) return;
                update((st) => ({
                  ...st,
                  sessions: [],
                  activeSession: null,
                  settings: { ...st.settings, fellowEyeContrast: st.settings.startFellowEyeContrast },
                  progress: defaultProgress(),
                }));
                setNote(t.resetDone);
              }}
            >
              {t.resetTraining}
            </button>
          </div>
        </section>
        <section class="bm-card">
          <h2>{t.secPin}</h2>
          <form
            class="bm-pin-change"
            onSubmit={(e) => {
              e.preventDefault();
              const r = changePin(newPin, repeat);
              if (!r.ok) {
                setNote(r.error === 'invalid' ? t.pinInvalid : t.pinMismatch);
                return;
              }
              update((st) => ({ ...st, pin: r.pin }));
              setNewPin('');
              setRepeat('');
              setNote(t.pinChanged);
            }}
          >
            <label class="bm-field" for="f-np">
              <span>{t.newPin}</span>
              <input id="f-np" type="password" inputMode="numeric" autoComplete="new-password" maxLength={8} value={newPin} onInput={(e) => setNewPin((e.currentTarget as HTMLInputElement).value)} />
            </label>
            <label class="bm-field" for="f-rp">
              <span>{t.repeatPin}</span>
              <input id="f-rp" type="password" inputMode="numeric" autoComplete="new-password" maxLength={8} value={repeat} onInput={(e) => setRepeat((e.currentTarget as HTMLInputElement).value)} />
            </label>
            <button class="bm-btn" type="submit">
              {t.changePin}
            </button>
          </form>
        </section>
      </div>
    </Screen>
  );
}
