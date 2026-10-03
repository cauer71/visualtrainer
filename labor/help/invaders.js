(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  factory(isNode ? require('../lib/core.js') : root.VT);
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';
  VT.addHelp('invaders', {
    purpose: 'Du steuerst einen Zielpunkt am unteren Rand seitlich unter fallende Raumschiffe und hältst ihn dort, bis das Schiff verschwindet. Die Übung trainiert das gezielte, ruhige Ausrichten auf bewegte Ziele. Gesteuert wird mit Zeiger, Pfeiltasten oder durch Kippen des Geräts; eine Balance-Plattform wird nicht ausgelesen.',
    setup: [
      'Kalibrierung durchführen, damit Toleranz und Fallgeschwindigkeit in Zentimetern stimmen.',
      'Zeiger: Der Zielpunkt folgt der waagerechten Position von Maus oder Finger, gut zum Einstieg.',
      'Pfeiltasten: Links und rechts steuern den Zielpunkt (auch A und D). Geräte, die Tastendrücke senden, lassen sich so einbinden.',
      'Kippen: Das Gerät wird nach links oder rechts geneigt (Tablet oder Handy mit Neigungssensor, nicht in jedem Browser verfügbar).',
      'Auf einer Plattform brauchst du Sicherung und eine Hilfsperson für die Bedienung.'
    ],
    steps: [
      'Dauer, Schiffstakt, Fallgeschwindigkeit und Haltezeit einstellen. Starte mit 60 Sekunden, 2,2 Sekunden Takt, 8 cm pro Sekunde.',
      'Steuerung wählen und „Start“ drücken. Von oben erscheinen rote Schiffe und fallen.',
      'Steuere den gelben Zielpunkt unter ein Schiff. Sobald du ausgerichtet bist (Toleranz), füllt sich ein grüner Ring um das Schiff.',
      'Halte die Ausrichtung, bis der Ring voll ist: Das Schiff ist getroffen. Weichst du ab, baut sich der Fortschritt rasch ab.',
      'Schiffe, die den unteren Rand erreichen, zählen als verpasst. Nach der Dauer erscheinen die Kennzahlen.'
    ],
    tips: [
      'Wähle das tiefste Schiff zuerst; es ist am dringendsten.',
      'Steuere mit kleinen, früh begonnenen Bewegungen und halte dann ruhig. Wer ständig nachkorrigiert, baut den Ring nicht auf.',
      'Schiffe im oberen Viertel können noch nicht gehalten werden. Du kannst dich vorbereiten, aber nicht schon dort halten.',
      'Mit Pfeiltasten und Kippen ist die Trägheit höher als beim Zeiger; plane mehr Weg ein.',
      'Wenn zwei Schiffe nahe beieinander fallen, entscheide dich schnell für eines.'
    ],
    progression: [
      'Leichter: langsamer Takt (3 bis 4 Sekunden), langsame Fallgeschwindigkeit (4 bis 6 cm/s), kurze Haltezeit (200 bis 300 ms), große Toleranz (3 bis 4 cm).',
      'Schwerer: schneller Takt (1 bis 1,5 Sekunden), hohe Fallgeschwindigkeit (14 bis 20 cm/s), lange Haltezeit (600 bis 1.000 ms), kleine Toleranz (1 cm).',
      'Mit Pfeiltasten oder Kippen statt Zeiger steigt der Anspruch deutlich.',
      'Ziel: höhere Trefferquote bei steigender Geschwindigkeit.'
    ],
    cautions: [
      'Bei Lichtempfindlichkeit beachten: Die Szene bewegt sich ständig.',
      'Beim Kippen des Geräts auf sicheren Stand achten, damit es nicht herunterfällt.',
      'Auf Plattformen besteht Sturzgefahr; Sicherung und Aufsicht sind Pflicht.',
      'Bei Schwindel oder Übelkeit sofort abbrechen.'
    ],
    background: 'Das Ausrichten auf ein bewegtes Ziel und das Halten dieser Ausrichtung verbindet Verfolgen, Vorausschau und ruhige Feinmotorik. Die Haltezeit sorgt dafür, dass nicht nur kurz vorbeigefahren, sondern wirklich gehalten wird, ähnlich wie das Halten einer Position auf einer Plattform. Die App nutzt nur Eingaben, die ein gewöhnlicher Browser liefern kann; eine Plattform mit eigenem Messwert-Ausgang ist nicht eingebunden.',
    references: [],
    params: {
      durationS: 'Dauer des Durchlaufs in Sekunden.',
      spawnMs: 'Alle wie viele Millisekunden ein neues Schiff erscheint. Kürzere Zeiten bringen mehr Schiffe gleichzeitig.',
      fallCmS: 'Fallgeschwindigkeit der Schiffe in Zentimetern pro Sekunde.',
      dwellMs: 'Wie lange die Ausrichtung gehalten werden muss, bis das Schiff getroffen ist, in Millisekunden.',
      toleranceCm: 'Seitliche Toleranz in Zentimetern: Innerhalb dieses Abstands zählt der Zielpunkt als ausgerichtet.',
      control: '„Zeiger“: Der Zielpunkt folgt der waagerechten Position von Maus oder Finger. „Pfeiltasten“: Links und rechts. „Gerät kippen“: Neigung nach links und rechts, nur mit passendem Gerät.'
    },
    metrics: {
      destroyed: 'Anzahl der getroffenen Schiffe.',
      missed: 'Anzahl der Schiffe, die den unteren Rand erreicht haben.',
      accuracy: 'Anteil der getroffenen an allen gewerteten Schiffen.',
      t_mean: 'Mittlere Zeit vom Erscheinen eines Schiffes bis zu seinem Treffer. Kleiner bedeutet schneller und sauberer ausgerichtet.'
    }
  });
}));
