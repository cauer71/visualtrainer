# Übungskatalog – Beschreibungen für die KI-gestützte Übungsauswahl

Stand: 29.09.2026. Dieser Katalog beschreibt **jede Übung** der Vorlage skilldrills.online (alle 8 Kapitel,
81 Übungen) und die eigenen Blickfit-Übungen einheitlich und maschinenlesbar. Er soll später einer KI
helfen, aus einem Anforderungsprofil (z. B. „Blickfolge üben, wenig Zeitdruck, keine Flimmerreize“)
passende Übungen vorzuschlagen.

> **Wichtig:** Die Beschreibungen sind **Trainings- und Produktinformationen, keine medizinische
> Beratung**. Eine KI-Auswahl anhand dieses Katalogs ersetzt keine augenärztliche oder optometrische
> Untersuchung und darf keine Diagnose stellen oder Heilung versprechen. Die Evidenzangaben sagen, was
> in Studien zu *ähnlichen* Aufgaben gefunden wurde – nicht, dass unsere oder die Original-Übung wirkt.

## Aufbau

- [`uebungen/`](uebungen/) – eine Datei je Übung: `NNN-kennung.md`
  (YAML-Kopf mit festen Feldern + ausführliche Beschreibung mit Quellen)
- [`katalog.json`](katalog.json) – alle YAML-Köpfe als eine JSON-Datei (wird aus den Dateien erzeugt:
  `python3 docs/uebungskatalog/build.py`)
- [`UEBERSICHT.md`](UEBERSICHT.md) – Tabelle aller 85 Übungen (Kern, Tablet-Eignung, Evidenz, Vorsicht)
- [`_vorlage.md`](_vorlage.md) – verbindliche Vorlage für neue Einträge
- [`literatur/`](literatur/) – geprüfte Literaturbasis je Übungsgruppe (Prüftabelle der Website-Quellen,
  Faktenliste mit Zahlen und Quellen, Evidenz-Zusammenfassung, Literaturliste); Grundlage der Einträge

## Nummernschema

Jede Übung hat eine **eindeutige, dauerhafte dreistellige Nummer**. Die Hunderterstelle ist das Kapitel,
die Reihenfolge innerhalb eines Kapitels folgt der Kapitelseite von skilldrills.online (Stand 29.09.2026).
Nummern werden **nie neu vergeben**; entfällt eine Übung, bleibt ihre Nummer frei.

| Nummern | Kapitel (DE) | Kapitel auf skilldrills.online |
|---|---|---|
| 101–109 | Visuelle Wahrnehmung | `visual` |
| 201–208 | Kognition & Aufmerksamkeit | `cognitive` |
| 301–308 | Reaktionsgeschwindigkeit | `reaction-speed` |
| 401–415 | Blickverfolgung | `visual-tracking` |
| 501–515 | Zielen (FPS) | `fps` |
| 601–607 | Gedächtnis | `memory` |
| 701–708 | Motorik | `motor` |
| 801–811 | Körper & Reflexe | `physical` |
| 901–… | Eigene Blickfit-Übungen (901 ohne Vorbild; 902–904 nach Handyvideos einer Reha-/Neuro-Trainingssoftware, keine Website) | – |

Die Blickfit-Übungen, die auf einer Vorlage beruhen, stehen im Feld `blickfit_umsetzung` der jeweiligen
Vorlage (z. B. 101 → Blitzreaktion).

## Das Anforderungsprofil (für die Auswahl)

Jede Übung bewertet dieselben Merkmale auf einer Skala von **0 bis 3**:

| Wert | Bedeutung |
|---|---|
| 0 | nicht gefordert |
| 1 | gering – spielt eine Nebenrolle |
| 2 | mittel – deutlich gefordert |
| 3 | hoch – Kern der Übung, begrenzt die Leistung |

Die Merkmale (feste Schlüssel, nicht umbenennen):

