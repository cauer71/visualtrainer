---
# ===== Kennung =====
nr: 919
kennung: labor-zeichen-finden
name: "Zeichen finden (alle gleichen Zeichen in einem Raster ähnlicher Zeichen antippen)"
name_original: "– (eigene Blickfit-Übung, Labor, kein Vorbild)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-zeichen-finden", name: "Zeichen finden", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Oben steht ein Zielzeichen, darunter ein Raster aus sehr ähnlichen Zeichen (zum Beispiel b, d, p, q). Man tippt jedes gleiche Zeichen an, nicht die ähnlichen, und tippt „Fertig“, wenn man nichts mehr findet. Zeichenvorrat, Rastergröße, Anteil der Zielzeichen, Feldgröße und Zahl der Tafeln stellt man selbst ein. Hauptwert ist die Genauigkeit; der Blick wird nicht gemessen."
ziel_funktionen: [visuelle_suche, selektive_aufmerksamkeit]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 120
schwierigkeit_anpassung: "Keine Stufen, keine automatische Anpassung: Die Schwierigkeit ergibt sich aus den Einstellungen. Zeichenvorrat „b d p q“ (Standard, Spiegelpaare), Ziffern (1 7 4 9 6 2 5 3), ähnliche Buchstaben (O Q C G D U E F) oder gemischt; Raster 2–12 Zeilen × 2–16 Spalten (Standard 5 × 8); Anteil der Zielzeichen 5–50 % (Standard 20 %; weniger = schwerer); Feldgröße 1–6 cm (Standard 2,5 cm; Zeichen mindestens ≈ 22 px, Feld mindestens 36 px); Zahl der Tafeln 1–20 (Standard 5). Passt das Raster nicht auf den Bildschirm, wird es gedreht oder für diese Tafel verkleinert (Hinweis im Ergebnis). Das Zielzeichen wechselt reihum durch den Vorrat. Eigene Faustregel: Genauigkeit über mehrere Läufe über 95 % → eine Einstellung schwerer."
messgroessen: ["Hauptwert: Genauigkeit = gefundene ÷ (gefundene + übersehene + falsch getippte) in Prozent", "Zielzeichen gefunden", "Zielzeichen übersehen (bei „Fertig“)", "falsche Zeichen getippt", "Zeit pro gefundenem Zeichen (enthält Geräteverzögerung)", "Gesamtzeit (Summe der Tafelzeiten)", "kein Blickmaß, keine Aussage über Lesen oder Augen, keine Normwerte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 2
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 0
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 0
    visuelle_suche: 3
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 2
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 3
    inhibition: 2
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 1
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 0
    entscheidung_wahlreaktion: 1
    lesen_sprache: 1
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 2
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
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm einmal kalibrieren, damit die Feldgröße in cm stimmt", "kleine, ähnliche Zeichen (Buchstaben des lateinischen Alphabets oder Ziffern) sicher unterscheiden können", "Felder von mindestens 36 px antippen können"]
vorsicht_bei: [sehbehinderung_niedriger_visus, presbyopie_gleitsicht, gesichtsfeldausfall, lese_rechtschreib_schwaeche, kinder_unter_6, aufmerksamkeitsprobleme, kopfschmerz_asthenopie, trockenes_auge_bildschirm]
geeignet_fuer: ["ein Zielzeichen zwischen sehr ähnlichen Zeichen suchen und genau unterscheiden", "systematisches Absuchen (Zeile für Zeile) üben", "Schwierigkeit über Zeichenvorrat, Rastergröße und Anteil der Zielzeichen einstellen", "ruhige Suchaufgabe ohne bewegte Reize und ohne Lichtreize"]
weniger_geeignet_fuer: ["Aussagen über Lesen, Rechtschreibung oder Augen (misst die Übung nicht)", "Blickfolge, Reaktion oder Tempo unter Zeitdruck üben", "Menschen mit deutlich eingeschränkter Sehschärfe bei kleinen Feldern", "Lese- oder Rechtschreibförderung mit Wirkanspruch (nicht belegt)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Suche wird schwerer, je ähnlicher Ziel und Störzeichen sind (Duncan & Humphreys 1989); die Ähnlichkeit von Buchstaben ist ungleich verteilt (Mueller & Weidemann 2012). Suchleistung verbessert sich in Laborstudien mit Übung schnell und dauerhaft (Sireteanu & Rettenbach 1995; andere Aufgaben). Für genau diese Übung gibt es keine Studie; ob Üben der Zeichensuche Lesen oder Rechtschreibung beeinflusst, ist nicht belegt."
aehnliche_uebungen: [103, 204, 208, 916]
stichworte: ["Zeichen finden", "visuelle Suche", "b d p q", "Spiegelbuchstaben", "ähnliche Zeichen", "Suchaufgabe", "Genauigkeit", "Zeile für Zeile", "Gedränge", "Labor", "Einstellungen"]
---

# 919 · Zeichen finden (alle gleichen Zeichen in einem Raster ähnlicher Zeichen antippen)

> Original: – (eigene Labor-Übung ohne Vorbild) · Blickfit: „Zeichen finden“ (`src/exercises/labor-zeichen-finden/`, Kategorie Wahrnehmung, Labor)

## 1. Kurzbeschreibung

Oben steht das gesuchte Zeichen, darunter ein Raster aus Feldern mit sehr ähnlichen Zeichen – zum Beispiel b, d, p und q, die sich nur in Lage und Spiegelung unterscheiden. Man tippt jedes Feld mit dem gesuchten Zeichen an; gefundene Zeichen werden markiert, falsch getippte mit ✗ und gestricheltem Feld. Sind alle gefunden, kommt die nächste Tafel; findet man nichts mehr, tippt man „Fertig“, und die übrigen Zielzeichen zählen als übersehen. Das gesuchte Zeichen wechselt von Tafel zu Tafel reihum. Die Blickfit-Übung hat keine Stufen, sondern **Einstellungen**: Zeichenvorrat (b d p q, Ziffern, ähnliche Buchstaben wie O Q C G, gemischt), Raster (2–12 Zeilen, 2–16 Spalten, Standard 5 × 8), Anteil der Zielzeichen (5–50 %, Standard 20 %), Feldgröße (1–6 cm, Standard 2,5 cm) und Zahl der Tafeln (1–20, Standard 5). Hauptwert ist die Genauigkeit; dazu kommen gefundene, übersehene und falsch getippte Zeichen sowie die Zeit pro gefundenem Zeichen. Der Blick wird nicht gemessen, und die Übung sagt nichts über Lesen, Schreiben oder die Augen aus.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `logic.ts`, `index.ts`, `texts.ts` (Stand 05.10.2026).

- **Tafel:** Zeilen × Spalten Felder; Anteil `density` % (mindestens eins, nie alle) trägt das Zielzeichen, die übrigen ein anderes Zeichen desselben Vorrats.
- **Zielzeichen:** reihum aus einem gemischten Beutel, nie zweimal hintereinander dasselbe – weil die Ähnlichkeit der Zeichen ungleich ist (b/d ähnlicher als b/q), kommt so jedes etwa gleich oft vor.
- **Antippen:** richtig → gefunden; falsch → Fehltipp (markiert, nicht erneut tippbar); bearbeitete Felder werden ignoriert. Alle gefunden → nächste Tafel; „Fertig“ (60 px hoch) → übrige Zielzeichen übersehen.
- **Raster an die Bühne:** Zeichen mindestens ≈ 22 px (Feld × 0,62), Feld mindestens 36 px; passt das Raster nicht, wird es gedreht (Hochformat) oder für diese Tafel verkleinert; das steht im Ergebnis.
- **Zeit:** ab dem Anzeigen der Tafel; Gesamtzeit = Summe der Tafelzeiten (ohne Pausen).
- **Tipp nach dem Lauf (eigene Faustregeln):** viele Fehltipps → Unterscheidungsmerkmal beachten; viele übersehen → Zeile für Zeile; fast fehlerfrei → eine Einstellung schwerer; langsam → weniger Felder oder mehr Zielzeichen; sonst Vergleichshinweis. `usesCalibration: true`.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Vorbilds)

Die Übung ist eine eigene Labor-Übung. Aussagen und Quellen stammen aus `science.ts` (einzeln per Crossref und Abstract geprüft, 02.10.2026); Treisman & Gelade (1980) wurde dort nicht aufgenommen (kein Abstract), die Aussage zur Ähnlichkeit steht über Duncan & Humphreys (1989). Ergänzt wurden nur per Crossref geprüfte Grundlagen (Wolfe 1998, Sireteanu & Rettenbach 1995, Corbetta & Shulman 2002, Pelli & Tillman 2008, Whitney & Levi 2011, Parhi et al. 2006, Sheppard & Wolffsohn 2018, Muchnick 2008 nur für Warnzeichen). Nicht übernommen: „Verwechslungen werden hier gezielt geübt“, „trainiert genaues Unterscheiden“ (Wirkversprechen) und der Hinweis, Spiegelungen „fachlich abklären zu lassen“ (klingt nach Diagnose).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Bei der Standardfeldgröße (2,5 cm) ist das Zeichen etwa 1,55 cm hoch (62 % des Feldes) und erscheint bei etwa 50 cm Abstand etwa 1,8° groß; bei 1 cm Feldgröße etwa 0,7°. Das liegt deutlich über der Sehschärfegrenze, doch die Zeichen unterscheiden sich nur in kleinen Merkmalen (Lage des Bogens, Schwanz beim Q), sodass Schärfe bei kleinen Feldern eine Rolle spielt.
- **Gedränge:** Dicht stehende Zeichen sind schwerer zu erkennen als einzelne; der nötige Abstand wächst mit der Entfernung von der Blickmitte und begrenzt das Suchtempo (Pelli & Tillman, 2008; Whitney & Levi, 2011). Das Raster mit dichten Zeichen verlangt deshalb viele Blickwechsel; Zeichen am Rand des Blickfelds werden oft erst beim Hinschauen sicher erkannt.
- **Suchverhalten:** Bei ähnlichen Zeichen ist die Suche meist schrittweise: Der Blick springt von Bereich zu Bereich. Zeile für Zeile abzusuchen verringert übersehene Zeichen (Tipp der Übung, kein Beleg).
- **Naharbeit:** Mehrere Tafeln mit kleinen, ähnlichen Zeichen sind anstrengend; Augenbeschwerden am Bildschirm sind häufig (Sheppard & Wolffsohn, 2018). Pausen nach etwa 10 Minuten und bewusstes Blinzeln helfen.
- **Brillenträger:** Das Raster füllt einen großen Teil der Bühne; bei Gleitsicht liegen obere und untere Zeilen in verschiedenen Zonen der Brille. Größere Felder oder eine Arbeitsplatzbrille erleichtern die Suche.
- **Farbe:** Spielt keine Rolle; Rückmeldungen nutzen ✓/✗ und gestrichelte Felder, nie nur Farbe.

## 5. Neurowissenschaftliche Grundlagen

- **Ähnlichkeit bestimmt die Schwierigkeit:** Je ähnlicher das Ziel den anderen Zeichen und je unähnlicher diese untereinander sind, desto schwerer wird die Suche (Duncan & Humphreys, 1989). Suchleistungen bilden ein Kontinuum von sehr leicht bis sehr mühsam, statt in zwei getrennte Arten zu zerfallen (Wolfe, 1998).
- **Lenkung der Aufmerksamkeit:** Wohin die Aufmerksamkeit beim Suchen geht, wird von mehreren Faktoren gelenkt, zum Beispiel von auffälligen Merkmalen, vom gesuchten Merkmal und von der bisherigen Suche (Wolfe & Horowitz, 2017). Zielgerichtete und reizgetriebene Aufmerksamkeit werden von frontalen und parietalen Netzwerken gesteuert (Corbetta & Shulman, 2002). Eine Aussage „diese Übung trainiert Region X“ lässt sich daraus nicht ableiten und wird nicht gemacht.
- **Buchstabenähnlichkeit:** Eine Übersichtsarbeit fasst zusammen, dass die Trefferquote beim Erkennen von Buchstaben häufig auf Wahrnehmbarkeit, Antwortneigung und Ähnlichkeit der Buchstaben zurückgeführt wird (Mueller & Weidemann, 2012). Deshalb wechselt das gesuchte Zeichen reihum.
- **Spiegelpaare:** Das Sehsystem behandelt Spiegelbilder von Bildern zunächst als dasselbe; beim Lesenlernen muss das für Buchstaben überwunden werden, was die Spiegelfehler kleiner Kinder erklären könnte (Dehaene et al., 2010). Die Übung misst das nicht und sagt nichts über die Lesefähigkeit.
- **Hemmung:** Ähnliche Zeichen dürfen nicht angetippt werden; vorschnelles Tippen erzeugt Fehltipps.

## 6. Motorische Grundlagen

Jedes gefundene Zeichen wird einzeln angetippt; die Felder sind mindestens 36 px groß (bei Standardgröße 2,5 cm deutlich größer), und sichere Fingerziele brauchen etwa 9 mm (Parhi et al., 2006). Der Finger wandert über das ganze Raster und verdeckt dabei Teile davon. Es gibt kein Zeitlimit; „Fertig“ ist groß (60 px hoch). Tremor kann bei kleinen Feldern zu Fehltipps führen, die als falsche Zeichen zählen.

## 7. Einflussfaktoren und Messgrenzen

- **Ungleiche Paare:** Manche Paare (zum Beispiel b und d) sind leichter zu verwechseln als andere; je nach Zielzeichen schwankt die Schwierigkeit von Tafel zu Tafel. Der Reihum-Wechsel gleicht das über mehrere Tafeln aus.
- **Kalibrierung und Bühne:** Die Feldgröße stimmt nur nach Kalibrierung; auf kleinen Bildschirmen wird das Raster gedreht oder verkleinert – dann ist die Aufgabe eine andere, und das steht im Ergebnis.
- **Genauigkeit und Tempo:** Wer schnell tippt, übersieht mehr oder tippt öfter falsch; Genauigkeit und Zeit pro Zeichen müssen gemeinsam betrachtet werden.
- **Zeit:** Die Zeit enthält Suchen, Fingerweg und Geräteverzögerung; Touchscreens messen Zeiten durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020; Tablets wurden dort nicht untersucht).
- **Kein Blickmaß:** Wie gesucht wird, misst die Übung nicht; die Werte sagen nichts über Augen, Lesen oder Schreiben.
- **Übung:** Mit Wiederholung wird man in derselben Suchaufgabe schneller und genauer; vergleichbar sind nur Läufe mit gleichen Einstellungen auf demselben Gerät.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** In Laborstudien wurden anfangs mühsame Suchaufgaben mit Übung schnell und dauerhaft effizienter (Sireteanu & Rettenbach, 1995; andere Reize als hier). Für genau diese Übung gibt es keine Studie.
- **Naher Transfer – schwach:** Ob sich Verbesserungen auf andere Zeichen oder Suchaufgaben übertragen, ist für diese Übung nicht untersucht; die Laborbefunde dazu sind uneinheitlich.
- **Alltagstransfer – fehlend:** Ob Üben der Zeichensuche Lesen, Rechtschreibung oder das Suchen im Alltag beeinflusst, ist nicht belegt.
- **Praxisangabe (nicht belegt):** In der funktionellen Optometrie werden Zeichengröße und Abstand als Stellgrößen der Schwierigkeit beschrieben; als Erfahrungswissen, hier nicht als Wirkung belegt.
- **Einordnung:** Die Übung ist eine einstellbare Suchaufgabe mit ähnlichen Zeichen. Genauigkeit und Zeit pro Zeichen dienen dem Vergleich mit sich selbst, nicht als Normwert oder Aussage über Lesefähigkeit.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** ein Zielzeichen zwischen sehr ähnlichen Zeichen gesucht und genau unterschieden werden soll; systematisches Absuchen geübt werden soll; eine ruhige Aufgabe ohne Bewegung und Lichtreize gewünscht ist; ein Tablet mit Touch genutzt wird.
- **Weniger passend, wenn …** Aussagen über Lesen, Rechtschreibung oder Augen erwartet werden; Blickfolge, Reaktion oder Tempo im Vordergrund stehen; die Sehschärfe für kleine, ähnliche Zeichen nicht reicht.
- **Vorsicht / anpassen bei …**
  - `sehbehinderung_niedriger_visus`, `presbyopie_gleitsicht`: große Felder, kleines Raster, Zeichenvorrat „Ziffern“; Arbeitsplatzbrille.
  - `gesichtsfeldausfall`: Zeichen in einem Teil des Rasters können übersehen werden; kleines Raster, Zeile für Zeile absuchen; Ergebnis nicht als Aussage über das Gesichtsfeld lesen.
  - `lese_rechtschreib_schwaeche`, `kinder_unter_6`: Spiegelpaare können besonders schwerfallen; mit Ziffern beginnen; die Übung misst weder Lesen noch Schreiben und hat keinen Förderanspruch.
  - `aufmerksamkeitsprobleme`: wenige Tafeln, kleines Raster, höherer Anteil an Zielzeichen.
  - `kopfschmerz_asthenopie`, `trockenes_auge_bildschirm`: Pausen nach etwa 10 Minuten, bewusst blinzeln.
