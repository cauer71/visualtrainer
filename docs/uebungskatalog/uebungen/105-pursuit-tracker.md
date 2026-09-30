---
# ===== Kennung =====
nr: 105
kennung: pursuit-tracker
name: "Glatte Blickfolge (Ball mit dem Zeiger verfolgen)"
name_original: "Glatte Blickfolge | Zielverfolgung – Pursuit Tracker Pro"
kapitel: "Visuelle Wahrnehmung"
kapitel_original: "visual"
unterkapitel_original: "tracking-accuracy"
quelle_url: "https://skilldrills.online/de/drills/visual/tracking-accuracy/pursuit-tracker"
blickfit_umsetzung: {kennung: "scharf-in-bewegung", name: "Scharf in Bewegung", unterschiede: "Kein Zeiger: Man folgt dem Ball nur mit den Augen und erkennt darin ein kurz gezeigtes Landolt-C (4 Richtungen, Strich = Lücke = 1/5 des Durchmessers), Antwort per großem Button oder Pfeiltaste. Damit wird die Augenfolge erzwungen statt nur behauptet und ist am Ergebnis ablesbar (dynamische Sehschärfe). 20 Durchgänge mit adaptiver Treppe (3 richtig runter, 1 Fehler rauf, Stufe 1 bis 20) statt 45 s Punktesammeln; Tempo 12 bis ca. 122 Einheiten/s (Einheit = 1 % der kürzeren Bildschirmseite, ca. 3 bis 35 °/s auf dem Tablet bei 40 cm), Anzeigedauer des C 500 bis 220 ms. Weiche, unvorhersehbare Bahn (Winkelgeschwindigkeit als Produkt zweier langsamer Schwingungen, sanftes Wegsteuern vom Rand) mit Zeitschritt gerechnet, also auf 60 und 120 Hz gleich schnell. Kein Wettlauf gegen die Zeit, keine Zeitstrafe, Tablet und Touch als Hauptgerät."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein orangefarbener Ball schwebt in unvorhersehbaren Kurven über den Bildschirm. Man hält Mauszeiger oder Finger möglichst dauerhaft auf dem Ball; je länger der Kontakt am Stück, desto mehr Punkte. Nebenbei sollen die Augen dem Ball folgen."
ziel_funktionen: [kontinuierliche_steuerung, auge_hand_koordination]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Kein Levelsystem, sondern Kopplung an Punkte und Serie: Ball-Höchsttempo = 6 + 0,1 × Punkte + 0,5 × Serie (px pro Bild), Ballradius = max(9, 18 − 0,04 × Punkte) px. Wer gut ist, bekommt automatisch einen schnelleren, kleineren Ball."
messgroessen: ["Punkte (+5 je 60 Kontaktbilder am Stück)", "Serie (Streak)", "Genauigkeit in % (Kontaktbilder / alle Bilder)", "Note S+ bis F (Wurzelskala, Referenz 180 Punkte)", "Bestwert lokal", "sinnvoll ergänzt: Abstand Zeiger–Ball (Mittel/Streuung), Zeitverzug (Lag) zwischen Zeiger und Ball, Zielgeschwindigkeit in °/s, Bildwiederholrate"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 2
    sakkaden: 1
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 0
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
    antizipation: 2
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
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
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus mit ruhiger, glatter Unterlage (Zeigerbeschleunigung aus) oder Touchscreen", "Gut korrigierte Sicht auf Bildschirmabstand (bei Alterssichtigkeit Nah- bzw. Arbeitsplatzbrille)", "Ausreichend Bildschirmhelligkeit; Farbsehen nicht nötig (Farbwechsel orange/grün ist nur zusätzlicher Hinweis)", "Bildschirmrate bekannt (60 Hz empfohlen, weil das Tempo im Original an die Bildrate gekoppelt ist)"]
vorsicht_bei: [tremor_parkinson, hand_arm_beschwerden, nystagmus, trockenes_auge_bildschirm, presbyopie_gleitsicht, kopfschmerz_asthenopie]
geeignet_fuer: ["Hand-Auge-Nachführen eines gleichmäßig bewegten Ziels üben (manuelles Tracking)", "Mausführung (Unterarm/Handgelenk, ruhig statt ruckartig) trainieren", "Vorausschauendes statt hinterherlaufendes Zeigen erleben", "Kurze, spielerische Aufwärmübung ohne Zeitstrafe"]
weniger_geeignet_fuer: ["Gezieltes Üben der reinen Augenfolge ohne Hand (Augenbewegung wird nicht gemessen)", "Tablet ohne Anpassung (Finger verdeckt den Ball und muss ununterbrochen aufliegen)", "Menschen mit Handzittern oder Beschwerden im Arm", "Geräte mit 120–240 Hz, wenn Vergleichbarkeit gewünscht ist (Tempo steigt proportional zur Bildrate)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Manuelles Nachführen und Pursuit sind kurzzeitig lernbar (Eibenberger et al., 2012: 2 × 6 min an 3 Tagen, n = 10 + 10; McHugh & Bahill 1985, Sekundärangabe in docs/wissenschaft/02), aber die Übung misst die Hand, nicht das Auge; Belege für Übertragung auf Sport, Lesen oder Bildschirmkomfort fehlen (Guo et al., 2025; Simons et al., 2016)."
aehnliche_uebungen: [104, 106, 305, 401, 402, 403, 404, 407, 505, 707]
stichworte: ["smooth pursuit", "Blickfolge", "manuelles Tracking", "Zeigerverfolgung", "Auge-Hand", "Time on Target", "Aufholsakkaden", "dynamische Sehschärfe (Blickfit)"]
---

# 105 · Glatte Blickfolge (Ball mit dem Zeiger verfolgen)

> Original: „Glatte Blickfolge | Zielverfolgung“ (Pursuit Tracker Pro) – skilldrills.online, Kapitel „Visuelle Wahrnehmung“ (visual) · Blickfit: „Scharf in Bewegung“ (umgesetzt, aber andere Aufgabe, s. Abschnitt 10)

## 1. Kurzbeschreibung
Ein orangefarbener Ball schwebt 45 Sekunden lang in weichen, aber zufälligen Kurven über einen dunklen Bildschirm. Man hält den Mauszeiger (oder den Finger) auf dem Ball und versucht, ihn nie zu verlieren. Für jede volle Sekunde ununterbrochenen Kontakts gibt es 5 Punkte; wer gut ist, bekommt einen schnelleren und kleineren Ball. Die Website nennt das „Training der glatten Blickfolge“. Tatsächlich wird aber die **Handbewegung** gemessen (der Zeiger folgt dem Ball). Die Augen müssen dem Ball folgen, damit das gelingt, ihr Verhalten wird jedoch nicht erfasst.

## 2. Ablauf im Original (Analyse)
Quelle der Zahlen: Code-Analyse in `docs/skilldrills-analyse.md` (Abschnitt 5, aus dem ausgelieferten Spielcode); Regeltext und Website-Texte aus der Seite. Ableitungen in °/s sind **eigene Rechnungen** (≈ 36–40 px pro Grad, s. Abschnitt 4).
- **Ablauf:** Start-Knopf, Countdown, 45 s Spielzeit, Ergebnis mit Genauigkeit und Note. Kein Zeitbonus, keine Zeitstrafe.
- **Ball:** Start in der Bildmitte mit 6 px pro Bild (bei 60 Hz ≈ 360 px/s ≈ 9–10 °/s), Richtung zufällig. Radius = max(9, 18 − 0,04 × Punkte) px, also 18 px zu Beginn und bei 100 Punkten 14 px.
- **Bahn:** Mit 5 % Wahrscheinlichkeit **pro Bild** (bei 60 Hz ≈ 3 Mal pro Sekunde) erhalten beide Geschwindigkeitskomponenten einen Zufallsstoß zwischen −5 und +5 px/Bild. Danach wird das Tempo auf ein Höchsttempo gekappt: 6 + 0,1 × Punkte + 0,5 × Serie px/Bild. Am Rand wird gespiegelt. Es gibt **kein Mindesttempo**, der Ball kann also fast stehen bleiben und wieder losziehen. Die Bahn ist ein Zufallsspaziergang, nicht vorhersagbar; die Tipp-Empfehlung „Antizipiere die nächste Richtung“ ist damit nur begrenzt umsetzbar (man kann nur Tempo und Richtung extrapolieren).
- **Beispiel Tempo:** Bei 50 Punkten und Serie 10 liegt die Kappung bei 16 px/Bild ≈ 960 px/s ≈ 24–27 °/s bei 60 Hz.
- **Kontakt:** Abstand Zeiger–Ballmitte < Radius + 35 px (Kontaktzone ≈ 98 px Durchmesser ≈ 2,5–2,7°). Grüne Ballfarbe bei Kontakt, sonst orange; Fortschrittsbogen um den Ball.
- **Punkte:** 60 Kontaktbilder am Stück → +5 Punkte, Serie +1. 120 Bilder ohne Kontakt → „Lost Link“: Serie = 0, kein Punkt- oder Zeitabzug. Maximal möglich ≈ 45 × 5 = 225 Punkte.
- **Note:** `pct = min(100, 100·√(Punkte/180))`; S+ ab ≈ 163 Punkten (33 Pulse), D ab 16 Punkten, darunter F (Rechnung aus der Formel). **Genauigkeit** = Kontaktbilder / alle Bilder.
- **Eingabe:** Maus, Touch (Finger muss aufliegen, beim Loslassen verschwindet der Zeiger). Speicherung nur lokal (localStorage).
- **Bildfrequenzabhängig:** Bewegung, Kicks und Schwellen (60/120 Bilder) sind **pro Bild** gerechnet, nicht pro Sekunde. Bei 144 Hz laufen Ball und Kicks 2,4-mal so schnell (≈ 22–24 °/s Starttempo, 7 Kicks/s), „+5 Punkte pro Sekunde“ wird zu +5 pro 0,42 s, und „Lost Tracking > 2 s“ wird zu 0,83 s.
- **Widersprüche Regeltext ↔ Code:** (1) „+5 PTS/s“ und „> 2 s“ stimmen nur bei 60 Hz. (2) Der Text verspricht Messung von „mittlerer Bahnabweichung“, „Latenz bei Richtungswechseln“ und „Sakkaden-Unterdrückung“ (Tabelle); im Code gibt es nur Kontaktbilder und Punkte. (3) „Halte das Fadenkreuz 45 Sekunden lang ununterbrochen im Zielbereich“ (Anleitung) widerspricht der Wertung, die Aussetzer bis 2 s ohne Abzug toleriert.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Aussagen der Website:** Glatte Blickfolge (Smooth Pursuit) folge stufenlos einem bewegten Ziel, im Gegensatz zu Sakkaden. Sie sei bis „etwa 30 °/s“ genau, danach seien Aufholsakkaden nötig. Antrieb sei der Netzhautschlupf; beteiligt seien V1, MT/MST, frontales Augenfeld (FEF), Brückenkerne und Kleinhirn; Latenz 100–130 ms, Vorhersage über Kleinhirn-Modelle. Zielgruppen: FPS-Spieler, Ballsportler, alle mit „visueller Feinmotorik“. Leistungstabelle mit fünf Stufen (Top 1 % bis Untrainiert: Time on Target ≥ 88 % bis < 48 %, „Sakkaden-Unterdrückung“ bis ≥ 95 %). Versprochen werden bessere Fähigkeiten in Shootern und Sport, besseres Lesen, längere Aufmerksamkeit und „spürbar weniger digitale Augenüberlastung“; 3–5 Durchgänge pro Tag, Palming zur Entspannung.

**Einordnung:**
- **Grundphysiologie überwiegend richtig:** Netzhautschlupf treibt die Folgebewegung, Latenz ≈ 100 ms (Carl & Gellman, 1987), Aufholsakkaden bei zu großem Positionsfehler (de Brouwer et al., 2002), Netzwerk aus Kortex, Pons, Kleinhirn (Thier & Ilg, 2005; Krauzlis, 2004). Der Zusatz, Sakkaden hätten „eigenständige“ Schaltkreise, wird von Krauzlis relativiert: Beide Systeme teilen sich viele Strukturen.
- **„Genau bis 30 °/s“ ist eine grobe Vereinfachung:** Der Gain (Auge/Ziel) liegt immer unter 1 und sinkt mit dem Tempo (Collewijn & Tamminga, 1984). Individuell bleibt er weit über 30 °/s hoch (≈ 0,9 bis 100 °/s bei 4 von 5 Personen; Meyer et al., 1985). Das **Originaltempo liegt dagegen nur bei ≈ 9–27 °/s** und ist damit für die Augen meist gut machbar.
- **Wichtigste Einschränkung:** Gemessen wird der **Zeiger**, nicht der Blick. Man kann den Ball zum Teil mit dem Zeiger jagen, während die Augen springen; die Tabellenspalten „Sakkaden-Unterdrückung“ und „Tracking-Präzision“ gibt es im Code nicht. Eine Zuordnung zur „Blickfolge“ ist Annahme, nicht Messung.
- **Leistungsstufen („Top 1 %/5 %/25 %/50 %“): keine Datengrundlage.** Die Seite sagt selbst, sie sammle keine Leistungsdaten; die zitierten Arbeiten enthalten keine solchen Normen. Zudem hängt das Ergebnis von Bildrate, Maus und Unterlage ab.
- **Transfer- und Gesundheitsversprechen nicht belegt:** „stärkt die Plastizität im FEF“, „erleichtert Lesen“, „verringert Asthenopie“, „Profisportler haben außergewöhnlichen Gain“ (kein Beleg auf der Seite). Wirksamkeit von Maßnahmen gegen Computer Vision Syndrome ist unbewiesen (Rosenfield, 2011); Transfer digitaler Übungen bleibt meist auf ähnliche Aufgaben beschränkt (Guo et al., 2025).
- **Weitere Punkte ohne Beleg:** Mausempfehlung (800 DPI, 30–45 cm pro 360°), „sechs Augenmuskeln erbringen Höchstleistung“, Palming, „Formel-1-Piloten“. Die Zitate zu Lisberger (2010) und Woods et al. (2015) stützen die genannten Aussagen nicht (s. Abschnitt 11).

## 4. Optische und okulomotorische Grundlagen
- **Glatte Folgebewegung:** hält das Bild eines langsam bewegten Ziels auf der Fovea. Latenz ≈ 100 ± 5 ms bei Zielen ≥ 5 °/s; die Beschleunigung sättigt bei ≈ 50 °/s² (Carl & Gellman, 1987). Stationärer Gain ≈ 0,95 bei 5–30 °/s (Robinson et al., 1986). Der Gain sinkt mit Tempo (−10 % horizontal, −20 % vertikal bei strukturiertem Hintergrund; Collewijn & Tamminga, 1984).
- **Unvorhersehbarkeit kostet Gain:** Bei pseudo-zufälligen Bahnen fiel der Gain von 0,92 auf 0,53, als die schnellste Frequenzkomponente von 0,39 auf 1,56 Hz stieg (Barnes et al., 1987). Die zufälligen Kicks des Originals (≈ 3/s) sind also für die Augen eine eher schwere Bahn; Vorhersage über extraretinale Signale (Barnes, 2008) hilft nur teilweise.
- **Aufholsakkaden:** Sie werden ausgelöst, wenn die vorhergesagte Zeit bis zum Verfehlen des Ziels (Eye crossing time) unter ≈ 40 ms liegt; bei 40–180 ms reicht rein glatte Verfolgung (de Brouwer et al., 2002). Ihre Dauer ist amplitudenabhängig (≈ 2,7 ms pro Grad; Baloh et al., 1975, Basis-Fakt in der Literaturbasis W01).
- **Sehwinkel (eigene Rechnung):** iPad 40 cm ≈ 36 px/°, Desktop 60 cm bei 96 ppi ≈ 40 px/° (docs/wissenschaft/02, Abschn. 4). Ball Ø 36 px ≈ 0,9–1,0° (Start), Kontaktzone ≈ 2,5–2,7°. 1 °/s ≈ 7 mm/s bei 40 cm.
- **Bildschirm:** Auf Sample-and-hold-Displays verschmiert jedes Bild um v/f (Grad); bei 10 °/s und 60 Hz ≈ 10 Bogenminuten. Für diese Übung unkritisch (großer Ball, kein Detail), aber bei schnellem Ball wirkt das Bild unscharf.
- **Brille und Alter:** Gleitsicht: Der Ball rast durchs Feld, dabei wandert der Blick durch Bereiche mit seitlicher Unschärfe; Neu-Träger nutzen mehr Kopf- statt Augenbewegungen (Hutchings et al., 2007). Für Bildschirmabstand ist eine Arbeitsplatzbrille besser. Ältere haben geringeren Pursuit-Gain bei allen Tempi (75–93 vs. 18–43 J.; Moschner & Baloh, 1994); Helligkeit hilft (Long & Crambert, 1990). Starres Bildschirmschauen senkt die Lidschlagrate ≈ 5-fach (Patel et al., 1991) – trockenes Auge möglich.

## 5. Neurowissenschaftliche Grundlagen
Bewegungssignale aus V1 werden in MT/MST (mittlere Schläfen-/mediale obere Schläfenregion) nach Richtung und Tempo ausgewertet und über das frontale Augenfeld (FEF), Brückenkerne und Kleinhirn (Flocculus/Paraflocculus, posteriorer Vermis) zu den Augenmuskelkernen geleitet; beteiligt sind auch Basalganglien und der Colliculus superior (Thier & Ilg, 2005; Krauzlis, 2004; Lisberger, 2010). Aufmerksamkeit erhöht den Gain für das gewählte Ziel, Vorhersage nutzt Efferenzkopie und Gedächtnis für die Geschwindigkeit (Barnes, 2008). Die **Handsteuerung** kommt dazu: Sensomotorischer Kortex, Parietalkortex und Kleinhirn koordinieren Auge und Hand. Welche dieser Strukturen die Übung „trainiert“, ist nicht untersucht; Aussagen wie „stärkt FEF-Plastizität“ sind unbelegt. Die Übung ist ein Verhaltenstest, keine Hirnmessung.

## 6. Motorische Grundlagen
- **Manuelles Tracking ist intermittierend, nicht stetig:** Korrekturen starten erst bei einer Fehler-Totzone (≈ 0,8°) und mit Mindestabstand ≈ 170 ms (Miall et al., 1993). Daraus folgt das „Ruckeln“ auch geübter Personen; die Anweisung „gleite stets“ ist nur eine Faustregel.
- **Kontinuierliche Steuerung (Cursor auf Ziel):** Latenz von Auge zu Hand kommt zur Sehlatenz; der Zeiger läuft dem Ball in der Regel etwas hinterher, weil der Ball nicht vorhersehbar ist. Mit Augenfolge sind Interzeptions- und Nachführfehler kleiner (de la Malla et al., 2017).
- **Ruhige Hand:** Physiologischer Tremor ≈ 8–12 Hz (McAuley & Marsden, 2000); bei der großen Kontaktzone kaum begrenzend. Bei Parkinson ist der Tremor langsamer (3–6 Hz) und stört mehr.
- **Eingabe:** Maus (Ellenbogen für große, Handgelenk für kleine Bewegungen) oder Touch. Am Touchscreen **verdeckt der Finger das Ziel** und drückt dauerhaft; das ist für Auge-Hand-Übung unnatürlich und ermüdet. Zielgrößen für Touch: ≥ 9 mm (Parhi et al., 2006, s. Blickfit-Empfehlung).

## 7. Einflussfaktoren und Messgrenzen
- **Bildrate:** Alles pro Bild gerechnet: 120/144/240 Hz machen den Ball 2–4-mal schneller. Vergleiche zwischen Geräten sind nicht sinnvoll; Ergebnisse immer mit Bildrate speichern.
- **Zufall:** Bahn ist zufällig; Ergebnis einer 45-s-Runde streut stark. Die Rückkopplung von Punkten auf Tempo und Ballgröße macht die Punktzahl schwer vergleichbar (guter Lauf → schwerere Bahn).
- **Zeiger ≠ Auge:** Das Ergebnis sagt nichts darüber, wie gut die Augenfolge ist. Zwei Personen mit gleichem Ergebnis können ganz unterschiedlich blicken.
- **Latenz und Maus:** Systemlatenz (Maus, Monitor, Browser) verzögert den Zeiger. Zeigerbeschleunigung und Unterlage verändern die Leistung erheblich.
- **Lerneffekt:** Die Bahn ist zufällig, aber die Aufgabe wird schnell geübt (Zeigergefühl, Mausempfindlichkeit); Verbesserungen über wenige Tage sind eher Geräte- und Aufgabengewöhnung.
- **Alter und Ermüdung:** siehe Abschnitt 4. 45 s sind kurz; Aufmerksamkeitsabfall spielt eine geringe Rolle, aber Augen- und Armermüdung bei mehreren Durchgängen.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt (mittel):** Kurzes Pursuit-Training mit quasi-zufällig bewegtem Ziel (2 × 6 min an 3 Tagen) verbesserte die Folgebewegung; Effekt noch 5 Tage später (Eibenberger et al., 2012; kleine Studie, n = 10 + 10). Dass sich Zeigernachführung in genau dieser Aufgabe verbessert, ist plausibel (Miall et al., 1993 zu Nachführmustern; McHugh & Bahill, 1985, Sekundärangabe).
- **Naher Transfer (schwach):** Andere Folgeaufgaben mit Auge oder Hand könnten profitieren; kaum geprüft.
- **Alltagstransfer (fehlend):** Für Sport, Lesen, Autofahren oder Bildschirmkomfort ist kein Nutzen durch diese Übung belegt. Sport-Sehtraining zeigt große Effekte fast nur bei Ähnlichkeit von Trainings- und Testaufgabe (Guo et al., 2025); „Gehirntraining“ hat wenig Fernwirkung (Simons et al., 2016). Bei Bildschirmbeschwerden sind Ursachen meist okulomotorisch oder Trockenheit; Wirksamkeit von Übungen ist unbewiesen (Rosenfield, 2011).

## 9. Auswahlhinweise für die KI
- **Passt, wenn** jemand die Zeigernachführung eines gleichmäßig bewegten Ziels üben will (Profil: kontinuierliche_steuerung 3, auge_hand_koordination 3, Antizipation 2), eine kurze, ruhige Übung mit Maus ohne Strafen sucht und keine feinen Details erkennen muss.
- **Weniger passend, wenn** die Augenfolge selbst geübt werden soll (dann Blickfit „Scharf in Bewegung“ bzw. 401–404, 407), wenn nur ein Tablet vorhanden ist, bei Zeitdruck-Empfindlichkeit oder wenn Vergleichbarkeit über Geräte nötig ist.
- **Vorsicht / anpassen bei:** `tremor_parkinson` und `hand_arm_beschwerden` (dauerndes Nachführen, Haltearbeit), `nystagmus` (Folgebewegung selbst betroffen), `trockenes_auge_bildschirm` und `kopfschmerz_asthenopie` (starres Schauen, Lidschlag ↓; Pausen), `presbyopie_gleitsicht` (Blick durch Nahteil unten bzw. Kopfbewegung; Bildschirmabstand prüfen). Keine Diagnose, kein Ersatz für Sehprüfung.
- **Blickfit-Umsetzung (Original ↔ Blickfit):** „Scharf in Bewegung“ fordert zusätzlich `sehschaerfe_detail` 3, `blickfolge` 3, `visuelle_verarbeitungsgeschwindigkeit` 2, `entscheidung_wahlreaktion` 1 und verlangt keine Handnachführung (`kontinuierliche_steuerung` 0, `auge_hand_koordination` 0). Für Menschen mit Handproblemen oder Tablet-Nutzer ist die Blickfit-Version die bessere Wahl; bei Presbyopie ist eine gute Nahkorrektur nötig, um das C zu erkennen.
- **Kombiniert gut mit:** 104 (Zielfang: Springen und Zielen), 401–404 (reine Blickfolge in verschiedenen Bahnen), 407 (Vorhersage), 705 (ruhige Hand), 707 (Pfad nachfahren).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
**Schwächen des Originals:** Bewegung pro Bild statt pro Sekunde (Tempo abhängig von 60/144 Hz); Wertung der Hand statt der Augen; Rückkopplung Punkte → Tempo; Tablet: Finger verdeckt den Ball, muss liegen bleiben, Kontaktzone ≈ 2,5° (Fingerdicke ≈ 1,5–2 cm ≈ 2,5–3°) ohne Rückmeldung; unvorhersehbare Bahn ohne Vorhersagbarkeitsstufen; nur Kontaktbilder werden gezählt (kein Verzug, keine Streuung); Farbwechsel orange/grün als Rückmeldung (redundant durch Bogen); Zeitstrafe fehlt, aber Ball-Tempo zwingt zur Eile; Website-Aussagen (Tabellen, Transfer) nicht belegt.

**Blickfit-Umsetzung „Scharf in Bewegung“ (Unterschiede):**
- Statt Zeiger: Augenfolge + kurz gezeigtes **Landolt-C** (ISO-Proportionen, 4 Richtungen, Ø 34–40 px ≈ 1,0°, Lücke ≈ 13′ auf dem iPad bei 40 cm, eigene Rechnung) im hellen Ball (Ø ≈ 4°); Antwort per Button oder Pfeiltaste; die Buttons leuchten erst nach dem Zeichen auf, damit sie den Blick nicht weglocken.
- **Adaptiv:** 3-down/1-up (≈ 79 % richtig), Stufen 1–20: Tempo 12 × 1,13^(Stufe−1) Einheiten/s ≈ 3–35 °/s (Einheit = 1 % der kürzeren Bildschirmseite; iPad ≈ 10 px, 40 cm), Anzeigedauer 500 → 220 ms.
- **Bahn:** weich und unvorhersehbar (Winkelgeschwindigkeit ω(t) = 1,4 · sin(0,9t + φ1) · cos(0,37t + φ2) rad/s), am Rand sanfte Lenkung, sonst Spiegelung; **zeitbasiert** (dt), also auf 60 und 120 Hz gleich schnell.
- 20 Durchgänge (Kurzmodus 3), Antwortfenster 2,5 s, Pause 1,3–2,3 s; kein Wettlauf, keine Strafe. Hinweis „Folge dem Ball mit den Augen, nicht mit dem Kopf“.
- Ergebnisse: Treffsicherheit, höchstes Tempo, richtig erkannt; der Ertrag wird sichtbar (nicht nur behauptet).
- **Offene Punkte:** Blickverhalten wird nicht gemessen (wäre nur mit Eyetracking möglich); Kontrast/Helligkeit für Senioren erhöhen (Long & Crambert, 1990); Start mit 3 °/s und größerem C für Ältere; **Darbietung und Größe pro Gerät prüfen** (Bildrate, Pixeldichte); auch Kinder und Alterssichtige mit Nahkorrektur ansprechen; kein Diagnose-Anspruch (das C-Ergebnis ist kein Sehtest).

## 11. Quellen
### Von der Website angegeben
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓ (Crossref), Titel auf der Website leicht falsch („smooth pursuit“); **stützt die Aussage der Website:** ja (Folgebewegung und Sakkaden haben verschiedene Antriebe: Geschwindigkeit vs. Positionsfehler; Inhalt nur aus Metadaten und Sekundärangaben der Literaturbasis).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓ (Abstract); **stützt:** teilweise (Netzwerk MT/MST, FEF, Kleinhirn, Basalganglien, Colliculus superior – ja; „eigenständige Schaltkreise für Sakkaden“ – nein, Krauzlis betont die gemeinsame Kaskade).
- Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5. Aufl.). Oxford University Press. https://doi.org/10.1093/med/9780199969289.001.0001 – **Prüfung:** Website-DOI 10.1093/med/9780199969203.001.0001 **falsch**, korrekt ist ...969289... ✓ (Crossref); Buch, Inhalt nicht eingesehen; **stützt:** ja (plausibel: Netzhautschlupf als Antrieb, Aufholsakkaden; die Dauer 20–40 ms passt zur Hauptsequenz).
- Lisberger, S. G. (2010). Visual tracking in primates: Neural mechanisms of smooth pursuit eye movements. *Current Opinion in Neurobiology, 20*(4), 405–410. (DOI der Website: 10.1016/j.conb.2004.04.004-ähnlich, tatsächlich 10.1016/j.conb.2010.04.004) – **Prüfung:** ✗ nicht auffindbar; die angegebene DOI 10.1016/j.conb.2010.04.004 gehört zu Semaan & Kauffman (2010), einem Artikel zur Entwicklung reproduktiver Schaltkreise. Vermutlich gemeint: Lisberger (2010), *Neuron, 66*(4), 477–491 (s. „Weitere Fachliteratur“). **Stützt:** nein (die Aussagen „Top 1 %“ und „Overshoot bei Hitboxen“ gehen aus keiner Quelle hervor).
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – **Prüfung:** DOI stimmt ✓ (Crossref, Abstract); **stützt:** teilweise (Vorhersage, Aufmerksamkeit – ja; „Training erleichtert Lesen und senkt digitale Augenbelastung“ – steht nicht darin).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (behandelt einfache Reaktionszeit und Hardware, nicht Zeitmessung der Zielverfolgung).
- Nur im Fließtext genannt: Bahill, A. T., Iandolo, M. J., & Troost, B. T. (1980). Smooth pursuit eye movements in response to unpredictable target waveforms. *Vision Research, 20*(11), 923–931. https://doi.org/10.1016/0042-6989(80)90073-5 – **Prüfung:** DOI stimmt ✓ (Metadaten); **stützt:** unklar (Thema unvorhersehbare Zielbahnen passt, die Zahl „30–40 °/s“ nicht geprüft). Land, M. F., & McLeod, P. (2000). From eye movements to actions: how batsmen hit the ball. *Nature Neuroscience, 3*(12), 1340–1345. https://doi.org/10.1038/81887 – **Prüfung:** Website-DOI 10.1038/81861 **falsch**, korrekt ✓; **stützt:** teilweise (Vorhersage bei Ballsport, aber ein Cricketschlag ist keine Zeigernachführung).

### Weitere Fachliteratur
Alle DOIs am 30.09.2026 über Crossref geprüft (Titel, Erstautor:in, Jahr, Zeitschrift, Band, Seiten stimmen).
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Latenz ≈ 100 ms, Beschleunigung ≈ 50 °/s².
- Robinson, D. A., Gordon, J. L., & Gordon, S. E. (1986). A model of the smooth pursuit eye movement system. *Biological Cybernetics, 55*(1), 43–57. https://doi.org/10.1007/BF00363977 – Gain ≈ 0,95, Latenz ≈ 100 ms.
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Gain < 1, Einfluss des Hintergrunds.
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Grenze individuell weit über 30 °/s.
- Barnes, G. R., Donnelly, S. F., & Eason, R. D. (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. *The Journal of Physiology, 389*, 111–136. https://doi.org/10.1113/jphysiol.1987.sp016649 – Gain sinkt bei unvorhersehbaren Bahnen.
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Auslöser von Aufholsakkaden.
- Thier, P., & Ilg, U. J. (2005). The neural basis of smooth-pursuit eye movements. *Current Opinion in Neurobiology, 15*(6), 645–652. https://doi.org/10.1016/j.conb.2005.10.013 – beteiligte Hirnstrukturen.
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – wahrscheinlich gemeinter Lisberger-Artikel (Sensomotorik der Folgebewegung).
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – Manuelles Tracking läuft in Schüben.
- McAuley, J. H., & Marsden, C. D. (2000). Physiological and pathological tremors and rhythmic central motor control. *Brain, 123*(8), 1545–1567. https://doi.org/10.1093/brain/123.8.1545 – Tremor.
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – Kurztraining der Folgebewegung.
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Alter und Gain.
- Long, G. M., & Crambert, R. F. (1990). The nature and basis of age-related changes in dynamic visual acuity. *Psychology and Aging, 5*(1), 138–143. https://doi.org/10.1037/0882-7974.5.1.138 – Alter, Leuchtdichte.
- Long, G. M., & Rourke, D. A. (1989). Training effects on the resolution of moving targets – dynamic visual acuity. *Human Factors, 31*(4), 443–451. https://doi.org/10.1177/001872088903100407 – Training der dynamischen Sehschärfe (Blickfit-Version).
- Uchida, Y., Kudoh, D., Murakami, A., Honda, M., & Kitazawa, S. (2012). Origins of superior dynamic visual acuity in baseball players: Superior eye movements but not visual processing. *PLoS ONE, 7*(2), e31530. https://doi.org/10.1371/journal.pone.0031530 – Vorteil der Sportler liegt in Augenbewegungen.
- Shekar, S. U., Erickson, G. B., Horn, F., Hayes, J. R., & Cooper, S. (2021). Efficacy of a digital sports vision training program for improving visual abilities in collegiate baseball and softball athletes. *Optometry and Vision Science, 98*(7), 815–825. https://doi.org/10.1097/OPX.0000000000001740 – digitales Sehtraining ohne Vorteil gegenüber Placebo.
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., & Wells, K. A. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Gleitsicht und Kopfbewegung.
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlagrate am Bildschirm.
- Rosenfield, M. (2011). Computer vision syndrome: A review of ocular causes and potential treatments. *Ophthalmic and Physiological Optics, 31*(5), 502–515. https://doi.org/10.1111/j.1475-1313.2011.00834.x – Bildschirmbeschwerden, unbewiesene Behandlungen.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Transfer nur bei ähnlichen Aufgaben.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Evidenz zu „Gehirntraining“.
- Weitere Angaben (Baloh et al., 1975; McHugh & Bahill, 1985; Parhi et al., 2006; de la Malla et al., 2017) stammen aus der Literaturbasis W01 bzw. docs/wissenschaft/02 und sind dort geprüft; sie sind hier als Sekundärangaben gekennzeichnet.
