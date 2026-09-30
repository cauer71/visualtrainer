import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Sekunden-Gefühl',
  tagline: 'Spür, wann die Zeit um ist – ganz ohne Uhr.',
  steps: ['Du siehst eine Zielzeit, z. B. 3,0 s.', 'Nach „Los“ läuft die Zeit – ganz ohne Uhr.', 'Tippe, wenn du glaubst: Jetzt ist sie um.'],
  why:
    'Ein Gefühl für Sekunden brauchst du beim Warten, beim Abschätzen von Wegen oder beim Timing im Sport. Hier tippst du, wenn du glaubst, dass die genannte Zeit um ist, und siehst sofort in Millisekunden, wie nah du dran warst. Ob sich das Üben am Bildschirm auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Timing & Rhythmus', 'Geduldig abwarten', 'Zeit einschätzen'],
  captions: {
    remember: 'Merke dir die Zielzeit',
    tap: 'Tippe, wenn du die Zeit um glaubst',
    result: 'So nah warst du dran',
  },
  metrics: {
    meanDev: 'Ø Abweichung',
    bias: 'Tendenz (− früh / + spät)',
    hits: 'Im Rahmen',
    level: 'Stufe',
  },
  tips: {
    early: 'Du tippst meist etwas zu früh. Lass der Zeit beim nächsten Mal einen Atemzug mehr.',
    late: 'Du tippst meist etwas zu spät – tippe beim nächsten Mal einen Tick früher. Übrigens: Viele Touchscreens melden Tipps leicht verzögert. Vergleiche dich darum nur mit dir selbst auf diesem Gerät.',
    long: 'Bei den langen Zeiten schwankst du stärker. Teile sie im Kopf in kleine Abschnitte, zum Beispiel in gleichmäßige Takte.',
    great: 'Dein Zeitgefühl liegt nah an den Zielzeiten. Bleib gelassen – dann klappt es auch bei knapperen Vorgaben.',
  },
  feedback: {
    round: 'Durchgang',
    target: 'Zielzeit',
    goal: 'Ziel',
    yours: 'Deine Zeit',
    go: 'Los',
    wait: 'Gleich geht’s los',
    early: 'Zu früh',
    late: 'Zu spät',
    exact: 'Sehr genau!',
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Senso del tempo',
  tagline: 'Senti quando il tempo è scaduto – senza orologio.',
  steps: ['Vedi un tempo da raggiungere, per es. 3,0 s.', 'Dopo “Via” il tempo scorre – senza orologio.', 'Tocca quando pensi: adesso è passato.'],
  why:
    'Il senso dei secondi serve quando aspetti, quando stimi un percorso o nel tempismo sportivo. Qui tocchi quando pensi che il tempo indicato sia passato e vedi subito in millisecondi quanto ci sei andato vicino. Non è dimostrato che allenarsi allo schermo si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Tempismo e ritmo', 'Aspettare con pazienza', 'Stimare il tempo'],
  captions: {
    remember: 'Ricorda il tempo da raggiungere',
    tap: 'Tocca quando pensi che sia passato',
    result: 'Ecco quanto ci sei andato vicino',
  },
  metrics: {
    meanDev: 'Scostamento medio',
    bias: 'Tendenza (− presto / + tardi)',
    hits: 'Nel margine',
    level: 'Livello',
  },
  tips: {
    early: 'Di solito tocchi un po’ troppo presto. La prossima volta concedi al tempo un respiro in più.',
    late: 'Di solito tocchi un po’ troppo tardi – la prossima volta tocca un attimo prima. Tra l’altro: molti touchscreen segnalano i tocchi con un lieve ritardo. Confrontati quindi solo con te stesso su questo dispositivo.',
    long: 'Con i tempi lunghi oscilli di più. Dividili mentalmente in piccole parti, per esempio in battiti regolari.',
    great: 'Il tuo senso del tempo è vicino ai tempi indicati. Resta rilassato – così funziona anche con margini più stretti.',
  },
  feedback: {
    round: 'Turno',
    target: 'Tempo da raggiungere',
    goal: 'Meta',
    yours: 'Il tuo tempo',
    go: 'Via',
    wait: 'Si parte subito',
    early: 'Troppo presto',
    late: 'Troppo tardi',
    exact: 'Precisissimo!',
    level: 'Livello',
  },
};
