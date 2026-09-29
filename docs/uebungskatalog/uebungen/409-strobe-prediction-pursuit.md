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
    inhibition: 0
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
voraussetzungen: ["Keine bekannte Photosensitivität/Epilepsie (das Ziel blinkt je nach Tempo und Gerät 0,3 bis über 5-mal pro Sekunde, mit 'Random Speed' bis ≈ 12-mal)", "Bildschirm in ruhiger Umgebung, Kopf möglichst ruhig, Abstand 40–70 cm", "Ausreichende Sicht im Zwischenbereich (Bildschirmbrille oder Einstärkenglas günstiger als Gleitsicht)", "Maus oder Finger nur zum Starten; während der Übung keine Eingabe"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, kopfschmerz_asthenopie, trockenes_auge_bildschirm, nystagmus, presbyopie_gleitsicht, sehbehinderung_niedriger_visus, kinder_unter_6]
geeignet_fuer: ["vorausschauende (prädiktive) Blickfolge üben: den Blick weiterbewegen, obwohl das Ziel kurz fehlt", "Einstieg in Verdeckungsaufgaben mit regelmäßigem, vorhersagbarem Takt (bei 0,5–2× Tempo lange Dunkelphasen von ≈ 0,3–1 s)", "ruhige Augenübung ohne Hand- oder Körpereinsatz", "Ergänzung zu einfacher Blickfolge (404) und zur Einzelverdeckung (407)"]
weniger_geeignet_fuer: ["Menschen mit Photosensitivität, Epilepsie in der Familie oder lichtempfindlicher Migräne", "alle, die eine Rückmeldung oder einen Leistungswert erwarten (das Original misst nichts)", "Gleitsichtträger:innen an großen Monitoren (Ziel läuft über die ganze Bildbreite in die unscharfe Randzone)", "Kinder, die abstrakte Aufgaben ohne Rückmeldung nicht durchhalten", "Ziel 'Reaktion' oder 'Zielgenauigkeit der Hand' (keine Handlung gefordert)"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Blickfolge während einer Verdeckung ist im Labor mit Rückmeldung trainierbar (Gain 0,59 → 0,89, Madelain & Krauzlis 2003), ohne Rückmeldung nur wenig (0,63 → 0,71); das Original gibt keine Rückmeldung. Die zitierte Strobe-Brillen-Forschung (Sportübungen mit Shutterbrille, ganzes Gesichtsfeld) ist auf ein blinkendes Bildschirmziel nicht übertragbar; ein Alltagsnutzen ist nicht untersucht."
aehnliche_uebungen: [407, 404, 414, 412, 403, 406, 105, 107, 104, 109]
stichworte: ["Verdeckung", "Okklusion", "target blanking", "prädiktive Blickfolge", "smooth pursuit", "Antizipation", "extraretinale Signale", "Geschwindigkeitsgedächtnis", "Stroboskop", "Photosensitivität"]
---

# 409 · Blickfolge mit Dunkelphasen (Stroboskop-Ziel)

> Original: „Stroboskopisches Sehtraining – Blickvorhersage bei intermittierender Sicht“ (englischer Spielname
> „Occlusion/Strobe Prediction Pursuit“) – skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) ·
> Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Auf fast schwarzem Grund bewegt sich ein kleiner, leuchtend roter Punkt mit weißem Kern auf geraden Bahnen und
prallt an den Bildschirmrändern ab. In einem festen Rhythmus ist er etwa zwei Drittel der Zeit sichtbar und ein
Drittel „dunkel“. Man soll ihm nur mit den Augen folgen, in der Dunkelphase die Bewegung im Kopf weiterführen
und beim Wiederauftauchen möglichst schon an der richtigen Stelle sein. Es gibt keine Aufgabe für die Hand,
keine Punkte und keine Rückmeldung – die Übung läuft einfach 30 bis 120 Sekunden. Wichtig: Standardmäßig bleibt
in der Dunkelphase ein schwacher Umrissring an der aktuellen Position sichtbar; erst mit „Hide Line“ ist das
Ziel wirklich verschwunden.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (seitenspezifischer Chunk `49454-…js`, Hilfsmodule in
`90762-…js` und `71254-…js`, Stand 29.09.2026). Es wurde nur die Mechanik ausgewertet, kein Code übernommen.

**Ablauf (Code).** Einstellungsfenster → Start → Countdown 3-2-1-GO (≈ 2,5 s, mit Tönen) → Übung → Ende-Bildschirm
mit Sitzungsdauer, Grundtempo, Zahl abgeschlossener Sitzungen und „Speed Acceleration: Enabled/Fixed“.
Abbruch bei Escape, Tab-Wechsel oder Verlassen des Vollbilds; während der Übung sind Scrollen gesperrt und
(wo möglich) die Bildschirmsperre aufgehoben. Auf Mobilgeräten erscheint nur der Hinweis „Rotate mobile for a
better experience“.

**Reiz (Code).** Hintergrund #050508 mit sehr schwachem 40-px-Raster (2 % Deckkraft); „Day Mode“: weiß mit 5 %
Raster. Ziel: gefüllter Kreis (Radius 0,82 × r, 88 % Deckkraft), Ring bei r (55 %), äußerer Ring bei r + 5 px
(20 %), weißer Kernpunkt (Radius ≥ 2,5 px) und – Standard „Neon Glow“ an – ein Leuchtsaum (Schattenunschärfe
14 px). Standard r = 16 px (Ø 32 px, mit Außenring 42 px), einstellbar 10–50 px. Farbe wählbar: Rot #ef4444
(Standard), Grün, Blau, Orange, Gelb, Weiß. Optional „Scanlines“ (feine Querlinien alle 4 px, 1,5 % Deckkraft)
und „Gaze Trail“ (die letzten 15 Positionen als verblassende Punkte, nur in der Sichtphase).

**Bewegung (Code).** Start in der Bildmitte, Geschwindigkeit je Achse zufällig ± 4–7 px pro 16 ms × Tempo
(Betrag ≈ 350–620 px/s bei 1×). Die Bahn besteht aus **geraden Strecken mit Spiegelung an den Rändern** – es
gibt keine Kurven und keine Richtungswechsel außer an den Wänden. Die Bewegung ist zeitbasiert (Frame-Zeit,
begrenzt auf 100 ms), also unabhängig von der Bildfrequenz gleich schnell. „Random Speed“ multipliziert das
Tempo mit einer glatten, aus Sinuswellen gebildeten Funktion der Uhrzeit (Faktor ≈ 0,40–1,90).

