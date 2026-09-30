---
# ===== Kennung =====
nr: 708
kennung: finger-sequencing
name: "Zielkette – ruhende Ziele in vorgegebener Reihenfolge anklicken"
name_original: "Aim Trainer Zielwechsel (Seitentitel: Aim Trainer Zielwechsel | Klicktest online; im Code „Sequence Aim Trainer“)"
kapitel: "Motorik"
kapitel_original: "motor"
unterkapitel_original: "movement-speed"
quelle_url: "https://skilldrills.online/de/drills/motor/movement-speed/finger-sequencing"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Auf dunklem Grund erscheint eine Kette aus drei bis fünf ruhenden Kreiszielen, verbunden durch eine gestrichelte Linie. Man klickt mit dem Fadenkreuz immer das hervorgehobene grüne Ziel an und arbeitet die Kette so schnell wie möglich in Reihenfolge ab; ab mittleren Stufen liegen rote Fallen-Ziele dazwischen, und die Zeit pro Kette wird knapper."
ziel_funktionen: [auge_hand_koordination, zielbewegung_tempo]
eingabe: [maus, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Stufenlos nach Punkten (Code): Level = Punkte/1.750 + 1, Punkte nur für vollständige Ketten (150 × Combo-Faktor 1–3 × Levelfaktor). Kettenlänge 3 → 4 (ab Level 3) → 5 Ziele (ab Level 6); Radius des ersten Ziels 25 → 15 px, Folgeziele bis Level 9 kleiner (bis 10 px), ab Level 10 alle gleich groß; Zeitlimit je ganze Kette 3,2 s → 0,7 s (mit Combo bis 25 % weniger); Abstand der Ziele 100–240 px → 220–620 px; Fallen-Wahrscheinlichkeit 20 % (Level 6) → 80 % (ab Level 9). Nominal 45 s, aber jedes richtige Ziel +2 s (max. 60 s Restzeit) – die Runde endet erst, wenn man weniger als ≈ 0,5 richtige Ziele pro Sekunde schafft."
messgroessen: ["Punkte", "vollständige Ketten", "Präzision (richtige Klicks/Aktionen; Fehlklicks zählen im Code doppelt)", "Fehlklicks, Fallen-Treffer, abgelaufene Ketten", "längste Kettenserie (Combo)", "erreichtes Level", "sinnvoll ergänzend: Zeit je Übergang (Klick zu Klick), Zeit bis zum ersten Ziel einer neuen Kette, Fitts-Durchsatz"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 1
    farbunterscheidung: 1
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
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
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
voraussetzungen: ["Maus (oder Touchpad) am Desktop-Browser mit Pointer Lock; auf reinen Touch-Geräten zeigt das Original statt des Startknopfs „Mouse Required for Pointer Lock“", "ruhige Unterlage, Monitor ca. 50–70 cm", "passende Korrektion für den Bildschirmabstand (bei Alterssichtigkeit Zwischen-/Nahkorrektur)", "Farbsehen nicht zwingend (aktives Ziel gefüllt mit weißem Rand, Fallen mit „!“), erleichtert aber die Orientierung", "Vollbild; Verlassen von Vollbild oder Pointer Lock bricht die Runde ab"]
vorsicht_bei: [hand_arm_beschwerden, tremor_parkinson, presbyopie_gleitsicht, sehbehinderung_niedriger_visus, gesichtsfeldausfall, trockenes_auge_bildschirm, photosensitive_epilepsie, migraene_lichtempfindlich, kognitive_einschraenkung]
geeignet_fuer: ["schnelle Zeigebewegungen zu ruhenden Zielen mit Blickvorlauf üben (Auge-Hand-Koordination, Tempo)", "Einstieg in Zielübungen: große, unbewegte Ziele, großzügige Trefferzone", "Fortschritt mit sich selbst am selben Gerät vergleichen (Level, Ketten, Fehler)", "Vorstufe vor bewegten Zielen und Flicks (702, 704, 502)"]
weniger_geeignet_fuer: ["Tablet ohne Maus (Original blockiert Touch)", "Menschen mit Tremor oder eingeschränkter Handmotorik (Zeitlimit je Kette bis 0,7 s, Fallen)", "wer eine feste, kurze Übungsdauer braucht (Runde verlängert sich mit jedem Treffer)", "Übungsziel Sequenzlernen oder Merkfähigkeit (jede Kette ist neu und die Reihenfolge immer sichtbar; dafür 607, 601)", "Übungsziel echte Fingerfolgen oder beidhändige Koordination (trotz Namens nicht gefordert; eher 703)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Serielle Zielbewegungen werden durch Übung in der geübten Aufgabe schneller (allgemeine Übungskurven, Fitts-Aufgaben); da jede Kette zufällig neu ist, entsteht kein Sequenzlernen im Sinne von Chunking. Übertragung auf andere Aufgaben ist gering, ein Nutzen für Spiele (osu!, CS2, Valorant) oder den Alltag ist nicht untersucht."
aehnliche_uebungen: [702, 704, 502, 501, 508, 204, 303, 302, 701, 607]
stichworte: ["Sequence Aim", "Zielkette", "serielles Zielen", "Fitts'sches Gesetz", "one-target advantage", "Blickvorlauf", "Auge-Hand-Koordination", "Trail Making", "Mauspräzision", "Pointer Lock", "Combo"]
---

# 708 · Zielkette – ruhende Ziele in vorgegebener Reihenfolge anklicken

> Original: „Aim Trainer Zielwechsel“ (Code: „Sequence Aim Trainer“) – skilldrills.online, Kapitel Motorik (`motor/movement-speed`) · Blickfit: noch nicht umgesetzt (verwandt: `zahlenjagd` = Zahlen der Reihe nach antippen, Vorbild 204)

## 1. Kurzbeschreibung
Auf einem dunklen Spielfeld erscheint eine kurze Kette aus drei bis fünf Kreisen, verbunden durch eine gestrichelte violette Linie. Das jeweils aktive Ziel ist grün gefüllt und von einem Zeitring umgeben; man fährt es mit dem Fadenkreuz an, klickt, und das nächste Ziel der Kette leuchtet auf. Ist die Kette fertig, gibt es Punkte, und sofort erscheint eine neue an anderer Stelle. Mit steigendem Level werden die Ketten länger, die Abstände größer, die Zeit pro Kette knapper, und rote Fallen-Ziele mit „!“ dürfen nicht angeklickt werden. Der Name „Finger Sequencing“ führt in die Irre: Es geht um schnelle Zeigebewegungen mit einem Zeiger, nicht um Fingerfolgen.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext und ausgelieferter Spielcode (seitenspezifischer Chunk 31824, gemeinsame Startseite 33539; Stand 29.09.2026; nur Mechanik übernommen).

- **Start/Eingabe (Code):** Countdown 3 s, Vollbild und **Pointer Lock**; das Fadenkreuz (Kreis 14 px Radius, Zentrum Ø 4 px) folgt den relativen Mausbewegungen × Empfindlichkeit. Treffer werden beim **Drücken** (pointerdown) ausgewertet. Auf Geräten mit Touch und ohne feinen Zeiger ersetzt die gemeinsame Startseite den Startknopf durch „Mouse Required for Pointer Lock“ – **auf dem Tablet ohne Maus nicht spielbar**, obwohl der Spielcode Touch-Koordinaten verarbeiten könnte.
- **Kette (Code):** erstes Ziel an zufälligem Ort, jedes weitere im Abstand „Mindestabstand + Zufall × Streuung“ vom vorigen, am Feldrand abgeschnitten (bei kleinem Fenster also kürzer), mit Mindestabstand zu allen Zielen. Nur das aktive Ziel ist gefüllt; spätere sind violette Umrisse, die bis Level 9 kleiner und blasser werden (Deckkraft bis 15 %). **Ziffern gibt es nicht** – die Reihenfolge zeigt allein die gestrichelte Linie (Deckkraft 25 %) und das Aufleuchten des aktiven Ziels. Werte je Level [eigene Berechnung aus den Code-Formeln; px = CSS-Pixel]:

  | Level (Punkte) | 1 (0) | 3 (3.500) | 6 (8.750) | 10 (15.750) | 15 (24.500) | 20 (33.250) |
  |---|---|---|---|---|---|---|
  | Ziele je Kette | 3 | 4 | 5 | 5 | 5 | 5 |
  | Radius sichtbar (erstes → letztes) | 25 → 14 px | 22 → 11 px | 18 → 11 px | 15 px | 15 px | 15 px |
  | Trefferradius (sichtbar + Rand) | 43 → 32 px | 39 → 28 px | 34 → 27 px | 29 px | 27 px | 26 px |
  | Zeit je Kette (ohne → volle Combo) | 3,2 → 2,4 s | 3,0 → 2,2 s | 2,5 → 1,9 s | 1,9 → 1,4 s | 1,3 → 1,0 s | 1,0 → 0,75 s |
  | Abstand zum vorigen Ziel | 100–240 px | 116–292 px | 140–370 px | 172–474 px | 212–604 px | 220–620 px |
  | Fallen-Wahrscheinlichkeit | 0 | 0 | 20 % | 80 % | 80 % | 80 % |

- **Fallen (Code):** ab Level 6 mit steigender Wahrscheinlichkeit ein rotes Kreisziel mit „!“ in 110 px + Streuung Abstand vom ersten Ziel, so groß wie das erste Ziel. Die Fallen-Prüfung kommt vor der Zielprüfung.
- **Punkte und Level (Code):** Punkte **nur für vollständige Ketten**: 150 × Combo-Faktor × (1 + 0,5·(Level − 1)/14). Combo = Zahl der Ketten in Folge; Faktor 1,1 (ab 3) … 1,5 (ab 10) … 3,0 (ab 50). Level = Punkte/1.750 + 1, sinkt nie. Ohne Fehler braucht man ≈ 10 Ketten für Level 2, 32 für Level 6, 53 für Level 12 [eigene Simulation].
- **Zeit und Strafen (Code):** Start 45 s, jedes richtige Ziel **+2 s** (höchstens 60 s Restzeit). Fehlklick, Fallen-Treffer und abgelaufene Kette: Combo auf 0, **−1 s** (die Abfrage erzwingt die Strafe immer), Bildschirmwackeln (12 px), roter Vollbild-Blitz 480 ms (Standard: an), neue Kette. Der Kettentimer läuft über die ganze Kette, nicht je Ziel, und lässt sich in den Einstellungen abschalten.
- **Folge der Zeitregel [eigene Ableitung, nicht gemessen]:** Wer mehr als ≈ 0,5 richtige Ziele pro Sekunde trifft, gewinnt Zeit – eine abgelaufene Kette mit zwei Treffern bringt z. B. +4 s Bonus bei −1 s Strafe (die dabei verstrichene Zeit geht natürlich ab). Die „45-s-Übung“ läuft daher für geübte Personen praktisch unbegrenzt, bis man selbst aufhört oder die Fehler überwiegen.
- **Bildfrequenz (Code):** nichts bewegt sich; Timer laufen mit Zeitschritt dt (auf 100 ms begrenzt) – kein Frame-Problem.
- **Auswertung (Code):** Endbildschirm mit Präzision, Zahl vollständiger Ketten, Level, beste Combo; Note S+ … F nach 100·√(Punkte/24.000). Präzision = richtige Klicks/Aktionen – ein Fehlklick erhöht den Nenner **zweimal** (Klick + Strafe), eine abgelaufene Kette einmal; 90 Treffer und 10 Fehlklicks ergeben 82 % statt 90 %. Eine „Reaktionszeit“ wird zwar gespeichert, aber ab dem Erscheinen der ganzen Kette gemessen (kumulativ) und nicht angezeigt – eine **Übergangszeit** zwischen zwei Zielen misst das Spiel nicht.
- **Widersprüche Regeltext ↔ Code:** (1) Zeitbonus laut deutschem Text +0,6 s, im Code +2 s je Ziel (der englische Regeltext im Code sagt +2 s). (2) Strafe −0,8 s laut Text, −1 s im Code. (3) „+150 Punkte je geordnetem Knoten“ – Punkte gibt es nur je Kette. (4) FAQ: „nummerierte Ziele in exakter Größen- und Ziffernreihenfolge“ – keine Ziffern; die Größenabstufung verschwindet ab Level 10. (5) Die Tabelle nennt „Übergangs-Latenz“ und „Ketten-Genauigkeit“, die das Spiel weder misst noch anzeigt. (6) Dauer „45 s“ ist nur der Startwert.

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite bewirbt einen „Sequenz Aim Trainer“ für taktische Shooter (Valorant, CS2) und Rhythmusspiele (osu!). Geordnete Ketten liefen als „ein vorgeplantes motorisches Programm“ (Lashley, 1951; Keele, 1968), jeder Übergang sei eine Fitts-Bewegung; man solle die Anordnung vorab scannen und den Pfad „als eine Bewegungseinheit im motorischen Kortex abspeichern“. Dazu vier „Trainingsprotokolle“, Empfehlungen zu Mausempfindlichkeit und 144/240-Hz-Monitoren sowie eine fünfstufige Tabelle („Apex-Sequenzer, Top 1 %: unter 180 ms, Stufe 12+, 98–100 %“). Einordnung (Prüfung in Abschnitt 11; Literaturbasis W09, A8):
- **Belegt:** Jede einzelne Bewegung zwischen ruhenden Zielen folgt dem Fitts'schen Gesetz (Fitts, 1954; MacKenzie, 1992).
- **Nur teilweise:** Lashley und Keele begründen zentrale, hierarchische Bewegungspläne statt Reflexketten (Rosenbaum et al., 2007). Vorgeplante „Chunks“ entstehen aber bei **wiederholten** Folgen (Sakai et al., 2003; Nissen & Bullemer, 1987). Hier ist jede Kette zufällig neu, und die Reihenfolge wird ständig angezeigt – es gibt nichts zu lernen oder zu speichern. Was tatsächlich passiert, ist Überlappung: Die nächste Bewegung wird schon während der laufenden geplant, was die erste sogar verlangsamen kann („one-target advantage“; Adam et al., 2000).
- **Vorab-Scannen:** plausibel und ähnlich dem Trail Making Test A (Suche + Tempo; Tombaugh, 2004); „im motorischen Kortex abspeichern“ ist eine Übertreibung.
- **Nicht belegt:** Übertragung auf osu!, Valorant oder CS2, „Verzögerungen zwischen Zielen werden eliminiert“, feste cm/360°-Empfehlungen (in einem 2D-Feld gibt es keine Drehung; der Code fordert keine unbeschleunigte Mausbewegung an, die Zeigerbeschleunigung des Betriebssystems kann also wirken).
- **Leistungstabelle:** Die Seite sammelt nach eigener Aussage keine Nutzerdaten – die Stufen haben **keine Datengrundlage**. „Unter 180 ms“ je Übergang misst das Spiel nicht; bei Fitts-Schwierigkeiten von ≈ 1,7–3 bit und typischen Maus-Durchsätzen von 3,7–4,9 bit/s (Soukoreff & MacKenzie, 2004) liegt eine Zielbewegung eher bei mehreren hundert ms [grobe eigene Abschätzung].
- **Messgenauigkeit:** 16,7 ms (60 Hz) und 4,1 ms (240 Hz) sind reine Arithmetik; Woods et al. (2015) maßen nur an 60 Hz. Der Hinweis „immer am selben Gerät vergleichen“ ist richtig.

## 4. Optische und okulomotorische Grundlagen
- **Sehwinkel** [eigene Berechnung; 24″ Full-HD, 0,274 mm/px, 60 cm]: erstes Ziel Level 1 Ø 50 px = 13,7 mm ≈ 1,3°; ab Level 10 Ø 30 px = 8,2 mm ≈ 0,8°; kleinstes Folgeziel Ø 20 px ≈ 0,5° (30′). Trefferzone Ø 86 → 52 px ≈ 2,3° → 1,4°. Abstände 100–620 px ≈ 2,6°–16°. Die Sehschärfe begrenzt bei korrigiertem Sehen nicht.
- **Kontrast:** Die Vorschau (violette Umrisse bis 15 % Deckkraft, gestrichelte Linie 25 %) ist auf fast schwarzem Grund kontrastarm – bei niedrigem Visus, Katarakt oder Blendung ist der Pfad schwer zu sehen; das aktive Ziel selbst ist kontrastreich.
- **Blickverhalten:** Der Blick springt per Sakkade zum Ziel, die Hand folgt ≈ 100 ms später (Prablanc et al., 1979); während der Zeigebewegung bleibt der Blick am Ziel verankert (Neggers & Bekkering, 2000). Bei Handlungsfolgen verlässt der Blick ein Ziel etwa dann, wenn dort das Teilziel (z. B. der Kontakt) erreicht ist, und springt zum nächsten (Johansson et al., 2001); gelegentliche Vorausfixationen auf spätere Ziele sind eine aufgabenabhängige Strategie (Pelz & Canosa, 2001). Die Übung fordert also eine Folge gezielter Sakkaden mit Blickvorlauf.
- **Peripherie:** Jede neue Kette erscheint an zufälliger Stelle im Feld (bis ≈ 25° breit); das Auffinden des Startziels verlangt peripheres Entdecken und kurze Suche, Fallen liegen nahe am Start.
- **Brille:** Bei Gleitsichtgläsern ist der scharfe Zwischenbereich schmal; Ziele am Rand werden seitlich unscharf, ein zu hoher Monitor zwingt in den Fernteil. Monitor tiefer stellen, Kopf mitdrehen (Weidling & Jaschinski, 2015), ggf. Arbeitsplatzbrille; Akkommodationsbedarf bei 60 cm ≈ 1,7 dpt.
- **Trockenes Auge:** Konzentriertes Bildschirmsehen senkt die Lidschlagrate deutlich (Patel et al., 1991); wegen der offenen Rundendauer Pausen einplanen.
- **Farbe/Tiefe:** Aktiv grün gefüllt, Folgeziele violett, Fallen rot mit „!“, Zeitring wechselt grün → rot. Die Rollen sind auch über Form (gefüllt/Umriss/Symbol) erkennbar; der Zeitring zeigt die Restzeit über seine Bogenlänge, nur die Warnung (Wechsel grün → rot unter 35 % Restzeit) ist rein farblich – relevant bei Rot-Grün-Schwäche (≈ 8 % der Männer; Birch, 2012). Stereosehen spielt keine Rolle.

## 5. Neurowissenschaftliche Grundlagen
Serielle Zielbewegungen nutzen das Sakkadensystem (frontales Augenfeld, Colliculus superior), parietale und prämotorische Areale für die Umsetzung von Sehort in Handbewegung und das Kleinhirn, dessen Aktivität mit dem Koordinationsbedarf zwischen Auge und Hand steigt (Miall et al., 2001). Vorwärtsmodelle sagen die Folgen des eigenen Befehls voraus und erlauben Korrekturen während der Bewegung (Shadmehr et al., 2010). Sequenzlernen im engeren Sinn (kortiko-striatale Systeme, Chunking; Doyon & Benali, 2005; Sakai et al., 2003) setzt wiederholte Folgen voraus und wird von dieser Übung mit Zufallsketten kaum angesprochen. Dass die Übung Bahnen „im motorischen Kortex“ anlegt, ist nicht belegt.

## 6. Motorische Grundlagen
- **Fitts'sches Gesetz:** Bewegungszeit = a + b · ID, ID = log₂(D/W + 1) (MacKenzie, 1992). Hier (Trefferzone als W): Level 1 D ≈ 170 px (Mittel aus 100–240 px), W ≈ 75 px → ID ≈ 1,7 bit; ab Level 15 D ≈ 400 px, W ≈ 52 px → ID ≈ 3,1 bit [eigene Abschätzung]. Die Einzelbewegungen sind also leicht bis mäßig schwer; die Schwierigkeit kommt aus der Kettenlänge, dem Kettentimer (ab Level 15 ≈ 0,2–0,26 s je Ziel) und den Fallen.
- **Folgen statt Einzelbewegungen:** Eine Zielbewegung ist langsamer, wenn eine zweite folgt, weil deren Steuerung mit der ersten überlappt; ob und wie stark, hängt von Zielgröße und Bewegungsrichtung ab (Adam et al., 2000). Welche Richtungsfolgen in dieser Übung günstiger sind, lässt sich daraus nicht sicher ableiten [unsicher, nur Abstract geprüft].
- **Zwei Komponenten und Rauschen:** Primärimpuls plus rückmeldungsgestützte Endkorrektur (Elliott et al., 2001, 2010); schnellere Impulse streuen stärker (Harris & Wolpert, 1998) → Speed-Accuracy-Trade-off, verschärft durch die Fehlklick-Strafe. Die großzügige Trefferzone (sichtbarer Radius + 10–18 px) entschärft ihn.
- **Klicken:** Die Klickrate (≈ 2–4 Klicks/s [eigene Abschätzung]) liegt unter dem, was Gesunde beim schnellen Wechseltippen zwischen zwei Feldern schaffen (≈ 5,5 Tipps/s, Kontrollgruppe mittleren Alters; Lee et al., 2016) – `fingergeschwindigkeit` ist nicht begrenzend.
- **Maus-Übersetzung:** Zu niedrige Empfindlichkeit erzwingt Nachsetzen und verschlechtert die Leistung deutlich, hohe schadet wenig (Casiez et al., 2008).
- **Touch:** Ruhende Ziele und ein Tipp je Ziel passen grundsätzlich gut zu Touch (kein Schweben nötig). Aber: Fingertippen ist ungenau – 4,8 mm breite Ziele → 11–14 % Fehler, 7,2 mm → 3–6 % (Bi et al., 2013); der Finger verdeckt das Ziel beim Tippen (Vogel & Baudisch, 2007), und die Hand verdeckt bei Rechtshändern den Bereich rechts unten, wo das nächste Ziel liegen kann. Die sichtbaren Ziele wären auf dem Tablet (0,19 mm/CSS-px) Ø 3,8–9,5 mm groß (ab Level 10 durchgehend ≈ 5,7 mm), die Trefferzone Ø ≈ 16 → 10 mm – die sichtbaren Ziele liegen damit meist unter der für Daumenbedienung ermittelten Mindestgröße von ≈ 9,2 mm (Parhi et al., 2006); Fallen dicht am Start erhöhen das Risiko von Fehltipps.

## 7. Einflussfaktoren und Messgrenzen
- **Alter:** Ältere brauchen mehr Teilbewegungen (Walker et al., 1997) und sind beim Klicken langsamer (Smith et al., 1999); die Trail-Making-ähnliche Suche wird mit dem Alter und geringerer Bildung langsamer (Tombaugh, 2004). Touch verkleinert den Altersnachteil gegenüber der Maus (Findlater et al., 2013).
- **Gerät:** Latenz von Maus/USB schwankt je Gerät um bis zu mehrere Dutzend ms (Wimmer et al., 2019); Feldgröße (Fenster), Empfindlichkeit und Zeigerbeschleunigung verändern Distanzen und Ergebnis. Seriös ist nur der Vergleich **mit sich selbst am selben Gerät**.
- **Regeln:** Zufällige Ketten (Distanzen und Richtungswechsel streuen stark), überproportionale Punkte (Combo und Levelfaktor), offene Rundendauer, doppelt gezählte Fehlklicks – Punkte und „Präzision“ sind keine linearen oder vergleichbaren Leistungsmaße.
- **Zuverlässigkeit:** Für diese Übung nicht untersucht. In einem kommerziellen Aim-Trainer waren Trefferquote und Treffer/s zwischen zwei Sitzungen sehr stabil (ICC 0,947–0,995, n = 10, zwei Sitzungen im Abstand von 3–5 Tagen; Rogers et al., 2024).
- **Ermüdung:** Wiederholtes Maus-Zielen (6 × 5 min) ermüdete die Handgelenkstrecker messbar, allerdings ohne Leistungsabfall (n = 20; Forman et al., 2025) – bei der offenen Rundendauer relevant.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt – mittel:** Übungskurven motorischer Aufgaben steigen verlässlich (Heathcote et al., 2000); die adaptive Schwierigkeit passt zum „Challenge Point“-Prinzip (Guadagnoli & Lee, 2004). Studien zu genau dieser Aufgabe fehlen.
- **Naher Transfer – schwach:** Motorisches Lernen ist sehr aufgabenspezifisch – schon eine andere Fingerfolge profitiert nicht (Karni et al., 1995). Weil hier keine Folge wiederkehrt, ist auch Sequenzlernen nicht zu erwarten (Nissen & Bullemer, 1987).
- **Alltagstransfer – fehlend:** Kein Beleg für bessere Spiel-, Alltags- oder Berufsleistung. Videospiel-Training verbessert die allgemeine kognitive Leistung nicht (Sala et al., 2018); positive Action-Spiel-Effekte betreffen Aufmerksamkeit, nicht Mausmotorik, und sind durch Publikationsbias überschätzt (Bediou et al., 2018).

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** schnelle Zeigebewegungen zu ruhenden Zielen mit der Maus geübt werden sollen; ein leichter Einstieg in Zielübungen gesucht wird (große, unbewegte Ziele, Trefferzone deutlich größer als das Ziel); Blickvorlauf und flüssige Übergänge spielerisch geübt werden sollen.
- **Weniger passend, wenn …** nur ein Tablet vorhanden ist; eine feste Dauer nötig ist; Stress durch Zeitdruck besteht; Sequenz- oder Merkfähigkeit (607, 601) oder echte Fingerfolgen (703) das Ziel sind.
- **Vorsicht / anpassen bei …** `hand_arm_beschwerden` (viele schnelle Zielbewegungen, offene Dauer); `tremor_parkinson` (Kettentimer bis 0,7 s, Fallen, Fehlklicks bestraft – frustrierend); `presbyopie_gleitsicht` (Ziele im ganzen Feld, seitliche Unschärfe); `sehbehinderung_niedriger_visus` (kontrastarme Vorschau, Folgeziele bis ≈ 0,5°); `gesichtsfeldausfall` (neue Ketten erscheinen irgendwo, Abstände bis ≈ 16°); `trockenes_auge_bildschirm` (Starren, lange Runden); `photosensitive_epilepsie`, `migraene_lichtempfindlich` (roter Vollbild-Blitz und Wackeln bei jedem Fehler, bei schnellen Fehlerfolgen mehrere pro Sekunde möglich – Blitz abschalten); `kognitive_einschraenkung` (Fallen-Regel und Tempo ab Level 6).
- **Kombiniert gut mit …** 704 (Präzisions-Flick) und 702 (bewegte Ziele) als Steigerung, 502/501 für Zielwechsel und Flicks, 204 (Schulte-Tafel) für die Suchkomponente ohne Zielmotorik-Druck, 303 (Blicksprünge ohne Hand).

Keine Diagnose, kein Heil-, Seh- oder Leistungsversprechen; Ergebnisse sind keine Messung von Krankheitszeichen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Tablet/Touch:** Original blockiert Touch, obwohl die Aufgabe (ruhende Ziele, ein Tipp je Ziel) gut passt. Umsetzung als direktes Antippen: sichtbare Ziele ≥ 9 mm (≈ 48 CSS-px), Trefferzone ≥ 11 mm, Abstände in mm/° statt Fensteranteil, nächste Ziele so platzieren, dass die Hand sie nicht verdeckt (oder Händigkeit wählbar); Fallen nicht direkt neben das Startziel.
- **Regeln ehrlich machen:** Text und Code angleichen (+2 s/−1 s, Punkte je Kette), feste Rundendauer ohne Zeitbonus, Name ohne „Finger Sequencing“.
- **Messqualität:** Übergangszeit je Ziel (Klick zu Klick) und Zeit bis zum ersten Ziel getrennt erfassen, Median statt Mittelwert, Fehler einmal zählen, optional Fitts-Durchsatz; adaptive Treppe statt Combo-Beschleunigung. Wahlweise Ziffern auf den Zielen (Trail-Making-Variante wie `zahlenjagd`) oder wiederkehrende Ketten, wenn Sequenzlernen gewollt ist.
- **Sicherheit/Barrierefreiheit:** Kein roter Vollbild-Blitz, kein Wackeln; Rollen über Form und Symbol, Zeitwarnung nicht nur über Farbe; Vorschau kontrastreicher; langsamer Einstieg für Ältere; Pausenhinweis; keine Stufentabellen ohne Daten.

## 11. Quellen
### Von der Website angegeben
- Lashley, K. S. (1951). The problem of serial order in behavior. In L. A. Jeffress (Hrsg.), *Cerebral mechanisms in behavior: The Hixon Symposium* (S. 112–136). Wiley. – Buch, keine DOI. **Prüfung:** Website-DOI 10.1037/11147-006 **existiert nicht** (Präfix gehört zu einem anderen Buch); **stützt die Aussage der Website:** teilweise (zentrale, hierarchische Pläne statt Reflexketten; für zufällig neue Ketten ohne Wiederholung kein vorgeplantes Programm).
- Keele, S. W. (1968). Movement control in skilled motor performance. *Psychological Bulletin, 70*(6, Pt. 1), 387–403. https://doi.org/10.1037/h0026739 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Begriff des motorischen Programms; nicht, dass Zufallsketten als ein Programm ablaufen).
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt:** ja (jeder Übergang zu einem ruhenden Ziel).
- MacKenzie, I. S. (1992). Fitts' law as a research and design tool in human-computer interaction. *Human–Computer Interaction, 7*(1), 91–139. https://doi.org/10.1207/s15327051hci0701_3 – **Prüfung:** DOI stimmt ✓; **stützt:** ja für Fitts in der HCI; nein für Empfehlungen zur Mausempfindlichkeit.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Hardware-Latenzen gemessen an 60 Hz: Monitor 11 ms, Monitor + Maus 17,8 ms; 144/240-Hz-Werte der Seite sind Arithmetik).

### Weitere Fachliteratur
- Adam, J. J., Nieuwenstein, J. H., Huys, R., Paas, F. G. W. C., Kingma, H., Willems, P., & Werry, M. (2000). Control of rapid aimed hand movements: The one-target advantage. *Journal of Experimental Psychology: Human Perception and Performance, 26*(1), 295–312. https://doi.org/10.1037/0096-1523.26.1.295 – Überlappung aufeinanderfolgender Zielbewegungen (Abstract geprüft)
- Bediou, B., Adams, D. M., Mayer, R. E., Tipton, E., Green, C. S., & Bavelier, D. (2018). Meta-analysis of action video game impact on perceptual, attentional, and cognitive skills. *Psychological Bulletin, 144*(1), 77–110. https://doi.org/10.1037/bul0000130 – Transfer, Publikationsbias
- Bi, X., Li, Y., & Zhai, S. (2013). FFitts law: Modeling finger touch with Fitts' law. In *Proceedings of CHI '13* (S. 1363–1372). ACM. https://doi.org/10.1145/2470654.2466180 – Fehlerraten beim Fingertippen
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Farbsehschwäche
- Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction, 23*(3), 215–250. https://doi.org/10.1080/07370020802278163 – Mausempfindlichkeit
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin, 127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – Zwei-Komponenten-Modell
- Doyon, J., & Benali, H. (2005). Reorganization and plasticity in the adult brain during learning of motor skills. *Current Opinion in Neurobiology, 15*(2), 161–167. https://doi.org/10.1016/j.conb.2005.03.004 – Lernnetzwerke
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming: Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 – Online-Kontrolle
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of CHI '13* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Alter, Touch vs. Maus
- Forman, G. N., Nikitin, S. A., Lang, C. J., Gabriel, D. A., Sonne, M. W., Kociolek, A. M., & Holmes, M. W. R. (2025). Impact of repetitive mouse aiming on muscle fatigue and fine motor performance of the distal upper limb. *Journal of Electromyography and Kinesiology, 82*, 102992. https://doi.org/10.1016/j.jelekin.2025.102992 – Ermüdung
- Guadagnoli, M. A., & Lee, T. D. (2004). Challenge point: A framework for conceptualizing the effects of various practice conditions in motor learning. *Journal of Motor Behavior, 36*(2), 212–224. https://doi.org/10.3200/JMBR.36.2.212-224 – adaptive Schwierigkeit
- Harris, C. M., & Wolpert, D. M. (1998). Signal-dependent noise determines motor planning. *Nature, 394*(6695), 780–784. https://doi.org/10.1038/29528 – Speed-Accuracy-Trade-off
- Heathcote, A., Brown, S., & Mewhort, D. J. K. (2000). The power law repealed: The case for an exponential law of practice. *Psychonomic Bulletin & Review, 7*(2), 185–207. https://doi.org/10.3758/BF03212979 – Übungskurven
- Johansson, R. S., Westling, G., Bäckström, A., & Flanagan, J. R. (2001). Eye–hand coordination in object manipulation. *The Journal of Neuroscience, 21*(17), 6917–6932. https://doi.org/10.1523/JNEUROSCI.21-17-06917.2001 – Blick führt die Hand von Ziel zu Ziel (Abstract geprüft)
- Karni, A., Meyer, G., Jezzard, P., Adams, M. M., Turner, R., & Ungerleider, L. G. (1995). Functional MRI evidence for adult motor cortex plasticity during motor skill learning. *Nature, 377*(6545), 155–158. https://doi.org/10.1038/377155a0 – Lernspezifität von Fingerfolgen
- Lee, C. Y., Kang, S. J., Hong, S.-K., Ma, H.-I., Lee, U., & Kim, Y. J. (2016). A validation study of a smartphone-based finger tapping application for quantitative assessment of bradykinesia in Parkinson's disease. *PLOS ONE, 11*(7), e0158852. https://doi.org/10.1371/journal.pone.0158852 – Tipprate zum Vergleich
- Miall, R. C., Reckess, G. Z., & Imamizu, H. (2001). The cerebellum coordinates eye and hand tracking movements. *Nature Neuroscience, 4*(6), 638–644. https://doi.org/10.1038/88465 – Kleinhirn, Auge-Hand
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blick beim Zeigen
- Nissen, M. J., & Bullemer, P. (1987). Attentional requirements of learning: Evidence from performance measures. *Cognitive Psychology, 19*(1), 1–32. https://doi.org/10.1016/0010-0285(87)90002-8 – Sequenzlernen nur bei wiederholten Folgen (Crossref geprüft, Inhalt Standardbefund)
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of MobileHCI '06* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – Touch-Zielgröße
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm
- Pelz, J. B., & Canosa, R. (2001). Oculomotor behavior and perceptual strategies in complex tasks. *Vision Research, 41*(25–26), 3587–3596. https://doi.org/10.1016/S0042-6989(01)00245-0 – Vorausfixationen (Abstract geprüft)
- Prablanc, C., Echallier, J. F., Komilis, E., & Jeannerod, M. (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. *Biological Cybernetics, 35*(2), 113–124. https://doi.org/10.1007/BF00337436 – Sakkade vor Handbewegung
- Rogers, E. J., Trotter, M. G., Johnson, D., Desbrow, B., & King, N. (2024). KovaaK's aim trainer as a reliable metrics platform for assessing shooting proficiency in esports players: A pilot study. *Frontiers in Sports and Active Living, 6*, 1309991. https://doi.org/10.3389/fspor.2024.1309991 – Zuverlässigkeit
- Rosenbaum, D. A., Cohen, R. G., Jax, S. A., Weiss, D. J., & van der Wel, R. (2007). The problem of serial order in behavior: Lashley's legacy. *Human Movement Science, 26*(4), 525–554. https://doi.org/10.1016/j.humov.2007.04.001 – Einordnung Lashley
- Sakai, K., Kitaguchi, K., & Hikosaka, O. (2003). Chunking during human visuomotor sequence learning. *Experimental Brain Research, 152*(2), 229–242. https://doi.org/10.1007/s00221-003-1548-8 – Chunking bei wiederholten Folgen
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – fehlender Ferntransfer
- Shadmehr, R., Smith, M. A., & Krakauer, J. W. (2010). Error correction, sensory prediction, and adaptation in motor control. *Annual Review of Neuroscience, 33*, 89–108. https://doi.org/10.1146/annurev-neuro-060909-153135 – Vorwärtsmodelle
- Smith, M. W., Sharit, J., & Czaja, S. J. (1999). Aging, motor control, and the performance of computer mouse tasks. *Human Factors, 41*(3), 389–396. https://doi.org/10.1518/001872099779611102 – Alter, Klicken
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts' law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 – Durchsatz Maus/Touchpad
- Tombaugh, T. N. (2004). Trail Making Test A and B: Normative data stratified by age and education. *Archives of Clinical Neuropsychology, 19*(2), 203–214. https://doi.org/10.1016/S0887-6177(03)00039-8 – Reihenfolge-Suche, Alterseffekte
- Vogel, D., & Baudisch, P. (2007). Shift: A technique for operating pen-based interfaces using touch. In *Proceedings of CHI '07* (S. 657–666). ACM. https://doi.org/10.1145/1240624.1240727 – Verdeckung durch den Finger
- Walker, N., Philbin, D. A., & Fisk, A. D. (1997). Age-related differences in movement control: Adjusting submovement structure to optimize performance. *The Journals of Gerontology: Series B, 52B*(1), P40–P53. https://doi.org/10.1093/geronb/52B.1.P40 – Alter, Teilbewegungen
- Weidling, P., & Jaschinski, W. (2015). The vertical monitor position for presbyopic computer users with progressive lenses: How to reach clear vision and comfortable head posture. *Ergonomics, 58*(11), 1813–1829. https://doi.org/10.1080/00140139.2015.1035764 – Gleitsicht, Monitorhöhe
- Wimmer, R., Schmid, A., & Bockes, F. (2019). On the latency of USB-connected input devices. In *Proceedings of CHI '19* (S. 1–12). ACM. https://doi.org/10.1145/3290605.3300650 – Eingabelatenz
