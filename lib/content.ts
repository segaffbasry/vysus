/* Every word and link on the page, taken from vysusgroup.com's homepage and navigation on 4 Oct 2026. Copy is
   verbatim (only dashes are rewritten, per the demo rules). Every URL was checked against the live sitemap index
   (/sitemaps-1-sitemap.xml) and is re-checked by scripts/check-links.mjs. */

const B = "https://www.vysusgroup.com";

export type Link = { label: string; href: string };
type Group = { label: string; href: string | null; links: Link[] };
export type Card = { kicker: string; title: string; date: string; iso: string; href: string; image: string; alt: string; portrait?: boolean };

export const site = {
  name: "Vysus Group",
  home: `${B}/`,
  contact: `${B}/contact`,
  search: `${B}/search`,
};

// Homepage sections, in page order (the menu's "On this page" list and the header anchors).
export const sections: Link[] = [
  { label: "Our services", href: "#services" },
  { label: "Case studies", href: "#case-studies" },
  { label: "Who we are", href: "#who-we-are" },
  { label: "News and insights", href: "#news" },
  { label: "Subscribe", href: "#subscribe" },
];

/* Hero: the live <h1>, the live header film, and the two figures from the stats band directly below it. */
export const hero = {
  title: "We help our clients to optimise project development and asset performance. Solving challenges, managing risk and maximising returns",
  film: { mp4: "/media/hero.mp4", mp4Small: "/media/hero-720.mp4", poster: "/media/hero-poster.jpg", label: "Engineering" },
  stats: [
    { value: 70, suffix: "GW", text: "Our Survey & GeoEngineering team has worked on offshore wind projects generating 70GW" },
    { value: 2, suffix: "million", text: "Our asset management consultants have conducted more than 2 million asset assessments" },
  ],
  actions: [
    { label: "Our services", href: "#services" },
    { label: "Get in touch", href: `${B}/contact` },
  ],
};

export const services = {
  label: "Our Services",
  image: { src: "/media/services.webp", alt: "Oil Rig Close Up" },
  items: [
    { label: "Asset Management", href: `${B}/services/asset-management` },
    { label: "Energy transition and sustainability consulting services", href: `${B}/energy-transition-sustainability-services` },
    { label: "HAZOP Assistant: the process safety co-pilot", href: `${B}/hazopassistant` },
    { label: "Human factors (HF) and working environment", href: `${B}/human-factors-and-working-environment` },
    { label: "Nuclear", href: `${B}/sectors/power-renewables-and-transition/nuclear` },
    { label: "Risk Management", href: `${B}/services/risk-management` },
    { label: "Survey & GeoEngineering", href: `${B}/services/survey-and-geoengineering` },
  ] as Link[],
};

/* The live homepage shows a single "Case studies" banner. Here it showcases the four most recent case studies from
   the live listing (/news-and-insights/case-studies, first page, newest first), with their own images, dates,
   categories and summary lines. */
