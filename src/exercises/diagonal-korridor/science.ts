import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/810-cross-body-movement.md und docs/uebungskatalog/literatur/lit-W11-koerper-b.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'diagonal-korridor',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Eine Marke mit dem Finger ruhig und gleichmäßig durch einen schmalen, schrägen Gang von Ecke zu Ecke ziehen, ohne die Wand zu berühren.',
      daily: 'Überall, wo man eine Bewegung entlang eines engen Wegs führt: mit dem Stift eine Linie ziehen, einen Pfad auf dem Touchscreen nachfahren, etwas durch eine schmale Lücke führen.',
      research:
        'Für Bewegungen durch einen Tunnel gilt das Steering-Gesetz: Je länger und schmaler der Weg, desto mehr Zeit braucht man. Zielgerichtete Bewegungen bestehen aus einem geplanten ersten Schwung und einer Feinkorrektur nach Rückmeldung; Menschen blicken dabei meist zum Ziel, und die Bewegung wird genauer, wenn die Augen dorthin gehen dürfen. Aussagen, solche Übungen „verbänden“ die Hirnhälften oder wirkten wie Überkreuzbewegungen, sind nicht belegt; die zitierte Forschung spricht eher für mechanische als für Hirn-Erklärungen. Ein Nutzen für den Alltag ist nicht belegt.',
      improved:
        'Das Original ist ein Maus-Spiel mit Zeigersperre und auf dem Tablet nicht spielbar; seine Aussagen zu Körper und Hirnhälften sind nicht gedeckt. Hier steht ehrlich, dass du mit dem Finger am Bildschirm ziehst. Die Kugel sitzt über dem Finger, sodass er nichts verdeckt. Die Wand wird in kleinen Schritten geprüft, unabhängig von der Bildrate; du siehst weiche Hinweise mit ✗ statt rotem Blitzen oder Wackeln und musst nicht von vorn beginnen. Gangbreite und Länge passen sich an, die Startecke wechselt. Dauer und Gleichmäßigkeit werden mitgeschrieben, Tempo bringt aber keine Punkte. Gemessen wird nur dein Fingerweg auf diesem Gerät – nicht dein Blick.',
    },
    it: {
      trains: 'Trascinare con il dito un segno in modo calmo e regolare in uno stretto corridoio obliquo da un angolo all’altro, senza toccare la parete.',
      daily: 'Ovunque si guidi un movimento lungo un percorso stretto: tracciare una linea con la penna, seguire un tracciato sul touchscreen, far passare qualcosa in una fessura.',
      research:
        'Per i movimenti attraverso un tunnel vale la legge dello sterzo (steering law): più il percorso è lungo e stretto, più tempo serve. I movimenti mirati constano di un primo impulso pianificato e di una correzione fine in base al riscontro; di solito si guarda verso la meta e il movimento è più preciso se gli occhi possono andarci. Le affermazioni secondo cui tali esercizi «collegherebbero» gli emisferi cerebrali o agirebbero come movimenti incrociati non sono dimostrate; la ricerca citata indica spiegazioni meccaniche più che cerebrali. Un beneficio per la vita quotidiana non è dimostrato.',
      improved:
        'L’originale è un gioco con il mouse con blocco del puntatore e non si può giocare su un tablet; le sue affermazioni su corpo ed emisferi non sono sostenute. Qui è chiaro che trascini il dito sullo schermo. La pallina sta sopra il dito, così il dito non copre nulla. La parete viene controllata a piccoli passi, indipendentemente dalla frequenza dello schermo; vedi segnali morbidi con ✗ invece di lampi rossi o scosse e non devi ricominciare da capo. Larghezza e lunghezza si adattano, l’angolo di partenza cambia. Durata e regolarità vengono annotate, ma la velocità non dà punti. Si misura solo il percorso del tuo dito su questo dispositivo – non lo sguardo.',
    },
  },
  sources: [
    src("Accot & Zhai (1997). Beyond Fitts' law: Models for trajectory-based HCI tasks. Proceedings of CHI '97", 'https://doi.org/10.1145/258549.258760'),
    src("Elliott, Helsen & Chua (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. Psychological Bulletin", 'https://doi.org/10.1037/0033-2909.127.3.342'),
    src('Abrams, Meyer & Kornblum (1990). Eye-hand coordination: Oculomotor control in rapid aimed limb movements. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/0096-1523.16.2.248'),
    src('Carey, Hargreaves & Goodale (1996). Reaching to ipsilateral or contralateral targets: Within-hemisphere visuomotor processing cannot explain hemispatial differences in motor control. Experimental Brain Research', 'https://doi.org/10.1007/BF00227955'),
    src('Hyatt (2007). Brain Gym: Building stronger brains or wishful thinking? Remedial and Special Education', 'https://doi.org/10.1177/07419325070280020201'),
  ],
};
