/**
 * Gemeinsame Sicherheitshinweise der Gleichgewichts-Übungen (Richtungen, Orientierung, Balance-Touch, Slalom, Invasoren), DE und IT.
 * Jede Übung setzt sie an den Anfang ihrer „Gut zu wissen“-Liste und ergänzt eigene Hinweise.
 *
 * Quellenlage (geprüft, siehe science.ts der Übungen): Warnzeichen mit Abklärungsbedarf – Muchnick (2008), S. 6 und 28 (Lehrbuch);
 * Einordnung zur Sturzvorbeugung – Cochrane-Übersicht Sherrington et al. (2019) und Studien bei älteren Menschen; für gesunde
 * Menschen ist der Nutzen dieser Bildschirm-Übungen nicht belegt. Keine Messwerte einer Plattform, keine Messung des Gleichgewichts.
 */

export interface SafetyTexts {
  /** Sturzgefahr, Absicherung (Variante: im Stand mit Hilfsperson oder eher im Sitzen) */
  fall: string;
  floor: string;
  /** Wann nicht oder nur nach Rücksprache */
  consult: string;
  slow: string;
  warning: string;
  /** Keine Messung der App */
  noMeasure: string;
  /** Einordnung der Forschung */
  research: string;
}

export const SAFETY_STANDING_DE: SafetyTexts = {
  fall: 'Sturzgefahr: Übe nahe an einer Wand oder an einem festen Stuhl, an dem du dich jederzeit abstützen kannst, und lass eine Hilfsperson in Reichweite stehen. Steh nicht auf Kissen, Stühlen oder anderen wackligen Unterlagen, wenn dich niemand sichert.',
  floor: 'Rutschfester Boden, feste Schuhe oder eine rutschfeste Matte; keine Socken auf glattem Boden. Räume Stolperstellen wie Kabel und Teppichkanten weg und sorge für gutes Licht.',
  consult: 'Nicht üben oder nur nach Rücksprache mit deiner Ärztin, deinem Arzt oder deiner Therapeutin bzw. deinem Therapeuten: bei Schwindel, Gleichgewichtsstörungen, Herz- oder Kreislaufbeschwerden, in der Schwangerschaft, nach Operationen, bei Medikamenten, die schwindlig machen können, und wenn du sturzgefährdet bist oder schon einmal gestürzt bist.',
  slow: 'Steigere langsam: Fang im festen Stand mit leichten Einstellungen an, mach kurze Durchgänge mit Pausen und ändere immer nur eine Einstellung. Hör auf, bevor du müde wirst.',
  warning: 'Bei Schwindel, Kopfschmerz, Augenschmerz oder Doppelbildern sofort aufhören und abklären lassen (Lehrbuchwissen: Muchnick, 2008, S. 6 und 28). Dasselbe gilt bei Übelkeit, Herzklopfen, Atemnot oder Schmerzen in den Gelenken: hinsetzen, Pause machen.',
  noMeasure: 'Die App misst weder dein Gleichgewicht noch deine Haltung und zeigt keine Messwerte einer Plattform: Es gibt nur Zählwerte der Übung. Das ist keine Messung und keine Untersuchung und ersetzt kein betreutes Programm.',
  research: 'Zur Einordnung: Gleichgewichts- und Doppelaufgaben-Training wird bei älteren Menschen (Sturzvorbeugung) in betreuten Programmen mit echten Bewegungen untersucht. Für gesunde Menschen ist der Nutzen dieser Bildschirm-Übungen nicht belegt.',
};

