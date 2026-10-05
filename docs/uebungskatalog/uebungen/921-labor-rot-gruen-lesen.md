---
# ===== Kennung =====
nr: 921
kennung: labor-rot-gruen-lesen
name: "Rot-Grün-Lesen (Zeichenfolge in zwei Farben mit Rot-Grün-Brille lesen und eintippen)"
name_original: "– (eigene Blickfit-Labor-Übung, kein Vorbild)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-rot-gruen-lesen", name: "Rot-Grün-Lesen", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Auf Schwarz steht eine Folge aus Ziffern oder Buchstaben, die Zeichen sind abwechselnd oder gemischt rot und grün (wahlweise cyan oder blau). Mit einer Rot-Grün-Brille sieht jedes Auge nur die Zeichen seiner Farbe hell; man liest die ganze Folge mit beiden Augen und tippt sie der Reihe nach ein, nicht Gesehenes mit „?“. Länge, Zeichenart, Größe in cm, Farbverteilung, Anzeigedauer und Farben stellt man selbst ein; optional ein Versatz der beiden Farbbilder in Prismendioptrien."
ziel_funktionen: [naharbeit_dauer, sehschaerfe_detail, kurzzeitgedaechtnis_verbal]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 120
schwierigkeit_anpassung: "Keine Stufen und keine automatische Anpassung; alles über Einstellungen (maßgeblich ist PARAMS in src/exercises/labor-rot-gruen-lesen/logic.ts): Zeichenart (Ziffern, Buchstaben ohne leicht verwechselbare, gemischt), Länge der Folge (4–12 Zeichen, Standard 6), Zeichenhöhe (0,6–4 cm, Standard 1,2 cm ≈ 1,7° bei 40 cm), Verteilung der Farben (abwechselnd oder zufällig mit mindestens einem Drittel je Farbe), Anzeigedauer (unbegrenzt, 8, 4 oder 2 s; danach aus dem Gedächtnis), Anzahl der Folgen (6–20, Standard 10), Farbpaar (Rot–Grün, Rot–Cyan, Rot–Blau), Helligkeit gemeinsam (80–100 %) und je Farbe (30–100 %), Kontrollstriche (aus/an), Versatz der Farbbilder 0–12 Δ (Konvergenz oder Divergenz, optional langsamer Aufbau über bis zu 10 Folgen; der erste Durchgang hat immer 0 Δ). In der Trainer-Ansicht kann der Versatz während der Übung verändert werden (höchstens 2 Δ je Tastendruck). Faustregel der Texte (keine Vorgabe aus der Forschung): in drei Durchläufen über 90 % ganz richtig → eine Einstellung schwerer, unter 50 % → leichter; immer nur eine Einstellung ändern."
messgroessen: ["Ganz richtige Folgen (Anzahl und Anteil)", "Richtige Zeichen (Anteil und Anzahl)", "Fehlende oder verwechselte Zeichen je Farbe (erst ab 20 Zeichen je Farbe gezeigt; Hinweis, kein Befund)", "Fehlende oder verwechselte Zeichen nach Auge (nur gültig, wenn das linke Glas richtig eingestellt ist; Hinweis, kein Befund)", "Eingabezeit je Folge (enthält bei unbegrenzter Anzeige das Lesen und die Touch-Verzögerung)", "Zeichenhöhe in cm und Sehwinkel; Anzeigedauer; Versatz in Δ, cm und px", "Kontrollstriche: Folgen mit gemeldetem fehlendem Strich je Farbe", "keine Messung von Blick, Brillensitz oder Augenstellung; keine Normwerte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Beidäugiges Zusammenarbeiten ohne Tiefe hat keinen eigenen Schlüssel; es ist unter naharbeit_dauer (Vergenz in Bildschirmdistanz) eingeordnet.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 2
    kontrast: 1
    farbunterscheidung: 2
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 1
    blickfolge: 0
    sakkaden: 2
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 3
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 2
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 0
    entscheidung_wahlreaktion: 0
    lesen_sprache: 2
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
  zeitdruck: 0
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Rot-Grün-Brille (oder Rot-Cyan-Brille mit dem Farbpaar Rot–Blau), bei Korrekturbrille als Überbrille", "Keine Rot-Grün-Farbsehschwäche; Prüfbild im Intro: mit dem roten Glas muss die grüne Fläche dunkel erscheinen und umgekehrt", "Nachtmodus und Farbfilter des Geräts aus, gedämpftes Raumlicht, keine Spiegelungen", "Bildschirm einmal kalibriert (Bankkarte) und Abstand eingetragen, sonst gelten Größen nur als Schätzung (38 px/cm, 40 cm)", "Ziffern oder lateinische Großbuchstaben sicher kennen", "Abstand etwa 40 cm, Kopf ruhig"]
vorsicht_bei: [farbsehschwaeche, schielen_binokular, amblyopie, kopfschmerz_asthenopie, schwindel_vestibulaer, presbyopie_gleitsicht, sehbehinderung_niedriger_visus, trockenes_auge_bildschirm, kinder_unter_6]
geeignet_fuer: ["Eine ruhige Leseaufgabe, bei der beide Augen beteiligt bleiben müssen: jedes Auge sieht nur einen Teil der Folge", "Einstellbare Aufgabe für Trainerin oder Trainer: Länge, Größe, Anzeigedauer, Farbverteilung und optional ein kleiner Versatz der beiden Bilder, je Schritt eine Einstellung", "Vergleich mit sich selbst bei gleichen Einstellungen auf demselben Gerät (ganz richtige Folgen, richtige Zeichen, Eingabezeit)", "Vorführung des Prinzips der Bildtrennung mit Farbfiltern in Geschäft und Beratung – ohne Wirkanspruch und ohne Befund"]
weniger_geeignet_fuer: ["Menschen mit Rot-Grün-Farbsehschwäche (die Farbtrennung funktioniert dann nicht verlässlich)", "Beurteilung des beidäugigen Sehens, einer Unterdrückung oder einer Schielstellung: die Auswertung nach Farbe und Auge ist nur ein Hinweis, kein Befund", "Prismenmessung oder Ersatz einer Untersuchung (der Versatz ist eine Übungseinstellung)", "Üben räumlicher Tiefe: alle Zeichen liegen in der Bildschirmebene", "Diagnose, Therapie oder Normvergleich"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: unklar
  alltag_transfer: fehlend
  kommentar: "Für genau diese Aufgabe gibt es keine Studie. Dichoptische Aufgaben (jedem Auge ein anderes Bild) werden bei Amblyopie untersucht; die Ergebnisse sind gemischt (Hess et al. 2010; Li et al. 2013; Tsirlin et al. 2015; Holmes et al. 2016). Vergenzübungen zeigten bei Konvergenzinsuffizienz nur in betreuten Praxisprogrammen deutliche Änderungen (CITT 2008; Scheiman et al. 2005). Für Menschen mit gesunder Binokularfunktion ist kein Nutzen belegt; in der eigenen Aufgabe wird man durch Gewöhnung an Brille, Gerät und Zeichen besser."
aehnliche_uebungen: [922, 923, 905, 602]
stichworte: ["Rot-Grün-Brille", "Anaglyphe", "dichoptisch", "beidäugig lesen", "Bildtrennung", "Zeichenfolge", "Versatz in Prismendioptrien", "Konvergenz", "Divergenz", "Kontrollstriche", "kein Stereosehen", "kein Befund"]
---

# 921 · Rot-Grün-Lesen (Zeichenfolge in zwei Farben mit Rot-Grün-Brille lesen und eintippen)

> Original: – (eigene Blickfit-Labor-Übung, kein Vorbild) · Blickfit: „Rot-Grün-Lesen“ (`src/exercises/labor-rot-gruen-lesen/`, Kategorie Wahrnehmung, Labor)

## 1. Kurzbeschreibung

Auf schwarzem Grund steht in einem hellgrauen Rahmen mit kleinem Kreuz eine Folge aus Ziffern oder Buchstaben. Ein Teil der Zeichen ist rot, der andere grün (wahlweise cyan oder blau). Mit einer Rot-Grün-Brille lässt das eine Glas nur Rot, das andere nur Grün durch: Jedes Auge sieht nur die Zeichen seiner Farbe hell, Rahmen und Kreuz sehen beide Augen. Die ganze Folge liest also nur, wer beide Augen zusammen nutzt. Man tippt die Folge auf Bildschirmtasten der Reihe nach ein, ein nicht gesehenes Zeichen mit „?“, und schließt mit „Fertig“ ab. Wichtige Einstellungen sind Länge (4–12 Zeichen), Zeichenart, Zeichenhöhe in Zentimetern (nach Kalibrierung), Verteilung der Farben, Anzeigedauer (unbegrenzt oder 8, 4, 2 s, danach aus dem Gedächtnis) und das Farbpaar mit Helligkeit je Farbe. Optional kommen Kontrollstriche (ein roter Strich über, einer in der zweiten Farbe unter der Folge) und ein Versatz der beiden Farbbilder in Prismendioptrien hinzu. Gezählt wird nur, was eingetippt wird; die Auswertung nach Farbe und Auge ist ein Hinweis, kein Befund.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts`, `layout.ts`, `texts.ts` und `science.ts` in `src/exercises/labor-rot-gruen-lesen/` sowie `_shared/anaglyph.ts` (Stand 05.10.2026).

- **Durchgang:** Rahmen und Kreuz allein (900 ms) → Folge sichtbar (bei begrenzter Anzeige nur 8, 4 oder 2 s, dann ausgeblendet) → Eingabe über Bildschirmtasten (Zeichenvorrat plus „?“, „Löschen“, „Fertig“; Tastatur: Zeichen, Rücktaste, Eingabe, Pfeil hoch/runter für „Strich fehlt“) → ruhige Rückmeldung (1500 ms, ✓/✗ als Zeichen, „k von n Zeichen richtig“). Standard: 10 Folgen; Schnellmodus 2 Folgen.
- **Zeichen:** Ziffern 0–9; Buchstaben ohne leicht verwechselbare (A D E F H K L M N P R T U Z); gemischt ohne einander ähnliche (2–7, 9 und A D E F H K L M N P R T U). Innerhalb einer Folge kein Zeichen doppelt, solange der Vorrat reicht; dieselbe Folge nie zweimal hintereinander.
- **Farben:** reines Rot (255, 0, 0) und reines Grün (0, 255, 0), Cyan (0, 255, 255) oder Blau (0, 160, 255); Helligkeit gemeinsam 80–100 % und je Farbe 30–100 % in Schritten von 10 %. Abwechselnd (zufälliger Start) oder zufällig mit mindestens einem Drittel je Farbe.
- **Größe:** Zeichenhöhe in cm über die Kalibrierung (Bankkarte; ohne Kalibrierung 38 px/cm geschätzt), im Ergebnis mit Sehwinkel bei der eingetragenen Sehentfernung (30–100 cm, Standard 40 cm); verkleinert, wenn die Folge sonst nicht passt.
- **Versatz (optional):** 0–12 Δ, Konvergenz (gekreuzt) oder Divergenz; Umrechnung 1 Δ = 1 cm auf 1 m, also cm = Δ × Sehentfernung / 100, dann in px. Erster Durchgang immer 0 Δ; optional wächst der Versatz über bis zu 10 Folgen. Die Zeichen rücken so weit auseinander, dass sich versetzte Zeichen nie überlappen; auf kleinen Bildschirmen wird der Versatz begrenzt. Trainer-Regler am Rand (Zusatz, höchstens 2 Δ je Tastendruck, jede Änderung mit Zeit protokolliert).
- **Auswertung:** je Zeichen „richtig“, „verwechselt“ oder „fehlend“; je Farbe und je Auge (Zuordnung über die Einstellung „Linkes Glas“) erst ab 20 Zeichen je Farbe; Unterschied unter 10 Prozentpunkten gilt als „kein deutlicher Unterschied“ (Faustregel der Übung). Verlauf und Bestwert vergleichen nur Durchläufe mit gleichen Einstellungen.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Prinzip:** Farbfilterbrillen trennen zwei Bilder auf einem Bildschirm, so dass jedes Auge ein eigenes Bild erhält (dichoptische Darbietung). Solche Aufgaben werden in der Forschung bei Amblyopie untersucht (Hess et al. 2010; Li et al. 2013; Tsirlin et al. 2015; Levi et al. 2015); die Ergebnisse sind gemischt (Holmes et al. 2016).
- **Gemeinsamer Rahmen:** Zeichen, die beide Augen sehen (Rahmen, Kreuz), sollen die Bilder zusammenhalten – Erfahrungswissen der funktionellen Optometrie, nicht durch Studien belegt.
- **Lesen statt bloßem Schauen:** Ob beide Augen beteiligt sind, lässt sich ohne Messung nicht prüfen; eine Folge, deren Zeichen auf beide Augen verteilt sind, macht das Ergebnis wenigstens von beiden Bildern abhängig. „?“ hält die Stelle, damit Fehlendes und Verwechseltes getrennt gezählt werden können.
- **Versatz:** Ein seitlicher Versatz der beiden Bilder verlangt eine Vergenzänderung bei gleichbleibender Scharfstellung auf den Bildschirm. Vergenz wird in Studien bei Konvergenzinsuffizienz in betreuten Programmen geübt (CITT 2008; Scheiman et al. 2005); eine Übertragung auf diese Aufgabe ist nicht untersucht.
- **Was nicht belegt ist:** ein Nutzen für Lesen, Alltag oder Sport, ein Abbau von Unterdrückung, eine Behandlung. Solche Aussagen werden nicht gemacht.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Bei 40 cm Abstand entspricht 1,2 cm Zeichenhöhe etwa 1,7°, 0,6 cm etwa 0,86°, 4 cm etwa 5,7°. Die Zeichen sind damit auch bei kleinster Einstellung deutlich größer als die Auflösungsgrenze bei normalem Visus; bei herabgesetztem Visus oder unscharfer Nahsicht bestimmt aber die Größe die Aufgabe.
- **Farbfilter:** Ein Rotfilter lässt rotes Licht durch und dunkelt grünes ab, ein Grün- oder Cyanfilter umgekehrt. Die Trennung ist nie vollständig: Je nach Brille, Bildschirm und Helligkeit sieht ein Auge die Zeichen der anderen Farbe schwach mit (Übersprechen, „Geisterbild“). Deshalb lässt sich die Helligkeit je Farbe getrennt einstellen, und das Prüfbild im Intro zeigt, ob die Fläche der anderen Farbe fast verschwindet. Rot und Grün erscheinen durch die Filter zudem verschieden hell; beide Augen bekommen also nicht gleich helle Bilder.
- **Kein Stereo:** Ohne Versatz liegen die Zeichen für beide Augen an derselben Stelle der Bildschirmebene; es entsteht keine räumliche Tiefe.
- **Vergenz und Akkommodation:** In 40 cm sind etwa 2,5 dpt Akkommodation bzw. eine Nahkorrektur nötig. Mit Versatz müssen die Augen stärker nach innen (Konvergenz) oder außen (Divergenz) drehen, während die Scharfstellung auf dem Bildschirm bleibt. Bei 40 cm entsprechen 1 Δ etwa 0,4 cm Abstand zwischen den Bildern. Diese Entkopplung von Vergenz und Akkommodation erschwert an Bildschirmen das Verschmelzen und führt zu Beschwerden und Ermüdung (Hoffman et al. 2008); deshalb beginnt der Versatz bei 0 und wächst nur langsam.
- **Blickbewegungen:** Die Folge wird mit kleinen Blicksprüngen von Zeichen zu Zeichen gelesen; der Zeichenabstand ist etwa das 1,25-Fache der Zeichenhöhe.
- **Brillenträger und Alter:** Ab etwa Mitte 40 lässt die Akkommodation nach (Charman 2008); Gleitsichtträger lesen am Bildschirm mit mehr Kopfbewegung (Han et al. 2003). Eine Überbrille über der Korrekturbrille ist nötig; der Lesebereich muss die Folge scharf abbilden.
- **Bildschirm:** Am Bildschirm sinkt die Lidschlagrate (Portello et al. 2013); kurze Durchgänge und Pausen.
- **Farbsehen:** Etwa 8 % der Männer und 0,4 % der Frauen europäischer Herkunft haben eine Rot-Grün-Farbsehschwäche (Birch 2012); für sie passt die Aufgabe nicht.

## 5. Neurowissenschaftliche Grundlagen

- **Zusammenführen beider Augen:** Die Bilder beider Augen werden ab der primären Sehrinde zusammengeführt. Bekommen beide Augen verschiedene Bilder, kann die Wahrnehmung zwischen ihnen wechseln (binokularer Wettstreit; Blake & Logothetis 2002). Bei dieser Aufgabe stehen die Zeichen beider Farben an verschiedenen Stellen; gemeinsame Teile wie Rahmen und Kreuz sollen das Zusammenführen erleichtern.
- **Amblyopie:** Bei Schielamblyopie ließen sich in einer kleinen Fallserie die Informationen beider Augen kombinieren, wenn die Reize für beide Augen unterschiedlich kontrastreich gezeigt wurden (Hess et al. 2010). Daraus folgt nicht, dass diese Übung bei Amblyopie wirkt.
- **Vergenz:** Konvergenz und Divergenz werden über eigene Steuerkreise im Mittelhirn geführt; beim Affen gibt es dort Nervenzellen, deren Aktivität mit Konvergenz bzw. Divergenz zusammenhängt (Mays 1984).
- **Lesen und Gedächtnis:** Bei begrenzter Anzeige wird die Folge kurz behalten; das belastet das verbale Kurzzeitgedächtnis (Ziffern- bzw. Buchstabenspanne). Eine Aussage „diese Übung trainiert Region X“ lässt sich daraus nicht ableiten und wird nicht gemacht.

## 6. Motorische Grundlagen

Motorisch anspruchslos: Tipps auf große Bildschirmtasten in eigenem Tempo, kein Zeitdruck bei der Eingabe, „Löschen“ für Korrekturen; Tastatur als Alternative. Tremor oder eingeschränkte Feinmotorik stören kaum. Die eigentliche „Motorik“ der Aufgabe sind die Augen (Lesesakkaden, bei Versatz Vergenz).

## 7. Einflussfaktoren und Messgrenzen

- **Keine Kontrolle von Brille und Blick:** Die App kann nicht prüfen, ob die Brille getragen wird, ob jedes Glas vor dem richtigen Auge sitzt oder wohin man schaut. Die Auswertung nach Auge stimmt nur, wenn „Linkes Glas“ richtig eingestellt ist.
- **Übersprechen und Farben:** Brille, Bildschirmfarben, Helligkeit, Nachtmodus und Raumlicht verändern die Trennung; eine fehlende Farbe kann an der Technik liegen statt am Sehen. Deshalb ist der Farb- und Augenvergleich nur ein Hinweis und erst ab 20 Zeichen je Farbe zu sehen.
- **Kalibrierung:** Zentimeter, Sehwinkel und der Versatz in Δ stimmen nur bei kalibriertem Bildschirm und richtig eingetragenem Abstand. Ohne Kalibrierung gilt die Schätzung 38 px/cm. Der Versatz ist nur so fein, wie der Bildschirm Pixel hat (am Tablet in 40 cm etwa 0,05 Δ je Pixel).
- **Gedächtnis und Lesen vermengt:** Mit begrenzter Anzeige hängt das Ergebnis auch vom Kurzzeitgedächtnis ab; Fehler sagen dann nicht, ob ein Zeichen gesehen wurde.
- **Eingabezeit:** enthält bei unbegrenzter Anzeige das Lesen; Touchscreens messen Zeiten je nach Gerät zu lang (Pronk et al. 2020). Nur mit sich selbst auf demselben Gerät vergleichen.
- **Wenige Zeichen:** Ein Durchlauf mit 10 Folgen zu 6 Zeichen ergibt 30 Zeichen je Farbe; Unterschiede zwischen den Farben schwanken entsprechend stark.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Für genau diese Aufgabe gibt es keine Studie. In der geübten Aufgabe wird man durch Gewöhnung an Brille, Gerät und Zeichen meist besser.
- **Naher Transfer – unklar:** Dichoptisches Training führte bei Erwachsenen mit Amblyopie im Labor zu mehr Lernen als der erzwungene Gebrauch des amblyopen Auges allein (Li et al. 2013). Eine Übersicht über 24 Studien an Erwachsenen fand im Mittel eine Verbesserung der Sehschärfe, aber nur bei einem Teil der Teilnehmenden, und verlangt klinische Studien (Tsirlin et al. 2015); bei Schielamblyopie schnitt dichoptisches Training besser ab als einäugiges (Levi et al. 2015). In einer großen Studie mit 385 Kindern ließ sich nicht zeigen, dass ein binokulares Tablet-Spiel dem Abkleben mindestens gleichwertig ist; nur etwa jedes fünfte Kind spielte mehr als drei Viertel der verordneten Zeit (Holmes et al. 2016).
- **Vergenz:** Bei 221 Kindern mit Beschwerden bei Konvergenzinsuffizienz besserten sich nach 12 Wochen Beschwerden, Nahpunkt und fusionale Vergenz im Praxisprogramm mit Übungen zu Hause am meisten (erfolgreich oder gebessert 73 % gegenüber 43 % Bleistiftübungen, 33 % Computerübungen zu Hause, 35 % Placebo; CITT 2008). Bei 46 jungen Erwachsenen änderten sich Nahpunkt und fusionale Vergenz nur im Praxisprogramm deutlich; mehr als die Hälfte dieser Gruppe hatte am Ende noch Beschwerden (Scheiman et al. 2005). Das waren betreute Programme mit mehreren Aufgaben bei Menschen mit Beschwerden.
- **Alltagstransfer – fehlend:** Für Menschen mit gesunder Binokularfunktion ist kein Nutzen belegt; für Lesen, Sport oder Verkehr gibt es keinen Beleg.
- **Einordnung:** Die Übung ist eine Leseaufgabe mit getrennten Bildern für beide Augen; ganz richtige Folgen, richtige Zeichen und Eingabezeit sind Werte für den Vergleich mit sich selbst, keine Normwerte.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** eine ruhige, einstellbare Aufgabe mit getrennten Bildern für beide Augen gesucht wird; eine Rot-Grün- oder Rot-Cyan-Brille vorhanden ist; die Person Ziffern oder Buchstaben sicher kennt; kein Zeitdruck gewünscht ist (unbegrenzte Anzeige); eine Trainerin oder ein Trainer Einstellungen schrittweise anpassen möchte.
- **Weniger passend, wenn …** eine Rot-Grün-Farbsehschwäche besteht; das beidäugige Sehen beurteilt oder gemessen werden soll; räumliche Tiefe geübt werden soll (dann 923); keine Filterbrille vorhanden ist.
- **Vorsicht / anpassen bei …**
  - `farbsehschwaeche`: die Farbtrennung funktioniert nicht verlässlich; Übung nicht verwenden.
  - `schielen_binokular`, `amblyopie`: nur nach Absprache mit der behandelnden Fachperson; Ergebnis nicht als Aussage über das Auge lesen; Versatz nur mit deren Zustimmung.
  - `kopfschmerz_asthenopie`, `schwindel_vestibulaer`: kurze Durchgänge, Versatz bei 0 lassen. Doppelbilder, Schwindel, Kopf- oder Augenschmerz gehören abgeklärt, statt weiterzuüben (Muchnick 2008, S. 6, 28).
  - `presbyopie_gleitsicht`, `sehbehinderung_niedriger_visus`: Überbrille und passenden Lesebereich nutzen, größere Zeichen einstellen.
  - `trockenes_auge_bildschirm`: Pausen, bewusst blinzeln.
  - `kinder_unter_6`: sicherer Umgang mit Zeichen und Brille nötig; nicht untersucht.
- **Kombiniert gut mit …** 922 (Fusion mit wachsendem Versatz), 923 (Tiefe mit Zufallspunkten), 602 (Ziffernfolgen merken, ohne Brille als Vergleich).
- Keine Diagnosen, keine Heilversprechen; der Versatz ist keine Prismenmessung und kein Ersatz für eine Untersuchung.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Brillensitz nicht prüfbar:** Die Zuordnung nach Auge hängt allein an der Einstellung „Linkes Glas“; ein Prüfschritt mit je einem zugehaltenen Auge ist vorhanden, aber freiwillig.
- **Übersprechen geräteabhängig:** Bildschirmfarben unterscheiden sich stark; ein Hinweis im Ergebnis, dass Farbunterschiede zuerst technisch geprüft werden sollen, ist vorhanden.
- **Gedächtnisanteil:** Bei begrenzter Anzeige mischen sich Sehen und Behalten; für die Frage „beide Bilder gesehen?“ ist die unbegrenzte Anzeige mit Kontrollstrichen klarer.
- **Schwierigkeitswerte:** Faustregeln (90 %/50 %) und Grenzen sind nicht an Menschen geprüft.

## 11. Quellen

### Von der Website angegeben
keine (eigene Übung)

### Weitere Fachliteratur
- Hess, R. F., Mansouri, B., & Thompson, B. (2010). A binocular approach to treating amblyopia: Antisuppression therapy. *Optometry and Vision Science, 87*(9), 697–704. https://doi.org/10.1097/OPX.0b013e3181ea18e9 – kleine Fallserie, dichoptische Darbietung bei Schielamblyopie (Crossref geprüft)
- Li, J., Thompson, B., Deng, D., Chan, L. Y. L., Yu, M., & Hess, R. F. (2013). Dichoptic training enables the adult amblyopic brain to learn. *Current Biology, 23*(8), R308–R309. https://doi.org/10.1016/j.cub.2013.01.059 – dichoptisches Training bei Erwachsenen mit Amblyopie (Crossref geprüft)
- Holmes, J. M., Manh, V. M., Lazar, E. L., Beck, R. W., Birch, E. E., Kraker, R. T., Crouch, E. R., Erzurum, S. A., Khuddus, N., Summers, A. I., Wallace, D. K., & Pediatric Eye Disease Investigator Group (2016). Effect of a binocular iPad game vs part-time patching in children aged 5 to 12 years with amblyopia: A randomized clinical trial. *JAMA Ophthalmology, 134*(12), 1391–1400. https://doi.org/10.1001/jamaophthalmol.2016.4262 – gemischte Ergebnisse, geringe Spieltreue (Crossref geprüft)
- Tsirlin, I., Colpa, L., Goltz, H. C., & Wong, A. M. F. (2015). Behavioral training as new treatment for adult amblyopia: A meta-analysis and systematic review. *Investigative Ophthalmology & Visual Science, 56*(6), 4061–4075. https://doi.org/10.1167/iovs.15-16583 – Übersicht über 24 Studien an Erwachsenen (Crossref geprüft)
- Levi, D. M., Knill, D. C., & Bavelier, D. (2015). Stereopsis and amblyopia: A mini-review. *Vision Research, 114*, 17–30. https://doi.org/10.1016/j.visres.2015.01.002 – dichoptisch gegenüber einäugig bei Schielamblyopie (Crossref geprüft)
- Convergence Insufficiency Treatment Trial Study Group (2008). Randomized clinical trial of treatments for symptomatic convergence insufficiency in children. *Archives of Ophthalmology, 126*(10), 1336–1349. https://doi.org/10.1001/archopht.126.10.1336 – Vergenzübungen bei Konvergenzinsuffizienz (Crossref geprüft)
- Scheiman, M., Mitchell, G. L., Cotter, S., Kulp, M. T., Cooper, J., Rouse, M., Borsting, E., London, R., & Wensveen, J. (2005). A randomized clinical trial of vision therapy/orthoptics versus pencil pushups for the treatment of convergence insufficiency in young adults. *Optometry and Vision Science, 82*(7), 583–595. https://doi.org/10.1097/01.opx.0000171331.36871.2f – Vergenzübungen bei jungen Erwachsenen (Crossref geprüft)
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Rot-Grün-Farbsehschwäche (Crossref geprüft)
- Hoffman, D. M., Girshick, A. R., Akeley, K., & Banks, M. S. (2008). Vergence–accommodation conflicts hinder visual performance and cause visual fatigue. *Journal of Vision, 8*(3), 33. https://doi.org/10.1167/8.3.33 – Konflikt zwischen Vergenz und Scharfstellung am Bildschirm (Crossref geprüft)
- Blake, R., & Logothetis, N. K. (2002). Visual competition. *Nature Reviews Neuroscience, 3*(1), 13–21. https://doi.org/10.1038/nrn701 – binokularer Wettstreit (Crossref geprüft)
- Mays, L. E. (1984). Neural control of vergence eye movements: Convergence and divergence neurons in midbrain. *Journal of Neurophysiology, 51*(5), 1091–1108. https://doi.org/10.1152/jn.1984.51.5.1091 – Vergenzsteuerung im Mittelhirn (Crossref geprüft)
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry, 91*(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Akkommodation und Presbyopie (Crossref geprüft)
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm (Crossref geprüft)
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science, 90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag am Bildschirm (Crossref geprüft)
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touchscreens messen Zeiten zu lang (Crossref geprüft)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
