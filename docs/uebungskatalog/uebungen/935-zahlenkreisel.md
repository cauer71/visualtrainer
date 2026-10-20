---
# ===== Kennung =====
nr: 935
kennung: zahlenkreisel
name: "Zahlenkreisel (Zahlen der Reihe nach auf gegenläufig drehenden Ringen antippen)"
name_original: "– (eigene Blickfit-Übung, aus der Literatur zur visuellen Suche hergeleitet)"
kapitel: "Eigene Blickfit-Übungen"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "zahlenkreisel", name: "Zahlenkreisel", unterschiede: "Eigene Umsetzung als Touch-Übung: Zahlen 1 bis N (Standard 40, einstellbar 20 bis 40) auf konzentrischen Ringen, die langsam starr um die Mitte drehen, benachbarte Ringe gegenläufig und unterschiedlich schnell; die Ziffern bleiben aufrecht und schaukeln nur leicht (bis 12°, mit Einstellung „Stark“ bis 18°). Antippen in aufsteigender Folge, Stoppuhr mm:ss,hh, oben nur „Gesucht: N“ (die nächste Zahl wird im Feld nie hervorgehoben); gefundene Zahlen bleiben unverändert sichtbar und bekommen einen kleinen Punkt. Mindestabstand so, dass sich Zahlen und Trefferflächen zu keinem Zeitpunkt überlappen (Trefferfläche ≥ 44 px, am Tablet etwa 76 px). Stufen 1 bis 8 (Tempo, Unterschied der Ringe, Schaukeln), eine Scheibe je Sitzung. Hauptwert Stufe; Gesamtzeit, Zeit pro Zahl, Fehltipps nur im Vergleich mit sich selbst. Keine Normen."}
stand: 2026-10-20

