import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'schwarm-wechsel',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Mehrere wandernde Ziele im Blick behalten, das dringendste wählen, antippen und sofort zum nächsten wechseln.',
      daily: 'Mehrere bewegte Dinge gleichzeitig beachten, etwa im Ballspiel oder bei Spielen am Bildschirm; schnelles Antippen von Zielen auf dem Tablet.',
      research:
        'Zum Zielen und Zeigen gibt es viel Forschung: Die Zeit hängt von Entfernung und Zielgröße ab, bewegte Ziele sind schwerer, und folgt ein weiteres Ziel, wird die erste Bewegung etwas länger – ein Wechsel ist nie „kostenlos“. In Studien mit ähnlichen Zielaufgaben werden Menschen mit Übung deutlich besser, vor allem an der geübten Aufgabe. Ob das auf andere Aufgaben, den Sport oder den Alltag übergeht, ist nicht belegt. Vergleiche dich nur mit dir selbst auf demselben Gerät.',
      improved:
        'Bewegung mit Zeitschritt gerechnet (gleich schnell auf jedem Gerät), sichtbarer Restzeit-Ring statt verstecktem Ablauf, feste Dauer und adaptive Stufe statt offener Runde, große Trefferflächen für den Finger, Fehler mit Symbol (✓/✗) statt rotem Vollbild-Blitz, kein Wackeln, keine Noten oder Ranglisten; gemessen wird die Zeit von Treffer zu Treffer als Median.',
    },
    it: {
      trains: 'Tenere d’occhio più bersagli in movimento, scegliere il più urgente, toccarlo e passare subito al successivo.',
      daily: 'Prestare attenzione a più cose in movimento insieme, per esempio nei giochi con la palla o sullo schermo; toccare rapidamente bersagli sul tablet.',
      research:
        'Sul puntare e indicare esiste molta ricerca: il tempo dipende dalla distanza e dalla dimensione del bersaglio, i bersagli in movimento sono più difficili e, se segue un altro bersaglio, il primo movimento dura un po’ di più – un cambio non è mai “gratuito”. Negli studi con compiti simili le persone migliorano nettamente con l’esercizio, soprattutto nel compito esercitato. Che questo si trasferisca ad altri compiti, allo sport o alla vita quotidiana non è dimostrato. Confrontati solo con te stesso sullo stesso dispositivo.',
      improved:
        'Movimento calcolato con il passo temporale (stessa velocità su ogni dispositivo), anello del tempo rimasto visibile invece di una scadenza nascosta, durata fissa e livello adattivo invece di un round aperto, grandi aree di tocco per il dito, errori con simbolo (✓/✗) invece di un lampo rosso a schermo intero, nessuno scuotimento, nessun voto o classifica; si misura il tempo tra un colpo e l’altro come mediana.',
    },
  },
  sources: [
    src('Fitts (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0055392'),
    src('Jagacinski, Repperger, Ward & Moran (1980). A test of Fitts’ law with moving targets. Human Factors', 'https://doi.org/10.1177/001872088002200211'),
    src('Helsen, Adam, Elliott & Buekers (2001). The one-target advantage: A test of the movement integration hypothesis. Human Movement Science', 'https://doi.org/10.1016/S0167-9457(01)00071-9'),
    src('Deubel & Schneider (1996). Saccade target selection and object recognition: Evidence for a common attentional mechanism. Vision Research', 'https://doi.org/10.1016/0042-6989(95)00294-4'),
    src('Baldauf & Deubel (2010). Attentional landscapes in reaching and grasping. Vision Research', 'https://doi.org/10.1016/j.visres.2010.02.008'),
    src('Warburton, Campagnoli, Mon-Williams, Mushtaq & Morehead (2023). Kinematic markers of skill in first-person shooter video games. PNAS Nexus', 'https://doi.org/10.1093/pnasnexus/pgad249'),
    src('Listman, Tsay, Kim, Mackey & Heeger (2021). Long-term motor learning in the "wild" with high volume video game data. Frontiers in Human Neuroscience', 'https://doi.org/10.3389/fnhum.2021.777779'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
