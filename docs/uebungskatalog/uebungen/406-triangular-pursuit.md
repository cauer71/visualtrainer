---
# ===== Kennung =====
nr: 406
kennung: triangular-pursuit
name: "Dreiecksbahn (Blickfolge mit abrupten Richtungswechseln)"
name_original: "Dreieckige Blickverfolgung – Diagonale Blickfolge und Eckpunkt-Reerfassung (Triangular Pursuit)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/triangular-pursuit"
blickfit_umsetzung: {kennung: "dreiecksbahn", name: "Dreiecksbahn", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/dreiecksbahn/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Eine Kugel läuft mit gleichmäßigem Tempo auf einem gleichseitigen Dreieck, im oder gegen den Uhrzeigersinn; in den Ecken ändert sie abrupt die Richtung (um 120°). Man folgt ihr nur mit den Augen und meldet ein auf den Kanten kurz erscheinendes Zeichen (Landolt-Ring). Auf niedrigen Stufen sind die Ecken abgerundet. Ob die Augen wirklich folgen, wird nicht gemessen."
ziel_funktionen: [blickfolge]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 60
schwierigkeit_anpassung: "Kein Levelsystem, keine automatische Anpassung. Manuell: Tempo 0,5–9× (Regler in 0,1-Schritten; 1× = eine Kante in 1,54 s, eine Runde in 4,6 s), Zielradius 10–50 px (Standard 16 px = Radius), 'Hide Line' blendet das Dreieck aus, 'Random Speed' lässt das Tempo zeitabhängig zwischen 0,4- und 1,9-fach schwanken (Ecken zeitlich weniger vorhersagbar). Dauer 30/45/60/90/120 s."
messgroessen: ["Original: keine Leistungsmessung (nur Zähler abgeschlossener Sitzungen)", "sinnvoll mit Eyetracker: Folge-Gain je Kante, Aufholsakkaden und Blickfehler kurz nach jeder Ecke, antizipatorisches Abbremsen/Kurvenschneiden vor der Ecke", "Ersatz ohne Eyetracker: Zeigerabstand beim Mitführen mit Finger/Maus in den 300 ms nach jeder Ecke", "Ersatz ohne Eyetracker: Erkennungsaufgabe (kurz im Ziel eingeblendetes Zeichen) direkt nach dem Richtungswechsel"]

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
    sakkaden: 2
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
    verarbeitungsgeschwindigkeit: 0
    antizipation: 2
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
voraussetzungen: ["Bildschirm oder Tablet (quer) auf fester Unterlage, Abstand 40–70 cm, Kopf möglichst ruhig", "Scharfes Sehen im Zwischenbereich über ≈ 32° Breite und ≈ 18° Höhe (Monitor) – Arbeitsplatzbrille oder Einstärkenglas günstiger als Gleitsicht", "Maus oder Finger nur zum Starten; während der Übung keine Eingabe", "Bereitschaft, ohne Rückmeldung 30–120 s konzentriert zu folgen"]
vorsicht_bei: [presbyopie_gleitsicht, schwindel_vestibulaer, reisekrankheit, nystagmus, schielen_binokular, trockenes_auge_bildschirm, kopfschmerz_asthenopie, kinder_unter_6]
geeignet_fuer: ["Blickfolge auf geraden Bahnen mit regelmäßigen, vorhersagbaren Richtungswechseln üben (waagrecht und schräg, auch schräg aufwärts)", "Wechsel von glatter Folge zu Aufholsakkade und zurück bewusst erleben (Selbstbeobachtung an den Ecken)", "Steigerung nach 404/402: gleiche Ruhe, aber mit Ecken; zuerst mit abgerundeten Ecken und sichtbarer Linie, dann mit spitzen Ecken ohne Linie", "kurze Augenübung ohne Körpereinsatz (nur ein Tipp als Antwort) und ohne Blitzreize"]
weniger_geeignet_fuer: ["alle, die einen Leistungswert oder einen Fortschritt in Prozent erwarten (das Ergebnis gilt nur im Vergleich mit sich selbst)", "Gleitsichtträger:innen am großen Monitor (das Dreieck reicht oben in den Fern-, unten in den Nahbereich des Glases und seitlich in die Unschärfezonen)", "Einsteiger:innen und Ältere auf hohen Stufen – mit niedrigen Stufen beginnen", "Ziel Reaktion, Hand-Zielgenauigkeit, Peripherie oder Lesen (nicht gefordert bzw. nicht belegt)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Wiederholte Bahnen mit Richtungswechseln werden im Labor nach wenigen Durchgängen vorausschauend verfolgt (Barnes & Schmid, 2002; Barnes & Collins, 2015), kurzes Pursuit-Training wirkte einige Tage nach (Eibenberger et al., 2012) – alles mit Eyetracker, nicht mit dieser Übung; ob sich die Reaktion auf unvorhersehbare Ecken (≈ 90–130 ms) durch Training verkürzt, ist nicht belegt, ein Nutzen für Sport oder Alltag wurde nie untersucht."
aehnliche_uebungen: [405, 413, 415, 410, 402, 403, 404, 407, 105, 513, 514, 707, 303]
stichworte: ["Dreieck", "Polygon", "Richtungswechsel", "Ecken", "diagonale Blickfolge", "smooth pursuit", "glatte Blickfolge", "Aufholsakkaden", "Catch-up-Sakkaden", "antizipatorische Blickfolge", "Sequenzlernen", "Kurvenschneiden"]
---

# 406 · Dreiecksbahn (Blickfolge mit abrupten Richtungswechseln)

> Original: „Dreieckige Blickverfolgung – Diagonale Blickfolge und Eckpunkt-Reerfassung“ („Triangular Pursuit“) – skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Auf ruhigem, dunklem Grund zeigt eine schwache Hilfslinie ein gleichseitiges Dreieck mit der Spitze oben. Eine Kugel läuft mit
gleichmäßigem Tempo – auf allen drei Kanten gleich viele Grad pro Sekunde – im oder gegen den Uhrzeigersinn (zufällig gewählt). In den
Ecken ändert sich die Richtung abrupt um 120°; auf niedrigen Stufen sind die Ecken abgerundet, ab Stufe 9 sind sie spitz. Man folgt der
Kugel nur mit den Augen bei ruhigem Kopf. In unregelmäßigen Abständen erscheint kurz ein Landolt-Ring („C“) in der Kugel, nur auf den
Kanten und mit Abstand zu jeder Ecke; mit einem großen Button unten meldet man, wohin seine Öffnung zeigt (←, ↑, ↓, →). Eine Sitzung
umfasst 20 Zeichen. Das Tempo steigt in 20 Stufen (am Tablet in 40 cm Abstand von etwa 3,7 auf etwa 16°/s), Zeichengröße und
Anzeigedauer (650 bis 240 ms) werden strenger, die Hilfslinie blendet aus. Die Bahn ist höchstens 60 % der Bildschirmbreite breit. Ob die
Augen wirklich folgen, wird nicht gemessen, nur ob das Zeichen erkannt wird.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und Spielcode (Chunk `51342-…js`, Hilfsmodule `90762-…js`, `71254-…js`, Stand 29.09.2026); nur
Mechanik ausgewertet. Grad = eigene Umrechnung (24″-Full-HD ≈ 38 px/° bei 60 cm; 11″-Tablet ≈ 36 px/° bei 40 cm).

- **Ablauf (Code):** Einstellungen → Vollbild → Countdown 3-2-1-GO (≈ 2,5 s, Töne) → 30–120 s → Endbildschirm
  „COMPLETE“ mit Sitzungszähler (localStorage). Maus/Touch nur zum Starten; der Zeiger wird **gar nicht** verarbeitet.
- **Bahn (Code):** Ecken bei (50 % | 18 %), (82 % | 82 %), (18 % | 82 %) von Bildbreite/-höhe – das Dreieck ist immer
  64 % breit und 64 % hoch, **gleichseitig nur bei Seitenverhältnis 1,15 : 1**. Bei 16 : 9: Spitze 83°, Basisecken 48°
  (Wechsel 97° oben, 132° unten); Tablet quer 71°/54°; hochkant 38°/71°. Start an der Spitze, fest im Uhrzeigersinn.
- **Bewegung (Code):** lineare Interpolation, zeitbasiert (dt, max. 100 ms). **Jede Kante dauert gleich lang**
  (1× = 1,54 s) – bei 16 : 9 ist die Basis ≈ 1,33-mal schneller als die Schrägen. Kein Abbremsen an den Ecken.

| Tempo | 0,5× | 1× | 2× | 3× | 5× | 7× | 9× |
|---|---|---|---|---|---|---|---|
| Dauer je Kante / Runde (s) | 3,1 / 9,2 | 1,5 / 4,6 | 0,77 / 2,3 | 0,51 / 1,5 | 0,31 / 0,92 | 0,22 / 0,66 | 0,17 / 0,51 |
| 24″-Full-HD, 60 cm (Dreieck 32° × 18°): Schräge / Basis °/s | 8 / 10 | 16 / 21 | 31 / 41 | 47 / 62 | 78 / 103 | 110 / 144 | 141 / 185 |
| 11″-Tablet quer, 40 cm (21° × 15°): Schräge / Basis °/s | 6 / 7 | 12 / 14 | 23 / 27 | 35 / 41 | 58 / 68 | 81 / 94 | 104 / 121 |

- **Reiz (Code):** „Size 16 px“ = **Radius** (Ring Ø 32 px ≈ 0,84°), 10–50 px; Leuchtsaum; sechs Farben ohne Information;
  Linie 2,5 px (25 % Deckkraft). Optional Spur (15 Positionen), „Scanlines“, „Day Mode“. Keine Blitze.
- **„Random Speed“ (Code):** feste Summe langsamer Sinusschwingungen (≈ 0,13–0,5 Hz), Faktor 0,40–1,90 (Mittel 1,15),
  auch innerhalb einer Kante – die Ecken kommen zeitlich weniger vorhersagbar.
- **Bildrate (Code):** ≤ 77 Bilder/s (Bilder < 13 ms verworfen); bei 9× springt das Ziel ≈ 3° pro Bild (60 Hz).

**Widersprüche Regeltext ↔ Code:** (1) „Prüfe Eckpunktfehler und Zielverluste“, Tabelle mit „Landefehler (px)“ und
„Sakkadische Latenz“ – nichts wird gemessen. (2) „60°-Ecken, 120°-Richtungsbrüche“ – nur bei fast quadratischem Bild.
(3) „Bremse vor dem Eckpunkt ab“ – das Ziel bremst nicht. (4) „In der Mitte auf das Ziel fokussieren“ – Start ist die Spitze.

## 3. Was die Website sagt – und wie das einzuordnen ist

Polygon-Tracking fordere die Kopplung horizontaler (PPRF) und vertikaler (riMLF) Blickzentren; an Ecken lösten FEF/SEF
„prädiktive Fangsakkaden“ aus. Training baue Kleinhirn-Vorwärtsmodelle auf, die ≈ 40 ms vor der Ecke bremsen, und senke
„korrigierende Mikrosakkaden um über 60 %“. Zielgruppen: Shooter, Squash/Tennis/Eishockey („verkürzt die
Wiedererfassungszeit erheblich“). Stufentabelle von „Elite: Landefehler < 12 px, Latenz < 110 ms, Top 1,5 %“ abwärts.

- **Stufen ohne Datengrundlage:** Die Seite misst weder Augen noch Zeiger und sammelt keine Daten; keine Quelle enthält
  Stufen oder Populationsanteile, „Heinen et al. (2005)“ mit diesem Titel existiert nicht. Real: Auf einen
  **unvorhersehbaren** Richtungswechsel sinkt die Augengeschwindigkeit nach ≈ 90 ms, die Richtung ändert sich ab ≈ 130 ms
  (Soechting et al., 2005); Aufholsakkaden folgen nach ≈ 125 ms (de Brouwer et al., 2002).
- **Richtig im Kern:** Diagonale Folge hat eine horizontale und eine schwächere vertikale Komponente (Rottach et al.,
  1996), aufwärts schwächer als abwärts (Ke et al., 2013); Folge und Aufholsakkade arbeiten als ein Prozess (Orban de Xivry
  & Lefèvre, 2007); an Ecken einer Rautenbahn zeigen Augen antizipatorische Richtungsfehler (Collewijn & Tamminga, 1984) –
  „Kurvenschneiden“ gibt es, ist aber normale Vorhersage, keine Fehlfunktion (Kowler et al., 2019).
- **Falsch zugeordnet/unbelegt:** PPRF und riMLF sind Hirnstamm-Generatoren für **Sakkaden** (Sparks, 2002), nicht
  Schaltstellen der Folge (Brückenkerne, Kleinhirn; Lencer & Trillenberg, 2008). „Mikrosakkaden“ sind Fixationsbewegungen, keine
  Aufholsakkaden. „40 ms“ und „−60 %“ stehen nicht in Barnes (2008) bzw. Leigh & Zee (2015); Sport-/Shooter-Nutzen ist
  nicht untersucht. „144/240 Hz eliminiert Quantisierungsfehler“ steht nicht in Woods et al. (2015) – ohne Eingabe spielt
  Latenz keine Rolle, der Code begrenzt ohnehin auf ≤ 77 Bilder/s.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Der Landolt-Ring misst 6 % der kürzeren Bildschirmseite (Stufe 1) und wird mit der Stufe kleiner (nie unter 30 px); die
  Öffnung ist ein Fünftel des Durchmessers. Am 11-Zoll-Tablet in 40 cm sind das etwa 1,4° bis etwa 0,8° – die Sehschärfe ist kaum gefordert.
  Ein kleines, in die Fovea passendes Ziel erzeugt mehr Aufholsakkaden als ein größeres Objekt (Heinen et al., 2016); ein größerer Ring
  erleichtert Einsteiger:innen zumindest das Wiederfinden an den Ecken (Einschätzung, nicht untersucht).
- **Kanten:** Folgelatenz ≈ 100 ms (Carl & Gellman, 1987), Gain < 0,95, Aufholsakkaden normal (Collewijn & Tamminga, 1984); waagrechte
  periodische Dreieckbewegung wird bis ≈ 75°/s annähernd linear mit Gain ≈ 0,9 verfolgt (Buizza & Schmid, 1986) – das Tempo dieser Übung
  (bis ≈ 16°/s) liegt deutlich darunter. Schräg aufwärts ist am schwersten (Rottach et al., 1996; Ke et al., 2013).
- **Ecken:** Unvorhergesehen antwortet das Auge als Summe „alte Richtung stoppen“ + „neue starten“ (Soechting et al., 2005), die Hand ebenso
  (Engel et al., 2000); Aufholsakkaden folgen nach ≈ 125 ms (de Brouwer et al., 2002). Bei fester Sequenz entsteht nach 2–3 Wiederholungen
  eine vorausschauende Antwort (Barnes & Schmid, 2002); auf einer Vierecksbahn beginnen Abbremsen und Beschleunigen in der neuen Richtung
  fast gleichzeitig **vor** der Ecke, stärker bei vorhersagbarem Takt (Barnes & Collins, 2015). Auf niedrigen Stufen nehmen die
  abgerundeten Ecken der Aufgabe die Schärfe; ab Stufe 9 sind sie spitz.
- **Hintergrund, Alter:** Strukturierte Hintergründe senken den glatten Gain waagrecht um ≈ 10 %, senkrecht um ≈ 20 % (Collewijn & Tamminga,
  1984); der Hintergrund der Übung bleibt ruhig. Mit dem Alter lassen Grundparameter der Folge nach, die Vorhersage bleibt (Sprenger et al.,
  2011, u. a. mit geglätteter Dreieckbewegung) → niedrige Stufen wählen.
- **Gleitsicht/Arbeitsplatz:** Das Dreieck ist am Monitor deutlich breiter als der scharfe Zwischenbereich; das klare Sehfeld zweier
  untersuchter Gleitsichtgläser war in 60 cm nur ≈ 13° bzw. 18° breit (Einstärkenglas ≈ 60°), mit längeren Augen- und Kopfbewegungen (Han et
  al., 2003). Die Spitze fällt in den Fernteil, die Basis Richtung Nahteil – beides in 60 cm unscharf. Besser Arbeitsplatzbrille, kleineres
  Feld, Kopfbewegung erlauben. Tablet in 40 cm: ≈ 2,5 dpt Nahbedarf (Rechenregel: 20 cm = 5 dpt, 10 cm = 10 dpt).
- **Trockenes Auge:** Beim Lesen am Bildschirm (50 cm) im Mittel 11,6 Lidschläge/min, davon ≈ 16 % unvollständig (Portello et al., 2013) →
  kurze Durchgänge, bewusst blinzeln. Farbe spielt keine Rolle.

## 5. Neurowissenschaftliche Grundlagen

- Signale aus MT/V5 und MST laufen über das Folgeareal des frontalen Augenfelds, das supplementäre Augenfeld, Brückenkerne und Kleinhirn
  (Flocculus/Paraflocculus, hinterer Vermis) zu den Augenmuskelkernen (Lencer & Trillenberg, 2008). Nach Vermis-Läsion sank bei Affen der Gain
  für Dreieckbewegung um bis zu 15 % (Takagi et al., 2000) – Beteiligung, kein Trainingsbeleg.
- Vorhersagende Folge ist mit frontalem Kortex und Bewegungsarealen verknüpft (Kowler et al., 2019); Geschwindigkeit und Reihenfolge von
  mindestens vier Bahnabschnitten werden kurz gespeichert (Barnes & Schmid, 2002). „Kurvenschneiden“ an Ecken ist normales
  Vorhersageverhalten, keine Fehlfunktion (Kowler et al., 2019; Collewijn & Tamminga, 1984).
- Die Aufholsakkade an der Ecke erzeugen Burst-Generatoren im Hirnstamm; die horizontalen (PPRF) und vertikalen (riMLF) Blickzentren sind
  Generatoren für **Sakkaden**, nicht Schaltstellen der Folge (Sparks, 2002). Mikrosakkaden sind Fixationsbewegungen, keine Aufholsakkaden.
  Folge und Aufholsakkade arbeiten als ein sensomotorischer Prozess zusammen (Orban de Xivry & Lefèvre, 2007). Dass die Übung diese Netzwerke
  „stärkt“, ist nicht untersucht.
- **Klinischer Hintergrund:** Die äußeren Augenmuskeln werden klinisch geprüft, indem die Augen einem nahen Ziel folgen, das in einem „H“
  geführt wird; die Prüfung betrifft die Hirnnerven III, IV und VI (Muchnick, 2008, S. 32–35). Diese Übung ist keine solche Prüfung.

## 6. Motorische Grundlagen

Die „Motorik“ der Übung ist die Augenbewegung (glatte Folge + Aufholsakkaden); dazu kommt der Antworttipp auf einen großen Button. Wer
zusätzlich mit Finger oder Maus mitfährt, übt manuelles Tracking mit ähnlicher Eckendynamik (Engel et al., 2000); die Übung verlangt und
wertet das nicht.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Blickmessung:** Ob glatt gefolgt wurde, bleibt offen; das Zeichen lässt sich auch mit einzelnen Blicksprüngen erkennen.
- **Gerät:** Dreieckgröße und °/s hängen von Bildgröße und Abstand ab („Stufe 5“ ist kein fester Reiz); die Form bleibt gleichseitig.
  Ergebnisse verschiedener Geräte (Touch, Maus, Tablet, Monitor) nicht gleichsetzen: Zwei Verfahren können ähnliche Tendenzen zeigen, ohne
  dieselben Werte zu liefern (Mountford et al., 2004, S. 24).
- **Person/Lernen:** Alter, Müdigkeit, Konzentration; die feste Bahn wird nach wenigen Runden vorhergesagt (Barnes & Schmid, 2002) – spätere
  Runden sind leichter, ohne dass sich die Reaktion auf Unvorhergesehenes ändert.
- **Streuung:** Messungen am Menschen streuen stärker als an Prüfkörpern; ein einzelner Durchgang sagt wenig, und aussagekräftig ist nur der
  Verlauf über mehrere Sitzungen (Mountford et al., 2004, S. 43–44).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Vorausschauendes Verfolgen wiederholter Rampensequenzen stellt sich nach 2–3 Durchgängen ein (Barnes & Schmid,
  2002); 2 × 6 min Pursuit-Training an 3 Tagen wirkte 5 Tage nach (N = 10 + 10; Eibenberger et al., 2012). Laborbefunde mit Eyetracker, nicht
  mit dieser Übung.
- **Naher Transfer – schwach:** gelernt wird vor allem die konkrete Sequenz; ob die Reaktion auf **neue** Richtungswechsel (≈ 90–130 ms;
  Soechting et al., 2005) schneller wird, ist nicht gezeigt.
- **Alltagstransfer – fehlend:** keine Studie zu Sport, E-Sport oder Verkehr.
- **Praxisangaben (Erfahrungswissen, nicht belegt):** In der Sehtherapie werden Folgebewegungen klassisch an einem an einer Schnur hängenden
  Ball mit Buchstaben geübt, der in verschiedene Richtungen schwingt, bei ruhigem Kopf. Man beginnt am eigenen Arbeitspunkt und steigert in
  kleinen, selbst gesteuerten Schritten. Wirksamkeitsbelege dafür liegen nicht vor.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** Blickfolge mit regelmäßigen Richtungswechseln ohne Reaktionsdruck geübt werden soll; als Steigerung nach 404/402 (niedrige
  Stufen, Linie sichtbar); als kurze Augenübung ohne Blitzreize.
- **Weniger passend, wenn …** ein Leistungswert gewünscht ist; Reaktion, Peripherie, Handgenauigkeit oder Lesen das Ziel sind.
- **Vorsicht / anpassen bei …**
  - `presbyopie_gleitsicht`: Fern-, Nah- und seitliche Unschärfezonen → Arbeitsplatzbrille, kleineres Feld, Kopf mitbewegen.
  - `schwindel_vestibulaer`, `reisekrankheit`: abrupte Bewegungswechsel bei ruhigem Kopf; langsam beginnen, bei Übelkeit abbrechen.
  - `nystagmus`, `schielen_binokular`: Folge oft verändert, Doppelbilder möglich – keine Rückschlüsse ziehen.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: seltener Lidschlag → kurz üben, Pausen.
  - `kinder_unter_6`: Die Folgebewegung reift bis ins Jugendalter.
  - Warnzeichen: Doppelbilder, plötzlicher einseitiger Sehverlust, Lichtblitze oder neue Schleier, Kopfschmerz mit Sehverschlechterung,
    Schwindel oder neu auftretendes Zittern gehören in eine ärztliche Abklärung (Muchnick, 2008, S. 6, 28); dann nicht üben.
- **Kombiniert gut mit …** 404 (Einstieg), 405 (Zickzack), 413, 415/410 (unvorhersehbare Wechsel), 407 (Blicksprung auf ein abbremsendes Ziel),
  105, 707.
- **Abgrenzung in der Gruppe:** 402–406 teilen den Aufbau (Kugel mit Landolt-Ring, Antwort per Button) und unterscheiden sich in der Bahn:
  406 hat drei Ecken mit je 120° Richtungswechsel auf schrägen und waagrechten Kanten und ist die ruhigere Stufe nach 404/402; 405 knickt an
  jeder Spitze um 110°–160° auf steilen, überwiegend senkrechten Strecken (schwerer). 402 flache Acht, 403 Sinuswelle, 404 weiche
  Lissajous-Schlaufe. Für eine Auswahl genügt meist eine davon.

Keine Diagnose, kein Heil- oder Sehversprechen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Überprüfbare Aufgabe statt Scheinmessung:** kurz nach jeder Ecke ein Zeichen im Ziel (Landolt-C wie 105) oder
  optionales Mitführen mit dem Finger mit Abstandswertung; keine Pixel-/Latenzstufen ohne Messung.
- **Geometrie in Grad:** echtes gleichseitiges Dreieck unabhängig vom Seitenverhältnis, Größe aus Bildschirm und Abstand
  (z. B. 15–20° Kante, für Gleitsicht kleiner wählbar), gleiches °/s auf allen Kanten, Laufrichtung wechselbar.
- **Stufen:** Linie sichtbar → ausgeblendet → zufälliger Takt; 5–15°/s, höchstens ≈ 40°/s. **Tablet:** Querformat, Ständer,
  Radius ≥ 20 px. **Texte:** keine Mikrosakkaden-, Hirn- oder Sportversprechen; Pausen-, Blinzel-, Gleitsichthinweis.

## 11. Quellen

### Von der Website angegeben
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – **Prüfung:** DOI stimmt ✓, Erstautorin falsch angegeben („A. J.“ statt S. = Sophie); **stützt die Aussage der Website:** teilweise (Auslöseregel für Aufholsakkaden ja; Ecken, Stufentabelle und Pixelwerte nein)
- „Heinen, S. J., Badler, J. B., & Ting, W. (2005). Timing and kinematics of saccadic decisions in smooth pursuit. *J Neurophysiol, 94*(4), 2638–2648.“ – **Prüfung:** nicht auffindbar; die DOI 10.1152/jn.00282.2005 gehört zu einer Studie über Gesangslernen bei Zebrafinken. Reale Arbeit derselben Autor:innen: Heinen, S. J., Badler, J. B., & Ting, W. (2005). Timing and velocity randomization similarly affect anticipatory pursuit. *Journal of Vision, 5*(6), 493–503. https://doi.org/10.1167/5.6.1; **stützt:** nein (FEF/SEF-Aussage, Sportnutzen und Stufen nicht belegt)
- Orban de Xivry, J.-J., & Lefèvre, P. (2007). Saccades and pursuit: Two outcomes of a single sensorimotor process. *The Journal of Physiology, 584*(1), 11–23. https://doi.org/10.1113/jphysiol.2007.139881 – **Prüfung:** Titel, Zeitschrift und DOI auf der Website falsch (die DOI gehört zu Heijtz et al., 2007, Calcyon/ADHS); die hier genannte Arbeit existiert, DOI per Crossref ✓; **stützt:** teilweise (Synergie Sakkade–Folge ja; PPRF/riMLF als Folgezentren nein)
- „Bennett, S. J., & Barnes, G. R. (2006). Timing of predictive saccades during pursuit of targets undergoing angular trajectory changes. *Vision Research, 46*(17), 2736–2746.“ – **Prüfung:** nicht auffindbar (Crossref, PubMed); die DOI 10.1016/j.visres.2006.03.011 gehört zu einer Farbkonstanz-Studie; **stützt:** nein (Antizipation an Ecken ist real, belegt aber durch andere Arbeiten, z. B. Barnes & Collins, 2015)
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Vorhersage über extraretinale Signale ja; „40 ms vor dem Scheitel“, Trainingsaufbau nein)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (Reaktionszeitstudie; Hardware-Verzögerungen durch Bildschirm und USB-Eingabe werden allgemein behandelt, die Werte zu 144/240 Hz und das Eckpunkt-Timing stehen dort nicht; für eine Übung ohne Eingabe ohnehin kaum relevant)
- (nur im Text) Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5th ed.). Oxford University Press. https://doi.org/10.1093/med/9780199969289.001.0001 – **Prüfung:** Buch, DOI per Crossref geprüft ✓, Inhalt nicht eingesehen; Website nennt hier keine DOI (in anderen Übungen eine falsche); **stützt:** nein („−60 % Mikrosakkaden durch LTD“ nicht prüfbar und unplausibel)

