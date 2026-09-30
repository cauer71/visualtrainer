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
        'Aufmerksamkeit lässt sich auch auf Orte richten, auf die man nicht direkt schaut, und plötzlich erscheinende Dinge ziehen sie von selbst an. Aufgaben mit einer Zeichenaufgabe in der Mitte und Reizen am Rand werden mit Übung deutlich besser – bei der geübten Aufgabe. Eine Übersicht zu Geräten für das Randsehen im Sport fand keine Studie, die per Blickmessung geprüft hat, ob wirklich am Rand gesehen wurde; das gilt auch hier: Der Blick wird nicht gemessen. Ein Nutzen für Alltag, Sport oder Straßenverkehr ist nicht belegt, und die Übung ist kein Gesichtsfeldtest.',
      improved:
        'Der Punkt blendet weich ein und aus (mindestens 150 ms, kein Blitzen, kein Leuchtsaum), eine kleine Aufgabe in der Mitte gibt dem Blick einen Grund, dort zu bleiben, die Orte sind gleichmäßig über acht Richtungen und zwei bis drei Ringe verteilt und nutzen die ganze Bühne, die Anzeigedauer passt sich adaptiv an, und Rand und Mitte werden getrennt ausgewertet. Wohin du schaust, misst die App nicht.',
    },
    it: {
      trains: 'Lasciare lo sguardo al centro, notare un punto che compare per un attimo al margine e toccare con precisione il suo punto.',
      daily: 'Notare qualcosa al margine mentre si guarda altrove, per esempio nei giochi con la palla o guardandosi intorno; distribuire l’attenzione su tutto lo schermo.',
      research:
        'L’attenzione può essere rivolta anche a punti che non si guardano direttamente, e le cose che compaiono all’improvviso la attirano da sole. I compiti con un compito sui simboli al centro e stimoli al margine migliorano nettamente con l’esercizio – nel compito esercitato. Una rassegna sugli strumenti per la visione periferica nello sport non ha trovato studi che abbiano verificato con la misurazione dello sguardo se si guardasse davvero al margine; vale anche qui: lo sguardo non viene misurato. Un’utilità per vita quotidiana, sport o traffico non è dimostrata, e l’esercizio non è un esame del campo visivo.',
      improved:
        'Il punto compare e scompare gradualmente (almeno 150 ms, nessun lampo, nessun alone luminoso), un piccolo compito al centro dà allo sguardo un motivo per restare lì, i punti sono distribuiti in modo uniforme su otto direzioni e due o tre anelli e usano tutto lo schermo, la durata si adatta, e margine e centro vengono valutati separatamente. Dove guardi, l’app non lo misura.',
    },
  },
  sources: [
    src('Posner (1980). Orienting of attention. Quarterly Journal of Experimental Psychology', 'https://doi.org/10.1080/00335558008248231'),
    src('Theeuwes, Kramer, Hahn & Irwin (1998). Our eyes do not always go where we want them to go: Capture of the eyes by new objects. Psychological Science', 'https://doi.org/10.1111/1467-9280.00071'),
    src('Ball, Beard, Roenker, Miller & Griggs (1988). Age and visual search: Expanding the useful field of view. Journal of the Optical Society of America A', 'https://doi.org/10.1364/JOSAA.5.002210'),
    src('Vater & Strasburger (2021). Topical review: The top five peripheral vision tools in sport. Optometry and Vision Science', 'https://doi.org/10.1097/OPX.0000000000001732'),
    src('Strasburger, Rentschler & Jüttner (2011). Peripheral vision and pattern recognition: A review. Journal of Vision', 'https://doi.org/10.1167/11.5.13'),
    src('Simons, Boot, Charness, Gathercole, Chabris, Hambrick & Stine-Morrow (2016). Do "brain-training" programs work? Psychological Science in the Public Interest', 'https://doi.org/10.1177/1529100616661983'),
  ],
};
