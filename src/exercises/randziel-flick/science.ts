import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'randziel-flick',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Von einer festen Startmarke in der Mitte zu einem plötzlich am linken oder rechten Rand erscheinenden Ziel tippen.',
      daily: 'Nach etwas greifen, das am Rand des Blickfelds auftaucht; Ballspiele; Bedienung weit entfernter Schaltflächen auf dem Bildschirm.',
      research:
        'Bei Zielbewegungen bewegt sich der Blick meist zuerst zum Ziel, die Hand folgt kurz danach; ein plötzlich erscheinender Reiz zieht dabei die Aufmerksamkeit an. Wie lange die Bewegung dauert, hängt vom Weg und von der Zielgröße ab (Fitts’sches Gesetz). Bei Aufgaben mit Zeigebewegungen am Bildschirm werden Menschen mit Übung schneller – ein Teil davon ist Gewöhnung an Gerät und Aufgabe. Ein Nutzen für Sport, Straßenverkehr oder Alltag ist nicht belegt. Hier wird nur die Zeit bis zum Tipp gemessen, nicht der Blick; vergleiche dich nur mit dir selbst auf demselben Gerät.',
      improved:
        'Jeder Durchgang startet an derselben Marke (vergleichbare Wege), die Wartezeit ist unvorhersehbar, das Ziel hält Abstand zum Rand (kein Anstoßen), feste Zahl Durchgänge statt Zeitkonto, kein Strafabzug, kein Rot-Blitz, kein Bildschütteln, weiches Ein- und Ausblenden, große Trefferkreise, Median und Vergleich links/rechts statt Punktenoten.',
    },
    it: {
      trains: 'Toccare, da un segno di partenza fisso al centro, un bersaglio che compare all’improvviso sul bordo sinistro o destro.',
      daily: 'Afferrare qualcosa che compare al margine del campo visivo; giochi con la palla; uso di pulsanti lontani sullo schermo.',
      research:
        'Nei movimenti verso un bersaglio lo sguardo di solito si sposta per primo sul bersaglio e la mano segue poco dopo; uno stimolo che compare all’improvviso attira l’attenzione. La durata del movimento dipende dalla distanza e dalla dimensione del bersaglio (legge di Fitts). Nei compiti di puntamento sullo schermo le persone diventano più veloci con l’esercizio – in parte è abitudine al dispositivo e al compito. Un’utilità per sport, traffico o vita quotidiana non è dimostrata. Qui si misura solo il tempo fino al tocco, non lo sguardo; confrontati solo con te stesso sullo stesso dispositivo.',
      improved:
        'Ogni prova parte dallo stesso segno (percorsi confrontabili), l’attesa è imprevedibile, il bersaglio mantiene la distanza dal bordo (nessun urto), numero fisso di prove invece del conto alla rovescia, nessuna penalità, nessun lampo rosso, nessun tremolio, comparsa e scomparsa graduali, ampie aree di tocco, mediana e confronto sinistra/destra invece di voti a punti.',
    },
  },
  sources: [
    src('Fitts (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0055392'),
    src('Soukoreff & MacKenzie (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts’ law research in HCI. International Journal of Human-Computer Studies', 'https://doi.org/10.1016/j.ijhcs.2004.09.001'),
    src('Prablanc, Echallier, Komilis & Jeannerod (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. Biological Cybernetics', 'https://doi.org/10.1007/BF00337436'),
    src('Helsen, Elliott, Starkes & Ricker (1998). Temporal and spatial coupling of point of gaze and hand movements in aiming. Journal of Motor Behavior', 'https://doi.org/10.1080/00222899809601340'),
    src('Yantis & Jonides (1984). Abrupt visual onsets and selective attention: Evidence from visual search. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/0096-1523.10.5.601'),
    src('Darrien, Herd, Starling, Rosenberg & Morrison (2001). An analysis of the dependence of saccadic latency on target position and target characteristics in human subjects. BMC Neuroscience', 'https://doi.org/10.1186/1471-2202-2-13'),
    src('Warburton, Campagnoli, Mon-Williams, Mushtaq & Morehead (2023). Kinematic markers of skill in first-person shooter video games. PNAS Nexus', 'https://doi.org/10.1093/pnasnexus/pgad249'),
    src('Deber, Jota, Forlines & Wigdor (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. Proceedings of CHI ’15', 'https://doi.org/10.1145/2702123.2702300'),
    src('Bediou, Rodgers, Tipton, Mayer, Green & Bavelier (2023). Effects of action video game play on cognitive skills: A meta-analysis. Technology, Mind, and Behavior', 'https://doi.org/10.1037/tmb0000102'),
  ],
};
