import type { ExerciseTexts } from '../../core/types';
import { COMMON } from '../_shared/pruefung-texte';

// Funktionsübung der Marke „Labor“ (Auge-Hand-Projektion eines gesehenen Ortes), keine Brille nötig. Texte in du-Form und einfacher
// Sprache. Regeln: kein Ersatz für die Untersuchung, keine Befunddeutung, keine Richtwerte, kein Wirkversprechen; gezeigt werden
// Übungswerte (Abstand, Verschiebung, Streuung in cm und Grad). Der Punkt erscheint nur einzeln und kurz (kein Flackern).

const EPILEPSY_DE =
  'Bei bekannter photosensitiver Epilepsie nur nach Rücksprache mit der behandelnden Ärztin oder dem behandelnden Arzt üben. Der Punkt erscheint nur einzeln und kurz, nie mehrmals pro Sekunde; es gibt kein Flackern.';
const EPILEPSY_IT =
  'In caso di epilessia fotosensibile nota esercitati solo dopo aver parlato con il medico che ti segue. Il punto compare solo singolarmente e per poco, mai più volte al secondo; non c’è sfarfallio.';

export const de: ExerciseTexts = {
  title: 'Orts-Projektion',
  tagline: 'Ein Punkt erscheint kurz: tippe dorthin, wo er war.',
  steps: ['Schaue auf das Kreuz in der Mitte.', 'Ein Punkt erscheint kurz und verschwindet.', 'Tippe dorthin, wo er war.'],
  why:
    'Wenn du nach einem gesehenen Ort greifst oder zeigst, muss dein Gehirn den Ort im Blickfeld in eine Zeigebewegung übersetzen. In dieser Funktionsübung erscheint ein Punkt kurz, während du ein Kreuz in der Mitte ansiehst, und verschwindet; nach einer Wartezeit, die du einstellen kannst, tippst du dorthin, wo er war. Die App zeigt, wie weit deine Antworten vom Punkt lagen, ob sie im Mittel in eine Richtung verschoben waren und wie stark sie streuten (Übungswerte in Zentimetern und Grad). Sie deutet das nicht und ersetzt keine Untersuchung; auch Gerät, Haltung und Aufmerksamkeit spielen eine Rolle. Ob die Übung für Alltag oder Sehen etwas bringt, ist nicht belegt.',
  goodFor: ['Auge und Hand', 'Orte merken', 'Ruhiges Hinschauen'],
  captions: {
    look: 'Schaue auf das Kreuz in der Mitte.',
    flash: 'Ein Punkt erscheint kurz.',
    tap: 'Tippe dorthin, wo er war.',
    done: 'Danach siehst du die Werte.',
  },
  metrics: { n: 'Beantwortete Punkte', rt_mean: 'Zeit bis zur Antwort' },
  metricHints: {
    n: 'Wie viele Punkte du beantwortet hast. Das ist nur die Zahl deiner Eingaben, keine Leistung und kein Befund.',
    rt_mean: 'Mittlere Zeit von der Freigabe der Antwort bis zum Tippen. Sie enthält die Verzögerung des Touch-Sensors; vergleiche nur auf demselben Gerät und mit denselben Einstellungen.',
  },
  tips: {
    calm: 'Bleibe mit dem Blick auf dem Kreuz, auch wenn der Punkt am Rand erscheint, und tippe nach dem ersten Eindruck, ohne lange zu überlegen.',
    more: 'Mit wenigen Punkten sind Mittel und Streuung unsicher. Mehr Punkte (30 bis 40) zeigen genauer, wie deine Antworten verteilt sind.',
  },
  feedback: {
    progress: 'Punkt {n} / {total}',
    ask: 'Tippe dorthin, wo der Punkt war.',
    valuesTitle: 'Übungswerte (keine Deutung)',
    rowErr: 'Mittlere Abweichung der Antworten',
    errValue: '{v} cm',
    rowErrDeg: 'Mittlere Abweichung als Sehwinkel',
    degValue: '{v} °',
    degText: 'bei {d} cm Abstand',
    rowBiasX: 'Mittlere seitliche Verschiebung der Antworten',
    biasXText: '+ = nach rechts verschoben, − = nach links',
    rowBiasY: 'Mittlere senkrechte Verschiebung der Antworten',
    biasYText: '+ = nach oben verschoben, − = nach unten',
    rowScatter: 'Streuung der Antworten',
    scatterText: 'Streuung um den eigenen Mittelpunkt der Antworten',
    setupTitle: 'Einstellungen dieses Durchlaufs',
    rowFlash: 'Anzeigedauer des Punktes',
    flashValue: '{v} ms',
    flashText: 'Anzeigedauern hängen an der Bildwiederholrate des Bildschirms (bei 60 Hz etwa 17 ms je Bild)',
    rowDelay: 'Wartezeit bis zum Tippen',
    delayNone: 'keine',
    rowZone: 'Zone',
    zoneAll: 'gesamte Fläche',
    zonePeriphery: 'nur Rand',
    rowShow: 'Ort nach der Antwort gezeigt',
    showYes: 'ja',
    showNo: 'nein',
    notCalibrated: 'nicht kalibriert: Zentimeter und Grad nur geschätzt',
    unitCm: '{v} cm',
    valuesNote: `${COMMON.de.values} Die App kann nicht prüfen, ob dein Blick in der Mitte geblieben ist.`,
    fewNote: COMMON.de.fewValues,
  },
  progression: [
    'Leichter: lange Anzeige (500 bis 1.000 ms), keine Wartezeit, ganze Fläche, Ort nach der Antwort zeigen.',
    'Schwieriger: kurze Anzeige (100 bis 150 ms), Wartezeit (2.000 bis 5.000 ms), Zone „Nur Rand“, Ort nicht zeigen.',
    'Zum Vergleichen mit dir selbst: dieselben Einstellungen, dieselbe Hand, derselbe Abstand und dasselbe Gerät.',
    'Mit der Rückmeldung siehst du, in welche Richtung deine Antworten abweichen; für reine Vergleiche kannst du sie abschalten.',
  ],
  cautions: [
    COMMON.de.principle,
    'Setze dich etwa 50 bis 60 cm vor den Bildschirm, mit ruhigem Kopf in der Mitte. Spiegelungen auf dem Bildschirm verändern die Wahrnehmung des Ortes. Die App kann nicht prüfen, ob du mit dem Blick in der Mitte geblieben bist.',
    'Auffällige Verschiebungen können an Gerät, Haltung oder Aufmerksamkeit liegen; die App deutet sie nicht und nennt keine Richtwerte.',
    COMMON.de.warn,
    EPILEPSY_DE,
    COMMON.de.calm,
  ],
  params: {
    trials: { label: 'Anzahl der Punkte', hint: 'Wie viele Punkte ein Durchlauf hat (6 bis 60, gerade Zahlen). Mehr Punkte zeigen Mittel und Streuung genauer.', short: '{v} Punkte|{v} Punkte' },
    flashMs: { label: 'Anzeigedauer des Punktes', hint: 'Wie lange der Punkt zu sehen ist, in Millisekunden. Kürzere Zeiten sind anspruchsvoller. Die Dauer hängt an der Bildwiederholrate des Bildschirms.', short: '{v} ms' },
    delayMs: { label: 'Wartezeit bis zum Tippen', hint: 'Wartezeit zwischen Verschwinden des Punktes und Freigabe der Antwort, in Millisekunden. Längere Zeiten verlangen, den Ort zu merken.', short: 'Warten {v} ms' },
    zone: {
      label: 'Zone',
      hint: 'Gesamte Fläche: überall. Nur Rand: nur im äußeren Bereich, weit weg von der Mitte.',
      options: { all: 'Gesamte Fläche', periphery: 'Nur Rand' },
    },
    showTarget: {
      label: 'Ort nach der Antwort zeigen',
      hint: 'Bei „Ja“ siehst du nach dem Tippen kurz den echten Ort und deine Antwort. Das hilft beim Lernen, für reine Vergleiche kannst du es abschalten.',
      options: { yes: 'Ja', no: 'Nein' },
    },
    sizeCm: { label: 'Punktgröße', hint: 'Durchmesser des Punktes in Zentimetern (nach Kalibrierung).', short: '{v} cm' },
  },
};

