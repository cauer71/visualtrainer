---
# ===== Kennung =====
nr: 902
kennung: richtung-wort
name: "Richtung & Wort (Richtungszeichen dem passenden Wort zuordnen)"
name_original: "– (Handyvideo einer Reha-/Neuro-Trainingssoftware, kein Titel erkennbar)"
kapitel: "Eigene Blickfit-Übungen"
kapitel_original: ""
unterkapitel_original: ""
blickfit_umsetzung: {kennung: "richtung-wort", name: "Richtung & Wort", unterschiede: "Eigene Umsetzung nach einem Handyvideo (Beobachtung, keine Online-Quelle); Zeichen und Ablauf sind nicht kopiert. Wissenschaftlich begründet geändert: 12 Stufen (Treppe, 3 richtig = schwerer, 1 Fehler = leichter) bauen die Reiz-Antwort-Kompatibilität schrittweise ab (alle Wörter an passender Lage, dann ein Paar vertauscht, dann alle gemischt); erst danach mehr Zeichenfamilien (Pfeil im Kasten, Schrägpfeil in blauer Scheibe, Dreieck mit Kurve; alle selbst gezeichnet) und eine weiche Antwortfrist (grob 5 bis 3 s, ohne Strafe). Zusatzwerte nur im Vergleich mit sich selbst (Lage-Kosten, Lage- und Achsenfehler). Sanfte Haken/Kreuz-Rückmeldung, Touch, DE/IT. Zahlen können sich noch ändern."}
stand: 2026-10-01

