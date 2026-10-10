/** Geschützter Therapeutenbereich: Parameter, PIN, Reset, Export (CSV/JSON), Import (JSON) */
import { useState } from 'preact/hooks';
import type { Volume } from '../audio';
import { sessionsToCsv } from '../data/csv';
import { cleanPatientId, type Settings } from '../data/settings';
import { activeProfile, defaultGameSettings, type GameSettingsMap, type Store } from '../data/storage';
import { mergeProfiles } from '../calibration/profiles';
import { colorKind, filterOf, fullColorOf, otherEye, secondFilter } from '../vision/color';
import { ProfilePicker } from './ProfilePicker';
import { exportSettings, importSettings } from '../data/transfer';
import { changePin, checkPin } from '../therapy/pin';
import { t } from '../texts';
import { Choice, de, download, NumberField, SafetyNotice, Screen, Toggle } from './common';
import { normalizeNach, type NachSettings } from '../games/nachzeichnen/settings';
import { normalizePong, type PongSettings } from '../games/pong/settings';

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
  const setGame = (patch: Partial<GameSettingsMap>) => {
    update((st) => ({ ...st, games: { ...st.games, ...patch } }));
    setNote(t.saved);
  };
  const profile = activeProfile(store);
  const otherName = t.filterName[secondFilter(profile.mode)];
  const lens = { glasses: profile.mode, leftLens: s.leftLens };
  const eyeName = (e: 'LEFT' | 'RIGHT') => (e === 'LEFT' ? t.left : t.right);
  const adj = (e: 'LEFT' | 'RIGHT') => t.colorAdj[colorKind(fullColorOf(filterOf(e, lens), profile))];

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
          <p class="bm-summary" id="t-summary">
            {t.setupSummary(eyeName(s.amblyopicEye), adj(s.amblyopicEye), eyeName(otherEye(s.amblyopicEye)), adj(otherEye(s.amblyopicEye)))}
          </p>
          <p class="bm-muted">{t.setupContrast(de(s.amblyopicContrast), de(s.fellowEyeContrast))}</p>
        </section>
        <section class="bm-card">
          <h2>{t.secContrast}</h2>
          <NumberField id="f-ac" label={t.amblyopicContrast} value={s.amblyopicContrast} min={0} max={100} step={0.1} onChange={(v) => set({ amblyopicContrast: v })} />
          <NumberField id="f-fc" label={t.fellowEyeContrast} value={s.fellowEyeContrast} min={0} max={100} step={0.1} onChange={(v) => set({ fellowEyeContrast: v })} />
          <p class="bm-muted">{t.contrastHint}</p>
          <Toggle id="f-debug" label={t.debugMode} checked={s.debugMode} onChange={(v) => set({ debugMode: v })} />
        </section>
        <section class="bm-card" id="sec-nach">
          <h2>{t.secGameNach}</h2>
          <NachForm
            value={store.games.nachzeichnen}
            onChange={(v) => setGame({ nachzeichnen: v })}
            maxLevel={store.nachMaxLevel}
            onResetLevel={() => {
              update((st) => ({ ...st, nachMaxLevel: 1 }));
              setNote(t.nach.maxLevelResetDone);
            }}
          />
        </section>
        <section class="bm-card" id="sec-pong">
          <h2>{t.secGamePong}</h2>
          <PongForm value={store.games.pong} onChange={(v) => setGame({ pong: v })} />
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
            <button class="bm-btn" id="bm-export-json" onClick={() => download('binokular-einstellungen.json', exportSettings({ settings: store.settings, games: store.games, calibration: store.calibration, profiles: store.profiles, activeProfileId: store.activeProfileId }), 'application/json')}>
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
                    return { ...st, settings: r.settings, games: r.games, calibration: r.calibration, profiles, activeProfileId: profiles.some((x) => x.id === r.activeProfileId) ? r.activeProfileId : st.activeProfileId };
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