**Stroboskop-Takt (Code).** Ein Zähler steigt **pro verarbeitetem Bild** um den aktuellen Tempofaktor; unter 60
ist das Ziel sichtbar, von 60 bis 90 dunkel, danach beginnt der Zyklus neu. Bei 1× sind das 60 Bilder sichtbar
und 31 Bilder dunkel (Seitentext: „60 Frames sichtbar, 30 Frames Dunkelheit“ – stimmt). Zusätzlich
verarbeitet die Schleife **höchstens ein Bild pro 13 ms**: Bilder, die weniger als 13 ms nach dem letzten
kommen, werden übersprungen. Daraus ergeben sich (eigene Berechnung aus dem Code):

| Bildwiederholrate des Geräts | 60 Hz | 75 Hz | 90 Hz | 100 Hz | 120 Hz | 144 Hz | 165 Hz | 240 Hz |
|---|---|---|---|---|---|---|---|---|
| tatsächlich verarbeitete Bilder/s | 60 | 75 | 45 | 50 | 60 | 72 | 55 | 60 |

| Tempo | 0,5× | 1× | 2× | 3× | 5× | 7× | 9× |
|---|---|---|---|---|---|---|---|
| Blinkzyklen/s bei 60 Bildern/s | 0,32 | 0,65 | 1,3 | 1,9 | 3,2 | 4,6 | 5,5 |
| Blinkzyklen/s bei 72 Bildern/s (144-Hz-Monitor) | 0,38 | 0,78 | 1,6 | 2,3 | 3,8 | 5,5 | 6,5 |
| sichtbar / dunkel bei 60 Bildern/s (ms) | 2 000 / 1 017 | 1 000 / 517 | 500 / 267 | 333 / 183 | 200 / 117 | 150 / 67 | 117 / 67 |

Höchstwert bei festem Tempo ≈ 6,8 Zyklen/s (9× an einem 75-Hz-Monitor). Mit „Random Speed“ werden bei 9× bis zu
**10 (60 Bilder/s) bzw. 12 (72 Bilder/s) Aufblitzvorgänge innerhalb einer Sekunde** erreicht, schon ab ≈ 2,5–3×
Fenster mit 4 Aufblitzvorgängen pro Sekunde. Mehr als 3 Zyklen/s gibt es bei festem Tempo ab ≈ 4,8× (60 Bilder/s)
bzw. ≈ 4× (72–75 Bilder/s).

**Folgerungen aus der Mechanik.**
- Weil Tempo und Takt gemeinsam wachsen, ist die **Strecke, die das Ziel im Dunkeln zurücklegt, fast konstant**
  (≈ 180–370 px, am 24″-Full-HD-Monitor in 60 cm ≈ 5–10°), während die **Dunkelzeit** mit dem Tempo schrumpft
  (517 ms bei 1× → 67 ms bei 9×, jeweils 60 Bilder/s).
- Die Dunkelphase ist standardmäßig **keine echte Verdeckung**: An der wahren Position wird ein dünner weißer
  Umrissring (1,5 px, 15 % Deckkraft; im „Day Mode“ blau, 35 %) gezeichnet. Nur „Hide Line“ entfernt ihn.
- Prallt das Ziel im Dunkeln an einer Wand ab, taucht es in neuer Richtung auf. Das kommt regelmäßig vor, weil
  etwa ein Drittel der Zeit dunkel ist.
- Es wird **nichts gemessen**: keine Blickerfassung, keine Zeiger- oder Touch-Auswertung, kein Punktestand.
  Gespeichert wird nur ein Sitzungszähler im Browser.

**Widersprüche Regeltext ↔ Code.**
- „144-Hz-Monitor wichtig für minimalen Jitter“: Die Schleife ist auf ≤ 77 Bilder/s begrenzt. An 120/240-Hz-Geräten
  läuft sie wie an 60 Hz, an 144 Hz mit 72 Bildern/s; an 90/100/165-Hz-Geräten (manche Tablets und Monitore) sogar
  langsamer als an 60 Hz (45–55 Bilder/s) – dort blinkt das Ziel entsprechend seltener und länger.
- Leistungsstufen mit „Landeversatz < 12 px“ oder „Geschwindigkeitsabfall 0 %“: nicht erhebbar (keine Messung).
- „Hide Line blendet die Hintergrundbahn aus“: Es gibt keine gezeichnete Bahn; ausgeblendet wird der Umrissring.
- Tipp „Verdunkelungsgrad erhöhen“: Das Verhältnis sichtbar : dunkel ist fest (≈ 2 : 1); es gibt keine Einstellung.
- „Krümmung extrapolieren“ (FAQ): Die Bahn hat keine Krümmung, nur gerade Stücke und Wandabpraller.

## 3. Was die Website sagt – und wie das einzuordnen ist

**Aussagen der Website.** Stroboskopisches Sehtraining sei ein „wissenschaftlich validiertes
Interventionsprotokoll“. Durch den Entzug der Rückmeldung müsse das Nervensystem „interne Vorwärtsmodelle“
berechnen. Bei Ungeübten „bricht die Blickfolge innerhalb von 100–200 ms ein und zerfällt in Suchsakkaden“;
gezieltes Okklusionstraining „stärkt die prädiktiven Schaltkreise im Kleinhirn und im frontalen Augenfeld“
(Bennett et al. 2007). Studien belegten „signifikante Steigerungen bei dynamischer Sehschärfe, Reaktionsantizipation
und visuellem Kurzzeitgedächtnis“; Profiligen (NHL, MLB, NFL) nutzten Strobe-Brillen. Im E-Sport helfe es beim
„Pre-Aiming“ hinter Rauch und Wänden. Empfohlen werden 2–3 Durchgänge à 45–60 s täglich; ein 144-Hz-Monitor sei
wichtig. Eine Tabelle ordnet Tempo, „Landeversatz“ und „Geschwindigkeitserhalt“ Stufen von „Novice“ bis „Elite –
Top 1,5 %“ zu. Personen mit Photosensibilität, Epilepsie oder Migräne sollen die Übung meiden oder ärztlichen Rat
einholen.

