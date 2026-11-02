import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * ================================
 * 🔹 PATH FIX (ESM)
 * ================================
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * ================================
 * 🔹 IMPORT SEO CONFIGS
 * ================================
 */

// 🔸 OLD SEO (Allahabad / Lucknow / Kanpur)
import {
  ALLAHABAD_LOCATIONS,
  LUCKNOW_LOCATIONS,
  KANPUR_LOCATIONS,
  GURUGRAM_LOCATIONS,
  DELHI_LOCATIONS,
  INTENTS as OLD_INTENTS,
} from "../src/components/seo/seo.config.node.js";

// 🔸 NEW SEO INDIA
import { CITIES } from "../src/components/seoIndia/locations/index.node.js";

import { INTENTS as INDIA_INTENTS } from "../src/components/seoIndia/intents.node.js";

/**
 * ================================
 * 🔹 BASE URL
 * ================================
 */
const BASE_URL = "https://yattratutors.com";

/**
 * ================================
 * 🔹 UTILS
 * ================================
 */
const slugify = (text) => {
  // Handle objects with slug property
  if (typeof text === 'object' && text !== null && 'slug' in text) {
    return text.slug;
  }
  // Handle strings
  if (typeof text === 'string') {
    return text.toLowerCase().replace(/\s+/g, "-");
  }
  // Fallback
  return String(text).toLowerCase().replace(/\s+/g, "-");
};

/**
 * ================================
 * 🔹 URL COLLECTION
 * ================================
 */
const urls = [];

/* ===============================
   🔹 1. HOMEPAGE
================================ */
urls.push(`${BASE_URL}/`);

/* ===============================
   🔹 1B. CORE / STATIC PAGES
   (previously missing from the sitemap entirely)
================================ */
const CORE_PAGES = [
  "/about",
  "/contact",
  "/pricing",
  "/subjects",
  "/how-it-works",
  "/tutors",
  "/sitemap",
  "/privacy",
  "/terms",
  "/refund",
  "/cookie-policy",
  "/tutor-policy-agreement",
  "/tutor-flow/tutor-registration",
  "/find-tutor-flow",
  "/kid-courses/primary-section",
  "/kid-courses/junior-section",
  "/kid-courses/computer-learning",
  "/kid-courses/spoken-english",
  "/games",
  "/games/snake",
  "/games/memory-match",
  "/games/math-quize",
  "/games/find-odd-one",
  "/games/word-puzzle",
  "/games/color-matching",
  "/india/agra",
  "/india/meerut",
];
CORE_PAGES.forEach((p) => urls.push(`${BASE_URL}${p}`));

/* ===============================
   🔹 1C. ONLINE & INTERNATIONAL SEO PAGES
   (/country/{country}/{slug})
================================ */
const COUNTRY_PAGES = {
  india: [
    "online-tuition",
    "maths-online",
    "science-online",
    "jee-online-coaching",
    "neet-online-coaching",
    "cbse-online-tutor",
    "online-home-tutor",
    "live-online-classes",
  ],
  uk: [
    "uk-tutoring",
    "home-tutor-uk",
    "online-tutor-uk",
    "gcse-tutor-uk",
    "a-level-tutor-uk",
    "tutor-job-uk",
    "maths-tutor-uk",
    "science-tutor-uk",
  ],
  canada: [
    "canada-tutoring",
    "home-tutor-canada",
    "online-tutor-canada",
    "toronto-tutor",
    "maths-tutor-canada",
    "tutor-job-canada",
    "vancouver-tutor",
    "calgary-tutor",
  ],
  uae: [
    "home-tutor-uae",
    "online-tutor-dubai",
    "tutor-abu-dhabi",
    "cbse-tutor-dubai",
    "maths-tutor-uae",
    "tutor-job-uae",
    "ib-tutor-dubai",
    "sharjah-tutor",
  ],
  singapore: [
    "home-tutor-singapore",
    "online-tutor-sg",
    "maths-tutor-sg",
    "primary-tutor-sg",
    "tutor-job-singapore",
    "science-tutor-sg",
  ],
  australia: [
    "home-tutor-australia",
    "online-tutor-au",
    "sydney-tutor",
    "melbourne-tutor",
    "maths-tutor-au",
    "tutor-job-australia",
    "brisbane-tutor",
    "perth-tutor",
  ],
  usa: [
    "online-tutor-usa",
    "home-tutor-usa",
    "new-york-tutor",
    "sat-tutor-usa",
    "act-tutor-usa",
    "tutor-job-usa",
  ],
  newzealand: [
    "home-tutor-nz",
    "online-tutor-nz",
    "auckland-tutor",
    "maths-tutor-nz",
    "tutor-job-nz",
  ],
};

