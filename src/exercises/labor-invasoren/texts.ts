import type { ExerciseTexts } from '../../core/types';
import { MOTION_NOTE_DE, MOTION_NOTE_IT, SAFETY_SEATED_DE, SAFETY_SEATED_IT, safetyList, TILT_NOTE_DE, TILT_NOTE_IT } from '../_shared/labor-sicherheit';

// Texte für Blickfit geschrieben (du-Form, einfache Sprache, Fachwörter erklärt).
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, keine Messung des Gleichgewichts, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// `short` in params: Vorlage für die Kurzfassung der Einstellungen auf der Ergebnisseite (nur Zahlen; {v} = Wert).
// Die Schlüssel tilt* gehören zum Startbildschirm „Gerät kippen“ (_shared/labor-steuerung-ui.ts).

export const de: ExerciseTexts = {
  title: 'Invasoren',
  tagline: 'Steuere den Zielpunkt unter fallende Raumschiffe und halte ihn dort.',
  steps: [
    'Wähle die Steuerung: Finger, Pfeiltasten oder Gerät kippen.',
    'Zielpunkt unter ein Schiff fahren, bis der Ring voll ist.',
    'Am besten im Sitzen; im Stehen Halt in Reichweite.',
  ],
  why:
    'Hier richtest du einen Zielpunkt auf bewegte Ziele aus und hältst die Ausrichtung ruhig, bis das Ziel getroffen ist. Die Haltezeit sorgt dafür, dass du nicht nur kurz vorbeifährst, sondern wirklich hältst. Die App nutzt nur Eingaben, die ein Browser liefern kann – Finger, Tasten oder das Kippen des Geräts –, und liest keine Balance-Plattform aus. Ob sich das Üben auf Alltag, Sport oder Verkehr überträgt, ist nicht belegt.',
  goodFor: ['Reaktion', 'Zielen', 'Halten'],
  captions: {
    watch: 'Raumschiffe fallen von oben',
    align: 'Fahre den Zielpunkt unter ein Schiff',
    hold: 'Halte ihn, bis der Ring voll ist',
    miss: 'Zu spät? Dann zählt es als verpasst',
  },
  metrics: {
    destroyed: 'Schiffe getroffen',
    missed: 'Schiffe verpasst',
    accuracy: 'Trefferquote',
    t_mean: 'Zeit bis zum Treffer (Mittel)',
    t_median: 'Zeit bis zum Treffer (Median)',
    tolerance_used: 'Toleranz (benutzt)',
  },
  metricHints: {
    destroyed: 'Anzahl der Schiffe, die du getroffen hast, indem du den Zielpunkt lange genug unter ihnen gehalten hast.',
    missed: 'Anzahl der Schiffe, die den unteren Rand erreicht haben.',
    accuracy: 'Anteil der getroffenen an allen gewerteten Schiffen (getroffene plus verpasste).',
    t_mean: 'Durchschnittliche Zeit vom Erscheinen eines Schiffes bis zu seinem Treffer. Kleiner heißt schneller und sauberer ausgerichtet.',
    t_median: 'Der mittlere Wert, wenn man alle Zeiten der Größe nach ordnet: Die Hälfte war schneller, die Hälfte langsamer. Einzelne Ausreißer ziehen ihn weniger als den Durchschnitt.',
    tolerance_used: 'Die seitliche Toleranz, die wirklich galt. Auf kleinen Bildschirmen ist sie höchstens ein Viertel der Breite; dann weicht sie von deiner Einstellung ab.',
  },
  tips: {
    few: 'Diesmal hast du kein Schiff getroffen. Probiere langsame Schiffe (4 bis 6 cm/s), eine kurze Haltezeit (200 bis 300 ms) und eine große Toleranz (3 bis 4 cm).',
    easier: 'Viele Schiffe sind durchgekommen. Mach es dir leichter: langsamere Schiffe, kürzere Haltezeit oder größere Toleranz – und ändere immer nur eine Einstellung.',
    harder: 'Du triffst fast alle Schiffe. Wenn du magst, mach genau eine Einstellung schwerer, zum Beispiel schnellere Schiffe oder eine längere Haltezeit.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen, die dieselben Einstellungen hatten – auf diesem Gerät und mit derselben Steuerung.',
  },
  feedback: {
    hud: '✓ {n} · ✗ {m}',
    moreTitle: 'Weitere Werte',
    moreNote: 'Längen sind in Zentimetern auf dem kalibrierten Bildschirm angegeben. Vergleiche nur mit deinen eigenen Werten mit derselben Steuerung auf diesem Gerät.',
    tiltTitle: 'Gerät kippen',
    tiltBody: 'Halte das Gerät mit beiden Händen fest. Nach dem Tippen fragt der Browser vielleicht nach der Erlaubnis. Danach hältst du das Gerät ruhig: Diese Haltung ist die Mitte. Nach links oder rechts kippen lenkt den Zielpunkt.',
    tiltEnable: 'Kippen einschalten',
    tiltPointer: 'Stattdessen mit dem Finger steuern',
    tiltAsking: 'Warte auf die Erlaubnis …',
    tiltWaiting: 'Warte auf den Sensor …',
    tiltHold: 'Halte das Gerät in deiner Mitte-Haltung … {n}',
    tiltFallback: 'Kippen geht hier nicht – du steuerst jetzt mit dem Finger oder den Pfeiltasten.',
  },
  progression: [
    'Leichter: langsame Schiffe (4 bis 6 cm/s), seltener neue Schiffe (3 bis 4 Sekunden), kurze Haltezeit (200 bis 300 ms), große Toleranz (3 bis 4 cm), Steuerung mit dem Finger.',
    'Schwerer: schnellere Schiffe (14 bis 20 cm/s), neue Schiffe alle 1 bis 1,5 Sekunden, längere Haltezeit (600 bis 1.000 ms), kleine Toleranz (1 cm).',
    'Mit Pfeiltasten oder Kippen ist es schwerer als mit dem Finger, weil der Zielpunkt nicht augenblicklich folgt.',
    'Unsere Faustregel (keine Vorgabe aus der Forschung): Triffst du in drei Durchläufen hintereinander über 90 % der Schiffe, mach genau eine Einstellung schwerer; unter 60 % mach sie leichter. Ändere immer nur eine Einstellung auf einmal.',
  ],
  cautions: [
    ...safetyList(SAFETY_SEATED_DE),
    TILT_NOTE_DE,
    MOTION_NOTE_DE,
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“), damit Toleranz und Fallgeschwindigkeit in Zentimetern stimmen.',
    'Schiffe im oberen Viertel kannst du noch nicht halten: Die Linie zeigt, ab wo es zählt. Wähle das tiefste Schiff zuerst.',
    'Die App liest keine Balance-Plattform aus. Wer eine nutzt, kann nur ein Eingabegerät anschließen, das Tastendrücke sendet; die App sieht davon nur die Tasten (Pfeil links/rechts oder A und D).',
  ],
  params: {
    durationS: {
      label: 'Dauer',
      hint: 'Wie lange der Durchlauf dauert. Kurze Durchläufe zum Ausprobieren, dazwischen Pausen.',
    },
    spawnMs: {
      label: 'Neues Schiff alle',
      hint: 'Alle wie viele Millisekunden ein neues Schiff erscheint. Kürzere Zeiten bringen mehr Schiffe gleichzeitig.',
    },
    fallCmS: {
      label: 'Fallgeschwindigkeit (cm/s)',
      hint: 'Wie schnell die Schiffe fallen, in Zentimetern pro Sekunde. Schnelle Schiffe lassen weniger Zeit zum Ausrichten und Halten.',
      short: '{v} cm/s',
    },
    dwellMs: {
      label: 'Haltezeit zum Treffen',
      hint: 'Wie lange du den Zielpunkt unter dem Schiff halten musst, bis es getroffen ist, in Millisekunden. Weichst du ab, baut sich der Fortschritt rasch wieder ab.',
      short: '{v} ms halten',
    },
    toleranceCm: {
      label: 'Toleranz seitlich',
      hint: 'Seitliche Toleranz in Zentimetern: Innerhalb dieses Abstands zählt der Zielpunkt als ausgerichtet. Auf kleinen Bildschirmen ist sie höchstens ein Viertel der Breite.',
    },
    control: {
      label: 'Steuerung',
      hint: '„Finger“: Der Zielpunkt folgt der waagerechten Position von Finger oder Maus. „Pfeiltasten“: links und rechts (auch A und D). „Gerät kippen“: Neigung nach links und rechts, nur mit passendem Gerät; du schaltest es selbst ein.',
      options: { pointer: 'Finger/Maus', keys: 'Pfeiltasten', tilt: 'Gerät kippen' },
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Invasori',
  tagline: 'Guida il puntatore sotto le astronavi che cadono e tienilo lì.',
  steps: [
    'Scegli: dito, tasti freccia o inclinare il dispositivo.',
    'Puntatore sotto un’astronave finché l’anello è pieno.',
    'Meglio da seduto; in piedi con appoggio a portata.',
  ],
  why:
    'Qui allinei un puntatore su bersagli in movimento e mantieni l’allineamento con calma finché il bersaglio è colpito. Il tempo di tenuta fa sì che tu non passi solo di sfuggita, ma tenga davvero. L’app usa solo input che un browser può fornire – dito, tasti o l’inclinazione del dispositivo – e non legge nessuna pedana di equilibrio. Non è dimostrato che l’allenamento si trasferisca alla vita quotidiana, allo sport o al traffico.',
  goodFor: ['Reazione', 'Mirare', 'Tenere'],
  captions: {
    watch: 'Le astronavi cadono dall’alto',
    align: 'Porta il puntatore sotto un’astronave',
    hold: 'Tienilo finché l’anello è pieno',
    miss: 'Troppo tardi? Conta come mancata',
  },
  metrics: {
    destroyed: 'Astronavi colpite',
    missed: 'Astronavi mancate',
    accuracy: 'Percentuale di colpi',
    t_mean: 'Tempo fino al colpo (media)',
    t_median: 'Tempo fino al colpo (mediana)',
    tolerance_used: 'Tolleranza (usata)',
  },
  metricHints: {
    destroyed: 'Numero di astronavi che hai colpito tenendo il puntatore sotto di esse abbastanza a lungo.',
    missed: 'Numero di astronavi che hanno raggiunto il bordo inferiore.',
    accuracy: 'Quota delle astronavi colpite su tutte quelle valutate (colpite più mancate).',
    t_mean: 'Tempo medio da quando compare un’astronave a quando viene colpita. Più piccolo significa allineata più in fretta e con più precisione.',
    t_median: 'Il valore centrale quando si ordinano tutti i tempi: metà erano più veloci, metà più lenti. I valori anomali lo influenzano meno della media.',
    tolerance_used: 'La tolleranza laterale che valeva davvero. Sugli schermi piccoli è al massimo un quarto della larghezza; allora si discosta dalla tua impostazione.',
  },
  tips: {
    few: 'Stavolta non hai colpito nessuna astronave. Prova astronavi lente (da 4 a 6 cm/s), un tempo di tenuta breve (da 200 a 300 ms) e una tolleranza grande (da 3 a 4 cm).',
    easier: 'Molte astronavi sono passate. Rendilo più facile: astronavi più lente, tempo di tenuta più breve o tolleranza più grande – e cambia sempre una sola impostazione.',
    harder: 'Colpisci quasi tutte le astronavi. Se vuoi, rendi più difficile una sola impostazione, per esempio astronavi più veloci o un tempo di tenuta più lungo.',
    compare: 'Confronta questo giro solo con giri che avevano le stesse impostazioni – su questo dispositivo e con lo stesso controllo.',
  },
  feedback: {
    hud: '✓ {n} · ✗ {m}',
    moreTitle: 'Altri valori',
    moreNote: 'Le lunghezze sono in centimetri sullo schermo calibrato. Confrontale solo con i tuoi valori con lo stesso controllo su questo dispositivo.',
    tiltTitle: 'Inclinare il dispositivo',
    tiltBody: 'Tieni il dispositivo saldamente con due mani. Dopo il tocco il browser potrebbe chiedere il permesso. Poi tieni il dispositivo fermo: questa posizione è il centro. Inclinando a sinistra o a destra guidi il puntatore.',
    tiltEnable: 'Attiva inclinazione',
    tiltPointer: 'Guida invece con il dito',
    tiltAsking: 'In attesa del permesso …',
    tiltWaiting: 'In attesa del sensore …',
    tiltHold: 'Tieni il dispositivo nella posizione centrale … {n}',
    tiltFallback: 'Qui l’inclinazione non funziona – ora guidi con il dito o con i tasti freccia.',
  },
  progression: [
    'Più facile: astronavi lente (da 4 a 6 cm/s), nuove astronavi più di rado (da 3 a 4 secondi), tempo di tenuta breve (da 200 a 300 ms), tolleranza grande (da 3 a 4 cm), controllo con il dito.',
    'Più difficile: astronavi più veloci (da 14 a 20 cm/s), nuova astronave ogni 1–1,5 secondi, tempo di tenuta più lungo (da 600 a 1.000 ms), tolleranza piccola (1 cm).',
    'Con i tasti freccia o l’inclinazione è più difficile che con il dito, perché il puntatore non segue all’istante.',
    'La nostra regola pratica (non è un’indicazione della ricerca): se in tre giri di seguito colpisci oltre il 90 % delle astronavi, rendi più difficile una sola impostazione; sotto il 60 % rendila più facile. Cambia sempre una sola impostazione alla volta.',
  ],
  cautions: [
    ...safetyList(SAFETY_SEATED_IT),
    TILT_NOTE_IT,
    MOTION_NOTE_IT,
    'Calibra lo schermo una volta («Calibra lo schermo»), così tolleranza e velocità di caduta in centimetri sono corrette.',
    'Le astronavi nel quarto superiore non si possono ancora tenere: la linea mostra da dove conta. Scegli prima l’astronave più in basso.',
    'L’app non legge nessuna pedana di equilibrio. Chi ne usa una può solo collegare un dispositivo di input che invia pressioni di tasti; l’app ne vede solo i tasti (freccia sinistra/destra oppure A e D).',
  ],
  params: {
    durationS: {
      label: 'Durata',
      hint: 'Quanto dura il giro. Giri brevi per provare, con pause in mezzo.',
    },
    spawnMs: {
      label: 'Nuova astronave ogni',
      hint: 'Ogni quanti millisecondi compare una nuova astronave. Tempi più brevi portano più astronavi contemporaneamente.',
    },
    fallCmS: {
      label: 'Velocità di caduta (cm/s)',
      hint: 'Quanto velocemente cadono le astronavi, in centimetri al secondo. Astronavi veloci lasciano meno tempo per allineare e tenere.',
      short: '{v} cm/s',
    },
    dwellMs: {
      label: 'Tempo di tenuta per colpire',
      hint: 'Per quanto tempo devi tenere il puntatore sotto l’astronave perché sia colpita, in millisecondi. Se ti sposti, l’avanzamento cala rapidamente.',
      short: 'tenuta {v} ms',
    },
    toleranceCm: {
      label: 'Tolleranza laterale',
      hint: 'Tolleranza laterale in centimetri: entro questa distanza il puntatore conta come allineato. Sugli schermi piccoli è al massimo un quarto della larghezza.',
    },
    control: {
      label: 'Controllo',
      hint: '«Dito»: il puntatore segue la posizione orizzontale di dito o mouse. «Tasti freccia»: sinistra e destra (anche A e D). «Inclinare il dispositivo»: inclinazione a sinistra e a destra, solo con un dispositivo adatto; lo attivi tu.',
      options: { pointer: 'Dito/mouse', keys: 'Tasti freccia', tilt: 'Inclinare il dispositivo' },
    },
  },
};
