import type { Lang } from '../i18n/lang';

export interface VrTexts {
  pageTitle: string;
  back: string;
  h1: string;
  lead: string;
  howTitle: string;
  how: string[];
  safetyTitle: string;
  safety: string[];
  deviceTitle: string;
  deviceQuest: string;
  deviceRift: string;
  deviceOther: string;
  checking: string;
  xrYes: string;
  xrNo: string;
  xrNoApi: string;
  xrNeedsHttps: string;
  enterVr: string;
  preview: string;
  previewHint: string;
  stopPreview: string;
  backgroundTitle: string;
  background: string[];
  limitsTitle: string;
  limits: string[];
  // In der Szene
  menuTitle: string;
  menuText: string[];
  start: string;
  stereoOn: string;
  stereoOff: string;
  recenter: string;
  exitVr: string;
  exitPreview: string;
  trialOf: (n: number, total: number) => string;
  hudCue: string;
  hudTrack: string;
  hudPick: (left: number) => string;
  hudResult: (ok: number, of: number) => string;
  summaryTitle: string;
  summaryLine: (perfect: number, trials: number) => string;
  summarySpeed: (ms: string, deg: string) => string;
  summaryBest: (level: number) => string;
  summaryNote: string;
  again: string;
  stereoNote: string;
}

const de: VrTexts = {
  pageTitle: 'Blickfit VR-Labor – Kugel-Detektiv 3D',
  back: 'Zurück zu Blickfit',
  h1: 'VR-Labor: Kugel-Detektiv 3D',
  lead: 'Ein Versuchsbereich für VR-Brillen mit WebXR (z. B. Oculus/Meta Quest). Sie verfolgen markierte Kugeln, die sich in einem echten Raum vor Ihnen bewegen – nah und fern, links und rechts. Die räumliche Tiefe ist Teil der Aufgabe.',
  howTitle: 'So funktioniert es',
  how: [
    'Acht Kugeln schweben in einem Würfel. Vier davon leuchten kurz orange und haben einen Ring.',
    'Dann sehen alle gleich aus und bewegen sich etwa sieben Sekunden lang.',
    'Danach stehen sie still: Zeigen Sie mit dem Controller auf die vier Kugeln, die Sie verfolgt haben, und drücken Sie den Abzug.',
    'Wenn Sie zweimal hintereinander alle vier richtig haben, wird es etwas schneller; nach einem Fehler etwas langsamer. Eine Sitzung hat 10 Durchgänge (ca. 4 Minuten).',
  ],
  safetyTitle: 'Bitte beachten',
  safety: [
    'Die Übung ist ein Training, kein Sehtest und kein Medizinprodukt. Sie stellt keine Diagnose und macht keine Aussage über Ihr Sehen.',
    'Für die Oculus Quest 1 nennt der Hersteller ein Mindestalter von 13 Jahren; für andere Brillen gelten deren Herstellerangaben. Kinder nur in Begleitung Erwachsener.',
    'Setzen oder stellen Sie sich sicher hin, mit freiem Platz. Die Übung braucht keine Bewegung im Raum – der Kopf darf ruhig bleiben.',
    'Bei Schwindel, Übelkeit, Kopfschmerzen, Augenbeschwerden oder Doppelbildern sofort abbrechen und die Brille abnehmen. Pausieren Sie nach einer Sitzung.',
    'Bei Schielen, Amblyopie, Epilepsie, Migräne, Gleichgewichtsstörungen oder Schwangerschaft vorher ärztlichen oder optometrischen Rat einholen.',
    'Es gibt kein Blinken. Die Kugeln bewegen sich weich; Kopf und Blick bleiben frei.',
  ],
  deviceTitle: 'Brille verbinden',
  deviceQuest: 'Meta Quest / Oculus Quest (auch Quest 1): Meta Quest Browser öffnen, diese Seite aufrufen und „In VR starten“ wählen.',
  deviceRift: 'Oculus Rift CV1: Oculus-Software starten und die Seite in einem WebXR-fähigen Browser auf dem PC öffnen (z. B. Firefox oder Chrome/Edge mit Oculus/OpenXR-Runtime).',
  deviceOther: 'Ohne Brille: „Vorschau am Bildschirm“ zeigt dieselbe Übung flach am Monitor (ohne 3D-Effekt), um Ablauf und Bedienung zu prüfen.',
  checking: 'Prüfe VR-Unterstützung …',
  xrYes: 'VR-Brille erkannt – bereit.',
  xrNo: 'Keine VR-Brille erkannt. Öffnen Sie diese Seite im Browser Ihrer Brille oder nutzen Sie die Vorschau.',
  xrNoApi: 'Dieser Browser unterstützt WebXR nicht. Nutzen Sie den Meta Quest Browser oder die Vorschau.',
  xrNeedsHttps: 'WebXR funktioniert nur über eine sichere Verbindung (https).',
  enterVr: 'In VR starten',
  preview: 'Vorschau am Bildschirm',
  previewHint: 'Flache Vorschau: Mausbewegung verschiebt die Ansicht leicht, Klick wählt. Kein Stereo-3D.',
  stopPreview: 'Vorschau beenden',
  backgroundTitle: 'Hintergrund',
  background: [
    'Mehrfach-Objektverfolgung (Multiple Object Tracking, MOT): Menschen können gleichzeitig etwa 4–5 bewegte Objekte verfolgen (Pylyshyn & Storm, 1988). Die Grenze liegt in der Aufmerksamkeit, nicht im Auge.',
    'In räumlichen 3D-Varianten (Faubert, 2013; Legault et al., 2013) steigt die Leistung beim Üben deutlich. Ob daraus ein Nutzen außerhalb der Aufgabe entsteht, ist nicht belegt.',
    'Mit der Option „Nur Stereo-Tiefe“ haben alle Kugeln immer die gleiche scheinbare Größe. Die Entfernung ist dann nur noch am räumlichen Sehen (Stereo), an Verdeckungen und an der Bewegung ablesbar.',
  ],
  limitsTitle: 'Grenzen dieses Versuchs',
  limits: [
    'Erster Prototyp: Tempostufen, Würfelgröße und Abstand sind Schätzwerte und noch nicht an Nutzerinnen und Nutzern kalibriert.',
    'Die Ergebnisse sind keine Messung und nicht mit anderen Personen vergleichbar; sie liegen nur in diesem Browser.',
    'Ob die räumliche Darstellung für Personen mit eingeschränktem beidäugigem Sehen sinnvoll ist, muss die Fachperson einschätzen.',
  ],
  menuTitle: 'Kugel-Detektiv 3D',
  menuText: ['Verfolge die vier markierten Kugeln.', 'Zeige sie am Ende mit dem Controller und drücke den Abzug.', 'Bei Unwohlsein sofort abbrechen.'],
  start: 'Start',
  stereoOn: 'Nur Stereo-Tiefe: an',
  stereoOff: 'Nur Stereo-Tiefe: aus',
  recenter: 'Neu ausrichten',
  exitVr: 'VR beenden',
  exitPreview: 'Vorschau beenden',
  trialOf: (n, t) => `Durchgang ${n} von ${t}`,
  hudCue: 'Orange Kugeln merken',
  hudTrack: 'Markierte Kugeln verfolgen',
  hudPick: (l) => `Markierte zeigen – noch ${l}`,
  hudResult: (ok, of) => `${ok} von ${of} richtig`,
  summaryTitle: 'Sitzung beendet',
  summaryLine: (p, t) => `${p} von ${t} Durchgängen ganz richtig`,
  summarySpeed: (ms, deg) => `Tempo um die Schwelle: etwa ${ms} m/s (≈ ${deg} °/s)`,
  summaryBest: (l) => `Höchste Stufe bisher: ${l}`,
  summaryNote: 'Training, kein Test. Gerne eine Pause machen.',
  again: 'Noch einmal',
  stereoNote: 'Nur Stereo-Tiefe: Größe immer gleich',
};

