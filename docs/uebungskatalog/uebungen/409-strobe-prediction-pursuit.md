---
# ===== Kennung =====
nr: 409
kennung: strobe-prediction-pursuit
name: "Blickfolge mit Dunkelphasen (Stroboskop-Ziel)"
name_original: "Stroboskopisches Sehtraining – Blickvorhersage bei intermittierender Sicht (Strobe/Occlusion Prediction Pursuit)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/strobe-prediction-pursuit"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein kleiner leuchtender Punkt gleitet geradlinig über einen dunklen Bildschirm und prallt an den Rändern ab. In festem Takt verschwindet er für etwa ein Drittel der Zeit; man folgt ihm nur mit den Augen weiter und versucht, dort zu sein, wo er wieder auftaucht."
ziel_funktionen: [blickfolge, antizipation]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 60
schwierigkeit_anpassung: "Kein Levelsystem, keine automatische Anpassung. Nur manuelle Einstellungen: Tempo 0,5–9× (Regler in 0,1-Schritten; erhöht Zieltempo UND Blinktakt gemeinsam), Zielradius 10–50 px, 'Hide Line' blendet den schwachen Umrissring in der Dunkelphase aus (erst dann ist das Ziel wirklich unsichtbar), 'Random Speed' schwankt das Tempo 0,4- bis 1,9-fach. Dauer 30/45/60/90/120 s."
messgroessen: ["Original: keine Leistungsmessung (nur Zähler abgeschlossener Sitzungen)", "sinnvoll mit Eyetracker: Folge-Gain in der Dunkelphase, Blickfehler und Zahl der Aufholsakkaden beim Wiederauftauchen", "Ersatz ohne Eyetracker: Tipp-Ort-Fehler auf den vorhergesagten Auftauchpunkt (Grad)", "Ersatz ohne Eyetracker: Zeitfehler beim Tippen im Moment des Wiederauftauchens (ms)"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 1
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 3
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 1
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 0
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 1
    antizipation: 3
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
  flimmern_lichtreize: 3
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Keine bekannte Photosensitivität/Epilepsie (das Ziel blinkt je nach Tempo und Gerät 0,3 bis ≈ 7-mal pro Sekunde, mit 'Random Speed' bis ≈ 12-mal; Standardfarbe Rot #ef4444 ist vorsichtshalber als gesättigtes Rot zu werten)", "Bildschirm in ruhiger Umgebung, Kopf möglichst ruhig, Abstand 40–70 cm", "Ausreichende Sicht im Zwischenbereich (Bildschirmbrille oder Einstärkenglas günstiger als Gleitsicht)", "Maus oder Finger nur zum Starten; während der Übung keine Eingabe"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, kopfschmerz_asthenopie, trockenes_auge_bildschirm, nystagmus, schwindel_vestibulaer, gesichtsfeldausfall, presbyopie_gleitsicht, sehbehinderung_niedriger_visus, kinder_unter_6]
geeignet_fuer: ["vorausschauende (prädiktive) Blickfolge üben: den Blick weiterbewegen, obwohl das Ziel kurz fehlt", "Einstieg in Verdeckungsaufgaben mit regelmäßigem, vorhersagbarem Takt (bei 0,5–2× Tempo lange Dunkelphasen von ≈ 0,3–1 s)", "ruhige Augenübung ohne Hand- oder Körpereinsatz", "Ergänzung zu gleichförmiger Blickfolge (412 = dieselbe Bewegung ohne Dunkelphasen, 404 Lissajous-Bahn) und zur Einzelverdeckung (407)"]
weniger_geeignet_fuer: ["Menschen mit Photosensitivität, Epilepsie in der Familie oder lichtempfindlicher Migräne", "alle, die eine Rückmeldung oder einen Leistungswert erwarten (das Original misst nichts)", "Gleitsichtträger:innen an großen Monitoren (Ziel läuft über die ganze Bildbreite in die unscharfe Randzone)", "Kinder, die abstrakte Aufgaben ohne Rückmeldung nicht durchhalten", "Ziel 'Reaktion' oder 'Zielgenauigkeit der Hand' (keine Handlung gefordert)"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Blickfolge während einer Verdeckung ist im Labor mit Rückmeldung trainierbar (Gain 0,59 → 0,89, Madelain & Krauzlis 2003), ohne Rückmeldung nur wenig (0,63 → 0,71); das Original gibt keine Rückmeldung. Naher Transfer nur als schwacher Laborhinweis: Übertrag auf ungeübte Geschwindigkeiten in der belohnten Gruppe (Madelain & Krauzlis 2003), kurzes Folgetraining ohne Belohnung verbesserte die Folgebewegung in einem anderen Test (Eibenberger et al. 2012, N = 10). Die zitierte Strobe-Brillen-Forschung (Sportübungen mit Shutterbrille, ganzes Gesichtsfeld) ist auf ein blinkendes Bildschirmziel nicht übertragbar; ein Alltagsnutzen ist nicht untersucht."
aehnliche_uebungen: [412, 407, 414, 404, 403, 406, 105, 107, 104, 109]
stichworte: ["Verdeckung", "Okklusion", "target blanking", "prädiktive Blickfolge", "smooth pursuit", "Antizipation", "extraretinale Signale", "Geschwindigkeitsgedächtnis", "Stroboskop", "Photosensitivität"]
---

# 409 · Blickfolge mit Dunkelphasen (Stroboskop-Ziel)

> Original: „Stroboskopisches Sehtraining – Blickvorhersage bei intermittierender Sicht“ – skilldrills.online,
> Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Ein kleiner roter Punkt gleitet auf geraden Bahnen über einen fast schwarzen Bildschirm und prallt an den Rändern ab;
im festen Takt ist er zwei Drittel der Zeit sichtbar, ein Drittel dunkel. Man folgt ihm nur mit den Augen, führt die
Bewegung im Dunkeln weiter und will beim Wiederauftauchen schon dort sein. Keine Handaufgabe, keine Punkte, keine
Rückmeldung; ohne „Hide Line“ bleibt im Dunkeln ein schwacher Umrissring sichtbar.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und Spielcode (Chunks `49454-…js`, `90762-…js`, Stand 29.09.2026); nur Mechanik, kein Code übernommen.

- **Ablauf:** Einstellungen → Countdown ≈ 2,5 s → 30–120 s Übung → Endbildschirm (Dauer, Tempo, Sitzungszähler).
  Maus/Touch nur zum Starten; Abbruch bei Escape, Tab-Wechsel, Verlassen des Vollbilds.
- **Reiz:** Hintergrund #050508; Ziel Ø 32 px (Radius 10–50 px), weißer Kern, Leuchtsaum („Neon Glow“, Standard);
  Farbe Rot (Standard)/Grün/Blau/Orange/Gelb/Weiß; optional „Day Mode“ (weiß), „Scanlines“, „Gaze Trail“.
- **Bewegung:** je Achse zufällig 4–7 px pro 16 ms × Tempo (≈ 350–620 px/s bei 1×), nur Geraden mit Spiegelung an
  den Rändern; zeitbasiert (dt), also bildfrequenzunabhängig. „Random Speed“: Tempo × ≈ 0,4–1,9 (Sinusfunktion).
- **Stroboskop-Takt:** Zähler steigt **pro verarbeitetem Bild** um den Tempofaktor; < 60 sichtbar, 60–90 dunkel (bei
  1× 60 Bilder hell, 31 dunkel – Seitentext stimmt). Bilder < 13 ms nach dem letzten werden verworfen; verarbeitet
  werden daher (eigene Rechnung) bei 60/75/90/100/120/144/165/240 Hz: 60/75/45/50/60/72/55/60 Bilder/s.

| Tempo | 0,5× | 1× | 2× | 3× | 5× | 7× | 9× |
|---|---|---|---|---|---|---|---|
| Blinkzyklen/s bei 60 (72) Bildern/s | 0,32 (0,38) | 0,65 (0,78) | 1,3 (1,6) | 1,9 (2,3) | 3,2 (3,8) | 4,6 (5,5) | 5,5 (6,5) |
| sichtbar / dunkel bei 60 Bildern/s (ms) | 2 000 / 1 017 | 1 000 / 517 | 500 / 267 | 333 / 183 | 200 / 117 | 150 / 67 | 117 / 67 |

Mit „Random Speed“ bei 9× kurzzeitig bis 10 (12) Blitze/s. Die Dunkelstrecke bleibt fast konstant (≈ 180–370 px ≈
5–10° am 24″-Monitor in 60 cm), die Dunkelzeit schrumpft (517 → 67 ms). **Gemessen wird nichts.**

**Widersprüche Regeltext ↔ Code:** „144-Hz-Monitor wichtig“ – Schleife auf ≤ 77 Bilder/s gedrosselt, 90/100/165 Hz
sogar langsamer als 60 Hz; Stufen nach „Landeversatz < 12 px“ – nicht erhoben; „Hide Line blendet die Bahn aus“ – es
gibt keine Bahn, entfernt wird der Ring; „Verdunkelungsgrad erhöhen“ – Verhältnis fest ≈ 2 : 1; „Krümmung
extrapolieren“ – die Bahn ist gerade.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite nennt die Übung ein „wissenschaftlich validiertes Interventionsprotokoll“: Die Blickfolge Ungeübter „breche
nach 100–200 ms in Suchsakkaden ein“, Training „stärke Kleinhirn und frontales Augenfeld“ und verbessere dynamische
Sehschärfe, Antizipation und Kurzzeitgedächtnis; Nutzen für NHL/MLB/NFL und E-Sport („Pre-Aiming“). Empfohlen:
2–3 × 45–60 s täglich, 144-Hz-Monitor; Stufentabelle „Novice“ bis „Elite – Top 1,5 %“; Warnung bei Photosensibilität.

- **Andere Methode:** Alle Studien nutzen **Shutterbrillen über das ganze Gesichtsfeld** (z. B. 100 ms offen /
  67–900 ms zu) bei Sportübungen (Wilkins & Appelbaum, 2020); ein blinkendes Bildschirmziel wurde nie untersucht.
  Befunde der Brillenstudien: zentrale Bewegungsempfindlichkeit/Aufmerksamkeit und Kurzzeitgedächtnis besser,
  Timing-Vorteil nur kurzfristig (sofort und nach 10 min, nicht nach 10 Tagen; Smith & Mitroff, 2012), Eishockey nur als kleine
  Pilotstudie; **dynamische Sehschärfe nie gemessen**.
  Metaanalyse (17 Studien, sportspezifische Tests): akut schlechter, nach längerem Training ≈ 5–6 % besser, Protokolle
  uneinheitlich (Vera et al., 2026).
- **Blickfolge bei Verdeckung:** Das Auge bremst erst ≈ 190 ms nach dem Verschwinden und behält 40–60 % der
  Geschwindigkeit (Becker & Fuchs, 1985) – normal, kein Zeichen von „Untrainiertheit“. Wiederbeschleunigung vor dem
  erwarteten Auftauchen ist belegt (Bennett & Barnes, 2003).
- **„Stärkt Kleinhirn und FEF“:** Die Areale sind beteiligt (Lencer et al., 2004), eine Stärkung ist nicht untersucht;
  die zitierte Arbeit existiert so nicht (Abschnitt 11).
- **Stufentabelle ohne Datengrundlage** und schief: Bei hohem Tempo ist die Dunkelphase kürzer als die
  Abbremslatenz – Vorhersage wird bei **langsamem** Tempo am stärksten gefordert.
- **144 Hz/„Kleinhirn-Timing“**, E-Sport-Transfer, „schnellster neuroplastischer Erfolg“: ohne Beleg.
  **Photosensibilitäts-Warnung:** richtig und wichtig.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel/Tempo:** Ziel ≈ 0,85° (24″-Full-HD, 60 cm), ≈ 1,2° am 11″-Tablet in 30 cm – Visus kaum gefordert. Bei 1×
  ≈ 9–16°/s (Monitor) bzw. 13–23°/s (Tablet, 30 cm), bei 5× ≈ 47–82°/s, bei 9× ≈ 85–150°/s. Glatte Folgebewegung reicht
  im Labor bei 4 von 5 Personen bis ≈ 100°/s mit ≈ 90 % Gain (Meyer et al., 1985); ab ≈ 5× wird die Übung
  vermutlich zunehmend sakkadisch (eigene Einschätzung, zusätzlich erschwert durch das Blinken).
- **Im Dunkeln:** Augengeschwindigkeit ≈ 190 ms unverändert, dann 40–60 % (Becker & Fuchs, 1985); bei 1 s Verdeckung
  ≈ 30 % (Lencer et al., 2004). Vorhersage wird nur bei 0,5–2× (Dunkelphase ≈ 270–1 000 ms) wirklich gefordert.
- **Kontrast/Bildschirm:** Der Ring im Dunkeln hat relative Leuchtdichte ≈ 0,024 gegen ≈ 0,0016 (eigene sRGB-Rechnung)
  – bei Raumlicht schlecht sichtbar. Bei 45–77 Bildern/s springt das Ziel bei hohem Tempo (5×: ≈ 30–50 px/Bild).
- **Gleitsicht:** scharfer Zwischenbereich seitlich nur ≈ 13–18°, längere Kopf- und Augenbewegungen am Bildschirm
  (Han et al., 2003, Lesen in 60 cm);
  ein 24″-Monitor in 60 cm ist ≈ 48° breit – das Ziel läuft in die Randunschärfe, unten in den Nahteil. Kopfbewegung
  zulassen; besser Bildschirmbrille oder kleineres Feld. **Presbyopie:** am Tablet Nahkorrektur nötig.
- **Weiteres:** Konzentriertes Verfolgen senkt die Lidschlagrate (trockenes Auge). Farbe nicht aufgabenrelevant; bei
  Protan wirkt Rot dunkel → Weiß/Gelb (Rot-Grün-Schwäche ≈ 8 % der Männer; Birch, 2012). Folge-Gain bei
  75–93-Jährigen geringer, besonders bei hohem Tempo (Moschner & Baloh, 1994).

## 5. Neurowissenschaftliche Grundlagen

Bei sichtbarem Ziel liefern MT/V5 und MST das Bewegungssignal, FEF-Folgeareal und Kleinhirn setzen es um. Ohne Ziel
treiben Efferenzkopie und ein Kurzzeitspeicher für Geschwindigkeit und Zeitpunkt die Folgebewegung weiter
(extraretinale Signale; Bennett & Barnes, 2003). Blickfolge ohne sichtbares Ziel aktivierte zusätzlich FEF, supplementäres
Augenfeld, Parietalkortex, dorsolateralen präfrontalen Kortex, Kleinhirn und Basalganglien (fMRT, N = 16; Lencer et
al., 2004). Die Stärke des extraretinalen Signals ist mit Belohnung lernbar (Madelain & Krauzlis, 2003); dass diese
Übung Areale „stärkt“, ist nicht belegt.

## 6. Motorische Grundlagen

Keine Handbewegung (Eingabe nur zum Start) – alle motorischen Merkmale 0; die „Motorik“ sind Folgebewegung und
Aufholsakkaden. Ruhiger Kopf isoliert die Augenbewegung, bei Gleitsicht ist Kopfbewegung normal. Eine Fassung mit
Tipp-Antwort (Abschnitt 10) brächte Auge-Hand-Koordination, Timing und Touch-Latenz hinzu.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät verändert die Aufgabe:** 90-Hz-Tablet blinkt ≈ 25 % langsamer, 144-Hz-Monitor ≈ 20 % schneller als 60 Hz.
- **Abstand, Einstellungen, Person:** am nahen Tablet mehr °/s; ohne „Hide Line“ kaum Vorhersage; Alter, Müdigkeit.
- **Messqualität:** Das Original misst nichts; Gain/Sakkaden nur mit Eyetracker, sonst indirekt über Tipp-Fehler.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Laborgain während Verdeckung mit belohnendem Ton bei genauer Folge 0,59 → 0,89 (8–10
  Tagessitzungen), ohne Ton nur
  0,63 → 0,71 (Madelain & Krauzlis, 2003); das Original gibt keine Rückmeldung.
- **Naher Transfer – schwach:** Übertrag auf ungeübte Geschwindigkeiten und strukturierten Hintergrund nur in der
  belohnten Laborgruppe (Madelain & Krauzlis, 2003); kurzes Folgetraining ohne Belohnung (quasi-zufälliges Ziel,
  2 × 6 min an 3 Tagen) verbesserte die Folgebewegung in einem anderen Test (Step-Ramp), 5 Tage später noch messbar
  (Eibenberger et al., 2012, N = 10). Für Dunkelphasen-Folgen ohne Rückmeldung (wie im Original) nicht eigens untersucht
  – gleiche Einstufung wie bei den übrigen Blickfolge-Übungen 410–413 und 415.
- **Alltagstransfer – fehlend:** Strobe-Brillen: in sportspezifischen Tests nach längerem Training
  ≈ 5–6 % besser, akut schlechter, uneinheitliche Protokolle (17 Studien; Vera et al., 2026); für ein blinkendes
  Bildschirmziel keine Studie gefunden (PubMed, 09/2026).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** vorausschauendes Folgen mit den Augen ohne Hand- und Körpereinsatz geübt werden soll, als
  Schritt nach 412 (dieselbe Bewegung ohne Dunkelphasen) bzw. 404 – nur mit 0,5–2× und „Hide Line“ sinnvoll. Unter den
  Übungen 409–415 fordert nur diese die Vorhersage über Sichtlücken (`antizipation` 3).
- **Weniger passend, wenn …** Rückmeldung/Fortschritt gewünscht oder Reaktion bzw. Handgenauigkeit das Ziel ist.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`: harter Hell-Dunkel-Wechsel (Hub relative Leuchtdichte ≈ 0,17, Kern ≈ 1,0; eigene
    Rechnung), bis ≈ 7, mit „Random Speed“ bis ≈ 12 Blitze/s; auslösend sind 1–65 Hz (am stärksten 15–25 Hz), bei
    5–24-Jährigen häufiger, rote Blitze sind ein eigener Faktor (Fisher et al., 2005). Harding-Grenzen: ≥ 3 Blitze/s,
    ≥ 0,006 sr, ≥ 20 cd/m²; zusätzlich gilt jeder Wechsel zu/von gesättigtem Rot als Risiko (Harding et al., 2005) –
    das Standardziel ist Rot: #ef4444 erreicht mit linearisierten sRGB-Werten R/(R+G+B) ≈ 0,88 und liegt damit über der
    WCAG-Arbeitsdefinition für „gesättigtes Rot“ (≥ 0,8); mit 8-Bit-Werten wären es nur 0,64 – die Rechenweise ist in
    WCAG nicht ausdrücklich festgelegt, daher vorsichtshalber als gesättigtes Rot werten (eigene Rechnung). WCAG 2.3.1: nicht mehr als 3 Blitze/s oder unter den Flächengrenzen (0,006 sr ≈ 25 % eines
    10°-Feldes). Das Standardziel am Monitor erreicht ≈ 3–13 % dieser Fläche, die Maximalgröße samt Leuchtsaum am Tablet
    (30 cm) nähert sich der Grenze. Die Blickfit-Grenze (≤ 2,5 Hz) wird ab ≈ 3,2–3,8×, WCAG 2.3.2 (≤ 3 Blitze/s) ab
    ≈ 3,8–4,7× überschritten (je nach Bildrate 75/60 Bilder/s; eigene Rechnung), mit „Random Speed“ schon ab ≈ 2× →
    immer Warnhinweis, niedriges Tempo, nicht Rot.
  - `migraene_lichtempfindlich`, `kopfschmerz_asthenopie`: kurze Sätze, bei Unwohlsein abbrechen;
    `trockenes_auge_bildschirm`: blinzeln, Pausen; `nystagmus`: Folgebewegung evtl. eingeschränkt;
    `presbyopie_gleitsicht`: kleineres Feld, Kopfbewegung; `sehbehinderung_niedriger_visus`: größer, Weiß/Gelb;
    `schwindel_vestibulaer`: kleines Ziel auf ruhigem Grund, daher meist gering – hohe Tempi meiden (wie 412);
    `gesichtsfeldausfall`: das Ziel taucht nach der Dunkelphase einige Grad neben dem Blick auf und kann im ausgefallenen
    Bereich verloren gehen; `kinder_unter_6`: abstrakt, ohne Rückmeldung, Blinkreiz – nicht empfohlen.
- **Kombiniert gut mit …** 412 (dieselbe Bewegung – Geraden mit Randabprallern, gleiches Tempo – ohne Dunkelphase;
  ohne Blinken praktisch eine Dublette, daher als Vorstufe), 414 (dieselbe Bewegung, statt Dunkelphasen Sprünge an einen
  neuen Ort), 407 (einzelne Verdeckung mit Landepunkt), 404/403 (andere Bahnen), 105, 107 (Verdeckung mit gemessenem
  Zeitfehler), 104 (Vorhersage mit der Hand).

Keine Diagnose, kein Heil- oder Sehversprechen; ein Nutzen für Sehen, Sport oder Verkehr ist nicht belegt.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Sicherheit:** Takt in ms; Verdeckung ≤ 2,5 Hz (600–1 200 ms sichtbar, 300–1 000 ms verdeckt), weich ein-/
  ausblenden, kein Leuchtsaum, kein gesättigtes Rot, kein „Day Mode“, Größe begrenzen, Warnhinweis, Stopp jederzeit.
  Besser: **räumliche Verdeckung** (Ziel läuft hinter Balken) statt Blinken.
- **Messung und Rückmeldung:** auf die vermutete Position tippen (Fehler in Grad) oder im Moment des Auftauchens
  (früh/spät in ms); Rückmeldung (bei Madelain & Krauzlis, 2003, wirkte ein Ton während genauer Folge; ob
  Rückmeldung nach dem Durchgang ähnlich wirkt, ist nicht untersucht).
- **Adaptiv:** Verdeckungsdauer 200 → 1 200 ms (3-down/1-up), Tempo in °/s (5–30°/s), Ring als Einstiegshilfe.
- **Gerät/Barrierefreiheit:** keine Bildraten-Drosselung; Tablet quer; Option „kleines Feld“; Standard Weiß/Gelb.
- **Kommunikation:** nicht „Stroboskop-Training“/„validiert“, keine Stufen ohne Normdaten, keine Sportversprechen.

## 11. Quellen

### Von der Website angegeben

- Appelbaum, L. G., Cain, M. S., Schroeder, J. E., Darling, E. F., & Mitroff, S. R. (2011). Stroboscopic visual
  training improves information encoding in short-term memory. *PLOS ONE, 6*(10), e27056.
  https://doi.org/10.1371/journal.pone.0027056 – **Prüfung:** DOI falsch (Sundqvist et al., 2011, Tundra-Pflanzen);
  richtig: (**2012**), *Attention, Perception, & Psychophysics, 74*(8), 1681–1691, https://doi.org/10.3758/s13414-012-0344-6
  ✓; **stützt die Aussage der Website:** teilweise – Kurzzeitgedächtnis nach Brillentraining besser; nichts zu Blickfolge.
- Mitroff, S. R., Friesen, P., Bennett, D., Yoo, H., & Appelbaum, L. G. (2013). Enhancing ice hockey skills through
  stroboscopic training. *Athletic Training & Sports Health Care, 5*(6), 261–264.
  https://doi.org/10.3928/19425864-20131030-02 – **Prüfung:** DOI stimmt ✓, letzter Autor aber Reichow, A. W., Titel
  verkürzt; **stützt die Aussage der Website:** teilweise – kleiner unverblindeter Pilot; Antizipation nicht gemessen.
- Smith, T. Q., & Mitroff, S. R. (2016). Stroboscopic training enhances anticipatory timing. *Journal of Sports
  Sciences, 34*(18), 1735–1742. https://doi.org/10.1080/02640414.2014.926384 – **Prüfung:** DOI falsch (Mooses et al.,
  Laufökonomie); richtig: (**2012**), *International Journal of Exercise Science, 5*(4), 344–353,
  https://doi.org/10.70252/OTSW1297 ✓; **stützt die Aussage der Website:** teilweise – Timing nur kurzfristig besser.
- Bennett, S. J., Orban de Xivry, J. J., Barnes, G. R., & Lefèvre, P. (2007). Target velocity prediction and the
  tracking of intermittently occluded targets. *Vision Research, 47*(7), 885–898.
  https://doi.org/10.1016/j.visres.2007.01.020 – **Prüfung:** nicht auffindbar (DOI gehört zu Berry et al., 2007);
  nächstliegend Bennett et al. (2007), „Target acceleration can be extracted and represented
  within the predictive drive to ocular pursuit“, *J. Neurophysiol. 98*(3), 1405–1414, https://doi.org/10.1152/jn.00132.2007 ✓; **stützt die Aussage
  der Website:** nein für „Training stärkt Kleinhirn/FEF“; teilweise für Geschwindigkeitsgedächtnis.
- Appelbaum, L. G., Schroeder, J. E., Cain, M. S., & Mitroff, S. R. (2012). Improved visual cognition through
  stroboscopic training. *Frontiers in Psychology, 3*, 276. https://doi.org/10.3389/fpsyg.2012.00276 – **Prüfung:** DOI
  falsch (Nagai, 2012); richtig: (**2011**), *Front. Psychol., 2*, 276, https://doi.org/10.3389/fpsyg.2011.00276 ✓;
  **stützt die Aussage der Website:** teilweise – zentral besser, peripher/MOT nicht; Sehschärfe nicht gemessen.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple
  reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI
  stimmt ✓; **stützt die Aussage der Website:** nein – Reaktionszeit/Hardware, nichts zu 144 Hz oder Kleinhirn.

### Weitere Fachliteratur

- Becker, W., & Fuchs, A. F. (1985). Prediction in the oculomotor system: Smooth pursuit during transient
  disappearance of a visual target. *Experimental Brain Research, 57*(3), 562–575. https://doi.org/10.1007/BF00237843
- Bennett, S. J., & Barnes, G. R. (2003). Human ocular pursuit during the transient disappearance of a visual target.
  *Journal of Neurophysiology, 90*(4), 2504–2520. https://doi.org/10.1152/jn.01145.2002 – Wiederbeschleunigung
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A,
  29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity.
  *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – kurzes Folgetraining ohne
  Belohnung, Test mit anderem Paradigma (Step-Ramp)
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A
  review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441.
  https://doi.org/10.1111/j.1528-1167.2005.31405.x
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when
  reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative
  Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures:
  Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425.
  https://doi.org/10.1111/j.1528-1167.2005.31305.x – Grenzwerte ≥ 3 Hz, ≥ 0,006 sr, gesättigtes Rot
- Lencer, R., Nagel, M., Sprenger, A., Zapf, S., Erdmann, C., Heide, W., & Binkofski, F. (2004). Cortical mechanisms
  of smooth pursuit eye movements with target blanking. An fMRI study. *European Journal of Neuroscience, 19*(5),
  1430–1436. https://doi.org/10.1111/j.1460-9568.2004.03229.x
- Madelain, L., & Krauzlis, R. J. (2003). Effects of learning on smooth pursuit during transient disappearance of a
  visual target. *Journal of Neurophysiology, 90*(2), 972–982. https://doi.org/10.1152/jn.00869.2002
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision
  Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5),
  M235–M238. https://doi.org/10.1093/geronj/49.5.M235
- Vera, J., Cantó-Cerdán, M., García-Ramos, A., & Redondo, B. (2026). Acute and long-term effects of stroboscopic
  training on sport performance: A systematic review and meta-analysis. *Journal of Sports Sciences, 44*(5), 604–615.
  https://doi.org/10.1080/02640414.2025.2598176
- Wilkins, L., & Appelbaum, L. G. (2020). An early review of stroboscopic visual training: Insights, challenges and
  accomplishments to guide future studies. *International Review of Sport and Exercise Psychology, 13*(1), 65–80.
  https://doi.org/10.1080/1750984X.2019.1582081
- W3C (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*, SC 2.3.1/2.3.2. https://www.w3.org/TR/WCAG22/ – Norm, keine DOI

Prüfvermerk: DOIs am 29.09.2026 per Crossref geprüft; Inhalte über PubMed-Abstracts bzw. Volltext (Wilkins &
Appelbaum, 2020). Frequenzen, Sehwinkel, Leuchtdichten und Raumwinkel sind eigene Berechnungen aus Code und Formeln.
