import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/providers";
import Notification from "@/components/notification/notification";
import Scrollbar from "@/components/scrollbar/scrollbar";
import { siteConfig } from "@/config/site";
import Script from "next/script";

const interFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    /*
     * FIX render-blocking + CLS:
     * display:"swap" prevents the font from blocking the initial render.
     * Without this, the browser waits for the Inter font file before
     * painting any text, which inflates both FCP and LCP.
     */
    display: "swap",
});

export const metadata: Metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
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
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.siteName,
        type: "website",
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.siteName,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: siteConfig.twitterHandle,
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
                {/*
                 * FIX LCP — preconnect to Cloudflare Images CDN.
                 *
                 * This is the EARLIEST possible placement — inside <head> in the
                 * root layout, before any scripts or stylesheets.
                 *
                 * Without preconnect, the browser must complete TCP handshake +
                 * TLS negotiation (~100-300ms on mobile, ~50ms on desktop) before
                 * the first byte of the LCP image can arrive. Preconnect eliminates
                 * this by warming up the connection as soon as the HTML is parsed.
                 *
                 * Replace "https://imagedelivery.net" with your actual Cloudflare
                 * Images delivery domain if it differs (check your cloudflare_url values).
                 */}
                <link rel="preconnect" href="https://imagedelivery.net" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://imagedelivery.net" />

                {/* Google Tag Manager */}
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-55NWGSDH');`}
                </Script>
                {/* End Google Tag Manager */}

                <meta name="robots" content="index, follow" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="p:domain_verify" content="c4d1b017f0884994340d0fe3f090b469" />
            </head>
            <body className={`${interFont.variable} antialiased`}>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-55NWGSDH"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    />
                </noscript>
                {/* End Google Tag Manager (noscript) */}

                {/*
                 * FIX render-blocking / LCP:
                 * GA script strategy changed: "afterInteractive" → "lazyOnload"
                 *
                 * "afterInteractive" runs immediately after hydration, competing
                 * with the LCP image fetch for main-thread time and bandwidth.
                 * "lazyOnload" defers until the page is fully idle — analytics
                 * data is still captured (pageview fires on window load), but
                 * it no longer sits in the LCP critical path.
                 *
                 * Note: GTM (above) already forwards GA events, so this gtag
                 * snippet is redundant during the critical paint window anyway.
                 */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-JF0VD5LP21"
                    strategy="lazyOnload"
                />
                <Script id="google-analytics" strategy="lazyOnload">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-JF0VD5LP21');
                    `}
                </Script>
                {/* End Google Analytics */}

                <ReduxProvider>
                    <Scrollbar />
                    <Notification />
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}