import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, keine Normwerte, Vergleich nur mit sich selbst. Gemessen wird nur, ob der Buchstabe erkannt
// wird – nicht der Blick und nicht die Kopfhaltung. In feedback stehen auch die Texte der Pause und der Ergebnistabelle;
// {a}, {b}, {t} sind Platzhalter.

export const de: ExerciseTexts = {
  title: 'Pendelball',
  tagline: 'Folge der pendelnden Kugel mit den Augen und erkenne ihren Buchstaben.',
  steps: [
    'Tablet ruhig aufstellen, mittig sitzen, Kopf ruhig halten.',
    'Folge der Kugel nur mit den Augen, Bahn für Bahn.',
    'Tippe unten den Buchstaben, den du auf ihr siehst.',
  ],
  why:
    'Ein Ball, der an einer Schnur pendelt, ist eine Praxisform der funktionellen Optometrie: Man folgt ihm bei ruhigem Kopf nur mit den Augen und liest dabei einen Buchstaben auf ihm. Hier pendelt eine Kugel nacheinander waagrecht, senkrecht, schräg und im Kreis, und du tippst unten den Buchstaben an. Ob dein Blick wirklich folgt und ob dein Kopf ruhig bleibt, wird nicht gemessen. Für diese Form gibt es keine Studie; ob sie sich auf Alltag, Lesen oder Sport überträgt, ist nicht belegt.',
  goodFor: ['Bewegtes im Blick behalten', 'Ruhig mitschauen', 'Kopf ruhig halten'],
  captions: {
    follow: 'Folge der Kugel mit den Augen',
    letter: 'Ein Buchstabe erscheint auf der Kugel',
    tap: 'Tippe unten denselben Buchstaben',
    next: 'Dann kommt die nächste Bahn',
  },
  metrics: {
    level: 'Stufe',
    accuracy: 'Treffsicherheit',
    rt: 'Ø Antwortzeit',
    mistakes: 'Fehler und Auslassungen',
  },
  metricHints: {
    level: 'Die höchste Stufe, auf der du eine Bahn zu mindestens zwei Dritteln richtig erkannt hast. Die Stufe steigt nach einer Bahn mit mindestens 85 % richtig und sinkt unter 65 %.',
    accuracy: 'Anteil der Buchstaben, die du richtig erkannt hast. Gemessen wird nur das Erkennen, nicht, wohin du schaust.',
    rt: 'Zeit vom Erscheinen des Buchstabens bis zum Tippen, nur bei richtigen Antworten. Vergleiche sie nur mit deinen eigenen Werten auf diesem Gerät.',
    mistakes: 'Falsch getippte Buchstaben und Auslassungen, wenn die Antwortzeit abgelaufen war.',
  },
  tips: {
    eyes: 'Folge der Kugel nur mit den Augen, nicht mit dem Kopf – und bleib dran, auch wenn gerade kein Buchstabe da ist.',
    decide: 'Tippe lieber zügig: Die Antwortzeit ist begrenzt, und der erste Eindruck stimmt oft.',
    great: 'Gut gelaufen! Du erkennst den Buchstaben auch bei zügigem Pendeln. Beim nächsten Mal geht es von dort aus weiter.',
  },
  feedback: {
    level: 'Stufe',
    late: 'Zu spät',
    first: 'Zuerst',
    next: 'Als Nächstes',
    shapeH: 'waagrecht',
    shapeV: 'senkrecht',
    shapeD1: 'schräg: links unten – rechts oben',
    shapeD2: 'schräg: links oben – rechts unten',
    shapeCw: 'Kreis im Uhrzeigersinn',
    shapeCcw: 'Kreis gegen den Uhrzeigersinn',
    tableTitle: 'Treffer je Bahn',
    hitsOf: '{a} von {b} richtig',
    avg: 'Ø {t}',
    note:
      'Gemessen wird nur, ob du den Buchstaben erkennst – nicht, wohin du schaust und ob dein Kopf ruhig bleibt. Mit wenigen Buchstaben je Bahn sagt die Tabelle nur grob etwas; vergleiche nur mit deinen eigenen Werten auf diesem Gerät.',
  },
  progression: [
    'Leichter: langsamer, kleinere Pendelweite, große Buchstaben, die sehr verschieden aussehen (z. B. A, L, O, T), längere Anzeige, feste Reihenfolge der Bahnen.',
    'Schwerer: schneller (eine Periode dauert von etwa 4 bis etwa 2,2 Sekunden), größere Pendelweite (höchstens etwa 60 % der Bildschirmbreite), kleinere Buchstaben und Kugel, kürzere Anzeige, ähnliche Buchstaben (z. B. B, D, P, R) und gemischte Reihenfolge der Bahnen.',
    'Nach jeder Bahn passt sich die Stufe an: ab 85 % richtig eine Stufe mehr, unter 65 % eine weniger. Je Stufe ändert sich genau ein Merkmal.',
  ],
  cautions: [
    'Stell das Tablet ruhig auf, setz dich mittig davor (etwa 40 cm Abstand) und halte den Kopf möglichst ruhig. Folge der Kugel nur mit den Augen.',
    'Gemessen wird nur, ob du den Buchstaben erkennst. Ob deine Augen der Kugel folgen und ob dein Kopf ruhig bleibt, kann die App nicht erfassen.',
    'Die Kugel pendelt gleichmäßig und höchstens etwa 25 Grad pro Sekunde schnell, die Bahn ist höchstens etwa 60 % der Bildschirmbreite breit, nichts blinkt. Zwischen den Bahnen gibt es eine kurze Pause.',
    'Treten Doppelbilder oder Schwindel auf oder bekommst du Kopfschmerz mit Sehverschlechterung, übe nicht weiter und lass es ärztlich abklären (Muchnick, 2008).',
    'Die Übung ersetzt keine Untersuchung der Augenbewegungen; die führt eine Fachperson durch.',
  ],
};

