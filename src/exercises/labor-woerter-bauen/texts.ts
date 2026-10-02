import type { ExerciseTexts } from '../../core/types';

// Quelle: Labor-Prototyp (help/wordbuild.js), für Blickfit geglättet: du-Form, einfache Sprache, Fachwörter erklärt
// (Anagramm = Buchstaben eines Wortes in anderer Reihenfolge, Median erklärt).
// Streichungen gegenüber dem Prototyp: „Wer häufig vorkommende Buchstabengruppen als Einheit erkennt, löst schneller“ als
// Tatsachenbehauptung (nur noch als Tipp formuliert), „trainiert das Wortbild …“ (Wirkversprechen), die Behauptung, der Übungseffekt
// verschiebe sich auf das Wort (jetzt als „unsere Überlegung, nicht belegt“ gekennzeichnet).
// Die italienische Wortliste und die italienischen Texte wurden nicht von Muttersprachlerinnen oder Muttersprachlern geprüft.
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// `short` in params: Vorlage für die Kurzfassung der Einstellungen auf der Ergebnisseite ({v} = Wert; „|“ trennt die Form
// für genau 1 von der Form für andere Zahlen).

export const de: ExerciseTexts = {
  title: 'Wörter bauen',
  tagline: 'Buchstaben durcheinander – setze sie zu einem Wort zusammen.',
  steps: [
    'Unten liegen die Buchstaben, oben die leeren Felder.',
    'Tippe sie in der Reihenfolge an, die ein Wort ergibt.',
    'Falsch gelegt? „Zurück“ nimmt den letzten Buchstaben weg.',
  ],
  why:
    'Beim Umordnen von Buchstaben suchst du im Kopf nach einem passenden Wort – Wortbild, Reihenfolge der Buchstaben und Umstellen spielen dabei zusammen. In Studien zu Buchstabenrätseln hängt die Schwierigkeit unter anderem davon ab, welche Buchstabenpaare im Wort vorkommen. Ob sich das Üben auf Lesen, Schule oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Wörter', 'Umordnen', 'Konzentration'],
  captions: {
    ready: 'Gleich liegen Buchstaben bereit',
    order: 'Tippe die Buchstaben in der Reihenfolge',
    undo: 'Falsch gelegt? „Zurück“ nimmt ihn weg',
    solved: 'Fertig – gleich folgt das nächste Wort',
    count: 'Gezählt wird die Zeit pro Wort',
  },
  metrics: {
    solved: 'Gelöste Wörter',
    errors: 'Falsche Versuche',
    t_mean: 'Zeit pro Wort (Mittel)',
    t_median: 'Zeit pro Wort (Median)',
    total: 'Gesamtzeit',
    lpm: 'Buchstaben pro Minute',
  },
  metricHints: {
    solved: 'Wie viele Wörter du gelöst hast. Der Durchlauf endet erst, wenn alle Wörter gelöst sind – die Zahl steht deshalb fest und sagt nichts über deine Leistung. Als Hauptwert dient darum die Zeit pro Wort.',
    errors: 'Wie oft du alle Felder gefüllt, aber kein passendes Wort gelegt hast. Einen Buchstaben mit „Zurück“ wegzunehmen zählt nicht als Fehler.',
    t_mean: 'Durchschnittliche Zeit pro Wort, vom Erscheinen der Buchstaben bis zum richtigen Wort. Falsche Versuche kosten Zeit und sind enthalten. Kleiner heißt schneller. Die Zeit enthält die Verzögerung des Geräts und ist nur auf demselben Gerät mit denselben Einstellungen vergleichbar.',
    t_median: 'Der mittlere Wert, wenn man alle Wortzeiten der Größe nach ordnet: Die Hälfte der Wörter ging schneller, die Hälfte langsamer. Einzelne schwere Wörter ziehen ihn weniger als den Durchschnitt.',
    total: 'Summe der Zeiten aller Wörter, ohne die kurzen Pausen dazwischen.',
    lpm: 'Buchstaben der gelösten Wörter pro Minute, also das Gesamttempo. Vergleichbar nur bei gleicher Wortlänge und gleichen Einstellungen.',
  },
  tips: {
    errors: 'Du legst öfter ein Wort, das nicht passt. Suche vor dem Tippen den Anfang, das Ende und häufige Buchstabengruppen (zum Beispiel „sch“, „ei“, „st“).',
    slow: 'Die Wörter dauern lange. Mach es dir leichter: kürzere Wörter oder größere Kacheln – und ändere immer nur eine Einstellung.',
    harder: 'Ohne Fehler! Wenn du magst, mach genau eine Einstellung schwerer, zum Beispiel längere Wörter.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen, die dieselben Einstellungen hatten – auf diesem Gerät und in derselben Sprache.',
  },
  feedback: {
    prompt: 'Setze das Wort zusammen',
    wrong: 'Kein passendes Wort – die Buchstaben gehen zurück',
    undo: 'Zurück',
    label: 'Wort {i} von {n} · Fehler {e}',
    solvedOf: '{a} von {b}',
    slowest: 'Langsamstes Wort',
    moreTitle: 'Weitere Werte',
    moreNote: 'Die Zeit enthält auch die Verzögerung von Bildschirm und Touch-Sensor. Die Wörter richten sich nach der Sprache der App: Vergleiche nur Läufe in derselben Sprache.',
  },
  progression: [
    'Leichter: kürzere Wörter (3 bis 4 Buchstaben), größere Kacheln, weniger Wörter.',
    'Schwerer: längere Wörter (6 bis 8 Buchstaben) und mehr Wörter am Stück.',
    'Ziel: die Zeit pro Wort senken und falsche Versuche vermeiden – im Vergleich mit dir selbst, bei gleichen Einstellungen.',
    'Ändere immer nur eine Einstellung auf einmal. Die Wortliste ist klein, nach einiger Zeit erkennst du Wörter wieder. Dass dann auch die Zeit sinkt, ist unsere Überlegung; belegt ist es für diese Übung nicht.',
  ],
  cautions: [
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“), damit die Kachelgröße in Zentimetern stimmt. Auf schmalen Bildschirmen werden die Kacheln kleiner.',
    'Die Wörter stammen aus einer kleinen eigenen Liste häufiger Hauptwörter und richten sich nach der Sprache der App. Ergebnisse in Deutsch und Italienisch vergleichst du nicht miteinander.',
    'Es zählt jedes Wort der Liste aus denselben Buchstaben. Dein Wort kann also ein anderes sein als das, das wir im Sinn hatten.',
    'Die App misst nur dein Tippen, nicht, ob du das Wort richtig aussprichst oder liest.',
    'Fällt dir Lesen oder Schreiben schwer, wähle kurze und wenige Wörter und mach Pausen. Bei Kopfschmerzen oder Augenbrennen: aufhören.',
  ],
  params: {
    wordLength: {
      label: 'Wortlänge',
      hint: 'Anzahl der Buchstaben je Wort. Für jede Länge gibt es mehrere Wörter. Längere Wörter sind meist schwerer.',
      short: '{v} Buchstaben',
    },
    words: {
      label: 'Anzahl der Wörter',
      hint: 'Wie viele Wörter du in einem Durchlauf löst. Er endet nach dem letzten Wort. Bei vielen Wörtern kommen einzelne mehrmals vor.',
      short: '{v} Wort|{v} Wörter',
    },
    tileCm: {
      label: 'Größe der Kacheln',
      hint: 'Kantenlänge einer Kachel in Zentimetern. Auf schmalen Bildschirmen werden die Kacheln kleiner, damit alle Buchstaben nebeneinander passen.',
    },
    sound: {
      label: 'Ton',
      hint: 'Kurzer Ton beim Tippen, bei einem richtigen Wort und bei einem Fehler. Der Ton ändert die Vergleichbarkeit nicht.',
      options: { no: 'Aus', yes: 'An' },
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Costruisci parole',
  tagline: 'Lettere in disordine – mettile insieme in una parola.',
  steps: [
    'Sotto ci sono le lettere, sopra i campi vuoti.',
    'Toccale nell’ordine che forma una parola.',
    'Sbagliato? “Indietro” toglie l’ultima lettera.',
  ],
  why:
    'Quando riordini le lettere cerchi a mente una parola adatta – immagine della parola, ordine delle lettere e spostamenti lavorano insieme. Negli studi sugli indovinelli di lettere la difficoltà dipende, tra l’altro, da quali coppie di lettere compaiono nella parola. Non è dimostrato che l’esercizio si trasferisca alla lettura, alla scuola o alla vita quotidiana.',
  goodFor: ['Parole', 'Riordinare', 'Concentrazione'],
  captions: {
    ready: 'Tra poco ci sono le lettere',
    order: 'Tocca le lettere nell’ordine giusto',
    undo: 'Sbagliato? “Indietro” la toglie',
    solved: 'Fatto – ora la parola successiva',
    count: 'Conta il tempo per parola',
  },
  metrics: {
    solved: 'Parole risolte',
    errors: 'Tentativi sbagliati',
    t_mean: 'Tempo per parola (media)',
    t_median: 'Tempo per parola (mediana)',
    total: 'Tempo totale',
    lpm: 'Lettere al minuto',
  },
  metricHints: {
    solved: 'Quante parole hai risolto. Il giro finisce solo quando tutte le parole sono risolte – il numero è quindi fisso e non dice nulla sulla tua prestazione. Come valore principale c’è perciò il tempo per parola.',
    errors: 'Quante volte hai riempito tutti i campi senza formare una parola adatta. Togliere una lettera con “Indietro” non conta come errore.',
    t_mean: 'Tempo medio per parola, da quando compaiono le lettere alla parola giusta. I tentativi sbagliati costano tempo e sono compresi. Più basso significa più veloce. Il tempo comprende il ritardo del dispositivo ed è confrontabile solo sullo stesso dispositivo con le stesse impostazioni.',
    t_median: 'Il valore centrale quando si ordinano tutti i tempi per grandezza: metà delle parole è stata più veloce, metà più lenta. Le singole parole difficili lo spostano meno della media.',
    total: 'Somma dei tempi di tutte le parole, senza le brevi pause tra l’una e l’altra.',
    lpm: 'Lettere delle parole risolte al minuto, cioè il ritmo complessivo. Confrontabile solo con la stessa lunghezza delle parole e le stesse impostazioni.',
  },
  tips: {
    errors: 'Metti spesso una parola che non va. Prima di toccare cerca l’inizio, la fine e i gruppi di lettere frequenti (per esempio “sc”, “gl”, “ch”).',
    slow: 'Le parole richiedono molto tempo. Facilitati il compito: parole più corte o tessere più grandi – e cambia sempre una sola impostazione.',
    harder: 'Senza errori! Se vuoi, rendi più difficile una sola impostazione, per esempio parole più lunghe.',
    compare: 'Confronta questo giro solo con giri che avevano le stesse impostazioni – su questo dispositivo e nella stessa lingua.',
  },
  feedback: {
    prompt: 'Forma la parola',
    wrong: 'Nessuna parola adatta – le lettere tornano indietro',
    undo: 'Indietro',
    label: 'Parola {i} di {n} · Errori {e}',
    solvedOf: '{a} su {b}',
    slowest: 'Parola più lenta',
    moreTitle: 'Altri valori',
    moreNote: 'Il tempo comprende anche il ritardo di schermo e sensore touch. Le parole seguono la lingua dell’app: confronta solo giri nella stessa lingua.',
  },
  progression: [
    'Più facile: parole più corte (3 o 4 lettere), tessere più grandi, meno parole.',
    'Più difficile: parole più lunghe (da 6 a 8 lettere) e più parole di seguito.',
    'Obiettivo: ridurre il tempo per parola ed evitare tentativi sbagliati – in confronto con te stesso, con le stesse impostazioni.',
    'Cambia sempre una sola impostazione alla volta. L’elenco di parole è piccolo, dopo un po’ riconosci le parole. Che allora anche il tempo diminuisca è una nostra ipotesi; per questo esercizio non è dimostrato.',
  ],
  cautions: [
    'Imposta lo schermo una volta (“Calibra lo schermo”), così la grandezza delle tessere in centimetri è giusta. Sugli schermi stretti le tessere diventano più piccole.',
    'Le parole provengono da un piccolo elenco proprio di sostantivi frequenti e seguono la lingua dell’app. I risultati in tedesco e in italiano non si confrontano tra loro. L’elenco italiano non è stato controllato da madrelingua.',
    'Conta ogni parola dell’elenco formata dalle stesse lettere. La tua parola può quindi essere diversa da quella che avevamo in mente.',
    'L’app misura solo il tuo tocco, non se pronunci o leggi la parola correttamente.',
    'Se leggere o scrivere ti costa fatica, scegli poche parole corte e fai delle pause. In caso di mal di testa o bruciore agli occhi: smetti.',
  ],
  params: {
    wordLength: {
      label: 'Lunghezza della parola',
      hint: 'Numero di lettere per parola. Per ogni lunghezza ci sono più parole. Le parole più lunghe sono di solito più difficili.',
      short: '{v} lettere',
    },
    words: {
      label: 'Numero di parole',
      hint: 'Quante parole risolvi in un giro. Finisce dopo l’ultima parola. Con molte parole alcune compaiono più volte.',
      short: '{v} parola|{v} parole',
    },
    tileCm: {
      label: 'Grandezza delle tessere',
      hint: 'Lato di una tessera in centimetri. Sugli schermi stretti le tessere diventano più piccole, così tutte le lettere stanno una accanto all’altra.',
    },
    sound: {
      label: 'Suono',
      hint: 'Breve suono quando tocchi, con una parola giusta e con un errore. Il suono non cambia la confrontabilità.',
      options: { no: 'Spento', yes: 'Acceso' },
    },
  },
};
