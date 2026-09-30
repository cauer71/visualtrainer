---
# ===== Kennung =====
nr: 501
kennung: flick-shot-training
name: "Flick-Zielen – plötzlich erscheinende Einzelziele mit einer schnellen Mausbewegung treffen"
name_original: "Pro Flick Trainer (Seitentitel: Aim Trainer – Flick-Training im Browser)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/flick-shot-training"
blickfit_umsetzung: null
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Auf dunklem Spielfeld erscheint nach kurzer Pause jeweils ein einzelner grüner Kreis an zufälliger Stelle. Man führt das Fadenkreuz per Maus (gesperrter Zeiger) so schnell wie möglich darauf und klickt, bevor der Kreis wieder verschwindet; mit Punktestand und Trefferserie werden die Kreise kleiner und kürzer sichtbar."
ziel_funktionen: [auge_hand_koordination, zielbewegung_tempo, zielbewegung_praezision]
eingabe: [maus]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code stufenlos: Level = Punkte / 1.800 + 1 (Anzeige abgerundet, ohne Obergrenze). Bis Level 15 schrumpfen Zielradius 32 → 13 px, zusätzliche Trefferzone 12 → 3 px, Sichtbarkeit 1.300 → 380 ms und Pause zwischen Zielen 480–680 → 130–190 ms (darüber weiter gegen 7 px bzw. 90 ms). Zusätzlich verschärft die Trefferserie (Combo) bis 50 Treffer alles weiter (Radius × 0,7, Sichtbarkeit × 0,68); ein Fehler setzt sie zurück."
messgroessen: ["Punkte (100 × Combo-Faktor 1–3 × Levelfaktor)", "Präzision = Treffer / (Treffer + Fehlklicks + Leerklicks + Zeitüberschreitungen)", "mittlere Flick-Zeit (Erscheinen bis Trefferklick, arithmetisches Mittel, nur Treffer)", "maximale Trefferserie", "erreichtes Level", "sinnvoll zusätzlich: Median und Streuung der Flick-Zeit, getrennt nach Distanz und Zielgröße (Fitts-Durchsatz in bit/s), Anteil Zeitüberschreitungen"]

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
    entscheidung_wahlreaktion: 0
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
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Computer mit Maus (Touch-Geräte werden vom Original mit dem Hinweis „Mouse Required for Pointer Lock“ abgewiesen)", "freie Mausfläche, bequeme Arm-/Handgelenkhaltung", "Bildschirm 50–70 cm, möglichst Vollbild", "passende Korrektion für den Bildschirmabstand (bei Alterssichtigkeit Zwischen- bzw. Bildschirmkorrektion)", "kein Farbsehen nötig (ein Zieltyp, hoher Helligkeitskontrast)", "Toleranz für hohen Zeitdruck und Misserfolgs-Rückmeldung"]
vorsicht_bei: [hand_arm_beschwerden, tremor_parkinson, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, sehbehinderung_niedriger_visus, gesichtsfeldausfall, photosensitive_epilepsie, migraene_lichtempfindlich, aufmerksamkeitsprobleme, kognitive_einschraenkung]
geeignet_fuer: ["schnelle, genaue Einzel-Zielbewegungen mit der Maus üben (Fitts-Aufgabe mit Zeitlimit)", "Auge-Hand-Koordination auf plötzlich erscheinende Ziele im ganzen Bildschirm", "sportliches Aufwärmen für Menschen, die ohnehin Ego-Shooter spielen", "Selbstvergleich auf demselben Gerät (Flick-Zeit, Präzision)"]
weniger_geeignet_fuer: ["Tablet- und Smartphone-Nutzung (Original nicht spielbar)", "Einsteiger:innen und ältere Menschen ohne Maus-Routine (Zeitlimit schrumpft rasch unter typische Erfassungszeiten)", "Menschen mit Tremor oder Hand-/Handgelenkschmerzen", "Gleitsichtträger:innen im Vollbild am großen Monitor (Ziele weit seitlich im unscharfen Randbereich)", "Ziel Blickfolge, Suche unter Ablenkern oder Gedächtnis", "Erwartung eines Seh- oder Alltagsnutzens"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "In Aim-Trainer-Klickaufgaben wird man mit Übung deutlich schneller (Warburton et al. 2023, N = 86; Aim-Lab-Längsschnitt N = 7.174, Listman et al. 2021); die Original-Übung selbst und ein Transfer auf Spielleistung oder Alltag sind nicht untersucht, Metaanalysen zu Action-Spielen schließen motorische Maße mangels Daten aus."
aehnliche_uebungen: [704, 702, 508, 502, 509, 506, 503, 708, 804, 302, 303]
stichworte: ["Flick", "Flick Aiming", "Snap Aim", "Aim Trainer", "Zielbewegung", "Fitts'sches Gesetz", "Speed-Accuracy-Trade-off", "Auge-Hand-Koordination", "Ego-Shooter", "FPS", "Maus", "Pointer Lock", "Zeitdruck", "Combo"]
---

# 501 · Flick-Zielen – plötzlich erscheinende Einzelziele mit einer schnellen Mausbewegung treffen

> Original: „Pro Flick Trainer“ (Seitentitel „Aim Trainer – Flick-Training im Browser“) – skilldrills.online,
> Kapitel Zielen (`fps`) · Blickfit: noch nicht umgesetzt (verwandt: `zielfang`, `blitzreaktion`)

## 1. Kurzbeschreibung

Auf einem fast schwarzen Spielfeld mit feinem Raster taucht – begleitet von einem kurzen Piepton – ein grüner
Kreis an zufälliger Stelle auf. Man bewegt das Fadenkreuz mit der Maus in einer schnellen Bewegung darauf und
klickt. Trifft man, gibt es Punkte und 2 s Spielzeit dazu; verfehlt man, klickt ins Leere oder ist zu langsam,
kostet das 1 s, und die Trefferserie beginnt von vorn. Je besser man spielt, desto kleiner und kürzer sichtbar
werden die Kreise. Geübt wird die klassische Zielbewegung „Hinschauen – hinbewegen – abbremsen – klicken“.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spiel-Chunk (`19013-…js`, formatiert; nur Mechanik gelesen) samt Hilfsmodulen
(Schwierigkeitskurve, Combo-Faktor, Einstellungen). **[CODE]** = aus dem Code, sonst Regeltext.

- **Eingabe [CODE]:** nur Maus. Nach einem Countdown (3-2-1-GO, 2,45 s) wird der Zeiger per Pointer Lock gesperrt;
  das Fadenkreuz bewegt sich um `movementX/Y` × Empfindlichkeit (Einstellung 0,1–3, Standard 1). `requestPointerLock()`
  wird **ohne** `unadjustedMovement` aufgerufen – die Mausbeschleunigung des Betriebssystems bleibt also wirksam.
  Geräte mit Touch ohne feinen Zeiger (`pointer: fine`) werden mit „Mouse Required for Pointer Lock“ abgewiesen;
  Verlassen des Pointer Lock oder des Vollbilds bricht die Runde ab.
- **Reiz [CODE]:** ein Kreis (#10b981, smaragdgrün) auf #050508 mit Raster (3 % Weiß, 40 px), Zeitring zeigt die
  verbleibende Sichtbarkeit; Piepton (580–780 Hz) beim Erscheinen. Ort gleichverteilt im Spielfeld (Rand ≥ 40 px),
  **unabhängig von der Fadenkreuzposition** – die Distanz schwankt daher von fast 0 bis zur Bildschirmdiagonale.
  Spielfeld = Containergröße in CSS-Pixeln (im Vollbild der ganze Bildschirm).
- **Schwierigkeit [CODE]:** Level = Punkte/1.800 + 1, stufenlos und ohne Obergrenze. Alle Parameter folgen einer
  gemeinsamen Exponentialkurve (Level 15 = 76 % des Weges vom Start- zum Endwert [ER]):

  | Level | Radius | + Trefferzone | Sichtbar | Pause davor | Ø Treffer­zone bei 60 cm* |
  |---|---|---|---|---|---|
  | 1 | 32 px | 12 px | 1.300 ms | 480–680 ms | 2,3° |
  | 5 | 27 px | 10 px | 1.055 ms | 390–550 ms | 1,9° |
  | 10 | 19 px | 6 px | 680 ms | 245–350 ms | 1,3° |
  | 15 | 13 px | 3 px | 380 ms | 130–190 ms | 0,85° |
  | 20 | 10 px | 1,6 px | 234 ms | 75–110 ms | 0,6° |

  *24-Zoll-Monitor (53 cm breit, 1.920 px), 60 cm Abstand, Pixelverhältnis 1 [ER]. „Heat“: Mit wachsender Combo
  (bis 50) werden Radius ×0,7, Trefferzone ×0,33, Sichtbarkeit ×0,68 und Pause ×0,69–0,74 – auf Level 15 z. B. 9 px und
  260 ms [ER]. Minimalradius 4 px.
- **Punkte [CODE]:** 100 × Combo-Faktor (1,0; ab 3 Treffern 1,1; 5: 1,25; 7: 1,35; 10: 1,5; 15: 1,75; 20: 2; 30: 2,5;
  50: 3) × Levelfaktor (1 + 0,5 × (Level−1)/14, auf Level 15 = 1,5).
- **Zeit [CODE]:** Start 45 s; Treffer +2 s (Zeitkonto höchstens 60 s); Fehlklick, Leerklick (kein Ziel sichtbar)
  und Zeitüberschreitung je **−1 s** plus Combo-Reset. Wer schneller trifft als alle 2 s, verlängert die Runde; sie
  endet erst, wenn das Zeitlimit die eigene Erfassungszeit unterschreitet. Zeitüberschreitungen lassen sich in den
  Einstellungen abschalten (Standard: an). Zeitrechnung mit Zeitdifferenz je Bild (dt, max. 0,1 s) bzw.
  `performance.now()` → nicht bildfrequenzabhängig; nur Partikel und Bildschütteln laufen pro Bild.
- **Fehler-Rückmeldung [CODE]:** Bildschütteln (6 px, abklingend), Fehlerton und ein roter, radial verlaufender
  Vollflächen-Schimmer (50 % Deckkraft in der Mitte, ≈ 0,45 s; gemeinsames Einstellungsmodul „Miss Flash“ der Vorlage,
  Standard an, abschaltbar – wie bei 502 und 506). Bei schnellen Fehlklicks können mehrere pro Sekunde folgen. Der
  Schimmer kommt nur bei Fehlern, nicht periodisch → `flimmern_lichtreize` 1; das Bildschütteln ist eine kleine,
  kurze Bewegung des ganzen Bildes → `bewegungsreize_schwindel` 1 (gleiche Einstufung wie 502, 506, 509, 702, 704).
- **Auswertung [CODE]:** Präzision, Treffer, Fehlklicks, Leerklicks, Zeitüberschreitungen, mittlere Flick-Zeit
  (Mittelwert, nicht Median), maximale Combo, Level; Note S+ bis F nach 100 × √(Punkte/50.000) (S+ ab ≈ 45.000 Punkten)
  – eine willkürliche Skala ohne Normdaten. Bestwerte nur im Browser gespeichert.
- **Widersprüche Regeltext ↔ Code:** Regelkarte „−0,8 s“ – Code −1 s (Strafe ist fest aktiviert). FAQ „alle
  1.400 Punkte ein Level“ – Regelkarte und Code 1.800. „Raw, unaccelerated mouse input“ – nicht zutreffend (s. o.).
  Anleitung „Blick auf das zentrale Fadenkreuz“ und „jeder Flick startet aus neutraler Position“ – das Fadenkreuz
  steht nur zu Beginn in der Mitte, danach startet jede Bewegung dort, wo das letzte Ziel war.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite verspricht Training von „Macro Flicking“, „Stopping Deceleration“, „Muscle Memory“ und
Erstschuss-Präzision für CS2, Valorant, Apex und Overwatch 2, beruft sich auf Fitts (1954), das Zwei-Phasen-Modell
(Elliott et al., 2010), die Impuls-Variabilitäts-Theorie (Schmidt et al., 1979) und Woods et al. (2015) und zeigt eine
„Benchmark“-Tabelle (Sakkade 180–220 ms, Hauptbewegung 120–180 ms, Abbremsen 60–120 ms, gesamt 360–520 ms,
„Elite/Tier-1-Profi 240–320 ms“), eDPI-Empfehlungen je Spiel und Tagesdauer „15–20 min optimal“.

**Einordnung:**
- **Belegt:** Zielbewegungen folgen dem Fitts'schen Gesetz und bestehen aus Primärbewegung plus Korrektur (Fitts,
  1954; Elliott et al., 2001, 2010); die Augen springen vor der Hand zum Ziel (Prablanc et al., 1979). Sakkaden-
  latenzen von 180–250 ms sind realistisch (Darrien et al., 2001) – aber nicht aus der zitierten Quelle Woods et al.
  (2015), die einfache Tastenreaktionen misst.
- **Verzerrt:** Elliott et al. (2010) betonen gerade die **frühe Online-Kontrolle** statt eines „blinden“ ballistischen
  Impulses; „80–90 %“ bzw. „85 % der Strecke im ersten Impuls“ stehen dort nicht. Primärbewegungen **unterschießen**
  eher leicht, die Spitzengeschwindigkeit liegt bei ≈ 50 % der Strecke (Helsen et al., 1998). Dass die Übung
  „reziproke Innervation konditioniert“ und Übersteuern „systematisch eliminiert“, folgt nicht aus Schmidt et al. (1979).
- **Ohne Datengrundlage:** die gesamte Benchmark-/Elite-Tabelle, „höhere Win-Rates“, eDPI-Bereiche (eine Studie fand
  einen breiten optimalen Bereich von 20–80 cm/360°; Boudaoud et al., 2022), „15–20 min optimal“ (Aim-Lab-Daten: größte
  Tagesgewinne um 1 h, 90 % davon mit 30 min; Listman et al., 2021). „144/240 Hz lassen Ziele bis 15 ms früher sehen“:
  Bildintervall sinkt von 16,7 auf 4,2 ms [ER]; bei gleicher Latenz wirkt die Bildrate über 60 Hz kaum, die Latenz
  dagegen deutlich (Spjut et al., 2019). „Motorkortex wandelt …“ bei der Flick-Zeit ist Ausschmückung.
- **Messhinweis:** Die Flick-Zeit enthält Reaktionszeit, Bewegung, Klick und die Latenz von Maus, Browser und
  Monitor (reale Systeme 23–243 ms; Ivkovic et al., 2015) – nur zum Selbstvergleich auf demselben Gerät geeignet.

## 4. Optische und okulomotorische Grundlagen

- **Zielgröße:** Level 1 Ø ≈ 1,7° (Trefferzone 2,3°), Level 15 Ø ≈ 0,7° (0,85°), mit voller Combo ≈ 0,5° [ER, 24″/60 cm].
  Das ist weit über der Auflösungsgrenze (Visus 1,0 ≈ 1′ = 0,017°) – Sehschärfe begrenzt kaum, die Zielbewegung schon.
  Bei niedrigem Visus oder unkorrigierter Alterssichtigkeit (Akkommodationsbedarf bei 60 cm ≈ 1,7 dpt [ER]; zur Alterssichtigkeit Charman, 2008) wird das
  Anpeilen des Zentrums der kleinen Kreise unsicherer.
- **Sehfeld:** Im Vollbild reichen die Zielorte bis ≈ ±23° horizontal und ±13° vertikal (24″/60 cm, 40-px-Rand) [ER]. Plötzlich erscheinende
  Reize ziehen Aufmerksamkeit auf sich (Yantis & Jonides, 1984) und lösen eine Sakkade aus; der Piepton kündigt das
  Ziel zusätzlich an. Bei Gesichtsfeldausfällen dürften Ziele im betroffenen Bereich später oder gar nicht bemerkt werden (Plausibilitätsannahme, für diese Übung nicht untersucht).
- **Blick–Hand-Kopplung:** Sakkade zuerst (Latenz typ. 180–250 ms; Darrien et al., 2001), die Hand startet ≈ 100 ms
  später (Prablanc et al., 1979); die Primärsakkade endet etwa bei maximaler Handbeschleunigung (Helsen et al., 1998),
  der Blick bleibt bis zum Abbremsen am Ziel „verankert“ (Neggers & Bekkering, 2000). Ab 60–79 Jahren sind Sakkaden
  langsamer und variabler (Munoz et al., 1998).
- **Brille:** Mit Gleitsicht ist der scharfe Zwischenbereich bei 60 cm nur 13–18° breit (Einstärkenglas 60°; Han et al.,
  2003) – Ziele am Rand liegen außerhalb, man muss den Kopf drehen (Hutchings et al., 2007), was Zeit kostet und das
  Ergebnis verfälscht. Günstiger: Bildschirm-/Arbeitsplatzbrille oder kleineres Fenster statt Vollbild.
- **Trockenes Auge:** Bei schnellen Spielen sinkt der Lidschlag auf ≈ ⅓ des Ruhewerts, der Tränenfilm wird instabiler
  (Cardona et al., 2011); lange Runden (Zeitkonto!) begünstigen Brennen und Ermüdung (Sheppard & Wolffsohn, 2018).
- **Farbe/Kontrast:** ein einziger, heller Zieltyp auf fast schwarzem Grund – Farbsehschwäche (≈ 8 % der Männer) ist
  unerheblich; das rote Fehlersignal ist redundant zu Ton und Schütteln.
- **Stereosehen:** 2D-Bildschirm, keine Tiefe → 0.

## 5. Neurowissenschaftliche Grundlagen

Das Auftauchen des Ziels wird als abrupter Reiz bevorzugt verarbeitet (Yantis & Jonides, 1984); Sakkaden werden
über das Netzwerk aus frontalem Augenfeld, Colliculus superior und Hirnstamm gesteuert (Leigh & Zee, 2015). Blick-
und Handbefehl werden weitgehend **parallel** geplant (kaum korrelierte Latenzen; Prablanc et al., 1979). Während der
Bewegung vergleicht das Gehirn erwartete und tatsächliche Rückmeldung (Vorwärtsmodell; Wolpert et al., 1995; Shadmehr
et al., 2010) und korrigiert schon früh online (Elliott et al., 2010). Das Rauschen der Steuersignale wächst mit ihrer
Größe – daher werden schnelle, weite Bewegungen ungenauer (Harris & Wolpert, 1998; Schmidt et al., 1979). Belege,
dass diese Übung bestimmte Hirnregionen „trainiert“, gibt es nicht.

## 6. Motorische Grundlagen

- **Fitts'sches Gesetz:** Bewegungszeit ≈ a + b × ID mit ID = log₂(D/W + 1) (Soukoreff & MacKenzie, 2004). Beispiel
  [ER]: 400 px Distanz, Trefferzone Ø 88 px (Level 1) → 2,5 bit; Ø 32 px (Level 15) → 3,8 bit. Weil der Zielort zufällig
  ist, schwankt der ID je Ziel stark – die mittlere Flick-Zeit ist dadurch verrauscht.
- **Zeitlimit = aufgezwungener Speed-Accuracy-Trade-off:** Wird die Bewegungszeit von außen verkürzt, steigt die
  Fehlerrate vorhersagbar, und zwar stärker durch kleine Ziele als durch große Distanzen (Wobbrock et al., 2008).
  Zum Vergleich: In einer Aim-Trainer-Aufgabe ohne Zeitlimit brauchten Mausnutzer:innen am Ende von 20 Runden im Mittel
  614 ms vom Erscheinen bis zum Treffer (Warburton et al., 2023). Sichtbarkeiten ≤ 380 ms (Level 15) liegen deutlich darunter – ab dort bestimmen Zeitüberschreitungen den Spielverlauf.
- **Phasen:** Reaktionszeit, Primärbewegung, Korrektur, Klick-Verweilzeit; über 20 Übungsrunden sanken v. a.
  Korrekturzeit (−134 ms), Klick-Verweilzeit (−72 ms) und Reaktionszeit (−70 ms), die Primärbewegung kaum (−14 ms)
  (Warburton et al., 2023). Bei Aim-Lab-Profis beschreibt Fitts'
  Gesetz die Leistung nur unvollständig (Donovan et al., 2022).
- **Eingabe:** Maus-Durchsatz 3,7–4,9 bit/s (Soukoreff & MacKenzie, 2004). Empfindlichkeit und OS-Beschleunigung
  verändern die Übersetzung Hand → Fadenkreuz; ein breiter Bereich ist gleich gut (Boudaoud et al., 2022). Touch: Tippen
  schneller als Maus, aber ungenauer (Cockburn et al., 2012); Ziele ≥ ≈ 9 mm (Parhi et al., 2006).
- **Tremor/Alter:** physiologischer Handtremor (nur bei einer Minderheit Gesunder ein klarer tremorgekoppelter EMG-Gipfel,
  bei Jüngeren 9–12 Hz, bei einzelnen Älteren 5–7 Hz; Elble, 2003) kann das Anhalten auf kleinen Zielen stören [Plausibilitätsannahme]; Ältere skalieren Tempo und Primärbewegung weniger an Distanz und Zielgröße an (Ketcham et al., 2002).
- **Belastung:** schnelle, wiederholte Hand-/Handgelenkbewegungen; in einer Befragung von 65 College-Esportler:innen
  (3–10 h Spielzeit pro Tag) berichteten 36 % Handgelenk- und 32 % Handschmerzen (DiFrancisco-Donoghue et al., 2019) –
  bei wenigen Minuten Übung nicht übertragbar, aber ein Hinweis auf die Belastungsart. Eine 45–60-s-Runde ist
  körperlich kaum anstrengend → `koerperliche_belastung` 0 (wie 502, 702, 704); nur 506 (weite Armzüge quer über den
  Bildschirm) und 504 (gehaltene Taste, Dauerzug) sind in dieser Gruppe mit 1 eingestuft.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Systemlatenz, Bildrate, Mausabfrage (125 Hz = bis 8 ms), OS-Beschleunigung und Empfindlichkeit
  verändern die Flick-Zeit; in FPS-Studien verschlechterte schon lokale Latenz ab ≈ 41 ms die Zielleistung (Ivkovic et al.,
  2015), und selbst kleine Latenzsenkungen unter 125 ms verbesserten Genauigkeit und Punkte (Liu et al., 2021). Geräte-
  unterschiede können daher Lernfortschritte überdecken [Plausibilitätsannahme].
- **Bildschirmgröße/Abstand:** Radien in CSS-Pixeln → auf Laptop und 32-Zoll-Monitor andere Sehwinkel und Distanzen;
  Werte sind geräteübergreifend nicht vergleichbar.
- **Aufgabenzufall:** zufällige Distanz (0 bis Bildschirmdiagonale) und Mittelwert statt Median → Einzelrunden streuen.
- **Adaptives Ende:** Punkte, Level und Rundendauer hängen voneinander ab (Zeitkonto); die Note S+–F ist willkürlich.
- **Zustand:** Müdigkeit, Schlafmangel, Aufwärmen; große Übungseffekte in digitalen Sehtrainings zeigen sich vor allem,
  wenn Trainings- und Testaufgabe gleich sind (Guo et al., 2025) – ein Teil früher Verbesserungen ist Gewöhnung an
  Aufgabe und Gerät.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – stark (für ähnliche Aufgaben):** In einem Aim-Trainer wurden 7.174 Personen über bis zu 100 Tage
  besser, v. a. in Treffern pro Sekunde, weniger in der Trefferquote (Listman et al., 2021; von Aim-Lab-Hersteller
  mitfinanziert); Laborstudie (N = 86): über 20 Runden deutlich kürzere Reaktions-, Korrektur- und Klickzeiten, kaum kürzere
  Primärbewegung (Warburton et al., 2023).
- **Naher Transfer – schwach:** Gelernte Skalierung (Gain) überträgt sich auf neue Distanzen (Krakauer et al., 2000);
  ein kontrollierter Nachweis „Aim-Trainer → bessere Spielleistung“ wurde nicht gefunden.
- **Alltagstransfer – fehlend:** Metaanalysen zu Action-Videospielen betreffen ganze Spiele und kognitive Maße;
  motorische Maße wurden mangels Studien ausgeschlossen (Bediou et al., 2023). Für Seh-, Fahr- oder Berufsleistung
  gibt es keinen Beleg.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** schnelle, genaue Einzel-Zielbewegungen mit der Maus unter Zeitdruck geübt werden sollen; die
  Person Maus-Routine hat (Gamer:innen, Büroarbeit) und Spaß an Punkten, Serien und Tempo hat.
- **Weniger passend, wenn …** nur ein Tablet vorhanden ist; Einsteiger:innen oder Ältere ohne Maus-Routine (Zeitlimit
  überfordert rasch); Ziel ist Blickfolge (→ 404, 105), Suche (→ 103) oder Gedächtnis.
- **Vorsicht / anpassen bei …** `hand_arm_beschwerden`, `tremor_parkinson` (schnelle Züge, kleine Ziele bis 13 px);
  `presbyopie_gleitsicht` (Randziele außerhalb des Zwischenbereichs → Bildschirmbrille, Fenstermodus);
  `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie` (Lidschlag ↓, Runden verlängern sich); `sehbehinderung_niedriger_visus`,
  `gesichtsfeldausfall` (kleine, kurz sichtbare Ziele im ganzen Feld); `photosensitive_epilepsie`,
  `migraene_lichtempfindlich` (roter Vollflächen-Schimmer und Schütteln bei jedem Fehler, bei Dauerklicken mehrmals
  pro Sekunde; Grenze ≤ 3 Blitze/s nach WCAG, Rot als Risikofaktor nach Fisher et al., 2005); `aufmerksamkeitsprobleme`, `kognitive_einschraenkung`
  (hoher Zeitdruck, Strafen). Hinweise dienen der Auswahl, nicht der Diagnose.
- **Kombiniert gut mit …** 303 (Blicksprünge ohne Hand), 301/101 (reine Reaktion), 704 (schrumpfende ruhende Ziele,
  Zentrumstreffer), 702 (bewegte Ziele anklicken), 502 (Zielwechsel zwischen mehreren Zielen), 509 (Feinkorrektur).
- **Nahe Dublette: 506.** Gleicher Spielaufbau (gleiche Zielgrößen, Sichtbarkeiten, Punkte, Zeitkonto und Strafen); bei
  506 liegen die Ziele mit steigendem Level fast immer am linken oder rechten Rand, die Wege und Blicksprünge sind also
  größer. Für dasselbe Übungsziel nur eine der beiden vorschlagen – 506 höchstens als Steigerung. Unterschied zu 502:
  dort mehrere gleichzeitig sichtbare, bewegte Ziele (mehr Übersicht und Reihenfolgewahl).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Tablet:** Original auf Touch blockiert. Eine Touch-Version ist leicht möglich (Tipp-Zielen nach Fitts), verliert aber
  den Kern „Flick mit Empfindlichkeit“ – ehrlich als „Tipp-Ziele“ benennen; Ziele ≥ 9 mm, Mindestsichtbarkeit so wählen,
  dass die Touch-Latenz (bei kommerziellen Geräten 50–200 ms laut Deber et al., 2015) nicht bestraft wird. Ältere waren am Touchscreen um 35 % schneller als
  mit der Maus (Findlater et al., 2013).
- **Messqualität:** Median und Streuung, Flick-Zeit getrennt nach Distanz/Zielgröße bzw. Durchsatz (bit/s), Start
  jeweils aus der Mitte (vergleichbare Distanzen), `event.timeStamp` statt Zeitpunkt im Handler, keine Normnoten.
- **Adaptivität:** Treppenverfahren auf ≈ 80 % Treffer (wie `zielfang`) statt punktgekoppelter Kurve und Combo-Heat,
  die Fehler verstärkt bestraft; feste Sitzungsdauer statt Zeitkonto.
- **Sicherheit:** kein roter Vollflächen-Blitz und kein Bildschütteln (dezentes Symbol/Ton), Pausenhinweis und
  Blinzel-Erinnerung; Option „Spielfeld verkleinern“ für Gleitsicht.
- **Ehrliche Texte:** keine Benchmark-/Elite-Tabellen, keine Spiel- oder Alltagsversprechen, Maus-Beschleunigung
  korrekt beschreiben.

## 11. Quellen

### Von der Website angegeben

- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple
  reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI
  stimmt ✓; **stützt die Aussage der Website:** nein (misst Tastenreaktionen, 231 ms; keine Sakkaden, keine Maus- oder
  FPS-Normen – die Benchmark-Tabelle ist damit nicht belegt).
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming:
  Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 –
  **Prüfung:** DOI, Titel, Jahr stimmen ✓, **Autoren falsch** (Website: „Elliott, Helsen & Chua“ – das sind die Autoren
  von Elliott et al., 2001); **stützt:** teilweise (zwei Komponenten ja, aber mit früher Online-Kontrolle; 80–90 % und
  ms-Werte stehen nicht darin).
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement.
  *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓;
  **stützt:** teilweise (Gesetz ja; die Phasenzeiten der Tabelle nein).
- Schmidt, R. A., Zelaznik, H., Hawkins, B., Frank, J. S., & Quinn, J. T. (1979). Motor-output variability: A theory for
  the accuracy of rapid motor acts. *Psychological Review, 86*(5), 415–451. https://doi.org/10.1037/0033-295X.86.5.415 –
  **Prüfung:** DOI stimmt ✓; **stützt:** nein für die Trainingsbehauptung (Theorie zur Streuung schneller Bewegungen,
  nicht zum „Eliminieren“ von Übersteuern).

### Weitere Fachliteratur

- Bediou, B., Rodgers, M. A., Tipton, E., Mayer, R. E., Green, C. S., & Bavelier, D. (2023). Effects of action video game play on cognitive skills: A meta-analysis. *Technology, Mind, and Behavior, 4*(1), 28–48. https://doi.org/10.1037/tmb0000102 – Transfer, motorische Maße ausgeschlossen
- Boudaoud, B., Spjut, J., & Kim, J. (2022). Mouse sensitivity in first-person targeting tasks. In *2022 IEEE Conference on Games (CoG)* (S. 183–190). https://doi.org/10.1109/CoG51982.2022.9893626 – Empfindlichkeit, eDPI
- Cardona, G., García, C., Serés, C., Vilaseca, M., & Gispets, J. (2011). Blink rate, blink amplitude, and tear film integrity during dynamic visual display terminal tasks. *Current Eye Research, 36*(3), 190–197. https://doi.org/10.3109/02713683.2010.544442 – Lidschlag bei schnellen Spielen
- Darrien, J. H., Herd, K., Starling, L.-J., Rosenberg, J. R., & Morrison, J. D. (2001). An analysis of the dependence of saccadic latency on target position and target characteristics in human subjects. *BMC Neuroscience, 2*, 13. https://doi.org/10.1186/1471-2202-2-13 – Sakkadenlatenz
- DiFrancisco-Donoghue, J., Balentine, J., Schmidt, G., & Zwibel, H. (2019). Managing the health of the eSport athlete: An integrated health management model. *BMJ Open Sport & Exercise Medicine, 5*(1), e000467. https://doi.org/10.1136/bmjsem-2018-000467 – Beschwerden bei Esportlern
- Elble, R. J. (2003). Characteristics of physiologic tremor in young and elderly adults. *Clinical Neurophysiology, 114*(4), 624–635. https://doi.org/10.1016/S1388-2457(03)00006-3 – Tremor
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin, 127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – Zwei-Komponenten-Modell (Quelle der Autorenverwechslung)
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of CHI '13* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Touch vs. Maus im Alter
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht-Zwischenbereich
- Harris, C. M., & Wolpert, D. M. (1998). Signal-dependent noise determines motor planning. *Nature, 394*(6695), 780–784. https://doi.org/10.1038/29528 – Speed-Accuracy, Rauschen
- Helsen, W. F., Elliott, D., Starkes, J. L., & Ricker, K. L. (1998). Temporal and spatial coupling of point of gaze and hand movements in aiming. *Journal of Motor Behavior, 30*(3), 249–259. https://doi.org/10.1080/00222899809601340 – Blick–Hand-Kopplung, Unterschießen
- Ivkovic, Z., Stavness, I., Gutwin, C., & Sutcliffe, S. (2015). Quantifying and mitigating the negative effects of local latencies on aiming in 3D shooter games. In *Proceedings of CHI '15* (S. 135–144). ACM. https://doi.org/10.1145/2702123.2702432 – Systemlatenz
- Ketcham, C. J., Seidler, R. D., Van Gemmert, A. W. A., & Stelmach, G. E. (2002). Age-related kinematic differences as influenced by task difficulty, target size, and movement amplitude. *The Journals of Gerontology: Series B, 57*(1), P54–P64. https://doi.org/10.1093/geronb/57.1.P54 – Zielbewegungen im Alter
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the "wild" with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 – Übungseffekt (Aim Lab, N = 7.174)
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blickverankerung
- Prablanc, C., Echallier, J. F., Komilis, E., & Jeannerod, M. (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. *Biological Cybernetics, 35*(2), 113–124. https://doi.org/10.1007/BF00337436 – Auge vor Hand
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts' law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 – Fitts-Formel, Maus-Durchsatz
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – Bildrate vs. Latenz
- Warburton, M., Campagnoli, C., Mon-Williams, M., Mushtaq, F., & Morehead, J. R. (2023). Kinematic markers of skill in first-person shooter video games. *PNAS Nexus, 2*(8), pgad249. https://doi.org/10.1093/pnasnexus/pgad249 – Phasen, Übungseffekt, 614 ms
- Wobbrock, J. O., Cutrell, E., Harada, S., & MacKenzie, I. S. (2008). An error model for pointing based on Fitts' law. In *Proceedings of CHI '08* (S. 1613–1622). ACM. https://doi.org/10.1145/1357054.1357306 – Fehlerrate bei vorgegebener Bewegungszeit (Crossref ✓, Volltext Autorenseite)
- Yantis, S., & Jonides, J. (1984). Abrupt visual onsets and selective attention: Evidence from visual search. *Journal of Experimental Psychology: Human Perception and Performance, 10*(5), 601–621. https://doi.org/10.1037/0096-1523.10.5.601 – abrupt erscheinende Reize
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry, 91*(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Alterssichtigkeit
- Cockburn, A., Ahlström, D., & Gutwin, C. (2012). Understanding performance in touch selections: Tap, drag and radial pointing drag with finger, stylus and mouse. *International Journal of Human-Computer Studies, 70*(3), 218–233. https://doi.org/10.1016/j.ijhcs.2011.11.002 – Touch vs. Maus
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. In *Proceedings of CHI '15* (S. 1827–1836). ACM. https://doi.org/10.1145/2702123.2702300 – Touch-Latenz
- Donovan, I., Saul, M. A., DeSimone, K., Listman, J. B., Mackey, W. E., & Heeger, D. J. (2022). Assessment of human expertise and movement kinematics in first-person shooter games. *Frontiers in Human Neuroscience, 16*, 979293. https://doi.org/10.3389/fnhum.2022.979293 – Fitts' Gesetz bei Profis nur unvollständig
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Lichtreize, Rot als Risikofaktor
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Übungseffekt bei gleicher Aufgabe
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., & Wells, K. A. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Kopfbewegungen mit Gleitsicht
- Krakauer, J. W., Pine, Z. M., Ghilardi, M.-F., & Ghez, C. (2000). Learning of visuomotor transformations for vectorial planning of reaching trajectories. *Journal of Neuroscience, 20*(23), 8916–8924. https://doi.org/10.1523/JNEUROSCI.20-23-08916.2000 – Übertragung gelernter Skalierung
- Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5. Aufl.). Oxford University Press. https://doi.org/10.1093/med/9780199969289.001.0001 – Sakkadensteuerung (Buch)
- Liu, S., Claypool, M., Kuwahara, A., Sherman, J., & Scovell, J. J. (2021). Lower is better? The effects of local latencies on competitive first-person shooter game players. In *Proceedings of CHI '21* (S. 1–12). ACM. https://doi.org/10.1145/3411764.3445245 – Latenz
- Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human subjects on saccadic eye movement tasks. *Experimental Brain Research, 121*(4), 391–400. https://doi.org/10.1007/s002210050473 – Sakkaden im Alter
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of MobileHCI '06* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – Touch-Zielgröße
- Shadmehr, R., Smith, M. A., & Krakauer, J. W. (2010). Error correction, sensory prediction, and adaptation in motor control. *Annual Review of Neuroscience, 33*, 89–108. https://doi.org/10.1146/annurev-neuro-060909-153135 – Vorwärtsmodell
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology, 3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – Bildschirmbeschwerden
- Wolpert, D. M., Ghahramani, Z., & Jordan, M. I. (1995). An internal model for sensorimotor integration. *Science, 269*(5232), 1880–1882. https://doi.org/10.1126/science.7569931 – Vorwärtsmodell
