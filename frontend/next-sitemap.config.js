
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: `${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
    generateRobotsTxt: true,
    sitemapSize: 5000,
    changefreq: 'daily',
    priority: 0.7,
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
        ],
        additionalSitemaps: [
            `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/sitemap.xml`,
        ],
    },
};
