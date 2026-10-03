import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'rand-ping',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Den Blick in der Mitte lassen, einen kurz erscheinenden Punkt am Rand bemerken und seinen Ort genau antippen.',
      daily: 'Etwas am Rand bemerken, während du woanders hinschaust, etwa im Ballspiel oder beim Umschauen; Aufmerksamkeit auf den ganzen Bildschirm verteilen.',
      research:
        'Aufmerksamkeit lässt sich auch auf Orte richten, auf die man nicht direkt schaut, und plötzlich erscheinende Dinge ziehen sie von selbst an. Aufgaben mit einer Zeichenaufgabe in der Mitte und Reizen am Rand werden mit Übung deutlich besser – bei der geübten Aufgabe. Eine Übersicht zu Geräten für das Randsehen im Sport fand keine Studie, die per Blickmessung geprüft hat, ob wirklich am Rand gesehen wurde; das gilt auch hier: Der Blick wird nicht gemessen. Ein Nutzen für Alltag, Sport oder Straßenverkehr ist nicht belegt, und die Übung ist kein Gesichtsfeldtest: Neu bemerkte Lücken im Gesichtsfeld, Doppelbilder oder ein plötzlicher Sehverlust gehören in eine ärztliche Untersuchung (Muchnick, 2008).',
      improved:
        'Der Punkt blendet weich ein und aus (je Übergang mindestens 150 ms, kein Blitzen, kein Leuchtsaum), damit er sich nicht durch einen harten Einsatz aufdrängt. Eine kleine Aufgabe in der Mitte – ein Kreis oder ein Quadrat, das du danach wählst – gibt dem Blick einen Grund, dort zu bleiben. Die Orte verteilen sich gleichmäßig über acht Richtungen und zwei bis drei Ringe und nutzen die ganze Bühne, sodass Rand und Mitte getrennt ausgewertet werden können. Die Anzeigedauer sinkt von Stufe zu Stufe (von 1 000 auf bis zu 400 ms) und passt sich an dein Ergebnis an; richtig heißt, dass Ort und Zeichen stimmen. Wohin du schaust, misst die App nicht.',
    },
    it: {
      trains: 'Lasciare lo sguardo al centro, notare un punto che compare per un attimo al margine e toccare con precisione il suo punto.',
      daily: 'Notare qualcosa al margine mentre si guarda altrove, per esempio nei giochi con la palla o guardandosi intorno; distribuire l’attenzione su tutto lo schermo.',
      research:
        'L’attenzione può essere rivolta anche a punti che non si guardano direttamente, e le cose che compaiono all’improvviso la attirano da sole. I compiti con un compito sui simboli al centro e stimoli al margine migliorano nettamente con l’esercizio – nel compito esercitato. Una rassegna sugli strumenti per la visione periferica nello sport non ha trovato studi che abbiano verificato con la misurazione dello sguardo se si guardasse davvero al margine; vale anche qui: lo sguardo non viene misurato. Un’utilità per vita quotidiana, sport o traffico non è dimostrata, e l’esercizio non è un esame del campo visivo: nuove lacune nel campo visivo, visione doppia o un’improvvisa perdita della vista vanno fatte valutare da un medico (Muchnick, 2008).',
      improved:
        'Il punto compare e scompare gradualmente (almeno 150 ms per ogni transizione, nessun lampo, nessun alone luminoso), così non si impone con un’entrata brusca. Un piccolo compito al centro – un cerchio o un quadrato che scegli dopo – dà allo sguardo un motivo per restare lì. I punti sono distribuiti in modo uniforme su otto direzioni e due o tre anelli e usano tutto lo schermo, così margine e centro possono essere valutati separatamente. La durata di visualizzazione diminuisce a ogni livello (da 1 000 a fino a 400 ms) e si adatta al tuo risultato; giusto significa che posizione e simbolo corrispondono. Dove guardi, l’app non lo misura.',
    },
  },
  sources: [
    src('Posner (1980). Orienting of attention. Quarterly Journal of Experimental Psychology', 'https://doi.org/10.1080/00335558008248231'),
    src('Theeuwes, Kramer, Hahn & Irwin (1998). Our eyes do not always go where we want them to go: Capture of the eyes by new objects. Psychological Science', 'https://doi.org/10.1111/1467-9280.00071'),
    src('Ball, Beard, Roenker, Miller & Griggs (1988). Age and visual search: Expanding the useful field of view. Journal of the Optical Society of America A', 'https://doi.org/10.1364/JOSAA.5.002210'),
    src('Vater & Strasburger (2021). Topical review: The top five peripheral vision tools in sport. Optometry and Vision Science', 'https://doi.org/10.1097/OPX.0000000000001732'),
    src('Strasburger, Rentschler & Jüttner (2011). Peripheral vision and pattern recognition: A review. Journal of Vision', 'https://doi.org/10.1167/11.5.13'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice. 2nd ed. Mosby/Elsevier. S. 6, 32', 'https://openlibrary.org/isbn/9780323029612'),
    src('Simons, Boot, Charness, Gathercole, Chabris, Hambrick & Stine-Morrow (2016). Do "brain-training" programs work? Psychological Science in the Public Interest', 'https://doi.org/10.1177/1529100616661983'),
  ],
};
