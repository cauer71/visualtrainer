---
# ===== Kennung =====
nr: 103
kennung: visual-search
name: "Suchbuchstabe im Raster finden (Visuelle Suche, 96 gedrehte Zeichen)"
name_original: "Visuelle Suche – Zielreiz zwischen Ablenkern finden (Visual Search Pro; Titel: „Visuelle Suche | Aufmerksamkeitstest“)"
kapitel: "Visuelle Wahrnehmung"
kapitel_original: "visual"
unterkapitel_original: "visual-recognition"
quelle_url: "https://skilldrills.online/de/drills/visual/visual-recognition/visual-search"
blickfit_umsetzung: {kennung: "suchbild", name: "Suchbild", unterschiede: "Adaptiv statt fest: 12 Stufen (12 → 56 Zeichen, Ziel-Ablenker-Ähnlichkeit steigt: X/T zwischen O, C mit Lücke 30/20/12 % zwischen O, Umkehrung O zwischen C, E/F, P/R/B, T/L gedreht, 2/5, b/d/p/q, gemischte Ablenker); Zeichenhöhe 26–36 px (≈ 0,7–1,0° bei 40 cm, im Original ≈ 0,27°), Mittenabstand 2,0 → 1,3 × Zeichenhöhe, Touch-Zelle nie unter 48 px, Zufallsversatz; Erfolg = gefunden in ≤ 1,2 s + 75 ms je Zeichen, 2-abwärts/1-aufwärts-Treppe (≈ 71 %); Punkte 10 + 3 je Stufe, kein Abzug; 50 s (Kurzform 10 s), Zeitlimit 12 s je Suche mit Aufdecken des Ziels; Doppeltipps < 150 ms ignoriert, Tipps ins Leere ignoriert; Ziel wird nicht neben das letzte gelegt; Zeichen nach Tinte zentriert (b/d/p/q verraten sich nicht durch Ober-/Unterlängen); Zielanzeige oben, keine Vollbild-Blinksignale, „Bewegung reduzieren“ beachtet; Ergebnis mit Ø Suchzeit und erreichter Stufe."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "In einem Feld aus 96 dicht gepackten Buchstaben oder Ziffern, die zufällig um 0/90/180/270° gedreht sind, muss man das eine Zielzeichen (z. B. ein C zwischen O, Q und G) so schnell wie möglich finden und anklicken bzw. antippen; jeder Treffer bringt 150 Punkte und erzeugt sofort ein neues Feld."
ziel_funktionen: [visuelle_suche, selektive_aufmerksamkeit]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Im Original keine: das Feld ist immer 12 × 8 = 96 Zeichen; die Anzeige „Level“ steigt alle 750 Punkte (5 Treffer), verändert aber weder Zeichenzahl noch Ähnlichkeit noch Tempo (Code). Die Schwierigkeit hängt nur vom zufällig gezogenen Zeichensatz ab (12 Sätze, z. B. C zwischen O/Q/G leichter oder schwerer als 6 zwischen 8/9/0). Blickfit: adaptive Stufen 1–12."
messgroessen: ["Original: Punkte (150 je Treffer), Treffer, Fehlklicks, Trefferquote in % (nur Anzeige), Bestwert/Level im Browser", "sinnvoll: Suchzeit je Durchgang (Median), Steigung der Suchzeit über die Zeichenzahl (ms je Zeichen), Fehltipps, Zeit bis zum ersten Tipp", "sinnvoll mit Eyetracker: Zahl und Dauer der Fixationen, Wiederholfixationen"]

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
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 1
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
voraussetzungen: ["Buchstaben und Ziffern der lateinischen Schrift kennen", "scharfes Sehen im Nahbereich: Zeichenhöhe im Original nur ≈ 0,25–0,3° (≈ 2 mm bei 40 cm), Brille/Nahkorrektur tragen", "Maus oder Touchscreen (Tablet quer; Tippfläche im Original nur ≈ 4–5 mm)", "Bereitschaft, ohne Rückmeldung zur eigenen Suchstrategie 45 s konzentriert zu suchen"]
vorsicht_bei: [sehbehinderung_niedriger_visus, presbyopie_gleitsicht, gesichtsfeldausfall, trockenes_auge_bildschirm, kopfschmerz_asthenopie, lese_rechtschreib_schwaeche, aufmerksamkeitsprobleme, kinder_unter_6]
geeignet_fuer: ["systematisches Absuchen dichter, ähnlicher Zeichen üben (Schilder, Listen, Tabellen, Fahrpläne, Korrekturlesen)", "selektive Aufmerksamkeit und Unterscheiden ähnlicher Formen bei Zeitdruck ohne Strafe", "kurze, ruhige Sitzung ohne Bewegungs- oder Flimmerreize, ohne Sprachverständnis über Buchstaben hinaus", "Erfahrung, wie stark Zeichengröße und Abstand (Nahkorrektur, Beleuchtung) das Finden beeinflussen"]
weniger_geeignet_fuer: ["Einstieg für Menschen mit Sehschwäche, Gleitsichtbrille ohne Kopfbewegung oder sehr kleinem Bildschirm (Zeichen zu klein, Raster dicht)", "wer eine steigende Schwierigkeit oder Lernkurve braucht (Original passt sich nicht an; Blickfit „Suchbild“ besser)", "Messung der Sucheffizienz oder Leistungsvergleich (Punkte lassen sich durch Durchtippen des Rasters ohne Suchen erhöhen, keine Suchzeit, keine Norm)", "Ziele wie Blickfolge, Reaktion, Peripherie, Merken oder Sporttransfer"]
evidenz:
  uebungseffekt: stark
  naher_transfer: mittel
  alltag_transfer: schwach
  kommentar: "Suchleistung verbessert sich in Laborstudien schnell und dauerhaft, anfangs serielle Suchen können nach wenigen hundert Durchgängen effizienter werden und übertragen sich auf andere Suchaufgaben, Orte und das andere Auge (Sireteanu & Rettenbach, 1995, 2000), andere fanden nur teilweise oder gar keinen Transfer (Ellison & Walsh, 1998); Nutzen im Alltag bei Gesunden nicht belegt (Simons et al., 2016; Guo et al., 2025), klinisch nur bei Gesichtsfeldausfall mit speziellem Protokoll (Roth et al., 2009). Belege betreffen ähnliche Suchaufgaben, nicht diese Website."
aehnliche_uebungen: [108, 204, 208, 207, 201, 303, 109]
stichworte: ["visuelle Suche", "Konjunktionssuche", "Suchasymmetrie", "selektive Aufmerksamkeit", "Ablenker", "Crowding", "Sakkaden", "Buchstabenraster", "Suchbild", "Set Size"]
---

# 103 · Suchbuchstabe im Raster finden (Visuelle Suche, 96 gedrehte Zeichen)

> Original: „Visuelle Suche | Aufmerksamkeitstest“ (Visual Search Pro) – skilldrills.online, Kapitel Visuelle Wahrnehmung
> (`visual`, Unterkapitel `visual-recognition`) · Blickfit: umgesetzt als „Suchbild“ (`src/exercises/suchbild/`)

## 1. Kurzbeschreibung

Man sieht ein Feld aus 96 Buchstaben oder Ziffern in 12 Spalten und 8 Zeilen. Jedes Zeichen ist zufällig gedreht.
Oben steht, welches Zeichen gesucht wird (z. B. „C“); alle anderen sind ähnliche Ablenker (O, Q, G). Man tippt oder klickt
das Zielzeichen an, dann erscheint sofort ein neues Feld. 45 Sekunden lang, 150 Punkte je Treffer, Fehlklicks kosten
nichts. Geübt wird das gezielte Absuchen ähnlicher Zeichen.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Seitenchunk und Spielmodul `79868-…js`, Stand 30.09.2026) sowie
`docs/skilldrills-analyse.md` (Abschnitt 3). Sehwinkel sind eigene Umrechnungen (iPad ≈ 36 CSS-px je Grad bei 40 cm, Desktop
24″ Full HD in 60 cm ≈ 40 px/°; Zeichenhöhe ≈ 0,7 × Schriftgröße geschätzt, nicht ausgemessen).

