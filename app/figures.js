// Bharat by Numbers v2 — all figures the site shows.
// Every figure carries its source and year. Figures labelled "Derived" are plain
// arithmetic on the published figures named beside them. Sources: World Bank WDI,
// IMF WEO, UNDP HDR, ILO, Sample Registration System (RGI), NFHS-5, RBI, Ministry
// of Commerce, MNRE, TRAI, WHO/UNICEF, UN World Population Prospects, Economic Survey.
(function () {
  'use strict';

  var STATS = window.STATS = {};

  // Headline figures on the home page.
  STATS.headlines = [
    { id: 'pop', label: 'Population', value: '1.45 billion', year: 2024, source: 'World Bank WDI', note: '1st in the world', page: 'population' },
    { id: 'gdp', label: 'GDP, nominal', value: '$3.91 trillion', year: 2024, source: 'World Bank WDI', note: '5th in the world', page: 'economy' },
    { id: 'gdpppp', label: 'GDP, PPP', value: '$16.2 trillion', year: 2024, source: 'World Bank WDI', note: '3rd in the world', page: 'economy' },
    { id: 'gdppc', label: 'GDP per person', value: '$2,695', year: 2024, source: 'World Bank WDI', note: '', page: 'economy' },
    { id: 'life', label: 'Life expectancy', value: '72.2 years', year: 2024, source: 'World Bank WDI', note: '', page: 'health' },
    { id: 'literacy', label: 'Adult literacy', value: '76.9%', year: 2022, source: 'UNESCO, via World Bank WDI', note: '', page: 'education' },
    { id: 'growth', label: 'GDP growth', value: '6.5% a year', year: 2024, source: 'World Bank WDI', note: '', page: 'economy' },
    { id: 'online', label: 'Internet users', value: '70% of people', year: 2025, source: 'World Bank WDI', note: '', page: 'work' }
  ];

  // One group per section page. Each card: label, value, year, source, optional note.
  STATS.groups = {
    population: {
      title: 'Population',
      heading: '1.45 billion people, and still growing',
      intro: 'India passed China as the world’s most populous country in 2023. The count below is the World Bank’s 2024 figure; the state table on the States page breaks it down.',
      cards: [
        { label: 'Population', value: '1.45 billion', year: 2024, source: 'World Bank WDI', note: '1st in the world' },
        { label: 'Population density', value: '484 per km²', year: 2023, source: 'World Bank WDI', note: '' },
        { label: 'Land area', value: '2,973,190 km²', year: 2023, source: 'World Bank WDI', note: '' },
        { label: 'Urban population', value: '36.4%', year: 2024, source: 'United Nations', note: '' },
        { label: 'Rural population', value: '63.6%', year: 2024, source: 'Derived from UN urban share', note: '' },
        { label: 'Fertility rate', value: '2.0 births per woman', year: 2023, source: 'World Bank WDI', note: 'Replacement level' },
        { label: 'Birth rate', value: '18.4 per 1,000 people', year: 2023, source: 'Sample Registration System', note: '' },
        { label: 'Death rate', value: '6.4 per 1,000 people', year: 2023, source: 'Sample Registration System', note: '' },
        { label: 'Aged 0–14', value: '24.2% of population', year: 2025, source: 'World Bank WDI', note: '' },
        { label: 'Aged 15–64', value: '68.4% of population', year: 2025, source: 'World Bank WDI', note: '' },
        { label: 'Aged 65 and above', value: '7.4% of population', year: 2025, source: 'World Bank WDI', note: '' },
        { label: 'Sex ratio', value: '1,020 women per 1,000 men', year: '2019–21', source: 'NFHS-5', note: '' }
      ]
    },
    economy: {
      title: 'Economy',
      heading: 'The world’s 5th-largest economy',
      intro: 'India’s economy is worth $3.91 trillion at market rates and $16.2 trillion adjusted for local prices — and it grew 6.5% in 2024, among the fastest of any large economy.',
      tabs: [
        { id: 'output', label: 'Output and income' },
        { id: 'prices', label: 'Prices and public money' },
        { id: 'trade', label: 'Trade and reserves' }
      ],
      cards: {
        output: [
          { label: 'GDP, nominal', value: '$3.91 trillion', year: 2024, source: 'World Bank WDI', note: '5th in the world' },
          { label: 'GDP, PPP', value: '$16.2 trillion', year: 2024, source: 'World Bank WDI', note: '3rd in the world' },
          { label: 'GDP per person', value: '$2,695', year: 2024, source: 'World Bank WDI', note: '' },
          { label: 'GDP per person, PPP', value: '$11,165', year: 2024, source: 'Derived from World Bank WDI', note: '' },
          { label: 'GDP growth', value: '6.5% a year', year: 2024, source: 'World Bank WDI', note: '' },
          { label: 'Services share of GDP', value: '49.9%', year: 2024, source: 'World Bank WDI', note: '' },
          { label: 'Industry share of GDP', value: '24.6%', year: 2024, source: 'World Bank WDI', note: '' },
          { label: 'Agriculture share of GDP', value: '16.3%', year: 2024, source: 'World Bank WDI', note: 'Rest is net taxes on products' }
        ],
        prices: [
          { label: 'Inflation (CPI)', value: '4.7% a year', year: 2024, source: 'World Bank WDI', note: '' },
          { label: 'Government debt', value: '84.3% of GDP', year: 2025, source: 'IMF WEO', note: '' },
          { label: 'Extreme poverty', value: '2.3% of people', year: 2022, source: 'World Bank', note: 'At $2.15 a day' },
          { label: 'Government spending on education', value: '4.1% of GDP', year: 2022, source: 'World Bank WDI', note: '' },
          { label: 'Health spending', value: '3.3% of GDP', year: 2021, source: 'WHO', note: '' },
          { label: 'Gross FDI inflows', value: '$55.6 billion', year: 'Apr–Nov 2024', source: 'Economic Survey 2024–25', note: 'First 8 months of FY25' }
        ],
        trade: [
          { label: 'Exports, goods and services', value: '$820.9 billion', year: 'FY 2024–25', source: 'Ministry of Commerce', note: '' },
          { label: 'Merchandise exports', value: '$437.4 billion', year: 'FY 2024–25', source: 'Ministry of Commerce', note: '' },
          { label: 'Services exports', value: '$383.5 billion', year: 'FY 2024–25', source: 'Ministry of Commerce', note: '' },
          { label: 'Imports, goods and services', value: '~$915 billion', year: 'FY 2024–25', source: 'Ministry of Commerce', note: '' },
          { label: 'Foreign exchange reserves', value: '$697.9 billion', year: 'June 2025', source: 'Reserve Bank of India', note: 'Over 11 months of imports' },
          { label: 'Current account balance', value: '−0.6% of GDP', year: 'FY 2024–25', source: 'Reserve Bank of India', note: 'Deficit of $23.3 billion' }
        ]
      }
    },
    health: {
      title: 'Health',
      heading: 'Living longer — and the gaps that remain',
      intro: 'Life expectancy reached 72.2 years in 2024, up from 67.3 in the pandemic year of 2021. Child deaths keep falling, but one in three young children is still stunted.',
      cards: [
        { label: 'Life expectancy at birth', value: '72.2 years', year: 2024, source: 'World Bank WDI', note: '' },
        { label: 'Life expectancy, women', value: '73.9 years', year: 2024, source: 'World Bank WDI', note: '' },
        { label: 'Life expectancy, men', value: '70.7 years', year: 2024, source: 'World Bank WDI', note: '' },
        { label: 'Human Development Index', value: '0.685 (medium)', year: 2023, source: 'UNDP', note: '130th in the world' },
        { label: 'Infant mortality', value: '25 per 1,000 live births', year: 2023, source: 'Sample Registration System', note: '' },
        { label: 'Under-5 mortality', value: '29 per 1,000 live births', year: 2023, source: 'Sample Registration System', note: '' },
        { label: 'Neonatal mortality', value: '19 per 1,000 live births', year: 2023, source: 'Sample Registration System', note: '' },
        { label: 'Maternal mortality ratio', value: '90 per 100,000 live births', year: '2019–21', source: 'Sample Registration System', note: '' },
        { label: 'Children immunised (DPT3)', value: '94%', year: 2023, source: 'WHO–UNICEF', note: '' },
        { label: 'Children under 5 stunted', value: '35.5%', year: '2019–21', source: 'NFHS-5', note: '' },
        { label: 'Basic sanitation', value: '78.7% of people', year: 2022, source: 'WHO/UNICEF JMP', note: '' },
        { label: 'Basic drinking water', value: '94% of people', year: 2022, source: 'WHO/UNICEF JMP', note: '' }
      ]
    },
    education: {
      title: 'Education',
      heading: 'Learning, from primary to university',
      intro: 'Three in four adults can read and write, and nine in ten young people. Schooling averages 6.5 years, and a child starting school today can expect 12.6 years of it.',
      cards: [
        { label: 'Adult literacy rate', value: '76.9%', year: 2022, source: 'UNESCO, via World Bank WDI', note: '' },
        { label: 'Youth literacy (15–24)', value: '91.7%', year: 2022, source: 'UNESCO', note: '' },
        { label: 'Female literacy rate', value: '70.7%', year: 2022, source: 'UNESCO, via World Bank WDI', note: '' },
        { label: 'Mean years of schooling', value: '6.5 years', year: '2023–24', source: 'UNDP', note: '' },
        { label: 'Expected years of schooling', value: '12.6 years', year: '2023–24', source: 'UNDP', note: '' },
        { label: 'Primary enrolment', value: '111.0% (gross)', year: 2023, source: 'World Bank WDI', note: '' },
        { label: 'Secondary enrolment', value: '79.6% (gross)', year: 2023, source: 'World Bank WDI', note: '' },
        { label: 'Tertiary enrolment', value: '34.4% (gross)', year: 2023, source: 'World Bank WDI', note: '' },
        { label: 'Government spending on education', value: '4.1% of GDP', year: 2022, source: 'World Bank WDI', note: '' }
      ]
    },
    work: {
      title: 'Work',
      heading: 'Who works, and who looks for work',
      intro: 'About 618 million people are in the labour force. Four in ten workers are still in farming, though farming makes only a sixth of output — the productivity gap that shapes India’s economy.',
      cards: [
        { label: 'Labour force', value: '617.6 million people', year: 2024, source: 'World Bank WDI', note: '' },
        { label: 'Labour force participation', value: '55.7% of people aged 15+', year: 2024, source: 'ILO, via World Bank WDI', note: '' },
        { label: 'Female participation', value: '33.2% of women aged 15+', year: 2024, source: 'ILO, via World Bank WDI', note: '' },
        { label: 'Unemployment rate', value: '4.2% of labour force', year: 2024, source: 'ILO, via World Bank WDI', note: '' },
        { label: 'Youth unemployment', value: '16.0%', year: 2024, source: 'World Bank WDI', note: '' },
        { label: 'Agriculture employment', value: '41.6% of workers', year: 2025, source: 'ILO', note: 'But 16.3% of GDP' },
        { label: 'Industry employment', value: '25.8% of workers', year: 2025, source: 'ILO', note: '' },
        { label: 'Services employment', value: '32.6% of workers', year: 2025, source: 'ILO', note: '' },
        { label: 'Internet users', value: '70.0% of population', year: 2025, source: 'World Bank WDI', note: '' },
        { label: 'Mobile subscriptions', value: '1.15 billion', year: 2024, source: 'TRAI', note: '' },
        { label: 'Access to electricity', value: '99.9% of people', year: 2023, source: 'World Bank WDI', note: '' },
        { label: 'Non-fossil power capacity', value: '236 GW', year: 2025, source: 'MNRE', note: '' }
      ]
    }
  };

  // Time series for line charts: [year, value].
  STATS.series = {
    gdp: { label: 'GDP, nominal ($ trillion)', source: 'World Bank WDI', unit: '$tn', points: [[2015, 2.10], [2016, 2.29], [2017, 2.65], [2018, 2.70], [2019, 2.83], [2020, 2.67], [2021, 3.17], [2022, 3.39], [2023, 3.57], [2024, 3.91]] },
    population: { label: 'Population (billion)', source: 'UN World Population Prospects', unit: 'bn', points: [[2000, 1.06], [2005, 1.15], [2010, 1.23], [2015, 1.31], [2020, 1.40], [2024, 1.45]] },
    life: { label: 'Life expectancy (years)', source: 'World Bank WDI', unit: 'yrs', points: [[2019, 70.9], [2020, 70.2], [2021, 67.3], [2022, 71.7], [2023, 72.0], [2024, 72.2]] }
  };

  // States: 2023 projections (Technical Group on Population Projections, National
  // Commission on Population, MoHFW, July 2020) and 2011 Census figures.
  STATS.states = [
    { name: 'Uttar Pradesh', pop2023: 236.5, census2011: 199.8, density2011: 828 },
    { name: 'Bihar', pop2023: 127.4, census2011: 104.1, density2011: 1102 },
    { name: 'Maharashtra', pop2023: 126.7, census2011: 112.4, density2011: 365 },
    { name: 'West Bengal', pop2023: 99.2, census2011: 91.3, density2011: 1029 },
    { name: 'Madhya Pradesh', pop2023: 86.9, census2011: 72.6, density2011: 236 },
    { name: 'Rajasthan', pop2023: 81.3, census2011: 68.5, density2011: 200 },
    { name: 'Tamil Nadu', pop2023: 76.9, census2011: 72.1, density2011: 555 },
    { name: 'Gujarat', pop2023: 71.8, census2011: 60.4, density2011: 308 },
    { name: 'Karnataka', pop2023: 68.0, census2011: 61.1, density2011: 319 },
    { name: 'Andhra Pradesh', pop2023: 53.2, census2011: 49.6, density2011: 308 },
    { name: 'Odisha', pop2023: 46.4, census2011: 41.9, density2011: 270 },
    { name: 'Assam', pop2023: 35.8, census2011: 31.2, density2011: 398 }
  ];
  STATS.indiaPop2023 = 1428.6; // million, Technical Group projection total

  // India against the world. Years differ by row and are shown in the table.
  STATS.compare = [
    { indicator: 'Population', year: 2024, india: '1.45 billion', china: '1.41 billion', us: '340 million', world: '8.16 billion', source: 'World Bank WDI' },
    { indicator: 'GDP, nominal', year: 2024, india: '$3.91 trillion', china: '$18.74 trillion', us: '$29.18 trillion', world: '$111.3 trillion', source: 'World Bank WDI' },
    { indicator: 'GDP per person', year: 2024, india: '$2,695', china: '$13,303', us: '$85,810', world: '$13,640', source: 'World Bank WDI; world derived' },
    { indicator: 'GDP, PPP', year: 2024, india: '$16.2 trillion', china: '$39.4 trillion', us: '$29.2 trillion', world: '$177 trillion', source: 'World Bank WDI' },
    { indicator: 'Life expectancy', year: 2023, india: '72.0 years', china: '78.2 years', us: '78.4 years', world: '71.4 years', source: 'World Bank WDI' },
    { indicator: 'Adult literacy', year: 2022, india: '76.9%', china: '97.1%', us: '—', world: '87.0%', source: 'UNESCO; US not published' },
    { indicator: 'Internet users', year: 2024, india: '70%', china: '78%', us: '92%', world: '68%', source: 'ITU / World Bank WDI' },
    { indicator: 'Fertility rate', year: 2023, india: '2.0', china: '1.0', us: '1.6', world: '2.2', source: 'UN World Population Prospects' },
    { indicator: 'CO₂ per person', year: 2024, india: '2.0 tonnes', china: '8.0 tonnes', us: '13.8 tonnes', world: '4.7 tonnes', source: 'Global Carbon Budget' },
    { indicator: 'Urban population', year: 2024, india: '36.4%', china: '66.0%', us: '83%', world: '58%', source: 'United Nations' }
  ];

  // Sources page: publisher, what it supplied, years covered.
  STATS.sources = [
    { publisher: 'World Bank — World Development Indicators', covers: 'Population, GDP, GDP per capita, growth, inflation, density, life expectancy, literacy, enrolment, unemployment, internet use, electricity access', years: '2022–2025' },
    { publisher: 'International Monetary Fund — World Economic Outlook', covers: 'Government debt', years: '2025' },
    { publisher: 'United Nations Development Programme — Human Development Report', covers: 'Human Development Index, mean and expected years of schooling', years: '2023–24' },
    { publisher: 'International Labour Organization', covers: 'Labour force participation, unemployment, employment by sector', years: '2024–2025' },
    { publisher: 'Registrar General of India — Sample Registration System', covers: 'Birth and death rates, infant, neonatal and under-5 mortality, maternal mortality', years: '2019–2023' },
    { publisher: 'National Family Health Survey (NFHS-5)', covers: 'Sex ratio, child stunting', years: '2019–21' },
    { publisher: 'Reserve Bank of India', covers: 'Foreign exchange reserves, current account balance', years: '2025' },
    { publisher: 'Ministry of Commerce and Industry', covers: 'Exports and imports of goods and services', years: 'FY 2024–25' },
    { publisher: 'National Commission on Population — Technical Group on Population Projections', covers: 'State populations, 2023 projections', years: '2023' },
    { publisher: 'Ministry of New and Renewable Energy', covers: 'Non-fossil power capacity', years: '2025' },
    { publisher: 'Telecom Regulatory Authority of India', covers: 'Mobile subscriptions', years: '2024' },
    { publisher: 'WHO / UNICEF', covers: 'Health spending, immunisation, sanitation, drinking water', years: '2021–2023' },
    { publisher: 'United Nations — World Population Prospects', covers: 'Population series, urban share, fertility', years: '2000–2024' },
    { publisher: 'Global Carbon Budget', covers: 'CO₂ emissions per person', years: '2024' },
    { publisher: 'Government of India — Economic Survey', covers: 'Sector shares of GVA, FDI inflows', years: '2023–25' }
  ];

  STATS.pages = [
    { slug: 'home', title: 'Home' },
    { slug: 'population', title: 'Population' },
    { slug: 'economy', title: 'Economy' },
    { slug: 'states', title: 'States' },
    { slug: 'health', title: 'Health' },
    { slug: 'education', title: 'Education' },
    { slug: 'work', title: 'Work' },
    { slug: 'compare', title: 'India vs the World' },
    { slug: 'sources', title: 'Sources' }
  ];
})();
