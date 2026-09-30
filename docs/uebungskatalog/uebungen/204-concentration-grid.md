---
# ===== Kennung =====
nr: 204
kennung: concentration-grid
name: "Schulte-Tabelle (Konzentrationsgitter, Zahlen der Reihe nach antippen)"
name_original: "Schulte-Tabelle online – Konzentrationsgitter (Concentration Grid Trainer)"
kapitel: "Kognition & Aufmerksamkeit"
kapitel_original: "cognitive"
unterkapitel_original: "focus"
quelle_url: "https://skilldrills.online/de/drills/cognitive/focus/concentration-grid"
blickfit_umsetzung: {kennung: "zahlenjagd", name: "Zahlenjagd", unterschiede: "Raster 3×3 bis 7×7 (Wechselpfad 1–A–2–B–3 als eigene Stufen), Zellen ≥ 12 mm und Ziffern ≥ 1° statt 12,5-px-Schrift, gefundene Zahlen bleiben sichtbar (Suchmenge bleibt gleich), aufeinanderfolgende Zahlen nie direkt benachbart, keine Drehung, adaptive Stufen mit Zeitziel statt Punkte-Bonus, Sitzung ≈ 60 s mit immer fertig gespielter Tafel, keine Behauptung zu peripherem Sehen oder Schnelllesen"}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Auf einem Raster stehen die Zahlen 1 bis n² durcheinander. Man tippt sie so schnell wie möglich in aufsteigender Reihenfolge an; ist das Raster fertig, kommt ein größeres (3×3 bis 8×8). Nach 45 Sekunden ist Schluss."
ziel_funktionen: [visuelle_suche, sakkaden, verarbeitungsgeschwindigkeit]
eingabe: [maus, touch]
tablet_geeignet: ja
dauer_sekunden: 45
schwierigkeit_anpassung: "Nach jedem gelösten Raster wächst die Größe um eine Stufe (3×3 → 4×4 → … → 8×8; auf Bildschirmen unter 380 px Breite höchstens 7×7). Ab 5×5 sind die Ziffern einzeln zufällig gedreht (5×5 und 6×6 um bis zu ±12°, ab 7×7 um bis zu ±20°). Jede Sitzung beginnt wieder bei 3×3; ein Einstellen der Stufe gibt es nicht."
messgroessen: ["Punkte (pro Treffer 100 plus 0–120 Zeitbonus, plus Rasterbonus)", "Genauigkeit (richtige Tipps in Prozent aller Tipps)", "gelöste Raster", "größtes erreichtes Raster", "Bestwerte nur im Browser (localStorage)", "sinnvoll zusätzlich: Median der Zeit pro Zahl je Rastergröße, Fehltipps je Raster"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 2
    kontrast: 1
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 0
    sakkaden: 3
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 3
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 2
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 3
    antizipation: 0
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 2
    zielbewegung_tempo: 2
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 1
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Ziffern von ≈ 9 px Höhe (8×8) müssen bei normalem Abstand (≈ 40 cm) erkennbar sein – Lese- oder Nahbrille passend zum Tablet-Abstand", "Zahlen 1–64 kennen (Ziffernreihenfolge)", "Tippen auf einem Touchscreen oder Klicken mit der Maus", "Bereitschaft, unter Zeitdruck (45 s) zu suchen"]
vorsicht_bei: [presbyopie_gleitsicht, sehbehinderung_niedriger_visus, gesichtsfeldausfall, nystagmus, kopfschmerz_asthenopie, trockenes_auge_bildschirm, aufmerksamkeitsprobleme, kognitive_einschraenkung, kinder_unter_6]
geeignet_fuer: ["geordnetes visuelles Absuchen und Tempo bei der Suche nach Zahlen üben", "kurze Konzentrationsübung ohne Blitzreize, Bewegung oder Ton-Zwang", "Vergleich der eigenen Zeiten über Wochen auf demselben Gerät (Übungseffekt)", "als Vorbereitung auf Trail-Making-ähnliche Aufgaben (Zahlenfolge mit Blicksuche)"]
weniger_geeignet_fuer: ["Ziel „peripheres Sehen“, „Gesichtsfeld erweitern“ oder „Schnelllesen“ – dafür gibt es keinen Beleg", "Personen mit Gleitsicht am Tablet ohne passende Nahbrille (kleine Ziffern am Rand, seitliche Unschärfe)", "Personen, die keine Zeitdruck- oder Wettkampfstimmung wollen", "Verlaufsmessung mit vergleichbaren Zahlen (Punkte hängen von Tempo, Rastergröße und Zufall ab)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Für die Schulte-Tabelle selbst gibt es kaum Trainingsstudien; sie wird meist als Messaufgabe eingesetzt. Für das verwandte Trail Making sind deutliche Übungseffekte bei Wiederholung belegt (Buck et al., 2008; Calamia et al., 2012), Suchaufgaben werden mit Übung effizienter (Sireteanu & Rettenbach, 2000). Dass das Gesichtsfeld, das periphere Sehen oder das Lesetempo wächst, ist nicht belegt (Rayner et al., 2016)."
aehnliche_uebungen: [103, 108, 207, 206, 208, 201, 202, 603, 401]
stichworte: ["Schulte-Tabelle", "Schulte table", "Konzentrationsgitter", "visuelle Suche", "Zahlensuche", "Trail Making", "Sakkaden", "Suchtempo", "Verarbeitungsgeschwindigkeit", "Zahlenjagd"]
---

# 204 · Schulte-Tabelle (Konzentrationsgitter, Zahlen der Reihe nach antippen)

> Original: „Schulte-Tabelle online – Konzentrationsgitter“ („Concentration Grid Trainer“) – skilldrills.online,
> Kapitel Kognition & Aufmerksamkeit (`cognitive`, Unterkapitel `focus`) · Blickfit: Zahlenjagd (umgesetzt, verändert)

## 1. Kurzbeschreibung

Ein quadratisches Raster zeigt die Zahlen von 1 bis zur Zellenzahl in zufälliger Anordnung. Man tippt sie in der
Reihenfolge 1, 2, 3 … an. Gefundene Felder werden ausgegraut. Ist das Raster fertig, folgt sofort das nächstgrößere
(3×3, 4×4 bis 8×8). Nach 45 Sekunden endet die Sitzung; Fehltipps beenden sie nicht. Es geht um Suchtempo und
Ausdauer beim Suchen, nicht um Reaktion, Gedächtnis oder Genauigkeit der Hand.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Chunk `27815-…js` und Seiten-Chunk, Stand 30.09.2026); nur
Mechanik ausgewertet. Grad-Werte sind eigene Umrechnungen (Tablet ≈ 36 CSS-px pro Grad bei 40 cm, [H]).

- **Ablauf (Code):** Countdown 3-2-1-GO (≈ 2,5 s, mit Tönen) → 45 s → Ergebnisbildschirm mit Punkten, Genauigkeit,
  gelösten Rastern, größtem Raster. Vollbild-Modus; Abbruch mit Escape oder Verlassen des Vollbilds.
- **Raster (Code):** Start immer bei 3×3 (die gespeicherte Bestleistung wird zwar abgelegt, aber die Startstufe
  liefert im Code immer 3). Nach jedem gelösten Raster eine Stufe größer bis 8×8 (7×7 bei < 380 px Breite).
  Jedes Raster wird neu gemischt. Die Zeit läuft über die Raster hinweg weiter (kein Bonus).
- **Größe der Anzeige (Code):** Quadrat mit Seitenlänge min(76 % der Breite, 46 % der Höhe). Auf einem Tablet im
  Hochformat (≈ 820 × 1180 px) ≈ 540 px ≈ 15°, quer ≈ 380 px ≈ 10,5°, am Handy (390 px breit) ≈ 296 px. Zellenlücke
  8 px (bis 5×5) bzw. 4 px (ab 6×6). Zellen 3×3 ≈ 170 px, 8×8 ≈ 45–60 px (Tablet), am Handy ≈ 33 px.
- **Ziffernhöhe (Code + Rechnung):** Schriftgröße = max(12, min(24, 100/n)) px: 3×3 und 4×4 24 px, 5×5 20 px,
  6×6 ≈ 17 px, 7×7 ≈ 14 px, 8×8 **12,5 px**. Ziffernhöhe ≈ 0,7 × Schriftgröße (Erfahrungswert, [H]): bei 8×8 ≈ 9 px ≈ 0,24° ≈
  15 Bogenminuten, grob 0,5 logMAR (bei 3×3 ≈ 0,47°, ≈ 0,1 logMAR höher lesbar).
- **Drehung (Code):** Ziffern in Zellen einzeln zufällig gedreht: 5×5 und 6×6 um −12° bis +11°, ab 7×7 um −20° bis +19°;
  gefundene Zellen werden nicht mehr gedreht. Text sagt nur „leichte Rotationsverzerrungen ab 5×5“.
- **Treffer-/Fehlerlogik (Code):** Berührung zählt beim Aufsetzen (`pointerdown`), nicht beim Loslassen. Richtige
  Zahl: Treffer; falsche Zahl: kurzer roter Bildschirmschimmer (≈ 480 ms, Ton), Fehltipp zählt für die Genauigkeit,
  **keine Zeit- oder Punktstrafe**. Bereits gefundene Zahlen sind deaktiviert (Tipps darauf zählen nicht).
- **Punkte (Code):** je Treffer 100 + Zeitbonus (1.200 ms − Abstand zum letzten Treffer, ÷ 10, höchstens 120; der
  Abstand zählt ab dem Aufbau des Rasters bzw. dem letzten Treffer); Rasterbonus n²/9 × 500 (3×3: 500, 4×4: 889, 5×5:
  1.389, 8×8: 3.556). Rechenbeispiel mit gleichbleibend 1,0 s je Zahl in 45 s: 45 Treffer, 5×5 erreicht, ≈ 6.800
  Punkte; mit 0,6 s: 74 Treffer, 6×6, ≈ 14.600; mit 2 s: 22 Treffer, 4×4, ≈ 2.700 [H, aus dem Code].
- **Zeitgeber (Code):** `setInterval` alle 100 ms zieht 0,1 s ab (nicht an der Uhr gemessen) – bei gedrosselten
  Tabs oder Last kann die Sitzung länger als 45 s dauern.
- **Widersprüche Text ↔ Code:** (1) Die Leistungstabelle (8.000+ Punkte = 7×7, < 300 ms je Ziffer) passt nicht zur
  Punkteformel: 8.000 Punkte erreicht man rechnerisch schon bei ≈ 0,9 s je Zahl im 5×5/6×6-Raster; 300 ms je Ziffer
  würden 150 Treffer in 45 s bedeuten (Raster 8×8 nach ≈ 100 Treffern), unrealistisch. (2) Die englische
  Ersatzbeschreibung im Code spricht von „one careless tap costs a life“ – im Code gibt es kein Leben. (3) „Rotation ab 5×5“
  trifft zu, wird aber ab 7×7 deutlich stärker. (4) „Vergrößert das Gesichtsfeld“ ist nicht Teil der Mechanik.

## 3. Was die Website sagt – und wie das einzuordnen ist

**Aussagen der Website:** Die Schulte-Tabelle sei ein „psychodiagnostisches Verfahren zur Vergrößerung des
peripheren Gesichtsfeldes und zur Reduktion der Fixationslatenz“ (Lu et al., 2022; Rayner, 1998); sie schule
Sakkaden, „mikrosakkadische Effizienz“, „parafoveales Vorab-Caching“ und die „perzeptuelle Blickspanne“, helfe Schnellleser:innen,
Athlet:innen, Pilot:innen, E-Sportler:innen. Sie sei 1962 vom Psychiater Walter Schulte in Tübingen entwickelt
worden; ein „Konzentrationsgitter“ nutzten Spitzentrainer (Harris & Harris, 1984). Empfohlen: Blick starr auf die
Gittermitte, Zahlen „peripher“ finden, 2 Ziffern vorausdenken, nicht innerlich mitsprechen. Leistungsstufen D bis S+ mit
Punkten, Gittergröße und „Suchlatenz“ je Ziffer; Richtwert 5×5 unter 30 s = überdurchschnittlich; Training 5–10
Durchgänge täglich für „optimale neuroplastische Anpassungen“.

**Einordnung:**
- **Peripheres Sehen / Blickspanne / Schnelllesen: nicht belegt.** Lu et al. (2022) ist eine EEG-Studie mit 27
  Schulkindern (8–11 Jahre) **ohne Training und ohne Gesichtsfeldmessung**. Die Reihenfolge-Suche dauerte länger
  als die Ortssuche und zweifarbige länger als einfarbige; EEG-Unterschiede fanden sich nur bei der Ortssuche, nicht bei der
  Reihenfolge-Suche. Die Autorenliste der Website ist außerdem falsch (richtig: Lu, Wang, He, Zhongcheng, Zhang, Li).
  Die Wahrnehmungsspanne beim Lesen ist sprachlich, nicht durch das Sehen begrenzt; Vergrößern der Randbuchstaben
  vergrößerte sie nicht, und Trainings, Wörter am Rand zu erkennen, brachten kein schnelleres Lesen mit Verständnis
  (Rayner et al., 2016 – die Quelle widerspricht der Aussage der Seite).
- **Mikrosakkaden:** Das sind winzige Bewegungen während einer Fixation (Rolfs, 2009); die Suchsprünge im Raster sind
  gewöhnliche Sakkaden von mehreren Grad. Die Aussage vermischt beides.
- **Crowding:** Die Website nennt Wolfe (2007), doch Guided Search ist ein Suchmodell. Crowding (Nachbarn stören die Erkennung)
  belegen Bouma (1970), Pelli & Tillman (2008), Whitney & Levi (2011).
- **Leistungstabelle, Suchlatenz, „5×5 unter 30 s“:** ohne Datengrundlage. Die Seite erhebt nach eigener Angabe keine
  Nutzerdaten, und keine der Quellen enthält Schulte-Normen. Die Tabelle passt zudem nicht zur Punkteformel (Abschnitt 2).
- **Herkunft „Schulte 1962, Tübingen“:** nicht prüfbar. Walter Schulte (1910–1972) leitete 1960–1972 die Tübinger
  Universitätsnervenklinik; eine Originalveröffentlichung der Tabelle wurde nicht gefunden. In der Literatur erscheint sie
  fast nur als Messinstrument in russischsprachigen Studien.
- **Dosis „5–10 Durchgänge täglich, neuroplastisch optimal“:** ohne Quelle.
- **Trail-Making-Bezug:** Fedotov et al. (2026, 69 Personen) fanden bei Gesunden und Personen mit Schizophrenie einen Zusammenhang
  zwischen Zeit im Trail Making Test und in der Zahlensuche mit Schulte-Tabellen; das stützt „misst Suchtempo“, nicht „trainiert die Peripherie“.
- **Nicht medizinisch:** Die Seite schreibt selbst, sie sei kein Diagnose- oder Screening-Verfahren; das gilt auch für unsere Verwendung.

## 4. Optische und okulomotorische Grundlagen

- **Serielle Suche mit Sakkaden:** Bei Suchaufgaben dauern Fixationen im Mittel ≈ 210 ms bei Sakkaden von ≈ 5,7°
  (Lesen: 254 ms, 2,4°; Rayner et al., 2007). Ein Raster von 10–15° Breite wird also mit mehreren Blicksprüngen abgesucht; ein
  Blick starr auf die Mitte ist kaum durchhaltbar und nicht sinnvoll. Die Sakkadenlatenz ist mit 20–30 Jahren am kürzesten und
  bei 60–79-Jährigen länger (n = 168; Munoz et al., 1998).
- **Sehwinkel:** 8×8-Ziffern am Tablet ≈ 0,24° hoch (≈ 15 Bogenminuten) und damit nur knapp über dem, was gesunde Ältere
  bequem lesen: kritische Schriftgröße 0,08 logMAR (8–23 J.), 0,21 (68 J.), 0,34 (81 J.) (Calabrèse et al., 2016). Wer
  unkorrigiert alterssichtig ist, verliert vor allem bei 7×7 und 8×8 Zeit, und zwar durch Nahschärfe, nicht durch Suchfähigkeit.
- **Crowding und „Peripherie“:** Der kritische Abstand, in dem Nachbarn die Erkennung stören, beträgt ≈ die Hälfte der Exzentrizität
  (Bouma, 1970; Pelli & Tillman, 2008). Beim 8×8-Raster (Ziffernabstand ≈ 1,3°) sind Zahlen, die ≳ 2,6° neben dem Blickpunkt
  liegen, von Nachbarn und Drehung gestört; das Raster wird daher nur mit Blickbewegungen gelöst [H]. Die Schulte-Tabelle
  bringt die „nutzbare Sehfeld“-Fähigkeit (UFOV, Ball et al., 1988) nur als Nebeneffekt ins Spiel; ein Training der Peripherie ist nicht belegt.
- **Drehung:** Einzeln gedrehte Ziffern (bis ±20°) erschweren die Erkennung, zusätzlich fallen 6 und 9 leichter zusammen.
- **Brille (Optiker-Bezug):** Das Raster füllt 10–15° des Blickfeldes und liegt unten am Tablet-Ständer. Bei Gleitsicht
  werden Mitte und unteres Raster durch die Zwischen- und Nahzone gesehen; Ränder liegen in seitlichen Unschärfezonen, deren
  Breite sich zwischen Glasdesigns um mehr als das Doppelte unterscheidet (Sheedy, 2004). Gleitsicht-Neulinge weichen auf Kopfbewegungen aus
  (Hutchings et al., 2007). Günstig: Arbeitsplatz-/Nahbrille für den Tablet-Abstand (Smartphone-Abstände 32–36 cm, Tablet ≈ 40 cm).
- **Farbsehen, Kontrast:** Keine Farbe im Spiel (weiß auf dunkel), also unproblematisch bei Farbsehschwäche (≈ 8 % der
  Männer).
- **Trockenes Auge:** 45 s intensives Suchen ohne Lidschlag-Pause; bei mehreren Durchgängen hintereinander auf Pausen achten.

## 5. Neurowissenschaftliche Grundlagen

- **Suche und Aufmerksamkeit (Lehrbuchwissen, für diese Übung nicht gemessen):** Visuelle Suche wird durch ein
  Netzwerk aus frontalem Augenfeld, Scheitellappen (intraparietaler Sulcus) und Colliculus superior gesteuert, das eine „Prioritätskarte“ des
  Blickfeldes für die nächste Blickbewegung führt; das Guided-Search-Modell beschreibt, wie merkmalsgeführte Hinweise diese
  Karte formen (Wolfe, 2007). Wer nach „5“ sucht, hält das Ziel im Arbeitsgedächtnis (dorsolateraler präfrontaler Kortex) und
  prüft, ob die Zahl passt (Treisman & Gelade, 1980: Merkmalsverbindungen werden seriell geprüft).
- **Was Studien zur Schulte-Tabelle zeigen:** Lu et al. (2022) fanden bei 27 Kindern in der Reihenfolge-Suche
  längere Suchzeiten als in der Ortssuche; Hirnregionen wurden nicht lokalisiert. In EEG-Studien wird die Tabelle als Aufgabe
  beschrieben, die visuelle Suche, Arbeitsgedächtnis und Rechnen zugleich fordert (Khramova et al., 2021). Aussagen wie
  „trainiert Region X“ lassen sich daraus nicht ableiten. Trail Making spiegelt vor allem Verarbeitungstempo und fluide Fähigkeiten
  (Salthouse, 2011; > 3.600 Erwachsene).

## 6. Motorische Grundlagen

Motorisch ist die Übung einfach: ein Tipp pro Zahl auf ein großes Ziel (3×3: ≈ 170 px, 8×8: ≈ 45–60 px, am Handy ≈ 33 px).
Nach Fitts' Gesetz hängt die Bewegungszeit von Abstand zu Zielbreite ab (Fitts, 1954); bei diesen großen Zielen fällt der
Anteil gering aus, die Zeit steckt überwiegend in Suchen und Entscheiden. Die Berührung zählt schon beim Aufsetzen, ein
Doppeltipp oder Tremor trifft dann unter Umständen ein falsches Feld. Touch-Web-Apps messen Zeiten mit ≈ 58–70 ms
zusätzlicher Verzögerung (Pronk et al., 2020); bei Zeiten von 0,5–1 s je Zahl ist das wenig, macht aber Vergleiche zwischen Geräten unscharf.

## 7. Einflussfaktoren und Messgrenzen

- **Alter und Verarbeitungstempo:** Zeiten steigen mit dem Alter, bei Trail Making überlappen die Altersunterschiede fast
  vollständig mit Verarbeitungstempo und fluiden Fähigkeiten (Salthouse, 2011).
- **Gerät:** Rastergröße hängt von Bildschirmhöhe und -breite ab (Quadrat aus 46 % Höhe): quer am Tablet kleiner (≈ 10°) als hochkant (≈ 15°); Ziffern
  bleiben gleich klein, die Wege werden kürzer. Ergebnisse zwischen Geräten sind daher nicht vergleichbar. Gleiche Bildwiederholrate
  (16,7 ms je Bild bei 60 Hz) spielt bei Sekundenzeiten keine Rolle.
- **Übungseffekte und Messgüte:** Wiederholung senkt die Zeit deutlich (Buck et al., 2008; Calamia et al., 2012), ein Teil des
  Effekts ist Merken von Positionen (nur bei wiederholten Rastern – im Original sind die Raster neu gemischt, das begrenzt dies). Dagegen
  stützt der Ausgraueffekt die Suche: Mit jeder Zahl wird die Suchmenge kleiner, sodass die letzten Zahlen viel leichter zu
  finden sind als die ersten – **Zeit je Zahl ist daher nicht über das Raster konstant**.
- **Punkte:** Punkte enthalten Tempo, Rastergröße und Zufall (welche Zahl liegt wo) und sind nicht mit den Leistungsstufen der Seite zu deuten (Abschnitt 2).
- **Müdigkeit, Nahsicht:** Kurze Sitzungen; bei Beschwerden Pause.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt: stark (indirekt).** Direkte Trainingsstudien zur Schulte-Tabelle bei Gesunden mit Kontrollgruppe haben wir nicht
  gefunden. Für Trail Making sind Übungseffekte bei Wiederholung deutlich, auch mit Parallelformen (Buck et al., 2008; Calamia et
  al., 2012, Metaanalyse). Wahrnehmungslernen in Suchaufgaben ist schnell und langanhaltend; einfache Suche kann mit Übung parallel werden
  (Sireteanu & Rettenbach, 2000). Bei Zahlen im Raster ist vermutlich vor allem Strategie (Reihe für Reihe, Vorausschau) im Spiel [H].
- **Naher Transfer: schwach.** Übertragung auf andere Suchaufgaben bei Wahrnehmungslernen ist teils breit (Sireteanu & Rettenbach, 2000),
  aber für Zahlen-Raster-Training nicht geprüft; auf Trail Making selbst fehlt der Nachweis.
- **Alltagstransfer: fehlend.** Kein Beleg für besseres Lesen, Sport, Fahren oder „peripheres Sehen“ (Rayner et al., 2016). Nur
  Analogie: geordnetes Suchen in Fahrplan, Formular, Regal.
- **Seriöse Formulierung:** „Du übst, Zahlen der Reihe nach zu finden. Mit Übung wirst du darin schneller; ob das im Alltag hilft, ist nicht belegt.“

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand geordnetes Suchen und Suchtempo unter leichtem Zeitdruck üben will; eine Aufgabe ohne Farbe,
  Ton-Zwang und Bewegung gesucht wird (`visuelle_suche` 3, `sakkaden` 3, `verarbeitungsgeschwindigkeit` 3).
- **Weniger passend, wenn …** peripheres Sehen, Gesichtsfeld oder Lesetempo das Ziel sind (kein Beleg; 103/108/401 oder 801 prüfen);
  Verlaufsmessung mit vergleichbaren Werten gewünscht ist; wenig Nahsehschärfe für ≈ 9-px-Ziffern (8×8) vorhanden ist. Dann ist die
  Blickfit-**Zahlenjagd** die bessere Wahl (größere Ziffern, ehrlicher formuliert, adaptiv).
- **Vorsicht / anpassen bei …**
  - `presbyopie_gleitsicht`: Raster füllt 10–15°, Rand in seitlichen Unschärfezonen; Kopf statt Augen bewegen; Nahbrille einsetzen.
  - `sehbehinderung_niedriger_visus`, `gesichtsfeldausfall`: ≈ 9-px-Ziffern (8×8), gedreht; Ausfälle im Feld verlangen mehr Suche.
  - `nystagmus`, `kopfschmerz_asthenopie`, `trockenes_auge_bildschirm`: viele schnelle Blicksprünge bei Zeitdruck.
  - `aufmerksamkeitsprobleme`, `kognitive_einschraenkung`, `kinder_unter_6`: Zeitdruck, feste 45 s, Zahlen bis 64 kennen; kann frustrieren.
    Kein Test- oder Therapieanspruch.
  - `photosensitive_epilepsie`: nur ein roter Schimmer bei Fehltipps (≈ 480 ms), keine Dauerreize; trotzdem beachten.
- **Kombiniert gut mit …** 103 und 108 (visuelle Suche), 207 (Zeichen-Zahl-Zuordnung, Verarbeitungstempo), 206 (Aufgabenwechsel, wie Wechselpfad der Zahlenjagd), 208 (Ausdauer).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

Die Blickfit-Umsetzung **Zahlenjagd** (`src/exercises/zahlenjagd/`) behält das Prinzip und behebt die wichtigsten Schwächen:

- **Gefundene Zahlen ausgegraut** (Original) verkleinern die Suche; **Blickfit:** gefundene Zahlen bleiben gleich sichtbar (nur ein
  Punkt in der Ecke), Suchmenge bleibt gleich groß. Auf der Profi-Stufe fehlen Punkt und „Nächste“-Anzeige (Reihenfolge merken).
- **Ziffern winzig (12,5 px bei 8×8), gedreht:** **Blickfit:** Zellen ≥ 12 mm (≈ 63 px), nie unter 9 mm (50 px); Ziffernhöhe ≈ 0,42 × Zelle (Tablet ≥ 1°); auf schmalen
  Bühnen 7×7 → 6×6; Raster 3×3 bis 7×7, keine Drehung.
- **Zufällige Nähe der Zahlen** erlaubt Erraten des Wegs; **Blickfit:** aufeinanderfolgende Zahlen nie nebeneinander (bis 4×4 nicht Kante an Kante, ab 5×5 auch nicht über Eck).
- **Kein Regelwechsel:** **Blickfit:** Wechselpfad 1 – A – 2 – B – 3 (Prinzip Trail Making B), Zahlen in Kreisen, Buchstaben (A–L) in Quadraten – Unterscheidung über die Form, nicht die Farbe.
- **Punkte mit Zeitbonus, Uhrendrift, Leistungstabelle ohne Daten:** **Blickfit:** adaptiv je Tafel (Zeitziel = Felder × (0,45 s + 0,025 s × Felder), beim Wechselpfad × 1,4; im Ziel → nächste Stufe, deutlich langsamer → leichter),
  Sitzung ≈ 60 s ohne Zeitbonus, angefangene Tafel wird fertig gespielt (höchstens 20 s Überzug; harte Grenze 160 s); Hauptwert: erreichte Stufe, dazu Zeit pro Zahl (Median), Tafeln, Fehltipps.
- **Falschtipp:** **Blickfit:** Zelle wackelt kurz (bei „Bewegung reduzieren“ roter Rahmen), keine Zeitstrafe; Tipps auf gefundene Zahlen werden ignoriert.
- **Behauptungen:** **Blickfit-Text** sagt: übt geordnetes Suchen und Tempo, Alltagstransfer nicht belegt; „peripheres Sehen“ und „Schnelllesen“ werden ausdrücklich nicht behauptet (science.ts).
- Sprachen DE/IT, keine Farbe als Merkmal, Touch (Mindestgröße), Bewegung reduzieren berücksichtigt.
- **Weitere Empfehlungen:** Zeit je Rastergröße getrennt ausweisen (nicht mischen), Nahbrille-Hinweis im Vorspann.

## 11. Quellen

### Von der Website angegeben
- Lu, A., Wang, D., He, S., Zhongcheng, Q., Zhang, W., & Li, Z. (2022). Attention mechanisms underlying dual-color digital visual search based on Schulte grid: An event-related potential study. *Brain and Behavior*, *12*(2), e2471. https://doi.org/10.1002/brb3.2471 – **Prüfung:** DOI stimmt ✓ (Website-Autorenliste „Lu, Y., Wang, X., He, J., & Zhang, Y.“ **falsch**); **stützt die Aussage der Website:** nein/teilweise – ERP-Studie an 27 Kindern (8–11 J.) ohne Training und ohne Gesichtsfeldmessung; „Farbdistraktoren verzögern EEG-Latenzen“ verdreht: EEG-Unterschiede nur bei der Ortssuche, nicht bei der Reihenfolge-Suche.
- Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology*, *12*(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (erklärt serielle Suche nach Merkmalsverbindungen; sagt nichts über Sakkadentraining).
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin*, *124*(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (Vorschau-Nutzen beim Lesen belegt) / nein für „Schulte vergrößert die Blickspanne“ (Spanne sprachlich bedingt).
- Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So much to read, so little time: How do we read, and can speed reading help? *Psychological Science in the Public Interest*, *17*(1), 4–34. https://doi.org/10.1177/1529100615623267 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein (Übersicht widerspricht der Schnelllese-Aussage: Trainings von Randwörtern brachten kein schnelleres Lesen mit Verständnis).
- Wolfe, J. M. (2007). Guided Search 4.0: Current progress with a model of visual search. In W. D. Gray (Hrsg.), *Integrated models of cognitive systems* (S. 99–119). Oxford University Press. https://doi.org/10.1093/acprof:oso/9780195189193.003.0008 – **Prüfung:** DOI stimmt ✓ (Buchkapitel); **stützt die Aussage der Website:** nein (Suchmodell, kein Crowding-Beleg).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, *9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (16,7 ms je Bild bei 60 Hz ist eine Rechnung, nicht Thema der Studie).
- *Nur im Text:* Harris, D. V., & Harris, B. L. (1984). *The athlete's guide to sports psychology: Mental skills for physical people*. Leisure Press. – Buch, keine DOI; **Prüfung:** Existenz bestätigt, Inhalt nicht geprüft; kein Wirksamkeitsbeleg. „Schulte 1962“: keine Quelle angegeben, nicht auffindbar. Leistungsstufen und „5×5 unter 30 s“: ohne Quelle, keine Datengrundlage.

### Weitere Fachliteratur
- Ball, K. K., Beard, B. L., Roenker, D. L., Miller, R. L., & Griggs, D. S. (1988). Age and visual search: Expanding the useful field of view. *Journal of the Optical Society of America A*, *5*(12), 2210. https://doi.org/10.1364/JOSAA.5.002210 – nutzbares Sehfeld (UFOV) und Alter; Abgrenzung zur Schulte-Tabelle.
- Bouma, H. (1970). Interaction effects in parafoveal letter recognition. *Nature*, *226*(5241), 177–178. https://doi.org/10.1038/226177a0 – Crowding-Regel (kritischer Abstand ≈ halbe Exzentrizität).
- Buck, K. K., Atkinson, T. M., & Ryan, J. P. (2008). Evidence of practice effects in variants of the Trail Making Test during serial assessment. *Journal of Clinical and Experimental Neuropsychology*, *30*(3), 312–318. https://doi.org/10.1080/13803390701390483 – Übungseffekte bei Trail Making.
- Calabrèse, A., Cheong, A. M. Y., Cheung, S.-H., He, Y., Kwon, M., Mansfield, J. S., Subramanian, A., Yu, D., & Legge, G. E. (2016). Baseline MNREAD measures for normally sighted subjects from childhood to old age. *Investigative Ophthalmology & Visual Science*, *57*(8), 3836–3843. https://doi.org/10.1167/iovs.16-19580 – kritische Schriftgröße nach Alter.
- Calamia, M., Markon, K., & Tranel, D. (2012). Scoring higher the second time around: Meta-analyses of practice effects in neuropsychological assessment. *The Clinical Neuropsychologist*, *26*(4), 543–570. https://doi.org/10.1080/13854046.2012.680913 – Übungseffekte bei Wiederholung von Tests (Metaanalyse).
- Fedotov, I. A., Faustova, A. G., Zaitseva, A. A., Fedotova, E. A., & Shustov, D. I. (2026). Russian-language version of the Trail Making Test implemented on the Inquisit computer platform. *Sovremennye Tehnologii v Medicine*, *18*(4), 33–39. https://doi.org/10.17691/stm2026.18.4.04 – Zusammenhang Trail Making und Schulte-Zahlensuche (69 Personen).
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, *47*(6), 381–391. https://doi.org/10.1037/h0055392 – Zielgröße, Abstand und Bewegungszeit.
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, *27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Kopf- statt Augenbewegung bei Gleitsicht-Neulingen.
- Khramova, M. V., Kuc, A. K., Maksimenko, V. A., Frolov, N. S., Grubov, V. V., Kurkin, S. A., Pisarchik, A. N., Shusharina, N. N., Fedorov, A. A., & Hramov, A. E. (2021). Monitoring the cortical activity of children and adults during cognitive task completion. *Sensors*, *21*(18), 6021. https://doi.org/10.3390/s21186021 – Schulte-Tabelle in EEG-Studien.
- Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human subjects on saccadic eye movement tasks. *Experimental Brain Research*, *121*(4), 391–400. https://doi.org/10.1007/s002210050473 – Sakkadenlatenz und Alter.
- Pelli, D. G., & Tillman, K. A. (2008). The uncrowded window of object recognition. *Nature Neuroscience*, *11*(10), 1129–1135. https://doi.org/10.1038/nn.2187 – Crowding begrenzt Such- und Lesetempo.
- Rayner, K., Li, X., Williams, C. C., Cave, K. R., & Well, A. D. (2007). Eye movements during information processing tasks: Individual differences and cultural effects. *Vision Research*, *47*(21), 2714–2726. https://doi.org/10.1016/j.visres.2007.05.007 – Fixationsdauer und Sakkadenweite bei Suche.
- Rolfs, M. (2009). Microsaccades: Small steps on a long way. *Vision Research*, *49*(20), 2415–2441. https://doi.org/10.1016/j.visres.2009.08.010 – Mikrosakkaden sind Fixationsbewegungen.
- Salthouse, T. A. (2011). What cognitive abilities are involved in trail-making performance? *Intelligence*, *39*(4), 222–232. https://doi.org/10.1016/j.intell.2011.03.001 – Trail Making misst vor allem Verarbeitungstempo.
- Sheedy, J. E. (2004). Progressive addition lenses—matching the specific lens to patient needs. *Optometry*, *75*(2), 83–102. https://doi.org/10.1016/S1529-1839(04)70021-4 – Unterschiede der Gleitsichtdesigns.
- Sireteanu, R., & Rettenbach, R. (2000). Perceptual learning in visual search generalizes over tasks, locations, and eyes. *Vision Research*, *40*(21), 2925–2949. https://doi.org/10.1016/S0042-6989(00)00145-0 – Wahrnehmungslernen bei Suchaufgaben.
- Whitney, D., & Levi, D. M. (2011). Visual crowding: A fundamental limit on conscious perception and object recognition. *Trends in Cognitive Sciences*, *15*(4), 160–168. https://doi.org/10.1016/j.tics.2011.02.005 – Übersicht zu Crowding.
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch-Latenz von Web-Apps (Zahlen aus der Literaturbasis; DOI unten geprüft).
