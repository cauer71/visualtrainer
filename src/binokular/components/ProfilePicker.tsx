/** Auswahl des Farbprofils mit Farbmustern (Hintergrund mit rotem Quadrat und Kreis in Zweitfarbe) */
import { profileHex, type ColorProfile } from '../calibration/profiles';
import { t } from '../texts';
import { rgbCss } from '../vision/color';

export function ProfileSwatch({ p }: { p: ColorProfile }) {
  const hex = profileHex(p);
  return (
    <span class="bm-pswatch" style={{ background: rgbCss(p.background) }} title={t.profileSwatches(hex.red, hex.second, hex.background)} aria-hidden="true">
      <span class="bm-pswatch-red" style={{ background: rgbCss(p.red) }} />
      <span class="bm-pswatch-second" style={{ background: rgbCss(p.second) }} />
    </span>
  );
}

export function ProfilePicker({ profiles, activeId, onPick, name, label = t.setupProfile }: { profiles: readonly ColorProfile[]; activeId: string; onPick: (id: string) => void; name: string; label?: string }) {
  return (
    <fieldset class="bm-choice bm-profiles" id={`${name}-list`}>
      <legend>{label}</legend>
      <div class="bm-choice-row">
        {profiles.map((p) => {
          const hex = profileHex(p);
          return (
            <label key={p.id} class={`bm-chip bm-profile${p.id === activeId ? ' is-on' : ''}`} data-profile={p.id}>
              <input type="radio" name={name} value={p.id} checked={p.id === activeId} onChange={() => onPick(p.id)} />
              <ProfileSwatch p={p} />
              <span class="bm-profile-text">
                <span class="bm-profile-name">{p.name}</span>
                <span class="bm-profile-hex">{t.profileSwatches(hex.red, hex.second, hex.background)}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
