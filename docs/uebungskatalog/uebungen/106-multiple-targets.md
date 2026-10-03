---
# ===== Kennung =====
nr: 106
kennung: multiple-targets
name: "Mehrere Kugeln verfolgen (Multiple Object Tracking)"
name_original: "Mehrfach-Objektverfolgung | MOT-Test | SkillDrills (Spielname „Multiple Targets“)"
kapitel: "Visuelle Wahrnehmung"
kapitel_original: "visual"
unterkapitel_original: "tracking-accuracy"
quelle_url: "https://skilldrills.online/de/drills/visual/tracking-accuracy/multiple-targets"
blickfit_umsetzung: {kennung: "kugel-detektiv", name: "Kugel-Detektiv", unterschiede: "Statt eines einzigen 60-s-Durchgangs 6 kurze Runden à 6 s mit 8 Kugeln und 3 Zielen; das Tempo passt sich per gewichteter Treppe an (Ziel ≈ 75 % fehlerfreie Runden, 25 Stufen, je Stufe ×1,1). Bewegung zeitbasiert (bildfrequenzunabhängig), alle Kugeln gleich schnell, weiche Abstoßung statt harter Stöße, Fixationspunkt in der Mitte (Tipp, nicht erzwungen), Auflösung mit Form und Farbe (Häkchen, Kreuz, gestrichelter Ring). Zweisprachig DE/IT, Touch-Eingabe. Dadurch deutlich weniger Daueraufmerksamkeit, dafür sauberere Messung und weniger Verwechslungen durch Zufallskollisionen."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Acht gleich aussehende Kugeln bewegen sich kreuz und quer; drei davon leuchten zu Beginn kurz auf. Man verfolgt diese drei ohne Markierung sechs Sekunden lang, bis alle stillstehen, und tippt sie dann an. Das Tempo passt sich von Runde zu Runde an."
ziel_funktionen: [geteilte_aufmerksamkeit, daueraufmerksamkeit]
eingabe: [maus, touch]
tablet_geeignet: ja
dauer_sekunden: 80
schwierigkeit_anpassung: "Original: nur ein Durchgang pro Sitzung; Kugelzahl = 8 + Bestwert ÷ 30 (abgerundet, Deckel 20, real höchstens 10), Tempo = 300 px/s + Bestwert × 2 px/s (real höchstens 420 px/s). Blickfit: Stufen 1–25, je Stufe Tempo ×1,1, nach einer fehlerfreien Runde +0,6 Stufen, nach einem Fehler −1,8."
messgroessen: ["Original: Punkte (20 je richtig getipptes Ziel, 0–60), Trefferquote, Note F–S+, Bestwert", "Blickfit: erreichte Stufe (Schwelle), fehlerfreie Runden, Anteil richtig erkannter Ziele, höchste Stufe", "sinnvoll: Tempo-Schwelle bei 75–80 % fehlerfreien Runden, Verwechslungen nach engen Begegnungen, Leistung je Halbfeld, Verlauf statt Einzelwert"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 1
    farbunterscheidung: 1
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 2
    blickfolge: 1
    sakkaden: 1
    fixation: 1
    bewegungswahrnehmung: 2
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 3
    selektive_aufmerksamkeit: 2
    inhibition: 1
    geteilte_aufmerksamkeit: 3
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 2
    verarbeitungsgeschwindigkeit: 1
    antizipation: 1
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 1
    zielbewegung_tempo: 0
    zielbewegung_praezision: 1
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
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Kugeln von etwa 0,6–2,3° Durchmesser auf dunklem Grund sicher sehen (Tablet in 40 cm: ca. 20–85 CSS-px, eigene Rechnung)", "ein Spielfeld, das ohne Kopfdrehen überblickt werden kann (Tablet quer, Abstand ca. 40 cm)", "60 s am Stück konzentriert bleiben können (Original)", "Tippen oder Klicken auf eine Stelle des Bildschirms"]
vorsicht_bei: [kognitive_einschraenkung, aufmerksamkeitsprobleme, gesichtsfeldausfall, presbyopie_gleitsicht, trockenes_auge_bildschirm, sehbehinderung_niedriger_visus, farbsehschwaeche, schwindel_vestibulaer]
geeignet_fuer: ["verteilte Aufmerksamkeit auf mehrere bewegte Dinge gleichzeitig üben (Laborbild für Kreuzung, Spielfeld, Spielplatz)", "Blickstrategie ausprobieren: Blick locker in die Mitte der Zielgruppe statt an einer Kugel zu kleben", "dosierbare Konzentrationsübung mit sichtbarem Lernfortschritt und ohne Lesen, Zahlen oder Farbnamen", "kurze, adaptive Einheiten, auch für Ältere"]
weniger_geeignet_fuer: ["gezieltes Training der glatten Blickfolge (das Auge muss nicht einem Objekt folgen; dafür 105, 402–407)", "Reaktionsschnelligkeit oder Handgenauigkeit (Tippen ist untergeordnet)", "Menschen, die bei bewegten Mustern schnell ermüden oder Schwindel spüren", "kleine Smartphone-Displays (das Feld ist dort sehr eng, enge Begegnungen sind häufiger)", "Nachweis von Alltags- oder Fahreignung (nicht belegt)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Die MOT-Leistung ist gut erforscht und lernbar, auch bei Älteren (Legault et al., 2013); Transfer auf andere Aufgaben ist gemischt und methodisch schwach, auf reales Fahren fehlt Evidenz, auf Sport gibt es eine kleine positive Studie (Romeas et al., 2016) und negative Befunde (Review Vater et al., 2021: 2 von 3 praxisnahen Studien ohne Effekt; Romeas et al., 2025). Studien zur 2D-Tablet-Variante fehlen."
aehnliche_uebungen: [105, 408, 205, 206, 104, 302, 502, 605, 401]
stichworte: ["Multiple Object Tracking", "MOT", "NeuroTracker", "geteilte Aufmerksamkeit", "attentives Tracking", "Zentrumsblick", "Halbfeld-Unabhängigkeit", "Kugel-Detektiv", "Tempo-Schwelle", "Treppenverfahren", "Daueraufmerksamkeit"]
---

# 106 · Mehrere Kugeln verfolgen (Multiple Object Tracking)

> Original: „Mehrfach-Objektverfolgung | MOT-Test“ – skilldrills.online, Kapitel Visuelle Wahrnehmung (`visual/tracking-accuracy`) · Blickfit: Kugel-Detektiv (`src/exercises/kugel-detektiv/`)

## 1. Kurzbeschreibung

Acht gleich aussehende Kugeln liegen auf dunklem Grund. Zuerst leuchten drei davon zwei Sekunden lang in Bernstein auf, dann sehen alle gleich aus und wandern los: sechs Sekunden lang, mit weichen Richtungsschwankungen; nahe Kugeln drehen sanft voneinander weg, statt hart zu stoßen. Ein Punkt in der Mitte ist ein Angebot für den Blick. Danach stehen alle still, man tippt die drei markierten Kugeln an, und die Auflösung zeigt mit Häkchen, Kreuz und gestricheltem Ring, was richtig war. Eine Sitzung besteht aus sechs solchen Runden (etwa 70–100 s). Das Tempo passt sich an: nach einer fehlerfreien Runde wird es etwas schneller, nach einem Fehler deutlich langsamer (Ziel: etwa drei von vier Runden fehlerfrei). Das Verfahren heißt Multiple Object Tracking (MOT, „Verfolgen mehrerer Objekte“); es zeigt, wie viele Objekte man gleichzeitig nur anhand ihrer Bewegung im Blick behalten kann. Es geht um verteilte Aufmerksamkeit, nicht um Sehschärfe.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Seiten-Chunk plus gemeinsamer Chunk `532-…js`, Stand 29.09.2026) sowie `docs/skilldrills-analyse.md`, Abschnitt 6. Nur Mechanik ausgewertet, kein Code übernommen. Sehwinkel sind eigene Rechnungen (36–40 px/° bei Tablet 40 cm bzw. Desktop 60 cm, `docs/wissenschaft/02`, Abschnitt 4).

- **Ablauf (Code):** Start, Countdown, dann **ein einziger Durchgang**: MEMORIZE 2 s (3 Ziele in Grün #10b981, alle anderen fast schwarz #1f1f2e auf #050508/#080811, also kaum sichtbar), TRACKING **60 s** (alle Kugeln hell #e2e8f0), IDENTIFY ohne Zeitlimit, dann Auflösung 2,5 s und Ergebnisseite. Die 60 s laufen als Sekundentakt herunter.
- **Anzahl und Größe (Code):** Kugeln = 8 + ⌊Bestwert ÷ 30⌋, Deckel 20. Da der Punktebestwert höchstens 60 beträgt, sind es **real 8 bis höchstens 10 Kugeln**; der Deckel 20 wird nie erreicht. **Immer genau 3 Ziele.** Radius 12 px bei Breite unter 768 px, sonst 22 px (Ø 44 px ≈ 1,1–1,2°). Startposition und Richtung zufällig.
- **Bewegung (Code):** Gleichmäßige Geradeausbewegung mit Wandreflexion, Schrittweite 60 × (5 + Bestwert ÷ 30) × dt, also **300 px/s bis höchstens 420 px/s** (≈ 8–12°/s). Alle Kugeln gleich schnell. Bei Kontakt werden die Kugeln auseinandergeschoben und tauschen die Bewegungskomponente (elastischer Stoß gleicher Massen). Es gibt keine Verdeckung und keine Richtungsänderung außer durch Stöße. Die Bewegung ist zeitbasiert (dt), also bildfrequenzunabhängig; die Größe des Spielfelds folgt dem Bildschirm, das Tempo in px/s aber nicht.
- **Eingabe (Code):** Klick oder Tipp auf das Canvas (`touch-action: none`). Trefferradius Kugelradius + 20 px. Antippen wählt an, erneutes Antippen ab, höchstens 3 gleichzeitig; „Bestätigen“ beendet den Durchgang. Liegen Kugeln nebeneinander, kann ein Tipp mehrere zugleich treffen.
- **Wertung (Code):** 20 Punkte je richtig gewähltem Ziel (0/20/40/60), **keine Strafe** für falsche Wahl. Note aus √(Punkte ÷ 60): 0 = F, 20 ≈ C (58 %), 40 ≈ A (82 %), 60 = S+ (eigene Rechnung nach der Notenformel). Gespeichert wird nur der Bestwert (localStorage). Der Bestwert steuert Kugelzahl und Tempo der nächsten Sitzung, nicht die aktuelle Leistung.
- **Zufallstreffer (eigene Rechnung):** Bei blindem Tippen liegt der Erwartungswert bei 1,1 (8 Kugeln) bzw. 0,9 (10 Kugeln) richtigen Zielen; alle drei richtig: 1/56 (1,8 %) bzw. 1/120 (0,8 %).
- **Widersprüche Regeltext ↔ Code:** (1) Die Tabelle nennt 5–6 Ziele als „Weltklasse“, der Code kennt immer nur 3 Ziele; die Trefferquote hat nur die Stufen 0/33/67/100 %, die Stufen der Tabelle sind im Spiel also gar nicht erreichbar. (2) „Blinkende Zielkugeln“ (Schritt 1): Die Ziele sind 2 s lang dauerhaft grün. (3) „Dynamic Speed“ und Kugelzahl bis 20: Beides hängt nur vom Bestwert ab und erreicht real höchstens 420 px/s und 10 Kugeln. (4) Der Tipp „Schwerpunkt fixieren“ wird nicht unterstützt (kein Fixationspunkt, die Mitte ist leer). (5) Die Website nennt „millisekundengenaue“ Steuerung der Kreuzungsfrequenz; der Code steuert nur Kugelzahl und Tempo, Kreuzungen ergeben sich zufällig.

## 3. Was die Website sagt – und wie das einzuordnen ist

**Aussagen:** MOT „zwinge das Gehirn“, mehrere identische bewegte Objekte zu verfolgen; die meisten Menschen könnten 4–5 Ziele, die Grenze sei „attentional, nicht optisch“. Eine „Schwerpunkt-Strategie“ (Blick auf das Zentrum der Zielgruppe) sei die Strategie der Elite, das linke und rechte Halbfeld arbeiteten unabhängig („Hemifield Independence“). Regelmäßiges Training „beseitige zuverlässig den Tunnelblick“, verbessere Spielübersicht im Teamsport, Situationsbewusstsein in Shootern und Gefahrenerkennung im Straßenverkehr; 5–6 Ziele schafften Profis. Zielgruppen: E-Sportler, Teamsportler, Piloten, Fluglotsen. Empfohlen werden 10–15 min an 4–5 Tagen pro Woche. Eine Tabelle ordnet Zielzahl, Tempo und Trefferquote den Rängen Top 1 % bis Einsteiger zu.

**Belegt:** Menschen verfolgen parallel bis zu ≈ 4–5 Objekte (Pylyshyn & Storm, 1988); die Grenze liegt in der Aufmerksamkeit statt im Auge (Überblicksarbeit Cavanagh & Alvarez, 2005; im Abstract nur indirekt, gestützt zusätzlich durch Alvarez & Franconeri, 2007); die Halbfelder haben weitgehend getrennte Ressourcen, doppelt so viele Ziele bei Verteilung auf beide Hälften (Alvarez & Cavanagh, 2005 – die Website nennt in der Quellenliste das falsche Paper von 2004); Blick im Zentrum der Ziele ist häufig und hilfreich (Fehd & Seiffert, 2008, 2010); Action-Spieler verfolgen ≈ 2 Objekte mehr (Green & Bavelier, 2006).

**Überzogen oder falsch:** (a) Perzentiltabelle „Top 1 %/5 %/25 %“ hat keine Datengrundlage; die zitierten Arbeiten enthalten solche Normen nicht, und die Website sagt selbst, sie erhebe keine Leistungsdaten. (b) Die Schwerpunkt-Strategie stammt nicht aus Green & Bavelier oder Faubert, sondern aus Fehd & Seiffert; ein vorgeschriebenes Blickmuster verschlechtert die Leistung (Fehd & Seiffert, 2010, so berichtet bei Vater et al., 2021). (c) „Beseitigt zuverlässig den Tunnelblick“, „schärft die Gefahrenerkennung im Straßenverkehr“, „erweitert das periphere Sehen“, „synaptische Plastizität“: nicht belegt; Metaanalysen finden für Videospiel- und Gehirntraining kaum Ferntransfer (Simons et al., 2016; Sala et al., 2018). (d) „Profis trainiert 5–6 Ziele“ und Faubert (2013): gemessen wurden Lernkurven in stereoskopischem 3D-MOT, nicht Zielzahlen in einem 2D-Browserspiel. (e) Hirnregionen (IPS, FEF, Colliculus superior) stehen nicht im zitierten Abstract; fMRT-Belege für IPS/FEF/MT bei Tracking: Culham et al. (1998). (f) Woods et al. (2015) behandelt einfache Reaktionszeit und ist hier keine Quelle. (g) „Speichert visuelles Arbeitsgedächtnis“ ist verkürzt: MOT hängt an räumlicher Aufmerksamkeit; die Halbfeld-Spezifität spricht gegen eine reine Arbeitsgedächtnis-Überlastung (Vater et al., 2021).

## 4. Optische und okulomotorische Grundlagen

- **Kein Detailsehen nötig:** Kugeln von ≈ 2,3° Durchmesser (Tablet quer, 40 cm) sind auch mit reduziertem Visus gut erkennbar; entscheidend sind Position und Bewegung. Die Ziele leuchten in Bernstein, die Auflösung nutzt zusätzlich Form (Häkchen, Kreuz, gestrichelter Ring); eine Rot-Grün-Schwäche (≈ 8 % der Männer; Birch, 2012) stört daher kaum.
- **Kapazität hängt von Tempo und Abstand ab:** Bei langsamer Bewegung bis ≈ 8 Objekte, bei sehr schneller nur eines; schon von 1 auf 2 Ziele sinkt die Grenzgeschwindigkeit um ≈ 30 % (Alvarez & Franconeri, 2007). Die meisten Fehler entstehen bei Annäherung von Ziel und Ablenker auf unter 4° (Bae & Flombaum, 2012). Deshalb drehen sich nahe Kugeln sanft voneinander weg, statt zu stoßen.
- **Augenbewegungen:** Sakkaden haben ≈ 200 ms Latenz und unterdrücken die Wahrnehmung; MOT gelingt aber auch mit Fixation. In Studien liegt der Blick oft nahe dem Zentrum des Zieldreiecks und wechselt zwischen Zentrum und Zielen (Fehd & Seiffert, 2008, 2010). Glatte Blickfolge wird nicht verlangt und ist bei mehreren Zielen nicht möglich. In der Praxis der funktionellen Optometrie wird bei Verfolgungsübungen ausdrücklich betont, die Umgebung weiter wahrzunehmen, während man sich auf das Ziel konzentriert (Praxisangabe, nicht belegt); das deckt sich mit dem Blick in die Mitte der Gruppe.
- **Sehwinkel und Feld:** Das Tablet-Spielfeld ist ≈ 25–37° breit, das Tempo reicht von ≈ 3°/s (Stufe 1) bis rechnerisch ≈ 30°/s (Stufe 25; 12 Einheiten/s ≈ 3°/s). Eigene Rechnung, nur für das iPad in 40 cm gültig.
- **Gesichtsfeld:** Ausfälle entstehen je nach Ort der Schädigung entlang der Sehbahn: vor der Kreuzung meist einäugig, an der Kreuzung ungleichseitige, dahinter gleichseitige Halbseitenausfälle (Muchnick, 2008, S. 32). Kugeln im Ausfallbereich sind nicht sichtbar; das ist kein Übungsfehler, und unklare Ausfälle gehören augenärztlich abgeklärt.
- **Brille:** Wegen des breiten Feldes wandern Kugeln durch die seitlichen, unscharfen Bereiche einer Gleitsichtbrille; neue Gleitsichtträger:innen zeigten in einer kleinen Studie (n = 10) veränderte Augen-/Kopfbewegungsstrategien (Hutchings et al., 2007; Blitz- und Leseaufgaben, nicht MOT). Mehr Kopfbewegung ist bei diesem Feld plausibel, für diese Übung aber nicht untersucht; sie kann die Leistung bremsen und ist kein Fehler der Person. Arbeitsplatzbrille für den Bildschirmabstand, Bildschirm auf Augenhöhe. Presbyope halten Geräte weiter weg (Boccardo et al., 2023): Kugeln erscheinen kleiner und (bei gleichem Tempo in Pixeln) langsamer in Grad; die Studie betraf Smartphones, nicht Tablets. Presbyopie beginnt um ≈ 40 Jahre (Charman, 2008).
- **Trockenes Auge:** Beim Verfolgen wird selten geblinzelt; Bildschirmarbeit senkt die Lidschlagrate deutlich (Patel et al., 1991). Sechs Runden mit je 6 s Verfolgen sind unkritisch, längere Serien nicht ohne Pause.

## 5. Neurowissenschaftliche Grundlagen

Tracking unter Fixation aktiviert ein fronto-parietales Netz: Sulcus intraparietalis und oberer Parietalkortex, frontale Augenfelder (FEF) und den Bewegungskomplex MT+. In frühen visuellen Arealen fand sich dabei keine Verstärkung durch Aufmerksamkeit, im parietalen und frontalen Kortex mehr als eine Verdopplung des Signals bei Verfolgen von 3 von 9 Kugeln (Culham et al., 1998). Damit sind IPS, FEF und MT belegt; eine Beteiligung des Colliculus superior ist in der Übersicht von Cavanagh & Alvarez (2005) nicht gezeigt. Das Modell der „visuellen Zeiger“ (FINST) erklärt Kapazität und Parallelität (Pylyshyn & Storm, 1988). Die Halbfeld-Unabhängigkeit bedeutet, dass jede Hemisphäre (für das gegenüberliegende Halbfeld) eine eigene Ressource beisteuert (Alvarez & Cavanagh, 2005). Aussagen wie „trainiert den parietalen Kortex“ sind nicht belegt; gemessen wurde nur Aktivierung bei der Aufgabe, keine Trainingsänderung. Ältere sind bei langer Trackingdauer und hohem Tempo besonders beeinträchtigt (Sekuler et al., 2008); Videospielerfahrung hilft Jüngeren.

## 6. Motorische Grundlagen

Motorisch ist die Übung anspruchslos: einmal pro Ziel auf eine ruhende Stelle tippen oder klicken. Dabei zählt die Genauigkeit, nicht das Tempo. Auge-Hand-Koordination und Fitts'sches Gesetz spielen eine Nebenrolle. Ein Zeitdruck besteht nur im Tracking (Tempo vorgegeben), nicht beim Antippen. Bei Touch sind Verdeckung der Kugeln durch die Hand und Doppeltipps möglich; Doppeltipps unter 250 ms werden ignoriert. Die Latenz von Maus und Touchscreen ist unkritisch, weil es nur um ruhende Ziele geht.

## 7. Einflussfaktoren und Messgrenzen

- **Wenige mögliche Ergebnisse je Runde:** Eine Runde ist gelungen, wenn alle drei Ziele richtig gewählt sind. Zufallstreffer sind möglich (bei 8 Kugeln alle drei richtig: 1/56 = 1,8 %). Tempo-Schwellen aus Studien brauchen viele Durchgänge (Faubert, 2013: ca. 20 pro Sitzung; Legault et al., 2013: Treppenverfahren mit 8 Umkehrpunkten); die erreichte Stufe nach sechs Runden ist daher nur eine grobe Schätzung. Messungen am Menschen streuen stärker als an Prüfkörpern, darum zählt der Verlauf über mehrere Sitzungen, nicht ein Einzelwert (Mountford et al., 2004, S. 43–44).
- **Dauer:** Studien nutzen 6–10 s Tracking (Alvarez & Franconeri, 2007: 6 s; Faubert, 2013: 8 s); die Übung nutzt 6 s, damit die Kapazität gemessen wird und nicht das Durchhalten.
- **Tempo in Einheiten:** Spielfeldgröße, Bildschirmdiagonale und Betrachtungsabstand verändern das Tempo in Grad und die Zahl enger Begegnungen; Ergebnisse sind zwischen Geräten nicht vergleichbar.
- **Alter, Müdigkeit, Übung:** Ältere sind schlechter bei hohem Tempo und langer Dauer (Sekuler et al., 2008), lernen aber gleich gut (Legault et al., 2013). Ein Tageswert schwankt mit der Konzentration; ein einzelner Durchgang ist kein Maß für die „Sehleistung“.
- **Strategie:** Der Zentrumsblick kann helfen, muss aber nicht; er wird angeboten, nicht erzwungen, und das Blickverhalten wird nicht gemessen.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt: stark.** MOT-Leistung steigt schnell und deutlich, auch bei Älteren (64–73 J.), die in 5 Wochen 3D-MOT ähnlich viel gewannen wie Junge (Legault et al., 2013). Profisportler lernen 3D-MOT steiler als Amateure und Studierende (Faubert, 2013, n = 308); Actionspieler verfolgen etwa zwei Objekte mehr (Green & Bavelier, 2006). Das ist Querschnitt; Ursache (Auslese oder Training) unklar.
- **Naher Transfer: schwach.** Einzelne Studien fanden Verbesserungen in Aufmerksamkeitstests, andere nicht; Effekte hängen stark von der Ähnlichkeit zwischen Übung und Test ab (Guo et al., 2025: Aufmerksamkeit SMD 1,65 bei ähnlicher, 0,07 bei unähnlicher Aufgabe). Videospiel-Interventionen zeigen kleine Effekte mit Publikationsbias (g = 0,34; Bediou et al., 2018) oder kaum Effekte (Sala et al., 2018).
- **Alltagstransfer: fehlend.** Ein kritischer Review fand 16 Interventionsstudien, nur 10 mit Kontrolle und Transfermaß, keine präregistriert, von drei praxisnahen Studien zwei ohne Effekt (Vater et al., 2021). Eine Nachfolgestudie im Fußball (62 Spieler) fand nach MOT-Verbesserung keinen Nah- oder Ferntransfer (Romeas et al., 2025), während eine frühere kleine Studie Passentscheidungen verbessert sah (Romeas et al., 2016). Für reales Fahren gibt es nur Korrelationen und einen Pilot mit Trend im Simulator. Die Studien nutzten stereoskopisches 3D auf großen Bildschirmen (≈ 42–46°); die Übertragbarkeit auf ein 2D-Tablet ist ungeprüft.
- **Dosierung:** Für computergestütztes Training bei Älteren zeigten sich mehr als 3 Einheiten pro Woche und unbetreutes Heimtraining ohne Zusatznutzen (Lampit et al., 2014; g = 0,22 insgesamt). Für 4–5 Trainingstage pro Woche gibt es keine Datenbasis.

## 9. Auswahlhinweise für die KI

- **Passt, wenn** das Ziel „mehrere bewegte Dinge gleichzeitig im Blick behalten“, „kurze Konzentration“ oder „Aufmerksamkeitsübung ohne Lesen und Farbnamen“ lautet; Kund:innen jedes Alters, besonders Ältere und Einsteiger (kleine Runden, adaptives Tempo). Profil-Kern: geteilte und Daueraufmerksamkeit.
- **Weniger passend, wenn** glatte Blickfolge, Sakkaden, Reaktionszeit, feine Sehschärfe oder Stereosehen gemeint sind (Werte 0–1). Auch nicht bei Wunsch nach bewiesenem Fahr- oder Sporttransfer.
- **Vorsicht / anpassen bei** kognitiven Einschränkungen und Aufmerksamkeitsproblemen (Überforderung; leichte Stufe wählen); Gesichtsfeldausfall (Ziele im Ausfallbereich sind nicht sichtbar); Farbsehschwäche (Ziele nur farbig markiert; Auflösung auch mit Formen) und Schwindelneigung (viele bewegte Objekte, kurze Pausen); Gleitsicht/Presbyopie (seitliche Unschärfe, mehr Kopfbewegung; Bildschirm aus Nahbereich, ggf. Arbeitsplatzbrille); trockenem Auge und niedrigem Visus (Pausen, größere Kugeln, gute Beleuchtung ohne Spiegelung). Das sind Auswahlhinweise, keine medizinischen Aussagen.
- **Abklärung vor dem Üben:** Doppelbilder, plötzlicher einseitiger Sehverlust, Lichtblitze, neue Schleier, Kopfschmerz mit Sehverschlechterung, Schwindel oder Zittern gehören ärztlich abgeklärt; sie sind kein Anlass zum Üben (Muchnick, 2008, S. 6, 28).
- **Kombiniert gut mit** 105 (glatte Blickfolge, ergänzt die Einzelverfolgung), 408 und 205/206 (geteilte Aufmerksamkeit), 605 (räumliches Gedächtnis).
- Keine Diagnosen, keine Heil- oder Leistungsversprechen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

**Schwächen des Originals:** Nur ein Durchgang, keine Rohdaten, Schwierigkeit nur aus dem Bestwert; 60 s Tracking statt 6–10 s; harte elastische Stöße mit vielen Beinahe-Kollisionen; Regeltext (5–6 Ziele, 20 Kugeln, „blinkende“ Ziele) passt nicht zum Code; Perzentiltabelle ohne Datengrundlage; Spielfeld und Tempo in px, also geräteabhängig; englische Beschriftungen in Teilen; Nicht-Ziele in der Merkphase fast unsichtbar; kein Fixationspunkt trotz Tipp; Trefferfeld r + 20 px kann bei dichtem Gedränge mehrere Kugeln greifen.

**Blickfit „Kugel-Detektiv“ (Code-Kopfkommentar und `texts.ts`):**
- 6 Runden je: Zeigen 0,5 s, Markieren 2 s (Ziele in Bernstein #F59E0B), Überblenden 0,4 s, Verfolgen **6 s** (verkürzt auf 2,5 s im Schnellmodus), Auswahl (ohne Zeitlimit, nach dem 3. Tipp sofort Auflösung), Auflösung 1,6 s. Etwa 70–100 s je Sitzung.
- 8 Kugeln, 3 Ziele; Kugelradius mindestens 20 px, sonst 4,6 Einheiten (≈ 1,2° Radius, Ø ≈ 2,3° bei iPad/40 cm; eigene Rechnung); Tempo Stufe 1 = 12 Einheiten/s (≈ 3°/s), je Stufe ×1,1, bis Stufe 25.
- Gewichtete Treppe (Kaernbach): nach fehlerfreier Runde +0,6, nach Fehler −1,8, Gleichgewicht bei ≈ 75 % fehlerfreien Runden; Start aus der letzten Sitzung. Erfolg heißt alle 3 richtig.
- Bewegung zeitbasiert mit Teilschritten (60- und 120-Hz gleich schnell); weiche Richtungsschwankung (0,6 rad/s) und **weiche Abstoßung** ab 2,5 Durchmessern statt harter Stöße; alle Kugeln gleich schnell und in gleicher Zeichenreihenfolge, sodass sich Ziele nicht verraten.
- Fixationspunkt in der Mitte; Text „Blick in die Mitte“ als Angebot, nicht erzwungen (passend zu Fehd & Seiffert, 2010: vorgeschriebener Blickort schadet).
- Auflösung mit Häkchen, Kreuz und gestricheltem Ring statt nur Rot/Grün (farbsehschwächefreundlich); Doppeltipp-Schutz 250 ms; Punkte = Treffer × 10 × 1,1^(Stufe−1), Ergebnis: Stufe (Schwelle), fehlerfreie Runden, Trefferanteil, höchste Stufe.
- Texte behaupten keinen Transfer („Ob sich das auf Straßenverkehr oder Sport überträgt, ist nicht belegt“).

**Empfehlungen:** Zielzahl (3–5) und Kugelzahl als Stufenparameter zusätzlich zum Tempo anbieten; Halbfeld-Verteilung der Ziele protokollieren; Mindestabstand-Statistik der Begegnungen speichern; Helligkeit und Kontrast der Kugeln für Ältere/niedrigen Visus einstellbar machen; Hinweis auf Abstand, Bildschirmhöhe, Pausen; Ergebnisse als Verlauf, nicht als Rang; Gerät und Abstand für Vergleiche erfassen.

## 11. Quellen

### Von der Website angegeben
- Pylyshyn, Z. W., & Storm, R. W. (1988). Tracking multiple independent targets: Evidence for a parallel tracking mechanism. *Spatial Vision, 3*(3), 179–197. https://doi.org/10.1163/156856888X00122 – **Prüfung:** DOI stimmt ✓ (Crossref, Abstract); **stützt die Aussage der Website:** ja (bis 5 von 10 Objekte, 87 % richtig, serielles Abtasten ≈ 40 %; „fällt danach scharf ab“ verkürzt, Kapazität hängt vom Tempo ab).
- Cavanagh, P., & Alvarez, G. A. (2005). Tracking multiple targets with multifocal attention. *Trends in Cognitive Sciences, 9*(7), 349–354. https://doi.org/10.1016/j.tics.2005.05.009 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Aufmerksamkeitsgrenze, ≥ 4 Ziele, Halbfelder ja; „fMRT belegt IPS, FEF, Colliculus“ steht nicht im Abstract).
- Alvarez, G. A., & Cavanagh, P. (2004). The capacity of visual short-term memory is set both by visual information load and by number of objects. *Psychological Science, 15*(2), 106–111. https://doi.org/10.1111/j.0963-7214.2004.01502006.x – **Prüfung:** DOI stimmt ✓; **stützt:** nein (Kapazität des Kurzzeitgedächtnisses, nicht Halbfeld-Unabhängigkeit; richtig wäre Alvarez & Cavanagh, 2005, unten; der FAQ-Text nennt korrekt „2005“, die Quellenliste das falsche Paper).
- Green, C. S., & Bavelier, D. (2006). Enumeration versus multiple object tracking: The case of action video game players. *Cognition, 101*(1), 217–245 (mit Erratum 2020). https://doi.org/10.1016/j.cognition.2005.10.004 – **Prüfung:** Website-DOI falsch (…10.005 gehört zu einer anderen Arbeit; richtig …10.004 ✓); **stützt:** teilweise (Actionspieler verfolgen ≈ 2 Objekte mehr; Schwerpunkt-Strategie steht dort nicht).
- Faubert, J. (2013). Professional athletes have extraordinary skills for rapidly learning complex and neutral dynamic visual scenes. *Scientific Reports, 3*, 1154. https://doi.org/10.1038/srep01154 – **Prüfung:** DOI stimmt ✓, Website-Titel falsch („…and dynamic visual scenes and the ability to adapt…“); **stützt:** teilweise (Profis lernen 3D-MOT steiler; „5–6 Ziele“, Übertragung auf 2D-Spiel und Tunnelblick nicht belegt).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (einfache Reaktionszeit, kein Bezug zu MOT).

### Weitere Fachliteratur
- Alvarez, G. A., & Cavanagh, P. (2005). Independent resources for attentional tracking in the left and right visual hemifields. *Psychological Science, 16*(8), 637–643. https://doi.org/10.1111/j.1467-9280.2005.01587.x – Halbfeld-Unabhängigkeit.
- Alvarez, G. A., & Franconeri, S. L. (2007). How many objects can you track? Evidence for a resource-limited attentive tracking mechanism. *Journal of Vision, 7*(13), 14. https://doi.org/10.1167/7.13.14 – Kapazität abhängig vom Tempo.
- Culham, J. C., Brandt, S. A., Cavanagh, P., Kanwisher, N. G., Dale, A. M., & Tootell, R. B. H. (1998). Cortical fMRI activation produced by attentive tracking of moving targets. *Journal of Neurophysiology, 80*(5), 2657–2670. https://doi.org/10.1152/jn.1998.80.5.2657 – fronto-parietales Netz.
- Fehd, H. M., & Seiffert, A. E. (2008). Eye movements during multiple object tracking: Where do participants look? *Cognition, 108*(1), 201–209. https://doi.org/10.1016/j.cognition.2007.11.008 – Zentrumsblick.
- Fehd, H. M., & Seiffert, A. E. (2010). Looking at the center of the targets helps multiple object tracking. *Journal of Vision, 10*(4), 19. https://doi.org/10.1167/10.4.19 – Zentrumsblick verbessert Leistung.
- Bae, G. Y., & Flombaum, J. I. (2012). Close encounters of the distracting kind: Identifying the cause of visual tracking errors. *Attention, Perception, & Psychophysics, 74*(4), 703–715. https://doi.org/10.3758/s13414-011-0260-1 – Fehlerursache enge Begegnungen.
- Sekuler, R., McLaughlin, C., & Yotsumoto, Y. (2008). Age-related changes in attentional tracking of multiple moving objects. *Perception, 37*(6), 867–876. https://doi.org/10.1068/p5923 – Alterseffekt.
- Legault, I., Allard, R., & Faubert, J. (2013). Healthy older observers show equivalent perceptual-cognitive training benefits to young adults for multiple object tracking. *Frontiers in Psychology, 4*, 323. https://doi.org/10.3389/fpsyg.2013.00323 – Lernen im Alter.
- Vater, C., Gray, R., & Holcombe, A. O. (2021). A critical systematic review of the Neurotracker perceptual-cognitive training tool. *Psychonomic Bulletin & Review, 28*(5), 1458–1483. https://doi.org/10.3758/s13423-021-01892-2 – kritischer Review, Transfer.
- Romeas, T., Goujat, M., Faubert, J., & Labbé, D. (2025). No transfer of 3D-Multiple Object Tracking training on game performance in soccer: A follow-up study. *Psychology of Sport and Exercise, 76*, 102770. https://doi.org/10.1016/j.psychsport.2024.102770 – kein Sporttransfer.
- Romeas, T., Guldner, A., & Faubert, J. (2016). 3D-Multiple Object Tracking training task improves passing decision-making accuracy in soccer players. *Psychology of Sport and Exercise, 22*, 1–9. https://doi.org/10.1016/j.psychsport.2015.06.002 – frühere kleine positive Studie.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the „learning effect“ caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Transfer nur bei ähnlichen Aufgaben.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do „brain-training“ programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Gehirntraining.
- Bediou, B., Adams, D. M., Mayer, R. E., Tipton, E., Green, C. S., & Bavelier, D. (2018). Meta-analysis of action video game impact on perceptual, attentional, and cognitive skills. *Psychological Bulletin, 144*(1), 77–110. https://doi.org/10.1037/bul0000130 – g = 0,34.
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – kaum Ferntransfer.
- Lampit, A., Hallock, H., & Valenzuela, M. (2014). Computerized cognitive training in cognitively healthy older adults: A systematic review and meta-analysis of effect modifiers. *PLoS Medicine, 11*(11), e1001756. https://doi.org/10.1371/journal.pmed.1001756 – Dosierung bei Älteren.
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., & Wells, K. A. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Gleitsicht, Kopfbewegung.
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry, 91*(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Presbyopie ab ≈ 40 J.
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm.
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Rot-Grün-Farbsehschwäche (8 % der Männer).
- Boccardo, L., Gurioli, M., & Grasso, P. A. (2023). Viewing distance and character size in the use of smartphones across the lifespan. *PLoS ONE, 18*(4), e0282947. https://doi.org/10.1371/journal.pone.0282947 – Betrachtungsabstand bei Presbyopie.
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28), Prüfung der Augenfolgebewegungen (S. 32–35), Gesichtsfeldausfälle nach Sehbahnverlauf (S. 32).
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Genauigkeit und Wiederholbarkeit von Messungen am Menschen, Mehrfachmessung (S. 17–18, 24, 43–44).
