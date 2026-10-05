---
# ===== Kennung =====
nr: 929
kennung: labor-hess
name: "Hess-Schirm (Funktionsübung mit Rot-Grün-Brille: Zeiger auf das Ziel des anderen Auges legen)"
name_original: "– (eigene Labor-Übung nach dem Prinzip des klassischen Hess-Schirms)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-hess", name: "Hess-Schirm", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Funktionsübung nach dem Prinzip des klassischen Hess-Schirms, kein Ersatz für die Untersuchung. Mit einer Rot-Grün-Brille sieht ein Auge nur einen Zielpunkt eines Rasters, das andere nur einen Zeiger. Man legt den Zeiger dorthin, wo er auf dem Ziel zu liegen scheint, Punkt für Punkt; danach tauschen die Augen die Rollen. Am Ende zeigt eine Karte alle gesetzten Punkte; die App deutet nichts."
ziel_funktionen: [fixation, auge_hand_koordination]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 300
schwierigkeit_anpassung: "Keine Stufen; Einstellungen (Standard in Klammern): größter Blickwinkel 10–35° (20°; der innere Ring liegt bei der Hälfte), Raster voll mit 25 Punkten (9 innen, 16 außen) oder nur innen (9 Punkte), Durchgänge beide oder nur einer, Größe des Zielpunkts 0,4–2 cm (0,8 cm), Größe des Zeigers 0,4–2 cm (0,8 cm), dazu Brille und Farben: linkes Glas rot oder grün/cyan/blau, Farbpaar Rot–Grün, Rot–Cyan oder Rot–Blau (für Rot-Cyan-Brillen), Helligkeit je Farbe 30–100 %, Prüfbild einfach oder Schritt für Schritt. Passt das Raster nicht auf den Bildschirm, wird es verkleinert; der tatsächliche Winkel steht im Ergebnis. Leichter/kürzer: nur innen, ein Durchgang, 10–15°, größere Ziele. Umfangreicher: volles Raster, beide Durchgänge, großer Winkel (braucht einen breiten Bildschirm)."
messgroessen: ["Hauptwert: gesetzte Punkte (Zahl der Eingaben, keine Leistung)", "Übungswert je Durchgang: mittlerer Abstand zwischen gesetztem Ort und Ziel in Grad", "Übungswert je Durchgang: Fläche des Umrisses der gesetzten äußeren Punkte in Prozent des Sollumrisses, Verhältnis A zu B", "tatsächlicher größter Blickwinkel, Abstand aus der Kalibrierung", "Zeit je Punkt (enthält die Touch-Verzögerung)", "keine Deutung, keine Richtwerte, keine Messung des Blicks"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 1
    farbunterscheidung: 2
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 1
    fixation: 3
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 0
    naharbeit_dauer: 2
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 0
    antizipation: 0
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 3
    zielbewegung_tempo: 0
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 1
    ruhige_hand: 1
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 0
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Rot-Grün-Brille (bei Rot-Cyan-Brillen Farbpaar Rot–Blau wählen), bei Korrekturbrille am besten als Überbrille", "Bildschirm kalibriert, senkrecht auf Augenhöhe, Abstand wie bei der Kalibrierung angegeben", "Kopf ruhig und mittig vor dem Raster, nur die Augen bewegen sich; Raum eher abgedunkelt", "Normales Rot-Grün-Farbsehen (sonst trennen sich die Bilder nicht richtig)", "Maus oder Stift ist genauer als der Finger, der den Zeiger verdeckt", "Für große Winkel ein breiter Bildschirm; auf Tablets wird das Raster meist verkleinert"]
vorsicht_bei: [farbsehschwaeche, schielen_binokular, amblyopie, nystagmus, kopfschmerz_asthenopie, photosensitive_epilepsie, presbyopie_gleitsicht, sehbehinderung_niedriger_visus, kinder_unter_6]
geeignet_fuer: ["Das Prinzip eines klassischen Verfahrens mit getrennten Bildern erfahrbar machen (Funktionsübung, kein Ersatz für die Untersuchung)", "Ruhig fixieren und einen Zeiger, den nur das andere Auge sieht, genau auf ein Ziel legen", "Vorführung in Beratung und Geschäft – ohne Befund, ohne Richtwerte und ohne Wirkanspruch", "Vergleich mit sich selbst bei gleichen Einstellungen, gleichem Abstand und gleicher Kopfhaltung"]
weniger_geeignet_fuer: ["Diagnose, Befund oder Verlaufskontrolle von Augenmuskelstörungen (dafür gibt es die Untersuchung bei Fachleuten)", "Menschen mit Rot-Grün-Farbsehschwäche", "Kleine Kinder", "Kurze Pausenübung (das volle Raster mit zwei Durchgängen dauert mehrere Minuten)", "Normvergleich oder Deutung der Karte"]
evidenz:
  uebungseffekt: fehlend
  naher_transfer: fehlend
  alltag_transfer: fehlend
  kommentar: "Funktionsübung nach dem Prinzip des klassischen Verfahrens, kein Ersatz für die Untersuchung. Das klassische Hess-Verfahren ist beschrieben (Roper-Hall 2006; verwandt: Lancaster-Test, Christoff & Guyton 2006; kleine Fallserie: Armesto et al. 2008). Für diese digitale Näherung (Zeigen mit Finger oder Maus, Farben am Bildschirm, ebene Projektion) gibt es keine Studie; die Werte sind nicht mit denen des klassischen Verfahrens austauschbar, und ein Nutzen als Übung ist nicht belegt."
aehnliche_uebungen: [930, 931, 932, 921, 922]
stichworte: ["Hess-Schirm", "Lancaster-Prinzip", "Rot-Grün-Brille", "getrennte Bilder", "Blickrichtungen", "Raster", "Funktionsübung", "keine Deutung", "Labor-Übung", "kein Ersatz für die Untersuchung"]
---

# 929 · Hess-Schirm (Funktionsübung mit Rot-Grün-Brille: Zeiger auf das Ziel des anderen Auges legen)

> Original: – (eigene Labor-Übung nach dem Prinzip des klassischen Hess-Schirms) · Blickfit: „Hess-Schirm“ (`src/exercises/labor-hess/`, Kategorie Wahrnehmung)

## 1. Kurzbeschreibung

Funktionsübung nach dem Prinzip des klassischen Verfahrens, kein Ersatz für die Untersuchung. Auf schwarzem Grund erscheint nacheinander je ein Zielpunkt eines Rasters (bis zu 25 Punkte: 9 innen, 16 außen). Mit einer Rot-Grün-Brille sieht das eine Auge nur den roten Zielpunkt, das andere nur einen Zeiger in der zweiten Farbe. Man schaut auf das Ziel und legt den Zeiger durch Ziehen oder Tippen dorthin, wo er auf dem Ziel zu liegen scheint, und bestätigt mit „OK“. Im zweiten Durchgang tauschen die Farben und damit die Augen die Rollen. Am Ende zeigt eine Karte den Sollumriss in Grau, Durchgang A durchgezogen und Durchgang B gestrichelt. Die wichtigsten Einstellungen sind der größte Blickwinkel (Standard 20°), volles oder inneres Raster, ein oder zwei Durchgänge, Größe von Ziel und Zeiger sowie Brille, Farbpaar (Rot–Grün, Rot–Cyan, Rot–Blau) und Helligkeit je Farbe. Die App zeigt Übungswerte (Abstand zum Ziel in Grad, Fläche des Umrisses) und deutet sie nicht.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts`, `texts.ts`, `science.ts` in `src/exercises/labor-hess/` sowie `_shared/pruefung-blick.ts`, `_shared/pruefung-anaglyph.ts`, `_shared/pruefung-texte.ts` (Stand 05.10.2026).

- **Raster:** 5 × 5 Punkte bei −1, −0,5, 0, 0,5, 1 × größter Winkel (innerer Ring bei der Hälfte). Ort auf der ebenen Fläche = Abstand · tan(Winkel), Abstand aus der Kalibrierung (Standard 40 cm). Passt das Raster mit 1,5 cm Rand nicht ins Feld, wird es gleichmäßig verkleinert; der tatsächliche Winkel steht im Ergebnis.
- **Ablauf:** Reihenfolge je Durchgang zufällig. Durchgang A: Ziel rot, Zeiger in der zweiten Farbe (fixierendes Auge = Auge hinter dem roten Glas); Durchgang B umgekehrt. Der Zeiger beginnt immer in der Mitte; „OK“ gilt erst nach einer Bewegung. Tastatur: Enter oder Leertaste bestätigt.
- **Werte:** Je Punkt Abweichung zwischen gesetztem Ort (zurückgerechnet in Grad) und Ziel, waagrecht, senkrecht und Betrag; je Durchgang Mittel. Fläche des Umrisses der äußeren gesetzten Punkte in Prozent der Fläche des Quadrats (2 · größter Winkel)², Verhältnis A/B. Zeit je Punkt. Hauptwert = gesetzte Punkte.
- **Darstellung:** Schwarzer Grund, additive Farben; Bedienung neutral hellgrau und nie nur an der Farbe; Karte unterscheidet die Durchgänge durch Linienart und Form. Kein Flackern, keine Blitze. Prüfbild im Intro (einfach oder Schritt für Schritt: Brille, je ein Auge zuhalten, Glas wählen, Helligkeit je Farbe einstellen), ohne Wertung.
- **Tipp:** bei verkleinertem Raster Hinweis auf den tatsächlichen Winkel; bei vielen Punkten Hinweis auf Pausen; sonst „auf das Ziel schauen, nicht auf den Zeiger“.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Prinzip:** Der Hess-Schirm wurde 1908 von Walter Rudolf Hess entworfen: Komplementäre Rot-Grün-Filter trennen die Bilder; ein rotes Ziel steht an jedem Kreuzungspunkt eines Koordinatennetzes, die Person setzt ein grünes Licht darauf; mit dem anderen Auge wiederholt, entsteht eine Karte mit innerem und äußerem Bereich je Auge (Roper-Hall 2006). Der verwandte Lancaster-Rot-Grün-Test (1939) ist beidäugig, trennend und subjektiv, für die neun Hauptblickrichtungen (Christoff & Guyton 2006).
- **Digitale Näherung:** Statt Lichtzeiger ein Zeiger per Finger oder Maus, statt Leinwand ein Bildschirm, Projektion auf eine ebene Fläche; deshalb sind die Werte nicht mit denen des klassischen Verfahrens austauschbar, und die App deutet nichts.
- **Sicherheit und Barrierefreiheit:** Warnzeichen nach Muchnick 2008 (S. 6, 28); Hinweis auf Rot-Grün-Farbsehschwäche (Birch 2012); keine Richtwerte.

## 4. Optische und okulomotorische Grundlagen

- **Trennung der Bilder:** Durch das Rotglas sieht ein Auge nur Rotes, durch das Grün-, Cyan- oder Blauglas das andere Auge nur die zweite Farbe. Auf schwarzem Grund ist ein rotes Zeichen für das zweite Auge unsichtbar und umgekehrt. Weil es kein gemeinsames Bild gibt, fehlt der Reiz, die Bilder zu einem zu verschmelzen; so lässt sich die Stellung jedes Auges getrennt darstellen – nach Lancaster die Forderung an ein gutes Verfahren (Christoff & Guyton 2006).
- **Blickwinkel und Fläche:** Ort = Abstand · tan(Winkel). Bei 40 cm Abstand liegt ein Punkt bei 20° rund 14,6 cm neben der Mitte. Auf einem 11-Zoll-Tablet im Querformat (etwa 23 × 16 cm Bildfläche) sind bei 40 cm mit 1,5 cm Rand waagrecht höchstens etwa 14°, senkrecht nach Abzug der Bedienleisten deutlich weniger erreichbar (gerechnet); das Raster wird dann verkleinert. Große Winkel brauchen einen großen Bildschirm.
- **Fixation:** Die Aufgabe verlangt, das Ziel ruhig zu fixieren und den Zeiger nur mit dem anderen Auge wahrzunehmen; Blicksprünge zum Zeiger verfälschen das Setzen.
- **Pixel:** Am 11-Zoll-Tablet (etwa 52 Pixel je cm) entspricht 1 Pixel bei 40 cm etwa 0,03°; die Auflösung begrenzt die Werte kaum, wohl aber Zeigegenauigkeit und Fingerbreite.
- **Brille:** Korrekturbrille unter der Rot-Grün-Brille (Überbrille). Bei Gleitsicht sind Randpunkte nur mit Kopfbewegung scharf; der Kopf soll aber ruhig bleiben – Abstand und Brille so wählen, dass die Punkte scharf genug sind.
- **Nähe und Dauer:** Ein volles Raster mit zwei Durchgängen sind 50 Punkte in Bildschirmnähe; das ist anstrengend, Pausen zwischen den Durchgängen sind sinnvoll.

## 5. Neurowissenschaftliche Grundlagen

- **Augenbewegungen in Blickrichtungen:** Wie die Augenbewegungen in verschiedenen Blickrichtungen klinisch geprüft werden (H-Muster; betrifft die Hirnnerven III, IV und VI), steht im Lehrbuch (Muchnick 2008, S. 32–35). Diese Übung ist keine solche Prüfung.
- **Getrennte Bilder:** Bei getrennten Bildern meldet jedes Auge seinen Ort für sich; die Person verknüpft die beiden Wahrnehmungen, indem sie den Zeiger des einen Auges auf das Ziel des anderen legt. Was ein Abstand zwischen beiden bedeutet, gehört in die Hand von Fachleuten.
- **Klinischer Hintergrund:** In einer kleinen Fallserie mit neun Personen (je drei mit beidseitiger bzw. einseitiger Lähmung des vierten Hirnnervs und drei Gesunde) wurde das Hess-Lancaster-Verfahren mit geneigtem Kopf als Hilfsmittel bei der Abklärung beschrieben (Armesto et al. 2008). Daraus folgt nichts für diese Bildschirmfassung.
- **Keine Aussage über Hirnregionen** oder über eine „Stärkung“ von Augenmuskeln.

## 6. Motorische Grundlagen

Der Zeiger wird gezogen oder angetippt und mit „OK“ bestätigt; Tempo spielt keine Rolle. Gefordert sind Auge-Hand-Abstimmung und Genauigkeit beim Ablegen. Der Finger verdeckt den Zeiger und ist dicker als ein kleines Ziel; Maus oder Stift sind genauer. Ein leichter Tremor stört wenig, weil man nachkorrigieren kann, bevor man bestätigt. Tastatur nur zum Bestätigen.

## 7. Einflussfaktoren und Messgrenzen

- **Brille und Farben:** Sitzt das Glas auf der anderen Seite als eingestellt, sind die Namen der Augen vertauscht. Übersprechen (ein Auge sieht beide Farben schwach, „Geisterbild“) hängt von Brille, Bildschirm, Helligkeit und Raumlicht ab; dafür gibt es das Prüfbild und die Helligkeit je Farbe. Rot-Cyan-Brillen funktionieren mit dem Farbpaar Rot–Blau.
- **Kalibrierung und Abstand:** Ohne Kalibrierung sind Winkel nur geschätzt; ein anderer Abstand als angegeben verändert alle Winkel. Kopfdrehung oder -neigung verschiebt die Blickrichtungen.
- **Ebene Fläche:** Die Projektion auf den flachen Bildschirm entspricht nicht der Geometrie einer klassischen Leinwand; auf kleinen Bildschirmen ist das Raster verkleinert.
- **Eingabe:** Touch-Verzögerung (Pronk et al. 2020) und Fingerbreite; Zeit je Punkt nur als Selbstvergleich.
- **Nicht gemessen:** ob die Brille getragen wird, wohin man schaut, ob der Kopf ruhig bleibt.
- **Farbsehen:** Eine Rot-Grün-Farbsehschwäche haben bei Menschen europäischer Herkunft etwa 8 % der Männer und etwa 0,4 % der Frauen (Birch 2012); für sie passt die Übung nicht.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – fehlend:** Für diese digitale Näherung gibt es keine Studie. Die Übung ist als Funktionsübung gedacht, nicht als Training mit Leistungssteigerung; die Werte sind keine Leistung.
- **Naher Transfer – fehlend**, **Alltagstransfer – fehlend:** Ein Nutzen für Lesen, Sport, Verkehr oder das Sehen im Alltag ist nicht belegt.
- **Einordnung:** Das klassische Verfahren ist beschrieben (Roper-Hall 2006; Christoff & Guyton 2006); die Bildschirmwerte sind damit nicht austauschbar. Keine Richtwerte, keine Deutung.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand das Prinzip getrennter Bilder (Hess/Lancaster) ruhig und ohne Zeitdruck erfahren möchte; eine Funktionsübung mit ruhigem Fixieren und genauem Zeigen gesucht ist; eine Rot-Grün-Brille und ein kalibrierter, möglichst großer Bildschirm vorhanden sind.
- **Weniger passend, wenn …** ein Befund, eine Diagnose oder ein Normvergleich erwartet wird; eine Rot-Grün-Farbsehschwäche besteht; nur wenig Zeit ist; kleine Kinder üben sollen.
- **Vorsicht / anpassen bei …**
  - `farbsehschwaeche`: Farben werden falsch getrennt; Übung passt nicht.
  - `schielen_binokular`, `amblyopie`, `nystagmus`: getrennte Bilder können Doppelbilder oder Unruhe auslösen; das Ergebnis nicht als Aussage über die Augen lesen. Neu aufgetretene Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung und Schwindel gehören ärztlich abgeklärt (Muchnick 2008, S. 6, 28).
  - `kopfschmerz_asthenopie`: kurzes inneres Raster, ein Durchgang, Pausen.
  - `photosensitive_epilepsie`: nur nach Rücksprache; die Übung hat kein Flackern und keine Blitze.
  - `presbyopie_gleitsicht`, `sehbehinderung_niedriger_visus`: größere Ziele, kleinerer Winkel, passende Nahkorrektur unter der Rot-Grün-Brille.
  - `kinder_unter_6`: Bedienung und Selbstbeobachtung zu anspruchsvoll; nicht untersucht.
- **Kombiniert gut mit …** 932 (Diplopie-Karte, neun Blickrichtungen), 931 (Schober-Kreuz im Ring), 930 (Worth-Vier-Punkte) – alle mit derselben Brille und demselben Prüfbild.
- Keine Diagnosen, keine Heilversprechen; immer als Funktionsübung nach dem Prinzip des klassischen Verfahrens darstellen, kein Ersatz für die Untersuchung.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Bildschirmgröße:** Auf Tablets wird das Raster stark verkleinert; ein großer Bildschirm oder ein kürzerer, genau angegebener Abstand wäre nötig, um große Winkel zu erreichen.
- **Zeigen per Finger:** verdeckt den Zeiger; Stift oder Maus empfehlen.
- **Übersprechen der Farben:** hängt von Gerät und Brille ab; das Prüfbild hilft, prüft aber nicht objektiv.
- **Keine Kontrolle von Kopf und Blick:** bleibt eine Grenze; in Texten ehrlich halten (so in `texts.ts` und `science.ts`).

## 11. Quellen

### Von der Website angegeben
keine (eigene Übung)

### Weitere Fachliteratur
- Roper-Hall, G. (2006). The Hess screen test. *American Orthoptic Journal, 56*(1), 166–174. https://doi.org/10.3368/aoj.56.1.166 – Aufbau und Prinzip des Hess-Schirms (Crossref geprüft)
- Christoff, A., & Guyton, D. L. (2006). The Lancaster red-green test. *American Orthoptic Journal, 56*(1), 157–165. https://doi.org/10.3368/aoj.56.1.157 – beidäugiges, trennendes, subjektives Verfahren; Fixation jedes Auges ohne Fusionsreiz (Crossref geprüft)
- Armesto, A., Ugrin, M. C., Travelletti, E., Schlaen, A., & Piantanida, N. (2008). Hess Lancaster screen test with the head tilted: A useful test in the diagnosis of bilateral fourth nerve palsies. *European Journal of Ophthalmology, 18*(2), 278–281. https://doi.org/10.1177/112067210801800217 – kleine Fallserie (Crossref geprüft)
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Rot-Grün-Farbsehschwäche (Crossref geprüft)
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touchscreens messen Zeiten zu lang (Crossref geprüft)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28), H-Muster der Augenbewegungsprüfung (S. 32–35)
