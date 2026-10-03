---
# ===== Kennung =====
nr: 508
kennung: target-acquisition
name: "Hellste Kugel – im Kugel-Cluster die hellste Kugel finden und antippen"
name_original: "Valorant Aim Trainer – Zielerfassung & First Shot (Spieltitel: Target Acquisition Pro)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/target-acquisition"
blickfit_umsetzung: {kennung: "hellste-kugel", name: "Hellste Kugel", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/hellste-kugel/)."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Mehrere graue Kugeln liegen beieinander auf mittelgrauem Grund; alle sind gleich grau, nur eine ist ein wenig heller. Man tippt diese Kugel an und kann sich dafür beliebig Zeit nehmen. Mit dem Erfolg wird der Helligkeitsunterschied feiner und der Cluster größer (6 bis 16 Kugeln); die Rückmeldung erfolgt über Formen, nicht über Blitze. Die Antwortzeit wird nur protokolliert, die Übung ist kein Sehtest."
ziel_funktionen: [kontrast, visuelle_suche, auge_hand_koordination]
eingabe: [maus, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 60
schwierigkeit_anpassung: "Laut Code stufenlos: Level = 1 + Punkte/1.400 (steigt nur). Mit dem Level und zusätzlich mit der Combo werden je neuem Satz die Kugeln mehr (3 → 8), kleiner (Radius 28 → 12 px) und in der Helligkeit ähnlicher (Deckkraft-Stufe 45 % → ≈ 6–7 %); Trefferzugabe (8 → 2–3 px) und Randabstand (120 → 30 px) schrumpfen. Feste Rundenzeit 60 s, kein Zeitbonus."
messgroessen: ["Original: Punkte, Präzision (richtige Treffer/alle Klicks), richtige Treffer, Fehlklicks daneben, Reihenfolgefehler, geräumte Sätze, beste Combo, erreichtes Level, Note S+–F (Wurzel aus Punkte/54.000) – keine Zeitmessung", "sinnvoll: Zeit vom Erscheinen eines Satzes bis zum ersten richtigen Treffer (Median), Zeit je weiterem Treffer, Reihenfolgefehler getrennt nach Helligkeitsabstand, Bewegungs- vs. Suchanteil"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 3
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 1
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
    selektive_aufmerksamkeit: 2
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 2
    antizipation: 0
    entscheidung_wahlreaktion: 2
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 3
    zielbewegung_tempo: 2
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 0
    ruhige_hand: 1
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Computer mit Maus (oder Touchpad) und Pointer Lock; reine Touch-Geräte werden vom Original abgewiesen", "Vollbild, Monitor ≈ 50–70 cm entfernt, passende Korrektion für diesen Abstand", "gutes Kontrastsehen und ein Bildschirm mit sauberem Schwarz; Raum nicht zu hell (schwache Kugeln haben nur 5–17 % Deckkraft)", "kein Farbsehen nötig (alle Kugeln gleicher Farbton, nur Helligkeit unterscheidet)", "Frustrationstoleranz: jeder Fehlklick setzt die Combo zurück"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, sehbehinderung_niedriger_visus, gesichtsfeldausfall, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, hand_arm_beschwerden, tremor_parkinson, aufmerksamkeitsprobleme]
geeignet_fuer: ["Helligkeitsvergleich mehrerer verstreuter Reize mit anschließendem Antippen üben (Suche + Zielbewegung)", "genaues Hinsehen vor dem Tippen üben, ohne Zeitdruck", "Fortsetzung nach reiner Suche (103, 108) und Einzelziel-Übungen (501, 702, 704)", "Gesprächsanlass zu Kontrastsehen, Bildschirmeinstellung, Raumlicht und Arbeitsplatzbrille"]
weniger_geeignet_fuer: ["Menschen mit vermindertem Kontrastsehen (z. B. Linsentrübung) oder in hellen Räumen/auf spiegelnden Displays – feine Stufen sind dort kaum zu erkennen", "Gleitsichtträger:innen ohne Arbeitsplatzbrille, wenn der Cluster weit zum Rand reicht", "wer eine Messung des Kontrastsehens oder der Reaktionszeit erwartet (die Übung ist kein Test)", "Übungsziel Blickfolge/Tracking (505, 514, 104, 105)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Die Übung selbst ist nicht untersucht; in verwandten Aufgaben – visueller Suche (Wahrnehmungslernen in wenigen hundert Durchgängen) und Zielaufgaben am Bildschirm (Längsschnitt N = 7.174; Online-Experiment N = 86) – verbessert man sich mit Übung deutlich. Die Übertragung auf andere Such- oder Zeigeaufgaben ist uneinheitlich, auf Spielleistung oder Alltag nicht untersucht."
aehnliche_uebungen: [510, 502, 501, 103, 108, 204, 509, 702, 704, 302, 804, 801]
stichworte: ["target acquisition", "Zielerfassung", "visuelle Suche", "Helligkeitsvergleich", "Leuchtdichtekontrast", "Reihenfolge", "Aim-Trainer", "Fitts'sches Gesetz", "Blick-Hand-Koordination", "First Shot", "Pointer Lock", "Maus"]
---

# 508 · Zielerfassung – im Kugel-Cluster immer die hellste Kugel zuerst anklicken

> Original: „Valorant Aim Trainer – Zielerfassung & First Shot“ (Spiel „Target Acquisition Pro“) – skilldrills.online,
> Kapitel Zielen (`fps`) · Blickfit: noch nicht umgesetzt (verwandt: `suchbild`, `zahlenjagd`, `zielfang`)

## 1. Kurzbeschreibung

Mehrere graue Kugeln liegen verstreut auf mittelgrauem Grund; alle sind gleich grau, eine ist ein wenig heller. Man tippt diese Kugel an und kann sich dafür beliebig Zeit nehmen (nach sehr langer Wartezeit wird die hellste Kugel gezeigt). Der Helligkeitsunterschied wird als Weber-Kontrast in Leuchtdichte angegeben und sinkt über 20 Stufen von 45 % auf 3 %; gleichzeitig wächst der Cluster von 6 auf 16 Kugeln. Die Zielposition ist zufällig und liegt nach Möglichkeit nicht neben dem letzten Ziel, nie sind zwei Kugeln gleich hell. Eine Sitzung hat 20 Durchgänge; zwei richtige Antworten in Folge machen den Unterschied feiner, eine falsche macht ihn größer (Ziel ≈ 71 % richtig). Die Rückmeldung erfolgt weich über Formen (Ring, Haken, Kreuz, gestrichelter Ring am gesuchten Ziel), ohne Blitz oder Wackeln. Die Antwortzeit wird nur protokolliert (Median der richtigen Antworten); die Übung ist kein Sehtest und kein Kontrastsehtest.

## 2. Ablauf im Original (Analyse)
Grundlage: Seitentext und ausgelieferter Spiel-Chunk (`64974-…js`, formatiert; gelesen am 29.09.2026, nur Mechanik und Parameter übernommen). **[CODE]** = aus dem Code, **[ER]** = eigene Rechnung. Winkel für einen 24″-Full-HD-Monitor im Vollbild in 60 cm Abstand (≈ 38 px/°).

- **Rahmen [CODE]:** Start-Karte → Vollbild und Pointer Lock → Countdown 3-2-1-GO (Start nach 2,45 s) → 60 s Spiel → Ergebnis. ESC, Verlassen von Vollbild oder Pointer Lock bricht ab. Das Fadenkreuz (Ring Ø 28 px ≈ 0,74°) folgt `movementX/Y` × Empfindlichkeit (0,1–3, Standard 1). `requestPointerLock()` wird **ohne** `unadjustedMovement` aufgerufen, die Mausbeschleunigung des Systems bleibt wirksam. Geräte mit Touch, aber ohne feinen Zeiger (`pointer: fine`) werden als „nur Touch“ abgewiesen.
- **Satz [CODE]:** n Kugeln an Zufallsorten mit Mindestabstand 2,8 × Radius (Mitte zu Mitte) und Randabstand. Die Deckkraft der k-ten Kugel ist 1 − k × Stufe, mindestens 0,05; die hellste hat **immer 100 %**. Füllung: Bernstein-Verlauf (hell innen, dunkler Rand) auf `#050508`; jede Kugel sendet alle 1,6 s (zufällige Phase) einen sich um 20 px aufweitenden Ring, dessen Stärke ebenfalls von der Deckkraft abhängt.
- **Parameter nach Level [CODE, ER]** (Combo 0; hohe Combo macht zusätzlich schwerer):

| Level | Kugeln | Radius | Ø in Grad | Trefferzugabe | Deckkraft-Stufe | Randabstand |
|---|---|---|---|---|---|---|
| 1 | 3 | 28 px | ≈ 1,5° | 8 px | 45 % | 120 px |
| 5 | 4 | 25 px | ≈ 1,3° | 7 px | 37 % | 102 px |
| 10 | 6 | 20 px | ≈ 1,0° | 5 px | 25 % | 74 px |
| 15 | 7 | 16 px | ≈ 0,8° | 4 px | 15 % | 52 px |
| 20 | 8 | 14 px | ≈ 0,7° | 3,6 px | 11 % | 41 px |
| 30 | 8 | 12,5 px | ≈ 0,66° | 3 px | 7 % | 33 px |

- **Combo-Rückkopplung [CODE]:** Der Combo-Multiplikator (1,0 ab 0, 1,1 ab 3, … 2,0 ab 20, 3,0 ab 50 Treffern) erhöht nicht nur die Punkte, sondern macht den nächsten Satz größer, die Kugeln bis 15 % kleiner, die Helligkeitsstufen bis 20 % feiner und die Trefferzugabe bis 25 % kleiner – wer gut spielt, bekommt sofort schwerere Sätze.
- **Treffer [CODE]:** richtig ist nur die hellste *verbliebene* Kugel. Punkte = 100 × Combo-Multiplikator × (1 + (Level − 1)/28); geräumter Satz: + 400 × derselbe Faktor, dann sofort neuer Satz. Level = 1 + Punkte/1.400 (Kommazahl, nur steigend). Die Trefferzugabe wird beim Klick aus dem *aktuellen* Level und der Combo berechnet, schrumpft also schon innerhalb eines Satzes.
- **Fehler [CODE]:** Klick auf eine falsche Kugel = Reihenfolgefehler, daneben = Fehlklick. Beides setzt die Combo auf 0 und löst Fehlerton, rote Partikel, Bildwackeln (6–8 px, klingt ab) und einen **roten Vollbildblitz** (0,48 s; Einstellung „Miss Flash“, Standard **an**) aus. Die Zeitstrafe −0,6 s gilt nur mit der Einstellung „Strafen“ (Standard **aus**). Die falsche Kugel bleibt liegen.
- **Konstruktionsfehler [CODE, ER]:** Wegen der Untergrenze 0,05 haben etwa zwischen Level 5,5 und 10,5 (je nach Combo) die **zwei schwächsten Kugeln exakt dieselbe Deckkraft**. Richtig ist dann nur die mit der kleineren internen Nummer – sichtbar ist das nicht, der Spieler muss raten (50 % Reihenfolgefehler bei diesem Klick).
- **Zeit [CODE]:** Die Uhr läuft mit echter Zeit (dt, höchstens 0,1 s je Bild); Partikel bewegen sich pro Bild (auf 144 Hz schneller, nur Optik). **Es wird keine Reaktions- oder Erfassungszeit gemessen** – `performance.now()` dient nur der Bildschleife. Bestwerte bleiben im Browser (`localStorage`).
- **Widersprüche Regeltext ↔ Code:** „+0,4 s je Treffer“ – im Code gibt es **keinen Zeitbonus**. „+400 PKT × Level“ – tatsächlich × (1 + (Level − 1)/28), also 400 bei Level 1 und 600 bei Level 15. „−0,6 s“ nur mit Strafen-Einstellung. Die Seite beschreibt eine „Erfassungs-Latenz“, die das Spiel nicht erhebt.

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite verspricht Training von „Zielerkennung, Bedrohungsentscheidung und First-Shot-Accuracy“ für Valorant, CS2 und Rainbow Six. Theoretisch stützt sie sich auf die Merkmalsintegration (Treisman & Gelade, 1980), Guided Search (Wolfe, 1994, 2007), Fitts (1954), Meyer et al. (1988) und Woods et al. (2015). Sie behauptet, das Training lehre den „primären visuellen Kortex“, Störsignale zu verwerfen, und senke die Latenz „signifikant“; es verankere „unfehlbare Erstschuss-Reflexe“. Tipps: „Soft Focus“ mit peripherem Sehen, Augen 30–50 ms vor dem Fadenkreuz am Ziel, Mauspad-Reibung zum Abbremsen, Black eQualizer. Dazu eine fünfstufige Tabelle (Tier 1 „Radiant/Faceit Lv10“: < 260 ms, 95–99 % Erstschuss-Präzision). Zielgruppe: Wettkampfspieler:innen.

**Einordnung:**
- **Suche:** Einfache Merkmale werden parallel verarbeitet, Kombinationen brauchen gebündelte Aufmerksamkeit (Treisman & Gelade, 1980). Leuchtdichte-Polarität gilt aber nur als *wahrscheinliches* Leitmerkmal der Suche (Wolfe & Horowitz, 2017). Hier ist ohnehin nicht „ein helles Ziel unter dunklen“ gesucht, sondern eine **Rangfolge** fast gleicher Reize. Je ähnlicher Ziel und Ablenker und je uneinheitlicher die Ablenker sind, desto ineffizienter wird die Suche (Duncan & Humphreys, 1989). Ab mittleren Levels ist also serielles Vergleichen zu erwarten, kein „Pop-out“.
- **V1-Lernen, „unfehlbare Reflexe“, „Latenz sinkt signifikant“:** in den genannten Quellen nicht enthalten. Wahrnehmungslernen in Suchaufgaben gibt es (Sireteanu & Rettenbach, 1995), der Ort im Gehirn ist dabei offen.
- **„Augen 30–50 ms vor dem Fadenkreuz“:** widerspricht der Evidenz. Die Sakkade startet innerhalb von ≈ 250 ms, die Hand folgt erst ≈ 100 ms später (Prablanc et al., 1979), und die Primärsakkade endet etwa zur maximalen Handbeschleunigung (Helsen et al., 1998). Der Blick ist also deutlich mehr als 30–50 ms vor dem Fadenkreuz am Ziel.
- **„Soft Focus“:** Peripher sinken Auflösung und Unterscheidungsleistung stark (Strasburger et al., 2011). Die hellste Kugel fällt peripher auf, feine Helligkeitsstufen muss man aber meist nacheinander anschauen.
- **„Visual Clutter kostet 100–200 ms“:** als feste Zahl nicht belegt. Die Größenordnung ist mit Laborwerten vereinbar – ineffiziente Suche kostet ≈ 25–35 ms je Element (Wolfe, 2001) –, der tatsächliche Wert hängt aber von Elementzahl und Ähnlichkeit ab.
- **Black eQualizer, Mausgriff, „300 ms Sichtkontakt entscheiden“:** ohne Quelle, nicht belegt.
- **Tier-Tabelle:** **keine Datengrundlage.** Woods et al. (2015) untersuchten einfache Tastenreaktionen, keine Zielerfassung, und das Spiel misst die angegebene Latenz gar nicht.
- **Messtechnik:** Die Angaben zu Bildintervall (16,7/6,9/4,1 ms bei 60/144/240 Hz; genau 4,17 ms) und USB-Abfrage (8 ms bei 125 Hz) sind im Kern korrekt; Woods et al. (2015) ist dafür aber nur allgemeiner Beleg für Hardware-Verzögerungen. „Mikrosekundenauflösung“ stimmt nur eingeschränkt (100 µs ohne bzw. 5 µs mit Cross-Origin-Isolierung; MDN, o. J.) und widerspricht der eigenen Angabe „auf rund 1 ms gerundet“; für dieses Spiel ist es ohnehin bedeutungslos, weil es keine Zeiten misst. „Kein Upload“ stimmt (nur `localStorage`).

## 4. Optische und okulomotorische Grundlagen

- **Reizgröße:** Der Kugelradius beträgt etwa 4 Einheiten (1 Einheit = 1 % der kürzeren Bildschirmseite; 22–40 Pixel), die Trefferfläche ist größer (Radius mindestens 24 Pixel). Für die Sehschärfe ist das anspruchslos (Optotypen für Visus 1,0 ≈ 5′ = 0,08°); die Übung betrifft Kontrast, nicht Detail. Als Faustwert: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°.
- **Kontrast:** Die Kugeln haben einen Ausgangsgrauwert von 150 auf Grund 96 (jeweils von 255). Die hellste Kugel ist um einen Weber-Kontrast von 45 % (Stufe 1) bis 3 % (Stufe 20) heller, berechnet in Leuchtdichte über die sRGB-Kurve; auf einem 8-Bit-Bildschirm entspricht das einem Unterschied von etwa 28 Grauwerten (Stufe 1) bis etwa 2 Grauwerten (Stufe 20). Wie ein Bildschirm Grautöne wirklich wiedergibt, hängt von Gamma, Helligkeit, Blickwinkel und Spiegelungen ab; Werte also nur auf demselben Gerät und bei gleichem Raumlicht vergleichen.
- **Alter:** Die Kontrastempfindlichkeit sinkt ab etwa 40–50 Jahren, vor allem für feine Muster (Owsley et al., 1983). Die großen Kugeln sind davon weniger betroffen, die feinen Helligkeitsstufen dagegen mehr. Eine Linsentrübung senkt den Kontrast zusätzlich; dazu gibt es hier keine eigene Zahl.
- **Gesichtsfeld:** Der Cluster liegt in einem begrenzten Feld in der Bildschirmmitte. Die Zapfendichte fällt schon 1 mm neben der Fovea um eine Größenordnung (Curcio et al., 1990); wer ein Gesichtsfeld mit Ausfällen hat, kann Kugeln am Rand übersehen.
- **Sakkaden:** Latenz typisch 180–250 ms (Darrien et al., 2001), im Alter länger und variabler (Munoz et al., 1998). Jede Suche mit Vergleich braucht mehrere Blicksprünge.
- **Gleitsicht:** Bei den zwei untersuchten Gleitsichtgläsern war das klare Blickfeld im Zwischenbereich bei 60 cm nur 13° bzw. 18° breit, beim Einstärkenglas 60° (Han et al., 2003; N = 11). Kugeln am Rand des Clusters verlangen dann Kopfbewegungen oder den Blick durch unscharfe Glaszonen – bei feinen Helligkeitsvergleichen störend. Günstiger sind Arbeitsplatz- bzw. Bildschirmbrille.
- **Farbsehschwäche:** Es werden nur Graustufen gezeigt; die Information liegt allein in der Helligkeit. Das ist für die ≈ 8 % Männer mit Rot-Grün-Schwäche unerheblich (Birch, 2012).
- **Trockenes Auge:** Bei konzentrierter Bildschirmarbeit sinkt die Lidschlagrate auf etwa ein Drittel des Ruhewerts (Cardona et al., 2011); ein Blinzel- und Pausenhinweis ist sinnvoll.

## 5. Neurowissenschaftliche Grundlagen

- **Salienz- und Prioritätskarten:** Modelle beschreiben eine topografische „Auffälligkeitskarte“, die das nächste Aufmerksamkeitsziel bestimmt; Salienz hängt stark vom Umfeld ab (Itti & Koch, 2001). Beim Affen verhalten sich sichtabhängige Neurone im **frontalen Augenfeld (FEF)** wie eine solche Karte. Sie verbinden Auffälligkeit (bottom-up) mit Zielwissen (top-down), und ihr Maximum bestimmt das nächste Blickziel (Thompson & Bichot, 2005). Ähnlich wirkt der **laterale intraparietale Bereich (LIP)** als Prioritätskarte für Sakkaden und Aufmerksamkeit (Bisley & Goldberg, 2010). Die Aufgabe „die hellste Kugel finden“ ist eine Top-down-Gewichtung einer Bottom-up-Eigenschaft (vgl. Wolfe, 1994).
- **Einordnung:** Diese Befunde beschreiben, *welche* Netzwerke an Suche und Zielwahl beteiligt sind. Dass die Übung FEF, LIP oder den primären visuellen Kortex „trainiert“, ist nicht belegt.
- **Automatisierung:** Bei gleichbleibender Zuordnung (immer „die hellste Kugel“) kann Entdeckung automatisiert werden; das Gelernte bleibt dann aber eng an die geübten Reize gebunden (Shiffrin & Schneider, 1977).

## 6. Motorische Grundlagen

- **Ablauf je Kugel:** suchen/vergleichen → Blicksprung → Zielbewegung → Tippen. Der Blick bleibt während der Zeigebewegung am Ziel „verankert“; Sakkaden zum nächsten Ziel werden bis zum Abbremsen der Hand aufgeschoben (+155 ms; Neggers & Bekkering, 2000). Suche und Zielen laufen also weitgehend **nacheinander**; das passt dazu, erst sicher zu vergleichen und dann zu tippen.
- **Fitts:** Die Bewegungszeit steigt mit dem Schwierigkeitsindex log₂(D/W + 1) (Fitts, 1954; Soukoreff & MacKenzie, 2004), also mit längeren Wegen und kleineren Zielen; Primärbewegung plus Korrekturen (Meyer et al., 1988). Hier ist das Ziel mit der Trefferfläche mindestens ≈ 48 Pixel breit, der Zeitanteil der Bewegung ist klein gegenüber dem Vergleichen.
- **Kinematik bei Zielaufgaben:** Nach 20 Übungsrunden einer Zielaufgabe sanken Reaktionszeit (−70 ms), Korrekturzeit (−134 ms) und Verweilzeit vor dem Klick (−72 ms); mit der Maus war man schneller als mit dem Trackpad (Warburton et al., 2023). Auch Toth et al. (2023) zerlegen die Zielerfassung in solche Phasen.
- **Tempo und Genauigkeit:** Actionspieler waren im Stroop-Test schneller, aber fehleranfälliger als Nichtspieler (Kowal et al., 2018; Querschnitt, keine Ursache belegt). In der Übung gibt es keinen Zeitdruck; zu tippen, erst wenn der Helligkeitsvergleich sicher ist, ist eher eine Tempo-Genauigkeits-Abwägung als das Unterdrücken einer vorbereiteten Antwort auf einen Stopp-Reiz (keine Täuschreize) → `inhibition` 1; in der Gruppe fordert 503 (Frühstarts, Täuschreize) die Hemmung am stärksten (2).
- **Tremor:** Die Trefferflächen sind größer als die sichtbaren Kugeln; bei einzelnen älteren Menschen (5 von 100 über 70 Jahren) lag die tremorbezogene Muskelaktivität bei 5–7 Hz statt 9–12 Hz, und etwa 8 % gesunder Erwachsener zeigten ein Muster wie ein leichter essenzieller Tremor (Elble, 2003).
- **Touch:** Tippen mit dem Finger ist schneller als Maus, bei kleinen Zielen aber fehleranfälliger (Cockburn et al., 2012); Ziele sollten ≥ 9 mm groß sein (Parhi et al., 2006). Ältere profitieren von Touch stärker als Jüngere (−35 % vs. −16 % Bewegungszeit; Findlater et al., 2013).

## 7. Einflussfaktoren und Messgrenzen

- **Zeit nur protokolliert:** Die Zeit enthält Vergleichen, Blicksprung und Tippen; sie ist kein Maß der Kontrastempfindlichkeit. Auf den feinsten Stufen sind richtige Antworten teils geraten (Ratewahrscheinlichkeit 1/n bei n Kugeln).
- **Anzeige und Raum:** Gamma, Helligkeit, Schwarzwert, Blickwinkel (IPS/TN/OLED) und Spiegelungen verändern die sichtbaren Helligkeitsstufen stark; Werte sind zwischen Geräten nicht vergleichbar. Die Bildschirmgröße verändert Pixel pro Grad und Wege.
- **Eingabe:** Die Verzögerung des Touchscreens (Deber et al., 2015) und die Systemlatenz gehen in jede Zeit ein; Latenzen realer Setups von 23–243 ms verschlechtern das Zielen messbar (Ivkovic et al., 2015).
- **Alter:** Visuelle Suche ist früh und spät im Leben langsamer, besonders bei vielen Ablenkern (Hommel et al., 2004); Zielbewegungen Älterer sind langsamer und variabler (Ketcham et al., 2002).
- **Übung:** Große Gewinne in digitalen Sehtrainings entstehen vor allem, wenn Trainings- und Testaufgabe gleich sind (Guo et al., 2025) – ein Anstieg der Stufe ist zunächst Gewöhnung an diese Aufgabe. Einzelne Durchgänge streuen, wie jede Messung am Menschen; der Verlauf über mehrere Sitzungen ist aussagekräftiger (vgl. Mountford et al., 2004, zu Mehrfachmessung).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – stark (für verwandte Aufgaben):** Anfangs serielle Suchen wurden teils schon nach wenigen hundert Durchgängen effizient, der Effekt war dauerhaft (Sireteanu & Rettenbach, 1995). In Daten einer Online-Zielaufgabe (N = 7.174) verbesserten sich Treffer pro Sekunde deutlich; 90 % des Tagesnutzens entstanden mit ≈ 30 min (Listman et al., 2021; vom Anbieter mitfinanziert). Warburton et al. (2023) fanden in einem Online-Experiment (N = 86, 20 Runden) klare Übungsgewinne (Erfassungszeit −317 ms). Die vorliegende Übung ist nicht untersucht.
- **Naher Transfer – schwach:** Sucherlernen war in einer Studie wenig spezifisch (Sireteanu & Rettenbach, 1995), in anderen Studien war es spezifisch oder fehlte (Ellison & Walsh, 1998). Eine Studie „Zieltraining → bessere Spielleistung“ wurde nicht gefunden.
- **Alltagstransfer – fehlend:** Die Metaanalyse zu Action-Videospielen betrifft ganze Spiele und kognitive Maße (Interventionsstudien: kleiner Effekt, g = 0,30, 95 %-KI 0,11–0,50; Bediou et al., 2023), nicht Zielmotorik oder einzelne Zielübungen. Für Helligkeitsvergleich + Antippen gibt es keinen Beleg für Nutzen im Verkehr, Beruf oder Sport.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** Suche + gezieltes Antippen geübt werden soll, genaues Vergleichen vor dem Handeln gewünscht ist und ohne Zeitdruck gearbeitet werden soll; auch als Fortsetzung von 103/108 (reine Suche) oder 501/702 (reines Zielen).
- **Weniger passend, wenn …** das Kontrastsehen vermindert ist oder der Raum hell ist, Gleitsicht ohne Bildschirmbrille getragen wird, eine echte Zeitmessung erwartet wird oder das Ziel Blickfolge ist.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Die Übung arbeitet ohne Blitze und Wackeln, die Rückmeldung erfolgt über Formen; bei bekannter Lichtempfindlichkeit dennoch Vorsicht (Fisher et al., 2005).
  - `sehbehinderung_niedriger_visus`, `gesichtsfeldausfall`: feine Helligkeitsunterschiede, Kugeln im ganzen Cluster.
  - `presbyopie_gleitsicht`: Vergleich feiner Helligkeitsstufen; klares Blickfeld im Zwischenbereich bei den untersuchten Gläsern nur 13–18° (Han et al., 2003).
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: konzentriertes Hinsehen, weniger Lidschlag (Cardona et al., 2011).
  - `hand_arm_beschwerden`, `tremor_parkinson`: kurze Tippwege, große Trefferflächen.
  - `aufmerksamkeitsprobleme`: Auf den feinsten Stufen sind Fehler unvermeidlich (Raten) → Frust möglich; die Stufe passt sich an.
  - Die Übung ist kein Test des Kontrastsehens. Verschwommensehen, Doppelbilder oder plötzliche Sehverschlechterung gehören in die augenärztliche Abklärung (Muchnick, 2008, S. 6).
- **Kombiniert gut mit …** 103 und 108 (Suche ohne Motorik), 204 (Reihenfolge-Suche), 510 (Zielauswahl nach Regel), 501/702 (Zielen), 509 (Feinkorrektur).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Tablet:** Original blockiert Touch. Die Aufgabe passt gut zu Touch: direktes Antippen, keine Empfindlichkeit, Ziele ≥ 9 mm, Trefferzone größer als die Kugel. Touch-Latenz von 50–200 ms nicht bestrafen (Deber et al., 2015). Nahe Verwandte sind `suchbild` und `zahlenjagd`.
- **Messqualität:** Zeiten je Satz und je Treffer protokollieren (Median). Helligkeitsstufen **nicht** unter eine sichtbare Untergrenze fallen lassen (keine gleich hellen Kugeln). Schwierigkeit adaptiv über die Helligkeitsstufe (Treppe) statt über Punkte und Combo. Größen in mm/Grad statt px angeben.
- **Kontrast/Optik:** Stufen in Leuchtdichte (gammakorrigiert) statt Deckkraft definieren. Kurze Kalibrierung („Sehen Sie alle Kugeln?“), heller Hintergrund als Option. Spielfeld auf ≈ ± 15° begrenzen (Gleitsicht).
- **Sicherheit/Barrierefreiheit:** kein roter Vollbildblitz, kein Bildwackeln (dezente Form-/Ton-Rückmeldung), Pausen-/Blinzelhinweis, Pulsringe abschaltbar.
- **Regeltext:** keine Tier-Tabelle, keine Hirnregion- oder Reflexversprechen; Punkte, Zeit (kein Bonus) und Strafen korrekt beschreiben; kein Gewalt-/„Bedrohungs“-Rahmen.

## 11. Quellen
### Von der Website angegeben
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein (einfache Tastenreaktion; Hardware-Verzögerung ja, aber keine Erfassungs-Latenz und keine Tier-Werte)
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt:** ja (allgemeiner Rahmen der Zielbewegung)
- Meyer, D. E., Abrams, R. A., Kornblum, S., Wright, C. E., & Smith, J. E. K. (1988). Optimality in human motor performance: Ideal control of rapid aimed movements. *Psychological Review, 95*(3), 340–370. https://doi.org/10.1037/0033-295X.95.3.340 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Primär- plus Korrekturbewegung ja; „Mauspad-Reibung“, „Zögerlichkeit eliminieren“ nicht)
- Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology, 12*(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Parallelverarbeitung einfacher Merkmale ja; Rangfolge ähnlicher Helligkeiten ist keine Pop-out-Suche, „unfehlbare Reflexe“ nicht belegt)
- Wolfe, J. M. (2007). Guided Search 4.0: Current progress with a model of visual search. In W. D. Gray (Hrsg.), *Integrated models of cognitive systems* (S. 99–119). Oxford University Press. https://doi.org/10.1093/acprof:oso/9780195189193.003.0008 – **Prüfung:** DOI stimmt ✓ (Buchkapitel); **stützt:** teilweise (Top-down/Bottom-up-Lenkung ja; V1-Training und „Latenz sinkt signifikant“ nicht enthalten)
- Im Text genannt, nicht im Verzeichnis: Wolfe, J. M. (1994). Guided Search 2.0: A revised model of visual search. *Psychonomic Bulletin & Review, 1*(2), 202–238. https://doi.org/10.3758/BF03200774 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (wie 2007)

### Weitere Fachliteratur
- Bediou, B., Rodgers, M. A., Tipton, E., Mayer, R. E., Green, C. S., & Bavelier, D. (2023). Effects of action video game play on cognitive skills: A meta-analysis. *Technology, Mind, and Behavior, 4*(1), 28–48. https://doi.org/10.1037/tmb0000102 – Transfer (kognitive Maße)
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit Farbsehschwäche
- Bisley, J. W., & Goldberg, M. E. (2010). Attention, intention, and priority in the parietal lobe. *Annual Review of Neuroscience, 33*, 1–21. https://doi.org/10.1146/annurev-neuro-060909-152823 – LIP als Prioritätskarte [Abstract]
- Cardona, G., García, C., Serés, C., Vilaseca, M., & Gispets, J. (2011). Blink rate, blink amplitude, and tear film integrity during dynamic visual display terminal tasks. *Current Eye Research, 36*(3), 190–197. https://doi.org/10.3109/02713683.2010.544442 – Lidschlag bei Bildschirmaufgaben
- Cockburn, A., Ahlström, D., & Gutwin, C. (2012). Understanding performance in touch selections: Tap, drag and radial pointing drag with finger, stylus and mouse. *International Journal of Human-Computer Studies, 70*(3), 218–233. https://doi.org/10.1016/j.ijhcs.2011.11.002 – Touch vs. Maus
- Curcio, C. A., Sloan, K. R., Kalina, R. E., & Hendrickson, A. E. (1990). Human photoreceptor topography. *Journal of Comparative Neurology, 292*(4), 497–523. https://doi.org/10.1002/cne.902920402 – Zapfendichte
- Darrien, J. H., Herd, K., Starling, L.-J., Rosenberg, J. R., & Morrison, J. D. (2001). An analysis of the dependence of saccadic latency on target position and target characteristics in human subjects. *BMC Neuroscience, 2*, 13. https://doi.org/10.1186/1471-2202-2-13 – Sakkadenlatenz
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. In *Proceedings of CHI '15* (S. 1827–1836). ACM. https://doi.org/10.1145/2702123.2702300 – Touch-Latenz
- Duncan, J., & Humphreys, G. W. (1989). Visual search and stimulus similarity. *Psychological Review, 96*(3), 433–458. https://doi.org/10.1037/0033-295X.96.3.433 – Ähnlichkeit Ziel/Ablenker
- Elble, R. J. (2003). Characteristics of physiologic tremor in young and elderly adults. *Clinical Neurophysiology, 114*(4), 624–635. https://doi.org/10.1016/S1388-2457(03)00006-3 – Tremor
- Ellison, A., & Walsh, V. (1998). Perceptual learning in visual search: Some evidence of specificities. *Vision Research, 38*(3), 333–345. https://doi.org/10.1016/S0042-6989(97)00195-8 – Spezifität des Sucherlernens
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of CHI '13* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Touch vs. Maus im Alter
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Photosensitivität
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Lerneffekt vs. Transfer
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Helsen, W. F., Elliott, D., Starkes, J. L., & Ricker, K. L. (1998). Temporal and spatial coupling of point of gaze and hand movements in aiming. *Journal of Motor Behavior, 30*(3), 249–259. https://doi.org/10.1080/00222899809601340 – Blick-Hand-Kopplung
- Hommel, B., Li, K. Z. H., & Li, S.-C. (2004). Visual search across the life span. *Developmental Psychology, 40*(4), 545–558. https://doi.org/10.1037/0012-1649.40.4.545 – Suche und Alter
- Itti, L., & Koch, C. (2001). Computational modelling of visual attention. *Nature Reviews Neuroscience, 2*(3), 194–203. https://doi.org/10.1038/35058500 – Salienzkarte [Abstract]
- Ivkovic, Z., Stavness, I., Gutwin, C., & Sutcliffe, S. (2015). Quantifying and mitigating the negative effects of local latencies on aiming in 3D shooter games. In *Proceedings of CHI '15* (S. 135–144). ACM. https://doi.org/10.1145/2702123.2702432 – Systemlatenz
- Ketcham, C. J., Seidler, R. D., Van Gemmert, A. W. A., & Stelmach, G. E. (2002). Age-related kinematic differences as influenced by task difficulty, target size, and movement amplitude. *The Journals of Gerontology: Series B, 57*(1), P54–P64. https://doi.org/10.1093/geronb/57.1.P54 – Zielbewegungen im Alter
- Kowal, M., Toth, A. J., Exton, C., & Campbell, M. J. (2018). Different cognitive abilities displayed by action video gamers and non-gamers. *Computers in Human Behavior, 88*, 255–262. https://doi.org/10.1016/j.chb.2018.07.010 – Tempo vs. Genauigkeit
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the "wild" with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 – Übungseffekt bei Zielaufgaben am Bildschirm (Daten eines kommerziellen Anbieters)
- MDN Web Docs. (o. J.). *Performance: now() method*. Abgerufen am 29.09.2026 von https://developer.mozilla.org/en-US/docs/Web/API/Performance/now – Zeitauflösung (Webquelle, keine DOI)
- Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human subjects on saccadic eye movement tasks. *Experimental Brain Research, 121*(4), 391–400. https://doi.org/10.1007/s002210050473 – Sakkaden und Alter
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blickverankerung
- Owsley, C., Sekuler, R., & Siemsen, D. (1983). Contrast sensitivity throughout adulthood. *Vision Research, 23*(7), 689–699. https://doi.org/10.1016/0042-6989(83)90210-9 – Kontrast im Alter
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of MobileHCI '06* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – Touch-Zielgröße
- Prablanc, C., Echallier, J. F., Komilis, E., & Jeannerod, M. (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. *Biological Cybernetics, 35*(2), 113–124. https://doi.org/10.1007/BF00337436 – Sakkade vor Hand
- Shiffrin, R. M., & Schneider, W. (1977). Controlled and automatic human information processing: II. Perceptual learning, automatic attending and a general theory. *Psychological Review, 84*(2), 127–190. https://doi.org/10.1037/0033-295X.84.2.127 – Automatisierung
- Sireteanu, R., & Rettenbach, R. (1995). Perceptual learning in visual search: Fast, enduring, but non-specific. *Vision Research, 35*(14), 2037–2043. https://doi.org/10.1016/0042-6989(94)00295-W – Sucherlernen
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts' law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 – Fitts-Auswertung
- Strasburger, H., Rentschler, I., & Jüttner, M. (2011). Peripheral vision and pattern recognition: A review. *Journal of Vision, 11*(5), 13. https://doi.org/10.1167/11.5.13 – peripheres Sehen
- Thompson, K. G., & Bichot, N. P. (2005). A visual salience map in the primate frontal eye field. *Progress in Brain Research, 147*, 251–262. https://doi.org/10.1016/S0079-6123(04)47019-8 – FEF-Salienzkarte (Seiten laut PubMed; Crossref: 249–262)
- Toth, A. J., Hojaji, F., & Campbell, M. J. (2023). Exploring the mechanisms of target acquisition performance in esports: The role of component kinematic phases on a first person shooter motor skill. *Computers in Human Behavior, 139*, 107554. https://doi.org/10.1016/j.chb.2022.107554 – Phasen der Zielerfassung
- Warburton, M., Campagnoli, C., Mon-Williams, M., Mushtaq, F., & Morehead, J. R. (2023). Kinematic markers of skill in first-person shooter video games. *PNAS Nexus, 2*(8), pgad249. https://doi.org/10.1093/pnasnexus/pgad249 – Kinematik und Übung
- Wolfe, J. M. (2001). Asymmetries in visual search: An introduction. *Perception & Psychophysics, 63*(3), 381–389. https://doi.org/10.3758/BF03194406 – Suchkosten je Element
- Wolfe, J. M., & Horowitz, T. S. (2017). Five factors that guide attention in visual search. *Nature Human Behaviour, 1*, 0058. https://doi.org/10.1038/s41562-017-0058 – Leitmerkmale der Suche
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Wiederholbarkeit und Mehrfachmessung (Kap. 2, S. 17–18, 44)
