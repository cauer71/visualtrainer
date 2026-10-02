// EYE-EXPERIMENT: kleiner statischer Testserver, der public/_headers wie Cloudflare (Workers Static Assets) anwendet.
// Nachgebildet: Regeln in Dateireihenfolge, Platzhalter `*` und `:name`, "! Name" löst bereits gesetzte Header ab,
// derselbe Header aus mehreren Regeln wird mit ", " verbunden (siehe developers.cloudflare.com/workers/static-assets/headers/).
// Außerdem: Verzeichnis-Index, /ordner → /ordner/ (301), SPA-Fallback auf /index.html nur für Seitenaufrufe.
// Einmalig gegen `wrangler dev` (workerd) verglichen: gleiche Header für /, /vr/, /eye/, /eye/labor/, /eye-models/*.
//
// Aufruf: npx vite build --outDir /tmp/dist-eye && node tests/e2e/eye-server.mjs /tmp/dist-eye 4180
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.png': 'image/png',
  '.md': 'text/markdown; charset=utf-8',
};

/** Liest _headers: [{ pattern, set: [[name, value]], unset: [name] }] in Dateireihenfolge. */
export function parseHeaders(text) {
  const rules = [];
  let cur = null;
  for (const raw of text.split(/\r?\n/)) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    if (/^\s/.test(raw)) {
      if (!cur) continue;
      const line = raw.trim();
      if (line.startsWith('!')) cur.unset.push(line.slice(1).trim().toLowerCase());
      else {
        const i = line.indexOf(':');
        if (i > 0) cur.set.push([line.slice(0, i).trim().toLowerCase(), line.slice(i + 1).trim()]);
      }
    } else {
      cur = { pattern: raw.trim(), set: [], unset: [] };
      rules.push(cur);
    }
  }
  return rules;
}

function patternToRegExp(p) {
  const esc = p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/:[A-Za-z]\w*/g, '[^/]+');
  return new RegExp(`^${esc}$`);
}

/** Header für einen Pfad nach Cloudflare-Regeln. */
export function headersFor(rules, pathname) {
  const out = {};
  const setNames = new Set();
  for (const r of rules) {
    if (!patternToRegExp(r.pattern).test(pathname)) continue;
    for (const n of r.unset) delete out[n];
    for (const [n, v] of r.set) {
      if (setNames.has(n) && out[n] !== undefined) out[n] += `, ${v}`;
      else {
        out[n] = v;
        setNames.add(n);
      }
    }
  }
  return out;
}

export function startEyeServer({ dir, headersFile, port = 0 }) {
  const root = path.resolve(dir);
  const rules = parseHeaders(fs.readFileSync(headersFile ?? path.join(root, '_headers'), 'utf8'));
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://x');
    let pathname = decodeURIComponent(url.pathname);
    const send = (status, file, extra = {}) => {
      const body = file ? fs.readFileSync(file) : '';
      const type = file ? MIME[path.extname(file)] : undefined;
      res.writeHead(status, { ...(type ? { 'content-type': type } : {}), ...headersFor(rules, pathname), ...extra });
      res.end(req.method === 'HEAD' ? undefined : body);
    };
    const abs = path.join(root, pathname);
    if (!abs.startsWith(root)) return send(403, null);
    let stat = null;
    try {
      stat = fs.statSync(abs);
    } catch {
      /* nicht vorhanden */
    }
    if (stat?.isDirectory()) {
      if (!pathname.endsWith('/')) return (res.writeHead(301, { location: pathname + '/' + url.search }), res.end());
      const index = path.join(abs, 'index.html');
      if (fs.existsSync(index)) return send(200, index);
    } else if (stat?.isFile() && path.basename(abs) !== '_headers') {
      return send(200, abs);
    }
    if (req.headers['sec-fetch-mode'] === 'navigate') {
      pathname = '/';
      return send(200, path.join(root, 'index.html'));
    }
    return send(404, null);
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve({ server, port: server.address().port, rules })));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dir = process.argv[2] ?? 'dist';
  const port = Number(process.argv[3] ?? 4180);
  const { port: p } = await startEyeServer({ dir, port });
  console.log(`Testserver mit _headers-Regeln: http://127.0.0.1:${p}/ (Ordner ${dir})`);
}