**Einordnung.**
- **Stroboskop-Studien betreffen etwas anderes.** Alle genannten Studien nutzen **Shutterbrillen**, die das
  ganze Gesichtsfeld unterbrechen (z. B. 100 ms offen / 67–900 ms zu), während echter Sportübungen wie Fangen oder
  Passen (Wilkins & Appelbaum, 2020). Ein kleines blinkendes Ziel am Bildschirm ohne jede Handlung wurde in keiner
  dieser Studien untersucht. „Wissenschaftlich validiert“ ist für diese Übung **nicht zutreffend**.
- **Was die Strobe-Brillen-Studien zeigen:** bessere zentrale Bewegungsempfindlichkeit und zentrale
  Aufmerksamkeit, nicht aber periphere oder Multiple-Object-Tracking (Appelbaum et al., 2011); besseres Behalten
  im Kurzzeitgedächtnis bei 640–2 560 ms Verzögerung (Appelbaum et al., 2012); genaueres Antizipations-Timing nur
  direkt nach dem Training, nicht nach 10 Tagen (Smith & Mitroff, 2012); ein unverblindeter Eishockey-Pilot mit 6
  gegen 5 Spielern (Mitroff et al., 2013). **Dynamische Sehschärfe wurde in keiner der zitierten Studien gemessen.**
  Neuere Metaanalysen finden kleine bis mittlere Effekte auf sportspezifische Leistung (g = 0,35; Wang et al.,
  2026), heterogen und nur nach längerem Training (Vera et al., 2026).
- **Blickfolge bei Verdeckung:** Das Auge bremst nicht nach 100–200 ms „in Suchsakkaden“ ab, sondern beginnt
  ≈ 190 ms nach dem Verschwinden abzubremsen und behält danach 40–60 % der Geschwindigkeit (Becker & Fuchs, 1985);
  Sakkaden gleichen den Positionsfehler gezielt aus (Orban de Xivry et al., 2006). Das ist **normales Verhalten
  aller Menschen**, kein Zeichen von „Untrainiertheit“. Dass die Augen vor dem erwarteten Wiederauftauchen wieder
  beschleunigen können, stimmt (Bennett & Barnes, 2003).
- **„Training stärkt Kleinhirn und FEF“** ist nicht belegt. Die dafür zitierte Arbeit existiert in der
  angegebenen Form nicht (siehe Abschnitt 11). Richtig ist, dass diese Areale an der Blickfolge ohne sichtbares
  Ziel **beteiligt** sind (Lencer et al., 2004) – eine Stärkung durch diese Übung ist nicht untersucht.
- **Leistungstabelle ohne Datengrundlage:** Die Seite erklärt selbst, sie sammle keine Leistungsdaten, und keine
  der Quellen enthält solche Stufen. Die Tabelle ist zudem physiologisch schief: Hohe Tempi bedeuten hier kurze
  Dunkelphasen (< 120 ms), die kürzer sind als die Zeit, bis das Auge überhaupt abbremst (≈ 190 ms) – die
  zeitliche Vorhersageleistung ist also bei **langsamem** Tempo am größten. Bei 9× liegt die Zielgeschwindigkeit
  zudem über der Obergrenze der glatten Folgebewegung (Abschnitt 4).
- **144 Hz und „Timing des Kleinhirns“ (Woods et al., 2015):** Die Quelle behandelt einfache Reaktionszeiten und
  Geräteverzögerungen, nicht Monitore oder Kleinhirn; der eigene Code begrenzt die Bildrate ohnehin (Abschnitt 2).
- **E-Sport-Transfer („Pre-Aiming“):** ohne Beleg. **„Kurze Intervalle erzielen den schnellsten neuroplastischen
  Erfolg“:** ohne Beleg. **Warnhinweis zu Photosensibilität:** sachlich richtig und wichtig (Abschnitt 9).

## 4. Optische und okulomotorische Grundlagen

**Sehwinkel und Tempo.** Ziel Ø 32 px ≈ 0,85° am 24″-Full-HD-Monitor (0,28 mm/px) in 60 cm, ≈ 1,2° an einem
11″-Tablet in 30 cm; der weiße Kernpunkt (Ø ≈ 6 px ≈ 0,15°) ist ein guter Fixierpunkt. Sehschärfe ist damit kaum
gefordert. Bei 1× bewegt sich das Ziel mit ≈ 9–16°/s (Monitor, 60 cm), ≈ 10–17°/s (Tablet, 40 cm) bzw.
≈ 13–23°/s (Tablet, 30 cm), bei 3× mit ≈ 28–49°/s, bei 5× mit ≈ 47–82°/s und bei 9× mit ≈ 85–150°/s (Monitor).
Umrechnung: 1 cm in 57 cm ≈ 1°.

**Glatte Folgebewegung (smooth pursuit).** Sie startet ≈ 100 ms nach Bewegungsbeginn (Carl & Gellman, 1987),
erreicht nie ganz die Zielgeschwindigkeit (Gain der glatten Komponente < 0,95, sinkt mit dem Tempo; Collewijn &
Tamminga, 1984) und wird durch Aufholsakkaden ergänzt (Latenz ≈ 125 ms; de Brouwer et al., 2002). Die Obergrenze
liegt bei vielen Menschen um 100°/s (Meyer et al., 1985). Folge: Ab etwa 5× wird die Übung zunehmend sakkadisch;
bei 9× bleiben in der Sichtphase (≈ 117 ms) kaum Zeit für eine visuell gesteuerte Korrektur.

**Was im Dunkeln passiert.** Verschwindet ein gleichförmig bewegtes Ziel, bleibt die Augengeschwindigkeit noch
≈ 190 ms fast unverändert, fällt dann innerhalb von ≈ 280 ms ab und hält danach eine Restgeschwindigkeit von
≈ 40–60 % (bei zufälligem Tempo 39–55 %; Becker & Fuchs, 1985). In einer fMRT-Studie mit 1 s Verdeckung bei
10°/s lag die Restgeschwindigkeit bei ≈ 30 % (Lencer et al., 2004). Erwartet man die Wiederkehr, steigt die
Augengeschwindigkeit **vor** dem Wiederauftauchen wieder an (Bennett & Barnes, 2003); Sakkaden richten sich dabei
nach der erwarteten Position, die glatte Bewegung nach der erwarteten Geschwindigkeit (Orban de Xivry et al.,
2006). Für das Original heißt das: Bei 0,5–2× (Dunkelphase ≈ 270–1 000 ms) wird die Vorhersage wirklich
gefordert; bei ≥ 5× (Dunkelphase ≤ 120 ms) ist die Lücke kürzer als die Abbremslatenz – die Schwierigkeit kommt
dann vom Tempo, nicht von der Verdeckung.

