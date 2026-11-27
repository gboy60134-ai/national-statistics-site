// Bharat by Numbers v2 — one renderer per page. All content comes from figures.js;
// all charts from draw.js. Nothing here fetches anything over the network.
(function () {
  'use strict';

  var PAGES = window.PAGES = {};
  var S = window.STATS, D = window.DRAW;

  function esc(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function card(c) {
    return '<article class="stat-card"><p class="stat-label">' + esc(c.label) + '</p>' +
      '<p class="stat-value">' + esc(c.value) + '</p>' +
      (c.note ? '<p class="stat-note">' + esc(c.note) + '</p>' : '') +
      '<p class="stat-source">' + esc(c.source) + ', ' + esc(c.year) + '</p></article>';
  }

  function cardGrid(cards) {
    return '<div class="card-grid">' + cards.map(card).join('') + '</div>';
  }

  function sectionHead(group) {
    return '<h1>' + esc(group.heading) + '</h1><p class="lede">' + esc(group.intro) + '</p>';
  }

  function chartPanel(title, inner) {
    return '<section class="panel"><h2>' + esc(title) + '</h2>' + inner + '</section>';
  }

  // ---- Home ---------------------------------------------------------------
  PAGES.home = function () {
    var hero = '<section class="hero"><h1>India, by the numbers</h1>' +
      '<p class="lede">The population, the economy, health, schooling, work and the states — ' +
      'the figures that describe 1.45 billion people, each with its source and year, ' +
      'and nothing behind a paywall.</p>' +
      '<p class="hero-actions"><a class="btn" href="#/population">Start with population</a> ' +
      '<a class="btn btn-ghost" href="#/compare">India vs the world</a></p></section>';
    var cards = cardGrid(S.headlines.map(function (h) {
      return { label: h.label, value: h.value, year: h.year, source: h.source, note: h.note };
    }));
    var gdp = chartPanel('The economy, ten years on',
      D.line(S.series.gdp) +
      '<p>Nominal GDP rose from $2.10 trillion in 2015 to $3.91 trillion in 2024 — with one pandemic dip, in 2020. ' +
      'Source: World Bank WDI.</p>');
    var pop = chartPanel('A population still growing',
      D.line(S.series.population) +
      '<p>India passed China as the world’s most populous country in 2023. Source: UN World Population Prospects.</p>');
    var finder = '<section class="panel"><h2>Find any figure</h2>' +
      '<p><input id="finder" type="search" placeholder="Try “literacy”, “exports”, “fertility”… " aria-label="Search all figures"></p>' +
      '<p class="hint"><span id="finder-count"></span></p><div id="finder-results"></div></section>';
    return hero + cards + '<div class="chart-pair">' + gdp + pop + '</div>' + finder;
  };

  // ---- Generic group page (population / health / education / work) ---------
  function groupPage(slug) {
    var g = S.groups[slug];
    var html = sectionHead(g) + cardGrid(g.cards);
    if (slug === 'population') {
      html += '<div class="chart-pair">' +
        chartPanel('Population, 2000–2024', D.line(S.series.population)) +
        chartPanel('Who lives here? Age structure, 2025', D.donut([
          { label: 'Aged 0–14', value: 24.2, color: '#0f5a52' },
          { label: 'Aged 15–64', value: 68.4, color: '#d97b1f' },
          { label: 'Aged 65+', value: 7.4, color: '#3a9e7f' }
        ]) + '<p class="chart-note">Share of population. Source: World Bank WDI.</p>') +
        '</div>' +
        '<p class="next-link"><a href="#/states">See the states →</a> Uttar Pradesh alone has more people than Brazil.</p>';
    }
    if (slug === 'health') {
      html += '<div class="chart-pair">' +
        chartPanel('Life expectancy, 2019–2024', D.line(S.series.life) +
          '<p>The pandemic cut life expectancy to 67.3 years in 2021; by 2024 it was back to 72.2. Source: World Bank WDI.</p>') +
        chartPanel('Child deaths per 1,000 live births, 2023',
          D.hbars([
            { label: 'Under-5 mortality', value: 29, display: '29' },
            { label: 'Infant mortality', value: 25, display: '25' },
            { label: 'Neonatal mortality', value: 19, display: '19' }
          ], { note: 'Source: Sample Registration System, 2023.' })) +
        '</div>';
    }
    if (slug === 'education') {
      html += '<div class="chart-pair">' +
        chartPanel('Gross enrolment, 2023',
          D.hbars([
            { label: 'Primary', value: 111.0, display: '111.0%' },
            { label: 'Secondary', value: 79.6, display: '79.6%' },
            { label: 'Tertiary', value: 34.4, display: '34.4%' }
          ], { note: 'Gross enrolment can pass 100% when pupils outside the official age band enrol. Source: World Bank WDI.' })) +
        chartPanel('Years of schooling',
          D.hbars([
            { label: 'Expected years', value: 12.6, display: '12.6' },
            { label: 'Mean years (adults)', value: 6.5, display: '6.5' }
          ], { color: '#3a9e7f', note: 'Source: UNDP Human Development Report, 2023–24.' })) +
        '</div>';
    }
    if (slug === 'work') {
      html += '<div class="chart-pair">' +
        chartPanel('Where people work, 2025', D.donut([
          { label: 'Agriculture', value: 41.6, color: '#0f5a52' },
          { label: 'Services', value: 32.6, color: '#d97b1f' },
          { label: 'Industry', value: 25.8, color: '#3a9e7f' }
        ]) + '<p class="chart-note">Share of workers. Source: ILO.</p>') +
        chartPanel('Participation and joblessness, 2024',
          D.hbars([
            { label: 'Participation (15+)', value: 55.7, display: '55.7%' },
            { label: 'Female participation', value: 33.2, display: '33.2%' },
            { label: 'Youth unemployment', value: 16.0, display: '16.0%' },
            { label: 'Unemployment', value: 4.2, display: '4.2%' }
          ], { color: '#b4462e', note: 'Source: ILO, via World Bank WDI.' })) +
        '</div>';
    }
    return html;
  }
  PAGES.population = function () { return groupPage('population'); };
  PAGES.health = function () { return groupPage('health'); };
  PAGES.education = function () { return groupPage('education'); };
  PAGES.work = function () { return groupPage('work'); };

  // ---- Economy (tabs) ------------------------------------------------------
  PAGES.economy = function () {
    var g = S.groups.economy;
    var html = sectionHead(g);
    html += '<div class="tabs" role="tablist">' + g.tabs.map(function (t, i) {
      return '<button class="tab' + (i === 0 ? ' active' : '') + '" data-tab="' + t.id + '" role="tab">' + esc(t.label) + '</button>';
    }).join('') + '</div><div id="tab-body">' + cardGrid(g.cards.output) + '</div>';
    html += '<div class="chart-pair">' +
      chartPanel('GDP, 2015–2024', D.line(S.series.gdp)) +
      chartPanel('What the economy makes, 2024', D.donut([
        { label: 'Services', value: 49.9, color: '#0f5a52' },
        { label: 'Industry', value: 24.6, color: '#d97b1f' },
        { label: 'Agriculture', value: 16.3, color: '#3a9e7f' }
      ]) + '<p class="chart-note">Shares of GDP; the rest is net taxes on products. Source: World Bank WDI.</p>') +
      '</div>' +
      '<section class="panel"><h2>Trade in one line</h2><p>In FY 2024–25 India exported $820.9 billion of goods and services and imported about $915 billion. ' +
      'Services — above all IT and business services — are now 47% of exports, and the $697.9 billion of foreign-exchange reserves cover more than 11 months of imports. ' +
      'Sources: Ministry of Commerce; Reserve Bank of India.</p></section>';
    return html;
  };

  // ---- States (sortable table + bars) --------------------------------------
  PAGES.states = function () {
    var rows = S.states.map(function (st) {
      return {
        name: st.name, pop: st.pop2023, census: st.census2011, density: st.density2011,
        share: (100 * st.pop2023 / S.indiaPop2023)
      };
    });
    var bars = D.hbars(rows.slice(0, 8).map(function (r) {
      return { label: r.name, value: r.pop, display: r.pop.toFixed(1) + 'm' };
    }), { note: 'Population in millions, 2023 projections. Source: Technical Group on Population Projections, National Commission on Population.' });
    var table = '<table id="states-table"><thead><tr>' +
      '<th>State</th><th class="num">Population 2023</th><th class="num">Share of India</th>' +
      '<th class="num">Census 2011</th><th class="num">Density 2011 / km²</th></tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr><td>' + esc(r.name) + '</td><td class="num">' + r.pop.toFixed(1) + 'm</td>' +
          '<td class="num">' + r.share.toFixed(1) + '%</td><td class="num">' + r.census.toFixed(1) + 'm</td>' +
          '<td class="num">' + r.density.toLocaleString('en-IN') + '</td></tr>';
      }).join('') + '</tbody></table>';
    return '<h1>Twelve states hold most of India</h1>' +
      '<p class="lede">Uttar Pradesh alone has 236.5 million people — more than Brazil. These twelve states hold about 71% of the country. ' +
      'Figures are the Technical Group on Population Projections’ 2023 estimates, with the 2011 Census for comparison.</p>' +
      '<div class="sort-row"><span>Sort the table by:</span> ' +
      '<button class="sort-btn active" data-sort="pop">Population</button>' +
      '<button class="sort-btn" data-sort="name">Name A–Z</button>' +
      '<button class="sort-btn" data-sort="density">Density</button></div>' +
      '<div class="panel states-panel">' + table + '</div>' +
      '<div class="chart-pair"><section class="panel"><h2>The eight largest states</h2>' + bars + '</section>' +
      '<section class="panel"><h2>Reading the table</h2><p>Bihar is the densest large state — 1,102 people per km² in 2011, ' +
      'against 200 in Rajasthan. Maharashtra, third by people, is only ninth by density: its cities are big, but so is its countryside. ' +
      'The 2023 figures are projections from the 2011 Census, not a new count — India’s next census was still pending when these were published.</p></section></div>';
  };

  // ---- Compare -------------------------------------------------------------
  PAGES.compare = function () {
    var head = '<h1>India against the world</h1>' +
      '<p class="lede">India is the world’s most populous country and its 5th-largest economy — but per person it is still far poorer than China, let alone the United States. The gaps are the story.</p>';
    var bars1 = D.grouped('Life expectancy, 2023 (years)', [
      { label: 'India', value: 72.0, display: '72.0' },
      { label: 'China', value: 78.2, display: '78.2' },
      { label: 'United States', value: 78.4, display: '78.4' },
      { label: 'World', value: 71.4, display: '71.4' }
    ], { note: 'Source: World Bank WDI.' });
    var bars2 = D.grouped('Internet users, 2024 (% of people)', [
      { label: 'India', value: 70, display: '70%' },
      { label: 'China', value: 78, display: '78%' },
      { label: 'United States', value: 92, display: '92%' },
      { label: 'World', value: 68, display: '68%' }
    ], { note: 'Source: ITU / World Bank WDI.' });
    var rows = S.compare.map(function (r) {
      return '<tr><td>' + esc(r.indicator) + ' <span class="yr">(' + r.year + ')</span></td>' +
        '<td class="num"><strong>' + esc(r.india) + '</strong></td><td class="num">' + esc(r.china) + '</td>' +
        '<td class="num">' + esc(r.us) + '</td><td class="num">' + esc(r.world) + '</td></tr>';
    }).join('');
    var table = '<section class="panel"><h2>The full comparison</h2><table><thead><tr>' +
      '<th>Indicator</th><th class="num">India</th><th class="num">China</th><th class="num">United States</th><th class="num">World</th></tr></thead>' +
      '<tbody>' + rows + '</tbody></table>' +
      '<p class="chart-note">Sources differ by row and are listed in the Sources page; “world” GDP per person is derived from World Bank totals. US adult literacy is not published by UNESCO, so the cell is blank rather than guessed.</p></section>';
    return head + '<div class="chart-pair"><section class="panel">' + bars1 + '</section>' +
      '<section class="panel">' + bars2 + '</section></div>' + table;
  };

  // ---- Sources -------------------------------------------------------------
  PAGES.sources = function () {
    var list = S.sources.map(function (s) {
      return '<li><strong>' + esc(s.publisher) + '</strong> — ' + esc(s.covers) +
        ' <span class="yr">(' + esc(s.years) + ')</span></li>';
    }).join('');
    return '<h1>Where every figure comes from</h1>' +
      '<p class="lede">Every figure on this site names its source and year on the card that shows it. ' +
      'Figures marked “Derived” are plain arithmetic on the published figures named beside them; nothing is estimated without saying so.</p>' +
      '<section class="panel"><ul class="source-list">' + list + '</ul></section>' +
      '<section class="panel"><h2>How to use this site</h2><p>Figures are for looking up, not for copying without credit: ' +
      'cite the publisher and year shown on the card. The whole set downloads as a CSV from the home page. ' +
      'This site makes no network requests, sets no cookies and stores nothing about its visitors.</p>' +
      '<p><button class="btn" id="csv-btn">Download all figures (CSV)</button></p></section>';
  };

  // ---- Shared behaviours, wired after each render --------------------------
  PAGES.afterRender = function (slug) {
    var input = document.getElementById('finder');
    if (input) {
      var all = [];
      S.headlines.forEach(function (h) { all.push(h); });
      Object.keys(S.groups).forEach(function (key) {
        var g = S.groups[key];
        var list = Array.isArray(g.cards) ? g.cards : Object.keys(g.cards).map(function (k) { return g.cards[k]; }).flat();
        list.forEach(function (c) { all.push(c); });
      });
      var box = document.getElementById('finder-results');
      var count = document.getElementById('finder-count');
      var render = function (q) {
        var hits = all.filter(function (c) {
          return (c.label + ' ' + c.value + ' ' + c.source).toLowerCase().indexOf(q) !== -1;
        });
        count.textContent = q ? hits.length + ' figure' + (hits.length === 1 ? '' : 's') + ' found' : all.length + ' figures on this site — type to search them';
        box.innerHTML = '<div class="card-grid">' + hits.slice(0, 12).map(card).join('') + '</div>';
      };
      input.addEventListener('input', function () { render(input.value.trim().toLowerCase()); });
      render('');
    }
    document.querySelectorAll('.tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.tab').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        document.getElementById('tab-body').innerHTML = cardGrid(S.groups.economy.cards[btn.dataset.tab]);
      });
    });
    document.querySelectorAll('.sort-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.sort-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var rows = Array.prototype.slice.call(document.querySelectorAll('#states-table tbody tr'));
        var key = btn.dataset.sort;
        rows.sort(function (a, b) {
          if (key === 'name') return a.cells[0].textContent.localeCompare(b.cells[0].textContent);
          var col = key === 'density' ? 4 : 1;
          var num = function (cell) { return parseFloat(cell.textContent.replace(/,/g, '')); };
          return num(b.cells[col]) - num(a.cells[col]);
        });
        var body = document.querySelector('#states-table tbody');
        rows.forEach(function (r) { body.appendChild(r); });
      });
    });
    var csvBtn = document.getElementById('csv-btn');
    if (csvBtn) csvBtn.addEventListener('click', function () { PAGES.downloadCsv(); });
  };

  PAGES.downloadCsv = function () {
    var lines = ['label,value,year,source,page'];
    function push(c, page) {
      lines.push('"' + c.label.replace(/"/g, '""') + '","' + c.value.replace(/"/g, '""') + '",' + c.year + ',"' + c.source.replace(/"/g, '""') + '",' + page);
    }
    S.headlines.forEach(function (h) { push(h, 'home'); });
    Object.keys(S.groups).forEach(function (key) {
      var g = S.groups[key];
      var list = Array.isArray(g.cards) ? g.cards : Object.keys(g.cards).map(function (k) { return g.cards[k]; }).flat();
      list.forEach(function (c) { push(c, key); });
    });
    var blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'bharat-by-numbers-figures.csv';
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  };
})();
