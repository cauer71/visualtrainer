import type { ExerciseTexts } from '../../core/types';

/*
 * Platzhalter in feedback-Texten: {k} = Anzahl, {n} = Gesamtzahl.
 */

export const de: ExerciseTexts = {
  title: 'Kugel-Detektiv',
  tagline: 'Behalte mehrere Kugeln gleichzeitig im Blick.',
  steps: [
    'Merk dir die Kugeln, die kurz aufleuchten.',
    'Alle flitzen los – Blick locker in die Mitte.',
    'Stehen sie still, tippe die richtigen an.',
  ],
  why:
    'An Kreuzungen oder beim Mannschaftssport musst du oft mehrere Dinge gleichzeitig im Auge behalten. Genau das übst du hier – das Tempo passt sich dir an, und mit Übung wird man darin besser, in jedem Alter. Ob sich das auf Straßenverkehr oder Sport überträgt, ist allerdings nicht belegt.',
  goodFor: ['Kreuzungen', 'Mannschaftssport', 'Spielplatz'],
  captions: {
    mark: 'Merk dir die leuchtenden Kugeln',
    track: 'Blick in die Mitte – alle im Auge behalten',
    select: 'Tippe die richtigen an',
    reveal: 'Richtig!',
  },
  metrics: {
    level: 'Dein Tempo',
    perfectRounds: 'Fehlerfreie Runden',
    accuracy: 'Richtig erkannt',
    maxLevel: 'Höchste Stufe',
  },
  tips: {
    center: 'Blick in die Mitte und alle gleichzeitig locker verfolgen – nicht einer Kugel hinterherschauen.',
    steady:
      'Gut dabei! Pass besonders auf, wenn sich Kugeln berühren oder kreuzen – dort passieren die meisten Verwechslungen.',
    great: 'Stark! Bleib auch bei hohem Tempo locker – so behältst du alle Kugeln im Blick.',
  },
  feedback: {
    round: 'Runde {k}/{n}',
    memorize: 'Merk dir die {n} leuchtenden Kugeln',
    track: 'Blick in die Mitte',
    pick: 'Tippe die {n} Kugeln an',
    perfect: '{k} von {n}!',
    partial: '{k} von {n}',
  },
};

export const it: ExerciseTexts = {
  title: 'Detective delle palline',
  tagline: 'Tieni d’occhio più palline contemporaneamente.',
  steps: [
    'Memorizza le palline che si illuminano.',
    'Partono tutte – sguardo rilassato al centro.',
    'Quando si fermano, tocca quelle giuste.',
  ],
  why:
    'Agli incroci o negli sport di squadra devi spesso tenere d’occhio più cose insieme. Qui alleni proprio questo – la velocità si adatta a te e con l’esercizio si migliora, a qualsiasi età. Che poi serva anche nel traffico o nello sport, però, non è dimostrato.',
  goodFor: ['Incroci', 'Sport di squadra', 'Parco giochi'],
  captions: {
    mark: 'Memorizza le palline illuminate',
    track: 'Sguardo al centro – seguile tutte',
    select: 'Tocca quelle giuste',
    reveal: 'Giusto!',
  },
  metrics: {
    level: 'La tua velocità',
    perfectRounds: 'Turni senza errori',
    accuracy: 'Palline individuate',
    maxLevel: 'Livello più alto',
  },
  tips: {
    center: 'Sguardo al centro e seguile tutte insieme, con calma – non inseguire una sola pallina con gli occhi.',
    steady:
      'Bene! Fai attenzione quando le palline si toccano o si incrociano: è lì che capitano quasi tutti gli scambi.',
    great: 'Ottimo! Resta rilassato anche quando vanno veloci – così tieni d’occhio tutte le palline.',
  },
  feedback: {
    round: 'Turno {k}/{n}',
    memorize: 'Memorizza le {n} palline illuminate',
    track: 'Sguardo al centro',
    pick: 'Tocca le {n} palline',
    perfect: '{k} su {n}!',
    partial: '{k} su {n}',
  },
};
