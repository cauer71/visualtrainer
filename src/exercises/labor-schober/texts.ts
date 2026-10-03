import type { ExerciseTexts } from '../../core/types';
import { ANA_FEEDBACK, ANA_PARAM_TEXTS, COMMON } from '../_shared/pruefung-texte';

// Funktionsübung der Marke „Labor“ nach dem Prinzip des klassischen Schober-Verfahrens (Rot-Grün-Brille), Texte in du-Form und
// einfacher Sprache. Regeln: kein Ersatz für die Untersuchung, keine Befunddeutung, keine Richtwerte, kein Wirkversprechen.
// PFLICHT: Der Satz „Vorzeichenregeln nur hergeleitet, nicht gegen ein Messgerät geprüft“ steht sichtbar in den Hinweisen
// (cautions), im „Für Neugierige“-Text und im Ergebnis (`signNote`).

const SIGN_DE = 'Vorzeichenregeln nur hergeleitet, nicht gegen ein Messgerät geprüft.';
const SIGN_IT = 'Regole dei segni solo derivate, non verificate con uno strumento di misura.';

export const de: ExerciseTexts = {
  title: 'Schober-Kreuz im Ring',
  tagline: 'Schiebe das Kreuz mit einem Auge in die Mitte des Rings.',
  steps: ['Rot-Grün-Brille auf, Raum eher dunkel.', 'Schiebe das Kreuz mit den Pfeilen.', 'Liegt es mittig im Ring: „Mittig“.'],
  why:
    'Beim Schober-Verfahren sieht jedes Auge ein eigenes Zeichen: das eine nur ein Kreuz, das andere nur einen Ring. Weil kein gemeinsames Bild die Augen zusammenhält, kann das Kreuz neben der Mitte des Rings erscheinen. Du schiebst es in kleinen Schritten, bis es für dich mittig liegt. Die App rechnet die Verschiebung in Prismendioptrien Δ um (1 Δ = 1 cm auf 1 m) und zeigt sie als Übungswert. ' +
    SIGN_DE +
    ' Die App deutet nichts als Befund, nennt keine Richtwerte und ersetzt keine Untersuchung. Ob die Übung für Alltag oder Sehen etwas bringt, ist nicht belegt.',
  goodFor: ['Zusammenspiel der Augen', 'Ruhiges Hinschauen', 'Feines Einstellen'],
  captions: {
    look: 'Ein Auge sieht das Kreuz, eins den Ring.',
    move: 'Schiebe das Kreuz mit den Pfeilen.',
    center: 'Liegt es mittig: „Mittig“.',
    done: 'Danach siehst du die Werte.',
  },
  metrics: { runs: 'Fertige Durchgänge', ms_mean: 'Zeit je Durchgang' },
  metricHints: {
    runs: 'Wie viele Durchgänge du abgeschlossen hast (je Richtung zwei, von entgegengesetzten Seiten). Das ist nur die Zahl deiner Eingaben, keine Leistung und kein Befund.',
    ms_mean: 'Mittlere Zeit von der Anzeige bis zu „Mittig“. Sie enthält die Verzögerung des Touch-Sensors; vergleiche nur auf demselben Gerät.',
  },
  tips: {
    bothSides: 'Von beiden Seiten zu kommen ist Absicht: Wer nur von einer Seite kommt, hört oft zu früh auf. Der Unterschied der beiden Durchgänge steht in den Werten.',
    limited: 'Der Bildschirm war zu klein für den eingestellten Startversatz, er wurde begrenzt. Der tatsächliche Wert steht in den Werten.',
  },
  feedback: {
    ...ANA_FEEDBACK.de,
    progress: '{axis} {n}/{total}',
    axisH: 'Waagerecht',
    axisV: 'Senkrecht',
    hint: 'Schiebe das Kreuz, bis es für dich genau in der Mitte des Rings liegt, dann „Mittig“.',
    center: 'Mittig',
    valuesTitle: 'Übungswerte (keine Deutung)',
    rowH: 'Waagerecht: Verschiebung des Kreuzes nach der hergeleiteten Regel',
    rowV: 'Senkrecht: Verschiebung des Kreuzes nach der hergeleiteten Regel',
    shiftValue: '{v} Δ',
    hText: '+ zur Nase hin (Eso-Richtung), − zur Schläfe hin (Exo-Richtung)',
    vText: '+ rechts höher, − links höher',
    diffText: 'Unterschied der beiden Durchgänge: {d} Δ',
    signTitle: 'Vorzeichenregeln',
    signRow: 'Hergeleitet, nicht geprüft',
    signValue: 'ohne Messgerät-Prüfung',
    signNote: SIGN_DE,
    signText:
      'Herleitung: Das Kreuz erscheint in Richtung der Abweichung des Auges versetzt, das es sieht, und wird zum Ausgleich zurückgeschoben. Waagerecht zählt eine Verschiebung zur Nase hin als Eso-Richtung (+), zur Schläfe hin als Exo-Richtung (−). Senkrecht zählt eine Verschiebung nach oben als „das Auge, das das Kreuz sieht, steht höher“ (+ rechts höher, − links höher).',
    setupTitle: 'Einstellung und Umrechnung',
    eyeRow: 'Das Kreuz sah',
    eyeValue: 'das {eye} (Glas: {lens})',
    eyeLeft: 'linke Auge',
    eyeRight: 'rechte Auge',
    convRow: 'Prismendioptrie Δ in cm',
    convValue: '1 Δ = 1 cm auf 1 m',
    convText: 'Bei {d} cm Abstand entspricht 1 Δ {cm} cm, das sind {px} Pixel.',
    startRow: 'Startversatz',
    startValue: '{v} Δ',
    startLimited: 'wegen der Bildschirmgröße auf {v} Δ begrenzt',
    notCalibrated: 'nicht kalibriert: nur eine Schätzung',
    valuesNote: `${COMMON.de.values} ${SIGN_DE}`,
  },
  progression: [
    'Gröber: Schrittweite 1 oder 2 Δ und ein größerer Ring.',
    'Feiner: Schrittweite 0,25 Δ. Die Auflösung des Bildschirms begrenzt sehr kleine Schritte.',
    'Mit der Richtung „waagerecht“ oder „senkrecht“ kannst du einen Durchlauf auf eine Richtung beschränken.',
    'Zum Vergleichen mit dir selbst: dieselben Einstellungen, derselbe Abstand, dieselbe Brille und dieselbe Farbzuordnung.',
  ],
  cautions: [
    SIGN_DE,
    COMMON.de.principle,
    'Stelle den Bildschirm gerade auf (sonst verfälscht eine Schräglage die senkrechte Richtung), kalibriere ihn und gib den echten Abstand an. Halte den Kopf gerade und ruhig, schaue auf die Mitte des Rings und dunkle den Raum eher ab.',
    'Die Auflösung des Bildschirms begrenzt die Feineinstellung; sehr kleine Werte sind unsicher. Zwei Durchgänge von entgegengesetzten Seiten zeigen, wie sicher deine Einstellung war.',
    COMMON.de.warn,
    COMMON.de.epilepsy,
    COMMON.de.colorBlind,
    COMMON.de.calm,
  ],
  params: {
    axes: {
      label: 'Richtungen',
      hint: 'Waagerecht und senkrecht: beide Richtungen nacheinander, je zweimal von entgegengesetzten Startseiten (vier Durchgänge). Oder nur eine Richtung (zwei Durchgänge).',
      options: { both: 'Waagerecht und senkrecht', horizontal: 'Nur waagerecht', vertical: 'Nur senkrecht' },
    },
    stepPd: {
      label: 'Schrittweite',
      hint: 'Wie weit ein Tastendruck das Kreuz verschiebt, in Prismendioptrien Δ (1 Δ = 1 cm auf 1 m). Der große Schritt ist das Vierfache.',
      short: 'Schritt {v} Δ',
    },
    startPd: {
      label: 'Startversatz',
      hint: 'Wie weit das Kreuz am Anfang neben der Mitte steht, in Δ. Er wird einmal nach der einen und einmal nach der anderen Seite gesetzt. Auf kleinen Bildschirmen wird er begrenzt.',
      short: 'Start {v} Δ',
    },
    crossColor: {
      label: 'Das Kreuz ist',
      hint: 'Welches Auge das Kreuz sieht: bei „Rot“ das Auge hinter dem roten Glas, sonst das Auge hinter dem anderen Glas. Der Ring wird dem anderen Auge gezeigt.',
      options: { red: 'rot (Ring in der zweiten Farbe)', second: 'in der zweiten Farbe (Ring rot)' },
    },
    sizeCm: { label: 'Ringdurchmesser', hint: 'Durchmesser des Rings in Zentimetern (nach Kalibrierung). Auf kleinen Bildschirmen wird er begrenzt.', short: '{v} cm' },
    ...ANA_PARAM_TEXTS.de,
  },
};