### Weitere Fachliteratur
- Barnes, G. R., & Collins, S. (2015). Influence of predictability on control of extra-retinal components of smooth pursuit during prolonged 2D tracking. *Experimental Brain Research, 233*(3), 885–897. https://doi.org/10.1007/s00221-014-4164-x – Vierecksbahn: antizipatorisches Abbremsen/Beschleunigen vor Ecken
- Barnes, G. R., & Schmid, A. M. (2002). Sequence learning in human ocular smooth pursuit. *Experimental Brain Research, 144*(3), 322–335. https://doi.org/10.1007/s00221-002-1050-8 – Sequenzlernen nach 2–3 Wiederholungen
- Buizza, A., & Schmid, R. (1986). Velocity characteristics of smooth pursuit eye movements to different patterns of target motion. *Experimental Brain Research, 63*(2), 395–401. https://doi.org/10.1007/BF00236858 – Gain bei Dreieckbewegung
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Latenz ≈ 100 ms
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Gain, Hintergrund, Rautenbahn
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – Trainierbarkeit
- Engel, K. C., Anderson, J. H., & Soechting, J. F. (2000). Similarity in the response of smooth pursuit and manual tracking to a change in the direction of target motion. *Journal of Neurophysiology, 84*(3), 1149–1156. https://doi.org/10.1152/jn.2000.84.3.1149 – Auge und Hand an Richtungswechseln
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Heinen, S. J., Potapchuk, E., & Watamaniuk, S. N. J. (2016). A foveal target increases catch-up saccade frequency during smooth pursuit. *Journal of Neurophysiology, 115*(3), 1220–1227. https://doi.org/10.1152/jn.00774.2015 – Zielgröße
- Ke, S. R., Lam, J., Pai, D. K., & Spering, M. (2013). Directional asymmetries in human smooth pursuit eye movements. *Investigative Ophthalmology & Visual Science, 54*(6), 4409–4421. https://doi.org/10.1167/iovs.12-11369 – abwärts > aufwärts
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 – Übersicht Vorhersage
- Lencer, R., & Trillenberg, P. (2008). Neurophysiology and neuroanatomy of smooth pursuit in humans. *Brain and Cognition, 68*(3), 219–228. https://doi.org/10.1016/j.bandc.2008.08.013 – Netzwerk beim Menschen
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science, 90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag
- Rottach, K. G., Zivotofsky, A. Z., Das, V. E., Averbuch-Heller, L., Discenna, A. O., Poonyathalang, A., & Leigh, R. J. (1996). Comparison of horizontal, vertical and diagonal smooth pursuit eye movements in normal human subjects. *Vision Research, 36*(14), 2189–2195. https://doi.org/10.1016/0042-6989(95)00302-9 – horizontal > vertikal
- Soechting, J. F., Mrotek, L. A., & Flanders, M. (2005). Smooth pursuit tracking of an abrupt change in target direction: Vector superposition of discrete responses. *Experimental Brain Research, 160*(2), 245–258. https://doi.org/10.1007/s00221-004-2010-2 – Reaktion auf Richtungswechsel 90/130 ms
- Sparks, D. L. (2002). The brainstem control of saccadic eye movements. *Nature Reviews Neuroscience, 3*(12), 952–964. https://doi.org/10.1038/nrn986 – PPRF/riMLF als Sakkadengeneratoren (nur bibliografisch geprüft)
- Sprenger, A., Trillenberg, P., Pohlmann, J., Herold, K., Lencer, R., & Helmchen, C. (2011). The role of prediction and anticipation on age-related effects on smooth pursuit eye movements. *Annals of the New York Academy of Sciences, 1233*, 168–176. https://doi.org/10.1111/j.1749-6632.2011.06114.x – Vorhersage im Alter erhalten
- Takagi, M., Zee, D. S., & Tamargo, R. J. (2000). Effects of lesions of the oculomotor cerebellar vermis on eye movements in primate: Smooth pursuit. *Journal of Neurophysiology, 83*(4), 2047–2062. https://doi.org/10.1152/jn.2000.83.4.2047 – Vermis und Dreieckbewegung (Affen)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen, Augenbewegungsprüfung, Sehbahn (S. 6, 28, 32–35)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messgrundsätze: Wiederholbarkeit, Mehrfachmessung (S. 24, 43–44)
