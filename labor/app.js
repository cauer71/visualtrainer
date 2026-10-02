/* Oberfläche: Menü, Anleitung, Einstellungen, Kalibrierung, Lauf, Ergebnisse, Hilfe. Keine Netzwerkzugriffe, kein innerHTML. */
(function () {
  'use strict';
  const VT = window.VT;
  const view = document.getElementById('view');
  const audio = VT.createAudio();
  const CALIB_KEY = 'vt.calib.v1';
  const CARD_W_CM = 8.56, CARD_H_CM = 5.398; // Bankkartenformat ID-1 zum Abgleich

  function h(tag, attrs) {
    const el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      const v = attrs[k];
      if (k === 'class') el.className = v;
      else if (k.indexOf('on') === 0 && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) el.setAttribute(k, v === true ? '' : v);
    });
    Array.prototype.slice.call(arguments, 2).forEach(function add(kid) {
      if (Array.isArray(kid)) { kid.forEach(add); return; }
      if (kid == null || kid === false) return;
      el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    });
    return el;
  }
  function show() {
    view.replaceChildren.apply(view, Array.prototype.slice.call(arguments));
    window.scrollTo(0, 0);
  }
  function ul(items) { return h('ul', null, items.map(function (t) { return h('li', null, t); })); }
  function ol(items) { return h('ol', null, items.map(function (t) { return h('li', null, t); })); }

  // ---- Anleitung ---------------------------------------------------------------
  function helpBlock(ex) {
    const hp = VT.getHelp(ex.id);
    if (!hp) return h('p', { class: 'note' }, 'Für diese Übung liegt keine Anleitung vor.');
    const parts = [
      h('h4', null, 'Wofür die Übung gedacht ist'), h('p', null, hp.purpose),
      h('h4', null, 'Vorbereitung'), ul(hp.setup),
      h('h4', null, 'So läuft die Übung ab'), ol(hp.steps),
      h('h4', null, 'Tipps'), ul(hp.tips),
      h('h4', null, 'Leichter und schwerer machen'), ul(hp.progression),
      h('h4', null, 'Hinweise zur Sicherheit'), ul(hp.cautions),
      h('h4', null, 'Hintergrund'), h('p', null, hp.background)
    ];
    if (hp.references && hp.references.length) {
      parts.push(h('h4', null, 'Literatur'));
      parts.push(ul(hp.references));
      parts.push(h('p', { class: 'note' }, 'Die Literaturangaben stammen aus dem Gedächtnis des Autors und sollten vor einer Weitergabe geprüft werden.'));
    }
    return h('div', { class: 'help' }, parts);
  }

  // ---- Kalibrierung ----------------------------------------------------------
  function loadCalib() {
    try {
      const s = JSON.parse(localStorage.getItem(CALIB_KEY));
      if (s && s.pxPerCm > 0 && s.viewDistanceCm > 0) return s;
    } catch (e) { /* Standard verwenden */ }
    return { pxPerCm: (window.screen.width || 1366) / 34, viewDistanceCm: 60 };
  }
  function storeCalib(s) { try { localStorage.setItem(CALIB_KEY, JSON.stringify(s)); } catch (e) { /* nur Sitzung */ } }

  function showCalibration() {
    const cal = loadCalib();
    const screenPx = window.screen.width || 1366;
    const widthIn = h('input', { type: 'number', id: 'c-width', min: 10, max: 300, step: 0.1, value: (screenPx / cal.pxPerCm).toFixed(1) });
    const distIn = h('input', { type: 'number', id: 'c-dist', min: 20, max: 600, step: 1, value: cal.viewDistanceCm });
    const slider = h('input', { type: 'range', id: 'c-slider', min: 15, max: 140, step: 0.1, value: cal.pxPerCm });
    const ref = h('div', { class: 'card-ref' }, 'Bankkarte 85,6 × 54,0 mm');
    const info = h('p', { class: 'note' });

    function refresh() {
      ref.style.width = (CARD_W_CM * cal.pxPerCm) + 'px';
      ref.style.height = (CARD_H_CM * cal.pxPerCm) + 'px';
      const c = VT.makeCalib(cal);
      info.textContent = cal.pxPerCm.toFixed(1) + ' Pixel pro cm. Bei ' + cal.viewDistanceCm + ' cm Abstand entspricht 1° etwa ' + c.degToCm(1).toFixed(2) + ' cm.';
    }
    widthIn.addEventListener('input', function () {
      const w = Number(widthIn.value);
      if (w > 0) { cal.pxPerCm = screenPx / w; slider.value = cal.pxPerCm; refresh(); }
    });
    slider.addEventListener('input', function () {
      cal.pxPerCm = Number(slider.value);
      widthIn.value = (screenPx / cal.pxPerCm).toFixed(1);
      refresh();
    });
    distIn.addEventListener('input', function () {
      const d = Number(distIn.value);
      if (d > 0) { cal.viewDistanceCm = d; refresh(); }
    });
    refresh();
    show(
      h('h2', null, 'Kalibrierung'),
      h('p', { class: 'note' }, 'Alle Größen der Übungen sind in Zentimetern angegeben. Damit sie stimmen, braucht die App die echte Bildschirmbreite. Entweder trägst du die Breite der Anzeigefläche ein, oder du hältst eine Bankkarte an den Bildschirm und ziehst den Regler, bis das Rechteck genauso groß ist. Den Abstand zwischen Auge und Bildschirm brauchst du für die Umrechnung in Sehwinkel.'),
      h('div', { class: 'form' },
        h('div', { class: 'field' }, h('label', { for: 'c-width' }, 'Breite der Anzeigefläche (cm)'), widthIn),
        h('div', { class: 'field' }, h('label', { for: 'c-slider' }, 'Abgleich mit Bankkarte'), slider),
        h('div', { class: 'field' }, h('label', { for: 'c-dist' }, 'Abstand Auge–Bildschirm (cm)'), distIn)),
      ref, info,
      h('div', { class: 'row' },
        h('button', { type: 'button', class: 'primary', onclick: function () { storeCalib(cal); showMenu(); } }, 'Speichern'),
        h('button', { type: 'button', onclick: showMenu }, 'Abbrechen')));
  }

  // ---- Allgemeine Hilfe --------------------------------------------------------
  function showHelp() {
    const g = VT.getGeneralHelp();
    if (!g) { show(h('h2', null, 'Hilfe'), h('p', null, 'Keine Hilfe vorhanden.')); return; }
    const nodes = [h('h2', null, g.title)];
    g.sections.forEach(function (s) {
      nodes.push(h('h3', null, s.title));
      (s.paragraphs || []).forEach(function (p) { nodes.push(h('p', null, p)); });
      if (s.list) nodes.push(ul(s.list));
      if (s.glossary) nodes.push(h('dl', null, s.glossary.map(function (e) { return [h('dt', null, e[0]), h('dd', null, e[1])]; })));
    });
    nodes.push(h('h3', null, 'Anleitungen zu den Übungen'));
    nodes.push(ul([]));
    nodes.pop();
    nodes.push(h('div', { class: 'row' }, VT.list().map(function (ex) {
      return h('button', { type: 'button', onclick: function () { showSettings(ex, VT.defaultsOf(ex), true); } }, ex.title);
    })));
    show.apply(null, nodes);
  }

  // ---- Menü ------------------------------------------------------------------
  function showMenu() {
    const groups = {};
    VT.list().forEach(function (ex) { (groups[ex.group] = groups[ex.group] || []).push(ex); });
    const nodes = [
      h('h2', null, 'Übungen'),
      h('p', { class: 'note' }, 'Neu hier? Lies zuerst die allgemeine Anleitung unter „Hilfe“ und kalibriere den Bildschirm unter „Kalibrierung“. Zu jeder Übung gibt es eine ausführliche Anleitung.')
    ];
    Object.keys(groups).forEach(function (g) {
      nodes.push(h('h3', null, g));
      nodes.push(h('div', { class: 'cards' }, groups[g].map(function (ex) {
        return h('div', { class: 'card' },
          h('strong', null, ex.title), h('p', null, ex.summary),
          h('div', { class: 'row', style: 'margin-top:4px' },
            h('button', { type: 'button', class: 'primary', onclick: function () { showSettings(ex, VT.defaultsOf(ex)); } }, 'Einstellen und starten'),
            h('button', { type: 'button', onclick: function () { showSettings(ex, VT.defaultsOf(ex), true); } }, 'Anleitung')));
      })));
    });
    show.apply(null, nodes);
  }

  // ---- Einstellungen mit Anleitung ----------------------------------------------
  function showSettings(ex, values, openHelp) {
    const hp = VT.getHelp(ex.id);
    const inputs = {};
    const fields = ex.params.map(function (p) {
      let input;
      if (p.type === 'select') {
        input = h('select', { id: 'p-' + p.key }, p.options.map(function (o) {
          return h('option', { value: o.value, selected: String(values[p.key]) === o.value }, o.label);
        }));
      } else {
        input = h('input', { type: 'number', id: 'p-' + p.key, min: p.min, max: p.max, step: p.step, value: values[p.key] });
      }
      inputs[p.key] = input;
      const hint = hp && hp.params[p.key] ? h('small', { class: 'hint' }, hp.params[p.key]) : null;
      return h('div', { class: 'field' }, h('label', { for: 'p-' + p.key }, p.label), input, hint);
    });
    function collect() {
      const raw = {};
      ex.params.forEach(function (p) { raw[p.key] = inputs[p.key].value; });
      return VT.sanitizeParams(ex, raw);
    }
    const startRow = h('div', { class: 'row' },
      h('button', { type: 'button', class: 'primary', onclick: function () { audio.ensure(); startRun(ex, collect()); } }, 'Start'),
      h('button', { type: 'button', onclick: showMenu }, 'Zurück'));
    show(
      h('h2', null, ex.title),
      h('p', { class: 'note' }, ex.summary),
      h('details', { class: 'doc', open: openHelp !== false }, h('summary', null, 'Anleitung'), helpBlock(ex)),
      h('h3', null, 'Einstellungen'),
      h('div', { class: 'form' }, fields),
      startRow);
  }

  // ---- Lauf ------------------------------------------------------------------
  function startRun(ex, params) {
    const calib = VT.makeCalib(loadCalib());
    const stage = h('div', { class: 'stage' });
    const canvas = h('canvas');
    const countdown = h('div', { class: 'countdown' }, '3');
    const abortBtn = h('button', { type: 'button', class: 'abort' }, 'Abbrechen');
    stage.append(canvas, countdown, abortBtn);
    document.body.append(stage);
    try { if (stage.requestFullscreen) stage.requestFullscreen().catch(function () {}); } catch (e) { /* ohne Vollbild weiter */ }

    let handle = null, finished = false, timer = null, n = 3;
    function cleanup() {
      clearInterval(timer);
      if (handle && handle.stop) handle.stop();
      stage.remove();
      try { if (document.fullscreenElement) document.exitFullscreen().catch(function () {}); } catch (e) { /* ignorieren */ }
    }
    abortBtn.addEventListener('click', function () { finished = true; cleanup(); showSettings(ex, params, false); });

    timer = setInterval(function () {
      n--;
      if (n > 0) { countdown.textContent = String(n); return; }
      clearInterval(timer);
      countdown.remove();
      begin();
    }, 800);

    function begin() {
      const width = window.innerWidth, height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const env = {
        canvas: canvas, ctx: ctx, width: width, height: height, calib: calib,
        rng: VT.makeRng((Date.now() ^ Math.floor(Math.random() * 4294967296)) >>> 0),
        audio: audio, now: function () { return performance.now(); }
      };
      handle = ex.run(env, params, function (summary) {
        if (finished) return;
        finished = true;
        cleanup();
        VT.saveResult({ id: ex.id, title: ex.title, at: new Date().toISOString(), params: params, metrics: summary.metrics, trials: summary.trials });
        showResult(ex, params, summary);
      });
    }
  }

  // ---- Download (lokal über Blob, ohne Netz) ---------------------------------
  function download(name, text) {
    const blob = new Blob(['﻿' + text], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = h('a', { href: url, download: name });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  function stamp() { return new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-'); }
  function fmt(v) { return v == null ? '–' : String(v).replace('.', ','); }
  function val(m) { return fmt(m.value) + (m.value != null && m.unit ? ' ' + m.unit : ''); }

  function showResult(ex, params, summary) {
    const hp = VT.getHelp(ex.id);
    show(
      h('h2', null, 'Ergebnis: ' + ex.title),
      h('table', null,
        h('thead', null, h('tr', null, h('th', null, 'Kennzahl'), h('th', null, 'Wert'), h('th', null, 'Bedeutung'))),
        h('tbody', null, summary.metrics.map(function (m) {
          return h('tr', null, h('td', null, m.label), h('td', { class: 'num' }, val(m)), h('td', { class: 'meaning' }, hp && hp.metrics[m.key] ? hp.metrics[m.key] : ''));
        }))),
      h('p', { class: 'note' }, 'Das Ergebnis ist gespeichert. Vergleiche Durchläufe nur bei gleichen Einstellungen, gleichem Gerät und gleichem Abstand. Mehr dazu unter „Hilfe“, Abschnitt „Ergebnisse richtig lesen“.'),
      h('div', { class: 'row' },
        h('button', { type: 'button', class: 'primary', onclick: function () { startRun(ex, params); } }, 'Nochmal'),
        h('button', { type: 'button', onclick: function () { showSettings(ex, params, false); } }, 'Einstellungen ändern'),
        h('button', { type: 'button', onclick: function () { download(ex.id + '-' + stamp() + '.csv', VT.toCSV(summary.trials)); } }, 'Einzelwerte als CSV'),
        h('button', { type: 'button', onclick: showMenu }, 'Menü')));
  }

  // ---- Gespeicherte Ergebnisse -----------------------------------------------
  function showResults() {
    const all = VT.loadResults().slice().reverse();
    const body = all.length ? h('table', null,
      h('thead', null, h('tr', null, h('th', null, 'Datum'), h('th', null, 'Übung'), h('th', null, 'Kennzahlen'))),
      h('tbody', null, all.map(function (r) {
        const ex = VT.get(r.id);
        const ks = (ex && ex.headline) || [];
        const txt = ks.map(function (k) {
          const m = r.metrics.find(function (x) { return x.key === k; });
          return m ? m.label + ': ' + val(m) : null;
        }).filter(Boolean).join('  ·  ');
        return h('tr', null, h('td', null, new Date(r.at).toLocaleString('de-DE')), h('td', null, r.title), h('td', null, txt));
      }))) : h('p', { class: 'note' }, 'Noch keine Ergebnisse gespeichert. Die Daten bleiben nur in diesem Browser.');
    show(
      h('h2', null, 'Ergebnisse'),
      body,
      h('div', { class: 'row' },
        h('button', { type: 'button', onclick: function () {
          const rows = [];
          VT.loadResults().forEach(function (r) {
            r.metrics.forEach(function (m) { rows.push({ Datum: r.at, Uebung: r.title, Kennzahl: m.label, Wert: m.value, Einheit: m.unit }); });
          });
          download('ergebnisse-' + stamp() + '.csv', VT.toCSV(rows, ['Datum', 'Uebung', 'Kennzahl', 'Wert', 'Einheit']));
        } }, 'Alle als CSV'),
        h('button', { type: 'button', class: 'danger', onclick: function () {
          if (window.confirm('Alle gespeicherten Ergebnisse in diesem Browser löschen?')) { VT.clearResults(); showResults(); }
        } }, 'Alle löschen')));
  }

  document.getElementById('nav-menu').addEventListener('click', showMenu);
  document.getElementById('nav-calib').addEventListener('click', showCalibration);
  document.getElementById('nav-results').addEventListener('click', showResults);
  document.getElementById('nav-help').addEventListener('click', showHelp);
  showMenu();
}());
