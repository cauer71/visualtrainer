---
# ===== Kennung =====
nr: 504
kennung: recoil-control
name: "Rückstoßausgleich – das hochspringende Fadenkreuz mit gleichmäßigem Gegenzug auf einem ausweichenden Ziel halten"
name_original: "Recoil Control Pro (Seitentitel: Rückstoßkontrolle lernen | FPS Spray Control)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/recoil-control"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Man hält die Maustaste gedrückt, dann wird ein Dauerfeuer simuliert: Mit jedem Schuss springt das Fadenkreuz nach einem festen Muster nach oben und seitlich. Man zieht die Maus gleichmäßig nach unten, um das Fadenkreuz auf einer grünen, dreiteiligen Zielfigur (Kopf, Brust, Beine) zu halten, die seitlich hin und her ausweicht."
ziel_funktionen: [kontinuierliche_steuerung, auge_hand_koordination]
eingabe: [maus]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code stufenlos: Level = Punkte / 1.400 + 1 (ohne Obergrenze). Bis Level 15 steigen der Rückstoß-Faktor 1,8 → ≈ 3,5 (maximale Auslenkung ≈ 74 → ≈ 142 px) und das Zieltempo 75 → ≈ 185 px/s, die Zielfigur schrumpft (Radius 16 → ≈ 12 px), Richtungswechsel kommen öfter (1,3 → ≈ 0,8 s) und ab Level ≈ 2,4 weicht das Ziel auch senkrecht aus. Darüber nähern sich die Werte Grenzen (Faktor 4, 220 px/s, Radius 11 px). Eine lange Trefferserie (Combo) verschärft alles zusätzlich (Rückstoß bis × 1,15, Tempo bis × 1,2, Figur bis × 0,85, Trefferzonen-Zuschlag bis × 0,75)."
messgroessen: ["Punkte (Kopf 100 / Brust 40 / Bein 20 × Combo-Faktor 1–3 × Levelfaktor 1–1,5+)", "Präzision = Treffer / abgegebene Schüsse", "Kopf-, Brust-, Beintreffer", "Magazin-Fehlschläge (< 40 % Treffer in einem Magazin)", "maximale Trefferserie", "erreichtes Level", "sinnvoll zusätzlich: Resthöhenfehler des Fadenkreuzes je Schussnummer (Kompensationsgüte), Anteil Salven vs. Einzelklicks, Lernkurve über Sitzungen"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 1
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 1
    blickfolge: 2
    sakkaden: 1
    fixation: 1
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
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
    zielbewegung_tempo: 1
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 3
    ruhige_hand: 2
    fingergeschwindigkeit: 1
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 1
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Computer mit Maus; Pointer Lock (Zeigersperre) nötig – ohne Touch-Steuerung", "freie Mausfläche, Unterarm aufgelegt; gleichmäßiges Gleiten der Maus", "Bildschirm 50–70 cm, passende Korrektion für diesen Abstand", "kein Farbsehen nötig (Trefferzonen unterscheiden sich durch Lage und Helligkeit, alle grün)", "Akzeptanz des Waffen-/Shooter-Themas"]
vorsicht_bei: [hand_arm_beschwerden, tremor_parkinson, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, sehbehinderung_niedriger_visus, migraene_lichtempfindlich, photosensitive_epilepsie, kinder_unter_6]
geeignet_fuer: ["fortlaufendes Gegensteuern gegen eine vorhersagbare, wiederkehrende Störung mit der Maus üben (Adaptation, Vorwärtsmodell)", "Auge-Hand-Koordination beim Nachführen eines langsam ausweichenden Ziels", "gleichmäßige, dosierte Zugbewegung statt ruckartiger Korrekturen", "Aufwärmen für Menschen, die ohnehin Ego-Shooter spielen; Selbstvergleich auf demselben Gerät"]
weniger_geeignet_fuer: ["Tablet- und Smartphone-Nutzung (nicht spielbar)", "Menschen ohne Maus-Routine oder mit Hand-/Unterarmbeschwerden", "Menschen, die Waffen-Szenarien ablehnen, und Kinder", "Ziele wie visuelle Suche, peripheres Sehen, Gedächtnis oder Lesen", "Erwartung eines Seh-, Konzentrations- oder Alltagsnutzens"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Das Erlernen vorhersagbarer Störungen über interne Modelle ist in Laborstudien robust belegt (Shadmehr & Mussa-Ivaldi 1994; Tseng et al. 2007), bleibt aber aufgabenspezifisch; zur Original-Übung, zu Rückstoß-Drills allgemein und zu einem Transfer ins Spiel oder in den Alltag gibt es keine Studien."
aehnliche_uebungen: [505, 509, 514, 512, 515, 707, 705, 808, 104, 304, 501]
stichworte: ["Recoil Control", "Rückstoßkontrolle", "Spray Control", "Spray Pattern", "Kompensation", "Vorwärtsmodell", "motorische Adaptation", "manuelles Tracking", "Auge-Hand-Koordination", "Ego-Shooter", "FPS", "Maus", "Pointer Lock", "Combo"]
---

# 504 · Rückstoßausgleich – das hochspringende Fadenkreuz mit gleichmäßigem Gegenzug auf einem ausweichenden Ziel halten

> Original: „Recoil Control Pro“ (Seitentitel „Rückstoßkontrolle lernen | FPS Spray Control“) – skilldrills.online,
> Kapitel Zielen (`fps`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Auf fast schwarzem Grund weicht eine kleine grüne Zielfigur aus drei Kreisen (Kopf, Brust, Beine) seitlich aus. Solange
man die linke Maustaste hält, wird im 120-ms-Takt „geschossen“; mit jedem Schuss springt das sichtbare Fadenkreuz nach
einem festen Muster nach oben und pendelt später seitlich. Man führt die Maus gleichmäßig nach unten und seitlich, damit
das Fadenkreuz auf der Figur bleibt. Nach 30 Schuss wird 1,2 s nachgeladen; eine Runde dauert 45 s. Es ist ein
Maus-Geschicklichkeitsspiel im Shooter-Stil – kein Seh- oder Reaktionstest.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Chunk `5501-…js`, 29.09.2026; nur Mechanik). [CODE] = aus dem Code.

- **Eingabe [CODE]:** nur Maus; nach dem Countdown (≈ 2,45 s) `requestPointerLock()` **ohne** `unadjustedMovement`
  (Mausbeschleunigung des Betriebssystems bleibt wirksam; MDN, o. J.); Bewegung = `movementX/Y` × Empfindlichkeit
  (0,1–3, Standard 1). Keine Touch-Handler; reine Touch-Geräte werden erkannt und an den Startbildschirm gemeldet.
- **Schießen [CODE]:** Taste gehalten → ein Schuss je ≥ 120 ms (≈ 8,3/s); Magazin 30 Schuss (≈ 3,6 s), dann 1.200 ms
  Nachladen. Der Takt hängt am Bildtakt: bei 60 Hz 133 ms, bei 144 Hz 125 ms, bei 240 Hz ≈ 121 ms [ER] – bis ≈ 10 %
  Unterschied in Schusszahl und Punkten. Bewegungen sind dagegen zeitbasiert (Δt, höchstens 100 ms) ✓.
- **Rückstoßmuster [CODE]:** feste Liste mit 30 Punkten (eine je Schussnummer), jede Runde gleich, **ohne Zufall**.
  Senkrecht −4, −8, −13 … bis −41 Einheiten bei Schuss 10–11, dann Plateau; waagerecht erst leicht links, dann Pendeln
  zwischen ≈ +9 und −9 (≈ 12–14 Schuss je Schwingung, ≈ 0,7 Hz [ER]). Faktor 1,8 (Level 1) bis ≈ 3,5 (Level 15),
  Combo-Zuschlag bis × 1,15 → maximale Höhe ≈ 74–164 px, Seitenpendeln ≈ 16–36 px [ER].
- **Wichtig [CODE]:** Der Rückstoß ist ein Versatz, der zur Mausposition addiert wird (gezeichnetes Fadenkreuz = Maus +
  Versatz). **Loslassen setzt das Muster auf Schuss 1 zurück.** Kurze Salven oder schnelles Einzelklicken umgehen damit
  fast den ganzen Rückstoß (Schuss 1: −7 bis −16 px). Die Seite empfiehlt „gezieltes Absetzen und Zurücksetzen“ zwar selbst, aber weil das Muster ohne Erholzeit sofort zurückspringt, kosten Salven hier nichts – die Übung belohnt diese Taktik stärker als das Ausgleichen langer Serien.
- **Ziel [CODE]:** Kopf (Radius 0,4 r, 0,75 r über der Mitte, hellstes Grün, weißer Rand), Brust (0,7 r, halbtransparent),
  Beine (0,55 r, 0,75 r darunter, 22 % Deckkraft); r = 16 → ≈ 12 px (Level 15, min. 10 px); Trefferzonen 7 → ≈ 4 px
  größer als gezeichnet. Waagerechtes Tempo 75 → ≈ 185 px/s (× 0,7–1,3), neu ausgeloste Richtung (50 : 50) und Tempo alle 1,3 → ≈ 0,8 s
  (± 30 %), Abprallen am Rand; ab Level ≈ 2,4 bei 65 % der Wechsel auch senkrechte Bewegung.
- **Punkte [CODE]:** Kopf 100 / Brust 40 / Bein 20 × Combo-Faktor (1,1 ab 3 … 1,5 ab 10 … 3 ab 50 Treffern in Folge) ×
  Levelfaktor 1 + 0,5 × (Level − 1)/14; jeder Fehlschuss setzt die Combo auf 0. Level = Punkte/1.400 + 1 (stufenlos).
  Note: √(Punkte/54.000) × 100 (S+ ab 95 ≙ ≈ 48.700 Punkte).
- **„Magazin-Disziplin“ [CODE]:** Magazin leer mit < 40 % Treffern (< 12/30) → Fehlschlag, Combo 0, roter
  Blitz-Effekt (CSS-Klasse `fx-flash-red`, vermutlich vollflächig; 480 ms, wenn Effekte an); −0,6 s **nur** im
  global aktivierbaren Strafmodus (Standard: aus).
- **Widersprüche Regeltext ↔ Code:** „Kopftreffer +0,25 s“ gibt es nicht (englische Regel: „No Time Bonus“); der
  „Streuradius in Pixel“ der Tabelle wird nicht gemessen; „10 Schuss < 700 ms“ – hier 1,08 s; das laut FAQ
  „pseudozufällige“ Seitenwackeln ist hier fest; unerwähnt bleibt, dass die Combo Tempo, Rückstoß und Zielgröße verschärft.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite nennt Rückstoßkontrolle ein „vorprogrammiertes Open-Loop-Bewegungsprogramm“ (Generalisiertes Motorisches
Programm nach Schmidt & Lee), das „fest im motorischen Kortex verankert“ werden müsse, weil visuelle Korrekturen zu
langsam seien (> 180 ms). Sie beruft sich auf Woodworth, Meyer, Fitts und Schmidt, verspricht „extrem dichte
Treffergruppen“ in CS2, Valorant, Apex und CoD, nennt waffenspezifische Muster, eine Rangtabelle („Weltklasse < 18 px
Streuung, > 90 % Treffer“) und „2–3 Wochen à 15 min“ bis zur Automatisierung. Zielgruppe: Shooter-Spieler:innen.

- **Teilweise richtig:** Motorisches Rauschen wächst mit dem Steuersignal (Harris & Wolpert, 1998) – gleichmäßiger Zug ist
  plausibel günstiger als Ruckeln. „Logarithmisch“ stimmt nicht; bei Schmidt et al. (1979) wächst die Streuung annähernd
  linear mit Impuls bzw. Geschwindigkeit.
- **Zu eng:** „Nur Open-Loop“ – die Hand korrigiert visuelle Abweichungen nach ≈ 110–160 ms (Brenner & Smeets, 1997;
  Saunders & Knill, 2003); das Fadenkreuz ist ständig sichtbar, eine Korrektur hinkt nur etwa einen Schuss nach.
  Realistisch: **gelerntes Vorwärtsmodell plus laufende Rückkopplung** (Shadmehr et al., 2010; Todorov & Jordan, 2002).
- **Nicht belegt:** „Verankerung im motorischen Kortex“; „Verkrampfen blockiert Propriozeption“ (steht nicht bei Schmidt;
  gezielte Steifigkeit stabilisiert eher, Burdet et al., 2001); „2–3 Wochen“ (Aim-Lab-Lernkurven stiegen bis zu 100 Tage,
  Listman et al., 2021). Fitts' Gesetz und Zwei-Komponenten-Modell gelten für Einzelbewegungen, hier nur als Analogie.
- **Keine Datengrundlage:** die Rang-/Pixel-Tabelle (keine Quelle enthält FPS-Normen; die Übung misst keine Streuung).
  Waffen- und Spielangaben sind Spielinhalte, wissenschaftlich nicht prüfbar.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel [ER]** (1 CSS-px ≈ 0,26 mm, 60 cm, 1° ≈ 40 px): Kopfkreis ≈ 0,32° (Trefferzone ≈ 0,67°), Brust ≈ 0,56°,
  Fadenkreuz-Ring ≈ 0,75°; Rückstoßhöhe ≈ 1,8–4,1°, Seitenpendeln ≈ 0,4–0,9°. Weit über der Sehschärfegrenze – Detailsehen
  ist Nebensache, unkorrigierte Fehlsichtigkeit macht die kleinen Zonen aber unscharf.
- **Blickfolge:** Zieltempo ≈ 1,3–2,4°/s (Level 1) bis ≈ 7°/s [ER] – Bereich mit hohem, aber < 0,95 liegendem Folge-Gain
  (Collewijn & Tamminga, 1984). Beim Handtracking folgt der Blick sogar besser als beim bloßen Zusehen (Danion &
  Flanagan, 2018); Richtungswechsel erzeugen kleine Aufholsakkaden.
- **Farbe/Kontrast:** alle Zonen grün auf Schwarz, unterschieden durch Lage und Helligkeit → bei Farbsehschwäche (≈ 8 %
  der Männer; Birch, 2012) spielbar; die Beinzone (22 % Deckkraft) ist kontrastarm, im Alter schlechter sichtbar.
- **Gleitsicht:** Das 16 : 9-Feld (≈ 25–30° breit bei 60 cm, im Vollbild mehr) übersteigt den klaren Zwischenbereich
  (13–18°; Han et al., 2003); am Rand muss der Kopf mitgehen → Bildschirmbrille oder kleineres Fenster. 60 cm Abstand
  verlangen ≈ 1,67 dpt Akkommodation [ER].
- **Trockenes Auge:** ununterbrochenes Hinsehen; bei schnellen Spielen sinkt der Lidschlag auf ≈ ⅓ (Cardona et al., 2011).

## 5. Neurowissenschaftliche Grundlagen

- **Interne Modelle:** Vorhersagbare Störungen werden über ein internes Modell gelernt und ausgeglichen; Nacheffekte
  zeigen, dass es gespeichert ist (Shadmehr & Mussa-Ivaldi, 1994). Gelernt wird Versuch für Versuch aus dem Fehler
  (Thoroughman & Shadmehr, 2000), angetrieben von **sensorischen Vorhersagefehlern** (Shadmehr et al., 2010).
- Das Rückstoßmuster ist eine **visuomotorische Störung** (gesehenes Fadenkreuz ≠ Handposition). Die Anpassung daran ist
  **kleinhirnabhängig**; Menschen mit Kleinhirnataxie adaptieren deutlich schwächer (Tseng et al., 2007). Das beschreibt
  die beteiligte Struktur – kein Beleg, dass die Übung das Kleinhirn „trainiert“.
- **Rückkopplung:** Manuelles Nachführen korrigiert intermittierend (Fehler-Totzone ≈ 0,8° beim Joystick-Tracking,
  bei schnellen Zielen Abstände vereinbar mit ≈ 170 ms Refraktärzeit; Miall et al., 1993); korrigiert werden vor allem aufgabenrelevante Abweichungen (Todorov & Jordan, 2002).
- Beim Verfolgen des Ziels arbeitet das Netzwerk der Folgebewegung (MT/MST, FEF, Kleinhirn; Krauzlis, 2004).

## 6. Motorische Grundlagen

- **Aufgabe:** kompensatorisches Tracking einer festen, zeitlich ablaufenden Auslenkung plus reaktives Nachführen eines
  zufällig ausweichenden Ziels – zwei überlagerte Steuerprobleme in derselben Hand.
- **Laborbefund:** Beim Tracking unter einem ablenkenden Kraftfeld wird der Ausgleich rasch gelernt, das intermittierende
  Grundmuster bleibt; Kraftsteuerung und Armsteifigkeit teilen sich die Arbeit (≈ 80 : 20 %; Squeri et al., 2010).
- **Rauschen und Tremor:** Große, schnelle Korrekturimpulse streuen stärker (Harris & Wolpert, 1998). Physiologischer
  Tremor (EMG-Gipfel 9–12 Hz bei Jüngeren, bei einzelnen Älteren 5–7 Hz; Elble, 2003) wirkt direkt auf Zonen von 0,3–0,7°.
- **Gerät:** Mausweg je Pixel hängt von DPI, Beschleunigung und Empfindlichkeit ab; eine neue Übersetzung (Gain) wird
  rasch gelernt und verallgemeinert (Krakauer et al., 2000).
- **Belastung:** gehaltene Taste plus dosierter Unterarmzug, ≈ 9 Magazine je Runde [ER]; bei College-Esportlern 36 %
  Handgelenk-, 32 % Handbeschwerden (DiFrancisco-Donoghue et al., 2019).

## 7. Einflussfaktoren und Messgrenzen

- **Taktik statt Fähigkeit:** Da Loslassen das Muster zurücksetzt, misst die Präzision vor allem Salvenabbruch, nicht die
  Kompensationsgüte (ein Restfehler je Schussnummer wird nicht erfasst).
- **Gerät:** bildratenabhängiger Schusstakt; Systemlatenz senkt die Zeit auf dem Ziel (−5,8 % bei 41 ms bis −32,7 % bei
  164 ms; Ivkovic, 2017); Mausbeschleunigung aktiv; Feldgröße ändert Sehwinkel und Mausweg.
- **Zufall und Übung:** Zielbewegung zufällig → nur Mittel mehrerer Runden am selben Gerät vergleichen. Frühe Zuwächse
  spiegeln Aufgabenvertrautheit (Reaktionszeit: trainingsgleiche Tests SMD 2,66 vs. unähnliche 0,50; Guo et al., 2025).
- **Person:** Alter, Müdigkeit, Tremor, Maus-Erfahrung; Normwerte gibt es nicht.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Lernen vorhersagbarer Störungen ist im Labor robust (Shadmehr & Mussa-Ivaldi, 1994; Tseng et
  al., 2007; Squeri et al., 2010); Aim-Trainer-Leistung steigt mit Übung (Listman et al., 2021, N = 7.174; Klickaufgaben,
  herstellerfinanziert). Zu dieser Übung oder zu Rückstoß-Drills gibt es keine Studie.
- **Naher Transfer – schwach:** Adaptationen bleiben weitgehend an Aufgabe und Störung gebunden; Transfer eines
  2D-Browsermusters auf andere Muster oder 3D-Spiele ist nicht untersucht (vgl. Krakauer et al., 2019).
- **Alltagstransfer – fehlend:** kein Beleg; Metaanalysen zu Action-Spielen schließen motorische Maße mangels Daten aus
  (Bediou et al., 2023).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand mit Maus-Routine gleichmäßiges Gegensteuern und Auge-Hand-Koordination beim Nachführen üben
  will; als Aufwärmen für Shooter-Spieler:innen; Selbstvergleich am selben Gerät.
- **Weniger passend, wenn …** nur ein Tablet vorhanden ist; Sehfunktionen, Suche, Gedächtnis oder Lesen im Fokus stehen;
  Waffen-Szenarien abgelehnt werden; keine Maus-Erfahrung besteht.
- **Vorsicht / anpassen bei …** `hand_arm_beschwerden`, `tremor_parkinson` (Dauerzug, kleine Zonen → kurze Runden);
  `presbyopie_gleitsicht` (Ziel pendelt über die volle Breite → Bildschirmbrille, kleineres Fenster);
  `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie` (Dauerfixieren → Pausen, blinzeln); `sehbehinderung_niedriger_visus`
  (kleine, teils kontrastarme Zonen); `migraene_lichtempfindlich`, `photosensitive_epilepsie` (vorsorglich: kleine
  Treffereffekte im 8-Hz-Takt, optionaler roter Blitz-Effekt höchstens ≈ alle 4,8 s, weit unter 3 Blitzen/s);
  `kinder_unter_6` (Shooter-Thema, Feinmotorik).
- **Kombiniert gut mit …** 505, 514, 512, 515 (Tracking), 509 (Mikrokorrektur), 707 (Pfad folgen), 705, 808 (ruhige
  Hand), 104 (Zielverfolgung ohne Shooter-Thema).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Tablet:** ohne Maus unspielbar; Touch steuert die Position direkt, „Rückstoß“ verliert den Kern. Touch-Variante:
  Finger hält einen Punkt auf einem Ziel, das sich zusätzlich nach festem, sanftem Muster verschiebt; Ziele ≥ 9 mm
  (Parhi et al., 2006).
- **Thema:** neutral (Kreis statt Menschfigur, kein Schießen, kein Waffensound).
- **Messqualität:** Restfehler je Musterschritt und Lernkurve erfassen; Loslassen-Trick schließen (Muster zeitbasiert
  zurücksetzen); Takt bildratenunabhängig; `unadjustedMovement` nutzen.
- **Transparenz/Sicherheit:** Regeltext an den Code anpassen, Rangtabelle entfernen; kein roter Blitz-Effekt,
  kontrastreichere Beinzone, Pausenhinweis, einstellbare Zielgröße und Tempo; Farbe nie einziges Merkmal.

## 11. Quellen

### Von der Website angegeben

- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein (einfache Tastenreaktion; nichts zu `performance.now()`, Browser- Timern, Bildraten oder Rückstoß).
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise/nein (gilt für einzelne Zielbewegungen, nicht für fortlaufende Kompensation).
- Meyer, D. E., Abrams, R. A., Kornblum, S., Wright, C. E., & Smith, J. E. K. (1988). Optimality in human motor performance: Ideal control of rapid aimed movements. *Psychological Review, 95*(3), 340–370. https://doi.org/10.1037/0033-295X.95.3.340 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Primär- plus Korrekturbewegung bei diskretem Zielen; auf Dauerfeuer nur als Analogie übertragbar; keine Normwerte).
- Schmidt, R. A., & Lee, T. D. (2011). *Motor control and learning: A behavioral emphasis* (5. Aufl.). Human Kinetics. ISBN 978-0-7360-7961-7 – **Prüfung:** Buch, keine DOI ✓ (bibliografisch korrekt); **stützt:** teilweise (GMP als Theorie ja; „reines Open-Loop, schneller als visuelle Rückkopplung“ widerspricht Korrekturlatenzen von 110–160 ms).
- Schmidt, R. A., Zelaznik, H., Hawkins, B., Frank, J. S., & Quinn, J. T. (1979). Motor-output variability: A theory for the accuracy of rapid motor acts. *Psychological Review, 86*(5), 415–451. https://doi.org/10.1037/0033-295X.86.5.415 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Streuung wächst mit Kraft/Impuls – ja, aber annähernd linear, nicht „logarithmisch“; zu Propriozeption und „Sehnenelastizität“ nein).
- Woodworth, R. S. (1899). The accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3), i–114. https://doi.org/10.1037/h0092992 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Zwei-Komponenten-Modell für Zielbewegungen; keine Aussage zu Rückstoß; Leistungstabelle ohne Grundlage).

### Weitere Fachliteratur

- Shadmehr, R., & Mussa-Ivaldi, F. A. (1994). Adaptive representation of dynamics during learning of a motor task. *The Journal of Neuroscience, 14*(5), 3208–3224. https://doi.org/10.1523/JNEUROSCI.14-05-03208.1994 – internes Modell für vorhersagbare Störungen, Nacheffekte
- Thoroughman, K. A., & Shadmehr, R. (2000). Learning of action through adaptive combination of motor primitives. *Nature, 407*(6805), 742–747. https://doi.org/10.1038/35037588 – Lernen Versuch für Versuch aus dem Fehler
- Shadmehr, R., Smith, M. A., & Krakauer, J. W. (2010). Error correction, sensory prediction, and adaptation in motor control. *Annual Review of Neuroscience, 33*, 89–108. https://doi.org/10.1146/annurev-neuro-060909-153135 – Vorwärtsmodelle, Adaptation durch Vorhersagefehler
- Tseng, Y., Diedrichsen, J., Krakauer, J. W., Shadmehr, R., & Bastian, A. J. (2007). Sensory prediction errors drive cerebellum-dependent adaptation of reaching. *Journal of Neurophysiology, 98*(1), 54–62. https://doi.org/10.1152/jn.00266.2007 – visuomotorische Adaptation kleinhirnabhängig
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – intermittierende Korrekturen (≈ 170 ms, Fehlertoleranz ≈ 0,8°)
- Squeri, V., Masia, L., Casadio, M., Morasso, P., & Vergaro, E. (2010). Force-field compensation in a manual tracking task. *PLoS ONE, 5*(6), e11189. https://doi.org/10.1371/journal.pone.0011189 – Tracking plus Störungsausgleich
- Todorov, E., & Jordan, M. I. (2002). Optimal feedback control as a theory of motor coordination. *Nature Neuroscience, 5*(11), 1226–1235. https://doi.org/10.1038/nn963 – nur aufgabenrelevante Abweichungen korrigieren
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Folge-Gain < 0,95
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports, 8*, 10059. https://doi.org/10.1038/s41598-018-28434-6 – Blickfolge beim Handtracking
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – Netzwerk der Folgebewegung
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Lerneffekt vs. Transfer
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of MobileHCI '06* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – Mindestgröße Touch-Ziele
- Harris, C. M., & Wolpert, D. M. (1998). Signal-dependent noise determines motor planning. *Nature, 394*(6695), 780–784. https://doi.org/10.1038/29528 – Rauschen wächst mit dem Steuersignal
- Burdet, E., Osu, R., Franklin, D. W., Milner, T. E., & Kawato, M. (2001). The central nervous system stabilizes unstable dynamics by learning optimal impedance. *Nature, 414*(6862), 446–449. https://doi.org/10.1038/35106566 – gezielte Steifigkeit statt Verkrampfen
- Brenner, E., & Smeets, J. B. J. (1997). Fast responses of the human hand to changes in target position. *Journal of Motor Behavior, 29*(4), 297–310. https://doi.org/10.1080/00222899709600017 – Handkorrektur nach ≈ 110 ms
- Saunders, J. A., & Knill, D. C. (2003). Humans use continuous visual feedback from the hand to control fast reaching movements. *Experimental Brain Research, 152*(3), 341–352. https://doi.org/10.1007/s00221-003-1525-2 – laufende visuelle Rückkopplung (≈ 160 ms)
- Krakauer, J. W., Pine, Z. M., Ghilardi, M.-F., & Ghez, C. (2000). Learning of visuomotor transformations for vectorial planning of reaching trajectories. *The Journal of Neuroscience, 20*(23), 8916–8924. https://doi.org/10.1523/JNEUROSCI.20-23-08916.2000 – Gain-Lernen verallgemeinert
- Krakauer, J. W., Hadjiosif, A. M., Xu, J., Wong, A. L., & Haith, A. M. (2019). Motor learning. *Comprehensive Physiology, 9*(2), 613–663. https://doi.org/10.1002/cphy.c170043 – Grenzen von Laborparadigmen
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the "wild" with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 – Aim-Lab-Lernkurven (herstellerfinanziert)
- Bediou, B., Rodgers, M. A., Tipton, E., Mayer, R. E., Green, C. S., & Bavelier, D. (2023). Effects of action video game play on cognitive skills: A meta-analysis. *Technology, Mind, and Behavior, 4*(1), 28–48. https://doi.org/10.1037/tmb0000102 – kein motorischer/Alltagstransfer belegt
- Ivkovic, Z. (2017). *Characterizing the effects of local latency on aim performance in first person shooters* [Masterarbeit, University of Saskatchewan]. https://harvest.usask.ca/bitstream/10388/7707/1/IVKOVIC-THESIS-2017.pdf – keine DOI; Latenz und Tracking
- Elble, R. J. (2003). Characteristics of physiologic tremor in young and elderly adults. *Clinical Neurophysiology, 114*(4), 624–635. https://doi.org/10.1016/S1388-2457(03)00006-3 – Tremorfrequenzen
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht-Zwischenbereich
- Cardona, G., García, C., Serés, C., Vilaseca, M., & Gispets, J. (2011). Blink rate, blink amplitude, and tear film integrity during dynamic visual display terminal tasks. *Current Eye Research, 36*(3), 190–197. https://doi.org/10.3109/02713683.2010.544442 – Lidschlag bei schnellen Spielen
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Farbsehschwäche
- DiFrancisco-Donoghue, J., Balentine, J., Schmidt, G., & Zwibel, H. (2019). Managing the health of the eSport athlete: An integrated health management model. *BMJ Open Sport & Exercise Medicine, 5*(1), e000467. https://doi.org/10.1136/bmjsem-2018-000467 – Hand-/Handgelenkbeschwerden
- MDN Web Docs. (o. J.). *Element: requestPointerLock() method*. Abgerufen am 29.09.2026 von https://developer.mozilla.org/en-US/docs/Web/API/Element/requestPointerLock – `unadjustedMovement`, keine Unterstützung in Safari iOS/iPadOS
