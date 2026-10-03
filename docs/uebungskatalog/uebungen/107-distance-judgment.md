---
# ===== Kennung =====
nr: 107
kennung: distance-judgment
name: "Kugel-Ankunft abpassen (Zeit bis zum Ring schätzen)"
name_original: "Räumliches Sehen Test – Tiefensehen & Entfernung üben (Distance Judgment)"
kapitel: "Visuelle Wahrnehmung"
kapitel_original: "visual"
unterkapitel_original: "depth-perception"
quelle_url: "https://skilldrills.online/de/drills/visual/depth-perception/distance-judgment"
blickfit_umsetzung: {kennung: "punktlandung", name: "Punktlandung", unterschiede: "Physikalisch stimmige Annäherung (1/Radius sinkt linear) statt linearem Radiuswachstum; Zielring fest, Flugzeit 1,2–2,5 s (ab Stufe 6: 0,8–3,5 s) und Startgröße zufällig; Verdeckung als Schwierigkeit (0 bis 1.200 ms vor dem Ring unsichtbar); Bewertung in Millisekunden (Volltreffer ±30 ms bzw. 6 % der Verdeckung); adaptive Stufen (3 richtig = schwerer, 1 Fehler = leichter, 12 Stufen); 14 Durchgänge statt 45 s Zeitlimit; Rückmeldung 'x ms zu früh/spät' mit Tendenz; Tippzeit aus dem Ereigniszeitstempel; kein 'Räumliches Sehen' im Text."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Eine Kugel kommt aus dem Hintergrund eines dunklen Tunnels auf einen gestrichelten Ring zu und wird dabei immer schneller größer. Man tippt genau in dem Moment, in dem sie den Ring erreicht; auf höheren Stufen verschwindet sie kurz vorher. Die Rückmeldung nennt die Abweichung in Millisekunden (zu früh oder zu spät). Es geht um das Abschätzen der Ankunftszeit aus der Größenzunahme, nicht um echtes räumliches Sehen."
ziel_funktionen: [antizipation, bewegungswahrnehmung]
eingabe: [maus, touch]
tablet_geeignet: ja
dauer_sekunden: 45
schwierigkeit_anpassung: "Level = Punkte/750 + 1 (5 Volltreffer je Level). Höheres Level: Flugzeit kürzer (2.200 − 130 ms × Level, mindestens 500 ms; Streuung ±(8 + 4 × Level) %, höchstens ±50 %), Zielring-Größe streut breiter (Level 1: 33–67 % des Maximalradius, mit dem Level bis höchstens 20–80 %), Toleranz enger (Volltreffer 7 → 4 Prozentpunkte, erreicht bei Level 10; gut 16 → 10, erreicht erst bei Level 12)."
messgroessen: ["Punkte (150 Volltreffer / 100 gut)", "Trefferquote in %", "erreichtes Level", "sinnvoll ergänzt: vorzeichenbehafteter Timingfehler in ms (Median, Streuung), Tendenz früh/spät, Fehler je Flugzeit"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 1
    sakkaden: 0
    fixation: 1
    bewegungswahrnehmung: 3
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 1
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 0
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 0
    antizipation: 3
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 1
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
  zeitdruck: 2
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Eine Bildschirmberührung, ein Mausklick oder (laut Website) die Leertaste genügt; ein Tastatur-Handler wurde im Code nicht gefunden", "Zielring und Kugel müssen klar erkennbar sein (dunkler Hintergrund, Cyan auf Schwarzblau)", "kein Farbsehen im engeren Sinn nötig", "gleiches Gerät für Vergleiche (Touch-Latenz)"]
vorsicht_bei: [presbyopie_gleitsicht, sehbehinderung_niedriger_visus]
geeignet_fuer: ["Timing aus der Größenzunahme (Zeit bis zum Kontakt) bei sichtbarer Annäherung üben", "Rückmeldung zur eigenen Tendenz (eher zu früh oder zu spät tippen) als Gesprächsanlass", "kurze, einfache Einstiegsübung ohne Text, Sprache oder Farbcodes", "Antizipations-Timing als Ergänzung zu Reaktions- und Blickübungen"]
weniger_geeignet_fuer: ["Training oder Test des räumlichen (Stereo-)Sehens – am Bildschirm gibt es keine Disparität", "Vorbereitung auf den Sehtest für Führerschein Gruppe 2 (Stereosehen wird dort mit Zufallspunkt-Tests geprüft)", "Nachweis oder Verbesserung der Fahrsicherheit", "Menschen, die genaue ms-Messwerte brauchen (Frame- und Touch-Latenz)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Antizipations-Timing (CAT/Prediction Motion) wird mit Übung besser (kleine Studien); Transfer auf andere Aufgaben ist offen, für Bildschirm-Looming auf Verkehr oder Sport gibt es keinen Beleg."
aehnliche_uebungen: [101, 104, 302, 407, 409, 802]
stichworte: ["Looming", "Zeit bis zum Kontakt", "Time-to-Contact", "tau", "Antizipations-Timing", "coincidence anticipation", "Prediction Motion", "monokulare Tiefenhinweise", "kein Stereosehen"]
---

# 107 · Kugel-Ankunft abpassen (Zeit bis zum Ring schätzen)

> Original: „Räumliches Sehen Test online | Entfernungen üben“ – skilldrills.online, Kapitel Visuelle Wahrnehmung (Unterkapitel depth-perception) · Blickfit: umgesetzt als „Punktlandung“ (`src/exercises/punktlandung/`)

## 1. Kurzbeschreibung

In der Mitte eines dunklen Tunnels liegt ein gestrichelter Zielring. Nach einem kurzen, zufällig langen Vorlauf kommt eine Kugel von weit her auf den Ring zu und wird dabei zum Schluss immer schneller größer, wie ein echter Ball. Sobald sie den Ring erreicht, soll man tippen oder klicken. Auf höheren Stufen ist die Kugel in den letzten 200 bis 1.200 ms vor dem Ring unsichtbar, und man muss ihre Ankunft gedanklich fortführen. Nach jedem Tipp zeigt die Übung die Abweichung in Millisekunden („zu früh“, „zu spät“) mit einem Zeitbalken; ein Durchgang besteht aus 14 Versuchen (etwa eine Minute). Die Stufe passt sich an: Nach drei gelungenen Versuchen wird es schwerer, nach einem Fehlversuch leichter. Geschätzt wird **die Ankunftszeit aus der Größenzunahme** (Time-to-Contact, „Looming“, Coincidence-Anticipation-Timing). Es ist **weder ein Test noch ein Training des räumlichen Sehens**: Beide Augen sehen dasselbe flache Bild, echte Stereo-Tiefe (binokulare Disparität) gibt es nicht.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext und ausgeliefertes Spiel-Chunk (Stand 29.09.2026) sowie `docs/skilldrills-analyse.md`; nur Mechanik, kein Code übernommen.
- **Sitzung:** Countdown 3-2-1-GO (ca. 2,45 s), dann **45 s** Spielzeit (Uhr läuft mit `performance.now()`), Ende automatisch. Ergebnis: Punkte, Trefferquote, Level, Note; Bestwert im Browser (localStorage).
- **Versuch (Code):** Die Kugel wächst **linear** (Radius = Anteil × 0,35 × kürzere Canvas-Seite, Start mindestens 10 %) über die Versuchsdauer. Der Zielring hat je Versuch einen zufälligen Anteil am Maximalradius (Level 1: 33–67 %, später breiter bis höchstens 20–80 %; gestrichelt, 3 px, Cyan) und bleibt im Versuch fest. Bei 650 px Canvas-Höhe sind das Ringradien von etwa 45–180 px, bei 36 px/° (Tablet, 40 cm) ca. 1,3–5° (eigene Rechnung, Annahme Canvashöhe).
- **Zeitparameter (Code):** Versuchsdauer = max(500; 2.200 − 130 × Level) ms × (1 ± Streuung); Level 1: rund 1,8–2,3 s bis zum Maximalradius, der Ring wird schon nach etwa der Hälfte erreicht (Ring bei 33–67 %). Level 10: 468–1.332 ms. Pause zwischen Versuchen 350 ms (Treffer), 400 ms (Fehltipp) bzw. 450 ms (Zeitüberschreitung).
- **Wertung (Code):** Fehler = |Größenanteil beim Tipp − Ringanteil| in **Prozentpunkten des Maximalradius** (nicht Prozent der Ringgröße). Volltreffer ≤ max(4; 7 − ⌊0,3 × Level⌋) → **+150**; gut ≤ max(10; 16 − ⌊0,5 × Level⌋) → **+100**; sonst Fehlversuch, **kein Punktabzug**. Umgerechnet in Zeit: Level 1 (Ø 2,07 s) Volltreffer ≈ ±145 ms, gut ≈ ±330 ms; Level 10 (Ø 0,9 s) ≈ ±36 ms bzw. ≈ ±100 ms (eigene Rechnung). Level = ⌊Punkte / 750⌋ + 1.
- **Timeout:** Erreicht die Kugel 100 %, zählt das als Fehlversuch (nur wenn die Einstellung „Zeitlimit“ an ist, sonst bleibt sie bei 99,9 % stehen).
- **Eingabe:** `pointerdown` auf der Spielfläche (Maus/Touch/Stift). Die Größe zum Tippzeitpunkt wird aus dem **zuletzt gezeichneten Bild** übernommen, nicht aus dem Zeitstempel des Tipps – ein Fehler von bis zu einem Bild (16,7 ms bei 60 Hz) ist eingebaut. Ein Tastatur-Handler (Leertaste) wurde in den geladenen Skripten **nicht gefunden**; die Anleitung nennt ihn trotzdem.
- **Zeitbasis:** Größe wird aus der Uhr berechnet (nicht pro Frame), daher **bildfrequenzunabhängig** (anders als 104/105).
- **Widersprüche Text ↔ Code:** „Unter 5 % / unter 12 % Tiefenfehler“ ↔ Prozentpunkte der Maximalgröße, die mit dem Level enger werden; „Tiefenwahrnehmung/Stereosehen“ ↔ reines Looming ohne Perspektive; „exponentiell wachsend“ ↔ linear; „Tunnel/3D-Kugel“ ↔ 2D-Kreis mit Schattierung; „Tier 1–5“-Tabelle ↔ Spiel zeigt eine Buchstabennote (S+ bis F, Referenz 1.500 Punkte) und keine „Tiefenabweichung in %“.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Aussagen:** Der Drill messe „räumliches Sehen“, trainiere Looming, Time-to-Contact, Auge-Hand-Timing und räumliche Antizipation; geeignet für Autofahrer, Berufskraftfahrer („Vorbereitung auf den Sehtest für LKW-/Personenbeförderungs-Führerscheine“), Ballsportler, Piloten, Gamer. Die neuronale Verarbeitungsgeschwindigkeit für Looming lasse sich „messbar schärfen“. Eine Leistungstabelle („Tier 1: Apex Stereoskopie-Meister … Tier 5: Entwicklungsbedarf, erhebliche zeitliche Schätzfehler“) ordnet Fehler und Punkte ein. Die Seite behauptet, Ballspieler steuerten den Schwung „auf die Millisekunde genau“ über die Expansionsrate, und höhere Monitor-Hz erlaubten „feinkörnigere Erkennung der Expansionskante“.

**Einordnung:**
- **Belegt:** Menschen schätzen Kontaktzeit aus der Größenzunahme (Lee, 1976; Regan & Beverley, 1978); Genauigkeit begrenzt (s. Abschnitt 4). Bei Übung verbessert sich Antizipations-Timing in der geübten Aufgabe (Abschnitt 8).
- **Falsch bzw. irreführend:** „Räumliches Sehen / Stereoskopie-Meister“ – Stereopsis braucht getrennte Bilder je Auge; am normalen Bildschirm ist sie physikalisch nicht beteiligt. Die Aufgabe ist auch für Stereoblinde (ca. 7 % der Erwachsenen unter 60, Chopin et al., 2019) und Schielende lösbar. Howard-Dolman (1919) und Julesz (1971) messen binokulare Disparität, nicht Looming.
- **Führerschein:** Die deutsche FeV (Anlage 6 Nr. 2.1.2) verlangt für Gruppe 2 und Fahrgastbeförderung Stereosehen, geprüft mit einem geeigneten Test (z. B. Zufallspunkt-Test). Ein 2D-Looming-Spiel kann darauf **nicht** vorbereiten; für Südtirol/Italien nicht geprüft. Keine Zusage in Richtung Führerscheinsicht machen.
- **Physik:** Das Netzhautbild einer mit gleichbleibender Geschwindigkeit nahenden Kugel wächst nicht „exponentiell“ und nicht linear, sondern **hyperbolisch** (Bildradius ∝ 1/Entfernung, Herleitung in `docs/wissenschaft/03`, Abschn. 1.4). Das lineare Wachstum des Originals entspricht einem stark abbremsenden Objekt; eine tau-Schätzung fällt dann zu früh aus.
- **„Tier“-Tabelle:** ohne Datengrundlage (die Seite sagt selbst, sie sammle keine Daten); außerdem gerätabhängig.
- **Bildwiederholrate:** Bildwechsel 16,7/6,9/4,2 ms (60/144/240 Hz) stimmen rechnerisch; wichtiger als Hz ist aber die Gesamtlatenz (Spjut et al., 2019). Die „Differenzen < 5 ms sind Rauschen“-Aussage passt nicht zu Touch: Geräte messen 58–70 ms zu lang, Streuung ≈ 7 ms (Pronk et al., 2020).
- **Woods et al. (2015)** behandelt einfache Reaktionszeit, nicht Looming-Timing.

## 4. Optische und okulomotorische Grundlagen

- **Hinweise am Bildschirm:** Es gibt nur monokulare Hinweise: Größenzunahme (Looming, tau = Bildgröße / Größenänderungsrate; Lee, 1976), Endgröße der Kugel und aufgemalte Perspektivlinien. Die Zierlinien des Tunnels ändern sich nicht und tragen keine Zeitinformation.
- **Physik der Annäherung:** Das Netzhautbild einer mit gleichbleibender Geschwindigkeit nahenden Kugel wächst nicht linear, sondern hyperbolisch (Bildradius ∝ 1/Entfernung); die Kugel wird zum Schluss immer schneller größer, und genau diese Information nutzt die Übung.
- **Genauigkeit:** Mit nur einem Auge lag die Unterschiedsschwelle für Kontaktzeiten bei 5,8–12 %, der Schätzfehler bei 2–12 %; mit beiden Augen (echte Szene, kleine, nahe Objekte) nur 1,3–2,7 % (Gray & Regan, 1998). Am Bildschirm fehlt der binokulare Anteil – die Fehlergrenze dürfte daher eher im monokularen Bereich liegen (Schlussfolgerung, nicht direkt untersucht).
- **Verzerrungen:** Kontaktzeiten werden unterschätzt, zunehmend bei längeren Zeiten (Schiff & Detwiler, 1979); die strenge tau-Hypothese gilt als widerlegt, genutzt werden auch Heuristiken wie die Endgröße (Tresilian, 1999). Mit Fahrern wuchs die Streuung linear mit der Kontaktzeit (Hoffmann & Mortimer, 1994).
- **Blickführung:** Kugel und Ring liegen in der Mitte; eine glatte Folgebewegung ist kaum nötig (die Kugel bewegt sich nicht, sie wächst nur), der Blick hält die Mitte. Bei Prediction-Motion-Aufgaben verbesserte Mitverfolgen mit den Augen die Schätzung (Bennett et al., 2010) – für diese Übung nicht relevant. Der Reiz liegt zentral, daher keine Anforderung an peripheres Sehen oder feine Details.
- **Brille/Alter:** Zentraler großer Reiz; der Nahteil der Gleitsichtbrille reicht bei Tablet-Abstand (in einer Smartphone-Studie hielten Presbyope das Gerät weiter weg: 39,7 vs. 33,4 cm; Boccardo et al., 2023). Der Akkommodationsaufwand wächst mit kürzerem Abstand nach der Rechenregel 1/Abstand in Metern: 40 cm entsprechen 2,5 dpt, 20 cm 5 dpt, 10 cm 10 dpt. Bei Presbyopie (ab ca. 40 J.; Charman, 2008) kann Unschärfe der Ringlinie die Größenbeurteilung erschweren – Arbeitsplatzbrille und Bildschirmabstand prüfen. Bei Gleitsicht-Neulingen änderten sich Augen- und Kopfbewegungsstrategien (kleine Studie, n = 10; Hutchings et al., 2007); hier kaum relevant, da alles zentral liegt.
- **Trockenes Auge:** Ein Durchgang dauert etwa eine Minute; bei längeren Serien sinkt die Lidschlagrate am Bildschirm deutlich (ca. 5-fach; Patel et al., 1991).

## 5. Neurowissenschaftliche Grundlagen

Regan & Beverley (1978) beschrieben im menschlichen Sehsystem getrennte Kanäle für zunehmende bzw. abnehmende Größe („Looming-Detektoren“). Nach Lehrbuchstand sind Bewegungs- und Expansionsanalyse in den Bewegungsarealen MT/MST (Übergang von Hinterhaupts- und Schläfenlappen) beteiligt; das wird hier nicht durch eine geprüfte Einzelquelle belegt und darf nicht als „trainiert MT/MST“ formuliert werden. Die **Zeitschätzung** und Handlungsplanung (Kleinhirn, Basalganglien, Parietal- und Frontalkortex) sind allgemein an Timing-Aufgaben beteiligt; für diese Übung gibt es keine bildgebende Studie. Dass die Übung die neuronale Verarbeitung von Looming „schärft“, ist nicht belegt. Bei der Verdeckung kommt eine kognitive Komponente hinzu: Die Bewegung wird gedanklich fortgeführt (DeLucia & Liddell, 1998; Tresilian, 1995).

## 6. Motorische Grundlagen

- **Coincidence-Timing:** Ein Tipp muss so ausgelöst werden, dass er zum Ziel-Ereignis passt; der Tipp braucht Vorlauf (visuomotorische Verzögerung beim Abfangen bewegter Ziele durch Tippen: 114 ms, n = 22; Brenner et al., 2026), daher muss er **vorhergesagt** werden.
- **Kein Fitts-Aufwand:** Ein Tipp irgendwo auf der Fläche genügt; keine Zielgenauigkeit, kein Tempo der Hand.
- **Latenz:** Touch-Browser messen im Mittel 58–70 ms zu spät (Pronk et al., 2020); auch Hardware-Verzögerungen gehen in jede Zeitmessung ein (Woods et al., 2015). Die Tippzeit stammt aus dem Zeitstempel des Ereignisses und die Ankunftszeit wird berechnet, es entsteht also keine Bildquantisierung; die Gerätelatenz bleibt aber. Ein konstantes „zu spät“ kann daher zum Teil am Gerät liegen, nicht nur am Timing der Person.
- **Fehlerlogik:** Verfehlte Versuche kosten keine Strafpunkte, senken aber die Stufe; Tipps unmittelbar nach dem Erscheinen der Kugel gehören noch zum Vorlauf.

## 7. Einflussfaktoren und Messgrenzen

- **Alter:** Coincidence-Timing bleibt bei älteren Tennisspielern (60–79 J.) so genau wie bei jungen; bei älteren Nichtspielern hing die längere visuomotorische Verzögerung mit den Timingfehlern zusammen (Querschnittsstudie; Lobjois et al., 2006); die jüngsten Kinder (7–9 J.) sind schlechter, eine bewegungsarme ältere Gruppe (64–86 J.) ungenauer und variabler (Haywood, 1980).
- **Gerät:** Touch-Latenz, Bildraster und Bildschirmgröße bestimmen Ringgröße und Wachstumsrate. Nur Vergleiche auf demselben Gerät sind sinnvoll.
- **Lerneffekte:** Rhythmus- und Zählstrategien würden bei immer gleichem Ablauf funktionieren; deshalb sind Startgröße, Flugzeit und Vorlauf zufällig, und man kann nicht „die Zeit stoppen“ statt Looming zu nutzen.
- **Zuverlässigkeit:** Ein Durchgang hat 14 Versuche; die Rückmeldung nennt Abweichung und Tendenz in Millisekunden. Messungen am Menschen streuen stärker als an Prüfkörpern; darum zählt der Verlauf über mehrere Durchgänge, nicht ein Einzelwert (Mountford et al., 2004, S. 43–44). Nicht als „Sehtest“ oder Diagnose verwenden.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (mittel):** In Bassin-Timer-Aufgaben (Licht läuft eine Lampenreihe entlang) sank der mittlere Fehler nach 10 Einheiten in 3 Wochen (Bahn teilweise verdeckt; n = 12, ohne Kontrollgruppe; Koshizawa et al., 2014); 8 Wochen mit Sofort-Rückmeldung senkten den Fehler bei jungen Volleyballerinnen (8–10 J., RCT, n = 32; Amprasi et al., 2026). Kleine Studien, keine direkte Übertragung auf Bildschirm-Looming.
- **Naher Transfer (schwach):** Bei digitalem Sehtraining zeigen sich große Effekte fast nur, wenn Trainings- und Testaufgabe sehr ähnlich sind (Guo et al., 2025); allgemein wenig Transfer bei „Gehirntraining“ (Simons et al., 2016).
- **Alltag (fehlend):** Es ist keine Studie bekannt, nach der ein Looming-Timing-Training am 2D-Bildschirm Bremsen, Überholen oder Sport verbessert. Sport-Sehtraining hilft am ehesten, wenn es naturnah und sportartspezifisch ist (Lochhead et al., 2026). Für die Übung ist realistisch: bessere Treffer in der Übung und Rückmeldung zur eigenen Tendenz (früh/spät). Ein Sicherheits- oder Sehversprechen ergibt sich daraus nicht.
- **Stereosehen:** Stereo-Lernstudien brauchen getrennte Bilder je Auge (Ding & Levi, 2011; Levi et al., 2015); diese Übung leistet das nicht.

## 9. Auswahlhinweise für die KI

- **Passt, wenn** jemand ein einfaches Timing-Spiel mit klarer Rückmeldung sucht (antizipation 3, bewegungswahrnehmung 3), wenig Vorwissen, Touch oder Maus, kurze Einheiten; Gesprächsanlass zu „reagiere ich eher früh oder spät“.
- **Weniger passend, wenn** es um räumliches Sehen, Stereotests, Schielen/Amblyopie-Übungen, Führerscheinvorbereitung oder Reaktionszeit-Messung geht, oder wenn Blickfolge/Sakkaden gefordert sind (dann 105, 303, 407).
- **Vorsicht / anpassen bei:** `presbyopie_gleitsicht` (Bildschirmabstand und Brille prüfen, damit Ring und Kugel scharf sind), `sehbehinderung_niedriger_visus` (auf niedriger Stufe beginnen); kein Flimmern und keine rote Fehlerfarbe, die Systemeinstellung „Bewegung reduzieren“ wird beachtet. Keine Aussage zur Verkehrstauglichkeit.
- **Abklärung vor dem Üben:** Doppelbilder, plötzlicher einseitiger Sehverlust, Lichtblitze, neue Schleier, Kopfschmerz mit Sehverschlechterung, Schwindel oder Zittern gehören ärztlich abgeklärt; sie sind kein Anlass zum Üben (Muchnick, 2008, S. 6, 28).
- **Zeitdruck 2:** Bei Stress oder Aufmerksamkeitsproblemen die Stufe niedrig halten (die Übung ist adaptiv).
- **Kombiniert gut mit:** 101 (Reaktion), 104 (Interzeption: bewegtes Ziel treffen), 302, 407 (Vorhersage bei Bewegung), 409 (Sichtunterbrechung), 802 (Fallenlassen und Fangen als Timing-Aufgabe).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
**Schwächen des Originals:** Irreführender Name/Text („räumliches Sehen“, „Führerschein“); lineares statt hyperbolisches Wachstum (falsche tau-Information); Wertung in Prozentpunkten und Score statt ms; Größe aus dem letzten Bild statt aus dem Tipp-Zeitstempel; gleiche Startgröße fördert Zählen; Ringgröße wechselt und macht den Score uneinheitlich; keine Angabe früh/spät; unbelegte Tier-Tabelle; Cyan auf Schwarzblau ohne Kontrastoption; Ring nur 3 px dünn.
**Blickfit-Umsetzung „Punktlandung“ (index.ts, texts.ts):**
- **Physik:** 1/Radius sinkt linear (echte Perspektive); Kugel wächst zum Schluss schneller, wie ein Ball.
- **Zufall:** Startgröße 0,22–0,30 × Ring (später ab 0,10), Flugzeit 1,2–2,5 s (ab Stufe 6: 0,8–3,5 s), Vorlauf 0,6–1,5 s – kein Rhythmus.
- **Verdeckung:** Stufe 1–7: 0, 0, 200, 400, 600, 900, 1.200 ms unsichtbar (mindestens 600 ms sichtbar) – nur diese Stufen sind Prediction-Motion-Aufgaben.
- **Bewertung:** Volltreffer ≤ max(30 ms; 6 %), Super ≤ max(60 ms; 12 %) der Verdeckung; Punkte 100/60/30/10 × Stufenbonus; 3 richtig = eine Stufe schwerer, 1 Fehler = leichter (12 Stufen, Ziel ≈ 79 %).
- **Rückmeldung:** „x ms zu früh/spät“, Zeitbalken, Tendenz und Ø-Abweichung; Warnung vor Touch-Latenz („nur mit sich selbst am selben Gerät vergleichen“).
- **Umfang:** 14 Durchgänge (ca. 1 Minute) statt 45 s Zeitlimit; Reduzierte-Bewegung-Modus; keine rote Fehlerfarbe; Texte ohne „Tiefensehen/3D“.
- **Empfehlungen offen:** Kontrast-/Größenoption für den Ring, Kalibrier-Offset für Touch, Variante „Aufprall ohne Ring“ (Schiff & Detwiler, 1979), Rohdaten (ms, Tendenz) speichern, Hinweis Arbeitsplatzbrille bei Presbyopie.

## 11. Quellen
### Von der Website angegeben
- Howard, H. J. (1919). A test for the judgment of distance. *American Journal of Ophthalmology, 2*(9), 656–675. https://doi.org/10.1016/S0002-9394(19)90180-2 – **Prüfung:** Website-DOI (…90299-8) nicht registriert, korrekte DOI ✓ (Crossref); **stützt die Aussage der Website:** nein (Howard-Dolman misst binokulare Stereosehschärfe mit echten Stäben; der Drill „operationalisiert“ das nicht).
- Lee, D. N. (1976). A theory of visual control of braking based on information about time-to-collision. *Perception, 5*(4), 437–459. https://doi.org/10.1068/p050437 – **Prüfung:** DOI stimmt ✓ (Crossref, Abstract); **stützt:** teilweise (tau ja; „exponentielles Wachstum“ falsch, Original wächst linear).
- Regan, D., & Beverley, K. I. (1978). Looming detectors in the human visual pathway. *Vision Research, 18*(4), 415–421. https://doi.org/10.1016/0042-6989(78)90051-2 – **Prüfung:** Website-DOI (…90050-7) nicht registriert, korrekte DOI ✓; **stützt:** ja (Looming-Kanäle).
- Julesz, B. (1971). *Foundations of cyclopean perception*. University of Chicago Press. Buch, keine DOI (Website-DOI 10.7551/mitpress/3074.001.0001 gehört zu Yoshikawa, *Foundations of Robotics*, 1990; Buch über Rezension bestätigt: Kaufman, 1972, *Science, 176*, 633–635, https://doi.org/10.1126/science.176.4035.633) – **Prüfung:** DOI falsch; **stützt:** nein (Zufallspunkt-Stereogramme = binokulare Stereopsis, für 2D-Looming irrelevant).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Hardware-Verzögerungen ja; die Aussage „Differenzen unter 5 ms = Rauschen“ nicht, und die Studie betrifft einfache Reaktionszeit, nicht Looming-Timing).

### Weitere Fachliteratur
- Gray, R., & Regan, D. (1998). Accuracy of estimating time to collision using binocular and monocular information. *Vision Research, 38*(4), 499–512. https://doi.org/10.1016/S0042-6989(97)00230-7 – Genauigkeit monokular vs. binokular (5,8–12 % vs. 1,3–2,7 %).
- Schiff, W., & Detwiler, M. L. (1979). Information used in judging impending collision. *Perception, 8*(6), 647–658. https://doi.org/10.1068/p080647 – Unterschätzung von Kontaktzeiten.
- Tresilian, J. R. (1999). Visually timed action: Time-out for ‘tau’? *Trends in Cognitive Sciences, 3*(8), 301–310. https://doi.org/10.1016/S1364-6613(99)01352-2 – tau-Hypothese eingeschränkt.
- Tresilian, J. R. (1995). Perceptual and cognitive processes in time-to-contact estimation: Analysis of prediction-motion and relative judgment tasks. *Perception & Psychophysics, 57*(2), 231–245. https://doi.org/10.3758/BF03206510 – Prediction-Motion-Aufgaben (Verdeckung).
- Bennett, S. J., Baures, R., Hecht, H., & Benguigui, N. (2010). Eye movements influence estimation of time-to-contact in prediction motion. *Experimental Brain Research, 206*(4), 399–407. https://doi.org/10.1007/s00221-010-2416-y – Augenbewegungen und Fehler wachsen mit Kontaktzeit.
- Benguigui, N., & Bennett, S. J. (2010). Ocular pursuit and the estimation of time-to-contact with accelerating objects in prediction motion are controlled independently based on first-order estimates. *Experimental Brain Research, 202*(2), 327–339. https://doi.org/10.1007/s00221-009-2139-0 – Beschleunigung wird nicht eingerechnet.
- Hoffmann, E. R., & Mortimer, R. G. (1994). Drivers' estimates of time to collision. *Accident Analysis & Prevention, 26*(4), 511–520. https://doi.org/10.1016/0001-4575(94)90042-6 – Streuung wächst mit Kontaktzeit.
- Villavicencio, P., de la Malla, C., & López-Moliner, J. (2024). Prediction of time to contact under perceptual and contextual uncertainties. *Journal of Vision, 24*(6), 14. https://doi.org/10.1167/jov.24.6.14 – Verhältnis sichtbar/verdeckt.
- Chopin, A., Bavelier, D., & Levi, D. M. (2019). The prevalence and diagnosis of ‘stereoblindness’ in adults less than 60 years of age: A best evidence synthesis. *Ophthalmic and Physiological Optics, 39*(2), 66–85. https://doi.org/10.1111/opo.12607 – ≈ 7 % Stereoblindheit.
- Ding, J., & Levi, D. M. (2011). Recovery of stereopsis through perceptual learning in human adults with abnormal binocular vision. *PNAS, 108*(37), E733–E741. https://doi.org/10.1073/pnas.1105183108 – Stereo-Lernen braucht getrennte Bilder je Auge.
- Levi, D. M., Knill, D. C., & Bavelier, D. (2015). Stereopsis and amblyopia: A mini-review. *Vision Research, 114*, 17–30. https://doi.org/10.1016/j.visres.2015.01.002 – Stereotraining bei Amblyopie.
- Koshizawa, R., Mori, A., Oki, K., Takayose, M., & Minakawa, N. T. (2014). Effects of training the coincidence-anticipation timing task on response time and activity in the cortical region. *NeuroReport, 25*(7), 527–531. https://doi.org/10.1097/WNR.0000000000000129 – Übungseffekt CAT (n = 12).
- Lobjois, R., Benguigui, N., & Bertsch, J. (2006). The effect of aging and tennis playing on coincidence-timing accuracy. *Journal of Aging and Physical Activity, 14*(1), 74–97. https://doi.org/10.1123/japa.14.1.74 – Alter und Timing.
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch-Latenz 58–70 ms.
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – Latenz vs. Bildrate.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Transfer nur bei ähnlicher Aufgabe.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do “brain-training” programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Gehirntraining-Evidenz.
- Lochhead, L., Feng, J., Laby, D. M., & Appelbaum, L. G. (2026). Training vision in athletes to improve sports performance: A systematic review of the literature. *International Review of Sport and Exercise Psychology, 19*(2), 333–355. https://doi.org/10.1080/1750984X.2024.2437385 – Sport-Sehtraining nur naturnah.
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry, 91*(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Presbyopie ab ca. 40 J.
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., & Wells, K. A. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Gleitsicht-Neulinge.
- Amprasi, E., Koufou, N., Trigonis, I., Tsartsapakis, I., Zafeiroudi, A., & Kouli, O. (2026). The impact of an 8-week deliberate practice intervention on coincidence anticipation timing and long-term retention in youth female volleyball players. *Children, 13*(6), 822. https://doi.org/10.3390/children13060822 – Übungseffekt CAT (RCT).
- Boccardo, L., Gurioli, M., & Grasso, P. A. (2023). Viewing distance and character size in the use of smartphones across the lifespan. *PLoS ONE, 18*(4), e0282947. https://doi.org/10.1371/journal.pone.0282947 – Betrachtungsabstand.
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlagrate am Bildschirm.
- Brenner, E., Bom, M., & Smeets, J. B. J. (2026). Intercepting moving targets: Does the visuomotor latency depend on whether one taps on the target or slides through it? *Experimental Brain Research, 244*(4). https://doi.org/10.1007/s00221-026-07264-3 – Latenz beim Abfangen durch Tippen (114 ms).
- Haywood, K. M. (1980). Coincidence-anticipation accuracy across the life span. *Experimental Aging Research, 6*(5), 451–462. https://doi.org/10.1080/03610738008258380 – Alter und Timing.
- DeLucia, P. R., & Liddell, G. W. (1998). Cognitive motion extrapolation and cognitive clocking in prediction motion tasks. *Journal of Experimental Psychology: Human Perception and Performance, 24*(3), 901–914. https://doi.org/10.1037/0096-1523.24.3.901 – gedankliche Extrapolation bei Verdeckung.
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28), Prüfung der Augenfolgebewegungen (S. 32–35), Gesichtsfeldausfälle nach Sehbahnverlauf (S. 32).
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Genauigkeit und Wiederholbarkeit von Messungen am Menschen, Mehrfachmessung (S. 17–18, 24, 43–44).
