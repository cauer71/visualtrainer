---
# ===== Kennung =====
nr: 505
kennung: strafe-tracking
name: "Strafe-Tracking – Fadenkreuz auf einem seitlich ausweichenden Ziel halten"
name_original: "Strafe Tracking Aim Trainer (Seitentitel: Tracking Aim Training | Strafe-Übung)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/strafe-tracking"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Eine hochkant stehende, leuchtende Kapsel (angedeutete Spielfigur) läuft mit gleichbleibendem Tempo waagrecht über die Bildmitte und kehrt in zufälligen Abständen die Richtung um. Man hält das Mausfadenkreuz ohne zu klicken möglichst ununterbrochen auf der Kapsel; gezählt werden Zeit auf dem Ziel und ununterbrochene Serien."
ziel_funktionen: [kontinuierliche_steuerung, auge_hand_koordination, blickfolge]
eingabe: [maus]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code Level = Punkte/1.400 + 1 (nur beim Serienaufstieg aktualisiert, ohne Obergrenze). Mit dem Level laufen Kapselbreite 52 → 24 px (min. 20), Kapselhöhe 156 → 80 px, Tempo 280 → 750 px/s und Entscheidungsabstand 600 → 200 ms (+0–200 ms Zufall, min. 120 ms) exponentiell auf Grenzwerte zu (Level 15: 31 px, 637 px/s, 296 ms). Eine lange Serie verschärft zusätzlich (Tempo +15 %, Größe −15 %, Abstand −20 %). Die Uhr verlängert sich um 0,4 s je Sekunde auf dem Ziel: 45 s nominal, bis 75 s real."
messgroessen: ["Punkte und Note (Wurzel aus Punkte/54.000)", "Tracking-Quote = Anteil der Bilder mit Fadenkreuzmitte in der Kapsel (%)", "längste ununterbrochene Serie auf dem Ziel (ganze Sekunden)", "Zeit neben dem Ziel (s), erreichtes Level", "sinnvoll ergänzend: Wiedereinfangzeit nach jeder Umkehr, mittlerer horizontaler Abstand, Nachlauf der Hand, zeitgewichtete Quote"]

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
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 1
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 2
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
voraussetzungen: ["Computer mit Maus und Pointer Lock (reine Touch-Geräte werden mit „Mouse Required for Pointer Lock“ abgewiesen)", "freie Mausfläche, bequeme Unterarm-/Handgelenkhaltung", "scharfes Sehen im Bildschirmabstand (≈ 50–75 cm) über die ganze Bildbreite", "Spieloberfläche englisch, Spiel ohne Lesen bedienbar; kein Farbsehen nötig (Rot/Grün nur als Zusatzrückmeldung)"]
vorsicht_bei: [hand_arm_beschwerden, tremor_parkinson, nystagmus, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, migraene_lichtempfindlich, photosensitive_epilepsie, farbsehschwaeche]
geeignet_fuer: ["fortlaufendes Nachführen eines bewegten Ziels mit der Maus üben (Auge-Hand-Abstimmung)", "nach plötzlichen Richtungsumkehrungen rasch und ohne weites Überschießen wieder aufs Ziel kommen", "waagrechte Blickfolge mit Aufholsakkaden in einer kurzen, klickfreien Aufgabe", "Aufwärmen bzw. Selbstvergleich auf demselben Gerät für Menschen, die ohnehin Ego-Shooter spielen"]
weniger_geeignet_fuer: ["Tablet- oder Smartphone-Nutzung (Original nicht bedienbar)", "Menschen mit Zittern oder Hand-/Handgelenkbeschwerden", "ruhiges, vorhersagbares Blickfolgetraining (Umkehrungen sind absichtlich zufällig)", "senkrechte Blickfolge (Ziel bewegt sich nur waagrecht)", "Wunsch nach Norm- oder Leistungsvergleichen", "Erwartung eines Seh- oder Alltagsnutzens"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Auge-Hand-Tracking und Aim-Trainer-Leistung verbessern sich mit Übung (Gauthier et al., 1988; Listman et al., 2021), zu diesem Drill gibt es keine Studie; Actionspiele (nicht Drills) verbesserten eine Labor-Nachführaufgabe (Li et al., 2016), ein Transfer von Aim-Trainern auf Spielleistung oder Alltag ist nicht kontrolliert untersucht."
aehnliche_uebungen: [512, 513, 514, 515, 507, 304, 305, 104, 105, 404, 410, 415, 707]
stichworte: ["Strafe Tracking", "Tracking Aim", "ADAD", "reaktives Tracking", "manuelles Nachführen", "Time on Target", "Richtungsumkehr", "Aufholsakkade", "Smooth Pursuit", "Auge-Hand-Koordination", "Aim Trainer", "Maus", "Pointer Lock"]
---

# 505 · Strafe-Tracking – Fadenkreuz auf einem seitlich ausweichenden Ziel halten

> Original: „Strafe Tracking Aim Trainer“ (Seitentitel „Tracking Aim Training | Strafe-Übung“) – skilldrills.online,
> Kapitel Zielen (`fps`) · Blickfit: noch nicht umgesetzt (verwandt: `zielfang`, `scharf-in-bewegung`)

## 1. Kurzbeschreibung
Auf fast schwarzem Grund mit schwachen, perspektivisch zur Bildmitte laufenden Linien steht eine leuchtend grüne, hochkant gestellte Kapsel – eine stark vereinfachte Spielfigur. Sie läuft gleichmäßig schnell nach links oder rechts und kehrt in kurzen, zufälligen Abständen um, wie ein Gegner, der im Shooter mit den Tasten A und D ausweicht („Strafing“). Man bewegt das Fadenkreuz mit der Maus und hält es ununterbrochen auf der Kapsel; geklickt wird nicht. Solange man trifft, ist die Kapsel grün, sonst rot. Jede Sekunde ohne Unterbrechung verlängert die Serie; schon ein kurzes Abrutschen beendet sie.

## 2. Ablauf im Original (Analyse)
Grundlage: Seitentext und ausgelieferter Spiel-Chunk (`41101-…js`, formatiert; nur Mechanik gelesen, gemeinsame Module für Schwierigkeitskurve, Serienfaktor, Note und Einstellungen wie bei 501/512). **[CODE]** = aus dem Code; Winkel = eigene Rechnung für einen 24″-Full-HD-Monitor im Vollbild in 60 cm Abstand (≈ 38 px/° in Bildmitte).

- **Rahmen [CODE]:** Start-Karte → Countdown 3-2-1-GO (2,45 s) → Pointer Lock → Spiel → Auswertung. Spielfeld 16:9 (auf Hochformat-Handys 3:4) oder Vollbild; Verlassen von Vollbild oder Pointer Lock bricht ab. Das Fadenkreuz (weißer Ring Ø 32 px ≈ 0,84°, vier Striche, Mittelpunkt Ø 4 px) folgt `movementX/Y` × Empfindlichkeit (gemeinsame Einstellung, Standard 1). `requestPointerLock()` wird **ohne** `unadjustedMovement` aufgerufen – die Mausbeschleunigung des Betriebssystems bleibt wirksam. Geräte mit Touch, aber ohne feinen Zeiger werden abgewiesen.
- **Ziel und Bewegung [CODE]:** Kapsel auf halber Bildhöhe, **nur waagrecht** bewegt (senkrecht 0). Level 1: 52 px breit (≈ 1,4°), 156 px hoch (≈ 4,1°), 280 px/s (≈ 7,4°/s). Das Tempo ist **konstant**; an jedem Entscheidungszeitpunkt wird die Richtung zufällig 50 : 50 neu gewählt – nur jede zweite Entscheidung ist eine echte Umkehr. Nächste Entscheidung nach Grundabstand + 0–200 ms (Level 1: 600–800 ms) → echte Umkehr im Mittel ≈ alle 1,4 s; zusätzlich vorhersehbares Abprallen 30 px vor dem Rand. Tempowechsel springen ohne Brems- oder Beschleunigungsphase.
- **Treffer [CODE]:** „Auf dem Ziel“, wenn der Fadenkreuz-**Mittelpunkt** innerhalb der Kapsel liegt (kein Zusatzsaum wie bei 512). Waagrechte Toleranz = Kapselradius (Level 1 ± 26 px ≈ ± 0,7°); senkrecht ist die Kapsel großzügig.
- **Schwierigkeit [CODE]:** gemeinsame Exponentialkurve der Vorlage (Level 15 = 76 % des Weges zum Grenzwert). Level 6: 45 px (1,2°), 404 px/s (10,6°/s), 495–695 ms; Level 15: 31 px (0,8°), 637 px/s (16,8°/s), 296–496 ms. Mit voller Serie (≥ 50 s) zusätzlich Tempo +15 %, Größe −15 %, Abstand −20 %.
- **Punkte [CODE]:** je 0,25 s **ununterbrochen** auf dem Ziel round(50 × Serienfaktor × (1 + 0,5 × (Level − 1)/14)) Punkte und +0,1 s Spielzeit (Uhr max. 60 s). Die Serie steigt um 1 je volle Sekunde auf dem Ziel (Faktor 1,1 ab 3 … 3,0 ab 50). **Jedes Bild neben dem Ziel setzt Serie, Sekundenzähler und 0,25-s-Zähler sofort auf 0.**
- **Fehler-Rückmeldung [CODE]:** Nach je 1 s ununterbrochen neben dem Ziel: Fehlerton, rote Partikel, Bildwackeln (6 px, klingt bildweise ab) und – Standard an, abschaltbar – ein roter, bildschirmfüllender Blitz (gemeinsame Effektklasse `fx-flash-red`, wie 501/512); also höchstens 1 Blitz/s. Die Zeitstrafe −0,6 s greift nur mit der Einstellung „Strafen“ (Standard **aus**).
- **Zeit und Messung [CODE]:** Bewegung und Uhr mit echter Bildzeit (dt, gekappt bei 100 ms) → gleich schnell bei 60 und 144 Hz; nur Partikel und Wackeln laufen pro Bild. „Tracking-Quote“ = Bilder auf dem Ziel / alle Bilder (nicht zeitgewichtet). Note = √(Punkte/54.000); „S+“ ab ≈ 48.700 Punkten. Bestwerte nur im Browser.
- **Eigene Simulation [ER]:** Fehlerfreies Folgen ergibt 75 s, ≈ 54.900 Punkte, Level ≈ 39 und „S+“. Ein rein reaktiver Regler mit 120–180 ms Verzögerung erreicht ≈ 55–70 % Quote, beste Serie 2–3 s, Level ≈ 4–6 und ≈ 4.000–7.500 Punkte (Note D/F). Grund: Nach einer Umkehr bleibt selbst bei idealem „Nachlaufen“ an der hinteren Kante nur Radius/Tempo Zeit (Level 1: 93 ms, Level 6: 55 ms, Level 15: 24 ms) – weniger als die Reaktionszeit der Hand (≈ 110–200 ms; Brenner & Smeets, 1997; Brenner et al., 1998). **Jede echte Umkehr beendet die Serie**; lange Serien entstehen vor allem, wenn der Zufall mehrere Entscheidungen ohne Umkehr liefert.
- **Widersprüche Regeltext ↔ Code:** „1,0 s Zielverlust setzt Combo zurück“ → Serie endet sofort beim ersten Bild daneben; nach 1 s folgt nur die Fehler-Rückmeldung. „−0,6 s“ nur mit eingeschalteter Strafe. „am Boden“ → Kapsel auf halber Bildhöhe. „Pointer-Lock-API ohne Beschleunigung“ → OS-Beschleunigung bleibt aktiv. „Richtungswechsel-Antizipation“ trainieren → Umkehr ist echter Zufall, nur das Randabprallen ist vorhersehbar. „+50 PKT (+0,4 s/s)“, „bis 3,0×“, „+1 Stufe/1.400 PKT“ stimmen.

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite richtet sich an Spielende von Apex Legends, Overwatch 2, CS2, Call of Duty und The Finals und verspricht „reaktives Tracking, Ziel-Smoothness, Richtungswechsel-Antizipation, Verweildauer und Hand-Auge-Koordination“. Sie erklärt: glatte Blickfolge „bis ≈ 30°/s“, Umkehrlatenz 120–160 ms (an anderer Stelle 130–160 ms; Rashbass, 1961; Krauzlis, 2004), MT/V5 als „primärer visueller Bewegungskortex“, der mit MST und frontalem Augenfeld auch die Handmotorik synchron hält; „Raten“ provoziere Aufholsakkaden und Überschießen, daher rein reaktiv folgen. Eine Tabelle ordnet Stufen von „Anfänger (< 40 %)“ bis „Weltklasse (> 86 % Verweildauer, > 7,5 s Serie)“ zu, angeblich „basierend auf Blickfolgestudien“. FAQ: 10–15 min täglich „kalibrieren den motorischen Kortex“, 30–40 cm/360°, Hybrid-Mauspad.

**Einordnung** (Quellenprüfung aus der Literaturbasis der Gruppe übernommen und für diesen Drill ergänzt):
- **Belegt:** Sakkaden reagieren auf Positions-, die Folgebewegung auf Geschwindigkeitsfehler (Rashbass, 1961; Inhalt über Lisberger, 2010). Aufholsakkaden folgen nach ≈ 125 ms, wenn die vorhergesagte Zeit bis zum Wiedertreffen nicht zwischen 40 und 180 ms liegt (de Brouwer et al., 2002). Tipp „auf das Ziel schauen, nicht aufs Fadenkreuz“ passt zum natürlichen Verhalten: Beim Nachführen mit einem Cursor blieb der Blick ebenso nah am Ziel wie beim reinen Blickfolgen, der Folge-Gain war höher und Aufholsakkaden seltener (Danion & Flanagan, 2018); dass der Tipp die Leistung verbessert, wurde nicht geprüft.
- **Zu pauschal oder falsch zugeordnet:** „30°/s“ steht nicht bei Krauzlis (2004); der Gain bleibt unter 0,95 und sinkt mit dem Tempo (Collewijn & Tamminga, 1984), Einzelne folgen bis ≈ 100°/s (Meyer et al., 1985). Die Folgebewegung setzt erst nach rund 100 ms Bewegungsinformation ein (Lisberger, 2010) – gemessen wird hier aber die **Hand**, nicht das Auge. MT ist extrastriär, nicht „primär“; eine Kopplung an die Handmotorik steht nicht in Krauzlis (2004). Green & Bavelier (2003) enthält kein Tracking, Replikationen sind gemischt (Boot et al., 2008).
- **Eher Gegenbeleg:** Land & McLeod (2000) zeigen, dass gute Schlagleute **vorhersagen**; Vorhersage gleicht Verarbeitungszeit aus (Kowler et al., 2019). Hier ist die Umkehr aber Zufall – sinnvoll ist, das konstante Tempo und das Randabprallen vorwegzunehmen, nicht die Umkehr.
- **Ohne Datengrundlage:** Die Stufentabelle; die als Beleg genannte Arbeit „Lisberger 2010, *Curr Opin Neurobiol*“ existiert so nicht. Nach der Mechanik (Abschnitt 2) hängt die „Max. Lock-on Streak“ stark vom Zufall ab; „> 86 %“ ist bei rein reaktivem Folgen kaum erreichbar (eigene Abschätzung). Ebenfalls unbelegt: „kalibriert den motorischen Kortex“, „30–40 cm/360° ideal“ (Studie: breiter optimaler Bereich 20–80 cm/360°; Boudaoud et al., 2022), „1:1 ohne Beschleunigung“ (Code widerspricht).
- **Positiv:** Messhinweis (Bildintervalle, nur gleiche Hardware vergleichen) und Hinweis „kein Diagnoseinstrument; bei Schmerz, Schwindel, Doppelbildern aufhören“.

## 4. Optische und okulomotorische Grundlagen
- **Sehwinkel:** Kapsel 1,4° × 4,1° (Level 1) bis 0,8° × 2,6° (Level 15), Fadenkreuzpunkt ≈ 6′ – weit über der Sehschärfegrenze. Gefordert ist das Beurteilen, ob der Mittelpunkt noch in der Kapsel liegt → `sehschaerfe_detail` 1. Hoher Kontrast (grüner Umriss auf #050508); die Hintergrundlinien sind mit 4 % Deckkraft kaum sichtbar.
- **Blickfolge:** 7–17°/s liegt im Bereich guter, aber nie perfekter Folge (Gain < 0,95; Collewijn & Tamminga, 1984). Nach jeder Umkehr hinkt das Auge nach und holt per Aufholsakkade auf (de Brouwer et al., 2002) → `blickfolge` 3, `sakkaden` 2. Führt die Hand mit, sinkt die Verzögerung des Auges von ≈ 150 auf ≈ 30 ms (Gauthier et al., 1988); bei pseudozufälliger Bewegung fanden Koken & Erkelens (1992) mit Handbeteiligung keine glattere Augenbewegung, Danion & Flanagan (2018) bei glatter, unvorhersagbarer Bahn dagegen weniger Aufholsakkaden – die Befundlage ist uneinheitlich. Nur waagrechte Folge.
- **Bildschirm:** Bei 60 Hz springt ein 16,8°/s-Ziel ≈ 0,28° (≈ 11 px) pro Bild; Sample-and-Hold-Unschärfe erschwert das Beurteilen der Überdeckung [ER].
- **Brille:** Das Ziel läuft auf Augenhöhe über die ganze Breite (am 24″ ≈ ± 24°). Der klare Zwischenbereich einer Gleitsichtbrille ist bei 60 cm nur 13–18° breit (Han et al., 2003) → seitlich unscharf, Kopf statt Augen bewegen, Kopf in den Nacken. Abhilfe: Bildschirm-/Arbeitsplatzbrille (Bildschirm-Gleitsichtgläser wurden im Büro-Feldversuch mit Universalgläsern verglichen; Jaschinski et al., 2015), Monitor etwas tiefer, kleineres Fenster statt Vollbild.
- **Farbe:** Rückmeldung Grün ↔ Rot; bei Rot-Grün-Schwäche (≈ 8 % der Männer; Birch, 2012) fehlt dieses Signal weitgehend, die Überdeckung bleibt sichtbar → `farbunterscheidung` 1.
- **Auge und Alter:** Ältere (75–93 J.) haben bei allen Tempi geringeren Folge-Gain, der Unterschied wächst mit Tempo und Beschleunigung (Moschner & Baloh, 1994). Bei dynamischen Bildschirmspielen sinkt die Lidschlagrate auf ≈ ⅓ (Cardona et al., 2011). Stereosehen: 0.

## 5. Neurowissenschaftliche Grundlagen
Bewegungssignale stammen vor allem aus MT/MST; die Streuung der Folgebewegung lässt sich weitgehend auf das Rauschen der Bewegungsschätzung zurückführen, Kleinhirn und frontales Folgeareal steuern mit wenig Zusatzrauschen (Lisberger, 2010). Folgebewegung und Sakkaden teilen ein erweitertes Netzwerk (frontales Augenfeld, Basalganglien, Colliculus superior, Kleinhirn) – eher eine gemeinsame Kaskade als zwei getrennte Systeme (Krauzlis, 2004). Die Hand wird über eigene visuomotorische Wege korrigiert, nach Positionssprüngen ≈ 110 ms (Brenner & Smeets, 1997). Dass der Drill bestimmte Hirnregionen „trainiert“ oder „kalibriert“, ist nicht belegt.

## 6. Motorische Grundlagen
- **Aufgabe:** kontinuierliches Nachführen (manuelles Tracking) aus Handgelenk und Unterarm, waagrecht; die Senkrechte muss nur grob gehalten werden (Kapsel hoch) → `ruhige_hand` 1. Manuelles Tracking verläuft in intermittierenden Korrekturschüben statt völlig glatt (Miall et al., 1993).
- **Umkehr = Reaktionsaufgabe:** Richtung ist immer „Gegenteil“, eine Wahl entfällt → `einfache_reaktion` 2. Die Hand reagiert auf Positions- bzw. Tempoänderungen des Ziels nach ≈ 110–200 ms (Brenner & Smeets, 1997; Brenner et al., 1998); bei 7,4°/s entsteht so ≈ 1,5–3° Fehler, bei 16,8°/s ≈ 4–7° (relative Geschwindigkeit doppelt) [ER] – danach ist rasches, nicht überschießendes Wiedereinfangen gefragt (`zielbewegung_tempo`/`_praezision` 1).
- **Maus-Übersetzung:** Aktive OS-Beschleunigung macht die Übersetzung Hand → Fadenkreuz vom Handtempo abhängig (Übersicht zu Übersetzungsfaktor und Beschleunigung: Casiez et al., 2008). Dass das bei schnellen Umkehrungen das Wiedereinfangen erschwert, ist plausibel, aber für Tracking nicht untersucht [ER]. Empfindlichkeit: breiter optimaler Bereich (Boudaoud et al., 2022).
- **Belastung:** Nach 6 × 5 min Maus-Zielen (Klickaufgabe) waren vor allem die Handgelenkstrecker messbar ermüdet, die Zielleistung blieb gleich (N = 20; Forman et al., 2025). Eine einzelne 45–75-s-Runde ist deutlich kürzer; relevant wird das bei vielen Runden hintereinander.

## 7. Einflussfaktoren und Messgrenzen
- **Latenz:** Lokale Systemlatenz verkürzte die Zeit auf dem Ziel in einer FPS-Tracking-Aufgabe gegenüber der Grundbedingung um 5,8 % (41 ms) bis 32,7 % (164 ms); reale Systeme lagen bei 23–243 ms (Ivkovic et al., 2015; Prozentwerte aus Ivkovic, 2017, Tab. 5.5). Bei 280 px/s bedeuten 50 ms zusätzliche Latenz ≈ 14 px Nachlauf, gut die Hälfte des Toleranzradius [ER] → Werte verschiedener Geräte nicht vergleichbar.
- **Größen in Pixeln:** Tempo und Ziel in CSS-Pixeln; Sehwinkel und °/s hängen von Fenster, Monitor und Abstand ab.
- **Messgrößen:** Quote zählt Bilder; Serie und Punkte hängen stark von der Zufallsfolge der Umkehrungen ab; Sitzungslänge schwankt (45–75 s). Eine Wiedereinfangzeit wird nicht erfasst.
- **Zuverlässigkeit:** Die Strafe-Tracking-Aufgabe des kommerziellen Aim-Trainers KovaaK's war an zwei Terminen gut reproduzierbar (ICC 0,947–0,995 über vier Aufgaben, N = 10; Rogers et al., 2024) – für diesen Browserdrill ungeprüft.
- **Alter, Müdigkeit:** geringerer Folge-Gain im Alter (Moschner & Baloh, 1994); Touch-Bedienung verkleinert den Altersnachteil gegenüber der Maus (Findlater et al., 2013).

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt – mittel:** Auge-Hand-Tracking verbessert sich mit Übung (Gauthier et al., 1988); in Aim-Lab-Daten (N = 7.174, eine Zielaufgabe mit Klicken, kein Tracking) stieg vor allem die Trefferrate pro Sekunde über Tage und Wochen (Listman et al., 2021; Beobachtungsdaten, Herstellerfinanzierung). Zu diesem Drill gibt es keine Studie; ein Teil des Zuwachses ist Gewöhnung an Gerät und Aufgabe (Guo et al., 2025).
- **Naher Transfer – schwach:** 5–10 h Actionspiel verbesserten bei Nicht-Spielenden eine Labor-Nachführaufgabe (Li et al., 2016) – das betrifft ganze Spiele, nicht einen 45-s-Drill.
- **Alltagstransfer – fehlend:** Kein Beleg für Nutzen im Spiel, Sport, Verkehr oder Beruf; die aktuelle Metaanalyse zu Actionspielen betrifft kognitive Maße (Interventionsstudien: kleiner Effekt, g = 0,30) und ganze Spiele, nicht Aim-Drills (Bediou et al., 2023); „Brain-Training“ verbessert vor allem die geübte Aufgabe (Simons et al., 2016).

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** jemand am Desktop mit Maus fortlaufendes Nachführen und Wiedereinfangen nach Umkehrungen üben will; waagrechte Blickfolge plus Hand ohne Klicken, Lesen oder Gedächtnis; spielerischer Rahmen für Menschen mit Shooter-Erfahrung.
- **Weniger passend, wenn …** nur ein Tablet vorhanden ist; ruhige, vorhersagbare Folge (404, 105, 514) oder senkrechte Folge (515) gewünscht ist; vergleichbare Messwerte gebraucht werden.
- **Vorsicht / anpassen bei …**
  - `hand_arm_beschwerden`, `tremor_parkinson`: pausenloses Hin-und-her aus Handgelenk/Unterarm; längeres Maus-Zielen ermüdet die Handgelenkstrecker (Forman et al., 2025) → kurze Runden, niedrige Stufe.
  - `nystagmus`: die Aufgabe verlangt genau die glatte Folgebewegung → eher nicht wählen.
  - `presbyopie_gleitsicht`: Ziel läuft auf Augenhöhe über die ganze Breite → Bildschirmbrille, Monitor tiefer, kleineres Fenster.
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: roter Vollbildblitz (≤ 1/s, also unter 3 Blitzen/s; Rot gilt als Risikofaktor; Fisher et al., 2005), Wackeln, Rot-Grün-Wechsel der Kapsel → Blitz abschalten.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: bis 75 s ohne Pause, wenig Lidschlag (Cardona et al., 2011) → Pausen zwischen Runden.
  - `farbsehschwaeche`: Rückmeldung nur Grün/Rot; Aufgabe bleibt lösbar.
- **Kombiniert gut mit …** 512 (sprunghafte Tempo-/Richtungswechsel), 513 (Zickzack), 514/105/404 (vorhersagbare Folge), 515 (senkrecht), 410/415 (reaktive Blickfolge ohne Maus), 707 (Pfad nachfahren), 104 (bewegtes Ziel).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Tablet:** Original nicht bedienbar (Pointer Lock). Eine Touch-Fassung als Finger-Nachführaufgabe ist möglich, braucht aber: Größen in mm/Grad, Ziel ≥ 9 mm und nicht vom Finger verdeckt (Ring um die Berührung oder Ziel darüber), Touch-Latenz von 50–200 ms einplanen (Deber et al., 2015), deutlich langsameres Tempo.
- **Mechanik:** Umkehr ehrlich angeben (bisher nur jede zweite Entscheidung); Serie nicht beim ersten Bild daneben beenden, sonst misst sie vor allem Zufall; wählbare Stufen statt Verschärfung durch lange Serien.
- **Messung:** Wiedereinfangzeit je Umkehr, mittlerer Abstand, zeitgewichtete Quote, feste Dauer ohne Zeitbonus; realistische Notenskala.
- **Regeltext:** Serienabbruch, optionale Strafe und Mausbeschleunigung korrekt beschreiben (oder `unadjustedMovement` anbieten); keine Stufentabelle, keine Kortex- oder Transferversprechen.
- **Sicherheit/Barrierefreiheit:** Rückmeldung zusätzlich über Form statt nur Rot/Grün; Vollbildblitz standardmäßig aus; Pausenhinweis; Hinweis auf Bildschirmbrille für Gleitsichtträger:innen.

## 11. Quellen
### Von der Website angegeben
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise – Hardware-Einfluss auf Messungen ja; es misst einfache Tastenreaktion, keine Umkehr- oder Tracking-Latenz und keine Browser-Timer.
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise – Netzwerk der Augenfolge ja; „30°/s“, „MT primär“ und Kopplung an die Handmotorik nicht.
- Posner, M. I., & Petersen, S. E. (1990). The attention system of the human brain. *Annual Review of Neuroscience, 13*, 25–42. https://doi.org/10.1146/annurev.ne.13.030190.000325 – **Prüfung:** DOI stimmt ✓; **stützt:** nein – Aufmerksamkeitsnetzwerke, kein Bezug zu Tracking oder „Raten unterdrücken“.
- Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. *Nature, 423*(6939), 534–537. https://doi.org/10.1038/nature01647 – **Prüfung:** DOI stimmt ✓; **stützt:** nein – keine „räumlichen Tracking-Paradigmen“ (Flanker, Enumeration, UFOV, Attentional Blink).
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, **Titel falsch** („smooth pursuit“ statt „smooth tracking“); **stützt:** teilweise – Position → Sakkade, Geschwindigkeit → Folge ja; Handlatenz 120–160 ms und „Raten → Überschießen“ nicht.
- Land, M. F., & McLeod, P. (2000). From eye movements to actions: How batsmen hit the ball. *Nature Neuroscience, 3*(12), 1340–1345. https://doi.org/10.1038/81887 – **Prüfung:** **DOI falsch** (angegeben 10.1038/81861, nicht auffindbar; richtig 10.1038/81887); **stützt:** nein, eher Gegenbeleg – gute Schlagleute nutzen Vorhersage.
- „Lisberger, S. G. (2010). Visual tracking in primates … *Current Opinion in Neurobiology, 20*(4), 405–410“, doi 10.1016/j.conb.2010.04.004 – **Prüfung:** **nicht auffindbar**; die DOI gehört zu Semaan & Kauffman (2010), S. 424–431; vermutlich gemeint: Lisberger (2010), *Neuron* (siehe unten); **stützt:** nein – die Stufentabelle hat keine Datengrundlage.

### Weitere Fachliteratur
- Bediou, B., Rodgers, M. A., Tipton, E., Mayer, R. E., Green, C. S., & Bavelier, D. (2023). Effects of action video game play on cognitive skills: A meta-analysis. *Technology, Mind, and Behavior, 4*(1), 28–48. https://doi.org/10.1037/tmb0000102 – Transfer auf kognitive Maße (g = 0,30 in Interventionsstudien).
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Farbsehschwäche.
- Boot, W. R., Kramer, A. F., Simons, D. J., Fabiani, M., & Gratton, G. (2008). The effects of video game playing on attention, memory, and executive control. *Acta Psychologica, 129*(3), 387–398. https://doi.org/10.1016/j.actpsy.2008.09.005 – gemischte Replikation.
- Boudaoud, B., Spjut, J., & Kim, J. (2022). Mouse sensitivity in first-person targeting tasks. In *2022 IEEE Conference on Games (CoG)* (S. 183–190). https://doi.org/10.1109/CoG51982.2022.9893626 – Empfindlichkeitsbereich.
- Brenner, E., & Smeets, J. B. J. (1997). Fast responses of the human hand to changes in target position. *Journal of Motor Behavior, 29*(4), 297–310. https://doi.org/10.1080/00222899709600017 – Handkorrektur ≈ 110 ms.
- Brenner, E., Smeets, J. B. J., & de Lussanet, M. H. E. (1998). Hitting moving targets: Continuous control of the acceleration of the hand on the basis of the target's velocity. *Experimental Brain Research, 122*(4), 467–474. https://doi.org/10.1007/s002210050535 – Reaktion auf Tempoänderung ≈ 200 ms.
- Cardona, G., García, C., Serés, C., Vilaseca, M., & Gispets, J. (2011). Blink rate, blink amplitude, and tear film integrity during dynamic visual display terminal tasks. *Current Eye Research, 36*(3), 190–197. https://doi.org/10.3109/02713683.2010.544442 – Lidschlag bei schnellen Spielen.
- Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction, 23*(3), 215–250. https://doi.org/10.1080/07370020802278163 – Übersetzungsfaktor und Mausbeschleunigung (nur Metadaten/Kurzfassung geprüft).
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Folge-Gain.
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports, 8*, 10059. https://doi.org/10.1038/s41598-018-28434-6 – Blick beim Hand-Tracking.
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Aufholsakkaden (PubMed-Abstract geprüft).
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. In *Proceedings of CHI '15* (S. 1827–1836). ACM. https://doi.org/10.1145/2702123.2702300 – Touch-Latenz.
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of CHI '13* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Touch vs. Maus im Alter.
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Photosensitivität.
- Forman, G. N., Nikitin, S. A., Lang, C. J., Gabriel, D. A., Sonne, M. W., Kociolek, A. M., & Holmes, M. W. R. (2025). Impact of repetitive mouse aiming on muscle fatigue and fine motor performance of the distal upper limb. *Journal of Electromyography and Kinesiology, 82*, 102992. https://doi.org/10.1016/j.jelekin.2025.102992 – Ermüdung der Handgelenkstrecker (Abstract geprüft).
- Gauthier, G. M., Vercher, J.-L., Mussa Ivaldi, F., & Marchetti, E. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. *Experimental Brain Research, 73*(1), 127–137. https://doi.org/10.1007/BF00279667 – Auge-Hand-Tracking, Lernen (PubMed-Abstract geprüft).
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – gerätegebundene Lerneffekte.
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht-Zwischenbereich.
- Ivkovic, Z., Stavness, I., Gutwin, C., & Sutcliffe, S. (2015). Quantifying and mitigating the negative effects of local latencies on aiming in 3D shooter games. In *Proceedings of CHI '15* (S. 135–144). ACM. https://doi.org/10.1145/2702123.2702432 – Latenz und Tracking (Prozentwerte aus Ivkovic, Z. (2017). *Characterizing the effects of local latency on aim performance in first person shooters* [Masterarbeit, University of Saskatchewan], https://harvest.usask.ca/bitstream/10388/7707/1/IVKOVIC-THESIS-2017.pdf, keine DOI; Tab. 5.5 geprüft).
- Jaschinski, W., König, M., Mekontso, T. M., Ohlendorf, A., & Welscher, M. (2015). Comparison of progressive addition lenses for general purpose and for computer vision: An office field study. *Clinical and Experimental Optometry, 98*(3), 234–243. https://doi.org/10.1111/cxo.12259 – Bildschirm-Gleitsicht.
- Koken, P. W., & Erkelens, C. J. (1992). Influences of hand movements on eye movements in tracking tasks in man. *Experimental Brain Research, 88*(3), 657–664. https://doi.org/10.1007/BF00228195 – Hand und Sakkaden bei Zufallsbewegung.
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 – Vorhersage bei der Folgebewegung.
- Li, L., Chen, R., & Chen, J. (2016). Playing action video games improves visuomotor control. *Psychological Science, 27*(8), 1092–1108. https://doi.org/10.1177/0956797616650300 – Actionspiele und Nachführen (PubMed-Abstract geprüft).
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – Beginn der Folgebewegung, MT.
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the "wild" with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 – Übungsverlauf, Klick-Zielaufgabe (Herstellerfinanzierung; Abstract geprüft).
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Obergrenze der Folge.
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – intermittierende Korrekturen (nur Metadaten geprüft).
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Alter und Folge-Gain (PubMed-Abstract geprüft).
- Rogers, E. J., Trotter, M. G., Johnson, D., Desbrow, B., & King, N. (2024). KovaaK's aim trainer as a reliable metrics platform for assessing shooting proficiency in esports players: A pilot study. *Frontiers in Sports and Active Living, 6*, 1309991. https://doi.org/10.3389/fspor.2024.1309991 – Reproduzierbarkeit inkl. Strafe Tracking (PubMed-Abstract geprüft).
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer allgemein.
