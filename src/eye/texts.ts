// EYE-EXPERIMENT: Texte (DE/IT) für die Startseite /eye/ und die Testumgebung /eye/labor/.
import type { Lang } from '../i18n/lang';
import type { TrackerErrorCode } from './tracker';
import type { Quadrant } from './types';

export interface EyeTexts {
  pageTitleHome: string;
  pageTitleLab: string;
  backApp: string;
  backHome: string;
  backNoCamera: string;
  experiment: string;
  home: {
    h1: string;
    lead: string;
    labTitle: string;
    labText: string;
    labOpen: string;
    gameTitle: string;
    gameText: string;
    gameSoon: string;
    howTitle: string;
    how: string[];
    privacyTitle: string;
    privacy: string[];
    limitsTitle: string;
    limits: string[];
    legalTitle: string;
    legal: string[];
  };
  lab: {
    h1: string;
    lead: string;
    // 1
    s1: string;
    s1Purpose: string;
    s1Privacy: string[];
    s1Setup: string[];
    s1Consent: string;
    s1Start: string;
    s1StartSynthetic: string;
    s1Starting: string;
    s1Camera: string;
    s1Model: (pct: number) => string;
    s1Engine: string;
    s1Running: string;
    s1Stopped: string;
    errors: Record<TrackerErrorCode, { title: string; help: string }>;
    // 2
    s2: string;
    s2Lead: string;
    faceFound: string;
    faceYes: string;
    faceNo: string;
    camFps: string;
    evalFps: string;
    procTime: string;
    headYaw: string;
    headPitch: string;
    distance: string;
    distanceNote: string;
    resolution: string;
    engine: string;
    engineGpu: string;
    engineCpu: string;
    engineSynthetic: string;
    brightnessOk: string;
    brightnessDark: string;
    brightnessBright: string;
    reflectionTip: string;
    noFaceTip: string;
    headTurnTip: string;
    synthNote: string;
    // 3
    s3: string;
    s3Lead: string;
    s3Start: string;
    s3Hint: string;
    s3Running: (i: number, n: number) => string;
    s3Cancel: string;
    s3Done: string;
    s3Result: (loo: string, model: string, used: number, total: number) => string;
    s3Remember: string;
    s3Forget: string;
    s3Restored: string;
    s3NeedStart: string;
    calFail: Record<string, string>;
    // 4
    s4: string;
    s4Lead: string;
    s4Distance: (cm: number) => string;
    s4Inch: string;
    s4InchHint: string;
    s4Assumption: (inch: string, source: string, cm: number) => string;
    srcGuessTablet: string;
    srcGuessPhone: string;
    srcInput: string;
    s4Start: string;
    s4Running: (i: number, n: number) => string;
    s4Mean: string;
    s4Median: string;
    s4P95: string;
    s4Verdict: Record<'good' | 'ok' | 'poor', string>;
    s4VerdictNote: string;
    s4Heat: string;
    s4HeatNote: string;
    s4BiasSpread: (bias: string, spread: string) => string;
    s4NeedCal: string;
    s4Jitter: string;
    s4JitterHint: string;
    s4JitterStart: string;
    s4JitterResult: (sd: string, deg: string, sx: string, sy: string, n: number) => string;
    colMetric: string;
    colPx: string;
    colDeg: string;
    // 5
    s5: string;
    s5Lead: string;
    s5Disclaimer: string;
    s5Start: string;
    s5Prompt: (i: number, n: number) => string;
    s5Detected: (q: string) => string;
    s5DetectedNone: string;
    s5NoFace: string;
    s5Total: (hits: number, n: number) => string;
    s5ColCorner: string;
    s5ColHits: string;
    s5ColArrival: string;
    s5Confusion: string;
    s5ConfusionNote: string;
    // 6
    s6: string;
    s6Lead: string;
    s6Open: string;
    s6Smooth: string;
    s6SmoothHint: string;
    s6Less: string;
    s6More: string;
    s6Close: string;
    // 7
    s7: string;
    s7Lead: string;
    s7Pair: string;
    s7PairH: string;
    s7PairD: string;
    s7PairV: string;
    s7Start: string;
    s7Switch: (i: number, n: number) => string;
    s7Result: string;
    s7Transition: string;
    s7Arrival: string;
    s7Frame: (ms: string) => string;
    s7Note: string;
    s7Valid: (v: number, n: number) => string;
    // 8
    s8: string;
    s8Lead: string;
    s8Copy: string;
    s8Copied: string;
    s8CopyFailed: string;
    s8Show: string;
    // 9
    s9: string;
    s9Cameras: string;
    s9Switch: string;
    s9OneCamera: string;
    s9Engine: string;
    s9EngineAuto: string;
    s9EngineCpu: string;
    s9EngineGpu: string;
    s9EngineHint: string;
    s9Stop: string;
    s9Stopped: string;
    // allgemein
    quadrant: Record<Quadrant, string>;
    cancel: string;
    needStart: string;
    stale: string;
    faceLost: string;
    yes: string;
    no: string;
    ms: string;
    medianWord: string;
    legalFoot: string[];
  };
}