export const it: ExerciseTexts = {
  title: 'Croce e anello di Schober',
  tagline: 'Sposta la croce, vista da un occhio, al centro dell’anello.',
  steps: ['Occhiali rosso-verdi, stanza piuttosto buia.', 'Sposta la croce con le frecce.', 'Al centro dell’anello: «Al centro».'],
  why:
    'Nel metodo di Schober ogni occhio vede un segno proprio: uno solo una croce, l’altro solo un anello. Poiché nessuna immagine comune tiene insieme gli occhi, la croce può apparire accanto al centro dell’anello. La sposti a piccoli passi finché per te è al centro. L’app converte lo spostamento in diottrie prismatiche Δ (1 Δ = 1 cm a 1 m) e lo mostra come valore dell’esercizio. ' +
    SIGN_IT +
    ' L’app non interpreta nulla come referto, non indica valori di riferimento e non sostituisce una visita. Che l’esercizio serva alla vita quotidiana o alla vista non è dimostrato.',
  goodFor: ['Lavoro di squadra degli occhi', 'Guardare con calma', 'Regolare con precisione'],
  captions: {
    look: 'Un occhio vede la croce, uno l’anello.',
    move: 'Sposta la croce con le frecce.',
    center: 'Al centro: «Al centro».',
    done: 'Poi vedi i valori.',
  },
  metrics: { runs: 'Giri completati', ms_mean: 'Tempo per giro' },
  metricHints: {
    runs: 'Quanti giri hai completato (due per direzione, da lati opposti). È solo il numero delle tue immissioni, non una prestazione e non un referto.',
    ms_mean: 'Tempo medio dalla visualizzazione fino a «Al centro». Comprende il ritardo del sensore touch; confronta solo sullo stesso dispositivo.',
  },
  tips: {
    bothSides: 'Partire da entrambi i lati è voluto: chi parte solo da un lato spesso si ferma troppo presto. La differenza tra i due giri è indicata nei valori.',
    limited: 'Lo schermo era troppo piccolo per lo spostamento iniziale impostato, che è stato limitato. Il valore effettivo è indicato nei valori.',
  },
  feedback: {
    ...ANA_FEEDBACK.it,
    progress: '{axis} {n}/{total}',
    axisH: 'Orizzontale',
    axisV: 'Verticale',
    hint: 'Sposta la croce finché per te è esattamente al centro dell’anello, poi «Al centro».',
    center: 'Al centro',
    valuesTitle: 'Valori dell’esercizio (nessuna interpretazione)',
    rowH: 'Orizzontale: spostamento della croce secondo la regola derivata',
    rowV: 'Verticale: spostamento della croce secondo la regola derivata',
    shiftValue: '{v} Δ',
    hText: '+ verso il naso (direzione eso), − verso la tempia (direzione exo)',
    vText: '+ destro più alto, − sinistro più alto',
    diffText: 'Differenza tra i due giri: {d} Δ',
    signTitle: 'Regole dei segni',
    signRow: 'Derivate, non verificate',
    signValue: 'senza verifica con strumento',
    signNote: SIGN_IT,
    signText:
      'Derivazione: la croce appare spostata nella direzione della deviazione dell’occhio che la vede e per compensare viene riportata indietro. In orizzontale uno spostamento verso il naso conta come direzione eso (+), verso la tempia come direzione exo (−). In verticale uno spostamento verso l’alto conta come «l’occhio che vede la croce sta più in alto» (+ destro più alto, − sinistro più alto).',
    setupTitle: 'Impostazione e conversione',
    eyeRow: 'La croce era vista da',
    eyeValue: '{eye} (lente: {lens})',
    eyeLeft: 'occhio sinistro',
    eyeRight: 'occhio destro',
    convRow: 'Diottria prismatica Δ in cm',
    convValue: '1 Δ = 1 cm a 1 m',
    convText: 'A {d} cm di distanza 1 Δ corrisponde a {cm} cm, cioè {px} pixel.',
    startRow: 'Spostamento iniziale',
    startValue: '{v} Δ',
    startLimited: 'limitato a {v} Δ per le dimensioni dello schermo',
    notCalibrated: 'non calibrato: solo una stima',
    valuesNote: `${COMMON.it.values} ${SIGN_IT}`,
  },
  progression: [
    'Più grossolano: passo di 1 o 2 Δ e un anello più grande.',
    'Più fine: passo di 0,25 Δ. La risoluzione dello schermo limita i passi molto piccoli.',
    'Con la direzione «orizzontale» o «verticale» puoi limitare un giro a una direzione.',
    'Per confrontarti con te stesso: le stesse impostazioni, la stessa distanza, gli stessi occhiali e la stessa assegnazione dei colori.',
  ],
  cautions: [
    SIGN_IT,
    COMMON.it.principle,
    'Posiziona lo schermo dritto (altrimenti un’inclinazione falsa la direzione verticale), calibralo e indica la distanza reale. Tieni la testa dritta e ferma, guarda il centro dell’anello e oscura piuttosto la stanza.',
    'La risoluzione dello schermo limita la regolazione fine; valori molto piccoli sono incerti. Due giri da lati opposti mostrano quanto era sicura la tua regolazione.',
    COMMON.it.warn,
    COMMON.it.epilepsy,
    COMMON.it.colorBlind,
    COMMON.it.calm,
  ],
  params: {
    axes: {
      label: 'Direzioni',
      hint: 'Orizzontale e verticale: entrambe le direzioni una dopo l’altra, ciascuna due volte da lati di partenza opposti (quattro giri). Oppure una sola direzione (due giri).',
      options: { both: 'Orizzontale e verticale', horizontal: 'Solo orizzontale', vertical: 'Solo verticale' },
    },
    stepPd: {
      label: 'Ampiezza del passo',
      hint: 'Di quanto un tocco sposta la croce, in diottrie prismatiche Δ (1 Δ = 1 cm a 1 m). Il passo grande è il quadruplo.',
      short: 'Passo {v} Δ',
    },
    startPd: {
      label: 'Spostamento iniziale',
      hint: 'Quanto la croce all’inizio è lontana dal centro, in Δ. Viene impostato una volta da un lato e una volta dall’altro. Sugli schermi piccoli viene limitato.',
      short: 'Inizio {v} Δ',
    },
    crossColor: {
      label: 'La croce è',
      hint: 'Quale occhio vede la croce: con «Rossa» l’occhio dietro la lente rossa, altrimenti l’occhio dietro l’altra lente. L’anello viene mostrato all’altro occhio.',
      options: { red: 'rossa (anello nel secondo colore)', second: 'nel secondo colore (anello rosso)' },
    },
    sizeCm: { label: 'Diametro dell’anello', hint: 'Diametro dell’anello in centimetri (dopo la calibrazione). Sugli schermi piccoli viene limitato.', short: '{v} cm' },
    ...ANA_PARAM_TEXTS.it,
  },
};
