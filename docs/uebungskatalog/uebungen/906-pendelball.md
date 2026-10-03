---
# ===== Kennung =====
nr: 906
kennung: pendelball
name: "Pendelball (pendelnder Ball mit Buchstaben, Bahnfolge in einer Sitzung)"
name_original: "– (eigene Blickfit-Übung, Praxisform der funktionellen Optometrie ohne Titel)"
kapitel: "Eigene Blickfit-Übungen"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "pendelball", name: "Pendelball", unterschiede: "Eigene Umsetzung als Touch-Übung ohne Wirkversprechen: Die Kugel pendelt gleichmäßig nach der Uhr (Sinus bzw. gleichmäßige Drehung) in sechs festen Bahnformen hintereinander; auf der Kugel erscheint weich ein Buchstabe, den man aus vier großen Buttons wählt. 25 Stufen, je Schritt genau ein Parameter (Tempo, Weite, Buchstabengröße, Anzeigedauer, Buchstabenmenge, Bahnfolge, Kugelgröße); Anpassung nach jeder Bahn. Gemessen wird nur, ob der Buchstabe erkannt wird – nicht der Blick und nicht die Kopfhaltung."}
stand: 2026-10-03

# ===== Überblick =====
kurzbeschreibung: "Eine Kugel pendelt nacheinander waagrecht, senkrecht, schräg (zwei Richtungen) und im Kreis (rechtsherum, linksherum). Man folgt ihr bei möglichst ruhigem Kopf nur mit den Augen und erkennt einen Buchstaben, der kurz weich auf ihr erscheint; man tippt ihn unter vier großen Buttons an. Zwischen den Bahnen gibt es eine ruhige Pause. Gemessen wird nur, ob der Buchstabe erkannt wird – nicht der Blick."
ziel_funktionen: [blickfolge, bewegungswahrnehmung, antizipation]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 120
schwierigkeit_anpassung: "25 Stufen (maßgeblich ist die Stufentabelle im Kopf von src/exercises/pendelball/logic.ts); jeder Schritt ändert genau einen Parameter: Periode des Pendelns (4,0 → 2,2 s), halbe Bahnweite (20 → 30 % der Bühnenbreite, also die Bahn höchstens 60 % breit), Buchstabenhöhe (7,0 → 2,8 u, 1 u = 1 % der kürzeren Seite, nie unter 18 px), Anzeigedauer inklusive Ein- und Ausblenden (1100 → 600 ms), Buchstabenmenge (sehr verschieden → teils ähnlich → ähnlich, z. B. B D P R), Bahnfolge (fest → gemischt ab Stufe 12) und Kugelgröße (Radius 0,95 → 0,80 der Buchstabenhöhe). Die Spitzengeschwindigkeit der Kugel bleibt auf jeder Stufe und Bühne bei höchstens etwa 24°/s (bei 40 cm Abstand). Anpassung nach jeder Bahn (je etwa 3 Buchstaben): ≥ 85 % richtig → eine Stufe schwerer (bis zur ersten Umkehr zwei Stufen), < 65 % → eine Stufe leichter, dazwischen gleich. Startstufe = eine Stufe unter der erreichten Stufe der letzten Sitzung."
messgroessen: ["Hauptwert: erreichte Stufe (höchste Stufe, auf der eine Bahn zu mindestens 65 % richtig war)", "Treffer je Bahnform (Tabelle: richtig von gezeigt)", "Treffsicherheit in Prozent", "Ø Antwortzeit vom Erscheinen des Buchstabens bis zum Tippen (nur richtige Antworten; nur Vergleich mit sich selbst)", "Fehler und Auslassungen (Antwortfrist 2,5 s nach Ende der Anzeige)", "keine Messung von Blick, Augenbewegung oder Kopfhaltung; keine Normwerte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 2
    kontrast: 1
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 3
    sakkaden: 0
    fixation: 1
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 1
    inhibition: 0
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 2
    entscheidung_wahlreaktion: 2
    lesen_sprache: 1
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
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
  zeitdruck: 1
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Tablet auf einem Ständer, ruhig und mittig vor der Person (Abstand etwa 40 cm, immer gleich); Kopf möglichst ruhig, nur die Augen folgen", "Großbuchstaben von etwa 0,6° bis etwa 1,6° Höhe (etwa 22–57 px am Tablet in 40 cm) auch auf der bewegten Kugel erkennen können; die Buchstaben werden mit der Stufe kleiner und ähnlicher", "Buchstaben des lateinischen Alphabets kennen", "Mit dem Finger Felder von mindestens etwa 72 px treffen können (vier große Buttons unten)", "Brille bzw. Nahbrille so wie im Alltag verwenden und notieren"]
vorsicht_bei: [nystagmus, schielen_binokular, amblyopie, sehbehinderung_niedriger_visus, presbyopie_gleitsicht, kopfschmerz_asthenopie, schwindel_vestibulaer, kinder_unter_6, lese_rechtschreib_schwaeche]
geeignet_fuer: ["Einer gleichmäßig bewegten Kugel bei ruhigem Kopf in festen Bahnformen folgen und dabei ein kurz gezeigtes Zeichen erkennen, mit schrittweiser Steigerung jeweils nur eines Merkmals", "Sechs Bahnformen nacheinander üben (waagrecht, senkrecht, zwei Schräge, zwei Kreise) und in der Ergebnistabelle sehen, bei welcher Bahn das Erkennen leichter oder schwerer fällt", "Vergleich mit sich selbst: erreichte Stufe, Treffer je Bahn und Antwortzeit über mehrere Sitzungen auf demselben Gerät", "Vorführung der Übung in Geschäft und Beratung – ohne Wirkanspruch und ohne Diagnose"]
weniger_geeignet_fuer: ["Messung oder Beurteilung der Augenfolgebewegung: die App misst den Blick nicht, das Zeichen lässt sich auch mit einzelnen Blicksprüngen erkennen", "Kontrolle der Kopfhaltung: sie wird nicht erfasst", "Ersatz für die klinische Prüfung der Augenbewegungen durch eine Fachperson", "Diagnose, Normvergleich, Therapie oder Reha (nicht vorgesehen, nicht möglich)", "Menschen mit Nystagmus, Schielen oder Doppelbildern, wenn aus dem Ergebnis auf das Auge geschlossen werden soll"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: unklar
  alltag_transfer: fehlend
  kommentar: "Für die Pendelball-Form mit Buchstaben bei ruhigem Kopf gibt es nach einer Literaturrecherche keine Studie; sie ist eine Praxisform der funktionellen Optometrie und nicht durch Studien belegt. Für verwandte Aufgaben (Folgebewegung vorhersagbarer Bahnen) zeigen kleine Laborstudien mit Blickmessung Übungseffekte, die einige Tage anhielten (Eibenberger et al. 2012); Erkennen von Zeichen auf bewegten Zielen ist als dynamische Sehschärfe untersucht (Ludvigh & Miller 1958; Brown 1972). Übungen zur Blickfolge gelten bei Lernschwierigkeiten als nicht wirksam (Handler et al. 2011). Bei trainingsähnlicher Aufgabe werden Effekte überschätzt; ein Alltagsnutzen ist nicht belegt."
aehnliche_uebungen: [402, 403, 404, 905]
stichworte: ["hängender Ball mit Buchstaben", "Pendelball", "Blickfolge", "glatte Folgebewegung", "dynamische Sehschärfe", "Bahnfolge", "Kopf ruhig", "funktionelle Optometrie", "kein Eye-Tracking", "Praxisform nicht belegt"]
---

# 906 · Pendelball (pendelnder Ball mit Buchstaben, Bahnfolge in einer Sitzung)

> Original: – (eigene Blickfit-Übung, Praxisform der funktionellen Optometrie) · Blickfit: „Pendelball“ (`src/exercises/pendelball/`, Kategorie Bewegung)

## 1. Kurzbeschreibung

Ein Ball, der an einer Schnur hängt und in festen Bahnen schwingt, ist eine Praxisform der funktionellen Optometrie: Man folgt ihm bei ruhigem Kopf nur mit den Augen und liest dabei einen Buchstaben auf ihm. Die Blickfit-Übung setzt das mit einer Kugel auf dem Bildschirm um. Neu gegenüber den Einzelbahn-Übungen ist die **Bahnfolge in einer Sitzung**: waagrecht, senkrecht, schräg von links unten nach rechts oben, schräg von links oben nach rechts unten, Kreis im Uhrzeigersinn, Kreis gegen den Uhrzeigersinn. Jede Bahn dauert etwa 12 bis 15 Sekunden; dazwischen bleibt die Kugel in einer kurzen, ruhigen Pause in der Mitte, und der Name der nächsten Bahn steht als Text da. Das Pendeln ist eine gleichmäßige Sinusbewegung, bei den Kreisen eine gleichmäßige Drehung. Auf der Kugel erscheint weich ein Buchstabe, den man aus vier großen Buttons unten wählt; die Stufen werden an die Treffer angepasst. Gemessen wird nur, ob der Buchstabe erkannt wird – nicht der Blick und nicht die Kopfhaltung.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts` und `logic.ts` in `src/exercises/pendelball/` (Stand 03.10.2026). Es gibt kein Vorbild als Programm; dieser Abschnitt beschreibt die Umsetzung.

- **Sitzung:** 6 Bahnen in fester Reihenfolge (auf Stufen 1–11) oder gemischt (ab Stufe 12; Zufall nur über `ctx.rng`; jede Bahn einmal, nie dieselbe zweimal hintereinander). Vor der ersten Bahn 2,0 s Ruhe, zwischen den Bahnen 2,2 s Ruhe mit ruhender Kugel in der Mitte, Name der nächsten Bahn und kleinem Bahnbild. Gesamtdauer etwa 100 s. Schnellmodus (`?quick=1`): 3 Bahnen mit je 1 Buchstaben (etwa 17 s). Intro-Film: 2 Bahnen (waagrecht, senkrecht) mit je 1 Buchstaben, Geisterhand tippt, etwa 10,6 s.
- **Block:** Die Auslenkung wächst in 1,5 s weich von 0 auf die volle Weite (glatte Hüllkurve) und fällt am Ende in 1,5 s wieder auf 0, damit die Kugel in der Pause in der Mitte steht und die Geschwindigkeit nie springt. Ein Block endet, wenn 3 Buchstaben beantwortet sind und mindestens 12 s vergangen sind (höchstens 20 s). Die Bewegung ist eine geschlossene Formel der Zeit (kein Frame-Zähler): Gerade x(s) = A · sin(2π s/T) in Richtung der Geraden, Kreis (A cos θ, A sin θ) mit θ = ± 2π s/T.
- **Stufen (25, je Schritt genau ein Parameter; Tabelle im Kopf von `logic.ts`, per Test geprüft):** Periode T 4,0 → 3,7 → 3,4 → 3,1 → 2,8 → 2,5 → 2,2 s; halbe Bahnweite 20 → 24 → 27 → 30 % der Bühnenbreite; Buchstabenhöhe 7,0 → 6,0 → 5,0 → 4,0 → 3,2 → 2,8 u; Anzeigedauer 1100 → 1000 → 900 → 800 → 700 → 600 ms; Buchstabenmenge 0 → 1 → 2; Bahnfolge fest → gemischt (Stufe 12); Kugelradius 0,95 → 0,88 → 0,80 der Buchstabenhöhe. Randbedingung: Anzeigedauer ≤ Periode/3 − 120 ms auf jeder Stufe.
- **Weite und Tempo:** Die Auslenkung ist auf 60 % der Bühnenbreite für die ganze Bahn, auf die Höhe des Feldes (über der Antwortleiste) und auf eine Spitzengeschwindigkeit von 24°/s begrenzt (1 u ≈ 0,23° bei 40 cm, abgeleitet von 36 px/° am iPad 11″). Test: Spitzentempo ≤ 25°/s auf allen Stufen und drei Bühnen (1180×820, 820×1180, 390×844), einschließlich Ein- und Ausschwingen.
- **Buchstabe:** Großbuchstabe in dunkler Schrift auf der hellen Kugel, Höhe 7,0 u → 2,8 u, nie unter 18 px (≈ 0,35° bei höchstens 51 px/°); für die Größen wird u nach unten auf 6,5 px begrenzt (Handy). Weich ein- und ausgeblendet (je 160 ms, sinusförmig). Er erscheint nur im geraden, gleichmäßigen Teil eines Schlags (Tempo ≥ 50 % des Höchsttempos, ± 60° um den Mitteldurchgang, mittig um den Durchgang geplant), nie in der Umkehr; bei den Kreisen nie in den ersten 2 s nach Bahnwechsel; bei Geraden erst nach dem Einschwingen.
- **Antwort:** 4 große Buttons unten (Breite ≥ 72 px, Höhe ≥ 68 px), je ein Buchstabe; 1 richtig, 3 Ablenker, Platz der richtigen Antwort zufällig. Menge 0: sechs verschiedene Großbuchstaben (A H L O T X); Menge 1: zwei Ablenker aus derselben Gruppe, einer aus einer anderen; Menge 2: alle vier aus einer Gruppe (B D P R · E F L T · C G O Q). Antwortfrist 2,5 s nach Ende der Anzeige, danach Auslassung (zählt als nicht richtig). Antworten sind auch während der Anzeige möglich; nur die erste Antwort je Buchstabe zählt; Ziffern 1–4 wählen per Tastatur.
- **Rückmeldung:** weich (`_shared/weiche-marken`): ✓ am gewählten Button, bei einem Fehler ✗ und die richtige Antwort mit grünem Rahmen und ✓ (Form, nicht nur Farbe); kein Rotblitz, nichts blinkt.
- **Anpassung:** nach jeder Bahn (Treppe aus `core/staircase.ts`, hier ohne Zähler): ≥ 85 % richtig → eine Stufe schwerer (bis zur ersten Umkehr zwei), < 65 % → eine Stufe leichter, dazwischen gleich. Hauptwert = höchste Stufe, auf der eine Bahn zu mindestens 65 % richtig war. Startstufe der nächsten Sitzung = Hauptwert − 1.
- **Punkte:** 10 + 2 × (Stufe − 1) je richtiger Antwort; Hauptwert ist die Stufe.
- **Ergebnis:** Treffer je Bahnform (Tabelle über `ExerciseResult.details`), Treffsicherheit, Ø Antwortzeit (nur richtige Antworten), Fehler und Auslassungen.
- **Simulation (Unit-Test, 60 Bilder/s, Autoplay):** Sitzung 96–99 s, je Bahn 3 Buchstaben, Hauptwert je nach Zufall 5–9. Die Schwierigkeitswerte (Stufen, Schwellen 85 %/65 %, Dauer je Bahn) sind **nicht an Menschen geprüft**, sondern nur durch Simulation und Rechnung abgesichert.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

Es gibt keine Programm-Vorlage und keine Studie zur Pendelball-Form mit Buchstaben. Die Übung wurde aus Grundlagenwissen hergeleitet:

- **Form:** In der funktionellen Optometrie wird die Folgebewegung klassisch an einem an einer Schnur hängenden Ball mit Buchstaben geübt, der in verschiedene Richtungen und im Kreis schwingt, bei ruhigem Kopf (Praxisangabe, nicht belegt, keine Quelle).
- **Gleichmäßige Bahn:** Vorhersagbare Bahnen (Sinus, Kreis) werden von Auge und Hand genauer verfolgt als unvorhersagbare (Collewijn & Tamminga 1984; Barnes 2008; Kowler et al. 2019). Die gleichmäßige Sinusbewegung ist daher die einfachste, ehrlichste Wahl; es gibt keine Sprünge, keine Hakenwürfe, kein Blitzen.
- **Zeichen statt bloßem Folgen:** Ob die Augen folgen, lässt sich ohne Blickmessung nicht prüfen. Ein Zeichen, das nur kurz und nur auf dem bewegten Ziel erscheint, verlangt das Folgen wenigstens (dynamische Sehschärfe; Ludvigh & Miller 1958). Es wird nur im geraden, gleichmäßigen Teil gezeigt, damit die Umkehr (Tempo ≈ 0, Aufholsprünge wahrscheinlich) nicht die Aufgabe bestimmt.
- **Bahnfolge:** Richtungen sind nicht gleich leicht (Rottach et al. 1996; Ke et al. 2013). Die feste Reihenfolge liefert eine Tabelle je Bahn; ab mittleren Stufen mischt die Folge, damit die Reihenfolge nicht auswendig gelernt wird. Das ist eine Gestaltungsabsicht, kein geprüfter Wirkmechanismus.
- **Grenzen:** Spitzentempo höchstens 24°/s: Die Obergrenze der glatten Folge liegt deutlich höher (Meyer et al. 1985), aber das Zeichen wird mit dem Tempo schwerer erkennbar; auf Tablets soll der Kopf nicht gedreht werden (Bahn ≤ 60 % der Breite).
- **Was nicht belegt ist:** Wirkungen auf Lesen, Lernen, Sport, Sehen im Alltag oder die Augenmuskeln. Solche Aussagen dürfen nicht gemacht werden.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Bei 40 cm Abstand entspricht 1 cm etwa 1,4°. Am iPad 11″ (1180 × 820 CSS-px, 0,192 mm je px) sind das etwa 36 px je Grad; 1 % der kürzeren Seite (1 u = 8,2 px) sind etwa 0,23°. Der Buchstabe misst auf Stufe 1 etwa 57 px (≈ 1,6°), auf Stufe 25 etwa 23 px (≈ 0,65°); nie unter 18 px. Die Kugel hat im Durchmesser etwa das 1,6- bis 1,9-Fache der Buchstabenhöhe. Auf dem Handy (390 × 844) sind die Pixel physisch kleiner (≈ 45 px/°), deshalb ist u für die Größen nach unten begrenzt.
- **Glatte Folge:** Latenz ≈ 100 ms bei unvorhersehbarer Bewegung (Carl & Gellman 1987), Gain unter 0,95 und Aufholsakkaden sind normal (Collewijn & Tamminga 1984); periodische Bahnen werden nahezu ohne Verzögerung vorhergesagt (Barnes 2008; Soechting et al. 2010). Bei Rampenbewegung lag der Gain bis 100°/s bei den meisten Versuchspersonen bei etwa 90 % (Meyer et al. 1985). Die Pendelfrequenz der Übung (0,25–0,45 Hz) und das Spitzentempo (bis 24°/s) liegen weit unterhalb dieser Grenzen.
- **Richtung:** Waagrechte Folge gelingt meist besser als senkrechte (Rottach et al. 1996); es gibt richtungsabhängige Unterschiede (Ke et al. 2013). Die Tabelle je Bahn zeigt deshalb Unterschiede, die auch von der Richtung selbst kommen können.
- **Dynamische Sehschärfe:** Das Erkennen eines Zeichens auf einem bewegten Ziel ist schlechter als bei ruhendem Zeichen und hängt vom Tempo ab (Ludvigh & Miller 1958; Brown 1972; Westheimer & McKee 1975). Deshalb bleibt das Tempo moderat und die Anzeigedauer lang genug (mindestens 600 ms mit je 160 ms Ein- und Ausblenden).
- **Hintergrund:** Ruhiger, struktur- und kontrastarmer Hintergrund; strukturierte Hintergründe senken den Gain (Collewijn & Tamminga 1984).
- **Brillenträger:** Gleitsicht hat einen schmalen scharfen Zwischenbereich; beim Lesen am Bildschirm dauern mit Gleitsicht Kopfbewegungen länger (Han et al. 2003). Die Bahn ist höchstens 60 % der Bühnenbreite breit, damit der Kopf nicht gedreht werden muss; wer die Bahn nur unscharf sieht, sollte Abstand und Brille anpassen.
- **Nähe:** In 40 cm sind etwa 2,5 dpt Akkommodation bzw. eine Nahkorrektur nötig. Am Bildschirm sinkt die Lidschlagrate (Portello et al. 2013); bei trockenem Auge zwischendurch blinzeln und Pausen machen. Eine Sitzung dauert etwa 2 Minuten.
- **Farbe:** Spielt keine Rolle (helle Kugel, dunkler Buchstabe); die Rückmeldung nutzt immer auch Form (✓, ✗, Rahmen).

## 5. Neurowissenschaftliche Grundlagen

- **Folgebewegung:** Bewegungssignale aus MT/V5 und MST werden über das Folgeareal des frontalen Augenfelds, das supplementäre Augenfeld, Brückenkerne und Kleinhirn in Augenbewegung umgesetzt (Lencer & Trillenberg 2008); Basalganglien und Colliculus superior sind beteiligt, Folge und Sakkaden teilen eine Architektur (Krauzlis 2004).
- **Vorhersage:** Bei periodischen Bahnen werden Geschwindigkeit und Zeitpunkt gespeichert und vorausschauend abgerufen (Barnes 2008; Kowler et al. 2019). Das erklärt, warum der gleichmäßige Sinus leichter zu folgen ist als eine zufällige Bahn.
- **Aufmerksamkeit:** Das Erkennen des Buchstabens verlangt, dass der Blick am Ziel bleibt und die Aufmerksamkeit auf die Kugel gerichtet ist; die Wahl unter vier Buchstaben ist eine einfache Wahlentscheidung. Eine Aussage „diese Übung trainiert Region X“ lässt sich daraus nicht ableiten und wird nicht gemacht.
- **Vestibulookulärer Reflex:** Bei ruhigem Kopf nicht gefordert; den Kopf ruhig zu halten isoliert die Augenfolge. Dass der Kopf tatsächlich ruhig bleibt, kann die App nicht prüfen.
- **Klinischer Hintergrund:** Die äußeren Augenmuskeln werden klinisch geprüft, indem die Augen einem nahen Ziel folgen, das in einem „H“ geführt wird; die Prüfung betrifft die Hirnnerven III, IV und VI (Muchnick 2008, S. 32–35). Diese Übung ist keine solche Prüfung.

## 6. Motorische Grundlagen

Außer der Antwort ist keine Handbewegung gefordert: ein Tipp auf einen von vier großen Buttons unten (mindestens 72 px breit, 68 px hoch); der Finger verdeckt die Kugel nie. Die Antwortfrist beträgt 2,5 s nach Ende der Anzeige, Antworten sind auch früher möglich. Die eigentliche „Motorik“ der Übung ist die Augenbewegung (glatte Folge mit Aufholsakkaden). Tremor oder eingeschränkte Feinmotorik stören kaum. Tastatur (Ziffern 1–4) ist als Alternative vorhanden.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Blickmessung:** Ob die Augen wirklich glatt folgen, bleibt offen; das Zeichen lässt sich auch mit einzelnen Blicksprüngen erkennen, und eigene Blicksprünge bemerkt man oft nicht. Die Kopfhaltung wird nicht erfasst.
- **Wenige Buchstaben:** Eine Sitzung hat etwa 18 Buchstaben (3 je Bahn). Die Anpassung nach je 3 Buchstaben ist grob (2 von 3 sind 67 %, 3 von 3 sind 100 %; Raten unter vier Buttons trifft in 16 % der Blöcke mindestens 2 von 3). Die „erreichte Stufe“ ist deshalb ein Selbstvergleichswert, kein Messwert.
- **Bahnen vermengt:** Bahnform, Reihenfolge, Müdigkeit und Übung innerhalb der Sitzung sind vermengt; die Tabelle je Bahn zeigt bei 3 Buchstaben nur grob etwas. Auf niedrigen Stufen steht die Bahn immer an derselben Stelle der Reihenfolge.
- **Gerät:** Größe und Abstand ändern Bahnbreite und °/s (die Übung begrenzt auf 24°/s bei der Annahme 40 cm und 0,23° je u); „Stufe 5“ ist kein fester Reiz. Ergebnisse verschiedener Geräte nicht gleichsetzen. Touchscreens messen Zeiten je nach Gerät zu lang; die Antwortzeit hier ist nur ein Vergleich mit sich selbst (Pronk et al. 2020).
- **Person:** Alter (die Folge wird bei Älteren bei hohem Tempo ungenauer; Moschner & Baloh 1994), Müdigkeit, Brille, Konzentration. Vorhersage verbessert das Folgen schon innerhalb von Minuten; die ersten Bahnen sind daher oft schwerer.
- **Streuung:** Ein einzelner Durchgang sagt wenig; aussagekräftig ist nur der Verlauf über mehrere Sitzungen auf demselben Gerät.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach (für verwandte Aufgaben):** Für die Pendelball-Form gibt es keine Studie. Kleine Laborstudien mit Blickmessung fanden bei vorhersagbaren Bahnen Übungseffekte, die einige Tage anhielten (Eibenberger et al. 2012). In einer Aufgabe wird man durch Gewöhnung an Gerät und Aufgabe meist besser; wie viel davon Folgebewegung ist, lässt sich ohne Blickmessung nicht sagen.
- **Naher Transfer – unklar:** Kaum Daten, ob eine feste Bahnfolge andere Bahnen oder Tempi verbessert. Bei trainingsähnlichem Test werden Effekte stark überschätzt.
- **Alltagstransfer – fehlend:** Kein Beleg für Lesen, Sport oder Alltag. Übungen zur Blickfolge gelten bei Lernschwierigkeiten ausdrücklich als nicht wirksam (Handler et al. 2011).
- **Praxisangaben (Erfahrungswissen, nicht belegt):** In der Praxis beginnt man am eigenen Arbeitspunkt und steigert in kleinen, selbst gesteuerten Schritten (Tempo, Richtungen, Zeichen auf dem Ziel); Sitzen gilt als leichter als Stehen. Wirksamkeitsbelege liegen nicht vor.
- **Einordnung:** Der Pendelball ist hier eine Übungsform: Man folgt einer gleichmäßig pendelnden Kugel und erkennt einen Buchstaben. Erreichte Stufe, Treffer je Bahn und Antwortzeit sind Werte für den Vergleich mit sich selbst, keine Normwerte.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand eine ruhige Folgeübung mit klarer Aufgabe sucht (Buchstabe erkennen statt nur schauen); Bahnen in allen Richtungen nacheinander geübt werden sollen; der Kopf ruhig gehalten werden kann; ein Tablet mit Touch auf einem Ständer genutzt wird; wenig Zeitdruck und keine Flimmerreize gewünscht sind.
- **Weniger passend, wenn …** die Augenbewegung gemessen oder beurteilt werden soll; die Kopfhaltung kontrolliert werden soll; starke Bildschirm- oder Bewegungsempfindlichkeit besteht; Buchstaben nicht gelesen werden können (kleine Kinder, kein lateinisches Alphabet); ein Normvergleich gewünscht ist.
- **Vorsicht / anpassen bei …**
  - `nystagmus`, `schielen_binokular`, `amblyopie`: Folge und Erkennen können deutlich anders sein; Ergebnis nicht als Aussage über das Auge lesen; Kopf- und Blickhaltung sind Sache der Fachperson.
  - `sehbehinderung_niedriger_visus`, `presbyopie_gleitsicht`: Buchstaben auf den niedrigen Stufen sind groß (≈ 1,6°), später klein; Tablet in den Nahteil-Abstand bringen oder niedrige Stufe wählen.
  - `kopfschmerz_asthenopie`, `schwindel_vestibulaer`: bewegtes Ziel; bei Beschwerden Pause. Doppelbilder, Schwindel oder Kopfschmerz mit Sehverschlechterung gehören ärztlich abgeklärt, statt weiterzuüben (Muchnick 2008, S. 6, 28).
  - `kinder_unter_6`, `lese_rechtschreib_schwaeche`: sicherer Umgang mit Buchstaben nötig; nicht untersucht.
- **Kombiniert gut mit …** 402 (Liegende Acht, einzelne Bahn), 403 (Wellenbahn), 404 (gleichmäßig langsame Folge); als ruhige Folgeübung vor Aufgaben mit mehr Zeitdruck.
- Keine Diagnosen, keine Heilversprechen; nicht als Prüfung der Augenbewegungen darstellen.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Kein Blickmaß:** Das Zeichen lässt sich auch mit Blicksprüngen erkennen. Ein Eye-Tracking wäre die einzige Möglichkeit, die Folge zu messen; bis dahin Texte ehrlich halten (so in `texts.ts` und `science.ts`).
- **Schwierigkeitswerte nur simuliert:** Stufentabelle, Schwellen 85 %/65 %, Anzeigedauer und Dauer je Bahn sind nicht an Menschen geprüft; nach ersten Sitzungen mit echten Personen prüfen (zu leicht? zu schwer? Dauer je Bahn?).
- **Grobe Anpassung:** 3 Buchstaben je Bahn sind wenig; mehr Buchstaben oder zwei Durchgänge wären aussagekräftiger, verlängern aber die Sitzung (jetzt etwa 100 s).
- **Geräteabhängigkeit:** °/s gilt nur bei der Annahme 40 cm und 0,23° je u; die Kalibrierung (cm/Sehwinkel) der Labor-Übungen könnte eingebunden werden.
- **Buchstabenschrift:** System-Schrift ohne Serifen; auf Geräten ohne passende Schrift kann die Form leicht abweichen. Eine fest eingebettete Sehzeichen-Schrift wäre genauer.
- **Alphabet:** Lateinische Großbuchstaben; für Personen ohne lateinisches Alphabet eine Zahlen-Variante anbieten.
- **Sicherheit:** Keine Lichtreize, kein Blitzen, weiche Übergänge; keine Warnung als Flackern nötig. Hinweis auf Doppelbilder, Schwindel und Kopfschmerz im Intro.

## 11. Quellen

### Von der Website angegeben
(keine, eigene Übung)

### Weitere Fachliteratur
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Gain unter 0,95, Hintergrund, vorhersagbare Bahnen (Crossref geprüft)
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – Vorhersage bei periodischen Bahnen (Crossref geprüft)
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 – Vorhersage der Folgebewegung (Crossref geprüft)
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Obergrenze der glatten Folge (Crossref geprüft)
- Rottach, K. G., Zivotofsky, A. Z., Das, V. E., Averbuch-Heller, L., Discenna, A. O., Poonyathalang, A., & Leigh, R. J. (1996). Comparison of horizontal, vertical and diagonal smooth pursuit eye movements in normal human subjects. *Vision Research, 36*(14), 2189–2195. https://doi.org/10.1016/0042-6989(95)00302-9 – waagrecht, senkrecht, schräg (Crossref geprüft)
- Ke, S. R., Lam, J., Pai, D. K., & Spering, M. (2013). Directional asymmetries in human smooth pursuit eye movements. *Investigative Ophthalmology & Visual Science, 54*, 4409. https://doi.org/10.1167/iovs.12-11369 – Richtungsunterschiede (Crossref geprüft: Titel, Zeitschrift, Band, erste Seite)
- Ludvigh, E., & Miller, J. W. (1958). Study of visual acuity during the ocular pursuit of moving test objects. I. Introduction. *Journal of the Optical Society of America, 48*, 799. https://doi.org/10.1364/josa.48.000799 – dynamische Sehschärfe (Crossref geprüft: Titel, Zeitschrift, Band, erste Seite)
- Miller, J. W. (1958). Study of visual acuity during the ocular pursuit of moving test objects. II. Effects of direction of movement, relative movement, and illumination. *Journal of the Optical Society of America, 48*, 803. https://doi.org/10.1364/josa.48.000803 – Richtung und Beleuchtung (Crossref geprüft: Titel, Zeitschrift, Band, erste Seite)
- Brown, B. (1972). Dynamic visual acuity, eye movements and peripheral acuity for moving targets. *Vision Research, 12*(2), 305–321. https://doi.org/10.1016/0042-6989(72)90120-4 – dynamische Sehschärfe (Crossref geprüft: Titel, Zeitschrift, Jahr)
- Westheimer, G., & McKee, S. P. (1975). Visual acuity in the presence of retinal-image motion. *Journal of the Optical Society of America, 65*, 847. https://doi.org/10.1364/josa.65.000847 – Sehschärfe bei Bildbewegung (Crossref geprüft: Titel, Zeitschrift, Jahr)
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – Trainierbarkeit (Crossref geprüft)
- Handler, S. M., Fierson, W. M., et al. (2011). Learning disabilities, dyslexia, and vision. *Pediatrics, 127*(3), e818–e856. https://doi.org/10.1542/peds.2010-3670 – Blickfolge-Übungen bei Lernschwierigkeiten nicht wirksam (Crossref geprüft)
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm (Crossref geprüft)
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Latenz ≈ 100 ms (aus Eintrag 402 übernommen, dort per Crossref geprüft)
- Soechting, J. F., Rao, H. M., & Juveli, J. Z. (2010). Incorporating prediction in models for two-dimensional smooth pursuit. *PLoS ONE, 5*(9), e12574. https://doi.org/10.1371/journal.pone.0012574 – 2D-Vorhersage beim Menschen (aus Eintrag 402 übernommen)
- Lencer, R., & Trillenberg, P. (2008). Neurophysiology and neuroanatomy of smooth pursuit in humans. *Brain and Cognition, 68*(3), 219–228. https://doi.org/10.1016/j.bandc.2008.08.013 – Netzwerk beim Menschen (aus Eintrag 402 übernommen)
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – gemeinsame Architektur von Folge und Sakkaden (aus Eintrag 402 übernommen)
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Alter (aus Eintrag 402 übernommen)
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science, 90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag am Bildschirm (aus Eintrag 402 übernommen)
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*, 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touchscreens messen Zeiten zu lang
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen, Augenbewegungsprüfung (S. 6, 28, 32–35)
