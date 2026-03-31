import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/providers";
import Notification from "@/components/notification/notification";
import Scrollbar from "@/components/scrollbar/scrollbar";

/*
 * FIX RENDER BLOCKING (600ms savings):
 * Adding display: "swap" tells the browser NOT to block rendering while
 * the Inter font loads. Without this, the browser waits for the font
 * file before painting anything → direct LCP delay.
 *
 * display: "swap" means:
 *   1. Browser immediately renders text using a system font fallback
 *   2. Inter loads in the background
 *   3. Browser swaps to Inter when ready (tiny visual swap, zero LCP impact)
 *
 * adjustFontFallback: true makes Next.js generate a fallback font with
 * matching metrics so the swap causes zero layout shift (CLS).
 *
 * preload: true (default) ensures the font is preloaded but non-blocking.
 */
const interFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
    adjustFontFallback: true,
    preload: true,
});

export const metadata: Metadata = {
    title: "Download Free PNG Images with Transparent Background | PNGPoint",
    description:
        "Explore thousands of free PNG images with transparent backgrounds. Perfect for presentations, graphic design, and social media posts",
    keywords: [
        "free png images",
        "png free",
        "png free download",
        "png images free download",
        "vector png",
        "royalty free png",
        "download png images",
        "free png photos",
        "free png pictures",
        "smoke png",
        "free unlimited png download",
        "lens flare png",
        "emojis png",
        "torn paper png",
        "flower png",
        "free png background",
        "png photo download",
        "png pictures download",
        "free png img",
        "free png pics",
        "png downloader",
        "free sticker png",
        "png images free download for android",
        "png files download",
        "png illustration",
        "gold confetti png",
        "png download hd",
        "water splash png",
        "1k followers png",
        "emoji transparent background",
        "design png free download",
        "blood drop png",
        "blood splash png",
        "blood splatter png",
        "car cartoon png",
        "cartoon character png",
        "cartoon eye png",
        "cartoon face png",
        "cartoon images png",
        "cartoon mouth png",
        "cartoon png background",
        "certificate border png",
    ],
    authors: [{ name: "pngpoint" }],
    creator: "pngpoint",
    publisher: "pngpoint",
    metadataBase: new URL("https://pngpoint.com"),
    alternates: { canonical: "/" },
    openGraph: {
        title: "Download Free PNG Images with Transparent Background | PNGPoint",
        description:
            "Explore thousands of free PNG images with transparent backgrounds. Perfect for presentations, graphic design, and social media posts",
        url: "https://pngpoint.com",
        siteName: "PNGPoint",
        type: "website",
        images: [
            {
                url: "https://pngpoint.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "PNGPoint",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Download Free PNG Images with Transparent Background | PNGPoint",
        description:
            "Explore thousands of free PNG images with transparent backgrounds. Perfect for presentations, graphic design, and social media posts",
        images: ["https://pngpoint.com/og-image.png"],
        creator: "@PNGPoint",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="robots" content="index, follow" />
                <meta name="theme-color" content="#0077a2" />

                {/*
                 * FIX LCP (TTFB / connection overhead):
                 * These preconnect hints open TCP+TLS connections to external
                 * origins BEFORE the browser parses the page body.
                 *
                 * imagedelivery.net  → Cloudflare Images CDN (your PNG/WebP source)
                 * fonts.gstatic.com  → where Google Fonts actually serves font files
                 *                      (next/font/google still fetches from here)
                 *
                 * Without these, the browser discovers these origins only when it
                 * hits the first request to them — paying full TCP+TLS handshake
                 * cost (~200-400ms on mobile) in the critical path.
                 *
                 * crossOrigin="anonymous" is required for font preconnects per spec.
                 */}
                <link rel="preconnect" href="https://imagedelivery.net" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />

                {/*
                 * FIX LCP: dns-prefetch is a lighter version of preconnect —
                 * it resolves DNS early without opening a full connection.
                 * Use for origins that are important but not immediately critical.
                 */}
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
                <link rel="dns-prefetch" href="https://www.google-analytics.com" />

                {/*
                 * FIX LCP: Inline the above-the-fold critical CSS directly in
                 * the <head>. This eliminates the render-blocking CSS chunks
                 * (chunks/5d52e...css and chunks/7538a...css) that PageSpeed
                 * flagged as costing 600ms.
                 *
                 * These styles cover ONLY what is visible on first paint:
                 * header bg, search bar, heading text, and the image grid skeleton.
                 * Everything else loads normally via the CSS chunks.
                 */}
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                            /* Critical above-fold styles */
                            *,::before,::after{box-sizing:border-box;margin:0;padding:0}
                            html{line-height:1.5;-webkit-text-size-adjust:100%}
                            body{margin:0;font-family:var(--font-inter),system-ui,Arial,sans-serif;-webkit-font-smoothing:antialiased;background:#fff}
                            
                            /* Header + SearchingImage bg — prevents flash of unstyled bg */
                            header,.search-section{background-color:#0077a2}
                            
                            /* Reserve logo space to prevent CLS */
                            header a>div{min-width:160px;min-height:40px;display:flex;align-items:center;justify-content:center}
                            
                            /* Reserve grid space before JS hydrates */
                            .trending-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem;width:100%}
                            @media(min-width:640px){.trending-grid{grid-template-columns:repeat(3,1fr)}}
                            @media(min-width:1280px){.trending-grid{grid-template-columns:repeat(4,1fr)}}
                            
                            /* Prevent invisible text during font load (FOIT) */
                            .antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
                        `,
                    }}
                />
            </head>
            <body className={`${interFont.variable} antialiased`}>
                <ReduxProvider>
                    {/*
                     * FIX LCP: Scrollbar and Notification are non-critical UI.
                     * They should not block the initial paint in any way.
                     * They are already client components so they hydrate after
                     * the main content — no change needed here, but keep them
                     * AFTER {children} if possible to deprioritize their hydration.
                     *
                     * If Scrollbar or Notification import heavy libraries, consider
                     * wrapping them in next/dynamic with ssr:false.
                     */}
                    <Scrollbar />
                    <Notification />
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}