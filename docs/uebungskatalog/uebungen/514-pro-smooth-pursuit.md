---
# ===== Kennung =====
nr: 514
kennung: pro-smooth-pursuit
name: "Glattes Nachführen auf einer Kurvenbahn – Fadenkreuz auf einem Ziel halten, das eine Lissajous-Figur fährt"
name_original: "Aim Trainer – Smooth-Tracking üben (Seitentitel: Aim Trainer | Smooth-Tracking üben; im Spiel: Lissajous Curve Smooth Pursuit)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/pro-smooth-pursuit"
blickfit_umsetzung: {kennung: "glatt-folgen", name: "Glatt folgen", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/glatt-folgen/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Eine kleine Kugel zieht in weichen, schleifenförmigen Bahnen über den Bildschirm – waagrecht schwingt sie langsam, senkrecht gut doppelt so oft hin und her. Man hält das Mausfadenkreuz ohne zu klicken möglichst ununterbrochen auf der Kugel; gezählt wird die Zeit auf dem Ziel."
ziel_funktionen: [kontinuierliche_steuerung, auge_hand_koordination, blickfolge]
eingabe: [maus]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Level = Punkte/1 400 + 1 (stufenlos, Start Level 1). Mit dem Level steigen Bahntempo und beide Schwingungsfrequenzen exponentiell auf Grenzwerte (Spitzentempo im Vollbild ≈ 4–5 °/s auf Level 1, ≈ 17–22 °/s auf Level 10, Grenzwert ≈ 38–51 °/s), der Zielradius sinkt von 15 auf 9,5 px (min. 8). Eine hohe Combo verschärft zusätzlich (Tempo bis +15 %, Frequenz bis +10 %, Radius bis −15 %). Die Uhr verlängert sich um 0,4 s je Sekunde auf dem Ziel: 45 s nominal, bis ≈ 75 s real."
messgroessen: ["Punkte und Note (Wurzel aus Punkte/54 000)", "Tracking-Präzision = Anteil der Bilder mit Fadenkreuz im Ziel (%)", "Zeit neben dem Ziel (s), beste Combo, erreichtes Level", "sinnvoll ergänzend: mittlerer Abstand Fadenkreuz–Ziel, Nachlauf (Lag) getrennt nach waagrecht/senkrecht, Verluste an Wendepunkten"]

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
    visuelle_verarbeitungsgeschwindigkeit: 0
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
    verarbeitungsgeschwindigkeit: 0
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
  zeitdruck: 1
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus (Touchpad nur eingeschränkt) mit relativer Bewegung und Pointer Lock; kein Tablet", "scharfes Sehen im Bildschirmabstand (Zwischenbereich ≈ 50–75 cm) über große Teile von Bildbreite und -höhe", "Englische Spieloberfläche; Regeln auch deutsch auf der Seite, Spiel ohne Lesen bedienbar"]
vorsicht_bei: [tremor_parkinson, hand_arm_beschwerden, nystagmus, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, migraene_lichtempfindlich, photosensitive_epilepsie, farbsehschwaeche, schwindel_vestibulaer]
geeignet_fuer: ["fortlaufendes, gleichmäßiges Nachführen eines vorhersagbar bewegten Ziels mit der Maus (Auge-Hand-Abstimmung)", "zweidimensionale Blickfolge mit weichen Wendepunkten, waagrecht und senkrecht gleichzeitig", "Tempo vorausschauend anpassen: an Wendepunkten abbremsen, in der Mitte beschleunigen", "Spielerinnen und Spieler, die Tracking in der geübten Aufgabe verbessern wollen"]
weniger_geeignet_fuer: ["Tablet- oder Touch-Nutzung (Original nicht bedienbar)", "Menschen mit Zittern, Hand- oder Handgelenkbeschwerden", "reaktives Nachführen unvorhersagbarer Bewegungen (eher 512, 513)", "wirklich ruckfreies Folgen auf höheren Stufen: Ab ≈ 20–30 s springt das Ziel bei guter Leistung sichtbar (Programmierfehler, siehe Abschnitt 2)", "Wunsch nach verlässlichen Norm- oder Leistungsvergleichen"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Vorhersagbare Bewegungen werden antizipiert, und Auge-Hand-Tracking verbessert sich mit Übung (Kowler et al., 2019; Gauthier et al., 1988; Listman et al., 2021). Für diesen Drill gibt es keine Studie; für nahen Transfer gibt es nur indirekte Hinweise (Actionspiele verbesserten Nachführaufgaben im Labor; Li et al., 2016). Transfer von Aim-Trainern auf Spiel oder Alltag ist nicht kontrolliert untersucht."
aehnliche_uebungen: [402, 403, 105, 104, 505, 507, 512, 513, 515, 304, 707]
stichworte: ["Smooth Tracking", "Smooth Pursuit", "Lissajous-Kurve", "glatte Augenfolgebewegung", "manuelles Nachführen", "2D-Tracking", "prädiktive Folgebewegung", "Auge-Hand-Koordination", "Aim Trainer", "Maus"]
---

# 514 · Glattes Nachführen auf einer Kurvenbahn – Fadenkreuz auf einem Ziel halten, das eine Lissajous-Figur fährt

> Original: „Aim Trainer – Smooth-Tracking üben“ (Spieltitel „Lissajous Curve Smooth Pursuit“) – skilldrills.online, Kapitel Zielen (FPS) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung
Auf fast schwarzem Grund mit sehr schwachem Gitter zieht eine leuchtende Kugel weiche Schleifen über den Bildschirm. Die Bahn entsteht aus zwei Sinusschwingungen: waagrecht langsam, senkrecht etwa 2,3- bis 2,8-mal so schnell (Lissajous-Figur). Man bewegt das Fadenkreuz mit der Maus und hält es möglichst ununterbrochen auf der Kugel; geklickt wird nicht. Solange man trifft, ist die Kugel grün, sonst rot. Mit der Leistung wird die Bahn schneller und das Ziel kleiner.

## 2. Ablauf im Original (Analyse)
Grundlage sind der Seitentext und der ausgelieferte Spielcode (Chunk `45824-…js` mit der Spiellogik und den gemeinsamen Modulen für Schwierigkeitskurve, Combo und Note; gelesen am 29.09.2026, übernommen wurden nur Mechanik und Parameter). Die Winkel sind **eigene Umrechnungen** (24″-Full-HD-Monitor im Vollbild, 60 cm Abstand ≈ 38 px/°). Im kleineren 16:9-Container sind Bahnweite und Tempo proportional kleiner.

- **Rahmen (Code):** Start-Karte → Countdown 3-2-1-GO (Start nach 2,45 s) → Spiel → Ergebnis. Wer Pointer Lock oder Vollbild verlässt oder ESC drückt, bricht ab. Das Fadenkreuz folgt der relativen Mausbewegung × Empfindlichkeit (0,1–3, Standard 1). Es besteht aus einem Ring mit Radius 14 px (Ø 28 px ≈ 0,74°) und einem Mittelpunkt mit Ø 4 px. Reine Touch-Geräte werden erkannt und nicht unterstützt. Es gibt keinen Klick.
- **Bahn (Code):** x = Mitte + sin(Phase · f_x) · 0,35 · Breite, y = Mitte + cos(Phase · f_y) · 0,30 · Höhe. Die Phase wächst mit Bildzeit × Tempofaktor. Im Vollbild ist die Bahn damit ±672 px (≈ ±17,7°) breit und ±324 px (≈ ±8,5°) hoch. Beide Achsen sind reine Sinusbewegungen: langsam an den Wendepunkten, schnell in der Mitte. Das Frequenzverhältnis liegt nicht bei einer ganzen Zahl (2,33 → 2,78). Die Figur schließt sich daher nie genau, jede Achse für sich ist aber vorhersagbar.
- **Tempo je Level (Code, eigene Rechnung, ohne Combo):**

  | Level | Frequenz waagrecht / senkrecht | Spitzentempo waagrecht / senkrecht | Zielradius |
  |---|---|---|---|
  | 1 | 0,04 / 0,09 Hz | ≈ 4,2 / 4,8 °/s | 15 px (Ø ≈ 0,79°) |
  | 5 | 0,08 / 0,19 Hz | ≈ 8,4 / 10,2 °/s | 13,9 px |
  | 10 | 0,16 / 0,42 Hz | ≈ 17 / 22 °/s | 12,2 px |
  | 15 | 0,24 / 0,66 Hz | ≈ 27 / 36 °/s | 10,8 px |
  | Grenzwert | 0,34 / 0,95 Hz | ≈ 38 / 51 °/s | 9,5 px |

  Die volle Combo (Faktor 3) hebt das Tempo auf bis zu ≈ 48 / 64 °/s (senkrecht 1,2 Hz) und senkt den Radius auf ≈ 8 px (Ø ≈ 0,42°).
- **Treffer (Code):** Ein Treffer liegt vor, wenn die Fadenkreuzmitte höchstens einen Zielradius vom Kugelmittelpunkt entfernt ist. Es gibt keinen Zuschlag. Der Fadenkreuzring (Ø 28 px) ist fast so groß wie die Kugel (Ø 30 → 16 px) und überdeckt deren Rand.
- **Punkte (Code):** Je 0,25 s ununterbrochen im Ziel gibt es round(50 × Combo-Faktor × (1 + 0,5 × (Level − 1)/14)) Punkte (Start: 200 Punkte/s) und +0,1 s Spielzeit. Das ergibt +0,4 s/s; die Restzeit ist auf höchstens 60 s begrenzt. Die Combo steigt um 1 je volle Sekunde im Ziel. Kurzes Abrutschen setzt nur die Zähler für die laufende Sekunde und die 0,25 s zurück. Der Faktor beträgt 1,1 ab Combo 3 … 3,0 ab 50.
- **Fehler (Code):** Nach 1 s ununterbrochen neben dem Ziel fällt die Combo auf 0. Nur wenn vorher eine Combo bestand, kommen Fehlerton, rote Partikel, Bildschirmwackeln (6 px) und ein **roter Radialblitz über dem Spielfeld** (Mitte 50 % Deckkraft, nach außen auslaufend, 0,45 s). Nach der Analyse des gleichen Moduls in 512 ist der Blitz standardmäßig an und abschaltbar. Die Zeitstrafe −0,6 s greift nur bei eingeschalteter „Strafe“ (Standard: aus).
- **Zeitmessung (Code):** Bahn und Uhr laufen mit echter Bildzeit (dt, gekappt bei 100 ms), also bei 60 und 144 Hz gleich schnell. Nur die Partikel bewegen sich pro Bild. „Präzision“ ist der Anteil der Bilder im Ziel an allen Bildern. Bei Bildeinbrüchen ist dieser Wert nicht zeitgewichtet. Die Note ist √(Punkte/54 000); „S+“ verlangt ≥ 95 %, also ≈ 48 700 Punkte.
- **Eigene Simulation** (60 Hz, Vollbild, vereinfachtes Trefferschema): 100 % im Ziel ergeben ≈ 75 s, ≈ 55 000 Punkte, Level ≈ 40 und „S+“. 75 % im Ziel ergeben ≈ 60 s, ≈ 14 300 Punkte, Level ≈ 11 und Note ≈ 52 % („C“). 50 % ergeben ≈ 6 600 Punkte, Level ≈ 6 und ≈ 35 % („D“).
- **Programmierfehler: Das Ziel springt (Code, eigene Simulation):** Die Frequenzen werden in jedem Bild aus dem aktuellen Level und der Combo neu berechnet. Sie werden dann mit der **gesamten bisher aufgelaufenen Phase** multipliziert, statt nur den nächsten Schritt zu verändern. Jede Punktevergabe (Level +0,04–0,1) und jede Combo-Schwelle versetzt die Kugel daher schlagartig. Bei 75–100 % Trefferanteil springt sie ab ≈ 20–25 s bei fast jeder Punktevergabe, im Median um ≈ 53–80 px (≈ 1,4–2,1°) und oft um > 100 px (≈ 2,6°). Bei 50 % sind es im Median ≈ 32 px, bei 25 % kaum Sprünge. Gerade wer gut folgt, bekommt also eine sprunghafte statt einer glatten Bahn.
- **Widersprüche Regeltext ↔ Code:** „flüssige Kurvenbahnen“ stimmt nicht, weil das Ziel bei guter Leistung springt (s. o.). „Combo-Reset (−0,6 s)“ gilt nur bei eingeschalteter Strafe. „45 s“ sind real 45–75 s. „Lissajous macht Auswendiglernen unmöglich“ stimmt nur halb, weil jede Achse ein reiner Sinus ist. „+50 PTS“ stimmt; die Vergabe erfolgt je 0,25 s.

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite richtet sich an Tracking-Spielende (Apex Legends, Overwatch 2, The Finals, Warzone). Sie verspricht „zitterfreie Strahlpräzision“, „ruhige Augenführung“ und hohe „Schadens-Uptime“. Die Begründung: MST, FEF und MT würden Geschwindigkeiten vorausberechnen (Krauzlis, 2004), Sakkaden und Folgebewegung seien „anatomisch wie funktional getrennt“ (Rashbass, 1961), und abrupte Sakkaden „lähmten“ die Verarbeitung für 20–50 ms. Sie empfiehlt, den Blick „2–5 Pixel vor die Zielkante“ zu richten (Land & McLeod, 2000), mit 30–40 % Griffkraft aus dem Ellbogen zu führen und höchstens 30 min am Stück zu üben. Dazu zeigt sie eine Stufentabelle („Apex Beam“ 85–95 % Verweildauer … „Basis“ < 42 %).

**Einordnung:**
- **Belegt:** Die Folgebewegung wird von Geschwindigkeitsfehlern getrieben, Sakkaden von Positionsfehlern (Rashbass, 1961; Inhalt über Sekundärquellen). Vorhersagbare Bewegungen werden antizipiert, auch vor Wendepunkten (Kowler et al., 2019). Der Tipp „vor der Kurve abbremsen“ passt dazu. Beim Nachführen mit der Hand bleibt der Blick am Ziel; der Pursuit-Gain steigt und Aufholsakkaden werden seltener (Danion & Flanagan, 2018).
- **Widersprochen:** „Getrennte Systeme“: Krauzlis (2004) beschreibt Folgebewegung und Sakkaden als zwei Ergebnisse einer gemeinsamen Kaskade, Orban de Xivry und Lefèvre (2007) als zwei Ergebnisse eines einzigen sensomotorischen Prozesses. Die Website zitiert damit eine Quelle, die ihrer eigenen Aussage widerspricht.
- **Falsch zugeordnet:** „Genau bis ~30°/s“ steht nicht bei Krauzlis (2004). Richtig ist: Der Gain bleibt unter 0,95 und sinkt mit dem Tempo (Collewijn & Tamminga, 1984); die individuelle Obergrenze reicht bis ≈ 100°/s (Meyer et al., 1985). Die „Lähmung für 20–50 ms“ stammt nicht von Rashbass. Die sakkadische Suppression beginnt ≈ 50 ms vor der Sakkade, endet ≈ 50 ms danach und betrifft vor allem grobe Helligkeitsmuster (Diamond et al., 2000). Die Arbeit von Land und McLeod (2000) handelt von Cricket-Schlagmännern, die eine prädiktive Sakkade zum Aufsprungpunkt machen. Von Fadenkreuzen und Pixeln steht dort nichts. Die Website gibt zudem die falsche DOI an (Abschnitt 11). Der Titel von Rashbass lautet „…smooth *tracking* eye movements“.
- **Unbelegt:** 30–40 % Griffkraft, „Ellbogen statt Handgelenk“ und „Sehnenermüdung ab 30 min“. Belegt ist nur, dass wiederholtes Maus-Zielen die Handgelenkstrecker messbar ermüdet, ohne dass die Leistung sinkt (Forman et al., 2025). Die Aussage „locker = ruhiger“ ist fraglich: Mehr Co-Kontraktion ging bei kleinen Zielen mit **höherer** Genauigkeit einher (Gribble et al., 2003). Green und Bavelier (2003) enthält keine Tracking-Daten.
- **Stufentabelle ohne Datengrundlage:** Keine der Quellen enthält Verweildauer-Stufen. Die Aussage „every figure … comes from the published work“ ist irreführend. Die Stufen hängen zudem von Level, Fenstergröße und Latenz ab.
- **Technik:** Die Aussage „1:1-Hardware-Koordinaten“ ist nicht gedeckt, weil die Vorlage keine Rohdaten anfordert (`unadjustedMovement` fehlt; MDN, o. J.). „144–360 Hz ohne Bewegungsunschärfe (Woods)“ steht nicht bei Woods. Höhere Bildraten verringern die Unschärfe, beseitigen sie aber nicht (eigene Einschätzung). Sinnvoll sind der Messhinweis „nur auf demselben Setup vergleichen“ und der Hinweis, bei Schwindel, Kopfschmerz oder Doppelbildern aufzuhören.

## 4. Optische und okulomotorische Grundlagen
- **Sehwinkel:** Die Kugel misst Ø 30 → 16 px (≈ 0,79 → 0,42°); 1 px entspricht ≈ 1,6′ (eigene Rechnung). Das liegt weit über der Sehschärfegrenze. Gefordert ist das Erkennen, ob der 4-px-Punkt noch auf der Kugel liegt. Weil der Fadenkreuzring den Kugelrand verdeckt, wird das schwieriger → `sehschaerfe_detail` 1. Der Kontrast zum Grund ist hoch (≈ 5,4–8 : 1, WCAG-Formel).
- **Blickfolge:** Level 1–5 (≈ 4–10°/s) liegt im günstigen Bereich. Ab Level ≈ 10 (≈ 20°/s und mehr) bleibt der Gain spürbar unter 1 (Collewijn & Tamminga, 1984). Aufholsakkaden werden häufiger; ob eine kommt, hängt von der vorhergesagten Zeit bis zum Wiedertreffen ab (de Brouwer et al., 2002). Die Sprünge aus Abschnitt 2 erzwingen zusätzliche Sakkaden → `blickfolge` 3, `sakkaden` 2.
- **Vorhersagbarkeit:** Sinusbahnen werden antizipiert, sodass der Nachlauf mit Übung sinkt (Kowler et al., 2019). Erst Summen mehrerer nicht harmonischer Sinusanteile machen die Bewegung unvorhersagbar. Dann sinkt der Gain von 0,92 (0,39 Hz) auf 0,53 (1,56 Hz) (Barnes et al., 1987). Die Lissajous-Bahn liegt dazwischen: Jede Achse ist vorhersagbar, die Überlagerung weniger → `antizipation` 2.
- **Senkrecht ist schwerer:** Die senkrechte Komponente ist hier die schnellere. Die vertikale Folgebewegung ist schwächer als die horizontale, auch bei diagonalen und kreisförmigen Bahnen (Rottach et al., 1996). Aufwärts folgt das Auge schlechter als abwärts (Ke et al., 2013). Das Gitter im Hintergrund hat nur 3 % Deckkraft. Ein strukturierter Hintergrund senkt den vertikalen Gain um ≈ 20 % (Collewijn & Tamminga, 1984); hier dürfte der Effekt klein sein (eigene Einschätzung).
- **Bildschirm:** Bei 60 Hz springt ein 30°/s-Ziel ≈ 0,5° (≈ 19 px) pro Bild, also mehr als einen Zielradius (eigene Rechnung). Die Sample-and-Hold-Unschärfe erschwert das Beurteilen der Überdeckung.
- **Brille:** Die Bahn nutzt ≈ ±17,7° der Breite und ≈ ±8,5° der Höhe (Vollbild, 60 cm). Bei Universal-Gleitsichtgläsern wechselt der Blick dabei ständig zwischen Fern-, Zwischen- und Nahzone. Im unteren Bildteil schaut man durch den Nahteil, im oberen durch den Fernteil, seitlich wird es unscharf. Die Folge ist eher Kopf- als Augenbewegung, und die Aufgabe ändert sich. Bildschirm-Gleitsichtgläser verringerten die Kopfneigung am Monitor und verbesserten die Monitorsicht (Jaschinski et al., 2015). Hilfreich sind auch ein kleineres Fenster oder der Arbeitsplatzabstand der Brille (≈ 50–75 cm).
- **Farbe:** „Im Ziel“ wird über Grün ↔ Rot angezeigt (#10b981 ↔ #ef4444, Leuchtdichtekontrast nur ≈ 1,5 : 1; eigene Rechnung). Bei Rot-Grün-Schwäche (≈ 8 % der Männer; Birch, 2012) fällt dieses Signal weitgehend weg. Trefferton und Trefferkreuz bleiben → `farbunterscheidung` 1.
- **Alter und Augen:** Ältere (75–93 J.) haben bei allen Geschwindigkeiten einen geringeren Pursuit-Gain (Moschner & Baloh, 1994). Pausenloses Folgen senkt die Lidschlagrate (Patel et al., 1991). Stereosehen: 0.

## 5. Neurowissenschaftliche Grundlagen
Die Bewegungsinformation stammt vor allem aus den Arealen MT/MST. Die Streuung der Folgebewegung geht weitgehend auf das Rauschen der Bewegungsschätzung in MT zurück (Lisberger, 2010). Frontales Augenfeld, Basalganglien und Colliculus superior steuern Folgebewegung und Sakkaden gemeinsam (Krauzlis, 2004; Orban de Xivry & Lefèvre, 2007). Bei sinusförmiger Bewegung veränderte Magnetstimulation des frontalen Folgeareals die Augengeschwindigkeit kurz vor dem Richtungswechsel und in der Zyklusmitte, die des supplementären Augenfelds nur am Richtungswechsel (Gagnon et al., 2006; einzelne TMS-Laborstudie). Das passt zur Vorhersage an Wendepunkten, die dieser Drill verlangt. Prädiktives Folgen beruht auf Erwartungen aus der bisherigen Bewegung (Kowler et al., 2019). Dass das Kleinhirn „die Harmonik lernt“ und der Drill bestimmte Hirnregionen „trainiert“, ist für diese Aufgabe nicht belegt.

## 6. Motorische Grundlagen
- **2D-Tracking:** Die Hand regelt x und y nicht getrennt; die Fehlersignale betreffen vor allem Geschwindigkeit und Richtung (Engel & Soechting, 2000). Bei elliptischen Bahnen mit Perioden von 9,65–1,61 s verkürzte die Vorhersagbarkeit den Nachlauf deutlich. Gut gelang das Folgen nur bei „natürlichem“ Bewegungsgesetz aus harmonischen Schwingungen (Viviani & Mounoud, 1990). Die Lissajous-Bahn besteht aus harmonischen Schwingungen, die Übertragung ist aber eine eigene Folgerung.
- **Intermittierende Regelung:** Korrekturen kommen in Schüben; bei langsamen Bahnen werden Fehler unter ≈ 0,8° oft toleriert, bei schnelleren passt die Verteilung zu ≈ 170 ms Pause zwischen den Korrekturen (Miall et al., 1993; Joystick-Aufgabe). Die Trefferzone ist mit einem Radius von ≈ 0,4 → 0,2° **kleiner** als diese Totzone. Man muss also ständig fein nachregeln (eigene Folgerung).
- **Bandbreite:** Mit der Maus gelingt genaues Tracking bis ≈ 2 Hz; Alter und motorische Einschränkung senken diesen Wert (Riviere & Thakor, 1996). Die Frequenzen des Drills (≤ 1,2 Hz) liegen darunter. Begrenzend sind eher die Spitzengeschwindigkeit in der Bahnmitte und die Sprünge. Nach einem Sprung braucht die Hand ≈ 110 ms zum Umlenken (Brenner & Smeets, 1997).
- **Wendepunkte:** Dort ist die Geschwindigkeit fast null, das verlangt kurzes ruhiges Halten (`ruhige_hand` 1). In der Mitte folgt die höchste Geschwindigkeit (`zielbewegung_tempo` 1 für das Wiedereinfangen).
- **Maus-Übersetzung:** Die Mausbeschleunigung des Betriebssystems bleibt aktiv. Sie verändert die nötige Handbewegung mit dem Tempo; beim Zeigen auf Ziele erhöhte sie das Überschießen (Casiez et al., 2008; Zeigeaufgaben, kein Tracking).

## 7. Einflussfaktoren und Messgrenzen
- **Latenz:** Die lokale Systemlatenz liegt real bei 23–243 ms und verschlechtert Tracking schon ab ≈ 41 ms (Ivkovic et al., 2015). Bei 30°/s bedeuten 50 ms Latenz ≈ 1,5° Nachlauf, das ist mehr als die Trefferzone (eigene Rechnung). Vorhersage kann das teilweise ausgleichen. Werte verschiedener Geräte sind nicht vergleichbar.
- **Größen in Pixeln:** Bahnweite und Tempo hängen von Fenstergröße, Monitor und Abstand ab; der Zielradius ist fest in Pixeln. Container und Vollbild ergeben andere Aufgaben.
- **Messgrößen:** „Präzision“ zählt Bilder, nicht Zeit. Die Punkte hängen stark von Combo und Level ab, die Sitzungslänge schwankt (45–75 s). Die Sprünge ab mittlerem Level verfälschen gerade die Werte guter Spieler:innen. Eine Auswertung nach Achse oder Wendepunkt fehlt.
- **Zuverlässigkeit:** Tracking-Metriken in KovaaK’s waren gut reproduzierbar (ICC 0,947–0,995 über mehrere Szenarien, N = 10; Rogers et al., 2024). Für diesen Drill ist das nicht geprüft.
- **Alter und Ermüdung:** Pursuit-Gain und Maus-Tracking werden im Alter schwächer (Moschner & Baloh, 1994; Riviere & Thakor, 1996). Die Handgelenkstrecker ermüden messbar (Forman et al., 2025).

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt – mittel:** Vorhersagbare Bahnen werden mit Wiederholung besser antizipiert (Kowler et al., 2019), und Auge-Hand-Tracking verbessert sich mit Übung (Gauthier et al., 1988). In Aim-Lab-Daten stiegen die Leistungen über Tage (Listman et al., 2021; Beobachtungsdaten, vom Hersteller finanziert). Für diesen Drill gibt es keine Studie. Weil die Bahn je Achse periodisch ist, dürfte ein Teil des Zugewinns aufgabenspezifisch sein (eigene Einschätzung).
- **Naher Transfer – schwach:** Es gibt nur indirekte Hinweise: 5–10 h Actionspiel verbesserten bei Nicht-Spielenden das Spurhalten und Nachführen im Labor (Li et al., 2016). Das war ein Spiel, kein 45-s-Drill. Große Effekte entstehen vor allem, wenn Übung und Test am selben Gerät ähnlich sind (Guo et al., 2025).
- **Alltagstransfer – fehlend:** Für Spielduelle, Sport, Verkehr oder Beruf gibt es keinen Beleg. „Brain-Training“ zeigt viel Evidenz für die geübte Aufgabe und wenig für entfernte Aufgaben (Simons et al., 2016).

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** jemand am Desktop mit Maus gleichmäßiges, vorhersagbares Nachführen in zwei Richtungen üben möchte. Das Ziel ist „Blickfolge plus Hand“ mit weichen Wendepunkten, ohne Klicken und ohne Lese- oder Gedächtnisanforderung. Niedrige Level (≈ 1–5) sind langsam und eignen sich als Einstieg.
- **Weniger passend, wenn …** nur ein Tablet vorhanden ist oder reaktives Folgen bei plötzlichen Wechseln gewünscht ist (512, 513). Ebenso bei reiner Augenfolge ohne Hand (402, 403, 105), bei rein vertikalem Tracking (515) und wenn vergleichbare Messwerte gebraucht werden.
- **Vorsicht / anpassen bei …**
  - `tremor_parkinson`, `hand_arm_beschwerden`: Die Übung verlangt fortlaufendes Feinregeln aus Handgelenk und Unterarm (Forman et al., 2025). Besser kurze Runden, niedrige Level und eine größere Empfindlichkeit.
  - `nystagmus`: Die Aufgabe verlangt genau die Folgebewegung → eher nicht wählen.
  - `presbyopie_gleitsicht`: Die Bahn läuft über viel Höhe und Breite. Hilfreich sind Bildschirmbrille bzw. passende Zwischenkorrektur, ein kleineres Fenster und ein tiefer gestellter Monitor.
  - `migraene_lichtempfindlich`: Bei Combo-Verlust kommt ein roter Radialblitz über dem Spielfeld, dazu Bildschirmwackeln und schnelles Rot-Grün-Wechseln der Kugel am Rand der Trefferzone (kleine Fläche) → Blitz abschalten.
  - `photosensitive_epilepsie`: Einzelner roter Radialblitz (0,45 s) bei Combo-Verlust, höchstens etwa einmal je 2 s, dazu Bildschirmwackeln; kein periodisches Flimmern, aber gesättigtes Rot großflächig → Blitz abschalten (das Wackeln lässt sich im Original nicht abschalten) oder eher nicht wählen.
  - `farbsehschwaeche`: Die Rückmeldung ist nur Grün/Rot, die Aufgabe bleibt aber lösbar.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: Pausenloses Folgen bis ≈ 75 s mit wenig Lidschlag → Pausen zwischen den Runden.
  - `schwindel_vestibulaer`: Es gibt keinen 3D-Kameraschwenk und keine großflächige Bewegung; die hohen Reisekrankheitsraten von Konsolenspielen mit Kamerabewegung sind daher nicht direkt übertragbar (eigene Einschätzung). Die großen Schleifen, die Sprünge und das Bildschirmwackeln können Empfindliche dennoch stören (Belastung Schwindel 1, wie 512, 513, 515) → niedrige Level, kurze Runden.
- **Kombiniert gut mit …** 402 und 403 (Acht- und Sinusbahn nur mit den Augen), 105 (Blickfolge mit Detail-Erkennung; Blickfit „Scharf in Bewegung“), 515 (senkrechte Folge), 512 und 513 (reaktives Tracking), 707 (Pfad nachfahren), 104 (bewegtes Ziel abfangen; Blickfit „Zielfang“).
- **Überschneidungen:** In der Gruppe 509–515 keine Dublette: 514 ist die einzige vorhersagbare, periodische Bahn (512 und 513 reagieren auf zufällige Wechsel, 515 auf beschleunigte, überwiegend senkrechte Bahnen mit Ausweichsprüngen). Am nächsten verwandt ist 507 (glatte, aber zufällig gekrümmte Bahnstücke) – 514 ist periodisch und damit stärker antizipierbar, dafür springt das Ziel auf höheren Stufen wegen des Programmierfehlers. Nicht 514 und 507 hintereinander vorschlagen, wenn nur „glattes Nachführen“ gefragt ist.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Sprungfehler beheben:** Die Phase je Achse muss fortlaufend weitergezählt werden (Phase += 2π · f · dt). Dann bleibt die Bahn auch bei Tempoänderungen stetig. Tempo und Frequenz sollten sich nur langsam ändern, nicht an Combo-Schwellen.
- **Tablet:** Das Original ist auf dem Tablet nicht bedienbar (Pointer Lock, nur Maus). Eine Touch-Fassung als **Finger-Nachführaufgabe** ist fachlich sinnvoll, denn 2D-Tracking mit dem Finger ist ein etabliertes Laborparadigma (Engel & Soechting, 2000). Dafür braucht sie ein größeres Ziel (in Grad festgelegt) und einen Ring, damit der Finger das Ziel nicht verdeckt. Die Touch-Latenz kommerzieller Geräte von 50–200 ms ist einzuplanen (Deber et al., 2015, mit Verweis auf frühere Messungen); das Tempo muss deutlich niedriger sein. Alternativ geht eine reine Blickfolge-Variante mit Erkennungsaufgabe wie in Blickfit „Scharf in Bewegung“.
- **Messung:** Sinnvoll sind mittlerer Abstand, Nachlauf je Achse und Verluste an Wendepunkten sowie eine zeitgewichtete Präzision. Dazu eine feste Sitzungsdauer ohne Zeitbonus, wählbare Stufen statt Combo-Verschärfung und eine realistische Notenskala.
- **Vorhersagbarkeit wählbar:** Stufen von reinem Sinus (vorhersagbar) bis zur Summe mehrerer nicht harmonischer Anteile (unvorhersagbar; Barnes et al., 1987) machen ehrlich sichtbar, was geübt wird.
- **Regeltext:** Keine Stufentabelle, keine Transfer- oder Leistungsversprechen; optionale Strafe und Zeitbonus korrekt angeben; Mausbeschleunigung erwähnen.
- **Barrierefreiheit/Sicherheit:** Rückmeldung zusätzlich über Form statt nur Rot/Grün. Der Fadenkreuzring sollte kleiner als das Ziel sein. Den roten Radialblitz standardmäßig aus, das Wackeln abschaltbar machen und einen Pausenhinweis geben. Die Bahnhöhe sollte für Gleitsichtträger:innen begrenzbar sein.

## 11. Quellen
### Von der Website angegeben
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein/teilweise – Die Uptime-Stufen und „ohne Bewegungsunschärfe“ stehen dort nicht. Nur der allgemeine Hinweis auf Hardwareverzögerungen passt (Woods misst einfache Reaktionszeit).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise – Das ausgedehnte Netzwerk mit frontalem Augenfeld stimmt. Ein Grenzwert „~30°/s“ steht dort nicht. Der Review widerspricht der Aussage „getrennte Systeme“ auf derselben Seite.
- Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. *Nature, 423*(6939), 534–537. https://doi.org/10.1038/nature01647 – **Prüfung:** DOI stimmt ✓; **stützt:** nein – eine Aufmerksamkeitsstudie ohne Tracking-Daten.
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, **Titel falsch** („smooth pursuit“ statt „smooth tracking“); **stützt:** teilweise – Position → Sakkade und Geschwindigkeit → Folgebewegung stimmen (über Sekundärquellen). „Anatomisch getrennt“ und „20–50 ms Lähmung“ stehen nicht dort.
- Land, M. F., & McLeod, P. (2000). From eye movements to actions: How batsmen hit the ball. *Nature Neuroscience, 3*(12), 1340–1345. Website: doi.org/10.1038/81861 – **Prüfung:** **DOI falsch** (404), richtig https://doi.org/10.1038/81887; **stützt:** nein – Die Studie handelt von prädiktiven Sakkaden beim Cricket. Sie enthält keine Aussage zu Fadenkreuzen, Werkzeugfixation oder „2–5 Pixeln“.

### Weitere Fachliteratur
- Barnes, G. R., Donnelly, S. F., & Eason, R. D. (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. *The Journal of Physiology, 389*, 111–136. https://doi.org/10.1113/jphysiol.1987.sp016649 – Gain bei unvorhersagbaren Bahnen.
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Rot-Grün-Schwäche.
- Brenner, E., & Smeets, J. B. J. (1997). Fast responses of the human hand to changes in target position. *Journal of Motor Behavior, 29*(4), 297–310. https://doi.org/10.1080/00222899709600017 – Handkorrektur nach ≈ 110 ms.
- Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction, 23*(3), 215–250. https://doi.org/10.1080/07370020802278163 – Mausbeschleunigung.
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Pursuit-Gain, Einfluss des Hintergrunds.
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports, 8*, 10059. https://doi.org/10.1038/s41598-018-28434-6 – Blick beim Hand-Tracking.
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Aufholsakkaden.
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. In *Proceedings of CHI ’15* (S. 1827–1836). ACM. https://doi.org/10.1145/2702123.2702300 – Touch-Latenz.
- Diamond, M. R., Ross, J., & Morrone, M. C. (2000). Extraretinal control of saccadic suppression. *The Journal of Neuroscience, 20*(9), 3449–3455. https://doi.org/10.1523/JNEUROSCI.20-09-03449.2000 – Zeitverlauf der sakkadischen Suppression.
- Engel, K. C., & Soechting, J. F. (2000). Manual tracking in two dimensions. *Journal of Neurophysiology, 83*(6), 3483–3496. https://doi.org/10.1152/jn.2000.83.6.3483 – 2D-Tracking, Finger-Paradigma.
- Forman, G. N., Nikitin, S. A., Lang, C. J., Gabriel, D. A., Sonne, M. W., Kociolek, A. M., & Holmes, M. W. R. (2025). Impact of repetitive mouse aiming on muscle fatigue and fine motor performance of the distal upper limb. *Journal of Electromyography and Kinesiology, 82*, 102992. https://doi.org/10.1016/j.jelekin.2025.102992 – Ermüdung.
- Gagnon, D., Paus, T., Grosbras, M.-H., Pike, G. B., & O’Driscoll, G. A. (2006). Transcranial magnetic stimulation of frontal oculomotor regions during smooth pursuit. *The Journal of Neuroscience, 26*(2), 458–466. https://doi.org/10.1523/JNEUROSCI.2789-05.2006 – frontale Areale an Wendepunkten sinusförmiger Folge.
- Gauthier, G. M., Vercher, J.-L., Mussa Ivaldi, F., & Marchetti, E. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. *Experimental Brain Research, 73*(1), 127–137. https://doi.org/10.1007/BF00279667 – Auge-Hand-Tracking, Lernen.
- Gribble, P. L., Mullin, L. I., Cothros, N., & Mattar, A. (2003). Role of cocontraction in arm movement accuracy. *Journal of Neurophysiology, 89*(5), 2396–2405. https://doi.org/10.1152/jn.01020.2002 – Co-Kontraktion und Genauigkeit.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – gerätegebundene Lerneffekte.
- Ivkovic, Z., Stavness, I., Gutwin, C., & Sutcliffe, S. (2015). Quantifying and mitigating the negative effects of local latencies on aiming in 3D shooter games. In *Proceedings of CHI ’15* (S. 135–144). ACM. https://doi.org/10.1145/2702123.2702432 – Systemlatenz und Tracking.
- Jaschinski, W., König, M., Mekontso, T. M., Ohlendorf, A., & Welscher, M. (2015). Comparison of progressive addition lenses for general purpose and for computer vision: An office field study. *Clinical and Experimental Optometry, 98*(3), 234–243. https://doi.org/10.1111/cxo.12259 – Bildschirm-Gleitsicht.
- Ke, S. R., Lam, J., Pai, D. K., & Spering, M. (2013). Directional asymmetries in human smooth pursuit eye movements. *Investigative Ophthalmology & Visual Science, 54*(6), 4409–4421. https://doi.org/10.1167/iovs.12-11369 – aufwärts schwächer als abwärts.
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 – prädiktive Folgebewegung.
- Li, L., Chen, R., & Chen, J. (2016). Playing action video games improves visuomotor control. *Psychological Science, 27*(8), 1092–1108. https://doi.org/10.1177/0956797616650300 – Actionspiele und Nachführen.
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – MT und Streuung der Folgebewegung.
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the “wild” with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 – Übungsverlauf in Aim Lab (vom Hersteller finanziert).
- MDN Web Docs. (o. J.). *Element: requestPointerLock() method*. Mozilla. Abgerufen am 29.09.2026 von https://developer.mozilla.org/en-US/docs/Web/API/Element/requestPointerLock – Webdokumentation, keine DOI.
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Obergrenze der Folgegeschwindigkeit.
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – intermittierende Regelung.
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Alter und Pursuit.
- Orban de Xivry, J.-J., & Lefèvre, P. (2007). Saccades and pursuit: Two outcomes of a single sensorimotor process. *The Journal of Physiology, 584*(1), 11–23. https://doi.org/10.1113/jphysiol.2007.139881 – Sakkaden und Folgebewegung arbeiten zusammen (Crossref und PubMed-Abstract geprüft).
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm.
- Riviere, C. N., & Thakor, N. V. (1996). Effects of age and disability on tracking tasks with a computer mouse: Accuracy and linearity. *Journal of Rehabilitation Research and Development, 33*(1), 6–15. PMID 8868412 – Zeitschrift ohne DOI, PubMed geprüft; Maus-Tracking-Bandbreite.
- Rogers, E. J., Trotter, M. G., Johnson, D., Desbrow, B., & King, N. (2024). KovaaK’s aim trainer as a reliable metrics platform for assessing shooting proficiency in esports players: A pilot study. *Frontiers in Sports and Active Living, 6*, 1309991. https://doi.org/10.3389/fspor.2024.1309991 – Reproduzierbarkeit.
- Rottach, K. G., Zivotofsky, A. Z., Das, V. E., Averbuch-Heller, L., Discenna, A. O., Poonyathalang, A., & Leigh, R. J. (1996). Comparison of horizontal, vertical and diagonal smooth pursuit eye movements in normal human subjects. *Vision Research, 36*(14), 2189–2195. https://doi.org/10.1016/0042-6989(95)00302-9 – horizontal besser als vertikal, auch auf Kreisbahnen.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do “brain-training” programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer allgemein.
- Viviani, P., & Mounoud, P. (1990). Perceptuomotor compatibility in pursuit tracking of two-dimensional movements. *Journal of Motor Behavior, 22*(3), 407–443. https://doi.org/10.1080/00222895.1990.10735521 – Hand-Tracking vorhersagbarer elliptischer Bahnen (Crossref und PubMed-Abstract geprüft).
