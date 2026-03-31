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
        "certificate border png"
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
                <meta name="p:domain_verify" content="c4d1b017f0884994340d0fe3f090b469"/>
            </head>
            <body className={`${interFont.variable} antialiased`}>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe 
                        src="https://www.googletagmanager.com/ns.html?id=GTM-55NWGSDH"
                        height="0" 
                        width="0" 
                        style={{display: 'none', visibility: 'hidden'}}
                    />
                </noscript>
                {/* End Google Tag Manager (noscript) */}

                {/* Google Analytics (gtag.js) */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-JF0VD5LP21"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
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