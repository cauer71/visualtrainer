---
# ===== Kennung =====
nr: 202
kennung: reaction-time
name: "Wahlreaktion auf Pfeilrichtungen (Entscheidungstempo bei zwei und vier Möglichkeiten)"
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
kurzbeschreibung: "Ein weißer Pfeil zeigt nach links oder rechts, später in eine von vier Diagonalrichtungen; man tippt so schnell wie möglich die zugehörige Taste. Die Zeit bis zum Tipp wird bildgenau gemessen und als Median der richtigen Antworten ausgewiesen; die Antwortfrist passt sich an, sodass etwa vier von fünf Antworten richtig sind. Mit der Stufe wächst die Zahl der Möglichkeiten von zwei auf vier; eine zweite Stufenfolge mit gelernten Zuordnungen (3, 6 und 9 Zeichen-Zahl-Paare) bietet der Zeichen-Code (207)."
ziel_funktionen: [entscheidung_wahlreaktion, verarbeitungsgeschwindigkeit]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 66
schwierigkeit_anpassung: "Level = Punkte/1.750 + 1 (stufenlos, steigt nur; Start immer 1). Antwortfrist je Zielpaar (Code): 1.350 ms (Level 1) → 1.105 (5) → 732 (10) → 430 (15) → 283 ms (20), bei hoher Combo zusätzlich bis 30 % kürzer. Bis 1.750 Punkte (≈ 14–18 Treffer) gilt nur ROT; ab Level 2 wechselt die Farbregel nach 6, ab Level 3 nach 5, ab 6 nach 4, ab 9 nach 3, ab 12 nach 2 Treffern."
messgroessen: ["Original: Punkte, Genauigkeit (Treffer ÷ Treffer + Fehlziele + abgelaufene Fristen), Treffer, höchstes Level, maximale Combo, Buchstabennote F–S+", "Original misst keine Reaktionszeit, obwohl der Name das nahelegt", "sinnvoll: Median-Zeit bis zum richtigen Klick, getrennt nach Durchgängen direkt nach einem Regelwechsel und Regelwiederholungen (Wechselkosten)", "sinnvoll: Fehlziele direkt nach einem Wechsel (Beharrungsfehler) getrennt von übrigen Fehlern", "sinnvoll: Entscheidungs- und Bewegungszeit trennen (fester Startpunkt, z. B. Ruhetaste)"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 0
    fixation: 0
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 2
    inhibition: 2
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 3
    antizipation: 0
    entscheidung_wahlreaktion: 3
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 1
    zielbewegung_tempo: 1
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 1
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 3
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Rot und Blau sicher unterscheiden – die Farbe ist das einzige Merkmal der Ziele", "kleines Banner oben lesen oder an seiner Farbe erkennen (12–14 px, ≈ 0,25° Buchstabenhöhe am Monitor)", "Zeiger oder Finger schnell an wechselnde Orte im ganzen Bildschirm bringen (Maus, Touchpad oder Touch; keine Tastatursteuerung)", "Korrektur bzw. Abstand, mit denen die ganze Bildschirmfläche scharf ist (Vollbild)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, presbyopie_gleitsicht, tremor_parkinson, hand_arm_beschwerden, kognitive_einschraenkung, aufmerksamkeitsprobleme, kinder_unter_6]
geeignet_fuer: ["schnelle Wahlreaktionen üben: eine Richtung erkennen und mit einer festen Taste beantworten, ohne Farben oder Wörter zu lesen", "beobachten, wie die Antwortzeit mit der Zahl der Möglichkeiten (zwei, vier) steigt und mit Übung flacher wird", "kurze Einheit mit Zeitmessung (Median über viele Durchgänge) am Tablet, am Computer mit Maus oder mit Pfeiltasten"]
weniger_geeignet_fuer: ["Üben des schnellen Zeigens auf wechselnde Orte (die Tasten stehen fest, es gibt keine Zeigebewegung über den Bildschirm)", "einfache Reaktion ohne Wahl (dafür Blitzreaktion, 101) oder Impulskontrolle (102)", "Vergleich zwischen Personen, Geräten oder Eingabearten (Touch, Maus und Tasten liefern unterschiedliche Zeiten)", "ruhiges Üben ohne Zeitdruck"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Wahlreaktions- und Zeigeaufgaben werden mit Übung zuverlässig schneller, der Zuwachs pro Alternative flacht ab (Mowbray & Rhoades 1959; Proctor & Schneider 2018). Zu dieser Übung gibt es keine Studie; computergestütztes Aufmerksamkeitstraining zeigte bei gesunden Älteren keinen signifikanten Effekt auf Aufmerksamkeit und exekutive Funktionen (Lampit et al. 2014), und Übersichten finden keinen belastbaren Ferntransfer von „Gehirntraining“ (Simons et al. 2016; Sala & Gobet 2019). Ein Alltagsnutzen ist nicht belegt."
aehnliche_uebungen: [201, 207, 302, 510, 802, 102, 101, 501, 702]
stichworte: ["Wahlreaktion", "Choice Reaction Time", "Hick-Hyman-Gesetz", "Reiz-Reaktions-Kompatibilität", "Farbentscheidung Rot/Blau", "Regelwechsel", "Aufgabenwechsel", "Zeigebewegung", "Fitts'sches Gesetz", "Auge-Hand-Koordination", "Zeitdruck", "Combo", "keine Reaktionszeitmessung", "Reaktionszeit-Test (Name des Originals)"]
---

# 202 · Wahlreaktion auf Pfeilrichtungen (Entscheidungstempo bei zwei und vier Möglichkeiten)

> Original: „Wahlreaktionszeit-Test – Entscheidungstempo“ (im Spiel „Reaktionszeit-Test“) – skilldrills.online, Kapitel Kognition & Aufmerksamkeit (`cognitive`, Unterkapitel `processing-speed`) · Blickfit: keine eigene Übung – als Stufen in **Pfeil-Duell** (2 → 4 Richtungen) und **Zeichen-Code** (3 → 6 → 9 Paare) aufgegangen

## 1. Kurzbeschreibung

Ein weißer Pfeil erscheint auf dunklem Grund und zeigt zunächst nach links oder rechts, später in eine von vier Diagonalrichtungen. Man tippt so schnell wie möglich die Taste der gezeigten Richtung; wo der Pfeil steht, spielt keine Rolle, obwohl sein Platz der Richtung in der Hälfte der Durchgänge widerspricht. Vor jedem Pfeil steht 500 ms lang ein Fixationskreuz; danach bleibt der Pfeil bis zur Antwort oder bis zum Ablauf der Frist sichtbar. Die Frist verkürzt sich von etwa 2 Sekunden auf etwa 0,5 Sekunden und passt sich der eigenen Trefferquote an (etwa vier von fünf richtig). Die Zeit bis zum Tipp wird bildgenau gemessen und als Median der richtigen Antworten ausgewiesen; Antworten unter 150 ms gelten als geraten und zählen nicht. In den Stufen 1 bis 10 wächst die Zahl der Möglichkeiten von zwei auf vier; mit gelernten Zuordnungen (3, 6 und 9 Zeichen-Zahl-Paare) lässt sich dasselbe Prinzip im Zeichen-Code üben (siehe 207).

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

- **Reizgröße:** Pfeil und Antworttasten sind große weiße Flächen auf dunklem Grund (am Tablet Pfeil mindestens etwa 1,5°, Tasten mindestens etwa 15 mm; bei 40 cm Abstand entspricht 1 cm etwa 1,4°). Für die Sehschärfe ist die Aufgabe unkritisch, auch bei deutlich reduziertem Visus; begrenzend ist das Erkennen und Entscheiden, nicht die Sichtbarkeit.
- **Blickführung:** Das Fixationskreuz legt den Blick vor jedem Durchgang in die Mitte. Der Pfeil erscheint dort oder um etwa 2° versetzt; die Tasten stehen fest und tragen selbst einen Pfeil, es gibt also nichts zu suchen oder zu lesen.
- **Farbsehen:** Die Übung verlangt keine Farbunterscheidung. Eine Rot-Grün-Schwäche (etwa 8 % der Männer, 0,4 % der Frauen; Birch, 2012) beeinflusst die Aufgabe nicht.
- **Brille:** Pfeil und Tasten liegen im Bereich weniger Grad bis zur Bildschirmbreite. Bei Gleitsichtbrillen können die äußeren Tasten in den seitlichen Unschärfezonen liegen, deren Breite sich zwischen Glasdesigns deutlich unterscheidet (Sheedy, 2004); Gleitsicht-Neulinge bewegen den Kopf mehr (Hutchings et al., 2007). Pfeil und Tasten durch den Nah- bzw. Zwischenbereich zu sehen, ist meist günstiger.
- **Trockenes Auge:** Bildschirmarbeit senkt die Lidschlagrate im Mittel auf etwa ein Fünftel (Patel et al., 1991). Eine Sitzung dauert nur etwa eine Minute; bei mehreren Durchgängen hintereinander helfen bewusstes Blinzeln und Pausen.

## 5. Neurowissenschaftliche Grundlagen

- **Wählen zwischen Antworten:** Nach einer einflussreichen Sichtweise werden mehrere mögliche Handlungen parallel vorbereitet und konkurrieren, bis eine ausgewählt ist (Cisek & Kalaska, 2010). Entscheidung und Bewegung laufen demnach überlappend, nicht nacheinander; aus der Zeit bis zum Tipp lässt sich eine reine „Entscheidungszeit“ nicht herauslesen.
- **Zahl der Möglichkeiten:** Die Wahlreaktionszeit steigt etwa mit dem Logarithmus der Zahl der gleich wahrscheinlichen Möglichkeiten (Hick, 1952; Hyman, 1953). Wie stark, hängt von der Reiz-Antwort-Kompatibilität und von der Übung ab; bei hoch kompatiblen Zuordnungen kann der Anstieg sehr klein sein (Fitts & Seeger, 1953; Wright et al., 2007; Übersicht: Proctor & Schneider, 2018). Beim Pfeil-Duell entspricht die Pfeilrichtung dem Ort der Taste; im Zeichen-Code (207) muss die Zuordnung dagegen gelernt und nachgeschlagen werden, sodass das Hick-Prinzip dort stärker wirkt.
- **Ort als Störgröße:** Weil der Platz des Pfeils in der Hälfte der Durchgänge der Richtung widerspricht, enthält jede Wahl einen kleinen Konflikt (räumlicher Stroop-Effekt, siehe 201). Dass die Übung bestimmte Hirnregionen „trainiert“, ist nicht untersucht.

## 6. Motorische Grundlagen

- **Tippen auf große Tasten:** Die Zielbewegung folgt dem Fitts'schen Gesetz (Bewegungszeit steigt mit Weg und sinkt mit Zielgröße; Fitts, 1954); bei so großen Tasten ist ihr Anteil klein, die Zeit geht überwiegend in Erkennen und Entscheiden auf.
- **Tempo und Genauigkeit:** Schnelleres Antworten erhöht die Fehlerrate (Heitz, 2014). Richtige Antworten heben die Stufe um 0,25 an, falsche oder zu langsame senken sie um 1; dieses gewichtete Auf-Ab-Verfahren (Kaernbach, 1991) hält die Trefferquote bei etwa 80 %. Rateantworten unter 150 ms zählen nicht, sodass blindes Tippen sich nicht lohnt.
- **Eingabeart:** Bei Zeigeaufgaben war der Touchscreen im Vergleich zur Maus bei Älteren um 35 %, bei Jüngeren um 16 % schneller, mit weniger Fehlern (Findlater et al., 2013). Mit Pfeiltasten entfällt die Zielbewegung weitgehend. Touch-Web-Apps messen Zeiten um etwa 58–70 ms zu lang (Pronk et al., 2020).
- **Tremor, Hand und Arm:** Die Tasten sind groß; belastend ist eher das Tempo (etwa eine Antwort pro 0,5 bis 2 Sekunden) über die Dauer von etwa einer Minute.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät und Eingabeart:** Die Antwortfrist ist in Millisekunden festgelegt, Eingabe- und Anzeigeverzögerung gehen davon ab. Touch, Maus und Pfeiltasten liefern unterschiedliche Zeiten (Pronk et al., 2020; Findlater et al., 2013); Vergleiche gelten deshalb nur auf demselben Gerät mit derselben Eingabeart. Am Menschen streuen Messwerte stärker als an Prüfkörpern, und eine hohe Korrelation zweier Verfahren bedeutet noch keine Übereinstimmung; Mehrfachmessung und Mittelung sind sinnvoll (Grundsatz aus der Hornhautvermessung: Mountford et al., 2004, S. 24 und 43–44). Das Pfeil-Duell weist deshalb den Median über viele Durchgänge aus, nicht einzelne Zeiten.
- **Abfolge der Durchgänge:** Richtung und Platz wiederholen sich nicht direkt; bei zwei Richtungen wären strikte Wechsel vorhersagbar, deshalb sind dort höchstens zwei gleiche Antworten in Folge erlaubt. Die Hälfte der Durchgänge ist widerspruchsfrei, die Hälfte widersprüchlich.
- **Zuverlässigkeit von Differenzwerten:** Der Zeitverlust durch widersprüchliche Reize ist als persönlicher Wert oft unzuverlässig (Test-Retest in sieben Aufgaben von 0 bis 0,82; Hedge et al., 2018) und wird nur als Zusatzwert gezeigt.
- **Alter:** Die Wahlreaktionszeit verlangsamt sich über das ganze Erwachsenenalter, die einfache Reaktionszeit kaum vor dem 50. Lebensjahr (Der & Deary, 2006). Die Antwortfrist beginnt großzügig bei etwa 2 s und passt sich an; die Startstufe wird von Sitzung zu Sitzung übernommen.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (stark):** Wahlreaktionen werden mit Übung schneller; der Zuwachs pro zusätzlicher Alternative wird kleiner. Nach 5 Sitzungen à 1.000 Durchgängen sank der Unterschied zwischen 8 und 2 Alternativen von fast 500 auf gut 300 ms (Mowbray & Rhoades, 1959; berichtet in Proctor & Schneider, 2018). Ein Teil des Gewinns ist Gewöhnung an Gerät, Fristen und Strategie.
- **Naher Transfer (schwach):** Zu dieser Übung gibt es keine Studie. Computergestütztes Training bei gesunden Älteren (52 randomisierte Studien) zeigte keinen signifikanten Effekt auf Aufmerksamkeit und exekutive Funktionen (Lampit et al., 2014).
- **Alltagstransfer (fehlend):** Übersichten finden keinen belastbaren Ferntransfer von „Gehirntraining“ (Simons et al., 2016; Sala & Gobet, 2019). Für Sport, Verkehr oder Beruf gibt es keinen Beleg.
- **Seriöse Formulierung:** „Du übst, schnell die passende Taste zur Pfeilrichtung zu wählen. Mit Übung wirst du darin schneller; ob das im Alltag hilft, ist nicht belegt.“

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** eine kurze Wahlreaktionsaufgabe mit Zeitmessung gewünscht ist, die ohne Farben und Wörter auskommt und am Tablet, mit Maus oder mit Pfeiltasten gespielt werden kann; auch als Einstieg in Aufgaben mit mehreren Antwortmöglichkeiten.
- **Weniger passend, wenn …** schnelles Zeigen auf wechselnde Orte geübt werden soll (die Tasten stehen fest), eine einfache Reaktion ohne Wahl (101) oder Impulskontrolle (102) im Vordergrund steht, ruhig ohne Zeitdruck geübt werden soll oder Ergebnisse zwischen Personen oder Geräten verglichen werden sollen.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: kein Blitz, aber rasche Reizfolge auf dunklem Grund; vorsichtshalber kurz probieren und bei Beschwerden abbrechen.
  - `presbyopie_gleitsicht`: äußere Tasten können in seitlichen Unschärfezonen liegen; Gerät in Leseabstand halten, Nahkorrektur prüfen.
  - `tremor_parkinson`, `hand_arm_beschwerden`: etwa eine Antwort pro 0,5 bis 2 Sekunden über rund eine Minute, ohne Pausenfunktion.
  - `kognitive_einschraenkung`, `aufmerksamkeitsprobleme`, `kinder_unter_6`: Zeitdruck mit kürzer werdender Frist; allenfalls als Spiel auf niedriger Stufe, nicht als Test.
- **Warnzeichen:** Doppelbilder, plötzlicher einseitiger Sehverlust, Lichtblitze, neue Schleier, Kopfschmerz mit Sehverschlechterung oder neu auftretender Schwindel gehören ärztlich abgeklärt (Aufzählung der Warnsymptome in der Anamnese: Muchnick, 2008, S. 6, 17 und 28); ein Übungsprogramm ersetzt das nicht.
- **Kombiniert gut mit …** 207 (Zuordnung mit gelernten Paaren, echter Hick-Anteil), 102 (Hemmung ohne Wahl), 201 (Konflikt zwischen Richtung und Ort), 404 (ruhige Blickfolge als Ausgleich ohne Zeitdruck).
- **Abgrenzung:** 202 beschreibt die Wahl nach Richtung; 201 stellt den Konflikt zwischen Reizmerkmalen in den Vordergrund. Pro Einheit genügt eine der beiden, da sie dieselbe Übung betreffen.

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
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓ (Volltext); **stützt:** ja für „Gerät verzögert das Ergebnis“ (17,8 ms Hardware bei 60-Hz-LCD + 1-kHz-Maus), nein für „144-Hz-Monitor und 1.000-Hz-Sensor minimieren Latenzen“ (nicht untersucht; nur einfache RT). – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein

### Weitere Fachliteratur
Alle DOIs am 29./30.09.2026 per Crossref geprüft; Inhalte über PubMed-Abstracts, die Literaturbasis W02 bzw. `docs/wissenschaft/04`.
- Bargary, G., Bosten, J. M., Goodbourn, P. T., Lawrance-Owen, A. J., Hogg, R. E., & Mollon, J. D. (2017). Individual differences in human eye movements: An oculomotor signature? *Vision Research, 141*, 157–169. https://doi.org/10.1016/j.visres.2017.03.001 – Sakkadenlatenz Median 177 ms. – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A*, 29(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Farbsehschwäche
- Cisek, P., & Kalaska, J. F. (2010). Neural mechanisms for interacting with a world full of action choices. *Annual Review of Neuroscience, 33*, 269–298. https://doi.org/10.1146/annurev.neuro.051508.135409 – parallele Vorbereitung und Auswahl möglicher Handlungen.
- Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood: Results from the United Kingdom Health and Lifestyle Survey. *Psychology and Aging, 21*(1), 62–73. https://doi.org/10.1037/0882-7974.21.1.62 – Altersverlauf der Reaktionszeiten
- Ergänzend zitiert (Kurzangaben, Details in der Literaturbasis W02): Birch (2012), https://doi.org/10.1364/JOSAA.29.000313 · Boccardo et al. (2023), https://doi.org/10.1371/journal.pone.0282947 · Diamond (2013), https://doi.org/10.1146/annurev-psych-113011-143750 · Hedge et al. (2018), https://doi.org/10.3758/s13428-017-0935-1 · Heitz (2014), https://doi.org/10.3389/fnins.2014.00150 · Hutchings et al. (2007), https://doi.org/10.1111/j.1475-1313.2006.00460.x · Lampit et al. (2014), https://doi.org/10.1371/journal.pmed.1001756 · Monsell (2003), https://doi.org/10.1016/S1364-6613(03)00028-7 · Munoz et al. (1998), https://doi.org/10.1007/s002210050473 · Paramei & Oakley (2014), https://doi.org/10.1364/JOSAA.31.00A375 · Patel et al. (1991), https://doi.org/10.1097/00006324-199111000-00010 · Pronk et al. (2020), https://doi.org/10.3758/s13428-019-01321-2 · Sala & Gobet (2019), https://doi.org/10.1016/j.tics.2018.10.004 · Sheedy (2004), https://doi.org/10.1016/S1529-1839(04)70021-4 · Simons et al. (2016), https://doi.org/10.1177/1529100616661983 · Treisman & Gelade (1980), https://doi.org/10.1016/0010-0285(80)90005-5 · W3C (2024), *WCAG 2.2*, Kriterien 1.4.1 und 2.3.1, https://www.w3.org/TR/WCAG22/ (Norm, keine DOI). – Sammelzeile der Arbeitsfassung; **stützt (öffentliche Fassung):** nein
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of CHI '13* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Touch vs. Maus nach Alter.
- Fitts, P. M., & Seeger, C. M. (1953). S-R compatibility: Spatial characteristics of stimulus and response codes. *Journal of Experimental Psychology, 46*(3), 199–210. https://doi.org/10.1037/h0062827 – Reiz-Reaktions-Kompatibilität.
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – Fitts'sches Gesetz.
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods*, 50(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 – Zuverlässigkeit von Differenzwerten
- Heitz, R. P. (2014). The speed-accuracy tradeoff: History, physiology, methodology, and behavior. *Frontiers in Neuroscience*, 8, 150. https://doi.org/10.3389/fnins.2014.00150 – Tempo und Genauigkeit
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, 27(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Kopfbewegungen bei Gleitsicht
- Kaernbach, C. (1991). Simple adaptive testing with the weighted up-down method. *Perception & Psychophysics*, 49(3), 227–229. https://doi.org/10.3758/BF03214307 – gewichtetes Auf-Ab-Verfahren
- Kveraga, K., Boucher, L., & Hughes, H. C. (2002). Saccades operate in violation of Hick's law. *Experimental Brain Research, 146*(3), 307–314. https://doi.org/10.1007/s00221-002-1168-8 – Blicksprünge zu sichtbaren Zielen ohne Hick-Anstieg. – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Lampit, A., Hallock, H., & Valenzuela, M. (2014). Computerized cognitive training in cognitively healthy older adults: A systematic review and meta-analysis of effect modifiers. *PLoS Medicine*, 11(11), e1001756. https://doi.org/10.1371/journal.pmed.1001756 – Computertraining bei gesunden Älteren
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messgrundsätze: Streuung am Menschen, Korrelation ist keine Übereinstimmung (S. 24, 43–44)
- Mowbray, G. H., & Rhoades, M. V. (1959). On the reduction of choice reaction times with practice. *Quarterly Journal of Experimental Psychology, 11*(1), 16–23. https://doi.org/10.1080/17470215908416282 – Übung flacht die Hick-Steigung ab.
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnsymptome des Auges und neurologische Warnzeichen (S. 6, 17, 28)
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blick bleibt während des Zeigens am Ziel. – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science*, 68(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag bei Bildschirmarbeit
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology, 71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 – Gültigkeit, Kompatibilität, Übung.
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, 52(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch-Latenz
- Roelofs, A. (2018). One hundred fifty years after Donders: Insights from unpublished data, a replication, and modeling of his reaction times. *Acta Psychologica, 191*, 228–233. https://doi.org/10.1016/j.actpsy.2018.10.002 – Donders' Originalaufgabe. – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Rogers, R. D., & Monsell, S. (1995). Costs of a predictable switch between simple cognitive tasks. *Journal of Experimental Psychology: General, 124*(2), 207–231. https://doi.org/10.1037/0096-3445.124.2.207 – Wechselkosten und Vorbereitungszeit. – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Sala, G., & Gobet, F. (2019). Cognitive training does not enhance general cognition. *Trends in Cognitive Sciences*, 23(1), 9–20. https://doi.org/10.1016/j.tics.2018.10.004 – kein belastbarer Ferntransfer
- Sheedy, J. E. (2004). Progressive addition lenses—matching the specific lens to patient needs. *Optometry*, 75(2), 83–102. https://doi.org/10.1016/S1529-1839(04)70021-4 – Zonenbreiten von Gleitsichtgläsern
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do “brain-training” programs work? *Psychological Science in the Public Interest*, 17(3), 103–186. https://doi.org/10.1177/1529100616661983 – Übersicht zu „Gehirntraining“
- Song, J.-H., & Nakayama, K. (2009). Hidden cognitive states revealed in choice reaching tasks. *Trends in Cognitive Sciences, 13*(8), 360–366. https://doi.org/10.1016/j.tics.2009.04.009 – Wahl-Zeigeaufgaben, Bahnkrümmung. – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Thompson, J. J., Blair, M. R., & Henrey, A. J. (2014). Over the hill at 24: Persistent age-related cognitive-motor decline in reaction times in an ecologically valid video game task begins in early adulthood. *PLoS ONE, 9*(4), e94215. https://doi.org/10.1371/journal.pone.0094215 – Altersverlauf ab 24 Jahren. – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Wright, C. E., Marino, V. F., Belovsky, S. A., & Chubb, C. (2007). Visually guided, aimed movements can be unaffected by stimulus–response uncertainty. *Experimental Brain Research, 179*(3), 475–496. https://doi.org/10.1007/s00221-006-0805-z – Zeigebewegungen ohne Hick-Anstieg bei hoher Kompatibilität.
- Zhao, X., Wang, H., & Maes, J. H. R. (2020). Training and transfer effects of extensive task-switching training in students. *Psychological Research, 84*(2), 389–403. https://doi.org/10.1007/s00426-018-1059-7 – Plateau, naher, kein ferner Transfer. – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
