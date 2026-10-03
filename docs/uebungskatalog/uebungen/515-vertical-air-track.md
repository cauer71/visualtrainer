---
# ===== Kennung =====
nr: 515
kennung: vertical-air-track
name: "Hoch und runter folgen – ein Ziel begleiten, das in weichen Bögen auf- und absteigt"
name_original: "Aim Trainer: Vertikales Tracking – Y-Achse & Luftziele (Seitentitel: Aim Trainer: Vertikales Tracking; im Spiel: Vertical Air-Track)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/vertical-air-track"
blickfit_umsetzung: {kennung: "hoch-runter-folgen", name: "Hoch und runter", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/hoch-runter-folgen/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein Ziel springt wie ein Ball in weichen Bögen überwiegend senkrecht hoch und wieder herunter: unten schnell, oben langsam, seitlich schwankt es nur leicht. Die Marke sitzt über dem Finger und soll im sichtbaren Band um das Ziel bleiben. Mit steigender Stufe werden die Bögen schneller und das Band enger; ab Stufe 4 zieht das Ziel im Scheitel manchmal noch einmal nach oben, ein Pfeil kündigt das vorher an. Ausgewertet werden Zeit im Band und mittlerer Abstand zum Ziel."
ziel_funktionen: [blickfolge, auge_hand_koordination, kontinuierliche_steuerung]
eingabe: [maus]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Level = Punkte/1 400 + 1. Mit dem Level laufen Zielradius 32 → 12 px (min. 10), Schwerkraft 700 → 1 100 px/s², Abwurftempo 650 → 950 px/s, nötige Haltezeit 0,33 → 0,71 s exponentiell auf Grenzwerte zu; die Ausweich-Wahrscheinlichkeit steigt linear von 15 % bis zur Obergrenze 85 % (ohne Combo ab Level ≈ 16); ab Level 5 fliegen zwei Ziele gleichzeitig. Eine hohe Combo verschärft zusätzlich (bis ±15 %). Uhr: 45 s Start, +2 s je Abschuss (max. 60 s), −1 s je abgestürztem Ziel – reale Rundendauer ≈ 30 s bis mehrere Minuten."
messgroessen: ["Punkte und Note (Wurzel aus Punkte/54 000)", "Trefferquote = Anteil der Bilder mit Fadenkreuz auf dem Ziel, gezählt nur bei gedrückter Maustaste (%)", "zerstörte und abgestürzte Ziele, beste Combo (Abschüsse in Folge), erreichtes Level", "sinnvoll ergänzend: Abstand Fadenkreuz–Ziel getrennt für Aufstieg, Scheitel und Fall; Wiedereinfangzeit nach Ausweichmanövern"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
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
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 2
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 3
    zielbewegung_tempo: 2
    zielbewegung_praezision: 2
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
voraussetzungen: ["Maus mit gedrückt gehaltener Taste und Pointer Lock (Touchpad nur eingeschränkt); kein Tablet", "scharfes Sehen im Bildschirmabstand (Zwischenbereich ≈ 50–75 cm) über die ganze Bildhöhe – vom unteren Rand bis weit nach oben", "Englische Spieloberfläche; Regeln auch deutsch auf der Seite, Spiel ohne Lesen bedienbar"]
vorsicht_bei: [presbyopie_gleitsicht, tremor_parkinson, hand_arm_beschwerden, nystagmus, trockenes_auge_bildschirm, kopfschmerz_asthenopie, migraene_lichtempfindlich, photosensitive_epilepsie, schwindel_vestibulaer]
geeignet_fuer: ["senkrechtes Nachführen eines abbremsenden und wieder beschleunigenden Ziels mit dem Finger üben", "Umkehr am Scheitelpunkt und beschleunigten Fall vorausschauend begleiten statt hinterherzulaufen", "Ergänzung zu waagrechten Nachführ-Übungen (512–514), weil hier die senkrechte Bewegung überwiegt", "Selbstvergleich auf demselben Gerät (Zeit im Band, Abstand zum Ziel)"]
weniger_geeignet_fuer: ["Gleitsicht-Trägerinnen und -Träger ohne Bildschirmbrille (der Blick wandert ständig durch alle Brillenzonen)", "Menschen mit Zittern, Hand- oder Handgelenkbeschwerden", "ruhiges, gleichmäßiges Blickfolgetraining (das Tempo ändert sich laufend)", "Wunsch nach verlässlichen Norm- oder Leistungsvergleichen", "Erwartung eines Seh-, Sport- oder Alltagsnutzens"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Das Nachführen mit Auge und Hand und die Leistung in Zielaufgaben am Bildschirm verbessern sich mit Übung (Gauthier et al., 1988; Listman et al., 2021); für diese Übung gibt es keine Studie. Beschleunigung wird vor allem über Wiederholung derselben Beschleunigung gelernt (Brenner et al., 2016) – die Schwerkraft ist hier je Stufe fest. Für nahen Transfer gibt es nur indirekte Hinweise (Actionspiele verbesserten Nachführaufgaben im Labor; Li et al., 2016); ein Transfer von Zieltrainings auf Spiel oder Alltag ist nicht kontrolliert untersucht."
aehnliche_uebungen: [514, 512, 513, 505, 507, 304, 413, 407, 105, 104, 707, 802]
stichworte: ["vertikales Tracking", "Parabelbahn", "Schwerkraft", "Beschleunigung", "Scheitelpunkt", "Smooth Pursuit", "Aufholsakkade", "manuelles Nachführen", "Auge-Hand-Koordination", "Aim Trainer", "Maus", "Gleitsicht"]
---

# 515 · Hoch und runter folgen – ein Ziel begleiten, das in weichen Bögen auf- und absteigt

> Original: „Aim Trainer: Vertikales Tracking – Y-Achse & Luftziele“ (Spieltitel „Vertical Air-Track“) – skilldrills.online, Kapitel Zielen (FPS) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Ein Ziel springt wie ein Ball in weichen Bögen: vom Boden unten im Feld in die Höhe, am Scheitel langsam, dann wieder hinab; der Boden ist weich, die Umkehr dauert 0,26 s ohne Knick. Seitlich schwankt das Ziel nur leicht. Man legt den Finger irgendwo auf; die Marke sitzt etwa 6 Einheiten (6 % der kürzeren Bildschirmseite) über der Fingerspitze und folgt dem Finger in beiden Richtungen, vor allem senkrecht. Sie soll im sichtbaren Band um das Ziel bleiben. Die Schwerkraft ist je Stufe fest, damit sich die Fallkurve einprägen kann; nur die Scheitelhöhe schwankt von Bogen zu Bogen (×0,7 bis ×1,25). Ab Stufe 4 zieht das Ziel im Scheitel mit einer Wahrscheinlichkeit von 20 % bis 60 % noch einmal nach oben; ein Pfeil über der Marke kündigt diesen Schub etwa 0,55 s vorher an. Eine Sitzung hat fünf Durchgänge von je 11 s Fingerkontakt (davor eine kurze Einlaufzeit ohne Wertung); Abheben pausiert die Bahn. Ein Durchgang gilt als gelungen, wenn die Marke mindestens 60 % der Zeit im Band liegt; zwei gelungene Durchgänge in Folge steigern die Stufe, ein misslungener senkt sie. Mit der Stufe werden die Bögen schneller (Schwerkraft von 6,5 auf 23 Einheiten pro Sekunde²) und etwas höher (Scheitel 10 → 15 Einheiten), das Band wird enger und die Schübe häufiger; bis Stufe 3 zeigt eine gestrichelte Linie die Bahn 0,9 s voraus. Ausgewertet werden die Zeit im Band und der mittlere Abstand zum Ziel (in Prozent der Bandbreite).

## 2. Ablauf im Original (Analyse)
Grundlage: Seitentext und ausgelieferter Spielcode (seitenspezifischer Chunk `15949-…js` mit Physik, Punkten und den gemeinsamen Modulen für Schwierigkeitskurve, Combo, Note und Einstellungen; gelesen am 29.09.2026, nur Mechanik übernommen). Winkel sind **eigene Umrechnungen** (24″-Full-HD-Monitor im Vollbild, 60 cm Abstand ≈ 38 px/°); Simulationen sind eigene, idealisierte Rechnungen.

- **Rahmen (Code):** Start-Karte → Countdown → Spiel → Ergebnis. Canvas im 16:9-Container oder Vollbild; Pointer Lock ohne `unadjustedMovement` (Betriebssystem-Mausbeschleunigung bleibt aktiv). Das Fadenkreuz startet in der Bildmitte und folgt der relativen Mausbewegung × Empfindlichkeit; es bleibt innerhalb der Fläche. Reine Touch-Geräte werden erkannt und nicht unterstützt. **Maustaste gedrückt halten** = feuern.
- **Flugbahn (Code):** Das Ziel startet knapp unter dem unteren Rand bei zufälliger x-Position (mittlere 60 % der Breite) mit Aufwärtstempo = Abwurftempo + 0–120 px/s und kleiner Seitendrift (± 22,5 % des Abwurftempos, Abpraller an den Seitenrändern mit 85 % Tempo). Pro Bild wirkt konstante Schwerkraft (Euler-Schritt mit echter Bildzeit, gekappt bei 100 ms) → echte Wurfparabel. Level 1: 650–770 px/s (≈ 17–20°/s) beim Abwurf, 700 px/s² (≈ 18°/s²), Scheitel nach ≈ 0,93–1,1 s, **Steighöhe ≈ 300–420 px** (≈ 8–11°), Flugzeit ≈ 2 s. Oberer Rand begrenzt nicht; in kleinen Fenstern kann das Ziel oben aus dem Bild steigen.
- **Ausweichmanöver (Code):** Frühestens 0,8–1,4 s nach dem Start, danach alle 0,8–1,5 s, wird geprüft (nur in den oberen 70 % der Fläche und beim Steigen, am Scheitel oder zu Beginn des Falls). Mit Wahrscheinlichkeit 15 % (Level 1) bis 85 % springt das Tempo sofort: 40 % **Aufwärtsstoß** (350–470 px/s nach oben), 35 % **Seitensprung** (350–500 px/s ≈ 9–13°/s), 25 % **Sturz** (400 px/s nach unten). Jeder Sprung wird **gleichzeitig** mit einem kleinen Farbfunken (blau/violett/rot) angezeigt, nicht vorher.
- **Treffen (Code):** Bei gedrückter Taste und Fadenkreuz innerhalb des Zielradius sinkt die Gesundheit (100) um 300/s (Level 1) → **≈ 0,33 s Haltezeit**; auf hohen Stufen 140/s (≈ 0,71 s, mit Combo bis 0,83 s). Unterbrechen ist erlaubt. Zielradius 32 px (Ø ≈ 1,7°) → 12 px (Ø ≈ 0,63°), mit Combo min. 10 px.
- **Punkte (Code):** Nur beim Abschuss: (100 + Höhenbonus) × Combo-Faktor × (1 + 0,5 × (Level − 1)/14). Höhenbonus nach Höhe über dem unteren Rand, relativ zur Canvas-Höhe: ≥ 25 % → +25, ≥ 50 % → +50, ≥ 75 % → +75. Combo = Abschüsse in Folge (Faktor 1,1 ab 3 … 3,0 ab 50). +2 s Spielzeit je Abschuss (max. 60 s).
- **Fehler (Code):** Fällt ein Ziel unten aus dem Bild: Combo → 0, −1 s, Fehlerton, Bildschirmwackeln (10 px, klingt ab) und **roter Radialblitz über dem Spielfeld** (Mitte 50 % Deckkraft, nach außen auslaufend, 0,45 s; Einstellung „Blitz“ standardmäßig an). Der Zeitabzug ist im Code für diese Übung **fest eingeschaltet** (die Abfrage der Einstellung „Strafen“ erzwingt „an“). Nur wenn man die Einstellung „Timeout“ abschaltet, prallt das Ziel unten ab statt abzustürzen. Schießen neben das Ziel kostet nichts außer Trefferquote.
- **Schwierigkeit (Code):** Level = Punkte/1 400 + 1; Parameter laufen auf der gemeinsamen Exponentialkurve der Vorlage (Grenzwerte siehe YAML). Level 10 ohne Combo: Radius 21,8 px, 904 px/s², Abwurf 803 px/s, Haltezeit 0,46 s, Ausweichen 57 %; ab Level 5 zwei Ziele gleichzeitig.
- **Rundendauer (eigene Simulation):** Trifft man nichts, stürzt etwa alle 2 s ein Ziel ab (−1 s) → Ende nach **≈ 30 s**. Ein idealisierter Spieler (perfektes Nachführen, keine Ausweichmanöver, 0,25–0,8 s Erfassungszeit je Ziel) spielt **≈ 85–250 s** und erreicht Level ≈ 6–35. Reale Werte liegen darunter (unsicher, nicht gemessen). Die Sitzungsdauer hängt also stark von der Leistung ab.
- **Zeitmessung (Code):** Bewegung und Uhr laufen mit Bildzeit (dt), also nahezu gleich bei 60 und 144 Hz; der Euler-Schritt senkt die Scheitelhöhe bei 60 Hz nur um ≈ 5 px. Nur Funkenpartikel bewegen sich pro Bild (rein optisch). „Trefferquote“ = Bilder auf dem Ziel/Bilder mit gedrückter Taste; wer nur feuert, wenn er schon auf dem Ziel ist, erreicht fast 100 %. Note = √(Punkte/54 000). Bestwerte bleiben im Browser.
- **Widersprüche Regeltext ↔ Code:** „+0,4 s bei Zerstörung“ → real +2 s (die englische Spielkarte sagt richtig „+2s“); „−0,6 s bei Zeitstrafe“ → real −1 s, immer aktiv; „Combo-Reset bei Fehlschuss“ → nur beim Absturz; „Verweilen generiert Trefferpunkte“ → Punkte nur beim Abschuss; „erratic upward evasions“ → drei Sprungarten, nur 40 % nach oben; „Apex-Richtungswechsel-Latenz“ → wird **nicht** gemessen; „realistische Erdbeschleunigung“ → frei gewählte Pixelwerte (700 px/s² ≈ 0,19 m/s² auf der Bildschirmfläche eines 24″-FHD-Monitors, ≈ 2 % von g; eigene Rechnung). Höhenbonus: Ohne Ausweichstoß steigt das Ziel im 1 080-px-Vollbild (Start ≈ 47 px unter dem Rand) auf Level 1 nur auf ≈ 24–35 % der Höhe, auf hohen Stufen bis ≈ 46 %, mit hoher Combo bis ≈ 51 % (eigene Rechnung) → auf Level 1 oft gar kein Bonus, sonst meist +25; +50 selten, „bis zu +75“ nur nach Aufwärtsstoß oder in kleinen Fenstern.

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite richtet sich an Spielende von Apex Legends, Overwatch 2 und Halo Infinite und verspricht bessere Treffer gegen springende und fliegende Gegner. Begründung: Vertikale Folgebewegung nutze „spezialisierte Bahnen im Kleinhirnwurm (Vermis) und Hirnstamm“ (Krauzlis, 2004), Tracking werde von Geschwindigkeitsfehlern angetrieben (Rashbass, 1961), gute Abfänger sagten den Scheitelpunkt voraus (Land & McLeod, 2000; „Cavanagh et al., 1984“), man solle g = 9,81 m/s² „verinnerlichen“. Das Handgelenk trackt angeblich waagrecht leicht, senkrecht brauche es Finger und Ganzarm. Tipps: Fingerbeugung für Mikrokorrekturen, am Scheitel abbremsen, im Fall unter das Ziel schauen, Arm-Sleeve gegen Reibung. Eine Tabelle nennt „Tiers“ (Predator/Grandmaster ≥ 82 % Trefferquote, Apex-Latenz < 180 ms …).

**Einordnung:**
- **Belegt, aber anders als zitiert:** Die vertikale Folgebewegung des Auges ist tatsächlich schwächer als die horizontale – bei vorhersagbaren Bahnen war der horizontale Gain bei allen Versuchspersonen höher (Rottach et al., 1996); abwärts folgt das Auge schneller und glatter als aufwärts (Ke et al., 2013). Das steht **nicht** bei Krauzlis (2004); eine eigene „Vermis-Bahn für vertikale Pursuit“ weist der Review nicht nach. Er beschreibt Folgebewegung und Sakkaden als eng verwandte Systeme (Krauzlis, 2004).
- **Teilweise:** Geschwindigkeitsfehler treibt die Folgebewegung, Positionsfehler die Sakkade (Rashbass, 1961; Inhalt über Sekundärquellen; Titel auf der Website falsch). Dass am Scheitel die Vertikalgeschwindigkeit null wird, ist Schulphysik, kein Rashbass-Befund. Prädiktives Vorausblicken ist bei Cricket-Schlagmännern belegt (Land & McLeod, 2000; DOI auf der Website falsch) – für Ballflug, nicht für Mausbewegungen.
- **Schwerkraft:** Ein internes Schwerkraftmodell gibt es (McIntyre et al., 2001); visuelle Bewegung, die zur natürlichen Schwerkraft passt, aktiviert das vestibuläre Netzwerk (Indovina et al., 2005). Gerade beim Abfangen per **Mausklick** am Bildschirm rechneten Versuchspersonen aber mit gleichförmiger Bewegung, auch wenn das Ziel beschleunigte (Zago et al., 2004). Hier ist die „Schwerkraft“ außerdem beliebig skaliert und wechselt mit dem Level – „9,81 m/s² verinnerlichen“ ist nicht möglich.
- **Nicht belegt bzw. widersprochen:** „Cavanagh et al. (1984)“ ist nicht identifizierbar. Für Maus-Zielbewegungen waren senkrechte wie waagrechte Richtungen schneller als diagonale (Whisenand & Emurian, 1996; Inhalt über Sekundärquelle) – die Handgelenk-Asymmetrie ist unbelegt. „Blick unter das Ziel“, Fingerbeugung und Arm-Sleeve: unbelegt. „native Pointer-Lock-Hardware-Mausabfrage“: Rohdaten (`unadjustedMovement`) fordert die Vorlage nicht an, die Mausbeschleunigung des Betriebssystems bleibt aktiv (MDN, o. J.).
- **Tabelle ohne Datengrundlage:** Keine der Quellen enthält diese Stufen; die „Apex-Latenz“ misst der Drill nicht einmal. „Every figure … comes from the published work“ ist irreführend.
- **Positiv:** Messhinweis (Bildintervalle, nur gleiche Hardware vergleichen) und Sicherheitshinweis („kein Diagnoseinstrument; bei Schwindel, Kopfschmerz, Doppelbildern aufhören“).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Ziel und Marke sind weit größer als die Auflösungsgrenze des Auges; gefordert ist nur das Erkennen, ob die Marke noch im Band liegt → `sehschaerfe_detail` 1. Der Kontrast ist hoch → `kontrast` 0. Als Faustwert: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°.
- **Folgebewegung mit Beschleunigung:** Die senkrechte Geschwindigkeit ändert sich ständig: am Boden am größten (rechnerisch rund 11 Einheiten/s auf Stufe 1 bis rund 26 Einheiten/s auf Stufe 12; eigene Rechnung aus Schwerkraft und Scheitelhöhe), null am Scheitel, danach beschleunigter Fall. Ein Bogen dauert etwa 3,5 s (Stufe 1) bis 2,3 s (Stufe 12). Der Gain liegt immer unter 0,95 und sinkt mit dem Tempo (Collewijn & Tamminga, 1984). Ein strukturierter Hintergrund senkt den vertikalen Gain um ≈ 20 % (horizontal ≈ 10 %; Collewijn & Tamminga, 1984); hier ist der Hintergrund ruhig.
- **Richtung:** Aufwärts – also beim Abwurf und nach Schüben nach oben – folgt das Auge am schwächsten (Ke et al., 2013); vertikal generell schwächer als horizontal (Rottach et al., 1996) → `blickfolge` 3.
- **Beschleunigung ist schwer zu sehen:** Wahrnehmungs- und Folgeschwellen sind für Beschleunigung höher als für Geschwindigkeit (Watamaniuk & Heinen, 2003). In einem Verdeckungsversuch nutzte das Folgesystem die Beschleunigung für die Vorhersage erst nach 500 oder 800 ms Sicht auf das Ziel, nach 200 ms noch nicht (Bennett et al., 2007). Schübe nach oben setzen die Vorhersage zurück → Aufholsakkaden (Auslöser: vorhergesagte „eye crossing time“, sonst Sakkade nach ≈ 125 ms; de Brouwer et al., 2002) → `sakkaden` 2, `antizipation` 2; der Pfeil kündigt sie vorher an.
- **Brille – der wichtigste Punkt dieser Übung:** Das Ziel steigt vom Boden um etwa 7 bis 19 % der kürzeren Bildschirmseite und fällt zurück. Bei Universal-Gleitsichtgläsern wandert der Blick dabei durch Nah-, Zwischen- und Fernteil: unten (Nahteil, für ≈ 40 cm) ist ein weiter entfernter Bildschirm eher unscharf, oben (Fernteil) für Presbyope ebenfalls; scharf ist nur die schmale Zwischenzone. Die Folge können Kopfnicken statt Augenbewegung und ein Hohlkreuz sein (eigene Folgerung). Bildschirm-Gleitsichtgläser senkten die Kopfneigung am Monitor und verbesserten die Monitorsicht (Jaschinski et al., 2015) → `presbyopie_gleitsicht`. Empfehlung: Bildschirmbrille, Gerät etwas tiefer, kleineres Fenster.
- **Farbe:** Das Band ist sichtbar, und zum Farbwechsel kommt eine Form (Ring und Kreuz); ein Hell/Dunkel-Unterschied genügt, die Aufgabe ist auch bei Rot-Grün-Schwäche (≈ 8 % der Männer) lösbar → `farbunterscheidung` 0.
- **Alter und Augen:** Ältere haben bei allen Geschwindigkeiten einen geringeren Pursuit-Gain (Moschner & Baloh, 1994). Bildschirmarbeit senkt die Lidschlagrate deutlich (Patel et al., 1991; dort bei Bildschirmarbeit allgemein, nicht speziell beim Verfolgen); digitale Augenbelastung ist häufig (Sheppard & Wolffsohn, 2018). Stereosehen: 0.
- **Klinischer Hintergrund:** Die Augenfolgebewegung wird in der Untersuchung qualitativ geprüft, indem die Augen einem nahen Ziel folgen, das in einem H-Muster geführt wird – also auch senkrecht, auf- und abwärts (Hirnnerven III, IV und VI; Muchnick, 2008, S. 32–35). Die Übung ersetzt keine Untersuchung und misst den Blick nicht.

## 5. Neurowissenschaftliche Grundlagen

Bewegungsinformation stammt vor allem aus den Arealen MT/MST; die Streuung der Folgebewegung lässt sich weitgehend auf Rauschen der Bewegungsschätzung in MT zurückführen, und die Folgebewegung setzt erst nach ≈ 100 ms Bewegungsauswertung ein (Lisberger, 2010). Folgebewegung und Sakkaden teilen frontales Augenfeld, Basalganglien und Colliculus superior (Krauzlis, 2004). Dass Kleinhirn und Hirnstamm an der Folgebewegung beteiligt sind, ist Lehrbuchwissen. Vorhersagbare Bewegungen werden antizipiert (Kowler et al., 2019). Visuelle Bewegung, die natürlicher Schwerkraft entspricht, aktiviert ein vestibuläres Netzwerk (fMRT; Indovina et al., 2005); Hinweise auf ein internes Schwerkraftmodell gibt es auch aus Abfangaufgaben (McIntyre et al., 2001), beim Abfangen per Klick am Bildschirm wurde dagegen häufig gleichförmige Bewegung angenommen (Zago et al., 2004). Dass die Übung bestimmte Hirnregionen „trainiert“, ist nicht belegt.

## 6. Motorische Grundlagen

- **Kontinuierliches Nachführen:** Die Marke wird über 11 s mit dem Finger in beiden Richtungen geführt; die Führung ist überwiegend senkrecht → `kontinuierliche_steuerung` 3. Das Band entspricht der Trefferzone (Ring um das Ziel) → `zielbewegung_praezision` 2.
- **Auge und Hand:** Wird ein Ziel mit einem Cursor nachgeführt, bleibt der Blick am Ziel, der Pursuit-Gain steigt und Aufholsakkaden werden seltener (Danion & Flanagan, 2018); das Nachführen mit Auge und Hand verbessert sich mit Übung (Gauthier et al., 1988) → `auge_hand_koordination` 3.
- **Intermittierende Regelung:** Manuelles Tracking korrigiert in Schüben mit ≈ 170 ms Refraktärzeit und toleriert Fehler bis ≈ 0,8° (Miall et al., 1993). Die Hand reagiert auf eine Geschwindigkeitsänderung nach ≈ 200 ms (Brenner et al., 1998). Weil ein Schub nach oben im Scheitel die erwartete Umkehr in eine weitere Aufwärtsbewegung verwandelt, muss die vorausschauend begonnene Abwärtsbewegung gegebenenfalls abgebrochen werden (`inhibition` 1, wie bei den Umkehrungen in 512 und 513).
- **Beschleunigung vorhersagen:** Menschen fangen beschleunigte Objekte gut ab, obwohl sie Beschleunigung schlecht sehen; Fehler sinken, wenn **dieselbe** Beschleunigung wiederholt vorkommt (Brenner et al., 2016). Hier ist die Schwerkraft je Stufe fest, sodass sich die Fallkurve einprägen kann; mit der Stufe ändert sie sich von 6,5 auf 23 Einheiten/s².
- **2D-Steuerung:** Fehler werden auf Geschwindigkeit und Richtung bezogen, nicht getrennt in x und y geregelt (Engel & Soechting, 2000) – ein „isoliertes Training einer Achse“ gibt es motorisch nicht.

## 7. Einflussfaktoren und Messgrenzen

- **Größen relativ zum Bildschirm:** Bögen, Tempo und Band sind in Einheiten der kürzeren Bildschirmseite festgelegt (Höhe und Schwerkraft werden der Feldhöhe angepasst); Sehwinkel und Grad pro Sekunde hängen daher von Gerät und Abstand ab. In sehr flachen Feldern sind die Bögen niedriger.
- **Latenz:** Lokale Systemlatenz liegt in realen Systemen bei 23–243 ms und verschlechtert Tracking schon ab ≈ 41 ms (Ivkovic et al., 2015); die Verzögerung von Touchscreens kommt dazu (Deber et al., 2015). Bei 26 Einheiten/s bedeuten 50 ms zusätzliche Latenz ≈ 1,3 Einheiten Nachlauf – ein erheblicher Teil des Bandradius von 3,35 bis 5 Einheiten (eigene Rechnung).
- **Zufall und Messung:** Scheitelhöhen und Schübe sind zufällig; zwei Läufe sind nicht gleich schwer. Gemessen werden die Zeit im Band (Prozent der Wertungszeit) und der mittlere Abstand zum Ziel, nur bei Fingerkontakt; die Dauer je Durchgang ist fest. Einzelne Durchgänge streuen, wie jede Messung am Menschen; aussagekräftiger ist der Verlauf über mehrere Durchgänge und Tage (vgl. Mountford et al., 2004, zu Mehrfachmessung). Die Reproduzierbarkeit dieser Übung ist nicht untersucht.
- **Alter und Ermüdung:** Pursuit-Gain und Maus-Tracking werden im Alter schwächer (Moschner & Baloh, 1994; Riviere & Thakor, 1996). Wiederholtes Zielen mit der Maus (6 × 5 min) ermüdete die Handgelenkstrecker messbar (Forman et al., 2025); für das Nachführen mit dem Finger nicht untersucht.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Das Nachführen mit Auge und Hand verbessert sich mit Übung (Gauthier et al., 1988); in Daten einer Online-Zielaufgabe (N = 7.174) stiegen die Leistungen über Tage (Listman et al., 2021; Beobachtungsdaten, Anbieterfinanzierung). Für diese Übung gibt es keine Studie; die je Stufe feste Schwerkraft unterstützt das Lernen der Fallkurve (Brenner et al., 2016).
- **Naher Transfer – schwach:** Es gibt nur indirekte Hinweise: 5–10 h Actionspiel verbesserten bei Nicht-Spielenden das Nachführen im Labor (Li et al., 2016) – ein Spiel, keine kurze Übung. Große Effekte digitalen Sehtrainings entstehen vor allem bei gerätegleichen Test- und Übungsaufgaben (Guo et al., 2025).
- **Alltagstransfer – fehlend:** Kein Beleg für bessere Treffer gegen springende Ziele, für Ballsport, Verkehr oder Beruf; „Brain-Training“ zeigt viel Evidenz für die geübte, wenig für entfernte Aufgaben (Simons et al., 2016).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand senkrechtes, beschleunigtes Nachführen üben möchte (Aufstieg, Scheitel, Fall), als Ergänzung zu waagrechten Nachführ-Übungen; keine Lese- oder Gedächtnisanforderung.
- **Weniger passend, wenn …** gleichmäßiges, ruhiges Blickfolgetraining gewünscht ist (eher 105, 404, 514); nur senkrechte Blicksprünge ohne Gerät geübt werden sollen (413); vergleichbare Messwerte gebraucht werden.
- **Vorsicht / anpassen bei …**
  - `presbyopie_gleitsicht`: Der Blick wandert ständig auf und ab durch alle Glaszonen → Bildschirmbrille bzw. passende Zwischenkorrektur, Gerät tiefer halten, kleineres Fenster; Kopf nicht in den Nacken legen.
  - `tremor_parkinson`, `hand_arm_beschwerden`: fortlaufendes Nachführen mit Finger- und Unterarmarbeit → kurze Runden; bei Zittern oder Beschwerden pausieren.
  - `nystagmus`: Die Aufgabe verlangt genau die Folgebewegung, die bei Nystagmus erschwert ist → eher nicht wählen.
  - `migraene_lichtempfindlich`, `photosensitive_epilepsie`: Die Übung arbeitet ohne Blitze und ohne Wackeln; die Übergänge sind weich. Bei bekannter Lichtempfindlichkeit dennoch Vorsicht (Fisher et al., 2005).
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: pausenloses Verfolgen → Pausen zwischen den Runden.
  - `schwindel_vestibulaer`: Es gibt keine 3D-Kamerabewegung und kein Wackeln; die schnelle Auf-und-ab-Bewegung kann Empfindliche dennoch stören (Belastung Schwindel 1) → kurze Runden, bei Beschwerden abbrechen. Wiederkehrender Schwindel, Doppelbilder, plötzliche Sehverschlechterung oder Kopfschmerz mit Sehverschlechterung sind ein Anlass für ärztliche Abklärung und kein Übungsthema (Muchnick, 2008, S. 6, 28).
  - Praxisangabe (keine Studie): Bei Blickfolgeübungen den Kopf ruhig halten, damit die Augenbewegung geübt wird und nicht eine Kopfbewegung.
- **Kombiniert gut mit …** 514 (Tracking auf vorhersagbarer 2D-Bahn), 512 und 513 (waagrechtes Tracking mit Richtungswechseln), 505, 304, 413 (senkrechte Blickwechsel ohne Gerät), 407 (Bahnvorhersage), 105 (glatte Blickfolge), 104, 707, 802 (fallendes Objekt abfangen).
- **Überschneidungen:** In der Gruppe 509–515 keine Dublette: 515 ist die einzige Übung mit überwiegend senkrechter, beschleunigter Bewegung. 514 enthält eine senkrechte Sinuskomponente, aber ohne Beschleunigungsänderungen; 512 und 513 bewegen sich überwiegend waagrecht.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Tablet:** Original nicht bedienbar (Pointer Lock, Maustaste). Eine Touch-Fassung als **Finger-Nachführaufgabe** ist möglich (Engel & Soechting, 2000), braucht aber größere Ziele in mm/Grad, einen Ring gegen Verdeckung durch den Finger (beim Aufwärtsziehen verdeckt die Hand das Ziel nicht, beim Abwärtsziehen schon) und Einplanung von 50–200 ms Touch-Latenz (Deber et al., 2015). Hochformat-Tablets vergrößern die senkrechte Strecke – für Gleitsichtträger begrenzbar machen.
- **Mechanik:** Schwerkraft je Stufe fest halten, damit eine Fallkurve gelernt werden kann (Brenner et al., 2016); Ausweichsprünge optional und vorher angekündigt; Größen in Grad statt Pixeln; oberen Rand begrenzen.
- **Messung:** Abstand Fadenkreuz–Ziel getrennt für Aufstieg, Scheitel und Fall, Wiedereinfangzeit nach Sprüngen; Trefferquote zeitbasiert und unabhängig vom Feuern; feste Rundendauer; Höhenbonus unabhängig von der Fenstergröße.
- **Regeltext:** Zeitbonus (+2 s), Zeitabzug (−1 s, immer aktiv), Punkte nur beim Abschuss und die drei Sprungarten korrekt angeben; keine Tier-Tabelle, keine erfundenen Quellen, keine Transferversprechen; Mausbeschleunigung erwähnen bzw. `unadjustedMovement` anbieten.
- **Barrierefreiheit/Sicherheit:** roten Radialblitz standardmäßig aus, Wackeln abschaltbar; Pausenhinweis bei langen Runden; Gleitsicht-Modus mit Bahn nur im mittleren Drittel der Bildhöhe.

## 11. Quellen
### Von der Website angegeben
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein – Woods misst einfache Reaktionszeit (213–231 ms) im Labor; „Apex-Richtungswechsel-Latenz“ und Tier-Stufen stehen dort nicht (für den allgemeinen Messhinweis allenfalls teilweise).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** nein – weder „spezialisierte Vermis-Bahnen für vertikale Pursuit“ noch „~30°/s“; der Review betont die gemeinsame Architektur von Folgebewegung und Sakkaden.
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt:** nein/kaum – diskretes Zielen, keine Aussage zu Fingerbeugung oder senkrechtem Nachführen.
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, **Titel falsch** („smooth pursuit“ statt „smooth tracking“); **stützt:** teilweise – Geschwindigkeitsfehler treibt die Folgebewegung (über Sekundärquellen); Scheitelpunkt-Aussage ist Physik, kein Befund der Studie.
- Land, M. F., & McLeod, P. (2000). From eye movements to actions: How batsmen hit the ball. *Nature Neuroscience, 3*(12), 1340–1345. https://doi.org/10.1038/81887 – **Prüfung:** **DOI falsch** (angegeben 10.1038/81861 → nicht auflösbar; richtig 10.1038/81887); **stützt:** teilweise – prädiktive Sakkade zum erwarteten Aufsprungpunkt belegt, aber für Ballflug im Cricket, nicht für Maus-Tracking.
- Nur im Text genannt: „Cavanagh, P. R., et al. (1984)“ – **Prüfung:** nicht identifizierbar (Crossref-Suche ohne passenden Treffer); **stützt:** nein – nicht verwendbar.

### Weitere Fachliteratur
- Bennett, S. J., Orban de Xivry, J.-J., Barnes, G. R., & Lefèvre, P. (2007). Target acceleration can be extracted and represented within the predictive drive to ocular pursuit. *Journal of Neurophysiology, 98*(3), 1405–1414. https://doi.org/10.1152/jn.00132.2007 – Beschleunigung für die Vorhersage erst nach 500–800 ms Sicht nutzbar (Crossref und PubMed-Abstract geprüft).
- Brenner, E., Rodriguez, I. A., Muñoz, V. E., Schootemeijer, S., Mahieu, Y., Veerkamp, K., Zandbergen, M., van der Zee, T., & Smeets, J. B. J. (2016). How can people be so good at intercepting accelerating objects if they are so poor at visually judging acceleration? *i-Perception, 7*(1), 2041669515624317. https://doi.org/10.1177/2041669515624317 – Beschleunigung schlecht gesehen, über Wiederholung gelernt.
- Brenner, E., Smeets, J. B. J., & de Lussanet, M. H. E. (1998). Hitting moving targets: Continuous control of the acceleration of the hand on the basis of the target’s velocity. *Experimental Brain Research, 122*(4), 467–474. https://doi.org/10.1007/s002210050535 – Handreaktion auf Geschwindigkeitsänderung ≈ 200 ms.
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Pursuit-Gain, Hintergrundeffekt vertikal ≈ −20 %.
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports, 8*, 10059. https://doi.org/10.1038/s41598-018-28434-6 – Blick beim Hand-Tracking.
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Auslöser und Latenz von Aufholsakkaden.
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. In *Proceedings of CHI ’15* (S. 1827–1836). ACM. https://doi.org/10.1145/2702123.2702300 – Touch-Latenz (Tablet-Variante).
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming: Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 – Erfassen neuer Ziele.
- Engel, K. C., & Soechting, J. F. (2000). Manual tracking in two dimensions. *Journal of Neurophysiology, 83*(6), 3483–3496. https://doi.org/10.1152/jn.2000.83.6.3483 – 2D-Tracking nicht in x/y zerlegbar; Finger-Paradigma.
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Lichtreize und Anfallsrisiko.
- Forman, G. N., Nikitin, S. A., Lang, C. J., Gabriel, D. A., Sonne, M. W., Kociolek, A. M., & Holmes, M. W. R. (2025). Impact of repetitive mouse aiming on muscle fatigue and fine motor performance of the distal upper limb. *Journal of Electromyography and Kinesiology, 82*, 102992. https://doi.org/10.1016/j.jelekin.2025.102992 – Ermüdung.
- Gauthier, G. M., Vercher, J.-L., Mussa Ivaldi, F., & Marchetti, E. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. *Experimental Brain Research, 73*(1), 127–137. https://doi.org/10.1007/BF00279667 – Auge-Hand-Tracking, Lernen.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – gerätegebundene Lerneffekte.
- Indovina, I., Maffei, V., Bosco, G., Zago, M., Macaluso, E., & Lacquaniti, F. (2005). Representation of visual gravitational motion in the human vestibular cortex. *Science, 308*(5720), 416–419. https://doi.org/10.1126/science.1107961 – vestibuläres Netzwerk bei schwerkraftkonformer Bewegung (Crossref und PubMed-Abstract geprüft).
- Ivkovic, Z., Stavness, I., Gutwin, C., & Sutcliffe, S. (2015). Quantifying and mitigating the negative effects of local latencies on aiming in 3D shooter games. In *Proceedings of CHI ’15* (S. 135–144). ACM. https://doi.org/10.1145/2702123.2702432 – Systemlatenz und Tracking.
- Jaschinski, W., König, M., Mekontso, T. M., Ohlendorf, A., & Welscher, M. (2015). Comparison of progressive addition lenses for general purpose and for computer vision: An office field study. *Clinical and Experimental Optometry, 98*(3), 234–243. https://doi.org/10.1111/cxo.12259 – Bildschirm-Gleitsicht.
- Ke, S. R., Lam, J., Pai, D. K., & Spering, M. (2013). Directional asymmetries in human smooth pursuit eye movements. *Investigative Ophthalmology & Visual Science, 54*(6), 4409–4421. https://doi.org/10.1167/iovs.12-11369 – abwärts besser als aufwärts, horizontal besser als vertikal.
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 – prädiktive Folgebewegung.
- Li, L., Chen, R., & Chen, J. (2016). Playing action video games improves visuomotor control. *Psychological Science, 27*(8), 1092–1108. https://doi.org/10.1177/0956797616650300 – Actionspiele und Nachführen.
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – Pursuit-Beginn, MT.
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the “wild” with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 – Übungsverlauf in einer Klick-Zielaufgabe (Anbieterfinanzierung).
- McIntyre, J., Zago, M., Berthoz, A., & Lacquaniti, F. (2001). Does the brain model Newton’s laws? *Nature Neuroscience, 4*(7), 693–694. https://doi.org/10.1038/89477 – internes Schwerkraftmodell (Inhalt über Sekundärquellen).
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – intermittierende Regelung.
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Alter und Pursuit.
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm.
- Riviere, C. N., & Thakor, N. V. (1996). Effects of age and disability on tracking tasks with a computer mouse: Accuracy and linearity. *Journal of Rehabilitation Research and Development, 33*(1), 6–15. PMID 8868412 – Zeitschrift ohne DOI, PubMed geprüft; Maus-Tracking-Bandbreite.
- Rottach, K. G., Zivotofsky, A. Z., Das, V. E., Averbuch-Heller, L., Discenna, A. O., Poonyathalang, A., & Leigh, R. J. (1996). Comparison of horizontal, vertical and diagonal smooth pursuit eye movements in normal human subjects. *Vision Research, 36*(14), 2189–2195. https://doi.org/10.1016/0042-6989(95)00302-9 – horizontaler Gain höher als vertikaler.
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology, 3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – digitale Augenbelastung.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do “brain-training” programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer allgemein.
- Watamaniuk, S. N. J., & Heinen, S. J. (2003). Perceptual and oculomotor evidence of limitations on processing accelerating motion. *Journal of Vision, 3*(11):5, 698–709. https://doi.org/10.1167/3.11.5 – Schwellen für Beschleunigung höher als für Geschwindigkeit, bei Wahrnehmung und Folgebewegung (Crossref und PubMed-Abstract geprüft).
- Zago, M., Bosco, G., Maffei, V., Iosa, M., Ivanenko, Y. P., & Lacquaniti, F. (2004). Internal models of target motion: Expected dynamics overrides measured kinematics in timing manual interceptions. *Journal of Neurophysiology, 91*(4), 1620–1634. https://doi.org/10.1152/jn.00862.2003 – beim Abfangen per Mausklick am Bildschirm wurde gleichförmige Bewegung angenommen (Crossref und PubMed-Abstract geprüft).
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Prüfung der Augenfolgebewegung im H-Muster (S. 32–35), Warnzeichen mit Abklärungsbedarf (S. 6, 28)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Wiederholbarkeit und Mehrfachmessung (Kap. 2, S. 17–18, 44)
