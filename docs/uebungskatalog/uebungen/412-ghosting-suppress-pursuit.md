---
# ===== Kennung =====
nr: 412
kennung: ghosting-suppress-pursuit
name: "Blickfolge trotz Nachzieh-Spur"
name_original: "Monitor-Nachzieheffekt-Test – Fixationsstabilität Sehtraining / Bewegungsunschärfe-Unterdrückung (Ghosting Suppress Pursuit)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/ghosting-suppress-pursuit"
blickfit_umsetzung: {kennung: "nachzieh-spur", name: "Nachzieh-Spur", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/nachzieh-spur/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein leuchtender Punkt gleitet geradlinig über einen dunklen Bildschirm und prallt an den Rändern ab. Auf Wunsch zieht er eine Kette blasser Ringe hinter sich her; man folgt nur dem hellen Kern mit den Augen und lässt sich von der Spur nicht nach hinten ziehen."
ziel_funktionen: [blickfolge]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 60
schwierigkeit_anpassung: "Kein Levelsystem, keine automatische Anpassung. Manuell: Tempo 0,5–9× (Regler und Stufen 0,5/1/2/3/5/7/9), Zielradius 10–50 px, 'Gaze Trail' schaltet die Nachzieh-Ringe erst ein (Standard: aus), 'Hide Line' entfernt die Richtungslinie, 'Random Speed' lässt das Tempo weich zwischen ≈ 0,4× und 1,9× schwanken. Dauer 30/45/60/90/120 s."
messgroessen: ["Original: keine Leistungsmessung (nur Zähler abgeschlossener Sitzungen)", "sinnvoll mit Eyetracker: Folge-Gain, Zahl der Aufholsakkaden, Blickabstand zum Zielkern", "Ersatz ohne Eyetracker: Erkennen eines kurz im Zielkern gezeigten Zeichens (richtig/falsch) als Nachweis, dass der Blick am Kern war"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 3
    sakkaden: 1
    fixation: 1
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 0
    antizipation: 1
    entscheidung_wahlreaktion: 0
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
voraussetzungen: ["'Gaze Trail' einschalten – sonst bleibt nur einfache Blickfolge auf Geraden mit Randabprallern (gleiche Bewegung wie 409, dort mit Blinken)", "Bildschirm in ruhiger Umgebung, Abstand 40–70 cm, Kopf möglichst ruhig", "Scharfe Sicht im Zwischenbereich (Bildschirmbrille oder Einstärkenglas günstiger als Gleitsicht)", "Maus oder Finger nur zum Starten; während der Übung keine Eingabe"]
vorsicht_bei: [trockenes_auge_bildschirm, kopfschmerz_asthenopie, nystagmus, presbyopie_gleitsicht, schwindel_vestibulaer, kinder_unter_6]
geeignet_fuer: ["gleichmäßige Blickfolge auf geraden Bahnen mit Wandabprallern üben, ohne Hand- oder Körpereinsatz", "den Blick bei einer leichten, mitlaufenden Ablenkung auf einem kleinen Zielkern halten", "ruhiger Einstieg in Blickfolge-Übungen ohne Blink- oder Flimmerreize (bei 0,5–2×)", "Grundform von 409 (+ Dunkelphasen) und 414 (+ Positionssprünge) – dieselbe Bewegung ohne diese Zusätze; Ergänzung zu 404 (Lissajous-Bahn); danach Richtungswechsel 415 → 410 → 411"]
weniger_geeignet_fuer: ["alle, die eine Rückmeldung oder einen Leistungswert erwarten (das Original misst nichts)", "wer die Qualität des eigenen Monitors prüfen will (der 'Nachzieheffekt' ist gezeichnet, kein Bildschirm-Artefakt)", "Gleitsichtträger:innen an großen Monitoren (Ziel läuft über die ganze Bildbreite in die unscharfe Randzone)", "Kinder, die abstrakte Aufgaben ohne Rückmeldung nicht durchhalten", "Ziel 'Reaktion' oder 'Zielgenauigkeit der Hand'"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Glatte Blickfolge verbessert sich im Labor mit kurzem Training, auch ohne Belohnung, und der Effekt zeigte sich in einem anderen Testparadigma (Step-Ramp; Eibenberger et al. 2012, N = 10) – daher naher Transfer schwach wie bei 410/411/415; mit Rückmeldung ist der Lerneffekt deutlich größer (Madelain & Krauzlis 2003, Folgen eines kurz verschwindenden Ziels) – das Original gibt keine. Dass man das 'Unterdrücken von Nachzieh-Spuren' lernen kann oder dass es Sport/E-Sport nützt, wurde nie untersucht."
aehnliche_uebungen: [409, 414, 404, 415, 410, 411, 403, 405, 407, 105, 514]
stichworte: ["smooth pursuit", "Blickfolge", "Bewegungsunschärfe", "motion smear", "Ghosting", "Nachbild", "Distraktor", "Sample-and-hold", "Bildwiederholrate", "Fixationsstabilität"]
---

# 412 · Blickfolge trotz Nachzieh-Spur

> Original: „Monitor-Nachzieheffekt-Test | Blickstabilität“ („Fixationsstabilität Sehtraining –
> Bewegungsunschärfe-Unterdrückung“) – skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch
> nicht umgesetzt

## 1. Kurzbeschreibung

Ein roter Punkt mit weißem Kern und Leuchtsaum gleitet auf geraden Bahnen über einen fast schwarzen Bildschirm und
prallt an den Rändern ab; eine blasse Linie zeigt in seine Bewegungsrichtung. Mit „Gaze Trail“ zieht er eine Kette
schwacher Ringe („Geisterringe“) hinter sich her. Man folgt nur mit den Augen dem hellen Kern und lässt sich von der
Spur nicht nach hinten ziehen. Keine Handaufgabe, keine Punkte, keine Rückmeldung.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und Spielcode (Chunk `6428-…js`, gemeinsame Module `90762-…js`, Stand 29.09.2026); nur Mechanik,
kein Code übernommen. Bewegungslogik wie 409 (Geraden mit Randabprallern); Zielgrafik, Raster und Bildraten-Drosselung
aus den gemeinsamen Modulen wie bei 404/409.

- **Ablauf:** Einstellungen → Countdown ≈ 2,5 s → 30–120 s (Standard 60 s) → Endbildschirm mit Sitzungszähler.
  Maus/Touch nur zum Start; am Zeiger/Finger erscheint ein Fadenkreuz, das **nicht ausgewertet** wird. Abbruch mit
  Escape, beim Verlassen des Vollbilds oder der Seite.
- **Reiz:** Hintergrund #050508 mit 40-px-Raster (2 % Deckkraft); Ziel Radius 16 px (Regler 10–50 px) mit Außenring,
  Scheibe (88 %), Leuchtsaum („Neon Glow“, Standard an) und weißem Kern (Radius ≈ 2,9 px). Farben Rot (Standard),
  Grün, Blau, Orange, Gelb, Weiß; optional „Day Mode“ (weiß) und „Scanlines“ (statisch, 1,5 % Deckkraft).
- **Bewegung:** je Achse zufällig 4–7 px pro 16 ms × Tempo (≈ 350–620 px/s bei 1×), Geraden mit Spiegelung am Rand;
  zeitbasiert (dt). „Random Speed“ ist eine Summe von Sinusfunktionen der Zeit: Tempo × ≈ 0,4–1,9, weich schwankend.
- **Richtungslinie** (Standard an, „Hide Line“ entfernt sie): 34–59 px lang ≈ 96 ms Vorausschau bei 1×, 25 % Deckkraft.
- **„Gaze Trail“ (Standard aus!):** Ringe an den Positionen der letzten 20 verarbeiteten Bilder, jeder 3. gezeichnet
  (Linie 2 px, Radius = Zielradius, 0–22,5 % Deckkraft): 6 sichtbare Ringe 1–16 Bilder hinter dem Ziel; der hellste
  hat ein Kontrastverhältnis von nur ≈ 1,2 : 1 zum Hintergrund (eigene sRGB-Rechnung).
- **Bildraten-Drosselung:** Bilder < 13 ms nach dem letzten werden verworfen; verarbeitet werden (eigene Rechnung) bei
  60/75/90/120/144/165/240 Hz nur 60/75/45/60/72/55/60 Bilder/s. Die Spur reicht daher bei 60 Hz 17–267 ms zurück
  (1×: bis ≈ 165 px ≈ 4,4° am 24″-Full-HD-Monitor in 60 cm), bei 144 Hz 14–222 ms, am 90-Hz-Tablet 22–356 ms.
- **Gemessen wird nichts**; gespeichert wird nur der Sitzungszähler.

**Widersprüche Regeltext ↔ Code:** Die „Ghosting-Ringe“ sind **gezeichnet** und standardmäßig **aus** – ohne „Gaze
Trail“ bleibt reine Blickfolge auf Geraden (wie 409 ohne Blinken). „144/240 Hz deutlich überlegen“ – die Schleife
läuft mit höchstens ≈ 77 Bildern/s, bei 240 Hz mit 60. „Hide Line – path guide lines“ – es gibt keine Bahn, nur die Richtungslinie. Stufen nach
„Fixationsstabilität“ – nicht erhoben, nur das gewählte Tempo. „Verschlüsselt gespeichert“ – der Zähler liegt im
Klartext im Browser. Anleitung nennt 0,5–2×, einstellbar sind bis 9×.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite verspricht, „kortikale Hemmungsmechanismen in V1/MT“ und Mikrosakkaden zu aktivieren, um Ghosting
auszublenden und den Blick „unverrückbar“ zu verankern; ab ≈ 30°/s entstehe Netzhautschlupf mit Nachbildern.
Zielgruppen: FPS-/E-Sport, Tennis, Tischtennis, Badminton, Baseball. Empfohlen: Kopf „absolut fixiert“, 144-Hz+-Monitor,
5–8 × 60 s täglich; Stufen „Apex Fixation ab 2,0×“ bis „Fixationsverlust unter 0,7×“. Positiv: Das FAQ sagt selbst,
dass die Übung **keine** Messung der Panel-Reaktionszeit ist.

- **Motion smear:** Das Sehsystem summiert ≈ 120 ms, bewegte Ziele wirken trotzdem weniger verschmiert als erwartet
  (Burr, 1980). Die Website nennt „Photorezeptor-Abklingzeit“ als Ursache – bei Burr geht es um neuronale zeitliche Summation; die Verringerung beruht v. a. auf
  Maskierung durch benachbarte bewegte Reize – ein einzelner Punkt im Dunkeln wirkt gerade **stark** verschmiert
  (Chen et al., 1995). Dass die Übung diese Filter „schärft“, ist nicht belegt.
- **Folgt das Auge gut, steht das Ziel auf der Netzhaut still** – biologischer Smear entsteht am Ziel dann kaum;
  sichtbar bleibt die Halte-Unschärfe des Displays (Abschnitt 4). Die Ringe laufen mit und sind ein schwacher
  Ablenker, keine Unschärfe.
- **„30°/s-Grenze“:** Schlupf gibt es bei jedem Tempo (Gain < 0,95; Collewijn & Tamminga, 1984), glatte Folgebewegung
  reicht bei vielen bis ≈ 100°/s (Meyer et al., 1985). „V1/MT“ vermischt zwei Areale. **Mikrosakkaden** gehören zur
  Fixation; bei der Folgebewegung korrigieren Aufholsakkaden. „Regenerieren Netzhautrezeptoren“ ist überzogen.
- **Kopf fixieren:** für eine reine Augenübung sinnvoll; Smear wird aber auch bei Kopfbewegung gedämpft (VOR/VVOR; Tong et al.,
  2006; bei Blickfolge v. a. für Reize gegen die Bewegungsrichtung, Bedell et al., 2010), und bei Gleitsicht ist Kopfbewegung die natürliche Strategie.
- **Stufentabelle ohne Datengrundlage:** bewertet nur das gewählte Tempo; „Apex“ ab 2× (≈ 19–33°/s) liegt weit
  unter der Obergrenze glatter Folgebewegung (≈ 100°/s; Meyer et al., 1985) – als „Profi-Niveau“ ohne Grundlage. E-Sport-/Ballsport-Transfer und 144-Hz-Vorteil: ohne Beleg (Abschnitt 11).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel/Tempo:** Ziel Ø ≈ 0,85° (24″-Full-HD, 60 cm), weißer Kern ≈ 9′ – weit über der Sehschärfegrenze (1′ bei
  Visus 1,0). Tempo 1× ≈ 9–16°/s (Tablet 11″ in 30 cm ≈ 13–23°/s), 2× ≈ 19–33°/s, 5× ≈ 47–82°/s, 9× ≈ 85–150°/s. Der Gain sinkt mit dem Tempo (Collewijn &
  Tamminga, 1984), bei hohen Stufen (etwa ab 5×, eigene Einschätzung) dürften daher mehr Aufholsakkaden nötig sein, obwohl im Labor bei 4 von 5 Personen ≈ 90 %
  Gain bis ≈ 100°/s erreicht wurden (Meyer et al., 1985).
- **Wandabpraller:** Die Folgebewegung reagiert auf Bewegungsänderungen erst nach ≈ 100 ms (Carl & Gellman, 1987),
  danach Aufholsakkade; die Abpraller sind aber vorhersehbar (Rand, Richtungslinie) und bei 1× selten (≈ 0,5/s am
  24″-Monitor, ≈ 0,7/s am 11″-Tablet; eigene Rechnung). Aufholsakkaden spielen daher nur eine Nebenrolle (`sakkaden` 1) –
  anders als bei 409 (Wiederauftauchen nach der Dunkelphase), 410/411 (unvorhersehbare Wechsel) und 414 (Sprünge).
- **Echtes Bildschirm-„Ghosting“:** Bei Sample-and-hold-Displays wächst die wahrgenommene Unschärfe mit der Haltezeit
  (Geri & Morgan, 2007); 120 statt 60 Bilder/s verbessern deutlich, ab ≈ 240 kaum mehr (Kuroki et al., 2007).
  Faustregel Tempo × Haltezeit: bei 60 Bildern/s 1× ≈ 9–16′, 5× ≈ 47–82′ – mehr als das Ziel (51′). Wegen der Drosselung
  bringt ein 144-Hz-Monitor hier nur ≈ 17 % kürzere Haltezeit. Geht das Auge nicht mit, erscheint das Ziel bei 5× als
  Reihe einzelner Bilder (≈ 30–50 px Abstand) – leicht mit den Ringen zu verwechseln.
- **Gleitsicht/Presbyopie:** klares Zwischenbereichs-Sehfeld horizontal insgesamt nur ≈ 13–18° breit, mit
  Einstärkenglas ≈ 60° (Han et al., 2003); ein 24″-Monitor in
  60 cm ist ≈ 48° breit → Kopfbewegung zulassen, Feld verkleinern oder Bildschirmbrille; am Tablet Nahkorrektur.
- **Weiteres:** Bildschirmarbeit senkt die Lidschlagrate im Mittel auf etwa ein Fünftel (Patel et al.,
  1991) → trockenes Auge. Farbe
  nicht aufgabenrelevant; bei Protan wirkt Rot dunkel → Weiß/Gelb (Rot-Grün-Schwäche ≈ 8 % der Männer; Birch, 2012).

## 5. Neurowissenschaftliche Grundlagen

MT/V5 und MST liefern das Bewegungssignal, Folgeareal des frontalen Augenfelds und Kleinhirn setzen es um; ≈ 100 ms
visueller Bewegung gehen in den Start der Folgebewegung ein (Lisberger, 2010). Folgebewegung und Wahrnehmung teilen
einen selektiven Aufmerksamkeitsmechanismus (Khurana & Kowler, 1987). Ein zu ignorierender, **anders** bewegter
Distraktor senkt die Augengeschwindigkeit nach 140 ms um ≈ 25 % (Spering et al., 2006); die Ringe hier laufen **mit**
dem Ziel, ein Konflikt der Bewegungssignale entsteht kaum. Geringeren Smear bei Eigenbewegung erklären extraretinale
Signale (Bedell et al., 2010). Dass die Übung V1/MT-Hemmung oder Mikrosakkaden „trainiert“, ist nicht belegt.

## 6. Motorische Grundlagen

Keine Handbewegung (Eingabe nur zum Start) – alle motorischen Merkmale 0; die „Motorik“ sind Folgebewegung und
Aufholsakkaden. Wer die Maus mitführt, übt ungewollt Auge-Hand-Tracking, das nicht ausgewertet wird.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Spurlänge hängt von der verarbeiteten Bildrate (45–77 Bilder/s) ab, Halte-Unschärfe vom Panel; Tempo in
  px/s → am nahen Tablet mehr °/s. Vergleiche nur am selben Gerät mit denselben Schaltern.
- **Einstellungen/Person:** ohne „Gaze Trail“ nur Blickfolge ohne Ablenker (wie 409 ohne Blinken); Richtungslinie
  erleichtert die Vorhersage; Alter, Müdigkeit, trockenes Auge und Brillenkorrektur im Zwischenbereich wirken mit.
- **Messqualität:** Das Original misst nichts. Folgequalität ist nur mit Eyetracker messbar (Gain, Sakkadenzahl;
  individuell sehr stabile Kennwerte laut Bargary et al., 2017) oder indirekt über eine Erkennungsaufgabe.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Training mit quasi-zufälligem Ziel (2 × 6 min an 3 Tagen) verbesserte die Folgebewegung,
  5 Tage später noch messbar (Eibenberger et al., 2012, N = 10 je Gruppe); mit Belohnung für genaues Folgen deutlich
  stärker (Gain bei kurz verschwindendem Ziel 0,59 → 0,89 nach 8–10 Sitzungen, ohne Belohnung 0,63 → 0,71;
  Madelain & Krauzlis, 2003). Das Original gibt keine Rückmeldung.
- **Naher Transfer – schwach:** Kurzes Folgetraining ohne Belohnung (quasi-zufälliges Ziel) verbesserte die
  Folgebewegung in einem anderen Test (Step-Ramp), 5 Tage später noch messbar (Eibenberger et al., 2012, N = 10) – ein
  Laborhinweis, der für die glatte Folgebewegung dieser Übung ebenso gilt wie für 409–411 und 415. Belohntes
  Folgetraining übertrug sich außerdem auf ungeübte Geschwindigkeiten und strukturierten Hintergrund (Madelain &
  Krauzlis, 2003; andere Aufgabe, nur mit Rückmeldung). Dass das „Ausblenden“ gezeichneter Spuren auf
  Monitor-Schlieren, Rauch oder Partikel in Spielen übergeht, wurde nie untersucht.
- **Alltagstransfer – fehlend:** kein belastbarer Ferntransfer allgemeinen Wahrnehmungstrainings auf Sport (Fransen,
  2024; Gegenposition Appelbaum et al., 2025); zu dieser Übung keine Studie.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** gleichmäßige Blickfolge ohne Hand-/Körpereinsatz und ohne Blinkreize geübt werden soll – mit
  „Gaze Trail“ als leichte Zusatzablenkung, bei 0,5–2×.
- **Weniger passend, wenn …** Rückmeldung gewünscht ist, der Monitor geprüft werden soll oder Reaktion bzw.
  Handgenauigkeit das Ziel ist.
- **Vorsicht / anpassen bei …** `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie` (seltener Lidschlag: blinzeln,
  kurze Sätze, Pausen); `nystagmus` (Folgebewegung evtl. eingeschränkt, langsam beginnen); `presbyopie_gleitsicht`
  (kleineres Feld, Kopfbewegung, Bildschirmbrille); `schwindel_vestibulaer` (hohe Tempi und
  „Random Speed“ meiden, klein beginnen); `kinder_unter_6` (abstrakt, ohne Rückmeldung).
- **Photosensitivität geprüft:** kein Blinken, keine flächigen Helligkeitswechsel; Ziel dauerhaft sichtbar, Ringe in
  der Helligkeit konstant, Scanlines statisch und fast unsichtbar. WCAG 2.3.1 und die Harding-Kriterien (≥ 3 Blitze/s
  bei ≥ 0,006 sr; Harding et al., 2005) greifen nicht → `flimmern_lichtreize` 0 (gleiche Einstufung wie 410, 411, 413,
  415: stetig bewegtes Ziel ohne Blinken; erst ab ≈ 5× springt es pro Bild um mehr als seinen Durchmesser).
- **Kombiniert gut mit …** 409 und 414 – **dieselbe Bewegung** (Geraden mit Randabprallern, gleiches Tempo): 409 fügt
  Dunkelphasen hinzu, 414 Positionssprünge; ohne „Gaze Trail“ ist 412 die reine Grundform, 409 ohne Blinken praktisch
  eine Dublette. Danach Richtungswechsel 415 → 410 → 411; 404/403/405 (andere Bahnen), 105 (Blickfolge mit Messung), 514
  (Tracking mit der Maus). Unterschied zu 404: dort geschwungene Lissajous-Bahn ohne Abpraller.

Keine Diagnose, kein Heil- oder Sehversprechen; ein Nutzen für Sehen, Sport oder Verkehr ist nicht belegt.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Ehrlich benennen:** „Blickfolge mit Ablenkspur“ statt „Monitor-Test“/„Ghosting-Unterdrückung“; keine Stufen ohne
  Normdaten, keine Sport- oder Hirnversprechen.
- **Prüfbare Aufgabe:** wie in „Scharf in Bewegung“ kurz ein Landolt-C im Zielkern zeigen und die Öffnung antippen
  lassen – gelingt nur bei sauberer Folgebewegung; Spurdichte adaptiv (3-down/1-up).
- **Wirksame Ablenker:** Ringe/Zeichen gegen- oder querläufig driften lassen (Spering et al., 2006) statt nur mitlaufen.
- **Technik/Barrierefreiheit:** Spur in ms, keine Bildraten-Drosselung, Tempo in °/s (5–30°/s); Tablet quer, Option
  „kleines Feld“ für Gleitsicht, Standard Weiß/Gelb, Leuchtsaum abschaltbar, Blinzel- und Pausenhinweis.

## 11. Quellen

### Von der Website angegeben

- Burr, D. C. (1980). Motion smear. *Nature, 284*(5752), 164–165.
  https://doi.org/10.1038/284164a0 – **Prüfung:** DOI stimmt ✓ (Website ergänzt den Untertitel „Two types of visual
  suppression“, der im Crossref-Titel nicht steht); **stützt die Aussage
  der Website:** teilweise – Summation und geringerer Smear belegt; nichts zu Photorezeptoren, Monitoren, Training.
- Martinez-Conde, S., Macknik, S. L., & Hubel, D. H. (2004). The role of fixational eye movements in visual perception.
  *Nature Reviews Neuroscience, 5*(3), 229–240. https://doi.org/10.1038/nrn1348 – **Prüfung:** DOI stimmt ✓ (Website
  ohne Heftnummer); **stützt die Aussage der Website:** teilweise – gegen Verblassen bei Fixation; nichts zu Folgebewegung/Spuren.
- Rolfs, M. (2009). Microsaccades: Small steps on a long way. *Vision Research, 49*(20), 2415–2441.
  https://doi.org/10.1016/j.visres.2009.08.010 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:**
  teilweise – Funktionen der Mikrosakkaden bei Fixation; nichts zu Ghosting.
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2),
  591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein –
  „ab ≈ 30°/s Schlupf mit Nachbildern“ steht dort nicht.
- Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5th ed.). Oxford University Press.
  https://doi.org/10.1093/med/9780199969203.001.0001 – **Prüfung:** DOI falsch (nicht bei Crossref); richtig
  https://doi.org/10.1093/med/9780199969289.001.0001 ✓ (Buch, nicht eingesehen); **stützt die Aussage der Website:**
  unklar – „Kopfbewegung verhindert die Beanspruchung der Mikrobewegungen“ nicht belegt.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple
  reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI
  stimmt ✓; **stützt die Aussage der Website:** nein – Reaktionszeit/Hardware (≈ 18 ms); nichts zu Schlieren oder 144 Hz.
- Nur im Fließtext: Yang, L., Zhang, W., Li, P., Tang, H., Chen, S., & Jin, X. (2025). The aiming advantages in
  experienced first-person shooter gamers: Evidence from eye movement patterns. *Computers in Human Behavior, 165*,
  108573. https://doi.org/10.1016/j.chb.2025.108573 – **Prüfung:** DOI ✓, Zuordnung unsicher; **stützt die
  Aussage der Website:** nein – Querschnitt erfahrener FPS-Spieler, kein Training, nichts zu Rauch/Mündungsfeuer.
- Nur im Fließtext: Appelbaum, L. G., & Erickson, G. (2018). Sports vision training: A review of the state-of-the-art in
  digital training techniques. *International Review of Sport and Exercise Psychology, 11*(1), 160–189.
  https://doi.org/10.1080/1750984X.2016.1266376 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein –
  begrenzte, gemischte Belege; kein Ballsport-Transfer.

