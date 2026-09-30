---
# ===== Kennung =====
nr: 109
kennung: rhythm-anomaly
name: "Aus dem Takt (Feld mit anderem Puls-Tempo finden)"
name_original: "Flimmerfusion | Visuelle Zeitauflösung | SkillDrills (Übungstitel: „Flimmerfusion-Test“, Rhythm Anomaly Pro)"
kapitel: "Visuelle Wahrnehmung"
kapitel_original: "visual"
unterkapitel_original: "visual-recognition"
quelle_url: "https://skilldrills.online/de/drills/visual/visual-recognition/rhythm-anomaly"
blickfit_umsetzung: {kennung: "aus-dem-takt", name: "Aus dem Takt", unterschiede: "Alle Felder gleich hell und gleich stark, damit nur der Rhythmus verrät, welches Feld anders pulsiert (im Original pulsiert das Zielfeld zusätzlich doppelt so hell). Jedes Feld hat eine zufällige Phase (im Original sind alle normalen Felder gleichzeitig hell). Grundtempo pro Durchgang zufällig 1,0 bis 1,8 Hz, das Zielfeld ist zufällig schneller oder langsamer; Obergrenze 2,5 Hz. Der Tempounterschied wird adaptiv kleiner (2 richtig runter, 1 Fehler rauf; 40 % bis 4,3 %, Stufe 1 bis 11) statt konstant ca. 39 % zu bleiben. 4 x 4 Felder, 12 Durchgänge statt 45 s Punktesammeln; Antwort erst nach 2 s Zuschauen, nach höchstens 9 s wird aufgelöst. Sanfter Sinus in linearer Leuchtdichte (Grau 30 bis 60 auf Grund 20, Hub deutlich unter der WCAG-Blitzschwelle), pulsierende Fläche höchstens 22 % der Bühne, danach mindestens 2 s Standbild; keine Störblitze, keine Zeitstrafe, Rückmeldung als ruhiger Rahmen. Helligkeit aus der Uhrzeit statt aus der Bildzahl berechnet (auf 60 und 120 Hz gleich). Tablet und Touch als Hauptgerät."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Ein Raster aus 36 dunklen Feldern pulsiert langsam. Ein Feld pulsiert schneller als die anderen (und im Original zusätzlich heller). Man tippt oder klickt es an, bevor die Zeit abläuft; kurze Aussetzer einzelner Felder („Störblitze“) lenken ab."
ziel_funktionen: [zeitliche_aufloesung]
eingabe: [maus, touch]
tablet_geeignet: ja
dauer_sekunden: 45
schwierigkeit_anpassung: "Level = floor(Treffer/3) + 1. Pro Treffer: Grundperiode = max(600, 1600 − 40 × Treffer) ms (0,6 bis 1,7 Hz), Zielperiode = max(400, floor(0,72 × Grundperiode)) ms, Störblitz-Takt = max(200, 800 − 25 × Treffer) ms, Zeitlimit je Ziel = max(1800, 6000 − 150 × Treffer) ms. Das Verhältnis Ziel/Grund bleibt bei 0,72 (Ziel ca. 39 % schneller), wird also nicht feiner; schwerer wird es über Tempo, mehr Störreize und kürzeres Limit."
messgroessen: ["Punkte (+10 je Treffer)", "Genauigkeit in % (Treffer / (Treffer + Fehlklicks))", "Serie (Combo)", "Fehlklicks", "Endlevel", "Note (Referenz 200 Punkte)", "Bestwert lokal", "sinnvoll ergänzt: Median der Antwortzeit, Schwelle des Tempounterschieds in %"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 2
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 2
    blickfolge: 0
    sakkaden: 1
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 2
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 3
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 2
    inhibition: 1
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 0
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 1
    zielbewegung_tempo: 1
    zielbewegung_praezision: 0
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 0
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
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm mit ausreichender Helligkeit, möglichst ohne Spiegelungen (die Felder sind dunkel und kontrastarm)", "Maus, Trackpad oder Touch; kein Farbsehen nötig", "Original: Instruktionen auf Deutsch, Übung selbst sprachfrei"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, sehbehinderung_niedriger_visus, trockenes_auge_bildschirm, kopfschmerz_asthenopie, presbyopie_gleitsicht, aufmerksamkeitsprobleme]
geeignet_fuer: ["Aufmerksamkeit auf zeitliche Unterschiede (Tempo, Takt) richten üben", "ruhiges Vergleichen vieler Felder nebeneinander (weiches Schauen über eine Fläche)", "Abwechslung zu räumlichen Suchaufgaben, mit sauber messbarer Kennzahl (Tempo-Schwelle in %)"]
weniger_geeignet_fuer: ["Menschen mit Lichtempfindlichkeit oder Anfallsneigung durch Lichtreize", "Ziel „Flimmerfusion / CFF“ messen oder trainieren (das leistet die Übung nicht)", "Ziel „schneller sehen“, Blickfolge oder Blicksprünge (Blickführung wird nicht verlangt)", "Menschen mit deutlich herabgesetztem Kontrastsehen (dunkle, schwache Reize)"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: fehlend
  alltag_transfer: fehlend
  kommentar: "Die Grundlagen der Frequenzunterscheidung sind gut belegt, direkte Trainingsstudien mit langsamen Pulsen bei Gesunden fehlen (Recherche docs/wissenschaft/03); verwandte Lernstudien betreffen andere Aufgaben (Seitz 2006, Xiong 2022) und zeigen bei Normalsichtigen teils keinen Effekt (Eisen-Enosh 2023)."
aehnliche_uebungen: [103, 108, 204, 208, 401]
stichworte: ["zeitliche Frequenzunterscheidung", "Flimmern", "Pulsrhythmus", "visuelle Suche in der Zeit", "Photosensitivität", "Weber-Anteil", "Odd-one-out", "weiches Schauen"]
---

# 109 · Aus dem Takt (Feld mit anderem Puls-Tempo finden)

> Original: „Flimmerfusion-Test“ (Rhythm Anomaly Pro) – skilldrills.online, Kapitel Visuelle Wahrnehmung · Blickfit: „Aus dem Takt“ (umgesetzt, mit deutlichen Änderungen)

## 1. Kurzbeschreibung
Auf dunklem Grund pulsieren 36 quadratische Felder (6 x 6) langsam, etwa ein- bis zweimal pro Sekunde. Eines davon pulsiert schneller als die übrigen. Man tippt oder klickt es an. Bei jedem Treffer wird das Grundtempo etwas höher, das Zeitlimit kürzer, und gelegentlich fallen einzelne Felder für einen Moment aus (auf der Website „Störblitze“ genannt). Gefordert ist der Vergleich von Rhythmen über eine größere Fläche, also eine Art „Suchbild in der Zeit“. Trotz des Namens „Flimmerfusion“ wird die Flimmerverschmelzungsfrequenz (CFF, die Frequenz, ab der Flimmern als Dauerlicht erscheint) nicht gemessen: die Pulse sind mit 0,6 bis 2,3 Hz um ein Vielfaches langsamer als die CFF (ca. 50–90 Hz).

## 2. Ablauf im Original (Analyse)
Quellen: Seitentext, ausgeliefertes Spielskript (Chunk 74807, Mechanik und Parameter) und die Code-Analyse in `docs/skilldrills-analyse.md`; Originalcode wird nicht wiedergegeben.
- **Raster (Code):** Canvas, 6 x 6 Felder, das ganze Raster ist quadratisch mit 0,9 x min(Breite, Höhe) der Zeichenfläche als Kantenlänge (ein Feld = 1/6 davon, abzüglich Abstand), Hintergrund fast schwarz (#020202), 2 px Abstand zwischen den Feldern. Auf einem Tablet ergibt das grob 2–3° je Feld und ca. 12–15° für das ganze Raster bei 40 cm (eigene Schätzung, Gerät und Abstand angenommen).
- **Puls (Code):** Helligkeit folgt sin^6(π · t/T) (schmale Spitze, das Feld ist etwa 30 % der Periode deutlich hell, sonst dunkel), berechnet aus `performance.now()`, nicht aus der Bildzahl (Frequenz also bildfrequenzunabhängig). Alle normalen Felder haben dieselbe Phase (pulsieren im Gleichtakt). Normale Felder: Grau 10 bis 26; das Zielfeld: Grau 10 bis 42 – **doppelte Amplitude**, also auch heller.
- **Ziel (Code):** genau ein zufälliges Feld (nie zweimal dasselbe hintereinander). Startwerte: Grundperiode 1600 ms (0,63 Hz), Zielperiode 1100 ms (0,91 Hz; Verhältnis 1,45). Nach jedem Treffer Grundperiode = max(600, 1600 − 40 x Treffer), Zielperiode = max(400, floor(0,72 x Grundperiode)). Nach 25 Treffern ist die Grundperiode auf 600 ms (1,67 Hz) gefallen, das Ziel pulsiert mit 432 ms (2,3 Hz; die 400-ms-Untergrenze wird nie erreicht; eigene Rechnung).
- **Störreize (Code):** alle max(200, 800 − 25 x Treffer) ms werden 3 zufällige Felder für 150 ms auf ein fast unsichtbares Weiß (Alpha 0,04 auf dem schwarzen Grund) gesetzt. Das Feld wird dadurch für 150 ms praktisch dunkel (Aussetzer des Pulses), es blitzt nicht auf – anders als die Website („Entropie-Blitze“, „Luminanzpeaks“) beschreibt (Deutung aus dem Code).
- **Eingabe (Code):** `pointerdown` (Maus, Stift, Touch). Auf dem Raster wird das getroffene Feld berechnet. Mindestabstand zwischen zwei Eingaben 120 ms. Treffer: +10 Punkte, Serie +1, Feld leuchtet 400 ms violett. Falsches Feld: Serie 0, Fehlklick +1, Feld 400 ms rot, roter Bildschirm-Signal und Fehlerton. Weder Punkte- noch Zeitabzug (stimmt mit dem Regeltext überein). Klicks neben das Raster zählen nicht.
- **Zeitlimit (Code):** Ziel wechselt, wenn es länger als max(1800, 6000 − 150 x Treffer) ms unentdeckt bleibt (Serie 0, kein Abzug, gleiches rotes Signal und Fehlerton wie beim Fehlklick, kein Fehlklick-Zähler). Dieser Zweig hängt an einem Schalter „skilldrills_timeout_enabled“, der standardmäßig **an** ist (nur ein gespeicherter Wert im Browser kann ihn ausschalten).
- **Dauer/Level:** 45 s, Level = floor(Treffer/3) + 1, Note aus Punkten (Referenz 200) . Bestwert nur lokal (`rhythmAnomalyBestScore_v8`).
- **Widersprüche Regeltext ↔ Code:** (1) „Tightening Phase Diffs“ / „Delta-T schrumpft“: Der relative Tempounterschied bleibt bei ca. 39 % (0,72), er schrumpft nicht; es wird nur alles schneller. (2) Der Text nennt eine Frequenz-/Phasenunterscheidung, tatsächlich verrät auch die doppelte Helligkeit das Ziel (Helligkeit statt Rhythmus als Hinweis). (3) Zusätzlich sind alle normalen Felder synchron; das Ziel läuft „aus der Phase“ und fällt schon deshalb auf. (4) FAQ nennt die CFF mit 35–60 Hz, der Fließtext mit 50–60 Hz.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Aussagen:** Test der „visuellen Zeitauflösung“ und „Flimmerfusion“; der magnozelluläre (M-)Pfad registriere Phasenverschiebungen „bis 40–50 Hz“, die Anomalie löse eine „vorattentive Entladung in V1“ aus; ein „Rauschen“ aus Entropie-Blitzen trainiere das Herausfiltern; Zielgruppen FPS-Spieler:innen, Pilot:innen, Fahrer:innen; fünf Leistungsstufen („Chrono-Master“ 200+ Punkte, Delta-T < 60 ms, „CFF-Grenzsensitivität“ bis „Phasenfusion“ < 50 Punkte); Weichfokus-Technik.

**Einordnung:**
- **Name falsch:** Die Übung misst keine CFF (50–90 Hz; Mankowska et al., 2021). Die Pulse sind 0,6–2,3 Hz.
- **Zahlen zum M-Pfad:** Dass magnozelluläre Zellen schneller antworten als parvozelluläre, ist belegt (ca. 17 ms Vorsprung im Makaken-Thalamus; Schmolesky et al., 1998). „40–50 Hz“ und „Phasen bis 40–50 Hz“ stehen bei Holcombe (2009) und De Lange (1958) nicht so. Für 1-Hz-Rhythmen ist die Grenze der Zeitauflösung ohnehin irrelevant.
- **„Delta-T“-Stufen und Punktetabelle:** Die Website nennt „empirische Zeitreihenmessungen“ und gibt zugleich an, keine Nutzerdaten zu sammeln. Die Stufen (< 60 ms bis > 180 ms) stimmen nicht mit dem Code überein: die Zeit zwischen Ziel- und Grundpuls ist eine Funktion des Levels, keine gemessene Wahrnehmungsschwelle. **Keine Datengrundlage.**
- **Integrationsfenster 30–100 ms und „stochastisches Rauschfiltern“:** Burr (1980) beschreibt eine zeitliche Summation von ca. 120 ms bei Tageslicht; kein „Rauschfilter-Training“. Posner (1980) und Woods et al. (2015) haben mit Flimmern nichts zu tun.
- **Transfer (Projektile, Straßenverkehr, Sport):** unbelegt. Ob schnelle Wahrnehmung im Verkehr von einer solchen Übung profitiert, wurde nicht untersucht.
- **Sinnvoll:** Der Hinweis, das Raster locker zu überblicken statt Feld für Feld zu prüfen, passt zu Befunden zu Flimmern als Suchmerkmal (Cass et al., 2011).

## 4. Optische und okulomotorische Grundlagen
- **Zeitliche Empfindlichkeit:** Flimmern wird bis etwa 50–90 Hz gesehen (CFF; Mankowska et al., 2021). Die Kontrastempfindlichkeit für Flimmern ist bei mittleren Frequenzen am höchsten (ca. 10 Hz; Spalek et al., 2009). Für den Vergleich langsamer Pulse zählt eher die Unterscheidungsschwelle: Δf/f ≈ 0,08 bei 1,5, 4 und 30 Hz und ≈ 0,50 bei 20 Hz, bei angeglichener Modulationstiefe (Mandler, 1984). Das Original verlangt ca. 39 % Unterschied – weit über der Laborschwelle; die Schwierigkeit liegt im Finden unter 36 Feldern, nicht in der Feinunterscheidung.
- **Phasenvergleich über Distanz:** Aufmerksamkeitsabhängiger Vergleich getrennter Flimmerquellen gelingt nur bis ca. 11,4 Hz bei 4° Abstand und 8,9 Hz bei 14° (Aghdaee & Cavanagh, 2007). Bei 1–2 Hz ist das nicht limitierend.
- **Peripherie:** Die Unterscheidungsschwellen liegen in Fovea und bei 30° Exzentrizität innerhalb eines Faktors 2 (Waugh & Hess, 1994). Das Raster (ca. 12–15°) ist daher auch ohne Blicksprünge einsehbar; die „Weichfokus“-Strategie ist plausibel.
- **Kontrast:** Grau 10 bis 26 (normal) und 10 bis 42 (Ziel) auf fast Schwarz; Leuchtdichteunterschied ΔL ≈ 0,007 bzw. 0,020 (WCAG-Formel, eigene Rechnung, Angabe der Code-Analyse). Auf spiegelnden oder dunkel gestellten Displays, bei Katarakt oder im Alter (foveale Flimmerempfindlichkeit sinkt ab ca. 44 Jahren; Kim & Mayer, 1994) ist das schwer sichtbar. Helle Umgebung, maximale Helligkeit und Blendfreiheit helfen.
- **Alter:** Die CFF nimmt über die Lebensspanne linear ab (Lachenmayr et al., 1994).
- **Sakkaden:** Während Blicksprüngen wird die magnozelluläre Empfindlichkeit für niedrige Ortsfrequenzen kurz unterdrückt (Burr et al., 1994). Bei Pulsen von 0,6–2,3 Hz (Periode > 400 ms) fällt eine solche kurze Unterdrückung kaum ins Gewicht; ein Vorteil des ruhigen Blicks über das ganze Raster ist plausibel, aber nicht belegt (unsicher).
- **Brille/Bildschirm:** Bei Gleitsicht liegt der Bildschirm oft im Nahteil, seitliche Felder werden unscharf; der Kopf wird bewegt statt des Blicks. Für längere Bildschirmarbeit Arbeitsplatzbrille bedenken. Bildschirmarbeit senkt die Lidschlagrate deutlich (im Mittel auf ein Fünftel; die Tränenfilmstabilität blieb in dieser Studie unverändert; Patel et al., 1991). Bewusstes Blinzeln und Pausen sind eine naheliegende Vorsichtsmaßnahme bei trockenen Augen (nicht aus dieser Studie belegt).

## 5. Neurowissenschaftliche Grundlagen
- **Parallele Bahnen:** Magno- und parvozelluläres System liefern früh unterschiedlich schnelle Signale; M-Zellen sind im Thalamus etwa 17 ms früher aktiv (Schmolesky et al., 1998). Ob genau diese Bahn das Erkennen eines 1–2-Hz-Rhythmus trägt, ist nicht gezeigt.
- **Zeitliche Grenzen:** Einfache Merkmale (z. B. Flimmern, Bewegungsrichtung) werden schnell verarbeitet, das Verbinden getrennter Merkmale und der Vergleich verteilter Quellen ist langsam und aufmerksamkeitsabhängig (Holcombe, 2009; Aghdaee & Cavanagh, 2007).
- **Pop-out:** Große relative Frequenzunterschiede (> 5 Hz, z. B. 1,3 gegenüber 12,1 Hz) springen ins Auge; entscheidend ist der relative Unterschied (Cass et al., 2011). Bei den hier verwendeten 1–2 Hz ist von Pop-out nicht sicher auszugehen (unsicher).
- **Aufmerksamkeit:** Suche in einem 36-Felder-Raster beansprucht selektive Aufmerksamkeit (allgemeine Annahme; die beteiligten Hirnnetzwerke wurden für diese Übung nicht untersucht). „Die Übung trainiert V1 oder den M-Pfad“ ist nicht belegt.

## 6. Motorische Grundlagen
- **Aufgabe:** Ein einzelner Tipp oder Klick auf ein großes Ziel (ca. 2–3° je Feld); Fitts'sches Gesetz (Trefferaufwand steigt mit Entfernung und sinkt mit Zielgröße) spielt praktisch keine Rolle. Die Motorik ist kaum leistungsbegrenzend.
- **Entscheidung statt Reaktion:** Antwortzeit ist die Zeit bis zum Finden des Ziels plus Bewegung; sie ist keine Reaktionszeit auf einen Reiz (Startzeitpunkt ist nicht klar definiert, das Ziel läuft von Beginn an).
- **Eingabegerät:** Touch verdeckt kein Zielfeld nach dem Tipp; Fehler durch ungenaues Treffen sind bei ausreichend großen Feldern (Blickfit: mindestens 60 px) selten; die Feldgröße des Originals hängt von der Fenstergröße ab. Unbeabsichtigte Berührungen (Handballen) auf dem Tablet können Fehlklicks erzeugen (Beobachtung, nicht belegt).

## 7. Einflussfaktoren und Messgrenzen
- **Rasteranordnung:** Position des Ziels (Rand/Mitte) beeinflusst die Findezeit; Blickstrategie (starr vs. Feld für Feld) ebenfalls.
- **Helligkeit als Nebenhinweis:** Im Original erlaubt die doppelte Amplitude ein „Heller-Suchen“; die Messgröße ist damit keine reine Frequenzunterscheidung. Der Gleichtakt der Nachbarn verrät ebenfalls (Blickfit vermeidet beides).
- **Display:** Ein 60-Hz-Display kann höchstens 30 Hz darstellen (ein Bild an, eins aus); für 0,6–2,3 Hz ohne Belang. Die Website-Aussage, mit 144 Hz seien „feinste Phasenunterschiede“ besser sichtbar, ist für diese langsamen Pulse ohne Belang (Elze & Tanner, 2012 zu LCD-Eigenschaften). Helligkeit und Kontrast des Displays wirken sich aber stark aus.
- **Score-Größen:** Punkte spiegeln Tempo und Serie wider (nicht Schwelle); kein Perzentil, keine Normwerte. Die Notenskala der Website beruht auf willkürlicher Referenz (200 Punkte).
- **Ermüdung/Übung:** 45 s, zufälliges Ziel – Übungseffekt durch Taktik (Blickstrategie, Suchmuster) wahrscheinlich, Wirkung auf Sehfunktion unbekannt.
- **Zuverlässigkeit:** Ein 45-s-Score ist ein grobes Maß; für die Auswahl von Übungen ausreichend, nicht als Test.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt: schwach.** Es gibt keine Trainingsstudie, die bei Gesunden gezielt das Unterscheiden langsamer Puls- oder Flimmerfrequenzen übt (Recherche docs/wissenschaft/03, Sept. 2026). Man wird in der Aufgabe vermutlich besser, vor allem durch Strategie.
- **Verwandtes:** Ein Lernverfahren für Bewegungsrichtung erhöhte die CFF deutlich und dauerhaft (Laborstudie; Seitz et al., 2006). Ein Flimmertraining verbesserte die CFF im amblyopen Auge um 17 %, bei Normalsichtigen zeigte sich kein Effekt (je 6 Personen; Eisen-Enosh et al., 2023). Das Unterscheiden von Zeitintervallen (nicht von Flimmerfrequenzen) ist lernbar; ein Übertrag zwischen Sehen und Hören zeigte sich nur mit zusätzlicher Übung einer zweiten Aufgabe (Doppeltraining; Xiong et al., 2022).
- **Naher Transfer: fehlend.** Keine Belege, dass sich andere Zeitaufgaben verbessern.
- **Alltagstransfer: fehlend.** Ein Nutzen im Verkehr, Sport oder bei Sehleistung ist nicht belegt; die Website zeigt keine Daten.
- Fazit: Aufmerksamkeitsspiel mit klarer Kennzahl, keine Sehübung mit belegtem Effekt.

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** die Person „Zeit- und Rhythmusgefühl beim Schauen“ oder „genau vergleichen“ üben möchte, eine ruhige Aufgabe ohne Blickführung sucht und Lichtreize gut verträgt (Profil: zeitliche_aufloesung 3, selektive_aufmerksamkeit 2, visuelle_suche 2).
- **Weniger passend, wenn …** Blickfolge/Blicksprünge, feine Sehschärfe, Farbunterscheidung oder Reaktionsgeschwindigkeit geübt werden sollen; oder wenn ein „Flimmertest“ erwartet wird.
- **Vorsicht / anpassen bei …** photosensitive_epilepsie und migraene_lichtempfindlich (großflächiges Pulsieren, Aussetzer/rote Bildschirm-Blitze; im Original nur < 3 Hz und kleiner Leuchtdichtehub, ein Risiko lässt sich trotzdem nicht ausschließen); sehbehinderung_niedriger_visus (dunkle, kontrastarme Reize); presbyopie_gleitsicht (das Raster von ca. 12–15° liegt bei Gleitsicht teils im unscharfen Seitenbereich, Kopf statt Blick bewegen); trockenes_auge_bildschirm und kopfschmerz_asthenopie (Bildschirmnähe, Konzentration); aufmerksamkeitsprobleme (Zeitlimit und Störreize). Auswahlhinweis, keine medizinische Aussage.
- **Kombiniert gut mit …** 103 (Suchbild, räumliche Suche), 108 (Suchraster mit Störreizen), 204 und 208 (Konzentration).
Keine Diagnose, keine Heil- oder Sehversprechen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
**Schwächen des Originals:** Name „Flimmerfusion“ irreführend; Helligkeit und Gleichtakt verraten das Ziel; Tempounterschied ist konstant statt adaptiv; Punkte statt Schwelle; Zeitdruck (Timeout bis 1,8 s); Raster nicht am Sehwinkel ausgerichtet; dunkler, kontrastarmer Grund; roter Vollbild-Blitz bei Fehlklick ist ein Lichtreiz, „Störblitze“ sind eigentlich Aussetzer; Canvas nicht für hochauflösende Displays skaliert; Notenskala und Leistungsstufen ohne Datengrundlage; kein Hinweis auf Photosensitivität.

**Blickfit-Umsetzung „Aus dem Takt“ (Unterschiede):**
- **Fairer Reiz:** alle Felder gleich hell, gleiche Amplitude, zufällige Phase; das Zielfeld ist zufällig schneller oder langsamer. Grundtempo pro Durchgang 1,0–1,8 Hz zufällig, damit kein absoluter Takt gelernt wird (Cass et al., 2011: relative Frequenz).
- **Adaptiv:** 2-richtig-runter/1-falsch-rauf (ca. 71 % richtig), Δ = 40 % / 1,25^(Stufe−1), Stufe 1 bis 11 (40 % bis 4,3 %). Kennzahl: kleinster erkannter Unterschied; realistisch etwa 8–15 % (Laborbestwert Δf/f ≈ 0,08; Mandler, 1984).
- **Mehr Zeit statt Druck:** 12 Durchgänge, Antwort erst nach 2 s Zuschauen, Auflösung nach 9 s, dann mindestens 2 s Standbild; keine Zeitstrafe, Rückmeldung als ruhiger Rahmen.
- **Sicherheit (strenger als WCAG 2.3.1):** höchstens 2,5 Hz, Sinus in linearer Leuchtdichte, Hub Grau 30 bis 60 auf Grau 20, pulsierende Fläche höchstens 22 % der Bühne, kein Rot als Pulsfarbe, keine Störblitze (Fisher et al., 2005).
- **Raster:** 4 x 4, Felder mindestens 60 px (ca. 1,5° bei 40 cm), Lücken mindestens 18 px, Intro-Demo 3 x 3.
- **Zeitbasis:** Helligkeit aus `performance.now()`, nicht aus der Bildzahl.
- **Wirkung auf das Profil:** im Kern unverändert (zeitliche_aufloesung 3); Blickfit ist ruhiger (zeitdruck eher 1, flimmern_lichtreize 2), und die Unterscheidung wird stärker gefordert, weil Helligkeit und Gleichtakt als Hinweise wegfallen.
- **Offene Punkte:** Sehwinkel je Gerät prüfen; Kontrast für Ältere ggf. erhöhen; Hinweis auf Bildschirmpausen; Hinweis „keine Sehübung mit belegtem Effekt“.

## 11. Quellen
### Von der Website angegeben
- Holcombe, A. O. (2009). Seeing slow and seeing fast: Two limits on perception. *Trends in Cognitive Sciences, 13*(5), 216–221. https://doi.org/10.1016/j.tics.2009.02.005 – **Prüfung:** DOI ✓ (Crossref); Website-Titel „…two limits on temporal resolution in vision“ falsch; **stützt die Aussage der Website:** teilweise (zwei Zeitgrenzen ja; „subkortikale Abtastgrenze 40–50 Hz durch M-Zellen“ ist eine Zuspitzung der Website)
- Kelly, D. H. (1961). Visual responses to time-dependent stimuli. I. Amplitude sensitivity measurements. *Journal of the Optical Society of America, 51*(4), 422–429. https://doi.org/10.1364/JOSA.51.000422 – **Prüfung:** DOI ✓ (Crossref, nur Metadaten); **stützt:** teilweise (klassische Flimmer-Empfindlichkeitskurven; „Gipfel 10–20 Hz, Fusion 50–60 Hz“ mit CFF-Literatur vereinbar, am Original nicht geprüft)
- De Lange Dzn, H. (1958). Research into the dynamic nature of the human fovea→cortex systems with intermittent and modulated light. II. Phase shift in brightness and delay in color perception. *Journal of the Optical Society of America, 48*(11), 784–789. https://doi.org/10.1364/JOSA.48.000784 – **Prüfung:** DOI ✓; Website-Titel („…II. Phase shift in clinical applications“) falsch; **stützt:** teilweise (Psychophysik der Flimmer-/Phasenwahrnehmung ja; keine Zellpfade, „M-Pfad bis 40–50 Hz“ nicht von De Lange)
- Burr, D. C. (1980). Motion smear. *Nature, 284*(5752), 164–165. https://doi.org/10.1038/284164a0 – **Prüfung:** DOI ✓; Website-Titel „…Two types of visual suppression“ falsch; **stützt:** teilweise (zeitliche Summation ca. 120 ms bei Tageslicht; nicht „30–100 ms“ und nicht „stochastisches Rauschfiltern“)
- Posner, M. I. (1980). Orienting of attention. *Quarterly Journal of Experimental Psychology, 32*(1), 3–25. https://doi.org/10.1080/00335558008248231 – **Prüfung:** DOI ✓; **stützt:** nein (Aufmerksamkeitsausrichtung, kein Bezug zu Flimmern oder Rhythmus)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI ✓; **stützt:** nein (einfache Reaktionszeit, keine zeitliche Integration)

### Weitere Fachliteratur
- Mankowska, N. D., Marcinkowska, A. B., Waskow, M., Sharma, R. I., Kot, J., & Winklewski, P. J. (2021). Critical flicker fusion frequency: A narrative review. *Medicina, 57*(10), 1096. https://doi.org/10.3390/medicina57101096 – CFF ca. 50–90 Hz; Abgrenzung zur Übung (Crossref ✓)
- Mandler, M. B. (1984). Temporal frequency discrimination above threshold. *Vision Research, 24*(12), 1873–1880. https://doi.org/10.1016/0042-6989(84)90020-8 – Weber-Anteile Δf/f ≈ 0,08 bzw. 0,50 (Crossref ✓)
- Cass, J., Van der Burg, E., & Alais, D. (2011). Finding flicker: Critical differences in temporal frequency capture attention. *Frontiers in Psychology, 2*, 320. https://doi.org/10.3389/fpsyg.2011.00320 – relative Frequenzunterschiede als Suchmerkmal (Crossref ✓)
- Aghdaee, S. M., & Cavanagh, P. (2007). Temporal limits of long-range phase discrimination across the visual field. *Vision Research, 47*(16), 2156–2163. https://doi.org/10.1016/j.visres.2007.04.016 – Phasenvergleich über Distanz, 8,9–11,4 Hz (Crossref ✓)
- Spalek, T. M., Kawahara, J., & Di Lollo, V. (2009). Flicker is a primitive visual attribute in visual search. *Canadian Journal of Experimental Psychology, 63*(4), 319–322. https://doi.org/10.1037/a0015716 – Flimmern als Suchmerkmal (Crossref ✓)
- Waugh, S. J., & Hess, R. F. (1994). Suprathreshold temporal-frequency discrimination in the fovea and the periphery. *Journal of the Optical Society of America A, 11*(4), 1199–1212. https://doi.org/10.1364/JOSAA.11.001199 – Fovea vs. Peripherie (Crossref ✓)
- Schmolesky, M. T., Wang, Y., Hanes, D. P., Thompson, K. G., Leutgeb, S., Schall, J. D., & Leventhal, A. G. (1998). Signal timing across the macaque visual system. *Journal of Neurophysiology, 79*(6), 3272–3278. https://doi.org/10.1152/jn.1998.79.6.3272 – M-Vorsprung ca. 17 ms (Crossref ✓)
- Burr, D. C., Morrone, M. C., & Ross, J. (1994). Selective suppression of the magnocellular visual pathway during saccadic eye movements. *Nature, 371*(6497), 511–513. https://doi.org/10.1038/371511a0 – sakkadische Unterdrückung (Crossref ✓)
- Kim, C. B., & Mayer, M. J. (1994). Foveal flicker sensitivity in healthy aging eyes. II. Cross-sectional aging trends from 18 through 77 years of age. *Journal of the Optical Society of America A, 11*(7), 1958–1969. https://doi.org/10.1364/JOSAA.11.001958 – Altersgang der Flimmerempfindlichkeit (Crossref ✓)
- Lachenmayr, B. J., Kojetinsky, S., Ostermaier, N., Angstwurm, K., Vivell, P. M., & Schaumberger, M. (1994). The different effects of aging on normal sensitivity in flicker and light-sense perimetry. *Investigative Ophthalmology & Visual Science, 35*(6), 2741–2748. https://pubmed.ncbi.nlm.nih.gov/8188467/ – CFF nimmt mit dem Alter ab (PubMed ✓, keine DOI)
- Seitz, A. R., Nanez, J. E., Sr., Holloway, S. R., & Watanabe, T. (2006). Perceptual learning of motion leads to faster flicker perception. *PLoS ONE, 1*(1), e28. https://doi.org/10.1371/journal.pone.0000028 – Lernen und CFF (Crossref ✓)
- Eisen-Enosh, A., Farah, N., Polat, U., & Mandel, Y. (2023). Perceptual learning based on a temporal stimulus enhances visual function in adult amblyopic subjects. *Scientific Reports, 13*, 7643. https://doi.org/10.1038/s41598-023-34421-3 – Training nur bei Amblyopie wirksam (Crossref ✓)
- Xiong, Y.-Z., Guan, S.-C., & Yu, C. (2022). A supramodal and conceptual representation of subsecond time revealed with perceptual learning of temporal interval discrimination. *Scientific Reports, 12*, 10668. https://doi.org/10.1038/s41598-022-14698-6 – Lernen zeitlicher Intervalle, Übertrag Sehen–Hören nur mit Doppeltraining (Crossref ✓, Abstract geprüft)
- Elze, T., & Tanner, T. G. (2012). Temporal properties of liquid crystal displays: Implications for vision science experiments. *PLoS ONE, 7*(9), e44048. https://doi.org/10.1371/journal.pone.0044048 – Display-Zeitverhalten (Crossref ✓)
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Photosensitivität, kritisch 15–25 Hz (Crossref ✓)
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlagrate am Bildschirm (Crossref ✓)