# ===== Überblick =====
kurzbeschreibung: "Oben erscheint ein Richtungszeichen (Pfeil, Schild mit Schrägpfeil, Kurve). Unten stehen vier grüne Felder in Kreuzanordnung, jedes mit einem Wort (OBEN, UNTEN, LINKS, RECHTS). Man tippt das Feld, dessen Wort die Richtung nennt – die Wörter stehen nicht immer an der passenden Stelle."
ziel_funktionen: [inhibition, entscheidung_wahlreaktion]
eingabe: [touch]
tablet_geeignet: ja
dauer_sekunden: 100
schwierigkeit_anpassung: "Blickfit (Stand der Spezifikation, Zahlen grob): 12 Stufen, Treppe 3 richtig in Folge = eine Stufe schwerer, 1 Fehler = leichter (Ziel ≈ 79 % richtig). Stufe 1–3: alle Wörter an passender Lage, nur Pfeile. Stufe 4–6: zwei Wörter vertauscht. Stufe 7–9: alle Wörter gemischt, dazu Schrägpfeil und Kurvendreieck. Stufe 10–12: zusätzlich weiche Antwortfrist (ca. 5 → 3 s, Überschreiten ohne Strafe) und unvorhersehbare Anordnung. Original: aus dem Video nicht erkennbar (kein Level sichtbar)."
messgroessen: ["Hauptwert: erreichte Stufe (Schwelle der Treppe)", "Treffer in %", "Ø Zeit richtig (ms) bei passender Lage und bei abweichender Lage; die Differenz ist der persönliche „Lage-Kosten“-Wert (nur Vergleich mit früher auf diesem Gerät)", "Lage-Fehler (getipptes Feld liegt dort, wo die Richtung wäre, trägt aber ein anderes Wort)", "Achsenfehler (z. B. UNTEN statt LINKS beim Schrägpfeil)", "Original: keine Auswertung im Video zu sehen"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Das Profil beschreibt die Blickfit-Umsetzung (Stufen 1–12); das Original ist nur aus einem Video bekannt.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 1
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 0
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 0
    visuelle_suche: 2
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 2
    inhibition: 3
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 1
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 0
    entscheidung_wahlreaktion: 3
    lesen_sprache: 2
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 1
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
  sprachabhaengigkeit: 3

# ===== Auswahlhilfe =====
voraussetzungen: ["Die Wörter LINKS, RECHTS, OBEN, UNTEN (Italienisch: SINISTRA, DESTRA, ALTO, BASSO) lesen können", "Richtungen links/rechts/oben/unten sicher benennen können", "Schrift von etwa 30 px (≈ 0,8° bei 40 cm Tablet-Abstand, eigene Rechnung) auf grünem Feld lesen können", "Mit dem Finger Felder von mindestens 72 px Höhe (≈ 14 mm) treffen können"]
vorsicht_bei: [lese_rechtschreib_schwaeche, kognitive_einschraenkung, aufmerksamkeitsprobleme, kinder_unter_6, sehbehinderung_niedriger_visus, presbyopie_gleitsicht]
geeignet_fuer: ["Reiz-Antwort-Zuordnung und den Umgang mit Konflikt zwischen Lage und Wort in ruhigem Tempo üben", "Lesen statt Raten: das passende Wort im Feldkreuz suchen, wenn die Lage nicht hilft", "schrittweise Steigerung von „alles passt“ zu „alles gemischt“ ohne Zeitdruck in den unteren Stufen", "Vergleich mit sich selbst: der eigene Lage-Kosten-Wert über mehrere Sitzungen"]
weniger_geeignet_fuer: ["reine Reaktionsschnelligkeit (dafür Einfachreaktion, 101/503)", "Menschen, die die Wörter nicht lesen können, oder Kinder unter etwa 6 Jahren", "Blickfolge, Peripherie oder Handgenauigkeit üben", "Diagnose oder Normvergleich (nicht vorgesehen, nicht möglich)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Kompatibilitäts- und Stroop-/Simon-Effekte sind robust; sie werden mit Übung kleiner, verschwinden aber nicht (Dutta & Proctor, 1992), und Stroop-Übung bei Älteren übertrug sich nicht auf andere Aufgaben (Wilkinson & Yang, 2012). Für diese Übung gibt es keine Studie – die Einstufung gilt für die Aufgabenart, nicht für diese Übung."
aehnliche_uebungen: [201, 202, 703, 207, 901]
stichworte: ["Reiz-Antwort-Kompatibilität", "räumlicher Stroop", "Simon-Effekt", "Wort-Lage-Konflikt", "Hick-Hyman", "Wahlreaktion", "Richtungswörter", "Lage-Kosten", "Reha-Software", "kein Zeitdruck in den unteren Stufen"]
---

# 902 · Richtung & Wort (Richtungszeichen dem passenden Wort zuordnen)

> Original: – (Handyvideo einer Reha-/Neuro-Trainingssoftware, 16 s, Hochformat; keine Website, keine URL) · Blickfit: „Richtung & Wort“ (`src/exercises/richtung-wort/`, Kategorie Konzentration; zum Zeitpunkt dieses Eintrags noch in Arbeit)

## 1. Kurzbeschreibung

Oben auf dem Bildschirm erscheint ein Zeichen, das eine Richtung zeigt: ein Pfeil in einem hellen oder dunklen Kasten, ein blaues Rundschild mit weißem Schrägpfeil oder ein Warndreieck mit einer Kurve. Unten stehen vier grüne Felder, angeordnet wie ein Kreuz (oben, unten, links, rechts) mit weißer Mitte. Jedes Feld trägt ein Wort: OBEN, UNTEN, LINKS oder RECHTS. Man tippt das Feld, dessen **Wort** die Richtung des Zeichens nennt. Das ist leicht, wenn das Wort dort steht, wo die Richtung liegt („OBEN“ im oberen Feld), und deutlich schwerer, wenn die Wörter anders verteilt sind: dann muss man **lesen und suchen**, statt nach der Lage zu antworten. Genau dieser Konflikt zwischen Lage und Wort ist die eigentliche Anforderung der Übung, nicht Tempo.

## 2. Ablauf im Original (Analyse)

Quelle: **ein einziges Handyvideo** (16 s, Hochformat, 474 × 850 px) des Auftraggebers von einem großen Touchmonitor, auf dem eine Trainingssoftware läuft; eine Hand tippt mit dem Finger auf die Felder. Name und Hersteller der Software sind unbekannt, es gibt keine Website und keinen Spielcode. Dieser Abschnitt beschreibt deshalb **nur, was im Video zu sehen war**. Jede Deutung darüber hinaus ist als **Annahme** markiert.

**Beobachtet (Video):**
- **Aufbau:** Oben ein Zeichen auf hellem Grund. Darunter vier grüne Felder in Kreuzanordnung (oben, unten, links, rechts) um eine weiße Mitte; die seitlichen Felder ragen zum Teil über den Bildrand hinaus (Ausschnitt des Handyvideos, nicht unbedingt des Bildschirms). Auf jedem Feld steht ein kurzes Wort in dunkler, im Verhältnis zum Feld kleiner Schrift.
- **Wörter:** LINKS, RECHTS, OBEN und UNTEN. Ihre Verteilung auf die Felder **wechselt von Zeichen zu Zeichen**. Beispiele aus dem Video: (1) oben RECHTS, links OBEN, rechts LINKS, unten UNTEN; (2) oben LINKS, links OBEN, unten RECHTS; (3) oben UNTEN, unten LINKS; (4) oben LINKS, unten OBEN, rechts „RE…“; (5) oben LINKS, unten UNTEN. In einem Fall (5) steht UNTEN **an der passenden Stelle** (unten), in den anderen nicht.
- **Zeichen (7 verschiedene gesehen):** blaue Scheibe mit weißem Schrägpfeil nach rechts unten; schwarzer hoher Kasten mit weißem Pfeil nach oben; kleiner heller Kasten mit dunklem Pfeil nach unten; blaue Scheibe mit Schrägpfeil nach links unten; rotes Warndreieck mit einer Kurve (nach rechts); hoher heller Kasten mit Pfeil nach unten; hoher heller Kasten mit Pfeil nach oben. Die Zeichen erinnern an Verkehrszeichen (Vorbeifahrt, Kurve); ob amtliche Zeichen nachgebildet sind, lässt sich aus dem Video nicht entscheiden.
- **Tippen:** Der Finger landete in den erkennbaren Fällen auf dem Feld, **dessen Wort die Richtung nennt**: Schrägpfeil nach rechts unten → Feld „RECHTS“ (oben im Kreuz); schwarzer Pfeil nach oben → Feld „OBEN“ (links im Kreuz); Schrägpfeil nach links unten → Feld „LINKS“ (unten im Kreuz); Pfeil nach unten im hohen hellen Kasten → Feld „UNTEN“ (unten); Kurve nach rechts → Feld am rechten Rand („RE…“). Beim Schrägpfeil zählte der **Links/Rechts-Anteil**, nicht „unten“.
- **Takt:** Jedes Zeichen war etwa 2–4 s zu sehen; das Video zeigt rund 7 Zeichen in 16 s.

**Nicht erkennbar (Video):** ob es Haken, Kreuze, Töne oder eine Zeitanzeige gab; ob ein falscher Tipp bestraft wird; ob es Punkte, Stufen oder ein Ende gibt; wie die Wortverteilung gewählt wird (zufällig, nach Plan); wie schnell die Reaktion sein muss; ob die Zeichen nach Stufen wechseln.

**Annahmen (nicht belegt):**
- Die Aufgabe lautet „Tippe das Feld, dessen Wort zur Richtung des Zeichens passt“. Dafür spricht das Tippverhalten im Video, eine Regeltafel war nicht zu sehen.
- Die Mischung aus passender und unpassender Lage ist Absicht (Lesen statt Lage-Reaktion). Ob die Software den Anteil steuert oder Zeiten getrennt auswertet, ist unbekannt.
- Das Video zeigt einen Therapie-/Trainingskontext (Hand am Monitor); ob und wie die Software dort Leistungsdaten auswertet, ist nicht erkennbar.

## 3. Was die Quelle sagt – und wie das einzuordnen ist

Es gibt **keinen Seitentext, keine Werbeaussage und keine Leistungsstufen** – nur das Video. Es lässt sich also nichts „einordnen“, was die Software verspricht. Eingeordnet wird stattdessen, was die **Aufgabe** wissenschaftlich ist:

- **Reiz-Antwort-Kompatibilität:** Die Zeit, auf einen Reiz zu antworten, hängt stark davon ab, wie gut Reiz und Antwort räumlich zusammenpassen (Fitts & Seeger, 1953). Bei zwei Alternativen und einer um 180° gedrehten (am wenigsten passenden) Anordnung war die Reaktionszeit um **30 % verlangsamt**; untersucht wurden eine jüngere (20–30 J.) und eine ältere Gruppe (65–86 J.), die Ältere waren insgesamt langsamer, eine Wechselwirkung zwischen Aufgabenschwere und Alter war nicht signifikant (Simon & Wolf, 1963; Abstract).
- **Konflikt zwischen Lage und Bedeutung:** Wenn der Ort eines Reizes nicht zur Antwort passt, behindert er die Antwort auch dann, wenn er irrelevant ist („Simon-Effekt“, „räumlicher Stroop-Effekt“; Übersicht Lu & Proctor, 1995). In einer vierfachen Pfeilrichtungs-Aufgabe mit störender Position lag der Effekt bei ≈ 130 ms und rund 8–9 % mehr Fehlern (n = 72, online; Viviani et al., 2024; Ergebnisteil der PMC-Fassung). Das ist eine andere Aufgabe, zeigt aber die Größenordnung.
- **Lesen läuft mit:** Die Bedeutung eines Wortes wird schwer unterdrückt (Stroop, 1935; MacLeod, 1991). Richtungswörter („oben“, „links“) können sogar Blicksprünge in die genannte Richtung auslösen, obwohl sie nichts zur Aufgabe beitragen (Hodgson et al., 2009).
- **Mehr Alternativen, mehr Zeit:** Die Wahlreaktionszeit wächst mit dem Logarithmus der Alternativenzahl (Hick, 1952; Hyman, 1953). Bei vier gleich wahrscheinlichen Alternativen sind das 2 Bit (eigene Rechnung). Bei sehr kompatiblen Zuordnungen ist diese Kurve fast flach (Proctor & Schneider, 2018).
- **Keine Normen:** Das Video nennt keine Normwerte; die Literatur kennt für diese Aufgabe keine, und wir leiten keine ab.

## 4. Optische und okulomotorische Grundlagen

- **Sehanforderung gering bis mittel:** Wörter von etwa 30 px Schriftgrad (fett) entsprechen am 10,9″-Tablet in 40 cm etwa 0,8° (36 CSS-px pro Grad; Tablet-Rechnung aus Lit. W02/W03, eigene Herleitung). Das ist gut lesbar; knapp wird es nur bei niedrigem Visus oder zu großem Abstand. Die Wörter müssen auf grünem Grund einen Kontrast von mindestens 4,5 : 1 haben (WCAG 2.2, SC 1.4.3; der konkrete Wert wird beim Bau gemessen).
- **Blickverhalten:** Erst das Zeichen oben, dann eine Suche über die vier Wörter (nach Herleitung mehrere Blicksprünge), dann der Tipp. Die Felder liegen im Kreuz um eine weiße Mitte, die Sprünge sind groß, aber nicht extrem. Das Lesen eines Richtungswortes kann selbst eine Blickbewegung zur genannten Seite auslösen (Hodgson et al., 2009; Laborbefund mit Farb- und Ortswörtern).
- **Naharbeit:** Etwa 100 s sind gering belastend (Wert 1). Wie bei jeder Bildschirmaufgabe sinkt beim Starren die Lidschlagrate (Patel et al., 1991: im Mittel 5-fach niedriger); bewusst blinzeln.
- **Brillenträger:** Das Kreuz liegt im unteren Bildschirmbereich; bei Gleitsicht und Tablet in Nahdistanz meist durch den Nahteil lesbar, die seitlichen Felder verlangen ggf. eine leichte Kopfdrehung (neue Gleitsichtträger nutzten in einer kleinen Studie mehr Kopfbewegungen; Hutchings et al., 2007; nicht für diese Übung untersucht). Eine Arbeitsplatz-/Nahbrille für den Bildschirmabstand ist eine Bedienhilfe, keine Sehaussage.
- **Farbe:** Die Aufgabe braucht keine Farbunterscheidung: Wörter und Formen tragen die Information (WCAG 2.2, SC 1.4.1: Farbe nie allein). Blaue Scheibe und rotes Dreieck sind zusätzlich an der Form erkennbar.

## 5. Neurowissenschaftliche Grundlagen

- **Interferenzauflösung:** In einer Metaanalyse von 47 Bildgebungsstudien zu Aufgaben mit Störinformation (Stroop, Flanker, Go/No-Go, Simon, Stop-Signal) waren vor allem anteriorer cingulärer Kortex, dorsolateraler präfrontaler Kortex, unterer Frontalgyrus, posteriorer Parietalkortex und vordere Insel beteiligt (Nee et al., 2007; Abstract). Das beschreibt Aktivierung bei der Aufgabe, **nicht** „Training einer Region“.
- **Dimensional-Overlap-Modell:** Konflikt entsteht, wenn irrelevante und relevante Reizmerkmale oder Reiz und Antwort „überlappen“, hier die Richtung des Zeichens, die Lage des Feldes und die Bedeutung des Wortes (Kornblum et al., 1990).
- **Unterschiedlicher Verlauf:** Stroop-artige Interferenz (Wortbedeutung) wächst mit langsameren Antworten, Simon-artige (Lage) ist bei schnellen Antworten am größten und nimmt ab (Pratte et al., 2010). Das ist eine Herleitung für die Frist-Stufen: Eine knappe Frist verstärkt eher den Lage-Anteil, ruhiges Tempo eher den Wort-Anteil (**Herleitung**, nicht für diese Übung geprüft).
- **Kontrollierte statt automatische Verarbeitung:** Wechselt die Zuordnung (hier: welches Wort wo steht) bei jedem Durchgang, lässt sich die Aufgabe nicht automatisieren (Schneider & Shiffrin, 1977). Daraus folgt (Herleitung, für diese Übung nicht geprüft), dass Suchen und Lesen auch nach viel Übung nötig bleiben.

## 6. Motorische Grundlagen

Motorisch anspruchslos: ein Tipp auf ein großes Feld (mindestens 72 px hoch, Trefferfläche mindestens 56 px). Zielgenauigkeit und Tempo spielen eine Nebenrolle. Auf dem Touchscreen werden Reaktionszeiten zu lang gemessen (Web-Apps; Pronk et al., 2020); für den persönlichen **Vergleich zweier Bedingungen** (passend vs. abweichend) auf demselben Gerät hebt sich das weitgehend heraus, absolute Millisekunden sind nicht vergleichbar. Zu frühe Tipps (unter 150 ms nach Reizbeginn) und Doppeltipps zählen nicht (Spezifikation).

## 7. Einflussfaktoren und Messgrenzen

- **Differenzwerte sind unzuverlässig:** Der „Lage-Kosten“-Wert ist eine Differenz; solche Interferenz- und Kompatibilitätsunterschiede sind als Gruppeneffekt robust, als persönlicher Wert aber oft wenig zuverlässig (Test-Retest 0 bis 0,82 in sieben klassischen Aufgaben; Hedge et al., 2018). Der Wert darf nur als Verlauf über mehrere Sitzungen angezeigt werden.
- **Lernen der Anordnungen:** Bei einem vertauschten Paar gibt es nur 6 mögliche Anordnungen (eigene Rechnung), bei „alle gemischt“ höchstens 23. Wer sie wiedererkennt, liest weniger; das verkleinert die Lage-Kosten, ohne dass sich die Konfliktlösung verbessert hat. Der Kompatibilitätseffekt bleibt aber auch nach 8 Sitzungen bestehen (Dutta & Proctor, 1992).
- **Alter:** Bei unpassender Zuordnung war die Reaktionszeit verlangsamt (+30 % bei 180°), die erwartete Wechselwirkung mit dem Alter blieb aus (Simon & Wolf, 1963; zwei Altersgruppen); in einer Metaanalyse über 176 Studien sprach für Stroop und Flanker nichts für ein Hemmdefizit im Alter, für den Simon-Effekt ist die Datenlage offen (Rey-Mermet & Gade, 2018). Altersaussagen werden deshalb nicht gemacht.
- **Sprache und Lesefertigkeit:** DE und IT messen nicht dasselbe (Wortlänge, Lesegewohnheit); Werte nicht zwischen Sprachen vergleichen.
- **Gerät:** Bildfrequenz und Touch-Latenz verschieben absolute Zeiten (Pronk et al., 2020); Bildschirmgröße und Abstand ändern die Sprunggrößen.
- **Raten:** Bei vier Feldern liegt der Zufallstreffer bei 25 %. Die Fehlerarten (Lage-Fehler, Achsenfehler) zeigen, ob eher nach Lage oder nach Wort geantwortet wurde.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt: mittel (für die Aufgabenart).** Mit Übung wird die Wahlreaktion schneller, die Steigung pro Alternative flacht ab (Proctor & Schneider, 2018). Kompatibilitätseffekte bleiben auch nach 8 Sitzungen bestehen (Dutta & Proctor, 1992), Stroop-Interferenz sinkt bei Älteren, verschwindet aber nicht (Wilkinson & Yang, 2012; dort 6 Sitzungen, n = 56, 60–84 J.).
- **Naher Transfer: schwach.** In der Stroop-Studie mit Älteren übertrug sich die Verbesserung **nicht** auf andere Aufgaben (Wilkinson & Yang, 2012).
- **Alltagstransfer: fehlend.** Für diese Aufgabe (und für Wort-Lage-Konflikte allgemein) gibt es keinen Nachweis eines Nutzens im Alltag, im Verkehr oder in der Reha. Auch das Video belegt nichts dazu.
- **Reha-Kontext:** Aus dem Video geht nicht hervor, ob die Software als Therapie eingesetzt wird; für unsere Übung wird **kein** Therapie- oder Heilanspruch erhoben.
- **Seriöse Formulierung:** „Bei Richtung & Wort tippst du das Feld, dessen Wort die Richtung nennt. Stehen die Wörter nicht an der passenden Stelle, musst du lesen statt nach der Lage zu antworten. Mit Übung wird man in dieser Aufgabe schneller; ob das im Alltag hilft, ist nicht belegt. Deine Werte gelten nur für dieses Gerät.“

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand eine ruhige Konzentrationsübung mit Lesen und Entscheiden sucht; Zuordnung unter Konflikt geübt werden soll; Touch am Tablet genutzt wird; Sehschärfe und Farbsehen keine Rolle spielen sollen (große Wörter, keine Farbabhängigkeit); der eigene Verlauf wichtiger ist als ein Rang.
- **Weniger passend, wenn …** Reaktion, Blickfolge, Peripherie oder Handgenauigkeit trainiert werden sollen; die Wörter nicht gelesen werden können; Kinder unter etwa 6 Jahren; ein Normvergleich oder eine Diagnose gewünscht ist.
- **Vorsicht / anpassen bei …**
  - `lese_rechtschreib_schwaeche`: Die Übung verlangt Lesen von Wörtern unter Konflikt; mit den unteren Stufen (alle Wörter an passender Lage) beginnen.
  - `kognitive_einschraenkung`, `aufmerksamkeitsprobleme`: Konfliktstufen können frustrieren; auf Stufe 1–3 bleiben, kein Therapieanspruch.
  - `kinder_unter_6`: Lesen und Links/Rechts noch nicht sicher; nicht untersucht.
  - `sehbehinderung_niedriger_visus`, `presbyopie_gleitsicht`: Wortschrift 28–30 px und seitliche Felder; Tablet in den Nahteil-Abstand bringen, Schrift/Bildschirm vergrößern.
- **Kombiniert gut mit …** 201 (Stroop-Aufgabe, Interferenz), 202 (Wahlreaktion mit Regelwechsel), 703 (Tasten-Wahlreaktion), 207 (Zuordnung Zeichen–Zahl), 901 (Reihen-Rätsel als ruhiger Ausgleich).
- Keine Diagnosen, keine Heilversprechen; nicht als „Test“ darstellen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

**Schwächen des Originals (soweit aus dem Video erkennbar):** Die Verteilung der Wörter wechselt, aber es ist nicht erkennbar, ob die Software passende und unpassende Lage getrennt auswertet; ohne diese Trennung bleibt unklar, was gemessen wird (Lesen, Suchen, Lage-Konflikt oder einfach Tempo). Die Wörter sind im Verhältnis zu den Feldern klein. Die Zeichen setzen Verkehrszeichen-Kenntnis voraus (Schrägpfeil in der Scheibe = „links oder rechts vorbei“; Kurvendreieck) und sind für Menschen ohne Fahrpraxis oder aus anderen Ländern nicht selbsterklärend. Die Antwort auf einen Schrägpfeil ist mehrdeutig („unten“ oder „links“?). Falls die Anzeigedauer von etwa 2–4 s pro Zeichen zugleich die Frist ist (aus dem Video nicht erkennbar), kann das Ältere unter Druck setzen (Einschätzung, nicht untersucht). Rückmeldung und Auswertung sind nicht sichtbar.

**Blickfit „Richtung & Wort“ (Stand der Spezifikation; Zahlen grob, Details können sich ändern):**
- **Kompatibilität schrittweise abbauen:** Stufe 1–3 alle Wörter an passender Lage (nur Pfeile), Stufe 4–6 ein Paar vertauscht, Stufe 7–9 alle Wörter gemischt (nie identisch mit der passenden Anordnung), dann erst Zeichenvielfalt und weiche Frist (Stufe 10–12). Begründung: Fitts & Seeger (1953); Lu & Proctor (1995).
- **Zeichen selbst gezeichnet:** Pfeil im Kasten (hell/dunkel, hoch/breit), blaue Scheibe mit Schrägpfeil (ab Stufe 7; Antwort ist der Links/Rechts-Anteil, im Intro erklärt), Dreieck mit Kurve (Antwort = Kurvenrichtung). Keine Nachbildung amtlicher Schilder im Detail.
- **Felder und Schrift:** Kreuzanordnung mit weißer Mitte; Felder mindestens 72 px hoch, Trefferfläche mindestens 56 px, Wörter mindestens 30 px fett; Kontrast Schrift/Feld mindestens 4,5 : 1 (messen); Farbe nie allein.
- **Kein Bewegungsreiz:** Die neue Anordnung erscheint zusammen mit dem Zeichen (oder 0,3 s vorher), die Wörter „fliegen“ nicht. Zu frühe Tipps (< 150 ms) zählen nicht; ruhiger Takt (1,0–1,5 s Pause), 20 Durchgänge je Runde.
- **Treppe 3-down/1-up** (Levitt, 1971; Ziel ≈ 79 % richtig). Hauptwert Stufe; Zusatzwerte nur im Vergleich mit früher: Treffer, Ø Zeit bei passender und abweichender Lage („Lage-Kosten“), Lage-Fehler, Achsenfehler.
- **Rückmeldung:** sanftes Häkchen/Kreuz am Feld (kein Rotblitz, keine Zeitstrafe); Texte enden bei Wirkaussagen mit „… ist nicht belegt“.
- **Sprache:** DE (LINKS, RECHTS, OBEN, UNTEN) und IT (SINISTRA, DESTRA, ALTO, BASSO); Werte nie zwischen Sprachen vergleichen.

**Offene Punkte:** Anteil der passenden Durchgänge je Stufe festlegen und protokollieren; Anordnungen nicht in kurzer Folge wiederholen; Lage-Kosten nur als gleitenden Median über mehrere Runden anzeigen; Schrägpfeil-Regel im Intro erklären; Zeichen-Intro auch für Nicht-Fahrer verständlich halten.

## 11. Quellen

### Von der Website angegeben
- Keine Online-Quelle – Beobachtung aus Videos des Auftraggebers (Handyvideo einer Reha-/Neuro-Trainingssoftware, 16 s, Hochformat; Name, Hersteller und URL unbekannt). Die Videobeobachtungen sind in `docs/uebungskatalog/literatur/lit-W12-links-rechts-richtung.md` (Teil A) festgehalten.

### Weitere Fachliteratur
- Fitts, P. M., & Seeger, C. M. (1953). S-R compatibility: Spatial characteristics of stimulus and response codes. *Journal of Experimental Psychology*, *46*(3), 199–210. https://doi.org/10.1037/h0062827 – Kompatibilität bestimmt die Reaktionszeit (**Prüfung:** Crossref ✓; Inhalt über Übersichten, Abstract nicht vorhanden).
- Simon, J. R., & Wolf, J. D. (1963). Choice reaction time as a function of angular stimulus-response correspondence and age. *Ergonomics*, *6*(1), 99–105. https://doi.org/10.1080/00140136308930679 – 180°-Anordnung: Reaktionszeit rund 30 % länger, Jüngere und Ältere (**Prüfung:** Crossref ✓; Abstract gelesen).
- Kornblum, S., Hasbroucq, T., & Osman, A. (1990). Dimensional overlap: Cognitive basis for stimulus-response compatibility – A model and taxonomy. *Psychological Review*, *97*(2), 253–270. https://doi.org/10.1037/0033-295X.97.2.253 – Modell der Überlappung von Reiz- und Antwortdimensionen (**Prüfung:** Crossref ✓; Abstract gelesen).
- Lu, C.-H., & Proctor, R. W. (1995). The influence of irrelevant location information on performance: A review of the Simon and spatial Stroop effects. *Psychonomic Bulletin & Review*, *2*(2), 174–207. https://doi.org/10.3758/BF03210959 – Einfluss der irrelevanten Lage (**Prüfung:** Crossref ✓; Abstract gelesen).
- Stroop, J. R. (1935). Studies of interference in serial verbal reactions. *Journal of Experimental Psychology*, *18*(6), 643–662. https://doi.org/10.1037/h0054651 – Ausgangsarbeit zur Wortinterferenz (**Prüfung:** Crossref ✓; Inhalt als Standardwissen, ohne Zahlen zitiert).
- MacLeod, C. M. (1991). Half a century of research on the Stroop effect: An integrative review. *Psychological Bulletin*, *109*(2), 163–203. https://doi.org/10.1037/0033-2909.109.2.163 – ≈ 400 Studien, 18 verlässliche Befunde (**Prüfung:** Crossref ✓; Abstract gelesen, OpenAlex).
- Hodgson, T. L., Parris, B. A., Gregory, N. J., & Jarvis, T. (2009). The saccadic Stroop effect: Evidence for involuntary programming of eye movements by linguistic cues. *Vision Research*, *49*(5), 569–574. https://doi.org/10.1016/j.visres.2009.01.001 – Ortswörter lösen unwillkürlich Blicksprünge aus (**Prüfung:** Crossref ✓; Abstract gelesen).
- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology*, *4*(1), 11–26. https://doi.org/10.1080/17470215208416600 – Wahlreaktionszeit und Informationsmenge (**Prüfung:** Crossref ✓; Abstract gelesen, OpenAlex).
- Hyman, R. (1953). Stimulus information as a determinant of reaction time. *Journal of Experimental Psychology*, *45*(3), 188–196. https://doi.org/10.1037/h0056940 – dasselbe Gesetz (Hick-Hyman) (**Prüfung:** Crossref ✓; Inhalt über Proctor & Schneider, 2018).
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology*, *71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 – Grenzen des Gesetzes (Kompatibilität, Übung) (**Prüfung:** Crossref ✓; Abstract gelesen).
- Viviani, G., Visalli, A., Finos, L., Vallesi, A., & Ambrosini, E. (2024). A comparison between different variants of the spatial Stroop task: The influence of analytic flexibility on Stroop effect estimates and reliability. *Behavior Research Methods*, *56*(2), 934–951. https://doi.org/10.3758/s13428-023-02091-8 – Effekt ≈ 130 ms, 8–9 Prozentpunkte Fehler, n = 72 (**Prüfung:** Crossref ✓; Abstract und PMC-Ergebnisse gelesen).
- Pratte, M. S., Rouder, J. N., Morey, R. D., & Feng, C. (2010). Exploring the differences in distributional properties between Stroop and Simon effects using delta plots. *Attention, Perception, & Psychophysics*, *72*(7), 2013–2025. https://doi.org/10.3758/APP.72.7.2013 – unterschiedlicher Zeitverlauf von Stroop- und Simon-Effekt (**Prüfung:** Crossref ✓; Abstract gelesen).
- Dutta, A., & Proctor, R. W. (1992). Persistence of stimulus-response compatibility effects with extended practice. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, *18*(4), 801–809. https://doi.org/10.1037/0278-7393.18.4.801 – Kompatibilitätseffekt bleibt nach 8 Sitzungen (**Prüfung:** Crossref ✓; Abstract über Websuche gelesen, nicht in PubMed).
- Schneider, W., & Shiffrin, R. M. (1977). Controlled and automatic human information processing: I. Detection, search, and attention. *Psychological Review*, *84*(1), 1–66. https://doi.org/10.1037/0033-295X.84.1.1 – wechselnde Zuordnung bleibt kontrolliert (**Prüfung:** Crossref ✓; Inhalt als Standardwissen, ohne Zahlen zitiert).
- Augustinova, M., Parris, B. A., & Ferrand, L. (2019). The loci of Stroop interference and facilitation effects with manual and vocal responses. *Frontiers in Psychology*, *10*, 1786. https://doi.org/10.3389/fpsyg.2019.01786 – bei Tastendruck kleinere Wortinterferenz als beim Sprechen (**Prüfung:** Crossref ✓; Abstract gelesen).
- Nee, D. E., Wager, T. D., & Jonides, J. (2007). Interference resolution: Insights from a meta-analysis of neuroimaging tasks. *Cognitive, Affective, & Behavioral Neuroscience*, *7*(1), 1–17. https://doi.org/10.3758/CABN.7.1.1 – beteiligte Hirnregionen bei Interferenzaufgaben (**Prüfung:** Crossref ✓; Abstract gelesen).
- Wilkinson, A. J., & Yang, L. (2012). Plasticity of inhibition in older adults: Retest practice and transfer effects. *Psychology and Aging*, *27*(3), 606–615. https://doi.org/10.1037/a0025926 – Übung ja, Transfer nein (**Prüfung:** Crossref ✓; Abstract gelesen).
- Rey-Mermet, A., & Gade, M. (2018). Inhibition in aging: What is preserved? What declines? A meta-analysis. *Psychonomic Bulletin & Review*, *25*(5), 1695–1716. https://doi.org/10.3758/s13423-017-1384-7 – Alter und Hemmung, 176 Studien (**Prüfung:** Crossref ✓; Abstract gelesen).
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods*, *50*(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 – Differenzwerte als persönlicher Wert unzuverlässig (**Prüfung:** Crossref ✓; Abstract gelesen).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch überschätzt Reaktionszeiten (**Prüfung:** Crossref ✓; Abstract gelesen).
- Levitt, H. (1971). Transformed up-down methods in psychoacoustics. *The Journal of the Acoustical Society of America*, *49*(2B), 467–477. https://doi.org/10.1121/1.1912375 – Treppenverfahren (3-down/1-up ≈ 79 %) (**Prüfung:** Crossref ✓; wie in 901 verwendet).
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science*, *68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlagrate am Bildschirm im Mittel 5-fach niedriger (**Prüfung:** Crossref ✓; Abstract gelesen).
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, *27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Gleitsicht, Kopfbewegung (**Prüfung:** Crossref ✓; Abstract gelesen, Literaturbasis W02).
- World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (SC 1.4.1, 1.4.3). https://www.w3.org/TR/WCAG22/ – Farbe nie allein, Kontrast 4,5 : 1 (**Prüfung:** Webdokument ohne DOI; Kriterien 1.4.1 und 1.4.3 am 01.10.2026 gelesen).
