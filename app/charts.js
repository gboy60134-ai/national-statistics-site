// Bharat by Numbers — small SVG chart builders, no libraries, no network.
// Each builder returns an SVG string; views.js places it on the page.
window.BBN = window.BBN || {};

(function () {
  var COLORS = ["#1d4ed8", "#d97706", "#0f766e", "#b91c1c", "#6d28d9", "#0e7490"];

  function esc(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Horizontal bars. items: [{label, value, display?}]. Scale is set by the largest value.
  function barChart(items, unit) {
    var max = 0;
    items.forEach(function (it) { if (it.value > max) max = it.value; });
    var rowH = 44, labelW = 170, barMax = 300, valueW = 90;
    var width = labelW + barMax + valueW;
    var height = items.length * rowH + 8;
    var rows = items.map(function (it, i) {
      var y = 8 + i * rowH;
      var w = Math.max(4, Math.round((it.value / max) * barMax));
      var color = COLORS[i % COLORS.length];
      var shown = it.display || String(it.value);
      return '<g>'
        + '<text x="0" y="' + (y + 19) + '" class="chart-label">' + esc(it.label) + '</text>'
        + '<rect x="' + labelW + '" y="' + y + '" width="' + w + '" height="24" rx="4" fill="' + color + '"></rect>'
        + '<text x="' + (labelW + w + 10) + '" y="' + (y + 19) + '" class="chart-value">' + esc(shown) + '</text>'
        + '</g>';
    }).join("");
    var caption = unit ? '<p class="chart-note">' + esc(unit) + '</p>' : "";
    return '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="Bar chart" class="chart">' + rows + '</svg>' + caption;
  }

  // Donut with a legend. items: [{label, value}] in percent; values should sum to ~100.
  function donutChart(items) {
    var size = 220, cx = 110, cy = 110, r = 80, inner = 52;
    var total = 0;
    items.forEach(function (it) { total += it.value; });
    var offset = -90, arcs = "";
    items.forEach(function (it, i) {
      var frac = it.value / total;
      var a0 = (offset * Math.PI) / 180;
      var a1 = ((offset + frac * 360) * Math.PI) / 180;
      var large = frac > 0.5 ? 1 : 0;
      var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      var xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
      var xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
      arcs += '<path d="M ' + x0.toFixed(1) + ' ' + y0.toFixed(1)
        + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1)
        + ' L ' + xi1.toFixed(1) + ' ' + yi1.toFixed(1)
        + ' A ' + inner + ' ' + inner + ' 0 ' + large + ' 0 ' + xi0.toFixed(1) + ' ' + yi0.toFixed(1)
        + ' Z" fill="' + COLORS[i % COLORS.length] + '"></path>';
      offset += frac * 360;
    });
    var legend = items.map(function (it, i) {
      return '<li><span class="swatch" style="background:' + COLORS[i % COLORS.length] + '"></span>'
        + esc(it.label) + ' — <strong>' + it.value + '%</strong></li>';
    }).join("");
    return '<div class="donut-wrap"><svg viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="Donut chart" class="donut">'
      + arcs
      + '<text x="' + cx + '" y="' + (cy - 2) + '" text-anchor="middle" class="donut-big">' + items[0].value + '%</text>'
      + '<text x="' + cx + '" y="' + (cy + 18) + '" text-anchor="middle" class="donut-small">' + esc(items[0].label) + '</text>'
      + '</svg><ul class="legend">' + legend + '</ul></div>';
  }

  BBN.barChart = barChart;
  BBN.donutChart = donutChart;
})();
