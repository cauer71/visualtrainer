---
# ===== Kennung =====
nr: 805
kennung: reaction-chain
name: "In die Bahn: den Finger vorab auf den Durchlaufpunkt setzen"
name_original: "Maus bremsen beim Aim – Zielen, treffen, den Cursor sauber stoppen (Reaction Chain; Seitentitel: Maus bremsen beim Aim | Reflex-Test)"
kapitel: "Körper & Reflexe"
kapitel_original: "physical"
unterkapitel_original: "reflex-training"
quelle_url: "https://skilldrills.online/de/drills/physical/reflex-training/reaction-chain"
blickfit_umsetzung: {kennung: "in-die-bahn", name: "In die Bahn", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/in-die-bahn/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein Ziel läuft mehrmals über dieselbe Bahn von Rand zu Rand. Nach einem Durchlauf zum Zuschauen setzt man den Finger auf einen Punkt der Bahn, durch den das Ziel gleich laufen wird, und lässt ihn liegen, bis es vorbeigelaufen ist. Danach zeigt die Übung, wie nah es am Finger vorbeilief. Feste Zahl an Durchgängen ohne Zeitstrafe, Stufen nach Erfolg; erfasst wird nur, wo der Finger liegt, nicht der Blick."
ziel_funktionen: [antizipation, auge_hand_koordination, zielbewegung_praezision]
eingabe: [maus, touchpad]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code 10 feste Stufen nach Punkten (250/500/1.000/2.000/3.500/5.500/8.000/11.000/15.000): Tempo 360 → 1.800 px/s, gleichzeitige Knoten 1 → 5, Knotenradius 15 → 6 px (Fangbereich Radius + 8 px). Stufe sinkt nie; jeder Fehler kostet 1 s der 45-s-Runde, Zeitgewinn gibt es nicht."
messgroessen: ["Original: Punkte, 'Bremspräzision' (Fänge/(Fänge + Fehler) in %), Fänge, Fehler, längste Serie, Spitzentempo, Level, beste Combo, Note S+ bis F", "Fehler mischen Durchrutschen (Zeiger bewegt) und ungefangene Knoten", "sinnvoll: Restgeschwindigkeit bei Kontakt in px/s bzw. °/s, Stillstandszeit vor Kontakt, Abstand Fadenkreuz–Bahnmitte, Überschießen/Wiedereintritt beim Positionieren, Erfolg je Tempostufe"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 1
    sakkaden: 2
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
    verarbeitungsgeschwindigkeit: 2
    antizipation: 3
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 3
    zielbewegung_tempo: 2
    zielbewegung_praezision: 3
    kontinuierliche_steuerung: 1
    ruhige_hand: 2
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 3
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus (oder Touchpad) und Desktop-Browser mit Pointer-Lock; reine Touch-Geräte werden erkannt und nicht zugelassen", "Maus auf ruhiger Unterlage, Hand kann den Zeiger kurz ganz stillhalten", "sicheres Sehen im Bildschirmabstand über die ganze Spielfeldbreite (≈ 29° bei 24″ in 60 cm)"]
vorsicht_bei: [tremor_parkinson, hand_arm_beschwerden, photosensitive_epilepsie, migraene_lichtempfindlich, schwindel_vestibulaer, presbyopie_gleitsicht, trockenes_auge_bildschirm, gesichtsfeldausfall, sehbehinderung_niedriger_visus, aufmerksamkeitsprobleme, kognitive_einschraenkung, kinder_unter_6]
geeignet_fuer: ["Bahn eines bewegten Ziels vorhersagen und den Finger vorab an den Treffpunkt setzen", "ruhiges Aufsetzen und Liegenlassen des Fingers („nicht dem Ziel hinterherjagen, sondern warten“)", "Menschen, die ein ruhiges Tempo mit Zuschauen vor dem eigentlichen Durchlauf bevorzugen; Ergänzung zu 104, 802 und 804"]
weniger_geeignet_fuer: ["wer schnelle Reaktionen unter Zeitdruck üben will (dafür 101/301)", "Training der Reaktionshemmung im Sinne der Stop-Signal-Aufgabe (dafür 102)", "echte Körper- oder Reflexübung (es wird nur getippt)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Keine Studie zu dieser Übung. Übungseffekte in gleichartigen Bildschirmaufgaben sind regelmäßig groß, in unähnlichen klein (Guo et al., 2025); adaptives Hemmtraining zeigte gegenüber aktiver Kontrolle keinen echten Trainings- oder Transfereffekt (Enge et al., 2014). Übertragung auf Sport oder Alltag ist nicht untersucht."
aehnliche_uebungen: [511, 104, 808, 705, 804, 509, 501, 802, 803, 407, 102]
stichworte: ["Abbremsen", "Stillhalten", "Interzeption", "Fadenkreuz vorhalten", "Crosshair Placement", "Overflick", "Überschießen", "Woodworth", "Stop-Signal", "Maus", "Pointer-Lock", "bildfrequenzabhängig"]
---

# 805 · In die Bahn: den Finger vorab auf den Durchlaufpunkt setzen

> Original: „Maus bremsen beim Aim“ (Reaction Chain) – skilldrills.online, Kapitel Körper & Reflexe (`physical`, Unterkapitel `reflex-training`) · Blickfit-Übung: In die Bahn (`in-die-bahn`)

## 1. Kurzbeschreibung
Ein Ziel läuft mehrmals über dieselbe Bahn von einem Feldrand zum anderen, auf niedrigen Stufen geradlinig, auf höheren in einem sanften Bogen. Im ersten Durchlauf schaut man zu; im zweiten setzt man den Finger vorab auf eine Stelle der Bahn, durch die das Ziel gleich laufen wird, und lässt ihn liegen, bis es vorbeigelaufen ist. Danach zeigt die Übung, wie nah das Ziel am Finger vorbeilief. Auf niedrigen Stufen ist die ganze Bahn als Linie zu sehen, später nur noch als kurze Spur hinter dem Ziel; die Durchlaufzeit sinkt von 3,6 auf bis zu 1,5 Sekunden. Eine Sitzung hat zehn Durchgänge ohne Zeitstrafe. Erfasst werden der Abstand zwischen Finger und Durchlaufpunkt (als Anteil der kürzeren Feldseite) und die Trefferquote – nur wo der Finger liegt, nicht wohin der Blick geht.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext (29.09.2026) und ausgelieferter Spielcode (Chunk 91210, formatiert gelesen; Stichprobe auch in der Gruppen-Literaturbasis). **[Code]** = aus dem Code, **[Herleitung]** = eigene Rechnung (24″-FHD, 60 cm ≈ 37,8 px/°), sonst Regeltext.

- **Eingabe [Code]:** Pointer-Lock mit eigenem Fadenkreuz (Ring 15 px Radius, Linien bis 24 px); Zeiger = Summe aus `movementX/Y` × Empfindlichkeit (Einstellung 0,1–3, Standard 1). Pointer-Lock ohne `unadjustedMovement` – die Mausbeschleunigung des Betriebssystems wirkt mit. Kein Klick nötig. Reine Touch-Geräte (Touch ohne `pointer: fine`) werden erkannt und an die Startmaske gemeldet. Countdown 3-2-1-GO (2,45 s); Start in Feldmitte.
- **Spielfeld [Code]:** Canvas 16:9, mind. 460/500 px hoch, höchstens 88 % der Fensterhöhe; Logik in CSS-Pixeln.
- **Knoten [Code]:** entstehen 20 px außerhalb einer zufälligen der vier Kanten an zufälliger Stelle und fliegen **geradlinig, achsenparallel und mit konstantem Tempo** zur Gegenseite; 20-px-Schweif zeigt die Richtung, ein Außenring (2 × Radius) markiert sie. Bewegung mit dt (dt ≤ 33 ms) – das Tempo ist bildfrequenzunabhängig, unter 30 Bildern/s läuft das Spiel langsamer.
- **Fang-Logik [Code]:** In jedem Bild wird die Zeigerverschiebung seit dem letzten Bild berechnet (`cursorVel`, px pro Bild). Sobald der Abstand Knoten–Fadenkreuz < Knotenradius + 8 px ist, wird **sofort** entschieden: Verschiebung < 1,5 px → Fang, sonst Fehler („Slice-Through“). Ein Knoten, der den Rand um 150 px überschreitet, ist ebenfalls ein Fehler. Man kann einen Knoten also nicht „einholen und darin abbremsen“ – man muss **vor** seiner Ankunft stillstehen. Über dem Fadenkreuz steht „ARREST READY“ (grün) oder „VEL: x“ (weiß).
- **Stufen [Code]:** feste Tabelle nach Punktestand, Stufe sinkt nie:

  | Stufe (ab Punkten) | Tempo | gleichz. Knoten | Radius / Fangbereich | Rand→Mitte (waagr./senkr.) **[Herleitung]** |
  |---|---|---|---|---|
  | 1 (0) | 360 px/s ≈ 9,5°/s | 1 | 15 / 23 px | 1,6 / 0,9 s |
  | 3 (500) | 500 px/s | 2 | 13 / 21 px | 1,2 / 0,7 s |
  | 5 (2.000) | 720 px/s ≈ 19°/s | 2 | 11 / 19 px | 0,8 / 0,5 s |
  | 7 (5.500) | 1.000 px/s | 3 | 9 / 17 px | 0,6 / 0,34 s |
  | 8 (8.000) | 1.200 px/s ≈ 32°/s | 4 | 8 / 16 px | 0,48 / 0,28 s |
  | 10 (15.000) | 1.800 px/s ≈ 48°/s | 5 | 6 / 14 px | 0,32 / 0,19 s |

  (Stufen 2, 4, 6, 9 dazwischen: 420/600/850/1.450 px/s; Feldbreite ≈ 1.120 × 630 px angenommen.)
- **Punkte [Code]:** 50 × Combo je Fang; Combo nach Serie: 1,2 (ab 5), 1,5 (ab 10), 2,0 (ab 25), 3,0 (ab 40). Fehler: Serie = 0, −1 s, Bildschirmwackeln (20 px, abklingend), Strafton und – bei aktiven Effekten – rotes Overlay (480 ms).
- **Auswertung [Code]:** Note nach 100 · √(Punkte/15.000): S+ ab ≈ 13.540, S ab ≈ 10.840, A ab ≈ 8.440, B ab 5.400, C ab ≈ 3.040, D ab 1.350 Punkten. Gespeichert (localStorage): Rekord, beste Combo, bestes Level, Rundenzahl.
- **Bildfrequenzabhängigkeit [Code, Herleitung]:** Das Stopp-Kriterium gilt pro Bild: 1,5 px/Bild = 90 px/s (≈ 2,4°/s) bei 60 Hz, 216 px/s bei 144 Hz, 360 px/s (≈ 9,5°/s) bei 240 Hz – auf schnellen Monitoren darf man sich viermal schneller bewegen. Zusätzlich legt ein Knoten auf Stufe 10 bei 60 Hz 30 px pro Bild zurück, mehr als der Fangbereich (Ø 28 px): Er kann das Fadenkreuz überspringen, ohne je als Kontakt erkannt zu werden, und zählt dann als Fehler. Auch die Empfindlichkeit verschiebt das Kriterium (bei 0,5 dürfen doppelt so viele Mauszählschritte anfallen).
- **Widersprüche Regeltext ↔ Code:** „kein Punkteabzug“ stimmt, verschweigt aber den Zeitabzug von 1 s je Fehler (die englische Regelkarte nennt ihn); dass die Zahl gleichzeitiger Knoten bis 5 steigt und jeder hinausfliegende Knoten ein Fehler ist, steht nirgends. „Subpixel-Geschwindigkeit über performance.now()“ – der Code misst Verschiebung pro Bild ohne Zeitbezug. „Im Zielkreis zum Stillstand bringen“ – entschieden wird beim ersten Kontakt. „Leichter Anpressdruck“ wird nicht erfasst. Die Farbe „ab Combo 10 hellblau“ ist toter Code (Combo max. 3,0).
- **Erreichbarkeit [Herleitung]:** 15.000 Punkte (Stufe 10, „Tier 1“) erfordern bei fehlerfreier Serie ≈ 119 Fänge, also ≥ 2,6 Fänge/s über 45 s ohne einen einzigen Fehler – bei mehreren gleichzeitigen Knoten, von denen jeder hinausfliegende als Fehler zählt, kaum erreichbar (eigene Rechnung, nicht erprobt).

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite beschreibt „Kinetic Arrest“ als Training der „neuromotorischen Inhibition“: Go- und Stop-Prozess rennen nach Logan & Cowan (1984) „unabhängig durch die Basalganglien“, rechter Gyrus frontalis inferior (rIFG) und Nucleus subthalamicus (STN) senden „antagonistische Bremsbefehle“ (Verbruggen & Logan, 2008); Woodworth (1899) wird für Anfangsimpuls plus Endverzögerung mit „100–150 ms Rückkopplungsverzögerung“ zitiert, Fitts (1954) für ein „gegen null gehendes Korrekturfenster“, Woods et al. (2015) für den Nutzen von 144/240-Hz-Monitoren („Bremsbefehle > 10 ms früher“, „optimale Voraussetzungen für neuronale Plastizität“). Regelmäßiges Training „restrukturiert die Signalübertragung im STN und Motorkortex“ und „eliminiert Overflicking“ in CS2/Valorant. Empfohlen werden Kontroll-Mauspads, 15–20 min/Tag. Eine Tabelle ordnet Punkte Stufen von „Top 0,1 %“ bis „Einsteiger“ zu.

**Einordnung:**
- **Belegt:** Zielbewegungen bestehen aus Anfangsimpuls und rückmeldungsgestützter Endphase (Elliott et al., 2001). Schnelle Bewegungen werden durch eine zentral programmierte Antagonisten-Salve am Endpunkt angehalten (Berardelli et al., 1996). Das Stoppen einer Handlung nach Stoppsignal beansprucht rIFG und STN (Aron & Poldrack, 2006). Die Rechnung 1,5 px/Bild = 216 px/s bei 144 Hz stimmt.
- **Falsch übertragen:** Das Abbremsen am Ziel ist Teil des **geplanten** Bewegungsprogramms, keine Hemmung einer ungewollten Handlung nach Stoppsignal; das Rennmodell ist ein kognitives Modell, „durch die Basalganglien“ steht nicht bei Logan & Cowan (1984). Die SSRT-Mittelwerte lagen in drei Stichproben gesunder Erwachsener je nach Auswertung bei ≈ 132–232 ms (über alle Methoden gemittelt 146–172 ms; Congdon et al., 2012) – „typisch 180–250 ms“ ist also eher hoch angesetzt, aber nicht grob falsch. Im Spiel selbst wird kein Stoppsignal gegeben – man stoppt, wann man will.
- **Nicht belegt:** Umbau von STN/Motorkortex durch dieses Training – die Arbeit von 1984 enthält weder Bildgebung noch Training, und Hemmtraining war einer aktiven Kontrolle nicht überlegen (Enge et al., 2014). Die „100–150 ms“ stammen nicht von Woodworth; visuelle Rückmeldung wirkt schon bei Bewegungen < 190 ms (Zelaznik et al., 1983). Woods et al. (2015) untersuchten Reaktionszeit-Komponenten, nicht Bildwiederholraten oder Plastizität. Typisch ist eher **Unterschießen**, weil Überschießen mehr Zeit und Energie kostet (Lyons et al., 2006). Mauspad, Anpressdruck und „15–20 min optimal“ sind ohne Quelle.
- **Selbstwiderspruch:** Das Kriterium „< 1,5 px/Frame“ soll eine „echte physikalische Vollbremsung“ sichern, ist aber bei 60 Hz viermal strenger als bei 240 Hz (Abschnitt 2).
- **Leistungsstufen ohne Datengrundlage:** Die Website sammelt nach eigener Angabe keine Daten; die Stufen verbinden Punkte mit „Erfolgsquote / px/s“-Werten, die der Code so nicht misst, und „Tier 1“ ist kaum erreichbar. Auch die Noten passen nicht zusammen: Die Tabelle nennt „Grade S“ erst ab 15.000 und „A“ ab 11.000 Punkten, im Code gibt es S schon ab ≈ 10.840 und A ab ≈ 8.440.
- **Kapitel „Körper & Reflexe“:** Es gibt keine Körperbewegung und keinen Reflex im physiologischen Sinn.

## 4. Optische und okulomotorische Grundlagen
- **Reizgrößen:** Das Ziel ist ein hellgelber Kreis auf dunklem Grund, der Kontrast ist hoch und die Farbe trägt keine Information. Die Bahn ist in der Regel mindestens drei Viertel der kürzeren Feldseite lang. Die Größe auf dem Gerät hängt von Bildschirm und Abstand ab; als Umrechnung gilt: Bei 40 cm Abstand entspricht 1 cm etwa 1,4°. Beispielrechnung: Überspannt die Bahn aus 40 cm Abstand 20°, ergibt sich bei einer Durchlaufzeit von 3,6 s etwa 5,6°/s und bei 1,5 s etwa 13°/s.
- **Blickfolge:** Geschwindigkeiten dieser Größenordnung liegen in einem Bereich, in dem die glatte Folgebewegung gut funktioniert, ihr Gain aber unter 0,95 bleibt und mit dem Tempo sinkt; Sakkaden ergänzen sie (Collewijn & Tamminga, 1984). Gefordert ist die Folgebewegung allerdings nicht: Entscheidend ist, wohin der Finger kommt.
- **Blickstrategie:** Wer die Bahn früh erkennt, springt mit dem Blick an den Treffpunkt (Sakkade, reguläre Latenz etwa 180–250 ms; Darrien et al., 2001) und lässt das Ziel auf den ruhenden Blick zulaufen. Der Blick bleibt während einer Zeigebewegung am Ziel „verankert“ (Neggers & Bekkering, 2000). Ruhiges Fixieren des Treffpunkts kann helfen, wird aber weder verlangt noch gemessen; begrenzend sind die Vorhersage der Bahn und das ruhige Liegenlassen des Fingers.
- **Peripherie:** Das Ziel erscheint zunächst ruhig am Feldrand und läuft dann los; die Anforderung an das Sehfeld bleibt gering (nahe Peripherie).
- **Brille:** Mit Gleitsichtgläsern ist der scharfe Zwischenbereich am Bildschirm nur etwa 13–18° breit (Han et al., 2003); der Beginn einer Bahn am Feldrand liegt dann im seitlich unscharfen Bereich, der Kopf muss mitgehen. Ab etwa 40 Jahren reicht die Akkommodation für Naharbeit nicht mehr aus (Charman, 2008); der Akkommodationsaufwand beträgt 1 geteilt durch den Abstand in Metern, also 2,5 dpt bei 40 cm und 5 dpt bei 20 cm. Für einen Bildschirmabstand von 50–70 cm ist eine Arbeitsplatzbrille oft passender als eine reine Lesebrille (Beratung beim Optiker).

## 5. Neurowissenschaftliche Grundlagen
- **Geplantes Abbremsen und Landen:** Schnelle Einzelgelenk-Bewegungen zeigen ein dreiphasiges EMG: Eine Agonisten-Salve startet, eine Antagonisten-Salve hält am Endpunkt an, eine zweite Agonisten-Salve dämpft das Nachschwingen; die Basalganglien skalieren die erste Salve, das Kleinhirn steuert das Timing (Berardelli et al., 1996). Der Finger wird in dieser Übung an einem selbst gewählten Punkt aufgesetzt und dort ruhig gehalten.
- **Vorhersage:** Beim Abfangen bewegter Ziele ist die zeitliche Präzision am höchsten, wenn man den Treffort frei wählen darf; Menschen passen eher den Ort als den Zeitpunkt an (Brenner & Smeets, 2015). Die Übung erlaubt genau diese Strategie: Ort wählen und liegen lassen. Ein zeitliches Timing ist nicht gefordert, der Tipp muss nur mindestens 0,3 s vor dem Durchlauf liegen.
- **Stoppen und Hemmung:** Das Abbrechen einer bereits gestarteten Handlung nach einem Stoppsignal wird als Rennen zweier Prozesse modelliert (Logan & Cowan, 1984; Verbruggen & Logan, 2008) und beansprucht den rechten inferioren Frontalkortex und den Nucleus subthalamicus (Aron & Poldrack, 2006). In dieser Übung gibt es kein Stoppsignal; man entscheidet selbst, wo der Finger liegt. Dass sie Hemmung trainiert, ist nicht belegt.
- **Zeitbudget:** Eine einfache Reaktion braucht im Mittel 213–231 ms (Woods et al., 2015); mit Blickwende und Zeigebewegung wird das Zeitfenster knapp, wenn man erst beim Anlaufen des Ziels reagiert. Deshalb geht ein Durchlauf zum Zuschauen voraus, und der Finger wird vorab gesetzt.

## 6. Motorische Grundlagen
- **Zwei Phasen:** Zielbewegungen bestehen aus einem Anfangsimpuls und einer Korrektur (Woodworth, 1899; Elliott et al., 2001); der Impuls endet meist knapp vor dem Ziel (Lyons et al., 2006). Als Treffer zählt ein Abstand von höchstens 5,5 % der kürzeren Feldseite zum Durchlaufpunkt, mindestens aber 28 px.
- **Stillhalten:** Kokontraktion (gleichzeitige Spannung von Beugern und Streckern) nimmt zu, je kleiner das Ziel, verbessert die Endpunktgenauigkeit und nimmt mit Übung ab (Gribble et al., 2003). Physiologischer Tremor liegt um etwa 10 Hz, Parkinson-Tremor bei 3–6 Hz (McAuley & Marsden, 2000). Der Finger darf nach dem Aufsetzen um bis zu 4 % der kürzeren Feldseite wandern; wandert er weiter oder wird er abgehoben, gilt der Durchgang als „nicht ruhig“ bzw. „zu früh losgelassen“. Aufgestützt gelingt das ruhige Liegenlassen leichter.
- **Zeigegerät:** Beim Zeigen mit der Maus trat Wiedereintritt ins Ziel (Überschießen und Zurück) im Mittel 0,07-mal je Versuch auf, mit Trackball, Joystick und Touchpad 2–5-mal so oft; das Maß erklärte etwa 41 % der Unterschiede im Durchsatz (MacKenzie et al., 2001; 12 Personen). Mausbeschleunigung machte Zeigen nur wenig schneller (3,3 %), vermutlich weil sie das Überschießen erhöhte (Casiez et al., 2008). Beim direkten Tippen mit dem Finger entfallen Zeigerübersetzung und Beschleunigung.
- **Fitts'sches Gesetz:** Für bewegte Ziele erweitert Hoffmann (1991) das Gesetz: Ein bleibender Positionsfehler verkleinert die wirksame Zielbreite, und oberhalb einer kritischen Zielgeschwindigkeit ist Erfassen nicht mehr möglich. Da man nicht auf das Ziel selbst, sondern auf einen Punkt seiner Bahn zielt, ist die wirksame Zielbreite hier die Breite des Trefferkreises; für ruhende Ziele gilt das ursprüngliche Gesetz (Fitts, 1954).

## 7. Einflussfaktoren und Messgrenzen
- **Gerät:** Die Durchlaufzeit ist in Sekunden festgelegt und hängt nicht von der Bildrate ab. Bildschirmgröße und Abstand verändern aber die Bahnlänge und den Sehwinkel; Ergebnisse sind zwischen Geräten nicht vergleichbar. Die End-to-End-Latenz im Browser lag auf einem Testrechner bei etwa 62–83 ms (Casiez et al., 2015). Zeiten und Abweichungen mit verschiedenen Eingabearten (Finger, Stift, Maus) lassen sich nicht ohne Weiteres vergleichen; hohe Korrelation heißt nicht, dass zwei Verfahren dieselben Werte liefern (Mountford et al., 2004, S. 24).
- **Messgröße „mittlere Abweichung“:** Sie gibt den Abstand zwischen Fingerstelle und Durchlaufpunkt als Anteil der kürzeren Feldseite an und schwankt mit Bahn und Tempo. Messungen am Menschen streuen allgemein; aussagekräftiger als ein Einzelwert ist der Verlauf über mehrere Sitzungen (Median).
- **Zufall:** Startkante, Endkante und Krümmung der Bahn sind zufällig; manche Bahnen sind leichter vorherzusagen als andere.
- **Alter:** Die einfache Reaktionszeit nimmt um etwa 0,55 ms je Lebensjahr zu (Woods et al., 2015); Ältere bewegen sich langsamer und variabler (Ketcham et al., 2002). Die Stufe passt sich in beide Richtungen an.
- **Zuverlässigkeit:** Für diese Übung nicht untersucht. Für andere Maße wie die Stop-Signal-Reaktionszeit schwankt die Split-Half-Zuverlässigkeit je nach Auswertung zwischen 0,32 und 0,86 (Congdon et al., 2012); das ist ein anderes Maß und nicht übertragbar.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt (mittel):** Man wird in solchen gerätegleichen Aufgaben schnell besser (Guo et al., 2025; Simons et al., 2016); Kokontraktion und Variabilität sinken mit Übung (Gribble et al., 2003). Eine Studie zu dieser Übung fehlt.
- **Naher Transfer (schwach):** Digitale Seh- und Reaktionstrainings zeigen große Effekte nur in ähnlichen Testaufgaben (Reaktionszeit SMD 2,66), in unähnlichen kleine (SMD 0,50) (Guo et al., 2025). Adaptives Hemmtraining (Go/No-Go, Stop-Signal, 3 Wochen, n = 122) war einer aktiven Kontrollgruppe weder im Training noch im Transfer überlegen (Enge et al., 2014).
- **Alltagstransfer (fehlend):** Es gibt keinen Nachweis, dass diese Übung Leistungen im Sport oder im Alltag verbessert.

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** Vorhersagen einer Bahn und das gezielte, ruhige Aufsetzen des Fingers geübt werden sollen; für Menschen, die ein ruhiges Tempo mit Zuschauen vor dem eigentlichen Durchlauf bevorzugen; als Ergänzung zu 104, 802 und 804.
- **Weniger passend, wenn …** schnelle Reaktionen unter Zeitdruck gewünscht sind (besser 101/301), eine Reaktionshemmung im Sinn einer Stop-Signal-Aufgabe geübt werden soll (besser 102) oder Körperbewegung gewünscht ist.
- **Vorsicht / anpassen bei …**
  - `tremor_parkinson`: Der Finger soll nach dem Aufsetzen ruhig liegen bleiben; Zittern kann zu „nicht ruhig“ führen, Unterarm aufstützen.
  - `hand_arm_beschwerden`: Der Finger wird jeweils länger aufgelegt gehalten; die Dauer der Zeigearbeit hängt mit Hand-Arm-Beschwerden zusammen (IJmker et al., 2007).
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Die Übung kommt ohne rote Fehlerblitze und ohne Bildschirmwackeln aus; Rückmeldung erfolgt ruhig. Grundsätzlich liegt die Blitzgrenze nach WCAG bei 3 pro Sekunde (W3C, 2024).
  - `schwindel_vestibulaer`: Außer dem laufenden Ziel bewegt sich nichts; bei Schwindel nicht üben, sondern ärztlich abklären lassen.
  - `presbyopie_gleitsicht`: Das Ziel startet am Feldrand außerhalb des scharfen Gleitsicht-Zwischenbereichs.
  - `trockenes_auge_bildschirm`: konzentriertes Schauen auf das Ziel; Blinzeln und Pausen zwischen den Sitzungen einplanen.
  - `gesichtsfeldausfall`: Die Bahn verläuft von Rand zu Rand; bei Ausfällen einer Seite wird der Beginn des Durchlaufs spät bemerkt – keine Aussage über das Gesichtsfeld ableiten, kein Test. Gesichtsfeldausfälle lassen sich nach dem Verlauf der Sehbahn zuordnen und gehören augenärztlich abgeklärt (Muchnick, 2008).
  - `sehbehinderung_niedriger_visus`: Auf höheren Stufen bleibt nur eine kurze Spur hinter dem Ziel sichtbar; auf niedrigen Stufen ist die ganze Bahn als Linie zu sehen.
  - `aufmerksamkeitsprobleme`, `kognitive_einschraenkung`, `kinder_unter_6`: Die Durchgänge folgen mit kurzen Pausen aufeinander; Stufen passen sich an, dennoch Pausen anbieten.
  - Treten beim Üben Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung, Schwindel oder Zittern auf, sollte das ärztlich abgeklärt werden, statt weiterzuüben (Muchnick, 2008, S. 6, 28).
  - Keine Sturz- oder Herz-Kreislauf-Vorsicht nötig (keine Körperbewegung).
- **Kombiniert gut mit …** 104 (bewegtes Ziel abfangen), 511 (Winkel halten), 808 und 705 (ruhige Hand), 509 (Mikrokorrektur), 804 (Zielerfassung), 407 (vorausschauende Blickfolge), 803 (Gegenstück: aus der Bahn heraus statt hinein).
- **Abgrenzung innerhalb 801–805:** Hier geht es um das Vorhersagen eines Orts und das ruhige Liegenlassen des Fingers; ein Klick oder eine Farbregel kommt nicht vor. 802 verlangt ebenfalls das Vorhalten auf eine gerade, gleichförmige Bahn, aber mit Klick und Farbregel; 803 ist das Gegenstück (aus der Bahn heraus statt hinein); 804 verlangt das Abwägen mehrerer schrumpfender Ziele.
Keine Diagnosen, keine Heilversprechen; Ergebnisse sind keine Normwerte, der Vergleich gilt nur mit sich selbst auf demselben Gerät.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Bildfrequenz:** Stillstand als Geschwindigkeit in px/s (bzw. mm/s oder °/s) über ein Zeitfenster (z. B. 80–100 ms) prüfen; Kontakt über die Bahn zwischen zwei Bildern (Strecke–Punkt-Abstand) statt nur am Bildpunkt – verhindert Überspringen.
- **Tablet/Touch:** Beim Tippen gibt es kein „Stillhalten“. Umsetzbar als „Finger auf den Treffpunkt legen und liegen lassen“ (Finger bleibt ab Kontakt ruhig, Bewegung > x mm = Fehler) oder als Koinzidenz-Timing wie „Punktlandung“; Trefferfläche größer als das sichtbare Ziel, Mindestgröße in mm, Touch-Latenz berücksichtigen.
- **Adaptiv statt nur steigend:** Treppenverfahren für Tempo (wie „Zielfang“), anfangs ein Knoten, kurze Pausen, keine Zeitstrafe; Fehlerarten getrennt zählen (durchgerutscht / verpasst / übersprungen).
- **Messqualität:** je Knoten Restgeschwindigkeit bei Kontakt, Stillstandsdauer vor Kontakt, Querabstand zur Bahnmitte und Überschießen beim Positionieren (Wiedereintritt nach MacKenzie et al., 2001) speichern; Größen in Grad bei bekanntem Abstand.
- **Sicherheit/Barrierefreiheit:** rote Fehlerblitze ≤ 3/s oder ruhige Markierung, Bildschirmwackeln abschaltbar; Status nicht nur über Farbe (Text/Form ist vorhanden – beibehalten).
- **Ehrliche Texte:** keine „STN-Umstrukturierung“, keine „Top 0,1 %“-Stufen, nicht als Körper- oder Stop-Signal-Übung einordnen; Zeitabzug und Mehrfach-Knoten in den Regeln nennen.

## 11. Quellen
### Von der Website angegeben
- Logan, G. D., & Cowan, W. B. (1984). On the ability to inhibit thought and action: A theory of an act of control. *Psychological Review*, 91(3), 295–327. https://doi.org/10.1037/0033-295X.91.3.295 – **Prüfung:** DOI stimmt ✓ (im Fließtext teils „Logan et al., 1984“); **stützt die Aussage der Website:** teilweise/nein – Rennmodell korrekt beschrieben, aber Abbremsen am Ziel ist keine Stop-Signal-Hemmung; „Basalganglien“ und „Umbau von STN/Motorkortex durch Training“ stehen nicht in der Arbeit.
- Woodworth, R. S. (1899). The accuracy of voluntary movement. *The Psychological Review: Monograph Supplements*, 3(3), i–114. https://doi.org/10.1037/h0092992 – **Prüfung:** DOI stimmt ✓ (Crossref-Titel ohne „The“); **stützt die Aussage der Website:** teilweise – Zwei-Komponenten-Modell ja; „100–150 ms Rückkopplungsverzögerung“ und „Trägheit → Overflicks“ nicht aus dieser Quelle, typisch ist Unterschießen (Lyons et al., 2006).
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, 47(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise – gilt für ruhende Ziele; bei bewegten Knoten ist es eine Abfangaufgabe (Hoffmann, 1991), ein „gegen null gehendes Korrekturfenster“ folgt nicht aus Fitts.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, 9, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein – Studie zu Reaktionszeit-Komponenten und Hardware-Verzögerung (1-kHz-Maus 6,8 ms, gesamt bis 100 ms); nichts zu 240 Hz, „Bremsbefehlen“ oder Plastizität.
- Verbruggen, F., & Logan, G. D. (2008). Response inhibition in the stop-signal paradigm. *Trends in Cognitive Sciences*, 12(11), 418–424. https://doi.org/10.1016/j.tics.2008.07.005 – **Prüfung:** DOI stimmt ✓ (nicht in der Quellenliste der Website); **stützt die Aussage der Website:** teilweise – Paradigma und Rennmodell ja; „SSRT 180–250 ms“ eher hoch angesetzt (Stichprobenmittel ≈ 132–232 ms; Congdon et al., 2012), Bezug zu Mausbremsen nicht belegt.

### Weitere Fachliteratur
- Aron, A. R., & Poldrack, R. A. (2006). Cortical and subcortical contributions to stop signal response inhibition: Role of the subthalamic nucleus. *The Journal of Neuroscience*, 26(9), 2424–2433. https://doi.org/10.1523/JNEUROSCI.4682-05.2006 – rIFC/STN beim Stoppen
- Berardelli, A., Hallett, M., Rothwell, J. C., Agostino, R., Manfredi, M., Thompson, P. D., & Marsden, C. D. (1996). Single-joint rapid arm movements in normal subjects and in patients with motor disorders. *Brain*, 119(2), 661–674. https://doi.org/10.1093/brain/119.2.661 – dreiphasiges EMG, Antagonisten-Salve am Endpunkt
- Brenner, E., & Smeets, J. B. J. (2015). How people achieve their amazing temporal precision in interception. *Journal of Vision*, 15(3), 8. https://doi.org/10.1167/15.3.8 – Ort statt Zeitpunkt anpassen
- Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction*, 23(3), 215–250. https://doi.org/10.1080/07370020802278163 – Zeigerbeschleunigung und Überschießen
- Casiez, G., Conversy, S., Falce, M., Huot, S., & Roussel, N. (2015). Looking through the eye of the mouse: A simple method for measuring end-to-end latency using an optical mouse. In *Proceedings of the 28th Annual ACM Symposium on User Interface Software & Technology (UIST '15)* (S. 629–636). ACM. https://doi.org/10.1145/2807442.2807454 – End-to-End-Latenz: Browser 62–83 ms, Qt-Anwendung 51–75 ms (Tabelle 3, Volltext geprüft)
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry*, 91(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Alterssichtigkeit
- Congdon, E., Mumford, J. A., Cohen, J. R., Galvan, A., Canli, T., & Poldrack, R. A. (2012). Measurement and reliability of response inhibition. *Frontiers in Psychology*, 3, 37. https://doi.org/10.3389/fpsyg.2012.00037 – SSRT-Werte und Zuverlässigkeit
- Darrien, J. H., Herd, K., Starling, L.-J., Rosenberg, J. R., & Morrison, J. D. (2001). An analysis of the dependence of saccadic latency on target position and target characteristics in human subjects. *BMC Neuroscience*, 2, 13. https://doi.org/10.1186/1471-2202-2-13 – Sakkadenlatenz
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin*, 127(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – Zwei-Komponenten-Modell
- Enge, S., Behnke, A., Fleischhauer, M., Küttler, L., Kliegel, M., & Strobel, A. (2014). No evidence for true training and transfer effects after inhibitory control training in young healthy adults. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 40(4), 987–1001. https://doi.org/10.1037/a0036165 – kein Effekt von Hemmtraining
- Gribble, P. L., Mullin, L. I., Cothros, N., & Mattar, A. (2003). Role of cocontraction in arm movement accuracy. *Journal of Neurophysiology*, 89(5), 2396–2405. https://doi.org/10.1152/jn.01020.2002 – Kokontraktion bei kleinen Zielen, sinkt mit Übung
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, 16, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Übungseffekt vs. Transfer
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science*, 44(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Hoffmann, E. R. (1991). Capture of moving targets: A modification of Fitts' law. *Ergonomics*, 34(2), 211–220. https://doi.org/10.1080/00140139108967307 – Fitts für bewegte Ziele
- IJmker, S., Huysmans, M. A., Blatter, B. M., van der Beek, A. J., van Mechelen, W., & Bongers, P. M. (2007). Should office workers spend fewer hours at their computer? A systematic review of the literature. *Occupational and Environmental Medicine*, 64(4), 211–222. https://doi.org/10.1136/oem.2006.026468 – Mausnutzung und Hand-Arm-Beschwerden
- Ketcham, C. J., Seidler, R. D., Van Gemmert, A. W. A., & Stelmach, G. E. (2002). Age-related kinematic differences as influenced by task difficulty, target size, and movement amplitude. *The Journals of Gerontology: Series B*, 57(1), P54–P64. https://doi.org/10.1093/geronb/57.1.P54 – Alter und Zielbewegungen
- Lyons, J., Hansen, S., Hurding, S., & Elliott, D. (2006). Optimizing rapid aiming behaviour: Movement kinematics depend on the cost of corrective modifications. *Experimental Brain Research*, 174(1), 95–100. https://doi.org/10.1007/s00221-006-0426-6 – Unterschießen statt Überschießen
- MacKenzie, I. S., Kauppinen, T., & Silfverberg, M. (2001). Accuracy measures for evaluating computer pointing devices. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '01)* (S. 9–16). ACM. https://doi.org/10.1145/365024.365028 – Wiedereintritt ins Ziel als Überschießmaß (Volltext gelesen)
- McAuley, J. H., & Marsden, C. D. (2000). Physiological and pathological tremors and rhythmic central motor control. *Brain*, 123(8), 1545–1567. https://doi.org/10.1093/brain/123.8.1545 – Tremorfrequenzen
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology*, 83(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blick bleibt am Zeigeziel
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest*, 17(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer von Übungsprogrammen
- W3C. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (W3C Recommendation, 12.12.2024). https://www.w3.org/TR/WCAG22/ – Blitzgrenze 3/s; Norm, keine DOI
- Zelaznik, H. N., Hawkins, B., & Kisselburgh, L. (1983). Rapid visual feedback processing in single-aiming movements. *Journal of Motor Behavior*, 15(3), 217–236. https://doi.org/10.1080/00222895.1983.10735298 – visuelle Rückmeldung < 190 ms
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology*, 351, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Folge-Gain unter 0,95, sinkt mit Tempo
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, 9, 131. https://doi.org/10.3389/fnhum.2015.00131 – einfache Reaktionszeit und ihre Komponenten (213–231 ms, +0,55 ms je Lebensjahr)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Lehrbuch: Warnzeichen mit Abklärungsbedarf (S. 6, 28), Gesichtsfeldausfälle nach Sehbahnverlauf (S. 32)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Lehrbuch: Genauigkeit und Wiederholbarkeit von Messungen, Korrelation ist keine Übereinstimmung (S. 17–18, 24)
