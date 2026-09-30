---
# ===== Kennung =====
nr: 308
kennung: barrier-sequence-pursuit
name: "Hinter der Deckung – auf Ziele reagieren, die an einer von acht Kanten auftauchen"
name_original: "FPS-Aim-Training – Winkel halten · Peeks erkennen (im Code: „Jiggle Peek Trainer“; Seitentitel: FPS-Aim-Training | SkillDrills)"
kapitel: "Reaktionsgeschwindigkeit"
kapitel_original: "reaction-speed"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/reaction-speed/barrier-sequence-pursuit"
blickfit_umsetzung: null
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Auf einem fast schwarzen Feld stehen vier dunkle Blöcke („Deckungen“). Nach kurzer Pause schiebt sich an der linken oder rechten Kante eines zufälligen Blocks ein roter Kreis heraus; man tippt oder klickt ihn so schnell wie möglich an, bevor er verschwindet. Im Kern ist das eine Reaktion auf einen plötzlich erscheinenden Reiz an einem von acht möglichen Orten plus schnelle Zielbewegung – kein ruhiges Halten eines Winkels."
ziel_funktionen: [einfache_reaktion, auge_hand_koordination, zielbewegung_tempo]
eingabe: [maus, touch, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code stufenlos und nur aufwärts: Level = 1 + Punkte/1 750; Werte nähern sich exponentiell einem Endwert (Level 15 ≈ 76 % des Wegs). Sichtbarkeit 1 300 → 90 ms (Level 10 ≈ 680 ms, Level 15 ≈ 380 ms), Zielradius 28 → 7 px (Level 15 ≈ 12 px), Trefferzugabe 14 → 2 px (mind. 4 px; Touch +10 px), Pause bis zum nächsten Ziel 550–750 → 20–35 ms (Level 15 ≈ 150–210 ms). Eine hohe Combo (ab 50 Treffern in Folge) verkürzt Sichtbarkeit um 32 % und Pause um 30 % und verkleinert Radius um 25 % und Trefferzugabe um 50 %."
messgroessen: ["Original: Punkte, Level, Combo/Max-Combo, Genauigkeit = Treffer/(Treffer + Fehlklicks + Zeitüberschreitungen), Mittelwert der ‚Reaktionszeit‘ (Erscheinen bis Treffer, enthält Zeigerbewegung), Note nach √(Punkte/18 000)", "sinnvoll: Median und Streuung getrennt nach Entdecken (Bewegungsbeginn) und Zielbewegung, getrennt nach Ort (nah/fern der Warteposition), Rate vorzeitiger Klicks, Anteil Zeitüberschreitungen je Level"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 1
    blickfolge: 0
    sakkaden: 2
    fixation: 1
    bewegungswahrnehmung: 1
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 1
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 2
    auge_hand_koordination: 3
    zielbewegung_tempo: 3
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 0
    ruhige_hand: 1
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 3
  flimmern_lichtreize: 2
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus, Touchpad oder Touchscreen; am Tablet genügt direktes Antippen", "vier Blöcke gleichzeitig überblicken (im Vollbild am 24″-Monitor bis ≈ 17° seitlich der Mitte)", "Bildschirm im Zwischen- bzw. Nahbereich scharf sehen", "Umgang mit hohem Zeitdruck und Fehlerrückmeldung (roter Blitz, Wackeln)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, presbyopie_gleitsicht, gesichtsfeldausfall, sehbehinderung_niedriger_visus, trockenes_auge_bildschirm, tremor_parkinson, hand_arm_beschwerden, kognitive_einschraenkung, aufmerksamkeitsprobleme]
geeignet_fuer: ["schnelles Reagieren auf plötzlich erscheinende Reize an mehreren bekannten Orten mit anschließendem Antippen üben", "Blick-Hand-Koordination bei mittleren Zielbewegungen unter steigendem Zeitdruck", "Aufmerksamkeit über ein Feld mit mehreren Beobachtungspunkten verteilen", "spielerisches Aufwärmen für Ego-Shooter-Spielende; am Tablet auch ohne Maus spielbar"]
weniger_geeignet_fuer: ["saubere Messung der einfachen Reaktionszeit (Zeigerbewegung ist eingerechnet; dafür 101)", "Üben von Impulskontrolle mit Nicht-Reagieren-Reizen (keine Köder; dafür 102 oder 511)", "echtes Vorhalten/Winkelhalten an einer festen Kante (Ort ist zufällig, 1 von 8)", "ruhiges Üben ohne Zeitdruck", "Personen, die Schuss-/Kampfthematik nicht möchten"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Wiederholung verbessert solche Reaktions-/Zielaufgaben zuverlässig, vor allem über Strategie, Gerätegewöhnung und Bewegungsökonomie; die einfache Reaktionszeit selbst ist kaum übbar (Basner et al., 2018), große Effekte digitaler Sehtrainings zeigen sich fast nur in trainingsähnlichen Tests (Guo et al., 2025); zu dieser Übung oder zum Transfer auf Spiel oder Alltag gibt es keine Studie."
aehnliche_uebungen: [511, 307, 503, 101, 302, 303, 508, 501, 102, 202, 801, 401]
stichworte: ["Peek", "Jiggle Peek", "Winkel halten", "Pre-Aim", "Deckungskante", "plötzlicher Reizbeginn", "abrupt onset", "räumliche Unsicherheit", "einfache Reaktion", "Auge-Hand-Koordination", "Fitts", "Aim Trainer", "Touch"]
---

# 308 · Hinter der Deckung – auf Ziele reagieren, die an einer von acht Kanten auftauchen

> Original: „FPS-Aim-Training – Winkel halten · Peeks erkennen“ („Jiggle Peek Trainer“) – skilldrills.online, Kapitel Reaktionsgeschwindigkeit · Blickfit: noch nicht umgesetzt (verwandt: „Blitzreaktion“ zu 101)

## 1. Kurzbeschreibung
Das Spielfeld zeigt vier gleich große, dunkle Blöcke mit rötlichem Rand, zwei oben und zwei unten. Nach einer kurzen Pause taucht an der linken oder rechten Kante eines zufällig gewählten Blocks ein leuchtend roter Kreis auf und schiebt sich ein Stück aus der Deckung. Man klickt oder tippt ihn an, bevor er wieder verschwindet; danach folgt sofort das nächste Ziel. Treffer bringen Punkte und Zeit, Fehlklicks und verpasste Ziele kosten Zeit und die Combo. Mit steigendem Level werden Ziele kleiner, kürzer sichtbar und folgen dichter aufeinander.

## 2. Ablauf im Original (Analyse)
Quelle: Regeltext und ausgelieferter Spielcode (spielspezifischer Chunk `34928-…`, heruntergeladen am 29.09.2026, am 30.09.2026 erneut geladen und die Werte unten nachgeprüft; kein Code übernommen). Werte in CSS-Pixeln; Winkel = eigene Rechnung (EIG) für einen 24″-FHD-Monitor im Vollbild in 60 cm (≈ 37,8 px/°).
- **Eingabe (Code):** `pointerdown` auf dem Canvas – Maus, Touchpad und Touch gleichwertig; keine Pointer-Sperre. Bei Touch-/Mobilgeräten (Erkennung über User-Agent, Breite < 768 px oder Touch-Fähigkeit) wird die Trefferzone um 10 px vergrößert und kein Fadenkreuz gezeichnet. Esc beendet; Vollbild ist optional.
- **Szene (Code):** 4 Blöcke, Breite min(80 px; 12 % der Feldbreite), Höhe min(180 px; 40 % der Feldhöhe), Mittelpunkte bei 22 %/78 % der Breite und 28 %/72 % der Höhe. Das Feld ist im Fenster 16 : 9 (mind. 460–500 px hoch), im Hochformat auf kleinen Geräten 3 : 4.
- **Ziel (Code):** Block und Seite gleichverteilt → **8 gleich wahrscheinliche Kanten**; Höhe gleichverteilt in 20–80 % der Blockhöhe. Das Ziel startet mit dem Mittelpunkt genau auf der Kante (also sofort als halber Kreis mit Leuchtrand sichtbar) und gleitet in 180 ms (abbremsend) um 1,25 Radien heraus; dann steht es still bis Treffer oder Ablauf. Es gibt **kein Hin-und-her-„Jiggle“** und kein Zurückziehen. Rot (#ef4444) mit weißem Mittelpunkt auf #050508; die Blöcke werden über das Ziel gezeichnet (daher zuerst nur die äußere Hälfte sichtbar). Startlevel immer 1.
- **Parameter je Level (Code, EIG gerechnet):** Level 1 / 5 / 10 / 15: Radius 28 / 24 / 17 / 12 px (Ø 1,5° / 1,3° / 0,9° / 0,63°); Trefferzone Ø 84 / 71 / 50 / 34 px (Touch 104 / 91 / 70 / 54 px); Sichtbarkeit 1 300 / 1 055 / 682 / 380 ms; Pause 550–750 / 443–605 / 280–385 / 147–206 ms. Mit maximaler Combo auf Level 15: Sichtbarkeit 258 ms, Ø 18 px (0,48°), Trefferzone 26 px. Untergrenzen im Code: Radius ≥ 6 px, Trefferzugabe ≥ 4 px; oberhalb Level 15 sinken die Werte weiter Richtung Endwert.
- **Wertung (Code):** Treffer = 100 × Combo-Faktor (1,0 bis 3,0 ab 50 Treffern in Folge) × (1 + 0,5 · [Level − 1]/14) Punkte und **+2 s** (Uhr höchstens 60 s). Fehlklick (auch vor dem Erscheinen) und Zeitüberschreitung: Combo = 0, **−1 s**, 6 px Bildschirmwackeln, Strafton und – standardmäßig an, per Knopf „Fehlblitz umschalten“ abschaltbar – ein roter, radialer Blitz über dem Feld (50 % Deckkraft in der Mitte, 0,45 s). Das Ablaufen der Ziele hängt an einer seitenweiten Einstellung (Standard: an; auf dieser Seite kein Schalter). Das Level sinkt nie.
- **„Reaktionszeit“ (Code):** Zeitstempel beim Anlegen des Ziels bis Klick-Ereignis; enthält Anzeigeverzögerung, Blick- und Zeigerbewegung. Angezeigt wird der **Mittelwert** der Treffer, Zeitüberschreitungen fließen nicht ein.
- **Dauer (EIG):** Start 45 s. Ein Durchgang dauert auf Level 1 ≈ 1,1–1,4 s (Pause + Reaktion + Bewegung) und bringt +2 s; bei hoher Trefferquote läuft die Runde daher deutlich länger als 45 s und endet erst, wenn Fehler und Zeitüberschreitungen überwiegen. Timer und Ziel-Animation laufen zeitbasiert (bildfrequenzunabhängig); nur die Treffer-Partikel bewegen sich pro Bild (kosmetisch).
- **Widersprüche Regeltext ↔ Code:** (1) Regeltext in allen Sprachen „+0,6 s“ je Treffer, Code +2 s (bis 60 s); nur der im Code hinterlegte Ersatztext („+2s, max 60s“) stimmt. (2) Vor dem Laden steht „Ohne Zeitstrafe“, danach „zieht 0,8 s ab“; der Code zieht **immer 1 s** ab, weil die Abfrage mit erzwungenem „an“ aufgerufen wird. (3) „Winkel halten/Pre-Aim an der Kante“: Bei 8 zufälligen Kanten trifft ein fest gehaltener Winkel nur in 1 von 8 Durchgängen (12,5 %) den richtigen Ort. (4) „Erstes sichtbares Pixel“: Das Ziel erscheint sofort als halber Kreis. (5) „Abstand zur Ecke, weil das Ziel weiterläuft“: Es steht nach 180 ms still. (6) „Jiggle Peek“: kein Jiggle.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Aussagen:** Der Drill isoliere den Moment, in dem ein Gegner hinter Deckung an einer unvorhersehbaren Kante erscheint; man halte eine vorbereitete Fadenkreuzlinie, erkenne die erste Änderung und klicke mit wenig Mausweg. Zielgruppe: Valorant-, CS2- und Rainbow-Six-Spielende. Donders' mentale Chronometrie trenne Erkennen, Auswahl und Antwort; Monitor, Maus, Frames, Browser und „Netzwerklatenz“ kämen hinzu. Eine Tabelle nennt Stufen von „Basis“ (> 310 ms, < 78 % Treffer) bis „Nur Referenz“ (< 150 ms, ≥ 98 %), ausdrücklich „weder Perzentile noch Garantie für einen Spielrang“. Empfohlen: Blöcke von 5–10 min mit Pausen; der Score sei keine klinische Reflexdiagnose.

**Einordnung:**
- **Zutreffend und zurückhaltend:** Die Einschränkungen (keine Diagnose, geräteabhängig, Peeker's Advantage nur angenähert, kein Ersatz für Spieltraining, gleiche Bedingungen vergleichen) sind korrekt. Die Stufenlogik nach Donders stimmt; dass Aufmerksamkeit am erwarteten Ort das Entdecken beschleunigt, ist gut belegt (Posner et al., 1980).
- **Passt nicht zur Mechanik:** Das Kernversprechen „Winkel halten, wenig Mausweg“ ist bei 8 gleich wahrscheinlichen Kanten nur selten umsetzbar (Abschnitt 2). Nach Posner et al. (1980) bringt die Ausrichtung auf einen Ort dort einen Vorteil, an den anderen Orten aber Kosten; die sinnvollere Strategie ist eine zentrale Warteposition mit verteilter Aufmerksamkeit. Geübt wird also eher „Reagieren auf einen Reizbeginn an einem von 8 Orten + Flick“ – sehr ähnlich wie 307 und 511.
- **Tabelle ohne Datengrundlage:** Die Website sammelt selbst keine Daten; keine der Quellen enthält diese Stufen. Werte < 150 ms sind bei unbekanntem Ort als echte Reaktion praktisch nicht möglich: Schon das reine Entdecken dauert geschätzt ≈ 131 ms, die einfache Reaktion ohne Zielbewegung im Mittel 213 ms nach Hardwarekorrektur (Woods et al., 2015). Hier kommen 13–17° Zeigerweg hinzu (Abschnitt 6). „98 % Treffer“ passt schlecht zum Code, in dem Zeitüberschreitungen auf hohen Stufen häufig werden (EIG, Abschnitt 6). Die Endnote vergibt spielinterne Etiketten wie „Elite“ (S, ab ≈ 13 000 Punkten) und „LEGENDARY“ (S+, ab ≈ 16 250 Punkten; EIG aus √[Punkte/18 000] ≥ 85 % bzw. 95 %) – ebenfalls ohne Datengrundlage.
- **Kleinigkeiten:** „Netzwerklatenz“ spielt im lokalen Canvas keine Rolle. Kosinski wird für „200–250 ms“ angeführt; dort stehen ≈ 190 ms (klassisch, Licht) und ≈ 268 ms (Computermessung) – nur teilweise passend.

## 4. Optische und okulomotorische Grundlagen
- **Orte und Winkel (EIG):** Im Vollbild (1 920 × 1 080 px, 24″, 60 cm) liegen die 8 Erscheinorte von der Bildmitte aus ≈ 13,8° (innere Kanten) bzw. ≈ 17,4° (äußere Kanten) entfernt, davon ±6,3° in der Höhe; der größte Sprung zwischen zwei Orten beträgt ≈ 36°. Im Fenster (z. B. Feld 1 100 × 619 px) sind es ≈ 8–10°; am 11″-Tablet in 40 cm ≈ 8–12°. Wer in der Mitte fixiert, muss den Reizbeginn also im nahen peripheren Gesichtsfeld bemerken.
- **Sichtbarkeit:** Das Ziel ist groß (≥ 0,5°, weit über der Auflösungsgrenze von ≈ 1′ bei Visus 1,0) und kontrastreich (≈ 5 : 1 gegen den Grund, EIG). Bei simulierter Protanopie (Machado et al., 2009; EIG) bleibt Rot mit ≈ 4 : 1 deutlich sichtbar – Farbe muss nicht unterschieden werden. Der plötzliche Beginn (halber Kreis + Bewegung) ist auch peripher sehr auffällig; Sehschärfe ist kein Engpass.
- **Blicksprünge:** Vor dem Anvisieren springt der Blick meist zum Ziel; die Latenz visuell ausgelöster Sakkaden liegt bei jungen Erwachsenen im Median bei 177 ms (Bargary et al., 2017), die Hand folgt dem Auge ≈ 100 ms später (Prablanc et al., 1979). Glatte Blickfolge wird kaum gebraucht (180 ms Herausgleiten um ≈ 1 Zielbreite).
- **Brille:** Gleitsichtgläser bieten am Bildschirm im Zwischenbereich eine klare Zone von nur ≈ 13–18° Breite (je nach Glasdesign; eine Studie mit 11 Alterssichtigen in 60 cm, Han et al., 2003). Die äußeren Orte (≈ 17°) liegen im Vollbild am Rand oder außerhalb dieser Zone, die oberen Blöcke im Fernteil; Bemerken gelingt meist trotzdem, das genaue Treffen kleiner Ziele verlangt aber Kopfbewegungen. Mit Gleitsicht wird der Kopf am Monitor zudem ≈ 7° stärker angehoben (Jaschinski et al., 2015). Empfehlung: Fenster statt Vollbild oder Arbeitsplatz-/Bildschirmbrille; Tablet flach unter Augenhöhe halten.
- **Trockenes Auge:** Am Bildschirm sinkt die Lidschlagrate im Mittel auf etwa ein Fünftel (Patel et al., 1991); eine sich verlängernde Runde mit starrem Blick verstärkt das.
- **Bildschirm:** Das Ziel wird erst mit dem nächsten Bild sichtbar (60 Hz: bis 16,7 ms, EIG); die Ende-zu-Ende-Latenz Maus → Bild betrug in Messungen 36,6 ms bei 60 Hz und 21,1 ms bei 120 Hz (Casiez et al., 2017).
- **Stereosehen = 0:** flaches 2D-Bild ohne Disparität; „hinter der Deckung“ ist nur Verdeckung.

## 5. Neurowissenschaftliche Grundlagen
- **Plötzlicher Reizbeginn:** Ein abrupt erscheinendes Objekt zieht Aufmerksamkeit auf sich und wird bevorzugt verarbeitet (Yantis & Jonides, 1984). Beteiligt ist ein vorwiegend rechtsseitiges ventrales Netzwerk (temporoparietaler Übergang, unterer Frontalkortex), das wie ein „Unterbrecher“ Aufmerksamkeit auf auffällige Ereignisse lenkt; die gezielte Vorbereitung auf einen Ort leistet ein dorsales Netzwerk (Intraparietalkortex, oberer Frontalkortex inkl. frontales Augenfeld) (Corbetta & Shulman, 2002).
- **Räumliche Erwartung:** Aufmerksamkeit am erwarteten Ort verkürzt die Entdeckungszeit, lässt sich aber kaum auf zwei nicht benachbarte Orte zugleich richten (Posner et al., 1980). Bei 8 gleich wahrscheinlichen Orten hilft eine Vorab-Ausrichtung im Mittel wenig; verlangt ist verteilte Aufmerksamkeit über das Feld.
- **Zeitliche Erwartung:** Die Pause nach einem Treffer ist eng begrenzt (550–750 ms, auf hohen Stufen ≈ 150–210 ms) und damit gut vorhersagbar; zeitliche Erwartungen beeinflussen Wahrnehmung und Handlungsbereitschaft durchgängig (Nobre et al., 2007). Vorzeitige Klicks werden als Fehlklick gewertet – eine geringe Anforderung an Zurückhaltung, aber kein Go/No-Go (keine Köder).
- **Stufenfolge:** Entdecken ≈ 131 ms (geschätzt: Reaktionszeit minus Bewegungsbeginn aus einem Tipptest), altersunabhängig; der Altersanstieg der Reaktionszeit (≈ 0,55 ms/Jahr) stammt aus der motorischen Seite (Woods et al., 2015).
- Dass die Übung bestimmte Hirnregionen „trainiert“, ist nicht untersucht.

## 6. Motorische Grundlagen
- **Zielbewegung (Fitts):** Die Bewegungszeit steigt mit log₂ des Verhältnisses von Weg zu Zielbreite (Fitts, 1954). Aus der Mitte (Vollbild) ergibt sich ein Schwierigkeitsindex von ≈ 2,9–3,1 bit auf Level 1 und ≈ 4,0–4,4 bit auf Level 15 (Shannon-Form, Trefferzone als Breite; EIG). Mausnutzer:innen erreichen in Laborstudien 3,7–4,9 bit/s (Soukoreff & MacKenzie, 2004) – grob abgeschätzt (ID ÷ Durchsatz) ≈ 0,8–1,2 s allein für die Bewegung auf Level 15, bei nur 380 ms Sichtbarkeit (EIG; geübte Spielende mit hoher Mausempfindlichkeit sind schneller, dazu gibt es für diesen Drill keine Daten). Ab etwa Level 10 gelingen Treffer mit der Maus für Durchschnittsnutzer:innen daher vor allem bei nahem Ziel oder kleinem Fenster; die Warteposition gewinnt stark an Gewicht.
- **Zwei Phasen:** Schnelle Zielbewegungen bestehen aus einem Anfangsimpuls und visuell gesteuerten Korrekturen (Elliott et al., 2010); Fehlklicks (−1 s, Combo weg) belohnen Genauigkeit vor Tempo (Speed-Accuracy-Trade-off; Heitz, 2014).
- **Touch:** Am Tablet entfällt die Zeigerübersetzung; man tippt direkt auf den Ort. Touch verkürzte die Bewegungszeit gegenüber der Maus bei Älteren um 35 %, bei Jüngeren um 16 % (Findlater et al., 2013). Die Trefferzone (iPad 11″: Ø ≈ 20 mm auf Level 1, ≈ 10 mm auf Level 15; EIG) liegt über der Touch-Empfehlung von 9,2 mm (Parhi et al., 2006); das sichtbare Ziel wird aber bis ≈ 4,6 mm klein, und die Hand verdeckt Teile des Feldes.
- **Ruhige Hand:** wird empfohlen, aber nicht gemessen; physiologischer Tremor (≈ 8–12 Hz) ist bei Trefferzonen ≥ 0,7° kein Engpass, Parkinson-Tremor (3–6 Hz) kann stören (McAuley & Marsden, 2000).

## 7. Einflussfaktoren und Messgrenzen
- **Feldgröße:** Fenster, Vollbild und Gerät ändern Winkel und Zeigerweg um das Zwei- bis Dreifache (Abschnitt 4) – das verändert die Aufgabe grundlegend.
- **Gerät und Browser:** Browser-Reaktionszeiten sind um 58–133 ms zu lang, je nach Gerät (Pronk et al., 2020); Tablet-Tipplatenzen liegen bei 48–276 ms (Casiez et al., 2017). Bei 43 erfahrenen CS:GO-Spielenden verbesserten schon kleine Senkungen der lokalen Latenz (Bereich unter 125 ms) Trefferquote und Punkte deutlich (Liu et al., 2021; Abstract geprüft, eine genaue Größe je 10 ms konnte im Volltext nicht nachgeprüft werden).
- **Zustand und Alter:** Kurzer totaler Schlafentzug (< 48 h) wirkt am stärksten auf Aussetzer in einfachen Aufmerksamkeitsaufgaben (g = −0,776; Lim & Dinges, 2010); die Wahlreaktion verlangsamt sich über das ganze Erwachsenenalter (Der & Deary, 2006).
- **Messgüte:** Die „Reaktionszeit“ ist ein Mittelwert aus Reaktion + Bewegung, abhängig von Warteposition und Ort, ohne Zeitüberschreitungen; Punkte hängen von Combo und verlängerter Rundendauer ab. Die Note (√[Punkte/18 000]) ist daher ein Mix aus Tempo, Fehlerfreiheit und Ausdauer. Nur Selbstvergleich unter gleichen Bedingungen ist sinnvoll. Aim-Trainer-Metriken können sehr zuverlässig sein (ICC 0,947–0,995; Rogers et al., 2024 – andere Plattform, nicht dieser Drill).

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt – stark:** Reaktions- und Zielaufgaben verbessern sich mit Wiederholung, besonders in den ersten Sitzungen. Die einfache Reaktionszeit selbst änderte sich über 16 Durchgänge eines Wachsamkeitstests nicht systematisch (Basner et al., 2018); Baseballtraining verbesserte die Go/No-Go-, nicht die einfache Reaktion (Kida et al., 2005). Fortschritt hier stammt also vor allem aus Strategie (Warteposition, Fenstergröße), Gerätegewöhnung und schnellerem Anvisieren (eigene Einschätzung).
- **Naher Transfer – schwach:** Digitale Sport-Sehtrainings zeigen für die Reaktionszeit sehr große Effekte in trainingsähnlichen, aber deutlich kleinere (mittlere) in unähnlichen Tests (SMD 2,66 vs. 0,50; 33 randomisierte Studien; Guo et al., 2025). Für Actionspiele widersprechen sich Meta-Analysen (g = 0,34 mit Publikationsbias vs. „kleine bis keine“ Effekte; Bediou et al., 2018; Sala et al., 2018).
- **Alltagstransfer – fehlend:** Keine Studie zu diesem oder ähnlichen Browser-Drills und Spielleistung, Verkehr oder Beruf; für Ferntransfer allgemeiner Wahrnehmungstrainings auf Sport gibt es keine unterstützende Evidenz (Fransen, 2024; Simons et al., 2016).

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** jemand schnelles Reagieren auf plötzlich erscheinende Reize an mehreren bekannten Orten mit anschließendem Antippen üben möchte, gern spielerisch und auch am Tablet; FPS-Interesse; als Aufwärmen.
- **Weniger passend, wenn …** eine reine Reaktionszeit gemessen werden soll (101), Impulskontrolle mit Köder-Reizen gefragt ist (102, 511), eine Wahlreaktion mit Symbolen geübt werden soll (202) oder ohne Zeitdruck geübt werden soll.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: roter radialer Fehlerblitz (standardmäßig an) bei jedem Fehlklick und jeder Zeitüberschreitung; in der Mitte gesättigtes Rot (linearer Rotanteil ≈ 0,85, WCAG-Grenze 0,8) bei geringem Helligkeitssprung (ΔL ≈ 0,05; EIG, nicht gemessen). Auf hohen Stufen läuft alle ≈ 0,5–0,6 s ein Ziel ab (≈ 1,7–1,9 Blitze/s), mit schnellen Fehlklicks sind rechnerisch > 3 Blitze/s möglich (WCAG-Grenze). Blitz abschalten.
  - `presbyopie_gleitsicht`: Orte bis ≈ 17° seitlich und ±6° in der Höhe → Fenster statt Vollbild, Arbeitsplatzbrille bevorzugen.
  - `gesichtsfeldausfall`: Reize erscheinen links und rechts im Umfeld; bei Ausfall einer Seite werden sie spät bemerkt. Die Übung sagt nichts über das Gesichtsfeld aus.
  - `sehbehinderung_niedriger_visus`: Ziele bis ≈ 0,6° (mit Combo ≈ 0,5°), nur 90–380 ms sichtbar und bis ≈ 17° seitlich – bei geringer Sehschärfe oder Kontrastempfindlichkeit werden sie spät oder gar nicht bemerkt; nur niedrige Stufen, großes Feld nah am Auge vermeiden, Ziele vergrößern.
  - `trockenes_auge_bildschirm`: starrer Blick, Runde kann sich verlängern → Pausen.
  - `tremor_parkinson`, `hand_arm_beschwerden`: viele schnelle Zeigerbewegungen unter Zeitdruck; am Tablet ggf. leichter.
  - `kognitive_einschraenkung`, `aufmerksamkeitsprobleme`: selbstverschärfender Zeitdruck mit Blitz, Ton und Wackeln – nur als Spiel auf niedriger Stufe.
- **Abgrenzung (Überschneidungen):** 101 = einfache Reaktion ohne Zielbewegung und ohne Ortsunsicherheit; 102 = Go/No-Go (Hemmen auf Nicht-Reize), hier fehlt jede Hemmung außer „nicht zu früh klicken“; 202 = Wahlreaktion mit gelernter Zuordnung, hier nur räumlich kompatibles „Hinzeigen“; 503 = Reaktion am Fadenkreuz ohne Zeigerweg, mit Täuschreizen; 511 = gleiches Szenario mit 2 Kanten und Ködern (echtes Winkelhalten möglich); 307 = gleiche Mechanik mit 5 Türen in einer Reihe; 302/303/501/508 = Klickziele ohne Deckung (mehrere Ziele, Raster, Flicks, Reihenfolge).
- **Kombiniert gut mit …** 101 (einfache Reaktion ohne Zielen), 102 (Go/No-Go), 511 (zwei Kanten mit Ködern), 307 (fünf Türen), 503 (FPS-Sofortreaktion), 801 (periphere Reize).
Keine Diagnose, kein Seh- oder Reaktionstest im medizinischen Sinn.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Aufgabe ehrlich benennen:** „Lichtpunkt taucht an einer Kante auf – antippen“; Zahl der möglichen Orte als Stufe (2 → 4 → 8) statt versprochenem „Winkelhalten“. Optional ein Modus mit Hinweis auf den wahrscheinlichen Ort (Posner-Paradigma), der Vorteil und Kosten der Erwartung erlebbar macht.
- **Tablet/Touch:** Start mit Finger auf einer Haltefläche in der Mitte; gemessen werden Loslassen (Reaktion) und Treffer (Bewegung) getrennt. Ziel ≥ 1,5° bzw. ≥ 10 mm, Orte ≤ 12° vom Zentrum (Gleitsicht, 11″ in 40 cm).
- **Messung:** Median und Streuung, getrennt nach Reaktion und Bewegung sowie nah/fern; vorzeitige Tipps (< 100 ms) gesondert; feste Rundendauer statt Zeitgutschrift; keine Stufen-Tabellen oder Ränge.
- **Pause:** zufällige, „nicht alternde“ Wartezeit statt enger Gleichverteilung (vgl. `docs/wissenschaft/01`), damit echte Reaktion statt Takt geübt wird.
- **Sicherheit/Zugänglichkeit:** kein roter Blitz, kein Wackeln, `prefers-reduced-motion` beachten (WCAG 2.3.1); Zielfarbe hell auf dunkel, farbunabhängig; Abstand und Feldgröße einstellbar.
- **Sprache/Thema:** neutrale Rahmung ohne „Gegner“; Regeltext = Code; DE/IT (das Original hat keine italienische Fassung).

## 11. Quellen
### Von der Website angegeben
- Donders, F. C. (1969). On the speed of mental processes (W. G. Koster, Übers.). *Acta Psychologica, 30*, 412–431 (Original 1868). https://doi.org/10.1016/0001-6918(69)90065-1 – **Prüfung:** DOI stimmt ✓ (englische Übersetzung 1969; Inhalt über Sekundärquellen); **stützt die Aussage der Website:** ja (Trennung von Entdecken, Auswahl und Antwort).
- Kosinski, R. J. (2013). *A literature review on reaction time* (Stand September 2013). Clemson University. http://www.cognaction.org/cogs105/readings/clemson.rt.pdf – **Prüfung:** keine DOI, unbegutachtetes Skript; die angegebene Fassung von 2008 wurde nicht gefunden, geprüft wurde die Fassung von 2013; **stützt:** teilweise (≈ 190 ms klassisch, ≈ 268 ms per Computer statt „200–250 ms“; keine Stufentabelle).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓, Volltext gelesen; **stützt:** ja für „Hardware beeinflusst den Wert“ (Anzeige + Maus 17,8 ms, bis 100 ms möglich), nein für die Stufen < 150 ms (Mittel 213–231 ms ohne Zielbewegung).

### Weitere Fachliteratur
- Bargary, G., Bosten, J. M., Goodbourn, P. T., Lawrance-Owen, A. J., Hogg, R. E., & Mollon, J. D. (2017). Individual differences in human eye movements: An oculomotor signature? *Vision Research, 141*, 157–169. https://doi.org/10.1016/j.visres.2017.03.001 – Sakkadenlatenz Median 177 ms.
- Basner, M., Hermosillo, E., Nasrini, J., McGuire, S., Saxena, S., Moore, T. M., Gur, R. C., & Dinges, D. F. (2018). Repeated administration effects on Psychomotor Vigilance Test performance. *Sleep, 41*(1), zsx187. https://doi.org/10.1093/sleep/zsx187 – einfache Reaktion kaum übbar.
- Bediou, B., Adams, D. M., Mayer, R. E., Tipton, E., Green, C. S., & Bavelier, D. (2018). Meta-analysis of action video game impact on perceptual, attentional, and cognitive skills. *Psychological Bulletin, 144*(1), 77–110. https://doi.org/10.1037/bul0000130 – Actionspiele, g = 0,34.
- Casiez, G., Pietrzak, T., Marchal, D., Poulmane, S., Falce, M., & Roussel, N. (2017). Characterizing latency in touch and button-equipped interactive systems. In *Proceedings of UIST '17* (S. 29–39). ACM. https://doi.org/10.1145/3126594.3126606 – Ende-zu-Ende-Latenz Maus/Touch.
- Corbetta, M., & Shulman, G. L. (2002). Control of goal-directed and stimulus-driven attention in the brain. *Nature Reviews Neuroscience, 3*(3), 201–215. https://doi.org/10.1038/nrn755 – dorsales/ventrales Aufmerksamkeitsnetzwerk (Abstract geprüft).
- Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood. *Psychology and Aging, 21*(1), 62–73. https://doi.org/10.1037/0882-7974.21.1.62 – Alter und Wahlreaktion.
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming: Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 – Anfangsimpuls + Korrektur.
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of CHI '13* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Touch vs. Maus nach Alter.
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – Fitts'sches Gesetz.
- Fransen, J. (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. *Sports Medicine, 54*(11), 2717–2724. https://doi.org/10.1007/s40279-024-02060-x – kein Ferntransfer.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Effekte vor allem bei trainingsähnlichen Tests.
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – klare Gleitsicht-Zone 13–18°.
- Heitz, R. P. (2014). The speed-accuracy tradeoff: History, physiology, methodology, and behavior. *Frontiers in Neuroscience, 8*, 150. https://doi.org/10.3389/fnins.2014.00150 – Tempo und Genauigkeit gemeinsam lesen.
- Jaschinski, W., König, M., Mekontso, T. M., Ohlendorf, A., & Welscher, M. (2015). Computer vision syndrome in presbyopia and beginning presbyopia: Effects of spectacle lens type. *Clinical and Experimental Optometry, 98*(3), 228–233. https://doi.org/10.1111/cxo.12248 – Kopfhaltung mit Gleitsicht.
- Kida, N., Oda, S., & Matsumura, M. (2005). Intensive baseball practice improves the Go/Nogo reaction time, but not the simple reaction time. *Cognitive Brain Research, 22*(2), 257–264. https://doi.org/10.1016/j.cogbrainres.2004.09.003 – einfache Reaktion durch Sport nicht schneller.
- Lim, J., & Dinges, D. F. (2010). A meta-analysis of the impact of short-term sleep deprivation on cognitive variables. *Psychological Bulletin, 136*(3), 375–389. https://doi.org/10.1037/a0018883 – Schlafmangel.
- Liu, S., Claypool, M., Kuwahara, A., Sherman, J., & Scovell, J. J. (2021). Lower is better? The effects of local latencies on competitive first-person shooter game players. In *Proceedings of CHI '21* (S. 1–12). ACM. https://doi.org/10.1145/3411764.3445245 – lokale Latenz im Shooter.
- Machado, G. M., Oliveira, M. M., & Fernandes, L. A. F. (2009). A physiologically-based model for simulation of color vision deficiency. *IEEE Transactions on Visualization and Computer Graphics, 15*(6), 1291–1298. https://doi.org/10.1109/TVCG.2009.113 – Grundlage der Protanopie-Simulation (EIG).
- McAuley, J. H., & Marsden, C. D. (2000). Physiological and pathological tremors and rhythmic central motor control. *Brain, 123*(8), 1545–1567. https://doi.org/10.1093/brain/123.8.1545 – Tremorfrequenzen.
- Nobre, A., Correa, A., & Coull, J. (2007). The hazards of time. *Current Opinion in Neurobiology, 17*(4), 465–470. https://doi.org/10.1016/j.conb.2007.07.006 – zeitliche Erwartung (Abstract geprüft).
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of MobileHCI '06* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – Touch-Zielgröße 9,2 mm.
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm.
- Posner, M. I., Snyder, C. R. R., & Davidson, B. J. (1980). Attention and the detection of signals. *Journal of Experimental Psychology: General, 109*(2), 160–174. https://doi.org/10.1037/0096-3445.109.2.160 – räumliche Erwartung, Nutzen und Kosten.
- Prablanc, C., Echallier, J. F., Komilis, E., & Jeannerod, M. (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. *Biological Cybernetics, 35*(2), 113–124. https://doi.org/10.1007/BF00337436 – Auge führt die Hand.
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Browser-Messfehler.
- Rogers, E. J., Trotter, M. G., Johnson, D., Desbrow, B., & King, N. (2024). KovaaK's aim trainer as a reliable metrics platform for assessing shooting proficiency in esports players: A pilot study. *Frontiers in Sports and Active Living, 6*, 1309991. https://doi.org/10.3389/fspor.2024.1309991 – Zuverlässigkeit von Aim-Trainern.
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – kleine bis keine Effekte.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer allgemein.
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts' law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 – Maus-Durchsatz 3,7–4,9 bit/s.
- Yantis, S., & Jonides, J. (1984). Abrupt visual onsets and selective attention: Evidence from visual search. *Journal of Experimental Psychology: Human Perception and Performance, 10*(5), 601–621. https://doi.org/10.1037/0096-1523.10.5.601 – plötzlicher Reizbeginn zieht Aufmerksamkeit an (Abstract geprüft).
- W3C. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*, Kriterium 2.3.1 (Norm, keine DOI). https://www.w3.org/TR/WCAG22/ – Blitzgrenzen.