- **Ablauf (Code):** Start → Countdown 3-2-1-GO (≈ 2,5 s) → 45 s → Ergebnis mit Punkten, Trefferquote, Note; Bestwert und
  Level werden nur im Browser gespeichert. Keine Pause, kein Abbruch außer Verlassen des Vollbilds.
- **Feld (Code):** immer 96 Tasten (12 × 8) in einem Quadrat der Kantenlänge min(88 % Breite, 44 % Höhe): auf dem iPad quer ≈ 360 px,
  am Full-HD-Monitor ≈ 475 px. Zelle ≈ 25–34 px, Teilung (Mitte zu Mitte) ≈ 31–40 px ≈ 0,85–1,0°; Schriftgröße 10/12/14 px
  je Fensterbreite (auf Tablet und Desktop 14 px, fett, Monospace) → Zeichenhöhe ≈ 10 px ≈ **0,25–0,3°** (≈ 2 mm bei 40 cm). Das Raster
  umfasst ≈ 10–12° × 7–8°. Auf einem Smartphone im Hochformat sind die Zeichen noch kleiner (10 px).
- **Zeichensätze (Code):** 12 feste Paarungen, je Durchgang zufällig: C:O/Q/G · E:F/L/P · P:R/B/D · N:M/H/W · V:U/W/Y · Z:S/2/7 ·
  G:C/O/Q · X:K/Y/V · 6:8/9/0 · T:I/7/J · 5:S/E/B · 3:8/B/E. Ein Zielzeichen an zufälliger Stelle, 95 Ablenker (jeder
  Ablenkertyp etwa gleich oft). **Jedes Zeichen, auch das Ziel, wird zufällig um 0/90/180/270° gedreht.** Die Ablenker sind keine
  „rotierten O“ im Sinne einer Merkmalsverbindung: ein um 90° gedrehtes O sieht aus wie ein O.
