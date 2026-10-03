---
# ===== Kennung =====
nr: 414
kennung: momentum-teleport-pursuit
name: "Sprungziel – nach einem Positionssprung wiederfinden und weiter verfolgen"
name_original: "Sprungziel wiederfinden – Blicksprung und anschließende Blickverfolgung (Seitentitel: Sprungziel | Blickverfolgung; engl. Momentum Teleport Pursuit)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/momentum-teleport-pursuit"
blickfit_umsetzung: {kennung: "sprungziel", name: "Sprungziel", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/sprungziel/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Eine helle Kugel läuft gleichmäßig über den Bildschirm, blendet in unregelmäßigen Abständen weich aus und taucht an einem anderen Ort weich wieder auf, wo sie mit gleicher Richtung und gleichem Tempo weiterläuft. Man findet sie mit einem Blicksprung wieder und folgt ihr dann gleichmäßig. Kurz nach dem Auftauchen erscheint in ihr ein Landolt-Ring, dessen Öffnungsrichtung man über einen großen Button meldet. Sprungweite, Zeit bis zum Zeichen und Tempo passen sich an. Gemessen wird nur das Erkennen des Zeichens."
ziel_funktionen: [sakkaden, blickfolge]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 60
schwierigkeit_anpassung: "Kein Levelsystem, nur manuelle Einstellungen: Tempo 0,5–9× (wirkt linear auf die Geschwindigkeit, 1× ≈ 9–16°/s am 24-Zoll-Monitor in 60 cm, und verkürzt zugleich den Sprungtakt auf 1 200 ms ÷ Tempo), Zielgröße (Standard 16 px Radius), Dauer 30/45/60/90/120 s, 'Random Speed' (Tempo schwankt 0,4- bis 1,9-fach, Sprünge unregelmäßig alle ≈ 0,6–1,1 s bei 1×), 'Hide Line' (Richtungslinie aus)."
messgroessen: ["Original: keine Leistungsmessung, nur Sitzungszähler", "sinnvoll mit Eyetracker: Latenz und Landefehler der Sakkade nach dem Sprung, Zahl der Korrektursakkaden, Zeit bis zur stabilen Folge, Folge-Gain nach der Landung", "sinnvoll ohne Eyetracker: kurzes Sehzeichen im Ziel 250–500 ms nach dem Sprung (Landolt-Ring), Anteil richtig je Tempo in °/s und je Sprungweite"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 1
    blickfolge: 3
    sakkaden: 3
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 1
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
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["30–120 s ohne Unterbrechung auf den Bildschirm schauen können", "ruhige Sitzposition: Monitor 50–70 cm, Tablet auf Ständer ca. 40 cm, Querformat", "passende Korrektion für den Bildschirmabstand (bei Alterssichtigkeit Zwischen- bzw. Nahkorrektur, möglichst Arbeitsplatzbrille)", "Gesichtsfeld über die ganze Bildschirmfläche nutzbar (Sprünge an beliebige Orte)", "kein Farbsehen nötig (Zielfarbe frei wählbar)", "keine Hand-Eingabe während der Übung (nur Start per Klick/Tipp)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, nystagmus, schwindel_vestibulaer, gesichtsfeldausfall, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, kinder_unter_6]
geeignet_fuer: ["Wechsel aus Blicksprung und anschließender glatter Blickfolge üben (in niedrigen bis mittleren Stufen)", "Steigerung nach gleichförmiger Folge (412 = dieselbe Bewegung ohne Sprünge, 404); eigener Zweig neben den Richtungswechsel-Übungen 415 → 410 → 411", "rein visuelles Aufwärmen vor Zielwechsel- oder Tracking-Übungen", "Personen, die für eine Übung keine Hand-Zielbewegung einsetzen können oder wollen (nur Antworttipp)"]
weniger_geeignet_fuer: ["wer eine Messung der Augenbewegung erwartet – geprüft wird nur das Erkennen des Zeichens", "Übungsziel Auge-Hand-Koordination oder Zielwechsel mit der Hand (dafür 104, 105, 502, 505)", "Gleitsichtträger:innen im Vollbild bei streng ruhigem Kopf (Sprünge führen oft in seitliche Unschärfezonen)", "Menschen mit Gesichtsfeldeinschränkung (Ziel taucht im nicht gesehenen Bereich wieder auf)", "Einsteiger:innen und Ältere auf hohen Stufen (kaum noch Zeit für ruhige Folge)", "Kinder, die abstrakte Aufgaben nicht durchhalten"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: fehlend
  alltag_transfer: fehlend
  kommentar: "Die Übung selbst wurde nie untersucht; die Grundlagen (Sakkaden auf bewegte Ziele, Übergang in die Folgebewegung) sind im Labor gut beschrieben, Folgebewegung ist dort in wenigen Sitzungen trainierbar, mit Belohnung für genaues Folgen deutlich stärker als ohne (Madelain & Krauzlis 2003; Eibenberger et al. 2012) – ohne Blickmessung ist ein Übungseffekt nur plausibel, ein Nutzen für Sport, Bildschirmspiele oder Alltag nicht belegt."
aehnliche_uebungen: [412, 410, 415, 411, 409, 407, 404, 303, 401, 501, 502, 508]
stichworte: ["Positionssprung", "Step-Ramp", "sakkadische Wiederaufnahme", "Sakkade auf bewegtes Ziel", "smooth pursuit", "Aufholsakkaden", "Geschwindigkeitsgedächtnis", "Teleport", "Blickverfolgung", "rein visuell", "ohne Eingabe"]
---

# 414 · Sprungziel – nach einem Positionssprung wiederfinden und weiter verfolgen

> Original: „Sprungziel wiederfinden – Blicksprung und anschließende Blickverfolgung“ (Seitentitel „Sprungziel | Blickverfolgung“, engl. „Momentum Teleport Pursuit“) – skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch nicht umgesetzt (verwandt: `scharf-in-bewegung`, `zielfang`).

## 1. Kurzbeschreibung

Eine helle Kugel läuft gleichmäßig über den Bildschirm. In unregelmäßigen Abständen blendet sie weich aus und taucht an einem anderen Ort weich wieder auf; dort läuft sie mit derselben Richtung und demselben Tempo weiter. Man folgt ihr nur mit den Augen: auf der Strecke gleichmäßig mitgehen, nach dem Auftauchen mit einem Blicksprung zur neuen Stelle und sofort wieder mitgleiten. Kurz nach dem Auftauchen erscheint in der Kugel ein Landolt-Ring („C“), den man nur erkennt, wenn man sie rechtzeitig wiedergefunden hat; man meldet über einen großen Button unten, wohin die Öffnung zeigt. Sprungweite, die Zeit bis zum Zeichen, Tempo und Zeichengröße steigen in Stufen und passen sich über die 14 Durchgänge einer Runde an das Ergebnis an. Gemessen wird nur, ob das Zeichen erkannt wird, nicht, ob die Augen tatsächlich springen.

## 2. Ablauf im Original (Analyse)

Grundlage: Seitentext und Spielcode (seitenspezifischer Chunk `88915-…js` plus gemeinsame Module für Einstellungen, Zielzeichnung und Bildtakt, geprüft 29.09.2026; nur Mechanik übernommen). Winkel sind **eigene Umrechnungen** für 24-Zoll-Full-HD in 60 cm (≈ 38 px/°) bzw. 11-Zoll-Tablet in 40 cm (≈ 36 CSS-px/°); Sprungweiten und Sprungraten aus eigener Simulation der Code-Logik.

- **Ablauf (Code):** Einstellungen → Start → Vollbild → Countdown 3-2-1-GO (≈ 2,45 s, mit Tönen) → Übung mit Restzeit → Endbildschirm „Smooth Pursuit Calibrated“ (kalibriert wird nichts). Escape oder Verlassen des Vollbilds bricht ab. Gespeichert wird nur ein Sitzungszähler im Browser.
- **Darstellung (Code):** Hintergrund #050508 mit 40-px-Raster (2 % Deckkraft; „Day Mode“ weiß). Ziel wie in 410 (Radius 16 px, Scheibe Ø ≈ 26 px, Ring Ø 32 px, Leuchtschein „Neon Glow“), Standardfarbe Rot #ef4444, wählbar Grün, Blau, Orange, Gelb, Weiß. Eine blasse Linie (25 % Deckkraft) zeigt in die aktuelle Bewegungsrichtung, Länge 6 Bewegungsschritte (≈ 100 ms Vorausschau bei 1×).
- **Bewegung (Code):** Start in der Mitte, je Achse 4–7 px pro 16 ms mit zufälligem Vorzeichen → Betrag 355–618 px/s (Mittel ≈ 490 px/s) ≈ **9–16°/s** bei 1× (Tablet ≈ 10–17°/s). Randabprall ohne Tempoänderung. Bewegung ist zeitbasiert, Tempo wirkt **linear**.
- **Sprung (Code):** Ein Zeitzähler läuft mit Echtzeit × Tempo; ab 1 200 wird das Ziel an einen gleichverteilt zufälligen Ort gesetzt (mindestens zwei Radien vom Rand), Geschwindigkeitsvektor unverändert. Kein Ausblenden, kein Aufblitzen, keine Vorwarnung – aber ein **strenger Takt**. Die Richtungslinie zeigt am neuen Ort sofort die (alte) Richtung.
- **Sprungweite (Simulation):** Vollbild 24 Zoll: Mittel ≈ 20° (10–90 %: 7–36°, maximal ≈ 55° bei linearer Umrechnung mit 38 px/°; als echter Sehwinkel über die Bilddiagonale ≈ 50°); iPad 11 Zoll in 40 cm: ≈ 14° (5–24°).
- **„Random Speed“ (Code):** Das Tempo wird mit einer festen Sinusmischung der Uhrzeit auf das 0,4- bis 1,9-Fache moduliert (Mittel 1,15, weich, keine „ruckartige Beschleunigung“); die Sprungschwelle wird jedes Bild neu zwischen 800 und 1 400 gewürfelt → bei 1× Sprünge im Mittel alle ≈ 0,8 s (10–90 %: 0,58–1,1 s). Erst damit wird der **Zeitpunkt** unvorhersagbar.
- **„Gaze Trail“ (Code):** Kreise an den letzten 15 Bildpositionen (≤ 30 % Deckkraft) – nach einem Sprung bleibt ≈ 250 ms (60 Hz) bzw. ≈ 210 ms (72 Bilder/s) eine Spur am alten Ort.
- **Bildfrequenz (Code):** Bilder, die < 13 ms nach dem letzten kommen, werden verworfen (gemeinsames Modul, vgl. 410) → höchstens ≈ 77 Aktualisierungen/s; bei 144 Hz effektiv 72. Sprungtakt und Tempo sind davon kaum betroffen (Simulation: 0,82 vs. 0,83 Sprünge/s bei 60 bzw. 144 Hz).
- **Eingabe (Code):** keine Auswertung; Maus/Finger zeichnen nur ein Fadenkreuz. Keine Punkte, Level, Treffer oder Fehler.

| Tempo | Sprung alle | ≈ °/s (Monitor 60 cm) | ruhige Folge je Strecke* | Schritt je Bild (60 Hz) |
|---|---|---|---|---|
| 0,5× | 2,4 s | 5–8 | ≈ 2 s | ≈ 0,1° |
| 1× (Standard) | 1,2 s | 9–16 | ≈ 0,8–0,9 s | ≈ 0,2° |
| 2× | 0,6 s | 19–33 | ≈ 0,2–0,3 s | ≈ 0,4° |
| 3× | 0,4 s | 28–49 | kaum | ≈ 0,6° |
| 5× | 0,24 s | 47–81 | keine (nur Hinterherspringen) | ≈ 1,1° |
| 9× (Maximum) | 0,13 s | 84–146 | keine | ≈ 1,9° |

\* Eigene Abschätzung: Sprungintervall minus ≈ 0,3–0,4 s für Sakkadenlatenz, Sakkadendauer, Korrektur und Anlauf der Folge (Abschnitt 4).

- **Widersprüche Regeltext ↔ Code:** „Analysiere deine Latenzwerte“ und die Leistungstabelle – es wird nichts gemessen; „Random Speed – erratic acceleration“ – weiche Tempo-Schwankung; „Hide Line – path guide lines“ – es ist ein Richtungshinweis, keine Bahn; Referenz „1,0–2,0× über 60 s“ – Regler bis 9×; „Sakkade 20–40 ms Flugzeit“ – bei den tatsächlichen Sprungweiten deutlich länger (Abschnitt 4).

## 3. Was die Website sagt – und wie das einzuordnen ist

**Website:** Positions- und Geschwindigkeitsfehler würden über getrennte Netzwerke verarbeitet (Colliculus/FEF bzw. MT/MST–Brücke–Kleinhirn), der Sprung verlange deren Verkettung „im Millisekundentakt“. Während der Sakkade (bis 500°/s) dämpfe die sakkadische Suppression Unschärfe; danach fehle 100–130 ms Rückmeldung, das Kleinhirn müsse den Geschwindigkeitsvektor „konservieren“. Das Training schließe die „Reaktionslücke“ in Shootern (Tracer, Jett, Wraith) und helfe Ballsportlern. Tipps: gerade statt bogenförmige Sakkade, Geschwindigkeit „cachen“, wenige Pixel vorhalten, Kinn mit den Fingern stützen (VOR). 4–6 × 60 s, Augenmuskeln verbrauchten „rasch Glykogen“, bei Schläfendruck Palming. Tabelle: „Spitzenklasse“ < 140 ms Wiederfinden, < 3 % Abweichung, ≥ 97 % „Bewegungssynchronisation“.

**Einordnung:**

- **Kern richtig:** Positionsfehler lösen Sakkaden, Geschwindigkeitsfehler Folgebewegung aus (Step-Ramp-Klassiker, Rashbass 1961). Beide Systeme sind aber **eng gekoppelt**, nicht getrennt: gemeinsame Kaskade (Krauzlis, 2004; Orban de Xivry & Lefèvre, 2007), Aufholsakkaden verrechnen den Netzhautschlupf (de Brouwer et al., 2002b), ein Positionsreiz erzeugt nach ≈ 85 ms auch eine glatte Augenbewegung (Blohm et al., 2005).
- **„Nach der Landung fehlt Geschwindigkeitsinformation“ – überzeichnet:** Sakkaden auf bewegte Ziele rechnen die Zielbewegung bereits mit ein (Gellman & Carl, 1991), die Folgebewegung läuft während der Sakkade weiter (de Brouwer et al., 2002b) und ist danach verstärkt (Lisberger, 1998, Affen). Ein Geschwindigkeitsgedächtnis gibt es (Barnes, 2008); dass es „das Kleinhirn“ leistet, belegt keine zitierte Quelle. In dieser Übung zeigt zudem die Richtungslinie die Richtung sofort an.
- **Sakkadische Suppression:** existiert, dämpft vor allem das magnozelluläre System/Bewegungsempfinden (Ross et al., 2001) – die dafür zitierte Arbeit (Bahill et al., 1980) behandelt etwas anderes.
- **„20–40 ms Flugzeit“ – zu kurz:** Die Sakkadendauer steigt um ≈ 2,7 ms pro Grad (Baloh et al., 1975); allein daraus ergeben sich für den mittleren 20°-Sprung ≥ 54 ms, für 36° ≥ 97 ms.
- **Leistungstabelle ohne Datengrundlage:** Die Seite misst weder Blick noch Zeit. „< 140 ms“ bis zur Ankunft liegt im Bereich von Express-Sakkaden (Gipfel ≈ 100 ms), die typisch nur mit Lücke vor dem Zielerscheinen auftreten; reguläre Sakkaden liegen dort bei ≈ 150 ms (Fischer & Ramsperger, 1984) – ohne Lücke und bei zufälligem Ort eher darüber. Zudem definiert die Seite „bis zum Eintreffen der Fovea“ – darin steckt auch die Sakkadendauer (≥ 54 ms bei 20°, s. u.), für < 140 ms bliebe also eine Latenz unter ≈ 90 ms, praktisch nur mit Vorwegnahme erreichbar. „≥ 97 % Synchronisation“ ist nicht definiert: Der Gain der glatten Komponente liegt im Labor stets < 0,95, nur zusammen mit Aufholsakkaden erreicht die Gesamtbewegung ≈ 1 (Collewijn & Tamminga, 1984). Die „Referenzdaten“ nennen keine Quelle.
- **E-Sport/Ballsport:** Woods et al. (2015) behandeln einfache Reaktionszeit, nicht Zielreakquisition. Für Transfer allgemeiner Wahrnehmungstrainings auf Sport fehlt ein Beleg (Fransen, 2024); große Effekte digitaler Trainings entstehen vor allem, wenn am Trainingsgerät getestet wird (Guo et al., 2025).
- **Tipps:** „Gerade statt Bogen“ steht nicht bei Findlay & Walker (1999; Modell der Sakkadenauslösung) und lässt sich bei einer ballistischen Bewegung kaum willentlich steuern. „Vorhalten“ leistet das Sakkadensystem teilweise automatisch (Gellman & Carl, 1991); ein Nutzen bewussten Vorhaltens ist nicht belegt. Kinnstütze/VOR: unbelegt (Leigh & Zee, 2015, nicht eingesehen); große Blickwechsel werden natürlicherweise mit dem Kopf unterstützt (bei einem 37° breiten Lesefeld am Bildschirm begann die Kopfbewegung sogar vor der Augenbewegung, Han et al., 2003), für Gleitsichtträger:innen ist das nötig (Abschnitt 4). „Glykogen“ und „Palming senkt den Tonus“: ohne Beleg. 4–6 kurze Runden mit Pause sind trotzdem vernünftig (Ermüdung und nachlassende Aufmerksamkeit können die Folge verschlechtern; allgemeine Erfahrung, hier nicht quellengeprüft).
- **144/240 Hz:** Das Bildraster verzögert einen Sprung bei 60 Hz im Mittel ≈ 8 ms (max. 16,7 ms), bei 144 Hz ≈ 3,5 ms – aber der Code selbst begrenzt auf ≈ 72–77 Bilder/s. Latenz zählt mehr als Bildfrequenz über 60 Hz (Spjut et al., 2019).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Die Kugel ist groß und kontrastreich, die Sehschärfe nicht leistungsbegrenzend; das plötzliche Wiedererscheinen macht sie auch peripher gut auffindbar. Schwierig wird nur das kleine Zeichen. Bei 40 cm Abstand entspricht 1 cm auf dem Schirm etwa 1,4°.
- **Reaktionskette je Sprung (Literatur + eigene Abschätzung):** Die Sakkadenlatenz auf einen unerwartet auftauchenden Ort beträgt ≈ 150–200 ms (reguläre Sakkaden ≈ 150 ms mit Lücke, Fischer & Ramsperger, 1984), die Dauer ≈ 55–100 ms (Baloh et al., 1975). In dieser Zeit läuft das Ziel weiter; die Sakkade rechnet das nur teilweise ein (Gellman & Carl, 1991), der Rest wird nach ≈ 125 ms per Aufholsakkade korrigiert (de Brouwer et al., 2002a). Der Anlauf der Folgebewegung dauert ≈ 100 ms (Carl & Gellman, 1987) und ist nach Sakkaden verstärkt (Lisberger, 1998, an Affen). Insgesamt vergehen so etwa 0,3–0,4 s bis zur stabilen Folge. Das Zeichen erscheint je nach Stufe 700 bis 280 ms nach Beginn des Einblendens; auf den hohen Stufen bleibt also nur wenig Zeit.
- **Folgebewegung:** Das Grundtempo der Übung steigt über die Stufen von etwa 10 auf etwa 43 % der kürzeren Bildseite pro Sekunde, das sind auf einem Tablet in 40 cm Abstand grob 2 bis 10°/s und damit im gut verfolgbaren Bereich. Der glatte Gain ist stets < 0,95 und sinkt mit dem Tempo (Collewijn & Tamminga, 1984); ≈ 90 % Gain bis ≈ 100°/s bei den meisten Personen (Meyer et al., 1985).
- **Sprungweite:** Sie wächst über die Stufen von 16 auf 77 % der kürzeren Bildseite, auf einem Tablet in 40 cm Abstand grob von 3,5° auf 17°.
- **Weiches Ein- und Ausblenden:** Das Ausblenden dauert 170 ms, es folgen 60 ms Dunkel und 170 ms Einblenden; Aus- und Einblenden sind sinusförmig und nie schlagartig. Die Verschmierung des bewegten Ziels beträgt etwa Geschwindigkeit ÷ Bildfrequenz (eigene Rechnung).
- **Blickfeld und Gleitsicht:** Die Sprünge führen über das ganze Feld. Der scharfe Zwischenbereich einer Gleitsichtbrille ist seitlich nur ≈ 13–18° breit statt ≈ 60° bei Einstärkengläsern (Han et al., 2003); neue Träger:innen bewegen mehr den Kopf (Hutchings et al., 2007). Bei ruhigem Kopf landet der Blick nach vielen Sprüngen in der Randunschärfe, unten im zu starken Nahteil; daher Arbeitsplatzbrille, kleineres Feld oder Kopfbewegung zulassen, Oberkante des Bildschirms etwa auf Augenhöhe.
- **Akkommodation:** 60 cm ≈ 1,7 dpt, 40 cm ≈ 2,5 dpt (Rechenregel: Kehrwert des Abstands in Metern); bei Alterssichtigkeit passende Zwischen- oder Nahkorrektur.
- **Trockenes Auge:** Bildschirmarbeit senkt die Lidschlagrate im Mittel auf ein Fünftel (Patel et al., 1991).
- **Alter:** Geringerer Folge-Gain und längere Sakkaden-Reaktionszeit im Alter (Moschner & Baloh, 1994); bei 5–8-Jährigen sind Sakkaden langsam und stark schwankend (Munoz et al., 1998).

## 5. Neurowissenschaftliche Grundlagen

- **Sakkade:** Die Auslösung beruht auf einer Konkurrenz zwischen Fixieren und Wegbewegen auf einer Salienzkarte, mit getrenntem Wann- und Wohin-Pfad (Findlay & Walker, 1999); ein plötzlich erscheinendes, helles Ziel ist dabei stark salient. Colliculus superior und FEF sind zentrale Stationen (Krauzlis, 2004). Klassisch gilt: Positionsfehler lösen Sakkaden aus, Geschwindigkeitsfehler treiben die Folgebewegung (Rashbass, 1961).
- **Folgebewegung:** Bewegungssignale aus MT/MST erreichen über das Folgeareal des FEF, Brückenkerne und Kleinhirn die Augenmuskelkerne; ≈ 100 ms Bewegung werden in den Start übersetzt (Lisberger, 2010).
- **Kopplung:** Sakkade und Folge gelten als zwei Ergebnisse eines gemeinsamen sensomotorischen Prozesses (Orban de Xivry & Lefèvre, 2007); Positionsinformation speist auch die Folgebewegung (Blohm et al., 2005).
- **Vorhersage:** Extraretinale Signale und ein Kurzzeitspeicher für Geschwindigkeit stützen die Folge (Barnes, 2008); vorhersagbares Timing erlaubt vorausgreifende Augenbewegungen (Kowler et al., 2019). Der Abstand zwischen den Sprüngen ist hier unregelmäßig, der **Ort** des Wiederauftauchens nie vorhersagbar. Ob die Übung „Hirnareale stärkt“, ist nicht untersucht.

## 6. Motorische Grundlagen

- Die Eingabe beschränkt sich auf das Antworten per Tipp oder Klick unten; die „Motorik“ der Übung sind die Augenbewegungen selbst, deshalb sind die motorischen Profilwerte 0.
- Wer Maus oder Finger mitführt, macht daraus eine unbewertete Zielwechsel- oder Nachführaufgabe (vgl. 502, 505). Gerät stabil aufstellen, aufrecht sitzen; ruhiger Kopf nur, wenn gezielt die Augenbewegung geübt werden soll.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Messung der Augenbewegung:** Das Ergebnis zeigt nur, ob das Zeichen erkannt wurde; die Stufe gibt die erreichte Sprungweite, Zeit bis zum Zeichen und das Tempo an.
- **Gerät/Abstand:** Tempo und Sprungweite sind in Bildschirmeinheiten festgelegt; die Winkelwerte hängen von Bildschirmgröße und Abstand ab. Touch und Maus unterscheiden sich in Zeitbedarf und Streuung. Vergleiche nur am selben Gerät und Abstand.
- **Kopplung von Tempo und Weite:** Mit der Stufe steigen Sprungweite, Tempo, Zeichengröße und -dauer gemeinsam; einzelne Größen lassen sich nicht getrennt steigern.
- **Gewöhnung:** Der Rhythmus der Sprünge ist unregelmäßig, aber die Aufgabe wird schnell vertraut; subjektive Besserung kann Aufgabengewöhnung sein. Messungen am Menschen streuen von Durchgang zu Durchgang; erst mehrere Runden (Median) erlauben eine Einschätzung (Mountford et al., 2004, S. 43–44).
- **Person:** Ermüdung, Alter, Aufmerksamkeit, Brillenversorgung, Gesichtsfeld.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Keine Studie zu dieser Aufgabe. Analogien: 2 × 6 min Folgen eines quasi-zufällig bewegten Ziels an 3 Tagen verbesserten die Folge noch nach 5 Tagen (Eibenberger et al., 2012; je N = 10). Mit Belohnung für genaues Folgen stieg der Gain bei kurz verdeckten Zielen nach 8–10 Tagessitzungen von 0,59 auf 0,89, mit zufälliger Belohnung nur von 0,60 auf 0,63, ohne Belohnung (reine Wiederholung) von 0,63 auf 0,71 (Madelain & Krauzlis, 2003). Rückmeldung verstärkt das Lernen deutlich; die Übung zeigt zwar nach jedem Durchgang ✓/✗, belohnt aber nicht das genaue Folgen selbst.
- **Naher Transfer – fehlend:** Nicht untersucht, ob schnelleres Wiederfinden auf andere Blickaufgaben übergeht. Der schwache Laborhinweis auf Übertrag bei reinem Folgetraining (Eibenberger et al., 2012; Grundlage der Einstufung „schwach“ bei 409–413 und 415) betrifft nur die Folgebewegung, nicht den Kern dieser Übung (Sakkade auf das versetzte Ziel); daher hier strenger eingestuft, wie bei der Sakkaden-Übung 407.
- **Alltagstransfer – fehlend:** Kein Beleg für Ballsport, Verkehr oder Bildschirmspiele (Fransen, 2024; Simons et al., 2016; Guo et al., 2025).
- Erfahrungswissen aus der funktionellen Optometrie, nicht belegt: Man beginnt am eigenen Arbeitspunkt und steigert in kleinen, selbst gesteuerten Schritten; die Stufen der Übung folgen diesem Vorgehen.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** der Übergang von einem Blicksprung in eine glatte Folgebewegung geübt werden soll, ohne Hand-Eingabe; als Steigerung nach 412 (gleichförmige Bewegung ohne Sprünge), 404 (gleichförmig) und 303 (Sprünge auf ruhende Ziele), parallel zu 410. Unter 409–415 fordert diese Übung Blicksprünge und das Erfassen am Bildrand am stärksten (`sakkaden` 3, `peripheres_sehen` 2). Niedrige Stufen zum Einstieg; 3–5 Runden mit Pausen und bewusstem Blinzeln.
- **Weniger passend, wenn …** das Ziel Auge-Hand-Koordination ist (104, 105, 502, 505), eine Messung der Augenbewegung gewünscht ist oder hohe Stufen gewählt würden (für Einsteiger:innen und Ältere erst nach längerem Üben).
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Jeder Sprung ist ein Aus- und Einblenden an zwei Orten; zwischen zwei Sprüngen läuft die Kugel mindestens 0,8 s gleichmäßig, Aus- und Einblenden dauern je ≥ 150 ms und verlaufen sinusförmig, nie schlagartig. Die Leuchtfläche liegt bei üblichem Betrachtungsabstand weit unter der Flächenschwelle 0,006 sr (Harding et al., 2005; WCAG 2.3.1) und weit unter 3 Wechseln pro Sekunde, formal also unkritisch. Trotzdem `flimmern_lichtreize` 1 (gering), anders als die stetig bewegten Ziele in 410–413 und 415 (0), aber weit unter dem blinkenden Ziel in 409 (3).
  - `gesichtsfeldausfall`: Das Ziel taucht an beliebigen Orten wieder auf, auch im ausgefallenen Bereich; Frust- und Überforderungsgefahr. Gesichtsfeldausfälle lassen sich nach dem Verlauf der Sehbahn einordnen (vor dem Chiasma meist einäugig, am Chiasma ungleichseitig, dahinter gleichseitig; Muchnick, 2008, S. 32), werden aber oft nur durch eine Untersuchung entdeckt (ebd., S. 5, Einzelfall). Die Übung ist kein Gesichtsfeldtest; neue oder unklare Ausfälle gehören ärztlich abgeklärt.
  - `presbyopie_gleitsicht`: Sprünge in seitliche Unschärfezonen → Kopfbewegung erlauben, kleineres Feld, Arbeitsplatzbrille.
  - `nystagmus`: Folge und Zielfinden können eingeschränkt sein.
  - `schwindel_vestibulaer`: plötzliche, große Blickwechsel im Vollbild; kleines Ziel auf ruhigem Grund, daher meist gering. Wiederkehrender Schwindel gehört ärztlich abgeklärt (Muchnick, 2008, S. 18, 28).
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: konzentriertes Schauen mit wenig Lidschlag; kurze Blöcke, Pausen.
  - `kinder_unter_6`: abstrakte Aufgabe, nicht empfohlen.
- **Kombiniert gut mit …** 412 (gleichförmige Grundbewegung ohne Sprünge – Vorstufe), 409 (statt Sprüngen Dunkelphasen: das Ziel taucht auf der vorhergesagten Bahn wieder auf, hier an einem zufälligen Ort), 303 (Blicksprünge auf ruhende Ziele), 407 (Verdeckung, Landepunkt), Richtungswechsel-Reihe 415 → 410 → 411, 401 (peripheres Erkennen), 502/508 (Zielwechsel mit Hand).

Keine Diagnose, keine Heilversprechen: Trainingsaufgabe für gesunde Nutzer:innen, kein Test der Augenbeweglichkeit.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Prüfbar machen ohne Eyetracker:** 250–500 ms nach dem Sprung kurz einen Landolt-Ring im Ziel zeigen (wie `scharf-in-bewegung`); nur lesbar, wenn der Blick wieder aufliegt. Adaptiv über Sprungweite, Tempo und Zeitfenster.
- **Parameter trennen:** Tempo in °/s, Sprungweite in ° (Einstieg 5–10°, später bis 25°), Sprungabstand zufällig (z. B. 1,0–2,0 s) – fester Takt nur als leichte Stufe; Richtung nach dem Sprung wahlweise gleich (Geschwindigkeitsgedächtnis) oder neu.
- **Sicherheit:** höchstens 2 Sprünge/s, Ziel pro Bild ≤ 1°, kein Leuchtschein, weiches Einblenden am neuen Ort möglich; sichtbarer Stopp-Knopf, keine 13-ms-Bildsperre.
- **Tablet/Optiker:** Ständer, ≈ 40 cm, Querformat; wählbares kleineres Sprungfeld (20–30°) für Gleitsicht und Gesichtsfeldeinschränkung; Kopfbewegung als erlaubte Variante; Standardfarbe Weiß oder Gelb auf Dunkel.
- **Ehrliche Texte** (keine Profi-Stufen, Hirnregion- oder E-Sport-Versprechen, kein „Test“); große Bedienflächen, DE/IT.

## 11. Quellen

### Von der Website angegeben

- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, Titel auf der Website leicht falsch („pursuit“ statt „tracking“), Inhalt nur bibliografisch geprüft; **stützt die Aussage der Website:** teilweise (Positionsfehler → Sakkade, Geschwindigkeitsfehler → Folge; „getrennte kortikale Netzwerke“ und „Moosfasersystem“ stammen nicht daraus).
- Bahill, A. T., Iandolo, M. J., & Troost, B. T. (1980). Smooth pursuit eye movements in response to unpredictable target waveforms. *Vision Research, 20*(11), 923–931. https://doi.org/10.1016/0042-6989(80)90073-5 – **Prüfung:** DOI stimmt ✓ (kein Abstract verfügbar, Inhalt nur nach Titel eingeordnet); **stützt:** nein (behandelt laut Titel Folge bei unvorhersagbaren Bahnen, nicht sakkadische Suppression oder 500°/s).
- Findlay, J. M., & Walker, R. (1999). A model of saccade generation based on parallel processing and competitive inhibition. *Behavioral and Brain Sciences, 22*(4), 661–674. https://doi.org/10.1017/S0140525X99002150 – **Prüfung:** DOI stimmt ✓; **stützt:** nein („bogenförmige Suchbewegungen verlängern die Latenz dramatisch“ ist nicht Gegenstand des Modells).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Übergang Sakkade → Folge; betont aber gemeinsame statt getrennte Architektur).
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – **Prüfung:** DOI stimmt ✓; **stützt:** ja für Geschwindigkeitsgedächtnis und Vorhersage; nein für die Zuordnung zum Kleinhirn und die Leistungsstufen.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (einfache Reaktionszeit; nichts zu Zielreakquisition in Shootern oder 144/240-Hz-Monitoren).
### Weitere Fachliteratur

- Baloh, R. W., Sills, A. W., Kumley, W. E., & Honrubia, V. (1975). Quantitative measurement of saccade amplitude, duration, and velocity. *Neurology, 25*(11), 1065–1070. https://doi.org/10.1212/WNL.25.11.1065 – Sakkadendauer ≈ 2,7 ms pro Grad (N = 25)
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Rot-Grün-Schwäche
- Blohm, G., Missal, M., & Lefèvre, P. (2005). Direct evidence for a position input to the smooth pursuit system. *Journal of Neurophysiology, 94*(1), 712–721. https://doi.org/10.1152/jn.00093.2005 – Positionsreiz treibt auch die Folge (≈ 85 ms)
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Anlauf der Folge ≈ 100 ms
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Gain < 0,95
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002a). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Aufholsakkaden ≈ 125 ms
- de Brouwer, S., Missal, M., Barnes, G., & Lefèvre, P. (2002b). Quantitative analysis of catch-up saccades during sustained pursuit. *Journal of Neurophysiology, 87*(4), 1772–1780. https://doi.org/10.1152/jn.00621.2001 – Sakkaden verrechnen Schlupf, Folge läuft während der Sakkade weiter
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – kurzfristig trainierbare Folge
- Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. *Experimental Brain Research, 57*(1), 191–195. https://doi.org/10.1007/BF00231145 – Express- (≈ 100 ms) vs. reguläre Sakkaden (≈ 150 ms)
- Fransen, J. (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. *Sports Medicine, 54*(11), 2717–2724. https://doi.org/10.1007/s40279-024-02060-x – kein Ferntransfer auf Sport
- Gellman, R. S., & Carl, J. R. (1991). Motion processing for saccadic eye movements in humans. *Experimental Brain Research, 84*(3), 660–667. https://doi.org/10.1007/BF00230979 – Sakkaden auf bewegte Ziele extrapolieren die Bewegung teilweise
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Effekte vor allem am Trainingsgerät
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – schmales Gleitsicht-Sehfeld am Bildschirm; Kopf startet bei 37°-Feld vor dem Auge
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x – Blitz-Grenzwerte (≥ 3 Hz, ≥ 0,006 sr)
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – mehr Kopfbewegung mit neuer Gleitsichtbrille
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 – Vorhersage und Timing
- Lisberger, S. G. (1998). Postsaccadic enhancement of initiation of smooth pursuit eye movements in monkeys. *Journal of Neurophysiology, 79*(4), 1918–1930. https://doi.org/10.1152/jn.1998.79.4.1918 – verstärkte Folge nach Sakkaden (Affen)
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – Netzwerk MT, FEF, Kleinhirn
- Madelain, L., & Krauzlis, R. J. (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. *Journal of Neurophysiology, 90*(2), 972–982. https://doi.org/10.1152/jn.00869.2002 – Belohnung/Rückmeldung verstärkt das Lernen deutlich
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Obergrenze ≈ 100°/s
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Folge und Sakkaden im Alter
- Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human subjects on saccadic eye movement tasks. *Experimental Brain Research, 121*(4), 391–400. https://doi.org/10.1007/s002210050473 – Sakkaden über die Lebensspanne
- Orban de Xivry, J.-J., & Lefèvre, P. (2007). Saccades and pursuit: Two outcomes of a single sensorimotor process. *The Journal of Physiology, 584*(1), 11–23. https://doi.org/10.1113/jphysiol.2007.139881 – Sakkade und Folge gekoppelt
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm
- Ross, J., Morrone, M. C., Goldberg, M. E., & Burr, D. C. (2001). Changes in visual perception at the time of saccades. *Trends in Neurosciences, 24*(2), 113–121. https://doi.org/10.1016/S0166-2236(00)01685-4 – sakkadische Suppression
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer von Hirntraining
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – Latenz wichtiger als Bildfrequenz
- World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*, Erfolgskriterien 2.2.2, 2.3.1 (Norm, keine DOI). https://www.w3.org/TR/WCAG22/ – Blitz-Flächenschwelle, Pause-Pflicht
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – S. 5, 18, 28, 32: Gesichtsfeldausfälle nach Verlauf der Sehbahn; Schwindel und andere neurologische Warnzeichen verlangen ärztliche Abklärung
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – S. 43–44: Wiederholbarkeit von Messungen am Menschen geringer als an Prüfkörpern