Object.entries(COUNTRY_PAGES).forEach(([country, slugs]) => {
  slugs.forEach((slug) => {
    urls.push(`${BASE_URL}/country/${country}/${slug}`);
  });
});

/* ===============================
   🔹 2. OLD SEO PAGES (SAFE)
================================ */

// Allahabad
ALLAHABAD_LOCATIONS.forEach((loc) => {
  Object.values(OLD_INTENTS).forEach((group) => {
    group.forEach((intent) => {
      urls.push(
        `${BASE_URL}/allahabad/${slugify(loc)}/${slugify(intent)}`
      );
    });
  });
});

// Lucknow
LUCKNOW_LOCATIONS.forEach((loc) => {
  Object.values(OLD_INTENTS).forEach((group) => {
    group.forEach((intent) => {
      urls.push(
        `${BASE_URL}/lucknow/${slugify(loc)}/${slugify(intent)}`
      );
    });
  });
});

// Kanpur
KANPUR_LOCATIONS.forEach((loc) => {
  Object.values(OLD_INTENTS).forEach((group) => {
    group.forEach((intent) => {
      urls.push(
        `${BASE_URL}/kanpur/${slugify(loc)}/${slugify(intent)}`
      );
    });
  });
});

/* ===============================
   🔥 4. GURUGRAM SEO PAGES (NEW)
   Main city page + 10 area pages
================================ */

// Main Gurugram city page
urls.push(`${BASE_URL}/gurugram`);

// Gurugram area pages
const GURUGRAM_AREAS = [
  'dlf-phase',
  'golf-course-road',
  'mg-road',
  'sushant-lok',
  'sohna-road',
  'palam-vihar',
  'old-gurgaon',
  'dwarka-expressway',
  'new-gurgaon',
  'manesar'
];

GURUGRAM_AREAS.forEach((area) => {
  urls.push(`${BASE_URL}/gurugram/${area}`);
});

/* ===============================
   🔥 5. DELHI SEO PAGES (NEW)
   Main city page + 15 area pages
================================ */

// Main Delhi city page
urls.push(`${BASE_URL}/delhi`);

// Delhi area pages
const DELHI_AREAS = [
  'south-delhi',
  'north-delhi',
  'west-delhi',
  'east-delhi',
  'central-delhi',
  'rohini',
  'dwarka',
  'north-west-delhi',
  'south-west-delhi',
  'janakpuri',
  'laxmi-nagar',
  'saket',
  'greater-kailash',
  'mayur-vihar',
  'karol-bagh'
];

DELHI_AREAS.forEach((area) => {
  urls.push(`${BASE_URL}/delhi/${area}`);
});

/* ===============================
   🔥 6. SEO INDIA (NEW)
   /india/{city}/{location}/{intent}
================================ */

CITIES.forEach((city) => {
  city.locations.forEach((location) => {
    Object.values(INDIA_INTENTS).forEach((intentGroup) => {
      intentGroup.forEach((intent) => {
        urls.push(
          `${BASE_URL}/india/${city.slug}/${slugify(location)}/${slugify(
            intent
          )}`
        );
      });
    });
  });
});

/**
 * ================================
 * 🔹 DEDUPE
 * ================================
 */
const uniqueUrls = Array.from(new Set(urls));

/**
 * ================================
 * 🔹 SITEMAP XML
 * ================================
 */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls
  .map(
    (url) => `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("")}
</urlset>
`;

/**
 * ================================
 * 🔹 WRITE FILE
 * ================================
 */
fs.writeFileSync(
  path.join(process.cwd(), "public", "sitemap.xml"),
  sitemap
);

console.log(`✅ Sitemap generated: ${uniqueUrls.length} URLs (from ${urls.length} before dedupe)`);
