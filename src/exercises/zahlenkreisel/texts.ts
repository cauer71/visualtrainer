import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Zahlenkreisel',
  tagline: 'Finde die Zahlen der Reihe nach – während sich die Ringe gegeneinander drehen.',
  steps: [
    'Die 1 ist schon rot markiert – du beginnst mit der 2. Tippe die Zahlen der Reihe nach an: 2, 3, 4 … bis zur letzten.',
    'Die Ringe drehen sich langsam, benachbarte gegeneinander. Die Zahlen schaukeln leicht, bleiben aber aufrecht.',
    'Oben steht, welche Zahl gesucht ist, daneben läuft die Uhr.',
  ],
  why:
    'Beim Zahlenkreisel suchst du Zahlen der Reihe nach, während sich das ganze Feld bewegt. Die Augen springen von Zahl zu Zahl, halten bewegte Zahlen kurz fest und lassen sich von der Gegenbewegung nicht ablenken. Mit Übung wirst du hier schneller; ob sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Suchen, wenn sich alles bewegt', 'Übersicht behalten', 'Geordnet suchen'],
  captions: {
    rings: 'Die Ringe drehen sich gegeneinander',
    order: 'Die 1 ist rot – weiter mit 2, 3, 4 …',
    sway: 'Die Zahlen schaukeln, bleiben aber aufrecht',
    marked: 'Gefundene werden rot und bekommen einen Punkt',
    watch: 'Oben: gesuchte Zahl und Uhr',
  },
  metrics: {
    level: 'Erreichte Stufe',
    total: 'Gesamtzeit',
    found: 'Gefundene Zahlen',
    perNumber: 'Zeit pro Zahl',
    errors: 'Fehltipps',
  },
  metricHints: {
    level: 'Stufe, die du in dieser Runde geschafft hast (im Zeitrahmen und mit höchstens 5 % Fehltipps). Mit der Stufe drehen die Ringe schneller und unterschiedlicher, und die Zahlen schaukeln stärker.',
    total: 'Zeit vom Erscheinen der Zahlen bis zum letzten richtigen Tipp – wie die Uhr oben. Nur mit eigenen Runden mit denselben Einstellungen auf demselben Gerät vergleichen.',
    found: 'Die Runde wurde vor dem Ende abgebrochen; so viele Zahlen waren bis dahin gefunden.',
    perNumber: 'Mittlere Zeit (Median) von einer Zahl zur nächsten, ohne die erste Zahl.',
    errors: 'Tipps auf eine andere, noch nicht gefundene Zahl. Sie kosten keine Zeit, zählen aber für die Stufe. Tipps daneben zählen nicht.',
  },
  tips: {
    errors: 'Erst sicher finden, dann tippen – ein kurzer Blick mehr spart Fehltipps, gerade wenn sich die Zahl bewegt.',
    late: 'Gegen Ende wurdest du langsamer. Bleib ruhig im Takt: Zahl suchen, tippen, die nächste Zahl leise mitsprechen.',
    system: 'Such mit System, zum Beispiel Ring für Ring von außen nach innen – die Augen dürfen dabei frei wandern.',
    great: 'Gut gekreiselt! Beim nächsten Mal drehen die Ringe etwas schneller.',
  },
  feedback: {
    search: 'Gesucht:',
    level: 'Stufe',
    up: 'Nächste Stufe!',
    done: 'Geschafft!',
    demoEnd: 'Und so weiter bis zur letzten Zahl',
    blocks: 'Zeit je Zehnerblock',
    blocksNote: 'Summe je zehn Zahlen; der erste Block enthält das erste Orientieren.',
    perNumber: 'je Zahl',
  },
  params: {
    count: { label: 'Anzahl Zahlen', hint: 'Wie viele Zahlen im Feld stehen (Standard 40).', short: '{v} Zahl|{v} Zahlen' },
    tempo: { label: 'Drehtempo', hint: 'Tempo der Ringe im Verhältnis zur Stufe (100 % = Standard).' },
    counter: { label: 'Gegenläufig', hint: 'Benachbarte Ringe drehen in entgegengesetzte Richtungen.', options: { on: 'An', off: 'Aus' } },
    sway: {
      label: 'Schaukeln',
      hint: 'Wie stark die Zahlen um die eigene Achse schaukeln; sie bleiben immer aufrecht.',
      options: { off: 'Aus', light: 'Leicht', normal: 'Normal', strong: 'Stark' },
    },
  },
  progression: [
    'Leichter: weniger Zahlen, langsameres Drehtempo, Schaukeln aus oder alle Ringe in dieselbe Richtung.',
    'Schwerer: Nach einer zügigen Runde mit wenigen Fehltipps steigt die Stufe – die Ringe drehen schneller und unterschiedlicher, die Zahlen schaukeln stärker.',
  ],
  cautions: [
    'Bewegte Bilder können bei manchen Menschen Schwindel oder Unwohlsein auslösen – dann Pause machen oder Drehtempo und Schaukeln verringern. Mit „Bewegung reduzieren“ in den Systemeinstellungen stehen die Ringe still.',
    'Kein Test und keine Diagnose: Die Zeiten dienen nur dem Vergleich mit dir selbst auf demselben Gerät.',
  ],
};

