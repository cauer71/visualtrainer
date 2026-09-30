import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/504-recoil-control.md und docs/uebungskatalog/literatur/lit-W06-fps-a.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'gegenhalten',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Gegenhalten mit der Hand: Die Marke wird gleichmäßig nach oben gezogen, du hältst sie mit der Fingerhöhe im Ring um das Ziel.',
      daily: 'Einen Regler oder Schieber ruhig führen, der von selbst wegwandert; gleichmäßig dosiert gegenhalten statt ruckartig korrigieren.',
      research:
        'Im Labor lernen Menschen, eine gleichbleibende, vorhersagbare Störung beim Führen der Hand auszugleichen; das geht vergleichsweise schnell und bleibt eng an die geübte Aufgabe gebunden. Die Hand korrigiert dabei in kleinen Schüben, und große, schnelle Korrekturen streuen stärker als kleine. Für Drills dieser Art gibt es keine Studie; ob sich Gegenhalten am Tablet auf Spiele oder den Alltag überträgt, ist nicht belegt. Gemessen wird die Fingerhöhe gegen das Ziel, nicht der Blick.',
      improved:
        'Das Vorbild ist ein Maus-Drill mit Spielthema, gehaltener Taste und Zeitbonus. Hier: neutrales Ziel (Ring), Touch statt Maus; die Marke bewegt sich nach Zeit, nicht nach Bildzahl (60- und 120-Hz-Geräte gleich); jeder Zug hat leicht andere Höhe und Dauer, damit man ihn nicht auswendig lernt; feste Dauer je Durchgang ohne Zeitbonus; Abheben ist eine Pause. Zughöhe, Zugtempo und Schwankung steigen mit der Stufe und passen sich nach oben und unten an. Hauptwert ist die Stufe, dazu Zeit im Ring und mittlerer Abstand.',
    },
    it: {
      trains: 'Tenere contro con la mano: il segno viene tirato in modo regolare verso l’alto, tu lo tieni con l’altezza del dito nell’anello attorno al bersaglio.',
      daily: 'Guidare con calma un cursore o uno scorrevole che se ne va da solo; tenere contro in modo regolare e dosato invece di correggere a scatti.',
      research:
        'In laboratorio le persone imparano a compensare una perturbazione costante e prevedibile mentre guidano la mano; succede in tempi relativamente brevi e resta strettamente legato al compito esercitato. La mano corregge a piccoli scatti, e le correzioni grandi e rapide hanno più dispersione di quelle piccole. Per esercizi di questo tipo non esistono studi; non è dimostrato che tenere contro sul tablet si trasferisca ai giochi o alla vita di tutti i giorni. Si misura l’altezza del dito rispetto al bersaglio, non lo sguardo.',
      improved:
        'Il modello è un esercizio con il mouse a tema di gioco, tasto premuto e bonus di tempo. Qui: bersaglio neutro (anello), touch invece del mouse; il segno si muove in base al tempo, non al numero di immagini (uguale su dispositivi a 60 e 120 Hz); ogni trazione ha altezza e durata leggermente diverse, così non la si impara a memoria; durata fissa per turno senza bonus di tempo; sollevare il dito è una pausa. Altezza, velocità della trazione e oscillazione aumentano con il livello e si adattano verso l’alto e verso il basso. Il valore principale è il livello, in più tempo nell’anello e distanza media.',
    },
  },
  sources: [
    src('Shadmehr & Mussa-Ivaldi (1994). Adaptive representation of dynamics during learning of a motor task. The Journal of Neuroscience', 'https://doi.org/10.1523/JNEUROSCI.14-05-03208.1994'),
    src('Miall, Weir & Stein (1993). Intermittency in human manual tracking tasks. Journal of Motor Behavior', 'https://doi.org/10.1080/00222895.1993.9941639'),
    src('Harris & Wolpert (1998). Signal-dependent noise determines motor planning. Nature', 'https://doi.org/10.1038/29528'),
    src('Burdet et al. (2001). The central nervous system stabilizes unstable dynamics by learning optimal impedance. Nature', 'https://doi.org/10.1038/35106566'),
    src('Krakauer et al. (2019). Motor learning. Comprehensive Physiology', 'https://doi.org/10.1002/cphy.c170043'),
    src('Parhi, Karlson & Bederson (2006). Target size study for one-handed thumb use on small touchscreen devices. MobileHCI ’06', 'https://doi.org/10.1145/1152215.1152260'),
  ],
};
