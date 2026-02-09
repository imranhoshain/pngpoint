import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/categories',
        '/forgot-password',
        '/password-change-successful',
        '/sub-categories',
        '/user/login',
        '/user/register',
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}