const it: VrTexts = {
  pageTitle: 'Blickfit Laboratorio VR – Sfera-Detective 3D',
  back: 'Torna a Blickfit',
  h1: 'Laboratorio VR: Sfera-Detective 3D',
  lead: 'Un’area di prova per visori VR con WebXR (p. es. Oculus/Meta Quest). Seguite sfere contrassegnate che si muovono in un vero spazio davanti a voi – vicino e lontano, a sinistra e a destra. La profondità spaziale fa parte dell’esercizio.',
  howTitle: 'Come funziona',
  how: [
    'Otto sfere fluttuano in un cubo. Quattro si illuminano brevemente di arancione e hanno un anello.',
    'Poi sono tutte uguali e si muovono per circa sette secondi.',
    'Quando si fermano, puntate con il controller le quattro sfere che avete seguito e premete il grilletto.',
    'Se per due volte di seguito le quattro sono tutte giuste, diventa un po’ più veloce; dopo un errore un po’ più lento. Una sessione ha 10 prove (circa 4 minuti).',
  ],
  safetyTitle: 'Da sapere',
  safety: [
    'L’esercizio è un allenamento, non un test della vista né un dispositivo medico. Non fa diagnosi e non dice nulla sulla vostra vista.',
    'Per Oculus Quest 1 il produttore indica un’età minima di 13 anni; per altri visori valgono le loro indicazioni. Bambini solo con la presenza di adulti.',
    'Sedetevi o state in piedi in sicurezza, con spazio libero. L’esercizio non richiede movimenti nella stanza – la testa può restare ferma.',
    'In caso di vertigini, nausea, mal di testa, disturbi agli occhi o immagini doppie interrompete subito e togliete il visore. Dopo una sessione fate una pausa.',
    'In caso di strabismo, ambliopia, epilessia, emicrania, disturbi dell’equilibrio o gravidanza chiedete prima un parere medico o optometrico.',
    'Non ci sono lampeggi. Le sfere si muovono dolcemente; testa e sguardo restano liberi.',
  ],
  deviceTitle: 'Collegare il visore',
  deviceQuest: 'Meta Quest / Oculus Quest (anche Quest 1): aprite il Meta Quest Browser, questa pagina e scegliete «Avvia in VR».',
  deviceRift: 'Oculus Rift CV1: avviate il software Oculus e aprite la pagina in un browser compatibile con WebXR sul PC (p. es. Firefox o Chrome/Edge con runtime Oculus/OpenXR).',
  deviceOther: 'Senza visore: «Anteprima sullo schermo» mostra lo stesso esercizio in piano (senza effetto 3D) per provare svolgimento e comandi.',
  checking: 'Verifico il supporto VR …',
  xrYes: 'Visore VR rilevato – pronto.',
  xrNo: 'Nessun visore VR rilevato. Aprite la pagina nel browser del visore oppure usate l’anteprima.',
  xrNoApi: 'Questo browser non supporta WebXR. Usate il Meta Quest Browser o l’anteprima.',
  xrNeedsHttps: 'WebXR funziona solo con una connessione sicura (https).',
  enterVr: 'Avvia in VR',
  preview: 'Anteprima sullo schermo',
  previewHint: 'Anteprima piana: il movimento del mouse sposta leggermente la vista, il clic seleziona. Nessun 3D stereo.',
  stopPreview: 'Chiudi anteprima',
  backgroundTitle: 'Sfondo',
  background: [
    'Tracciamento di più oggetti (Multiple Object Tracking, MOT): le persone riescono a seguire insieme circa 4–5 oggetti in movimento (Pylyshyn & Storm, 1988). Il limite è nell’attenzione, non nell’occhio.',
    'Nelle varianti spaziali 3D (Faubert, 2013; Legault et al., 2013) la prestazione migliora chiaramente con l’esercizio. Un beneficio al di fuori del compito non è dimostrato.',
    'Con l’opzione «Solo profondità stereo» tutte le sfere hanno sempre la stessa dimensione apparente. La distanza si riconosce solo dalla visione stereo, dalle occlusioni e dal movimento.',
  ],
  limitsTitle: 'Limiti di questa prova',
  limits: [
    'Primo prototipo: livelli di velocità, dimensione del cubo e distanza sono stime e non ancora calibrati su utenti.',
    'I risultati non sono una misurazione e non sono confrontabili con altre persone; restano solo in questo browser.',
    'Se la rappresentazione spaziale sia adatta a persone con visione binoculare limitata deve valutarlo lo specialista.',
  ],
  menuTitle: 'Sfera-Detective 3D',
  menuText: ['Segui le quattro sfere contrassegnate.', 'Alla fine puntale con il controller e premi il grilletto.', 'In caso di malessere interrompi subito.'],
  start: 'Avvia',
  stereoOn: 'Solo profondità stereo: sì',
  stereoOff: 'Solo profondità stereo: no',
  recenter: 'Riallinea',
  exitVr: 'Esci dalla VR',
  exitPreview: 'Chiudi anteprima',
  trialOf: (n, t) => `Prova ${n} di ${t}`,
  hudCue: 'Ricorda le sfere arancioni',
  hudTrack: 'Segui le sfere segnate',
  hudPick: (l) => `Indica le segnate – ancora ${l}`,
  hudResult: (ok, of) => `${ok} su ${of} giuste`,
  summaryTitle: 'Sessione conclusa',
  summaryLine: (p, t) => `${p} prove su ${t} completamente giuste`,
  summarySpeed: (ms, deg) => `Velocità intorno alla soglia: circa ${ms} m/s (≈ ${deg} °/s)`,
  summaryBest: (l) => `Livello più alto finora: ${l}`,
  summaryNote: 'Allenamento, non un test. Fate pure una pausa.',
  again: 'Ancora una volta',
  stereoNote: 'Solo profondità stereo: dimensione sempre uguale',
};

export const vrTexts: Record<Lang, VrTexts> = { de, it };
