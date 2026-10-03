/**
 * Gemeinsame Texte der Funktionsübungen (Hess-Schirm, Worth-Vier-Punkte, Schober, Diplopie-Karte, Subjektive Vertikale,
 * Orts-Projektion), DE und IT, du-Form und einfache Sprache.
 *
 * Formulierungsregeln: Es sind Funktionsübungen nach dem Prinzip eines klassischen Verfahrens, kein Ersatz für die
 * Untersuchung bei Augenärztin, Augenarzt, Orthoptistin oder Optometrist. Keine Befunddeutung, keine Richtwerte, kein
 * Prüf- oder Wirkversprechen. Gezählt und angezeigt werden „Übungswerte“ (was du eingegeben hast, umgerechnet in cm,
 * Δ oder Grad). Sicherheitshinweise (Pflicht): Warnzeichen, photosensitive Epilepsie, Rot-Grün-Farbsehschwäche
 * (Birch, 2012), Pausen und Abbruch bei Beschwerden (Muchnick, 2008).
 */
import type { Lang } from '../../i18n/lang';
import type { ParamTexts } from '../../core/types';

/** Beschriftungen für Farben, Gläser und das Prüfbild (Schlüssel in `ExerciseTexts.feedback`) */
export const ANA_FEEDBACK: Record<Lang, Record<string, string>> = {
  de: {
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
  },
  it: {
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
  },
};

/** Texte der Einstellungen für Brille und Farben (`ANA_PARAMS`) */
export const ANA_PARAM_TEXTS: Record<Lang, Record<string, ParamTexts>> = {
  de: {
    leftLens: {
      label: 'Linkes Glas der Brille',
      hint: 'Welches Glas sitzt vor deinem linken Auge? Davon hängt ab, welches Auge welches Bild sieht; im Prüfbild kannst du es ausprobieren. Stimmt die Einstellung nicht, sind die Namen der Augen in der Auswertung vertauscht.',
      options: { red: 'Rot', green: 'Grün, Cyan oder Blau' },
    },
    tones: {
      label: 'Farbtöne',
      hint: 'Standard ist reines Rot (#FF0000) und reines Grün (#00FF00). Alternativen: Rot und Cyan (#FF0000 und #00FFFF) oder Rot und Blau (#FF0000 und #00A0FF). Rot-Cyan-Brillen funktionieren mit dem Farbpaar Rot–Blau. Das Prüfbild zeigt die eingestellten Farben.',
      options: { redgreen: 'Rot und Grün', redcyan: 'Rot und Cyan', redblue: 'Rot und Blau' },
    },
    redLevel: {
      label: 'Helligkeit Rot',
      hint: 'Anteil der vollen Helligkeit der roten Teile, 30 bis 100 Prozent in Schritten von 10. Im Prüfbild („Schritt für Schritt“) stellst du sie mit „Rot dunkler“ und „Rot heller“ ein.',
      short: 'Rot {v} %',
    },
    secondLevel: {
      label: 'Helligkeit zweite Farbe',
      hint: 'Anteil der vollen Helligkeit der grünen, cyanfarbenen oder blauen Teile, 30 bis 100 Prozent in Schritten von 10. Im Prüfbild („Schritt für Schritt“) stellst du sie mit den Tasten „dunkler“ und „heller“ ein.',
      short: 'Zweite Farbe {v} %',
    },
    glassesCheck: {
      label: 'Prüfbild im Intro',
      hint: 'Einfach: zwei Farbflächen. Schritt für Schritt: Brille aufsetzen, je ein Auge zuhalten, das Glas wählen und die Helligkeit jeder Farbe einstellen. Das Prüfbild bewertet nichts und ändert die Übung nur über die Einstellungen, die du darin wählst.',
      options: { simple: 'Einfach', steps: 'Schritt für Schritt' },
    },
  },
  it: {
    leftLens: {
      label: 'Lente sinistra degli occhiali',
      hint: 'Quale lente è davanti al tuo occhio sinistro? Da questo dipende quale occhio vede quale immagine; nell’immagine di controllo puoi provarlo. Se l’impostazione non è giusta, nella valutazione i nomi degli occhi sono scambiati.',
      options: { red: 'Rossa', green: 'Verde, ciano o blu' },
    },
    tones: {
      label: 'Tonalità',
      hint: 'Di serie rosso puro (#FF0000) e verde puro (#00FF00). Alternative: rosso e ciano (#FF0000 e #00FFFF) oppure rosso e blu (#FF0000 e #00A0FF). Gli occhiali rosso-ciano funzionano con la coppia rosso–blu. L’immagine di controllo mostra i colori impostati.',
      options: { redgreen: 'Rosso e verde', redcyan: 'Rosso e ciano', redblue: 'Rosso e blu' },
    },
    redLevel: {
      label: 'Luminosità del rosso',
      hint: 'Quota della luminosità piena delle parti rosse, dal 30 al 100 per cento a passi di 10. Nell’immagine di controllo («passo dopo passo») la regoli con «Rosso più scuro» e «Rosso più chiaro».',
      short: 'Rosso {v} %',
    },
    secondLevel: {
      label: 'Luminosità del secondo colore',
      hint: 'Quota della luminosità piena delle parti verdi, ciano o blu, dal 30 al 100 per cento a passi di 10. Nell’immagine di controllo («passo dopo passo») la regoli con i tasti «più scuro» e «più chiaro».',
      short: 'Secondo colore {v} %',
    },
    glassesCheck: {
      label: 'Immagine di controllo nell’introduzione',
      hint: 'Semplice: due superfici colorate. Passo dopo passo: mettere gli occhiali, coprire un occhio alla volta, scegliere la lente e regolare la luminosità di ogni colore. L’immagine di controllo non valuta nulla e cambia l’esercizio solo attraverso le impostazioni che scegli.',
      options: { simple: 'Semplice', steps: 'Passo dopo passo' },
    },
  },
};