export const it: ExerciseTexts = {
  title: 'Palla pendolo',
  tagline: 'Segui con gli occhi la sfera che oscilla e riconosci la sua lettera.',
  steps: [
    'Tablet fermo, siediti al centro, testa ferma.',
    'Segui la sfera solo con gli occhi, tragitto dopo tragitto.',
    'Tocca in basso la lettera che vedi sulla sfera.',
  ],
  why:
    'Una palla appesa a un filo che oscilla è una forma di pratica dell’optometria funzionale: la si segue solo con gli occhi, a testa ferma, e intanto si legge una lettera su di essa. Qui una sfera oscilla uno dopo l’altro in orizzontale, in verticale, in diagonale e in cerchio, e tu tocchi in basso la lettera. Non viene misurato se il tuo sguardo la segue davvero né se la testa resta ferma. Per questa forma non c’è alcuno studio; se si trasferisca alla vita di tutti i giorni, alla lettura o allo sport non è dimostrato.',
  goodFor: ['Tenere d’occhio ciò che si muove', 'Guardare con calma', 'Tenere la testa ferma'],
  captions: {
    follow: 'Segui la sfera con gli occhi',
    letter: 'Sulla sfera compare una lettera',
    tap: 'Tocca in basso la stessa lettera',
    next: 'Poi arriva il tragitto successivo',
  },
  metrics: {
    level: 'Livello',
    accuracy: 'Precisione',
    rt: 'Tempo medio di risposta',
    mistakes: 'Errori e omissioni',
  },
  metricHints: {
    level: 'Il livello più alto in cui hai riconosciuto un tragitto almeno per due terzi. Il livello sale dopo un tragitto con almeno l’85 % di risposte giuste e scende sotto il 65 %.',
    accuracy: 'Quota di lettere riconosciute correttamente. Si misura solo il riconoscimento, non dove guardi.',
    rt: 'Tempo da quando compare la lettera a quando tocchi, solo per le risposte giuste. Confrontalo solo con i tuoi valori su questo dispositivo.',
    mistakes: 'Lettere toccate in modo sbagliato e omissioni quando il tempo di risposta era scaduto.',
  },
  tips: {
    eyes: 'Segui la sfera solo con gli occhi, non con la testa – e non mollarla anche quando non c’è nessuna lettera.',
    decide: 'Meglio toccare in fretta: il tempo di risposta è limitato e spesso la prima impressione è quella giusta.',
    great: 'Ben fatto! Riconosci la lettera anche con oscillazioni rapide. La prossima volta si riparte da lì.',
  },
  feedback: {
    level: 'Livello',
    late: 'Troppo tardi',
    first: 'Per cominciare',
    next: 'Prossimo tragitto',
    shapeH: 'orizzontale',
    shapeV: 'verticale',
    shapeD1: 'in diagonale: in basso a sinistra – in alto a destra',
    shapeD2: 'in diagonale: in alto a sinistra – in basso a destra',
    shapeCw: 'cerchio in senso orario',
    shapeCcw: 'cerchio in senso antiorario',
    tableTitle: 'Risposte giuste per tragitto',
    hitsOf: '{a} su {b} giuste',
    avg: 'media {t}',
    note:
      'Si misura solo se riconosci la lettera – non dove guardi né se la testa resta ferma. Con poche lettere per tragitto la tabella dà solo un’idea approssimativa; confronta solo con i tuoi valori su questo dispositivo.',
  },
  progression: [
    'Più facile: più lento, oscillazione più corta, lettere grandi e molto diverse tra loro (per es. A, L, O, T), visualizzazione più lunga, ordine fisso dei tragitti.',
    'Più difficile: più veloce (un periodo dura da circa 4 a circa 2,2 secondi), oscillazione più ampia (al massimo circa il 60 % della larghezza dello schermo), lettere e sfera più piccole, visualizzazione più breve, lettere simili (per es. B, D, P, R) e ordine misto dei tragitti.',
    'Dopo ogni tragitto il livello si adatta: da 85 % di risposte giuste un livello in più, sotto il 65 % uno in meno. A ogni livello cambia una sola caratteristica.',
  ],
  cautions: [
    'Appoggia il tablet in modo stabile, siediti al centro davanti a esso (circa 40 cm di distanza) e tieni la testa il più possibile ferma. Segui la sfera solo con gli occhi.',
    'Si misura solo se riconosci la lettera. Se i tuoi occhi seguono la sfera e se la testa resta ferma, l’app non può rilevarlo.',
    'La sfera oscilla in modo regolare e al massimo a circa 25 gradi al secondo, il tragitto è largo al massimo circa il 60 % dello schermo, nulla lampeggia. Tra un tragitto e l’altro c’è una breve pausa.',
    'Se compaiono visione doppia o vertigini, o hai mal di testa con peggioramento della vista, non continuare a esercitarti e fai chiarire la cosa dal medico (Muchnick, 2008).',
    'L’esercizio non sostituisce una visita dei movimenti oculari; la esegue un professionista.',
  ],
};
