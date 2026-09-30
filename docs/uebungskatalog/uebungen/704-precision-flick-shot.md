---
# ===== Kennung =====
nr: 704
kennung: precision-flick-shot
name: "Präzisions-Flick – schrumpfende Ziele schnell und mittig treffen"
name_original: "Flick Aim Trainer – Maus Zielgenauigkeit Test (Precision Flick Shot; Seitentitel: Flick Aim Trainer | Mausgenauigkeit testen)"
kapitel: "Motorik"
kapitel_original: "motor"
unterkapitel_original: "hand-eye-coordination"
quelle_url: "https://skilldrills.online/de/drills/motor/hand-eye-coordination/precision-flick-shot"
blickfit_umsetzung: {kennung: "praezisions-flick", name: "Präzisions-Flick", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/praezisions-flick/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Auf dunklem Grund stehen immer zwei ruhende grüne Kreisziele, die stetig schrumpfen. Man springt mit einem Fadenkreuz per Maus von Ziel zu Ziel und klickt, bevor ein Ziel verschwindet; ein Klick ins Zentrum zählt doppelt, mit steigender Punktzahl starten die Ziele kleiner und schrumpfen schneller."
ziel_funktionen: [auge_hand_koordination, zielbewegung_tempo, zielbewegung_praezision]
eingabe: [maus, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Stufenlos nach Punkten (Code): Level = Punkte/1.400 + 1. Startradius 32 px → Grenzwert 14 px, Schrumpftempo 18 → 65 px/s; das gerade aktive Ziel schrumpft voll, das zweite mit 58 %; Lebensdauer des aktiven Ziels ≈ 1,6 s (Level 1) → ≈ 0,45 s (Level 10). Eine Trefferserie macht Ziele zusätzlich bis 15 % kleiner und 20 % schneller schrumpfend. 45 s Startzeit, Treffer +2 s (max. 60 s), Fehlklick/verfallenes Ziel −1 s – die Rundendauer ist daher variabel."
messgroessen: ["Punkte", "Trefferquote (Treffer/Klicks)", "Zentrumstreffer (Bulls-Eye-Anzahl)", "Fehlklicks", "längste Trefferserie", "erreichtes Level", "sinnvoll ergänzend: Zeit vom Erscheinen bis zum Treffer, Endpunktabstand zur Zielmitte, verfallene Ziele"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 0
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 0
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 1
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 3
    zielbewegung_tempo: 3
    zielbewegung_praezision: 3
    kontinuierliche_steuerung: 0
    ruhige_hand: 1
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
voraussetzungen: ["Maus (oder Touchpad) und Desktop-Browser mit Vollbild und Pointer Lock; auf reinen Touch-Geräten lässt sich das Original nicht starten", "ruhige Unterlage, Monitor ca. 50–70 cm", "passende Korrektion für den Bildschirmabstand (bei Alterssichtigkeit Zwischen-/Nahkorrektur)", "kein Farbsehen nötig (Ziele hell auf fast schwarzem Grund)", "Verlassen von Vollbild/Pointer Lock oder Esc beendet die Runde"]
vorsicht_bei: [hand_arm_beschwerden, tremor_parkinson, sehbehinderung_niedriger_visus, presbyopie_gleitsicht, gesichtsfeldausfall, trockenes_auge_bildschirm, photosensitive_epilepsie, migraene_lichtempfindlich, kognitive_einschraenkung]
geeignet_fuer: ["schnelle, genaue Zielsprünge mit der Maus zwischen ruhenden Zielen üben (Auge-Hand-Koordination unter Zeitdruck)", "Tempo-Genauigkeits-Abwägung bewusst erleben (Zentrumsbonus gegen Zeitlimit)", "einfache Priorisierung zwischen zwei Zielen (das leuchtende, schneller schrumpfende zuerst)", "Fortschritt mit sich selbst am selben Gerät vergleichen (Trefferquote, Zentrumsquote, Level)"]
weniger_geeignet_fuer: ["Tablet ohne Maus (Original blockiert Touch; Zentrumszone mit dem Finger nicht gezielt treffbar)", "Menschen mit Tremor oder eingeschränkter Handmotorik (kleine, verfallende Ziele, Fehlklicks bestraft)", "Einsteiger:innen und Ältere mit wenig Computererfahrung (Ziele ab mittlerem Level < 1 s sichtbar)", "wer eine feste, kurze Übungsdauer braucht", "Übungsziel reine Blickmotorik ohne Hand (dafür Kapitel 400) oder bewegte Ziele (702, 104)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Schnelle Zielbewegungen werden durch Üben in der geübten Aufgabe schneller und genauer, Aim-Trainer-Messwerte sind zwischen Sitzungen stabil; Übertragung auf andere Aufgaben ist gering, ein Nutzen für Alltag oder Spiele wie CS2/Valorant ist für diese Übung nicht untersucht."
aehnliche_uebungen: [501, 702, 509, 508, 502, 510, 708, 804, 302]
stichworte: ["Flick Shot", "Aim Trainer", "schrumpfende Ziele", "Fitts'sches Gesetz", "Submovements", "Zwei-Komponenten-Modell", "Speed-Accuracy-Trade-off", "Auge-Hand-Koordination", "Bulls-Eye", "Pointer Lock"]
---

# 704 · Präzisions-Flick – schrumpfende Ziele schnell und mittig treffen

> Original: „Flick Aim Trainer – Maus Zielgenauigkeit Test“ (Precision Flick Shot) – skilldrills.online, Kapitel Motorik (`motor/hand-eye-coordination`) · Blickfit: noch nicht umgesetzt (verwandt: `zielfang`, bewegtes Ziel antippen)

## 1. Kurzbeschreibung
Auf einem fast schwarzen Spielfeld stehen immer zwei grüne Kreisziele an zufälligen Orten. Sie bewegen sich nicht, schrumpfen aber stetig, bis sie verschwinden. Man springt mit einem weißen Fadenkreuz per Maus zu einem Ziel und klickt; wer die Mitte trifft, bekommt doppelte Punkte. Treffer bringen Zeit, Fehlklicks und verfallene Ziele kosten Zeit und beenden die Serie. Es geht um schnelle, zielgenaue Einzelbewegungen („Flicks“) und um die Abwägung zwischen Tempo und Genauigkeit.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext und ausgelieferter Spielcode (Chunk 35636 mit Hilfsmodulen, Stand 29.09.2026; nur Mechanik übernommen).

- **Start/Eingabe (Code):** Countdown ≈ 2,45 s, dann Vollbild und **Pointer Lock** (ohne Anforderung unbeschleunigter Mausdaten – die Zeigerbeschleunigung des Betriebssystems wirkt). Fadenkreuz: Ring 14 px Radius, Mittelpunkt Ø 4 px, bewegt um Mausweg × Empfindlichkeit (0,1–3, Standard 1). Esc oder Verlassen von Vollbild/Pointer Lock bricht ab. Auf Geräten mit Touch und ohne feinen Zeiger zeigt die Startseite statt des Startknopfs einen Maus-Hinweis – **Tablet ohne Maus: nicht spielbar**; Touchpads funktionieren.
- **Ziele (Code):** immer **2 ruhende Ziele**; Abstand zum Rand ≥ Radius + 40 px, zueinander möglichst ≥ 3 × Radius. Eines ist „aktiv“ (mit Leuchtschein) und schrumpft mit dem vollen Schrumpftempo, das andere mit 58 %. Ein Ziel verfällt bei Radius ≤ 4 px. Wird das aktive getroffen, wird das andere aktiv; jedes getroffene Ziel wird sofort ersetzt – der nächste Flick beginnt dort, wo der letzte endete. Parameter nach Fortschritt p = (Level − 1)/14, exponentiell gegen einen Grenzwert [Werte eigene Berechnung aus den Code-Formeln]:

  | Level (Punkte) | 1 (0) | 5 (5.600) | 10 (12.600) | 15 (19.600) | Grenzwert |
  |---|---|---|---|---|---|
  | Startradius | 32 px | 28 px | 23 px | 18 px | 14 px |
  | Schrumpftempo aktives Ziel | 18 px/s | 28 px/s | 42 px/s | 54 px/s | 65 px/s |
  | Lebensdauer aktives Ziel (ab voller Größe) | 1,56 s | 0,89 s | 0,45 s | 0,27 s | ≈ 0,15 s |

  Ab 3 Treffern in Folge steigt ein Serienfaktor (1,1 … 3,0 ab 50 Treffern); er macht neue Ziele bis 15 % kleiner (mindestens 10 px Radius) und bis 20 % schneller schrumpfend (Level 1 mit voller Serie: 1,07 s statt 1,56 s).
- **Treffer und Punkte (Code):** Treffer, wenn der Klick ≤ **aktueller Radius + 6 px** von der Mitte liegt (Trefferzone größer als das sichtbare Ziel). **Zentrumstreffer** („Bulls-Eye“): ≤ **8 px vom Mittelpunkt** – ein fester Kreis von **Ø 16 px**, unabhängig von der Zielgröße (bei Zielen mit Radius < 8 px ist jeder Treffer nahe der Mitte ein Zentrumstreffer). Punkte = 100 (Zentrum 200) × Serienfaktor × (1 + 0,5·p). Level = Punkte/1.400 + 1 (stufenlos, nur steigend).
- **Zeit und Strafen (Code):** Start 45 s; Treffer **+2 s** (max. 60 s); Fehlklick **und** verfallenes Ziel: Serie auf 0, Bildwackeln (6 px, abklingend), roter Vollbild-Blitz 480 ms (abschaltbar), Strafton, **−1 s**. Die Strafe ist im Code immer aktiv. Wer mehr als ≈ 0,5 Treffer/s schafft, verlängert die Runde [eigene Ableitung].
- **Globale Einstellung (Code):** Schrumpfen und Verfallen hängen an einer seitenweiten Einstellung „Zeitablauf“ (im Browser gespeichert, Standard an; in dieser Übung selbst nicht umschaltbar). Wurde sie in einer anderen Übung ausgeschaltet, schrumpfen die Ziele hier gar nicht – die Übung wird dann zu reinem Zielen auf ruhende Ziele.
- **Bildfrequenz (Code):** Schrumpfen und Zeit mit Zeitschritt dt (auf 100 ms begrenzt) → frameunabhängig; nur die Treffer-Partikel (Kosmetik) bewegen sich pro Frame.
- **Auswertung (Code):** Trefferquote = Treffer/Klicks (verfallene Ziele zählen nicht), Zentrumstreffer, Fehlklicks, beste Serie, Level; Note S+ … F nur aus den Punkten (100·√(Punkte/51.000); S+ ab ≈ 46.000 Punkten). **Eine Reaktions- oder Erfassungszeit wird nicht gemessen.** Bestwerte nur lokal im Browser.
- **Widersprüche Regeltext ↔ Code:** (1) Zeitbonus laut deutschem Text +0,6 s, im Code +2 s (die englische Regelkarte im Code sagt selbst „+2s“). (2) Strafe laut Text −0,8 s (auch die englische Regelkarte im Code sagt „-0.8s“), tatsächlich abgezogen wird −1 s. (3) „Inneres 8-Pixel-Zentrum“: im Code 8 px **Radius**, also Ø 16 px. (4) Leistungstabelle und FAQ nennen „mittlere Latenz“ und einen Rang aus Genauigkeit, Zentrumsquote, Serie und Reaktionszeit – der Code misst keine Latenz, die Note hängt nur von den Punkten ab. (5) „45 s“: tatsächliche Dauer variabel. (6) Tabelle nennt Ränge D bis S+, der Code F bis S+.

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite beschreibt einen Hochgeschwindigkeits-Drill für FPS-Spieler (CS2, Valorant, Apex), der Flick-Präzision, Zielerfassung und „Zentrums-Klick-Timing“ trainiere. Begründung: Woodworths Zwei-Phasen-Modell und das „Stochastic Optimized Submovement Model“ (Meyer et al., 1988); das Belohnen von Zentrumstreffern zwinge den motorischen Kortex, die Endpunktstreuung zu verringern und Korrekturbewegungen „komplett zu eliminieren“. Dazu vier „wissenschaftliche Trainingsprotokolle“ (u. a. Handgelenkstrecker bewusst zum Bremsen aktivieren), eine fünfstufige Tabelle (Tier 1 „Apex Flick Meister“: Level 15+, < 340 ms, ≥ 96 % Genauigkeit), DPI-Empfehlungen und eine tägliche 10–15-min-Routine. Einordnung (Quellenprüfung in Abschnitt 11, Literaturbasis W09 A4):
- **Belegt:** Zielbewegungen bestehen aus Primärimpuls und rückmeldungsgestützter Endkorrektur (Elliott et al., 2001); schnellere Impulse streuen stärker, deshalb entstehen öfter Korrekturbewegungen (Meyer et al., 1988; Harris & Wolpert, 1998); Fitts-Beziehung für ruhende Ziele – die Ziele hier ruhen tatsächlich.
- **Nicht belegt / überzogen:** „Korrekturlatenz 150–200 ms“ steht nicht in den Quellen; Sichtrückmeldung wirkt auch bei Bewegungen unter 190 ms (Zelaznik et al., 1983). Dass ein Punktebonus Korrekturen „komplett eliminiert“ oder den Kortex „zwingt“, ist nicht untersucht. Wer Genauigkeit betont, wird langsamer, wer Tempo betont, macht mehr Fehler – die Leistung (Durchsatz) bleibt dabei etwa gleich (MacKenzie & Isokoski, 2008). „Foveale Ausrichtung“: Das ganze Ziel liegt nach dem Blicksprung im scharfen zentralen Sehen; das Zentrum zu treffen ist eine Frage der Handgenauigkeit, nicht der Fovea. „Handgelenkstrecker gezielt aktivieren“ ist keine belegte Trainingsmethode; Elliott et al. (2010) behandeln Antagonisten nicht als Kernaussage.
- **Transferversprechen** („trainiert direkt Eröffnungsduelle in CS2/Valorant“, „schärft neuromuskuläre Reaktionsbereitschaft“) sind ohne Beleg (Abschnitt 8).
- **Leistungstabelle:** Die Seite erhebt nach eigener Aussage keine Nutzerdaten, und die zitierten Arbeiten enthalten keine solchen Stufen – **keine Datengrundlage**. Die Latenzspalte ist mit diesem Spiel nicht messbar (Abschnitt 2). „Lv. 15+“ ist schwer zu halten: Dort lebt das aktive Ziel ab voller Größe nur ≈ 0,27 s (Grenzwert ≈ 0,15 s), kürzer als eine einfache Reaktionszeit (≈ 213 ms hardwarekorrigiert; Woods et al., 2015) plus eine typische Zeigebewegung (Maus ≈ 674 ms in einer Standardaufgabe; MacKenzie et al., 1991). Da das Level nur steigt und Serien- und Levelfaktor die Punkte vervielfachen, kann Level 15 (19.600 Punkte) aber durchaus einmal erreicht werden [eigene Abschätzung, nicht empirisch geprüft; das zweite Ziel kann schon vorher anvisiert werden].
- **Hardware-Tipps:** 16,7 ms bei 60 Hz und 6,9 ms bei 144 Hz sind reine Arithmetik; der Vorteil hängt vor allem an der Gesamtlatenz (Spjut et al., 2019). „800 DPI, 30–45 cm/360°“ passt nicht zu einem 2-D-Feld mit eigener Empfindlichkeit; da der Code keine Rohdaten anfordert, wirkt die Zeigerbeschleunigung – „Rohdaten-Mausabfrage“ ist also nicht gewährleistet. Zeigerbeschleunigung macht Zeigen eher schneller (Casiez et al., 2008).

## 4. Optische und okulomotorische Grundlagen
- **Sehwinkel** [eigene Berechnung; 24″ Full-HD, 0,274 mm/px, 60 cm | Tablet 0,19 mm/CSS-px, 40 cm]: Startziel Ø 64 px = 17,5 mm ≈ 1,7° | 12,2 mm ≈ 1,7°; Level 10 Ø ≈ 46 px ≈ 1,2°; kurz vor dem Verfall Ø 8 px = 2,2 mm ≈ 0,21°; Zentrumszone Ø 16 px = 4,4 mm ≈ 0,42° | 3,0 mm. Die Literaturbasis (F86) rechnete mit 8 px Durchmesser – im Code sind es 8 px Radius. Alle Ziele sind ≥ 12′ groß (nur der Fadenkreuzpunkt Ø 4 px ≈ 1,1 mm ≈ 6′ ist kleiner); die Sehschärfe begrenzt bei korrigiertem Sehen nicht, erst bei niedrigem Visus werden verfallende Ziele und der Fadenkreuzpunkt schwer sichtbar (ISO 8596-Definition des Visus).
- **Blickverhalten:** Vor jedem Flick springt der Blick per Sakkade zum Ziel, die Hand startet ≈ 100 ms später (Prablanc et al., 1979); während der Zeigebewegung bleibt der Blick am Ziel verankert; Sakkaden zu einem neuen Ziel, das während der Handbewegung erscheint, starten um ≈ 155 ms verzögert (Neggers & Bekkering, 2000) – der Blick wechselt also meist erst nach dem Klick zum zweiten Ziel (Übertragung auf diese Übung: eigene Einordnung). Das zweite Ziel liegt meist peripher und muss dort entdeckt und in seiner Größe (Dringlichkeit) eingeschätzt werden. Hoher Kontrast auf fast schwarzem Grund; keine Bewegung, die verfolgt werden müsste (`blickfolge` = 0).
- **Brille:** Ziele erscheinen im ganzen Feld; bei Gleitsicht ist der scharfe Zwischenbereich schmal, seitlich liegende Ziele werden unscharf und ein zu hoher Monitor zwingt in den Fernteil. Monitor tiefer stellen, Kopf mitdrehen (Weidling & Jaschinski, 2015), ggf. Arbeitsplatzbrille; Akkommodationsbedarf bei 60 cm ≈ 1,7 dpt.
- **Trockenes Auge:** Konzentriertes Bildschirmsehen senkt die Lidschlagrate deutlich (Patel et al., 1991); die Runde kann sich verlängern – Pausen einplanen.
- **Farbe/Tiefe:** Grüne Ziele, roter Fehler-Blitz; Farbunterscheidung ist nicht nötig (Farbwechsel ab Serie 10 nur Zusatzinfo). Stereosehen spielt keine Rolle.

## 5. Neurowissenschaftliche Grundlagen
Zielsprünge verbinden das Sakkadensystem (frontales Augenfeld, Colliculus superior) mit parietalen und prämotorischen Arealen, die den Sehort in eine Handbewegung übersetzen; das Kleinhirn wird umso stärker beansprucht, je mehr Auge und Hand zusammenarbeiten müssen (Miall et al., 2001). Vorwärtsmodelle sagen die Folgen des eigenen Bewegungsbefehls voraus und ermöglichen Korrekturen schon während der Bewegung (Shadmehr et al., 2010) – das ist die „frühe Impulskontrolle“ im Mehrprozessmodell (Elliott et al., 2010). Signalabhängiges Rauschen im motorischen System erklärt, warum schnelle Impulse ungenauer enden (Harris & Wolpert, 1998). Beim Üben verschiebt sich die Beteiligung kortiko-striataler und kortiko-zerebellärer Systeme (Doyon & Benali, 2005). Dass diese Übung den „motorischen Kortex“ oder andere Regionen gezielt trainiert, ist nicht belegt.

## 6. Motorische Grundlagen
- **Fitts'sches Gesetz** (ruhende Ziele, hier passend): Bewegungszeit = a + b · ID mit ID = log₂(D/W + 1); Maus-Durchsatz 3,7–4,9 bit/s, Touchpad 1–2,9 bit/s (Soukoreff & MacKenzie, 2004). Bei D ≈ 400 px und W = Trefferzone ergibt sich ID ≈ 2,7 bit (Startziel), ≈ 3,8 bit (kleine Ziele) und ≈ 4,7 bit für die Zentrumszone [eigene Abschätzung]. Die Zentrumszone verlangt also rund 2 bit mehr – bei gleichem Durchsatz (3,7–4,9 bit/s) ≈ 0,4–0,55 s längere Bewegung, die das Schrumpfen oft nicht zulässt.
- **Zwei Komponenten, Submovements:** Primärimpuls plus Endkorrektur; das optimierte Submovement-Modell sagt voraus, dass Menschen die Impulsgeschwindigkeit so wählen, dass die Gesamtzeit aus Impuls und Korrekturen minimal wird (Meyer et al., 1988). Überschießen kostet eine Korrektur in Gegenrichtung.
- **Tempo-Genauigkeit:** Punktbonus (Genauigkeit) und Schrumpfen/Zeitstrafe (Tempo) ziehen in entgegengesetzte Richtungen. Solche Instruktionen verschieben Zeit und Fehler, nicht den Durchsatz (MacKenzie & Isokoski, 2008) – Punktzahl und Zentrumsquote spiegeln daher auch die gewählte Strategie.
- **Schrumpfende Ziele:** Die Trefferzone wird während der Bewegung kleiner; wer spät ankommt, trifft ein kleineres Ziel. Das begünstigt früh gestartete, schnelle Impulse.
- **Maus-Übersetzung:** Zu niedrige Empfindlichkeit erzwingt Nachsetzen, hohe schadet wenig (Casiez et al., 2008).
- **Touch:** Fingertippen ist schnell, aber ungenau: 2,4 mm breite Ziele → 29–38 % Fehler, 4,8 mm → 11–14 % (Bi et al., 2013). Die Zentrumszone (≈ 3 mm am Tablet) ist mit dem Finger also kaum zuverlässig treffbar; der Finger verdeckt zudem das kleine Ziel (Vogel & Baudisch, 2007). Ein „Flick“ im Sinne einer ballistischen Zeigerbewegung gibt es auf Touch nicht: Das Antippen ist eine direkte Arm-/Fingerbewegung ohne Zeiger und ohne Schwebezustand.

## 7. Einflussfaktoren und Messgrenzen
- **Alter:** Ältere nutzen mehr Teilbewegungen und positionieren langsamer (Walker et al., 1997); Touch verkleinert den Altersnachteil gegenüber der Maus (Findlater et al., 2013). Durch das feste Schrumpftempo steigt der Zeitdruck für Ältere überproportional.
- **Gerät:** Maus-/USB-Latenz schwankt je Gerät um bis zu mehrere Dutzend ms (Wimmer et al., 2019); die Feldgröße hängt vom Fenster ab (Abstände, ID); Empfindlichkeit und Betriebssystem-Beschleunigung verändern das Ergebnis. Seriös ist nur der Vergleich **mit sich selbst am selben Gerät**.
- **Regeln:** Zufällige Zielorte, variable Rundendauer und überproportional wachsende Punkte (Level- und Serienfaktor) – Punkte sind kein lineares Leistungsmaß. Trefferquote ignoriert verfallene Ziele; eine Erfassungszeit fehlt.
- **Zuverlässigkeit:** Für KovaaK's waren Trefferquote und Treffer/s zwischen zwei Sitzungen sehr stabil (ICC 0,947–0,995, n = 10; Rogers et al., 2024) – für dieses Original nicht untersucht.
- **Ermüdung:** 6 × 5 min Maus-Zielen ermüdete die Handgelenkstrecker messbar (bis 9,3 % MVC), ohne Leistungsabfall (Forman et al., 2025) – relevant für die empfohlene tägliche Routine.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt – mittel:** Übungskurven motorischer Aufgaben steigen verlässlich (Heathcote et al., 2000); in einem Aim-Trainer verbesserte sich zwischen zwei Sitzungen nur eine von vier Aufgaben, und zwar ausgerechnet die Flick-Aufgabe („Macro-Flicking“; Rogers et al., 2024). Die punktgesteuerte Schwierigkeit passt grob zum „Challenge Point“-Prinzip (Guadagnoli & Lee, 2004), hat aber keine Rückstufung.
- **Naher Transfer – schwach:** Motorisches Lernen ist sehr aufgabenspezifisch (Karni et al., 1995); ob sich Zentrumstreffer-Training auf andere Zeigegeräte oder Zielarten überträgt, ist nicht untersucht.
- **Alltagstransfer – fehlend:** Kein Beleg für bessere Spiel-, Alltags- oder Berufsleistung. Videospiel-Training verbessert die allgemeine kognitive Leistung nicht (Sala et al., 2018); positive Action-Spiel-Effekte betreffen Aufmerksamkeit, nicht Mausmotorik, und sind durch Publikationsbias überschätzt (Bediou et al., 2018).

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** schnelle, genaue Zeigebewegungen zu ruhenden Zielen mit der Maus geübt werden sollen; jemand die Abwägung „schnell oder genau“ spielerisch üben möchte; eine Stufe zwischen ruhenden, nicht schrumpfenden Zielen (708, dort mit Zeitlimit je Kette) und bewegten Zielen (702) gesucht wird.
- **Weniger passend, wenn …** nur ein Tablet vorhanden ist; wenig Computererfahrung oder Stress durch Zeitdruck besteht; eine feste Dauer nötig ist; das Ziel reine Blickmotorik oder Blickfolge ist (Kapitel 400).
- **Vorsicht / anpassen bei …** `hand_arm_beschwerden` (viele schnelle Zielbewegungen, Runde kann sich verlängern); `tremor_parkinson` (kleine, verfallende Ziele, Fehlklicks bestraft – frustrierend); `sehbehinderung_niedriger_visus` (verfallende Ziele bis ≈ 0,2°, Fadenkreuzpunkt ≈ 0,1°); `presbyopie_gleitsicht` (Ziele im ganzen Feld, seitliche Unschärfe); `gesichtsfeldausfall` (das zweite Ziel muss peripher entdeckt werden); `trockenes_auge_bildschirm` (Starren, variable Dauer); `photosensitive_epilepsie`, `migraene_lichtempfindlich` (roter Vollbild-Blitz und Bildwackeln bei jedem Fehler und jedem verfallenen Ziel – bei Fehlerserien mehrere Blitze kurz hintereinander möglich; Blitz abschalten); `kognitive_einschraenkung` (sehr hoher Zeitdruck, aktive Ziele ab mittlerem Level < 1 s sichtbar, Zeitstrafen – wie bei 702 und 708).
- **Kombiniert gut mit …** 708 (ruhende Ziele, Reihenfolge) als Vorstufe, 702 (bewegte Ziele) und 501/509 (Flick, Mikrokorrektur) als Varianten, 510 (Zielauswahl), 705 als ruhiger Ausgleich.
- **Überschneidungen / Unterschiede:** 704 ist ein **naher Verwandter** von 702 und 708 (gleiches Spielgerüst: Fadenkreuz mit Pointer Lock, +2 s/−1 s, Serienfaktor bis 3,0, offene Rundendauer). Unterschied: nur 704 hat schrumpfende Ziele und einen Zentrumsbonus – hier ist `zielbewegung_praezision` am stärksten gefordert; 702 fordert zusätzlich das Abfangen bewegter Ziele, 708 Tempo und Blickvorlauf in Ketten. Sehr ähnlich ist außerdem 501 (Flick-Training mit einem einzelnen, zeitlich begrenzten Ziel, ohne Zentrumsbonus). Für eine Auswahl genügt meist eine dieser Übungen.

Keine Diagnose, kein Heil-, Seh- oder Leistungsversprechen; Ergebnisse sind keine Messung von Krankheitszeichen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Tablet/Touch:** Original blockiert Touch. Umsetzung als direktes Antippen schrumpfender Ziele: Trefferzone ≥ 9 mm (≈ 48 CSS-px bei 0,19 mm/px) auch bei kleinem sichtbarem Ziel, Zentrumsbonus nur mit großzügiger Zone (≥ 7 mm) oder auf Touch ganz weglassen und stattdessen den Abstand zur Mitte als Rückmeldung zeigen; Ziele nicht unter dem Finger-/Handbereich der vorherigen Berührung erscheinen lassen (Verdeckung).
- **Regeln ehrlich machen:** Text und Code angleichen (+2 s/−1 s, 16-px-Zentrum), feste Rundendauer statt Zeitbilanz, ganze Levelstufen, Schrumpftempo in mm/s bzw. °/s statt px/s.
- **Messqualität:** Zeit vom Erscheinen bis zum Treffer und Endpunktabstand zur Mitte messen (die Website nennt Latenzen, die der Code nicht erfasst); verfallene Ziele in die Trefferquote einrechnen; adaptive Treppe (z. B. 3-down/1-up) mit Rückstufung statt nur steigender Level.
- **Sicherheit/Barrierefreiheit:** Kein roter Vollbild-Blitz, kein Wackeln; Fehlerfeedback über Form/Ton, nicht nur Farbe; langsamer Einstieg für Ältere; Pausenhinweis; keine Tier-Tabellen ohne Daten.

## 11. Quellen
### Von der Website angegeben
- Meyer, D. E., Abrams, R. A., Kornblum, S., Wright, C. E., & Smith, J. E. K. (1988). Optimality in human motor performance: Ideal control of rapid aimed movements. *Psychological Review, 95*(3), 340–370. https://doi.org/10.1037/0033-295X.95.3.340 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** ja für das Modell (Rauschen wächst mit dem Tempo, Korrekturbewegungen); nein für „Korrekturlatenz 150–200 ms“ und „Korrekturen komplett eliminieren“.
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt:** ja (ruhende Ziele wie in dieser Übung).
- MacKenzie, I. S. (1992). Fitts' law as a research and design tool in human-computer interaction. *Human–Computer Interaction, 7*(1), 91–139. https://doi.org/10.1207/s15327051hci0701_3 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Fitts-Methodik in der HCI ja; die Aussage zur „Tarierung des Primärimpulses“ stammt aus Meyer et al.).
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming: Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 – **Prüfung:** DOI, Titel, Jahr ✓, **Autor:innen falsch** (Website: „Elliott, Helsen & Chua“ – Autoren der Arbeit von 2001); **stützt:** teilweise (Zwei Komponenten und frühe Online-Kontrolle ja; „zentrale Rolle antagonistischer Muskelaktivierung“ ist nicht die Kernaussage).
- Woodworth, R. S. (1899). Accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3), i–114. https://doi.org/10.1037/h0092992 – **Prüfung:** DOI stimmt ✓ (Titel ohne „The“); **stützt:** ja für die Zwei-Phasen-Steuerung; die Stufentabelle „auf Basis Woodworth/Meyer“ stammt nicht daraus.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Geräteeinflüsse auf Zeitmessung ja; 16,7/6,9 ms sind Arithmetik, gemessen wurde nur an 60 Hz; eine Latenz misst diese Übung gar nicht).

### Weitere Fachliteratur
- Bediou, B., Adams, D. M., Mayer, R. E., Tipton, E., Green, C. S., & Bavelier, D. (2018). Meta-analysis of action video game impact on perceptual, attentional, and cognitive skills. *Psychological Bulletin, 144*(1), 77–110. https://doi.org/10.1037/bul0000130 – Transfer, Publikationsbias
- Bi, X., Li, Y., & Zhai, S. (2013). FFitts law: Modeling finger touch with Fitts' law. In *Proceedings of CHI '13* (S. 1363–1372). ACM. https://doi.org/10.1145/2470654.2466180 – Fehlerraten beim Fingertippen
- Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction, 23*(3), 215–250. https://doi.org/10.1080/07370020802278163 – Mausempfindlichkeit, Zeigerbeschleunigung
- Doyon, J., & Benali, H. (2005). Reorganization and plasticity in the adult brain during learning of motor skills. *Current Opinion in Neurobiology, 15*(2), 161–167. https://doi.org/10.1016/j.conb.2005.03.004 – Lernnetzwerke
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin, 127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – Zwei-Komponenten-Modell
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of CHI '13* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Alter, Touch vs. Maus
- Forman, G. N., Nikitin, S. A., Lang, C. J., Gabriel, D. A., Sonne, M. W., Kociolek, A. M., & Holmes, M. W. R. (2025). Impact of repetitive mouse aiming on muscle fatigue and fine motor performance of the distal upper limb. *Journal of Electromyography and Kinesiology, 82*, 102992. https://doi.org/10.1016/j.jelekin.2025.102992 – Ermüdung
- Guadagnoli, M. A., & Lee, T. D. (2004). Challenge point: A framework for conceptualizing the effects of various practice conditions in motor learning. *Journal of Motor Behavior, 36*(2), 212–224. https://doi.org/10.3200/JMBR.36.2.212-224 – adaptive Schwierigkeit
- Harris, C. M., & Wolpert, D. M. (1998). Signal-dependent noise determines motor planning. *Nature, 394*(6695), 780–784. https://doi.org/10.1038/29528 – Rauschen und Speed-Accuracy-Trade-off
- Heathcote, A., Brown, S., & Mewhort, D. J. K. (2000). The power law repealed: The case for an exponential law of practice. *Psychonomic Bulletin & Review, 7*(2), 185–207. https://doi.org/10.3758/BF03212979 – Übungskurven
- Karni, A., Meyer, G., Jezzard, P., Adams, M. M., Turner, R., & Ungerleider, L. G. (1995). Functional MRI evidence for adult motor cortex plasticity during motor skill learning. *Nature, 377*(6545), 155–158. https://doi.org/10.1038/377155a0 – Lernspezifität
- MacKenzie, I. S., & Isokoski, P. (2008). Fitts' throughput and the speed-accuracy tradeoff. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '08)* (S. 1633–1636). ACM. https://doi.org/10.1145/1357054.1357308 – Tempo- vs. Genauigkeitsbetonung ändert Zeit und Fehler, nicht den Durchsatz (n = 18, 5.400 Durchgänge; Crossref ✓, Abstract über OpenAlex)
- MacKenzie, I. S., Sellen, A., & Buxton, W. (1991). A comparison of input devices in elemental pointing and dragging tasks. In *Proceedings of CHI '91* (S. 161–166). ACM. https://doi.org/10.1145/108844.108868 – Zeigezeit mit der Maus
- Miall, R. C., Reckess, G. Z., & Imamizu, H. (2001). The cerebellum coordinates eye and hand tracking movements. *Nature Neuroscience, 4*(6), 638–644. https://doi.org/10.1038/88465 – Kleinhirn, Auge-Hand
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blick beim Zeigen, Zielwechsel
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm
- Prablanc, C., Echallier, J. F., Komilis, E., & Jeannerod, M. (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. *Biological Cybernetics, 35*(2), 113–124. https://doi.org/10.1007/BF00337436 – Sakkade vor Handbewegung
- Rogers, E. J., Trotter, M. G., Johnson, D., Desbrow, B., & King, N. (2024). KovaaK's aim trainer as a reliable metrics platform for assessing shooting proficiency in esports players: A pilot study. *Frontiers in Sports and Active Living, 6*, 1309991. https://doi.org/10.3389/fspor.2024.1309991 – Zuverlässigkeit, Lerneffekt beim Flicking
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – fehlender Ferntransfer
- Shadmehr, R., Smith, M. A., & Krakauer, J. W. (2010). Error correction, sensory prediction, and adaptation in motor control. *Annual Review of Neuroscience, 33*, 89–108. https://doi.org/10.1146/annurev-neuro-060909-153135 – Vorwärtsmodelle
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts' law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 – Durchsatz Maus/Touchpad
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – Latenz vs. Bildfrequenz
- Vogel, D., & Baudisch, P. (2007). Shift: A technique for operating pen-based interfaces using touch. In *Proceedings of CHI '07* (S. 657–666). ACM. https://doi.org/10.1145/1240624.1240727 – Verdeckung durch den Finger
- Walker, N., Philbin, D. A., & Fisk, A. D. (1997). Age-related differences in movement control: Adjusting submovement structure to optimize performance. *The Journals of Gerontology: Series B, 52B*(1), P40–P53. https://doi.org/10.1093/geronb/52B.1.P40 – Alter und Submovements
- Weidling, P., & Jaschinski, W. (2015). The vertical monitor position for presbyopic computer users with progressive lenses: How to reach clear vision and comfortable head posture. *Ergonomics, 58*(11), 1813–1829. https://doi.org/10.1080/00140139.2015.1035764 – Gleitsicht und Monitorhöhe
- Wimmer, R., Schmid, A., & Bockes, F. (2019). On the latency of USB-connected input devices. In *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems* (S. 1–12). ACM. https://doi.org/10.1145/3290605.3300650 – Eingabelatenz
- Zelaznik, H. N., Hawkins, B., & Kisselburgh, L. (1983). Rapid visual feedback processing in single-aiming movements. *Journal of Motor Behavior, 15*(3), 217–236. https://doi.org/10.1080/00222895.1983.10735298 – schnelle Sichtkorrektur
- ISO. (2017). *ISO 8596:2017 Ophthalmic optics — Visual acuity testing — Standard and clinical optotypes and their presentation.* https://www.iso.org/standard/69042.html – Norm, keine DOI; Definition des Visus
