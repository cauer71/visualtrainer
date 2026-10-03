import type { ExerciseTexts } from '../../core/types';
import { MOTION_NOTE_DE, MOTION_NOTE_IT, SAFETY_SEATED_DE, SAFETY_SEATED_IT, safetyList, TILT_NOTE_DE, TILT_NOTE_IT } from '../_shared/labor-sicherheit';

// Texte für Blickfit geschrieben (du-Form, einfache Sprache, Fachwörter erklärt).
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, keine Messung des Gleichgewichts, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// `short` in params: Vorlage für die Kurzfassung der Einstellungen auf der Ergebnisseite (nur Zahlen; {v} = Wert).
// Die Schlüssel tilt* gehören zum Startbildschirm „Gerät kippen“ (_shared/labor-steuerung-ui.ts).

export const de: ExerciseTexts = {
  title: 'Slalom',
  tagline: 'Steuere die Kugel seitlich durch die Tore, die von oben kommen.',
  steps: [
    'Wähle die Steuerung: Finger, Pfeiltasten oder Gerät kippen.',
    'Fahre die Kugel durch die Lücke jedes Tores.',
    'Am besten im Sitzen; im Stehen Halt in Reichweite.',
  ],
  why:
    'Hier steuerst du eine Kugel durch Tore, die von oben nach unten laufen. Das verlangt Vorausschau, das Abschätzen der Lücke und rechtzeitig dosierte Bewegungen. Die App nutzt nur Eingaben, die ein Browser liefern kann – Finger, Tasten oder das Kippen des Geräts –, und liest keine Balance-Plattform aus. Ob sich das Üben auf Alltag, Sport oder Verkehr überträgt, ist nicht belegt.',
  goodFor: ['Vorausschau', 'Steuern', 'Tore'],
  captions: {
    watch: 'Tore laufen von oben herab',
    steer: 'Fahre die Kugel durch die Lücke',
    touch: 'Stange berührt? Das zählt als Fehler',
    count: 'Gezählt: Tore und Fehler',
  },
  metrics: {
    passed: 'Tore durchfahren',
    hits: 'Stangen berührt',
    accuracy: 'Trefferquote',
    streak: 'Längste Serie ohne Fehler',
    center_dev: 'Abweichung von der Mitte der Lücke',
    gap_used: 'Torlücke (benutzt)',
    spacing_used: 'Abstand der Tore (benutzt)',
  },
  metricHints: {
    passed: 'Anzahl der Tore, durch deren Lücke die Kugel gefahren ist.',
    hits: 'Wie oft die Kugel eine Stange berührt hat (je Tor höchstens einmal gezählt).',
    accuracy: 'Anteil der durchfahrenen an allen gewerteten Toren.',
    streak: 'Längste Serie hintereinander durchfahrener Tore ohne Fehler.',
    center_dev: 'Mittlerer seitlicher Abstand der Kugel von der Mitte der Lücke beim Durchfahren, nur für geschaffte Tore, in Zentimetern auf dem kalibrierten Bildschirm. Kleiner heißt sauberer gefahren.',
    gap_used: 'Die Torlücke, die wirklich benutzt wurde. Auf kleinen Bildschirmen ist sie höchstens 80 % der Breite; dann weicht sie von deiner Einstellung ab.',
    spacing_used: 'Der Abstand der Tore, der wirklich benutzt wurde. Auf kleinen Bildschirmen ist er höchstens 60 % der Höhe; dann weicht er von deiner Einstellung ab.',
  },
  tips: {
    few: 'Diesmal ist die Kugel durch kein Tor gekommen. Probiere eine weite Lücke (16 bis 20 cm), langsame Geschwindigkeit und keine Beschleunigung.',
    easier: 'Du berührst oft die Stangen. Mach es dir leichter: weitere Lücke oder langsamere Tore – und ändere immer nur eine Einstellung.',
    harder: 'Du schaffst fast alle Tore. Wenn du magst, mach genau eine Einstellung schwerer, zum Beispiel eine engere Lücke oder etwas mehr Tempo.',
    center: 'Du fährst oft nah an den Stangen vorbei. Beginne kleine Bewegungen früher und versuche, durch die Mitte der Lücke zu fahren.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen, die dieselben Einstellungen hatten – auf diesem Gerät und mit derselben Steuerung.',
  },
  feedback: {
    hud: '✓ {n} · ✗ {m}',
    moreTitle: 'Weitere Werte',
    moreNote: 'Längen sind in Zentimetern auf dem kalibrierten Bildschirm angegeben. Vergleiche nur mit deinen eigenen Werten mit derselben Steuerung auf diesem Gerät.',
    tiltTitle: 'Gerät kippen',
    tiltBody: 'Halte das Gerät mit beiden Händen fest. Nach dem Tippen fragt der Browser vielleicht nach der Erlaubnis. Danach hältst du das Gerät ruhig: Diese Haltung ist die Mitte. Nach links oder rechts kippen lenkt die Kugel.',
    tiltEnable: 'Kippen einschalten',
    tiltPointer: 'Stattdessen mit dem Finger steuern',
    tiltAsking: 'Warte auf die Erlaubnis …',
    tiltWaiting: 'Warte auf den Sensor …',
    tiltHold: 'Halte das Gerät in deiner Mitte-Haltung … {n}',
    tiltFallback: 'Kippen geht hier nicht – du steuerst jetzt mit dem Finger oder den Pfeiltasten.',
  },
  progression: [
    'Leichter: weite Lücke (16 bis 20 cm), langsame Geschwindigkeit (6 bis 10 cm/s), keine Beschleunigung, Steuerung mit dem Finger.',
    'Schwerer: enge Lücke (6 bis 8 cm), höhere Geschwindigkeit (20 bis 30 cm/s), 40 bis 80 Prozent Beschleunigung pro Minute, kleiner Abstand zwischen den Toren.',
    'Mit Pfeiltasten oder Kippen ist es schwerer als mit dem Finger, weil die Kugel nicht augenblicklich folgt.',
    'Unsere Faustregel (keine Vorgabe aus der Forschung): Schaffst du in drei Durchläufen hintereinander über 90 % der Tore, mach genau eine Einstellung schwerer; unter 60 % mach sie leichter. Ändere immer nur eine Einstellung auf einmal.',
  ],
  cautions: [
    ...safetyList(SAFETY_SEATED_DE),
    TILT_NOTE_DE,
    MOTION_NOTE_DE,
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“), damit Torlücke und Abstände in Zentimetern stimmen.',
    'Die App liest keine Balance-Plattform aus. Wer eine nutzt, kann nur ein Eingabegerät anschließen, das Tastendrücke sendet; die App sieht davon nur die Tasten (Pfeil links/rechts oder A und D).',
    'Berührst du eine Stange, zeigt die App ein ruhiges ✗, keinen Blitz.',
  ],
  params: {
    durationS: {
      label: 'Dauer',
      hint: 'Wie lange der Durchlauf dauert. Kurze Durchläufe zum Ausprobieren, dazwischen Pausen.',
    },
    gapCm: {
      label: 'Weite der Torlücke',
      hint: 'Weite der Lücke zwischen den Stangen eines Tores in Zentimetern. Enge Lücken verlangen genaueres Steuern. Auf kleinen Bildschirmen ist sie höchstens 80 % der Breite.',
      short: '{v} cm Lücke',
    },
    speedCmS: {
      label: 'Anfangsgeschwindigkeit (cm/s)',
      hint: 'Mit welcher Geschwindigkeit die Tore herabkommen, in Zentimetern pro Sekunde.',
      short: '{v} cm/s',
    },
    speedUpPct: {
      label: 'Beschleunigung (% pro Minute)',
      hint: 'Um wie viel Prozent die Geschwindigkeit pro Minute zunimmt. 0 hält sie gleich.',
    },
    spacingCm: {
      label: 'Abstand zwischen den Toren',
      hint: 'Abstand zwischen zwei aufeinanderfolgenden Toren in Zentimetern. Kleinere Abstände lassen weniger Zeit zum Umsteuern. Auf kleinen Bildschirmen ist er höchstens 60 % der Höhe.',
    },
    control: {
      label: 'Steuerung',
      hint: '„Finger“: Die Kugel folgt der waagerechten Position von Finger oder Maus. „Pfeiltasten“: links und rechts (auch A und D). „Gerät kippen“: Neigung nach links und rechts, nur mit passendem Gerät; du schaltest es selbst ein.',
      options: { pointer: 'Finger/Maus', keys: 'Pfeiltasten', tilt: 'Gerät kippen' },
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Slalom',
  tagline: 'Guida la pallina di lato attraverso i cancelli che arrivano dall’alto.',
  steps: [
    'Scegli: dito, tasti freccia o inclinare il dispositivo.',
    'Guida la pallina attraverso il varco di ogni cancello.',
    'Meglio da seduto; in piedi con appoggio a portata.',
  ],
  why:
    'Qui guidi una pallina attraverso cancelli che scendono dall’alto. Serve guardare avanti, valutare il varco e dosare i movimenti al momento giusto. L’app usa solo input che un browser può fornire – dito, tasti o l’inclinazione del dispositivo – e non legge nessuna pedana di equilibrio. Non è dimostrato che l’allenamento si trasferisca alla vita quotidiana, allo sport o al traffico.',
  goodFor: ['Guardare avanti', 'Guidare', 'Cancelli'],
  captions: {
    watch: 'I cancelli scendono dall’alto',
    steer: 'Guida la pallina nel varco',
    touch: 'Palo toccato? Conta come errore',
    count: 'Si contano cancelli ed errori',
  },
  metrics: {
    passed: 'Cancelli superati',
    hits: 'Pali toccati',
    accuracy: 'Percentuale di colpi',
    streak: 'Serie più lunga senza errori',
    center_dev: 'Scarto dal centro del varco',
    gap_used: 'Varco (usato)',
    spacing_used: 'Distanza dei cancelli (usata)',
  },
  metricHints: {
    passed: 'Numero di cancelli attraverso il cui varco è passata la pallina.',
    hits: 'Quante volte la pallina ha toccato un palo (per ogni cancello contato al massimo una volta).',
    accuracy: 'Quota dei cancelli superati su tutti quelli valutati.',
    streak: 'Serie più lunga di cancelli superati di seguito senza errori.',
    center_dev: 'Distanza laterale media della pallina dal centro del varco nel passaggio, solo per i cancelli riusciti, in centimetri sullo schermo calibrato. Più piccola significa guida più pulita.',
    gap_used: 'Il varco usato davvero. Sugli schermi piccoli è al massimo l’80 % della larghezza; allora si discosta dalla tua impostazione.',
    spacing_used: 'La distanza dei cancelli usata davvero. Sugli schermi piccoli è al massimo il 60 % dell’altezza; allora si discosta dalla tua impostazione.',
  },
  tips: {
    few: 'Stavolta la pallina non è passata da nessun cancello. Prova un varco largo (da 16 a 20 cm), velocità bassa e nessuna accelerazione.',
    easier: 'Tocchi spesso i pali. Rendilo più facile: varco più largo o cancelli più lenti – e cambia sempre una sola impostazione.',
    harder: 'Superi quasi tutti i cancelli. Se vuoi, rendi più difficile una sola impostazione, per esempio un varco più stretto o un po’ più di velocità.',
    center: 'Passi spesso vicino ai pali. Inizia i piccoli movimenti prima e prova a passare per il centro del varco.',
    compare: 'Confronta questo giro solo con giri che avevano le stesse impostazioni – su questo dispositivo e con lo stesso controllo.',
  },
  feedback: {
    hud: '✓ {n} · ✗ {m}',
    moreTitle: 'Altri valori',
    moreNote: 'Le lunghezze sono in centimetri sullo schermo calibrato. Confrontale solo con i tuoi valori con lo stesso controllo su questo dispositivo.',
    tiltTitle: 'Inclinare il dispositivo',
    tiltBody: 'Tieni il dispositivo saldamente con due mani. Dopo il tocco il browser potrebbe chiedere il permesso. Poi tieni il dispositivo fermo: questa posizione è il centro. Inclinando a sinistra o a destra guidi la pallina.',
    tiltEnable: 'Attiva inclinazione',
    tiltPointer: 'Guida invece con il dito',
    tiltAsking: 'In attesa del permesso …',
    tiltWaiting: 'In attesa del sensore …',
    tiltHold: 'Tieni il dispositivo nella posizione centrale … {n}',
    tiltFallback: 'Qui l’inclinazione non funziona – ora guidi con il dito o con i tasti freccia.',
  },
  progression: [
    'Più facile: varco largo (da 16 a 20 cm), velocità bassa (da 6 a 10 cm/s), nessuna accelerazione, controllo con il dito.',
    'Più difficile: varco stretto (da 6 a 8 cm), velocità più alta (da 20 a 30 cm/s), dal 40 all’80 per cento di accelerazione al minuto, piccola distanza tra i cancelli.',
    'Con i tasti freccia o l’inclinazione è più difficile che con il dito, perché la pallina non segue all’istante.',
    'La nostra regola pratica (non è un’indicazione della ricerca): se in tre giri di seguito superi oltre il 90 % dei cancelli, rendi più difficile una sola impostazione; sotto il 60 % rendila più facile. Cambia sempre una sola impostazione alla volta.',
  ],
  cautions: [
    ...safetyList(SAFETY_SEATED_IT),
    TILT_NOTE_IT,
    MOTION_NOTE_IT,
    'Calibra lo schermo una volta («Calibra lo schermo»), così varco e distanze in centimetri sono corretti.',
    'L’app non legge nessuna pedana di equilibrio. Chi ne usa una può solo collegare un dispositivo di input che invia pressioni di tasti; l’app ne vede solo i tasti (freccia sinistra/destra oppure A e D).',
    'Se tocchi un palo, l’app mostra una ✗ sobria, nessun lampo.',
  ],
  params: {
    durationS: {
      label: 'Durata',
      hint: 'Quanto dura il giro. Giri brevi per provare, con pause in mezzo.',
    },
    gapCm: {
      label: 'Larghezza del varco',
      hint: 'Larghezza del varco tra i pali di un cancello in centimetri. I varchi stretti richiedono una guida più precisa. Sugli schermi piccoli è al massimo l’80 % della larghezza.',
      short: 'varco {v} cm',
    },
    speedCmS: {
      label: 'Velocità iniziale (cm/s)',
      hint: 'Con quale velocità scendono i cancelli, in centimetri al secondo.',
      short: '{v} cm/s',
    },
    speedUpPct: {
      label: 'Accelerazione (% al minuto)',
      hint: 'Di quanto per cento aumenta la velocità ogni minuto. 0 la mantiene uguale.',
    },
    spacingCm: {
      label: 'Distanza tra i cancelli',
      hint: 'Distanza tra due cancelli consecutivi in centimetri. Distanze minori lasciano meno tempo per correggere. Sugli schermi piccoli è al massimo il 60 % dell’altezza.',
    },
    control: {
      label: 'Controllo',
      hint: '«Dito»: la pallina segue la posizione orizzontale di dito o mouse. «Tasti freccia»: sinistra e destra (anche A e D). «Inclinare il dispositivo»: inclinazione a sinistra e a destra, solo con un dispositivo adatto; lo attivi tu.',
      options: { pointer: 'Dito/mouse', keys: 'Tasti freccia', tilt: 'Inclinare il dispositivo' },
    },
  },
};