- **Wertung (Code):** Treffer +150 Punkte, grün, nach 180 ms neues Feld (neue Zeichen, neue Lage). Fehlklick: Zelle 400 ms rot,
  kurzer Ton, ein bildschirmweites kurzes Aufleuchten; **kein Punkt- oder Zeitabzug** (deckt sich mit dem Regeltext). Kein Zeitlimit je
  Durchgang, kein Combo, kein Zeitbonus. Auswertung per `pointerdown`, also Maus und Touch, ohne Sperre gegen Mehrfachtipps
  (Doppeltipp auf das Ziel zählt doppelt).
- **Level (Code):** Level = 1 + ⌊Punkte / 750⌋ (also alle 5 Treffer), **ohne Wirkung** auf das Spiel; nur Anzeige und Bestlevel.
- **Widersprüche Regeltext ↔ Code:** (a) Text und Titel sprechen von einer „Konjunktionssuche“ und „rotierten O“; im Code gibt es
  12 verschiedene Ähnlichkeitssuchen, Drehung ändert bei O, S, X, H, I, 0 kaum etwas. (b) „Target symbol & location shift under time
  pressure“ – nichts verschiebt sich während einer Suche; das Feld wird nur nach Treffern neu gewürfelt. (c) Die Tabelle nennt
  Zielerfassungs-Latenzen von 450 ms bis 1,6 s, gleichzeitig aber 1–10+ Treffer in 45 s (= 4,5–45 s je Treffer): die beiden Spalten
  passen um den Faktor ≈ 10 nicht zusammen. (d) 10 Treffer = genau 1.500 Punkte, die Tabelle verlangt „> 1.500“ für 10+.
  (e) Ein gedrehtes „9“ ist im Zeichensatz 6:8/9/0 nicht sicher von der gesuchten „6“ zu unterscheiden (aus der Zeichenform
  abgeleitet, nicht in allen Schriften geprüft).
- **Durchtippen ohne Suchen:** Da Fehlklicks nichts kosten und das Ziel bleibt, kann man die 96 Zellen der Reihe nach antippen. Bei
  ≈ 5 Tipps/s (eigene Annahme) dauert das im Mittel ≈ 48 Tipps ≈ 10 s je Treffer ≈ 4–5 Treffer in 45 s, das entspricht ≈ 600–700 Punkten
  („Durchschnitt“ der Tabelle), ohne dass gesucht wird. Die Punktzahl misst also nicht nur Suchleistung.

## 3. Was die Website sagt – und wie das einzuordnen ist

**Aussagen:** Die Seite beschreibt einen „fortgeschrittenen Selektive-Aufmerksamkeits-Drill nach klassischen Konjunktionssuch-Paradigmen“;
Zielgruppen sind Gamer, Korrekturleser/Inspektoren und Interessierte am Gehirntraining. Verbessert werden sollen „Konjunktionssuch-Tempo,
selektive Aufmerksamkeit, Merkmalsunterscheidung, Zielisolation und Scanning-Ausdauer“. Es folgen Erklärungen zu Merkmalsintegration
(Pop-out vs. serielle Suche), Ähnlichkeit und Homogenität der Ablenker, Zoomlinse, perzeptiver Last, eine Fünf-Stufen-Tabelle
(„Tier 1 Elite Esports / Radar-Überwachung“ bis „Tier 5 Tunnelblick“) und Trainingstipps (Z-Muster, Fixation 200–250 ms, Ziel-Template).

**Einordnung:**
- **Belegt (Grundlagen):** Suchzeit steigt mit der Zeichenzahl, wenn Ziel und Ablenker ähnlich sind; ein einzelnes abweichendes Merkmal springt
  ins Auge, Kombinationen und Ähnlichkeit machen die Suche langsam (Treisman & Gelade, 1980; Duncan & Humphreys, 1989; Wolfe, 1994).
- **Falsch eingeordnet:** „C zwischen O“ ist keine Konjunktions-, sondern eine Merkmalssuche in der *leichten* Richtung der Suchasymmetrie: das C
  hat mit Lücke und Linienenden ein Merkmal, das dem O fehlt (Treisman & Souther, 1985). Schwer wird es durch **Ähnlichkeit** (kleine Lücke, ähnliche
  Ablenker Q/G), nicht durch Merkmalsverbindung. Suchen bilden zudem ein Kontinuum, nicht zwei getrennte Modi (Wolfe, 1998).
- **Ohne Quelle / überzogen:** „Optimales Foveations-Intervall 200–250 ms, Fixation auf das Minimum begrenzen“ – mittlere Fixationsdauern bei
  Suche liegen bei ≈ 180–275 ms (Rayner, 1998, nach van der Lans et al., 2011), das ist ein Mittelwert, kein Minimum, und die Dauer passt sich der
  Aufgabe an. „Experten nutzen breitere periphere Fenster“ ist nicht belegt. Die Tier-Tabelle hat keine Datengrundlage (die Seite sagt selbst,
  sie sammle keine Leistungsdaten); die Zuordnungen „Elite Esports“ oder „Tunnelblick / Reizüberflutung“ sind unbegründet und keine
  Diagnose. Gehirn-Aussagen (V1, parietaler Kortex, Augenfelder) stehen nicht in den zitierten Verhaltensstudien. Die Behauptung, hohe
  perzeptive Last „schütze vor mentalem Abschweifen“, geht über Lavie (1995) hinaus. Transfer auf Radiologie, Flugsicherung, Shooter ist
  nicht belegt.