### Weitere Fachliteratur

- Bedell, H. E., Tong, J., & Aydin, M. (2010). The perception of motion smear during eye and head movements. *Vision
  Research, 50*(24), 2692–2701. https://doi.org/10.1016/j.visres.2010.09.025 – weniger Smear bei Eigenbewegung
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *JOSA A, 29*(3), 313–320.
  https://doi.org/10.1364/JOSAA.29.000313
- Chen, S., Bedell, H. E., & Öğmen, H. (1995). A target in real motion appears blurred in the absence of other proximal
  moving targets. *Vision Research, 35*(16), 2315–2328. https://doi.org/10.1016/0042-6989(94)00308-9 – Maskierung
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different
  target motions on different backgrounds. *J. Physiol., 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity.
  *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – Trainingseffekt
- Geri, G. A., & Morgan, W. D. (2007). The effect of FLCoS-display hold time on the perceived blur of moving imagery.
  *Journal of the SID, 15*(1), 87–91. https://doi.org/10.1889/1.2451573 – Haltezeit und Unschärfe
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when
  reading with single-vision and progressive lenses in a simulated computer-based environment. *IOVS, 44*(4),
  1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures:
  Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425.
  https://doi.org/10.1111/j.1528-1167.2005.31305.x – Blitz-Kriterien
