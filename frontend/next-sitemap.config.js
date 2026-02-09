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