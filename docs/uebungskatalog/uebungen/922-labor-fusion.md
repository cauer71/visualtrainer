---
# ===== Kennung =====
nr: 922
kennung: labor-fusion
name: "Fusion – Bilder verschmelzen (Versatz mit Rot-Grün-Brille, Doppelt und wieder einfach melden)"
name_original: "– (eigene Blickfit-Labor-Übung, kein Vorbild)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-fusion", name: "Fusion – Bilder verschmelzen", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Mit einer Rot-Grün-Brille sieht jedes Auge ein Ziel aus zwei Ringen und einem Mittelpunkt in seiner Farbe. Der Versatz der beiden Bilder wächst langsam (in Prismendioptrien), bis man „Doppelt“ meldet, und schrumpft dann, bis man „Wieder einfach“ meldet – in Richtung Konvergenz, Divergenz oder im Wechsel. Tempo, Obergrenze, Wiederholungen, Zielgröße und Farben stellt man selbst ein; eine Trainerin oder ein Trainer kann den Versatz auch selbst führen. Die Werte sind Übungswerte, keine Prismenmessung."
ziel_funktionen: [naharbeit_dauer, fixation, daueraufmerksamkeit]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 150
schwierigkeit_anpassung: "Keine Stufen und keine automatische Anpassung; alles über Einstellungen (maßgeblich ist PARAMS in src/exercises/labor-fusion/logic.ts): Richtung (im Wechsel, nur Konvergenz, nur Divergenz), Versatzsteuerung (automatisch mit 0,5–6 Δ pro Sekunde, Standard 1,5; oder nur Trainer-Regler), Startversatz (0–10 Δ, Standard 0), Obergrenze (5–40 Δ, Standard 25; auf kleinen Bildschirmen begrenzt), Wiederholungen je Richtung (1–6, Standard 3), Zieldurchmesser (2–14 cm, Standard 6), Farbpaar und Helligkeit je Farbe, Prüfbild im Intro. Leichter laut Texten: langsamer, größeres Ziel, eine Richtung, kleine Obergrenze; schwerer: schneller, kleineres Ziel (3–4 cm), beide Richtungen, mehr Wiederholungen. Trainer-Regler: höchstens 2 Δ je Tastendruck, bei „automatisch“ als Zusatz, bei „Trainer“ allein bestimmend."
messgroessen: ["„Doppelt“ gemeldet bei (Mittel, in Δ) gesamt und je Richtung", "„Wieder einfach“ gemeldet bei (Mittel, in Δ) je Richtung", "Abgeschlossene Durchgänge; Durchgänge bis zur Obergrenze ohne „Doppelt“; Durchgänge ohne „Wieder einfach“", "Meldungen „Strich fehlt“ je Farbe (Hinweis, kein Befund)", "Obergrenze und Zieldurchmesser in Δ, cm und px; Änderungen am Trainer-Regler mit Zeitpunkt", "Übungswerte: keine Prismenmessung, keine Fusionsbreite, keine Normwerte; ein höherer Wert ist nicht „besser“"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Fusion und fusionale Vergenz haben keinen eigenen Schlüssel; sie sind unter naharbeit_dauer (Vergenz in Bildschirmdistanz) eingeordnet.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 1
    farbunterscheidung: 2
    stereosehen: 1
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 0
    fixation: 3
    bewegungswahrnehmung: 1
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 0
    naharbeit_dauer: 3
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 1
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 0
    antizipation: 0
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
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
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Rot-Grün-Brille (oder Rot-Cyan-Brille mit dem Farbpaar Rot–Blau), bei Korrekturbrille als Überbrille", "Keine Rot-Grün-Farbsehschwäche; Prüfbild im Intro Schritt für Schritt (je ein Auge zuhalten, Glas wählen, Helligkeit je Farbe einstellen)", "Bildschirm kalibriert und Sehentfernung eingetragen, sonst sind Δ, cm und px nur geschätzt", "Gedämpftes Raumlicht, Nachtmodus und Farbfilter aus, Abstand etwa 40 cm, Kopf ruhig", "Ehrlich beim ersten Anzeichen „Doppelt“ melden können"]
vorsicht_bei: [farbsehschwaeche, schielen_binokular, amblyopie, nystagmus, kopfschmerz_asthenopie, schwindel_vestibulaer, presbyopie_gleitsicht, trockenes_auge_bildschirm, kinder_unter_6]
geeignet_fuer: ["Unter Anleitung das Zusammenspiel beider Augen bei langsam wachsendem Versatz üben, mit eigener Meldung von „Doppelt“ und „Wieder einfach“", "Trainerin oder Trainer führt den Versatz mit dem Regler selbst und sieht jede Änderung im Ergebnis", "Vergleich mit sich selbst bei gleichen Einstellungen, auf demselben Gerät und im gleichen Abstand, je Richtung getrennt", "Vorführung des Prinzips getrennter Bilder für beide Augen – ohne Wirkanspruch und ohne Befund"]
weniger_geeignet_fuer: ["Prismenmessung, Bestimmung einer Fusionsbreite oder von Bruch- und Erholungspunkten als Befund", "Ersatz einer orthoptischen oder optometrischen Untersuchung", "Menschen mit Rot-Grün-Farbsehschwäche", "Üben ohne Absprache bei Schielen, Doppelbildern oder Beschwerden", "Diagnose, Therapie oder Normvergleich"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: unklar
  alltag_transfer: fehlend
  kommentar: "Für genau diese Aufgabe gibt es keine Studie. Fusionale Vergenz änderte sich bei Konvergenzinsuffizienz in betreuten Praxisprogrammen mit Übungen zu Hause am deutlichsten (CITT 2008; Scheiman et al. 2005); in CITT 2008 lagen Computerübungen zu Hause (33 % erfolgreich oder gebessert) etwa gleichauf mit Placebo (35 %). Für Menschen ohne Befund ist kein Nutzen belegt; die gemeldeten Werte hängen stark von Gerät, Abstand, Tempo und dem eigenen Meldekriterium ab."
aehnliche_uebungen: [921, 923]
stichworte: ["Fusion", "fusionale Vergenz", "Konvergenz", "Divergenz", "Prismendioptrie", "Rot-Grün-Brille", "Anaglyphe", "Doppelbilder melden", "Bruch und Erholung (nur Übungswerte)", "Trainer-Regler", "keine Prismenmessung"]
---

# 922 · Fusion – Bilder verschmelzen (Versatz mit Rot-Grün-Brille, Doppelt und wieder einfach melden)

> Original: – (eigene Blickfit-Labor-Übung, kein Vorbild) · Blickfit: „Fusion – Bilder verschmelzen“ (`src/exercises/labor-fusion/`, Kategorie Wahrnehmung, Labor)

## 1. Kurzbeschreibung

Man trägt eine Rot-Grün-Brille und sieht ein Ziel aus zwei Ringen mit Mittelpunkt; das eine Auge sieht es rot, das andere grün (wahlweise cyan oder blau). Solange beide Bilder zusammenpassen, sieht man ein einziges Ziel. Dann werden die beiden Bilder langsam gegeneinander verschoben: Bei Konvergenz rückt das Ziel scheinbar näher und die Augen drehen nach innen, bei Divergenz rückt es scheinbar weg und die Augen drehen nach außen. Sobald das Ziel doppelt wird, tippt man „Doppelt“; danach wird der Versatz kleiner, und man tippt „Wieder einfach“, sobald es wieder ein Ziel ist. Der Versatz steht in Prismendioptrien (Δ; 1 Δ lenkt auf 1 m um 1 cm ab) und wird mit der Sehentfernung aus der Kalibrierung umgerechnet. Einstellbar sind Richtung, Tempo (0,5–6 Δ/s), Startversatz, Obergrenze (bis 40 Δ), Wiederholungen, Zielgröße und Farben; im Trainer-Modus bestimmt allein ein Regler den Versatz. Kontrollstriche (rot oben, zweite Farbe unten) zeigen, ob beide Bilder ankommen. Die Werte sind Übungswerte zum Vergleich mit sich selbst, keine Prismenmessung und kein Ersatz für eine Untersuchung.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts`, `layout.ts`, `texts.ts` und `science.ts` in `src/exercises/labor-fusion/` sowie `_shared/anaglyph.ts` (Stand 05.10.2026).

- **Reihenfolge:** je Wiederholung beide Richtungen im Wechsel (Konvergenz, dann Divergenz) oder nur die gewählte; Standard 3 Wiederholungen, also 6 Durchgänge. Schnellmodus: 1 Wiederholung.
- **Durchgang:** Das Bild steht 1500 ms einfach („Halte das Bild ruhig …“) → Versatz wächst vom Startversatz mit Δ/s, bis „Doppelt“ gemeldet wird oder die Obergrenze erreicht ist → Versatz schrumpft, bis „Wieder einfach“ gemeldet wird oder 0 erreicht ist. Gespeichert wird immer der Wert, der in diesem Moment angezeigt wird. Ohne Meldung bis zur Obergrenze bzw. bis 0 wird der Durchgang markiert und zählt nicht in die Mittelwerte.
- **Steuerung:** „automatisch“ (Rampe, der Trainer-Regler legt einen Zusatz darauf, der in jedem Durchgang bei 0 beginnt) oder „Trainer“ (nur der Regler, Start beim Startversatz; ohne Regler läuft die Übung automatisch). Regler höchstens 2 Δ je Tastendruck, Schritt 0,5 Δ, Anzeige gleitet; jede Änderung wird mit Zeitpunkt protokolliert.
- **Bedienung:** große Tasten „Doppelt“ / „Wieder einfach“ und „Strich fehlt“ je Farbe; Tastatur: Leertaste oder Eingabe für die Haupttaste, Pfeil hoch/runter für „Strich fehlt“.
- **Größen:** Zieldurchmesser 2–14 cm, Obergrenze höchstens 40 Δ; auf kleinen Bildschirmen werden Ziel und Obergrenze begrenzt, damit beide Bilder passen (im Ergebnis ausgewiesen).
- **Ergebnis:** Mittel „Doppelt“ und „Wieder einfach“ je Richtung, Zahl der Durchgänge bis zur Obergrenze und ohne Erholung, Kontrollstrich-Meldungen, Umrechnung von Δ in cm und px. Verlauf nur bei gleichen Einstellungen.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Prinzip:** Wird das Bild für ein Auge seitlich gegen das des anderen verschoben, müssen die Augen ihre Vergenz ändern, um ein einfaches Bild zu behalten (fusionale Vergenz). Wo das nicht mehr gelingt, wird das Bild doppelt; beim Zurückführen wird es wieder einfach. In der Untersuchung wird das mit Prismen geprüft; hier ist es eine Übungsform am Bildschirm ohne Messanspruch.
- **Rampe statt Sprung:** Ein langsam wachsender Versatz lässt Zeit, den Moment des Doppeltwerdens zu bemerken; Erfahrungswissen der funktionellen Optometrie (klein anfangen, beim ersten Anzeichen melden, Pausen), nicht durch Studien belegt.
- **Ziel mit groben und feinen Teilen:** Wie weit zwei Bilder auseinanderliegen dürfen und trotzdem einfach erscheinen, hängt von der Feinheit der Struktur ab (Schor et al. 1984); Ringe und Mittelpunkt bieten beides. Kontrollstriche, die nur ein Auge sieht, zeigen, ob beide Bilder ankommen.
- **Studienlage zur Vergenz:** Betreute Programme bei Konvergenzinsuffizienz (CITT 2008; Scheiman et al. 2005); eine Übertragung auf diese Aufgabe ist nicht untersucht.
- **Was nicht belegt ist:** ein Nutzen für Menschen ohne Befund, eine Behandlung, eine Messung der Fusionsbreite.

## 4. Optische und okulomotorische Grundlagen

- **Umrechnung:** 1 Δ entspricht bei 40 cm etwa 0,4 cm Abstand zwischen den Bildern; die Obergrenze von 25 Δ also etwa 10 cm, 40 Δ etwa 16 cm. Am Tablet (rund 52 px/cm) ist der Versatz in Schritten von etwa 0,05 Δ einstellbar; bei kleinen Werten begrenzt die Pixelgröße die Feinheit.
- **Fusionale Vergenz:** Solange der Versatz klein ist, gleichen die Augen ihn durch eine Vergenzbewegung aus und das Bild bleibt einfach; kleine Reste werden von der Wahrnehmung verschmolzen. Wird der Versatz größer, als Vergenz und Verschmelzung zusammen ausgleichen können, erscheint das Bild doppelt.
- **Zielgröße:** Grobe Strukturen lassen sich über größere Versätze verschmelzen als feine (Schor et al. 1984); ein großes Ziel mit breiten Ringen ist daher leichter als ein kleines.
- **Vergenz und Akkommodation:** Die Scharfstellung bleibt auf dem Bildschirm (in 40 cm etwa 2,5 dpt), während die Vergenz dem Versatz folgt. Diese Entkopplung erschwert an Bildschirmen das Verschmelzen und führt zu Beschwerden und Ermüdung (Hoffman et al. 2008); die Werte hängen deshalb auch von Akkommodation und Brille ab.
- **Farbfilter:** Die Trennung ist nie vollständig (Übersprechen, Geisterbild); Rot und Grün erscheinen durch die Filter verschieden hell. Die Helligkeit je Farbe ist einstellbar.
- **Brillenträger und Alter:** Überbrille nötig; ab etwa Mitte 40 lässt die Akkommodation nach (Charman 2008), Gleitsichtgläser haben einen schmalen scharfen Bereich (Han et al. 2003). Am Bildschirm sinkt die Lidschlagrate (Portello et al. 2013).
- **Farbsehen:** Rot-Grün-Farbsehschwäche bei etwa 8 % der Männer und 0,4 % der Frauen europäischer Herkunft (Birch 2012).

## 5. Neurowissenschaftliche Grundlagen

- **Vergenzsteuerung:** Konvergenz und Divergenz werden über eigene Steuerkreise geführt; beim Affen gibt es im Mittelhirn nahe dem Okulomotoriuskern Nervenzellen, deren Aktivität mit Konvergenz bzw. Divergenz zusammenhängt (Mays 1984).
- **Disparität als Signal:** Der Unterschied zwischen den Netzhautbildern beider Augen wird ab der primären Sehrinde von disparitätsempfindlichen Nervenzellen verarbeitet (Cumming & DeAngelis 2001); er treibt die fusionale Vergenz und ist zugleich die Grundlage des Stereosehens.
- **Wahrnehmung des Doppeltwerdens:** Ob man ein Bild doppelt sieht, ist eine Wahrnehmungsentscheidung mit eigenem Kriterium; manche melden früh, manche spät. Die Werte sind deshalb Selbstauskünfte. Eine Aussage „diese Übung trainiert Region X“ wird nicht gemacht.

## 6. Motorische Grundlagen

Außer zwei großen Tasten ist keine Handbewegung nötig; die Meldung soll ruhig beim ersten Anzeichen erfolgen, nicht möglichst schnell. Weil der Versatz weiterläuft, verschiebt eine späte Meldung den gespeicherten Wert (bei 1,5 Δ/s macht eine halbe Sekunde Verzögerung etwa 0,75 Δ aus). Die eigentliche Motorik sind die Vergenzbewegungen der Augen. Tastatur als Alternative.

## 7. Einflussfaktoren und Messgrenzen

- **Selbstauskunft:** Die App kann nicht prüfen, ob man wirklich doppelt sieht, die Brille trägt oder wohin man schaut. Meldekriterium, Erwartung und Übung verschieben die Werte.
- **Tempo:** Schnellere Rampen ergeben wegen Reaktions- und Touchverzögerung höhere „Doppelt“- und niedrigere „Wieder einfach“-Werte; Touchscreens messen Zeiten je nach Gerät zu lang (Pronk et al. 2020).
- **Kalibrierung und Abstand:** Δ stimmen nur bei kalibriertem Bildschirm und richtig eingetragenem Abstand; ein anderer Abstand bei gleicher Pixelverschiebung ergibt einen anderen Winkel. Ohne Kalibrierung gilt die Schätzung 38 px/cm.
- **Bildschirmgrenzen:** Auf kleinen Bildschirmen werden Ziel und Obergrenze begrenzt; Durchgänge bis zur Obergrenze sind nach oben abgeschnitten und zählen nicht in die Mittelwerte.
- **Übersprechen und Licht:** Geisterbilder, Raumlicht und Spiegelungen erleichtern oder erschweren das Doppeltsehen.
- **Ermüdung:** Wiederholte Durchgänge können die Werte verändern; kurze Durchläufe mit Pausen.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Für genau diese Aufgabe gibt es keine Studie. Werte in einer Selbstauskunftsaufgabe ändern sich mit Übung und Gewöhnung.
- **Naher Transfer – unklar:** Bei 221 Kindern (9–17 Jahre) mit Beschwerden bei Konvergenzinsuffizienz besserten sich nach 12 Wochen Beschwerden, Nahpunkt der Konvergenz und positive fusionale Vergenz im Praxisprogramm mit Übungen zu Hause am meisten; erfolgreich oder gebessert waren 73 % gegenüber 43 % (Bleistiftübungen zu Hause), 33 % (Computerübungen zu Hause) und 35 % (Placebo in der Praxis) (CITT 2008). Bei 46 jungen Erwachsenen änderten sich Nahpunkt und fusionale Vergenz nur im Praxisprogramm deutlich; die Beschwerden besserten sich in allen Gruppen, und 58 % der Praxisgruppe hatten am Ende noch Beschwerden (Scheiman et al. 2005). Das waren betreute Programme mit mehreren Aufgaben, keine Aufgabe wie diese.
- **Alltagstransfer – fehlend:** Für Menschen ohne Befund ist kein Nutzen belegt; für Lesen, Bildschirmarbeit, Sport oder Verkehr gibt es keinen Beleg.
- **Einordnung:** Übungsform mit Selbstauskunft; die Werte dienen dem Vergleich mit sich selbst bei gleichen Einstellungen, keine Normwerte, und ein höherer Wert ist nicht „besser“.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** unter Anleitung eine ruhige Aufgabe zum Zusammenspiel beider Augen mit Filterbrille gesucht wird; eine Fachperson den Versatz selbst führen möchte; die Person Doppelbilder ehrlich melden kann; kein Zeitdruck gewünscht ist.
- **Weniger passend, wenn …** gemessen oder beurteilt werden soll (Prismenmessung, Fusionsbreite); eine Rot-Grün-Farbsehschwäche besteht; ohne Anleitung bei bekannten Beschwerden geübt werden soll.
- **Vorsicht / anpassen bei …**
  - `schielen_binokular`, `amblyopie`, `nystagmus`: nur nach Absprache mit der behandelnden Fachperson oder gar nicht; Ergebnisse nicht als Aussage über das Auge lesen.
  - `kopfschmerz_asthenopie`, `schwindel_vestibulaer`: kleine Obergrenze, langsames Tempo, Pausen; bleibt das Bild doppelt oder treten Schwindel, Kopf- oder Augenschmerz auf, aufhören und abklären lassen (Muchnick 2008, S. 6, 28).
  - `farbsehschwaeche`: Farbtrennung nicht verlässlich; nicht verwenden.
  - `presbyopie_gleitsicht`, `trockenes_auge_bildschirm`: Überbrille, passender Abstand, Pausen und bewusstes Blinzeln.
  - `kinder_unter_6`: zuverlässige Meldung von Doppelbildern nötig; nicht untersucht.
- **Kombiniert gut mit …** 921 (Lesen mit getrennten Bildern, optional kleiner Versatz), 923 (Tiefe mit Zufallspunkten).
- Keine Diagnosen, keine Heilversprechen; keine Prismenmessung, kein Ersatz für eine Untersuchung.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Selbstauskunft ohne Gegenprobe:** Es gibt keine Fangdurchgänge; ein Durchgang ohne Versatzänderung könnte zeigen, wie zuverlässig gemeldet wird.
- **Tempoabhängigkeit:** Die gespeicherten Werte enthalten die Reaktionszeit; bei hohem Tempo deutlich verschoben.
- **Geräte- und Abstandsabhängigkeit:** Vergleich nur bei gleicher Kalibrierung und gleichem Abstand sinnvoll; das steht im Ergebnis.
- **Grenzen nur gerechnet:** Obergrenze, Tempo und Wiederholungen sind nicht an Menschen geprüft.

## 11. Quellen

### Von der Website angegeben
keine (eigene Übung)

### Weitere Fachliteratur
- Convergence Insufficiency Treatment Trial Study Group (2008). Randomized clinical trial of treatments for symptomatic convergence insufficiency in children. *Archives of Ophthalmology, 126*(10), 1336–1349. https://doi.org/10.1001/archopht.126.10.1336 – Vergenzübungen bei Konvergenzinsuffizienz (Crossref geprüft)
- Scheiman, M., Mitchell, G. L., Cotter, S., Kulp, M. T., Cooper, J., Rouse, M., Borsting, E., London, R., & Wensveen, J. (2005). A randomized clinical trial of vision therapy/orthoptics versus pencil pushups for the treatment of convergence insufficiency in young adults. *Optometry and Vision Science, 82*(7), 583–595. https://doi.org/10.1097/01.opx.0000171331.36871.2f – Vergenzübungen bei jungen Erwachsenen (Crossref geprüft)
- Schor, C., Wood, I., & Ogawa, J. (1984). Binocular sensory fusion is limited by spatial resolution. *Vision Research, 24*(7), 661–665. https://doi.org/10.1016/0042-6989(84)90207-4 – Grenzen der Verschmelzung hängen von der Feinheit der Struktur ab (Crossref geprüft)
- Hoffman, D. M., Girshick, A. R., Akeley, K., & Banks, M. S. (2008). Vergence–accommodation conflicts hinder visual performance and cause visual fatigue. *Journal of Vision, 8*(3), 33. https://doi.org/10.1167/8.3.33 – Konflikt zwischen Vergenz und Scharfstellung am Bildschirm (Crossref geprüft)
- Mays, L. E. (1984). Neural control of vergence eye movements: Convergence and divergence neurons in midbrain. *Journal of Neurophysiology, 51*(5), 1091–1108. https://doi.org/10.1152/jn.1984.51.5.1091 – Vergenzsteuerung im Mittelhirn (Crossref geprüft)
- Cumming, B. G., & DeAngelis, G. C. (2001). The physiology of stereopsis. *Annual Review of Neuroscience, 24*, 203–238. https://doi.org/10.1146/annurev.neuro.24.1.203 – Disparitätsverarbeitung in der Sehrinde (Crossref geprüft)
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Rot-Grün-Farbsehschwäche (Crossref geprüft)
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry, 91*(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Akkommodation und Presbyopie (Crossref geprüft)
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm (Crossref geprüft)
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science, 90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag am Bildschirm (Crossref geprüft)
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touchscreens messen Zeiten zu lang (Crossref geprüft)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