**visuell** (Optik und Blickmotorik)
- `sehschaerfe_detail` – feine Details erkennen (Anforderung an Visus/Schriftgröße)
- `kontrast` – schwache Helligkeitsunterschiede erkennen
- `farbunterscheidung` – Farben müssen unterschieden werden (Problem bei Farbsehschwäche)
- `stereosehen` – echte beidäugige Tiefenwahrnehmung (am Bildschirm fast immer 0)
- `peripheres_sehen` – Reize außerhalb der Blickmitte wahrnehmen
- `nutzbares_sehfeld` – Mitte und Umgebung gleichzeitig erfassen (UFOV)
- `blickfolge` – glatte Augenfolgebewegung (smooth pursuit)
- `sakkaden` – schnelle Blicksprünge
- `fixation` – Blick ruhig halten, Wegschauen unterdrücken
- `bewegungswahrnehmung` – Richtung/Geschwindigkeit von Bewegung erkennen
- `visuelle_suche` – Ziel zwischen Ablenkern finden
- `visuelle_verarbeitungsgeschwindigkeit` – kurz gezeigte Reize erfassen
- `zeitliche_aufloesung` – Takt-, Flimmer- oder Zeitunterschiede wahrnehmen
- `naharbeit_dauer` – anhaltendes Sehen in Nähe/Bildschirmdistanz (Akkommodation, Vergenz)

**kognitiv**
- `daueraufmerksamkeit`, `selektive_aufmerksamkeit`, `inhibition`, `geteilte_aufmerksamkeit`,
  `kognitive_flexibilitaet`, `arbeitsgedaechtnis`, `kurzzeitgedaechtnis_verbal`,
  `kurzzeitgedaechtnis_visuell_raeumlich`, `verarbeitungsgeschwindigkeit`, `antizipation` (Vorhersage
  von Zeitpunkt/Ort), `entscheidung_wahlreaktion`, `lesen_sprache`, `schlussfolgern`

**motorisch**
- `einfache_reaktion` – so schnell wie möglich auf einen Reiz reagieren
- `auge_hand_koordination` – Hand/Zeiger dorthin bringen, wo das Auge hinschaut
- `zielbewegung_tempo` – schnelle Zielbewegungen (Fitts'sches Gesetz, Tempo)
- `zielbewegung_praezision` – genaues Treffen kleiner Ziele
- `kontinuierliche_steuerung` – Zeiger/Objekt fortlaufend einem Ziel nachführen (manuelles Tracking)
- `ruhige_hand` – Zeiger ruhig halten (Tremor, Haltearbeit)
- `fingergeschwindigkeit` – schnelles wiederholtes Tippen/Klicken
- `fingersequenz_bimanual` – Fingerfolgen, beide Hände, Tastenzuordnung
- `ganzkoerper` – Bewegungen des ganzen Körpers
- `gleichgewicht` – Gleichgewicht halten
- `ausdauer_belastung` – körperliche Anstrengung

**belastung** (0–3, für Ausschluss- und Vorsichtsregeln)
- `zeitdruck`, `flimmern_lichtreize` (Photosensitivität), `bewegungsreize_schwindel` (großflächige
  Bewegung, Vektion, Reisekrankheit), `koerperliche_belastung`, `sturzrisiko`, `sprachabhaengigkeit`

## Feste Werte für weitere Felder

- `eingabe`: `maus`, `touch`, `tastatur`, `touchpad`, `gamepad`, `kamera`, `koerper_ohne_geraet`
- `tablet_geeignet`: `ja`, `mit_anpassung`, `nein`
- Evidenzskala (`evidenz.*`): `stark`, `mittel`, `schwach`, `fehlend`, `unklar`
  - `uebungseffekt` – wird man in der geübten Aufgabe besser?
  - `naher_transfer` – verbessern sich ähnliche, nicht geübte Aufgaben?
  - `alltag_transfer` – ist ein Nutzen im Alltag (Verkehr, Sport, Beruf, Lesen) belegt?
- `vorsicht_bei` (Schlüssel): `photosensitive_epilepsie`, `migraene_lichtempfindlich`,
  `schwindel_vestibulaer`, `reisekrankheit`, `nystagmus`, `schielen_binokular`, `amblyopie`,
  `gesichtsfeldausfall`, `sehbehinderung_niedriger_visus`, `farbsehschwaeche`, `presbyopie_gleitsicht`,
  `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`, `tremor_parkinson`, `hand_arm_beschwerden`,
  `sturzgefahr`, `herz_kreislauf`, `gelenk_ruecken`, `kognitive_einschraenkung`, `kinder_unter_6`,
  `lese_rechtschreib_schwaeche`, `aufmerksamkeitsprobleme`
  (Vorsicht bedeutet: Übung eventuell nicht geeignet oder anpassen – keine medizinische Aussage.)

## Quellen

Jede Beschreibung nennt (a) die Quellen, die die Website selbst angibt – **mit Prüfvermerk**, ob die
Angabe stimmt und die Aussage der Website stützt – und (b) zusätzliche Fachliteratur. Jede DOI wurde über
Crossref/PubMed geprüft; nicht prüfbare Angaben sind als solche markiert.