export const it: ExerciseTexts = {
  title: 'Carosello dei numeri',
  tagline: 'Trova i numeri in ordine – mentre gli anelli girano in senso opposto.',
  steps: [
    'L’1 è già segnato in rosso – inizi dal 2. Tocca i numeri in ordine: 2, 3, 4 … fino all’ultimo.',
    'Gli anelli girano lentamente, quelli vicini in senso opposto. I numeri oscillano un po’, ma restano sempre dritti.',
    'In alto vedi quale numero cercare, accanto scorre il cronometro.',
  ],
  why:
    'Nel carosello dei numeri cerchi i numeri in ordine mentre tutto il campo si muove. Gli occhi saltano da un numero all’altro, fissano per un attimo numeri in movimento e non si lasciano distrarre dal movimento contrario. Con la pratica qui diventi più veloce; che questo si trasferisca alla vita di tutti i giorni non è dimostrato.',
  goodFor: ['Cercare quando tutto si muove', 'Mantenere la visione d’insieme', 'Cercare con ordine'],
  captions: {
    rings: 'Gli anelli girano in senso opposto',
    order: 'L’1 è rosso – continua con 2, 3, 4 …',
    sway: 'I numeri oscillano, ma restano dritti',
    marked: 'Quelli trovati diventano rossi con un puntino',
    watch: 'In alto: numero cercato e cronometro',
  },
  metrics: {
    level: 'Livello raggiunto',
    total: 'Tempo totale',
    found: 'Numeri trovati',
    perNumber: 'Tempo per numero',
    errors: 'Tocchi sbagliati',
  },
  metricHints: {
    level: 'Il livello superato in questo giro (entro il tempo previsto e con al massimo il 5 % di tocchi sbagliati). Salendo di livello gli anelli girano più veloci e in modo più diverso, e i numeri oscillano di più.',
    total: 'Tempo dalla comparsa dei numeri all’ultimo tocco giusto – come il cronometro in alto. Confrontalo solo con i tuoi giri con le stesse impostazioni sullo stesso dispositivo.',
    found: 'Il giro è stato interrotto prima della fine; questi sono i numeri trovati fino a quel momento.',
    perNumber: 'Tempo medio (mediana) da un numero al successivo, senza il primo numero.',
    errors: 'Tocchi su un altro numero non ancora trovato. Non costano tempo, ma contano per il livello. I tocchi a vuoto non contano.',
  },
  tips: {
    errors: 'Prima trova con sicurezza, poi tocca – uno sguardo in più evita errori, soprattutto se il numero si muove.',
    late: 'Verso la fine sei rallentato. Mantieni il ritmo con calma: cerca il numero, tocca, ripeti a bassa voce il prossimo.',
    system: 'Cerca con metodo, per esempio anello per anello dall’esterno verso l’interno – gli occhi possono muoversi liberamente.',
    great: 'Bel giro! La prossima volta gli anelli gireranno un po’ più veloci.',
  },
  feedback: {
    search: 'Cerca:',
    level: 'Livello',
    up: 'Livello successivo!',
    done: 'Fatto!',
    demoEnd: 'E così via fino all’ultimo numero',
    blocks: 'Tempo per blocco di dieci',
    blocksNote: 'Somma per ogni dieci numeri; il primo blocco comprende l’orientamento iniziale.',
    perNumber: 'per numero',
  },
  params: {
    count: { label: 'Quantità di numeri', hint: 'Quanti numeri ci sono nel campo (standard 40).', short: '{v} numero|{v} numeri' },
    tempo: { label: 'Velocità di rotazione', hint: 'Velocità degli anelli rispetto al livello (100 % = standard).' },
    counter: { label: 'In senso opposto', hint: 'Gli anelli vicini girano in direzioni opposte.', options: { on: 'Sì', off: 'No' } },
    sway: {
      label: 'Oscillazione',
      hint: 'Quanto oscillano i numeri attorno al proprio asse; restano sempre dritti.',
      options: { off: 'No', light: 'Leggera', normal: 'Normale', strong: 'Forte' },
    },
  },
  progression: [
    'Più facile: meno numeri, rotazione più lenta, oscillazione disattivata o tutti gli anelli nella stessa direzione.',
    'Più difficile: dopo un giro rapido con pochi errori il livello sale – gli anelli girano più veloci e in modo più diverso, i numeri oscillano di più.',
  ],
  cautions: [
    'Le immagini in movimento possono causare a qualcuno capogiri o malessere – in quel caso fai una pausa o riduci velocità e oscillazione. Con “Riduci movimento” nelle impostazioni di sistema gli anelli restano fermi.',
    'Non è un test né una diagnosi: i tempi servono solo per il confronto con te stesso sullo stesso dispositivo.',
  ],
};