## 4. Optische und okulomotorische Grundlagen

- **Sakkaden und Fixationen:** Man sucht in Folge von Blicksprüngen (Sakkaden) und kurzen Halten (Fixationen). Mittlere Fixationsdauer bei
  visueller Suche ≈ 180–275 ms (Rayner, 1998; Werte nach van der Lans et al., 2011). Bei jeder Fixation lässt sich nur ein kleiner Bereich sicher
  auswerten; Zoomlinse (Eriksen & St. James, 1986): kleinerer Fokus = bessere Auflösung, aber weniger Überblick.
- **Crowding (Verdrängung):** Zeichen werden außerhalb der Blickmitte schlechter erkannt, wenn Nachbarn näher liegen als etwa die Hälfte der
  Exzentrizität (Bouma, 1970; Pelli & Tillman, 2008; Whitney & Levi, 2011). Bei Teilung ≈ 0,85° (iPad quer, 40 cm) sind nur Zeichen
  bis ≈ 1,7° Abstand von der Blickmitte frei erkennbar (eigene Rechnung nach Bouma), das entspricht nur einer Handvoll Zeichen je Fixation.
  Das Original ist damit eng gepackt; Blickfit wählt 1,3–2,0° Teilung.
- **Zeichengröße:** ≈ 0,25–0,3° hohe Zeichen (≈ 15–18 Bogenminuten) liegen bei fetter Schrift nicht weit über der Erkennungsgrenze normaler bis
  leicht verminderter Sehschärfe; ohne Nahkorrektur, bei Presbyopie (Akkommodationsreserve reicht ab ≈ 40 Jahren nicht mehr für Naharbeit;
  Charman, 2008) oder bei ungünstigem Abstand wird Erkennbarkeit zum Engpass, nicht die Suche. Kontrast hell auf dunkel ist hoch.
- **Brille:** Das Raster ist ≈ 10–12° breit. Mit Gleitsicht liegt es je nach Kopfhaltung teils im Nahteil, teils im Übergang; Neulinge nutzen mehr
  Kopfbewegungen (Hutchings et al., 2007). Empfehlung: Tablet/Bildschirm so halten, dass das Raster durch den Nahteil oder die
  Arbeitsplatzbrille gesehen wird, Kopf statt Augen bewegen. Bildschirmarbeit senkt die Lidschlagrate und kann das trockene Auge belasten
  (Patel et al., 1991); 45 s sind kurz, mehrere Runden hintereinander weniger.
- **Farbe:** nicht gefordert (Zeichen einfarbig; rot/grün nur Rückmeldung nach dem Tipp); Farbsehschwäche (≈ 8 % der Männer) spielt hier keine Rolle.
- **Alter:** Suche ist früh und spät im Leben verlangsamt, bei Ähnlichkeit/Kombinationen und vielen Ablenkern stärker (Hommel et al., 2004;
  n = 298, 6–89 Jahre).

## 5. Neurowissenschaftliche Grundlagen

Gezielte Suche beruht auf einem Zusammenspiel: Frühe visuelle Areale liefern Merkmalskarten (Orientierung, Krümmung, Linienenden); daraus entsteht
in Modellen eine „Prioritätskarte“, die Blicksprünge und Aufmerksamkeit lenkt (Wolfe, 1994; Wolfe, 2021). Als neuronaler Kandidat für diese Karte gilt der
laterale intraparietale Bereich (LIP) mit seiner Verbindung zu Blickmotorik und Sehrinde (Bisley & Goldberg, 2010). Ein **dorsales fronto-parietales Netzwerk**
(intraparietaler Sulcus, oberes Stirnhirn inkl. frontales Augenfeld) setzt zielgerichtete, willentliche Auswahl um, ein **ventrales Netzwerk**
(temporo-parietal, unterer Stirnhirnbereich) meldet auffällige oder unerwartete Reize (Corbetta & Shulman, 2002). Aufmerksamkeit verstärkt in der Sehrinde die
Antwort auf den gesuchten Reiz gegenüber Ablenkern (Kastner & Ungerleider, 2000). Der Colliculus superior beteiligt sich an der Blickzielauswahl (allgemeines
Wissen; hier nicht durch eine eigene Quelle belegt). Die Website nennt V1 und den posterioren Parietalkortex ohne Beleg aus ihren Quellen;
dass die Übung „diese Regionen trainiert“, ist nicht gezeigt. Beim Arbeitsgedächtnis („Ziel-Template“) helfen Stirnhirnnetzwerke; die Suche selbst hat kaum
Gedächtnis für schon besuchte Orte (Horowitz & Wolfe, 1998).

