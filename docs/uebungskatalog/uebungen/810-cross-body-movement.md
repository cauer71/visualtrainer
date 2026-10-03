---
# ===== Kennung =====
nr: 810
kennung: cross-body-movement
name: "Diagonal-Korridor: eine Kugel mit dem Finger durch einen schmalen, schrägen Gang ziehen"
name_original: "Hand-Auge-Koordination Test (Seitentitel: Hand-Auge-Koordination Test | SkillDrills; engl. Spielname: Cross-Body Movement)"
kapitel: "Körper & Reflexe"
kapitel_original: "physical"
unterkapitel_original: "coordination"
quelle_url: "https://skilldrills.online/de/drills/physical/coordination/cross-body-movement"
blickfit_umsetzung: {kennung: "diagonal-korridor", name: "Diagonal-Korridor", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/diagonal-korridor/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Eine Kugel wird mit dem Finger von einer Ecke des Feldes zur gegenüberliegenden durch einen geraden, schmalen Gang gezogen. Sie sitzt über dem Finger, damit nichts verdeckt wird; bei Wandberührung gleitet sie am Rand entlang (weiches ✗), ein Rücksprung zum Start gibt es nicht. Mit den Stufen wird der Gang schmaler und länger, die Startecke wechselt. Feste Zahl von Durchgängen ohne Zeitdruck; erfasst werden Berührungen, Dauer und Gleichmäßigkeit – nur der Fingerweg, nicht der Blick. Keine Körper- oder „Hirnhälften“-Übung."
ziel_funktionen: [kontinuierliche_steuerung, auge_hand_koordination]
eingabe: [maus, touchpad]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code steigt das (stufenlose) Level mit Punkte/250 + 1 plus 1 Level je 4 Verbindungen in Serie und sinkt nie. Mit t = (Level−1)/14: Bahn-Toleranz ±10 → ±4 px (ab Level 15 fest), Knotenradius 16 → 8 px, Randabstand der Knoten 140 → 60 px (ab ≈ Level 20: 30 px), Grundpunkte 10 → 40 (darüber weiter steigend). Kein Zeitlimit je Verbindung. Start immer bei Level 1."
messgroessen: ["Punkte", "Verbindungen und Bahnverletzungen", "Genauigkeit = Verbindungen / alle Versuche in %", "längste Serie (Combo)", "erreichtes Level", "sinnvoll: Zeit je Verbindung bei gegebener Bahnbreite (Steering-Law-Durchsatz), mittlere seitliche Abweichung in Winkelminuten, Quote gelungener Verbindungen je Bahnbreite"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 2
    kontrast: 1
    farbunterscheidung: 1
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 1
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 0
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 0
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 3
    zielbewegung_tempo: 1
    zielbewegung_praezision: 2
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
voraussetzungen: ["Maus mit ausreichend Platz (Touchpad geht, ist aber für Bahnaufgaben ungünstiger); auf reinen Touch-Geräten lässt sich das Original nicht starten", "scharfes Sehen im Bildschirmabstand – die Bahn ist in hohen Leveln nur 8 px (≈ 13 Winkelminuten) breit", "Blick über ≈ 20–30° Bildschirmbreite führen können (bei Gleitsicht mit Kopfbewegung)", "Start- und Zielpunkt unterscheiden sich nur durch die Farbe (cyan/magenta)"]
vorsicht_bei: [tremor_parkinson, hand_arm_beschwerden, presbyopie_gleitsicht, sehbehinderung_niedriger_visus, gesichtsfeldausfall, farbsehschwaeche, migraene_lichtempfindlich, photosensitive_epilepsie]
geeignet_fuer: ["präzises, weites Ziehen des Fingers entlang einer Linie üben (Bahnsteuerung)", "Auge-Hand-Koordination bei großen Wegen über den ganzen Bildschirm", "Genauigkeit vor Tempo üben, da kein Zeitlimit je Gang besteht und Tempo keine Punkte bringt", "Menschen, die ruhige, kontrollierte Zieh-Bewegungen üben möchten (ohne Transferversprechen)"]
weniger_geeignet_fuer: ["Training der Zusammenarbeit der Hirnhälften, „Mittellinienkreuzen“ oder beidseitiger Koordination – die Übung ist einhändig, und solche Effekte sind nicht belegt", "Kinder mit Entwicklungs- oder Lernschwierigkeiten als Ersatz für Therapie", "Menschen mit Tremor oder Hand- und Armbeschwerden (schmaler Gang, lange Wege)", "Gleitsichtträger ohne passende Bildschirmkorrektur (Wege über große Teile des Bildschirms)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Die Leistung beim Bahnziehen wird gut vom Steering Law beschrieben (Accot & Zhai, 1997); dass man in der geübten Aufgabe besser wird, ist für solche Zeigeraufgaben zu erwarten, für diese Übung aber nicht untersucht. Aussagen zu Balken, Hirnhälften und sensorischer Integration sind unbelegt; Seitenunterschiede bei Zielbewegungen werden biomechanisch erklärt (Carey et al., 1996), und Hirnhälften-Koordinationsübungen gelten als Neuromythos (Dekker et al., 2012; Hyatt, 2007)."
aehnliche_uebungen: [705, 707, 706, 811, 808, 807, 702, 704, 104]
stichworte: ["Bahnsteuerung", "Steering Law", "Korridor", "Mittellinie", "Überkreuzbewegung", "Auge-Hand-Koordination", "Mauspräzision", "Zeiger ziehen", "Neuromythos", "Maus"]
---

# 810 · Diagonal-Korridor – Zeiger von Rand zu Rand durch eine schmale Bahn ziehen

> Original: „Hand-Auge-Koordination Test“ (Cross-Body Movement) – skilldrills.online, Kapitel „physical“ / „coordination“ · Blickfit-Übung: Diagonal-Korridor (`diagonal-korridor`)

## 1. Kurzbeschreibung
Eine Kugel wird mit dem Finger durch einen geraden, schmalen Gang von einer Ecke des Feldes zur gegenüberliegenden gezogen. Der Start ist als Querbalken mit Pfeil, das Ziel als Schachbrettstreifen markiert. Die Kugel sitzt etwa 6 % der kürzeren Bildschirmseite über dem Finger, damit er nichts verdeckt; der Finger setzt in einem großzügigen Kreis unter der Kugel auf und hält danach seinen Abstand. Abheben ist eine Pause, die Uhr steht dann still. Die Kugel kann den Gang nie verlassen: Berührt sie die Wand, gleitet sie am Rand entlang, ein weicher Hinweis mit ✗ erscheint, einen Rücksprung zum Start gibt es nicht. Der Gang ist auf Stufe 1 etwa 14 %, auf Stufe 12 etwa 6,3 % der kürzeren Seite breit und 55 % bis 99 % der Felddiagonale lang; die Startecke wechselt. Eine Sitzung hat fünf Durchgänge ohne Zeitdruck; ein Durchgang gilt als sauber bei höchstens einer Berührung. Erfasst werden Berührungen der Wand, Dauer pro Gang, Gleichmäßigkeit des Tempos und saubere Gänge – nur der Fingerweg gegen den Gang, nicht der Blick und nicht, ob die Hand zittert. Die Übung ist einhändig; sie ist keine Körper- oder „Hirnhälften“-Übung.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext und ausgelieferter Spielcode (Next.js-Chunks, abgerufen und formatiert 29.09.2026; nur Mechanik notiert). **[Code]** = aus dem Code, **[Text]** = nur Regeltext.

- **Spielfeld [Code]:** Canvas in Containergröße (Seitenbreite max. 1.152 px abzüglich Rand, Seitenverhältnis 16:9 → auf großen Bildschirmen ≈ 1.120 × 630 px; Vollbild möglich). Startpunkt zufällig links oder rechts, Zielpunkt auf der Gegenseite; Randabstand max(30; 140 − 80·t) px, Höhe beider Punkte unabhängig zufällig zwischen 80 px unter dem oberen und 80 px über dem unteren Rand. Die Wege sind daher meist flach schräg, selten „Ecke zu Ecke“ (mittlerer Höhenunterschied ≈ ⅓ der nutzbaren Höhe; eigene Rechnung).
- **Start [Code]:** Aktiviert wird, sobald der Zeiger näher als Knotenradius + 6 px (22 → 14 px) am Startpunkt ist. **Im selben Bild** wird bereits die Bahn geprüft – wer den Startpunkt von der Seite oder von außen „anfährt“, liegt oft schon außerhalb der ±4–10-px-Toleranz und erhält sofort einen Fehler. Diese Hürde steht nicht im Regeltext.
- **Bahn [Code]:** Fehler, wenn der Abstand des Zeigers zur Strecke Start–Ziel größer ist als max(4; 10 − 6·t) px. Die „10 → 4 px“ der Website sind also die **halbe** Breite; die sichtbare Bahn ist 20 → 8 px breit. Geprüft wird einmal pro Bild.
- **Ziel [Code]:** Treffer, sobald der Zeiger (innerhalb der Bahn) näher als Knotenradius + 6 px am Zielpunkt ist; ein Klick ist nicht nötig. Gezeichneter Knotenradius 16 → 8 px. Da der Bahntest zuerst läuft und hinter dem Zielpunkt der Abstand zum Punkt selbst zählt, ist die Zielzone entlang der Bahn effektiv nur ≈ 32 → 18 px lang (22 → 14 px davor, 10 → 4 px dahinter; eigene Ableitung aus dem Code).
- **Punkte [Code]:** je Verbindung round(10 + 30·t) × Multiplikator; Multiplikator nach Serie: ab 3 → 1,1×, 5 → 1,25×, 7 → 1,35×, 10 → 1,5×, 15 → 1,75×, 20 → 2,0×, 30 → 2,5×, **50 → 3,0×**. Fehler: Serie = 0, Multiplikator 1,0×, Bildwackeln 16 px, roter Vollbild-Blitz (480 ms, radialer Rotverlauf über das Spielfeld, abschaltbar), Strafton, neues Punktepaar; keine Punkt- oder Zeitstrafe (wie im Text). Der im Code zusätzlich vorgesehene grüne Treffer-Blitz hat im Stylesheet der Seite keine Farbdefinition (geprüft 30.09.2026) und dürfte daher unsichtbar sein; sichtbar ist nur der rote Fehler-Blitz.
- **Level [Code]:** Level = max(bisher; Punkte/250 + 1 + ⌊Serie/4⌋), stufenlos, sinkt nie. Eine fehlerfreie Person erreicht Level 15 nach ≈ 35 Verbindungen, hat dann aber erst ≈ 1.500 Punkte (eigene Simulation der Code-Formeln).
- **Dauer/Eingabe [Code]:** Countdown ≈ 2,5 s, dann 45 s. Maus mit Pointer-Lock (relative Bewegung × Empfindlichkeit), sonst absolute Zeigerposition; keine Kamera, keine Lagesensoren. Auf reinen Touch-Geräten (Touch vorhanden, aber kein „feiner Zeiger“ laut `pointer: fine`) ersetzt der gemeinsame Startbildschirm aller sechs Spiele 806–811 den Startknopf durch „Mouse Required for Pointer Lock“ – ohne Maus lässt sich das Original nicht starten (Code geprüft 30.09.2026); ob ein Tablet mit angeschlossener Maus als feiner Zeiger gilt, hängt vom Browser ab (nicht getestet). Fingerziehen würde den Zeiger ohnehin nicht fortlaufend bewegen (Literaturbasis der Gruppe, Befund F01).
- **Bildfrequenz [Code]:** Zeitmessung zeitbasiert (Zeitschritt max. 0,1 s), aber Bahn- und Zieltest nur einmal pro Bild. Ein schneller Zug über 1.000 px in 0,4 s springt bei 60 Hz ≈ 42 px pro Bild, bei 240 Hz ≈ 10 px (eigene Rechnung): Kurze Ausreißer zwischen zwei Bildern werden bei 60 Hz nicht bemerkt, dafür kann der Zeiger die entlang der Bahn effektiv nur ≈ 18 px lange Zielzone überspringen und landet „hinter“ dem Ziel außerhalb der Bahn → Fehler. Ergebnis ist damit bildratenabhängig.
- **Bewertung [Code]:** Note aus 100·√(Punkte/17.000): S+ ab ≈ 15.300, S ≈ 12.300, A ≈ 9.600, B ≈ 6.100, C ≈ 3.400 Punkte.

**Widersprüche Regeltext ↔ Code:** (1) „15 Level“ – keine Obergrenze; Randabstand und Grundpunkte ändern sich über Level 15 hinaus. (2) „Alle 250 Punkte ein Level“ – zusätzlich +1 Level je 4 Verbindungen Serie. (3) „Korridor 10 → 4 px“ ist die halbe Breite. (4) „Diagonalen in extreme Ecken“ – Höhen sind zufällig, meist flach. (5) „Knoten B verfehlen setzt Combo zurück“ (Code-Text) – es gibt kein Zeitlimit; Fehler entstehen nur durch Verlassen der Bahn. (6) Stufentabelle (Abschnitt 3) passt nicht zur Levelmechanik.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Aussagen:** Die Übung beruhe auf Ayres' (1972) sensorischer Integration und Careys (1996) Studien; das Überkreuzen der Körpermitte „aktiviere den interhemisphärischen Informationsaustausch über das Corpus Callosum“, „baue die neuronale Brücke zwischen linker und rechter Gehirnhälfte aus“ und neutralisiere die kontralaterale Verzögerung. Ayres habe „nachgewiesen“, dass Mittellinienkreuzen „für die synchrone Reifung beider Großhirnrinden unerlässlich“ sei. Dazu Fitts und Woodworth („75 % ballistisch, 25 % Bremsen mit den Fingerkuppen“), Tipps (Ellenbogen als Drehachse, Blick sofort auf B, Mauspad ≥ 45 cm, 30–45 cm/360°), Zielgruppen (Gamer, Athleten, Büroarbeitende „zur Wiederherstellung der Armmobilität“) und eine 5-Stufen-Tabelle (Top 0,1 % ab 17.000 Punkten, Level 12–15, > 92 % Genauigkeit).

**Einordnung:**
- **Einhändig, meist ohne Körpermitte:** Wer die Maus rechts führt, bewegt die **Hand** fast immer rechts vor dem Körper; nur der **Zeiger** kreuzt die Bildschirmmitte. „Bilateral“ (beidseitig) ist die Übung nicht.
- **Eigene Quelle widerspricht:** Carey et al. (1996) – von der Website mit falscher DOI, falschem Band und falschen Seiten zitiert – zeigten an 26 Rechtshändern, dass die Nachteile von Zielbewegungen auf die Gegenseite (Spitzengeschwindigkeit, Dauer, Abbremsanteil) von der **Seite der Bewegung** abhängen, nicht vom Gesichtsfeld des Ziels. Damit verwerfen sie die Erklärung über die Verarbeitung innerhalb bzw. zwischen den Hirnhälften und deuten die Unterschiede **biomechanisch**. Dass kontralaterale Armbewegungen etwas langsamer und ungenauer sind, ist belegt (Fisk & Goodale, 1985) – für Armbewegungen im Raum, nicht für Mauszüge.
- **Balken-Training ohne Spielraum und Beleg:** Die Übertragungszeit zwischen den Hirnhälften beträgt bei Gesunden nur ≈ 4–6 ms (geschätzt als Differenz gekreuzter minus ungekreuzter einfacher Reaktionen; Schulte & Müller-Oehring, 2010) und fällt bei jeder seitlichen Seh-Hand-Aufgabe an. „Koordinationsübungen verbessern die Integration der Hirnhälften“ ist ein verbreiteter Neuromythos (Zustimmung von 88 % der britischen und 82 % der niederländischen Lehrkräfte; Dekker et al., 2012); für Brain Gym® stützen Theorie und Studien die Anbieterbehauptungen nicht (Hyatt, 2007).
- **Ayres überdehnt:** Ein theoretisches Buch über Kinder mit Lernstörungen, kein „Nachweis“; die Wirksamkeitsforschung zu sensorischer Integrationstherapie ist begrenzt und nicht schlüssig (AAP, 2012). Kein Bezug zu Erwachsenen am Bildschirm.
- **Fitts passt nur für das Ende:** Das Durchfahren einer Bahn folgt dem **Steering Law** (Zeit ∝ Länge/Breite; Accot & Zhai, 1997), nicht Fitts' Logarithmus. „75/25 %“ und „Fingerkuppen-Bremse“ stehen nicht bei Woodworth (1899; vgl. Elliott et al., 2001).
- **Biomechanik-Tipp widersprüchlich:** Auch eine Drehung nur im Ellenbogen erzeugt einen Kreisbogen; eine Gerade entsteht nur durch abgestimmte Bewegung mehrerer Gelenke (geometrische Tatsache). „Armmobilität wiederherstellen“ ist ein unbelegtes Gesundheitsversprechen. „cm/360°“ ist eine Shooter-Einheit ohne Bedeutung für diesen 2D-Zeiger.
- **Stufentabelle ohne Datengrundlage und in sich unmöglich:** Die Seite sammelt nach eigener Aussage keine Nutzerdaten. Nach den Code-Formeln hat man bei Level 12–15 erst ≈ 1.000–1.500 Punkte; 17.000 Punkte erfordern ≈ 88 fehlerfreie Verbindungen in 45 s (≈ 0,5 s je Bahn von ≈ 1.000 px bei ±4 px) – „Level 12–15“ und „< 6.000 Punkte = Level 1–2“ sind so nicht erreichbar (eigene Simulation). Die Stufen entsprechen der Notenfunktion (Referenz 17.000).
- **„Misst die Geschwindigkeit der interhemisphärischen Übertragung“ (FAQ):** falsch – gemessen werden Punkte, Serie und Trefferquote; wenige Millisekunden Balkenzeit sind darin nicht auflösbar.

## 4. Optische und okulomotorische Grundlagen
- **Reizgrößen:** Gangbreite und Länge sind relativ zur Bühne angelegt. Als Umrechnung gilt: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°. Beispielrechnung: Ist die kürzere Bildschirmseite 12 cm lang, ist der Gang auf Stufe 1 etwa 1,7 cm (≈ 2,4°) und auf Stufe 12 etwa 0,76 cm (≈ 1,1°) breit. Der Weg überstreicht einen großen Teil des Bildschirms, bis zu 99 % der Felddiagonale. Start (Querbalken mit Pfeil) und Ziel (Schachbrettstreifen) unterscheiden sich durch Form, nicht durch Farbe; eine Farbsehschwäche (etwa 8 % der Männer; Birch, 2012) ist daher kein Hindernis.
- **Blickstrategie:** Beim Nachfahren einer vorgegebenen Linie sind Blick und Stiftspitze eng gekoppelt: viele kleine Sakkaden knapp vor der Spitze, dazwischen glatte Folgebewegung (Gowen & Miall, 2006). Der Blick springt Zielen zudem voraus und bleibt bis zum Bewegungsende dort (Neggers & Bekkering, 2000); darf er nicht zum Ziel, leidet die Genauigkeit (Abrams et al., 1990). Zu Beginn jedes Durchgangs ist eine große Sakkade zur neuen Startecke nötig (Latenz regulär etwa 150 ms; Fischer & Ramsperger, 1984).
- **Gleitsicht und Arbeitsplatz:** In einer simulierten Bildschirmsituation (60 cm) hatten die beiden untersuchten Gleitsichtgläser nur 13° bzw. 18° klares horizontales Sehfeld (Einstärkenglas 60°); Augen- und teils Kopfbewegungen dauerten länger, der Blick stabilisierte sich später (Han et al., 2003; 11 Personen, 45–71 Jahre). Wege über große Teile des Bildschirms und Ecken nahe dem Rand erfordern daher Kopfdrehen oder einen Wechsel des Glasbereichs. Eine Arbeitsplatz- oder Bildschirmbrille oder ein kleineres Gerät kann angenehmer sein (Beratung beim Optiker). Der Akkommodationsaufwand beträgt 1 geteilt durch den Abstand in Metern (2,5 dpt bei 40 cm). Stereosehen ist nicht nötig.
- **Trockenes Auge:** Konzentriertes Führen entlang einer Linie bei kurzer Dauer; Wiederholungen summieren Bildschirmzeit, Pausen und bewusstes Blinzeln sind sinnvoll (allgemeiner Hinweis).

## 5. Neurowissenschaftliche Grundlagen
- **Visuomotorische Steuerung:** Das Nachführen der Kugel nutzt fortlaufende visuelle Rückmeldung; unbemerkte Verschiebungen der gesehenen Handposition werden nach im Mittel etwa 160 ms korrigiert, kontinuierlich während der Bewegung (Saunders & Knill, 2003; Zeigebewegungen, nicht Bahnziehen). Das begrenzt vermutlich, wie schnell man in einem schmalen Gang ziehen kann (eigene Ableitung).
- **Zwei Phasen:** Anfangsimpuls und rückmeldungsgestützte Endphase (Woodworth, 1899; Elliott et al., 2001) gelten für den Zielanflug; der Gang verlangt dagegen über die ganze Strecke Korrekturen.
- **Hirnhälften:** Ein Ziel im linken Gesichtsfeld wird zuerst von der rechten Hirnhälfte verarbeitet, die rechte Hand von der linken gesteuert; Informationsaustausch über den Balken findet also bei jeder seitlichen Seh-Hand-Aufgabe statt, kostet bei Gesunden aber nur etwa 4–6 ms (Schulte & Müller-Oehring, 2010) und ist kein Engpass. Seitenunterschiede bei Zielbewegungen hängen von der Bewegungsseite ab und werden biomechanisch erklärt (Carey et al., 1996). Dass diese Übung die Hirnhälften „verbinde“ oder den Balken „ausbaue“, ist nicht belegt; die Annahme, Koordinationsübungen verbesserten die Zusammenarbeit der Hirnhälften, gilt als verbreiteter Neuromythos (Dekker et al., 2012; Hyatt, 2007).
- Okzipital-, Parietal- und Motorkortex sind an jeder visuell geführten Handbewegung beteiligt; dass die Übung sie trainiert, ist nicht gezeigt.

## 6. Motorische Grundlagen
- **Steering Law:** Die Zeit für das Durchfahren eines Gangs folgt MT = a + b·(A/W) mit Länge A und Breite W; r² = 0,968 (Stift auf Tablett, 13 Personen), und die Geschwindigkeit steigt linear mit der Gangbreite (Accot & Zhai, 1997). Von Stufe 1 bis Stufe 12 wächst A/W etwa um das Vierfache (Länge 55 → 99 % der Diagonale, Breite 14 → 6,3 % der kürzeren Seite: Faktor 1,8 · 2,2 ≈ 4; eigene Rechnung): Bei gleicher Sorgfalt dauert ein Gang auf der höchsten Stufe etwa viermal so lange. Tempo bringt keine Punkte; Dauer und Gleichmäßigkeit werden nur mitgeschrieben.
- **Zielanflug (Fitts):** Das Fitts'sche Gesetz (Fitts, 1954) beschreibt den Zielanflug auf ruhende Ziele, nicht das Durchfahren eines Gangs, für das das Steering Law gilt.
- **Gerade Linien:** Gerade Linien über den Bildschirm entstehen aus abgestimmter Bewegung mehrerer Gelenke; eine Drehung nur im Ellenbogen erzeugt einen Kreisbogen (geometrische Tatsache). Das begünstigt Wandberührungen bei langen, schrägen Wegen.
- **Ruhige Hand und Tremor:** Physiologischer Tremor liegt um etwa 10 Hz, Parkinson-Tremor bei 3–6 Hz (McAuley & Marsden, 2000), und wirkt in einem schmalen Gang unmittelbar als Wandberührung. Essentieller Tremor betrifft ab 65 Jahren etwa 4,6 % (Louis & Ferreira, 2010).
- **Eingabegerät:** In Bahnaufgaben schnitten Grafiktablett (Stift) und Maus am besten ab, Trackpoint mittel, Touchpad und Trackball am schlechtesten; das Steering Law galt für alle fünf Geräte (Accot & Zhai, 1999). Ergebnisse mit Finger, Stift oder Maus sind daher nicht ohne Weiteres vergleichbar.
- **Belastung:** Lange Wege über den ganzen Bildschirm; die Dauer der Zeigearbeit hängt mit Hand-Arm-Beschwerden zusammen (mäßige Evidenz; IJmker et al., 2007).

## 7. Einflussfaktoren und Messgrenzen
- **Gerät:** Bildschirmgröße und Abstand bestimmen Weglänge und Sehwinkel; Gangbreite und Länge sind relativ zur Bühne angelegt, die physische Größe schwankt also zwischen Geräten. Finger, Stift und Maus verändern die Aufgabe (Accot & Zhai, 1999). Nur Vergleiche mit sich selbst auf demselben Gerät sind sinnvoll.
- **Zufall:** Die Startecke wechselt; Wege in verschiedenen Richtungen sind unterschiedlich bequem für die Hand.
- **Messgrößen:** Berührungen, Dauer und Gleichmäßigkeit (Variation des Tempos, alle 0,25 s erfasst) streuen von Gang zu Gang. Messungen am Menschen streuen allgemein; aussagekräftiger als ein Einzelwert ist der Verlauf über mehrere Gänge und Sitzungen (Median) (vgl. Mountford et al., 2004, S. 17–18).
- **Alter:** Ältere haben mehr Schwierigkeiten bei Mausaufgaben (Smith et al., 1999); die einfache Reaktionszeit wird mit dem Alter vor allem motorisch langsamer (+0,55 ms je Jahr; Woods et al., 2015). Die Stufe passt sich an.
- **Übung und Zuverlässigkeit:** Lerneffekte in den ersten Durchgängen sind zu erwarten (allgemeine Übungskurven; Heathcote et al., 2000), für diese Übung aber nicht gemessen; die Zuverlässigkeit der Messwerte ist nicht untersucht.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt (mittel):** Das Steering Law beschreibt die Leistung bei Bahnaufgaben robust und geräteübergreifend (Accot & Zhai, 1997, 1999); dass man in der geübten Aufgabe mit Übung schneller und genauer wird, ist für motorische Zeigeraufgaben zu erwarten, wird in diesen Arbeiten aber nicht als Lernverlauf untersucht; allgemein steigen Übungskurven motorischer und kognitiver Aufgaben verlässlich (Heathcote et al., 2000). Für diese Übung gibt es keine Studie.
- **Naher Transfer (schwach):** auf ähnliche Zieh- und Nachfahraufgaben (z. B. 706, 707) plausibel, aber ungeprüft.
- **Alltagstransfer (fehlend):** Hirntrainingsprogramme verbessern vor allem die geübten Aufgaben (Simons et al., 2016). Für Sport, Armmobilität oder die Zusammenarbeit der Hirnhälften gibt es keinen Beleg; Brain-Gym-artige Überkreuzversprechen sind nicht gestützt (Hyatt, 2007), sensorische Integrationstherapie ist schwach belegt (American Academy of Pediatrics, 2012).

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** präzises, weites Führen des Fingers entlang einer Linie geübt werden soll; eine kurze Übung ohne Zeitlimit je Durchgang gewünscht ist; Genauigkeit wichtiger ist als Tempo.
- **Weniger passend, wenn …** Hirnhälften-, Überkreuz- oder Körperkoordination versprochen werden soll (unbelegt, einhändig); Gleichgewicht oder Ganzkörperbewegung das Ziel ist; das Sehen im Bildschirmabstand eingeschränkt ist.
- **Vorsicht / anpassen bei …**
  - `tremor_parkinson`: Der Gang ist auf hohen Stufen schmal; Zittern führt zu Wandberührungen und kann frustrieren. Die Übung misst kein Zittern; Zittern gehört zu den Symptomen, die ärztlich abgeklärt werden sollten (Muchnick, 2008, S. 28).
  - `hand_arm_beschwerden`: lange Wege über den ganzen Bildschirm; Pausen einplanen.
  - `presbyopie_gleitsicht`: Wege über große Teile des Bildschirms, Ecken nahe den Rändern; kleineres Gerät oder größerer Abstand, Arbeitsplatzbrille erwägen.
  - `sehbehinderung_niedriger_visus`: Der Gang ist auf der höchsten Stufe schmal (im Beispiel oben etwa 1° breit); Gerät näher heranholen oder niedrigere Stufen wählen.
  - `gesichtsfeldausfall`: Der Weg beginnt in wechselnden Ecken; bei halbseitigem Ausfall werden Start oder Ziel auf der betroffenen Seite leicht übersehen. Gesichtsfeldausfälle lassen sich nach dem Verlauf der Sehbahn zuordnen und gehören augenärztlich abgeklärt (Muchnick, 2008); die Übung ist kein Test.
  - `farbsehschwaeche`: Start und Ziel unterscheiden sich durch Form (Pfeil, Schachbrett), nicht nur durch Farbe.
  - `migraene_lichtempfindlich`, `photosensitive_epilepsie`: Die Übung kommt ohne Flächenblitz, ohne Rot und ohne Wackeln aus; Wandberührungen werden mit einem weichen ✗ angezeigt. Grundsätzlich gelten mehr als 3 Blitze pro Sekunde und gesättigtes Rot als Risikomerkmale (Harding et al., 2005).
  - Treten beim Üben Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung, Schwindel oder Zittern auf, sollte das ärztlich abgeklärt werden, statt weiterzuüben (Muchnick, 2008, S. 6, 28).
- **Kombiniert gut mit …** 707 (Pfad folgen), 706 (Ziehen), 702/704 (Zielen), 705 (Heißer Draht – nächstverwandte Korridoraufgabe: ebenfalls von Start zu Ziel ohne Bahnverlassen, dort Zickzacklinie mit Rücksetzen an den Start), 811 (Pfad aus dem Gedächtnis), 807 (Zickzack im Takt), 405 (Zickzack-Blickfolge ohne Hand). **Abgrenzung in der Gruppe 806–811:** keine Dublette; 808 fordert ebenfalls feine fortlaufende Steuerung, hält die Marke aber an einem Ort gegen Störungen; 811 zieht einen Pfad aus dem Gedächtnis mit großzügiger, unsichtbarer Toleranz. Keine Diagnosen, keine Heil- oder Leistungsversprechen; Ergebnisse sind keine Normwerte.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Touch:** Original auf dem Tablet nicht steuerbar. Blickfit: Finger oder Stift ziehen lassen (Stift ist für Bahnaufgaben besonders geeignet; Accot & Zhai, 1999); Bahn breiter (≥ 0,5°, bei 40 cm ≈ 18 CSS-px) und Fingerversatz bzw. Lupe, damit der Finger die Bahn nicht verdeckt.
- **Messqualität:** Bahnbreite und -länge in Sehwinkel festlegen; Bahntest als Strecke zwischen zwei Messpunkten (bildratenunabhängig), Zielzone ebenso; Messwert „Zeit je Bahn bei Breite W“ oder Steering-Durchsatz statt Serienpunkten; feste Anzahl Bahnen statt 45-s-Rennen.
- **Fairness:** Startpunkt aus jeder Richtung aktivierbar (Bahnprüfung erst nach Verlassen des Startkreises); adaptives Level, das nach Fehlern wieder sinkt; Höhenunterschiede kontrolliert statt zufällig.
- **Gleitsicht/Alter:** wählbare Weglänge (z. B. ≤ 15° für Gleitsicht), Bahnen auch vertikal oder im mittleren Bildschirmbereich; Hinweis auf Kopfbewegung.
- **Sicherheit und Farbe:** kein Flächenblitz, kein Wackeln; Start und Ziel zusätzlich durch Form (Ring/Kreuz) und Beschriftung unterscheiden.
- **Ehrliche Texte:** „Übt präzises Ziehen des Zeigers über den ganzen Bildschirm. Aussagen über Hirnhälften oder den Balken sind wissenschaftlich nicht gedeckt.“ Keine Mobilitäts- oder Therapieversprechen. Eine echte Überkreuz-Körperübung wäre eine andere Übung mit eigenen Sicherheitshinweisen.

## 11. Quellen
### Von der Website angegeben
- Ayres, A. J. (1972). *Sensory integration and learning disorders*. Western Psychological Services. ISBN 0-87424-303-3 – **Prüfung:** Buch, keine DOI (korrekt ohne DOI angegeben; Open Library); Inhalt nicht eingesehen; **stützt die Aussage der Website:** nein (Theorie für Kinder mit Lernstörungen, kein Nachweis einer „synchronen Reifung beider Großhirnrinden“; Wirksamkeit von SI-Therapie begrenzt, AAP, 2012).
- Carey, D. P., Hargreaves, E. L., & Goodale, M. A. (1996). Reaching to ipsilateral or contralateral targets: Within-hemisphere visuomotor processing cannot explain hemispatial differences in motor control. *Experimental Brain Research, 112*(3), 496–504. https://doi.org/10.1007/BF00227955 – **Prüfung:** DOI falsch (Website: 10.1007/BF00228557 = Desmurget et al., 1996; auch Band 110(2), Seiten 267–286 und Untertitel falsch; richtig wie hier, Crossref ✓); **stützt die Aussage der Website:** teilweise/widerspricht (kontralaterale Nachteile ja, aber biomechanisch statt interhemisphärisch – gegen die Balken-These).
- Černáček, J. (1961). Contralateral motor irradiation—cerebral dominance: Its changes in hemiparesis. *Archives of Neurology, 4*(2), 165–172. https://doi.org/10.1001/archneur.1961.00450080047005 – **Prüfung:** DOI stimmt ✓ (PubMed 13691977, kein Abstract); **stützt die Aussage der Website:** nein (Mitbewegungen der Gegenseite bei Halbseitenlähmung; kein Bezug zu Training oder Mittellinienkreuzen, im Text nicht verwendet).
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (gilt für den Zielanflug; das Bahnziehen folgt dem Steering Law).
- Woodworth, R. S. (1899). The accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3), i–114. https://doi.org/10.1037/h0092992 – **Prüfung:** DOI stimmt ✓ (Crossref-Titel ohne „The“); **stützt die Aussage der Website:** teilweise (Zwei-Komponenten-Modell ja; „75/25 %“, „Fingerkuppen-Bremse“ nein).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓ (131 = Artikelnummer); **stützt die Aussage der Website:** teilweise (Hardwareverzögerungen ja; keine Normen, „< 5 ms Rauschen“ nicht aus der Quelle).

### Weitere Fachliteratur
- Abrams, R. A., Meyer, D. E., & Kornblum, S. (1990). Eye-hand coordination: Oculomotor control in rapid aimed limb movements. *Journal of Experimental Psychology: Human Perception and Performance, 16*(2), 248–267. https://doi.org/10.1037/0096-1523.16.2.248 – Blick zum Ziel verbessert Genauigkeit
- Accot, J., & Zhai, S. (1997). Beyond Fitts' law: Models for trajectory-based HCI tasks. In *Proceedings of CHI '97* (S. 295–302). ACM. https://doi.org/10.1145/258549.258760 – Steering Law
- Accot, J., & Zhai, S. (1999). Performance evaluation of input devices in trajectory-based tasks: An application of the steering law. In *Proceedings of CHI '99* (S. 466–472). ACM. https://doi.org/10.1145/302979.303133 – Geräte im Vergleich (CR ✓; Ergebnis über Verlags-/IBM-Zusammenfassung, Volltext nicht eingesehen)
- American Academy of Pediatrics, Section on Complementary and Integrative Medicine & Council on Children with Disabilities (Zimmer, M., Desch, L., et al.). (2012). Sensory integration therapies for children with developmental and behavioral disorders. *Pediatrics, 129*(6), 1186–1189. https://doi.org/10.1542/peds.2012-0876 – Evidenz SI-Therapie
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Farbsehschwäche
- Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction, 23*(3), 215–250. https://doi.org/10.1080/07370020802278163 – Mausübersetzung
- Dekker, S., Lee, N. C., Howard-Jones, P., & Jolles, J. (2012). Neuromyths in education: Prevalence and predictors of misconceptions among teachers. *Frontiers in Psychology, 3*, 429. https://doi.org/10.3389/fpsyg.2012.00429 – Neuromythos Hirnhälften-Integration
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin, 127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – Zwei-Komponenten-Modell
- Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. *Experimental Brain Research, 57*(1), 191–195. https://doi.org/10.1007/BF00231145 – Sakkadenlatenz
- Fisk, J. D., & Goodale, M. A. (1985). The organization of eye and limb movements during unrestricted reaching to targets in contralateral and ipsilateral visual space. *Experimental Brain Research, 60*(1), 159–178. https://doi.org/10.1007/BF00237028 – kontralaterale Armbewegungen
- Gowen, E., & Miall, R. C. (2006). Eye–hand interactions in tracing and drawing tasks. *Human Movement Science, 25*(4–5), 568–585. https://doi.org/10.1016/j.humov.2006.06.005 – Blick beim Nachfahren (CR ✓, Abstract PubMed 16891021)
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x – Blitz-Grenzwerte
- Heathcote, A., Brown, S., & Mewhort, D. J. K. (2000). The power law repealed: The case for an exponential law of practice. *Psychonomic Bulletin & Review, 7*(2), 185–207. https://doi.org/10.3758/BF03212979 – Übungskurven (CR ✓)
- Hyatt, K. J. (2007). Brain Gym®: Building stronger brains or wishful thinking? *Remedial and Special Education, 28*(2), 117–124. https://doi.org/10.1177/07419325070280020201 – Überkreuzübungen ohne Beleg
- IJmker, S., Huysmans, M. A., Blatter, B. M., van der Beek, A. J., van Mechelen, W., & Bongers, P. M. (2007). Should office workers spend fewer hours at their computer? A systematic review of the literature. *Occupational and Environmental Medicine, 64*(4), 211–222. https://doi.org/10.1136/oem.2006.026468 – Mausnutzung und Beschwerden
- Louis, E. D., & Ferreira, J. J. (2010). How common is the most common adult movement disorder? Update on the worldwide prevalence of essential tremor. *Movement Disorders, 25*(5), 534–541. https://doi.org/10.1002/mds.22838 – Tremor-Häufigkeit
- McAuley, J. H., & Marsden, C. D. (2000). Physiological and pathological tremors and rhythmic central motor control. *Brain, 123*(8), 1545–1567. https://doi.org/10.1093/brain/123.8.1545 – Tremorfrequenzen
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blick-Hand-Kopplung
- Saunders, J. A., & Knill, D. C. (2003). Humans use continuous visual feedback from the hand to control fast reaching movements. *Experimental Brain Research, 152*(3), 341–352. https://doi.org/10.1007/s00221-003-1525-2 – Korrekturlatenz ≈ 160 ms
- Schulte, T., & Müller-Oehring, E. M. (2010). Contribution of callosal connections to the interhemispheric integration of visuomotor and cognitive processes. *Neuropsychology Review, 20*(2), 174–190. https://doi.org/10.1007/s11065-010-9130-1 – Übertragungszeit zwischen den Hirnhälften
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer
- Smith, M. W., Sharit, J., & Czaja, S. J. (1999). Aging, motor control, and the performance of computer mouse tasks. *Human Factors, 41*(3), 389–396. https://doi.org/10.1518/001872099779611102 – Alter und Maus
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Lehrbuch: Warnzeichen mit Abklärungsbedarf, darunter Zittern (S. 6, 28); Gesichtsfeldausfälle nach Sehbahnverlauf (S. 32)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Lehrbuch: Genauigkeit und Wiederholbarkeit von Messungen, Messungen am Menschen streuen (S. 17–18, 24)
