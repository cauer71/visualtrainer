---
# ===== Kennung =====
nr: 506
kennung: 180-degree-awareness
name: "Randziel-Flick – von der Mitte zu Zielen am linken oder rechten Rand tippen"
name_original: "180° Awareness Pro (Seitentitel: 180-Grad-Aim-Training | FPS-Drehung)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/180-degree-awareness"
blickfit_umsetzung: {kennung: "randziel-flick", name: "Randziel-Flick", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/randziel-flick/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Jeder Durchgang beginnt mit einem Tipp auf eine Marke in der Bildschirmmitte. Nach einer unvorhersehbaren Wartezeit erscheint am linken oder rechten Rand ein Ziel, das möglichst schnell angetippt wird. Der Weg von der Mitte zum Rand ist immer lang und vergleichbar; mit steigender Stufe werden die Ziele kleiner, kürzer sichtbar und streuen über eine größere Höhe. Ausgewertet werden der Median der Zeit von der Mitte bis zum Ziel, die Trefferquote und der Vergleich links gegen rechts."
ziel_funktionen: [sakkaden, auge_hand_koordination, zielbewegung_tempo, zielbewegung_praezision]
eingabe: [maus]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code stufenlos: Level = Punkte / 1.750 + 1 (ohne Obergrenze). Bis Level 15 steigt der Anteil der Randziele 25 → 90 % (max. 95 %), Zielradius 32 → 13 px, Zusatz-Trefferzone 12 → 3 px, Sichtbarkeit 1.300 → 380 ms, Pause 480–680 → 130–190 ms; ab Level ≈ 9,4 driften die Ziele langsam seitlich (Level 15: 22 px/s). Die Trefferserie (bis 50) verkleinert und verkürzt zusätzlich (Radius × 0,62, Sichtbarkeit × 0,61); jeder Fehler setzt sie zurück."
messgroessen: ["Punkte (100 × Combo-Faktor 1–3 × Levelfaktor)", "Präzision = Treffer / (Treffer + Fehlklicks + Leerklicks + Zeitüberschreitungen)", "mittlere Erfassungszeit (Erscheinen bis Trefferklick, Mittelwert)", "maximale Trefferserie", "erreichtes Level", "sinnvoll zusätzlich: Median und Streuung der Erfassungszeit getrennt nach Randziel/Innenziel und Bewegungsweite, Überschießen, Anteil Zeitüberschreitungen je Seite (links/rechts)"]

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
    sakkaden: 3
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
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
    verarbeitungsgeschwindigkeit: 2
    antizipation: 1
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 2
    auge_hand_koordination: 3
    zielbewegung_tempo: 3
    zielbewegung_praezision: 3
    kontinuierliche_steuerung: 0
    ruhige_hand: 1
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 3
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 1
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Computer mit Maus (reine Touch-Geräte werden vom Original abgewiesen; Pointer Lock gibt es in Safari auf iPad nicht)", "freie Mausfläche, bequeme Arm-/Handgelenkhaltung", "Bildschirm 50–70 cm, möglichst Vollbild (Verlassen des Vollbilds bricht ab)", "seitlicher Blick bzw. Kopfdrehung bis zum Bildschirmrand scharf möglich (Bildschirm- statt Gleitsichtbrille)", "kein Farbsehen nötig (ein heller Zieltyp)", "Toleranz für hohen Zeitdruck und Misserfolgs-Rückmeldung"]
vorsicht_bei: [hand_arm_beschwerden, tremor_parkinson, presbyopie_gleitsicht, gesichtsfeldausfall, trockenes_auge_bildschirm, kopfschmerz_asthenopie, sehbehinderung_niedriger_visus, photosensitive_epilepsie, migraene_lichtempfindlich, aufmerksamkeitsprobleme, kognitive_einschraenkung]
geeignet_fuer: ["weite Zielbewegungen von der Bildschirmmitte zum Rand üben (Zeigeaufgabe mit großer Amplitude und Zeitlimit)", "Blick-Hand-Koordination bei großen Blicksprüngen zu seitlich auftauchenden Zielen", "Selbstvergleich auf demselben Gerät (Zeit Mitte → Ziel, Trefferquote, links gegen rechts)", "zum Aufwärmen für Ballspiele und andere Sportarten mit raschen Seitenblicken"]
weniger_geeignet_fuer: ["Gleitsichtträger:innen an großen Bildschirmen (Randziele liegen im unscharfen Seitenbereich des Glases)", "Menschen mit Gesichtsfeldausfall zur Seite, Tremor oder Hand-/Schulterbeschwerden", "Einsteiger:innen und ältere Menschen, denen kurze Sichtzeiten auf hohen Stufen zu schnell sind", "wer Raumorientierung, Drehungen im 3D-Raum oder Richtungshören üben möchte (nicht Gegenstand der Übung)", "Erwartung eines Seh-, Sicherheits- oder Alltagsnutzens"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Bei Zeigeaufgaben am Bildschirm wird man mit Übung deutlich schneller (Warburton et al. 2023; Längsschnittdaten mit N = 7.174 aus einem Zieltraining am Bildschirm, Listman et al. 2021), und eine veränderte Übersetzung zwischen Hand- und Zeigerbewegung wird rasch gelernt und verallgemeinert (Krakauer et al. 2000). Für die Übung selbst, einen Transfer auf Drehbewegungen im Spiel oder auf den Alltag liegen keine Untersuchungen vor."
aehnliche_uebungen: [501, 509, 502, 511, 704, 702, 805, 303, 801, 401]
stichworte: ["Flick", "180-Grad-Drehung", "Randziel", "große Amplitude", "Aim Trainer", "Fitts'sches Gesetz", "Sakkade", "Blick-Kopf-Koordination", "peripheres Sehen", "Auge-Hand-Koordination", "Ego-Shooter", "FPS", "Maus", "Pointer Lock", "Zeitdruck", "Combo"]
---

# 506 · Randziel-Flick – von der Mitte zu Zielen am linken oder rechten Rand tippen

> Original: „180° Awareness Pro“ (Seitentitel „180-Grad-Aim-Training | FPS-Drehung“) – skilldrills.online, Kapitel Zielen (`fps`) · Blickfit: noch nicht umgesetzt (verwandt: `zielfang`, `blitzblick`)

## 1. Kurzbeschreibung

Jeder Durchgang beginnt mit einem Tipp auf die Marke in der Bildschirmmitte. Danach folgt eine unvorhersehbare Wartezeit (mindestens 0,5 s, im Mittel rund 1 s), und am linken oder rechten Rand blendet weich ein Ziel ein. Man tippt das Ziel an, bevor es wieder ausblendet. Weil jeder Durchgang an derselben Stelle beginnt und das Ziel immer am Rand liegt, ist der Weg lang und von Durchgang zu Durchgang vergleichbar; dieselbe Seite kommt höchstens dreimal hintereinander. Die Stufe passt sich an (drei Treffer in Folge steigern, ein Fehler senkt): Das Ziel wird kleiner, bleibt kürzer sichtbar und erscheint in einem größeren Anteil der Bildschirmhöhe. Eine Sitzung hat 20 Durchgänge ohne Zeitkonto und ohne Strafabzug; ausgewertet werden der Median der Zeit von der Mitte bis zum Ziel, die Trefferquote und die Zeiten links gegen rechts.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und Spiel-Chunk `13832-…js` (formatiert, nur Mechanik). **[CODE]** = Code; **[ER]** = eigene Rechnung
(24-Zoll-Monitor, 53 cm/1.920 px breit, 60 cm Abstand).

- **Eingabe [CODE]:** nur Maus, Pointer Lock **ohne** `unadjustedMovement` (Mausbeschleunigung des Systems bleibt
  wirksam); Fadenkreuz = Position + `movementX/Y` × Empfindlichkeit (0,1–3, Standard 1), **am Spielfeldrand
  festgeklemmt**. Touch-Geräte ohne feinen Zeiger werden abgewiesen; Verlassen von Pointer Lock/Vollbild bricht ab.
- **Zielort [CODE]:** Mit Wahrscheinlichkeit 25 % (Level 1) bis 90 % (Level 15, max. 95 %) liegt der Kreis in einem
  Randstreifen **links oder rechts** (je 50 %, vertikal zufällig): Kreismitte ≈ 30–170 px vom Rand (Abstand Radius + 15 px, Streifenbreite min(15 % der Spielfeldbreite, 120 px)), sonst irgendwo. Das Fadenkreuz wird
  **nicht** zur Mitte zurückgesetzt: Nach einem Randtreffer liegt das nächste Randziel zu 50 % auf derselben Seite
  (kurzer Weg) oder gegenüber (≈ 1.600–1.850 px ≈ 40–46° [ER]). Ton: Randziel 880 Hz, Innenziel 440 Hz – verrät „Rand oder
  nicht“, nicht die Seite (keine Stereo-Richtung im Aufruf erkennbar).
- **Schwierigkeit [CODE]:** gleiche Exponentialkurve wie 501, Level = Punkte/1.750 + 1:

  | Level | Punkte ab | Radius + Zusatzzone | Sichtbar | Pause | Randanteil | Drift | Ø Trefferzone [ER] |
  |---|---|---|---|---|---|---|---|
  | 1 | 0 | 32 + 12 px | 1.300 ms | 480–680 ms | 25 % | – | 2,3° |
  | 10 | 15.750 | 19 + 6 px | 680 ms | 245–350 ms | 67 % | 2 px/s | 1,3° |
  | 15 | 24.500 | 13 + 3 px | 380 ms | 130–190 ms | 90 % | 22 px/s | 0,85° |

  Drift seitlich, langsam (22 px/s ≈ 0,6°/s). Volle Combo (≥ 50) auf Level 15: Radius ≈ 8 px, sichtbar ≈ 230 ms [ER].
- **Punkte/Zeit [CODE]:** 100 × Combo-Faktor (1,0–3,0) × (1 + 0,5 × (Level−1)/14). Start 45 s; Treffer **+2 s** (max.
  60 s); Fehlklick, Leerklick, Zeitüberschreitung je **−1 s** und Combo-Reset. Spielzeit und Drift laufen mit dt (max.
  0,1 s) → nicht bildfrequenzabhängig; nur Partikel pro Bild (kosmetisch). Fehler: Bildschütteln (6 px), Fehlerton,
  roter Vollflächen-Schimmer (`fx-flash-red`, 480 ms; standardmäßig an, per Schalter „Miss Flash“ abschaltbar) – bei
  schnellen Fehlklicks mehrmals pro Sekunde. Schimmer nur bei Fehlern, nicht periodisch → `flimmern_lichtreize` 1;
  Bildschütteln → `bewegungsreize_schwindel` 1 (gleiche Einstufung wie 501, 502, 509, 702, 704; 503 mit Aufleuchten als
  Kernreiz: 2).
- **Auswertung [CODE]:** Präzision, Fehlerarten, mittlere Erfassungszeit (Mittelwert über alle Treffer, kurze und
  lange Wege gemischt), maximale Combo, Level; Note S+ bis F nach 100 × √(Punkte/51.000) – ohne Normdaten.
- **Widersprüche Regeltext ↔ Code:** „+0,6 s“/„−0,8 s“ – Code +2 s/−1 s; „Bildschirmecken“ – Randstreifen links/rechts;
  „Maus in die Pad-Mitte“ – nicht verlangt; „Pointer Lock garantiert Rohdaten“ – nicht zutreffend.

## 3. Was die Website sagt – und wie das einzuordnen ist

Versprochen werden peripheres Sehen, „Blind-Flicks“, Raumorientierung (Mauspad-Weg ↔ Drehung), Reaktionen auf
Flankenangriffe und Blendgranaten, „audio-spatial translation“; dazu eine Phasentabelle (Sakkaden-Start 140–190 ms,
Schwung 180–260 ms, Bremsung 60–110 ms, Feinjustierung 70–130 ms, gesamt 450–690 ms, „Elite 320–420 ms“) und Tipps
(Schulter statt Handgelenk, 35–55 cm/360°, Pad ≥ 45–50 cm, 5–10 min täglich).

- **Belegt:** Fitts' Gesetz und Primär- plus Korrekturbewegung (Fitts, 1954; Elliott et al., 2010); Blick vor Hand
  (Prablanc et al., 1979); eine neue Maus-Skalierung wird schnell gelernt (Krakauer et al., 2000).
- **Trifft auf diese Übung nicht zu:** keine Drehung, keine 3D-Welt, kein Richtungston, keine Blendgranate [CODE].
  Mit Standard-Empfindlichkeit braucht die Bildschirmquerung nur wenige Zentimeter Mausweg (800 dpi, Zeigertempo 1:1:
  ≈ 5–6 cm [ER]); ein festes „cm pro 180°“ gibt es wegen der durchgelassenen Beschleunigung nicht (MDN, o. J.).
- **Verzerrt:** Das Fadenkreuz stoppt am Rand, Randziel-Mitten liegen nur ≈ 30–170 px davor [CODE] – undurchdringliche Ränder
  machen Ziele in Bewegungsrichtung „unendlich tief“ und beschleunigen das Treffen (Walker & Smelcer, 1990). Wer an den
  Rand „wirft“ und zurückzieht, umgeht das angeblich trainierte „saubere Abbremsen“.
- **Ohne Datengrundlage:** die Phasen-/Elite-Tabelle (keine Quelle enthält Maus- oder FPS-Normwerte); „140–190 ms“
  liegt überwiegend unter typischen Sakkadenlatenzen von 180–250 ms (Darrien et al., 2001). „Stäbchen erkennen bis 180°“: Das
  Gesichtsfeld ist horizontal ≈ 200° weit (Strasburger et al., 2011), der Monitor deckt nur ≈ 48° ab [ER]; ob Stäbchen
  helle Bildschirmreize tragen, ist fraglich (Einschätzung). Sehnenschonung, Pad-Größe, „5–10 min“: unbelegt; sinnvolle
  Empfindlichkeiten streuen breit (20–80 cm/360°; Boudaoud et al., 2022). Reale Spielsysteme haben 23–243 ms lokale Latenz
  (Ivkovic et al., 2015), die in jede gemessene Zeit eingeht – „Mikrosekunden-Präzision“ ist irreführend.

## 4. Optische und okulomotorische Grundlagen

- **Größe und Ort:** Der sichtbare Zielradius beträgt 7,2 (Stufe 1) bis 3,6 Einheiten (Stufe 14; eine Einheit ist 1 % der kürzeren Bildschirmseite, mindestens 15 Pixel); die Trefferfläche ist größer als das sichtbare Ziel (Radius mindestens 28 Pixel). Die Ziele liegen weit über der Auflösungsgrenze des Auges. Als Faustwert: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°; bei einem Tablet mit 20 cm Anzeigebreite liegen die Zielmitten daher grob 12–13° links und rechts der Mitte, und die beiden Seiten sind rund 25° voneinander entfernt.
- **Randbereich:** Ein kontrastreicher, plötzlich erscheinender Reiz zieht Aufmerksamkeit auf sich (Yantis & Jonides, 1984, dort nahe der Blickmitte untersucht); bei 12–25° Exzentrizität dürfte er dank Kontrast und weichem Einblenden meist bemerkt werden (Einschätzung). Die zum Rand stark abfallende Detailerkennung (Strasburger et al., 2011) wird kaum gebraucht – daher `peripheres_sehen` = 2.
- **Große Blicksprünge:** Die Latenz liegt bei 180–250 ms und hängt kaum von der Exzentrizität ab (Darrien et al., 2001); Sakkade und Hand unterschießen leicht (Helsen et al., 1998). Bei weiten Sprüngen dreht oft der Kopf mit, individuell sehr verschieden (Bereich ohne Kopfbewegung 35,8 ± 31,9° breit; Stahl, 1999). Ab 60–79 Jahren sind Sakkaden langsamer und variabler (Munoz et al., 1998).
- **Brille:** Der scharfe Zwischenbereich einer Gleitsichtbrille ist bei 60 cm Abstand nur 13–18° breit (Einstärkenglas ≈ 60°; Han et al., 2003). Randziele können daher außerhalb liegen, und Kopfdrehungen verfälschen die Zeiten. Besser sind eine Bildschirm- oder Arbeitsplatzbrille und ein kleineres Fenster bzw. ein kleinerer Bildschirm; der Nahbedarf beträgt rechnerisch bei 60 cm etwa 1,7 dpt, bei 40 cm 2,5 dpt (Faustregel: Dioptrien = 100 / Abstand in cm).
- **Weiteres:** Ein Gesichtsfeldausfall zu einer Seite führt dazu, dass Randziele dort später bemerkt werden (Auswahlhinweis, keine Diagnose). Ausfälle vor dem Chiasma betreffen meist ein Auge, am Chiasma beide Seiten ungleichseitig, dahinter gleichseitig (Muchnick, 2008, S. 32); die Übung ist kein Gesichtsfeldtest. Der Lidschlag ist bei konzentrierter Bildschirmarbeit auf etwa ein Drittel des Ruhewerts vermindert (Cardona et al., 2011). Es gibt nur einen Zieltyp; Farbsehschwäche (≈ 8 % der Männer) ist daher unerheblich, und weil die Aufgabe flach ist, spielt Stereosehen keine Rolle (0).

## 5. Neurowissenschaftliche Grundlagen

Orientierungssakkaden entstehen im Netzwerk aus frontalem Augenfeld, Colliculus superior und Hirnstamm (Leigh & Zee, 2015), bei großen Blickwechseln gekoppelt an Kopfbewegungen (Freedman, 2008). Blick- und Handbefehl werden weitgehend **parallel** geplant (Prablanc et al., 1979); der Blick „leitet“ die Handbewegung also nicht ein, beide werden gleichzeitig vorbereitet. Dass die Übung eine Hirnregion „trainiert“, ist nicht belegt.

## 6. Motorische Grundlagen

- **Fitts:** Die Bewegungszeit hängt vom Verhältnis aus Weg und Zielbreite ab (ID = log₂(D/W + 1)). In der Übung ist der Weg die halbe Bildschirmbreite und die Zielbreite die Trefferfläche; mit kleineren Zielen auf höheren Stufen steigt der Schwierigkeitsindex. Bei Zeigegeräten wie der Maus liegen typische Durchsätze bei 3,7–4,9 bit/s (Soukoreff & MacKenzie, 2004); für das Antippen auf Touchscreens gelten andere, hier nicht belegte Werte. Die Zeit von der Mitte bis zum Tipp enthält zudem die Reaktionszeit.
- **Bewegungsablauf:** Schnelle weite Bewegungen streuen stärker (Schmidt et al., 1979); das Geschwindigkeitsmaximum liegt etwa bei halber Strecke (Helsen et al., 1998). Ältere skalieren die Geschwindigkeit bei großen Amplituden weniger (Ketcham et al., 2002). Ob Hand und Unterarm oder die Schulter arbeiten, hängt von Gerät und Haltung ab; Aussagen wie „80–90 % der Bewegung sind ballistisch“ sind nicht belegt.
- **Belastung:** wiederholte weite Armbewegungen, vor allem an sehr großen Bildschirmen; auf dem Tablet gering (`koerperliche_belastung` 1).

## 7. Einflussfaktoren und Messgrenzen

Bildschirmbreite und Betrachtungsabstand bestimmen den Sehwinkel der Wege, und die Verzögerung des Touchscreens geht in jede gemessene Zeit ein – daher keine Vergleiche zwischen Geräten. Wie jede Messung am Menschen streuen Einzelwerte; sinnvoll ist, mehrere Durchgänge zu bündeln (Median statt Einzelwert) und nur Verläufe auf demselben Gerät zu vergleichen (vgl. Mountford et al., 2004, zu Wiederholbarkeit und Mehrfachmessung). Eine hohe Korrelation zweier Geräte heißt außerdem noch nicht, dass sie dieselben Zeiten liefern. Anfangs sind die Eingewöhnungsgewinne groß – aussagekräftig ist nur der Verlauf über Tage (Listman et al., 2021). Verzögerungen des Systems verschlechtern Zielaufgaben schon ab etwa 41 ms (Ivkovic et al., 2015). Die Ziele halten Abstand zum Bildschirmrand, damit der Rand nicht als Anschlag das Treffen erleichtert (vgl. Walker & Smelcer, 1990, zu Bildschirmrändern bei der Auswahl mit der Maus). Bei kleinen Zielen und kurzer Sichtzeit verfallen Ziele auch bei guter Zielgenauigkeit.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – stark** (Zeigeaufgaben am Bildschirm allgemein): Nach 20 Runden sind Reaktions-, Korrektur- und Verweilzeiten deutlich kürzer (Warburton et al., 2023); ein Längsschnitt mit N = 7.174 (Listman et al., 2021) stammt von einem kommerziellen Anbieter. Diese Übung selbst ist nicht untersucht.
- **Naher Transfer – schwach:** Das Lernen einer veränderten Übersetzung zwischen Hand und Zeiger verallgemeinert (Krakauer et al., 2000); ein „fest verdrahtetes“ Gedächtnis für eine bestimmte Empfindlichkeit wurde nicht beobachtet (Boudaoud et al., 2022). Ein Transfer auf weite Drehbewegungen im Spiel ist nicht untersucht.
- **Alltagstransfer – fehlend:** Metaanalysen zu Action-Videospielen schließen motorische Maße mangels Daten aus (Bediou et al., 2023); es gibt keinen Beleg für bessere Seitenwahrnehmung im Verkehr oder Sport.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand weite, schnelle Zielbewegungen und große Blicksprünge von der Mitte zum Rand unter Zeitdruck üben möchte oder sich für Ball- und Rückschlagspiele aufwärmen will; als Steigerung nach 501.
- **Weniger passend, wenn …** Blickfolge, Suche, Gedächtnis oder Raumorientierung das Ziel sind; bei Einsteiger:innen oder Älteren, denen die kurzen Sichtzeiten auf hohen Stufen zu schnell sind (die Stufe passt sich an).
- **Vorsicht / anpassen bei …** Gleitsicht (Randziele können außerhalb des Zwischenbereichs liegen → Bildschirmbrille, kleineres Fenster); Gesichtsfeldausfall, niedrigem Visus (Randziele später bemerkt); Hand-/Armbeschwerden, Tremor (weite schnelle Bewegungen, genaues Treffen); trockenem Auge, Asthenopie (seltener Lidschlag; Pausen einlegen); Photosensitivität, Migräne (die Übung blitzt nicht, blendet aber weich ein und aus); Aufmerksamkeitsproblemen, kognitiver Einschränkung (Zeitdruck). Treten Doppelbilder, plötzlicher einseitiger Sehverlust, neue Gesichtsfeldlücken, Kopfschmerz mit Sehverschlechterung oder Schwindel auf, ist das ein Anlass für ärztliche Abklärung und kein Übungsthema (Muchnick, 2008, S. 6, 28).
- **Kombiniert gut mit …** 501 (kurze Wege), 509 (Feinkorrektur), 511 (Fadenkreuz halten), 805 (Abbremsen), 303 (Blicksprünge), 801/401 (Wahrnehmung am Rand).
- **Verwandte Übung: 501.** Gleiche Grundform (Ziele, Sichtzeiten, Stufen); der Unterschied liegt im Zielort (hier immer am Rand, mit weiteren Wegen und größeren Blicksprüngen, `sakkaden` 3 statt 2). Für dasselbe Übungsziel genügt eine der beiden; 506 ist die Steigerung nach 501. 502 zeigt mehrere bewegte Ziele gleichzeitig (Übersicht statt Weite).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Ehrlicher Name** („Randziel-Flick“): keine Drehung, kein Richtungston. **Tablet:** Touch hat keine Mausübersetzung;
  sinnvoll wäre „Mitte fixieren → Randziel antippen“ mit Zielen ≥ 9 mm und Selbstvergleich statt Normen.
- **Messqualität:** jeder Durchgang aus definiertem Startpunkt, Abstand der Ziele zum Rand (kein Randanschlag),
  Auswertung nach Weite und Seite (Median, Fitts-Durchsatz, Links-Rechts-Vergleich).
- **Optiker/Sicherheit:** Brillenhinweis vor dem Start, Feld so klein, dass Randziele ≤ 15–20° seitlich liegen,
  Pausenhinweis; kein roter Blitz, kein Bildschütteln, mildere Strafen, adaptive Stufen, keine „Elite“-Noten.

## 11. Quellen

### Von der Website angegeben

- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein (einfache Tastenreaktion; nichts zu `performance.now()`, Pointer Lock, Sakkaden oder Drehungen).
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming: Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 – **Prüfung:** DOI, Titel, Jahr stimmen, **Autoren falsch** (Website: „Elliott, Helsen & Chua“ – das sind Autoren von Elliott et al., 2001); **stützt die Aussage der Website:** teilweise (zwei Komponenten ja, aber mit früher Online-Kontrolle; „80–90 % ballistisch“ und ms-Werte nicht enthalten).
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (Gesetz ja; Phasenzeiten der Tabelle nicht).
- Schmidt, R. A., Zelaznik, H., Hawkins, B., Frank, J. S., & Quinn, J. T. (1979). Motor-output variability: A theory for the accuracy of rapid motor acts. *Psychological Review, 86*(5), 415–451. https://doi.org/10.1037/0033-295X.86.5.415 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (Streuung wächst mit Impulsgröße; „antagonistische Bremsung 60–110 ms“ nicht enthalten).
- Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5. Aufl.). Oxford University Press. https://doi.org/10.1093/med/9780199969289.001.0001 – **Prüfung:** DOI falsch (Website: …9780199969**203**…, nicht auflösbar; richtig: …9780199969289…); **stützt die Aussage der Website:** teilweise (Standardwerk zu Sakkaden/Colliculus; keiner konkreten Website-Aussage zugeordnet).
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin, 124*(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein (Lese-Review; keine Aussagen zu Stäbchen, 180°-Wahrnehmung oder „präattentiver Orientierung 140–190 ms“).

### Weitere Fachliteratur

- Bediou, B., Rodgers, M. A., Tipton, E., Mayer, R. E., Green, C. S., & Bavelier, D. (2023). Effects of action video game play on cognitive skills: A meta-analysis. *Technology, Mind, and Behavior, 4*(1), 28–48. https://doi.org/10.1037/tmb0000102 – Transfer von Action-Spielen; motorische Maße mangels Daten ausgeschlossen
- Boudaoud, B., Spjut, J., & Kim, J. (2022). Mouse sensitivity in first-person targeting tasks. In *2022 IEEE Conference on Games (CoG)* (S. 183–190). https://doi.org/10.1109/CoG51982.2022.9893626 – Spannweite sinnvoller Zeigerempfindlichkeiten
- Cardona, G., García, C., Serés, C., Vilaseca, M., & Gispets, J. (2011). Blink rate, blink amplitude, and tear film integrity during dynamic visual display terminal tasks. *Current Eye Research, 36*(3), 190–197. https://doi.org/10.3109/02713683.2010.544442 – Lidschlag bei Bildschirmaufgaben
- Darrien, J. H., Herd, K., Starling, L.-J., Rosenberg, J. R., & Morrison, J. D. (2001). An analysis of the dependence of saccadic latency on target position and target characteristics in human subjects. *BMC Neuroscience, 2*, 13. https://doi.org/10.1186/1471-2202-2-13 – Sakkadenlatenz 180–250 ms, kaum exzentrizitätsabhängig
- Freedman, E. G. (2008). Coordination of the eyes and head during visual orienting. *Experimental Brain Research, 190*(4), 369–387. https://doi.org/10.1007/s00221-008-1504-8 – Blick-Kopf-Koordination bei großen Blickwechseln
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht-Zwischenbereich 13–18° bei 60 cm
- Helsen, W. F., Elliott, D., Starkes, J. L., & Ricker, K. L. (1998). Temporal and spatial coupling of point of gaze and hand movements in aiming. *Journal of Motor Behavior, 30*(3), 249–259. https://doi.org/10.1080/00222899809601340 – Unterschießen, Geschwindigkeitsmaximum bei 50 %
- Ivkovic, Z., Stavness, I., Gutwin, C., & Sutcliffe, S. (2015). Quantifying and mitigating the negative effects of local latencies on aiming in 3D shooter games. In *Proceedings of CHI '15* (S. 135–144). ACM. https://doi.org/10.1145/2702123.2702432 – Systemlatenz geht in gemessene Zeiten ein (23–243 ms)
- Ketcham, C. J., Seidler, R. D., Van Gemmert, A. W. A., & Stelmach, G. E. (2002). Age-related kinematic differences as influenced by task difficulty, target size, and movement amplitude. *The Journals of Gerontology: Series B, 57*(1), P54–P64. https://doi.org/10.1093/geronb/57.1.P54 – Ältere bei großen Amplituden
- Krakauer, J. W., Pine, Z. M., Ghilardi, M.-F., & Ghez, C. (2000). Learning of visuomotor transformations for vectorial planning of reaching trajectories. *The Journal of Neuroscience, 20*(23), 8916–8924. https://doi.org/10.1523/JNEUROSCI.20-23-08916.2000 – Skalierungs-(Gain-)Lernen verallgemeinert
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the "wild" with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 – Übungseffekt bei Zielaufgaben am Bildschirm (Daten eines kommerziellen Anbieters)
- Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human subjects on saccadic eye movement tasks. *Experimental Brain Research, 121*(4), 391–400. https://doi.org/10.1007/s002210050473 – Sakkaden und Alter
- Prablanc, C., Echallier, J. F., Komilis, E., & Jeannerod, M. (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. *Biological Cybernetics, 35*(2), 113–124. https://doi.org/10.1007/BF00337436 – Sakkade vor Hand, parallele Planung
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts' law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 – Fitts-Formel, Durchsatz von Zeigegeräten 3,7–4,9 bit/s
- Stahl, J. S. (1999). Amplitude of human head movements associated with horizontal saccades. *Experimental Brain Research, 126*(1), 41–54. https://doi.org/10.1007/s002210050715 – Bereich ohne Kopfbewegung 35,8 ± 31,9°, individuell stabil (Abstract, PubMed 10333006)
- Strasburger, H., Rentschler, I., & Jüttner, M. (2011). Peripheral vision and pattern recognition: A review. *Journal of Vision, 11*(5), 13. https://doi.org/10.1167/11.5.13 – Gesichtsfeld ≈ 200°, Abfall der Formerkennung
- Walker, N., & Smelcer, J. B. (1990). A comparison of selection time from walking and pull-down menus. In *Proceedings of CHI '90* (S. 221–226). ACM. https://doi.org/10.1145/97243.97277 – undurchdringliche Bildschirmränder beschleunigen die Auswahl (Abstract, Semantic Scholar)
- Warburton, M., Campagnoli, C., Mon-Williams, M., Mushtaq, F., & Morehead, J. R. (2023). Kinematic markers of skill in first-person shooter video games. *PNAS Nexus, 2*(8), pgad249. https://doi.org/10.1093/pnasnexus/pgad249 – Übungseffekt in einer Zielaufgabe mit Zeigegerät
- Yantis, S., & Jonides, J. (1984). Abrupt visual onsets and selective attention: Evidence from visual search. *Journal of Experimental Psychology: Human Perception and Performance, 10*(5), 601–621. https://doi.org/10.1037/0096-1523.10.5.601 – plötzliche Reize ziehen Aufmerksamkeit
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Gesichtsfeldausfälle nach Sehbahnverlauf (S. 32), Warnzeichen mit Abklärungsbedarf (S. 6, 28)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Genauigkeit, Wiederholbarkeit und Mehrfachmessung (Kap. 2, S. 17–18, 24)
