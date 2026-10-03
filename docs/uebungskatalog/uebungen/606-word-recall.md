---
# ===== Kennung =====
nr: 606
kennung: word-recall
name: "Wortliste merken (Wiedererkennen)"
name_original: "Wortgedächtnis-Test – Wörter merken und abrufen (Wort-Recall Pro)"
kapitel: "Gedächtnis"
kapitel_original: "memory"
unterkapitel_original: "short-term-memory"
quelle_url: "https://skilldrills.online/de/drills/memory/short-term-memory/word-recall"
blickfit_umsetzung: {kennung: "wortliste", name: "Wortliste", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/wortliste/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Einige Wörter erscheinen nacheinander, jedes etwa zwei Sekunden lang; danach wählt man aus einer Auswahl aus gezeigten und neuen Wörtern die gezeigten aus. Gelingt die Liste, kommt ein Wort dazu, sonst fällt eines weg."
ziel_funktionen: [kurzzeitgedaechtnis_verbal, lesen_sprache]
eingabe: [tastatur, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Adaptive 1-up/1-down-Treppe je Durchgang (Code): Start mit 3 Wörtern, vollständig und ohne falsches Wort → +1 Wort (max. 12), sonst oder nach 12 s ohne Absenden → −1 Wort (min. 3). Die Merkphase bleibt bei jeder Länge 2 s. Keine manuellen Einstellungen."
messgroessen: ["Punkte (≈ 150 × (1 + 0,15 × (Länge − 3)) je fehlerfreier Liste)", "Listenlänge am Rundenende (angezeigt als 'Max. Wörter')", "Anteil fehlerfreier Listen ('Genauigkeit')", "sinnvoll: Anzahl richtig erinnerter Wörter je Liste (Teilpunkte)", "sinnvoll: längste fehlerfrei erinnerte Liste und Fehlerart (ausgelassen / falsch / aus früherer Liste)"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 1
    blickfolge: 0
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 0
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 3
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 2
    antizipation: 0
    entscheidung_wahlreaktion: 0
    lesen_sprache: 3
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 1
    zielbewegung_tempo: 0
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 2
    fingersequenz_bimanual: 2
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 3
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 3

# ===== Auswahlhilfe =====
voraussetzungen: ["sicher und schnell Deutsch lesen (Wortliste nur deutsch; keine italienische Version gefunden)", "Wörter richtig schreiben und zügig tippen können (Tastatur oder Bildschirmtastatur)", "Schrift in 30–60 cm Abstand ohne Verzögerung scharf sehen (bei Alterssichtigkeit passende Nahkorrektur)", "keine Farbunterscheidung nötig"]
vorsicht_bei: [lese_rechtschreib_schwaeche, sehbehinderung_niedriger_visus, gesichtsfeldausfall, presbyopie_gleitsicht, aufmerksamkeitsprobleme, kognitive_einschraenkung, tremor_parkinson, hand_arm_beschwerden, kinder_unter_6, migraene_lichtempfindlich, photosensitive_epilepsie]
geeignet_fuer: ["kurzes, spielerisches Merken kleiner Wortlisten für geübte Leser:innen, ohne Tastatur", "Ausprobieren, wie viele Wörter man bei etwa zwei Sekunden Anzeige je Wort behält", "sitzende, ruhige Übung ohne Bewegungs- oder Farbreize (weich ein- und ausgeblendete Wörter, kein Blitzen)", "Selbstvergleich über Wochen auf demselben Gerät und in derselben Sprache"]
weniger_geeignet_fuer: ["Einüben aufwendiger Merkstrategien (Geschichte, Bilder): etwa zwei Sekunden je Wort reichen dafür nicht", "Menschen, die die gewählte Sprache (Deutsch oder Italienisch) nur als Zweitsprache sprechen", "Menschen, die Wörter nicht zügig lesen können", "Einschätzung der 'Gedächtnisleistung' oder Vergleich mit Normen (nicht normiert, keine Diagnose)", "Menschen, die eine Alles-oder-nichts-Wertung schnell frustriert (ab 9 Wörtern ist eine Abweichung erlaubt)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Wortlistenlernen verbessert sich mit Übung und vor allem mit Strategien deutlich (Geschichtenmethode 93 % vs. 13 % im späteren Abruf nach 12 seriell gelernten Listen, Bower & Clark 1969; Loci-Training, Dresler et al. 2017), doch diese Strategien brauchen Minuten, nicht Sekunden; Online-Gedächtnistraining zeigte keinen Transfer auf untrainierte Aufgaben (Owen et al. 2010), Metaanalysen mit aktiven Kontrollgruppen keinen fernen Transfer (Melby-Lervåg et al. 2016)."
aehnliche_uebungen: [602, 603, 604, 605, 601, 607, 203, 207]
stichworte: ["Wortliste", "freie Wiedergabe", "free recall", "verbales Kurzzeitgedächtnis", "Wortspanne", "serieller Positionseffekt", "Lesen", "Tippen", "Bildschirmtastatur", "adaptive Treppe", "Sprachabhängigkeit", "Zeitdruck"]
---

# 606 · Wortliste merken (Wiedererkennen)

> Original: „Wortgedächtnis-Test – Wörter merken und abrufen“ („Wort-Recall Pro“) – skilldrills.online, Kapitel Gedächtnis (`memory`, Unterkapitel `short-term-memory`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Einige Wörter (je nach Stufe 5 bis 12) erscheinen nacheinander in der Bildmitte, jedes etwa zwei Sekunden lang, weich ein- und ausgeblendet. Danach sieht man eine Auswahl aus den gezeigten und aus neuen, ähnlich langen Wörtern, tippt die gezeigten an und bestätigt mit „Fertig“. Gemessen wird also das Wiedererkennen, nicht Tippen oder Rechtschreiben. Eine Liste gilt als gelungen, wenn nichts Falsches gewählt und nichts vergessen wurde (ab 9 Wörtern ist eine Abweichung erlaubt); dann kommt ein Wort dazu, sonst fällt eines weg. Deutsch und Italienisch haben getrennte Wortlisten, und in einer Sitzung werden möglichst keine Wörter wiederholt. Eine Sitzung hat eine feste Zahl von Listen.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Chunk `84417-…js`, deutsche Texte und Wortliste im Seiten-HTML, Stand 29.09.2026); nur Mechanik beschrieben.

- **Wortliste (Code/HTML):** Die deutsche Seite übergibt eine eigene Liste mit **50 Substantiven** (Apfel, Brücke, Schloss … Uhr, Spiegel; 3–15 Buchstaben, Ø 6,0). Der englische Ersatz im Spielcode (49 Wörter) greift nur ohne Übersetzung – die Vermutung „englische Wörter auch auf /de/“ bestätigt sich also nicht. Eine italienische Seite gab es nicht (Abruf von `/it/…` führte zur Startseite). Die Liste mischt Konkreta (Hammer, Kerze) mit Abstrakta (Weisheit, Ehre, Ruhm) und enthält leicht gruppierbare Kategorien (Silber, Gold, Bronze, Kupfer; Sturm, Wolke, Donner).
- **Darbietung (Code):** Je Durchgang werden n Wörter ohne Wiederholung zufällig aus den 50 gezogen und **alle gleichzeitig** gezeigt (weiße, fette Schrift 24 px ab 640 px Fensterbreite, sonst 18 px; Kästchen ≥ 7 rem breit, Block ≤ 672 px, mehrzeilig umbrochen). **Merkphase immer 2 s** (in 0,2-s-Schritten heruntergezählt), unabhängig davon, ob 3 oder 12 Wörter dastehen; kein Überspringen. Die Seite nennt keine Dauer.
- **Eingabe (Code):** Mehrzeiliges Textfeld (Autokorrektur, Rechtschreibprüfung und Großschreibung aus), Trennung durch Leerzeichen, Komma oder Zeilenumbruch; Absenden mit Enter oder Knopf. Groß-/Kleinschreibung egal, Akzente und Umlautpunkte werden entfernt („Brücke“ = „brucke“, aber „Bruecke“ gilt als falsch). **12 s** nach Beginn der Eingabe ohne Absenden = Fehlversuch.
- **Wertung (Code):** Nur **vollständige Listen ohne falsches Wort** zählen; ein einziges fehlendes oder überzähliges Wort macht den Durchgang zum Fehler (Alles oder nichts). Punkte je Treffer round(150 × (1 + 0,15 × (n − 3))): 150 bei 3, ≈ 352 bei 12 Wörtern = „bis +135 %“. Fehler kosten keine Punkte (wie im Regeltext). Pause 1,5 s nach Treffer, 2 s nach Fehler. „Genauigkeit“ = Anteil fehlerfreier Listen. Bei jedem Fehler und nach Ablauf der 12 s erscheint ein roter Schimmer über der Spielfläche (zur Mitte hin Rot mit 50 % Deckkraft, blendet in 0,45 s aus; Schalter „Miss Flash“, standardmäßig an) – derselbe Effekt wie in den übrigen Gedächtnisübungen 601–607; der Regeltext nennt ihn nicht.
- **Uhr (Code):** Die 45 s laufen **nur während Eingabe und Rückmeldung**, nicht in der Merkphase. Tipptempo zählt also voll mit.
- **„Max. Wörter“/Bestwert (Code):** Angezeigt wird die Listenlänge **beim Rundenende** – nach einem Treffer also eine Stufe mehr, als man geschafft hat. Endnote aus den Punkten bezogen auf 1.100.
- **Erreichbarkeit (Herleitung):** Summe fehlerfreier Listen 3 → 8 Wörter ≈ 1.237 Punkte, 3 → 7 ≈ 975. Die Stufe „1.100+ Punkte“ verlangt also ≥ 6 Treffer (am schnellsten 6 in Folge bis 8 Wörter). Dafür müssen in ≈ 36–38 s (45 s minus 5–6 × 1,5 s Pause) ≈ 31–33 Wörter (≈ 220–230 Zeichen) getippt werden: ≈ 70–77 Wörter/min im Standardmaß (5 Zeichen = 1 Wort) – das schaffen am Computer nur etwa die schnellsten 10 % (> 78 WPM beim reinen Abtippen; Dhakal et al., 2018), hier kommt noch das Erinnern dazu.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite beschreibt die Übung als „neuropsychologisches Verfahren“ zur Messung des verbalen Kurzzeitgedächtnisses, verweist auf Ebbinghaus, Reys RAVLT, Murdocks serielle Positionskurve und Craik & Lockhart. Sie verspricht eine „erweiterte“ Wortspanne und schnelleren Abruf (Zielgruppen: Schüler:innen, Studierende, Berufstätige). Tipps: Geschichten bilden, duale Kodierung (Bild + Klang), Kategorien, „Recency-first“ (letzte Wörter zuerst tippen, sie „verblassen nach 3–5 s“). Eine Tabelle ordnet Wortspannen Perzentilen zu („8–11+ Wörter = 99. Perzentil“, „Abruftakt unter 800 ms“, „4–5 Wörter = 50. Perzentil“).

- **Belegt:** Freies Erinnern ergibt eine U-förmige Positionskurve (Murdock, 1962). Semantische Verarbeitung führt zu besserem Behalten als oberflächliche (Craik & Tulving, 1975). Menschen ordnen „unverbundene“ Wörter beim Erinnern selbst in Gruppen (Tulving, 1962). Konkrete Wörter werden besser behalten (Fliessbach et al., 2006). Die FAQ ist ehrlich: Man wird vor allem in dieser Aufgabe besser.
- **Überzogen:** „Bewiesen“ (Craik & Lockhart ist ein theoretischer Rahmen). „Echoischer Puffer“ und „3–5 s“: Recency schwindet erst nach ≈ 10–30 s Ablenkung (Glanzer & Cunitz, 1966); einen akustischen Code haben nur *gehörte* Wörter (Penney, 1989) – hier wird gelesen.
- **Passt nicht zur eigenen Übung:** Die Geschichtenmethode brauchte im Versuch **1–2 min pro 10-Wörter-Liste**, und der Vorteil zeigte sich erst im späteren Abruf – sofort erinnerten beide Gruppen perfekt (Bower & Clark, 1969). In 2 s für bis zu 12 Wörter lassen sich weder Geschichten noch „halbsekündige Bilder“ pro Wort bilden. Die serielle Positionskurve gilt für *nacheinander* gezeigte Wörter; hier stehen alle gleichzeitig da, die Reihenfolge bestimmt der eigene Blick.
- **Nicht belegt:** Die Tabelle hat keine Datengrundlage (die Seite sammelt nach eigener Aussage keine Daten). Der RAVLT nutzt 15 vorgelesene Wörter und mehrere Lerndurchgänge; seine Normen sind nicht übertragbar (vorgelesen vs. gelesen unterscheidet sich; Van der Elst et al., 2005). Einen „Abruftakt“ misst der Code gar nicht. „Konvergiert präzise“: Eine 1-up/1-down-Treppe schwankt um den 50-%-Punkt (Levitt, 1971), und eine Runde hat nur ≈ 3–7 Durchgänge (Herleitung aus 12-s-Limit und Pausen). Woods et al. (2015) betrifft nur die einfache Reaktionszeit.

## 4. Optische und okulomotorische Grundlagen

- **Schriftgröße:** Flüssiges Lesen gelingt bei x-Höhen von etwa 0,2° bis 2° (Legge & Bigelow, 2011); die kritische Schriftgröße bleibt bis etwa 23 Jahre gleich, steigt dann langsam und ab etwa 68 Jahren deutlicher (0,08 → 0,21 → 0,34 logMAR bis 81 Jahre; Calabrèse et al., 2016). Zur Orientierung: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°. Die Sehschärfe begrenzt selten, aber **unscharfes Sehen verlangsamt das Lesen**.
- **Lesetempo und Blicksprünge:** Stilles Lesen liegt bei etwa 238 Wörtern pro Minute, also etwa 250 ms pro Wort (Brysbaert, 2019); Lesefixationen dauern etwa 225 ms, die Sakkadenlatenz beträgt mindestens 150–175 ms (Rayner, 1998). Weil die Wörter einzeln an derselben Stelle erscheinen und etwa zwei Sekunden stehen bleiben, bleibt Zeit zum Lesen und zum Einprägen (zum Vergleich: das Festigen eines Chunks im Langzeitgedächtnis dauert etwa 5–10 s; Simon, 1974). Nur die Auswahl danach verlangt Blicksprünge und eine kurze visuelle Suche (`sakkaden` 2).
- **Blickfeld und Brille:** Die Auswahl steht in zwei Spalten (bei Platzmangel drei oder vier). Bei Gleitsichtbrille sind seitliche Wörter durch den Nahteil unscharf, man muss den Kopf drehen – der unerwünschte Astigmatismus lässt sich nur umverteilen, nicht beseitigen (Sheedy, 2004). Am Monitor in 60–70 cm ist eine Arbeitsplatzbrille günstiger; ab etwa 40 Jahren reicht die Akkommodation ohne Nahkorrektur oft nicht (Charman, 2008).
- **Farbe und Licht:** Kein Farbsehen nötig; die Rückmeldung erscheint mit Haken, Kreuz und Rahmenform, nicht nur in Farbe. Keine Bewegungsreize. Die Wörter werden weich ein- und ausgeblendet, es gibt kein Blitzen und kein rotes Aufleuchten (WCAG 2.2, SC 2.3.1; gesättigtes Rot gilt als Zusatzfaktor für Lichtempfindliche, Fisher et al., 2005). Bei trockenem Auge Pausen einplanen; der Lidschlag sinkt am Bildschirm (Tsubota & Nakamori, 1993).

## 5. Neurowissenschaftliche Grundlagen

- **Kurzzeit- und Langzeitanteil:** Beim freien Erinnern nacheinander gezeigter Wörter ergibt sich eine U-förmige Positionskurve (Murdock, 1962): Die letzten Wörter stammen vor allem aus dem Kurzzeitspeicher, die ersten aus dem Langzeitgedächtnis (Primacy bleibt nach Ablenkung, Recency nicht; Glanzer & Cunitz, 1966). Ob sich die Kurve beim Wiedererkennen ebenso zeigt, ist für diese Aufgabe nicht untersucht.
- **Phonologische Schleife:** Gelesene Wörter werden innerlich in Laute übersetzt und durch stilles Mitsprechen gehalten; lange Wörter verkleinern die Spanne (Baddeley et al., 1975). Speicher im linken Gyrus supramarginalis, Mitsprechen im Broca-Areal (PET; Paulesu et al., 1993). „Sonnenuntergang“ belastet die Schleife mehr als „Tal“; die Wortlisten enthalten daher nur kurze Wörter. Einen unmittelbaren akustischen Code haben vor allem *gehörte* Wörter (Penney, 1989); bei gelesenen entsteht der Lautcode durch inneres Sprechen.
- **Einprägen:** Semantische Verarbeitung führt zu besserem Behalten als oberflächliche (Craik & Tulving, 1975). Menschen ordnen „unverbundene“ Wörter beim Erinnern selbst in Gruppen (Tulving, 1962). Ob ein gelesenes Wort später erinnert wird, lässt sich aus der Aktivität im **linken präfrontalen und temporalen Kortex** während des Lesens vorhersagen (fMRT; Wagner et al., 1998). Häufige und konkrete Wörter sind im Vorteil (Hulme et al., 1997; Fliessbach et al., 2006); für konkrete Wörter spricht auch die Theorie der dualen Kodierung (Paivio, 1991). Die Wortlisten bestehen deshalb aus häufigen, konkreten, eindeutigen Hauptwörtern. Dass die Übung diese Regionen „trainiert“, ist nicht belegt.
- **Störung durch frühere Listen:** Wörter aus einer früheren Liste können sich aufdrängen (proaktive Interferenz) und fälschlich als „gesehen“ erscheinen (`inhibition` 1). Deshalb werden in einer Sitzung zuerst Wörter gezogen, die noch nicht vorkamen; die Auswahlwörter sind ähnlich lang wie die gezeigten, die Länge verrät also nichts.

## 6. Motorische Grundlagen

- Die Antwort besteht aus Antippen der Auswahlfelder (mindestens 56 Pixel hoch) und einem Tipp auf „Fertig“; es gibt kein Zeitlimit. Tipp- und Rechtschreibtempo spielen keine Rolle. Bei freier Eingabe über eine Tastatur wäre das anders: Am Computer tippen Freiwillige im Mittel 51,6 Wörter pro Minute (n = 168.000; Dhakal et al., 2018), auf Mobilgeräten 36,2 (n = 37.370; Palin et al., 2019); dabei würde mit wachsender Liste zunehmend das Tippen statt das Gedächtnis gemessen.
- Tremor oder Handbeschwerden stören wenig, weil nur getippt, nicht geschrieben wird; ein versehentlich gewähltes Wort lässt sich vor „Fertig“ wieder abwählen.

## 7. Einflussfaktoren und Messgrenzen

- **Wenige Listen:** Eine Sitzung hat nur wenige Listen; eine 1-auf/1-ab-Treppe schwankt zudem um den 50-%-Punkt (Levitt, 1971). Schon bei etablierten verbalen Arbeitsgedächtnis-Spannen lag die Retest-Korrelation nach etwa 6 Wochen nur bei r = 0,52–0,81, und Einteilungen in Spannen-Gruppen nach *einem* Test waren zwischen Sitzungen sehr instabil (139 Personen; Waters & Caplan, 2003). Allgemein streuen Messungen am Menschen; aussagekräftiger als ein Einzelwert ist der Verlauf über mehrere Sitzungen (zum Grundsatz der Wiederholmessung: Mountford et al., 2004, S. 44).
- **Gelungen oder nicht:** Eine Liste zählt nur als gelungen, wenn nichts Falsches gewählt und nichts vergessen wurde (ab 9 Wörtern ist eine Abweichung erlaubt); 5 von 6 richtigen Wörtern zählt also nicht. Deshalb werden zusätzlich die richtig erkannten Wörter und die falschen Alarme angezeigt.
- **Sprache:** Es gibt getrennte Wortlisten für Deutsch und Italienisch. In der weniger gut beherrschten Zweitsprache ist die Arbeitsgedächtnisspanne kleiner (Service et al., 2002); Vergleiche über Sprachen hinweg sind nicht sinnvoll.
- **Lesen:** Kinder mit Leseschwäche zeigen in Kurzzeitgedächtnisaufgaben im Mittel einen Nachteil von d ≈ −0,61 (Metaanalyse; Swanson et al., 2009; für Erwachsene hier nicht geprüft); dazu kommt hier das Lesetempo.
- **Alter und Darbietung:** Die Leistung im verbalen Lerntest sinkt schon früh mit dem Alter; auch die Darbietungsart (vorgelesen oder gelesen) verändert das Ergebnis (Van der Elst et al., 2005). Gelesene Listen sind mit Normen aus vorgelesenen Listen nicht vergleichbar.
- **Klinisches Screening:** In der Untersuchung wird das Kurzzeitgedächtnis im Gespräch geprüft, indem die Person sich drei geläufige Wörter merkt und nach einigen Minuten wiederholt (Muchnick, 2008, S. 29–30). Diese Übung ist kein solches Screening, liefert keinen Normwert und erlaubt keine Diagnose.
- **Übung, Müdigkeit:** Wiederholtes Testen hebt Werte (Calamia et al., 2012); Schlafmangel senkt die Kurzzeitgedächtnisleistung (Lim & Dinges, 2010). Sinnvoll ist nur der Vergleich mit sich selbst auf demselben Gerät.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – stark:** Online-Training verbessert jede geübte Aufgabe (Owen et al., 2010). Mit Strategien steigt das Wortlisten-Behalten stark: Geschichtenmethode 93 % gegenüber 13 % im späteren Abruf nach 12 seriell gelernten 10-Wort-Listen, bei 24 Studierenden (Bower & Clark, 1969); 40 × 30 min Loci-Training über 6 Wochen verbesserte das Wortlernen mehr als N-Back-Training, noch nach 4 Monaten (Dresler et al., 2017). Das ist **Strategie**, nicht größere Grundkapazität. Bei etwa zwei Sekunden je Wort ist Zeit für einfache Strategien wie Gruppieren oder eine Mini-Geschichte, nicht aber für aufwendige Methoden: Die Geschichtenmethode brauchte im Versuch 1–2 Minuten je Liste.
- **Naher Transfer – schwach:** Strategietraining bei gesunden Älteren verbesserte Gedächtnismaße um 0,31 SD stärker als in Kontrollgruppen (95-%-KI 0,22–0,39; 35 Studien; Gross et al., 2012) – das gilt für gezielt geschulte Strategien, nicht für diese Kurzübung.
- **Alltagstransfer – fehlend:** Bei Owen et al. (2010) übertrugen sich die Trainingsgewinne nicht auf untrainierte Vergleichstests (darunter eine Zahlenspanne); die Veränderungen lagen im Bereich der Kontrollgruppe. Zu Alltagseffekten dieser Übung gibt es keine Daten. Gegen aktive Kontrollgruppen gibt es keinen fernen Transfer (Melby-Lervåg et al., 2016; Simons et al., 2016).

## 9. Auswahlhinweise

- **Passt, wenn …** geübte Leser:innen kurz und spielerisch kleine Wortlisten merken und wiedererkennen wollen; ohne Tastatur, am Tablet gut geeignet; ohne Bewegungs- oder Farbreize.
- **Weniger passend, wenn …** aufwendige Merkstrategien geübt werden sollen (zu wenig Zeit); die gewählte Sprache nur Zweitsprache ist; die Alles-oder-nichts-Wertung schnell frustriert; eine „Einstufung“ erwartet wird (keine Normen, keine Diagnose). Für reines Ziffernmerken → 602.
- **Vorsicht / anpassen bei …** `lese_rechtschreib_schwaeche` (Lesen jedes Wortes in etwa zwei Sekunden); `sehbehinderung_niedriger_visus`, `gesichtsfeldausfall` und `presbyopie_gleitsicht` (Wörter müssen sicher gelesen werden; die Auswahl verteilt sich über den Bildschirm; passende Nahkorrektur, Kopf mitdrehen; Gesichtsfeldausfälle folgen dem Verlauf der Sehbahn, Muchnick, 2008, S. 32, und die Übung ersetzt keine Untersuchung); `aufmerksamkeitsprobleme` (ein kurzes Abschweifen kostet ein Wort); `kognitive_einschraenkung` (Alles-oder-nichts, keine Test-Anmutung); `tremor_parkinson`, `hand_arm_beschwerden` (Antippen kleiner Felder; die Felder sind mindestens 56 Pixel hoch); `kinder_unter_6` (Lesen nötig); `migraene_lichtempfindlich`, `photosensitive_epilepsie` (weich ein- und ausgeblendete Wörter, kein Blitzen, kein rotes Aufleuchten; vorsorglich gelistet, bei Beschwerden abbrechen). Bei Doppelbildern, plötzlichem Sehverlust, Schwindel oder Kopfschmerz mit Sehverschlechterung die Übung abbrechen und ärztlich abklären lassen (vgl. Muchnick, 2008, S. 6, 28).
- **Kombiniert gut mit …** 602 (Zahlenspanne ohne Wörter), 203 (Schnelllesen), 604 (N-Back), 605 (Objekt-Ort als visuelles Gegenstück), 207 (Zahlen-Symbol-Tempo).
- **Abgrenzung in der Gruppe (keine Dublette):** Am nächsten verwandt ist 602 (Liste behalten, 1-auf/1-ab-Treppe). 602 verlangt aber die Reihenfolge und ein Zahlenfeld; 606 verlangt das Wiedererkennen ganzer Wörter in beliebiger Reihenfolge. Einen ähnlichen Aufbau („alles zeigen, alles in beliebiger Reihenfolge wiedergeben“) hat 603 mit Rasterfeldern statt Wörtern (sprachfrei). Innerhalb der Gruppe ist 606 die einzige Übung mit `lesen_sprache` 3 und `sprachabhaengigkeit` 3.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- Merkzeit mit der Listenlänge wachsen lassen (z. B. ≈ 1–2 s pro Wort) oder Wörter **nacheinander** zeigen; dann sind Strategien möglich und die Positionskurve sinnvoll.
- **Antwort ohne Tippen:** Wörter aus einer Auswahl antippen (Wiedererkennen, mit Ablenkern) oder Anfangsbuchstaben-Hilfe; ideal fürs Tablet. Freies Tippen nur optional mit großzügigem oder abschaltbarem Zeitlimit.
- Teilpunkte je richtigem Wort; Fehlerarten getrennt zeigen (ausgelassen, falsch, aus Vorliste). Tippfehler tolerieren (z. B. Editierabstand 1, „ue“ = „ü“).
- Runde nach Durchgängen (z. B. 10) statt 45 s; keine Perzentil- oder Normtabelle; „Max. Wörter“ = längste geschaffte Liste.
- **Zweisprachige Wortlisten DE/IT**, je Sprache nach Häufigkeit, Konkretheit und Länge abgeglichen (Hulme et al., 1997; Baddeley et al., 1975); großer Wortpool, damit Vorlisten nicht stören.
- Kein roter Fehler-Schimmer als Voreinstellung.
- Schrift ≥ 0,4° x-Höhe bei 40 cm (≈ 28–32 px am Tablet), Wörter mittig in höchstens zwei Zeilen (≤ ±6°), hoher Kontrast. Optional Vorlesen (dann andere Modalität, nicht mit gelesener Version vergleichen).

## 11. Quellen

### Von der Website angegeben

- Murdock, B. B., Jr. (1962). The serial position effect of free recall. *Journal of Experimental Psychology*, 64(5), 482–488. https://doi.org/10.1037/h0045106 – **Prüfung:** DOI stimmt ✓ (Inhalt über Sekundärquellen); **stützt:** ja für die U-Kurve bei nacheinander gezeigten Wörtern; nein für „echoischer Puffer, 3–5 s“ (Glanzer & Cunitz, 1966; Penney, 1989).
- Tulving, E. (1962). Subjective organization in free recall of „unrelated“ words. *Psychological Review*, 69(4), 344–354. https://doi.org/10.1037/h0043150 – **Prüfung:** DOI stimmt ✓; **stützt:** ja (subjektive Organisation beim freien Erinnern).

### Weitere Fachliteratur

- Baddeley, A. D., Thomson, N., & Buchanan, M. (1975). Word length and the structure of short-term memory. *Journal of Verbal Learning and Verbal Behavior*, 14(6), 575–589. https://doi.org/10.1016/S0022-5371(75)80045-4 – Wortlängeneffekt.
- Bower, G. H., & Clark, M. C. (1969). Narrative stories as mediators for serial learning. *Psychonomic Science*, 14(4), 181–182. https://doi.org/10.3758/BF03332778 – Geschichtenmethode: 1–2 min je Liste, 93 % vs. 13 % (Volltext gelesen).
- Brysbaert, M. (2019). How many words do we read per minute? A review and meta-analysis of reading rate. *Journal of Memory and Language*, 109, 104047. https://doi.org/10.1016/j.jml.2019.104047 – Lesetempo 238 Wörter/min.
- Calabrèse, A., Cheong, A. M. Y., Cheung, S.-H., He, Y., Kwon, M., Mansfield, J. S., Subramanian, A., Yu, D., & Legge, G. E. (2016). Baseline MNREAD measures for normally sighted subjects from childhood to old age. *Investigative Ophthalmology & Visual Science*, 57(8), 3836. https://doi.org/10.1167/iovs.16-19580 – kritische Schriftgröße im Altersverlauf
- Calamia, M., Markon, K., & Tranel, D. (2012). Scoring higher the second time around: Meta-analyses of practice effects in neuropsychological assessment. *The Clinical Neuropsychologist*, 26(4), 543–570. https://doi.org/10.1080/13854046.2012.680913 – Testwiederholung hebt Werte
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry*, 91(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Akkommodation im Alter
- Craik, F. I. M., & Tulving, E. (1975). Depth of processing and the retention of words in episodic memory. *Journal of Experimental Psychology: General*, 104(3), 268–294. https://doi.org/10.1037/0096-3445.104.3.268 – semantische Verarbeitung.
- Dhakal, V., Feit, A. M., Kristensson, P. O., & Oulasvirta, A. (2018). Observations on typing from 136 million keystrokes. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems* (S. 1–12). ACM. https://doi.org/10.1145/3173574.3174220 – Tipptempo Tastatur 51,6 WPM (Volltext, Tab. 3).
- Dresler, M., Shirer, W. R., Konrad, B. N., Müller, N. C. J., Wagner, I. C., Fernández, G., Czisch, M., & Greicius, M. D. (2017). Mnemonic training reshapes brain networks to support superior memory. *Neuron*, 93(5), 1227–1235.e6. https://doi.org/10.1016/j.neuron.2017.02.003 – Loci-Training für Wortlisten.
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, 46(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Blitzfrequenzen, Rot als Risikofaktor
- Fliessbach, K., Weis, S., Klaver, P., Elger, C. E., & Weber, B. (2006). The effect of word concreteness on recognition memory. *NeuroImage*, 32(3), 1413–1421. https://doi.org/10.1016/j.neuroimage.2006.06.007 – Konkretheitsvorteil.
- Glanzer, M., & Cunitz, A. R. (1966). Two storage mechanisms in free recall. *Journal of Verbal Learning and Verbal Behavior*, 5(4), 351–360. https://doi.org/10.1016/S0022-5371(66)80044-0 – Recency/Primacy, Ablenkung 10–30 s.
- Gross, A. L., Parisi, J. M., Spira, A. P., Kueider, A. M., Ko, J. Y., Saczynski, J. S., Samus, Q. M., & Rebok, G. W. (2012). Memory training interventions for older adults: A meta-analysis. *Aging & Mental Health*, 16(6), 722–734. https://doi.org/10.1080/13607863.2012.667783 – Strategietraining Ältere, 0,31 SD (PubMed-Abstract).
- Hulme, C., Roodenrys, S., Schweickert, R., Brown, G. D. A., Martin, S., & Stuart, G. (1997). Word-frequency effects on short-term memory tasks: Evidence for a redintegration process in immediate serial recall. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 23(5), 1217–1232. https://doi.org/10.1037/0278-7393.23.5.1217 – Worthäufigkeit.
- Legge, G. E., & Bigelow, C. A. (2011). Does print size matter for reading? A review of findings from vision science and typography. *Journal of Vision*, 11(5), 8. https://doi.org/10.1167/11.5.8 – Schriftgrößen für flüssiges Lesen
- Levitt, H. (1971). Transformed up-down methods in psychoacoustics. *The Journal of the Acoustical Society of America*, 49(2B), 467–477. https://doi.org/10.1121/1.1912375 – 1-up/1-down → 50-%-Punkt.
- Lim, J., & Dinges, D. F. (2010). A meta-analysis of the impact of short-term sleep deprivation on cognitive variables. *Psychological Bulletin*, 136(3), 375–389. https://doi.org/10.1037/a0018883 – Schlafmangel
- Melby-Lervåg, M., Redick, T. S., & Hulme, C. (2016). Working memory training does not improve performance on measures of intelligence or other measures of „far transfer“. *Perspectives on Psychological Science*, 11(4), 512–534. https://doi.org/10.1177/1745691616635612 – kein ferner Transfer.
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messwerte streuen, Wiederholmessung sinnvoll (S. 44)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28), Gedächtnisscreening im Gespräch (S. 29–30), Gesichtsfeldausfälle nach Sehbahnverlauf (S. 32)
- Owen, A. M., Hampshire, A., Grahn, J. A., Stenton, R., Dajani, S., Burns, A. S., Howard, R. J., & Ballard, C. G. (2010). Putting brain training to the test. *Nature*, 465(7299), 775–778. https://doi.org/10.1038/nature09042 – Übungseffekt ohne Transfer.
- Paivio, A. (1991). Dual coding theory: Retrospect and current status. *Canadian Journal of Psychology*, 45(3), 255–287. https://doi.org/10.1037/h0084295 – duale Kodierung, Konkretheitsvorteil
- Palin, K., Feit, A. M., Kim, S., Kristensson, P. O., & Oulasvirta, A. (2019). How do people type on mobile devices? Observations from a study with 37,000 volunteers. In *Proceedings of MobileHCI '19* (S. 1–12). ACM. https://doi.org/10.1145/3338286.3340120 – Tipptempo mobil 36,2 WPM (Abstract).
- Paulesu, E., Frith, C. D., & Frackowiak, R. S. J. (1993). The neural correlates of the verbal component of working memory. *Nature*, 362(6418), 342–345. https://doi.org/10.1038/362342a0 – Hirnregionen der phonologischen Schleife.
- Penney, C. G. (1989). Modality effects and the structure of short-term verbal memory. *Memory & Cognition*, 17(4), 398–422. https://doi.org/10.3758/BF03202613 – akustischer Code nur bei gehörten Items.
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin*, 124(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – Fixations- und Sakkadenkennwerte.
- Service, E., Simola, M., Metsänheimo, O., & Maury, S. (2002). Bilingual working memory span is affected by language skill. *European Journal of Cognitive Psychology*, 14(3), 383–408. https://doi.org/10.1080/09541440143000140 – Zweitsprache (Inhalt über Sekundärquellen, unsicherer).
- Sheedy, J. E. (2004). Progressive addition lenses – matching the specific lens to patient needs. *Optometry – Journal of the American Optometric Association*, 75(2), 83–102. https://doi.org/10.1016/S1529-1839(04)70021-4 – seitliche Unschärfe von Gleitsichtgläsern
- Simon, H. A. (1974). How big is a chunk? *Science*, 183(4124), 482–488. https://doi.org/10.1126/science.183.4124.482 – 5–10 s Einprägezeit pro Chunk.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest*, 17(3), 103–186. https://doi.org/10.1177/1529100616661983 – Übersicht zu Gehirntraining
- Swanson, H. L., Zheng, X., & Jerman, O. (2009). Working memory, short-term memory, and reading disabilities: A selective meta-analysis of the literature. *Journal of Learning Disabilities*, 42(3), 260–287. https://doi.org/10.1177/0022219409331958 – Nachteil bei Leseschwäche (Kinder; STM d = −0,61, PubMed-Abstract).
- Tsubota, K., & Nakamori, K. (1993). Dry eyes and video display terminals. *New England Journal of Medicine*, 328(8), 584. https://doi.org/10.1056/NEJM199302253280817 – Lidschlag am Bildschirm
- Van der Elst, W., van Boxtel, M. P. J., van Breukelen, G. J. P., & Jolles, J. (2005). Rey's verbal learning test: Normative data for 1855 healthy participants aged 24–81 years and the influence of age, sex, education, and mode of presentation. *Journal of the International Neuropsychological Society*, 11(3), 290–302. https://doi.org/10.1017/S1355617705050344 – Alter; vorgelesen besser in Durchgang 1, gelesen besser in späteren Durchgängen (PubMed-Abstract).
- W3C (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (SC 2.3.1 Three Flashes). https://www.w3.org/TR/WCAG22/ – Norm, keine DOI
- Wagner, A. D., Schacter, D. L., Rotte, M., Koutstaal, W., Maril, A., Dale, A. M., Rosen, B. R., & Buckner, R. L. (1998). Building memories: Remembering and forgetting of verbal experiences as predicted by brain activity. *Science*, 281(5380), 1188–1191. https://doi.org/10.1126/science.281.5380.1188 – Einprägen: linker präfrontaler/temporaler Kortex.
- Waters, G. S., & Caplan, D. (2003). The reliability and stability of verbal working memory measures. *Behavior Research Methods, Instruments, & Computers*, 35(4), 550–564. https://doi.org/10.3758/BF03195534 – Zuverlässigkeit von Arbeitsgedächtnis-Spannen (r = .52–.81, PubMed-Abstract).
