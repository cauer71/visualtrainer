// Ende-zu-Ende-Test des Gesprächs Trainer ↔ Entwickler OHNE Worker: die Schnittstelle /api/* wird im Skript nachgebildet
// (Route-Abfangen). Start: npm run build && npx vite preview --port 4173, dann: node tests/e2e/feedback-dialog.mjs
import { chromium } from 'playwright';

const base = process.env.BASE ?? 'http://localhost:4173/';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1180, height: 820 } });
const p = await ctx.newPage();
const errors = [];
p.on('pageerror', (e) => errors.push(String(e)));
const ok = (c, m) => {
  if (!c) {
    console.error('FAIL', m);
    process.exitCode = 1;
  } else console.log('ok  ', m);
};

// ---- nachgebildete Schnittstelle
const api = { offline: false, rows: [], replies: [], improvements: [], posts: [], nextId: 1 };
await ctx.route('**/api/**', async (route) => {
  const req = route.request();
  const url = new URL(req.url());
  if (api.offline) return route.abort('internetdisconnected');
  const reply = (body, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
  if (url.pathname === '/api/feedback' && req.method() === 'POST') {
    const body = JSON.parse(req.postData() ?? '{}');
    api.posts.push(body);
    const id = api.nextId++;
    api.rows.push({ id, ...body });
    return reply({ ok: true, id });
  }
  if (url.pathname === '/api/feedback/mine') {
    const ids = (url.searchParams.get('ids') ?? '').split(',').map(Number);
    return reply({
      items: api.rows.filter((r) => ids.includes(r.id)).map((r) => ({ id: r.id, exported: true, replies: api.replies.filter((x) => x.feedbackId === r.id) })),
    });
  }
  if (url.pathname === '/api/improvements') return reply({ items: api.improvements });
  return reply({ error: 'nicht gefunden' }, 404);
});

const setRole = (role) =>
  p.evaluate(
    (r) =>
      localStorage.setItem('blickfit:v1', JSON.stringify({ v: 1, exercises: {}, days: [], settings: { sound: false, lang: 'de', role: r, customerIds: ['blitzreaktion', 'zielfang', 'suchbild'], fullscreen: false } })),
    role,
  );
const card = (id) => p.locator(`a.ex-card[href$="/uebung/${id}"]`);
const dot = () => p.locator('[data-nav="mine"] .nav-dot');
const rate = async (id, stars, comment) => {
  await p.goto(base + `#/uebung/${id}`, { waitUntil: 'networkidle' });
  await p.click('button:has-text("Bewerten")');
  if (stars) await p.click(`button[aria-label="${stars} von 5 Sternen"]`);
  if (comment) await p.fill('#fb-comment', comment);
  await p.locator('.fb-actions .btn-primary').click();
  await p.waitForSelector('.fb-thanks');
};

await p.goto(base, { waitUntil: 'networkidle' });

// Benutzer sieht nichts Neues
await setRole('kunde');
await p.reload({ waitUntil: 'networkidle' });
ok((await p.locator('[data-nav="mine"], .badge-rated, .badge-improved, .rated-filter').count()) === 0, 'Benutzer: keine Abzeichen, kein Menüpunkt, kein Filter');

// Trainer bewertet → Abzeichen
await setRole('optiker');
await p.reload({ waitUntil: 'networkidle' });
await rate('blitzreaktion', 4, 'Zu schnell am Anfang.');
await p.click('.role-card >> text=Schließen');
await p.goto(base + '#/', { waitUntil: 'networkidle' });
ok(((await card('blitzreaktion').textContent()) ?? '').includes('★4 bewertet'), 'Abzeichen „★4 bewertet“ an der Übungskarte');
ok((await card('zielfang').locator('.badge-rated').count()) === 0, 'unbewertete Übung ohne Abzeichen');
await p.click('[data-rated-filter="rated"]');
ok((await p.locator('a.ex-card').count()) === 1, 'Filter „Von mir bewertet“ zeigt nur die bewertete Übung');
await p.click('[data-rated-filter="unrated"]');
ok((await card('blitzreaktion').count()) === 0 && (await card('zielfang').count()) === 1, 'Filter „Noch nicht bewertet“ blendet sie aus');
await p.click('[data-rated-filter="all"]');

// Offline bewerten → „nicht gesendet“, später nachgesendet
api.offline = true;
await rate('zielfang', 2, 'Ziele zu klein.');
ok(((await p.textContent('.fb-queued')) ?? '').includes('noch nicht gesendet'), 'offline: Hinweis „noch nicht gesendet“');
await p.click('.role-card >> text=Schließen');
await p.goto(base + '#/meine', { waitUntil: 'networkidle' });
ok((await p.locator('.bubble-unsent').count()) === 1, 'Meine Bewertungen: Eintrag als „nicht gesendet“ markiert');
api.offline = false;
// der Knopf verschwindet, sobald alles gesendet ist: direkt auslösen statt auf „Klick fertig“ zu warten
await p.locator('button:has-text("Jetzt senden")').evaluate((el) => el.click());
await p.waitForFunction(() => document.querySelectorAll('.bubble-unsent').length === 0);
ok(api.posts.length === 2, 'nicht gesendete Bewertung wurde nachgesendet');

// Neuladen: eigene Liste bleibt
await p.reload({ waitUntil: 'networkidle' });
ok((await p.locator('.mine-item').count()) === 2, 'Meine Bewertungen überleben ein Neuladen');
ok(((await p.textContent('main')) ?? '').includes('Zu schnell am Anfang.'), 'Kommentar sichtbar');

// Entwickler antwortet und meldet die Übung als verbessert (später als die eigene Bewertung)
const later = new Date(Date.now() + 60_000).toISOString();
api.replies.push({ id: 1, feedbackId: 1, text: 'Tempo am Anfang gesenkt.', createdAt: later, improved: true });
api.improvements.push({ exerciseId: 'blitzreaktion', text: 'Tempo am Anfang gesenkt.', createdAt: later });
await p.goto(base + '#/', { waitUntil: 'networkidle' });
await p.reload({ waitUntil: 'networkidle' });
await dot().waitFor();
ok(Number(await dot().textContent()) >= 2, 'Hinweispunkt am Menü zählt Antwort und Verbesserung');
ok(((await card('blitzreaktion').locator('.badge-improved').textContent()) ?? '').includes('Neu verbessert'), 'Abzeichen „Neu verbessert“ an der Karte');
ok(((await card('blitzreaktion').locator('.badge-improved').getAttribute('title')) ?? '').includes('Tempo am Anfang gesenkt.'), 'Tooltip nennt, was verbessert wurde');
await p.click('[data-rated-filter="improved"]');
ok((await p.locator('a.ex-card').count()) === 1, 'Filter „Verbessert“ zeigt nur die verbesserte Übung');
ok(Number((await dot().count()) ? await dot().textContent() : 0) === 1, 'Öffnen der Verbessert-Liste markiert die Verbesserung als gesehen (Antwort bleibt)');
await p.click('[data-rated-filter="all"]');

// Meine Bewertungen: Sprechblase des Entwicklers, Hinweispunkt verschwindet
await p.click('[data-nav="mine"]');
await p.waitForSelector('.bubble-dev');
ok(((await p.locator('.bubble-dev').first().textContent()) ?? '').includes('Tempo am Anfang gesenkt.'), 'Antwort des Entwicklers als Sprechblase unter dem eigenen Kommentar');
const order = await p.locator('.mine-item[data-exercise="blitzreaktion"] .bubble').evaluateAll((els) => els.map((e) => e.dataset.bubble));
ok(order.join(',') === 'own,dev', 'Reihenfolge: Trainer, dann Entwickler');
ok((await dot().count()) === 0, 'Hinweispunkt ist nach dem Ansehen weg');
await p.reload({ waitUntil: 'networkidle' });
ok((await dot().count()) === 0, 'Hinweispunkt bleibt nach dem Neuladen weg');

// Erneut bewerten: Verlauf im Dialog, Fortsetzung wird mit replyTo gesendet
await p.goto(base + '#/uebung/blitzreaktion', { waitUntil: 'networkidle' });
ok(((await p.textContent('.intro-text')) ?? '').includes('Verbessert'), 'Übungsseite zeigt „Verbessert“ mit Text');
await p.click('button:has-text("Bewerten")');
ok((await p.locator('.fb-history .bubble-dev').count()) === 1, 'Dialog zeigt die letzte Bewertung samt Antwort');
await p.click('button[aria-label="5 von 5 Sternen"]');
await p.fill('#fb-comment', 'Jetzt viel besser, danke.');
await p.locator('.fb-actions .btn-primary').click();
await p.waitForSelector('.fb-thanks');
ok(api.posts.at(-1).replyTo === 1, 'Folgekommentar verweist auf die frühere Rückmeldung (replyTo)');

// Ohne Schnittstelle (statische Vorschau): keine Fehler, lokale Daten bleiben
api.offline = true;
await p.goto(base + '#/', { waitUntil: 'networkidle' });
await p.reload({ waitUntil: 'networkidle' });
ok(((await card('blitzreaktion').textContent()) ?? '').includes('★5 bewertet'), 'ohne Server: lokale Bewertung bleibt sichtbar');
ok(errors.length === 0, 'keine Seitenfehler ' + errors.join('|'));
await browser.close();
