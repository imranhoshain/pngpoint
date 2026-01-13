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
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      `${siteUrl}/api/v1/sitemap.xml`,
      `${siteUrl}/api/v1/sitemap-images.xml?p=5`,
      `${siteUrl}/api/v1/sitemap-images.xml?p=4`,
      `${siteUrl}/api/v1/sitemap-images.xml?p=3`,
      `${siteUrl}/api/v1/sitemap-images.xml?p=2`,
      `${siteUrl}/api/v1/sitemap-images.xml`,
    ],
  },
};
