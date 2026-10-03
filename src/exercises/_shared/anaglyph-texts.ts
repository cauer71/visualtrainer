/**
 * Gemeinsame Texte der Labor-Übungen mit Rot-Grün-/Rot-Cyan-Brille (Deutsch und Italienisch): Farbnamen, Prüfbild „Schritt für
 * Schritt“ (Schlüssel `check…` in `texts.feedback`), Tasten „Strich fehlt“ und die Einstellungen Farbtöne und Prüfbild.
 * Die Übungen binden sie mit `...anaglyphFeedback[lang]` in `texts.feedback` und `anaglyphParams[lang]` in `texts.params` ein.
 *
 * Formulierungsregeln wie in den Übungstexten: nur beschreiben, was man tut; keine Wirk-, Heil- oder Sicherheitsversprechen,
 * keine Prüf- oder Befundbegriffe, keine Normwerte.
 */
import type { ParamTexts } from '../../core/types';

export const anaglyphFeedbackDe: Record<string, string> = {
  nameRed: 'Rot',
  nameGreen: 'Grün',
  nameCyan: 'Cyan',
  nameBlue: 'Blau',
  lensRed: 'rot',
  lensGreen: 'grün',
  lensCyan: 'cyan',
  lensBlue: 'blau',
  adjRed: 'rote',
  adjGreen: 'grüne',
  adjCyan: 'cyanfarbene',
  adjBlue: 'blaue',
  checkTitle: 'Prüfbild für die Brille (ohne Wertung)',
  checkText:
    'Mit dem roten Glas vor dem Auge sollte die grüne (bei Rot und Cyan: cyanfarbene, bei Rot–Blau: blaue) Fläche dunkel erscheinen und umgekehrt. Wenn nicht: Helligkeit und Brille prüfen oder die Farbtöne ändern.',
  checkTextSteps: 'Das Prüfbild bewertet nichts; es hilft nur, Brille und Farben einzustellen. Die Werte gelten danach für die Übung.',
  checkStepGlasses: 'Setze die Brille auf. Trägst du eine Korrekturbrille, nimm am besten eine Überbrille. Der Raum darf eher dunkel sein.',
  checkStepLeft: 'Halte das linke Auge zu: Du darfst nur die {c} Fläche sehen, die andere muss fast verschwinden.',
  checkStepRight: 'Halte das rechte Auge zu: Du darfst nur die {c} Fläche sehen, die andere muss fast verschwinden.',
  checkStepLens: 'Siehst du die falsche Fläche? Dann sitzt das Glas auf der anderen Seite. Wähle, welches Glas vor deinem linken Auge sitzt:',
  checkLensIs: 'Linkes Glas: {c}',
  checkStepLevel: 'Stelle die Helligkeit jeder Farbe so ein, dass beim Zuhalten eines Auges die Fläche des anderen Auges fast verschwindet:',
  checkLevelValue: '{c}: {v} %',
  checkLevelDown: '{c} dunkler',
  checkLevelUp: '{c} heller',
  checkGhost:
    'Siehst du durch ein Auge beide Flächen (Geisterbild)? Stelle die hellere Farbe dunkler, verringere Raumlicht und Spiegelungen auf dem Bildschirm und prüfe die Bildschirmhelligkeit.',
  missRed: 'Roter Strich fehlt',
  missGreen: 'Grüner Strich fehlt',
  missCyan: 'Cyan-Strich fehlt',
  missBlue: 'Blauer Strich fehlt',
};

