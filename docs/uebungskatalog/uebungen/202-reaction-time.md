---
# ===== Kennung =====
nr: 202
kennung: reaction-time
name: "Farbregel-Klick (Wahlreaktion Rot/Blau mit Regelwechsel)"
name_original: "Wahlreaktionszeit-Test – Entscheidungstempo (Überschrift im Spiel: „Reaktionszeit-Test“)"
kapitel: "Kognition & Aufmerksamkeit"
kapitel_original: "cognitive"
unterkapitel_original: "processing-speed"
quelle_url: "https://skilldrills.online/de/drills/cognitive/processing-speed/reaction-time"
blickfit_umsetzung:
  kennung: "pfeil-duell"
  name: "Pfeil-Duell (Wahlreaktion als Stufen 1–10); Hick-Stufen zusätzlich in Zeichen-Code"
  weitere_kennungen: ["zeichen-code"]
  unterschiede: "Keine eigene Übung. Im Pfeil-Duell wird die Wahl symbolisch (Pfeilrichtung → feste Taste; Stufen 1–5 zwei, 6–10 vier Richtungen), im Zeichen-Code mit 3 → 6 → 9 willkürlichen Zeichen-Zahl-Paaren (Hick-Prinzip). Anders als das Original: feste Tasten statt springender Ziele (keine Zeigebewegung), farb- und sprachfrei, frame-genaue Reaktionszeit (Median, nur richtige; < 150 ms ungewertet), feste Dauer 66 s bzw. 75 s ohne Zeitbonus, adaptive Frist bzw. Blockregel, kein Fehlerblitz, Tastatur möglich. Den Farbregel-Wechsel des Originals gibt es nicht."
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Auf dunklem Feld liegen immer ein roter und ein blauer Kreis an zufälligen Stellen; ein kleines Banner oben sagt, welche Farbe gerade gilt („ROTES ZIEL“ oder „BLAUES ZIEL“). Man klickt oder tippt den passenden Kreis, bevor die Frist abläuft; danach springen beide an neue Orte, und ab Level 2 wechselt die geltende Farbe nach einigen Treffern."
ziel_funktionen: [entscheidung_wahlreaktion, kognitive_flexibilitaet, auge_hand_koordination, zielbewegung_tempo]
eingabe: [touch, maus, touchpad]
tablet_geeignet: ja
dauer_sekunden: 45   # nominell; +2 s je Treffer (max. 60 s) verlängern die Runde bei guter Leistung auf ≈ 2–2,5 min (eigene Simulation)
schwierigkeit_anpassung: "Level = Punkte/1.750 + 1 (stufenlos, steigt nur; Start immer 1). Antwortfrist je Zielpaar (Code): 1.350 ms (Level 1) → 1.105 (5) → 732 (10) → 430 (15) → 283 ms (20), bei hoher Combo zusätzlich bis 30 % kürzer. Bis 1.750 Punkte (≈ 14–18 Treffer) gilt nur ROT; ab Level 2 wechselt die Farbregel nach 6, ab Level 3 nach 5, ab 6 nach 4, ab 9 nach 3, ab 12 nach 2 Treffern."
messgroessen: ["Original: Punkte, Genauigkeit (Treffer ÷ Treffer + Fehlziele + abgelaufene Fristen), Treffer, höchstes Level, maximale Combo, Buchstabennote F–S+", "Original misst keine Reaktionszeit, obwohl der Name das nahelegt", "sinnvoll: Median-Zeit bis zum richtigen Klick, getrennt nach Durchgängen direkt nach einem Regelwechsel und Regelwiederholungen (Wechselkosten)", "sinnvoll: Fehlziele direkt nach einem Wechsel (Beharrungsfehler) getrennt von übrigen Fehlern", "sinnvoll: Entscheidungs- und Bewegungszeit trennen (fester Startpunkt, z. B. Ruhetaste)"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 2
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 0
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 0
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 2
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 0
    entscheidung_wahlreaktion: 2
    lesen_sprache: 1
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 3
    zielbewegung_tempo: 3
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 3
  flimmern_lichtreize: 2
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Rot und Blau sicher unterscheiden – die Farbe ist das einzige Merkmal der Ziele", "kleines Banner oben lesen oder an seiner Farbe erkennen (12–14 px, ≈ 0,25° Buchstabenhöhe am Monitor)", "Zeiger oder Finger schnell an wechselnde Orte im ganzen Bildschirm bringen (Maus, Touchpad oder Touch; keine Tastatursteuerung)", "Korrektur bzw. Abstand, mit denen die ganze Bildschirmfläche scharf ist (Vollbild)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, farbsehschwaeche, presbyopie_gleitsicht, gesichtsfeldausfall, trockenes_auge_bildschirm, tremor_parkinson, hand_arm_beschwerden, kognitive_einschraenkung, aufmerksamkeitsprobleme, kinder_unter_6]
geeignet_fuer: ["schnelles Zeigen oder Tippen auf wechselnde Orte mit einer einfachen Farbentscheidung (Auge-Hand-Koordination unter Zeitdruck)", "spielerischer Einstieg in Regelwechsel mit nur zwei Regeln (ROT/BLAU)", "Tablet mit großen Zielen (≈ 15 mm) und ohne Tastatur"]
weniger_geeignet_fuer: ["Messen oder gezieltes Üben der Wahlreaktionszeit – keine Zeitmessung, immer nur 2 Alternativen, die Zeigebewegung überdeckt die Entscheidung (dafür Pfeil-Duell/Zeichen-Code, vgl. 207)", "Vergleich zwischen Personen, Geräten oder Sitzungen (Rundendauer wächst mit der Leistung, Frist in ms unabhängig von Gerätelatenz und Bildschirmgröße)", "Menschen mit Rot-Blau-Unterscheidungsproblemen oder Lichtempfindlichkeit (roter Fehlerblitz)", "ruhiges Üben ohne Zeitdruck oder mit Pausen"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Wahlreaktions- und Zeigeaufgaben werden mit Übung zuverlässig schneller, der Zuwachs pro Alternative flacht ab (Mowbray & Rhoades 1959; Proctor & Schneider 2018). Zu dieser Browserübung gibt es keine Studie; computergestütztes Aufmerksamkeitstraining zeigte bei gesunden Älteren keinen signifikanten Effekt auf Aufmerksamkeit und exekutive Funktionen (Lampit et al. 2014), Aufgabenwechsel-Training erreicht nach wenigen Sitzungen ein Plateau ohne fernen Transfer (Zhao et al. 2020). Ein Alltagsnutzen ist nicht belegt."
aehnliche_uebungen: [201, 207, 302, 510, 802, 102, 101, 501, 702]
stichworte: ["Wahlreaktion", "Choice Reaction Time", "Hick-Hyman-Gesetz", "Reiz-Reaktions-Kompatibilität", "Farbentscheidung Rot/Blau", "Regelwechsel", "Aufgabenwechsel", "Zeigebewegung", "Fitts'sches Gesetz", "Auge-Hand-Koordination", "Zeitdruck", "Combo", "keine Reaktionszeitmessung", "Reaktionszeit-Test (Name des Originals)"]
---

# 202 · Farbregel-Klick (Wahlreaktion Rot/Blau mit Regelwechsel)

> Original: „Wahlreaktionszeit-Test – Entscheidungstempo“ (im Spiel „Reaktionszeit-Test“) – skilldrills.online, Kapitel
> Kognition & Aufmerksamkeit (`cognitive`, Unterkapitel `processing-speed`) · Blickfit: keine eigene Übung – als Stufen in
> **Pfeil-Duell** (2 → 4 Richtungen) und **Zeichen-Code** (3 → 6 → 9 Paare) aufgegangen

## 1. Kurzbeschreibung

Im Vollbild liegen auf fast schwarzem Grund immer genau zwei Kreise: ein roter und ein blauer, jeweils an zufälliger Stelle. Oben in der Mitte steht klein, welche Farbe gerade gilt („ROTES ZIEL“ / „BLAUES ZIEL“). Man klickt oder tippt so schnell wie möglich den passenden Kreis; danach springen beide sofort an neue Orte. Wer zu lange braucht oder die falsche Farbe trifft, verliert Zeit und Serie. Mit den Punkten werden die Fristen kürzer, und die geltende Farbe wechselt immer öfter. Trotz des Namens wird keine Reaktionszeit gemessen – es ist eine Zeige-Aufgabe mit einfacher Farbwahl und Regelwechsel.

## 2. Ablauf im Original (Analyse)

Grundlage: Seitentext und ausgelieferter Spielcode (Chunk `84826-…js`, dazu gemeinsame Module für Level-Kurve, Combo, Strafe und Effekte, dieselben wie in 302–308; geprüft am 30.09.2026, nur Mechanik übernommen). Winkel und Wege = **eigene Rechnung**: Monitor 24″ Full-HD in 60 cm (≈ 37,8 px/°), iPad quer in 40 cm (≈ 36 CSS-px/°).

- **Ablauf (Code):** Start → Vollbild (wo der Browser es erlaubt) → Countdown 3-2-1-GO (Spielbeginn nach 2,45 s) → Spiel → Ergebnis. Escape oder Verlassen des Vollbilds bricht ab. Startlevel immer 1.
- **Reize (Code):** zwei runde Schaltflächen, 80 × 80 px (unter 640 px Fensterbreite 64 px) mit farbigem Kern 56 px (48 px): Rot (Verlauf #f43f5e → #dc2626) bzw. Cyan-Blau (#06b6d4 → #2563eb), jeweils mit weißem Mittelpunkt, auf #050508. Am Monitor ≈ 2,1° (Kern ≈ 1,5°), am iPad ≈ 2,2° ≈ 15 mm. Das Banner „ROTES ZIEL“/„BLAUES ZIEL“ steht in 12–14 px fett, rot bzw. cyan eingefärbt, am oberen Rand.
- **Orte (Code):** beide Kreise zufällig in 18–82 % der Breite und 22–78 % der Höhe; der neue rote Kreis liegt mindestens 30 Prozentpunkte vom vorigen roten, der blaue mindestens 25 vom roten entfernt. *Eigene Rechnung:* Zielzone am Monitor ≈ 32° × 16°, am iPad quer ≈ 21° × 13°; der Weg zum nächsten Ziel beträgt im Mittel ≈ 18° (Monitor) bzw. ≈ 12° (iPad), nie unter ≈ 7°. Jeder Durchgang braucht also einen Blicksprung und eine echte Zeigebewegung.
- **Durchgang (Code):** Beide Kreise bleiben sichtbar, bis man einen antippt oder die Frist abläuft; dann springen beide sofort weiter – ohne Pause, ohne Fixationspunkt. Tippen daneben bewirkt nichts.
- **Frist (Code):** Frist = max(100 ms; Kurve(1.350 → 140 ms) × (1 − 0,3 × Combo-Anteil)); der Combo-Anteil steigt mit dem Combo-Faktor von 0 (Faktor 1) bis 1 (Faktor 3). Werte ohne Combo: Level 1 1.350 ms · 5 1.105 · 8 880 · 10 732 · 12 597 · 15 430 · 20 283 ms; bei Combo ≥ 50 (Faktor 3) je 30 % kürzer (Level 1: 945 ms). Die Frist läuft per Timer, unabhängig von der Bildrate. Das Ablaufen lässt sich über eine allgemeine Einstellung abschalten (Standard: an).
- **Punkte, Level (Code):** Treffer = 100 × Combo-Faktor (1,1/1,25/1,35/1,5/1,75/2/2,5/3 ab 3/5/7/10/15/20/30/50 Treffern in Folge) × (1 + 0,5 × Levelanteil); Level = Punkte/1.750 + 1, sinkt nie.
- **Regelwechsel (Code):** erst ab Level 2, dann nach max(2; 6 − ⌊Level/3⌋) Treffern auf die aktuelle Farbe; Fehler zählen nicht mit. Der Wechsel fällt mit dem Erscheinen der neuen Kreise zusammen – angekündigt nur durch Farbe und Text des kleinen Banners, ohne Vorbereitungszeit und ohne Ton.
- **Zeit und Fehler (Code):** Start 45 s, **+2 s je Treffer (max. 60 s)**, **−1 s je Fehlziel und je abgelaufener Frist**, Combo auf 0, Strafton, roter radialer Fehlerblitz (50 % Deckkraft in der Mitte, 0,45 s; standardmäßig an, abschaltbar). Die Uhr läuft mit der Bildzeit (dt, pro Bild höchstens 0,1 s).
- **Eingabe (Code):** Pointer-Ereignis beim Drücken auf einen Kreis (Maus, Touchpad, Finger, Stift); Tastatur nur Escape.
- **Auswertung (Code):** Genauigkeit = Treffer ÷ (Treffer + Fehlziele + abgelaufene Fristen); Note 100 × √(Punkte/22.000), „S+ LEGENDARY“ ab ≈ 19.855 Punkten. Keine Zeiten gespeichert.
- **Grobe eigene Simulation** (gleichbleibende Antwortzeit 0,6–0,9 s mit Streuung 120 ms, 5 % Fehlziele): Wer schneller als alle 2 s trifft, hält die Uhr bei 60 s; die Runde endet erst, wenn die Frist unter die eigene Antwortzeit fällt (≈ Level 9–14) und eine Kette abgelaufener Fristen die Uhr leert. Die Runde dauert dann ≈ 2–2,5 min statt 45 s, und die Genauigkeit am Ende liegt bei ≈ 60–65 % – weitgehend unabhängig vom Tempo.

**Widersprüche Regeltext ↔ Code:** (1) „Bei Strafe −0,8 s“ bzw. Strafe als Einstellung – Code: immer −1 s; die allgemeine Einstellung „ohne Zeitstrafe“ wird übergangen. (2) „+100 Pkt.“ – dazu Combo-Faktor bis × 3, Levelzuschlag und +2 s je Treffer (auf der deutschen Seite nicht genannt). (3) „Farbe und Regel wechseln schnell“ – die Kreise behalten ihre Farbe, es wechseln nur Regel und Orte; im ersten Abschnitt (bis 1.750 Punkte) gibt es gar keinen Wechsel. (4) „Auftauchende Knoten“ – beide Kreise sind immer da und springen nur. (5) „Miss deine Entscheidungsgeschwindigkeit“, FAQ in Millisekunden – das Spiel misst keine Zeit. (6) „45 s“ – bei guter Leistung deutlich länger.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite beschreibt den Drill als Wahlreaktionszeit-Test nach dem Hick'schen Gesetz, der „visuelle Unterscheidung, Regelprüfung und schnelle Bewegung“ verbindet, für Spieler, Lernende „und alle“. Sie nennt Geräteverzögerungen korrekt als Teil des Ergebnisses. Die FAQ nennen SRT ≈ 200 ms, CRT 280–350 ms (Donders 1868), Profis 180–230 ms (Der & Deary 2006), den Altersabbau „ab Mitte 20“, „Frontalhirn hemmt automatisierte Muster“, „Training beschleunigt die neuronale Signalübertragung“, 144-Hz-Monitor + 1.000-Hz-Maus (Woods et al. 2015) und „10–15 min vor Spitzenanforderungen“. Dazu eine Tabelle von „Tier 5 Basis“ (< 78 % Genauigkeit) bis „Großmeister/Top 1 %“ (98 %+). Einordnung:

- **Keine Reaktionszeit, kaum Hick:** Das Spiel speichert keine Zeiten; die ms-Angaben lassen sich mit nichts vergleichen. Die Zahl der Alternativen ist immer 2 – ein Anstieg mit log₂ n (Hick, 1952; Hyman, 1953) kann gar nicht auftreten. Zeigen auf einen sichtbaren Zielort ist zudem hoch reiz-reaktions-kompatibel; dann steigt die Zeit kaum mit der Zahl der Alternativen (Fitts & Seeger, 1953; Wright et al., 2007; Proctor & Schneider, 2018). Die richtige Selbstbeschreibung der Seite („Unterscheidung, Regelprüfung und schnelle Bewegung“) trifft es besser als der Titel.
- **Zahlen der FAQ:** Donders untersuchte nachgesprochene Silben, nicht visuelle Reize (Roelofs, 2018); die 200/280–350 ms stammen nicht von ihm. Der & Deary (2006) ist eine Bevölkerungsstichprobe (n = 7.130) ohne Profis oder Athleten – die 180–230 ms sind dort nicht belegt. Belegt ist: Wahl-RT wird über das ganze Erwachsenenalter langsamer, einfache kaum vor ≈ 50 (Der & Deary, 2006); in einem Echtzeit-Strategiespiel begann die Verlangsamung mit 24 Jahren (n = 3.305; Thompson et al., 2014). „Durch Training lange stabilisierbar“ und „beschleunigt die Signalübertragung“: ohne Beleg. Woods et al. (2015) untersuchten 60-Hz-LCD und 1-kHz-Maus (17,8 ms Hardware), nicht 144-Hz-Monitore.
- **„Frontalhirn hemmt automatisierte Muster“:** Regelwechsel erfordern eine Umstellung der Aufgabeneinstellung, deren Kosten sich durch Vorbereitung verringern, aber nicht beseitigen lassen (Rogers & Monsell, 1995; Monsell, 2003) – hier gibt es keine Vorbereitungszeit. „Automatisiert“ wird bei 2–6 Treffern pro Regel nichts; dass das Spiel präfrontale Funktionen „trainiert“, ist nicht untersucht.
- **„10–15 min reichen“:** keine Quelle. In der Metaanalyse von Lampit et al. (2014) waren mehr als 3 Einheiten pro Woche nicht wirksamer, Einheiten unter 30 min nur schwach belegt.
- **Tier-Tabelle ohne Datengrundlage:** Die Seite erhebt nach eigener Aussage keine Nutzerdaten, keine Quelle enthält Werte für dieses Spiel. Nach der Simulation in Abschnitt 2 endet fast jede Runde mit einer Kette abgelaufener Fristen – „98 %+ Genauigkeit“ ist mit dieser Mechanik praktisch unerreichbar.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Kreise ≈ 2° (Kern ≈ 1,5°) – für Sehschärfe unkritisch, auch bei deutlich reduziertem Visus. Kleiner ist das Banner: 12–14 px fette Großbuchstaben ≈ 0,22–0,26° ≈ 13–16′ Buchstabenhöhe am Monitor, lesbar ab Visus ≈ 0,3–0,4 (eigene Rechnung; die Textfarbe verrät die Regel auch ohne Lesen).
- **Blicksprünge:** Ziele liegen jedes Mal ≥ 7°, im Mittel 12–18° vom letzten entfernt; man sucht die richtige Farbe (Farb-Einzelreiz, „Pop-out“; Treisman & Gelade, 1980) und springt mit dem Blick hin. Die Latenz von Blicksprüngen zu sichtbaren Zielen lag bei über 1.000 gesunden jungen Erwachsenen im Median bei ≈ 177 ms (Bargary et al., 2017; Wert aus der Literaturbasis, nicht am Volltext neu geprüft) und hängt nicht von der Zahl möglicher Ziele ab (Kveraga et al., 2002). Beim Zeigen bleibt der Blick bis zum Bewegungsende am Ziel „verankert“ (Neggers & Bekkering, 2000); da die neuen Kreise erst beim Klick erscheinen, passt der Ablauf dazu.
- **Farbe:** Rot gegen Cyan-Blau unterscheidet sich in Farbton und Helligkeit. Bei Rot-Grün-Schwäche (≈ 8 % der Männer, ≈ 0,4 % der Frauen in Europa; Birch, 2012) bleibt diese Unterscheidung meist möglich, Rot wirkt bei Protanopie aber dunkler (eigene Einschätzung, nicht getestet). Die Farbunterscheidung lässt ab ≈ 60 Jahren nach, am stärksten auf der Blau-Gelb-Achse (Paramei & Oakley, 2014). Die Farbe ist das einzige Merkmal der Ziele – das widerspricht WCAG 2.2, 1.4.1.
- **Gleitsicht/Alterssichtigkeit:** Die Zielzone reicht im Vollbild über ≈ 32° × 16° (Monitor). Mit Gleitsichtgläsern sieht man untere Ziele durch Zwischen- und Nahteil, seitliche durch die unscharfen Randzonen; die nutzbare Breite dieser Zonen unterscheidet sich je nach Glasdesign deutlich (Sheedy, 2004; Größenordnung nicht geprüft); bei Gleitsicht-Neulingen nahmen vertikale Kopfbewegungen zu, mit großer Streuung zwischen Personen (Hutchings et al., 2007; nur 10 Teilnehmende). Das Banner liegt oben (Fernteil). Günstiger: Bildschirm-/Arbeitsplatzbrille, kleineres Fenster oder größerer Abstand. Am Tablet in 35–40 cm ist eine Nahkorrektur nötig (Smartphone-Studie: Presbyope halten das Gerät weiter weg, 39,7 vs. 33,4 cm; Boccardo et al., 2023).
- **Trockenes Auge:** Bildschirmarbeit senkt die Lidschlagrate im Mittel etwa auf ein Fünftel (Patel et al., 1991); bei einer sich selbst verlängernden Runde von 2–2,5 min unter Zeitdruck ist das zu beachten.
- **Stereosehen** spielt keine Rolle (flache Kreise, keine Tiefe).

## 5. Neurowissenschaftliche Grundlagen

Zu diesem Spiel gibt es keine Bildgebungs- oder Trainingsstudie. Relevante Grundlagen:

- **Wählen zwischen sichtbaren Zielen:** Nach einer einflussreichen Sichtweise werden mehrere mögliche Handlungen parallel vorbereitet und konkurrieren, bis eine ausgewählt ist (Cisek & Kalaska, 2010). In Wahl-Zeigeaufgaben zeigt die Krümmung der Bewegungsbahn, wie Aufmerksamkeit und Entscheidung während der Bewegung noch zwischen den Zielen schwanken (Song & Nakayama, 2009). Für 202 heißt das: Entscheidung und Bewegung laufen überlappend, nicht nacheinander – eine reine „Entscheidungszeit“ lässt sich aus einem Klick nicht ablesen.
- **Warum Hick hier kaum greift:** Blicksprünge zu sichtbaren Zielen (Kveraga et al., 2002) und gezielte Handbewegungen zu hoch kompatiblen Zielen (Wright et al., 2007) wurden durch mehr Alternativen nicht langsamer. Kveraga et al. vermuteten dafür einen Sonderweg über den Colliculus superior; Wright et al. fanden dasselbe bei Handbewegungen und führen es eher auf die hohe Reiz-Reaktions-Kompatibilität zurück.
- **Regelwechsel und Hemmung** gehören zu den exekutiven Funktionen, an denen präfrontale Netzwerke beteiligt sind (Übersicht Diamond, 2013). Eine gezielte Wirkung dieses Spiels auf das „Frontalhirn“ ist nicht belegt.
- **Farb-Pop-out:** Ein einzelnes Ziel, das sich nur in der Farbe unterscheidet, wird ohne serielle Suche gefunden (Treisman & Gelade, 1980) – die visuelle Suche ist hier deshalb Nebensache.

## 6. Motorische Grundlagen

- **Zielbewegung (Fitts'sches Gesetz):** Bewegungszeit ≈ a + b × log₂(2A/W) (Fitts, 1954). Mit Weg A ≈ 12–18° und Zielgröße W = 80 px ergibt sich ein Schwierigkeitsindex von ≈ 3,5 Bit (iPad) bis ≈ 4,1 Bit (Monitor, Vollbild) – *eigene Rechnung*. Die Zeigebewegung ist damit meist der größte Zeitanteil; die Farbentscheidung zwischen zwei Möglichkeiten entspricht 1 Bit.
- **Frist und Speed-Accuracy-Trade-off:** Schnelleres Antworten erhöht die Fehlerrate (Heitz, 2014). Weil Fehlziele und abgelaufene Fristen gleich bestraft werden (−1 s, Combo 0), lohnt sich beim Ablauf der Frist ein Rateklick – das fördert impulsives Klicken.
- **Touch vs. Maus:** Am Touchscreen war die Bewegungszeit gegenüber der Maus bei Älteren um 35 %, bei Jüngeren um 16 % kürzer, mit weniger Fehlern (Findlater et al., 2013). Am Tablet ist 202 daher eher leichter; die tippende Hand verdeckt aber Teile der Fläche. Mit Maus oder Touchpad muss der Zeiger quer über den ganzen Bildschirm.
- **Präzision und Tremor:** Die Ziele sind groß (≈ 15 mm am iPad, über der WCAG-AAA-Größe von 44 × 44 CSS-px); Genauigkeit begrenzt kaum. Belastend für zitternde oder schmerzende Hände ist eher das Tempo: bei 0,6–1 s pro Ziel ≈ 1–1,7 gezielte Klicks pro Sekunde über 2 min ohne Pause.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Die Frist ist in ms festgelegt, die Eingabe- und Anzeigeverzögerung zieht davon ab. Web-Apps messen auf Touchgeräten um ≈ 58–70 ms zu lange (Pronk et al., 2020); Tablets haben so effektiv kürzere Fristen. Die Kreise haben feste Pixelgröße, die Wege wachsen mit der Bildschirmgröße – der Schwierigkeitsindex hängt vom Bildschirm ab (Abschnitt 6).
- **Rundendauer und Punkte:** Zeitbonus und nie sinkendes Level koppeln Dauer, Punkte, Endlevel und Genauigkeit aneinander; Punkte und Note messen vor allem, wie lange man durchhält. Die Combo verkürzt die Frist um bis zu 30 %, nach einem Fehler wird es schlagartig leichter.
- **Messgrößen:** Die Genauigkeit am Ende ist durch die Schlusskette abgelaufener Fristen strukturell gedrückt (Simulation ≈ 60–65 %). Wechselkosten wären als persönlicher Wert ohnehin wenig zuverlässig: Differenzwerte klassischer Aufgaben hatten Test-Retest-Werte von 0 bis 0,82 (Hedge et al., 2018).
- **Alter:** Wahlreaktion verlangsamt sich über das ganze Erwachsenenalter (Der & Deary, 2006), Blicksprünge sind mit 20–30 Jahren am schnellsten (Munoz et al., 1998). Bei der Frist von 1.350 ms im ersten Level kommen auch Ältere mit, die Fristen ab Level ≈ 8 (< 900 ms) begrenzen sie früher.
- **Übung und Strategie:** Mitzählen der Treffer macht die Wechsel vorhersehbar (feste Trefferzahl je Level); wer das Banner nur aus dem Augenwinkel prüft statt hinzuschauen, spart Blicksprünge – solche Strategien verändern, was gefordert wird.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (stark):** Wahlreaktionen werden mit Übung schneller; der Zuwachs pro zusätzlicher Alternative wird kleiner – nach 5 Sitzungen à 1.000 Durchgängen sank der Unterschied zwischen 8 und 2 Alternativen von fast 500 auf gut 300 ms (Mowbray & Rhoades, 1959; berichtet in Proctor & Schneider, 2018). Auch Zeigeaufgaben werden durch Wiederholung schneller; ein Teil ist Gewöhnung an Gerät, Fristen und Strategie.
- **Naher Transfer (schwach):** keine Studie zu dieser Übung. Intensives Aufgabenwechsel-Training erreichte nach wenigen Sitzungen ein Plateau; ähnliche Wechselaufgaben profitierten, ferne nicht (Zhao et al., 2020).
- **Alltagstransfer (fehlend):** Computergestütztes Training bei gesunden Älteren (52 RCTs) zeigte keinen signifikanten Effekt auf Aufmerksamkeit und exekutive Funktionen (Lampit et al., 2014); Übersichten finden keinen belastbaren Ferntransfer von „Gehirntraining“ (Simons et al., 2016; Sala & Gobet, 2019). Für Sport, E-Sport, Verkehr oder Beruf gibt es keinen Beleg.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** schnelles Zeigen/Tippen auf wechselnde Orte mit einer leichten Entscheidung geübt werden soll, jemand einen spielerischen Einstieg in Regelwechsel sucht (nur zwei Regeln) oder am Tablet ohne Tastatur geübt wird.
- **Weniger passend, wenn …** eine echte Wahlreaktion mit Zeitmessung gemeint ist (Pfeil-Duell; 207/Zeichen-Code), einfache Reaktion (101) oder Impulskontrolle (102) im Vordergrund steht, ruhig ohne Zeitdruck geübt werden soll oder Ergebnisse verglichen werden sollen.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: roter radialer Fehlerblitz (standardmäßig an) bei jedem Fehlziel und jeder abgelaufenen Frist. In der Schlusskette folgen Blitze im Takt der Frist (Level 10: ≈ 1,4/s); ab Level ≈ 18 (Frist < 333 ms) sind mehr als 3 Blitze pro Sekunde möglich, die Grenze von WCAG 2.2, 2.3.1 (eigene Rechnung, nicht gemessen). Blitz abschalten.
  - `farbsehschwaeche`: Farbe ist das einzige Zielmerkmal; Rot/Blau ist bei Rot-Grün-Schwäche meist unterscheidbar, im Alter und bei Blau-Gelb-Störungen unsicherer – vorher kurz prüfen lassen.
  - `presbyopie_gleitsicht`: Ziele über die ganze Bildfläche, Banner oben – Arbeitsplatzbrille, kein Vollbild auf großen Monitoren, Kopf mitbewegen erlaubt.
  - `gesichtsfeldausfall`: Ziele erscheinen irgendwo in ≈ 32° × 16°; Ziele und Bannerwechsel auf der ausgefallenen Seite werden leicht übersehen.
  - `trockenes_auge_bildschirm`: seltener Lidschlag über eine unvorhersehbar lange Runde – bewusst blinzeln, Pause danach.
  - `tremor_parkinson`, `hand_arm_beschwerden`: ≈ 1–1,7 schnelle Zielbewegungen pro Sekunde ohne Pausenfunktion.
  - `kognitive_einschraenkung`, `aufmerksamkeitsprobleme`, `kinder_unter_6`: unangekündigte Regelwechsel, kleiner Text, sich selbst verschärfender Zeitdruck mit Blitz und Strafton – allenfalls als Spiel auf niedriger Stufe, nicht als Test.
- **Kombiniert gut mit …** 207 (symbolische Zuordnung mit echtem Hick-Anteil), 102 (Hemmung ohne Zeigeweg), 404 (ruhige Blickfolge als Ausgleich ohne Zeitdruck).
- **Überschneidungen:** **Gleiche Engine** wie 302–308 und die Combo-Drills dieses Kapitels (201, 205, 206, 207): Level alle 1.750 Punkte, Combo bis × 3, +2 s je Treffer, −1 s je Fehler, roter Fehlerblitz – pro Einheit höchstens eine davon. **302** ist mechanisch am nächsten (mehrere ruhende Ziele mit Frist, ohne Farbregel). **510** und **802** verlangen ebenfalls eine Farbentscheidung beim Zielen (510: rot vor gelb, grün nie; 802: grüne fangen, rote fallen lassen) – nicht mit 202 in einer Einheit. **201** nutzt ebenfalls Farbe unter Zeitdruck (Farbwort-Stroop), **206** einen unangekündigten Wechsel des Zielsymbols. **Blickfit:** Pfeil-Duell (Stufen 1–10) ersetzt 202 – nicht zusätzlich vorschlagen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

Blickfit hat 202 bewusst **nicht** als eigene Übung übernommen (docs/wissenschaft/04, Abschnitt 2): „Tippe dort, wo es leuchtet“ ist fast eine einfache Reaktion und damit eine Dublette zu Blitzreaktion (101). Stattdessen:

- **Pfeil-Duell** (Stufen 1–5: ← / →, 6–10: vier Diagonalen, Hick 2 → 4; danach Stroop/Flanker): feste, große Tasten (≥ 80 px ≈ 15 mm) statt springender Ziele, Pfeil ≥ 54 px ≈ 1,5° bei 40 cm; Fixationskreuz 500 ms, Pause 500 ms; frame-genaue Reaktionszeit (Median, nur richtige), Antworten < 150 ms ungewertet; Frist adaptiv (≈ 80 % richtig) statt an Combo-Punkte gekoppelt; feste Dauer 66 s; Wiederholungen von Richtung/Platz kontrolliert; farb- und sprachfrei; Pfeiltasten/Ziffernblock möglich; kein Blitz, keine Zeitstrafe.
- **Zeichen-Code**: 3 → 6 → 9 willkürliche Zeichen-Zahl-Paare – hier wirkt das Hick-Prinzip voll, weil die Zuordnung gelernt werden muss; Schlüssel je Sitzung neu gemischt, feste Dauer 75 s.
- **Offen gebliebene Idee aus 202:** der Regelwechsel. Falls gewünscht, als Modus mit **angekündigtem** Wechsel (Signal in der Blickmitte, Vorbereitungszeit ≥ 0,6 s; vgl. Rogers & Monsell, 1995), Wechselkosten nur über mehrere Runden gemittelt anzeigen (Hedge et al., 2018). Aufgabenwechsel deckt bereits Weichensteller (Blickfit-Umsetzung von 206) ab.
- Allgemein für Varianten: Farbe nie als einziges Merkmal (Form oder Muster zusätzlich), feste Rundendauer ohne Zeitbonus, Fehlerrückmeldung ohne Vollflächenblitz, Entscheidung und Bewegung getrennt messen (Ruhetaste), Zielzone begrenzen (≈ 15–20° breit) für Gleitsichtträger:innen, Texte DE/IT, „Übung“ statt „Test“, keine Ranglisten ohne Normdaten.

## 11. Quellen

### Von der Website angegeben

- Donders, F. C. (1969). On the speed of mental processes (W. G. Koster, Übers.). *Acta Psychologica, 30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 (Original 1868) – **Prüfung:** DOI stimmt ✓ (Crossref nennt nur Donders; Übersetzung durch Koster korrekt); **stützt die Aussage der Website:** nein – Donders untersuchte nachgesprochene Silben; „SRT ~200 ms, CRT ~280–350 ms“ stammen nicht von ihm (Roelofs, 2018).
- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 – **Prüfung:** DOI stimmt ✓; **stützt:** ja für das Gesetz selbst, aber für diese Übung ohne Bedeutung (immer 2 Alternativen, hoch kompatibles Zeigen).
- Hyman, R. (1953). Stimulus information as a determinant of reaction time. *Journal of Experimental Psychology, 45*(3), 188–196. https://doi.org/10.1037/h0056940 – **Prüfung:** DOI stimmt ✓; **stützt:** ja (Wahl-RT steigt mit der Informationsmenge in Bit), Einschränkung wie bei Hick.
- Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood: Results from the United Kingdom Health and Lifestyle Survey. *Psychology and Aging, 21*(1), 62–73. https://doi.org/10.1037/0882-7974.21.1.62 – **Prüfung:** DOI stimmt ✓; **stützt:** nein für „Profispieler und Spitzenathleten 180–230 ms“ (Bevölkerungsstichprobe, n = 7.130); teilweise für den Altersverlauf (Wahl-RT wird über das ganze Erwachsenenalter langsamer, „durch Training stabilisierbar“ steht dort nicht).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓ (Volltext); **stützt:** ja für „Gerät verzögert das Ergebnis“ (17,8 ms Hardware bei 60-Hz-LCD + 1-kHz-Maus), nein für „144-Hz-Monitor und 1.000-Hz-Sensor minimieren Latenzen“ (nicht untersucht; nur einfache RT).

### Weitere Fachliteratur

Alle DOIs am 29./30.09.2026 per Crossref geprüft; Inhalte über PubMed-Abstracts, die Literaturbasis W02 bzw. `docs/wissenschaft/04`.

- Bargary, G., Bosten, J. M., Goodbourn, P. T., Lawrance-Owen, A. J., Hogg, R. E., & Mollon, J. D. (2017). Individual differences in human eye movements: An oculomotor signature? *Vision Research, 141*, 157–169. https://doi.org/10.1016/j.visres.2017.03.001 – Sakkadenlatenz Median 177 ms.
- Cisek, P., & Kalaska, J. F. (2010). Neural mechanisms for interacting with a world full of action choices. *Annual Review of Neuroscience, 33*, 269–298. https://doi.org/10.1146/annurev.neuro.051508.135409 – parallele Vorbereitung und Auswahl möglicher Handlungen.
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of CHI '13* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Touch vs. Maus nach Alter.
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – Fitts'sches Gesetz.
- Fitts, P. M., & Seeger, C. M. (1953). S-R compatibility: Spatial characteristics of stimulus and response codes. *Journal of Experimental Psychology, 46*(3), 199–210. https://doi.org/10.1037/h0062827 – Reiz-Reaktions-Kompatibilität.
- Kveraga, K., Boucher, L., & Hughes, H. C. (2002). Saccades operate in violation of Hick's law. *Experimental Brain Research, 146*(3), 307–314. https://doi.org/10.1007/s00221-002-1168-8 – Blicksprünge zu sichtbaren Zielen ohne Hick-Anstieg.
- Mowbray, G. H., & Rhoades, M. V. (1959). On the reduction of choice reaction times with practice. *Quarterly Journal of Experimental Psychology, 11*(1), 16–23. https://doi.org/10.1080/17470215908416282 – Übung flacht die Hick-Steigung ab.
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blick bleibt während des Zeigens am Ziel.
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology, 71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 – Gültigkeit, Kompatibilität, Übung.
- Roelofs, A. (2018). One hundred fifty years after Donders: Insights from unpublished data, a replication, and modeling of his reaction times. *Acta Psychologica, 191*, 228–233. https://doi.org/10.1016/j.actpsy.2018.10.002 – Donders' Originalaufgabe.
- Rogers, R. D., & Monsell, S. (1995). Costs of a predictable switch between simple cognitive tasks. *Journal of Experimental Psychology: General, 124*(2), 207–231. https://doi.org/10.1037/0096-3445.124.2.207 – Wechselkosten und Vorbereitungszeit.
- Song, J.-H., & Nakayama, K. (2009). Hidden cognitive states revealed in choice reaching tasks. *Trends in Cognitive Sciences, 13*(8), 360–366. https://doi.org/10.1016/j.tics.2009.04.009 – Wahl-Zeigeaufgaben, Bahnkrümmung.
- Thompson, J. J., Blair, M. R., & Henrey, A. J. (2014). Over the hill at 24: Persistent age-related cognitive-motor decline in reaction times in an ecologically valid video game task begins in early adulthood. *PLoS ONE, 9*(4), e94215. https://doi.org/10.1371/journal.pone.0094215 – Altersverlauf ab 24 Jahren.
- Wright, C. E., Marino, V. F., Belovsky, S. A., & Chubb, C. (2007). Visually guided, aimed movements can be unaffected by stimulus–response uncertainty. *Experimental Brain Research, 179*(3), 475–496. https://doi.org/10.1007/s00221-006-0805-z – Zeigebewegungen ohne Hick-Anstieg bei hoher Kompatibilität.
- Zhao, X., Wang, H., & Maes, J. H. R. (2020). Training and transfer effects of extensive task-switching training in students. *Psychological Research, 84*(2), 389–403. https://doi.org/10.1007/s00426-018-1059-7 – Plateau, naher, kein ferner Transfer.
- Ergänzend zitiert (Kurzangaben, Details in der Literaturbasis W02): Birch (2012), https://doi.org/10.1364/JOSAA.29.000313 · Boccardo et al. (2023), https://doi.org/10.1371/journal.pone.0282947 · Diamond (2013), https://doi.org/10.1146/annurev-psych-113011-143750 · Hedge et al. (2018), https://doi.org/10.3758/s13428-017-0935-1 · Heitz (2014), https://doi.org/10.3389/fnins.2014.00150 · Hutchings et al. (2007), https://doi.org/10.1111/j.1475-1313.2006.00460.x · Lampit et al. (2014), https://doi.org/10.1371/journal.pmed.1001756 · Monsell (2003), https://doi.org/10.1016/S1364-6613(03)00028-7 · Munoz et al. (1998), https://doi.org/10.1007/s002210050473 · Paramei & Oakley (2014), https://doi.org/10.1364/JOSAA.31.00A375 · Patel et al. (1991), https://doi.org/10.1097/00006324-199111000-00010 · Pronk et al. (2020), https://doi.org/10.3758/s13428-019-01321-2 · Sala & Gobet (2019), https://doi.org/10.1016/j.tics.2018.10.004 · Sheedy (2004), https://doi.org/10.1016/S1529-1839(04)70021-4 · Simons et al. (2016), https://doi.org/10.1177/1529100616661983 · Treisman & Gelade (1980), https://doi.org/10.1016/0010-0285(80)90005-5 · W3C (2024), *WCAG 2.2*, Kriterien 1.4.1 und 2.3.1, https://www.w3.org/TR/WCAG22/ (Norm, keine DOI).
