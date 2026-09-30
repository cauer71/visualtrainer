import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.
// Ehrlich sagen: Der Blick wird nicht gemessen, und die Übung prüft das Gesichtsfeld nicht.

export const de: ExerciseTexts = {
  title: 'Rand-Ping',
  tagline: 'Blick in die Mitte – und merke, wo am Rand ein Punkt auftaucht.',
  steps: [
    'Schau auf das Kreuz in der Mitte.',
    'Am Rand erscheint kurz ein Punkt, in der Mitte ein Zeichen.',
    'Tippe, wo der Punkt war – und wähle das Zeichen.',
  ],
  why:
    'Im Alltag nimmst du oft etwas am Rand mit, während du woanders hinschaust – zum Beispiel einen Ball, der von der Seite kommt. Hier übst du, deine Aufmerksamkeit auf den ganzen Bildschirm zu verteilen, während ein kleines Zeichen in der Mitte deinen Blick halten soll; die App misst dabei nicht, wohin du schaust, und prüft auch nicht dein Gesichtsfeld. Ob sich das Üben am Bildschirm auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Umschauen', 'Ballspiele', 'Überblick behalten'],
  captions: {
    center: 'Schau auf die Mitte',
    dot: 'Am Rand erscheint ein Punkt',
    where: 'Tippe dorthin, wo er war',
    symbol: 'Und: Kreis oder Quadrat?',
    again: 'Noch einmal – Blick bleibt in der Mitte',
  },
  metrics: {
    level: 'Stufe',
    edgeRate: 'Trefferquote Rand',
    centerRate: 'Trefferquote Mitte',
  },
  tips: {
    center: 'Das Zeichen in der Mitte war schwieriger. Schau zuerst dorthin – den Punkt am Rand bemerkst du nebenbei.',
    edge: 'Den Punkt am Rand hast du oft verfehlt. Tippe lieber auf deinen ersten Eindruck, auch wenn du unsicher bist.',
    far: 'Die äußeren Punkte waren schwerer. Bleib in der Mitte und achte auf den ganzen Bildschirm.',
    great: 'Stark! Mitte und Rand klappen gut zusammen. Bleib locker – dann geht es auch mit kürzerer Anzeige.',
  },
  feedback: {
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Punto al margine',
  tagline: 'Sguardo al centro – e nota dove compare un punto al margine.',
  steps: [
    'Guarda la croce al centro.',
    'Al margine compare un punto, al centro un simbolo.',
    'Tocca dov’era il punto – e scegli il simbolo.',
  ],
  why:
    'Nella vita di tutti i giorni noti spesso qualcosa ai margini mentre guardi altrove – per esempio una palla che arriva di lato. Qui alleni a distribuire l’attenzione su tutto lo schermo, mentre un piccolo simbolo al centro dovrebbe tenere fermo lo sguardo; l’app non misura dove guardi e non controlla il tuo campo visivo. Che esercitarsi sullo schermo si trasferisca allo sport o alla vita quotidiana non è dimostrato.',
  goodFor: ['Guardarsi intorno', 'Giochi con la palla', 'Mantenere il quadro'],
  captions: {
    center: 'Guarda il centro',
    dot: 'Al margine compare un punto',
    where: 'Tocca dov’era',
    symbol: 'E: cerchio o quadrato?',
    again: 'Ancora una volta – sguardo al centro',
  },
  metrics: {
    level: 'Livello',
    edgeRate: 'Precisione margine',
    centerRate: 'Precisione centro',
  },
  tips: {
    center: 'Il simbolo al centro era più difficile. Guardalo per primo – il punto al margine lo noti di sfuggita.',
    edge: 'Hai spesso mancato il punto al margine. Tocca pure la tua prima impressione, anche se non sei sicuro.',
    far: 'I punti più esterni erano più difficili. Resta al centro e fai attenzione a tutto lo schermo.',
    great: 'Ottimo! Centro e margine funzionano bene insieme. Resta rilassato – così ce la fai anche con una visualizzazione più breve.',
  },
  feedback: {
    level: 'Livello',
  },
};
