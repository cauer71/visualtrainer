import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Aussagen über Zittern oder Gesundheit.

export const de: ExerciseTexts = {
  title: 'Kurvenbahn folgen',
  tagline: 'Folge dem Ziel auf seiner weichen Kurvenbahn – ohne Halt.',
  steps: [
    'Leg den Finger unter die Marke.',
    'Folge dem Ziel – die gestrichelte Linie zeigt den Weg.',
    'Bei Händezittern oder Beschwerden: lieber pausieren.',
  ],
  why:
    'Wenn du mit dem Finger einer gleitenden Bewegung folgst, die in weichen Kurven kreuz und quer läuft, schaust du voraus und führst die Hand mit. Das übst du hier: Das Ziel läuft ohne Halt und ohne Knick, ein Stück der Bahn voraus ist gestrichelt zu sehen. Mit deinem Erfolg wird es schneller und die Bahn verschlungener. Die Marke sitzt über deinem Finger, damit die Hand nichts verdeckt. Ob sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Gleitend nachführen', 'Kurven nachfahren', 'Mit der Hand vorausplanen'],
  captions: {
    touch: 'Leg den Finger unter die Marke',
    follow: 'Folge dem Ziel auf seiner Bahn',
    band: 'Die Linie zeigt den Weg voraus',
    goal: 'Geschafft – Ring gehalten',
  },
  metrics: {
    level: 'Deine Stufe',
    inBand: 'Zeit im Ring',
    deviation: 'Ø Abstand zum Ziel (in % des Rings)',
    passed: 'Gelungene Durchgänge',
  },
  tips: {
    ahead: 'Nutze die gestrichelte Linie: Sie zeigt, wohin das Ziel gleich läuft. Beweg die Hand schon dorthin, statt hinterherzulaufen.',
    calm: 'Fließende Bewegungen klappen besser als Ruckeln. Lass die Hand die Kurve mitmalen.',
    great: 'Stark geflossen! Bleib locker – dann klappt es auch bei mehr Tempo.',
  },
  feedback: {
    level: 'Stufe',
    inBand: 'im Ring',
    start: 'Leg den Finger unter die Marke',
  },
};

export const it: ExerciseTexts = {
  title: 'Segui la curva',
  tagline: 'Segui il bersaglio sul suo percorso a curve morbide – senza fermarti.',
  steps: [
    'Appoggia il dito sotto il segno.',
    'Segui il bersaglio – la linea tratteggiata mostra la strada.',
    'Con tremore alle mani o disturbi: meglio una pausa.',
  ],
  why:
    'Quando con il dito segui un movimento che scivola in curve morbide da una parte all’altra, guardi avanti e guidi la mano in anticipo. Qui lo eserciti: il bersaglio corre senza fermarsi e senza spigoli, un pezzo del percorso davanti a lui è tratteggiato. Con il tuo successo diventa più veloce e il percorso più intrecciato. Il segno sta sopra il dito, così la mano non copre nulla. Non è dimostrato che questo si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Seguire in modo fluido', 'Ripassare le curve', 'Pianificare con la mano'],
  captions: {
    touch: 'Appoggia il dito sotto il segno',
    follow: 'Segui il bersaglio sul suo percorso',
    band: 'La linea mostra la strada davanti',
    goal: 'Fatto – anello mantenuto',
  },
  metrics: {
    level: 'Il tuo livello',
    inBand: 'Tempo nell’anello',
    deviation: 'Ø distanza dal bersaglio (in % dell’anello)',
    passed: 'Turni riusciti',
  },
  tips: {
    ahead: 'Usa la linea tratteggiata: mostra dove sta per andare il bersaglio. Porta la mano già lì, invece di rincorrere.',
    calm: 'I movimenti fluidi vanno meglio degli scatti. Lascia che la mano disegni la curva insieme al bersaglio.',
    great: 'Ottimo, fluido! Resta rilassato – così ce la fai anche a velocità più alte.',
  },
  feedback: {
    level: 'Livello',
    inBand: 'nell’anello',
    start: 'Appoggia il dito sotto il segno',
  },
};