## 6. Motorische Grundlagen

- Die Motorik ist einfach: ein Klick/Tipp auf eine ≈ 25-px-Zelle (≈ 4–5 mm auf dem iPad, ≈ 0,7° breit). Nach dem Fitts'schen Gesetz steigt die
  Bewegungszeit mit Entfernung und sinkt mit Zielbreite; bei kleinen, dicht liegenden Tasten (Lücke 4–6 px) nimmt die Wahrscheinlichkeit von
  Nachbartipps zu. Übliche Touch-Richtwerte liegen bei ≈ 44–48 px (Konvention der Systemrichtlinien, keine Studie).
- Auge-Hand-Koordination: Blick sucht, Hand folgt erst nach dem Fund; Hand-Zeit (Hinführen und Tippen, grobe Schätzung ≈ 0,3–0,5 s) ist Teil der gemessenen Zeit, aber nicht Suche.
- Kein Halten, keine Dauerbewegung; Fingerermüdung nicht relevant.

## 7. Einflussfaktoren und Messgrenzen

- **Zeichensatz-Zufall:** Der Zeichensatz wird je Durchgang gewürfelt (12 Sätze), Sätze sind unterschiedlich schwer; Ergebnisse über 45 s
  streuen dadurch stark, Vergleich zwischen Runden ist unsicher.
- **Fest 96 Zeichen:** keine Set-Size-Variation, daher keine Suchsteigung; nur eine gemischte „Punktzahl“ aus Suche, Motorik, Durchtippen.
- **Gerät:** Zeichen- und Feldgröße hängen von Fenstergröße und Abstand ab (10–14 px, Raster 10–12°); Tablet und Monitor nicht vergleichbar. Zeitmessung
  erfolgt über Ereignisse im Browser; Bildwiederholrate spielt bei statischem Raster kaum eine Rolle.
- **Übung und Strategie:** Zeichensätze wiederholen sich, Lerneffekte in der Aufgabe sind groß; systematisches Absuchen (Reihen) bringt oft mehr als
  „Scannen nach Gefühl“; Anweisungen zur Strategie verbesserten Ältere schon nach wenig Übung (Becic et al., 2008).
- **Ziel immer vorhanden:** keine Durchgänge ohne Ziel; seltene Ziele würden häufiger übersehen (Wolfe et al., 2005), ein Effekt, der hier nicht auftritt.
- **Zuverlässigkeit:** Punkte, Trefferquote und „Note“ sind keine Testwerte; die 96-Zeichen-Tabelle hat keine Normstichprobe.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (stark):** In der Suchaufgabe wird man deutlich schneller. Anfangs serielle Suchen wurden nach wenigen hundert Durchgängen effizient
  und blieben über Monate erhalten (Sireteanu & Rettenbach, 1995, 2000). Ein Teil der Verbesserung in digitalen Aufgaben ist reiner Aufgaben-Lerneffekt (vgl. Guo et al., 2025).
- **Naher Transfer (mittel):** Der Lerngewinn übertrug sich in einer Studie auf andere Aufgaben, Orte und das andere Auge (Sireteanu & Rettenbach, 2000); andere fanden
  nur teilweise Spezifität, fehlenden oder sogar negativen Transfer (Ellison & Walsh, 1998). Bei immer gleichen Zielen wird Entdecken automatisch, aber an
  diese Reize gebunden (Shiffrin & Schneider, 1977).
- **Alltag (schwach):** „Gehirntraining“ zeigt viel Evidenz für geübte Aufgaben, wenig für entfernte Aufgaben und Alltag (Simons et al., 2016). Große Effekte
  des Sport-Sehtrainings gibt es fast nur, wenn Trainings- und Testaufgabe ähnlich sind (Guo et al., 2025); Computertraining Älterer: kleiner Gesamteffekt
  g = 0,22 (Lampit et al., 2014). Klinisch (Halbseitenblindheit) verkürzten kompensatorische Suchtrainings Suchzeiten (Pambakian et al., 2004; RCT
  Roth et al., 2009: −47 % Suchzeit auf der blinden Seite, n = 28), das Gesichtsfeld selbst wuchs nicht – andere Gruppe und Protokoll, nicht übertragbar.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** gezieltes Absuchen dichter, ähnlicher Zeichen geübt werden soll, selektive Aufmerksamkeit ohne Bewegung, Flimmern oder Sprachaufwand
  gewünscht ist; Profil: `visuelle_suche` 3, `selektive_aufmerksamkeit` 3; für kurze Einheiten von ≈ 1 min. Für Übungszwecke ist die adaptive Blickfit-Version „Suchbild“ vorzuziehen.
- **Weniger passend, wenn …** Erkennbarkeit der Engpass ist (kleine Zeichen: erst Nahbrille prüfen), Blickfolge, Reaktion, Peripherie, Merken oder
  Sporttransfer das Ziel sind, oder eine messbare Suchleistung (Suchsteigung, Norm) erwartet wird.
