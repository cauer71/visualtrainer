---
# ===== Kennung =====
nr: 408
kennung: split-screen-tracking
name: "Zwei Ziele, zwei Hälften (geteilte Aufmerksamkeit bei ruhigem Blick)"
name_original: "Geteilte Aufmerksamkeit: Blickverfolgung – Zwei Ziele in getrennten Bildschirmbereichen (Split-Screen Tracking)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/split-screen-tracking"
blickfit_umsetzung: {kennung: "zwei-ziele", name: "Zwei Ziele", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/zwei-ziele/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Links pendelt ein Leuchtpunkt gleichmäßig auf und ab, rechts einer hin und her. Man soll den Blick ruhig zur Bildmitte richten und beide Bewegungen gleichzeitig aus dem Augenwinkel mitverfolgen; das Original stellt keine Aufgabe, gibt keine Rückmeldung und misst nichts."
ziel_funktionen: [geteilte_aufmerksamkeit, peripheres_sehen]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 60
schwierigkeit_anpassung: "Kein Levelsystem, keine automatische Anpassung. Manuell: Tempo 0,5–9× (1× = 220 px/s je Ziel ≈ 6°/s am Monitor in 60 cm bzw. am Tablet in 40 cm), Zielradius 10–50 px (Standard 16 px), 'Hide Line' blendet Mittellinie und Bahnen aus, 'Random Speed' ändert das Tempo beider Ziele gemeinsam (Faktor 0,40–1,90). Dauer 30/45/60/90/120 s."
messgroessen: ["Original: keine Leistungsmessung (nur Zähler abgeschlossener Sitzungen)", "sinnvoll: Entdeckungsrate und Reaktionszeit für kurze Zieländerungen getrennt nach linker/rechter Seite", "sinnvoll: Kontrollaufgabe in der Bildmitte (wechselndes Zeichen) als Nachweis des ruhigen Blicks", "mit Eyetracker: Anteil der Zeit mit Blick in der Mitte, Zahl der Blicksprünge zu den Zielen"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 3
    nutzbares_sehfeld: 2
    blickfolge: 1
    sakkaden: 1
    fixation: 2
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 0
    inhibition: 1
    geteilte_aufmerksamkeit: 3
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 0
    antizipation: 1
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
  zeitdruck: 0
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm im Querformat, möglichst groß, Abstand 50–70 cm (Tablet 40 cm, Ständer), Kopf ruhig und mittig", "beide Bildschirmhälften müssen gleichzeitig im Gesichtsfeld sein (Ziele bis ≈ 17° links und ≈ 22° rechts der Mitte am 24″-Monitor)", "Bereitschaft, 30–120 s ohne Rückmeldung konzentriert zu bleiben", "Maus oder Finger nur zum Starten"]
vorsicht_bei: [presbyopie_gleitsicht, gesichtsfeldausfall, farbsehschwaeche, nystagmus, schwindel_vestibulaer, reisekrankheit, trockenes_auge_bildschirm, kopfschmerz_asthenopie, aufmerksamkeitsprobleme, kognitive_einschraenkung, kinder_unter_6]
geeignet_fuer: ["ruhiges Hinschauen zur Mitte bei gleichzeitigem Wahrnehmen von Bewegung links und rechts erleben (verdeckte Aufmerksamkeit, 'aus dem Augenwinkel')", "Einstieg in Aufgaben mit geteilter Aufmerksamkeit ohne Hand- und Reaktionsdruck, vor 106 (Mehrfach-Objektverfolgung) oder 205/206", "kurze Augenübung ohne Blitzreize bei langsamem Tempo (0,5–2×)"]
weniger_geeignet_fuer: ["alle, die Rückmeldung oder einen Leistungswert erwarten (das Original misst nichts)", "Ziel Blickfolge (dafür 402–404) oder Hand-Auge-Koordination (104, 305)", "Menschen mit bekanntem Gesichtsfeldausfall einer Seite (eine Hälfte ist dann kaum wahrnehmbar – Übung frustriert, keine Aussage über Ursache)", "kleine Smartphone-Bildschirme (beide Ziele liegen dann fast zentral, die Aufgabe verliert ihren Kern)"]
evidenz:
  uebungseffekt: unklar
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Mehrfach-Objektverfolgung mit Ablenkern ist gut übbar (Vater et al., 2021), diese Übung hat aber weder Ablenker noch Aufgabe noch Messung; Transfer von MOT-Training auf ungeübte Aufgaben und Sport ist schwach (Vater et al., 2021; Harenberg et al., 2022), Videospiel-Metaanalysen sind uneinheitlich (Bediou et al., 2018; Sala et al., 2018)."
aehnliche_uebungen: [106, 205, 206, 401, 108, 801]
stichworte: ["geteilte Aufmerksamkeit", "divided attention", "verdeckte Aufmerksamkeit", "covert attention", "Multiple Object Tracking", "MOT", "Halbfeld-Vorteil", "bilateral field advantage", "peripheres Sehen", "Blickanker", "zentrale Fixation", "Split-Screen"]
---

# 408 · Zwei Ziele, zwei Hälften (geteilte Aufmerksamkeit bei ruhigem Blick)

> Original: „Geteilte Aufmerksamkeit: Blickverfolgung – Zwei Ziele in getrennten Bildschirmbereichen“ („Split-Screen
> Tracking“) – skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch nicht umgesetzt
> (verwandt: „Kugel-Detektiv“ → 106, „Doppelt gefordert“ → 205)

## 1. Kurzbeschreibung

Eine schwache senkrechte Linie teilt das dunkle Bild. Links pendelt ein roter Leuchtpunkt gleichmäßig auf und ab, rechts
einer hin und her; an den Bahnenden kehren beide abrupt um. Man soll weich zur Mitte schauen und beide Bewegungen
gleichzeitig „aus dem Augenwinkel“ verfolgen, ohne hinzuspringen – ohne Aufgabe, Punkte oder Rückmeldung.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und Spielcode (Chunk `81110-…js`, gemeinsame Hilfsmodule wie 406; Stand 29.09.2026), nur Mechanik.
Grad = eigene Umrechnung (24″-Full-HD in 60 cm ≈ 38 px/°; 11″-Tablet quer in 40 cm ≈ 36 px/°).

- **Ablauf (Code):** Vollbild → Countdown 3-2-1-GO (≈ 2,5 s, Töne) → 30–120 s (Standard 60) → Endbild „SESSION
  COMPLETE – Smooth Pursuit Calibrated“ mit Dauer, Tempo, Sitzungszähler (localStorage). Esc bricht ab.
- **Eingabe (Code):** Maus/Finger zeichnen nur ein Fadenkreuz; **nichts wird ausgewertet** (keine Treffer, Fehler,
  „Zielverluste“).
- **Bahnen (Code):** links fest bei 25 % Breite, senkrecht 10–90 % Höhe; rechts fest auf halber Höhe, waagrecht 55–95 %
  Breite; Mittellinie bei 50 %, kein Fixierpunkt.
- **Bewegung (Code):** 220 px/s × Tempofaktor, zeitbasiert (dt, max. 100 ms), harte Umkehr an den Enden (Dreieckswelle,
  kein Sinus). Tempo in Pixeln, nicht in Grad – Perioden hängen von der Bildschirmgröße ab. ≤ 77 Bilder/s.

| Tempo | 0,5× | 1× | 2× | 3× | 5× | 7× | 9× |
|---|---|---|---|---|---|---|---|
| Monitor 24″, 60 cm: °/s | 2,9 | 5,8 | 12 | 17 | 29 | 41 | 52 |
| Tablet 11″ quer, 40 cm: °/s | 3,0 | 6,1 | 12 | 18 | 30 | 42 | 55 |
| Periode links / rechts am Monitor (s) | 15,7 / 14,0 | 7,9 / 7,0 | 3,9 / 3,5 | 2,6 / 2,3 | 1,6 / 1,4 | 1,1 / 1,0 | 0,9 / 0,8 |

- **Lage bei Blick zur Mitte (eigene Rechnung):** Monitor: links 12,5° seitlich, ±11,3° senkrecht (bis 16,6°); rechts
  2,5–21,7°. Tablet quer: links 8,1°, ±8,9°; rechts 1,6–14,3°; hochkant rechte Bahn nur 9° lang. **Nicht symmetrisch.**
- **Reiz (Code):** „Size 16 px“ = Radius (Ø 32 px ≈ 0,85°), 10–50 px, Leuchtsaum, Farbe ohne Information (Standard
  Rot); optional Spur, statische „Scanlines“, „Day Mode“. Keine Blitze.
- **„Random Speed“ (Code):** Summe langsamer Sinusschwingungen, Faktor 0,40–1,90 (Mittel 1,15), **für beide Ziele
  gleichzeitig** – sie beschleunigen und bremsen im Gleichtakt.

**Widersprüche Regeltext ↔ Code:** (1) „Prüfe, welche Seite verloren ging“, Stufen mit „Fehlerraten-Differenz“ und
„0 Sakkaden“ – nichts wird erfasst. (2) „Smooth Pursuit Calibrated“ – weder Kalibrierung noch Blickfolge verlangt (man
soll gerade **nicht** folgen). (3) „Zwei unabhängige Bewegungsgleichungen“ – „Random Speed“ koppelt die Tempi.
(4) „Hide Line“ fordere räumliches Arbeitsgedächtnis – die Ziele bleiben sichtbar.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite nennt die Übung „okulomotorisches Trainingsprogramm zur Konditionierung geteilter Aufmerksamkeit“: Die Fovea
umfasse nur 1–2°, jede Sakkade koste 20–50 ms plus sakkadische Suppression, daher solle man die Mitte fixieren und die
Aufmerksamkeit „bimodal“ ausweiten. FINST-Zeiger (Pylyshyn & Storm, 1988) und der Halbfeld-Vorteil (Alvarez & Cavanagh,
2005) machten das möglich, Training baue es „signifikant plastisch“ aus (Green & Bavelier, 2006); orthogonale Bahnen
verhinderten Gruppierung. Zielgruppen: Sport, E-Sport („verhindert Tunnelblick“, Minimap). 2–3 × 60 s täglich. Stufen
von „Elite: 3,5–5×, 0 Sakkaden, Seitendifferenz < 3 %, Top 1,5 %“ bis „Novice“ – **ohne Datengrundlage**: Die Seite
misst weder Blick noch Wahrnehmung, keine Quelle enthält Tempostufen, Seitendifferenzen oder Populationsanteile.
- **Richtig im Kern:** Mehrere bewegte Objekte lassen sich ohne Blicksprünge parallel verfolgen (Pylyshyn & Storm, 1988);
  die Halbfelder haben weitgehend getrennte Ressourcen – bei Verteilung links/rechts doppelt so viele Ziele (Alvarez &
  Cavanagh, 2005; MOT mit gleich aussehenden Ablenkern) – und eine halbfeldspezifische Steuerung (Strong & Alvarez, 2020); Aufmerksamkeit lässt sich auf zwei
  getrennte Orte verteilen (Awh & Pashler, 2000).
- **Nur bedingt übertragbar:** Diese Befunde stammen aus Aufgaben mit **gleich aussehenden Ablenkern**; die
  Schwierigkeit entsteht durch Verwechslung. Hier gibt es nur zwei Objekte – „verlieren“ kann man sie nicht, ein Ziel je
  Halbfeld liegt weit unter jeder Kapazitätsgrenze (in MOT mit Ablenkern senkt schon das zweite Ziel die
  Grenzgeschwindigkeit um ≈ 30 %; Alvarez & Franconeri, 2007 – auf diese Aufgabe nicht direkt übertragbar).
- **Fragwürdig:** Gruppierung zu einem „virtuellen Objekt“ **erleichtert** das Verfolgen (Yantis, 1992); orthogonale
  Bahnen würden es eher erschweren – dass das „wirksamer“ trainiert, ist nicht belegt, und bei nur zwei Zielen ohne
  Ablenker spielt Gruppierung kaum eine Rolle. „Random Speed“ erzeugt zudem gemeinsames Schicksal im Tempo.
- **Unbelegt:** „Wer rechts verliert, gibt der linken Hirnhälfte zu wenig Aufmerksamkeit / Führungsauge“ – etwa ein
  Drittel ist linksäugig (Bourassa et al., 1996), ein Zusammenhang mit einseitigem Zielverlust ist nicht gezeigt; eine
  leichte Linksbevorzugung ist bei Gesunden normal (Pseudoneglect; Jewell & McCourt, 2000). Wegen der asymmetrischen
  Bahnen wäre ein Seitenvergleich ohnehin nicht aussagekräftig. „Plastizität“, „Tunnelblick“, Minimap: nicht
  untersucht bzw. nicht in Green & Bavelier; „144/240 Hz“ nicht in Woods et al. (2015), Code begrenzt auf ≤ 77 Bilder/s.

## 4. Optische und okulomotorische Grundlagen

- **Peripheres Sehen:** Bei Blick zur Mitte liegen die Ziele 2–22° seitlich. Sehschärfe und Formerkennung fallen zur
  Peripherie stark ab (Strasburger et al., 2011), Geschwindigkeit wird dort aber ähnlich fein unterschieden wie zentral
  (≈ 6 % im jeweils günstigen Tempobereich, peripher eher bei höherem Tempo; McKee & Nakayama, 1984). Ein kontrastreicher Punkt von Ø ≈ 0,85° ist überall sichtbar – gefordert ist das
  **Wahrnehmen von Bewegung ohne Hinschauen**, nicht Visus.
- **Ruhiger Blick:** Er wird nicht kontrolliert; viele blicken spontan abwechselnd zu den Zielen. Beim Mehrfach-Tracking
  hilft ein Blick ins Zentrum der Ziele (Fehd & Seiffert, 2010); ein vorgeschriebenes Blickmuster verschlechtert die
  Leistung eher (Vater et al., 2021, mit Verweis auf Fehd & Seiffert). Wer einem Ziel folgt, folgt bei Zweitaufgabe schlechter (Hutton & Tegally, 2005).
- **Tempo:** 1× (≈ 6°/s) ist sehr langsam; bei 9× springt ein Ziel am 60-Hz-Bildschirm ≈ 0,9° (ein Durchmesser) pro Bild.
- **Gleitsicht/Arbeitsplatz:** Der klare Zwischenbereich war bei zwei untersuchten Gleitsicht-Designs in 60 cm nur
  ≈ 13–18° breit; Augen- und Kopfbewegungen dauerten länger als mit Einstärkengläsern (Han et al., 2003). Beim Mittelblick sieht man die Ziele durch die seitlichen Unschärfezonen –
  für einen großen Punkt vermutlich unkritisch (nicht untersucht); wer hinspringt, blickt 12–22° zur Seite und beim
  linken Ziel in Fern- bzw. Nahteil. Arbeitsplatzbrille oder kleineres Bild günstiger, Monitor mittig.
- **Trockenes Auge:** Beim Lesen am Bildschirm ≈ 11,6 Lidschläge/min, davon im Mittel 16 % unvollständig (Portello et al., 2013); Starren zur Mitte
  kann das verstärken → kurze Durchgänge, blinzeln. Farbe trägt keine Information; bei Rot-Schwäche (Protan-Typ)
  wirkt der Standard-Rotpunkt auf Schwarz dunkler → hellere Farbe wählen (eigene Einschätzung, nicht untersucht).

## 5. Neurowissenschaftliche Grundlagen

Aufmerksames Verfolgen bewegter Ziele bei ruhigem Blick aktiviert beidseits Parietalkortex (intraparietaler Sulcus, oberer
Parietallappen, Präcuneus), frontale Augenfelder und den MT-Komplex (MT/MST); parietal und frontal war das Signal mehr als doppelt
so groß wie beim bloßen Anschauen, das Muster ähnelt dem bei Aufmerksamkeitswechseln und Augenbewegungen (Culham et al.,
1998; Aufgabe: 3 von 9 gleich aussehenden Kugeln verfolgen, also mit Ablenkern). Getrennte Halbfeld-Ressourcen sind für Kapazität (Alvarez & Cavanagh, 2005) und Wechselkosten beim Halbfeldwechsel
(Strong & Alvarez, 2020) belegt, ein
„Hemisphärentraining“ oder „Stärken“ der Netzwerke durch diese Übung nicht.

## 6. Motorische Grundlagen

Keine Handbewegung gefordert (alle motorischen Merkmale 0); die „Motorik“ ist das **Unterdrücken** von Blicksprüngen.

## 7. Einflussfaktoren und Messgrenzen

Ohne Eyetracker oder Kontrollaufgabe ist nicht erkennbar, ob man springt, folgt oder ruhig bleibt. °/s und Exzentrizität
hängen von Bildschirm, Abstand, Ausrichtung und Kopfhaltung ab (am Smartphone liegen beide Ziele nahe der Mitte). Alter,
Müdigkeit und Konzentration wirken mit; Seitenunterschiede sind (Pseudoneglect, asymmetrische Bahnen) kein Befund.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – unklar:** MOT-Aufgaben mit Ablenkern werden durch Üben deutlich besser (Vater et al., 2021); hier
  gibt es weder definierte Leistung noch Rückmeldung – eine Verbesserung ist weder messbar noch untersucht. Anders als
  bei den Blickfolge-Übungen 402–406 (deren Laborvorbilder dieselbe Tätigkeit auch ohne Rückmeldung untersuchten) fehlt
  ein passendes Laborvorbild: MOT-Studien arbeiten mit Ablenkern und Antwort.
- **Naher Transfer – schwach:** In einer randomisierten Studie (N = 31) stieg die MOT-Leistung stark (ηp² = 0,43),
  Entscheidungen und naher Transfer nicht (Harenberg et al., 2022); von 16 Neurotracker-Interventionsstudien war keine
  präregistriert (Vater et al., 2021). Videospiel-Metaanalysen: kleine (Interventionen g = 0,34, Publikationsbias, nachträgliches Erratum; Bediou et
  al., 2018) bis keine Effekte (Sala et al., 2018).
- **Alltagstransfer – fehlend:** Sport-, E-Sport- oder Verkehrsnutzen ist für keine ähnliche Aufgabe ohne Ablenker belegt.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** Wahrnehmen „aus dem Augenwinkel“ bei ruhigem Blick erlebt werden soll; als ruhiger Einstieg
  (0,5–2×, Linien sichtbar) vor 106 oder 205/206; ohne Hand- und Reaktionsaufgabe.
- **Weniger passend, wenn …** Rückmeldung gewünscht ist; Blickfolge, Reaktion oder Lesen das Ziel sind; nur ein
  Smartphone vorhanden ist.
- **Vorsicht / anpassen bei …** `presbyopie_gleitsicht` (Unschärfezonen beim Hinschauen → Arbeitsplatzbrille, kleineres
  Bild, Kopf erlauben); `gesichtsfeldausfall` (eine Hälfte kaum sichtbar; wer ein Ziel dauerhaft nicht bemerkt, sollte
  das fachlich abklären lassen statt es als Trainingsrückstand zu deuten); `farbsehschwaeche` (Standard-Rot wirkt bei
  Protan-Typ dunkler und in der Peripherie weniger auffällig → Weiß oder Gelb wählen, wie bei 401); `nystagmus` (ruhiger
  Blick erschwert); `schwindel_vestibulaer`, `reisekrankheit` (Dauerbewegung beidseits, zwar kleine Ziele, aber bei
  Unwohlsein abbrechen); `trockenes_auge_bildschirm`,
  `kopfschmerz_asthenopie` (Starren → kurz, Pausen); `aufmerksamkeitsprobleme`, `kognitive_einschraenkung`
  (Doppelaufgabe ohne Rückmeldung); `kinder_unter_6` („nicht hinschauen“ kaum umsetzbar).
- **Kombiniert gut mit …** 401 (Peripherie bei Fixation), 106 (MOT), 205/206 (Doppelaufgaben mit Messung), 108, 403/404
  (Gegenstück: echte Blickfolge – nicht ähnlich, daher nicht unter `aehnliche_uebungen`).
- **Abgrenzung in der Gruppe:** 401 ist die nächste Verwandte, aber keine Dublette – dort ruht die Mitte (Fixierkreuz)
  und kurze Randreize tauchen überall plötzlich auf, hier bewegen sich zwei dauerhaft sichtbare Ziele langsam in
  festen Bahnen links und rechts. Beide haben im Original keine Antwort und keine Messung.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Echte Aufgabe:** gelegentlich kurzer Stopp oder Formwechsel eines Ziels (≥ 300 ms, keine Blitze) → Tasten
  „links/rechts“; Werte: Entdeckungsrate und Reaktionszeit je Seite. Mittelblick über einen Fixierpunkt mit wechselndem
  Zeichen prüfbar machen (wie der zentrale Teil von UFOV-Aufgaben). Keine Stufen ohne Daten.
- **Geometrie in Grad, symmetrisch:** Bahnen spiegelbildlich (z. B. 8–12° links/rechts), 3–20°/s, unabhängige
  Tempovariation je Ziel, adaptive Treppe; Seitenvergleich erst dann.
- **Tablet/Barrierefreiheit:** Querformat, Ständer, Radius ≥ 20 px, Farbe nie als Information; Hinweise zu Gleitsicht,
  Pausen, Blinzeln; keine Hirn-, Sport- oder „Tunnelblick“-Versprechen.

## 11. Quellen

### Von der Website angegeben
- Pylyshyn, Z. W., & Storm, R. W. (1988). Tracking multiple independent targets: Evidence for a parallel tracking mechanism. *Spatial Vision, 3*(3), 179–197. https://doi.org/10.1163/156856888X00122 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (paralleles Verfolgen bis 5 von 10 Objekten ja; keine Geschwindigkeitsnormen, keine Stufen, Aufgabe mit Ablenkern)
- „Alvarez, G. A., & Cavanagh, P. (2005). *Cognitive Psychology, 50*(2), 126–143. doi 10.1016/j.cogpsych.2004.08.001“ – **Prüfung:** Zeitschrift und DOI falsch (die DOI gehört zu Bucciarelli & Johnson-Laird, „Naïve deontics“); richtig: Alvarez, G. A., & Cavanagh, P. (2005). Independent resources for attentional tracking in the left and right visual hemifields. *Psychological Science, 16*(8), 637–643. https://doi.org/10.1111/j.1467-9280.2005.01587.x; **stützt:** teilweise (Halbfeld-Vorteil ja, aber bei Kapazitätsgrenze mit Ablenkern; Aussage zu Hemisphären- und Augendominanz nein)
- Awh, E., & Pashler, H. (2000). Evidence for split attentional foci. *Journal of Experimental Psychology: Human Perception and Performance, 26*(2), 834–846. https://doi.org/10.1037/0096-1523.26.2.834 – **Prüfung:** DOI stimmt ✓; **stützt:** ja (Aufmerksamkeit auf zwei getrennte Orte verteilbar; kein Trainingsbeleg)
- Cavanagh, P., & Alvarez, G. A. (2005). Tracking multiple targets with multifocal attention. *Trends in Cognitive Sciences, 9*(7), 349–354. https://doi.org/10.1016/j.tics.2005.05.009 – **Prüfung:** DOI stimmt ✓; **stützt:** ja (multifokale Aufmerksamkeit als Modell; nichts zu Training oder Stufen)
- „Green, C. S., & Bavelier, D. (2006). … *Cognition, 101*(1), 217–245. doi 10.1016/j.cognition.2005.10.005“ – **Prüfung:** DOI falsch (gehört zu Saxe, Tzelnic & Carey, Säuglingsstudie); richtig: Green, C. S., & Bavelier, D. (2006). Enumeration versus multiple object tracking: The case of action video game players. *Cognition, 101*(1), 217–245. https://doi.org/10.1016/j.cognition.2005.10.004 (Korrigendum 2020: https://doi.org/10.1016/j.cognition.2020.104198); **stützt:** teilweise (Actionspieler ≈ 2 Objekte mehr, kleiner Trainingsnachweis; Minimap-/Tunnelblick-Aussage nicht in der Quelle, Metaanalysen uneinheitlich)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (Reaktionszeit-Latenzen; nichts zu 144/240 Hz, Bewegungsunschärfe oder dieser Aufgabe)

### Weitere Fachliteratur
- Alvarez, G. A., & Franconeri, S. L. (2007). How many objects can you track? Evidence for a resource-limited attentive tracking mechanism. *Journal of Vision, 7*(13), 14. https://doi.org/10.1167/7.13.14 – 1 → 2 Ziele senkt Grenzgeschwindigkeit ≈ 30 %
- Bediou, B., Adams, D. M., Mayer, R. E., Tipton, E., Green, C. S., & Bavelier, D. (2018). Meta-analysis of action video game impact on perceptual, attentional, and cognitive skills. *Psychological Bulletin, 144*(1), 77–110. https://doi.org/10.1037/bul0000130 – Videospiel-Metaanalyse
- Bourassa, D. C., McManus, I. C., & Bryden, M. P. (1996). Handedness and eye-dominance: A meta-analysis of their relationship. *Laterality, 1*(1), 5–34. https://doi.org/10.1080/713754206 – Augendominanz
- Culham, J. C., Brandt, S. A., Cavanagh, P., Kanwisher, N. G., Dale, A. M., & Tootell, R. B. H. (1998). Cortical fMRI activation produced by attentive tracking of moving targets. *Journal of Neurophysiology, 80*(5), 2657–2670. https://doi.org/10.1152/jn.1998.80.5.2657 – Netzwerk beim Verfolgen ohne Blickbewegung (Abstract geprüft)
- Fehd, H. M., & Seiffert, A. E. (2010). Looking at the center of the targets helps multiple object tracking. *Journal of Vision, 10*(4), 19. https://doi.org/10.1167/10.4.19 – Zentrumsblick
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Harenberg, S., McCarver, Z., Worley, J., Murr, D., Vosloo, J., Kakar, R. S., McCaffrey, R., Dorsch, K., & Höner, O. (2022). The effectiveness of 3D multiple object tracking training on decision-making in soccer. *Science and Medicine in Football, 6*(3), 355–362. https://doi.org/10.1080/24733938.2021.1965201 – MOT-Training ohne Transfer
- Hutton, S. B., & Tegally, D. (2005). The effects of dividing attention on smooth pursuit eye tracking. *Experimental Brain Research, 163*(3), 306–313. https://doi.org/10.1007/s00221-004-2171-z – Zweitaufgabe verschlechtert Folgebewegung
- Jewell, G., & McCourt, M. E. (2000). Pseudoneglect: A review and meta-analysis of performance factors in line bisection tasks. *Neuropsychologia, 38*(1), 93–110. https://doi.org/10.1016/S0028-3932(99)00045-7 – normale Seitenasymmetrie
- McKee, S. P., & Nakayama, K. (1984). The detection of motion in the peripheral visual field. *Vision Research, 24*(1), 25–32. https://doi.org/10.1016/0042-6989(84)90140-8 – Bewegungswahrnehmung in der Peripherie
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science, 90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – kein Kausalnachweis
- Strasburger, H., Rentschler, I., & Jüttner, M. (2011). Peripheral vision and pattern recognition: A review. *Journal of Vision, 11*(5), 13. https://doi.org/10.1167/11.5.13 – Sehleistung in der Peripherie
- Strong, R. W., & Alvarez, G. A. (2020). Hemifield-specific control of spatial attention and working memory: Evidence from hemifield crossover costs. *Journal of Vision, 20*(8), 24. https://doi.org/10.1167/jov.20.8.24 – halbfeldspezifische Steuerung (Abstract geprüft)
- Vater, C., Gray, R., & Holcombe, A. O. (2021). A critical systematic review of the Neurotracker perceptual-cognitive training tool. *Psychonomic Bulletin & Review, 28*(5), 1458–1483. https://doi.org/10.3758/s13423-021-01892-2 – Trainierbarkeit, Transfer, Blickvorgabe
- Yantis, S. (1992). Multielement visual tracking: Attention and perceptual organization. *Cognitive Psychology, 24*(3), 295–340. https://doi.org/10.1016/0010-0285(92)90010-Y – Gruppierung erleichtert Tracking
