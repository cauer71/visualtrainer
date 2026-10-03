---
# ===== Kennung =====
nr: 811
kennung: complex-pattern
name: "Muster nachzeichnen: einen kurz gezeigten Linienzug aus dem Gedächtnis mit dem Finger nachzeichnen"
name_original: "Muster merken Test (Seitentitel: Muster merken Test | Visuelles Gedächtnis | SkillDrills; engl. Spielname: Complex Pattern Pro)"
kapitel: "Körper & Reflexe"
kapitel_original: "physical"
unterkapitel_original: "coordination"
quelle_url: "https://skilldrills.online/de/drills/physical/coordination/complex-pattern"
blickfit_umsetzung: {kennung: "muster-nachzeichnen", name: "Muster nachzeichnen", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/muster-nachzeichnen/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein Linienzug über drei bis neun feste Stützpunkte wird kurz gezeigt (Pfeile, Start als Dreieck) und dann ausgeblendet. Man zeichnet ihn aus dem Gedächtnis nach, indem man die Stützpunkte in der richtigen Reihenfolge antippt oder anfährt. Gewertet wird der Anteil richtig getroffener Punkte, danach erscheint das richtige Muster mit ✓/✗. Länge, Einprägezeit und Kreuzungen passen sich an; kein Zeitdruck beim Zeichnen, kein Blitz, kein Wackeln. Eine Gedächtnis- und Zeichenübung am Bildschirm, keine Körperübung."
ziel_funktionen: [kurzzeitgedaechtnis_visuell_raeumlich]
eingabe: [maus, touchpad]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code stufenloses Level = max(bisher; Punkte/250 + 1 + ⌊Serie/4⌋), sinkt nie, Start immer Level 1. Mit t = (Level−1)/14: Wegpunkte = min(8; round(3 + 5·t)) zwischen Start und Ziel, Einprägezeit = max(0,6 s; 2,0 − 1,4·t), geforderte Ähnlichkeit = min(85; 50 + 35·t), Punkte je Muster = 15 + 45·t. Ab Level 3 auch Zickzack-, ab Level 4 Spiralformen. In 45 s sind nach eigener Simulation nur Level ≈ 4–6 erreichbar (höchstens 5 Wegpunkte, Einprägezeit ≥ ≈ 1,5 s)."
messgroessen: ["Punkte", "Genauigkeit laut Spiel = 100 − mittlere Abweichung in Pixeln (Mittel aller Versuche)", "gelöste und verfehlte Muster", "längste Serie (Combo)", "erreichtes Level", "sinnvoll: Musterspanne (größte Zahl von Wegpunkten mit ≥ 75 % gelöst) und Abweichung in ° Sehwinkel"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 1
    farbunterscheidung: 1
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 1
    sakkaden: 1
    fixation: 0
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 2
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 3
    verarbeitungsgeschwindigkeit: 1
    antizipation: 0
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 2
    zielbewegung_tempo: 1
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 2
    ruhige_hand: 0
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus (Touchpad nur mit gedrückter Taste beim Ziehen); auf reinen Touch-Geräten lässt sich das Original nicht starten", "einen Linienzug von bis zu ≈ 16–26° Breite in 1,5–2 s überblicken können", "passende Korrektion für den Bildschirmabstand (bei Alterssichtigkeit Zwischenbereich)", "Farbsehen hilfreich, aber nicht zwingend (Start = cyan, Ziel = magenta; Start lässt sich auch durch Ausprobieren finden)"]
vorsicht_bei: [kognitive_einschraenkung, presbyopie_gleitsicht, farbsehschwaeche, hand_arm_beschwerden, tremor_parkinson, migraene_lichtempfindlich, photosensitive_epilepsie]
geeignet_fuer: ["kurz gezeigte räumliche Muster einprägen und aus dem Gedächtnis wiedergeben (visuell-räumliches Kurzzeitgedächtnis)", "Strategien üben: Punkte zu Formen bündeln (Chunking, z. B. Dreieck + Zickzack)", "ein inneres Bild in eine Zeichenbewegung umsetzen (Auge-Hand, ohne Vorlage)", "kurze, sprachfreie Gedächtnisaufgabe mit sofortiger Rückmeldung (das richtige Muster wird nach jedem Versuch gezeigt)"]
weniger_geeignet_fuer: ["Körper-, Gleichgewichts- oder Koordinationstraining im eigentlichen Sinn (nur die Hand bewegt sich)", "Vorbereitung auf Eignungstests oder Spiele (kein Beleg, andere Aufgaben)", "Leistungsvergleiche zwischen Personen oder Geräten (die Schwierigkeit der Muster schwankt)", "Menschen mit neu aufgetretenen Gedächtnisstörungen (zuerst ärztlich abklären lassen; die Übung ist kein Test)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: mittel
  alltag_transfer: fehlend
  kommentar: "Arbeitsgedächtnistraining verbessert kurzfristig ungeübte verbale und visuell-räumliche Arbeitsgedächtnisaufgaben, aber nicht Intelligenz, Lesen oder Rechnen (Melby-Lervåg et al., 2016; Simons et al., 2016); für diese Übung gibt es keine Studie."
aehnliche_uebungen: [603, 607, 605, 601, 810, 707, 706]
stichworte: ["Muster merken", "Pfad nachzeichnen", "visuell-räumliches Kurzzeitgedächtnis", "Visual Patterns Test", "Chunking", "Zeichnen aus dem Gedächtnis", "Maus ziehen", "Complex Pattern", "kein Körpertraining"]
---

# 811 · Muster merken und nachzeichnen – Pfad aus dem Gedächtnis ziehen

> Original: „Muster merken Test“ („Complex Pattern Pro“) – skilldrills.online, Kapitel „physical“ / „coordination“ · Blickfit-Übung: Muster nachzeichnen (`muster-nachzeichnen`)

## 1. Kurzbeschreibung
Ein Linienzug über drei bis neun von zwölf festen, unregelmäßig verteilten Stützpunkten wird kurz gezeigt; Pfeile geben die Richtung an, der Start ist als Dreieck markiert. Der Linienzug wird weich ein- und nach der Einprägezeit wieder ausgeblendet. Dann zeichnet man ihn aus dem Gedächtnis nach: Man tippt die Stützpunkte nacheinander an oder fährt sie mit dem Finger an, und die eigene Linie wächst dabei mit. Beim Zeichnen gibt es keinen Zeitdruck. Gewertet wird der Anteil der Stützpunkte, die in der richtigen Reihenfolge getroffen wurden; danach erscheint das richtige Muster zusammen mit der eigenen Linie, mit ✓ an getroffenen und ✗ an verfehlten Punkten. Mit den Stufen wird der Linienzug länger, die Einprägezeit je Punkt kürzer, und ab Stufe 7 können sich Linien kreuzen. Ein Durchgang gelingt bei mindestens 80 % richtigen Punkten; eine Sitzung hat acht Durchgänge. Erfasst werden Anteil richtig, längstes gelungenes Muster und fehlerfreie Muster. Es ist eine Gedächtnis- und Zeichenübung am Bildschirm, keine Körperübung.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext und ausgelieferter Spielcode (Chunks 16603 und 6226, abgerufen und formatiert 29.09.2026; nur Mechanik notiert). **[Code]** = aus dem Code, **[Text]** = Regeltext, **[Rechnung]** = eigene Rechnung/Simulation.

- **Spielfeld [Code]:** Canvas in Containergröße (Vorgabe 800 × 450 logische px), Hintergrund fast schwarz mit schwachem 40-px-Raster. Bei Zufalls- und Zickzackmustern liegen die Punkte mit 100 px Randabstand im Feld (bei 800 × 450 also in 600 × 250 px); Spiralen halten diesen Rand nicht ein (s. u.). Wegpunkte Radius 9 px, Start/Ziel Radius 14 px, Linie 3 px, Deckkraft 0,7.
- **Musterformen [Code]:** Zufallsverteilung aller Punkte (Kreuzungen und spitze Winkel entstehen zufällig); ab Level 3 zu ≈ 40 % Zickzack (links → rechts, abwechselnd oben/unten); ab Level 4 zu 40 % eine Spirale um die Mitte (Radius 35 px, +30 px je Punkt, Drehung ≈ 101° je Schritt; bei 5 Wegpunkten liegt der letzte Punkt ≈ 215 px von der Mitte, bei 450 px Feldhöhe also bis nahe an den Rand, bei mehr Wegpunkten rechnerisch auch außerhalb – diese Level sind in 45 s aber nicht erreichbar). Ab Level 4 verteilt sich das auf ≈ 40 % Spirale, 24 % Zickzack und 36 % Zufall.
- **Phasen [Code]:** Einprägen (2,0 s bei Level 1, −0,1 s je Level) → Zeichnen **ohne Zeitlimit** (nur die Rundenuhr läuft) → Rückmeldung 0,8 s: Vorlage in Grün zusammen mit der eigenen gelben Linie (die eigene Linie liegt obenauf). Die Einprägezeit zählt zur 45-s-Runde; Countdown ≈ 2,5 s.
- **Start [Code]:** Zeichnen beginnt nur, wenn die Maustaste höchstens 45 px vom Startpunkt entfernt gedrückt wird; beim Loslassen wird gewertet.
- **Wertung [Code]:** Vorlage und Zeichnung werden auf je 100 gleichabständige Punkte umgerechnet; für jeden Punkt zählt der Abstand zum nächstgelegenen Punkt der anderen Linie (in beide Richtungen gemittelt). „Ähnlichkeit“ = 100 − mittlerer Abstand **in Pixeln**. Liegt Anfang oder Ende der Zeichnung > 45 px von Start/Ziel, wird der Wert halbiert und der Versuch gilt als verfehlt. Gefordert: 50 → 85 (≈ 50 → 15 px mittlere Abweichung). Die **Reihenfolge** wird nur indirekt geprüft (über Start/Ziel und die Form der Linie), nicht Punkt für Punkt.
- **Punkte/Serie [Code]:** Gelöst: 15 + 45·t Punkte × Multiplikator nach Serienlänge (ab 3 → 1,1×, 5 → 1,25×, 7 → 1,35×, 10 → 1,5×, 15 → 1,75×, 20 → 2,0×, 30 → 2,5×, 50 → 3,0×). Verfehlt: Serie = 0, Bildschirm-Wackeln 16 px, roter Vollbild-Blitz 480 ms (abschaltbar), Strafton; kein Zeitabzug (wie im Text). Der im Code zusätzlich vorgesehene grüne Treffer-Blitz hat im Stylesheet der Seite keine Farbdefinition (geprüft 30.09.2026) und dürfte daher unsichtbar sein; sichtbar ist nur der rote Fehler-Blitz.
- **Eingabe [Code]:** `mousedown/mousemove/mouseup`, Pointer-Lock mit relativer Bewegung × einstellbarer Empfindlichkeit, sonst absolute Zeigerposition. Kein Touch-Zeichnen, keine Kamera, keine Lagesensoren (Literaturbasis, F01). Auf reinen Touch-Geräten (Touch vorhanden, aber kein „feiner Zeiger“ laut `pointer: fine`) ersetzt der gemeinsame Startbildschirm aller sechs Spiele 806–811 den Startknopf durch „Mouse Required for Pointer Lock“ – ohne Maus lässt sich das Original nicht starten (Code geprüft 30.09.2026); ob ein Tablet mit angeschlossener Maus als feiner Zeiger gilt, hängt vom Browser ab (nicht getestet). Zeitschritt bildunabhängig (dt, max. 0,1 s); Zeichnung wird unabhängig von der Mausabtastrate neu verteilt.
- **Rechnerisches Maximum [Rechnung]:** Bei fehlerfreiem Spiel und 0,5–2,5 s Zeichendauer schafft man 8–14 Muster, **≈ 170–400 Punkte**, Level ≈ 3,7–5,6. Die Endnote (100·√(Punkte/17.000)) liegt damit bei ≈ 10–15 von 100 → immer „F – Needs Practice“.

**Widersprüche Regeltext ↔ Code:** (1) „grüner Vektorpfad“ – beim Einprägen ist er violett, grün erst bei der Rückmeldung. (2) „Combo bis 4,0x“ – im Code höchstens 3,0×, realistisch ≤ 1,5×. (3) „3 bis 8 Wegpunkte, 15 Level, 0,6 s“ – plus Start und Ziel sind es 5–10 Punkte; in einer Runde sind aber nur ≤ 5 Wegpunkte und ≥ ≈ 1,5 s erreichbar. (4) „exakte Reihenfolge“ – nicht einzeln geprüft. (5) „Genauigkeit in %“ ist 100 minus Pixelabstand, kein Prozentwert.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Aussagen:** Grundlage seien Baddeleys „visuell-räumlicher Notizblock“, Cowans 4-Elemente-Grenze, Lashleys serielle Ordnung und Woodworths Zwei-Phasen-Modell. Ab 5 Knoten „breche“ das Einzelpunkt-Merken zusammen, man werde „neuroplastisch gezwungen“ zu chunken. Tipps: Formen bündeln, Bewegung in den letzten 0,2 s „mental voraktivieren“, an Scheitelpunkten mit Fingerkuppen/Handballen bremsen, den Schwerpunkt fixieren und die „Netzhaut-Nachwirkung“ nutzen. Nutzen für TMS/MedAT-Untertests und „in erheblichem Maße“ für Recoil-Control in CS2/Valorant. Dazu eine 5-Stufen-Tabelle („Top 0,1 %“ ab 17.000 Punkten, Level 12–15, > 92 %).

**Einordnung:**
- **Belegt (allgemein):** Die Kapazität des Kurzzeitgedächtnisses liegt bei ≈ 4 Einheiten (Cowan, 2001); visuell zählen dabei ganze Objekte, nicht Einzelmerkmale (Luck & Vogel, 1997). Chunking von Sequenzen ist gut belegt (Sakai et al., 2003).
- **Zu einfach:** „8 Punkte = 8 Items“ stimmt nicht, weil die Linie die Reihenfolge sichtbar mitliefert – das Muster kann als eine oder wenige Formen behalten werden. Bei räumlichen Reihenfolgen (Punkte nacheinander gezeigt) erschweren Kreuzungen, Pfadlänge und Winkel das Behalten (Parmentier et al., 2005); für einen sichtbar gezeigten Linienzug ist das naheliegend, aber nicht eigens untersucht. Die Aufgabe ähnelt eher dem Visual Patterns Test als dem Corsi-Test (Della Sala et al., 1999).
- **Falsch/unbelegt:** „Netzhaut-Nachwirkung“ – der flüchtige Sinnesspeicher (ikonisches Gedächtnis) ist nach Bruchteilen einer Sekunde weitgehend zerfallen (Sperling, 1960) und wird durch nachfolgende Reize und räumliche Verschiebung gestört, während das länger haltbare visuelle Kurzzeitgedächtnis kapazitätsbegrenzt ist (Phillips, 1974); das Nachzeichnen dauert Sekunden. Lashley begründete zentrale, vorausgeplante und hierarchische Ablaufpläne für schnelle Folgen (Rosenbaum et al., 2007), aber keinen „im Kortex kompilierten Motor-Chunk“; feste Chunks entstehen vor allem durch Wiederholung derselben Folge (Sakai et al., 2003) – hier ist jedes Muster neu. TMS/MedAT-Untertests verwenden anderes Material und kein Nachzeichnen; Spray-Muster in Spielen sind feste, oft wiederholte Muster, hier sind sie zufällig – ein Transfer ist nicht untersucht. Die Bremstipps sind unbelegt (Abschnitt 6).
- **Normtabelle ohne Datengrundlage und unerreichbar:** Die Seite speichert Daten nach eigener Aussage nur lokal im Browser, eine Datengrundlage für die Prozentränge ist also nicht erkennbar; keine der genannten Quellen enthält Normen für dieses Spiel. Alle Stufen über „< 6.000 Punkte“ liegen weit über dem rechnerischen Maximum von ≈ 400 Punkten (Abschnitt 2).

## 4. Optische und okulomotorische Grundlagen
- **Reizgrößen:** Die zwölf Stützpunkte sind fest und unregelmäßig über das Feld verteilt, ohne Reihen oder Spalten; jede Strecke des Linienzugs führt klar an allen anderen Stützpunkten vorbei. Als Umrechnung gilt: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°. Das Muster kann das ganze Feld überspannen und damit je nach Gerät und Abstand deutlich über 20° breit sein. Die Einprägezeit beträgt 1,0 s plus je Punkt 0,8 s (Stufe 1) bis 0,4 s (Stufe 20).
- **Blick beim Einprägen:** In der Einprägezeit sind mehrere Fixationen möglich; man tastet die Punkte mit Sakkaden ab oder fixiert die Mitte und nimmt die Form mit dem Umfeld auf. Beides ist plausibel, für diese Aufgabe aber nicht verglichen. Bei gleichzeitig sichtbaren, nahe beieinanderliegenden Zielen landen Sakkaden oft dazwischen (Findlay, 1982); was das für diese Aufgabe bedeutet, ist nicht untersucht. Beim Zeichnen folgt der Blick der eigenen Linie und springt zu erinnerten Orten.
- **Sinnesspeicher und Kurzzeitgedächtnis:** Der flüchtige Sinnesspeicher ist nach Bruchteilen einer Sekunde weitgehend zerfallen (Sperling, 1960) und wird durch nachfolgende Reize gestört, während das länger haltbare visuelle Kurzzeitgedächtnis kapazitätsbegrenzt ist (Phillips, 1974). Das Nachzeichnen dauert Sekunden und stützt sich daher auf das Kurzzeitgedächtnis.
- **Form statt Farbe:** Der Start ist als Dreieck markiert, die Pfeile zeigen die Richtung, und die Rückmeldung erfolgt mit ✓/✗; eine Rot-Grün-Farbsehschwäche (etwa 8 % der Männer; Birch, 2012) ist deshalb kein Hindernis. Stereosehen ist nicht nötig.
- **Brille:** Das Muster kann breiter sein als das klare Zwischenfeld von Gleitsichtgläsern; bei den beiden in einer Studie untersuchten Gläsern war es im Bildschirmabstand (60 cm) horizontal nur 13° bzw. 18° breit (Han et al., 2003; andere Glasdesigns können abweichen). Beim Einprägen sind dann Kopfbewegungen nötig, sonst liegen Randpunkte in der unscharfen Zone. Eine Arbeitsplatzbrille oder ein kleineres Gerät kann helfen (Beratung beim Optiker). Der Akkommodationsaufwand beträgt 1 geteilt durch den Abstand in Metern (2,5 dpt bei 40 cm).

## 5. Neurowissenschaftliche Grundlagen
- **Kapazität:** Die Kapazität des Kurzzeitgedächtnisses liegt bei etwa vier Einheiten (Cowan, 2001); visuell zählen dabei ganze Objekte, nicht Einzelmerkmale (Luck & Vogel, 1997). Ein verbundener Linienzug liefert die Reihenfolge sichtbar mit und lässt sich als eine oder wenige Formen behalten; acht Punkte sind daher nicht acht unabhängige Einheiten. Kreuzungen, Pfadlänge und Winkel erschweren das Behalten räumlicher Reihenfolgen (Parmentier et al., 2005).
- **Speicher:** Das Mehrkomponentenmodell (Baddeley & Hitch, 1974) trennt sprachliche und visuell-räumliche Speicher; innerhalb des nonverbalen Gedächtnisses lassen sich ein visueller (Muster) und ein räumlich-sequenzieller Anteil (Corsi) trennen (Della Sala et al., 1999). Die Aufgabe ähnelt dem Visual Patterns Test mehr als dem Corsi-Test.
- **Hirnregionen:** Die Aktivität im hinteren Parietalkortex folgt eng der begrenzten Menge an gespeicherter visueller Information (Todd & Marois, 2004); räumliche Orte werden offenbar durch Aufmerksamkeitsverlagerung „wiederholt“ (Awh et al., 1998). Dass diese Übung die Regionen „trainiert“ oder „neuroplastisch“ verändert, ist nicht gezeigt.
- **Vom Bild zur Bewegung:** Beim Nachzeichnen wird die gespeicherte Form in eine Bewegungsfolge übersetzt; längere und komplexere Folgen brauchen mehr Planungszeit, und Pläne sind hierarchisch (Rosenbaum et al., 2007, über Lashley, 1951). Feste Chunks entstehen vor allem durch Wiederholung derselben Folge (Sakai et al., 2003); in dieser Übung ist jedes Muster neu.

## 6. Motorische Grundlagen
- **Zeichenbewegung:** Beim Zeichnen sinkt das Tempo an stark gekrümmten Stellen automatisch (Zwei-Drittel-Potenzgesetz; Lacquaniti et al., 1983). Das Abbremsen an Scheitelpunkten geschieht also von selbst.
- **Teilstrecken:** Jede Strecke zwischen zwei Stützpunkten ähnelt einer Zielbewegung mit Anfangsimpuls und Feinkorrektur (Woodworth, 1899; Elliott et al., 2001), allerdings zu einem erinnerten, nicht sichtbaren Ziel; daher ist die Streuung größer.
- **Toleranz:** Gewertet wird nicht der Pixelabstand zur Vorlage, sondern ob die Stützpunkte in der richtigen Reihenfolge getroffen werden (großzügiger Fangradius um jeden Punkt). Das Zeichentempo wird nicht belohnt, und es gibt kein Zeitlimit für das Nachzeichnen.
- **Tremor:** Physiologischer Tremor liegt um etwa 10 Hz, Parkinson-Tremor bei 3–6 Hz (McAuley & Marsden, 2000); bei dem großzügigen Fangradius fällt er hier kaum ins Gewicht.

## 7. Einflussfaktoren und Messgrenzen
- **Alter:** Das visuelle Arbeitsgedächtnis erreicht mit etwa 20 Jahren sein Maximum und sinkt dann linear; mit 55 Jahren lag es unter dem von 8–9-Jährigen (n = 55.753; Brockmole & Logie, 2013). Ältere haben zudem mehr Mühe mit Mausaufgaben (Smith et al., 1999). Ergebnisse nur mit sich selbst vergleichen.
- **Gerät:** Die Musterfläche wächst mit dem Feld; Bildschirmgröße und Abstand verändern Sehwinkel und Zeichenweg. Nur Vergleiche mit sich selbst auf demselben Gerät sind sinnvoll.
- **Zufall:** Die Schwierigkeit schwankt stark zwischen Mustern (Kreuzungen, Winkel, Punktabstände; Parmentier et al., 2005). Mit acht Durchgängen je Sitzung ist ein einzelnes Ergebnis wenig zuverlässig; Messungen am Menschen streuen allgemein, und der Verlauf über mehrere Sitzungen (Median) ist aussagekräftiger als ein Einzelwert (vgl. Mountford et al., 2004, S. 17–18).
- **Messgröße:** Der Anteil richtiger Punkte vermischt Merken und Zeichnen; aussagekräftiger ist die Musterspanne, also das längste gelungene Muster.
- **Strategie:** Schnell entwickelte Strategien (verbal „oben, links, runter“, Formen benennen) ändern, was gemessen wird.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt (mittel):** Geübte Gedächtnisaufgaben werden zuverlässig besser (Simons et al., 2016); für diese Übung gibt es keine Studie.
- **Naher Transfer (mittel):** Arbeitsgedächtnistraining verbesserte direkt nach dem Training auch ungeübte verbale und visuell-räumliche Arbeitsgedächtnistests (von den Autoren „intermediate transfer“ genannt; 87 Publikationen, 145 Vergleiche; Melby-Lervåg et al., 2016). Diese Programme liefen meist über viele Sitzungen; kurze Übungen sind nicht untersucht, und die Effekte sind kurzfristig.
- **Alltagstransfer (fehlend):** Kein verlässlicher Effekt auf Intelligenz, Lesen oder Rechnen (Melby-Lervåg et al., 2016); kaum Belege für Alltagsleistungen (Simons et al., 2016). Ein Nutzen für Eignungstests oder Spiele ist nicht belegt.
- **Echtes Gegenstück mit Körpereinsatz (nicht diese Übung):** Bei der „Square-Stepping Exercise“ merkt man sich Schrittmuster und geht sie auf einer Matte nach; bei 65–74-Jährigen verbesserte sie Beinkraft, Gleichgewicht, Agilität und Reaktionszeit stärker als Gehen (n = 68, 12 Wochen; Shigematsu et al., 2008); die Sturzrate in der Nachbeobachtung unterschied sich nicht signifikant (23,4 % vs. 33,3 % je Personenjahr, p = 0,31).

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** das kurzzeitige Merken räumlicher Muster geübt werden soll; eine sprachfreie Aufgabe mit klarer Rückmeldung gewünscht ist; Merken und eine Zeichenbewegung verbunden werden sollen; ein Touchscreen vorhanden ist.
- **Weniger passend, wenn …** Körper, Gleichgewicht oder Koordination im Stehen das Ziel sind (dafür echte Übungen, z. B. Schrittmuster mit Halt); ein fairer Leistungsvergleich zwischen Personen oder Geräten gewünscht ist.
- **Vorsicht / anpassen bei …**
  - `kognitive_einschraenkung`: hohe Gedächtnislast auf höheren Stufen; wiederholtes Scheitern kann frustrieren, die Stufe sinkt aber nach einem Fehlschlag. Altersabfall beachten (Brockmole & Logie, 2013). Neu auftretende Gedächtnisstörungen gehören ärztlich abgeklärt; die Übung ist kein Screening und kein Test (Muchnick, 2008, S. 7, 29–30).
  - `presbyopie_gleitsicht`: Das Muster kann breiter sein als das klare Gleitsicht-Zwischenfeld (in einer Studie 13–18°; Han et al., 2003); Kopf mitbewegen, Arbeitsplatzbrille oder kleineres Gerät erwägen.
  - `farbsehschwaeche`: Der Start ist als Dreieck markiert, die Richtung durch Pfeile, die Rückmeldung mit ✓/✗; Farbe ist nicht nötig.
  - `hand_arm_beschwerden`, `tremor_parkinson`: Zeichnen mit dem Finger, acht Durchgänge je Sitzung; der Fangradius um die Punkte ist großzügig; Pausen einplanen.
  - `migraene_lichtempfindlich`, `photosensitive_epilepsie`: Der Linienzug wird weich ein- und ausgeblendet; es gibt kein Rot, keinen Blitz und kein Wackeln. Grundsätzlich gelten mehr als 3 Blitze pro Sekunde und gesättigtes Rot als Risikomerkmale (Harding et al., 2005).
  - Treten beim Üben Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung, Schwindel oder Zittern auf, sollte das ärztlich abgeklärt werden, statt weiterzuüben (Muchnick, 2008, S. 6, 28).
- **Kombiniert gut mit …** 603 (Matrixmuster merken), 607 (Corsi-Reihenfolge), 605 (Orte merken), 601 (Farbsequenz), 707 (Pfad mit Vorlage nachfahren), 706 und 810 (präzises Ziehen). **Abgrenzung in der Gruppe 806–811:** keine Dublette; 810 ist die einzige andere Zieh-Übung der Gruppe, aber mit sichtbarem Gang, enger Toleranz und ohne Gedächtnislast. Außerhalb der Gruppe prüfen 603 (Rastermuster) und 607 (Corsi-Reihenfolge) das Merken ohne Zeichenbewegung. Keine Diagnosen, keine Heil- oder Leistungsversprechen; Ergebnisse sind keine Normwerte.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Touch:** Nachzeichnen mit dem Finger oder Stift ist auf dem Tablet natürlich – Pointer Events statt Mausereignissen; Start/Ziel ≥ 1° (bei 40 cm ≈ 36 CSS-px) als Fingerziel.
- **Messqualität:** Reihenfolge ausdrücklich prüfen (Wegpunkte in richtiger Folge innerhalb einer Toleranz passieren); Toleranz und Musterfläche in ° Sehwinkel; Musterkomplexität (Kreuzungen, Winkel) steuern statt zufällig; adaptiv nach oben **und** unten (Musterspanne); Einprägen und Zeichnen getrennt werten, Zeichentempo nicht belohnen.
- **Ehrliche Texte:** keine unerreichbaren Stufen, kein TMS-/Recoil-/„Neuroplastizität“-Versprechen; klar sagen, dass es eine Gedächtnisübung und keine Körperübung ist.
- **Sicherheit:** keine Vollbild-Blitze, kein Wackeln; Rückmeldung am Muster (die eingeblendete Vorlage beibehalten – sie ist lehrreich).
- **Farbsehschwäche:** Start und Ziel zusätzlich über Form/Symbol (z. B. Dreieck ▶ und Quadrat ■) markieren.
- **Optiker-Bezug:** Musterfläche einstellbar (z. B. ≤ 15° für Gleitsicht), heller Modus mit gutem Kontrast; optional eine echte Körpervariante (Schrittmuster auf dem Boden nachgehen) nur mit Halt und rutschfestem Boden.

## 11. Quellen
### Von der Website angegeben
- Baddeley, A. D., & Hitch, G. (1974). Working memory. In G. H. Bower (Hrsg.), *Psychology of Learning and Motivation* (Bd. 8, S. 47–89). Academic Press. https://doi.org/10.1016/S0079-7421(08)60452-1 – **Prüfung:** DOI stimmt ✓ (Buchkapitel); **stützt die Aussage der Website:** teilweise (Mehrkomponentenmodell ja; der visuell-räumliche Notizblock wurde vor allem später ausgearbeitet; „im parietalen und präfrontalen Kortex“ ist nicht Inhalt dieser Arbeit).
- Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. *Behavioral and Brain Sciences, 24*(1), 87–114. https://doi.org/10.1017/S0140525X01003922 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (Kapazität ≈ 4 Chunks ja; „ab Level 5 bricht das Merken zusammen“ und „neuroplastisch gezwungen“ nicht – ein verbundener Linienzug ist kein Satz unabhängiger Items).
- Lashley, K. S. (1951). The problem of serial order in behavior. In L. A. Jeffress (Hrsg.), *Cerebral mechanisms in behavior: The Hixon Symposium* (S. 112–131). Wiley. Buch, keine DOI. – **Prüfung:** DOI falsch – 10.1037/11147-006 existiert nicht (Crossref: nicht gefunden, doi.org: 404); Seitenangabe uneinheitlich: 112–131 laut Literaturverzeichnis von Rosenbaum et al. (2007), andere Verzeichnisse nennen 112–146 (vermutlich mit Diskussion); die Website-Angabe 112–136 konnte nicht bestätigt werden – nicht abschließend geprüft; **stützt die Aussage der Website:** teilweise (Vorausplanung schneller Folgen ja; „im Kortex kompilierter Motor-Chunk“ für jedes neue Zufallsmuster nicht).
- Woodworth, R. S. (1899). The accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3), i–114. https://doi.org/10.1037/h0092992 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (Anfangsimpuls + Feinkorrektur ja; Tipps zum Bremsen mit Fingerkuppen/Handballen nicht).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (nur Hinweis auf Hardwareverzögerungen; für dieses Spiel ohne Reaktionszeitmessung wenig relevant; keine Normen).

### Weitere Fachliteratur
- Accot, J., & Zhai, S. (1997). Beyond Fitts' law: Models for trajectory-based HCI tasks. In *Proceedings of CHI '97* (S. 295–302). ACM. https://doi.org/10.1145/258549.258760 – Steering Law, Tunnelbreite
- Awh, E., Jonides, J., & Reuter-Lorenz, P. A. (1998). Rehearsal in spatial working memory. *Journal of Experimental Psychology: Human Perception and Performance, 24*(3), 780–790. https://doi.org/10.1037/0096-1523.24.3.780 – Aufmerksamkeit als „Wiederholung“ räumlicher Orte (Crossref ✓, Abstract gelesen)
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit Farbsehschwäche
- Brockmole, J. R., & Logie, R. H. (2013). Age-related change in visual working memory: A study of 55,753 participants aged 8–75. *Frontiers in Psychology, 4*, 12. https://doi.org/10.3389/fpsyg.2013.00012 – Altersverlauf visuelles Arbeitsgedächtnis
- Della Sala, S., Gray, C., Baddeley, A., Allamano, N., & Wilson, L. (1999). Pattern span: A tool for unwelding visuo-spatial memory. *Neuropsychologia, 37*(10), 1189–1199. https://doi.org/10.1016/S0028-3932(98)00159-6 – visuelle vs. räumlich-sequenzielle Anteile (Visual Patterns Test, Corsi)
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin, 127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – Zwei-Komponenten-Modell
- Findlay, J. M. (1982). Global visual processing for saccadic eye movements. *Vision Research, 22*(8), 1033–1045. https://doi.org/10.1016/0042-6989(82)90040-2 – Sakkaden landen zwischen nahen Zielen (Crossref ✓; Inhalt Standardwissen)
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x – Blitz-Grenzwerte
- Lacquaniti, F., Terzuolo, C., & Viviani, P. (1983). The law relating the kinematic and figural aspects of drawing movements. *Acta Psychologica, 54*(1–3), 115–130. https://doi.org/10.1016/0001-6918(83)90027-6 – Zwei-Drittel-Potenzgesetz beim Zeichnen (Crossref ✓; kein Abstract, Inhalt Standardwissen)
- Luck, S. J., & Vogel, E. K. (1997). The capacity of visual working memory for features and conjunctions. *Nature, 390*(6657), 279–281. https://doi.org/10.1038/36846 – Kapazität ≈ 4 Objekte, gezählt werden ganze Objekte (Crossref ✓, Abstract gelesen)
- McAuley, J. H., & Marsden, C. D. (2000). Physiological and pathological tremors and rhythmic central motor control. *Brain, 123*(8), 1545–1567. https://doi.org/10.1093/brain/123.8.1545 – Tremorfrequenzen
- Melby-Lervåg, M., Redick, T. S., & Hulme, C. (2016). Working memory training does not improve performance on measures of intelligence or other measures of "far transfer": Evidence from a meta-analytic review. *Perspectives on Psychological Science, 11*(4), 512–534. https://doi.org/10.1177/1745691616635612 – naher vs. ferner Transfer
- Parmentier, F. B. R., Elford, G., & Maybery, M. (2005). Transitional information in spatial serial memory: Path characteristics affect recall performance. *Journal of Experimental Psychology: Learning, Memory, and Cognition, 31*(3), 412–427. https://doi.org/10.1037/0278-7393.31.3.412 – Kreuzungen, Länge, Winkel bestimmen die Schwierigkeit
- Phillips, W. A. (1974). On the distinction between sensory storage and short-term visual memory. *Perception & Psychophysics, 16*(2), 283–290. https://doi.org/10.3758/BF03203943 – flüchtiger Sinnesspeicher vs. visuelles Kurzzeitgedächtnis (Crossref ✓; Inhalt Standardwissen)
- Rosenbaum, D. A., Cohen, R. G., Jax, S. A., Weiss, D. J., & van der Wel, R. (2007). The problem of serial order in behavior: Lashley's legacy. *Human Movement Science, 26*(4), 525–554. https://doi.org/10.1016/j.humov.2007.04.001 – Inhalt und Seiten von Lashley (1951)
- Sakai, K., Kitaguchi, K., & Hikosaka, O. (2003). Chunking during human visuomotor sequence learning. *Experimental Brain Research, 152*(2), 229–242. https://doi.org/10.1007/s00221-003-1548-8 – Chunking bei wiederholten Sequenzen
- Shigematsu, R., Okura, T., Nakagaichi, M., Tanaka, K., Sakai, T., Kitazumi, S., & Rantanen, T. (2008). Square-stepping exercise and fall risk factors in older adults: A single-blind, randomized controlled trial. *The Journals of Gerontology: Series A, 63*(1), 76–82. https://doi.org/10.1093/gerona/63.1.76 – Schrittmuster merken als echte Körperübung
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer von Hirntraining
- Smith, M. W., Sharit, J., & Czaja, S. J. (1999). Aging, motor control, and the performance of computer mouse tasks. *Human Factors, 41*(3), 389–396. https://doi.org/10.1518/001872099779611102 – Alter und Maus
- Sperling, G. (1960). The information available in brief visual presentations. *Psychological Monographs: General and Applied, 74*(11), 1–29. https://doi.org/10.1037/h0093759 – ikonisches Gedächtnis zerfällt rasch (Crossref ✓; Inhalt Standardwissen)
- Todd, J. J., & Marois, R. (2004). Capacity limit of visual short-term memory in human posterior parietal cortex. *Nature, 428*(6984), 751–754. https://doi.org/10.1038/nature02466 – Parietalkortex und Kapazitätsgrenze (Crossref ✓, Abstract gelesen)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Lehrbuch: Warnzeichen mit Abklärungsbedarf (S. 6, 28), Gedächtnisstörungen als neurologisches Symptom (S. 7); Gedächtnis- und Zeichenprüfung als klinische Untersuchung, nicht als Training (S. 29–30)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Lehrbuch: Genauigkeit und Wiederholbarkeit von Messungen, Messungen am Menschen streuen (S. 17–18, 24)
