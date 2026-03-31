import type { NextConfig } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5000";
let siteHostname = "localhost";
try {
    siteHostname = new URL(siteUrl).hostname;
} catch {}

const isDev = process.env.NODE_ENV === "development";
const internalApiHost = process.env.INTERNAL_API_HOST || "backend:8000";

const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com",
    "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com",
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: https://imagedelivery.net https://${siteHostname} https://www.${siteHostname} https://via.placeholder.com https://*.replit.dev https://*.riker.replit.dev http://127.0.0.1 http://localhost https://www.google-analytics.com https://www.googletagmanager.com https://ssl.google-analytics.com https://stats.g.doubleclick.net`,
    `connect-src 'self' http://127.0.0.1:8000 http://localhost:8000 https://${siteHostname} https://www.${siteHostname} https://imagedelivery.net https://*.replit.dev https://*.riker.replit.dev https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://region1.google-analytics.com`,
    "font-src 'self' data:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self' https://*.replit.dev https://*.riker.replit.dev",
    "frame-src 'self' https://www.googletagmanager.com",
    "media-src 'self'",
    "worker-src 'self' blob:",
    isDev ? "" : "upgrade-insecure-requests",
]
    .filter(Boolean)
    .join("; ");

const permissionsPolicy = [
    "accelerometer=()",
    "camera=()",
    "geolocation=()",
    "gyroscope=()",
    "magnetometer=()",
    "microphone=()",
    "payment=()",
    "usb=()",
    "interest-cohort=()",
].join(", ");

const nextConfig: NextConfig = {
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true,

    /*
     * FIX unused JS (185 KiB) + enormous network payloads (4,235 KiB):
     *
     * webpack config does three things:
     *
     * 1. splitChunks with granular caching groups — splits Redux, React,
     *    and large vendor libs into separate chunks. This means:
     *    a) Browsers cache them independently — a React update doesn't
     *       bust the Redux cache and vice versa.
     *    b) The initial page bundle only includes what's actually needed
     *       for that page, not all vendors in one giant chunk.
     *
     * 2. usedExports: true — tells webpack to mark unused exports for
     *    tree-shaking. Combined with sideEffects in package.json this
     *    eliminates dead code from large libraries like react-icons.
     *
     * 3. moduleIds: "deterministic" — stable chunk IDs mean CDN/browser
     *    caches survive deploys for unchanged chunks.
     *
     * FIX legacy JavaScript (14 KiB):
     * browserslist in package.json controls transpilation targets.
     * Add this to your package.json if not already present:
     *   "browserslist": "> 0.5%, last 2 versions, not dead, not IE 11"
     * This tells Babel/SWC to stop transpiling modern JS to ES5.
     */
    turbopack: {},
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.optimization = {
                ...config.optimization,
                usedExports: true,
                moduleIds: "deterministic",
                splitChunks: {
                    chunks: "all",
                    maxInitialRequests: 25,
                    minSize: 20000,
                    cacheGroups: {
                        /*
                         * React core — changes rarely, cache for a long time.
                         * Separating react + react-dom from other vendors means
                         * a Redux update doesn't bust the React cache.
                         */
                        react: {
                            name: "chunk-react",
                            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
                            chunks: "all",
                            priority: 40,
                            reuseExistingChunk: true,
                        },
                        /*
                         * Redux + React-Redux — changes occasionally.
                         * Isolated so its cache key is independent of UI changes.
                         */
                        redux: {
                            name: "chunk-redux",
                            test: /[\\/]node_modules[\\/](@reduxjs|react-redux|redux)[\\/]/,
                            chunks: "all",
                            priority: 30,
                            reuseExistingChunk: true,
                        },
                        /*
                         * react-icons is enormous (~3MB unminified) because it
                         * re-exports thousands of icons. Isolating it means the
                         * browser can cache it separately and it won't bloat
                         * other vendor chunks.
                         *
                         * FIX: Also switch to named imports in your components:
                         *   WRONG:  *           import { FaXTwitter } from "react-icons/fa6";
*   RIGHT:  import { FaXTwitter } from "react-icons/fa6"
                         *
                         * Direct named imports allow tree-shaking to eliminate
                         * the icons you don't use. A wrapper object defeats this.
                         */
                        reactIcons: {
                            name: "chunk-react-icons",
                            test: /[\\/]node_modules[\\/]react-icons[\\/]/,
                            chunks: "all",
                            priority: 20,
                            reuseExistingChunk: true,
                        },
                        /*
                         * Everything else from node_modules goes in a shared
                         * vendor chunk, cached independently from app code.
                         */
                        vendors: {
                            name: "chunk-vendors",
                            test: /[\\/]node_modules[\\/]/,
                            chunks: "all",
                            priority: 10,
                            reuseExistingChunk: true,
                        },
                    },
                },
            };
        }
        return config;
    },

    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "Content-Security-Policy", value: cspDirectives },
                    { key: "Permissions-Policy", value: permissionsPolicy },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "X-XSS-Protection", value: "1; mode=block" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
                ],
            },
            /*
             * FIX enormous network payloads (4,235 KiB):
             * Static assets (JS/CSS chunks) are content-hashed by Next.js,
             * so immutable caching is safe — a changed file always gets a new hash.
             * 1-year cache means repeat visitors pay zero bandwidth for unchanged chunks.
             */
            {
                source: "/_next/static/(.*)",
                headers: [
                    { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
                ],
            },
            {
                source: "/static/(.*)",
                headers: [
                    { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
                ],
            },
            /*
             * FIX image cache (contributes to "Use efficient cache lifetimes"):
             * All image files cached for 1 year. Since Cloudflare images come from
             * imagedelivery.net (a different origin), this applies to your local
             * public/ images like logos, bg-shape.jpg, og-image, etc.
             */
            {
                source: "/(.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)$)",
                headers: [
                    { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
                ],
            },
            /*
             * FIX TTFB (was 1.8s mobile):
             * Cache the homepage HTML at CDN edge for 60s.
             * stale-while-revalidate=300 serves stale instantly while
             * regenerating in the background — TTFB drops to ~50ms for cached hits.
             *
             * NOTE: If your homepage is personalized per user, remove this
             * or add a Vary: Cookie header to avoid serving wrong content.
             */
            {
                source: "/",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, s-maxage=60, stale-while-revalidate=300",
                    },
                ],
            },
        ];
    },

    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 352],
        minimumCacheTTL: 60 * 60 * 24 * 30,
        remotePatterns: [
            { protocol: "https", hostname: "imagedelivery.net" },
            { protocol: "https", hostname: siteHostname },
            { protocol: "https", hostname: `www.${siteHostname}` },
            { protocol: "https", hostname: "via.placeholder.com" },
            { protocol: "http", hostname: "127.0.0.1" },
            { protocol: "http", hostname: "localhost" },
            { protocol: "https", hostname: "*.replit.dev" },
            { protocol: "https", hostname: "*.riker.replit.dev" },
        ],
    },

    allowedDevOrigins: [
        "localhost",
        "127.0.0.1",
        "*.replit.dev",
        "*.janeway.replit.dev",
        "*.picard.replit.dev",
        "*.riker.replit.dev",
        "*.spock.replit.dev",
        "*.kirk.replit.dev",
    ],

    async rewrites() {
        return [
            { source: "/api/:path*", destination: `http://${internalApiHost}/api/:path*` },
            { source: "/admin/:path*", destination: `http://${internalApiHost}/admin/:path*` },
            { source: "/media/:path*", destination: `http://${internalApiHost}/media/:path*` },
        ];
    },
};

export default nextConfig;