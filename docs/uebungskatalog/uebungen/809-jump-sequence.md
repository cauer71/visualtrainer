---
# ===== Kennung =====
nr: 809
kennung: jump-sequence
name: "Sprungweite: die Kugel mit dem Finger auf die Zielmarke dosieren"
name_original: "Sprungsequenz & Flugbahn-Abfangen (Seitentitel: Sprungkrafttraining online | Sprungfolge-Spiel | SkillDrills)"
kapitel: "Körper & Reflexe"
kapitel_original: "physical"
unterkapitel_original: "fitness"
quelle_url: "https://skilldrills.online/de/drills/physical/fitness/jump-sequence"
blickfit_umsetzung: {kennung: "sprung-abfangen", name: "Sprungweite", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/sprung-abfangen/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Man zieht mit dem Finger an einer Kraftleiste: je weiter, desto weiter springt die Kugel im Bogen. Sie soll auf der Zielmarke landen. Nach jedem Sprung zeigt die Übung Landepunkt und Abweichung (zu kurz oder zu weit). Mit den Stufen wird das Trefferfeld enger, die Hilfsmarke an der Leiste blendet aus und die Zielabstände streuen stärker. Kein Zeitdruck, kein Blitz, kein Wackeln; gemessen werden nur Zuglänge und Landepunkt – keine Körperübung, kein Sprungkrafttraining."
ziel_funktionen: [antizipation, auge_hand_koordination]
eingabe: [maus, touchpad]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code steigt das (stufenlose) Level mit Punkte/250 + 1 plus 1 Level je 4 Treffer Serie; es sinkt nie und hat keine Obergrenze. Zieltempo = 120 + 680·(Level−1)/14 + 100·min(1; Serie/50) px/s (Level 15 = 800 px/s, mit 50er-Serie 900 px/s, danach weiter steigend), Zielradius 35 → 12 px (ab Level 15 fest), Punkte je Treffer round(5 + 20·(Level−1)/14), also 5 bei Level 1 und 25 bei Level 15, danach weiter steigend, × Serienfaktor bis 3,0. Start immer bei Level 1."
messgroessen: ["Punkte", "Treffer und Fehlsprünge", "Genauigkeit = Treffer / Sprünge in %", "längste Serie", "erreichtes Level und Spitzentempo in px/s", "sinnvoll: Haltedauer-Fehler (zu kurz/zu lang geladen) in ms, seitlicher Abstand beim Vorbeiflug, Tempo in °/s mit 80 % Treffern"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 1
    farbunterscheidung: 1
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 2
    sakkaden: 1
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 0
    inhibition: 0
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 3
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 3
    zielbewegung_tempo: 1
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 2
    ruhige_hand: 0
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
voraussetzungen: ["Maus (oder Touchpad) mit Taste (Drücken–Halten–Loslassen); auf reinen Touch-Geräten lässt sich das Original nicht starten", "bewegte Ziele mit den Augen verfolgen und gleichzeitig den Punkt am unteren Bildrand im Blick behalten", "passende Korrektion für den Bildschirmabstand (bei Alterssichtigkeit Zwischenbereich)", "Farbsehen nicht zwingend nötig (Zustände zusätzlich über Ladebalken und Bewegung erkennbar)"]
vorsicht_bei: [hand_arm_beschwerden, tremor_parkinson, presbyopie_gleitsicht, migraene_lichtempfindlich, photosensitive_epilepsie]
geeignet_fuer: ["Dosieren einer Strecke nach Augenmaß und Einschätzen von Wurfbahnen", "Lernen aus Rückmeldung (zu kurz oder zu weit) von Sprung zu Sprung", "Auge-Hand-Übung ohne Frist pro Versuch, im eigenen Tempo", "Menschen, die ruhig und genau zielen möchten, ohne Zeitdruck"]
weniger_geeignet_fuer: ["Sprungkraft, Schnellkraft, Gleichgewicht oder Sturzprävention (keine Körperübung; dafür echte Übungen im Stand mit Anleitung)", "Menschen mit Hand- oder Armbeschwerden bei wiederholtem Ziehen", "wer ein stabiles, zwischen Geräten vergleichbares Leistungsmaß sucht (Ergebnis hängt von Gerät und Leistenlänge ab)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Abfangleistung, Dosieren und Timing verbessern sich mit Übung in der geübten Aufgabe (allgemeine Motorik-Forschung), Studien zu dieser Übung fehlen; für Sprungkraft oder Sport-Timing gibt es keinen Beleg."
aehnliche_uebungen: [807, 104, 802, 407, 414, 515]
stichworte: ["Abfangen", "Interzeption", "Flugparabel", "Timing", "Haltedauer", "Vorausschätzen", "Auge-Hand-Koordination", "Maus", "Sprungspiel", "Combo"]
---

# 809 · Sprungweite: die Kugel mit dem Finger auf die Zielmarke dosieren

> Original: „Sprungsequenz & Flugbahn-Abfangen“ (Seitentitel „Sprungkrafttraining online | Sprungfolge-Spiel“) – skilldrills.online, Kapitel „physical“ / „fitness“ · Blickfit-Übung: Sprungweite (`sprung-abfangen`)

## 1. Kurzbeschreibung
Eine Kugel steht am Boden, links oder rechts von ihr steht eine Zielmarke (Fähnchen). Unten liegt eine Kraftleiste: Man zieht mit dem Finger an ihr, und je weiter man zieht, desto weiter springt die Kugel. Beim Loslassen springt die Kugel auf einer Wurfparabel (feste Abwurfrichtung, feste Schwerkraft, Flugzeit nach der Zeit gerechnet) und soll auf der Zielmarke landen. Danach zeigen Landepunkt und Abweichung in Prozent der Bildschirmbreite, ob sie zu kurz oder zu weit kam, mit ✓ oder ✗. Das Trefferfeld ist anfangs ±9 % der Bildschirmbreite breit und wird bis auf ±3 % enger; eine Hilfsmarke an der Leiste zeigt zu Beginn die richtige Kraft und blendet bis Stufe 8 aus, die Zielabstände streuen mit den Stufen stärker. Eine Sitzung hat zwölf Sprünge, ohne Zeitdruck. Erfasst werden mittlere Abweichung, Trefferquote und höchste Stufe – nur, wie weit gezogen wird und wo die Kugel landet. Es ist eine Tipp- und Zieh-Übung am Bildschirm, keine Körperübung.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext und ausgelieferter Spielcode (Next.js-Chunk des Spiels und gemeinsame Hilfsmodule, abgerufen und formatiert 29.09.2026; nur Mechanik notiert). **[Code]** = aus dem Code, **[Text]** = nur Regeltext, **[Rechnung]** = eigene Ableitung aus Code-Werten.

- **Spielfeld [Code]:** Canvas in Containergröße (Vorgabe 800 × 450 logische px). Bodenlinie und Spieler 80 px über dem unteren Rand; Spielerpunkt Radius 14 px. Ziele entstehen zufällig in x 80 … Breite−80, y 80 … Höhe−200, mit zufälliger Richtung und dem aktuellen Grundtempo; sie bewegen sich zwischen x 40 … Breite−40 und y 40 … Höhe−140 und prallen dort ab – **auf allen Stufen**.
- **Zielbewegung [Code]:** geradlinig mit Wandabprall. Ein Zufallsrauschen der Geschwindigkeit (≈ ±30 px/s² je Achse) ist so klein, dass die Bahn praktisch gerade bleibt [Rechnung]; eine Tempo-Obergrenze (Nenntempo) bremst um 5 %, sobald das Rauschen sie überschreitet. Weil jedes Ziel genau mit dem Nenntempo startet, geschieht das meist schon in den ersten Bildern; das tatsächliche Zieltempo liegt daher etwa 5 % unter dem Nennwert [Rechnung]. Die englische Beschreibung „erratic target acceleration“ trifft nicht zu.
- **Laden und Absprung [Code]:** Laden beginnt nur, wenn die Taste innerhalb von 32 px um den Punkt gedrückt wird (Punkt leuchtet dann orange). Der Ladewert steigt mit 100 %/s (sichtbar als Ladebalken links unten, nur während des Ladens) (volle Ladung nach 1,0 s); während des Ladens darf die Maus schon frei bewegt werden. Beim Loslassen: Startgeschwindigkeit 12 px/s je Prozent (max. 1.200 px/s), Schwerkraft 750 px/s². Scheitelhöhe = 0,096 · Ladung² px [Rechnung]: 50 % → 240 px, 100 % → 960 px (mehr als die doppelte Spielfeldhöhe; es gibt keine Decke). Ein Tipp ohne Halten (Ladung ≈ 0) ist sofort ein Fehlsprung.
- **Nötige Ladung [Rechnung]:** Bei 450 px Höhe liegen Ziele 60–330 px über dem Spieler (Entstehung 120–290 px) → für einen Scheitel in Zielhöhe 25–59 % bzw. ≈ 0,25–0,6 s Haltedauer. 10 ms mehr Halten heben den Scheitel bei 45 % Ladung um ≈ 9 px. Getroffen wird aber **überall** auf der Bahn, auch im Aufstieg; stärkeres Laden verkürzt die Steigzeit, verlängert jedoch einen Fehlsprung (Flugzeit 0,032 s je Prozent: 45 % → 1,4 s, 100 % → 3,2 s).
- **Seitliche Steuerung [Code]:** Nur im Flug läuft der Punkt der Zeiger-x-Position nach, verzögert wie ein träges System (Rate 4,5/s, Zeitkonstante ≈ 0,22 s): nach 0,2 s sind ≈ 59 %, nach 0,5 s ≈ 89 % des Seitenabstands aufgeholt [Rechnung]. Man muss also vorhalten. Am Boden bleibt der Punkt, wo er gelandet ist.
- **Treffer [Code]:** Abstand Spielermitte–Zielmitte < Zielradius + 14 px, geprüft einmal pro Bild. Der wirksame Trefferradius ist also 49 → 26 px, nicht 35 → 12 px. Nach einem Treffer erscheint sofort ein neues Ziel, und der Spieler steht wieder am Boden – **ein Treffer pro Sprung**.
- **Fehler [Code]:** Landung ohne Treffer → Serie 0, Faktor 1,0, Bildschirm-Wackeln 16 px, Strafton, roter Vollbild-Blitz (480 ms, über die Effekt-Einstellung abschaltbar), neues Ziel. Da ein Tipp ohne Laden nach wenigen Bildern als Fehlsprung zählt und jeder Fehlsprung einen eigenen Blitz auslöst, lassen sich durch schnelles Klicken mehrere rote Blitze pro Sekunde erzeugen [Rechnung]. Keine Punkt- oder Zeitstrafe (wie im Regeltext). Pro Ziel gibt es keine Frist: Man kann mit dem Absprung beliebig warten.
- **Punkte und Level [Code]:** je Treffer round(5 + 20·t) Punkte × Serienfaktor (t = (Level−1)/14, ohne Obergrenze). Faktor: ab 3 Treffern 1,1×, 5 → 1,25×, 7 → 1,35×, 10 → 1,5×, 15 → 1,75×, 20 → 2,0×, 30 → 2,5×, **50 → 3,0×**. Level = max(bisher; Punkte/250 + 1 + ⌊Serie/4⌋), sinkt nie.
- **Dauer [Code]:** Countdown ≈ 2,5 s, dann 45 s. Start immer bei Level 1. Genauigkeit = Treffer / Sprünge.
- **Eingabe [Code]:** `mousedown`/`mouseup`/`mousemove` am Dokument; Pointer-Lock mit relativer Bewegung × Empfindlichkeit, sonst absolute Zeigerposition; Verlassen des Pointer-Locks oder Esc bricht die Runde ab. Keine Kamera, keine Lagesensoren. Meldet das Gerät Touch und keinen feinen Zeiger (`pointer: fine`), ersetzt der gemeinsame Startbildschirm den Startknopf durch „Mouse Required for Pointer Lock“ – auf einem Tablet ohne Maus lässt sich die Übung also gar nicht starten. Ob ein Tablet mit angeschlossener Maus als „feiner Zeiger“ erkannt wird, hängt vom Browser ab (nicht am Gerät getestet). Touchpads funktionieren.
- **Bildfrequenz [Code]:** Bewegung mit Zeitschritt (max. 0,1 s) → Tempo weitgehend unabhängig von der Bildrate. Kleine Abhängigkeiten [Rechnung]: das Rechenverfahren senkt den Scheitel bei 60 Hz um wenige Pixel (≈ 5 px bei 600 px/s Startgeschwindigkeit, bei 30 Hz ≈ 10 px); der Treffertest pro Bild kann bei 30 Hz knappe Streifschüsse übersehen.
- **Farben [Code]:** Ziel grüner Ring mit Innenring und Mittelpunkt; Spielerpunkt grün (bereit), orange (Zeiger darauf), rot (lädt), cyan leuchtend (fliegt); Ladebalken cyan am linken Rand (16 × 90 px); Fadenkreuz cyan/rot, ab Faktor 2 violett, ab 3 grün.
- **Bewertung [Code]:** Note aus 100·√(Punkte/17.000): S+ ab ≈ 15.300, S ≈ 12.300, A ≈ 9.600, B ≈ 6.100, C ≈ 3.400, D ≈ 1.500 Punkte.

**Widersprüche Regeltext ↔ Code:** (1) „15 Level, 120 → 900 px/s“ – Level 15 ergibt 800 px/s, 900 px/s erst mit 50er-Serie; darüber steigen Level und Tempo unbegrenzt weiter. (2) „Trefferradius 35 → 12 px“ ist der gezeichnete Radius; wirksam sind 49 → 26 px. (3) „In höheren Stufen elastische Wandabpraller“ – Abpraller gibt es immer. (4) Englische Regel „Chain hits in a single jump“ – unmöglich, nach jedem Treffer wird zurückgesetzt. (5) „Alle 250 Punkte ein Level“ – zusätzlich +1 Level je 4 Treffer Serie. (6) Tipp „nur so weit laden, dass der Scheitel die Zielhöhe schneidet“ – Treffer zählen auf der ganzen Bahn. (7) Die englische Beschreibung sagt, die Bewegung werde „nicht durch Rückmeldung gesteuert, sobald sie in der Luft ist“ – gerade das Lenken im Flug ist aber Spielregel 2.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Aussagen:** Das Spiel übertrage die „neuromuskuläre Koordination des Vertikalsprungs“ auf eine Simulation; die Ladedauer bilde den Dehnungs-Verkürzungs-Zyklus (DVZ) nach Komi (2000) ab, die Flugsteuerung beruhe auf Kleinhirn-Vorwärtsmodellen (Kawato, 1999), das Abfangen auf dem optischen Tau (Lee, 1976); dazu Woodworth (1899) und Fitts (1954). Laut FAQ lerne das Nervensystem, „elastische Energie im Moment des Bodenkontakts aufzuladen“, der DVZ steigere die Absprungleistung „um bis zu 25 %“. Zielgruppen: Volleyball, Basketball, Fußball, Leichtathletik, FPS-Gamer. Dazu eine „wissenschaftliche 5-Stufen-Normtabelle“ (Top 0,1 % ab 17.000 Punkten, „Durchschnitt“ 4.000–7.499).

**Einordnung:**
- **Selbst eingeräumt:** Der englische Absatz sagt, es handle sich um „a cursor interception drill“, der weder Sprung noch DVZ messe. Die deutsche Überschrift „Sprungkrafttraining“ und die FAQ zum Transfer auf „reale Sprungkraft“ widersprechen dem.
- **Falsch zugeordnet:** Der DVZ ist Muskel-Sehnen-Mechanik beim Hüpfen und Laufen (Komi, 2000) – eine Maustaste hat damit nichts zu tun. „Bis zu 25 %“ steht nicht im Abstract; der Vorteil des Gegenbewegungssprungs (im Mittel 3,4 cm) wird von Bobbert et al. (1996) gerade **nicht** mit elastischer Energie erklärt.
- **Physikalisch unpassend:** Im echten Sprung ist die Flugbahn des Körperschwerpunkts nach dem Absprung festgelegt; lenken kann man nur Arme und Beine (Grundwissen Mechanik). „Flugbahnsteuerung in der Luft“ ist deshalb kein Sprung-Analogon. Tau beschreibt die Zeit bis zur Kollision **heranfliegender**, sich im Netzhautbild vergrößernder Objekte (Lee, 1976); die Ziele hier fliegen seitlich und wachsen nicht. Dass Tau die alleinige Zeitinformation ist, wird zudem bezweifelt; andere Informationsquellen spielen ebenfalls eine Rolle (Tresilian, 1999).
- **Plausibel, aber nicht spielspezifisch belegt:** Beim Abfangen werden visuelle Informationen durch Vorhersage und interne Modelle ergänzt (Zago et al., 2009; Kawato, 1999). Dass das Spiel „das Kleinhirn trainiert“, ist nicht belegt.
- **Unbelegt:** Transfer auf Sprung-Timing im Sport, „eDPI 200–350“, Fingertip-/Claw-Griff als Optimum, „Rebound-Rhythmik wie im plyometrischen Training“.
- **Normtabelle ohne Datengrundlage – und praktisch unerreichbar:** Die Seite sammelt nach eigener Aussage keine Nutzerdaten, keine zitierte Arbeit enthält Normen. Die Grenzen folgen der Notenfunktion (Referenz 17.000). Eigene Simulation mit dem Code: Wer **jeden** Sprung trifft, erreicht bei 50 Sprüngen in 45 s ≈ 1.850 Punkte, bei 64 Sprüngen (≈ 0,7 s pro Sprung) ≈ 3.500 Punkte – also die Stufe „Einsteiger (< 4.000)“; das Tempo läge dann schon bei ≈ 1.160 bzw. 1.680 px/s. „Top 0,1 % ab 17.000“ ist mit dieser Mechanik nicht erreichbar.
- **Messtechnik:** Die Werte zu Bildrate (15 px pro Bild bei 900 px/s und 60 Hz) und Abfragerate sind rechnerisch richtig; „Differenzen unter 5 ms = Messrauschen“ ist keine Aussage von Woods et al. (2015).

## 4. Optische und okulomotorische Grundlagen
- **Reizgrößen:** Das Trefferfeld ist ±9 % (Stufe 1) bis ±3 % (Stufe 20) der Bühnenbreite breit; die größte Sprungweite beträgt 80 % der Bühnenbreite. Als Umrechnung gilt: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°. Beispielrechnung: Erscheint die Bühne aus 40 cm Abstand 30° breit, entsprechen ±9 % etwa ±2,7° und ±3 % etwa ±0,9°. Detailsehen spielt eine Nebenrolle.
- **Blickorte:** Die Aufgabe verteilt den Blick auf die Kraftleiste unten (Zuglänge, Hilfsmarke), die Kugel und die Zielmarke. Die Weite wird nach Augenmaß aus dem Abstand zwischen Kugel und Marke abgeschätzt und über die Zuglänge eingestellt; auf höheren Stufen fehlt die Hilfsmarke. Die Parabel ist ein zweidimensionales Bild: Stereosehen ist nicht nötig.
- **Kugelflug:** Der Flug folgt der Wurfphysik; die Flugdauer ist durch Weite, Abwurfwinkel und Schwerkraft festgelegt und hängt nicht von der Bildrate ab. Die glatte Folgebewegung kommt mit solchen Geschwindigkeiten gut zurecht (Augengeschwindigkeit etwa 90 % der Zielgeschwindigkeit bis 100°/s bei vier von fünf Personen; Meyer et al., 1985). Bei älteren Menschen (75–93 Jahre) war die Folgegenauigkeit bei allen Zielgeschwindigkeiten geringer (Moschner & Baloh, 1994).
- **Farbe und Form:** Rückmeldung erfolgt mit ✓/✗ und Zahlen, nicht nur mit Farbe; eine Rot-Grün-Farbsehschwäche (etwa 8 % der Männer; Birch, 2012) ist deshalb kein Hindernis.
- **Brille:** Der Blick wechselt zwischen der Leiste unten und der Zielmarke. Bei Gleitsicht ist das klare Zwischenfeld am Bildschirm schmal (horizontal 13–18°; Han et al., 2003); dann Kopf statt Augen bewegen, den Bildschirm eher tief stellen und gegebenenfalls eine Arbeitsplatzbrille erwägen (Beratung beim Optiker). Der Akkommodationsaufwand beträgt 1 geteilt durch den Abstand in Metern (2,5 dpt bei 40 cm).

## 5. Neurowissenschaftliche Grundlagen
- **Vorhersage und innere Modelle:** Wer die Landestelle einer Kugel auf einer Parabel einschätzt und die Kraft danach wählt, nutzt Vorwissen über die Wurfphysik; beim Abfangen bewegter Objekte wird visuelle Information durch Vorwissen und interne Modelle ergänzt (Zago et al., 2009). Interne Vorwärts- und inverse Modelle sind gut gestützte Konzepte, das Kleinhirn spielt dabei eine Rolle (Kawato, 1999); ein Trainingseffekt auf das Kleinhirn durch diese Übung ist nicht untersucht.
- **Lernen aus Rückmeldung:** Nach jedem Sprung zeigt die Übung, ob die Kugel zu kurz oder zu weit kam; diese Rückmeldung lässt sich für den nächsten Versuch nutzen. Die Hilfsmarke an der Leiste erleichtert das zu Beginn und blendet bis Stufe 8 aus.
- **Kein Bezug zu Sprungnetzwerken:** Aussagen zu „elastischer Energiespeicherung in den Beinstreckern“ haben mit dem Ziehen eines Fingers nichts zu tun.

## 6. Motorische Grundlagen
- **Bewegungsart:** Der Finger zieht an der Leiste; die Zuglänge bestimmt die Kraft (fester Verstärkungsfaktor) und damit die Sprungweite, das Loslassen löst den Sprung aus. Es gibt kein Klick-Tempo, und der Finger bleibt unter dem Geschehen, sodass er nichts verdeckt. Die Weite wächst linear mit der Zuglänge: Ein Fehler von 1 % der Bühnenbreite entspricht 1,25 % der Leistenlänge; das engste Trefferfeld (±3 %) verlangt also eine Genauigkeit von etwa ±3,75 % der Leistenlänge.
- **Zwei Komponenten:** Ein geplanter Anfangsimpuls plus rückmeldungsgesteuerte Korrektur (Woodworth, 1899; Elliott et al., 2001) beschreibt das Ziehen gut: erst grob, dann fein bis zur gewünschten Länge; entschieden wird beim Loslassen.
- **Fitts'sches Gesetz:** Es gilt für Zielbewegungen auf ruhende Ziele (Fitts, 1954). Hier wird nicht auf das Ziel gezeigt, sondern eine Strecke dosiert; das Gesetz beschreibt die Aufgabe daher nur sehr grob.
- **Belastung:** Zwölf kurze Züge je Sitzung; die Dauer der Zeigearbeit hängt mit Hand-Arm-Beschwerden zusammen (mäßige Evidenz, IJmker et al., 2007), für kurze Sitzungen nur als allgemeiner Hinweis zu verstehen.

## 7. Einflussfaktoren und Messgrenzen
- **Gerät und Bühnenbreite:** Weiten und Abweichungen sind in Prozent der Bühnenbreite angegeben; die Schwerkraft wächst mit der Bühnengröße, sodass Flugdauer und Bogen auf jedem Gerät ähnlich sind. Die Länge der Leiste in Zentimetern ändert die nötige Handbewegung; Eingabeart und Unterlage wirken. Nur Vergleiche mit sich selbst auf demselben Gerät sind sinnvoll.
- **Hilfsmarke:** Solange die Hilfsmarke die richtige Kraft zeigt, misst die Übung vor allem, wie genau man ablesen und ziehen kann, nicht, wie gut man Weiten schätzt; mit dem Ausblenden ab Stufe 8 ändert sich das.
- **Zufall:** Richtung und Zielabstände sind zufällig und werden mit den Stufen weiter gestreut; einzelne Sprünge streuen stark. Messungen am Menschen streuen allgemein, der Verlauf über mehrere Sprünge und Sitzungen (Median) ist aussagekräftiger als ein Einzelwert (vgl. Mountford et al., 2004, S. 17–18).
- **Alter:** Ältere (60–75 Jahre) hatten bei Mausaufgaben mehr Schwierigkeiten (Smith et al., 1999); die Folgebewegung wird mit dem Alter schwächer (Moschner & Baloh, 1994). Die Stufe passt sich an.
- **Zuverlässigkeit:** nicht untersucht; nur Vergleiche mit sich selbst am selben Gerät sind sinnvoll.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt (mittel):** In geübten Zielaufgaben und Dosieraufgaben wird man mit Übung in der Regel besser (allgemeiner Befund des motorischen Lernens, hier nicht durch eine eigene Quelle belegt); zu dieser Übung gibt es keine Studie.
- **Naher Transfer (schwach):** auf ähnliche Dosier- und Wurfaufgaben am Bildschirm plausibel, aber ungeprüft.
- **Alltagstransfer (fehlend):** Hirntraining verbessert vor allem die geübten Aufgaben, kaum Alltagsleistungen (Simons et al., 2016). Für Sprungkraft oder Sprung-Timing im Sport gibt es keinen Beleg; die Aufgabe ist kein Sprung, die Flugbahn der Kugel ist eine Darstellung.
- **Zum Vergleich (echte Übungen, nicht diese Übung):** Bewegungstraining mit Gleichgewichts- und Funktionsanteilen senkt bei zu Hause lebenden Älteren die Sturzrate um etwa 24 % (Sherrington et al., 2019). Wer Sprungkraft oder Mobilität verbessern will, braucht Übungen mit dem Körper.

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** das Dosieren einer Strecke nach Augenmaß und das Einschätzen von Wurfbahnen geübt werden sollen; eine Übung ohne Zeitdruck gewünscht ist (eigenes Tempo beim Ziehen und Loslassen); ein Gerät mit Touchscreen vorhanden ist.
- **Weniger passend, wenn …** Sprungkraft, Beinarbeit, Gleichgewicht oder Sturzprävention das Ziel sind; ein vergleichbares Leistungsmaß zwischen Geräten gebraucht wird.
- **Vorsicht / anpassen bei …**
  - `hand_arm_beschwerden`: wiederholtes Ziehen an der Leiste; Pausen einplanen.
  - `tremor_parkinson`: Die Zuglänge muss genau gehalten werden; Zittern kann sie verändern, auf hohen Stufen ist das Trefferfeld eng. Die Übung misst kein Zittern; Zittern gehört zu den Symptomen, die ärztlich abgeklärt werden sollten (Muchnick, 2008, S. 28).
  - `presbyopie_gleitsicht`: Blickwechsel zwischen Leiste und Zielmarke; Kopf mitbewegen, Arbeitsplatzbrille erwägen.
  - `migraene_lichtempfindlich`, `photosensitive_epilepsie`: Die Übung kommt ohne Blitze, ohne Rot und ohne Wackeln aus; die Rückmeldung erfolgt ruhig mit ✓/✗. Grundsätzlich gelten mehr als 3 Blitze pro Sekunde und Wechsel zu gesättigtem Rot als potenziell anfallsauslösend (Harding et al., 2005).
  - Treten beim Üben Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung, Schwindel oder Zittern auf, sollte das ärztlich abgeklärt werden, statt weiterzuüben (Muchnick, 2008, S. 6, 28).
- **Kombiniert gut mit …** 104 (bewegtes Ziel abfangen), 407 (prädiktive Blickfolge), 414 (Sprungziel), 515 (vertikales Tracking), 802 (fallende Kugeln fangen), 807 (Leitersprossen im Takt antippen). **Abgrenzung in der Gruppe 806–811:** keine Dublette; nächstverwandt ist 807 (ebenfalls zeitlich-räumliches Treffen, dort aber fester Zickzack im Takt, hier das Dosieren einer Weite ohne Frist). Keine Diagnosen, keine Heil- oder Leistungsversprechen; Ergebnisse sind keine Normwerte.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Ehrlicher Name:** „Sprungkrafttraining“ streichen; z. B. „Wurfbahn-Abfangen“ als Auge-Hand-/Timing-Übung.
- **Touch:** Das Original blockiert reine Touch-Geräte. Vorschlag: Finger aufsetzen = laden, loslassen = Start; gelenkt wird mit einem zweiten Finger oder durch Neigen der Bahn vor dem Start (Richtung beim Ziehen). Bedienfläche ≥ Ø 1 cm, Ziel nicht vom Finger verdeckt. Blickfit-`zielfang` deckt das Abfangen per Tipp schon ab.
- **Messqualität:** Physik in Sehwinkel bzw. relativ zur Spielfeldhöhe statt in festen Pixeln; Tempo mit Obergrenze, adaptiv (Level darf nach Fehlern sinken); Treffertest als Strecke zwischen zwei Bildern. Sinnvolle Rückmeldung: „zu kurz/zu lang geladen“ in ms und „vor/hinter dem Ziel“.
- **Feste Regeln:** Treffer nur als Bahn-Schnittpunkt oder bewusst „am Scheitel“ – dann aber im Regeltext sagen; Frist pro Ziel optional, damit Tempo und Risiko nicht vermischt werden.
- **Sicherheit:** kein roter Vollbild-Blitz, kein Wackeln; Rückmeldung am Ziel.
- **Farbsehschwäche:** Zustände des Spielerpunkts zusätzlich über Form/Symbol; Ziel und Spieler nicht nur über Grün/Rot unterscheiden.
- **Echte Körpervariante:** Nur mit eigener Sicherheitsprüfung (fester Halt, rutschfester Boden); Träger:innen von Mehrstärkenbrillen (63–90 Jahre) stürzten in einer Kohortenstudie gut doppelt so häufig, v. a. durch Stolpern, außer Haus und auf Treppen (Lord et al., 2002) – bei Schritt- oder Sprungübungen daher besonders auf sicheren Stand achten.

## 11. Quellen
### Von der Website angegeben
- Komi, P. V. (2000). Stretch-shortening cycle: A powerful model to study normal and fatigued muscle. *Journal of Biomechanics, 33*(10), 1197–1206. https://doi.org/10.1016/S0021-9290(00)00064-6 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein (DVZ ist Muskel-Sehnen-Mechanik beim Hüpfen/Laufen, kein Bezug zur Maustaste; „bis zu 25 %“ nicht im Abstract).
- Kawato, M. (1999). Internal models for motor control and trajectory planning. *Current Opinion in Neurobiology, 9*(6), 718–727. https://doi.org/10.1016/S0959-4388(99)00028-8 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (interne Modelle und Kleinhirn als Konzept ja; Training durch dieses Spiel nein).
- Lee, D. N. (1976). A theory of visual control of braking based on information about time-to-collision. *Perception, 5*(4), 437–459. https://doi.org/10.1068/p050437 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein (Tau gilt für heranfliegende, sich vergrößernde Objekte; die Ziele fliegen seitlich in 2D).
- Woodworth, R. S. (1899). The accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3), i–114. https://doi.org/10.1037/h0092992 – **Prüfung:** DOI stimmt ✓ (Crossref-Titel ohne „The“); **stützt die Aussage der Website:** teilweise (Zwei-Komponenten-Modell ja; „100-ms-Fenster“ nicht aus der Quelle).
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (gilt für ruhende Ziele; bei bewegten Zielen und großem Trefferkreis kaum einschlägig).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓ (131 = Artikelnummer); **stützt die Aussage der Website:** nein (einfache Reaktionszeit; keine Normen für dieses Spiel, „5 ms Messrauschen“ nicht aus der Quelle).

### Weitere Fachliteratur
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit Farbsehschwäche
- Bobbert, M. F., Gerritsen, K. G. M., Litjens, M. C. A., & Van Soest, A. J. (1996). Why is countermovement jump height greater than squat jump height? *Medicine & Science in Sports & Exercise, 28*(11), 1402–1412. https://doi.org/10.1097/00005768-199611000-00009 – Gegenbewegungssprung ohne elastische Erklärung
- Brenner, E., & Smeets, J. B. J. (2011). Continuous visual control of interception. *Human Movement Science, 30*(3), 475–494. https://doi.org/10.1016/j.humov.2010.12.007 – laufende Anpassung beim Abfangen (CR ✓)
- Brenner, E., & Smeets, J. B. J. (2015). How people achieve their amazing temporal precision in interception. *Journal of Vision, 15*(3), 8. https://doi.org/10.1167/15.3.8 – Präzision bei freier Wahl des Treffpunkts
- Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction, 23*(3), 215–250. https://doi.org/10.1080/07370020802278163 – Mausübersetzung
- de la Malla, C., Smeets, J. B. J., & Brenner, E. (2017). Potential systematic interception errors are avoided when tracking the target with one's eyes. *Scientific Reports, 7*, 10793. https://doi.org/10.1038/s41598-017-11200-5 – Blickfolge beim Abfangen (CR ✓)
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin, 127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – Zwei-Komponenten-Modell
- Grondin, S. (2010). Timing and time perception: A review of recent behavioral and neuroscience findings and theoretical directions. *Attention, Perception, & Psychophysics, 72*(3), 561–582. https://doi.org/10.3758/APP.72.3.561 – Intervall-Timing (CR ✓, Abstract PubMed 20348562)
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x – Blitz-Grenzwerte
- IJmker, S., Huysmans, M. A., Blatter, B. M., van der Beek, A. J., van Mechelen, W., & Bongers, P. M. (2007). Should office workers spend fewer hours at their computer? A systematic review of the literature. *Occupational and Environmental Medicine, 64*(4), 211–222. https://doi.org/10.1136/oem.2006.026468 – Mausnutzung und Beschwerden
- Jagacinski, R. J., Repperger, D. W., Ward, S. L., & Moran, M. S. (1980). A test of Fitts' law with moving targets. *Human Factors, 22*(2), 225–233. https://doi.org/10.1177/001872088002200211 – Fitts bei bewegten Zielen (CR ✓)
- Lord, S. R., Dayhew, J., & Howland, A. (2002). Multifocal glasses impair edge-contrast sensitivity and depth perception and increase the risk of falls in older people. *Journal of the American Geriatrics Society, 50*(11), 1760–1766. https://doi.org/10.1046/j.1532-5415.2002.50502.x – Mehrstärkenbrille bei echten Sprung-/Schrittübungen
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Folgegrenze
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Folgebewegung im Alter (CR ✓)
- Sherrington, C., Fairhall, N. J., Wallbank, G. K., Tiedemann, A., Michaleff, Z. A., Howard, K., Clemson, L., Hopewell, S., & Lamb, S. E. (2019). Exercise for preventing falls in older people living in the community. *Cochrane Database of Systematic Reviews, 2019*(1), CD012424. https://doi.org/10.1002/14651858.CD012424.pub2 – echte Bewegungsübungen (Gleichgewichts-/Funktionstraining: Sturzrate −24 %)
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer
- Smith, M. W., Sharit, J., & Czaja, S. J. (1999). Aging, motor control, and the performance of computer mouse tasks. *Human Factors, 41*(3), 389–396. https://doi.org/10.1518/001872099779611102 – Alter und Maus
- Tresilian, J. R. (1999). Visually timed action: Time-out for 'tau'? *Trends in Cognitive Sciences, 3*(8), 301–310. https://doi.org/10.1016/S1364-6613(99)01352-2 – Kritik an Tau als alleiniger Zeitinformation
- Tresilian, J. R. (2005). Hitting a moving target: Perception and action in the timing of rapid interceptions. *Perception & Psychophysics, 67*(1), 129–149. https://doi.org/10.3758/BF03195017 – vorprogrammierte schnelle Abfangbewegungen (CR ✓, Abstract PubMed 15912877)
- Zago, M., McIntyre, J., Senot, P., & Lacquaniti, F. (2009). Visuo-motor coordination and internal models for object interception. *Experimental Brain Research, 192*(4), 571–604. https://doi.org/10.1007/s00221-008-1691-3 – interne Modelle beim Abfangen
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Lehrbuch: Warnzeichen mit Abklärungsbedarf, darunter Zittern (S. 6, 28)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Lehrbuch: Genauigkeit und Wiederholbarkeit von Messungen, Messungen am Menschen streuen (S. 17–18, 24)
