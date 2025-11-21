/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://pngpoint.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      'https://pngpoint.com/sitemap.xml',
    ],
  },
};
