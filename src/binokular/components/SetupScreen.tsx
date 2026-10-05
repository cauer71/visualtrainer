/** Auswahl amblyopes Auge und Rot/Cyan- bzw. Rot/Grün-Konfiguration vor dem Spiel */
import type { Settings } from '../data/settings';
import { t } from '../texts';
import { filterOf, otherEye } from '../vision/color';
import { Choice, de, Screen } from './common';

export function SetupScreen({ settings, onSettings, onPlay, onBack }: { settings: Settings; onSettings: (p: Partial<Settings>) => void; onPlay: () => void; onBack: () => void }) {
  const otherName = settings.glasses === 'RED_CYAN' ? t.calColorCyan : t.calColorGreen;
  const amb = settings.amblyopicEye;
  const fel = otherEye(amb);
  const eyeName = (e: 'LEFT' | 'RIGHT') => (e === 'LEFT' ? t.left : t.right);
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
        <Choice
          name="glasses"
          label={t.calGlasses}
          value={settings.glasses}
          options={[
            { value: 'RED_CYAN', label: t.glassesRedCyan },
            { value: 'RED_GREEN', label: t.glassesRedGreen },
          ]}
          onChange={(v) => onSettings({ glasses: v })}
        />
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
          {t.setupSummary(eyeName(amb), t.colorAdj[filterOf(amb, settings)], eyeName(fel), t.colorAdj[filterOf(fel, settings)])}
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
