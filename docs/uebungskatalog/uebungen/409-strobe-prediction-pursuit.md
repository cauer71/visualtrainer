---
# ===== Kennung =====
nr: 409
kennung: strobe-prediction-pursuit
name: "Blickfolge mit Dunkelphasen (Ziel blendet weich aus)"
name_original: "Stroboskopisches Sehtraining – Blickvorhersage bei intermittierender Sicht (Strobe/Occlusion Prediction Pursuit)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/strobe-prediction-pursuit"
blickfit_umsetzung: {kennung: "dunkelphasen", name: "Dunkelphasen", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/dunkelphasen/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Eine Kugel gleitet geradlinig über den dunklen Bildschirm. Gelegentlich blendet sie weich aus, läuft unsichtbar weiter und taucht wieder auf; danach erscheint kurz ein Zeichen (Landolt-Ring) in ihr, dessen Öffnungsrichtung man meldet. Man folgt ihr nur mit den Augen und versucht, dort zu sein, wo sie wieder auftaucht. Es gibt kein Flackern: höchstens eine Dunkelphase alle 2 Sekunden."
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
geeignet_fuer: ["vorausschauende (prädiktive) Blickfolge üben: den Blick weiterbewegen, obwohl das Ziel kurz fehlt", "Einstieg in Verdeckungsaufgaben mit vorhersagbarer, gerader Bahn (auf den niedrigen Stufen hilft ein schwacher Umriss im Dunkeln)", "ruhige Augenübung mit Zeichenaufgabe und Rückmeldung, ohne Flackerreize", "Ergänzung zu gleichförmiger Blickfolge (412, 404) und zur Einzelverdeckung (407)"]
weniger_geeignet_fuer: ["Menschen mit Photosensitivität, Epilepsie in der Familie oder lichtempfindlicher Migräne (trotz des weichen Ausblendens vorher ärztlichen Rat einholen)", "alle, die einen Leistungswert oder einen Fortschritt in Prozent erwarten (das Ergebnis gilt nur im Vergleich mit sich selbst)", "Gleitsichtträger:innen an großen Monitoren (das Ziel läuft über die ganze Bildbreite in die unscharfe Randzone)", "Kinder, die abstrakte Aufgaben nicht durchhalten", "Ziel 'Reaktion' oder 'Zielgenauigkeit der Hand' (gefordert ist nur ein Tipp als Antwort)"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Blickfolge während einer Verdeckung ist im Labor mit Rückmeldung trainierbar (Gain 0,59 → 0,89, Madelain & Krauzlis 2003), ohne Rückmeldung nur wenig (0,63 → 0,71); diese Übung meldet nach jedem Zeichen zurück, ist aber eine andere Aufgabe als die Laborstudie. Naher Transfer nur als schwacher Laborhinweis: Übertrag auf ungeübte Geschwindigkeiten in der belohnten Gruppe (Madelain & Krauzlis 2003), kurzes Folgetraining ohne Belohnung verbesserte die Folgebewegung in einem anderen Test (Eibenberger et al. 2012, N = 10). Die Strobe-Brillen-Forschung (Sportübungen mit Shutterbrille, ganzes Gesichtsfeld) ist auf ein weich ausblendendes Bildschirmziel nicht übertragbar; ein Alltagsnutzen ist nicht untersucht."
aehnliche_uebungen: [412, 407, 414, 404, 403, 406, 105, 107, 104, 109]
stichworte: ["Verdeckung", "Okklusion", "target blanking", "prädiktive Blickfolge", "smooth pursuit", "Antizipation", "extraretinale Signale", "Geschwindigkeitsgedächtnis", "Stroboskop", "Photosensitivität"]
---

# 409 · Blickfolge mit Dunkelphasen (Ziel blendet weich aus)

> Original: „Stroboskopisches Sehtraining – Blickvorhersage bei intermittierender Sicht“ – skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Auf ruhigem, dunklem Grund läuft eine weißliche Kugel mit gleichmäßigem Tempo geradeaus; vor dem Rand dreht sie weich bei (kein harter
Abprall). Gelegentlich blendet sie sinusförmig aus, läuft unsichtbar und gerade weiter und blendet wieder ein. Direkt danach erscheint kurz
ein Landolt-Ring („C“) in der Kugel; mit einem großen Button unten meldet man, wohin seine Öffnung zeigt (←, ↑, ↓, →). Man folgt der Kugel nur
mit den Augen und versucht, beim Wiederauftauchen schon dort zu sein. Eine Sitzung umfasst 10 Dunkelphasen mit je einem Zeichen. Es gibt kein
Flackern: Jede Blende dauert mindestens 200 ms, es gibt höchstens eine Dunkelphase alle 2 s, keinen Leuchtsaum und kein Rot; vor der Übung
steht ein Hinweis für lichtempfindliche Menschen. In 20 Stufen werden die Dunkelphase (Ein- und Ausblenden 330 auf 200 ms, völlige
Dunkelheit dazwischen 0,2 auf 0,7 s), die Zeit bis zum Zeichen (700 auf 280 ms), das Tempo (am Tablet in 40 cm von etwa 3 auf etwa 8°/s) und die
Zeichengröße strenger; auf den Stufen 1–3 zeigt ein schwacher Umriss im Dunkeln, wo die Kugel ist, bis Stufe 8 blendet er aus. Nach jedem
Zeichen gibt es ✓/✗ als Rückmeldung. Ob die Augen im Dunkeln wirklich weiterlaufen, wird nicht gemessen, nur ob das Zeichen erkannt wird.

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

- **Tempo und Ziel:** Das Tempo liegt am Tablet in 40 cm bei etwa 3–8°/s; glatte Folgebewegung reicht im Labor bei 4 von 5 Personen bis ≈ 100°/s
  mit ≈ 90 % Gain (Meyer et al., 1985) – die Folge selbst ist also leicht, schwierig ist die Sichtlücke. Der Landolt-Ring hat eine Öffnung von
  einem Fünftel des Durchmessers; die Sehschärfe ist kaum gefordert.
- **Im Dunkeln:** Bei Verdeckung bleibt die Augengeschwindigkeit ≈ 190 ms unverändert, dann sinkt sie auf 40–60 % (Becker & Fuchs, 1985); bei
  1 s Verdeckung sind es ≈ 30 % (Lencer et al., 2004). Eine Dunkelphase dauert hier insgesamt etwa 0,9 s (Stufe 1) bis 1,1 s (Stufe 20), davon
  0,2 bis 0,7 s völlige Dunkelheit. Das Auge bremst bei Verdeckung ohnehin ab; das ist normal und kein Zeichen von „Untrainiertheit“.
- **Blenden statt Blinken:** Das Ziel blendet mit einer halben Kosinuswelle aus und ein, jede Halbwelle dauert mindestens 200 ms – gleichwertig
  einer Sinusschwingung von höchstens 2,5 Hz; eine Dunkelphase beginnt höchstens alle 2 s (≤ 0,5 Hz). Die Bahn bleibt in der Dunkelphase gerade:
  Läuft das Ziel auf eine Wand zu, wird es vorher zur freien Seite gelenkt, und das Zeichen erscheint nur, wenn noch genug freie Strecke vor ihm
  liegt.
- **Gleitsicht:** Der scharfe Zwischenbereich ist seitlich nur ≈ 13–18° breit; am Bildschirm dauerten Kopf- und Augenbewegungen mit Gleitsicht
  länger (Han et al., 2003, Lesen in 60 cm). Ein 24-Zoll-Monitor in 60 cm ist ≈ 48° breit – das Ziel läuft in die Randunschärfe, unten in den
  Nahteil. Kopfbewegung zulassen; besser Bildschirmbrille oder kleineres Feld. **Presbyopie:** am Tablet Nahkorrektur nötig (Rechenregel: 40 cm =
  2,5 dpt, 20 cm = 5 dpt, 10 cm = 10 dpt).
- **Weiteres:** Konzentriertes Verfolgen senkt die Lidschlagrate (trockenes Auge). Die Kugel ist weißlich, Farbe trägt keine Information; eine
  Rot-Grün-Schwäche (≈ 8 % der Männer; Birch, 2012) beeinträchtigt die Aufgabe daher kaum. Der Folge-Gain ist bei 75–93-Jährigen geringer, besonders bei
  hohem Tempo (Moschner & Baloh, 1994).

## 5. Neurowissenschaftliche Grundlagen

Bei sichtbarem Ziel liefern MT/V5 und MST das Bewegungssignal, FEF-Folgeareal und Kleinhirn setzen es um. Ohne Ziel treiben Efferenzkopie und
ein Kurzzeitspeicher für Geschwindigkeit und Zeitpunkt die Folgebewegung weiter (extraretinale Signale; Bennett & Barnes, 2003). Blickfolge ohne
sichtbares Ziel aktivierte zusätzlich FEF, supplementäres Augenfeld, Parietalkortex, dorsolateralen präfrontalen Kortex, Kleinhirn und Basalganglien
(fMRT, N = 16; Lencer et al., 2004). Die Stärke des extraretinalen Signals ist mit Belohnung lernbar (Madelain & Krauzlis, 2003); dass diese Übung
Areale „stärkt“, ist nicht belegt. Klinisch werden die äußeren Augenmuskeln geprüft, indem die Augen einem nahen Ziel folgen, das in einem „H“ geführt
wird; die Prüfung betrifft die Hirnnerven III, IV und VI (Muchnick, 2008, S. 32–35); diese Übung ist keine solche Prüfung.

## 6. Motorische Grundlagen

Außer dem Antworttipp keine Handbewegung; die „Motorik“ der Übung sind Folgebewegung und Aufholsakkaden. Ein ruhiger Kopf isoliert die
Augenbewegung, bei Gleitsicht ist Kopfbewegung normal.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Blickmessung:** Gain und Sakkaden lassen sich nur mit Eyetracker bestimmen; hier wird nur das Erkennen des Zeichens nach dem
  Wiederauftauchen gewertet. Es lässt sich auch lösen, wenn der Blick im Dunkeln zurückbleibt und erst danach aufholt.
- **Gerät:** Das Zeitverhalten (Blenden, Dunkelphase) ist zeitbasiert und unabhängig von der Bildrate; Grad pro Sekunde hängen von Bildgröße und
  Abstand ab (am nahen Tablet mehr °/s). Ergebnisse verschiedener Geräte (Touch, Maus, Tablet, Monitor) nicht gleichsetzen: Zwei Verfahren können
  ähnliche Tendenzen zeigen, ohne dieselben Werte zu liefern (Mountford et al., 2004, S. 24).
- **Einstellung und Person:** Der schwache Umriss auf den niedrigen Stufen erleichtert die Vorhersage; Alter, Müdigkeit, Konzentration.
- **Streuung:** Messungen am Menschen streuen stärker als an Prüfkörpern; ein einzelnes Zeichen sagt wenig, und aussagekräftig ist nur der Verlauf
  über mehrere Sitzungen (Mountford et al., 2004, S. 43–44).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Laborgain während Verdeckung mit belohnendem Ton bei genauer Folge 0,59 → 0,89 (8–10 Tagessitzungen), ohne Ton nur
  0,63 → 0,71 (Madelain & Krauzlis, 2003). Diese Übung gibt Rückmeldung (✓/✗ nach jedem Zeichen), aber nicht für genaues Folgen, sondern fürs
  Erkennen; ob das ähnlich wirkt, ist nicht untersucht.
- **Naher Transfer – schwach:** Übertrag auf ungeübte Geschwindigkeiten und strukturierten Hintergrund nur in der belohnten Laborgruppe (Madelain &
  Krauzlis, 2003); kurzes Folgetraining ohne Belohnung (quasi-zufälliges Ziel, 2 × 6 min an 3 Tagen) verbesserte die Folgebewegung in einem
  anderen Test (Step-Ramp), 5 Tage später noch messbar (Eibenberger et al., 2012, N = 10). Für Dunkelphasen-Folgen wie hier nicht eigens untersucht
  – gleiche Einstufung wie bei den übrigen Blickfolge-Übungen 410–413 und 415.
- **Alltagstransfer – fehlend:** Strobe-Brillen (Shutterbrillen über das ganze Gesichtsfeld, z. B. 100 ms offen / 67–900 ms zu) bei Sportübungen:
  Kurzzeitgedächtnis und zentrale Bewegungsempfindlichkeit besser (Appelbaum et al., 2012; Appelbaum et al., 2011), ein Timing-Vorteil nur
  kurzfristig (sofort und nach 10 min, nicht nach 10 Tagen; Smith & Mitroff, 2012), Eishockey nur als kleine, unverblindete Pilotstudie (Mitroff et
  al., 2013); eine Metaanalyse (17 Studien, sportspezifische Tests) fand akut schlechtere, nach längerem Training ≈ 5–6 % bessere Leistungen bei
  uneinheitlichen Protokollen (Vera et al., 2026; Überblick: Wilkins & Appelbaum, 2020). Dynamische Sehschärfe wurde nie gemessen. Für ein
  weich ausblendendes Bildschirmziel wurde keine Studie gefunden (PubMed, 09/2026).
- **Praxisangaben (Erfahrungswissen, nicht belegt):** Aufgaben mit Sichtlücken werden in der Praxis am eigenen Arbeitspunkt begonnen und in
  kleinen, selbst gesteuerten Schritten gesteigert.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** vorausschauendes Folgen mit den Augen mit einfacher Antwort geübt werden soll, als Schritt nach 412 (dieselbe Bewegung ohne
  Dunkelphasen) bzw. 404; auf den niedrigen Stufen mit schwachem Umriss beginnen. Unter den Übungen 409–415 fordert nur diese die Vorhersage über
  Sichtlücken (`antizipation` 3).
- **Weniger passend, wenn …** ein Leistungswert gewünscht ist oder Reaktion bzw. Handgenauigkeit das Ziel ist.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`: Die Kugel blinkt nicht, sie blendet weich aus und ein (jede Blende mindestens 200 ms, höchstens eine Dunkelphase
    alle 2 s, also ≤ 0,5 Hz; kein Leuchtsaum, kein Rot, keine Vollflächeneffekte). Als auslösend gelten Frequenzen von 1–65 Hz (am stärksten
    15–25 Hz), bei 5–24-Jährigen häufiger; rote Blitze sind ein eigener Faktor (Fisher et al., 2005). Die Grenzwerte (≥ 3 Blitze/s, Flächenschwelle
    0,006 sr, gesättigtes Rot; Harding et al., 2005; W3C, 2024) werden nicht erreicht. Trotzdem Warnhinweis beachten und bei Unwohlsein abbrechen.
    Anfälle und Epilepsie gehören zu den neurologischen Vorerkrankungen, nach denen in der Anamnese gefragt wird (Muchnick, 2008, S. 7); das Lehrbuch
    äußert sich nicht zu Lichtreizen.
  - `migraene_lichtempfindlich`, `kopfschmerz_asthenopie`: kurze Sätze, bei Unwohlsein abbrechen.
  - `trockenes_auge_bildschirm`: blinzeln, Pausen. `nystagmus`: Folgebewegung evtl. eingeschränkt. `presbyopie_gleitsicht`: kleineres Feld,
    Kopfbewegung. `sehbehinderung_niedriger_visus`: größer, hell auf dunkel.
  - `schwindel_vestibulaer`: kleines Ziel auf ruhigem Grund, daher meist gering – hohe Stufen meiden.
  - `gesichtsfeldausfall`: Das Ziel taucht nach der Dunkelphase einige Grad neben dem Blick auf und kann im ausgefallenen Bereich verloren gehen.
  - `kinder_unter_6`: abstrakt, Dunkelphasen – nicht empfohlen.
  - Warnzeichen: Doppelbilder, plötzlicher einseitiger Sehverlust, Lichtblitze oder neue Schleier, Kopfschmerz mit Sehverschlechterung, Schwindel
    oder neu auftretendes Zittern gehören in eine ärztliche Abklärung (Muchnick, 2008, S. 6, 28); dann nicht üben.
- **Kombiniert gut mit …** 412 (dieselbe Bewegung ohne Dunkelphase; als Vorstufe), 414 (dieselbe Bewegung, statt Dunkelphasen Sprünge an einen neuen
  Ort), 407 (einzelne Verdeckung mit Landepunkt), 404/403 (andere Bahnen), 105, 107 (Verdeckung mit gemessenem Zeitfehler), 104 (Vorhersage mit
  der Hand).

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

- Appelbaum, L. G., Cain, M. S., Schroeder, J. E., Darling, E. F., & Mitroff, S. R. (2012). Stroboscopic visual training improves information encoding in short-term memory. *Attention, Perception, & Psychophysics, 74*(8), 1681–1691. https://doi.org/10.3758/s13414-012-0344-6 – **Prüfung:** Die Website nennt Jahr, Zeitschrift und eine falsche DOI (die DOI gehört zu einer anderen Arbeit) (Sundqvist et al., 2011, Tundra-Pflanzen);
  richtig: (**2012**), *Attention, Perception, & Psychophysics, 74*(8), 1681–1691, https://doi.org/10.3758/s13414-012-0344-6
  ✓; **stützt die Aussage der Website:** teilweise – Kurzzeitgedächtnis nach Brillentraining besser; nichts zu Blickfolge.
- Mitroff, S. R., Friesen, P., Bennett, D., Yoo, H., & Reichow, A. W. (2013). Enhancing ice hockey skills through stroboscopic visual training: A pilot study. *Athletic Training & Sports Health Care, 5*(6), 261–264. https://doi.org/10.3928/19425864-20131030-02 – **Prüfung:** DOI stimmt ✓; die Website nennt den letzten Autor falsch und den Titel
  verkürzt; **stützt die Aussage der Website:** teilweise – kleiner unverblindeter Pilot; Antizipation nicht gemessen.
- Smith, T. Q., & Mitroff, S. R. (2012). Stroboscopic training enhances anticipatory timing. *International Journal of Exercise Science, 5*(4), 344–353. https://doi.org/10.70252/OTSW1297 – **Prüfung:** Die Website nennt Jahr, Zeitschrift und eine falsche DOI (Mooses et al.,
  Laufökonomie); richtig: (**2012**), *International Journal of Exercise Science, 5*(4), 344–353,
  https://doi.org/10.70252/OTSW1297 ✓; **stützt die Aussage der Website:** teilweise – Timing nur kurzfristig besser.
- Bennett, S. J., Orban de Xivry, J. J., Barnes, G. R., & Lefèvre, P. (2007). Target velocity prediction and the
  tracking of intermittently occluded targets. *Vision Research, 47*(7), 885–898.
  https://doi.org/10.1016/j.visres.2007.01.020 – **Prüfung:** nicht auffindbar (DOI gehört zu Berry et al., 2007);
  nächstliegend Bennett et al. (2007), „Target acceleration can be extracted and represented
  within the predictive drive to ocular pursuit“, *J. Neurophysiol. 98*(3), 1405–1414, https://doi.org/10.1152/jn.00132.2007 ✓; **stützt die Aussage
  der Website:** nein für „Training stärkt Kleinhirn/FEF“; teilweise für Geschwindigkeitsgedächtnis.
- Appelbaum, L. G., Schroeder, J. E., Cain, M. S., & Mitroff, S. R. (2011). Improved visual cognition through stroboscopic training. *Frontiers in Psychology, 2*, 276. https://doi.org/10.3389/fpsyg.2011.00276 – **Prüfung:** Die Website nennt das Jahr und eine falsche DOI (Nagai, 2012); richtig: (**2011**), *Front. Psychol., 2*, 276, https://doi.org/10.3389/fpsyg.2011.00276 ✓;
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
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen, Augenbewegungsprüfung, Sehbahn (S. 6, 28, 32–35)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messgrundsätze: Wiederholbarkeit, Mehrfachmessung (S. 24, 43–44)
