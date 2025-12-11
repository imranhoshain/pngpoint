/** @type {import('next-sitemap').IConfig} */

const SITE_URL =
  process.env.NEXT_PUBLIC_DOMAIN_NAME || "https://pngpoint.com";

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
    additionalSitemaps: [`${SITE_URL}/sitemap.xml`],
  },
};