export const anaglyphFeedbackIt: Record<string, string> = {
  nameRed: 'Rosso',
  nameGreen: 'Verde',
  nameCyan: 'Ciano',
  nameBlue: 'Blu',
  lensRed: 'rossa',
  lensGreen: 'verde',
  lensCyan: 'ciano',
  lensBlue: 'blu',
  adjRed: 'rossa',
  adjGreen: 'verde',
  adjCyan: 'ciano',
  adjBlue: 'blu',
  checkTitle: 'Immagine di controllo per gli occhiali (senza valutazione)',
  checkText:
    'Con la lente rossa davanti all’occhio la superficie verde (con rosso e ciano: ciano, con rosso–blu: blu) dovrebbe apparire scura e viceversa. In caso contrario: controlla luminosità e occhiali o cambia le tonalità.',
  checkTextSteps: 'L’immagine di controllo non valuta nulla; serve solo a regolare occhiali e colori. I valori valgono poi per l’esercizio.',
  checkStepGlasses: 'Metti gli occhiali. Se porti occhiali correttivi, meglio usare occhiali da sovrapporre. La stanza può essere piuttosto buia.',
  checkStepLeft: 'Copri l’occhio sinistro: devi vedere solo la superficie {c}, l’altra deve quasi sparire.',
  checkStepRight: 'Copri l’occhio destro: devi vedere solo la superficie {c}, l’altra deve quasi sparire.',
  checkStepLens: 'Vedi la superficie sbagliata? Allora la lente è dall’altra parte. Scegli quale lente è davanti al tuo occhio sinistro:',
  checkLensIs: 'Lente sinistra: {c}',
  checkStepLevel: 'Regola la luminosità di ogni colore in modo che, coprendo un occhio, la superficie dell’altro occhio quasi sparisca:',
  checkLevelValue: '{c}: {v} %',
  checkLevelDown: '{c} più scuro',
  checkLevelUp: '{c} più chiaro',
  checkGhost:
    'Con un occhio vedi entrambe le superfici (immagine fantasma)? Rendi più scuro il colore più chiaro, riduci la luce della stanza e i riflessi sullo schermo e controlla la luminosità dello schermo.',
  missRed: 'Manca il trattino rosso',
  missGreen: 'Manca il trattino verde',
  missCyan: 'Manca il trattino ciano',
  missBlue: 'Manca il trattino blu',
};

/** Texte der gemeinsamen Einstellungen Farbtöne und Prüfbild im Intro */
export const anaglyphParamsDe: Record<'tones' | 'glassesCheck', ParamTexts> = {
  tones: {
    label: 'Farbtöne',
    hint: 'Standard ist reines Rot (#FF0000) und reines Grün (#00FF00). Alternativen: Rot und Cyan (#FF0000 und #00FFFF) oder Rot und Blau (#FF0000 und #00A0FF). Rot-Cyan-Brillen funktionieren mit dem Farbpaar Rot–Blau. Das Prüfbild zeigt die eingestellten Farben.',
    options: { redgreen: 'Rot und Grün', redcyan: 'Rot und Cyan', redblue: 'Rot und Blau' },
  },
  glassesCheck: {
    label: 'Prüfbild im Intro',
    hint: 'Einfach: zwei Farbflächen. Schritt für Schritt: Brille aufsetzen, je ein Auge zuhalten, das Glas wählen und die Helligkeit jeder Farbe einstellen. Das Prüfbild bewertet nichts und ändert die Übung nur über die Einstellungen, die du darin wählst.',
    options: { simple: 'Einfach', steps: 'Schritt für Schritt' },
  },
};

export const anaglyphParamsIt: Record<'tones' | 'glassesCheck', ParamTexts> = {
  tones: {
    label: 'Tonalità',
    hint: 'Lo standard è rosso puro (#FF0000) e verde puro (#00FF00). Alternative: rosso e ciano (#FF0000 e #00FFFF) oppure rosso e blu (#FF0000 e #00A0FF). Gli occhiali rosso-ciano funzionano con la coppia di colori rosso–blu. L’immagine di controllo mostra i colori impostati.',
    options: { redgreen: 'Rosso e verde', redcyan: 'Rosso e ciano', redblue: 'Rosso e blu' },
  },
  glassesCheck: {
    label: 'Immagine di controllo nell’introduzione',
    hint: 'Semplice: due superfici colorate. Passo dopo passo: metti gli occhiali, copri un occhio alla volta, scegli la lente e regola la luminosità di ogni colore. L’immagine di controllo non valuta nulla e cambia l’esercizio solo tramite le impostazioni che scegli al suo interno.',
    options: { simple: 'Semplice', steps: 'Passo dopo passo' },
  },
};
