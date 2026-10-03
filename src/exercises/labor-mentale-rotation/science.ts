// Quellen: jede Angabe einzeln per Crossref (Metadaten, Autoren, Zeitschrift, Band, Seiten) und über PubMed (Abstract) geprüft
// (02.10.2026); die Aussagen im Text wurden mit dem Abstract abgeglichen.
// Aus dem Labor-Prototyp (help/rotation.js) bestätigt: Shepard & Metzler (1971): Abstract (PubMed): Die Zeit, zu erkennen, dass
// zwei perspektivische Zeichnungen dieselbe dreidimensionale Form zeigen, ist eine linear ansteigende Funktion des Winkelunterschieds –
// und für Drehungen in der Bildebene nicht kürzer als für Drehungen in die Tiefe. Das gilt für Würfelfiguren, nicht für die flachen
// Quadratfiguren dieser Übung; das steht im Text.
// Nicht aufgenommen: Bethell-Fox & Shepard (1988), J Exp Psychol Hum Percept Perform 14, 12–23 (10.1037/0096-1523.14.1.12) – Metadaten
// bestätigt (Crossref), aber weder PubMed noch OpenAlex noch Semantic Scholar haben einen Abstract; die Aussage „mehr Quadrate sind
// schwerer, Vertrautheit verringert den Unterschied“ konnte nicht bestätigt werden und steht deshalb nur als Hinweis (meist schwerer)
// in den Einstellungstexten, nicht in der Wissenschaftsseite.
// Ergänzt und geprüft: Zacks (2008), Uttal et al. (2013), Wright et al. (2008), Pronk et al. (2020).
// Gestrichen aus dem Prototyp-Text (nicht belegt): „Der Anstieg ist ein Maß für die Geschwindigkeit der mentalen Rotation“,
// „kleinerer Anstieg: Hinweis auf effizientere mentale Drehung“, „Der Drehwinkel verlängert die Antwort. Das ist normal.“.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-mentale-rotation',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Eine gedrehte Figur im Kopf zurückdrehen und entscheiden, ob sie dieselbe oder ihr Spiegelbild ist. Zahl der Aufgaben, Quadrate pro Figur, Drehwinkel, Quadratgröße und Zeitlimit stellst du selbst ein.',
      daily: 'Überall, wo man sich vorstellen muss, wie etwas aussieht, wenn man es dreht: Pläne und Karten lesen, Möbel oder Pakete anordnen, Teile zusammenfügen. Ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Die Aufgabe geht auf klassische Versuche zurück: Shepard & Metzler (1971) fanden, dass die Zeit, zwei perspektivische Zeichnungen derselben dreidimensionalen Form als gleich zu erkennen, linear mit dem Drehwinkel zwischen beiden anwuchs – und bei Drehung in der Bildebene nicht kürzer war als bei Drehung in die Tiefe. Das waren Würfelfiguren; die flachen Quadratfiguren dieser Übung wurden dort nicht untersucht, ob die Antwortzeit hier genauso verläuft, ist nicht geprüft. Eine Übersichtsarbeit zu bildgebenden Studien fand, dass mentale Rotation mit Aktivität im Scheitellappen (um den Sulcus intraparietalis) einhergeht und – unter bestimmten Bedingungen – auch in einem motorischen Gebiet der Großhirnrinde (Zacks, 2008). Zum Üben: In einer Auswertung von 217 Studien verbesserte Training räumliche Fähigkeiten im Mittel mit einer Effektstärke von 0,47 gegenüber Kontrollgruppen, und die Verbesserung übertrug sich auf andere, nicht geübte räumliche Aufgaben (Uttal et al., 2013). In einer Studie mit 31 Personen und 21 Tagen Üben mit einer Rotationsaufgabe übertrug sich der Gewinn auf neue Figuren und auf eine andere räumliche Aufgabe (Wright et al., 2008). Das sind Ergebnisse aus Studien mit anderen Aufgaben und Trainingsplänen; dass das auch für diese Übung oder für den Alltag gilt, ist nicht belegt. Der Anstieg der Antwortzeit je 90° dient hier nur dem Vergleich mit dir selbst, es gibt keinen Richtwert. Touchscreens messen Zeiten durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020); Tablets wurden dort nicht untersucht. Darum zählt nur der Vergleich mit dir selbst auf demselben Gerät und mit denselben Einstellungen. Für genau diese Übung gibt es keine Studie.',
      improved:
        'Die Aufgabe hat immer genau eine richtige Antwort: Die Vergleichsfigur entsteht durch eine Drehung, die die Händigkeit nie ändert, und bei „gespiegelt“ zusätzlich durch eine Spiegelung; die Ausgangsfigur wird so gewählt, dass ihr Spiegelbild durch keine Drehung mit ihr zur Deckung kommt (durch Tests abgesichert, auch bei 45°). Die ungedrehte Figur (0°) gehört dazu, Winkel und „gleich/gespiegelt“ kommen ausgewogen vor, und die Figuren sind kompakt, damit sie auf kleine Bildschirme passen. Die Quadratgröße wird in Zentimetern eingestellt (nach Kalibrierung), die Antwortknöpfe tragen Symbol und Wort, und die Zeit läuft erst, wenn die Figuren zu sehen sind. Der Anstieg der Antwortzeit wird nur bei genug richtigen Antworten und Winkelstufen gezeigt, und Verlauf, Bestwert und „Letztes Mal“ vergleichen nur Durchläufe mit gleichen Einstellungen. Die Rückmeldung nennt die richtige Antwort (✓/✗ statt Blitzen); Noten, Normwerte und Ranglisten gibt es nicht.',
    },
    it: {
      trains: 'Ruotare a mente una figura e decidere se è la stessa o la sua immagine speculare. Numero di compiti, quadrati per figura, angolo di rotazione, grandezza dei quadrati e limite di tempo li imposti tu.',
      daily: 'Ovunque si debba immaginare come appare qualcosa se lo si gira: leggere piantine e mappe, disporre mobili o pacchi, montare pezzi. Che l’esercizio aiuti non è dimostrato.',
      research:
        'Il compito risale a esperimenti classici: Shepard e Metzler (1971) trovarono che il tempo per riconoscere due disegni prospettici della stessa forma tridimensionale come uguali cresceva linearmente con l’angolo di rotazione tra i due – e per una rotazione nel piano dell’immagine non era più breve che per una rotazione in profondità. Erano figure di cubi; le figure piatte di quadrati di questo esercizio lì non sono state studiate, se il tempo di risposta qui si comporti allo stesso modo non è stato verificato. Una rassegna di studi di neuroimmagine trovò che la rotazione mentale si accompagna ad attività nel lobo parietale (intorno al solco intraparietale) e – a certe condizioni – anche in un’area motoria della corteccia cerebrale (Zacks, 2008). Sull’esercizio: in un’analisi di 217 studi l’allenamento migliorava le capacità spaziali in media con una dimensione dell’effetto di 0,47 rispetto ai gruppi di controllo, e il miglioramento si trasferiva ad altri compiti spaziali non allenati (Uttal et al., 2013). In uno studio con 31 persone e 21 giorni di esercizio con un compito di rotazione il guadagno si trasferiva a nuove figure e a un altro compito spaziale (Wright et al., 2008). Sono risultati di studi con altri compiti e piani di allenamento; che valgano anche per questo esercizio o per la vita quotidiana non è dimostrato. L’aumento del tempo di risposta ogni 90° serve qui solo al confronto con te stesso, non esiste un valore di riferimento. I touchscreen misurano i tempi sistematicamente un po’ in eccesso, in modo diverso a seconda del dispositivo (Pronk et al., 2020); i tablet non erano stati studiati. Per questo conta solo il confronto con te stesso sullo stesso dispositivo e con le stesse impostazioni. Per questo esercizio non esiste uno studio.',
      improved:
        'Il compito ha sempre una sola risposta giusta: la figura di confronto nasce da una rotazione, che non cambia mai la chiralità, e con “speculare” in più da una riflessione; la figura di partenza è scelta in modo che la sua immagine speculare non coincida con lei con nessuna rotazione (verificato con test, anche a 45°). La figura non ruotata (0°) fa parte dei compiti, angoli e “uguale/speculare” compaiono in modo equilibrato e le figure sono compatte, così stanno sugli schermi piccoli. La grandezza dei quadrati si imposta in centimetri (dopo la calibrazione), i pulsanti di risposta portano simbolo e parola e il tempo parte solo quando le figure sono visibili. L’aumento del tempo di risposta viene mostrato solo con abbastanza risposte giuste e livelli di angolo, e andamento, record e “ultima volta” confrontano solo giri con le stesse impostazioni. Il riscontro indica la risposta giusta (✓/✗ invece di lampi); non ci sono voti, valori normali né classifiche.',
    },
  },
  sources: [
    src('Shepard & Metzler (1971). Mental rotation of three-dimensional objects. Science', 'https://doi.org/10.1126/science.171.3972.701'),
    src('Zacks (2008). Neuroimaging studies of mental rotation: A meta-analysis and review. Journal of Cognitive Neuroscience', 'https://doi.org/10.1162/jocn.2008.20013'),
    src('Uttal, Meadow, Tipton, Hand, Alden, Warren & Newcombe (2013). The malleability of spatial skills: A meta-analysis of training studies. Psychological Bulletin', 'https://doi.org/10.1037/a0028446'),
    src('Wright, Thompson, Ganis, Newcombe & Kosslyn (2008). Training generalized spatial skills. Psychonomic Bulletin & Review', 'https://doi.org/10.3758/pbr.15.4.763'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
  ],
};