const de: EyeTexts = {
  pageTitleHome: 'Blickfit – Experiment Blickschätzung',
  pageTitleLab: 'Blickfit – Testumgebung Blickschätzung',
  backApp: 'Zurück zu Blickfit',
  backHome: 'Zurück zum Experiment',
  backNoCamera: 'Zurück zu den Übungen ohne Kamera',
  experiment: 'Experiment',
  home: {
    h1: 'Experiment: Blickschätzung über die Frontkamera',
    lead: 'Ein Versuchsbereich: Die Frontkamera des Tablets schätzt grob, in welchem Viertel des Bildschirms Sie hinschauen. Daraus soll später eine Variante des „4-Ziele-Wechsels“ werden. Zuerst prüfen wir mit einer Testumgebung, wie gut das auf Ihrem Gerät überhaupt klappt.',
    labTitle: 'Testumgebung',
    labText: 'Kamera, Kalibrierung, Genauigkeitsprüfung, Viertel-Test, Blickpunkt-Ansicht, Zeitverhalten und Export der Messwerte – ohne Spiel. Hier sehen Sie, ob und wie genau Ihr Gerät den Blick schätzen kann.',
    labOpen: 'Testumgebung öffnen',
    gameTitle: '4-Ziele-Wechsel mit Blickschätzung',
    gameText: 'Die Übung „4-Ziele-Wechsel“ mit zusätzlicher Blickzeit je Durchgang (Phase 2).',
    gameSoon: 'Kommt in Phase 2',
    howTitle: 'So funktioniert es',
    how: [
      'Ein kleines Modell (MediaPipe Face Landmarker) findet im Kamerabild Ihr Gesicht und die Iris beider Augen – alles direkt auf Ihrem Gerät.',
      'Bei einer Kalibrierung schauen Sie nacheinander auf neun Punkte. Daraus lernt die Seite, wie Augenstellung und Kopfhaltung mit Orten auf dem Bildschirm zusammenhängen.',
      'Danach wird für jedes Kamerabild ein Blickpunkt geschätzt und geglättet. Ausgewertet wird nur das Viertel des Bildschirms, nicht der genaue Punkt.',
    ],
    privacyTitle: 'Datenschutz',
    privacy: [
      'Das Kamerabild bleibt im Gerät. Es wird nichts hochgeladen, nichts gespeichert und nichts an Dritte gesendet.',
      'Das Modell und die Rechenprogramme werden von dieser Seite selbst ausgeliefert, nicht von fremden Servern.',
      'Die Kamera wird erst nach Ihrer ausdrücklichen Zustimmung geöffnet und mit „Kamera beenden“ wieder vollständig ausgeschaltet.',
    ],
    limitsTitle: 'Grenzen',
    limits: [
      'Die Schätzung ist grob (typisch einige Grad Abweichung) und hängt von Licht, Abstand, Brille und Kopfhaltung ab.',
      'Die Kamera liefert etwa 30 Bilder pro Sekunde; schnelle Blickwechsel lassen sich nur mit entsprechend grober Zeitauflösung verfolgen.',
      'Pixelgenaue Blickpunkte werden nicht versprochen.',
    ],
    legalTitle: 'Wichtig',
    legal: [
      'Das ist ein Trainings-Experiment und kein Medizinprodukt. Es misst keine Augenbewegungen im medizinischen Sinn und stellt keine Diagnose.',
      'Es gibt keine Normwerte und keinen Vergleich mit anderen Personen. Ergebnisse sind nur zum Vergleich mit sich selbst gedacht.',
      'Keine Aussage zu Sehkraft oder Gesundheit.',
    ],
  },
  lab: {
    h1: 'Testumgebung Blickschätzung',
    lead: 'Hier prüfen Sie die Technik, nicht sich selbst: Wie gut schätzt die Frontkamera Ihres Geräts die Blickrichtung? Die Bereiche sind nummeriert; Sie können sie in beliebiger Reihenfolge benutzen, nachdem die Kamera läuft und kalibriert ist.',
    s1: '1 · Einwilligung & Start',
    s1Purpose: 'Zweck: Wir schätzen mit der Frontkamera grob, wohin Sie auf dem Bildschirm schauen, um die Technik an Ihrem Gerät zu testen.',
    s1Privacy: [
      'Das Kamerabild bleibt im Gerät. Es wird nichts hochgeladen, gespeichert oder gesendet.',
      'Modell und Rechenprogramme kommen von dieser Seite selbst (kein Drittserver).',
      'Mit „Kamera beenden“ wird der Videostrom wirklich gestoppt (Kamera-Anzeige geht aus).',
    ],
    s1Setup: [
      'Tablet auf einen Ständer stellen, mittig vor sich, etwa 40–50 cm entfernt.',
      'Gesicht gut und gleichmäßig beleuchten (Licht von vorn, nicht Fenster im Rücken).',
      'Mit Brille können Spiegelungen stören; Kopf möglichst ruhig halten.',
    ],
    s1Consent: 'Ich bin einverstanden, dass die Kamera zu diesem Zweck geöffnet wird. Das Bild bleibt im Gerät.',
    s1Start: 'Kamera freigeben',
    s1StartSynthetic: 'Testmodus ohne Kamera starten',
    s1Starting: 'Kamera wird geöffnet …',
    s1Camera: 'Kamera wird geöffnet …',
    s1Model: (pct) => `Modell wird geladen … ${pct} %`,
    s1Engine: 'Auswertung wird gestartet …',
    s1Running: 'Läuft. Als Nächstes kalibrieren (Bereich 3).',
    s1Stopped: 'Kamera beendet. Der Videostrom ist gestoppt.',
    errors: {
      insecure: { title: 'Keine sichere Verbindung', help: 'Die Kamera funktioniert nur über https (oder localhost). Bitte die Seite über die https-Adresse öffnen.' },
      'no-camera-api': { title: 'Kein Kamerazugriff möglich', help: 'Dieser Browser bietet keinen Kamerazugriff für Webseiten. Bitte einen aktuellen Browser (Safari, Chrome, Edge, Firefox) verwenden.' },
      denied: { title: 'Kamera nicht erlaubt', help: 'Der Zugriff wurde abgelehnt. Sie können das in den Einstellungen des Browsers für diese Seite ändern und die Seite neu laden.' },
      'no-camera': { title: 'Keine Kamera gefunden', help: 'Es wurde keine passende Kamera gefunden. Falls es mehrere gibt, im Bereich 9 eine andere wählen.' },
      'camera-busy': { title: 'Kamera belegt', help: 'Die Kamera wird gerade von einer anderen App oder einem anderen Tab benutzt. Bitte diese beenden und erneut versuchen.' },
      'camera-failed': { title: 'Kamera konnte nicht gestartet werden', help: 'Bitte die Seite neu laden und erneut versuchen.' },
      'no-wasm': { title: 'Auswertung nicht möglich', help: 'Dieser Browser kann WebAssembly nicht ausführen, das die Auswertung braucht.' },
      'no-simd': { title: 'Browser zu alt für die Auswertung', help: 'Die Auswertung braucht WebAssembly-SIMD (Safari ab 16.4, Chrome ab 91, Firefox ab 89). Bitte Browser oder Betriebssystem aktualisieren.' },
      'model-failed': { title: 'Modell konnte nicht geladen werden', help: 'Die Modelldatei oder das Rechenprogramm konnte nicht geladen oder gestartet werden (Netzwerk, Speicher oder Browser-Einschränkung). Bitte neu laden und erneut versuchen.' },
      unknown: { title: 'Unbekannter Fehler', help: 'Bitte die Seite neu laden und erneut versuchen.' },
    },
    s2: '2 · Live-Ansicht',
    s2Lead: 'Gespiegeltes Kamerabild mit Gesichtsrahmen sowie Augen- und Iris-Punkten. Das Bild wird nur hier angezeigt und nirgends gespeichert.',
    faceFound: 'Gesicht erkannt',
    faceYes: 'ja',
    faceNo: 'nein',
    camFps: 'Bildrate der Kamera',
    evalFps: 'Bildrate der Auswertung',
    procTime: 'Verarbeitungszeit je Bild (Mittel / Max)',
    headYaw: 'Kopfdrehung',
    headPitch: 'Kopfneigung',
    distance: 'Abstand (grob)',
    distanceNote: 'grob aus der Irisgröße, ohne Zusicherung',
    resolution: 'Kameraauflösung',
    engine: 'Auswertung über',
    engineGpu: 'GPU',
    engineCpu: 'CPU',
    engineSynthetic: 'Testmodus (synthetisch)',
    brightnessOk: 'Helligkeit des Gesichts: in Ordnung',
    brightnessDark: 'Das Bild ist zu dunkel. Bitte mehr Licht von vorn.',
    brightnessBright: 'Das Bild ist überstrahlt. Bitte Licht dämpfen oder das Fenster nicht im Rücken haben.',
    reflectionTip: 'Tipp: Es sind helle Stellen an den Augen zu sehen. Mit Brille können Spiegelungen die Schätzung stören; den Kopf etwas neigen oder das Licht seitlich verändern kann helfen.',
    noFaceTip: 'Kein Gesicht erkannt. Bitte mittig vor die Kamera setzen, ins Licht und etwas näher oder weiter weg.',
    headTurnTip: 'Der Kopf ist stark gedreht. Bitte möglichst geradeaus zum Bildschirm schauen.',
    synthNote: 'Testmodus: Es läuft keine Kamera. Die Merkmale werden künstlich erzeugt.',
    s3: '3 · Kalibrierung',
    s3Lead: 'Neun Punkte nacheinander ansehen (je etwa 1,2 Sekunden, insgesamt gut 10 Sekunden), Kopf ruhig. Die Kalibrierung bleibt nur im Speicher dieser Seite.',
    s3Start: 'Kalibrierung starten',
    s3Hint: 'Schauen Sie auf jeden Punkt, bis er weiterwandert.',
    s3Running: (i, n) => `Punkt ${i} von ${n}`,
    s3Cancel: 'Abbrechen',
    s3Done: 'Kalibrierung abgeschlossen.',
    s3Result: (loo, model, used, total) => `Schätzfehler der Kalibrierung (Leave-one-out, ausgelassene Punkte): im Mittel ${loo}. Modell: ${model}. Verwendete Punkte: ${used} von ${total}.`,
    s3Remember: 'Kalibrierung für diese Sitzung merken (nur in diesem Browser-Tab)',
    s3Forget: 'Kalibrierung verwerfen',
    s3Restored: 'Kalibrierung aus dieser Sitzung wiederhergestellt.',
    s3NeedStart: 'Bitte zuerst die Kamera freigeben (Bereich 1).',
    calFail: {
      aborted: 'Kalibrierung abgebrochen.',
      'not-running': 'Die Kamera läuft nicht.',
      'too-few-points': 'Zu wenige Punkte konnten gemessen werden (Gesicht nicht durchgehend erkannt). Bitte Licht und Position prüfen und neu kalibrieren.',
      'no-movement': 'Es wurde keine Augenbewegung erkannt. Bitte jeden Punkt mit den Augen ansehen (Kopf ruhig) und neu kalibrieren.',
      numeric: 'Die Kalibrierung war rechnerisch nicht brauchbar. Bitte neu kalibrieren.',
    },
    s4: '4 · Genauigkeitsprüfung',
    s4Lead: 'Neun Kontrollpunkte, versetzt zu den Kalibrierpunkten. Gemessen wird, wie weit die Schätzung vom Punkt abweicht – in Pixeln und in Grad. Die Grad-Werte beruhen auf Annahmen (Bildschirmgröße, Abstand).',
    s4Distance: (cm) => `Abstand zum Bildschirm: ${cm} cm`,
    s4Inch: 'Bildschirmdiagonale (Zoll, optional)',
    s4InchHint: 'leer = Annahme',
    s4Assumption: (inch, source, cm) => `Annahme: Bildschirm ${inch} Zoll (${source}), Abstand ${cm} cm. Das Fenster zählt als Vollbild.`,
    srcGuessTablet: 'Tablet geschätzt',
    srcGuessPhone: 'Handy geschätzt',
    srcInput: 'Ihre Eingabe',
    s4Start: 'Genauigkeitsprüfung starten',
    s4Running: (i, n) => `Kontrollpunkt ${i} von ${n}`,
    s4Mean: 'Mittlere Abweichung',
    s4Median: 'Mediane Abweichung',
    s4P95: '95. Perzentil',
    s4Verdict: {
      good: 'gut genug für die Viertel-Auswertung',
      ok: 'ausreichend, mit Vorsicht',
      poor: 'zu ungenau – bitte neu kalibrieren',
    },
    s4VerdictNote: 'Faustwert, kein Normwert: gut, wenn die mittlere Abweichung höchstens halb so groß ist wie der Abstand von der Mitte eines Viertels zur Viertelgrenze (kurze Fensterseite ÷ 4) und das 95. Perzentil höchstens so groß.',
    s4Heat: 'Abweichung je Bildschirmbereich',
    s4HeatNote: 'Mittlere Abweichung in Pixeln; hellere Felder = genauer, dunklere = ungenauer.',
    s4BiasSpread: (bias, spread) => `Mittlerer Versatz der Punkte: ${bias}; Streuung innerhalb der Punkte: ${spread}.`,
    s4NeedCal: 'Erst kalibrieren (Bereich 3).',
    s4Jitter: 'Ruhe-Streuung (Jitter)',
    s4JitterHint: 'Fünf Sekunden auf einen Punkt in der Mitte schauen. Gemessen wird, wie stark der geschätzte Blickpunkt dabei wackelt.',
    s4JitterStart: 'Ruhetest starten (5 s)',
    s4JitterResult: (sd, deg, sx, sy, n) => `Streuung (Standardabweichung): ${sd} (${deg}); in x ${sx}, in y ${sy}; ${n} Bilder.`,
    colMetric: 'Kennwert',
    colPx: 'Pixel',
    colDeg: 'Grad',
    s5: '5 · Viertel-Test',
    s5Lead: 'Eine Ecke leuchtet weich auf: Schauen Sie dorthin. Die Seite zeigt live, in welchem Viertel sie Ihren Blick erkennt, und zählt die Treffer je Ecke (20 Aufforderungen). Ein Treffer ist: Blick mindestens 150 ms im Viertel.',
    s5Disclaimer: 'Das prüft die Technik, nicht dich.',
    s5Start: 'Viertel-Test starten',
    s5Prompt: (i, n) => `Aufforderung ${i} von ${n}`,
    s5Detected: (q) => `erkannt: ${q}`,
    s5DetectedNone: 'erkannt: –',
    s5NoFace: 'Kein Gesicht erkannt – der Test wartet.',
    s5Total: (hits, n) => `Treffer insgesamt: ${hits} von ${n}`,
    s5ColCorner: 'Ecke',
    s5ColHits: 'Treffer',
    s5ColArrival: 'Ankunft (Mittel)',
    s5Confusion: 'Wohin der Blick stattdessen ging',
    s5ConfusionNote: 'Zeile = Aufforderung, Spalte = Viertel, in dem der Blick am häufigsten lag.',
    s6: '6 · Blickpunkt-Ansicht',
    s6Lead: 'Ein Punkt zeigt auf dunklem Grund die geschätzte Blickposition, dazu eine Spur der letzten 2 Sekunden. Mit dem Regler sehen Sie, wie Ruhe und Verzögerung zusammenhängen.',
    s6Open: 'Blickpunkt-Ansicht öffnen',
    s6Smooth: 'Glättung',
    s6SmoothHint: 'Mehr Glättung = ruhiger, aber der Punkt hinkt hinterher.',
    s6Less: 'weniger',
    s6More: 'mehr',
    s6Close: 'Schließen',
    s7: '7 · Zeitverhalten',
    s7Lead: 'Schauen Sie zwischen zwei Ecken hin und her, sobald die Markierung wechselt. Gemessen wird, wie schnell die geschätzte Blickposition von einer Ecke zur anderen läuft (von 10 % bis 90 % der Strecke). Das ist eine Eigenschaft der Technik (Kamera mit etwa 30 Bildern pro Sekunde plus Glättung), keine Messung Ihrer Augenbewegung.',
    s7Pair: 'Ecken',
    s7PairH: 'oben links ↔ oben rechts',
    s7PairD: 'oben links ↔ unten rechts',
    s7PairV: 'oben links ↔ unten links',
    s7Start: 'Zeittest starten',
    s7Switch: (i, n) => `Wechsel ${i} von ${n}`,
    s7Result: 'Ergebnis',
    s7Transition: 'Übergangszeit der Schätzung (10 % → 90 %)',
    s7Arrival: 'Zeit von der Markierung bis „im Viertel angekommen“ (enthält Ihre Reaktionszeit)',
    s7Frame: (ms) => `Zeitabstand der Bilder in der Auswertung: ${ms} ms`,
    s7Note: 'Die Übergangszeit kann nicht kürzer sein als etwa zwei Bildabstände plus die Glättungsverzögerung.',
    s7Valid: (v, n) => `${v} von ${n} Wechseln auswertbar`,
    s8: '8 · Export',
    s8Lead: 'Kopiert die Messwerte als JSON in die Zwischenablage (Gerät, Fenstergröße, Kamera, Kalibrierung, Genauigkeit, Zeiten). Es wird nichts gesendet; so können Sie Ergebnisse verschiedener Tablets vergleichen.',
    s8Copy: 'Messwerte kopieren',
    s8Copied: 'Kopiert.',
    s8CopyFailed: 'Kopieren nicht möglich – bitte den Text unten markieren und selbst kopieren.',
    s8Show: 'Messwerte anzeigen',
    s9: '9 · Kamera',
    s9Cameras: 'Kamera',
    s9Switch: 'Kamera wechseln',
    s9OneCamera: 'Nur eine Kamera gefunden.',
    s9Engine: 'Auswertung über',
    s9EngineAuto: 'automatisch (GPU, sonst CPU)',
    s9EngineCpu: 'nur CPU',
    s9EngineGpu: 'nur GPU',
    s9EngineHint: 'Gilt beim nächsten Start der Kamera. Der Export enthält, was benutzt wurde.',
    s9Stop: 'Kamera beenden',
    s9Stopped: 'Kamera beendet.',
    quadrant: { tl: 'oben links', tr: 'oben rechts', bl: 'unten links', br: 'unten rechts' },
    cancel: 'Abbrechen',
    needStart: 'Erst die Kamera freigeben (Bereich 1).',
    stale: 'Das Fenster hat sich gedreht oder deutlich verändert. Bitte neu kalibrieren.',
    faceLost: 'Kein Gesicht erkannt.',
    yes: 'ja',
    no: 'nein',
    ms: 'ms',
    medianWord: 'Median',
    legalFoot: [
      'Experiment, kein Medizinprodukt. Keine Messung der Augenbewegung im medizinischen Sinn, keine Diagnose, keine Normwerte, kein Vergleich mit anderen, keine Aussage zu Sehkraft oder Gesundheit.',
      'Grobe Schätzung: Die Genauigkeit hängt von Licht, Abstand, Brille und Kopfhaltung ab. Das Kamerabild bleibt im Gerät.',
    ],
  },
};