- **Vorsicht / anpassen bei …** niedrigem Visus und Presbyopie/Gleitsicht (Zeichen ≈ 0,3° klein, Raster ≈ 10° breit → Abstand/Brille prüfen, größere Zeichen,
  Kopf bewegen); Gesichtsfeldausfall (Suche verlängert sich, Übung ohne fachliche Begleitung kein Training); trockenem Auge/Asthenopie (Pausen);
  Lese-Rechtschreib-Schwäche (Buchstabenverwechslung, Crowding: eher Ziffern/Formen); Aufmerksamkeitsproblemen und Kindern unter 6 (Zeichenkenntnis, 45 s
  ohne Rückmeldung); bei Farbschwäche unproblematisch. Ein bildschirmweites Aufleuchten bei jedem Fehlklick ist bei Lichtempfindlichkeit störend, aber nicht blitzend.
- **Kombiniert gut mit …** 108 (Suche im wechselnden Raster), 204 (Schulte-Tabelle: geordnete Suche), 303 (Blicksprünge), 208 (Daueraufmerksamkeit), 207 (Symbolvergleich).
  Keine Diagnose, kein Heil- oder Sehversprechen; keine Aussage zu Verkehrs- oder Berufseignung.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

**Schwächen des Originals:** Zeichen nur ≈ 0,25–0,3° hoch und Teilung ≈ 0,9° (Crowding, Nahkorrektur); Tippflächen ≈ 25 px (unter Touch-Richtwert); feste
96 Zeichen, „Level“ ohne Wirkung; falsch benannte „Konjunktionssuche“; Punktzahl durch Durchtippen erhöhbar, Fehltipps nicht bestraft und nicht getrennt
ausgewertet; Doppeltipp zählt doppelt; keine Suchzeit, keine Suchsteigung; Tier-Tabelle ohne Datengrundlage, Latenzangaben um Faktor ≈ 10 falsch;
mögliche Mehrdeutigkeit bei gedrehten 6/9 und N/Z; bildschirmweites Aufleuchten bei Fehlern; englisch-deutsche Mischtexte; Zeichensatz-Zufall.

**Blickfit „Suchbild“ – so ist es umgesetzt (Code/Kopfkommentar `src/exercises/suchbild/index.ts`, `texts.ts`):**
- **Adaptive Schwierigkeit:** 12 Stufen mit steigender Zeichenzahl (12, 16, 20 … 56) und Ähnlichkeit: X/T zwischen O (Merkmal), C mit Lücke 30/20/12 % zwischen O
  (leichte Richtung der Suchasymmetrie), **O zwischen C** (schwere Richtung), E/F, P/R/B, gedrehtes T/L, 2/5, b/d/p/q, gemischte Ablenker mit Vierteldrehungen; Erfolg ≙
  gefunden in ≤ 1,2 s + 75 ms je Zeichen, 2-abwärts/1-aufwärts-Treppe (≈ 71 %); höchstens 80 % der Rasterzellen belegt.
- **Größe und Abstand:** Zeichenhöhe 26–36 px (≈ 0,7–1,0° bei 40 cm), Mittenabstand 2,0 → 1,3 × Höhe (≈ 1,3–2,0°), Touch-Zelle ≥ 48 px, Trefferradius ≥ 26 px, Zufallsversatz
  ≤ 20 %; das ist ≈ 3,5-mal so hoch wie im Original und vermeidet Crowding weitgehend.
- **Wertung:** 10 + 3 je Stufe pro Fund, kein Abzug; Tipps < 150 ms nach dem letzten und Tipps ins Leere werden ignoriert; Fehltipps gezählt (Rückmeldung nur am Zeichen: rot,
  kurzes Wackeln bzw. Ring bei „Bewegung reduzieren“), Zeitlimit 12 s mit Aufdecken des Ziels; Ziel liegt nie direkt neben dem letzten. Dauer 50 s (Kurzform 10 s).
- **Anzeige/Ergebnis:** Zielzeichen oben mit Drehhinweis; Ergebnis: Punkte, Gefunden, Ø Suchzeit, erreichte Stufe; Hinweis „Reihe für Reihe suchen“ bzw. „erst sicher sein“.
- **Barrierefreiheit:** deutsch/italienisch, kein Blinken, große Touch-Fläche, Zeichen nach Tinte zentriert (b/d/p/q verraten sich nicht durch Über-/Unterlängen).

**Offene Empfehlungen für Blickfit:** (1) Durchgänge ohne Ziel (10–20 %) mit „Kein Ziel“-Knopf und Suchsteigung (ms je Zeichen) als Effizienzmaß aufnehmen, wie in
`docs/wissenschaft/03` vorgeschlagen; (2) Zeichenhöhe für Presbyopie/Sehschwäche optional größer (≈ 1,0°); (3) Gleitsicht: Hinweis „Bildschirm in Blickhöhe, Kopf statt Augen bewegen“;
(4) Ergebnis nie als Norm oder Aussage zu Verkehrs-/Berufseignung darstellen, „gut für: Verkehrsschilder“ eher als „gezielt suchen“ formulieren; (5) Verlauf je Gerät führen.

