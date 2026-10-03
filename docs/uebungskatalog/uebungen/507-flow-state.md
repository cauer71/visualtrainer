---
# ===== Kennung =====
nr: 507
kennung: flow-state
name: "Kurvenbahn folgen – einem Ziel auf weichen Kurvenbahnen mit dem Finger folgen"
name_original: "Flow State Aim Trainer (Seitentitel: FPS Fokus Training | Flow Aim Trainer)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/flow-state"
blickfit_umsetzung: {kennung: "kurvenbahn-folgen", name: "Kurvenbahn folgen", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/kurvenbahn-folgen/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein Ziel läuft ohne Halt und ohne Knick auf einer weichen, geschlossenen Kurve kreuz und quer über den Bildschirm; die Marke sitzt über dem Finger und soll im Ring um das Ziel bleiben. Ein Stück der Bahn voraus ist gestrichelt zu sehen, sodass sich die Bewegung vorausplanen lässt. Mit steigender Stufe werden das Tempo höher, die Bahn verschlungener und der Ring enger. Ausgewertet werden die Zeit im Ring und der mittlere Abstand zum Ziel."
ziel_funktionen: [kontinuierliche_steuerung, auge_hand_koordination, blickfolge]
eingabe: [maus]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code Level = Punkte/1.400 + 1 (steigt nur, fällt nie). Mit dem Level laufen Zielradius 32 → 13 px (min. 10), Dauer je Bahnstück 2,5 → 1 s (min. 0,6 s) und Krümmung 0,2 → 0,8 exponentiell auf Grenzwerte zu. Zusätzlich hängt die Schwierigkeit vom Combo-Faktor ab (bei Faktor 3: Radius −18 %, Dauer −25 %, Krümmung +35 %) und fällt bei einem Fokus-Abbruch wieder zurück. Selbst fehlerfreies Folgen erreicht nur Level ≈ 6. Uhr: +0,1 s je 0,25 s auf dem Ziel, also 45 s nominal, real bis ≈ 75 s."
messgroessen: ["Punkte und Note (Wurzel aus Punkte/54.000; auch fehlerfrei nur ≈ 35 % = „D“)", "Tracking-Präzision = Anteil der Bilder mit Fadenkreuzmitte im Zielkreis (%)", "höchste Combo (volle Sekunden ununterbrochen auf dem Ziel, Abbruch erst nach 1 s daneben)", "Fokus-Abbrüche (Anzahl der Phasen ≥ 1 s neben dem Ziel), erreichtes Level", "sinnvoll ergänzend: mittlerer Abstand zur Zielmitte, Wiedereinfangzeit nach Bahnknicken, zeitgewichtete Quote, Verlauf über die Sitzung (Ermüdung)"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 1
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 3
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 0
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 2
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 3
    zielbewegung_tempo: 1
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 3
    ruhige_hand: 1
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
voraussetzungen: ["Computer mit Maus und Pointer Lock (reine Touch-Geräte werden erkannt und nicht unterstützt)", "freie Mausfläche, entspannte Unterarm-/Handgelenkhaltung", "scharfes Sehen im Bildschirmabstand (≈ 50–75 cm) über die ganze Bildfläche, auch oben und unten", "Oberfläche englisch, Spiel ohne Lesen bedienbar; kein Farbsehen nötig (Grün/Rot nur als Zusatzrückmeldung)"]
vorsicht_bei: [hand_arm_beschwerden, tremor_parkinson, nystagmus, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, photosensitive_epilepsie, migraene_lichtempfindlich, farbsehschwaeche, aufmerksamkeitsprobleme]
geeignet_fuer: ["fortlaufendes Nachführen eines zweidimensional bewegten Ziels mit dem Finger üben (Auge-Hand-Abstimmung)", "Blickfolge auf weichen, verschlungenen Bahnen", "Vorausschätzen der Bewegung: rein reaktives Nachlaufen reicht bei diesem Ring nicht", "kurzes Aufwärmen bzw. Selbstvergleich auf demselben Gerät"]
weniger_geeignet_fuer: ["Menschen mit Zittern oder Hand-/Handgelenkbeschwerden", "Menschen mit Nystagmus (die Aufgabe verlangt eine gleichmäßige Folgebewegung)", "gezieltes Konzentrations-, Achtsamkeits- oder „Flow“-Training (Wirkung nicht belegt)", "Wunsch nach Norm-, Noten- oder Leistungsvergleichen", "Erwartung eines Seh- oder Alltagsnutzens"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Das Nachführen mit Auge und Hand und die Leistung in Zielaufgaben am Bildschirm verbessern sich mit Übung (Gauthier et al., 1988; Listman et al., 2021); zu dieser Übung gibt es keine Studie. Actionspiele (nicht einzelne Übungen) verbesserten eine Labor-Nachführaufgabe (Li et al., 2016). Ein Transfer auf Konzentration, „Flow“ oder Arbeit ist nicht belegt (Sala et al., 2018; Simons et al., 2016)."
aehnliche_uebungen: [505, 514, 512, 513, 515, 504, 304, 105, 104, 402, 403, 410, 415, 707, 208]
stichworte: ["Flow", "Flow State", "Fokus-Training", "Tracking Aim", "Bézier-Kurve", "manuelles Nachführen", "Time on Target", "Smooth Pursuit", "Aufholsakkade", "Auge-Hand-Koordination", "Daueraufmerksamkeit", "Combo-Multiplikator", "Aim Trainer", "Maus", "Pointer Lock"]
---

# 507 · Flow-Tracking – einem Punkt auf Kurvenbahnen ohne Unterbrechung folgen

> Original: „Flow State Aim Trainer“ (Seitentitel „FPS Fokus Training | Flow Aim Trainer“) – skilldrills.online,
> Kapitel Zielen (`fps`) · Blickfit: noch nicht umgesetzt (verwandt: `scharf-in-bewegung`, `zielfang`)

## 1. Kurzbeschreibung

Ein Ziel läuft ohne Halt und ohne Knick auf einer weichen, geschlossenen Kurve (Lissajous-Figur) kreuz und quer über den Bildschirm und startet sanft aus dem Stand. Man legt den Finger auf; die Marke sitzt etwa 6 Einheiten (6 % der kürzeren Bildschirmseite) über der Fingerspitze, damit die Hand nichts verdeckt, und soll im Ring um das Ziel bleiben. Ein kurzes Stück der Bahn voraus ist als gestrichelte Linie zu sehen, damit man die Bewegung vorausplanen kann. Eine Sitzung hat fünf Durchgänge von je 11 s Fingerkontakt (davor eine kurze Einlaufzeit ohne Wertung); Abheben pausiert die Bahn. Ein Durchgang gilt als gelungen, wenn die Marke mindestens 60 % der Zeit im Ring liegt; zwei gelungene Durchgänge in Folge steigern die Stufe, ein misslungener senkt sie. Mit der Stufe wachsen das Tempo (von 6 auf rund 19 Einheiten pro Sekunde) und die Verschlungenheit der Bahn, der Ring wird enger und die Vorschau kürzer. Ausgewertet werden die Zeit im Ring und der mittlere Abstand zum Ziel (in Prozent des Ringradius).

## 2. Ablauf im Original (Analyse)
Grundlage: Seitentext und ausgelieferter Spiel-Chunk (`40856-…js`, formatiert; gelesen am 29.09.2026, nur Mechanik und Parameter übernommen). **[CODE]** = aus dem Code, **[ER]** = eigene Rechnung/Simulation. Winkel gelten für einen 24″-Full-HD-Monitor im Vollbild in 60 cm Abstand (≈ 38 px/°). Im kleineren 16:9-Container sind Bahnen und Tempo proportional kleiner.

- **Rahmen [CODE]:** Start-Karte → Countdown 3-2-1-GO (Start nach 2,45 s) → Pointer Lock → Spiel → Ergebnis. Wer ESC drückt, Vollbild oder Pointer Lock verlässt, bricht ab. Das Fadenkreuz (Ring Ø 28 px ≈ 0,74°, vier Striche, Mittelpunkt Ø 4 px) folgt `movementX/Y` × Empfindlichkeit (gemeinsame Einstellung). `requestPointerLock()` wird **ohne** `unadjustedMovement` aufgerufen, die Mausbeschleunigung des Betriebssystems bleibt also wirksam. Geräte mit Touch, aber ohne feinen Zeiger (`pointer: fine`) werden als „nur Touch“ abgewiesen.
- **Bahn [CODE]:** Jedes Bahnstück ist eine **quadratische** Bézier-Kurve (nicht kubisch) vom letzten Endpunkt zu einem zufälligen neuen Punkt (80 px Randabstand). Der Kontrollpunkt liegt seitlich der Verbindungslinie, versetzt um Abstand × Krümmung. Der Kurvenparameter läuft linear mit der Zeit, das Tempo ergibt sich also aus Länge ÷ Dauer. Level 1: Dauer 2,5 s, Krümmung 0,2 (fast gerade). Bahnstücke sind im Mittel ≈ 740 px lang, das ergibt ≈ 296 px/s ≈ **7,8°/s** (90 % der Stücke < 13,6°/s). Bei Level 6 sind es ≈ 9,7°/s, bei vollem Combo-Faktor ≈ 13,3°/s [ER, Simulation mit 3.000 Bahnstücken].
- **Bahnknicke [ER]:** Am Übergang zweier Bahnstücke ist nur die Position stetig, **Richtung und Tempo springen**. Die Richtung ändert sich im Median um ≈ 120–126°, in ≈ 70 % der Übergänge um mehr als 90°. Das Tempo springt im Median um den Faktor ≈ 1,7. Alle 1–2,5 s kommt also ein unvorhersehbarer Knick, keine „fließende“ Kurve.
- **Treffer [CODE]:** „Auf dem Ziel“, wenn der Fadenkreuz-**Mittelpunkt** höchstens einen Zielradius von der Punktmitte entfernt ist. Level 1: Radius 32 px (≈ 0,84°, Ø 1,7°). Der Fadenkreuzring (Ø 28 px) ist deutlich kleiner als das Ziel (Ø 64 px auf Level 1, ≈ 44 px bei vollem Combo-Faktor) [CODE]; entscheidend ist nur der Mittelpunkt.
- **Punkte und Combo [CODE]:** Je 0,25 s ununterbrochen auf dem Ziel gibt es round(10 × Combo-Faktor × (1 + 0,5 × (Level − 1)/14)) Punkte und +0,1 s Spielzeit (Restzeit max. 60 s). Die Combo steigt um 1 je volle Sekunde ununterbrochen auf dem Ziel. Der Faktor beträgt 1,1 ab Combo 3, 1,25 ab 5 … 2,5 ab 30 und 3,0 ab 50. Kurzes Abrutschen setzt nur die laufenden 1-s- und 0,25-s-Zähler zurück.
- **Fokus-Abbruch [CODE]:** Nach 1 s ununterbrochen neben dem Ziel fällt die Combo auf 0 (einmal je Abbruch). Dazu kommen Fehlerton, rote Partikel, Bildwackeln (6 px, klingt ab) und ein roter Vollbildblitz (0,48 s; Einstellung „Miss Flash“, Standard **an**). Die Zeitstrafe −0,6 s greift nur mit der Einstellung „Strafen“ (Standard **aus**).
- **Zeit und Messung [CODE]:** Bahn und Uhr laufen mit echter Bildzeit (dt, gekappt bei 100 ms), also bei 60 und 144 Hz gleich schnell. Nur Partikel laufen pro Bild. „Tracking-Präzision“ = Bilder auf dem Ziel ÷ alle Bilder (nicht zeitgewichtet). Note = √(Punkte/54.000), „S+“ ab 95 % ≈ 48.700 Punkte. Bestwerte nur im Browser (`localStorage`).
- **Eigene Simulation [ER]** (60 Hz, Vollbild): Fehlerfreies Folgen ergibt ≈ 72–75 s, ≈ 6.600 Punkte, Level ≈ 5,7 und Note ≈ 35 % („D – Keep Going“). Die Notenskala stammt offenbar aus den Nachbar-Drills mit 50 statt 10 Punkten je Takt (vgl. 505, 514) und ist hier **nicht erreichbar**. Ein rein reaktiver Nachläufer mit 150 ms Verzögerung liegt nur 22–35 % der Bilder im Ziel (Verzögerung × Tempo ≈ 1,2° > Radius 0,84°). Mit gleicher Verzögerung plus linearer Vorausschätzung sind es ≈ 95 %.
- **Widersprüche Regeltext ↔ Code:** „+10 PTS (+0,4 s/s)“, „bis 3,0×“, „+1 Level/1.400 PTS“ und „1,0 s Zielverlust → Multiplikator-Reset“ stimmen. „−0,6 s“ gilt nur mit eingeschalteter Strafe. „Endlose Levelprogression“ und „Kurven schärfen sich kontinuierlich“: praktisch ist bei Level ≈ 6 Schluss (Krümmung 0,2 → ≈ 0,36). „Organisch fließende Bézier-Kurven“: stückweise Kurven mit Knicken. „Schwierigkeit nahe am eigenen Können“: das Level steigt nur; nur der Combo-Anteil passt sich in beide Richtungen an. „Tempo reduzieren, bis 20-s-Serien stabil sind“: eine Tempoeinstellung gibt es nicht. „Mauszeigersperre ohne Beschleunigung“: laut Code falsch.

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite verspricht Training von „Smooth Pursuit, anhaltender visueller Aufmerksamkeit, Feinmotorik und langfristiger Fokus-Ausdauer“, für FPS-Spielende (CS2, Valorant, Apex, Overwatch 2) und „Wissensarbeiter“. Erklärt wird Flow mit Dietrichs Hypothese der **transienten Hypofrontalität** (2004): Der dorsolaterale präfrontale Kortex (DLPFC) werde heruntergeregelt, Basalganglien und Kleinhirn übernähmen. Eine Tabelle „Flow-Induktionsstufen“ reicht von „foveale Zielerfassung < 200 ms“ bis „Stufe 4: DLPFC-Herunterregulierung, > 30 s Flow-Serie“ und „Stufe 5: 60+ s bei maximalem Multiplikator“. Tipps: Blick 2–3° vorausführen („reduziert Augenermüdung“), Präzision auf 70–80 % einstellen („von Csikszentmihalyi definierter Idealbereich“), ruhig atmen, Griff lockern. FAQ: Dopamin, „Neurotransmitter-Erschöpfung im fronto-parietalen Netzwerk“, Nutzen für Deep Work und Programmieren. Positiv: Der Text sagt selbst, der Drill „verspricht keinen erzwungenen Flow“, und er erklärt Bildintervalle und Timer-Rundung korrekt.

**Einordnung** (Prüfung aus der Literaturbasis der Gruppe übernommen und für diesen Drill ergänzt):
- **Hypofrontalität ist eine Hypothese, kein Befund.** Dietrich (2004) ist ein theoretischer Aufsatz ohne eigene Daten; die Bildgebung ist uneinheitlich (Harris et al., 2017). Bei einer adaptiven Rechenaufgabe fand sich unter Flow **mehr** Aktivität im linken inferioren Frontalgyrus und im Putamen, weniger im medialen präfrontalen Kortex und in der Amygdala (Ulrich et al., 2014). Beim Tetris-Spielen (n = 77) hing Flow nicht mit der präfrontalen Sauerstoffversorgung zusammen – „keine Unterstützung“ für Hypofrontalität (Harmat et al., 2015). Die „Stufe 4 > 30 s DLPFC-Herunterregulierung“ ist nicht gemessen, das Spiel misst nur Mausposition.
- **Anforderung–Können-Passung:** Dass passende Schwierigkeit Flow begünstigt, ist experimentell gezeigt (Keller & Bless, 2008); der Zusammenhang ist aber nur moderat (Metaanalyse, 28 Studien; Fong et al., 2015, Zeitschriftenband 2015, online 2014). „70–80 % Präzision“ und „5–10 % über dem Können“ stehen nicht bei Csikszentmihalyi. Eine verwandte Zahl (≈ 85 % richtig) gibt es nur als theoretisches Optimum für Lernen (Wilson et al., 2019). Das Spiel selbst hält die Schwierigkeit nicht nahe am Können (Abschnitt 2).
- **Blickfolge:** Prädiktive Folgebewegungen gibt es (Kowler et al., 2019; Krauzlis, 2004). Der Rat „2–3° vorausschauen“, „kortikostriatale Bahnen eliminieren Korrektursakkaden“ und „weniger Augenermüdung“ sind aber nicht belegt. Beim Nachführen mit der Hand bleibt der Blick nah am Ziel (Abstand ähnlich wie bei reiner Blickfolge), mit höherem Folge-Gain und weniger Aufholsakkaden; ein gezieltes Vorausblicken wurde dort nicht berichtet (Danion & Flanagan, 2018).
- **Aufmerksamkeit/Ermüdung:** Posner & Petersen (1990) beschreiben Aufmerksamkeitsnetzwerke, keine „Neurotransmitter-Erschöpfung“. Mentale Ermüdung wird eher als Kosten-Nutzen-Abwägung beschrieben (Boksem & Tops, 2008), Wachsamkeit als anstrengende Ressourcenbeanspruchung (Warm et al., 2008). Ein stabiler „In-the-zone“-Zustand bei Daueraufmerksamkeit ist messbar (weniger Reaktionszeitschwankung; Esterman et al., 2013) – in einer anderen Aufgabe und ohne Trainingsaussage.
- **Transfer „Deep Work/Programmieren“:** nicht belegt; Ferntransfer von Spiel- und Hirntraining ist klein bis null (Sala et al., 2018; Simons et al., 2016). Green & Bavelier (2003) steht ohne zugeordnete Aussage im Verzeichnis. Woods et al. (2015) wird für Bézier-Kurven und Zeitmessung zitiert, behandelt aber einfache Tastenreaktion.
- **Ohne Datengrundlage:** die gesamte Stufentabelle, „15-min-Blöcke mit 5-min-Pausen“, die Dopamin-Aussage und die Zeiten „< 200 ms Zielerfassung“ (vom Spiel nicht erfasst).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Ziel, Marke und Ring sind weit größer als die Auflösungsgrenze des Auges; zu beurteilen ist nur, ob die Marke im Ring liegt → `sehschaerfe_detail` 1. Der Kontrast ist hoch → `kontrast` 0. Als Faustwert: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°.
- **Blickfolge:** Bei niedrigen bis mittleren Tempi gelingt die Folgebewegung gut, aber nie perfekt; der Gain bleibt unter 0,95 und sinkt mit dem Tempo (Collewijn & Tamminga, 1984). Folgebewegungen starten etwa 100 ms nach Bewegungsbeginn (Lisberger, 2010). Fällt das Auge zurück, holt es per Aufholsakkade auf (de Brouwer et al., 2002) → `blickfolge` 3, `sakkaden` 2. Führt die Hand mit, sinkt die Verzögerung des Auges (Gauthier et al., 1988); bei glatter, unvorhersagbarer Bahn war der Folge-Gain höher und Aufholsakkaden seltener (Danion & Flanagan, 2018), bei pseudozufälliger Bewegung fanden Koken & Erkelens (1992) dagegen keine glattere Augenbewegung – die Befundlage ist uneinheitlich (gleiche Einordnung wie bei 505).
- **Brille:** Das Ziel läuft über die ganze Fläche, auch in die obere und untere Bildhälfte. Mit Gleitsichtgläsern ist der klare Zwischenbereich bei 60 cm nur 13–18° breit (Han et al., 2003), und der untere Bildrand wird durch einen anderen Glasbereich gesehen als der obere. Die Folge können Unschärfe am Rand und Kopfbewegungen statt Augenbewegungen sein. Abhilfe: Bildschirm- bzw. Arbeitsplatzbrille (im Büro-Feldversuch verglichen; Jaschinski et al., 2015) und ein kleineres Fenster bzw. Gerät. Bei Alterssichtigkeit braucht man für 40 cm rechnerisch 2,5 dpt Akkommodation oder Nahzusatz (Faustregel: Dioptrien = 100 / Abstand in cm).
- **Farbe:** Die Aufgabe verlangt keine Farbunterscheidung.
- **Auge und Alter:** Ältere haben einen geringeren Folge-Gain, besonders bei höherem Tempo (Moschner & Baloh, 1994). Bei dynamischen Bildschirmaufgaben sinkt die Lidschlagrate auf etwa ein Drittel (Cardona et al., 2011) – wichtig bei trockenem Auge, weil die Übung ununterbrochenes Hinsehen verlangt. Stereosehen: 0.

## 5. Neurowissenschaftliche Grundlagen

Bewegungssignale für die Folgebewegung stammen vor allem aus MT/MST. Frontales Augenfeld, Basalganglien, Colliculus superior, Kleinhirn und Hirnstamm bilden ein gemeinsames Netzwerk für Folgebewegung und Sakkaden (Krauzlis, 2004; Lisberger, 2010). Die Hand wird über eigene visuomotorische Wege korrigiert. Für den Zustand, den man „Flow“ nennt, gibt es kein gesichertes neuronales Muster: Hypofrontalität ist umstritten (Harris et al., 2017; Harmat et al., 2015), berichtet wurden Veränderungen in frontalen, striatalen und limbischen Arealen (Ulrich et al., 2014). Bei Daueraufmerksamkeit geht ein stabiler Zustand mit höherer Aktivität des Ruhezustandsnetzwerks (default mode network) einher, ein angestrengter mit dem dorsalen Aufmerksamkeitsnetzwerk (Esterman et al., 2013). Dass die Übung bestimmte Hirnregionen „herunterregelt“ oder Netzwerke „konditioniert“, ist nicht belegt.

## 6. Motorische Grundlagen

- **Aufgabe:** zweidimensionales kontinuierliches Nachführen (manuelles Tracking) mit Finger und Hand; auch die senkrechte Richtung muss genau gehalten werden → `ruhige_hand` 1. Manuelles Tracking verläuft in schubweisen Korrekturen; bei langsamen Zielen starten sie erst ab einem kleinen Fehler (≈ 0,8°), bei schnelleren liegt zwischen ihnen ≈ 170 ms (Miall et al., 1993).
- **Vorhersage statt Reaktion:** Auf der weichen Kurve ändern sich Tempo und Richtung stetig, die Bewegung ist also gut vorhersagbar. Da die Hand auf Positions- bzw. Tempoänderungen erst nach ≈ 110–200 ms reagiert (Brenner & Smeets, 1997; Brenner et al., 1998), gelingt genaues Folgen nur mit Vorausschätzen → `antizipation` 2; die gestrichelte Vorschau unterstützt das. Reaktive Anteile (`einfache_reaktion` 1) braucht man beim Wiedereinfangen nach einem Abweichen (`zielbewegung_tempo`/`_praezision` 1).
- **Belastung:** 30 min wiederholtes Zielen mit der Maus (Anklicken, kein Tracking; N = 20) ermüdete messbar vor allem die Handgelenkstrecker, ohne dass die Leistung sank (Forman et al., 2025). Für das Nachführen mit dem Finger auf dem Tablet ist das nicht untersucht; es ist nur ein Hinweis, bei längeren Sitzungen Pausen einzulegen.

## 7. Einflussfaktoren und Messgrenzen

- **Latenz:** Lokale Systemlatenz verkürzte die Zeit auf dem Ziel in einer Tracking-Aufgabe gegenüber der Grundbedingung um 5,8 % (41 ms) bis 32,7 % (164 ms); reale Systeme lagen bei 23–243 ms (Ivkovic et al., 2015; Prozentwerte aus Ivkovic, 2017, Tab. 5.5). Die Verzögerung des Touchscreens kommt in jeder Messung dazu (Deber et al., 2015) → Werte verschiedener Geräte nicht vergleichen.
- **Bildschirmgröße:** Bahnlänge und Tempo skalieren mit der Feldgröße, weil alle Maße in Einheiten der kürzeren Bildschirmseite gerechnet werden; dieselbe Stufe läuft auf einem großen Gerät in Zentimetern schneller als auf einem kleinen.
- **Messgrößen:** Gemessen werden die Zeit im Ring (Prozent der Wertungszeit) und der mittlere Abstand zum Ziel (Prozent des Ringradius); beides nur bei Fingerkontakt. Einzelne Durchgänge streuen, wie jede Messung am Menschen; aussagekräftiger ist der Verlauf über mehrere Durchgänge und Tage (vgl. Mountford et al., 2004, zu Mehrfachmessung). „Flow“, Konzentration oder Ermüdung werden nicht gemessen.
- **Zuverlässigkeit:** Die Reproduzierbarkeit dieser Übung ist nicht untersucht. Ein Teil früher Verbesserungen ist Gewöhnung an Gerät und Aufgabe (Guo et al., 2025).
- **Zustand:** Müdigkeit und Schlafmangel verschlechtern vor allem einfache Aufmerksamkeit (Lim & Dinges, 2010). Touch-Bedienung verkleinert den Altersnachteil gegenüber der Maus (Findlater et al., 2013).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Das Nachführen mit Auge und Hand verbessert sich mit Übung (Gauthier et al., 1988). In Daten einer Online-Zielaufgabe (N = 7.174, Anklicken, kein Tracking) stieg vor allem die Trefferrate pro Sekunde über Tage und Wochen (Listman et al., 2021; Beobachtungsdaten, vom Anbieter finanziert). Zu dieser Übung gibt es keine Studie; ein Teil des Zuwachses ist Gewöhnung an Gerät und Aufgabe (Guo et al., 2025).
- **Naher Transfer – schwach:** 5–10 h Actionspiel verbesserten bei Nicht-Spielenden eine Labor-Nachführaufgabe (Li et al., 2016) – ganze Spiele, keine einminütige Übung. Für „Konzentration“ oder „Flow-Fähigkeit“ als naher Transfer gibt es keine Daten.
- **Alltagstransfer – fehlend:** kein Beleg für Nutzen in Spiel, Beruf, Studium, Sport oder Verkehr. Metaanalysen zu Actionspielen betreffen kognitive Maße und schließen motorische mangels Daten aus (Bediou et al., 2023). Spiel- und Hirntraining verbessern vor allem die geübte Aufgabe (Sala et al., 2018; Simons et al., 2016).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand zweidimensionales Nachführen üben will, mit Blickfolge, Vorausschätzen und Wiedereinfangen, ohne Lesen oder Gedächtnis; kurzer Rahmen von etwa zwei Minuten.
- **Weniger passend, wenn …** eine besonders ruhige Blickfolge auf einfacher Bahn gewünscht ist (404, 105, 402, 403); Konzentration oder Entspannung „trainiert“ werden soll (dafür keine Wirkungsbelege); vergleichbare Messwerte oder Noten gebraucht werden.
- **Vorsicht / anpassen bei …**
  - `hand_arm_beschwerden`, `tremor_parkinson`: pausenloses Nachführen in beiden Achsen; bei Zittern oder Beschwerden lieber pausieren; Runden kurz halten.
  - `nystagmus`: die Aufgabe verlangt genau die glatte Folgebewegung → eher nicht wählen.
  - `presbyopie_gleitsicht`: Das Ziel läuft über die ganze Fläche → Bildschirmbrille, kleineres Fenster.
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Die Übung arbeitet ohne Blitze und mit weichen Übergängen; bei bekannter Lichtempfindlichkeit dennoch Vorsicht (Fisher et al., 2005).
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: etwa eine Minute ununterbrochenes Hinsehen, wenig Lidschlag (Cardona et al., 2011) → bewusst blinzeln, Pausen zwischen den Runden. Doppelbilder, plötzliche Sehverschlechterung, Kopfschmerz mit Sehverschlechterung oder Schwindel sind ein Anlass für ärztliche Abklärung und kein Übungsthema (Muchnick, 2008, S. 6, 28).
  - `aufmerksamkeitsprobleme`: Der Begriff „Flow“ legt eine Konzentrationsförderung nahe, die nicht belegt ist → nicht als Konzentrationstraining empfehlen.
- **Kombiniert gut mit …** 514 (glatte Lissajous-Bahn), 505/512/513 (waagrechte Umkehr-/Zickzack-Aufgaben), 515 (senkrecht), 105/404 (Blickfolge ohne Gerät), 410/415 (reaktive Blickfolge), 707 (Pfad nachfahren), 208 (Daueraufmerksamkeit ohne Motorik).
- **Verwandte Übung: 505.** Gleiches Grundgerüst (klickfreies Nachführen); der Unterschied liegt in der Bahn: hier eine zweidimensionale Kurve (Vorausschätzen nötig, auch die Senkrechte zählt), dort nur waagrechte Zufallsumkehr (Reaktion auf die Umkehr). Für dasselbe Übungsziel genügt eine der beiden. 504 fügt dem Nachführen eine vorhersagbare Störung hinzu.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Tablet:** Original nicht bedienbar (Pointer Lock, Touch abgewiesen). Eine Touch-Fassung als Finger-Nachführaufgabe ist möglich. Sie braucht: Größen in mm/Grad, Ziel ≥ 9 mm und nicht vom Finger verdeckt (Ring um die Berührung), Touch-Latenz von 50–200 ms einplanen (Deber et al., 2015), langsameres Tempo. Alternativ als reine Blickfolge wie `scharf-in-bewegung`.
- **Bahn:** wirklich glatt (Übergänge mit gleicher Richtung und gleichem Tempo, z. B. kubische Segmente mit stetiger Tangente) oder Knicke bewusst als eigene, angekündigte Stufe. Tempo in °/s, unabhängig von der Fenstergröße.
- **Schwierigkeit:** echte Anpassung in beide Richtungen (z. B. Staircase auf ≈ 75–85 % Zeit im Ziel, wie `zielfang`) statt Level, das nur steigt. Die Notenskala korrigieren oder weglassen.
- **Messung:** mittlerer Abstand zur Zielmitte, zeitgewichtete Quote, Wiedereinfangzeit je Knick, Verlauf über die Sitzung; feste Dauer ohne Zeitbonus.
- **Regeltext:** keine Hypofrontalitäts-, Dopamin- oder Transferversprechen, keine Stufentabelle; Strafe, Blitz und Mausbeschleunigung korrekt beschreiben.
- **Sicherheit/Barrierefreiheit:** Rückmeldung zusätzlich über Form statt nur Rot/Grün; Vollbildblitz standardmäßig aus; Blinzel-/Pausenhinweis; Hinweis auf Bildschirmbrille für Gleitsichtträger:innen.

## 11. Quellen
### Von der Website angegeben
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** kaum – Studie zur einfachen Tastenreaktion; sie beschreibt zwar Hardware-Verzögerungen (u. a. ≈ 11 ms Monitorverzögerung bei 60 Hz, Mausverzögerung; Volltext geprüft) und stützt damit allgemein „auf derselben Hardware vergleichen“, aber nicht `performance.now()`, Bézier-Kurven oder die Bildintervalle für 144/240 Hz (diese sind richtige Arithmetik, stehen aber nicht in Woods).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise – Netzwerk der Folgebewegung ja; „kortikostriatale Bahnen eliminieren Korrektursakkaden“, „2–3° vorausschauen reduziert Ermüdung“ nein.
- Posner, M. I., & Petersen, S. E. (1990). The attention system of the human brain. *Annual Review of Neuroscience, 13*, 25–42. https://doi.org/10.1146/annurev.ne.13.030190.000325 – **Prüfung:** DOI stimmt ✓; **stützt:** nein – beschreibt Aufmerksamkeitsnetzwerke, nicht „Neurotransmitter-Erschöpfung“ oder „Ausblenden der Umgebung in Stufe 1“.
- Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. *Nature, 423*(6939), 534–537. https://doi.org/10.1038/nature01647 – **Prüfung:** DOI stimmt ✓; **stützt:** keine zugeordnete Aussage (Flanker, Enumeration, UFOV, Attentional Blink; kein Tracking, kein Flow).
- Dietrich, A. (2004). Neurocognitive mechanisms underlying the experience of flow. *Consciousness and Cognition, 13*(4), 746–761. https://doi.org/10.1016/j.concog.2004.07.002 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise – die Hypothese ist korrekt wiedergegeben (Basalganglien; Kleinhirn nicht im Abstract), aber es ist eine Theorie ohne Daten; spätere Studien stützen sie nicht einheitlich (Harris et al., 2017; Harmat et al., 2015).
- Nur im Text genannt: Csikszentmihalyi, M. (1975). *Beyond boredom and anxiety*. Jossey-Bass (ISBN 0-87589-261-2) und Csikszentmihalyi, M. (1990). *Flow: The psychology of optimal experience*. Harper & Row (ISBN 0-06-016253-8) – **Prüfung:** Bücher, keine DOI; bibliografisch über OpenLibrary verifiziert, Inhalt nicht eingesehen; **stützt:** teilweise – Anforderung–Können-Gleichgewicht ja; eine Zielquote „70–80 %“ ist dort nicht als Idealbereich definiert.

### Weitere Fachliteratur
- Bediou, B., Rodgers, M. A., Tipton, E., Mayer, R. E., Green, C. S., & Bavelier, D. (2023). Effects of action video game play on cognitive skills: A meta-analysis. *Technology, Mind, and Behavior, 4*(1), 28–48. https://doi.org/10.1037/tmb0000102 – Transfer; motorische Maße ausgeschlossen.
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Farbsehschwäche.
- Boksem, M. A. S., & Tops, M. (2008). Mental fatigue: Costs and benefits. *Brain Research Reviews, 59*(1), 125–139. https://doi.org/10.1016/j.brainresrev.2008.07.001 – Ermüdung als Kosten-Nutzen-Abwägung (PubMed-Abstract geprüft).
- Brenner, E., & Smeets, J. B. J. (1997). Fast responses of the human hand to changes in target position. *Journal of Motor Behavior, 29*(4), 297–310. https://doi.org/10.1080/00222899709600017 – Handkorrektur ≈ 110 ms.
- Brenner, E., Smeets, J. B. J., & de Lussanet, M. H. E. (1998). Hitting moving targets: Continuous control of the acceleration of the hand on the basis of the target's velocity. *Experimental Brain Research, 122*(4), 467–474. https://doi.org/10.1007/s002210050535 – Reaktion auf Tempoänderung ≈ 200 ms.
- Cardona, G., García, C., Serés, C., Vilaseca, M., & Gispets, J. (2011). Blink rate, blink amplitude, and tear film integrity during dynamic visual display terminal tasks. *Current Eye Research, 36*(3), 190–197. https://doi.org/10.3109/02713683.2010.544442 – Lidschlag bei Bildschirmaufgaben.
- Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction, 23*(3), 215–250. https://doi.org/10.1080/07370020802278163 – Übersetzungsfaktor und Mausbeschleunigung (nur Metadaten/Kurzfassung geprüft).
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Folge-Gain.
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports, 8*, 10059. https://doi.org/10.1038/s41598-018-28434-6 – Blick beim Hand-Tracking.
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Aufholsakkaden.
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. In *Proceedings of CHI '15* (S. 1827–1836). ACM. https://doi.org/10.1145/2702123.2702300 – Touch-Latenz.
- Esterman, M., Noonan, S. K., Rosenberg, M., & DeGutis, J. (2013). In the zone or zoning out? Tracking behavioral and neural fluctuations during sustained attention. *Cerebral Cortex, 23*(11), 2712–2723. https://doi.org/10.1093/cercor/bhs261 – „In-the-zone“-Zustand bei Daueraufmerksamkeit (PubMed-Abstract geprüft).
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of CHI '13* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Touch vs. Maus im Alter.
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Photosensitivität.
- Fong, C. J., Zaleski, D. J., & Leach, J. K. (2015). The challenge–skill balance and antecedents of flow: A meta-analytic investigation. *The Journal of Positive Psychology, 10*(5), 425–446. https://doi.org/10.1080/17439760.2014.967799 – Anforderung–Können und Flow, moderat.
- Forman, G. N., Nikitin, S. A., Lang, C. J., Gabriel, D. A., Sonne, M. W., Kociolek, A. M., & Holmes, M. W. R. (2025). Impact of repetitive mouse aiming on muscle fatigue and fine motor performance of the distal upper limb. *Journal of Electromyography and Kinesiology, 82*, 102992. https://doi.org/10.1016/j.jelekin.2025.102992 – Handgelenkstrecker-Ermüdung beim Maus-Zielen, N = 20, Klick-Aufgabe (PubMed-Abstract geprüft).
- Gauthier, G. M., Vercher, J.-L., Mussa Ivaldi, F., & Marchetti, E. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. *Experimental Brain Research, 73*(1), 127–137. https://doi.org/10.1007/BF00279667 – Auge-Hand-Tracking, Lernen.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – gerätegebundene Lerneffekte.
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht-Zwischenbereich.
- Harmat, L., de Manzano, Ö., Theorell, T., Högman, L., Fischer, H., & Ullén, F. (2015). Physiological correlates of the flow experience during computer game playing. *International Journal of Psychophysiology, 97*(1), 1–7. https://doi.org/10.1016/j.ijpsycho.2015.05.001 – Tetris, n = 77, keine Stütze für Hypofrontalität (PubMed-Abstract geprüft).
- Harris, D. J., Vine, S. J., & Wilson, M. R. (2017). Neurocognitive mechanisms of the flow state. *Progress in Brain Research, 234*, 221–243. https://doi.org/10.1016/bs.pbr.2017.06.012 – uneinheitliche Bildgebung.
- Ivkovic, Z., Stavness, I., Gutwin, C., & Sutcliffe, S. (2015). Quantifying and mitigating the negative effects of local latencies on aiming in 3D shooter games. In *Proceedings of CHI '15* (S. 135–144). ACM. https://doi.org/10.1145/2702123.2702432 – Latenz und Tracking (Prozentwerte aus Ivkovic, Z. (2017). *Characterizing the effects of local latency on aim performance in first person shooters* [Masterarbeit, University of Saskatchewan], https://harvest.usask.ca/bitstream/10388/7707/1/IVKOVIC-THESIS-2017.pdf, keine DOI; Tab. 5.5, wie bei 505).
- Jaschinski, W., König, M., Mekontso, T. M., Ohlendorf, A., & Welscher, M. (2015). Comparison of progressive addition lenses for general purpose and for computer vision: An office field study. *Clinical and Experimental Optometry, 98*(3), 234–243. https://doi.org/10.1111/cxo.12259 – Bildschirm-Gleitsicht.
- Keller, J., & Bless, H. (2008). Flow and regulatory compatibility: An experimental approach to the flow model of intrinsic motivation. *Personality and Social Psychology Bulletin, 34*(2), 196–209. https://doi.org/10.1177/0146167207310026 – passende Schwierigkeit erzeugt Flow, experimentell (PubMed-Abstract geprüft).
- Koken, P. W., & Erkelens, C. J. (1992). Influences of hand movements on eye movements in tracking tasks in man. *Experimental Brain Research, 88*(3), 657–664. https://doi.org/10.1007/BF00228195 – mit der Hand weniger Sakkaden nur bei vorhersagbarer Sinusbewegung (> ≈ 1 Hz), nicht bei pseudozufälliger Bewegung (Crossref ✓, PubMed-Abstract geprüft).
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 – Vorhersage bei der Folgebewegung.
- Li, L., Chen, R., & Chen, J. (2016). Playing action video games improves visuomotor control. *Psychological Science, 27*(8), 1092–1108. https://doi.org/10.1177/0956797616650300 – Actionspiele und Nachführen.
- Lim, J., & Dinges, D. F. (2010). A meta-analysis of the impact of short-term sleep deprivation on cognitive variables. *Psychological Bulletin, 136*(3), 375–389. https://doi.org/10.1037/a0018883 – Schlafmangel und Aufmerksamkeit.
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – Beginn der Folgebewegung, MT.
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the "wild" with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 – Übungsverlauf, Klick-Zielaufgabe (Anbieterfinanzierung).
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – schubweise Korrekturen, Fehler-Totzone ≈ 0,8° (PubMed-Abstract geprüft).
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Alter und Folge-Gain.
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – kein Ferntransfer.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer allgemein.
- Ulrich, M., Keller, J., Hoenig, K., Waller, C., & Grön, G. (2014). Neural correlates of experimentally induced flow experiences. *NeuroImage, 86*, 194–202. https://doi.org/10.1016/j.neuroimage.2013.08.019 – Flow-Bildgebung.
- Warm, J. S., Parasuraman, R., & Matthews, G. (2008). Vigilance requires hard mental work and is stressful. *Human Factors, 50*(3), 433–441. https://doi.org/10.1518/001872008X312152 – Wachsamkeit als Anstrengung.
- Wilson, R. C., Shenhav, A., Straccia, M., & Cohen, J. D. (2019). The Eighty Five Percent Rule for optimal learning. *Nature Communications, 10*, 4646. https://doi.org/10.1038/s41467-019-12552-4 – optimale Fehlerquote beim Lernen (theoretisch).
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Wiederholbarkeit und Mehrfachmessung (Kap. 2, S. 17–18, 44)