# ===== Überblick =====
kurzbeschreibung: "Die Zahlen 1 bis 40 stehen auf mehreren Ringen um eine gemeinsame Mitte. Die Ringe drehen sich langsam, benachbarte gegeneinander; die Ziffern bleiben aufrecht und schaukeln leicht. Man tippt die Zahlen so zügig wie möglich der Reihe nach an, eine Uhr läuft mit. Gefundene Zahlen bleiben sichtbar und bekommen nur einen Punkt."
ziel_funktionen: [visuelle_suche, sakkaden, selektive_aufmerksamkeit, verarbeitungsgeschwindigkeit]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 90
schwierigkeit_anpassung: "8 Stufen (Tabelle LEVELS in src/exercises/zahlenkreisel/logic.ts), eine Scheibe je Sitzung: Bahngeschwindigkeit am äußeren Ring 2,0 → 8,0 u/s (u = 1 % der kürzeren Bühnenseite; am Tablet etwa 0,5 → 1,8°/s bei 40 cm), Unterschied der Ringe 0 → ±35 %, Schaukeln 4° → 12° bei 0,25 → 0,40 Hz. Geschafft = Zeit je Zahl ≤ (600 + 25·N) ms · (1,30 − 0,04·(Stufe − 1)) und höchstens 5 % Fehltipps → nächste Sitzung eine Stufe höher; über dem 1,5-Fachen oder mehr als 15 % Fehltipps → eine tiefer; sonst gleich. Einstellungen (eigene Variante für Vergleiche): Anzahl Zahlen 20–40, Drehtempo 50–150 %, Gegenläufig an/aus, Schaukeln aus/leicht/normal/stark."
messgroessen: ["Hauptwert: geschaffte Stufe (sonst eine darunter)", "Gesamtzeit vom Erscheinen bis zum letzten richtigen Tipp (Stoppuhr)", "Zeit pro Zahl (Median der Abstände, ohne die erste Zahl)", "Fehltipps (andere, noch nicht gefundene Zahl; Tipps daneben zählen nicht)", "Zeit je Zehnerblock (Tabelle)", "keine Messung des Blicks; keine Normwerte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 2
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 2
    blickfolge: 1
    sakkaden: 3
    fixation: 1
    bewegungswahrnehmung: 2
    visuelle_suche: 3
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 3
    inhibition: 2
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 2
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 3
    antizipation: 1
    entscheidung_wahlreaktion: 0
    lesen_sprache: 1
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 2
    zielbewegung_tempo: 1
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 2
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Zahlen bis 40 sicher lesen und der Reihe nach kennen", "Ziffern von etwa 1° Höhe am Tablet in 40 cm (am Handy kleiner, etwa 0,5°) auch in langsamer Bewegung erkennen", "Mit dem Finger Trefferflächen von mindestens 44 px treffen (am Tablet etwa 76 px)", "Ruhig gestelltes Gerät, Brille bzw. Nahbrille wie im Alltag"]
vorsicht_bei: [schwindel_vestibulaer, reisekrankheit, nystagmus, sehbehinderung_niedriger_visus, presbyopie_gleitsicht, kopfschmerz_asthenopie, aufmerksamkeitsprobleme, kinder_unter_6]
geeignet_fuer: ["Geordnetes Suchen in einer bewegten Szene üben: Zahlen der Reihe nach finden, während sich die Ringe gegeneinander drehen", "Fortsetzung der ruhenden Zahlentafel (Zahlenjagd), wenn diese sicher gelingt: gleiche Aufgabe, aber bewegte Suchmenge und ablenkende Gegenbewegung", "Vergleich mit sich selbst: Stufe, Gesamtzeit und Fehltipps über mehrere Sitzungen mit gleichen Einstellungen auf demselben Gerät", "Fein einstellbare Bewegung (Drehtempo, Gegenlauf, Schaukeln), z. B. erst ruhig, dann schrittweise mehr Bewegung"]
weniger_geeignet_fuer: ["Messung oder Beurteilung von Blicksprüngen, Gesichtsfeld oder peripherem Sehen: die App misst den Blick nicht", "Normvergleich, Diagnose oder Leistungsfeststellung (nicht vorgesehen)", "Menschen, denen bewegte Bildschirminhalte Schwindel oder Übelkeit bereiten (dann Bewegung reduzieren oder andere Übung)", "Menschen, die Zahlen bis 40 nicht sicher lesen"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Für Zahlen der Reihe nach in einer ruhenden Tafel (Schulte-Tafel, Trail Making A) sind deutliche Übungseffekte bei Wiederholung belegt (Buck et al. 2008); für Suchaufgaben schnelles Wahrnehmungslernen mit teils begrenzter Übertragung (Sireteanu & Rettenbach 1995, 2000). Die Fassung mit gegenläufig drehenden Ringen ist nicht untersucht. Übertragung von Gehirntraining auf Alltagsaufgaben ist nicht belegt (Simons et al. 2016)."
aehnliche_uebungen: [204, 103, 904, 106]
stichworte: ["Zahlen der Reihe nach", "Zahlentafel in Bewegung", "gegenläufige Ringe", "visuelle Suche", "Blicksprünge", "dynamische Sehschärfe", "Stoppuhr", "Crowding", "kein Eye-Tracking"]
---

# 935 · Zahlenkreisel (Zahlen der Reihe nach auf gegenläufig drehenden Ringen antippen)

> Original: – (eigene Blickfit-Übung, aus der Literatur zur visuellen Suche hergeleitet) · Blickfit: „Zahlenkreisel“ (`src/exercises/zahlenkreisel/`, Kategorie Konzentration)

## 1. Kurzbeschreibung

Die Zahlen 1 bis 40 (einstellbar 20 bis 40) stehen weiß auf dunklem Grund auf mehreren konzentrischen Ringen; die Ringlinien sind kaum sichtbar. Jeder Ring dreht sich langsam um die gemeinsame Mitte, benachbarte Ringe drehen gegeneinander und unterschiedlich schnell. Die Ziffern drehen nicht mit, sondern bleiben aufrecht und schaukeln nur leicht um die eigene Achse. Man tippt die Zahlen so zügig wie möglich in aufsteigender Folge an; oben stehen die gesuchte Zahl und eine Stoppuhr. Gefundene Zahlen bleiben unverändert sichtbar und bekommen nur einen kleinen Punkt, damit die Suche nicht mit jeder Zahl leichter wird. Gegenüber einer ruhenden Zahlentafel bewegt sich die Suchmenge: Eine Zahl, die man schon gesehen hat, steht beim nächsten Blick woanders, und die Gegenbewegung der Ringe lenkt ab.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts` und `logic.ts` in `src/exercises/zahlenkreisel/` (Stand 20.10.2026).

- **Sitzung:** eine Scheibe mit N Zahlen (Einstellung, Standard 40). Die Uhr startet mit dem Erscheinen der Zahlen und stoppt beim letzten richtigen Tipp. Notbremse nach 5 min (dann zählt die Runde als nicht geschafft, gezeigt werden die gefundenen Zahlen). Schnellmodus (`?quick=1`): 10 Zahlen. Intro-Film: 12 Zahlen, die Hand tippt 1 bis 5, Bildunterschriften zu Ringen, Reihenfolge, Schaukeln, Punkt und Uhr.
- **Geometrie:** rundes Feld unter der Anzeige (bei breiten, niedrigen Bühnen wie Handy quer steht die Anzeige links daneben). Jede Zahl hat einen Hüllkreis, der sie in jeder Neigung enthält. Teilung p = max(50 px, 2 × Hüllkreis + Luft); Trefferfläche = Kreis mit Radius p/2. Ringe liegen radial genau p auseinander, auf jedem Ring stehen n Zahlen in gleichen Winkeln mit Sehne 2r·sin(π/n) ≥ p. Weil jeder Ring starr dreht, bleibt der Abstand im Ring konstant; über Ringe hinweg garantiert der radiale Abstand ihn in jeder Winkelstellung. Reicht der Platz nicht, werden erst die Schrift (bis 22 px) und dann die Teilung (bis 44 px) verkleinert. Ergebnisse: Tablet 1180 × 820: Schrift 48 px, Teilung 76 px, 4 Ringe mit 16/12/8/4 Zahlen; Handy 390 × 844: Schrift 30 px, Teilung 50 px, 3 Ringe mit 20/13/7 Zahlen. Unit-Tests prüfen für 20, 30 und 40 Zahlen auf sieben Bühnen, viele Zufallsläufe und zwei Minuten Drehung, dass sich Trefferflächen nie überlappen und alles im Feld bleibt.
- **Zuordnung:** Die Zahlen werden jede Runde neu auf die Plätze gemischt; aufeinanderfolgende Zahlen stehen nie direkt nebeneinander im selben Ring.
- **Bewegung:** Winkel eines Platzes θ(t) = φ₀ + 2πj/n + ω·t. Bahngeschwindigkeit am äußeren Ring v₀ = speedU · u · Drehtempo; Ring mit Radius r: v₀ · √(r/r_außen) · (1 ± ringVar), Richtung abwechselnd (außen im Uhrzeigersinn) oder bei „Gegenläufig aus“ alle gleich. Schaukeln je Zahl: α(t) = A · sin(2πf·t + ψ) mit eigener Phase ψ und f = Stufenwert ± 20 %; A = Stufenwert × Faktor (aus 0, leicht 0,5, normal 1, stark 1,5), höchstens 18°. Alles ist eine reine Funktion der (in der Pause stehenden) Zeit.
- **Stufen 1–8:** speedU 2,0 / 2,8 / 3,6 / 4,4 / 5,2 / 6,0 / 7,0 / 8,0 u/s; ringVar 0 bis 0,35; Schaukeln 4° bis 12° bei 0,25 bis 0,40 Hz. Bewertung nach der Scheibe (siehe `schwierigkeit_anpassung`); die Startstufe der nächsten Sitzung ist das Ergebnis dieser Bewertung.
- **Eingabe:** Treffer = nächste Mitte, deren Trefferkreis den Finger enthält, berechnet für den Zeitpunkt des Tipps. Gesuchte Zahl → kurzes weiches ✓, Punkt an der Zahl, Ton. Andere, noch nicht gefundene Zahl → weiches ✗ am Ort, Ton, Fehltipp, keine Zeitstrafe. Schon gefundene Zahl → ignoriert. Daneben → blasser Ring, zählt nicht. Doppel-Tipps innerhalb von 80 ms werden ignoriert.
- **Ergebnis:** Hauptwert Stufe; Gesamtzeit, Zeit pro Zahl (Median der Abstände ohne die erste Zahl), Fehltipps; Tabelle „Zeit je Zehnerblock“. Punkte: 2 + Stufe je Zahl, 10 × Stufe für eine geschaffte Scheibe.
- **Bewegung reduzieren:** Ringe und Ziffern stehen still (runde Zahlentafel).
- **Test-Zugang:** Mit `?e2e=1` liest `window.__zahlenkreisel` die aktuellen Plätze (nur Ende-zu-Ende-Tests).

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Aufgabe:** Zahlen der Reihe nach in einer unübersichtlichen Anordnung finden ist das Prinzip der Zahlentafel nach Schulte und des Trail Making Test A (Reitan 1958). Die Zeit hängt dort vor allem am Verarbeitungstempo (Salthouse 2011); Wiederholung bringt deutliche Übungseffekte (Buck et al. 2008). Die ruhende Fassung ist in Blickfit die Zahlenjagd.
- **Warum Bewegung:** In der ruhenden Tafel kann man sich Orte merken und systematisch Zeile für Zeile absuchen. Drehen sich die Ringe, ändern sich Orte und Nachbarschaften fortlaufend: Systematisches Absuchen wird schwerer, die Aufgabe verlagert sich zu schnellem Erfassen bewegter Zahlen (dynamische Sehschärfe; Ludvigh & Miller 1958) und zum Ausblenden der ablenkenden Gegenbewegung. Dass die Suche auch ohne verlässliches Ortsgedächtnis gelingt, zeigt der Befund, dass die Sucheffizienz bei ständig umgestellten Zeichen ähnlich blieb (Horowitz & Wolfe 1998).
- **Gegenlauf statt Chaos:** Starr drehende Ringe sind vorhersagbar – Zahlen bleiben in ihrem Ring und lassen sich verfolgen (Mehrfachverfolgung ist begrenzt, Pylyshyn & Storm 1988). Der Gegenlauf benachbarter Ringe sorgt für ständig wechselnde Nachbarschaften, ohne dass Zahlen springen oder sich überdecken.
- **Aufrechte, schaukelnde Ziffern:** Ziffern bleiben aufrecht, damit die Aufgabe Suche bleibt und nicht mentale Rotation wird; das leichte Schaukeln nimmt der Anordnung die Starre und erschwert das Erkennen in der Bewegung nur wenig.
- **Mindestabstand:** Enge Abstände erschweren das Erkennen (Crowding; Bouma 1970; Whitney & Levi 2011). Deshalb überlappen Zahlen nie, und die Trefferflächen bleiben getrennt.
- **Kein Hervorheben der nächsten Zahl, gefundene bleiben:** Suche wird mit Zahl und Ähnlichkeit der Ablenker langsamer (Treisman & Gelade 1980; Duncan & Humphreys 1989). Verschwänden gefundene Zahlen, würde die Suchmenge mit jeder Zahl kleiner; ein Hervorheben der nächsten Zahl würde die Suche überflüssig machen.
- **Was nicht belegt ist:** Wirkungen auf Lesen, Sport, Verkehr, das periphere Sehen oder das Gesichtsfeld. Solche Aussagen werden nicht gemacht.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Am Tablet (1180 × 820, etwa 36 px je Grad bei 40 cm) ist die Schrift etwa 48 px groß, die Ziffernhöhe (≈ 0,7 der Schriftgröße) liegt damit bei etwa 1°. Am Handy (390 × 844) ist die Schrift 30 px, die Ziffern messen etwa 0,5°; wer kleine Ziffern schlecht erkennt, nutzt besser ein Tablet oder weniger Zahlen. Zahlenmittelpunkte liegen am Tablet mindestens 76 px (etwa 2°) auseinander.
- **Blicksprünge:** Suche besteht aus Fixationen von grob 200–300 ms und Blicksprüngen dazwischen (Rayner 1998). Bewegte Ziele verlangen, den Blick kurz mitzuführen; die Ringe bewegen sich langsam (am Tablet höchstens etwa 3,7°/s für den schnellsten Ring bei Stufe 8 und Drehtempo 150 %), weit unterhalb der Grenzen der glatten Folgebewegung.
- **Dynamische Sehschärfe:** Zeichen auf bewegten Zielen werden schlechter erkannt als auf ruhenden, umso mehr, je schneller sie sich bewegen (Ludvigh & Miller 1958). Bei den hier gewählten Tempi ist der Unterschied klein; er wächst mit Stufe und Drehtempo.
- **Crowding:** Der kritische Abstand für ungestörtes Erkennen liegt grob bei der halben Exzentrizität (Bouma 1970; Pelli & Tillman 2008). Der feste Mindestabstand begrenzt die gegenseitige Störung, hebt sie im Randbereich aber nicht auf.
- **Brillenträger und Nähe:** Gleitsicht hat einen schmalen scharfen Zwischenbereich; das Feld ist rund und mittig, Kopfbewegungen sind kaum nötig (Hutchings et al. 2007). Am Bildschirm sinkt die Lidschlagrate (Patel et al. 1991); eine Sitzung dauert etwa 1–2 Minuten.
- **Farbe:** spielt keine Rolle (weiße Ziffern, Rückmeldung immer auch über Form: ✓, ✗, Punkt).

## 5. Neurowissenschaftliche Grundlagen

- **Gesteuerte Suche:** Frühe visuelle Areale liefern Merkmalskarten; eine Prioritätskarte lenkt Aufmerksamkeit und Blicksprünge (Wolfe 2021); als neuronaler Kandidat gilt der laterale intraparietale Bereich (Bisley & Goldberg 2010). Ein dorsales fronto-parietales Netzwerk mit frontalem Augenfeld steuert die zielgerichtete Aufmerksamkeit (Corbetta & Shulman 2002).
- **Bewegung:** Bewegungssignale entstehen im Bewegungskomplex MT+; die Gegenbewegung der Ringe ist ein auffälliger Reiz, den die gezielte Suche ausblenden muss.
- **Reihenfolge:** Die gesuchte Zahl muss im Kopf gehalten und nach jedem Treffer erneuert werden (Arbeitsgedächtnis); bei Trail-Making-Aufgaben erklärt vor allem das Verarbeitungstempo die Unterschiede (Salthouse 2011).
- Eine Aussage „diese Übung trainiert Region X“ lässt sich daraus nicht ableiten und wird nicht gemacht.

## 6. Motorische Grundlagen

Gefordert ist ein gezielter Tipp auf eine langsam bewegte Zahl. Die Trefferfläche ist am Tablet etwa 76 px, mindestens 44 px groß; nach dem Fitts'schen Gesetz hängt die Zeit für die Zielbewegung von Abstand und Zielgröße ab (Fitts 1954), bei diesen Größen ist sie klein gegenüber der Suchzeit. Der Treffer wird für die Position zum Zeitpunkt des Tipps berechnet, damit die Bewegung der Zahl nicht bestraft wird. Tremor stört wenig; Tipps daneben zählen nicht als Fehler.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Blickmessung:** Wohin man schaut und wie man sucht, bleibt offen.
- **Eine Scheibe je Sitzung:** Die Gesamtzeit hängt stark davon ab, wo die Zahlen zufällig stehen; einzelne Läufe streuen. Aussagekräftig ist der Verlauf über mehrere Sitzungen mit gleichen Einstellungen (Mountford et al. 2004 zur Wiederholbarkeit von Messungen am Menschen).
- **Übungseffekte:** Gerade zu Beginn wird man schnell besser (Buck et al. 2008; Calamia et al. 2012); das ist Gewöhnung an Aufgabe und Gerät, kein Nachweis einer veränderten Sehfunktion.
- **Gerät:** Bildschirmgröße, Abstand und Touch-Latenz verändern Sehwinkel, Tempo in °/s und Zeiten (Pronk et al. 2020). Ergebnisse verschiedener Geräte nicht gleichsetzen; am Handy sind die Ziffern deutlich kleiner.
- **Person:** Alter (Suche wird mit dem Alter langsamer; Hommel et al. 2004), Müdigkeit, Brille, Vertrautheit mit Zahlen.
- **Schwierigkeitswerte nur gerechnet:** Zeitrahmen und Stufentabelle sind nicht an Menschen geprüft, sondern aus der Zahlenjagd abgeleitet und per Simulation abgesichert.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Für Zahlen der Reihe nach in ruhenden Tafeln (Trail Making, Schulte-Tafel) sind deutliche Übungseffekte belegt (Buck et al. 2008); bei Suchaufgaben tritt Wahrnehmungslernen schnell auf (Sireteanu & Rettenbach 1995). Für die bewegte Fassung gibt es keine Studie.
- **Naher Transfer – schwach:** Lernen bei Suchaufgaben übertrug sich teils auf andere Aufgaben und Orte (Sireteanu & Rettenbach 2000), teils blieb es spezifisch (Ellison & Walsh 1998).
- **Alltagstransfer – fehlend:** Für eine Übertragung von Gehirntraining auf Alltagsaufgaben fehlen belastbare Belege (Simons et al. 2016); bei trainingsähnlichen Tests werden Effekte überschätzt (Guo et al. 2025).
- **Einordnung:** Der Zahlenkreisel ist eine Übungsform für geordnetes Suchen in Bewegung; Stufe und Zeiten sind Werte für den Vergleich mit sich selbst, keine Normwerte und kein Test.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand die ruhende Zahlentafel sicher beherrscht und Suchen in einer bewegten Szene üben möchte; ein Tablet mit Touch genutzt wird; Bewegung gut vertragen wird; der Vergleich mit sich selbst über mehrere Sitzungen gewünscht ist.
- **Weniger passend, wenn …** Blick, Gesichtsfeld oder peripheres Sehen gemessen werden sollen; bewegte Bildschirminhalte Beschwerden auslösen; Zahlen bis 40 nicht sicher gelesen werden; ein Normvergleich gewünscht ist.
- **Vorsicht / anpassen bei …**
  - `schwindel_vestibulaer`, `reisekrankheit`: großflächige, gegenläufige Drehung; mit langsamem Drehtempo, Gegenlauf aus und Schaukeln aus beginnen oder „Bewegung reduzieren“ nutzen.
  - `nystagmus`: Erkennen bewegter Ziffern kann deutlich erschwert sein; Ergebnis nicht als Aussage über das Auge lesen.
  - `sehbehinderung_niedriger_visus`, `presbyopie_gleitsicht`: Tablet statt Handy, passender Abstand, weniger Zahlen (größere Abstände bleiben, die Schrift bleibt gleich).
  - `kopfschmerz_asthenopie`: kurze Sitzungen, Pausen.
  - `aufmerksamkeitsprobleme`, `kinder_unter_6`: mit 20 Zahlen und ruhiger Einstellung beginnen; sicheres Zahlenwissen nötig.
  - Doppelbilder, Schwindel oder Kopfschmerz mit Sehverschlechterung gehören ärztlich abgeklärt, statt weiterzuüben (Muchnick 2008).
- **Kombiniert gut mit …** 204 (ruhende Zahlentafel) als Vorstufe, 103 (visuelle Suche), 904 (bewegte Zeichen im Wechsel), 106 (mehrere Ziele verfolgen).
- Keine Diagnosen, keine Heilversprechen; nicht als Test der Augenbewegungen oder des Gesichtsfelds darstellen.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Kein Blickmaß:** Suchstrategie und Blicksprünge werden nicht erfasst; Texte entsprechend ehrlich halten.
- **Werte nur gerechnet:** Zeitrahmen (600 + 25·N ms je Zahl), Stufentabelle und Tempi nach ersten Sitzungen mit echten Personen prüfen.
- **Eine Scheibe je Sitzung:** Die Stufe bewegt sich höchstens um eins je Sitzung; bei sehr unterschiedlichen Personen dauert es einige Sitzungen, bis die passende Stufe erreicht ist.
- **Ähnliche Ablenker:** Eine Stufe mit gezielt ähnlichen Nachbarn (z. B. 12 neben 21) wäre möglich, ist aber nicht umgesetzt.
- **Handy:** Ziffern etwa 0,5°; für Menschen mit geringer Sehschärfe ein Tablet nutzen.
- **Sicherheit:** keine Lichtreize, kein Blitzen; Hinweis auf Schwindel im Intro; „Bewegung reduzieren“ hält die Ringe an.

## 11. Quellen

### Von der Website angegeben
(keine, eigene Übung)

### Weitere Fachliteratur
- Reitan, R. M. (1958). Validity of the Trail Making Test as an indicator of organic brain damage. *Perceptual and Motor Skills, 8*(3), 271–276. https://doi.org/10.2466/pms.1958.8.3.271 – Zahlen der Reihe nach verbinden (aus Eintrag 904 übernommen)
- Salthouse, T. A. (2011). What cognitive abilities are involved in trail-making performance? *Intelligence, 39*(4), 222–232. https://doi.org/10.1016/j.intell.2011.03.001 – vor allem Verarbeitungstempo (aus Eintrag 204 übernommen)
- Buck, K. K., Atkinson, T. M., & Ryan, J. P. (2008). Evidence of practice effects in variants of the Trail Making Test during serial assessment. *Journal of Clinical and Experimental Neuropsychology, 30*(3), 312–318. https://doi.org/10.1080/13803390701390483 – Übungseffekte (aus Eintrag 204 übernommen)
- Calamia, M., Markon, K., & Tranel, D. (2012). Scoring higher the second time around: Meta-analyses of practice effects in neuropsychological assessment. *The Clinical Neuropsychologist, 26*(4), 543–570. https://doi.org/10.1080/13854046.2012.680913 – Übungseffekte bei Wiederholung (aus Eintrag 204 übernommen)
- Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology, 12*(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5 – serielle Suche (aus Eintrag 103 übernommen)
- Duncan, J., & Humphreys, G. W. (1989). Visual search and stimulus similarity. *Psychological Review, 96*(3), 433–458. https://doi.org/10.1037/0033-295X.96.3.433 – Ähnlichkeit von Ziel und Ablenkern (aus Eintrag 103 übernommen)
- Horowitz, T. S., & Wolfe, J. M. (1998). Visual search has no memory. *Nature, 394*(6693), 575–577. https://doi.org/10.1038/29068 – Suche bei ständig umgestellten Zeichen (aus Eintrag 103 übernommen)
- Wolfe, J. M. (2021). Guided Search 6.0: An updated model of visual search. *Psychonomic Bulletin & Review, 28*(4), 1060–1092. https://doi.org/10.3758/s13423-020-01859-9 – Suchmodell (aus Eintrag 103 übernommen)
- Pylyshyn, Z. W., & Storm, R. W. (1988). Tracking multiple independent targets: Evidence for a parallel tracking mechanism. *Spatial Vision, 3*(3), 179–197. https://doi.org/10.1163/156856888X00122 – begrenzte Mehrfachverfolgung (aus Eintrag 106 übernommen)
- Ludvigh, E., & Miller, J. W. (1958). Study of visual acuity during the ocular pursuit of moving test objects. I. Introduction. *Journal of the Optical Society of America, 48*, 799. https://doi.org/10.1364/josa.48.000799 – dynamische Sehschärfe (aus Eintrag 906 übernommen)
- Bouma, H. (1970). Interaction effects in parafoveal letter recognition. *Nature, 226*(5241), 177–178. https://doi.org/10.1038/226177a0 – kritischer Abstand (aus Eintrag 103 übernommen)
- Pelli, D. G., & Tillman, K. A. (2008). The uncrowded window of object recognition. *Nature Neuroscience, 11*(10), 1129–1135. https://doi.org/10.1038/nn.2187 – Crowding begrenzt Erkennen (aus Eintrag 103 übernommen)
- Whitney, D., & Levi, D. M. (2011). Visual crowding: A fundamental limit on conscious perception and object recognition. *Trends in Cognitive Sciences, 15*(4), 160–168. https://doi.org/10.1016/j.tics.2011.02.005 – Crowding, Überblick (aus Eintrag 103 übernommen)
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin, 124*(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – Fixationsdauern bei Suche (aus Eintrag 103 übernommen)
- Corbetta, M., & Shulman, G. L. (2002). Control of goal-directed and stimulus-driven attention in the brain. *Nature Reviews Neuroscience, 3*(3), 201–215. https://doi.org/10.1038/nrn755 – Aufmerksamkeitsnetzwerke (aus Eintrag 103 übernommen)
- Bisley, J. W., & Goldberg, M. E. (2010). Attention, intention, and priority in the parietal lobe. *Annual Review of Neuroscience, 33*, 1–21. https://doi.org/10.1146/annurev-neuro-060909-152823 – Prioritätskarte (aus Eintrag 103 übernommen)
- Sireteanu, R., & Rettenbach, R. (1995). Perceptual learning in visual search: Fast, enduring, but non-specific. *Vision Research, 35*(14), 2037–2043. https://doi.org/10.1016/0042-6989(94)00295-W – schnelles Lernen (aus Eintrag 103 übernommen)
- Sireteanu, R., & Rettenbach, R. (2000). Perceptual learning in visual search generalizes over tasks, locations, and eyes. *Vision Research, 40*(21), 2925–2949. https://doi.org/10.1016/S0042-6989(00)00145-0 – Übertragung des Lernens (aus Eintrag 103 übernommen)
- Ellison, A., & Walsh, V. (1998). Perceptual learning in visual search: Some evidence of specificities. *Vision Research, 38*(3), 333–345. https://doi.org/10.1016/S0042-6989(97)00195-8 – Spezifität des Lernens (aus Eintrag 103 übernommen)
- Hommel, B., Li, K. Z. H., & Li, S.-C. (2004). Visual search across the life span. *Developmental Psychology, 40*(4), 545–558. https://doi.org/10.1037/0012-1649.40.4.545 – Alter (aus Eintrag 103 übernommen)
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – Zielgröße und Bewegungszeit (aus Eintrag 204 übernommen)
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer von Gehirntraining (aus Eintrag 103 übernommen)
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Überschätzung bei ähnlichen Tests (aus Eintrag 103 übernommen)
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch-Latenz (aus Eintrag 204 übernommen)
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., & Wells, K. A. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Gleitsicht (aus Eintrag 103 übernommen)
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm (aus Eintrag 103 übernommen)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Wiederholbarkeit von Messungen am Menschen (S. 43–44)