- **Kombiniert gut mit …** 103 (Suchzeichen im Feld), 204 (Zahlenjagd), 208 (Wachposten), 916 (Buchstabentafel).
- Treten beim Üben Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung oder Schwindel auf, sollte das ärztlich abgeklärt werden, statt weiterzuüben (Muchnick, 2008, S. 6, 28).
- Keine Diagnosen, keine Heilversprechen; nicht als Lese-, Rechtschreib- oder Sehprüfung darstellen.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Finger verdeckt das Raster:** Bei großen Rastern ein Hinweis, von oben nach unten zu arbeiten.
- **Genauigkeit allein:** Ein gemeinsamer Blick auf Genauigkeit und Zeit (z. B. als zweite Zeile im Verlauf) würde Tempo-Genauigkeits-Verschiebungen sichtbar machen.
- **Raster gedreht/verkleinert:** Läufe mit angepasstem Raster sollten im Verlauf getrennt werden.
- **Schrift:** Systemschrift; eine fest eingebettete Schrift würde die Ähnlichkeit der Zeichen auf allen Geräten gleich halten.

## 11. Quellen

### Von der Website angegeben
keine (eigene Übung)

### Weitere Fachliteratur
- Duncan, J., & Humphreys, G. W. (1989). Visual search and stimulus similarity. *Psychological Review*, *96*(3), 433–458. https://doi.org/10.1037/0033-295X.96.3.433 – Ähnlichkeit von Ziel und Störzeichen bestimmt die Schwierigkeit (Crossref geprüft; Abstract gelesen).
- Wolfe, J. M., & Horowitz, T. S. (2017). Five factors that guide attention in visual search. *Nature Human Behaviour*, *1*(3), 0058. https://doi.org/10.1038/s41562-017-0058 – Faktoren der Aufmerksamkeitslenkung (Crossref geprüft; Abstract gelesen).
- Mueller, S. T., & Weidemann, C. T. (2012). Alphabetic letter identification: Effects of perceivability, similarity, and bias. *Acta Psychologica*, *139*(1), 19–37. https://doi.org/10.1016/j.actpsy.2011.09.014 – Ähnlichkeit von Buchstaben (Crossref geprüft; Abstract gelesen).
- Dehaene, S., Nakamura, K., Jobert, A., Kuroki, C., Ogawa, S., & Cohen, L. (2010). Why do children make mirror errors in reading? Neural correlates of mirror invariance in the visual word form area. *NeuroImage*, *49*(2), 1837–1848. https://doi.org/10.1016/j.neuroimage.2009.09.024 – Spiegelbilder und Lesenlernen (Crossref geprüft; Abstract gelesen).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Zeitmessung am Touchgerät (Crossref geprüft; Abstract gelesen).
- Wolfe, J. M. (1998). What can 1 million trials tell us about visual search? *Psychological Science*, *9*(1), 33–39. https://doi.org/10.1111/1467-9280.00006 – Suchleistungen bilden ein Kontinuum (Crossref geprüft).
- Sireteanu, R., & Rettenbach, R. (1995). Perceptual learning in visual search: Fast, enduring, but non-specific. *Vision Research*, *35*(14), 2037–2043. https://doi.org/10.1016/0042-6989(94)00295-W – schnelles, dauerhaftes Lernen bei Suchaufgaben (Crossref geprüft).
- Corbetta, M., & Shulman, G. L. (2002). Control of goal-directed and stimulus-driven attention in the brain. *Nature Reviews Neuroscience*, *3*(3), 201–215. https://doi.org/10.1038/nrn755 – Netzwerke der Aufmerksamkeitssteuerung (Crossref geprüft).
- Pelli, D. G., & Tillman, K. A. (2008). The uncrowded window of object recognition. *Nature Neuroscience*, *11*(10), 1129–1135. https://doi.org/10.1038/nn.2187 – Gedränge begrenzt das Suchtempo (Crossref geprüft; Abstract gelesen).
- Whitney, D., & Levi, D. M. (2011). Visual crowding: A fundamental limit on conscious perception and object recognition. *Trends in Cognitive Sciences*, *15*(4), 160–168. https://doi.org/10.1016/j.tics.2011.02.005 – Gedränge als Grenze des Erkennens (Crossref geprüft; Abstract gelesen).
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of the 8th Conference on Human-Computer Interaction with Mobile Devices and Services* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – Mindestgröße von Touch-Zielen (Crossref geprüft).
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology*, *3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – Augenbelastung am Bildschirm (Crossref geprüft).
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Lehrbuch: Warnzeichen mit Abklärungsbedarf (S. 6, 28).
