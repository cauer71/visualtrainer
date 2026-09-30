---
# ===== Kennung =====
nr: 806
kennung: dynamic-grid-evasion
name: "Raster-Ausweichen – bedrohte Felder erkennen und in ein sicheres Feld wechseln"
name_original: "Reaktionstest online – Raster-Ausweichspiel (Dynamic Grid Evasion; Seitentitel: Reaktionstest online | Raster-Ausweichspiel)"
kapitel: "Körper & Reflexe"
kapitel_original: "physical"
unterkapitel_original: "coordination"
quelle_url: "https://skilldrills.online/de/drills/physical/coordination/dynamic-grid-evasion"
blickfit_umsetzung: {kennung: "raster-ausweichen", name: "Raster-Ausweichen", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/raster-ausweichen/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Die Spielfläche ist in 3 × 3 große Felder geteilt. In jeder Welle leuchten einige Felder bernsteinfarben als Warnung auf; bevor sie 'explodieren', muss man den Mauszeiger in ein nicht markiertes Feld bringen. 45 Sekunden lang, mit immer kürzerer Warnzeit und immer mehr bedrohten Feldern."
ziel_funktionen: [entscheidung_wahlreaktion, verarbeitungsgeschwindigkeit]
eingabe: [maus, touchpad]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code steigt das Level fortlaufend mit den Punkten (1 + Punkte/250) plus 1 Level je 4 fehlerfreie Wellen in Folge; über Levelanteil t = (Level − 1)/14 sinkt die Warnzeit linear von 1,40 s auf 0,45 s und die Zahl bedrohter Felder steigt von 3 auf 7 von 9. Ab Level 15 keine weitere Steigerung, Start immer bei Level 1."
messgroessen: ["Original: Punkte, Level, beste Serie (Combo), Treffer durch Explosion, 'Accuracy' (überstandene/gesamte Wellen), kürzeste Warnzeit", "sinnvoll: Anteil überstandener Wellen je Warnzeit und Zahl bedrohter Felder (Schwelle, z. B. 80 %)", "sinnvoll: Zeitpunkt des Zellwechsels nach Warnbeginn (Entscheidungs- plus Bewegungszeit) und Anteil unnötiger Wechsel, getrennt nach Rand-/Eckfeldern"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 1
    farbunterscheidung: 1
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 2
    blickfolge: 0
    sakkaden: 1
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 2
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 2
    inhibition: 1
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 1
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 3
    antizipation: 1
    entscheidung_wahlreaktion: 3
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 2
    zielbewegung_tempo: 2
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 3
  flimmern_lichtreize: 2
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus oder Touchpad (Original nutzt Pointer-Lock; auf reinen Touch-Geräten lässt es sich nicht starten)", "Spielfläche vollständig und scharf sehen: bei Alterssichtigkeit passende Zwischen-/Bildschirmkorrektur, Abstand 50–70 cm", "Blinkende bernsteinfarbene und rote Großflächen sowie Bildschirm-Wackeln vertragen", "Farbsehen nicht zwingend (Warnfelder sind auch heller als leere Felder)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, gesichtsfeldausfall, presbyopie_gleitsicht, hand_arm_beschwerden, aufmerksamkeitsprobleme]
geeignet_fuer: ["schnelles Entscheiden unter Zeitdruck mit räumlicher Antwort üben (Wahlreaktion mit direkt kompatibler Zuordnung: Zeiger dorthin, wo es sicher ist)", "Aufmerksamkeit über eine große Fläche verteilen und markierte Bereiche auf einen Blick erfassen", "spielerischer, kurzer Einstieg für Jugendliche und Gamer, die Punkte und Serien motivieren", "Maus-Zielbewegungen auf große Ziele unter Zeitdruck (geringe Präzisionsanforderung)"]
weniger_geeignet_fuer: ["Gleichgewicht, Körperkoordination oder Sturzprävention (keine Körperübung trotz Kapitel 'Körper & Reflexe')", "Personen mit Lichtempfindlichkeit, Migräne oder Epilepsie in der Vorgeschichte (Blinkpuls, rote Vollflächen, Rotblitz)", "Tablet ohne Maus (Original startet auf reinen Touch-Geräten nicht)", "ältere oder langsam reagierende Menschen ab etwa Level 8 (Warnzeit unter 1 s, bis 6–7 bedrohte Felder)", "wer eine faire Leistungseinstufung erwartet (Normtabelle ohne Datengrundlage und mit dem Code nicht erreichbar)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Übungseffekte in Wahlreaktions- und Suchaufgaben sind gut belegt (Übung flacht z. B. die Hick-Steigung ab), für dieses Spiel gibt es aber keine Studie; Transfer auf Spiele, Sport oder Verkehr ist nicht untersucht, und Hirntraining überträgt sich allgemein kaum auf den Alltag (Simons et al., 2016)."
aehnliche_uebungen: [803, 801, 401, 202, 302, 103, 108, 501, 702, 805]
stichworte: ["Wahlreaktion", "räumliche Wahlreaktion", "Ausweichen", "3x3-Raster", "verdeckte Aufmerksamkeit", "covert orienting", "Merkmalsabwesenheit", "Suchasymmetrie", "Zeitdruck", "peripheres Erfassen", "Maus", "Pointer-Lock", "Photosensitivität"]
---

# 806 · Raster-Ausweichen – bedrohte Felder erkennen und in ein sicheres Feld wechseln

> Original: „Reaktionstest online – Raster-Ausweichspiel“ (Dynamic Grid Evasion) – skilldrills.online, Kapitel Körper
> & Reflexe (`physical`/`coordination`) · Blickfit: noch nicht umgesetzt (verwandt: `blitzblick`, `zielfang`)

## 1. Kurzbeschreibung

Die Spielfläche ist in neun gleich große Felder (3 × 3) geteilt, ein Fadenkreuz zeigt die Mausposition. In jeder Welle
pulsieren einige Felder bernsteinfarben; läuft die Warnzeit ab, werden sie rot („Explosion“). Wer dann in einem
markierten Feld steht, verliert seine Serie, sonst gibt es Punkte. Mit dem Level sinkt die Warnzeit (1,4 → 0,45 s), und
es bleiben weniger sichere Felder (6 → 2). Trotz Kapitel „Körper“ ist es eine reine Maus-Übung: erkennen, entscheiden,
Zeiger bewegen.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Chunk `23091-…js` plus gemeinsame Hilfsmodule für Level/Multiplikator;
abgerufen 29.09.2026, nur Mechanik). Gradangaben = eigene Umrechnung (24″ Full-HD in 60 cm ≈ 38 px/°).

- **Ablauf (Code):** Pointer-Lock (relative Mausbewegung × Empfindlichkeit 0,1–3) → Countdown ≈ 2,45 s → 45 s Spiel.
  Fadenkreuz startet mittig (Ring 14 px Radius). Escape oder Verlust des Pointer-Locks bricht ab.
- **Spielfläche:** 16 : 9-Container (mind. 460–500 px hoch, max. 88 % der Fensterhöhe) oder Vollbild; Zelle = ⅓ Breite ×
  ⅓ Höhe. Beispiel 1.100 × 620 px: Fläche ≈ 29° × 16°, Zelle ≈ 9,7° × 5,5°, Eckzellen-Mitte ≈ 11° exzentrisch; im
  Vollbild ≈ 48° × 28°, Eckzellen-Mitte ≈ 19°.
- **Welle (Code):** zufällige bedrohte Zellen; Warnung = Bernstein-Füllung (#f59e0b, Deckkraft 0,15–0,30 pulsierend mit
  Periode 2π · 80 ms ≈ 0,50 s ≈ **2 Hz**) plus Rahmen. Geprüft wird **nur im Detonationsmoment**, in welcher Zelle der
  Fadenkreuz-Mittelpunkt liegt; Durchqueren bedrohter Zellen ist folgenlos. Danach 0,35 s Explosion (rote Füllung,
  Deckkraft 0,4, Partikel), sofort die nächste Welle → Zyklus 1,75 s (Level 1) bis 0,80 s (ab Level 15).
- **Schwierigkeit (Code):** Level = max(bisher; 1 + Punkte/250 + ⌊Serie/4⌋), nach oben offen; t = (Level − 1)/14;
  Warnzeit = max(0,45 s; 1,40 s − 0,95 · t); bedrohte Zellen = min(7; ⌊3 + 4 · t⌋). Start immer bei Level 1.
- **Punkte (Code):** je überstandene Welle 100 × Multiplikator nach Serie (ab 3 → 1,1; 5 → 1,25; 7 → 1,35; 10 → 1,5;
  15 → 1,75; 20 → 2,0; 30 → 2,5; 50 → 3,0). Treffer: Serie auf 0, Wackeln 12 px, roter Vollbild-Blitz (≈ 0,48 s, je nach
  Effekt-Einstellung), Strafton; keine Punkte oder Zeit verloren. Speicherung nur lokal.
- **Eigene Simulation der Code-Regeln:** Fehlerfrei passen nur ≈ 44 Wellen in 45 s → **höchstens ≈ 8.450 Punkte** und
  Multiplikator 2,5 (die beworbenen „bis zu 3,0x“ sind unerreichbar). 0,45 s Warnzeit ist fehlerfrei nach ≈ 18 Wellen
  (≈ 24 s) erreicht. 10 % Fehler → ≈ 4.700, 20 % → ≈ 3.300 Punkte. **Ohne jede Mausbewegung** übersteht man zufällig
  67 % (3 bedrohte Zellen) bis 22 % (7) der Wellen, im Mittel ≈ 1.860 Punkte.
- **Bildrate:** Spiellogik mit Zeitdifferenz pro Bild (bildratenunabhängig, je Bild auf 0,1 s gedeckelt); Prüfung auf
  ein Bild genau (16,7 ms bei 60 Hz). Partikel und Abklingen des Wackelns laufen pro Bild (nur Optik).
- **Touch (Code):** Auf reinen Touch-Geräten (Touch vorhanden, aber kein „feiner Zeiger“ laut `pointer: fine`) ersetzt der gemeinsame Startbildschirm aller sechs Spiele 806–811 den Startknopf durch „Mouse Required for Pointer Lock“ – ohne Maus lässt sich das Original nicht starten (Code geprüft 30.09.2026); ob ein Tablet mit angeschlossener Maus als feiner Zeiger gilt, hängt vom Browser ab (nicht getestet). Die Zeigerposition käme ohnehin nur aus `mousemove`; fortlaufendes Fingerziehen
  wird nicht ausgewertet.
- **Widersprüche Regeltext ↔ Code:** Level steigt nicht nur „alle 250 Punkte“, sondern auch je 4 Serienwellen, und über
  15 hinaus (fehlerfrei ≈ Level 45 in der Anzeige). Die Abschlussnote rechnet mit 17.000 Punkten als Bestwert
  (100 · √(Punkte/17.000)) – die besten Noten sind nicht erreichbar.

## 3. Was die Website sagt – und wie das einzuordnen ist

**Aussagen:** Grundlage seien Treismans Merkmalsintegration und Posners räumliche Orientierung; ein „zentraler
Ankerblick“ decke alle 9 Zellen „simultan“ ab und spare „80–120 ms“ bzw. „150–200 ms“ Sakkadenzeit; Woodworth und Fitts
erklärten „ballistischen Flick“ und „Reibungsbremsung“; das Training „automatisiere den Fluchtreflex“ (Hand „unter
250 ms“ im freien Feld) und helfe in LoL, Valorant, CS2. Zielgruppen: FPS-/MOBA-Spieler, Ballsportler. Dazu eine
„wissenschaftliche 5-Stufen-Normtabelle“ (Top 0,1 % ab 17.000 Punkten … Einsteiger < 6.000), „normiert nach … Woods 2015“.

**Einordnung:**
- **Normtabelle ohne Datengrundlage und mit dem Code unvereinbar:** Die Seite sammelt nach eigener Aussage keine Daten;
  Woods et al. (2015) messen einfache Reaktionszeit, keine Normen für dieses Spiel. Stufen 1–3 (ab 9.500 Punkten) sind in
  45 s unerreichbar (Maximum ≈ 8.450); „6.000 Punkte – Level 3–5 – Warnzeit 1,10–1,25 s“ widerspricht der Levelformel
  (6.000 Punkte ≙ Level ≥ 25, Warnzeit 0,45 s).
- **Parallele Entdeckung – teilweise:** Einzelmerkmale wie ein farbiger Rahmen werden parallel entdeckt (Treisman &
  Gelade, 1980). Gesucht ist aber das Feld **ohne** Markierung, und Merkmalsabwesenheit wird weniger effizient gefunden
  (Suchasymmetrie; Treisman & Souther, 1985). Die Warnung ist ein Farb-/Helligkeitsreiz mit ≈ 2-Hz-Pulsieren, aber kein Bewegungsreiz.
- **Covert Attention – teilweise:** Aufmerksamkeit lässt sich ohne Blickbewegung verlagern, plötzlich auftauchende Reize
  ziehen sie an (Posner, 1980; Yantis & Jonides, 1984). Die Zeitersparnisse sind unbelegt; die Hand trifft sogar
  genauer, wenn die Augen zum Ziel dürfen (Abrams et al., 1990). Bei so großen Zielen ist der Ankerblick plausibel,
  aber ungeprüft.
- **Woodworth/Fitts – teilweise:** Das Zwei-Komponenten-Modell ist gut gestützt (Elliott et al., 2001), aber die Zellen
  sind riesig (Fitts-Index ≈ 1–2 bit); „Handballen als Bremse“ und „zwingt das Kleinhirn …“ stehen in keiner Quelle.
  Leistungsbegrenzend sind Entdecken und Entscheiden.
- **Transfer/„Reflex“:** nicht belegt; es ist eine erlernte Wahlreaktion. Actionspiele zeigten in Interventionsstudien im
  Mittel g = 0,34 nach vielen Spielstunden, bei vermutetem Publikationsbias (Bediou et al., 2018) – nichts davon gilt für ein
  45-s-Minispiel. Hardware-Tipps (1.000 Hz Maus, 144/240 Hz) sparen wenige Millisekunden gegenüber 450–1.400 ms
  Warnzeit.

## 4. Optische und okulomotorische Grundlagen

- **Reize:** groß und kontrastreich (Zelle ≈ 10° × 5,5°), Sehschärfe spielt kaum eine Rolle. Bernstein auf fast Schwarz
  (#050508) ist auch über die Helligkeit erkennbar; Rot-Grün-Farbsehschwäche (≈ 8 % der Männer; Birch, 2012) erschwert
  eher Bernstein ↔ Rot (Warnung ↔ Explosion), was für die Entscheidung nicht nötig ist.
- **Peripherie:** Bei Blick zur Mitte liegen Eckzellen ≈ 11° (Container) bzw. ≈ 19° (Vollbild) exzentrisch – große
  helle Flächen sind dort gut sichtbar. Ob die **eigene** Zelle bedroht ist, sieht man am schnellsten am Fadenkreuz.
- **Sakkaden:** Latenz meist ≈ 150–250 ms; nur unter Sonderbedingungen (Lücken-Paradigma) Express-Sakkaden um
  ≈ 100 ms (Fischer & Ramsperger, 1984). Während
  einer Zeigebewegung bleibt der Blick am Ziel „verankert“; neue Sakkaden verzögerten sich im Mittel um 155 ms
  (Neggers & Bekkering, 2000) – bei 0,45 s Warnzeit ist mehrfaches Umschauen zu teuer.
- **Brille:** In einer Studie mit zwei Gleitsichtgläsern war das klare Zwischenfeld bei 60 cm horizontal nur ≈ 13°
  bzw. 18° breit (Einstärkenglas ≈ 60°; Han et al., 2003; je nach Glasdesign verschieden). Schon im Container liegen die äußeren Spalten teils außerhalb → Kopf statt
  Augen bewegen, kleineres Fenster oder Arbeitsplatzbrille; im Vollbild deutlich stärker.
- **Stereosehen:** nicht gefordert (flache 2D-Anzeige).

## 5. Neurowissenschaftliche Grundlagen

- **Aufmerksamkeitsnetzwerke:** Ein dorsales Netzwerk (intraparietaler Sulcus, frontales Augenfeld) steuert willentliche
  räumliche Aufmerksamkeit, ein vorwiegend rechtsseitiges ventrales (temporoparietaler Übergang, ventraler
  Frontalkortex) lenkt auf auffällige, unerwartete Reize um (Corbetta & Shulman, 2002). Beide sind beteiligt; dass die
  Übung sie „trainiert“, ist nicht untersucht.
- **Entscheidung:** Die Antwort ist räumlich direkt kompatibel (Zeiger zum Ort); dann steigt die Wahlreaktionszeit mit
  der Zahl der Alternativen kaum, und Übung flacht die Steigung weiter ab (Proctor & Schneider, 2018). Eigentliche
  Aufgabe: „Ist mein Feld bedroht? Wenn ja, welches Nachbarfeld ist frei?“ – eine Go/No-Go-Entscheidung plus Ortswahl.
- Aussagen zu „motorischem Kleinhirn“ oder „exogener Aufmerksamkeitslenkung im Kortex“ als Trainingseffekt: ohne Beleg.

## 6. Motorische Grundlagen

- **Zielbewegung:** Nachbarfeld ≈ 1 bit (diagonal ≈ 1–1,5 bit), über zwei Felder hinweg ≈ 2 bit (Fitts, 1954; ID = log₂(2D/W), Zielbreite = Zellbreite, Weg von Zellmitte zu Zellmitte; eigene Rechnung) – schnell, wenig
  präzise; Impuls + Korrektur (Elliott et al., 2001) zeigen sich vor allem nahe den Zellgrenzen.
- **Zeitbudget bei 0,45 s:** Schon die einfache Reaktionszeit liegt bei ≈ 213–231 ms (Woods et al., 2015); dazu kommen
  Entscheidung und Bewegung. Erfolgreich ist „stehen bleiben, wenn frei; sonst nächstes freies Feld“.
- **Eingabe:** Maus mit Pointer-Lock; Touchpad möglich, aber langsamer. Browser-Anwendungen überschätzen Reaktionszeiten auf
  Touch- und Tastaturgeräten durchweg, je nach Gerät unterschiedlich (Pronk et al., 2020) – hier nur für eine
  Blickfit-Messung relevant, das Original misst keine Reaktionszeit. Viele schnelle Züge in 45 s → bei Hand-Arm-Beschwerden Pausen.

## 7. Einflussfaktoren und Messgrenzen

- **Hoher Zufallsanteil:** Ohne Bewegung 22–67 % überstandene Wellen (≈ 1.860 Punkte); Punkte mischen Leistung,
  Serienbonus und Zufall. Aussagekräftiger wäre der Anteil überstandener Wellen je Warnzeit.
- **Keine Reaktionszeitmessung:** Erfasst wird nur „drin/draußen“ im Detonationsmoment; die Hinweise zu
  `performance.now()` und „< 5 ms Messrauschen“ sind für dieses Spiel irreführend.
- **Gerät:** Feldgröße (Container/Vollbild), Abstand und Empfindlichkeit ändern Exzentrizität und Weg → nur Vergleich
  mit sich selbst auf demselben Gerät.
- **Alter:** einfache Reaktionszeit + 0,55 ms pro Lebensjahr, v. a. motorisch (Woods et al., 2015); Warnzeiten unter
  0,7 s dürften für viele Ältere frustrierend sein (eigene Einschätzung, nicht untersucht). Strategiewechsel steigern Punkte rasch, ohne neue Grundfähigkeit.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Wahlreaktions- und Suchaufgaben werden mit Übung zuverlässig schneller (Proctor & Schneider,
  2018; Simons et al., 2016); zu diesem Spiel gibt es keine Studie.
- **Naher Transfer – schwach:** auf ähnliche räumliche Wahlreaktionen am Bildschirm plausibel, aber ungeprüft.
- **Alltagstransfer – fehlend:** kein Beleg für Sport, E-Sport, Verkehr oder „periphere Wahrnehmung im Alltag“;
  Hirntraining überträgt sich allgemein kaum (Simons et al., 2016), Actionspiel-Befunde betreffen andere Spiele und viel
  längere Trainingszeiten (Bediou et al., 2018). Keine Körperübung: keine Aussagen zu Gleichgewicht oder Stürzen.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** schnelle räumliche Entscheidungen unter Zeitdruck geübt werden sollen, Aufmerksamkeit über eine
  große Fläche verteilt werden soll oder eine kurze, motivierende Maus-Übung für Jugendliche/Gamer gesucht wird.
- **Weniger passend, wenn …** Gleichgewicht, Körperkoordination oder Sturzprävention das Ziel sind (dafür echte Übungen
  im Stehen); nur ein Tablet vorhanden ist; eine verlässliche Messung erwartet wird; wenig Zeitdruck gewünscht ist
  (dann 103 oder 108).
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Bernsteinpuls ≈ 2 Hz auf bis zu 7/9 der Fläche, rote
    Vollflächen alle 0,8–1,75 s, Rotblitz und Wackeln bei Treffern; unter 3 Hz, aber gesättigtes Rot und große Fläche
    gelten als Risikomerkmale (Harding et al., 2005).
  - `gesichtsfeldausfall`: Eckzellen 11–19° exzentrisch; Absuchen unter Zeitdruck ist unfair.
  - `presbyopie_gleitsicht`: äußere Spalten außerhalb des schmalen Zwischenfelds (Han et al., 2003); kleines Fenster,
    Kopf mitdrehen, ggf. Arbeitsplatzbrille (Hinweis, keine Beratung).
  - `hand_arm_beschwerden`: viele schnelle Züge; nicht „explosiv“ und ohne Handballen-Druck spielen.
  - `aufmerksamkeitsprobleme`: sehr hoher Zeitdruck, rote Fehler-Rückmeldung kann frustrieren.
- **Kombiniert gut mit …** 803 (Maus-Ausweichen), 801/401 (peripheres Erfassen), 202 (Wahlreaktion), 103/108 (Suche ohne
  Zeitdruck als Vorstufe), 501/702 (Zielbewegungen). **Abgrenzung in der Gruppe 806–811:** keine Dublette – 806 ist die einzige Wahlreaktion
  mit Ortswahl; die übrigen fünf sind Auge-Hand-, Steuerungs- bzw. Gedächtnisaufgaben. Nächstverwandt ist 803
  (Ausweichen vor bewegten Geschossen statt Wahl eines sicheren Feldes).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Tablet/Touch:** sicheres Feld antippen statt Zeiger ziehen (Tippzeit eindeutig messbar); optional Finger schieben als
  Auge-Hand-Variante.
- **Messung:** pro Welle Entscheidungszeit, Treffer, unnötige Wechsel und Exzentrizität protokollieren; Warnzeit
  adaptiv (Treppenverfahren, Ziel ≈ 80 %) statt fester Levelkurve; nur Vergleich mit sich selbst, keine Perzentile.
- **Fairness:** Zufallsanteil senken (z. B. eigenes Feld immer mitbedroht oder nur nötige Wechsel werten).
- **Sicherheit:** Warnung statisch statt pulsierend, kein Rot, kein Vollbild-Blitz, kein Wackeln, Fläche begrenzen.
- **Sehwinkel/Farbe:** Feld z. B. ≈ 20° × 12° bei bekanntem Abstand (Option „kleines Feld“ für Gleitsicht); Warnung
  zusätzlich über Muster und Helligkeit kodieren. Keine Transfer-, Reflex- oder Normversprechen.

## 11. Quellen

### Von der Website angegeben

- Posner, M. I. (1980). Orienting of attention. *Quarterly Journal of Experimental Psychology, 32*(1), 3–25.
  https://doi.org/10.1080/00335558008248231 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise
  (verdeckte Aufmerksamkeitsverlagerung ja; „9 Zellen simultan“, Zeitersparnis, Normen nein).
- Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology, 12*(1), 97–136.
  https://doi.org/10.1016/0010-0285(80)90005-5 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (parallele Entdeckung
  von Merkmalen ja; gesucht ist aber das Feld ohne Merkmal; „periphere Bewegungsempfindlichkeit“ nicht Inhalt).
- Woodworth, R. S. (1899). The accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3),
  i–114. https://doi.org/10.1037/h0092992 – **Prüfung:** DOI stimmt ✓ (Crossref-Titel ohne „The“); **stützt:**
  teilweise (Zwei-Komponenten-Modell ja; „Reibungsbremsung an Zellgrenzen“ nein).
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement.
  *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓;
  **stützt:** teilweise (Gesetz korrekt; bei so großen Zellen wenig relevant; Kleinhirn-Aussage nicht aus der Quelle).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple
  reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI
  stimmt ✓ (131 = Artikelnummer); **stützt:** nein für die Normtabelle (einfache Reaktionszeit, keine Spielnormen),
  teilweise für Hardwareverzögerungen („< 5 ms = Rauschen“ nicht aus der Quelle).

