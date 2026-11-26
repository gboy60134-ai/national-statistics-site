// Bharat by Numbers — every figure the site shows, each with its source and year.
// Figures are as published by the World Bank (WDI), the IMF (WEO), the ILO and UNDP.
// Values marked "derived" are arithmetic from the published figures beside them.
window.BBN = window.BBN || {};

BBN.figures = [
  // Population
  { id: "pop", label: "Population", value: "1.46 billion", year: 2025, source: "World Bank WDI", rank: "1st in the world", page: "population" },
  { id: "density", label: "Population density", value: "484 per km²", year: 2023, source: "World Bank WDI", page: "population" },
  { id: "area", label: "Land area", value: "2,973,190 km²", year: 2023, source: "World Bank WDI", page: "population" },
  { id: "urban", label: "Urban population", value: "35.7%", year: 2025, source: "World Bank WDI", page: "population" },
  { id: "rural", label: "Rural population", value: "64.3%", year: 2025, source: "Derived from World Bank WDI urban share", page: "population" },
  { id: "fertility", label: "Fertility rate", value: "1.96 births per woman", year: 2024, source: "World Bank WDI", page: "population" },
  { id: "births", label: "Birth rate", value: "16.0 per 1,000 people", year: 2024, source: "World Bank WDI", page: "population" },
  { id: "deaths", label: "Death rate", value: "6.6 per 1,000 people", year: 2024, source: "World Bank WDI", page: "population" },
  { id: "young", label: "Aged 0–14", value: "24.2% of population", year: 2025, source: "World Bank WDI", page: "population" },
  { id: "old", label: "Aged 65 and above", value: "7.4% of population", year: 2025, source: "World Bank WDI", page: "population" },
  // Economy
  { id: "gdp", label: "GDP (nominal)", value: "$3.96 trillion", year: 2025, source: "World Bank WDI", rank: "6th in the world", page: "economy" },
  { id: "gdpPpp", label: "GDP (PPP)", value: "$17.2 trillion", year: 2025, source: "World Bank WDI", rank: "3rd in the world", page: "economy" },
  { id: "gdpPc", label: "GDP per capita", value: "$2,702", year: 2025, source: "World Bank WDI", page: "economy" },
  { id: "gdpPcPpp", label: "GDP per capita (PPP)", value: "$11,748", year: 2025, source: "World Bank WDI", page: "economy" },
  { id: "growth", label: "GDP growth", value: "7.6% a year", year: 2025, source: "IMF WEO", page: "economy" },
  { id: "inflation", label: "Inflation (CPI)", value: "2.4% a year", year: 2025, source: "World Bank WDI", page: "economy" },
  { id: "debt", label: "Government debt", value: "84.3% of GDP", year: 2025, source: "IMF WEO", page: "economy" },
  { id: "poverty", label: "Extreme poverty", value: "2.6% of people", year: 2023, source: "World Bank WDI", page: "economy" },
  // Health
  { id: "life", label: "Life expectancy at birth", value: "72.2 years", year: 2024, source: "World Bank WDI", page: "health" },
  { id: "lifeW", label: "Life expectancy, women", value: "73.9 years", year: 2024, source: "World Bank WDI", page: "health" },
  { id: "lifeM", label: "Life expectancy, men", value: "70.7 years", year: 2024, source: "World Bank WDI", page: "health" },
  { id: "hdi", label: "Human Development Index", value: "0.685 (medium)", year: 2023, source: "UNDP", rank: "130th in the world", page: "health" },
  // Education
  { id: "literacy", label: "Adult literacy rate", value: "78.2%", year: 2024, source: "World Bank WDI", page: "education" },
  { id: "literacyF", label: "Female literacy rate", value: "70.7%", year: 2024, source: "World Bank WDI", page: "education" },
  { id: "edSpend", label: "Government spending on education", value: "4.1% of GDP", year: 2022, source: "World Bank WDI", page: "education" },
  { id: "enrolP", label: "Primary school enrolment", value: "111.0% (gross)", year: 2025, source: "World Bank WDI", page: "education" },
  { id: "enrolS", label: "Secondary school enrolment", value: "79.6% (gross)", year: 2025, source: "World Bank WDI", page: "education" },
  { id: "enrolT", label: "Tertiary enrolment", value: "34.4% (gross)", year: 2025, source: "World Bank WDI", page: "education" },
  // Work and connectivity
  { id: "unemp", label: "Unemployment rate", value: "4.2% of labour force", year: 2025, source: "ILO estimate, via World Bank WDI", page: "work" },
  { id: "unempY", label: "Youth unemployment", value: "16.0%", year: 2025, source: "World Bank WDI", page: "work" },
  { id: "labour", label: "Labour force", value: "617.6 million people", year: 2025, source: "World Bank WDI", page: "work" },
  { id: "participation", label: "Labour force participation", value: "55.7% of people aged 15+", year: 2025, source: "World Bank WDI", page: "work" },
  { id: "internet", label: "Internet users", value: "70.0% of population", year: 2025, source: "World Bank WDI", page: "work" }
];

BBN.chartData = {
  ageStructure: [
    { label: "Aged 0–14", value: 24.2 },
    { label: "Aged 15–64", value: 68.4 },
    { label: "Aged 65+", value: 7.4 }
  ],
  urbanRural: [
    { label: "Urban", value: 35.7 },
    { label: "Rural", value: 64.3 }
  ],
  gdpBars: [
    { label: "Nominal", value: 3.96, display: "$3.96tn" },
    { label: "PPP", value: 17.2, display: "$17.2tn" }
  ],
  lifeExpectancy: [
    { label: "Women", value: 73.9, display: "73.9 yrs" },
    { label: "Men", value: 70.7, display: "70.7 yrs" },
    { label: "All", value: 72.2, display: "72.2 yrs" }
  ],
  enrolment: [
    { label: "Primary", value: 111.0, display: "111.0%" },
    { label: "Secondary", value: 79.6, display: "79.6%" },
    { label: "Tertiary", value: 34.4, display: "34.4%" }
  ],
  labour: [
    { label: "Participation (15+)", value: 55.7, display: "55.7%" },
    { label: "Youth unemployment", value: 16.0, display: "16.0%" },
    { label: "Unemployment", value: 4.2, display: "4.2%" }
  ]
};

BBN.pages = [
  { slug: "home", title: "Home", heading: "India, by the numbers" },
  { slug: "population", title: "Population", heading: "A country of 1.46 billion people" },
  { slug: "economy", title: "Economy", heading: "The world's 6th-largest economy" },
  { slug: "health", title: "Health", heading: "Living longer, living better" },
  { slug: "education", title: "Education", heading: "Learning, from primary to university" },
  { slug: "work", title: "Work", heading: "Who works, and who looks for work" },
  { slug: "sources", title: "Sources", heading: "Where every figure comes from" }
];
