---
# ===== Kennung =====
nr: 108
kennung: entropic-grid
name: "Mitte und Rand auf einen Blick erfassen (nützliches Sehfeld)"
name_original: "Visuelle Suche – Selektive Aufmerksamkeit im wechselnden Raster (Entropic Grid Pro; Titel: „Visuelle Suche | Selektive Aufmerksamkeit“)"
kapitel: "Visuelle Wahrnehmung"
kapitel_original: "visual"
unterkapitel_original: "visual-recognition"
quelle_url: "https://skilldrills.online/de/drills/visual/visual-recognition/entropic-grid"
blickfit_umsetzung: {kennung: "blitzblick", name: "Blitzblick", unterschiede: "Kein Ersatz im Sinne einer Kopie, sondern eine andere Aufgabe: statt Suche im Zeichenraster ein Test nach dem Prinzip des „nützlichen Sehfelds“ (Useful Field of View, UFOV). Ablauf je Durchgang: Fixation 600 ms → Reiz (Auto oder Lkw in einer Mittelbox plus Stern an einer von 8 Randpositionen bis ca. 10° Exzentrizität bei 40 cm, ab Stufe 9 zusätzlich 23 Dreiecke als Ablenker) → Maske aus Blockrauschen 300 ms (mittlere Helligkeit, kein Streifenmuster, sanftes Ausblenden) → zwei Antworten (Fahrzeug und Sternposition), richtig nur wenn beides stimmt (Ratewahrscheinlichkeit 1/16). 18 Durchgänge, 20 Stufen; Anzeigedauer 500 ms × 0,75^(Stufe−1) (500 → 67 ms; Stufen 9–20 erneut 500 → ca. 21 ms ≈ 1 Bild), in ganzen Bildern anhand der gemessenen Bildrate, Ruckler-Durchgänge zählen nicht; gewichtete Treppe (richtig: 1 Stufe schwerer, falsch: 3 leichter, ≈ 75 % richtig). Kein Zeichenraster, keine Punkte je Treffer, kein Hintergrundflimmern, höchstens 2 Helligkeitswechsel je Durchgang; Touch als Hauptgerät. Fordert nutzbares Sehfeld, Verarbeitungsgeschwindigkeit und geteilte Aufmerksamkeit statt Zeichensuche und Klicktempo; ähnlich ist nur der Bildschirm-Kontext und das Ziel „Mitte und Umgebung verarbeiten“ (Ähnlichkeit mit 103 Suchbild ist größer als mit dem Original 108)."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Nach einer kurzen Fixation blitzt in der Bildmitte ein Fahrzeug (Auto oder Lastwagen) auf, gleichzeitig erscheint am Rand ein Stern an einer von acht Positionen; ab Stufe 9 lenken zusätzlich Dreiecke ab. Danach überdeckt eine Maske das Bild, und man gibt an, welches Fahrzeug es war und wo der Stern lag. Die Anzeigedauer sinkt von 500 ms auf wenige Millisekunden, die Stufe passt sich an."
ziel_funktionen: [nutzbares_sehfeld, visuelle_verarbeitungsgeschwindigkeit]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 45
schwierigkeit_anpassung: "Im Original laut Code-Analyse: Level = 1 + ⌊Punkte / 750⌋ (alle 5 Treffer); die Zahl der gleichzeitig vorhandenen Ziele wächst mit dem Level (2 + ⌊Level/3⌋, höchstens 6). Größe des Rasters, Zeichenzahl, Ähnlichkeit und Takt bleiben gleich. Blickfit „Blitzblick“: adaptive Treppe über 20 Stufen (Anzeigedauer 500 → ca. 21 ms, ab Stufe 9 mit Ablenkern)."
messgroessen: ["Original: Punkte (150 je Treffer), Treffer, Fehlklicks, Trefferquote (nur Anzeige), Bestwert/Level im Browser", "sinnvoll: Suchzeit je Treffer (Median), Fehlklicks, Zeit bis zum ersten Klick, Ergebnis getrennt nach Position im Raster", "sinnvoll mit Eyetracker: Fixationsdauer, Zahl und Wiederholung von Fixationen"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 3
    nutzbares_sehfeld: 3
    blickfolge: 0
    sakkaden: 0
    fixation: 2
    bewegungswahrnehmung: 0
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 3
    zeitliche_aufloesung: 1
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 2
    inhibition: 0
    geteilte_aufmerksamkeit: 3
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 2
    antizipation: 0
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 0
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
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Buchstaben und Ziffern der lateinischen Schrift lesen können (zweistellige Codes)", "scharfes Sehen im Nahbereich (Zeichen im Raster klein; genaue Größe nicht ausgemessen), Brille/Nahkorrektur tragen", "Maus oder Touchscreen (Tablet quer)", "Bereitschaft, 45 s lang auf ein Feld zu schauen, in dem sich einzelne Zeichen ständig ändern"]
vorsicht_bei: [sehbehinderung_niedriger_visus, presbyopie_gleitsicht, gesichtsfeldausfall, trockenes_auge_bildschirm, kopfschmerz_asthenopie, aufmerksamkeitsprobleme, kognitive_einschraenkung, kinder_unter_6]
geeignet_fuer: ["Mitte und Umgebung in einem kurzen Moment erfassen (nützliches Sehfeld, Randwahrnehmung bei ruhigem Blick)", "Verarbeitungsgeschwindigkeit und geteilte Aufmerksamkeit bei sehr kurzer Darbietung üben", "kurze Sitzungen mit Touch, ohne Lesen, Text oder Farbunterscheidung", "Selbstbeobachtung: wie kurz die Anzeige sein darf, bevor Mitte und Rand nicht mehr zugleich erfasst werden"]
weniger_geeignet_fuer: ["Üben der Suche in dichten Zeichenfeldern (dafür 103, 204)", "Menschen mit Gesichtsfeldausfall (Randreize können im Ausfallbereich liegen) oder deutlich eingeschränkter Sehschärfe, solange das Fahrzeug in der Mitte nicht sicher erkannt wird", "Messung oder Leistungsvergleich des nützlichen Sehfelds (die Übung ist kein UFOV-Test; keine Normwerte, die Anzeigedauer hängt vom Gerät ab)", "Menschen, die bei kurzen hellen Reizen und Rauschmasken Beschwerden haben", "Ziele wie Blickfolge, Reaktion, Merken oder Sporttransfer"]
evidenz:
  uebungseffekt: stark
  naher_transfer: mittel
  alltag_transfer: schwach
  kommentar: "Übungseffekt und naher Transfer sind bei Älteren im betreuten UFOV-Protokoll gut belegt (Ball et al., 2002; Edwards et al., 2018); für diese Web-Übung selbst fehlt eine Studie, und ein Alltagsnutzen (Fahren, Lesen, Sport) ist nicht belegt (Simons et al., 2016). Ein eingeschränktes nützliches Sehfeld ging bei älteren Fahrern mit mehr Unfällen einher (Owsley et al., 1998); das ist ein Zusammenhang und kein Beleg, dass Übung das Risiko senkt."
aehnliche_uebungen: [103, 204, 208, 201, 207, 303, 109]
stichworte: ["visuelle Suche", "selektive Aufmerksamkeit", "Distraktoren", "Zeichenraster", "Rauschen", "Onset-Reize", "Schulte-Tabelle", "Blitzblick", "nützliches Sehfeld"]
---

# 108 · Mitte und Rand auf einen Blick erfassen (nützliches Sehfeld)

> Original: „Visuelle Suche | Selektive Aufmerksamkeit“ (Entropic Grid Pro) – skilldrills.online, Kapitel Visuelle Wahrnehmung (`visual`, Unterkapitel `visual-recognition`) · Blickfit: „Blitzblick“ (`src/exercises/blitzblick/`), eine andere UFOV-Aufgabe, siehe Abschnitt 10

## 1. Kurzbeschreibung

Nach einer kurzen Fixation (0,6 s) blitzt in einer Box in der Bildmitte ein Fahrzeug auf, ein Auto oder ein Lastwagen. Zugleich erscheint an einer von acht Randpositionen (bis etwa 10° neben der Mitte, Tablet quer, 40 cm) ein Stern; ab Stufe 9 stehen zusätzlich 23 Dreiecke als Ablenker im Feld. Danach überdeckt 300 ms lang eine Maske aus Blockrauschen das Bild, damit kein Nachbild hilft. Dann gibt man zwei Antworten: welches Fahrzeug es war und wo der Stern lag. Ein Durchgang zählt nur, wenn beides stimmt (Ratewahrscheinlichkeit 1/16). Die Anzeigedauer beginnt bei 500 ms und sinkt je Stufe um ein Viertel (Stufe 8: 67 ms); auf den Stufen 9 bis 20 mit Ablenkern beginnt sie erneut bei 500 ms und sinkt bis auf etwa 21 ms, ein einziges Bild. Eine Sitzung hat 18 Durchgänge; nach einer richtigen Antwort wird es eine Stufe schwerer, nach einer falschen drei Stufen leichter (≈ 75 % richtig). Geübt wird, Mitte und Rand in einem kurzen Moment zugleich zu erfassen, nach dem Prinzip des „nützlichen Sehfelds“ (Useful Field of View).

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und die vorhandene Code-Analyse (`docs/skilldrills-analyse.md`, Abschnitt 8). Für diesen Eintrag wurde der Spielcode
nicht erneut ausgewertet; Angaben aus der Code-Analyse sind mit „Code“ gekennzeichnet. Die Zellgröße im Raster und damit der Sehwinkel der
Zeichen sind **nicht ausgemessen**.

- **Feld (Code):** 10 × 10 Zellen als HTML-Raster (Klick auf Zelle, kein Canvas). Zeichensatz `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (32 Zeichen,
  ohne I, O, 0, 1, damit nichts verwechselt wird). Ein Code besteht aus 2 Zeichen.
- **Rauschen (Code):** Alle **700 ms** werden genau **3** Ablenker-Zellen neu gewürfelt, also 3 % des Feldes, nicht „alle Hintergrundzeichen“.
  Alle **12 s** wird ein komplett neues Brett mit neuem Code erzeugt.
- **Ziele (Code):** Anzahl gleichzeitiger Ziele = min(2 + ⌊Level / 3⌋, 6). Nach einem Treffer bekommt die Zelle einen neuen Code; sind alle Ziele
  gefunden, folgt sofort ein neues Brett.
- **Wertung (Code, deckt sich mit dem Regeltext):** Treffer +150; Fehlklick ohne Abzug; 120 ms Sperre gegen Doppeltipps. Level = 1 + ⌊Punkte / 750⌋,
  also alle 5 Treffer. Bestwert und Level nur im Browser gespeichert (`localStorage`).
- **Eingabe:** Zeigerklick auf eine Zelle (Maus und Touch). Keine Tastatur, keine Kamera.
- **Widersprüche Regeltext ↔ Code:** (a) Der Text spricht von „einem“ Zielcode im Kopfbereich („präge dir den Code ein“, „nächster Code erscheint“),
  laut Code-Analyse gibt es je Level 2–6 Ziele gleichzeitig; wie das im Kopfbereich dargestellt wird, ist aus dem Regeltext nicht erkennbar (unklar).
  (b) „Hintergrundzeichen wechseln alle 700 ms“ suggeriert Vollrauschen, laut Code sind es 3 von 100 Zellen. (c) Die Leistungstabelle nennt
  „Suchfixations-Latenz“ und „Rauschfilter-Genauigkeit“ als Messgrößen, die die Übung nicht erfasst (die Seite behauptet zugleich, Treffer,
  Latenz und Perzentil würden ausgewertet). (d) Das Spiel kann durch Durchtippen ohne Suchen Punkte sammeln, weil Fehlklicks nichts kosten:
  bei 100 Zellen sind es im Mittel etwa 50 Tipps je Treffer bei einem Ziel und etwa 34 bei zwei gleichzeitigen Zielen (eigene Rechnung, Zufallstippen ohne Wiederholung).

## 3. Was die Website sagt – und wie das einzuordnen ist

**Aussagen:** Die Seite beschreibt einen „fortgeschrittenen Drill zur Messung der Rauschunterdrückung“. Er soll „periphere visuelle
Rauschfilterung“ trainieren, das Sichtfeld erweitern und die Zielerkennung „unter hoher Ablenkung“ beschleunigen. Zielgruppen: FPS-Spieler,
Piloten, Fahrende, Fluglotsen, Radiologen, Sicherheitskräfte. Erklärt werden Merkmalsintegration, Guided Search, perzeptive Last und Zoomlinse;
dazu eine Fünf-Stufen-Tabelle („Elite Top 1 %“ bis „Baseline“) mit Treffern, Latenzen und Genauigkeit sowie Tipps (4-Quadranten-Scan, Z-Muster,
Fixation auf 3 × 3 Zellen weiten, Bildschirmabstand ≥ 50 cm).

**Einordnung:**
- **Belegt (Grundlagen):** Suchzeit hängt von Ähnlichkeit zwischen Ziel und Ablenkern und von der Vielfalt der Ablenker ab (Duncan & Humphreys, 1989);
  Aufmerksamkeit lässt sich als Zoomlinse mit variabler Weite beschreiben (Eriksen & St. James, 1986); Ablenker stören nur bei geringer
  perzeptiver Last (Lavie, 1995).
- **Zeichenerkennung statt Merkmalssuche:** Zweistellige Codes im Raster sind eher eine Lese- und Vergleichsaufgabe als Merkmalsbindung im Sinn von
  Treisman & Gelade (1980). Das „Pop-out“ der Tipps (Diagonale bei K, Doppelrundung bei 8) hilft bei ähnlichen Zeichen kaum.
- **Neu-Würfeln ist eher Ablenkreiz als Trainingsprinzip:** Werden bei einer anstrengenden Suche alle Elemente alle 111 ms umplatziert, ändert das
  die Sucheffizienz nicht („Suche ohne Gedächtnis“; Horowitz & Wolfe, 1998). Plötzlich erscheinende Elemente (Onsets) ziehen dagegen
  Aufmerksamkeit an (Yantis & Jonides, 1984). Die 3 Wechsel je 700 ms sind daher ein Onset-Störreiz, kein Beleg für „Rauschfilter-Training“.
  Der Tipp „synchronisiere die Aufnahme mit der stabilen Phase“ ist zudem nicht belegt.
- **Ohne Quelle oder falsch:** „Dorsolateraler präfrontaler Kortex sendet inhibitorische Signale, die Rauschreize tilgen“ steht bei Duncan &
  Humphreys nicht (psychologische Theorie ohne Hirnareale). „Bindet die gesamte kortikale Bandbreite, Rauschen neurochemisch blockiert“ überdehnt
  Lavie. „Parafoveales Scannen außerhalb des 2°-Zentrums spart Korrektursakkaden“ ist mit Posner (1980) nicht gedeckt (Posner beschreibt verdeckte
  Aufmerksamkeitsverlagerung). „Halbiert die Zahl nötiger Mikrosakkaden“ (FAQ) ist unbelegt. „Direkter Transfer“ auf Shooter, Straßenverkehr
  und Datenauswertung ist nicht belegt.
- **Falsch zugeordnete Quelle:** Die FAQ-Aussage „im Alter verengt sich das nützliche Sehfeld (Woods et al., 2015)“ ist falsch zitiert; Woods et al.
  untersuchen die einfache Reaktionszeit. Richtig wären Ball et al. (1988) und Owsley et al. (1998). „Training stimuliert Neuroplastizität
  in Okzipital- und Parietalkortex“ hat keine Quelle.
- **Tabelle ohne Datengrundlage:** Perzentile („Top 1 %/5 %/25 %/50 %“) und Latenzen (< 180 ms als „Elite“) haben keine Grundlage; die Seite sagt selbst,
  sie sammle keine Leistungsdaten. Fixationsdauern in der Suche liegen im Mittel bei etwa 180–275 ms (Rayner, 1998, nach van der Lans et al., 2011); „Suchfixations-
  Latenz“ wird im Spiel nicht gemessen. Auf der Notenskala ist die Übung außerdem sehr leicht (laut Code-Analyse sind 7 Treffer bereits Bestnote).
- **Datenschutz-Aussage** („verschlüsselter localStorage“): `localStorage` ist nicht verschlüsselt; die Daten bleiben lokal im Browser.

## 4. Optische und okulomotorische Grundlagen

- **Sehfunktionen:** Das Fahrzeug in der Mitte muss unterschieden (Auto oder Lastwagen), der Stern am Rand bemerkt und seine Lage angegeben werden. Das verlangt mittlere, aber keine feinste Detailschärfe; Farbsehen wird nicht gebraucht.
- **Nützliches Sehfeld:** Der Bereich, aus dem man in einer Fixation Information aufnimmt, schrumpft mit dem Alter und bei vielen Ablenkern und ließ sich in Studien teilweise durch Übung vergrößern (Ball et al., 1988). Eine Einschränkung des nützlichen Sehfelds von ≥ 40 % ging bei älteren Fahrer:innen mit 2,2-fach höherem Unfallrisiko einher (95 %-KI 1,2–4,1; n = 294; Owsley et al., 1998). Das ist ein Zusammenhang, kein Beleg, dass Übung das Risiko senkt.
- **Blick:** Die Mitte wird fixiert. Mittlere Fixationsdauern liegen bei 180–330 ms (Rayner, 1998, nach van der Lans et al., 2011); bei Anzeigezeiten unter ≈ 200 ms bleibt daher kaum Zeit für einen Blicksprung, und die Maske beendet die Aufnahme. Ob wirklich fixiert wird, prüft die Übung nicht.
- **Aufmerksamkeitsfeld:** Aufmerksamkeit lässt sich als Zoomlinse mit variabler Weite beschreiben: ein enger Fokus liefert bessere Auflösung, ein weiter mehr Überblick (Eriksen & St. James, 1986). Hier sollen Mitte und Rand zugleich erfasst werden; auf den hohen Stufen kommen Ablenker hinzu, die bei geringer perzeptiver Last stören (Lavie, 1995). Je ähnlicher Ziel und Ablenker sind, desto schwerer wird die Suche (Duncan & Humphreys, 1989).
- **Crowding:** Am Rand werden Zeichen schlechter erkannt, wenn Nachbarn näher liegen als etwa die Hälfte der Exzentrizität (Bouma, 1970); die Ablenker verstärken diesen Effekt. In der Praxis der funktionellen Optometrie gilt zudem, dass einzelne Zeichen besser gesehen werden als gedrängte Reihen (Praxisangabe, nicht belegt).
- **Gesichtsfeld:** Ausfälle entstehen je nach Ort der Schädigung entlang der Sehbahn: vor der Kreuzung meist einäugig, an der Kreuzung ungleichseitige, dahinter gleichseitige Halbseitenausfälle (Muchnick, 2008, S. 32). Randreize im Ausfallbereich bleiben unbeantwortet; das ist kein Übungsfehler und kein Test, und unklare Ausfälle gehören augenärztlich abgeklärt.
- **Lichtreize:** Die Reize sind kurz; die Maske hat eine mittlere Helligkeit nahe dem Hintergrund, kein Streifenmuster und blendet sanft aus. Es gibt kein Hintergrundflimmern und höchstens zwei Helligkeitswechsel je Durchgang. Photosensitive Reaktionen treten typischerweise bei Frequenzen von 15–25 Hz auf (Fisher et al., 2005).
- **Brille:** Die Randpositionen liegen bis etwa 10° neben der Mitte; mit Gleitsicht müssen Neulinge in der Eingewöhnung mehr Kopfbewegungen nutzen (Hutchings et al., 2007). Empfehlung: Bildschirmabstand nach Brille (Arbeitsplatzbrille), Tablet eher auf 35–45 cm.
- **Trockenes Auge:** Konzentriertes Schauen am Bildschirm senkt die Lidschlagrate; 18 Durchgänge sind kurz, mehrere Sitzungen nacheinander können belasten.

## 5. Neurowissenschaftliche Grundlagen

Beteiligt sind das fronto-parietale Aufmerksamkeitsnetz (Steuerung der Aufmerksamkeit, Prioritätskarte im Sinne von Guided Search; Wolfe, 1994, 2007) und der visuelle Kortex für die Verarbeitung von Fahrzeug und Stern. Der Begriff „Prioritätskarte“ ist ein Modellkonstrukt; eine eindeutige Hirnregion zuzuweisen geht über die zitierten Verhaltensstudien hinaus. Geteilte Aufmerksamkeit über ein weites Feld bei sehr kurzer Darbietung beansprucht die Geschwindigkeit der Informationsaufnahme; die Maske beendet die Aufnahme, sodass die Anzeigedauer misst, wie schnell Information aufgenommen wird, und nicht, wie lange ein Nachbild nutzbar bleibt. Dass die Übung bestimmte Hirnregionen „trainiert“, ist nicht belegt.

## 6. Motorische Grundlagen

- **Antwort:** Zwei einfache Tipps ohne Zeitlimit: eine große Schaltfläche für das Fahrzeug und die gewählte Randposition für den Stern; die Reihenfolge ist egal. Es zählt die Richtigkeit, nicht das Tempo der Hand; Fitts'sches Gesetz und Zielgenauigkeit spielen eine geringe Rolle.
- **Touch statt Maus:** Am Tablet kann die Hand Teile des Bildschirms verdecken; die Antwortfelder sind groß genug für den Finger.

## 7. Einflussfaktoren und Messgrenzen

- **Alter:** Das nützliche Sehfeld schrumpft mit dem Alter (Ball et al., 1988); auch die Suche verlangsamt sich in Kindheit und höherem Alter, stärker bei vielen Ablenkern (Hommel et al., 2004; n = 298, 6–89 Jahre). Ältere erreichen daher oft niedrigere Stufen; Vergleiche sollten nur mit sich selbst erfolgen.
- **Gerät:** Die Anzeigedauer wird in ganzen Bildern anhand der gemessenen Bildrate umgesetzt (bis hinunter zu einem Bild); die tatsächliche Dauer wird protokolliert, und Durchgänge mit Rucklern zählen nicht für die Stufe. Bildschirmgröße, Abstand und Helligkeit beeinflussen trotzdem, wie gut Rand und Fahrzeug erkannt werden; Tablet und Monitor sind nicht vergleichbar.
- **Übungseffekte und Strategie:** Mit der Zeit verbessert sich das Erfassen kurzer Reize; ein Teil ist Gewöhnung an Aufgabe und Gerät.
- **Zuverlässigkeit:** Ein Durchgang ist erst richtig, wenn Fahrzeug und Stern stimmen; mit 18 Durchgängen ist die erreichte Stufe nur eine grobe Schätzung. Messungen am Menschen streuen stärker als an Prüfkörpern; darum zählt der Verlauf über mehrere Sitzungen, nicht ein Einzelwert (Mountford et al., 2004, S. 43–44). Es gibt keine Normwerte und keine Aussage zur Fahreignung.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (stark, im betreuten Protokoll):** Bei Aufgaben nach dem Prinzip des nützlichen Sehfelds werden Anzeigezeiten mit Übung deutlich kürzer. In der ACTIVE-Studie (n = 2.832, 10 Sitzungen) verbesserte Geschwindigkeitstraining die trainierte Fähigkeit bei 87 % der Älteren, und der Effekt hielt über Jahre an (Ball et al., 2002).
- **Naher Transfer (mittel):** Eine Metaanalyse fand bei UFOV-Training Effekte auf Verarbeitungsgeschwindigkeit und Aufmerksamkeit (17 randomisierte Studien; Edwards et al., 2018). Das gilt für betreute Protokolle bei Älteren, nicht automatisch für diese Web-Übung.
- **Alltagstransfer (schwach):** In der ACTIVE-Studie zeigte sich nach 2 Jahren kein Effekt auf die Alltagsfunktion (Ball et al., 2002); eine Auswertung berichtet weniger Unfälle älterer Fahrer:innen nach betreutem Training, mit Einschränkungen (Ball et al., 2010). Übergreifend zeigen „Gehirntraining“-Programme wenig Transfer über die geübte Aufgabe hinaus (Simons et al., 2016).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand Mitte und Rand in einem kurzen Moment zugleich erfassen üben will (nützliches Sehfeld, Verarbeitungsgeschwindigkeit, geteilte Aufmerksamkeit), kurze Sitzungen mit Touch bevorzugt und weder lesen noch Farben unterscheiden möchte; Profil: nützliches Sehfeld, Randwahrnehmung und Verarbeitungsgeschwindigkeit (je 3), geteilte Aufmerksamkeit 3.
- **Weniger passend, wenn …** die Suche in Zeichenfeldern (dafür 103 und 204), Blickfolge, Reaktion oder Sporttransfer im Vordergrund stehen, oder wenn ein Leistungsvergleich, eine Norm oder eine Aussage zur Fahreignung gebraucht wird.
- **Vorsicht / anpassen bei …** `sehbehinderung_niedriger_visus` und `presbyopie_gleitsicht` (Fahrzeug in der Mitte muss erkannt werden; Abstand und Brille prüfen, Kopf statt Augen bewegen), `gesichtsfeldausfall` (Randreize im Ausfallbereich), `trockenes_auge_bildschirm` und `kopfschmerz_asthenopie` (konzentriertes Schauen am Bildschirm; Pausen), `aufmerksamkeitsprobleme` und `kognitive_einschraenkung` (zwei Antworten je Durchgang, wachsende Schwierigkeit), `kinder_unter_6` (Auto und Lastwagen unterscheiden). Farbsehen wird nicht gebraucht.
- **Abklärung vor dem Üben:** Doppelbilder, plötzlicher einseitiger Sehverlust, Lichtblitze, neue Schleier, Kopfschmerz mit Sehverschlechterung, Schwindel oder Zittern gehören ärztlich abgeklärt; sie sind kein Anlass zum Üben (Muchnick, 2008, S. 6, 28).
- **Kombiniert gut mit …** 103 (Suche mit ähnlichen Zeichen), 204 (Schulte-Tabelle, statisches Raster), 208 (Daueraufmerksamkeit), 201 (selektive Aufmerksamkeit, Stroop), 207 (Symbol-Zuordnung), für Sehfeld und Peripherie 401 und 303 (Sakkaden).
- Keine Diagnose, keine Heilversprechen; die Übung ist keine Messung der Sehleistung.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

**Schwächen des Originals:**
- Punktzahl misst auch Durchtippen; keine Fehlerstrafe, keine Suchzeit, keine Fixationsmessung; Tabelle ohne Datengrundlage.
- Kleine Zellen und Zeichen (Größe nicht ausgemessen); Touchziele vermutlich unter 48 px; kein Skalieren für Gleitsicht/Arbeitsplatzbrille.
- Wechsel von 3 Zellen alle 700 ms wirken wie Onset-Ablenker ohne belegten Trainingsnutzen; keine Option „Bewegung/Unruhe reduzieren“.
- Regeltext und Code widersprechen sich (ein Ziel vs. bis zu sechs; Vollrauschen vs. 3 Zellen).
- Farbsehschwäche kein Problem (keine Farbe), aber Zeichenverwechslungen (K/X, 8/B) bei niedrigem Visus.

**Was Blickfit anders macht (Blitzblick):** Statt das Original nachzubauen, ersetzt Blickfit das Spiel durch eine UFOV-artige Aufgabe:
Mittelbox (Auto oder Lkw) plus Stern an 8 Randpositionen (bis ca. 10° bei 40 cm), ab Stufe 9 mit 23 Dreiecken als Ablenker, dann eine Maske aus
Blockrauschen (300 ms) und zwei Antworten (Fahrzeug, Sternposition). Anzeigedauer 500 → ca. 21 ms (ganze Bilder aus gemessener Bildrate,
Ruckler ausgeschlossen), gewichtete Treppe (1 Stufe schwerer bei richtig, 3 leichter bei falsch, ≈ 75 % richtig), 18 Durchgänge, kein Punktespiel.
Das entfernt die Schwächen Durchtippen, Zeichengröße und Dauerflimmern, verlagert die Anforderung aber von Suche und Lesen zu Sehfeld und
Verarbeitungsgeschwindigkeit; die Evidenzlage (UFOV-Protokolle bei Älteren) gilt nicht automatisch für die Web-Version (Blickfit weist das in
seinem Text selbst aus). Wer die **Suche im Zeichenraster** üben will, ist bei Blickfit „Suchbild“ (Eintrag 103) besser aufgehoben.

**Empfehlungen, falls eine echte Raster-Übung gewünscht wird:** Treffer nur mit Fehlerstrafe oder Fehlklick-Zählung werten; Suchzeit je Ziel (Median)
und Fehlklicks anzeigen; Zellen ≥ 48 px, Zeichenhöhe ≥ 0,7° bei 40 cm; Rauschen abschaltbar; nur ein Ziel zur Zeit; Norm-Tabelle weglassen.

## 11. Quellen

### Von der Website angegeben
- Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology*, 12(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5 – **Prüfung:** DOI stimmt ✓ (Crossref); **stützt die Aussage der Website:** teilweise (Theorie ja; zweistellige Codes sind Zeichenerkennung, nicht Merkmalsbindung im engen Sinn) ; **stützt:** keine (für die umgesetzte Übung nicht verwendet)
- Wolfe, J. M. (2007). Guided Search 4.0: Current progress with a model of visual search. In W. D. Gray (Hrsg.), *Integrated Models of Cognitive Systems* (S. 99–119). Oxford University Press. https://doi.org/10.1093/acprof:oso/9780195189193.003.0008 – **Prüfung:** DOI stimmt ✓ (Buchkapitel, nur Metadaten); **stützt:** teilweise (Prioritätskarte aus Bottom-up und Top-down ja; die „Elite/Top 1 %“-Zuordnung steht dort nicht)
- Duncan, J., & Humphreys, G. W. (1989). Visual search and stimulus similarity. *Psychological Review*, 96(3), 433–458. https://doi.org/10.1037/0033-295X.96.3.433 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Ähnlichkeitsprinzip ja; „DLPFC sendet inhibitorische Signale“ steht dort nicht)
- Posner, M. I. (1980). Orienting of attention. *Quarterly Journal of Experimental Psychology*, 32(1), 3–25. https://doi.org/10.1080/00335558008248231 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (behandelt verdeckte Aufmerksamkeitsverlagerung, nicht parafoveales Scannen jenseits von 2° oder eingesparte Sakkaden)
- Green, C. S., & Bavelier, D. (2006). Enumeration versus multiple object tracking: The case of action video game players. *Cognition*, 101(1), 217–245. https://doi.org/10.1016/j.cognition.2005.10.004 – **Prüfung:** DOI der Website falsch (angegeben: …10.005, führt zu einer Arbeit über Säuglinge; richtig …10.004, Crossref ✓); **stützt:** nein (MOT und Abzählen, keine Suche im Rauschen; im Text ohne Bezug)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, 9, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (einfache Reaktionszeit; die FAQ-Aussage „nützliches Sehfeld verengt sich im Alter (Woods et al., 2015)“ ist falsch zugeordnet)
- *Nur im Fließtext der Website (ohne Eintrag im Quellenverzeichnis):* Wolfe (1994), Lavie (1995), Eriksen & St. James (1986) – Angaben s. u.; „bindet die gesamte kortikale Bandbreite … neurochemisch blockiert“ überdehnt Lavie. ; **stützt:** keine (für die umgesetzte Übung nicht verwendet)

### Weitere Fachliteratur
- Lavie, N. (1995). Perceptual load as a necessary condition for selective attention. *Journal of Experimental Psychology: Human Perception and Performance*, 21(3), 451–468. https://doi.org/10.1037/0096-1523.21.3.451 – Ablenker stören nur bei niedriger perzeptueller Last
- Wolfe, J. M. (1994). Guided Search 2.0: A revised model of visual search. *Psychonomic Bulletin & Review*, 1(2), 202–238. https://doi.org/10.3758/BF03200774 – Prioritätskarte
- Eriksen, C. W., & St. James, J. D. (1986). Visual attention within and around the field of focal attention: A zoom lens model. *Perception & Psychophysics*, 40(4), 225–240. https://doi.org/10.3758/BF03211502 – Zoomlinse
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin*, 124(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – Fixationsdauern bei Suche, Lesen, Szenen
- Hommel, B., Li, K. Z. H., & Li, S.-C. (2004). Visual search across the life span. *Developmental Psychology*, 40(4), 545–558. https://doi.org/10.1037/0012-1649.40.4.545 – Suche im Lebensverlauf (n = 298)
- Ball, K. K., Beard, B. L., Roenker, D. L., Miller, R. L., & Griggs, D. S. (1988). Age and visual search: Expanding the useful field of view. *Journal of the Optical Society of America A*, 5(12), 2210–2219. https://doi.org/10.1364/JOSAA.5.002210 – nützliches Sehfeld im Alter
- Owsley, C., Ball, K., McGwin, G., Jr., Sloane, M. E., Roenker, D. L., White, M. F., & Overley, E. T. (1998). Visual processing impairment and risk of motor vehicle crash among older adults. *JAMA*, 279(14), 1083–1088. https://doi.org/10.1001/jama.279.14.1083 – UFOV und Unfallrisiko
- Ball, K., Berch, D. B., Helmers, K. F., Jobe, J. B., Leveck, M. D., Marsiske, M., Morris, J. N., Rebok, G. W., Smith, D. M., Tennstedt, S. L., Unverzagt, F. W., & Willis, S. L. (2002). Effects of cognitive training interventions with older adults: A randomized controlled trial. *JAMA*, 288(18), 2271–2281. https://doi.org/10.1001/jama.288.18.2271 – ACTIVE
- Edwards, J. D., Fausto, B. A., Tetlow, A. M., Corona, R. T., & Valdés, E. G. (2018). Systematic review and meta-analyses of useful field of view cognitive training. *Neuroscience & Biobehavioral Reviews*, 84, 72–91. https://doi.org/10.1016/j.neubiorev.2017.11.004 – Metaanalyse UFOV-Training
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do “brain-training” programs work? *Psychological Science in the Public Interest*, 17(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer von Gehirntraining
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., & Wells, K. A. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, 27(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – mehr Kopfbewegungen bei Gleitsicht-Neulingen
- Ball, K. K., Edwards, J. D., Ross, L. A., & McGwin, G., Jr. (2010). Cognitive training decreases motor vehicle collision involvement of older drivers. *Journal of the American Geriatrics Society*, 58(11), 2107–2113. https://doi.org/10.1111/j.1532-5415.2010.03138.x – weniger Unfälle nach betreutem Training, mit Einschränkungen
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, 46(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – kritische Flimmerfrequenzen
- van der Lans, R., Wedel, M., & Pieters, R. (2011). Defining eye-fixation sequences across individuals and tasks: The Binocular-Individual Threshold (BIT) algorithm. *Behavior Research Methods*, 43(1), 239–257. https://doi.org/10.3758/s13428-010-0031-2 – Fixationsdauern (Zitat von Rayner, 1998)
- Bouma, H. (1970). Interaction effects in parafoveal letter recognition. *Nature*, 226(5241), 177–178. https://doi.org/10.1038/226177a0 – Crowding-Abstand ≈ 0,5 × Exzentrizität
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28), Prüfung der Augenfolgebewegungen (S. 32–35), Gesichtsfeldausfälle nach Sehbahnverlauf (S. 32).
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Genauigkeit und Wiederholbarkeit von Messungen am Menschen, Mehrfachmessung (S. 17–18, 24, 43–44).
