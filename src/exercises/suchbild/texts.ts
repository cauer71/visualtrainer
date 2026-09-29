import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Suchbild',
  tagline: 'Finde das eine Zeichen, das nicht dazugehört.',
  steps: ['Oben siehst du, welches Zeichen du suchst.', 'Finde es im Feld und tippe es an.', 'Je schneller, desto mehr Punkte!'],
  why:
    'Gezielt mit den Augen suchen musst du ständig – im Regal, an der Kreuzung, auf dem vollen Schreibtisch. Hier übst du das mit Zeichen, die sich mit der Zeit immer ähnlicher werden. Mit etwas Übung wirst du hier schneller; ob sich das auf den Alltag überträgt, ist nicht sicher belegt.',
  goodFor: ['Einkaufsregal', 'Schilder im Verkehr', 'Anzeigetafeln'],
  captions: {
    find: 'Finde das X!',
    next: 'Und jetzt das C',
  },
  metrics: {
    points: 'Punkte',
    found: 'Gefunden',
    avgTime: 'Ø Suchzeit',
    level: 'Erreichte Stufe',
  },
  tips: {
    system: 'Such systematisch – Reihe für Reihe, wie beim Lesen.',
    look: 'Erst sicher sein, dann tippen – ähnliche Zeichen sind knifflig.',
    great: 'Super gesucht! Beim nächsten Mal werden die Zeichen noch kniffliger.',
  },
  feedback: {
    find: 'Finde:',
    here: 'Hier war es!',
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Cerca e trova',
  tagline: 'Trova l’unico segno che non c’entra.',
  steps: ['In alto vedi quale segno cercare.', 'Trovalo nel campo e toccalo.', 'Più sei veloce, più punti fai!'],
  why:
    'Cercare qualcosa con gli occhi ti capita di continuo – sullo scaffale, all’incrocio, sulla scrivania piena di cose. Qui ti alleni con segni che col tempo si somigliano sempre di più. Con un po’ di pratica qui diventi più veloce; non è dimostrato con certezza che questo si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Scaffali del supermercato', 'Cartelli stradali', 'Tabelloni degli orari'],
  captions: {
    find: 'Trova la X!',
    next: 'E adesso la C',
  },
  metrics: {
    points: 'Punti',
    found: 'Trovati',
    avgTime: 'Tempo medio',
    level: 'Livello raggiunto',
  },
  tips: {
    system: 'Cerca con metodo – riga per riga, come quando leggi.',
    look: 'Prima sii sicuro, poi tocca – i segni simili sono insidiosi.',
    great: 'Ottima ricerca! La prossima volta i segni saranno ancora più insidiosi.',
  },
  feedback: {
    find: 'Trova:',
    here: 'Era qui!',
    level: 'Livello',
  },
};