## 11. Quellen

### Von der Website angegeben
- Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology*, 12(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5 – **Prüfung:** DOI stimmt ✓ (Crossref); **stützt die Aussage der Website:** teilweise (Merkmals- vs. Konjunktionssuche ja; „C zwischen O“ als Konjunktionssuche nein, siehe Treisman & Souther, 1985)
- Wolfe, J. M. (1994). Guided Search 2.0: A revised model of visual search. *Psychonomic Bulletin & Review*, 1(2), 202–238. https://doi.org/10.3758/BF03200774 – **Prüfung:** DOI stimmt ✓ (Crossref, Abstract); **stützt:** ja (parallele Merkmalskarten lenken begrenzte Aufmerksamkeit; keine Hirnareal-Aussagen wie auf der Website)
- Duncan, J., & Humphreys, G. W. (1989). Visual search and stimulus similarity. *Psychological Review*, 96(3), 433–458. https://doi.org/10.1037/0033-295X.96.3.433 – **Prüfung:** DOI stimmt ✓ (Crossref); **stützt:** ja (Ziel-Ablenker-Ähnlichkeit, Ablenker-Heterogenität); Drehung wirkt nur bei nicht rotationssymmetrischen Zeichen
- Lavie, N. (1995). Perceptual load as a necessary condition for selective attention. *Journal of Experimental Psychology: Human Perception and Performance*, 21(3), 451–468. https://doi.org/10.1037/0096-1523.21.3.451 – **Prüfung:** DOI stimmt ✓ (Crossref, Abstract); **stützt:** teilweise (Ablenker stören nur bei niedriger Last; „schützt vor mentalem Abschweifen“ steht dort nicht)
- Eriksen, C. W., & St. James, J. D. (1986). Visual attention within and around the field of focal attention: A zoom lens model. *Perception & Psychophysics*, 40(4), 225–240. https://doi.org/10.3758/BF03211502 – **Prüfung:** DOI stimmt ✓ (Crossref); **stützt:** ja (Zoomlinse mit variablem Fokus)
- Bacon, W. F., & Egeth, H. E. (1994). Overriding stimulus-driven attentional capture. *Perception & Psychophysics*, 55(5), 485–496. https://doi.org/10.3758/BF03205306 – **Prüfung:** DOI stimmt ✓ (Crossref, Abstract); **stützt:** nein (zeigt, dass gezielte Suche nach bekanntem Merkmal Farb-Ausreißer nicht einfangen lässt; nicht „hohe Last fordert selektive Aufmerksamkeit“; das Gitter enthält keine Singletons)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, 9, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓ (Crossref); **stützt:** nein (einfache Reaktionszeit und Hardware-Latenz, kein Bezug zur visuellen Suche)
- *Ohne Quelle:* „optimales Foveations-Intervall 200–250 ms“, „Experten nutzen breitere periphere Fenster“, Tier-Tabelle (Latenz, Punkte, „Elite Esports“) – **Prüfung:** nicht belegt; Fixationsdauer bei Suche ≈ 180–275 ms als Mittelwert (Rayner, 1998)

### Weitere Fachliteratur
- Treisman, A., & Souther, J. (1985). Search asymmetry: A diagnostic for preattentive processing of separable features. *Journal of Experimental Psychology: General*, 114(3), 285–310. https://doi.org/10.1037/0096-3445.114.3.285 – C zwischen O leicht, O zwischen C schwer (Crossref ✓)
- Wolfe, J. M. (1998). What can 1 million trials tell us about visual search? *Psychological Science*, 9(1), 33–39. https://doi.org/10.1111/1467-9280.00006 – Suchsteigungen bilden ein Kontinuum (Crossref ✓, Abstract)
- Horowitz, T. S., & Wolfe, J. M. (1998). Visual search has no memory. *Nature*, 394(6693), 575–577. https://doi.org/10.1038/29068 – Suche ohne Gedächtnis für besuchte Orte (Crossref ✓, Abstract)
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin*, 124(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – Fixationsdauern (Crossref ✓; Werte über van der Lans, R., Wedel, M., & Pieters, R. (2011). *Behavior Research Methods*, 43(1), 239–257. https://doi.org/10.3758/s13428-010-0031-2)
- Bouma, H. (1970). Interaction effects in parafoveal letter recognition. *Nature*, 226(5241), 177–178. https://doi.org/10.1038/226177a0 – Crowding-Abstand ≈ 0,5 × Exzentrizität (Crossref ✓)
- Pelli, D. G., & Tillman, K. A. (2008). The uncrowded window of object recognition. *Nature Neuroscience*, 11(10), 1129–1135. https://doi.org/10.1038/nn.2187 – Crowding begrenzt Erkennen (Crossref ✓)
- Whitney, D., & Levi, D. M. (2011). Visual crowding: A fundamental limit on conscious perception and object recognition. *Trends in Cognitive Sciences*, 15(4), 160–168. https://doi.org/10.1016/j.tics.2011.02.005 – Crowding, Überblick (Crossref ✓)
- Corbetta, M., & Shulman, G. L. (2002). Control of goal-directed and stimulus-driven attention in the brain. *Nature Reviews Neuroscience*, 3(3), 201–215. https://doi.org/10.1038/nrn755 – dorsales und ventrales Aufmerksamkeitsnetzwerk (Crossref ✓, Abstract)
- Bisley, J. W., & Goldberg, M. E. (2010). Attention, intention, and priority in the parietal lobe. *Annual Review of Neuroscience*, 33, 1–21. https://doi.org/10.1146/annurev-neuro-060909-152823 – LIP als Prioritätskarte (Crossref ✓, Abstract)
- Kastner, S., & Ungerleider, L. G. (2000). Mechanisms of visual attention in the human cortex. *Annual Review of Neuroscience*, 23, 315–341. https://doi.org/10.1146/annurev.neuro.23.1.315 – Aufmerksamkeit moduliert Sehrinde, frontoparietale Quellen (Crossref ✓, Abstract)
- Wolfe, J. M. (2021). Guided Search 6.0: An updated model of visual search. *Psychonomic Bulletin & Review*, 28(4), 1060–1092. https://doi.org/10.3758/s13423-020-01859-9 – aktuelles Suchmodell (Crossref ✓)
- Sireteanu, R., & Rettenbach, R. (1995). Perceptual learning in visual search: Fast, enduring, but non-specific. *Vision Research*, 35(14), 2037–2043. https://doi.org/10.1016/0042-6989(94)00295-W – schnelles, dauerhaftes Lernen (Crossref ✓)
- Sireteanu, R., & Rettenbach, R. (2000). Perceptual learning in visual search generalizes over tasks, locations, and eyes. *Vision Research*, 40(21), 2925–2949. https://doi.org/10.1016/S0042-6989(00)00145-0 – Generalisierung des Lernens (Crossref ✓)
- Ellison, A., & Walsh, V. (1998). Perceptual learning in visual search: Some evidence of specificities. *Vision Research*, 38(3), 333–345. https://doi.org/10.1016/S0042-6989(97)00195-8 – Spezifität, Gegenbefund (Crossref ✓)
- Shiffrin, R. M., & Schneider, W. (1977). Controlled and automatic human information processing: II. Perceptual learning, automatic attending and a general theory. *Psychological Review*, 84(2), 127–190. https://doi.org/10.1037/0033-295X.84.2.127 – konsistente Zuordnung macht automatisch und reizgebunden (Crossref ✓)
- Hommel, B., Li, K. Z. H., & Li, S.-C. (2004). Visual search across the life span. *Developmental Psychology*, 40(4), 545–558. https://doi.org/10.1037/0012-1649.40.4.545 – Alter (Crossref ✓)
- Becic, E., Boot, W. R., & Kramer, A. F. (2008). Training older adults to search more effectively: Scanning strategy and visual search in dynamic displays. *Psychology and Aging*, 23(2), 461–466. https://doi.org/10.1037/0882-7974.23.2.461 – Strategieanweisung bei Älteren (Crossref ✓)
- Wolfe, J. M., Horowitz, T. S., & Kenner, N. M. (2005). Rare items often missed in visual searches. *Nature*, 435(7041), 439–440. https://doi.org/10.1038/435439a – Prävalenzeffekt (Crossref ✓)
- Pambakian, A. L. M., Mannan, S. K., Hodgson, T. L., & Kennard, C. (2004). Saccadic visual search training: A treatment for patients with homonymous hemianopia. *Journal of Neurology, Neurosurgery & Psychiatry*, 75(10), 1443–1448. https://doi.org/10.1136/jnnp.2003.025957 – klinisches Suchtraining (Crossref ✓)
- Roth, T., Sokolov, A. N., Messias, A., Roth, P., Weller, M., & Trauzettel-Klosinski, S. (2009). Comparing explorative saccade and flicker training in hemianopia: A randomized controlled study. *Neurology*, 72(4), 324–331. https://doi.org/10.1212/01.wnl.0000341276.65721.f2 – RCT Sakkadentraining (Crossref ✓)
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest*, 17(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer von Gehirntraining (Crossref ✓)
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, 16, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Transfer nur bei ähnlichen Aufgaben (Crossref ✓)
- Lampit, A., Hallock, H., & Valenzuela, M. (2014). Computerized cognitive training in cognitively healthy older adults: A systematic review and meta-analysis of effect modifiers. *PLoS Medicine*, 11(11), e1001756. https://doi.org/10.1371/journal.pmed.1001756 – g = 0,22 (Crossref ✓)
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry*, 91(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Presbyopie ≈ 40 Jahre (Crossref ✓)
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., & Wells, K. A. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, 27(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Kopfbewegungen bei Gleitsicht (Crossref ✓)
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science*, 68(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Bildschirm senkt Lidschlagrate (Crossref ✓)
