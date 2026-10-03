import type { ExerciseTexts } from '../../core/types';
import { SAFETY_STANDING_DE, SAFETY_STANDING_IT, safetyList } from '../_shared/labor-sicherheit';

// Texte für Blickfit geschrieben (du-Form, einfache Sprache, Fachwörter erklärt).
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, keine Messung des Gleichgewichts, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// Richtungsnamen: dir0 … dir7 = oben, oben rechts, rechts, unten rechts, unten, unten links, links, oben links
// (bei 4 Richtungen werden dir0, dir2, dir4, dir6 benutzt).

export const de: ExerciseTexts = {
  title: 'Orientierung',
  tagline: 'Ein Punkt leuchtet auf – dorthin orientieren, die Hilfsperson bestätigt.',
  steps: [
    'Sicher stehen, Halt und Hilfsperson in Reichweite.',
    'Ein Punkt leuchtet auf: bewege dich in diese Richtung.',
    'Die Hilfsperson tippt „Erreicht“, dann zurück zur Mitte.',
  ],
  why:
    'Hier übst du, nach einem Reiz gezielt eine Richtung einzunehmen: Du siehst, wohin der Punkt zeigt, bestimmst die Richtung und führst eine kontrollierte Bewegung aus – zum Beispiel Neigen oder einen Schritt. Eine Hilfsperson bestätigt, wann du die Richtung erreicht hast. Die App misst nur die Zeit bis zu diesem Tipp, sieht deine Bewegung nicht und erfasst nicht, wie sauber du dich bewegst. Ob sich das Üben auf Alltag, Sport oder Verkehr überträgt, ist nicht belegt.',
  goodFor: ['Orientierung', 'Körperbewegung', 'Richtungen'],
  captions: {
    target: 'Ein Punkt leuchtet auf',
    move: 'Bewege dich in diese Richtung',
    confirm: 'Die Hilfsperson tippt „Erreicht“',
    back: 'Dann zurück zur Mitte',
    wrong: 'Falsche Richtung? Dann tippt sie das',
  },
  metrics: {
    reached: 'Erreichte Ziele',
    wrong: 'Falsche Richtung',
    timeouts: 'Zeitlimit überschritten',
    t_mean: 'Zeit bis zum Ziel (Mittel)',
    t_median: 'Zeit bis zum Ziel (Median)',
    t_sd: 'Zeit bis zum Ziel (Streuung)',
    return_mean: 'Zeit zurück zur Mitte (Mittel)',
  },
  metricHints: {
    reached: 'So viele Ziele hat die Hilfsperson als erreicht bestätigt.',
    wrong: 'Ziele, bei denen die Hilfsperson „Falsche Richtung“ getippt hat.',
    timeouts: 'Ziele, die das Zeitlimit überschritten haben. Ohne Zeitlimit gibt es keine.',
    t_mean: 'Durchschnittliche Zeit vom Aufleuchten bis zum Tipp der Hilfsperson bei erreichten Zielen. Sie enthält deren Reaktionszeit und ist nur bei gleicher Hilfsperson und gleichem Aufbau vergleichbar.',
    t_median: 'Der mittlere Wert, wenn man alle Zeiten der Größe nach ordnet: Die Hälfte war schneller, die Hälfte langsamer. Einzelne Ausreißer ziehen ihn weniger als den Durchschnitt.',
    t_sd: 'Wie stark die Zeiten schwanken (Standardabweichung). Kleinere Werte bedeuten gleichmäßigere Ausführung.',
    return_mean: 'Durchschnittliche Zeit für die Rückkehr zur Mitte, vom Aufleuchten der Mitte bis zum Tipp der Hilfsperson (nur mit Rückkehr zur Mitte).',
  },
  tips: {
    few: 'Diesmal wurde kein Ziel als erreicht bestätigt. Probiere vier Richtungen, größere Punkte und kein Zeitlimit.',
    wrong: 'Es gab öfter eine falsche Richtung. Bewege dich langsamer und kontrollierter – schnelles Ausschlagen mit anschließendem Wackeln hilft nicht.',
    timeouts: 'Bei mehreren Zielen reichte die Zeit nicht. Stell ein längeres Zeitlimit ein oder schalte es aus.',
    steady: 'Die Zeiten schwanken ziemlich. Gleichmäßig und ruhig bewegen, zwischen den Zielen kurz durchatmen.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen, die dieselben Einstellungen hatten – mit derselben Hilfsperson und demselben Aufbau.',
  },
  feedback: {
    label: '{n} / {total}',
    wait: 'Bereit in der Mitte …',
    target: 'In diese Richtung orientieren',
    center: 'Zurück zur Mitte',
    btnOk: 'Erreicht',
    btnBad: 'Falsche Richtung',
    keyOk: 'Leertaste',
    keyBad: 'Taste X',
    dir0: 'oben',
    dir1: 'oben rechts',
    dir2: 'rechts',
    dir3: 'unten rechts',
    dir4: 'unten',
    dir5: 'unten links',
    dir6: 'links',
    dir7: 'oben links',
    moreTitle: 'Weitere Werte',
    moreNote: 'Die Zeiten enthalten die Reaktion der Hilfsperson. Vergleiche sie nur mit deinen eigenen Werten bei gleicher Hilfsperson und gleichem Aufbau.',
    dirTitle: 'Zeit je Richtung',
    dirValue: '{ms} ({n} von {of} erreicht)',
    dirValueNone: 'nicht erreicht ({of} Ziele)',
    dirNote: 'Nur Zählwerte mit meist wenigen Zielen je Richtung – keine Wertung und kein Befund.',
  },
  progression: [
    'Leichter: vier Richtungen, lange Pause und Zeitlimit (10 bis 20 Sekunden) oder keines, große Punkte, Rückkehr zur Mitte an.',
    'Schwerer: acht Richtungen, kürzeres Zeitlimit (3 bis 5 Sekunden), kleinere Punkte, kürzere Pausen. Ohne Rückkehr zur Mitte wechselst du direkt von Richtung zu Richtung – das ist anspruchsvoller.',
    'Eine unruhigere Standfläche erst später und nur mit Sicherung und Aufsicht – nie auf wackligen Unterlagen ohne Hilfsperson.',
    'Unsere Faustregel (keine Vorgabe aus der Forschung): Erst wenn Richtungen und Rückkehr sicher gelingen, mach genau eine Einstellung schwerer. Ändere immer nur eine Einstellung auf einmal.',
  ],
  cautions: [
    ...safetyList(SAFETY_STANDING_DE),
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“), damit die Punktgröße in Zentimetern stimmt.',
    'Aufbau: Die Hilfsperson sitzt oder steht am Bildschirm und sieht deine Bewegung. Vereinbart vorher, welche Neigung oder welcher Schritt zu welcher Richtung gehört (zum Beispiel nach vorn für „oben“) und ab welcher Lage „Erreicht“ gilt. Der Bildschirm steht auf Augenhöhe, damit du den Kopf nicht neigen musst; das Gerät steht ruhig auf einem Ständer oder Tisch, oder die Hilfsperson hält es. Tastatur: Leertaste = erreicht, X = falsche Richtung.',
    'Bewege dich ruhig und kontrolliert. Kurze Pausen zwischen den Durchgängen verhindern, dass die Beine ermüden.',
    'Die Zeit enthält die Reaktion der Hilfsperson. Ohne Zeitlimit wartet die Übung, bis die Hilfsperson tippt.',
  ],
  params: {
    trials: {
      label: 'Anzahl der Ziele',
      hint: 'Wie viele Ziele ein Durchlauf hat. Die Richtungen sind gleichmäßig verteilt.',
    },
    directions: {
      label: 'Richtungen',
      hint: 'Vier Richtungen (oben, rechts, unten, links) oder acht (zusätzlich die Diagonalen). Mehr Richtungen sind anspruchsvoller.',
      options: { '4': '4', '8': '8 (mit Diagonalen)' },
    },
    returnToCenter: {
      label: 'Zurück zur Mitte',
      hint: 'Bei „Ja“ kehrst du nach jedem Ziel zur Mitte zurück; auch das bestätigt die Hilfsperson und wird gemessen. Bei „Nein“ geht es direkt zur nächsten Richtung.',
      options: { yes: 'Ja', no: 'Nein' },
    },
    waitMs: {
      label: 'Pause vor dem nächsten Ziel',
      hint: 'Pause in Millisekunden zwischen der Bestätigung und dem nächsten Ziel.',
    },
    timeoutS: {
      label: 'Zeitlimit je Ziel',
      hint: 'Nach Ablauf zählt das Ziel als „Zeitlimit überschritten“. 0 bedeutet kein Limit: Die Übung wartet, bis die Hilfsperson tippt.',
    },
    sizeCm: {
      label: 'Punktgröße',
      hint: 'Durchmesser der Punkte in Zentimetern. Auf kleinen Bildschirmen werden sie so begrenzt, dass alle Richtungen Platz haben.',
      short: '{v} cm',
    },
    sound: {
      label: 'Ton',
      hint: 'Kurzer Ton, wenn ein Ziel erscheint, und bei der Bestätigung. Der Ton ändert die Vergleichbarkeit nicht.',
      options: { no: 'Aus', yes: 'An' },
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Orientamento',
  tagline: 'Si accende un punto – orientati lì, la persona di aiuto conferma.',
  steps: [
    'In piedi in sicurezza, appoggio e aiuto a portata di mano.',
    'Si accende un punto: muoviti in quella direzione.',
    'La persona di aiuto tocca «Raggiunto», poi torna al centro.',
  ],
  why:
    'Qui ti alleni a prendere una direzione precisa dopo uno stimolo: vedi dove indica il punto, stabilisci la direzione ed esegui un movimento controllato – per esempio inclinarti o fare un passo. Una persona di aiuto conferma quando hai raggiunto la direzione. L’app misura solo il tempo fino a quel tocco, non vede il tuo movimento e non rileva quanto sia pulito. Non è dimostrato che l’allenamento si trasferisca alla vita quotidiana, allo sport o al traffico.',
  goodFor: ['Orientamento', 'Movimento del corpo', 'Direzioni'],
  captions: {
    target: 'Si accende un punto',
    move: 'Muoviti in quella direzione',
    confirm: 'La persona di aiuto tocca «Raggiunto»',
    back: 'Poi di nuovo al centro',
    wrong: 'Direzione sbagliata? Tocca quello',
  },
  metrics: {
    reached: 'Bersagli raggiunti',
    wrong: 'Direzione sbagliata',
    timeouts: 'Limite di tempo superato',
    t_mean: 'Tempo fino al bersaglio (media)',
    t_median: 'Tempo fino al bersaglio (mediana)',
    t_sd: 'Tempo fino al bersaglio (variazione)',
    return_mean: 'Tempo di ritorno al centro (media)',
  },
  metricHints: {
    reached: 'Quanti bersagli la persona di aiuto ha confermato come raggiunti.',
    wrong: 'Bersagli per i quali la persona di aiuto ha toccato «Direzione sbagliata».',
    timeouts: 'Bersagli che hanno superato il limite di tempo. Senza limite di tempo non ce ne sono.',
    t_mean: 'Tempo medio da quando si accende il punto al tocco della persona di aiuto, per i bersagli raggiunti. Comprende la sua reazione ed è confrontabile solo con la stessa persona e lo stesso allestimento.',
    t_median: 'Il valore centrale quando si ordinano tutti i tempi: metà erano più veloci, metà più lenti. I valori anomali lo influenzano meno della media.',
    t_sd: 'Quanto variano i tempi (deviazione standard). Valori più piccoli indicano un’esecuzione più regolare.',
    return_mean: 'Tempo medio per tornare al centro, da quando si accende il centro al tocco della persona di aiuto (solo con ritorno al centro).',
  },
  tips: {
    few: 'Stavolta nessun bersaglio è stato confermato come raggiunto. Prova quattro direzioni, punti più grandi e nessun limite di tempo.',
    wrong: 'Ci sono state più volte direzioni sbagliate. Muoviti più lentamente e in modo controllato – oscillare dopo un movimento brusco non aiuta.',
    timeouts: 'Per alcuni bersagli il tempo non è bastato. Imposta un limite di tempo più lungo o disattivalo.',
    steady: 'I tempi variano parecchio. Muoviti con regolarità e calma, tra un bersaglio e l’altro respira un attimo.',
    compare: 'Confronta questo giro solo con giri che avevano le stesse impostazioni – con la stessa persona di aiuto e lo stesso allestimento.',
  },
  feedback: {
    label: '{n} / {total}',
    wait: 'Pronto al centro …',
    target: 'Orientati in questa direzione',
    center: 'Torna al centro',
    btnOk: 'Raggiunto',
    btnBad: 'Direzione sbagliata',
    keyOk: 'Barra spaziatrice',
    keyBad: 'Tasto X',
    dir0: 'su',
    dir1: 'su a destra',
    dir2: 'destra',
    dir3: 'giù a destra',
    dir4: 'giù',
    dir5: 'giù a sinistra',
    dir6: 'sinistra',
    dir7: 'su a sinistra',
    moreTitle: 'Altri valori',
    moreNote: 'I tempi comprendono la reazione della persona di aiuto. Confrontali solo con i tuoi valori con la stessa persona e lo stesso allestimento.',
    dirTitle: 'Tempo per direzione',
    dirValue: '{ms} ({n} su {of} raggiunti)',
    dirValueNone: 'non raggiunto ({of} bersagli)',
    dirNote: 'Solo valori di conteggio con di solito pochi bersagli per direzione – nessuna valutazione e nessun referto.',
  },
  progression: [
    'Più facile: quattro direzioni, pausa lunga e limite di tempo (da 10 a 20 secondi) oppure nessuno, punti grandi, ritorno al centro attivo.',
    'Più difficile: otto direzioni, limite di tempo più breve (da 3 a 5 secondi), punti più piccoli, pause più brevi. Senza ritorno al centro passi direttamente da una direzione all’altra – è più impegnativo.',
    'Una base più instabile solo più avanti e solo con protezione e sorveglianza – mai su superfici instabili senza persona di aiuto.',
    'La nostra regola pratica (non è un’indicazione della ricerca): solo quando direzioni e ritorno riescono con sicurezza, rendi più difficile una sola impostazione. Cambia sempre una sola impostazione alla volta.',
  ],
  cautions: [
    ...safetyList(SAFETY_STANDING_IT),
    'Calibra lo schermo una volta («Calibra lo schermo»), così la dimensione dei punti in centimetri è corretta.',
    'Allestimento: la persona di aiuto siede o sta in piedi accanto allo schermo e vede il tuo movimento. Concordate prima quale inclinazione o quale passo corrisponde a quale direzione (per esempio in avanti per «su») e da quale posizione vale «Raggiunto». Lo schermo sta all’altezza degli occhi, così non devi inclinare la testa; il dispositivo sta fermo su un supporto o su un tavolo, oppure lo tiene la persona di aiuto. Tastiera: barra spaziatrice = raggiunto, X = direzione sbagliata.',
    'Muoviti con calma e in modo controllato. Brevi pause tra i giri evitano che le gambe si stanchino.',
    'Il tempo comprende la reazione della persona di aiuto. Senza limite di tempo l’esercizio aspetta finché la persona di aiuto tocca.',
  ],
  params: {
    trials: {
      label: 'Numero di bersagli',
      hint: 'Quanti bersagli ha un giro. Le direzioni sono distribuite in modo uniforme.',
    },
    directions: {
      label: 'Direzioni',
      hint: 'Quattro direzioni (su, destra, giù, sinistra) oppure otto (anche le diagonali). Più direzioni sono più impegnative.',
      options: { '4': '4', '8': '8 (con diagonali)' },
    },
    returnToCenter: {
      label: 'Ritorno al centro',
      hint: 'Con «Sì» dopo ogni bersaglio torni al centro; anche questo lo conferma la persona di aiuto e viene misurato. Con «No» si passa direttamente alla direzione successiva.',
      options: { yes: 'Sì', no: 'No' },
    },
    waitMs: {
      label: 'Pausa prima del bersaglio successivo',
      hint: 'Pausa in millisecondi tra la conferma e il bersaglio successivo.',
    },
    timeoutS: {
      label: 'Limite di tempo per bersaglio',
      hint: 'Allo scadere il bersaglio conta come «limite di tempo superato». 0 significa nessun limite: l’esercizio aspetta finché la persona di aiuto tocca.',
    },
    sizeCm: {
      label: 'Dimensione dei punti',
      hint: 'Diametro dei punti in centimetri. Sugli schermi piccoli vengono limitati, così tutte le direzioni hanno spazio.',
      short: '{v} cm',
    },
    sound: {
      label: 'Suono',
      hint: 'Suono breve quando compare un bersaglio e alla conferma. Il suono non cambia la confrontabilità.',
      options: { no: 'No', yes: 'Sì' },
    },
  },
};
