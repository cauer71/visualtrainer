---
# ===== Kennung =====
nr: 108
kennung: entropic-grid
name: "Zielcode im flimmernden Zeichenraster finden (Entropic Grid)"
name_original: "Visuelle Suche – Selektive Aufmerksamkeit im wechselnden Raster (Entropic Grid Pro; Titel: „Visuelle Suche | Selektive Aufmerksamkeit“)"
kapitel: "Visuelle Wahrnehmung"
kapitel_original: "visual"
unterkapitel_original: "visual-recognition"
quelle_url: "https://skilldrills.online/de/drills/visual/visual-recognition/entropic-grid"
blickfit_umsetzung: {kennung: "blitzblick", name: "Blitzblick", unterschiede: "Kein Ersatz im Sinne einer Kopie, sondern eine andere Aufgabe: statt Suche im Zeichenraster ein Test nach dem Prinzip des „nützlichen Sehfelds“ (Useful Field of View, UFOV). Ablauf je Durchgang: Fixation 600 ms → Reiz (Auto oder Lkw in einer Mittelbox plus Stern an einer von 8 Randpositionen bis ca. 10° Exzentrizität bei 40 cm, ab Stufe 9 zusätzlich 23 Dreiecke als Ablenker) → Maske aus Blockrauschen 300 ms (mittlere Helligkeit, kein Streifenmuster, sanftes Ausblenden) → zwei Antworten (Fahrzeug und Sternposition), richtig nur wenn beides stimmt (Ratewahrscheinlichkeit 1/16). 18 Durchgänge, 20 Stufen; Anzeigedauer 500 ms × 0,75^(Stufe−1) (500 → 67 ms; Stufen 9–20 erneut 500 → ca. 21 ms ≈ 1 Bild), in ganzen Bildern anhand der gemessenen Bildrate, Ruckler-Durchgänge zählen nicht; gewichtete Treppe (richtig: 1 Stufe schwerer, falsch: 3 leichter, ≈ 75 % richtig). Kein Zeichenraster, keine Punkte je Treffer, kein Hintergrundflimmern, höchstens 2 Helligkeitswechsel je Durchgang; Touch als Hauptgerät. Fordert nutzbares Sehfeld, Verarbeitungsgeschwindigkeit und geteilte Aufmerksamkeit statt Zeichensuche und Klicktempo; ähnlich ist nur der Bildschirm-Kontext und das Ziel „Mitte und Umgebung verarbeiten“ (Ähnlichkeit mit 103 Suchbild ist größer als mit dem Original 108)."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Auf einem Feld aus 10 × 10 Buchstaben-Ziffern-Zellen, in dem sich ständig einzelne Zeichen neu mischen, muss man einen zweistelligen Zielcode (z. B. „K7“) so schnell wie möglich finden und anklicken; jeder Treffer bringt 150 Punkte und einen neuen Code, 45 Sekunden lang."
ziel_funktionen: [visuelle_suche, selektive_aufmerksamkeit]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Im Original laut Code-Analyse: Level = 1 + ⌊Punkte / 750⌋ (alle 5 Treffer); die Zahl der gleichzeitig vorhandenen Ziele wächst mit dem Level (2 + ⌊Level/3⌋, höchstens 6). Größe des Rasters, Zeichenzahl, Ähnlichkeit und Takt bleiben gleich. Blickfit „Blitzblick“: adaptive Treppe über 20 Stufen (Anzeigedauer 500 → ca. 21 ms, ab Stufe 9 mit Ablenkern)."
messgroessen: ["Original: Punkte (150 je Treffer), Treffer, Fehlklicks, Trefferquote (nur Anzeige), Bestwert/Level im Browser", "sinnvoll: Suchzeit je Treffer (Median), Fehlklicks, Zeit bis zum ersten Klick, Ergebnis getrennt nach Position im Raster", "sinnvoll mit Eyetracker: Fixationsdauer, Zahl und Wiederholung von Fixationen"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 2
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 2
    blickfolge: 0
    sakkaden: 2
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 3
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 3
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 1
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 0
    entscheidung_wahlreaktion: 1
    lesen_sprache: 1
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 1
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
  zeitdruck: 1
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Buchstaben und Ziffern der lateinischen Schrift lesen können (zweistellige Codes)", "scharfes Sehen im Nahbereich (Zeichen im Raster klein; genaue Größe nicht ausgemessen), Brille/Nahkorrektur tragen", "Maus oder Touchscreen (Tablet quer)", "Bereitschaft, 45 s lang auf ein Feld zu schauen, in dem sich einzelne Zeichen ständig ändern"]
vorsicht_bei: [sehbehinderung_niedriger_visus, presbyopie_gleitsicht, gesichtsfeldausfall, trockenes_auge_bildschirm, kopfschmerz_asthenopie, lese_rechtschreib_schwaeche, aufmerksamkeitsprobleme, kinder_unter_6]
geeignet_fuer: ["systematisches Absuchen dichter Zeichenfelder üben (Tabellen, Listen, Codes, Korrekturlesen)", "selektive Aufmerksamkeit bei leichter, ungefährlicher Unruhe im Bild und ohne Strafe für Fehler", "kurze, ruhige Sitzung ohne Sprachverständnis über Buchstaben und Ziffern hinaus", "Erfahrung, wie Zeichengröße, Abstand und Beleuchtung das Finden beeinflussen"]
weniger_geeignet_fuer: ["Einstieg für Menschen mit Sehschwäche, Gleitsichtbrille ohne Kopfbewegung oder sehr kleinem Bildschirm (dichte, kleine Zeichen)", "Training des nützlichen Sehfelds oder der Randwahrnehmung (dafür Blickfit „Blitzblick“, andere Aufgabe)", "Messung oder Leistungsvergleich (Punkte lassen sich durch Durchtippen ohne Suchen erhöhen; Notenskala ohne Datengrundlage)", "Menschen, die bei flackernden oder wechselnden Bildschirmreizen Beschwerden haben", "Ziele wie Blickfolge, Reaktion, Merken oder Sporttransfer"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Suche nach Zeichen wird durch Übung schneller (Laborstudien zu ähnlichen Suchaufgaben), Übertragung auf andere Aufgaben ist uneinheitlich, Alltagsnutzen bei Gesunden nicht belegt (Simons et al., 2016); für dieses konkrete Spiel gibt es keine Studie. Für den Blickfit-Ersatz Blitzblick (UFOV-Prinzip) ist die Studienlage eine andere: Übungseffekt und naher Transfer bei Älteren im betreuten Protokoll stark (Ball et al., 2002; Edwards et al., 2018), für die Web-Version fehlend."
aehnliche_uebungen: [103, 204, 208, 201, 207, 303, 109]
stichworte: ["visuelle Suche", "selektive Aufmerksamkeit", "Distraktoren", "Zeichenraster", "Rauschen", "Onset-Reize", "Schulte-Tabelle", "Blitzblick", "nützliches Sehfeld"]
---

# 108 · Zielcode im flimmernden Zeichenraster finden (Entropic Grid)

> Original: „Visuelle Suche | Selektive Aufmerksamkeit“ (Entropic Grid Pro) – skilldrills.online, Kapitel Visuelle Wahrnehmung (`visual`, Unterkapitel `visual-recognition`) · Blickfit: „Blitzblick“ (`src/exercises/blitzblick/`), eine andere UFOV-Aufgabe, siehe Abschnitt 10

## 1. Kurzbeschreibung

Man sieht ein Quadrat aus 10 × 10 Zellen mit Buchstaben und Ziffern. Oben steht ein zweistelliger Zielcode, etwa „K7“. Man sucht ihn im Feld
und klickt oder tippt ihn an, dann erscheint ein neuer Code. Während der Suche ändern sich immer wieder einige Zeichen im Hintergrund, das Feld
„flimmert“ leicht. Die Runde dauert 45 Sekunden, jeder Treffer gibt 150 Punkte, Fehlklicks kosten nichts. Geübt wird das gezielte Absuchen
eines dichten Zeichenfeldes.

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

- **Sakkaden und Fixationen:** Die Suche läuft über eine Folge von Fixationen und Blicksprüngen (Sakkaden); mittlere Fixationsdauer bei visueller
  Suche 180–275 ms, beim stillen Lesen 225–250 ms, bei Szenen 260–330 ms (Rayner, 1998, nach van der Lans et al., 2011). Bei 100 Zellen sind
  mehrere Fixationen je Suche zu erwarten; Zahl und Richtung hängen von der Suchstrategie ab (die Empfehlung „Z-Muster“ ist nicht belegt).
- **Sehschärfe und Zeichengröße:** Codes aus zwei Zeichen müssen erkannt werden, nicht nur bemerkt. Bei 40 cm entsprechen am iPad etwa 36 CSS-Pixel
  einem Grad (docs/wissenschaft/02); die tatsächliche Zeichenhöhe im Raster ist nicht ausgemessen. Bei hoher Zeichendichte kann Crowding (Störung
  durch Nachbarzeichen) das Erkennen außerhalb der Fovea erschweren; das ist hier plausibel, aber nicht gemessen.
- **Nützliches Sehfeld:** Der Bereich, aus dem man in einer Fixation Information aufnimmt, schrumpft mit dem Alter und bei vielen Ablenkern und
  ließ sich in Studien teilweise durch Übung vergrößern (Ball et al., 1988). Im Entropic Grid wird das nicht gemessen und nicht gezielt gefordert.
- **Bildwechsel:** Die Wechsel von 3 Zellen alle 700 ms sind kleine Helligkeits- und Formänderungen (etwa 1,4 Wechsel/s), also kein
  Frequenzbereich der Photosensitivität (typisch 15–25 Hz, Fisher et al., 2005). Trotzdem können viele plötzliche Änderungen im Blickfeld
  unruhig wirken; die Wirkung auf einzelne Nutzer:innen ist nicht untersucht.
- **Brille:** Ein 10 × 10-Feld ist dicht und klein; Gleitsichtträger:innen müssen durch den Nahteil schauen und den Kopf statt der Augen bewegen. Bei der
  Eingewöhnung werden mehr Kopfbewegungen genutzt (Hutchings et al., 2007). Empfehlung: Bildschirmabstand nach Brille (Arbeitsplatzbrille), Tablet
  eher auf 35–45 cm; die Website empfiehlt ≥ 50 cm, was bei kleinen Zeichen die Erkennbarkeit senkt.
- **Trockenes Auge:** Konzentriertes Suchen am Bildschirm senkt die Lidschlagrate; 45 s sind kurz, mehrere Runden nacheinander können belasten.

## 5. Neurowissenschaftliche Grundlagen

Beteiligt sind das fronto-parietale Aufmerksamkeitsnetz (Steuerung der Suche, Prioritätskarte im Sinne von Guided Search; Wolfe, 1994, 2007), das
Blicksteuerungssystem (frontales Augenfeld, Colliculus superior für Sakkaden) und der visuelle Kortex für Zeichenerkennung. Der Begriff
„Prioritätskarte“ ist ein Modellkonstrukt; eine eindeutige Hirnregion zuzuweisen geht über die zitierten Verhaltensstudien hinaus. Plötzliche
Änderungen (Onsets) können Aufmerksamkeit unwillkürlich anziehen (Yantis & Jonides, 1984); wer sie ignorieren will, braucht Top-down-Kontrolle
(Inhibition, Fixationsdisziplin). Die Website-Aussage, das Spiel trainiere gezielt den dorsolateralen präfrontalen Kortex, ist nicht belegt. Auch
Aussagen über „neurochemisches Blockieren“ von Rauschen sind nicht gedeckt. Kognitiv kommt Arbeitsgedächtnis hinzu (Code im Kopf behalten,
Vergleich Zeichen für Zeichen), aber mit geringer Last bei nur zwei Zeichen.

## 6. Motorische Grundlagen

- **Zielbewegung:** Klick oder Tipp auf eine Zelle; mit Maus oder Finger ist die Bewegung kurz (Feld nur 10 × 10 Zellen). Nach dem Fitts’schen Gesetz
  hängt die Bewegungszeit von Abstand und Zielgröße ab; kleine Zellen erhöhen die Anforderung an Präzision, vor allem am Tablet.
- **Touch statt Maus:** Am Tablet verdeckt die Hand Teile des Rasters, und kleine Zellen lassen sich mit dem Finger schwer treffen. Doppeltipps sind
  durch eine 120-ms-Sperre begrenzt (Code).
- **Kein Zeitdruck je Treffer:** Es gibt kein Limit je Suche und keinen Abzug, daher ist der motorische Anteil gering; die Leistung wird durch die
  Suche begrenzt, nicht durch die Klickzeit.

## 7. Einflussfaktoren und Messgrenzen

- **Alter:** Suche verlangsamt sich in Kindheit und höherem Alter, stärker bei Merkmalskombinationen und bei vielen Ablenkern (Hommel et al., 2004;
  n = 298, 6–89 Jahre).
- **Gerät:** Zeichengröße und Zellgröße hängen von Fenstergröße und Abstand ab; dieselbe Rasterdarstellung ist auf dem Tablet und auf großen
  Monitoren unterschiedlich lesbar. Die Wechsel laufen laut Code-Analyse im festen Zeittakt (700 ms); die Punktzahl zählt nur Treffer und hängt nicht von
  einer Zeitmessung ab.
- **Übungseffekte und Strategie:** Punkte steigen schnell durch bessere Strategie (Regeln lernen, Zeichen kennen), nicht unbedingt durch bessere Wahrnehmung.
- **Durchtippen:** Wegen fehlender Fehlerstrafe erhöht Klicken ohne Suchen die Punkte (Abschnitt 2). Die Punktzahl ist keine reine Suchleistung.
- **Zuverlässigkeit:** Keine Messung von Suchzeit je Treffer oder Fixation; die „Latenz“ der Tabelle ist nicht erfasst. Vergleich mit anderen
  („Top 5 %“) ist nicht möglich, es gibt keine Normdaten.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (mittel):** Bei Suchaufgaben werden Suchzeiten mit Übung kürzer; anfangs serielle Suchen können effizienter werden (in der
  Literaturbasis zu 103 beschrieben; Sireteanu & Rettenbach, 1995, 2000). Für das konkrete Rasterspiel ohne eigene Studie ist das eine Übertragung
  aus ähnlichen Aufgaben.
- **Naher Transfer (schwach):** Übertragung auf andere Suchaufgaben ist uneinheitlich; Zahlen für dieses Spiel gibt es nicht. Beim Blickfit-Ersatz
  (UFOV-Prinzip) ist der nahe Transfer besser belegt: In der ACTIVE-Studie (n = 2.832, 10 Sitzungen) verbesserte Geschwindigkeitstraining die
  trainierte Fähigkeit bei 87 %, ohne Effekt auf Alltagsfunktion nach 2 Jahren (Ball et al., 2002); eine Metaanalyse fand bei UFOV-Training Effekte auf
  Verarbeitungsgeschwindigkeit und Aufmerksamkeit (17 RCTs; Edwards et al., 2018). Das gilt für betreute Protokolle bei Älteren, nicht für Web-Nachbauten.
- **Alltagstransfer (fehlend):** Für Fahren, Lesen, Sport oder Bildschirmarbeit ist kein Nutzen des Entropic-Grid-Spiels belegt. Übergreifend zeigen
  „Gehirntraining“-Programme wenig Transfer über die geübte Aufgabe hinaus (Simons et al., 2016). Die Behauptung „verbessert Lesegeschwindigkeit“
  und „erweitert visuelle Spanne“ ist ohne Beleg.
- **UFOV und Unfälle (nur zur Einordnung von Blitzblick):** Eine Einschränkung des UFOV von ≥ 40 % ging bei älteren Fahrer:innen mit 2,2-fach
  höherem Unfallrisiko einher (95 %-KI 1,2–4,1; n = 294; Owsley et al., 1998). Das ist ein Zusammenhang, kein Beleg, dass Übung das Risiko senkt;
  Ball et al. (2010) berichten weniger Unfälle nach betreutem Training, mit Einschränkungen.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand systematisches Absuchen dichter Zeichenfelder (Tabellen, Listen, Codes) üben will, mit ruhiger Kurzeinheit (45 s), ohne
  Fehlerstrafe, mit leichter Unruhe im Bild; Profil: visuelle Suche und selektive Aufmerksamkeit (je 3), Sakkaden und Detailsehen (je 2).
- **Weniger passend, wenn …** nutzbares Sehfeld, Peripherie oder geteilte Aufmerksamkeit im Vordergrund stehen (dafür Blickfit „Blitzblick“, nicht
  dieses Original), wenn ein Leistungsvergleich, eine Norm oder Lernkurve gebraucht wird oder wenn Klicken ohne Suchen ausgeschlossen werden soll.
- **Vorsicht / anpassen bei …** `sehbehinderung_niedriger_visus` und `presbyopie_gleitsicht` (kleine, dichte Zeichen; Kopf statt Augen bewegen),
  `gesichtsfeldausfall` (Feld wird nicht vollständig erfasst), `trockenes_auge_bildschirm` und `kopfschmerz_asthenopie` (konzentriertes Schauen
  am Bildschirm), `lese_rechtschreib_schwaeche` (Zeichen- und Codeverwechslung), `aufmerksamkeitsprobleme` (ständige Onset-Ablenker, Ausbleiben von
  Rückmeldung), `kinder_unter_6` (Buchstaben und Ziffern). Farbsehen wird nicht gebraucht.
- **Kombiniert gut mit …** 103 (Suche mit ähnlichen Zeichen, adaptive Blickfit-Version „Suchbild“), 204 (Schulte-Tabelle, statisches Raster), 208
  (Daueraufmerksamkeit), 201 (selektive Aufmerksamkeit, Stroop), 207 (Symbol-Zuordnung), für Sehfeld/Peripherie 303 (Sakkaden).
- Keine Diagnose, keine Heilversprechen; „Test“ im Namen des Originals ist keine Messung von Sehleistung.

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
- Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology*, 12(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5 – **Prüfung:** DOI stimmt ✓ (Crossref); **stützt die Aussage der Website:** teilweise (Theorie ja; zweistellige Codes sind Zeichenerkennung, nicht Merkmalsbindung im engen Sinn)
- Wolfe, J. M. (2007). Guided Search 4.0: Current progress with a model of visual search. In W. D. Gray (Hrsg.), *Integrated Models of Cognitive Systems* (S. 99–119). Oxford University Press. https://doi.org/10.1093/acprof:oso/9780195189193.003.0008 – **Prüfung:** DOI stimmt ✓ (Buchkapitel, nur Metadaten); **stützt:** teilweise (Prioritätskarte aus Bottom-up und Top-down ja; die „Elite/Top 1 %“-Zuordnung steht dort nicht)
- Duncan, J., & Humphreys, G. W. (1989). Visual search and stimulus similarity. *Psychological Review*, 96(3), 433–458. https://doi.org/10.1037/0033-295X.96.3.433 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Ähnlichkeitsprinzip ja; „DLPFC sendet inhibitorische Signale“ steht dort nicht)
- Posner, M. I. (1980). Orienting of attention. *Quarterly Journal of Experimental Psychology*, 32(1), 3–25. https://doi.org/10.1080/00335558008248231 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (behandelt verdeckte Aufmerksamkeitsverlagerung, nicht parafoveales Scannen jenseits von 2° oder eingesparte Sakkaden)
- Green, C. S., & Bavelier, D. (2006). Enumeration versus multiple object tracking: The case of action video game players. *Cognition*, 101(1), 217–245. https://doi.org/10.1016/j.cognition.2005.10.004 – **Prüfung:** DOI der Website falsch (angegeben: …10.005, führt zu einer Arbeit über Säuglinge; richtig …10.004, Crossref ✓); **stützt:** nein (MOT und Abzählen, keine Suche im Rauschen; im Text ohne Bezug)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, 9, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (einfache Reaktionszeit; die FAQ-Aussage „nützliches Sehfeld verengt sich im Alter (Woods et al., 2015)“ ist falsch zugeordnet)
- *Nur im Fließtext der Website (ohne Eintrag im Quellenverzeichnis):* Wolfe (1994), Lavie (1995), Eriksen & St. James (1986) – Angaben s. u. (✓ Crossref); „bindet die gesamte kortikale Bandbreite … neurochemisch blockiert“ überdehnt Lavie.

### Weitere Fachliteratur
- Horowitz, T. S., & Wolfe, J. M. (1998). Visual search has no memory. *Nature*, 394(6693), 575–577. https://doi.org/10.1038/29068 – ✓ Crossref; Umplatzieren aller Elemente ändert die Sucheffizienz nicht (Einordnung des Neu-Würfelns)
- Yantis, S., & Jonides, J. (1984). Abrupt visual onsets and selective attention: Evidence from visual search. *Journal of Experimental Psychology: Human Perception and Performance*, 10(5), 601–621. https://doi.org/10.1037/0096-1523.10.5.601 – ✓ Crossref; plötzlich erscheinende Zeichen ziehen Aufmerksamkeit an (Wechsel als Ablenkreiz)
- Lavie, N. (1995). Perceptual load as a necessary condition for selective attention. *Journal of Experimental Psychology: Human Perception and Performance*, 21(3), 451–468. https://doi.org/10.1037/0096-1523.21.3.451 – ✓ Crossref; Ablenker stören nur bei niedriger perzeptueller Last
- Wolfe, J. M. (1994). Guided Search 2.0: A revised model of visual search. *Psychonomic Bulletin & Review*, 1(2), 202–238. https://doi.org/10.3758/BF03200774 – ✓ Crossref; Prioritätskarte
- Eriksen, C. W., & St. James, J. D. (1986). Visual attention within and around the field of focal attention: A zoom lens model. *Perception & Psychophysics*, 40(4), 225–240. https://doi.org/10.3758/BF03211502 – ✓ Crossref; Zoomlinse
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin*, 124(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – ✓ Crossref; Fixationsdauern bei Suche, Lesen, Szenen (Werte über van der Lans et al., 2011, https://doi.org/10.3758/s13428-010-0031-2)
- Hommel, B., Li, K. Z. H., & Li, S.-C. (2004). Visual search across the life span. *Developmental Psychology*, 40(4), 545–558. https://doi.org/10.1037/0012-1649.40.4.545 – ✓ Crossref; Suche im Lebensverlauf (n = 298)
- Ball, K. K., Beard, B. L., Roenker, D. L., Miller, R. L., & Griggs, D. S. (1988). Age and visual search: Expanding the useful field of view. *Journal of the Optical Society of America A*, 5(12), 2210–2219. https://doi.org/10.1364/JOSAA.5.002210 – ✓ Crossref; nützliches Sehfeld im Alter
- Owsley, C., Ball, K., McGwin, G., Jr., Sloane, M. E., Roenker, D. L., White, M. F., & Overley, E. T. (1998). Visual processing impairment and risk of motor vehicle crash among older adults. *JAMA*, 279(14), 1083–1088. https://doi.org/10.1001/jama.279.14.1083 – ✓ Crossref; UFOV und Unfallrisiko (Blitzblick)
- Ball, K., Berch, D. B., Helmers, K. F., Jobe, J. B., Leveck, M. D., Marsiske, M., Morris, J. N., Rebok, G. W., Smith, D. M., Tennstedt, S. L., Unverzagt, F. W., & Willis, S. L. (2002). Effects of cognitive training interventions with older adults: A randomized controlled trial. *JAMA*, 288(18), 2271–2281. https://doi.org/10.1001/jama.288.18.2271 – ✓ Crossref; ACTIVE (Blitzblick)
- Edwards, J. D., Fausto, B. A., Tetlow, A. M., Corona, R. T., & Valdés, E. G. (2018). Systematic review and meta-analyses of useful field of view cognitive training. *Neuroscience & Biobehavioral Reviews*, 84, 72–91. https://doi.org/10.1016/j.neubiorev.2017.11.004 – ✓ Crossref; Metaanalyse UFOV-Training (Blitzblick)
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do “brain-training” programs work? *Psychological Science in the Public Interest*, 17(3), 103–186. https://doi.org/10.1177/1529100616661983 – ✓ Crossref; Transfer von Gehirntraining
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., & Wells, K. A. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, 27(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – ✓ Crossref; mehr Kopfbewegungen bei Gleitsicht-Neulingen
- Ball, K. K., Edwards, J. D., Ross, L. A., & McGwin, G., Jr. (2010). Cognitive training decreases motor vehicle collision involvement of older drivers. *Journal of the American Geriatrics Society*, 58(11), 2107–2113. https://doi.org/10.1111/j.1532-5415.2010.03138.x – ✓ Crossref; weniger Unfälle nach betreutem Training, mit Einschränkungen
- Sireteanu, R., & Rettenbach, R. (1995). Perceptual learning in visual search: Fast, enduring, but non-specific. *Vision Research*, 35(14), 2037–2043. https://doi.org/10.1016/0042-6989(94)00295-W – ✓ Crossref; Suchleistung ist schnell und dauerhaft lernbar, aber wenig spezifisch
- Sireteanu, R., & Rettenbach, R. (2000). Perceptual learning in visual search generalizes over tasks, locations, and eyes. *Vision Research*, 40(21), 2925–2949. https://doi.org/10.1016/S0042-6989(00)00145-0 – ✓ Crossref; Übertragung auf andere Suchaufgaben, Orte und das andere Auge (Laborreize, nicht dieses Spiel)
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, 46(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – ✓ Crossref; kritische Flimmerfrequenzen (Abschnitt 4)
- van der Lans, R., Wedel, M., & Pieters, R. (2011). Defining eye-fixation sequences across individuals and tasks: The Binocular-Individual Threshold (BIT) algorithm. *Behavior Research Methods*, 43(1), 239–257. https://doi.org/10.3758/s13428-010-0031-2 – ✓ Crossref; Fixationsdauern (Zitat von Rayner, 1998)
