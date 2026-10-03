---
# ===== Kennung =====
nr: 706
kennung: drag-and-drop
name: "Ziehen und Ablegen – Ball in einen wandernden Ring ziehen"
name_original: "Drag and Drop Test – Maus Präzision Training (Seitentitel: Maus-Ziehtest | Drag-and-Drop-Präzision)"
kapitel: "Motorik"
kapitel_original: "motor"
unterkapitel_original: "hand-eye-coordination"
quelle_url: "https://skilldrills.online/de/drills/motor/hand-eye-coordination/drag-and-drop"
blickfit_umsetzung: {kennung: "ziehen-ablegen", name: "Ziehen & Ablegen", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/ziehen-ablegen/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein Ball und ein wandernder Ring erscheinen auf dem Bildschirm. Man setzt den Finger irgendwo auf, zieht den Ball, der über dem Finger schwebt, in den Ring und lässt los, wenn er in der Mitte liegt. Mit der Stufe werden Ring und Ball kleiner, der Ring schneller und das Zeitfenster kürzer; ein Zeitbalken zeigt die verbleibende Zeit."
ziel_funktionen: [auge_hand_koordination, zielbewegung_praezision]
eingabe: [maus, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Level nur steigend (Code): Level = Punkte/250 + 1 + Serie/4 (ganzzahlig), ohne Obergrenze. Mit Fortschritt p = (Level − 1)/14: Behälterradius 42 → 18 px (Level 15), Untergrenze 16 px; Ballradius 14 → 9 px, Untergrenze 8 px; Behältertempo 120 → 400 px/s (Level 15), danach unbegrenzt weiter (+20 px/s je Level); Zeitfenster pro Runde 3,2 → 1,4 s, Untergrenze 1,2 s; zufällige Richtungswechsel 0,2 → 1,4 pro Sekunde. Feste Rundendauer 45 s."
messgroessen: ["Punkte", "Ablagequote (Treffer/Loslassen)", "Treffer (Target Drops)", "Fehlablagen", "Zeitüberschreitungen", "längste Serie", "erreichtes Level", "sinnvoll ergänzend: Greif- und Transportzeit je Runde, Abstand Ball–Behältermitte beim Loslassen, Zeitüberschreitungen in der Quote"]

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
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 0
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
    zielbewegung_praezision: 3
    kontinuierliche_steuerung: 2
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
voraussetzungen: ["Maus (oder Touchpad) und Desktop-Browser mit Vollbild und Pointer Lock; auf reinen Touch-Geräten lässt sich das Original nicht starten", "Taste gedrückt halten und gleichzeitig bewegen können (Ziehen)", "Monitor ca. 50–70 cm, passende Korrektion für diesen Abstand", "kein Farbsehen nötig (Ball gefüllt, Behälter als Ring – Unterschied über die Form)", "Esc oder Verlassen von Vollbild/Pointer Lock beendet die Runde"]
vorsicht_bei: [tremor_parkinson, hand_arm_beschwerden, kinder_unter_6, presbyopie_gleitsicht, sehbehinderung_niedriger_visus, gesichtsfeldausfall, trockenes_auge_bildschirm, photosensitive_epilepsie, migraene_lichtempfindlich, kognitive_einschraenkung]
geeignet_fuer: ["Ziehen mit dem Finger zu einem bewegten Ziel üben (Auge-Hand-Koordination, Abfangen)", "sauberes Abbremsen und Loslassen im richtigen Moment üben", "Vertrautheit mit dem Verschieben von Objekten am Tablet spielerisch aufbauen (in den ersten Stufen ruhiger, großer Ring)", "Fortschritt mit sich selbst am selben Gerät vergleichen (Trefferquote, Dauer, Stufe)"]
weniger_geeignet_fuer: ["Menschen mit Tremor, Handschmerzen oder wenig Griffkraft (Finger dauerhaft führen, kleine bewegte Ziele auf höheren Stufen)", "Kinder im Vorschulalter und Computer-Neulinge (Ziehen ist schwerer als Tippen)", "wer ruhende Ziele (dafür 708) oder gar keinen Zeitdruck braucht (dafür 705)", "Übungsziel reine Blickmotorik ohne Hand (Kapitel 400)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Zeige- und Ziehbewegungen werden durch Üben in der geübten Aufgabe schneller und genauer; motorisches Lernen ist aber sehr aufgabenspezifisch, und ein Nutzen für Büroarbeit, Grafik oder Spiele ist für diese Übung nicht untersucht."
aehnliche_uebungen: [702, 104, 705, 707, 505, 514, 803]
stichworte: ["Drag and Drop", "Ziehen und Ablegen", "bewegtes Ziel", "Abfangen", "Fitts'sches Gesetz", "Steering Law", "Auge-Hand-Koordination", "Loslass-Timing", "Pointer Lock", "Maus"]
---

# 706 · Ziehen und Ablegen – Ball in einen wandernden Behälter ziehen

> Original: „Drag and Drop Test – Maus Präzision Training“ – skilldrills.online, Kapitel Motorik (`motor/hand-eye-coordination`) · Blickfit: noch nicht umgesetzt (verwandt: `zielfang`, bewegtes Ziel antippen)

## 1. Kurzbeschreibung
Auf dunklem Grund erscheinen ein Ball und ein Ring. Man setzt den Finger an beliebiger Stelle auf; der Ball hängt etwas oberhalb des Fingers, sodass die Hand ihn nicht verdeckt, und ein dünner Faden zeigt, wo der Finger ist. Den Ball zieht man in den Ring und lässt los, wenn die Ballmitte im Ring liegt. Der Ring wandert dabei in geraden Stücken umher; auf den ersten Stufen bewegt er sich ruhig und gleichförmig, ab Stufe 6 kommen sanfte Richtungswechsel hinzu. Mit steigender Stufe werden Ring und Ball kleiner, der Ring schneller und das Zeitfenster kürzer; ein Zeitbalken zeigt die verbleibende Zeit. Die Schwierigkeit passt sich nach oben und unten an. Eine Sitzung besteht aus 12 Durchgängen. Es geht um das Zusammenspiel von Auge und Hand beim Ziehen zu einem bewegten Ziel und um das richtige Loslassen.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext und ausgelieferter Spielcode (Chunk 27330, Stand 29.09.2026; nur Mechanik übernommen).

- **Start/Eingabe (Code):** Countdown ≈ 2,45 s, Vollbild und **Pointer Lock** ohne Anforderung unbeschleunigter Mausdaten (Zeigerbeschleunigung des Betriebssystems wirkt). Das Fadenkreuz (Ring 14 px Radius) bewegt sich um Mausweg × Empfindlichkeit (0,1–3). Ausgewertet werden nur `mousedown`/`mousemove`/`mouseup`; auf Geräten mit Touch ohne feinen Zeiger erscheint statt des Starts ein Maus-Hinweis – **Tablet ohne Maus: nicht spielbar**.
- **Runde (Code):** Ball und Behälter entstehen zufällig (Randabstand ≥ Behälterradius + 30 px, Abstand zueinander ≥ 3 × Behälterradius). **Greifen:** Tastendruck ≤ Ballradius + 14 px von der Ballmitte; danach klebt der Ball am Fadenkreuz. **Treffer:** beim Loslassen liegt die **Ballmitte** innerhalb des Behälterradius (der Ball darf also über den Rand ragen). Loslassen außerhalb = Fehlablage. Jede Runde hat ein **Zeitfenster** (3,2 s → 1,2 s), das schon vor dem Greifen läuft und **nicht angezeigt** wird; läuft es ab, zählt eine Zeitüberschreitung und es gibt eine neue Runde. Diese Zeitstrafe lässt sich in den Einstellungen abschalten.
- **Behälterbewegung (Code):** konstantes Tempo geradlinig zu einem zufälligen Wegpunkt; neuer Wegpunkt bei Ankunft (< 15 px) oder zufällig mit einer Rate von 0,2/s (Level 1) bis 1,4/s (Level 15). Bewegung mit Zeitschritt dt (auf 100 ms begrenzt) → **bildfrequenzunabhängig**; nur Partikel und Bildwackeln (Kosmetik) laufen pro Frame. Tempo in px/s unabhängig von der Feldgröße.
- **Parameter nach Level** [Werte eigene Berechnung aus den Code-Formeln]:

  | Level | 1 | 5 | 10 | 15 | 20+ |
  |---|---|---|---|---|---|
  | Behälter Ø (= Trefferzone für die Ballmitte) | 84 px | 70 px | 53 px | 36 px | 32 px |
  | Ball Ø | 28 px | 25 px | 22 px | 18 px | 16 px |
  | Behältertempo | 120 px/s | 200 px/s | 300 px/s | 400 px/s | 500 px/s und mehr |
  | Zeitfenster je Runde | 3,2 s | 2,7 s | 2,0 s | 1,4 s | 1,2 s |

- **Punkte/Level (Code):** Treffer = 100 × Serienfaktor (1,1 ab 3 Treffern … 3,0 ab 50) × (1 + 0,5·p). Level = max(bisher, Punkte/250 + 1 + Serie/4) – eine Serie hebt das Level zusätzlich, ein Fehler senkt es nie. Bei durchgehender Serie ist nach 10 Treffern Level 8, nach 20 Treffern Level 20 erreicht [eigene Simulation]. Fehlablage/Zeitüberschreitung: Serie auf 0, Bildwackeln (6 px), roter Vollbild-Blitz 480 ms (abschaltbar), Strafton; **keine Zeitstrafe**.
- **Auswertung (Code):** Ablagequote = Treffer/Loslassen (Zeitüberschreitungen zählen nicht), Treffer, beste Serie, höchstes Level; Note F … S+ nur aus den Punkten (100·√(Punkte/16.000); S+ ab ≈ 14.400 Punkten). **Transport- oder Reaktionszeiten werden nicht gemessen.** Bestwerte nur lokal.
- **Widersprüche Regeltext ↔ Code:** (1) Englische Regelkarte „Resets Combo (−0.8s)“ – im Code keine Zeitstrafe. (2) „+1 Stufe / 250 PKT“ – zusätzlich +1 Level je 4 Treffer Serie. (3) Englischer Standard-Untertitel im Spielcode „… • 15 Levels“ – im Code keine Obergrenze; das Tempo wächst über Level 15 hinaus weiter. (4) Tabelle „Lv. 12–15 (Combo > 18x)“ ist in sich unmöglich: Eine Serie von 18 hebt allein schon um 4 Level, 18 Treffer in Folge ergeben ≈ Level 17. (5) Tabelle und FAQ nennen „Transportzeit“, „Pfadtreue“ und „Mikro-Korrekturen < 35 ms“ – nichts davon wird gemessen. (6) Es gibt keinen Korridor; „Pfadtreue“ wird nicht bewertet.

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite beschreibt einen „mechanischen Motorik-Drill“ für Cursorkontrolle, Ziehgenauigkeit und Loslass-Timing; Zielgruppen sind Grafiker:innen, Videoschnitt, CAD, RTS-/FPS-Spieler:innen. Begründet wird mit MacKenzie et al. (1991), dem Steering Law (Accot & Zhai, 1997), Fitts (1954) und „antagonistischer Bremsung“ (Elliott et al., 2010); dazu vier „wissenschaftliche Trainingsprotokolle“ (z. B. „Unterarmstrecker 50 ms vor dem Ziel aktivieren“) und eine fünfstufige Tabelle (Tier 1 „Elite/Profi-Designer“: < 420 ms Transportzeit, ≥ 98 % Genauigkeit). Einordnung (Quellenprüfung in Abschnitt 11, Literaturbasis W09 A6):
- **Belegt:** Ziehen ist langsamer und fehleranfälliger als Zeigen – mit der Maus 674 → 916 ms und 3,5 → 10,8 % Fehler (n = 12; MacKenzie et al., 1991).
- **Ungenau:** „Durchsatzverlust 15–25 %“ – gemessen wurden für die Maus −11 % (4,5 → 4,0 bit/s), für das Grafiktablett −27 %, für den Trackball −55 %. „Isometrische Ko-Kontraktion“ und „veränderter Reibungskoeffizient“ stehen nicht in der Studie; sie sagt nur, dass das Halten der Taste die Bewegungsfreiheit einschränkt.
- **Falsch zugeordnet:** „The carry obeys the Steering Law“ – das Steuerungsgesetz gilt für Wege mit seitlicher Begrenzung (Tunnel). Hier gibt es keinen Korridor; freies Ziehen zu einem Ziel ist eine Fitts-Aufgabe (MacKenzie et al., 1991, r = 0,99 für die Maus), und bei bewegten Zielen sagt selbst der Fitts-Index die Zeit nur eingeschränkt voraus (Jagacinski et al., 1980; Huang et al., 2018).
- **Nicht belegt:** „Muskelgedächtnis für pixelgenaue Navigation“, „Unterarmstrecker 50 ms vorher aktivieren“, „glockenförmiges Geschwindigkeitsprofil als Elite-Merkmal“. Der „Vorhaltewinkel“ (Protokoll 4) ist grundsätzlich sinnvoll, funktioniert hier aber nur stückweise, weil der Behälter zufällig die Richtung wechselt.
- **Leistungstabelle:** Die Seite erhebt nach eigener Aussage keine Nutzerdaten, und die zitierten Arbeiten enthalten keine solchen Stufen – **keine Datengrundlage**; die Spalten „Transportzeit“ und „Mikro-Korrekturen“ misst das Spiel gar nicht (Abschnitt 2).
- **Hardware-Tipps:** 16,7/6,9 ms bei 60/144 Hz sind Arithmetik; Woods et al. (2015) maßen nur an 60 Hz. Der Rat, eigene Ergebnisse nur am selben System zu vergleichen, ist richtig.

## 4. Optische und okulomotorische Grundlagen
- **Sehwinkel:** Die Größe von Ball und Ring lässt sich in Grad angeben; bei 40 cm Abstand entspricht 1 cm etwa 1,4°. Der Ringradius liegt je nach Stufe zwischen 13 und gut 6 % der kürzeren Bildschirmseite (mindestens 34 px), der Ball hat mindestens 22 px Radius. Beides liegt weit über den Grenzen der Sehschärfe bei korrigiertem Sehen.
- **Bewegung:** Der Ring bewegt sich mit 5 bis etwa 17 % der kürzeren Bildschirmseite pro Sekunde. Bei einer kürzeren Seite von 15 cm und 40 cm Abstand sind das etwa 1° bis 3,6° pro Sekunde (eigene Berechnung). Das liegt weit unter der Obergrenze der Folgebewegung (etwa 90 % Gain bis 100°/s; Meyer et al., 1985) – die glatte Blickfolge selbst ist nicht leistungsbegrenzend. Gefordert sind Sakkaden (zum Ball, dann zum Ring) und das Einschätzen von Richtung und Tempo für das Abfangen. Richtungswechsel des Rings erzwingen Aufholsakkaden.
- **Blick und Hand:** Beim Zeigen springt der Blick zuerst zum Ziel, die Hand folgt etwa 100 ms später (Prablanc et al., 1979); der Blick bleibt während der Handbewegung am Ziel verankert (Neggers & Bekkering, 2000). Wird die Hand mitgeführt, folgt das Auge einem bewegten Ziel besser (Gauthier et al., 1988; Danion & Flanagan, 2018).
- **Brille:** Ball und Ring erscheinen im ganzen Feld, der Ring wandert an die Ränder. Bei Gleitsicht ist der scharfe Zwischenbereich schmal und seitlich unscharf; ein zu hoher Bildschirm zwingt in den Fernteil. Bildschirm tiefer stellen und den Kopf mitbewegen (Weidling & Jaschinski, 2015), gegebenenfalls Arbeitsplatzbrille. Der Akkommodationsbedarf beträgt bei 40 cm 2,5 dpt, bei 60 cm etwa 1,7 dpt.
- **Trockenes Auge:** Konzentriertes Bildschirmsehen senkt die Lidschlagrate deutlich (Patel et al., 1991) – bei mehreren Durchgängen Pausen einplanen.
- **Farbe und Tiefe:** Ball und Ring unterscheiden sich durch Form (gefüllt oder Ring), nicht durch Farbe; Farbsehschwäche (etwa 8 % der Männer; Birch, 2012) stört daher kaum. Stereosehen spielt keine Rolle.

## 5. Neurowissenschaftliche Grundlagen
Das Abfangen eines bewegten Ziels verbindet Bewegungswahrnehmung mit der Planung der Handbewegung in parietalen und prämotorischen Arealen; das Kleinhirn wird umso stärker beansprucht, je mehr Auge und Hand beim Verfolgen zusammenarbeiten müssen (Miall et al., 2001). Vorwärtsmodelle sagen die Folgen des eigenen Bewegungsbefehls voraus und erlauben Korrekturen noch während der Bewegung (Shadmehr et al., 2010) – beim Ziehen zu einem wandernden Behälter werden Plan und Ziel laufend nachgeführt. Beim Üben verschiebt sich die Beteiligung kortiko-striataler und kortiko-zerebellärer Systeme (Doyon & Benali, 2005). Dass diese Übung bestimmte Hirnregionen oder ein „Muskelgedächtnis für Pixelgenauigkeit“ gezielt trainiert, ist nicht belegt.

## 6. Motorische Grundlagen
- **Zwei Bewegungen je Durchgang:** erst Aufsetzen und Zeigen zum Ball, dann eine Ziehbewegung zum Ring. Beide folgen grob dem Fitts'schen Gesetz (ID = log₂(D/W + 1)): Je kleiner der Ring und je größer der Weg, desto mehr Zeit braucht die Bewegung. Auf hohen Stufen wird das Zeitfenster zur eigentlichen Grenze, weil Ziehstrecke, Ringgröße und Reaktionszeit zusammen kaum noch Spielraum lassen.
- **Ziehen und Zeigen:** Ziehen kostet Zeit und erhöht die Fehlerrate (MacKenzie et al., 1991). Kinder zeigen und tippen schneller, fehlerärmer und lieber, als sie ziehen (Inkpen, 2001).
- **Bewegtes Ziel:** Endpunkte fallen hinter schnelle Ziele zurück; Versatz und Streuung hängen von Zielgröße und Tempo ab (Huang et al., 2018). Wer vorausschauend auf den künftigen Ort zielt, gewinnt – solange der Ring nicht die Richtung wechselt.
- **Abbremsen und Loslassen:** Zielbewegungen bestehen aus einem Hauptimpuls und rückmeldungsgestützter Endkorrektur (Elliott et al., 2001, 2010); schnellere Impulse streuen stärker (Harris & Wolpert, 1998). Das Loslassen muss in dem Moment kommen, in dem die Ballmitte im Ring liegt – eine Kopplung von räumlicher Genauigkeit und Timing.
- **Touch:** Ziehen mit dem Finger ist natürlich, aber in einer Studie langsamer als mit der Maus (1,09 gegenüber 0,92 s beim „Docking“); bei kleinen Zielen verdeckt der Finger das Ziel (Forlines et al., 2007; Vogel & Baudisch, 2007). Deshalb hängt der Ball über dem Finger. Ein Touchscreen kennt keinen Schwebezustand (Buxton, 1990); man setzt den Finger direkt auf. Ältere (65–86 Jahre, n = 24) zogen mit einem Stift genauer als mit dem Finger (Motti et al., 2014). Die Fingerposition ist nur auf etwa einen Millimeter genau (bei 2,4 mm breiten Zielen 29–38 % Fehler; Bi et al., 2013); die Ziele der Übung sind deutlich größer.

## 7. Einflussfaktoren und Messgrenzen
- **Alter:** Ältere positionieren mit mehr Teilbewegungen (Walker et al., 1997) und haben besonders beim Klicken und Ziehen Schwierigkeiten (Smith et al., 1999); Touch verkleinert den Altersnachteil gegenüber der Maus (Findlater et al., 2013). Ein knapper werdendes Zeitfenster trifft Ältere überproportional.
- **Gerät:** Die Bildschirmgröße bestimmt Wege und Schwierigkeitsindex; die Größen sind relativ zur Bühne gewählt, sodass auf kleinen und großen Geräten ähnliche Verhältnisse entstehen. Eingabelatenzen schwanken je Gerät um bis zu mehrere Dutzend ms (Wimmer et al., 2019).
- **Kennzahlen:** Gemessen werden die Trefferquote (Ball im Ring) und die mittlere Dauer je Durchgang; die Stufe ergibt sich aus dem Verlauf der Erfolge. Zeitüberschreitungen zählen als Fehlversuch. Die Punkte wachsen mit der Stufe und sind kein reines Leistungsmaß.
- **Streuung:** Messungen am Menschen streuen stärker als Messungen an Prüfkörpern; einzelne Durchgänge sagen wenig, und eine hohe Korrelation zweier Geräte oder Sitzungen heißt noch nicht, dass die Werte übereinstimmen (Mountford et al., 2004, S. 24, 43–44). Zuverlässigkeit und Wiederholbarkeit dieser Übung sind nicht untersucht; sinnvoll ist nur der Vergleich **mit sich selbst am selben Gerät**.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt – mittel:** Übungskurven motorischer Aufgaben steigen verlässlich (Heathcote et al., 2000); Zeige- und Ziehleistung verbessert sich mit Erfahrung. Eine Studie zu genau dieser Aufgabe gibt es nicht. Die erfolgsabhängige Schwierigkeit mit Rückstufung passt grob zum „Challenge Point“-Prinzip (Guadagnoli & Lee, 2004).
- **Naher Transfer – schwach:** Motorisches Lernen ist sehr aufgabenspezifisch – schon eine gleich aufgebaute andere Fingerfolge profitiert nicht (Karni et al., 1995). Ob Ziehen zu wandernden Zielen das Verschieben von Dateien, Clips oder Knoten verbessert, ist nicht untersucht.
- **Alltagstransfer – fehlend:** Kein Beleg für bessere Büro-, Design- oder Spielleistung. Videospiel-Training verbessert die allgemeine kognitive Leistung nicht (Sala et al., 2018); positive Action-Spiel-Effekte betreffen vor allem Aufmerksamkeit und räumliches Denken, nicht Zielmotorik, und sind teils durch Publikationsbias überschätzt (Bediou et al., 2018).

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** das Ziehen mit dem Finger zu einem **bewegten** Ziel geübt werden soll; Abfangen und Loslass-Timing im Vordergrund stehen; eine Steigerung nach 702 (bewegte Ziele antippen) gesucht wird.
- **Weniger passend, wenn …** wenig Erfahrung mit Touch-Geräten oder Stress durch Zeitdruck besteht; ruhende Ziele gewünscht sind (708); das Ziel reine Blickmotorik ist (Kapitel 400).
- **Vorsicht / anpassen bei …** `tremor_parkinson` (Ball genau führen und loslassen, kleine bewegte Ziele – frustrierend); `hand_arm_beschwerden` (wiederholtes Führen unter Zeitdruck); `kinder_unter_6` (Ziehen ist für Kinder schwerer als Tippen, Inkpen, 2001); `presbyopie_gleitsicht` (der Ring wandert zu den Rändern, seitliche Unschärfe); `sehbehinderung_niedriger_visus` (Ball und Ring werden auf höheren Stufen kleiner); `gesichtsfeldausfall` (Ball und Ring erscheinen überall, der Ring kann aus dem Blick laufen); `trockenes_auge_bildschirm` (starrer Blick, wenig Lidschlag); `photosensitive_epilepsie`, `migraene_lichtempfindlich` (Rückmeldung über Form und Symbole, ohne Blitze und Wackeln; dennoch Vorsicht bei starker Lichtempfindlichkeit); `kognitive_einschraenkung` (knappes Zeitfenster auf höheren Stufen). Bei Doppelbildern, plötzlichem Sehverlust oder neuen Gesichtsfeldausfällen nicht üben, sondern ärztlich abklären lassen.
- **Kombiniert gut mit …** 708 (ruhende Ziele) und 702/104 (bewegte Ziele antippen) als Vorstufen, 705/707 (kontinuierliches Führen) als Ergänzung, 505/514 (Tracking) als Variante.
- **Überschneidungen / Unterschiede:** 706 ist die einzige Aufgabe des Katalogs, bei der ein Objekt gegriffen, zu einem **bewegten** Ziel gezogen und dort abgelegt wird – keine Dublette; 811 zieht einen gemerkten Linienzug nach, 810 führt den Zeiger durch eine schmale Bahn. Am nächsten liegt 702 (gleiche Zielgrößenordnung, bewegtes Ziel, ähnlicher Zeitdruck); 706 verlangt aber zusätzlich Greifen, Führen und genaues Loslassen, während das reine Zeigetempo etwas weniger zählt als bei 702, 704 und 708.

Keine Diagnose, kein Heil-, Seh- oder Leistungsversprechen; Ergebnisse sind keine Messung von Krankheitszeichen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Tablet/Touch:** Original blockiert Touch. Umsetzung mit Pointer Events: Ball Ø ≥ 10 mm (≈ 52 CSS-px bei 0,19 mm/px) mit Greifzone ≥ 12 mm, Behälter ≥ 14 mm und gut sichtbar **neben** dem Finger (Ball beim Ziehen leicht oberhalb des Fingers zeichnen, damit er nicht verdeckt ist); Behältertempo in mm/s bzw. °/s, nicht in px/s. Nach WCAG 2.2 (SC 2.5.7) sollte es für Ziehfunktionen eine Alternative ohne Ziehen geben – als Übung ist Ziehen aber der Kern und daher ausgenommen; für Menschen mit eingeschränkter Motorik alternativ „antippen – antippen“ anbieten.
- **Regeln ehrlich machen:** Text und Code angleichen (keine −0,8 s, Levelobergrenze real, Serienbonus nennen); sichtbarer Zeitbalken je Runde; Zeitfenster erst ab dem Greifen laufen lassen.
- **Messqualität:** Greif- und Transportzeit sowie Abstand zur Behältermitte beim Loslassen messen (die Website nennt Werte, die der Code nicht erfasst); Zeitüberschreitungen in die Quote einrechnen; adaptive Treppe (z. B. 3-down/1-up wie in `zielfang`) mit Rückstufung statt nur steigender Level.
- **Vorhersehbarkeit wählbar:** Einsteigerstufe mit ruhigem oder gleichförmig bewegtem Behälter, Richtungswechsel erst später – so bleibt Vorausschätzen lernbar.
- **Sicherheit/Barrierefreiheit:** Kein roter Vollbild-Blitz, kein Wackeln; Rückmeldung über Form/Ton; langsamer Einstieg für Ältere; Pausenhinweis; keine Tier-Tabellen ohne Daten.

## 11. Quellen
### Von der Website angegeben
- Accot, J., & Zhai, S. (1997). Beyond Fitts' law: Models for trajectory-based HCI tasks. In *Proceedings of the ACM SIGCHI Conference on Human Factors in Computing Systems (CHI '97)* (S. 295–302). ACM. https://doi.org/10.1145/258549.258760 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise/nein – das Steuerungsgesetz (T = a + b·A/W) gilt für begrenzte Wege; diese Übung hat keinen Korridor, das Ziehen zum Behälter ist eine Fitts-Aufgabe mit bewegtem Ziel.
- MacKenzie, I. S., Sellen, A., & Buxton, W. (1991). A comparison of input devices in elemental pointing and dragging tasks. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '91)* (S. 161–166). ACM. https://doi.org/10.1145/108844.108868 – **Prüfung:** DOI stimmt ✓ (Crossref-Titel mit Tippfehler „element“); **stützt:** ja für „Ziehen langsamer und fehleranfälliger“ (Maus 674 → 916 ms, 3,5 → 10,8 % Fehler); teilweise für „15–25 % Durchsatzverlust“ (Maus −11 %, Tablett −27 %, Trackball −55 %); nein für „Ko-Kontraktion“ und „Reibungskoeffizient“.
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt:** ja für Zielbewegungen allgemein; für bewegte Ziele nur eingeschränkt.
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming: Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 – **Prüfung:** DOI, Titel, Jahr ✓, **Autor:innen falsch** (Website: „Elliott, Helsen & Chua“ – Autoren der Arbeit von 2001); **stützt:** teilweise (Hauptimpuls und Online-Korrektur ja; „antagonistische Bremsung“ ist nicht die Kernaussage).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Geräteeinflüsse auf Zeitmessung ja; 16,7/6,9 ms sind Arithmetik, gemessen wurde nur an 60 Hz; diese Übung misst keine Zeiten).

### Weitere Fachliteratur
- Bediou, B., Adams, D. M., Mayer, R. E., Tipton, E., Green, C. S., & Bavelier, D. (2018). Meta-analysis of action video game impact on perceptual, attentional, and cognitive skills. *Psychological Bulletin, 144*(1), 77–110. https://doi.org/10.1037/bul0000130 – Transfer, Publikationsbias
- Bi, X., Li, Y., & Zhai, S. (2013). FFitts law: Modeling finger touch with Fitts' law. In *Proceedings of CHI '13* (S. 1363–1372). ACM. https://doi.org/10.1145/2470654.2466180 – Fehlerraten beim Fingertippen
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Farbsehschwäche
- Buxton, W. (1990). A three-state model of graphical input. In D. Diaper et al. (Hrsg.), *Human–Computer Interaction – INTERACT '90* (S. 449–456). Elsevier (North-Holland). – Buch/Tagungsband, keine DOI; Touch ohne Schwebezustand
- Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction, 23*(3), 215–250. https://doi.org/10.1080/07370020802278163 – Mausübersetzung
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports, 8*, 10059. https://doi.org/10.1038/s41598-018-28434-6 – Blick beim Verfolgen mit der Hand
- Doyon, J., & Benali, H. (2005). Reorganization and plasticity in the adult brain during learning of motor skills. *Current Opinion in Neurobiology, 15*(2), 161–167. https://doi.org/10.1016/j.conb.2005.03.004 – Lernnetzwerke
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin, 127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – Zwei-Komponenten-Modell
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of CHI '13* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Alter, Touch vs. Maus (inkl. Ziehen)
- Forlines, C., Wigdor, D., Shen, C., & Balakrishnan, R. (2007). Direct-touch vs. mouse input for tabletop displays. In *Proceedings of CHI '07* (S. 647–656). ACM. https://doi.org/10.1145/1240624.1240726 – Ziehen per Finger vs. Maus, Verdeckung
- Gauthier, G. M., Vercher, J.-L., Mussa Ivaldi, F., & Marchetti, E. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. *Experimental Brain Research, 73*(1), 127–137. https://doi.org/10.1007/BF00279667 – Auge-Hand-Kopplung
- Guadagnoli, M. A., & Lee, T. D. (2004). Challenge point: A framework for conceptualizing the effects of various practice conditions in motor learning. *Journal of Motor Behavior, 36*(2), 212–224. https://doi.org/10.3200/JMBR.36.2.212-224 – adaptive Schwierigkeit
- Harris, C. M., & Wolpert, D. M. (1998). Signal-dependent noise determines motor planning. *Nature, 394*(6695), 780–784. https://doi.org/10.1038/29528 – Rauschen und Tempo-Genauigkeit
- Heathcote, A., Brown, S., & Mewhort, D. J. K. (2000). The power law repealed: The case for an exponential law of practice. *Psychonomic Bulletin & Review, 7*(2), 185–207. https://doi.org/10.3758/BF03212979 – Übungskurven
- Huang, J., Tian, F., Fan, X., Zhang, X. (L.), & Zhai, S. (2018). Understanding the uncertainty in 1D unidirectional moving target selection. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems* (S. 1–12). ACM. https://doi.org/10.1145/3173574.3173811 – bewegte Ziele
- Inkpen, K. M. (2001). Drag-and-drop versus point-and-click mouse interaction styles for children. *ACM Transactions on Computer-Human Interaction, 8*(1), 1–33. https://doi.org/10.1145/371127.371146 – Ziehen bei Kindern
- Jagacinski, R. J., Repperger, D. W., Ward, S. L., & Moran, M. S. (1980). A test of Fitts' law with moving targets. *Human Factors, 22*(2), 225–233. https://doi.org/10.1177/001872088002200211 – Fitts bei bewegten Zielen
- Karni, A., Meyer, G., Jezzard, P., Adams, M. M., Turner, R., & Ungerleider, L. G. (1995). Functional MRI evidence for adult motor cortex plasticity during motor skill learning. *Nature, 377*(6545), 155–158. https://doi.org/10.1038/377155a0 – Lernspezifität
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Obergrenze der Folgebewegung
- Miall, R. C., Reckess, G. Z., & Imamizu, H. (2001). The cerebellum coordinates eye and hand tracking movements. *Nature Neuroscience, 4*(6), 638–644. https://doi.org/10.1038/88465 – Kleinhirn, Auge-Hand
- Motti, L. G., Vigouroux, N., & Gorce, P. (2014). Drag-and-drop for older adults using touchscreen devices: Effects of screen sizes and interaction techniques on accuracy. In *Proceedings of the 26th Conference on l'Interaction Homme-Machine (IHM '14)* (S. 139–146). ACM. https://doi.org/10.1145/2670444.2670460 – Ziehen bei Älteren auf Tablet/Smartphone, Stift genauer als Finger (n = 24, 65–86 J.; Crossref ✓, Abstract über Semantic Scholar)
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blick beim Zeigen
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm
- Prablanc, C., Echallier, J. F., Komilis, E., & Jeannerod, M. (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. *Biological Cybernetics, 35*(2), 113–124. https://doi.org/10.1007/BF00337436 – Sakkade vor Handbewegung
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – fehlender Ferntransfer
- Shadmehr, R., Smith, M. A., & Krakauer, J. W. (2010). Error correction, sensory prediction, and adaptation in motor control. *Annual Review of Neuroscience, 33*, 89–108. https://doi.org/10.1146/annurev-neuro-060909-153135 – Vorwärtsmodelle
- Smith, M. W., Sharit, J., & Czaja, S. J. (1999). Aging, motor control, and the performance of computer mouse tasks. *Human Factors, 41*(3), 389–396. https://doi.org/10.1518/001872099779611102 – Alter und Mausaufgaben
- Vogel, D., & Baudisch, P. (2007). Shift: A technique for operating pen-based interfaces using touch. In *Proceedings of CHI '07* (S. 657–666). ACM. https://doi.org/10.1145/1240624.1240727 – Verdeckung durch den Finger
- W3C. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (W3C Recommendation, 12.12.2024). https://www.w3.org/TR/WCAG22/ – keine DOI; SC 2.5.7 Ziehbewegungen, SC 2.3.1 Blitze
- Walker, N., Philbin, D. A., & Fisk, A. D. (1997). Age-related differences in movement control: Adjusting submovement structure to optimize performance. *The Journals of Gerontology: Series B, 52B*(1), P40–P53. https://doi.org/10.1093/geronb/52B.1.P40 – Alter und Submovements
- Weidling, P., & Jaschinski, W. (2015). The vertical monitor position for presbyopic computer users with progressive lenses: How to reach clear vision and comfortable head posture. *Ergonomics, 58*(11), 1813–1829. https://doi.org/10.1080/00140139.2015.1035764 – Gleitsicht und Monitorhöhe
- Wimmer, R., Schmid, A., & Bockes, F. (2019). On the latency of USB-connected input devices. In *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems* (S. 1–12). ACM. https://doi.org/10.1145/3290605.3300650 – Eingabelatenz
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messgenauigkeit, Streuung am Menschen, Korrelation und Übereinstimmung (S. 24, 43–44)
