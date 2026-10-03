---
# ===== Kennung =====
nr: 105
kennung: pursuit-tracker
name: "Glatte Blickfolge (Ball mit den Augen verfolgen, Zeichen erkennen)"
name_original: "Glatte Blickfolge | Zielverfolgung – Pursuit Tracker Pro"
kapitel: "Visuelle Wahrnehmung"
kapitel_original: "visual"
unterkapitel_original: "tracking-accuracy"
quelle_url: "https://skilldrills.online/de/drills/visual/tracking-accuracy/pursuit-tracker"
blickfit_umsetzung: {kennung: "scharf-in-bewegung", name: "Scharf in Bewegung", unterschiede: "Kein Zeiger: Man folgt dem Ball nur mit den Augen und erkennt darin ein kurz gezeigtes Landolt-C (4 Richtungen, Strich = Lücke = 1/5 des Durchmessers), Antwort per großem Button oder Pfeiltaste. Damit wird die Augenfolge erzwungen statt nur behauptet und ist am Ergebnis ablesbar (dynamische Sehschärfe). 20 Durchgänge mit adaptiver Treppe (3 richtig runter, 1 Fehler rauf, Stufe 1 bis 20) statt 45 s Punktesammeln; Tempo 12 bis ca. 122 Einheiten/s (Einheit = 1 % der kürzeren Bildschirmseite, ca. 3 bis 35 °/s auf dem Tablet bei 40 cm), Anzeigedauer des C 500 bis 220 ms. Weiche, unvorhersehbare Bahn (Winkelgeschwindigkeit als Produkt zweier langsamer Schwingungen, sanftes Wegsteuern vom Rand) mit Zeitschritt gerechnet, also auf 60 und 120 Hz gleich schnell. Kein Wettlauf gegen die Zeit, keine Zeitstrafe, Tablet und Touch als Hauptgerät."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein heller Ball gleitet in weichen, nicht vorhersagbaren Kurven über den Bildschirm; man folgt ihm nur mit den Augen. Kurz erscheint in ihm ein „C“ (Landolt-Ring), und man tippt auf den Knopf, in dessen Richtung die Öffnung zeigt. Mit der Stufe wird der Ball schneller und das C kürzer gezeigt."
ziel_funktionen: [blickfolge, sehschaerfe_detail]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 45
schwierigkeit_anpassung: "Kein Levelsystem, sondern Kopplung an Punkte und Serie: Ball-Höchsttempo = 6 + 0,1 × Punkte + 0,5 × Serie (px pro Bild), Ballradius = max(9, 18 − 0,04 × Punkte) px. Wer gut ist, bekommt automatisch einen schnelleren, kleineren Ball."
messgroessen: ["Punkte (+5 je 60 Kontaktbilder am Stück)", "Serie (Streak)", "Genauigkeit in % (Kontaktbilder / alle Bilder)", "Note S+ bis F (Wurzelskala, Referenz 180 Punkte)", "Bestwert lokal", "sinnvoll ergänzt: Abstand Zeiger–Ball (Mittel/Streuung), Zeitverzug (Lag) zwischen Zeiger und Ball, Zielgeschwindigkeit in °/s, Bildwiederholrate"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 3
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 3
    sakkaden: 1
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 2
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
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 0
    zielbewegung_tempo: 0
    zielbewegung_praezision: 0
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 1
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus mit ruhiger, glatter Unterlage (Zeigerbeschleunigung aus) oder Touchscreen", "Gut korrigierte Sicht auf Bildschirmabstand (bei Alterssichtigkeit Nah- bzw. Arbeitsplatzbrille)", "Ausreichend Bildschirmhelligkeit; Farbsehen nicht nötig (Farbwechsel orange/grün ist nur zusätzlicher Hinweis)", "Bildschirmrate bekannt (60 Hz empfohlen, weil das Tempo im Original an die Bildrate gekoppelt ist)"]
vorsicht_bei: [nystagmus, sehbehinderung_niedriger_visus, presbyopie_gleitsicht, schwindel_vestibulaer, trockenes_auge_bildschirm, kopfschmerz_asthenopie]
geeignet_fuer: ["die Augenfolge eines gleichmäßig bewegten Ziels üben, verbunden mit einer kleinen Detailaufgabe", "Erkennen kurz gezeigter Zeichen in Bewegung bei langsam steigendem Tempo", "Kopf ruhig halten und nur die Augen bewegen", "kurze, ruhige Übung ohne Zeitstrafe, auch am Tablet (Antwort per großem Knopf)"]
weniger_geeignet_fuer: ["Üben der Hand-Auge-Nachführung (keine Handbewegung nötig; dafür 104, 705, 707)", "Menschen ohne ausreichend scharfes Sehen im Bildschirmabstand (das C ist ≈ 1° groß, die Lücke ≈ 13 Bogenminuten)", "Menschen mit Nystagmus oder Schwindel bei Bewegungsreizen", "Messung der Augenbewegung selbst (das Blickverhalten wird nicht erfasst)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Kurzes Pursuit-Training mit quasi-zufällig bewegtem Ziel verbesserte die Folgebewegung und der Effekt hielt Tage an (Eibenberger et al., 2012: 2 × 6 min an 3 Tagen, n = 10 + 10, Augenmessung im Labor, nicht diese Aufgabe); direkte Belege für diese Übung fehlen. Die Übung erfasst, ob das Zeichen erkannt wird, nicht die Augenbewegung selbst; Belege für Übertragung auf Sport, Lesen oder Bildschirmkomfort fehlen (Guo et al., 2025; Simons et al., 2016)."
aehnliche_uebungen: [104, 106, 305, 401, 402, 403, 404, 407, 505, 707]
stichworte: ["smooth pursuit", "Blickfolge", "manuelles Tracking", "Zeigerverfolgung", "Auge-Hand", "Time on Target", "Aufholsakkaden", "dynamische Sehschärfe (Blickfit)"]
---

# 105 · Glatte Blickfolge (Ball mit dem Zeiger verfolgen)

> Original: „Glatte Blickfolge | Zielverfolgung“ (Pursuit Tracker Pro) – skilldrills.online, Kapitel „Visuelle Wahrnehmung“ (visual) · Blickfit: „Scharf in Bewegung“ (umgesetzt, aber andere Aufgabe, s. Abschnitt 10)

## 1. Kurzbeschreibung

Ein heller Ball gleitet in weichen, nicht vorhersagbaren Kurven über den dunklen Bildschirm. Man folgt ihm nur mit den Augen, nicht mit dem Kopf. Immer wieder erscheint für einen kurzen Moment (anfangs 0,5 s, auf hohen Stufen 0,22 s) im Ball ein „C“ (Landolt-Ring) mit einer Öffnung nach rechts, links, oben oder unten. Danach leuchten vier große Knöpfe auf, und man tippt auf den, in dessen Richtung die Öffnung zeigte. Ein Durchgang besteht aus 20 solchen Zeichen. Die Stufe passt sich an: Nach drei richtigen Antworten wird der Ball schneller, nach einer falschen langsamer; die Schwierigkeit kommt aus dem Tempo und der kurzen Anzeigezeit, nicht aus einer Frist für die Antwort. Geübt wird, einem bewegten Ziel ruhig mit den Augen zu folgen und dabei ein kleines Detail zu erkennen.

## 2. Ablauf im Original (Analyse)
Quelle der Zahlen: Code-Analyse in `docs/skilldrills-analyse.md` (Abschnitt 5, aus dem ausgelieferten Spielcode); Regeltext und Website-Texte aus der Seite. Ableitungen in °/s sind **eigene Rechnungen** (≈ 36–40 px pro Grad, s. Abschnitt 4).
- **Ablauf:** Start-Knopf, Countdown, 45 s Spielzeit, Ergebnis mit Genauigkeit und Note. Kein Zeitbonus, keine Zeitstrafe.
- **Ball:** Start in der Bildmitte mit 6 px pro Bild (bei 60 Hz ≈ 360 px/s ≈ 9–10 °/s), Richtung zufällig. Radius = max(9, 18 − 0,04 × Punkte) px, also 18 px zu Beginn und bei 100 Punkten 14 px.
- **Bahn:** Mit 5 % Wahrscheinlichkeit **pro Bild** (bei 60 Hz ≈ 3 Mal pro Sekunde) erhalten beide Geschwindigkeitskomponenten einen Zufallsstoß zwischen −5 und +5 px/Bild. Danach wird das Tempo auf ein Höchsttempo gekappt: 6 + 0,1 × Punkte + 0,5 × Serie px/Bild. Am Rand wird gespiegelt. Es gibt **kein Mindesttempo**, der Ball kann also fast stehen bleiben und wieder losziehen. Die Bahn ist ein Zufallsspaziergang, nicht vorhersagbar; die Tipp-Empfehlung „Antizipiere die nächste Richtung“ ist damit nur begrenzt umsetzbar (man kann nur Tempo und Richtung extrapolieren).
- **Beispiel Tempo:** Bei 50 Punkten und Serie 10 liegt die Kappung bei 16 px/Bild ≈ 960 px/s ≈ 24–27 °/s bei 60 Hz.
- **Kontakt:** Abstand Zeiger–Ballmitte < Radius + 35 px (Kontaktzone ≈ 98–106 px Durchmesser ≈ 2,5–2,9°, je nach Ballradius 14–18 px). Grüne Ballfarbe bei Kontakt, sonst orange; Fortschrittsbogen um den Ball.
- **Punkte:** 60 Kontaktbilder am Stück → +5 Punkte, Serie +1. 120 Bilder ohne Kontakt → „Lost Link“: Serie = 0, kein Punkt- oder Zeitabzug. Maximal möglich ≈ 45 × 5 = 225 Punkte.
- **Note:** `pct = min(100, 100·√(Punkte/180))`; S+ ab ≈ 163 Punkten (33 Pulse), D ab 16 Punkten, darunter F (Rechnung aus der Formel). **Genauigkeit** = Kontaktbilder / alle Bilder.
- **Eingabe:** Maus, Touch (Finger muss aufliegen, beim Loslassen verschwindet der Zeiger). Speicherung nur lokal (localStorage).
- **Bildfrequenzabhängig:** Bewegung, Kicks und Schwellen (60/120 Bilder) sind **pro Bild** gerechnet, nicht pro Sekunde. Bei 144 Hz laufen Ball und Kicks 2,4-mal so schnell (≈ 22–24 °/s Starttempo, 7 Kicks/s), „+5 Punkte pro Sekunde“ wird zu +5 pro 0,42 s, und „Lost Tracking > 2 s“ wird zu 0,83 s.
- **Widersprüche Regeltext ↔ Code:** (1) „+5 PTS/s“ und „> 2 s“ stimmen nur bei 60 Hz. (2) Der Text verspricht Messung von „mittlerer Bahnabweichung“, „Latenz bei Richtungswechseln“ und „Sakkaden-Unterdrückung“ (Tabelle); im Code gibt es nur Kontaktbilder und Punkte. (3) „Halte das Fadenkreuz 45 Sekunden lang ununterbrochen im Zielbereich“ (Anleitung) widerspricht der Wertung, die Aussetzer bis 2 s ohne Abzug toleriert.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Aussagen der Website:** Glatte Blickfolge (Smooth Pursuit) folge stufenlos einem bewegten Ziel, im Gegensatz zu Sakkaden. Sie sei bis „etwa 30 °/s“ genau, danach seien Aufholsakkaden nötig. Antrieb sei der Netzhautschlupf; beteiligt seien V1, MT/MST, frontales Augenfeld (FEF), Brückenkerne und Kleinhirn; Latenz 100–130 ms, Vorhersage über Kleinhirn-Modelle. Zielgruppen: FPS-Spieler, Ballsportler, alle mit „visueller Feinmotorik“. Leistungstabelle mit fünf Stufen (Top 1 % bis Untrainiert: Time on Target ≥ 88 % bis < 48 %, „Sakkaden-Unterdrückung“ bis ≥ 95 %). Versprochen werden bessere Fähigkeiten in Shootern und Sport, besseres Lesen, längere Aufmerksamkeit und „spürbar weniger digitale Augenüberlastung“; 3–5 Durchgänge pro Tag, Palming zur Entspannung.

**Einordnung:**
- **Grundphysiologie überwiegend richtig:** Netzhautschlupf treibt die Folgebewegung, Latenz ≈ 100 ms (Carl & Gellman, 1987), Aufholsakkaden bei zu großem Positionsfehler (de Brouwer et al., 2002), Netzwerk aus Kortex, Pons, Kleinhirn (Thier & Ilg, 2005; Krauzlis, 2004). Der Zusatz, Sakkaden hätten „eigenständige“ Schaltkreise, wird von Krauzlis relativiert: Beide Systeme teilen sich viele Strukturen.
- **„Genau bis 30 °/s“ ist eine grobe Vereinfachung:** Der Gain (Auge/Ziel) liegt immer unter 1 und sinkt mit dem Tempo (Collewijn & Tamminga, 1984). Individuell bleibt er weit über 30 °/s hoch (bei 5 untersuchten Personen ≈ 0,9 bis 100 °/s, bei einer Person nur ≈ 0,6; Meyer et al., 1985). Das **Originaltempo liegt dagegen nur bei ≈ 9–27 °/s** und ist damit für die Augen meist gut machbar.
- **Wichtigste Einschränkung:** Gemessen wird der **Zeiger**, nicht der Blick. Man kann den Ball zum Teil mit dem Zeiger jagen, während die Augen springen; die Tabellenspalten „Sakkaden-Unterdrückung“ und „Tracking-Präzision“ gibt es im Code nicht. Eine Zuordnung zur „Blickfolge“ ist Annahme, nicht Messung.
- **Leistungsstufen („Top 1 %/5 %/25 %/50 %“): keine Datengrundlage.** Die Seite sagt selbst, sie sammle keine Leistungsdaten; die zitierten Arbeiten enthalten keine solchen Normen. Zudem hängt das Ergebnis von Bildrate, Maus und Unterlage ab.
- **Transfer- und Gesundheitsversprechen nicht belegt:** „stärkt die Plastizität im FEF“, „erleichtert Lesen“, „verringert Asthenopie“, „Profisportler haben außergewöhnlichen Gain“ (kein Beleg auf der Seite). Wirksamkeit von Maßnahmen gegen Computer Vision Syndrome ist unbewiesen (Rosenfield, 2011); Transfer digitaler Übungen bleibt meist auf ähnliche Aufgaben beschränkt (Guo et al., 2025).
- **Weitere Punkte ohne Beleg:** Mausempfehlung (800 DPI, 30–45 cm pro 360°), „sechs Augenmuskeln erbringen Höchstleistung“, Palming, „Formel-1-Piloten“. Die Zitate zu Lisberger (2010) und Woods et al. (2015) stützen die genannten Aussagen nicht (s. Abschnitt 11).

## 4. Optische und okulomotorische Grundlagen

- **Glatte Folgebewegung:** Sie hält das Bild eines langsam bewegten Ziels auf der Fovea. Latenz ≈ 100 ± 5 ms bei Zielen ≥ 5 °/s; die Beschleunigung sättigt bei ≈ 50 °/s² (Carl & Gellman, 1987). Stationärer Gain ≈ 0,95 bei 5–30 °/s (Robinson et al., 1986). Der Gain sinkt mit dem Tempo (−10 % horizontal, −20 % vertikal bei strukturiertem Hintergrund; Collewijn & Tamminga, 1984). Individuell bleibt er weit über 30 °/s hoch (bei 5 untersuchten Personen ≈ 0,9 bis 100 °/s, bei einer Person nur ≈ 0,6; Meyer et al., 1985). Antrieb ist der Netzhautschlupf, also die Bildverschiebung auf der Netzhaut (Leigh & Zee, 2015). Folgebewegung und Sakkaden sind getrennte, aber verknüpfte Steuerungen (Rashbass, 1961; Krauzlis, 2004).
- **Unvorhersehbarkeit kostet Gain:** Bei pseudo-zufälligen Bahnen fiel der Gain von 0,92 auf 0,53, als die schnellste Frequenzkomponente von 0,39 auf 1,56 Hz stieg (Barnes et al., 1987). Die Bahn der Übung ist weich (Winkelgeschwindigkeit als Produkt zweier langsamer Schwingungen), aber nicht vorhersagbar; Vorhersage über extraretinale Signale (Barnes, 2008) hilft nur teilweise; Folgebewegungen auf unvorhersehbare Zielbahnen sind ein eigenes Forschungsfeld (Bahill et al., 1980).
- **Aufholsakkaden:** Auslöser ist die vorhergesagte Zeit bis zum Verfehlen des Ziels: Liegt sie zwischen 40 und 180 ms, reicht rein glatte Verfolgung, sonst folgt eine Sakkade nach ≈ 125 ms (de Brouwer et al., 2002).
- **Dynamische Sehschärfe:** Ein kleines Zeichen an einem bewegten Ziel zu erkennen, ist eine eigene Fähigkeit, die mit dem Tempo und im Alter nachlässt; Teile der schlechteren Leistung Älterer sind Beleuchtungseffekte (Long & Crambert, 1990). In Laborstudien ließ sie sich durch Üben verbessern (Long & Rourke, 1989); der Vorteil von Baseballspielern liegt eher in den Augenbewegungen als in der Bildverarbeitung (Uchida et al., 2012).
- **Sehwinkel (eigene Rechnung, Tablet quer, 40 cm):** Der Ball hat ≈ 4° Durchmesser, das C ≈ 1,0° (Strich und Lücke je ein Fünftel des Durchmessers, Lücke ≈ 13 Bogenminuten), das Tempo reicht von ≈ 3 bis ≈ 35 °/s. 1 °/s entspricht ≈ 7 mm/s.
- **Bildschirm:** Auf Sample-and-hold-Displays verschmiert jedes Bild um v/f (Grad); bei 10 °/s und 60 Hz sind das ≈ 10 Bogenminuten – bei schnellem Ball wirkt das Bild leicht unscharf.
- **Brille und Alter:** Bei Gleitsicht wandert der Blick mit dem Ball durch Bereiche mit seitlicher Unschärfe; Neu-Träger zeigen stark unterschiedliche Kopf-/Augenstrategien und passen sie über Wochen an (Hutchings et al., 2007, n = 10). Für den Bildschirmabstand ist eine Arbeitsplatzbrille besser; um das C zu erkennen, ist eine gute Nahkorrektur nötig. Ältere haben einen geringeren Pursuit-Gain bei allen Tempi (75–93 vs. 18–43 J.; Moschner & Baloh, 1994). Bildschirmarbeit senkte die Lidschlagrate im Mittel ≈ 5-fach (Patel et al., 1991); Pausen und Lidschlag beachten.
- **Praxis der Blickfolgeübungen:** In der funktionellen Optometrie ist der an einer Schnur hängende, angestoßene Ball mit aufgedruckten Buchstaben eine klassische Übungsform für die Blickfolge. Er wird waagerecht, senkrecht, schräg und in Kreisen (im und gegen den Uhrzeigersinn) bewegt, der Kopf bleibt ruhig; später liest man die Buchstaben auf dem Ball, und gesteigert wird über Tempo oder Körperhaltung. Das ist Praxis- und Erfahrungswissen, eine Wirkung ist nicht belegt. Bei Ballsportarten wie Kricket springt der Blick schon vor dem Aufsprung zum erwarteten Aufsprungpunkt (Land & McLeod, 2000). Die Bildschirmübung folgt diesem Gedanken (bewegtes Ziel mit Zeichen, Kopf ruhig), ersetzt die Übung am echten Ball mit ihrem Auge-Hand-Anteil aber nicht.
- **Klinische Prüfung:** Ärzte prüfen die Augenfolgebewegungen, indem die Augen einem nahen Ziel folgen, das in einem „H“ geführt wird (Hirnnerven III, IV und VI; Muchnick, 2008, S. 32–35). Die Übung ist keine solche Prüfung und misst die Augenbewegung nicht.

## 5. Neurowissenschaftliche Grundlagen

Bewegungssignale aus V1 werden in MT/MST (mittlere Schläfen-/mediale obere Schläfenregion) nach Richtung und Tempo ausgewertet und über das frontale Augenfeld (FEF), Brückenkerne und Kleinhirn (Flocculus/Paraflocculus, posteriorer Vermis) zu den Augenmuskelkernen geleitet; beteiligt sind auch Basalganglien und der Colliculus superior (Thier & Ilg, 2005; Krauzlis, 2004; Lisberger, 2010). Aufmerksamkeit erhöht den Gain für das gewählte Ziel, Vorhersage nutzt Efferenzkopie und Gedächtnis für die Geschwindigkeit (Barnes, 2008). Für das Erkennen des C kommen die Verarbeitung feiner Details in der Sehrinde und die Entscheidung über die Richtung hinzu. Welche dieser Strukturen die Übung „trainiert“, ist nicht untersucht; Aussagen wie „stärkt die Plastizität des frontalen Augenfelds“ sind unbelegt. Die Übung ist ein Verhaltensmaß, keine Hirnmessung.

## 6. Motorische Grundlagen

- **Antwort:** Ein Tipp (oder eine Pfeiltaste) auf einen von vier großen Knöpfen am unteren Rand; es gibt keine Nachführbewegung der Hand und kein Zielen auf den Ball. Der Finger verdeckt also nicht das Ziel. Die Knöpfe leuchten erst nach dem Zeichen auf, damit sie den Blick nicht vom Ball weglocken. Zielgrößen für Touch: ≥ 9 mm (Parhi et al., 2006).
- **Auge und Hand:** Wo Hand und Auge gemeinsam nachführen, laufen Interzeptions- und Nachführfehler mit Augenfolge kleiner aus (de la Malla et al., 2017); hier wird nur die Augenfolge gefordert.
- **Kopf und Haltung:** Dem Ball wird nur mit den Augen gefolgt; der Kopf bleibt ruhig. Als Einflussgröße der Augenführung gilt in der Praxis der funktionellen Optometrie auch die Körperhaltung (Praxisangabe, nicht belegt); aufrecht und entspannt sitzen.

## 7. Einflussfaktoren und Messgrenzen

- **Tempo und Bildrate:** Die Bahn wird in Echtzeit gerechnet; auf 60- und 120-Hz-Geräten ist das Tempo gleich.
- **Zufall:** Die Bahn ist zufällig; das Ergebnis eines Durchgangs mit 20 Zeichen streut. Weil sich die Stufe nach den Antworten anpasst, zeigt vor allem das erreichte Tempo, wie gut es läuft.
- **Blick wird nicht gemessen:** Das Ergebnis sagt nichts darüber, wie die Augen dem Ball folgen. Zwei Personen mit gleichem Ergebnis können ganz unterschiedlich blicken.
- **Messung am Menschen:** Messungen am Menschen streuen stärker als an Prüfkörpern; darum zählt der Verlauf über mehrere Durchgänge, nicht ein Einzelwert (Mountford et al., 2004, S. 43–44).
- **Lerneffekt:** Die Bahn ist zufällig, aber die Aufgabe wird schnell geübt; Verbesserungen über wenige Tage sind eher Gewöhnung an Gerät und Aufgabe.
- **Alter und Ermüdung:** Siehe oben (Alter und Optik). 20 Zeichen sind kurz; Augenermüdung kann bei mehreren Durchgängen hintereinander zunehmen.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (mittel, indirekt belegt; die Aufgabe selbst ist nicht untersucht):** Kurzes Pursuit-Training mit quasi-zufällig bewegtem Ziel (2 × 6 min an 3 Tagen) verbesserte die Folgebewegung; Effekt noch 5 Tage später (Eibenberger et al., 2012; kleine Studie, n = 10 + 10). Für die dynamische Sehschärfe gibt es Trainingsstudien im Labor (Long & Rourke, 1989); digitales Sehtraining zeigte bei Sportlerinnen und Sportlern keinen Vorteil gegenüber Placebo (Shekar et al., 2021). Dass sich das Erkennen des C in dieser Aufgabe verbessert, ist plausibel, aber nicht direkt untersucht.
- **Naher Transfer (schwach):** Andere Folgeaufgaben könnten profitieren; kaum geprüft.
- **Alltagstransfer (fehlend):** Für Sport, Lesen, Autofahren oder Bildschirmkomfort ist kein Nutzen durch diese Übung belegt. Sport-Sehtraining zeigt große Effekte fast nur bei Ähnlichkeit von Trainings- und Testaufgabe (Guo et al., 2025); „Gehirntraining“ hat wenig Fernwirkung (Simons et al., 2016). Bei Bildschirmbeschwerden sind die Ursachen meist okulomotorisch oder Trockenheit; die Wirksamkeit von Übungen ist unbewiesen (Rosenfield, 2011).

## 9. Auswahlhinweise für die KI

- **Passt, wenn** jemand die Augenfolge eines gleichmäßig bewegten Ziels mit einer kleinen Detailaufgabe üben will (Profil: Blickfolge 3, Sehschärfe_Detail 3, Verarbeitungsgeschwindigkeit 2), eine kurze, ruhige Übung ohne Strafen am Tablet oder Computer sucht und keine Handnachführung braucht.
- **Weniger passend, wenn** die Hand-Auge-Nachführung geübt werden soll (dafür 104, 705, 707), das Sehen im Bildschirmabstand nicht ausreicht (das C ≈ 1°), bei Nystagmus oder wenn die Augenbewegung selbst gemessen werden soll.
- **Vorsicht / anpassen bei:** `nystagmus` (Folgebewegung selbst betroffen); `trockenes_auge_bildschirm` und `kopfschmerz_asthenopie` (starres Schauen, Lidschlag ↓; Pausen); `presbyopie_gleitsicht` (Blick durch den Nahteil bzw. Kopfbewegung; Bildschirmabstand prüfen, gute Nahkorrektur für das C); `sehbehinderung_niedriger_visus` (Zeichen ≈ 1°); `schwindel_vestibulaer` (bewegter Ball, kurze Durchgänge, bei Unwohlsein abbrechen). Keine Diagnose, kein Ersatz für eine Sehprüfung; das Ergebnis mit dem C ist kein Sehtest.
- **Abklärung vor dem Üben:** Doppelbilder, plötzlicher einseitiger Sehverlust, Lichtblitze, neue Schleier, Kopfschmerz mit Sehverschlechterung, Schwindel oder Zittern gehören ärztlich abgeklärt; sie sind kein Anlass zum Üben (Muchnick, 2008, S. 6, 28). Wiederkehrender Schwindel oder Kopfschmerz beim Üben sollte nicht allein den Übungen angelastet werden.
- **Kombiniert gut mit:** 104 (Zielfang: Springen und Zielen), 401–404 (reine Blickfolge in verschiedenen Bahnen), 407 (Vorhersage), 705 (ruhige Hand), 707 (Pfad nachfahren).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
**Schwächen des Originals:** Bewegung pro Bild statt pro Sekunde (Tempo abhängig von 60/144 Hz); Wertung der Hand statt der Augen; Rückkopplung Punkte → Tempo; Tablet: Finger verdeckt den Ball, muss liegen bleiben, Kontaktzone ≈ 2,5–2,9° (Fingerdicke ≈ 1,5–2 cm ≈ 2,5–3°) ohne Rückmeldung; unvorhersehbare Bahn ohne Vorhersagbarkeitsstufen; nur Kontaktbilder werden gezählt (kein Verzug, keine Streuung); Farbwechsel orange/grün als Rückmeldung (redundant durch Bogen); Zeitstrafe fehlt, aber Ball-Tempo zwingt zur Eile; Website-Aussagen (Tabellen, Transfer) nicht belegt.

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
- Lisberger, S. G. (2010). Visual tracking in primates: Neural mechanisms of smooth pursuit eye movements. *Current Opinion in Neurobiology, 20*(4), 405–410. – **Prüfung:** ✗ nicht auffindbar; die angegebene DOI 10.1016/j.conb.2010.04.004 gehört zu Semaan & Kauffman (2010), einem Artikel zur Entwicklung reproduktiver Schaltkreise. Vermutlich gemeint: Lisberger (2010), *Neuron, 66*(4), 477–491 (s. „Weitere Fachliteratur“). **stützt:** nein (die Aussagen „Top 1 %“ und „Overshoot bei Hitboxen“ gehen aus keiner Quelle hervor).
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – **Prüfung:** DOI stimmt ✓ (Crossref, Abstract); **stützt:** teilweise (Vorhersage, Aufmerksamkeit – ja; „Training erleichtert Lesen und senkt digitale Augenbelastung“ – steht nicht darin).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (behandelt einfache Reaktionszeit und Hardware, nicht Zeitmessung der Zielverfolgung).
- Bahill, A. T., Iandolo, M. J., & Troost, B. T. (1980). Smooth pursuit eye movements in response to unpredictable target waveforms. *Vision Research, 20*(11), 923–931. https://doi.org/10.1016/0042-6989(80)90073-5 – **Prüfung:** DOI stimmt ✓ (Metadaten); **stützt:** unklar (Thema unvorhersehbare Zielbahnen passt, die Zahl „30–40 °/s“ nicht geprüft).
- Land, M. F., & McLeod, P. (2000). From eye movements to actions: how batsmen hit the ball. *Nature Neuroscience, 3*(12), 1340–1345. https://doi.org/10.1038/81887 – **Prüfung:** Die Seite nennt keine DOI; DOI 10.1038/81887 ✓ (Crossref); **stützt:** teilweise (Vorhersage bei Ballsport, aber ein Cricketschlag ist keine Zeigernachführung).

### Weitere Fachliteratur
Alle DOIs am 30.09.2026 über Crossref geprüft (Titel, Erstautor:in, Jahr, Zeitschrift, Band, Seiten stimmen).
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Latenz ≈ 100 ms, Beschleunigung ≈ 50 °/s².
- Robinson, D. A., Gordon, J. L., & Gordon, S. E. (1986). A model of the smooth pursuit eye movement system. *Biological Cybernetics, 55*(1), 43–57. https://doi.org/10.1007/BF00363977 – Gain ≈ 0,95, Latenz ≈ 100 ms.
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Gain < 1, Einfluss des Hintergrunds.
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Grenze individuell weit über 30 °/s.
- Barnes, G. R., Donnelly, S. F., & Eason, R. D. (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. *The Journal of Physiology, 389*, 111–136. https://doi.org/10.1113/jphysiol.1987.sp016649 – Gain sinkt bei unvorhersehbaren Bahnen.
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Auslöser von Aufholsakkaden.
- Thier, P., & Ilg, U. J. (2005). The neural basis of smooth-pursuit eye movements. *Current Opinion in Neurobiology, 15*(6), 645–652. https://doi.org/10.1016/j.conb.2005.10.013 – beteiligte Hirnstrukturen.
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – sensomotorische Grundlagen der Folgebewegung.
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – Kurztraining der Folgebewegung.
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Alter und Gain.
- Long, G. M., & Crambert, R. F. (1990). The nature and basis of age-related changes in dynamic visual acuity. *Psychology and Aging, 5*(1), 138–143. https://doi.org/10.1037/0882-7974.5.1.138 – Alter, Leuchtdichte.
- Long, G. M., & Rourke, D. A. (1989). Training effects on the resolution of moving targets – dynamic visual acuity. *Human Factors, 31*(4), 443–451. https://doi.org/10.1177/001872088903100407 – Training der dynamischen Sehschärfe (Blickfit-Version).
- Uchida, Y., Kudoh, D., Murakami, A., Honda, M., & Kitazawa, S. (2012). Origins of superior dynamic visual acuity in baseball players: Superior eye movements or superior image processing. *PLoS ONE, 7*(2), e31530. https://doi.org/10.1371/journal.pone.0031530 – Vorteil der Sportler liegt in Augenbewegungen.
- Shekar, S. U., Erickson, G. B., Horn, F., Hayes, J. R., & Cooper, S. (2021). Efficacy of a digital sports vision training program for improving visual abilities in collegiate baseball and softball athletes. *Optometry and Vision Science, 98*(7), 815–825. https://doi.org/10.1097/OPX.0000000000001740 – digitales Sehtraining ohne Vorteil gegenüber Placebo.
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., & Wells, K. A. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Gleitsicht und Kopfbewegung.
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlagrate am Bildschirm.
- Rosenfield, M. (2011). Computer vision syndrome: A review of ocular causes and potential treatments. *Ophthalmic and Physiological Optics, 31*(5), 502–515. https://doi.org/10.1111/j.1475-1313.2011.00834.x – Bildschirmbeschwerden, unbewiesene Behandlungen.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Transfer nur bei ähnlichen Aufgaben.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Evidenz zu „Gehirntraining“.
- Weitere Angaben (Baloh et al., 1975; McHugh & Bahill, 1985) – **stützt:** keine (nicht aufgenommen)
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of MobileHCI '06* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – Touch-Zielgröße ≥ 9,2 mm.
- de la Malla, C., Smeets, J. B. J., & Brenner, E. (2017). Potential systematic interception errors are avoided when tracking the target with one's eyes. *Scientific Reports, 7*, 10793. https://doi.org/10.1038/s41598-017-11200-5 – Blickfolge vermeidet Interzeptionsfehler.
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28), Prüfung der Augenfolgebewegungen (S. 32–35), Gesichtsfeldausfälle nach Sehbahnverlauf (S. 32).
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Genauigkeit und Wiederholbarkeit von Messungen am Menschen, Mehrfachmessung (S. 17–18, 24, 43–44).
