/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000';

module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
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
      // Allow all other bots (including Google, Bing, etc.)
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      `${siteUrl}/api/v1/sitemap.xml`
    ],
  },
};