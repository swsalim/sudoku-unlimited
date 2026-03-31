// Save crawling budget by not fetching SSG meta files
const NEXT_SSG_FILES = [
  '/*.json$',
  '/*_buildManifest.js$',
  '/*_middlewareManifest.js$',
  '/*_ssgManifest.js$',
];

const exclude = ['/dashboard*', '/404', '/api*', '/login', '/server-sitemap.xml', '/dev-demo'];

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
  robotsTxtOptions: {
    policies: [{ userAgent: '*', disallow: NEXT_SSG_FILES }],
  },
};

module.exports = config;
