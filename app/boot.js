// Bharat by Numbers v2 — hash router. One page per section, no network, no build.
(function () {
  'use strict';

  var NAV = [
    ['home', 'Home'], ['population', 'Population'], ['economy', 'Economy'],
    ['states', 'States'], ['health', 'Health'], ['education', 'Education'],
    ['work', 'Work'], ['compare', 'India vs the World'], ['sources', 'Sources']
  ];

  function currentSlug() {
    var hash = (location.hash || '#/home').replace(/^#\//, '');
    return window.PAGES[hash] ? hash : 'home';
  }

  function render() {
    var slug = currentSlug();
    var view = document.getElementById('view');
    view.innerHTML = window.PAGES[slug]();
    document.querySelectorAll('nav a').forEach(function (a) {
      var active = a.getAttribute('href') === '#/' + slug;
      if (active) { a.classList.add('active'); a.setAttribute('aria-current', 'page'); }
      else { a.classList.remove('active'); a.removeAttribute('aria-current'); }
    });
    window.PAGES.afterRender(slug);
    window.scrollTo(0, 0);
  }

  function buildNav() {
    var nav = document.getElementById('nav');
    nav.innerHTML = NAV.map(function (pair) {
      return '<a href="#/' + pair[0] + '">' + pair[1] + '</a>';
    }).join('');
  }

  buildNav();
  window.addEventListener('hashchange', render);
  render();
})();
