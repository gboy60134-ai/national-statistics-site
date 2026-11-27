# Bharat by Numbers v2 — build notes

## What changed vs v1 (rank 1,338 / 4,140 in Round 1)

- **9 sections instead of 7** — added States and India vs the World.
- **73 figure cards instead of 33**, each still with source and year. New
  material: state populations (2023 projections + 2011 Census), trade and
  reserves (FY 2024–25 exports $820.9bn, forex $697.9bn), child mortality
  (SRS 2023), schooling years, employment by sector, CO₂, and a full
  India/China/US/World comparison table.
- **4 chart types instead of 2** — line charts (GDP 2015–2024, population
  2000–2024, life expectancy 2019–2024), donuts (age structure, sector
  shares, employment shares), horizontal bars (states, enrolment, mortality,
  participation) and grouped bars (India vs China vs US vs World).
- **Working controls** — live search across all figures on Home, three
  working tabs on Economy, a sortable states table (population / name /
  density), CSV download of the full figure set.
- **New design** — deep teal + saffron on warm paper (v1 was navy + cream),
  Georgia headings, tighter cards.
- **Smaller first load** — 6 files, 15,125 bytes gzip-9 (v1 was larger).

## Data

Every figure was checked against its publisher before writing: World Bank
WDI 2024 (GDP $3.91tn, PPP $16.2tn, per capita $2,695, growth 6.5%, life
expectancy 72.2), SRS 2023 (IMR 25, U5MR 29, birth rate 18.4), Technical
Group on Population Projections 2023 (state populations), Economic Survey
FY24 (sector GVA shares), Ministry of Commerce FY 2024–25 (exports
$820.9bn), RBI June 2025 (forex $697.9bn), UNDP 2023–24 (HDI 0.685),
UNESCO 2022 (adult literacy 76.9%). Figures marked "Derived" are arithmetic
on the named published figures. Two 2025-dated WDI values (population
1.46bn, GDP $3.96tn) were deliberately replaced with the verified 2024
values to avoid publishing projections as fact.

## Files

- `app/index.html` — shell, nav (9 links), footer
- `app/style.css` — whole design, one stylesheet
- `app/figures.js` — every figure, series, state and comparison row
- `app/draw.js` — hand-written SVG line / donut / bar / grouped-bar charts
- `app/pages.js` — one renderer per section + search, tabs, sorting, CSV
- `app/boot.js` — hash router
- `main.ts` — copies app/ + screenshots/ to the output, validates each
  screenshot (PNG/JPEG magic + 256 KiB cap), writes dossier.json with
  vendor/makefun-frontend.ts, then reads it back and checks the schema
- `vendor/makefun-frontend.ts` — kit copy, byte-identical, never edited
- `screenshots/` — 4 real Chromium renders (see below)

## Tests performed

- `node --check` on all four app scripts: pass.
- Served with `python3 -m http.server` and rendered in headless Chromium
  (chromium-1255): home, economy, states and population-phone all render
  with no console errors and no page exceptions.
- Interactivity driven over CDP: search "literacy" returns 4 figures;
  Economy "Trade and reserves" tab shows the exports cards; states table
  sorts correctly (density → Bihar first, name → Andhra Pradesh first,
  population → Uttar Pradesh first); CSV button present on Sources;
  Compare page renders its 10-row table. (One bug found and fixed during
  this: the density sort parsed "1,102" as 1 because of the comma.)
- `main.ts` run twice from foreign working directories
  (`/tmp` and `/`): both exit 0, outputs byte-identical (diff -r clean).
  Dossier 578,262 bytes, schema makefun/dossier/v1, 4 images; first load
  6 files / 15,125 bytes gzip-9; zero URLs in the source.
- Screenshots: 1-home.png 1280×800 102,095 B; 2-economy.png 1280×800
  119,543 B; 3-states.png 1280×800 105,244 B; 4-population-phone.png
  390×844 67,198 B — all within the 256 KiB / 1280px / 360px limits.

## Known limits

- State figures are 2023 projections from the 2011 Census, not a new
  count; the States page says so.
- US adult literacy is not published by UNESCO, so that cell is blank
  rather than guessed (noted on the Compare page).