export const it: ExerciseTexts = {
  title: 'Proiezione della posizione',
  tagline: 'Un punto compare per poco: tocca dove era.',
  steps: ['Guarda la croce al centro.', 'Un punto compare per poco e sparisce.', 'Tocca dove era.'],
  why:
    'Quando afferri o indichi un luogo che hai visto, il cervello deve tradurre la posizione nel campo visivo in un movimento di indicazione. In questo esercizio funzionale un punto compare per poco mentre guardi una croce al centro e sparisce; dopo un’attesa che puoi impostare tocchi dove era. L’app mostra quanto le tue risposte erano lontane dal punto, se in media erano spostate in una direzione e quanto variavano (valori dell’esercizio in centimetri e gradi). Non li interpreta e non sostituisce una visita; contano anche dispositivo, posizione e attenzione. Che l’esercizio serva alla vita quotidiana o alla vista non è dimostrato.',
  goodFor: ['Occhio e mano', 'Ricordare i luoghi', 'Guardare con calma'],
  captions: {
    look: 'Guarda la croce al centro.',
    flash: 'Un punto compare per poco.',
    tap: 'Tocca dove era.',
    done: 'Poi vedi i valori.',
  },
  metrics: { n: 'Punti con risposta', rt_mean: 'Tempo fino alla risposta' },
  metricHints: {
    n: 'A quanti punti hai risposto. È solo il numero delle tue immissioni, non una prestazione e non un referto.',
    rt_mean: 'Tempo medio dallo sblocco della risposta al tocco. Comprende il ritardo del sensore touch; confronta solo sullo stesso dispositivo e con le stesse impostazioni.',
  },
  tips: {
    calm: 'Tieni lo sguardo sulla croce anche se il punto compare ai margini e tocca secondo la prima impressione, senza pensarci a lungo.',
    more: 'Con pochi punti media e dispersione sono incerte. Più punti (da 30 a 40) mostrano con più precisione come sono distribuite le tue risposte.',
  },
  feedback: {
    progress: 'Punto {n} / {total}',
    ask: 'Tocca dove era il punto.',
    valuesTitle: 'Valori dell’esercizio (nessuna interpretazione)',
    rowErr: 'Scostamento medio delle risposte',
    errValue: '{v} cm',
    rowErrDeg: 'Scostamento medio come angolo visivo',
    degValue: '{v} °',
    degText: 'a {d} cm di distanza',
    rowBiasX: 'Spostamento laterale medio delle risposte',
    biasXText: '+ = spostate a destra, − = a sinistra',
    rowBiasY: 'Spostamento verticale medio delle risposte',
    biasYText: '+ = spostate in alto, − = in basso',
    rowScatter: 'Dispersione delle risposte',
    scatterText: 'Dispersione intorno al centro proprio delle risposte',
    setupTitle: 'Impostazioni di questo giro',
    rowFlash: 'Durata di visualizzazione del punto',
    flashValue: '{v} ms',
    flashText: 'Le durate dipendono dalla frequenza di aggiornamento dello schermo (a 60 Hz circa 17 ms per fotogramma)',
    rowDelay: 'Attesa prima del tocco',
    delayNone: 'nessuna',
    rowZone: 'Zona',
    zoneAll: 'tutta la superficie',
    zonePeriphery: 'solo margini',
    rowShow: 'Posizione mostrata dopo la risposta',
    showYes: 'sì',
    showNo: 'no',
    notCalibrated: 'non calibrato: centimetri e gradi solo stimati',
    unitCm: '{v} cm',
    valuesNote: `${COMMON.it.values} L’app non può verificare se lo sguardo è rimasto al centro.`,
    fewNote: COMMON.it.fewValues,
  },
  progression: [
    'Più facile: visualizzazione lunga (da 500 a 1.000 ms), nessuna attesa, tutta la superficie, mostrare la posizione dopo la risposta.',
    'Più difficile: visualizzazione breve (da 100 a 150 ms), attesa (da 2.000 a 5.000 ms), zona «Solo margini», non mostrare la posizione.',
    'Per confrontarti con te stesso: le stesse impostazioni, la stessa mano, la stessa distanza e lo stesso dispositivo.',
    'Con la risposta vedi in quale direzione si discostano le tue risposte; per confronti puri puoi disattivarla.',
  ],
  cautions: [
    COMMON.it.principle,
    'Siediti a circa 50–60 cm dallo schermo, con la testa ferma al centro. I riflessi sullo schermo cambiano la percezione della posizione. L’app non può verificare se hai tenuto lo sguardo al centro.',
    'Spostamenti evidenti possono dipendere da dispositivo, posizione o attenzione; l’app non li interpreta e non indica valori di riferimento.',
    COMMON.it.warn,
    EPILEPSY_IT,
    COMMON.it.calm,
  ],
  params: {
    trials: { label: 'Numero di punti', hint: 'Quanti punti ha un giro (da 6 a 60, numeri pari). Più punti mostrano meglio media e dispersione.', short: '{v} punti|{v} punti' },
    flashMs: { label: 'Durata di visualizzazione del punto', hint: 'Per quanto tempo il punto è visibile, in millisecondi. Tempi più brevi sono più impegnativi. La durata dipende dalla frequenza di aggiornamento dello schermo.', short: '{v} ms' },
    delayMs: { label: 'Attesa prima del tocco', hint: 'Attesa tra la scomparsa del punto e lo sblocco della risposta, in millisecondi. Tempi più lunghi richiedono di ricordare la posizione.', short: 'Attesa {v} ms' },
    zone: {
      label: 'Zona',
      hint: 'Tutta la superficie: ovunque. Solo margini: solo nella zona esterna, lontano dal centro.',
      options: { all: 'Tutta la superficie', periphery: 'Solo margini' },
    },
    showTarget: {
      label: 'Mostrare la posizione dopo la risposta',
      hint: 'Con «Sì» dopo il tocco vedi per poco la posizione vera e la tua risposta. Aiuta a imparare; per confronti puri puoi disattivarlo.',
      options: { yes: 'Sì', no: 'No' },
    },
    sizeCm: { label: 'Dimensione del punto', hint: 'Diametro del punto in centimetri (dopo la calibrazione).', short: '{v} cm' },
  },
};
