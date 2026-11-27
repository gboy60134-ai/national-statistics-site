# Bharat by Numbers

[![make.fun competition](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/gboy60134-ai/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/gboy60134-ai/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

Entry for the make.fun bounty [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

**Bharat by Numbers v2** is a national statistics site for India, as plain static files: no build step, no network requests, no tracking. Version 2 is a substantial rebuild of the v1 entry (which ranked 1,338th of 4,140 in Round 1): 9 sections instead of 7, about 75 figures instead of 33, and four chart types instead of two.

- **Home** — 8 headline figures, GDP and population line charts, and a live search across every figure on the site
- **Population** — 12 figures, a 2000–2024 population line chart and an age-structure donut
- **Economy** — 20 figures in three working tabs (output, prices, trade), a GDP line chart and a sector-share donut
- **States** — a sortable table of the 12 largest states (2023 projections with 2011 Census comparison) plus a bar chart
- **Health** — 12 figures, a life-expectancy line chart (2019–2024) and child-mortality bars
- **Education** — 9 figures, enrolment bars and schooling bars
- **Work** — 12 figures, an employment-share donut and participation bars
- **India vs the World** — grouped bar charts plus a 10-row comparison table (India, China, United States, World)
- **Sources** — every publisher, what it supplied, and the years covered

Every figure carries its source and year (World Bank WDI, IMF WEO, UNDP, ILO, Sample Registration System, RBI, Ministry of Commerce, 2019–2025). The full figure set downloads as CSV from the home and sources pages.

- `app/index.html` — the site shell: header, navigation, footer
- `app/style.css` — the whole design, one stylesheet (deep teal, saffron, warm paper)
- `app/figures.js` — every figure the site shows, with source and year
- `app/draw.js` — hand-written SVG line, donut, bar and grouped-bar charts
- `app/pages.js` — one renderer per section, plus search, tabs, table sorting and CSV download
- `app/boot.js` — the hash router
- `screenshots/` — renders of the site in a browser (desktop and phone)
- `main.ts` — copies `app/` and `screenshots/` to the output, validates the screenshots, and writes `dossier.json` with the kit's `vendor/makefun-frontend.ts`

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
