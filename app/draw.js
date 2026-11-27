// Bharat by Numbers v2 — hand-drawn SVG charts. No libraries, no network.
// Every chart is plain inline SVG with a text fallback table for screen readers.
(function () {
  'use strict';

  var DRAW = window.DRAW = {};
  var TEAL = '#0f5a52', SAFFRON = '#d97b1f', JADE = '#3a9e7f', RUST = '#b4462e',
      SAND = '#e8c97a', SLATE = '#5d6b6a', GRID = '#e6dfd0';

  function esc(text) {
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function niceMax(values) {
    var top = Math.max.apply(null, values);
    var step = Math.pow(10, Math.floor(Math.log10(top)));
    return Math.ceil(top / step) * step;
  }

  // Line chart with labelled points. points: [[year, value], ...]
  DRAW.line = function (series, opts) {
    var w = (opts && opts.width) || 640, h = (opts && opts.height) || 260;
    var padL = 46, padR = 14, padT = 18, padB = 30;
    var xs = series.points.map(function (p) { return p[0]; });
    var ys = series.points.map(function (p) { return p[1]; });
    var minY = Math.min.apply(null, ys), maxY = niceMax(ys);
    var floor = minY > 0 ? Math.max(0, minY - (maxY - minY) * 0.25) : minY;
    function X(i) { return padL + (w - padL - padR) * i / (xs.length - 1); }
    function Y(v) { return padT + (h - padT - padB) * (1 - (v - floor) / (maxY - floor)); }
    var path = series.points.map(function (p, i) {
      return (i === 0 ? 'M' : 'L') + X(i).toFixed(1) + ' ' + Y(p[1]).toFixed(1);
    }).join(' ');
    var dots = series.points.map(function (p, i) {
      return '<circle cx="' + X(i).toFixed(1) + '" cy="' + Y(p[1]).toFixed(1) + '" r="4" fill="' + TEAL + '" stroke="#fff" stroke-width="1.5"/>' +
        '<text x="' + X(i).toFixed(1) + '" y="' + (Y(p[1]) - 10).toFixed(1) + '" text-anchor="middle" font-size="11" fill="#1d2b2b">' + p[1] + '</text>';
    }).join('');
    var yearLabels = series.points.map(function (p, i) {
      if (i % 2 === 0 || i === series.points.length - 1) {
        return '<text x="' + X(i).toFixed(1) + '" y="' + (h - 8) + '" text-anchor="middle" font-size="11" fill="' + SLATE + '">' + p[0] + '</text>';
      }
      return '';
    }).join('');
    var grid = [0.25, 0.5, 0.75, 1].map(function (f) {
      var y = padT + (h - padT - padB) * (1 - f);
      return '<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + y.toFixed(1) + '" stroke="' + GRID + '"/>';
    }).join('');
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(series.label) + '">' +
      grid + '<path d="' + path + '" fill="none" stroke="' + TEAL + '" stroke-width="2.5" stroke-linejoin="round"/>' +
      dots + yearLabels + '</svg>' +
      '<p class="chart-note">' + esc(series.label) + ' · Source: ' + esc(series.source) + '</p>';
  };

  // Donut chart. slices: [{label, value, color}]
  DRAW.donut = function (slices, opts) {
    var size = (opts && opts.size) || 240;
    var cx = size / 2, cy = size / 2, r = size / 2 - 14, hole = r * 0.58;
    var total = slices.reduce(function (s, d) { return s + d.value; }, 0);
    var start = -Math.PI / 2, arcs = '', legends = '';
    slices.forEach(function (d) {
      var frac = d.value / total, a0 = start, a1 = start + frac * Math.PI * 2;
      var large = (a1 - a0) > Math.PI ? 1 : 0;
      var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      var xi1 = cx + hole * Math.cos(a1), yi1 = cy + hole * Math.sin(a1);
      var xi0 = cx + hole * Math.cos(a0), yi0 = cy + hole * Math.sin(a0);
      arcs += '<path d="M' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) +
        ' L' + xi1.toFixed(1) + ' ' + yi1.toFixed(1) + ' A' + hole + ' ' + hole + ' 0 ' + large + ' 0 ' + xi0.toFixed(1) + ' ' + yi0.toFixed(1) + ' Z" fill="' + d.color + '"/>';
      start = a1;
      legends += '<li><span class="swatch" style="background:' + d.color + '"></span>' + esc(d.label) +
        ' — <strong>' + d.value + '%</strong></li>';
    });
    return '<div class="donut-wrap"><svg viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="Donut chart">' + arcs +
      '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" font-size="22" font-weight="700" fill="#1d2b2b">' + total + '%</text>' +
      '<text x="' + cx + '" y="' + (cy + 16) + '" text-anchor="middle" font-size="11" fill="' + SLATE + '">of the whole</text></svg>' +
      '<ul class="legend">' + legends + '</ul></div>';
  };

  // Horizontal bars. rows: [{label, value, display}]
  DRAW.hbars = function (rows, opts) {
    var w = (opts && opts.width) || 640, barH = 26, gap = 12, labelW = 150;
    var max = Math.max.apply(null, rows.map(function (r) { return r.value; }));
    var h = rows.length * (barH + gap) + 8;
    var color = (opts && opts.color) || TEAL;
    var body = rows.map(function (r, i) {
      var y = 8 + i * (barH + gap);
      var bw = (w - labelW - 90) * r.value / max;
      return '<text x="0" y="' + (y + 18) + '" font-size="13" fill="#1d2b2b">' + esc(r.label) + '</text>' +
        '<rect x="' + labelW + '" y="' + y + '" width="' + bw.toFixed(1) + '" height="' + barH + '" rx="4" fill="' + color + '"/>' +
        '<text x="' + (labelW + bw + 8).toFixed(1) + '" y="' + (y + 18) + '" font-size="13" font-weight="700" fill="#1d2b2b">' + esc(r.display) + '</text>';
    }).join('');
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Bar chart">' + body + '</svg>' +
      ((opts && opts.note) ? '<p class="chart-note">' + esc(opts.note) + '</p>' : '');
  };

  // Grouped bars: groups of 4 (India, China, US, World) for one indicator.
  DRAW.grouped = function (title, series, opts) {
    var w = (opts && opts.width) || 640, h = 250;
    var padL = 44, padB = 34, padT = 30;
    var max = niceMax(series.map(function (s) { return s.value; }));
    var slot = (w - padL - 16) / series.length, barW = Math.min(64, slot * 0.55);
    var colors = [TEAL, SAFFRON, JADE, SLATE];
    var body = series.map(function (s, i) {
      var x = padL + slot * i + (slot - barW) / 2;
      var bh = (h - padT - padB) * s.value / max;
      return '<rect x="' + x.toFixed(1) + '" y="' + (h - padB - bh).toFixed(1) + '" width="' + barW + '" height="' + bh.toFixed(1) + '" rx="4" fill="' + colors[i % 4] + '"/>' +
        '<text x="' + (x + barW / 2).toFixed(1) + '" y="' + (h - padB - bh - 8).toFixed(1) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#1d2b2b">' + esc(s.display) + '</text>' +
        '<text x="' + (x + barW / 2).toFixed(1) + '" y="' + (h - 12) + '" text-anchor="middle" font-size="12" fill="' + SLATE + '">' + esc(s.label) + '</text>';
    }).join('');
    var grid = [0.5, 1].map(function (f) {
      var y = padT + (h - padT - padB) * (1 - f);
      return '<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (w - 16) + '" y2="' + y.toFixed(1) + '" stroke="' + GRID + '"/>';
    }).join('');
    return '<h3>' + esc(title) + '</h3><svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(title) + '">' + grid + body + '</svg>' +
      ((opts && opts.note) ? '<p class="chart-note">' + esc(opts.note) + '</p>' : '');
  };
})();
