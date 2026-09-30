import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Vergleiche mit anderen. Es ist eine Tipp-Übung am Bildschirm, kein Reaktionstest.

export const de: ExerciseTexts = {
  title: 'Raster-Ausweichen',
  tagline: 'Wechsle rechtzeitig auf ein freies Feld – bevor die schraffierten belegt sind.',
  steps: [
    'Schraffierte Felder werden gleich belegt – auch deins.',
    'Tippe schnell ein freies Feld an, bevor die Zeit abläuft.',
    'Danach siehst du Treffer und Zeit.',
  ],
  why:
    'Bei dieser Übung tippst du mit dem Finger auf Felder am Bildschirm, statt dich zu bewegen. Du schaust kurz, welche Felder markiert sind, entscheidest dich für ein freies und tippst es an, bevor die Zeit abläuft. Es ist kein Reaktionstest: Schneller als nötig bringt keine Punkte, und die gemessene Zeit enthält auch die Verzögerung des Touchscreens. Verglichen wird nur mit dir selbst auf diesem Gerät. Die Übung ersetzt weder Brille noch Augenuntersuchung. Ob sie im Alltag oder im Sport hilft, ist nicht belegt.',
  goodFor: ['Schnell entscheiden', 'Überblick behalten', 'Freie Stelle finden'],
  captions: {
    watch: 'Schraffierte Felder werden belegt',
    tap: 'Tippe ein freies Feld an',
    check: 'Jetzt sind sie belegt',
  },
  metrics: {
    level: 'Stufe',
    accuracy: 'Trefferquote',
    medianTime: 'Mittlere Zeit bis zum Tipp',
    maxLevel: 'Höchste Stufe',
  },
  tips: {
    late: 'Du warst öfter zu spät. Such dir zuerst ein freies Feld und tippe es dann gleich an.',
    look: 'Du hast öfter ein schraffiertes Feld erwischt. Schau kurz auf die Schraffur, bevor du tippst.',
    great: 'Sicher gelandet! Beim nächsten Mal wird die Zeit etwas knapper.',
  },
  feedback: {
    level: 'Stufe',
    occupied: 'besetzt',
    late: 'zu spät',
    you: 'Du',
  },
};

export const it: ExerciseTexts = {
  title: 'Schiva la griglia',
  tagline: 'Passa in tempo a un riquadro libero prima che quelli segnati si occupino.',
  steps: [
    'I riquadri tratteggiati si occupano – anche il tuo.',
    'Tocca in fretta un riquadro libero, prima che scada il tempo.',
    'Poi vedi il risultato e il tempo impiegato.',
  ],
  why:
    'In questo esercizio tocchi con il dito dei riquadri sullo schermo, invece di muoverti. Guardi un attimo quali riquadri sono segnati, scegli uno libero e lo tocchi prima che scada il tempo. Non è un test di reazione: essere più veloci del necessario non dà punti, e il tempo misurato include anche il ritardo dello schermo tattile. Si confronta solo con te stesso su questo dispositivo. L’esercizio non sostituisce né gli occhiali né una visita oculistica. Che aiuti nella vita quotidiana o nello sport non è dimostrato.',
  goodFor: ['Decidere in fretta', 'Mantenere il colpo d’occhio', 'Trovare un posto libero'],
  captions: {
    watch: 'I riquadri tratteggiati si occupano',
    tap: 'Tocca un riquadro libero',
    check: 'Ora sono occupati',
  },
  metrics: {
    level: 'Livello',
    accuracy: 'Percentuale di centri',
    medianTime: 'Tempo medio fino al tocco',
    maxLevel: 'Livello massimo',
  },
  tips: {
    late: 'Sei stato spesso in ritardo. Cerca prima un riquadro libero e toccalo subito.',
    look: 'Hai toccato spesso un riquadro tratteggiato. Guarda un attimo il tratteggio prima di toccare.',
    great: 'Atterrato al sicuro! La prossima volta il tempo sarà un po’ più stretto.',
  },
  feedback: {
    level: 'Livello',
    occupied: 'occupato',
    late: 'troppo tardi',
    you: 'Tu',
  },
};