export const caseStudies = {
  label: "Case studies",
  title: "Search and browse examples of our expertise delivering results",
  action: { label: "Our case studies", href: `${B}/news-and-insights/case-studies` },
  items: [
    {
      kicker: "GeoEngineering", title: "Subsea Rock Installation Support", date: "06.07.2026", iso: "2026-07-06",
      text: "This work was performed by Vysus’ Survey & GeoEngineering team",
      href: `${B}/case-studies/subsea-rock-installation-support`, image: "/media/case-subsea.webp", alt: "An offshore jack-up rig with a support vessel",
    },
    {
      kicker: "", title: "Preventing Buried Piping Leaks using Cathodic Protection (ICCP)", date: "16.03.2026", iso: "2026-03-16",
      text: "This work was performed by Vysus Group's Asset Integrity Management Team.",
      href: `${B}/case-studies/preventing-buried-piping-leaks-using-cathodic-protection-iccp`, image: "/media/case-iccp.webp", alt: "A corroded buried pipe exposed in a trench",
    },
    {
      kicker: "GeoEngineering", title: "Thermal resistivity dry-out curve for cohesive soils based on parametric testing", date: "16.03.2026", iso: "2026-03-16",
      text: "This work was performed by Vysus’ Survey & GeoEngineering team",
      href: `${B}/case-studies/thermal-resistivity-dry-out-curve-for-cohesive-soils-based-on-parametric-testing`, image: "/media/case-thermal.webp", alt: "An offshore wind farm with a buried export cable",
    },
    {
      kicker: "GeoEngineering", title: "Integrated 3D Ground Model for a challenging Irish west coast", date: "16.03.2026", iso: "2026-03-16",
      text: "This work was performed by Vysus’ Survey & GeoEngineering team",
      href: `${B}/case-studies/integrated-3d-ground-model-for-a-challenging-irish-west-coast`, image: "/media/case-ground-model.webp", alt: "A coloured bathymetric ground model of the seabed",
    },
  ] as (Card & { text: string })[],
};

export const whoWeAre = {
  label: "Who we are",
  // A still from the live header film (16s), the engineer with the plant overlay.
  image: { src: "/media/who.webp", alt: "An engineer in a hard hat reviewing plant data on a tablet" },
  title: "We are naturally progressive, always seeking to inject commercial insight, innovation and creativity into everything we do",
  links: [
    { label: "About us", href: `${B}/about` },
    { label: "Who we are", href: `${B}/about/who-we-are` },
    { label: "History", href: `${B}/about/history` },
    { label: "Mission and values", href: `${B}/about/mission-and-values` },
  ] as Link[],
};

/* The live homepage has two news blocks: "Announcement" (one item) and "Featured" (two articles). They share one
   row here. Images are the ones the homepage shows; the announcement's is a 350px portrait, so it is set as one. */
export const news = {
  label: "News and insights",
  more: { label: "More News", href: `${B}/news-and-insights/news` },
  items: [
    {
      kicker: "Announcement", title: "Sale of Australia-based Grid and Power Systems business to Rennie Advisory", date: "11.08.2026", iso: "2026-08-11",
      href: `${B}/news/announcement-sale-of-australia-based-grid-and-power-systems-business-to-rennie-advisory`,
      image: "/media/news-rennie.webp", alt: "Thomas Aas Saethre, CEO of Vysus Group", portrait: true,
    },
    {
      kicker: "Featured", title: "Less Is More: Preventing Information Overload Through Human-Centred Design", date: "13.03.2026", iso: "2026-03-13",
      href: `${B}/articles/less-is-more-preventing-information-overload-through-human-centred-design`,
      image: "/media/news-less-is-more.webp", alt: "",
    },
    {
      kicker: "Featured", title: "When Evidence Hides in Plain Sight", date: "26.02.2026", iso: "2026-02-26",
      href: `${B}/articles/when-evidence-hides-in-plain-sight`,
      image: "/media/news-evidence.webp", alt: "",
    },
  ] as Card[],
};

export const subscribe = {
  label: "Subscribe to our mailing list",
  title: "Technical papers, industry insights and latest news delivered to your inbox",
  action: { label: "Sign up today", href: `${B}/subscribe` },
  image: { src: "/media/subscribe.webp", alt: "A persons hand holding a smartphone showing an email inbox." },
};

export const contact = {
  title: ["Send us a", "message"],
  text: "Have a question or need advice? Talk to one of our subject matter experts.",
  action: { label: "Get in touch", href: `${B}/contact` },
};

