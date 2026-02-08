/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000';

module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [
    '/categories',
    '/forgot-password',
    '/password-change-successful',
    '/sub-categories',
    '/user/login',
    '/user/register',
  ],
  robotsTxtOptions: {
    policies: [
      // Block specific bots
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'Barkrowler', disallow: '/' },
      { userAgent: 'DotBot', disallow: '/' },
      { userAgent: 'GrapeshotCrawler', disallow: '/' },
      { userAgent: 'HyScore', disallow: '/' },
      { userAgent: 'Qwantify', disallow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'SeznamBot', disallow: '/' },
      { userAgent: 'TinEye-bot', disallow: '/' },
      { userAgent: 'coccocbot-image', disallow: '/' },
      { userAgent: 'coccocbot-web', disallow: '/' },
      { userAgent: 'ia_archiver', disallow: '/' },
      { userAgent: 'musobot', disallow: '/' },
      { userAgent: 'proximic', disallow: '/' },
      { userAgent: 'Qwantify/Bleriot', disallow: '/' },
      { userAgent: 'Baiduspider', disallow: '/' },
      { userAgent: 'MJ12bot', disallow: '/' },
      { userAgent: 'MauiBot', disallow: '/' },
      { userAgent: 'weborama-fetcher', disallow: '/' },
      { userAgent: 'Clickagy Intelligence Bot', disallow: '/' },
      { userAgent: 'Clickagy Intelligence Bot v2', disallow: '/' },
      { userAgent: 'HubSpot Crawler', disallow: '/' },
      { userAgent: 'Sogou web spider', disallow: '/' },
      { userAgent: 'Sogou spider', disallow: '/' },
      // Allow Google-Extended and GPTBot
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      // Allow all other bots (including Google, Bing, etc.)
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [],
    transformRobotsTxt: async (_, robotsTxt) => {
      return robotsTxt
        .split('\n')
        .filter(line => !line.toLowerCase().includes('sitemap:'))
        .filter(line => !line.toLowerCase().includes('host:'))
        .join('\n');
    },
  },
  additionalPaths: async (config) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/slugs`);
      const imageData = await response.json();
      return imageData.map((image) => ({
        loc: `/image/${image.slug}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: image.updatedAt,
      }));
    } catch (error) {
      console.error('Error fetching image URLs for sitemap:', error);
      return [];
    }
  },
};