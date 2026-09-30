import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Vergleiche mit anderen, keine Aussagen zu Gedächtnisproblemen.

export const de: ExerciseTexts = {
  title: 'Wo war es?',
  tagline: 'Merk dir, welches Symbol wo lag – und tippe den Platz an.',
  steps: [
    'Symbole liegen kurz an verschiedenen Orten.',
    'Dann wird alles verdeckt – ein Symbol wird gezeigt.',
    'Tippe das Feld, wo es lag. Es kommen immer mehr dazu.',
  ],
  why:
    'Bei „Wo war es?“ übst du, dir zu merken, welches Ding wo lag – ähnlich wie bei der Frage, wo du etwas hingelegt hast. Merkhilfen wie Ecken als Ankerpunkte oder ein kurzer Satz („Stern oben links“) helfen in solchen Aufgaben. Ob das im Alltag hilft, ist nicht belegt.',
  goodFor: ['Orte merken', 'Dinge wiederfinden', 'Ruhig konzentrieren'],
  captions: {
    look: 'Merk dir, was wo liegt',
    hide: 'Dann wird alles verdeckt',
    ask: 'Wo war das Symbol?',
    ok: 'Dort lag es – richtig!',
    more: 'Dann kommen mehr Symbole dazu',
  },
  metrics: {
    level: 'Sicher gemerkte Symbole',
    correct: 'Richtig getippt',
    error: 'Ø Ortsfehler (% der Kantenlänge)',
    swaps: 'Mit anderem Symbol verwechselt',
  },
  tips: {
    swap: 'Verknüpfe Symbol und Ort zu einem kurzen Satz, zum Beispiel „Herz unten rechts“.',
    near: 'Oft knapp daneben: Merk dir Zeile und Spalte – Ecken und Ränder sind gute Ankerpunkte.',
    anchor: 'Fang bei den Ecken und Rändern an und merk dir jedes Symbol mit seinem Platz als kleinen Satz.',
    great: 'Gut gemerkt! Beim nächsten Mal sind es ein paar Symbole mehr.',
  },
  feedback: {
    round: 'Runde',
    objects: 'Symbole',
    memorize: 'Merk dir die Orte',
    covered: 'Alles verdeckt …',
    ask: 'Wo war das?',
    right: 'Richtig!',
    near: 'Knapp daneben',
    wrong: 'Nicht ganz',
  },
};

export const it: ExerciseTexts = {
  title: 'Dov’era?',
  tagline: 'Ricorda quale simbolo era dove – e tocca il posto giusto.',
  steps: [
    'I simboli stanno per poco in posti diversi.',
    'Poi tutto viene coperto – si mostra un simbolo.',
    'Tocca il campo dov’era. Ne arrivano sempre di più.',
  ],
  why:
    'In «Dov’era?» eserciti il ricordo di quale cosa era dove – un po’ come quando ci si chiede dove si è messo qualcosa. Aiuti come gli angoli come punti di riferimento o una breve frase («stella in alto a sinistra») sono utili in compiti simili. Che questo aiuti nella vita di tutti i giorni non è dimostrato.',
  goodFor: ['Ricordare i posti', 'Ritrovare le cose', 'Concentrarsi con calma'],
  captions: {
    look: 'Ricorda cosa sta dove',
    hide: 'Poi tutto viene coperto',
    ask: 'Dov’era il simbolo?',
    ok: 'Era lì – giusto!',
    more: 'Poi arrivano più simboli',
  },
  metrics: {
    level: 'Simboli ricordati con sicurezza',
    correct: 'Toccati giusti',
    error: 'Ø errore di posizione (% del lato)',
    swaps: 'Scambiati con un altro simbolo',
  },
  tips: {
    swap: 'Collega simbolo e posto in una breve frase, per esempio «cuore in basso a destra».',
    near: 'Spesso per poco: ricorda riga e colonna – angoli e bordi sono buoni punti di riferimento.',
    anchor: 'Parti dagli angoli e dai bordi e ricorda ogni simbolo col suo posto in una breve frase.',
    great: 'Ben ricordato! La prossima volta saranno qualche simbolo in più.',
  },
  feedback: {
    round: 'Turno',
    objects: 'simboli',
    memorize: 'Ricorda i posti',
    covered: 'Tutto coperto …',
    ask: 'Dov’era?',
    right: 'Giusto!',
    near: 'Quasi',
    wrong: 'Non proprio',
  },
};
