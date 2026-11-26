// Bharat by Numbers — page templates. Each view is a function returning HTML.
// Figures come from data.js; charts from charts.js. Nothing here fetches anything.
window.BBN = window.BBN || {};

(function () {
  function figure(id) {
    return BBN.figures.find(function (f) { return f.id === id; });
  }

  function card(f) {
    var rank = f.rank ? '<p class="card-rank">' + f.rank + '</p>' : '';
    return '<article class="card"><p class="card-label">' + f.label + '</p>'
      + '<p class="card-value">' + f.value + '</p>' + rank
      + '<p class="card-source">' + f.source + ', ' + f.year + '</p></article>';
  }

  function cards(ids) {
    return '<div class="cards">' + ids.map(function (id) { return card(figure(id)); }).join("") + '</div>';
  }

  function tableFor(page) {
    var rows = BBN.figures.filter(function (f) { return f.page === page; });
    var body = rows.map(function (f) {
      return '<tr><th scope="row">' + f.label + '</th><td>' + f.value + '</td><td>' + f.year + '</td><td>' + f.source + '</td></tr>';
    }).join("");
    return '<table class="figures"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead><tbody>' + body + '</tbody></table>';
  }

  function sectionNote(text) {
    return '<p class="note">' + text + '</p>';
  }

  function tabs(id, buttons, panels) {
    var btns = buttons.map(function (b, i) {
      return '<button type="button" class="tab' + (i === 0 ? ' active' : '') + '" data-tab="' + id + '" data-target="' + b[0] + '" aria-selected="' + (i === 0 ? 'true' : 'false') + '">' + b[1] + '</button>';
    }).join("");
    var panes = panels.map(function (p, i) {
      return '<div class="tab-panel' + (i === 0 ? ' active' : '') + '" data-panel="' + id + '" data-name="' + p[0] + '">' + p[1] + '</div>';
    }).join("");
    return '<div class="tabs" role="tablist">' + btns + '</div>' + panes;
  }

  var views = {};

  views.home = function () {
    return '<section class="hero"><h1>India, by the numbers</h1>'
      + '<p class="lede">The population, the economy, health, schooling and work — the figures that describe 1.46 billion people, each with its source and year, and nothing behind a paywall.</p>'
      + '<p><a class="button" href="#/population">Start with population</a> '
      + '<button type="button" class="button ghost" id="downloadCsv">Download all figures (CSV)</button></p></section>'
      + cards(["pop", "gdp", "gdpPc", "growth", "life", "literacy"])
      + '<section class="split"><div><h2>How big is the economy?</h2>'
      + BBN.barChart(BBN.chartData.gdpBars, "GDP in US dollars, 2025. Source: World Bank WDI.")
      + sectionNote("Nominal GDP values the economy at market exchange rates; PPP adjusts for what money buys locally. India ranks 6th nominally and 3rd on PPP.")
      + '</div><div><h2>Who lives here?</h2>'
      + BBN.donutChart(BBN.chartData.ageStructure)
      + sectionNote("Age shares, 2025. Source: World Bank WDI. The 15–64 share is derived from the published 0–14 and 65+ shares.")
      + '</div></section>'
      + '<section><h2>Explore the sections</h2><ul class="section-links">'
      + BBN.pages.filter(function (p) { return p.slug !== "home" && p.slug !== "sources"; }).map(function (p) {
          return '<li><a href="#/' + p.slug + '">' + p.title + ' — ' + p.heading + '</a></li>';
        }).join("")
      + '</ul></section>';
  };

  views.population = function () {
    return '<h1>A country of 1.46 billion people</h1>'
      + '<p class="lede">India passed China as the world’s most populous country in 2023 and keeps growing, more slowly each year. Two in three Indians still live in villages.</p>'
      + cards(["pop", "density", "urban", "fertility"])
      + tabs("pop", [["age", "Age structure"], ["place", "Where people live"]], [
          ["age", '<h2>Young, and ageing slowly</h2>' + BBN.donutChart(BBN.chartData.ageStructure)
            + sectionNote("Age shares, 2025. Source: World Bank WDI. Fertility is 1.96 births per woman (2024), below the 2.1 replacement level.")],
          ["place", '<h2>Mostly rural, urbanising steadily</h2>' + BBN.donutChart(BBN.chartData.urbanRural)
            + sectionNote("Urban share 35.7% (2025). Source: World Bank WDI. Density is 484 people per km² (2023).")]
        ])
      + '<h2>All population figures</h2>' + tableFor("population");
  };

  views.economy = function () {
    return '<h1>The world’s 6th-largest economy</h1>'
      + '<p class="lede">India’s economy is worth $3.96 trillion at market rates and $17.2 trillion adjusted for local prices — and it grew 7.6% in 2025, among the fastest of any large economy.</p>'
      + cards(["gdp", "gdpPpp", "gdpPc", "growth"])
      + tabs("econ", [["output", "Output and income"], ["prices", "Prices and public money"]], [
          ["output", '<h2>Output, two ways of counting it</h2>' + BBN.barChart(BBN.chartData.gdpBars, "GDP in US dollars, 2025. Source: World Bank WDI.")
            + sectionNote("GDP per person is $2,702 nominally and $11,748 on PPP (2025). The gap is the price level: everyday things cost far less in India than in the United States.")],
          ["prices", '<h2>Prices are calm; the state owes a lot</h2>' + cards(["inflation", "debt", "poverty"])
            + sectionNote("Inflation ran at 2.4% in 2025. Government debt is 84.3% of GDP, and 2.6% of people lived in extreme poverty in 2023. Sources: World Bank WDI, IMF WEO.")]
        ])
      + '<h2>All economy figures</h2>' + tableFor("economy");
  };

  views.health = function () {
    return '<h1>Living longer, living better</h1>'
      + '<p class="lede">A child born in India in 2024 can expect to live 72.2 years — 73.9 for girls, 70.7 for boys. The Human Development Index sits at 0.685, in the medium band.</p>'
      + cards(["life", "lifeW", "lifeM", "hdi"])
      + '<h2>Life expectancy, by sex</h2>'
      + BBN.barChart(BBN.chartData.lifeExpectancy, "Years at birth, 2024. Source: World Bank WDI.")
      + '<h2>All health figures</h2>' + tableFor("health");
  };

  views.education = function () {
    return '<h1>Learning, from primary to university</h1>'
      + '<p class="lede">Almost every child now enrols in primary school, four in five reach secondary school, and about one in three goes on to university. Adult literacy is 78.2% — 70.7% for women.</p>'
      + cards(["literacy", "literacyF", "edSpend", "enrolT"])
      + '<h2>Enrolment, by level</h2>'
      + BBN.barChart(BBN.chartData.enrolment, "Gross enrolment ratio, 2025. Source: World Bank WDI. Gross ratios can pass 100% where over-age pupils enrol.")
      + '<h2>All education figures</h2>' + tableFor("education");
  };

  views.work = function () {
    return '<h1>Who works, and who looks for work</h1>'
      + '<p class="lede">India’s labour force is 617.6 million people, but only 55.7% of people aged 15 and over are in it. Unemployment is low at 4.2% — yet 16.0% of young people looking for work cannot find it.</p>'
      + cards(["labour", "participation", "unemp", "unempY"])
      + '<h2>Work, in percent</h2>'
      + BBN.barChart(BBN.chartData.labour, "2025. Sources: World Bank WDI; unemployment is the ILO modelled estimate.")
      + sectionNote("Seven in ten Indians are online: internet users are 70.0% of the population (2025, World Bank WDI).")
      + '<h2>All work figures</h2>' + tableFor("work");
  };

  views.sources = function () {
    var groups = {};
    BBN.figures.forEach(function (f) {
      (groups[f.source] = groups[f.source] || []).push(f);
    });
    var sections = Object.keys(groups).sort().map(function (src) {
      var rows = groups[src].map(function (f) {
        return '<tr><th scope="row">' + f.label + '</th><td>' + f.value + '</td><td>' + f.year + '</td></tr>';
      }).join("");
      return '<h2>' + src + '</h2><table class="figures"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th></tr></thead><tbody>' + rows + '</tbody></table>';
    }).join("");
    return '<h1>Where every figure comes from</h1>'
      + '<p class="lede">Every number on this site names its publisher and the year it describes. Figures are as published and are revised by their publishers several times a year.</p>'
      + '<p><button type="button" class="button" id="downloadCsv">Download all figures (CSV)</button></p>'
      + sections
      + '<h2>How the site is built</h2>'
      + '<p class="note">Bharat by Numbers is a static site: plain HTML, CSS and JavaScript files, no build step, no network requests, no tracking. Figures are stored in <code>data.js</code>, charts are drawn as SVG by <code>charts.js</code>, pages are templates in <code>views.js</code>, and <code>app.js</code> wires up the routes, tabs and the CSV download.</p>';
  };

  BBN.views = views;
})();