/** Wiederkehrende Sätze für `cautions`, `why` und die Hinweise unter den Ergebnissen */
export const COMMON: Record<
  Lang,
  { principle: string; warn: string; epilepsy: string; colorBlind: string; calm: string; values: string; fewValues: string }
> = {
  de: {
    principle:
      'Das ist eine Funktionsübung nach dem Prinzip eines klassischen Verfahrens, kein Ersatz für die Untersuchung bei Augenärztin, Augenarzt, Orthoptistin oder Optometrist. Die App deutet nichts als Befund und nennt keine Richtwerte.',
    warn: 'Nicht üben, sondern ärztlich abklären lassen: Doppelbilder bei neu aufgetretenem Schielen, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung, Schwindel. Bei Augenschmerz, Schwindel oder Kopfschmerz während der Übung sofort aufhören (Muchnick, 2008, S. 6 und 28).',
    epilepsy:
      'Bei bekannter photosensitiver Epilepsie nur nach Rücksprache mit der behandelnden Ärztin oder dem behandelnden Arzt üben. Die Übung hat kein Flackern und keine Blitze.',
    colorBlind:
      'Bei einer Rot-Grün-Farbsehschwäche (bei Menschen europäischer Herkunft etwa 8 % der Männer und etwa 0,4 % der Frauen; Birch, 2012) passt die Übung nicht: Die Farben werden falsch getrennt.',
    calm: 'Halte den Durchlauf kurz, mache Pausen, bleibe mit dem Kopf ruhig und halte den Abstand ein, den du bei der Kalibrierung eingestellt hast. Bei Ermüdung höre auf.',
    values:
      'Die Werte sind Übungswerte dieses Durchlaufs auf diesem Bildschirm und mit diesen Einstellungen. Die App deutet sie nicht als Befund und vergleicht nicht mit Richtwerten.',
    fewValues: 'Mit wenigen Antworten sind die Werte unsicher.',
  },
  it: {
    principle:
      'È un esercizio funzionale secondo il principio di un metodo classico, non sostituisce la visita dall’oculista, dall’ortottista o dall’optometrista. L’app non interpreta nulla come referto e non indica valori di riferimento.',
    warn: 'Non esercitarti, ma fatti visitare: visione doppia con strabismo comparso da poco, perdita improvvisa della vista, mal di testa con peggioramento della vista, vertigini. In caso di dolore agli occhi, vertigini o mal di testa durante l’esercizio smetti subito (Muchnick, 2008, pp. 6 e 28).',
    epilepsy:
      'In caso di epilessia fotosensibile nota esercitati solo dopo aver parlato con il medico che ti segue. L’esercizio non ha sfarfallio né lampi.',
    colorBlind:
      'Con un’alterazione della visione dei colori rosso-verde (nelle persone di origine europea circa l’8 % degli uomini e circa lo 0,4 % delle donne; Birch, 2012) l’esercizio non è adatto: i colori vengono separati male.',
    calm: 'Tieni breve il giro, fai pause, tieni la testa ferma e mantieni la distanza impostata nella calibrazione. In caso di stanchezza smetti.',
    values:
      'I valori sono valori dell’esercizio di questo giro, su questo schermo e con queste impostazioni. L’app non li interpreta come referto e non li confronta con valori di riferimento.',
    fewValues: 'Con poche risposte i valori sono incerti.',
  },
};