function NachForm({ value: v, onChange, maxLevel, onResetLevel }: { value: NachSettings; onChange: (v: NachSettings) => void; maxLevel: number; onResetLevel: () => void }) {
  const set = (patch: Partial<NachSettings>) => onChange(normalizeNach({ ...v, ...patch }));
  const n = t.nachSet;
  return (
    <>
      <NumberField id="n-startlevel" label={n.startLevel} value={v.startLevel} min={1} max={12} onChange={(x) => set({ startLevel: x })} />
      <Toggle id="n-auto" label={n.autoLevel} checked={v.autoLevel} onChange={(x) => set({ autoLevel: x })} />
      <p class="bm-muted" id="n-maxlevel">
        {t.nach.maxLevelTitle}: <strong>{t.nach.maxLevelValue(maxLevel)}</strong>
      </p>
      <button class="bm-btn" id="n-maxlevel-reset" onClick={onResetLevel}>
        {t.nach.maxLevelReset}
      </button>
      <p class="bm-muted">{n.levelHint}</p>
      <NumberField id="n-width" label={n.pathWidth} value={v.pathWidth} min={8} max={40} onChange={(x) => set({ pathWidth: x })} />
      <NumberField id="n-points" label={n.curvePoints} value={v.curvePoints} min={4} max={10} onChange={(x) => set({ curvePoints: x })} />
      <NumberField id="n-spread" label={n.curveSpread} value={v.curveSpread} min={20} max={100} step={5} onChange={(x) => set({ curveSpread: x })} />
      <NumberField id="n-interval" label={n.intervalS} value={v.intervalS} min={0.5} max={6} step={0.1} onChange={(x) => set({ intervalS: x })} />
      <NumberField id="n-distance" label={n.distancePx} value={v.distancePx} min={40} max={400} step={10} onChange={(x) => set({ distancePx: x })} />
      <Toggle id="n-only" label={n.onlyDistance} checked={v.onlyDistance} onChange={(x) => set({ onlyDistance: x })} />
      <Choice name="n-mode" label={n.changeMode} value={v.changeMode} options={(['HARD', 'FADE'] as const).map((m) => ({ value: m, label: n.modes[m] }))} onChange={(x) => set({ changeMode: x })} />
      <NumberField id="n-fade" label={n.fadeS} value={v.fadeS} min={0.2} max={3} step={0.1} onChange={(x) => set({ fadeS: x })} />
      <NumberField id="n-errdist" label={n.errorDist} value={v.errorDist} min={16} max={80} onChange={(x) => set({ errorDist: x })} />
      <NumberField id="n-errlimit" label={n.errorLimit} value={v.errorLimit} min={0} max={20} onChange={(x) => set({ errorLimit: x })} />
      <p class="bm-muted">{n.hint}</p>
      <button class="bm-btn" id="n-defaults" onClick={() => onChange(defaultGameSettings().nachzeichnen)}>
        {t.gameDefaults}
      </button>
    </>
  );
}

function PongForm({ value: v, onChange }: { value: PongSettings; onChange: (v: PongSettings) => void }) {
  const set = (patch: Partial<PongSettings>) => onChange(normalizePong({ ...v, ...patch }));
  const n = t.pongSet;
  return (
    <>
      <NumberField id="p-ball" label={n.ballRadius} value={v.ballRadius} min={12} max={40} onChange={(x) => set({ ballRadius: x })} />
      <NumberField id="p-speed" label={n.startSpeed} value={v.startSpeed} min={300} max={900} step={10} onChange={(x) => set({ startSpeed: x })} />
      <NumberField id="p-paddle" label={n.paddleWidth} value={v.paddleWidth} min={80} max={260} step={5} onChange={(x) => set({ paddleWidth: x })} />
      <NumberField id="p-opp" label={n.opponent} value={v.opponent} min={1} max={5} onChange={(x) => set({ opponent: x })} />
      <Choice
        name="p-flight"
        label={n.flightChange}
        value={v.flightChange ? v.flightFreq : 'OFF'}
        options={(['OFF', 'rare', 'normal', 'often'] as const).map((k) => ({ value: k, label: n.flightFreq[k] }))}
        onChange={(x) => set(x === 'OFF' ? { flightChange: false } : { flightChange: true, flightFreq: x })}
      />
      <Toggle id="p-two" label={n.twoPlayer} checked={v.twoPlayer} onChange={(x) => set({ twoPlayer: x })} />
      <NumberField id="p-gain" label={n.gain} value={v.gain} min={0.5} max={3} step={0.1} onChange={(x) => set({ gain: x })} />
      <NumberField id="p-target" label={n.targetScore} value={v.targetScore} min={1} max={21} onChange={(x) => set({ targetScore: x })} />
      <p class="bm-muted">{n.hint}</p>
      <button class="bm-btn" id="p-defaults" onClick={() => onChange(defaultGameSettings().pong)}>
        {t.gameDefaults}
      </button>
    </>
  );
}
