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
        "transparent png",
        "hd png images",
        "png download",
        "free transparent png",
        "png images free download",
        "logo png",
        "icon png",
        "background transparent png",
        "pngbay"
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
                <!-- Google Tag Manager -->
                <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-WWZ2JPDW');</script>
                <!-- End Google Tag Manager -->
                
                <meta name="robots" content="index, follow" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="p:domain_verify" content="79113438e5c3285bed9e9d60a4dafce4"/>
            </head>
            <body className={`${interFont.variable} antialiased`}>
                <!-- Google Tag Manager (noscript) -->
                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WWZ2JPDW"
                height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
                <!-- End Google Tag Manager (noscript) -->

                <!-- Google tag (gtag.js) -->
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-0D66LNPY7G"></script>
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-0D66LNPY7G');
                </script>
                
                <ReduxProvider>
                    <Scrollbar />
                    <Notification />
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}