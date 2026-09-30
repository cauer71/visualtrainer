import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Intelligenz-Versprechen, kein „Test“,
// kein Vergleich mit anderen. Platzhalter: {n} = Schritte zurück, {c}/{t} = richtig/gesamt.

export const de: ExerciseTexts = {
  title: 'Rückblick',
  tagline: 'Die letzten Formen im Kopf behalten und laufend vergleichen.',
  steps: [
    'Eine Form nach der anderen erscheint – schau zu.',
    'War sie gleich wie die davor? „Gleich“ oder „Anders“.',
    'Später: gleich wie vor 2 oder 3 Schritten?',
  ],
  why:
    'Beim Rückblick behältst du die letzten Formen im Kopf und schiebst bei jeder neuen nach. In Studien wurde vor allem die geübte Aufgabe selbst besser; dass sich dadurch die Intelligenz steigert, ist nicht belegt. Ob das im Alltag hilft, ist nicht belegt.',
  goodFor: ['Mitdenken', 'Namen merken', 'Konzentriert bleiben'],
  captions: {
    shapes: 'Eine Form nach der anderen',
    compare: 'Gleich wie die Form davor?',
    same: 'Ja! Dann tippe „Gleich“',
    diff: 'Nein? Dann tippe „Anders“',
    later: 'Später: 2 oder 3 Schritte zurück',
  },
  metrics: {
    level: 'Erreichte Stufe (Schritte zurück)',
    hitRate: 'Gleiche erkannt',
    falseAlarms: 'Falsch „Gleich“ getippt',
    accuracy: 'Richtig insgesamt',
  },
  tips: {
    omit: 'Antworte bei jeder Form – im Zweifel tippe „Anders“. Nur die erste Antwort zählt.',
    fa: 'Tippe „Gleich“ nur, wenn du dir sicher bist. Im Zweifel: „Anders“.',
    miss: 'Sprich dir die letzten Formen leise vor, zum Beispiel „Stern, Kreis“, und schiebe bei jeder neuen nach.',
    great: 'Stark dabei geblieben! Beim nächsten Mal geht es ein Stück weiter zurück.',
  },
  feedback: {
    back1: '1 Schritt zurück',
    backN: '{n} Schritte zurück',
    block: 'Block',
    q1: 'Gleich wie die Form davor?',
    qN: 'Gleich wie vor {n} Schritten?',
    memorize1: 'Merk dir die Form …',
    memorizeN: 'Merk dir die Formen …',
    same: 'Gleich',
    diff: 'Anders',
    go: 'Los',
    introFirst: 'Los geht’s mit der Regel:',
    introUp: 'Gut gemerkt! Jetzt eine Stufe weiter:',
    introDown: 'Jetzt etwas leichter, in Ruhe:',
    introSame: 'Noch einmal mit derselben Regel:',
    rule1: 'Ist die Form gleich wie die davor?',
    ruleN: 'Ist die Form gleich wie die vor {n} Schritten?',
    answerAll: 'Antworte bei jeder Form – die ersten Formen schaust du nur an.',
    lastBlock: 'Letzter Block: {c} von {t} richtig',
  },
};

export const it: ExerciseTexts = {
  title: 'Sguardo indietro',
  tagline: 'Tenere a mente le ultime forme e confrontarle di continuo.',
  steps: [
    'Compare una forma dopo l’altra – guarda.',
    'Era uguale alla precedente? «Uguale» o «Diverso».',
    'Più avanti: uguale a 2 o 3 passi fa?',
  ],
  why:
    'Nello sguardo indietro tieni a mente le ultime forme e a ogni nuova forma aggiorni il ricordo. Negli studi è migliorato soprattutto il compito stesso che si allena; che così aumenti l’intelligenza non è dimostrato. Che questo aiuti nella vita di tutti i giorni non è dimostrato.',
  goodFor: ['Seguire con la mente', 'Ricordare i nomi', 'Restare concentrati'],
  captions: {
    shapes: 'Una forma dopo l’altra',
    compare: 'Uguale alla forma precedente?',
    same: 'Sì! Allora tocca «Uguale»',
    diff: 'No? Allora tocca «Diverso»',
    later: 'Poi: 2 o 3 passi indietro',
  },
  metrics: {
    level: 'Livello raggiunto (passi indietro)',
    hitRate: 'Uguali riconosciute',
    falseAlarms: '«Uguale» toccato per errore',
    accuracy: 'Corrette in totale',
  },
  tips: {
    omit: 'Rispondi a ogni forma – nel dubbio tocca «Diverso». Conta solo la prima risposta.',
    fa: 'Tocca «Uguale» solo se sei sicuro. Nel dubbio: «Diverso».',
    miss: 'Ripeti piano le ultime forme, per esempio «stella, cerchio», e aggiornale a ogni nuova forma.',
    great: 'Bravo a restare concentrato! La prossima volta si va un po’ più indietro.',
  },
  feedback: {
    back1: '1 passo indietro',
    backN: '{n} passi indietro',
    block: 'Blocco',
    q1: 'Uguale alla forma precedente?',
    qN: 'Uguale a {n} passi fa?',
    memorize1: 'Ricorda la forma …',
    memorizeN: 'Ricorda le forme …',
    same: 'Uguale',
    diff: 'Diverso',
    go: 'Via',
    introFirst: 'Si parte con la regola:',
    introUp: 'Ben ricordato! Ora un livello in più:',
    introDown: 'Ora un po’ più facile, con calma:',
    introSame: 'Ancora una volta con la stessa regola:',
    rule1: 'La forma è uguale alla precedente?',
    ruleN: 'La forma è uguale a quella di {n} passi fa?',
    answerAll: 'Rispondi a ogni forma – le prime le guardi soltanto.',
    lastBlock: 'Ultimo blocco: {c} su {t} corrette',
  },
};
