import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Zielfang',
  tagline: 'Fang den flinken Punkt – Auge und Hand im Team.',
  steps: [
    'Ein Punkt flitzt über den Bildschirm.',
    'Tippe ihn an, bevor er verschwindet.',
    'Ziele ein Stück voraus – dorthin, wo er gleich ist.',
  ],
  why:
    'Beim Ballfangen oder wenn dir etwas herunterfällt, schätzen Auge und Hand gemeinsam ab, wo es gleich sein wird. Genau dieses Zusammenspiel übst du hier – je besser es klappt, desto flotter wird der Punkt. Ob sich das auf Sport oder Alltag überträgt, ist übrigens nicht belegt.',
  goodFor: ['Ball fangen', 'Tischtennis spielen', 'Fallendes auffangen'],
  captions: {
    tap: 'Tippe den Punkt an – er bleibt nicht stehen!',
    lead: 'Ziele ein bisschen voraus',
  },
  metrics: {
    points: 'Punkte',
    caught: 'Gefangen',
    accuracy: 'Treffsicherheit',
    level: 'Tempo',
  },
  tips: {
    lead: 'Du tippst oft hinter den Punkt. Ziele ein Stück voraus – dorthin, wo er gleich ist.',
    center: 'Du bist zu weit voraus – tippe direkt auf den Punkt.',
    quicker: 'Einige Punkte sind dir entwischt. Greif schneller zu – tippe, sobald du den Punkt siehst.',
    great: 'Stark! Auge und Hand arbeiten gut zusammen. Bleib locker – dann klappt es auch bei mehr Tempo.',
  },
  feedback: {
    escaped: 'Entwischt',
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Acchiappa il punto',
  tagline: 'Prendi al volo il punto veloce – occhio e mano in squadra.',
  steps: [
    'Un punto sfreccia sullo schermo.',
    'Toccalo prima che sparisca.',
    'Mira un po’ avanti – dove sarà tra un attimo.',
  ],
  why:
    'Quando prendi una palla o afferri qualcosa che cade, occhio e mano stimano insieme dove sarà tra un attimo. Qui alleni proprio questa intesa – più ti riesce, più il punto accelera. Non è dimostrato, però, che questo si trasferisca allo sport o alla vita di tutti i giorni.',
  goodFor: ['Prendere una palla', 'Giocare a ping-pong', 'Afferrare ciò che cade'],
  captions: {
    tap: 'Tocca il punto – non sta mai fermo!',
    lead: 'Mira un po’ più avanti',
  },
  metrics: {
    points: 'Punti',
    caught: 'Presi',
    accuracy: 'Precisione',
    level: 'Velocità',
  },
  tips: {
    lead: 'Tocchi spesso dietro al punto. Mira un po’ più avanti – dove sarà tra un attimo.',
    center: 'Sei troppo in anticipo – tocca direttamente il punto.',
    quicker: 'Qualche punto ti è scappato. Sii più rapido – tocca appena lo vedi.',
    great: 'Ottimo! Occhio e mano lavorano bene insieme. Resta rilassato – così ce la fai anche a velocità più alte.',
  },
  feedback: {
    escaped: 'Scappato!',
    level: 'Livello',
  },
};
