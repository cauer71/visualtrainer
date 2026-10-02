import type { ExerciseTexts } from '../../core/types';

// Quelle: Labor-Prototyp (help/ordering.js), für Blickfit geglättet: du-Form, einfache Sprache, Fachwörter erklärt
// (Standardabweichung als „wie stark die Zeiten schwanken“; „Trail Making“ nicht im Text, nur in den Quellen).
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// `short` in params: Vorlage für die Kurzfassung der Einstellungen auf der Ergebnisseite ({v} = Wert; „|“ trennt die
// Form für genau 1 von der Form für andere Zahlen).
// feedback: `label`/`labelLimit` = Anzeige oben ({n} richtige von {total}, {s} Restsekunden), `task_*` = Aufgabe oben im Bild.

export const de: ExerciseTexts = {
  title: 'Bewegte Ziele ordnen',
  tagline: 'Bewegte Zahlen, Buchstaben oder Wörter der Reihe nach berühren.',
  steps: [
    'Die Ziele bewegen sich. Oben steht die Aufgabe.',
    'Berühre das nächste Ziel der Reihe – es verschwindet.',
    'Falsches Ziel? Es zählt als Fehler, sonst passiert nichts.',
  ],
  why:
    'Hier suchst du das nächste Ziel einer Reihenfolge (zum Beispiel 1, 2, 3 …) und berührst es, während es sich bewegt. Das verbindet Suchen, Ordnen im Kopf und Zielen mit dem Finger. Ähnliche Verbindungsaufgaben mit Zahlen und Buchstaben nutzt die Forschung, um Suchtempo und Aufmerksamkeit zu beschreiben; diese Übung ist jedoch kein solches Verfahren und sagt nichts über deine Fähigkeiten aus. Ob sich das Üben auf Alltag, Sport oder Verkehr überträgt, ist nicht belegt.',
  goodFor: ['Suchen', 'Ordnen im Kopf', 'Auge und Hand'],
  captions: {
    watch: 'Die Zahlen bewegen sich',
    tap: 'Berühre sie der Reihe nach: 1, 2, 3 …',
    wrong: 'Falsche Zahl? Es zählt als Fehler',
    next: 'Weiter mit der nächsten Zahl',
    done: 'Am Ende zählt deine Zeit',
  },
  metrics: {
    solved: 'Richtige Ziele',
    total: 'Gesamtzeit',
    wrong: 'Falsche Ziele berührt',
    stray: 'Danebengetippt',
    t_mean: 'Zeit pro Ziel (Mittel)',
    t_sd: 'Zeit pro Ziel (Streuung)',
  },
  metricHints: {
    solved: 'So viele Ziele hast du in der richtigen Reihenfolge berührt. Ohne Zeitlimit sind es immer alle; mit Zeitlimit kann die Zahl kleiner sein.',
    total: 'Zeit vom Start bis zum letzten Ziel (mit Zeitlimit: bis zum Ablauf der Zeit). Weniger ist besser. Sie hängt stark von Anzahl, Tempo und Inhalt ab – vergleiche nur Durchläufe mit denselben Einstellungen.',
    wrong: 'Wie oft du ein Ziel berührt hast, das nicht an der Reihe war.',
    stray: 'Berührungen, die kein Ziel getroffen haben.',
    t_mean: 'Durchschnittliche Zeit zwischen zwei richtigen Berührungen. Darin stecken Suchen, Zielen und Treffen. Beim ersten Ziel zählt die Zeit ab dem Start.',
    t_sd: 'Wie stark diese Zeiten schwanken (Standardabweichung). Große Werte heißen: Einzelne Ziele waren deutlich schwerer zu finden oder zu treffen als andere.',
  },
  tips: {
    few: 'Diesmal hast du kein Ziel richtig getroffen. Probiere weniger Ziele (4), ein niedrigeres Tempo (3 cm/s) und größere Zeichen (4 cm).',
    timeout: 'Die Zeit war vorbei, bevor du alle Ziele hattest. Mach es dir leichter: weniger Ziele, langsamere Bewegung oder ein längeres Zeitlimit – und ändere immer nur eine Einstellung.',
    wrong: 'Du hast öfter ein falsches Ziel berührt. Such das nächste Ziel erst genau, dann tippe: Falsche Berührungen kosten mehr Zeit, als das Suchen.',
    stray: 'Du tippst öfter neben die Ziele. Ziele ein wenig voraus: Berühre die Stelle, an der das Ziel gleich sein wird.',
    harder: 'Du bist ohne Fehler fertig geworden. Wenn du magst, mach genau eine Einstellung schwerer, zum Beispiel mehr Ziele oder ein höheres Tempo.',
    steady: 'Manche Ziele haben viel länger gedauert als andere. Leg dir die Reihenfolge vorher im Kopf zurecht, dann suchst du nur noch das nächste Ziel.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen, die dieselben Einstellungen hatten – auf diesem Gerät und mit derselben Hand.',
  },
  feedback: {
    label: '{n} / {total}',
    labelLimit: '{n} / {total} · {s} s',
    moreTitle: 'Weitere Werte',
    moreNote: 'Die Zeit enthält auch die Verzögerung von Bildschirm und Touch-Sensor und ist nur auf demselben Gerät vergleichbar.',
    task_numbers: 'Zahlen von klein nach groß',
    task_numbers_desc: 'Zahlen von groß nach klein',
    task_letters: 'Buchstaben nach dem Alphabet',
    task_words: 'Wörter nach dem Alphabet',
    task_sums: 'Rechnungen nach Ergebnis, kleinstes zuerst',
    task_products: 'Rechnungen nach Ergebnis, kleinstes zuerst',
  },
  progression: [
    'Leichter: weniger Ziele (3 bis 6), langsamer (2 bis 4 cm/s), Zahlen aufsteigend, größere Zeichen.',
    'Schwerer: mehr Ziele (10 bis 15), schneller (8 bis 15 cm/s), Wörter oder Rechenaufgaben, Zahlen absteigend, kleinere Zeichen.',
    'Auf Kreis- und Ellipsenbahn laufen die Ziele gleichmäßig und vorhersehbar. Bei „Geradeaus“ prallen sie ab und wirken unregelmäßiger.',
    'Unsere Faustregel (keine Vorgabe aus der Forschung): Ändere immer nur eine Einstellung auf einmal. Wirst du ohne Fehler fertig, mach eine Einstellung schwerer. Dein Ziel: die Zeit senken, ohne mehr Fehler zu machen.',
  ],
  cautions: [
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“), damit die Zeichenhöhe in Zentimetern stimmt. Auf kleinen Bildschirmen werden die Zeichen verkleinert, damit alle Ziele ins Bild passen (bei langen Wörtern am meisten).',
    'Sitz etwa 50 bis 60 cm vom Bildschirm entfernt, die Hand locker über der Fläche. Für Wörter und Rechenaufgaben wähle ab 3 cm Zeichenhöhe, damit du sie auch in Bewegung lesen kannst.',
    'Die Wörter sind deutsch und werden alphabetisch geordnet (Umlaute wie im Wörterbuch). Bei Rechenaufgaben zählt das Ergebnis, das kleinste zuerst.',
    'Bewegte Schrift kann bei längerem Betrachten die Augen anstrengen. Mach alle 5 bis 10 Minuten eine Pause. Bei Schwindel oder Übelkeit hör auf und wähle beim nächsten Mal eine langsamere Bewegung.',
    'Bist du lichtempfindlich oder hattest du schon einmal einen epileptischen Anfall, verzichte bitte darauf oder sprich vorher mit deiner Ärztin oder deinem Arzt.',
  ],
  params: {
    content: {
      label: 'Inhalt',
      hint: 'Was geordnet wird: Zahlen auf- oder absteigend, Buchstaben oder Wörter nach dem Alphabet, Summen oder Produkte nach dem Ergebnis (kleinstes zuerst). Wörter und Rechenaufgaben sind schwerer, weil du sie erst lesen oder ausrechnen musst.',
      options: {
        numbers: 'Zahlen aufsteigend',
        numbers_desc: 'Zahlen absteigend',
        letters: 'Buchstaben nach Alphabet',
        words: 'Wörter nach Alphabet',
        sums: 'Summen nach Ergebnis',
        products: 'Produkte nach Ergebnis',
      },
    },
    count: {
      label: 'Anzahl der Ziele',
      hint: 'Wie viele Ziele es gibt. Mehr Ziele machen den Durchlauf länger und schwerer.',
      short: '{v} Ziel|{v} Ziele',
    },
    motion: {
      label: 'Bewegung',
      hint: '„Geradeaus“: Die Ziele fliegen geradeaus und prallen am Rand ab. „Kreisbahn“ und „Ellipsenbahn“: Die Ziele laufen gleichmäßig verteilt auf einer Bahn.',
      options: { linear: 'Geradeaus (prallt ab)', circle: 'Kreisbahn', ellipse: 'Ellipsenbahn' },
    },
    speedCmS: {
      label: 'Tempo in cm pro Sekunde',
      hint: 'Wie schnell sich die Ziele bewegen (bei Bahnen: wie schnell sie auf der Bahn laufen). Höhere Werte machen das Treffen schwerer.',
      short: '{v} cm/s',
    },
    sizeCm: {
      label: 'Zeichenhöhe',
      hint: 'Höhe der Zeichen in Zentimetern. Die Kästchen werden bei Wörtern und Rechnungen entsprechend breiter. Auf kleinen Bildschirmen werden sie bei Bedarf verkleinert.',
    },
    direction: {
      label: 'Umlaufrichtung',
      hint: 'Nur bei Kreis- und Ellipsenbahn: ob die Ziele im oder gegen den Uhrzeigersinn laufen.',
      options: { cw: 'Im Uhrzeigersinn', ccw: 'Gegen den Uhrzeigersinn' },
    },
    timeLimitS: {
      label: 'Zeitlimit (0 = keines)',
      hint: 'Optionales Zeitlimit in Sekunden. Ist die Zeit um, endet der Durchlauf, auch wenn nicht alle Ziele berührt sind. 0 bedeutet: kein Limit.',
      short: '{v} s Limit',
    },
    sound: {
      label: 'Ton',
      hint: 'Kurzer Ton bei einer richtigen (hoch) und einer falschen Berührung (tief). Der Ton ändert die Vergleichbarkeit nicht.',
      options: { no: 'Aus', yes: 'An' },
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Ordinare bersagli in movimento',
  tagline: 'Tocca in ordine numeri, lettere o parole in movimento.',
  steps: [
    'I bersagli si muovono. In alto c’è il compito.',
    'Tocca il bersaglio successivo della serie – sparisce.',
    'Bersaglio sbagliato? Conta come errore, nient’altro.',
  ],
  why:
    'Qui cerchi il bersaglio successivo di una sequenza (per esempio 1, 2, 3 …) e lo tocchi mentre si muove. Così si uniscono cercare, ordinare a mente e mirare con il dito. Compiti di collegamento simili con numeri e lettere sono usati dalla ricerca per descrivere la velocità di ricerca e l’attenzione; questo esercizio però non è un procedimento di questo tipo e non dice nulla sulle tue capacità. Non è dimostrato che l’allenamento si trasferisca alla vita quotidiana, allo sport o al traffico.',
  goodFor: ['Cercare', 'Ordinare a mente', 'Occhio e mano'],
  captions: {
    watch: 'I numeri si muovono',
    tap: 'Toccali in ordine: 1, 2, 3 …',
    wrong: 'Numero sbagliato? Conta come errore',
    next: 'Poi il numero successivo',
    done: 'Alla fine conta il tuo tempo',
  },
  metrics: {
    solved: 'Bersagli giusti',
    total: 'Tempo totale',
    wrong: 'Bersagli sbagliati toccati',
    stray: 'Tocchi a vuoto',
    t_mean: 'Tempo per bersaglio (media)',
    t_sd: 'Tempo per bersaglio (variazione)',
  },
  metricHints: {
    solved: 'Quanti bersagli hai toccato nell’ordine giusto. Senza limite di tempo sono sempre tutti; con il limite di tempo il numero può essere minore.',
    total: 'Tempo dall’inizio all’ultimo bersaglio (con il limite di tempo: fino alla scadenza). Meno è meglio. Dipende molto da numero, ritmo e contenuto – confronta solo giri con le stesse impostazioni.',
    wrong: 'Quante volte hai toccato un bersaglio che non era il suo turno.',
    stray: 'Tocchi che non hanno colpito nessun bersaglio.',
    t_mean: 'Tempo medio tra due tocchi giusti. Comprende cercare, mirare e colpire. Per il primo bersaglio il tempo conta dall’inizio.',
    t_sd: 'Quanto variano questi tempi (deviazione standard). Valori grandi significano: alcuni bersagli erano molto più difficili da trovare o da colpire di altri.',
  },
  tips: {
    few: 'Stavolta non hai toccato nessun bersaglio giusto. Prova meno bersagli (4), un ritmo più basso (3 cm/s) e caratteri più grandi (4 cm).',
    timeout: 'Il tempo è finito prima che avessi tutti i bersagli. Rendilo più facile: meno bersagli, movimento più lento o un limite di tempo più lungo – e cambia sempre una sola impostazione.',
    wrong: 'Hai toccato più volte un bersaglio sbagliato. Cerca prima con precisione il bersaglio successivo, poi tocca: i tocchi sbagliati costano più tempo della ricerca.',
    stray: 'Tocchi spesso accanto ai bersagli. Mira un po’ in anticipo: tocca il punto in cui il bersaglio sarà tra poco.',
    harder: 'Hai finito senza errori. Se vuoi, rendi più difficile una sola impostazione, per esempio più bersagli o un ritmo più alto.',
    steady: 'Alcuni bersagli hanno richiesto molto più tempo di altri. Prepara l’ordine a mente prima di iniziare, così cerchi solo il bersaglio successivo.',
    compare: 'Confronta questo giro solo con giri che avevano le stesse impostazioni – su questo dispositivo e con la stessa mano.',
  },
  feedback: {
    label: '{n} / {total}',
    labelLimit: '{n} / {total} · {s} s',
    moreTitle: 'Altri valori',
    moreNote: 'Il tempo comprende anche il ritardo di schermo e sensore touch ed è confrontabile solo sullo stesso dispositivo.',
    task_numbers: 'Numeri dal più piccolo al più grande',
    task_numbers_desc: 'Numeri dal più grande al più piccolo',
    task_letters: 'Lettere in ordine alfabetico',
    task_words: 'Parole in ordine alfabetico',
    task_sums: 'Calcoli per risultato, il più piccolo per primo',
    task_products: 'Calcoli per risultato, il più piccolo per primo',
  },
  progression: [
    'Più facile: meno bersagli (da 3 a 6), più lento (da 2 a 4 cm/s), numeri crescenti, caratteri più grandi.',
    'Più difficile: più bersagli (da 10 a 15), più veloce (da 8 a 15 cm/s), parole o calcoli, numeri decrescenti, caratteri più piccoli.',
    'Su orbita circolare ed ellittica i bersagli corrono in modo regolare e prevedibile. Con “In linea retta” rimbalzano e sembrano più irregolari.',
    'La nostra regola pratica (non è un’indicazione della ricerca): cambia sempre una sola impostazione alla volta. Se finisci senza errori, rendi più difficile un’impostazione. Il tuo obiettivo: ridurre il tempo senza fare più errori.',
  ],
  cautions: [
    'Calibra lo schermo una volta (“Calibra lo schermo”), così l’altezza dei caratteri in centimetri è corretta. Sugli schermi piccoli i caratteri vengono ridotti perché tutti i bersagli stiano nell’immagine (più di tutto con parole lunghe).',
    'Siediti a circa 50–60 cm dallo schermo, con la mano rilassata sopra la superficie. Per parole e calcoli scegli un’altezza di almeno 3 cm, così le leggi anche in movimento.',
    'Le parole sono tedesche e vengono ordinate alfabeticamente (le dieresi come nel dizionario). Nei calcoli conta il risultato, il più piccolo per primo.',
    'La scrittura in movimento può affaticare gli occhi se la guardi a lungo. Fai una pausa ogni 5–10 minuti. In caso di vertigini o nausea smetti e la volta dopo scegli un movimento più lento.',
    'Se sei fotosensibile o hai già avuto una crisi epilettica, non eseguire l’esercizio oppure parlane prima con il tuo medico.',
  ],
  params: {
    content: {
      label: 'Contenuto',
      hint: 'Che cosa si ordina: numeri crescenti o decrescenti, lettere o parole in ordine alfabetico, somme o prodotti per risultato (il più piccolo per primo). Parole e calcoli sono più difficili, perché prima devi leggerli o calcolarli.',
      options: {
        numbers: 'Numeri crescenti',
        numbers_desc: 'Numeri decrescenti',
        letters: 'Lettere in ordine alfabetico',
        words: 'Parole in ordine alfabetico',
        sums: 'Somme per risultato',
        products: 'Prodotti per risultato',
      },
    },
    count: {
      label: 'Numero di bersagli',
      hint: 'Quanti bersagli ci sono. Più bersagli rendono il giro più lungo e più difficile.',
      short: '{v} bersaglio|{v} bersagli',
    },
    motion: {
      label: 'Movimento',
      hint: '“In linea retta”: i bersagli vanno dritti e rimbalzano sul bordo. “Orbita circolare” ed “Orbita ellittica”: i bersagli corrono distribuiti in modo regolare su un percorso.',
      options: { linear: 'In linea retta (rimbalza)', circle: 'Orbita circolare', ellipse: 'Orbita ellittica' },
    },
    speedCmS: {
      label: 'Ritmo in cm al secondo',
      hint: 'Quanto velocemente si muovono i bersagli (sui percorsi: quanto velocemente corrono sul percorso). Valori più alti rendono più difficile colpire.',
      short: '{v} cm/s',
    },
    sizeCm: {
      label: 'Altezza dei caratteri',
      hint: 'Altezza dei caratteri in centimetri. Con parole e calcoli i riquadri sono corrispondentemente più larghi. Sugli schermi piccoli vengono ridotti se necessario.',
    },
    direction: {
      label: 'Senso di rotazione',
      hint: 'Solo con orbita circolare ed ellittica: se i bersagli corrono in senso orario o antiorario.',
      options: { cw: 'In senso orario', ccw: 'In senso antiorario' },
    },
    timeLimitS: {
      label: 'Limite di tempo (0 = nessuno)',
      hint: 'Limite di tempo facoltativo in secondi. Quando il tempo è finito, il giro termina anche se non tutti i bersagli sono stati toccati. 0 significa: nessun limite.',
      short: 'limite {v} s',
    },
    sound: {
      label: 'Suono',
      hint: 'Suono breve per un tocco giusto (acuto) e uno sbagliato (grave). Il suono non cambia la confrontabilità.',
      options: { no: 'No', yes: 'Sì' },
    },
  },
};
