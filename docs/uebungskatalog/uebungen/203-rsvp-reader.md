---
# ===== Kennung =====
nr: 203
kennung: rsvp-reader
name: "Zielwort im Wortstrom (Wörter einzeln wiedererkennen)"
name_original: "Schnelllesetest | RSVP-Lesetraining"
kapitel: "Kognition & Aufmerksamkeit"
kapitel_original: "cognitive"
unterkapitel_original: "processing-speed"
quelle_url: "https://skilldrills.online/de/drills/cognitive/processing-speed/rsvp-reader"
blickfit_umsetzung: {kennung: "wortstrom", name: "Wortstrom", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/wortstrom/)."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Ein Zielwort wird zuerst groß gezeigt. Danach erscheinen acht bis zehn Wörter einzeln in der Bildmitte, weich ein- und ausgeblendet; sobald das Zielwort auftaucht, tippt man auf die Fläche, bei allen anderen Wörtern nicht. Mit steigender Stufe verkürzt sich die Anzeigedauer von 700 auf 350 Millisekunden (höchstens 2,5 Wörter pro Sekunde); das Antwortfenster bleibt mindestens 600 Millisekunden lang. Es geht um das Wiedererkennen eines bekannten Wortes, nicht um Lesen mit Verständnis; Lesetempo wird nicht gemessen."
ziel_funktionen: [visuelle_verarbeitungsgeschwindigkeit, daueraufmerksamkeit, inhibition]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 80
schwierigkeit_anpassung: "Fünf feste Tempostufen (Code): 250, 350, 480, 650, 850 Wörter/min, also 240, 171, 125, 92 und 71 ms pro Wort. Stufe = min(5, ⌊Punkte / 200⌋ + 1): alle 2 Treffer eine Stufe, nach 8 Treffern (800 Punkte) ist Stufe 5 erreicht. Start immer auf Stufe 1; der Text ist ein fester Absatz von 80 Wörtern in Endlosschleife."
messgroessen: ["Original: Punkte (+100 je Treffer), Treffer, Fehlalarme, verpasste Zielwörter, Genauigkeit in %, erreichte Stufe (WPM), Note", "sinnvoll: Anzeigedauer pro Wort in ms, bei der ein Zielwort in ≈ 75–80 % der Fälle erkannt wird (Schwelle statt Wörter/min)", "sinnvoll: Antwortzeit relativ zum Wortbeginn und Anteil vorzeitiger Antworten (Erkennen vs. Taktschätzen trennen)"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 1
    fixation: 2
    bewegungswahrnehmung: 0
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 1
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 1
    inhibition: 2
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 1
    entscheidung_wahlreaktion: 2
    lesen_sprache: 2
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 1
    zielbewegung_tempo: 1
    zielbewegung_praezision: 0
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
  sprachabhaengigkeit: 2

# ===== Auswahlhilfe =====
voraussetzungen: ["sicheres Lesen einzelner englischer Wörter in lateinischer Schrift (der Text ist nur auf Englisch vorhanden; Verstehen ist nicht nötig, das Zielwort kann auch als Buchstabenbild verglichen werden)", "Vollbild-Modus im Browser (Verlassen bricht die Runde ab)", "Wörter in der Bildmitte und das Zielwort-Banner oben müssen ohne Anstrengung lesbar sein (bei Nahbrille/Gleitsicht mit passender Brille)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, trockenes_auge_bildschirm, kopfschmerz_asthenopie, presbyopie_gleitsicht, sehbehinderung_niedriger_visus, nystagmus, lese_rechtschreib_schwaeche, aufmerksamkeitsprobleme, kognitive_einschraenkung, kinder_unter_6]
geeignet_fuer: ["ein bekanntes Wort in einer Folge einzeln gezeigter Wörter wiedererkennen und im richtigen Moment bestätigen", "ruhig in der Mitte schauen und bei anderen Wörtern nicht antworten (Zurückhalten)", "kennenlernen, wie schnell eine Wort-für-Wort-Anzeige ist und warum sie sich für Verständnis nicht eignet"]
weniger_geeignet_fuer: ["Schnelllesen oder besseres Textverständnis (dafür nicht belegt, eher gegenteilig)", "Menschen mit Lese-Rechtschreib-Schwäche oder geringer Vertrautheit mit der Sprache der Wortlisten (Deutsch bzw. Italienisch)", "Menschen, die bei schnellem Wechsel gleicher Reize schnell ermüden oder Kopfschmerzen bekommen", "Messung des Lesetempos oder des Leseverständnisses (erfasst wird nur das Wiedererkennen bekannter Wörter)"]
evidenz:
  uebungseffekt: unklar
  naher_transfer: fehlend
  alltag_transfer: fehlend
  kommentar: "Zur Aufgabe „Zielwort im Strom“ gibt es keine Trainingsstudie; dass Übung die Trefferquote erhöht, ist plausibel, aber nicht belegt. Für die Wort-für-Wort-Anzeige (RSVP) sind Tempo und Verständnis gegenläufig (Rayner et al., 2016; Acklin & Papesh, 2017; Benedetto et al., 2015); ein Nutzen für das Lesen im Alltag ist nicht belegt."
aehnliche_uebungen: [102, 208, 109, 606]
stichworte: ["RSVP", "Schnelllesen", "Zielwort", "Wortstrom", "Go/No-Go", "Timing", "Anzeigedauer", "optimale Blickposition", "Attentional Blink", "trockenes Auge", "Lesen", "nicht umgesetzt"]
---

# 203 · Zielwort im Wortstrom (Wörter einzeln wiedererkennen)

> Original: „Schnelllesetest | RSVP-Lesetraining“ – skilldrills.online, Kapitel Kognition & Aufmerksamkeit (`cognitive/processing-speed`) · Blickfit: **bewusst nicht umgesetzt** (Schnelllese-Versprechen nicht belegt; Begründung in Abschnitt 10)

## 1. Kurzbeschreibung

Zu Beginn jedes Durchgangs wird ein Zielwort etwa zwei Sekunden lang groß gezeigt. Danach erscheinen acht bis zehn Wörter einzeln in der Bildmitte, jeweils weich ein- und ausgeblendet; das Zielwort kommt genau einmal vor, mit mindestens zwei Wörtern davor und danach. Sobald es auftaucht, tippt man irgendwo auf die Fläche; bei allen anderen Wörtern tippt man nicht. Die Anzeigedauer verkürzt sich mit der Stufe von 700 auf 350 Millisekunden, es erscheinen aber nie mehr als 2,5 Wörter pro Sekunde, und das Antwortfenster ist nie kürzer als 600 Millisekunden. Die Wörter werden bei jedem Durchgang zufällig aus kurzen Wörtern der Sprache (Deutsch bzw. Italienisch) gezogen. Eine Sitzung hat acht Durchgänge. Es geht um das Wiedererkennen eines bekannten Wortes in einer Folge einzelner Wörter, nicht um Lesen mit Verständnis; Lesetempo und Leseverständnis werden nicht gemessen.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Chunk `54416-….js` mit Spiellogik, Stand 30.09.2026) sowie `docs/skilldrills-kognition-analyse.md`. Beschrieben ist nur die Mechanik; kein Code übernommen. Umrechnungen in Winkel und Millimeter sind eigene Herleitungen [H] (Tablet ≈ 0,19 mm pro CSS-px, 40 cm Abstand).

- **Ablauf (Code):** Start → Vollbild → Countdown 3-2-1 (≈ 2,5 s) → 45 s Spielzeit. Verlassen des Vollbilds oder Escape bricht die Runde ab. Die Zeitanzeige wird alle 250 ms aktualisiert.
- **Text (Code):** ein fester englischer Absatz mit 80 Wörtern (Beginn „Neuroplasticity is the brain's remarkable ability …“), der immer bei Wort 1 anfängt und sich wiederholt. Es gibt keine Zufallskomponente im Wortstrom.
- **Takt (Code):** Jedes Wort steht 60 000 / WPM ms: 240, 171, 125, 92 und 71 ms für 250, 350, 480, 650 und 850 WPM. Ein Timer (`setTimeout`) schaltet weiter, nicht das Bildraster; bei 60 Hz entsprechen 71 ms nur 4–5 Bildern (67 oder 83 ms) [H]. Zwischen den Wörtern gibt es weder Pause noch Maske.
- **Darstellung (Code):** Monospace-Schrift, sehr fett, 36 px (schmale Fenster) bzw. 60 px (ab 640 px Breite), hellgrau auf fast schwarzem Grund. Der rote, unterstrichene „Pivot“-Buchstabe liegt an Position ⌊(Länge − 1) / 3⌋, also im ersten Drittel des Wortes. Ein Zeichen ist bei 60 px ≈ 36 px breit ≈ 6,8 mm ≈ 1° [H]; das längste Wort („Neuroplasticity“, 15 Buchstaben) misst ≈ 100 mm ≈ 14° [H]. Das Zielwort-Banner oben ist dagegen nur 14 px groß (Großbuchstaben ≈ 1,9 mm ≈ 0,27°) [H]. Bei langen Wörtern kann sich der rote Buchstabe seitlich verschieben, weil Vor- und Nachbereich nur Mindestbreiten haben (aus dem Code abgeleitet, nicht im Browser nachgemessen).
- **Zielwort (Code):** Es wird aus dem Text gewählt, ≥ 4 Buchstaben lang, 6 bis 14 Wörter hinter der aktuellen Position. Das erste Zielwort ist immer „reorganize“. Nach einem Treffer oder einem verpassten Ziel wird sofort ein neues gewählt. Die Zielfolge ist damit bei jedem Durchgang gleich und lässt sich lernen.
- **Treffer und Fehler (Code):** Ein Tipp zählt nur, wenn **genau in diesem Moment** das Zielwort angezeigt wird, also innerhalb der Wortdauer von 240 bis 71 ms. Treffer: +100 Punkte. Jeder andere Tipp ist ein Fehlalarm: Der Knopf ist dann 1 s gesperrt und wird ausgegraut (kein Punktabzug). Ein zweiter Tipp im selben Wort ist ebenfalls ein Fehlalarm. Zieht das Zielwort unbeantwortet vorbei, zählt das als „verpasst“ (Signalton, kein Punktabzug).
- **Stufen (Code):** Stufe = min(5, ⌊Punkte / 200⌋ + 1). Das Tempo ändert sich also nach nur 2 Treffern, nicht nach Genauigkeit. Der Startwert ist fest 1, ein gespeicherter Bestwert wirkt nur auf die Anzeige. Die Note wird aus den Punkten relativ zu einer Referenz von 2.500 Punkten gebildet (Schwellen nicht im Einzelnen ausgewertet).
- **Eingabe (Code):** `pointerdown` auf dem Knopf (Maus, Touch). Keine Tastatur außer Escape. Es wird keine Reaktionszeit gemessen.
- **Was das für die Aufgabe bedeutet [H]:** Bei 250 WPM ist das Zeitfenster (240 ms) kaum länger als die mittlere einfache Reaktionszeit Erwachsener (231 ms; Woods et al., 2015). Um ein Wort zu erkennen, zu vergleichen und zu tippen, braucht man länger. Reagiert man auf das erkannte Wort, steht schon das nächste da, und der Tipp zählt als Fehlalarm. Ab Stufe 2 ist Reagieren praktisch unmöglich (171 → 71 ms). Punkte sind deshalb nur durch **Vorausplanen** erreichbar: Rhythmus des Stroms nutzen und die feste Textfolge lernen. Gemessen wird also ein Stück Taktgefühl und Auswendigwissen, nicht Lese- oder Erkennungstempo.

**Widersprüche Regeltext ↔ Code und innerhalb der Seite.**
- FAQ „Sakkaden entfallen vollständig“ und „Bis zu 80 % der Lesezeit gehen für Sakkaden verloren“ widersprechen der Einleitung der Seite selbst („ein Teil der Blicksprünge“, Verständnis kann sinken) und der Fachliteratur (Abschnitt 3).
- „Stufen steigen, wenn man Wörter mit hoher Genauigkeit trifft“: Im Code entscheidet nur die Punktzahl (alle 200 Punkte), nicht die Genauigkeit.
- „Fünf Stufen erhöhen das Tempo, während du die Genauigkeit kontrollierst“: Fehlalarme kosten nur 1 s Sperre, verpasste Ziele nichts.
- Die Anzeige „Tempo 300 WPM“ vor dem Start passt zu keiner der fünf Stufen (Code: 250 bis 850); die Runde beginnt mit 250 WPM.
- „Erkennungstaste klicken“ / „TARGET DETECTED“: Knopf und Banner bleiben englisch, der Text ohnehin.

## 3. Was die Website sagt – und wie das einzuordnen ist

**Aussagen.** RSVP zeige Wörter an einem Punkt, wodurch Blicksprünge „vollständig entfallen“ ; bis zu 80 % der Lesezeit gingen für Sakkaden und Rückwärtsblicke verloren (Rayner, 2016); der „Optimal Recognition Point“ (ORP) sei die schnellste Erkennungsstelle im Wort (Rayner, 1998); Erwachsene lesen 200–250 WPM, „mit Training sind 400–600 WPM realistisch“; die Übung trainiere „lexikalische Entschlüsselung im visuellen Wortformareal“, Arbeitsgedächtnis und Daueraufmerksamkeit. 144-Hz-Monitore sicherten „präzise Frame-Intervalle“ (Woods et al., 2015). Dazu kommt eine Tabelle „Tier 1 bis 5 / Top 1 % bis Basis“.

**Einordnung.**
- **80 % Augenbewegung: widerlegt.** Rayner et al. (2016) nennen genau diese Behauptung und rechnen dagegen: Fixationen dauern ≈ 250 ms, Sakkaden 20–35 ms, die Augen bewegen sich nur ≈ 10 % der Lesezeit, und die Verarbeitung läuft währenddessen weiter. Rücksprünge (10–15 % der Blicksprünge) **stützen** das Verständnis (Schotter et al., 2014).
- **„Sakkaden entfallen vollständig“:** teilweise. Die Blicksprünge von Wort zu Wort entfallen; kleine Fixationsbewegungen (Mikrosakkaden) bleiben (Rolfs, 2009). Fehlende Rücksprünge verschlechtern das Verständnis.
- **ORP:** In der Forschung heißt es „optimale Blickposition“ (O'Regan & Jacobs, 1992); „ORP“ ist ein Begriff von RSVP-Apps. Wörter werden auch neben dieser Stelle erkannt, nur etwas langsamer (Rayner et al., 2016).
- **400–600 WPM mit Training:** nicht belegt. Nach einem Schnelllesekurs stieg das Tempo von ≈ 280 auf ≈ 400 Wörter/min, das Verständnis sank von 81 auf 74 % (Calef et al., 1999, berichtet in Rayner et al., 2016). Das mittlere stille Lesetempo Erwachsener liegt bei 238 Wörtern/min (Sachtext) bzw. 260 (Roman) (Brysbaert, 2019); die Angabe 200–250 ist also richtig.
- **Verständnis bei RSVP:** Im Vergleich Spritz gegen normales Lesen war wörtliches Verständnis 60 gegen 72 % und die Lidschlagrate 4,7 gegen 8,5 pro Minute (Benedetto et al., 2015). Statischer Text war RSVP mit 700 und 1.000 WPM überlegen; langsameres RSVP half dem wörtlichen, schnelleres dem schlussfolgernden Verständnis (Acklin & Papesh, 2017). Reines Entziffern (lautes Vorlesen) kurzer Passagen ist mit RSVP dagegen sehr schnell möglich (≈ 1.171 Wörter/min im Mittel; minimale Anzeigedauer im Mittel ≈ 69 ms je Wort; Rubin & Turano, 1992). Das erklärt, warum 850 WPM als Anzeigetempo möglich, für Verständnis aber ungeeignet sind.
- **Visuelles Wortformareal:** das Areal gibt es (Dehaene & Cohen, 2011); dass **dieses Spiel** es trainiert, ist nicht belegt.
- **144 Hz / Woods et al. (2015):** Woods misst einfache Reaktionszeiten, nicht Bildflackern; die Aussage wird nicht gestützt. Das Spiel taktet ohnehin per Timer, nicht per Bild.
- **Leistungsstufen (Top 1 % bis Basis):** ohne Datengrundlage. Die Seite nennt keine Datengrundlage (Stichprobe, Erhebung) und keine Quelle; auch in der Literatur gibt es keine Werte für dieses Spiel. Die Stufen sind außerdem nicht als „Leseleistung“ interpretierbar (Abschnitt 2).

## 4. Optische und okulomotorische Grundlagen

- **Wortstrom:** Die Wörter erscheinen nacheinander am selben Ort, 350–700 ms lang mit einer Lücke von 60 ms. Das verlangt ruhige Fixation in der Mitte; Blicksprünge von Wort zu Wort entfallen. Beim normalen Lesen liegt die Fixationsdauer bei etwa 250 ms und die Blicksprung-Latenz bei 150–200 ms (Rayner et al., 2016). Die Wahrnehmungsspanne beim Lesen reicht 3–4 Buchstaben links und 14–15 rechts des Blickpunkts und ist sprachlich, nicht durch die Sehschärfe begrenzt (McConkie & Rayner, 1975, nach Rayner et al., 2016).
- **Zeitliche Verarbeitung:** Ein Ziel im schnellen Strom wird schlecht erkannt, wenn es 180–450 ms nach einem anderen Ziel folgt („Attentional Blink“; Raymond et al., 1992). Weil es je Durchgang nur ein Zielwort gibt, spielt dieser Effekt hier kaum eine Rolle.
- **Schrift und Alter:** Die kritische Schriftgröße steigt mit dem Alter (0,08 logMAR bei 8–23 Jahren, 0,21 bei 68, 0,34 bei 81; Calabrèse et al., 2016). Weltweit hatten 2015 etwa 1,8 Mrd. Menschen Alterssichtigkeit, 826 Mio. davon ohne ausreichende Nahkorrektur (Fricke et al., 2018). Die Wörter sollten ohne Anstrengung lesbar sein, bei Bedarf mit Lese- oder Bildschirmbrille.
- **Abstand:** Je kürzer der Abstand, desto größer der Akkommodationsaufwand: 40 cm entsprechen 2,5 dpt, 20 cm 5 dpt und 10 cm 10 dpt (Rechenregel: 100 geteilt durch den Abstand in cm). Am Tablet wird mit etwa 40 cm gerechnet.
- **Brille:** Der Wortstrom liegt in der Mitte, und ein Tipp irgendwo auf der Fläche genügt; seitliche Zonen von Gleitsichtgläsern spielen daher keine Rolle, wohl aber der Blick durch den passenden Bereich für den Abstand.
- **Trockenes Auge:** Bildschirmarbeit senkt die Lidschlagrate im Mittel auf etwa ein Fünftel (Patel et al., 1991); bei schneller Wort-für-Wort-Anzeige fiel sie zusätzlich (4,7 gegenüber 8,5 pro Minute beim normalen Lesen; Benedetto et al., 2015). Digitale Augenbelastung betrifft mindestens die Hälfte der Bildschirmnutzer (Sheppard & Wolffsohn, 2018). Die Übung erinnert ans Blinzeln und sollte mit Pausen genutzt werden.
- **Flimmern:** Es wechseln nur einzelne Wörter in einem kleinen Bereich, weich ein- und ausgeblendet, mit höchstens 2,5 Wörtern pro Sekunde. Lichtausgelöste Anfälle sind am häufigsten bei 15–25 Hz (Bereich 1–65 Hz; Fisher et al., 2005); Blitze gelten ab ≥ 3 Hz, ≥ 20 cd/m² und ≥ 0,006 sr als riskant (Harding et al., 2005). Die Wortfolge liegt darunter und blitzt nicht; das Risiko ist wahrscheinlich gering, wurde aber nicht gemessen.

## 5. Neurowissenschaftliche Grundlagen

- **Wortlesen:** Das visuelle Wortformareal (linker okzipitotemporaler Sulcus) erkennt Buchstabenketten; Läsionen können reine Leseunfähigkeit (Alexie) verursachen (Dehaene & Cohen, 2011). Der Vergleich mit dem Zielwort verlangt außerdem Arbeitsgedächtnis (Zielwort halten) und Aufmerksamkeitssteuerung.
- **Hemmung:** Nicht zu tippen, wenn ein anderes Wort erscheint, entspricht einer Go/No-Go-Aufgabe (siehe 102).
- **Nicht belegt:** Dass die Übung bestimmte Hirnareale „trainiert“ oder das Lesetempo neuronal steigert, ist nicht belegt.

## 6. Motorische Grundlagen

- **Tippen:** Ein Tipp irgendwo auf die Fläche genügt (am Computer auch Leertaste oder Eingabetaste); es gibt keine Ziel- oder Präzisionsanforderung. Zielwort und Wörter in der Bildmitte wechseln sich ab, entscheidend ist der Zeitpunkt des Tipps.
- **Reaktionszeit:** Die einfache visuelle Reaktionszeit Erwachsener liegt bei etwa 231 ms (213 ms ohne Gerätelatenz) und steigt um etwa 0,55 ms je Lebensjahr; die reine Entdeckungszeit eines Lichtreizes liegt bei etwa 131 ms (Woods et al., 2015). Das Erkennen eines bestimmten Wortes ist eine Auswahlreaktion und dauert länger; deshalb ist das Antwortfenster nie kürzer als 600 ms. Tipps früher als 150 ms nach Beginn des Zielworts gelten der Anzeige davor und werden nicht als Treffer gewertet; Doppeltipps innerhalb von 350 ms werden ignoriert.
- **Eingabe:** Touch-Web-Apps messen Zeiten um etwa 58–70 ms zu lang (Pronk et al., 2020); Zeiten sind deshalb nur innerhalb desselben Geräts vergleichbar.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Touch-Latenz und Bildrate beeinflussen die gemessene Zeit bis zum Tipp; bei 60 Hz entsprechen 350 ms etwa 21 Bildern. Trefferquoten und Zeiten sind nicht zwischen Geräten vergleichbar.
- **Zufällige Wortfolge:** Die Wörter werden bei jedem Durchgang neu und zufällig gezogen, das Zielwort steht vorher fest. Es gibt keinen festen Text, den man auswendig lernen könnte. Ab Stufe 7 sind mindestens 40 % der anderen Wörter gleich lang wie das Zielwort, die Wortform verrät es dann weniger.
- **Alter, Müdigkeit, Lesefähigkeit, Sprachkenntnis:** Sie beeinflussen das Erkennen kurzer Wörter; Ergebnisse sind nicht als Leseleistung zu deuten.
- **Zuverlässigkeit:** Eine Sitzung hat nur acht Durchgänge, die Stufe richtet sich nach Erfolg (zwei geschaffte Durchgänge in Folge machen es schwerer, ein misslungener leichter); Punktzahl und Stufe sind grobe Größen. Es gibt keine Normwerte, keine „Wörter pro Minute“ und keinen Vergleich mit anderen Personen.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (unklar):** Für die Aufgabe „Zielwort im Wortstrom antippen“ gibt es keine Trainingsstudie. Dass man darin mit Wiederholung besser wird, ist plausibel, weil man Ablauf und Gerät kennenlernt, aber nicht belegt.
- **Naher Transfer (fehlend):** Lesetempo bei gleichem Verständnis lässt sich durch Wort-für-Wort-Training nicht belegt steigern; bei schneller Anzeige ist das Verständnis eher schlechter (Rayner et al., 2016; Acklin & Papesh, 2017; Benedetto et al., 2015). Nach einem Schnelllesekurs stieg das Tempo von etwa 280 auf 400 Wörter pro Minute, das Verständnis sank von 81 auf 74 % (Calef et al., 1999, berichtet in Rayner et al., 2016); Erwachsene lesen im Mittel etwa 238 Wörter pro Minute (Sachtext) bzw. 260 (Roman) (Brysbaert, 2019). Nuancen: Beim reinen Entziffern kurzer Passagen ist die Wort-für-Wort-Anzeige sehr schnell möglich (Rubin & Turano, 1992); kurze Pausen zwischen Sätzen verbessern das Verständnis (Masson, 1983); Arbeitsgedächtnis und Maskierung begrenzen das Tempo (Primativo et al., 2016). Die Behauptung, 80 % der Lesezeit gingen für Augenbewegungen verloren, wird in der Fachübersicht ausdrücklich zurückgewiesen: Die Augen sind nur etwa 10 % der Zeit in Bewegung (Rayner et al., 2016).
- **Alltagstransfer (fehlend):** Ein Nutzen für Lesen, Studium oder Beruf ist nicht belegt. Für gutes Lesen zählen Lesepraxis, Wortschatz und passende Sehhilfe (Rayner et al., 2016; Legge & Bigelow, 2011).
- **Seriöse Formulierung:** „Du erkennst ein bekanntes Wort in einer Folge einzelner Wörter wieder – das ist kein Lesetraining. Ob sich das auf Lesen oder Alltag überträgt, ist nicht belegt.“

## 9. Auswahlhinweise für die KI

- **Passt, wenn** jemand ein bekanntes Wort in einer Folge einzelner Wörter wiedererkennen und bei anderen Wörtern zurückhaltend bleiben üben möchte, ruhig in der Mitte schauen kann und die Wörter der jeweiligen Sprache ohne Mühe liest. Auch als Anschauung, wie schnell eine Wort-für-Wort-Anzeige ist.
- **Weniger passend, wenn** es um besseres Lesen, Lesetempo, Konzentration im Alltag oder Augenentlastung geht oder wenn Reaktionszeiten oder Leseleistung gemessen werden sollen.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Wortwechsel am selben Ort mit höchstens 2,5 Wörtern pro Sekunde, ohne Blitze; Risiko vermutlich gering, aber nicht gemessen.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: starre Fixation, seltenes Blinzeln (Benedetto et al., 2015); Pausen und Blinzeln empfehlen.
  - `presbyopie_gleitsicht`, `sehbehinderung_niedriger_visus`: Wörter müssen mühelos lesbar sein; passende Lese- oder Bildschirmbrille für den Tablet-Abstand.
  - `nystagmus`: ruhige Fixation an einem Ort ist Kern der Aufgabe.
  - `lese_rechtschreib_schwaeche`, `kognitive_einschraenkung`, `aufmerksamkeitsprobleme`, `kinder_unter_6`: Lesen einzelner Wörter unter Zeitdruck kann frustrieren.
- **Praxisangabe, nicht belegt:** Rückt jemand beim Lesen oder am Bildschirm auffällig nahe an den Text heran, kann das ein Anlass sein, die Sehkorrektur und den Leseabstand prüfen zu lassen.
- **Warnzeichen:** Doppelbilder, plötzlicher einseitiger Sehverlust, Lichtblitze, neue Schleier, Kopfschmerz mit Sehverschlechterung oder neu auftretender Schwindel gehören ärztlich abgeklärt (Aufzählung der Warnsymptome in der Anamnese: Muchnick, 2008, S. 6, 17 und 28); ein Übungsprogramm ersetzt das nicht.
- **Kombiniert gut mit** 102 (Go/No-Go), 208 (ebenfalls ein Zeichenstrom mit Tippen oder Zurückhalten, aber mit seltenen Zielen über zwei Minuten), 109 (zeitliche Auflösung).
- **Abgrenzung:** 203 lässt ein Wort im Fluss einzelner Wörter wiedererkennen; 208 verlangt über zwei Minuten Aufmerksamkeit für ein seltenes Zeichen, 201 den Konflikt zwischen Richtung und Ort.

Keine Diagnose, kein Heil- oder Sehversprechen: Die Übung ist ein Spiel, kein Test der Lese- oder Sehfähigkeit.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

**Status:** Nicht umgesetzt (Stand 30.09.2026; `src/exercises/` enthält keine RSVP-Übung). Gründe: Das Schnelllese-Versprechen ist widerlegt (Abschnitt 3), das Verständnis leidet, der Lidschlag sinkt (Benedetto et al., 2015). Ein Optiker sollte keine Erwartung wecken, mit dieser Übung besser oder augenschonend zu lesen. Vorschlag in `docs/wissenschaft/04-konzentration-und-denken.md`, Abschnitt 3: ein „Wort-Blitz“ als Modus von Blitzblick (aktuell Fahrzeug und Stern) mit ehrlicher Formulierung („kein Schnelllesekurs“).

Schwächen des Originals und Vorgaben, falls je umgesetzt:
- **Antwortfenster kürzer als Reaktionszeit:** ab Stufe 2 nur durch Vorhersage lösbar. Besser: Wort einzeln zeigen, Maske, danach Auswahl unter 4 ähnlichen Wörtern; Anzeigedauer adaptiv (gewichtetes Up-Down auf 75–80 %, ganze Bilder, Untergrenze 50 ms), keine Wörter-pro-Minute-Anzeige.
- **Feste Schleife, feste Zielfolge:** Zufallswörter aus einer Liste je Sprache (DE, IT); getrennte Wertung, kein Vergleich zwischen Sprachen.
- **Englischer Text, kein Bezug zur Kundschaft:** deutsche und italienische Wörter, häufigkeits- und längengleich.
- **Kleine Zielwort-Schrift:** Schrift ≥ 0,4° x-Höhe (Seniorenmodus 0,6°), hoher Kontrast; Schriftgröße plattformweit einstellbar. Kein Ergebnis als Lesetest (das wäre ein Sehtest und gehört ins Geschäft).
- **Stufen nach Punkten statt Genauigkeit; Tabellen ohne Datengrundlage:** Stufen aus Schwelle ableiten, keine Perzentile.
- **Touch/Tastatur:** großer Antwortbereich, Tastenbedienung; Vollbildzwang entfällt oder wird ohne Abbruch behandelt.
- **Flimmern, Lidschlag:** keine Vollflächenblitze, Sitzungslänge kurz, Hinweis auf Blinzeln und Pausen.
- **Sprache:** nur neutrale Hinweise wie „Kleine Schrift anstrengend? Eine passende Nah- oder Bildschirmbrille kann helfen – wir beraten Sie gern.“ Keine Sehversprechen.

## 11. Quellen

### Von der Website angegeben
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin*, *124*(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (die Forschung spricht von „optimaler Blickposition“, nicht „ORP“; Wörter werden auch außerhalb erkannt, Rayner et al., 2016) – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So much to read, so little time: How do we read, and can speed reading help? *Psychological Science in the Public Interest*, *17*(1), 4–34. https://doi.org/10.1177/1529100615623267 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein (für „bis zu 80 % der Lesezeit“; die Übersicht widerlegt genau das: ≈ 10 %; Verdoppeln des Tempos ohne Verständnisverlust unwahrscheinlich)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, *9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein (für „144 Hz sichern präzise Frame-Intervalle ohne Flackern“; Studie misst Reaktionszeiten, nicht Bildflackern)
- *Ohne Quelle:* „Mit Training sind 400–600 WPM realistisch“ und „trainiert lexikalische Entschlüsselung im visuellen Wortformareal“ – **Prüfung:** keine Quelle angegeben; **stützt:** nein (siehe Abschnitt 3); „Erwachsene lesen 200–250 WPM“ – **stützt:** ja (Brysbaert, 2019). – Aussagen ohne Quelle, nur in der Arbeitsfassung; **stützt (öffentliche Fassung):** nein

### Weitere Fachliteratur
- Acklin, D., & Papesh, M. H. (2017). Modern speed-reading apps do not foster reading comprehension. *The American Journal of Psychology*, *130*(2), 183–199. https://doi.org/10.5406/amerjpsyc.130.2.0183 – statischer Text besser verstanden als RSVP mit 700/1.000 WPM
- Benedetto, S., Carbone, A., Pedrotti, M., Le Fevre, K., Bey, L. A. Y., & Baccino, T. (2015). Rapid serial visual presentation in reading: The case of Spritz. *Computers in Human Behavior*, *45*, 352–358. https://doi.org/10.1016/j.chb.2014.12.043 – Verständnis 60 vs. 72 %, Lidschlag 4,7 vs. 8,5 pro Minute
- Brysbaert, M. (2019). How many words do we read per minute? A review and meta-analysis of reading rate. *Journal of Memory and Language*, *109*, 104047. https://doi.org/10.1016/j.jml.2019.104047 – mittleres Lesetempo 238/260 Wörter/min
- Calabrèse, A., Cheong, A. M. Y., Cheung, S.-H., He, Y., Kwon, M., Mansfield, J. S., Subramanian, A., Yu, D., & Legge, G. E. (2016). Baseline MNREAD measures for normally sighted subjects from childhood to old age. *Investigative Ophthalmology & Visual Science*, *57*(8), 3836–3843. https://doi.org/10.1167/iovs.16-19580 – kritische Schriftgröße nach Alter
- Dehaene, S., & Cohen, L. (2011). The unique role of the visual word form area in reading. *Trends in Cognitive Sciences*, *15*(6), 254–262. https://doi.org/10.1016/j.tics.2011.04.003 – visuelles Wortformareal
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, *46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – kritische Flimmerfrequenzen
- Fricke, T. R., Tahhan, N., Resnikoff, S., Papas, E., Burnett, A., Ho, S. M., Naduvilath, T., & Naidoo, K. S. (2018). Global prevalence of presbyopia and vision impairment from uncorrected presbyopia. *Ophthalmology*, *125*(10), 1492–1499. https://doi.org/10.1016/j.ophtha.2018.04.013 – Alterssichtigkeit weltweit
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia*, *46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x – Grenzwerte für Blitze
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, *27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Gleitsicht und Blick-/Kopfbewegung – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Legge, G. E., & Bigelow, C. A. (2011). Does print size matter for reading? A review of findings from vision science and typography. *Journal of Vision*, *11*(5), 8. https://doi.org/10.1167/11.5.8 – Schriftgröße und Lesen
- Masson, M. E. J. (1983). Conceptual processing of text during skimming and rapid sequential reading. *Memory & Cognition*, *11*(3), 262–274. https://doi.org/10.3758/BF03196973 – Verständnis bei schneller Wortfolge, Pausen helfen
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnsymptome des Auges und neurologische Warnzeichen (S. 6, 17, 28)
- O'Regan, J. K., & Jacobs, A. M. (1992). Optimal viewing position effect in word recognition: A challenge to current theory. *Journal of Experimental Psychology: Human Perception and Performance*, *18*(1), 185–197. https://doi.org/10.1037/0096-1523.18.1.185 – optimale Blickposition im Wort – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science*, *68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag bei Bildschirmarbeit
- Primativo, S., Spinelli, D., Zoccolotti, P., De Luca, M., & Martelli, M. (2016). Perceptual and cognitive factors imposing "speed limits" on reading rate: A study with the rapid serial visual presentation. *PLoS ONE*, *11*(4), e0153786. https://doi.org/10.1371/journal.pone.0153786 – Grenzen des RSVP-Tempos
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, 52(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch-Latenz von Web-Apps
- Raymond, J. E., Shapiro, K. L., & Arnell, K. M. (1992). Temporary suppression of visual processing in an RSVP task: An attentional blink? *Journal of Experimental Psychology: Human Perception and Performance*, *18*(3), 849–860. https://doi.org/10.1037/0096-1523.18.3.849 – Attentional Blink
- Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So much to read, so little time: How do we read, and can speed reading help? *Psychological Science in the Public Interest*, *17*(1), 4–34. https://doi.org/10.1177/1529100615623267 – Fixationsdauer, Sakkadenanteil, Schnelllese-Training und Verständnis
- Repp, B. H. (2005). Sensorimotor synchronization: A review of the tapping literature. *Psychonomic Bulletin & Review*, *12*(6), 969–992. https://doi.org/10.3758/BF03206433 – Tippen im Takt, Vorhersage statt Reaktion – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Rolfs, M. (2009). Microsaccades: Small steps on a long way. *Vision Research*, *49*(20), 2415–2441. https://doi.org/10.1016/j.visres.2009.08.010 – Mikrosakkaden bei Fixation – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Rubin, G. S., & Turano, K. (1992). Reading without saccadic eye movements. *Vision Research*, *32*(5), 895–902. https://doi.org/10.1016/0042-6989(92)90032-E – RSVP-Entziffern sehr schnell, minimale Anzeigedauer
- Schotter, E. R., Tran, R., & Rayner, K. (2014). Don't believe what you read (only once): Comprehension is supported by regressions during reading. *Psychological Science*, *25*(6), 1218–1226. https://doi.org/10.1177/0956797614531148 – Rücksprünge stützen das Verständnis – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology*, *3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – digitale Augenbelastung
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, *9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – einfache Reaktionszeit und Gerätelatenz
