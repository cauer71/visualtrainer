import type { ExerciseTexts } from '../../core/types';

// Quelle: Labor-Prototyp (help/chart.js), für Blickfit geglättet: du-Form, einfache Sprache, Fachwörter erklärt
// („Crowding“ → Gedränge, „Sakkaden“ → Blickwechsel, „Streuung/Mittel“ erklärt).
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// Aus dem Prototyp NICHT übernommen: „Die Übung schult Blicksprünge, Lesefluss und das Erkennen von Zeichen im Gedränge“
// (Wirkversprechen), „die Tafel wirkt besonders, wenn man die Zeichen im Augenwinkel mitnimmt“ und „Gleichmäßigkeit … ist eine
// einfache Kennzahl für flüssiges Lesen“ (nicht belegt). Die Faustregeln unter „So wird es leichter/schwerer“ sind eigene Festlegungen.
// `short` in params: Vorlage für die Kurzfassung der Einstellungen auf der Ergebnisseite ({v} = Wert).

export const de: ExerciseTexts = {
  title: 'Buchstabentafel',
  tagline: 'Lies eine Buchstabentafel Zeichen für Zeichen – im eigenen Tempo oder im Takt.',
  steps: [
    'Eine Marke zeigt das nächste Zeichen – lies es laut.',
    'Eigenes Tempo: Tippe irgendwo, die Marke springt weiter.',
    'Im Takt springt die Marke von selbst weiter.',
  ],
  why:
    'Du liest eine Tafel aus Zeichengruppen Schritt für Schritt: Eine Marke zeigt das nächste Zeichen, du sprichst es laut aus. Im eigenen Tempo misst die App die Zeit von Zeichen zu Zeichen, im Takt gibt der Takt das Tempo vor. Ob du jedes Zeichen wirklich gelesen hast, wohin du schaust und ob du laut liest, kann die App nicht erkennen. Ob sich das Üben auf Lesen, Alltag, Sport oder Verkehr überträgt, ist nicht belegt.',
  goodFor: ['Blickwechsel', 'Zeichen im Gedränge', 'Gleichmäßiges Tempo'],
  captions: {
    wait: 'Tippen startet die Tafel',
    read: 'Markiertes Zeichen laut lesen',
    next: 'Dann tippen: Die Marke springt weiter',
    count: 'Gemessen wird die Zeit für die Tafel',
  },
  metrics: {
    symbols: 'Gelesene Zeichen',
    total: 'Gesamtzeit',
    per_min: 'Zeichen pro Minute',
    step_mean: 'Zeit pro Zeichen (Mittel)',
    step_sd: 'Zeit pro Zeichen (Streuung)',
    step_cv: 'Gleichmäßigkeit (Streuung zu Mittel)',
    bpm: 'Takt (Schläge pro Minute)',
    scale: 'Tafel verkleinert auf',
  },
  metricHints: {
    symbols: 'Anzahl der Zeichen auf der Tafel, die du Schritt für Schritt gelesen hast.',
    total:
      'Zeit vom ersten bis zum letzten Zeichen. Im eigenen Tempo hängt sie von dir ab; im Takt steht sie durch Zeichenzahl und Takt fest und sagt nichts über dich. Vergleiche nur bei gleichen Einstellungen.',
    per_min: 'Gelesene Zeichen pro Minute, gerechnet aus der Gesamtzeit. Im Takt entspricht der Wert dem Takt.',
    step_mean: 'Nur im eigenen Tempo: durchschnittliche Zeit zwischen zwei Tipps, also pro Zeichen.',
    step_sd: 'Nur im eigenen Tempo: wie stark die Zeiten pro Zeichen schwanken (Standardabweichung).',
    step_cv:
      'Nur im eigenen Tempo: Streuung geteilt durch den Mittelwert, in Prozent. Kleinere Werte bedeuten gleichmäßigere Zeiten von Zeichen zu Zeichen. Das ist eine einfache Kennzahl der App, keine Bewertung deines Lesens.',
    bpm: 'Nur im Takt: der eingestellte Takt in Schlägen pro Minute.',
    scale: 'Nur wenn die Tafel nicht ins Feld passte: auf wie viel Prozent der eingestellten Größe sie verkleinert wurde. Zeichen und Abstände waren dann kleiner als eingestellt.',
  },
  tips: {
    quick: 'Du tippst sehr schnell weiter. Lies jedes markierte Zeichen vollständig laut, bevor du tippst – ob du es tust, kann die App nicht prüfen, das liegt bei dir.',
    uneven: 'Deine Zeiten von Zeichen zu Zeichen schwanken ziemlich. Versuche einen ruhigen, gleichmäßigen Rhythmus – er ist wichtiger als einzelne schnelle Schritte.',
    beat: 'Im Takt zählt nicht, wie schnell du bist: Der Takt bestimmt das Tempo. Kommst du nicht mit, probiere einen langsameren Takt oder eine kleinere Tafel.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen, die dieselbe Tafel und dieselben Einstellungen hatten – auf diesem Gerät.',
  },
  feedback: {
    startSelf: 'Tippe irgendwo zum Start. Danach tippst du bei jedem gelesenen Zeichen.',
    ready: 'Gleich springt die Marke im Takt weiter. Lies jedes markierte Zeichen laut.',
    shrunk: 'Tafel verkleinert, damit sie passt ({p} %)',
    progress: '{a} / {b}',
    moreTitle: 'Weitere Werte',
    moreNote:
      'Gemessen wird nur, wann du tippst (oder der Takt springt) – nicht, ob du jedes Zeichen gelesen hast, wohin du schaust und ob du laut liest. Vergleiche nur mit deinen eigenen Werten auf diesem Gerät und bei gleichen Einstellungen.',
  },
  progression: [
    'Leichter: weniger Gruppen (3 × 3), nur 1 oder 2 Zeichen je Gruppe, größere Zeichen (3 cm), größere Abstände, „Gruppe für Gruppe“, eigenes Tempo oder langsamer Takt (40 bis 50).',
    'Schwerer: größere Tafel (5 × 6), 4 bis 5 Zeichen je Gruppe, kleinere Zeichen (1 bis 1,5 cm), kleine Abstände zwischen den Zeichen (mehr Gedränge), „Erst alle ersten Zeichen …“, schneller Takt (70 bis 100).',
    'Passt die Tafel nicht ins Feld, wird sie automatisch verkleinert; das siehst du am Hinweis unten und im Ergebnis.',
    'Unser Vorschlag (keine Vorgabe aus der Forschung): im eigenen Tempo Gesamtzeit und Gleichmäßigkeit mit dir selbst vergleichen – bei gleicher Tafel und gleichem Abstand zum Bildschirm.',
  ],
  cautions: [
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“) und gib deinen Abstand an, damit Zeichen- und Abstandsgrößen in Zentimetern stimmen. Passt die Tafel nicht ins Feld, wird sie verkleinert.',
    'Sitz etwa 50 bis 60 cm vor dem Bildschirm; der Kopf bleibt ruhig, nur die Augen wandern. Wähle einen Raum, in dem du laut sprechen kannst; wer nicht laut spricht, liest leise innerlich mit.',
    'Gemessen wird nur, wann du tippst (oder der Takt springt). Ob du jedes Zeichen wirklich gelesen hast, wohin du schaust und ob du laut liest, kann die App nicht messen – im eigenen Tempo kann man auch einfach durchtippen. Das liegt bei dir.',
    'Im Takt wechselt die Marke höchstens etwa 2,3 Mal pro Sekunde, weich überblendet und ohne Blinken. Im eigenen Tempo werden Tipps im Abstand unter etwa 0,3 Sekunden als Doppeltipp ignoriert. Bist du lichtempfindlich oder hattest du schon einmal einen epileptischen Anfall, verzichte bitte darauf.',
    'Zeichen, die dicht beieinanderstehen, sind schwerer zu erkennen (Gedränge). Kneif bei sehr kleinen Zeichen nicht die Augen zusammen, sondern vergrößere sie lieber.',
    'Brennen die Augen oder entsteht Kopfschmerz, mach eine Pause. Treten Doppelbilder auf, brich ab und lass sie abklären.',
  ],
  params: {
    rows: {
      label: 'Zeilen (Gruppen)',
      hint: 'Wie viele Zeilen mit Zeichengruppen die Tafel hat.',
      short: '{v} Zeilen',
    },
    cols: {
      label: 'Spalten (Gruppen)',
      hint: 'Wie viele Spalten mit Zeichengruppen die Tafel hat.',
      short: '{v} Spalten',
    },
    groupSize: {
      label: 'Zeichen je Gruppe',
      hint: 'Wie viele Zeichen eine Gruppe hat. Mehr Zeichen verlängern die Tafel und verstärken das Gedränge.',
      short: '{v} Zeichen je Gruppe',
    },
    symbols: {
      label: 'Zeichen',
      hint: 'Buchstaben oder Ziffern 1 bis 9. Innerhalb einer Gruppe kommt jedes Zeichen nur einmal vor.',
      options: { letters: 'Buchstaben', digits: 'Ziffern' },
    },
    sizeCm: {
      label: 'Zeichenhöhe',
      hint: 'Höhe der Zeichen in Zentimetern. Passt die Tafel nicht ins Feld, wird sie verkleinert.',
      short: '{v} cm hoch',
    },
    letterGapCm: {
      label: 'Abstand zwischen Zeichen',
      hint: 'Abstand zwischen den Zeichen einer Gruppe. Kleinere Abstände verstärken das Gedränge: Dicht stehende Zeichen sind schwerer zu erkennen.',
    },
    groupGapCm: {
      label: 'Abstand zwischen Gruppen',
      hint: 'Abstand zwischen den Gruppen. Größere Abstände verlangen weitere Blickwechsel.',
    },
    order: {
      label: 'Leseordnung',
      hint: '„Gruppe für Gruppe“: erst alle Zeichen der ersten Gruppe, dann der zweiten und so weiter. „Erst alle ersten Zeichen …“: Pro Durchgang durch die Tafel liest du jeweils eine Position jeder Gruppe.',
      options: { groups: 'Gruppe für Gruppe', letterwise: 'Erst alle ersten Zeichen, dann alle zweiten …' },
    },
    pace: {
      label: 'Tempo',
      hint: '„Eigenes Tempo“: Du tippst, wenn du ein Zeichen gelesen hast. „Takt“: Die Marke springt im eingestellten Takt von selbst weiter.',
      options: { self: 'Eigenes Tempo (Tippen = weiter)', beat: 'Takt (Metronom)' },
    },
    bpm: {
      label: 'Takt (Schläge pro Minute)',
      hint: 'Schläge pro Minute beim Takt. Höchstens 140 – das sind etwa 2,3 Markenwechsel pro Sekunde. Wirkt nur bei „Takt“.',
    },
    sound: {
      label: 'Ton',
      hint: 'Im Takt ein leiser Ton bei jedem Schlag, im eigenen Tempo ein kurzer Ton beim Tippen. Ist der Ton der App ausgeschaltet, bleibt es still. Der Ton ändert die Vergleichbarkeit nicht.',
      options: { yes: 'An', no: 'Aus' },
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Tavola di lettere',
  tagline: 'Leggi una tavola di lettere segno per segno – al tuo ritmo o a tempo.',
  steps: [
    'Un indicatore mostra il segno: leggilo a voce alta.',
    'Ritmo proprio: tocca ovunque, l’indicatore avanza.',
    'A tempo l’indicatore avanza da solo.',
  ],
  why:
    'Leggi una tavola di gruppi di segni passo dopo passo: un indicatore mostra il segno successivo, tu lo pronunci a voce alta. Al tuo ritmo l’app misura il tempo da segno a segno, a tempo è il ritmo a dare la velocità. Se hai letto davvero ogni segno, dove guardi e se leggi a voce alta, l’app non può rilevarlo. Non è dimostrato che l’allenamento si trasferisca alla lettura, alla vita quotidiana, allo sport o al traffico.',
  goodFor: ['Cambi di sguardo', 'Segni ravvicinati', 'Ritmo regolare'],
  captions: {
    wait: 'Toccare avvia la tavola',
    read: 'Leggi il segno indicato a voce alta',
    next: 'Poi tocca: l’indicatore avanza',
    count: 'Si misura il tempo per la tavola',
  },
  metrics: {
    symbols: 'Segni letti',
    total: 'Tempo totale',
    per_min: 'Segni al minuto',
    step_mean: 'Tempo per segno (media)',
    step_sd: 'Tempo per segno (variazione)',
    step_cv: 'Regolarità (variazione rispetto alla media)',
    bpm: 'Ritmo (battiti al minuto)',
    scale: 'Tavola ridotta al',
  },
  metricHints: {
    symbols: 'Numero di segni della tavola che hai letto passo dopo passo.',
    total:
      'Tempo dal primo all’ultimo segno. Al tuo ritmo dipende da te; a tempo è fissato da numero di segni e ritmo e non dice nulla su di te. Confronta solo con le stesse impostazioni.',
    per_min: 'Segni letti al minuto, calcolati dal tempo totale. A tempo il valore corrisponde al ritmo.',
    step_mean: 'Solo al tuo ritmo: tempo medio tra due tocchi, cioè per segno.',
    step_sd: 'Solo al tuo ritmo: quanto variano i tempi per segno (deviazione standard).',
    step_cv:
      'Solo al tuo ritmo: variazione divisa per la media, in percentuale. Valori più piccoli indicano tempi più regolari da segno a segno. È un semplice indicatore dell’app, non una valutazione della tua lettura.',
    bpm: 'Solo a tempo: il ritmo impostato in battiti al minuto.',
    scale: 'Solo se la tavola non entrava nell’area: a quale percentuale della dimensione impostata è stata ridotta. Segni e distanze erano allora più piccoli del previsto.',
  },
  tips: {
    quick: 'Vai avanti molto in fretta. Leggi ogni segno indicato per intero a voce alta prima di toccare – se lo fai, l’app non può verificarlo, dipende da te.',
    uneven: 'I tuoi tempi da segno a segno variano parecchio. Prova un ritmo calmo e regolare – conta più di singoli passi veloci.',
    beat: 'A tempo non conta quanto sei veloce: è il ritmo a decidere la velocità. Se non riesci a seguire, prova un ritmo più lento o una tavola più piccola.',
    compare: 'Confronta questo giro solo con giri che avevano la stessa tavola e le stesse impostazioni – su questo dispositivo.',
  },
  feedback: {
    startSelf: 'Tocca ovunque per iniziare. Poi tocca a ogni segno letto.',
    ready: 'Tra poco l’indicatore avanza a tempo. Leggi ogni segno indicato a voce alta.',
    shrunk: 'Tavola ridotta per farla entrare ({p} %)',
    progress: '{a} / {b}',
    moreTitle: 'Altri valori',
    moreNote:
      'Viene misurato solo quando tocchi (o quando il ritmo avanza) – non se hai letto ogni segno, dove guardi e se leggi a voce alta. Confronta solo con i tuoi valori su questo dispositivo e con le stesse impostazioni.',
  },
  progression: [
    'Più facile: meno gruppi (3 × 3), solo 1 o 2 segni per gruppo, segni più grandi (3 cm), distanze maggiori, “Gruppo per gruppo”, ritmo proprio o ritmo lento (da 40 a 50).',
    'Più difficile: tavola più grande (5 × 6), da 4 a 5 segni per gruppo, segni più piccoli (da 1 a 1,5 cm), distanze piccole tra i segni (più affollamento), “Prima tutti i primi segni …”, ritmo veloce (da 70 a 100).',
    'Se la tavola non entra nell’area, viene ridotta automaticamente; lo vedi dall’avviso in basso e nel risultato.',
    'La nostra proposta (non è un’indicazione della ricerca): al tuo ritmo confronta tempo totale e regolarità con te stesso – con la stessa tavola e la stessa distanza dallo schermo.',
  ],
  cautions: [
    'Calibra lo schermo una volta (“Calibra lo schermo”) e indica la tua distanza, così le dimensioni di segni e distanze in centimetri sono corrette. Se la tavola non entra nell’area, viene ridotta.',
    'Siediti a circa 50–60 cm dallo schermo; la testa resta ferma, si muovono solo gli occhi. Scegli un ambiente in cui puoi parlare ad alta voce; chi non parla ad alta voce legge mentalmente.',
    'Viene misurato solo quando tocchi (o quando il ritmo avanza). Se hai letto davvero ogni segno, dove guardi e se leggi a voce alta, l’app non può misurarlo – al tuo ritmo si può anche solo toccare di seguito. Dipende da te.',
    'A tempo l’indicatore cambia al massimo circa 2,3 volte al secondo, con dissolvenza morbida e senza lampeggiare. Al tuo ritmo i tocchi a meno di circa 0,3 secondi di distanza vengono ignorati come doppio tocco. Se sei fotosensibile o hai già avuto una crisi epilettica, non eseguire l’esercizio.',
    'I segni molto ravvicinati sono più difficili da riconoscere (affollamento). Con segni molto piccoli non stringere gli occhi, ma ingrandiscili.',
    'Se gli occhi bruciano o viene mal di testa, fai una pausa. Se compaiono immagini doppie, interrompi e fai chiarire la cosa.',
  ],
  params: {
    rows: {
      label: 'Righe (gruppi)',
      hint: 'Quante righe di gruppi di segni ha la tavola.',
      short: '{v} righe',
    },
    cols: {
      label: 'Colonne (gruppi)',
      hint: 'Quante colonne di gruppi di segni ha la tavola.',
      short: '{v} colonne',
    },
    groupSize: {
      label: 'Segni per gruppo',
      hint: 'Quanti segni ha un gruppo. Più segni allungano la tavola e aumentano l’affollamento.',
      short: '{v} segni per gruppo',
    },
    symbols: {
      label: 'Segni',
      hint: 'Lettere o cifre da 1 a 9. All’interno di un gruppo ogni segno compare una sola volta.',
      options: { letters: 'Lettere', digits: 'Cifre' },
    },
    sizeCm: {
      label: 'Altezza dei segni',
      hint: 'Altezza dei segni in centimetri. Se la tavola non entra nell’area, viene ridotta.',
      short: '{v} cm di altezza',
    },
    letterGapCm: {
      label: 'Distanza tra i segni',
      hint: 'Distanza tra i segni di un gruppo. Distanze più piccole aumentano l’affollamento: i segni ravvicinati sono più difficili da riconoscere.',
    },
    groupGapCm: {
      label: 'Distanza tra i gruppi',
      hint: 'Distanza tra i gruppi. Distanze maggiori richiedono cambi di sguardo più ampi.',
    },
    order: {
      label: 'Ordine di lettura',
      hint: '“Gruppo per gruppo”: prima tutti i segni del primo gruppo, poi del secondo e così via. “Prima tutti i primi segni …”: a ogni passaggio sulla tavola leggi una posizione di ogni gruppo.',
      options: { groups: 'Gruppo per gruppo', letterwise: 'Prima tutti i primi segni, poi tutti i secondi …' },
    },
    pace: {
      label: 'Ritmo',
      hint: '“Ritmo proprio”: tocchi quando hai letto un segno. “A tempo”: l’indicatore avanza da solo al ritmo impostato.',
      options: { self: 'Ritmo proprio (tocco = avanti)', beat: 'A tempo (metronomo)' },
    },
    bpm: {
      label: 'Ritmo (battiti al minuto)',
      hint: 'Battiti al minuto a tempo. Al massimo 140 – circa 2,3 cambi di indicatore al secondo. Vale solo con “A tempo”.',
    },
    sound: {
      label: 'Suono',
      hint: 'A tempo un suono lieve a ogni battito, al tuo ritmo un breve suono al tocco. Se il suono dell’app è spento, resta silenzio. Il suono non cambia la confrontabilità.',
      options: { yes: 'Sì', no: 'No' },
    },
  },
};
