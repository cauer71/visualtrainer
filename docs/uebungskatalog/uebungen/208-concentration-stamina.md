---
# ===== Kennung =====
nr: 208
kennung: concentration-stamina
name: "Konzentrationsausdauer (Buchstaben/Ziffern mit Regelwechsel)"
name_original: "Konzentrationstest | Daueraufmerksamkeit (Attention Span Test / Concentration Stamina)"
kapitel: "Kognition & Aufmerksamkeit"
kapitel_original: "cognitive"
unterkapitel_original: "attention"
quelle_url: "https://skilldrills.online/de/drills/cognitive/attention/concentration-stamina"
blickfit_umsetzung: {kennung: "wachposten", name: "Wachposten", unterschiede: "Kein Regelwechsel, kein Zeitdruck, kein Tempo-Bonus: Statt Buchstaben/Ziffern erscheint alle 1,2 s ein farbfreier Ring mit Lücke (500 ms sichtbar, weich ein- und ausgeblendet). Nur bei einer vorher gezeigten Lückenrichtung wird getippt (18 von 100 Zeichen, je Hälfte 9), die übrigen sind teils ähnlich, teils deutlich anders. Dauer 2 Minuten; ausgewertet werden Treffer, Auslassungen, Fehlalarme und korrekte Zurückweisungen (d′ je Hälfte). Kein Alarmton, keine Perzentil-Stufen."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "In der Bildschirmmitte erscheint 45 Sekunden lang ein einzelner Buchstabe oder eine Ziffer nach dem anderen; getippt wird nur bei einem Zielzeichen der gerade gültigen Regel (Vokal bzw. Primzahl 2, 3, 5, 7). Die Regel wechselt alle 10 Sekunden, die Zeichen erscheinen mit steigendem Level immer kürzer."
ziel_funktionen: [inhibition, entscheidung_wahlreaktion]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 45
schwierigkeit_anpassung: "Level = Punkte / 150 + 1 (Start immer Level 1, also alle 1,5 Treffer eine Stufe; Obergrenze der Wirkung bei Level 15 = 2.100 Punkte): Anzeigedauer 1.100 ms → 260 ms, Pause 150 ms → 50 ms, Zielanteil 30 % → 48 %. Regel und Dauer sind fest."
messgroessen: ["Punkte (+100 je Treffer, kein Abzug)", "Genauigkeit = Treffer / (Treffer + Fehltipps + Verpasste)", "erreichter Höchstlevel", "sinnvoll ergänzt: Treffer, Verpasste, Fehlalarme, korrekte Zurückweisungen, d′ und Reaktionszeit (Median) je Regelphase"]

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
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 2
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 1
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
    auge_hand_koordination: 0
    zielbewegung_tempo: 0
    zielbewegung_praezision: 0
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 1
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 2
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Lateinische Buchstaben (Vokale A E I O U) und einstellige Primzahlen (2, 3, 5, 7) müssen sicher bekannt sein", "Tablet quer oder Bildschirm in 40–60 cm Abstand; ein Tipp irgendwo auf der Fläche genügt (Leertaste/Eingabetaste am Computer)", "Bereitschaft, 45 s lang ohne Pause zu reagieren; der Bildschirm sollte entspiegelt und nicht zu hell sein (weiß auf Dunkel)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, aufmerksamkeitsprobleme, kognitive_einschraenkung, kinder_unter_6, sehbehinderung_niedriger_visus]
geeignet_fuer: ["kurzes, schnelles Entscheiden (Ja/Nein auf einzelne Zeichen) mit Regelumstellung üben", "sich selbst beim zügigen Reagieren und Zurückhalten beobachten (Fehltipps gegenüber Verpassten)", "Einstieg in Go/No-Go-Aufgaben mit leicht steigendem Tempo"]
weniger_geeignet_fuer: ["Training oder Messung von Daueraufmerksamkeit über Minuten (45 s sind zu kurz; hoher Zielanteil)", "Menschen mit Photosensitivität (rote Flächenblitze bei Fehlern; abschaltbar) ohne Anpassung", "Personen, die eine ruhige, tempofreie Übung suchen (Anzeigedauer sinkt bis 260 ms)", "Nutzer:innen ohne lateinische Schrift oder Rechenroutine mit Primzahlen", "Ziel Sehschärfe, Blickfolge oder Naharbeit-Komfort"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: fehlend
  alltag_transfer: fehlend
  kommentar: "Wer eine Aufgabe wiederholt, wird darin meist besser (Lerneffekt); für Bildschirm-Wachsamkeitsübungen gibt es keinen belegten Transfer auf andere Aufgaben oder den Alltag. Vigilanzstudien messen über 10–30 min, die 45-s-Runde kann das Phänomen nicht zeigen."
aehnliche_uebungen: [102, 201, 203, 205, 206, 204, 604]
stichworte: ["Daueraufmerksamkeit", "Vigilanz", "Continuous Performance Test", "Go/No-Go", "Regelwechsel", "Impulskontrolle", "Vokale", "Primzahlen", "Wachposten"]
---

# 208 · Konzentrationsausdauer (Buchstaben/Ziffern mit Regelwechsel)

> Original: „Konzentrationstest | Daueraufmerksamkeit“ (Attention Span Test) – skilldrills.online, Kapitel Kognition & Aufmerksamkeit (`cognitive`/`attention`) · Blickfit: Wachposten (`src/exercises/wachposten/`)

## 1. Kurzbeschreibung
Auf dunklem Grund erscheint in der Mitte ein einzelner großer Buchstabe oder eine Ziffer, nach kurzer Zeit verschwindet
er, dann kommt der nächste. Gilt die Regel „Vokale“, tippt man bei A, E, I, O, U und lässt Konsonanten verstreichen;
gilt „Primzahlen“, tippt man bei 2, 3, 5, 7 und lässt 1, 4, 6, 8, 9 aus. Alle 10 Sekunden wechselt die Regel, die
Zeichen werden mit jedem Treffer kürzer gezeigt. Die Runde dauert 45 Sekunden. Es ist ein schnelles Ja/Nein-Entscheiden
mit Zurückhalten (Go/No-Go), kein Dauertest im eigentlichen Sinn.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext und ausgelieferter Spielcode (Stand 30.09.2026); Code-Werte sind als solche nutzbar, Sehwinkel eigene
Umrechnung.
- **Reiz (Code):** ein Zeichen in Mitte der Fläche, fette Schreibmaschinenschrift, weiß mit Leuchtschatten, Schriftgröße
  96 px (schmales Fenster) bzw. 128 px (ab 640 px Breite). Bei 40 cm Abstand und ≈ 36 CSS-px pro Grad (iPad-typisch) sind
  das ≈ 2,7° bzw. 3,6° Schrifthöhe, Buchstabenhöhe ≈ 1,9–2,5° – deutlich lesbar [H]. Spielfläche 16:9 (mind. 460 px hoch),
  im Hochformat 3:4; optional Vollbild.
- **Reizfolge (Code):** Zielanteil je Zeichen unabhängig zufällig (30 % in Level 1 bis 48 % ab Level 15). Bei „Vokale“
  kommen ausschließlich Buchstaben (5 Vokale, 21 Konsonanten), bei „Primzahlen“ ausschließlich Ziffern (4 Primzahlen,
  5 Nichtprimzahlen). Zufall mit Wiederholungen, keine Mindestabstände.
- **Takt (Code):** Anzeigedauer `1.100 − 840·t` ms, Pause `150 − 100·t` ms mit `t = (Level − 1)/14`; Level 1: 1.100 + 150 ms
  (0,8 Zeichen/s), ab Level 15: 260 + 50 ms (≈ 3,2 Zeichen/s). Ein Tipp (Treffer wie Fehltipp) beendet das Zeichen sofort, das nächste folgt nach
  120 ms. In der Pause dreht sich ein kleiner Ladering mitten auf dem Schirm (Code).
- **Regelwechsel (Code):** Start immer „Vokale“; Wechsel nach 10, 20, 30 und 40 s (Regel dann 10/10/10/10/5 s lang), nur als
  kleines Banner oben in der Mitte und als Ton (derselbe Ton wie ein Treffer). Die Wertung richtet sich nach der Regel zum
  Zeitpunkt des Erscheinens: Ein Zeichen, das den Wechsel „überlebt“, wird noch nach der alten Regel gewertet.
- **Wertung (Code):** Treffer +100 Punkte (kein Abzug für Fehler). Tipp bei Nicht-Ziel (Fehlalarm): Fehlerton, roter
  Flächenblitz, **1 s lang keine Eingabe** (jeder Tipp in der Sperre verlängert sie) – nicht im Regeltext erwähnt. Ziel
  nicht getippt (Auslassung): Fehlerton, Blitz, Zähler +1. Level = ⌊Punkte/150⌋ + 1 (stets Start bei Level 1).
  Genauigkeit = Treffer / (Treffer + Fehlalarme + Auslassungen); korrekte Zurückweisungen zählen nicht mit.
- **Endnote (Code):** Buchstabe aus `100·√(Punkte/4000)`: S+ ab 95, S ab 85, A ab 75, B ab 60, C ab 45, D ab 30 – die Note
  hängt nur von den Punkten ab (4.000 = 40 Treffer), nicht von der Genauigkeit.
- **Eingabe/Technik (Code):** Tippen oder Klicken irgendwo auf der Fläche (`pointerdown`), Leertaste/Eingabetaste, Esc
  bricht ab. Die 45 s laufen über einen 100-ms-Zähler, die Zeichen über Zeitgeber (`setTimeout`) – nicht an die Bildfrequenz
  gekoppelt, aber auch nicht bildgenau. Keine Reaktionszeit wird gespeichert. Ergebnisse nur lokal im Browser (Bestwerte).
- **Widersprüche Regeltext ↔ Code:** „Strafe“ = nur Genauigkeit (stimmt) plus unerwähnte 1-s-Sperre; der Text spricht von
  „Wachsamkeit unter Ermüdung“ und „Arbeitsgedächtnis-Update“, im Code gibt es weder Ermüdungsphase noch Gedächtnisanteil
  (die Regel steht dauernd auf dem Schirm); Zielanteil 30–48 % ist für „seltene Signale“ (Mackworth) unpassend.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Aussagen:** „Fortgeschrittener Continuous Performance Test“ für Daueraufmerksamkeit, Arbeitsgedächtnis-Aktualisierung und
Aufgabenwechsel; „trainiert kognitive Flexibilität, Impulsunterdrückung und Fokusstabilität unter Ermüdung“; geeignet für
Lernende, Gamer und Wachsamkeitsberufe; Leistungsabfall bei monotoner Überwachung „drastisch nach 20–30 min“; Vigilanzdrills
„stärken frontale Netzwerke“; Ausdauertraining „erhöht kognitive Belastbarkeit deutlich“; 144-Hz-Displays „eliminieren
Frame-Jitter“; 10 min vor Lernphasen „bringen das Gehirn in optimalen Fokus“; Tier-Tabelle (Top 1 % bis Basis, Genauigkeit
98 %+ bis < 78 %). Die Seite nennt sich ausdrücklich „nicht klinisch“.

**Einordnung:**
- **Kein CPT im engen Sinn, keine Vigilanz.** Vigilanzdekremente zeigen sich bei seltenen Zielen über Minuten; bei
  schlechter Erkennbarkeit nach etwa 5 min (Nuechterlein et al., 1983), sonst typisch nach 12 min (Temple et al., 2000). 45 s
  mit 30–48 % Zielen und Takt bis 3,2/s erzeugen kein Dekrement; es ist eine schnelle Wahlentscheidung. Die Aufgabe ähnelt
  eher einem Go/No-Go (→ 102) mit Regelwechsel (→ 206).
- **Regelwechsel schwach:** Nach dem Wechsel kommt eine andere Zeichenklasse (Ziffern statt Buchstaben), sodass kaum
  Verwechslungen mit der alten Regel entstehen; die Regel steht als Banner im Blick. „Task-set inertia“ (Monsell, 2003)
  spielt daher nur beim einen „überlebenden“ Zeichen eine Rolle.
- **Fehlalarm-Deutung:** Robertson et al. (1997) deuten Fehlalarme in der SART als Aussetzer der Daueraufmerksamkeit
  („Drift“ in automatisches Antworten), nicht einfach als Impulsivität (spätere Kritik: Helton, 2009; Carter et al., 2013).
  Dieser Test ist zudem keine SART.
- **Benchmark-Tabelle ohne Datenbasis:** Die Seite schreibt selbst, sie erhebe keine Nutzerdaten; keine genannte Quelle
  enthält Werte für dieses Spiel. Die Stufen sind erfunden. Die im Spiel angezeigte Note rechnet zudem aus Punkten, nicht
  aus der Genauigkeit der Tabelle.
- **Trainingsaussagen:** Für Bildschirm-Vigilanztraining ist keine Stärkung „frontaler Netzwerke“ oder Schutz vor
  Ermüdung belegt. Aerobes Training hatte in RCTs nur bescheidene Effekte auf Aufmerksamkeit/Verarbeitungstempo (g = 0,16; Smith et al., 2010); eine Wirkung dieser Übung wird damit nicht belegt.
- **Hardware:** Woods et al. (2015) untersuchten 60-Hz-Bildschirme und 1-kHz-Mäuse, keine 144-Hz-Geräte; eine Aussage über
  „Jitter-Eliminierung“ ist dadurch nicht gestützt.

## 4. Optische und okulomotorische Grundlagen
- **Fixation in der Mitte:** Das Zeichen erscheint immer an derselben Stelle; Augenbewegungen sind kaum nötig (nur der
  Blick auf das kleine Regel-Banner oben). Gefordert ist ruhiges Halten des Blicks und schnelles Erkennen.
- **Erkennbarkeit:** Buchstabenhöhe ≈ 2–2,5° (bei 40 cm), hoher Kontrast weiß/dunkel: Sehschärfe spielt nur bei stark
  eingeschränktem Visus eine Rolle.
- **Zeitdruck an der Wahrnehmungsgrenze:** 260 ms genügen zum Erkennen eines großen Zeichens; begrenzend ist die
  Entscheidung (Regel anwenden), nicht die Sichtbarkeit. Reale Reaktionszeiten ≈ 230 ms für einfache Reize
  (Woods et al., 2015); mit Kategorisieren (Vokal? Primzahl?) meist deutlich länger.
- **Bildschirmabstand/Brille:** Smartphones werden meist näher gehalten als 40 cm (36 cm beim Lesen), Presbyope weiter
  (≈ 40 cm; Bababekova et al., 2011; Boccardo et al., 2023). Das mittig platzierte Zeichen liegt im Zwischen-/Nahbereich
  von Gleitsichtgläsern; der Kopf sollte nicht mitbewegt werden müssen, das Banner oben liegt ggf. schon im Randbereich.
- **Naharbeit/Lidschlag:** 45 s sind kurz; längere Wiederholung (mehrere Runden) kann bei konzentrierter Fixation den
  Lidschlag senken (trockenes Auge, Asthenopie).
- **Flimmern/Lichtreize:** Die Zeichen wechseln je nach Level mit 0,8–3,2/s zwischen Zeichen, Ladering und Leere; bei Fehlern
  überlagert ein roter Radialblitz (Deckkraft 50 %, 450 ms ausblendend) die Fläche. Für Photosensitivität gelten
  als kritisch vor allem Blitzfolgen von 15–25 Hz (bis 65 Hz) bei größeren Flächen (Fisher et al., 2005; Harding et al., 2005);
  Die Zeichenfolge von 0,8–3,2/s liegt am unteren Rand des dort genannten Bereichs (1–65 Hz) und wechselt mit geringer Flächenhelligkeit; der rote Blitz dagegen wirkt großflächig (Rot gilt als zusätzlicher Faktor). Eine Unbedenklichkeit ist daher nicht zu behaupten: für Menschen mit Anfallsneigung Blitz abschalten bzw. Übung meiden.
- **Farbe:** Nur Dekoration (Flash, Noten), keine Unterscheidung nötig – für Farbsehschwäche (~8 % der Männer) geeignet.

## 5. Neurowissenschaftliche Grundlagen
- **Daueraufmerksamkeit** stützt sich auf ein überwiegend rechtshemisphärisches Netzwerk (Präfrontalkortex, vordere Insel,
  Parietalkortex, Kleinhirnwurm, Thalamus; Langner & Eickhoff, 2013), das Wachheit/Aufgabeneinstellung aufrechterhält
  und bei Zielen die Aufmerksamkeit neu ausrichtet; das „Alerting“-Netzwerk (Wachheit, Aktivierung; Posner & Petersen, 1990; Petersen & Posner, 2012) und
  Top-down-Steuerung der Aufmerksamkeit (Sarter et al., 2001; Quelle nur als Überblick genannt) spielen ebenfalls eine Rolle.
- **Hemmung (Fehlalarme vermeiden):** Bildgebungs-Metaanalysen zu Interferenzaufgaben (Stroop, Go/No-Go, Flanker u. a.)
  zeigen Beteiligung von vorderem Cingulum, dorsolateralem Präfrontalkortex und unterem Frontalgyrus (Nee et al., 2007).
- **Aufgabenwechsel:** Wechselkosten entstehen durch Nachwirkung der alten Einstellung und Aufbau der neuen (Monsell, 2003).
- **Vorsicht:** Bei einer 45-s-Aufgabe aus einer „gestärkten“ Hirnregion zu schließen ist nicht belegt; die Aussagen
  beschreiben, welche Netzwerke bei dieser Aufgabenklasse aktiv sind, nicht was diese Übung verändert.

## 6. Motorische Grundlagen
- **Wahlreaktion mit Antwortunterdrückung:** Nur ein Tippen pro Ziel, „Nicht-Tippen“ als zweite Antwort (Go/No-Go). Dauer
  der Entscheidung wächst mit der Zahl der Regeln/Kategorien (Hick-Hyman-Prinzip, hier nur 2 Alternativen).
- **Tippen irgendwo** (kein Zielen): keine Fitts'sche Anforderung; Tippgeschwindigkeit begrenzt bei ≈ 3,2 Zeichen/s nicht.
- **Geräte:** Web-Apps messen Reaktionszeiten auf Touchgeräten zu lang (≈ 58–70 ms; Pronk et al., 2020); das Original
  speichert keine Zeiten. Tastatur ist unmittelbarer als Touch.
- **Nachteil der Sperre:** Wer versehentlich antippt, kann 1 s lang nicht reagieren – ein Zusatzreiz für Stress, der
  Reaktionsgewohnheiten verändert.

## 7. Einflussfaktoren und Messgrenzen
- **Alter:** Über die Lebensspanne (10.430 Personen, gradCPT, online) war die Fähigkeit (ability) in den frühen 40ern am höchsten
  und nahm danach allmählich ab; die Strategie wurde mit dem Alter zunehmend vorsichtiger (Fortenbaugh et al., 2015). Tempo-Level 15 bewertet das nicht alters-
  fair.
- **Schlaf/Tagesform:** Kurzer Schlafentzug (< 48 h) erhöht vor allem die Aufmerksamkeitsaussetzer (Lapses) in
  einfachen Aufmerksamkeitsaufgaben (g = −0,78; Lim & Dinges, 2010).
- **Tempo belohnt:** Da ein Treffer das Zeichen sofort beendet und Punkte ohne Abzug vergibt, steigen Punktzahl und Level
  mit Tippgeschwindigkeit und Risikobereitschaft. Die Punktzahl mischt daher Tempo, Strategie und Genauigkeit.
- **Zuverlässigkeit:** Keine Reaktionszeit, keine Trennung von Empfindlichkeit (d′) und Antwortkriterium, nur eine Runde;
  Differenzmaße in kognitiven Aufgaben sind individuell oft unzuverlässig (Hedge et al., 2018). Fehlerzahlen einer
  45-s-Runde schwanken stark (wenige Ziele je 10-s-Regelphase, je nach Level grob 2–15).
- **Übungseffekt:** Bekannte Regel und wenige Zeichen (9 Ziffern, 26 Buchstaben) werden rasch automatisiert; die zweite
  Runde ist fast immer besser – Lerneffekt, keine „Verbesserung der Konzentration“.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt: mittel.** In Aufgaben dieser Art ist Verbesserung durch Wiederholung zu erwarten (Automatisierung von
  Regel und Zeichen); Studien zur Trainierbarkeit der Vigilanz selbst sind knapp (Fortenbaugh et al., 2017).
- **Naher Transfer: fehlend.** Für Bildschirm-Wachsamkeitsübungen gibt es keine belegte Übertragung auf andere
  Aufmerksamkeitsaufgaben.
- **Alltagstransfer: fehlend.** Kognitives Training bei ADHS: nur unverblindet deutliche Effekte, verblindet klein bis
  nicht signifikant (Cortese et al., 2015). Kein Heilversprechen; die Übung ist kein Aufmerksamkeits-/ADHS-Test.
- **Ehrlicher Nutzen:** Man erlebt, dass schnelles Entscheiden mit Regelwechsel Fehler provoziert und Pausen sinnvoll sind.

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** ein kurzes, schnelles Go/No-Go mit Regelwechsel gewünscht ist (Profil: `entscheidung_wahlreaktion`/
  `inhibition`/`verarbeitungsgeschwindigkeit` 2, `kognitive_flexibilitaet` 1), Touch am Tablet, keine Hand-Augen-Genauigkeit.
- **Weniger passend, wenn …** Daueraufmerksamkeit über Minuten, Ruhe, tempofreies Üben, Farb- oder Lichtempfindlichkeit
  im Vordergrund stehen – dann eher Wachposten (Blickfit) oder 102 Go/No-Go.
- **Vorsicht / anpassen bei …** `photosensitive_epilepsie`/`migraene_lichtempfindlich` (roter Flächenblitz, schnelle Zeichenfolge;
  Blitz abschalten), `aufmerksamkeitsprobleme` und `kognitive_einschraenkung` (Frust durch Tempo und 1-s-Sperre),
  `kinder_unter_6` (Buchstaben/Primzahlen), `sehbehinderung_niedriger_visus` (nur Zeichengröße ≈ 2° prüfen). Auswahlhinweis,
  keine medizinische Aussage.
- **Kombiniert gut mit …** 102 (Go/No-Go), 201 (Stroop), 203 (Zeichenstrom mit Zielwort, Takt), 206 (zwei Ströme), 604 (n-back, Gedächtnisanteil).
- **Abgrenzung in der Gruppe:** 208 ist ein Go/No-Go mit Regelwechsel (Entscheiden und Zurückhalten, eine Tippfläche); 203 dagegen Takt-Vorausplanen mit festem Zielwort, 201 Konflikt Wort/Farbe mit mehreren Knöpfen. Wegen der nur 45 s ist die Übung kein Vigilanz-Test; Daueraufmerksamkeit bleibt bei 1.
- Nicht als Test, Diagnose oder Leistungsvergleich („Top 1 %“) verwenden.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
**Umsetzung: Wachposten** (Blickfit) – die wichtigsten Unterschiede:
- Format: nur bei **seltenem** Ziel tippen (18 %), keine Tempobelohnung, kein Regelwechsel → echtes klassisches
  Vigilanzformat statt SART-ähnlichem Hemmungsformat (Helton, 2009). Regelwechsel nur als optionale Idee in den Unterlagen.
- Reiz: Ring mit Lücke (eigene Grafik, farbfrei), Durchmesser 64–170 px (≈ 1,8–4,7° bei 36 px/°), ruhig, weiches
  Ein-/Ausblenden, **keine Flächenblitze**, kein Alarmton; Rückmeldung „Verpasst“ dezent.
- Takt fix: 1,2 s je Zeichen, 500 ms sichtbar, Antwortfenster 150 ms nach Beginn bis 150 ms nach dem nächsten Zeichen;
  2 min; Ziele in beiden Hälften je 9. Schwierigkeit über Ähnlichkeit der Ablenker (Drehwinkel der Lücke 90° → ≈ 15° je
  Stufe 1–10) bei fester Stufe während der Sitzung, danach Anpassung um höchstens ±2 nach d′.
- Auswertung: Treffsicherheit = Mittel aus Trefferquote und Quote korrekt nicht getippter Zeichen; d′ je Hälfte,
  Median-Reaktionszeit, Tipp-Text („ließ in der zweiten Hälfte etwas nach – normal, Pausen sind gut“).
- Offene Punkte: 2 min sind kürzer als Studien (Temple et al., 2000, 12 min); 9 Ziele je Hälfte erlauben nur grobe Aussagen
  (ein Treffer = 11 %). Kommentarmaß „≥ 80 px“ im Code widerspricht der Untergrenze 64 px (klein, sichtbar bei kleinen Displays).

**Schwächen des Originals:**
- Wirkversprechen („stärkt frontale Netzwerke“, „Elite“-Tabelle) ohne Datenbasis; Ermüdungsphänomen nicht erzeugbar.
- Keine Reaktionszeit, keine d′-Auswertung; Genauigkeit ohne korrekte Zurückweisungen; Note nur aus Punkten.
- Unangekündigte Regelwechsel (Banner klein, Ton wie Treffer), 1-s-Sperre nicht erklärt, roter Flächenblitz, hoher Zielanteil.
- Sprach-/Schriftabhängig (Vokale, Primzahlen); Farbe nur dekorativ (gut für Farbsehschwäche).
- Empfehlung: Wenn nachgebaut, dann ohne Sperre, mit angekündigtem Regelwechsel und mit getrennter Auswertung je Regelphase.

## 11. Quellen
### Von der Website angegeben
- Mackworth, N. H. (1948). The breakdown of vigilance during prolonged visual search. *Quarterly Journal of Experimental Psychology, 1*(1), 6–21. https://doi.org/10.1080/17470214808416738 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (Uhrzeigertest über 2 h; der Hauptabfall liegt früh, „drastisch“ nach 20–30 min ist übertrieben; Zahlen nur aus Sekundärquellen, unsicher; eine 45-s-Runde misst kein Vigilanzdekrement)
- Parasuraman, R. (1979). Memory load and event rate control sensitivity decrements in sustained attention. *Science, 205*(4409), 924–927. https://doi.org/10.1126/science.472714 – **Prüfung:** DOI stimmt ✓, Titel auf der Website verkürzt („Memory load and event rate in sustained attention“); **stützt:** ja (Empfindlichkeitsverlust nur bei Gedächtnislast und hoher Ereignisrate)
- Robertson, I. H., Manly, T., Andrade, J., Baddeley, B. T., & Yiend, J. (1997). ‘Oops!’: Performance correlates of everyday attentional failures in traumatic brain injured and normal subjects. *Neuropsychologia, 35*(6), 747–758. https://doi.org/10.1016/S0028-3932(97)00015-8 – **Prüfung:** DOI stimmt ✓, Titel auf der Website falsch („… cognitive slips on the Sustained Attention to Response Task (SART)“); **stützt:** teilweise (Fehlalarme als Daueraufmerksamkeits-Aussetzer, nicht eindeutig Impulsivität; Aufgabe ist keine SART)
- Monsell, S. (2003). Task switching. *Trends in Cognitive Sciences, 7*(3), 134–140. https://doi.org/10.1016/S1364-6613(03)00028-7 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Nachwirkung der Aufgabeneinstellung ja; Arbeitsgedächtnisanteil nicht genannt)
- Broadbent, D. E. (1958). *Perception and communication*. Pergamon Press. https://doi.org/10.1037/10037-000 – Buch, APA-PsycBooks-DOI; **Prüfung:** DOI stimmt ✓; **stützt:** ja (Filtertheorie selektiver Aufmerksamkeit)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (60-Hz-Anzeige und 1-kHz-Maus, keine Aussage zu 144 Hz/Frame-Jitter; zitierbar nur für Reaktionszeiten ≈ 231 ms und +0,55 ms/Jahr)

### Weitere Fachliteratur
- Warm, J. S., Parasuraman, R., & Matthews, G. (2008). Vigilance requires hard mental work and is stressful. *Human Factors, 50*(3), 433–441. https://doi.org/10.1518/001872008X312152 – Vigilanz als anstrengend; Fehler ohne Alarmton
- Temple, J. G., Warm, J. S., Dember, W. N., Jones, K. S., LaGrange, C. M., & Matthews, G. (2000). The effects of signal salience and caffeine on performance, workload, and stress in an abbreviated vigilance task. *Human Factors, 42*(2), 183–194. https://doi.org/10.1518/001872000779656480 – 12-min-Aufgabe reproduziert Dekrement, Belastung und Stress längerer Aufgaben
- Nuechterlein, K. H., Parasuraman, R., & Jiang, Q. (1983). Visual sustained attention: Image degradation produces rapid sensitivity decrement over time. *Science, 220*(4594), 327–329. https://doi.org/10.1126/science.6836276 – Dekrement nach 5 min bei schlecht erkennbaren Reizen
- Helton, W. S. (2009). Impulsive responding and the sustained attention to response task. *Journal of Clinical and Experimental Neuropsychology, 31*(1), 39–47. https://doi.org/10.1080/13803390801978856 – SART misst eher Hemmung; klassisches Format
- Carter, L., Russell, P. N., & Helton, W. S. (2013). Target predictability, sustained attention, and response inhibition. *Brain and Cognition, 82*(1), 35–42. https://doi.org/10.1016/j.bandc.2013.02.002 – SART und Hemmung
- Fortenbaugh, F. C., DeGutis, J., Germine, L., Wilmer, J. B., Grosso, M., Russo, K., & Esterman, M. (2015). Sustained attention across the life span in a sample of 10,000: Dissociating ability and strategy. *Psychological Science, 26*(9), 1497–1510. https://doi.org/10.1177/0956797615594896 – Altersverlauf
- Fortenbaugh, F. C., DeGutis, J., & Esterman, M. (2017). Recent theoretical, neural, and clinical advances in sustained attention research. *Annals of the New York Academy of Sciences, 1396*(1), 70–91. https://doi.org/10.1111/nyas.13318 – Überblick Netzwerk, Belohnung, Training
- Langner, R., & Eickhoff, S. B. (2013). Sustaining attention to simple tasks: A meta-analytic review of the neural mechanisms of vigilant attention. *Psychological Bulletin, 139*(4), 870–900. https://doi.org/10.1037/a0030694 – Netzwerk der Vigilanz (Abstract gelesen)
- Sarter, M., Givens, B., & Bruno, J. P. (2001). The cognitive neuroscience of sustained attention: Where top-down meets bottom-up. *Brain Research Reviews, 35*(2), 146–160. https://doi.org/10.1016/S0165-0173(01)00044-3 – Top-down-/Bottom-up-Steuerung der Daueraufmerksamkeit (nur Metadaten geprüft, keine Detailaussage daraus abgeleitet)
- Petersen, S. E., & Posner, M. I. (2012). The attention system of the human brain: 20 years after. *Annual Review of Neuroscience, 35*, 73–89. https://doi.org/10.1146/annurev-neuro-062111-150525 – Alerting-Netzwerk
- Nee, D. E., Wager, T. D., & Jonides, J. (2007). Interference resolution: Insights from a meta-analysis of neuroimaging tasks. *Cognitive, Affective, & Behavioral Neuroscience, 7*(1), 1–17. https://doi.org/10.3758/CABN.7.1.1 – Hemmung, Hirnregionen
- Lim, J., & Dinges, D. F. (2010). A meta-analysis of the impact of short-term sleep deprivation on cognitive variables. *Psychological Bulletin, 136*(3), 375–389. https://doi.org/10.1037/a0018883 – Schlafentzug und Aufmerksamkeit
- Smith, P. J., Blumenthal, J. A., Hoffman, B. M., Cooper, H., Strauman, T. A., Welsh-Bohmer, K., Browndyke, J. N., & Sherwood, A. (2010). Aerobic exercise and neurocognitive performance: A meta-analytic review of randomized controlled trials. *Psychosomatic Medicine, 72*(3), 239–252. https://doi.org/10.1097/PSY.0b013e3181d14633 – Ausdauertraining, kleine Effekte
- Cortese, S., Ferrin, M., Brandeis, D., Buitelaar, J., Daley, D., Dittmann, R. W., Holtmann, M., Santosh, P., Stevenson, J., Stringaris, A., Zuddas, A., Sonuga-Barke, E. J. S., & European ADHD Guidelines Group. (2015). Cognitive training for attention-deficit/hyperactivity disorder: Meta-analysis of clinical and neuropsychological outcomes from randomized controlled trials. *Journal of the American Academy of Child & Adolescent Psychiatry, 54*(3), 164–174. https://doi.org/10.1016/j.jaac.2014.12.010 – kein verblindeter Nutzen
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods, 50*(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 – Zuverlässigkeit von Differenzmaßen
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Zeitmessung auf Touchgeräten
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Lichtreize
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x – Schwellen für Blitzreize
- Bababekova, Y., Rosenfield, M., Hue, J. E., & Huang, R. R. (2011). Font size and viewing distance of handheld smart phones. *Optometry and Vision Science, 88*(7), 795–797. https://doi.org/10.1097/OPX.0b013e3182198792 – Sehabstand
- Boccardo, L., Gurioli, M., & Grasso, P. A. (2023). Viewing distance and character size in the use of smartphones across the lifespan. *PLoS ONE, 18*(4), e0282947. https://doi.org/10.1371/journal.pone.0282947 – Sehabstand Presbyope
- Posner, M. I., & Petersen, S. E. (1990). The attention system of the human brain. *Annual Review of Neuroscience, 13*, 25–42. https://doi.org/10.1146/annurev.ne.13.030190.000325 – Alerting, Orientierung, Exekutive
- Rosvold, H. E., Mirsky, A. F., Sarason, I., Bransome, E. D., Jr., & Beck, L. H. (1956). A continuous performance test of brain damage. *Journal of Consulting Psychology, 20*(5), 343–350. https://doi.org/10.1037/h0043220 – ursprünglicher CPT
