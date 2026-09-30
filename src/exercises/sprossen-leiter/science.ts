import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/807-agility-ladder.md und docs/uebungskatalog/literatur/lit-W11-koerper-b.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'sprossen-leiter',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Eine Reihenfolge von Feldern im Zickzack nach oben tippen und dabei den Takt eines Taktgebers treffen.',
      daily: 'Überall, wo man eine Abfolge von Handgriffen in gleichmäßigem Rhythmus ausführt: Tasten in einer Folge drücken, einen Ablauf am Gerät, Klatschen oder Mitzählen im Takt.',
      research:
        'Abfolgen von Bewegungen werden nach Forschungsstand vorausgeplant und oft in kleine Gruppen gegliedert; solche Gruppen wirken auch als Einheiten im Gedächtnis. Beim Abfangen bewegter Ziele ist das Timing präziser, wenn man den Treffpunkt frei wählen darf. Ein Training mit echter Koordinationsleiter verbesserte bei Jugendfußballern Sprint, Wendigkeit und Dribbling nicht stärker als bei der Kontrollgruppe. Diese Bildschirmübung misst nur das Antippen am Takt und hat keine eigene Studie; ein Nutzen für Sport, Beinarbeit oder den Alltag ist nicht belegt.',
      improved:
        'Das Original ist ein Maus-Spiel mit abwärts rollenden Leitern, Tempo in Pixeln pro Bild und ohne Obergrenze. Hier steht ehrlich, dass du mit dem Finger am Bildschirm spielst, nicht mit den Beinen. Die Leiter steht still; ein sanfter Taktgeber (höchstens zwei Schläge pro Sekunde, kein Blitzen) gibt den Rhythmus vor. Jede Sprosse zeigt ihre Nummer und danach ✓ oder ✗ mit der Abweichung in Millisekunden, zu früh oder zu spät. Der Takt wird nach Stufe schneller, aber nie über 2 Hz; kein rotes Blitzen, kein Wackeln, keine Tempo-Punkte. Die Berührungszeit kommt vom Ereigniszeitpunkt des Fingers; die Verzögerung des Touchscreens ist darin enthalten und nur im Vergleich mit dir selbst auf diesem Gerät aussagekräftig.',
    },
    it: {
      trains: 'Toccare una serie di riquadri a zigzag verso l’alto centrando il ritmo di un metronomo.',
      daily: 'Ovunque si esegua una serie di gesti con ritmo regolare: premere tasti in sequenza, una procedura su un apparecchio, battere le mani o contare a tempo.',
      research:
        'Secondo la ricerca le sequenze di movimenti vengono pianificate in anticipo e spesso suddivise in piccoli gruppi; tali gruppi agiscono anche come unità nella memoria. Nell’intercettare bersagli in movimento il tempismo è più preciso se si può scegliere liberamente il punto d’incontro. Un allenamento con una vera scala di coordinazione non ha migliorato sprint, agilità e dribbling dei giovani calciatori più del gruppo di controllo. Questo esercizio sullo schermo misura solo il tocco a tempo e non ha uno studio specifico; un beneficio per sport, gioco di gambe o vita quotidiana non è dimostrato.',
      improved:
        'L’originale è un gioco con il mouse con scale che scorrono verso il basso, velocità in pixel per fotogramma e senza limite. Qui è chiaro che giochi con il dito sullo schermo, non con le gambe. La scala sta ferma; un metronomo morbido (al massimo due battiti al secondo, senza lampi) dà il ritmo. Ogni piolo mostra il suo numero e poi ✓ o ✗ con lo scostamento in millisecondi, in anticipo o in ritardo. Il ritmo accelera con il livello, ma mai oltre 2 Hz; nessun lampo rosso, nessuna scossa, nessun punto per la velocità. Il momento del tocco viene dall’istante dell’evento del dito; il ritardo dello schermo tattile ne fa parte ed è significativo solo nel confronto con te stesso su questo dispositivo.',
    },
  },
  sources: [
    src("Rosenbaum, Cohen, Jax, Weiss & van der Wel (2007). The problem of serial order in behavior: Lashley's legacy. Human Movement Science", 'https://doi.org/10.1016/j.humov.2007.04.001'),
    src('Sakai, Kitaguchi & Hikosaka (2003). Chunking during human visuomotor sequence learning. Experimental Brain Research', 'https://doi.org/10.1007/s00221-003-1548-8'),
    src('Brenner & Smeets (2015). How people achieve their amazing temporal precision in interception. Journal of Vision', 'https://doi.org/10.1167/15.3.8'),
    src('Padrón-Cabo, Rey, Kalén & Costa (2020). Effects of training with an agility ladder on sprint, agility, and dribbling performance in youth soccer players. Journal of Human Kinetics', 'https://doi.org/10.2478/hukin-2019-0146'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
  ],
};