const it: EyeTexts = {
  pageTitleHome: 'Blickfit – Esperimento stima dello sguardo',
  pageTitleLab: 'Blickfit – Ambiente di prova stima dello sguardo',
  backApp: 'Torna a Blickfit',
  backHome: 'Torna all’esperimento',
  backNoCamera: 'Torna agli esercizi senza fotocamera',
  experiment: 'Esperimento',
  home: {
    h1: 'Esperimento: stima dello sguardo con la fotocamera frontale',
    lead: 'Un’area sperimentale: la fotocamera frontale del tablet stima in modo approssimativo in quale quarto dello schermo state guardando. In futuro ne nascerà una variante del “Cambio a 4 bersagli”. Prima verifichiamo, con un ambiente di prova, quanto bene funziona sul vostro dispositivo.',
    labTitle: 'Ambiente di prova',
    labText: 'Fotocamera, calibrazione, verifica della precisione, test dei quarti, vista del punto di sguardo, comportamento nel tempo ed esportazione dei valori – senza gioco. Qui vedete se e con quale precisione il vostro dispositivo riesce a stimare lo sguardo.',
    labOpen: 'Apri l’ambiente di prova',
    gameTitle: 'Cambio a 4 bersagli con stima dello sguardo',
    gameText: 'L’esercizio “Cambio a 4 bersagli” con il tempo di sguardo per ogni prova (fase 2).',
    gameSoon: 'In arrivo nella fase 2',
    howTitle: 'Come funziona',
    how: [
      'Un piccolo modello (MediaPipe Face Landmarker) trova nell’immagine della fotocamera il vostro volto e l’iride di entrambi gli occhi – tutto direttamente sul vostro dispositivo.',
      'Con una calibrazione guardate uno dopo l’altro nove punti. Così la pagina impara come posizione degli occhi e della testa si collegano ai punti dello schermo.',
      'Poi per ogni immagine della fotocamera viene stimato e livellato un punto di sguardo. Si valuta solo il quarto dello schermo, non il punto esatto.',
    ],
    privacyTitle: 'Protezione dei dati',
    privacy: [
      'L’immagine della fotocamera resta nel dispositivo. Non viene caricato, salvato o inviato a terzi nulla.',
      'Il modello e i programmi di calcolo sono forniti da questa stessa pagina, non da server esterni.',
      'La fotocamera viene aperta solo dopo il vostro consenso esplicito e con “Termina fotocamera” viene spenta completamente.',
    ],
    limitsTitle: 'Limiti',
    limits: [
      'La stima è approssimativa (di norma uno scarto di alcuni gradi) e dipende da luce, distanza, occhiali e posizione della testa.',
      'La fotocamera fornisce circa 30 immagini al secondo; i cambi rapidi di sguardo si seguono solo con una risoluzione temporale altrettanto approssimativa.',
      'Non si promette una precisione al pixel.',
    ],
    legalTitle: 'Importante',
    legal: [
      'È un esperimento di allenamento e non un dispositivo medico. Non misura i movimenti oculari in senso medico e non formula diagnosi.',
      'Non esistono valori di riferimento né confronti con altre persone. I risultati servono solo al confronto con sé stessi.',
      'Nessuna affermazione sulla vista o sulla salute.',
    ],
  },
  lab: {
    h1: 'Ambiente di prova stima dello sguardo',
    lead: 'Qui si verifica la tecnica, non voi stessi: quanto bene stima la fotocamera frontale del vostro dispositivo la direzione dello sguardo? Le aree sono numerate; potete usarle in qualsiasi ordine, una volta che la fotocamera è attiva e calibrata.',
    s1: '1 · Consenso e avvio',
    s1Purpose: 'Scopo: con la fotocamera frontale stimiamo in modo approssimativo dove guardate sullo schermo, per provare la tecnica sul vostro dispositivo.',
    s1Privacy: [
      'L’immagine della fotocamera resta nel dispositivo. Non viene caricato, salvato o inviato nulla.',
      'Modello e programmi di calcolo provengono da questa stessa pagina (nessun server esterno).',
      'Con “Termina fotocamera” il flusso video viene davvero fermato (si spegne l’indicatore della fotocamera).',
    ],
    s1Setup: [
      'Mettete il tablet su un supporto, al centro davanti a voi, a circa 40–50 cm di distanza.',
      'Illuminate bene e in modo uniforme il volto (luce frontale, non la finestra alle spalle).',
      'Con gli occhiali i riflessi possono disturbare; tenete la testa il più ferma possibile.',
    ],
    s1Consent: 'Acconsento all’apertura della fotocamera per questo scopo. L’immagine resta nel dispositivo.',
    s1Start: 'Attiva la fotocamera',
    s1StartSynthetic: 'Avvia la modalità di prova senza fotocamera',
    s1Starting: 'Apertura della fotocamera …',
    s1Camera: 'Apertura della fotocamera …',
    s1Model: (pct) => `Caricamento del modello … ${pct} %`,
    s1Engine: 'Avvio dell’elaborazione …',
    s1Running: 'In funzione. Ora calibrate (area 3).',
    s1Stopped: 'Fotocamera terminata. Il flusso video è fermo.',
    errors: {
      insecure: { title: 'Connessione non sicura', help: 'La fotocamera funziona solo tramite https (o localhost). Aprite la pagina con l’indirizzo https.' },
      'no-camera-api': { title: 'Accesso alla fotocamera non possibile', help: 'Questo browser non offre alle pagine web l’accesso alla fotocamera. Usate un browser aggiornato (Safari, Chrome, Edge, Firefox).' },
      denied: { title: 'Fotocamera non consentita', help: 'L’accesso è stato rifiutato. Potete cambiarlo nelle impostazioni del browser per questa pagina e ricaricare la pagina.' },
      'no-camera': { title: 'Nessuna fotocamera trovata', help: 'Non è stata trovata una fotocamera adatta. Se ce ne sono più di una, scegliete un’altra nell’area 9.' },
      'camera-busy': { title: 'Fotocamera occupata', help: 'La fotocamera è usata da un’altra app o da un’altra scheda. Chiudetela e riprovate.' },
      'camera-failed': { title: 'Impossibile avviare la fotocamera', help: 'Ricaricate la pagina e riprovate.' },
      'no-wasm': { title: 'Elaborazione non possibile', help: 'Questo browser non può eseguire WebAssembly, necessario per l’elaborazione.' },
      'no-simd': { title: 'Browser troppo vecchio per l’elaborazione', help: 'L’elaborazione richiede WebAssembly-SIMD (Safari dalla 16.4, Chrome dalla 91, Firefox dalla 89). Aggiornate browser o sistema operativo.' },
      'model-failed': { title: 'Impossibile caricare il modello', help: 'Il file del modello o il programma di calcolo non si è potuto caricare o avviare (rete, memoria o limitazione del browser). Ricaricate la pagina e riprovate.' },
      unknown: { title: 'Errore sconosciuto', help: 'Ricaricate la pagina e riprovate.' },
    },
    s2: '2 · Vista dal vivo',
    s2Lead: 'Immagine speculare della fotocamera con riquadro del volto e punti di occhi e iride. L’immagine viene mostrata solo qui e non viene salvata da nessuna parte.',
    faceFound: 'Volto riconosciuto',
    faceYes: 'sì',
    faceNo: 'no',
    camFps: 'Frequenza della fotocamera',
    evalFps: 'Frequenza dell’elaborazione',
    procTime: 'Tempo di elaborazione per immagine (media / max)',
    headYaw: 'Rotazione della testa',
    headPitch: 'Inclinazione della testa',
    distance: 'Distanza (approssimativa)',
    distanceNote: 'stimata dalla dimensione dell’iride, senza garanzia',
    resolution: 'Risoluzione della fotocamera',
    engine: 'Elaborazione tramite',
    engineGpu: 'GPU',
    engineCpu: 'CPU',
    engineSynthetic: 'Modalità di prova (sintetica)',
    brightnessOk: 'Luminosità del volto: a posto',
    brightnessDark: 'L’immagine è troppo scura. Più luce frontale, per favore.',
    brightnessBright: 'L’immagine è sovraesposta. Attenuate la luce o non tenete la finestra alle spalle.',
    reflectionTip: 'Suggerimento: si vedono punti luminosi sugli occhi. Con gli occhiali i riflessi possono disturbare la stima; inclinare un po’ la testa o cambiare la luce lateralmente può aiutare.',
    noFaceTip: 'Nessun volto riconosciuto. Mettetevi al centro davanti alla fotocamera, alla luce, un po’ più vicini o più lontani.',
    headTurnTip: 'La testa è molto ruotata. Guardate possibilmente dritto verso lo schermo.',
    synthNote: 'Modalità di prova: nessuna fotocamera in funzione. Le caratteristiche sono generate artificialmente.',
    s3: '3 · Calibrazione',
    s3Lead: 'Guardate nove punti uno dopo l’altro (circa 1,2 secondi ciascuno, in tutto poco più di 10 secondi), testa ferma. La calibrazione resta solo nella memoria di questa pagina.',
    s3Start: 'Avvia la calibrazione',
    s3Hint: 'Guardate ogni punto finché non si sposta.',
    s3Running: (i, n) => `Punto ${i} di ${n}`,
    s3Cancel: 'Annulla',
    s3Done: 'Calibrazione conclusa.',
    s3Result: (loo, model, used, total) => `Errore di stima della calibrazione (leave-one-out, punti esclusi): in media ${loo}. Modello: ${model}. Punti usati: ${used} su ${total}.`,
    s3Remember: 'Ricorda la calibrazione per questa sessione (solo in questa scheda del browser)',
    s3Forget: 'Scarta la calibrazione',
    s3Restored: 'Calibrazione di questa sessione ripristinata.',
    s3NeedStart: 'Prima attivate la fotocamera (area 1).',
    calFail: {
      aborted: 'Calibrazione annullata.',
      'not-running': 'La fotocamera non è in funzione.',
      'too-few-points': 'Si sono potuti misurare troppo pochi punti (volto non riconosciuto in modo continuo). Controllate luce e posizione e calibrate di nuovo.',
      'no-movement': 'Non è stato rilevato alcun movimento degli occhi. Guardate ogni punto con gli occhi (testa ferma) e calibrate di nuovo.',
      numeric: 'La calibrazione non era utilizzabile dal punto di vista del calcolo. Calibrate di nuovo.',
    },
    s4: '4 · Verifica della precisione',
    s4Lead: 'Nove punti di controllo, spostati rispetto ai punti di calibrazione. Si misura di quanto la stima si discosta dal punto – in pixel e in gradi. I valori in gradi si basano su ipotesi (dimensione dello schermo, distanza).',
    s4Distance: (cm) => `Distanza dallo schermo: ${cm} cm`,
    s4Inch: 'Diagonale dello schermo (pollici, facoltativo)',
    s4InchHint: 'vuoto = ipotesi',
    s4Assumption: (inch, source, cm) => `Ipotesi: schermo da ${inch} pollici (${source}), distanza ${cm} cm. La finestra vale come schermo intero.`,
    srcGuessTablet: 'tablet, stimato',
    srcGuessPhone: 'telefono, stimato',
    srcInput: 'vostro inserimento',
    s4Start: 'Avvia la verifica della precisione',
    s4Running: (i, n) => `Punto di controllo ${i} di ${n}`,
    s4Mean: 'Scarto medio',
    s4Median: 'Scarto mediano',
    s4P95: '95º percentile',
    s4Verdict: {
      good: 'abbastanza buono per la valutazione dei quarti',
      ok: 'sufficiente, con cautela',
      poor: 'troppo impreciso – calibrate di nuovo',
    },
    s4VerdictNote: 'Valore indicativo, non un valore di riferimento: buono se lo scarto medio è al massimo la metà della distanza dal centro di un quarto al limite del quarto (lato corto della finestra ÷ 4) e il 95º percentile al massimo pari a tale distanza.',
    s4Heat: 'Scarto per zona dello schermo',
    s4HeatNote: 'Scarto medio in pixel; campi più chiari = più precisi, più scuri = meno precisi.',
    s4BiasSpread: (bias, spread) => `Spostamento medio dei punti: ${bias}; dispersione all’interno dei punti: ${spread}.`,
    s4NeedCal: 'Prima calibrate (area 3).',
    s4Jitter: 'Dispersione a riposo (jitter)',
    s4JitterHint: 'Guardate per cinque secondi un punto al centro. Si misura quanto oscilla in questo tempo il punto di sguardo stimato.',
    s4JitterStart: 'Avvia il test a riposo (5 s)',
    s4JitterResult: (sd, deg, sx, sy, n) => `Dispersione (deviazione standard): ${sd} (${deg}); in x ${sx}, in y ${sy}; ${n} immagini.`,
    colMetric: 'Valore',
    colPx: 'Pixel',
    colDeg: 'Gradi',
    s5: '5 · Test dei quarti',
    s5Lead: 'Un angolo si illumina dolcemente: guardate lì. La pagina mostra dal vivo in quale quarto riconosce il vostro sguardo e conta i centri per angolo (20 richiami). Un centro significa: sguardo nel quarto per almeno 150 ms.',
    s5Disclaimer: 'Questo verifica la tecnica, non voi.',
    s5Start: 'Avvia il test dei quarti',
    s5Prompt: (i, n) => `Richiamo ${i} di ${n}`,
    s5Detected: (q) => `riconosciuto: ${q}`,
    s5DetectedNone: 'riconosciuto: –',
    s5NoFace: 'Nessun volto riconosciuto – il test attende.',
    s5Total: (hits, n) => `Centri in totale: ${hits} su ${n}`,
    s5ColCorner: 'Angolo',
    s5ColHits: 'Centri',
    s5ColArrival: 'Arrivo (media)',
    s5Confusion: 'Dove è andato invece lo sguardo',
    s5ConfusionNote: 'Riga = richiamo, colonna = quarto in cui lo sguardo si è trovato più spesso.',
    s6: '6 · Vista del punto di sguardo',
    s6Lead: 'Su sfondo scuro un punto mostra la posizione stimata dello sguardo, con una scia degli ultimi 2 secondi. Con il cursore vedete come si collegano calma e ritardo.',
    s6Open: 'Apri la vista del punto di sguardo',
    s6Smooth: 'Livellamento',
    s6SmoothHint: 'Più livellamento = più calmo, ma il punto resta indietro.',
    s6Less: 'meno',
    s6More: 'più',
    s6Close: 'Chiudi',
    s7: '7 · Comportamento nel tempo',
    s7Lead: 'Guardate avanti e indietro tra due angoli non appena cambia il segno. Si misura con quale rapidità la posizione stimata dello sguardo passa da un angolo all’altro (dal 10 % al 90 % del percorso). È una proprietà della tecnica (fotocamera a circa 30 immagini al secondo più livellamento), non una misura del movimento dei vostri occhi.',
    s7Pair: 'Angoli',
    s7PairH: 'in alto a sinistra ↔ in alto a destra',
    s7PairD: 'in alto a sinistra ↔ in basso a destra',
    s7PairV: 'in alto a sinistra ↔ in basso a sinistra',
    s7Start: 'Avvia il test temporale',
    s7Switch: (i, n) => `Cambio ${i} di ${n}`,
    s7Result: 'Risultato',
    s7Transition: 'Tempo di transizione della stima (10 % → 90 %)',
    s7Arrival: 'Tempo dal segno a “arrivato nel quarto” (include il vostro tempo di reazione)',
    s7Frame: (ms) => `Intervallo tra le immagini nell’elaborazione: ${ms} ms`,
    s7Note: 'Il tempo di transizione non può essere più breve di circa due intervalli tra le immagini più il ritardo del livellamento.',
    s7Valid: (v, n) => `${v} cambi su ${n} valutabili`,
    s8: '8 · Esportazione',
    s8Lead: 'Copia i valori misurati come JSON negli appunti (dispositivo, dimensione della finestra, fotocamera, calibrazione, precisione, tempi). Non viene inviato nulla; così potete confrontare i risultati di tablet diversi.',
    s8Copy: 'Copia i valori misurati',
    s8Copied: 'Copiato.',
    s8CopyFailed: 'Copia non possibile – selezionate il testo qui sotto e copiatelo voi stessi.',
    s8Show: 'Mostra i valori misurati',
    s9: '9 · Fotocamera',
    s9Cameras: 'Fotocamera',
    s9Switch: 'Cambia fotocamera',
    s9OneCamera: 'Trovata una sola fotocamera.',
    s9Engine: 'Elaborazione tramite',
    s9EngineAuto: 'automatica (GPU, altrimenti CPU)',
    s9EngineCpu: 'solo CPU',
    s9EngineGpu: 'solo GPU',
    s9EngineHint: 'Vale al prossimo avvio della fotocamera. L’esportazione contiene ciò che è stato usato.',
    s9Stop: 'Termina fotocamera',
    s9Stopped: 'Fotocamera terminata.',
    quadrant: { tl: 'in alto a sinistra', tr: 'in alto a destra', bl: 'in basso a sinistra', br: 'in basso a destra' },
    cancel: 'Annulla',
    needStart: 'Prima attivate la fotocamera (area 1).',
    stale: 'La finestra è stata ruotata o è cambiata sensibilmente. Calibrate di nuovo.',
    faceLost: 'Nessun volto riconosciuto.',
    yes: 'sì',
    no: 'no',
    ms: 'ms',
    medianWord: 'mediana',
    legalFoot: [
      'Esperimento, non un dispositivo medico. Nessuna misura dei movimenti oculari in senso medico, nessuna diagnosi, nessun valore di riferimento, nessun confronto con altri, nessuna affermazione sulla vista o sulla salute.',
      'Stima approssimativa: la precisione dipende da luce, distanza, occhiali e posizione della testa. L’immagine della fotocamera resta nel dispositivo.',
    ],
  },
};

export const eyeTexts: Record<Lang, EyeTexts> = { de, it };
