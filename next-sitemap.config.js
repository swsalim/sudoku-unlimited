// Save crawling budget by not fetching SSG meta files
const NEXT_SSG_FILES = [
  '/*.json$',
  '/*_buildManifest.js$',
  '/*_middlewareManifest.js$',
  '/*_ssgManifest.js$',
];

const exclude = ['/dashboard*', '/404', '/api*', '/login', '/server-sitemap.xml', '/dev-demo'];

const fs = require('fs');
const path = require('path');

const dailyPuzzlesPath = path.join(__dirname, 'data/daily/puzzles.json');
let dailyIsoDates = [];
if (fs.existsSync(dailyPuzzlesPath)) {
  const dailyArchive = JSON.parse(fs.readFileSync(dailyPuzzlesPath, 'utf8'));
  dailyIsoDates = Object.keys(dailyArchive.puzzles ?? {}).sort();
}
const todayUtc = new Date().toISOString().slice(0, 10);
const publishedDailyDates = dailyIsoDates.filter((d) => d <= todayUtc);

const registrySrc = fs.readFileSync(path.join(__dirname, 'lib/guides/registry.ts'), 'utf8');
const registryBlock = registrySrc.split('export const guideRegistry')[1] ?? '';
const GUIDE_SLUGS = [...registryBlock.matchAll(/^\s+'?([a-z0-9-]+)'?\s*:\s*\{/gm)].map(
  (match) => match[1],
);

const GUIDE_LASTMOD = '2026-10-16';

const siteUrl =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`;

const config = {
  siteUrl,
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
  sitemapSize: 7000,
  exclude,
  /** Force-include dynamic routes not listed in static export */
  additionalPaths: async (cfg) => {
    const paths = [
      await cfg.transform(cfg, '/daily'),
      await cfg.transform(cfg, '/daily/archive'),
      await cfg.transform(cfg, '/guides'),
    ];
    for (const iso of publishedDailyDates) {
      const entry = await cfg.transform(cfg, `/daily/${iso}`);
      entry.lastmod = `${iso}T00:00:00.000Z`;
      entry.changefreq = 'never';
      paths.push(entry);
    }
    const monthKeys = new Set(publishedDailyDates.map((d) => d.slice(0, 7)));
    for (const ym of monthKeys) {
      const [y, m] = ym.split('-');
      const entry = await cfg.transform(cfg, `/daily/${y}/${m}`);
      entry.lastmod = `${todayUtc}T00:00:00.000Z`;
      paths.push(entry);
    }
    for (const slug of GUIDE_SLUGS) {
      const entry = await cfg.transform(cfg, `/guides/${slug}`);
      const block = registryBlock.match(
        new RegExp(`(?:'|")?${slug}(?:'|")?\\s*:\\s*\\{([\\s\\S]*?)\\n\\s*\\},`),
      );
      const dated = block?.[1].match(/dateModified:\s*'(\d{4}-\d{2}-\d{2})'/);
      entry.lastmod = dated?.[1] ?? GUIDE_LASTMOD;
      paths.push(entry);
    }
    return paths;
  },
  robotsTxtOptions: {
    policies: [{ userAgent: '*', disallow: NEXT_SSG_FILES }],
  },
};

module.exports = config;