- Khurana, B., & Kowler, E. (1987). Shared attentional control of smooth eye movement and perception. *Vision Research,
  27*(9), 1603–1618. https://doi.org/10.1016/0042-6989(87)90168-4 – Aufmerksamkeit und Folgebewegung
- Kuroki, Y., Nishi, T., Kobayashi, S., Oyaizu, H., & Yoshimura, S. (2007). A psychophysical study of improvements in
  motion-image quality by using high frame rates. *Journal of the SID, 15*(1), 61–68. https://doi.org/10.1889/1.2451560
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in
  between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027
- Madelain, L., & Krauzlis, R. J. (2003). Effects of learning on smooth pursuit during transient disappearance of a
  visual target. *Journal of Neurophysiology, 90*(2), 972–982. https://doi.org/10.1152/jn.00869.2002
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision
  Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink
  rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010
- Spering, M., Gegenfurtner, K. R., & Kerzel, D. (2006). Distractor interference during smooth pursuit eye movements.
  *J. Exp. Psychol.: Human Perception and Performance, 32*(5), 1136–1154. https://doi.org/10.1037/0096-1523.32.5.1136
- Tong, J., Patel, S. S., & Bedell, H. E. (2006). The attenuation of perceived motion smear during combined eye and head
  movements. *Vision Research, 46*(26), 4387–4397. https://doi.org/10.1016/j.visres.2006.08.034
- Ergänzend (Abschnitte 4, 7, 8, alle geprüft): Carl & Gellman (1987) https://doi.org/10.1152/jn.1987.57.5.1446 ·
  Bargary et al. (2017) https://doi.org/10.1016/j.visres.2017.03.001 · Fransen (2024)
  https://doi.org/10.1007/s40279-024-02060-x · Appelbaum et al. (2025) https://doi.org/10.1007/s40279-024-02141-x

Prüfvermerk: DOIs am 29.09.2026 per Crossref geprüft, Inhalte über PubMed-Abstracts bzw. die geprüfte Literaturbasis
der Gruppe. Bildraten, Spurlängen, Sehwinkel und Kontraste sind eigene Berechnungen aus Code und Formeln.