### Weitere Fachliteratur

- Abrams, R. A., Meyer, D. E., & Kornblum, S. (1990). Eye-hand coordination: Oculomotor control in rapid aimed limb
  movements. *Journal of Experimental Psychology: Human Perception and Performance, 16*(2), 248–267.
  https://doi.org/10.1037/0096-1523.16.2.248 – Blick zum Ziel verbessert die Treffgenauigkeit der Hand.
- Bediou, B., Adams, D. M., Mayer, R. E., Tipton, E., Green, C. S., & Bavelier, D. (2018). Meta-analysis of action video
  game impact on perceptual, attentional, and cognitive skills. *Psychological Bulletin, 144*(1), 77–110.
  https://doi.org/10.1037/bul0000130 – Actionspiel-Interventionen g = 0,34; veröffentlichte Effekte wegen Publikationsbias ≈ 30 % größer als in der
  Gesamtliteratur geschätzt. Korrektur mit Zusatzanalysen: *Psychological Bulletin, 144*(9), 978–979,
  https://doi.org/10.1037/bul0000168.
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A,
  29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Farbsehschwäche.
- Corbetta, M., & Shulman, G. L. (2002). Control of goal-directed and stimulus-driven attention in the brain. *Nature
  Reviews Neuroscience, 3*(3), 201–215. https://doi.org/10.1038/nrn755 – dorsales/ventrales Aufmerksamkeitsnetzwerk.
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed
  aiming. *Psychological Bulletin, 127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – Woodworth-Modell.
- Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye
  movements. *Experimental Brain Research, 57*(1), 191–195. https://doi.org/10.1007/BF00231145 – Sakkadenlatenzen.
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when
  reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative
  Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm.
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures:
  Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425.
  https://doi.org/10.1111/j.1528-1167.2005.31305.x – Grenzwerte für Blitz- und Rotreize.
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement.
  *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blickverankerung (155 ms).
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of
  Experimental Psychology, 71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 – Wahlreaktion, Übung.
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web
  applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382.
  https://doi.org/10.3758/s13428-019-01321-2 – Messgrenzen im Browser/Touch.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L.
  (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186.
  https://doi.org/10.1177/1529100616661983 – Transfer von Hirntraining.
- Treisman, A., & Souther, J. (1985). Search asymmetry: A diagnostic for preattentive processing of separable features.
  *Journal of Experimental Psychology: General, 114*(3), 285–310. https://doi.org/10.1037/0096-3445.114.3.285 –
  Merkmalsabwesenheit wird weniger effizient gefunden.
- Yantis, S., & Jonides, J. (1984). Abrupt visual onsets and selective attention: Evidence from visual search. *Journal
  of Experimental Psychology: Human Perception and Performance, 10*(5), 601–621.
  https://doi.org/10.1037/0096-1523.10.5.601 – plötzlich auftauchende Reize ziehen Aufmerksamkeit an.