/* The live primary navigation and its three mega menus. */
export const nav = {
  quick: [
    { label: "Sectors", href: `${B}/sectors` },
    { label: "Careers", href: "https://careers.vysusgroup.com/" },
    { label: "HSEQ", href: `${B}/sustainability` },
    { label: "News and Insights", href: `${B}/news-and-insights` },
    { label: "About", href: `${B}/about` },
  ] as Link[],
  sectors: {
    label: "Sectors", href: `${B}/sectors`,
    groups: <Group[]>[
      {
        label: "Infrastructure & Process Industries", href: `${B}/sectors/infrastructure-and-process-industries`,
        links: [
          { label: "Downstream Refining & Processing", href: `${B}/sectors/infrastructure-and-process-industries/downstream-refining-and-processing` },
          { label: "Marine", href: `${B}/sectors/infrastructure-and-process-industries/marine` },
          { label: "Midstream Transmission", href: `${B}/sectors/infrastructure-and-process-industries/midstream-transmission` },
          { label: "Petrochemicals", href: `${B}/sectors/infrastructure-and-process-industries/petrochemicals` },
          { label: "Pharmaceuticals", href: `${B}/sectors/infrastructure-and-process-industries/pharmaceuticals` },
        ],
      },
      {
        // No page exists for this group on the live site (its mega-menu heading links to "/#"), so it is a plain heading.
        label: "Power, Renewables & Transition", href: null,
        links: [
          { label: "HAZOP Assistant: the process safety co-pilot", href: `${B}/hazopassistant` },
          { label: "Energy transition and sustainability consulting services", href: `${B}/energy-transition-sustainability-services` },
          { label: "Hydrogen and ammonia", href: `${B}/sectors/power-renewables-and-transition/hydrogen` },
          { label: "Nuclear", href: `${B}/sectors/power-renewables-and-transition/nuclear` },
          { label: "Submarine cables", href: `${B}/sectors/power-renewables-and-transition/submarine-cables` },
        ],
      },
      {
        label: "Upstream Oil & Gas", href: `${B}/sectors/oil-and-gas`,
        links: [
          { label: "Decommissioning", href: `${B}/services/decommissioning` },
          { label: "Facilities", href: `${B}/sectors/oil-and-gas/facilities` },
          { label: "Asset Management", href: `${B}/services/asset-management` },
        ],
      },
    ],
  },
  about: {
    label: "About", href: `${B}/about`,
    links: [
      { label: "Who we are", href: `${B}/about/who-we-are` },
      { label: "History", href: `${B}/about/history` },
      { label: "Mission and values", href: `${B}/about/mission-and-values` },
      { label: "Our global reach", href: `${B}/about/our-global-reach` },
      { label: "Board of Directors", href: `${B}/about/management` },
      { label: "Senior Leadership Team", href: `${B}/about/senior-leadership-team` },
      { label: "Career testimonials", href: `${B}/career-testimonials` },
    ] as Link[],
  },
  more: [
    { label: "Careers", href: "https://careers.vysusgroup.com/" },
    { label: "HSEQ", href: `${B}/sustainability` },
    { label: "News and Insights", href: `${B}/news-and-insights` },
    { label: "Search", href: `${B}/search` },
  ] as Link[],
};

export const socials = [
  { name: "LinkedIn", icon: "linkedin", href: "https://linkedin.com/company/vysus-group/" },
  { name: "X (Twitter)", icon: "x", href: "https://twitter.com/vysusgroup" },
  { name: "YouTube", icon: "youtube", href: "https://www.youtube.com/channel/UCyj64CFB-746TSejTTM4C0Q" },
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/vysus_group/" },
] as const;

export const footer = {
  primary: [
    { label: "About", href: `${B}/about` },
    { label: "Contact", href: `${B}/contact` },
  ] as Link[],
  legal: [
    { label: "Privacy notice", href: `${B}/privacy-notice` },
    { label: "Cookies policy", href: `${B}/cookies-policy` },
    { label: "Terms of use", href: `${B}/terms-of-use` },
    { label: "Modern Slavery Policy Statement", href: `${B}/modern-slavery-policy-statement` },
    { label: "Supplier Code of Conduct", href: `${B}/supplier-code-of-conduct` },
  ] as Link[],
  copyright: "Copyright © Vysus Group 2026",
};
