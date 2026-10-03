---
# ===== Kennung =====
nr: 703
kennung: keyboard-recognition
name: "Tasten-Wahlreaktion (Zeichen der passenden Taste zuordnen)"
name_original: "Tastatur-Reaktionszeit-Test | Keybind-Trainer & Tastengeschwindigkeitstest (Keyboard Speed Test)"
kapitel: "Motorik"
kapitel_original: "motor"
unterkapitel_original: "movement-speed"
quelle_url: "https://skilldrills.online/de/drills/motor/movement-speed/keyboard-recognition"
blickfit_umsetzung: {kennung: "tasten-wahl", name: "Tasten-Wahl", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/tasten-wahl/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Oben erscheint ein Zeichen (Form mit Buchstabe), unten liegen zwei bis vier große Tasten mit denselben Zeichen. Man tippt möglichst schnell die passende Taste; mit der Stufe kommen mehr Tasten dazu, sie wechseln den Platz, und die Antwortfrist wird knapper."
ziel_funktionen: [entscheidung_wahlreaktion, fingersequenz_bimanual]
eingabe: [tastatur]
tablet_geeignet: nein
dauer_sekunden: 60
schwierigkeit_anpassung: "Standard „Adaptive Engine“: Antwortfenster je Einzeltaste 1.800 ms × Faktor 0,45–1,4 (= 810–2.520 ms); jede gelöste Aufgabe −0,04, jeder Fehler/jedes Verpassen +0,08, gedrückte Falle +0,10 → pendelt sich bei ≈ 67 % gelösten Aufgaben ein (eigene Berechnung nach Code). Feste Stufen: Easy ×1,5 ohne Fallen, Medium ×1,0 mit 12 %, Hard ×0,75 mit 22 %, Expert ×0,55 mit 32 % Fallen. Folgen +600 ms je weitere Taste, Merkfolgen +1.400 ms."
messgroessen: ["Punkte (120 × Combo-Faktor 1,0–3,0 × Aufgabentyp 1,0/1,4/1,8; ignorierte Falle +200)", "Genauigkeit = richtige ÷ alle Tastendrücke (Verpassen zählt nicht)", "KPM = alle Tastendrücke je Minute (inkl. Fehler)", "mittlere „Reaktionszeit“ (ab Aufgabenbeginn, bei Folgen kumulativ)", "längste Combo", "sinnvoll ergänzend: Median-Reaktionszeit nur für Einzeltasten (ms)", "sinnvoll ergänzend: Fehlalarmquote bei Fallen und Auslassungsquote getrennt", "sinnvoll ergänzend: Reaktionszeit je Taste/Tastenzone"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 1
    farbunterscheidung: 1
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 1
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 2
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 1
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 1
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 0
    entscheidung_wahlreaktion: 3
    lesen_sprache: 1
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 1
    zielbewegung_tempo: 1
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 1
    fingersequenz_bimanual: 3
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 3
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Physische Tastatur (Desktop/Laptop); reine Touch-Geräte werden im Original gesperrt", "Sichere Kenntnis von Buchstaben, Ziffern und der eigenen Tastenbelegung", "US-Tastaturbelegung oder Voreinstellung ohne Y/Z und Sonderzeichen (sonst Fehlwertung auf deutscher QWERTZ-Tastatur)", "Keine feine Sehschärfe nötig (Zeichen ≈ 1–2,4° groß)"]
vorsicht_bei: [kognitive_einschraenkung, aufmerksamkeitsprobleme, lese_rechtschreib_schwaeche, hand_arm_beschwerden, tremor_parkinson, presbyopie_gleitsicht, kinder_unter_6]
geeignet_fuer: ["Wahlreaktion mit Reiz-Taste-Zuordnung unter Zeitvorgabe üben", "erleben, wie die Entscheidungszeit mit der Zahl der Alternativen wächst (Hick'sches Gesetz)", "ruhige, sitzende Übung am Tablet mit großen Tasten und ohne Blitze", "eigenen Fortschritt am selben Gerät und mit derselben Tastenauswahl verfolgen"]
weniger_geeignet_fuer: ["wer Tastenwege auf einer echten Tastatur blind einüben möchte (diese Übung nutzt Bildschirmtasten)", "Ziele im Bereich Sehen, Blickmotorik oder Zielgenauigkeit (Augen werden kaum gefordert)", "Menschen ohne sichere Buchstaben-/Ziffernkenntnis oder mit Leseschwäche unter Zeitdruck", "Vergleich mit anderen Personen (Werte hängen von Stufe, Gerät und Zeitmessung ab)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Übung verkleinert den Einfluss der Alternativenzahl auf die Wahlreaktionszeit bei gleichbleibender Zuordnung (Proctor & Schneider, 2018; Logan et al., 2016), das Gelernte bleibt aber an Zuordnung und Aufgabe gebunden (Karni et al., 1995); Nutzen für Spielleistung oder Alltag ist nicht untersucht."
aehnliche_uebungen: [202, 102, 802, 101, 701, 207, 602, 601]
stichworte: ["Wahlreaktion", "Hick'sches Gesetz", "Tastatur", "Keybinds", "Hotkeys", "Blindschreiben", "Go/No-go", "Reiz-Reaktions-Zuordnung", "Sequenz", "Tastenbelegung", "Impulskontrolle"]
---

# 703 · Tasten-Wahlreaktion (Zeichen der passenden Taste zuordnen)

> Original: „Tastatur-Reaktionszeit-Test – Keybind-Trainer & Tastengeschwindigkeitstest“ (englisch „Keyboard Speed Test“) – skilldrills.online, Kapitel Motorik (`motor`, Unterkapitel `movement-speed`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Oben erscheint ein Zeichen, bestehend aus einer Form und einem Buchstaben (Dreieck A, Quadrat B, Raute C, Kreis D); es wird weich eingeblendet. Unten liegen zwei bis vier große Bildschirmtasten mit denselben Zeichen, und man tippt die passende Taste. Auf den ersten Stufen sind es zwei Tasten, später drei und vier; ab Stufe 9 wechseln die Tastenplätze vor jedem Durchgang. Die Antwortfrist verkürzt sich von etwa 3,0 Sekunden auf Stufe 1 auf etwa 1,35 Sekunden auf Stufe 12. Drei richtige Antworten in Folge führen eine Stufe höher, eine falsche oder zu späte eine Stufe tiefer. Eine Sitzung besteht aus einer festen Zahl von Durchgängen, ohne Zeitbonus und ohne Zeitstrafe. Wer eine Tastatur nutzt, kann auch die Ziffern 1 bis 4 drücken. Gemessen werden Stufe, Median und Streuung der Zeiten sowie falsche und zu langsame Antworten. Es ist im Kern eine **Wahlreaktionsaufgabe mit Zuordnung**, keine Tipptempo-Messung.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Seiten-Chunk `app/de/drills/motor/movement-speed/keyboard-recognition/page-…js`, Spiel-Chunk `42589-…js`, gemeinsame Module in `33539-…js`; gelesen am 29.09.2026, nur Mechanik übernommen). **[Code]** = aus dem Code, **[Text]** = nur aus dem Regeltext.

- **Start und Dauer:** Countdown 3-2-1-GO (2,45 s), dann **60 s** **[Code]**. Die Spieluhr rechnet mit echter Bildzeit (Δt, begrenzt auf 0,1 s), die Antwortfenster laufen über Timer in Echtzeit → unabhängig von 60/144 Hz **[Code]**. Escape oder Verlassen des Vollbilds bricht ab.
- **Eingabe:** nur `keydown` der Tastatur, ausgewertet über `KeyboardEvent.code` (= **physische Tastenposition**, nicht das gedruckte Zeichen) **[Code]**. Auf Geräten mit Touch und ohne feinen Zeiger (`pointer: fine`) erscheint statt des Startknopfs „Keyboard Required“ – auch ein Tablet mit Bluetooth-Tastatur, aber ohne Maus/Trackpad, bleibt gesperrt **[Code]**. Tasten-Wiederholung beim Gedrückthalten wird nicht herausgefiltert; nur Tab, Alt und Leertaste werden vom Browser abgefangen **[Code]**.
- **Tastenauswahl:** Standard ist die Voreinstellung „Valorant“ mit **19 Tasten** (W A S D, Space, Shift, Ctrl, Q E C X, 1–4, F R G Z) **[Code/Text]**; weitere Voreinstellungen (CS2, Fortnite, Minecraft, League of Legends, Apex) oder freie Auswahl aus Buchstaben, Ziffern, Modifikatoren und 11 Sonderzeichen.
- **Aufgabentypen im Standardmodus „Dynamic Mixed Progression“ + „Adaptive Engine“ [Code]:** Falle 15 %, Folge 30 % (2 oder 3 Tasten, jeweils zufällig aus der Auswahl), Merkfolge 15 % (3 Tasten, 1.000 ms sichtbar, dann leere Kästchen), Einzeltaste 40 %. Einzelmodi: nur Einzeltasten, nur Buchstaben/Ziffern, kurze Folgen (3), lange Folgen (5), nur Merkfolgen, nur Fallen.
- **Zeitfenster [Code]:** Einzeltaste 1.800 ms × Anpassungsfaktor (Start 1,0; nach jeder gelösten Aufgabe −0,04, bis 0,45; nach Fehler oder Verpassen +0,08, nach gedrückter Falle +0,10, bis 1,4) → **810–2.520 ms**. Folgen: + 600 ms je weitere Taste; Merkfolgen: + 1.400 ms nach der Merkphase; Fallen: 95 % des Fensters. Bei festen Stufen: Faktor 1,5/1,0/0,75/0,55 (2.700/1.800/1.350/990 ms) mit 0/12/22/32 % Fallen. Die Seite nennt als adaptive Spanne „1,5- bis 0,55-fach“ – **im Code sind es 1,4 bis 0,45** (Widerspruch Text ↔ Code). Die Folgenlänge im Mischmodus ist immer 2–3, die „seqLimit“-Werte 4/5 der schweren Stufen bleiben wirkungslos.
- **Anpassungslogik [eigene Berechnung nach Code]:** −0,04 je Erfolg und +0,08 je Fehler halten sich bei **2 Erfolgen : 1 Fehler** die Waage – das adaptive Verfahren pendelt sich also bei ≈ 67 % gelösten Aufgaben ein (vereinfacht, ohne Fallen). Man arbeitet damit dauerhaft an der eigenen Zeitgrenze.
- **Fallen („Trap Guard“) [Code]:** eine Taste, die **nicht** zur aktiven Auswahl gehört (bei Valorant eine von 44 übrigen, darunter F1–F6, Pfeile, Enter), in **Orange/Bernstein** (#f59e0b), in anderer Schrift (serifenlos statt Festbreite) und mit orangem Hintergrundschimmer. **Jede** Taste während einer Falle zählt als Fehler; wer nichts drückt, erhält nach Ablauf +200 Punkte. Die Seite spricht von „roten“ Scheinreizen – im Code sind sie **orange**, und Farbe ist nicht das einzige Merkmal. Nach einer korrekt ignorierten Falle färbt sich der Hintergrund trotzdem kurz „falsch“ (rosa), der Ton ist aber der Trefferton – widersprüchliche Rückmeldung. Der Einzelmodus „nur Fallen“ ist trivial lösbar (nie drücken).
- **Punkte [Code]:** gelöste Aufgabe 120 × Combo-Faktor × Typfaktor (Einzeltaste 1,0, Folge 1,4, Merkfolge 1,8). Combo-Faktor: ab 3 in Serie 1,1; 5 → 1,25; 7 → 1,35; 10 → 1,5; 15 → 1,75; 20 → 2,0; 30 → 2,5; ab 50 → 3,0 („bis 3,0×“ auf der Seite stimmt). Fehler, gedrückte Falle oder Verpassen setzen die Combo auf 0; kein Punktabzug.
- **Auswertung [Code]:** *Genauigkeit* = richtige Tastendrücke ÷ alle Tastendrücke; **verpasste Aufgaben zählen nicht** (Auslassungen bleiben unsichtbar). *KPM* = **alle** Tastendrücke (auch falsche) ÷ gespielte Minuten – die FAQ behauptet „richtige Anschläge“ (Widerspruch). *Ø Reaktion* = Mittel aller richtigen Tastendrücke, jeweils gemessen **ab Beginn der Aufgabe**: bei Folgen wächst der Wert mit jeder weiteren Taste, bei Merkfolgen ist die 1-s-Merkphase enthalten. Der Wert ist daher **keine Einzeltasten-Latenz** und mit der „Einzeltasten“-Spalte der Stufentabelle nicht vergleichbar. Noten: S+ ab 3.500 Punkten und ≥ 95 %, S ≥ 2.200/90 %, A ≥ 1.400/85 %, B ≥ 700/80 %, C ≥ 300/75 %, D ≥ 100/65 %, sonst F. Bestwerte nur lokal (localStorage).
- **Darstellung [Code]:** Einzeltaste in Festbreitenschrift, 48 px (schmale Fenster) bis 128 px (≥ 1.024 px Breite); Folgen als Kästchen mit 60-px-Zeichen, die aktuelle Taste weiß hervorgehoben, noch folgende Tasten dunkelgrau auf fast schwarz (Kontrast ≈ 2,4 : 1 [eigene Berechnung]). Rückmeldung: grüner bzw. rosa Hintergrundschimmer (10 % Deckkraft, 150–180 ms), Töne; zusätzlich ein abschaltbarer Fehlereffekt: rötlicher, flächiger Schimmer über das ganze Spielfeld (≈ 0,45 s, einzeln, kein periodisches Flackern). Eine globale Einstellung kann die Zeitfenster ganz abschalten (dann kein Zeitdruck je Aufgabe) **[Code]**.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite nennt die Übung ein „hochpräzises neuro-motorisches Trainingsinstrument“, das „kortikospinales Muskelgedächtnis konditioniert“ und in CS2, Valorant oder League of Legends „spielentscheidend“ sei. Gestützt auf Donders (1868), Hick (1952), Logan & Cowan (1984) und Sternberg (1966) sollen Wahlreaktionszeit, räumliche Tastaturorientierung, Sequenz-Chunking und Impulskontrolle trainiert werden. Visuelle Reizverarbeitung dauere „physiologisch 200–250 ms“. Eine Tabelle ordnet „unter 240 ms / 320+ KPM / 98–100 %“ als „Top 1 % (Elite)“ ein, 380–480 ms als „Durchschnitt“. Empfohlen werden täglich 10–15 min in 3–4 Blöcken und mechanische Tastaturen mit ≥ 1.000 Hz Polling.

**Einordnung:**
- **Grundidee richtig:** Die Wahlreaktionszeit steigt etwa mit dem Logarithmus der Alternativenzahl (Hick, 1952); Übung und eine gut passende Reiz-Reaktions-Zuordnung verkleinern diesen Anstieg (Proctor & Schneider, 2018). Bei Schreibkräften nimmt der Einfluss der Alternativenzahl durch konsistente Übung ab (Logan et al., 2016).
- **„Nähert die Reaktion einem Reflex an“ ist nicht belegt:** Übung verkleinert die Hick-Steigung, beseitigt den Auswahlschritt aber nicht – es bleibt eine willkürliche Wahlreaktion (Proctor & Schneider, 2018). Das Tastenwissen geübter Tippender ist dabei weitgehend implizit, bewusst abrufbar ist es schlecht (Liu et al., 2010).
- **„200–250 ms Reizverarbeitung“ stimmt so nicht:** Die englische Fassung der Seite spricht von „einfacher visueller Reaktion“ – das passt ungefähr; die deutsche Übersetzung macht daraus „Reizverarbeitung“. Woods et al. (2015) messen 213–231 ms für die **gesamte einfache Reaktion** (Reizentdeckung ≈ 131 ms). Deshalb ist die „Elite“-Stufe **unter 240 ms bei 19+ Tasten praktisch unerreichbar** – das läge auf dem Niveau einer einfachen Reaktion ohne Wahl [eigene Einordnung]. Zum Vergleich: Im freien Tippen liegen zwischen Anschlägen im Mittel 239 ms (Dhakal et al., 2018), aber mit Vorauslesen des Textes (Salthouse, 1984) – hier fehlt jede Vorschau.
- **„320+ KPM“** (≥ 5,3 Anschläge/s, also ≤ 188 ms je Anschlag über die ganze Runde) ist bei einzeln erscheinenden Aufgaben ohne Vorschau sehr unwahrscheinlich – schneller als das mittlere freie Tippen mit Vorauslesen (239 ms; Dhakal et al., 2018); zudem zählt das Spiel KPM inklusive Fehlanschlägen [eigene Einordnung/Berechnung nach Code].
- **Die Stufentabelle hat keine Datengrundlage:** Die Seite erklärt selbst, keine Nutzerdaten zu sammeln; in keiner genannten Quelle stehen diese Perzentile.
- **Stopp-Signal (Logan & Cowan, 1984) passt nur teilweise:** Die Fallen sind Go/No-go-Reize (der Reiz selbst sagt „nicht drücken“), kein Stopp-Signal nach einem Startreiz (Verbruggen et al., 2019; Wessel, 2018). Mit 15 % seltenen Fallen in schneller Folge entsteht aber wahrscheinlich eine vorbereitete Antworttendenz, die gehemmt werden muss (seltene No-go-Reize und kurzes Tempo sind dafür nötig; Wessel, 2018).
- **Sternberg (1966)** handelt vom Absuchen des Kurzzeitgedächtnisses (Titel „… in human memory“, auf der Seite falsch „perception“), nicht von motorischem Chunking. Chunking bei Sequenzen gibt es (Sakai et al., 2003) – aber nur bei **wiederholten** Folgen; hier sind die Folgen jedes Mal zufällig.
- **„Blind“ wird nicht geprüft:** Ob man auf die Tastatur schaut, erfasst das Spiel nicht.

## 4. Optische und okulomotorische Grundlagen

- **Reizgröße:** Das Zeichen oben und die Tasten unten sind groß (Tasten mindestens 56 Pixel). Form und Buchstabe tragen die Information, Farbe ist nur ein Zusatz. Zur Orientierung: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°. Die Sehschärfe begrenzt nicht; auch bei deutlich reduziertem Visus bleiben Form und Buchstabe erkennbar.
- **Farbe:** Weil etwa 8 % der Männer eine Rot-Grün-Schwäche haben (Birch, 2012), ist die Zuordnung nicht an Farbe gebunden. Rückmeldungen erscheinen als weiches Häkchen oder Kreuz, nicht nur in Farbe.
- **Blickverhalten:** Der Blick wechselt zwischen dem Zeichen oben und den Tasten unten; ab Stufe 9 wechseln die Tastenplätze, sodass der Blick die passende Taste erst suchen muss. Das kostet Zeit und gehört zur Aufgabe.
- **Brille/Gleitsicht:** Am Tablet liegen Zeichen und Tasten beide im Nahbereich. Am Monitor (etwa 60 cm) liegen sie in verschiedenen Zonen eines Gleitsichtglases; der Wechsel verlangt Kopf- oder Blickbewegung (Weidling & Jaschinski, 2015). Eine Arbeitsplatzbrille mit breitem Zwischenbereich ist dort angenehmer.
- **Trockenes Auge:** Konzentriertes Schauen senkt die Lidschlagrate (Patel et al., 1991) – bei einer kurzen Sitzung unkritisch. Das Zeichen wird weich eingeblendet (etwa 160 ms), es gibt keine Flimmer-, Blitz- oder Bewegungsreize; Stereosehen spielt keine Rolle.

## 5. Neurowissenschaftliche Grundlagen

- **Kette einer Wahlreaktion:** Zeichen erkennen (visuelle Areale bis in den ventralen Schläfenlappen) → Antwort auswählen (Zuordnung Zeichen → Taste; prämotorische und parietale Areale) → Ausführen (primärmotorischer Kortex, supplementär-motorisches Areal, Basalganglien, Kleinhirn; vgl. Witt et al., 2008, für Fingerbewegungen). Die Unterscheidung von einfacher und Wahlreaktion geht auf Donders (1868; Übersetzung 1969) zurück. Dass das Lernen im „kortikospinalen Muskelgedächtnis“ verortet wäre, ist eine Metapher; belegt ist, dass motorisches Sequenzlernen kortiko-striatale, Anpassungslernen kortiko-zerebelläre Netzwerke nutzt (Doyon & Benali, 2005).
- **Automatisierung:** Nach der Instanztheorie ersetzt mit der Übung das direkte Abrufen gespeicherter Reiz-Antwort-Episoden die langsame Regelanwendung (Logan, 1988) – deshalb profitiert man nur für die **geübte Zuordnung**. Karni et al. (1995) fanden für eine geübte Fingerfolge Veränderungen im motorischen Kortex, aber keine Übertragung auf eine andere Folge.
- **Vorwegnehmen:** Einfache Reaktionen liegen bei etwa 213–231 ms, die reine Reizentdeckung bei etwa 131 ms (Woods et al., 2015). Tipps, die weniger als 120 ms nach dem Erscheinen des Zeichens (oder davor) erfolgen, gelten deshalb als Vorwegnehmen, nicht als Reaktion; sie zählen nicht und verschieben den nächsten Reiz.

## 6. Motorische Grundlagen

- **Hick und Fitts:** Beim Tippen konkurrieren kurze Wege (viele Finger → Fitts) mit wenigen Wahlmöglichkeiten je Finger (wenige Finger → Hick); geübte Zehnfinger-Schreibende lösen das durch konsistente Zuordnung (Logan et al., 2016). Hier liegen die großen Tasten nebeneinander, die Wege sind kurz und ähnlich lang, und die Zuordnung ist visuell (gleiches Zeichen); es bleibt vor allem die Auswahl (Hick), die mit der Tastenzahl wächst.
- **Zielgröße:** Fingertippen ist schnell, aber ungenau: 4,8 mm breite Ziele → 11–14 % Fehler, 7,2 mm → 3–6 % (Bi et al., 2013). Die Tasten sind deshalb groß; Zielgenauigkeit begrenzt nicht.
- **Speed-Accuracy-Trade-off:** Die Antwortfrist wird mit der Stufe knapper; bei knappen Fristen steigen Verwechslungen benachbarter Tasten. Doppeltipps (weniger als 350 ms nach einer Antwort) werden ignoriert.
- **Alter:** Die Wahlreaktionszeit verlangsamt sich über das ganze Erwachsenenalter (n = 7.130; Der & Deary, 2006).
- **Belastung:** Eine Sitzung ist körperlich gering belastend; bei Sehnen- oder Handgelenkbeschwerden kurz halten und Pausen machen.

## 7. Einflussfaktoren und Messgrenzen

- **Gerätelatenz:** Auf dem Touchscreen wird die Zeit um mehrere Dutzend Millisekunden zu lang gemessen (Pronk et al., 2020); Eingabegeräte unterscheiden sich in der Latenz um bis zu mehrere Dutzend Millisekunden (Wimmer et al., 2019), Monitore um etwa 11 ms (Woods et al., 2015). Gemessen wird vom ersten gezeichneten Bild des Zeichens bis zum Zeitpunkt des Tipps. Absolute Zeiten sind deshalb zwischen Geräten kaum vergleichbar; zwei Geräte können hoch korrelieren und trotzdem systematisch abweichen – Korrelation ist nicht Übereinstimmung (zum Grundsatz aus der Messmethodik: Mountford et al., 2004, S. 24). Sinnvoll ist der Vergleich mit sich selbst auf demselben Gerät.
- **Tastenzahl und Plätze** bestimmen die Schwierigkeit (Hick): Zwei Tasten sind etwas anderes als vier mit wechselnden Plätzen. Verglichen werden sollte nur bei gleicher Stufe.
- **Streuung:** Einzelne Messungen am Menschen streuen; deshalb werden Median und Streuung der Zeiten gezeigt, und aussagekräftiger als ein Einzelwert ist der Verlauf über mehrere Sitzungen (Mountford et al., 2004, S. 44). Zuverlässigkeitsdaten für diese Übung gibt es nicht.
- **Getrennte Fehlerarten:** Falsche Taste, zu langsam und zu früh werden getrennt gezählt; die Zeiten stammen nur aus richtigen Antworten.
- **Tastatur:** Die Ziffern 1 bis 4 sind den Zeichen A bis D zugeordnet; das hängt nicht von der Tastaturbelegung (QWERTZ, QWERTY) ab.
- **Übungseffekt:** Schnelle Anfangsgewinne sind überwiegend Aufgaben- und Zuordnungslernen; Leistungskurven flachen dann ab.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Übung und konsistente Zuordnung verkleinern die Wahlkosten (Proctor & Schneider, 2018; Logan et al., 2016). Studien zu genau dieser Übung fehlen.
- **Naher Transfer – schwach:** Automatisierung ist an die geübten Reiz-Antwort-Paare gebunden (Logan, 1988); Fingerfolgen-Training überträgt sich nicht auf andere Folgen (Karni et al., 1995). Denkbar ist Nutzen für **dieselbe** Zuordnung – untersucht ist das nicht.
- **Alltagstransfer – fehlend:** Kein Beleg für bessere Spielleistung, schnelleres Schreiben oder allgemeine Entscheidungsgeschwindigkeit; Videospiel- und Kognitionstraining zeigen allgemein keinen Ferntransfer (Sala et al., 2018).

## 9. Auswahlhinweise

- **Passt, wenn …** jemand am Tablet oder am Computer eine schnelle Wahlreaktions- und Zuordnungsaufgabe sucht; ruhig, ohne Blitze und mit großen Tasten; als Ergänzung zu 202 (Wahlreaktion) oder 102 (Go/No-go).
- **Weniger passend, wenn …** Ziele im Bereich Sehen, Blickfolge oder Sehfeld bestehen; Tastenwege auf einer echten Tastatur blind eingeübt werden sollen (diese Übung nutzt Bildschirmtasten); Zeichenkenntnis unsicher ist; jemand ohne Zeitdruck üben möchte (die Antwortfrist ist fest und wird knapper).
- **Vorsicht / anpassen bei …**
  - `kognitive_einschraenkung`: wechselnde Tastenplätze und knapper werdende Fristen überfordern leicht → auf den unteren Stufen bleiben.
  - `aufmerksamkeitsprobleme`: Zu frühes Tippen und Verpassen können Frust fördern; Erfolge statt Fehler betonen.
  - `lese_rechtschreib_schwaeche`: Zuordnen von Buchstaben und Formen unter Zeitvorgabe; die Form trägt die Information mit.
  - `hand_arm_beschwerden`: bei längeren Blöcken Belastung von Fingern und Handgelenk; kurze Runden, Pausen. Taubheit oder Schwäche in Hand und Arm gelten als Anlass zur ärztlichen Abklärung (Muchnick, 2008, S. 28).
  - `tremor_parkinson`: gezieltes Antippen unter Zeitvorgabe ist erschwert, Fehltipps senken die Stufe; die Übung stellt keine Bewertung an.
  - `presbyopie_gleitsicht`: am Tablet unproblematisch; am Monitor mit Gleitsichtglas Wechsel zwischen Zonen; eine Arbeitsplatzbrille ist angenehmer. Keine Aussage über Sehen oder Sehkorrektur.
  - `kinder_unter_6`: setzt Zeichenkenntnis voraus.
  - Farbsehschwäche ist **kein** Ausschluss (Form und Buchstabe tragen die Information).
  - Allgemein: Bei Doppelbildern, plötzlichem Sehverlust, Schwindel oder Kopfschmerz mit Sehverschlechterung die Übung abbrechen und ärztlich abklären lassen (vgl. Muchnick, 2008, S. 6, 28).
- **Kombiniert gut mit …** 202 (Wahlreaktion am Bildschirm), 102 (Go/No-go, Impulskontrolle) und 802 (Abfangen mit der Maus mit Go/No-go-Regel), 101 (einfache Reaktion als Vergleich: Wahlkosten ≈ Differenz der Reaktionszeiten; 301 ist trotz seines Namens eine Zeitschätzaufgabe und dafür ungeeignet), 701 (Tipp-Tempo) und 708 (Zielfolge mit der Maus) als motorische Ergänzung, 602 und 601 (Merkspanne statt Merkfolge unter Zeitdruck), 207 (Symbol-Zuordnung).
- **Abgrenzung:** Nahe verwandt sind 202 (Wahlreaktion) und 102 (Go/No-go); 703 betont die Zuordnung von Zeichen zu Tasten bei wachsender Zahl von Alternativen. 708 ist eine Maus-Zielübung ohne Fingerfolgen – keine Dublette.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Tablet/Touch (Hauptgerät):** Ohne physische Tastatur ist die Übung nicht umsetzbar; eine Bildschirmtastatur verwandelt sie in visuelle Suche + Tippen (Finger verdeckt Tasten, kein blindes Finden, keine Fingerzuordnung). Sinnvolle Touch-Variante wäre eine **Wahlreaktion mit 2–6 großen, festen Tastfeldern** (≥ 15–20 mm; Bi et al., 2013) und fester räumlicher Zuordnung – das ist eine andere Übung (näher an 202). Mit Bluetooth-Tastatur sollte die Übung am Tablet **nicht** gesperrt werden (Erkennung über den ersten Tastendruck statt `pointer: fine`).
- **Belegung korrekt:** Zeichen statt Position auswerten (`KeyboardEvent.key`, Groß-/Kleinschreibung ignorieren) oder die Beschriftung aus der tatsächlichen Belegung ableiten; DE/IT-Tastaturen ausdrücklich testen; Sonderzeichen standardmäßig weglassen.
- **Ehrliche Messgrößen:** Median-Reaktionszeit nur aus Einzeltasten, getrennt: Fehlanschläge, Auslassungen, Fehlalarme bei Fallen; KPM nur richtig; Tasten-Wiederholung (`repeat`) ignorieren; keine „Elite/Top 1 %“-Stufen, nur eigener Verlauf mit gleicher Tastenauswahl und gleichem Gerät.
- **Fallen klar und fair:** eindeutiges Merkmal (z. B. Symbol ⊘ plus Farbe plus Form), Rückmeldung beim korrekten Ignorieren positiv (nicht rosa); Fallen selten halten und schnelles Tempo beibehalten, damit überhaupt eine Antworttendenz entsteht (Wessel, 2018), Anteil fest je Stufe (z. B. 15–25 % – eigene Festlegung, kein Studienwert); Modus „nur Fallen“ entfernen.
- **Zeitdruck dosierbar:** Die Option „ohne Zeitfenster“ beibehalten und sichtbar anbieten; adaptives Ziel eher 75–80 % statt 67 % Erfolg, damit es nicht frustriert.
- **Lesbarkeit:** folgende Tasten in Folgen mit Kontrast ≥ 4,5 : 1; keine Vollflächen-Fehlereffekte.
- **Text ohne Übertreibung:** kein „kortikospinales Muskelgedächtnis“, kein Reflex-Versprechen; Aussage: „Du wirst in dieser Aufgabe mit dieser Tastenbelegung schneller.“

## 11. Quellen

### Von der Website angegeben

- Donders, F. C. (1969). On the speed of mental processes (W. G. Koster, Übers.). *Acta Psychologica, 30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 (zuerst 1868 erschienen) – **Prüfung:** DOI stimmt ✓ (Übersetzung 1969); **stützt die Aussage der Website:** ja – Unterscheidung einfache vs. Wahlreaktion (Subtraktionsmethode); zu Tastatur-Training keine Aussage.
- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** ja für den logarithmischen Anstieg; nein für „Muskelgedächtnis nähert die Reaktion einem Reflex an“ – dazu steht bei Hick nichts; Übung verkleinert nur die Steigung (Proctor & Schneider, 2018), ein Reflex wird es nicht.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise – bestätigt Hardware-Einflüsse (Monitor 11 ms, Maus bis ≥ 20 ms) und damit „gleiches Setup vergleichen“; „200–250 ms Reizverarbeitung“ (deutsche Fassung) nein: 213–231 ms ist die ganze einfache Reaktion, Reizentdeckung ≈ 131 ms; die englische Fassung („einfache visuelle Reaktion ≈ 200–250 ms“) passt dagegen ungefähr. Die Stufentabelle stammt aus keiner der Quellen.

### Weitere Fachliteratur

- Bi, X., Li, Y., & Zhai, S. (2013). FFitts law. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems* (S. 1363–1372). ACM. https://doi.org/10.1145/2470654.2466180 – Fehlerraten bei kleinen Touch-Zielen
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit Farbsehschwäche.
- Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood: Results from the United Kingdom Health and Lifestyle Survey. *Psychology and Aging, 21*(1), 62–73. https://doi.org/10.1037/0882-7974.21.1.62 – Alterseffekt der Wahlreaktion.
- Doyon, J., & Benali, H. (2005). Reorganization and plasticity in the adult brain during learning of motor skills. *Current Opinion in Neurobiology, 15*(2), 161–167. https://doi.org/10.1016/j.conb.2005.03.004 – Netzwerke motorischen Lernens.
- Karni, A., Meyer, G., Jezzard, P., Adams, M. M., Turner, R., & Ungerleider, L. G. (1995). Functional MRI evidence for adult motor cortex plasticity during motor skill learning. *Nature, 377*(6545), 155–158. https://doi.org/10.1038/377155a0 – Lernspezifität von Fingerfolgen.
- Logan, G. D. (1988). Toward an instance theory of automatization. *Psychological Review, 95*(4), 492–527. https://doi.org/10.1037/0033-295X.95.4.492 – Automatisierung als aufgabenspezifischer Abruf (Crossref ✓, nur Kurzfassung).
- Logan, G. D., Ulrich, J. E., & Lindsey, D. R. B. (2016). Different (key)strokes for different folks: How standard and nonstandard typists balance Fitts' law and Hick's law. *Journal of Experimental Psychology: Human Perception and Performance, 42*(12), 2084–2102. https://doi.org/10.1037/xhp0000272 – Hick vs. Fitts beim Tippen, Einfluss verdeckter Tastatur (Crossref ✓, Abstract).
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messwerte streuen, Wiederholmessung sinnvoll (S. 44)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science*, 68(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology, 71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 – Übung und Kompatibilität verändern die Hick-Steigung.
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Messfehler im Browser.
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – fehlender Ferntransfer.
- Weidling, P., & Jaschinski, W. (2015). The vertical monitor position for presbyopic computer users with progressive lenses: How to reach clear vision and comfortable head posture. *Ergonomics*, 58(11), 1813–1829. https://doi.org/10.1080/00140139.2015.1035764 – Monitorhöhe bei Gleitsichtgläsern
- Wimmer, R., Schmid, A., & Bockes, F. (2019). On the latency of USB-connected input devices. In *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems* (S. 1–12). ACM. https://doi.org/10.1145/3290605.3300650 – Tastaturlatenz.
- Witt, S. T., Laird, A. R., & Meyerand, M. E. (2008). Functional neuroimaging correlates of finger-tapping task variations: An ALE meta-analysis. *NeuroImage*, 42(1), 343–356. https://doi.org/10.1016/j.neuroimage.2008.04.025 – beteiligte Hirnnetzwerke
