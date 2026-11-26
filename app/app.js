// Bharat by Numbers — router, tabs and the CSV download. No network, no tracking.
window.BBN = window.BBN || {};

(function () {
  var viewEl = null;
  var navLinks = [];

  function currentSlug() {
    var hash = window.location.hash || "#/home";
    var slug = hash.replace(/^#\/?/, "").split("/")[0];
    var known = BBN.pages.some(function (p) { return p.slug === slug; });
    return known ? slug : "home";
  }

  function render() {
    var slug = currentSlug();
    var page = BBN.pages.find(function (p) { return p.slug === slug; });
    viewEl.innerHTML = BBN.views[slug]();
    document.title = page.title + " — Bharat by Numbers";
    navLinks.forEach(function (a) {
      var active = a.getAttribute("href") === "#/" + slug;
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    wireCsvButton();
    window.scrollTo(0, 0);
  }

  // Tabs: buttons carry data-tab (group) and data-target (panel name);
  // panels carry data-panel (group) and data-name. Clicking switches the group.
  function onTabClick(event) {
    var btn = event.target.closest("[data-tab]");
    if (!btn) return;
    var group = btn.getAttribute("data-tab");
    var target = btn.getAttribute("data-target");
    document.querySelectorAll('[data-tab="' + group + '"]').forEach(function (b) {
      var on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.querySelectorAll('[data-panel="' + group + '"]').forEach(function (panel) {
      panel.classList.toggle("active", panel.getAttribute("data-name") === target);
    });
  }

  function toCsvCell(value) {
    var text = String(value).replace(/"/g, '""');
    return '"' + text + '"';
  }

  function downloadCsv() {
    var header = ["Indicator", "Value", "Year", "Source"];
    var lines = [header.map(toCsvCell).join(",")];
    BBN.figures.forEach(function (f) {
      lines.push([f.label, f.value, f.year, f.source].map(toCsvCell).join(","));
    });
    var blob = new Blob([lines.join("\n") + "\n"], { type: "text/csv" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "india-figures.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function wireCsvButton() {
    var btn = document.getElementById("downloadCsv");
    if (btn) btn.addEventListener("click", downloadCsv);
  }

  document.addEventListener("DOMContentLoaded", function () {
    viewEl = document.getElementById("view");
    navLinks = Array.prototype.slice.call(document.querySelectorAll("nav a"));
    document.addEventListener("click", onTabClick);
    window.addEventListener("hashchange", render);
    render();
  });
})();
