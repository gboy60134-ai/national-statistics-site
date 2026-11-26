# Bharat by Numbers

[![make.fun competition](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/gboy60134-ai/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/gboy60134-ai/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

Entry for the make.fun bounty [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

**Bharat by Numbers** is a national statistics site for India, as plain static files: no build step, no network requests, no tracking. It covers population, economy, health, education and work, with every figure carrying its source and year (World Bank WDI, IMF WEO, ILO, UNDP, 2022–2025).

- `app/index.html` — the site shell: header, navigation, footer
- `app/style.css` — the whole design, one stylesheet
- `app/data.js` — every figure the site shows, with source and year
- `app/charts.js` — small hand-written SVG bar and donut charts
- `app/views.js` — the page templates for each section
- `app/app.js` — the hash router, the tabs and the CSV download
- `screenshots/` — renders of the site in a browser (desktop and phone)
- `main.ts` — copies `app/` and `screenshots/` to the output and writes `dossier.json` with the kit's `vendor/makefun-frontend.ts`

Run it locally:

```sh
python3 -m http.server 8000 --directory app
# open http://localhost:8000/
```

Hand it in:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Made with make.fun — [make.fun/r/ba64hgf4](https://make.fun/r/ba64hgf4)
