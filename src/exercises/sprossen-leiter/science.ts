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
        'Abfolgen von Bewegungen werden nach Forschungsstand vorausgeplant und oft in kleine Gruppen gegliedert; solche Gruppen wirken auch als Einheiten im Gedächtnis. Beim Abfangen bewegter Ziele ist das Timing präziser, wenn man den Treffpunkt frei wählen darf. Ein Training mit echter Koordinationsleiter verbesserte bei Jugendfußballern Sprint, Wendigkeit und Dribbling nicht stärker als bei der Kontrollgruppe. Diese Bildschirmübung misst nur das Antippen am Takt und hat keine eigene Studie; ein Nutzen für Sport, Beinarbeit oder den Alltag ist nicht belegt. Doppelbilder, plötzliche Sehverschlechterung, Kopfschmerz mit Sehverschlechterung oder Schwindel gehören ärztlich abgeklärt; die Übung ist weder Test noch Diagnose (Lehrbuchwissen: Muchnick, 2008).',
      improved:
        'Die Leiter steht still, und die Aufgabe ist rein zeitlich: Ein sanfter Taktgeber (höchstens zwei Schläge pro Sekunde, kein Blitzen, die Schläge sind auch zu hören) gibt den Rhythmus vor, die Sprosse, die an der Reihe ist, atmet mit, und ein Ring schrumpft zum Schlag hin. Man tippt die Felder im Zickzack von unten nach oben, jedes auf seinen Schlag; drei Schläge vorab dienen zum Einschwingen. Nach jedem Tipp erscheint ✓ oder ✗ mit der Abweichung in Millisekunden, zu früh oder zu spät, und eine Leiter gelingt, wenn drei Viertel der Sprossen im Takt liegen (Toleranz 30 % der Taktdauer). Mit den Stufen wird der Takt von 1,0 auf 0,5 s verkürzt und die Zahl der Sprossen steigt von vier auf sieben; es gibt kein Rot, kein Wackeln und keine Punkte für Tempo. Gemessen wird die Zeit zwischen Berührung und Schlag auf diesem Gerät; die Verzögerung des Touchscreens ist darin enthalten, deshalb ist die Zahl nur im Vergleich mit dir selbst auf diesem Gerät aussagekräftig.',
    },
    it: {
      trains: 'Toccare una serie di riquadri a zigzag verso l’alto centrando il ritmo di un metronomo.',
      daily: 'Ovunque si esegua una serie di gesti con ritmo regolare: premere tasti in sequenza, una procedura su un apparecchio, battere le mani o contare a tempo.',
      research:
        'Secondo la ricerca le sequenze di movimenti vengono pianificate in anticipo e spesso suddivise in piccoli gruppi; tali gruppi agiscono anche come unità nella memoria. Nell’intercettare bersagli in movimento il tempismo è più preciso se si può scegliere liberamente il punto d’incontro. Un allenamento con una vera scala di coordinazione non ha migliorato sprint, agilità e dribbling dei giovani calciatori più del gruppo di controllo. Questo esercizio sullo schermo misura solo il tocco a tempo e non ha uno studio specifico; un beneficio per sport, gioco di gambe o vita quotidiana non è dimostrato. Visione doppia, improvviso peggioramento della vista, mal di testa con peggioramento della vista o vertigini vanno chiariti dal medico; l’esercizio non è né un test né una diagnosi (manuale: Muchnick, 2008).',
      improved:
        'La scala sta ferma e il compito è puramente temporale: un metronomo morbido (al massimo due battiti al secondo, senza lampi, i battiti si sentono anche) dà il ritmo, il piolo che tocca «respira» insieme a lui e un anello si restringe verso il battito. Si toccano i riquadri a zigzag dal basso verso l’alto, ciascuno sul proprio battito; tre battiti iniziali servono per entrare nel ritmo. Dopo ogni tocco compare ✓ o ✗ con lo scostamento in millisecondi, in anticipo o in ritardo, e una scala riesce se tre quarti dei pioli sono a tempo (tolleranza 30 % della durata del battito). Con i livelli il ritmo passa da 1,0 a 0,5 s e il numero di pioli sale da quattro a sette; niente rosso, niente scosse, nessun punto per la velocità. Si misura il tempo tra il tocco e il battito su questo dispositivo; il ritardo dello schermo tattile ne fa parte, perciò il valore ha senso solo nel confronto con te stesso su questo dispositivo.',
    },
  },
  sources: [
    src("Rosenbaum, Cohen, Jax, Weiss & van der Wel (2007). The problem of serial order in behavior: Lashley's legacy. Human Movement Science", 'https://doi.org/10.1016/j.humov.2007.04.001'),
    src('Sakai, Kitaguchi & Hikosaka (2003). Chunking during human visuomotor sequence learning. Experimental Brain Research', 'https://doi.org/10.1007/s00221-003-1548-8'),
    src('Brenner & Smeets (2015). How people achieve their amazing temporal precision in interception. Journal of Vision', 'https://doi.org/10.1167/15.3.8'),
    src('Padrón-Cabo, Rey, Kalén & Costa (2020). Effects of training with an agility ladder on sprint, agility, and dribbling performance in youth soccer players. Journal of Human Kinetics', 'https://doi.org/10.2478/hukin-2019-0146'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier, S. 6 und 28 (Warnzeichen mit Abklärungsbedarf)', 'https://openlibrary.org/isbn/9780323029612'),
  ],
};
