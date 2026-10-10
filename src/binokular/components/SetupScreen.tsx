/** Vor dem Spiel: amblyopes Auge, Farbprofil (Brille + Bildschirm, mit Farbmustern) und Zuordnung der Gläser */
import { findProfile, type ColorProfile } from '../calibration/profiles';
import type { Settings } from '../data/settings';
import { t } from '../texts';
import { colorKind, filterOf, fullColorOf, otherEye, secondFilter } from '../vision/color';
import { Choice, de, Screen } from './common';
import { ProfilePicker } from './ProfilePicker';

type Props = {
  settings: Settings;
  profiles: readonly ColorProfile[];
  activeProfileId: string;
  onProfile: (id: string) => void;
  onSettings: (p: Partial<Settings>) => void;
  onPlay: () => void;
  onBack: () => void;
};

export function SetupScreen({ settings, profiles, activeProfileId, onProfile, onSettings, onPlay, onBack }: Props) {
  const profile = findProfile(profiles, activeProfileId);
  const lens = { glasses: profile.mode, leftLens: settings.leftLens };
  const otherName = t.filterName[secondFilter(profile.mode)];
  const amb = settings.amblyopicEye;
  const fel = otherEye(amb);
  const eyeName = (e: 'LEFT' | 'RIGHT') => (e === 'LEFT' ? t.left : t.right);
  const adj = (e: 'LEFT' | 'RIGHT') => t.colorAdj[colorKind(fullColorOf(filterOf(e, lens), profile))];
  return (
    <Screen title={t.setupTitle} onBack={onBack}>
      <section class="bm-card">
        <Choice
          name="amb-eye"
          label={t.setupAmblyopic}
          value={settings.amblyopicEye}
          options={[
            { value: 'LEFT', label: t.leftCap },
            { value: 'RIGHT', label: t.rightCap },
          ]}
          onChange={(v) => onSettings({ amblyopicEye: v })}
        />
        <ProfilePicker name="setup-profile" profiles={profiles} activeId={profile.id} onPick={onProfile} />
        <p class="bm-muted">{t.setupProfileHint}</p>
        <Choice
          name="lens"
          label={t.calMapping}
          value={settings.leftLens}
          options={[
            { value: 'RED', label: t.lensLeftRed(otherName) },
            { value: 'OTHER', label: t.lensLeftOther(otherName) },
          ]}
          onChange={(v) => onSettings({ leftLens: v })}
        />
        <p class="bm-summary" id="setup-summary">
          {t.setupSummary(eyeName(amb), adj(amb), eyeName(fel), adj(fel))}
        </p>
        <p class="bm-muted">{t.setupContrast(de(settings.amblyopicContrast), de(settings.fellowEyeContrast))}</p>
      </section>
      <div class="bm-actions">
        <button class="bm-btn bm-btn-primary" id="bm-play" onClick={onPlay}>
          {t.play}
        </button>
      </div>
    </Screen>
  );
}
