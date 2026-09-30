---
# ===== Kennung =====
nr: 102
kennung: go-no-go
name: "Grün tippen, Rot stoppen (Go/No-Go)"
name_original: "Go/No-Go-Test (Impulskontrolle) – Seitentitel: Go/No-Go-Test online | Impulskontrolle üben; Überschrift: Go/No-Go-Test: Reaktionshemmung und Impulskontrolle (Spielname „Go/No-Go Pro“)"
kapitel: "Visuelle Wahrnehmung"
kapitel_original: "visual"
unterkapitel_original: "reaction-speed"
quelle_url: "https://skilldrills.online/de/drills/visual/reaction-speed/go/no-go"
blickfit_umsetzung: {kennung: "stopp-los", name: "Stopp & Los", unterschiede: "Genau 25 % Stopp-Reize, höchstens 2 in Folge; Stopp ist ein dunkleres rotes Achteck mit weißem Balken, Los ein hellerer grüner Kreis (Form + Helligkeit + Farbe statt nur Farbe); feste 40 Durchgänge (≈ 1 min) statt Zeitbonus-Uhr; Antwortfrist adaptiv nur über die Los-Durchgänge (950 → 300 ms, 3-down/1-up ≈ 79 % rechtzeitig), Tippen bei Rot ändert die Frist nicht; Tipps in der Pause und < 100 ms nach Reizbeginn werden nur gezählt, nicht bestraft; misst Median-Reaktionszeit, Fehlalarme und Verpasser getrennt; keine Combo, kein roter Bildschirm-Schimmer; Tastatur (Leertaste/Enter) möglich."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "In der Bildmitte leuchtet in schnellem Takt eine Scheibe grün oder rot auf. Bei Grün tippt oder klickt man so schnell wie möglich irgendwo ins Spielfeld, bei Rot hält man still. Weil meist Grün kommt (70 %), wird das Tippen zur Gewohnheit – geübt wird, diese Gewohnheit bei Rot rechtzeitig zu bremsen."
ziel_funktionen: [inhibition, entscheidung_wahlreaktion]
eingabe: [touch, maus, touchpad]
tablet_geeignet: ja
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code steigt das Level mit den Punkten (Punkte/6.300 + 1, sinkt nie) und verschärft sich zusätzlich mit der Combo. Antwortfenster (= Anzeigedauer) 600 ms auf Level 1, 511 ms (L5), 375 ms (L10), 265 ms (L15), Grenzwert 160 ms; ab Combo 50 × 0,75. Pause vor dem Reiz 400–800 ms (L1) → 210–404 ms (L15). Jede richtige Antwort +2 s Restzeit (höchstens 60 s), jeder Fehler −1 s: Die nominell 45 s lange Runde läuft bei genauem Spiel mehrere Minuten, bis das Fenster kürzer als die eigene Reaktionszeit wird."
messgroessen: ["Original: Punkte, 'Accuracy' = richtige / (richtige + alle Fehler), Treffer, Fehler, höchstes Level, beste Combo, Note F–S+", "Original misst keine Reaktionszeit und zeigt keine getrennte Fehlalarmquote (Fehlalarm, Verpasser und Tipp in der Pause zählen gleich)", "sinnvoll: Fehlalarmrate bei Rot, Verpasserrate bei Grün, Median der Reaktionszeit bei Grün, d′ und Kriterium c, Verlauf innerhalb der Runde (Beschleunigung vor Fehlern, Ermüdung)"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 2
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
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 1
    inhibition: 3
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 1
    entscheidung_wahlreaktion: 3
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 2
    auge_hand_koordination: 0
    zielbewegung_tempo: 0
    zielbewegung_praezision: 0
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
voraussetzungen: ["Rot und Grün sicher unterscheiden – die Farbe ist das einzige Unterscheidungsmerkmal", "Reaktionszeit deutlich unter 600 ms, sonst schon auf Level 1 viele Verpasser", "eine Hand frei zum Tippen/Klicken; jede Berührung des Spielfelds zählt", "offene Rundendauer akzeptieren (bei genauem Spiel mehrere Minuten)"]
vorsicht_bei: [farbsehschwaeche, photosensitive_epilepsie, migraene_lichtempfindlich, aufmerksamkeitsprobleme, kognitive_einschraenkung, kinder_unter_6, tremor_parkinson, trockenes_auge_bildschirm]
geeignet_fuer: ["eine schon vorbereitete Tipp-Bewegung im richtigen Moment zurückhalten üben (Reaktionshemmung bei häufigen Los-Reizen)", "schnell entscheiden 'tun oder lassen' unter Zeitdruck", "sprachfreie Konzentrationsübung am Tablet mit einem Finger, ohne Zielen", "auch bei Alterssichtigkeit ohne Nahkorrektur oder mäßig reduzierter Sehschärfe (großer, kontrastreicher Reiz in der Mitte)"]
weniger_geeignet_fuer: ["Menschen mit Rot-Grün-Farbsehschwäche (dann Blickfit 'Stopp & Los' mit Formunterschied)", "verlässliche Verlaufsmessung (keine Fehlalarmquote, Punkte hängen vor allem von der Rundenlänge ab)", "Ziele in Blickmotorik, peripherem Sehen oder Treffgenauigkeit der Hand", "wer eine feste, kurze Übungszeit braucht", "Lichtempfindliche (gesättigte Farbwechsel, roter Fehler-Schimmer)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "In Go/No-Go- und Stop-Signal-Aufgaben wird man mit Übung verlässlich besser, vor allem schneller bei Los-Reizen und durch gelernte Reiz-Stopp-Verknüpfungen – nicht stärker als eine aktive Kontrollgruppe und ohne Transfer auf Stroop oder Intelligenz (Enge et al., 2014; Verbruggen & Logan, 2008). Ein Impulskontrolltraining verbesserte das Simulatorfahren junger Fahrer nicht (Hatfield et al., 2018). Das Spiel selbst ist nicht untersucht."
aehnliche_uebungen: [503, 802, 208, 201, 202, 101, 510, 511, 703]
stichworte: ["Go/No-Go", "Reaktionshemmung", "Impulskontrolle", "response inhibition", "Fehlalarm", "commission error", "Wahlreaktion", "Donders c-Reaktion", "Farbsehschwäche", "Signalentdeckung d′"]
---

# 102 · Grün tippen, Rot stoppen (Go/No-Go)

> Original: „Go/No-Go-Test (Impulskontrolle)“ (Seitentitel „Go/No-Go-Test online | Impulskontrolle üben“, Spielname „Go/No-Go Pro“) – skilldrills.online, Kapitel Visuelle Wahrnehmung (`visual/reaction-speed`) · Blickfit: „Stopp & Los“ (`src/exercises/stopp-los/`)

## 1. Kurzbeschreibung

Eine dunkle Scheibe in der Bildmitte leuchtet nach kurzen, zufälligen Pausen grün oder rot auf. Bei Grün tippt oder klickt man sofort irgendwo ins Spielfeld, bei Rot hält man still, bis die Scheibe wieder dunkel wird. Grün kommt in 7 von 10 Fällen, deshalb stellt sich schnell ein Tipp-Rhythmus ein, den man bei Rot bremsen muss. Richtige Antworten bringen Punkte, eine wachsende Serie (Combo) und Zusatzzeit; mit den Punkten werden Takt und Anzeige kürzer.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Chunk `89094-…js`, Rahmen `33539-…js`, Stand 30.09.2026), abgeglichen mit docs/skilldrills-analyse.md, Abschnitt 2. Beschrieben ist nur die Mechanik, kein Code übernommen.

- **Ablauf (Code):** Start → Countdown 3-2-1-GO (≈ 2,5 s) → Spiel → Ergebnis. Vollbild mit Bildschirmsperre-Unterdrückung; Tab-Wechsel oder Verlassen des Vollbilds bricht ohne Wertung ab.
- **Reiz (Code):** Scheibe mit Radius 52 CSS-px (104 px Durchmesser) in der Mitte, in Ruhe #151515 mit dunklem Mittelpunkt (4 px) und schwachem Ring. Aktiv: Los #10b981 (Smaragdgrün) oder Stopp #ef4444 (Rot), jeweils mit Leuchtschein. Form, Größe und Ort sind gleich – **der Unterschied ist allein die Farbe** (relative Leuchtdichte 0,36 vs. 0,23; eigene Rechnung). Der Canvas nutzt jetzt die Pixeldichte bis 2 (die ältere Analyse nannte fehlende Schärfe auf Retina-Displays als Mangel).
- **Folge (Code):** Jeder Durchgang wird unabhängig ausgelost, 70 % Los, 30 % Stopp; Serien sind nicht begrenzt, auch der erste Reiz kann rot sein. Nach einer gleichverteilten Pause bleibt der Reiz für das Antwortfenster sichtbar.
- **Tempo (Code, Level L, p = (L − 1)/14):** Antwortfenster 600 ms (L1), 582 (L2), 536 (L4), 511 (L5), 375 (L10), 265 (L15), 212 (L20), Grenzwert 160 ms, Untergrenze 100 ms. Pause 400–800 ms (L1), 349–695 (L5), 272–535 (L10), 210–404 ms (L15). Mit der Combo schrumpft das Fenster zusätzlich (ab Combo 50: × 0,75), die Pause × 0,8. Die Zeiten laufen über Timer, nicht pro Bild – das Tempo ist also bei 60 und 144 Hz gleich (anders als bei 104/105).
- **Eingabe (Code):** `pointerdown` irgendwo im Spielfeld – Maus, Touch, Stift, Touchpad. Keine Tastatur.
- **Wertung (Code):**
  - Grün im Fenster getippt: +round(150 × Combo-Faktor × (1 + 0,5 p)) Punkte, Combo +1, +2 s; der nächste Reiz wird sofort geplant.
  - Rot ausgehalten (Fenster abgelaufen): +round(100 × Combo-Faktor × (1 + 0,5 p)), Combo +1, +2 s.
  - Rot getippt: Fehler, −1 s, Combo 0, roter Bildschirm-Schimmer (450 ms, Schalter „Miss Flash“, Standard an).
  - Grün verpasst: Fehler, −1 s, Combo 0 (nur bei eingeschalteter Einstellung „Timeout“, Standard an).
  - Tipp in der Pause, zweiter Tipp im selben Durchgang oder Tipp < 320 ms nach dem vorigen: Fehler, −1 s, Combo 0, 1.200 ms Sperre, der Durchgang wird verworfen.
  - Combo-Faktor 1,1 (ab 3) … 1,5 (ab 10) … 2,0 (ab 20) … 3,0 (ab 50). Level = max(Level, Punkte/6.300 + 1).
  - **Keine Reaktionszeitmessung** und **keine Mindestreaktionszeit**: Ein geratener Tipp 30 ms nach Reizbeginn zählt als Treffer.
  - Ergebnis: Punkte, „Accuracy“ (richtige / (richtige + Fehler); Fehlalarme, Verpasser und Pausen-Tipps vermischt), Treffer, Fehler, Level, beste Combo, Note √(Punkte/16.000) × 100 % (S+ ab 14.440 Punkten). Nur lokal gespeichert.
- **Die Runde dauert nicht 45 s (eigene Rechnung und Simulation):** Ein Durchgang dauert auf Level 1 ≈ 1 s, jede richtige Antwort bringt 2 s. Wer mehr als etwa zwei Drittel richtig beantwortet, gewinnt laufend Zeit (Restzeit bleibt bei 60 s). Die Runde endet erst, wenn das mit den Punkten steigende Level das Fenster unter die eigene Reaktionszeit drückt. Simulation mit den Code-Parametern (je 20 Läufe, Reaktionszeit log-normal, feste Fehlalarmneigung – ein Modell, keine Messung): Median-Reaktionszeit 330 ms und 5 % Fehlalarme → Rundendauer ≈ 7 min, ≈ 88.000 Punkte, Level 15; 500 ms → ≈ 6,5 min, ≈ 42.000 Punkte. Auch **„immer tippen“ ohne jede Hemmung** (300 ms) läuft ≈ 9,5 min und erreicht ≈ 91.000 Punkte. Nur in den ersten 45 s belohnt die Wertung Hemmung deutlich (≈ 10.700 gegenüber ≈ 6.000 Punkten).

**Widersprüche Regeltext ↔ Code.**
- „−1 Life“, „No life lost“: Leben gibt es nicht.
- „No time loss (default)“ bzw. „−0,8 s“: Jeder Fehler kostet immer 1 s; der Schalter für die Zeitstrafe ist wirkungslos.
- „The run always lasts the full clock“, „45-Sekunden-Sitzung“: Die Uhr ändert sich mit jeder Antwort; bei genauem Spiel dauert die Runde Minuten.
- „Analysiere Fehlalarmquote und Reaktionszeit“, Leistungsstufen nach „CER“: Beides wird weder gemessen noch angezeigt. „Zentrales Fadenkreuz“: Es gibt nur einen kleinen Mittelpunkt.
- „Hardware-Latenzen werden nach Woods et al. minimiert“: Es gibt keine Korrektur; `performance.now()` dient nur der Uhr und der 320-ms-Regel.
- „Enge Zeitfenster von 160 ms“: Das ist nur der Grenzwert; am Rundenende liegen die Fenster realistisch bei ≈ 200–430 ms (Abschnitt 7).

## 3. Was die Website sagt – und wie das einzuordnen ist

**Aussagen.** Go/No-Go sei der „Goldstandard“ zur Messung der motorischen Reaktionshemmung. Das Training „stärkt die exekutive Kontrolle des präfrontalen Kortex“ und verringere vorschnelle Reaktionen „in High-Stakes-Umgebungen“. Laut FAQ belegen „Neuroplastizitätsstudien“, dass regelmäßiges Training die Konnektivität des Bremsnetzwerks stärkt und die Stopp-Signal-Reaktionszeit (SSRT) „signifikant verkürzt“. Zielgruppen: FPS-Spieler:innen (Valorant, CS2, Rainbow Six), Pilot:innen, Kraftfahrer:innen, Kampfsportler:innen. Tipps: Helligkeit komme vor der Farbe im Areal V4 an (Donders, 1868); die Kontraktion werde „im Rückenmark abgefangen“ (Logan & Cowan, 1984); gleichförmige Serien führen zum „Autopiloten“ (Robertson et al., 1997); 144/240-Hz-Monitore und 1.000-Hz-Mäuse „reduzieren Fehlalarme nachweislich“; optimal seien 2–3 Einheiten à 3–5 min, sonst „ermüden die präfrontalen Transmitter“. Eine Fünf-Stufen-Tabelle reicht von „Tier 1: Apex Executive Bremsung“ (< 2 % Fehlalarme, 16.000+ Punkte, „perfekte rIFC-STN-Hyperdirekt-Hemmung“) bis „Tier 5: Hohe Voraktivierung“.

**Einordnung.**
- **Aufgabe:** Go/No-Go ist ein Standardparadigma. Hemmung fordert es aber nur mit seltenen Stopp-Reizen und schnellem Takt (≤ 20 % Stopp, ≤ 1.500 ms; erfüllt von nur 8,7 % von 241 Experimenten; Wessel, 2018). Das Original hat 30 % Stopp bei ≈ 1 s Takt: Der Takt ist schnell, der Stopp-Anteil liegt aber knapp über Wessels Grenze von 20 %, und diese Mischung wurde dort nicht getestet. Das Verhältnis 70 : 30 (≈ 2,3 : 1) liegt im Bereich mit den meisten Fehlalarmen (2 : 1 bis 4 : 1, kurze Pausen; Young et al., 2018). Ein spürbarer Hemmdruck ist daher plausibel, direkt gemessen wurde er für dieses Spiel nicht.
- **„Goldstandard der Messung“:** Als Messinstrument taugt das Spiel nicht – es gibt weder Fehlalarmquote noch Reaktionszeit, die Fehlerarten werden vermischt, und die Punkte hängen vor allem von der Rundenlänge ab (Abschnitt 2).
- **SSRT und Wettlaufmodell:** Beides gehört zur Stop-Signal-Aufgabe, bei der das Stoppsignal *nach* dem Los-Reiz mit variabler Verzögerung kommt (Verbruggen et al., 2019). Go/No-Go liefert keine SSRT. „Training verkürzt die SSRT signifikant, stärkt die Konnektivität“ belegt keine der angegebenen Quellen. Eine randomisierte Studie fand keinen Vorteil gegenüber einer aktiven Kontrollgruppe (Enge et al., 2014). Das „Rückenmark“ kommt im kognitiven Modell nicht vor.
- **Hirnareale:** Das Netz aus rechtem unterem Frontalkortex (rIFC), prä-SMA und Nucleus subthalamicus ist ein einflussreiches Modell mit offenen Kontroversen (Aron et al., 2014); es ist keine „moderne fMRT-Evidenz“ für diese Aufgabe. Eine Leistungsstufe „perfekte rIFC-STN-Hemmung“ ist ohne Grundlage.
- **Donders/V4:** Die c-Reaktion (nur auf einen von zwei Reizen antworten) dauert länger als die einfache Reaktion – das stimmt. V4 und „Helligkeit vor Farbe“ stehen nicht bei Donders. Belegt ist ein Vorsprung magnozellulärer Signale von ≈ 17 ms im Makaken-Sehsystem (Schmolesky et al., 1998). Wie schnell auf Farbreize reagiert wird, hängt stark von Farbrichtung und Kontrast ab; Rot-Grün-Reize waren unter reinen Farbreizen die schnellsten, abhängig davon, wie die Farbkontraste skaliert werden (McKeefry et al., 2003). Der Tipp „erst die Farbe abwarten“ ist als Strategie vernünftig, die Begründung nicht.
- **Autopilot:** Das passt zu Robertson et al. (1997). Dort kündigen sich Fehlalarme durch schneller werdende vorangehende Antworten an. Der Titel der Quelle ist auf der Website falsch.
- **Hardware:** 16,7 ms pro Bild bei 60 Hz ist Physik, nicht Woods et al. „Weniger Fehlalarme durch 240 Hz“ ist unbelegt und unplausibel: Eine schnellere Anzeige verschiebt den Farbbeginn für Grün und Rot gleich.
- **Dosis, „Transmitter-Ermüdung“:** Dafür gibt es keinen Beleg.
- **Leistungsstufen:** Die Seite sammelt nach eigener Angabe keine Daten, und keine Quelle enthält Normen für dieses Spiel. Die Fehlalarmquote wird nicht angezeigt. 16.000 Punkte (Tier 1) erreicht in der Simulation jede:r mit wenigen Fehlern nach etwa 1–1,5 min Spielzeit – sogar „immer tippen“ nach wenigen Minuten. Die Tabelle ist damit wertlos.
- **Zielgruppen Fahren/Fliegen:** Die Übertragung aufs Fahren wurde direkt getestet und nicht gefunden (Hatfield et al., 2018).

## 4. Optische und okulomotorische Grundlagen

- **Reizgröße (Herleitung):** 104 CSS-px sind am Tablet (≈ 0,19 mm/px) ≈ 20 mm, bei 40 cm Abstand ≈ 2,9° Sehwinkel; am Desktop (96 ppi, 60 cm) ≈ 2,6°. Der Kontrast zum Hintergrund ist hoch (Grün 7,2 : 1, Rot 4,9 : 1 gegen #151515; WCAG-Formel). Sehschärfe und Kontrastsehen begrenzen die Leistung praktisch nie. Auch unscharf, etwa bei Alterssichtigkeit ohne Nahkorrektur, bleibt eine Farbscheibe dieser Größe erkennbar.
- **Farbsehen – der kritische Punkt:** Rot-Grün-Farbsehschwäche betrifft ≈ 8 % der Männer und ≈ 0,4 % der Frauen (Birch, 2012). Simulation nach Machado et al. (2009, volle Ausprägung) mit CIEDE2000-Abständen (eigene Rechnung):
  - normales Farbsehen: ΔE ≈ 72;
  - Deuteranopie (Grünblindheit): ΔE ≈ 14, Grün wirkt grau-beige, Rot oliv, **Leuchtdichteverhältnis nur 1,17**. Unterscheidbar, aber nur schwach – unter Zeitdruck fehleranfällig;
  - Protanopie (Rotblindheit): ΔE ≈ 22, Rot deutlich dunkler (2,3 : 1), also über die Helligkeit lösbar.

  Die meisten Betroffenen sind anomale Trichromat:innen mit geringeren Einbußen. Farbe als einziges Merkmal verstößt gegen WCAG 2.2, SC 1.4.1 (W3C, 2024).
- **Blick:** Der Reiz erscheint immer am selben Ort. Man fixiert die Mitte; Sakkaden oder Blickfolge sind nicht nötig. Wegschauen erschwert das Farberkennen (Farbsehen ist in der Netzhautmitte am besten).
- **Brille:** Am Monitor auf Augenhöhe sehen Gleitsichtträger:innen die Mitte durch den Fern- oder Zwischenbereich, am flach gehaltenen Tablet durch den Nahteil. Wegen der Reizgröße ist beides unkritisch; Kopfbewegungen sind nicht nötig. Eine Arbeitsplatzbrille ist nicht erforderlich.
- **Lichtreize (eigene Rechnung nach WCAG 2.2, SC 2.3.1):** Die Scheibe wechselt 1–2 Mal pro Sekunde zwischen fast Schwarz und gesättigtem Grün oder Rot mit Leuchtschein. Das ist kleinflächig, unter der Flächengrenze von 0,006 sr (≈ 0,002–0,0035 sr). Der Fehler-Schimmer ist ein roter Verlauf über die ganze Spielfläche (50 % Deckkraft, 450 ms); nach WCAG-Definition ein großflächiger „roter Blitz“, der aber höchstens ≈ 1–2 Mal pro Sekunde auftritt, also unter 3/s. Am stärksten provozieren 15–25 Hz, gesättigtes Rot ist ein Zusatzfaktor (Fisher et al., 2005). Der Schimmer ist abschaltbar.
- **Trockenes Auge:** Die Runde kann Minuten dauern, mit starrem Blick und dem Anreiz, nicht zu blinzeln. Bei Bildschirmarbeit sinkt die Lidschlagrate etwa um das Fünffache (Patel et al., 1991).

## 5. Neurowissenschaftliche Grundlagen

- **Zeitlicher Ablauf:** Über dem Sehkortex beginnt die Aktivität nach ≈ 56 ms, frontal nach ≈ 80 ms (Foxe & Simpson, 2002). Einfache visuelle Reaktionszeit ≈ 213–231 ms, reine Entdeckung ≈ 131 ms (Woods et al., 2015). Bei Go/No-Go kommen Unterscheiden und Entscheiden hinzu (Donders' c-Reaktion).
- **Hemmung oder Auswahl?** Metaanalysen finden in Go/No-Go-Aufgaben durchgängig die prä-SMA (und den linken Gyrus fusiformis). Rechter DLPFC und unterer Parietalkortex kommen erst bei höherer Gedächtnislast hinzu (Simmonds et al., 2008). Ein Großteil der No-Go-Aktivierung spiegelt Aufmerksamkeit und Arbeitsgedächtnis, nicht Hemmung an sich (Criaud & Boulinguez, 2013). Mostofsky und Simmonds (2008) deuten Hemmen als Sonderfall der Antwortauswahl („tun oder lassen“). Die EEG-Welle N2 ist bei seltenen Reizen größer, egal ob Los oder Stopp. Sie zeigt also eher Konflikt als Hemmung (Nieuwenhuis et al., 2003).
- **Lernen:** Wenn Rot immer „Stopp“ bedeutet, entsteht mit Übung eine automatische, reizgebundene Hemmung über gelernte Reiz-Stopp-Verknüpfungen (Verbruggen & Logan, 2008). Besser werden im Spiel heißt daher nicht unbedingt, dass die allgemeine Selbstkontrolle stärker wird.
- **Nicht belegt:** „trainiert den rIFC“, „stärkt präfrontale Konnektivität“, „hyperdirekte Bremse perfektionieren“.

## 6. Motorische Grundlagen

- **Bewegung:** Man tippt oder klickt, wohin man will; es gibt kein Zielen (Fitts'sches Gesetz spielt keine Rolle). Gefordert sind eine schnelle, einzelne Fingerbewegung und das Zurückhalten dieser Bewegung. Nach dem Tempo-Genauigkeits-Ausgleich führt schnelleres Antworten zu mehr Fehlalarmen. Das schrumpfende Fenster schiebt Spieler:innen in Richtung Tempo.
- **Touch vs. Maus:** Web-Apps messen auf Touchgeräten Zeiten systematisch zu lang (iPhone ≈ 58 ms, Galaxy ≈ 66–70 ms; Pronk et al., 2020). Das effektive Fenster ist am Tablet also kürzer, auf Level 10 z. B. ≈ 375 − 60 ms.
- **Unwillkürliche Berührungen:** Jede Berührung zählt beim Aufsetzen (`pointerdown`). Aufgelegte Handballen, Tremor oder ein doppelt erkannter Tipp werden als Fehler gewertet; ein zweiter Tipp innerhalb von 320 ms löst eine Sperre aus.
- **Tipp „Hand locker halten“:** plausibel, aber ohne Beleg.

## 7. Einflussfaktoren und Messgrenzen

- **Alter:** Die Wahlreaktionszeit wird über das ganze Erwachsenenalter langsamer (n = 7.130; Der & Deary, 2006). Die Hemmung ist gerade bei Go/No-Go im Alter schwächer (Metaanalyse, 176 Studien; Rey-Mermet & Gade, 2018). Ältere erreichen daher niedrigere Level und machen mehr Fehlalarme. Vergleiche sollten nur mit sich selbst erfolgen.
- **Erreichte Level (Simulation, Abschnitt 2):** Die Runde endet etwa dort, wo das Fenster der eigenen Reaktionszeit entspricht: bei 330 ms um Level 15 (Fenster ≈ 265 ms, mit Combo ≈ 200 ms), bei 500 ms um Level 7–8. Das Level spiegelt daher vor allem das Tempo bei Grün, nicht die Hemmung.
- **Zuverlässigkeit:** Fehlalarmraten aus Go/No-Go sind gut wiederholbar (ICC = 0,76), die SSRT aus Stop-Signal-Aufgaben nur mäßig (0,36–0,49; Hedge et al., 2018). Das setzt aber genügend Stopp-Durchgänge voraus. In 45 s gibt es hier nur ≈ 13 Stopp-Durchgänge, und die Quote wird ohnehin nicht angezeigt. Wer Tempo und Vorsicht trennen will, braucht d′ und das Kriterium c (Stanislaw & Todorov, 1999).
- **Keine Diagnose:** Mehr Fehlalarme finden sich bei vielen psychischen Störungen, aber nur mit kleinen bis mittleren Effekten (g = −0,10 bis 0,52; 318 Studien). Sie sind weder empfindlich noch spezifisch genug für eine Diagnose (Wright et al., 2014).
- **Weitere Faktoren:** Farbsehschwäche (Abschnitt 4) senkt die Leistung, ohne dass die Hemmung schlechter ist. Lange, gleichförmige Runden fördern Ermüdung und automatisches Antworten (Robertson et al., 1997). Die Bildrate spielt kaum eine Rolle, die Eingabelatenz schon.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt: stark.** Go/No-Go- und Stop-Signal-Aufgaben werden mit Übung deutlich besser (Enge et al., 2014; Hatfield et al., 2018). In einer einzelnen Sitzung mit 70 % Los-Reizen half eine mittlere Frist von 500 ms mehr als 300 oder 1.000 ms (Benikos et al., 2013). Die Fenster des Originals (600 → ≈ 400 ms) liegen grob in diesem Bereich; die Studie prüfte nur drei feste Fristen in einer Sitzung, keine adaptive Kurve. Der Gewinn beruht aber vor allem auf schnelleren Los-Antworten und reizgebundenem Lernen (Verbruggen & Logan, 2008). Stärker als in einer aktiven Kontrollgruppe war er nicht (Enge et al., 2014).
- **Naher Transfer: schwach.** Es gab keinen Transfer auf Stroop oder fluide Intelligenz (Enge et al., 2014). Bei Kindern zeigt sich naher Transfer (g = 0,44), ferner nicht (g = 0,11, n. s.; Kassai et al., 2019).
- **Alltagstransfer: fehlend.** Ein adaptives, aufs Fahren zugeschnittenes Impulskontrolltraining (5–10 Tage, 16–24 J.) verbesserte die geübten Aufgaben, das Simulatorfahren aber nicht (Hatfield et al., 2018). Digitales Sport-Sehtraining zeigt große Effekte fast nur in trainingsähnlichen Tests (SMD 1,65 vs. 0,07; Guo et al., 2025). Umgekehrt verbessert Sport die Go/No-Go-Leistung: zwei Jahre Baseballtraining verkürzten die Go/No-Go-Reaktionszeit (Kida et al., 2005).
- **Seriöse Formulierung:** „Du übst, bei Grün schnell zu tippen und bei Rot die Hand stillzuhalten. In der Übung wirst du damit besser; ob das im Straßenverkehr oder Sport hilft, ist nicht belegt.“

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand eine kurze, sprachfreie Übung zu „schnell reagieren und trotzdem bremsen“ sucht; die Übung am Tablet mit einem Finger laufen soll; Sehschärfe oder Nahsicht eingeschränkt sind (großer Reiz in der Mitte); ein spielerischer Einstieg in Hemmungsaufgaben gewünscht ist.
- **Weniger passend, wenn …** eine Farbsehschwäche bekannt ist; ein verlässlicher Verlaufswert gebraucht wird; eine feste, kurze Dauer wichtig ist; Blickmotorik, peripheres Sehen oder Handgenauigkeit geübt werden sollen.
- **Vorsicht / anpassen bei …**
  - `farbsehschwaeche`: Die Farbe ist das einzige Merkmal; bei Grünschwäche sind die Reize kaum heller oder dunkler als einander. Stattdessen Blickfit „Stopp & Los“ (Form + Helligkeit) wählen.
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: 1–2 gesättigte Farbwechsel pro Sekunde mit Leuchtschein und großflächiger roter Fehler-Schimmer. Das liegt unter den WCAG-Grenzen; den Schimmer vorher abschalten.
  - `aufmerksamkeitsprobleme`, `kognitive_einschraenkung`, `kinder_unter_6`: Das Tempo ist hoch (Pause ab 400 ms, Fenster 600 ms), jeder Tipp in der Pause kostet Zeit und löst eine Sperre aus, die Runde kann sehr lang werden. Das Spiel ist kein Test für ADHS oder Impulsivität (Wright et al., 2014).
  - `tremor_parkinson`: Jede Berührung zählt sofort; unwillkürliche Bewegungen werden zu Fehlalarmen, verlangsamte Bewegungen zu Verpassern.
  - `trockenes_auge_bildschirm`: Die Runde dauert oft mehrere Minuten mit starrem Blick; Pausen einplanen.
- **Kombiniert gut mit …** 503 (Sofortreaktion mit Täuschreizen), 208 (Konzentrationsausdauer mit seltenen Zielen), 201 (Stroop, Interferenzkontrolle), 202 (Wahlreaktion), 101 (einfache Reaktion als Vergleich).
- **Abgrenzung:** 101 misst die einfache Reaktion ohne Stopp-Reiz. Bei 802 ist die Go/No-Go-Regel in eine Abfangbewegung mit der Maus eingebettet. Bei 208 sind die Ziele selten (Daueraufmerksamkeit statt Hemmdruck).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

**Schwächen des Originals:** nur Farbe als Merkmal; durch den Zeitbonus eine offene, oft minutenlange Runde, in der die Punkte vor allem von der Dauer abhängen und auch Spiel ohne Hemmung hoch belohnen; keine Reaktionszeit, keine Fehlalarmquote, Fehlerarten vermischt; geratene Tipps direkt nach Reizbeginn zählen; unbegrenzte Zufallsserien; das Level sinkt nie; großflächiger roter Fehler-Schimmer; englische Regelkarte mit falschen Angaben („Life“, „−0,8 s“, „full clock“); Normtabelle ohne Grundlage.

**Blickfit „Stopp & Los“ (umgesetzt; `src/exercises/stopp-los/`):**
- **Reize:** Los ist ein heller grüner Kreis mit Verlauf (#BBF7D0 → #22C55E), Stopp ein dunkleres rotes Achteck (#EF4444) mit weißem Querbalken, wie ein Verbotsschild. Die Form allein reicht zur Unterscheidung. Bei simulierter Deuteranopie ist das Helligkeitsverhältnis 1,7 statt 1,17 (eigene Rechnung). Radius 9 % der kürzeren Bühnenseite, mindestens 40 px (≈ 1,5 cm Durchmesser); am Tablet quer etwa 2–2,5 cm, ≈ 3–3,5° bei 40 cm (Herleitung).
- **Ablauf:** feste 40 Durchgänge (Kurzmodus 5), genau 25 % Stopp, die ersten zwei sind Los, höchstens 2 Stopp in Folge. Pause 500–1.100 ms (+300 ms nach einem Fehler), Dauer ≈ 1 min. Keine Combo, kein Zeitbonus.
- **Adaptive Frist:** 950 × 0,93^(Stufe − 1) ms, mindestens 300 ms, Stufen 1–18, Start auf Stufe 3 (≈ 820 ms) bzw. knapp unter der letzten Schwelle. Die Treppe (3 rechtzeitig → schwerer, 1 verpasst → leichter; ≈ 79 % rechtzeitig) läuft nur über die Los-Durchgänge. Tippen bei Rot ändert die Frist nicht, damit Ungeduld nicht belohnt wird.
- **Fehlerlogik:** Tipps in der Pause werden nicht bestraft, nur gezählt; der nächste Reiz kommt frühestens 350 ms später. Tipps < 100 ms nach Reizbeginn gelten als geraten und zählen nicht. Doppel-Tipps innerhalb von 250 ms nach Durchgangsende werden ignoriert. Eingabe: Tippen irgendwo oder Leertaste/Enter.
- **Auswertung:** Stufe (Schwelle aus den Umkehrpunkten), Treffsicherheit, „Bei Rot getippt“, Median der Reaktionszeit bei Grün, Verpasser. d′ mit Loglinear-Korrektur wird nur intern für den Tipp genutzt. Rückmeldung ohne roten Bildschirm-Schimmer; die Systemeinstellung „Bewegung reduzieren“ wird beachtet.
- **Wo Blickfit anders fordert:** Farbe ist kaum noch nötig (farbunterscheidung ≈ 0–1). Der Zeitdruck ist geringer und individuell (Frist 950 → 300 ms statt 600 → 265 ms), die Dauer kurz und fest (daueraufmerksamkeit ≈ 1), die Lichtreize schwächer (≈ 1). Inhibition und Wahlreaktion bleiben der Kern.

**Offene Empfehlungen für Blickfit:**
- 10 Stopp-Durchgänge ergeben die Fehlalarmquote nur in 10-%-Schritten. Einen längeren Block anbieten (≥ 30 Stopp, z. B. 120 Durchgänge; docs/wissenschaft/01, 2.4) und „Stopp-Sicherheit“ sowie „Balance“ (aus c) anzeigen.
- Takt von Reiz zu Reiz (≈ 1,0–2,0 s) teils über Wessels „schnell“ (≤ 1,5 s): auf höheren Stufen die Pause kürzen. Später mehrere Los-Formen oder Regelwechsel ergänzen (Young et al., 2018).
- Die Chips „Bremsen im Verkehr“, „Anfahren an der Ampel“ (texts.ts, `goodFor`) können als Wirkversprechen gelesen werden. Besser als Alltagsbeispiel kennzeichnen („erinnert an …“), da der Transfer aufs Fahren untersucht und nicht gefunden wurde. Weiterhin keine Normtabellen, nur Selbstvergleich auf demselben Gerät.

## 11. Quellen

### Von der Website angegeben
- Donders, F. C. (1969). On the speed of mental processes (W. G. Koster, Übers.; Original 1868). *Acta Psychologica*, 30, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 – **Prüfung:** DOI stimmt ✓ (nur Metadaten, Klassiker); **stützt die Aussage der Website:** teilweise (c-Reaktion dauert länger als einfache Reaktion ja; „Helligkeit vor Farbe in V4“ steht nicht bei Donders).
- Logan, G. D., & Cowan, W. B. (1984). On the ability to inhibit thought and action: A theory of an act of control. *Psychological Review*, 91(3), 295–327. https://doi.org/10.1037/0033-295X.91.3.295 – **Prüfung:** DOI stimmt ✓ (nur Metadaten); **stützt:** teilweise (Wettlaufmodell ja, aber für die Stop-Signal-Aufgabe; „Abfangen im Rückenmark“ nicht).
- Robertson, I. H., Manly, T., Andrade, J., Baddeley, B. T., & Yiend, J. (1997). 'Oops!': Performance correlates of everyday attentional failures in traumatic brain injured and normal subjects. *Neuropsychologia*, 35(6), 747–758. https://doi.org/10.1016/S0028-3932(97)00015-8 – **Prüfung:** DOI stimmt ✓, **Titel auf der Website falsch** („… everyday cognitive slips on the Sustained Attention to Response Task“); **stützt:** ja (seltene No-Go-Reize, Fehlalarme nach beschleunigten Antworten, „Autopilot“).
- Aron, A. R., Robbins, T. W., & Poldrack, R. A. (2014). Inhibition and the right inferior frontal cortex: One decade on. *Trends in Cognitive Sciences*, 18(4), 177–185. https://doi.org/10.1016/j.tics.2013.12.003 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (rIFC/Basalganglien-Netz als Modell mit offenen Kontroversen; keine Trainings- oder SSRT-Verkürzung, keine Leistungsstufen).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, 9, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise („200–250 ms“ für einfache Reaktionen ja: 231 bzw. 213 ms; nichts zu 144/240 Hz, Fehlalarmen oder Latenzkorrektur – das Spiel korrigiert nichts).

### Weitere Fachliteratur
- Benikos, N., Johnstone, S. J., & Roodenrys, S. J. (2013). Short-term training in the Go/Nogo task: Behavioural and neural changes depend on task demands. *International Journal of Psychophysiology*, 87(3), 301–312. https://doi.org/10.1016/j.ijpsycho.2012.12.001 – mittlere Frist (500 ms) am lernwirksamsten
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A*, 29(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Farbsehschwäche
- Criaud, M., & Boulinguez, P. (2013). Have we been asking the right questions when assessing response inhibition in go/no-go tasks with fMRI? A meta-analysis and critical review. *Neuroscience & Biobehavioral Reviews*, 37(1), 11–23. https://doi.org/10.1016/j.neubiorev.2012.11.003 – No-Go-Aktivierung großteils Aufmerksamkeit
- Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood: Results from the United Kingdom Health and Lifestyle Survey. *Psychology and Aging*, 21(1), 62–73. https://doi.org/10.1037/0882-7974.21.1.62 – Wahlreaktion und Alter
- Enge, S., Behnke, A., Fleischhauer, M., Küttler, L., Kliegel, M., & Strobel, A. (2014). No evidence for true training and transfer effects after inhibitory control training in young healthy adults. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 40(4), 987–1001. https://doi.org/10.1037/a0036165 – Übungseffekt ohne echten Trainings- oder Transfereffekt
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, 46(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Blitzfrequenzen, Rot als Risikofaktor
- Foxe, J. J., & Simpson, G. V. (2002). Flow of activation from V1 to frontal cortex in humans: A framework for defining "early" visual processing. *Experimental Brain Research*, 142(1), 139–150. https://doi.org/10.1007/s00221-001-0906-7 – zeitlicher Ablauf der frühen Verarbeitung
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, 16, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Effekte vor allem in trainingsähnlichen Tests
- Hatfield, J., Williamson, A., Kehoe, E. J., Lemon, J., Arguel, A., Prabhakharan, P., & Job, R. F. S. (2018). The effects of training impulse control on simulated driving. *Accident Analysis & Prevention*, 119, 1–15. https://doi.org/10.1016/j.aap.2018.06.012 – kein Transfer aufs Fahren
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods*, 50(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 – Zuverlässigkeit von Fehlalarmrate und SSRT
- Kassai, R., Futo, J., Demetrovics, Z., & Takacs, Z. K. (2019). A meta-analysis of the experimental evidence on the near- and far-transfer effects among children's executive function skills. *Psychological Bulletin*, 145(2), 165–188. https://doi.org/10.1037/bul0000180 – naher, aber kein ferner Transfer bei Kindern
- Kida, N., Oda, S., & Matsumura, M. (2005). Intensive baseball practice improves the Go/Nogo reaction time, but not the simple reaction time. *Cognitive Brain Research*, 22(2), 257–264. https://doi.org/10.1016/j.cogbrainres.2004.09.003 – Sport verbessert Go/No-Go (umgekehrte Richtung)
- Machado, G. M., Oliveira, M. M., & Fernandes, L. A. F. (2009). A physiologically-based model for simulation of color vision deficiency. *IEEE Transactions on Visualization and Computer Graphics*, 15(6), 1291–1298. https://doi.org/10.1109/TVCG.2009.113 – Simulationsmodell für die Farbprüfung
- McKeefry, D. J., Parry, N. R. A., & Murray, I. J. (2003). Simple reaction times in color space: The influence of chromaticity, contrast, and cone opponency. *Investigative Ophthalmology & Visual Science*, 44(5), 2267–2276. https://doi.org/10.1167/iovs.02-0772 – Reaktionszeit auf Farbreize, Rot-Grün-Achse am schnellsten
- Mostofsky, S. H., & Simmonds, D. J. (2008). Response inhibition and response selection: Two sides of the same coin. *Journal of Cognitive Neuroscience*, 20(5), 751–761. https://doi.org/10.1162/jocn.2008.20500 – Hemmen als Antwortauswahl, prä-SMA
- Nieuwenhuis, S., Yeung, N., van den Wildenberg, W., & Ridderinkhof, K. R. (2003). Electrophysiological correlates of anterior cingulate function in a go/no-go task: Effects of response conflict and trial type frequency. *Cognitive, Affective, & Behavioral Neuroscience*, 3(1), 17–26. https://doi.org/10.3758/CABN.3.1.17 – N2 zeigt Konflikt und Seltenheit, nicht Hemmung
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science*, 68(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – weniger Lidschläge am Bildschirm
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, 52(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch-Latenz im Browser
- Rey-Mermet, A., & Gade, M. (2018). Inhibition in aging: What is preserved? What declines? A meta-analysis. *Psychonomic Bulletin & Review*, 25(5), 1695–1716. https://doi.org/10.3758/s13423-017-1384-7 – schwächere Go/No-Go-Hemmung im Alter
- Schmolesky, M. T., Wang, Y., Hanes, D. P., Thompson, K. G., Leutgeb, S., Schall, J. D., & Leventhal, A. G. (1998). Signal timing across the macaque visual system. *Journal of Neurophysiology*, 79(6), 3272–3278. https://doi.org/10.1152/jn.1998.79.6.3272 – magnozellulärer Vorsprung ≈ 17 ms
- Simmonds, D. J., Pekar, J. J., & Mostofsky, S. H. (2008). Meta-analysis of Go/No-go tasks demonstrating that fMRI activation associated with response inhibition is task-dependent. *Neuropsychologia*, 46(1), 224–232. https://doi.org/10.1016/j.neuropsychologia.2007.07.015 – prä-SMA gemeinsam, Rest aufgabenabhängig
- Stanislaw, H., & Todorov, N. (1999). Calculation of signal detection theory measures. *Behavior Research Methods, Instruments, & Computers*, 31(1), 137–149. https://doi.org/10.3758/BF03207704 – d′ und Kriterium c
- Verbruggen, F., & Logan, G. D. (2008). Automatic and controlled response inhibition: Associative learning in the go/no-go and stop-signal paradigms. *Journal of Experimental Psychology: General*, 137(4), 649–672. https://doi.org/10.1037/a0013170 – reizgebundene, automatische Hemmung durch Übung
- Verbruggen, F., Aron, A. R., Band, G. P. H., Beste, C., Bissett, P. G., Brockett, A. T., … Boehler, C. N. (2019). A consensus guide to capturing the ability to inhibit actions and impulsive behaviors in the stop-signal task. *eLife*, 8, e46323. https://doi.org/10.7554/eLife.46323 – SSRT gehört zur Stop-Signal-Aufgabe
- Wessel, J. R. (2018). Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm. *Psychophysiology*, 55(3), e12871. https://doi.org/10.1111/psyp.12871 – Hemmung nur bei seltenen Stopp-Reizen und schnellem Takt
- Wright, L., Lipszyc, J., Dupuis, A., Thayapararajah, S. W., & Schachar, R. (2014). Response inhibition and psychopathology: A meta-analysis of go/no-go task performance. *Journal of Abnormal Psychology*, 123(2), 429–439. https://doi.org/10.1037/a0036295 – Fehlalarme nicht diagnostisch verwertbar
- Young, M. E., Sutherland, S. C., & McCoy, A. W. (2018). Optimal go/no-go ratios to maximize false alarms. *Behavior Research Methods*, 50(3), 1020–1029. https://doi.org/10.3758/s13428-017-0923-5 – Verhältnis und Pause mit den meisten Fehlalarmen
- W3C (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (SC 1.4.1 Use of Color, SC 2.3.1 Three Flashes). https://www.w3.org/TR/WCAG22/ – Norm, keine DOI