**Kontrast des „unsichtbaren“ Ziels.** Der Umrissring in der Dunkelphase hat eine relative Leuchtdichte von
≈ 0,024 gegenüber ≈ 0,0016 beim Hintergrund (eigene Rechnung nach sRGB). Im abgedunkelten Raum ist er gut zu
sehen, bei Raumlicht, Spiegelungen oder geringer Kontrastempfindlichkeit schlechter. Ohne „Hide Line“ ist die
Übung daher eher „Folgen eines kontrastarmen Ziels“ als echte Verdeckung.

**Bildschirm.** Da das Ziel nur 45–77-mal pro Sekunde neu gezeichnet wird, springt es bei hohem Tempo sichtbar
in Schritten (bei 5× und 60 Bildern/s ≈ 30–50 px pro Bild). Wahrgenommene Bewegungsunschärfe hängt an LCDs von
Haltezeit/Bildfrequenz ab; 120 Bilder/s sind deutlich besser als 60, über ≈ 240 kaum noch (Kuroki et al., 2007,
zitiert nach der Gruppen-Literaturbasis) – das Original nutzt hohe Bildfrequenzen wegen seiner Begrenzung aber gar
nicht aus.

**Brille, Alter.**
- **Gleitsicht:** Der scharfe Zwischenbereich ist seitlich nur ≈ 13–18° breit (gegenüber 60° beim
  Einstärkenglas); Gleitsichtträger:innen machen beim Lesen am Bildschirm mehr und längere Kopfbewegungen (Han et
  al., 2003). Ein 24″-Monitor in 60 cm ist ≈ 48° breit – das Ziel läuft also regelmäßig in die unscharfe
  Randzone, und der untere Bildrand fällt in den Nahteil. Kopfbewegung ist dann die natürliche Strategie, auch
  wenn die Website „Kopf ruhig halten“ empfiehlt. Günstiger: Bildschirm-/Arbeitsplatzbrille, kleineres Fenster
  oder größerer Abstand.
- **Alterssichtigkeit:** Am Tablet (30–40 cm) ist eine Nahkorrektur nötig; Unschärfe erschwert vor allem das
  Erkennen des schwachen Rings.
- **Farbsehschwäche:** Die Farbe ist nicht aufgabenrelevant. Bei Protan-Störungen wirkt Rot dunkler; Weiß oder
  Gelb wählen (Rot-Grün-Schwäche bei ≈ 8 % der Männer europäischer Herkunft; Birch, 2012).
- **Trockenes Auge:** Bei Bildschirmarbeit sinkt die Lidschlagrate im Mittel auf etwa ein Fünftel (Patel et al.,
  1991); konzentriertes Verfolgen verstärkt das eher. Digitale Augenbelastung betrifft ≥ 50 % der
  Bildschirmnutzer:innen (Sheppard & Wolffsohn, 2018).
- **Alter:** Der Folge-Gain ist bei 75–93-Jährigen bei allen Geschwindigkeiten geringer als bei 18–43-Jährigen,
  mit wachsendem Abstand bei höherem Tempo (Moschner & Baloh, 1994). Ältere sollten mit 0,5–1× beginnen.

## 5. Neurowissenschaftliche Grundlagen

- **Visuelle Bewegungsverarbeitung:** Solange das Ziel sichtbar ist, liefern MT/V5 und MST das Bewegungssignal;
  die Aktivität im V5-Komplex hing in einer fMRT-Studie mit der Folgegeschwindigkeit bei sichtbarem Ziel zusammen
  (Nagel et al., 2006). Die Umsetzung von ≈ 100 ms visueller Bewegung in den Start der Folgebewegung läuft über
  MT, das Folgebewegungsareal im frontalen Augenfeld (FEF) und das Kleinhirn (Lisberger, 2010).
- **Extraretinale Signale:** Beim Affen feuern Neurone im dorsalen MST weiter, wenn das Ziel kurz ausgeblendet
  wird; ihr Signal stammt also nicht von der Netzhaut, sondern von der Augenbewegung selbst (Newsome et al., 1988).
  Beim Menschen treiben Efferenzkopie und ein Kurzzeitspeicher für Geschwindigkeit und Zeitpunkt die Folgebewegung
  ohne sichtbares Ziel weiter (Barnes, 2008; Kowler et al., 2019); dieses innere Bewegungsmodell wird während der
  Verdeckung zeitlich fortgeschrieben (Orban de Xivry et al., 2008). Beschleunigung wird erst nach ≈ 500–800 ms
  Sicht in die Vorhersage einbezogen (Bennett et al., 2007) – bei den geraden Bahnen des Originals spielt das
  kaum eine Rolle, bei „Random Speed“ schon.
- **Netzwerk bei Verdeckung:** Blickfolge ohne sichtbares Ziel aktivierte zusätzlich FEF, supplementäres und
  präsupplementäres Augenfeld, oberen Parietallappen und intraparietalen Sulcus, prämotorischen und
  dorsolateralen präfrontalen Kortex, Kleinhirn und Basalganglien (N = 16; Lencer et al., 2004). Die Autor:innen
  deuten das als Beitrag von Vorhersage, räumlicher Aufmerksamkeit und Arbeitsgedächtnis. Beim Affen zeigen
  Einzelzellableitungen Gedächtnissignale für die Bewegungsrichtung vor allem im supplementären Augenfeld und im
  dorsalen Kleinhirnwurm, Vorbereitungssignale im kaudalen FEF (Fukushima et al., 2013).
- **Plastizität:** Die Verstärkung dieses extraretinalen Signals lässt sich über Tage lernen, wenn genaues Folgen
  belohnt wird (Madelain & Krauzlis, 2003). Bildgebende Belege, dass eine solche Übung Kleinhirn oder FEF
  „stärkt“, wurden nicht gefunden.
- **Stroboskop-Brillen:** Wodurch die kognitiven Effekte der Brillen entstehen, ist unklar (Wilkins & Appelbaum,
  2020); sie lassen sich nicht auf einzelne Hirnareale oder auf diese Bildschirmübung übertragen.

