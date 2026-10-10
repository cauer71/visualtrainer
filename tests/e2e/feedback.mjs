// Ende-zu-Ende-Test der Rückmeldungen gegen einen laufenden Worker (npx wrangler dev --local --port 8791)
import { chromium } from 'playwright';
import fs from 'node:fs';
const base = process.env.BASE ?? 'http://localhost:8791/';
const browser = await chromium.launch();
const ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1180, height: 820 } });
const p = await ctx.newPage();
const errors = [];
p.on('pageerror', (e) => errors.push(String(e)));
const ok = (c, m) => { if (!c) { console.error('FAIL', m); process.exitCode = 1; } else console.log('ok  ', m); };

// Kunde sieht keinen Bewerten-Knopf
await p.goto(base + '#/uebung/blitzreaktion', { waitUntil: 'networkidle' });
await p.evaluate(() => localStorage.setItem('blickfit:v1', JSON.stringify({ v: 1, exercises: {}, days: [], settings: { sound: false, lang: 'de', role: 'kunde', customerIds: ['blitzreaktion', 'zielfang', 'suchbild'], fullscreen: false } })));
await p.reload({ waitUntil: 'networkidle' });
ok((await p.locator('text=Bewerten').count()) === 0, 'Kunde: kein Bewerten-Knopf');

// Trainer bewertet
await p.evaluate(() => localStorage.setItem('blickfit:v1', JSON.stringify({ v: 1, exercises: {}, days: [], settings: { sound: false, lang: 'de', role: 'optiker', customerIds: ['blitzreaktion', 'zielfang', 'suchbild'], fullscreen: false } })));
await p.reload({ waitUntil: 'networkidle' });
await p.click('button:has-text("Bewerten")');
const send = p.locator('.fb-actions .btn-primary');
ok(await send.isDisabled(), 'Senden gesperrt ohne Eingabe');
await p.click('button[aria-label="4 von 5 Sternen"]');
await p.fill('#fb-trainer', 'CA');
await p.fill('#fb-comment', 'Zu schnell am Anfang.\nZweite Zeile.');
await send.click();
await p.waitForSelector('.fb-thanks');
ok(true, 'Bewertung gesendet');
await p.click('.role-card >> text=Schließen');

// allgemeine Rückmeldung auf der Trainer-Seite (nur Kommentar)
await p.goto(base + '#/optiker', { waitUntil: 'networkidle' });
await p.click('button:has-text("Bewerten")');
await p.fill('#fb-comment', 'Die Startseite ist übersichtlich.');
await p.locator('.fb-actions .btn-primary').click();
await p.waitForSelector('.fb-thanks');
await p.click('.role-card >> text=Schließen');

// Entwickler-Bereich
await p.goto(base + '#/entwickler', { waitUntil: 'networkidle' });
await p.fill('#dev-pw', '000');
await p.click('button:has-text("Anmelden")');
await p.waitForSelector('.fb-error');
ok((await p.textContent('.fb-error')).includes('Falsches Passwort'), 'falsches Passwort abgewiesen');
await p.fill('#dev-pw', '726');
await p.click('button:has-text("Anmelden")');
await p.waitForSelector('.dev-table');
const tableText = await p.textContent('.dev-table');
ok(tableText.includes('Blitzreaktion') && tableText.includes('Allgemein'), 'Tabelle zeigt Übung und Allgemein');
ok(/4,0/.test(tableText), 'Ø 4,0 in der Tabelle');
await p.screenshot({ path: process.env.SHOT ?? '/tmp/dev.png' });

// Export + Archiv (nichts wird gelöscht)
const [dl] = await Promise.all([p.waitForEvent('download'), p.click('button:has-text("Neue Kommentare exportieren")')]);
const file = '/tmp/export-test.txt';
await dl.saveAs(file);
const txt = fs.readFileSync(file, 'utf8');
console.log('--- Exportdatei ---\n' + txt + '--- Ende ---');
ok(txt.includes('Trainer CA'), 'Export nennt das Kürzel');
ok(/Kennung: blitzreaktion/.test(txt) && /Übung 101/.test(txt) && txt.includes('Zu schnell am Anfang.\n  Zweite Zeile.'), 'Export enthält Nummer, Kennung, Kritik');
ok(/\[#\d+\] Übung 101/.test(txt) && txt.includes('$ADMIN_PASSWORD') && txt.includes('https://visual.auer.page/api/admin/reply') && !txt.includes('726'), 'Export: Kommentarnummern, Antwort-Anleitung, kein Passwort');
await p.waitForSelector('.dev-exported');
await p.click('button:has-text("Nein, noch nicht")');
ok((await p.locator('.dev-exported').count()) === 0, 'Nein, noch nicht schließt die Frage');
await Promise.all([p.waitForEvent('download'), p.click('button:has-text("Neue Kommentare exportieren")')]);
await p.click('button:has-text("Als exportiert markieren")');
await p.waitForFunction(() => /0 Kommentare noch nicht exportiert/.test(document.querySelector('.lead')?.textContent ?? ''));
ok(await p.locator('button:has-text("Neue Kommentare exportieren")').isDisabled(), 'nach dem Markieren nichts Neues mehr zu exportieren');
ok(/4,0/.test(await p.textContent('.dev-table')), 'Sterne bleiben nach dem Markieren erhalten');

// Archiv: Text bleibt sichtbar, Antwort an alle exportierten Kommentare einer Übung inkl. „verbessert“
await p.click('text=nur Übungen mit Rückmeldung >> input').catch(() => {});
await p.click('label:has-text("Exportierte anzeigen") input');
await p.click('.dev-row-btn:has-text("Blitzreaktion")');
ok((await p.textContent('.dev-comments')).includes('Zu schnell am Anfang.'), 'exportierter Kommentar bleibt im Archiv lesbar');
await p.fill('.dev-box textarea', 'Tempo am Anfang gesenkt.');
await p.click('.dev-box label:has-text("Übung wurde verbessert") input');
await p.click('button:has-text("Antwort an alle senden")');
await p.waitForSelector('.dev-replies');
ok((await p.textContent('.dev-comments')).includes('Tempo am Anfang gesenkt.'), 'Antwort erscheint unter dem Kommentar');
ok((await p.textContent('#dev-improvements + *, section.dev-box')).includes('Tempo am Anfang gesenkt.'), 'Verbesserung steht in der Liste');
const pub = await p.evaluate(async () => (await (await fetch('/api/improvements')).json()).items);
ok(pub.length === 1 && pub[0].exerciseId === 'blitzreaktion', 'öffentliche Schnittstelle nennt die Verbesserung');

// Endgültig löschen nur ausdrücklich (Bestätigung)
p.once('dialog', (d) => d.accept());
await p.click('button:has-text("Endgültig löschen")');
await p.waitForFunction(() => !document.querySelector('.dev-comments li'));
ok(true, 'Endgültig löschen entfernt genau diesen Eintrag');

// Reload: Passwort bleibt in der Sitzung
await p.reload({ waitUntil: 'networkidle' });
await p.waitForSelector('.dev-table');
ok(true, 'Sitzung bleibt nach Reload angemeldet');
ok(errors.length === 0, 'keine Seitenfehler ' + errors.join('|'));
await browser.close();
