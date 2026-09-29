import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (docs/wissenschaft/01-…, 4.4 und 03-…, Anhang B): nur beschreiben, was man
// in der Übung tut; kein „räumliches Sehen / 3D / Tiefensehen“ – es geht ums Timing.

export const de: ExerciseTexts = {
  title: 'Punktlandung',
  tagline: 'Triff den richtigen Moment, wenn die Kugel ankommt.',
  steps: ['Eine Kugel fliegt auf dich zu.', 'Tippe genau dann, wenn sie den Ring erreicht.', 'Manchmal verschwindet sie vorher – tippe trotzdem!'],
  why:
    'Die Kugel kommt auf dich zu und wird dabei immer schneller größer – daran erkennt dein Auge, wann sie ankommt. Du übst, genau diesen Moment zu treffen, auch wenn sie kurz vorher verschwindet. Gefragt ist so etwas etwa beim Bremsen oder Fangen – ob sich das Üben am Bildschirm darauf überträgt, ist aber nicht belegt.',
  goodFor: ['Bremsen & Abstand halten', 'Überholen', 'Bälle fangen'],
  captions: {
    tap: 'Tippe, wenn die Kugel den Ring erreicht',
    hidden: 'Sie verschwindet? Trotzdem genau tippen!',
  },
  metrics: {
    points: 'Punkte',
    meanError: 'Ø Abweichung',
    bias: 'Tendenz (− früh / + spät)',
    perfect: 'Volltreffer',
    level: 'Erreichte Stufe',
  },
  tips: {
    early: 'Du tippst meist etwas zu früh. Lass dir einen Tick mehr Zeit – bis die Kugel wirklich am Ring ist.',
    late: 'Du tippst meist etwas zu spät – zum Schluss wird die Kugel immer schneller größer, tippe einen Tick früher. Übrigens: Viele Touchscreens melden Tipps leicht verzögert. Vergleich dich darum nur mit dir selbst am selben Gerät.',
    great: 'Starkes Timing! Du triffst den Moment sehr genau. Nächstes Mal wird es noch kniffliger.',
    watch: 'Achte darauf, wie die Kugel immer schneller größer wird – das verrät den Moment.',
  },
  feedback: {
    perfect: 'Punktlandung!',
    super: 'Super!',
    good: 'Gut',
    early: 'Zu früh',
    late: 'Zu spät',
    missed: 'Verpasst',
    wait: 'Warte auf die Kugel',
    earlyShort: 'früh',
    lateShort: 'spät',
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Tempismo perfetto',
  tagline: 'Cogli l’attimo esatto in cui arriva la palla.',
  steps: ['Una palla vola verso di te.', 'Tocca proprio quando raggiunge l’anello.', 'A volte sparisce prima – tocca lo stesso!'],
  why:
    'La palla viene verso di te e diventa grande sempre più in fretta – così l’occhio capisce quando arriverà. Qui ti eserciti a cogliere proprio quel momento, anche se sparisce poco prima. Serve per esempio quando freni o prendi una palla al volo – ma che allenarsi allo schermo aiuti anche lì, non è dimostrato.',
  goodFor: ['Frenare e tenere la distanza', 'Sorpassare', 'Prendere la palla'],
  captions: {
    tap: 'Tocca quando la palla raggiunge l’anello',
    hidden: 'Sparisce? Tocca comunque al momento giusto!',
  },
  metrics: {
    points: 'Punti',
    meanError: 'Scarto medio',
    bias: 'Tendenza (− presto / + tardi)',
    perfect: 'Centri',
    level: 'Livello raggiunto',
  },
  tips: {
    early: 'Di solito tocchi un po’ troppo presto. Aspetta un attimo in più – finché la palla è davvero sull’anello.',
    late: 'Di solito tocchi un po’ troppo tardi – alla fine la palla cresce sempre più in fretta, tocca un attimo prima. Tra l’altro: molti touchscreen registrano il tocco con un leggero ritardo. Confrontati quindi solo con te stesso, sullo stesso dispositivo.',
    great: 'Ottimo tempismo! Cogli il momento con grande precisione. La prossima volta sarà ancora più difficile.',
    watch: 'Osserva come la palla diventa grande sempre più in fretta – è questo che ti svela il momento giusto.',
  },
  feedback: {
    perfect: 'Perfetto!',
    super: 'Ottimo!',
    good: 'Bene',
    early: 'Troppo presto',
    late: 'Troppo tardi',
    missed: 'Mancato',
    wait: 'Aspetta la palla',
    earlyShort: 'presto',
    lateShort: 'tardi',
    level: 'Livello',
  },
};