## 6. Motorische Grundlagen

- Die Übung verlangt **keine Handbewegung**: Maus oder Finger dienen nur zum Starten. Alle motorischen Merkmale
  sind deshalb 0. Wer mit Maus oder Finger „mitfährt“, macht daraus eine Tracking-Aufgabe, die aber nicht
  ausgewertet wird.
- **Augenmotorik:** Glatte Folgebewegung und Sakkaden (Abschnitt 4) sind die eigentliche Motorik. Die Website
  empfiehlt einen ruhigen Kopf; das ist sinnvoll, wenn gezielt die Augenfolgebewegung geübt werden soll, weil sonst
  die Kopfbewegung einen Teil übernimmt. Für Gleitsichtträger:innen ist Kopfbewegung aber normal (Han et al., 2003).
- **Keine Reaktions- oder Zielgesetze** (Fitts'sches Gesetz, Reaktionszeit) sind betroffen. Für eine Blickfit-Fassung
  mit Tipp-Antwort (Abschnitt 10) kämen Auge-Hand-Koordination und Timing hinzu; dann sind Touch-Latenz und
  Browser-Zeitgenauigkeit (typisch < 10 ms Antwortpräzision, je nach Browser/Betriebssystem stark schwankend;
  Bridges et al., 2020, zitiert nach der Gruppen-Literaturbasis) zu beachten.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Die Bildwiederholrate verändert die Übung selbst (Blinktakt 45–77 verarbeitete Bilder/s, Tabelle in
  Abschnitt 2). Ein 90-Hz-Tablet blinkt ≈ 25 % langsamer als ein 60-Hz-Gerät, ein 144-Hz-Monitor ≈ 20 % schneller.
  Vergleiche sind nur am selben Gerät sinnvoll.
- **Bildschirmgröße und Abstand:** Die Spielfläche füllt den Container; auf großen Flächen legt das Ziel längere
  gerade Strecken zurück (weniger Abpraller). Dieselbe Pixelgeschwindigkeit ergibt am nah gehaltenen Tablet
  deutlich mehr Grad pro Sekunde als am Monitor (Abschnitt 4).
- **Umgebungslicht:** Im dunklen Raum ist der Umrissring besser sichtbar, der Hell-Dunkel-Wechsel des Ziels aber
  auch auffälliger (Photosensitivität).
- **Einstellungen:** Tempo, Größe, Farbe, „Hide Line“ und „Random Speed“ verändern die Anforderung stark; ohne
  „Hide Line“ ist die Vorhersage kaum nötig.
- **Person:** Alter (Abschnitt 4), Müdigkeit (die Qualität der Folgebewegung sinkt mit Ermüdung; Bahill et al.,
  1980), Konzentration und Übung.
- **Messqualität:** Das Original misst nichts. Blickfolge-Kennwerte (Gain, Sakkadenzahl) wären nur mit Eyetracker
  zuverlässig erfassbar; ohne Eyetracker lässt sich nur indirekt messen, z. B. über einen Tipp auf den erwarteten
  Auftauchpunkt oder -zeitpunkt.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach.** Im Labor stieg der Folge-Gain während einer Verdeckung durch Belohnung genauen
  Folgens von 0,59 auf 0,89 nach 8–10 täglichen Sitzungen, mit weniger Sakkaden; ohne Belohnung nur von 0,63 auf
  0,71, mit Zufallsbelohnung gar nicht (0,60 → 0,63; Madelain & Krauzlis, 2003). Das Original gibt **keine**
  Rückmeldung; ob man darin besser wird, ist unbekannt und nicht überprüfbar.
- **Naher Transfer – schwach.** In derselben Studie übertrug sich das Gelernte auf ungeübte Geschwindigkeiten und
  auf einen strukturierten Hintergrund. Das ist ein Laborbefund mit Eyetracker-Rückmeldung, nicht mit dieser Übung.
- **Alltagstransfer – fehlend.** Die Stroboskop-Literatur (Shutterbrillen bei Sportübungen) zeigt kleine bis
  mittlere, heterogene Effekte auf sportspezifische Leistung: während der Strobe-Sicht zunächst schlechter, nach
  längerem Training ≈ 5–6 % besser (Vera et al., 2026); g = 0,35 in einer Dreistufen-Metaanalyse (Wang et al.,
  2026); in RCTs SMD ≈ 0,6 bei hoher Heterogenität (Guo et al., 2025). Einzelne gute Studien finden Verbesserungen
  im Labor, aber **keinen** Übertrag auf Feldtests (Hülsdünker et al., 2021) oder keinen Zusatznutzen
  (Strainchamps et al., 2023); ein Timing-Vorteil war nach 10 Tagen verschwunden (Smith & Mitroff, 2012). Für ein
  blinkendes Bildschirmziel ohne Handlung wurde keine Trainingsstudie gefunden (PubMed, 09/2026). Allgemein
  verbessern Hirntrainings verlässlich die geübte Aufgabe, kaum aber entfernte Aufgaben oder den Alltag (Simons et
  al., 2016; Fransen, 2024).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand gezielt vorausschauendes Folgen mit den Augen üben möchte, eine ruhige Übung ohne
  Hand- und Körpereinsatz sucht oder nach einfacher Blickfolge (404) den nächsten Schritt „Ziel kurz weg“ gehen
  will. Sinnvoll nur mit langsamem Tempo (0,5–2×) und „Hide Line“, damit die Vorhersage wirklich gefordert ist.
- **Weniger passend, wenn …** Rückmeldung, Punkte oder Fortschrittsmessung gewünscht sind; wenn Reaktion oder
  Handgenauigkeit das Ziel ist; bei geringer Ausdauer für abstrakte Aufgaben.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`: Das Ziel wechselt hart zwischen hell und dunkel (Hub der relativen Leuchtdichte
    ≈ 0,17, weißer Kern ≈ 1,0; eigene Rechnung), je nach Tempo und Gerät bis > 5-mal, mit „Random Speed“ bis
    ≈ 12-mal pro Sekunde. Der besonders provozierende Bereich liegt bei 15–25 Hz, wirksam sind aber 1–65 Hz
    (Fisher et al., 2005); potenziell gefährlich ab ≥ 3 Hz bei ausreichender Fläche und Helligkeit (Harding et al.,
    2005). Bei Standardgröße bleibt die blinkende Fläche unter der WCAG-Flächengrenze von 0,006 sr (≈ 3–13 % am
    Monitor in 60 cm), bei Maximalgröße (Ø 100 px) samt Leuchtsaum an Tablet (30 cm) oder Smartphone (≈ 19 cm)
    erreicht sie diese Grenze aber annähernd. Die strengere WCAG-Regel 2.3.2 (≤ 3 Blitze/s ohne Ausnahme) und die
    Blickfit-Grenze (Dauerpulsieren ≤ 2,5 Hz) werden ab ≈ 3,5–4× überschritten. Viele Betroffene wissen nichts von
    ihrer Empfindlichkeit, junge Menschen (5–24 Jahre) sind häufiger betroffen (Fisher et al., 2005) – für diese
    Übung immer Warnhinweis und niedriges Tempo.
  - `migraene_lichtempfindlich`, `kopfschmerz_asthenopie`: Blinkreiz plus anhaltendes Verfolgen kann Beschwerden
    auslösen; kurze Sätze, langsames Tempo, bei Unwohlsein abbrechen (so auch die Website).
  - `trockenes_auge_bildschirm`: seltener Lidschlag bei konzentriertem Verfolgen; bewusst blinzeln, Pausen.
  - `nystagmus`: Folgebewegung kann eingeschränkt sein; Übung eventuell frustrierend (Auswahlhinweis, keine
    medizinische Aussage).
  - `presbyopie_gleitsicht`: Ziel läuft über die ganze Breite und Höhe; Kopfbewegung zulassen, kleineres Fenster,
    Bildschirmbrille.
  - `sehbehinderung_niedriger_visus`: Der schwache Umrissring ist kontrastarm; Ziel größer und in Weiß/Gelb
    wählen.
  - `kinder_unter_6`: abstrakte Aufgabe ohne Rückmeldung, dazu Blinkreiz – nicht empfohlen.
- **Kombiniert gut mit …** 404 (gleiche Abprallbahn ohne Dunkelphasen, als Aufwärmen oder Vergleich), 407
  (einzelne Verdeckung), 403 (vorhersagbare Sinusbahn), 414 (Positionssprünge), 105/Blickfit „Scharf in Bewegung“
  (Folgen mit Rückmeldung), 107/Blickfit „Punktlandung“ (Verdeckung mit gemessenem Zeitfehler), 104/Blickfit
  „Zielfang“ (Vorhersage mit der Hand).

Keine Diagnose, kein Heil- oder Sehversprechen: Die Übung ist ein Blickfolge-Spiel; ein Nutzen für Sehen, Sport
oder Verkehr ist nicht belegt.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Sicherheit zuerst:** Takt **zeitbasiert in ms** statt pro Bild; Wiederholfrequenz der Verdeckung
  **≤ 2,5 Hz** (z. B. 600–1 200 ms sichtbar, 300–1 000 ms verdeckt); weiches Aus- und Einblenden (≈ 100–150 ms)
  statt hartem Schalten; kein Leuchtsaum, kein gesättigtes Rot, kein „Day Mode“ (Weiß ↔ Rot ergibt einen
  Leuchtdichtehub von ≈ 0,73); Zielgröße begrenzen; Warnhinweis vor dem Start, Pause/Stopp jederzeit,
  `prefers-reduced-motion` beachten. Besser noch: **räumliche Verdeckung** (Ziel läuft hinter „Wolken“ oder
  Balken) statt Blinken – dann entsteht kein periodischer Blitz.
- **Echte Aufgabe und Messung:** z. B. am Ende einer Verdeckung auf die vermutete Position tippen (Fehler in Grad)
  oder im Moment des erwarteten Wiederauftauchens tippen (Fehler in ms, früh/spät). Rückmeldung nach jedem
  Durchgang – gerade die Rückmeldung machte im Labor den Lerneffekt aus (Madelain & Krauzlis, 2003).
- **Adaptiv statt Tempo-Regler:** Verdeckungsdauer als Hauptstufe (z. B. 200 → 1 200 ms, 3-down/1-up), Tempo in
  °/s mit Geräte-/Abstandsangabe (Vorschlag: Einstieg 5–15°/s, fortgeschritten bis ≈ 30°/s, deutlich unter der
  Folgebewegungs-Obergrenze); Umrissring als leichte Stufe statt als versteckte Standardhilfe; Abpraller im Dunkeln
  erst in höheren Stufen.
- **Gerät:** gleiche Übung auf 60-, 90- und 120-Hz-Geräten (keine Bildraten-Drosselung, die die Aufgabe
  verändert); Tablet quer, großzügige Fläche, aber mit Option „kleines Feld“ für Gleitsicht.
- **Barrierefreiheit:** Farbe nicht aufgabenrelevant lassen, Standard Weiß/Gelb; Hintergrund dunkelgrau statt
  schwarz (geringerer Hell-Dunkel-Hub); keine Scanlines (Streifenmuster).
- **Kommunikation:** nicht „Stroboskop-Training“ oder „wissenschaftlich validiert“ nennen, keine Leistungsstufen
  ohne Normdaten, keine Sport- oder E-Sport-Versprechen.

## 11. Quellen

### Von der Website angegeben

- Appelbaum, L. G., Cain, M. S., Schroeder, J. E., Darling, E. F., & Mitroff, S. R. (2011). Stroboscopic visual
  training improves information encoding in short-term memory. *PLOS ONE, 6*(10), e27056.
  https://doi.org/10.1371/journal.pone.0027056 – **Prüfung:** DOI falsch (gehört zu Sundqvist et al., 2011,
  Pflanzenmerkmale in der subarktischen Tundra); richtig: Appelbaum et al. (**2012**), *Attention, Perception, &
  Psychophysics, 74*(8), 1681–1691, https://doi.org/10.3758/s13414-012-0344-6 ✓ (Crossref); **stützt die Aussage
  der Website:** teilweise – Training mit Shutterbrille bei Ballübungen verbesserte das Behalten im visuellen
  Kurzzeitgedächtnis (640–2 560 ms, 24 h stabil); nichts zu Vorwärtsmodellen, Blickfolge oder Bildschirm-Stroboskop.
- Mitroff, S. R., Friesen, P., Bennett, D., Yoo, H., & Appelbaum, L. G. (2013). Enhancing ice hockey skills
  through stroboscopic training. *Athletic Training & Sports Health Care, 5*(6), 261–264.
  https://doi.org/10.3928/19425864-20131030-02 – **Prüfung:** DOI stimmt ✓, aber Autorenliste falsch (letzter Autor
  ist Reichow, A. W.) und Titel verkürzt (richtig: „… Stroboscopic Visual Training: A Pilot Study“); **stützt die
  Aussage der Website:** teilweise – Pilotstudie (6 gegen 5 NHL-Spieler, 16 Tage, Präzision +18 %, nicht verblindet;
  Inhalt über Wilkins & Appelbaum, 2020); „zeitliche Antizipation von Pucks“ wurde nicht gemessen.
- Smith, T. Q., & Mitroff, S. R. (2016). Stroboscopic training enhances anticipatory timing. *Journal of Sports
  Sciences, 34*(18), 1735–1742. https://doi.org/10.1080/02640414.2014.926384 – **Prüfung:** DOI falsch (gehört zu
  Mooses et al., Laufökonomie kenianischer Läufer, *J. Sports Sci. 33*(2)); richtig: Smith & Mitroff (**2012**),
  *International Journal of Exercise Science, 5*(4), 344–353, https://doi.org/10.70252/OTSW1297 ✓; **stützt die
  Aussage der Website:** teilweise – Brille 100 ms sichtbar / 150 ms dunkel, genaueres Timing direkt und 10 min nach
  dem Training, nicht nach 10 Tagen; dynamische Sehschärfe und Kurzzeitgedächtnis nicht untersucht.
- Bennett, S. J., Orban de Xivry, J. J., Barnes, G. R., & Lefèvre, P. (2007). Target velocity prediction and the
  tracking of intermittently occluded targets. *Vision Research, 47*(7), 885–898.
  https://doi.org/10.1016/j.visres.2007.01.020 – **Prüfung:** nicht auffindbar; die DOI gehört zu Berry, Warrant &
  Stange (2007), Ocellen der Heuschrecke, *Vision Research 47*(10). Nächstliegende echte Arbeit: Bennett et al.
  (2007), *Journal of Neurophysiology, 98*(3), 1405–1414, https://doi.org/10.1152/jn.00132.2007 ✓ (Beschleunigung
  in der Vorhersage); **stützt die Aussage der Website:** nein für „Okklusionstraining stärkt Kleinhirn und FEF“ und
  „Trainierte halten die Geschwindigkeit“ (keine Trainings- oder Hirndaten); teilweise für Geschwindigkeitsgedächtnis
  und antizipatorisches Wiederbeschleunigen (belegt durch Bennett & Barnes, 2003; Becker & Fuchs, 1985).
- Appelbaum, L. G., Schroeder, J. E., Cain, M. S., & Mitroff, S. R. (2012). Improved visual cognition through
  stroboscopic training. *Frontiers in Psychology, 3*, 276. https://doi.org/10.3389/fpsyg.2012.00276 –
  **Prüfung:** DOI falsch (gehört zu Nagai, 2012, taktile Zeitordnungsurteile); richtig: (**2011**), *Frontiers in
  Psychology, 2*, 276, https://doi.org/10.3389/fpsyg.2011.00276 ✓; **stützt die Aussage der Website:** teilweise –
  besser: zentrale Bewegungsempfindlichkeit und zentrale Aufmerksamkeit (UFOV-Doppelaufgabe); nicht besser:
  peripher und Multiple-Object-Tracking; dynamische Sehschärfe und Reaktionsantizipation nicht gemessen.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of
  simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 –
  **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein – Studie zur einfachen Reaktionszeit
  (N = 1 469) und zu Hardware-Verzögerungen (≈ 18 ms); nichts zu 144-Hz-Monitoren, Hell-/Dunkel-Jitter oder
  Kleinhirn-Timing.

### Weitere Fachliteratur

- Bahill, A. T., Iandolo, M. J., & Troost, B. T. (1980). Smooth pursuit eye movements in response to unpredictable
  target waveforms. *Vision Research, 20*(11), 923–931. https://doi.org/10.1016/0042-6989(80)90073-5 – Ermüdung
  und Unvorhersagbarkeit verschlechtern die Folgebewegung
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3),
  309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – extraretinale Signale, Geschwindigkeitsspeicher, Vorhersage
- Becker, W., & Fuchs, A. F. (1985). Prediction in the oculomotor system: Smooth pursuit during transient
  disappearance of a visual target. *Experimental Brain Research, 57*(3), 562–575.
  https://doi.org/10.1007/BF00237843 – Abbremsen nach ≈ 190 ms, Restgeschwindigkeit 40–60 %
- Bennett, S. J., & Barnes, G. R. (2003). Human ocular pursuit during the transient disappearance of a visual
  target. *Journal of Neurophysiology, 90*(4), 2504–2520. https://doi.org/10.1152/jn.01145.2002 –
  Wiederbeschleunigung vor erwartetem Auftauchen
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America
  A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit Farbsehschwäche
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of
  Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Latenz der Folgebewegung ≈ 100 ms
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of
  different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250.
  https://doi.org/10.1113/jphysiol.1984.sp015242 – Gain < 0,95, sinkt mit dem Tempo
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during
  visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 –
  Aufholsakkaden, Latenz ≈ 125 ms
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures:
  A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441.
  https://doi.org/10.1111/j.1528-1167.2005.31405.x – Häufigkeit, Frequenzbereich 1–65 Hz, Gipfel 15–25 Hz
- Fransen, J. (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive
  training to sports performance. *Sports Medicine, 54*(11), 2717–2724. https://doi.org/10.1007/s40279-024-02060-x –
  fehlender Ferntransfer
- Fukushima, K., Fukushima, J., Warabi, T., & Barnes, G. R. (2013). Cognitive processes involved in smooth pursuit
  eye movements: Behavioral evidence, neural substrate and clinical correlation. *Frontiers in Systems
  Neuroscience, 7*, 4. https://doi.org/10.3389/fnsys.2013.00004 – Gedächtnis- und Vorbereitungssignale (SEF, FEF,
  Kleinhirnwurm)
- Guo, J., Zhao, L., Liu, G., Li, H., & Wu, J. (2025). Stroboscopic training effects on athletic performance and
  cognitive function across populations, purposes, and skill types: A systematic review and meta-analysis of
  randomized controlled trials. *Frontiers in Sports and Active Living, 7*, 1705693.
  https://doi.org/10.3389/fspor.2025.1705693 – Metaanalyse Strobe-RCTs
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when
  reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative
  Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced
  seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425.
  https://doi.org/10.1111/j.1528-1167.2005.31305.x – Grenzwerte ≥ 3 Hz, ≥ 20 cd/m², ≥ 0,006 sr
- Hülsdünker, T., Gunasekara, N., & Mierau, A. (2021). Short- and long-term stroboscopic training effects on
  visuomotor performance in elite youth sports. Part 1: Reaction and behavior. *Medicine & Science in Sports &
  Exercise, 53*(5), 960–972. https://doi.org/10.1249/MSS.0000000000002541 – Laborverbesserung ohne Feldtransfer
- Jordan, J. B., & Vanderheiden, G. C. (2024). International guidelines for photosensitive epilepsy: Gap analysis
  and recommendations. *ACM Transactions on Accessible Computing, 17*(3), 1–35. https://doi.org/10.1145/3694790 –
  Normen und kurze Tablet-Abstände
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual
  Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 – Vorhersage in der
  Folgebewegung (Review)
- Lencer, R., Nagel, M., Sprenger, A., Zapf, S., Erdmann, C., Heide, W., & Binkofski, F. (2004). Cortical mechanisms
  of smooth pursuit eye movements with target blanking. An fMRI study. *European Journal of Neuroscience, 19*(5),
  1430–1436. https://doi.org/10.1111/j.1460-9568.2004.03229.x – Netzwerk bei Blickfolge ohne sichtbares Ziel
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in
  between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – MT, FEF, Kleinhirn
- Madelain, L., & Krauzlis, R. J. (2003). Effects of learning on smooth pursuit during transient disappearance of a
  visual target. *Journal of Neurophysiology, 90*(2), 972–982. https://doi.org/10.1152/jn.00869.2002 –
  Trainierbarkeit mit Rückmeldung
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision
  Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Obergrenze ≈ 100°/s
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5),
  M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Alterseffekte
- Nagel, M., Sprenger, A., Zapf, S., Erdmann, C., Kömpf, D., Heide, W., Binkofski, F., & Lencer, R. (2006).
  Parametric modulation of cortical activation during smooth pursuit with and without target blanking. An fMRI
  study. *NeuroImage, 29*(4), 1319–1325. https://doi.org/10.1016/j.neuroimage.2005.08.050 – V5 bei sichtbarem,
  FEF/PFC bei verdecktem Ziel
- Newsome, W. T., Wurtz, R. H., & Komatsu, H. (1988). Relation of cortical areas MT and MST to pursuit eye
  movements. II. Differentiation of retinal from extraretinal inputs. *Journal of Neurophysiology, 60*(2),
  604–620. https://doi.org/10.1152/jn.1988.60.2.604 – extraretinale Signale in MST (Affe)
- Orban de Xivry, J.-J., Bennett, S. J., Lefèvre, P., & Barnes, G. R. (2006). Evidence for synergy between saccades
  and smooth pursuit during transient target disappearance. *Journal of Neurophysiology, 95*(1), 418–427.
  https://doi.org/10.1152/jn.00596.2005 – Sakkaden gleichen Positionsfehler aus
- Orban de Xivry, J.-J., Missal, M., & Lefèvre, P. (2008). A dynamic representation of target motion drives
  predictive smooth pursuit during target blanking. *Journal of Vision, 8*(15), 6.
  https://doi.org/10.1167/8.15.6 – fortgeschriebenes inneres Bewegungsmodell
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on
  blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892.
  https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ
  Open Ophthalmology, 3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – digitale Augenbelastung
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow,
  E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3),
  103–186. https://doi.org/10.1177/1529100616661983 – Transfer von Hirntraining
- Strainchamps, P., Ostermann, M., Mierau, A., & Hülsdünker, T. (2023). Stroboscopic eyewear applied during
  warm-up does not provide additional benefits to the sport-specific reaction speed in highly trained table
  tennis athletes. *International Journal of Sports Physiology and Performance, 18*(10), 1126–1131.
  https://doi.org/10.1123/ijspp.2022-0426 – kein Zusatznutzen
- Vera, J., Cantó-Cerdán, M., García-Ramos, A., & Redondo, B. (2026). Acute and long-term effects of stroboscopic
  training on sport performance: A systematic review and meta-analysis. *Journal of Sports Sciences, 44*(5),
  604–615. https://doi.org/10.1080/02640414.2025.2598176 – akut schlechter, langfristig ≈ 5–6 % besser
- Wang, Y., Wang, Q., Bao, H., Dong, X., Cai, K., & Chen, A. (2026). A systematic review and three-level
  meta-analysis of the effects of stroboscopic training on sport-specific performance. *Journal of Sports
  Sciences, 44*(4), 460–476. https://doi.org/10.1080/02640414.2025.2592441 – g = 0,35
- Wilkins, L., & Appelbaum, L. G. (2020). An early review of stroboscopic visual training: Insights, challenges and
  accomplishments to guide future studies. *International Review of Sport and Exercise Psychology, 13*(1), 65–80.
  https://doi.org/10.1080/1750984X.2019.1582081 – Brillenparameter, Studienlage, Sicherheitshinweise
- World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (W3C Recommendation,
  12. Dezember 2024), SC 2.2.2, 2.3.1, 2.3.2. https://www.w3.org/TR/WCAG22/ – Norm, keine DOI; Grenzwerte für Blitze

Prüfvermerk: Alle DOIs am 29.09.2026 über die Crossref-API aufgelöst (Titel, Autor:innen, Jahr, Zeitschrift,
Band, Seiten verglichen); Inhalte über PubMed-Abstracts bzw. den Volltext von Wilkins & Appelbaum (2020) geprüft.
Kuroki et al. (2007) und Bridges et al. (2020) sind in der Gruppen-Literaturbasis geprüft und hier nur im Text
erwähnt. Eigene Berechnungen (Blinkfrequenzen, Sehwinkel, Leuchtdichte, Raumwinkel) stammen aus dem Spielcode
und Standardformeln (sRGB/WCAG) und sind keine Literaturwerte.