export const SAFETY_STANDING_IT: SafetyTexts = {
  fall: 'Rischio di caduta: esercitati vicino a una parete o a una sedia stabile a cui puoi appoggiarti in ogni momento e tieni una persona di aiuto a portata di mano. Non salire su cuscini, sedie o altre superfici instabili se nessuno ti assicura.',
  floor: 'Pavimento antiscivolo, scarpe ben chiuse o un tappetino antiscivolo; niente calze su pavimento liscio. Togli gli ostacoli come cavi e bordi dei tappeti e assicurati di avere una buona luce.',
  consult: 'Non esercitarti, o solo dopo aver sentito il tuo medico o il tuo terapista: in caso di vertigini, disturbi dell’equilibrio, disturbi cardiaci o circolatori, in gravidanza, dopo interventi chirurgici, con farmaci che possono dare vertigini e se hai un rischio di caduta o sei già caduto.',
  slow: 'Aumenta piano piano: inizia in posizione stabile con impostazioni facili, fai giri brevi con pause e cambia sempre una sola impostazione. Smetti prima di stancarti.',
  warning: 'In caso di vertigini, mal di testa, dolore agli occhi o visione doppia smetti subito e fai chiarire la causa (manuale: Muchnick, 2008, pp. 6 e 28). Lo stesso vale per nausea, palpitazioni, respiro corto o dolori alle articolazioni: siediti e fai una pausa.',
  noMeasure: 'L’app non misura né il tuo equilibrio né la tua postura e non mostra valori di misura di una pedana: ci sono solo valori di conteggio dell’esercizio. Non è una misurazione, non è un esame e non sostituisce un programma seguito da specialisti.',
  research: 'Per inquadrare: l’allenamento dell’equilibrio e del doppio compito è studiato negli anziani (prevenzione delle cadute) in programmi seguiti da specialisti con movimenti reali. Per le persone sane l’utilità di questi esercizi sullo schermo non è dimostrata.',
};

/** Slalom und Invasoren: eher im Sitzen, die Sturz-Hinweise gelten, wenn du dabei stehst oder balancierst */
export const SAFETY_SEATED_DE: SafetyTexts = {
  ...SAFETY_STANDING_DE,
  fall: 'Übe am besten im Sitzen. Wenn du dabei stehst oder auf einer Plattform balancierst, besteht Sturzgefahr: Wand oder fester Stuhl in Reichweite, Hilfsperson dabei, nie auf wackligen Unterlagen ohne Sicherung.',
};

export const SAFETY_SEATED_IT: SafetyTexts = {
  ...SAFETY_STANDING_IT,
  fall: 'Esercitati preferibilmente da seduto. Se stai in piedi o in equilibrio su una pedana, c’è rischio di caduta: parete o sedia stabile a portata di mano, persona di aiuto presente, mai su superfici instabili senza protezione.',
};

/** Der Reihe nach, wie sie in „Gut zu wissen“ stehen sollen */
export function safetyList(s: SafetyTexts): string[] {
  return [s.fall, s.floor, s.consult, s.slow, s.warning, s.noMeasure, s.research];
}

/** Gerät kippen: festhalten, Sensor, Erlaubnis, Datenschutz */
export const TILT_NOTE_DE =
  'Gerät kippen: Halte das Gerät mit beiden Händen fest und sitze oder stehe sicher, damit es nicht herunterfällt. Der Neigungssensor wird nur zum Steuern gelesen; nichts wird gespeichert oder gesendet. Der Browser fragt erst nach, wenn du „Kippen einschalten“ tippst. Ohne Erlaubnis oder ohne Sensor steuerst du mit dem Finger oder den Pfeiltasten.';
export const TILT_NOTE_IT =
  'Inclinare il dispositivo: tieni il dispositivo saldamente con due mani e stai seduto o in piedi in modo sicuro, perché non cada. Il sensore di inclinazione viene letto solo per il controllo; non viene salvato né inviato nulla. Il browser chiede il permesso solo quando tocchi «Attiva inclinazione». Senza permesso o senza sensore controlli con il dito o con i tasti freccia.';

/** Bewegte Bilder */
export const MOTION_NOTE_DE =
  'Auf dem Bildschirm bewegt sich ständig etwas. Das kann Schwindel oder Übelkeit auslösen; bei Unwohlsein sofort aufhören und Pause machen. Bist du lichtempfindlich, übe nur kurz.';
export const MOTION_NOTE_IT =
  'Sullo schermo c’è sempre qualcosa in movimento. Questo può provocare vertigini o nausea; se non ti senti bene smetti subito e fai una pausa. Se sei sensibile alla luce, esercitati solo per poco.';
